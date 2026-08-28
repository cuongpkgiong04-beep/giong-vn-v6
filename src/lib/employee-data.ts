/**
 * Static employee data for auth checks and tests.
 * This file has NO store dependency — safe to import in test environments.
 * For dynamic lookups in the app, use catalog.ts (which delegates to store).
 */

/** Approved employee emails for auth gating. */
export const APPROVED_EMAILS = new Set([
  "thuynvy218@gmail.com",
  "hoangminhchau2631960@gmail.com",
  "cuongpk.giong04@gmail.com",
  "cuongpk.giong02@gmail.com",
  "ketoangiongvina@gmail.com",
  "nguyenmyhanh2912@gmail.com",
  "thuonggvn@gmail.com",
  "nguyenhuong.ts2311@gmail.com",
  "nguyendiuu1912@gmail.com",
  "dinhthihuongtra19062002@gmail.com",
  "hieubin2106@gmail.com",
  "thanhhieu21061993@gmail.com",
]);

/** Check if email is in the approved list (synchronous, no store). */
export function isApprovedEmployeeEmail(email: string | null | undefined): boolean {
  const value = (email ?? "").trim().toLowerCase();
  if (!value) return false;
  return APPROVED_EMAILS.has(value);
}

/** Admin role check (pure function, no store). */
export function isAdminRole(role?: string | null): boolean {
  const normalized = (role ?? "").trim().toLowerCase();
  return [
    "superadmin",
    "super_admin",
    "admin",
    "regional_manager",
    "center_manager",
  ].includes(normalized);
}
