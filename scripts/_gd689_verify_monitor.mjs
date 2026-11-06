/**
 * GĐ 689/C.436 — E2E local trang "Giám sát máy trạm" (preview 8101 + SSO tự ký).
 * Kiểm: 4 máy hiện đủ · trạng thái có nhịp tim (online/rảnh) · lệnh đang chạy.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import { chromium } from "playwright";

const BASE = "http://127.0.0.1:8101";
const secret = fs
  .readFileSync("D:/DuLieuChung/CUONG_2026/giong-vn-v6/giong-apps/apps/banhang/agent/.secrets/app_jwt_secret.txt", "utf8")
  .trim();
const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
const now = Math.floor(Date.now() / 1000);
const head = b64({ alg: "HS256", typ: "JWT" });
const body = b64({
  iss: "giong-vn-v6",
  aud: "giong-banhang",
  sub: "e0000000-0000-0000-0000-000000000003",
  iat: now,
  exp: now + 3600,
  empId: "e0000000-0000-0000-0000-000000000003",
  name: "Phạm Kiên Cường",
  email: "cuongpk.giong04@gmail.com",
  role: "Admin",
  center: "VP",
  mods: [],
});
const token = `${head}.${body}.${crypto.createHmac("sha256", secret).update(`${head}.${body}`).digest("base64url")}`;

let fail = 0;
const ok = (c, m) => {
  console.log(`${c ? "✅" : "❌"} ${m}`);
  if (!c) fail += 1;
};

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext();
const page = await ctx.newPage();
await page.goto(`${BASE}/api/auth/sso?sso=${encodeURIComponent(token)}`, { waitUntil: "domcontentloaded" }).catch(() => {});
await page.waitForTimeout(2500);
await page.goto(`${BASE}/m/giam-sat-may`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(12000);
const text = await page.locator("body").innerText();
ok(!text.includes("Chưa đăng nhập"), "Vào được trang (có phiên SSO)");
ok(/Giám sát máy trạm/i.test(text), "Tiêu đề trang 'Giám sát máy trạm' hiện");
ok(!text.includes("chưa được cấp quyền"), "Không bị chặn quyền (Admin)");

const names = ["Máy chủ", "GIANGKT", "THANH-PC", "PC-PKT-01"];
for (const n of names) ok(text.includes(n), `Bảng có máy ${n}`);
ok(/Rảnh — máy đang bật|Đang chạy \d+ lệnh/.test(text), "Có trạng thái 'Rảnh — máy đang bật' hoặc 'Đang chạy N lệnh'");
ok(!text.includes("Chưa có dữ liệu nhịp tim (bảng worker_heartbeat rỗng)") || /Rảnh — máy đang bật/.test(text), "Nhịp tim đã có (không còn cảnh báo 'chưa có nhịp tim')");
ok(text.includes("Máy trạm") && /24 giờ/i.test(text), "Bảng máy + cột thống kê 24 giờ hiện");

fs.mkdirSync("screenshots", { recursive: true });
await page.screenshot({ path: "screenshots/gd689-giam-sat-may-tram.png", fullPage: true });
console.log("📸 screenshots/gd689-giam-sat-may-tram.png");
await browser.close();
console.log(fail === 0 ? "\n✅ E2E PASS" : `\n❌ E2E FAIL (${fail})`);
process.exit(fail === 0 ? 0 : 1);
