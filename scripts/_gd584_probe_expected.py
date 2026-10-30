"""GĐ 584 — Probe: job nào bị lưu expected_files SAI (khác map chuẩn smed-expected.ts).

Chỉ ĐỌC. In bảng gọn: report | số job sai | ví dụ (ngày, expected_db vs đúng, file thật).
"""
from __future__ import annotations

import datetime as dt
import sys

import pyodbc

CONN = (
    "DRIVER={ODBC Driver 17 for SQL Server};SERVER=localhost;DATABASE=GiongDB;"
    "Trusted_Connection=yes;"
)


def expected_files_for(report: str, date_from: str, date_to: str) -> int:  # mirror smed-expected.ts
    def ndays(a: str, b: str) -> int:
        try:
            da = dt.datetime.strptime(a, "%d/%m/%Y")
            db_ = dt.datetime.strptime(b, "%d/%m/%Y")
            return (db_ - da).days + 1 if db_ >= da else 1
        except Exception:
            return 1
    rep = (report or "").strip()
    if rep == "bank-vcb":
        return ndays(date_from, date_to)
    if rep in ("bank-tcb", "bank-tpb", "bkct-hdgtgt", "bkth-hdgtgt",
               "misa-mua-hang-api", "misa-xuat-kho-api", "misa-ban-hang-api"):
        return 1
    if rep == "dattruoc":
        return 76
    if rep == "dtthc":
        return 2
    if rep.startswith("mia-"):
        return 1
    return 19


def main() -> int:
    cn = pyodbc.connect(CONN)
    cur = cn.cursor()
    cur.execute(
        """
        SELECT report, date_from, date_to, expected_files, status, created_by,
               (SELECT COUNT(*) FROM OPENJSON(files)
                 WHERE JSON_VALUE([value], '$.name') NOT LIKE '%.log') AS n_xl
        FROM dbo.smed_pull_jobs
        WHERE created_at >= '2026-10-01'
        """
    )
    wrong: dict[str, list[str]] = {}
    right = 0
    total = 0
    for rep, dfrom, dto, exp, status, by, nxl in cur.fetchall():
        total += 1
        want = expected_files_for(str(rep), str(dfrom or ""), str(dto or ""))
        if int(exp or 0) == want:
            right += 1
            continue
        wrong.setdefault(str(rep), []).append(
            f"{dfrom} exp_db={exp} đúng={want} file={nxl} {status} by={by}"
        )
    print(f"TỔNG job từ 01/10: {total} — đúng {right} — SAI {total - right}")
    for rep, rows in sorted(wrong.items(), key=lambda kv: -len(kv[1])):
        print(f"\n== {rep}: {len(rows)} job SAI ==")
        for r in rows[:4]:
            print("   ", r)
    cn.close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
