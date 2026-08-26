import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { EMPLOYEES } from "./catalog.ts";
import {
  getAllowedNavItems,
  getEffectiveModuleAccess,
  setUserModuleAccess,
  resetUserModuleAccess,
} from "./permissions.ts";

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
  });

  it("grants mandatory access to attendance, check-in and tasks by default", () => {
    const employee = EMPLOYEES.find((item) => item.id === "S01")!;
    const allowed = getAllowedNavItems(employee);

    assert.equal(allowed.includes("/cham-cong"), true);
    assert.equal(allowed.includes("/check-in"), true);
    assert.equal(allowed.includes("/nhiem-vu"), true);
  });

  it("updates explicit user access when admin overrides a module", () => {
    const employee = EMPLOYEES.find((item) => item.id === "U006")!;

    setUserModuleAccess(employee.id, "inventory", false);
    assert.equal(getEffectiveModuleAccess(employee, "inventory"), false);
    assert.equal(getAllowedNavItems(employee).includes("/kho"), false);

    setUserModuleAccess(employee.id, "inventory", true);
    assert.equal(getEffectiveModuleAccess(employee, "inventory"), true);
    assert.equal(getAllowedNavItems(employee).includes("/kho"), true);

    resetUserModuleAccess(employee.id);
    assert.equal(getEffectiveModuleAccess(employee, "inventory"), true);
  });
});
