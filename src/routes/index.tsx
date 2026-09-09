import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Building2,
  ClipboardList,
  FileText,
  MapPin,
  Timer,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
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
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { StatusBadge } from "@/components/status-badge";
import { findEmployeeByLooseText } from "@/lib/catalog";
import { formatDate, formatLongDate, greetingVi, todayIso } from "@/lib/format";
import { useAppStore } from "@/lib/store";
import type { Attendance, CheckIn, Proposal, Task } from "@/lib/types";

export const Route = createFileRoute("/")({ component: Dashboard });

const CHART = "#1c6b58";
const CHART_2 = "#8a9893";

/** Remove postal/zip codes from address strings (đồng bộ pattern bang-check-in) */
function cleanAddress(addr: string): string {
  if (!addr) return addr;
  let cleaned = addr.replace(/,?\s*\d{4,6}\s*(?=,|$)/g, "");
  cleaned = cleaned.replace(/(\S)\s+\d{4,6}(?=,)/g, "$1");
  cleaned = cleaned.replace(/,\s*,/g, ",").replace(/^\s*,|,\s*$/g, "");
  return cleaned.trim();
}

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

/** Một hàng giá trị trong dialog chi tiết */
function DetailRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5">
      <span className="shrink-0 text-xs font-medium text-muted">{label}</span>
      <span className="min-w-0 text-right text-sm break-words text-ink">{value || "—"}</span>
    </div>
  );
}

type ListDialogKind = "attendance" | "tasks" | "checkins" | "proposals" | null;

function Dashboard() {
  const tasks = useAppStore((s) => s.tasks);
  const attendance = useAppStore((s) => s.attendance);
  const proposals = useAppStore((s) => s.proposals);
  const checkins = useAppStore((s) => s.checkins);
  const employees = useAppStore((s) => s.employees);
  const centers = useAppStore((s) => s.centers);
  const userName = useAppStore((s) => s.currentName());
  const today = todayIso();

  // Dialog chi tiết + danh sách + lightbox
  const [listDialog, setListDialog] = useState<ListDialogKind>(null);
  const [detailAtt, setDetailAtt] = useState<Attendance | null>(null);
  const [detailTask, setDetailTask] = useState<Task | null>(null);
  const [detailCheckin, setDetailCheckin] = useState<CheckIn | null>(null);
  const [detailProposal, setDetailProposal] = useState<Proposal | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const openTasks = tasks.filter((t) => t.status !== "Đã xong");
  const doneTasks = tasks.filter((t) => t.status === "Đã xong");
  const todayAtt = attendance.filter((a) => a.date === today);
  const todayCk = checkins.filter((c) => c.date === today);
  const todayInPeople = new Set(
    todayAtt
      .filter((a) => a.status.includes("vào"))
      .map((a) => findEmployeeByLooseText(a.name)?.id ?? a.name.trim().toLowerCase()),
  );
  const todayIn = todayInPeople.size;

  // "14 phiên đông" = 14 ngày có nhiều lượt vào/ra nhất, tính từ data chấm công thật
  const attChart = useMemo(() => {
    const byDate = new Map<string, { in: number; out: number }>();
    for (const a of attendance) {
      const bucket = byDate.get(a.date) ?? { in: 0, out: 0 };
      if (a.status.includes("vào")) bucket.in += 1;
      if (a.status.includes("tan")) bucket.out += 1;
      byDate.set(a.date, bucket);
    }
    return [...byDate.entries()]
      .map(([date, b]) => ({ date, ...b, total: b.in + b.out }))
      .sort((x, y) => y.total - x.total) // đông nhất lên trước
      .slice(0, 14) // lấy đúng 14 phiên đông
      .sort((x, y) => (x.date < y.date ? -1 : 1)) // hiển thị theo thứ tự thời gian
      .map((d) => ({
        day: d.date.slice(5).replace("-", "/"),
        vào: d.in,
        ra: d.out,
      }));
  }, [attendance]);

  const firstName = userName.split(" ").slice(-1)[0];
  const pending = proposals.filter((p) => p.status === "Chờ duyệt").length;

  const centerShort = (code?: string) =>
    (code ? centers.find((c) => c.code === code)?.short : "") ?? code ?? "—";

  const shortcuts = [
    { to: "/cham-cong", label: "Chấm công", desc: "Vào ca / tan ca", icon: Timer },
    { to: "/check-in", label: "Check-in", desc: `${todayCk.length} lượt hôm nay`, icon: MapPin },
    { to: "/nhiem-vu", label: "Nhiệm vụ", desc: `${openTasks.length} việc mở`, icon: ClipboardList },
    { to: "/de-nghi", label: "Đề nghị", desc: `${pending} chờ duyệt`, icon: FileText },
    { to: "/nhan-su", label: "Nhân sự", desc: `${employees.length} người`, icon: Users },
    { to: "/trung-tam", label: "Trung tâm", desc: `${centers.filter((c) => c.kind === "Trung tâm").length} điểm tiêm`, icon: Building2 },
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
            Điều hành chuỗi {centers.filter((c) => c.kind === "Trung tâm").length} trung tâm tiêm chủng Gióng
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
          value={String(employees.length)}
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
              {attChart.length === 0 ? (
                <div className="flex h-full items-center justify-center text-sm text-muted">
                  Chưa có dữ liệu chấm công — biểu đồ sẽ hiển thị khi có lượt vào ca / tan ca.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={attChart} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                    <CartesianGrid stroke="#d3ddd8" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" tick={{ fill: "#5a6b65", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#5a6b65", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: 12, border: "none", boxShadow: "var(--shadow-card)" }}
                      labelStyle={{ color: "#12211c" }}
                    />
                    <Area type="monotone" dataKey="vào" stroke={CHART} fill={CHART} fillOpacity={0.18} strokeWidth={2} />
                    <Area type="monotone" dataKey="ra" stroke={CHART_2} fill={CHART_2} fillOpacity={0.12} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </ClientOnly>
        </Card>
      </div>

      {/* 6 lối tắt — mobile 2 cột × 3 hàng, desktop 3 cột × 2 hàng */}
      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {shortcuts.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="flex items-center gap-3 rounded-xl bg-surface p-4 shadow-[var(--shadow-card)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-card-hover)]"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-forest text-forest-fg">
              <s.icon className="size-4" />
            </span>
            <span className="min-w-0">
              <span className="block font-medium text-ink">{s.label}</span>
              <span className="block truncate text-sm text-muted">{s.desc}</span>
            </span>
          </Link>
        ))}
      </div>

      {/* 4 bảng tóm tắt — desktop 2×2, mobile 1 cột */}
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {/* 1. Chấm công gần đây */}
        <Card>
          <CardHeader>
            <CardTitle>Chấm công gần đây</CardTitle>
            <button
              type="button"
              onClick={() => setListDialog("attendance")}
              className="text-sm font-medium text-accent hover:underline"
            >
              Xem tất cả
            </button>
          </CardHeader>
          {attendance.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted">Chưa có dữ liệu chấm công.</p>
          ) : (
            <ul className="divide-y divide-line">
              {attendance.slice(0, 6).map((a) => (
                <li
                  key={a.id}
                  onClick={() => setDetailAtt(a)}
                  className="-mx-2 flex cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-2.5 transition-colors first:pt-0 hover:bg-surface-2"
                >
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
          )}
        </Card>

        {/* 2. Nhiệm vụ đang mở */}
        <Card>
          <CardHeader>
            <CardTitle>Nhiệm vụ đang mở</CardTitle>
            <button
              type="button"
              onClick={() => setListDialog("tasks")}
              className="text-sm font-medium text-accent hover:underline"
            >
              Bảng việc
            </button>
          </CardHeader>
          {openTasks.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted">Không có nhiệm vụ đang mở.</p>
          ) : (
            <ul className="divide-y divide-line">
              {openTasks.slice(0, 6).map((t) => (
                <li
                  key={t.id}
                  onClick={() => setDetailTask(t)}
                  className="-mx-2 cursor-pointer rounded-md px-2 py-2.5 transition-colors first:pt-0 hover:bg-surface-2"
                >
                  <p className="line-clamp-2 text-sm font-medium text-ink">{t.title}</p>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
                    <span>{t.assignee || "Chưa gán"}</span>
                    <span>· hạn {formatDate(t.due)}</span>
                    <StatusBadge value={t.status} />
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* 3. Check-in gần đây */}
        <Card>
          <CardHeader>
            <CardTitle>Check-in gần đây</CardTitle>
            <button
              type="button"
              onClick={() => setListDialog("checkins")}
              className="text-sm font-medium text-accent hover:underline"
            >
              Xem tất cả
            </button>
          </CardHeader>
          {checkins.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted">Chưa có lượt check-in nào.</p>
          ) : (
            <ul className="divide-y divide-line">
              {checkins.slice(0, 6).map((c) => (
                <li
                  key={c.id}
                  onClick={() => setDetailCheckin(c)}
                  className="-mx-2 flex cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-2.5 transition-colors first:pt-0 hover:bg-surface-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{c.name}</p>
                    <p className="truncate text-xs text-muted">
                      {formatDate(c.date)} · {c.time}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
                    {centerShort(c.centerCode)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* 4. Đề nghị gần đây */}
        <Card>
          <CardHeader>
            <CardTitle>Đề nghị gần đây</CardTitle>
            <button
              type="button"
              onClick={() => setListDialog("proposals")}
              className="text-sm font-medium text-accent hover:underline"
            >
              Xem tất cả
            </button>
          </CardHeader>
          {proposals.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted">Chưa có đề nghị nào.</p>
          ) : (
            <ul className="divide-y divide-line">
              {proposals.slice(0, 6).map((p) => (
                <li
                  key={p.id}
                  onClick={() => setDetailProposal(p)}
                  className="-mx-2 cursor-pointer rounded-md px-2 py-2.5 transition-colors first:pt-0 hover:bg-surface-2"
                >
                  <p className="line-clamp-2 text-sm font-medium text-ink">{p.title}</p>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
                    <span>{p.requester}</span>
                    <span>· {formatDate(p.date)}</span>
                    <StatusBadge value={p.status} />
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* ===== Dialog danh sách đầy đủ ===== */}
      <Dialog open={listDialog === "attendance"} onOpenChange={(o) => !o && setListDialog(null)}>
        <DialogContent className="max-w-xl">
          <DialogTitle>Chấm công — tất cả</DialogTitle>
          <p className="mt-1 text-xs text-muted">Bấm vào một dòng để xem chi tiết.</p>
          <ul className="mt-2 divide-y divide-line">
            {attendance.map((a) => (
              <li
                key={a.id}
                onClick={() => { setDetailAtt(a); setListDialog(null); }}
                className="-mx-2 flex cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-2.5 hover:bg-surface-2"
              >
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
        </DialogContent>
      </Dialog>

      <Dialog open={listDialog === "tasks"} onOpenChange={(o) => !o && setListDialog(null)}>
        <DialogContent className="max-w-xl">
          <DialogTitle>Nhiệm vụ đang mở — tất cả</DialogTitle>
          <p className="mt-1 text-xs text-muted">Bấm vào một dòng để xem chi tiết.</p>
          <ul className="mt-2 divide-y divide-line">
            {openTasks.map((t) => (
              <li
                key={t.id}
                onClick={() => { setDetailTask(t); setListDialog(null); }}
                className="-mx-2 cursor-pointer rounded-md px-2 py-2.5 hover:bg-surface-2"
              >
                <p className="line-clamp-2 text-sm font-medium text-ink">{t.title}</p>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
                  <span>{t.assignee || "Chưa gán"}</span>
                  <span>· hạn {formatDate(t.due)}</span>
                  <StatusBadge value={t.status} />
                </p>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>

      <Dialog open={listDialog === "checkins"} onOpenChange={(o) => !o && setListDialog(null)}>
        <DialogContent className="max-w-xl">
          <DialogTitle>Check-in — tất cả</DialogTitle>
          <p className="mt-1 text-xs text-muted">Bấm vào một dòng để xem chi tiết.</p>
          <ul className="mt-2 divide-y divide-line">
            {checkins.map((c) => (
              <li
                key={c.id}
                onClick={() => { setDetailCheckin(c); setListDialog(null); }}
                className="-mx-2 flex cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-2.5 hover:bg-surface-2"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{c.name}</p>
                  <p className="truncate text-xs text-muted">
                    {formatDate(c.date)} · {c.time}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
                  {centerShort(c.centerCode)}
                </span>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>

      <Dialog open={listDialog === "proposals"} onOpenChange={(o) => !o && setListDialog(null)}>
        <DialogContent className="max-w-xl">
          <DialogTitle>Đề nghị — tất cả</DialogTitle>
          <p className="mt-1 text-xs text-muted">Bấm vào một dòng để xem chi tiết.</p>
          <ul className="mt-2 divide-y divide-line">
            {proposals.map((p) => (
              <li
                key={p.id}
                onClick={() => { setDetailProposal(p); setListDialog(null); }}
                className="-mx-2 cursor-pointer rounded-md px-2 py-2.5 hover:bg-surface-2"
              >
                <p className="line-clamp-2 text-sm font-medium text-ink">{p.title}</p>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
                  <span>{p.requester}</span>
                  <span>· {formatDate(p.date)}</span>
                  <StatusBadge value={p.status} />
                </p>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>

      {/* ===== Dialog chi tiết ===== */}
      {/* Chi tiết Chấm công */}
      <Dialog open={!!detailAtt} onOpenChange={(o) => !o && setDetailAtt(null)}>
        <DialogContent>
          <DialogTitle>Chi tiết Chấm công</DialogTitle>
          <div className="mt-2 flex items-center gap-2">
            <StatusBadge value={detailAtt?.status ?? ""} />
            <span className="text-xs text-muted">{detailAtt?.type || "—"}</span>
          </div>
          <div className="mt-3 divide-y divide-line">
            <DetailRow label="Nhân sự" value={detailAtt?.name} />
            <DetailRow label="Ngày" value={detailAtt ? `${formatDate(detailAtt.date)} (${detailAtt.weekday})` : ""} />
            <DetailRow label="Giờ" value={detailAtt?.time} />
            <DetailRow label="Trụ sở" value={detailAtt?.workplace} />
            <DetailRow label="Địa điểm" value={detailAtt ? cleanAddress(detailAtt.address || detailAtt.gps) : ""} />
            <DetailRow label="GPS" value={detailAtt?.gps} />
            <DetailRow label="Duyệt" value={detailAtt?.approved} />
          </div>
          {detailAtt?.photo ? (
            <img
              src={detailAtt.photo}
              alt="Ảnh chấm công"
              title="Bấm để phóng to"
              onClick={() => setLightbox(detailAtt.photo!)}
              className="mt-3 max-h-72 w-full cursor-zoom-in rounded-lg border border-line object-contain hover:opacity-90"
            />
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Chi tiết Nhiệm vụ */}
      <Dialog open={!!detailTask} onOpenChange={(o) => !o && setDetailTask(null)}>
        <DialogContent>
          <DialogTitle>Chi tiết Nhiệm vụ</DialogTitle>
          <div className="mt-2">
            <StatusBadge value={detailTask?.status ?? ""} />
          </div>
          <p className="mt-2 text-sm leading-5 text-ink">{detailTask?.title}</p>
          <div className="mt-3 divide-y divide-line">
            <DetailRow label="Phụ trách" value={detailTask?.assignee} />
            <DetailRow label="Người giao" value={detailTask?.assigner || detailTask?.createdBy} />
            <DetailRow label="Người hỗ trợ" value={detailTask?.support} />
            <DetailRow label="Khởi tạo" value={detailTask ? formatDate(detailTask.created) : ""} />
            <DetailRow label="Hạn" value={detailTask ? formatDate(detailTask.due) : ""} />
            <DetailRow label="Vướng mắc" value={detailTask?.blocker} />
            <DetailRow label="Vị trí" value={detailTask?.location} />
          </div>
          {detailTask?.photo ? (
            <img
              src={detailTask.photo}
              alt="Ảnh nhiệm vụ"
              title="Bấm để phóng to"
              onClick={() => setLightbox(detailTask.photo!)}
              className="mt-3 max-h-72 w-full cursor-zoom-in rounded-lg border border-line object-contain hover:opacity-90"
            />
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Chi tiết Check-in */}
      <Dialog open={!!detailCheckin} onOpenChange={(o) => !o && setDetailCheckin(null)}>
        <DialogContent>
          <DialogTitle>Chi tiết Check-in</DialogTitle>
          <div className="mt-2">
            <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
              Trung tâm: {centerShort(detailCheckin?.centerCode)}
            </span>
          </div>
          <div className="mt-3 divide-y divide-line">
            <DetailRow label="Nhân sự" value={detailCheckin?.name} />
            <DetailRow label="Ngày" value={detailCheckin ? `${formatDate(detailCheckin.date)} (${detailCheckin.weekday})` : ""} />
            <DetailRow label="Giờ" value={detailCheckin?.time} />
            <DetailRow label="Địa điểm" value={detailCheckin ? cleanAddress(detailCheckin.address || detailCheckin.gps) : ""} />
            <DetailRow label="GPS" value={detailCheckin?.gps} />
            <DetailRow label="Ghi chú" value={detailCheckin?.note} />
          </div>
          {detailCheckin?.photo ? (
            <img
              src={detailCheckin.photo}
              alt="Ảnh check-in"
              title="Bấm để phóng to"
              onClick={() => setLightbox(detailCheckin.photo!)}
              className="mt-3 max-h-72 w-full cursor-zoom-in rounded-lg border border-line object-contain hover:opacity-90"
            />
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Chi tiết Đề nghị */}
      <Dialog open={!!detailProposal} onOpenChange={(o) => !o && setDetailProposal(null)}>
        <DialogContent>
          <DialogTitle>Chi tiết Đề nghị</DialogTitle>
          <div className="mt-2 flex items-center gap-2">
            <StatusBadge value={detailProposal?.status ?? ""} />
            <span className="text-xs text-muted">{detailProposal?.kind || "—"}</span>
          </div>
          <p className="mt-2 text-sm leading-5 text-ink">{detailProposal?.title}</p>
          <div className="mt-3 divide-y divide-line">
            <DetailRow label="Người đề nghị" value={detailProposal?.requester} />
            <DetailRow label="Ngày" value={detailProposal ? formatDate(detailProposal.date) : ""} />
            <DetailRow label="Đơn vị" value={detailProposal?.dept} />
            <DetailRow label="Nội dung" value={detailProposal?.detail} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Lightbox ảnh toàn màn hình — nền trắng (đồng bộ GĐ 65) */}
      {lightbox ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-white/95 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-black/10 text-ink hover:bg-black/20"
          >
            <X className="size-5" />
          </button>
          <img
            src={lightbox}
            alt="Ảnh phóng to"
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ) : null}
    </div>
  );
}
