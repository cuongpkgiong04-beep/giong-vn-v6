import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EMPLOYEES, centerName } from "@/lib/catalog";

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

function NhanSuPage() {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");
  const depts = useMemo(() => [...new Set(EMPLOYEES.map((e) => e.dept))], []);
  const rows = EMPLOYEES.filter((e) => {
    if (dept !== "all" && e.dept !== dept) return false;
    if (q.trim()) {
      const s = q.toLowerCase();
      return e.name.toLowerCase().includes(s) || e.username.toLowerCase().includes(s) || e.email.toLowerCase().includes(s);
    }
    return true;
  });

  return (
    <div>
      <PageHeader
        eyebrow="Danh mục"
        title="Nhân sự"
        desc={`${EMPLOYEES.length} người đang làm việc tại văn phòng và các trung tâm tiêm chủng.`}
      />

      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm tên, tài khoản, email…" className="sm:max-w-sm" />
        <select
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          className="h-11 rounded-md bg-surface px-3 text-sm shadow-[var(--shadow-card)] sm:w-56"
        >
          <option value="all">Mọi bộ phận</option>
          {depts.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {rows.map((e) => (
          <Card key={e.id} className="flex gap-3 p-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
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
              <div className="mt-2 flex flex-wrap gap-1">
                <StatusBadge value={e.role} />
                <StatusBadge value={e.status} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
