# -*- coding: utf-8 -*-
"""GĐ 707 — verify cuối: MISA 04/11 sau PA-2 (190 CT/175.125.000?) + đối chiếu từng phiếu với bảng kê DB."""
import json, sys, io, os, urllib.request
from collections import Counter

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "giong-apps", "apps", "banhang", "agent"))
import pyodbc
import misa_http_login as hl
from misa_http_api import MisaHttp

# 1) bảng kê DB MỚI NHẤT
conn = pyodbc.connect("Driver={ODBC Driver 18 for SQL Server};Server=192.168.1.250;"
                      "Database=GiongDB;Uid=giong_worker;Pwd=wciIsN0iaRTdzIEd@xVsIkoY;"
                      "Encrypt=no;TrustServerCertificate=yes", timeout=20)
cur = conn.cursor()
cur.execute("SELECT ma_phieu, refno_misa, center, ky_hieu_hd, so_hd, khach_hang, tong_tien, is_uploaded, is_posted FROM sm_banhang_phieu WHERE report_date='2026-11-04'")
bk = []
for r in cur.fetchall():
    bk.append({"ma_phieu": str(r.ma_phieu or "").strip(), "refno": str(r.refno_misa or "").strip(),
               "center": str(r.center or "").strip(), "so_hd": str(r.so_hd or "").strip(),
               "kh": str(r.khach_hang or "").strip(), "tien": float(r.tong_tien or 0),
               "up": bool(r.is_uploaded), "posted": bool(r.is_posted)})
conn.close()
print("Bảng kê DB: %d phiếu / tổng %.0f" % (len(bk), sum(x["tien"] for x in bk)))
print("  is_uploaded=1: %d · is_posted=1: %d" % (sum(1 for x in bk if x["up"]), sum(1 for x in bk if x["posted"])))
c_phieu = [x for x in bk if x["ma_phieu"] == "HD110312611040930201371"]
if c_phieu:
    x = c_phieu[0]
    print("  phiếu còn thiếu giờ: so_hd=%s refno=%s up=%s posted=%s" % (x["so_hd"], x["refno"], x["up"], x["posted"]))

# 2) MISA thực tế
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
tong = sum(float(r.get("total_amount") or 0) for r in rows)
posted = sum(1 for r in rows if r.get("is_posted_finance"))
print("\nMISA 04/11: %d CT / tổng %.0f / ghi sổ %d/%d" % (len(rows), tong, posted, len(rows)))
print("reftype:", dict(Counter(str(r.get("reftype")) for r in rows)))

# 3) đối chiếu từng phiếu
misa_by_sohd = {}
for r in rows:
    misa_by_sohd.setdefault(str(r.get("inv_no") or "").strip(), []).append(r)
misa_refno = {str(r.get("refno_finance") or "").strip(): r for r in rows}
bk_sohd = {}
for x in bk:
    bk_sohd.setdefault(x["so_hd"], []).append(x)

thieu = [x for x in bk if x["so_hd"] and x["so_hd"] not in misa_by_sohd]
thua = [s for s in misa_by_sohd if s and s not in bk_sohd]
# phiếu bảng kê KHÔNG có refno trên MISA
khong_refno = [x for x in bk if x["refno"] and x["refno"] not in misa_refno]
# trùng số HĐ trên MISA
trung = {s: v for s, v in misa_by_sohd.items() if len(v) > 1}
print("\nĐỐI CHIẾU theo số HĐ:")
print("  phiếu bảng kê KHÔNG có trên MISA: %d" % len(thieu))
for x in thieu[:5]:
    print("    ", x["ma_phieu"], x["so_hd"], x["tien"])
print("  số HĐ trên MISA KHÔNG thuộc bảng kê: %d" % len(thua))
for s_ in thua[:5]:
    for r in misa_by_sohd[s_]:
        print("    ", str(r.get("refno_finance")), s_, r.get("total_amount"))
print("  refno bảng kê không khớp MISA: %d" % len(khong_refno))
print("  số HĐ trùng >1 CT trên MISA: %d" % len(trung))

# 4) đối chiếu TIỀN từng phiếu (số HĐ khớp + tổng tiền khớp)
lech_tien = []
for x in bk:
    if not x["so_hd"]:
        continue
    for r in misa_by_sohd.get(x["so_hd"], []):
        if abs(float(r.get("total_amount") or 0) - x["tien"]) > 0.5:
            lech_tien.append((x["ma_phieu"], x["so_hd"], x["tien"], r.get("total_amount")))
print("  phiếu TIỀN lệch MISA vs bảng kê: %d" % len(lech_tien))
for t in lech_tien[:5]:
    print("    ", t)

ok = (not thieu and not thua and not khong_refno and not trung and not lech_tien
      and len(rows) == len(bk) == 190 and abs(tong - sum(x["tien"] for x in bk)) < 1)
print("\n%s" % ("✅ KHỚP TUYỆT ĐỐI — MISA = bảng kê 190 phiếu, từng đồng" if ok else "⚠️ CÒN LỆCH — xem chi tiết trên"))
