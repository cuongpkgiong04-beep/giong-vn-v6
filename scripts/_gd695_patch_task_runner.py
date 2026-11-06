# -*- coding: utf-8 -*-
"""GĐ 695/C.440 — chèn khối CẢNH BÁO MÁY TRẠM MẤT KẾT NỐI vào task_runner.py.

2 thay đổi (idempotent — có marker thì bỏ qua):
  1. Hàm + hằng số, đặt ngay trước `def start_task_runner():`.
  2. Nhịp gọi 5 phút trong `_task_runner_loop`, chèn NGAY SAU dòng log "wake báo cáo
     bỏ qua" (tìm theo 1 DÒNG để né lệch CRLF/LF của file gốc).
"""
import io

P = r"D:\DuLieuChung\CUONG_2026\giong-vn-v6\giong-apps\apps\banhang\agent\task_runner.py"
MARK = "GĐ 695/C.440"

BLOCK = '''# ==============================================================================
# ''' + MARK + ''' (ĐH chốt 06/11/2026) — CẢNH BÁO ZALO KHI MÁY TRẠM MẤT KẾT NỐI
# ==============================================================================
# Bối cảnh: máy trạm tắt / mất mạng / service chết thì job dồn lại mà không ai
# biết cho tới khi mở trang "Giám sát máy trạm". Vòng kiểm này (chạy trên MÁY CHỦ,
# 5 phút/lần) đọc bảng nhịp tim worker_heartbeat (GĐ 689) → tạo job 'bc-zalo'
# cảnh báo — DÙNG LẠI đúng cơ chế GĐ 653 (cfg alertText → agent máy chủ gửi tin
# qua Zalo Web CDP). Chống spam 2 lớp: cột alerted_at (mỗi ĐỢT mất kết nối chỉ 1
# tin; máy sống lại → báo "đã kết nối lại" rồi mở đợt mới) + khung giờ.
# Đổi cấu hình KHÔNG cần sửa code (kv_settings): worker_alert_enabled ('0'=tắt) ·
# worker_alert_minutes (mặc định 20) · worker_alert_hours (VD '6-22').
WORKER_ALERT_MINUTES = 20        # mất nhịp > 20 phút ⇒ coi là mất kết nối
WORKER_ALERT_HOURS = (6, 22)     # trong khung này cảnh báo ngay…
WORKER_ALERT_PENDING_MIN = 15    # …ngoài giờ chỉ cảnh báo khi có lệnh chờ > 15'
WORKER_ALERT_POLL_SEC = 300      # nhịp kiểm 5 phút/lần
WORKER_ALERT_BACK_SEC = 120      # nhịp mới <= 2 phút ⇒ máy vừa sống lại


def _worker_alert_cfg() -> tuple:
    """(enabled, minutes, h0, h1) — đọc kv_settings, thiếu/lỗi → hằng mặc định."""
    enabled, minutes = True, WORKER_ALERT_MINUTES
    h0, h1 = WORKER_ALERT_HOURS[0], WORKER_ALERT_HOURS[1]
    try:
        rows = _sql_query("SELECT k, v FROM dbo.kv_settings WHERE k IN "
                          "('worker_alert_enabled', 'worker_alert_minutes', 'worker_alert_hours')")
        kv = {str((r or {}).get("k") or ""): str((r or {}).get("v") or "").strip() for r in (rows or [])}
        if kv.get("worker_alert_enabled") == "0":
            enabled = False
        if kv.get("worker_alert_minutes", "").isdigit():
            minutes = max(5, int(kv["worker_alert_minutes"]))
        hours = kv.get("worker_alert_hours", "")
        if "-" in hours:
            a, _, b = hours.partition("-")
            if a.strip().isdigit() and b.strip().isdigit():
                h0, h1 = int(a), int(b)
    except Exception:
        pass
    return enabled, minutes, h0, h1


def _worker_alert_enqueue(msg: str) -> bool:
    """Tạo job bc-zalo CẢNH BÁO (cfg alertText) — cùng đường GĐ 653. Trả True/False."""
    try:
        target = _load_zalo_target()
        cfg = json.dumps({"alertText": msg, "target": target,
                          "caption": "Cảnh báo máy trạm (tự động)"}, ensure_ascii=False)
        today = datetime.now().strftime("%d/%m/%Y")
        ok = _sql_query(
            "INSERT INTO dbo.smed_pull_jobs (report, date_from, date_to, mode, status, "
            "total_centers, expected_files, output_dir, query_key, created_by) "
            "VALUES ('bc-zalo', $1, $1, 'headless', 'pending', 0, 1, '', 'zalo-alert', $2)",
            [today, "GĐ695 canh-bao-may-tram (auto)"])
        if ok is None:
            return False
        log(f"[task] đã tạo job bc-zalo cảnh báo máy trạm → Zalo '{target}'")
        return True
    except Exception as e:
        log(f"[task] không tạo được cảnh báo máy trạm: {type(e).__name__}: {str(e)[:140]}")
        return False


def check_worker_offline_alerts(now=None) -> dict:
    """Kiểm nhịp tim máy trạm → cảnh báo Zalo khi mất kết nối quá lâu.

    Trả {offline, alerted, recovered, skipped_hours} — thuần logic để test offline.
    An toàn: mọi lỗi DB đều bị nuốt (trả dict rỗng) — KHÔNG được làm chết task_runner.
    """
    out = {"offline": [], "alerted": [], "recovered": [], "skipped_hours": 0}
    try:
        enabled, minutes, h0, h1 = _worker_alert_cfg()
        if not enabled:
            return out
        rows = _sql_query(
            "SELECT worker_id, DATEDIFF(MINUTE, last_seen, SYSDATETIME()) AS stale_min, "
            "CASE WHEN alerted_at IS NULL THEN 0 ELSE 1 END AS alerted "
            "FROM dbo.worker_heartbeat")
        if not rows:
            return out
        now = now or datetime.now()
        in_hours = h0 <= now.hour < h1
        pend = 0
        if not in_hours:
            pr = _sql_query(
                "SELECT COUNT(*) AS n FROM dbo.smed_pull_jobs WHERE status = 'pending' "
                "AND created_at < DATEADD(MINUTE, -$1, SYSDATETIME())",
                [WORKER_ALERT_PENDING_MIN])
            pend = int((pr[0] or {}).get("n") or 0) if pr else 0
        for r in rows:
            wid = str(r.get("worker_id") or "")
            stale = int(r.get("stale_min") or 0)
            alerted = int(r.get("alerted") or 0)
            if stale >= minutes:
                out["offline"].append(wid)
                if alerted:
                    continue  # đã cảnh báo đợt này rồi
                if not (in_hours or pend > 0):
                    out["skipped_hours"] += 1
                    continue
                out["alerted"].append(wid)
            elif alerted and stale * 60 <= WORKER_ALERT_BACK_SEC:
                out["recovered"].append(wid)

        if out["alerted"]:
            names = ", ".join(out["alerted"])
            extra = f" — đang có {pend} lệnh CHỜ mà chưa máy nào nhận" if (pend and not in_hours) else ""
            msg = (f"⚠️ GIONG: {len(out['alerted'])} máy trạm MẤT KẾT NỐI quá {minutes} phút: "
                   f"{names}{extra}. Kiểm tra máy đã bật chưa + service worker "
                   f"(GIONG_SMED_Worker trên máy LAN · GIONG_SMED_Agent trên máy chủ) — "
                   f"xem trang Giám sát máy tram để biết chi tiết.")
            if _worker_alert_enqueue(msg):
                _sql_query("UPDATE dbo.worker_heartbeat SET alerted_at = SYSDATETIME() "
                           "WHERE worker_id = ANY($1::text[])", [out["alerted"]])
        if out["recovered"]:
            names = ", ".join(out["recovered"])
            msg = f"✅ GIONG: máy trạm đã KẾT NỐI LẠI — {names} (nhịp tim bình thường)."
            if _worker_alert_enqueue(msg):
                _sql_query("UPDATE dbo.worker_heartbeat SET alerted_at = NULL "
                           "WHERE worker_id = ANY($1::text[])", [out["recovered"]])
    except Exception as e:
        log(f"[task] kiểm nhịp máy trạm lỗi (bỏ qua): {type(e).__name__}: {str(e)[:140]}")
    return out


'''

LOOP_BLOCK = '''            # GĐ 695/C.440 — nhịp kiểm MÁY TRẠM MẤT KẾT NỐI (5 phút/lần): đọc
            # bảng nhịp tim worker_heartbeat → tạo job bc-zalo cảnh báo Zalo.
            # Chống spam: cột alerted_at (1 tin/đợt) + khung giờ (kv_settings).
            if time.time() - _last_worker_alert_ts >= WORKER_ALERT_POLL_SEC:
                _last_worker_alert_ts = time.time()
                _wa = check_worker_offline_alerts()
                if _wa.get("alerted") or _wa.get("recovered"):
                    log(f"[task] nhịp tim máy trạm — mất kết nối {_wa['offline']} · "
                        f"cảnh báo {_wa['alerted']} · kết nối lại {_wa['recovered']}")
'''

s = io.open(P, encoding="utf-8", newline="").read()
eol = "\r\n" if "\r\n" in s else "\n"

if MARK in s:
    print("[1] khoi canh bao da co - bo qua")
else:
    anchor = "def start_task_runner():"
    assert s.count(anchor) == 1, f"anchor start_task_runner xuat hien {s.count(anchor)} lan"
    s = s.replace(anchor, BLOCK.replace("\n", eol) + anchor)
    print("[1] da chen khoi canh bao truoc start_task_runner")

if "_last_worker_alert_ts" in s:
    print("[2] nhip goi da co - bo qua")
else:
    m2 = "_last_wake_ts = 0.0   # GĐ 556 (PA-3) — nhịp gọi lưới an toàn đánh thức báo cáo"
    assert s.count(m2) == 1, "khong thay dong _last_wake_ts"
    s = s.replace(m2, m2 + eol + "    _last_worker_alert_ts = 0.0  # GĐ 695 - nhịp kiểm máy trạm mất kết nối")

    wake = 'log(f"[task] wake báo cáo bỏ qua: {type(_we).__name__}: {_we}")'
    assert s.count(wake) == 1, "khong thay dong log wake bao cao"
    i = s.find(wake)
    j = s.find(eol, i)
    assert j > 0
    s = s[: j + len(eol)] + LOOP_BLOCK.replace("\n", eol) + s[j + len(eol) :]
    print("[2] da them nhip goi 5 phut vao _task_runner_loop")

io.open(P, "w", encoding="utf-8", newline="").write(s)
print("OK - ghi file xong (eol=%r)" % eol)
