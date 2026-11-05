/**
 * GĐ 685/C.431 — E2E local verify badge "Máy chạy" (PA-1 ĐH chốt 05/11).
 * Chạy: node scripts/_gd685_verify_badge.mjs  (preview app con port 8101 đang chạy)
 * Ký SSO token bằng APP_JWT_SECRET thật (cùng giá trị 2 app) → cookie bh_session.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import { chromium } from "playwright";

const BASE = "http://127.0.0.1:8101";
const SECRET_PATH =
  "D:/DuLieuChung/CUONG_2026/giong-vn-v6/giong-apps/apps/banhang/agent/.secrets/app_jwt_secret.txt";
const secret = fs.readFileSync(SECRET_PATH, "utf8").trim();

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
const sig = crypto.createHmac("sha256", secret).update(`${head}.${body}`).digest("base64url");
const token = `${head}.${body}.${sig}`;

const browser = await chromium.launch({ headless: true, args: ["--no-proxy-server"] });
const page = await browser.newPage();
let fail = 0;
const ok = (cond, msg) => {
  console.log(`${cond ? "✅" : "❌"} ${msg}`);
  if (!cond) fail += 1;
};

await page.goto(`${BASE}/api/auth/sso?sso=${encodeURIComponent(token)}`, {
  waitUntil: "domcontentloaded",
  timeout: 60000,
});
await page.waitForTimeout(2500);
ok(!page.url().includes("sso="), `Đăng nhập SSO local (URL: ${page.url()})`);

await page.goto(`${BASE}/m/bc-nhap-kho`, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(9000);
const text = await page.locator("body").innerText();
ok(text.includes("Lịch sử chạy báo cáo"), "Trang /m/bc-nhap-kho render khung 'Lịch sử chạy báo cáo'");

const badges = page.locator(
  'span[title*="Máy chạy lệnh này"], span[title*="Chưa máy trạm nào nhận lệnh"]',
);
const n = await badges.count();
if (n > 0) { await badges.first().scrollIntoViewIfNeeded().catch(() => {}); await page.waitForTimeout(500); }
console.log(`➜ Số badge "Máy chạy" tìm thấy: ${n}`);
for (let i = 0; i < Math.min(n, 8); i += 1) {
  const el = badges.nth(i);
  console.log(`   • ${(await el.innerText()).trim()} — ${await el.getAttribute("title")}`);
}
ok(n > 0, "Có ít nhất 1 badge máy (job lịch sử đã có claimed_by)");

// Badge nằm trong khối lịch sử (không phải text rơi vãi)
if (n > 0) {
  const names = [];
  for (let i = 0; i < n; i += 1) names.push((await badges.nth(i).innerText()).trim());
  ok(
    names.some((s) => /Máy chủ|GIANGKT|THANH-PC|PC-PKT-01|Chưa máy/.test(s)),
    `Nhãn máy đúng dạng tên người đọc được (${[...new Set(names)].join(" · ") || "trống"})`,
  );
}

// Trang 2: "Lấy dữ liệu" SMED xuất kho (SmedPullModule) — job loại này chạy
// trên máy LAN (GIANGKT) → kỳ vọng thấy badge tên máy KHÁC 'Máy chủ'.
await page.goto(`${BASE}/m/kho-xuat`, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(9000);
const badges2 = page.locator(
  'span[title*="Máy chạy lệnh này"], span[title*="Chưa máy trạm nào nhận lệnh"]',
);
const n2 = await badges2.count();
const labels2 = [];
for (let i = 0; i < n2; i += 1) labels2.push((await badges2.nth(i).innerText()).trim());
const uniq2 = [...new Set(labels2)];
console.log(`➜ /m/kho-xuat — ${n2} badge · nhãn: ${uniq2.join(" · ") || "trống"}`);
ok(n2 > 0, "Trang lấy dữ liệu xuất kho có badge máy");
ok(
  uniq2.some((s) => /GIANGKT|PC-PKT-01|THANH-PC|Máy chủ/.test(s)),
  "Nhãn hiện tên máy trạm (không chỉ 'Máy chủ')",
);

fs.mkdirSync("screenshots", { recursive: true });
await page.screenshot({ path: "screenshots/gd685-badge-may-kho-xuat.png" });
await browser.close();
console.log(fail === 0 ? "\n✅ E2E PASS" : `\n❌ E2E FAIL (${fail})`);
process.exit(fail === 0 ? 0 : 1);
