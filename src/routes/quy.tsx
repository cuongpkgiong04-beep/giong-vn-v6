import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDesc, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CENTERS, centerName, getEmployeeById } from "@/lib/catalog";
import { formatDate, formatVnd, formatVndCompact, todayIso } from "@/lib/format";
import { canApproveCash, hasPermission } from "@/lib/permissions";
import { useAppStore } from "@/lib/store";
import type { CashVoucher } from "@/lib/types";

export const Route = createFileRoute("/quy")({ component: QuyPage });

function QuyPage() {
  const cash = useAppStore((s) => s.cash);
  const addCash = useAppStore((s) => s.addCash);
  const setCashStatus = useAppStore((s) => s.setCashStatus);
  const me = useAppStore((s) => s.currentName());
  const currentUserId = useAppStore((s) => s.currentUserId);
  const currentEmployee = getEmployeeById(currentUserId);
  const canApprove = canApproveCash(currentEmployee);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<CashVoucher["type"]>("Thu");
  const [amount, setAmount] = useState("");
  const [content, setContent] = useState("");
  const [center, setCenter] = useState("VP");

  const thu = cash.filter((c) => c.type === "Thu" && c.status === "Đã duyệt").reduce((s, c) => s + c.amount, 0);
  const chi = cash.filter((c) => c.type === "Chi" && c.status === "Đã duyệt").reduce((s, c) => s + c.amount, 0);

  const rows = useMemo(() => cash, [cash]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const n = Number(amount.replace(/\D/g, ""));
    if (!n || !content.trim()) return;
    addCash({
      type,
      date: todayIso(),
      amount: n,
      content: content.trim(),
      center,
      person: me,
      method: "Chuyển khoản",
      status: "Nháp",
    });
    setAmount("");
    setContent("");
    setOpen(false);
    toast.success("Đã lập phiếu");
  }

  return (
    <div>
      <PageHeader
        eyebrow="Nghiệp vụ"
        title="Quỹ tiền"
        desc="Phiếu thu — phiếu chi. Quản lý duyệt mới vào số dư."
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus />
            Lập phiếu
          </Button>
        }
      />

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card className="p-4">
          <p className="text-xs font-medium text-muted uppercase">Thu đã duyệt</p>
          <p className="mt-1 text-xl font-semibold tabular text-ok">{formatVndCompact(thu)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium text-muted uppercase">Chi đã duyệt</p>
          <p className="mt-1 text-xl font-semibold tabular text-danger">{formatVndCompact(chi)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium text-muted uppercase">Số dư thuần</p>
          <p className="mt-1 text-xl font-semibold tabular">{formatVndCompact(thu - chi)}</p>
        </Card>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-surface-2 text-xs font-medium text-muted uppercase">
              <tr>
                <th className="px-4 py-3">Ngày</th>
                <th className="px-4 py-3">Loại</th>
                <th className="px-4 py-3">Nội dung</th>
                <th className="px-4 py-3">Điểm</th>
                <th className="px-4 py-3">Số tiền</th>
                <th className="px-4 py-3">TT</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((c) => (
                <tr key={c.id}>
                  <td className="px-4 py-3 tabular text-muted">{formatDate(c.date)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge value={c.type} />
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink">{c.content}</p>
                    <p className="text-xs text-faint">{c.person} · {c.method}</p>
                  </td>
                  <td className="px-4 py-3">{centerName(c.center)}</td>
                  <td className={`px-4 py-3 font-medium tabular ${c.type === "Thu" ? "text-ok" : "text-danger"}`}>
                    {c.type === "Thu" ? "+" : "−"} {formatVnd(c.amount)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge value={c.status} />
                  </td>
                  <td className="px-4 py-3">
                    {c.status !== "Đã duyệt" && canApprove ? (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="text-xs font-medium text-danger hover:underline"
                          onClick={() => {
                            setCashStatus(c.id, "Từ chối");
                            toast.message("Đã từ chối phiếu");
                          }}
                        >
                          Từ chối
                        </button>
                        <button
                          type="button"
                          className="text-xs font-medium text-accent hover:underline"
                          onClick={() => {
                            setCashStatus(c.id, "Đã duyệt");
                            toast.success("Đã duyệt phiếu");
                          }}
                        >
                          Duyệt
                        </button>
                      </div>
                    ) : c.status !== "Đã duyệt" ? (
                      <span className="text-xs text-faint">Chờ duyệt</span>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Lập phiếu quỹ</DialogTitle>
          <DialogDesc>Phiếu ở trạng thái nháp cho đến khi quản lý duyệt.</DialogDesc>
          <form onSubmit={submit} className="mt-4 flex flex-col gap-3">
            <div className="flex gap-2">
              {(["Thu", "Chi"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`h-11 flex-1 rounded-md text-sm font-medium ${type === t ? "bg-forest text-forest-fg" : "bg-surface-2 text-muted"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div>
              <Label htmlFor="amt">Số tiền (VND)</Label>
              <Input id="amt" inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1" required />
            </div>
            <div>
              <Label htmlFor="ct">Nội dung</Label>
              <Input id="ct" value={content} onChange={(e) => setContent(e.target.value)} className="mt-1" required />
            </div>
            <div>
              <Label htmlFor="c">Trung tâm</Label>
              <select id="c" value={center} onChange={(e) => setCenter(e.target.value)} className="mt-1 h-11 w-full rounded-md bg-surface px-3 text-sm shadow-[var(--shadow-card)]">
                {CENTERS.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.short}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit">Lưu phiếu</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
