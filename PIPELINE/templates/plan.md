# [PLAN] [TASK-XXX] — Bản mô tả kỹ thuật chi tiết

> **Người viết:** Planner (tên agent) · **Ngày:** …/…/2026
> **Trạng thái code nghiên cứu:** đã đọc các file liệt kê ở mục 1

---

## 1. Hiện trạng code liên quan

*(Mô tả cho người CHƯA từng thấy code: đường dẫn đầy đủ + cấu trúc + data flow.)*

| File/vị trí | Vai trò hiện tại | Điểm sẽ đụng tới |
|---|---|---|
| | | |

## 2. Giải pháp đề xuất (tóm tắt)

*(2-5 câu: làm gì, theo cách nào, vì sao chọn — có nhiều phương án thì ghi kết
quả vòng hỏi Đại ca đã chọn ở brief.md.)*

## 3. Danh sách file sẽ sửa/tạo (phạm vi CỨNG của Coder)

| # | File | Hành động (sửa/tạo/xóa) | Nội dung thay đổi chính |
|---|---|---|---|
| 1 | | | |

> Coder KHÔNG được đụng file ngoài bảng này. Thấy cần đụng thêm → DỪNG, ghi blocker.

## 4. Các lỗi tiềm ẩn phải phòng tránh

*(Kinh nghiệm từ AGENTS.md + phân tích — Coder/Tester/Reviewer đọc kỹ mục này.)*

| # | Rủi ro | Cách phòng trong implementation |
|---|---|---|
| 1 | | |

*(Gợi ý rà: stale closure React · template SQL `${}` là tham số GĐ 96/248 ·
Placeholder động GĐ 248 · hai đầu không khớp GĐ 96/109/204 · egress select *
GĐ 159 · desktop+mobile song song GĐ 56 · Radix modal chặn pointer GĐ 80/93 ·
migration GiondDB phải chạy tay sau GĐ 164...)*

## 5. Bước làm chi tiết (thứ tự thực hiện)

1.
2.
3.

## 6. Tiêu chí kiểm chứng (Tester + Reviewer dùng đúng mục này)

| # | Tiêu chí | Cách kiểm | Kết quả mong đợi |
|---|---|---|---|
| 1 | Typecheck sạch | `node scripts/typecheck.mjs` / `npx tsc --noEmit` | 0 lỗi |
| 2 | | | |

## 7. Việc sẽ mở theo (nếu có)

*(Các việc kế tiếp phát hiện trong lúc nghiên cứu — KHÔNG nhét vào task này.)*

---
*Planner ký tên + ngày. Plan bị Coder/Tester/Reviewer phản đối hợp lý → Planner
sửa plan trước khi Coder code.*
