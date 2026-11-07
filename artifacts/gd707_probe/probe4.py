# -*- coding: utf-8 -*-
"""GĐ 707 — probe bước 4: phủ dữ liệu của misa_sa_detail / stg_11BKCT / misa_phieu_status / misa_sa_upload_line."""
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

r = query("SELECT MIN(refdate) AS tu, MAX(refdate) AS den, COUNT(*) AS n, MAX(synced_at) AS sync FROM misa_sa_detail")
row = r["rows"][0]
print("misa_sa_detail      : %s → %s (%d dòng, sync %s)" % (row["tu"], row["den"], row["n"], row["sync"]))

r = query("SELECT MIN(report_date) AS tu, MAX(report_date) AS den, COUNT(*) AS n, MAX(created_at) AS sync FROM stg_11BKCT")
if "err" not in r:
    row = r["rows"][0]
    print("stg_11BKCT          : %s → %s (%d dòng, tạo %s)" % (row["tu"], row["den"], row["n"], row["sync"]))
else:
    print("stg_11BKCT LỖI:", r["body"])

r = query(f"SELECT COUNT(*) AS n FROM stg_11BKCT WHERE report_date='{KY}'")
if "err" not in r:
    print("stg_11BKCT ngày %s : %d dòng" % (KY, r["rows"][0]["n"]))

r = query("SELECT MIN(inv_date) AS tu, MAX(inv_date) AS den, COUNT(*) AS n, MAX(checked_at) AS sync FROM misa_phieu_status")
row = r["rows"][0]
print("misa_phieu_status   : %s → %s (%d dòng, check %s)" % (row["tu"], row["den"], row["n"], row["sync"]))

r = query("SELECT MIN(report_date) AS tu, MAX(report_date) AS den, COUNT(*) AS n, MAX(updated_at) AS sync FROM misa_sa_upload_line")
row = r["rows"][0]
print("misa_sa_upload_line : %s → %s (%d dòng, cập nhật %s)" % (row["tu"], row["den"], row["n"], row["sync"]))

r = query(f"SELECT COUNT(*) AS n FROM misa_sa_upload_line WHERE report_date='{KY}'")
if "err" not in r:
    print("misa_sa_upload_line ngày %s : %d dòng" % (KY, r["rows"][0]["n"]))

# trạng thái các run upload bán hàng kỳ 04/11
r = query(f"SELECT trang_thai, COUNT(*) AS n, SUM(thanh_tien) AS tien FROM misa_sa_upload_line WHERE report_date='{KY}' GROUP BY trang_thai")
if "err" not in r:
    for row in r["rows"]:
        print("   upload_line trạng thái=%-20s : %s dòng, %s" % (row["trang_thai"], row["n"], row["tien"]))

# sm_phieu_xuly — nhật ký xử lý tay
r = query("SELECT report, action, status, COUNT(*) AS n FROM sm_phieu_xuly GROUP BY report, action, status")
if "err" not in r:
    print("\nsm_phieu_xuly (xử lý tay):")
    for row in r["rows"]:
        print("   %-24s %-22s %-16s : %d" % (row["report"], row["action"], row["status"], row["n"]))
