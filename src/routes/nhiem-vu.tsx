import { createFileRoute } from "@tanstack/react-router";
import { Camera, MapPin, Plus } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDesc, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EMPLOYEES, isAdminRole } from "@/lib/catalog";
import { canCreateTaskForOthers, canEditTask } from "@/lib/permissions";
import { formatDate } from "@/lib/format";
import { useAppStore } from "@/lib/store";
import type { Task } from "@/lib/types";

export const Route = createFileRoute("/nhiem-vu")({ component: TasksPage });

const COLS = ["Việc cần làm", "Đang làm", "Đã xong"] as const;

function TasksPage() {
  const tasks = useAppStore((s) => s.tasks);
  const addTask = useAppStore((s) => s.addTask);
  const setTaskStatus = useAppStore((s) => s.setTaskStatus);
  const me = useAppStore((s) => s.currentName());
  // Reactive: subscribe to employees so this re-renders when DB data loads
  const currentEmployee = useAppStore((s) => s.employees.find((e) => e.id === s.currentUserId) ?? null);
  const currentUser = currentEmployee ?? EMPLOYEES[0];
  const canCreateForOthers = canCreateTaskForOthers(currentEmployee);
  const [q, setQ] = useState("");
  const [mine, setMine] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState(currentUser.username);
  const [due, setDue] = useState("");
  const [support, setSupport] = useState("");
  const [blocker, setBlocker] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [view, setView] = useState<"board" | "list">("board");
  const photoRef = useRef<HTMLInputElement>(null);

  const isAdmin = isAdminRole(currentEmployee?.role);

  const filtered = useMemo(() => {
    const currentUserName = currentUser.username.toLowerCase();
    return tasks.filter((t) => {
      // Non-admin users can only see their own tasks
      if (!isAdmin) {
        const assigneeMatches = t.assignee.toLowerCase() === currentUserName;
        const createdByMatches = t.createdBy.toLowerCase() === me.toLowerCase();
        if (!assigneeMatches && !createdByMatches) return false;
      } else if (mine) {
        // Admin can toggle "mine" filter
        const assigneeMatches = t.assignee.toLowerCase() === currentUserName;
        const createdByMatches = t.createdBy.toLowerCase() === me.toLowerCase();
        if (!assigneeMatches && !createdByMatches) return false;
      }
      if (q.trim()) {
        const s = q.toLowerCase();
        return t.title.toLowerCase().includes(s) || t.assignee.toLowerCase().includes(s);
      }
      return true;
    });
  }, [tasks, q, mine, currentUser.username, me, isAdmin]);

  function colOf(t: Task) {
    if (t.status === "Đã xong") return "Đã xong";
    if (t.status === "Đang làm") return "Đang làm";
    return "Việc cần làm";
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({
      assignee,
      title: title.trim(),
      due: due ? `${due} 18:00` : "",
      status: "Việc cần làm",
      support,
      blocker,
      createdBy: me,
      photo: photo ?? undefined,
      location,
    });
    setTitle("");
    setDue("");
    setSupport("");
    setBlocker("");
    setPhoto(null);
    setLocation("");
    setOpen(false);
    toast.success("Đã tạo nhiệm vụ");
  }

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(typeof reader.result === "string" ? reader.result : null);
    reader.readAsDataURL(file);
  }

  function requestLocation() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        setLocation(`${lat}, ${lng}`);
      },
      () => setLocation(""),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Vận hành"
        title="Nhiệm vụ"
        desc="Kế hoạch tuần — tháng. Nhân viên lập, quản lý theo dõi tiến độ."
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus />
            Nhiệm vụ mới
          </Button>
        }
      />

      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm việc, người phụ trách…" className="sm:max-w-sm" />
        <label className="flex h-11 items-center gap-2 text-sm text-ink">
          <input type="checkbox" checked={isAdmin ? mine : true} onChange={(e) => isAdmin && setMine(e.target.checked)} disabled={!isAdmin} className="size-4 accent-accent" />
          {currentUser.name} {!isAdmin && "(chỉ của bạn)"}
        </label>
        <div className="ml-auto flex rounded-md bg-surface p-1 shadow-[var(--shadow-card)]">
          <button type="button" onClick={() => setView("board")} className={`h-9 rounded-sm px-3 text-sm ${view === "board" ? "bg-forest text-forest-fg" : "text-muted"}`}>
            Kanban
          </button>
          <button type="button" onClick={() => setView("list")} className={`h-9 rounded-sm px-3 text-sm ${view === "list" ? "bg-forest text-forest-fg" : "text-muted"}`}>
            Danh sách
          </button>
        </div>
      </div>

      {view === "board" ? (
        <div className="grid gap-3 lg:grid-cols-3">
          {COLS.map((col) => {
            const items = filtered.filter((t) => colOf(t) === col);
            return (
              <section key={col} className="rounded-xl bg-surface-2/70 p-3">
                <div className="mb-2 flex items-center justify-between px-1">
                  <h2 className="text-sm font-semibold text-ink">{col}</h2>
                  <span className="text-xs tabular text-muted">{items.length}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {items.slice(0, 24).map((t) => (
                    <article key={t.id} className="rounded-lg bg-surface p-3 shadow-[var(--shadow-card)]">
                      <p className="text-sm font-medium text-ink">{t.title}</p>
                      <p className="mt-2 text-xs text-muted">
                        {t.assignee || "Chưa gán"} · đến hạn {formatDate(t.due)}
                      </p>
                      {t.support ? <p className="mt-1 text-xs text-muted">Hỗ trợ: {t.support}</p> : null}
                      {t.blocker ? <p className="mt-2 line-clamp-2 text-xs text-warn">⚠ {t.blocker}</p> : null}
                      {t.photo ? <img src={t.photo} alt="Ảnh" className="mt-2 h-12 w-12 rounded object-cover" /> : null}
                      {t.location ? <p className="mt-1 text-[10px] text-faint">📍 {t.location}</p> : null}
                      {canEditTask(currentEmployee, t.createdBy) ? (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {COLS.filter((c) => c !== col).map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => setTaskStatus(t.id, c)}
                              className="h-8 rounded-sm bg-surface-2 px-2 text-[11px] font-medium text-muted hover:text-ink"
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </article>
                  ))}
                  {items.length === 0 ? <p className="px-1 py-6 text-center text-sm text-faint">Trống</p> : null}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <Card className="overflow-hidden p-0">
          {filtered.length === 0 ? (
            <div className="p-4">
              <EmptyState title="Không có nhiệm vụ" />
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {filtered.slice(0, 60).map((t) => (
                <li key={t.id} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-medium text-ink">{t.title}</p>
                    <p className="text-sm text-muted">
                      {t.assignee} · tạo {formatDate(t.created)} · đến hạn {formatDate(t.due)}
                    </p>
                    {t.support ? <p className="text-xs text-muted">Hỗ trợ: {t.support}</p> : null}
                    {t.blocker ? <p className="text-xs text-warn">⚠ {t.blocker}</p> : null}
                  </div>
                  <div className="flex items-center gap-2">
                    {t.photo ? <img src={t.photo} alt="Ảnh" className="h-10 w-10 rounded object-cover" /> : null}
                    <StatusBadge value={t.status} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogTitle>Nhiệm vụ mới</DialogTitle>
          <DialogDesc>Ghi việc cần làm trong tuần hoặc tháng.</DialogDesc>
          <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
            <div>
              <Label htmlFor="t">Nội dung</Label>
              <Textarea id="t" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1" required />
            </div>
            <div>
              <Label htmlFor="a">Phụ trách</Label>
              <select
                id="a"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="mt-1 h-11 w-full rounded-md bg-surface px-3 text-sm shadow-[var(--shadow-card)]"
                disabled={!canCreateForOthers}
              >
                {canCreateForOthers ? (
                  EMPLOYEES.map((e) => (
                    <option key={e.id} value={e.username}>
                      {e.name} ({e.username})
                    </option>
                  ))
                ) : (
                  <option value={currentUser.username}>
                    {currentUser.name} (chỉ tạo cho bản thân)
                  </option>
                )}
              </select>
            </div>
            <div>
              <Label htmlFor="s">Người hỗ trợ</Label>
              <Input id="s" value={support} onChange={(e) => setSupport(e.target.value)} placeholder="Tên người hỗ trợ (nếu có)" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="d">Ngày đến hạn</Label>
              <Input id="d" type="date" value={due} onChange={(e) => setDue(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="b">Khó khăn khi triển khai</Label>
              <Textarea id="b" value={blocker} onChange={(e) => setBlocker(e.target.value)} placeholder="Cản trở, khó khăn (nếu có)" className="mt-1" rows={2} />
            </div>
            <div>
              <Label>Ảnh xác nhận</Label>
              <div className="mt-1 flex items-center gap-2">
                <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                <Button type="button" variant="outline" size="sm" onClick={() => photoRef.current?.click()}>
                  <Camera className="size-4 mr-1" />
                  Chọn ảnh
                </Button>
                {photo && (
                  <div className="relative">
                    <img src={photo} alt="Preview" className="h-16 w-16 rounded-lg object-cover" />
                    <button type="button" onClick={() => setPhoto(null)} className="absolute -top-1 -right-1 size-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">×</button>
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label>Vị trí khởi tạo</Label>
              <div className="mt-1 flex items-center gap-2">
                <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Tọa độ GPS hoặc địa chỉ" className="flex-1" />
                <Button type="button" variant="outline" size="sm" onClick={requestLocation} title="Lấy vị trí hiện tại">
                  <MapPin className="size-4" />
                </Button>
              </div>
            </div>
            <Button type="submit">Lưu nhiệm vụ</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
