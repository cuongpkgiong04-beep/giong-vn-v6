# -*- coding: utf-8 -*-
"""GĐ 707 — probe bước 6: nhóm B (76 CT ngoài bảng kê) — created_date, reftype, khách, dòng hàng."""
import json, sys, io, os, urllib.request, urllib.error
from collections import Counter

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "giong-apps", "apps", "banhang", "agent"))
import misa_http_login as hl
from misa_http_api import MisaHttp

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

db_refno = set()
import sqlite3  # placeholder để không lôi pyodbc nếu không cần — thay bằng đọc file json đã lưu
# đọc refno bảng kê từ file đã lưu
p = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "artifacts", "gd707_probe", "misa_0411.json")
data = json.load(open(p, encoding="utf-8"))
db_refno = {x["refno_misa"] for x in data["bk"] if x["refno_misa"]}

A = [r for r in rows if str(r.get("refno_finance") or "").strip() in db_refno]
B = [r for r in rows if str(r.get("refno_finance") or "").strip() not in db_refno]
print("Nhóm A (khớp DB): %d | Nhóm B (ngoài DB): %d" % (len(A), len(B)))

# reftype 2 nhóm
print("reftype A:", dict(Counter(str(r.get("reftype")) for r in A)))
print("reftype B:", dict(Counter(str(r.get("reftype")) for r in B)))

# created_date 2 nhóm (ngày + giờ)
def dt(g):
    return str(g)[:16]
print("\ncreated_date nhóm A (đếm theo ngày):", dict(Counter(dt(r.get("created_date"))[:10] for r in A)))
cB = Counter(dt(r.get("created_date")) for r in B)
print("created_date nhóm B (theo phút):")
for k in sorted(cB):
    print("   %s : %d phiếu" % (k, cB[k]))

# posted 2 nhóm
print("\nis_posted_finance A:", dict(Counter(str(r.get("is_posted_finance")) for r in A)))
print("is_posted_finance B:", dict(Counter(str(r.get("is_posted_finance")) for r in B)))

# in nguyên trạng 1 phiếu nhóm B (cắt gọn)
if B:
    one = B[0]
    print("\nMẪU phiếu nhóm B (%s):" % one.get("refno_finance"))
    js = json.dumps(one, ensure_ascii=False, default=str)
    print(js[:2600])

# keys khả dụng cho khách hàng
if B:
    ks = [k for k in B[0].keys() if "object" in k.lower() or "name" in k.lower() or "contact" in k.lower() or "journal" in k.lower()]
    print("\nkeys tên/khách nhóm B:", ks)
    for one in B[:5]:
        print("  %s | kh=%s | memo=%s | total=%s" % (
            one.get("refno_finance"),
            one.get("accounting_object_name"), one.get("journal_memo"), one.get("total_amount")))
