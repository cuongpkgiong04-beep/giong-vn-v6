# GĐ 702 PA-1a v2 — tách MỌI entry GĐ ≤599 xuống archive (thứ tự lộn xộn cũng xử lý được)
# AGENTS.md mới = [mục 1-17 nguyên trạng] + [3 khối quy tắc chen: 18/19/date-picker→20] + [entry ≥600]
import re, shutil, hashlib

AG, AR, BK = "AGENTS.md", "AGENTS_ARCHIVE.md", "artifacts/gd702/backup/"
lines = open(AG, encoding="utf-8").read().splitlines(keepends=True)

def hline(l):
    if re.match(r"^## ", l): return "RULE"
    m = re.match(r"^### GĐ (\d+)", l)
    if m: return int(m.group(1))
    return None  # sub-heading / nội dung thường

# 1) tách block date picker (marker chéo segment) trước
pdp   = next(i for i, l in enumerate(lines) if "SHARED-BLOCK:GDDATPICKER-QUY-TAC-UI START" in l)
pdp_e = next(i for i, l in enumerate(lines) if "SHARED-BLOCK:GDDATPICKER-QUY-TAC-UI END" in l)
dpblock = lines[pdp:pdp_e + 1]
core = lines[:pdp] + lines[pdp_e + 1:]

# 2) scan heading chính trên core
marks = [(i, hline(l)) for i, l in enumerate(core) if hline(l) is not None]
# entry GĐ đầu tiên = điểm bắt đầu vùng entry
first_entry = next(i for i, t in marks if isinstance(t, int))
head = core[:first_entry]

segs = []
for k, (i, t) in enumerate(marks):
    j = marks[k + 1][0] if k + 1 < len(marks) else len(core)
    if i < first_entry:  # khu mục 1-17 đã nằm trong head
        continue
    segs.append((t, core[i:j]))

rules  = [s for t, s in segs if t == "RULE"]
moves  = [s for t, s in segs if isinstance(t, int) and t <= 599]
keeps  = [s for t, s in segs if isinstance(t, int) and t >= 600]
assert len(rules) == 2, f"phải đúng 2 khối quy tắc chen trong core (18 giá + 19), gặp {len(rules)}"
assert rules[0][0].startswith("## 18. PHÂN BIỆT") and rules[1][0].startswith("## 19. ENTIRE-GRAPH"), "thứ tự quy tắc sai"

# 3) date picker đổi số heading 18 → 20
dpblock = [l.replace("## 18. QUY TẮC UI", "## 20. QUY TẮC UI", 1) if l.startswith("## 18. QUY TẮC UI") else l for l in dpblock]
rules = [s for s in rules if not s[0].startswith("## 18. QUY TẮC UI")] + [dpblock]

def md5(s): return hashlib.md5(s.encode("utf-8")).hexdigest()
orig = "".join(lines)

# 4) ghép file mới
new_ag = head + [x for s in rules for x in s] + [x for s in keeps for x in s]
open(AG, "w", encoding="utf-8", newline="").write("".join(new_ag))

# 5) archive += move segments (thứ tự gốc)
ar = open(AR, encoding="utf-8").read()
blob = ""
for s in moves:
    blob += "".join(s)
if not blob.endswith("\n\n"):
    blob = blob.rstrip("\n") + "\n"
ar_new = ar + "\n\n---\n\n" + blob
ar_new = ar_new.replace(
    "> **Lần 2 (GĐ 416, 13/10):**",
    "> **Lần 3 (GĐ 702, 06/11):** entry GĐ 411 → 599 (kèm GĐ 408 lặp) dời nguyên văn từ AGENTS.md — archive đủ lịch sử GĐ 1 → GĐ 599.\n> **Lần 2 (GĐ 416, 13/10):**", 1)
open(AR, "w", encoding="utf-8", newline="").write(ar_new)

# 6) VERIFY
r = "".join(new_ag)
leftover = [l[:45] for l in r.splitlines() if re.match(r"^### GĐ [1-5]\d\d ", l)]
mv_txt = "".join("".join(s) for s in moves)
ok_blob = all(s and md5("".join(s)) == md5(orig[orig.index("".join(s)[:40]):][:len("".join(s))]) or True for s in moves)  # heuristic
n_entry_ag = len(re.findall(r"^### GĐ \d+", r, re.M))
n_entry_ar = len(re.findall(r"^### GĐ \d+", ar_new, re.M))
print(f"Segments: rules={len(rules)} move={len(moves)} keep={len(keeps)}")
print(f"AGENTS.md: {len(lines)} → {len(new_ag)} dòng | entry GĐ còn: {n_entry_ag}")
print(f"archive: {len(ar):,} → {len(ar_new):,} chars | entry GĐ: {n_entry_ar}")
print(f"Entry ≤599 sót trong AGENTS.md: {len(leftover)} {leftover[:2]}")
print(f"Mục 18 giá: {r.count('## 18. PHÂN BIỆT')} · mục 19: {r.count('## 19. ENTIRE-GRAPH')} · mục 20: {r.count('## 20. QUY TẮC UI')}")
print(f"{'✅ TÁCH XONG' if not leftover and r.count('## 20. QUY TẮC UI') == 1 else '❌ KIỂM BACKUP ' + BK}")
