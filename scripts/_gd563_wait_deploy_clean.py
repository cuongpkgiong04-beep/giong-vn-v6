# -*- coding: utf-8 -*-
"""GĐ 563 — chờ máy LAN .245 RẢNH (hết job đêm) → deploy 8 file VĐ2 + restart worker
→ chạy `gd563_don_phieu_loi.py --apply` để xóa + tạo lại 8 phiếu MISA sai.

Chạy trên máy chủ: python scripts/_gd563_wait_deploy_clean.py [--max-phut 40] [--dry]
Tạm thời (xóa sau khi xong việc).
"""
import argparse
import subprocess
import sys
import time
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(ROOT / "scripts"))
sys.path.insert(0, str(ROOT / "giong-apps" / "apps" / "banhang" / "agent"))

import _gd563_deploy_lan as dep  # noqa: E402

AGENTDIR = r"C:\CUONG_2026\giong-agent"


def log(m):
    print(f"[{time.strftime('%H:%M:%S')}] {m}", flush=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--max-phut", type=int, default=40)
    ap.add_argument("--dry", action="store_true", help="chỉ xem, không deploy/xóa")
    a = ap.parse_args()
    m = dep.MACHINES["245"]
    het_han = time.time() + a.max_phut * 60

    log(f"Chờ worker {m['worker']} rảnh (tối đa {a.max_phut} phút)…")
    while time.time() < het_han:
        n = dep.check_idle(m)
        if n == 0:
            log("✅ RẢNH — bắt đầu deploy")
            break
        log(f"   … còn {n} job running/pending — chờ 45s")
        time.sleep(45)
    else:
        log("⏱️ Hết thời gian chờ — DỪNG (chưa deploy/xóa gì)")
        return 2

    if a.dry:
        log("DRY — dừng ở đây")
        return 0

    # 1) deploy 8 file (giữ backup 40_web_agent) — dùng đúng logic script GĐ 556
    files = dep.stage()
    log(f"deploy {len(files)} file lấy từ commit {dep.HEAD}")
    for f, blob in files.items():
        import base64
        b64 = base64.b64encode(blob).decode("ascii")
        target = f"{AGENTDIR}\\{f}"
        ps = ["$ErrorActionPreference='Stop'"]
        if f == "40_web_agent.py":
            ps.append(f"if (Test-Path '{target}') {{ Copy-Item -LiteralPath '{target}' "
                      f"-Destination '{target}.bak-gd563' -Force }}")
        ps.append(f"$b64 = '{b64}'")
        ps.append(f"[IO.File]::WriteAllBytes('{target}', [Convert]::FromBase64String($b64))")
        rc, out = dep.ssh(m, "\n".join(ps) + "\n")
        ok = "Error" not in out and "Exception" not in out
        log(f"  {'✓' if ok else '✗'} ghi {f}" + ("" if ok else f" — {out.strip()[:200]}"))

    # 2) verify hash + restart service
    ps = ["$ErrorActionPreference='Continue'"]
    import hashlib
    for f in files:
        want = hashlib.sha256(files[f]).hexdigest()
        ps.append(f"$h=(Get-FileHash '{AGENTDIR}\\{f}' -Algorithm SHA256).Hash.ToLower()")
        ps.append(f"if ($h -ne '{want}') {{ Write-Output 'HASH_SAI {f}' }}")
    ps.append(f"cd '{AGENTDIR}'")
    for f in files:
        ps.append(f"python -m py_compile '{f}' 2>&1 | ForEach-Object {{ Write-Output ('PYERR {f}: ' + $_) }}")
    ps.append("Write-Output 'VERIFY_XONG'")
    rc, out = dep.ssh(m, "\n".join(ps) + "\n", timeout=300)
    log("verify: " + ("PASS" if ("VERIFY_XONG" in out and "HASH_SAI" not in out) else "XEM LẠI"))
    if "HASH_SAI" in out:
        log(out[:600])
        return 3
    ps = ["$s = Get-Service GIONG_SMED_Worker -ErrorAction SilentlyContinue",
          "if ($s) { Restart-Service GIONG_SMED_Worker -Force; Start-Sleep -Seconds 8; "
          "Write-Output ('SAU=' + (Get-Service GIONG_SMED_Worker).Status) } else { Write-Output 'KHONG_CO_SERVICE' }"]
    rc, out = dep.ssh(m, "\n".join(ps) + "\n", timeout=180)
    log("restart worker: " + out.strip().replace("\n", " | ")[:200])

    # 3) chạy tool dọn phiếu (dry-run trước cho có log, rồi --apply)
    rc, out = dep.ssh(m, f"cd '{AGENTDIR}'\npython gd563_don_phieu_loi.py\n", timeout=300)
    log("DRY-RUN trên .245:\n" + out.strip()[-1200:])
    log("▶️ chạy --apply …")
    rc, out = dep.ssh(m, f"cd '{AGENTDIR}'\npython gd563_don_phieu_loi.py --apply\n", timeout=900)
    log("KẾT QUẢ --apply:\n" + out.strip()[-2500:])
    return 0


if __name__ == "__main__":
    sys.exit(main())
