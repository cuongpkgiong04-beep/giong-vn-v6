"""GĐ 584 — Sửa cột expected_files của job CŨ bị lưu SAI (rơi DEFAULT 19).

Gốc: api_server.py 2 đường INSERT job (Task-runner + web) thiếu cột
expected_files → mọi phân hệ không-19-file (dtthc=2, mia/misa/bank=1,
dattruoc=76) bị trang Sức khỏe dữ liệu báo "thiếu file" OAN + agent retry 3
vòng rồi job error oan.

Cách chạy (TỪ GỐC app tổng):
  python scripts/_gd584_fix_expected.py            # dry-run — chỉ in kế hoạch
  python scripts/_gd584_fix_expected.py --apply    # ghi DB (backup JSON trước)

Phạm vi: created_at >= --since (mặc định 2026-10-01 — vùng trang Sức khỏe hiển
thị). Backup: scripts/_gd584_backup_expected_<ts>.json (đủ để rollback).
Map số file: import CHÍNH agent/smed_expected.py (1 nguồn, không chép lại).
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import sys
from pathlib import Path

import pyodbc

ROOT = Path(__file__).resolve().parent.parent
AGENT_DIR = ROOT / "giong-apps" / "apps" / "banhang" / "agent"
sys.path.insert(0, str(AGENT_DIR))
from smed_expected import expected_files_for  # noqa: E402  (1 nguồn duy nhất)

CONN = (
    "DRIVER={ODBC Driver 17 for SQL Server};SERVER=localhost;DATABASE=GiongDB;"
    "Trusted_Connection=yes;"
)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true", help="ghi DB thật (mặc định dry-run)")
    ap.add_argument("--since", default="2026-10-01", help="chỉ job created_at >= ngày này")
    args = ap.parse_args()

    cn = pyodbc.connect(CONN)
    cur = cn.cursor()
    cur.execute(
        """
        SELECT id, report, date_from, date_to, expected_files, status
        FROM dbo.smed_pull_jobs
        WHERE created_at >= ?
        """,
        args.since,
    )
    # 'sqlreport' = job BÁO CÁO SQL (kết quả nằm cột result, không tải file) —
    # KHÔNG thuộc map phân hệ tải file → bỏ qua, không đụng (đổi oan 1 → 19 sẽ
    # làm job báo cáo bị coi "thiếu 18 file").
    SKIP_REPORTS = {"sqlreport"}
    fixes: list[tuple] = []
    skipped: list[tuple] = []
    for jid, rep, dfrom, dto, exp, status in cur.fetchall():
        if str(rep) in SKIP_REPORTS:
            skipped.append((str(rep), str(dfrom or ""), int(exp or 0)))
            continue
        want = expected_files_for(str(rep), str(dfrom or ""), str(dto or ""))
        if int(exp or 0) != want:
            fixes.append((jid, str(rep), str(dfrom or ""), str(dto or ""), int(exp or 0), want, str(status)))
    for rep, d1, exp in skipped:
        print(f"   (bỏ qua {rep} {d1} expected={exp} — job báo cáo SQL, không có file)")

    print(f"Job SAI cần sửa (created_at >= {args.since}): {len(fixes)}")
    by_rep: dict[str, int] = {}
    for f in fixes:
        by_rep[f[1]] = by_rep.get(f[1], 0) + 1
    for rep, n in sorted(by_rep.items(), key=lambda kv: -kv[1]):
        sample = next(f for f in fixes if f[1] == rep)
        print(f"   {rep:24s} {n:4d} job   (VD {sample[2]}: {sample[4]} → {sample[5]})")

    if not fixes:
        cn.close()
        return 0

    ts = dt.datetime.now().strftime("%Y%m%d_%H%M%S")
    bpath = ROOT / "scripts" / f"_gd584_backup_expected_{ts}.json"
    bpath.write_text(
        json.dumps(
            [{"id": f[0], "report": f[1], "date_from": f[2], "expected_files_cu": f[4], "expected_files_moi": f[5]} for f in fixes],
            ensure_ascii=False,
            indent=1,
        ),
        encoding="utf-8",
    )
    print(f"Backup: {bpath}")

    if not args.apply:
        print("DRY-RUN — chưa ghi DB (thêm --apply để chạy thật)")
        cn.close()
        return 0

    n = 0
    for jid, _rep, _d1, _d2, _old, want, _st in fixes:
        cur.execute("UPDATE dbo.smed_pull_jobs SET expected_files = ? WHERE id = ?", want, jid)
        n += cur.rowcount if cur.rowcount and cur.rowcount > 0 else 0
    cn.commit()

    # Đối chứng sau khi sửa: đếm lại số job còn sai
    cur.execute(
        """
        SELECT report, date_from, date_to, expected_files FROM dbo.smed_pull_jobs
        WHERE created_at >= ?
        """,
        args.since,
    )
    left = sum(
        1
        for rep, dfrom, dto, exp in cur.fetchall()
        if int(exp or 0) != expected_files_for(str(rep), str(dfrom or ""), str(dto or ""))
    )
    print(f"ĐÃ SỬA {n} job · còn sai sau sửa: {left} (phải = 0)")
    cn.close()
    return 0 if left == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
