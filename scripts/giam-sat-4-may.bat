@echo off
chcp 65001 >nul
title GIONG - Giam sat 4 may tram
cd /d D:\DuLieuChung\CUONG_2026\giong-vn-v6
echo Dang theo doi 4 may tram (tu lam moi 30 giay). Dong cua so nay de dung.
echo.
python scripts\monitor_4_machines.py --loop --interval 30
echo.
echo (Da dung) Bam phim bat ky de dong...
pause >nul
