import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";
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
import { getEmployeeById } from "@/lib/catalog";
import { canApproveProposals } from "@/lib/permissions";
import { useAppStore } from "@/lib/store";
import type { Proposal } from "@/lib/types";

export const Route = createFileRoute("/de-nghi")({ component: DeNghiPage });

const KINDS: Proposal["kind"][] = ["Nhân sự", "Thu chi", "Nhập xuất", "Góp ý"];

function DeNghiPage() {
  const proposals = useAppStore((s) => s.proposals);
  const addProposal = useAppStore((s) => s.addProposal);
  const setProposalStatus = useAppStore((s) => s.setProposalStatus);
  const me = useAppStore((s) => s.currentName());
  const currentUserId = useAppStore((s) => s.currentUserId);
  const currentEmployee = getEmployeeById(currentUserId);
  const canApprove = canApproveProposals(currentEmployee);
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<Proposal["kind"]>("Nhân sự");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [filter, setFilter] = useState<"all" | Proposal["kind"]>("all");

  const rows = filter === "all" ? proposals : proposals.filter((p) => p.kind === filter);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    addProposal({
      kind,
      title: title.trim(),
      requester: me,
      date: todayIso(),
      detail: detail.trim(),
      status: "Chờ duyệt",
      dept: "Hệ thống",
    });
    setTitle("");
    setDetail("");
    setOpen(false);
    toast.success("Đã gửi đề nghị");
  }

  return (
    <div>
      <PageHeader
        eyebrow="Nghiệp vụ"
        title="Đề nghị — Đề xuất"
        desc="Nhân sự, thu chi, nhập xuất, góp ý. Quản lý phê duyệt, từ chối hoặc hủy."
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus />
            Tạo đề nghị
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap gap-1 rounded-md bg-surface p-1 shadow-[var(--shadow-card)] w-fit">
        {(["all", ...KINDS] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setFilter(k)}
            className={`h-9 rounded-sm px-3 text-sm ${filter === k ? "bg-forest text-forest-fg" : "text-muted"}`}
          >
            {k === "all" ? "Tất cả" : k}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        {rows.map((p) => (
          <Card key={p.id} className="p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <StatusBadge value={p.kind} />
                  <StatusBadge value={p.status} />
                </div>
                <h2 className="font-semibold text-ink">{p.title}</h2>
                <p className="mt-1 text-sm text-muted">{p.detail}</p>
                <p className="mt-2 text-xs text-faint">
                  {p.requester} · {p.dept} · {formatDate(p.date)}
                </p>
              </div>
              {p.status === "Chờ duyệt" && canApprove ? (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setProposalStatus(p.id, "Từ chối");
                      toast.message("Đã từ chối");
                    }}
                  >
                    Từ chối
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setProposalStatus(p.id, "Đã duyệt");
                      toast.success("Đã phê duyệt");
                    }}
                  >
                    Phê duyệt
                  </Button>
                </div>
              ) : p.status === "Chờ duyệt" ? (
                <span className="text-xs text-faint">Chờ quản lý duyệt</span>
              ) : null}
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Đề nghị mới</DialogTitle>
          <DialogDesc>Gửi tới quản lý để phê duyệt.</DialogDesc>
          <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
            <div>
              <Label>Loại</Label>
              <select
                value={kind}
                onChange={(e) => setKind(e.target.value as Proposal["kind"])}
                className="mt-1 h-11 w-full rounded-md bg-surface px-3 text-sm shadow-[var(--shadow-card)]"
              >
                {KINDS.map((k) => (
                  <option key={k}>{k}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="tt">Tiêu đề</Label>
              <Input id="tt" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1" required />
            </div>
            <div>
              <Label htmlFor="dd">Chi tiết</Label>
              <Textarea id="dd" value={detail} onChange={(e) => setDetail(e.target.value)} className="mt-1" />
            </div>
            <Button type="submit">Gửi</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
