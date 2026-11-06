# -*- coding: utf-8 -*-
"""GĐ 697 — BẬT 'ỨNG DỤNG XÁC THỰC' (TOTP) cho 1 tài khoản MISA trên máy đang chạy.

Chạy TRÊN máy có Chrome CDP + phiên MISA của tài khoản cần bật:
    set MISA_USER=<email> & set MISA_PASS=<mật khẩu> & python gd697_enroll_totp.py

Các bước: AMIS (menu tài khoản) → MISA ID → Xác thực 2 yếu tố → Thiết lập Ứng dụng
xác thực → nhập mật khẩu → LẤY KHÓA (lưu .secrets/misa_totp_<slug>.txt) → sinh mã
TOTP → xác nhận. Không lấy được khóa ⇒ DỪNG (không xác nhận gì).
"""
import asyncio
import os
import re
import sys
from pathlib import Path

from playwright.async_api import async_playwright

sys.path.insert(0, str(Path(__file__).parent))
import misa_totp as T  # noqa: E402

USER = os.environ.get("MISA_USER", "").strip()
PASS = os.environ.get("MISA_PASS", "").strip()

JS_AVATAR = """() => {
  const vw = window.innerWidth; let best = null;
  document.querySelectorAll('*').forEach(e => {
    const r = e.getBoundingClientRect();
    if (r.y > 70 || r.width < 24 || r.width > 60 || Math.abs(r.width - r.height) > 8) return;
    if (r.x < vw - 120) return;
    if (parseFloat(getComputedStyle(e).borderRadius) < r.width / 2 - 2) return;
    best = {x: Math.round(r.x + r.width/2), y: Math.round(r.y + r.height/2)};
  });
  return best;
}"""

JS_CLICK_SETUP = """() => {
  const t = [...document.querySelectorAll('*')].find(e => (e.innerText||'').trim() === 'Ứng dụng xác thực');
  if (!t) return 'khong thay muc Ung dung xac thuc';
  let box = t;
  for (let i = 0; i < 5 && box.parentElement; i++) {
    box = box.parentElement;
    const b = [...box.querySelectorAll('button,a')].filter(x => (x.innerText||'').trim() === 'Thiết lập');
    if (b.length) { b[0].click(); return 'ok'; }
  }
  return 'khong thay nut Thiet lap';
}"""


async def grab_secret(page) -> str:
    clicked = await page.evaluate("""() => {
        const els = [...document.querySelectorAll('a,button,span,div,label')]
            .filter(e => /Không thể quét mã này/i.test(e.innerText||''));
        if (els.length) { els[0].click(); return true; } return false;
    }""")
    if clicked:
        await page.wait_for_timeout(3000)
    txt = await page.inner_text("body")
    cands = [c for c in dict.fromkeys(re.findall(r"\b[A-Z2-7]{16,}={0,6}\b", txt))
             if len(c) >= 16 and not c.startswith("CFDJ")]
    if cands:
        return cands[0]
    html = await page.content()
    cands2 = re.findall(r"(?:secret|Secret)[\"'=:\s]+([A-Z2-7]{16,}={0,6})", html)
    cands2 = [c for c in dict.fromkeys(cands2) if not c.startswith("CFDJ")]
    return cands2[0] if cands2 else ""


async def main():
    if not USER or not PASS:
        print("❌ thiếu MISA_USER / MISA_PASS"); return
    async with async_playwright() as pw:
        b = await pw.chromium.connect_over_cdp("http://localhost:9222", timeout=30000)
        ctx = b.contexts[0]
        amis = next((p for p in ctx.pages if "misa.vn" in (p.url or "")), None) or await ctx.new_page()
        await amis.goto("https://amisapp.misa.vn/home/", timeout=60000, wait_until="load")
        await amis.bring_to_front()
        await amis.wait_for_timeout(5000)
        box = await amis.evaluate(JS_AVATAR)
        print("avatar:", box)
        if box:
            await amis.mouse.move(box["x"], box["y"])
            await amis.wait_for_timeout(700)
            await amis.mouse.click(box["x"], box["y"])
            await amis.wait_for_timeout(1600)
            await amis.evaluate("""() => { const el = document.querySelector('[res-key="AccountMenu_SecuritySetting"]');
                if (el) { let t = el; for (let i=0;i<4 && t.parentElement;i++){ t = t.parentElement;
                  if (t.tagName === 'LI' || t.getAttribute('role') === 'menuitem') break; } t.click(); } }""")
        await amis.wait_for_timeout(7000)
        sec = next((p for p in ctx.pages if "id.misa.vn" in (p.url or "")), None)
        if sec is None:
            print("❌ không mở được tab MISA ID"); return
        await sec.bring_to_front()
        await sec.goto("https://id.misa.vn/security/two-factor-authen?culture=vi",
                       timeout=60000, wait_until="domcontentloaded")
        await sec.wait_for_timeout(5000)
        print("tab MISA ID:", sec.url[:95])
        if "Account/Login" in sec.url:
            print("❌ phiên MISA ID chưa có (bị đẩy về trang đăng nhập MISA ID)"); return
        print("1) bấm Thiết lập:", await sec.evaluate(JS_CLICK_SETUP))
        await sec.wait_for_timeout(4000)
        try:
            inp = sec.locator("input[type=password]").last
            await inp.wait_for(state="visible", timeout=15000)
            await inp.click(timeout=8000)
            await inp.press_sequentially(PASS, delay=55)
            await sec.locator("button:has-text('Tiếp tục')").last.click(timeout=10000)
            print("2) đã qua bước mật khẩu")
        except Exception as e:
            print("2) ⚠️ bước mật khẩu:", type(e).__name__, str(e)[:90])
        await sec.wait_for_timeout(6000)
        ok = await sec.evaluate("""() => /Thiết lập Ứng dụng xác thực|Nhập mã xác nhận/i.test(document.body.innerText)""")
        print("3) màn thiết lập hiện:", ok)
        if not ok:
            txt = await sec.inner_text("body")
            print("   đầu text:", " | ".join(l.strip() for l in txt.split("\n") if l.strip())[:300])
            await sec.screenshot(path=r"C:/CUONG_2026/giong-agent/_gd697_lan_fail.png", full_page=True)
            return
        secret = await grab_secret(sec)
        if not secret:
            print("❌ KHÔNG lấy được khóa — DỪNG"); return
        p = T.save_secret(secret, user=USER)
        code = T.totp(secret)
        print(f"4) ✅ lưu khóa → {p} · mã {code[:3]}*** (còn {T.seconds_left()}s)")
        await sec.evaluate("""(code) => {
            const ins = [...document.querySelectorAll('input')]
                .filter(e => { const r = e.getBoundingClientRect(); return r.width > 40 && r.height > 8; });
            const t = ins.find(e => /mã|code|otp/i.test(e.placeholder||'')) || ins[ins.length-1];
            if (t) { t.focus(); t.value = code;
                     t.dispatchEvent(new Event('input', {bubbles: true}));
                     t.dispatchEvent(new Event('change', {bubbles: true})); }
        }""", code)
        await sec.wait_for_timeout(800)
        await sec.evaluate("""() => {
            const b = [...document.querySelectorAll('button,a')].filter(e => /Tiếp theo/i.test(e.innerText||''));
            if (b.length) b[b.length-1].click();
        }""")
        await sec.wait_for_timeout(8000)
        lines = [l.strip() for l in (await sec.inner_text("body")).split("\n") if l.strip()]
        print("--- SAU XÁC NHẬN (18 dòng cuối) ---")
        for l in lines[-18:]:
            print("   ", l[:120])
        await sec.screenshot(path=r"C:/CUONG_2026/giong-agent/_gd697_lan_done.png", full_page=True)


asyncio.run(main())
