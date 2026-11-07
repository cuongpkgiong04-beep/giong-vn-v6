# -*- coding: utf-8 -*-
"""GĐ 707 — probe bước 8: so nguồn SMED (194) và MeInvoice BKCT (234) với bảng kê 190."""
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
data = json.load(open(os.path.join(BASE, "artifacts", "gd707_probe", "misa_0411.json"), encoding="utf-8"))
bk = data["bk"]
bk_sohd = set(x["so_hd"] for x in bk if x["so_hd"])
bk_c_uploaded = [x for x in bk if not x["uploaded"]]
print("Phiếu bảng kê chưa upload (%d):" % len(bk_c_uploaded))
for x in bk_c_uploaded:
    print("   ma_phieu=%s so_hd=%s tien=%s posted=%s" % (x["ma_phieu"], x["so_hd"], x["tien"], x["posted"]))

# SMED stg_1HDDT: col5 = số HĐ (GĐ 603 dùng col5 cho stg_5BKN; stg_1HDDT cần xem col5 có phải số HĐ không — lấy mẫu)
r = query(f"SELECT TOP 2 col3, col4, col5, col6 FROM stg_1HDDT WHERE report_date='{KY}'", 2)
print("\nMẫu stg_1HDDT (col3,col4,col5,col6):")
for row in r["rows"]:
    print("  ", {k: row[k] for k in ("col3", "col4", "col5", "col6")})

# so col5 với bảng kê
r = query(f"SELECT col5 FROM stg_1HDDT WHERE report_date='{KY}'", 500)
smed = set(str(x["col5"]).strip() for x in r["rows"])
smed_du = sorted(smed - bk_sohd - {""})
print("\nSMED stg_1HDDT: %d số HĐ | có mà bảng kê KHÔNG có: %d — %s" % (len(smed), len(smed_du), ", ".join(smed_du[:12])))

# MeInvoice BKCT: col3 = số HĐ
r = query(f"SELECT col3, col19 FROM stg_11BKCT WHERE report_date='{KY}'", 500)
mia = set(str(x["col3"]).strip() for x in r["rows"] if x["col3"])
mia_du = sorted(mia - bk_sohd - {""})
print("MeInvoice BKCT: %d số HĐ | có mà bảng kê KHÔNG có: %d" % (len(mia), len(mia_du)))
if mia_du:
    # lấy tiền của nhóm dư
    tien_du = {}
    for x in r["rows"]:
        s = str(x["col3"]).strip()
        if s in mia_du and s not in tien_du:
            try:
                tien_du[s] = int(str(x["col19"]).strip() or "0")
            except Exception:
                tien_du[s] = 0
    print("   tổng tiền nhóm MeInvoice dư: %s" % sum(tien_du.values()))
    print("   12 số mẫu: %s" % ", ".join(mia_du[:12]))
# bảng kê so_hd mà MeInvoice không có
bk_du = sorted(bk_sohd - mia)
print("   bảng kê có mà MeInvoice BKCT KHÔNG có: %d — %s" % (len(bk_du), ", ".join(bk_du[:8])))
