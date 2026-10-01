# [PLAN] [TASK-001] — Bản mô tả kỹ thuật: hộp "Tải dữ liệu mới nhất" cho 2 báo cáo TCB

> **Người viết:** Planner (Trợ lý Freebuff — vai Planner PIPELINE) · **Ngày:** 02/10/2026
> **Trạng thái nghiên cứu:** ĐÃ đọc đủ code + xác định ROOT CAUSE chính xác

---

## 1. Hiện trạng code liên quan

| File/vị trí | Vai trò hiện tại | Điểm sẽ đụng tới |
|---|---|---|
| `giong-apps/apps/banhang/src/components/sql-data-module.tsx` | Component DÙNG CHUNG mọi báo cáo SQL — hộp checkbox + danh sách nguồn nằm ở dòng ~676: `{srcs.length > 0 && (...)}` | KHÔNG sửa — chỉ điều kiện hiển thị |
| `giong-apps/apps/banhang/src/routes/api/-smed.ts` dòng 173-211 | `SQL_SOURCES_BY_QUERY` — map queryKey → nguồn (reportKey + table + label). **Dòng 210-211 có VCB; THIẾU 2 key TCB** | ✅ SỬA — thêm 2 dòng |
| `src/routes/m/bc-bank-tcb.tsx` + `bc-bank-tcb-th.tsx` | 2 trang TCB, truyền `queryKey="bank-tcb-chitiet"` / `"bank-tcb-tonghop"` vào SqlDataModule | KHÔNG sửa |
| `agent/etl/sql_reports.py` dòng 2361-2362 | Tầng AGENT: `REPORT_SOURCE_TABLES` ĐÃ có đủ 2 key TCB (checkCol "period") | KHÔNG sửa — đã đúng |
| `agent/etl/bank_tcb_import.py` | ETL nạp bảng `bank_tcb_tx` (tool 41 → OUTPUT\16.BANK_TCB) | KHÔNG sửa |

**ROOT CAUSE:** checkbox + danh sách nguồn chỉ hiện khi `srcs.length > 0`, mà
`srcs = sourcesForReport(report, queryKey)` tra **map web-side**
`SQL_SOURCES_BY_QUERY`. Map này có VCB nhưng thiếu `bank-tcb-chitiet` +
`bank-tcb-tonghop` → `srcs` rỗng → hộp biến mất trên cả 2 trang TCB.
(Dạng lỗi "hai đầu không khớp" lần N — GĐ 96/109/204/267: agent-side có,
web-side thiếu.)

## 2. Giải pháp đề xuất (tóm tắt)

Thêm 2 entry TCB vào `SQL_SOURCES_BY_QUERY` (web-side) cạnh VCB, đối xứng 100%
với tầng agent đã có: reportKey `"bank-tcb"`, table `"bank_tcb_tx"`, label ghi rõ
tool + folder `OUTPUT\16.BANK_TCB` (đúng mong muốn "biết đang ở folder nào").
Tự động hưởng: checkbox + mốc "nạp lúc HH:MM" (import_log) + nhánh C.50
(tick → treo job download `bank-tcb` → xong tự chạy báo cáo).

## 3. Danh sách file sẽ sửa/tạo (phạm vi CỨNG của Coder)

| # | File | Hành động | Nội dung |
|---|---|---|---|
| 1 | `giong-apps/apps/banhang/src/routes/api/-smed.ts` | Sửa | Thêm 2 dòng vào `SQL_SOURCES_BY_QUERY` NGAY SAU dòng VCB (210-211): `\"bank-tcb-chitiet\"` + `\"bank-tcb-tonghop\"` → `[{ reportKey: \"bank-tcb\", table: \"bank_tcb_tx\", label: \"Sao kê ngân hàng TCB (tool 41 — OUTPUT\\\\16.BANK_TCB)\" }]` |

Không file nào khác. Trang TCB, component, tầng agent, phân quyền: KHÔNG đụng
(đều đã sẵn sàng).

## 4. Các lỗi tiềm ẩn phải phòng tránh

| # | Rủi ro | Cách phòng trong implementation |
|---|---|---|
| 1 | Sai tên bảng/reportKey → freshness tra không thấy → hiện "chưa có dữ liệu" SAI dù đã tải | Khớp TUYỆT ĐỐI chuỗi với tầng agent (dòng 2361-2362): `bank-tcb` · `bank_tcb_tx`. Copy label VCB đổi ngân hàng |
| 2 | Label không nêu folder → mất ý "đang ở folder nào" của anh | Label bắt buộc chứa `OUTPUT\\16.BANK_TCB` (VCB cùng pattern) |
| 3 | Sửa thừa sang tầng agent (sql_reports.py) | CẤM — tầng agent đã đúng, sửa = lan phạm vi (nguyên tắc GĐ 77) |
| 4 | tick "Tải mới" tạo job `bank-tcb` bị chặn quyền/whitelist | ĐÃ verify: reportKey `bank-tcb` có sẵn trong whitelist createSmedJob (-smed.ts dòng 701) + phân quyền nhóm `banhang-bank` — không cần thêm gì |
| 5 | Quên key tổng hợp chỉ sửa chi tiết | CẢ HAI key phải thêm — brief yêu cầu "cả báo cáo chi tiết và tổng hợp" |

## 5. Bước làm chi tiết

1. Mở `-smed.ts`, tìm khối `"bank-vcb-chitiet": [...]` (dòng 210-211)
2. Thêm NGAY SAU 2 dòng: entry `bank-tcb-chitiet` + `bank-tcb-tonghop`
   (label + table + reportKey như mục 3)
3. `cd giong-apps/apps/banhang && npx tsc --noEmit` → 0 lỗi
4. Ghi code-report.md, cập nhật registry + STATUS.md

## 6. Tiêu chí kiểm chứng (Tester + Reviewer dùng đúng mục này)

| # | Tiêu chí | Cách kiểm | Kết quả mong đợi |
|---|---|---|---|
| 1 | 2 trang TCB hiện hộp + nguồn | Dev server (`start-local.bat`) → mở `/m/bc-bank-tcb` + `/m/bc-bank-tcb-th` | Thấy checkbox "Tải dữ liệu mới nhất trước khi chạy" + dòng "Sao kê ngân hàng TCB (tool 41 — OUTPUT\16.BANK_TCB) — nạp lúc … / chưa có dữ liệu" |
| 2 | Đồng nhất VCB | Mở `/m/bc-bank-vcb` đặt cạnh | Hộp + format nguồn GIỐNG HỆT VCB |
| 3 | Tick + chạy = chuỗi C.50 | Tick hộp + bấm chạy kỳ có data TCB | Toast treo job download `bank-tcb` + job báo cáo "Chờ tải dữ liệu" + tự chạy sau |
| 4 | KHÔNG hồi quy VCB/báo cáo khác | Mở /m/bc-bank-vcb + 1 báo cáo stg (VD bc-thu-tien) | Hộp vẫn hiện bình thường |
| 5 | Typecheck | `npx tsc --noEmit` tại apps/banhang | 0 lỗi |
| 6 | Phạm vi | `git diff` | CHỈ 1 file `-smed.ts`, +2 dòng (±comment) |

## 7. Việc sẽ mở theo

**"Sau nay thống nhất làm báo cáo là phải đồng nhất hộp thoại này"** → đề xuất
Đại ca cho bổ sung 1 dòng vào khối 📌 QUY TRÌNH NGHIỆP VỤ (GĐ 278) bước 3
BÁO CÁC: "Mọi báo cáo PHẢI khai báo nguồn trong SQL_SOURCES_BY_QUERY web-side +
REPORT_SOURCE_TABLES agent-side cùng lúc (hộp Tải dữ liệu mới nhất + mốc nạp)"
— làm task riêng, KHÔNG nhét vào TASK-001.

---
*Planner: Trợ lý Freebuff · 02/10/2026 — chờ Đại ca duyệt plan rồi kích hoạt Coder.*
