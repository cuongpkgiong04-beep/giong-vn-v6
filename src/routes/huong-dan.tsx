import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { GUIDES, SUPPORT_ALT, SUPPORT_PHONE } from "@/lib/catalog";

export const Route = createFileRoute("/huong-dan")({ component: HuongDanPage });

function HuongDanPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Hệ thống"
        title="Giới thiệu & hướng dẫn"
        desc="GIONG VN thay bộ AppSheet rời bằng một ứng dụng dùng được trên máy tính, web, iOS và Android."
      />

      <Card className="mb-5 p-5">
        <p className="text-sm leading-relaxed text-ink">
          Khi vào ứng dụng, dashboard cho biết nhân sự, chấm công, nhiệm vụ mở và đề nghị chờ duyệt. Việc hàng ngày:
          chấm công, kiểm tra kế hoạch, vào module nghiệp vụ, ghi chú và góp ý.
        </p>
        <p className="mt-3 text-sm text-muted">
          Hỗ trợ: {SUPPORT_PHONE} hoặc {SUPPORT_ALT} (Zalo / điện thoại).
        </p>
      </Card>

      <ol className="grid gap-3">
        {GUIDES.map((g, i) => (
          <li key={g.id}>
            <Card className="p-4">
              <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-1 font-semibold text-ink">{g.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{g.body}</p>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  );
}
