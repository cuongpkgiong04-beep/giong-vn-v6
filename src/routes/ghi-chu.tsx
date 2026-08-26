import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDesc, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatDate, todayIso } from "@/lib/format";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/ghi-chu")({ component: GhiChuPage });

function GhiChuPage() {
  const notes = useAppStore((s) => s.notes);
  const addNote = useAppStore((s) => s.addNote);
  const me = useAppStore((s) => s.currentName());
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    addNote({
      date: todayIso(),
      content: content.trim(),
      author: me,
      deploy: me,
      deadline: "",
      support: "",
      dept: "Hệ thống",
      status: "Mới",
    });
    setContent("");
    setOpen(false);
    toast.success("Đã thêm ghi chú");
  }

  return (
    <div>
      <PageHeader
        eyebrow="Hệ thống"
        title="Ghi chú"
        desc="Mọi nhân sự được thêm mới. Không sửa, không xóa — đúng quy chế AppSheet gốc."
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus />
            Thêm ghi chú
          </Button>
        }
      />

      <div className="grid gap-3">
        {notes.map((n) => (
          <Card key={n.id} className="p-4">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <StatusBadge value={n.status} />
              <span className="text-xs text-faint">{n.dept}</span>
            </div>
            <p className="whitespace-pre-wrap text-sm text-ink">{n.content}</p>
            <p className="mt-3 text-xs text-muted">
              {n.author} · {formatDate(n.date)}
              {n.deadline ? ` · hạn ${formatDate(n.deadline)}` : ""}
              {n.support ? ` · hỗ trợ ${n.support}` : ""}
            </p>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Ghi chú mới</DialogTitle>
          <DialogDesc>Nội dung sẽ được lưu, không chỉnh sửa sau khi gửi.</DialogDesc>
          <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
            <div>
              <Label htmlFor="gc">Nội dung</Label>
              <Textarea id="gc" value={content} onChange={(e) => setContent(e.target.value)} className="mt-1 min-h-32" required />
            </div>
            <Button type="submit">Lưu</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
