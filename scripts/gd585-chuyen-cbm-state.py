#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""GĐ 585 — Chuyển state codebase-memory-mcp (CBM) vào thư mục dự án.

MỤC TIÊU: D:\\CBMState  ->  D:\\DuLieuChung\\CUONG_2026\\.cbmstate

VÌ SAO CẦN SCRIPT NÀY (không copy tay được):
  CBM chặn mọi thư mục trên đường dẫn tới state dir có quyền GHI ngoài
  {owner, SYSTEM, Administrators}. Đã kiểm chứng GĐ 585 bằng 4 cây thử:
    - cha có Everyone:(F)      -> CHẶN
    - cha có lan245:(M)        -> CHẶN   (tài khoản cụ thể CŨNG bị chặn)
    - cha có Authenticated Users:(M) -> CHẶN
    - cha chỉ có Everyone:(RX) + lan245:(RX) -> PASS  (chỉ-đọc được chấp nhận)
  => Muốn state nằm trong CUONG_2026 phải: bỏ quyền GHI ở 2 cấp cha
     (DuLieuChung + CUONG_2026) và CHUYỂN quyền ghi đó xuống các thư mục CON
     cho 3 tài khoản máy LAN (lan245 / lan34 / lan27).

CÁCH DÙNG:
  python scripts/gd585-chuyen-cbm-state.py              # DRY-RUN: in kế hoạch, không đụng gì
  python scripts/gd585-chuyen-cbm-state.py --apply      # thực thi
  python scripts/gd585-chuyen-cbm-state.py --verify     # chỉ kiểm chứng trạng thái hiện tại
  python scripts/gd585-chuyen-cbm-state.py --rollback   # khôi phục ACL + config về như trước

AN TOÀN:
  - Mặc định DRY-RUN. Chỉ hành động khi có --apply.
  - Trước khi sửa ACL: backup toàn bộ ACL 2 cấp vào backups/gd585-<timestamp>/
  - Không xoá D:\\CBMState (giữ bản cũ) — chỉ xoá khi chạy --apply --remove-old
    SAU KHI đã verify chạy tốt.
"""
from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from datetime import datetime
from pathlib import Path

# ── Tham số ──────────────────────────────────────────────────────────────
OLD_STATE = Path(r"D:\CBMState")
ROOT = Path(r"D:\DuLieuChung")
PROJ_ROOT = Path(r"D:\DuLieuChung\CUONG_2026")          # thư mục Đại Ca muốn đặt state vào
NEW_STATE = PROJ_ROOT / ".cbmstate"                     # state mới (ngoài repo, dưới CUONG_2026)
LAN_USERS = ["lan245", "lan34", "lan27"]
LAN_FULL = [f"GIONGPC\\{u}" for u in LAN_USERS]
CBM_EXE = Path(r"D:\DuLieuChung\CUONG_2026\Github\_tools-cbm\cbm\codebase-memory-mcp.exe")
CONFIG = Path(r"C:\Users\Administrator\.zcode\cli\config.json")
REPO = Path(__file__).resolve().parent.parent
BACKUP_DIR = REPO / "backups" / f"gd585-{datetime.now():%Y%m%d-%H%M%S}"

TRUSTED = [
    ("NT AUTHORITY\\SYSTEM", "(OI)(CI)(F)"),
    ("BUILTIN\\Administrators", "(OI)(CI)(F)"),
    ("GIONGPC\\Administrator", "(OI)(CI)(F)"),
]
# Ở 2 cấp cha: CHỈ-ĐỌC (CBM chấp nhận) — để máy LAN vẫn duyệt được cây thư mục
READ_CAPS = [("Everyone", "(OI)(CI)(RX)")] + [(u, "(OI)(CI)(RX)") for u in LAN_FULL]


def run(cmd: list[str]) -> tuple[int, str]:
    """Chạy lệnh, trả (exit_code, stdout+stderr) — decode an toàn cho console Windows."""
    p = subprocess.run(cmd, capture_output=True, shell=False)
    out = (p.stdout + p.stderr)
    txt = out.decode("utf-8", errors="replace")
    if "\ufffd" in txt:                       # console Windows không phải UTF-8 → thử mbcs
        try:
            txt = out.decode("mbcs", errors="replace")
        except Exception:
            pass
    return p.returncode, txt.strip()


def icacls(*args: str) -> tuple[int, str]:
    return run(["icacls", *args])


def log(msg: str) -> None:
    print(msg, flush=True)


def acl_of(path: Path) -> list[str]:
    code, out = icacls(str(path))
    return [l.strip() for l in out.splitlines() if l.strip() and "Successfully" not in l and "Failed" not in l]


# ── Kiểm tra trạng thái ──────────────────────────────────────────────────
def check_state() -> dict:
    """Đọc trạng thái thật của hệ thống (dùng cho --verify và cảnh báo dry-run)."""
    st = {
        "config_env": {},
        "old_state_exists": OLD_STATE.exists(),
        "new_state_exists": NEW_STATE.exists(),
        "acl_root": acl_of(ROOT),
        "acl_proj": acl_of(PROJ_ROOT),
    }
    try:
        cfg = json.loads(CONFIG.read_text(encoding="utf-8"))
        st["config_env"] = cfg.get("mcp", {}).get("servers", {}).get("codebase-memory", {}).get("env", {})
    except Exception as e:                                  # noqa: BLE001
        st["config_error"] = f"{type(e).__name__}: {e}"
    return st


def has_write_for_untrusted(acl_lines: list[str]) -> list[str]:
    """Trả về các ACE quyền-GHI cho identity ngoài {owner, SYSTEM, Administrators}."""
    bad = []
    for line in acl_lines:
        low = line.lower()
        # ACE có quyền ghi nếu có (F), (M), (W) — và KHÔNG chỉ có (RX)/(R)/(GR)
        if any(w in line for w in ("(F)", "(M)", "(W)")):
            if not any(t[0].lower() in low for t in TRUSTED):
                bad.append(line)
    return bad


def verify_cbm(env_cache: Path, env_runtime: Path) -> tuple[bool, str]:
    """Chạy CBM CLI thật với state dir được chỉ định → chấp nhận hay không."""
    if not CBM_EXE.exists():
        return False, f"Không thấy CBM exe: {CBM_EXE}"
    import os
    env = dict(os.environ)
    env["CBM_CACHE_DIR"] = str(env_cache)
    env["CBM_RUNTIME_DIR"] = str(env_runtime)
    p = subprocess.run([str(CBM_EXE), "cli", "--quiet", "list_projects"],
                       capture_output=True, env=env)
    txt = p.stdout.decode("utf-8", errors="replace") + p.stderr.decode("utf-8", errors="replace")
    ok = "projects:" in txt
    # tóm tắt: số project + tên
    names = [l.strip() for l in txt.splitlines() if l.strip().startswith("D-")]
    return ok, txt.strip()[:600] + (f"\n   ({len(names)} project)" if names else "")


# ── Kế hoạch ─────────────────────────────────────────────────────────────
def children(path: Path) -> tuple[list[Path], list[Path]]:
    dirs, files = [], []
    for p in sorted(path.iterdir()):
        if p.name in (".cbmstate",):
            continue
        (dirs if p.is_dir() else files).append(p)
    return dirs, files


def plan_lines() -> list[str]:
    dirs_r, files_r = children(ROOT)
    dirs_p, files_p = children(PROJ_ROOT)
    return [
        f"1. Backup ACL: {ROOT} + {PROJ_ROOT} -> {BACKUP_DIR}",
        f"2. Cấp Modify cho {', '.join(LAN_USERS)} ở {len(dirs_r) + len(files_r)} mục cấp 1 của {ROOT}"
        f"  (trừ CUONG_2026) + {len(dirs_p) + len(files_p)} mục cấp 1 của {PROJ_ROOT}",
        f"3. Cấp chỉ-đọc (RX) cho lan*/Everyone + toàn quyền cho SYSTEM/Admins ở 2 cấp cha"
        f"  ({ROOT}, {PROJ_ROOT}) và BỎ quyền ghi (Everyone:(F), Authenticated Users:(M))",
        f"4. Tạo {NEW_STATE} (cache/ + runtime/) với ACL chỉ owner + SYSTEM",
        f"5. Copy state CBM: {OLD_STATE}\\cache + runtime -> {NEW_STATE}"
        f"  (KHÔNG chuyển _lan / _lan_accounts.txt — dữ liệu vận hành máy LAN, có mật khẩu)",
        f"6. Sửa config MCP: CBM_CACHE_DIR / CBM_RUNTIME_DIR -> {NEW_STATE}",
        f"7. Verify: CBM CLI phải đọc được 2 project từ state mới",
        "",
        "SAU KHI APPLY — Đại Ca cần kiểm chứng trên máy LAN (em không SSH được .245/.34):",
        "   - .245: mở ổ Y: → duyệt thư mục + ghi thử 1 file vào thư mục con",
        "   - .27 / .34: ổ Z: → tương tự",
        "   (Script này KHÔNG xoá D:\\CBMState — giữ bản cũ để quay lại nếu cần.)",
    ]


# ── Thực thi ─────────────────────────────────────────────────────────────
def backup_acl() -> None:
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    for src, name in ((ROOT, "acl-DuLieuChung.txt"), (PROJ_ROOT, "acl-CUONG_2026.txt")):
        code, out = icacls(str(src), "/save", str(BACKUP_DIR / name))
        log(f"   backup ACL {src} -> {name} (exit {code})")
    shutil.copy2(CONFIG, BACKUP_DIR / "config.json.bak")
    log(f"   backup config.json -> {BACKUP_DIR / 'config.json.bak'}")
    # Lưu cả ACL hiện tại dạng text cho người đọc
    with (BACKUP_DIR / "acl-hien-trang.txt").open("w", encoding="utf-8") as f:
        for src in (ROOT, PROJ_ROOT):
            f.write(f"=== {src} ===\n" + "\n".join(acl_of(src)) + "\n\n")


def grant_children() -> None:
    """Bước 2: cấp Modify cho lan* ở mọi mục cấp 1 (TRƯỚC khi bỏ quyền cha)."""
    for base, skip in ((ROOT, {"CUONG_2026"}), (PROJ_ROOT, {".cbmstate"})):
        dirs, files = children(base)
        for d in dirs:
            if d.name in skip:
                continue
            grants = [f"{u}:(OI)(CI)(M)" for u in LAN_FULL]
            code, out = icacls(str(d), "/grant", *grants)
            log(f"   [dir ] {d}  exit={code}")
        for f_ in files:
            grants = [f"{u}:(M)" for u in LAN_FULL]
            code, out = icacls(str(f_), "/grant", *grants)
            log(f"   [file] {f_.name}  exit={code}")


def tighten_parents() -> None:
    """Bước 3: 2 cấp cha = SYSTEM/Admins toàn quyền + Everyone & lan* CHỈ ĐỌC."""
    for p in (ROOT, PROJ_ROOT):
        log(f"   -- {p}")
        icacls(str(p), "/remove:g", "Everyone")
        icacls(str(p), "/remove:g", "NT AUTHORITY\\Authenticated Users")
        icacls(str(p), "/remove:g", "BUILTIN\\Users")
        icacls(str(p), "/inheritance:r")
        grants = [f"{n}:{c}" for n, c in TRUSTED] + [f"{n}:{c}" for n, c in READ_CAPS]
        code, out = icacls(str(p), "/grant", *grants)
        log(f"      grant exit={code}")
        for line in acl_of(p):
            log(f"      {line}")


def make_new_state() -> None:
    for sub in ("cache", "runtime"):
        d = NEW_STATE / sub
        d.mkdir(parents=True, exist_ok=True)
        icacls(str(d), "/inheritance:r",
              "/grant:r", "NT AUTHORITY\\SYSTEM:(OI)(CI)(F)",
              "GIONGPC\\Administrator:(OI)(CI)(F)")
    icacls(str(NEW_STATE), "/inheritance:r",
          "/grant:r", "NT AUTHORITY\\SYSTEM:(OI)(CI)(F)",
          "GIONGPC\\Administrator:(OI)(CI)(F)")


def copy_state() -> None:
    """CHỈ chuyển state của CBM (cache + runtime).

    KHÔNG chuyển `_lan` / `_lan_accounts.txt` / `_acl-backup`: đó là dữ liệu vận
    hành máy LAN (có mật khẩu tài khoản) — chuyển đi sẽ tạo bản thứ hai của
    credential và làm sai đường dẫn đã ghi trong AGENTS.md. Giữ nguyên tại
    D:\\CBMState cho tới khi Đại Ca muốn dọn hẳn.
    """
    for item in ("cache", "runtime"):
        src = OLD_STATE / item
        if not src.exists():
            continue
        dst = NEW_STATE / item
        code, out = run(["robocopy", str(src), str(dst), "/E", "/NFL", "/NDL", "/NJH", "/NJS", "/R:2", "/W:1"])
        # robocopy: exit < 8 = thành công
        log(f"   robocopy {item}: exit={code} ({'OK' if code < 8 else 'LỖI'})")


def update_config(new_env: dict[str, str]) -> None:
    cfg = json.loads(CONFIG.read_text(encoding="utf-8"))
    srv = cfg.setdefault("mcp", {}).setdefault("servers", {}).setdefault("codebase-memory", {})
    srv.setdefault("env", {}).update(new_env)
    CONFIG.write_text(json.dumps(cfg, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    log(f"   config.json -> {new_env}")


def apply(remove_old: bool) -> int:
    log("=== GĐ 585 — CHUYỂN CBM STATE VÀO DỰ ÁN (APPLY) ===\n")
    if not OLD_STATE.exists():
        log(f"❌ Không thấy state cũ {OLD_STATE} — dừng.")
        return 2

    log("[1/7] Backup ACL + config")
    backup_acl()

    log("\n[2/7] Cấp Modify cho lan* ở các mục cấp 1 (làm TRƯỚC khi bỏ quyền cha)")
    grant_children()

    log("\n[3/7] Siết 2 cấp cha: chỉ-đọc cho Everyone/lan*, toàn quyền cho SYSTEM/Admins")
    tighten_parents()

    log("\n[4/7] Tạo state mới với ACL sạch")
    make_new_state()
    log(f"   {NEW_STATE}")

    log("\n[5/7] Copy state")
    copy_state()

    log("\n[6/7] Cập nhật config MCP")
    update_config({"CBM_CACHE_DIR": str(NEW_STATE / "cache"),
                   "CBM_RUNTIME_DIR": str(NEW_STATE / "runtime")})

    log("\n[7/7] Verify")
    ok, detail = verify_cbm(NEW_STATE / "cache", NEW_STATE / "runtime")
    log(f"   CBM với state mới: {'✅ PASS' if ok else '❌ FAIL'}")
    log(f"   {detail}")
    bad = has_write_for_untrusted(acl_of(PROJ_ROOT)) + has_write_for_untrusted(acl_of(ROOT))
    log(f"   ACE quyền-ghi ngoài trusted ở 2 cấp cha: {len(bad)}"
        + ("  ✅" if not bad else "  ❌ " + "; ".join(bad)))

    if ok and not bad:
        log("\n✅ CHUYỂN XONG. Việc còn lại:")
        log("   1) Kiểm chứng trên máy LAN: .245 (Y:) và .27/.34 (Z:) — duyệt + ghi thử 1 file")
        log("   2) Restart phiên ZCode để MCP nạp env mới")
        log(f"   3) Verify bằng tay: {CBM_EXE} cli --quiet list_projects")
        if remove_old:
            log(f"   4) Xoá state cũ: rmdir /s /q {OLD_STATE}")
        else:
            log(f"   4) State cũ giữ nguyên ở {OLD_STATE} (xoá sau khi chắc: --apply --remove-old)")
        log(f"\n   Rollback: python {Path(__file__).name} --rollback --backup {BACKUP_DIR}")
        return 0

    log("\n❌ VERIFY KHÔNG ĐẠT — chạy rollback:")
    log(f"   python {Path(__file__).name} --rollback --backup {BACKUP_DIR}")
    return 1


def rollback(backup: Path | None) -> int:
    log("=== GĐ 585 — ROLLBACK ===\n")
    if backup is None or not backup.exists():
        # tự tìm bản backup mới nhất
        cands = sorted((REPO / "backups").glob("gd585-*"), reverse=True)
        if not cands:
            log("❌ Không tìm thấy backup gd585-* — dừng. Khôi phục tay từ acl-hien-trang.txt nếu cần.")
            return 2
        backup = cands[0]
    log(f"Backup dùng: {backup}")

    for src, name in (("D:\\", "acl-DuLieuChung.txt"), ("D:\\", "acl-CUONG_2026.txt")):
        f = backup / name
        if f.exists():
            code, out = icacls(src, "/restore", str(f))
            log(f"   restore {name} (exit {code})")

    cfg_bak = backup / "config.json.bak"
    if cfg_bak.exists():
        shutil.copy2(cfg_bak, CONFIG)
        log("   config.json đã khôi phục")

    ok, detail = verify_cbm(OLD_STATE / "cache", OLD_STATE / "runtime")
    log(f"   CBM với state CŨ: {'✅ PASS' if ok else '❌ FAIL'}")
    log(f"   {detail}")
    log("\n⚠️  Khởi động lại phiên ZCode để MCP nạp lại config.")
    return 0 if ok else 1


def verify_only() -> int:
    st = check_state()
    log("=== GĐ 585 — KIỂM CHỨNG TRẠNG THÁI HIỆN TẠI ===\n")
    log(f"config env           : {st['config_env']}")
    log(f"state cũ tồn tại     : {st['old_state_exists']}  ({OLD_STATE})")
    log(f"state mới tồn tại    : {st['new_state_exists']}  ({NEW_STATE})\n")

    for label, path, acl in (("D:\\DuLieuChung", ROOT, st["acl_root"]),
                             ("CUONG_2026", PROJ_ROOT, st["acl_proj"])):
        log(f"--- ACL {label} ---")
        for line in acl:
            log(f"   {line}")
        bad = has_write_for_untrusted(acl)
        log(f"   ACE ghi ngoài trusted: {len(bad)}" + ("  ✅" if not bad else "  ❌"))
        log("")

    cur = Path(st["config_env"].get("CBM_CACHE_DIR", OLD_STATE / "cache"))
    rt = Path(st["config_env"].get("CBM_RUNTIME_DIR", OLD_STATE / "runtime"))
    ok, detail = verify_cbm(cur, rt)
    log(f"CBM chạy với state đang cấu hình: {'✅ PASS' if ok else '❌ FAIL'}")
    log(f"   {detail}")
    return 0 if ok else 1


def main() -> int:
    ap = argparse.ArgumentParser(description="GĐ 585 — chuyển CBM state vào D:\\DuLieuChung\\CUONG_2026")
    ap.add_argument("--apply", action="store_true", help="thực thi (mặc định chỉ dry-run)")
    ap.add_argument("--verify", action="store_true", help="chỉ kiểm chứng trạng thái hiện tại")
    ap.add_argument("--rollback", action="store_true", help="khôi phục ACL + config về trước")
    ap.add_argument("--backup", type=Path, default=None, help="thư mục backup cho --rollback")
    ap.add_argument("--remove-old", action="store_true", help="xoá D:\\CBMState sau khi verify PASS")
    args = ap.parse_args()

    if args.verify:
        return verify_only()
    if args.rollback:
        return rollback(args.backup)
    if args.apply:
        return apply(args.remove_old)

    # DRY-RUN
    log("=== GĐ 585 — DRY-RUN (chưa làm gì) ===\n")
    st = check_state()
    log(f"State cũ : {OLD_STATE}  (tồn tại: {st['old_state_exists']})")
    log(f"State mới: {NEW_STATE}")
    log(f"config hiện tại: {st['config_env']}\n")
    bad_root = has_write_for_untrusted(st["acl_root"])
    bad_proj = has_write_for_untrusted(st["acl_proj"])
    log(f"ACE ghi ngoài trusted — {ROOT}: {len(bad_root)}")
    for b in bad_root:
        log(f"   {b}")
    log(f"ACE ghi ngoài trusted — {PROJ_ROOT}: {len(bad_proj)}")
    for b in bad_proj:
        log(f"   {b}")
    log("\nKẾ HOẠCH KHI --apply:\n")
    for l in plan_lines():
        log(f"   {l}")
    log("\n👉 Thêm --apply để thực thi.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
