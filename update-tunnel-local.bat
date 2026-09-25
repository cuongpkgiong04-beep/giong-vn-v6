# =====================================================================
# GIONG VN — CẬP NHẬT TUNNEL URL CHO LOCAL (bấm đúp khi app báo lỗi dữ liệu)
#
# Quick Tunnel đổi URL mỗi lần server/tunnel restart. 2 app local đọc URL
# từ file .env.local — script này lấy URL MỚI NHẤT từ GitHub Gist ghi vào.
# Xong rồi mở lại 2 cửa sổ app (start-local.bat).
# =====================================================================
@echo off
chcp 65001 >nul
title GIONG VN - Cap nhat tunnel URL

echo.
echo  Dang lay URL tunnel moi nhat tu GitHub Gist...
cd /d D:\DuLieuChung\CUONG_2026\giong-vn-v6

python -X utf8 -c "import urllib.request,json,re; d=json.loads(urllib.request.urlopen(urllib.request.Request('https://api.github.com/gists/db3dae34ac285bc7935a72f365cb0d21',headers={'User-Agent':'giong'}),timeout=15).read()); m=re.search(r'base_url:\s*(\S+)', d['files']['giong-tunnel-gist.txt']['content']); url=m.group(1); print('URL moi:',url); [open(p,'w',encoding='utf-8',newline='').write('\n'.join((l if not l.startswith('TUNNEL_API_BASE_URL=') else 'TUNNEL_API_BASE_URL='+url) for l in open(p,encoding='utf-8').read().splitlines())+'\n') for p in ('.env.local','giong-apps/apps/banhang/.env.local') if __import__('os').path.exists(p)]; print('Da cap nhat 2 file .env.local (file nao co TUNNEL_API_BASE_URL)')"

echo.
echo  Xong! Neu URL tren khong in ra hoac bao loi — bao tro ly biet.
echo  Bay gio DONG 2 cua so app va chay lai start-local.bat
echo.
pause
