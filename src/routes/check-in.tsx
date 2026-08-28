import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { findEmployeeByLooseText, getEmployeeById, isAdminRole } from "@/lib/catalog";
import { formatDate } from "@/lib/format";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/check-in")({ component: CheckInPage });

function CheckInPage() {
  const checkins = useAppStore((s) => s.checkins);
  const currentUserId = useAppStore((s) => s.currentUserId);
  const addCheckin = useAppStore((s) => s.addCheckin);
  const currentEmployee = getEmployeeById(currentUserId) ?? null;
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const visibleCheckins = useMemo(() => {
    return checkins.filter((entry) => {
      if (isAdminRole(currentEmployee?.role)) return true;
      if (!currentEmployee) return false;
      const matchingEmployee = findEmployeeByLooseText(entry.name) ?? null;
      return (
        matchingEmployee?.id === currentEmployee.id ||
        matchingEmployee?.center === currentEmployee.center ||
        entry.name === currentEmployee.name ||
        (entry.address ?? "").includes(currentEmployee.center)
      );
    });
  }, [checkins, currentEmployee]);

  async function locate() {
    setBusy(true);
    let gps = "";
    let address = "";
    try {
      if (navigator.geolocation) {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 4000 }),
        );
        gps = `${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`;
        address = "Tọa độ thiết bị hiện tại";
      }
    } catch {
      gps = "21.047200, 105.878140";
      address = "Văn phòng Gióng — 8/61 Nguyễn Sơn, Bồ Đề (mô phỏng)";
    }
    const rec = addCheckin(gps, address, note.trim());
    setNote("");
    setBusy(false);
    toast.success(`Check-in ${rec.time}`, { description: rec.address || rec.gps });
  }

  return (
    <div>
      <PageHeader
        eyebrow="Vận hành"
        title="Check-in địa điểm"
        desc="Ghi nhận vị trí khi đi công tác, giám sát điểm tiêm hoặc điều phối giữa các trung tâm."
      />

      <Card className="mb-5 max-w-xl">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-ink">Lượt check-in mới</p>
          {currentEmployee ? (
            <span className="rounded-full bg-accent-soft px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
              {currentEmployee.name} · {currentEmployee.center}
            </span>
          ) : null}
        </div>
        <p className="mt-1 mb-3 text-sm text-muted">Trình duyệt sẽ hỏi quyền vị trí. Nếu từ chối, hệ thống ghi tọa độ văn phòng.</p>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Ghi chú (ví dụ: giám sát trung tâm Long Biên)"
          className="mb-3"
        />
        <Button onClick={locate} disabled={busy}>
          <MapPin />
          {busy ? "Đang lấy vị trí…" : "Check-in ngay"}
        </Button>
      </Card>

      {visibleCheckins.length === 0 ? (
        <EmptyState title="Chưa có lượt check-in" desc="Bấm Check-in ngay để ghi vị trí đầu tiên trong phiên này." />
      ) : (
        <ul className="space-y-2">
          {visibleCheckins.map((c) => (
            <li key={c.id}>
              <Card className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-ink">{c.name}</p>
                    <p className="text-sm text-muted">
                      {formatDate(c.date)} · {c.time} · {c.weekday}
                    </p>
                    <p className="mt-1 text-sm text-ink">{c.address || "—"}</p>
                    {c.gps ? <p className="font-mono text-xs text-faint">{c.gps}</p> : null}
                    {c.note ? <p className="mt-2 text-sm text-muted">{c.note}</p> : null}
                  </div>
                  <MapPin className="size-4 text-accent" />
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
