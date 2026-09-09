import { createFileRoute } from "@tanstack/react-router";
import {
  AlarmClock,
  AlertTriangle,
  Calendar,
  FileText,
  Plus,
  Search,
  User,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDesc, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatDate, todayIso } from "@/lib/format";
import { useAppStore } from "@/lib/store";
import type { Note } from "@/lib/types";

export const Route = createFileRoute("/ghi-chu")({ component: GhiChuPage });

function GhiChuPage() {
  const notes = useAppStore((s) => s.notes);
  const addNote = useAppStore((s) => s.addNote);
  const employees = useAppStore((s) => s.employees);

  // Reactive current user — pattern GĐ 16 (non-reactive getEmployeeById bug)
  const currentEmployee = useAppStore(
    (s) => s.employees.find((e) => e.id === s.currentUserId) ?? null,
  );
  const meName = currentEmployee?.name ?? useAppStore.getState().currentName();
  const meId = currentEmployee?.id ?? "";

  // ===== Dialog states =====
  const [open, setOpen] = useState(false);
  const [detailRow, setDetailRow] = useState<Note | null>(null);

  // ===== Form states =====
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");
  const [support, setSupport] = useState("");
  const [dept, setDept] = useState("");

  // ===== Filter states =====
  const [q, setQ] = useState("");
  const [fAuthor, setFAuthor] = useState("all");
  const [fDept, setFDept] = useState("all");
  const [fFrom, setFFrom] = useState("");
  const [fTo, setFTo] = useState("");
  const [mine, setMine] = useState(false);
  const [statCard, setStatCard] = useState<"all" | "mine" | "deadline" | "overdue">("all");

  // ===== Sticky header ref — đo chiều cao khối lọc (pattern GĐ 58/63: callback ref + ResizeObserver) =====
  const stickyFiltersRef = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    const set = () => {
      const h = `${el.offsetHeight}px`;
      el.style.setProperty("--gc-sticky-h", h);
      el.parentElement?.style.setProperty("--gc-sticky-h", h);
    };
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
  }, []);

  const isMine = useCallback(
    (n: Note) => (n.createdBy ? n.createdBy === meId : n.author === meName),
    [meId, meName],
  );

  const today = todayIso();

  // ===== Danh sách người tạo / phòng ban (từ data thật) =====
  const authors = useMemo(
    () => [...new Set(notes.map((n) => n.author).filter(Boolean))].sort(),
    [notes],
  );
  const deptOptions = useMemo(
    () =>
      [...new Set([...notes.map((n) => n.dept), ...employees.map((e) => e.dept)].filter(Boolean))].sort(),
    [notes, employees],
  );

  // ===== Thống kê (theo toàn bộ notes, không theo filter) =====
  const stats = useMemo(() => {
    const total = notes.length;
    const mineCount = notes.filter(isMine).length;
    const withDeadline = notes.filter((n) => n.deadline && n.deadline >= today).length;
    const overdue = notes.filter((n) => n.deadline && n.deadline < today).length;
    return { total, mineCount, withDeadline, overdue };
  }, [notes, isMine, today]);

  // ===== Rows sau filter — mới nhất lên đầu =====
  const rows = useMemo(() => {
    return notes
      .filter((n) => {
        if (mine && !isMine(n)) return false;
        if (statCard === "mine" && !isMine(n)) return false;
        if (statCard === "deadline" && !(n.deadline && n.deadline >= today)) return false;
        if (statCard === "overdue" && !(n.deadline && n.deadline < today)) return false;
        if (fAuthor !== "all" && n.author !== fAuthor) return false;
        if (fDept !== "all" && n.dept !== fDept) return false;
        if (fFrom && n.date < fFrom) return false;
        if (fTo && n.date > fTo) return false;
        if (q.trim()) {
          const hay = `${n.content} ${n.author} ${n.support} ${n.dept}`.toLowerCase();
          if (!hay.includes(q.trim().toLowerCase())) return false;
        }
        return true;
      })
      .sort((a, b) =>
        b.date > a.date ? 1 : b.date < a.date ? -1 : String(b.updatedAt ?? "").localeCompare(String(a.updatedAt ?? "")),
      );
  }, [notes, mine, statCard, fAuthor, fDept, fFrom, fTo, q, isMine, today]);

  function openCreate() {
    setContent("");
    setDeadline("");
    setSupport("");
    setDept(currentEmployee?.dept ?? "");
    setOpen(true);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    addNote({
      date: todayIso(),
      content: content.trim(),
      author: meName,
      deploy: "",
      deadline,
      support: support.trim(),
      dept: dept || currentEmployee?.dept || "Hệ thống",
      status: "Mới",
      createdBy: meId || undefined,
    });
    setContent("");
    setDeadline("");
    setSupport("");
    setOpen(false);
    toast.success("Đã thêm ghi chú — dữ liệu đã lưu database");
  }

  return (
    <div>
      <PageHeader
        eyebrow="Hệ thống"
        title="Ghi chú"
        desc="Mọi người đăng nhập đều tạo được ghi chú — lưu database, đồng bộ mọi thiết bị. Ghi chú đã gửi không sửa, không xóa."
        actions={
          <Button onClick={openCreate}>
            <Plus />
            Thêm ghi chú
          </Button>
        }
      />

      {/* ===== 4 card tổng quan — bấm để lọc nhanh ===== */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(
          [
            { label: "Tổng ghi chú", value: stats.total, key: "all" as const, color: "text-ink", icon: FileText },
            { label: "Của tôi", value: stats.mineCount, key: "mine" as const, color: "text-accent", icon: User },
            { label: "Còn hạn", value: stats.withDeadline, key: "deadline" as const, color: "text-ok", icon: AlarmClock },
            { label: "Quá hạn", value: stats.overdue, key: "overdue" as const, color: "text-danger", icon: AlertTriangle },
          ]
        ).map((c) => (
          <button
            key={c.label}
            type="button"
            onClick={() => setStatCard(statCard === c.key ? "all" : c.key)}
            className={`text-left ${statCard === c.key ? "ring-2 ring-accent" : ""}`}
          >
            <Card className="px-4 py-3 transition-shadow hover:shadow-[var(--shadow-card-hover)]">
              <p className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted uppercase">
                <c.icon className="size-3.5" /> {c.label}
              </p>
              <p className={`mt-1 text-2xl font-semibold tabular ${c.color}`}>{c.value}</p>
            </Card>
          </button>
        ))}
      </div>

      {/* ===== Khối lọc — GHIM dưới header app khi cuộn (pattern Chấm công GĐ 55) ===== */}
      <div
        ref={stickyFiltersRef}
        className="sticky top-16 z-10 -mx-4 border-b border-line bg-bg px-4 pb-2 sm:-mx-6 sm:px-6"
      >
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[180px] flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-faint" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm nội dung, người tạo, hỗ trợ..."
              className="h-10 pl-10"
            />
          </div>
          <select
            value={fAuthor}
            onChange={(e) => setFAuthor(e.target.value)}
            className="h-10 rounded-md border border-line bg-surface px-2 text-sm"
            title="Lọc người tạo"
          >
            <option value="all">Mọi người tạo</option>
            {authors.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <select
            value={fDept}
            onChange={(e) => setFDept(e.target.value)}
            className="h-10 rounded-md border border-line bg-surface px-2 text-sm"
            title="Lọc phòng ban"
          >
            <option value="all">Mọi phòng ban</option>
            {deptOptions.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {/* Date range — gộp 1 dòng ngang (pattern GĐ 53) */}
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <Calendar className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-faint" />
              <Input
                type="date"
                value={fFrom}
                onChange={(e) => setFFrom(e.target.value)}
                className="h-10 w-[140px] pl-8"
                title="Từ ngày"
              />
            </div>
            <span className="text-xs text-faint">—</span>
            <Input
              type="date"
              value={fTo}
              onChange={(e) => setFTo(e.target.value)}
              className="h-10 w-[140px]"
              title="Đến ngày"
            />
          </div>
          <label className="flex cursor-pointer items-center gap-1.5 text-sm text-muted">
            <input
              type="checkbox"
              checked={mine}
              onChange={(e) => setMine(e.target.checked)}
              className="size-4 accent-[var(--color-accent)]"
            />
            Của tôi
          </label>
        </div>
      </div>

      <p className="mb-3 mt-3 text-sm text-muted">
        Hiển thị <span className="font-medium text-ink">{rows.length}</span> / {notes.length} ghi chú
        {statCard !== "all"
          ? ` · lọc: ${statCard === "mine" ? "Của tôi" : statCard === "deadline" ? "Còn hạn" : "Quá hạn"}`
          : ""}
      </p>

      {/* ===== Bảng ghi chú — thead ghim dưới khối lọc khi cuộn ===== */}
      <Card className="overflow-hidden p-0 lg:overflow-visible">
        <div className="overflow-x-auto lg:overflow-x-visible">
          <table className="w-full text-sm">
            <thead className="sticky top-[calc(4rem+var(--gc-sticky-h,64px))] z-[5]">
              <tr className="border-b border-line bg-surface">
                <th className="px-3 py-3 text-left font-medium whitespace-nowrap text-muted">STT</th>
                <th className="px-3 py-3 text-left font-medium whitespace-nowrap text-muted">Nội dung</th>
                <th className="px-3 py-3 text-left font-medium whitespace-nowrap text-muted">Người tạo</th>
                <th className="px-3 py-3 text-left font-medium whitespace-nowrap text-muted">Phòng ban</th>
                <th className="px-3 py-3 text-left font-medium whitespace-nowrap text-muted">Hạn</th>
                <th className="px-3 py-3 text-left font-medium whitespace-nowrap text-muted">Hỗ trợ</th>
                <th className="px-3 py-3 text-left font-medium whitespace-nowrap text-muted">Ngày tạo</th>
                <th className="px-3 py-3 text-left font-medium whitespace-nowrap text-muted">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-3 py-10 text-center text-muted">
                    Không có ghi chú nào khớp bộ lọc.
                  </td>
                </tr>
              ) : (
                rows.map((n, idx) => {
                  const overdue = !!n.deadline && n.deadline < today;
                  return (
                    <tr
                      key={n.id}
                      onClick={() => setDetailRow(n)}
                      className="cursor-pointer border-b border-line/60 transition-colors last:border-0 hover:bg-surface-2/60"
                    >
                      <td className="px-3 py-3 text-xs text-faint tabular">{idx + 1}</td>
                      <td className="max-w-[360px] px-3 py-3">
                        <p className="line-clamp-2 whitespace-pre-wrap text-ink">{n.content}</p>
                      </td>
                      <td className="px-3 py-3 font-medium whitespace-nowrap text-ink">{n.author || "—"}</td>
                      <td className="px-3 py-3 whitespace-nowrap text-muted">{n.dept || "—"}</td>
                      <td className={`px-3 py-3 whitespace-nowrap tabular ${overdue ? "font-medium text-danger" : "text-muted"}`}>
                        {n.deadline ? formatDate(n.deadline) : "—"}
                      </td>
                      <td className="max-w-[180px] truncate px-3 py-3 text-muted" title={n.support}>
                        {n.support || "—"}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap tabular text-muted">{formatDate(n.date)}</td>
                      <td className="px-3 py-3"><StatusBadge value={n.status} /></td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ===== Dialog tạo ghi chú mới — mọi người đăng nhập đều tạo được ===== */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Ghi chú mới</DialogTitle>
          <DialogDesc>
            Người tạo: <span className="font-medium text-ink">{meName}</span>
            {currentEmployee?.dept ? ` · ${currentEmployee.dept}` : ""} — ghi chú đã gửi không sửa, không xóa.
          </DialogDesc>
          <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
            <div>
              <Label htmlFor="gc-content">Nội dung *</Label>
              <Textarea
                id="gc-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 min-h-32"
                placeholder="Nhập nội dung ghi chú..."
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="gc-deadline">Hạn (không bắt buộc)</Label>
                <Input
                  id="gc-deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="gc-support">Người hỗ trợ (không bắt buộc)</Label>
                <Input
                  id="gc-support"
                  value={support}
                  onChange={(e) => setSupport(e.target.value)}
                  className="mt-1"
                  placeholder="VD: NV_Kế toán, Nguyễn Văn A"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="gc-dept">Phòng ban</Label>
              <select
                id="gc-dept"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                className="mt-1 h-10 w-full rounded-md border border-line bg-surface px-3 text-sm"
              >
                <option value="">— Tự động (phòng ban của tôi) —</option>
                {deptOptions.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <Button type="submit" disabled={!content.trim()}>
              Lưu ghi chú
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* ===== Dialog chi tiết ghi chú ===== */}
      <Dialog open={!!detailRow} onOpenChange={(v) => !v && setDetailRow(null)}>
        <DialogContent>
          <DialogTitle>Chi tiết ghi chú</DialogTitle>
          <DialogDesc>
            {detailRow && (
              <span className="flex flex-wrap items-center gap-2">
                <StatusBadge value={detailRow.status} />
                <span className="text-xs text-faint">{detailRow.dept || "—"}</span>
              </span>
            )}
          </DialogDesc>
          {detailRow && (
            <div className="mt-3 flex flex-col gap-3">
              <p className="rounded-lg border border-line bg-surface-2/50 p-3 whitespace-pre-wrap text-sm text-ink">
                {detailRow.content}
              </p>
              <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                <p><span className="text-muted">Người tạo:</span> <span className="font-medium text-ink">{detailRow.author || "—"}</span></p>
                <p><span className="text-muted">Phòng ban:</span> <span className="text-ink">{detailRow.dept || "—"}</span></p>
                <p><span className="text-muted">Ngày tạo:</span> <span className="tabular text-ink">{formatDate(detailRow.date)}</span></p>
                <p>
                  <span className="text-muted">Hạn:</span>{" "}
                  <span className={`tabular ${detailRow.deadline && detailRow.deadline < today ? "font-medium text-danger" : "text-ink"}`}>
                    {detailRow.deadline ? formatDate(detailRow.deadline) : "—"}
                    {detailRow.deadline && detailRow.deadline < today ? " (quá hạn)" : ""}
                  </span>
                </p>
                <p className="sm:col-span-2"><span className="text-muted">Người hỗ trợ:</span> <span className="text-ink">{detailRow.support || "—"}</span></p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
