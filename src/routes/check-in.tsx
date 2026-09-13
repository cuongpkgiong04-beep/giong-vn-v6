import { createFileRoute } from "@tanstack/react-router";
import { Camera, Eye, Loader2, LogIn, LogOut, MapPin, RotateCcw, TimerReset, Trash2, X } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { CENTERS, findEmployeeByLooseText, getVisibleCenterCodes, isAdminRole } from "@/lib/catalog";
import { hasPermission } from "@/lib/permissions";
import { formatDate } from "@/lib/format";
import { useAppStore, getPendingSyncRecords } from "@/lib/store";
import { reverseGeocode } from "@/routes/api/data";
import { uploadImage } from "@/routes/api/upload";

/** Clean address: remove postal codes (e.g. "11810") but keep house numbers. */
function cleanAddress(addr: string): string {
  if (!addr) return addr;
  let cleaned = addr.replace(/,?\s*\d{4,6}\s*(?=,|$)/g, "");
  cleaned = cleaned.replace(/,\s*,/g, ",").replace(/^\s*,|,\s*$/g, "");
  return cleaned.trim();
}

/** Detect iOS — same as cham-cong. */
function detectIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  const isIPhoneIPad = /iPad|iPhone|iPod/.test(ua);
  const isModernIOS = ua.includes("Macintosh") && (navigator as any).maxTouchPoints > 1;
  return isIPhoneIPad || isModernIOS;
}

export const Route = createFileRoute("/check-in")({ component: CheckInPage });

function CheckInPage() {
  const checkins = useAppStore((s) => s.checkins);
  const currentUserId = useAppStore((s) => s.currentUserId);
  const removeCheckin = useAppStore((s) => s.removeCheckin);
  const addCheckin = useAppStore((s) => s.addCheckin);
  const currentEmployee = useAppStore((s) => s.employees.find((e) => e.id === s.currentUserId) ?? null);
  const currentName = useAppStore((s) => s.currentName());
  const [q, setQ] = useState("");
  const [center, setCenter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [note, setNote] = useState("");
  const [gps, setGps] = useState("Đang lấy vị trí...");
  const [address, setAddress] = useState("Đang xác định vị trí...");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [gpsCoords, setGpsCoords] = useState<[number, number] | null>(null);
  const [locationStatus, setLocationStatus] = useState("Đang xác định vị trí...");
  const [detailRecord, setDetailRecord] = useState<typeof checkins[number] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  // Lightbox xem ảnh check-in toàn màn hình (click ảnh trong dialog chi tiết để mở)
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);

  /* GĐ 80: Radix Dialog modal khóa pointer-events NGOÀI portal → lightbox render ngoài
     portal bị nuốt click (X/nền không bấm được). Fix: đóng dialog khi mở lightbox,
     mở lại khi đóng lightbox — đồng bộ với Báo cáo Check-in. */
  function closeLightbox() {
    setLightboxPhoto(null);
    if (detailRecord) setIsDetailOpen(true); // mở lại dialog chi tiết như cũ
  }
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const submittingRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [pendingRecords, setPendingRecords] = useState<Array<{ collection: string; data: any; attempts?: number }>>([]);
  const [showSyncDashboard, setShowSyncDashboard] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const captureCanvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  // GĐ 102: quay video có đóng dấu — MediaRecorder ghi từ canvas composite
  // (video frame + overlay stamp vẽ 15fps) thay vì ghi thẳng stream camera.
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  // GĐ 105: stream micro riêng cho âm thanh video (thiếu mic → vẫn quay không tiếng)
  const micStreamRef = useRef<MediaStream | null>(null);
  const recordChunksRef = useRef<Blob[]>([]);
  const recordCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const recordRafRef = useRef<number | null>(null);
  const recordTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [videoPreview, setVideoPreview] = useState<{ url: string; base64: string } | null>(null);
  const MAX_RECORD_SECONDS = 30;
  const [photoStamped, setPhotoStamped] = useState(false);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("user");
  // GĐ 81: ref đồng bộ facingMode — startCamera đọc ref thay cho state để khỏi stale closure
  const facingModeRef = useRef<"user" | "environment">("user");
  if (facingModeRef.current !== facingMode) facingModeRef.current = facingMode;
  const [isIOS] = useState(detectIOS);

  // Desktop (lg+): đo chiều cao khối ghim (tiêu đề + bộ lọc) để thead bảng sticky ngay bên dưới
  const stickyHeaderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = stickyHeaderRef.current;
    if (!el) return;
    const update = () => {
      const h = `${Math.ceil(el.getBoundingClientRect().height)}px`;
      el.style.setProperty("--ci-sticky-h", h);
      // Đặt trên cha chung để thead (nằm ngoài khối ghim) cũng đọc được var
      el.parentElement?.style.setProperty("--ci-sticky-h", h);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const refresh = () => setPendingRecords(getPendingSyncRecords());
    refresh();
    const interval = setInterval(refresh, 10_000);
    return () => clearInterval(interval);
  }, []);

  const syncStats = useMemo(() => {
    const pending = pendingRecords.filter((r) => r.collection === "checkins");
    const total = pending.length;
    const failed = pending.filter((r) => (r.attempts ?? 0) > 5).length;
    const retrying = total - failed;
    return { total, failed, retrying };
  }, [pendingRecords]);

  const todayStr = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const todayRecords = useMemo(() => {
    // Fix TS2339 (2026-09-10): CheckIn không có employeeId — lọc theo TÊN (bản ghi check-in lưu name)
    return checkins.filter((a) =>
      a.name === (currentEmployee?.name ?? currentName),
    ).filter((a) => a.date === todayStr);
  }, [checkins, currentEmployee, currentName, todayStr]);

  const lastStatus = todayRecords.length > 0 ? todayRecords[0].status : null;
  const canPunchIn = lastStatus !== "Check-in vào ca";
  const canPunchOut = lastStatus === "Check-in vào ca";

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

  const canViewAll = hasPermission(currentEmployee, "checkin:view_all");
  const isAdmin = isAdminRole(currentEmployee?.role);
  const canDeleteRecord = detailRecord ? canViewAll : false;
  const visibleCheckins = useMemo(() => {
    return checkins.filter((record) => {
      if (canViewAll) return true;
      const empName = currentEmployee?.name ?? currentName;
      return record.name === empName;
    });
  }, [checkins, currentEmployee, currentName, canViewAll]);

  const rows = useMemo(() => {
    return visibleCheckins.filter((a) => {
      const related = findEmployeeByLooseText(a.name);
      // Fix TS2339 (2026-09-10): CheckIn không có workplace — lấy trung tâm qua employee khớp TÊN
      const workplace = related?.center ?? currentEmployee?.center ?? "VP";
      if (center !== "all" && workplace !== center) return false;
      if (dateFrom && a.date < dateFrom) return false;
      if (dateTo && a.date > dateTo) return false;
      if (q.trim()) {
        const s = q.toLowerCase();
        const searchText = [a.name, a.address, related?.username ?? "", related?.dept ?? "", related?.center ?? ""]
          .join(" ")
          .toLowerCase();
        return searchText.includes(s);
      }
      return true;
    });
  }, [center, currentEmployee, q, visibleCheckins, dateFrom, dateTo]);

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

  function wrapStampText(text: string, charsPerLine: number) {
    const trimmed = text.trim();
    if (!trimmed) return [];
    const words = trimmed.split(/\s+/);
    const lines: string[] = [];
    let cur = "";
    for (const word of words) {
      if ((cur + " " + word).length <= charsPerLine) {
        cur = cur ? cur + " " + word : word;
      } else {
        if (cur) lines.push(cur);
        cur = word;
      }
    }
    if (cur) lines.push(cur);
    return lines.length > 0 ? lines : [text];
  }

  /**
   * GĐ 102: detect hướng cầm máy cho stamp ngang.
   * Ưu tiên screen.orientation (angle 90/270 = ngang); fallback so innerWidth/innerHeight
   * (file://, trình duyệt thiếu API). Trả về hướng NGANG của KHUNG Ảnh/video (canvas),
   * KHÔNG phải hướng thiết bị — canvas ngang (w > h) mới cần stamp xoay.
   */
  function detectLandscape(): boolean {
    try {
      const so = screen as Screen & { orientation?: { type?: string; angle?: number } };
      const t = so?.orientation?.type ?? "";
      if (t.includes("landscape")) return true;
      if (t.includes("portrait")) return false;
    } catch { /* ignore */ }
    return typeof window !== "undefined" && window.innerWidth > window.innerHeight;
  }

  function buildStampLayout(w: number, h: number, currentName: string, address: string, gps: string) {
    const scale = Math.max(1, w / 640);
    const maxStampWidth = Math.min(Math.round(w * 0.50), 480);
    const bigTimeMaxWidth = Math.max(36, Math.min(Math.round(w * 0.09), 64));
    const smFontMaxWidth = Math.max(16, Math.min(Math.round(w * 0.04), 32));
    const groupGap = Math.round(18 * scale);

    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
    const dateStr = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;
    const weekdayStr = now.toLocaleDateString("vi-VN", { weekday: "long" });

    const companyText = `Công ty: Cổ Phần Giong Việt Nam`;
    const nameText = `Tên: ${currentName}`;
    const addrRaw = address.length > 0 ? address : gps;
    const dateText = `${weekdayStr}, ${dateStr}`;

    const charsPerLine = Math.max(16, Math.min(70, Math.round(maxStampWidth / (smFontMaxWidth * 0.52))));
    const addrLines = wrapStampText(addrRaw, charsPerLine);

    const groups: { text: string; size: number; bold: boolean; color: string }[][] = [
      [
        { text: companyText, size: smFontMaxWidth, bold: false, color: "#ffffff" },
        { text: nameText, size: smFontMaxWidth, bold: true, color: "#ffffff" },
      ],
      addrLines.map(t => ({ text: t, size: smFontMaxWidth, bold: false, color: "#ffffff" })).reverse(),
      [
        { text: dateText, size: smFontMaxWidth, bold: false, color: "#ffffff" },
        { text: timeStr, size: bigTimeMaxWidth, bold: true, color: "#ffffff" },
      ],
    ];
    // GĐ 102: khung NGANG (w > h — camera ngang/máy quay ngang) → stamp xoay dọc
    // theo cạnh NGẮN (bên phải khung) — đọc được khi người xem NGHIÊNG đầu sang phải,
    // đúng như yêu cầu "quay ngang thì dấu cũng sang ngang" (dấu theo trục máy).
    const landscape = detectLandscape() || w > h;
    return { w, h, scale, groups, groupGap, maxStampWidth, landscape };
  }

  const drawOverlay = useCallback(() => {
    const video = videoRef.current;
    const canvas = overlayCanvasRef.current;
    if (!video || !canvas || video.paused || video.ended) return;

    const w = video.videoWidth && video.videoWidth > 100 ? video.videoWidth : (video.clientWidth || 640);
    const h = video.videoHeight && video.videoHeight > 100 ? video.videoHeight : (video.clientHeight || 480);
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const layout = buildStampLayout(w, h, currentName, address, gps);
    drawStampBlock(ctx, layout);

    requestAnimationFrame(drawOverlay);
  }, [currentName, gps, address]);

  /** GĐ 102: vẽ khối stamp từ layout — landscape thì xoay 90° theo cạnh phải (đọc khi nghiêng đầu sang phải, cùng trục máy ngang); portrait giữ nguyên góc trái-dưới như cũ. */
  function drawStampBlock(ctx: CanvasRenderingContext2D, layout: ReturnType<typeof buildStampLayout>) {
    const { w, h, scale, groups, groupGap, landscape } = layout;
    ctx.textAlign = "left";
    const lineGap = Math.round(10 * scale);

    let totalH = 0;
    let maxW = 0;
    for (let gi = 0; gi < groups.length; gi++) {
      for (const l of groups[gi]) {
        ctx.font = `${l.bold ? "bold " : ""}${l.size}px Arial, Helvetica, sans-serif`;
        totalH += l.size + lineGap;
        maxW = Math.max(maxW, ctx.measureText(l.text).width);
      }
      if (gi < groups.length - 1) totalH += groupGap;
    }

    const margin = Math.round(14 * scale);
    ctx.save();
    if (landscape) {
      // Xoay 90° clockwise, neo cạnh PHẢI khung, chạy từ trên xuống — chữ dọc theo
      // trục ngang của máy: người xem nghiêng đầu phải là đọc bình thường.
      ctx.translate(w - margin, margin);
      ctx.rotate(Math.PI / 2);
      // Sau rotate: trục x = hướng xuống cạnh phải, trục y = sang trái khung.
      const lineX = 0;
      const textX = lineX + Math.round(7 * scale);
      const lineWidth = Math.round(3 * scale);
      ctx.fillStyle = "#22c55e";
      ctx.fillRect(lineX, -lineWidth, totalH + Math.round(6 * scale), lineWidth);
      let y = 0;
      for (let gi = 0; gi < groups.length; gi++) {
        for (const l of groups[gi]) {
          y += l.size;
          ctx.font = `${l.bold ? "bold " : ""}${l.size}px Arial, Helvetica, sans-serif`;
          ctx.fillStyle = "rgba(0,0,0,0.7)";
          ctx.fillText(l.text, textX + 1, y + 1);
          ctx.fillStyle = l.color;
          ctx.fillText(l.text, textX, y);
          y += lineGap;
        }
        if (gi < groups.length - 1) y += groupGap;
      }
    } else {
      // Portrait — nguyên bản: khối trái-dưới, dòng chạy từ dưới lên
      const boxBottom = h - margin;
      const boxLeft = margin;
      let y = boxBottom;
      const lineX = boxLeft;
      const textX = lineX + Math.round(7 * scale);
      const lineWidth = Math.round(3 * scale);
      const lineTop = y - totalH - Math.round(4 * scale);
      const lineHeight = totalH + Math.round(6 * scale);
      ctx.fillStyle = "#22c55e";
      ctx.fillRect(lineX, lineTop, lineWidth, lineHeight);
      for (let gi = 0; gi < groups.length; gi++) {
        for (const l of groups[gi]) {
          y -= l.size;
          ctx.font = `${l.bold ? "bold " : ""}${l.size}px Arial, Helvetica, sans-serif`;
          ctx.fillStyle = "rgba(0,0,0,0.7)";
          ctx.fillText(l.text, textX + 1, y + 1);
          ctx.fillStyle = l.color;
          ctx.fillText(l.text, textX, y);
          y -= lineGap;
        }
        if (gi < groups.length - 1) y -= groupGap;
      }
    }
    ctx.restore();
    void maxW;
  }

  useEffect(() => {
    if (cameraActive && videoRef.current && !photoPreview) {
      const timer = setTimeout(() => {
        if (videoRef.current && !videoRef.current.paused) {
          requestAnimationFrame(drawOverlay);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [cameraActive, drawOverlay, photoPreview]);

  function capturePhoto() {
    setIsCapturing(true);
    const video = videoRef.current;
    const canvas = captureCanvasRef.current;
    if (!video || !canvas) {
      setIsCapturing(false);
      return;
    }

    const w = video.videoWidth && video.videoHeight > 100 ? video.videoWidth : (video.clientWidth || 640);
    const h = video.videoHeight && video.videoHeight > 100 ? video.videoHeight : (video.clientHeight || 480);
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setIsCapturing(false);
      return;
    }

    // Vẽ video frame lên captureCanvas (cần cho static photo output)
    ctx.drawImage(video, 0, 0, w, h);

    const timeStr = formatPunchTime();
    const dateStr = formatPunchDate();
    const weekdayStr = formatPunchWeekday();
    const freshGps = gps;
    const freshAddr = address;

    const layout = buildStampLayout(w, h, currentName, freshAddr, freshGps);
    // GĐ 102: dùng chung drawStampBlock — landscape xoay 90° như overlay live
    drawStampBlock(ctx, layout);

    const stamped = canvas.toDataURL("image/jpeg", 0.92);
    setPhotoPreview(stamped);
    setPhotoStamped(true);
    setIsCapturing(false);
  }

  function retakePhoto() {
    setPhotoPreview(null);
    setPhotoStamped(false);
    setTimeout(() => startCamera(), 50);
  }

  // ── GĐ 102: quay video có đóng dấu ────────────────────────────────────────
  /** Vẽ 1 frame video + stamp lên canvas quay (15fps đủ cho chữ dấu, file nhẹ). */
  function drawRecordFrame(rec: HTMLCanvasElement, vid: HTMLVideoElement) {
    const w = vid.videoWidth > 100 ? vid.videoWidth : 640;
    const h = vid.videoHeight > 100 ? vid.videoHeight : 480;
    if (rec.width !== w || rec.height !== h) {
      rec.width = w;
      rec.height = h;
    }
    const ctx = rec.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(vid, 0, 0, w, h);
    // Overlay canvas đang có stamp mới nhất (drawOverlay loop vẽ liên tục) —
    // composite thẳng overlay lên frame là chữ dấu khớp 100% với preview.
    const overlay = overlayCanvasRef.current;
    if (overlay && overlay.width === w && overlay.height === h) {
      ctx.drawImage(overlay, 0, 0);
    } else {
      drawStampBlock(ctx, buildStampLayout(w, h, currentName, address, gps));
    }
  }

  async function startRecording() {
    const video = videoRef.current;
    if (!video || !cameraActive || isRecording) return;
    if (typeof MediaRecorder === "undefined") {
      toast.error("Thiết bị không hỗ trợ quay video");
      return;
    }
    const rec = recordCanvasRef.current ?? document.createElement("canvas");
    recordCanvasRef.current = rec;
    drawRecordFrame(rec, video);

    // GĐ 105: xin micro RIÊNG lúc bấm quay — fail (không mic/chặn quyền) thì vẫn quay
    // video không tiếng, không làm vỡ flow check-in. Camera chính giữ video-only
    // nên mở camera không bị lỗi vì thiết bị thiếu micro.
    let hasAudio = false;
    try {
      const mic = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = mic;
      hasAudio = true;
    } catch {
      console.warn("[check-in] micro không khả dụng — quay video không tiếng");
    }

    const canvasStream = rec.captureStream(15);
    const stream = new MediaStream([
      ...canvasStream.getVideoTracks(),
      ...(micStreamRef.current?.getAudioTracks() ?? []),
    ]);
    const mimeCandidates = ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm", "video/mp4"];
    const mimeType = mimeCandidates.find((m) => MediaRecorder.isTypeSupported(m)) ?? "";
    const recorder = new MediaRecorder(stream, mimeType ? { mimeType, videoBitsPerSecond: 1_500_000 } : undefined);
    recordChunksRef.current = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordChunksRef.current.push(e.data);
    };
    recorder.onstop = () => {
      // GĐ 105: dừng micro ngay khi recorder dừng — không giữ mic bị chiếm sau khi quay
      micStreamRef.current?.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
      const blob = new Blob(recordChunksRef.current, { type: mimeType || "video/webm" });
      const url = URL.createObjectURL(blob);
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview({ url, base64: String(reader.result) });
        toast.success(`Đã quay ${recordSeconds}s${hasAudio ? " (có âm thanh)" : " (không tiếng — không lấy được micro)"} — bấm Xác nhận để gửi`);
      };
      reader.readAsDataURL(blob);
    };
    mediaRecorderRef.current = recorder;
    recorder.start(500);
    setIsRecording(true);
    setRecordSeconds(0);
    // Loop vẽ frame có dấu lên canvas quay
    const loop = () => {
      const vid = videoRef.current;
      if (vid && mediaRecorderRef.current === recorder) drawRecordFrame(rec, vid);
      recordRafRef.current = requestAnimationFrame(loop);
    };
    recordRafRef.current = requestAnimationFrame(loop);
    // Đếm giây hiển thị + tự dừng ở MAX
    const tick = setInterval(() => {
      setRecordSeconds((s) => {
        const next = s + 1;
        if (next >= MAX_RECORD_SECONDS) stopRecording();
        return next;
      });
    }, 1000);
    recordTimerRef.current = tick as unknown as ReturnType<typeof setTimeout>;
  }

  function stopRecording() {
    const recorder = mediaRecorderRef.current;
    if (recordTimerRef.current) {
      clearInterval(recordTimerRef.current);
      recordTimerRef.current = null;
    }
    if (recordRafRef.current) {
      cancelAnimationFrame(recordRafRef.current);
      recordRafRef.current = null;
    }
    if (recorder && recorder.state !== "inactive") recorder.stop();
    mediaRecorderRef.current = null;
    // GĐ 105: bảo đảm micro được nhả cả khi dừng từ ngoài onstop (đóng dialog,
    // tự dừng 30s...) — onstop cũng dừng, ở đây là lưới an toàn kép.
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    setIsRecording(false);
  }

  function retakeVideo() {
    stopRecording();
    setVideoPreview(null);
    setTimeout(() => startCamera(), 50);
  }

  async function switchCamera() {
    const next = facingMode === "environment" ? "user" as const : "environment" as const;
    setFacingMode(next);
    stopCamera();
    await new Promise((r) => setTimeout(r, 150));
    // GĐ 81 fix: truyền mode TRỰC TIẾP — trước đây gọi startCamera() không đối số,
    // hàm dùng closure cũ (facingMode chưa update) → lần bấm 1 vẫn mở camera cũ,
    // phải bấm lần 2 (sau khi re-render) mới mở camera sau.
    startCamera(next);
  }

  async function startCamera(modeOverride?: "user" | "environment") {
    const video = videoRef.current;
    if (!video) return;
    // Dùng đối số truyền trực tiếp nếu có — tránh stale closure khi đổi camera
    const facing = modeOverride ?? facingModeRef.current;
    stopCamera();
    const streamPromise = navigator.mediaDevices.getUserMedia({
      video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false,
    });
    streamPromise.then((stream) => {
      streamRef.current = stream;
      video.srcObject = stream;
      video.play().catch(() => {});
      setCameraActive(true);
    }).catch((err) => {
      console.warn("[check-in] camera open failed", err?.message || err);
      setCameraActive(false);
    });
  }

  function stopCamera() {
    const stream = streamRef.current;
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    const video = videoRef.current;
    if (video) video.srcObject = null;
    setCameraActive(false);
  }

  function requestLocation() {
    if (!navigator.geolocation) {
      setGps("GPS không hỗ trợ trên thiết bị này");
      setAddress("Không thể xác định địa điểm.");
      setLocationStatus("GPS không hỗ trợ");
      return;
    }
    setLocationStatus("Đang xác định vị trí...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        const coordinateText = `${lat}, ${lng}`;
        setGps(coordinateText);
        setGpsCoords([pos.coords.latitude, pos.coords.longitude]);
        setAddress(coordinateText); // tạm thời, resolve ngay bên dưới
        setLocationStatus("Vị trí đã xác định");
        // Resolve địa chỉ ngay khi có GPS để overlay hiển thị tên đường
        // Fix TS2322 (2026-09-10): validator yêu cầu number — lat/lng từ toFixed là string
        reverseGeocode({ data: { lat: Number(lat), lng: Number(lng) } })
          .then((addr) => { if (addr) setAddress(addr); })
          .catch(() => {}); // giữ coordinateText nếu fail
      },
      () => {
        setGps("Không thể lấy vị trí");
        setLocationStatus("Lỗi định vị");
      },
      { enableHighAccuracy: true, timeout: 15_000, maximumAge: 0 },
    );
  }

  function handleOpenDialog() {
    setIsDialogOpen(true);
    setGps("Đang lấy vị trí...");
    setAddress("Đang xác định vị trí...");
    setLocationStatus("Đang xác định vị trí...");
    setPhotoPreview(null);
    setPhotoStamped(false);
    if (videoPreview) URL.revokeObjectURL(videoPreview.url);
    setVideoPreview(null);
    setGpsCoords(null);
    // Request location trong nền — không chờ (tránh chặn mở dialog)
    requestLocation();
    // Start camera sau khi dialog mở
    setTimeout(() => startCamera().catch(() => {}), 300);
  }

  async function confirmCheckin() {
    if (submittingRef.current || isSubmitting || !gpsCoords || !photoPreview) return;
    submittingRef.current = true;
    setIsSubmitting(true);
    try {
      const gpsStr = gpsCoords[0] + "," + gpsCoords[1];
      // GĐ 103 fix tràn Neon: upload Cloudinary là BẮT BUỘC — fail thì DỪNG với toast
      // rõ ràng, giữ ảnh/video trong dialog cho user bấm lại (không còn lưu base64
// 50-100KB vào Neon như trước — đã thấy 1 ảnh lọt vào DB).
      let photoUrl = "";
      try {
        const result = await uploadImage({ data: { base64: photoPreview, folder: "giong-vn/check-in" } });
        photoUrl = result.url;
      } catch (err: any) {
        console.warn("[check-in] Upload ảnh thất bại:", err?.message);
        toast.error("Upload ảnh thất bại — kiểm tra mạng rồi bấm Xác nhận lại. Dữ liệu chưa gửi đi.");
        setIsSubmitting(false);
        submittingRef.current = false;
        return;
      }
      // GĐ 102: upload video (nếu có) — resource_type video tự detect từ base64 header
      let videoUrl = "";
      if (videoPreview?.base64) {
        try {
          const result = await uploadImage({ data: { base64: videoPreview.base64, folder: "giong-vn/check-in" } });
          videoUrl = result.url;
        } catch (err: any) {
          console.warn("[check-in] Upload video thất bại — gửi không video:", err?.message);
          toast.warning("Video chưa gửi được — check-in vẫn lưu với ảnh");
        }
      }
      addCheckin(gpsStr, address, note || "", photoUrl, currentEmployee?.center ?? "VP", videoUrl);
      toast.success("Check-in thành công");
      setIsDialogOpen(false);
      setPhotoPreview(null);
      if (videoPreview) URL.revokeObjectURL(videoPreview.url);
      setVideoPreview(null);
      setNote("");
      stopCamera();
    } catch (err: any) {
      toast.error("Lỗi check-in: " + (err?.message || err));
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  async function confirmPunch() {
    if (submittingRef.current || isSubmitting || !gpsCoords || !photoPreview) return;
    submittingRef.current = true;
    setIsSubmitting(true);
    try {
      const gpsStr = gpsCoords[0] + "," + gpsCoords[1];
      // GĐ 103 fix tràn Neon: upload bắt buộc — fail thì dừng, KHÔNG lưu base64 vào DB
      let photoUrl = "";
      try {
        const result = await uploadImage({ data: { base64: photoPreview, folder: "giong-vn/check-in" } });
        photoUrl = result.url;
      } catch (err: any) {
        console.warn("[check-in] Upload ảnh thất bại:", err?.message);
        toast.error("Upload ảnh thất bại — kiểm tra mạng rồi bấm Xác nhận lại. Dữ liệu chưa gửi đi.");
        setIsSubmitting(false);
        submittingRef.current = false;
        return;
      }
      // GĐ 102: upload video (nếu có)
      let videoUrl = "";
      if (videoPreview?.base64) {
        try {
          const result = await uploadImage({ data: { base64: videoPreview.base64, folder: "giong-vn/check-in" } });
          videoUrl = result.url;
        } catch (err: any) {
          console.warn("[check-in] Upload video thất bại:", err?.message);
        }
      }
      addCheckin(gpsStr, address, "", photoUrl, currentEmployee?.center ?? "VP", videoUrl);
      toast.success("Điểm danh tan ca thành công");
      setIsDialogOpen(false);
      setPhotoPreview(null);
      if (videoPreview) URL.revokeObjectURL(videoPreview.url);
      setVideoPreview(null);
      stopCamera();
    } catch (err: any) {
      toast.error("Lỗi: " + (err?.message || err));
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-w-0 space-y-5">
      {/* Desktop (lg+): ghim tiêu đề Check-in + bộ lọc khi cuộn bảng. Mobile: cuộn bình thường. */}
      <div ref={stickyHeaderRef} className="lg:sticky lg:top-16 lg:z-10 lg:bg-bg lg:pt-2 lg:pb-3">
      <PageHeader title="Check-in" actions={
        <Button onClick={handleOpenDialog} disabled={isSubmitting || isCapturing || checkins.length > 0 && lastStatus === "Check-in vào ca"}>
          + Thêm Check-in
        </Button>
      } />

      <Card className="p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <select
            value={center}
            onChange={(e) => setCenter(e.target.value)}
            className="h-11 rounded-md bg-surface px-3 text-sm shadow-[var(--shadow-card)] sm:w-56"
          >
            <option value="all">Tất cả trung tâm</option>
            {CENTERS.map(c => (
              <option key={c.code} value={c.code}>{c.short} ({c.code})</option>
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
        </div>
      </Card>
      </div>

      <Card className="overflow-hidden p-0 lg:overflow-visible">
        <div className="overflow-x-auto lg:overflow-x-visible">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-surface-2 text-left text-xs uppercase tracking-wider text-muted lg:sticky lg:top-[calc(4rem+var(--ci-sticky-h,160px))] lg:z-[5]">
            <tr>
              <th className="px-4 py-3">STT</th>
              <th className="px-4 py-3">Nhân sự</th>
              <th className="px-4 py-3">Trung tâm</th>
              <th className="px-4 py-3">Ngày</th>
              <th className="px-4 py-3">Giờ</th>
              <th className="px-4 py-3">Địa điểm</th>
              <th className="px-4 py-3">Ảnh</th>
              <th className="px-4 py-3">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a, idx) => {
              const related = findEmployeeByLooseText(a.name);
              // Fix TS2339 (2026-09-10): CheckIn không có workplace — dùng center của employee khớp tên
              const workplace = related?.center ?? currentEmployee?.center ?? "VP";
              return (
                <tr
                  key={a.id}
                  className="cursor-pointer border-t border-line transition hover:bg-surface-2/50"
                  onClick={() => {
                    setDetailRecord(a);
                    setIsDetailOpen(true);
                  }}
                >
                  <td className="px-4 py-3 tabular">{idx + 1}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink">{a.name}</p>
                    {related?.title && <p className="text-xs text-muted">{related.title}</p>}
                  </td>
                  <td className="px-4 py-3 text-muted">{CENTERS.find((c) => c.code === workplace)?.short ?? workplace}</td>
                  <td className="px-4 py-3">
                    {formatDate(a.date)}
                    <br />
                    <span className="text-xs text-muted">{a.weekday ?? ""}</span>
                  </td>
                  <td className="px-4 py-3 tabular">{a.time}</td>
                  <td className="max-w-[200px] truncate px-4 py-3 text-muted">{cleanAddress(a.address || a.gps || "—")}</td>
                  <td className="px-4 py-3">
                    {a.photo ? (
                      <img src={a.photo} alt="ảnh checkin" className="size-8 rounded-md object-cover" />
                    ) : (
                      <span className="text-xs text-faint">—</span>
                    )}
                  </td>
                  <td className="max-w-[150px] truncate px-4 py-3 text-muted">{a.note || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length === 0 ? (
          <div className="p-4">
            <EmptyState title="Không có check-in nào" desc="Thử đổi bộ lọc hoặc thêm check-in mới." />
          </div>
        ) : (
          <p className="px-3 py-2 text-xs text-faint">Hiển thị {Math.min(80, rows.length)} / {rows.length} bản ghi</p>
        )}
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogTitle>Thêm Check-in</DialogTitle>
          <DialogDesc>Ghi nhận check-in. Yêu cầu: chụp ảnh + bật định vị GPS.</DialogDesc>

          <div className="mt-5 space-y-4">
            {/* Camera / Preview area (cả 2 platform dùng maxWidth:400 + contain cho Android, contain cho iOS) */}
            <div className="relative overflow-hidden rounded-2xl border border-line bg-black">
              {!photoPreview && !videoPreview ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full rounded-2xl"
                    style={isIOS
                      ? { maxHeight: 540, objectFit: "contain" }
                      : { maxHeight: 400, objectFit: "cover", maxWidth: 400, margin: "0 auto" }}
                  />                  <canvas
                    ref={overlayCanvasRef}
                    className="absolute inset-0 w-full h-full rounded-2xl pointer-events-none"
                    style={isIOS
                      ? { zIndex: 10, maxHeight: 540 }
                      : { maxHeight: 400, width: 400, marginLeft: "auto", marginRight: "auto", zIndex: 10 }}
                  />

                  <div className="absolute top-4 left-0 right-0 flex items-center justify-center gap-3" style={{ zIndex: 20 }}>
                    <button
                      type="button"
                      onClick={switchCamera}
                      className="size-10 rounded-full border-2 border-white/70 bg-black/40 backdrop-blur-sm flex items-center justify-center transition hover:bg-black/60"
                      title="Camera trước / Camera sau"
                    >
                      <Camera className="size-5" />
                    </button>
                    <button
                      type="button"
                      onClick={capturePhoto}
                      disabled={isCapturing || isRecording}
                      className={`size-16 rounded-full border-4 border-white backdrop-blur-sm flex items-center justify-center transition ${isCapturing || isRecording ? 'bg-white/10 cursor-not-allowed' : 'bg-white/30 active:scale-90 hover:bg-white/50'}`}
                      title={isCapturing ? 'Đang xử lý...' : 'Chụp ảnh'}
                    >
                      {isCapturing ? (
                        <Loader2 className="size-8 text-white animate-spin" />
                      ) : (
                        <div className="size-12 rounded-full bg-white" />
                      )}
                    </button>
                    {/* GĐ 102: nút quay video — đỏ khi đang quay, đếm giây, tự dừng 30s */}
                    <button
                      type="button"
                      onClick={isRecording ? stopRecording : startRecording}
                      disabled={isCapturing}
                      className={`size-10 rounded-full border-2 backdrop-blur-sm flex items-center justify-center transition ${
                        isRecording
                          ? "border-red-400 bg-red-500/80 hover:bg-red-500"
                          : "border-white/70 bg-black/40 hover:bg-black/60"
                      }`}
                      title={isRecording ? `Dừng quay (${recordSeconds}s/${MAX_RECORD_SECONDS}s)` : `Quay video (tối đa ${MAX_RECORD_SECONDS}s)`}
                    >
                      {isRecording ? (
                        <span className="block size-4 rounded-[3px] bg-white" />
                      ) : (
                        <span className="block size-4 rounded-full bg-red-500" />
                      )}
                    </button>
                  </div>
                  {isRecording && (
                    <div className="absolute top-2 left-3 flex items-center gap-1.5 rounded-full bg-red-600/90 px-2.5 py-1 text-xs font-semibold text-white" style={{ zIndex: 20 }}>
                      <span className="size-2 animate-pulse rounded-full bg-white" />
                      REC {recordSeconds}s / {MAX_RECORD_SECONDS}s
                    </div>
                  )}
                  {!cameraActive && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white">
                      <Loader2 className="mb-3 size-8 animate-spin" />
                      <span className="text-sm">Đang mở camera...</span>
                    </div>
                  )}
                </>
              ) : videoPreview ? (
                <div className="relative">
                  {/* GĐ 102: preview video đã quay — có dấu trong từng frame */}
                  <video
                    src={videoPreview.url}
                    controls
                    playsInline
                    className="w-full rounded-2xl mx-auto"
                    style={{ maxHeight: 400, objectFit: "contain", maxWidth: isIOS ? "100%" : 400 }}
                  />
                  <button
                    type="button"
                    onClick={retakeVideo}
                    className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-sm hover:bg-black/80"
                  >
                    <Trash2 className="size-3.5" />
                    Quay lại
                  </button>
                </div>
              ) : photoPreview ? (
                <div className="relative">                    <img
                      src={photoPreview}
                      alt="Ảnh check-in đã đóng dấu"
                      className="w-full rounded-2xl mx-auto"
                      style={{ maxHeight: 400, objectFit: "contain", maxWidth: isIOS ? "100%" : 400 }}
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
              ) : null}
              <canvas ref={captureCanvasRef} className="hidden" />
            </div>

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
            <div className="rounded-xl border border-line bg-surface-2 p-3">
              <label className="block text-[10px] font-semibold tracking-[0.12em] text-muted uppercase mb-2">Ghi chú (không bắt buộc)</label>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ví dụ: giám sát trung tâm Long Biên"
                className="min-w-0 resize-none"
                rows={2}
              />
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <Button variant="outline" onClick={() => { stopRecording(); setIsDialogOpen(false); stopCamera(); }} disabled={isSubmitting}>
              Hủy
            </Button>
            <Button onClick={confirmCheckin} disabled={isSubmitting || isRecording || !photoPreview || !!videoPreview}>
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                "Xác nhận Check-in"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg">
          {detailRecord && (
            <>
              <DialogTitle>Chi tiết Check-in</DialogTitle>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-line bg-surface-2 p-3">
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Người check-in</p>
                  <p className="mt-1 text-base font-semibold text-ink">{detailRecord.name}</p>
                </div>
                <div className="rounded-xl border border-line bg-surface-2 p-3">
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Thời gian</p>
                  <p className="mt-1 text-base font-semibold text-ink">{detailRecord.time} — {formatDate(detailRecord.date)}</p>
                </div>
                <div className="rounded-xl border border-line bg-surface-2 p-3">
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">GPS</p>
                  <p className="mt-1 text-sm font-medium text-ink">{detailRecord.gps}</p>
                </div>
                <div className="rounded-xl border border-line bg-surface-2 p-3">
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Địa chỉ</p>
                  <p className="mt-1 text-sm leading-5 text-ink">{cleanAddress(detailRecord.address || detailRecord.gps || "—")}</p>
                </div>
                {detailRecord.photo && (
                  <div className="rounded-xl border border-line bg-white p-2">
                    <img
                      src={detailRecord.photo}
                      alt="Ảnh checkin"
                      className="h-40 w-auto mx-auto cursor-zoom-in rounded object-contain transition hover:opacity-90"
                      title="Bấm để phóng to"
                      onClick={() => {
                        setIsDetailOpen(false); // tắt Radix modal — lightbox mới nhận click
                        setLightboxPhoto(detailRecord.photo!);
                      }}
                    />
                  </div>
                )}
                {detailRecord.note && (
                  <div className="rounded-xl border border-line bg-surface-2 p-3">
                    <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Ghi chú</p>
                    <p className="mt-1 text-sm text-ink">{detailRecord.note}</p>
                  </div>
                )}
                {detailRecord.video && (
                  <div className="rounded-xl border border-line bg-black p-2">
                    <p className="mb-2 text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">Video check-in</p>
                    <video
                      src={detailRecord.video}
                      controls
                      playsInline
                      className="max-h-72 w-full rounded-lg object-contain"
                    />
                  </div>
                )}
              </div>
              <div className="mt-5 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Đóng</Button>
                {canDeleteRecord && (
                  <Button variant="outline" onClick={() => {
                    removeCheckin(detailRecord.id);
                    setIsDetailOpen(false);
                    toast.success("Đã xóa check-in");
                  }}>
                    Xóa
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Lightbox: xem ảnh check-in toàn màn hình — bấm ảnh hoặc nền để đóng */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-[60] flex cursor-zoom-out items-center justify-center bg-white/95 p-4"
          onClick={closeLightbox}
        >
          <img
            src={lightboxPhoto}
            alt="Ảnh checkin (phóng to)"
            className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            aria-label="Đóng"
            className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-black/10 text-ink transition hover:bg-black/20"
            onClick={closeLightbox}
          >
            <X className="size-6" />
          </button>
        </div>
      )}
    </div>
  );
}
