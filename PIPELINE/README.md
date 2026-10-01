# 🏭 PIPELINE — Hệ điều hành đội 4 AI Agent (Planner → Coder → Tester → Reviewer)

> **Tạo (GĐ 290, 02/10/2026)** theo chỉ đạo Đại ca. Đây là **bộ nhớ chung của cả đội** —
> AI nào làm xong cập nhật kết quả vào đây để AI khác đọc và hiểu ngữ cảnh, không lạc thông tin.
>
> **Nguyên tắc cốt lõi:** thông tin truyền giữa 4 agent QUA FILE trong folder này,
> không qua trí nhớ phiên chat. Mỗi agent mở phiên mới chỉ cần đọc đúng file là
> đủ ngữ cảnh làm việc — kể cả agent đó chưa từng thấy task này.

---

## 1. Đội hình 4 vai

| Vai | Nhiệm vụ | Đầu ra | Quyền hạn |
|---|---|---|---|
| 🧭 **Planner** | Nhận việc trực tiếp từ Đại ca → nghiên cứu code hiện trạng → viết **bản mô tả kỹ thuật chi tiết** (từ cấu trúc file đến lỗi tiềm ẩn) | `plan.md` | KHÔNG viết code sản phẩm |
| 👨‍💻 **Coder** | Viết code theo đúng plan.md trong worktree riêng | `code-report.md` | Claim số GĐ qua registry · KHÔNG tự push |
| 🧪 **Tester** | Kiểm tra code chạy ổn định theo tiêu chí trong plan | `test-report.md` | KHÔNG sửa code — FAIL thì ghi và trả về Coder |
| 🔍 **Reviewer** | Soi lại toàn bộ thay đổi | `review.md` | **CHỈ ĐỌC — TUYỆT ĐỐI KHÔNG sửa code** |

## 2. Luồng công việc

```
Đại ca giao việc (brief.md)
        │
        ▼
 [1] PLANNER ── viết plan.md ──────────► (đọc: brief, code hiện trạng)
        │         │
        │         └── chưa rõ? ──► HỎI ĐẠI CA (nguyên tắc GĐ 198) ──► cập nhật brief.md
        ▼
 [2] CODER ──── claim GĐ qua AGENT_REGISTRY.md → code trong worktree
        │         pipeline-work → typecheck → code-report.md
        ▼
 [3] TESTER ─── chạy kiểm tra theo tiêu chí plan → test-report.md
        │         │
        │         └── FAIL ──► quay lại [2] CODER (ghi bug vào test-report.md)
        ▼
 [4] REVIEWER ─ soi diff + đối chiếu plan↔code↔test → review.md
        │         │
        │         ├─ CHANGES_REQUESTED ──► quay lại [2] CODER
        │         └─ APPROVE ────────────► ĐỀ XUẤT Đại ca
        ▼
ĐẠI CA nói "Push" ──► Coder/agent trực merge pipeline-work → main
                      + bump version CẢ HAI app (quy tắc ĐA AGENT GĐ 229)
                      + rà trùng lặp → push
```

## 3. Cách Đại ca vận hành (chỉ theo dõi + nhận kết quả)

1. **Giao việc:** tạo folder `TASKS/TASK-<số>_<tên-ngắn>/` (copy template từ
   `templates/`), điền `brief.md` — hoặc chỉ nói việc với Planner và để Planner
   tự ghi brief (nhớ hỏi lại nếu chưa rõ).
2. **Kích hoạt từng agent:** mở phiên chat của agent đó, dán câu lệnh trong
   `STARTERS/<TÊN-VAI>.txt` (thay `TASK-001` bằng ID task thực tế).
3. **Theo dõi:** chỉ cần nhìn **`STATUS.md`** — mọi agent tự cập nhật dòng của mình.
4. **Kết quả cuối:** đọc `TASKS/TASK-xxx/review.md` — APPROVE → anh nói "Push".

## 4. Quy tắc vận hành chung (mọi agent bắt buộc)

- **Đọc trước khi làm:** `PIPELINE/README.md` + `ROLES/<vai của mình>.md` + toàn bộ
  file task ở giai đoạn trước mình. Không đọc đủ = không bắt đầu.
- **Ghi xong phải cập nhật STATUS.md** (dòng task của mình + cột giai đoạn).
- **Hệ thống hiện có vẫn áp dụng nguyên văn:**
  - Claim số GĐ qua `AGENT_REGISTRY.md` (chỉ CODER claim — trước khi code đầu tiên)
  - Checklist khởi động GĐ 285: pull + `git config user.email` đúng + đọc registry
  - **KHÔNG tự push** — Push chỉ khi Đại ca nói (GĐ 229) · version bump chỉ lúc đó
  - 3 quy tắc commit cứng GĐ 285 (cấm `git add .` · check `git diff --cached --stat` · message chuẩn)
- **Việc nhỏ vẫn đi đủ 4 bước** — nhưng Planner có thể viết plan ngắn gọn,
  Tester chỉ cần typecheck + dev server, Reviewer soi nhanh.
- **Mọi file ghi bằng tiếng Việt**, tên file không dấu, không khoảng trắng.

## 5. Cấu trúc thư mục

```
PIPELINE/
├── README.md          ← file này — cả đội đọc đầu tiên
├── STATUS.md          ← bảng trạng thái tổng (Đại ca chỉ nhìn file này)
├── ROLES/             ← 4 file mô tả vai + checklist từng agent
├── STARTERS/          ← 4 câu lệnh copy-paste để kích hoạt từng agent
├── templates/         ← 5 mẫu file chuẩn cho từng giai đoạn
└── TASKS/
    └── TASK-001_<tên>/
        ├── brief.md        # ① Đại ca → Planner
        ├── plan.md         # ② Planner → Coder
        ├── code-report.md  # ③ Coder → Tester
        ├── test-report.md  # ④ Tester → Reviewer
        ├── review.md       # ⑤ Reviewer → Đại ca
        └── status.json     # khóa giai đoạn hiện tại (ai đang giữ việc)
```

## 6. Worktree của đội PIPELINE

| Thành phần | Giá trị |
|---|---|
| Worktree code | `D:/DuLieuChung/CUONG_2026/giong-vn-v6-pipeline` |
| Nhánh làm việc | `pipeline-work` |
| Repo con (giong-apps) | clone nội bộ trong worktree khi cần — nhánh riêng tương ứng |
| Folder PIPELINE | nằm ở **main** (commit chung) — worktree `merge main` để nhận bản mới |

**Vì sao nhánh riêng:** việc dở của đội không nằm cạnh nhánh `main` mà Đại ca
và agent khác đang dùng. Reviewer APPROVE → merge về `main` là cổng chất lượng.

---
*Tạo bởi Trợ lý Freebuff (GĐ 290) — điều chỉnh sau cần ghi vào AGENTS.md.*
