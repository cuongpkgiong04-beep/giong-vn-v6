# -*- coding: utf-8 -*-
"""GĐ 652 / C.408 — restart service `GIONG_SMED_Agent` (máy chủ) KHI RẢNH để nạp
code builder mới (etl/sql_reports.py — tra danh mục vắc xin bỏ phân biệt hoa/thường).

Vì sao: service đang giữ module sql_reports CŨ trong RAM (job kiểm kê chạy trong
tiến trình 40_web_agent.py) → chỉ có hiệu lực sau khi restart. Agent đang chạy
chuỗi báo cáo đêm (Task_04/Task_03) nên KHÔNG được restart giữa job (bài học
GĐ 555/557: restart giữa job → job dừng giữa đường, báo done giả).

Cách làm: chờ 6 lần liên tiếp (30s/lần = 3 phút yên tĩnh) 0 job running/pending
→ xoá __pycache__ (agent, agent/api_server, agent/etl) → sc stop/start.
KHÔNG đụng api_server (tunnel Cloudflare là con của nó — GĐ 579: chỉ restart
web_agent thì URL tunnel giữ nguyên).

Dùng: python scripts/gd652_restart_agent_when_idle.py   (chạy nền được)
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
LOG = Path(r"D:/DuLieuChung/CUONG_2026/giong-vn-v6/artifacts/gd652_restart_when_idle.log")
SERVICE = "GIONG_SMED_Agent"
POLL_SEC = 30
CALM_NEEDED = 6
MAX_MINUTES = 480


def log(msg: str) -> None:
    line = f"[{time.strftime('%H:%M:%S')}] {msg}"
    print(line, flush=True)
    LOG.parent.mkdir(parents=True, exist_ok=True)
    with LOG.open("a", encoding="utf-8") as f:
        f.write(line + "\n")


def busy() -> int | None:
    # GĐ 705 — lỗi lộ thật đêm 06/11: chỉ đếm smed_pull_jobs → restart lúc 23:19
    # giữa lúc Task_03 chạy bước 15/21 (task 'running' trong scheduled_tasks KHÔNG
    # bị tính) → thread task chết → task kẹt 'running' 40% vĩnh viễn. Bổ sung
    # đếm scheduled_tasks running/pending — restart chỉ khi CẢ HÀNG ĐỢI job và
    # NHIỆM VỤ đều rảnh.
    body = json.dumps({
        "sql": "select "
               "(select count(*) from dbo.smed_pull_jobs "
               " where status in ('running','pending','queued')) as jobs, "
               "(select count(*) from dbo.scheduled_tasks "
               " where status in ('running','pending')) as tasks",
    }).encode("utf-8")
    req = urllib.request.Request(
        API, data=body,
        headers={"Content-Type": "application/json", "Authorization": "Bearer " + TOKEN},
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            row = json.loads(r.read().decode("utf-8"))["rows"][0]
            return int(row.get("jobs") or 0) + int(row.get("tasks") or 0)
    except Exception as e:  # tunnel/api tạm lỗi → coi như chưa rõ, chờ tiếp
        log(f"không đọc được hàng đợi: {str(e)[:60]}")
        return None


def svc_state() -> str:
    r = subprocess.run(["sc", "query", SERVICE], capture_output=True, text=True)
    for line in (r.stdout or "").splitlines():
        if "STATE" in line:
            return line.split(":", 1)[1].strip()
    return "?"


def main() -> None:
    log(f"bắt đầu chờ rảnh (cần {CALM_NEEDED} lần liên tiếp 0 job, {POLL_SEC}s/lần) — {svc_state()}")
    calm = 0
    deadline = time.time() + MAX_MINUTES * 60
    while time.time() < deadline:
        n = busy()
        if n == 0:
            calm += 1
            log(f"yên tĩnh {calm}/{CALM_NEEDED}")
            if calm >= CALM_NEEDED:
                break
        elif n is not None:
            if calm:
                log(f"có {n} job — đếm lại từ đầu")
            calm = 0
        time.sleep(POLL_SEC)
    else:
        log("QUÁ HẠN chờ rảnh — KHÔNG restart, cần chạy lại thủ công")
        sys.exit(2)

    log("xoá __pycache__ (agent / api_server / etl)")
    for d in (AGENT, AGENT / "api_server", AGENT / "etl"):
        pyc = d / "__pycache__"
        if pyc.is_dir():
            subprocess.run(["cmd", "/c", "rmdir", "/s", "/q", str(pyc)], capture_output=True)
    log(f"sc stop {SERVICE}")
    subprocess.run(["sc", "stop", SERVICE], capture_output=True, text=True)
    for _ in range(30):
        time.sleep(2)
        if "STOPPED" in svc_state():
            break
    log(f"sc start {SERVICE}")
    r = subprocess.run(["sc", "start", SERVICE], capture_output=True, text=True)
    time.sleep(4)
    state = svc_state()
    log(f"kết thúc — state={state} (sc start: {(r.stdout or r.stderr or '').strip()[:80]})")


if __name__ == "__main__":
    main()
