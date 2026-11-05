/**
 * GĐ 686 — Verify production SAU Push (quy trình GĐ 470 bước B/C).
 * 1. Login thật app tổng (browser) → 2. bấm "Bán hàng" SSO sang app con
 * 3. vào /m/kho-xuat đối chiếu badge "Máy chạy" (GĐ 685/C.432) — phải thấy
 *    badge tên máy trạm; ảnh = bằng chứng ĐH xem được.
 */
import { chromium } from "playwright";
import fs from "node:fs";

const MAIN = "https://giong-vn-v6.vercel.app";
const CHILD = "https://giong-banhang.vercel.app";
const EMAIL = "cuongpk.giong04@gmail.com";
const PASSWORD = "Admin123!";

let fail = 0;
const ok = (cond, msg) => {
  console.log(`${cond ? "✅" : "❌"} ${msg}`);
  if (!cond) fail += 1;
};

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext();
const page = await ctx.newPage();
page.setDefaultTimeout(60000);

// 1) Login app tổng
await page.goto(MAIN + "/login", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(4000);   // chờ form hydrate hẳn rồi mới điền (fill sớm = React không nhận giá trị)
await page.fill('input[type="email"]', EMAIL);
await page.fill('input[type="password"]', PASSWORD);
await page.click('button[type="submit"]');
// Trang app tổng poll nền liên tục → "load" khó đạt; chờ URL đổi bằng vòng lặp.
await page.waitForTimeout(15000);   // đo thật: dashboard render + URL đổi sau ~9-12s

ok(page.url().replace(/\/$/, "") === MAIN, `Login app tổng — URL sau submit: ${page.url()}`);
const homeText = await page.locator("body").innerText();
ok(homeText.includes("Phạm Kiên Cường"), "Login app tổng (browser thật) — thấy tên user");
ok(/8\.0\.0/.test(homeText), "Version app tổng trên UI = 8.0.0");

// 2) SSO sang app con qua nút "Bán hàng"
const sellBtn = page.locator('a[href*="giong-banhang"]').first();
const hasBtn = await sellBtn.isVisible().catch(() => false);
ok(hasBtn, "Thấy nút 'Bán hàng' trên sidebar app tổng");
let childPage = page;
if (hasBtn) {
  const [p2] = await Promise.all([ctx.waitForEvent("page", { timeout: 30000 }), sellBtn.click()]);
  childPage = p2;
  await childPage.waitForLoadState("domcontentloaded", { timeout: 60000 });
  await childPage.waitForTimeout(11000);   // hydrate app con chậm (~9s đo thật)
  const u = childPage.url();
  ok(u.includes("giong-banhang") && !u.includes("sso="), `SSO sang app con OK — URL sạch (${u.slice(0, 60)})`);
  const ct = await childPage.locator("body").innerText();
  ok(ct.includes("Phạm Kiên Cường") && !ct.includes("Chưa đăng nhập"), "App con nhận phiên (hiện tên user)");
  // /api/auth/me bằng cookie thật của phiên
  const ck = (await ctx.cookies(CHILD)).find((x) => x.name === "bh_session");
  if (ck) {
    const r = await fetch(CHILD + "/api/auth/me", { headers: { Cookie: `bh_session=${ck.value}` } });
    const j = await r.json().catch(() => ({}));
    ok(r.status === 200 && j?.user?.name === "Phạm Kiên Cường", `/api/auth/me = ${r.status} · ${j?.user?.role || "?"}`);
  } else {
    ok(false, "Không thấy cookie bh_session ở app con");
  }
}

// 3) Badge "Máy chạy" trên production — trang lịch sử lấy dữ liệu xuất kho
await childPage.goto(CHILD + "/m/kho-xuat", { waitUntil: "domcontentloaded" });
await childPage.waitForTimeout(12000);
const badges = childPage.locator(
  'span[title*="Máy chạy lệnh này"], span[title*="Chưa máy trạm nào nhận lệnh"]',
);
const n = await badges.count();
const labels = [];
for (let i = 0; i < Math.min(n, 60); i += 1) labels.push((await badges.nth(i).innerText()).trim());
const uniq = [...new Set(labels)];
console.log(`➜ Badge "Máy chạy" production: ${n} · nhãn: ${uniq.join(" · ") || "trống"}`);
ok(n > 0, "Production có badge 'Máy chạy' (GĐ 685/C.432 LIVE)");
ok(uniq.some((s) => /GIANGKT|PC-PKT-01|THANH-PC|Máy chủ/.test(s)), "Badge hiện TÊN MÁY (không phải mã thô)");

fs.mkdirSync("screenshots", { recursive: true });
await childPage.screenshot({ path: "screenshots/gd686-prod-badge-may.png" });
console.log("📸 screenshots/gd686-prod-badge-may.png");
await browser.close();
console.log(fail === 0 ? "\n✅ VERIFY PRODUCTION PASS" : `\n❌ VERIFY FAIL (${fail})`);
process.exit(fail === 0 ? 0 : 1);
