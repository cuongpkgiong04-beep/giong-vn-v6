# -*- coding: utf-8 -*-
"""GĐ 707 — probe bước 2: đếm 3 lớp kỳ 04/11/2026 (SMED nguồn ↔ bảng kê upload ↔ MISA)."""
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

def query(sql, limit=200):
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

def show(nhan, sql, limit=200):
    r = query(sql, limit)
    if "err" in r:
        print("%s => LỖI %s: %s" % (nhan, r["err"], r["body"][:200]))
        return None
    return r

# 1) Bảng kê upload sm_banhang_phieu kỳ 04/11 — đếm theo report_date và theo ngay_ban_hang
for cot in ["report_date", "CAST(ngay_ban_hang AS date)"]:
    r = show("banhang_phieu(%s)" % cot, f"SELECT COUNT(*) AS n, SUM(tong_tien) AS tien FROM sm_banhang_phieu WHERE {cot} = '{KY}'")
    if r:
        row = r["rows"][0]
        print("sm_banhang_phieu theo %-28s : %s phiếu, tổng %s" % (cot, row["n"], row["tien"]))

# trạng thái upload/ghi sổ của 190 dòng đó
r = show("trangthai", f"SELECT is_uploaded, is_posted, COUNT(*) AS n, SUM(tong_tien) AS tien FROM sm_banhang_phieu WHERE report_date='{KY}' GROUP BY is_uploaded, is_posted")
if r:
    for row in r["rows"]:
        print("   trạng thái is_uploaded=%s is_posted=%s : %s phiếu, %s" % (row["is_uploaded"], row["is_posted"], row["n"], row["tien"]))

# 2) MISA đồng bộ misa_sa_detail kỳ 04/11 — số chứng từ + tổng tiền theo refid
r = show("misa_sa_detail", f"SELECT COUNT(*) AS so_ct, SUM(tt) AS tien, SUM(CASE WHEN posted=1 THEN tt ELSE 0 END) AS tien_posted, MAX(synced_at) AS sync FROM (SELECT refid, MAX(is_posted) AS posted, SUM(amount) AS tt FROM misa_sa_detail WHERE refdate='{KY}' GROUP BY refid) _x")
if r:
    row = r["rows"][0]
    print("misa_sa_detail theo refid : %s chứng từ, tổng %s (ghi sổ %s), synced_at=%s" % (row["so_ct"], row["tien"], row["tien_posted"], row["sync"]))

# 3) MISA misa_sa_detail — đếm theo ma_phieu thay vì refid (so sánh 265 của MISA UI)
r = show("misa_sa_detail_ma_phieu", f"SELECT COUNT(*) AS so_ct, SUM(tt) AS tien FROM (SELECT ma_phieu, MAX(is_posted) AS posted, SUM(amount) AS tt FROM misa_sa_detail WHERE refdate='{KY}' GROUP BY ma_phieu) _x")
if r:
    row = r["rows"][0]
    print("misa_sa_detail theo ma_phieu: %s chứng từ, tổng %s" % (row["so_ct"], row["tien"]))

# 4) nguồn SMED stg_1HDDT kỳ 04/11 — đếm dòng
r = show("stg_1HDDT", f"SELECT COUNT(*) AS n, COUNT(DISTINCT col5) AS so_sohd FROM stg_1HDDT WHERE report_date='{KY}'")
if r:
    row = r["rows"][0]
    print("stg_1HDDT : %s dòng, %s số HĐ distinct" % (row["n"], row["so_sohd"]))
