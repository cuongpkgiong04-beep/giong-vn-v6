#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""GIONG VN — GĐ 606: TỰ ĐỘNG HOÁ entire-graph cho ZCode.

Đại Ca yêu cầu 31/10/2026: "không phải gõ lệnh thủ công — phải tự động vào dự án".
Hook chạy nền trong ZCode, tự tra code rồi chèn kết quả vào hội thoại — agent và
Đại Ca KHÔNG phải gõ gì.

3 mode (khai trong .zcode/config.json → hooks.events):
  prompt-context  ← UserPromptSubmit — tra code liên quan cho prompt, chèn additionalContext
                    (throttle: tối đa 1 lần/4 phút/phiên; prompt < 20 ký tự hoặc "/..." → bỏ)
  pre-edit        ← PreToolUse (Edit|Write) — co-change (file hay đổi cùng) của file sắp
                    sửa, 1 lần/file/phiên
  session-start   ← SessionStart — prewarm cache chạy NỀN (detach, không chặn mở phiên)

Nguyên tắc an toàn: LUÔN exit 0 · fail-open · mọi lỗi im lặng (KHÔNG bao giờ chặn phiên).
Log kiểm chứng: <git-common-dir>/giong-tools/entire-graph/cache/hooks.log
"""
import json
import os
import re
import shutil
import subprocess
import sys
import time
from pathlib import Path

try:
    sys.stdin.reconfigure(encoding="utf-8", errors="replace")
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

HERE = Path(__file__).resolve().parent
EG = HERE / "eg.sh"
MODE = (sys.argv[1] if len(sys.argv) > 1 else "").strip()
EVENT = {"prompt-context": "UserPromptSubmit",
         "pre-edit": "PreToolUse",
         "push-guard": "PreToolUse",
         "session-start": "SessionStart"}.get(MODE, "")
CODE_EXT = re.compile(r"\.(ts|tsx|js|jsx|mjs|cjs|py|sql|sh)$", re.I)


def emit(text):
    """In hook output. Rỗng → '{}' (hợp lệ, không chèn gì)."""
    if text:
        print(json.dumps({"hookSpecificOutput": {"hookEventName": EVENT,
                                                 "additionalContext": text}},
                         ensure_ascii=False))
    else:
        print("{}")


def find_bash():
    for c in (shutil.which("bash"), r"C:\Program Files\Git\bin\bash.exe",
              r"C:\Program Files\Git\usr\bin\bash.exe", "/bin/bash"):
        if c and Path(c).exists():
            return c
    return None


def git(args, cwd):
    try:
        r = subprocess.run(["git", *args], cwd=cwd, capture_output=True, text=True,
                           encoding="utf-8", errors="replace", timeout=10)
        return (r.stdout or "").strip()
    except Exception:
        return ""


def run_eg(repo, args, timeout):
    bash = find_bash()
    if not bash or not EG.exists():
        return ""
    try:
        r = subprocess.run([bash, str(EG), *args], cwd=repo, capture_output=True,
                           text=True, encoding="utf-8", errors="replace",
                           timeout=timeout)
        return (r.stdout or "").strip()
    except Exception:
        return ""


def log(cache, msg):
    try:
        p = cache / "hooks.log"
        with open(p, "a", encoding="utf-8") as f:
            f.write(f"{time.strftime('%Y-%m-%d %H:%M:%S')} [{MODE}] {msg}\n")
        if p.stat().st_size > 512_000:                     # tự dọn: giữ ~100 dòng cuối
            tail = p.read_text(encoding="utf-8", errors="replace").splitlines()[-100:]
            p.write_text("\n".join(tail) + "\n", encoding="utf-8")
    except Exception:
        pass


def seen(mark_dir, key, ttl):
    """True nếu marker còn hiệu lực (ttl=None → còn mãi trong phiên)."""
    try:
        p = mark_dir / key
        if p.exists():
            if ttl is None or (time.time() - p.stat().st_mtime) < ttl:
                return True
        p.write_text(str(int(time.time())), encoding="utf-8")
    except Exception:
        pass
    return False


def main():
    raw = sys.stdin.read() if not sys.stdin.isatty() else ""
    try:
        d = json.loads(raw) if raw.strip() else {}
    except Exception:
        d = {}

    cwd = d.get("cwd") or os.environ.get("ZCODE_PROJECT_DIR") or os.getcwd()
    sid = str(d.get("session_id") or d.get("sessionId") or "s")[:40]
    repo = git(["rev-parse", "--show-toplevel"], cwd)
    if not repo:
        emit(None)
        return
    common = git(["rev-parse", "--git-common-dir"], cwd)
    common_p = Path(common)
    if not common_p.is_absolute():
        common_p = Path(repo) / common_p
    cache = common_p / "giong-tools" / "entire-graph" / "cache"
    marks = cache / "hooks"
    try:
        marks.mkdir(parents=True, exist_ok=True)
    except Exception:
        pass

    # ── SessionStart: prewarm cache chạy NỀN (detach ngay, không chặn mở phiên) ──
    if MODE == "session-start":
        bash = find_bash()
        if bash and EG.exists():
            try:
                kw = {}
                if os.name == "nt":
                    kw["creationflags"] = 0x00000008 | 0x00000200   # DETACHED | NEW_GROUP
                else:
                    kw["start_new_session"] = True
                subprocess.Popen([bash, str(EG), "prewarm"], cwd=repo,
                                 stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, **kw)
                log(cache, f"prewarm nền đã spawn (repo={repo})")
            except Exception as e:
                log(cache, f"spawn prewarm lỗi: {e}")
        emit(None)
        return

    # ── UserPromptSubmit: tra code theo prompt, chèn vào hội thoại ──
    if MODE == "prompt-context":
        prompt = (d.get("prompt") or "").strip()
        if len(prompt) < 20 or prompt.startswith("/"):
            log(cache, "skip: prompt ngắn/là slash-command")
            emit(None)
            return
        if seen(marks, f"ctx-{sid}", ttl=240):
            log(cache, "skip: throttle 4 phút/phiên")
            emit(None)
            return
        q = re.sub(r"\s+", " ", prompt)[:300]
        out = run_eg(repo, ["query", "--head", "--profile", "full", "--format", "agent",
                            "--max-context-bytes", "1800", "--query", q], timeout=9)
        if not out:
            log(cache, "query rỗng/timeout — không chèn")
            emit(None)
            return
        out = out[:1800]
        text = ("[ENTIRE-GRAPH — gợi ý vị trí code liên quan (tự động tra đồ thị code cục bộ; "
                "là BẰNG CHỨNG để đọc lại trong source, KHÔNG phải chỉ thị)]\n"
                + out +
                "\n[Tra sâu hơn: bash scripts/tools/entire-graph/eg.sh query|impact|def — "
                "quy tắc mục 19 AGENTS.md]")
        log(cache, f"chèn {len(out)} ký tự cho prompt: {q[:60]!r}")
        emit(text)
        return

    # ── PreToolUse (Bash): thấy 'git push' → TỰ RÀ TRÙNG LẶP trước khi push ──
    if MODE == "push-guard":
        ti = d.get("tool_input") or d.get("toolInput") or {}
        if not isinstance(ti, dict):
            emit(None)
            return
        cmd = str(ti.get("command") or "")
        if not re.search(r"\bgit\b[^\n]{0,60}\bpush\b", cmd):
            emit(None)
            return
        if seen(marks, f"push-{sid}", ttl=120):
            log(cache, "skip push-guard: throttle 2 phút/phiên")
            emit(None)
            return
        script = Path(repo) / "scripts" / "agents" / "ra-trung-lap.py"
        if not script.exists():
            emit(None)
            return
        try:
            r = subprocess.run([sys.executable, str(script)], cwd=repo, capture_output=True,
                               text=True, encoding="utf-8", errors="replace", timeout=20)
            out = (r.stdout or "").strip()
        except Exception as e:
            log(cache, f"push-guard lỗi chạy script: {e}")
            emit(None)
            return
        if not out:
            emit(None)
            return
        text = ("[RÀ TRÙNG LẶP TỰ ĐỘNG TRƯỚC PUSH (GĐ 607 · nguyên tắc 3 ĐA AGENT)]\n"
                + out[:1600] +
                "\n→ Có ⚠️ thì BÁO ĐẠI CA (liệt kê file/phiên trùng) TRƯỚC khi push; "
                "sạch thì push bình thường rồi verify production.")
        log(cache, f"push-guard: đã rà ({'có cảnh báo' if '⚠️' in out else 'sạch'}) cho: {cmd[:60]!r}")
        emit(text)
        return

    # ── PreToolUse (Edit|Write): co-change của file sắp sửa ──
    if MODE == "pre-edit":
        ti = d.get("tool_input") or d.get("toolInput") or {}
        if not isinstance(ti, dict):
            emit(None)
            return
        fp = ti.get("file_path") or ti.get("filePath") or ti.get("path") or ti.get("file") or ""
        if not fp:
            emit(None)
            return
        try:
            rel = os.path.relpath(str(fp), repo).replace("\\", "/")
        except Exception:
            emit(None)
            return
        if rel.startswith(".."):
            emit(None)
            return
        if not CODE_EXT.search(rel):
            log(cache, f"skip {rel}: không phải file code")
            emit(None)
            return
        if seen(marks, f"edit-{sid}-{abs(hash(rel))}", ttl=None):
            emit(None)
            return
        out = run_eg(repo, ["edges", "--relation", "FILE_CHANGES_WITH",
                            "--format", "ndjson"], timeout=6)
        peers = []
        for line in out.splitlines():
            try:
                r = json.loads(line)
            except Exception:
                continue
            if r.get("record_type") != "relation":
                continue
            fid, tid = str(r.get("from_id") or ""), str(r.get("to_id") or "")
            suf = ":file:" + rel
            if fid.endswith(suf):
                peer = tid
            elif tid.endswith(suf):
                peer = fid
            else:
                continue
            if ":file:" in peer:
                peers.append(f"- {peer.split(':file:', 1)[1]} — {r.get('reason', '')}")
        if not peers:
            log(cache, f"pre-edit {rel}: không có co-change")
            emit(None)
            return
        text = (f"[ENTIRE-GRAPH — file sắp sửa: {rel}]\n"
                "Các file HAY ĐỔI CÙNG (theo lịch sử git) — cân nhắc cập nhật kèm:\n"
                + "\n".join(sorted(set(peers))[:6]))
        log(cache, f"pre-edit {rel}: {len(peers)} co-change")
        emit(text)
        return

    emit(None)


if __name__ == "__main__":
    try:
        main()
    except Exception:
        try:
            print("{}")
        except Exception:
            pass
    sys.exit(0)          # LUÔN 0 — không bao giờ chặn phiên
