# -*- coding: utf-8 -*-
"""GĐ 697 — VERIFY SSO (bản 2): đăng nhập app tổng rồi BẤM nút "Bán hàng" (đúng luồng
thật — handler ký JWT/handoff), theo dõi cả tab mới."""
import asyncio

from playwright.async_api import async_playwright

EMAIL = "cuongpk.giong04@gmail.com"
PASS = "Admin123!"


async def main():
    async with async_playwright() as pw:
        b = await pw.chromium.connect_over_cdp("http://127.0.0.1:9222", timeout=30000)
        ctx = b.contexts[0]
        page = await ctx.new_page()
        await page.goto("https://giong-vn-v6.vercel.app/login", timeout=60000, wait_until="domcontentloaded")
        await page.wait_for_timeout(3500)
        await page.fill('input[type="email"], input[name="email"]', EMAIL, timeout=15000)
        await page.fill('input[type="password"]', PASS, timeout=8000)
        await page.click('button[type="submit"], button:has-text("Đăng nhập")', timeout=8000)
        await page.wait_for_timeout(7000)
        print("1) đăng nhập xong:", page.url[:60])
        before = set(p.url for p in ctx.pages)
        # bấm nút Bán hàng (ưu tiên <a> có chữ Bán hàng, bấm thật)
        try:
            await page.click("a:has-text('Bán hàng'), a[href*='giong-banhang']", timeout=12000)
            print("2) đã bấm nút Bán hàng")
        except Exception as e:
            print("2) ⚠️ bấm lỗi:", str(e)[:90])
        await page.wait_for_timeout(8000)
        pages = ctx.pages
        news = [p for p in pages if p.url not in before]
        print("3) tab mới:", [p.url[:80] for p in news])
        target = None
        for p in news + [page]:
            if "giong-banhang" in (p.url or ""):
                target = p
                break
        if target is None:
            print("❌ không thấy tab app con"); return
        await target.bring_to_front()
        await target.wait_for_timeout(4000)
        print("4) URL app con:", target.url[:110])
        body = await target.inner_text("body")
        print("   có 'Chưa đăng nhập':", "Chưa đăng nhập" in body)
        me = await target.evaluate("""async () => {
            const r = await fetch('/api/auth/me', {credentials: 'include'});
            return r.status + '|' + (await r.text()).slice(0, 240);
        }""")
        print("5) /api/auth/me:", me[:280])
        await target.close()
        await page.close()


asyncio.run(main())
