import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDesc } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/lib/store";
import { isAdminRole } from "@/lib/catalog";
import { getDefaultModuleAccess, getUserModuleAccess, ModuleKey, MODULE_DEFINITIONS, setUserModuleAccess, resetUserModuleAccess } from "@/lib/permissions";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/admin/permissions")({
  component: AdminPermissionsPage,
});

type ModulePermissionRow = {
  key: ModuleKey;
  label: string;
  defaultEnabled: boolean;
  userEnabled: boolean;
};

function AdminPermissionsPage() {
  const { user, isPending } = useCurrentUserState();
  const employees = useAppStore((s) => s.employees);
  const [search, setSearch] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [moduleRows, setModuleRows] = useState<ModulePermissionRow[]>([]);

  const employee = user ? employees.find((e) => e.email === (user.primaryEmail ?? "")) ?? employees.find((e) => e.username === (user.displayName ?? "")) : null;
  const isAdmin = employee ? isAdminRole(employee.role) : false;

  const filteredEmployees = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return employees;
    return employees.filter((person) => {
      const haystack = `${person.name} ${person.username} ${person.email} ${person.dept}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [search, employees]);

  useEffect(() => {
    if (!selectedEmployeeId && filteredEmployees[0]) {
      setSelectedEmployeeId(filteredEmployees[0].id);
    }
  }, [filteredEmployees, selectedEmployeeId]);

  useEffect(() => {
    const selected = employees.find((person) => person.id === selectedEmployeeId) ?? filteredEmployees[0];
    if (!selected) return;

    const defaultMap = getDefaultModuleAccess(selected);
    const overrideMap = getUserModuleAccess(selected.id);
    const nextRows: ModulePermissionRow[] = MODULE_DEFINITIONS.filter((module) => module.key !== "admin").map((module) => ({
      key: module.key,
      label: module.label,
      defaultEnabled: Boolean(defaultMap[module.key]),
      userEnabled: Boolean(overrideMap[module.key] ?? defaultMap[module.key]),
    }));

    setModuleRows(nextRows);
  }, [selectedEmployeeId, employees, filteredEmployees]);

  // Wait for session to resolve before redirecting
  if (isPending) return null;
  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  const selectedEmployee = employees.find((person) => person.id === selectedEmployeeId) ?? filteredEmployees[0];

  const updateModule = (moduleKey: ModuleKey, enabled: boolean) => {
    if (!selectedEmployee) return;

    setUserModuleAccess(selectedEmployee.id, moduleKey, enabled);
    setModuleRows((rows) =>
      rows.map((row) => (row.key === moduleKey ? { ...row, userEnabled: enabled } : row)),
    );
    toast.success(`${selectedEmployee.name}: ${enabled ? "đã bật" : "đã tắt"} quyền ${MODULE_DEFINITIONS.find((item) => item.key === moduleKey)?.label ?? moduleKey}`);
  };

  const resetModules = () => {
    if (!selectedEmployee) return;
    resetUserModuleAccess(selectedEmployee.id);
    const defaultMap = getDefaultModuleAccess(selectedEmployee);
    setModuleRows((rows) =>
      rows.map((row) => ({
        ...row,
        userEnabled: Boolean(defaultMap[row.key]),
      })),
    );
    toast.success(`Đã reset quyền mặc định cho ${selectedEmployee.name}`);
  };

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-ink">Phân quyền người dùng</h1>
        <p className="text-muted">Quản lý module truy cập cho từng nhân sự. Mọi người đều có quyền chấm công, check-in và nhiệm vụ.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Nhân sự</CardTitle>
            <CardDesc>Chọn người cần điều chỉnh quyền</CardDesc>
          </CardHeader>
          <div className="space-y-3 px-4 pb-4">
            <div>
              <Label htmlFor="search-user">Tìm nhân sự</Label>
              <Input
                id="search-user"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tên, email, bộ phận..."
                className="mt-2"
              />
            </div>
            <div className="max-h-[480px] space-y-1 overflow-y-auto pr-1">
              {filteredEmployees.map((person) => (
                <button
                  key={person.id}
                  type="button"
                  onClick={() => setSelectedEmployeeId(person.id)}
                  className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left transition ${
                    selectedEmployee?.id === person.id
                      ? "border-accent bg-accent-soft"
                      : "border-line bg-surface hover:border-accent/30"
                  }`}
                >
                  <div>
                    <div className="font-medium text-ink">{person.name}</div>
                    <div className="text-xs text-muted">{person.dept}</div>
                  </div>
                  <span className="rounded-full bg-surface-2 px-2 py-1 text-[10px] font-medium text-muted">
                    {person.role}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>{selectedEmployee?.name ?? "Chưa chọn"}</CardTitle>
              <CardDesc>
                {selectedEmployee?.dept ?? "-"} • {selectedEmployee?.center ?? "-"}
              </CardDesc>
            </div>
            <Button variant="outline" size="sm" onClick={resetModules}>
              Reset mặc định
            </Button>
          </CardHeader>

          <div className="space-y-3 px-4 pb-4">
            {moduleRows.map((row) => (
              <div
                key={row.key}
                className="flex items-center justify-between gap-4 rounded-xl border border-line bg-surface px-3 py-3"
              >
                <div>
                  <div className="font-medium text-ink">{row.label}</div>
                  <div className="text-xs text-muted">
                    Mặc định: {row.defaultEnabled ? "Có" : "Không"}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => updateModule(row.key, !row.userEnabled)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                    row.userEnabled ? "bg-accent" : "bg-slate-300"
                  }`}
                  aria-label={`Bật/tắt quyền ${row.label}`}
                >
                  <span
                    className={`inline-block size-5 rounded-full bg-white shadow transition ${
                      row.userEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
