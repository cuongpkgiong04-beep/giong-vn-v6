@echo off
rem =====================================================================
rem GIONG VN — CHẠY LOCAL ĐỂ TEST (GĐ 312 — đăng nhập đa máy)
rem
rem CÁCH DÙNG (mở cmd trong thư mục này hoặc bấm đúp):
rem   start-local.bat          → chế độ MÁY CHỦ (http://localhost:3000)
rem   start-local.bat lan      → máy TRẠM trong LAN mở http://192.168.1.250:3000
rem   start-local.bat public   → máy NGOÀI LAN (internet) — tự mở Quick Tunnel,
rem                              URL https://... in ngay trên màn hình
rem
rem LẦN ĐẦU TIÊN: chạy 1 LẦN "start-firewall-local.bat" bằng chuột phải
rem   → Run as Administrator (mở port 3000/3100 cho máy khác trong LAN).
rem
rem Sau khi đổi chế độ: ĐÓNG 2 cửa sổ app cũ rồi chạy lại file này
rem (dev server chỉ đọc cấu hình lúc khởi động).
rem
rem LƯU Ý: máy phải có internet (app đọc dữ liệu SQL Server công ty qua
rem Cloudflare Tunnel). App báo lỗi dữ liệu → chạy update-tunnel-local.bat.
rem =====================================================================
chcp 65001 >nul
title GIONG VN - Chay local 2 app
setlocal

set MODE=%1
if "%MODE%"=="" set MODE=localhost

cd /d D:\DuLieuChung\CUONG_2026\giong-vn-v6

echo.
echo  ============================================================
echo   GIONG VN — Che do: %MODE%
echo   App tong : localhost:3000   (may khac: xem huong dan ben duoi)
echo   App con  : localhost:3100
echo  ============================================================
echo.

python -X utf8 scripts\switch-local-env.py %MODE% %2 %3 %4 %5
if errorlevel 1 (
  echo.
  echo [LOI] Khong doi duoc cau hinh — khong khoi dong app.
  echo.
  pause
  exit /b 1
)

start "GIONG VN - App tong (3000)" cmd /k "cd /d D:\DuLieuChung\CUONG_2026\giong-vn-v6 && npm run dev"
timeout /t 3 /nobreak >nul
start "GIONG VN - App con Ban hang (3100)" cmd /k "cd /d D:\DuLieuChung\CUONG_2026\giong-vn-v6\giong-apps\apps\banhang && npm run dev"

echo.
echo  Da khoi dong xong! Trinh duyet se mo trong 20 giay nua...
echo  (Che do %MODE%: URL cho may khac xem phan in ben tren / trong LOG\)
timeout /t 20 /nobreak >nul
start http://localhost:3000
start http://localhost:3100
echo.
echo  Cua so nay co the DONG lai — 2 app chay trong 2 cua so rieng.
timeout /t 5 >nul
