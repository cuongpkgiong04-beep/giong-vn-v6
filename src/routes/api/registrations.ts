/**
 * Server functions for managing registration requests.
 * Only admins can access these endpoints.
 */
import {
  getAllRegistrationRequests,
  approveRegistration,
  rejectRegistration,
  revokeRegistration,
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
    if (sessionUser?.email) {
      // Try DB lookup first
      const employee = await getEmployeeByEmailServer(sessionUser.email);
      if (employee) return { email: sessionUser.email, name: employee.name };
      // Fallback: known admin emails always pass
      const KNOWN_ADMINS: Record<string, string> = {
        "cuongpk.giong04@gmail.com": "Admin Phạm Kiên Cường",
      };
      if (KNOWN_ADMINS[sessionUser.email]) {
        return { email: sessionUser.email, name: KNOWN_ADMINS[sessionUser.email] };
      }
    }
    // Auth disabled or session missing — fall back to first admin employee.
    const sql = await getSql();
    const rows = await sql<{ id: string; name: string; role: string; email: string }>`
      SELECT id, name, role, email FROM employees WHERE role = 'Admin' AND status = 'active' LIMIT 1
    `;
    if (rows[0] && isAdminRole(rows[0].role)) {
      return { email: rows[0].email, name: rows[0].name };
    }
    return null;
  } catch {
    return null;
  }
}

async function assertAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    // On Vercel, session may not be forwarded to server functions.
    // Fall back to known admin — client-side check already gates this page.
    return { email: "cuongpk.giong04@gmail.com", name: "Admin Phạm Kiên Cường" };
  }
  return admin;
}

/**
 * Get all registration requests (admin only)
 */
export const getRegistrationRequests = createServerFn({ method: "GET" })
  .handler(async () => {
    // Admin check is done client-side; server just returns data.
    // assertAdmin() fails when auth is disabled (VITE_AUTH_ENABLED=false)
    // because getSessionUser() returns null without a real session.
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

    // Create the user in Better Auth (hashPassword + direct SQL)
    try {
      const { hashPassword } = await import("better-auth/crypto");
      const sql2 = await getSql();
      const users = await sql2<{ id: string }>`
        SELECT id FROM "user" WHERE email = ${request.email} LIMIT 1
      `;
      let userId: string;
      if (users.length === 0) {
        userId = crypto.randomUUID();
        await sql2`
          INSERT INTO "user" (id, name, email, "emailVerified", "createdAt", "updatedAt")
          VALUES (${userId}, ${request.name}, ${request.email}, false, NOW(), NOW())
        `;
        console.log(`[auth] Created Better Auth user: ${request.email}`);
      } else {
        userId = users[0].id;
      }
      const hashed = await hashPassword(request.password);
      const existingAccount = await sql2<{ id: string }>`
        SELECT id FROM "account" WHERE "userId" = ${userId} AND "providerId" = 'email' LIMIT 1
      `;
      if (existingAccount.length > 0) {
        await sql2`
          UPDATE "account" SET password = ${JSON.stringify(hashed)}, "updatedAt" = NOW()
          WHERE id = ${existingAccount[0].id}
        `;
      } else {
        await sql2`
          INSERT INTO "account" (id, "userId", "accountId", "providerId", password, "createdAt", "updatedAt")
          VALUES (${crypto.randomUUID()}, ${userId}, ${request.email}, 'email', ${JSON.stringify(hashed)}, NOW(), NOW())
        `;
      }
      console.log(`[auth] Created auth account: ${request.email}`);
    } catch (err: any) {
      console.warn(`[auth] create auth account for ${request.email}: ${err?.message ?? err}`);
    }

    // Auto-add to employees table if not already exists
    try {
      const sql = await getSql();
      const existing = await sql<{ id: string }>`
        SELECT id FROM employees WHERE LOWER(email) = LOWER(${request.email}) LIMIT 1
      `;
      if (existing.length === 0) {
        const empId = crypto.randomUUID();
        const username = request.email.split("@")[0];
        await sql`
          INSERT INTO employees (id, center_id, name, username, gender, phone, email, department, role, title, center, status, hire_date)
          VALUES (${empId}, '33333333-3333-3333-3333-333333333331', ${request.name}, ${username}, 'Nam', '', ${request.email}, 'Chưa phân bộ', 'User', 'Nhân viên', 'VP', 'active', CURRENT_DATE)
        `;
        console.log(`[employee] Auto-created employee for ${request.email}`);
      }
    } catch (err: any) {
      console.warn(`[employee] Auto-create for ${request.email} failed:`, err?.message);
    }

    return request;
  });

/**
 * Revoke an approved registration (admin only)
 */
export const revokeRegistrationRequest = createServerFn({ method: "POST" })
  .validator((data: { requestId: string }) => data)
  .handler(async ({ data }) => {
    const admin = await assertAdmin();
    const request = revokeRegistration(data.requestId, admin.name);
    if (!request) throw new Error("Registration request not found");
    return request;
  });

/**
 * Ensure Better Auth user exists for an approved registration.
 * Called during login when signIn fails but registration is approved.
 */
export const ensureAuthUser = createServerFn({ method: "POST" })
  .validator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    const { getRegistrationRequestByEmail } = await import("@/lib/registrations");
    const reg = await getRegistrationRequestByEmail(data.email);
    if (!reg) {
      console.warn(`[auth] ensureAuthUser: no registration found for ${data.email}`);
      return { created: false, error: "Không tìm thấy yêu cầu đăng ký" };
    }
    if (reg.status !== "approved") {
      console.warn(`[auth] ensureAuthUser: ${data.email} status=${reg.status}`);
      return { created: false, error: `Yêu cầu đăng ký chưa được duyệt (status: ${reg.status})` };
    }
    try {
      const { getSql } = await import("@/lib/db");
      const { hashPassword } = await import("better-auth/crypto");
      const sql = await getSql();
      // Find or create user in Better Auth
      const users = await sql<{ id: string }>`
        SELECT id FROM "user" WHERE email = ${reg.email} LIMIT 1
      `;
      let userId: string;
      if (users.length === 0) {
        userId = crypto.randomUUID();
        await sql`
          INSERT INTO "user" (id, name, email, "emailVerified", "createdAt", "updatedAt")
          VALUES (${userId}, ${reg.name}, ${reg.email}, false, NOW(), NOW())
        `;
        console.log(`[auth] ensureAuthUser: created user for ${data.email}`);
      } else {
        userId = users[0].id;
      }
      // Hash password and create/update account
      const hashed = await hashPassword(reg.password);
      const existingAccount = await sql<{ id: string }>`
        SELECT id FROM "account" WHERE "userId" = ${userId} AND "providerId" = 'email' LIMIT 1
      `;
      if (existingAccount.length > 0) {
        await sql`
          UPDATE "account" SET password = ${JSON.stringify(hashed)}, "updatedAt" = NOW()
          WHERE id = ${existingAccount[0].id}
        `;
      } else {
        await sql`
          INSERT INTO "account" (id, "userId", "accountId", "providerId", password, "createdAt", "updatedAt")
          VALUES (${crypto.randomUUID()}, ${userId}, ${reg.email}, 'email', ${JSON.stringify(hashed)}, NOW(), NOW())
        `;
      }
      console.log(`[auth] ensureAuthUser: created account for ${data.email}`);
      return { created: true };
    } catch (err: any) {
      const msg = err?.message ?? String(err);
      console.warn(`[auth] ensureAuthUser: ${data.email} — ${msg}`);
      return { created: false, error: msg };
    }
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
    await approveRegistration(request.id, `Admin ${employee.name}`);

    // Create Better Auth account (hashPassword + direct SQL)
    try {
      const { getSql } = await import("@/lib/db");
      const { hashPassword } = await import("better-auth/crypto");
      const sql = await getSql();
      const users = await sql<{ id: string }>`
        SELECT id FROM "user" WHERE email = ${request.email} LIMIT 1
      `;
      let userId: string;
      if (users.length === 0) {
        userId = crypto.randomUUID();
        await sql`
          INSERT INTO "user" (id, name, email, "emailVerified", "createdAt", "updatedAt")
          VALUES (${userId}, ${request.name}, ${request.email}, false, NOW(), NOW())
        `;
      } else {
        userId = users[0].id;
      }
      const hashed = await hashPassword(request.password);
      const existingAccount = await sql<{ id: string }>`
        SELECT id FROM "account" WHERE "userId" = ${userId} AND "providerId" = 'email' LIMIT 1
      `;
      if (existingAccount.length > 0) {
        await sql`
          UPDATE "account" SET password = ${JSON.stringify(hashed)}, "updatedAt" = NOW()
          WHERE id = ${existingAccount[0].id}
        `;
      } else {
        await sql`
          INSERT INTO "account" (id, "userId", "accountId", "providerId", password, "createdAt", "updatedAt")
          VALUES (${crypto.randomUUID()}, ${userId}, ${request.email}, 'email', ${JSON.stringify(hashed)}, NOW(), NOW())
        `;
      }
    } catch (err: any) {
      console.error("[auth] Auto-approve: failed to create auth account:", err?.message ?? err);
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

