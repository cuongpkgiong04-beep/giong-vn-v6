---
name: dieu-tra-job-loi
description: "Dùng khi job tải dữ liệu / ETL / báo cáo / upload lên MISA bị LỖI, TREO, hoặc báo xong mà số liệu sai (GIONG: SMED, MISA, MIA, BANK; app con banhang + agent Python trên máy chủ). Cũng dùng khi Đại Ca báo 'chạy mà không thấy gì', 'treo ở X%', 'báo thành công nhưng MISA trống'."
---

# Điều tra job lỗi / treo / sai số

## Nguyên tắc bất di bất dịch
- **Không tin chữ "done"** — phải đối chứng số thật (file gốc ↔ DB ↔ MISA/báo cáo).
- **Không kết luận trước khi xem job THẬT trong DB** (hiện tượng "không thấy gì" nhiều lần có gốc là job tạo SAI LOẠI, không phải job không chạy).
- Sửa xong phải chạy lại và **đếm lại** để chứng minh.

## Thứ tự 5 bước
1. **Xác định đúng thứ đang nói tới**: kỳ (từ ngày → đến ngày), phân hệ (SMED/MISA/MIA/BANK), loại job (download · báo cáo · upload MISA · ETL).
   → Hỏi lại Đại Ca nếu mơ hồ, đừng đoán.
2. **Tra job trong GiondDB** (bảng job của agent): `query_key`, `mode`, `status`, `created_at`, `claimed_by`, `run_started/finished`, `result`, `files` (cột `files`/`result_full` NẶNG — không `SELECT *`, chỉ chọn cột cần theo quy ước egress).
   - `waitdownload` = job báo cáo chờ nguồn (đang đợi download xong) — KHÔNG phải treo.
   - `claimed_by` cho biết máy nào nhận (phân tải 4 máy: .250 core · .245 giangkt · .34 thanh-pc · .27).
3. **Xem file thật trong OUTPUT**: đếm file vs `expected_files` của phân hệ → thiếu file nào, file 0 byte, hay file cũ còn sót.
   - Dùng công cụ sẵn có: `agent/gd554_audit_backfill.py` (audit / backfill / watch / verify 4 nhóm).
4. **ETL**: nạp lại đúng đơn vị (theo NGÀY với SMED/VCB · theo KỲ với TCB/MIA) rồi đối chứng tổng với file gốc.
   - Rebuild-ngày: folder có ≥1 file mới → nạp lại TOÀN BỘ file của folder (bỏ hash-skip).
5. **Báo cáo / upload MISA**: chạy lại job và đếm lại kết quả (số phiếu tạo/bỏ qua/lỗi) — kèm lý do lỗi thật từ MISA (đừng báo "lỗi" chung chung).

## Bẫy đã gặp thật (đối chiếu trước khi mất thời gian)
- **"done giả"**: job báo done nhưng thiếu file (đếm file thật, không tin `doneCenters` cũ).
- **Treo "Chờ tải dữ liệu" (66%)**: % là tiến độ TẢI NGUỒN (`miss×19+1`), không phải % báo cáo — nguồn lỗi thì job không bao giờ tự chạy tiếp (đã có watchdog + `report_wake.py`).
- **Chrome CDP treo WebSocket**: `/json/version` trả 200 nhưng `connect_over_cdp` timeout → phải `Get-Process chrome | Stop-Process` (TOÀN BỘ) rồi mở lại bằng scheduled task; kill theo cmdline KHÔNG đủ.
- **Env lệch/thiếu**: `AGENT_SQL_CONN`/`ETL_SQL_CONN` thiếu → fallback gõ nhầm tên DB (`GiondDB` ≠ `GiongDB`) → mọi báo cáo chặn ở ETL.
- **MISA**: phiếu tạo qua `save_full` **VÔ HÌNH** với danh sách (phải dùng luồng IMPORT EXCEL); "Số HĐ BKCT trùng/miss" thường là lệch TỔNG TIỀN chứ không phải trùng số.
- **Tunnel đổi URL sau khi restart api_server** → production mất kết nối agent; chạy `scripts/update-tunnel-env.py` + cập nhật env Vercel.

## Khi cần tra code liên quan
Dùng skill `tra-cuu-code-do-thi` (hỏi đồ thị trước khi grep): ví dụ `codegraph explore "vì sao job báo cáo không tự chạy lại khi nguồn xong"`.
