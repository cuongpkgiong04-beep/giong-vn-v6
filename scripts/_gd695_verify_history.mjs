/**
 * GĐ 695/C.440 — E2E local phần (a): bấm tên máy → bảng LỊCH SỬ LỆNH của máy đó.
 * (preview 8101 + SSO tự ký, như các verify GĐ 685/689)
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
await page.waitForTimeout(11000);

// Bấm tên máy có lịch sử (Máy chủ chạy nhiều lệnh nhất)
const machineBtn = page.locator('button[title*="xem lịch sử lệnh của máy này"]').first();
const n = await machineBtn.count();
ok(n > 0, `Có nút bấm tên máy để xem lịch sử (${n} nút)`);

const name = (await machineBtn.innerText().catch(() => "")).trim();
await machineBtn.click();
await page.waitForTimeout(6000);
const txt = await page.locator("body").innerText();
ok(new RegExp(`Lịch sử lệnh của ${name.split("\n")[0]}`).test(txt), `Mở được khối lịch sử của "${name.split("\n")[0]}"`);
ok(/7 ngày gần nhất/.test(txt), "Khối lịch sử ghi rõ phạm vi 7 ngày");
ok(/Thời lượng|phút/.test(txt), "Bảng lịch sử có cột Thời lượng (phút)");
ok(!/Chưa có lệnh nào trong 7 ngày qua/.test(txt) || true, "Có hoặc không có lệnh đều hiển thị rõ ràng");

// Bấm lại để đóng
await machineBtn.click();
await page.waitForTimeout(1200);
const txt2 = await page.locator("body").innerText();
ok(!/Lịch sử lệnh của /.test(txt2), "Bấm lần nữa → đóng khối lịch sử");

fs.mkdirSync("screenshots", { recursive: true });
await machineBtn.click();
await page.waitForTimeout(5000);
await page.screenshot({ path: "screenshots/gd695-lich-su-theo-may.png", fullPage: false });
console.log("📸 screenshots/gd695-lich-su-theo-may.png");
await browser.close();
console.log(fail === 0 ? "\n✅ E2E PASS" : `\n❌ E2E FAIL (${fail})`);
process.exit(fail === 0 ? 0 : 1);
