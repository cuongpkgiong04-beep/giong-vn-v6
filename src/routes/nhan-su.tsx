import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LayoutGrid, List, Search } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Card } from "@/components/ui/card";
import { EMPLOYEES, centerName } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/nhan-su")({ component: NhanSuPage });

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

type ViewMode = "grid" | "table";

function NhanSuPage() {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");
  const [view, setView] = useState<ViewMode>("grid");

  const depts = useMemo(() => [...new Set(EMPLOYEES.map((e) => e.dept))].sort(), []);
  const rows = EMPLOYEES.filter((e) => {
    if (dept !== "all" && e.dept !== dept) return false;
    if (q.trim()) {
      const s = q.toLowerCase();
      return (
        e.name.toLowerCase().includes(s) ||
        e.username.toLowerCase().includes(s) ||
        e.email.toLowerCase().includes(s) ||
        e.dept.toLowerCase().includes(s) ||
        e.title.toLowerCase().includes(s) ||
        centerName(e.center).toLowerCase().includes(s)
      );
    }
    return true;
  });

  const stats = useMemo(() => {
    const total = EMPLOYEES.length;
    const active = EMPLOYEES.filter((e) => e.status === "Đang làm việc").length;
    const admins = EMPLOYEES.filter((e) => e.role === "Admin" || e.role === "SuperAdmin").length;
    const centers = new Set(EMPLOYEES.map((e) => e.center)).size;
    return { total, active, admins, centers };
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="Danh mục"
        title="Nhân sự"
        desc={`${stats.total} người đang làm việc · ${stats.admins} quản trị · ${stats.centers} đơn vị`}
      />

      {/* Stats row */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Tổng nhân sự", value: stats.total, color: "text-ink" },
          { label: "Đang làm việc", value: stats.active, color: "text-ok" },
          { label: "Quản trị", value: stats.admins, color: "text-accent" },
          { label: "Đơn vị", value: stats.centers, color: "text-muted" },
        ].map((s) => (
          <Card key={s.label} className="px-4 py-3">
            <p className="text-xs font-medium tracking-wide text-muted uppercase">{s.label}</p>
            <p className={cn("mt-1 text-2xl font-semibold tabular", s.color)}>{s.value}</p>
          </Card>
        ))}
      </div>

      {/* Filters + view toggle */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-faint" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm tên, tài khoản, phòng ban, trung tâm…"
            className="h-11 w-full rounded-xl border border-line bg-surface/90 pr-3 pl-10 text-sm text-ink shadow-[var(--shadow-card)] placeholder:text-faint transition focus:border-accent/30 focus:ring-2 focus:ring-accent/20 focus:outline-none"
          />
        </div>
        <select
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          className="h-11 rounded-xl border border-line bg-surface/90 px-3 text-sm shadow-[var(--shadow-card)] sm:w-56"
        >
          <option value="all">Mọi bộ phận ({EMPLOYEES.length})</option>
          {depts.map((d) => (
            <option key={d} value={d}>
              {d} ({EMPLOYEES.filter((e) => e.dept === d).length})
            </option>
          ))}
        </select>
        <div className="flex rounded-lg border border-line bg-surface/90 p-0.5">
          <button
            type="button"
            onClick={() => setView("grid")}
            className={cn(
              "flex size-9 items-center justify-center rounded-md transition-colors",
              view === "grid" ? "bg-accent text-accent-fg" : "text-muted hover:text-ink",
            )}
            aria-label="Dạng lưới"
          >
            <LayoutGrid className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setView("table")}
            className={cn(
              "flex size-9 items-center justify-center rounded-md transition-colors",
              view === "table" ? "bg-accent text-accent-fg" : "text-muted hover:text-ink",
            )}
            aria-label="Dạng bảng"
          >
            <List className="size-4" />
          </button>
        </div>
      </div>

      <p className="mb-3 text-sm text-muted">
        Hiển thị <span className="font-medium text-ink">{rows.length}</span> / {EMPLOYEES.length} nhân sự
      </p>

      {/* Grid view */}
      {view === "grid" && (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((e) => (
            <Card key={e.id} className="flex gap-3 p-4 transition-shadow hover:shadow-[var(--shadow-card-hover)]">
              <span
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                  e.role === "Admin" || e.role === "SuperAdmin"
                    ? "bg-accent text-accent-fg"
                    : "bg-accent-soft text-accent",
                )}
              >
                {initials(e.name)}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-ink">{e.name}</p>
                <p className="text-sm text-muted">
                  {e.title} · {e.dept}
                </p>
                <p className="mt-1 text-xs text-faint">
                  {e.username} · {centerName(e.center)}
                </p>
                {e.phone && (
                  <p className="mt-0.5 text-xs text-faint">📱 {e.phone}</p>
                )}
                <div className="mt-2 flex flex-wrap gap-1">
                  <StatusBadge value={e.role} />
                  <StatusBadge value={e.status} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Table view */}
      {view === "table" && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2/50">
                  <th className="px-4 py-3 text-left font-medium text-muted">#</th>
                  <th className="px-4 py-3 text-left font-medium text-muted">Họ tên</th>
                  <th className="px-4 py-3 text-left font-medium text-muted">Chức danh</th>
                  <th className="px-4 py-3 text-left font-medium text-muted">Bộ phận</th>
                  <th className="px-4 py-3 text-left font-medium text-muted">Đơn vị</th>
                  <th className="px-4 py-3 text-left font-medium text-muted">Tài khoản</th>
                  <th className="px-4 py-3 text-left font-medium text-muted">Liên hệ</th>
                  <th className="px-4 py-3 text-left font-medium text-muted">Quyền</th>
                  <th className="px-4 py-3 text-left font-medium text-muted">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((e, i) => (
                  <tr key={e.id} className="border-b border-line transition-colors hover:bg-surface-2/30">
                    <td className="px-4 py-3 text-faint tabular">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                            e.role === "Admin" || e.role === "SuperAdmin"
                              ? "bg-accent text-accent-fg"
                              : "bg-accent-soft text-accent",
                          )}
                        >
                          {initials(e.name)}
                        </span>
                        <span className="font-medium text-ink">{e.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted">{e.title}</td>
                    <td className="px-4 py-3 text-muted">{e.dept}</td>
                    <td className="px-4 py-3 text-muted">{centerName(e.center)}</td>
                    <td className="px-4 py-3 text-xs text-faint">{e.username}</td>
                    <td className="px-4 py-3 text-xs text-faint">
                      {e.phone && <div>📱 {e.phone}</div>}
                      {e.email && <div className="truncate max-w-[180px]">✉️ {e.email}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge value={e.role} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge value={e.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rows.length === 0 && (
            <div className="py-12 text-center text-muted">
              Không tìm thấy nhân sự nào phù hợp
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
