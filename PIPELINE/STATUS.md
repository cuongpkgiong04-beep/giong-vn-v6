# 📊 STATUS — Trạng thái đội PIPELINE

> **Đại ca chỉ cần nhìn file này để theo dõi.** Mỗi agent khi xong phần mình
> PHẢI cập nhật dòng task tương ứng. Task mới nhất lên đầu.

Cập nhật lúc: 02/10/2026 — GĐ 290 (Trợ lý Freebuff — dựng hệ)

| Task | Tóm tắt | Brief | Planner | Coder | Tester | Reviewer | Kết luận cuối |
|---|---|---|---|---|---|---|---|
| *(chưa có task — chờ Đại ca giao việc đầu tiên qua Planner)* | | | | | | | |

## Chú giải giai đoạn

| Ký hiệu | Nghĩa | Ai ghi |
|---|---|---|
| ⬜ | Chưa tới lượt | — |
| 🔄 | Đang làm | Agent nhận việc (lúc nhận) |
| ✅ | Xong | Agent nhận việc (lúc xong) |
| 🔁 | Trả về làm lại (FAIL/CHANGES_REQUESTED) | Tester / Reviewer |
| 🚧 | Blocked — chờ Đại ca quyết | Bất kỳ ai gặp blocker |

## Kết luận cuối (chỉ Đại ca hoặc agent trực ghi khi Push)

| Ký hiệu | Nghĩa |
|---|---|
| 🟢 | Reviewer APPROVE — chờ Đại ca nói "Push" |
| 🔵 | Đã merge + push (ghi version + hash) |
| 🔴 | Hủy task |

## Quy tắc ghi

1. Agent ghi DÒNG task của mình — KHÔNG sửa dòng task khác.
2. Khi 🔁 trả về: ghi ngắn lý do vào cột của mình (chi tiết nằm trong file
   test-report.md / review.md của task).
3. Blocked phải ghi ngay — Đại ca nhìn thấy sẽ xử lý.
