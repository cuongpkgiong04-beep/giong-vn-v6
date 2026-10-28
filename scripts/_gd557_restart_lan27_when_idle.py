# -*- coding: utf-8 -*-
"""GĐ 557 (Trợ lý Freebuff) — restart worker máy LAN .27 KHI RẢNH để nạp code mới.

Vì sao: PA-3 (tự rà soát + tự bù thiếu file) nằm trong `40_web_agent.py` + 4 tool
SMED — đã copy xuống `.27` (C:\\CUONG_2026\\giong-vn-v6-agent-lan\\...) nhưng worker
đang CHẠY (process đã nạp code CŨ vào RAM) → chỉ có hiệu lực sau khi restart
service `GIONG_SMED_Worker`.

⚠️ KHÔNG restart khi đang có job: ca 27/10 (GĐ 555) worker bị restart giữa job
bkccn → job dừng sau 3/19 file + agent báo done giả → mất dữ liệu 16 TT. Script
này chờ **3 lần liên tiếp (20s/lần) 0 job running/pending claimed_by='lan-1'**
rồi mới restart (khung nghỉ giữa 2 bước Task_02 là đủ an toàn — job kế tiếp sẽ
chạy bằng code MỚI).

Nếu `sc start` bị UAC chặn → watchdog task GĐ 548 (TimeTrigger 5') tự start lại.

Dùng: python scripts/_gd557_restart_lan27_when_idle.py   (chạy nền được)
"""
import json
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

AGENT = Path(r"D:/DuLieuChung/CUONG_2026/giong-vn-v6/giong-apps/apps/banhang/agent")
TOKEN = (AGENT / ".secrets/agent_token.txt").read_text(encoding="utf-8").strip()
API = "http://127.0.0.1:8777/db/query"
HOST, USER, PASS = "192.168.1.27", "phamcuong", "123"
MAX_HOURS = 4.0
POLL_SEC = 20
CALM_NEEDED = 3


def busy_lan1() -> int:
    body = json.dumps({
        "sql": "select count(*) as n from smed_pull_jobs "
               "where status in ('running','pending') and claimed_by = 'lan-1'",
        "limit": 3,
    }).encode()
    req = urllib.request.Request(API, data=body, headers={
        "Authorization": f"Bearer {TOKEN}", "content-type": "application/json"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return int(json.load(r)["rows"][0]["n"])


def ssh(cmd: str, timeout: int = 120):
    return subprocess.run(
        ["sshpass", "-p", PASS, "ssh", "-o", "StrictHostKeyChecking=no",
         "-o", "ConnectTimeout=10", f"{USER}@{HOST}", cmd],
        capture_output=True, text=True, timeout=timeout)


def main() -> int:
    deadline = time.time() + MAX_HOURS * 3600
    calm = 0
    print(f"⏳ Chờ máy .27 rảnh ({CALM_NEEDED} lần liên tiếp 0 job lan-1)…", flush=True)
    while time.time() < deadline:
        try:
            n = busy_lan1()
        except Exception as e:  # mạng/DB chớp — thử lại
            print(f"  ⚠️ poll lỗi: {str(e)[:120]}", flush=True)
            time.sleep(30)
            continue
        if n == 0:
            calm += 1
            print(f"  · rảnh {calm}/{CALM_NEEDED}", flush=True)
            if calm >= CALM_NEEDED:
                break
        else:
            calm = 0
            print(f"  · đang có {n} job lan-1 — chờ tiếp", flush=True)
        time.sleep(POLL_SEC)
    else:
        print("❌ HẾT HẠN 4h mà máy .27 vẫn bận — KHÔNG restart (làm tay sau).", flush=True)
        return 1

    print("🔁 Máy .27 rảnh → restart GIONG_SMED_Worker…", flush=True)
    r = ssh('sc stop GIONG_SMED_Worker & ping -n 8 127.0.0.1 >nul & sc start GIONG_SMED_Worker')
    out = (r.stdout or "") + (r.stderr or "")
    out = "\n".join(l for l in out.splitlines()
                    if not any(k in l for k in ("post-quantum", "store now", "upgraded")))
    print(f"  exit={r.returncode}\n{out[-700:]}", flush=True)

    time.sleep(50)
    q = ssh('sc query GIONG_SMED_Worker | findstr /i "STATE"', timeout=60)
    print("  trạng thái service:", (q.stdout or "").strip()[:200], flush=True)
    lg = ssh('powershell -NoProfile -Command "Get-ChildItem C:\\CUONG_2026\\giong-vn-v6-agent-lan\\giong-apps\\apps\\banhang\\agent\\LOG\\web_agent_*.log | Sort-Object LastWriteTime -Descending | Select-Object -First 1 -ExpandProperty Name"', timeout=60)
    print("  log worker mới nhất:", (lg.stdout or "").strip()[:120], flush=True)
    if "RUNNING" not in (q.stdout or "").upper():
        print("⚠️ Service chưa RUNNING — watchdog GĐ 548 (5') sẽ tự start; kiểm lại sau.", flush=True)
        return 2
    print("✅ Đã restart worker .27 — code GĐ 557 (tự bù thiếu file) có hiệu lực từ job kế tiếp.", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
