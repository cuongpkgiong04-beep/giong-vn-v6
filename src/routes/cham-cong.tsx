import { createFileRoute } from "@tanstack/react-router";
import { Camera, Eye, Loader2, LogIn, LogOut, MapPin, RotateCcw, TimerReset, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
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
import { CENTERS, findEmployeeByLooseText, getVisibleCenterCodes, isAdminRole } from "@/lib/catalog";
import { hasPermission } from "@/lib/permissions";
import { formatDate } from "@/lib/format";
import { useAppStore, getPendingSyncRecords } from "@/lib/store";
import { reverseGeocode } from "@/routes/api/data";
import { uploadImage } from "@/routes/api/upload";

/**
 * Clean address: remove postal codes (e.g. "11810") but keep house numbers.
 * Input:  "Ngõ 409 Đường Nguyễn Văn Cừ, Ngọc Lâm, Hà Nội, 11810, Việt Nam"
 * Output: "Ngõ 409 Đường Nguyễn Văn Cừ, Ngọc Lâm, Hà Nội, Việt Nam"
 */
function cleanAddress(addr: string): string {
  if (!addr) return addr;
  // Remove standalone postal codes (4-6 digits between commas)
  let cleaned = addr.replace(/,?\s*\d{4,6}\s*(?=,|$)/g, "");
  // Clean up double commas/spaces from removal
  cleaned = cleaned.replace(/,\s*,/g, ",").replace(/^\s*,|,\s*$/g, "");
  return cleaned.trim();
}

export const Route = createFileRoute("/cham-cong")({ component: ChamCongPage });

function ChamCongPage() {
  const attendance = useAppStore((s) => s.attendance);
  const currentUserId = useAppStore((s) => s.currentUserId);
  const clock = useAppStore((s) => s.clock);
  const removeAttendance = useAppStore((s) => s.removeAttendance);
  // Reactive: subscribe to employees so this re-renders when DB data loads
  const currentEmployee = useAppStore((s) => s.employees.find((e) => e.id === s.currentUserId) ?? null);
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
  // Chỉ cho phép xác nhận 1 lần — ref chặn mọi double-tap trước khi re-render
  const submittingRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingRecords, setPendingRecords] = useState<Array<{ collection: string; data: any; attempts?: number }>>([]);
  const [showSyncDashboard, setShowSyncDashboard] = useState(false);
  // Camera state
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const captureCanvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [photoStamped, setPhotoStamped] = useState(false);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("user");

  // Refresh pending records periodically
  useEffect(() => {
    const refresh = () => setPendingRecords(getPendingSyncRecords());
    refresh();
    const interval = setInterval(refresh, 10_000);
    return () => clearInterval(interval);
  }, []);

  const syncStats = useMemo(() => {
    const pending = pendingRecords.filter((r) => r.collection === "attendance");
    const total = pending.length;
    const failed = pending.filter((r) => (r.attempts ?? 0) > 5).length;
    const retrying = total - failed;
    return { total, failed, retrying };
  }, [pendingRecords]);

  // Compute today's attendance status for current user (use Vietnam timezone like store)
  const todayStr = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const todayRecords = useMemo(() => {
    const empId = currentEmployee?.id;
    return attendance.filter((a) =>
      (empId && a.employeeId === empId) || a.name === (currentEmployee?.name ?? currentName),
    ).filter((a) => a.date === todayStr);
  }, [attendance, currentEmployee, currentName, todayStr]);

  // attendance array is newest-first (prepended), so [0] is most recent
  const lastStatus = todayRecords.length > 0 ? todayRecords[0].status : null;
  // Rules: must check in before check out. Can do multiple in/out cycles per day.
  const canPunchIn = lastStatus !== "Điểm danh vào ca"; // last was out or no records
  const canPunchOut = lastStatus === "Điểm danh vào ca"; // last was in

  const allowedCenters = useMemo(
    () => (currentEmployee ? getVisibleCenterCodes(currentEmployee) : ["VP"]),
    [currentEmployee],
  );

  useEffect(() => {
    if (!currentEmployee) return;
    if (!isAdminRole(currentEmployee.role)) {
      setCenter(currentEmployee.center);
    }
  }, [currentEmployee]);

  const canViewAll = hasPermission(currentEmployee, "attendance:view_all");
  const isAdmin = isAdminRole(currentEmployee?.role);
  // Delete allowed for admins (any record) or the record owner
  const canDeleteRecord = detailRecord
    ? canViewAll || detailRecord.name === (currentEmployee?.name ?? currentName)
    : false;

  const visibleAttendance = useMemo(() => {
    return attendance.filter((record) => {
      // Admin/SuperAdmin can see all
      if (canViewAll) return true;
      // User can only see own records — fallback to currentName if employee not found
      const empName = currentEmployee?.name ?? currentName;
      return record.name === empName;
    });
  }, [attendance, currentEmployee, currentName, canViewAll]);

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
        setAddress(coordinateText);
        setLocationStatus("Vị trí đã xác định");
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

  // Stop camera stream
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  // Start camera stream (facingMode: environment=back, user=front)
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
      console.error("[cham-cong] Camera error:", err);
      toast.error("Không thể mở camera. Vui lòng cho phép truy cập camera.");
    }
  }, [facingMode]);

  // Draw overlay on canvas (live preview)
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
    // Draw video frame
    ctx.drawImage(video, 0, 0, w, h);
    // ── Draw overlay styled like reference photo ──
    // No dark bar — text floats on image with shadow
    const scale = Math.max(1, w / 640);
    const pad = Math.round(16 * scale);
    const lineX = pad; // left edge for green accent line
    const textX = lineX + Math.round(8 * scale); // text starts after green line
    // Font sizes — nhỏ hơn để nội dung không bị lấn (bottom-left)
    const bigTime = Math.max(28, Math.round(w * 0.065)); // Large clock time (6.5% width)
    const smFont = Math.max(11, Math.round(w * 0.022));  // Small info text (2.2% width)
    // Helper: draw text with shadow
    function drawText(text: string, x: number, y: number, size: number, color = "#ffffff", bold = false) {
      ctx.font = `${bold ? "bold " : ""}${size}px Arial, Helvetica, sans-serif`;
      ctx.textAlign = "left";
      // Shadow
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillText(text, x + 1, y + 1);
      // Main text
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
    }
    // Build info lines (bottom-up, all ở dưới-phải của ảnh)
    const lines: Array<{ text: string; size: number; color: string; bold: boolean }> = [];
    // Company name
    lines.push({ text: `Công ty: Cổ Phần Giong Việt Nam`, size: smFont, color: "#ffffff", bold: false });
    // Employee name
    lines.push({ text: `Tên: ${currentName}`, size: smFont, color: "#ffffff", bold: false });
    // Address (shortened if too long)
    const addrText = address.length > 40 ? address.slice(0, 37) + "..." : address;
    lines.push({ text: addrText, size: smFont, color: "#ffffff", bold: false });
    // Date + weekday
    const now = new Date();
    const dateStr = `${formatPunchDate()} ${formatPunchWeekday()}`;
    lines.push({ text: dateStr, size: smFont, color: "#ffffff", bold: false });
    // Large time (clock style, cuối cùng = trên cùng của khối nội dung)
    lines.push({ text: formatPunchTime(), size: bigTime, color: "#ffffff", bold: true });
    // Measure total height needed
    let totalH = 0;
    for (const l of lines) totalH += l.size + Math.round(3 * scale);
    // Draw from bottom-left
    let y = h - pad;
    // Draw green accent line on left (chạy dọc cạnh nội dung)
    const greenLineTop = y - totalH - Math.round(4 * scale);
    const greenLineH = totalH + Math.round(6 * scale);
    ctx.fillStyle = "#22c55e";
    ctx.fillRect(lineX, greenLineTop, Math.round(3 * scale), greenLineH);
    // Draw each line bottom-up
    for (const l of lines) {
      y -= l.size;
      drawText(l.text, textX, y, l.size, l.color, l.bold);
      y -= Math.round(3 * scale);
    }
    // Request next frame
    console.log('[cham-cong] drawOverlay frame — w:', w, 'h:', h);
    requestAnimationFrame(drawOverlay);
  }, [currentName, gps, address]);

  // Start overlay loop when camera is active
  useEffect(() => {
    console.log('[cham-cong] useEffect cameraActive:', cameraActive, 'photoPreview:', !!photoPreview);
    if (cameraActive && videoRef.current && !photoPreview) {
      const timer = setTimeout(() => {
        console.log('[cham-cong] Starting drawOverlay loop, video.paused:', videoRef.current?.paused);
        if (videoRef.current && !videoRef.current.paused) {
          requestAnimationFrame(drawOverlay);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [cameraActive, drawOverlay, photoPreview]);

  // Capture photo with overlay stamped — GPS + time are FRESH at this moment
  function capturePhoto() {
    const video = videoRef.current;
    const canvas = captureCanvasRef.current;
    if (!video || !canvas) return;
    // ── Get FRESH GPS + timestamp at capture moment ──
    const now = new Date();
    const freshTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
    });
    const freshDate = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;
    const freshWeekday = now.toLocaleDateString("vi-VN", { weekday: "long" });
    const freshGps = gps; // latest from GPS sensor
    const freshAddr = address;
    // Re-fetch GPS for fresh coordinates
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        setGps(`${lat}, ${lng}`);
        setGpsCoords([pos.coords.latitude, pos.coords.longitude]);
        doStamp(video, canvas, freshTime, freshDate, freshWeekday, `${lat}, ${lng}`, freshAddr);
      },
      () => {
        // GPS failed, use current values
        doStamp(video, canvas, freshTime, freshDate, freshWeekday, freshGps, freshAddr);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    );
  }

  function doStamp(
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement,
    timeStr: string,
    dateStr: string,
    weekdayStr: string,
    gpsStr: string,
    addrStr: string,
  ) {
    // Fallback: nếu videoWidth/videoHeight chưa ready, dùng clientWidth/Height hoặc default
    const w = video.videoWidth && video.videoWidth > 100 ? video.videoWidth : (video.clientWidth || 640);
    const h = video.videoHeight && video.videoHeight > 100 ? video.videoHeight : (video.clientHeight || 480);
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Draw video frame
    ctx.drawImage(video, 0, 0, w, h);
    // ── Draw overlay styled like reference photo ──
    const scale = Math.max(1, w / 640);
    const pad = Math.round(16 * scale);
    const lineX = pad;
    const textX = lineX + Math.round(8 * scale);
    const bigTime = Math.max(28, Math.round(w * 0.065)); // 6.5% width — nhỏ hơn
    const smFont = Math.max(11, Math.round(w * 0.022));  // 2.2% width — nhỏ hơn
    function drawText(text: string, x: number, y: number, size: number, color = "#ffffff", bold = false) {
      ctx.font = `${bold ? "bold " : ""}${size}px Arial, Helvetica, sans-serif`;
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillText(text, x + 1, y + 1);
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
    }
    // Nội dung ví filepath stamp cũng bottom-left, font nhỏ
    const infoLines: Array<{ text: string; size: number; bold: boolean }> = [
      { text: `Công ty: Cổ Phần Giong Việt Nam`, size: smFont, bold: false },
      { text: `Tên: ${currentName}`, size: smFont, bold: false },
      { text: addrStr || gpsStr, size: smFont, bold: false },
      { text: `${dateStr} ${weekdayStr}`, size: smFont, bold: false },
      { text: timeStr, size: bigTime, bold: true },
    ];
    // Measure total height
    let totalH = 0;
    for (const l of infoLines) totalH += l.size + Math.round(3 * scale);
    // Draw from bottom-left
    let y = h - pad;
    // Green accent line
    const greenLineTop = y - totalH - Math.round(4 * scale);
    ctx.fillStyle = "#22c55e";
    ctx.fillRect(lineX, greenLineTop, Math.round(3 * scale), totalH + Math.round(6 * scale));
    for (const l of infoLines) {
      y -= l.size;
      drawText(l.text, textX, y, l.size, "#ffffff", l.bold);
      y -= Math.round(3 * scale);
    }
    // Get stamped image as base64
    const stamped = canvas.toDataURL("image/jpeg", 0.85);
    setPhotoPreview(stamped);
    setPhotoStamped(true);
    stopCamera();
  }

  // Switch camera (front <-> back)
  function switchCamera() {
    const next = facingMode === "environment" ? "user" : "environment";
    startCamera(next);
  }

  // Retake: discard stamped photo, reopen camera (keep current facing mode)
  function retakePhoto() {
    setPhotoPreview(null);
    setPhotoStamped(false);
    startCamera();
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
    setPhotoStamped(false);
    setGpsCoords(null);
    requestLocation();
    // Start camera after a short delay to let dialog render
    setTimeout(() => startCamera(), 400);
  }

  // Reverse geocode coordinates → actual Vietnamese address (server-side)
  // 10s timeout prevents hanging on slow mobile networks
  async function resolveAddress(): Promise<string> {
    if (!gpsCoords) return "";
    const [lat, lng] = gpsCoords;
    if (lat === 0 && lng === 0) return "";
    try {
      const addr = await Promise.race([
        reverseGeocode({ data: { lat, lng } }),
        new Promise<string>((_, reject) => setTimeout(() => reject(new Error("timeout")), 10000)),
      ]);
      return addr;
    } catch { return ""; }
  }

  async function confirmPunch() {
    // Chỉ cho phép xác nhận 1 lần — mọi lần bấm tiếp theo bị bỏ qua ngay
    if (submittingRef.current) return;

    // ── Re-read FRESH state from store (not stale closure) ──
    const freshState = useAppStore.getState();
    const freshAttendance = freshState.attendance;
    const freshEmp = freshState.employees.find((e) => e.id === freshState.currentUserId) ?? null;
    const freshEmpName = freshEmp?.name ?? freshState.currentName();
    const todayRecs = freshAttendance.filter((a) =>
      (freshEmp?.id && a.employeeId === freshEmp.id) || a.name === freshEmpName,
    ).filter((a) => a.date === todayStr);
    const freshLastStatus = todayRecs.length > 0 ? todayRecs[0].status : null;
    const freshCanPunchIn = freshLastStatus !== "Điểm danh vào ca";
    const freshCanPunchOut = freshLastStatus === "Điểm danh vào ca";

    // Re-validate rules with fresh state
    if (punchType === "Điểm danh vào ca" && !freshCanPunchIn) {
      toast.warning("Hôm nay bạn đã vào ca. Vui lòng tan ca trước.");
      return;
    }
    if (punchType === "Điểm danh tan ca" && !freshCanPunchOut) {
      toast.warning("Bạn chưa vào ca hôm nay. Vui lòng vào ca trước.");
      return;
    }
    // Rule: photo is required
    if (!photoPreview) {
      toast.warning("Vui lòng chụp ảnh xác nhận trước khi điểm danh.");
      return;
    }
    // Rule: GPS location is required
    if (!gpsCoords || (gpsCoords[0] === 0 && gpsCoords[1] === 0)) {
      toast.warning("Vui lòng bật định vị GPS trên thiết bị để điểm danh.");
      return;
    }
    submittingRef.current = true;
    setIsSubmitting(true);
    try {
      // Resolve real address BEFORE saving
      const resolvedAddress = await resolveAddress();
      const finalAddress = resolvedAddress
        ? cleanAddress(resolvedAddress)
        : (address || gps);
      // Compress ảnh trước khi upload để tránh lỗi kích thước lớn trên mobile
      const compressedPhoto = await compressBase64Image(photoPreview);
      // Upload photo to Cloudinary — REQUIRED, no base64 fallback
      let photoUrl: string;
      try {
        const result = await uploadImage({
          data: { base64: compressedPhoto, folder: "giong-vn/cham-cong" },
        });
        photoUrl = result.url;
      } catch (err: any) {
        console.error("[cham-cong] Upload ảnh thất bại:", err?.message || err);
        toast.error(`Upload ảnh thất bại: ${err?.message || "không xác định"}. Vui lòng thử lại.`);
        return;
      }
      // Pass employee data directly — no more non-reactive snapshot
      const rec = clock(punchType, gps, finalAddress, photoUrl, freshEmpName, freshState.currentUserId, freshEmp?.center);
      toast.success(`${punchType} lúc ${rec.time}`, { description: rec.name });
      setIsDialogOpen(false);
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  function handleDeleteRecord() {
    if (!detailRecord) return;
    const empName = detailRecord.name;
    const ok = window.confirm(
      `Xóa lượt chấm công của ${empName} lúc ${detailRecord.time} ngày ${formatDate(detailRecord.date)}?`,
    );
    if (!ok) return;
    removeAttendance(detailRecord.id);
    setIsDetailOpen(false);
    toast.success("Đã xóa lượt chấm công", { description: empName });
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

      {/* Sync Status Dashboard — Admin only */}
      {isAdmin && syncStats.total > 0 && (
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowSyncDashboard(!showSyncDashboard)}
            className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm transition hover:bg-amber-100"
          >
            <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-medium text-amber-800">
              Đang chờ đồng bộ: {syncStats.total} bản ghi
            </span>
            {syncStats.failed > 0 && (
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                {syncStats.failed} lỗi
              </span>
            )}
            <span className="text-amber-600 text-xs">{showSyncDashboard ? "▲" : "▼"}</span>
          </button>
          {showSyncDashboard && (
            <div className="mt-2 rounded-lg border border-line bg-surface p-4">
              <div className="mb-3 flex items-center gap-4 text-sm">
                <span className="text-muted">Tổng: <strong className="text-ink">{syncStats.total}</strong></span>
                <span className="text-muted">Đang retry: <strong className="text-amber-600">{syncStats.retrying}</strong></span>
                <span className="text-muted">Lỗi &gt;5 lần: <strong className="text-red-500">{syncStats.failed}</strong></span>
              </div>
              <div className="max-h-60 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-muted uppercase">
                    <tr>
                      <th className="pb-2 pr-4">Nhân sự</th>
                      <th className="pb-2 pr-4">Loại</th>
                      <th className="pb-2 pr-4">Ngày</th>
                      <th className="pb-2 pr-4">Giờ</th>
                      <th className="pb-2">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {pendingRecords
                      .filter((r) => r.collection === "attendance")
                      .map((r) => {
                        const attempts = r.attempts ?? 0;
                        const isFailed = attempts > 5;
                        return (
                          <tr key={r.data.id} className={isFailed ? "bg-red-50/50" : ""}>
                            <td className="py-1.5 pr-4 font-medium text-ink">{r.data.name ?? "—"}</td>
                            <td className="py-1.5 pr-4 text-muted">{r.data.status ?? "—"}</td>
                            <td className="py-1.5 pr-4 text-muted">{r.data.date ?? "—"}</td>
                            <td className="py-1.5 pr-4 text-muted">{r.data.time ?? "—"}</td>
                            <td className="py-1.5">
                              {isFailed ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-medium text-red-700">
                                  <span className="size-1 rounded-full bg-red-500" />
                                  Lỗi ({attempts} lần)
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                                  <span className="size-1 rounded-full bg-amber-500 animate-pulse" />
                                  Đang retry ({attempts} lần)
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-faint">
                Bản ghi tự động retry mỗi 30 giây. Lỗi &gt;5 lần cần kiểm tra DB hoặc network.
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setSelectedCenter(null)}
          className={`flex-shrink-0 rounded-xl border px-4 py-2 text-left text-sm font-medium transition ${
            !selectedCenter
              ? "border-accent bg-accent-soft text-accent"
              : "border-line bg-surface text-muted hover:border-accent/50"
          }`}
        >
          <p>Tất cả</p>
          <p className="text-xs text-faint">
            Vào: <strong>{centerStats.reduce((sum, c) => sum + c.in, 0)}</strong> · Ra: <strong>{centerStats.reduce((sum, c) => sum + c.out, 0)}</strong>
          </p>
          <p className="text-xs text-faint">Tổng {centerStats.reduce((sum, c) => sum + c.total, 0)} lượt</p>
        </button>
        {centerStats.map((item) => {
          const isActive = selectedCenter === item.code;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => setSelectedCenter(isActive ? null : item.code)}
              className={`flex-shrink-0 rounded-xl border px-4 py-2 text-left text-sm transition ${
                isActive
                  ? "border-accent bg-accent-soft"
                  : "border-line bg-surface hover:border-accent/50"
              }`}
            >
              <p className={`font-medium ${isActive ? "text-accent" : "text-ink"}`}>
                {CENTERS.find((c) => c.code === item.code)?.short ?? item.code}
              </p>
              <p className="text-xs text-muted">
                Vào: <strong>{item.in}</strong> · Ra: <strong>{item.out}</strong>
              </p>
              <p className="text-xs text-faint">Tổng {item.total} lượt</p>
            </button>
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
                      <tr key={a.id} className="cursor-pointer transition hover:bg-surface-2/50" onClick={() => { setDetailRecord(a); setIsDetailOpen(true); }}>
                        <td className="px-4 py-3">
                          <div className="font-medium text-ink">{a.name}</div>
                          {related ? <div className="text-xs text-faint">{related.title}</div> : null}
                        </td>
                        <td className="px-4 py-3 text-muted">{short}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <StatusBadge value={a.status} />
                            {a.synced === false && (
                              <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                <span className="size-1 rounded-full bg-amber-500" />
                                Đang chờ
                              </span>
                            )}
                          </div>
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
                      <div className="flex items-center gap-1.5">
                        <StatusBadge value={a.status} />
                        {a.synced === false && (() => {
                          const pending = pendingRecords.find((r) => r.data.id === a.id);
                          const attempts = pending?.attempts ?? 0;
                          const isFailed = attempts > 5;
                          return isFailed ? (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-red-100 px-1.5 py-0.5 text-[10px] font-medium text-red-700" title={`Đồng bộ thất bại ${attempts} lần`}>
                              <span className="size-1 rounded-full bg-red-500" />
                              Lỗi sync
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700" title="Chưa đồng bộ lên server">
                              <span className="size-1 rounded-full bg-amber-500" />
                              Đang chờ
                            </span>
                          );
                        })()}
                      </div>
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
          <DialogDesc>Ghi nhận chấm công. <span className="font-medium text-danger">Yêu cầu:</span> chụp ảnh + bật định vị GPS.</DialogDesc>

          <div className="mt-5 space-y-4">
            {/* Camera / Preview area */}
            <div className="relative overflow-hidden rounded-2xl border border-line bg-black">
              {!photoPreview ? (
                <>
                  {/* Live camera view */}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full rounded-2xl"
                    style={{ maxHeight: 400, objectFit: "cover" }}
                  />
                  {/* Overlay canvas draws on top of video */}
                  <canvas
                    ref={overlayCanvasRef}
                    className="absolute inset-0 w-full h-full rounded-2xl pointer-events-none"
                    style={{ maxHeight: 400, objectFit: "cover", zIndex: 10 }}
                  />
                  {/* Capture button + camera switch */}
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
                  {/* Camera status */}
                  {!cameraActive && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white">
                      <Loader2 className="mb-3 size-8 animate-spin" />
                      <span className="text-sm">Đang mở camera...</span>
                    </div>
                  )}
                </>
              ) : (
                /* Stamped photo preview */
                <div className="relative">
                  <img src={photoPreview} alt="Ảnh đã đóng dấu" className="w-full rounded-2xl" style={{ maxHeight: 400, objectFit: "cover" }} />
                  {/* Retake button */}
                  <button
                    type="button"
                    onClick={retakePhoto}
                    className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-sm hover:bg-black/80"
                  >
                    <RotateCcw className="size-3.5" />
                    Chụp lại
                  </button>
                </div>
              )}
              {/* Hidden capture canvas (offscreen) */}
              <canvas ref={captureCanvasRef} className="hidden" />
            </div>

            {/* Info panels */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-surface-2 p-3">
                <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Tên nhân sự</p>
                <p className="mt-1 text-base font-semibold text-ink">{currentName}</p>
              </div>
              <div className="rounded-xl border border-line bg-surface-2 p-3">
                <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Thời gian</p>
                <p className="mt-1 text-base font-semibold text-ink">{formatPunchTime()} — {formatPunchWeekday()}</p>
                <p className="text-xs text-faint">{formatPunchDate()}</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-surface-2 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Định vị GPS</p>
                  <span className="flex items-center gap-1 text-xs text-muted"><MapPin className="size-3" />{locationStatus}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-ink">{gps}</p>
              </div>
              <div className="rounded-xl border border-line bg-surface-2 p-3">
                <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Địa chỉ</p>
                <p className="mt-1 text-sm leading-5 text-ink">{address}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <Button variant="outline" onClick={() => { setIsDialogOpen(false); stopCamera(); }} disabled={isSubmitting}>
              Hủy
            </Button>
            <Button onClick={confirmPunch} disabled={isSubmitting || !photoPreview}>
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <LogIn className="size-4" />
                  Xác nhận {punchType === "Điểm danh vào ca" ? "vào ca" : "tan ca"}
                </>
              )}
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

          <div className="mt-5 flex items-center justify-between gap-3">
            {canDeleteRecord ? (
              <Button variant="danger" onClick={handleDeleteRecord}>
                <Trash2 className="size-4" />
                Xóa lượt chấm
              </Button>
            ) : (
              <span />
            )}
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Đóng</Button>
          </div>
        </DialogContent>
      </Dialog>

      </div>
    </ClientOnly>
  );
}

/**
 * Nén ảnh base64 sang JPEG — giảm kích thước để tránh lỗi upload trên mobile.
 * Target: ≤ 800KB, resize về max 1024px nếu ảnh gốc quá lớn.
 */
export async function compressBase64Image(base64: string, maxSizeKB = 800): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX_DIM = 1024;
      let { width, height } = img;
      if (width > MAX_DIM || height > MAX_DIM) {
        const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
        width *= ratio;
        height *= ratio;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);
      let result = canvas.toDataURL("image/jpeg", 0.8);
      // Kiểm tra kích thước, giảm quality nếu vẫn quá lớn
      const sizeKB = (result.length * 0.75) / 1024;
      if (sizeKB > maxSizeKB) {
        const quality = Math.max(0.5, maxSizeKB / sizeKB);
        result = canvas.toDataURL("image/jpeg", quality);
      }
      resolve(result);
    };
    img.onerror = () => {
      // Nếu không load được, trả về base64 gốc
      resolve(base64);
    };
    img.src = base64;
  });
}

