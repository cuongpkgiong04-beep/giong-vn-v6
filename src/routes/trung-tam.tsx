import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { seedInventory } from "@/data";
import { CENTERS, STAFF_BY_CENTER, getCenterByCode } from "@/lib/catalog";
import { formatNum, formatVndCompact } from "@/lib/format";

export const Route = createFileRoute("/trung-tam")({ component: TrungTamPage });

function TrungTamPage() {
  const inv = Object.fromEntries(seedInventory.centers.map((c) => [c.code, c]));

  return (
    <div>
      <PageHeader
        eyebrow="Danh mục"
        title="Trung tâm tiêm chủng"
        desc="Chuỗi Gióng phủ Hà Nội, Bắc Ninh và Vĩnh Phúc — kho lạnh và thu ngân tại từng điểm."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {CENTERS.map((c) => {
          const i = inv[c.code];
          const centerMeta = getCenterByCode(c.code);
          return (
            <Card key={c.code} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">{c.code}</p>
                  <h2 className="mt-1 font-semibold text-ink">{centerMeta?.short ?? c.short}</h2>
                  <p className="text-sm text-muted">{centerMeta?.city ?? c.city}</p>
                </div>
                <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-muted">{c.kind}</span>
              </div>
              <p className="mt-3 text-sm text-faint">{c.name}</p>
              <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-md bg-surface-2/80 py-2">
                  <dt className="text-[10px] tracking-wide text-muted uppercase">Tồn</dt>
                  <dd className="text-sm font-semibold tabular">{i ? formatVndCompact(i.value) : "—"}</dd>
                </div>
                <div className="rounded-md bg-surface-2/80 py-2">
                  <dt className="text-[10px] tracking-wide text-muted uppercase">Liều</dt>
                  <dd className="text-sm font-semibold tabular">{i ? formatNum(i.qty) : "—"}</dd>
                </div>
                <div className="rounded-md bg-surface-2/80 py-2">
                  <dt className="text-[10px] tracking-wide text-muted uppercase">NS</dt>
                  <dd className="text-sm font-semibold tabular">{STAFF_BY_CENTER[c.code] ?? 0}</dd>
                </div>
              </dl>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
