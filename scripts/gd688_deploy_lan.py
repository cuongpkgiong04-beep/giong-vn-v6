# -*- coding: utf-8 -*-
"""GĐ 688 / C.435 (Trợ lý ZCode (máy chủ), 06/11/2026) — đồng bộ 1 file
`apps/banhang/agent/etl/sql_reports.py` (sửa REPORT_SOURCE_TABLES dsxk-comparison
+ builder dsxk_comparison) xuống 3 máy LAN, GIỮ NGUYÊN HÀNH VI máy đang bận.

Vì sao cần: nguyên tắc Đại ca "ETL đồng bộ MỌI máy" (agent/etl/* phải giống nhau
trên máy chủ + .14 + .245 + .11). Lưu ý phạm vi: job `sqlreport` CHỈ máy chủ
(core) nhận (api_server _report_filter_sql — nhóm smed chỉ nhận report tải dữ
liệu) nên 3 máy LAN KHÔNG cần restart worker cho fix này; deploy chỉ để
nhất quán file (tool LAN nào import sql_reports vẫn chạy đúng bản mới).

Dùng: python scripts/gd688_deploy_lan.py [--check] [--machine 14|245|11|all] [--wait-idle 90]
Chỉ lấy nội dung COMMIT (HEAD) của repo con. Máy đang bận job → BỎ QUA (chạy lại sau).
"""
import argparse
import base64
import hashlib
import importlib.util
import subprocess
import sys
import time
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

HERE = Path(__file__).resolve().parent
# đường dẫn trong apps/banhang/agent/ — GĐ 688: sql_reports.py; GĐ 690: thêm
# task_runner.py (truyền qua --files). Mặc định giữ nguyên bộ GĐ 688.
FILES = ["etl/sql_reports.py"]
BAK = ".bak-gd688"


def load_gd653():
    """Nạp module deploy GĐ 653 để dùng chung MACHINES/ssh/check_idle (không chạy main)."""
    spec = importlib.util.spec_from_file_location("gd653_deploy_lan", HERE / "gd653_deploy_lan.py")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def stage(repo_con: Path, files=None) -> dict:
    out = {}
    for f in (files or FILES):
        blob = subprocess.run(["git", "-C", str(repo_con), "show",
                               f"HEAD:apps/banhang/agent/{f}"], capture_output=True)
        if blob.returncode != 0:
            raise RuntimeError(f"không lấy được {f} từ HEAD")
        out[f] = blob.stdout
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true")
    ap.add_argument("--machine", default="all")
    ap.add_argument("--wait-idle", type=int, default=0)
    ap.add_argument("--files", default="", help="danh sách cách nhau dấu phẩy (mặc định bộ GĐ 688)")
    ap.add_argument("--restart", action="store_true",
                    help="restart GIONG_SMED_Worker sau khi ghi (cần khi file được import TRONG process worker)")
    a = ap.parse_args()

    global FILES
    if a.files:
        FILES = [x.strip() for x in a.files.split(",") if x.strip()]
    g = load_gd653()
    targets = g.MACHINES if a.machine == "all" else {a.machine: g.MACHINES[a.machine]}
    blobs = stage(g.REPO_CON)
    print(f"HEAD repo con · {len(FILES)} file:")
    for f, b in blobs.items():
        print(f"  {f}: {len(b)} bytes · sha256 {hashlib.sha256(b).hexdigest()[:16]}")

    for code, m in targets.items():
        print(f"\n===== máy {code} ({m['user']}@{m['host']} · worker {m['worker']}) =====")
        try:
            busy = g.check_idle(m)
        except Exception as e:
            print(f"  ⚠️ không đọc được hàng đợi: {str(e)[:120]}")
            busy = -1
        print(f"  job running/pending: {busy}")
        if a.wait_idle and busy:
            deadline = time.time() + a.wait_idle * 60
            while time.time() < deadline and busy:
                time.sleep(60)
                busy = g.check_idle(m)
                print(f"  … chờ rảnh ({int(deadline - time.time())}s nữa): {busy} job")
        rc, out = g.ssh(m, "(Get-Service GIONG_SMED_Worker -ErrorAction SilentlyContinue).Status\n")
        print("  service:", out.strip().replace("\n", " | "))
        if a.check:
            continue
        if busy:
            print(f"  ⏸️  ĐANG BẬN ({busy} job) — bỏ qua, chạy lại script sau")
            continue

        for f, blob in blobs.items():
            b64 = base64.b64encode(blob).decode("ascii")
            target = f"{m['agentdir']}\\{f.replace('/', chr(92))}"
            ps = ["$ErrorActionPreference='Stop'",
                  f"if (Test-Path '{target}') {{ Copy-Item -LiteralPath '{target}' "
                  f"-Destination '{target}{BAK}' -Force }}",
                  f"$b64 = '{b64}'",
                  f"[IO.File]::WriteAllBytes('{target}', [Convert]::FromBase64String($b64))"]
            rc, out = g.ssh(m, "\n".join(ps) + "\n")
            ok = "Error" not in out and "Exception" not in out
            print(f"  {'✓' if ok else '✗'} ghi {f}" + ("" if ok else f" — {out.strip()[:200]}"))

        # verify: SHA256 khớp + py_compile sạch
        ps = ["$ErrorActionPreference='Continue'"]
        for f in blobs:
            want = hashlib.sha256(blobs[f]).hexdigest()
            t = f"{m['agentdir']}\\{f.replace('/', chr(92))}"
            ps.append(f"$h=(Get-FileHash '{t}' -Algorithm SHA256).Hash.ToLower()")
            ps.append(f"if ($h -ne '{want}') {{ Write-Output 'HASH_SAI {f}' }}")
        for f in blobs:                       # py_compile từng file TẠI THƯ MỤC CỦA NÓ
            sub = "\\".join(f.replace("/", "\\").split("\\")[:-1])
            base = f.replace("/", "\\").split("\\")[-1]
            ps.append(f"cd '{m['agentdir']}" + (f"\\{sub}'" if sub else "'"))
            ps.append(f"python -m py_compile '{base}' 2>&1 | ForEach-Object "
                      "{ Write-Output ('PYERR ' + $_) }")
        ps.append("Write-Output 'VERIFY_XONG'")
        rc, out = g.ssh(m, "\n".join(ps) + "\n", timeout=300)
        # SyntaxWarning (invalid escape '\S') có sẵn trong file → KHÔNG tính là lỗi
        py_err = [l for l in out.splitlines() if "PYERR" in l and "SyntaxWarning" not in l]
        okv = "VERIFY_XONG" in out and "HASH_SAI" not in out and not py_err
        print("  verify (sha256 + py_compile):", "PASS" if okv else "XEM LẠI")
        if not okv:
            print("   ", out.strip()[:600].replace("\n", "\n    "))

        if a.restart:
            ps2 = ["$s = Get-Service GIONG_SMED_Worker -ErrorAction SilentlyContinue",
                   "if ($s) { Write-Output ('TRUOC=' + $s.Status); "
                   "Restart-Service GIONG_SMED_Worker -Force; Start-Sleep -Seconds 8; "
                   "Write-Output ('SAU=' + (Get-Service GIONG_SMED_Worker).Status) } "
                   "else { Write-Output 'KHONG_CO_SERVICE' }",
                   "Get-CimInstance Win32_Process | Where-Object { $_.Name -eq 'python.exe' "
                   "-and $_.CommandLine -like '*worker_node*' } | "
                   "ForEach-Object { Write-Output ('WORKER PID ' + $_.ProcessId) }"]
            rc, out = g.ssh(m, "\n".join(ps2) + "\n", timeout=200)
            print("  restart worker:", out.strip().replace("\n", " | ")[:260])
        else:
            print("  (không restart — thêm --restart khi file được import trong process worker)")


if __name__ == "__main__":
    main()
