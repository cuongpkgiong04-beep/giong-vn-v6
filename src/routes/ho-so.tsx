import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { DOCS } from "@/lib/catalog";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/ho-so")({ component: HoSoPage });

function HoSoPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Danh mục"
        title="Hồ sơ tài liệu"
        desc="Thêm mới và tra cứu. Không sửa, không xóa — đúng quy chế lưu trữ của công ty."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {DOCS.map((d) => (
          <Card key={d.id} className="flex items-start gap-3 p-4">
            <span className="flex size-11 items-center justify-center rounded-md bg-accent-soft text-accent">
              <FileText className="size-4" />
            </span>
            <div>
              <h2 className="font-semibold text-ink">{d.name}</h2>
              <p className="text-sm text-muted">
                {d.dept} · cập nhật {formatDate(d.updated)}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
