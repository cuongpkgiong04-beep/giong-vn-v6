#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""GIONG VN — GĐ 607: RÀ TRÙNG LẶP TRƯỚC PUSH (tự động) — nguyên tắc 3 ĐA AGENT.

Đại Ca yêu cầu 31/10: "tự động luôn việc rà trùng lặp rồi Push". Trước mỗi lần push
phải biết các phiên AI có TRÙNG LẶP / SỬA ĐÈ nhau không (AGENTS.md — nguyên tắc Push
ĐA AGENT, mục 3). Script này quét:

  1. Nhánh phụ vs `main` (merge-base 2 chiều): file bị CẢ 2 BÊN sửa → ⚠️ nguy cơ trùng.
     (--symbols: soi thêm mức SYMBOL qua entire-graph diff — chậm hơn, chỉ khi cần)
  2. Mọi worktree: file ĐANG SỬA DỞ chưa commit (phiên khác có thể đang làm).
  3. Commit chưa push trên từng nhánh (nhánh nào đang giữ bài).

Chạy: python scripts/agents/ra-trung-lap.py            # báo cáo người đọc
      python scripts/agents/ra-trung-lap.py --json      # hook push-guard dùng
      python scripts/agents/ra-trung-lap.py --symbols   # soi sâu mức symbol (chậm)
"""
import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parent.parent.parent      # gốc app tổng
REPOS = [ROOT] if not (ROOT / "giong-apps" / ".git").exists() else [ROOT, ROOT / "giong-apps"]
CODE_EXT = (".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".py", ".sql", ".sh", ".md")


def g(args, cwd):
    try:
        r = subprocess.run(["git", *args], cwd=cwd, capture_output=True, text=True,
                           encoding="utf-8", errors="replace", timeout=30)
        return (r.stdout or "").strip()
    except Exception:
        return ""


def eg_symbols(repo, base, head):
    """Symbol thay đổi giữa 2 ref qua entire-graph (eg.sh trong repo app tổng)."""
    eg = ROOT / "scripts" / "tools" / "entire-graph" / "eg.sh"
    if not eg.exists():
        return set()
    try:
        r = subprocess.run(["bash", str(eg), "diff", "--repo", str(repo),
                            "--base", base, "--head", head],
                           cwd=repo, capture_output=True, text=True,
                           encoding="utf-8", errors="replace", timeout=180)
        syms = set()
        cur_file = ""
        for ln in (r.stdout or "").splitlines():
            if ln and not ln.startswith(" ") and not ln.startswith("Semantic"):
                cur_file = ln.strip()
            elif ln.startswith(("+ ", "- ", "~ ")):
                parts = ln.split()
                # "+ function Foo added" / "~ field A.b body changed" / "- interface X removed"
                if len(parts) >= 3:
                    syms.add(f"{cur_file}::{parts[2]}")
        return syms
    except Exception:
        return set()


def scan_repo(repo, do_symbols=False):
    name = repo.name
    out = {"name": name, "path": str(repo), "branches": [], "dirty_worktrees": [],
           "unpushed": {}, "warnings": []}
    if not (repo / ".git").exists() and not g(["rev-parse", "--git-dir"], repo):
        return None

    branches = [b for b in g(["for-each-ref", "--format=%(refname:short)", "refs/heads"], repo).splitlines() if b]
    has_origin = bool(g(["rev-parse", "--verify", "origin/main"], repo))
    for b in branches:
        if has_origin:
            n = g(["rev-list", "--count", f"origin/main..{b}"], repo)
            if n.isdigit() and int(n) > 0:
                out["unpushed"][b] = int(n)

    for b in branches:
        if b == "main":
            continue
        mb = g(["merge-base", "main", b], repo)
        if not mb:
            continue
        files_main = set(g(["diff", "--name-only", f"{mb}..main"], repo).splitlines())
        files_br = set(g(["diff", "--name-only", f"{mb}..{b}"], repo).splitlines())
        overlap = sorted(files_main & files_br)
        info = {"name": b, "merge_base": mb[:8],
                "commits_main": int(g(["rev-list", "--count", f"{mb}..main"], repo) or 0),
                "commits_branch": int(g(["rev-list", "--count", f"{mb}..{b}"], repo) or 0),
                "files_branch": len(files_br), "files_overlap": overlap}
        if do_symbols and overlap:
            sm = eg_symbols(repo, mb, "main")
            sb = eg_symbols(repo, mb, b)
            info["symbols_overlap"] = sorted(sm & sb)
        if overlap:
            out["warnings"].append(
                f"[{name}] nhánh `{b}` và `main` CÙNG sửa {len(overlap)} file: "
                + ", ".join(overlap[:8]) + (" …" if len(overlap) > 8 else ""))
        if info["commits_branch"] > 0 and info["commits_main"] > 0 and not overlap:
            out["warnings"].append(
                f"[{name}] nhánh `{b}` ({info['commits_branch']} commit) và main "
                f"({info['commits_main']} commit) đi 2 hướng nhưng KHÔNG đụng file nào — xem lại trước khi merge")
        out["branches"].append(info)

    if g(["rev-parse", "--git-dir"], repo):
        for blk in g(["worktree", "list", "--porcelain"], repo).split("\n\n"):
            wt = next((l[9:] for l in blk.splitlines() if l.startswith("worktree ")), "")
            if not wt:
                continue
            st = g(["status", "--porcelain", "--untracked-files=no"], wt)
            # 'XY path' — parse bằng regex (strip() của g() cắt mất space đầu DÒNG ĐẦU)
            mods = [m.group(1) for ln in st.splitlines()
                    if (m := re.match(r"^..\s+(.+)$", ln))]
            if mods:
                out["dirty_worktrees"].append({"path": wt, "modified": len(mods),
                                               "sample": mods[:6]})
                code = [m for m in mods if m.endswith(CODE_EXT)]
                lvl = "⚠️" if code else "ℹ️"
                out["warnings"].append(
                    f"[{name}] worktree `{wt}` có {len(mods)} file SỬA DỞ chưa commit"
                    + (f" (code: {', '.join(code[:4])})" if code else " (không phải file code)"))
    return out


def render_text(results):
    lines = []
    for r in results:
        if not r:
            continue
        lines.append(f"── {r['name']} ({r['path']})")
        if r["unpushed"]:
            tot = ", ".join(f"{b}: {n} commit" for b, n in sorted(r["unpushed"].items()))
            lines.append(f"   • Commit chưa push — {tot}")
        else:
            lines.append("   • Commit chưa push — không có")
        for b in r["branches"]:
            tag = "⚠️" if b["files_overlap"] else "ok"
            lines.append(f"   • nhánh `{b['name']}` vs main [{tag}] — nhánh {b['commits_branch']} commit / "
                         f"main {b['commits_main']} commit · {b['files_branch']} file đổi"
                         + (f" · TRÙNG {len(b['files_overlap'])} file" if b["files_overlap"] else ""))
            for f in b["files_overlap"][:8]:
                lines.append(f"        - {f}")
            for s in (b.get("symbols_overlap") or [])[:10]:
                lines.append(f"        ~ symbol: {s}")
        for w in r["dirty_worktrees"]:
            lines.append(f"   • worktree {w['path']} — {w['modified']} file sửa dở"
                         + (f" · ví dụ: {', '.join(w['sample'][:3])}" if w["sample"] else ""))
        lines.append("")
    warns = [w for r in results if r for w in r["warnings"]]
    if warns:
        lines.append("⚠️  CẦN RÀ TRƯỚC KHI PUSH (nguyên tắc 3 ĐA AGENT — báo Đại Ca nếu có trùng):")
        lines += [f"   - {w}" for w in warns]
    else:
        lines.append("✅ Không phát hiện trùng lặp giữa các nhánh/worktree — yên tâm push (vẫn kiểm mắt 1 lượt).")
    return "\n".join(lines)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--symbols", action="store_true", help="soi mức symbol qua entire-graph (chậm)")
    a = ap.parse_args()
    results = [scan_repo(r, do_symbols=a.symbols) for r in REPOS]
    results = [r for r in results if r]
    if a.json:
        print(json.dumps({"ok": not any(r["warnings"] for r in results), "repos": results},
                         ensure_ascii=False))
    else:
        print(render_text(results))
    return 0


if __name__ == "__main__":
    sys.exit(main())
