import { createFileRoute } from "@tanstack/react-router";
import { Building2, Camera, Eye, LogIn, LogOut, MapPin, TimerReset } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { EmptyState } from "@/components/empty-state";
import { GpsMap } from "@/components/gps-map";
import { PageHeader } from "@/components/page-header";
import { ClientOnly } from "@/components/client-only";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDesc, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CENTERS, findEmployeeByLooseText, getEmployeeById, getVisibleCenterCodes, isAdminRole } from "@/lib/catalog";
import { hasPermission } from "@/lib/permissions";
import { formatDate } from "@/lib/format";
import { useAppStore } from "@/lib/store";
import { uploadImage } from "@/routes/api/upload";

export const Route = createFileRoute("/cham-cong")({ component: ChamCongPage });

function ChamCongPage() {
  const attendance = useAppStore((s) => s.attendance);
  const currentUserId = useAppStore((s) => s.currentUserId);
  const clock = useAppStore((s) => s.clock);
  const currentEmployee = getEmployeeById(currentUserId) ?? null;
  const currentName = useAppStore((s) => s.currentName());
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<"all" | "in" | "out">("all");
  const [center, setCenter] = useState("all");
  const [selectedCenter, setSelectedCenter] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [punchType, setPunchType] = useState<"Điểm danh vào ca" | "Điểm danh tan ca">("Điểm danh vào ca");
  const [gps, setGps] = useState("Đang lấy vị trí...");
  const [address, setAddress] = useState("Đang xác định vị trí...");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [gpsCoords, setGpsCoords] = useState<[number, number] | null>(null);
  const [locationStatus, setLocationStatus] = useState("Đang xác định vị trí...");
  const [detailRecord, setDetailRecord] = useState<typeof attendance[number] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Compute today's attendance status for current user (use Vietnam timezone like store)
  const todayStr = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const todayRecords = useMemo(() => {
    const empName = currentEmployee?.name ?? currentName;
    return attendance.filter((a) => a.name === empName && a.date === todayStr);
  }, [attendance, currentEmployee, currentName, todayStr]);

  const lastStatus = todayRecords.length > 0 ? todayRecords[todayRecords.length - 1].status : null;
  // Rules: must check in before check out. Can do multiple in/out cycles per day.
  const canPunchIn = lastStatus !== "Điểm danh vào ca"; // last was out or no records
  const canPunchOut = lastStatus === "Điểm danh vào ca"; // last was in

  const allowedCenters = useMemo(
    () => (currentEmployee ? getVisibleCenterCodes(currentEmployee) : ["VP"]),
    [currentEmployee],
  );

  useEffect(() => {
    if (!currentEmployee) return;
    if (isAdminRole(currentEmployee.role)) {
      setCenter((prev) => (allowedCenters.includes(prev) ? prev : "all"));
      return;
    }
    setCenter(currentEmployee.center);
  }, [currentEmployee, allowedCenters]);

  const canViewAll = hasPermission(currentEmployee, "attendance:view_all");
  const canViewCenter = hasPermission(currentEmployee, "attendance:view_center");

  const visibleAttendance = useMemo(() => {
    return attendance.filter((record) => {
      const related = findEmployeeByLooseText(record.name);
      const workplace = related?.center ?? record.workplace ?? currentEmployee?.center ?? "VP";

      if (!currentEmployee) return false;
      // Admin/SuperAdmin can see all
      if (canViewAll) return true;
      // Can see own records
      if (record.name === currentEmployee.name || related?.id === currentEmployee.id) return true;
      // Can see records from same center (if has view_center permission)
      if (canViewCenter && workplace === currentEmployee.center) return true;
      return false;
    });
  }, [attendance, currentEmployee, canViewAll, canViewCenter]);

  const centerStats = useMemo(() => {
    const map = new Map<string, { in: number; out: number; total: number }>();
    for (const c of CENTERS) {
      if (!currentEmployee || isAdminRole(currentEmployee.role) || c.code === currentEmployee.center) {
        map.set(c.code, { in: 0, out: 0, total: 0 });
      }
    }

    for (const record of visibleAttendance) {
      const related = findEmployeeByLooseText(record.name);
      const place = related?.center ?? record.workplace ?? currentEmployee?.center ?? "VP";
      const bucket = map.get(place) ?? { in: 0, out: 0, total: 0 };
      bucket.total += 1;
      if (record.status.includes("vào")) bucket.in += 1;
      if (record.status.includes("tan")) bucket.out += 1;
      map.set(place, bucket);
    }

    return [...map.entries()].map(([code, data]) => ({ code, ...data }));
  }, [currentEmployee, visibleAttendance]);

  const rows = useMemo(() => {
    return visibleAttendance.filter((a) => {
      const related = findEmployeeByLooseText(a.name);
      const workplace = related?.center ?? a.workplace ?? currentEmployee?.center ?? "VP";
      if (center !== "all" && workplace !== center) return false;
      if (kind === "in" && !a.status.includes("vào")) return false;
      if (kind === "out" && !a.status.includes("tan")) return false;
      if (dateFrom && a.date < dateFrom) return false;
      if (dateTo && a.date > dateTo) return false;
      if (q.trim()) {
        const s = q.toLowerCase();
        const searchText = [a.name, a.address, a.workplace, related?.username ?? "", related?.dept ?? "", related?.center ?? ""]
          .join(" ")
          .toLowerCase();
        return searchText.includes(s);
      }
      return true;
    });
  }, [center, currentEmployee, kind, q, visibleAttendance, dateFrom, dateTo]);

  const selectedCenterRows = useMemo(() => {
    if (!selectedCenter) return [];
    return rows.filter((a) => {
      const related = findEmployeeByLooseText(a.name);
      const workplace = related?.center ?? a.workplace ?? currentEmployee?.center ?? "VP";
      return workplace === selectedCenter;
    });
  }, [currentEmployee, rows, selectedCenter]);

  function formatPunchTime(date = new Date()) {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }

  function formatPunchDate(date = new Date()) {
    return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
  }

  function formatPunchWeekday(date = new Date()) {
    return date.toLocaleDateString("vi-VN", { weekday: "long" });
  }

  function requestLocation() {
    if (!navigator.geolocation) {
      setGps("GPS không hỗ trợ trên thiết bị này");
      setAddress("Không thể xác định địa điểm tự động trên thiết bị hiện tại.");
      setLocationStatus("GPS không hỗ trợ");
      return;
    }

    setLocationStatus("Đang xác định vị trí...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        const coordinateText = `${lat}, ${lng}`;
        setGps(coordinateText);
        setGpsCoords([position.coords.latitude, position.coords.longitude]);
        // Set address with coordinates first (instant)
        setAddress(`Vị trí chấm công hiện tại: ${coordinateText}`);
        setLocationStatus("Vị trí đã xác định");
        // Reverse geocode to get actual address (async)
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`, {
          headers: {
            "Accept-Language": "vi",
            "User-Agent": "GIONG-VN/1.0 (cham-cong-app)"
          },
        })
          .then((r) => r.json())
          .then((data) => {
            if (data.display_name) {
              setAddress(`Vị trí chấm công hiện tại: ${data.display_name}`);
            }
          })
          .catch(() => {
            // Keep coordinates as address — already set above
          });
      },
      () => {
        const fallback = "0.000000, 0.000000";
        setGps(fallback);
        setGpsCoords([0, 0]);
        setAddress("Không thể xác định vị trí chính xác. Hệ thống đã ghi nhận tọa độ mặc định.");
        setLocationStatus("Không lấy được vị trí chính xác");
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 30000,
      },
    );
  }

  function handlePunchOpen(type: "Điểm danh vào ca" | "Điểm danh tan ca") {
    // Validate attendance rules
    if (type === "Điểm danh vào ca" && !canPunchIn) {
      toast.warning("Hôm nay bạn đã vào ca. Vui lòng tan ca trước khi vào ca lại.");
      return;
    }
    if (type === "Điểm danh tan ca" && !canPunchOut) {
      toast.warning("Bạn chưa vào ca hôm nay. Vui lòng vào ca trước.");
      return;
    }
    setPunchType(type);
    setIsDialogOpen(true);
    setGps("Đang lấy vị trí...");
    setAddress("Đang xác định vị trí...");
    setLocationStatus("Đang xác định vị trí...");
    setPhotoPreview(null);
    setGpsCoords(null);
    requestLocation();
  }

  function handlePhotoUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(typeof reader.result === "string" ? reader.result : null);
    };
    reader.readAsDataURL(file);
  }

  async function confirmPunch() {
    // Re-validate rules before submit
    if (punchType === "Điểm danh vào ca" && !canPunchIn) {
      toast.warning("Hôm nay bạn đã vào ca. Vui lòng tan ca trước.");
      return;
    }
    if (punchType === "Điểm danh tan ca" && !canPunchOut) {
      toast.warning("Bạn chưa vào ca hôm nay. Vui lòng vào ca trước.");
      return;
    }
    // Upload photo to Cloudinary if available
    let photoUrl: string | undefined;
    if (photoPreview) {
      try {
        const result = await uploadImage({
          data: { base64: photoPreview, folder: "giong-vn/cham-cong" },
        });
        photoUrl = result.url;
      } catch (err) {
        console.warn("Cloudinary upload failed, using base64:", err);
        photoUrl = photoPreview; // Fallback to base64
      }
    }
    const rec = clock(punchType, gps === "Đang lấy vị trí..." ? "" : gps, address === "Đang xác định vị trí..." ? "" : address, photoUrl);
    toast.success(`${punchType} lúc ${rec.time}`, { description: rec.name });
    setIsDialogOpen(false);
  }

  return (
    <ClientOnly>
      <div>
        <PageHeader
        eyebrow="Vận hành"
        title="Chấm công toàn hệ thống"
        desc="Điểm danh vào ca và tan ca ở văn phòng và toàn bộ các trung tâm tiêm chủng."
        actions={
          <>
            <Button
              onClick={() => handlePunchOpen("Điểm danh vào ca")}
              disabled={!canPunchIn}
              title={!canPunchIn ? "Hôm nay bạn đã vào ca. Vui lòng tan ca trước." : ""}
            >
              <LogIn />
              Vào ca
            </Button>
            <Button
              variant="outline"
              onClick={() => handlePunchOpen("Điểm danh tan ca")}
              disabled={!canPunchOut}
              title={!canPunchOut ? "Bạn chưa vào ca hôm nay." : ""}
            >
              <LogOut />
              Tan ca
            </Button>
          </>
        }
      />

      <div className="mb-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {centerStats.map((item) => {
          const isActive = selectedCenter === item.code;
          return (
            <Card
              key={item.code}
              className={`cursor-pointer p-3 transition ${isActive ? "border border-accent/60 bg-accent-soft/60 shadow-[var(--shadow-card-hover)]" : "hover:bg-surface-2"}`}
              onClick={() => setSelectedCenter(isActive ? null : item.code)}
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">{item.code}</p>
                  <p className="mt-1 text-sm font-semibold text-ink">{CENTERS.find((c) => c.code === item.code)?.short ?? item.code}</p>
                </div>
                <span className="flex size-8 items-center justify-center rounded-md bg-accent-soft text-accent">
                  <Building2 className="size-4" />
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted">
                <span>Vào: {item.in}</span>
                <span>Ra: {item.out}</span>
              </div>
              <p className="mt-1 text-xs text-faint">Tổng {item.total} lượt</p>
            </Card>
          );
        })}
      </div>

      {selectedCenter ? (
        <Card className="mb-4 overflow-hidden p-0">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">Trung tâm</p>
              <h3 className="text-base font-semibold text-ink">{CENTERS.find((c) => c.code === selectedCenter)?.short ?? selectedCenter}</h3>
            </div>
            <button type="button" onClick={() => setSelectedCenter(null)} className="text-sm text-muted hover:text-ink">
              Ẩn danh sách
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-surface-2 text-xs font-medium tracking-wide text-muted uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium">Nhân sự</th>
                  <th className="px-4 py-3 font-medium">Trụ sở</th>
                  <th className="px-4 py-3 font-medium">Trạng thái</th>
                  <th className="px-4 py-3 font-medium">Ngày</th>
                  <th className="px-4 py-3 font-medium">Giờ</th>
                  <th className="px-4 py-3 font-medium">Địa điểm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {selectedCenterRows.length ? (
                  selectedCenterRows.map((a) => {
                    const related = findEmployeeByLooseText(a.name);
                    const workplace = related?.center ?? a.workplace ?? "VP";
                    const short = CENTERS.find((c) => c.code === workplace)?.short ?? workplace;
                    return (
                      <tr key={a.id} className="hover:bg-surface-2/50">
                        <td className="px-4 py-3">
                          <div className="font-medium text-ink">{a.name}</div>
                          {related ? <div className="text-xs text-faint">{related.title}</div> : null}
                        </td>
                        <td className="px-4 py-3 text-muted">{short}</td>
                        <td className="px-4 py-3">
                          <StatusBadge value={a.status} />
                        </td>
                        <td className="px-4 py-3 text-muted tabular">
                          {formatDate(a.date)}
                          <span className="mt-0.5 block text-xs text-faint">{a.weekday}</span>
                        </td>
                        <td className="px-4 py-3 tabular text-ink">{a.time}</td>
                        <td className="max-w-xs truncate px-4 py-3 text-muted">{a.address || a.gps || "—"}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-sm text-muted">
                      Chưa có lượt chấm công cho trung tâm này.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}

      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tìm tên nhân sự, địa chỉ, trụ sở…"
          className="sm:max-w-sm"
        />
        <select
          value={center}
          onChange={(e) => setCenter(e.target.value)}
          disabled={!isAdminRole(currentEmployee?.role)}
          className="h-11 rounded-md bg-surface px-3 text-sm shadow-[var(--shadow-card)] sm:w-56 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="all">Tất cả trung tâm</option>
          {CENTERS.filter((c) => allowedCenters.includes(c.code)).map((c) => (
            <option key={c.code} value={c.code}>
              {c.short} ({c.code})
            </option>
          ))}
        </select>
        <div className="flex items-center gap-1.5">
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="h-9 w-[140px] rounded-md px-2 text-xs"
            title="Từ ngày"
          />
          <span className="text-xs text-muted">—</span>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="h-9 w-[140px] rounded-md px-2 text-xs"
            title="Đến ngày"
          />
        </div>
        <div className="flex rounded-md bg-surface p-1 shadow-[var(--shadow-card)]">
          {([
            ["all", "Tất cả"],
            ["in", "Vào ca"],
            ["out", "Tan ca"],
          ] as const).map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              className={`h-9 rounded-sm px-3 text-sm font-medium ${kind === k ? "bg-forest text-forest-fg" : "text-muted"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-surface-2 text-xs font-medium tracking-wide text-muted uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">Nhân sự</th>
                <th className="px-4 py-3 font-medium">Trụ sở</th>
                <th className="px-4 py-3 font-medium">Trạng thái</th>
                <th className="px-4 py-3 font-medium">Ngày</th>
                <th className="px-4 py-3 font-medium">Giờ</th>
                <th className="px-4 py-3 font-medium">Địa điểm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.slice(0, 80).map((a) => {
                const related = findEmployeeByLooseText(a.name);
                const workplace = related?.center ?? a.workplace ?? "VP";
                const short = CENTERS.find((c) => c.code === workplace)?.short ?? workplace;
                return (
                  <tr key={a.id} className="cursor-pointer transition hover:bg-surface-2/50" onClick={() => { setDetailRecord(a); setIsDetailOpen(true); }}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-ink">{a.name}</div>
                      {related ? <div className="text-xs text-faint">{related.title}</div> : null}
                    </td>
                    <td className="px-4 py-3 text-muted">{short}</td>
                    <td className="px-4 py-3">
                      <StatusBadge value={a.status} />
                    </td>
                    <td className="px-4 py-3 text-muted tabular">
                      {formatDate(a.date)}
                      <span className="mt-0.5 block text-xs text-faint">{a.weekday}</span>
                    </td>
                    <td className="px-4 py-3 tabular text-ink">{a.time}</td>
                    <td className="max-w-xs truncate px-4 py-3 text-muted">{a.address || a.gps || "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {rows.length === 0 ? (
          <div className="p-4">
            <EmptyState title="Không có lượt chấm" desc="Thử đổi bộ lọc hoặc điểm danh vào ca." />
          </div>
        ) : (
          <p className="px-4 py-3 text-xs text-faint">Hiển thị {Math.min(80, rows.length)} / {rows.length} lượt</p>
        )}
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogTitle>{punchType}</DialogTitle>
          <DialogDesc>Ghi nhận chấm công với hình ảnh, thời gian và định vị hiện tại.</DialogDesc>

          <div className="mt-5 space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium tracking-[0.12em] text-muted uppercase">Ảnh chụp</label>
                <label className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface-2 p-4 text-center text-sm text-muted transition hover:border-accent/50 hover:bg-accent-soft">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Ảnh chấm công" className="h-full max-h-52 w-full rounded-xl object-cover" />
                  ) : (
                    <>
                      <Camera className="mb-3 size-8 text-accent" />
                      <span>Chụp ảnh từ điện thoại</span>
                      <span className="mt-1 text-xs text-faint">Hệ thống sẽ lưu ảnh cùng vị trí</span>
                    </>
                  )}
                  <input type="file" accept="image/*" capture="environment" onChange={handlePhotoUpload} className="hidden" />
                </label>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl border border-line bg-surface-2 p-3">
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Tên nhân sự</p>
                  <p className="mt-2 text-lg font-semibold text-ink">{currentName}</p>
                </div>
                <div className="rounded-2xl border border-line bg-surface-2 p-3">
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Thời gian</p>
                  <p className="mt-2 text-lg font-semibold text-ink">{formatPunchTime()}</p>
                </div>
                <div className="rounded-2xl border border-line bg-surface-2 p-3">
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Thứ trong tuần</p>
                  <p className="mt-2 text-base font-medium text-ink">{formatPunchWeekday()}</p>
                </div>
                <div className="rounded-2xl border border-line bg-surface-2 p-3">
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Ngày điểm danh</p>
                  <p className="mt-2 text-base font-medium text-ink">{formatPunchDate()}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-2xl border border-line bg-surface-2 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Định vị GPS</p>
                  <div className="flex items-center gap-1 text-xs text-muted">
                    <MapPin className="size-3.5" />
                    {locationStatus}
                  </div>
                </div>
                <GpsMap
                  coords={gpsCoords}
                  fallback={
                    <>
                      <MapPin className="mr-2 size-4" />
                      Đang tải bản đồ...
                    </>
                  }
                />
                <p className="mt-3 text-sm font-medium text-ink">{gps}</p>
              </div>

              <div className="rounded-2xl border border-line bg-surface-2 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Địa chỉ</p>
                  <TimerReset className="size-4 text-muted" />
                </div>
                <p className="text-sm leading-6 text-ink">{address}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={confirmPunch}>
              <LogIn className="size-4" />
              Xác nhận {punchType === "Điểm danh vào ca" ? "vào ca" : "tan ca"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Attendance Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogTitle>Chi tiết chấm công</DialogTitle>
          <DialogDesc>Thông tin chi tiết lượt chấm công của nhân sự.</DialogDesc>

          {detailRecord && (
            <div className="mt-4 space-y-4">
              {detailRecord.photo && (
                <div className="overflow-hidden rounded-xl border border-line">
                  <img src={detailRecord.photo} alt="Ảnh chấm công" className="w-full object-cover" style={{ maxHeight: 300 }} />
                </div>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-line bg-surface-2 p-3">
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Nhân sự</p>
                  <p className="mt-1 text-base font-semibold text-ink">{detailRecord.name}</p>
                  {(() => { const r = findEmployeeByLooseText(detailRecord.name); return r ? <p className="text-xs text-faint">{r.title} — {r.center}</p> : null; })()}
                </div>
                <div className="rounded-xl border border-line bg-surface-2 p-3">
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Trạng thái</p>
                  <div className="mt-1"><StatusBadge value={detailRecord.status} /></div>
                </div>
                <div className="rounded-xl border border-line bg-surface-2 p-3">
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Thời gian</p>
                  <p className="mt-1 text-base font-semibold text-ink">{detailRecord.time}</p>
                  <p className="text-xs text-faint">{detailRecord.weekday}</p>
                </div>
                <div className="rounded-xl border border-line bg-surface-2 p-3">
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Ngày</p>
                  <p className="mt-1 text-base font-medium text-ink">{formatDate(detailRecord.date)}</p>
                </div>
              </div>

              {detailRecord.gps && (() => {
                const parts = detailRecord.gps.split(",").map((s) => parseFloat(s.trim()));
                const lat = parts[0];
                const lng = parts[1];
                if (isNaN(lat) || isNaN(lng)) return null;
                return (
                  <div>
                    <p className="mb-2 text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Vị trí GPS</p>
                    <GpsMap coords={[lat, lng]} address={detailRecord.address} />
                    <p className="mt-2 text-sm text-ink">{detailRecord.address || detailRecord.gps}</p>
                  </div>
                );
              })()}
            </div>
          )}

          <div className="mt-5 flex justify-end">
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Đóng</Button>
          </div>
        </DialogContent>
      </Dialog>

      </div>
    </ClientOnly>
  );
}
