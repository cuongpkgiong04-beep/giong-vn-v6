# 🗂️ AGENT REGISTRY — Khóa số Giai đoạn Multi-Agent

> **Tạo (GĐ 285, 01/10/2026):** Chống trùng số Giai đoạn (GĐ app tổng / C.x repo con)
> khi 4-5 AI Agent cùng đọc + sửa dự án. File này là **NGUỒN SỰ THẬT DUY NHẤT**
> về việc số nào đang được ai giữ — nguyên nhân gốc của 3 lần trùng số (GĐ 234/237/247)
> là số được "cấp" lúc GHI XONG chứ không bị KHÓA lúc BẮT ĐẦU LÀM.
>
> **Quản lý CẢ 2 dải số trong 1 bảng duy nhất:**
> - App tổng: `GĐ <số>` (hiện tới GĐ 284)
> - Repo con: `C.x` (tiền tố C — hiện tới C.136)
>
> **Đại ca chốt (01/10/2026):** PA-1 Registry lock · claim MỌI nhiệm vụ (kể cả việc
> nhỏ) · 1 file duy nhất đặt ở app tổng (repo con KHÔNG tạo file riêng — bài học
> GĐ 138: quy tắc phải nằm ở NƠI LÀM VIỆC, agent luôn mở app tổng trước).

---

## 📋 BẢNG KHÓA SỐ

> Quy ước trạng thái: 🔒 đang làm · ✅ xong (kèm commit hash) · ❌ hủy (kèm lý do)

| Số | Agent | Nhiệm vụ | Phạm vi file dự kiến | Trạng thái | Thời điểm claim | Hoàn tất |
|---|---|---|---|---|---|---|
| GĐ 285 | Trợ lý Freebuff | Ban hành quy trình Registry lock + 3 quy tắc commit cứng | AGENTS.md, AGENT_REGISTRY.md, start-session.md (app tổng + repo con docs) | 🔒 | 01/10 | — |

---

## 🤖 DANH SÁCH AGENT ĐĂNG KÝ

| Agent | Nhánh làm việc | Ghi chú |
|---|---|---|
| 🤖 **Trợ lý Freebuff** | `main` (app tổng) — Agent Desktop phân vai GĐ 233 | Tên ghi trong mọi commit message + entry AGENTS.md |
| 🤖 **Agent CLI** | `agent-cli` (worktree riêng) | GĐ C.x repo con |
| 🤖 *(Agent mới thêm vào đây)* | | |

---

## 📐 QUY TRÌNH CLAIM SỐ (bắt buộc — thay cho cách "grep số lớn nhất +1")

> Chạy TRƯỚC KHI LÀM, không phải sau khi xong. Việc dài 1-2 tiếng — claim xong
> agent khác thấy ngay là dừng, không đụng.

1. **Số mới = max + 1:** `git log --all --oneline -15` + đọc bảng dưới — thấy số
   lớn nhất CỦA MỌI agent (worktree dùng chung `.git` → commit local thấy ngay,
   không cần push). GĐ và C.x là 2 dải độc lập, không đếm chung.
2. **Thêm 1 dòng vào bảng** với trạng thái 🔒 + **Khai báo PHẠM VI FILE dự kiến**
   → agent khác thấy giao nhau là tránh hoặc liên hệ, không cướp.
3. **COMMIT NGAY file registry** — commit chỉ chứa registry (0 đụng code, KHÔNG
   vi phạm quy tắc "KHÔNG tự push" GĐ 229 — commit local được phép, push là
   quyền của Đại ca).
4. **Làm việc** → xong: ghi entry đầy đủ vào AGENTS.md + commit code → quay lại
   sửa dòng registry 🔒 → ✅ kèm hash commit → commit cuối (docs-only).
5. **Hủy nhiệm vụ:** sửa dòng thành ❌ + lý do — KHÔNG xóa dòng (giữ lịch sử).

### ⚡ Resolve conflict khi 2 agent claim cùng số (hiếm — xử lý 1 phút)

- Commit registry của ai VÀO TRƯỚC (thứ tự `git log`) thì giữ số đó.
- Agent sau: lấy max+1 lại, sửa dòng của mình, commit lại. KHÔNG tranh số.
- Khi pull thấy conflict ở file này: giữ CẢ 2 dòng, người có số nhỏ giữ nguyên.

---

## 🔒 3 QUY TẮC COMMIT CỨNG (chống tái diễn GĐ 257/264/274)

1. **CẤM `git add .` / `git add -A`** — chỉ add TƯỜNG MINH từng file của mình.
   Trước khi add: `git status --short` đối chiếu — file lạ KHÔNG nằm trong phạm
   vi khai báo ở bảng trên = của agent khác đang dở → KHÔNG add, KHÔNG đụng,
   KHÔNG checkout/revert nó (trừ khi chính mình tạo).
2. **Commit message chuẩn:** `feat|fix|docs(<scope>): GĐ <số> (<tên Agent>) — mô tả`
   (repo con: `C.x (<tên Agent>)`). Truy vết được ai làm gì bằng `git log`.
3. **Checklist khởi động phiên (mọi agent, mọi phiên):**
   - `git pull origin main` CẢ 2 repo (nguyên tắc 1 GĐ 242 — pull trước mỗi phiên)
   - `git config user.email` phải là `cuongpk.giong04@gmail.com` — sai = sửa ngay
     (bài học GĐ 264: email sai chính tả → Vercel BLOCKED deployment)
   - Đọc mục GĐ mới nhất AGENTS.md + bảng registry trên → biết agent khác vừa
     làm gì, tránh đụng cùng module
   - Claim số theo quy trình 5 bước ở trên TRƯỚC khi viết code đầu tiên

---

## 📜 LỊCH SỬ SỰ CỐ ĐA AGENT (tham chiếu — lý do file này tồn tại)

| GĐ | Sự cố | Chân rễ | Đã xử lý |
|---|---|---|---|
| 234 | Agent CLI dùng số 233 trước → phải nhảy 234 | Grep-max race | Bị động |
| 237 | Trùng GĐ 236 với session khác cùng ngày | Grep-max race | Bị động |
| 247 | Trùng GĐ 246 với commit `b32b489` → phải amend | Grep-max race | Amend |
| 257 | Agent Desktop commit gom cả phần CLI đang dở | Không phân vùng file khi commit | Bị động |
| 264 | Author email `@gmal.com` từ worktree CLI → Vercel BLOCKED | Worktree mới thiếu config email | Commit docs mới |
| 267 | Agent chạy tay PID lạc loài poll song song service | Không đăng ký phiên | Kill tay |
| 274 | Push gặp 2 file của agent khác đang dở | Quét phạm vi trước add | Checkout -- |

**Chốt của Đại ca (GĐ 285):** từ GĐ này mọi nhiệm vụ claim trước bằng registry —
hết trạng thái "phát hiện trùng rồi mới xử lý".
