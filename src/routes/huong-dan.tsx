import { createFileRoute } from "@tanstack/react-router";
import { HardDriveDownload, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { isAdminRole } from "@/lib/catalog";
import { useAppStore } from "@/lib/store";
import { backupToDrive, getBackupConfigStatus } from "@/routes/api/backup-drive";
import { GUIDES, SUPPORT_ALT, SUPPORT_PHONE } from "@/lib/catalog";

export const Route = createFileRoute("/huong-dan")({ component: HuongDanPage });
// GUIDES/SUPPORT dùng ở dưới — BackupDriveCard chỉ isAdmin mới render.

/** GĐ 103: nút backup toàn bộ dữ liệu Neon ra Google Drive — CHỈ Admin. */
function BackupDriveCard() {
  const currentEmployee = useAppStore(
    (s) => s.employees.find((e) => e.id === s.currentUserId) ?? null,
  );
  const isAdmin = isAdminRole(currentEmployee?.role);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [lastResult, setLastResult] = useState<string>("");

  useEffect(() => {
    if (!isAdmin) return;
    getBackupConfigStatus()
      .then((r) => setConfigured(r.configured))
      .catch(() => setConfigured(false));
  }, [isAdmin]);

  if (!isAdmin) return null;

  async function runBackup() {
    setBusy(true);
    setLastResult("");
    try {
      const r = await backupToDrive();
      if (r.ok) {
        const kb = (r.totalBytes / 1024).toFixed(0);
        setLastResult(`✅ ${r.fileName} — ${(r.counts.attendance ?? 0)} chấm công, ${(r.counts.checkins ?? 0)} check-in, ${(r.counts.tasks ?? 0)} nhiệm vụ (${kb} KB)`);
        toast.success("Backup lên Google Drive thành công");
      } else if (r.reason === "not-configured") {
        setLastResult("⚠️ Chưa cấu hình Google Drive (env GOOGLE_REFRESH_TOKEN / GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_DRIVE_FOLDER_ID).");
        toast.warning("Chưa cấu hình Google Drive");
      } else {
        setLastResult(`❌ Lỗi Drive: ${r.message ?? "không xác định"}`);
        toast.error("Backup thất bại");
      }
    } catch (err: any) {
      setLastResult(`❌ Lỗi: ${err?.message || err}`);
      toast.error("Backup thất bại");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card className="mb-5 p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent">
          <HardDriveDownload className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-ink">Sao lưu dữ liệu lên Google Drive</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Gom toàn bộ dữ liệu (chấm công, check-in, nhiệm vụ, đề nghị, ghi chú, chat, nhân sự,
            trung tâm...) thành 1 file JSON và lưu lên Google Drive — bản dự phòng phòng sự cố
            database. File cũ không bị xóa, mỗi lần backup tạo 1 file theo ngày giờ.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button onClick={runBackup} disabled={busy || configured === false}>
              {busy ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Đang backup...
                </>
              ) : (
                "Backup ngay"
              )}
            </Button>
            {configured === false ? (
              <span className="text-xs text-amber-600">
                ⚠️ Chưa cấu hình env Google Drive trên Vercel
              </span>
            ) : null}
          </div>
          {lastResult ? <p className="mt-3 text-xs leading-relaxed text-muted">{lastResult}</p> : null}
        </div>
      </div>
    </Card>
  );
}

function HuongDanPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Hệ thống"
        title="Giới thiệu & hướng dẫn"
        desc="GIONG VN thay bộ AppSheet rời bằng một ứng dụng dùng được trên máy tính, web, iOS và Android."
      />

      <BackupDriveCard />

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
