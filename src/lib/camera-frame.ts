// GĐ 273: Helper dùng chung camera Chấm công + Check-in.
// 1) Crop WYSIWYG — ảnh lưu lấy đúng vùng trung tâm theo TỈ LỆ khung preview
//    (trước đây canvas lấy toàn bộ khung gốc camera trong khi preview chỉ hiển thị
//    một phần qua objectFit contain/cover → ảnh lưu bị trống phía trên + lệch trái).
// 2) Mịn da 2 lớp — vẽ frame gốc nét, đè thêm 1 lớp blur bán trong suốt:
//    da/mọc/cận được làm mềm, mắt + viền mặt vẫn nét (blur CSS 1 lớp cũ mờ cả ảnh
//    nên không che được khuyết điểm — Đại ca phản hồi GĐ 245 "chỉ thấy vàng").

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
  /** Bán kính blur lớp mịn da (px trên ảnh gốc). Mặc định 6. */
  blurPx?: number;
  /** Độ trong suốt lớp blur đè (0-1). Càng cao càng mịn. Mặc định 0.55. */
  overlayAlpha?: number;
}

/**
 * Vẽ frame camera lên canvas theo vùng crop + mịn da 2 lớp khi beauty bật.
 * Lớp 1: frame gốc nét đầy đủ. Lớp 2 (beauty): cùng frame + blur + màu nhẹ,
 * vẽ bán trong suốt → da mềm nhưng chi tiết chính vẫn nét.
 * Filter chỉ áp cho lớp ảnh — chữ đóng dấu vẽ SAU hàm này luôn nét.
 */
export function drawCameraFrame(
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  crop: CameraCrop,
  opts: DrawFrameOptions,
): void {
  const { sx, sy, sw, sh } = crop;

  // Lớp 1 — frame gốc nét
  ctx.filter = "none";
  ctx.globalAlpha = 1;
  ctx.drawImage(video, sx, sy, sw, sh, 0, 0, sw, sh);

  if (!opts.beauty) return;

  // Lớp 2 — mịn da: blur đậm hơn đáng kể so với bản cũ (1.4px vô hình trên ảnh 1080p)
  ctx.save();
  ctx.globalAlpha = opts.overlayAlpha ?? 0.55;
  ctx.filter = `blur(${opts.blurPx ?? 6}px) ${opts.beautyFilter}`;
  ctx.drawImage(video, sx, sy, sw, sh, 0, 0, sw, sh);
  ctx.restore();

  // Luôn tắt filter + trả alpha về 1 — mọi thứ vẽ sau (chữ dấu) phải nét
  ctx.filter = "none";
  ctx.globalAlpha = 1;
}
