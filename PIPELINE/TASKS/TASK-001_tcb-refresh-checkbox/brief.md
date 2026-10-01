# [TASK-001] — Báo cáo TCB thiếu hộp "Tải dữ liệu mới nhất trước khi chạy"

> **Nguồn:** Đại ca giao trực tiếp ngày 02/10/2026
> **Phạm vi:** repo con giong-apps (app con Bán hàng)

---

## Yêu cầu gốc của Đại ca

> "Trong app con phần: BC_Sao kê TCB cả báo cáo chi tiết và tổng hợp đều không có
> hộp thể hiện: 'Tải dữ liệu mới nhất trước khi chạy'. Em bổ sung cho giống như
> các báo cáo khác cho anh. Sau nay thống nhất làm báo cáo là phải đồng nhất cái
> hộp thoại này. Phải có hộp này thì mới biết dữ liệu đã được download về chưa
> và đang ở folder nào."

---

## Bối cảnh / kỳ vọng kết quả

- Vấn đề hiện tại: trang `/m/bc-bank-tcb` + `/m/bc-bank-tcb-th` KHÔNG hiện hộp
  "Tải dữ liệu mới nhất trước khi chạy" + danh sách nguồn kèm mốc "nạp lúc HH:MM"
  — trong khi VCB và các báo cáo khác đều có.
- Kết quả mong muốn: 2 trang TCB có ĐẦY ĐỦ hộp + dòng nguồn hiển thị đã tải
  chưa + folder nào — giống hệt VCB.
- Ràng buộc: "sau nay thống nhất" → xem mục 7 plan.md (việc mở theo).

---

## Kết luận phân tích nhanh của Planner (demo đầu tiên — không cần vòng hỏi)

Yêu cầu RÕ (giống VCB + đồng nhất) → Planner không cần hỏi thêm. Mặc định
checkbox TẮT giữ nguyên như mọi báo cáo khác (GĐ C.85c — anh từng chốt).

---

## Ưu tiên & hạn chế

- Độ ưu tiên: Trung bình (báo cáo dùng được nhưng thiếu thông tin nguồn)
- Phân hệ KHÔNG được đụng: tầng agent (sql_reports.py đã có sẵn nguồn TCB),
  trang download /m/bank-tcb, phân quyền.
