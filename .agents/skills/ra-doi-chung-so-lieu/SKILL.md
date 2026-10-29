---
name: ra-doi-chung-so-lieu
description: "Dùng khi cần KIỂM CHỨNG số liệu khớp nguồn trước khi báo cáo/kết luận: số trên báo cáo ↔ dữ liệu DB ↔ file gốc tải về (hoặc phiếu trên MISA). Dùng khi Đại Ca hỏi 'số này có đúng không', 'kiểm tra lại giúp anh', hoặc trước khi ghi claim 'đã khớp'."
---

# Rà đối chứng số liệu — nguyên tắc "tổng từng đồng"

## Nguyên tắc vàng
- **Không bao giờ kết luận "khớp" bằng cảm giác** — phải đưa ra 2 con số cụ thể và hiệu = 0 (hoặc nêu rõ chênh bao nhiêu, ở đâu).
- Đi **theo chuỗi 3 nguồn**, ghi lại số của TỪNG chặng:
  `file gốc tải về` → `DB (GiondDB)` → `báo cáo hiển thị / phiếu trên MISA`
- Chênh thì **giải thích nguyên nhân bằng bằng chứng** (không phải bằng suy đoán): lọc kỳ · lượt trả sau kỳ · làm tròn · phiếu trùng mã · bỏ qua do đã tồn tại…

## Cách làm cụ thể
1. **Chốt kỳ + định nghĩa cột** trước khi so (kỳ theo NGÀY ĐĂNG KÝ hay theo ngày lập? theo `tx_date` hay `report_date`?).
   - SMED/VCB: theo ngày · TCB/MIA: theo kỳ · bccn: lọc theo **Ngày đăng ký** (f2 không lọc).
2. **Lấy tổng từ file gốc** (Excel/CSV) bằng script — đừng cộng tay, đừng đọc cả file vào context (quy tắc Think in Code).
3. **Lấy tổng từ DB** bằng SQL đúng kỳ, `COUNT(*)` + `SUM(...)`; tránh `SELECT *` trên bảng có cột payload lớn.
4. **So từng đồng**; nếu lệch → khoanh vùng theo khóa (trung tâm · ngày · mã khách · mã hàng) rồi mới kết luận.
5. **Ghi bằng chứng vào entry**: 2 con số + câu SQL/lệnh đã chạy + kết luận. Ví dụ mẫu đã dùng trong dự án:
   `995.114.300 = 871.819.300 + 123.295.000 (khớp từng đồng)`.

## Bẫy số liệu đã gặp thật
- **Ngày lập phiếu ≠ ngày hóa đơn** → lọc sai kỳ (MISA: kỳ theo ngày LẬP).
- **RefNo MISA = mã phiếu SMED** (không phải số hóa đơn) — đừng so nhầm cột.
- **Phiếu trùng mã 2 trung tâm** → MISA gộp 1 phiếu (tổng vẫn đúng, số dòng lệch).
- **Làm tròn**: chênh ≤ vài đồng/ngày là do làm tròn — ghi rõ mức lệch, đừng bỏ qua im lặng.
- **Cột "Đơn giá" KHÔNG cộng vào Subtotal** (quy tắc định dạng 4 nguyên tắc toàn app).
- **Phiếu tạo qua `save_full` vô hình với danh sách MISA** → "MISA trống" không có nghĩa là chưa tạo; kiểm bằng `detail_full` theo refid.
- **ai_search trễ** → tưởng chưa tồn tại mà thực ra đã có (double-import).

## Khi số sai mà không rõ nguyên nhân
1. Tra code liên quan bằng skill `tra-cuu-code-do-thi` (đồ thị code) — tìm đúng builder/hàm tính.
2. Nếu là job: theo skill `dieu-tra-job-loi` (job → file → ETL → báo cáo).
3. Không tự "sửa số" trên báo cáo — sửa ở nguồn (builder/ETL), rồi chạy lại và đối chứng lại.
