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
FILES = ["etl/sql_reports.py"]          # đường dẫn trong apps/banhang/agent/
BAK = ".bak-gd688"


def load_gd653():
    """Nạp module deploy GĐ 653 để dùng chung MACHINES/ssh/check_idle (không chạy main)."""
    spec = importlib.util.spec_from_file_location("gd653_deploy_lan", HERE / "gd653_deploy_lan.py")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def stage(repo_con: Path) -> dict:
    out = {}
    for f in FILES:
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
    a = ap.parse_args()

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
        etl = f"{m['agentdir']}\\etl"
        ps.append(f"cd '{etl}'")
        ps.append("python -m py_compile 'sql_reports.py' 2>&1 | ForEach-Object "
                  "{ Write-Output ('PYERR ' + $_) }")
        ps.append("Write-Output 'VERIFY_XONG'")
        rc, out = g.ssh(m, "\n".join(ps) + "\n", timeout=300)
        okv = "VERIFY_XONG" in out and "HASH_SAI" not in out and "PYERR" not in out
        print("  verify (sha256 + py_compile):", "PASS" if okv else "XEM LẠI")
        if not okv:
            print("   ", out.strip()[:600].replace("\n", "\n    "))
        print("  (không cần restart worker — job sqlreport chỉ máy chủ nhận)")


if __name__ == "__main__":
    main()
