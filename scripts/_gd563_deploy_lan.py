# -*- coding: utf-8 -*-
"""GĐ 563 — deploy file agent VĐ2 (bản ĐÃ COMMIT e57e723) xuống 2 máy LAN chạy MISA.

+ cdp_watchdog.py / report_wake.py (mới) + 2 test + 40_web_agent.py (bản HEAD).
Chỉ dùng nội dung COMMIT — KHÔNG lấy bản working-tree (đang có bài dở GĐ 557 của
phiên khác, không được deploy).

Cách truyền: SSH + pipe PowerShell script qua STDIN (base64) — bài học GĐ 548:
cmd.exe giới hạn 8191 ký tự và máy .34 KHÔNG có SFTP.

Dùng: python scripts/_gd556_deploy_lan.py [--check]
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
HEAD = "024cd12"
FILES = ["40_web_agent.py", "misa_xuatkho_api.py", "misa_xuatkho_api_run.py",
         "misa_xuatkho_import.py", "misa_xuatkho_import.test.py",
         "gd478_import_api.py", "misa_muahang_api.py", "gd563_don_phieu_loi.py"]
MACHINES = {
    "245": dict(host="192.168.1.245", user="ADMIN", agentdir=r"C:\CUONG_2026\giong-agent",
                worker="giangkt"),
    "34": dict(host="192.168.1.34", user="admin-pc", agentdir=r"C:\CUONG_2026\giong-agent",
               worker="thanh-pc"),
}


def stage() -> dict:
    """Lấy nội dung 5 file từ commit HEAD (không lấy working tree)."""
    out = {}
    for f in FILES:
        blob = subprocess.run(["git", "-C", str(REPO_CON), "show",
                               f"{HEAD}:apps/banhang/agent/{f}"], capture_output=True)
        if blob.returncode != 0:
            raise RuntimeError(f"không lấy được {f} từ {HEAD}")
        out[f] = blob.stdout
    return out


def ssh(m, script, timeout=180):
    """Pipe PowerShell script qua stdin (tránh giới hạn dòng lệnh 8191 ký tự)."""
    r = subprocess.run(
        ["ssh", "-o", "ConnectTimeout=8", "-o", "BatchMode=yes",
         "-o", "StrictHostKeyChecking=no", f"{m['user']}@{m['host']}",
         "powershell -NoProfile -Command -"],
        input=script.encode("utf-8"), capture_output=True, timeout=timeout)
    out = (r.stdout or b"").decode("utf-8", "replace") + (r.stderr or b"").decode("utf-8", "replace")
    out = "\n".join(l for l in out.splitlines()
                    if not any(k in l for k in ("post-quantum", "store now", "upgraded")))
    return r.returncode, out


def check_idle(m):
    """Không deploy khi còn job đang chạy trên máy đó."""
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

    files = stage()
    print("File lấy từ commit", HEAD)
    for f, b in files.items():
        print(f"  {f}: {len(b)} bytes · sha256 {hashlib.sha256(b).hexdigest()[:16]}")

    targets = MACHINES if a.machine == "all" else {a.machine: MACHINES[a.machine]}
    for code, m in targets.items():
        print(f"\n===== máy {code} ({m['user']}@{m['host']}) =====")
        busy = check_idle(m)
        print(f"  job running/pending của worker {m['worker']}: {busy}")
        if a.check:
            rc, out = ssh(m, f"Get-FileHash '{m['agentdir']}\\40_web_agent.py' "
                             f"-Algorithm SHA256 | Select-Object -ExpandProperty Hash\n"
                             f"(Get-Service GIONG_SMED_Worker -ErrorAction SilentlyContinue)"
                             f".Status\n")
            print("  ", out.strip().replace("\n", " | "))
            continue
        if busy:
            print("  ⏸️  ĐANG BẬN — bỏ qua máy này (không deploy khi có job chạy)")
            continue

        # 1) backup + ghi từng file (base64 qua stdin) + py_compile
        for f, blob in files.items():
            b64 = base64.b64encode(blob).decode("ascii")
            target = f"{m['agentdir']}\\{f}"
            bak = f"{target}.bak-gd556" if f in ("40_web_agent.py",) else None
            ps = ["$ErrorActionPreference='Stop'"]
            if bak:
                ps.append(f"if (Test-Path '{target}') {{ Copy-Item -LiteralPath '{target}' "
                          f"-Destination '{bak}' -Force }}")
            ps.append(f"$b64 = '{b64}'")
            ps.append(f"[IO.File]::WriteAllBytes('{target}', [Convert]::FromBase64String($b64))")
            rc, out = ssh(m, "\n".join(ps) + "\n")
            ok = "Error" not in out and "Exception" not in out
            print(f"  {'✓' if ok else '✗'} ghi {f}" + ("" if ok else f" — {out.strip()[:200]}"))

        # 2) kiểm tra Python đọc được + hash khớp
        ps = ["$ErrorActionPreference='Continue'"]
        for f in files:
            want = hashlib.sha256(files[f]).hexdigest()
            ps.append(f"$h=(Get-FileHash '{m['agentdir']}\\{f}' -Algorithm SHA256).Hash.ToLower()")
            ps.append(f"if ($h -ne '{want}') {{ Write-Output 'HASH_SAI {f}' }}")
        ps.append(f"cd '{m['agentdir']}'")
        for f in files:
            ps.append(f"python -m py_compile '{f}' 2>&1 | ForEach-Object {{ Write-Output ('PYERR {f}: ' + $_) }}")
        ps.append("Write-Output 'VERIFY_XONG'")
        rc, out = ssh(m, "\n".join(ps) + "\n", timeout=300)
        print("  verify:", "PASS" if ("VERIFY_XONG" in out and "HASH_SAI" not in out
                                      and "PYERR" not in out) else "XEM LẠI")
        print("   ", out.strip()[:600].replace("\n", "\n    "))

        # 3) restart worker service (nạp code mới)
        ps = ["$s = Get-Service GIONG_SMED_Worker -ErrorAction SilentlyContinue",
              "if ($s) { Write-Output ('TRUOC=' + $s.Status); Restart-Service GIONG_SMED_Worker -Force; Start-Sleep -Seconds 8; "
              "Write-Output ('SAU=' + (Get-Service GIONG_SMED_Worker).Status) } else { Write-Output 'KHONG_CO_SERVICE' }"]
        rc, out = ssh(m, "\n".join(ps) + "\n", timeout=180)
        print("  restart service:", out.strip().replace("\n", " | ")[:300])


if __name__ == "__main__":
    sys.exit(main())
