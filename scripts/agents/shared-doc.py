#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""shared-doc.py — GĐ 495: CỔNG AN TOÀN cho FILE DÙNG CHUNG (AGENTS.md,
AGENT_REGISTRY.md, AGENTS_ARCHIVE.md) khi có NHIỀU PHIÊN AI làm song song.

VẤN ĐỀ (2 lần tai nạn thật: GĐ 470 và GĐ 494/21-10-2026):
  1. Phiên A `git add AGENTS.md` khi file đang chứa BÀI DỞ của phiên B → commit
     của A NUỐT bài của B (nội dung không mất nhưng gán nhầm commit, B hoang mang).
  2. Worktree của phiên B bị LỆCH (thiếu entry phiên A đã commit) → B commit
     nguyên file → XOÁ bài của A.

CÁCH CHỐNG: mọi commit vào file dùng chung phải đi qua script này. Script KHÔNG
bao giờ lấy nguyên file worktree — nó ghép **chỉ những entry mình khai** lên trên
bản HEAD (đã có đủ bài mọi phiên), rồi trả lại nguyên vẹn bản dở của phiên khác
trong worktree. Kèm hook pre-commit (install-hooks.py) chặn commit trực tiếp +
chặn mọi hành vi XOÁ entry/registry.

DÙNG:
  python scripts/agents/shared-doc.py check                     # tình trạng 2 đầu
  python scripts/agents/shared-doc.py list                      # entry chưa commit
  python scripts/agents/shared-doc.py commit --entry "GĐ 495" --registry "GĐ 495" -m "docs: ..."
  python scripts/agents/shared-doc.py commit --all-new -m "docs: ..."
  python scripts/agents/shared-doc.py restore                   # khôi phục bản dở phiên khác (nếu lỡ mất)
"""
import argparse
import re
import shutil
import subprocess
import sys
from datetime import datetime
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

SHARED_FILES = ["AGENTS.md", "AGENT_REGISTRY.md", "AGENTS_ARCHIVE.md"]
ENTRY_HEAD = re.compile(r"^###\s+((?:GĐ|C\.)\s*\d+)", re.IGNORECASE)
ROW_HEAD = re.compile(r"^\|\s*((?:GĐ|C\.)\s*\d+)", re.IGNORECASE)


def git(*args, check=True):
    p = subprocess.run(["git", *args], capture_output=True, text=True, encoding="utf-8", errors="replace")
    if check and p.returncode != 0:
        raise RuntimeError(f"git {' '.join(args)} → {p.returncode}: {(p.stderr or p.stdout)[:300]}")
    return (p.stdout or "").strip()


def head_text(path: str) -> str:
    p = subprocess.run(["git", "show", f"HEAD:{path}"], capture_output=True, text=True,
                       encoding="utf-8", errors="replace")
    return p.stdout if p.returncode == 0 else ""


def read(path: str) -> str:
    try:
        return Path(path).read_text(encoding="utf-8")
    except FileNotFoundError:
        return ""


def entries(text: str) -> dict:
    """{key: block} — key = 'GĐ 495' / 'C.316'; entry = từ dòng '### <key>' tới trước '### ' kế."""
    out, cur_key, cur = {}, None, []
    for line in text.splitlines():
        m = ENTRY_HEAD.match(line)
        if line.startswith("### "):
            if cur_key:
                out[cur_key] = "\n".join(cur).rstrip("\n")
            cur_key, cur = (m.group(1).replace("  ", " ") if m else None), [line]
        elif cur_key is not None:
            cur.append(line)
    if cur_key:
        out[cur_key] = "\n".join(cur).rstrip("\n")
    return out


def rows(text: str) -> dict:
    """{key: row_text} — dòng bảng registry bắt đầu bằng '| GĐ …' / '| C.…'."""
    out = {}
    for line in text.splitlines():
        m = ROW_HEAD.match(line)
        if m and line.rstrip().endswith("|"):
            out.setdefault(m.group(1).replace("  ", " "), line)
    return out


def norm(k: str) -> str:
    return re.sub(r"\s+", " ", k.strip()).upper().replace("Đ", "Đ")


BLOCK_RE = re.compile(
    r"<!--\s*SHARED-BLOCK:(.+?)\s+START\s*-->(.*?)<!--\s*SHARED-BLOCK:\1\s+END\s*-->",
    re.S)


def block_of(text: str, name: str) -> str:
    for m in BLOCK_RE.finditer(text):
        if m.group(1).strip() == name:
            return m.group(0).strip()
    return ""


def apply_block(base: str, wt: str, name: str, after: str) -> tuple:
    """Chèn/thay KHỐI QUY TẮC có dấu <!-- SHARED-BLOCK:name START/END --> trong file.
    Có sẵn trong base → thay tại chỗ. Chưa có → chèn ngay SAU dòng chứa `after`
    (điểm neo) — nhờ vậy không phải sửa tay phần của phiên khác."""
    blk = block_of(wt, name)
    if not blk:
        return base, False
    cur = block_of(base, name)
    if cur:
        return base.replace(cur, blk, 1), True
    lines = base.splitlines()
    idx = None
    for i, ln in enumerate(lines):
        if after and after in ln:
            idx = i
            break
    if idx is None:
        return base, False
    new = lines[:idx + 1] + ["", blk, ""] + lines[idx + 1:]
    return "\n".join(new), True


def find_key(store: dict, want: str):
    w = norm(want)
    for k in store:
        if norm(k) == w or norm(k).startswith(w) or w.startswith(norm(k)):
            return k
    return None


def cmd_check(_a):
    print("=" * 74)
    print(f"CỔNG FILE DÙNG CHUNG — {Path.cwd()}")
    dirty = git("status", "--porcelain")
    for f in SHARED_FILES:
        h, w = head_text(f), read(f)
        if not h and not w:
            continue
        he, we = entries(h), entries(w)
        only_head = [k for k in he if k not in we]
        only_wt = [k for k in we if k not in he]
        flag = ""
        if only_head:
            flag = f"  ⚠️ {len(only_head)} entry có ở HEAD mà THIẾU trong worktree → commit nguyên file sẽ XOÁ: {only_head[:4]}"
        print(f"\n• {f}")
        print(f"   entry: HEAD {len(he)} · worktree {len(we)} · chưa commit {len(only_wt)} {only_wt[:5] if only_wt else ''}")
        if flag:
            print(flag)
        if f == "AGENT_REGISTRY.md":
            hr, wr = rows(h), rows(w)
            miss = [k for k in hr if k not in wr]
            if miss:
                print(f"   ⚠️ dòng registry có ở HEAD mà thiếu trong worktree: {miss[:4]}")
        if f in dirty:
            print("   (file đang có thay đổi chưa commit)")
    print("\n→ Commit file dùng chung: python scripts/agents/shared-doc.py commit --entry \"GĐ xxx\" -m \"...\"")
    return 0


def cmd_list(_a):
    for f in SHARED_FILES:
        h, w = head_text(f), read(f)
        if not w:
            continue
        new = [k for k in entries(w) if k not in entries(h)]
        newr = [k for k in rows(w) if k not in rows(h)] if f.endswith("REGISTRY.md") else []
        if new or newr:
            print(f"{f}: entry mới CHƯA commit = {new} · dòng registry mới = {newr}")
    return 0


def snapshot(path: str) -> str:
    """Lưu bản worktree hiện tại (bài dở mọi phiên) để khôi phục — KHÔNG BAO GIỜ mất bài."""
    common = Path(git("rev-parse", "--git-common-dir"))
    if not common.is_absolute():
        common = Path.cwd() / common
    d = common / "giong-shared-wip"
    d.mkdir(exist_ok=True)
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    dst = d / f"{path.replace('/', '_')}.{ts}.bak"
    shutil.copy2(path, dst)
    keep = sorted(d.glob(f"{path.replace('/', '_')}.*.bak"))[:-50]
    for old in keep:
        old.unlink(missing_ok=True)
    return str(dst)


def cmd_commit(a):
    keys = [k.strip() for k in (a.entry or [])]
    reg_keys = [k.strip() for k in (a.registry or [])] or keys
    if not keys and not a.all_new and not a.block:
        print("❌ Thiếu --entry \"GĐ xxx\" (hoặc --all-new / --block) — xem docstring.")
        return 2
    changed = []
    for f in SHARED_FILES:
        w = read(f)
        if not w:
            continue
        h = head_text(f)
        we, he = entries(w), entries(h)
        want = [k for k in we if k not in he] if a.all_new else [
            (find_key(we, k) or k) for k in keys]
        add_blocks, add_rows = [], []
        if f == "AGENT_REGISTRY.md":
            wr, hr = rows(w), rows(h)
            for k in reg_keys:
                kk = find_key(wr, k) or k
                if kk in wr and kk not in hr:
                    add_rows.append(wr[kk])
        else:
            for k in want:
                if k in we and k not in he:
                    add_blocks.append(we[k])
        merged_blk = None
        if a.block and f == "AGENTS.md":
            base_txt = h if h else ""
            new_txt, ok = apply_block(base_txt, w, a.block, a.after or "")
            if ok:
                merged_blk = new_txt
            else:
                print(f"   ⚠️ {f}: không thấy khối '{a.block}' trong worktree hoặc thiếu điểm neo — bỏ qua khối")
        if not add_blocks and not add_rows and merged_blk is None:
            continue
        bak = snapshot(f)                                    # bảo hiểm bản dở phiên khác
        merged = merged_blk if merged_blk is not None else (h if h else "")
        for b in add_blocks:
            merged = merged.rstrip("\n") + "\n\n" + b + "\n"
        for r in add_rows:
            merged = merged.rstrip("\n") + "\n" + r + "\n"
        Path(f).write_text(merged, encoding="utf-8", newline="")
        print(f"   🔀 {f}: ghép {len(add_blocks)} entry + {len(add_rows)} dòng registry"
              f"{' + 1 khối quy tắc' if merged_blk is not None else ''} lên bản HEAD "
              f"(bản dở phiên khác đã backup: {Path(bak).name})")
        changed.append(f)
    if not changed:
        print("ℹ️ Không có gì để ghép (entry/registry đã nằm trong HEAD?).")
        return 0
    msg = a.msg or f"docs: {', '.join(keys) or 'entry mới'}"
    git("add", *changed)
    p = subprocess.run(["git", "commit", "-m", msg, "--", *changed],
                       capture_output=True, text=True, encoding="utf-8", errors="replace",
                       env={**__import__("os").environ, "GIONG_SHARED_OK": "1"})
    print((p.stdout or "").strip()[:600] or (p.stderr or "").strip()[:600])
    if p.returncode != 0:
        return p.returncode
    # TRẢ LẠI nguyên vẹn bản dở của phiên khác trong worktree (không đụng bài của họ)
    common = Path(git("rev-parse", "--git-common-dir"))
    if not common.is_absolute():
        common = Path.cwd() / common
    for f in changed:
        snaps = sorted((common / "giong-shared-wip").glob(f"{f.replace('/', '_')}.*.bak"))
        if snaps:
            shutil.copy2(snaps[-1], f)
            print(f"   ↩️ trả lại worktree {f} = bản dở của phiên khác (đã giữ nguyên)")
    print(f"\n✅ ĐÃ COMMIT (qua cổng an toàn). Push khi Đại Ca cho lệnh.")
    return 0


def cmd_restore(_a):
    common = Path(git("rev-parse", "--git-common-dir"))
    if not common.is_absolute():
        common = Path.cwd() / common
    d = common / "giong-shared-wip"
    snaps = sorted(d.glob("*.bak")) if d.exists() else []
    if not snaps:
        print("ℹ️ Không có bản backup nào.")
        return 0
    print("Bản backup gần nhất:")
    for s in snaps[-8:]:
        print(f"   {s.name}  ({s.stat().st_size} bytes)")
    print("\nKhôi phục: copy file .bak mong muốn đè lên file gốc (tên trước dấu chấm đầu).")
    return 0


def main():
    ap = argparse.ArgumentParser(description="Cổng an toàn cho file dùng chung (GĐ 495)")
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("check").set_defaults(fn=cmd_check)
    sub.add_parser("list").set_defaults(fn=cmd_list)
    sub.add_parser("restore").set_defaults(fn=cmd_restore)
    pc = sub.add_parser("commit")
    pc.add_argument("--entry", action="append", help="số entry cần commit (VD \"GĐ 495\") — lặp lại được")
    pc.add_argument("--registry", action="append", help="số dòng registry cần ghép (mặc định = --entry)")
    pc.add_argument("--all-new", action="store_true", help="ghép MỌI entry mới của file (chỉ dùng khi chắc chắn)")
    pc.add_argument("--block", help="tên KHỐI QUY TẮC có dấu <!-- SHARED-BLOCK:<tên> START/END --> cần chèn/thay")
    pc.add_argument("--after", help="điểm neo: chèn khối ngay SAU dòng chứa chuỗi này (khi HEAD chưa có khối)")
    pc.add_argument("-m", "--msg", help="commit message")
    pc.set_defaults(fn=cmd_commit)
    a = ap.parse_args()
    return a.fn(a)


if __name__ == "__main__":
    sys.exit(main())
