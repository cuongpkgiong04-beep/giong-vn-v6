import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { EMPLOYEES } from "./catalog.ts";
import {
  getAllowedNavItems,
  getEffectiveModuleAccess,
  setUserModuleAccess,
  resetUserModuleAccess,
} from "./permissions.ts";

// Initialize store with test employees before tests
import { useAppStore } from "./store.ts";

const fakeStorage = new Map<string, string>();
const makeStorage = () => ({
  getItem: (key: string) => (fakeStorage.has(key) ? fakeStorage.get(key)! : null),
  setItem: (key: string, value: string) => {
    fakeStorage.set(key, value);
  },
  removeItem: (key: string) => {
    fakeStorage.delete(key);
  },
  clear: () => {
    fakeStorage.clear();
  },
});

describe("module permission matrix", () => {
  beforeEach(() => {
    fakeStorage.clear();
    const storage = makeStorage();
    Object.defineProperty(globalThis, "localStorage", {
      value: storage,
      configurable: true,
      writable: true,
    });
    // Seed store with test employees (matching migration 0008 UUIDs)
    useAppStore.setState({
      employees: [
        { id: "e0000000-0000-0000-0000-000000000014", name: "Lê Thị Bích", username: "Bích LT", gender: "Nữ", phone: "", email: "", dept: "Tiêm chủng", role: "User", title: "Điều dưỡng", center: "LB", status: "Đang làm việc" },
        { id: "e0000000-0000-0000-0000-000000000009", name: "Nguyễn Thị Dịu", username: "Dịu NT", gender: "Nữ", phone: "0388573597", email: "nguyendiuu1912@gmail.com", dept: "Kế toán", role: "User", title: "Kế toán viên", center: "VP", status: "Đang làm việc" },
        { id: "e0000000-0000-0000-0000-000000000003", name: "Phạm Kiên Cường", username: "CườngPK", gender: "Nam", phone: "0904075757", email: "cuongpk.giong04@gmail.com", dept: "Quản lý", role: "Admin", title: "Quản trị hệ thống", center: "VP", status: "Đang làm việc" },
      ],
      centers: [
        { code: "VP", name: "Văn phòng", short: "Văn phòng", city: "Hà Nội", kind: "Văn phòng" },
        { code: "LB", name: "Long Biên", short: "Long Biên", city: "Hà Nội", kind: "Trung tâm" },
      ],
    });
  });

  it("grants mandatory access to attendance, check-in and tasks by default", () => {
    const employee = EMPLOYEES.find((item) => item.id === "e0000000-0000-0000-0000-000000000014")!;
    const allowed = getAllowedNavItems(employee);

    assert.equal(allowed.includes("/cham-cong"), true);
    assert.equal(allowed.includes("/check-in"), true);
    assert.equal(allowed.includes("/nhiem-vu"), true);
  });

  it("updates explicit user access when admin overrides a module", () => {
    const employee = EMPLOYEES.find((item) => item.id === "e0000000-0000-0000-0000-000000000009")!;

    setUserModuleAccess(employee.id, "proposals", false);
    assert.equal(getEffectiveModuleAccess(employee, "proposals"), false);
    assert.equal(getAllowedNavItems(employee).includes("/de-nghi"), false);

    setUserModuleAccess(employee.id, "proposals", true);
    assert.equal(getEffectiveModuleAccess(employee, "proposals"), true);
    assert.equal(getAllowedNavItems(employee).includes("/de-nghi"), true);

    resetUserModuleAccess(employee.id);
    assert.equal(getEffectiveModuleAccess(employee, "proposals"), true);
  });
});
