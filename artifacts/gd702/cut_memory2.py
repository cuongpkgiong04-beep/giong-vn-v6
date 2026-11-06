# GĐ 702 PA-1b v2 — rút chặt hơn: hook <=150 bytes, cắt theo từ khi mệnh đề đầu vẫn dài
import re, shutil

SRC = r"C:\Users\Administrator\.zcode\cli\memories\projects\giong-vn-v6-e0fe1e7d7c84d98f\memory\MEMORY.md"
BAK = r"D:\DuLieuChung\CUONG_2026\giong-vn-v6\artifacts\gd702\MEMORY.md.bak"

LIMIT = 150  # bytes/dòng mục tiêu

def b(s): return len(s.encode("utf-8"))

def cut_words(hook, budget):
    words, cur = hook.split(), ""
    for w in words:
        cand = (cur + " " + w).strip()
        if b(cand) > budget: break
        cur = cand
    return cur if b(cur) >= 15 else cut_words_hard(hook, budget)

def cut_words_hard(hook, budget):
    chars, cur = list(hook), ""
    for c in chars:
        if b(cur + c) > budget - 2: break
        cur += c
    return cur.rstrip() + "…"

def rut_hook(hook, budget):
    if b(hook) <= budget: return hook
    # thử ghép mệnh đề theo "·/;/—/" —— chỉ nhận nếu VƯỢT budget thì thôi
    for sep in ("·", ";", "—"):
        if sep not in hook: continue
        best = hook.split(sep)[0].rstrip()
        for p in hook.split(sep)[1:]:
            cand = best + sep + p
            if b(cand) <= budget: best = cand
            else: break
        if b(best) <= budget and b(best) >= 20: return best
    return cut_words(hook, budget)

lines = open(SRC, encoding="utf-8").read().splitlines()
pat = re.compile(r"^- \[(.+?)\]\((.+?)\.md\) — (.*)$")
out, keep, cut, dup = [], 0, 0, 0
seen = set()
for ln in lines:
    m = pat.match(ln)
    if not m:
        out.append(ln); continue
    title, fname, hook = m.group(1), m.group(2), m.group(3)
    if fname in seen: dup += 1; continue
    seen.add(fname)
    def build(t, h):
        return f"- [{t}]({fname}.md) — {h}"
    line = build(title, rut_hook(hook, LIMIT - b(build(title, ""))))
    # nếu vẫn dài (title rống budget) → rút title
    while b(line) > LIMIT and len(title) > 12:
        title = title.rsplit(" ", 1)[0]
        line = build(title, rut_hook(hook, max(LIMIT - b(build(title, "")), 20)))
    out.append(line)
    keep, cut = (keep, cut + 1) if line.split(" — ", 1)[-1] != hook else (keep + 1, cut)

res = "\n".join(out) + "\n"
open(SRC, "w", encoding="utf-8", newline="\n").write(res)
total = b(res)
print(f"Bản gốc backup: {b(open(BAK, encoding='utf-8').read())} bytes | Sau: {total} bytes")
print(f"Entry: {len(seen)} | Giữ nguyên hook: {keep} | Rút: {cut} | Bỏ trùng link: {dup}")
print(f"{'✅ ĐẠT' if total < 20480 else '❌ VẪN VƯỢT'} <20.480 bytes")
