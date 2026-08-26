import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Card } from "@/components/ui/card";
import { COLLATERAL_SEED, CREDIT_SEED } from "@/lib/catalog";
import { formatDate, formatVnd, formatVndCompact } from "@/lib/format";

export const Route = createFileRoute("/tin-dung")({ component: TinDungPage });

function TinDungPage() {
  const limit = CREDIT_SEED.reduce((s, c) => s + c.limit, 0);
  const out = CREDIT_SEED.reduce((s, c) => s + c.outstanding, 0);
  const col = COLLATERAL_SEED.reduce((s, c) => s + c.value, 0);

  return (
    <div>
      <PageHeader
        eyebrow="Nghiệp vụ"
        title="Tín dụng — Tài chính"
        desc="Hạn mức ngân hàng, dư nợ và tài sản đảm bảo của Gióng Việt Nam."
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <Card className="p-4">
          <p className="text-xs font-medium text-muted uppercase">Tổng hạn mức</p>
          <p className="mt-1 text-xl font-semibold tabular">{formatVndCompact(limit)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium text-muted uppercase">Dư nợ</p>
          <p className="mt-1 text-xl font-semibold tabular">{formatVndCompact(out)}</p>
          <p className="text-xs text-muted">{Math.round((out / limit) * 100)}% hạn mức</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium text-muted uppercase">Tài sản đảm bảo</p>
          <p className="mt-1 text-xl font-semibold tabular">{formatVndCompact(col)}</p>
        </Card>
      </div>

      <h2 className="mb-3 text-base font-semibold">Tổ chức tín dụng</h2>
      <div className="mb-8 grid gap-3">
        {CREDIT_SEED.map((c) => {
          const pct = Math.round((c.outstanding / c.limit) * 100);
          return (
            <Card key={c.id} className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-ink">{c.bank}</p>
                  <p className="text-sm text-muted">{c.type}</p>
                </div>
                <StatusBadge value={c.status} />
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-2">
                <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                <span>
                  Hạn mức <strong className="tabular">{formatVnd(c.limit)}</strong>
                </span>
                <span>
                  Dư nợ <strong className="tabular">{formatVnd(c.outstanding)}</strong>
                </span>
                <span className="text-muted">Đáo hạn {formatDate(c.due)}</span>
              </div>
            </Card>
          );
        })}
      </div>

      <h2 className="mb-3 text-base font-semibold">Tài sản đảm bảo</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {COLLATERAL_SEED.map((c) => (
          <Card key={c.id} className="p-4">
            <p className="font-semibold text-ink">{c.name}</p>
            <p className="mt-1 text-sm text-muted">
              {c.type} · {c.location}
            </p>
            <p className="mt-3 text-lg font-semibold tabular">{formatVndCompact(c.value)}</p>
            <p className="mt-1 text-xs text-faint">{c.status}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
