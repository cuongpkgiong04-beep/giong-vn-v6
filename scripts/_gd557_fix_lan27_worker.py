# -*- coding: utf-8 -*-
"""GĐ 557 — sửa service worker máy .27 + chuyển worker sang service KHI RẢNH.

PHÁT HIỆN (28/10 23:5x, khi deploy PA-3 xuống .27):
  · Service `GIONG_SMED_Worker` trên .27 cài SAI path:
      AppParameters = /c ...\\agent\\worker.env.bat   (KHÔNG tồn tại)
    → mỗi lần start: cmd không tìm thấy file → app thoát ngay → NSSM throttle →
    service PAUSED (log `LOG\\worker_service_err.log` đầy dòng "is not recognized").
  · Worker thực tế đang chạy là PROCESS CŨ từ **26/10 17:31** (PID khác, cha đã
    chết — phiên pilot GĐ 535) → nạp code 26/10, KHÔNG có PA-3 (GĐ 557).
  · File env ĐÚNG nằm ở `C:\\CUONG_2026\\worker-lan1\\worker-lan1.env.bat`
    (đã kiểm: WORKER_ID=lan-1 · nhóm smed · cd agent · python worker_node.py).

VIỆC SCRIPT NÀY LÀM:
  1. `reg add` sửa AppParameters → trỏ đúng `worker-lan1.env.bat` (verify lại).
  2. Chờ máy RẢNH: 3 lần liên tiếp (20s/lần) 0 job `running/pending` claimed_by
     'lan-1' — KHÔNG cắt job đang chạy (bài học ca 27/10 mất 16 TT — GĐ 555).
  3. Kill worker CŨ (theo commandline `worker_node.py`, KHÔNG kill process khác)
     → `sc start GIONG_SMED_Worker` → verify RUNNING + process mới + log mới.
  Nếu `sc start` fail vì UAC → in rõ cách làm tay.

Dùng: python scripts/_gd557_fix_lan27_worker.py   (chạy nền được)
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
ENV_BAT = r"C:\CUONG_2026\worker-lan1\worker-lan1.env.bat"
SVC = "GIONG_SMED_Worker"
MAX_HOURS = 5.0


def ssh_ps(script: str, timeout: int = 120):
    """Chạy PowerShell script qua STDIN (tránh giới hạn 8191 ký tự + quoting cmd)."""
    return subprocess.run(
        ["sshpass", "-p", PASS, "ssh", "-o", "StrictHostKeyChecking=no",
         "-o", "ConnectTimeout=10", "-o", "BatchMode=yes", f"{USER}@{HOST}",
         "powershell -NoProfile -Command -"],
        input=script.encode("utf-8"), capture_output=True, timeout=timeout)


def clean(txt) -> str:
    if isinstance(txt, (bytes, bytearray)):
        txt = bytes(txt).decode("utf-8", "replace")
    return "\n".join(l for l in (txt or "").splitlines()
                     if not any(k in l for k in ("post-quantum", "store now", "upgraded")))


def busy_lan1() -> int:
    body = json.dumps({
        "sql": "select count(*) as n from smed_pull_jobs "
               "where status in ('running','pending') and claimed_by = 'lan-1'",
        "limit": 3}).encode()
    req = urllib.request.Request(API, data=body, headers={
        "Authorization": f"Bearer {TOKEN}", "content-type": "application/json"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return int(json.load(r)["rows"][0]["n"])


def main() -> int:
    # 1) Sửa AppParameters của service → đúng file env
    print("① Sửa AppParameters service → worker-lan1.env.bat …", flush=True)
    r = ssh_ps(f'''
$p = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\{SVC}\\Parameters"
Set-ItemProperty -Path $p -Name AppParameters -Value "/c {ENV_BAT}" -ErrorAction Stop
Get-ItemProperty -Path $p | Select-Object AppParameters | Format-List
''')
    out = clean((r.stdout or "") + (r.stderr or ""))
    print(f"  exit={r.returncode}\n{out[-500:]}", flush=True)
    if "worker-lan1.env.bat" not in out:
        print("❌ Không sửa được registry (UAC?) — cần làm tay: Set-ItemProperty HKLM:...Parameters AppParameters '/c " + ENV_BAT + "'", flush=True)
        return 1

    # 2) Chờ rảnh
    print("② Chờ máy .27 rảnh (3×20s 0 job lan-1)…", flush=True)
    calm, deadline = 0, time.time() + MAX_HOURS * 3600
    while time.time() < deadline:
        try:
            n = busy_lan1()
        except Exception as e:
            print(f"  ⚠️ poll lỗi: {str(e)[:100]}", flush=True)
            time.sleep(30)
            continue
        if n == 0:
            calm += 1
            print(f"  · rảnh {calm}/3", flush=True)
            if calm >= 3:
                break
        else:
            calm = 0
            print(f"  · {n} job lan-1 đang chạy — chờ", flush=True)
        time.sleep(20)
    else:
        print("❌ Hết hạn — chưa restart (làm tay khi rảnh).", flush=True)
        return 1

    # 3) Kill worker CŨ (chỉ process worker_node.py) + start service
    print("③ Kill worker cũ + start service …", flush=True)
    r2 = ssh_ps(f'''
Get-CimInstance Win32_Process -Filter "Name = 'python.exe'" |
  Where-Object {{ $_.CommandLine -like '*worker_node.py*' }} |
  ForEach-Object {{ Write-Output ("kill PID " + $_.ProcessId); Stop-Process -Id $_.ProcessId -Force }}
Start-Sleep -Seconds 3
sc.exe start {SVC} | Out-Null
Start-Sleep -Seconds 25
sc.exe query {SVC} | Select-String "STATE"
Get-CimInstance Win32_Process -Filter "Name = 'python.exe'" |
  Where-Object {{ $_.CommandLine -like '*worker_node.py*' }} |
  ForEach-Object {{ Write-Output ("worker moi PID " + $_.ProcessId + " | " + $_.CommandLine) }}
''')
    out2 = clean((r2.stdout or "") + (r2.stderr or ""))
    print(f"  exit={r2.returncode}\n{out2[-800:]}", flush=True)

    time.sleep(30)
    lg = ssh_ps('Get-ChildItem "C:\\CUONG_2026\\giong-vn-v6-agent-lan\\giong-apps\\apps\\banhang\\agent\\LOG\\web_agent_*.log" | Sort-Object LastWriteTime -Descending | Select-Object -First 1 -ExpandProperty Name')
    print("  log worker mới nhất:", clean(lg.stdout).strip()[:140], flush=True)
    if "RUNNING" in out2.upper() and "worker moi PID" in out2:
        print("✅ Worker .27 giờ chạy qua SERVICE (ẩn, tự chạy khi reboot) + đã nạp code GĐ 557.", flush=True)
        return 0
    print("⚠️ Cần kiểm tra thêm: xem LOG\\worker_service_err.log + trạng thái service.", flush=True)
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
