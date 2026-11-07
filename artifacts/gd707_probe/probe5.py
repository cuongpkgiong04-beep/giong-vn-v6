# -*- coding: utf-8 -*-
"""GĐ 707 — probe bước 5: lấy chứng từ bán hàng MISA ngày 04/11 (API thật) và so với bảng kê upload."""
import json, sys, io, os, urllib.request, urllib.error

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "giong-apps", "apps", "banhang", "agent"))
import pyodbc
import misa_http_login as hl
from misa_http_api import MisaHttp

# 1) bảng kê upload từ GiondDB
conn = pyodbc.connect("Driver={ODBC Driver 18 for SQL Server};Server=192.168.1.250;"
                      "Database=GiongDB;Uid=giong_worker;Pwd=wciIsN0iaRTdzIEd@xVsIkoY;"
                      "Encrypt=no;TrustServerCertificate=yes", timeout=20)
cur = conn.cursor()
cur.execute("SELECT ma_phieu, refno_misa, center, ky_hieu_hd, so_hd, khach_hang, httt, tong_tien, is_uploaded, is_posted FROM sm_banhang_phieu WHERE report_date='2026-11-04'")
bk = []
for r in cur.fetchall():
    bk.append({"ma_phieu": str(r.ma_phieu or "").strip(), "refno_misa": str(r.refno_misa or "").strip(),
               "center": str(r.center or "").strip(), "ky_hieu": str(r.ky_hieu_hd or "").strip(),
               "so_hd": str(r.so_hd or "").strip(), "khach_hang": str(r.khach_hang or "").strip(),
               "httt": str(r.httt or "").strip(), "tien": float(r.tong_tien or 0),
               "uploaded": bool(r.is_uploaded), "posted": bool(r.is_posted)})
conn.close()
bk_refno = {}
for x in bk:
    if x["refno_misa"]:
        bk_refno.setdefault(x["refno_misa"], []).append(x)
bk_sohd = {}
for x in bk:
    if x["so_hd"]:
        bk_sohd.setdefault(x["so_hd"], []).append(x)
print("Bảng kê: %d phiếu / tổng %.0f / có refno_misa: %d" % (len(bk), sum(x["tien"] for x in bk), len(bk_refno)))

# 2) MISA: mọi chứng từ bán hàng ngày 04/11 giờ VN
s = hl.load_session()
api = MisaHttp(s, log=lambda *a, **k: None)
rows = []
for pg in range(1, 6):
    body = {"sort": "[]",
            "filter": [{"property": 3654, "value": "2026-11-03T17:00:00.00Z", "operator": 10, "operand": 1, "data_type": 3},
                       {"property": 3654, "value": "2026-11-04T16:59:59.00Z", "operator": 12, "operand": 1, "data_type": 3}],
            "pageIndex": pg, "pageSize": 200, "useSp": False, "view": 1, "loadMode": 2}
    st, text = api.call("/g1/api/sa/v1/sa_voucher_get/paging_filter_v2", "POST", body=body)
    got = (json.loads(text).get("Data") or {}).get("PageData") or []
    rows += got
    if len(got) < 200:
        break
print("MISA 04/11: %d chứng từ" % len(rows))

# xem 1 mẫu để biết tên trường
if rows:
    keys = list(rows[0].keys())
    print("TRƯỜNG có sẵn:", ", ".join(k for k in keys if any(t in k.lower() for t in ["refno", "refid", "no_m", "inv", "total", "amount", "posted", "customer", "org", "date", "voucher", "series", "type"])))

def g(r, *names):
    for n in names:
        v = r.get(n)
        if v not in (None, ""):
            return v
    return ""

misa = []
for r in rows:
    misa.append({
        "refno": str(g(r, "refno_finance", "refno") or "").strip(),
        "refid": str(r.get("refid") or "").strip(),
        "so_hd": str(g(r, "no_m", "no_mea") or "").strip(),
        "ky_hieu": str(g(r, "inv_series", "series_m") or "").strip(),
        "khach_hang": str(g(r, "accounting_object_name", "customer_name") or "").strip(),
        "tien": float(r.get("total_payment") or r.get("total_amount") or 0),
        "posted": bool(r.get("is_posted", r.get("posted"))),
        "org": str(g(r, "org_unit_code", "org_unit") or "").strip(),
    })
tong_misa = sum(x["tien"] for x in misa)
print("MISA tổng tiền thanh toán: %.0f (ảnh Đại ca: 232.080.000 / 265 CT)" % tong_misa)
so_posted = sum(1 for x in misa if x["posted"])
print("MISA ghi sổ: %d/%d" % (so_posted, len(misa)))

# 3) phân nhóm theo refno
misa_refno = {}
for x in misa:
    misa_refno.setdefault(x["refno"], []).append(x)
db_set = set(bk_refno)
misa_set = set(misa_refno)
ngoai_db = sorted(misa_set - db_set)
trong_db = misa_set & db_set
thieu_tren_misa = sorted(db_set - misa_set)
print("\nA) CT MISA có refno TRONG bảng kê: %d (tiền %.0f)" % (len(trong_db), sum(y["tien"] for r in trong_db for y in misa_refno[r])))
print("B) CT MISA refno NGOÀI bảng kê (nghi tự tạo): %d (tiền %.0f)" % (len(ngoai_db), sum(y["tien"] for r in ngoai_db for y in misa_refno[r])))
print("C) refno bảng kê CHƯA có trên MISA: %d" % len(thieu_tren_misa))
for r in ngoai_db[:15]:
    for y in misa_refno[r]:
        print("   B: %s | so_hd=%s ky_hieu=%s | %.0f | %s | posted=%s" % (r, y["so_hd"], y["ky_hieu"], y["tien"], y["khach_hang"][:26], y["posted"]))
for r in thieu_tren_misa[:15]:
    for x in bk_refno[r]:
        print("   C: %s | %s | %.0f | uploaded=%s posted=%s" % (r, x["ma_phieu"], x["tien"], x["uploaded"], x["posted"]))

# 4) nhóm B: so_hd có nằm trong bảng kê không? (trùng số HĐ = upload trùng)
trung_sohd = []
ngoai_sohd = []
for r in ngoai_db:
    for y in misa_refno[r]:
        if y["so_hd"] and y["so_hd"] in bk_sohd:
            trung_sohd.append(y)
        else:
            ngoai_sohd.append(y)
print("\nB1) CT ngoài bảng kê nhưng so_hd TRÙNG bảng kê (upload TRÙNG): %d — tiền %.0f" % (len(trung_sohd), sum(x["tien"] for x in trung_sohd)))
print("B2) CT ngoài bảng kê, so_hd cũng lạ: %d — tiền %.0f" % (len(ngoai_sohd), sum(x["tien"] for x in ngoai_sohd)))
for y in ngoai_sohd[:10]:
    print("   B2: %s | so_hd=%s ky_hieu=%s | %.0f | %s" % (y["refno"], y["so_hd"], y["ky_hieu"], y["tien"], y["khach_hang"][:26]))

# lưu toàn bộ chi tiết
p = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "artifacts", "gd707_probe", "misa_0411.json")
with open(p, "w", encoding="utf-8") as f:
    json.dump({"bk": bk, "misa": misa}, f, ensure_ascii=False, indent=1)
print("\nĐã lưu chi tiết:", p)
