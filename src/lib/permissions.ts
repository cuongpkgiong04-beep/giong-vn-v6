/**
 * Phân quyền chi tiết cho từng chức năng theo role, bộ phận và quyền override của admin.
 *
 * Quy tắc mới:
 *   - Mọi nhân sự đều có quyền truy cập mặc định vào Chấm công, Check-in và Nhiệm vụ.
 *   - Các module còn lại được cấp theo nhóm liên quan / bộ phận.
 *   - Admin có thể ghi đè quyền cho từng user theo module bằng bảng quản lý phân quyền.
 */
import type { Employee } from "./types";
import { isAdminRole, getEmployeeById } from "./catalog";

export type Permission =
  | "dashboard:view"
  | "attendance:view_own"
  | "attendance:view_all"
  | "attendance:view_center"
  | "attendance:clock_in"
  | "attendance:clock_out"
  | "attendance:approve"
  | "tasks:view_own"
  | "tasks:view_all"
  | "tasks:create_own"
  | "tasks:create_any"
  | "tasks:edit_own"
  | "tasks:edit_any"
  | "tasks:delete"
  | "tasks:change_status"
  | "proposals:view_own"
  | "proposals:view_all"
  | "proposals:create"
  | "proposals:approve"
  | "proposals:reject"
  | "hr:view"
  | "hr:edit"
  | "centers:view"
  | "centers:edit"
  | "docs:view"
  | "reports:view"
  | "notes:view"
  | "notes:create"
  | "chat:view"
  | "chat:send"
  | "checkin:view_own"
  | "checkin:view_all"
  | "checkin:create";

export type ModuleKey =
  | "dashboard"
  | "attendance"
  | "checkin"
  | "tasks"
  | "proposals"
  | "hr"
  | "centers"
  | "documents"
  | "reports"
  | "notes"
  | "chat"
  | "guide"
  | "admin";

const MODULE_ACCESS_STORAGE_KEY = "giong-vn-module-access";

type ModuleAccessMap = Partial<Record<ModuleKey, boolean>>;

export const MODULE_DEFINITIONS = [
  { key: "dashboard", label: "Tổng quan", paths: ["/"], group: "Điều hành" },
  { key: "attendance", label: "Chấm công", paths: ["/cham-cong"], group: "Vận hành" },
  { key: "checkin", label: "Check-in", paths: ["/check-in"], group: "Vận hành" },
  { key: "tasks", label: "Nhiệm vụ", paths: ["/nhiem-vu"], group: "Vận hành" },

  { key: "proposals", label: "Đề nghị", paths: ["/de-nghi"], group: "Nghiệp vụ" },
  { key: "hr", label: "Nhân sự", paths: ["/nhan-su"], group: "Danh mục" },
  { key: "centers", label: "Trung tâm", paths: ["/trung-tam"], group: "Danh mục" },
  { key: "documents", label: "Hồ sơ", paths: ["/ho-so"], group: "Danh mục" },
  { key: "reports", label: "Báo cáo", paths: ["/bao-cao"], group: "Hệ thống" },
  { key: "notes", label: "Ghi chú", paths: ["/ghi-chu"], group: "Hệ thống" },
  { key: "chat", label: "Chat", paths: ["/chat"], group: "Hệ thống" },
  { key: "guide", label: "Hướng dẫn", paths: ["/huong-dan"], group: "Hệ thống" },
  { key: "admin", label: "Quản trị", paths: ["/admin/approvals", "/admin/permissions"], group: "Quản trị" },
] as const;

export const MODULE_LABELS: Record<ModuleKey, string> = Object.fromEntries(
  MODULE_DEFINITIONS.map((module) => [module.key, module.label]),
) as Record<ModuleKey, string>;

function readModuleAccessStorage(): Record<string, ModuleAccessMap> {
  if (typeof globalThis === "undefined" || !("localStorage" in globalThis)) return {};

  try {
    const raw = globalThis.localStorage.getItem(MODULE_ACCESS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, ModuleAccessMap>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeModuleAccessStorage(value: Record<string, ModuleAccessMap>) {
  if (typeof globalThis === "undefined" || !("localStorage" in globalThis)) return;

  try {
    globalThis.localStorage.setItem(MODULE_ACCESS_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // ignore storage quota errors
  }
}

export function getUserModuleAccess(employeeId: string): ModuleAccessMap {
  if (!employeeId) return {};
  return readModuleAccessStorage()[employeeId] ?? {};
}

export function setUserModuleAccess(employeeId: string, moduleKey: ModuleKey, enabled: boolean) {
  const store = readModuleAccessStorage();
  const current = store[employeeId] ?? {};
  store[employeeId] = { ...current, [moduleKey]: enabled };
  writeModuleAccessStorage(store);
}

export function resetUserModuleAccess(employeeId: string) {
  const store = readModuleAccessStorage();
  delete store[employeeId];
  writeModuleAccessStorage(store);
}

export function getDefaultModuleAccess(employee: Employee | null): ModuleAccessMap {
  const defaultMap: ModuleAccessMap = {
    dashboard: true,
    attendance: true,
    checkin: true,
    tasks: true,
    notes: true,
    chat: true,
    guide: true,
    documents: true,
  };

  if (!employee) return defaultMap;

  const dept = employee.dept ?? "";
  const isAdmin = isAdminRole(employee.role);

  if (isAdmin) {
    return {
      dashboard: true,
      attendance: true,
      checkin: true,
      tasks: true,    proposals: true,
    hr: true,
      centers: true,
      documents: true,
      reports: true,
      notes: true,
      chat: true,
      guide: true,
      admin: true,
    };
  }

  if (["Hành chính - Nhân sự", "HCNS", "Ban giám đốc", "Quản lý", "Hệ thống"].includes(dept)) {
    defaultMap.hr = true;
    defaultMap.proposals = true;
  }

  if (["Ban giám đốc", "Quản lý", "Hệ thống", "Marketing"].includes(dept)) {
    defaultMap.reports = true;
  }

  if (["Ban giám đốc", "Quản lý", "Hệ thống"].includes(dept)) {
    defaultMap.centers = true;
  }

  return defaultMap;
}

export function getEffectiveModuleAccess(employee: Employee | null, moduleKey: ModuleKey): boolean {
  if (!employee) return false;
  if (isAdminRole(employee.role)) return true;

  const defaultMap = getDefaultModuleAccess(employee);
  const explicitMap = getUserModuleAccess(employee.id);
  return explicitMap[moduleKey] ?? defaultMap[moduleKey] ?? false;
}

export function getAllModuleAccess(employee: Employee | null): ModuleAccessMap {
  if (!employee) return {};
  const base = getDefaultModuleAccess(employee);
  const explicit = getUserModuleAccess(employee.id);
  const merged: ModuleAccessMap = { ...base };

  for (const key of Object.keys(explicit) as ModuleKey[]) {
    merged[key] = explicit[key] ?? merged[key];
  }

  return merged;
}

export function getPermissions(employee: Employee | null): Permission[] {
  if (!employee) return [];

  const effectiveModules = getAllModuleAccess(employee);
  const mappedPermissions: Permission[] = [];

  if (employee && isAdminRole(employee.role)) {
    return [
      "dashboard:view",
      "attendance:view_own",
      "attendance:view_all",
      "attendance:view_center",
      "attendance:clock_in",
      "attendance:clock_out",
      "attendance:approve",
      "tasks:view_own",
      "tasks:view_all",
      "tasks:create_own",
      "tasks:create_any",
      "tasks:edit_own",
      "tasks:edit_any",
      "tasks:delete",
      "tasks:change_status",
      "proposals:view_own",
      "proposals:view_all",
      "proposals:create",
      "proposals:approve",
      "proposals:reject",
      "hr:view",
      "hr:edit",
      "centers:view",
      "centers:edit",
      "docs:view",
      "reports:view",
      "notes:view",
      "notes:create",
      "chat:view",
      "chat:send",
      "checkin:view_own",
      "checkin:view_all",
      "checkin:create",
    ];
  }

  if (effectiveModules.dashboard) mappedPermissions.push("dashboard:view");
  if (effectiveModules.attendance) {
    mappedPermissions.push(
      "attendance:view_own",
      "attendance:view_center",
      "attendance:clock_in",
      "attendance:clock_out",
    );
  }
  if (effectiveModules.checkin) {
    mappedPermissions.push("checkin:view_own", "checkin:create");
  }
  if (effectiveModules.tasks) {
    mappedPermissions.push(
      "tasks:view_own",
      "tasks:create_own",
      "tasks:edit_own",
      "tasks:change_status",
    );
  }
  if (effectiveModules.proposals) {
    mappedPermissions.push("proposals:view_own", "proposals:create");
  }
  if (effectiveModules.hr) mappedPermissions.push("hr:view");
  if (effectiveModules.centers) mappedPermissions.push("centers:view");
  if (effectiveModules.documents) mappedPermissions.push("docs:view");
  if (effectiveModules.reports) mappedPermissions.push("reports:view");
  if (effectiveModules.notes) mappedPermissions.push("notes:view", "notes:create");
  if (effectiveModules.chat) mappedPermissions.push("chat:view", "chat:send");
  if (effectiveModules.guide) mappedPermissions.push("docs:view");

  return [...new Set(mappedPermissions)];
}

export function hasPermission(employee: Employee | null, permission: Permission): boolean {
  if (!employee) return false;
  const perms = getPermissions(employee);
  return perms.includes(permission);
}

export function canAccessEmployeeData(actor: Employee | null, targetId: string): boolean {
  if (!actor) return false;
  if (isAdminRole(actor.role)) return true;
  if (actor.id === targetId) return true;
  const target = getEmployeeById(targetId);
  if (target && target.center === actor.center) return true;
  return false;
}

export function canApproveProposals(employee: Employee | null): boolean {
  return hasPermission(employee, "proposals:approve");
}

export function canCreateTaskForOthers(employee: Employee | null): boolean {
  return hasPermission(employee, "tasks:create_any");
}

export function canEditTask(employee: Employee | null, taskCreatedBy: string): boolean {
  if (!employee) return false;
  if (isAdminRole(employee.role)) return true;
  if (employee.name === taskCreatedBy) return true;
  return false;
}

export function getAllowedNavItems(employee: Employee | null): string[] {
  if (!employee) return [];

  if (isAdminRole(employee.role)) {
    return Array.from(new Set(MODULE_DEFINITIONS.flatMap((module) => module.paths)));
  }

  const allowed = new Set<string>();
  for (const module of MODULE_DEFINITIONS) {
    if (module.key === "admin") continue;
    if (getEffectiveModuleAccess(employee, module.key)) {
      for (const path of module.paths) allowed.add(path);
    }
  }

  return [...allowed];
}

export function getPermissionLabel(permission: Permission): string {
  const labels: Record<Permission, string> = {
    "dashboard:view": "Xem tổng quan",
    "attendance:view_own": "Xem chấm công cá nhân",
    "attendance:view_all": "Xem chấm công toàn hệ thống",
    "attendance:view_center": "Xem chấm công trung tâm",
    "attendance:clock_in": "Điểm danh vào ca",
    "attendance:clock_out": "Điểm danh tan ca",
    "attendance:approve": "Duyệt chấm công",
    "tasks:view_own": "Xem nhiệm vụ cá nhân",
    "tasks:view_all": "Xem tất cả nhiệm vụ",
    "tasks:create_own": "Tạo nhiệm vụ cho bản thân",
    "tasks:create_any": "Tạo nhiệm vụ cho người khác",
    "tasks:edit_own": "Sửa nhiệm vụ cá nhân",
    "tasks:edit_any": "Sửa bất kỳ nhiệm vụ nào",
    "tasks:delete": "Xóa nhiệm vụ",
    "tasks:change_status": "Đổi trạng thái nhiệm vụ",
    "proposals:view_own": "Xem đề nghị cá nhân",
    "proposals:view_all": "Xem tất cả đề nghị",
    "proposals:create": "Tạo đề nghị",
    "proposals:approve": "Duyệt đề nghị",
    "proposals:reject": "Từ chối đề nghị",
    "hr:view": "Xem nhân sự",
    "hr:edit": "Sửa nhân sự",
    "centers:view": "Xem trung tâm",
    "centers:edit": "Sửa trung tâm",
    "docs:view": "Xem hồ sơ",
    "reports:view": "Xem báo cáo",
    "notes:view": "Xem ghi chú",
    "notes:create": "Tạo ghi chú",
    "chat:view": "Xem chat",
    "chat:send": "Gửi tin nhắn",
    "checkin:view_own": "Xem check-in cá nhân",
    "checkin:view_all": "Xem check-in toàn hệ thống",
    "checkin:create": "Tạo check-in",
  };
  return labels[permission] ?? permission;
}
