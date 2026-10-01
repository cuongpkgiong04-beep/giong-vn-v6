📚 CÁCH DÙNG STARTERS — câu lệnh "truyền tay" giữa các Agent
============================================================

MỖI AGENT MỘT TÀI KHOẢN FREEBUFF (GLM 5.3 Flash) — đã được dán sẵn
vai trò tương ứng (ROLES/<vai>.md) vào đầu phiên lần đầu tiên.

QUY TRÌNH "TRUYỀN TAY" (Đại ca chỉ dán 1 câu mỗi lượt):

1. Mở phiên PLANNER → dán STARTERS/PLANNER.txt (đổi TASK-001 thành ID task)
   → Planner tự đọc brief, nghiên cứu, viết plan.md
2. Mở phiên CODER   → dán STARTERS/CODER.txt
   → Coder tự đọc plan.md, claim GĐ, code, ghi code-report.md
3. Mở phiên TESTER  → dán STARTERS/TESTER.txt
   → Tester tự đọc tiêu chí, chạy test, ghi test-report.md
4. Mở phiên REVIEWER → dán STARTERS/REVIEWER.txt
   → Reviewer soi diff, viết review.md (APPROVE / CHANGES_REQUESTED)
5. APPROVE → Đại ca nói "Push" → merge + bump version + push (nguyên tắc GĐ 229)

LƯU Ý QUAN TRỌNG:
- Đổi "TASK-001" trong câu lệnh thành ID task thực tế (TASK-002, TASK-003...)
- Nếu agent đó làm phiên đầu tiên: dán thêm 1 dòng:
  "Đọc PIPELINE/README.md trước để hiểu vai của mình trong hệ thống."
- Lần làm lại (sau 🔁): dán lại STARTER của vai cần sửa + thêm dòng:
  "Đây là lượt sửa lần N — đọc test-report.md/review.md để biết lỗi cần sửa."

CÁCH ĐẶT TÊN TASK: TASK-<số tăng dần>_<tên-ngắn-không-dấu>
VD: TASK-001_fix-tpb-saoke · TASK-002_trung-tam-sua-phu-trach
Folder tạo trong PIPELINE/TASKS/ — copy 5 template từ PIPELINE/templates/
