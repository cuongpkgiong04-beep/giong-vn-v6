# -*- coding: utf-8 -*-
"""GĐ 697 — VERIFY production: đăng nhập app tổng bằng browser thật → bấm "Bán hàng"
(sidebar) → app con phải vào được (không hiện 'Chưa đăng nhập') + /api/auth/me có user.
Chạy trên máy chủ (Chrome CDP 9222)."""
import asyncio
import json

from playwright.async_api import async_playwright

EMAIL = "cuongpk.giong04@gmail.com"
PASS = "Admin123!"


async def main():
    async with async_playwright() as pw:
        b = await pw.chromium.connect_over_cdp("http://127.0.0.1:9222", timeout=30000)
        ctx = b.contexts[0]
        page = await ctx.new_page()
        await page.goto("https://giong-vn-v6.vercel.app/login", timeout=60000, wait_until="domcontentloaded")
        await page.wait_for_timeout(4000)
        print("1) trang login:", page.url[:60])
        # đăng nhập
        try:
            await page.fill('input[type="email"], input[name="email"]', EMAIL, timeout=15000)
            await page.fill('input[type="password"]', PASS, timeout=8000)
            await page.click('button[type="submit"], button:has-text("Đăng nhập")', timeout=8000)
        except Exception as e:
            print("   ⚠️ form:", str(e)[:90])
        await page.wait_for_timeout(7000)
        print("2) sau đăng nhập:", page.url[:70])
        # tìm link "Bán hàng" ở sidebar
        href = await page.evaluate("""() => {
            const a = [...document.querySelectorAll('a')].find(e => /Bán hàng/i.test(e.innerText||''));
            return a ? a.href : '';
        }""")
        print("3) link Bán hàng:", href[:90])
        if href:
            await page.goto(href, timeout=60000, wait_until="domcontentloaded")
            await page.wait_for_timeout(6000)
            print("4) URL sau SSO:", page.url[:90])
            body = await page.inner_text("body")
            print("   có 'Chưa đăng nhập':", "Chưa đăng nhập" in body)
            # gọi /api/auth/me trong ngữ cảnh app con
            me = await page.evaluate("""async () => {
                const r = await fetch('/api/auth/me', {credentials: 'include'});
                const t = await r.text();
                return r.status + '|' + t.slice(0, 220);
            }""")
            print("5) /api/auth/me:", me[:260])
        await page.close()


asyncio.run(main())
