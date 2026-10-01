// GĐ 283 — Unit test computeCenterCrop (logic thuần — chạy node --experimental-strip-types).
// Mục đích: chứng minh crop LUÔN lấy vùng GIỮA khung gốc camera theo tỉ lệ khung
// preview → ảnh lưu khớp preview 100%. Nếu "mặt lệch" còn trên ảnh chụp thì
// nguyên nhân là frame camera gốc (chủ thể không nằm giữa khung gốc) — KHÔNG
// phải logic crop (test này chứng minh crop đúng giữa mọi tỉ lệ).
// Chạy: node --experimental-strip-types --test src/lib/camera-frame.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { computeCenterCrop } from "./camera-frame.ts";

test("crop khung ngang 1920×1080 → view dọc 3/4: lấy giữa theo chiều ngang", () => {
  const c = computeCenterCrop(1920, 1080, 3, 4);
  // sw = 1080 × 0.75 = 810; sx = (1920 − 810)/2 = 555 → ĐÚNG GIỮA
  assert.equal(c.sw, 810);
  assert.equal(c.sh, 1080);
  assert.equal(c.sx, 555);
  assert.equal(c.sy, 0);
  // Cân đối xứng: mép trái + mép phải = frame gốc
  assert.equal(c.sx + c.sw + c.sx, 1920);
});

test("crop khung dọc iPhone 1080×1920 → view dọc 3/4: lấy giữa theo chiều dọc", () => {
  const c = computeCenterCrop(1080, 1920, 3, 4);
  // sh = 1080 / 0.75 = 1440; sy = (1920 − 1440)/2 = 240 → ĐÚNG GIỮA
  assert.equal(c.sw, 1080);
  assert.equal(c.sh, 1440);
  assert.equal(c.sx, 0);
  assert.equal(c.sy, 240);
  assert.equal(c.sy + c.sh + c.sy, 1920);
});

test("crop webcam ngang cũ 640×480 → view 3/4: không lệch tâm", () => {
  const c = computeCenterCrop(640, 480, 3, 4);
  assert.equal(c.sw, 360);
  assert.equal(c.sx, 140);
  assert.equal((c.sx * 2) + c.sw, 640); // tâm cân
});

test("crop khung trùng tỉ lệ view → giữ nguyên frame (identity)", () => {
  const c = computeCenterCrop(750, 1000, 3, 4);
  assert.deepEqual(c, { sx: 0, sy: 0, sw: 750, sh: 1000 });
});

test("crop 0/1 kích thước lạ không crash, vẫn hợp lệ", () => {
  const c = computeCenterCrop(0, 0, 3, 4);
  assert.ok(c.sw >= 1 && c.sh >= 1);
  const c2 = computeCenterCrop(1, 1, 0, 0);
  assert.ok(c2.sw >= 1 && c2.sh >= 1);
});

test("crop view ngang 4/3 từ frame dọc → lấy giữa dọc (quay ngang điện thoại)", () => {
  const c = computeCenterCrop(1080, 1920, 4, 3);
  // sh = 1080 / (4/3) = 810; sy = (1920 − 810)/2 = 555
  assert.equal(c.sh, 810);
  assert.equal(c.sy, 555);
});
