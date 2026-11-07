# -*- coding: utf-8 -*-
"""GĐ 707 — probe bước 7: xác nhận 76 phiếu B có TRÙNG 1-1 với 76 phiếu A-3531 không."""
import json, sys, io, os, urllib.request, urllib.error
from collections import Counter

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "giong-apps", "apps", "banhang", "agent"))
import misa_http_login as hl
from misa_http_api import MisaHttp

BASE = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
p = os.path.join(BASE, "artifacts", "gd707_probe", "misa_0411.json")
data = json.load(open(p, encoding="utf-8"))
db_refno = {x["refno_misa"] for x in data["bk"] if x["refno_misa"]}
bk_sohd = {x["so_hd"] for x in data["bk"] if x["so_hd"]}

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

A = [r for r in rows if str(r.get("refno_finance") or "").strip() in db_refno]
B = [r for r in rows if str(r.get("refno_finance") or "").strip() not in db_refno]

print("created_by nhóm A:", dict(Counter(str(r.get("created_by")) for r in A)))
print("created_by nhóm B:", dict(Counter(str(r.get("created_by")) for r in B)))

A3531 = [r for r in A if r.get("reftype") == 3531]
A3537 = [r for r in A if r.get("reftype") == 3537]
print("\nA-3531: %d | A-3537: %d | B-3531: %d" % (len(A3531), len(A3537), len(B)))

key = lambda r: (str(r.get("inv_series") or ""), str(r.get("inv_no") or ""))
kb = set(key(r) for r in B)
ka = set(key(r) for r in A3531)
trung = kb & ka
print("\nB (series,inv_no) ∩ A-3531: %d cặp TRÙNG / B có %d / A-3531 có %d" % (len(trung), len(kb), len(ka)))
print("B mà A-3531 KHÔNG có:", sorted(kb - ka)[:10])
print("A-3531 mà B KHÔNG có:", sorted(ka - kb)[:10])

# A-3537 so với bảng kê so_hd
ka3537 = set(str(r.get("inv_no") or "").strip() for r in A3537)
print("\nA-3537 inv_no ∩ bảng kê so_hd: %d / %d" % (len(ka3537 & bk_sohd), len(ka3537)))
print("A-3537 inv_no KHÔNG trong bảng kê:", sorted(ka3537 - bk_sohd)[:10])
ka3531s = set(str(r.get("inv_no") or "").strip() for r in A3531)
print("A-3531 inv_no ∩ bảng kê so_hd: %d / %d" % (len(ka3531s & bk_sohd), len(ka3531s)))
print("A-3531 inv_no KHÔNG trong bảng kê:", sorted(ka3531s - bk_sohd)[:10])
print("B inv_no ∩ bảng kê so_hd: %d / %d" % (len(set(x[1] for x in kb) & bk_sohd), len(set(x[1] for x in kb))))

# tổng tiền 3 khối
t = lambda rs: sum(float(r.get("total_amount") or 0) for r in rs)
print("\nTiền: A-3531=%s | A-3537=%s | B=%s" % (t(A3531), t(A3537), t(B)))

# so tổng tiền từng cặp trùng (B vs A-3531)
money_a = {key(r): float(r.get("total_amount") or 0) for r in A3531}
lech = [(k, money_a[k], next(float(r.get("total_amount") or 0) for r in B if key(r) == k)) for k in trung
        if money_a[k] != next(float(r.get("total_amount") or 0) for r in B if key(r) == k)]
print("Cặp trùng mà TIỀN khác nhau: %d" % len(lech))
for k, ma, mb_ in lech[:10]:
    print("   %s: A=%s B=%s" % (k, ma, mb_))

# lưu danh sách 76 B để xử lý (chờ ĐH chốt)
out = [{"refno": str(r.get("refno_finance")), "refid": str(r.get("refid")), "inv_series": str(r.get("inv_series")),
        "inv_no": str(r.get("inv_no")), "khach": str(r.get("account_object_name")), "tien": float(r.get("total_amount") or 0),
        "created": str(r.get("created_date")), "created_by": str(r.get("created_by")), "posted": bool(r.get("is_posted_finance"))}
       for r in B]
p2 = os.path.join(BASE, "artifacts", "gd707_probe", "nhom_b_76_phieu.json")
json.dump(out, open(p2, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("\nĐã lưu 76 phiếu B:", p2)
print("Refno B từ %s đến %s" % (out[0]["refno"], out[-1]["refno"]))
