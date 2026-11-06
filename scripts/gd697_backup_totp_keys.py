# -*- coding: utf-8 -*-
"""GĐ 697 — SAO LƯU 3 khoá ỨNG DỤNG XÁC THỰC (TOTP) của 3 tài khoản MISA ra ngoài repo
(ổ D, KHÔNG nằm trong git) để phòng mất máy/khôi phục.

  python scripts/gd697_backup_totp_keys.py [--show-masked]

Ghi file: D:\DuLieuChung\CUONG_2026\_secrets-misa-totp\misa_totp_backup_<ngay>.txt
Chỉ in khoá ĐÃ CHE (không in khoá thật ra màn hình/chat)."""
import argparse
import datetime as dt
import subprocess
import sys
from pathlib import Path

SERVER_KEY = Path(r"D:/DuLieuChung/CUONG_2026/giong-vn-v6/giong-apps/apps/banhang/agent/.secrets/misa_totp.txt")
LAN = {
    "GIANGKT (.245) mrhungtm3@gmail.com": ("ADMIN@192.168.1.245", r"C:\CUONG_2026\giong-agent\.secrets\misa_totp.txt"),
    "THANH-PC (.11) thuygiongvn290790@gmail.com": ("admin-pc@192.168.1.11", r"C:\CUONG_2026\giong-agent\.secrets\misa_totp.txt"),
}
OUT_DIR = Path(r"D:/DuLieuChung/CUONG_2026/_secrets-misa-totp")


def mask(k: str) -> str:
    return (k[:4] + "…" + k[-4:] + f" ({len(k)} ký tự)") if len(k) > 10 else "…"


def read_remote(user_host: str, path: str) -> str:
    r = subprocess.run(["ssh", "-o", "BatchMode=yes", "-o", "StrictHostKeyChecking=no",
                        user_host, f"type {path}"], capture_output=True, text=True, timeout=90)
    out = "".join(r.stdout.split())
    if not out:
        out = "".join(r.stderr.split()[:1])
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--show-masked", action="store_true")
    a = ap.parse_args()
    keys = {}
    if SERVER_KEY.exists():
        keys["MÁY CHỦ (.250) cuongpk.giong01@gmail.com"] = SERVER_KEY.read_text(encoding="utf-8").strip()
    for label, (host, path) in LAN.items():
        keys[label] = read_remote(host, path)
    lines = [
        "# SAO LƯU KHÓA ỨNG DỤNG XÁC THỰC (TOTP) — MISA AMIS — GIONG VIETNAM",
        f"# Tạo lúc: {dt.datetime.now():%d/%m/%Y %H:%M} (GĐ 697)",
        "# Dùng: dán khoá vào .secrets/misa_totp.txt trên máy tương ứng, hoặc thêm vào",
        "#       Google Authenticator (Thêm khoá thiết lập) để tự đọc mã khi cần.",
        "# KHÓA NÀY = CHÌA KHOÁ ĐĂNG NHẬP TỰ ĐỘNG — KHÔNG commit, KHÔNG gửi qua chat/email.",
        "",
    ]
    for label, k in keys.items():
        lines.append(f"{label}")
        lines.append(f"  {k}")
        lines.append("")
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out = OUT_DIR / f"misa_totp_backup_{dt.datetime.now():%Y%m%d_%H%M}.txt"
    out.write_text("\n".join(lines), encoding="utf-8")
    print("đã ghi:", out)
    for label, k in keys.items():
        print("   ", label, "→", mask(k))
    if any("Error" in k or "không" in k for k in keys.values()):
        print("⚠️ có mục đọc lỗi — kiểm tra lại")


main()
