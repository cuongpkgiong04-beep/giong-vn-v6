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
} from "@/lib/registrations";
import { getEmployeeByEmail, isAdminRole } from "@/lib/catalog";
import { createServerFn } from "@tanstack/react-start";

/**
 * Check if current user is admin
 */
function getCurrentAdmin(): { email: string; name: string } | null {
  // In production, verify session token and get user info
  // For now, return a default admin for demo
  return {
    email: "cuongpk.giong04@gmail.com",
    name: "Phạm Kiên Cường",
  };
}

function assertAdmin() {
  const admin = getCurrentAdmin();
  if (!admin) throw new Error("Unauthorized - Admin access required");
  const employee = getEmployeeByEmail(admin.email);
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
    const admin = assertAdmin();

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
 * Reject a registration request (admin only)
 */
export const rejectRegistrationRequest = createServerFn({ method: "POST" })
  .validator((data: { requestId: string; reason?: string }) => data)
  .handler(async ({ data }) => {
    const admin = assertAdmin();

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
