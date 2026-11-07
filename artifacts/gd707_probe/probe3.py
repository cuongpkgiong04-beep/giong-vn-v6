# -*- coding: utf-8 -*-
"""GĐ 707 — probe bước 3: so chi tiết so_hd giữa bảng kê upload ↔ MISA đồng bộ ↔ nguồn SMED."""
import json, sys, io, os, urllib.request, urllib.error

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

BASE = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
d = {}
for line in open(os.path.join(BASE, "giong-apps", "apps", "banhang", "agent", ".secrets", "agent.env.bat"), encoding="utf-8", errors="ignore"):
    line = line.strip()
    if line.lower().startswith("set ") and "=" in line:
        k, v = line[4:].split("=", 1)
        d[k.strip()] = v.strip()
TOKEN = d["SMED_AGENT_TOKEN"]

def query(sql, limit=500):
    body = json.dumps({"sql": sql, "limit": limit}).encode("utf-8")
    req = urllib.request.Request(
        "http://127.0.0.1:8777/db/query", data=body,
        headers={"Content-Type": "application/json", "Authorization": "Bearer " + TOKEN},
    )
    try:
        with urllib.request.urlopen(req, timeout=90) as r:
            return json.loads(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        return {"err": e.code, "body": e.read().decode("utf-8", errors="replace")[:300]}

KY = "2026-11-04"

# 1) MISA đồng bộ: nhóm theo ma_phieu (1 chứng từ) — số tiền theo tổng amount các line
r = query(f"SELECT ma_phieu, refid, so_hd, ky_hieu, center, khach_hang, SUM(amount) AS tien, SUM(CAST(is_posted AS int)) AS posted_line, COUNT(*) AS lines, MAX(synced_at) AS sync FROM misa_sa_detail WHERE refdate='{KY}' GROUP BY ma_phieu, refid, so_hd, ky_hieu, center, khach_hang")
if "err" in r:
    print("misa_sa_detail LỖI:", r["body"])
    sys.exit(1)
misa = r["rows"]
print("MISA đồng bộ: %d chứng từ, tổng tiền %s" % (len(misa), sum(x["tien"] for x in misa)))
sync_moi = max(x["sync"] for x in misa)
print("synced_at mới nhất:", sync_moi)
so_phieu_hd = [x for x in misa if x["ma_phieu"] and str(x["ma_phieu"]).startswith("HD")]
so_phieu_khac = [x for x in misa if not (x["ma_phieu"] and str(x["ma_phieu"]).startswith("HD"))]
print("  có ma_phieu 'HD...': %d CT / tổng %s" % (len(so_phieu_hd), sum(x["tien"] for x in so_phieu_hd)))
print("  ma_phieu KHÁC/trống : %d CT / tổng %s" % (len(so_phieu_khac), sum(x["tien"] for x in so_phieu_khac)))
so_hd_misa = {}
for x in misa:
    so_hd_misa.setdefault(x["so_hd"], []).append(x)
trung_so_hd = {k: v for k, v in so_hd_misa.items() if len(v) > 1}
print("  số HĐ xuất hiện >1 chứng từ trên MISA: %d số" % len(trung_so_hd))

# 2) bảng kê upload
r = query(f"SELECT ma_phieu, refno_misa, center, ky_hieu_hd, so_hd, khach_hang, httt, tong_tien, so_dong, refid, is_uploaded, is_posted, err FROM sm_banhang_phieu WHERE report_date='{KY}'")
if "err" in r:
    print("sm_banhang_phieu LỖI:", r["body"])
    sys.exit(1)
bk = r["rows"]
print("\nBảng kê: %d phiếu, tổng %s" % (len(bk), sum(x["tong_tien"] for x in bk)))
so_hd_bk = {}
for x in bk:
    so_hd_bk.setdefault(x["so_hd"], []).append(x)

# 3) so theo số hóa đơn
misa_set = set(so_hd_misa)
bk_set = set(so_hd_bk)
thua_misa = sorted(misa_set - bk_set, key=lambda s: s or "")
thieu_misa = sorted(bk_set - misa_set)
print("\nSố HĐ có trên MISA mà KHÔNG có trong bảng kê: %d số" % len(thua_misa))
tien_thua = sum(sum(y["tien"] for y in so_hd_misa[s]) for s in thua_misa)
print("  tổng tiền nhóm MISA thừa: %s" % tien_thua)
print("\nSố HĐ trong bảng kê mà KHÔNG có trên MISA: %d số" % len(thieu_misa))
print("  tổng tiền nhóm thiếu: %s" % sum(x["tong_tien"] for s in thieu_misa for x in so_hd_bk[s]))

# 4) nguồn SMED stg_1HDDT — 194 số HĐ; so với bảng kê
r = query(f"SELECT col5 AS so_hd FROM stg_1HDDT WHERE report_date='{KY}'")
if "err" in r:
    print("stg_1HDDT LỖI:", r["body"])
else:
    smed_set = set(str(x["so_hd"]).strip() for x in r["rows"])
    print("\nSMED stg_1HDDT: %d số HĐ" % len(smed_set))
    smed_thieu = sorted(smed_set - bk_set - {""})
    print("  số HĐ SMED có mà bảng kê KHÔNG có: %d — %s" % (len(smed_thieu), ", ".join(smed_thieu[:10])))
    bk_thieu = sorted(bk_set - smed_set)
    print("  số HĐ bảng kê có mà SMED KHÔNG có: %d — %s" % (len(bk_thieu), ", ".join(bk_thieu[:10])))

# 5) lưu chi tiết nhóm MISA thừa để xem nhóm phiếu tự tạo
out = {
    "misa_thua": [
        {"ma_phieu": y["ma_phieu"], "refid": y["refid"], "so_hd": y["so_hd"], "ky_hieu": y["ky_hieu"],
         "center": y["center"], "khach_hang": y["khach_hang"], "tien": y["tien"], "posted_line": y["posted_line"],
         "sync": str(y["sync"])} for s in thua_misa for y in so_hd_misa[s]
    ],
    "bk_thieu_misa": [
        {"ma_phieu": x["ma_phieu"], "so_hd": x["so_hd"], "khach_hang": x["khach_hang"], "tien": x["tong_tien"],
         "is_uploaded": x["is_uploaded"], "is_posted": x["is_posted"], "err": x["err"]} for s in thieu_misa for x in so_hd_bk[s]
    ],
    "trung_so_hd": [
        {"so_hd": s, "ct": [{"ma_phieu": y["ma_phieu"], "refid": y["refid"], "tien": y["tien"], "center": y["center"]} for y in v]}
        for s, v in trung_so_hd.items()
    ],
}
p = os.path.join(BASE, "artifacts", "gd707_probe", "so_luot.json")
with open(p, "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=1)
print("\nĐã ghi chi tiết:", p)

# in 20 dòng mẫu nhóm MISA thừa
print("\n20 dòng MẪU nhóm MISA thừa (không có trong bảng kê):")
for x in out["misa_thua"][:20]:
    print("  so_hd=%s ma_phieu=%s center=%s tien=%s posted=%s sync=%s | %s" % (
        x["so_hd"], x["ma_phieu"], x["center"], x["tien"], x["posted_line"], x["sync"][:19], x["khach_hang"][:30]))
