# [REVIEW] [TASK-XXX]

> **Reviewer:** (tên agent) · **Ngày:** …/…/2026
> **Diff soi:** `git diff main...pipeline-work` — N file, +A/−B dòng
> **Kết luận:** ✅ **APPROVE** / 🔁 **CHANGES_REQUESTED**

---

## 1. Checklist 10 điểm soi (ROLES/REVIEWER.md)

| # | Mục | ✅/⚠️/❌ | Bằng chứng / ghi chú |
|---|---|---|---|
| 1 | Đúng phạm vi (plan mục 3) | | |
| 2 | Surgical — không sửa thừa | | |
| 3 | Plan khớp code | | |
| 4 | Test đáng tin (có bằng chứng) | | |
| 5 | Registry & quy tắc commit | | |
| 6 | Bảo mật (secret/lockfile/file tạm) | | |
| 7 | Lesson learned | | |
| 8 | Hệ thống liên quan (schema/phân quyền) | | |
| 9 | Desktop + Mobile song song | | |
| 10 | Rủi ro production (module khác) | | |

## 2. Chi tiết vấn đề (nếu CHANGES_REQUESTED)

> MỖI vấn đề một mục — trỏ đúng file:dòng + hiện tượng + mong muốn.
> Reviewer KHÔNG tự sửa — trả về Coder xử lý.

| # | File:dòng | Vấn đề | Mong muốn |
|---|---|---|---|
| 1 | | | |

## 3. Nhận xét đáng khen / kỹ thuật hay (nếu có)

*(Điểm làm tốt — ghi để tạo văn hóa học hỏi giữa các agent.)*

## 4. Đề xuất tổng thể

- **APPROVE:** đề xuất Đại ca nói "Push". Lúc đó: merge `pipeline-work` → `main`
  + bump version CẢ HAI app + rà trùng lặp đa Agent (nguyên tắc GĐ 229) —
  do Coder/agent trực thực hiện, không phải Reviewer.
- **CHANGES_REQUESTED:** quay lại Coder (lượt thứ N). Sau khi Coder sửa xong,
  lại qua Tester → Reviewer soi vòng mới.

## 5. Ghi chú cho Đại ca

*(Câu hỏi / điều cần anh quyết — nếu có.)*

---
*Reviewer CHỈ ĐỌC — hành vi sửa code/commit/push là vi phạm nghiêm trọng vai trò.*
