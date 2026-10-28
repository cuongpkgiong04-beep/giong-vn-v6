# -*- coding: utf-8 -*-
"""GĐ 556 — stage CHỈ các hunk của mình (marker 'GĐ 556') trong file đang bị phiên
khác (GĐ 557) sửa song song: giữ CRLF nguyên bản (bytes), apply vào INDEX.

Dùng: python scripts/_gd556_stage_mine.py <repo> <file> [marker]
"""
import subprocess
import sys
from pathlib import Path

repo = sys.argv[1]
rel = sys.argv[2]
marker = sys.argv[3] if len(sys.argv) > 3 else "GĐ 556"

tmpdir = Path(__file__).parent / "_gd556_tmp"
tmpdir.mkdir(exist_ok=True)

diff_bytes = subprocess.run(["git", "-C", repo, "diff", "--", rel],
                            capture_output=True).stdout
raw = diff_bytes.decode("utf-8")
lines = raw.splitlines(keepends=True)
header, hunks = [], []
for line in lines:
    if line.startswith("@@"):
        hunks.append([line])
    elif hunks:
        hunks[-1].append(line)
    else:
        header.append(line)

kept, dropped = [], []
for h in hunks:
    added = [l for l in h if l.startswith("+") and not l.startswith("+++")]
    (kept if any(marker in l for l in added) else dropped).append("".join(h))
patch = "".join(header) + "".join(kept)
p = tmpdir / (Path(rel).name + ".mine.diff")
p.write_bytes(patch.encode("utf-8"))
print(f"{rel}: giữ {len(kept)} hunk (marker {marker}) · bỏ {len(dropped)} hunk phiên khác → {p}")

chk = subprocess.run(["git", "-C", repo, "apply", "--cached", "--check", str(p)],
                     capture_output=True, text=True)
if chk.returncode != 0:
    print("❌ --check FAIL:", (chk.stderr or chk.stdout)[:400])
    sys.exit(1)
print("✓ --check OK")
ap = subprocess.run(["git", "-C", repo, "apply", "--cached", str(p)],
                    capture_output=True, text=True)
print("✓ đã stage" if ap.returncode == 0 else f"❌ apply FAIL: {ap.stderr[:300]}")
sys.exit(0 if ap.returncode == 0 else 1)
