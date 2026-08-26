/**
 * Server functions for managing registration requests.
 * Only admins can access these endpoints.
 */
import {
  getAllRegistrationRequests,
  approveRegistration,
  rejectRegistration,
  getRegistrationRequestById,
} from "@/lib/registrations";
import { getEmployeeByEmail, isAdminRole } from "@/lib/catalog";

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

/**
 * Get all registration requests (admin only)
 */
export async function getRegistrationRequests() {
  const admin = getCurrentAdmin();
  if (!admin) {
    throw new Error("Unauthorized - Admin access required");
  }

  const employee = getEmployeeByEmail(admin.email);
  if (!employee || !isAdminRole(employee.role)) {
    throw new Error("Unauthorized - Admin access required");
  }

  return getAllRegistrationRequests();
}

/**
 * Approve a registration request (admin only)
 */
export async function approveRegistrationRequest(data: { requestId: string }) {
  const admin = getCurrentAdmin();
  if (!admin) {
    throw new Error("Unauthorized - Admin access required");
  }

  const employee = getEmployeeByEmail(admin.email);
  if (!employee || !isAdminRole(employee.role)) {
    throw new Error("Unauthorized - Admin access required");
  }

  const request = approveRegistration(data.requestId, admin.name);
  if (!request) {
    throw new Error("Registration request not found");
  }

  return request;
}

/**
 * Reject a registration request (admin only)
 */
export async function rejectRegistrationRequest(data: {
  requestId: string;
  reason?: string;
}) {
  const admin = getCurrentAdmin();
  if (!admin) {
    throw new Error("Unauthorized - Admin access required");
  }

  const employee = getEmployeeByEmail(admin.email);
  if (!employee || !isAdminRole(employee.role)) {
    throw new Error("Unauthorized - Admin access required");
  }

  const request = rejectRegistration(
    data.requestId,
    admin.name,
    data.reason
  );
  if (!request) {
    throw new Error("Registration request not found");
  }

  return request;
}
