import { createFileRoute } from "@tanstack/react-router";
import {
  Camera,
  Eye,
  Loader2,
  MapPin,
  Trash2,
} from "lucide-react";
import { ClientOnly } from "@/components/client-only";
import { useRef, useEffect, useMemo, useState, useCallback } from "react";
import { toast } from "sonner";
import { EmptyState } from "@/components/empty-state";
import { GpsMap } from "@/components/gps-map";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDesc,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CENTERS,
  findEmployeeByLooseText,
  isAdminRole,
} from "@/lib/catalog";
import { hasPermission } from "@/lib/permissions";
import { formatDate } from "@/lib/format";
import { useAppStore } from "@/lib/store";
import { reverseGeocode } from "@/routes/api/data";
import { uploadImage } from "@/routes/api/upload";

/** Clean address: remove postal codes (e.g. "11810") but keep house numbers. */
function cleanAddress(addr: string): string {
  if (!addr) return addr;
  let cleaned = addr.replace(/,?\s*\d{4,6}\s*(?=,|$)/g, "");
  cleaned = cleaned.replace(/,\s*,/g, ",").replace(/^\s*,|,\s*$/g, "");
  return cleaned.trim();
}

export const Route = createFileRoute("/check-in")({ component: CheckInPage });

function CheckInPage() {
  const checkins = useAppStore((s) => s.checkins);
  const addCheckin = useAppStore((s) => s.addCheckin);
  const removeCheckin = useAppStore((s) => s.removeCheckin);
  const currentEmployee = useAppStore(
    (s) => s.employees.find((e) => e.id === s.currentUserId) ?? null,
  );
  const currentName = useAppStore((s) => s.currentName());

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [gps, setGps] = useState("");
  const [address, setAddress] = useState("");
  const [gpsCoords, setGpsCoords] = useState<[number, number] | null>(null);
  const [locationStatus, setLocationStatus] = useState("");
  const [selectedCenter, setSelectedCenter] = useState<string>(
    currentEmployee?.center ?? "VP",
  );
  const [note, setNote] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);
  // Camera live state (giống chấm công)
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const captureCanvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [photoStamped, setPhotoStamped] = useState(false);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("user");

  const [detailRecord, setDetailRecord] = useState<(typeof checkins)[number] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filterCenter, setFilterCenter] = useState<string>("all");

  const [q, setQ] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const canViewAll = isAdminRole(currentEmployee?.role) || hasPermission(currentEmployee, "checkin:view_all");

  const visibleCheckins = useMemo(() => {
    return checkins.filter((entry) => {
      if (canViewAll) return true;
      const empName = currentEmployee?.name ?? currentName;
      return entry.name === empName;
    });
  }, [checkins, currentEmployee, currentName, canViewAll]);

  const rows = useMemo(() => {
    return visibleCheckins.filter((c) => {
      if (filterCenter !== "all" && (c.centerCode ?? "VP") !== filterCenter) return false;
      if (dateFrom && c.date < dateFrom) return false;
      if (dateTo && c.date > dateTo) return false;
      if (q.trim()) {
        const s = q.toLowerCase();
        const related = findEmployeeByLooseText(c.name);
        const searchText = [
          c.name,
          c.address,
          c.centerCode ?? "",
          c.note,
          related?.username ?? "",
          related?.dept ?? "",
        ]
          .join(" ")
          .toLowerCase();
        return searchText.includes(s);
      }
      return true;
    });
  }, [visibleCheckins, q, dateFrom, dateTo, filterCenter]);

  function requestLocation(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        setLocationStatus("GPS không hỗ trợ trên thiết bị này");
        resolve(false);
        return;
      }
      setLocationStatus("Đang xác định vị trí...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lng = position.coords.longitude.toFixed(6);
          setGps(`${lat}, ${lng}`);
          setGpsCoords([position.coords.latitude, position.coords.longitude]);
          setAddress(`${lat}, ${lng}`);
          setLocationStatus("Vị trí đã xác định");
          resolve(true);
        },
        () => {
          setGps("");
          setGpsCoords(null);
          setAddress("");
          setLocationStatus("Không lấy được vị trí. Vui lòng bật GPS.");
          resolve(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 30000 },
      );
    });
  }  async function handleOpenDialog() {
    setIsDialogOpen(true);
    setGps("");
    setAddress("");
    setGpsCoords(null);
    setLocationStatus("Đang lấy vị trí...");
    setPhotoPreview(null);
    setNote("");
    setSelectedCenter(currentEmployee?.center ?? "VP");
    setPhotoStamped(false);
    stopCamera();

    // Request GPS immediately
    const ok = await requestLocation();
    if (!ok) {
      toast.warning("Không lấy được vị trí GPS. Vui lòng bật định vị để check-in.");
    }
    // Mở camera sau khi dialog render xong (nếu không được thì vẫn cho chọn ảnh từ gallery)
    setTimeout(() => {
      startCamera().catch(() => {
        // Camera không available — user vẫn có thể chọn ảnh từ gallery nếu có input fallback
        console.log('[check-in] Camera không available, user có thể chọn ảnh từ nơi khác');
      });
    }, 400);
  }

  async function resolveAddress(): Promise<string> {
    if (!gpsCoords) return "";
    const [lat, lng] = gpsCoords;
    if (lat === 0 && lng === 0) return "";
    try {
      const addr = await Promise.race([
        reverseGeocode({ data: { lat, lng } }),
        new Promise<string>((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 10000),
        ),
      ]);
      return addr;
    } catch {
      return "";
    }
  }

  async function confirmCheckin() {
    if (submittingRef.current) return;

    // GPS is mandatory
    if (!gpsCoords || (gpsCoords[0] === 0 && gpsCoords[1] === 0)) {
      toast.warning("Vui lòng bật định vị GPS để check-in.");
      return;
    }
    // Photo is mandatory
    if (!photoPreview) {
      toast.warning("Vui lòng chụp ảnh xác nhận trước khi check-in.");
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    try {
      const resolvedAddress = await resolveAddress();
      const finalAddress = resolvedAddress
        ? cleanAddress(resolvedAddress)
        : address || gps;

      let photoUrl = "";
      try {
        const result = await uploadImage({
          data: { base64: photoPreview, folder: "giong-vn/check-in" },
        });
        photoUrl = result.url;
      } catch (err) {
        console.warn("Cloudinary upload failed, using base64:", err);
        photoUrl = photoPreview;
      }

      const rec = addCheckin(gps, finalAddress, note.trim(), photoUrl, selectedCenter);
      toast.success(`Check-in lúc ${rec.time}`, {
        description: rec.address || rec.gps,
      });
      setIsDialogOpen(false);
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  function handleDeleteRecord() {
    if (!detailRecord) return;
    const ok = window.confirm(
      `Xóa lượt check-in của ${detailRecord.name} lúc ${detailRecord.time} ngày ${formatDate(detailRecord.date)}?`,
    );
    if (!ok) return;
    removeCheckin(detailRecord.id);
    setIsDetailOpen(false);
    toast.success("Đã xóa lượt check-in", { description: detailRecord.name });
  }

  // ── Camera live (giống chấm công) ──

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  const startCamera = useCallback(async (mode?: "environment" | "user") => {
    if (mode) setFacingMode(mode);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraActive(true);
      setPhotoStamped(false);
    } catch (err: any) {
      console.error("[check-in] Camera error:", err);
      toast.error("Không thể mở camera. Vui lòng cho phép truy cập camera.");
      // Không rethrow — component vẫn hoạt động được
    }
  }, [facingMode]);

  const switchCamera = useCallback(() => {
    const next = facingMode === "environment" ? "user" : "environment";
    startCamera(next);
  }, [facingMode, startCamera]);

  const retakePhoto = useCallback(() => {
    setPhotoPreview(null);
    setPhotoStamped(false);
    startCamera();
  }, [startCamera]);

  const drawOverlay = useCallback(() => {
    const video = videoRef.current;
    const canvas = overlayCanvasRef.current;
    if (!video || !canvas || video.paused || video.ended) return;
    // Fallback: nếu videoWidth/videoHeight chưa ready, dùng clientWidth/Height hoặc default
    const w = video.videoWidth && video.videoWidth > 100 ? video.videoWidth : (video.clientWidth || 640);
    const h = video.videoHeight && video.videoHeight > 100 ? video.videoHeight : (video.clientHeight || 480);
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, w, h);
    const scale = Math.max(1, w / 640);
    const pad = Math.round(16 * scale);
    const lineX = pad;
    const textX = lineX + Math.round(8 * scale);
    // Font nhỏ hơn chấm công một chút để nội dung không bị lấn
    const bigTime = Math.max(28, Math.round(w * 0.065));
    const smFont = Math.max(11, Math.round(w * 0.022));
    function drawText(text: string, x: number, y: number, size: number, color = "#ffffff", bold = false) {
      ctx.font = `${bold ? "bold " : ""}${size}px Arial, Helvetica, sans-serif`;
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillText(text, x + 1, y + 1);
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
    }
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
    const dateStr = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;
    const weekdayStr = now.toLocaleDateString("vi-VN", { weekday: "long" });
    const addrText = address.length > 40 ? address.slice(0, 37) + "..." : address;
    const infoLines: Array<{ text: string; size: number; bold: boolean }> = [
      { text: `Công ty: Cổ Phần Giong Việt Nam`, size: smFont, bold: false },
      { text: `Tên: ${currentName}`, size: smFont, bold: false },
      { text: addrText || gps, size: smFont, bold: false },
      { text: `${dateStr} ${weekdayStr}`, size: smFont, bold: false },
      { text: timeStr, size: bigTime, bold: true },
    ];
    let totalH = 0;
    for (const l of infoLines) totalH += l.size + Math.round(3 * scale);
    let y = h - pad;
    const greenLineTop = y - totalH - Math.round(4 * scale);
    ctx.fillStyle = "#22c55e";
    ctx.fillRect(lineX, greenLineTop, Math.round(3 * scale), totalH + Math.round(6 * scale));
    for (const l of infoLines) {
      y -= l.size;
      drawText(l.text, textX, y, l.size, "#ffffff", l.bold);
      y -= Math.round(3 * scale);
    }
    console.log('[check-in] drawOverlay called — w:', w, 'h:', h, 'ctx:', !!ctx);
    requestAnimationFrame(drawOverlay);
  }, [currentName, address, gps]);

  useEffect(() => {
    console.log('[check-in] useEffect cameraActive:', cameraActive, 'photoPreview:', !!photoPreview);
    if (cameraActive && videoRef.current && !photoPreview) {
      const timer = setTimeout(() => {
        console.log('[check-in] Starting drawOverlay loop, video.paused:', videoRef.current?.paused);
        if (videoRef.current && !videoRef.current.paused) {
          requestAnimationFrame(drawOverlay);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [cameraActive, drawOverlay, photoPreview]);

  const doStamp = useCallback((video: HTMLVideoElement, canvas: HTMLCanvasElement, timeStr: string, dateStr: string, weekdayStr: string, gpsStr: string, addrStr: string) => {
    // Fallback: nếu videoWidth/videoHeight chưa ready, dùng clientWidth/Height hoặc default
    const w = video.videoWidth && video.videoWidth > 100 ? video.videoWidth : (video.clientWidth || 640);
    const h = video.videoHeight && video.videoHeight > 100 ? video.videoHeight : (video.clientHeight || 480);
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, w, h);
    const scale = Math.max(1, w / 640);
    const pad = Math.round(16 * scale);
    const lineX = pad;
    const textX = lineX + Math.round(8 * scale);
    const bigTime = Math.max(28, Math.round(w * 0.065));
    const smFont = Math.max(11, Math.round(w * 0.022));
    function drawText(text: string, x: number, y: number, size: number, color = "#ffffff", bold = false) {
      ctx.font = `${bold ? "bold " : ""}${size}px Arial, Helvetica, sans-serif`;
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillText(text, x + 1, y + 1);
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
    }
    const infoLines: Array<{ text: string; size: number; bold: boolean }> = [
      { text: `Công ty: Cổ Phần Giong Việt Nam`, size: smFont, bold: false },
      { text: `Tên: ${currentName}`, size: smFont, bold: false },
      { text: addrStr || gpsStr, size: smFont, bold: false },
      { text: `${dateStr} ${weekdayStr}`, size: smFont, bold: false },
      { text: timeStr, size: bigTime, bold: true },
    ];
    let totalH = 0;
    for (const l of infoLines) totalH += l.size + Math.round(3 * scale);
    let y = h - pad;
    const greenLineTop = y - totalH - Math.round(4 * scale);
    ctx.fillStyle = "#22c55e";
    ctx.fillRect(lineX, greenLineTop, Math.round(3 * scale), totalH + Math.round(6 * scale));
    for (const l of infoLines) {
      y -= l.size;
      drawText(l.text, textX, y, l.size, "#ffffff", l.bold);
      y -= Math.round(3 * scale);
    }
    const stamped = canvas.toDataURL("image/jpeg", 0.85);
    setPhotoPreview(stamped);
    setPhotoStamped(true);
    stopCamera();
  }, [currentName, stopCamera]);

  const capturePhoto = useCallback(() => {
    const video = videoRef.current;
    const canvas = captureCanvasRef.current;
    if (!video || !canvas) return;
    const now = new Date();
    const freshTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
    const freshDate = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;
    const freshWeekday = now.toLocaleDateString("vi-VN", { weekday: "long" });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        setGps(`${lat}, ${lng}`);
        setGpsCoords([pos.coords.latitude, pos.coords.longitude]);
        doStamp(video, canvas, freshTime, freshDate, freshWeekday, `${lat}, ${lng}`, address);
      },
      () => {
        doStamp(video, canvas, freshTime, freshDate, freshWeekday, gps, address);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    );
  }, [address, gps, gpsCoords, doStamp]);

  // Center stats
  const centerStats = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of CENTERS) {
      if (
        !currentEmployee ||
        isAdminRole(currentEmployee.role) ||
        c.code === currentEmployee.center
      ) {
        map.set(c.code, 0);
      }
    }
    for (const c of visibleCheckins) {
      const cc = c.centerCode ?? "VP";
      map.set(cc, (map.get(cc) ?? 0) + 1);
    }
    return [...map.entries()]
      .map(([code, count]) => ({ code, count }))
      .filter((s) => s.count > 0 || isAdminRole(currentEmployee?.role));
  }, [visibleCheckins, currentEmployee]);

  return (
    <ClientOnly>
      <div>
        <PageHeader
          eyebrow="Vận hành"
          title="Check-in địa điểm"
          desc="Ghi nhận vị trí khi đi công tác, giám sát điểm tiêm hoặc điều phối giữa các trung tâm."
          actions={
            <Button onClick={handleOpenDialog}>
              <MapPin />
              Check-in mới
            </Button>
          }
        />

        {/* Center stats */}
        {centerStats.length > 0 && (
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setFilterCenter("all")}
              className={`flex-shrink-0 rounded-xl border px-4 py-2 text-sm font-medium transition ${
                filterCenter === "all"
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-line bg-surface text-muted hover:border-accent/50"
              }`}
            >
              Tất cả
            </button>
            {centerStats.map((s) => (
              <button
                key={s.code}
                type="button"
                onClick={() => setFilterCenter(filterCenter === s.code ? "all" : s.code)}
                className={`flex-shrink-0 rounded-xl border px-4 py-2 text-left text-sm transition ${
                  filterCenter === s.code
                    ? "border-accent bg-accent-soft"
                    : "border-line bg-surface hover:border-accent/50"
                }`}
              >
                <p className={`font-medium ${filterCenter === s.code ? "text-accent" : "text-ink"}`}>
                  {CENTERS.find((c) => c.code === s.code)?.short ?? s.code}
                </p>
                <p className="text-xs text-muted">
                  <strong>{s.count}</strong> lượt
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Filters */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm tên nhân sự, địa chỉ..."
            className="w-56"
          />
          <div className="flex items-center gap-1.5">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="rounded-xl border border-line bg-surface px-3 py-2 text-sm"
            />
            <span className="text-muted">—</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="rounded-xl border border-line bg-surface px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Table */}
        {rows.length === 0 ? (
          <EmptyState
            title="Chưa có lượt check-in"
            desc="Bấm Check-in mới để ghi vị trí đầu tiên."
          />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-sm">
              <thead className="bg-surface-2 text-left text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-3">STT</th>
                  <th className="px-4 py-3">Nhân sự</th>
                  <th className="px-4 py-3">Trung tâm</th>
                  <th className="px-4 py-3">Ngày</th>
                  <th className="px-4 py-3">Giờ</th>
                  <th className="px-4 py-3">Địa điểm</th>
                  <th className="px-4 py-3">Ảnh</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((c, i) => (
                  <tr
                    key={c.id}
                    className="cursor-pointer transition hover:bg-surface-2/50"
                    onClick={() => {
                      setDetailRecord(c);
                      setIsDetailOpen(true);
                    }}
                  >
                    <td className="px-4 py-3 tabular">{i + 1}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-ink">{c.name}</p>
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {CENTERS.find((ct) => ct.code === c.centerCode)?.short ??
                        c.centerCode ?? "VP"}
                    </td>
                    <td className="px-4 py-3">
                      {formatDate(c.date)}
                      <span className="mt-0.5 block text-xs text-faint">
                        {c.weekday}
                      </span>
                    </td>
                    <td className="px-4 py-3 tabular text-ink">{c.time}</td>
                    <td className="max-w-[200px] truncate px-4 py-3 text-muted">
                      {c.address || c.gps || "—"}
                    </td>
                    <td className="px-4 py-3">
                      {c.photo ? (
                        <img
                          src={c.photo}
                          alt="check-in"
                          className="size-8 rounded-md object-cover"
                        />
                      ) : (
                        <span className="text-xs text-faint">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Eye className="size-4 text-faint" />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-surface-2 font-medium">
                <tr>
                  <td className="px-4 py-3" colSpan={7}>
                    Tổng cộng
                  </td>
                  <td className="px-4 py-3 tabular">{rows.length} lượt</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        {/* Check-in Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogTitle>Check-in địa điểm</DialogTitle>
            <DialogDesc>
              Xác nhận vị trí và chụp ảnh để hoàn tất check-in.
            </DialogDesc>

            {/* Employee info */}
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-ink">
                {currentEmployee?.name ?? currentName}
              </p>
              <span className="rounded-full bg-accent-soft px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                {currentEmployee?.center ?? "VP"}
              </span>
            </div>

            {/* GPS status */}
            <div className="mb-3 rounded-xl border border-line bg-surface-2 p-3">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-accent" />
                <p className="text-sm font-medium text-ink">
                  {locationStatus || "Đang lấy vị trí..."}
                </p>
              </div>
              {gpsCoords && (
                <p className="mt-1 font-mono text-xs text-faint">
                  {gpsCoords[0].toFixed(6)}, {gpsCoords[1].toFixed(6)}
                </p>
              )}
              {address && (
                <p className="mt-1 text-xs text-muted">{address}</p>
              )}
            </div>

            {/* Center selector */}
            <div className="mb-3">
              <label className="mb-1 block text-xs font-medium text-muted uppercase">
                Trung tâm check-in
              </label>
              <select
                value={selectedCenter}
                onChange={(e) => setSelectedCenter(e.target.value)}
                className="w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm"
              >
                {CENTERS.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.short} ({c.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Note */}
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ghi chú (ví dụ: giám sát trung tâm Long Biên)"
              className="mb-3"
            />

            {/* Photo: camera live + stamp */}
            <div className="mb-3">
              <label className="mb-1 block text-xs font-medium text-muted uppercase">
                Ảnh xác nhận *
              </label>
              <div className="relative overflow-hidden rounded-2xl border border-line bg-black">
                {!photoPreview ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full rounded-2xl"
                      style={{ maxHeight: 400, objectFit: "cover" }}
                    />
                    <canvas
                      ref={overlayCanvasRef}
                      className="absolute inset-0 w-full h-full rounded-2xl pointer-events-none"
                      style={{ maxHeight: 400, objectFit: "cover", zIndex: 10 }}
                    />
                    <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={switchCamera}
                        className="size-10 rounded-full border-2 border-white/70 bg-black/40 backdrop-blur-sm flex items-center justify-center transition hover:bg-black/60"
                        title="Ảnh trước / Ảnh sau"
                      >
                        <Camera className="size-5" />
                      </button>
                      <button
                        type="button"
                        onClick={capturePhoto}
                        className="size-16 rounded-full border-4 border-white bg-white/30 backdrop-blur-sm flex items-center justify-center transition active:scale-90 hover:bg-white/50"
                        title="Chụp ảnh"
                      >
                        <div className="size-12 rounded-full bg-white" />
                      </button>
                    </div>
                    {!cameraActive && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white">
                        <Loader2 className="mb-3 size-8 animate-spin" />
                        <span className="text-sm">Đang mở camera...</span>
                        <button
                          type="button"
                          onClick={() => {
                            // Fallback: cho phép chọn ảnh từ gallery khi camera không available
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.capture = 'environment';
                            input.onchange = (e: any) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = () => setPhotoPreview(reader.result as string);
                                reader.readAsDataURL(file);
                              }
                            };
                            input.click();
                          }
                          }
                          className="mt-3 text-sm text-white underline"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}
                        >
                          Chọn ảnh từ thư viện
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="relative">
                    <img
                      src={photoPreview}
                      alt="Ảnh check-in đã đóng dấu"
                      className="w-full rounded-2xl"
                      style={{ maxHeight: 400, objectFit: "cover" }}
                    />
                    <button
                      type="button"
                      onClick={retakePhoto}
                      className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-sm hover:bg-black/80"
                    >
                      <Trash2 className="size-3.5" />
                      Chụp lại
                    </button>
                  </div>
                )}
                <canvas ref={captureCanvasRef} className="hidden" />
              </div>
            </div>

            {/* Submit */}
            <Button
              onClick={confirmCheckin}
              disabled={isSubmitting || !gpsCoords || !photoPreview}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <MapPin />
                  Xác nhận Check-in
                </>
              )}
            </Button>
          </DialogContent>
        </Dialog>

        {/* Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-lg">
            {detailRecord && (
              <>
                <DialogTitle>Chi tiết Check-in</DialogTitle>
                <DialogDesc>
                  {detailRecord.name} — {formatDate(detailRecord.date)}
                </DialogDesc>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-ink">
                        {detailRecord.name}
                      </p>
                      <p className="text-sm text-muted">
                        {formatDate(detailRecord.date)} · {detailRecord.time} ·{" "}
                        {detailRecord.weekday}
                      </p>
                    </div>
                    {canViewAll ||
                    detailRecord.name ===
                      (currentEmployee?.name ?? currentName) ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDeleteRecord}
                      >
                        <Trash2 className="size-4" />
                        Xóa
                      </Button>
                    ) : null}
                  </div>

                  {detailRecord.centerCode && (
                    <p className="text-sm text-muted">
                      Trung tâm:{" "}
                      <strong>
                        {CENTERS.find(
                          (c) => c.code === detailRecord.centerCode,
                        )?.short ?? detailRecord.centerCode}
                      </strong>
                    </p>
                  )}

                  {detailRecord.address && (
                    <p className="text-sm text-ink">{detailRecord.address}</p>
                  )}
                  {detailRecord.gps && (
                    <p className="font-mono text-xs text-faint">
                      {detailRecord.gps}
                    </p>
                  )}
                  {detailRecord.note && (
                    <p className="text-sm text-muted">{detailRecord.note}</p>
                  )}

                  {detailRecord.photo && (
                    <img
                      src={detailRecord.photo}
                      alt="check-in"
                      className="h-48 w-full rounded-xl object-cover"
                    />
                  )}

                  {detailRecord.gps && (() => {
                    const parts = detailRecord.gps.split(",").map(Number);
                    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                      return (
                        <GpsMap
                          coords={[parts[0], parts[1]]}
                          address={detailRecord.address}
                        />
                      );
                    }
                    return null;
                  })()}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ClientOnly>
  );
}
