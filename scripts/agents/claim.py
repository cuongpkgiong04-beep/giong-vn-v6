#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""claim.py — GĐ 535: CẤP SỐ GIAI ĐOẠN TỰ ĐỘNG — hết trùng số giữa các Agent.

VẤN ĐỀ (bằng chứng 26/10/2026): ~20 vụ trùng số thật chỉ riêng tháng 10/2026
(403/405 · 408 · 411/414 · 413/435 · 420/421 · 435/436 · 477 · 485/486 · 495/496 ·
500/501 · 512/513/514 · 515/516 · 517 · C.184/185 · C.242/244 · C.302 · C.306/307 ·
C.328/329). Quy tắc GĐ 285 nói "claim TRƯỚC khi làm" nhưng cách làm THỦ CÔNG: mỗi
phiên tự grep `git log` + đọc bảng registry (247KB) + AGENTS.md (440KB) + archive
(1.1MB) rồi tự tính max+1 → 2 phiên đọc cùng lúc THẤY cùng max → chọn cùng số.
Vụ GĐ 420: 2 phiên commit claim cách nhau 74 GIÂY — cả 2 đều làm đúng quy tắc
mà vẫn trùng, vì thao tác "đọc số → ghi số" không phải một khối nguyên tử.

CÁCH CHỐNG: 1 LỆNH duy nhất — tự quét MỌI nguồn số (registry + entry AGENTS.md/
ARCHIVE trên MỌI ref kể cả nhánh chưa merge + commit message mọi nhánh + repo con
cho dải C.x) → max+1 → tự ghi dòng 🔒 vào AGENT_REGISTRY.md → tự commit NGAY qua
cổng shared-doc. Khóa toàn cục (nằm trong .git dùng chung MỌI worktree) bảo đảm
2 phiên chạy đồng thời vẫn nối tiếp nhau — không bao giờ cùng số.

Chống "số rác": registry + entry là NEO (nguồn chuẩn GĐ 285); số từ commit message/
repo con chỉ được tính nếu nằm trong NEO+10 — xa hơn bị bỏ + in cảnh báo (bài học
thật: commit repo con 4c8a34a ghi "C.295/C.455" là số khác hệ, không phải dải C.x).

DÙNG:
  python scripts/agents/claim.py check
      # báo cáo: max 2 dải + số ĐANG GIỮ (🔒) + commit có số chưa push
  python scripts/agents/claim.py claim --agent "Trợ lý Freebuff" --task "mô tả việc" [--scope "file dự kiến"] [--cx] [--dry-run]
      # tự cấp số (GĐ n [+ C.m]) + ghi registry + commit ngay
  python scripts/agents/claim.py done --gd 535 [--hash abc1234] [--note "kết quả ngắn"]
      # đổi dòng 🔒 → ✅ kèm hash khi xong việc
"""
from __future__ import annotations

import argparse
import os
import re
import socket
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# Gốc app tổng: script luôn nằm ở <gốc>/scripts/agents/claim.py (chạy từ cwd nào cũng đúng).
ROOT = Path(__file__).resolve().parents[2]
REG = "AGENT_REGISTRY.md"
SHARED_PY = ROOT / "scripts" / "agents" / "shared-doc.py"
LOCK_NAME = "giong-claim.lock"
STALE_LOCK_SECONDS = 300
SPREAD = 10          # số từ commit message/repo con xa hơn NEO+SPREAD = nghi số rác, bỏ

GD_RE = re.compile(r"G[Đđ]\s*(\d+)")
CX_RE = re.compile(r"C\.\s*(\d+)")
ROW_RE = re.compile(r"^\|\s*((?:GĐ|C\.)\s*\d+)", re.I)
HEADING_NUM_RE = re.compile(r"^(?:###|\|\s*)\s*(?:GĐ|C\.)\s*\d+", re.I)
MARKERS = ("🔒", "✅", "🔄", "❌")


# ------------------------------------------------------------------ tiện ích git
def git(*args, cwd=None, check=True) -> str:
    p = subprocess.run(["git", *args], cwd=str(cwd or ROOT),
                       capture_output=True, text=True, encoding="utf-8", errors="replace")
    if p.returncode != 0:
        if check:
            raise SystemExit(f"❌ git {' '.join(args)} thất bại: {(p.stderr or '').strip()[:300]}")
        return ""
    return (p.stdout or "").rstrip("\n")


def now_iso() -> str:
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


# --------------------------------------------------------------------- quét số
def feed(text: str, src: str, gd: set, cx: set, holders: dict, rows_only: bool = False) -> int:
    """Trích số từ văn bản. holders chỉ nhận từ DÒNG BẢNG registry (biết ai đang giữ)."""
    n = 0
    for line in text.splitlines():
        m = ROW_RE.match(line)
        if m:
            cells = [c.strip() for c in line.split("|")]
            cell0 = cells[1] if len(cells) > 1 else ""      # Ô SỐ (chỉ ô này chứa số định danh)
            who = ""
            wm = re.search(r"\(([^)]+)\)", cell0)
            if wm:
                who = wm.group(1).strip()
            task = ""
            for c in cells[2:]:
                if any(mk in c for mk in MARKERS):
                    task = c
                    break
            if not task and len(cells) > 2:
                task = max((c for c in cells[2:]), key=len, default="")
            if any(c.startswith(("🔒", "🔄")) for c in cells[2:]):
                st = "🔒"
            elif "🔒→✅" in line or "✅" in line:
                st = "✅"
            elif "❌" in line:
                st = "❌"
            else:
                st = "?"
            for k in GD_RE.findall(cell0):
                gd.add(int(k))
                holders.setdefault(f"GĐ {k}", dict(agent=who, status=st, task=task[:120], src=src))
                n += 1
            for k in CX_RE.findall(cell0):
                cx.add(int(k))
                holders.setdefault(f"C.{k}", dict(agent=who, status=st, task=task[:120], src=src))
                n += 1
        elif HEADING_NUM_RE.match(line):
            for k in GD_RE.findall(line):
                gd.add(int(k))
            for k in CX_RE.findall(line):
                cx.add(int(k))
            n += 1
    return n


def collect():
    """Quét MỌI nguồn số. Trả (gd, cx, holders, stats, child_ok, unpushed, warns)."""
    gd_anchor, cx_anchor = set(), set()          # NEO: registry + entry (nguồn chuẩn GĐ 285)
    gd_loose, cx_loose = set(), set()            # rời: commit message mọi nhánh + repo con
    holders: dict = {}
    stats = {"refs": 0, "hit_rows": 0}
    warns: list = []

    # 1) Bản HEAD (chuẩn đã commit) — ưu tiên cho holders
    for f in (REG, "AGENTS.md"):
        t = git("show", f"HEAD:{f}", check=False)
        if t:
            stats["hit_rows"] += feed(t, f"HEAD:{f}", gd_anchor, cx_anchor, holders)

    # 2) Bản trong MÁY (có thể chứa bài dở chưa commit) + ARCHIVE (máy)
    for f in (REG, "AGENTS.md", "AGENTS_ARCHIVE.md"):
        p = ROOT / f
        if p.exists():
            stats["hit_rows"] += feed(p.read_text(encoding="utf-8", errors="replace"),
                                      f"máy:{f}", gd_anchor, cx_anchor, holders)

    # 3) MỌI ref: nhánh local (main/agent-cli/...) + remote — thấy claim CHƯA MERGE/chưa push
    refs = [r for r in git("for-each-ref", "--format=%(refname)").splitlines()
            if (r.startswith("refs/heads/") or r.startswith("refs/remotes/origin/"))
            and not r.endswith("/HEAD")]
    for ref in refs:
        stats["refs"] += 1
        for f in (REG, "AGENTS.md"):
            t = git("show", f"{ref}:{f}", check=False)
            if t:
                stats["hit_rows"] += feed(t, f"{ref}:{f}", gd_anchor, cx_anchor, holders)

    # 4) Commit message mọi nhánh (rời) — bắt cả commit chưa push ở bất kỳ nhánh nào
    log = git("log", "--all", "--pretty=%h|%ad|%s", "--date=short", check=False)
    for line in log.splitlines():
        for k in GD_RE.findall(line):
            gd_loose.add(int(k))
        for k in CX_RE.findall(line):
            cx_loose.add(int(k))

    # 5) Repo con (dải C.x) — đọc file + commit message repo con (rời)
    child_ok = False
    for name in ("giong-apps", "giong-apps-cli"):
        child = ROOT / name
        if (child / ".git").exists() or (child / ".git").is_file():
            child_ok = True
            for f in (REG, "AGENTS.md"):
                p = child / f
                if p.exists():
                    feed(p.read_text(encoding="utf-8", errors="replace"),
                         f"{name}:{f}", gd_loose, cx_loose, holders)
            t = git("log", "--all", "--pretty=%s", cwd=child, check=False)
            for line in t.splitlines():
                for k in GD_RE.findall(line):
                    gd_loose.add(int(k))
                for k in CX_RE.findall(line):
                    cx_loose.add(int(k))

    # 6) Hợp nhất với ngưỡng chống số rác
    def merge(anchor: set, loose: set, tag: str) -> set:
        out = set(anchor)
        base = max(anchor) if anchor else 0
        for n in sorted(loose):
            if not anchor or n <= base + SPREAD:
                out.add(n)
            else:
                warns.append(f"{tag} {n}")
        return out

    gd = merge(gd_anchor, gd_loose, "GĐ")
    cx = merge(cx_anchor, cx_loose, "C.")

    # 7) Commit có số nhưng CHƯA push (bỏ stash — "On main:"/"WIP on"/"index on")
    raw = git("log", "--all", "--not", "origin/main", "--pretty=%h|%ad|%s", "--date=short", check=False)
    unpushed = "\n".join(l for l in raw.splitlines()
                         if not l.split("|", 2)[-1].startswith(("On ", "WIP on", "index on")))

    return gd, cx, holders, stats, child_ok, unpushed, warns


# ----------------------------------------------------------------------- khóa
def common_git_dir() -> Path:
    d = Path(git("rev-parse", "--git-common-dir"))
    if not d.is_absolute():
        d = (ROOT / d).resolve()
    return d


def acquire_lock(timeout: int = 90):
    """Khóa toàn cục trong .git dùng chung MỌI worktree — 2 phiên không bao giờ cấp cùng số."""
    lock = common_git_dir() / LOCK_NAME
    t0 = time.time()
    while True:
        try:
            fd = os.open(str(lock), os.O_CREAT | os.O_EXCL | os.O_WRONLY)
            os.write(fd, f"pid={os.getpid()} host={socket.gethostname()} at={now_iso()}".encode())
            return fd, lock
        except FileExistsError:
            try:
                age = time.time() - lock.stat().st_mtime
                holder = lock.read_text(encoding="utf-8", errors="replace")[:80]
            except OSError:
                age, holder = 0, "?"
            if age > STALE_LOCK_SECONDS:
                print(f"⚠️  Khóa cũ quá {STALE_LOCK_SECONDS}s (phiên trước treo?) — dọn: {holder}")
                try:
                    lock.unlink()
                except OSError:
                    pass
                continue
            if time.time() - t0 > timeout:
                raise SystemExit(f"❌ Không lấy được khóa sau {timeout}s — phiên khác đang claim ({holder}). "
                                 f"Thử lại sau. File: {lock}")
            print(f"⏳ Phiên khác đang giữ khóa ({int(age)}s: {holder}) — chờ...", end="\r")
            sys.stdout.flush()
            time.sleep(1.5)


def release_lock(fd, lock: Path):
    try:
        os.close(fd)
    except OSError:
        pass
    try:
        lock.unlink()
    except OSError:
        pass


# ------------------------------------------------------------------ ghi registry
def append_keep_eol(path: Path, line: str):
    """Append 1 dòng GIỮ NGUYÊN kiểu xuống dòng của file (không CRLF→LF toàn file)."""
    raw = path.read_bytes()
    old = raw
    crlf = raw.count(b"\r\n")
    lf = raw.count(b"\n") - crlf
    eol = b"\r\n" if crlf > lf else b"\n"
    if raw and not raw.endswith(eol):
        raw = raw.rstrip(b"\r\n") + eol
    raw += line.encode("utf-8") + eol
    path.write_bytes(raw)
    return old


def gate_commit(label: str, agent: str, task: str, registry_key: str) -> int:
    """Commit qua CỔNG shared-doc (ghép chỉ dòng mình lên bản HEAD — không nuốt bài phiên khác)."""
    msg = f"docs(registry): {label} ({agent}) — claim {task[:90]}"
    p = subprocess.run([sys.executable, str(SHARED_PY), "commit",
                        "--entry", registry_key, "--registry", registry_key, "-m", msg],
                       cwd=str(ROOT))
    return p.returncode


# ---------------------------------------------------------------------- lệnh
def report(gd, cx, holders, stats, child_ok, unpushed, warns, tail: str = ""):
    gd_max = max(gd) if gd else 0
    cx_max = max(cx) if cx else 0
    print("=" * 76)
    print(f"CẤP SỐ GIAI ĐOẠN — BÁO CÁO ({now_iso()})")
    print(f"Nguồn quét: {stats['refs']} ref (mọi nhánh) · {stats['hit_rows']} dòng registry/entry · "
          f"repo con: {'có' if child_ok else 'không thấy'}")
    print(f"Dải GĐ : max {gd_max}  ->  số tiếp theo = GĐ {gd_max + 1}")
    print(f"Dải C.x: max {cx_max}  ->  số tiếp theo = C.{cx_max + 1}")
    if warns:
        print(f"⚠️  Bỏ qua {len(warns)} số nằm XA ngoài dải chuẩn (nghi số rác/khác hệ): "
              f"{', '.join(warns[:8])}{'...' if len(warns) > 8 else ''}")

    held = sorted([(k, v) for k, v in holders.items() if v["status"] == "🔒"],
                  key=lambda kv: (kv[0][:2] != "GĐ", -int(re.search(r"\d+", kv[0]).group())))
    print(f"\nĐANG GIỮ (🔒 — nhận nhưng chưa xong) — {len(held)} mục:")
    for k, v in held[:15]:
        print(f"  {k:<14} {v['agent']:<17} {v['task'][:78]}")
    if len(held) > 15:
        print(f"  ... và {len(held) - 15} mục nữa")

    up = [l for l in unpushed.splitlines() if GD_RE.search(l) or CX_RE.search(l)]
    print(f"\nCOMMIT CÓ SỐ CHƯA PUSH (ngoài origin/main) — {len(up)} commit:")
    for l in up[:10]:
        print(f"  {l[:110]}")
    if len(up) > 10:
        print(f"  ... và {len(up) - 10} commit nữa")

    if tail:
        print(f"\n{tail}")
    print("=" * 76)


def cmd_check(_a):
    gd, cx, holders, stats, child_ok, unpushed, warns = collect()
    report(gd, cx, holders, stats, child_ok, unpushed, warns,
           tail='➡️  Claim an toàn (tự quét + tự khóa + tự commit):\n'
                '    python scripts/agents/claim.py claim --agent "<tên Agent>" --task "<mô tả việc>" [--cx]')
    print("⚠️  Lưu ý: bài dở CHƯA COMMIT ở worktree khác vẫn không nhìn thấy được — "
          "vì vậy claim.py LUÔN commit ngay khi cấp số.")
    return 0


def cmd_claim(a):
    gd, cx, holders, stats, child_ok, unpushed, warns = collect()
    new_gd = (max(gd) if gd else 0) + 1
    new_cx = ((max(cx) if cx else 0) + 1) if a.cx else None
    label = f"GĐ {new_gd}" + (f" / C.{new_cx}" if new_cx else "")
    report(gd, cx, holders, stats, child_ok, unpushed, warns)
    print(f"➡️  SẼ CẤP: {label}")
    if a.dry_run:
        print("🧪 --dry-run: không ghi gì (chạy lại không có --dry-run để cấp số thật).")
        return 0

    fd, lock = acquire_lock()
    try:
        gd2, cx2, _, _, _, _, _ = collect()       # quét LẠI sau khi có khóa (phòng phiên khác vừa claim)
        if ((max(gd2) if gd2 else 0) + 1) != new_gd or (a.cx and ((max(cx2) if cx2 else 0) + 1) != new_cx):
            new_gd = (max(gd2) if gd2 else 0) + 1
            new_cx = ((max(cx2) if cx2 else 0) + 1) if a.cx else None
            label = f"GĐ {new_gd}" + (f" / C.{new_cx}" if new_cx else "")
            print(f"🔁 Số vừa bị phiên khác chiếm trong lúc chờ — cấp lại: {label}")

        row = f"| {label} ({a.agent}) | {a.agent} | 🔒 {a.task}"
        row += f" | {a.scope} |" if a.scope else " |"
        old = append_keep_eol(ROOT / REG, row)
        print(f"✍️  Đã ghi dòng vào {REG}: {label}")
        rc = gate_commit(label, a.agent, a.task, f"GĐ {new_gd}")
        if rc != 0:
            (ROOT / REG).write_bytes(old)          # trả nguyên trạng — không để rác
            raise SystemExit("❌ Commit qua cổng thất bại — đã trả AGENT_REGISTRY.md nguyên trạng. "
                             "Chạy: python scripts/agents/shared-doc.py check")
        h = git("rev-parse", "--short", "HEAD")
        print(f"\n✅ ĐÃ KHÓA SỐ {label} — commit `{h}` (đã commit ngay, mọi phiên khác thấy liền qua git log --all).")
        print("   Push khi Đại Ca cho lệnh (quy tắc ĐA AGENT — claim chỉ commit, không push).")
        print(f"   Khi xong việc: python scripts/agents/claim.py done --gd {new_gd} --hash <hash code>")
        return 0
    finally:
        release_lock(fd, lock)


def cmd_done(a):
    # Dòng đích lấy từ HEAD (bản chuẩn đã commit); thay bằng cơ chế --replace của cổng
    # (dòng đã tồn tại trong HEAD nên KHÔNG dùng đường "ghép dòng mới" — sẽ không commit gì).
    head = git("show", f"HEAD:{REG}", check=False)
    src = head if head else (ROOT / REG).read_text(encoding="utf-8", errors="replace")
    target = re.compile(r"^\|\s*GĐ\s*%d\b" % a.gd, re.I)
    old_line = next((l for l in src.splitlines() if target.match(l)), None)
    if old_line is None:
        raise SystemExit(f"❌ Không thấy dòng '| GĐ {a.gd}' trong {REG} bản HEAD. "
                         f"Chạy: python scripts/agents/shared-doc.py check (bản máy có thể lệch).")
    if "🔒" not in old_line:
        raise SystemExit(f"ℹ️ Dòng GĐ {a.gd} không còn 🔒 (đã unlock trước đó?) — không làm gì.")

    new_line = old_line.replace("🔒", "✅", 1)
    extra = []
    if a.hash:
        extra.append(f"✅ HOÀN TẤT (commit `{a.hash}`)")
    if a.note:
        extra.append(a.note)
    if extra:
        if new_line.endswith("|"):
            new_line = new_line[:-1].rstrip() + " · " + " · ".join(extra) + " |"
        else:
            new_line = new_line + " · " + " · ".join(extra)

    msg = f"docs(registry): GĐ {a.gd} — unlock ✅ {a.note[:80] or 'hoàn tất'}"
    p = subprocess.run([sys.executable, str(SHARED_PY), "commit",
                        "--entry", f"GĐ {a.gd}", "--registry", f"GĐ {a.gd}",
                        "--replace-old", old_line, "--replace-new", new_line,
                        "--file", REG, "-m", msg], cwd=str(ROOT))
    if p.returncode != 0:
        raise SystemExit("❌ Commit unlock thất bại — không có gì bị sửa (cổng an toàn tự khôi phục).")
    h = git("rev-parse", "--short", "HEAD")
    print(f"✅ ĐÃ UNLOCK GĐ {a.gd} (🔒 → ✅) — commit `{h}`.")
    return 0


def main():
    ap = argparse.ArgumentParser(description="Cấp số GĐ/C.x tự động — chống trùng đa agent (GĐ 535).")
    sub = ap.add_subparsers(dest="cmd", required=True)

    sub.add_parser("check", help="báo cáo max 2 dải + số đang giữ 🔒 + commit chưa push").set_defaults(fn=cmd_check)

    pc = sub.add_parser("claim", help="cấp số mới: quét mọi nguồn → max+1 → ghi registry → commit ngay")
    pc.add_argument("--agent", default="Trợ lý Freebuff", help='tên Agent (VD "Trợ lý Freebuff")')
    pc.add_argument("--task", required=True, help="mô tả ngắn nhiệm vụ")
    pc.add_argument("--scope", default="", help="phạm vi file dự kiến")
    pc.add_argument("--cx", action="store_true", help="claim kèm số C.x (nhiệm vụ có đụng repo con)")
    pc.add_argument("--dry-run", action="store_true", help="chỉ in số sẽ cấp, không ghi gì")
    pc.set_defaults(fn=cmd_claim)

    pd = sub.add_parser("done", help="đổi dòng 🔒 → ✅ kèm hash khi xong việc")
    pd.add_argument("--gd", type=int, required=True, help="số GĐ cần unlock (VD 535)")
    pd.add_argument("--hash", default="", help="commit hash của code (VD abc1234)")
    pd.add_argument("--note", default="", help="ghi chú ngắn kết quả")
    pd.set_defaults(fn=cmd_done)

    a = ap.parse_args()
    return a.fn(a)


if __name__ == "__main__":
    sys.exit(main())
