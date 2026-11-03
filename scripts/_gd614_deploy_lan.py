# -*- coding: utf-8 -*-
"""GĐ 614 — deploy file agent (bản ĐÃ COMMIT 14304d9) xuống 3 máy LAN.

File theo vai trò từng máy:
  · .27 (PC-PKT-01 · worker lan-1 · nhóm smed): 40_web_agent.py · smed_api.py · _pa1_fetch.py
    — PA-1 giờ chạy thêm 4 phân hệ (dtthc/blth/tkgvvxdt/tkkh) + PASSWORD đọc .secrets.
  · .245 (GIANGKT · giangkt · misa-muahang): 40_web_agent.py · misa_muahang_api.py ·
    misa_xuatkho_import.py · misa_xuatkho_api_run.py — MISA_UPLOAD_MODE http mặc định
    + lượt có "Phiếu cần xử lý" tự quay về Chrome.
  · .34 (THANH-PC · thanh-pc · misa-banhang): 40_web_agent.py · misa_banhang_api.py
    — nhánh HTTP thuần cho SA (MISA_UPLOAD_MODE mặc định http, hỏng phiên tự rơi
    về Chrome).

Chỉ lấy nội dung COMMIT — KHÔNG lấy working tree (đang có bài dở phiên khác:
etl/sql_reports.py GĐ 615 + src/lib/danh-muc-vaccine.ts… không được deploy).
Truyền: SSH + PowerShell qua STDIN (base64) — bài học GĐ 548/563 (.34 không SFTP,
cmd.exe giới hạn 8191 ký tự).

Dùng: python scripts/_gd614_deploy_lan.py [--check] [--machine 27|245|34|all]
"""
import argparse
import base64
import hashlib
import subprocess
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = Path(r"D:/DuLieuChung/CUONG_2026/giong-vn-v6")
REPO_CON = REPO / "giong-apps"
HEAD = ""          # trống = lấy HEAD hiện tại của repo con (GĐ 649 PA-2 deploy)
COMMON = ["40_web_agent.py"]
BY_MACHINE = {
    "14": ["smed_api.py", "_pa1_fetch.py"],
    "245": ["misa_muahang_api.py", "misa_xuatkho_import.py", "misa_xuatkho_api_run.py",
            "misa_upload_line.py"],           # GĐ 649 PA-2 — bảng chuẩn MISA
    "11": ["misa_banhang_api.py", "misa_upload_line.py"],   # GĐ 649 PA-2
}
MACHINES = {
    "14": dict(host="192.168.1.14", user="phamcuong",
               agentdir=r"C:\CUONG_2026\giong-vn-v6-agent-lan\giong-apps\apps\banhang\agent",
               worker="lan-1"),
    "245": dict(host="192.168.1.245", user="ADMIN",
                agentdir=r"C:\CUONG_2026\giong-agent", worker="giangkt"),
    "11": dict(host="192.168.1.11", user="admin-pc",
               agentdir=r"C:\CUONG_2026\giong-agent", worker="thanh-pc"),
}


def stage(files: list) -> dict:
    head = HEAD or subprocess.run(["git", "-C", str(REPO_CON), "rev-parse", "HEAD"],
                                  capture_output=True, text=True).stdout.strip()
    out = {}
    for f in files:
        blob = subprocess.run(["git", "-C", str(REPO_CON), "show",
                               f"{head}:apps/banhang/agent/{f}"], capture_output=True)
        if blob.returncode != 0:
            raise RuntimeError(f"không lấy được {f} từ {head}")
        out[f] = blob.stdout
    return out


def ssh(m, script, timeout=180):
    r = subprocess.run(
        ["ssh", "-o", "ConnectTimeout=8", "-o", "BatchMode=yes",
         "-o", "StrictHostKeyChecking=no", f"{m['user']}@{m['host']}",
         "powershell -NoProfile -Command -"],
        input=script.encode("utf-8"), capture_output=True, timeout=timeout)
    out = (r.stdout or b"").decode("utf-8", "replace") + (r.stderr or b"").decode("utf-8", "replace")
    return r.returncode, "\n".join(
        l for l in out.splitlines()
        if not any(k in l for k in ("post-quantum", "store now", "upgraded")))


def check_idle(m):
    import pyodbc
    conn = pyodbc.connect("DRIVER={ODBC Driver 18 for SQL Server};Server=localhost;"
                          "Database=GiongDB;Trusted_Connection=yes;Encrypt=no;", timeout=10)
    cur = conn.cursor()
    cur.execute("""SELECT COUNT(*) FROM dbo.smed_pull_jobs
                   WHERE status IN ('running','pending') AND claimed_by = ?""", m["worker"])
    n = cur.fetchone()[0]
    conn.close()
    return n


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true", help="chỉ khảo sát, không copy")
    ap.add_argument("--machine", default="all")
    a = ap.parse_args()
    targets = MACHINES if a.machine == "all" else {a.machine: MACHINES[a.machine]}

    for code, m in targets.items():
        files = COMMON + BY_MACHINE[code]
        blobs = stage(files)
        print(f"\n===== máy {code} ({m['user']}@{m['host']}) — {len(files)} file từ {HEAD} =====")
        for f, b in blobs.items():
            print(f"  {f}: {len(b)} bytes · sha256 {hashlib.sha256(b).hexdigest()[:16]}")
        busy = check_idle(m)
        print(f"  job running/pending của {m['worker']}: {busy}")
        if a.check:
            rc, out = ssh(m, f"(Get-Service GIONG_SMED_Worker -ErrorAction SilentlyContinue).Status\n")
            print("  service:", out.strip().replace("\n", " | "))
            continue
        if busy:
            print("  ⏸️  ĐANG BẬN — bỏ qua máy này (không deploy khi có job chạy)")
            continue

        for f, blob in blobs.items():
            b64 = base64.b64encode(blob).decode("ascii")
            target = f"{m['agentdir']}\\{f}"
            ps = ["$ErrorActionPreference='Stop'",
                  f"if (Test-Path '{target}') {{ Copy-Item -LiteralPath '{target}' -Destination '{target}.bak-gd614' -Force }}",
                  f"$b64 = '{b64}'",
                  f"[IO.File]::WriteAllBytes('{target}', [Convert]::FromBase64String($b64))"]
            rc, out = ssh(m, "\n".join(ps) + "\n")
            ok = "Error" not in out and "Exception" not in out
            print(f"  {'✓' if ok else '✗'} ghi {f}" + ("" if ok else f" — {out.strip()[:200]}"))

        ps = ["$ErrorActionPreference='Continue'"]
        for f in blobs:
            want = hashlib.sha256(blobs[f]).hexdigest()
            ps.append(f"$h=(Get-FileHash '{m['agentdir']}\\{f}' -Algorithm SHA256).Hash.ToLower()")
            ps.append(f"if ($h -ne '{want}') {{ Write-Output 'HASH_SAI {f}' }}")
        ps.append(f"cd '{m['agentdir']}'")
        for f in blobs:
            ps.append(f"python -m py_compile '{f}' 2>&1 | ForEach-Object {{ Write-Output ('PYERR {f}: ' + $_) }}")
        ps.append("Write-Output 'VERIFY_XONG'")
        rc, out = ssh(m, "\n".join(ps) + "\n", timeout=300)
        print("  verify:", "PASS" if ("VERIFY_XONG" in out and "HASH_SAI" not in out
                                      and "PYERR" not in out) else "XEM LẠI")
        if "XEM LẠI" in out or "PYERR" in out or "HASH_SAI" in out:
            print("   ", out.strip()[:700].replace("\n", "\n    "))

        ps = ["$s = Get-Service GIONG_SMED_Worker -ErrorAction SilentlyContinue",
              "if ($s) { Write-Output ('TRUOC=' + $s.Status); Restart-Service GIONG_SMED_Worker -Force; "
              "Start-Sleep -Seconds 8; Write-Output ('SAU=' + (Get-Service GIONG_SMED_Worker).Status) } "
              "else { Write-Output 'KHONG_CO_SERVICE' }"]
        rc, out = ssh(m, "\n".join(ps) + "\n", timeout=180)
        print("  restart service:", out.strip().replace("\n", " | ")[:300])


if __name__ == "__main__":
    sys.exit(main())
