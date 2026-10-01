// GĐ 273: Helper dùng chung camera Chấm công + Check-in.
// 1) Crop WYSIWYG — ảnh lưu lấy đúng vùng trung tâm theo TỈ LỆ khung preview
//    (trước đây canvas lấy toàn bộ khung gốc camera trong khi preview chỉ hiển thị
//    một phần qua objectFit contain/cover → ảnh lưu bị trống phía trên + lệch trái).
// 2) GĐ 283 Beauty Pro — pipeline 3 lớp áp lên vùng đã crop, mô phỏng retouch
//    ảnh thẻ chất lượng cao:
//      Lớp 0 — BASE: cân bằng ánh sáng toàn ảnh (lift vùng tối + kéo vùng cháy sáng
//              về trung tính) + tăng tương phản nhẹ. Tự nhiên, không ám màu.
//      Lớp 1 — SMOOTH: blur bán trong suốt đè lên — mịn da, làm mềm khuyết điểm
//              tạm thời (mụn/vết thâm/nếp nhăn nhỏ chỉ MỜ ĐI — canvas thuần không
//              xóa theo vị trí được), quầng mắt/nếp nhăn nhẹ bớt rõ.
//      Lớp 2 — DETAIL: unsharp-mask (bản gốc nhòe nhẹ đè "overlay" bán
//              trong suốt) → mắt/tóc/đường viền khuôn mặt TĂNG NÉT rõ rệt mà
//              KHÔNG thay đổi hình dạng — bù lại phần nét bị lớp smooth lấy đi
//              → ảnh giống máy ảnh tốt chứ không phải ảnh AI.
//    Toàn bộ pipeline KHÔNG đụng hình dạng/tỷ lệ khuôn mặt, không tạo mặt mới.
//    Filter chỉ áp cho lớp ảnh — chữ đóng dấu vẽ SAU hàm này luôn nét.

export interface CameraCrop {
  sx: number;
  sy: number;
  sw: number;
  sh: number;
}

/** Vùng crop TRUNG TÂM của frame camera theo tỉ lệ khung hiển thị (WYSIWYG). */
export function computeCenterCrop(
  frameW: number,
  frameH: number,
  viewW: number,
  viewH: number,
): CameraCrop {
  const fw = Math.max(1, Math.round(frameW));
  const fh = Math.max(1, Math.round(frameH));
  const vw = Math.max(1, Math.round(viewW));
  const vh = Math.max(1, Math.round(viewH));
  const frameAspect = fw / fh;
  const viewAspect = vw / vh;

  let sw = fw;
  let sh = fh;
  if (frameAspect > viewAspect) {
    // Frame RỘNG hơn khung (VD webcam ngang, khung dọc) → cắt 2 bên
    sw = Math.round(fh * viewAspect);
  } else if (frameAspect < viewAspect) {
    // Frame CAO/DỌC hơn khung (VD stream dọc iPhone, khung ngang) → cắt trên/dưới
    // → hết phần trống phía trên trong ảnh lưu
    sh = Math.round(fw / viewAspect);
  }
  return {
    sx: Math.round((fw - sw) / 2),
    sy: Math.round((fh - sh) / 2),
    sw,
    sh,
  };
}

export interface DrawFrameOptions {
  beauty: boolean;
  beautyFilter: string;
  /** Bán kính blur lớp mịn da (px trên ảnh gốc). Mặc định 9 (Beauty Pro). */
  blurPx?: number;
  /** Độ trong suốt lớp blur đè (0-1). Càng cao da càng mịn. Mặc định 0.42. */
  overlayAlpha?: number;
  /** Độ trong suốt lớp tăng nét (0-1). Mặc định 0.38. */
  detailAlpha?: number;
}

/** Cân bằng ánh sáng toàn ảnh: lift vùng tối + kéo vùng cháy sáng về trung tính.
 *  Cách chạy: vẽ ảnh vào canvas nội bộ qua 2 filter chồng nhau rồi trả canvas —
 *  mọi pixel được xử lý thống nhất (khác CSS filter trên 1 element). */
function buildLightingLayer(
  video: HTMLVideoElement,
  crop: CameraCrop,
  lightingFilter: string,
  w: number,
  h: number,
): HTMLCanvasElement {
  const layer = document.createElement("canvas");
  layer.width = w;
  layer.height = h;
  const lctx = layer.getContext("2d");
  if (!lctx) {
    // Fallback: canvas rỗng (nếu nào tạo thất bại) — vẽ frame thuần thay vì trả canvas đen
    const fb = document.createElement("canvas");
    fb.width = w;
    fb.height = h;
    const fctx = fb.getContext("2d");
    if (fctx) {
      fctx.filter = "none";
      fctx.drawImage(video, crop.sx, crop.sy, crop.sw, crop.sh, 0, 0, w, h);
    }
    return fb;
  }
  lctx.filter = lightingFilter;
  lctx.drawImage(video, crop.sx, crop.sy, crop.sw, crop.sh, 0, 0, w, h);
  lctx.filter = "none";
  return layer;
}

/**
 * Vẽ frame camera lên canvas theo vùng crop + pipeline Beauty Pro khi beauty bật.
 * Lớp 0 BASE (cân bằng sáng/tương phản) → Lớp 1 SMOOTH (blur mịn da bán trong suốt)
 * → Lớp 2 DETAIL (unsharp-mask tăng nét mắt/tóc/viền — bù nét lớp smooth lấy đi).
 * Kết quả: da sạch đều màu tự nhiên, chi tiết nét như máy ảnh tốt, không vẻ AI.
 * Filter tắt ngay sau khi vẽ ảnh — mọi thứ vẽ sau (chữ dấu) phải nét.
 */
export function drawCameraFrame(
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  crop: CameraCrop,
  opts: DrawFrameOptions,
): void {
  const { sx, sy, sw, sh } = crop;

  // ── Lớp 1 — frame gốc nét (beauty TẮT: đúng như cũ, dừng sớm) ──
  ctx.filter = "none";
  ctx.globalAlpha = 1;
  ctx.drawImage(video, sx, sy, sw, sh, 0, 0, sw, sh);

  if (!opts.beauty) return;

  const w = sw;
  const h = sh;

  // ── Lớp 0 — BASE: cân bằng ánh sáng + tương phản nhẹ (canvas nội bộ) ──
  // brightness 1.07: lift vùng tối (quầng mắt/bóng mờ) không cháy sáng;
  // contrast 1.06: tách người khỏi nền, ảnh "đặc" hơn kiểu máy ảnh;
  // saturate 0.97: da trung tính tự nhiên — hết ám vàng GĐ 245.
  const lightingFilter = "brightness(1.07) contrast(1.06) saturate(0.97)";
  const base = buildLightingLayer(video, crop, lightingFilter, w, h);
  ctx.filter = "none";
  ctx.globalAlpha = 1;
  ctx.drawImage(base, 0, 0);

  // ── Lớp 1 — SMOOTH: mịn da bán trong suốt ──
  // blur 9px @1080p: mức "da sạch tự nhiên" — mụn/thâm/nếp nhăn nhỏ mờ rõ,
  // không đủ để biến thành bức tượng sáp. Alpha 0.42: đủ thấy khác biệt ngay
  // trên preview (lesson GĐ 245 — mức quá nhẹ = "không thấy thay đổi").
  ctx.save();
  ctx.globalAlpha = opts.overlayAlpha ?? 0.42;
  ctx.filter = `blur(${opts.blurPx ?? 9}px) ${opts.beautyFilter}`;
  ctx.drawImage(video, sx, sy, sw, sh, 0, 0, w, h);
  ctx.restore();

  // ── Lớp 2 — DETAIL: unsharp-mask tăng nét mắt/tóc/viền mặt ──
  // Bản gốc crop nhòe nhẹ (blur 1.5px) đè "overlay" alpha 0.38 — chỉ phần
  // VIỀN/CHI TIẾT tương phản cao (mắt, mi, tóc, viền mặt) được đẩy nét lên,
  // vùng da phẳng không đổi → giữ nguyên kết cấu da tự nhiên, không "AI".
  const blurLayer = buildLightingLayer(video, crop, "blur(1.5px)", w, h);
  ctx.save();
  ctx.globalAlpha = opts.detailAlpha ?? 0.38;
  ctx.globalCompositeOperation = "overlay";
  ctx.filter = "none";
  ctx.drawImage(blurLayer, 0, 0);
  ctx.restore();

  // Luôn tắt filter + trả alpha/composite về mặc định — mọi thứ vẽ sau nét
  ctx.filter = "none";
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
}
