# -*- coding: utf-8 -*-
"""GĐ 677 / C.428 (Trợ lý Freebuff, 05/11/2026) — deploy fix upload MISA ra 3 máy LAN.

Việc 2 Đại ca 05/11 ("Task 5,6,7 lỗi chạy báo cáo upload ngày hôm qua"):
- misa_http_api.py        — MisaHttp.call chống body RỖNG (401 len=0 — probe GĐ 677):
                            tự lấy lại phiên + thử lại 1 lần; lần 2 raise RÕ.
- misa_xuatkho_api.py     — tra_hang_hoa bọc JSON → None (không chết cả tool).
- misa_xuatkho_import.py  — guard "kỳ API sai" nhận thêm ngày KHÔNG đệm 0 (PX-SD-2026114…).
- misa_muahang_api.py     — center_map rỗng → báo đúng nguyên nhân "API trả rỗng —
                            phiên MISA hết giá trị?" thay vì "không có danh mục" sai cảm giác.
- misa_muahang_api_run.py — dead_streak dừng sớm nhận thêm lỗi phiên danh mục.
- misa_banhang_api.py     — thiếu module → bỏ kiểm chứng chi tiết, vẫn tham chiếu+ghi sổ.
- misa_sa_detail_sync.py  — file GĐ 649 CHƯA TỪNG có trong danh sách deploy → máy .11
                            thiếu (ModuleNotFoundError 13 TT đêm 04/11) — deploy đủ 3 máy.
- task_runner.py          — GĐ 677: Task_03 (daily) tự đủ mọi phân hệ/báo cáo hiện hành.

Cơ chế copy gd653_deploy_lan.py (commit HEAD, check rảnh, verify hash + py_compile,
restart worker KHI RẢNH). Dùng:
  python scripts/gd677_deploy_lan.py [--check] [--machine 14|245|11|all]
                                     [--no-restart] [--wait-idle N]
"""
import argparse
import base64
import hashlib
import subprocess
import sys
import time

sys.path.insert(0, str(__import__("pathlib").Path(__file__).parent))
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO_CON = r"D:/DuLieuChung/CUONG_2026/giong-vn-v6/giong-apps"
HEAD = "HEAD"
FILES = [
    "misa_http_api.py",
    "misa_xuatkho_api.py",
    "misa_xuatkho_import.py",
    "misa_muahang_api.py",
    "misa_muahang_api_run.py",
    "misa_banhang_api.py",
    "misa_sa_detail_sync.py",
    "misa_upload_line.py",
    "task_runner.py",
]
MACHINES = {
    "14": dict(host="192.168.1.14", user="phamcuong",
               agentdir=r"C:\CUONG_2026\giong-vn-v6-agent-lan\giong-apps\apps\banhang\agent",
               worker="lan-1"),
    "245": dict(host="192.168.1.245", user="ADMIN",
                agentdir=r"C:\CUONG_2026\giong-agent", worker="giangkt"),
    "11": dict(host="192.168.1.11", user="admin-pc",
               agentdir=r"C:\CUONG_2026\giong-agent", worker="thanh-pc"),
}


def stage() -> dict:
    out = {}
    for f in FILES:
        blob = subprocess.run(["git", "-C", REPO_CON, "show",
                               f"{HEAD}:apps/banhang/agent/{f}"], capture_output=True)
        if blob.returncode != 0:
            raise RuntimeError(f"không lấy được {f} từ {HEAD} (commit chưa lưu?)")
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
    ap.add_argument("--check", action="store_true")
    ap.add_argument("--machine", default="all")
    ap.add_argument("--no-restart", action="store_true")
    ap.add_argument("--wait-idle", type=int, default=0)
    a = ap.parse_args()
    targets = MACHINES if a.machine == "all" else {a.machine: MACHINES[a.machine]}
    blobs = stage()
    print(f"HEAD={HEAD} · {len(FILES)} file:")
    for f, b in blobs.items():
        print(f"  {f}: {len(b)} bytes · sha256 {hashlib.sha256(b).hexdigest()[:16]}")

    for code, m in targets.items():
        print(f"\n===== máy {code} ({m['user']}@{m['host']} · worker {m['worker']}) =====")
        busy = check_idle(m)
        print(f"  job running/pending: {busy}")
        if a.wait_idle and busy:
            deadline = time.time() + a.wait_idle * 60
            while time.time() < deadline:
                time.sleep(60)
                busy = check_idle(m)
                print(f"  … chờ rảnh ({int(deadline - time.time())}s nữa): {busy} job")
                if not busy:
                    break
        rc, out = ssh(m, "(Get-Service GIONG_SMED_Worker -ErrorAction SilentlyContinue).Status\n")
        print("  service:", out.strip().replace("\n", " | "))
        if a.check:
            continue
        if busy:
            print("  ⏸️  ĐANG BẬN — bỏ qua (không deploy khi có job chạy)")
            continue

        for f, blob in blobs.items():
            b64 = base64.b64encode(blob).decode("ascii")
            target = f"{m['agentdir']}\\{f}"
            ps = ["$ErrorActionPreference='Stop'",
                  f"if (Test-Path '{target}') {{ Copy-Item -LiteralPath '{target}' "
                  f"-Destination '{target}.bak-gd677' -Force }}",
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
            ps.append(f"python -m py_compile '{f}' 2>&1 | ForEach-Object "
                      f"{{ Write-Output ('PYERR {f}: ' + $_) }}")
        ps.append("Write-Output 'VERIFY_XONG'")
        rc, out = ssh(m, "\n".join(ps) + "\n", timeout=300)
        okverify = "VERIFY_XONG" in out and "HASH_SAI" not in out and "PYERR" not in out
        print("  verify:", "PASS" if okverify else "XEM LẠI")
        if not okverify:
            print("   ", out.strip()[:700].replace("\n", "\n    "))

        if not a.no_restart:
            ps = ["$s = Get-Service GIONG_SMED_Worker -ErrorAction SilentlyContinue",
                  "if ($s) { Write-Output ('TRUOC=' + $s.Status); "
                  "Restart-Service GIONG_SMED_Worker -Force; Start-Sleep -Seconds 8; "
                  "Write-Output ('SAU=' + (Get-Service GIONG_SMED_Worker).Status) } "
                  "else { Write-Output 'KHONG_CO_SERVICE' }"]
            rc, out = ssh(m, "\n".join(ps) + "\n", timeout=180)
            print("  restart worker:", out.strip().replace("\n", " | ")[:200])


if __name__ == "__main__":
    main()
