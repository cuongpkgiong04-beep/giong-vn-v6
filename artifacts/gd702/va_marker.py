# GĐ 702 — vá vị trí marker GD602-ENTIRE-GRAPH: từ cuối entry 600 về ngay trước heading mục 19
import hashlib

lines = open("AGENTS.md", encoding="utf-8").read().splitlines(keepends=True)
MK = "SHARED-BLOCK:GD602-ENTIRE-GRAPH START"
pi = next(i for i, l in enumerate(lines) if MK in l)
ph = next(i for i, l in enumerate(lines) if l.startswith("## 19. ENTIRE-GRAPH"))
assert pi > ph, "marker đang ở trước heading — không cần vá"
del lines[pi:pi + 1]
ph = next(i for i, l in enumerate(lines) if l.startswith("## 19. ENTIRE-GRAPH"))
lines[ph:ph] = ["<%s -->\n" % MK.split("<!--")[0]] if False else ["<!-- %s -->\n" % MK.replace("<!-- SHARED-BLOCK:", "").replace(" -->", "")]
# dòng trên tự tạo lại marker chuẩn; đảm bảo trước marker có dòng trống (sau mục 18 giá)
open("AGENTS.md", "w", encoding="utf-8", newline="").write("".join(lines))

# verify: block START→END mục 19 nguyên văn so backup
orig = open("artifacts/gd702/backup/AGENTS.md.truoc-tach", encoding="utf-8").read()
new = open("AGENTS.md", encoding="utf-8").read()
END = "<!-- SHARED-BLOCK:GD602-ENTIRE-GRAPH END -->"
def seg19(t):
    i = t.index(MK); j = t.index(END, i) + len(END)
    return t[i:j]
ok = seg19(new) == seg19(orig)
lines2 = new.splitlines()
pi2 = next(i for i, l in enumerate(lines2) if MK in l)
ph2 = next(i for i, l in enumerate(lines2) if l.startswith("## 19. ENTIRE-GRAPH"))
print("marker dòng", pi2 + 1, "heading dòng", ph2 + 1, "kề nhau:", pi2 + 2 == ph2 + 1)
print("block mục 19 nguyên văn:", ok)
print("✅ VÁ XONG" if ok and pi2 + 2 == ph2 + 1 else "❌ kiểm lại")
