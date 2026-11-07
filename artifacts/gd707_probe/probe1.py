# -*- coding: utf-8 -*-
"""GĐ 707 — probe bước 1: liệt kê bảng bán hàng/MISA + cấu trúc sm_banhang_phieu."""
import json, sys, io, os, re, urllib.request

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

BASE = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))  # giong-vn-v6/
ROOT = os.path.dirname(BASE)  # CUONG_2026/
def read_env(path):
    d = {}
    if os.path.isfile(path):
        for line in open(path, encoding="utf-8", errors="ignore"):
            line = line.strip()
            if "=" in line and not line.startswith("#"):
                k, v = line.split("=", 1)
                d[k.strip()] = v.strip().strip('"').strip("'")
    return d

def read_env_bat(path):
    d = {}
    if os.path.isfile(path):
        for line in open(path, encoding="utf-8", errors="ignore"):
            line = line.strip()
            if line.lower().startswith("set ") and "=" in line:
                k, v = line[4:].split("=", 1)
                d[k.strip()] = v.strip().strip('"').strip("'")
    return d

TUNNEL = "http://127.0.0.1:8777"  # api_server chạy ngay máy này — tunnel URL trong .env.local đã chết (DNS fail)
TOKEN = read_env_bat(os.path.join(BASE, "giong-apps", "apps", "banhang", "agent", ".secrets", "agent.env.bat")).get("SMED_AGENT_TOKEN")

def query(sql, limit=200):
    body = json.dumps({"sql": sql, "limit": limit}).encode("utf-8")
    req = urllib.request.Request(
        TUNNEL.rstrip("/") + "/db/query", data=body,
        headers={"Content-Type": "application/json", "Authorization": "Bearer " + TOKEN},
    )
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read().decode("utf-8"))

# 1) bảng liên quan bán hàng / MISA (KHÔNG ORDER BY — bẫy /db/query: subquery bọc TOP chặn ORDER BY)
r1 = query("SELECT name FROM sys.tables WHERE name LIKE '%banhang%' OR name LIKE '%misa%' OR name LIKE 'sm_%' OR name LIKE 'stg_%'")
names = sorted(row["name"] for row in r1["rows"])
print("=== BẢNG LIÊN QUAN (%d):" % len(names))
print(", ".join(names))

# 2) cột các bảng then chốt
for tb in ["sm_banhang_phieu", "misa_sa_detail", "misa_sa_upload_line", "stg_1HDDT", "misa_phieu_status", "sm_phieu_xuly"]:
    r2 = query(f"SELECT c.column_id, c.name, t.name AS loai FROM sys.columns c JOIN sys.types t ON c.user_type_id=t.user_type_id WHERE c.object_id=OBJECT_ID('dbo.{tb}')")
    cols = sorted(r2["rows"], key=lambda r: r["column_id"])
    print("\n=== CỘT %s (%d):" % (tb, len(cols)))
    print("  " + ", ".join("%s(%s)" % (row["name"], row["loai"]) for row in cols))
