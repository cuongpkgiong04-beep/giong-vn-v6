# -*- coding: utf-8 -*-
"""Theo dõi tự động 4 máy LAN + máy chủ — Worker Service + Icon khay + Job đang chạy.

Máy theo dõi (IP cố định đã verify):
  - Máy chủ (GIONGPC)         : 192.168.1.250  — worker=core    · icon khay ✓
  - GIANGKT (.245)            : 192.168.1.245  — worker=giangkt · icon khay ✓
  - THANH-PC (cũ .34 → .11)   : 192.168.1.11   — worker=thanh-pc · icon khay ✓
  - PC-PKT-01 (cũ .27 → .14)  : 192.168.1.14   — worker=lan-1   · icon khay CHƯA BẬT

Nguồn dữ liệu:
  - Worker Service: query GiongDB qua api_server máy chủ (port 8777) + SSH check service
  - Icon khay: SSH check process python lan_tray.py (session user, KHÔNG session 0)
  - Job đang chạy: smed_pull_jobs (claimed_by = worker_id)
  - Nhịp tim (GĐ 689): bảng worker_heartbeat — api_server ghi mỗi lần worker poll
    claim 20 giây/lần (KỂ CẢ khi rảnh) → biết máy đang BẬT hay đã mất kết nối.

Dùng: python scripts/monitor_4_machines.py [--loop] [--interval 30]

GĐ 689/C.436 sửa 2 lỗi hiển thị (Đại ca báo 05/11):
  (1) máy chủ bị báo "UNKNOWN" — script hỏi service GIONG_SMED_Worker nhưng máy chủ
      chạy service GIONG_SMED_Agent → nay mỗi máy có service_name riêng.
  (2) job dạng xuất kho in "532/19 2800%" — done_centers của job tải dữ liệu không
      cùng nghĩa total_centers → nay kẹp 0-100% và nêu rõ 2 số thô.
"""
import argparse
import json
import subprocess
import sys
import time
import urllib.request
from datetime import datetime
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# ========== CẤU HÌNH 4 MÁY ==========
MACHINES = [
    {
        "name": "MÁY CHỦ (GIONGPC)",
        "ip": "192.168.1.250",
        "user": "Administrator",
        "worker_id": "core",
        "service_name": "GIONG_SMED_Agent",  # GĐ 689: máy chủ chạy AGENT (không phải Worker)
        "agent_dir": r"C:\CUONG_2026\giong-agent",
        "has_tray": True,
        "tray_worker_id": "core",
        "ssh_password": None,  # máy chủ chạy local, không SSH
    },
    {
        "name": "GIANGKT",
        "ip": "192.168.1.245",
        "user": "ADMIN",
        "worker_id": "giangkt",
        "service_name": "GIONG_SMED_Worker",
        "agent_dir": r"C:\CUONG_2026\giong-agent",
        "has_tray": True,
        "tray_worker_id": "giangkt",
        "ssh_password": None,  # SSH key-based
    },
    {
        "name": "THANH-PC (cũ .34)",
        "ip": "192.168.1.11",
        "user": "admin-pc",
        "worker_id": "thanh-pc",
        "service_name": "GIONG_SMED_Worker",
        "agent_dir": r"C:\CUONG_2026\giong-agent",
        "has_tray": True,
        "tray_worker_id": "thanh-pc",
        "ssh_password": None,  # SSH key-based
    },
    {
        "name": "PC-PKT-01 (cũ .27)",
        "ip": "192.168.1.14",
        "user": "phamcuong",
        "worker_id": "lan-1",
        "service_name": "GIONG_SMED_Worker",
        "agent_dir": r"C:\CUONG_2026\giong-vn-v6-agent-lan\giong-apps\apps\banhang\agent",
        "has_tray": False,  # CHƯA BẬT icon khay
        "tray_worker_id": "lan-1",
        "ssh_password": "123",  # cần password
    },
]

API_SERVER = "http://127.0.0.1:8777"
AGENT_TOKEN_PATH = Path(r"D:/DuLieuChung/CUONG_2026/giong-vn-v6/giong-apps/apps/banhang/agent/.secrets/agent_token.txt")
API_TOKEN_PATH = Path(r"D:/DuLieuChung/CUONG_2026/giong-vn-v6/giong-apps/apps/banhang/agent/api_server/.secrets/api_token.txt")


def get_api_token() -> str:
    return API_TOKEN_PATH.read_text(encoding="utf-8").strip()


def query_jobs(worker_id: str) -> list:
    """Lấy job running/pending/waitdownload của worker từ GiongDB qua api_server."""
    sql = f"""
    SELECT id, report, status, date_from, date_to, done_centers, total_centers, created_by, created_at
    FROM dbo.smed_pull_jobs
    WHERE status IN ('running','pending','waitdownload') AND claimed_by = '{worker_id}'
    ORDER BY CASE WHEN status='running' THEN 0 WHEN status='pending' THEN 1 ELSE 2 END, created_at DESC
    """
    body = json.dumps({"text": sql, "params": []}).encode()
    req = urllib.request.Request(
        f"{API_SERVER}/query",
        data=body,
        headers={"Content-Type": "application/json", "x-api-token": get_api_token()},
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            data = json.loads(r.read().decode())
            return data.get("rows", [])
    except Exception as e:
        return [{"error": str(e)}]


def query_heartbeats() -> dict:
    """GĐ 689 — nhịp tim mọi máy (worker_heartbeat): {worker_id: {...}}.

    api_server ghi bảng này mỗi lần worker poll /agent/claim (20 giây/lần, kể cả
    khi rảnh). Bảng có thể CHƯA tồn tại (api_server chưa nạp code GĐ 689) → trả {}
    để script vẫn chạy bình thường.
    """
    sql = """
    SELECT worker_id, groups, ip,
           CONVERT(varchar(19), last_seen, 120) AS last_seen
    FROM dbo.worker_heartbeat
    """
    body = json.dumps({"text": sql, "params": []}).encode()
    req = urllib.request.Request(
        f"{API_SERVER}/query",
        data=body,
        headers={"Content-Type": "application/json", "x-api-token": get_api_token()},
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            rows = json.loads(r.read().decode()).get("rows", [])
        return {str(x.get("worker_id", "")).lower(): x for x in rows}
    except Exception:
        return {}


def heartbeat_label(hb: dict, worker_id: str) -> str:
    """Nhãn nhịp tim 1 máy: '12s' / '3 phút' / 'CHƯA CÓ'. Quá 2 phút = mất kết nối."""
    row = hb.get(worker_id) if hb else None
    if not row or not row.get("last_seen"):
        return "CHƯA CÓ"
    try:
        t = datetime.strptime(str(row["last_seen"])[:19], "%Y-%m-%d %H:%M:%S")
    except Exception:
        return "?"
    sec = max(0, int((datetime.now() - t).total_seconds()))
    if sec <= 120:
        return f"{sec}s" if sec < 60 else f"{sec // 60} phút"
    if sec < 3600:
        return f"⚠️ {sec // 60} phút"  # > 2 phút = mất kết nối
    return f"⚠️ {sec // 3600} giờ"


def check_worker_service_local(machine: dict) -> dict:
    """Kiểm tra service của MÁY CHỦ (local) — GĐ 689: tên service theo TỪNG máy
    (máy chủ chạy GIONG_SMED_Agent — hỏi GIONG_SMED_Worker là sai → 'UNKNOWN')."""
    svc = machine.get("service_name", "GIONG_SMED_Worker")
    try:
        r = subprocess.run(
            ["sc", "query", svc],
            capture_output=True, text=True, timeout=10
        )
        out = r.stdout + r.stderr
        status = "UNKNOWN"
        for line in out.splitlines():
            if "STATE" in line:
                if "RUNNING" in line:
                    status = "RUNNING"
                elif "STOPPED" in line:
                    status = "STOPPED"
                elif "PAUSED" in line:
                    status = "PAUSED"
                elif "START_PENDING" in line:
                    status = "START_PENDING"
                break
        # Lấy PID process worker_node.py
        r2 = subprocess.run(
            ["tasklist", "/FI", "IMAGENAME eq python.exe", "/FO", "CSV"],
            capture_output=True, text=True, timeout=10
        )
        pid = None
        for line in r2.stdout.splitlines():
            if "worker_node.py" in line:
                parts = line.split(",")
                if len(parts) >= 2:
                    pid = parts[1].strip('"')
                break
        return {"status": status, "pid": pid, "raw": out.strip()[:200]}
    except Exception as e:
        return {"status": "ERROR", "error": str(e)}


def check_worker_service_ssh(machine: dict) -> dict:
    """Kiểm tra service worker trên máy LAN qua SSH — GĐ 689: tên service theo
    machine['service_name'] (máy LAN = GIONG_SMED_Worker)."""
    svc = machine.get("service_name", "GIONG_SMED_Worker")
    try:
        if machine["ssh_password"]:
            # Dùng sshpass
            cmd = ["sshpass", "-p", machine["ssh_password"],
                   "ssh", "-o", "ConnectTimeout=5", "-o", "BatchMode=no",
                   "-o", "StrictHostKeyChecking=no",
                   f"{machine['user']}@{machine['ip']}",
                   f"sc query {svc}"]
        else:
            # SSH key-based
            cmd = ["ssh", "-o", "ConnectTimeout=5", "-o", "BatchMode=yes",
                   "-o", "StrictHostKeyChecking=no",
                   f"{machine['user']}@{machine['ip']}",
                   f"sc query {svc}"]

        r = subprocess.run(cmd, capture_output=True, text=True, timeout=15)
        out = r.stdout + r.stderr
        status = "UNKNOWN"
        for line in out.splitlines():
            if "STATE" in line:
                if "RUNNING" in line:
                    status = "RUNNING"
                elif "STOPPED" in line:
                    status = "STOPPED"
                elif "PAUSED" in line:
                    status = "PAUSED"
                elif "START_PENDING" in line:
                    status = "START_PENDING"
                break

        # Check process worker_node.py
        if machine["ssh_password"]:
            cmd2 = ["sshpass", "-p", machine["ssh_password"],
                    "ssh", "-o", "ConnectTimeout=5", "-o", "BatchMode=no",
                    "-o", "StrictHostKeyChecking=no",
                    f"{machine['user']}@{machine['ip']}",
                    "tasklist /FI \"IMAGENAME eq python.exe\" /FO CSV"]
        else:
            cmd2 = ["ssh", "-o", "ConnectTimeout=5", "-o", "BatchMode=yes",
                    "-o", "StrictHostKeyChecking=no",
                    f"{machine['user']}@{machine['ip']}",
                    "tasklist /FI \"IMAGENAME eq python.exe\" /FO CSV"]

        r2 = subprocess.run(cmd2, capture_output=True, text=True, timeout=15)
        pid = None
        for line in r2.stdout.splitlines():
            if "worker_node.py" in line:
                parts = line.split(",")
                if len(parts) >= 2:
                    pid = parts[1].strip('"')
                break

        return {"status": status, "pid": pid, "raw": out.strip()[:200]}
    except Exception as e:
        return {"status": "ERROR", "error": str(e)}


def check_tray_icon_ssh(machine: dict) -> dict:
    """Kiểm tra icon khay (lan_tray.py) đang chạy trên session user (KHÔNG session 0)."""
    if not machine["has_tray"]:
        return {"status": "NOT_ENABLED", "note": "Icon khay chưa bật trên máy này"}

    try:
        if machine["ssh_password"]:
            cmd = ["sshpass", "-p", machine["ssh_password"],
                   "ssh", "-o", "ConnectTimeout=5", "-o", "BatchMode=no",
                   "-o", "StrictHostKeyChecking=no",
                   f"{machine['user']}@{machine['ip']}",
                   "tasklist /FI \"IMAGENAME eq python.exe\" /FO CSV /V"]
        else:
            cmd = ["ssh", "-o", "ConnectTimeout=5", "-o", "BatchMode=yes",
                   "-o", "StrictHostKeyChecking=no",
                   f"{machine['user']}@{machine['ip']}",
                   "tasklist /FI \"IMAGENAME eq python.exe\" /FO CSV /V"]

        r = subprocess.run(cmd, capture_output=True, text=True, timeout=15)
        # Tìm process lan_tray.py ở session Console (user), không phải Services
        for line in r.stdout.splitlines():
            if "lan_tray.py" in line and "Console" in line:
                parts = line.split(",")
                pid = parts[1].strip('"') if len(parts) >= 2 else "?"
                session = "Console"
                for p in parts:
                    if "Console" in p or "Services" in p:
                        session = p.strip('"')
                        break
                return {"status": "RUNNING", "pid": pid, "session": session}

        # Có process lan_tray nhưng ở session 0 (Services) → VÔ HÌNH
        for line in r.stdout.splitlines():
            if "lan_tray.py" in line and "Services" in line:
                parts = line.split(",")
                pid = parts[1].strip('"') if len(parts) >= 2 else "?"
                return {"status": "INVISIBLE (session 0)", "pid": pid, "session": "Services",
                        "note": "Thiếu /it khi tạo task → icon không hiện trên khay"}

        return {"status": "NOT_RUNNING", "note": "Không thấy process lan_tray.py"}
    except Exception as e:
        return {"status": "ERROR", "error": str(e)}


def check_tray_icon_local() -> dict:
    """Kiểm tra icon khay trên máy chủ (local)."""
    try:
        r = subprocess.run(
            ["tasklist", "/FI", "IMAGENAME eq python.exe", "/FO", "CSV", "/V"],
            capture_output=True, text=True, timeout=10
        )
        for line in r.stdout.splitlines():
            if "lan_tray.py" in line and "Console" in line:
                parts = line.split(",")
                pid = parts[1].strip('"') if len(parts) >= 2 else "?"
                return {"status": "RUNNING", "pid": pid, "session": "Console"}
        for line in r.stdout.splitlines():
            if "lan_tray.py" in line:
                parts = line.split(",")
                pid = parts[1].strip('"') if len(parts) >= 2 else "?"
                return {"status": "INVISIBLE (session 0)", "pid": pid, "session": "Services"}
        return {"status": "NOT_RUNNING"}
    except Exception as e:
        return {"status": "ERROR", "error": str(e)}


def print_header():
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"\n{'='*118}")
    print(f"📊 THEO DÕI 4 MÁY — {now}")
    print(f"{'='*118}")
    print(f"{'MÁY':<25} {'IP':<16} {'WORKER':<10} {'NHỊP TIM':<10} {'SERVICE':<12} {'PID':<8} {'ICON KHAY':<18} {'JOB ĐANG CHẠY'}")
    print(f"{'-'*118}")


def print_machine(machine: dict, svc: dict, tray: dict, jobs: list, hb: dict | None = None):
    name = machine["name"]
    ip = machine["ip"]
    worker = machine["worker_id"]

    svc_status = svc.get("status", "?")
    pid = svc.get("pid", "-") or "-"
    if "error" in svc:
        svc_status = f"ERR({svc['error'][:20]})"

    tray_status = tray.get("status", "?")
    if tray_status == "RUNNING":
        tray_disp = f"🟢 RUNNING (PID {tray.get('pid','?')})"
    elif tray_status == "INVISIBLE (session 0)":
        tray_disp = f"🔴 INVISIBLE (session 0)"
    elif tray_status == "NOT_ENABLED":
        tray_disp = "⚪ CHƯA BẬT"
    elif tray_status == "NOT_RUNNING":
        tray_disp = "🔴 ĐANG TẮT"
    else:
        tray_disp = f"❓ {tray_status}"

    # Job đang chạy — GĐ 689 (lỗi 2): done_centers của job TẢI DỮ LIỆU không cùng
    # nghĩa total_centers (từng in "532/19 2800%") → KẸP 0-100% và nêu rõ 2 số thô.
    if jobs and "error" not in jobs[0]:
        job_strs = []
        for j in jobs[:3]:  # chỉ hiện tối đa 3 job
            rpt = j.get("report", "?")[:20]
            st = j.get("status", "?")[:3]
            done = j.get("done_centers", 0) or 0
            total = j.get("total_centers", 0) or 0
            if total > 1:
                pct = f"{min(100, max(0, int(done * 100 / total)))}%"
                job_strs.append(f"{rpt}({st}) {done}/{total} {pct}")
            else:
                job_strs.append(f"{rpt}({st}) {done} mục")
        job_disp = " | ".join(job_strs)
    elif jobs and "error" in jobs[0]:
        job_disp = f"❌ LỖI TRUY VẤN: {jobs[0]['error'][:40]}"
    else:
        job_disp = "💤 RẢNH"

    hb_disp = heartbeat_label(hb or {}, worker)
    print(f"{name:<25} {ip:<16} {worker:<10} {hb_disp:<10} {svc_status:<12} {pid:<8} {tray_disp:<18} {job_disp}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--loop", action="store_true", help="chạy liên tục")
    ap.add_argument("--interval", type=int, default=30, help="khoảng cách giây (mặc định 30)")
    a = ap.parse_args()

    while True:
        print_header()
        # GĐ 689 — nhịp tim mọi máy (1 query/vòng, dùng cho cả 4 dòng)
        hb = query_heartbeats()

        for machine in MACHINES:
            # 1. Job đang chạy
            jobs = query_jobs(machine["worker_id"])

            # 2. Worker Service
            if machine["ip"] == "192.168.1.250":
                svc = check_worker_service_local(machine)
                tray = check_tray_icon_local()
            else:
                svc = check_worker_service_ssh(machine)
                tray = check_tray_icon_ssh(machine)

            # 3. In kết quả
            print_machine(machine, svc, tray, jobs, hb)

        print(f"{'-'*118}")
        print(f"Chú thích: 🟢=OK · 🔴=Lỗi/Cần xử lý · ⚪=Chưa bật · ❓=Không rõ")
        print(f"Nhịp tim: giây kể từ lần máy 'xin việc' cuối (20s/lần) — quá 2 phút = ⚠️ mất kết nối · CHƯA CÓ = api_server chưa nạp bản ghi nhịp")
        print(f"Icon khay 'INVISIBLE (session 0)' = task thiếu /it → không hiện trên khay hệ thống")

        if not a.loop:
            break

        print(f"\n⏳ Chờ {a.interval}s cho vòng lặp tiếp theo... (Ctrl+C để dừng)")
        time.sleep(a.interval)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n👋 Đã dừng theo dõi.")