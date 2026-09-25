rem =====================================================================
rem GIONG VN — CHẠY LOCAL ĐỂ TEST (bấm đúp để chạy)
rem App tổng : http://localhost:3000  (GIONG VIETNAM — điều hành chuỗi)
rem App con  : http://localhost:3100  (GIONG BÁN HÀNG — SMED/MISA)
rem 
rem Cửa sổ đen của 2 app sẽ mở ra — ĐỪNG ĐÓNG, chỉ MINIMIZE.
rem Muốn DỪNG: đóng 2 cửa sổ (hoặc bấm Ctrl+C trong từng cửa sổ).
rem 
rem LƯU Ý: máy phải có internet (app đọc dữ liệu SQL Server công ty qua
rem Cloudflare Tunnel). Nếu app báo lỗi dữ liệu → tunnel có thể đã đổi
rem URL: chạy lại file update-tunnel-local.bat rồi mở lại app.
rem =====================================================================
@echo off
chcp 65001 >nul
title GIONG VN - Chay local 2 app

echo.
echo  ============================================================
echo   GIONG VN — Dang khoi dong 2 app o che do local...
echo   App tong : http://localhost:3000
echo   App con  : http://localhost:3100
echo  ============================================================
echo.

start "GIONG VN - App tong (3000)" cmd /k "cd /d D:\DuLieuChung\CUONG_2026\giong-vn-v6 && npm run dev"
timeout /t 3 /nobreak >nul
start "GIONG VN - App con Ban hang (3100)" cmd /k "cd /d D:\DuLieuChung\CUONG_2026\giong-vn-v6\giong-apps\apps\banhang && npm run dev"

echo  Da khoi dong xong! Trinh duyet se mo trong 20 giay nua...
timeout /t 20 /nobreak >nul
start http://localhost:3000
start http://localhost:3100
echo.
echo  Cua so nay co the DONG lai — 2 app chay trong 2 cua so rieng.
timeout /t 5 >nul
