import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { seedInventory, seedTransfers } from "@/data";
import { CENTERS, centerName } from "@/lib/catalog";
import { formatDate, formatNum, formatVnd, formatVndCompact } from "@/lib/format";

export const Route = createFileRoute("/kho")({ component: KhoPage });

function KhoPage() {
  const [q, setQ] = useState("");
  const [center, setCenter] = useState("all");
  const [tab, setTab] = useState<"ton" | "dc">("ton");

  const items = useMemo(() => {
    return seedInventory.items.filter((i) => {
      if (center !== "all" && i.center !== center) return false;
      if (q.trim()) {
        const s = q.toLowerCase();
        return i.name.toLowerCase().includes(s) || i.lot.toLowerCase().includes(s);
      }
      return true;
    });
  }, [q, center]);

  const totalVal = seedInventory.centers.reduce((s, c) => s + c.value, 0);
  const totalQty = seedInventory.centers.reduce((s, c) => s + c.qty, 0);
  const expiring = seedInventory.centers.reduce((s, c) => s + c.expiring, 0);

  return (
    <div>
      <PageHeader
        eyebrow="Nghiệp vụ"
        title="Kho vắc xin"
        desc={`Tồn kho chốt ${seedInventory.asOf.replace(/-/g, "/")} · ${formatNum(totalQty)} liều trên ${seedInventory.centers.length} điểm.`}
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="p-4">
          <p className="text-xs font-medium text-muted uppercase">Giá trị tồn</p>
          <p className="mt-1 text-xl font-semibold tabular">{formatVndCompact(totalVal)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium text-muted uppercase">Số liều</p>
          <p className="mt-1 text-xl font-semibold tabular">{formatNum(totalQty)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium text-muted uppercase">Lô gần hạn</p>
          <p className="mt-1 text-xl font-semibold tabular text-warn">{expiring}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium text-muted uppercase">Mặt hàng (mẫu)</p>
          <p className="mt-1 text-xl font-semibold tabular">{seedInventory.vaccines.length}</p>
        </Card>
      </div>

      <div className="mb-4 flex rounded-md bg-surface p-1 shadow-[var(--shadow-card)] w-fit">
        <button type="button" onClick={() => setTab("ton")} className={`h-9 rounded-sm px-3 text-sm ${tab === "ton" ? "bg-forest text-forest-fg" : "text-muted"}`}>
          Tồn kho
        </button>
        <button type="button" onClick={() => setTab("dc")} className={`h-9 rounded-sm px-3 text-sm ${tab === "dc" ? "bg-forest text-forest-fg" : "text-muted"}`}>
          Điều chuyển
        </button>
      </div>

      {tab === "ton" ? (
        <>
          <div className="mb-4 flex flex-col gap-2 sm:flex-row">
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm vắc xin, số lô…" className="sm:max-w-sm" />
            <select
              value={center}
              onChange={(e) => setCenter(e.target.value)}
              className="h-11 rounded-md bg-surface px-3 text-sm shadow-[var(--shadow-card)] sm:w-56"
            >
              <option value="all">Mọi trung tâm</option>
              {CENTERS.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.short}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {seedInventory.centers.slice(0, 8).map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => setCenter(c.code)}
                className="rounded-xl bg-surface p-4 text-left shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]"
              >
                <p className="text-sm font-semibold text-ink">{centerName(c.code)}</p>
                <p className="mt-1 text-lg font-semibold tabular">{formatVndCompact(c.value)}</p>
                <p className="text-xs text-muted">
                  {formatNum(c.qty)} liều · {c.skus} SKU
                  {c.expiring ? ` · ${c.expiring} gần hạn` : ""}
                </p>
              </button>
            ))}
          </div>

          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead className="bg-surface-2 text-xs font-medium tracking-wide text-muted uppercase">
                  <tr>
                    <th className="px-4 py-3">Vắc xin</th>
                    <th className="px-4 py-3">Lô</th>
                    <th className="px-4 py-3">Điểm</th>
                    <th className="px-4 py-3">SL</th>
                    <th className="px-4 py-3">Hạn</th>
                    <th className="px-4 py-3">Giá trị</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {items.map((i) => (
                    <tr key={`${i.center}-${i.name}-${i.lot}`}>
                      <td className="px-4 py-3 font-medium text-ink">{i.name}</td>
                      <td className="px-4 py-3 font-mono text-xs text-muted">{i.lot}</td>
                      <td className="px-4 py-3">{centerName(i.center)}</td>
                      <td className="px-4 py-3 tabular">{formatNum(i.qty)}</td>
                      <td className="px-4 py-3">
                        <span className="tabular">{formatDate(i.expiry)}</span>
                        {i.daysLeft != null && i.daysLeft < 90 ? (
                          <Badge tone="warn" className="ml-2">
                            {i.daysLeft} ngày
                          </Badge>
                        ) : null}
                      </td>
                      <td className="px-4 py-3 tabular">{formatVnd(i.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      ) : (
        <Card className="overflow-hidden p-0">
          <CardHeader className="px-4 pt-4">
            <CardTitle>Phiếu điều chuyển gần đây</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-surface-2 text-xs font-medium text-muted uppercase">
                <tr>
                  <th className="px-4 py-3">Ngày</th>
                  <th className="px-4 py-3">Vắc xin</th>
                  <th className="px-4 py-3">Từ</th>
                  <th className="px-4 py-3">Đến</th>
                  <th className="px-4 py-3">SL</th>
                  <th className="px-4 py-3">Người lập</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {seedTransfers.map((t) => (
                  <tr key={t.id}>
                    <td className="px-4 py-3 tabular text-muted">{formatDate(t.date)}</td>
                    <td className="px-4 py-3 font-medium">
                      {t.vaccine}
                      <span className="mt-0.5 block font-mono text-xs text-faint">{t.lot}</span>
                    </td>
                    <td className="px-4 py-3">{centerName(t.fromCenter)}</td>
                    <td className="px-4 py-3">{centerName(t.toCenter)}</td>
                    <td className="px-4 py-3 tabular">{formatNum(t.qty)}</td>
                    <td className="px-4 py-3 text-muted">{t.author}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
