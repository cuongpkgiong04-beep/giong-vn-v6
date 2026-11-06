# GĐ 702 PA-1b — cắt MEMORY.md index về <20KB, mỗi dòng ngắn giữ từ khóa tra cứu
import re, shutil, os

SRC = r"C:\Users\Administrator\.zcode\cli\memories\projects\giong-vn-v6-e0fe1e7d7c84d98f\memory\MEMORY.md"
BAK = r"D:\DuLieuChung\CUONG_2026\giong-vn-v6\artifacts\gd702\MEMORY.md.bak"

LIMIT_BYTES = 180  # mục tiêu mỗi dòng <= 180 bytes (~60 ký tự tiếng Việt)

def b(s):
    return len(s.encode("utf-8"))

def rut_hook(hook, budget):
    """Rút hook về <= budget bytes, cắt tại ranh giới mệnh đề/từ."""
    if b(hook) <= budget:
        return hook
    # 1) cắt tại dấu "·" hoặc ";" hoặc "—" để giữ mệnh đề đầu
    for sep in ("·", ";", "—", ":"):
        parts = hook.split(sep)
        best = parts[0]
        for p in parts[1:]:
            cand = best + sep + p
            if b(cand) <= budget:
                best = cand
            else:
                break
        if b(best.rstrip()) >= budget // 2:
            return best.rstrip().rstrip(sep).rstrip()
    # 2) cắt theo từ
    words = hook.split()
    out = []
    cur = ""
    for w in words:
        cand = (cur + " " + w).strip()
        if b(cand) > budget:
            break
        cur = cand
    return cur + "..."

lines_raw = open(SRC, encoding="utf-8").read().splitlines()
shutil.copy2(SRC, BAK)

pat = re.compile(r"^- \[(.+?)\]\((.+?)\.md\) — (.*)$")
out, stats = [], {"keep": 0, "cut": 0, "skip": 0}
seen_links = set()
for ln in lines_raw:
    m = pat.match(ln)
    if not m:
        out.append(ln)  # tiêu đề khu vực / dòng trống
        if ln.strip():
            stats["skip"] += 1
        continue
    title, fname, hook = m.group(1), m.group(2), m.group(3)
    if fname in seen_links:
        continue  # trùng link — bỏ
    seen_links.add(fname)
    prefix = f"- [{title}]({fname}.md) — "
    budget = LIMIT_BYTES - b(prefix)
    if budget < 20:
        # title quá dài — rút title
        t = title
        while b(f"- [{t}]({fname}.md) — ") > LIMIT_BYTES - 30 and len(t) > 20:
            t = t.rsplit(" ", 1)[0]
        title = t
        prefix = f"- [{title}]({fname}.md) — "
        budget = LIMIT_BYTES - b(prefix)
    new_hook = rut_hook(hook, budget)
    line = prefix + new_hook
    out.append(line)
    stats["cut" if new_hook != hook else "keep"] += 1

res = "\n".join(out) + "\n"
open(SRC, "w", encoding="utf-8", newline="\n").write(res)
total = b(res)
print(f"Trước: {b(open(BAK, encoding='utf-8').read())} bytes | Sau: {total} bytes")
print(f"Dòng giữ nguyên: {stats['keep']} | Đã rút: {stats['cut']} | Bỏ trùng link: bỏ qua")
print(f"{'✅ ĐẠT' if total < 20480 else '❌ VẪN VƯỢT'} mục tiêu <20.480 bytes (giới hạn nạp ~24.4KB)")
