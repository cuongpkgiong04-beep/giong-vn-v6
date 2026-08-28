import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Building2,
  ClipboardList,
  FileText,
  Timer,
  Users,
} from "lucide-react";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ClientOnly } from "@/components/client-only";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
import { seedDaily } from "@/data";
import { CENTERS, EMPLOYEES, findEmployeeByLooseText } from "@/lib/catalog";
import { formatDate, formatLongDate, greetingVi, todayIso } from "@/lib/format";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Dashboard });

const CHART = "#1c6b58";
const CHART_2 = "#8a9893";

function Kpi({
  label,
  value,
  hint,
  to,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint?: string;
  to: string;
  icon: typeof Users;
}) {
  return (
    <Link
      to={to}
      className="group rounded-xl bg-surface p-4 shadow-[var(--shadow-card)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="flex items-start justify-between">
        <span className="flex size-10 items-center justify-center rounded-md bg-accent-soft text-accent">
          <Icon className="size-4" />
        </span>
        <ArrowUpRight className="size-4 text-faint opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <p className="mt-4 text-xs font-medium tracking-wide text-muted uppercase">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-ink tabular">{value}</p>
      {hint ? <p className="mt-1 text-xs text-faint">{hint}</p> : null}
    </Link>
  );
}

function Dashboard() {
  const tasks = useAppStore((s) => s.tasks);
  const attendance = useAppStore((s) => s.attendance);
  const proposals = useAppStore((s) => s.proposals);
  const userName = useAppStore((s) => s.currentName());
  const today = todayIso();

  const openTasks = tasks.filter((t) => t.status !== "Đã xong");
  const doneTasks = tasks.filter((t) => t.status === "Đã xong");
  const todayAtt = attendance.filter((a) => a.date === today);
  const todayInPeople = new Set(
    todayAtt
      .filter((a) => a.status.includes("vào"))
      .map((a) => findEmployeeByLooseText(a.name)?.id ?? a.name.trim().toLowerCase()),
  );
  const todayIn = todayInPeople.size;

  const attChart = useMemo(() => {
    return seedDaily
      .filter((d) => d.in + d.out >= 8)
      .slice(-14)
      .map((d) => ({
        day: d.date.slice(5).replace("-", "/"),
        vào: d.in,
        ra: d.out,
      }));
  }, []);

  const firstName = userName.split(" ").slice(-1)[0];
  const pending = proposals.filter((p) => p.status === "Chờ duyệt").length;


  const shortcuts = [
    { to: "/cham-cong", label: "Chấm công", desc: "Vào ca / tan ca", icon: Timer },
    { to: "/nhiem-vu", label: "Nhiệm vụ", desc: `${openTasks.length} việc mở`, icon: ClipboardList },

    { to: "/nhan-su", label: "Nhân sự", desc: `${EMPLOYEES.length} người`, icon: Users },
    { to: "/trung-tam", label: "Trung tâm", desc: `${CENTERS.filter((c) => c.kind === "Trung tâm").length} điểm tiêm`, icon: Building2 },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-accent uppercase">Dashboard</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl" suppressHydrationWarning>
            {greetingVi()}, {firstName}
          </h1>
          <p className="mt-1 text-sm text-muted">
            Điều hành chuỗi {CENTERS.filter((c) => c.kind === "Trung tâm").length} trung tâm tiêm chủng Gióng
            Việt Nam.
          </p>
        </div>
        <p className="text-sm text-faint tabular" suppressHydrationWarning>
          {formatLongDate()}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi
          label="Nhân sự"
          value={String(EMPLOYEES.length)}
          hint="Đang làm việc"
          to="/nhan-su"
          icon={Users}
        />
        <Kpi
          label="Chấm công hôm nay"
          value={String(todayIn)}
          hint={todayAtt.length ? `${todayAtt.length} lượt ghi` : "Chưa có lượt nào — bấm vào ca"}
          to="/cham-cong"
          icon={Timer}
        />
        <Kpi
          label="Nhiệm vụ mở"
          value={String(openTasks.length)}
          hint={`${doneTasks.length} đã xong`}
          to="/nhiem-vu"
          icon={ClipboardList}
        />
        <Kpi
          label="Đề nghị"
          value={String(pending)}
          hint="Chờ duyệt"
          to="/de-nghi"
          icon={FileText}
        />
      </div>

      <div className="mt-5">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Chấm công 14 phiên đông</CardTitle>
              <p className="mt-0.5 text-sm text-muted">Lượt vào ca / tan ca trên toàn hệ thống</p>
            </div>
          </CardHeader>
          <ClientOnly>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attChart} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                  <CartesianGrid stroke="#d3ddd8" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: "#5a6b65", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#5a6b65", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "none", boxShadow: "var(--shadow-card)" }}
                    labelStyle={{ color: "#12211c" }}
                  />
                  <Area type="monotone" dataKey="vào" stroke={CHART} fill={CHART} fillOpacity={0.18} strokeWidth={2} />
                  <Area type="monotone" dataKey="ra" stroke={CHART_2} fill={CHART_2} fillOpacity={0.12} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ClientOnly>
        </Card>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {shortcuts.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="flex items-center gap-3 rounded-xl bg-surface p-4 shadow-[var(--shadow-card)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-card-hover)]"
          >
            <span className="flex size-11 items-center justify-center rounded-md bg-forest text-forest-fg">
              <s.icon className="size-4" />
            </span>
            <span className="min-w-0">
              <span className="block font-medium text-ink">{s.label}</span>
              <span className="block text-sm text-muted">{s.desc}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Chấm công gần đây</CardTitle>
            <Link to="/cham-cong" className="text-sm font-medium text-accent hover:underline">
              Xem tất cả
            </Link>
          </CardHeader>
          <ul className="divide-y divide-line">
            {attendance.slice(0, 6).map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-3 py-2.5 first:pt-0">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{a.name}</p>
                  <p className="truncate text-xs text-muted">
                    {formatDate(a.date)} · {a.time}
                  </p>
                </div>
                <StatusBadge value={a.status} />
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nhiệm vụ đang mở</CardTitle>
            <Link to="/nhiem-vu" className="text-sm font-medium text-accent hover:underline">
              Bảng việc
            </Link>
          </CardHeader>
          <ul className="divide-y divide-line">
            {openTasks.slice(0, 6).map((t) => (
              <li key={t.id} className="py-2.5 first:pt-0">
                <p className="line-clamp-2 text-sm font-medium text-ink">{t.title}</p>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
                  <span>{t.assignee || "Chưa gán"}</span>
                  <span>· hạn {formatDate(t.due)}</span>
                  <StatusBadge value={t.status} />
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>


    </div>
  );
}
