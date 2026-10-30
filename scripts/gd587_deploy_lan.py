# -*- coding: utf-8 -*-
"""GĐ 587 (30/10/2026) — deploy bản vá CỔNG NHẬP KHẨU MISA g1→g2 + đường HTTP thuần (PA-2
ĐH chốt) xuống 2 máy LAN chạy MISA, kèm bật MISA_UPLOAD_MODE=http cho máy mua hàng/xuất kho.

Máy .245 (GIANGKT, nhóm misa-muahang): đủ bộ — vá + module HTTP mới + nhánh http trong
3 file production + ĐỔI ENV worker sang http.
Máy .34 (THANH-PC, nhóm misa-banhang): chỉ bản vá (gd478 + misa_http_api + login) — bán
hàng không dùng cổng nhập khẩu nên KHÔNG đổi env.

Nguồn file: 3 file đã vá lấy từ WORKING TREE của máy chủ; các file khác lấy đúng commit
HEAD của repo con (KHÔNG lấy working tree — bài dở của phiên khác không được deploy).

Cách truyền: SSH + pipe PowerShell script qua STDIN (base64) — .34 KHÔNG có SFTP (GĐ 548).

Dùng: python scripts/gd587_deploy_lan.py [--check] [--machine 245|34|all] [--no-restart]
"""
import argparse
import base64
import hashlib
import json
import subprocess
import sys
import urllib.request
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

REPO = Path(r"D:/DuLieuChung/CUONG_2026/giong-vn-v6")
REPO_CON = REPO / "giong-apps"
AGENT_SUB = "apps/banhang/agent"

# File có thay đổi GĐ 587 (working tree = HEAD + bản vá) — lấy từ đĩa máy chủ
WORK_TREE = ["gd478_import_api.py", "misa_http_api.py", "misa_http_api.test.py",
             "misa_http_bootstrap.py", "misa_http_bootstrap.test.py",
             "misa_muahang_api.py", "misa_xuatkho_api_run.py",
             "40_web_agent.py", "gd557-fill.test.py"]
# File lấy ĐÚNG commit HEAD (không lấy working tree của phiên khác)
HEAD_FILES = ["misa_http_login.py", "misa_http_fetcher.test.py", "misa_xuatkho_import.py"]
# Bộ tối thiểu cho .34 (nhóm bán hàng): không dùng cổng nhập khẩu / không bật http,
# chỉ cần bản sửa "kiểm file oan" cho job upload MISA (GĐ 587).
FILES_34 = ["40_web_agent.py", "gd478_import_api.py", "misa_http_api.py",
            "misa_http_api.test.py", "misa_http_login.py", "misa_http_fetcher.test.py",
            "misa_http_bootstrap.py", "misa_http_bootstrap.test.py"]

MACHINES = {
    "245": dict(host="192.168.1.245", user="ADMIN", worker="giangkt",
                agentdir=r"C:\CUONG_2026\giong-agent",
                python=r"C:\Users\ADMIN\AppData\Local\Programs\Python\Python312\python.exe",
                env_http=True, files=WORK_TREE + HEAD_FILES),
    "34": dict(host="192.168.1.34", user="admin-pc", worker="thanh-pc",
               agentdir=r"C:\CUONG_2026\giong-agent",
               python=r"C:\Users\ADMIN-PC\AppData\Local\Programs\Python\Python312\python.exe",
               env_http=False, files=FILES_34),
}


def stage() -> dict[str, bytes]:
    """Nội dung từng file: working tree cho file đã vá, HEAD cho phần còn lại."""
    out = {}
    for f in WORK_TREE:
        out[f] = (REPO_CON / AGENT_SUB / f).read_bytes()
    head = subprocess.run(["git", "-C", str(REPO_CON), "rev-parse", "HEAD"],
                          capture_output=True, text=True, check=True).stdout.strip()
    for f in HEAD_FILES:
        blob = subprocess.run(["git", "-C", str(REPO_CON), "show", f"HEAD:{AGENT_SUB}/{f}"],
                              capture_output=True)
        if blob.returncode != 0:
            raise RuntimeError(f"không lấy được {f} từ HEAD")
        out[f] = blob.stdout
    return out, head


def ssh(m, script, timeout=300):
    """Pipe PowerShell script qua stdin (tránh giới hạn dòng lệnh 8191 ký tự)."""
    r = subprocess.run(
        ["ssh", "-o", "ConnectTimeout=8", "-o", "BatchMode=yes",
         "-o", "StrictHostKeyChecking=no", f"{m['user']}@{m['host']}",
         "powershell -NoProfile -Command -"],
        input=script.encode("utf-8"), capture_output=True, timeout=timeout)
    out = (r.stdout or b"").decode("utf-8", "replace") + (r.stderr or b"").decode("utf-8", "replace")
    return r.returncode, "\n".join(
        l for l in out.splitlines()
        if not any(k in l for k in ("post-quantum", "store now", "upgraded")))


def api_token() -> str:
    return (REPO_CON / AGENT_SUB / "apitoken.txt").read_text(encoding="utf-8").strip()


def busy_jobs(worker: str) -> list[dict]:
    """Job running/pending của worker này (đọc GiongDB qua api_server máy chủ)."""
    sql = ("SELECT id, report, status FROM dbo.smed_pull_jobs WHERE status IN "
           f"('running','pending','waitdownload') AND claimed_by = '{worker}'")
    body = json.dumps({"text": sql, "params": []}).encode()
    req = urllib.request.Request("http://127.0.0.1:8777/query", data=body,
                                 headers={"Content-Type": "application/json",
                                          "x-api-token": api_token()})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read().decode()).get("rows") or []


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true", help="chỉ khảo sát, không ghi gì")
    ap.add_argument("--machine", default="all")
    ap.add_argument("--no-restart", action="store_true")
    a = ap.parse_args()

    files, head = stage()
    print(f"Repo con HEAD = {head[:9]}")
    for f, b in files.items():
        print(f"  {f}: {len(b)} bytes · sha256 {hashlib.sha256(b).hexdigest()[:16]}")

    targets = MACHINES if a.machine == "all" else {a.machine: MACHINES[a.machine]}
    for code, m in targets.items():
        print(f"\n===== máy {code} ({m['user']}@{m['host']} · worker {m['worker']}) =====")
        try:
            busy = busy_jobs(m["worker"])
        except Exception as e:
            print(f"  ⚠️ không kiểm được job đang chạy: {type(e).__name__}: {e}")
            busy = []
        print(f"  job đang chạy/chờ của worker: {len(busy)}" + (
            " → " + ", ".join(f"{j['report']}({j['status']})" for j in busy) if busy else ""))
        if a.check:
            rc, out = ssh(m, f"Write-Output ('service=' + (Get-Service GIONG_SMED_Worker "
                             f"-ErrorAction SilentlyContinue).Status)\n"
                             f"Select-String -Path '{m['agentdir']}\\gd478_import_api.py' "
                             f"-Pattern 'G2 = ' | ForEach-Object {{ Write-Output $_.Line }}\n")
            print("  ", out.strip().replace("\n", " | ")[:300])
            continue
        if busy:
            print("  ⏸️  ĐANG BẬN — bỏ qua máy này (không deploy khi có job chạy)")
            continue

        # 1) backup + ghi từng file (base64 qua stdin)
        for f in m["files"]:
            blob = files[f]
            b64 = base64.b64encode(blob).decode("ascii")
            target = f"{m['agentdir']}\\{f}"
            ps = ["$ErrorActionPreference='Stop'",
                  f"if (Test-Path '{target}') {{ Copy-Item -LiteralPath '{target}' "
                  f"-Destination '{target}.bak-gd587' -Force }}",
                  f"$b64 = '{b64}'",
                  f"[IO.File]::WriteAllBytes('{target}', [Convert]::FromBase64String($b64))"]
            rc, out = ssh(m, "\n".join(ps) + "\n")
            ok = "Error" not in out and "Exception" not in out
            print(f"  {'✓' if ok else '✗'} ghi {f}" + ("" if ok else f" — {out.strip()[:200]}"))

        # 2) đối chiếu hash + py_compile
        ps = ["$ErrorActionPreference='Continue'"]
        for f in m["files"]:
            want = hashlib.sha256(files[f]).hexdigest()
            ps.append(f"$h=(Get-FileHash '{m['agentdir']}\\{f}' -Algorithm SHA256).Hash.ToLower()")
            ps.append(f"if ($h -ne '{want}') {{ Write-Output 'HASH_SAI {f}' }}")
        ps.append(f"cd '{m['agentdir']}'")
        for f in m["files"]:
            if f.endswith(".py"):
                ps.append(f"& '{m['python']}' -m py_compile '{f}' 2>&1 | ForEach-Object "
                          f"{{ Write-Output ('PYERR {f}: ' + $_) }}")
        ps.append("Write-Output 'VERIFY_XONG'")
        rc, out = ssh(m, "\n".join(ps) + "\n")
        okv = "VERIFY_XONG" in out and "HASH_SAI" not in out and "PYERR" not in out
        print("  verify hash+compile:", "PASS" if okv else "XEM LẠI")
        if not okv:
            print("   ", out.strip()[:600].replace("\n", "\n    "))

        # 3) chạy bộ test offline NGAY TRÊN MÁY ĐÓ (chứng minh deploy chạy được)
        rc, out = ssh(m, f"cd '{m['agentdir']}'\n& '{m['python']}' misa_http_api.test.py "
                         f"2>&1 | Select-Object -Last 3\n")
        last = " | ".join(l.strip() for l in out.strip().splitlines()[-3:])
        print(f"  test offline: {last[:200]}")

        # 4) bật MISA_UPLOAD_MODE=http (chỉ máy chạy mua hàng/xuất kho)
        if m["env_http"]:
            ps = ["$ErrorActionPreference='Stop'",
                  f"$envs = '{m['agentdir']}\\worker.env'",
                  f"$bat = '{m['agentdir']}\\worker.env.bat'",
                  "foreach ($p in @($envs,$bat)) { if (Test-Path $p) { Copy-Item -LiteralPath $p "
                  "-Destination ($p + '.bak-gd587') -Force } }",
                  "$t = Get-Content $envs -Raw",
                  "if ($t -notmatch 'MISA_UPLOAD_MODE') { "
                  "Add-Content -Path $envs -Value 'MISA_UPLOAD_MODE=http' -Encoding ASCII }",
                  "$b = Get-Content $bat -Raw",
                  "if ($b -notmatch 'MISA_UPLOAD_MODE') { "
                  "$b = $b -replace '(set \"MISA_CHROME_HIDDEN=1\"[^\\r\\n]*)', ('$1' + [Environment]::NewLine "
                  "+ 'set \"MISA_UPLOAD_MODE=http\"'); "
                  "Set-Content -Path $bat -Value $b -Encoding ASCII -NoNewline }",
                  "Select-String -Path $envs,$bat -Pattern 'MISA_UPLOAD_MODE' | "
                  "ForEach-Object { Write-Output ('ENVOK ' + $_.Filename + ': ' + $_.Line.Trim()) }"]
            rc, out = ssh(m, "\n".join(ps) + "\n")
            print("  env http:", " | ".join(l.strip() for l in out.strip().splitlines())[:300])

        # 5) restart worker để nạp code + env mới
        if a.no_restart:
            print("  (bỏ restart theo yêu cầu)")
            continue
        ps = ["$s = Get-Service GIONG_SMED_Worker -ErrorAction SilentlyContinue",
              "if ($s) { Write-Output ('TRUOC=' + $s.Status); "
              "Restart-Service GIONG_SMED_Worker -Force; Start-Sleep -Seconds 8; "
              "Write-Output ('SAU=' + (Get-Service GIONG_SMED_Worker).Status) } "
              "else { Write-Output 'KHONG_CO_SERVICE' }"]
        rc, out = ssh(m, "\n".join(ps) + "\n", timeout=180)
        print("  restart service:", out.strip().replace("\n", " | ")[:200])
    return 0


if __name__ == "__main__":
    sys.exit(main())
