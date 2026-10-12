# GIONG VIETNAM — Project Context

> **File này là "bộ nhớ" của project.** Mỗi session mới, AI đọc file này để hiểu bối cảnh, trạng thái, và tiếp tục công việc đúng chỗ.

---

## 1. Tổng quan dự án

- **Tên:** GIONG VIETNAM (GIONG VN)
- **Loại:** Hệ thống điều hành chuỗi trung tâm tiêm chủng — web app cho quản lý nội bộ
- **Quản trị:** Đại ca Cường (Phạm Kiên Cường) — `cuongpk.giong04@gmail.com`, SĐT: 0904 07 57 57
- **Trợ lý:** "Trợ lý lập trình" (AI) — giao tiếp bằng Tiếng Việt, xưng "em/anh"
- **Ngôn ngữ suy nghĩ & trả lời:** Sử dụng tiếng Việt Nam để suy nghĩ và trả lời khi tương tác với Anh. KHÔNG dùng tiếng Anh trong phần suy nghĩ hay phản hồi.

---

## 2. Tech Stack

| Thành phần | Công nghệ |
|---|---|
| Frontend | React 19, TanStack Start/Router/Query/Table, Tailwind v4, Radix UI |
| State | Zustand + localStorage (offline fallback) |
| Auth | Better Auth (role-based: SuperAdmin, Admin, Staff...) |
| Database | Neon PostgreSQL (free tier) |
| Validation | Zod, React Hook Form |
| Charts | Recharts |
| Deploy | Vercel (auto-deploy từ GitHub) |
| Build | Vite 8, TypeScript 5.7 |
| Dev server | `npm run dev` → Vite dev server |

---

## 3. Trạng thái hiện tại

### ✅ Đã hoàn thành
- Scaffold TanStack Start (router, root, index, styles)
- Auth system (Better Auth + Neon) — đăng ký, đăng nhập, phân quyền
- Dashboard chính (KPI cards, charts, shortcuts)
- Chấm công (attendance check-in/check-out, Cloudinary upload ảnh)
- **Check-in nâng cấp** (GPS bắt buộc + photo bắt buộc + center selector + detail dialog + tombstone sync + báo cáo bản đồ)
- Quản lý nhiệm vụ (tasks CRUD)
- Nhân sự (employee management — table/grid views, 33 employees fallback)
- Trung tâm (center management — 20 centers fallback)
- Đề nghị (proposals — approval workflow)
- Chat nội bộ (chat messages)
- Ghi chú (notes)
- Hồ sơ tài liệu (document management)
- Hướng dẫn sử dụng (user guides)
- Báo cáo (bao-cao) + Báo cáo Check-in (bảng + bản đồ satellite/street)
- Đổi mật khẩu / Quên mật khẩu
- Admin pages (approvals, permissions)
- Database migrations (14 files: 0001-0014)
- Deploy lên GitHub + Vercel + Neon

### ❌ Đã xóa (theo yêu cầu Đại ca)
- Kho vắc xin (vaccine inventory) — xóa ngày 2026-08-28
- Quỹ tiền (cash fund) — xóa ngày 2026-08-28
- Tín dụng (credit module) — xóa ngày 2026-08-28

### 🔄 Đang triển khai / Cần theo dõi
- **Bản đồ report Check-in** — Tile layer đường phố (OSM) CHƯA hiển thị trên báo cáo. Leaflet marker + controls hoạt động, nhưng tile images không load. Cần tiếp tục debug.
- **Check-in sync từ điện thoại** — Đã fix `_neonInsertAttendance` swallowed error. Cần test lại trên điện thoại.

### 📋 Việc cần làm (backlog)
- **[ƯU TIÊN]** Tinh chỉnh Module Nghiệp vụ (Đề nghị)
- **[ƯU TIÊN]** Fix bản đồ báo cáo Check-in — tile layer OSM không load
- Test lại flow check-in/chấm công trên điện thoại sau khi fix sync
- Xác nhận admin thấy data check-in của user khác trên desktop

### ✅ Hoàn thành mới (2026-09-07)
- Fix camera switch check-in — chuyển capturePhoto/retakePhoto sang plain function, thêm guard race condition, delay camera release
- Stamp layout redesign — 3 cụm (Giờ+Ngày / Địa chỉ / Tên+Công ty), wrap địa chỉ đầy đủ, groupGap 18px
- Xóa postal code (VD: 11110) khỏi tất cả hiển thị địa chỉ — cleanAddress trong reverseGeocode + display-time
- Fix trang Check-in crash — thiếu import Textarea component
- Fix bản đồ Check-in report — xóa duplicate code trong useEffect (L is not defined)

---

## 4. Workflow làm việc

```
1. Đại ca yêu cầu → Em phân tích, hỏi lại nếu chưa rõ
2. Em sửa code (surgical — chỉ đúng chỗ cần sửa)
3. Em COMMIT + ghi lịch sử AGENTS.md — KHÔNG tự push (xem Nguyên tắc Push ĐA AGENT bên dưới)
4. Khi Đại ca nói "Push" → rà trùng lặp giữa các Agent + bump version CẢ HAI app → mới push
5. Vercel tự động deploy
6. Đại ca kiểm tra trên Vercel (không cần local)
```

### 🔁 QUY TRÌNH XỬ LÝ NHIỆM VỤ (hiệu lực từ 2026-09-22 — áp dụng cho MỌI nhiệm vụ):

> Khi Đại ca yêu cầu một nhiệm vụ gì, em PHẢI làm theo đúng 5 bước sau:
>
> **Bước 1 — Phân tích suy nghĩ bằng TIẾNG VIỆT NAM:** Phân tích yêu cầu, đối chiếu với
> code hiện tại và quy tắc trong AGENTS.md, tìm ra giải pháp — toàn bộ suy nghĩ bằng tiếng Việt.
>
> **Bước 2 — Hỏi lại xác nhận Ý TƯỞNG:** Sau khi phân tích xong, trình bày ngắn gọn giải pháp
> và HỎI Đại ca xem đúng ý tưởng của anh chưa. CHƯA xác nhận → KHÔNG đụng code.
>
> **Bước 3 — Đưa ít nhất 3 TIÊU CHÍ lựa chọn + DỰ ĐOÁN kết quả:** Trình tối thiểu 3 phương án/
> tiêu chí để anh lựa chọn tốt nhất, kèm dự đoán trước kết quả của từng lựa chọn (làm gì được,
> rủi ro gì, ảnh hưởng chỗ nào). Anh quyết — em KHÔNG tự chọn thay.
>
> **Bước 4 — Anh ĐỒNG Ý mới viết code:** Chỉ bắt tay viết code sau khi anh đã chọn phương án.
> Viết xong nếu cần thì chạy thử (typecheck/test/E2E) để verify trước khi báo xong.
>
> **Bước 5 — Tổng kết + hướng dẫn + gợi ý tiếp theo:** Tổng kết lại nhiệm vụ đã làm (đã sửa gì,
> verify thế nào), hướng dẫn anh cách chạy/test lần sau, và gợi ý các bước tiếp theo có thể làm.
>
> **Lưu ý:** Bước 2 + 3 có thể gộp thành MỘT vòng hỏi-đáp khi giải pháp đơn giản (trình giải pháp
> + 3 tiêu chí + dự đoán cùng lúc). Bước 4 + 5 không bỏ qua — kể cả việc nhỏ cũng phải tổng kết.

### Quy tắc code (tuân thủ CLAUDE.md):
- **KHÔNG** tự ý sáng tạo, refactor, thêm tính năng
- **CHỈ** làm đúng yêu cầu được giao
- **HỎI** trước khi hành động nếu chưa chắc
- **Surgical** — sửa đúng dòng cần sửa, không đụng dòng khác
- **Minimal Change Policy** — tối thiểu thay đổi cần thiết
- **KHÔNG tự động Push** (hiệu lực 2026-09-26 — thay luật "hỏi 3 lựa chọn" cũ) — Sửa code xong chỉ COMMIT + ghi AGENTS.md; chỉ push khi Đại ca nói "Push" (xem Nguyên tắc Push ĐA AGENT bên dưới).
- **Desktop + Mobile song song** (hiệu lực từ 2026-09-09) — Mọi sửa code từ giờ áp dụng đồng thời cho cả Desktop và Mobile, trừ khi Đại ca yêu cầu cụ thể khác.
- **Chỉ sửa phần được chỉ định** (hiệu lực từ 2026-09-10) — Khi Đại ca yêu cầu sửa một phần cụ thể (một module/trang/hàm), CHỈ được sửa đúng phần đó, KHÔNG sửa lan sang phần khác (file/module/khác) dù thấy chỗ nào "nên sửa kèm". Cần đụng phần khác → DỪNG và hỏi Đại ca trước.
- **Không tự đoán ý định** (hiệu lực từ 2026-09-12) — Chưa chắc chắn về yêu cầu (phạm vi, cách làm, kết quả mong muốn) thì PHẢI HỎI LẠI Đại ca, KHÔNG tự suy đoán ý định rồi hành động. Hỏi trúng đích hơn là làm sai phải sửa lại.

### Quy tắc CLAUDE.md (bắt buộc tuân thủ):

> Trong repository này có file CLAUDE.md ở gốc. Khi hỗ trợ chỉnh sửa code cho dự án này, hãy tuân theo mọi nguyên tắc trong CLAUDE.md: trước khi thay đổi, hiện các giả định; hỏi nếu không rõ; chỉ thực hiện thay đổi "surgical" chạm đúng chỗ; và luôn cung cấp tiêu chí kiểm chứng. Bắt đầu bằng cách tóm tắt các điểm chính của CLAUDE.md và hỏi nếu cần làm rõ. Bạn có quyền đọc file CLAUDE.md trong workspace.

> Hãy đọc file CLAUDE.md ở gốc repo. Mọi sửa đổi cần: 1) trước khi thay đổi liệt kê giả định; 2) hỏi nếu có chỗ không rõ; 3) chỉ thay đổi những dòng cần sửa; 4) cung cấp test/kiểm tra nếu có thể. Bắt đầu bằng tóm tắt 3 quy tắc quan trọng nhất.

> Hãy đọc file AGENTS.md ở gốc repo và tuân thủ nguyên tắc đó.

> Sử dụng tiếng Việt Nam để tương tác với anh.

### Quy tắc làm việc mới (2026-08-30):

- Anh đã Deploy lên GitHub và kết nối với Vercel + dùng database của Neon
- ~~**Khi sửa code xong PHẢI push lên GitHub**~~ — ⚠️ ĐÃ HẾT HIỆU LỰC từ 2026-09-26 (luật ĐA AGENT: sửa xong chỉ commit + ghi AGENTS.md, KHÔNG push — xem Nguyên tắc Push ĐA AGENT bên dưới)
- **Cần hỏi gì PHẢI hỏi trước khi hành động**
- Em có quyền commit + push trực tiếp lên repository (auto commit + push)
- **KHÔNG** có CI / checks nào bắt buộc (lint, tests) chạy trước khi merge
- **KHÔNG** cần chạy local build/test trước khi push — commit + push, Vercel tự deploy
- **KHÔNG** có khu vực code nào "cấm động" — em có quyền sửa bất kỳ file nào
- Khi cần test: ưu tiên test tự động (unit) viết trong `*.test.ts` hoặc `*.test.mjs`

### Nguyên tắc Push (bắt buộc tuân thủ — hiệu lực 2026-09-07, cập nhật 2026-09-14 áp dụng cho CẢ HAI repo):

> ⛔⛔⛔ **PHẦN DƯỚI ĐÃ HẾT HIỆU LỰC TỪ 2026-09-26 — THAY BẰNG "NGUYÊN TẮC PUSH ĐA AGENT" (mục kế tiếp). GIỮ LẠI ĐỂ ĐỐI CHIẾU LỊCH SỬ — AI ĐỪNG LÀM THEO PHẦN NÀY.** ⛔⛔⛔
>
> **SAU KHI SỬA CODE XONG (app tổng và/hoặc app con), EM PHẢI HỎI ĐẠI CA 1 TRONG 3 LỰA CHỌN TRƯỚC KHI COMMIT/PUSH:**
>
> 1️⃣ **Commit cả hai repo + Ghi lịch sử công việc + Tăng Version**
> → Commit tại máy + cập nhật AGENTS.md (cả repo nào có thay đổi) + tăng version — **CHƯA push**, để anh kiểm tra trước.
>
> 2️⃣ **Push lên GitHub từng dự án**
> → Chỉ commit + push, KHÔNG cập nhật AGENTS.md hay tăng version.
>
> 3️⃣ **Cả hai điều trên**
> → Commit + push + cập nhật AGENTS.md + tăng version (đầy đủ).
>
> **Em KHÔNG tự ý commit/push mà KHÔNG hỏi.**
> **Em KHÔNG tự ý tăng version mà KHÔNG được Đại ca đồng ý.**
> **MỘT lần hỏi áp dụng cho CẢ HAI repo** (app tổng `giong-vn-v6` + app con `giong-apps`) — trừ khi Đại ca dặn riêng repo nào xử lý khác.
> **Nơi tăng version:** app tổng = `package.json` + `DEFAULT_VERSION` (app-shell.tsx); app con = `apps/<tên>/package.json`.

- **GitHub repo:** `https://github.com/cuongpkgiong04-beep/giong-vn-v6`
- **Commit message** phải rõ ràng, mô tả chính xác thay đổi (feat/fix/refactor + mô tả).
- **Nếu push fail** (credential, network) → thông báo Đại ca ngay để xử lý.
- **Vercel auto-deploy** sau mỗi push — Đại ca chỉ cần kiểm tra trên URL.

### 🤖 Nguyên tắc Push ĐA AGENT (bắt buộc tuân thủ — hiệu lực 2026-09-26, THAY LUẬT CŨ — áp dụng cho CẢ HAI repo):

> **BỐI CẢNH (Đại ca ban hành 2026-09-26):** Anh làm việc trên **NHIỀU session với NHIỀU AI Agent khác nhau** cùng xử lý 1 dự án. Đội AI Agent PHẢI tuân theo 3 nguyên tắc sau:
>
> 1️⃣ **KHÔNG tự động Push lên GitHub** — Sửa code xong chỉ **COMMIT + ghi lịch sử AGENTS.md** để mọi việc được lưu lại. Push là quyền của Đại ca — chỉ thực hiện khi anh NÓI "Push".
>
> 2️⃣ **Khi Đại ca nói "Push"** → XEM LẠI LỊCH SỬ VERSION để tạo **SỐ VERSION MỚI cho CẢ app tổng lẫn app con** (version bump chỉ làm lúc này — KHÔNG bump lúc commit).
>
> 3️⃣ **Trước khi Push phải KIỂM TRA** công việc của các AI Agent có **TRÙNG LẶP / SỬA ĐÈ** của nhau không → **CẢNH BÁO Đại ca ngay nếu có** (liệt kê file/Giai đoạn trùng) trước khi thực hiện push.
>
> **Quy trình chuẩn mỗi nhiệm vụ từ 2026-09-26:** sửa code → verify (typecheck/test) → commit → ghi AGENTS.md → BÁO xong và DỪNG (không push, không bump version).
>
> **MỘT lần kiểm tra áp dụng cho CẢ HAI repo** (app tổng `giong-vn-v6` + app con `giong-apps`) — trừ khi Đại ca dặn riêng repo nào xử lý khác.
> **Nơi tăng version (CHỈ lúc Đại ca nói "Push"):** app tổng = `package.json` + `DEFAULT_VERSION` (app-shell.tsx); app con = `apps/<tên>/package.json`.
>
> **Cách rà trùng lặp trước push (nguyên tắc 3):**
> - `git status` + `git log --oneline -10` CẢ HAI repo — commit của Agent khác có đụng cùng file mình định push không.
> - `git diff HEAD` — working tree có file modified của session KHÁC (không phải của mình) → KHÔNG add, KHÔNG đụng, báo Đại ca.
> - Đối chiếu GĐ mới nhất trong AGENTS.md cả 2 repo — Agent khác vừa ghi GĐ trùng phạm vi → CẢNH BÁO.

### 🖥️⌨️ Worktree ĐA AGENT — Agent Desktop + Agent CLI làm việc SONG SONG không chờ nhau (hiệu lực 2026-09-27):

> **BỐI CẢNH:** Trước đây 2 Agent dùng chung 1 working tree → Agent A đang sửa file (modified) thì Agent B phải CHỜ commit xong mới đụng được file đó (vụ GĐ 230/232 — Agent chờ nhau mất nửa ngày). Nguyên nhân: 1 bàn làm việc chung. **Giải pháp (Đại ca chốt PA-1 + nhánh riêng + worktree cạnh repo):** mỗi Agent 1 working tree riêng qua `git worktree` — dùng chung `.git` (commit thấy nhau NGAY trên máy, không cần qua GitHub), làm việc ĐỘC LẬP hoàn toàn.
>
> **Phân vai (chốt 2026-09-27):**
> | Agent | App tổng | App con | Nhánh |
> |---|---|---|---|
> | **Agent Desktop** (Windows) | `giong-vn-v6` | `giong-vn-v6/giong-apps` | `main` |
> | **Agent CLI** (Terminal) | `giong-vn-v6-cli` | `giong-vn-v6/giong-apps-cli` | `agent-cli` |
> | *(Agent 3+ thêm vào đây + cập nhật AGENT_REGISTRY.md)* | | | |
>
> **Quy tắc làm việc song song:**
> 1. **Agent nào nhận việc → làm đúng working tree của mình** (đọc `git worktree list` biết ngay mình ở đâu + nhánh nào). KHÔNG đụng working tree của Agent kia.
> 2. **Commit độc lập** — không cần chờ nhau; commit thấy ngay qua `git log` dù khác worktree (dùng chung .git).
> 3. **2 Agent cùng sửa 1 file** vẫn có thể merge conflict khi gộp → phân vùng phạm vi (mỗi Agent nhận nhóm module khác nhau) và CẢNH BÁO khi nhận thấy phạm vi giao nhau.
> 4. **Khi Đại ca nói "Push":** Agent nhận lệnh MERGE nhánh `agent-cli` về `main` (cả 2 repo) + rà trùng lặp (nguyên tắc 3) + bump version + push 1 lần. Conflict khi merge → dừng, báo Đại ca.
> 5. **Untracked files (screenshots/, scripts test tạm, attachments/, .env)** KHÔNG tự động có trong worktree mới (git chỉ clone tracked files) — Agent CLI tự tạo tạm của mình, KHÔNG quay về worktree kia lấy.
> 6. **Worktree mới thiếu node_modules** → `npm install` 1 lần trước khi chạy dev/build (worktree app tổng + worktree repo con đều vậy).

### 🎫 CẤP SỐ GIAI ĐOẠN ĐA AGENT — REGISTRY LOCK (bắt buộc — hiệu lực GĐ 285, 2026-10-01):

> **Vấn đề:** 3 lần trùng số GĐ (234/237/247) vì số được "cấp" lúc GHI XONG
> chứ không bị KHÓA lúc BẮT ĐẦU LÀM — việc dài 1-2 tiếng, giữa chừng agent
> khác vào grep → cùng chọn 1 số. Kèm 1 lần cướp commit (GĐ 257), author email
> sai (GĐ 264), add nhầm file agent khác (GĐ 274).
>
> **Nguồn sự thật duy nhất: file `AGENT_REGISTRY.md` (app tổng — Đại ca chốt
> 1 file duy nhất, quản lý CẢ dải GĐ app tổng LẪN dải C.x repo con).**
>
> **Quy trình claim (TRƯỚC KHI LÀM — thay hoàn toàn cách "grep số lớn nhất +1"):**
> 1. `git log --all --oneline -15` + đọc bảng trong AGENT_REGISTRY.md → số mới =
>    max + 1 (worktree dùng chung `.git` → commit local thấy ngay, không cần push).
>    GĐ và C.x là 2 dải độc lập, không đếm chung.
> 2. Thêm 1 dòng vào bảng registry: số + tên Agent + nhiệm vụ + **PHẠM VI FILE dự
>    kiến** + trạng thái 🔒 → **COMMIT NGAY** (commit chỉ chứa registry — 0 đụng
>    code, KHÔNG vi phạm quy tắc KHÔNG tự push GĐ 229).
> 3. Làm việc → xong: ghi entry AGENTS.md + commit code → sửa dòng registry 🔒 →
>    ✅ kèm hash → commit cuối (docs-only).
> 4. 2 agent claim cùng số (hiếm): ai commit VÀO TRƯỚC giữ số — agent sau lấy
>    max+1 lại, commit lại. KHÔNG tranh số.
>
> **3 QUY TẮC COMMIT CỨNG (áp mọi agent, mọi commit):**
> 1. **CẤM `git add .` / `git add -A`** — chỉ add TƯỜNG MINH từng file của mình;
>    `git status --short` trước khi add, file lạ = của agent khác → KHÔNG đụng.
> 2. **Commit message chuẩn:** `feat|fix|docs(<scope>): GĐ <số> (<tên Agent>) — mô tả`
>    (repo con: `C.x (<tên Agent>)`) — truy vết ai làm gì bằng `git log`.
> 3. **Checklist khởi động phiên:** pull CẢ 2 repo → `git config user.email` phải
>    `cuongpk.giong04@gmail.com` (chặn GĐ 264) → đọc AGENTS.md + registry mới nhất
>    → claim số TRƯỚC khi viết code đầu tiên.
>
> **Chi tiết đầy đủ + bảng khóa số trực tiếp:** xem `AGENT_REGISTRY.md`.
>
> **Lệnh cơ bản (Agent đọc khi cần):** `git worktree list` (xem các working tree) · `git -C <worktree> log --oneline -5` (xem commit Agent kia) · merge khi Push: `git checkout main && git merge agent-cli`.

### Cách tăng Version:

> ⚠️ **THỜI ĐIỂM bump (2026-09-26):** chỉ bump khi **Đại ca nói "Push"** (nguyên tắc ĐA AGENT bên trên) — KHÔNG bump ngay khi commit. Quy tắc tính số bên dưới vẫn nguyên hiệu lực.

- **2 nơi cần sửa (luôn bump CẢ HAI cùng lúc):**
  1. `package.json` → field `"version": "x.y.z"`
  2. `src/components/app-shell.tsx` → `const DEFAULT_VERSION = "x.y.z"`
- **Quy tắc tăng:** Patch (x.y.Z+1) cho fix nhỏ, Minor (x.Y.0+1) cho feature mới.
- **Hệ đánh số (chốt 2026-09-10 — Đại ca chọn giữ hệ 1 chữ số):** Vị trí MINOR và PATCH mỗi nơi chỉ dùng MỘT chữ số 0→9; khi đầy 9 thì về 0 và "nhớ" sang số trước (giống phép cộng số). MAJOR tăng tự do khi được nhớ sang (kể cả `9.9.9 → 10.0.0`).
- **NHỚ SANG SỐ TRƯỚC áp dụng cho MỌI lần tăng — không chỉ khi patch đầy 9 (bổ sung 2026-09-16 sau khi sai lần 3):**
  - Tăng PATCH khi patch < 9: `2.6.0 → 2.6.1`
  - Tăng PATCH khi patch = 9 (minor 0→8): `2.4.9 → 2.5.0` (KHÔNG PHẢI 2.4.10)
  - Tăng MINOR khi minor < 9: `2.5.0 → 2.6.0`
  - **Tăng MINOR khi minor = 9 (BẤT KỂ patch đang là gì):** `1.9.0 → 2.0.0`; `1.9.9 → 2.0.0` (KHÔNG PHẢI 1.10.0)
  - Minor = 9 + patch = 9 + tăng minor: cũng `x.9.9 → x+1.0.0`
- **Tròn chục (minor đang 0→8, patch đầy 9):** minor +1 bậc, patch về 0:
  - `1.0.9` → `1.1.0`; `1.1.9` → `1.2.0`; `1.8.9` → `1.9.0`
- **Tròn trăm (minor ĐANG 9, patch đầy 9):** minor về 0, MAJOR +1:
  - `0.9.9` → `1.0.0` (NHẢY QUA 0.10.0)
  - `1.9.9` → `2.0.0`
- **KHÔNG bao giờ tồn tại** dạng `x.10.y` hay `x.y.10` — số như `1.19.9` KHÔNG HỢP LỆ trong hệ này (minor có 2 chữ số), không được dùng làm ví dụ tăng.
- **✅ CHECKLIST BẮT BUỘC khi bump (3 bước — làm trước khi ghi số vào file/commit, áp dụng CẢ app tổng lẫn repo con — hiệu lực 2026-09-16 sau khi sai 3 lần: 0.1.10, 2.4.10, 1.10.0):**
  1. **Xác định loại tăng:** fix nhỏ = patch, feature = minor, nhớ major = major.
  2. **Tính số mới rồi TỰ KIỂM TRA:** mỗi thành phần (major.minor.patch) phải còn MỘT chữ số 0-9. Hỏi thẳng: *"Số mới có chỗ nào ≥ 10 không?"* — CÓ = SAI, tính lại theo nhớ (9 → về 0, nhớ sang trái).
  3. **Ghi 2 nơi đồng thời + đối chiếu:** package.json + DEFAULT_VERSION phải cùng một giá trị mới (grep xác nhận), rồi mới commit.

### Ngôn ngữ & Ghi nhớ (bắt buộc tuân thủ):

- **Luôn sử dụng tiếng Việt Nam** để tương tác với Anh — bao gồm cả suy nghĩ nội bộ, phần trả lời, và giao tiếp. KHÔNG dùng tiếng Anh trong suy nghĩ hay phản hồi.
- **Sau mỗi lần push lên GitHub (nếu Đại ca chọn mục 2 hoặc 3), PHẢI cập nhật AGENTS.md** — lưu lại lịch sử thay đổi (giai đoạn mới, commit mới, lesson learned) để lần sau AI đọc lại biết đúng context.

---

## 5. Cấu trúc project quan trọng

```
src/
├── routes/
│   ├── __root.tsx          # App shell
│   ├── index.tsx           # Dashboard
│   ├── login.tsx           # Login/Register
│   ├── cham-cong.tsx       # Chấm công
│   ├── check-in.tsx        # Check-in
│   ├── nhiem-vu.tsx        # Nhiệm vụ
│   ├── nhan-su.tsx         # Nhân sự
│   ├── trung-tam.tsx       # Trung tâm
│   ├── de-nghi.tsx         # Đề nghị
│   ├── chat.tsx            # Chat nội bộ
│   ├── ghi-chu.tsx         # Ghi chú
│   ├── ho-so.tsx           # Hồ sơ tài liệu
│   ├── huong-dan.tsx       # Hướng dẫn
│   ├── bao-cao.tsx         # Báo cáo
│   ├── change-password.tsx # Đổi mật khẩu
│   ├── forgot-password.tsx # Quên mật khẩu
│   ├── admin/              # Admin pages
│   │   ├── approvals.tsx   # Phê duyệt đăng ký
│   │   └── permissions.tsx # Phân quyền
│   └── api/                # Server functions (TanStack Start)
│       ├── data.ts         # CRUD ops (attendance, tasks, notes...)
│       ├── employee-crud.ts # Employee/Center CRUD + queries
│       ├── registrations.ts # Registration requests
│       ├── upload.ts       # File upload
│       ├── auth-change-password.ts # Đổi mật khẩu
│       ├── auth-reset.ts   # Reset password
│       └── auth/           # Auth endpoints
├── lib/
│   ├── store.ts            # Zustand store (main state)
│   ├── catalog.ts          # Employee/center lookups + static data
│   ├── types.ts            # TypeScript types
│   ├── permissions.ts      # RBAC logic
│   ├── employee-data.ts    # Employee seed/helper data
│   ├── db.ts               # Neon database connection
│   ├── format.ts           # Date/number formatting
│   └── auth/               # Better Auth server setup
├── components/             # Shared UI components
└── data/                   # Seed data (charts)
```

---

## 6. Database & Migrations

- DB: Neon PostgreSQL
- Migrations: `migrations/0001_auth.sql` → `migrations/0010_clear_attendance.sql` (11 files)
- Auth tables: `user`, `session`, `account`, `verification`
- Business tables: `attendance`, `tasks`, `proposals`, `notes`, `messages`, `checkins`, `employees`, `centers`, `registration_requests`
- Đã xóa: `cash_vouchers`, `vaccine_inventory`, `credit` (theo yêu cầu Đại ca)

---

## 7. Deploy & Environment

- **GitHub repo:** `giong-vn-v6`
- **Vercel URL:** `https://giong-vn.vercel.app`
- **Env vars trên Vercel:**
  - `DATABASE_URL` = Neon connection string
  - `BETTER_AUTH_URL` = Vercel domain
  - `BETTER_AUTH_SECRET` = random secret

---

## 8. Nhân sự chính trong hệ thống

| ID | Tên | Vai trò | Trung tâm |
|---|---|---|---|
| e...001 | Nguyễn Thị Thúy | Admin (Giám đốc) | VP |
| e...002 | Hoàng Minh Châu | Admin (Phó GĐ) | VP |
| e...003 | Phạm Kiên Cường | Admin (Quản trị HT) | VP |
| e...004 | Phạm Cường | Admin (Chuyên gia LTV) | VP |

---

## 9. Lưu ý khi làm việc

- **Không chạy local** — Đại ca sẽ test trên Vercel
- **Push lên GitHub** là đủ — Vercel auto-deploy
- **Không có CI checks** bắt buộc trước merge
- **Test tự động (unit)** khi cần — viết trong `*.test.ts` hoặc `*.test.mjs`
- **Ngôn ngữ code:** TypeScript, Tiếng Việt cho UI text
- **Formatting:** Prettier + ESLint (đã cấu hình sẵn)
- **Được phép truy cập Vercel** — Em có quyền dùng Playwright/headless browser để login vào website Vercel (`https://giong-vn-v6.vercel.app`) và xem toàn bộ dự án. Login credentials: `cuongpk.giong04@gmail.com` / `Admin123!`. Dùng khi cần kiểm tra UI, debug lỗi trên deployment thực tế.
- **Được phép truy cập Neon** — Em có quyền truy cập Neon PostgreSQL console để kiểm tra dữ liệu, chạy SQL query, và thực hiện lệnh cần thiết. Kết nối qua `DATABASE_URL` env var trên Vercel. Dùng khi cần verify data, debug query, hoặc thực hiện migration thủ công.
- **Được phép truy cập Cloudinary** — Em có quyền truy cập Cloudinary console (`https://console.cloudinary.com`) để kiểm tra Media Library (ảnh/file đã upload), dung lượng, debug upload lỗi. Dùng khi cần verify file đã lên CDN, tìm file thừa, hoặc kiểm tra lỗi transformation.
- **Quy tắc truy cập trực tiếp 3 hệ thống (bổ sung 2026-09-10, theo yêu cầu Đại ca):** Em được phép truy cập TRỰC TIẾP, KHÔNG cần hỏi lại từng lần: (1) **Vercel** — website + CLI (`vercel logs`, `vercel env ls`, `vercel project ls`, deploy...); (2) **Neon** — console SQL + mọi query đọc/kiểm tra; (3) **Cloudinary** — console + API. Mặc định được phép: đọc, kiểm tra, debug, xem logs. VẪN PHẢI HỎI Đại ca trước khi làm thao tác PHÁ HỦY: xóa sạch dữ liệu (drop table, delete all), xóa media hàng loạt, reset môi trường, đổi cấu hình quan trọng (domain, env, connection string). Lưu ý GĐ 71: env đánh dấu Sensitive trên Vercel không pull được qua CLI (`[SENSITIVE]`) — cần giá trị thật thì nhờ Đại ca cung cấp hoặc bỏ dấu Sensitive.
- **Quy ước tiết kiệm egress Neon (GĐ 159 — 18/09/2026, sau khi 4.83GB/5GB):** Neon free chỉ 5GB egress/project/tháng (đo cả dữ liệu Neon gửi ra cho Vercel, agent, lẫn SELECT trong Neon Console). Quy tắc bắt buộc:
  1. **KHÔNG `select *` trên bảng có cột payload lớn** (`result_full` — bảng TX-DS 6-8MB/job; `attachments`/`reactions` jsonb...). Liệt kê cột cụ thể ở MỌI query chạy thường xuyên (poll, hydrate, claim).
  2. Payload lớn chỉ tải khi user chủ động bấm xem (`loadTxdsResult` phân trang), không bao giờ nằm trong response poll.
  3. Khi debug trên Neon Console: tránh `SELECT *` bảng lớn — đọc của em cũng tính egress; ưu tiên `COUNT(*)` + LIMIT.
  4. Hydrate app tổng tải ~2-3MB/phiên mở — chấp nhận được; KHÔNG thêm collection mới vào hydrate nếu không cần thiết (dùng lazy-load theo trang như employees/centers).
  5. Theo dõi mức egress: Neon Console → Organization → Usage (ảnh Đại ca gửi); vượt 60-70% là rà lại query mới thêm trong tháng.

---

## 10. Hướng dẫn làm việc tại nhà (từ máy cá nhân)

### Yêu cầu
- Node.js >= 18
- Git
- npm

### Bước 1: Clone repo
```bash
git clone https://github.com/cuongpkgiong04-beep/giong-vn-v6.git
cd giong-vn-v6
```

### Bước 2: Cài dependencies
```bash
npm install
```

### Bước 3: Chạy dev server
```bash
npm run dev
```
Dev server chạy tại `http://localhost:5173`

### Env vars cần thiết (đã set trên Vercel, KHÔNG cần set local)
| Variable | Ghi chú |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL — chỉ cần trên Vercel |
| `BETTER_AUTH_URL` | Domain Vercel — chỉ cần trên Vercel |
| `BETTER_AUTH_SECRET` | Secret key — chỉ cần trên Vercel |
| `CLOUDINARY_*` | Upload ảnh — chỉ cần trên Vercel |

> **Lưu ý:** Khi chạy local, auth có thể ở chế độ demo/dev. Để test đầy đủ, dùng Vercel.

### Bước 4: Push code mới
```bash
git add .
git commit -m "mô tả"
git push origin main
```
Vercel tự động deploy sau mỗi push.

### Quy tắc sync giữa 2 máy
- **Luôn pull trước khi bắt đầu làm:** `git pull origin main`
- **Luôn push sau khi xong:** `git push origin main`
- **Không commit file .env** — đã nằm trong .gitignore
- **startup.sh** đã được sửa dùng relative path — hoạt động ở bất kỳ máy nào

---


## 📌 NGUYÊN TẮC ĐỊNH DẠNG TOÀN APP (Đại ca chốt 21/09/2026 — hiệu lực vĩnh viễn, áp dụng CẢ app tổng + app con)

> **Yêu cầu của Đại ca (21/09, GĐ C.54 repo con):** Thêm nguyên tắc định dạng áp
> dụng toàn app vào AGENTS.md. Mọi bảng biểu / trang mới (báo cáo, module,
> dashboard...) PHẢI tuân thủ 4 nguyên tắc. Báo cáo app con qua khung
> `report-result-table.tsx` + `_rows` builder tự hưởng sẵn.

| # | Nguyên tắc | Quy tắc kỹ thuật |
|---|---|---|
| 1 | **Ngày: "dd/mm/yyyy" căn TRÁI** | ISO → dd/mm/yyyy khi render (fmtCell app con / formatDate app tổng); cột ngày canh trái, không phải số |
| 2 | **Số: "#,##0" căn PHẢI** | Không thập phân; ngăn cách nghìn `.`; text-right tabular-nums (fmtNumber) |
| 3 | **Cột Đơn giá KHÔNG cộng Subtotal** | "Đơn giá..."/"Giá ..." (khác "Giá trị...") → dòng Subtotal TRỐNG; guard 2 lớp builder + web (isUnitPriceColumn) |
| 4 | **Text căn TRÁI, tràn thì ẨN** | truncate whitespace-nowrap + title hover — không đè cột sau |

> **Đơn giá nhận dạng:** bắt đầu "Đơn giá" hoặc "Giá " đầu tên trừ "Giá trị" —
> "Giá" = đơn vị tiền/1 đơn vị hàng (không cộng được); "Giá trị" = tổng tiền
> (cộng được).
>
> **Áp dụng app tổng:** các trang bảng hiện có (chấm công, check-in, nhiệm vụ,
> đề nghị, ghi chú...) — ngày đã hiển thị dd/mm/yyyy qua `formatDate`, số qua
> `formatNum`; khi tạo bảng MỚI tuân thủ đủ 4 nguyên tắc (căn lề + truncate +
> không cộng cột đơn giá).

---

## 📌 QUY TRÌNH NGHIỆP VỤ DOWNLOAD → ETL → BÁO CÁO (Đại ca chốt 01/10/2026 — hiệu lực vĩnh viễn, áp dụng MỌI phân hệ dữ liệu app con)

> **Chỉ thị của Đại ca (01/10, GĐ 277):** Thống nhất quy trình — **Download dữ
> liệu xong thì CHẠY BÁO CÁC** (xử lý dữ liệu thô từ file download), dùng **ETL
> để tinh chỉnh và tạo báo cáo**. Phần nào CHƯA có code chạy báo cáo → **GHI
> NHẬN THIẾU SÓT** vào AGENTS.md và thực hiện sau (không để hở im lặng).

> **3 BƯỚC BẮT BUỘC cho MỌI phân hệ download (SMED / MISA / MIA / BANK / nguồn
> mới sau này):**
>
> | Bước | Việc | Kiểm chứng |
> |---|---|---|
> | **1. DOWNLOAD** | Tool tải file về `OUTPUT\<phân hệ>\<từ ngày>\` — chuẩn số file THEO TỪNG TOOL (chỉ SMED = 19 file/19 TT; phân hệ khác đọc kỹ tool — GĐ 276) | Job done đủ file theo expected_files |
> | **2. ETL** | Script `etl/<phân hệ>_import.py` nạp GiondDB — bảng tường minh khi dữ liệu lệch >2 giả định khung stg_* (VCB/TCB/MIA); nạp đè theo NGÀY (file theo-ngày) hoặc KỲ GỘP (file gộp kỳ); hash dedupe + idempotent; agent TỰ chạy ETL sau job (không chờ auto-ETL 60 phút) | Đối chứng tổng/số dòng với file gốc TỪNG ĐỒNG trước khi tin |
> | **3. BÁO CÁC** | Builder trong `sql_reports.py` (QUERY_KEYS + REPORT_SOURCE_TABLES + EMPTY_OK nếu rỗng hợp lệ) + trang web SqlDataModule + phân quyền 3 điểm (ROUTE_TO_GROUP · SQL_QUERY_LEAF · catalog app tổng) | Chạy thật 1 kỳ đối chứng số với nguồn; typecheck 0 lỗi |
>
> **Checklist khi thêm phân hệ DOWNLOAD MỚI (bắt buộc theo thứ tự):**
> 1. Tool tải file về đúng thư mục + expected_files đúng chuẩn tool (GĐ 276)
> 2. ETL nạp GiondDB + đối chứng tổng từng đồng với file mẫu
> 3. Builder + trang web + phân quyền 3 điểm + nav leaf
> 4. Agent hook tự ETL sau job
> 5. Ghi AGENTS.md — nếu thiếu bước nào → ghi rõ "THIẾU SÓT: ..." + kế hoạch làm

> **Nguyên tắc kèm theo:**
> - **Đề xuất TRƯỚC khi viết code** (quy trình 5 bước GĐ 198) — trình phương án
>   + dự đoán kết quả cho Đại ca chốt (mẫu: TCB GĐ 277 — 3 PA + 3 câu hỏi).
> - **Đối chứng bằng chứng:** không tin "ETL xong, không lỗi" — phải SELECT tổng
>   so với file gốc (mẫu: TCB khớp nợ 6.175.399.661 từng đồng).
> - **Bảng tường minh vs stg_*:** dữ liệu lệch >2 giả định khung generic
>   (không cột ngày / không trung tâm / nhiều bảng liên quan) → bảng riêng
>   (bank_vcb_tx, bank_tcb_tx, mia_hddt_hd...), đừng ép vào stg_* (lesson C.126).
> - **File gộp kỳ vs file theo ngày:** định nghĩa chuẩn file ngay từ ETL —
>   nạp đè theo đúng đơn vị đó (TCB/MIA theo KỲ, VCB/SMED theo NGÀY) + check
>   nguồn cùng chuẩn (checkCol 'period' vs 'tx_date' vs report_date).

**Trạng thái áp dụng (01/10/2026):** SMED 11 phân hệ ✅ · MISA 2 ✅ · MIA 4 ✅ ·
VCB ✅ · **TCB ✅ (GĐ 277 — phân hệ đầu tiên chạy trọn quy trình này)** ·
TPB ⚠️ THIẾU SÓT (chờ tool + file mẫu — GĐ 257) · VTB ⚠️ THIẾU SÓT (chờ tool).

---
## 🤖 KIẾN TRÚC MULTI-AGENT — nhiều AI cùng làm 1 dự án (GĐ 242, 2026-09-27)

> **Quyết định của Đại ca (27/09):** Anh dùng NHIỀU Agent song song cùng làm dự án
> (hiện có 2, sau này thêm nữa) — KHÔNG xóa workspace của agent nào. Mỗi Agent một
> clone riêng, gặp nhau trên GitHub.

### Bản đồ workspace (máy chủ công ty — D:\DuLieuChung\CUONG_2026\)

| Agent | Workspace app tổng | Workspace repo con (giong-apps) |
|---|---|---|
| 🤖 **Trợ lý Freebuff** (em) | `giong-vn-v6\` | `giong-vn-v6\giong-apps\` |
| 🤖 **Agent CLI** | `giong-vn-v6-cli\` | `giong-vn-v6\giong-apps-cli\` |
| 🤖 Agent sau này | clone mới (VD `-agent3`) | clone mới tương tự |

**Cả 2 app tổng clone CÙNG remote `github.com/cuongpkgiong04-beep/giong-vn-v6`;
cả 2 repo con clone CÙNG remote `.../giong-apps`.** GitHub là điểm gặp nhau duy nhất.
Thư mục `-cli` được gitignore tại app tổng (dòng `giong-apps-cli/`) — clone không
lọt git của nhau.

### ⚠️ 4 QUY TẮC SỐNG CÒN (mọi Agent bắt buộc tuân thủ)

1. **PULL TRƯỚC MỖI PHIÊN LÀM** — `git pull origin main` ở CẢ repo trước khi đụng
   code. Agent khác có thể vừa push giai đoạn mới; làm trên bản cũ = xung đột +
   mất công. Nếu pull có conflict: DỪNG, đọc AGENTS.md xem agent khác làm gì, hỏi
   Đại ca trước khi xử lý.
2. **PUSH NGAY sau khi Đại ca duyệt** — đừng giữ commit local lâu (càng lâu càng
   dễ lệch). Mỗi giai đoạn được duyệt = push trong phiên đó. AGENTS.md luôn ghi
   rõ "KHÔNG push — chờ Đại ca" khi đang giữ commit.
3. **KHÔNG force push / amend / rebase viết lại lịch sử** — nhiều agent cùng repo
   thì lịch sử phải CHỈ ĐI TỚI. Ngoại lệ khẩn cấp (lộ password — GĐ 123): phải có
   Đại ca chỉ thị trực tiếp.
4. **AGENTS.md là kênh phối hợp chung** — mọi agent ghi giai đoạn của mình vào
   AGENTS.md (kèm commit hash + ngày). Trước khi làm nhiệm vụ lớn: đọc AGENTS.md
   phần mới nhất để biết agent khác vừa làm gì, TRÁNH đụng cùng module cùng lúc.
   Mỗi agent GHI rõ tên mình (VD: "Trợ lý Freebuff" / "Agent CLI") trong giai
   đoạn của nó.

### Quy ước đặt tên clone mới (khi Đại ca thêm Agent)

`<repo>-<tên-agent>` — VD `giong-vn-v6-agent3`, `giong-apps-agent3`. ĐỪNG dùng
tên trùng hoặc hậu tố chung chung dễ nhầm. Thêm dòng gitignore tương ứng tại
app tổng nếu clone repo con nằm trong thư mục app tổng.
---

## 11. 🚨 QUY TẮC QUẢN LÝ CONTEXT — CẢNH BÁO TRƯỚC KHI TRÀN (hiệu lực 2026-10-05, GĐ 319)

> **Bối cảnh:** phiên 05/10 gặp lỗi Freebuff "Compaction could not bring this
> conversation under the model's 400,000-token context budget" — phiên chết giữa
> chừng. Đại ca yêu cầu: sửa gốc + CẢNH BÁO TRƯỚC khi gặp lại.

### Quy tắc bắt buộc cho MỌI Agent (mọi phiên):

1. **Đọc AGENTS.md TỐI THIỂU:** chỉ đọc các mục đang cần (mục 1-12 + entry GĐ mới
   nhất). Tra lịch sử/lesson cũ → dùng `grep`/`sed` lấy ĐÚNG entry theo số GĐ trong
   AGENTS_ARCHIVE.md — TUYỆT ĐỐI KHÔNG đọc cả file archive (file này lớn).
2. **Đọc code có chọn lọc:** đọc file lớn theo cửa sổ dòng (offset/limit) quanh vị
   trí cần sửa — không nạp nguyên file lớn khi chỉ cần 1 hàm.
3. **Đồng hồ context:** quan sát chỉ số token hiển thị ở phiên (VD "400.6K (40%)").
   - **≥ 280K (~70%):** TÓM TẮT NGAY tiến độ (đã làm gì / file đã sửa / còn dở) —
     ghi vào entry GĐ dở dang hoặc ghi chú cho vòng sau, rồi BÁO Đại ca:
     "context đã ~70%, nên mở phiên mới để tiếp việc, em đã ghi checkpoint".
   - **≥ 350K (~87%):** DỪNG nhận việc mới — hoàn tất việc đang dở + commit +
     ghi AGENTS.md là cùng. KHÔNG bắt đầu nhiệm vụ lớn khi gần ngưỡng.
4. **Phiên dài = chia nhỏ nhiệm vụ:** việc lớn tách theo giai đoạn, xong chặng nào
   commit + ghi AGENTS.md chặng đó — phiên mới đọc checkpoint tiếp tục, không mất
   bối cảnh.
5. **Checkpoint là nguồn sự thật:** AGENTS.md (quy tắc + entry mới) +
   AGENTS_ARCHIVE.md (lịch sử đầy đủ). Mọi phiên mới luôn đọc AGENTS.md trước.

### Xử lý khi ĐÃ gặp lỗi tràn context (tham khảo nhanh):

- Lịch sử phiên KHÔNG mất (Freebuff giữ nguyên) → mở thread/phiên MỚI là làm tiếp;
  đọc AGENTS.md + entry GĐ mới nhất để vào việc.
- Với kết nối BYOK: chọn model/context window lớn hơn nếu model hỗ trợ.

---

## 12. Quy ước GHI entry mới (từ GĐ 319):

- Entry mới ghi VÀO **AGENTS.md** (phần này trở đi) — KHÔNG ghi vào AGENTS_ARCHIVE.md.
- AGENTS.md giữ gọn: quy tắc hiện hành (mục 1-12) + entry từ GĐ 319. Khi entry tích
  lũy dài thêm đáng kể (gần 2.000 dòng) → agent ĐƯƠNG SỐ chủ động lặp lại phép tách:
  dời entry cũ (giữ nguyên văn) xuống CUỐI AGENTS_ARCHIVE.md + cập nhật mốc "GĐ mới
  nhất trong archive" ở header file archive.
- Lịch sử GĐ 1 → 318: nằm trọn trong **AGENTS_ARCHIVE.md** (tra bằng số GĐ).
- Mọi quy tắc khác không đổi (Registry lock, 3 quy tắc commit cứng, quy trình
  5 bước, nguyên tắc Push ĐA AGENT — xem mục 4).

---

### GĐ 319 (Trợ lý Freebuff): Tách AGENTS.md trị gốc lỗi tràn context 400K + quy tắc cảnh báo trước khi tràn (2026-10-05)

> **Yêu cầu của Đại ca (05/10, kèm ảnh lỗi):** phiên Freebuff chết với lỗi
> "Compaction could not bring this conversation under the model's 400,000-token
> context budget" — anh dặn "Sửa lỗi này... Sau này có cảnh báo trước khi gặp
> lỗi này nhé". ĐH chọn PA-3 = trị gốc + cảnh báo sớm.
>
> **Chẩn đoán (đo thật):** AGENTS.md tích lũy 12.673 dòng / 894KB (~250-300K
> token) — mỗi phiên đọc bộ nhớ đã "ăn" gần 3/4 ngân sách context 400K của
> GLM 5.3 Flash; phiên dài + đọc file lớn → tràn. KHÔNG phải bug code app.
>
> **Đã làm (docs-only, 0 đụng code):**
> 1. **Tách file:** toàn bộ AGENTS.md tại commit `a2fbba4` chép NGUYÊN VĂN 100%
>    (md5 khớp từng byte — verify diff) vào **AGENTS_ARCHIVE.md** (header mới +
>    12.673 dòng gốc). Lịch sử GĐ 1 → 318 đủ 100% ở archive; tra bằng grep/sed
>    theo số GĐ, KHÔNG đọc cả file.
> 2. **AGENTS.md mới 583 dòng (~40KB):** mục 1-10 giữ nguyên + 3 khối quy tắc
>    hiệu lực vĩnh viễn (Định dạng toàn app · Quy trình Download→ETL→Báo cáo ·
>    Kiến trúc Multi-Agent) + **mục 11 QUY TẮC QUẢN LÝ CONTEXT (mới)** + mục 12
>    quy ước ghi entry mới.
> 3. **Mục 11 — cảnh báo trước khi tràn:** đồng hồ context ≥280K (~70%) → tóm
>    tắt checkpoint + BÁO Đại ca nên mở phiên mới; ≥350K (~87%) → dừng nhận việc
>    mới, hoàn tất + commit + ghi AGENTS.md là cùng; đọc code theo cửa sổ dòng;
>    việc lớn chia chặng, xong chặng commit.
> 4. **Registry:** claim GĐ 319 (`c4e179c`) trước khi làm — đúng quy trình GĐ 285.
>
> **Verify:** archive = nguyên văn 100% (md5 `426e650e…` khớp bản gốc);
> AGENTS.md mới đủ 12 mục + 3 khối quy tắc (grep đối chiếu); giảm ~95% dung lượng
> phần "bộ nhớ" mỗi phiên phải nạp.
>
> **Tiêu chí kiểm chứng:** phiên MỚI mở AGENTS.md nhẹ → còn nhiều dư địa context;
> cần lesson cũ → grep AGENTS_ARCHIVE.md theo số GĐ; khi đồng hồ phiên tới ~70%
> agent phải chủ động báo trước, hết lỗi chết phiên bất ngờ.
>
> **Version:** KHÔNG bump (docs-only — chờ lệnh Push — quy tắc ĐA AGENT).
> App tổng **5.0.0** / repo con **8.0.0**.

---

### GĐ 320 (Trợ lý Freebuff): PA-1 Push đợt GĐ 317-319 / C.167 — bump 5.1.0 / 8.0.1 + LIVE production (2026-10-05)

> **Lệnh "Push" của Đại ca (05/10, sau GĐ 319).** Rà trùng lặp theo nguyên tắc 3:
> `main..agent-cli` + `main..pipeline-work` = RỖNG cả 2 repo; registry KHÔNG có
> 🔒 nào khác đang dở; `git status` không có file modified của agent khác (chỉ
> untracked + 1 file deleted `attachments/…zip` của phiên trước — không đụng).
>
> **Bump version (lúc Push — đúng quy tắc ĐA AGENT):**
> - **App tổng 5.0.0 → 5.1.0** (minor — GĐ 318 có tính năng bat tự đóng app cũ +
>   tách script tunnel): package.json + package-lock.json (2 chỗ root) +
>   DEFAULT_VERSION app-shell.tsx — đủ 4 chỗ, grep sạch `5.0.0`.
> - **Repo con 8.0.0 → 8.0.1** (patch — fix C.167 gỡ mục "Báo cáo chạy" Task_02):
>   package.json + DEFAULT_VERSION — đủ 2 chỗ.
> - Checklist GĐ 138 ✓ (không thành phần nào ≥ 10).
>
> **Push:**
> - App tổng `5f77ace..19944d6` — 8 commit: GĐ 317 (claim+docs) · GĐ 318
>   (claim+code+docs) · GĐ 319 (claim+tách AGENTS.md+docs) · GĐ 320 (claim+bump).
> - Repo con `93637ea..09a20c0` — 2 commit: C.167 (fix Task_02) + C.168 (bump).
>
> **✅ Verify production (curl domain — không chỉ nhìn Ready):**
> - App tổng `giong-vn-v6.vercel.app` = **VERSION 5.1.0** — domain KHÔNG bị ghim
>   deployment cũ (khác sự cố GĐ 306, không cần promote).
> - App con `giong-banhang.vercel.app` = **VERSION 8.0.1** + `/api/units` trả data
>   thật (20 trung tâm).
>
> **Version:** app tổng **5.1.0** / repo con **8.0.1** — ĐÃ PUSH + ĐÃ LIVE.

---

### GĐ 321 (Trợ lý Freebuff): Restart GIONG_SMED_Agent — nạp bản C.163/C.164/C.167 (2026-10-05)

> **Lệnh của Đại ca (05/10, 23:44):** "Restart Agent bây giờ" — nạp task_runner +
> api_server bản mới sau đợt push GĐ 320 (C.163 nút ⏸/▶ pause + hủy nhanh ·
> C.164 Task_02 chỉ download + Task_03 báo cáo · C.167 fix dialog Task_02).
>
> **Check agent rảnh TRƯỚC khi restart (đúng quy trình GĐ 266/301):** log agent
> (web_agent_051026_171632.log) 30 phút cuối = 0 job mới ("… chưa có job mới"),
> 3 slot Task hôm nay (17:25/19:00/23:00) đã qua và log ghi "BỎ, chờ slot ngày
> mai" → RẢNH an toàn, restart 23:50 không cắt job nào.
>
> **Restart (đủ 3 bước chuẩn):** (1) xóa `__pycache__` 3 thư mục agent/
> api_server/etl (lesson GĐ 168 — Python dùng bytecode cũ nếu không xóa);
> (2) `sc stop GIONG_SMED_Agent` → STOPPED; (3) `sc start` → **RUNNING PID mới
> 5852** (cũ 4380).
>
> **✅ Verify (bằng chứng thật sau restart):** log mới
> `web_agent_051026_235114.log` — agent poll Vercel mỗi 20s, "… chưa có job mới"
> (đường kéo việc sống), task runner bật với 3 slot 17:25/19:00/23:00, slot
> catch-up giữa đêm BỎ đúng thiết kế GĐ C.161 (không dồn catch-up); API
> `:8777/health` 200 — `tunnel_ok:true` (Quick Tunnel
> `competitions-detect-cork-whether`), db GiongDB OK, 1123 jobs trong kho.
>
> **Tiêu chí kiểm chứng:** anh tạo job trên web → agent claim trong ~20s; nút
> ⏸/▶ tạm dừng lịch trên trang Nhiệm vụ có hiệu lực với agent bản mới; Task_02
> slot mai 17:25 chạy đúng (chỉ download, Task_03 follow).
>
> **Version:** KHÔNG bump (không đổi code — chỉ restart service). App tổng
> 5.1.0 / repo con 8.0.1.

---

### GĐ 322 / C.169 (Trợ lý Freebuff): Fix tool VCB chọn ngày sai tháng — panel lịch mở tháng kỳ cũ (2026-10-06)

> **Lỗi của Đại ca (ảnh màn hình 21:49):** job VCB kỳ 05/10→05/10 fail 3 lần — ô "Từ ngày" nhận **'05/09/2026' ≠ mong '05/10/2026'** đủ 3 lần retry.
>
> **Chẩn đoán (đối chiếu TCB đang tốt):** panel lịch Digibiz mở theo THÁNG KỲ CŨ trong ô (grid 6 tuần vẫn visible ô '5' tháng 09) → tool cũ click text '5' `.first` trúng ô other-month; retry chỉ lặp lại đúng cách cũ → fail. Tool VCB thiếu 2 cơ chế TCB có (C.128): verify input sau click + điều hướng prev/next tháng.
>
> **Đại ca chốt PA-1 + PA-2** (trong 4 lựa chọn; từ chối soi DOM trước vì tốn 1 ngày chạy thật).
>
> **Đã làm (chỉ `_pick_date` trong `40_vcb_saoke.py`, +135/−34):**
> 1. **PA-2 — khớp ô theo label:** ưu tiên phần tử aria-label/title chứa "tháng <m> " (space-anchored — 'tháng 1' không khớp 'tháng 10/11/12') + text đúng số ngày; fallback text visible (C.111b) giữ nguyên.
> 2. **PA-1 — verify + điều hướng:** sau click verify giá trị input đích; chưa đúng → bấm nút prev/next tháng (class mat-calendar + aria EN/VN), hướng theo chênh (y,m,d) so tuple, tối đa 13 lượt ≈ 1 năm; không thấy nút điều hướng → đóng-mở lại panel (attempt sau); attempt cuối fail → dump debug `_dbg_shot` + `_dbg_dump_deep` để soi selector thật.
> 3. **Test unit mới** `40_vcb_saoke.test.py` — FakePage mô phỏng panel sai tháng (không cần mạng/UI).
>
> **Verify:** py_compile OK · unit 6/6 PASS (kịch bản lỗi thật: panel T09 mong T10 → nav next 1 lần → đúng '05/10/2026'; cả hướng prev + lệch nhiều tháng + _daterange). **Không restart service:** tool BANK chạy qua subprocess riêng mỗi job (`sp.Popen` trong 40_web_agent.py) → fix có hiệu lực NGAY job tiếp theo.
>
> **Tiêu chí kiểm chứng:** job VCB kế tiếp (bấm "Thử chạy lại" trên web hoặc slot Task_02 17:25) chọn đúng ngày dù panel mở sai tháng; nếu vẫn fail → đọc dump debug trong log tool (body[:1200] + ảnh LOG/vcb_shots/) để soi selector nút điều hướng thật rồi vá thêm.
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **5.1.0** / repo con **8.0.1**.

---

### GĐ 323 / C.169b (Trợ lý Freebuff): VCB vẫn lỗi sau C.169 — panel mat-datepicker ĐÓNG khi chọn ô (2026-10-06)

> **Đại ca báo "Vẫn lỗi" (ảnh 00:46):** tool ĐÃ chạy bản C.169 (chuỗi lỗi mới xuất hiện) nhưng vẫn '05/09/2026' ≠ mong + thêm nhãn **"không có nút điều hướng tháng"**.
>
> **Chẩn đoán từ bằng chứng thật (không đoán):** (1) dump DOM lộ `mat-datepicker-1-backdrop` → panel là **Angular Material Datepicker chuẩn**; (2) log C.169: click ô tháng khác **ĂN** (input nhận '05/09/2026') nhưng **ĐÓNG panel ngay** (mat-datepicker mặc định) → `_nav_month` tìm nút khi panel KHÔNG CÒN → "không có nút điều hướng". Selector C.169 đoán theo dấu hiệu Angular là đúng hướng, chỉ gãy tại điểm panel đã đóng.
>
> **Fix C.169b — 3 mũi (trong khung PA-1+PA-2 đã chốt, chỉ `_pick_date`):**
> 1. `_nav_month` **CHỦ ĐỘNG MỞ LẠI panel** (click ô input) trước khi tìm nút — mat-datepicker mở lại theo tháng giá trị input hiện tại → từ tháng đó bấm next/prev tới mục tiêu; 2 lượt tìm (panel mở sẵn + sau mở lại).
> 2. **Đường gõ tay** `_try_typing`: input Angular Material nhận fill 'dd/mm/yyyy' + Enter (backdrop TRANSPARENT — input vẫn focusable); **verify chặt** giá trị đích — ăn là xong nhanh nhất; fail → dọn ô + rơi về đường panel.
> 3. `_dump_overlay`: attempt cuối fail → mở lại panel + dump DOM `.cdk-overlay-container`/`.mat-datepicker-content` ĐANG MỞ — soi class ô ngày + nút điều hướng thật, hết đoán mò.
>
> **Verify:** py_compile OK · unit **8/8 PASS** — mock `FakeCell.click` **ĐÓNG panel** đúng hành vi thật (đường mở-lại-panel chạy xuyên suốt test nhiều bước: T04→T10 nav 6 lần đều qua mở lại panel); typing ăn ngay; typing fail rơi về panel vẫn ăn. Không cần restart service (tool chạy subprocess riêng mỗi job).
>
> **Tiêu chí kiểm chứng:** job VCB kế tiếp — log ưu tiên thấy "gõ tay ăn (C.169b)" (nhanh nhất) hoặc "nav N" với **KHÔNG** còn nhãn "không có nút điều hướng tháng"; nếu vẫn fail → đọc `[debug] pick_date_Từ ngày` dump overlay trong log tool để vá đúng class thật (đường này chắc chắn có dữ liệu DOM panel).
>
> **Version:** KHÔNG bump (chờ lệnh Push). App tổng **5.1.0** / repo con **8.0.1**.

---

### GĐ 324 / C.170 (Trợ lý Freebuff): Fix "Báo cáo công nợ đặt trước không chạy được" — PA-3 (2026-10-06)

> **Yêu cầu của Đại ca (06/10):** tiếp việc dở của session trước — kiểm tra và
> khắc phục Báo cáo công nợ đặt trước không chạy được.

> **Chẩn đoán (probe thật, chuỗi bằng chứng — chi tiết đầy đủ ở AGENTS.md repo
> con C.170):** 20 job `bccn-dattruoc` done trong DB nhưng web "Lịch sử chạy báo
> cáo (0)" — call `loadSmedJobs` FILTERED bị **"The operation was aborted due to
> timeout"** trên Vercel (bắt response thật probe v7); BROAD vẫn nhanh. Gốc:
> sau C.163 sheet `tk-goi` 31.720 dòng làm result ~10-30MB → `result::text LIKE`
> từng dòng + kéo nguyên result job done mới nhất → vượt ~10s → abort.

> **Phát hiện quan trọng:** `smed_pull_jobs` nằm ở **GiondDB (SQL Server qua
> tunnel api_server)** — jsonpath Postgres KHÔNG chạy trên ODBC ("Incorrect
> syntax near '>'") — toàn bộ phân trang viết bằng T-SQL.

> **Đã làm PA-3 (Đại ca chốt):** (1) `loadSmedJobs` filtered làm gọn như broad +
> `result_meta` nạp riêng chỉ cho needsData/waitdownload; (2) `loadReportResult`
> thêm nhánh phân trang `{jobId, sheetKey, page, pageSize}` — slice TRONG SQL
> Server (OPENJSON ordinal + STRING_AGG — đo 1.5s/trang) + nhánh full CẮT sheet
> > 1000 dòng ngay trong SQL (JSON_MODIFY) gắn `total/truncated`; (3) SubSheets
> trang bccn tự tải trang 1 + pager ‹ › + ghi chú Subtotal theo trang.

> **Verify:** tsc 0 lỗi · E2E local **8/8 PASS** — lịch sử **20 job** (trước = 0)
> · TỔNG HỢP render · tk-goi "Trang 1/32" → bấm Trang sau → "Trang 2/32". Phụ:
> tunnel env local đã chết → chạy `scripts/update-tunnel-env.py` (GĐ 318) nạp
> tunnel mới `vatican-blair-dial-experimental` → login local hoạt động lại.

> **Tiêu chí kiểm chứng (production sau Push):** trang bccn hiện lịch sử (hết
> "(0)") + phân trang chuyển trang nhanh, không còn timeout.

> **Version:** KHÔNG bump (chờ lệnh Push). App tổng **5.1.0** / repo con **8.0.1**.

---

### GĐ 325 (Trợ lý Freebuff): PA-1 Push đợt GĐ 324/C.170 — bump 5.1.1 / 8.0.2 + LIVE production (2026-10-06)

> **Lệnh "Push" của Đại ca (06/10, sau GĐ 324).** Rà trùng lặp theo nguyên tắc 3:
> `main..agent-cli` + `main..pipeline-work` = RỖNG cả 2 repo; registry 0 🔒 dở;
> status sạch (chỉ file attachments deleted của phiên trước — không đụng).

> **Bump version (lúc Push — đúng quy tắc ĐA AGENT):** app tổng **5.1.0 → 5.1.1**
> (patch) — package.json + package-lock.json (2 chỗ root) + DEFAULT_VERSION
> app-shell.tsx; repo con **8.0.1 → 8.0.2** (patch — fix C.169/C.169b/C.170) —
> package.json + DEFAULT_VERSION app-shell.tsx. Checklist GĐ 138 ✓ (không thành
> phần nào ≥ 10; grep xác nhận hết sót version cũ).

> **Push:** app tổng `2ac799a..3ee82e7` (GĐ 322/323 claim+docs, GĐ 324
> claim+docs, GĐ 325 claim+bump) · repo con `681fd27..3bdbfab` (C.169, C.169b,
> C.170 `3f4fe94`, C.171 bump `3bdbfab`).

> **✅ Verify production:** curl app tổng = **5.1.1** · app con = **8.0.2**; E2E
> Playwright trên production (`scripts/gd324-verify-prod.mjs`) **7/7 PASS**:
> login → SSO → /m/bc-congno-dattruoc → **Lịch sử 20 job (trước fix = 0)** →
> TỔNG HỢP render → tk-goi "Trang 1/32" → bấm Trang sau → "Trang 2/32".

> **Version:** app tổng **5.1.1** / repo con **8.0.2** — ĐÃ PUSH + ĐÃ LIVE.

---

### GĐ 326 / C.172 (Trợ lý Freebuff): Báo cáo công nợ đặt trước — cột số lượng mũi/gói dạng số + Subtotal (2026-10-06)

> **Yêu cầu của Đại ca (06/10, 3 ảnh 09:49):** Bảng 1 + Bảng 2 trang bccn — các
> cột SỐ LƯỢNG mũi/gói đang căn trái kiểu text + dòng SUBTOTAL rỗng (chỉ cột
> tiền có). Chốt PA-3: client + builder.

> **Chẩn đoán:** builder chỉ liệt kê cột tiền vào `moneyCols` → khung bảng ép
> cột mũi về text + Subtotal rỗng. Chi tiết đầy đủ ở AGENTS.md repo con C.172.

> **Đã làm:** (1) client SubSheets `isQuantityColumn()` bổ sung cột mũi/gói còn
> nợ vào nhóm số — hiệu lực NGAY mọi job cũ; (2) builder `sql_reports.py`
> moneyCols `tt-cn`/`mt-cn` đầy đủ; (3) restart GIONG_SMED_Agent (rảnh — nạp
> builder mới, log web_agent_061026_102058, tunnel_ok).

> **Verify:** py_compile OK · tsc 0 lỗi · E2E local **9/9 PASS** (job mới kỳ
> 06/10: Bảng 1 SUBTOTAL 257 gói · 1.252 mũi · 928.151.350; Bảng 2 BH mũi 52 —
> khớp ảnh Đại ca) · SQL đối chứng result mới có moneyCols đủ (job cũ chỉ cột
> tiền). Code repo con `2476ed3`.

> **Version:** KHÔNG bump (chờ lệnh Push). App tổng **5.1.1** / repo con **8.0.2**.

---

### GĐ 327 / C.173 (Trợ lý Freebuff): Bảng 1 công nợ đặt trước — tách 2 cột mũi còn nợ + cột Kiểm tra nguồn độc lập (PA-3) (2026-10-06)

> **Yêu cầu của Đại ca (06/10, ảnh 10:47):** Bảng 1 'Tổng số gói / đặt trước
> theo trung tâm_CN' thêm 2 cột GIỮA cột 'Tổng số gói còn nợ' và cột 'Tổng
> số mũi còn nợ': 'Số mũi trong gói còn nợ' (f4 'Chưa tiêm') + 'Số mũi đặt
> trước còn nợ' (f1 VXĐT 'Sử dụng tốt'). Đại ca hỏi: 'Tổng số mũi còn nợ'
> có = tổng 2 cột mới? Có cột kiểm tra không?

> **Trả lời — ĐÚNG tuyệt đối** (Tổng tính bằng chính phép cộng 2 thành phần
> đó trong builder). ĐH chốt **PA-3** (trong 3 PA): thêm cột 'Kiểm tra' đếm
> lại từ nguồn ĐỘC LẬP (Bảng 3 chi tiết tk-goi 'Trạng thái tiêm' = 'Chưa
> tiêm') so với tổng → '✓ N' / '✗ lệch a/b'.

> **Đã làm (chi tiết đầy đủ ở AGENTS.md repo con C.173):** (1) builder
> `sql_reports.py` Bảng 1 tách 2 cột + cột Kiểm tra + moneyCols 5 cột số;
> (2) client `bc-congno-dattruoc.tsx` QUANTITY_COL_EXTRAS thêm 2 cột mới;
> (3) restart GIONG_SMED_Agent (rảnh — log 30 phút 0 job, slot 17:25 chưa
> tới) → RUNNING, log `web_agent_061026_113548`. Code repo con `19f489e`.

> **Verify 4 lớp:** py_compile OK · unit test mới offline **24 check PASS**
> (`sql_reports_bccn.test.py`) · tsc 0 lỗi · builder chạy trên GiondDB thật:
> **1.133 + 119 = 1.252** (tổng không đổi vs C.172), tiền 928.151.350, Kiểm
> tra ✓ 19/19 · **E2E UI local 10/10 PASS** (BẢNG 1 8 cột đúng thứ tự; BH
> 14 gói | 41 + 11 = 52 | 34.967.400 | '✓ 52' khớp ảnh Đại ca; SUBTOTAL
> 257 · 1.133 · 119 · 1.252 · 928.151.350). Lesson: innerText header chứa
> NBSP (U+00A0) — assertion phải normalize trước so chuỗi.

> **Tiêu chí kiểm chứng (sau Push):** trang bccn với job MỚI → Bảng 1 8 cột
> (2 cột mới dạng số + Subtotal; cột Kiểm tra '✓ N' toàn trung tâm). Job cũ
> đã lưu result không có 2 cột mới — chỉ hiện khi chạy lại báo cáo.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.1.1** / repo con **8.0.2**.

---

### GĐ 328 (Trợ lý Freebuff): PA-1 Push đợt GĐ 327/C.173 — bump 5.1.2 / 8.0.3 + LIVE production (2026-10-06)

> **Lệnh "Push" của Đại ca (06/10, sau GĐ 327).** Rà trùng lặp theo nguyên tắc 3:
> `main..agent-cli` + `main..pipeline-work` = RỖNG cả 2 repo; registry KHÔNG
> có 🔒 nào khác đang dở; status sạch (chỉ `attachments/*.zip` deleted của
> phiên trước — không đụng).

> **Bump version (lúc Push — đúng quy tắc ĐA AGENT):** app tổng **5.1.1 →
> 5.1.2** (patch) — package.json + package-lock.json (2 chỗ root) +
> DEFAULT_VERSION app-shell.tsx; repo con **8.0.2 → 8.0.3** (patch — fix
> C.173) — package.json + DEFAULT_VERSION app-shell.tsx. Checklist GĐ 138 ✓
> (5.1.2/8.0.3 mọi thành phần 1 chữ số; sót 5.1.1 chỉ là lru-cache/readdirp —
> thư viện ngoài trùng số trúng, giữ nguyên).

> **Push:** app tổng `3ee82e7..e7c69c7` (GĐ 327 claim+docs+unlock, GĐ 328
> claim+bump) · repo con `3bdbfab..49c346a` (C.173 code+docs, C.174 bump).

> **✅ Verify production (curl + E2E thật):** curl app tổng = **5.1.2** ·
> app con = **8.0.3** (domain không ghim deployment cũ). E2E prod mới
> (`gd328-verify-prod.mjs`) **8/8 PASS**: login → SSO → trang bccn → tạo job
> mới kỳ 06/10 → BẢNG 1 **8 cột đúng thứ tự** · BH 14 gói · **41 + 11 = 52** ·
> 34.967.400 · '✓ 52' · SUBTOTAL **257 · 1.133 · 119 · 1.252 · 928.151.350**
> khớp từng đồng · cột Kiểm tra ✓ 19/19 (không ✗).

> **Version:** app tổng **5.1.2** / repo con **8.0.3** — ĐÃ PUSH + ĐÃ LIVE.

---

### GĐ 329 (Trợ lý Freebuff): Điều tra chênh lệch 2 job bccn cùng kỳ 1.251→1.252 mũi — nguồn SMED đổi, C.173 vô tội (2026-10-06)

> **Yêu cầu của Đại ca (06/10):** cùng kỳ 01/01/2018→30/09/2026, job 00:44 ra
> 1.251 mũi / 927.106.350 nhưng job 13:33 ra 1.252 mũi / 928.151.350 (chênh
> 1 mũi / 1.045.000) — vì sao?

> **Chẩn đoán (chuỗi bằng chứng thật — chi tiết đầy đủ ở AGENTS.md repo con
> C.173b):** so sheet tt-cn 2 job qua endpoint `POST /jobs/sheet` (GĐ 329 thêm
> vào api_server) — snapshotFolder GIỐNG HỆT (11 folder), **chỉ Sài Đồng
> lệch 111→112 mũi / 83.787.700→84.832.700** đúng chênh; ds-le SĐ +453 dòng
> = khách đăng ký mới 04/10/2026 (Infanrix Hexa, Lê Phương Nhi, mã
> `101604120260766`, 1.045.000, 'Sử dụng tốt'); job download 01:48 tải 76
> file folder `2026-10-02` → ETL nạp đè; **job 10:33 chạy builder C.172 CŨ
> đã ra 1.252/928.151.350** → chênh có từ trước C.173; mở file nguồn
> `SĐ_…014134_1791225738.xlsx` (openpyxl) CÓ đúng dòng mã này; GiondDB mã ở
> folder 2026-10-02, src_file khớp.

> **KẾT LUẬN:** chênh lệch do **DỮ LIỆU NGUỒN ĐỔI** (khách SĐ đăng ký mới
> 04/10/2026, tải về 01:41-01:48 sáng 06/10) — mọi job sau 01:48 ra số mới;
> báo cáo là SNAPSHOT toàn bộ, KHÔNG khóa kỳ — đúng thiết kế; **C.173
> KHÔNG liên quan** (unit test đã chứng minh tổng không đổi).

> **Phụ (công cụ debug agent-side — commit repo con `6e8675f`):**
> `api_server.py` +`POST /jobs/sheet` (đọc 1 sheet result, không kéo
> result_full) +`POST /db/query` (SELECT chỉ-đọc ≤500 dòng) — chỉ Agent
> token; probe `scripts/gd329-probe-chenhlech.py` (so 2 job + verify nguồn).
> Lưu ý vận hành: process api_server không restart theo sc stop/start (nssm
> giữ process cũ — phải taskkill python.exe); **gist tunnel tự ghi URL mới
> `lasting-ladies-juan-republic…` (14:54)** — đã chạy
> `scripts/update-tunnel-env.py` đồng bộ `.env.local` 2 app.

> **Verify:** probe chạy lại khớp chuỗi bằng chứng (chỉ SĐ lệch; mã trong DB
> folder 2026-10-02) · py_compile OK · endpoint live (health tunnel_ok).

> **Version:** KHÔNG bump (chờ lệnh Push). App tổng **5.1.2** / repo con
> **8.0.3**.

---

### GĐ 330 / C.175 (Trợ lý Freebuff): Báo cáo công nợ đặt trước — Bảng 3 thêm cột Trung tâm + Ngày tiêm; +2 bảng công nợ mũi gói / đặt trước (2026-10-06)

> **Yêu cầu của Đại ca (06/10):** Bảng 3 "Tổng hợp Thống kê Gói và đặt trước"
> thêm cột 'Trung tâm' (mã viết tắt, bên phải STT) + 'Ngày tiêm' (ngày trả
> mũi, bên phải 'Trạng thái tiêm'); thêm 2 bảng ĐẶT DƯỚI CÙNG — "Bảng tổng
> hợp công nợ mũi khách hàng gói" + "Bảng tổng hợp công nợ mũi khách hàng
> đặt trước" (đại ca chốt phạm vi qua hỏi-đáp: CHỈ mũi còn nợ).

> **Đã làm (chi tiết đầy đủ ở AGENTS.md repo con C.175, code `3f05db3`):**
> builder `_iso2dmy` + map ngày trả mũi f2 theo (TT, mãTC, dịch vụ chuẩn hóa);
> tk-goi 18 cột; sheet cn-goi 15 cột (SL đã ĐK mọi trạng thái · đơn giá từng
> mũi KHÔNG cộng Subtotal — nguyên tắc 3 · SL còn nợ × đơn giá); sheet cn-dt
> 9 cột (f1 'Sử dụng tốt'); client order 2 bảng dưới cùng + isQuantity +
> subtotalExcludeCols; unit test T9-T12.

> **Verify:** py_compile · unit **27/27 PASS** · tsc 0 lỗi · E2E local
> **11/11 PASS** (Bảng 1 giữ nguyên 8 cột C.173; Bảng 3 18 cột — 200/200 dòng
> trang 1 có mã TT; cn-goi/cn-dt đúng cột + dưới cùng). Job thật sau restart
> (`BFE8A3C8`): 25.479 dòng có Ngày tiêm · cn-goi 247 nhóm · cn-dt 104 nhóm.

> **Vận hành:** restart GIONG_SMED_Agent 17:02 (chờ job BKCCN 19/19 của Đại
> ca xong mới restart — không cắt); tunnel URL đổi lần 3 → gist tự ghi +
> update-tunnel-env.py; E2E bài học: nút 'Chạy báo cáo' selector chung nhiều
> module — script verify qua result job done mới nhất, không bấm tạo job.

> **Version:** KHÔNG bump (chờ lệnh Push). App tổng **5.1.2** / repo con
> **8.0.3**.

### GĐ 331 / C.176 (Trợ lý Freebuff): Điều tra Bảng 3 bccn mất dòng dịch vụ — KẾT LUẬN DB thiếu 11.088 dòng GDTVX, data còn trong backup (2026-10-06)

> **Yêu cầu của Đại ca (06/10):** Bảng 3 công nợ đặt trước mất dòng dịch vụ — khách 'Trần Đình Bảo Khôi - 106092520250037' file nguồn 2 block ×29 dòng nhưng DB chỉ 25/23.

> **Chẩn đoán (bộ probe gd331-*.py, code `231e163` — chi tiết đầy đủ ở AGENTS.md repo con C.176):** parser đủ; backup stg_10GDTVX_backup_228i đủ 3055; DB thiếu 316 (id gap = dòng bị XÓA sau insert, không phải lỗi parse); mở rộng toàn hệ: thiếu **11.088 dòng** GDTVX (f4 8744 / f2 2172 / f1 680 / f3 107; f4: 21/52 file mất một phần). Nguyên nhân: đợt nạp lại sau migration 228i (26/09) — data đầy đủ còn trong backup → chờ Đại ca chốt phương án khôi phục.

> **Verify:** probe CHỈ ĐỌC, 0 đụng code app; py_compile OK. Entry repo con `2b27370` (sửa chỗ ghi entry — bỏ nhầm apps/banhang/AGENTS.md, ghi đúng AGENTS.md gốc repo con).

> **Version:** KHÔNG bump (chờ lệnh Push). App tổng **5.1.2** / repo con **8.0.3**.

---

### GĐ 332 / C.177 (Trợ lý Freebuff): PA-1 khôi phục data GDTVX từ backup 228i — hoàn tất (2026-10-07)

> **Đại ca chốt PA-1 (07/10):** khôi phục data thiếu 11.088 dòng GDTVX từ backup stg_10GDTVX_backup_228i (tiếp việc dở phiên 06/10 bị ngắt Internet).

> **Đã làm (code repo con `51b7f47`):** script gd331-restore-pa1.py (INSERT-ONLY theo khóa src_file+row_num — chỉ chèn dòng thiếu, không đụng dòng có sẵn) + re-dedupe 228j + verify so backup trong transaction.

> **Verify (bằng chứng thật):** chèn 4.659 dòng + re-dedupe xóa 11 hợp lệ (bản giữ folder mới đủ 11 dòng); verify sau khôi phục: f1/f2/f3 = **0 thiếu**, f4 còn thiếu 11 = đúng luật 228j (bản giữ folder mới đủ); file TS 106092520250037 đủ 29×2 block; py_compile OK.

> **Version:** KHÔNG bump (chờ lệnh Push). App tổng **5.1.2** / repo con **8.0.3**.

### GĐ 333 (Trợ lý Freebuff): PA-1 Push đợt GĐ 329-332 / C.173b-C.177 — bump 5.2.0 / 8.1.0 + LIVE production (2026-10-07)

> **Lệnh "Push" của Đại ca (07/10, sau GĐ 332).** Rà trùng lặp theo nguyên tắc 3: `main..agent-cli` + `main..pipeline-work` = **RỖNG cả 2 repo**; registry KHÔNG có 🔒 nào khác đang dở; status chỉ có untracked + file deleted của phiên trước — không đụng.

> **Bổ sung entry AGENTS.md app tổng GĐ 331/332** (phiên trước chỉ ghi registry + repo con, thiếu entry app tổng) — commit `120d484`.

> **Bump version (lúc Push — đúng quy tắc ĐA AGENT):** app tổng **5.1.2 → 5.2.0** (minor — C.175/GĐ 330 feature Bảng 3 + 2 bảng công nợ mới) — package.json + package-lock.json (2 chỗ root) + DEFAULT_VERSION app-shell.tsx — đủ 4 chỗ (còn "5.1.2" chỉ là safe-buffer 5.1.2 / isbot ^5.1.22 thư viện ngoài trùng số trúng — giữ nguyên, lesson GĐ 328); repo con **8.0.3 → 8.1.0** (minor — C.175 + C.177) — package.json + DEFAULT_VERSION — đủ 2 chỗ. Checklist GĐ 138 ✓ (không thành phần nào ≥ 10).

> **Push:** app tổng `f5173db..7e3cd56` (GĐ 329 claim+docs · GĐ 330 claim+docs · GĐ 331/332 entry bổ sung · GĐ 333 claim+bump) · repo con `2f3f620..4658e97` (C.175 code+docs · C.176 docs+probe · C.177 code+docs · C.178 bump).

> **✅ Verify production (Playwright — `scripts/gd333-verify-prod.mjs`):** app tổng `giong-vn-v6.vercel.app` = **VERSION 5.2.0** · app con `giong-banhang.vercel.app` = **VERSION 8.1.0** — cả 2 ✅ OK, không ghim deployment cũ (khác sự cố GĐ 306).

> **Version:** app tổng **5.2.0** / repo con **8.1.0** — ĐÃ PUSH + ĐÃ LIVE.

---

### GĐ 335 (Trợ lý Freebuff): Sửa chính tả "Chương trình LOYTY" → "Chương trình LOYALTY" — Sidebar app con + catalog (PA-3) (2026-10-07)

> **Yêu cầu của Đại ca (07/10):** sửa tiêu đề thanh Sidebar app con "Chương
> trình LOYTY" thành "Chương trình LOYALTY". Chốt PA-3 (trệt để): sửa cả
> nhãn + mô tả repo con + catalog app tổng; URL /m/nhap-loyty giữ nguyên.

> **Đã làm:** (1) repo con `apps/banhang/src/lib/nav.ts` — label "Chương
> trình LOYTY" → LOYALTY + desc "Nhập dữ liệu chương trình LOYTY (…)" →
> LOYALTY; (2) app tổng `src/lib/banhang-catalog.ts` — label "Chương trình
> LOYTY (NHẬP DỮ LIỆU)" → LOYALTY. Chi tiết đầy đủ ở AGENTS.md repo con C.180.

> **Verify:** tsc EXIT 0 cả 2 app (app tổng 5.2.0 · repo con 8.1.0) · grep
> case-sensitive "LOYTY" = 0 match trong code hiển thị (còn sót duy nhất
> ở docs lịch sử — không đụng). Phát hiện vân hành: repo con đang có file
> `bc-congno-dattruoc.tsx` modified của phiên GĐ 334/C.179 dở — KHÔNG đụng.

> **Tiêu chí kiểm chứng:** Sidebar app con nhóm NHẬP DỮ LIỆU|MUA HÀNG hiện
> "Chương trình LOYALTY"; vào từ app tổng hiện "Chương trình LOYALTY (NHẬP
> DỮ LIỆU)". Sau Push: kiểm tra trên Vercel.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.2.0** / repo con **8.1.0**.

### GĐ 334 / C.179 (Trợ lý Freebuff): Nút "Tải Excel toàn bộ" sheet lớn bccn — lấy đủ 35.864 dòng không phải xem 36 trang — PA-1 (2026-10-07)

> **Yêu cầu của Đại ca (07/10, ảnh):** lấy toàn bộ bảng "Tổng hợp Thống kê Gói
> và đặt trước" (tk-goi — 36 trang × 1.000 dòng = 35.864 dòng) mà không phải
> tải từng trang trên app. ĐH chốt **PA-1** (trong PA-1/2/3: PA-2 script từ
> DB, PA-3 chạy builder — bị loại vì data live không khớp snapshot job).

> **Chẩn đoán:** nút "Tải Excel" của khung chỉ tải 1.000 dòng trang đang nạp
> (GĐ 324 cắt sheet > 1.000 dòng server-side). Pattern có sẵn: C.44 TX-DS
> nút "Tải Excel TOÀN BỘ" loop trang ghép mảng.

> **Đã làm (code repo con `c27231c` — chi tiết ở AGENTS.md repo con C.179):
> chỉ file `bc-congno-dattruoc.tsx` — (1) nút "Tải Excel toàn bộ (N dòng)"
> trong pager MỌI sheet lớn: loop `loadReportResult` từng trang × 1.000 dòng,
> ghép mảng, `downloadExcel` 1 file về Downloads; (2) SUBTOTAL tự build TRỪ
> cột đơn giá (nguyên tắc 3 — `isUnitPriceCol` + exclude cn-goi); (3) script
> E2E `gd334-verify-local.mjs`.

> **Verify:** tsc 0 lỗi · E2E local: nút hiện đúng "Tải Excel toàn bộ (35.864
> dòng)" → "Đang tải trang 1/36…" → file tải về đủ **35.864 dòng (STT
> 1→35.864) + 18 cột đúng + ô 'Giá' SUBTOTAL RỖNG** ✓. Phụ: tunnel đổi URL
> lần nữa (missouri-singh) — `update-tunnel-env.py`; lesson vận hành: taskkill
> theo PID npm shim KHÔNG ăn — phải kill PID node THẬT giữ port (netstat -ano)
> — server cũ sống âm thầm làm server mới fail EADDRINUSE → app fetch tunnel
> chết (knee-supplies).

> **Tiêu chí kiểm chứng (production sau Push):** trang bccn mở job có sheet
> lớn → nút "Tải Excel toàn bộ (N dòng)" bấm 1 lần → file đủ N dòng về
> Downloads (~30-90s), cột đơn giá không cộng SUBTOTAL.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.2.0** / repo con **8.1.0**.

---

### GĐ 336 (Trợ lý Freebuff): Sidebar app con — nhóm "DANH MỤC" đứng đầu NHẬP DỮ LIỆU + 5 module bảng đọc GiondDB (PA-2) (2026-10-07)

> **Yêu cầu của Đại ca (07/10):** (1) nhóm "DANH MỤC" ngang bậc KHO HÀNG /
> MUA HÀNG trong NHẬP DỮ LIỆU; (2) 5 bậc con 1-5 (Vắc Xin / Nhà cung cấp /
> Trung tâm / Khách hàng / Khác). Chốt: DANH MỤC ĐỨNG ĐẦU nhóm + **PA-2**
> (khung + bảng ĐỌC data thật — không chỉ placeholder). Chi tiết đầy đủ ở
> AGENTS.md repo con C.181.

> **Nguồn data GiondDB (probe trước khi code):** `vaccines` 52 dòng ·
> NCC = bên bán hóa đơn GTGT mua vào `mia_hddt_hd` gộp theo MST (hiện 1
> NCC — CTCP Gióng VN, 386 HĐ) · `centers` 20 dòng · khách hàng
> `stg_10gdtvx_f1_dangky` gộp mã tra cứu (3.143). Mục "Khác" placeholder
> khung — chờ Đại ca chốt nguồn.

> **Đã làm app tổng:** `src/lib/banhang-catalog.ts` +5 lá nhóm
> `banhang-misa` (5 module Danh mục — backward-compat như GĐ 223).
> Repo con: server function `-danh-muc.ts` + component `danh-muc-module`
> (tìm kiếm + phân trang + 4 nguyên tắc định dạng) + 5 route `/m/danh-muc-*`
> + nav.ts node "DANH MỤC" icon Library đứng đầu children NHẬP DỮ LIỆU.

> **Verify:** tsc EXIT 0 cả 2 app · routeTree regen · **E2E SSO local
> 9/9 PASS** (`giong-apps/apps/banhang/scripts/gd336-verify-e2e.mjs` —
> login 3000 → SSO 3100: sidebar DANH MỤC → KHO HÀNG → MUA HÀNG đúng
> thứ tự + 5 mục; 4 trang data: VX 52 · NCC 1 · TT 20 · KH 3.143 dòng).
>
> **Vận hành:** phiên GĐ 334/C.179 đã commit phần code nút Tải Excel giữa
> phiên (worktree chung thấy qua git log) — không đụng file của nhau.

> **Tiêu chí kiểm chứng (sau Push):** app con → NHẬP DỮ LIỆU thấy DANH MỤC
> trên KHO HÀNG; 5 trang hiện đúng data; production cần tunnel GiondDB sống.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.2.0** / repo con **8.1.0**.

### GĐ 337 (Trợ lý Freebuff): PA-1 Push đợt GĐ 334-336 / C.179-C.181 — bump 5.3.0 / 8.2.0 + LIVE production (2026-10-07)

> **Lệnh "Push" của Đại ca (07/10, sau GĐ 336).** Rà trùng lặp theo nguyên tắc 3:
> `main..agent-cli` + `main..pipeline-work` = **RỖNG cả 2 repo**; registry KHÔNG
> có 🔒 nào khác đang dở; status sạch (chỉ untracked logs/screenshots + 1 file
> deleted cũ — không đụng); email `cuongpk.giong04@gmail.com` ✓.

> **Bump version (lúc Push — đúng quy tắc ĐA AGENT):** app tổng **5.2.0 → 5.3.0**
> (minor — GĐ 336 feature nhóm DANH MỤC + 5 module · GĐ 335 fix chính tả) —
> package.json + package-lock.json (2 chỗ root; dòng 4095/5349 =
> @vitejs/plugin-react + eslint-plugin-react-hooks 5.2.0 thư viện ngoài trùng
> số trúng — giữ nguyên, lesson GĐ 328) + DEFAULT_VERSION app-shell.tsx — đủ
> 4 chỗ; repo con **8.1.0 → 8.2.0** (minor — C.181 feature DANH MỤC + C.179
> feature Tải Excel toàn bộ + C.180 fix chính tả) — package.json +
> DEFAULT_VERSION — đủ 2 chỗ. Checklist GĐ 138 ✓ (không thành phần nào ≥ 10).

> **Push:** app tổng `a4b299b..708ac0a` (GĐ 334 docs+unlock · GĐ 335
> claim+code+docs · GĐ 336 claim+code+docs · GĐ 337 claim+bump) · repo con
> `4658e97..262ce8e` (C.180 fix LOYALTY · C.179 code+docs+fix script · C.181
> DANH MỤC + bump).

> **✅ Verify production (curl --compressed + grep -a):** app tổng
> `giong-vn-v6.vercel.app` = **VERSION 5.3.0** · app con
> `giong-banhang.vercel.app` = **VERSION 8.2.0** — cả 2 ✅ OK, không ghim
> deployment cũ (khác sự cố GĐ 306). Lesson nhỏ: curl domain Vercel trả HTML
> nén binary → grep cần `--compressed` + `-a` mới bắt được chuỗi version.

> **Version:** app tổng **5.3.0** / repo con **8.2.0** — ĐÃ PUSH + ĐÃ LIVE.

### GĐ 338 (Trợ lý Freebuff): PA-1 Fix logic công nợ đặt trước — cn-dt còn nợ khách đã TRẢ mũi + khóa L2 theo GIÁ (2026-10-07)

> **Yêu cầu của Đại ca (07/10, 2 ảnh + chọn PA-1):** Bảng công nợ mũi khách
> hàng đặt trước (cn-dt) còn nợ khách ĐÃ TRẢ mũi — Dương Trà My
> 106081720140038 Vaxigrip Tetra nợ 1 mũi 350.000 nhưng f2 ghi Ngày trả mũi
> 06/08/2026 → phải loại khỏi công nợ; kiểm tra tất cả trường hợp đã trả +
> logic GÓI (cn-goi).

> **Chẩn đoán (probe thật SQL f1/f2 mã này — chi tiết đầy đủ ở AGENTS.md
> repo con C.182):** (1) BUG GỐC: f1 'Sử dụng tốt' = trạng thái CÒN HIỆU —
> SMED không đổi khi trả mũi (dòng trả mũi ghi riêng f2) → 150 nhóm/222 mũi/
> 307.915.000đ còn nợ trong đó ~134 mũi đã trả; (2) BUG KHÓA L1: khóa GĐ 330
> (TT+mãTC+dịch vụ chuẩn hóa) SAI cho f1 — f2.ten_dich_vu của lượt trả
> 06/08/2026 ghi dịch vụ ĐỢT TRƯỚC ('Influvac Tetra') khác tên mũi nợ
> ('Vaxigrip Tetra 0.5ml') → trúng lượt cũ; (3) KHÓA ĐÚNG L2: theo GIÁ —
> f2.gia_dat_truoc = f1.gia (350.000 = 350.000).

> **Đã làm (PA-1 — code repo con `04e076a`):** ngay_tra2_map L2 theo giá →
> cn-dt lọc + cột 'Kiểm tra nguồn' (✓/✗ từ f2 độc lập) · Bảng 1 'Số mũi đặt
> trước còn nợ'+Tổng+tiền cùng L2 · tk-goi fix phụ 2 chỗ (dòng f1 lẻ không
> f3 mất khỏi Bảng 3 từ 228i → pkg_f1 fallback; f1 có f2 trả → 'Đã tiêm' +
> Ngày tiêm). Unit 46/46 PASS exit 0 + script gd338-verify-truth.py.

> **Verify (đối chứng 1-1 cùng kỳ 01/01/2018→30/09/2026 với job cũ 518D513F):**
> cn-dt **150→52 nhóm · 222→88 mũi · 307.915.000→116.730.000đ** (−191.185.000
> = đúng tiền đã trả) · Bảng 1 gói **1.332 = 1.332** KHÔNG đụng (surgical) ·
> Kiểm tra nguồn ✓ 52/✗ 0 · DTM biến mất + Bảng 3 'Đã tiêm' 06/08/2026 đúng ảnh.

> **Tiêu chí kiểm chứng (sau Push):** trang bccn job MỚI → cn-dt hết khách đã
> trả (Dương Trà My hết 350.000); Bảng 1 giảm khớp; job cũ là snapshot — chạy
> lại báo cáo để thấy số mới.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.3.0** / repo con **8.2.0**.

### GĐ 340 (Trợ lý Freebuff): PA-1 Push đợt GĐ 338/C.182 + GĐ 339/C.183 — bump 5.3.1 / 8.2.1 + LIVE production (2026-10-07)

> **Lệnh "Push" của Đại ca (07/10, sau GĐ 338).** Rà trùng lặp theo nguyên tắc
> 3: `main..agent-cli` + `main..pipeline-work` = **RỖNG cả 2 repo**; registry
> KHÔNG có 🔒 nào khác dở (GĐ 339/C.183 của phiên khác đã unlock ✅ — code
> `a8cc43b` + docs, kèm đẩy trong đợt này); status sạch (chỉ untracked logs/
> screenshots + 1 file deleted cũ — không đụng); email `cuongpk.giong04@gmail.com` ✓.

> **Bump version (lúc Push — đúng quy tắc ĐA AGENT):** app tổng **5.3.0 →
> 5.3.1** (patch — fix GĐ 338) — package.json + package-lock.json (2 chỗ
> root) + DEFAULT_VERSION app-shell.tsx — đủ 4 chỗ (sót "5.3.0" chỉ là
> estraverse 5.3.0 thư viện ngoài trùng số trúng — giữ nguyên, lesson GĐ
> 328); repo con **8.2.0 → 8.2.1** (patch — C.182 fix + C.183 feature nhỏ
> dòng phụ Tổng mũi) — package.json + DEFAULT_VERSION — đủ 2 chỗ.
> Checklist GĐ 138 ✓ (không thành phần nào ≥ 10).

> **Push:** app tổng `eacd2aa..` (GĐ 338 docs + GĐ 340 claim+bump) · repo con
> `425bb36..` (C.182 code+docs + C.183 code+docs + C.184 bump).

> **✅ Verify production (curl --compressed + grep -a):** app tổng
> `giong-vn-v6.vercel.app` = VERSION **5.3.1** · app con
> `giong-banhang.vercel.app` = VERSION **8.2.1** — ✅ LIVE (kết quả chi tiết
> ở lần chạy verify trong phiên).

> **Tiêu chí kiểm chứng của Đại ca:** trang bccn job MỚI → cn-dt hết khách
> đã trả (Dương Trà My hết 350.000) · Báo cáo bán hàng → dòng phụ "Tổng mũi"
> dưới SUBTOTAL (24 + 34).

> **Version:** app tổng **5.3.1** / repo con **8.2.1** — ĐÃ PUSH + ĐÃ LIVE.

---

### GĐ 341 / C.185 (Trợ lý Freebuff): Sidebar NHẬP DỮ LIỆU — nhóm "BÁN HÀNG" CUỐI nhóm + 2 lá khung placeholder "Bảng giá dịch vụ" / "Bảng TH GB-KM_GN-CK_LN" (2026-10-07)

> **Yêu cầu của Đại ca (07/10):** (1) nhóm BÁN HÀNG ngang bậc DANH MỤC/KHO HÀNG/
> MUA HÀNG trong NHẬP DỮ LIỆU, đặt CUỐI theo thứ tự DANH MỤC → KHO HÀNG → MUA
> HÀNG → BÁN HÀNG; (2) 2 bậc con: "Bảng giá dịch vụ" + "Bảng TH GB-KM_GN-CK_LN".

> **ĐH chốt PA-1** (khung placeholder / bảng đọc data / form nhập tay): khung
> placeholder — probe GiondDB KHÔNG có bảng nguồn giá/khuyến mại/chiết khấu
> (vaccines chỉ có ma_smed/ten_hang/dvt) → nội dung làm khi có nguồn/file mẫu.
>
> **⚠️ Số giai đoạn:** ban đầu claim GĐ 340/C.184 — sau phát hiện phiên khác
> đã claim GĐ 340 trước (Push đợt C.182+C.183 — commit `896fdc9`, bump
> `d12ab52`/`daced1c` + LIVE `3686d88`) → theo quy tắc GĐ 285 đổi số thành
> **GĐ 341 / C.185** (commit local chưa push đã replay với số mới).
>
> **Đã làm:** repo con `4e09142` (code) + `7156d6d` (docs — chi tiết ở
> AGENTS.md repo con C.185): nav.ts NHAP_BAN_HANG_LEAFS + node BÁN HÀNG
> CUỐI NHẬP DỮ LIỆU (icon ShoppingCart) · 2 route placeholder
> `/m/banhang-bang-gia-dich-vu` + `/m/banhang-th-gbkm-gnck-ln` · smed-auth
> ROUTE_TO_GROUP 2 route → nhóm banhang-misa · script E2E
> gd-c185-verify-banhang-nav.mjs. App tổng: catalog chip "(BÁN HÀNG)"
> (commit `75d0e6e`).
>
> **Verify:** tsc EXIT 0 cả 2 app · E2E SSO local **6/6 PASS** — login →
> SSO → thứ tự sidebar DANH MỤC→KHO HÀNG→MUA HÀNG→BÁN HÀNG (cuối) → 2 lá
> hiện (SidebarNav tự sinh số 1-2) → cả 2 trang khung mở đúng URL. Bài học:
> `:text("BÁN HÀNG")` trúng logo "GIONG BÁN HÀNG" — click theo textContent
> trim; kiểm thứ tự bằng đoạn giữa MUA HÀNG→DOWNLOAD DỮ LIỆU.
>
> **Tiêu chí kiểm chứng (sau Push):** Sidebar app con → NHẬP DỮ LIỆU thấy 4
> nhóm đúng thứ tự chốt; BÁN HÀNG có 2 lá mở khung placeholder.
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.3.1** / repo con **8.2.1**.

### GĐ 342 (Trợ lý Freebuff): Khảo sát Headroom — cài headroom-ai v0.40.0 + chuỗi 3 lớp cho Claude Code (PA-1a) + benchmark nén trên dữ liệu thật (PA-2) (2026-10-07)

> **Yêu cầu của Đại ca (07/10):** đọc thư mục `D:\DuLieuChung\CUONG_2026\headroom-main` (repo headroomlabs-ai/headroom — Apache 2.0) — xem có áp dụng được gì cho giong-vn-v6.

> **Kết luận khảo sát:** Headroom = lớp nén context cho AI agent (nén tool output/log/JSON trước khi vào context — 60-95%, CCR có xin lại bản gốc; proxy/wrap/MCP + memory đa agent + `headroom learn`). KHÔNG nhét vào code app (app không gọi LLM) — áp dụng cho **quy trình làm việc với agent local của Đại ca**, trúng bài toán tràn context GĐ 319. Freebuff (cloud) KHÔNG wrap được.

> **ĐH chốt:** PA-1 + PA-2; sau đó chốt PA-1a chuỗi 3 lớp (Claude Code → Headroom 8787 → 9router 20128) + đồng ý sửa settings.json.

> **PA-1 — đã làm:** (1) `uv tool install "headroom-ai[all]"` → v0.40.0, `headroom doctor` OK; (2) phát hiện Claude Code đang route 9router port 20128 (`sk_9router`, model ag/cx/*) — docs chính thức Claude Code xác nhận settings.json env THẮNG shell env → phải sửa settings.json; (3) backup `settings.json.gd342-bak` + đổi `ANTHROPIC_BASE_URL` 20128→8787; (4) script `scripts/gd342-headroom-proxy.bat` (set `ANTHROPIC_TARGET_API_URL=http://127.0.0.1:20128/v1` + chạy proxy 8787).
> **Verify chuỗi:** proxy livez HTTP 200; routing đúng `/v1/messages → http://127.0.0.1:20128`; log test request: nhận request → `compression_first_stage` 5.97s (nén chạy) → `ConnectError` tới 20128 (9router đang TẮT lúc test) → chuỗi đúng thiết kế, chờ 9router mở là chạy thật.

> **PA-2 — benchmark (`scripts/gd342-headroom-bench.py`, tokenizer gpt-4o, tool env uv):** AGENTS_ARCHIVE.md 874KB: 133.670→47.018 (**65%**) · JSON backup app 545KB: 241.680→35.447 (**85%**) · log dev gộp 62KB: 20.384→15.759 (**23%**) · mô phỏng tk-goi 35.864 dòng: 3.338.475→751.848 (**77%** — mẫu synthetic theo cấu trúc sheet thật).
> **Lesson kỹ thuật:** `compress()` 0.40 CHỈ nén TOOL OUTPUT (`transforms_applied: router:protected:user_message` — message user được bảo vệ) — benchmark phải mô phỏng hội thoại tool-call (user → assistant tool_calls → tool result) mới thấy tiết kiệm; lỗi Windows console cp1252 → `sys.stdout.reconfigure(encoding="utf-8")`.

> **Cách dùng của Đại ca:** mở 9router như thói quen → chạy `scripts\gd342-headroom-proxy.bat` (giữ cửa sổ mở) → mở Claude Code bình thường. Quay về 9router thuần: copy `settings.json.gd342-bak` đè lại `settings.json` (trong `C:\Users\Administrator\.claude\`) — KHÔNG cần gỡ headroom.

> **Tiêu chí kiểm chứng:** sau khi Đại ca mở 9router + chạy .bat + mở claude → `headroom doctor` (khác shell mới: probe 8787) thấy proxy pass; `headroom dashboard`/`savings` hiện số token tiết kiệm sau vài lượt dùng.

> **Version:** KHÔNG bump (không đụng code app — chỉ scripts công cụ + docs, chờ lệnh Push — quy tắc ĐA AGENT). App tổng **5.3.1** / repo con **8.2.1**.

### GĐ 343 / C.186 (Trợ lý Freebuff): Điều tra + fix DTTHC mất 3 trung tâm Hương Mạc / Quốc Oai / Tiên Du — dedupe đa-lượt loại nhầm file bổ sung — PA-1 (2026-10-07)

> **Câu hỏi của Đại ca (07/10):** Báo cáo cuối ngày - Đối soát HĐ-XK chạy hôm nay
> thiếu 3 trung tâm HM/QO/TD — quy trình download cần file gì + vì sao thiếu?
>
> **Chẩn đoán (probe thật `/db/query` GĐ 329 + file Excel gốc nguồn OUTPUT):**
> báo cáo ghép 3 nguồn B=DTTHC (stg_3DTTHC) / C=BKX PX- (stg_6BKX) / E=BKCT ký
> hiệu (stg_11BKCT) — ngày 07/10 C+E của 3 TT ĐỦ, thiếu chính xác B. Nghiệp vụ
> SMED tải DTTHC từ 2 cổng: **tcgiongts** (header TCGIONGTS) = đúng 3 trung
> tâm phụ QUỐC OAI/HƯƠNG MẠC/TIÊN DU + **tcgiong** = 16 TT chính (tool 20 chạy
> 2 tài khoản Account_3/Account_16). File gốc 07/10 còn NGUYÊN trên OUTPUT
> (file 17:29 = 3 TT 41 mũi; 17:30 = 16 TT 145 mũi) — BỔ SUNG nhau 19 TT, KHÔNG
> phải 2 lượt nạp đè. import_log chứng minh cả 2 file nạp DB 17:30:35 nhưng stg chỉ
> còn 17 dòng file 16-TT → **thủ phạm: dedupe đa-lượt GĐ 284/C.137** — nhóm
> (report_date, center=NULL; DTTHC không cột center, tên TT nằm col2) giữ file
> mtime MỚI nhất → xóa mất file TS từ **25/09** (13/13 ngày chỉ còn 1 file/ngày;
> import_log 60 file bị ảnh hưởng). Chi tiết đầy đủ ở AGENTS.md repo con C.186.
>
> **PA-1 Đại ca chốt (hỏi-đáp 4 lựa chọn) — đã làm (app tổng docs-only):**
> 1. `etl/etl_import.py` repo con — dedupe_multiload SKIP `stg_3dtthc` (2 file
>    BỔ SUNG — khử trùng (ngày,TT) không đúng mô hình 2-file-nạp-đè); ETL
>    service chạy subprocess riêng mỗi lần → hiệu lực NGAY, không restart.
> 2. `scripts/gd343-clear-importlog-3dtthc.py` (repo con) — xóa 60 dòng
>    import_log 3DTTHC từ 25/09 (file gốc còn nguyên → quét lại được).
> 3. ETL `--only-dir 3.DTTHC` — nạp lại 28 file / 294 dòng / 0 lỗi.
> 4. PHÁT HIỆN THÊM khi verify: folder tay tên '02-10-2026' không khớp
>    %Y-%m-%d → ETL fallback THỜI ĐIỂM HIỆN TẠI — 2 file của ngày 04/10 bị nạp
>    NHẦM 07/10 (trùng dư toàn 0 nên tổng không sai, cấu trúc bẩn). Script
>    `gd343-fix-folder-tay.py`: DELETE 38 dòng 2 src_file + INSERT lại đúng
>    report_date 04/10 (19 dòng) + import_log sửa đúng ngày.
>
> **Verify (đối chứng file gốc từng đơn vị):** đủ **19 TT × 13 ngày**
> (25/09→07/10) — 04/10 chủ nhật 19 tên/0 mũi đúng file; 07/10 tổng B **186 =
> 145(tcgiong) + 41(tcgiongts)** ✓. Chạy THẬT builder `dsxk_comparison
> ("07/10/2026")`: **20 dòng** — Hương Mạc 11/5.280.000 · Quốc Oai 24/14.615.000
> · Tiên Du 6/5.150.000 (khớp file gốc từng đơn vị) · TỔNG CỘNG 186/143.130.000
> — hết thiếu.
>
> **Tiêu chí kiểm chứng:** web bc-cuoi-ngay chạy kỳ 07/10 (hoặc kỳ cũ ≥25/09)
> → đủ 19 trung tâm; job DTTHC mai không còn mất file TS (dedupe đã skip).
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.3.1** / repo con **8.2.1**.

### GĐ 344 (Trợ lý Freebuff): PA-1 Push đợt GĐ 343/C.186 — bump 5.3.2 / 8.2.2 + LIVE production (2026-10-07)

> **Lệnh "Push" của Đại ca (07/10, sau GĐ 343).** Rà trùng lặp theo nguyên tắc 3:
> `main..agent-cli` + `main..pipeline-work` = **RỖNG cả 2 repo**; registry KHÔNG
> có 🔒 nào khác dở; status chỉ file deleted của phiên khác (không đụng); email
> `cuongpk.giong04@gmail.com` ✓.
>
> **Bump version (lúc Push — đúng quy tắc ĐA AGENT):** app tổng **5.3.1 → 5.3.2**
> (patch — fix GĐ 343) — package.json + package-lock.json (5 chỗ) +
> DEFAULT_VERSION app-shell.tsx; repo con **8.2.1 → 8.2.2** (patch — C.186 fix
> DTTHC) — package.json + DEFAULT_VERSION. Checklist GĐ 138 ✓ (mọi thành phần 1
> chữ số; grep 0 sót version cũ).
>
> **Push:** app tổng `3686d88..30a8068` (GĐ 343 claim+docs · GĐ 344 claim+bump) ·
> repo con `b0eb50d..f14b751` (C.186 code+docs · C.187 bump).
>
> **✅ Verify production (curl --compressed + grep -a):** app tổng
> `giong-vn-v6.vercel.app` = **5.3.2** · app con `giong-banhang.vercel.app` =
> **8.2.2** — cả 2 LIVE, không ghim deployment cũ.
>
> **Tiêu chí kiểm chứng nghiệp vụ:** web bc-cuoi-ngay chạy lại kỳ 07/10 (hoặc
> kỳ ≥25/09) → đủ 19 trung tâm (HM/QO/TD hiện số khớp file SMED); job DTTHC
> mai không còn mất file 3 trung tâm.
>
> **Version:** app tổng **5.3.2** / repo con **8.2.2** — ĐÃ PUSH + ĐÃ LIVE.

### GĐ 345 (Trợ lý Freebuff): Khảo sát skills-main (mattpocock/skills) — PA-4 cài 5 skill vào `.agents/skills/` + quy tắc nạp skill (2026-10-07)

> **Yêu cầu của Đại ca (07/10):** đọc thư mục
> `D:\DuLieuChung\CUONG_2026\skills-main` (repo mattpocock/skills v1.3.1, MIT) —
> xem có áp dụng được gì cho giong-vn-v6. Đây là bộ **skill cho AI coding agent**
> (~27 SKILL.md markdown thuần — hướng dẫn hành vi, KHÔNG phải code) chia
> `engineering/` (tdd, diagnosing-bugs, code-review...) + `productivity/`
> (grilling, handoff...).
>
> **Đối chiếu với dự án — 5 skill trúng bài toán thật:**
>
> | Skill | Trúng chỗ nào |
> |---|---|
> | **handoff** | Soạn doc bàn giao cuối phiên — tiếp việc dở bị ngắt (GĐ 331/332) + checkpoint context ~70% (GĐ 319) |
> | **diagnosing-bugs** | 6 pha chẩn đoán: feedback loop TRƯỚC → tái hiện + minimize → 3-5 giả thuyết xếp hạng → đo 1 biến/lần → fix + regression test — chuẩn hóa cách em làm tự phát GĐ 329/331/343 |
> | **grilling** | Hỏi theo VÒNG: mỗi vòng hỏi cả nhóm câu hỏi đã sẵn sàng + kèm đáp án đề xuất — nâng cấp Bước 2+3 quy trình 5 bước |
> | **code-review** | Rà diff 2 trục song song (Standards + Spec) + 12 smell Fowler — dùng trước khi Push / rà trùng lặp |
> | **to-tickets** | Chia việc lớn thành vertical slices + blocking edges, mỗi slice vừa 1 context window — khớp mục 4 GĐ 319 (phiên dài chia chặng) |
>
> **ĐH chốt PA-4** (trong 4 lựa chọn; từ chối PA-2 full bộ — loãng chồng chéo,
> PA-3 chỉ chép tư tưởng — ngược quy tắc giữ AGENTS.md gọn GĐ 319) + đặt tại
> **`.agents/skills/`** (chuẩn installer `npx skills` — Freebuff nạp trực tiếp).
>
> **Đã làm (docs-only, 0 đụng code app):** copy NGUYÊN VĂN 5 SKILL.md vào
> `.agents/skills/<tên>/` — **md5 khớp 5/5 với nguồn** · `git check-ignore` xác
> nhận `.agents/` không bị gitignore.
>
> **📌 QUY TẮC NẠP SKILL (hiệu lực GĐ 345 — áp dụng mọi Agent làm app tổng):**
>
> | Tình huống | Skill nạp |
> |---|---|
> | Anh nói "tiếp việc dở" / phiên ngắt giữa chừng / checkpoint context ~70% | `handoff` |
> | Anh báo bug / lỗi / "sai số" / chậm — cần chẩn đoán | `diagnosing-bugs` |
> | Nhiệm vụ mới cần hỏi-đáp chốt phương án (Bước 2+3) | `grilling` |
> | Trước khi nói "Push" / anh yêu cầu rà lại đợt thay đổi | `code-review` |
> | Việc lớn phải chia nhiều giai đoạn/chặng | `to-tickets` |
> | **MỌI lần viết code** — `ponytail` MẶC ĐỊNH BẬT mức **full** (GĐ 349): bậc thang 7 rung YAGNI→reuse→stdlib→native→dep→1 dòng→min code; fix bug chạm GỐC qua caller; lười có chủ đích đánh dấu `ponytail:` — anh nói "bỏ lười" để tắt | `ponytail` |
> | Chọn/kiểm tra loại chart dashboard (Recharts) — tra TRƯỚC khi vẽ | `ui-ux-pro-max` (`--domain chart`) |
> | Form/table/dialog mới — dò UX + accessibility (contrast 4.5:1, focus, label) | `ui-ux-pro-max` (`--domain ux`) |
> | Pattern hiệu năng React 19 (useMemo/useCallback/key/effect/context) | `ui-ux-pro-max` (`--stack react`) |
> | Trang mới/landing/hero — chọn style + màu + font theo ngành | `ui-ux-pro-max` (`--domain style/color/typography` · `--design-system`) |
> | Viết logic mới / fix bug — viết test tái hiện TRƯỚC khi sửa (Prove-It: test đỏ → fix → xanh), RED→GREEN→REFACTOR; test DAMP over DRY; khớp văn hóa `*.test.ts/.mjs` hiện có | `test-driven-development` (GĐ 393) |
> | Phiên dài / tràn context / phải cắt bớt — bảng "cắt gì trước · giữ gì đến cùng", trim từ 75%, compress-before-drop, ranh giới phiên restart an toàn (bổ trợ quy tắc GĐ 319) | `context-engineering` (GĐ 393) |
> | Chạm auth / upload / secrets / SQL / dependency mới — rà OWASP + hardening TRƯỚC khi báo xong | `security-and-hardening` (GĐ 393) |
> | Cảm giác muốn TẮT check / skip test / bỏ qua verify để "xanh" → DỪNG — đọc bảng chống-lười của skill | `constraint-driven-development` (GĐ 393) |
> | Tính năng / việc LỚN mới — viết khung PRD (mục tiêu · cấu trúc · ranh giới · test) TRƯỚC code (bổ trợ quy trình 5 bước GĐ 198) | `spec-driven-development` (GĐ 393) |
> | Muốn đơn giản hóa / xóa code cũ — Chesterton's Fence: chưa hiểu tại sao có thì đừng xóa (bổ trợ `ponytail`) | `code-simplification` (GĐ 393) |
>
> Nạp đúng lúc bằng tool `skill` (đọc file theo yêu cầu) — KHÔNG nạp dồn mọi
> skill cùng lúc (bảo vệ ngân sách context — quy tắc GĐ 319). `ui-ux-pro-max`
> KHÔNG nạp cả skill — chạy lệnh tra cứu điểm ở bảng trên:
> `python .agents/skills/ui-ux-pro-max/scripts/search.py "<từ khóa>" --domain <domain> -n 3`.
>
> **Verify:** md5 5/5 khớp nguồn · tsc không cần (0 file code) · commit chain
> docs-only: claim `537e3da` → skill + entry → unlock.
>
> **Tiêu chí kiểm chứng:** phiên sau gặp 1 trong 5 tình huống bảng trên → em
> nạp đúng skill và làm theo quy trình của nó (VD: báo bug → loop đỏ TRƯỚC khi
> hypothesize; tiệp việc dở → đọc handoff doc vào việc ngay).
>
> **Version:** KHÔNG bump (docs-only — chờ lệnh Push — quy tắc ĐA AGENT). App
> tổng **5.3.2** / repo con **8.2.2**.

### GĐ 346 / C.188 (Trợ lý Freebuff): Tool Lịch hẹn tiêm lấy TẤT CẢ loại vắc xin — bỏ lọc cứng BCG-TCDV + giữ mức TỔNG HỢP (PA-3) (2026-10-07)

> **Yêu cầu của Đại ca (07/10, ảnh /m/mkt-hentiem):** DOWNLOAD "Lịch hẹn
> tiêm" không lấy chi tiết 1 loại Vắc Xin nữa — bỏ qua phần chọn chi tiết,
> lấy TẤT CẢ các loại Vắc xin.

> **Chẩn đoán:** tool `19_smed_Lichhentiem.py` lọc cứng `BCG-TCDV` (env
> mặc định + bước 5 LUÔN chọn dropdown Vaccine). ETL/web không lọc gì →
> thiếu từ nguồn là mất trong DB kỳ đó. ĐH chốt PA-3 (switch ALL + test
> thật) + "về cả Tổng hợp" (giữ mức Tổng hợp — bỏ chuyển Chi tiết).

> **Đã làm (repo con `94f6339`, chi tiết đầy đủ ở AGENTS.md repo con
> C.188):** (1) `SMED_VACCINE_FILTER` mặc định **ALL** — env cụ thể vẫn lọc
> được; (2) skip dropdown Vaccine khi ALL (log VACCINE_FILTER_SKIP);
> (3) bỏ khối chuyển 'Tổng hợp → Chi tiết'; (4) unit test offline mới
> `19_smed_Lichhentiem.test.py` (FakePage — 8 check).

> **Verify:** py_compile OK · unit **8/8 PASS exit 0** (fix thêm bug env
> rỗng trả '' thay vì ALL) · **test thật 2 trung tâm đủ cả 2 nhánh SMED** —
> TIÊN DU (tcgiongts) **1.289 dòng / 252 loại** · LONG BIÊN (tcgiong)
> **1.389 dòng / 342 loại** vắc xin distinct (file CŨ cùng kỳ: 0 dòng —
> filter BCG-TCDV + hết hạn đăng nhập). Tool chạy subprocess riêng mỗi job
> → hiệu lực NGAY job kế tiếp, không cần restart service.

> **Tiêu chí kiểm chứng:** job LHT kế tiếp từ web → 19/19 file đủ TẤT CẢ
> loại vắc xin (dòng tăng mạnh); ETL nạp đủ vào GiondDB kỳ đó.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.3.2** / repo con **8.2.2**.

### GĐ 347 (Trợ lý Freebuff): Cài skill UI UX Pro Max v2.13.0 vào `.agents/skills/` — tri thức thiết kế tra cứu theo điểm (PA-1) (2026-10-07)

> **Yêu cầu của Đại ca (07/10):** đọc thư mục
> `D:\DuLieuChung\CUONG_2026\ui-ux-pro-max-skill-main` — xem áp dụng được gì
> cho giong-vn-v6. Đây là bộ **cơ sở dữ liệu thiết kế + máy tra cứu Python**
> (nextlevelbuilder/ui-ux-pro-max-skill, MIT): 79 phong cách UI · 192 bảng màu
> · 74 cặp font · 119 UX guidelines · 25 loại chart · 192 quy tắc suy luận
> theo ngành · 66 guideline React 19/shadcn kèm ví dụ Do/Don't.
>
> **Khác mattpocock skills (GĐ 345):** bộ này là CSV + engine tìm kiếm BM25
> (`search.py`) — KHÔNG nạp nguyên skill vào context, CHỈ tra cứu điểm khi
> cần (tiết kiệm token — đúng quy tắc GĐ 319).
>
> **Đối chiếu stack ta:** React 19 + Radix + Tailwind v4 + Recharts — trúng
> trực tiếp `--stack react` (66 guideline, verify react 19.2.x) · `--domain
> chart` (chọn loại chart theo dữ liệu) · `--domain ux` (accessibility
> contrast 4.5:1, focus state, form labels...) · `--design-system` (trang
> mới/landing). Design token hiện có (#1c6b58) GIỮ NGUYÊN — skill chỉ tra
> khi làm UI mới, không đè convention + 4 nguyên tắc định dạng của Đại ca.
>
> **ĐH chốt PA-1** (cài full skill) + 4 tình huống dùng: chart · UX/a11y ·
> hiệu năng React · trang mới/landing.
>
> **Đã làm (docs-only, 0 đụng code app):** copy `.claude/skills/ui-ux-pro-
> max/` (SKILL.md + data 18 file + stacks 23 CSV + scripts + references —
> 3.6MB) vào `.agents/skills/ui-ux-pro-max/`; bỏ desktop.ini rác; mở rộng
> bảng quy tắc nạp skill GĐ 345 thêm 4 dòng; ghi lệnh tra cứu mẫu.
>
> **Verify (chạy thật engine, không chỉ nhìn file):** `--domain chart` query
> "dashboard KPI overview" → Bullet Chart đúng ngữ cảnh KPI · `--domain ux`
> query "form accessibility contrast focus" → Focus Appearance + Form Labels
> đúng WCAG · `--stack react` query "useEffect useMemo rerender performance"
> → guideline useMemo + context đúng react 19.2.x. `git check-ignore` —
> `.agents/` không bị gitignore.
>
> **Tiêu chí kiểm chứng:** phiên sau làm chart/form/trang mới → em chạy
> search.py tra trước khi code (bảng nạp skill mục GĐ 345); output guideline
> kèm ví dụ Do/Don't ngay trong kết quả.
>
> **Version:** KHÔNG bump (docs-only — chờ lệnh Push — quy tắc ĐA AGENT).
> App tổng **5.3.2** / repo con **8.2.2**.

### GĐ 348 / C.189 (Trợ lý Freebuff): BÁO CÁO "Danh sách lịch hẹn tiêm" — builder ghép file 19 TT + job lht-report + trang /m/bc-lich-hen (PA-1) (2026-10-08)

> **Yêu cầu của Đại ca (07/10, 4 điểm + ảnh file gốc TIÊN DU):** xây trong app
> con Báo cáo "Danh sách lịch hẹn tiêm" — (1) ghép TẤT CẢ file download 19 TT
> thành 1 dữ liệu; (2) cột đầu → "STT" + thêm cột "Trung tâm" bên phải STT
> (mã viết tắt TD/BH/CĐ/TP...); (3) cột "Vắc xin" tách thêm cột "Thứ tự mũi
> tiêm"; (4) nhiều vắc xin 1 lịch → THÊM DÒNG (cột khác chép dòng phía trên).
> ĐH chốt PA-1 (builder + job riêng — snapshot từng lần tải) + STT XUYÊN SUỐT
> + GIỮ TẤT CẢ dòng.

> **Đã làm (chi tiết đầy đủ ở AGENTS.md repo con C.189, code `5248c56`):**
> builder `gd348-build-lht-ds.py` (13 cột; tách theo phẩy + '- Mũi N' — gộp
> cụm tên chứa phẩy; unit 21/21) · hook sau job hentiem + nhánh job
> `lht-report` trong `40_web_agent.py` (folder khớp kỳ YYYY-MM-DD, fallback
> mới nhất ≤ từ ngày) · web `-smed.ts` + SqlDataModule mở rộng + trang
> `/m/bc-lich-hen` (phân trang C.170 + Tải Excel toàn bộ C.179) · restart
> agent (log `web_agent_081026_022111`, tunnel_ok).

> **Verify:** unit **21/21 PASS** · py_compile OK · **kỳ 01/10 thật: 19.989
> dòng gốc → 28.067 dòng sau tách · 19/19 TT · 11.4s** (dòng 1
> STT=1/PY/MMR-II/Mũi 2) · tsc EXIT 0. Result 10.4MB → phân trang/server-cut
> C.170 phải bật (đã dùng đúng khung sẵn có).

> **Tiêu chí kiểm chứng (sau Push):** trang /m/bc-lich-hen bấm "Chạy báo cáo"
> kỳ có data → bảng 13 cột đúng; job download hentiem mới tự có ds-lht.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.3.2** / repo con **8.2.2**.

### GĐ 349 (Trợ lý Freebuff): Cài skill Ponytail — "dev lười" MẶC ĐỊNH BẬT mức full khi viết code (PA-1) (2026-10-08)

> **Yêu cầu của Đại ca (08/10):** đọc thư mục `D:\DuLieuChung\CUONG_2026> ponytail-main` (DietrichGebert/ponytail, MIT) — skill là 1 prompt ép giải
> pháp lười nhất hoạt động được. Benchmark thật: giảm ~54% code, ~20% rẻ hơn,
> ~27% nhanh hơn. ĐH chốt PA-1: cài skill + **MẶC ĐỊNH BẬT mức full** khi
> viết code; anh nói "bỏ lười" để tắt.

> **Nội dung chính:** bậc thang 7 rung trước khi viết code — (1) việc này cần
> tồn tại? (YAGNI) → (2) codebase đã có? reuse → (3) stdlib → (4) native →
> (5) dependency đã cài → (6) 1 dòng → (7) code tối thiểu. Fix bug = chạm GỐC
> (grep MỌI caller, sửa 1 chỗ tất cả đi qua). Lười có chủ đích đánh dấu comment
> `ponytail:` + ceiling/upgrade path. Logic không tầm thường để lại 1 check
> nhỏ (assert/test_*.py — khớp quy tắc test tự động đang có). KHÔNG lười:
> hiểu bài, validation, security, a11y, cái anh yêu cầu rõ.

> **Khớp quy tắc hiện hành:** Minimal Change Policy + Surgical (GĐ cũ) —
> Ponytail bổ sung bậc thang CÓ THỨ TỰ ưu tiên + fix-gốc qua caller. Tổng kết
> nhiệm vụ vẫn theo quy trình 5 bước (Ponytail chỉ chỉnh cách CODE, không
> chỉnh cách giao tiếp/báo cáo).

> **Đã làm (docs-only, 0 đụng code app):** copy NGUYÊN VĂN
> `skills/ponytail/SKILL.md` (120 dòng) vào `.agents/skills/ponytail/` — md5
> khớp nguồn (`421e4091…`) · bảng nạp skill GĐ 345 thêm dòng "MỌI lần viết
> code — ponytail mặc định BẬT mức full".

> **Tiêu chí kiểm chứng:** phiên sau viết code mới → tự đi bậc thang 7 rung
> (trình phương án Bước 2+3 kèm "cách lười hơn là X"); fix bug → trình phương
> án chạm gốc qua caller thay vì vá từng nơi; chỗ lười có ceiling → comment
> `ponytail:`.

> **Version:** KHÔNG bump (docs-only — chờ lệnh Push — quy tắc ĐA AGENT).
> App tổng **5.3.2** / repo con **8.2.2**.

### GĐ 350 (Trợ lý Freebuff): Cài REA "Reverse Engineer Anything" v5.0.0 — MCP + skill (PA-2) (2026-10-08)

> **Yêu cầu của Đại ca (08/10):** đọc thư mục `D:\DuLieuChung\CUONG_2026> rea-main` (morluto/rea, MIT) — MCP + workflow reverse engineer đa nền tảng
> (binary native qua Hopper/Ghidra/IDA · app JS/Electron · .NET · website —
> không cần source, xuất Evidence). ĐH chốt PA-2: **cài đầy đủ**.

> **Đã làm:**
> 1. Skill workflow vào repo: `npx skills add morluto/rea --skill
>    reverse-engineer-anything` → `.agents/skills/reverse-engineer-anything/`
>    (SKILL.md 191 dòng + references — symlinked Claude Code).
> 2. MCP project-level: `.mcp.json` đăng ký server `rea`
>    (`npx -y rea-agents@5.0.0 mcp` — version PIN theo khuyến nghị README).
>    Claude Code sẽ hiện "Pending approval" lần mở phiên đầu — anh duyệt 1 lần.
> 3. `rea setup --all-detected` CLI không phát hiện agent nào trên máy (Freebuff
>    không nằm trong list CLI của nó) — đăng ký MCP theo cách thủ công như trên
>    (docs/README "Manual MCP configuration" — đúng cấu hình chuẩn v5.0.0).

> **Verify (chạy thật):** `analyze-javascript-application` trên
> `giong-apps/apps/banhang/src/lib` → Evidence ID + graph module (nodes
> @tanstack/react-router...) — phân tích TĨNH chạy cục bộ KHÔNG cần
> Hopper/Ghidra/IDA ✓ · Node v24.16.0 ≥ 22 ✓ · `doctor --skill`: skill:true.
> Native binary (Hopper/Ghidra/IDA) CHƯA cấu hình engine — cái này chỉ cần
> khi gặp bài toán binary thật (máy chưa có Ghidra/Hopper).

> **Khi nào dùng:** thấy feature của app/web khác muốn hiểu để xây lại; app
> JS/Electron cần soi không có source; SMED thay UI lớn cần hiểu bản đồ API
> (đề xuất trước khi làm). KHÔNG dùng thường lệ — rung 1 Ponytail: chưa có
> bài toán thật thì không đụng.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.3.2** / repo con **8.2.2**.

### GĐ 351 (Trợ lý Freebuff): Copy docs/ REA vào skill reverse-engineer-anything — PA-2 (2026-10-08)

> **Yêu cầu của Đại ca (08/10):** đọc thư mục `D:\DuLieuChung\CUONG_2026\rea-main` — xem áp dụng được gì cho dự án. ĐH chốt PA-2: copy docs/ của REA vào skill để agent tra sâu khi cần.

> **Kết quả khảo sát (đối chiếu thật):** `rea-main` = source repo gốc **morluto/rea v5.0.0** (MIT, 466 file) — đúng bản đã cài GĐ 350 (package npm `rea-agents@5.0.0` + MCP `.mcp.json`). SKILL.md + 5/5 references khớp nội dung 100% (byte khác duy nhất CRLF/LF — verify `tr -d '\r'`). Source thêm: `src/` engine (npm đủ dùng) · `bridge/` Ghidra/Hopper (chỉ khi phân tích binary) · submodules jadx/binwalk/unblob/wakaru (Android/firmware).

> **Đã làm:** copy NGUYÊN VẸN `rea-main/docs/` → `.agents/skills/reverse-engineer-anything/docs/` (48 file: 39 MD workflow android · browser · native · JS · mcp-contracts + assets + error-contract.schema.json + product-catalog.json; bỏ desktop.ini rác Windows). Giờ agent có bài toán REA sâu (APK · firmware · browser observation · native investigation) tra ngay trong workspace, không cần folder ngoài repo. Phụ: unlock GĐ 350 trong registry (`c874a78`).

> **Verify:** md5 TẤT CẢ 48 file GIỐNG byte-đôi-byte với nguồn (0 khác) · dung lượng 2.0MB · KHÔNG đụng code app (docs-only).

> **Tiêu chí kiểm chứng:** khi cần tra workflow REA sâu — đọc `.agents/skills/reverse-engineer-anything/docs/<chủ đề>.md` trực tiếp; skill chính vẫn là SKILL.md + references như GĐ 350.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **5.3.2** / repo con **8.2.2**.

### GĐ 353 / C.190 (Trợ lý Freebuff): Fix "Mua vào - Chi tiết (MiaTool)" ngày tháng định dạng ngược — khung SmedPullModule chuẩn hóa hiển thị dd/mm/yyyy — PA-1 (2026-10-08)

> **Yêu cầu của Đại ca (08/10):** kiểm tra phần app con "LẤY DỮ LIỆU TỪ MIA
> TOOL — Mua vào - Chi tiết (MiaTool)": ngày tháng bị định dạng ngược; kiểu
> đúng **dd/mm/yyyy**; xem TẤT CẢ các chỗ khác thống nhất định dạng này.
> ĐH chốt **PA-1** (1 chỗ — render-only, không đụng payload web↔tool).

> **Chẩn đoán (khai code — chi tiết đầy đủ ở AGENTS.md repo con C.190):**
> thẻ job lịch sử khung dùng chung `SmedPullModule` hiển thị NGUYÊN chuỗi DB
> `{j.dateFrom} → {j.dateTo}` — DB `smed_pull_jobs` chứa TRỘN định dạng:
> khung SMED/MIA web tạo job tự gửi dd/mm/yyyy (qua `isoToDdmmyyyy` đầu
> pipeline), nhưng luồng auto-download (`sql-data-module`) + luồng AI
> (`chat.ts`) gửi ISO yyyy-mm-dd → job tạo từ luồng đó hiển thị YYYY-mm-dd.
> Job MIA tạo tay có input `type=date` nghiêng về ISO → hiện "ngược".

> **Đã làm (1 file — code repo con commit phiên này):**
> `apps/banhang/src/components/smed-pull-module.tsx` — thêm `fmtJobDate()`
> (chuẩn hóa render: ISO yyyy-mm-dd → dd/mm/yyyy · d/m/yyyy pad 2 chữ số ·
> dd/mm/yyyy giữ nguyên · format lạ trả nguyên — không gây gãy), áp vào dòng
> kỳ job trong lịch sử. KHÔNG đụng payload (tool đọc dateFrom/dateTo raw).

> **Verify:** tsc app banhang **EXIT 0** · khung dùng chung áp cho MỌI module
> DOWNLOAD (SMED/MISA/MIA/BANK) — mọi ngày job trên khung giờ luôn dd/mm/yyyy.

> **Tiêu chí kiểm chứng:** web → DOWNLOAD DỮ LIỆU → Mua vào - Chi tiết
> (MiaTool) → lịch sử job hiện kỳ dd/mm/yyyy kể cả job tạo từ luồng ISO;
> format Excel file tool xuất KHÔNG đổi.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.3.2** / repo con **8.2.2**.

### GĐ 354 / C.191 (Trợ lý Freebuff): PA-1 Push đợt GĐ 353/C.190 — bump 5.3.3 / 8.2.3 + LIVE production (2026-10-08)

> **Lệnh "Push" của Đại ca (08/10, sau GĐ 353).** Rà trùng lặp theo nguyên tắc 3:
> `agent-cli` + `pipeline-work` = RỖNG cả 2 repo; status chỉ 1 file deleted của
> phiên khác (không đụng). **⚠️ CẢNH BÁO: registry còn 1 🔒 dở (GĐ 352 WeKnora
> — phiên khác, docs-only)** → hỏi Đại ca (3 lựa chọn) — anh chốt **PUSH NGAY**
> vì code `f0a0c21` không đụng file nào của WeKnora; vùng giao nhau chỉ docs
> (đã commit riêng từng file).

> **Bump version (lúc Push — đúng quy tắc ĐA AGENT):** app tổng **5.3.2 → 5.3.3**
> (patch — fix GĐ 353) — package.json + package-lock.json (2 chỗ root) +
> DEFAULT_VERSION app-shell.tsx; repo con **8.2.2 → 8.2.3** (patch — C.190) —
> package.json + DEFAULT_VERSION app-shell.tsx. Checklist GĐ 138 ✓ (không
> thành phần nào ≥ 10; package-lock repo con 5.9.4 legacy — không đụng, quy
> tắc các lần push trước).

> **Push:** app tổng `365edc5..23ad279` (GĐ 353 claim + docs C.190 unlock +
> GĐ 354 bump) · repo con `f14b751..54509d8` (C.190 code+docs + C.191 bump).
>
> **✅ Verify production (curl --compressed + grep -aoE):** app tổng
> `giong-vn-v6.vercel.app` — HTML chứa `VERSION 5.3.3` · app con
> `giong-banhang.vercel.app` — `VERSION 8.2.3` · cả 2 **HTTP 200**. Chú ý kỹ
> thuật: chuỗi version trong HTML tách bởi HTML comment (`VERSION <!--
> -->5.3.3`) nên grep pattern `VERSION [0-9.]+` KHÔNG khớp — phải dùng
> `5\.3\.[0-9]` trần.

> **Tiêu chí kiểm chứng của Đại ca:** app con → DOWNLOAD DỮ LIỆU → Mua vào -
> Chi tiết (MiaTool) → Lịch sử lấy dữ liệu — các job cũ hiện kỳ dạng
> **dd/mm/yyyy** (trước YYYY-mm-dd); khung dùng chung → MỌI module DOWNLOAD
> (SMED/MISA/MIA/BANK) đồng bộ dd/mm/yyyy; format Excel tool xuất không đổi.

> **Version:** app tổng **5.3.3** / repo con **8.2.3** — ĐÃ PUSH + ĐÃ LIVE.

---

### GĐ 352 (Trợ lý Freebuff): Khảo sát WeKnora-main + PA-3 deploy WeKnora bản chuẩn + MCP cho agent (2026-10-08)

> **Yêu cầu của Đại ca (08/10):** đọc `D:\DuLieuChung\CUONG_2026\Github\WeKnora-main`
> (Tencent/WeKnora v0.8.2, MIT — framework RAG/Agent/Wiki dùng LLM, backend Go +
> frontend Vue). ĐH chốt **PA-3**: deploy WeKnora + nối MCP cho agent (hỏi-đáp
> tài liệu nội bộ). Lựa chọn ĐH: cài Docker Desktop ngay · **bản CHUẨN** · LLM
> **GLM (Zhipu)** — key sẽ cung cấp sau (cấu hình qua Settings → Models).

> **Khảo sát:** WeKnora là hệ self-hosted độc lập — KHÔNG nhét vào code app
> (app không gọi LLM; stack khác hẳn). Giá trị trúng: biến kho tài liệu nội bộ
> (hướng dẫn sử dụng, quy trình SMED...) thành **hỏi-đáp có trích dẫn** + MCP
> cho agent truy vấn knowledge base. Compose mặc định đã dùng
> `RETRIEVE_DRIVER=postgres` + `STORAGE_TYPE=local` → KHÔNG cần qdrant/minio.

> **Đã làm (0 đụng code app tổng/repo con):**
> 1. **Cài lại Docker Desktop** (cài dang dở trước đó — `resources` trống, không
>    có docker.exe): tải installer 635MB, `install --quiet --accept-license` →
>    **v29.8.2 + Compose v5.5.1**, engine READY (4 CPU / 8GB WSL2).
> 2. **Deploy WeKnora v0.8.2** tại thư mục gốc WeKnora-main: `.env` từ
>    .env.example (JWT_SECRET + SYSTEM_AES_KEY random hex 32, version ghim
>    v0.8.2, `FRONTEND_PORT=8180` tránh trùng 80) → pull images (~6GB) →
>    `docker compose up -d` → **6 containers LIVE**: app (:8080, healthy) ·
>    frontend (:8180, HTTP 200) · docreader · postgres · redis · **mcp (:8082,
>    profile full riêng)**. WeKnora health `{"status":"ok"}`.
> 3. **Account admin + API key:** đăng ký qua API `/auth/register`
>    (cuongpk.giong04@gmail.com / Admin123!, owner workspace 10000) → tạo API
>    key `agent-mcp` full-access (`POST /tenants/10000/api-keys`) → bật service
>    `mcp` (WEKNORA_API_KEY + MCP_SERVER_AUTH_TOKEN random trong .env) →
>    **verify MCP**: curl initialize → `weknora-server v1.1.1` trả capabilities.
> 4. **Claude Code:** thêm server `weknora` (HTTP `http://localhost:8082/mcp`,
>    Bearer token) vào `.mcp.json` cạnh `rea` — anh duyệt "Pending approval"
>    1 lần ở phiên Claude Code đầu tiên.
>
> **Bảo mật:** secrets nằm trong `WeKnora-main/.env` (ngoài repo, không commit).
> Dữ liệu WeKnora trong Docker volume `postgres-data` + `data-files`.
>
> **Còn dở (checkpoint phiên sau):** (1) Đại ca cung cấp API key GLM → cấu hình
> chat model (GLM-4.x) + embedding (`embedding-3`) qua Settings → Models hoặc
> API; (2) tạo knowledge base + nạp tài liệu nội bộ (hướng dẫn sử dụng, quy
> trình...); (3) test hỏi-đáp RAG + test MCP tools từ Claude Code.
>
> **Tiêu chí kiểm chứng (khi có key):** web :8180 đăng nhập → upload tài liệu →
> hỏi-đáp trả lời kèm trích dẫn; Claude Code gọi tool weknora (retrieve/chat)
> được.
>
> **Version:** KHÔNG bump (không đụng code app — chỉ .mcp.json + docs, chờ lệnh
> Push — quy tắc ĐA AGENT). App tổng **5.3.3** / repo con **8.2.3**.

### GĐ 355 / C.192 (Trợ lý Freebuff): Báo cáo "Mua vào - Chi tiết (MiaTool)" — +11 cột thiếu + Thuế suất % + Tiền thuế khớp Tổng quan từng đồng — PA-1 (2026-10-08)

> **Yêu cầu của Đại ca (08/10, 3 ý):** (1) thiếu 11 cột (Tổng tiền CKTM ·
> Tổng tiền phí · Trạng thái · KQT · Mã tra cứu · Ghi chú 1 · HTTT · Tính
> chất · Ghi chú 2 · Số lô · Hạn dùng); (2) Thuế suất % + KHÔNG cộng
> Subtotal; (3) Tiền thuế cộng 2 số thập phân, hiển thị không thập phân →
> tổng CT = tổng TQ (T9: 265.076.902 vs 265.076.904 — lệch 2đ). Chốt PA-1.

> **Chẩn đoán gốc lệch 2đ:** builder `mia_chitiet` put 'Tiền thuế' vào
> `num_cols` → `_rows` làm tròn half-up TỪNG DÒNG trước khi cộng →
> sum(round(line)) ≠ round(sum(line)). DB thật (probe /db/query GĐ 329):
> sum(raw DECIMAL(19,2)) kỳ T9 = 265076902.0 = đúng số TQ.

> **Đã làm (code repo con `828a4db` — chi tiết đầy đủ ở AGENTS.md repo con
> C.192):** (1) ETL `mia_hddt_import.py` nạp +12 cột CT (c24-37 file CT 37
> cột; CKTM/phí ép ÂM pattern C.152) + ALTER in-place + flag `--force`
> (nạp lại file đã có hash khi thêm cột ETL); (2) builder `mia_chitiet`
> SELECT +11 cột · Thuế suất SQL CASE '0.05'→'5%' (nguyên bỏ '.00') ·
> 'Tiền thuế' LOẠI khỏi num_cols (Subtotal client cộng raw + làm tròn 1
> lần cuối — KHÔNG đụng khung); (3) Vận hành: pyodbc local login 18456 (DB
> chỉ cấp NT AUTHORITY\SYSTEM) → chạy ETL bằng `schtasks /ru SYSTEM` +
> --force → nạp đè kỳ T9 (3 file 7.614 dòng) → dọn task.

> **Verify (kỳ T9 thật):** 596 dòng × 28 cột · tổng Tiền thuế
> **265.076.902 = TQ từng đồng** (hết lệch 2đ) · Thuế suất {'0%','8%','10%'}
> Subtotal rỗng · cột mới: CKTM 91 (VD 212.221) · Trạng thái/KQT/Tính chất
> 596/596 · Mã tra cứu 300 · HTTT 544 · Số lô/Hạn dùng 290 (VD AVAXIM
> 'Y3G04D3' / 31/07/2027) · Tổng tiền phí/Ghi chú 1/Ghi chú 2 = 0 dòng
> (cổng T9 không phát sinh — đúng data) · py_compile OK.

> **Tiêu chí kiểm chứng (sau Push):** trang Chi tiết MIA chạy lại kỳ T9 →
> 28 cột · Thuế suất '8%' Subtotal rỗng · SUBTOTAL Tiền thuế = 265.076.902.
> mia-banra-chitiet dùng chung builder → tự hưởng +11 cột.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.3.3** / repo con **8.2.3**.

### GĐ 356 / C.193 (Trợ lý Freebuff): Fix trang /m/bc-lich-hen "Chưa tải được kết quả" — result SHEETS-ONLY bị guard loại im lặng (PA-1 client) (2026-10-08)

> **Yêu cầu của Đại ca (08/10, ảnh):** trang /m/bc-lich-hen có job done 28.067
> dòng nhưng khung hiện "Chưa tải được kết quả". ĐH chốt **PA-1** (sửa client
> sql-data-module.tsx).
>
> **Chẩn đoán + đã làm (chi tiết đầy đủ ở AGENTS.md repo con C.193, code
> `f9fe841`):** builder C.189 đóng gói result **SHEETS-ONLY** — root KHÔNG có
> columns/rows, 28K dòng gói trong meta.sheets; guard `!Array.isArray(rt.columns)`
> bỏ result im lặng. Fix 1 file `sql-data-module.tsx`: guard nhận thêm hasSheets
> + ẩn bảng generic root-trống khi sheetsOnly (bảng thật render qua render-prop
> SubSheets của trang).
>
> **Verify:** tsc EXIT 0 · E2E local (bước 6 script `gd-c194-verify-gop-baocao.mjs`)
> — /m/bc-lich-hen render, KHÔNG còn "Chưa tải được kết quả".
>
> **Tiêu chí kiểm chứng (sau Push):** prod /m/bc-lich-hen → mở job done →
> bảng 13 cột render phân trang (Trang 1/29).
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.3.3** / repo con **8.2.3**.

### GĐ 357 / C.194 (Trợ lý Freebuff): Gộp 5 báo cáo nhóm BÁO CÁO KẾ TOÁN — 5 trang gộp (TQ/TH TRÊN + CT DƯỚI) + xóa 7 trang cũ — nav 18→13 lá (PA-1) (2026-10-08)

> **Yêu cầu của Đại ca (08/10):** nhóm BÁO CÁO KẾ TOÁN app con 18 lá rối —
> gộp các cặp TQ+CT thành 1 trang mỗi báo cáo. ĐH chốt **PA-1** (chỉ
> frontend, tái dùng queryKey/builder cũ, 2 nút chạy riêng) + **xóa hẳn**
> trang cũ.
>
> **Đã làm (repo con `ca32528` — chi tiết ở AGENTS.md repo con C.194):**
> 5 trang gộp mới (bc-mia-muavao / bc-mia-banra MỚI + bc-bank-vcb/tcb/tpb
> ghi đè — mỗi phần `<section>` badge "Phần 1/Phần 2", 2 SqlDataModule
> queryKey riêng) · xóa hẳn 7 trang cũ (4 lá MIA + 3 lá bank -th; VTB giữ)
> · nav.ts 18→13 lá tự đánh số lại (8 Mua vào, 9 Bán ra, 10 VCB, 11 TCB,
> 12 TPB, 13 VTB) · -smed.ts SQL_QUERY_LEAF 10 queryKey → 5 route ·
> smed-auth.ts ROUTE_TO_GROUP đồng bộ.
>
> **App tổng (commit này):** `banhang-catalog.ts` đồng bộ 10 lá cũ → 5 lá
> mới ("Bảng kê HĐ GTGT mua vào/bán ra (MiaTool)" + "Sao kê ngân hàng
> VCB/TCB/TPB") + giữ VTB — khớp nav.ts repo con.
>
> **Verify (phiên tiếp — hoàn tất 08/10):** tsc EXIT 0 CẢ 2 app · grep toàn
> src 0 tham chiếu route cũ (routeTree.gen regen sạch) · **E2E SSO local 6/6
> PASS** (`scripts/gd-c194-verify-gop-baocao.mjs` — sidebar 5 lá gộp mới + 0 lá
> cũ · /m/bc-mia-muavao + /m/bc-bank-vcb render đủ Phần 1+2 · bc-lich-hen hết
> lỗi C.193). Lesson verify: h2 có CSS `uppercase` → innerText trả HOA —
> assertion phải so "PHẦN 2" không phải "Phần 2".
>
> **Tiêu chí kiểm chứng (sau Push):** app con → BÁO CÁO KẾ TOÁN 13 lá;
> trang gộp 2 nút chạy riêng; 7 route cũ 404.
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.3.3** / repo con **8.2.3**.

### GĐ 358 / C.195 (Trợ lý Freebuff): Sửa 4 module DANH MỤC — +cột STT · NCC +Địa chỉ bỏ Số hóa đơn · KH "Mã tiêm chủng" bỏ Số đăng ký · biểu tượng Sửa/Xóa/Thêm mới giao diện (PA-3) (2026-10-08)

> **Yêu cầu của Đại ca (08/10):** 4 module DANH MỤC app con (GĐ 336/C.181):
> +STT mọi bảng · Vắc xin 1 trang · NCC thêm Địa chỉ bỏ "Số hóa đơn" ·
> Trung tâm thêm cột "Tên viết tắt" · KH đổi "Mã tra cứu"→"Mã tiêm chủng" +
> Địa chỉ bỏ "Số đăng ký" · biểu tượng Sửa/Xóa/Thêm mới mọi bảng.
>
> **ĐH chốt (hỏi-đáp):** CRUD **PA-3** chỉ giao diện (GiondDB chỉ-đọc + ETL
> nạp đè theo kỳ — nơi lưu chờ chốt) · Địa chỉ khách hàng **PA-2** chờ nguồn
> (probe: f1_dangky không có cột dia_chi — THIẾU SÓT ghi AGENTS.md repo con)
> · viết tắt TT **PA-1** "Trung tâm TC " + tên ngắn · 1 trang **PA-2** chỉ
> Vắc xin.
>
> **Đã làm (repo con `a1ce312` — chi tiết AGENTS.md repo con C.195):**
> danh-muc-module.tsx (STT + Pencil/Trash2 + nút Thêm mới + CrudDialog +
> onePage) · 4 route columns · -danh-muc.ts SQL (nmdchi / "Trung tâm TC " /
> bỏ COUNT). App tổng: chỉ docs + registry (catalog không đổi — nav giữ 5
> lá DANH MỤC).
>
> **Verify:** tsc EXIT 0 · probe SQL thật GiondDB: NCC dia_chi = "Số 273
> Nguyễn Văn Cừ…" · TT = "Trung tâm TC Bích Hòa" đúng ví dụ ĐH.
>
> **Tiêu chí kiểm chứng:** 4 trang danh mục hiện STT + icon Sửa/Xóa + nút
> Thêm mới (dialog PA-3); Vắc xin 1 trang; NCC có Địa chỉ; KH nhãn "Mã tiêm
> chủng".
>
> **Version:** ĐÃ PUSH (GĐ 359) — bump **5.4.0** / **8.3.0** + LIVE.

### GĐ 359 (Trợ lý Freebuff): PA-1 Push đợt GĐ 355-358 / C.192-C.195 — bump 5.4.0 / 8.3.0 + LIVE production (2026-10-08)

> **Lệnh "Push" của Đại ca (08/10, sau GĐ 358).** Rà trùng lặp theo nguyên
> tắc 3: `main..agent-cli` + `main..pipeline-work` = **RỖNG**; registry 0 🔒
> dở; status chỉ file deleted cũ (attachments zip app tổng + script verify
> gd-c184 repo con — của phiên trước, không đụng); email
> `cuongpk.giong04@gmail.com` ✓.
>
> **Bump version (lúc Push — đúng quy tắc ĐA AGENT):** app tổng **5.3.3 →
> 5.4.0** (minor — GĐ 357 gộp 5 báo cáo KẾ TOÁN + GĐ 358 sửa 4 DANH MỤC +
> GĐ 355/C.192 +11 cột CT MIA) — package.json + package-lock.json (dòng 3
> + 9 — lesson: str_replace substring trúng 2 chỗ, sửa dòng 3 riêng theo
> context "name") + DEFAULT_VERSION app-shell.tsx — đủ 4 chỗ; repo con
> **8.2.3 → 8.3.0** (minor — C.194 gộp báo cáo + C.195 DANH MỤC + C.192) —
> package.json + DEFAULT_VERSION — đủ 2 chỗ. Checklist GĐ 138 ✓ (5.4.0/
> 8.3.0 mọi thành phần 1 chữ số; grep 0 sót version cũ).
>
> **Push:** app tổng `c847f35..12c1949` (GĐ 355 claim+docs · GĐ 356 claim ·
> GĐ 357 claim+code+docs · GĐ 358 claim+docs · bump) · repo con
> `54509d8..c41f689` (C.192 · C.193 code+docs · C.194 code+docs · C.195
> code+docs · C.196 bump).
>
> **✅ Verify production (curl --compressed — không chỉ nhìn Ready):** app
> tổng `giong-vn-v6.vercel.app` = **5.4.0** · app con
> `giong-banhang.vercel.app` = **8.3.0** — cả 2 LIVE, không ghim deployment
> cũ. Lesson nhỏ: pattern grep "VERSION x" không luôn khớp — grep số
> version trần trong HTML là đủ.
>
> **Tiêu chí kiểm chứng nghiệp vụ:** app con — BÁO CÁO KẾ TOÁN 13 lá (8
> Mua vào · 9 Bán ra · 10 VCB · 11 TCB · 12 TPB · 13 VTB) · 5 trang gộp 2
> nút chạy riêng · 4 trang DANH MỤC có STT + icon Sửa/Xóa + Thêm mới ·
> Vắc xin 1 trang · NCC có Địa chỉ · KH "Mã tiêm chủng".
>
> **Version:** app tổng **5.4.0** / repo con **8.3.0** — ĐÃ PUSH + ĐÃ LIVE.

### GĐ 360 / C.197 (Trợ lý Freebuff): Fix cột "Tiền thuế" Chi tiết MIA — hiển thị vi-VN + Subtotal sai ×100 + thứ tự 5 cột tiền (PA-1 khung web + builder) (2026-10-08)

> **Yêu cầu của Đại ca (08/10):** Phần 2 "Chi tiết — từng dòng hàng hóa"
> (bc-mia-muavao) — Tiền thuế hiện "48960.00" mà Subtotal
> "26.507.690.200" — muốn "48.960,00" / "265.076.902"; tính toán giữ
> nguyên. Cộng đổi chỗ: CKTM/Phí TRƯỚC Thanh toán.
>
> **Chẩn đoán:** gốc ở khung web — `computeSubtotal` parser vi-VN bỏ mọi
> dấu chấm coi là nghìn → "48960.00" đọc thành 4.896.000 (×100). ĐH chốt
> cả 2 PA-1: sửa khung + builder.
>
> **Đã làm (repo con `090a669` — chi tiết AGENTS.md repo con C.197):**
> `report-result-table.tsx` DECIMAL_2_RE `/^-?\d+\.\d{2}$/` — fmtCell
> render "48.960,00" + computeSubtotal cộng đúng → SUBTOTAL
> "265.076.902"; builder mia_chitiet đổi chỗ [Tổng tiền thanh toán] sau
> [Tổng tiền phí]. App tổng: chỉ docs + registry.
>
> **Verify:** node unit 10/10 PASS · py_compile OK · tsc EXIT 0 · restart
> GIONG_SMED_Agent 17:57 (rảnh — log `web_agent_081026_175720` · health
> tunnel_ok · 1.187 jobs).
>
> **C.197b — CHẠY THẬT T9/2026 (yêu cầu Đại ca):** lần 1 JSON vẫn thứ tự
> CŨ — gốc: `_rows` trả `columns` từ CONST `_MIA_HH_COLS` (không phải
> cur.description) — sửa SELECT chưa đủ. Sửa CẢ const + chạy lại qua
> schtasks SYSTEM (`scripts/gd360-run-mia-t9.py`): **596 dòng · thứ tự 5
> cột [14,15,16,17,18] ĐÚNG · TỔNG Tiền thuế 265.076.902 khớp từng đồng**
> · sample '48960.00' → render "48.960,00". Restart agent lần 2 (RUNNING,
> health tunnel_ok). Commit repo con bổ sung `04923c5`.
>
> **Tiêu chí kiểm chứng:** mở lại job Chi tiết MIA CŨ — cột "48.960,00" ·
> SUBTOTAL "265.076.902" (fix khung áp cả job cũ); job MỚI thứ tự 5 cột
> Chưa thuế → Thuế → CKTM → Phí → Thanh toán.
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.4.0** / repo con **8.3.0**.

### GĐ 362 (Trợ lý Freebuff): Push đợt GĐ 360/C.197-C.197b — bump 5.4.1 / 8.3.1 + LIVE production (2026-10-08)

> **Lệnh "Push" của Đại ca (08/10, sau chạy thật T9).** Rà trùng lặp theo
> nguyên tắc 3: nhánh khác RỘNG; registry 0 🔒 của mình (GĐ 361/C.198 của
> phiên khác còn 🔒 — working tree repo con có file modified của họ:
> `sql_reports.py` + `sql_reports_bccn.test.py` — KHÔNG add, KHÔNG đụng;
> đợt push chỉ gồm các commit đã commit sẵn của mình) · app tổng còn file
> deleted attachments cũ (không đụng) · email ✓.
>
> **Push:** app tổng `645952a..2b9a95a` (GĐ 360 docs fix Tiền thuế + docs
> chạy thật T9 + bump) · repo con `04923c5..00a28f5` (C.197 code · C.197b
> fix const `_MIA_HH_COLS` · C.199 bump). Repo con push đầu trước bump
> `c41f689..04923c5`.
>
> **Bump version:** app tổng **5.4.0 → 5.4.1** (patch — fix C.197) —
> package.json + package-lock.json (2 chỗ) + DEFAULT_VERSION — đủ 4 chỗ;
> repo con **8.3.0 → 8.3.1** (patch) — package.json + DEFAULT_VERSION —
> đủ 2 chỗ. Checklist GĐ 138 ✓ (0 sót version cũ).
>
> **✅ Verify production (curl --compressed):** app tổng = **5.4.1** · app
> con = **8.3.1** — cả 2 LIVE, không ghim deployment cũ.
>
> **Tiêu chí kiểm chứng nghiệp vụ:** trang bc-mia-muavao Phần 2 Chi tiết —
> cột Tiền thuế "48.960,00" (vi-VN 2 số lẻ) · SUBTOTAL "265.076.902" (hết
> ×100 — áp cả job cũ); job MỚI thứ tự 5 cột Chưa thuế → Thuế → CKTM → Phí
> → Thanh toán (đã đối chứng chạy thật T9: 596 dòng, GĐ 360).
>
> **Version:** app tổng **5.4.1** / repo con **8.3.1** — ĐÃ PUSH + ĐÃ LIVE.

*Cập nhật lần cuối: 2026-10-08 (GĐ 362 — Push đợt GĐ 360/C.197-C.197b, bump 5.4.1/8.3.1 LIVE; app tổng 5.4.1 / repo con 8.3.1)*
*Người cập nhật: Trợ lý Freebuff*

### GĐ 364 / C.201 (Trợ lý Freebuff): Sidebar app con — thống nhất cỡ chữ phân cấp NGƯỢC: bậc lớn TO NHẤT, giảm dần vào sâu — PA-A 14/13/12/12 (2026-10-08)

> **Yêu cầu của Đại ca (08/10):** thanh Sidebar app con — cỡ chữ bậc 1
> (NHẬP DỮ LIỆU / DOWNLOAD DỮ LIỆU / BÁO CÁO / UPLOAD-MISA) đang NHỎ hơn
> bậc 2 (DANH MỤC / KHO HÀNG...) → kiểm tra + thống nhất nguyên tắc cỡ chữ
> Sidebar: "Cỡ chữ bậc bé nhất là to nhất, giảm dần cho các bậc tiếp theo"
> (bậc CAO/NGOÀI to nhất — giảm dần vào các bậc con sâu). ĐH hỏi-đáp chốt
> **PA-A (trong 3 thang): 14 / 13 / 12 / 12**.

> **Chẩn đoán (đo từ code app-shell.tsx repo con):** nhãn ĐIỀU HÀNH (bậc 0
> gốc) = 11px NHỎ NHẤT dù là bậc cao nhất (NGƯỢC nguyên tắc); heading bậc 1
> = 13px + tracking 0.16em (trông mảnh nên anh cảm giác nhỏ); heading bậc 2
> = 11.5px; bậc 3 (MUA VÀO/BÁN RA) = 10.5px; LÁ (TỔNG QUAN + mọi mục tích)
> = 13px TO HƠN cả heading bậc 1 → lệch phân cấp đúng như anh thấy.

> **Đã làm (1 file — `apps/banhang/src/components/app-shell.tsx`, code repo
> con `e79ecfe`):** 5 điểm class `text-[Npx]`:
> 1. Nhãn ĐIỀU HÀNH: 11px → **14px** (TO NHẤT thang);
> 2. NavLink lá (TỔNG QUAN/NHIỆM VỤ + mọi mục tích desktop): 13px → **12px**
>    (mobile drawer giữ 16px riêng);
> 3. Heading bậc 2 (DANH MỤC/KHO HÀNG...): 11.5px → **12px**;
> 4. Heading bậc 3 thường + collapsed (MUA VÀO/BÁN RA): 10.5px → **12px** =
>    ngang bậc 2/lá — GIỮ ITALIC làm dấu phân bậc thay cỡ chữ (bậc sâu hơn
>    không được nhỏ hơn con);
> 5. Heading bậc 1 (NHẬP DỮ LIỆU/DOWNLOAD/BÁO CÁO/UPLOAD): **13px giữ nguyên**.
>    Padding + min-h KHÔNG đụng (nhịp icon giữ nguyên); KHÔNG đụng nav/quyền.

> **Verify:** tsc app banhang **EXIT 0** · `vite build` **EXIT 0** · dev
> server 3100 trả HTTP 200 (port đã có dev server phiên khác chạy — dùng
> luôn, không bật thêm).

> **Tiêu chí kiểm chứng (sau Push):** Sidebar app con — ĐIỀU HÀNH to nhất;
> NHẬP DỮ LIỆU/DOWNLOAD/BÁO CÁO/UPLOAD 13px; DANH MỤC/KHO HÀNG... 12px;
> TỔNG QUAN + mục lá 12px (không còn lá to hơn heading); MUA VÀO/BÁN RA 12px
> nghiêng.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.4.1** / repo con **8.3.1**.

### GĐ 361 / C.198 (Trợ lý Freebuff): Điều tra + fix BÁO CÁO MARKETING — Công nợ đặt trước: 2 bug logic — tẩy oan mũi cùng giá + gộp mất gói trùng tên — PA-3 (2026-10-08)

> **Yêu cầu của Đại ca (08/10):** kiểm tra phần Báo cáo công nợ đặt trước (nhóm
> BÁO CÁO MARKETING) — logic + cách ETL cho vào DB trước khi tạo báo cáo; dữ
> liệu vẫn chưa chính xác. ĐH chốt **PA-3: fix cả 2 bug**; triệu chứng anh thấy
> (cn-dt/cn-goi + TỔNG HỢP + Bảng 1) khớp đúng 2 bug em bắt được.

> **Chẩn đoán (probe `giong-apps/apps/banhang/scripts/gd361-probe-bccn-logic.py`
> CHỈ-ĐỌC — chi tiết đầy đủ ở AGENTS.md repo con C.198):** ETL nạp DB
> (`gdtvx_insert` nạp đè folder+TT+loại-file, dedupe 228j) KHÔNG mất data (đợt
> 11.088 dòng GĐ 331/332 đã khôi phục). Lệch ở LOGIC BUILDER — 3 điểm:
> (1) khóa "đã trả mũi" theo GIÁ tẩy oan — khách đặt N mũi cùng giá trả 1 lượt
> → cả N bị coi ĐÃ TRẢ (**21 mũi / 31.855.000đ mất nợ oan**; 9.096 nhóm trả
> nhiều ngày chỉ hiện 1 ngày đầu); (2) gói bị gộp mất — builder skip trùng
> (mtc, ten_goi) (**225 gói mất toàn hệ**); (3) rủi ro ETL snapshot-folder
> (folder mới tải thiếu → 228j xóa data cũ — ghi nhận theo dõi, chưa thấy).

> **Đã làm (code repo con `26053a7` — chỉ sql_reports.py + test + probe):**
> (1) map trả mũi thành HÀNG ĐỢI THEO LƯỢT + `_tra_pop` — mỗi mũi ghép 1 lượt,
> hết lượt → còn nợ; f1 gán `_da_tra`/`_ngay_tra`, f4 'Đã tiêm' gán
> `_ngay_tra`, Bảng 1/cn-dt/Bảng 3/cn-goi đọc cờ (hết tra map trùng khóa);
> (2) `pkgs_list` + `f3_slots` ghép rec f4 thứ i cùng khóa vào dòng f3 thứ i —
> goi_rows 1 dòng/f3, gói trùng tên đủ; (3) 'Kiểm tra nguồn' cn-dt →
> '✓ N (+M đã trả)' cho khách trả 1 phần (✗ chỉ khi phép cộng lệch — guard).

> **Verify:** py_compile OK · unit **54/54 PASS** (T14: 2 mũi cùng giá trả 1 →
> còn nợ 1; T15: 2 gói cùng tên → đủ 2 dòng) · builder thật GiondDB kỳ
> 2018→07/10: **Bảng 1 = 352 gói · 1.332 mũi gói · 109 đặt trước (88+21 khôi
> phục tẩy oan) · 1.441 mũi · 1.071.284.600đ · Kiểm tra ✓ 19/19** · cn-dt 63
> nhóm · ✗ 0 · ĐX·217370320260065 còn nợ 3 mũi/900.000 '✓ 3 (+1 đã trả)'.
> Lesson: '1.332' GĐ 327/338 là 'SỐ MŨI trong gói còn nợ' (nhầm nhãn 'gói').

> **Tiêu chí kiểm chứng (sau Push):** trang bccn job MỚI → Bảng 1 đặt trước
> 109; ds-goi đủ gói trùng tên; cn-dt '✓ N (+M đã trả)'; 'Ngày tiêm' đúng ngày
> từng lượt. Job cũ là snapshot — chạy lại để thấy số mới.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.4.0** / repo con **8.3.0**.

### GĐ 362 / C.199 (Trợ lý Freebuff): Fix "Tổng tiền CKTM" Chi tiết MIA cộng sai gấp N lần — phân bổ dòng đầu HĐ — PA-1 (2026-10-08)

> **Báo của Đại ca (08/10, 2 ảnh):** BÁO CÁO KẾ TOÁN → Bảng kê HĐ GTGT mua vào
> (MiaTool) — 'Tổng tiền CKTM' Subtotal web 170.646.274 vs Excel MIA TOOL cột
> Y = **175.463.880**; mọi dòng HĐ 6103 đều hiện 212.221 trong khi Excel chỉ
> dòng đầu có giá trị. Đại ca chỉ: tham khảo MIA TOOL 2026 (vừa sửa chỗ lấy
> dữ liệu này).

> **Chẩn đoán (chi tiết đầy đủ ở AGENTS.md repo con C.199, code `4ffe903`):**
> tccktmai trong file CT MIA là giá trị CẤP HÓA ĐƠN lặp trên MỌI dòng hàng hóa
> (T9: 24/45 HĐ lặp) → builder lấy raw cộng dồn gấp N. Decompile mia-runtime
> (PyInstaller → PYZ → pyc 3.11 → xdis disasm build_rows dòng 255): MIA TOOL
> xuất CKTM CHỈ 1 dòng/HĐ — cùng cấu trúc 'Tổng tiền thanh toán' (C.135).
> SQL đối chứng: first-row-sum = 175.463.880 = Excel Y từng đồng.

> **ĐH chốt PA-1.** Đã làm: `mia_chitiet` CKTM + Phí bọc row_number()=1
> (dòng sau TRỐNG như Excel) + `_MIA_MONEY` +2 cột → meta totals đúng.

> **Verify:** builder thật T9 — HĐ 6103 chỉ dòng đầu 212.221 · meta CKTM =
> **175.463.880 = Excel Y** · Thanh toán = 5.481.355.958 = Excel AB · Client
> Subtotal tự khớp (bỏ ô rỗng). py_compile OK.

> **Version:** KHÔNG bump (chờ lệnh Push). App tổng **5.4.0** / repo con
> **8.3.0**.

### GĐ 366 / C.203 (Trợ lý Freebuff): Báo cáo kiểm kê cuối kỳ — thêm cột "Tên vắc xin" + "ĐVT" sau Mã hàng — PA-1 (2026-10-08)

> **Yêu cầu của Đại ca (08/10):** báo cáo kiểm kê chỉ có Mã hàng khó tra — ĐH chốt
> **PA-1**: LEFT JOIN bảng `vaccines` (ma_smed → ten_hang/dvt) thêm 2 cột "Tên vắc
> xin" + "ĐVT" ngay sau "Mã hàng", không đụng logic snapshot/kỳ.
>
> **Đã làm (repo con `3417e1f` — chỉ `agent/etl/sql_reports.py`):** map dict
> vaccines (52 dòng) tra trong Python sau snapshot lô — không đụng SQL; không khớp
> → rỗng (LEFT JOIN); bảng chưa seed → cột rỗng không gãy (try/except). Sửa đủ 3
> chỗ: row dict + placeholder + **return columns const** (bẫy C.197b — lần 1
> verify bắt được columns cũ).
>
> **Verify (bằng chứng thật — schtasks SYSTEM, script `gd366-verify-kiemke.py`):**
> kỳ 09/2026: **1.205 lô còn tồn · 1.026 có tên+ĐVT** khớp vaccines (179 rỗng =
> hàng ngoài danh mục — đúng LEFT JOIN) · 12 cột đúng thứ tự · sample 'Abhayrab
> 0.5ml → Vắc-xin phòng bệnh dại (Ấn Độ) · Liều' · py_compile OK.
>
> **Tiêu chí kiểm chứng (sau Push):** trang /m/bc-kiem-ke chạy lại kỳ bất kỳ →
> bảng chính 12 cột, Tên vắc xin + ĐVT sau Mã hàng; lô ngoài bảng vaccines → 2
> cột rỗng, không mất dòng.
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **5.4.0** /
> repo con **8.3.0**.

### GĐ 367 (Trợ lý Freebuff): PA Push đợt GĐ 363-366 / C.200-C.203 — bump 5.5.0 / 8.4.0 + LIVE production (2026-10-08)

> **Lệnh "Push" của Đại ca (08/10) sau khi em rà dở dang.** ĐH hỏi-đáp chốt: push
> NGAY dù registry còn 1 🔒 (lesson GĐ 354) + bump MINOR 5.5.0 / 8.4.0.
>
> **Rà trùng lặp theo nguyên tắc 3:** pull CẢ 2 repo = up to date · nhánh
> `main..agent-cli` + `main..pipeline-work` = **RỖNG cả 2** · status chỉ file
> deleted cũ của phiên trước (attachments zip + script gd-c184 — không đụng) ·
> email `cuongpk.giong04@gmail.com` ✓. Registry còn duy nhất 1 🔒: **GĐ 365/C.202
> (Bảng giá dịch vụ)** — code khung + OCR draft đã commit đủ (`08d8b4b`,
> `537564e`), đang DỪNG chờ ĐH duyệt 24 cặp map Tên SMED (`map-ten-smed.csv`) để
> seed data — KHÔNG giao file với kiểm kê → ĐH chốt push kèm, GIỮ 🔒 đến khi seed.
>
> **Bump version (lúc Push — đúng quy tắc ĐA AGENT):** app tổng **5.4.1 → 5.5.0**
> (minor — C.202 feature trang Bảng giá dịch vụ + API + tool OCR) — package.json
> + package-lock.json (2 chỗ root) + DEFAULT_VERSION app-shell.tsx — đủ 4 chỗ
> (sót "5.4.1" chỉ là asn1.js + fast-equals thư viện ngoài trùng số trúng — giữ
> nguyên, lesson GĐ 328); repo con **8.3.1 → 8.4.0** (minor — C.200 fix lịch định
> kỳ + C.201 sidebar + C.202 feature + C.203 kiểm kê) — package.json +
> DEFAULT_VERSION — đủ 2 chỗ. Checklist GĐ 138 ✓ (mọi thành phần 1 chữ số).
>
> **Nội dung đợt push:** app tổng — GĐ 363 claim fix lịch định kỳ · GĐ 364/C.201
> sidebar cỡ chữ 14/13/12/12 · GĐ 365/C.202+C.202b khung Bảng giá + OCR draft 52
> dòng · GĐ 366/C.203 kiểm kê +2 cột · GĐ 367 bump. Repo con — C.200 fix guard
> catch-up lịch · C.201 sidebar · C.202/C.202b Bảng giá · C.203 kiểm kê +2 cột ·
> C.204 bump.
>
> **Version:** app tổng **5.5.0** / repo con **8.4.0** — ĐÃ PUSH.

### GĐ 365-close / C.202c (Trợ lý Freebuff): ĐH chốt 24 cặp map — seed đủ 52/52 dòng bảng giá vào price_list — ĐÓNG GĐ 365 (2026-10-08)

> **Anh hỏi “dở dang là gì? chốt luôn”** → em trình bảng 24 cặp Tên web ↔ Mã SMED
> đề xuất (đối chiếu 52 mã thật bảng vaccines) → anh chốt **“Chốt tất cả 24
cặp”** (không sửa cặp nào; 2 dòng Vaxneuvance 15 giá khác map cùng mã — theo
> bảng giá web).
>
> **Đã làm (repo con `ac30244` — `agent/bang-gia/fill-and-seed.py`):** điền 24
> cặp chốt vào `map-ten-smed.csv` (format “ma_smed — ten_hang” khớp tool tự map)
> + **seed thẳng từ CSV đã duyệt** (tool cũ chạy lại sẽ tự map lại từ file gốc —
> ghi đè mất map anh duyệt) → nạp đè `dbo.price_list` 52 dòng · src_hash = md5
> ảnh web d6d42b92… (nút Refresh so hash khớp).
>
> **Verify:** price_list **52/52 dòng · 52/52 có ten_smed** · sample stt 1 “BCG →
> BCG-TCDV — Vắc-xin phòng lao BCG Việt Nam” · assert chặn mã lạ + dòng chưa map.
>
> **Tiêu chí kiểm chứng:** trang /m/banhang-bang-gia-dich-vu (LIVE v8.4.0) → 52
> dòng + cột “Tên Vắc Xin_SMED” đầy đủ; đổi ảnh web (hash khác d6d42b92…) →
> Refresh báo cần seed lại.
>
> **Version:** KHÔNG bump (seed data + script agent — không đổi code app).
> App tổng **5.5.0** / repo con **8.4.0**.

### GĐ 368 / C.205 (Trợ lý Freebuff): Fix Task_03 28 báo cáo fail `time data '2026/10/08' does not match format '%d/%m/%Y'` — PA-1 (2026-10-09)

> **Lỗi của Đại ca (09/10, 7:31 ảnh):** Task_03 (tạo 01:54, chạy 03:28–03:56)
> **0/28 bước OK** — mọi báo cáo fail cùng chuỗi `time data '2026/10/08' does not
> match format '%d/%m/%Y'`. Yêu cầu: tìm hiểu lỗi và khắc phục.
>
> **Chẩn đoán (vòng đỏ + probe chứng thật):** (1) unit tái hiện ĐÚNG chuỗi lỗi
> `_parse_date('2026/10/08')`; (2) DB: **80/80 job sqlreport Task_03 có
> `date_from` ISO YYYY/MM/DD**; (3) log agent 21:52:42: spawn Task_02 · 17:25
> ghi `date = 2026/10/08` (ISO) trong khi · 19:00 ghi `08/10/2026` (đúng);
> (4) Task_03 spawn 01:54 ăn đúng ISO từ config Task_02 · 17:25 → cả 28 fail.
>
> **Bug GỐC — `task_runner._spawn_daily_task`:**
> `d, m, y = today_iso.split("-")` — **THỨ TỰ ĐẢO** (ISO là y-m-d) →
> ddmmyyyy = "2026/10/08". Nhánh fallback strftime DD/MM không bị → task spawn
> sau (19:00) đúng, task 17:25 sai.
>
> **ĐH chốt PA-1. Đã làm 2 file (repo con `68b0525` + docs `f147f94`):**
> 1. **GỐC:** `y, m, d = today_iso.split("-")` — config.date luôn DD/MM/YYYY.
> 2. **`_parse_date` fallback ISO slash/dash** — chặn 2 luồng gửi ISO còn lại
>    (chat AI GĐ 353 / auto-download); sai tháng 13/chuỗi lạ vẫn raise đúng luật.
>
> **Verify:** py_compile OK · unit **8/8 PASS exit 0** (`gd368-fix.test.py`)
> · vòng đỏ XANH 4/4 · **builder chạy THẬT GiondDB với chuỗi ISO '2026/10/08**
> qua schtasks SYSTEM (login 18456): revenue-by-day 1 dòng · xk-by-date 213
> dòng — bản cũ raise ValueError ngay khối.
>
> **Tiêu chí kiểm chứng:** Task_03 spawn sau slot Task_02 kế (17:25 mai) → 28
> báo cáo hết error, log spawn ghi kỳ DD/MM/YYYY; job lỗi 09/10 là snapshot —
> bấm "Chạy lại" trên web để chạy lại.
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.5.0** / repo con **8.4.0**.

### GĐ 369 / C.206 (Trợ lý Freebuff): PA Push đợt GĐ 368 / C.205 — bump 5.5.1 / 8.4.1 + LIVE production (2026-10-09)

> **Lệnh "Push" của Đại ca (09/10, sau GĐ 368).** Rà trùng lặp theo nguyên tắc 3:
> `main..agent-cli` + `main..pipeline-work` = **RỖNG cả 2 repo**; registry 0 🔒
> dở; status sạch (repo con chỉ 1 file deleted `gd-c184-verify…mjs` của phiên
> cũ — không đụng); email `cuongpk.giong04@gmail.com` ✓.
>
> **Bump version (lúc Push — đúng quy tắc ĐA AGENT):** app tổng **5.5.0 →
> 5.5.1** (patch — fix GĐ 368) — package.json + package-lock.json (2 chỗ root,
> dòng sót 5.5.0 = buffer ^5.5.0 thư viện ngoài trùng số trúng — giữ nguyên,
> lesson GĐ 328) + DEFAULT_VERSION app-shell.tsx — đủ 4 chỗ; repo con
> **8.4.0 → 8.4.1** (patch — C.205) — package.json + DEFAULT_VERSION — đủ 2
> chỗ (package-lock 5.9.4 legacy — không đụng, quy tắc GĐ 354). Checklist
> GĐ 138 ✓ (mọi thành phần 1 chữ số).
>
> **Push:** app tổng `b8eaddb..a206e94` (GĐ 368 claim+docs+vòng đỏ+probe · GĐ
> 369 claim+bump) · repo con `3abed04..009b2a3` (C.205 code+f147f94 docs+test ·
> C.206 bump). tsc EXIT 0 cả 2 app trước push.
>
> **✅ Verify production:** curl `giong-vn-v6.vercel.app` = **5.5.1** ·
> `giong-banhang.vercel.app` = **8.4.1** — LIVE, không ghim deployment cũ.
>
> **Tiêu chí kiểm chứng nghiệp vụ:** slot Task_02 17:25 mai → Task_03 spawn với
> config.date DD/MM/YYYY → 28 báo cáo hết error; job lỗi 09/10 = snapshot —
> bấm "Chạy lại" chạy lại ngay.
>
> **Version:** app tổng **5.5.1** / repo con **8.4.1** — ĐÃ PUSH + ĐÃ LIVE.

*Cập nhật lần cuối: 2026-10-09 (GĐ 369 — Push đợt GĐ 368/C.205, bump 5.5.1/8.4.1 LIVE; app tổng 5.5.1 / repo con 8.4.1)*
*Người cập nhật: Trợ lý Freebuff*

---

### GĐ 370 / C.207 (Trợ lý Freebuff): Báo cáo công nợ đặt trước — so đối AI app vs SMED web Từ Sơn: KẾT LUẬN BÁO CÁO ĐÚNG (2026-10-09)

> **Yêu cầu của Đại ca (09/10, 5 ảnh):** chạy lại báo cáo mới nhất nhưng so
> dữ liệu gốc có chênh lệch — anh xem trực tiếp SMED web Từ Sơn
> (`tcgiong.smed.vn/#/dangkydattruoc`) đối chiếu: kỳ 01/01/2026-30/09/2026
> ô 'Sử dụng tốt' hiện 3/7 bản ghi (Verorab 1 múi còn + 2 'ĐÃ HOÀN
> THÀNH'...); kỳ 01/01/2018-30/09/2026 lọc 'Sử dụng tốt' hiện 4/4 bản ghi TS.

> **Chẩn đoán (probe chi-đọc + builder thật — ghép chéo tự động):**
>
> | Khách TS | SMED web kỳ 2018→09/2026 lọc 'Sử dụng tốt' | App cn-dt (kết quả cùng kỳ) | Khớp |
> |---|---|---|---|
> | Chu Lê Anh Thư · VA - MENGOC - BC · 350.000 | 2 dòng còn nợ | còn nợ 2 (700.000) '✓ 2' | ✅ |
> | Đàm Ngọc Hân · Hexaxim · 990.000 | 1 dòng còn nợ | còn nợ 1 (990.000) '✓ 1' | ✅ |
> | Nguyễn Thể Trung Thảo · Verorab 0.5ml · 470.000 | 2 dòng 'Sử dụng tốt' + 2 'ĐÃ HOÀN THÀNH' | còn nợ 2 (940.000) '✓ 2 (+2 đã trả)' | ✅ |
>
> **Bằng chứng data nguồn GiondDB:** f1 Verorab TS 6 dòng (4 'Sử dụng tốt' +
> 2 'Đã hoàn thành') · f2 2 lượt trả 03/07 + 07/07/2026 (đúng 2 dòng ĐHT web).
> Kết quả cn-dt app Khớp web SMED **từng mũi, từng đồng** — Nhận định: số
> mũi còn nợ và số tiền khớp nguyên.
>
> **CẢNH BÁO cho Đại ca (sự nhầm lẫn đáng kể):** số web anh nhăn 3/7 lần
> ('1 Sử dụng tốt + 2 ĐÃ HOÀN THÀNH') là ô **kỳ 01/01/2026-30/09/2026** — kỳ
> HỆ chưa鳌 hưởng (khách hay: Verorab TS f1 có 4 dòng 'Sử dụng tốt' ở cùng
> folder 2026-06-30). Số web cũng khớp nếu lọc chọn đúng.
>
> **Vận hành chi tiết:** sửa `giong-apps/apps/banhang/scripts/gd370-probe-ts.py`
> (ghép API Bridge chỉ-đọc GĐ 329) + chạy qua `schtasks SYSTEM`. URL Tunnel
> Cloudflare đổi mới (`few-stem-tutorials-tea.trycloudflare.com`) — đã chạy
> `scripts/update-tunnel-env.py` (gist) đồng bộ 2 app .env.local.

> **Tiêu chí kiểm chứng:** Đại ca so từng khách TS trên ảnh với app (mỗi
> khách: 'SL mũi còn nợ' = số dòng 'Sử dụng tốt' web · cột 'Kiểm tra nguồn'
> ✓ khớp). Nếu thấy khác phải la to ngay, kèm mã Tra Cứu để em truy vết.

> **Version:** KHÔNG bump (không sửa code app — chỉ probe + docs, chờ lệnh
> Push — quy tắc ĐA AGENT). App tổng **5.5.1** / repo con **8.4.1**.

### GĐ 370-B (Trợ lý Freebuff): Sâu hơn theo chỉ thị "không được đoán" — TIÊN DU: xác nhận LỆCH THẬT 1 mũi — chờ ĐH chốt PA (2026-10-09, 16:2x)

> **ĐH chỉ thị:** "kiểm tra lại sâu hơn vì dữ liệu không thể đoán thế được... em
> có thể vào trang web SMED của Tiên Du kiểm tra công nợ cho rõ ràng hơn" (ảnh
> TS Verorab: web còn nợ 1 'Sử dụng tốt').

> **Đã làm (bằng chứng trực tiếp, KHÔNG đoán):** chạy tool 23 độc lập
> (scripts/gd370-download-tiendu.py — headless, cổng tcgiongts, KHÔNG đụng
> service) tải đủ 4/4 file TIÊN DU kỳ 01/01/2018-09/10/2026 lúc 16:17 +
> builder thật dump cn-dt TD (gd370-run-bccn-td.py).
>
> **Chuỗi bằng chứng (Gardasil 9 · Đinh Thị Hà Phương · TD · 2.915.000):**
> | Nguồn | Data | Còn nợ thực |
> |---|---|---|
> | File SMED tải 16:17 hôm nay | 2 dòng (1 SĐT + 1 ĐHT) | **1 mũi** |
> | File trả mũi tải cùng lúc | 1 lượt trả 11/07/2026 | — |
> | DB app (folder 2026-05-11) | 4 dòng (3 SĐT + 1 ĐHT) + f2 1 trả | 3−1 = 2 |
> | App báo cáo hiện tại | còn nợ 2 — 5.830.000 '✓ 2 (+1 đã trả)' | **2 = SAI** |
>
> **Chân rễ (sửa kết luận GĐ 370 trước):** job download `dattruoc` gần nhất
> CHƯA nạp file mới (ETL nạp đè) → builder tính trên snapshot cũ. Lệch đúng
> 1 mũi/2.915.000đ ở TD; TS Verorab ('web còn nợ 1') cùng cơ chế — KẾT LUẬN
> GĐ 370 "app đúng" chỉ đúng với số file trong DB, KHÔNG đúng với web realtime.
>
> **Chờ ĐH chốt:** PA-1 chạy lại job dattruoc + ETL đè + verify TD=1 mũi ·
> PA-2 = PA-1 + giám sát expected_files 19/19 cảnh báo trên web · PA-3 chỉ
> thêm cột "snapshot at" minh bạch. **KHÔNG sửa code chờ chốt.**
>
> **Version:** KHÔNG bump. App tổng **5.5.1** / repo con **8.4.1**.

### GĐ 370-C / C.207c (Trợ lý Freebuff): PA-1 thực thi — ETL nạp đè file mới Tiên Du vào GiondDB — BẢNG 1 TD còn nợ 1 mũi ✓ khớp web SMED (2026-10-09, chiều)

> **ĐH chốt PA-1** (hỏi-đáp: PA-1 chạy lại + nạp đè · PA-2 + cảnh báo thiếu file · PA-3 cột minh bạch — không sửa code).

> **Đã làm (không đổi code app — script + data):**
> 1. **Quan sát:** job dattruoc tải ngày 09/10 wrote files vào
>    `apps/banhang/OUTPUT/10.GDTVX/2026-10-08/` (76 file — DAY DIR theo `date_to`
>    08/10) — khi 09:00 sáng 09/10 job loadSchedule chạy (chưa qua TB) → DB vẫn
>    snapshot cũ 2026-10-05 → Tiên Du Hà Phương (ngày trả 11/07) lệch 1 mũi.
> 2. **Script `scripts/gd370-push-tiendu.py` (repo con — push qua Tunnel API :8777
>    cục bộ — x-api-token đúng .secrets/api_token.txt của api_server):**
>    - DELETE TOÀN BỘ 4 bảng `stg_10gdtvx_f1..f4` CRITERIA `center='TD'` (309/
>      1070/60/1151 dòng) — tránh dedupe _gdtvx_keep_latest lọc folder-thạng
>      thái cho dữ liệu rename (khớp web SMED mà data casa không đổi).
>    - Parse 4 file mới (OUTPUT/10.GDTVX/gd370-tiendu — 16:17, tool 23 TD cổng
>      tcgiongts) bằng `etl_import.parse_file` + `INSERT folder='gd370-tiendu'`
>      → f1 148 · f2 514 · f3 30 · f4 512 dòng.
> 3. **Verify builder dùng `_gdtvx_load` (ding = folder mới nhất**: TT TD
>    áp từ `time 16:17` không còn snapshot old folder — `dich_vu <> ''` +
>    `ma_tc <> '' + ngay_dang_ky <> ''` f1.** Hà Phương f1 đơn giản còn 2 dòng
>    (1 Sử dụng tốt + 1 Đã hoàn thành) — f2 1 lượt trả 11/07/2026 2915000.**
> 4. **KẾT QUẢ đúng như web SMED Tiên Du realtime:**
>    - **Bảng 1 (`tt-cn`) Tiên Du: 'Số mũi đặt trước còn nợ' = 1** (19 mũi
>      trong gói + 1 đặt trước = tổng 20 — đã 2 trước khi nạp đè).
>    - **`cn-dt` TD chỉ còn 1 khách:** Minh Anh MENGOC 330.000 (Hà Phương bị
>      loại đúng 2.915.000 — f2 11/07 đã lọc).
>    - Kiểm tra nguồn toàn 19: ✓ (không ✗ lệch).

> **Tiêu chí kiểm chứng:** trang bccn kỳ dài → Bảng 1 Tiên Du còn nợ 1 đặt
> trước; TD trên web job MỚI sau mai không lệch web.

> **Version:** KHÔNG bump (không đổi code app — script + data DB — chờ lệnh
> Push — quy tắc ĐA AGENT). App tổng **5.5.1** / repo con **8.4.1**.

---

### GĐ 370-D / C.207d (Trợ lý Freebuff): Ảnh web SMED TS Trung Thảo "còn nợ 1 470.000" → tải file SMED trực tiếp + nạp đè f1+f2 TS — web ghi NỢ CHƯA TRỪ lượt trả (2026-10-09, 17:xx)

> **Ảnh Đại ca (17:36):** web SMED TS mã 106190120120030 (Trung Thảo ·
> Verorab 0.5ml · 470.000) kỳ dài — 3/3 bản ghi: 1 **'SỬ DỤNG TỐT'** + 2
> 'ĐÃ HOÀN THÀNH'. Anh hỏi: "web còn nợ 1, em nói hết nợ?"

> **Chẩn đoán bằng file SMED tải trực tiếp (17:51, scripts/gd370-*.py repo con):**
> file f1 TS mới nhất = 3 dòng (1 SDT + 2 ĐHT) GIỐNG HỆT ảnh web; f2 = 2
> lượt trả Trung Thảo ngày **03/07 + 07/07/2026**. Nghĩa: 3 mũi đặt trước —
> 2 đã tiêm ('Đã hoàn thành'), 1 mũi trạng thái vẫn 'Sử dụng tốt' nhưng
> **đã có 2 lượt ghi trả mũi trong f2** — SMED web đếm NỢ theo TRẠNG THÁI
> (đang còn 1 'Sử dụng tốt' = "còn nợ 1"), KHÔNG trừ lượt trả f2.

> **Đã làm:** DELETE f1+f2 TS toàn folder + INSERT file 17:51 folder
> 'gd370-tuson' (f1 633 dòng · f2 2.966 dòng). f3/f4 gói TS GIỮ nguyên (kỳ
> dài tool chỉ tải được f1/f2 — công nợ GÓI không đụng).

> **Verify builder thật:** cn-dt Trung Thảo **KHÔNG còn trong danh sách
> nợ** — app trừ lượt trả f2 (logic C.182/C.198 đã ĐH duyệt GĐ 338/361 —
> đúng nghiệp vụ "tiền đã thu"). Bảng 1 TS: 135 mũi còn nợ (3 đặt trước =
> Hân 990k + Thư 2×350k) ✓.

> **⚠️ KHÁC BIỆT QUY TẮC ĐẾM (đợi anh chốt):** web SMED = đếm trạng thái raw
> ('Sử dụng tốt' = còn nợ dù f2 đã ghi trả); app = trừ lượt trả (đúng tiền
> thực thu). Trung Thảo: web còn nợ 1 = 470.000 · app còn nợ 0. Nếu anh
> muốn app ĐỒNG BỘ quy tắc đếm web → bỏ lọc đã-trả khỏi cn-dt (số sẽ cao
> hơn vì gộp cả mũi đã trả tiền thật). Anh chốt hướng nào em làm.

> **Version:** KHÔNG bump — app tổng **5.5.1** / repo con **8.4.1**.

### GĐ 371 / C.208 (Trợ lý Freebuff): Fix job LHT kẹt "Đang chạy" 100% — heartbeat đè done + wrap run_smed_task — PA-1 (2026-10-10)

> **Yêu cầu của Đại ca (10/10, ảnh /m/mkt-hentiem):** job Lịch hẹn tiêm
> (09/10) chạy 100% / 19 file Excel xong nhưng badge vẫn "Đang chạy" +
> cảnh báo "Job lâu chưa có tín hiệu". 2 job kẹt: 16bb75cc (19:00) +
> 155bc992 (20:53).

> **Chẩn đoán (bằng chứng DB qua /db/query — không đoán):** cả 2 job
> `finished_at = 19:09:44 / 21:02:41` (đúng thời điểm agent log "Job
> xong — 19 file") nhưng `updated_at = 19:09:55 / 21:02:53` — ~10s sau
> = heartbeat `'running'` cuối (nhịp 30s, in-flight khi report done
> ghi xong) **ĐÈ status về 'running'** — api_server chỉ chặn running
> đè `cancelRequested` (GĐ C.18), chưa chặn đè terminal states. Chi
> tiết đầy đủ ở AGENTS.md repo con C.208.

> **ĐH chốt PA-1.** Đã làm (repo con `e7e308b` + `ddd0035`):
> 1. `40_web_agent.py` — wrap `run_smed_task` try/except riêng: exception
>    → report error — job luôn kết thúc, hết kẹt running vĩnh viễn.
> 2. `api_server.py` agent_report — guard: heartbeat `'running'` KHÔNG
>    đè `done/error/completed/needsData/cancelRequested`.
> 3. Gỡ kẹt 2 job 09/10 — POST `/agent/report` done tay → web badges
>    về "Hoàn thành" (files 19/19).

> **Verify:** py_compile OK · guard-test off-line 5/5 PASS · test thật
> job dattruoc 33176105 — done giữ nguyên sau nhịp heartbeat kế ✓.
> Claim `4d4fdc8` / unlock phiên này.
>
> **⚠️ Checkpoint:** api_server đang chạy code cũ — PHẢI restart
> GIONG_SMED_Agent lúc rảnh để guard mới ăn (taskkill PID python giữ
> port — lesson GĐ 329). KHÔNG bump chờ lệnh Push. App tổng **5.5.1** /
> repo con **8.4.1**.

### GĐ 372 / C.209 (Trợ lý Freebuff): Điều tra tk-goi Trung Thảo 6 dòng app vs 3 dòng SMED web — builder thật ĐÚNG 3 dòng; 6 dòng = snapshot job cũ + trình 3 PA check file mới nhất (2026-10-10)

> **Báo của Đại ca (10/10, 2 ảnh):** tk-goi có 6 dòng Trung Thảo
> (106190120120030 · TS · Verorab) vs SMED web 3 dòng · chỉ thị: MỌI
> báo cáo khởi tạo phải kiểm tra thời gian Download file mới nhất trước
> khi ETL nạp DB.
>
> **Chẩn đoán:** DB f1 Verorab TS khớp web 3/3 (1 'Sử dụng tốt' + 2
> 'Đã hoàn thành') — builder thật (schtasks SYSTEM,
> `scripts/gd372-probe-trungthao.py` repo con) dump tk-goi **3 dòng
> khớp từng dòng/trạng thái/ngày tiêm (03/07 + 07/07/2026)**. Root
> cause 6 dòng = snapshot job cũ trước nạp đè TS 17:51 09/10 (C.207d)
> — f1 lặp 2 folder ×3. Báo cáo là SNAPSHOT — bấm "Chạy lại" là khớp.
>
> **Việc mới (check file Download mới nhất):** trình 3 PA — PA-1 cảnh
> báo minh bạch (timestamp + folder kèm result) · PA-2 + check khoảng
> cách kỳ vs lần Download, cảnh báo trước khi chạy · PA-3 chặn hoặc
> tự-download chain. **CHỜ ĐH chốt PA — chưa code.**
>
> **Version:** KHÔNG bump (điều tra — chờ lệnh Push). App tổng
> **5.5.1** / repo con **8.4.1**.

### GĐ 372b / C.209b (Trợ lý Freebuff): PA-2 — check file Download mới nhất theo lượt tải GDTVX + form cảnh báo (ĐH chốt PA-2 10/10) (2026-10-10)

> **ĐH chốt PA-2** (trong 3 PA): MỌI báo cáo khởi tạo kiểm tra thời gian
> Download file mới nhất — file tải TRƯỚC kỳ kết thúc thì cảnh báo + needsData
> nhờ tải lại trước khi tính (ETL nạp đè file mới).
>
> **Chẩn đoán verify lần 1:** code PA-2 đặt SAI trong `if n == 0:` (bloc
> staging trống) → snapshot 6.316 dòng cũ khiến check không bao giờ chạy —
> K1c dTo 15/10 missing = 0 thay vì 1. Fix: nhánh GDTVX freshness ĐỨNG
> TRƯỚC check staging (pattern MIA/TCB/TPB), so mức NGÀY (file tải trong
> ngày date_to coi như đủ — tránh needsData vô hạn kỳ kết thúc hôm nay).
>
> **Đã làm (3 file repo con `c36176c` + docs):**
> 1. `check_source_data` — nhánh GDTVX freshness: import_log 10GDTVX lượt nạp
>    gần nhất < NGÀY date_to → missing DUYỆT (needsData nhờ tải file mới);
>    khôi phục bloc GĐ 244 fallback về gốc.
> 2. `sql-data-module.tsx` — mốc nạp cũ hơn dateTo → chấm vàng + "⚠ trước kỳ
>    — nên tải mới" + banner gợi ý tick "Tải dữ liệu mới nhất trước khi chạy".
> 3. `sql-report-module.tsx` — thêm freshness + banner vàng "Tải lại dữ liệu
>    từ DOWNLOAD DỮ LIỆU trước khi chạy".
>
> **Verify:** py_compile OK · **4/4 PASS kịch bản thật GiondDB** (k1 dTo
> 15/10 missing=1 · k2 dTo 10/10 missing=0 cùng ngày tải · k3 dTo 01/10
> missing=0 · k4 xk-by-date 0 — cờ chỉ GDTVX) · unit 54/54 PASS · tsc EXIT
> 0 + vite build EXIT 0 · KHÔNG add nav.ts/smed-auth.ts/routeTree.gen.ts
> (dở của phiên khác — GĐ 341).
>
> **Tiêu chí kiểm chứng (production sau Push):** trang bccn (và mọi báo cáo
> qua SqlDataModule) chọn kỳ kết thúc SAU ngày nạp gần nhất → dòng nguồn
> chấm vàng + builder needsData nhờ tải file mới; kỳ kết thúc trong ngày
> nạp → chạy bình thường.
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.5.1** / repo con **8.4.1**.

### GĐ 373 / C.210 (Trợ lý Freebuff): PA Push đợt GĐ 370-372b / C.207-C.209b — bump 5.6.0 / 8.5.0 (2026-10-10)

> **Lệnh "Push" của Đại ca (10/10, sau GĐ 372b).** Rà trùng lặp theo nguyên
> tắc 3: pull CẢ 2 repo = up to date · `main..agent-cli` + `main..pipeline-
> work` = **RỖNG cả 2 repo** · registry **KHÔNG có 🔒 nào dở** · email
> `cuongpk.giong04@gmail.com` ✓.
>
> **CẢNH BÁO ĐH + chốt push kèm (pattern GĐ 367):** working tree còn 4 file
> dở của phiên khác — **khung "Chương trình khuyến mãi" GĐ 370 (10/10)**:
> app tổng `banhang-catalog.ts` (chip lá 2) + repo con `nav.ts`/`smed-
> auth.ts`/`routeTree.gen.ts` + route placeholder — code HOÀN CHỈNH khớp
> tài liệu, KHÔNG giao file với đợt này (file của GĐ 372b đã commit hết)
> → ĐH lệnh push đợt → include theo pattern GĐ 367 (push nhánh dở hoàn
> chỉnh). File deleted cũ (`attachments/*.zip`, `gd-c184-verify…mjs`) —
> của phiên trước, không đụng.
>
> **Bump version (lúc Push — đúng quy tắc ĐA AGENT):** app tổng **5.5.1 →
> 5.6.0** (minor — GĐ 372bfeature freshness PA-2 + khung khuyến mãi GĐ 370
> + GĐ 371 fix heartbeat) — package.json + package-lock.json (2 chỗ root)
> + DEFAULT_VERSION app-shell.tsx — đủ 4 chỗ, grep 0 sót (sót "5.5.1"
> chỉ thư viện ngoài trúng số — lesson GĐ 328); repo con **8.4.1 →
> 8.5.0** (minor — C.209b PA-2 + khung khuyến mãi + C.208 fix heartbeat)
> — package.json + DEFAULT_VERSION — đủ 2 chỗ. Checklist GĐ 138 ✓
> (5.6.0/8.5.0 mọi thành phần 1 chữ số).
>
> **Nội dung đợt push:** GĐ 370 TD/TS nạp đè + điều tra khớp web · GĐ 371
> fix job kẹt 'Đang chạy' · GĐ 372 điều tra tk-goi 3 dòng khớp SMED ·
> GĐ 372b/C.209b PA-2 check file Download mới nhất (freshness GDTVX + 2
> form cảnh báo) · khung khuyến mãi GĐ 370 (phiên khác) · bump.
>
> **Version:** app tổng **5.6.0** / repo con **8.5.0** — ĐÃ PUSH.

### GĐ 374 / C.211 (Trợ lý Freebuff): Restart GIONG_SMED_Agent — nạp code mới (C.208 guard + C.209b PA-2) (2026-10-10)

> **Lệnh "Restart agent" của Đại ca (10/10, trưa 12:41).** Check rảnh: log
> 30 phút = toàn "chưa có job mới", lịch định kỳ TẠM DỪNG; 1 job `blth`
> kẹt running từ 08:52 (process cũ chết) → gỡ tay report error (web bấm
> "Chạy lại" được) → restart an toàn 12:44.
>
> **Restart:** xóa __pycache__ (lesson GĐ 168) · sc stop · kill PID api cũ
> 6200 (lesson GĐ 329) · sc start → RUNNING PID 30540; process mới
> api_server 30104 + web_agent 17772 (12:45).
>
> **Verify:** log `web_agent_101026_124500.log` — poll Vercel 20s, task
> runner 3 slot, health 200 (db OK · 1.363 jobs · tunnel_ok — tunnel mới
> `music-cubic-final-normally`); source mới: C.208 guard (api_server
> dòng 1100-1105) + C.209b PA-2 (sql_reports 12:24) — code GĐ 373
> LIVE đã nạp.
>
> **Tiêu chí kiểm chứng:** job kế tiếp chạy code mới — bccn kỳ sau ngày
> nạp → needsData nhờ tải mới; job chết → error chứ không kẹt Đang chạy.
>
> **Version:** KHÔNG bump — app tổng **5.6.0** / repo con **8.5.0** LIVE.

### GĐ 375 / C.212 (Trợ lý Freebuff): PA-2 mở rộng freshness TẤT CẢ nguồn — builder 4 nhánh max-data thật + server đồng bộ (2026-10-10)

> **Lệnh ĐH (10/10 — chốt PA-2 trong 3 PA).** Mở rộng freshness cho BWX/BKN/
> MIA/TCB/TPB/VCB... cùng nguyên tắc C.209b, so mốc DATA THẬT (bằng chứng
> probe: BKX/BKN/DTTDT max(report_date)=09/10 · MIA 09/10 · TCB 05/10 ·
> TPB/VCB 09/10) — chuẩn hơn imported_at.
>
> **Đã làm (repo con `7131256` — 5 file):**
> 1. `check_source_data` — 4 nhánh freshness TRƯỚC check staging: MIA/TCB/TPB
>    `MAX(period_to) ≥ date_to` · VCB `MAX(tx_date)` · generic
>    `MAX(report_date)` + guard GĐ 244 THỐNG NHẤT = lượt nạp mới nhất
>    (max imported_at) ≥ max-data+1 (file nạp quá khứ không đủ miễn trừ —
>    bắt được nhờ k1 FAIL lần 1) · GDTVX giữ C.209b.
> 2. `-smed.ts` — `maxDataCol()` module-scope + `loadSourceFreshness` trả
>    `'mốc|STALE'` (max-data < date_to, 2 vòng query đồng bộ) +
>    `checkReportFreshness` banner đổi sang scalar max-data.
> 3. Form 2 chỗ parse `|STALE` (sql-data-module + sql-report-module).
>
> **Verify:** py_compile OK · **8/8 PASS kịch bản thật GiondDB** (schtask
> SYSTEM — BKX/VCB/MIA/TCB kỳ tương lai → missing=1 nhờ tải mới; kỳ đến
> đúng max → 0 không hỏi oan) · unit **54/54 PASS** · **tsc EXIT 0** (fix
> 4 lỗi TS: maxDataCol scope + raw null) · dọn verify tạm.
>
> **Version:** KHÔNG bump (chờ lệnh Push). App tổng **5.6.0** / repo con
> **8.5.0** — đã LIVE GĐ 373.

### GĐ 376 / C.213 (Trợ lý Freebuff): Đồng bộ quy tắc ĐẾM công nợ đặt trước kiểu WEB SMED + Push 5.6.1 / 8.5.1 + Restart agent (2026-10-10)

> **Chốt của Đại ca (10/10) — trọn bộ 3 lệnh cùng lúc:** (1) builder đếm
> công nợ đặt trước theo **QUY TẮC WEB SMED** — còn nợ = dòng f1 'Sử dụng
> tốt' RAW, KHÔNG trừ lượt trả f2 (GĐ 338/C.182 + C.198 loại `_da_tra` →
> số builder THẤP HƠN web SMED); (2) lệnh **"Push"** (bump 5.6.1 / 8.5.1 +
> push 2 repo); (3) lệnh **"Restart agent"** (nạp C.212 freshness + bản
> đếm web).
>
> **Đã làm (chi tiết đầy đủ ở AGENTS.md repo con C.213, code `664a41e`):**
> `sql_reports.py` 2 chỗ — cn-dt nhóm = TẤT CẢ f1 'Sử dụng tốt' cùng khóa
> + 'Kiểm tra nguồn' độc lập '(+M đã trả — web vẫn đếm)' · Bảng 1 'Số mũi
> đặt trước còn nợ' + tiền đếm RAW + 'Kiểm tra' = tk 'Chưa tiêm' + f1 đã
> trả. Lượt trả f2 vẫn ghép cho Bảng 3 'Đã tiêm' + 'Ngày tiêm' (GĐ 338
> giữ nguyên).
>
> **Verify:** py_compile OK · unit builder PASS TOÀN BỘ (T13: KH đã trả
> mũi 350.000 VẪN còn trong cn-dt — TA 2 dòng 500.000 · Bảng 1 = 2 ·
> '✓ 2' · T14: cn-dt 2 · 600.000 · Bảng 3 phân đúng 'Đã tiêm'/'Chưa
> tiêm'). Chi tiết verify Push + Restart ở entry Push bên dưới.
>
> **Lưu ý đối chiếu:** sau GĐ này công nợ đặt trước builder = số web SMED
> (CAO HƠN bản C.198 — khách đã trả tại quầy quay lại nằm trong còn nợ
> theo đúng quy tắc web).

### GĐ 377 / C.215 (Trợ lý Freebuff): UNDO GĐ 376/C.213 — công nợ đặt trước SAI CƠ BẢN khi Đại ca kiểm chứng (2026-10-10)

> **Báo cáo của Đại ca (10/10):** chạy job MỚI kiểm chứng tiêu chí "cn-dt +
> Bảng 1 = web SMED" → **SAI CƠ BẢN** → lệnh "Em undo lại phần công nợ đặt
> trước này nhé".
>
> **Đã làm (repo con `c0fce52` — `git revert 664a41e`, KHÔNG viết lại lịch
> sử):** sql_reports.py + test trả NGUYÊN VĂN logic C.198 trước GĐ 376 —
> cn-dt + Bảng 1 LOẠI mũi đã trả `_da_tra` (ghép lượt GĐ 361, khóa giá);
> 'Kiểm tra nguồn'/'Kiểm tra' về công thức C.198; test T13/T14 về kỳ vọng
> cũ. Chi tiết đầy đủ ở AGENTS.md repo con C.215.
>
> **Verify:** `git diff 7131256 HEAD` trên 2 file = **0 dòng** (khớp 100%
> bản trước GĐ 376) · py_compile OK · unit PASS TOÀN BỘ.
>
> **Bài học GĐ 376:** quy tắc "web đếm RAW f1 'Sử dụng tốt'" không đúng số
> liệu thật — đổi logic phải soi bằng chứng job thật chạy đủ 2 nguồn trước
> khi chốt, không đổi theo mô tả suy đoán.
>
> **Version:** KHÔNG bump (chưa Push). ⚠️ Production 5.6.1 đang chạy logic
> SAI → CẦN Push đợt revert + restart agent nạp bản cũ — chờ lệnh ĐH.

### GĐ 378 / C.216 (Trợ lý Freebuff): Fix "Sao kê ngân hàng TCB không đủ dữ liệu dù đã download" — ETL TCB nạp 0 giao dịch, parser hardcode header dòng 29 vs template thật dòng 21 (2026-10-10)

> **Yêu cầu của Đại ca (10/10, 2 ảnh):** báo cáo "Sao kê ngân hàng TCB" hiển thị
> "⚠ Chưa đủ dữ liệu" dù job download đã hoàn thành 1/1 file Excel kỳ 09/10 lúc
> 13:34 (trang /m/bank-tcb) — kiểm tra và khắc phục.

> **Chẩn đoán (chuỗi bằng chứng — skill diagnosing-bugs):** log agent 13:35:34
> `ETL sau download: exit=0 — 1 file nạp (0 giao dịch), 5 skip` → ETL "thành
> công" nhưng nạp 0 giao dịch. File XLSX kỳ 09/10 có THẬT 3 giao dịch (2 nguồn
> độc lập khớp: đếm dòng ISO cột 2 bằng openpyxl = meta "Tổng lệnh ghi nợ 1 +
> ghi có 2"). Gốc rễ: parser `bank_tcb_import.parse_saoke` hardcode giao dịch
> từ `rows[28:]` (header dòng 29 — đo theo template kỳ T9) trong khi template
> TCB thật đặt header ~DÒNG 21 → giao dịch dòng 22-28 rơi ngoài vùng quét.
> Vòng đỏ `gd378-probe-tcb-parse.py` (so GD parse vs meta tổng lệnh + import_log
> + DB): 5/6 file ĐỎ — T9: 326/333 · 29/09: 9/16 · 05/10: 36/43 · 08/10: 0/6 ·
> 09/10: 0/3 = **30 giao dịch thiếu trong DB**; nguy hơn: file nạp thiếu vẫn
> ghi hash import_log → auto-ETL sau skip vĩnh viễn (log "6070 skip").

> **Đã làm (chi tiết đầy đủ ở AGENTS.md repo con C.216, code `5a9c60a` +
> docs `15a4237`):** (1) parser TÌM header theo nhãn (cột 0 'Ngày KH thực hiện'
> / cột 1 'Ngày giao dịch' trong 40 dòng đầu, fallback dòng 29) + meta quét
> trước header; (2) unit `bank_tcb_import.test.py` 4 kịch bản (header 21/29/20
> + 7 GD) — ĐỎ trước fix (T1+T4 fail 0 GD), XANH PASS 4/4 sau fix; (3) xóa 8
> hash import_log BANKTCB + chạy ETL thật: `6 file nạp (401 giao dịch), 0 skip`.

> **Verify (bằng chứng thật):** probe xanh 6/6 (parse = meta = log = DB từng
> file) · tiền kỳ 09/10 khớp từng đồng: Nợ 13.538.070 · Có 13.000.000 · dư đầu
> 1.259.537 · check nguồn `bank-tcb-tonghop` kỳ 09/10 missing RỖNG — ĐỦ DỮ
> LIỆU · builder thật Phần 1 đúng số · **E2E production 7/7 PASS**
> (`gd378-verify-prod.mjs`: login → SSO → /m/bc-bank-tcb → Chạy báo cáo kỳ
> 09/10 → Hoàn thành, bảng hiện 13.000.000 / 13.538.070).

> **Phát hiện kèm (KHÔNG sửa — chờ ĐH chốt):** "Số dư cuối kỳ" Phần 1 TCB ra
> 8.259.537 (running balance dòng CUỐI file = GD cũ nhất 08:14) thay vì 721.467
> (meta số dư hiện tại = GD mới nhất 10:59) — file TCB sort thời gian GIẢM dần
> ngược giả định builder (VCB tăng dần). Thuộc `bank_tcb_tonghop` (C.130) —
> khác phạm vi, hỏi ĐH có fix thêm không.

> **Kỳ 10/10 chưa có data:** file sao kê TCB ngày 10/10 chưa download (OUTPUT
> chỉ có tới 2026-10-09) — kỳ 10/10 cần bấm "Tải sao kê TCB" trước, rồi chạy
> báo cáo (không phải bug).

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.6.1** / repo con **8.5.1**.

### GĐ 379 / C.217 (Trợ lý Freebuff): PA Push đợt GĐ 377-378 / C.215-C.216 — bump 5.6.2 / 8.5.2 + LIVE production + restart agent nạp C.215 (2026-10-10)

> **Lệnh "Push" của Đại ca (10/10, sau GĐ 378).** Rà trùng lặp theo nguyên tắc 3:
> `main..agent-cli` = RỖNG cả 2 repo; registry KHÔNG có 🔒 dở mới (các 🔒 sót
> đều GĐ cũ đã hoàn tất — dọn dịp khác); status còn `src/lib/permissions.ts`
> modified (sót GĐ 315 — chờ ĐH OK riêng, KHÔNG đụng) + `attachments/*.zip`
> deleted cũ + repo con `gd-c184-verify-banhang-nav.mjs` deleted cũ — không
> add; email `cuongpk.giong04@gmail.com` ✓.

> **Bump version (lúc Push — đúng quy tắc ĐA AGENT):** app tổng **5.6.1 →
> 5.6.2** (patch — C.215 revert logic công nợ đặt trước + C.216 fix ETL TCB) —
> package.json + package-lock.json (2 chỗ root) + DEFAULT_VERSION
> app-shell.tsx — đủ 4 chỗ, grep 0 sót; repo con **8.5.1 → 8.5.2** (patch —
> cùng nội dung) — package.json + DEFAULT_VERSION — đủ 2 chỗ, grep 0 sót.
> Checklist GĐ 138 ✓ (mọi thành phần 1 chữ số).

> **Push:** app tổng `aff105c..b6d0d9f` (GĐ 377 claim+entry+unlock · GĐ 378
> claim+entry+unlock · GĐ 379 claim+bump) · repo con `82cfc16..55ae65c` (C.215
> revert+docs · C.216 code+docs · C.217 bump).

> **✅ Verify production (curl --compressed + grep -a):** app tổng
> `giong-vn-v6.vercel.app` = **5.6.2** · app con `giong-banhang.vercel.app` =
> **8.5.2** — cả 2 LIVE. E2E prod `gd378-verify-prod.mjs` chạy lại sau push:
> **7/7 PASS** — trang bc-bank-tcb kỳ 09/10 Hoàn thành + bảng
> 13.000.000 / 13.538.070 đúng.

> **Vận hành:** restart GIONG_SMED_Agent 18:30 nạp sql_reports bản C.215
> (chờ job hentiem 19 file kỳ 10/10 của Đại ca xong 18:28 + rảnh 50s mới
> restart — không cắt job) — xóa __pycache__ · sc stop → start · RUNNING PID
> mới 29212 · log `web_agent_101026_183032` · health 200 (db OK · 1.371 jobs ·
> `tunnel_ok` — tunnel đổi URL `unnecessary-programming-convicted-very…`) →
> `scripts/update-tunnel-env.py` đã đồng bộ `.env.local` 2 app.

> **Version:** app tổng **5.6.2** / repo con **8.5.2** — ĐÃ PUSH + ĐÃ LIVE.

### GĐ 380 (Trợ lý Freebuff): Sửa ZCode provider NVIDIA "Model request failed" — id model sai 1 ký tự (5-3 → 5.3) + rule map reasoning_effort (2026-10-10)

> **Yêu cầu của Đại ca (10/10, 22:50 — ảnh ZCode Model settings):** provider
> custom "Nvidiacuongpkgiong04" (NVIDIA integrate API) — nút kiểm kết nối báo
> "Failed to connect … z-ai/glm-5-3-flash: Model request failed". Anh kèm gợi ý
> từ lần sửa ở máy nhà: thêm `providerModelRules` ghi đè tham số — chỉ gửi
> `reasoning_effort` (NVIDIA không nhận `reasoning`), copy nguyên xi rule chính
> chủ ZCode cho opencode.ai.

> **Chẩn đoán (probe thật NVIDIA API — key của anh, request nhỏ):**
> (1) `GET /v1/models` 200 — key + mạng OK, danh sách có **`z-ai/glm-5.3-flash`**
> (dấu CHẤM), KHÔNG có `z-ai/glm-5-3-flash` (dấu GẠCH) trong cấu hình → id sai
> 1 ký tự → POST trả 404 "page not found" = đúng lỗi "Model request failed";
> (2) POST id đúng + `reasoning_effort":"high"` → **200 model trả lời thật**;
> (3) POST id đúng + `"reasoning":{"effort":"high"}` (dạng ZCode mặc định) →
> **400 "Validation: Unsupported parameter(s): `reasoning`"** — khớp nguyên
> gợi ý của anh.

> **Đã làm:** backup `provider_config.json.bak-gd379` + sửa
> `C:\Users\Administrator\.zcode\v2\provider_config.json`:
> (1) `personalModelIds`/`modelOrder`/`modelId` `z-ai/glm-5-3-flash` →
> `z-ai/glm-5.3-flash`;
> (2) `optionSpecs` copy NGUYÊN VĂN rule chính chủ `opencode-go-chat`
> (`glm-5.3-flash`, zcode-builtin.json): `reasoningLevel` values
> low/high/max + map `{"reasoning_effort": reasoningLevel}` ·
> `maxOutputTokens` max 131072 + map `{"max_tokens": maxOutputTokens}`;
> (3) `properties` đồng bộ rule chính chủ (contextWindow 1M giữ của anh,
> inputFormat text/image/video/pdf).

> **Verify:** JSON parse OK · modelOrder/modelId đọc lại đúng
> `z-ai/glm-5.3-flash` · optionSpecs map khớp rule chính chủ ký tự-đôi-ký-tự.
> POST thật với bộ (id đúng + reasoning_effort + max_tokens) đã 200 (T4).

> **Tiêu chí kiểm chứng (Đại ca):** ZCode → Model settings → bấm Refresh
> (⟳) hoặc khởi động lại ZCode → model trong danh sách đổi thành
> `z-ai/glm-5.3-flash` → bấm nút kiểm kết nối (chain) → ✅ không còn
> "Model request failed". Máy nhà áp tương tự: sửa
> `C:\Users\<user>\.zcode\v2\provider_config.json` (id + optionSpecs như
> trên — hoặc đè bằng file đã sửa này, API key y hệt).

> **Version:** KHÔNG bump (cấu hình máy — 0 đụng code app). App tổng
> **5.6.2** / repo con **8.5.2**.

### GĐ 381 / C.218 (Trợ lý Freebuff): Gỡ dòng phụ "Tổng mũi" dưới SUBTOTAL trang Báo cáo bán hàng (2026-10-10)

> **Yêu cầu của Đại ca (10/10, ảnh /m/bc-banhang app con):** phần "Chạy báo cáo
> bán hàng (DT) từ dữ liệu SQL (GiondDB)" — bỏ dòng "Tổng mũi" đi vì **sai số
> liệu và không cần thiết** trên báo cáo này.

> **Chẩn đoán:** dòng phụ đến từ 2 prop **opt-in** C.183 (GĐ 339) truyền tại
> `bc-banhang.tsx` (`subtotalExtraSumCol="Mũi tiêm"` +
> `subtotalExtraSumLabel="Tổng mũi"`) — khung `report-result-table` chỉ render
> dòng này khi có truyền. Grep toàn app con: duy nhất trang này truyền 2 prop.
> Đại ca đã chốt đích danh qua ảnh → thực hiện luôn (không hỏi lại).

> **Đã làm (PA-1, code repo con `8e4f264`):** xóa 5 dòng (comment C.183 + 2
> prop) trong `apps/banhang/src/routes/m/bc-banhang.tsx`. Khung chung
> (`sql-data-module` / `report-result-table`) GIỮ NGUYÊN — không trang nào khác
> bị ảnh hưởng; SUBTOTAL chính (đếm Giờ tiêm) không đổi.

> **Verify:** tsc EXIT 0 (lesson vận hành: shim `tsc` .cmd chết ở UNC cwd —
> "UNC paths are not supported" → chạy `node node_modules/typescript/bin/tsc
> --noEmit` trực tiếp). Dòng phụ là render client-side → hiệu lực NGAY cả job cũ.

> **Tiêu chí kiểm chứng:** trang Báo cáo bán hàng (mở job cũ hoặc chạy mới) —
> dưới "SUBTOTAL (N dòng)" KHÔNG còn dòng "Tổng mũi"; các báo cáo khác không đổi.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.6.2** / repo con **8.5.2**.

### GĐ 382 / C.219 (Trợ lý Freebuff): Fix "Số dư cuối kỳ" Phần 1 sao kê TCB — builder lấy balance GD CŨ nhất do file TCB template sort GIẢM dần (2026-10-10)

> **Yêu cầu của Đại ca (10/10 tối):** "Okay fix số dư cuối kỳ TCB" — tiếp phát
> hiện kèm GĐ 378. Phần 1 Tổng hợp kỳ 09/10: "Số dư cuối kỳ" ra 8.259.537
> trong khi meta file ghi "Số dư hiện tại" = 721.467. Số GĐ 381 bị phiên khác
> claim trước (gỡ dòng "Tổng mũi") → theo quy tắc GĐ 285 lấy **GĐ 382 / C.219**.

> **Chẩn đoán:** builder `bank_tcb_tonghop` (GĐ 298 PA-2') lấy balance GD
> "cuối cùng trong ngày" qua `row_number() … order by x.id desc` — giả định id
> tăng theo thời gian. Thực tế file TCB template sort thời gian GIẢM dần (mới
> nhất TRƯỚC — verify 5/5 file có GD, kể cả kỳ tháng 9 + kỳ 10/10 mới tải) →
> id nạp tăng theo thứ tự file: id NHỎ = GD mới nhất, id LỚN = cũ nhất →
> order desc lấy nhầm GD cũ nhất (09/10: id 3 = SANOFI 08:14 = 8.259.537 thay
> vì id 1 = TANAPHAR 10:59 = 721.467).

> **Đã làm (chi tiết ở AGENTS.md repo con C.219, code commit này):** 1 chỗ
> `bank_tcb_tonghop`: `order by x.id desc` → `order by x.id asc` + docstring/
> comment GĐ 382. Giữ triết lý GĐ 298 (balance ngân hàng ghi sẵn — đúng kể cả
> DB thiếu GD); bank_tcb_tx không có giờ phút (req_date là DATE) — nếu template
> TCB tương lai sort tăng dần thì phải thêm req_datetime đầy đủ qua ETL.

> **Verify (builder thật trên GiondDB):** kỳ 09/10 — Số dư ngày 09/10 =
> **721.467** ✓ · "Số dư cuối kỳ" = **721.467** ✓ khớp meta từng đồng (trước:
> 8.259.537) · đầu kỳ 1.259.537 giữ nguyên ✓ · kỳ tháng 9 (333 GD/24 ngày): 26
> dòng hợp lệ, cuối kỳ = balance 30/09 ✓ · py_compile OK. Restart agent chờ
> rảnh (đang chạy job 23:00 khi commit) — check khi verify.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.6.2** / repo con **8.5.2**.

### GĐ 383 (Trợ lý Freebuff): PA Push đợt GĐ 380-382 / C.218-C.219 — bump 5.6.3 / 8.5.3 + LIVE production + dựng SSH máy DESKTOP-F6K8CBD (2026-10-10)

> **Lệnh "Push" của Đại ca (10/10, sau GĐ 381/382).** Chạy trên máy DESKTOP-F6K8CBD
> (user cuong) lần đầu — SSH dựng mới trước khi push (xem phụ dưới).

> **Rà trùng lặp theo nguyên tắc 3:** `main..agent-cli` + `main..pipeline-work` =
> RỖNG; registry cột trạng thái sạch (1 🔒 SÓT GĐ 363/C.200 từ 08/10 — việc đã
> xong qua commit `68b0525`/`f147f94`, push từ đợt GĐ 367 — đã dọn ô thành ✅);
> status chỉ `permissions.ts` modified (GĐ 315/379 chờ ĐH OK riêng) + 2 file
> deleted cũ — KHÔNG add file của agent khác.

> **Bump version (lúc Push — đúng quy tắc ĐA AGENT):** app tổng **5.6.2 → 5.6.3**
> (patch — C.218 gỡ dòng phụ + C.219 fix builder TCB) — package.json +
> package-lock.json (2 chỗ root) + DEFAULT_VERSION app-shell.tsx — đủ 4 chỗ ·
> repo con **8.5.2 → 8.5.3** (patch) — package.json + DEFAULT_VERSION — đủ 2
> chỗ. Node script kiểm đếm match trước khi ghi (5 file, 6 chỗ, 0 sót version
> cũ — grep xác nhận). Checklist GĐ 138 ✓ (mọi thành phần 1 chữ số).

> **Push:** app tổng `b6d0d9f..3d552f6` (12 commit — GĐ 379 entry · GĐ 380
> claim+docs · GĐ 381/C.218 claim+docs · GĐ 382/C.219 claim+docs+unlock · GĐ 383
> claim+bump) · repo con `55ae65c..4c6cdfd` (6 commit — C.218 code+docs · C.219
> code+docs · C.220 bump).

> **✅ Verify production (curl --compressed):** app tổng
> `giong-vn-v6.vercel.app` = **VERSION 5.6.3** · app con
> `giong-banhang.vercel.app` = **VERSION 8.5.3** — cả 2 LIVE. Lesson: SSR HTML
> render `VERSION <!-- -->5.6.3` (React tách text node bằng comment) → pattern
> grep `VERSION [0-9.]` KHÔNG khớp — phải grep `5\.6\.3` rồi soi context.

> **Phụ — dựng SSH máy DESKTOP-F6K8CBD (user cuong, ZCode máy cá nhân):** máy
> ĐÃ có key `id_ed25519` (đã đăng ký GitHub tài khoản cuongpkgiong04-beep —
> `ssh -T git@github.com` ra "Hi cuongpkgiong04-beep!") — chỉ thiếu alias:
> thêm block `Host github-beep → HostName github.com + User git +
> IdentityFile ~/.ssh/id_ed25519 + IdentitiesOnly yes` vào `~/.ssh/config`.
> `ssh -T git@github-beep` ✓ · pull --ff-only cả 2 repo "Already up to date".

> **Tiêu chí kiểm chứng:** trang bc-banhang production hết dòng "Tổng mũi"
> dưới SUBTOTAL (job cũ cũng hết — render client-side); job bccn MỚI → "Số dư
> cuối kỳ" TCB lấy GD mới nhất (C.219 — cần restart agent để nạp builder mới).

> **Version:** app tổng **5.6.3** / repo con **8.5.3** — ĐÃ PUSH + ĐÃ LIVE.

---

### GĐ 384 / C.221 (Trợ lý Freebuff): DOWNLOAD DỮ LIỆU — hết cảnh báo oan "thiếu file" MISA/MIA/Bank + MIA fail do Cổng GDT 504 (2026-10-11)

> **Yêu cầu của Đại ca (11/10 tối, 7 ảnh):** (1) các bảng download ngoài SMED
> KHÔNG theo chuẩn 19 file (MISA meInvoice 1 file · MIA Tool 1 file · Bank
> 1 file/ngân hàng · "Thống kê DT tổng hợp Chuỗi" 2 file) → không được báo
> "Chưa hoàn thành thiếu file", phải xác định ĐỦ = hoàn thành; (2) DOWNLOAD
> DỮ LIỆU TỪ MIA TOOL đều lỗi — xem lại khắc phục.

> **Chẩn đoán bằng chứng thật (không đoán):**
> 1. **DB GiondDB qua tunnel `/db/query`:** 30 job download gần nhất (tạo
>    11/10) `expected_files=19` TOÀN BỘ — kể cả bkth-hdgtgt. Map đúng GĐ 228c
>    chỉ ăn khi tạo job TỪ TRANG download; job của ĐH do **Task-runner**
>    (`agentCreateTaskJob` -tasks.ts) + **Tổng quan** (-overview.ts) tạo qua
>    INSERT THIẾU cột expected_files → DEFAULT 19 → MISA/MIA/Bank/DT-Chuỗi
>    bị so 19 → badge oan "Chưa hoàn thành — thiếu file" + "Tỷ lệ hoàn thành
>    1/19 file — thiếu 18 file".
> 2. **MIA:** curl độc lập từ máy ngoài: GET `/api/sco-query/invoices/sold`
>    KHÔNG Authorization → 403 ngay 0.1s; CÓ Authorization → **HTTP 504 sau
>    đúng 60s** — gateway Cổng HĐĐT Quốc gia không phản hồi (login + captcha
>    vẫn sống). Lịch sử DB: MIA done lần cuối 09/10 19:39 (4/4 phân hệ) →
>    11/10 cả 4 error "Read timed out (60s)" — client timeout 60s ngắt TRƯỚC
>    khi gateway trả 504 → message mù mờ, ĐH tưởng tool hỏng.

> **Đã làm (chi tiết đầy đủ ở AGENTS.md repo con C.221, code `0f2528c`):**
> lib chung `smed-expected.ts` (map GĐ 228c + `isNonCenterReport`) — 3 chỗ
> INSERT (-smed/-tasks/-overview) cùng 1 nguồn; UI fallback job cũ ef=19 sai
> phân hệ + đơn vị "file" cho nhóm non-center + VCB hiện số thuần khi files
> > chuẩn kỳ; tool MIA timeout GET ≥90s + retry 502/503/504 backoff 15/30/45s
> + `_gdt_down_hint` message rõ "lỗi PHÍA CỔNG — chờ 5-15 phút bấm Thử chạy lại".

> **Verify:** tsc EXIT 0 · `gd384-smed-expected.test.ts` **20/20 PASS** ·
> `43_mia_hddt.test.py` **7/7 PASS** · py_compile OK. **Vận hành:** tool MIA
> chạy subprocess mỗi job → fix hiệu lực NGAY job kế tiếp; phần web chờ Push.

> **Tiêu chí kiểm chứng:** sau Push — trang MISA/MIA/TCB/TPB: job đủ file →
> badge XANH "Hoàn thành" (job cũ 11/10 cũng hết vàng nhờ fallback); banner
> "Đã export x/1 file"; job MIA bấm "Thử chạy lại" khi Cổng GDT hồi phục →
> chạy bình thường, còn đang lỗi → message nói rõ lỗi phía Cổng.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.6.3** / repo con **8.5.3**.

### GĐ 385 / C.222 (Trợ lý Freebuff): "Báo cáo tiêm hộ" — builder nguồn stg_2DTTDT + Task_03 + trang /m/bc-tiem-ho (2026-10-11)

> **Yêu cầu của Đại ca (11/10):** Xây dựng "Báo cáo tiêm hộ" từ tool
> `13_MKT_TIEMHO.py` (anh copy vào agent). Anh đính chính: nguồn = dữ liệu
> ĐÃ tải của "Thống kê DT theo đối tượng" (stg_2DTTDT) — tiếp nối Báo cáo
> thu tiền; bỏ chỗ thừa của tool 13 (đổi tên file/làm sạch — đã có ETL +
> builder tt-by-date), CHỈ thêm cột "Trung tâm tiêm hộ"; thêm BẢNG TỔNG HỢP
> bên dưới bảng chi tiết; lịch đặt vào Task_03 (báo cáo, không download).
> Em hỏi lại 3 điểm — ĐH chốt **1A** (chỉ dòng tiêm hộ: Thu ngân dạng
> `TênNV_MãTT` — 8.650/136.063 dòng) · **2A** (tổng hợp theo cặp Trung tâm ×
> TT tiêm hộ) · **3** (chuẩn hóa 19 mã: DX→ĐX/CD→CĐ/SD→SĐ/DY→ĐY; TĐ giữ —
> trùng TD=Tiên Du).

> **Đã làm (chi tiết đầy đủ ở AGENTS.md repo con C.222, code `5748166` +
> docs `452d710`):** builder `tiem_ho()` trong `sql_reports.py` (nguồn dtdt,
> cột mới chèn sau "Trung tâm" — đúng tool 13; meta.sheets."tong-hop") +
> EMPTY_OK_KEYS +tiem-ho (lọc nghiệp vụ như xuat-huy C.65) · `task_runner.py`
> TASK_QUERY_KEYS +tiem-ho (whitelist đối chiếu 29/29) · `-smed.ts` 3 map
> (nguồn · nhóm banhang-marketing · leaf /m/bc-tiem-ho) · trang `bc-tiem-ho`
> thay placeholder C.55 (SqlDataModule + SubSheets). Route + phân quyền +
> catalog app tổng ĐÃ CÓ SẴN từ trước — 0 đụng app tổng code.

> **⚠️ Multi-agent:** phiên GĐ 384 song song commit `-smed.ts` nguyên khối
> (`0f2528c`, 23:49) kéo theo 4 dòng map tiem-ho của phiên này vào commit
> GĐ 384 — lịch sử không viết lại (quy tắc 3 GĐ 242), entry C.222 mô tả thật.

> **Verify:** py_compile OK · builder thật kỳ 2018→09/2026 **8.392 dòng /
> 203 cặp / 7.293.198.300đ — SQL độc lập đối chứng KHỚP TỪNG ĐỒNG** · tsc
> EXIT 0 · whitelist 29/29. E2E local `gd-c222-verify-tiemho.mjs`: job lỗi
> đúng dự đoán khi service chưa nạp builder mới ("tiem-ho không hỗ trợ") →
> chờ restart GIONG_SMED_Agent rảnh rồi chạy lại (Task_02 slot 23:00 đang
> chạy — GĐ 330 không cắt job).

> **Verify hoàn tất (11/10 đêm, sau restart agent 2 lần — lần 2 PID 33368):**
> E2E `gd-c222-verify-tiemho.mjs` lần 8 **14/14 PASS** — job 4s · cột
> "Trung tâm tiêm hộ"=TĐ · **STT=1** (sửa follow-up `f72a5b8`: đánh lại STT
> 1→N xuyên suốt đúng tool 13 — đối chứng builder thật kỳ 04/03: 19 dòng
> STT 1→19) · ngày dd/mm/yyyy · TỔNG HỢP SUBTOTAL 19 phiếu · 19 SL ·
> 13.455.000 · 8 cặp. Bài học vận hành: restart có zombie python cũ còn
> sống claim job trước (nssm giữ process con — GĐ 329) + E2E race đọc job
> cũ. **Lịch agent vẫn ĐANG TẠM DỪNG (kv=1) + task ma 17:25 'running' — do
> Đại ca/phiên khác thao tác 00:50, em không đụng.** Task_03 ngày mai tự
> chạy 29 báo cáo. Sau Push: production nhắc restart agent server.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.6.3** / repo con **8.5.3**.

> **Bổ sung GĐ 384 — C.221b (`722e822`, docs repo con `4e06b1f`):** theo dõi
> DB sau commit: job MIA 22:27 chạy tool MỚI (timeline 192s khớp backoff mới)
> nhưng Cổng GDT sập LUÂN PHIÊN 504/500/timeout — HTTP 500 trả NGAY chưa nằm
> trong hint → thêm `"HTTP 500"` vào `_GDT_DOWN_KEYS` + mở rộng nhánh backoff
> `(500, 502, 503, 504)` · unit **8/8 PASS**. Cổng GDT còn hỏng tối 11/10 —
> job MIA bấm "Thử chạy lại" khi Cổng hồi phục.

### GĐ 386 / C.223 (Trợ lý Freebuff): Lịch Nhiệm vụ app con — Task_02 CHỈ 1 slot 23:00 + Task_04 MỚI 17:15 (báo cáo nhanh Dashboard/Đối soát) + Task_03 điều kiện Task_02+Task_04 xong (2026-10-12)

> **Yêu cầu của Đại ca (12/10, kèm lệnh "Phân tích và chạy cái này cho anh"):**
> (1) Task_02 chỉ định chạy 1 lần 23:00 hàng ngày; (2) thêm Task_04 chạy các báo
> cáo NHANH cuối ngày 17:15 = [mọi báo cáo để có số liệu trên Dashboard "Tổng
> quan" gồm KPI + biểu đồ] + [mọi báo cáo để có số liệu trên "Báo cáo cuối ngày
> - Đối soát HĐ-XK"]; (3) Task_03 khởi chạy khi Task_02 hoàn thành VÀ Task_04
> lấy xong dữ liệu.

> **Phân tích thiết kế (probe thật trước khi code):** Dashboard Tổng quan đọc
> staging TRỰC TIẾP (-overview.ts: stg_2DTTDT/12BLTH/4BKCCN/5BKN/6BKX/7BCNXT/
> 3DTTHC/11BKCT) — không đọc kết quả job báo cáo; "Báo cáo cuối ngày" = queryKey
> `dsxk-comparison` (3 nguồn dtthc/xuatkho/bkct). → **Task_04 = download 8 phân
> hệ phủ đúng các nguồn đó** (dtdt/blth/bkccn/nhapkho/xuatkho/xnkt/dtthc/
> bkct-hdgtgt — "Task_04 lấy xong dữ liệu" trong yêu cầu (3) chính là đây) **rồi
> chạy 14 báo cáo SQL có nguồn ⊆ 8 phân hệ** (gồm dsxk-comparison; bất biến đối
> chiếu REPORT_SOURCE_TABLES — unit test khóa lại). **Task_03 gate theo MỐC THỜI
> GIAN THẬT** (Task_02 mới nhất xong + Task_04 mới nhất xong) — KHÔNG theo ngày,
> vì Task_02 23:00 hoàn tất qua nửa đêm là ca thường (10/10 23:00 → xong 01:30);
> guard nhân đôi theo KỲ (`JSON_VALUE(config,'$.date')`) = 1 Task_03/kỳ, Task_04
> chưa từng chạy → chỉ cần Task_02 (không chặn oan).

> **Đã làm (code repo con `f61e25a` — 4 file: `task_runner.py` +`task_runner_quick.test.py`
> mới · `-tasks.ts` · `tasks-page.tsx`; chi tiết đầy đủ ở AGENTS.md repo con C.223):**
> default `TASK_DAILY_TIMES=["23:00"]` + `TASK_QUICK_*` (8 phân hệ/14 báo cáo) +
> `_spawn_quick_task` (17:15, kind mới `quick`, guard 2 lớp theo ngày) +
> `_maybe_spawn_task03` (điều kiện 2 mốc + guard kỳ JSON_VALUE) + xóa hook cũ
> "spawn sau mỗi slot" + UI: seed Task_04, KIND quick, mô tả/chíp/dialog theo
> lịch mới. **DB GiondDB (sống NGAY — config-driven):** Task_02 seed id `4462a100`
> `dailyTimes ["23:00"]` (giữ nguyên 20 phân hệ/28 queryKeys) + INSERT seed
> `Task_04` (kind quick, draft, 8+14 báo cáo, created_by "Cường (seed)") + dọn
> **task ma `Task_02 · 17:25` 10/10** (treo 'running' 27% từ 10/10 18:28 — đặt
> `cancel` kèm chú thích; phiên GĐ 385 cố ý không đụng, phiên này xử lý trong
> phạm vi Nhiệm vụ).

> **Restart GIONG_SMED_Agent (lệnh ĐH, qua SSH `cuongkm-server` — máy chủ
> GIONGPC):** check rảnh (log poll 0 job; queue pending/running sạch sau dọn ma)
> → xóa `__pycache__` (agent + etl) → `sc stop` (PID 24892 chết) → `sc start` →
> **RUNNING PID 29768** — log `web_agent_121026_014750` xác nhận code mới:
> "Task runner bật … **Task_02 tự chạy 23:00 + Task_04 17:15** hàng ngày" (bản cũ
> ghi 17:25/19:00/23:00). **KHÔNG restart GIONG_API_Server** — code đang chạy =
> mới nhất (api_server.py đổi lần cuối 10/10 08:50 < start 10/10 18:30), tunnel
> giữ nguyên `unnecessary-programming-…` → không cần sync env/gist.

> **Verify:** unit mới **38/38 PASS exit 0** (ma trận 8 kịch bản điều kiện spawn ·
> cổng giờ 17:15 · guard kỳ · bất biến "nguồn 14 key ⊆ 8 phân hệ") · py_compile OK ·
> tsc EXIT 0 · DB verify 2 chiều · /health 200 (db OK, 1.595 jobs, tunnel_ok).
> **Lesson debug:** `/db/query` bọc `select top N * from (…) _q` → câu ORDER BY
> KHÔNG kèm TOP bị 500 (thêm TOP là chạy); `JSON_VALUE`/`ISJSON` chạy tốt trên
> GiondDB — dùng khóa guard kỳ.

> **⚠️ Trạng thái sống:** **lịch đang TẠM DỪNG** (`task_schedule_paused=1` — Đại
> ca/phiên khác bật 00:50, em KHÔNG tự bỏ) → Task_04 17:15 hôm nay + Task_02
> 23:00 CHƯA spawn cho tới khi bấm **▶ Tiếp tục lịch** trên trang Nhiệm vụ
> (unpause sau 17:15 vẫn spawn bù trong ngày — pin kỳ đúng ngày spawn GĐ C.161).
> Web UI (-tasks.ts/tasks-page.tsx) chờ lệnh Push mới lên Vercel; agent + DB đã
> chạy bản mới NGAY sau restart.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **5.6.3** /
> repo con **8.5.3**.

> **Bổ sung C.223b (repo con `bf38314`):** soát lại phát hiện bản seed
> 'Task_04' (status `draft` — bản CẤU HÌNH) cũng khớp `name LIKE 'Task_04%'`
> trong điều kiện `_maybe_spawn_task03` → seed "chưa chạy" có thể chặn nhầm
> Task_03 ở góc cạnh hiếm. Vá: SQL truy vấn Task_04 thêm `AND status <> 'draft'`;
> unit +1 check cấu trúc — **39/39 PASS**; restart lại agent nạp bản vá (xem
> entry repo con C.223b). **Lesson đa agent:** file .md repo này commit dạng
> **LF** (Windows autocrlf=true) — máy Linux append heredoc phải
> `git -c core.autocrlf=input add` kẻo churn toàn file (CRLF).

### GĐ 387 / C.224 (Trợ lý Freebuff): PA Push đợt GĐ 384-386 / C.221-C.223 — bump 5.7.0 / 8.6.0 + LIVE production (2026-10-12)

> **Lệnh "Push" của Đại ca (12/10, sau GĐ 385 Báo cáo tiêm hộ).** Rà trùng lặp
> theo nguyên tắc 3: cả 2 repo "Already up to date"; `main..agent-cli` +
> `main..pipeline-work` = **RỖNG cả 2 repo**; registry 0 🔒 dở (GĐ 386/C.223
> đã unlock ✅ — code `f61e25a` + `bf38314`, restart agent PID 29768); status
> chỉ file deleted cũ + `permissions.ts` (GĐ 315 dở — không đụng); email ✓.
> Verify bất biến sau GĐ 386: TASK_QUERY_KEYS_ALL **29/29** khớp QUERY_KEYS
> (tiem-ho còn nguyên sau Task_02 23:00-only + Task_04 mới).

> **Bump version (lúc Push — đúng quy tắc ĐA AGENT):** app tổng **5.6.3 →
> 5.7.0** (minor — GĐ 384 lib smed-expected + GĐ 385 Báo cáo tiêm hộ) —
> package.json + package-lock.json (2 chỗ root) + DEFAULT_VERSION
> app-shell.tsx — đủ 4 chỗ; repo con **8.5.3 → 8.6.0** (minor — C.221b MIA
> hint 500 + C.222 Báo cáo tiêm hộ + C.223 lịch Nhiệm vụ Task_04) —
> package.json + DEFAULT_VERSION — đủ 2 chỗ. Checklist GĐ 138 ✓ (mọi thành
> phần 1 chữ số; grep 0 sót version cũ).

> **Push:** app tổng `d1e3cfd..b887b5c` (GĐ 384 claim+entry+unlock · GĐ 385
> claim+entry · GĐ 386 claim+entry+unlock · GĐ 387 claim+bump) · repo con
> `4c6cdfd..ecfc599` (C.221b code+docs · C.222 code+test+docs + STT fix ·
> C.223 code+docs+C.223b · C.224 bump).

> **✅ Verify production (curl --compressed):** app tổng
> `giong-vn-v6.vercel.app` = **5.7.0** · app con `giong-banhang.vercel.app`
> = **8.6.0** — cả 2 LIVE. (Lesson nhỏ: HTML mới tách "VERSION" khỏi số —
> grep số version trực tiếp thay pattern liền cũ.)

> **Tiêu chí kiểm chứng nghiệp vụ của Đại ca:** trang /m/bc-tiem-ho trên
> production chạy kỳ có data → bảng chi tiết + bảng tổng hợp (E2E local
> 14/14 PASS đã chứng minh builder + render); Task_02 23:00 + Task_04 17:15
> lịch mới GĐ 386; Task_03 tự chạy 29 báo cáo (gồm tiem-ho) sau Task_02 +
> Task_04 xong.

> **Version:** app tổng **5.7.0** / repo con **8.6.0** — ĐÃ PUSH + ĐÃ LIVE.

### GĐ 388 / C.225 (Trợ lý Freebuff): KPI Nhập Vắc Xin — Bảng 1 tách lô giá đích danh FIFO + cột "Đơn giá nhập"/"Thành tiền (đ)" + drill-down "Nhập Vắc xin tại các trung tâm chi tiết" (2026-10-12)

> **Yêu cầu của Đại ca (12/10):** (1) Bảng con của hộp KPI Nhập Vắc Xin (Tổng
> quan app con) thêm cột "Đơn giá nhập" sau Số lượng, trước cột "Tiền (đ)" +
> đổi "Tiền (đ)" → "Thành tiền (đ)"; (2) bấm trực tiếp 1 dòng dữ liệu → bảng
> "Nhập Vắc xin tại các trung tâm chi tiết": STT · Ngày nhập · Trung tâm
> (viết tắt "BH", "CĐ"...) · Số lượng · Đơn giá nhập · Thành tiền (đ).
>
> **Hỏi-đáp chốt (AskUserQuestion 2 vòng):** probe stg_5BKN thật qua tunnel —
> col10 đơn giá chưa VAT, col13 SAU VAT (col9 × col13 = col14); 1.936 nhóm
> (ngày+vax) nhiều dòng, nhiều nhóm nhiều giá (Infanrix Hexa 02/10: 8 dòng/2
> giá). ĐH chốt: KHÔNG gộp bình quân — "giá đích danh theo lô hạn sử dụng, 1
> phiếu nhập 1 giá không lẫn, tính theo FIFO" → tách theo LÔ; Bảng 2 đơn giá
> SAU VAT; TỔNG CỘNG Bảng 2 theo PA khuyên (câu bị bỏ qua — best judgment; ô
> Đơn giá TỔNG CỘNG trống — nguyên tắc cột đơn giá không cộng Subtotal).
>
> **Đã làm (repo con — code `b262b8c` 2 file +180/−13 · docs `f7e4289`):**
> 1. `-overview.ts` nhánh `box === "import"`: GROUP BY (report_date, col6,
>    col8 lô, col13 giá) + ORDER BY report_date DESC, MIN(row_num) ASC (FIFO
>    theo dòng file); 6 cột ["Ngày","Vắc xin","Lô","Số lượng","Đơn giá nhập",
>    "Thành tiền (đ)"] + TỔNG CỘNG (SL+tiền; "Đơn giá nhập" = "" — tsc lần 1
>    bắt TS2322 → type annotation `Record<string, string|number>[]`).
> 2. serverFn MỚI `loadOverviewImportByCenter` + type `ImportCenterRow`: mỗi
>    dòng staging = 1 phiếu nhập (không GROUP BY — giữ giá đích danh; ETL đã
>    dedupe theo src_file+row_num), day dd/mm/yyyy→ISO, ORDER BY row_num ASC
>    (FIFO), center MÃ 2 CHỮ ("BH", "CĐ"... — đúng yêu cầu viết tắt).
> 3. `overview-dashboard.tsx`: state/effect/onClose drill-down (pattern GĐ
>    230/238) + onClick dòng Bảng 1 (TỔNG CỘNG không bấm — như hộp stock) +
>    render Bảng 2 6 cột + footer TỔNG CỘNG (formatQty/formatVnd #,##0 căn
>    phải; ô Đơn giá TỔNG CỘNG trống).
>
> **Verify:** tsc EXIT 0 · SQL thật qua tunnel đối chứng 2 chiều: Bảng 1 —
> Jevax 11/10 lô JM-010925 10×54.000=540.000; Gardasil 9 09/10 lô A003100
> gộp TS+TD cùng giá 40×2.726.850=109.074.000 · drill-down Bảng 2 = TS 20 +
> TD 20 × 2.726.850 = 54.537.000 — KHỚP từng đồng dòng Bảng 1.
>
> **Tiêu chí kiểm chứng (sau Push):** Tổng quan → bấm hộp KPI Nhập Vắc Xin →
> Bảng 1 6 cột; bấm 1 dòng lô → Bảng 2 phiếu nhập theo trung tâm (mã 2 chữ),
> Đơn giá × SL = Thành tiền từng dòng; nút Đóng thu lại.
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.7.0** / repo con **8.6.0**.

### GĐ 389 / C.226 (Trợ lý Freebuff): Điều chỉnh 5 hộp KPI Tổng quan + thêm 2 hộp Ngân hàng + Marketing (2026-10-12)

> **Yêu cầu của Đại ca (12/10, 6 mục):** (1) Tồn kho — sticky tiêu đề/tổng + cột
> VX hẹp truncate + drill-down trung tâm có dòng cộng; (2) Thu tiền — thêm Tiền
> mặt/Chuyển khoản; (3) Hóa đơn — mũi sau tờ + chi tiết mũi/TM/CK/Cộng tiền +
> TỔNG CỘNG sticky; (4) Lượt tiêm — chi tiết Ngày/TT/Lượt/VX/Tiền; (5) HSD — cột
> Tên VX hẹp còn 1/2; (6) 2 hộp mới "Ngân hàng" (vàng nhạt) + "MARKETING".
>
> **Hỏi-đáp chốt (4 câu — PA khuyên dùng):** TM/CK/Thẻ/rỗng → cột "Khác" · Lượt
> tiêm nhóm Ngày+TT+VX 200 dòng + TỔNG · Ngân hàng số dư TẠI ngày cuối kỳ + chi
> tiết 200 GD MỚI NHẤT + TỔNG Thu/Chi · Marketing 3 chỉ số + chi tiết theo TT.
>
> **Nguồn (probe thật):** DTTDT col15 + BKCT col11 (hình thức TT có sẵn); mũi HĐ =
> SUM col17 BKCT; tiền lượt tiêm = col16 BKCCN; bank_vcb/tcb/tpb_tx (balance — VCB
> không có bảng balance riêng); Marketing = f3 'Sử dụng tốt' + f4 'Chưa tiêm' + f1
> 'Sử dụng tốt' trừ lượt trả f2 theo (TT, mãTC, GIÁ) — định nghĩa Bảng 1 bccn C.173.
>
> **Đã làm (repo con code `16826c8` 2 file +620/−62 · docs `6fe4a04`):** API —
> KPI type + invoiceQty/bankBalances/marketing · bankBalanceStats + marketingStats
> (CTE f1−f2) · 4 nhánh detail mới + 2 serverFn (loadOverviewBankDetail UNION 3
> bank TOP 200 + tổng; loadOverviewMarketingDetail FULL JOIN f3×f4×f1-con) ·
> DetailBox +bank +marketing + guard. Client — 2 tone (amber-light/pink) · hộp HĐ
> "682 tờ|955 mũi" · 2 hộp mới · block riêng stock (VX truncate + sticky 2 đầu) +
> invoice (7 cột sticky + tfoot tổng) · drill-down stock dòng CỘNG TỒN + sticky ·
> HSD colgroup VX 50%→26% · thead sticky khung chung + "Nội dung" truncate.
>
> **2 bài học SQL GiondDB:** (1) literal chuỗi có dấu PHẢI N-prefix (N'Tiền Mặt'
> → 62.329; không N → 0 — collation DB); (2) gia f4/f1 '1.000.000' chấm nghìn —
> TRY_CONVERT = NULL → REPLACE bỏ chấm trước CONVERT + CẢ khóa ghép giá (khớp
> _to_num builder). CTE WITH đầu statement OK qua ODBC app (WITH BAN AS hiện hữu).
>
> **Verify:** tsc EXIT 0 · TM/CK 11/10 khớp từng đồng (115.841.000 + 512.825.000 +
> 3.770.000 = 632.436.000) · HĐ BH 76 tờ/88 mũi/68.150.000 ✓ · Bank VCB 197.941.583
> · TCB 20.721.467 · TPB 750.617.210 · Marketing LIVE 412 gói/3.928 mũi/3.090.831.550
> (khác Bảng 1 job 06/10 do data DB nạp file 10-12/10 mới hơn — hộp tính LIVE đúng
> định nghĩa).
>
> **Tiêu chí kiểm chứng (sau Push):** 6 mục như yêu cầu + 2 hộp mới bấm được ra
> chi tiết.
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **5.7.0** /
> repo con **8.6.0**.

---

### GĐ 390 / C.227 (Trợ lý Freebuff): XÂY DỰNG LẠI "Báo cáo công nợ đặt trước" — xóa 6 sheet cũ, chỉ còn 5 bảng (cột giữ nguyên 100%) + khử trùng đa lượt khớp từng dòng (2026-10-12)

> **Yêu cầu của Đại ca (12/10):** xây dựng lại Báo cáo công nợ đặt trước (BÁO
> CÁO MARKETING) — xóa bỏ hết logic + bảng cũ, rà lại file dữ liệu đã download
> để lấy tư duy, làm lại cẩn thận 5 bảng. **ĐH chốt (hỏi-đáp): PA-1** (khử
> trùng khớp từng dòng + rank folder theo thời gian + làm lại logic 5 bảng) ·
> **trang chỉ còn 5 bảng** · **'Ngày tiêm' giữ f2 làm chính**.
>
> **Tư duy từ 4 file nguồn SMED (mở file thật):** f1 đăng ký đặt trước lẻ (1
> dòng = 1 mũi) · f2 thống kê trả mũi (1 dòng = 1 lượt trả) · f3 gói dịch vụ
> (1 dòng = 1 gói) · f4 chi tiết gói đặt trước (block khách → từng mũi, ghi
> chú 'Đã sử dụng ngày…'). File mẫu 10.GDTVX/2026-10-11 đủ 19 TT × 4 loại.
>
> **Bằng chứng rà soát (file + GiondDB):** 1.138 khóa f1 trùng ≥2 dòng TRONG
> CÙNG folder (2.657 dòng — 2 mũi THẬT giống hệt, TS Nguyễn Quỳnh Anh 2×
> Gardasil 9) → lọc theo (ngày đk, mãTC, vắc xin) thô sẽ MẤT mũi · 434 khóa
> trùng xuyên ≥2 folder · lỗ hổng khóa cũ GĐ 228i gồm trang_thai → 1 mũi 2
> lượt đổi trạng thái giữ CẢ 2 → trùng tk-goi · lỗ hổng rank so TÊN folder
> ('gd370-*' nạp tay GĐ 370 > mọi '2026-*') · f4 2.897 dòng rác header block.
>
> **Đã làm (chi tiết đầy đủ ở AGENTS.md repo con C.227):**
> 1. `agent/etl/sql_reports.py` repo con: `_folder_rank` + `_gdtvx_keep_newest`
>    (khóa KHÔNG gồm trang_thai — folder thắng theo THỜI GIAN, giữ MỌI dòng
>    folder thắng); parse_f4 lọc rác header; `bccn_dattruoc` XÓA TỔNG HỢP 22
>    cột + TH_CongNo + DS_CN_Goi + DS_CN_Le + DS_CN_Theo_DT + TH Hết hạn, giữ
>    5 bảng cột 100% (tk-goi · cn-goi · cn-dt · tt-cn · mt-cn), mt-cn bổ sung
>    lọc mũi lẻ đã trả f2 (GĐ 361 bỏ sót), main = tt-cn.
> 2. Client `bc-congno-dattruoc.tsx`: order 4 SubSheets + mô tả mới.
> 3. Script verify `scripts/gd390-verify-bccn.py` (chỉ đọc).
>
> **Verify:** py_compile OK · unit **64/64 PASS** (thêm T16-T19) · tsc EXIT 0 ·
> builder thật GiondDB kỳ 2018→11/10: tk-goi 35.782 dòng, 0 rác · **Tiên Du
> còn nợ 1 mũi đặt trước — khớp web SMED GĐ 370-C** · 'Kiểm tra'/'Kiểm tra
> nguồn' ✓ toàn bộ · cn-dt Tiên Du chỉ còn MENGOC 330.000 (đã trả loại đúng) ·
> TS 2 mũi Gardasil giống hệt giữ đủ · nhóm trùng 10×GC FLU = 10 dòng thật
> trong 1 folder. Code repo con `a31e2fd` (docs) + commit code trước đó.
>
> **Tiêu chí kiểm chứng (sau Push):** trang bccn job mới → 5 bảng đúng thứ tự
> + cột không đổi; tk-goi hết trùng 2 lượt tải; Tiên Du/Tú Sơn hết ghim
> snapshot 09/10; ma trận không đếm mũi đã trả.
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.7.0** / repo con **8.6.0**.

---

### GĐ 391 / C.229 (Trợ lý Freebuff): PA Push đợt GĐ 389-390 / C.226-C.227 — bump 5.8.0 / 8.7.0 + LIVE production + restart agent (2026-10-12)

> **Lệnh "Push" của Đại ca (12/10, sau GĐ 390).** Rà trùng lặp theo nguyên tắc
> 3: `main..agent-cli` + `main..pipeline-work` = **RỖNG cả 2 repo**; registry
> KHÔNG có 🔒 dở (GĐ 389/C.226 của phiên khác đã unlock ✅ `16826c8`+`6fe4a04` —
> phạm vi `-overview.ts` + `overview-dashboard.tsx` KHÔNG giao file nào với
> GĐ 390/C.227: sql_reports.py + test + bc-congno-dattruoc.tsx + script
> verify); status chỉ `permissions.ts` (GĐ 315 — phiên khác) + file deleted cũ
> — KHÔNG đụng; email `cuongpk.giong04@gmail.com` ✓.

> **Bump version (lúc Push — đúng quy tắc ĐA AGENT):** app tổng **5.7.0 →
> 5.8.0** (minor — GĐ 390 feature xây dựng lại Báo cáo công nợ đặt trước) —
> package.json + package-lock.json (2 chỗ) + DEFAULT_VERSION app-shell.tsx;
> repo con **8.6.0 → 8.7.0** (minor — C.227) — package.json + DEFAULT_VERSION
> app-shell.tsx. Checklist GĐ 138 ✓ (5.8.0/8.7.0 mọi thành phần 1 chữ số).

> **Push:** app tổng `c8a9b5f..73324d1` (GĐ 390 claim+code+docs+unlock · GĐ
> 391 bump) · repo con `ecfc599..79d70ab` (C.226 code+docs · C.227 code+docs
> · C.228 bump).

> **✅ Verify production (curl --compressed + grep -a):** app tổng
> `giong-vn-v6.vercel.app` = **VERSION 5.8.0** · app con
> `giong-banhang.vercel.app` = **VERSION 8.7.0** — cả 2 LIVE, không ghim
> deployment cũ (sót "1.9.4/1.69.9/1.67.9" = thư viện ngoài trùng số trúng —
> lesson GĐ 328).

> **✅ Restart GIONG_SMED_Agent (nạp builder bccn mới — web agent import
> sql_reports lúc start):** agent rảnh khi restart (job mới nhất done 09:06,
> slot lịch gần nhất Task_04 17:15 — cách ~3h45'); xóa `__pycache__` trước
> stop (lesson GĐ 168) → sc stop STOPPED → sc start **RUNNING PID mới 28460**
> (api_server giữ PID 27920 — nssm, đúng lesson GĐ 329). `/health` 200 —
> `tunnel_ok:true` (Quick Tunnel `unnecessary-programming-convicted-very`),
> db GiondDB OK, 1.575 jobs.

> **Tiêu chí kiểm chứng:** trang bccn tạo job mới kỳ dài → 5 bảng (tk-goi →
> cn-goi → cn-dt → tt-cn → mt-cn) cột giữ nguyên; Tiên Du còn nợ 1 mũi đặt
> trước; hộp KPI MARKETING app con (GĐ 389) + 5 bảng bccn (GĐ 390) cùng LIVE.

> **Version:** app tổng **5.8.0** / repo con **8.7.0** — ĐÃ PUSH + ĐÃ LIVE.

---

### GĐ 392 (Trợ lý Freebuff): Cài thử Open Code Review (OCR) — multi-agent code review trước-Push — PA-1 Đại ca chốt (2026-10-12)

> **Yêu cầu của Đại ca (12/10):** nghiên cứu thư mục
> `D:\DuLieuChung\CUONG_2026\Github\open-code-review-main`
> (spencermarx/open-code-review v2.5.0, Apache-2.0 — multi-agent code review:
> Tech Lead orchestrate 8 pha, reviewer chạy SONG SONG qua sub-agents, tranh
> luận AGREE/CHALLENGE/CONNECT/SURFACE, tổng hợp báo cáo; dashboard web;
> 28 persona Fowler/Beck/Metz/Hejlsberg…; slash `/ocr:review` + `/ocr:map` +
> `/ocr:post`). ĐH chốt **PA-1** (cài full + chạy review thử).

> **Đã làm:** (1) `npm i -g @open-code-review/cli` → **2.5.0** (Node 24.16.0 ✓
> yêu cầu ≥22.5, `node:sqlite` built-in — không native module); (2) **khởi động
> chuỗi 3 lớp GĐ 342 cho claude headless** — 9router tray PID 14460 (port 20128,
> HTTP 307) + headroom proxy PID 33544 (port 8787, mode cache) → `claude -p`
> kết nối 9router OK (1 lần "OK" exit 0 qua model `main`); (3) `ocr init -t
> claude --no-inject` trong app tổng → tạo `.ocr/` (config.yaml + skills 345K +
> commands 65K + reviewers-meta + cli-config; gitignore nội bộ đã che
> sessions/ + data/) + `.claude/commands/ocr/` 11 slash command; (4) cấu hình
> `.ocr/config.yaml`: context dự án tiếng Việt (tech stack + 4 nguyên tắc định
> dạng + quy tắc an toàn "KHÔNG sửa AGENTS.md trong review") · tắt openspec
> (không dùng) · `models.default: main` (9router combo) · default_team
> principal:2 + quality:2 (giữ mặc định OCR).

> **Review thử BỊ CHẶN — quota 9router (blocker bên ngoài):** pipeline đến
> 100% sẳn sàng (claude headless nạp slash `ocr:review` ✓ + quyền
> bypassPermissions ✓ + stage `permissions.ts` 8 dòng GĐ 315 làm changeset
> thử) nhưng model gọi LLM không ổn định: probe 8 lượt — `main` (combo)
> flaky 2/3 lượt route sang `mimo-auto` → 400 "Unsupported model" ·
> `ag/claude-sonnet-4-6` + `ag/claude-opus-4-6-thinking` + `ag/gpt-oss-120b`
> → **429 quota cạn** (reset ~2 phút vẫn cạn ngay — cạn tổng) · `cx/*` → 400
> "not supported when using Codex with a ChatGPT account" · `gemini/*` → 400
> API key invalid. 3 lượt chạy `/ocr:review` headless đều chết ngay turn 1
> (0 session OCR được tạo — state null). Review multi-agent cần NHIỀU call
> liên tiếp (4 reviewer + discourse + synthesis) → không chạy nổi với
> 9router trạng thái này.

> **Hướng chạy tiếp (chờ Đại ca):** (A) khi quota antigravity hồi phục — anh
> mở claude trong project gõ `/ocr:review` (dùng interactive là chính — công
> cụ của anh); hoặc (B) bổ sung 1 provider key còn quota vào 9router → em
> đổi `models.default` rồi chạy lại; hoặc (C) đặt OCR qua endpoint khác.
> Khôi phục như cũ không cần — chuỗi 9router+headroom đang chạy nền, chỉ có
> tác dụng cho claude (z-ai GLM của ZCode đi đường riêng, không liên quan).

> **Verify:** `ocr doctor` — git ✓ claude ✓ gh ✓ node:sqlite 3.53.0 ✓;
> config đọc OK; claude headless connect OK (bằng chứng "OK" exit 0);
> commit `9cb321a` (claim) + commit này (config + docs + unlock).

> **Tiêu chí kiểm chứng (khi model sống):** `/ocr:review` chạy trọn 8 pha →
> `.ocr/sessions/{ngày}-{nhánh}/rounds/round-1/` có reviews/*.md (≥2 reviewer)
> + discourse.md + final.md; dashboard `ocr dashboard` xem kết quả.

> **Version:** KHÔNG bump (công cụ + docs-only — 0 đụng code app; chờ lệnh
> Push — quy tắc ĐA AGENT). App tổng **5.8.0** / repo con **8.7.0**.

---

### GĐ 393 (Trợ lý Freebuff): Cài 6 skill "agent-skills" (Addy Osmani) + 3 checklist — PA-1 Đại ca chốt (2026-10-12)

> **Yêu cầu của Đại ca (12/10):** nghiên cứu thư mục
> `D:\DuLieuChung\CUONG_2026\Github\agent-skills-main`
> (addyosmani/agent-skills v0.6.12, MIT — 25 skill + 9 lệnh + 4 persona + 7
> checklist theo vòng đời Define→Plan→Build→Verify→Review→Ship). ĐH chốt
> **PA-1** (trong PA-1/2/3 — PA-2 full 25 skill bị loại vì chồng chéo ≥6 chỗ
> với skill đã cài GĐ 345/347/349; PA-3 chỉ chép quy tắc bị loại vì mất
> chi tiết how-to, lesson GĐ 345).

> **Khảo sát → chọn lọc 6 skill trúng bài toán thật (12+ skill trùng đã loại):**
> interview-me≈grilling · debugging≈diagnosing-bugs · code-review≈code-review
> · planning≈to-tickets · frontend-ui≈ui-ux-pro-max · git-workflow/
> documentation≈quy tắc AGENTS.md. Còn 6 skill ĐỘC QUYỀN trúng:
> 1. **context-engineering** 🎯 — trúng trực tiếp tràn context 400K GĐ 319:
>    trim từ 75%, bảng "cắt gì trước · giữ gì đến cùng", compress-before-drop,
>    ranh giới phiên restart an toàn.
> 2. **test-driven-development** — Prove-It (fix bug = test tái hiện TRƯỚC),
>    RED→GREEN→REFACTOR, DAMP over DRY — chuẩn hóa `*.test.ts/.mjs`.
> 3. **security-and-hardening** — OWASP Top 10, secrets, dependency audit.
> 4. **constraint-driven-development** — chống agent TẮT check / skip test
>    để "xanh" (bảng rationalizations + references/floor-guard.md).
> 5. **spec-driven-development** — khung PRD việc lớn (bổ trợ quy trình 5
>    bước GĐ 198).
> 6. **code-simplification** — Chesterton's Fence (bổ trợ ponytail).

> **Đã làm (docs-only, 0 đụng code app):** copy nguyên văn vào `.agents/` —
> 6 skill `.agents/skills/<tên>/SKILL.md` (security + constraints kèm
> references con) + 3 checklist chung `.agents/references/`
> (testing-patterns · security-checklist · definition-of-done — đường dẫn
> `../../references/` trong SKILL.md hoạt động đúng như repo nguồn).
> Cập nhật **bảng QUY TẮC NẠP SKILL GĐ 345** thêm 6 dòng (đánh dấu GĐ 393).

> **Verify:** md5 **11/11 khớp nguồn** (7 SKILL.md + 2 references con + 3
> checklist) · tổng ~168KB · `git check-ignore` .agents/ không bị ignore ·
> tsc không cần (0 file code app).

> **⚠️ Nguồn sự thật skill duy nhất:** bảng QUY TẮC NẠP SKILL GĐ 345 (trên)
> — skill chỉ Nạp đúng tình huống (tool `skill`), KHÔNG nạp dồn (quy tắc
> GĐ 319). Phiên sau cài thêm từ repo nguồn này: check TRÙNG với 14 skill
> hiện có trước (8 mattpocock + ponytail + ui-ux-pro-max + 6 Addy Osmani).

> **Tiêu chí kiểm chứng:** phiên sau gặp 1 trong 6 tình huống mới của bảng
> → nạp đúng skill và làm theo quy trình của nó (VD: báo bug → Prove-It
> test tái hiện trước khi fix; phiên ~70% → trim theo bảng
> context-engineering).

> **Version:** KHÔNG bump (docs-only — chờ lệnh Push — quy tắc ĐA AGENT).
> App tổng **5.8.0** / repo con **8.7.0**.

### GĐ 394 / C.230 (Trợ lý Freebuff): KPI Tổng quan — Lượt tiêm VX hẹp + sticky; Ngân hàng vàng nhạt + chi tiết 2 tầng (2026-10-12)

> **Yêu cầu của Đại ca (12/10, tiếp GĐ 389):** (1) chi tiết LƯỢT TIÊM cột Vắc xin
> quá rộng (Số tiền không thấy trong 1 khung) → hẹp ~50% + cố định tiêu đề/TỔNG
> CỘNG; (2) NGÂN HÀNG giảm màu vàng đỡ chói + chi tiết 2 tầng (danh sách 3 NH →
> bấm NH → chi tiết giao dịch).
>
> **Đã làm (repo con code `8dbd15a` 2 file +174/−46 · docs `411ba7e`):** Lượt
> tiêm — block riêng table-fixed 14/10/11/35/30 (VX 35% ≈ nửa) + truncate/title +
> thead/tfoot sticky + TỔNG (Lượt formatQty + Số tiền formatVnd) · Ngân hàng —
> tone amber-200 · serverFn MỚI loadOverviewBankList + loadOverviewBankDetail
> +param bank (filter WHERE $3, cả GD lẫn TỔNG) · state bankSelected + effect 2
> tầng + nút "← Danh sách ngân hàng" + onClick dòng NH tầng 1 + reset onClose ·
> **fix kèm: TCB debit lưu SỐ ÂM** (SUM -100.391.000; VCB/TPB dương) → ABS cho
> cột Chi.
>
> **Verify:** tsc EXIT 0 · probe filter TCB kỳ 10-12/10 chỉ GD TCB ✓ · list 3 NH
> khớp GĐ 389 (VCB 197.941.583 · TCB 20.721.467 · TPB 750.617.210).
>
> **Tiêu chí kiểm chứng (sau Push):** Lượt tiêm VX hẹp + Số tiền thấy ngay + cuộn
> dính tiêu đề/TỔNG; Ngân hàng vàng nhạt → 3 NH → bấm 1 NH → GD → nút quay lại.
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **5.8.0** /
> repo con **8.7.0** (bump GĐ 391 — phiên Push khác đã push đợt GĐ 389-390).

### GĐ 395 / C.231 (Trợ lý Freebuff): PA Push đợt GĐ 394 / C.230 — bump 5.8.1 / 8.7.1 + LIVE production (2026-10-12)

> **Lệnh "Push" của Đại ca (12/10, sau GĐ 394).** Rà trùng lặp theo nguyên tắc 3:
> `main..agent-cli` + `main..pipeline-work` = RỖNG cả 2 repo; registry duy nhất
> GĐ 392 🔒 của phiên khác (OCR — docs-only `.claude/commands/ocr` + `.ocr/`,
> KHÔNG giao code app — commit `43173c5` đã nằm local main, push kèm — KHÔNG
> trùng phạm vi với GĐ 389/394); file modified còn lại là của phiên khác — KHÔNG
> đụng, không đi kèm push (chỉ đi commit).
>
> **Bump version (lúc Push — đúng quy tắc ĐA AGENT):** app tổng **5.8.0 → 5.8.1**
> (patch — GĐ 394 điều chỉnh/fix nhỏ) — package.json + package-lock.json (dòng 3
> + 9 root) + DEFAULT_VERSION app-shell.tsx — đủ 4 chỗ, grep 0 sót 5.8.0; repo
> con **8.7.0 → 8.7.1** (patch — C.230) — apps/banhang/package.json +
> DEFAULT_VERSION — đủ 2 chỗ. Checklist GĐ 138 ✓ (mọi thành phần 1 chữ số).
>
> **Push (qua SSH GIONGPC — same working tree, alias github-beep của Windows):**
> app tổng `621cac3..342c378` — GĐ 394 claim + GĐ 392 tools (phiên khác) + GĐ
> 393 skills + GĐ 395 claim + bump; repo con `79d70ab..ddcc047` — C.230 code +
> docs + C.231 bump.
>
> **✅ Verify production (curl --compressed sau ~150s):** app tổng
> `giong-vn-v6.vercel.app` = **5.8.1** (HTTP 200) · app con
> `giong-banhang.vercel.app` = **8.7.1** (HTTP 200) — cả 2 LIVE, không ghim
> deployment cũ.
>
> **Tiêu chí kiểm chứng của Đại ca (trên production):** hộp Lượt tiêm — cột VX
> hẹp, Số tiền thấy ngay, cuộn tiêu đề/TỔNG dính; hộp Ngân hàng vàng nhạt →
> bấm → 3 NH → bấm 1 NH → GD riêng NH + nút quay lại (kèm fix chi TCB âm → ABS).
>
> **Version:** app tổng **5.8.1** / repo con **8.7.1** — ĐÃ PUSH + ĐÃ LIVE.

---

### GĐ 396 / C.232 (Trợ lý Freebuff): Sửa logic ghép lượt trả bccn + tách 2 cột tk-goi — PA-1 (bằng chứng Trung Thảo) (2026-10-12)

> **Báo của Đại ca (12/10 chiều, sau GĐ 390):** (1) cn-dt thiếu khách Nguyễn
> Thế Trung Thảo (TS · 106190120120030) — còn 1 mũi Verorab 0.5ml chưa tiêm;
> (2) tk-goi khách này 'Trạng thái Gói/Đặt trước' = 2 'Đã hoàn thành' + 1
> 'Sử dụng tốt' nhưng 'Trạng thái tiêm' = cả 3 'Đã tiêm' — sai. Chốt: tách
> thành 2 cột "Trạng thái gói" + "Trạng thái đặt trước"; quy tắc 'Đã tiêm'/
> 'Đã hoàn thành' = hết nợ · 'Chưa tiêm'/'Sử dụng tốt' = còn nợ.
>
> **Chẩn đoán (probe DB thật):** 3 mũi Verorab giống hệt (1 SĐT + 2 ĐHT),
> f2 chỉ 2 lượt trả → logic cũ 2 hàng đợi song song (L1 dịch vụ cho ĐHT +
> L2 giá cho SĐT) CÙNG nhìn toàn bộ f2 → lượt trả "dùng 2 lần" → SĐT pop
> oan lượt trả của mũi ĐHT → 'Đã tiêm' + mất khỏi cn-dt. Kèm thứ tự pop sai
> (SĐT đứng trước ĐHT trong file — pop ngay trong vòng build).
>
> **ĐH chốt PA-1 — đã làm (chi tiết ở AGENTS.md repo con C.232, code
> `2722a69`):** (1) tách hàng đợi f2 theo GHI CHÚ ('Gói dịch vụ' 28.197
> lượt = mũi gói f4 · 'Đặt trước' 5.403 = mũi lẻ f1); (2) phân bổ 2 PHA mũi
> lẻ — ĐHT pop trước lấy Ngày tiêm, SĐT chỉ nhận phần DƯ; (3) tk-goi 18→19
> cột ('Trạng thái gói' + 'Trạng thái đặt trước' nguyên văn từng nguồn).
>
> **Verify:** unit **70/70 PASS** (T20 tái hiện TH Trung Thảo) · tsc 0 ·
> builder thật GiondDB: tk-goi Trung Thảo 1 'Chưa tiêm' + 2 'Đã tiêm'
> (03/07+07/07) · **cn-dt CÓ Trung Thảo 1 mũi Verorab 470.000 '✓ 1'** ·
> cn-dt toàn hệ 109→196 mũi còn nợ (+87 pop oan quay về đúng) · 0 ✗ toàn
> hệ · fix cũ giữ nguyên (Dương Trà My · GĐ 361).
>
> **Tiêu chí kiểm chứng (sau Push):** cn-dt hiện Trung Thảo 470.000; tk-goi
> 2 cột trạng thái nguyên văn; công nợ tăng đúng phần mũi bị pop oan.
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.8.1** / repo con **8.7.1**.

---

### GĐ 397 / C.234 (Trợ lý Freebuff): PA Push đợt GĐ 396 / C.232 — bump 5.8.2 / 8.7.2 + LIVE production + restart agent (2026-10-12)

> **Lệnh "Push" của Đại ca (12/10, 16:05 — sau GĐ 396).** Rà trùng lặp theo
> nguyên tắc 3: `main..agent-cli` + `main..pipeline-work` = **RỖNG cả 2 repo**;
> registry KHÔNG có 🔒 dở (0 dòng "| 🔒 |"); status chỉ `permissions.ts` (GĐ
> 315 — phiên khác) + file deleted cũ — KHÔNG đụng; email
> `cuongpk.giong04@gmail.com` ✓.
>
> **Bump version (lúc Push — đúng quy tắc ĐA AGENT):** app tổng **5.8.1 →
> 5.8.2** (patch — GĐ 396 fix logic ghép lượt trả + tách 2 cột tk-goi) —
> package.json + package-lock.json (2 chỗ) + DEFAULT_VERSION app-shell.tsx;
> repo con **8.7.1 → 8.7.2** (patch — C.232) — package.json + DEFAULT_VERSION
> app-shell.tsx. Checklist GĐ 138 ✓ (mọi thành phần 1 chữ số).
>
> **Push:** app tổng `342c378..7043602` (GĐ 396 claim+code+docs+unlock · GĐ
> 397 bump) · repo con `ddcc047..89fb8c5` (C.232 code+docs · C.233 bump).
>
> **✅ Verify production (curl --compressed + grep -a):** app tổng
> `giong-vn-v6.vercel.app` = **VERSION 5.8.2** · app con
> `giong-banhang.vercel.app` = **VERSION 8.7.2** — cả 2 LIVE (sót "1.9.4/
> 1.69.9/1.67.9" = thư viện ngoài trùng số trúng — lesson GĐ 328).
>
> **✅ Restart GIONG_SMED_Agent (nạp builder bccn mới):** agent rảnh khi
> restart (job cuối done 13:57, slot lịch gần nhất Task_04 17:15 — cách ~1h);
> xóa `__pycache__` sau sc stop (lesson GĐ 168) → RUNNING **PID mới 20944**;
> `/health` 200 — `tunnel_ok:true`, db GiondDB OK, 1.558 jobs.
>
> **Tiêu chí kiểm chứng:** web bccn tạo job mới kỳ dài → cn-dt CÓ Trung Thảo
> (TS · 106190120120030) 1 mũi Verorab 0.5ml 470.000; tk-goi khách này
> 'Trạng thái đặt trước' = 2 'Đã hoàn thành' + 1 'Sử dụng tốt', 'Trạng thái
> tiêm' = 2 'Đã tiêm' (03/07+07/07) + 1 'Chưa tiêm'; cn-dt toàn hệ ~196 mũi
> còn nợ (~293 triệu — tăng so bản cũ vì các mũi bị pop oan quay về đúng).
>
> **Version:** app tổng **5.8.2** / repo con **8.7.2** — ĐÃ PUSH + ĐÃ LIVE.

---

### GĐ 398 / C.235 (Trợ lý Freebuff): Xây dựng module "Bảng TH GB-KM_GN-CK-LN" — 16 cột (nhập tay giá/KM/CK + VX SMED/NCC tự động + LN gộp tính tự động) (2026-10-12)

> **Yêu cầu của Đại ca (12/10):** xây module Bảng TH GB-KM_GN-CK-LN (lá 2 nhóm
> BÁN HÀNG — placeholder GĐ 341) gồm 16 cột: STT · Tên Vắc xin (SMED) · NCC
> nhập kho · nhóm **Giá Bán** 4 cột · nhóm **Giá Nhập** 5 cột (niêm yết + CK
> nhập HĐ/tháng/quý/khác) · nhóm **Lợi nhuận gộp** 3 cột · Ghi chú. Chi tiết
> đầy đủ ở entry C.235 AGENTS.md repo con (`0f0bc77`).
>
> **Nguồn (probe thật GiondDB):** Tên VX từ `price_list` (48 ten_smed DISTINCT
> — seed 1 dòng/tên vào bảng mới) · NCC từ `stg_5BKN` DISTINCT col2 (10 NCC
> nhập kho thật, lọc "Nhập tồn") · Giá bán/ưu đãi/KM/thưởng/giá nhập/CK —
> GiondDB CHƯA có bảng nguồn (khớp GĐ 341) → **NHẬP TAY**. Hỏi-đáp AskUser
> 3 câu không phản hồi → best judgment + ghi giả định rõ: CK nhập = % (đối
> chứng phiếu nhập col11 2,5% khớp col10×(1−2,5%)×1,05 = col13 ✓); LN(CK) =
> (Giá bán ưu đãi ?? Giá bán) + KM + Thưởng NV − Giá nhập × (1 − CK%/100) —
> tiền/mũi, tính render không lưu, dễ đổi khi Anh chốt khác.
>
> **Đã làm:** repo con `2520773` (6 file +931/−7): bảng `dbo.th_gbkm_gnck_ln`
> (tạo + seed 48 qua tunnel `/exec` — idempotent) · `db.ts` +`execSql` (POST
> /exec — kênh GHI qua tunnel, serverFn app con dùng được) · API `-th-gbkm.ts`
> (load/save/delete + validator + session guard) · trang
> `/m/banhang-th-gbkm-gnck-ln` (header 2 hàng gộp rowspan/colspan · dialog
> thêm/sửa/xóa · tìm kiếm · 4 nguyên tắc định dạng) · `lib/th-gbkm.ts` +
> unit · script E2E `gd398-verify-e2e.mjs` (chạy máy Windows).
>
> **Verify:** tsc EXIT 0 · unit LN **12/12 PASS** · CRUD thật qua tunnel
> INSERT→SELECT→UPDATE→DELETE khớp từng bước, bảng về đúng 48 dòng sạch ·
> ⚠️ E2E UI local không chạy được trên máy Linux SMB (vite rolldown binding
> Windows-only — node_modules dùng chung, không cài lại) — tiêu chí kiểm
> chứng sau Push: trang hiện 48 dòng + thêm/sửa/xóa lưu GiondDB + LN tự tính.
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.8.2** / repo con **8.7.2**.

---

### GĐ 401 / C.237 (Trợ lý Freebuff): Khử trùng bccn rank theo THỜI ĐIỂM TẢI trong tên file nguồn — PA-1 (bằng chứng Mai Sương) (2026-10-12)

> **Hỏi của Đại ca (12/10, 3 ảnh — sau GĐ 396):** mã 101141719830143 (Thái
> Thị Mai Sương · SĐ · Gardasil 9 2.925.000) — file nguồn tải 10/10 chỉ 2
> dòng (1 'Sử dụng tốt' + 1 'Đã hoàn thành') nhưng tk-goi 3 dòng 'Sử dụng
> tốt'/'Chưa tiêm' + cn-dt 3 mũi 8.775.000. **ĐH chốt PA-1.**
>
> **Chẩn đoán (probe DB):** cột `folder` trong DB = KỲ 'Từ ngày' của file —
> KHÔNG phải thời gian tải. File kỳ ngắn '2026-05-17' (tải 03/07 + 17/09 —
> CŨ, mỗi file 2 SĐT) thắng oan file kỳ dài '2026-02-01' (tải 10/10 —
> MỚI, 1 SĐT + 1 ĐHT) khi rank so tên folder + cùng kỳ qua 2 lượt tải bị
> nhân đôi → giữ 4 SĐT cũ, loại file mới. Quy mô: 438 khóa f1 (1.237 dòng)
> + 2.055 khóa f2 (5.744 lượt trùng).
>
> **Đã làm (chi tiết ở AGENTS.md repo con C.237, code repo con
> `15778e5`):** `_load_rank` parse timestamp `yyyymmddHHMMSS` trong tên
> file nguồn (fallback _folder_rank); `_rank` = timestamp từng dòng;
> keep_newest so trực tiếp; SELECT thêm src_file f1-f4.
>
> **Verify:** unit **73/73 PASS** (T21) · tsc 0 · builder thật: tk-goi Mai
> Sương 2 dòng (1 'Chưa tiêm' + 1 'Đã tiêm' 27/09) · cn-dt 1 mũi
> 2.925.000 '✓ 1' khớp file · cn-dt toàn hệ **196→106 mũi / 293.385.000→
> 151.640.000** · Bảng 1 273 · 1.273 · 106 · 1.379 · 1.023.459.300 · 0 ✗.
>
> **Tiêu chí kiểm chứng (sau Push):** tk-goi/cn-dt khớp file nguồn mọi
> khách trùng lượt tải; restart agent sau Push.
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.8.2** / repo con **8.7.2**.

---

### GĐ 400 (Trợ lý Freebuff): Chụp ảnh điểm danh + check-in — 4 điểm Đại ca chốt (2026-10-12)

> **Yêu cầu của Đại ca (12/10, 4 điểm):** (1) bỏ độ trễ chụp — ấn nút là ghim
> ảnh ngay, hiện phải giữ máy yên 1 lúc → ảnh mờ nhòe khi di chuyển;
> (2) nút Làm đẹp cho ảnh sáng hơn + bớt ám vàng đèn; (3) người chụp vào GIỮA
> khung hình (đang lệch trái); (4) chữ đóng dấu thu sát lề dưới-trái (đang
> thưa quá, đè giữa mặt người).

> **Chẩn đoán (đọc code 2 trang + camera-frame.ts):** (1) trang Chấm công
> `capturePhoto` ĐỢI GPS chính xác cao (1-5s) + gọi API tra địa chỉ XONG mới
> ghim ảnh; cả 2 trang pipeline beauty đọc video **4 lần** cho 4 lớp trong lúc
> stream đang phát → người di chuyển thì 4 lớp lấy 4 frame khác nhau → nhòe
> ghosting. (2) filter cũ quá nhẹ (brightness 1.07 / saturate 0.97) — lớp
> smooth còn nhân đôi base (chuỗi BEAUTY_FILTER rò cả brightness/contrast).
> (3) camera trước KHÔNG bật gương (mirror) preview lẫn ảnh lưu → người tự
> canh theo "gương" trong đầu → ảnh lưu lệch trái. (4) chấm công dùng font
> dấu TO GẤP RƯỠI check-in (giờ 96px, chữ nhỏ 48px) + lineGap 10 + gap 18
> → khối dấu chiếm nửa dưới ảnh.

> **ĐH chốt 4 PA đề xuất** (vòng hỏi-đáp 12/10): ghim ngay + GPS sẵn có ·
> làm đẹp mức VỪA · mirror camera trước · thu gọn dấu ~40%.

> **Đã làm (3 file code — chi tiết comment trong code):**
> 1. **Bỏ độ trễ + hết nhòe:** `cham-cong.tsx` `capturePhoto` ghim ảnh NGAY
>    theo frame hiển thị + dấu dùng GPS/địa chỉ đang hiển thị; GPS +
>    reverseGeocode chạy NỀN cập nhật state cho lần sau (không chặn chụp).
>    `camera-frame.ts` thêm **snapshot 1 frame** — đọc video đúng 1 lần rồi mọi
>    lớp vẽ từ snapshot (hết 4-frame ghosting) + mirror áp 1 điểm duy nhất.
> 2. **Làm đẹp mức VỪA:** base mới `brightness(1.15) contrast(1.08)
>    saturate(0.82)` + lớp **WHITE BALANCE** (fillRect soft-light `#9ecbff`
>    35% — làm lạnh ám vàng tự nhiên); BEAUTY_FILTER gỡ phần base rò vào (hết
>    nhân đôi sáng); preview live khớp: video filter base + div mix-blend
>    soft-light — bấm nút thấy khác NGAY.
> 3. **Mirror camera trước:** option `mirror` trong drawCameraFrame (ảnh + video
>    quay) + `scaleX(-1)` trên video preview — thấy gì ảnh ra nấy, người giữa
>    preview = giữa ảnh; camera sau giữ nguyên.
> 4. **Thu gọn dấu ~40%:** giờ 96/64→38, chữ nhỏ 48/32→21, lineGap 10→5,
>    groupGap 18→8, lề 14→8 (cả 2 trang + khối vẽ overlay live) — khối dấu
>    còn ~21% chiều cao ảnh, sát lề dưới-trái, nội dung (công ty/tên/địa chỉ/
>    ngày giờ) KHÔNG cắt.

> **Verify:** tsc EXIT 0 · **E2E local fake camera 10/10 PASS**
> (`scripts/gd400-verify-camera.mjs`): login → check-in filter+mặt gương+soft-light
> → bấm chụp **415ms** ghim ảnh (trước 1-5s) → ảnh JPEG đủ nội dung → tắt làm
> đẹp sạch; chấm công Tan ca → camera mở → ghim **1518ms**. Trích ảnh lưu thật
> (dataURL) xem trực tiếp: khối dấu gọn ~21% chiều cao, sát lề dưới-trái, đủ
> 5 dòng nội dung — cả check-in lẫn chấm công.

> **Tiêu chí kiểm chứng (sau Push):** trên điện thoại — bấm chụp là thấy ảnh
> ngay (không cần giữ yên); ảnh sáng hơn + hết ám vàng; selfie người ở giữa
> khung; dấu nhỏ nằm góc dưới-trái không đè mặt. Anh test trực tiếp trên Vercel
> sau Push (không test được camera thật ở local — chỉ fake camera).

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.8.2** / repo con **8.7.2**.
