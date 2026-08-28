/**
 * Server functions for managing registration requests.
 * Only admins can access these endpoints.
 */
import {
  getAllRegistrationRequests,
  approveRegistration,
  rejectRegistration,
  createRegistrationRequest,
  isEmailPending,
  isEmailRejected,
  getRegistrationRequestByEmail,
} from "@/lib/registrations";
import { isAdminRole } from "@/lib/catalog";
import { getSql } from "@/lib/db";
import { createServerFn } from "@tanstack/react-start";

/**
 * Resolve the current signed-in user from the session.
 * Returns null when no valid session exists.
 */
/** Server-side employee lookup by email (queries DB, not store). */
async function getEmployeeByEmailServer(email: string) {
  const sql = await getSql();
  const rows = await sql<{ id: string; name: string; role: string }>`
    SELECT id, name, role FROM employees WHERE LOWER(email) = LOWER(${email}) AND status = 'active' LIMIT 1
  `;
  return rows[0] ?? null;
}

async function getCurrentAdmin(): Promise<{ email: string; name: string } | null> {
  try {
    const { getSessionUser } = await import("@/lib/auth/verify.server");
    const sessionUser = await getSessionUser();
    if (!sessionUser?.email) return null;
    const employee = await getEmployeeByEmailServer(sessionUser.email);
    if (!employee) return null;
    return { email: sessionUser.email, name: employee.name };
  } catch {
    return null;
  }
}

async function assertAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("Unauthorized - Admin access required");
  const employee = await getEmployeeByEmailServer(admin.email);
  if (!employee || !isAdminRole(employee.role)) throw new Error("Unauthorized - Admin access required");
  return admin;
}

/**
 * Get all registration requests (admin only)
 */
export const getRegistrationRequests = createServerFn({ method: "GET" })
  .handler(async () => {
    assertAdmin();
    return getAllRegistrationRequests();
  });

/**
 * Approve a registration request (admin only).
 * This is a server function because it imports auth/server to create
 * the user in Better Auth after approval.
 */
export const approveRegistrationRequest = createServerFn({ method: "POST" })
  .validator((data: { requestId: string }) => data)
  .handler(async ({ data }) => {
    const admin = await assertAdmin();

    const request = await approveRegistration(data.requestId, admin.name);
    if (!request) {
      throw new Error("Registration request not found");
    }

    // Create the user in Better Auth so they can sign in with email/password.
    // Without this step, login fails because Better Auth's user/account tables
    // have no record of the approved user.
    try {
      const { auth } = await import("@/lib/auth/server");
      await auth.api.signUpEmail({
        body: {
          name: request.name,
          email: request.email,
          password: request.password,
        },
      });
    } catch (err: any) {
      // If user already exists (e.g. approved twice), that's fine — just log it.
      const msg = err?.message ?? String(err);
      if (!msg.includes("already") && !msg.includes("exists")) {
        console.error("[auth] Failed to create Better Auth user for approved registration:", msg);
        throw new Error(`Đã duyệt nhưng không thể tạo tài khoản đăng nhập: ${msg}`);
      }
    }

    return request;
  });

/**
 * Check if email has a pending registration request
 */
export const checkEmailPending = createServerFn({ method: "GET" })
  .validator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    return isEmailPending(data.email);
  });

/**
 * Check if email has a rejected registration request
 */
export const checkEmailRejected = createServerFn({ method: "GET" })
  .validator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    return isEmailRejected(data.email);
  });

/**
 * Create a new registration request
 */
export const createRegRequest = createServerFn({ method: "POST" })
  .validator((data: { name: string; email: string; password: string }) => data)
  .handler(async ({ data }) => {
    return createRegistrationRequest(data);
  });

/**
 * Auto-approve a pending registration for a catalog employee.
 * Called during login when the email belongs to an employee in the catalog.
 * This breaks the deadlock where the admin can't log in to approve themselves.
 */
export const autoApproveCatalogEmployee = createServerFn({ method: "POST" })
  .validator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    const employee = await getEmployeeByEmailServer(data.email);
    if (!employee) return { approved: false };

    const request = await getRegistrationRequestByEmail(data.email);
    if (!request || request.status !== "pending") return { approved: false };

    // Auto-approve
    await approveRegistration(request.id, `Auto-duyệt (${employee.name})`);

    // Create Better Auth account so they can sign in with email/password
    try {
      const { auth } = await import("@/lib/auth/server");
      await auth.api.signUpEmail({
        body: {
          name: request.name,
          email: request.email,
          password: request.password,
        },
      });
    } catch (err: any) {
      const msg = err?.message ?? String(err);
      if (!msg.includes("already") && !msg.includes("exists")) {
        console.error("[auth] Auto-approve: failed to create Better Auth user:", msg);
      }
    }

    return { approved: true, name: employee.name };
  });

/**
 * Reject a registration request (admin only)
 */
export const rejectRegistrationRequest = createServerFn({ method: "POST" })
  .validator((data: { requestId: string; reason?: string }) => data)
  .handler(async ({ data }) => {
    const admin = await assertAdmin();

    const request = rejectRegistration(
      data.requestId,
      admin.name,
      data.reason
    );
    if (!request) {
      throw new Error("Registration request not found");
    }

    return request;
  });
