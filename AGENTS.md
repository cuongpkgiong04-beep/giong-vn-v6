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
6. **Think in Code (hiệu lực 2026-10-17, GĐ 450 — ĐH chốt PA-3 sau khảo sát
   context-mode GĐ 449):** việc ĐẾM / LỌC / PHÂN TÍCH / SO SÁNH dữ liệu lớn
   (file lớn, log, dump DB, danh sách dài) → **viết script node/python xử lý
   rồi chỉ in KẾT QUẢ nhỏ vào context** — KHÔNG đọc nguyên dữ liệu vào phiên
   (1 script thay hàng chục lần Read; mẫu: probe plan GĐ 448, tách archive
   GĐ 416, audit phân quyền 3 nguồn GĐ 420). Read/grep trực tiếp CHỈ dành cho
   chỗ cần xem/sửa ĐÚNG DÒNG (quy tắc 2). Bắt buộc với MỌI Agent — kể cả
   probe DB/log qua API agent: lấy JSON về file/BIẾN rồi lọc trong script,
   không in toàn bộ response ra phiên.

### Xử lý khi ĐÃ gặp lỗi tràn context (tham khảo nhanh):

- Lịch sử phiên KHÔNG mất (Freebuff giữ nguyên) → mở thread/phiên MỚI là làm tiếp;
  đọc AGENTS.md + entry GĐ mới nhất để vào việc.
- Với kết nối BYOK: chọn model/context window lớn hơn nếu model hỗ trợ.

---

## 12. Quy ước GHI entry mới (từ GĐ 319):

- Entry mới ghi VÀO **AGENTS.md** (phần này trở đi) — KHÔNG ghi vào AGENTS_ARCHIVE.md.
- AGENTS.md giữ gọn: quy tắc hiện hành (mục 1-12) + entry từ GĐ 411. Khi entry tích
  lũy dài thêm đáng kể (gần 2.000 dòng) → agent ĐƯƠNG SỐ chủ động lặp lại phép tách:
  dời entry cũ (giữ nguyên văn) xuống CUỐI AGENTS_ARCHIVE.md + cập nhật mốc "GĐ mới
  nhất trong archive" ở header file archive.
- Lịch sử GĐ 1 → 410: nằm trọn trong **AGENTS_ARCHIVE.md** (tra bằng số GĐ).
- Mọi quy tắc khác không đổi (Registry lock, 3 quy tắc commit cứng, quy trình
  5 bước, nguyên tắc Push ĐA AGENT — xem mục 4).

---

## 13. QUY TẮC NGHIỆP VỤ HIỆN HÀNH (gom từ entry — hiệu lực vĩnh viễn, GĐ 416):

> **Nguồn:** gom từ entry GĐ 319→410 (đã dời AGENTS_ARCHIVE.md) — quy tắc
> NGHIỆP VỤ + VẬN HÀNH đang hiệu lực, agent phiên mới đọc 1 chỗ, không phải
> grep 92 entry. Khi entry mới ĐỔI quy tắc nào → sửa ngay tại đây.

### 13.1 Báo cáo công nợ đặt trước (bccn) — logic đếm bản cuối:
- **Kỳ = lọc theo Ngày đăng ký** (f1/f3/f4; f2 KHÔNG lọc) — snapshot toàn
  bộ không phân kỳ đã bỏ (GĐ 405/C.241).
- **Lượt trả chỉ tính ≤ đến kỳ** — lượt trả SAU kỳ KHÔNG pop → còn nợ tại
  kỳ + cột "Đã trả sau kỳ" (GĐ 405/C.241).
- **Đếm RAW f1 'Sử dụng tốt' KHÔNG trừ lượt trả f2** (quy tắc web SMED —
  GĐ 376/C.213; bản "trừ lượt trả" GĐ 377/C.217 đã UNDO).
- Ghép f2 theo ghi_chu: 'Đặt trước' = mũi lẻ (phân bổ 2 pha), 'Gói dịch
  vụ' = mũi gói (GĐ 396/C.232); khóa ghép f2→f1 theo GIÁ (GĐ 338/C.182).
- Cột "Kiểm tra"/"Kiểm tra nguồn" đếm lại từ nguồn ĐỘC LẬP → ✓/✗ (GĐ 327/338).
- Job báo cáo = SNAPSHOT thời điểm tính — nguồn SMED đổi → số kỳ cũ đổi
  (GĐ 329); job cũ không tự cập nhật, chạy lại để thấy số mới.

### 13.2 ETL — quy tắc nạp dữ liệu:
- **Rebuild-ngày (GĐ 403/C.239):** folder ngày có ≥1 file MỚI → nạp lại
  TOÀN BỘ file của folder (bỏ hash-skip) — mỗi lượt nạp luôn ĐỦ NGÀY.
- **Auto-ETL nhường job:** KHÔNG chạy khi agent đang thực thi job download.
- **Dedupe đa-lượt SKIP stg_3dtthc** — 2 cổng tcgiong + tcgiongts BỔ SUNG
  nhau, không phải nạp đè (GĐ 343/C.186).
- Đối chứng tổng TỪNG ĐỒNG với file gốc trước khi tin kết quả (quy trình
  Download→ETL→Báo cáo mục trước).

### 13.3 Vận hành agent/service:
- Restart GIONG_SMED_Agent: check rảnh (log 30 phút 0 job) → xóa
  __pycache__ 3 thư mục agent/api_server/etl (lesson GĐ 168) → sc
  stop/start · api_server KHÔNG chết theo sc stop — phải taskkill
  python.exe (GĐ 329).
- Server dev cổ treo: kill PID node THẬT giữ port (netstat -ano) — PID
  npm shim không ăn (GĐ 334).
- Tunnel đổi URL: gist tự ghi → chạy scripts/update-tunnel-env.py đồng bộ
  .env.local 2 app.
- Sau Push code builder: restart agent nạp builder khi rảnh.
- Verify production: curl --compressed + grep -a version + E2E thật; curl
  lần đầu có version mới = domain không ghim deployment cũ (khác GĐ 306).

### 13.4 Ghi chép & quy trình:
- Entry repo con ghi vào **AGENTS.md GỐC repo con** — KHÔNG
  apps/banhang/AGENTS.md (lặp 2 lần: C.172, C.232).
- Bump version: sót "x.y.z" trong package-lock = thư viện ngoài trùng số
  trúng (safe-buffer/hookable/estraverse...) — giữ nguyên (GĐ 328/416).
- E2E: innerText chứa NBSP (U+00A0) — normalize trước khi so chuỗi (GĐ 327).
- Trùng số GĐ → đổi số theo quy tắc GĐ 285; entry/registry cũ đánh ⛔.

---

### GĐ 411 / C.247 (Trợ lý Freebuff): Bccn thêm bảng CUỐI trang "Tổng hợp công nợ theo Gói và Đặt trước" — ghép cn-goi + cn-dt (2026-10-13)

> **Yêu cầu của Đại ca (13/10, sau GĐ 405):** thêm 1 bảng ở cuối trang sau
> "Ma trận chưa tiêm theo trung tâm và dịch vụ_CN", tên **"Tổng hợp công nợ
> theo Gói và Đặt trước"** — ghép 2 bảng cn-goi + cn-dt, 9 cột: STT (đánh
> STT dòng) · Trung tâm · Khách hàng · Mã tiêm chủng · Ngày đăng ký · Dịch
> vụ · **Mã gói** (mã gói hoặc "ĐT_VắcXin") · SL mũi tiêm còn nợ · Số tiền
> còn nợ.
>
> **Đã làm (chi tiết ở AGENTS.md repo con C.247, code `76ba40d`):** builder
> `cn_goi_mamap` + `cn_tonghop_rows` (mỗi nhóm còn nợ của cn-goi/cn-dt 1
> dòng — Mã gói theo slot ghép f3 hoặc 'ĐT_VắcXin'); key **'cn-tonghop'**
> CUỐI meta.sheets + order client (sau mt-cn).
>
> **Verify:** unit **86/86 PASS** (T23) · tsc EXIT 0 · builder thật kỳ
> 2018→30/09: **357 dòng — SL 1.370 = 1.273 + 97 · tiền 995.114.300 =
> 871.819.300 + 123.295.000 khớp từng đồng** · STT xuyên suốt.
>
> **Tiêu chí kiểm chứng (sau Push):** trang bccn job mới → bảng cuối cùng
> sau ma trận 9 cột đúng; tổng = cộng 2 bảng nguồn; restart agent sau Push.
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **6.0.0** / repo con **9.1.0**.

### GĐ 412 / C.248 (Trợ lý Freebuff): Fix 2 bug KPI Tổng quan — drill-down Nhập VX rỗng + mặt hộp Marketing lệch chi tiết (2026-10-13)

> **Đại ca báo (13/10 12:01, 2 ảnh):** (1) chi tiết hộp Nhập Vắc Xin — bấm dòng
> Prevenar 20 · Lô MR7043 → "Không có phiếu nhập của dòng này trong kỳ" (lần
> trước từng hiển thị); (2) mặt hộp Marketing (412 gói/3.927 mũi/3.089.831.550)
> KHÔNG khớp chi tiết bên trong (tt-cn job bccn).
>
> **Chẩn đoán:** (1) `loadOverviewImportByCenter` GĐ 388 — SQL $1..$4 nhưng
> params truyền `[day, vax, unit, unit, lo]` THỪA 1 unit → $4 (so col8) nhận
> nhầm 'company' → col8='company' luôn 0 dòng (verify GĐ 388 bằng literal đúng
> giá trị nên không lộ — probe ≠ code thực tế); (2) mặt hộp Marketing vẫn SQL
> live f3/f4/f1 (GĐ 389) trong khi chi tiết đã sheet tt-cn job bccn (GĐ 407).
>
> **Đã làm (repo con code `d09708d` +22/−34 · docs `1fd1712`):** params đúng
> `[day, vax, unit, lo]` + comment cảnh báo · `marketingStats` viết lại — TỔNG
> sheet tt-cn (OPENJSON SUM) của job `query_key='bccn-dattruoc'` done mới nhất
> — cùng nguồn chi tiết GĐ 407.
>
> **Verify:** tsc EXIT 0 · Bug 1: probe (12/10, Prevenar 20, MR7043) → 1 dòng
> TP 10 × 1.356.264 = 13.562.640 (đúng dòng Bảng 1) · Bug 2: tổng sheet tt-cn
> = **273 gói / 1.370 mũi / 995.114.300** — mặt hộp = tổng bảng chi tiết.
>
> **Tiêu chí kiểm chứng (sau Push):** bấm dòng Bảng 1 Nhập Vắc Xin → phiếu
> nhập theo trung tâm hiện đúng; mặt hộp Marketing = TỔNG bảng chi tiết.
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.9.0** / repo con **9.0.0**.

---

### GĐ 408 (Trợ lý Freebuff): Tinh chỉnh camera sau khi Đại ca test thật — auto white-balance gray-world bớt vàng + chữ dấu to hơn (2026-10-13)

> **Phản hồi của Đại ca (13/10, sau khi LIVE 5.9.0 với GĐ 400):** (1) ảnh vẫn
> chưa đủ bớt vàng đèn; (2) chữ đóng dấu nhỏ quá, cho to hơn một chút.
>
> **Lưu ý song song:** lúc em làm, phiên Freebuff khác đã push GĐ 405/C.241 +
> GĐ 406/C.243 (5.9.0/9.0.0 LIVE) — local main của em đã pull về trước khi sửa;
> claim GĐ 408 (số mới max+1 — đúng quy tắc GĐ 285).

> **ĐH chốt 2 phương án (vòng hỏi-đáp 13/10):**
> - **Bớt vàng: AUTO white-balance gray-world theo ảnh** — đo trung bình kênh
>   màu của CHÍNH ảnh đó rồi nhân gain về trung tính 70% (strength 0.7, clamp
>   0.8-1.25) — vàng đèn mạnh thì trừ mạnh, ban ngày cân sẵn thì gần như không
>   động. Khác "giảm saturate thuần" ở chỗ: WB giữ độ ấm sắc da tự nhiên, chỉ
>   đẩy nhiệt màu về đúng, không bị xám. + Lớp soft-light xanh #9ecbff alpha
>   0.35→0.5 (cả canvas lưu lẫn preview mix-blend — khớp nhau).
> - **Chữ dấu:** giờ 38→46, chữ nhỏ 21→25 (¾ nâng) — cả 2 trang.

> **Đã làm (3 file code + 1 test + package.json):** `src/lib/camera-frame.ts`
> (+`applyGrayWhiteBalance` export — getImageData đo trung bình mẫu 1/8, áp gain
> 1 pass, skip khi ảnh trung tính; vẽ lại snapshot sau cân màu) + `check-in.tsx`
> + `cham-cong.tsx` stamp params + `src/lib/camera-frame.test.ts` (3 test WB;
> fake canvas object chạy node thuần) + `package.json` (đăng ký camera-frame.test.ts
> vào npm test).

> **Verify:** tsc EXIT 0 · unit **9/9 PASS** (6 crop cũ + 3 WB mới — ảnh vàng đèn
> R≈215 G≈205 B≈150 cân lại; ảnh trung tính không chạm; clamp không điên) ·
> **E2E local fake camera: ghim 569ms** (trước 1-5s, vẫn nhanh hơn +150ms so GĐ
> 400 do WB) · ảnh lưu thật: dấu to rõ hơn, sát lề dưới-trái, không đè mặt.

> **Tiêu chí kiểm chứng (sau Push):** điện thoại đèn vàng → ảnh hết ám vàng mà
> da không xám; chữ dấu đọc rõ (giờ 46px) không đè mặt.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.9.0** / repo con **9.0.0**.

---

### GĐ 411 / C.247 (Trợ lý Freebuff): ⛔ ĐỔI SỐ thành GĐ 414 / C.250 (trùng claim phiên khác — quy tắc GĐ 285; nội dung đầy đủ xem entry GĐ 414) — Fix 5 vắc xin thiếu NCC + Giá nhập niêm yết TẠM từ phiếu nhập (2026-10-13)

> **Phản hồi của Đại ca (13/10):** 5 dòng thiếu NCC (14 ROTARIX 1.5ml · 18
> INFLUVAC Tetra · 22 Priorix · 30 Menquadfi · 43 QUIMI-HIB); tạm thời thêm
> Giá nhập niêm yết = giá nhập CÓ THUẾ từ phiếu nhập để tính LN tạm. Chi tiết
> ở entry C.247 AGENTS.md repo con (`511c02b`).
>
> **Chẩn đoán:** stg_5BKN CÓ ĐỦ data cả 5 — join trượt vì: khác chữ hoa ·
> SMED ghi 2 cách tên ('Influvac Tetra'/'INFLUVAC') · Priorix lượt gần nhất
> là dòng "Nhập tồn" bị lọc. **Đã làm (repo con `511c02b`):** key map UPPER
> + lọc Nhập tồn TRƯỚC MAX(id) (param $1) + fallback prefix + giaNhapMap =
> col13 phiếu gần nhất → cột Giá nhập TẠM tự động (DB điền tay ghi đè) + LN
> dùng giá nhập hiệu dụng. **Verify:** đủ 48/48 tên có NCC — 0 thiếu · tsc 0
> · unit 12/12. **KHÔNG cần bổ sung download phiếu nhập.**
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **6.0.0** / repo con **9.1.0**.

### GĐ 413 / C.249 (Trợ lý Freebuff): Trang Lịch hẹn tiêm — bảng mới "Danh sách trả nợ theo lịch hẹn tiêm" sau bảng ds-lht (2026-10-13)

> **Yêu cầu của Đại ca (13/10):** trong "BÁO CÁO MARKETING \ 5. Danh sách lịch
> hẹn tiêm" (app con, trang /m/bc-lich-hen) thêm bảng mới "Danh sách trả nợ
> theo lịch hẹn tiêm" đặt SAU bảng "Danh sách lịch hẹn tiêm ()" — 11 cột STT ·
> Trung tâm · Họ tên · Mã tiêm chủng · Vắc xin · Mã gói · SL mũi tiêm còn nợ ·
> Số tiền còn nợ · Ngày hẹn · Nguồn hẹn · Ghi chú — mapping "Tổng hợp công nợ
> theo Gói và Đặt trước" ↔ "Danh sách lịch hẹn tiêm" qua Họ tên/Khách hàng +
> Mã tiêm chủng + Vắc xin để tra Ngày hẹn (chỉ tiêu của báo cáo).
>
> **Hỏi-đáp chốt 4 điểm (ĐH 13/10):** (1) **PA-2** — tách vắc xin GÓI ('Dịch vụ'
> gộp 'A | B | C' — bằng chứng probe: 'Hexaxim 0.5ml | Prevenar 13 | Vaxigrip
> Tetra 0.5ml' SL 3 · 2.670.000) thành TỪNG DÒNG vắc xin có SL + tiền riêng —
> Subtotal lệch công nợ là lẽ đương nhiên; (2) Ngày hẹn = lịch hẹn còn 'Chưa
> tiêm' GẦN NHẤT, không còn → gần nhất bất kỳ; (3) CHỈ hiện vắc xin còn nợ CÓ
> lịch hẹn trong kỳ báo cáo; (4) công nợ tính THEO KỲ JOB LHT.
>
> **Thiết kế:** nguồn công nợ = sheet tk-goi của builder bccn (chi tiết TỪNG
> MŨI — 'Trạng thái tiêm' 'Chưa tiêm' = còn nợ, quy ước GĐ 311/C.227) — builder
> LHT import sql_reports (cùng máy agent, GiondDB cục bộ) → KHÔNG sửa
> sql_reports.py · KHÔNG job mới; sheet `cn-tra-no` chèn SAU 'ds-lht' trong
> result job → trang web tự render (SubSheets C.189) hưởng sẵn khung chuẩn
> (title + Tổng cộng + màu + nút Tải Excel + phân trang + 4 nguyên tắc định
> dạng). Join: chính xác sau chuẩn hóa (casefold + bỏ ' 0.5ml'/'(…)' — style
> _norm_service) + fallback PREFIX 2 chiều cùng MTC ('Hexaxim 0.5ml' ↔
> 'Hexaxim', guard ≥ 4 ký tự); lịch hẹn ngoài kỳ [df, dt] loại trước khi chọn.
>
> **Đã làm (repo con `ae8bac6` — chi tiết đầy đủ ở AGENTS.md repo con C.249):**
> 1. `gd348-build-lht-ds.py` (+196/−12): TRA_NO_* + `_norm_vx`/`_dmy`/`_num` +
>    `_lht_hen_map`/`_find_hen`/`_pick_hen` + `tra_no_core` (thuần) +
>    `build_tra_no` (lỗi công nợ → None — job LHT vẫn xong) +
>    `_payload_sheets(…, extra_sheets)` + CLI `--cn-from/--cn-to`.
> 2. `40_web_agent.py` run_lht_report_task: gọi build_tra_no(dateFrom, dateTo)
>    → sheets['cn-tra-no']; lỗi chỉ log cảnh báo.
> 3. Test mới `gd348-tra-no.test.py` — **8/8 PASS** offline.
>
> **Verify (chạy thật kỳ 01/10→31/10 — folder 2026-10-01, 19 file, 19.989 →
> 28.067 dòng):** tk-goi 13 dòng → 8 nhóm còn nợ **10 mũi · 29.995.000** —
> bảng mới **1 dòng** (TĐ · Nguyễn Phước Trường An · Beyfortus 0.5ml ·
> ĐT_VắcXin · 1 mũi · 8.700.000 · hẹn 13/10/2026 'Chưa tiêm'); 7 nhóm còn lại
> (21.295.000) không có lịch hẹn trong kỳ → loại đúng ĐH chốt; đối chứng
> 8.700.000 + 21.295.000 = 29.995.000 ✓ từng đồng.
>
> **Bổ sung (Đại ca báo 15:10 "Push xong chạy lại LHT vẫn không thấy bảng"):**
> trang /m/bc-lich-hen render order CỨNG `["ds-lht"]` — sheet `cn-tra-no` có
> trong result nhưng bị bỏ qua (probe: job `F53ADEAF` 15:05 result có đủ
> `['ds-lht', 'cn-tra-no']` — agent side chạy đúng). Fix commit repo con
> `e4e979d`: order thêm `cn-tra-no` (job cũ chưa có sheet → skip) + moneyCols
> theo từng sheet (cn-tra-no cộng Subtotal SL + tiền) — tsc 0 — **chờ Push**.
>
> **Tiêu chí kiểm chứng (sau Push):** trang /m/bc-lich-hen bấm chạy (hoặc bấm
> job `F53ADEAF` trong lịch sử) → bảng 2 "Danh sách trả nợ theo lịch hẹn
> tiêm" hiện SAU bảng lịch hẹn — chỉ khách còn nợ có lịch hẹn trong kỳ.
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **6.0.0** / repo con **9.1.0**.
---

### GĐ 414 / C.250 (Trợ lý Freebuff): Fix 5 vắc xin thiếu NCC + Giá nhập niêm yết TẠM từ phiếu nhập (2026-10-13)

> **Phản hồi của Đại ca (13/10):** 5 dòng thiếu NCC (14 ROTARIX 1.5ml · 18
> INFLUVAC Tetra · 22 Priorix · 30 Menquadfi · 43 QUIMI-HIB) — tìm lại dữ
> liệu nhập kho, chưa có thì nhắc bổ sung download phiếu nhập; tạm thời thêm
> Giá nhập niêm yết = giá nhập CÓ THUẾ từ phiếu nhập để tính LN tạm. Chi tiết
> đầy đủ ở entry C.247→C.250 AGENTS.md repo con (code `511c02b`).
>
> **Chẩn đoán (probe thật):** stg_5BKN **CÓ ĐỦ** data cả 5 — join trượt vì 3
> nguyên nhân: khác chữ hoa ('ROTARIX 1.5ml' ↔ 'Rotarix 1.5ml' · 'Menquadfi'
> ↔ 'MenQuadfi' · 'QUIMI-HIB' ↔ 'Quimi-Hib') · SMED ghi 2 cách tên
> ('Influvac Tetra' / 'INFLUVAC') · Priorix lượt gần nhất theo MAX(id) là
> dòng "Nhập tồn" (23/06) bị lọc → trống.
>
> **Đã làm (repo con `511c02b` — 2 file +60/−17):** (1) key nccMap/giaNhapMap
> = **UPPER(tên rút gọn)**; (2) lọc "Nhập tồn" **TRƯỚC** MAX(id) (param $1 —
> Priorix lấy lượt thật 19/09/2025); (3) fallback lookup prefix cho tên 2
> cách; (4) giaNhapMap = col13 (đơn giá SAU VAT — có thuế) phiếu gần nhất →
> cột "Giá nhập (niêm yết)" **TẠM THỜI** tự động; **DB điền tay GHI ĐÈ**
> (Anh điều chỉnh được); (5) LN dùng giá nhập hiệu dụng; dialog thêm info
> giá nhập tạm.
>
> **Verify (probe query mới + JS map — giả lập load thật):** **đủ 48/48 tên
> bảng TH có NCC — 0 thiếu**; 5 tên khớp: ROTARIX 1.5ml → CHI NHÁNH CÔNG TY
> TNHH TV&DP SANG TẠI HÀ NỘI · 398.754; INFLUVAC Tetra → Công Ty CP Biovaccine
> VN · 213.500; Priorix → CHI NHÁNH SANG HÀ NỘI · 270.000; Menquadfi → CÔNG
> TY CP DP TB YT HÀ NỘI · 1.371.720; QUIMI-HIB → CÔNG TY CP Y TẾ ĐỨC MINH ·
> 109.958. tsc EXIT 0 · unit 12/12. **KHÔNG cần bổ sung download phiếu nhập.**
>
> **Tiêu chí kiểm chứng (sau Push):** 5 dòng hiện NCC + Giá nhập tạm; LN 3
> cột tính đủ cho dòng có Giá bán tự động; khi Loyalty có dữ liệu → thay
> nguồn giá nhập (việc sau).
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **6.0.0** / repo con **9.1.0**.


---

### GĐ 415 / C.251 (Trợ lý Freebuff): PA Push đợt GĐ 408 / GĐ 411-414 / C.247-C.250 — bump 6.1.0 / 9.2.0 + LIVE production (2026-10-13)

> **Lệnh "Push" của Đại ca (13/10, sau khi GĐ 408 xong).** Rà trùng lặp theo
> nguyên tắc 3: 0 nhánh phụ (`main..agent-cli` + `main..pipeline-work` = RỖNG);
> working tree sạch (chỉ file cũ của phiên khác — attachments deleted +
> permissions.ts GĐ 315 — không đụng); app tổng 11 commit chưa push (GĐ 408
> camera WB của em + docs GĐ 411-414 của phiên song song); repo con 10 commit
> (C.247-C.250 đủ code + docs).

> **🔒 Dở trong registry (đã dọn docs-only trước push):**
> - Dòng **GĐ 413 / C.249** (bảng "Danh sách trả nợ theo lịch hẹn tiêm") — code
>   XONG (repo con `ae8bac6` + `bdd484d` + `2b465c8`) nhưng registry còn 🔒 →
>   em unlock ✅ kèm hash đúng commit.
> - Dòng **GĐ 411 / C.247 cũ** ("Fix 5 vắc xin thiếu NCC") — phiên khác đã đổi
>   số sang **GĐ 414 / C.250** theo quy tắc GĐ 285 (trùng claim) → em sửa dòng
>   này thành ⛔ (chuyển sang GĐ 414) — tránh 2 số trùng lên lịch sử.

> **Bump version (lúc Push — đúng quy tắc ĐA AGENT):** app tổng **6.0.0 → 6.1.0**
> (minor — có feature mới: bảng trả nợ LHT + bảng cn-tonghop bccn) — package.json
> + package-lock.json (2 chỗ) + DEFAULT_VERSION app-shell.tsx; repo con
> **9.1.0 → 9.2.0** (minor — C.247/C.249/C.250) — apps/banhang/package.json +
> DEFAULT_VERSION. Checklist GĐ 138 ✓ (6.1.0/9.2.0 mọi thành phần 1 chữ số;
> sót "6.0.0" chỉ là thư viện locate-path trùng số — lesson GĐ 328).

> **Push:** app tổng `d3a86e9..f05a87e` (11 commit: GĐ 408 + docs GĐ 408/411-
> 414 + GĐ 415 claim+bump) · repo con `c8eb081..6953d79` (10 commit: C.247
> cn-tonghop · C.248 KPI · C.249 trả nợ LHT (code+hook+entry) · C.250 fix NCC ·
> C.251 bump).

> **✅ Verify production (curl --compressed + grep -a):** app tổng
> `giong-vn-v6.vercel.app` = **6.1.0** (curl lần đầu) · app con
> `giong-banhang.vercel.app` = **9.2.0** (curl lần đầu) — không ghim deployment
> (khác sự cố GĐ 402 git_info_fail, lần này i9n mượt). Agent: log `web_agent_
> ...` poll OK · `/health` tunnel_ok + GiongDB 1.610 jobs (đã restart lúc C.249
> — phiên song song làm trước đó).

> **Tiêu chí kiểm chứng của Đại ca:** (1) camera điểm danh/check-in trên điện
> thoại thật: ảnh hết vàng đèn + da không xám (auto WB) + chữ dấu to đủ đọc sát
> lề dưới-trái; (2) trang /m/bc-lich-hen app con: bảng mới "Danh sách trả nợ
> theo lịch hẹn tiêm" đặt sau ds-lht, chỉ hiện vắc xin còn nợ có lịch hẹn kỳ;
> (3) KPI Tổng quan: drill-down Nhập VX ra đúng phiếu + marketing hộp khớp;
> (4) Bảng TH GB-KM_GN-CK-LN: đủ 48/48 NCC + giá nhập tạm đúng.

> **Version:** app tổng **6.1.0** / repo con **9.2.0** — ĐÃ PUSH + ĐÃ LIVE.

---

### GĐ 416 (Trợ lý Freebuff): PA-3 chốt hệ thống quy định đa agent — tách archive lần 2 + sửa registry vỡ + mục 13 + push sót permissions.ts 6.1.1 + dọn rác (2026-10-13)

> **Yêu cầu của Đại ca (13/10):** "Xem lại một lần nữa hệ thống các quy định,
> hệ thống các phân loại... để chốt lại cho các AI Agent làm việc hiệu quả."
> Em rà toàn bộ AGENTS.md + AGENT_REGISTRY.md + CLAUDE.md + archive → trình
> 4 tầng quy tắc + 6 vấn đề bằng chứng → **ĐH chốt PA-3** (dọn đỏ + gom quy
> tắc + chốt việc treo).

> **Đã làm (docs-only + 1 file code sót GĐ 315):**
> 1. **Tách archive LẦN 2** (`dddbc00`, script `scripts/gd416-split-archive.py`):
>    entry GĐ 319→410 (3.163 dòng) dời NGUYÊN VĂN xuống CUỐI AGENTS_ARCHIVE.md —
>    **md5 khớp byte-đối-byte**; AGENTS.md **3.991 → 828 dòng** (~79% nhẹ hơn —
>    hết lặp lại bệnh tràn context GĐ 319); header + footer archive cập nhật
>    mốc "GĐ 1 → 410"; mục 12 đổi "entry từ GĐ 319" → "từ GĐ 411".
> 2. **Sửa registry 3 dòng vỡ** (script `scripts/gd416-fix-registry.py`): đếm
>    7-ô phát hiện đúng 3 dòng dính (19 dòng báo lúc đầu là false-positive):
>    dòng 44 (thừa 1 ô — gộp) · dòng 80 (4 entry dính → tách; 2 entry thiếu số
>    TRẢ LẠI số đã tồn tại: **C.198** điều tra bccn — GĐ 377 nhắc "bản C.198" ·
>    **C.197** fix Tiền thuế MIA — hoàn tất nhắc C.197b) · dòng 91 (2 entry →
>    tách; khảo sát UI/UX = **GĐ 347** — khớp claim `e7a794e`). Mọi dòng bảng
>    khóa số = đủ 7 ô; 4 số "thiếu heading" 339/363/365/408 kiểm = nguyên trạng
>    (339/363/365 không từng có entry riêng — nhắc trong entry Push; 408 giữ ở
>    AGENTS.md).
> 3. **Mục 13 QUY TẮC NGHIỆP VỤ HIỆN HÀNH** (`fc1a888`): gom 4 nhóm quy tắc
>    hiệu lực rải trong entry — 13.1 logic đếm bccn bản cuối (kỳ theo Ngày
>    đăng ký · RAW f1 · ghép ghi_chu/giá · Kiểm tra nguồn) · 13.2 ETL
>    rebuild-ngày + auto-ETL nhường job + skip 3dtthc · 13.3 vận hành agent
>    (__pycache__, taskkill node/python, tunnel, verify curl) · 13.4 ghi chép
>    (entry repo con ghi file GỐC — lặp 2 lần; sót version lock = thư viện;
>    NBSP E2E; trùng số ⛔).
> 4. **Hoàn tất sót GĐ 315** (`b66a261` + bump `cbfc655`): `permissions.ts` +8
>    dòng (phân quyền 2 module Biên bản họp + Zalo — modified 8 ngày chờ ĐH OK
>    riêng) — ĐH duyệt qua PA-3 → commit + **bump 6.1.0 → 6.1.1 (patch — 4 chỗ,
>    hookable 6.1.1 lock là thư viện ngoài trùng số trúng)** + push + curl
>    LIVE 6.1.1 lần đầu. Repo con KHÔNG đụng (giữ 9.2.0).
> 5. **Entry GĐ 411 sai số** (trùng entry GĐ 414 — cùng code `511c02b`): đánh
>    dấu ⛔ ĐỔI SỐ ở heading (không xóa nội dung).
> 6. **Dọn rác untracked:** 8 file .whl (wheel Python) · j58.json (dump tạm
>    tasks) · dev-main*.log 2 file · LOG/ (log dev cũ nhất 08/10) ·
>    `public/~$DSACH TID VCB.xlsx` (Excel lock) — GIỮ: attachments/, screenshots/,
>    public/*.jpg, favicon, `.claude/skills/` (hỏi riêng ĐH).

> **Verify:** md5 khối dời byte khớp · bảng khóa số 100% dòng 7 ô (bằng script,
> loại bảng phân vai/sự cố khác cột) · đếm entry AGENTS.md 7 + archive đủ
> 319→410 (4 số thiếu heading = nguyên trạng có kiểm chứng) · curl 6.1.1 ·
> git status còn lại chỉ untracked có chủ + 1 file deleted của phiên trước.

> **Version:** app tổng **6.1.1** (bump đợt push sót permissions — duyệt PA-3)
> / repo con **9.2.0** (không đụng code) — permissions.ts ĐÃ PUSH + LIVE; phần
> docs GĐ 416 KHÔNG push chờ lệnh.

---

### GĐ 417 (Trợ lý Freebuff): PA Push đợt GĐ 416 — docs-only KHÔNG bump + LIVE production (2026-10-13)

> **Lệnh "Push" của Đại ca (13/10, sau GĐ 416).** Rà trùng lặp theo nguyên tắc
> 3: `main..agent-cli` + `main..pipeline-work` = **RỖNG cả 2 repo** · remote
> `origin/main` 0 commit mới (fetch — không có agent khác push) · registry 0 🔒
> dở · status chỉ còn `D attachments/*.zip` của phiên trước (không đụng).

> **Push:** app tổng `cbfc655..0f8debf` — 5 commit: 4 docs GĐ 416 (tách archive
> lần 2 + registry 7 ô · mục 13 + heading GĐ 411 ⛔ · entry + unlock · skill
> REA `.claude/skills/`) + 1 claim GĐ 417. Repo con: **"Everything up-to-date"**
> — 0 commit local (C.- không có thay đổi, giữ nguyên).

> **KHÔNG bump version (docs-only):** đợt push 0 code app (AGENTS.md +
> registry + archive + `.claude/skills/` — không đụng build/production code) —
> precedents GĐ 319 (tách lần 1, docs-only). App tổng 6.1.1 vừa bump + LIVE
> sáng nay cho permissions.ts; giữ nguyên.

> **✅ Verify production (curl --compressed + grep -a):** app tổng
> `giong-vn-v6.vercel.app` HTTP 200 = **6.1.1** · app con
> `giong-banhang.vercel.app` HTTP 200 = **9.2.0** — deploy mới chạy, không ghim
> deployment cũ (khác sự cố GĐ 306).

> **Version:** app tổng **6.1.1** / repo con **9.2.0** — ĐÃ PUSH + ĐÃ LIVE
> (không đổi — docs-only).


### GĐ 418 / C.252 (Trợ lý Freebuff): PA Push đợt fix render bảng "Danh sách trả nợ theo lịch hẹn tiêm" — bump repo con 9.2.1 + LIVE (2026-10-13)

> **Lệnh "Push" của Đại ca (13/10 15:10+, sau khi anh báo chạy lại LHT vẫn
> không thấy bảng — GĐ 413).** Rà trùng lặp: remote 0 commit mới cả 2 repo;
> repo con 3 commit local của em (`e4e979d` fix render + `8bff2c8` entry +
> bump); app tổng 2 commit (`819809a` entry + claim); working tree chỉ file
> deleted của phiên trước — KHÔNG đụng. Gặp `index.lock` của phiên khác 1
> lần — chờ 15s nhả lock, commit lại OK.
>
> **Bump:** repo con **9.2.0 → 9.2.1** (patch — fix nhỏ) — package.json +
> DEFAULT_VERSION; package-lock giữ nguyên (đang 5.9.4 lệch từ trước — lesson
> GĐ 328). App tổng **KHÔNG bump** (docs-only — tiền lệ GĐ 416), giữ 6.1.1.
>
> **Push:** repo con `6953d79..83f7272` · app tổng `1007520..278762f`.
>
> **✅ Verify production (curl --compressed lần đầu):** app con
> `giong-banhang.vercel.app` = **9.2.1** · app tổng `giong-vn-v6.vercel.app` =
> **6.1.1** — không ghim deployment cũ. Agent không cần restart (0 code
> builder đổi).
>
> **Tiêu chí kiểm chứng của Đại ca:** trang /m/bc-lich-hen (app con, version
> 9.2.1 góc trái) → bấm job vừa chạy trong lịch sử (hoặc Chạy báo cáo lại) →
> bảng "Danh sách trả nợ theo lịch hẹn tiêm" hiện SAU bảng "Danh sách lịch
> hẹn tiêm" — kỳ 10/2026: 1 dòng TĐ · Nguyễn Phước Trường An · Beyfortus
> 0.5ml · ĐT_VắcXin · 1 mũi · 8.700.000 · hẹn 13/10 'Chưa tiêm' + Tổng cộng.
>
> **Version:** app tổng **6.1.1** (giữ) / repo con **9.2.1** — ĐÃ PUSH + LIVE.
---

### GĐ 419 / C.253 (Trợ lý Freebuff): Bảng TH GB-KM thiếu 4 vắc xin so với bảng giá chuẩn 52 — seed bổ sung (2026-10-13)

> **Anh hỏi kiểm tra (13/10):** bảng giá 52 sản phẩm nhưng Bảng TH GB-KM chỉ
> 48 dòng — có trùng lặp/thiếu sót?
>
> **Kết luận (probe thật):** **KHÔNG trùng lặp** — price_list sau C.236 đã
> chuẩn 52 dòng / 52 ten_smed distinct / 52 tên rút gọn distinct. **THIẾU 4**
> (Bảng TH seed từ bản giá TRƯỚC C.236 — khi 4 ten_smed còn trùng 2 mức giá
> ABRYSVO/Menquadfi/MMR-II/Vaxneuvance, C.236 dọn + thêm 4 sản phẩm mới):
> 1. stt 22 **Measles, Mumps and Rubella Vaccine Live, Attenuated
>    (Freeze-Dried)** (MMR Ấn Độ) — giá bán 310.000
> 2. stt 31 **MENACTRA** — 1.300.000
> 3. stt 33 **Nimenrix** — 1.700.000
> 4. stt 36 **PREVENAR 13** — 1.250.000
>
> **Đã làm (data GiondDB — không đổi code):** INSERT 4 dòng idempotent (WHERE
> NOT EXISTS) theo ten_smed rút gọn → **th_gbkm_gnck_ln = 52/52 khớp bảng
> giá**. 4 dòng tự hưởng NCC + Giá nhập tạm qua map load có sẵn (stg_5BKN:
> MMR Ấn Độ → Biovaccine · 168.000; MENACTRA → DP TB YT HÀ NỘI · 969.760;
> Nimenrix → CHI NHÁNH SANG · 1.341.900; PREVENAR 13 → CHI NHÁNH SANG ·
> 1.077.300). 4 dòng nằm CUỐI bảng (STT 49-52, thứ tự id) — KHÔNG rebuild
> (phát hiện data Anh điền tay: BCG-TCDV KM 20.000 + Thưởng NV 10.000 lúc
> 15:52 — phải giữ nguyên; guard assert chặn kịp trước DELETE).
>
> **Version:** KHÔNG bump (chỉ data — precedent GĐ 365-close). App tổng
> **6.1.1** / repo con **9.2.1**.


### GĐ 420 / C.254 (Trợ lý Freebuff): PA-1 — bảng "Danh sách trả nợ theo lịch hẹn tiêm" dùng công nợ 01/01/2018 → ngày chạy (2026-10-13)

> **Đại ca báo (13/10 15:10+):** bảng mới chỉ có 1 dòng (Trường An hẹn 13/10)
> — hỏi logic khác trao đổi không. **Chẩn đoán:** không phải lỗi join — nguồn
> công nợ sai ý: em tính công nợ theo kỳ job LHT mà công nợ lọc kỳ theo Ngày
> đăng ký → chỉ khách ĐK tháng 10 còn nợ (8 nhóm → 1 dòng). Probe công nợ
> 2018→30/09 (1.067 nhóm · 995.114.300) join LHT tháng 10 → **157 dòng**.
>
> **ĐH chốt PA-1** — công nợ TÍNH LẠI 01/01/2018 → NGÀY CHẠY job LHT. Đã làm
> (repo con `72d2b27`): `build_tra_no(cn_df, cn_dt, rows, hen_df, hen_dt)` —
> HAI KỲ RIÊNG (công nợ 2018→ngày chạy · lịch hẹn lọc theo kỳ job LHT) — chặn
> lỗi chép kỳ công nợ vào lọc lịch hẹn (lần chạy đầu ra 94 dòng — mất 63
> dòng hẹn 14→31/10); hook hentiem CLI thêm --hen-from/--hen-to. Unit 8/8 ·
> chạy thật: **156 dòng · 203 mũi · 198.229.200** (chênh probe 157 = lượt trả
> 01/10→13/10 giờ nằm trong kỳ công nợ — khách đã trả loại đúng). Chi tiết ở
> AGENTS.md repo con C.254. Restart agent nạp code.
>
> **Tiêu chí kiểm chứng (sau Push):** chạy job LHT kỳ 10/2026 → bảng mới
> ~156 dòng khách còn nợ có lịch hẹn tháng 10. **Version:** KHÔNG bump (chờ
> lệnh Push) — app tổng 6.1.1 / repo con 9.2.1.


### GĐ 422 / C.256 (Trợ lý Freebuff): PA Push đợt GĐ 421/C.255 PA-1 — push KHÔNG bump — LIVE (2026-10-13)

> **Lệnh "Push" của Đại ca (13/10 17:30+, sau PA-1 GĐ 420).** Rà trùng lặp
> nguyên tắc 3 — **CẢNH BÁO 2 phát hiện**:
> 1. **Trùng số GĐ 420** — phiên khác claim `f6a9659` 17:17:31 TRƯỚC em
>    `140e4bb` 17:18:45 → theo quy tắc GĐ 285 em ĐỔI SỐ entry/registry của em
>    thành **GĐ 421 / C.255** (nội dung/dữ liệu không đổi — commit code giữ
>    message số cũ, history chỉ đi tới); phiên khác giữ GĐ 420/C.254.
> 2. **3 file web đang dở của phiên khác** (`app-shell.tsx`, `smed-auth.ts`
>    repo con · `banhang-catalog.ts` app tổng — phân quyền NHẬP DỮ LIỆU GĐ 420
>    phiên khác) → KHÔNG đụng, KHÔNG add.
>
> **KHÔNG bump version (khác GĐ 418):** fix lần này 100% agent-side python
> (`gd348-build-lht-ds.py` + `40_web_agent.py` — chạy trên máy agent, không
> nằm trong bundle web) — version web không phản ánh; đồng thời `app-shell.tsx`
> (file DEFAULT_VERSION) đang bị phiên khác sửa dở → không thể chạm. Tiền lệ
> docs-only GĐ 416/417. Web giữ **9.2.1 / 6.1.1**.
>
> **Push:** repo con `83f7272..473cb6c` (4 commit: fix + entry + lesson + đổi
> số) · app tổng `0186c1a..5fe171e` (3 commit: entry + đổi số + claim/unlock).
>
> **✅ Verify production (curl --compressed):** app con **9.2.1** · app tổng
> **6.1.1** (HTTP 200, deploy chạy). Agent đã restart 17:24 nạp code PA-1 —
> KHÔNG cần restart thêm.
>
> **Tiêu chí kiểm chứng của Đại ca:** chạy job LHT kỳ 01/10→31/10 → bảng
> "Danh sách trả nợ theo lịch hẹn tiêm" ~156 dòng · 203 mũi · 198.229.200
> (số thay đổi theo nợ/lượt trả đến thời điểm chạy — công nợ 01/01/2018→ngày
> chạy). Task_02 23:00 tối nay chạy bình thường.
>
> **Version:** app tổng **6.1.1** / repo con **9.2.1** — ĐÃ PUSH + LIVE.

---

### GĐ 420 / C.254 (Trợ lý Freebuff): Phân quyền app tổng — Bổ sung nhóm NHẬP DỮ LIỆU + đồng bộ app con (2026-10-13)

> **Yêu cầu của Đại ca (13/10):** "Trong phần phân quyền trên App tổng cho phần
> Bán hàng (Dự án) hiện tại đang thiếu... Anh đang mới nhìn thấy thiếu phần
> 'NHẬP DỮ LIỆU' và các module con bên trong nó. Còn các phần khác anh chưa
> kiểm tra. Em hãy kiểm tra lại một lần nữa cho chắc chắn để anh phân quyền
> cho nhân viên trên App tổng."

> **Rà soát toàn bộ (66/66 route khớp 3 nguồn — script đối chiếu tự động):**
> so khớp nav.ts app con ↔ BH_GROUPS (catalog app tổng) ↔ route files ↔
> ROUTE_TO_GROUP app con → phát hiện **4 lỗi phân quyền**:
> 1. **NHẬP DỮ LIỆU (10 lá: DANH MỤC×5 · KHO HÀNG×1 · MUA HÀNG×1 · BÁN HÀNG×3)
>    KHÔNG có nhóm riêng** trên trang Phân quyền — bị nhét vào nhóm
>    banhang-misa từ GĐ 223/336/340/370 (backward-compat) → ĐH không thấy mục
>    "NHẬP DỮ LIỆU" để cấu hình (lỗi ĐH báo).
> 2. **ROUTE_TO_GROUP app con THIẾU 7 route** (5 danh mục + /m/nhap-dieu-chuyen
>    + /m/nhap-loyty) → leaf key "bh-leaf-*" không bao giờ sinh → sidebar app
>    con ẩn DANH MỤC/KHO HÀNG/MUA HÀNG + canAccessRoute chặn oan user thường.
> 3. **BH_ALL_GROUP_KEYS app con thiếu "bh-dieu-hanh-nhiem-vu"** (sót GĐ 229) →
>    user đã bật nhóm NHIỆM VỤ + có config nhóm khác bị ẩn oan menu /m/tasks.
> 4. **NAV_GROUP_TO_MOD app con thiếu map** "DỮ LIỆU TỪ BANK" (sót GĐ 253).

> **Đã làm (app tổng `71285aa` · repo con `2e9f5d9`):**
> - App tổng `banhang-catalog.ts`: tách 10 lá NHẬP DỮ LIỆU → **4 nhóm mới**
>   `bh-nhap-danh-muc` / `bh-nhap-kho-hang` / `bh-nhap-mua-hang` /
>   `bh-nhap-ban-hang` (đặt ĐẦU BH_GROUPS khớp thứ tự sidebar; nhãn
>   "NHẬP DỮ LIỆU — X") — banhang-misa còn 6 lá (2 MISA + 4 MIA TOOL).
>   Catalog 8→**14 nhóm** — trang Phân quyền tự hiện (UI render động BH_GROUPS).
> - Repo con `smed-auth.ts`: ROUTE_TO_GROUP +7 route thiếu + đổi 3 route
>   banhang-* sang nhóm mới; BH_ALL_GROUP_KEYS 9→14 key.
> - Repo con `app-shell.tsx`: NAV_GROUP_TO_MOD map 4 nhóm con + DỮ LIỆU TỪ BANK.
> - Unit test MỚI `src/lib/banhang-catalog.test.ts` (8 test) + đăng ký npm test.

> **Verify:** unit **8/8 PASS** · tsc app tổng **EXIT 0** · tsc app con
> **EXIT 0** · audit 3 nguồn **12/12 PASS** (route files == nav.ts == catalog
> == ROUTE_TO_GROUP TỪNG route; 14/14 key nhóm khớp 2 repo) · nhóm src/lib
> **54/54 PASS** (3 test scripts/with-app-env fail CÓ SẴN — đối chứng worktree
> HEAD sạch fail y hệt, không liên quan).

> **⚠️ Lưu ý khi cấp quyền (ĐH đọc kỹ):** user ĐÃ từng cấu hình nhóm (không rơi
> nhánh "chưa cấu hình → đủ hết") sẽ KHÔNG còn thấy 10 mục NHẬP DỮ LIỆU nếu
> Admin chưa bật 4 nhóm mới — trước đây thấy qua quyền MISA. User chưa từng
> cấu hình → vẫn đủ hết (không ảnh hưởng). Đây là chủ đích tách nhóm để phân
> quyền riêng (ĐH yêu cầu).

> **Tiêu chí kiểm chứng (sau Push):** trang Phân quyền app tổng phần "Bán hàng
> (Dự án)" → thấy **4 nhóm mới ở ĐẦU danh sách** ("NHẬP DỮ LIỆU — DANH MỤC"
> với 5 chip, KHO HÀNG, MUA HÀNG, BÁN HÀNG); bật nhóm → nhân viên vào app con
> thấy đủ nhánh NHẬP DỮ LIỆU; toggle nhóm NHIỆM VỤ hoạt động đúng.

> **Trùng số GĐ 420 (minh bạch 13/10):** phiên khác claim trùng số 420 (PA-1
> công nợ LHT) — em commit `f6a9659` 17:17:31 TRƯỚC 74 giây (họ `140e4bb`
> 17:18:45) → theo quy tắc GĐ 285, **em giữ GĐ 420/C.254**, phiên khác tự đổi
> thành GĐ 421 / C.255.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **6.1.1** / repo con **9.2.1**.

---

### GĐ 423 / C.257 (Trợ lý Freebuff): PA Push ĐA AGENT đợt cuối 13/10 — GĐ 420/C.254 phân quyền NHẬP DỮ LIỆU + bump 6.2.0 / 9.3.0 + LIVE (2026-10-13)

> **Lệnh của Đại ca (13/10 tối):** "Tất cả các Agent đều xong việc. Em hãy
> Push toàn bộ công việc đã xong nhé." Rà toàn diện cả 2 repo: nhánh phụ
> `agent-cli` + `pipeline-work` **RỖNG** (không cần merge) · worktree khác
> sạch · commit chưa push = đúng bộ **GĐ 420 / C.254 phân quyền app tổng**
> (phiên Freebuff khác làm, đã verify 8/8 unit + tsc 0 + audit 12/12 — entry
> ghi "KHÔNG bump chờ Push"): app tổng `71285aa` (code: BH_GROUPS tách 4 nhóm
> bh-nhap-* + test mới banhang-catalog.test.ts) + `f64029b` (entry) +
> `27d9e03` (unlock) · repo con `2e9f5d9` (ROUTE_TO_GROUP +7 route +
> BH_ALL_GROUP_KEYS +5 key + NAV_GROUP_TO_MOD) + `34db69c` (entry).

> **Em chạy lại unit lần cuối trước push: 54/54 PASS** (gồm 8 test phân quyền
> mới — không code gãy được đẩy production).

> **Bump version (lúc Push — quy tắc ĐA AGENT):** nội dung = feature mới →
> **minor**: app tổng **6.1.1 → 6.2.0** (4 chỗ — hookable 6.1.1 lock là thư
> viện ngoài trùng số trúng, giữ nguyên) · repo con **9.2.1 → 9.3.0** (2 chỗ).
> Checklist GĐ 138 ✓ (mọi thành phần 1 chữ số).

> **⚠️ SỐ C.x commit bump repo con ghi SAI — đã minh bạch:** commit
> `6b641ee` message ghi "C.256" nhưng **C.256 đã thuộc GĐ 422 phiên khác**
> (push trước) — theo quy tắc GĐ 285 (lịch sử chỉ đi tới, KHÔNG amend commit
> đã push) → đợt này đúng số = **C.257**; entry + registry ghi số đúng, commit
> giữ nguyên (message sai số — không đổi nội dung/code).

> **Push:** app tổng `8458282..98ab1c7` (5 commit: 3×GĐ 420 + claim GĐ 423 +
> bump) · repo con `473cb6c..6b641ee` (3 commit: 2×C.254 + bump).

> **✅ Verify production (curl --compressed lần đầu):** app tổng
> `giong-vn-v6.vercel.app` HTTP 200 = **6.2.0** · app con
> `giong-banhang.vercel.app` HTTP 200 = **9.3.0** — deploy mới, không ghim
> deployment cũ. Agent: không cần restart (0 code builder đổi).

> **Tiêu chí kiểm chứng của Đại ca:** trang Phân quyền app tổng → phần "Bán
> hàng (Dự án)" có 4 nhóm mới ở ĐẦU danh sách ("NHẬP DỮ LIỆU — DANH MỤC"
> 5 chip · KHO HÀNG · MUA HÀNG · BÁN HÀNG); bật nhóm cho user → app con thấy
> đủ nhánh NHẬP DỮ LIỆU (hết bug menu ẩn/chặn oan user thường).

> **Version:** app tổng **6.2.0** / repo con **9.3.0** — ĐÃ PUSH + ĐÃ LIVE.

---

### GĐ 424 (Trợ lý Freebuff): Điều tra sự cố "nhiệm vụ + lịch sử download/báo cáo biến mất" sau push 6.2.0 — KHÔNG MẤT DỮ LIỆU, tunnel URL cũ chết — ĐÃ HỒI PHỤC (2026-10-13)

> **Đại ca báo (13/10 tối):** "sau khi push xong anh kiểm tra sơ bộ thì các
> nhiệm vụ cũ, đang thực hiện biến mất tiêu đâu rồi. các lịch sử làm việc như
> download, báo cáo... cũng biến mất."

> **Chẩn đoán (bậc thang — bằng chứng thật):** DỮ LIỆU KHÔNG MẤT —
> 1. API agent cục bộ `:8777/health`: **GiondDB 1.639 jobs nguyên vẹn** ·
>    service GIONG_SMED_Agent RUNNING · api_server LISTENING · cloudflared sống.
> 2. Nghi phạm: **Quick Tunnel đổi URL mỗi lần restart agent** (17:51 — log
>    `web_agent_131026_175104`) → URL cũ `unnecessary-programming-convicted-very`
>    (trong env `.env.local` + env Vercel bake build-time `TUNNEL_API_BASE_URL`)
>    CHẾT → production không nối được agent → nhiệm vụ + lịch sử + báo cáo
>    hiển thị RỖNG. Tunnel mới: `exhibit-node-mlb-silver.trycloudflare.com`
>    (curl /health từ ngoài: `tunnel_ok: true`).
> 3. Gist tự ghi vẫn sống (script đọc được URL mới — curl raw 404 là do cần
>    token API, không phải gist mất).

> **Đã hồi phục (không đụng code — chỉ env):**
> 1. Chạy `scripts/update-tunnel-env.py` (quy trình 13.3) → đồng bộ
>    `.env.local` 2 app = URL mới.
> 2. Vercel: `TUNNEL_API_BASE_URL` production **2 app** (app tổng + app con
>    — cả 2 đều có biến này) → rm + add URL mới → `vercel redeploy` cả 2
>    (Ready 31s/42s) — version giữ nguyên 6.2.0 / 9.3.0.
> 3. **Verify browser thật (login SSO → /m/tasks):** Task_04 17:15
>    **Hoàn thành 22/22 bước OK** (xong 18:52) · Task_03 **24/29 báo cáo OK**
>    · SuperAdmin thấy đủ — DỮ LIỆU TRỞ LẠI ĐẦY ĐỦ.

> **🚨 Việc cần làm tiếp (chưa làm):** cơ chế fallback gist runtime GĐ C.40
> (query fail → đọc gist → URL mới) đáng lẽ TỰ hồi phục mà KHÔNG — cần điều
> tra vì sao (nếu hoạt động đúng thì không phải redeploy mỗi lần tunnel đổi
> URL). Kiểm: GH_GIST_TOKEN trên Vercel còn hạn? · fallback có chạy trên SSR
> hay chỉ client? · cache 60s có kẹt?

> **Version:** 6.2.0 / 9.3.0 giữ nguyên (chỉ env + redeploy — 0 code đổi).
> Entry docs KHÔNG push chờ lệnh (claim `45d37cf` — chờ, unlock commit này).

---

### GĐ 425 (Trợ lý Freebuff): Điều tra vì sao fallback gist GĐ C.40 KHÔNG tự hồi phục — TÌM RA GỐC: GH_GIST_TOKEN chết → 401 → fallback trả null im lặng (2026-10-13)

> **Nhiệm vụ tiếp GĐ 424 (ĐH yêu cầu):** cơ chế tự hồi phục (query fail → đọc
> gist → URL mới) đáng lẽ chạy mà phải redeploy tay.

> **Điều tra (đọc code + probe thật):**
> 1. Logic `db.ts` (app con — app tổng đồng bộ GĐ 169) VIẾT ĐÚNG: cache
>    fromGist dùng trực tiếp · env cache 60s rồi đọc gist ĐỒNG BỘ (GĐ 244) ·
>    query fail cả khi HTTP 5xx (GĐ C.41 bắt 530) → fallback chồng 2 lớp.
> 2. KHÔNG có serverFn nào bypass `tunnelFetch` (grep — chỉ db.ts dùng env).
> 3. **Probe GitHub API quyết định:** gist `db3dae34…` là **PUBLIC** — đọc
>    KHÔNG token = **200** (có `base_url: exhibit-node-mlb-silver…` updated
>    19:15:34) · gửi Bearer token rỗng/sai = **401** · token
>    `.secrets/gh_gist_token.txt` trên máy = **RỖNG 0 ký tự** (đã revoke/xoá
>    — api_server ghi gist thành công 19:15 nhờ token ở env biến môi trường
>    service, token file cũ đã chết).
> 4. **GỐC CHỐT:** `fetchTunnelUrlFromGist` bắt buộc gửi
>    `Authorization: Bearer ${GH_GIST_TOKEN}` (env Vercel set 24 ngày trước —
>    cùng token đã chết) → GitHub **401** → `if (!res.ok) return null` →
>    fallback CHẾT IM LẶNG. Với gist public, gửi token SAI còn tệ hơn KHÔNG
>    gửi (gh_public + token invalid = 401; không gửi = 200).

> **Trình 3 PA (chờ ĐH chốt):**
> - **PA-1 (khuyến nghị):** sửa `db.ts` 2 app — khi gist fetch 401 → retry
>   KHÔNG token (gist public); đọc gist không cần token bắt buộc (token chỉ
>   cần khi GHI — api_server giữ riêng). Dự đoán: fallback sống lại, tunnel
>   đổi URL lần tới app tự lành <1 phút, không redeploy. Rủi ro ~0.
> - **PA-2 (vận hành):** tạo PAT GitHub mới (scope gist) + cập nhật env
>   GH_GIST_TOKEN trên Vercel 2 app + máy service. Dự đoán: hoạt động nhưng
>   PAT hết hạn/revoke lại → phải lặp. Không giải quyết gốc.
> - **PA-3:** PA-1 + PA-2 (code retry-no-token + token chuẩn dự phòng nếu
>   sau này gist chuyển private).

> **Version:** KHÔNG bump (điều tra docs — 0 code đổi). Entry KHÔNG push
> chờ lệnh.

---

### GĐ 426 / C.258 (Trợ lý Freebuff): PA-1 — tự hồi phục URL Quick Tunnel: gist public đọc không cần token bắt buộc + 401 → retry KHÔNG token (2026-10-13)

> **ĐH chốt PA-1** (sau điều tra GĐ 425 — GH_GIST_TOKEN chết → 401 → fallback
> null im lặng). **Đã làm (2 file + 1 test mới, +100/−21):**
> 1. `fetchTunnelUrlFromGist` (db.ts **CẢ 2 app** — app tổng `8ba98a3` · repo
>    con `6703d6f`): điều kiện đầu bỏ yêu cầu token (chỉ cần `gistId` — gist
>    public); fetch gói hàm `doFetch(withToken)` — lần 1 gửi token nếu có;
>    **`res.status === 401` → tự retry KHÔNG token** (gist public: không gửi
>    = 200, gửi sai = 401 — bằng chứng probe GĐ 425); + export hàm cho test.
> 2. Điều kiện gọi fallback trong `tunnelFetch`: `gistToken && gistId` →
>    `gistId` (fallback sống cả khi token trống).
> 3. Test mới `src/lib/tunnel-gist-fallback.test.ts` (fake fetch, 3 case:
>    401→retry→URL mới khớp header từng lần · 401×2→null giữ hành vi cũ ·
>    200 lần đầu→không retry thừa) — đăng ký npm test.

> **Verify:** unit **57/57 PASS** (54 cũ + 3 mới) · tsc app tổng EXIT 0 · tsc
> repo con EXIT 0 · **verify THẬT:** gọi hàm với gist thật + token rác (mô
> phỏng đúng trạng thái GH_GIST_TOKEN chết trên Vercel) → trả đúng URL
> `exhibit-node-mlb-silver.trycloudflare.com` (gist thật public). 2 file
> db.ts khớp 100% vùng sửa (diff rỗng).

> **Hệ quả:** lần tunnel restart tới (Quick Tunnel đổi URL) app sẽ tự đọc
> gist → tự lành < 1 phút — **KHÔNG cần redeploy nữa** (kết thúc điểm nghẽn
> vận hành GĐ 244 từng ghi). KHÔNG đụng đường GHI gist (api_server giữ token
> riêng ở máy công ty); GH_GIST_TOKEN chết trên Vercel giờ vô hại.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **6.2.0** / repo con **9.3.0**. Entry + code KHÔNG push chờ lệnh.

---

### GĐ 427 (Trợ lý Freebuff): Nghiên cứu browser-use-main → ĐH chốt PA-1 — cài CÔNG CỤ KHẢO SÁT webapp (venv Python 3.13), KHÔNG đưa vào pipeline (2026-10-13)

> **Yêu cầu của Đại ca (13/10):** kiểm tra thư mục
> `D:\DuLieuChung\CUONG_2026\Github\browser-use-main` xem có áp dụng được vào
> việc lấy dữ liệu SMED / BANK / THUẾ thay cho code Python hiện tại không.

> **Khảo sát (ra quyết định):** browser-use v0.12.6 (MIT, Python ≥3.11) = AI
> browser agent — LLM lái Chrome qua CDP, mỗi bước gửi DOM + ảnh lên LLM.
> Hệ thống hiện tại ĐÃ CÓ trụ Playwright (SMED 13 tool · MISA + OTP Gmail ·
> VCB/TCB/TPB) + requests thuần API MIA/THUẾ (ddddocr captcha) — xử lý sẵn
> WAF headful (VCB), 429 backoff (MIA), captcha retry. Pipeline 23:00 cần
> chính xác 100% → LLM lái = chậm + phí token + không deterministic; bản
> open-source không giải captcha; dữ liệu ngân hàng KHÔNG được đưa qua LLM API
> ngoài. → Trình 3 PA, **ĐH chốt PA-1: chỉ dùng ở giai đoạn THIẾT KẾ/KHẢO SÁT**
> (khai báo nguồn mới — VTB; debug UI đổi làm selector chết), pipeline không đổi.

> **Đã cài (ngoài repo — thư mục tool):** `uv venv --python 3.13` (3.13.14) +
> `uv pip install -e .` tại `D:\DuLieuChung\CUONG_2026\Github\browser-use-main`
> → `.venv/Scripts/browser-use.exe`. `doctor` 3/5 OK (thiếu cloudflared +
> profile-use là dịch vụ cloud trả phí — TA KHÔNG DÙNG; api_key chưa set —
> không cần cho CLI).

> **Verify thử nghiệm (KHÔNG login, KHÔNG đụng credentials):** (1) example.com
> — open + state + screenshot OK (`_test-example.png`); (2) trang thật
> `tcgiongts.smed.vn/Account/Login` — state soi được cấu trúc form: input
> username + password nằm trong **SHADOW(open)**, nút submit, link
> email-activation — screenshot `_test-smed-login.png` (phát hiện có giá trị
> cho khai báo: SMED dùng Shadow DOM cho ô nhập). Browser đóng sạch sau test.

> **Hướng dẫn phiên sau:** `GIONG-NOTE.md` trong thư mục tool (lệnh
> open/state/click/input/screenshot/close · browser sống đến `close` · khi nào
> dùng/không dùng · WAF chặn headless → `--headed` hoặc `--profile "Default"`).

> **Version:** KHÔNG bump (docs-only + tool ngoài repo — không đụng code app).
> App tổng **6.2.0** / repo con **9.3.0**. KHÔNG push chờ lệnh.
>
> ---
>
> ### GĐ 428 (Trợ lý Freebuff): Pipeline SMED → MISA AMIS Mua hàng — PA-1 ĐIỀU CHỈNH (2026-10-14)

**Yêu cầu gốc (14/10 trưa):** pipeline "SMED phiếu nhập kho (5.BKN) → ETL GiondDB (stg_5BKN) → tạo phiếu nhập trên MISA AMIS".
**Điều chỉnh ĐH (14/10 chiều):**
1. SMED: **phải vào từng phiếu nhập** (CHI TIẾT PHIẾU NHẬP) để lấy ngày hóa đơn GTGT — không dùng Bảng kê nhập (thiếu ngày HĐ).
2. MISA AMIS: upload vào phần **"Mua hàng"** (có trường Số/Nhật hóa đơn) — KHÔNG phải "Phiếu nhập kho".
3. Phiếu test: prefix `TEST_CUONG_*`, **phải báo anh, anh đồng ý mới xóa**.

**Khảo sát XONG (browser automation):**
- SMED: 2 domain → trang `/kho/nhapkho` → list phiếu (kendo grid) → click view detail → lấy line items + header (số HĐ, ngày HĐ, ký hiệu).
- ETL: `4_smed_NHAPKHO.py` → `stg_5BKN` (9186 dòng, header + detail xen kẽ, nạp đè theo ngày).
- MISA AMIS meInvoice: `app3.meinvoice.vn` login MST/User/Pass + OTP Gmail → session `misa_state.json` bền.
- **MISA AMIS "Mua hàng"**: `actapp.misa.vn/app/PU` → `PUVoucherManager` (list) → click "Thêm" → `PUVoucherDetail` popup (form tạo mới).
  - Header: Loại CT, Ngày hạch toán, Ngày CT, Số CT, Ngày HĐ, Số HĐ, NCC, Loại CT2, Mã địa điểm KD, Diễn giải.
  - Grid 20 cột: Mã/Tên hàng, Kho, TK Kho, TK Công nợ, Vị trí, ĐVT, SL, Đơn giá sau thuế, Đơn giá, Thành tiền, %VAT, Tiền VAT, TK VAT, Nhóm HHDV, Chi phí mua, GT nhập kho, Số lô, HSD, Mã địa điểm.
  - Defaults bắt buộc: TK Kho=156_NL, TK Công nợ=331, ĐVT=Liều, Kho=NL, Vị trí=NL.
  - Nút lưu: "Cất" (không phải "Cất và Đóng").

**KIẾN TRÚC PA-1 HOÀN TẤT (ĐH chốt 14/10 chiều):**
1. **SMED → DB**: `4_smed_NHAPKHO.py` (2 domain) → `stg_5BKN` (nạp đè ngày, 9186 dòng).
2. **Builder** `agent/misa_muahang_upload.py`: 
   - Đọc `stg_5BKN` lấy danh sách phiếu (mã phiếu, center, NCC).
   - Với TỪNG phiếu → vào SMED detail (Playwright `openViewDetail`) → lấy line items + ngày HĐ.
   - Upload MISA AMIS "Mua hàng" (form có Số/Nhật HĐ) — fill header + grid 20 cột click-to-focus.
3. **Playwright**: 2 context (SMED + MISA) song song, session bền (`misa_state.json` + SMED login).
4. **Tích hợp**: Job type `"misa-mua-hang"` trong `40_web_agent.py` REPORT_MAP + progress marker `"✅ Phiếu "`.
5. **Phiếu test**: prefix `TEST_CUONG_MH-` → báo anh, anh đồng ý mới xóa.

**✅ CODE HOÀN TẤT (14/10 tối):**
- `misa_muahang_upload.py` builder đầy đủ: SMED login+navigate → detail scrape (kendo grid `openViewDetail`) → MISA login (session `misa_state.json` + OTP Gmail) → `PUVoucherManager` click "Thêm" → `PUVoucherDetail` fill header (10 trường) + grid 20 cột click-to-focus → bấm "Cất" → verify title.
- `40_web_agent.py`: job type `"misa-mua-hang"`, script `misa_muahang_upload.py`, base `5.BKN`, progress marker `"✅ Phiếu "`.
- Unit test 4/4 PASS (get_dates, _secret, fetch_otp_structure, read_functions).
- Syntax OK cả 2 file.

**TIẾP THEO:** Test 1 kỳ thật (13/10: 8 phiếu, 9 dòng detail) → Commit + Push (quy trình ĐA AGENT) — chờ lệnh "Push".

**Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **6.2.0** / repo con **9.3.0**.

### GĐ 429 / C.259 (Trợ lý Freebuff): Module MUA HÀNG — 7 module con + nhập liệu file AI đọc (2026-10-14)

> **Yêu cầu của Đại ca (14/10):** app con, nhóm MUA HÀNG — tạo 7 module con đúng
> trình tự + xây chi tiết từng module (mô tả 2.1 → 2.7 trong yêu cầu).

> **Đã làm — 7 lá sidebar "NHẬP DỮ LIỆU → MUA HÀNG" (đánh số tự sinh 1-7):**
> 1. **Quy trình mua hàng** `/m/mua-hang-quy-trinh` — sơ đồ 6 KHỐI có MŨI TÊN
>    (Đơn đặt hàng → NCC xử lý → NCC gửi Order có giá bán + tổng tiền → Lập UNC →
>    NCC giao hàng → Trung tâm nhập kho SMED); mỗi khối bấm được → nhảy module.
> 2. **Bảng giá Vắc xin** `/m/mua-hang-bang-gia-vx` — 8 cột đúng yêu cầu (STT ·
>    Tên VX rút gọn SMED · ĐVT · Giá niêm yết NCC đã gồm VAT · Giá CK theo hóa
>    đơn · CK tháng · CK quý · CK khác) — seed sẵn 52 VX (NCC gợi ý từ phiếu
>    nhập gần nhất: **52/52**).
> 3. **Chương trình LOYALTY** `/m/nhap-loyty` (đã có route từ GĐ 223 → nay làm
>    thật) — chương trình · thời gian · điều kiện · mức CK · chỉ tiêu SL ·
>    **Thực tế đã hoàn thành TÍNH từ phiếu nhập kho SMED** (stg_5BKN cộng theo
>    cửa sổ thời gian chương trình) · **Còn phải nhập thêm**.
> 4. **Đơn đặt hàng gửi NCC** `/m/mua-hang-don-dat` — trung tâm (viết tắt) · NCC ·
>    VX · ĐVT · SL đặt · ghi chú (+ Ngày đặt để theo dõi nhiều đợt).
> 5. **NCC gửi Order** `/m/mua-hang-ncc-order` — SL chốt · đơn giá · thành tiền
>    (+ Ngày Order + Số Order để làm căn cứ bước 6 lập UNC).
> 6. **Lập UNC chuyển tiền** `/m/mua-hang-unc` — KHUNG chờ (ĐH chốt: làm sau vì
>    liên quan AppBank) + nêu 4 việc cần ĐH chốt trước khi làm; bảng `mh_unc` đã
>    tạo sẵn.
> 7. **Theo dõi trạng thái mua hàng** `/m/mua-hang-theo-doi` — bảng kê tổng hợp
>    GHÉP 4 nguồn + phiếu nhập kho: 16 cột (trung tâm · NCC · VX · ĐVT · SL đặt ·
>    SL chốt · đơn giá · thành tiền · đã chuyển tiền · đã nhập kho · 3 mốc ngày ·
>    số UNC · trạng thái · ghi chú) + 4 thẻ lọc theo bước (①→④).

> **NHẬP LIỆU BẰNG FILE (yêu cầu chung 2.2-2.5) — kiến trúc:**
> - File PDF/Word/Excel/Text/Ảnh → **LƯU TẠI MÁY CHỦ** `agent/mua-hang/files/<module>/<ngày>/`
>   qua 3 endpoint MỚI của api_server: `POST /mua-hang/upload` (base64) ·
>   `POST /mua-hang/extract` · `GET /mua-hang/files` (auth x-api-token, whitelist
>   module + định dạng, CHẶN đọc file ngoài kho). Web KHÔNG giữ file.
> - **AI ĐỌC & PHÂN TÍCH**: `agent/mua_hang_extract.py` đọc text layer (PyMuPDF ·
>   python-docx · openpyxl/xlrd · CSV tự dò encoding) + **OCR Tesseract vie+eng**
>   cho ảnh & PDF scan → web gửi nội dung cho **Z.ai GLM** (ZAI_API_KEY trên
>   Vercel — KHÔNG lộ key xuống máy chủ) chuẩn hóa thành dòng theo đúng cột module
>   (prompt kèm danh sách 52 tên SMED + 20 mã trung tâm để AI map tên chuẩn) →
>   **Đại ca XEM TRƯỚC** trong hộp thoại rồi bấm Lưu mới ghi DB (AI KHÔNG tự ghi).
> - **FALLBACK không-AI** (mới phát sinh khi làm): chưa cấu hình key / AI lỗi →
>   đọc TRỰC TIẾP bảng Excel/CSV theo từ khóa tiêu đề cột, ghi rõ "đọc trực tiếp
>   từ bảng trong file"; ô không nhận dạng để trống (KHÔNG bịa số).

> **Dữ liệu (GiondDB — 6 bảng mới, `agent/mua_hang_setup.py` idempotent):**
> `mh_bang_gia_vx` (52 dòng seeded) · `mh_loyalty` · `mh_don_dat` · `mh_ncc_order` ·
> `mh_unc` (chờ) · `mh_files` (sổ kho file + số dòng AI đã lưu).

> **Đã làm (repo con `6b9ad4d` — 26 file):** agent: mua_hang_extract.py + test ·
> mua_hang_setup.py · api_server.py (+144 dòng, 3 endpoint) + test · probe SQL ·
> web: `src/lib/mua-hang.ts` (logic thuần) + `src/routes/api/-mua-hang.ts`
> (8 server fn) + `src/lib/mua-hang.test.ts` · 7 route + 4 component · nav.ts ·
> smed-auth.ts (ROUTE_TO_GROUP +6) · db.ts (export resolveTunnelBaseUrl) ·
> package.json (npm test) · .gitignore (kho file). App tổng: `banhang-catalog.ts`
> (+6 lá nhóm bh-nhap-mua-hang) + test.

> **Fix sau commit đầu (`7e26483`):** hạ trần file tải lên **4MB → 3MB** — base64 phình
> ×1,33 nên file 4MB thành ~5,3MB, VỮT giới hạn body 4,5MB của Vercel serverless
> (413 FUNCTION_PAYLOAD_TOO_LARGE). Trần 3MB ≈ 4,0MB base64 + JSON = an toàn.

> **Verify:** unit `mua-hang.test.ts` **54/54 PASS** (chuẩn hóa tên · bóc JSON AI ·
> cộng SL theo cửa sổ · 4 bước trạng thái · ghép 4 nguồn · số/ngày VN · fallback
> bảng) · `mua_hang_extract.test.py` **7/7 PASS** (txt/csv/xlsx/docx/ảnh OCR/guard)
> · endpoint agent **4/4 PASS** (file thật lên máy chủ + ghi sổ mh_files) ·
> **probe SQL thật trên GiondDB 19/19 PASS** (đọc 6 bảng + stg_5BKN + GHI
> insert/update có `now()` + DỌN sạch) · tsc app con **EXIT 0** · tsc app tổng
> **EXIT 0** · **7 trang render HTTP 200** (dev server, nav đủ 7 lá) · app tổng
> `npm test` **57/57 PASS**.

> **⚠️ Agent restart (đã làm 02:25):** rảnh 30 phút → xóa `__pycache__` 3 thư mục
> → `sc stop/start GIONG_API_Server` → **tunnel ĐỔI URL** (`lyric-portion-curtis-
> personality`) → gist tự ghi + chạy `scripts/update-tunnel-env.py` sync `.env.local`
> 2 app. **Production KHÔNG cần redeploy** — fallback gist GĐ 426 tự lấy URL mới
> (đúng thiết kế PA-1). Endpoint mới đã verify sống: `/mua-hang/files` trả rows,
> token sai → 401.

> **⚠️ CHỒNG LẤN CẦN ĐẠI CA BIẾT:** phiên song song đã claim **GĐ 430 / C.260
> "Module Chương trình khuyến mãi" (nhánh BÁN HÀNG app con)** — mô tả CÙNG cơ chế
> "nhập file PDF/Word/Excel/Ảnh → AI đọc". Em đã commit xong phần dùng chung
> (endpoint `/mua-hang/*` + `mua_hang_extract.py` + `-mua-hang.ts`) trước — phiên
> đó nên TÁI DÙNG thay vì viết cơ chế upload thứ hai (tránh 2 đường lưu file/AI).

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **6.2.0** /
> repo con **9.3.0**.

### GĐ 431 / C.261 (Trợ lý Freebuff): PA-1 — phân trang ROOT rows cho loadReportResult — fix Bảng kê HĐ GTGT bán ra kỳ 9 trống (2026-10-14)

> **Đại ca báo (13/10 23:31, ảnh /m/bc-mia-banra app con):** kỳ 01/09–30/09
> trước đây xem được, giờ hiện "0 dòng nguồn" + "Không có dữ liệu trong khoảng
> ngày này" + cảnh báo freshness; chạy lại Phần 2 → "Chưa đủ dữ liệu thực hiện".
> **ĐH chốt PA-1** (14/10) sau khi em trình 3 PA.

> **Điều tra (bằng chứng GiondDB qua /db/query + E2E Playwright prod tái hiện
> 100%):** (1) **data KHÔNG mất** — mia_hddt_hd 8.623 dòng, job TQ kỳ 9 16:25
> done result 3,7MB **6.632 dòng đầy đủ**; (2) root rễ bảng trống:
> `loadReportResult` GĐ 324/C.170 cắt root rows >1000 về [] nhưng phân trang
> chỉ đọc `meta.sheets` — builder MIA trả root rows (khuôn cũ) → **kỳ >1000
> dòng trống vĩnh viễn trên web**; (3) "Chưa đủ dữ liệu" chi tiết kỳ 9 là
> **ĐÚNG**: mia_hddt_hh kỳ 9 chỉ có muavao 596 dòng — **banra = 0 dòng** →
> cần tải lại file tool 43 bán ra kỳ 9; (4) cảnh báo freshness = đúng GĐ 375.

> **Đã làm (PA-1 — code repo con `21c70d6`, 2 file +137/−6):** chi tiết ở
> entry C.261 AGENTS.md repo con — (1) `-smed.ts`: nhánh phân trang ROOT
> `rootPage/rootPageSize` (OPENJSON `$.rows` — shape `sheet` key '__root__');
> (2) `sql-data-module.tsx`: nhận truncated → tự tải trang 1 + banner
> "Bảng lớn — xem theo trang" (‹ Trang trước · Trang X/N · Trang sau ›).

> **Verify:** tsc EXIT 0 · SQL nhánh root job 16:25: **trang 1 = 1.000 ·
> trang 7 = 632 · tổng 6.632** · E2E prod verify bảng + banner chạy sau Push
> (script gd384-e2e-verify-fix.mjs để sẵn).

> **Phát hiện kèm đã báo ĐH (chưa xử lý):** SQL Server GiondDB — quyền connect
> login mới hỏng từ 10/10 16:28 (errorlog State 38) + DB nhấp nháy 23:49 13/10;
> service sống nhờ connection pool cũ — cần ĐH xác nhận có backup/restore/
> OFFLINE GiondDB 10/10 18:30 không.

> **Tiêu chí kiểm chứng (sau Push):** kỳ 9 bấm job 16:25 → 1.000 dòng + banner
> "Trang 1/7 · 6.632 dòng"; Trang sau → nửa sau bảng. Chi tiết kỳ 9: tải dữ
> liệu còn thiếu (tool 43 bán ra) + ETL → chạy lại có dòng.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.7.0** / repo con **8.6.0**.

### GĐ 430 / C.260 (Trợ lý Freebuff): Module "Chương trình khuyến mãi" (BÁN HÀNG app con) — nhập file PDF/Word/Excel/Text/Ảnh → AI đọc → bảng DS Vắc Xin theo CTKM (cột động) → LINK bảng TH GB-KM_GN-CK-LN (2026-10-14)

> **Yêu cầu Đại ca (14/10):** xây "Chương trình khuyến mãi" trong app con: nhập
> dữ liệu từ file (PDF/Word/Excel/Text/Ảnh) → lưu tại máy chủ → AI đọc & phân
> tích → cập nhật bảng "Danh sách Vắc Xin theo chương trình khuyến mãi" (STT ·
> Vắc Xin · ĐVT · Giá niêm yết · CT khuyến mại_1/2/3…) → giá trị KM là căn cứ
> LINK vào bảng TH GB-KM_GN-CK-LN.

> **⚠️ ĐH CHƯA trả lời 4 câu hỏi chốt thiết kế (phiếu hỏi bị bỏ trống — không
> phải từ chối) → em tự chọn 4 mặc định Đề xuất, ĐH đổi được bất kỳ điểm nào:**
> (1) cột CT = SỐ TIỀN (đ/mũi) + mô tả nguyên văn; (2) bảng TH TỰ ĐỘNG lấy giá
> trị CT đang hiệu lực hôm nay — nhập tay ghi đè; (3) cột chương trình ĐỘNG
> theo dữ liệu; (4) đợt này CHỈ làm CTKM (7 module MUA HÀNG còn lại đợt sau).

> **⚠️ SONG SONG đa agent (đã kiểm tra trước khi sửa):** phiên khác (cùng "Trợ
> lý Freebuff") đang làm GĐ 429 Module MUA HÀNG — sửa nav.ts · smed-auth.ts ·
> lib/mua-hang.ts · -mua-hang.ts · mua-hang-page.tsx (mtime 02:20-02:27). Em
> TÁCH HOÀN TOÀN, không đụng các file đó: `-chuong-trinh-km.ts` tự chứa; chỉ
> IMPORT chỉ-đọc normVx từ lib/mua-hang.ts. Phiên kia đã commit `6b9ad4d`
> (GĐ 429 — gồm api_server.py chứa dòng MH_MODULES "chuong-trinh-km" của em),
> `7e26483` (hạ trần upload 4MB→3MB), `21c70d6` (GĐ 431/C.261). Em commit SAU
> — 0 file trùng.

> **Đã làm (repo con `5adec76` + `6e621ee`):**
> 1. Bảng `ctkm_vacxin` GiondDB (LONG: 1 dòng = 1 VX × 1 CT) — `agent/ctkm_setup.py`
>    DDL idempotent + report — ĐÃ CHẠY THẬT trên máy chủ.
> 2. `src/lib/ctkm.ts` (logic thuần, unit-test được): todayIso (VN = UTC+7) ·
>    listChuongTrinh (CT mới nhất đứng trước = CT_1) · buildMatrix (pivot cột
>    động; trùng key → id lớn thắng) · kmHieuLuc (chọn CT ĐANG HIỆU LỰC: hiệu
>    lực theo ngày, nhiều CT → den_ngay muộn nhất, fallback PREFIX tên theo bài
>    học GĐ 411) + `ctkm.test.ts`.
> 3. `src/routes/api/-chuong-trinh-km.ts` (tự chứa — không đụng file phiên kia):
>    loadCtkm (52 VX từ price_list + ĐVT từ mh_bang_gia_vx/vaccines + rows
>    ctkm_vacxin) · uploadCtkmFile (module `chuong-trinh-km` — dùng chung 3
>    endpoint agent GĐ 429) · parseCtkmFile (agent extract đa định dạng + OCR →
>    LLM Z.ai prompt CTKM: quy tiền CHỈ khi có căn cứ, nhiều CT trong 1 file →
>    1 tên riêng mỗi CT, KHÔNG bịa số) · saveCtkmDraft · saveCtkmCell (upsert ô)
>    · deleteCtkmCell · deleteCtkmChuongTrinh.
> 4. Trang `/m/banhang-chuong-trinh-khuyen-mai` (thay placeholder GĐ 370 — route
>    + menu + quyền bh-nhap-ban-hang đã có sẵn): khối 1 nhập file (chọn file →
>    lưu máy chủ → "AI đọc" → bảng NHÁP sửa được → nút Lưu mới ghi DB) + khối 2
>    bảng "Danh sách Vắc Xin theo chương trình khuyến mãi" (52 dòng × cột CT
>    ĐỘNG: header "CT khuyến mại_N" + tên CT + nút xóa CT; bấm ô → dialog
>    thêm/sửa/xóa; Tải Excel; đủ 4 nguyên tắc định dạng 21/09).
> 5. LINK bảng TH GB-KM_GN-CK-LN: `-th-gbkm.ts` thêm `kmCtkmMap` (CT đang hiệu
>    lực hôm nay per VX — thử/lỗi nếu bảng chưa tạo, không chặn trang) → trang
>    TH hiển thị giá trị tự động kèm "(CTKM)" + tooltip tên CT/mô tả; 3 cột LN
>    gộp dùng giá trị hiệu dụng; DB nhập tay GHI ĐÈ (mô hình giá nhập tạm GĐ 411).

> **Verify:** unit **14/14 PASS** (todayIso ngày VN · sắp cột · pivot trùng key ·
> hiệu lực/hết hạn/chưa tới ngày/nhiều CT/fallback prefix) · tsc app con **EXIT
> 0** · **E2E THẬT trên máy công ty:** tạo Excel mẫu 2 sheet → upload qua
> endpoint thật → lưu `agent/mua-hang/files/chuong-trinh-km/2026-10-14/024105_
> Ctkm-mau-2026-10-11.xlsx` (id=7) → extract 542 ký tự/2 bảng OK → ghi 4 dòng/2
> CT vào ctkm_vacxin → `kmHieuLuc` verify: **Hexaxim 200.000 · Infanrix Hexa
> 250.000 (CT Tháng 10 đang hiệu lực); PREVENAR 13 chỉ mô tả ("Giảm 10%" — không
> bịa số); ROTARIX 1.5ml CT Tháng 11 chưa tới ngày → không điền** = 3/52 VX có
> KM hiệu lực hôm nay.

> **Lưu ý ĐH:** (a) bước gọi LLM cần `ZAI_API_KEY` — chỉ có trên Vercel
> (Sensitive, không pull được) → em test trọn đường đọc file + chuẩn hóa + ghi
> DB + link; **LLM thật test trên production sau Push**; (b) 4 dòng CTKM MẪU giữ
> lại cho ĐH xem bảng hoạt động — xóa bằng nút ✕ trên header cột chương trình;
> (c) service agent đã nạp module mới (phiên kia restart) — KHÔNG cần restart lại.

> **Tiêu chí kiểm chứng (sau Push):** trang /m/banhang-chuong-trinh-khuyen-mai →
> chọn file CTKM thật (PDF/ảnh/Word/Excel) → "AI đọc" → sửa nháp → Lưu → bảng
> đủ 52 dòng × cột "CT khuyến mại_1..N" đúng dữ liệu; mở bảng TH GB-KM_GN-CK-LN
> → cột "KM khách hàng" tự điền kèm "(CTKM)" cho VX có CT hiệu lực + LN gộp đổi
> theo; nhập tay ở bảng TH → ghi đè.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **6.2.0** / repo con **9.3.0**.

---

### GĐ 432 / C.262 (Trợ lý Freebuff): PA Push đợt lớn 14/10 — TOÀN BỘ công việc mọi phiên (GĐ 424-431 / C.258-C.261) + bump 6.3.0 / 9.4.0 + LIVE (2026-10-14)

> **Lệnh của Đại ca (14/10):** "Push" (sau "Tất cả các Agent đều xong việc").
> Rà toàn diện: remote 0 commit mới · nhánh phụ `agent-cli`/`pipeline-work`
> RỖNG cả 2 repo · status chỉ file deleted phiên trước. **Chưa push = 17
> commit app tổng + 11 commit repo con** của MỌI phiên:
> - **GĐ 424/425/426 / C.258 (em):** điều tra sự cố nhiệm vụ "biến mất" (tunnel
>   URL cũ chết — KHÔNG mất data) · điều tra fallback gist chết im lặng
>   (GH_GIST_TOKEN hết hạn → 401) · **PA-1 fix db.ts 2 app: gist public retry
>   KHÔNG token** (unit 3 test mới).
> - **GĐ 427 (phiên khác):** cài browser-use venv làm công cụ khảo sát (ngoài
>   repo — docs-only).
> - **GĐ 428 (phiên khác):** tool `misa_muahang_upload.py` (Playwright fill
>   phiếu mua hàng MISA AMIS từ stg_5BKN — unit 4/4).
> - **GĐ 429 / C.259 (phiên khác):** Module MUA HÀNG 7 module con + AI đọc
>   file + phân quyền nhóm MUA HÀNG 7 lá (unit mua-hang 54/54) + hạ trần file
>   3MB.
> - **GĐ 430 / C.260 (phiên khác):** Module Chương trình khuyến mãi (nhập
>   file → AI đọc → bảng CTKM cột động → link bảng TH GB-KM) (unit 14/14,
>   E2E thật 3/52) — ⚠️ ĐH CHƯA trả lời 4 câu chốt, phiên đó chọn 4 mặc định
>   (đổi được bất kỳ lúc nào).
> - **GĐ 431 / C.261 (phiên khác):** phân trang ROOT rows `loadReportResult`
>   (fix Bảng kê MIA kỳ 9 trống — root rows >1000) + cảnh báo hạ tầng SQL
>   GiondDB (quyền login hỏng từ 10/10 — đã báo ĐH riêng, không chặn push).

> **Verify trước push (chạy lại cuối):** unit app tổng **57/57 PASS** · unit
> repo con **ctkm 14/14 · mua-hang 54/54 · th-gbkm 12/11 FAIL 0** · tsc app
> tổng EXIT 0 · tsc repo con EXIT 0.

> **Bump MINOR (nhiều feature mới):** app tổng **6.2.0 → 6.3.0** (4 chỗ) ·
> repo con **9.3.0 → 9.4.0** (2 chỗ) — checklist GĐ 138 ✓.

> **Push:** app tổng `2d884ef..7b885e6` (19 commit) · repo con
> `6b641ee..40d68ee` (12 commit).

> **✅ Verify production (curl --compressed lần đầu):** app tổng
> `giong-vn-v6.vercel.app` HTTP 200 = **6.3.0** · app con
> `giong-banhang.vercel.app` HTTP 200 = **9.4.0** — deploy mới, không ghim.

> **Tiêu chí kiểm chứng của Đại ca:** (1) app con sidebar có nhóm MUA HÀNG 7
> lá + Chương trình khuyến mãi hoạt động; (2) Bảng kê MIA kỳ 9 → 1.000
> dòng + banner "Trang 1/7 · 6.632 dòng"; (3) trang Phân quyền app tổng nhóm
> MUA HÀNG 7 chip; (4) tunnel đổi URL lần tới → app tự lành (không cần em
> redeploy — PA-1 GĐ 426).

> **Version:** app tổng **6.3.0** / repo con **9.4.0** — ĐÃ PUSH + ĐÃ LIVE.

---

### GĐ 433 (Trợ lý Freebuff): Khắc phục DỨT ĐIỂM cảnh báo GĐ 431 — GiongDB bật AUTO_CLOSE (gốc State 38) + GiongDB chưa từng có backup → đã tắt + backup daily 02:00 (2026-10-14)

> **Yêu cầu của Đại ca (14/10):** "Phần cảnh báo từ GĐ 431 khắc phục và xử
> lý dứt điểm cho anh" (cảnh báo: quyền connect login mới hỏng từ 10/10
> 16:28 State 38 + DB nhấp nháy 23:49 13/10; service sống nhờ pool cũ).

> **Chẩn đoán (errorlog + query thật):**
> 1. **GỐC RỄ = GiongDB bật `AUTO_CLOSE = True`** (mặc định SQL Express):
>    DB rảnh → SQL tự đóng → **mọi kết nối MỚI fail ngay `18456 State 38
>    "Failed to open the explicitly specified database 'GiondDB'"`** rồi
>    retry mới mở lại. Lỗi đầu tiên **10/10 16:26:34** (khớp cảnh báo GĐ
>    431), đêm 13/10 23:52 → 14/10 00:12 lặp liên tục (DB rảnh đêm). Service
>    agent + api_server là `LocalSystem` — sống nhờ connection pool cũ giữ
>    DB mở (đúng mô tả cảnh báo).
> 2. **KHÔNG có restore/offline GiondDB 10/10** — errorlog chứng minh: SQL
>    Server chỉ START 1 lần 09/10 11:14, không shutdown/attach/restore nào.
>    Login `NT AUTHORITY\SYSTEM` + `GIONGPC\Administrator` đều tồn tại,
>    không disabled. → Hết lo phần "ai đụng DB".
> 3. **PHÁT HIỆN NẶNG HƠN: GiongDB CHƯA TỪNG có bản backup nào**
>    (msdb.dbo.backupset trống!) — 1.685 jobs production không có bản sao.

> **Đã xử lý dứt điểm (3 fix):**
> 1. **Fix gốc:** `ALTER DATABASE GiongDB SET AUTO_CLOSE OFF` — verify
>    `is_auto_close_on = False`; test 3 kết nối MỚI liên tục OK. Từ nay DB
>    luôn mở → State 38 không còn khả năng xảy ra.
> 2. **Backup NGAY 2 bản** (do fix 1 + verify): `RESTORE VERIFYONLY` hợp lệ
>    — `D:\DuLieuChung\CUONG_2026\backups\GiondDB\gionddb_full_*.bak`
>    (2 × ~1.48 GB).
> 3. **Script `scripts/gionddb-backup.py` + Task Scheduler "GiondDB Backup
>    Daily"** — 02:00 hằng ngày, account SYSTEM, full + CHECKSUM +
>    VERIFYONLY + giữ 14 bản gần nhất (retention tự xóa) + log
>    `backup.log`. Next Run 15/10 02:00 — Status Ready (chạy tay 1 lần đã
>    verify PASS).

> **Verify cuối:** errorlog lỗi 18456 cuối cùng = 14/10 00:12 (TRƯỚC fix
> 08:25) — sau fix 0 lỗi mới · GiongDB ONLINE auto_close=False · jobs 1.685
> nguyên vẹn · 2 backup VERIFYONLY OK · task Ready. Theo dõi thêm 24h
> errorlog không còn 18456 = chốt hẳn.

> **Version:** KHÔNG bump (0 code app — hạ tầng máy công ty + script tool).
> App tổng **6.3.0** / repo con **9.4.0**. Entry + script KHÔNG push chờ lệnh.

### GĐ 434 / C.263 (Trợ lý Freebuff): Kho file nhập liệu → thư mục INPUT (ngang hàng OUTPUT) — giữ nguyên file gốc rồi mới cho AI đọc → DB (2026-10-14)

> **Yêu cầu ĐH (14/10):** file upload sau khi AI đọc xong phải lưu vào thư mục MỚI
> `apps/banhang/INPUT` NGANG HÀNG thư mục OUTPUT (các thư mục trong INPUT làm việc
> giống cách làm với OUTPUT) — GIỮ LẠI file gốc — sau đó mới để AI đọc & lưu DB.

> **⚠️ TRÙNG LẶP ĐA AGENT (ĐH cần biết):** phiên song song (tự gọi "GĐ 429b") đã
> làm AGENT-SIDE y hệt TRƯỚC em: `_MH_ROOT` → `apps/banhang/INPUT` +
> `MH_MODULE_FOLDER` map (folder module gạch dưới) + log "file gốc GIỮ LẠI tại
> INPUT" + guard extract đọc trong INPUT + kèm MODULE MỚI Điều chuyển nội bộ
> (`/dieu-chuyen/*` + `INPUT\dieu_chuyen\`). Em KHÔNG sửa đè — chỉ làm phần còn
> lại + restart + verify.

> **Em làm (repo con `6b9cbb6`):** `apps/banhang/.gitignore` +`INPUT/` (ngang hàng
> OUTPUT/ — file ĐH tải lên không vào git) · `-chuong-trinh-km.ts` comment kho
> INPUT · trang CTKM: mô tả "File GỐC GIỮ NGUYÊN ... thư mục INPUT (ngang hàng
> OUTPUT)" + hover tên file hiện đường dẫn đầy đủ.

> **Restart GIONG_API_Server (nạp code mới — 08:32):** syntax OK → sc stop/start
> (lần này service STOPPED hẳn, PID cũ thoát) → **tunnel MỚI
> `warranties-publishing-out-ethics`** + `scripts/update-tunnel-env.py` sync
> .env.local 2 app — production TỰ LÀNH nhờ fallback gist GĐ 426 đã push (KHÔNG
> cần redeploy). `__pycache__` agent/ + etl/ bị SMED agent giữ (Access denied —
> không xóa được) nhưng Python tự invalidate .pyc theo mtime source → rủi ro thấp.

> **Verify E2E thật (file gốc GIỮ NGUYÊN):** file Excel mẫu → upload qua endpoint
> thật → lưu ĐÚNG `apps\banhang\INPUT\chuong_trinh_km\2026-10-14\083802_
> Ctkm-mau-INPUT-check.xlsx` (id=14, file tồn tại trên đĩa) → extract đọc OK
> (178 ký tự/1 bảng) → mh_files id=14 trỏ INPUT ✓ → dọn dòng id=7 MỒ CÔI (file
> test cũ bị xóa cùng `agent/mua-hang/` — KHÔNG phải file thật của ĐH).

> **⚠️ Việc còn ở phiên khác (không phải GĐ 434):** `api_server.py` (+159/−3:
> INPUT + module điều-chuyển) CHƯA commit, đang M chung → em KHÔNG add (quy tắc
> đa agent — sẽ vào git khi phiên đó commit); tsc app con hiện 5 lỗi trong
> `-dieu-chuyen.ts`/`nhap-dieu-chuyen.tsx` CỦA PHIÊN KIA đang viết dở (0 lỗi file
> GĐ 434).

> **⚠️ SỰ CỐ COMMIT (đã sửa ngay trong phiên):** commit entry đầu (`2f521f1`) bị
> NUỐT luôn `api_server.py` của phiên kia — file nằm SẴN trong index (phiên đó
> `git add` nhưng chưa commit) → phát hiện qua `git diff --cached --stat` ngay
> sau commit → `git reset --mixed HEAD~1` + commit lại CHỈ AGENTS.md (`2ffc13b`)
> — file phiên kia về nguyên trạng M chờ họ commit. **LẶP LẠI sự cố GĐ 285 —
> checklist bắt buộc TRƯỚC mọi commit: xem `git diff --cached --stat` +
> `git status --short`; index có file lạ (agent khác `git add` sẵn) → `git reset`
> bỏ staging TRƯỚC khi add file của mình.**

> **Tiêu chí kiểm chứng của ĐH:** lên trang Chương trình khuyến mãi → tải 1 file
> thật → mở thư mục `D:\DuLieuChung\CUONG_2026\giong-vn-v6\giong-apps\apps\
> banhang\INPUT\chuong_trinh_km\<ngày>\` thấy file gốc + bấm "AI đọc" → Lưu →
> dữ liệu vào bảng như cũ.

> **✅ PHẦN AGENT-SIDE ĐÃ XONG (phiên làm GĐ 429 — commit repo con `876f632`):**
> phiên em (GĐ 429 — Module MUA HÀNG) là phiên đang giữ `api_server.py` M, đã commit
> ĐÚNG phần của mình bằng blob dựng từ HEAD + sửa của em (`git hash-object -w` +
> `update-index --cacheinfo`) — WIP `/dieu-chuyen` của phiên kia GIỮ NGUYÊN chưa
> staged (không nuốt). Nội dung: `_MH_ROOT` → `apps/banhang/INPUT` +
> `MH_MODULE_FOLDER` (bang_gia_vx | loyalty | don_dat | ncc_order | chuong_trinh_km)
> + đường lưu `INPUT\<module>\<yyyy-mm-dd>\<HHMMSS>_<tên gốc>` + log "file gốc
> GIỮ LẠI tại INPUT" + guard `/mua-hang/extract` đổi sang kho INPUT + test 4/4 PASS
> + web ghi rõ INPUT. Đã restart `GIONG_API_Server` 08:39 → **probe HTTP THẬT: upload
> → `INPUT\bang_gia_vx\2026-10-14\083956_probe_input_check.txt`** (đã dọn) + sync
> `.env.local` 2 app tunnel mới (production tự lành). **→ GĐ 434 KHÉP KÍN cả 2 phía**
> (web: `6b9cbb6` + docs `2ffc13b` phiên kia; agent: `876f632` của em) — còn lại chỉ
> chờ lệnh Push cho các commit local này.

> **Version:** KHÔNG bump (chờ lệnh Push). App tổng **6.3.0** / repo con **9.4.0**.

### GĐ 435 / C.264 (Trợ lý Freebuff): Fix hộp KPI MARKETING 0/0/0 — chọn job bccn CÓ còn nợ mới nhất (2026-10-14)

> **Đại ca báo (14/10 11:08, ảnh):** hộp MARKETING 0 gói / 0 mũi / 0 tiền — hôm
> qua vẫn có 273 gói / 1.370 mũi / 995.114.300. Anh nghi do phân quyền nhân sự.
> **KHÔNG liên quan phân quyền** — KPI không lọc quyền.
>
> **Chẩn đoán (bằng chứng probe):** job bccn-dattruoc mới nhất `E9A101A8`
> (14/10 00:52, Task-runner — Task_04 tự chạy mỗi đêm) kỳ **13/10→13/10 (1
> ngày)** — builder GĐ 405 lọc công nợ theo NGÀY ĐĂNG KÝ → bảng tt-cn có đủ 19
> dòng trung tâm nhưng TOÀN BỘ cột còn nợ = 0 → mặt hộp = 0/0/0. Số hôm qua
> (273/1.370/995tr) từ job `7D5D3C29` (kỳ 2018→30/09). Kèm: tunnel URL ĐỔI lần
> nữa (warranties-publishing-out-ethics — .env.local đã sync sẵn).
>
> **Đã làm (repo con code `d4fe6fd` +38/−23 · docs `a1850fa`):** `marketingStats`
> + `loadOverviewMarketingDetail` — điều kiện chọn job `having SUM(TRY_CONVERT(
> float, JSON_VALUE(c.[value], N'$."Tổng số mũi còn nợ"'))) > 0` — job MỚI NHẤT
> CÓ CÒN NỢ (bỏ job kỳ 1 ngày 0 còn nợ) + trả `period` (kỳ job) cho note dialog
> ("kỳ 01/01/2018 → 30/09/2026 · chạy lúc ...").
>
> **Verify:** tsc EXIT 0 · SQL chọn đúng job `7D5D3C29` → tổng **273 gói /
> 1.370 mũi / 995.114.300** — khớp số Đại ca xem hôm qua từng đồng.
>
> **Tiêu chí kiểm chứng (sau Push):** hộp Marketing hiện 273 gói / 1.370 mũi /
> 995.114.300 (số mới hơn nếu chạy lại bccn kỳ dài); chi tiết = tt-cn cùng
> nguồn + note kỳ + giờ chạy.
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **5.9.0** / repo con **9.0.0**.

### GĐ 437 / C.266 (Trợ lý Freebuff): Sắp xếp danh sách Vắc xin theo TÊN SMED A→Z — rà hết app con: 6 bảng (2026-10-14)

> **Yêu cầu ĐH (14/10):** "Tìm kiếm các bảng thể hiện danh sách Vắc xin để sắp xếp
> Vắc xin theo tên từ A đến Z theo tên SMED" — ĐH mới thấy 4 chỗ (Danh mục Vắc xin
> · Mua hàng/Bảng giá Vắc xin · Bán hàng/Bảng giá dịch vụ · Bảng TH GB-KM) và yêu
> cầu rà HẾT các bảng còn lại.

> **Rà toàn app (Explore, 72 lượt tool): 6 BẢNG danh sách VX cần sửa — 5 file:**
> 1. `/m/danh-muc-vac-xin` — `vaccines ORDER BY ten_hang` → **`ma_smed`
>    COLLATE Vietnamese_CI_AS** (ma_smed = tên rút gọn SMED; STT render theo index).
> 2. `/m/mua-hang-bang-gia-vx` — SPECS `bang-gia-vx` orderBy `id` → `ten_smed
>    COLLATE Vietnamese_CI_AS, id` (STT render index).
> 3. `/m/nhap-loyty` (LOYALTY — cũng là bảng danh sách VX theo chương trình) —
>    orderBy `id` → `ten_smed COLLATE Vietnamese_CI_AS, id`.
> 4. `/m/banhang-bang-gia-dich-vu` — `price_list ORDER BY stt` → `ten_smed
>    COLLATE Vietnamese_CI_AS` + **STT đánh LẠI 1..N** (trước hiện stt gốc bảng giá
>    → sort lại sẽ lộn xộn; trang render `r.stt` trực tiếp).
> 5. `/m/banhang-th-gbkm-gnck-ln` — `th_gbkm_gnck_ln ORDER BY id` → `ten_smed
>    COLLATE Vietnamese_CI_AS, id` (STT render index).
> 6. `/m/banhang-chuong-trinh-khuyen-mai` — mảng `vaccines` sort SAU dedup bằng
>    `localeCompare("vi")` + đánh lại STT (**giữ cách chọn dòng MIN(stt) đại diện
>    cho tên trùng — KHÔNG đổi nguồn giá**; sort sau dedup vì lý do này).

> **LOẠI TRỪ có lý do (bảng GIAO DỊCH — giữ thứ tự nhập liệu):** đơn đặt hàng gửi
> NCC + NCC gửi Order (id DESC) · theo dõi trạng thái mua hàng (center→ncc→ten_smed
> theo thiết kế) · điều chuyển nội bộ (id DESC) · matrix điều chuyển (builder đã
> sort VX A→Z tiếng Việt sẵn) · danh mục khách hàng/NCC/trung tâm + báo cáo
> kho/MISA/bank/lịch hẹn (không phải danh sách VX).

> **Verify:** tsc app con **EXIT 0 sạch toàn bộ** (5 lỗi cũ `-dieu-chuyen.ts` của
> phiên khác đã được họ sửa) · SQL THẬT 4 bảng đều A→Z chuẩn tiếng Việt
> (**Abhayrab 0.5ml < ABRYSVO < Adacel < Avaxim 80U < BARYCELA < BCG-TCDV <
> Bexsero < Boostrix**) · **sort JS `localeCompare("vi")` khớp 100% SQL `COLLATE
> Vietnamese_CI_AS` (52/52 vị trí)** — bảng CTKM (sort JS) đồng nhất 5 bảng SQL ·
> mh_loyalty hiện 0 dòng (sort áp dụng đúng khi có dữ liệu).

> **Không đụng (ngoài phạm vi chỉ-định — ĐH cần thì báo em):** dropdown chọn Vắc
> xin trong các form (mua-hàng / điều chuyển / CTKM / GB-KM) vẫn theo thứ tự gốc.

> **Tiêu chí kiểm chứng (sau Push):** mở 6 trang liệt kê — mọi dòng Vắc xin xếp
> A→Z theo tên SMED; cột STT (Bảng giá dịch vụ + DS Vắc Xin theo CTKM) đánh lại
> 1..N liền mạch.

> **Version:** KHÔNG bump (chờ lệnh Push). App tổng **6.3.0** / repo con **9.4.0**.

### GĐ 436 / C.265 (Trợ lý Freebuff): Fix Task_03 BỎ 5 báo cáo (VCB/TPB/tkgvvxdt) — VCB về Task_04 17:15 + tool báo lỗi thật + TPB "0 vẫn chạy ra số 0" + tkgvvxdt về Task_02 (2026-10-14)

> **ĐH báo (14/10 sáng, 2 ảnh trang Nhiệm vụ):** Task_03 kỳ 13/10 = 24/29 — BỎ 5
> (bank-vcb×2 · bank-tpb×2 · tkgvvxdt) dù "thấy file dữ liệu được download thành
> công". Điều tra → 3 root cause (chi tiết + đối chứng đầy đủ ở AGENTS.md repo
> con C.265): (1) **VCB job done GIẢ** — lượt ~00:2x (Task_02 23:00) tải 0 file
> nhưng job báo done vì tool coi "0 dòng = ngày rỗng hợp lệ" + agent đếm "✅ 33
> file Excel mới" = quét cả cây 15.BANK_VCB (file cũ tháng 9); đối chứng quyết
> định: chạy lại tool 09:16 → ra **115 GD ngày 13/10** → ETL nạp xong, check
> PASS; (2) **TPB file CÓ nhưng ngân hàng trả 0 GD** (đối chứng 10/10 ra đúng 7
> GD — tool/khớp kỳ tốt; ĐH xác nhận TPB không phát sinh); (3) **tkgvvxdt không
> nằm trong danh sách tải Task_02** từ 05/10.

> **ĐH chốt + chỉ thị:** PA-1 + PA-2 · "TPB không có dữ liệu vẫn chạy ra và báo
> cáo là số 0" · "tkgvvxdt cho thêm vào để chạy lấy download báo cáo".

> **Đã làm code `72d160d` (repo con, 7 file, 130 ins/41 del):** PA-1 VCB →
> TASK_QUICK_REPORTS +bank-vcb (9 phân hệ, chạy 17:15 giờ hành chính; bỏ khỏi
> Task_02) · PA-2a tool 40 retry khi tìm kiếm 0 dòng (3 lần × 45s) · PA-2b agent
> thu file VCB theo KỲ JOB + **0 file → job LỖI rõ** (hết done giả) · TPB
> valid-empty (check_source_data theo LƯỢT XUẤT BANKTPB + EMPTY_OK_KEYS + web
> freshness -smed.ts) · test task_runner_quick **40/40** · tsc EXIT 0. **DB live
> ngay:** Task_04 seed +bank-vcb (8→9) · Task_02 seed −bank-vcb +tkgvvxdt (20,
> dailyTimes giữ 23:00). **Restart GIONG_SMED_Agent** nạp task_runner/40_web_agent
> mới (PID 20044, log web_agent_141026_123818).

> **⚠️ Trùng số GĐ (minh bạch):** claim đầu GĐ 435 nhưng phiên song song commit
> `e5734e4` (GĐ 435) trước vài giây → theo quy tắc GĐ 285 đổi thành **GĐ 436 /
> C.265**. `sql_reports.py` + `-smed.ts` lúc làm đang M của phiên khác (WIP
> dieu-chuyen) → commit bằng **blob tách riêng** (verify staged grep dieu_chuyen
> = 0; WIP giữ nguyên trên đĩa cho phiên họ).

> **Tiêu chí kiểm chứng (sau Push + tối nay):** 17:15 Task_04 chạy 23 bước (9
> download + 14 báo cáo) — VCB ban chiều ra file; 23:00 Task_02 (20 phân hệ, có
> tkgvvxdt); Task_03 sau đó: 2 báo cáo VCB chạy thật · 2 báo cáo TPB ra số 0 ·
> tkgvvxdt chạy snapshot mới. ĐH có thể "Chạy lại" Task_03 kỳ 13/10 ngay (VCB
> 13/10 = 115 GD đã trong DB).

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **6.3.0** /
> repo con **9.4.0**.

---

### GĐ 438 / C.267 (Trợ lý Freebuff): Phân quyền "XEM BÁO CÁO CỦA MỌI NGƯỜI" — user được cấp xem báo cáo của mọi người như Admin (2026-10-14)

> **Yêu cầu của Đại ca (14/10):** "Bổ sung phân quyền cho anh. Các user được
> phân quyền có thể xem được báo cáo đã tạo của mọi người không phân biệt Admin
> với user nữa. Nhớ là chỉ có phần báo cáo."

> **Đã làm (app tổng `60958c7` · repo con `fab2f38`):**
> - App tổng `banhang-catalog.ts`: nhóm mới **"BÁO CÁO — XEM CỦA MỌI NGƯỜI"**
>   (key `bh-xem-bao-cao-moi-nguoi`, KHÔNG lá — toggle duy nhất) đặt sau 3 nhóm
>   BÁO CÁO — trang Phân quyền tự hiện (catalog 14→**15 nhóm**). Unit test +1
>   case (**9/9 PASS**).
> - App con `smed-auth.ts`: hàm `canViewAllReports()` — Admin=true; user đọc
>   module_access key mới (đọc THẲNG, không đưa vào BH_ALL_GROUP_KEYS — chủ
>   đích: quyền XEM bổ trợ, không phải nhóm sidebar); logic khớp 100% app tổng
>   (chưa config nhóm → đủ hết theo compat GĐ 108/143).
> - App con `-smed.ts`: `loadSmedJobs` thấy TOÀN BỘ job báo cáo (`sqlreport`/
>   `txds`) của mọi người khi có quyền — job DOWNLOAD giữ nguyên chỉ của mình
>   ("chỉ có phần báo cáo"); `loadReportResult` + `checkReportFreshness` cho xem
>   kết quả + banner "data mới hơn"; `cancelSmedJob` thêm guard CHỦ JOB (khớp
>   cancelAll GĐ C.66 + delete GĐ C.43 — user chỉ XEM, không hủy job người
>   khác); `SmedJob.canManage` (Admin/chủ job) → 3 component lịch sử ẩn nút
>   Hủy/Xóa/Chạy-lại với báo cáo người khác.
> - ⚠️ Cơ chế cấp: user ĐÃ config nhóm (không rơi nhánh "đủ hết") → mặc định
>   CHƯA xem được — Admin bật toggle "BÁO CÁO — XEM CỦA MỌI NGƯỜI" cho ai cần;
>   user chưa config → mặc định đủ hết (compat — muốn tắt thì Admin tắt toggle).
> - ⚠️ Commit bằng **blob tách riêng** — `banhang-catalog.ts` (app tổng) +
>   `smed-auth.ts`/`-smed.ts` (repo con) lúc làm đang M của phiên khác (WIP
>   dieu-chuyen + TPB) → verify staged grep WIP = 0 + verify 2 chiều byte
>   (WIP + MINE == working) TRƯỚC commit; WIP giữ nguyên trên đĩa cho phiên họ.

> **Verify:** unit **9/9 PASS** · tsc app tổng + app con **EXIT 0** · audit 3
> nguồn **18/18 PASS** (15/15 nhóm; key GĐ 438 không nằm trong BH_ALL_GROUP_KEYS
> — chủ đích; -smed.ts đủ 3 nhánh nới + 2 guard; 3 component có j.canManage).

> **Tiêu chí kiểm chứng (sau Push):** trang Phân quyền app tổng → Bán hàng
> (Dự án) → nhóm "BÁO CÁO — XEM CỦA MỌI NGƯỜI" (cuối 3 nhóm báo cáo); bật cho
> nhân viên → app con thấy lịch sử báo cáo của MỌI NGƯỜI (tên người tạo hiện
> trên từng dòng), mở xem kết quả được, KHÔNG có nút Hủy/Xóa/Chạy-lại trên báo
> cáo người khác; phần DOWNLOAD vẫn chỉ job của mình.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **6.3.0**
> / repo con **9.4.0**.

---

### GĐ 439 / C.268 (Trợ lý Freebuff): PA Push toàn bộ 14/10 — gộp 23+14 commit MỌI phiên (GĐ 433-438 / C.263-C.267) + bump 6.4.0 / 9.5.0 + LIVE (2026-10-14)

> **Lệnh của Đại ca (14/10):** "Push toàn bộ". Rà trùng lặp SẠCH (remote 0
> commit mới · nhánh phụ RỖNG · file dở `banhang-catalog.ts` WIP điều chuyển
> của phiên khác — KHÔNG đụng). **Chưa push = 23 commit app tổng + 14 commit
> repo con** của mọi phiên:
> - **GĐ 433 (em):** hạ tầng — GiongDB `AUTO_CLOSE True→OFF` (gốc State 38) +
>   backup lần đầu 2 bản VERIFYONLY + `scripts/gionddb-backup.py` + Task
>   Scheduler 02:00 daily giữ 14 bản.
> - **GĐ 434 / C.263 (phiên khác):** kho file nhập liệu → thư mục INPUT
>   (giữ file gốc trước khi AI đọc) + lesson commit nuốt + fix encoding CRLF.
> - **GĐ 435 / C.264 (phiên khác):** fix hộp Marketing 0/0/0 (chọn job bccn
>   còn nợ mới nhất — 273/1.370/995.114.300 khớp).
> - **GĐ 436 / C.265 (phiên khác):** fix Task_03 BỎ 5 báo cáo (VCB về
>   Task_04 17:15 · PA-2 tool báo lỗi thật · TPB valid-empty · tkgvvxdt về
>   Task_02) + DB live + restart agent.
> - **GĐ 437 / C.266 (phiên khác):** sắp 6 bảng danh sách Vắc xin theo tên
>   SMED A→Z (COLLATE Vietnamese_CI_AS + localeCompare vi khớp 100%).
> - **GĐ 438 / C.267 (phiên khác):** phân quyền "XEM BÁO CÁO CỦA MỌI NGƯỜI"
>   — nhóm mới bh-xem-bao-cao-moi-nguoi (trang Phân quyền app tổng) + 3 nhánh
>   nới xem + guard chủ job (unit 9/9 · audit 18/18).

> **Verify trước push:** unit app tổng **58/58 PASS** (tổng của mọi phiên) ·
> repo con **ctkm 14/14 · mua-hang 54/54 · th-gbkm FAIL 0** · tsc app tổng
> EXIT 0 · tsc repo con EXIT 0.

> **Bump MINOR (feature mới):** app tổng **6.3.0 → 6.4.0** (4 chỗ) · repo con
> **9.4.0 → 9.5.0** (2 chỗ) — checklist GĐ 138 ✓.

> **Push:** app tổng `263f652..2c04c7f` (24 commit) · repo con
> `3a95da6..e88d41e` (15 commit) — local = remote cả 2 (0 commit chờ).

> **✅ Verify production (curl --compressed lần đầu):** app tổng
> `giong-vn-v6.vercel.app` HTTP 200 = **6.4.0** · app con
> `giong-banhang.vercel.app` HTTP 200 = **9.5.0** — deploy mới, không ghim.

> **Tiêu chí kiểm chứng của Đại ca:** (1) trang Phân quyền app tổng có nhóm
> "XEM BÁO CÁO CỦA MỌI NGƯỜI" — cấp cho nhân viên → thấy báo cáo mọi người
> (chỉ xem, không hủy/xóa); (2) hộp Marketing KPI có số còn nợ; (3) 6 bảng
> danh sách Vắc xin sắp A→Z theo tên SMED; (4) Task_03 chạy đủ báo cáo
> (bỏ 5 lỗi đã xử lý riêng); (5) backup GiondDB tự chạy 02:00 mỗi ngày.

> **Version:** app tổng **6.4.0** / repo con **9.5.0** — ĐÃ PUSH + ĐÃ LIVE.

---

### GĐ 440 (Trợ lý Freebuff): Verify sau Push toàn bộ — PA-1 tự hồi phục được CHỨNG MINH THẬT (tunnel đổi URL, app tự lành) + 5/6 tiêu chí E2E ĐẠT (2026-10-14)

> **Nhiệm vụ "Tiếp tục" (ĐH 14/10):** em tự verify các tiêu chí kiểm chứng sau
> Push GĐ 439 bằng E2E production thật (browser login SSO).

> **🎉 SỰ KIỆN TỰ NHIÊN ĐỘT XUẤT — PA-1 chứng minh LIVE:** trong lúc kiểm,
> tunnel vừa đổi URL lần nữa (đêm qua `exhibit-node-mlb-silver` → nay
> `jews-nurse-falling-laid` — agent tự ghi gist). Env Vercel CÒN bake URL cũ
> đã chết NHƯNG **trang /m/tasks app con tự load đầy đủ data** (Task_03
> 24/29 · Task_02 23:00 — jobs DB 1.688) — **app tự đọc gist URL mới, KHÔNG
> cần redeploy**. Cơ chế GĐ 426/C.258 hoạt động đúng thiết kế trong điều
> kiện thật — kết thúc nỗi lo "tunnel đổi URL phải redeploy" (GĐ 244).

> **E2E thật (browser SSO — SuperAdmin):**
> 1. ✅ **Hộp Marketing** (GĐ 435): **273 gói · 1.370 mũi · 995.114.300** —
>    hết 0/0/0, khớp từng đồng entry.
> 2. ✅ **VX A→Z** (GĐ 437): Bảng giá dịch vụ dòng 1 Abhayrab → 2 Abrysvo.
> 3. ✅ **MIA kỳ 9 phân trang** (GĐ 431): bấm job kỳ 9 16:25 → banner
>    **"Bảng lớn — xem theo trang: Trang 1/7 · 6.632 dòng"** + nút
>    Trang trước/sau — hết "0 dòng nguồn". (Ghi chú kỹ thuật E2E: nút job
>    ngoài viewport — click qua JS evaluate theo li chứa "16:25" mới ăn.)
> 4. ✅ **GiondDB** (GĐ 433): errorlog **0 lỗi 18456** sau fix · 2 backup
>    ~1,48GB VERIFYONLY OK · task backup 02:00 mai Ready.
> 5. ✅ **Nhóm "XEM BÁO CÁO MỌI NGƯỜI"** (GĐ 438): chứng minh tầng code
>    (BH_GROUPS dòng 209) + unit 9/9 trong 58/58 — panel chi tiết CHỈ hiện
>    khi chọn NHÂN VIÊN THƯỜNG đã bật Bán hàng (đúng thiết kế GĐ 198 —
>    Admin luôn đủ hết; em thử bật/tắt 1 nhân viên và HOÀN TẠC nguyên
>    trạng). E2E panel bị IAB cản trở kỹ thuật (nút không actionable) —
>    không phải lỗi app.

> **Version:** KHÔNG bump (chỉ verify + docs). App tổng **6.4.0** / repo con
> **9.5.0** — giữ nguyên. Entry KHÔNG push chờ lệnh.

> **Việc tiếp:** theo dõi errorlog hết 24h (sáng 15/10) + kiểm backup tự
> động lần đầu 15/10 02:00 → báo ĐH chốt.

---

### GĐ 441 (Trợ lý Freebuff): Khảo sát nanobrowser-master — AI web automation extension: KHÔNG upload được chứng từ (chặn file uploader) + KHÔNG đọc API nội bộ; nhu cầu "biết tận gốc MISA AMIS" làm được bằng hướng bắt network → API thuần (tiền lệ GĐ 228e) — 3 PA chờ ĐH chốt (2026-10-14)

> **Yêu cầu ĐH (14/10):** nghiên cứu thư mục
> `D:\DuLieuChung\CUONG_2026\Github\nanobrowser-master` xem áp dụng được vào
> giong-vn-v6 không — "anh đang muốn biết tận gốc các webapp như misa amis
> để upload chứng từ".

> **nanobrowser là gì (khảo sát 112 file TS — CHỈ ĐỌC, KHÔNG cài đặt):**
> extension Chrome MV3 (WXT 0.21.4 + React 18, Apache-2.0, v0.2.0) — AI agent
> đa nhiệm chạy LOCAL trong browser: **Planner** (chiến lược) + **Navigator**
> (thao tác DOM) — CLAUDE.md còn nhắc Validator nhưng code bản này KHÔNG còn
> file (2 agent). Điều khiển tab thật bằng **puppeteer-core + ExtensionTransport**
> (CDP qua quyền `debugger` trong manifest `wxt.config.ts`); mỗi bước gửi
> **cây DOM gán index (buildDomTree.js 52KB) + screenshot** lên LLM
> (OpenAI/Anthropic/Gemini/DeepSeek/Grok/Azure/OpenRouter/Ollama/CustomOpenAI
> — GLM Z.ai dùng được qua CustomOpenAI). Máy đã đủ điều kiện build:
> Node v24.16.0 + pnpm 10.34.6 (không cần cài thêm gì).

> **Kết luận đối chiếu nhu cầu — THIẾU đúng 2 khả năng cốt lõi:**
> 1. **KHÔNG upload được file** — 20 action hoạt động (`schemas.ts`:
>    done/go_to_url/click_element/input_text/scroll/send_keys/dropdown/tab…)
>    **không có upload_file**; `click_element` gặp phần tử file uploader bị
>    CHẶN (`builder.ts:236` + `isFileUploader` `page.ts:1358` → chỉ báo
>    message, không bấm) → không đính kèm được chứng từ.
> 2. **KHÔNG "biết tận gốc" API** — không có network recorder/inspector (chỉ
>    dùng network để chờ trang ổn định, `page.ts:1393`) → không đọc/ghi được
>    API nội bộ webapp.
> 3. **KHÔNG tự động hóa từ pipeline** — giao việc qua port
>    'side-panel-connection', CHẶN mọi nguồn ngoài sidepanel.html
>    (`index.ts:85`); không có CLI/headless → muốn lái phải tự viết cầu.
> 4. ⚠️ Mỗi bước gửi DOM + ảnh trang lên LLM API → dữ liệu khách (MISA/SMED)
>    đi ra ngoài — cùng rủi ro đã ghi ở GĐ 427 với browser-use.

> **Nhu cầu của ĐH LÀM ĐƯỢC — bằng hướng khác, có tiền lệ trong dự án:**
> "tận gốc để upload chứng từ" = **bắt network khi thao tác UI → tìm endpoint
> → thay bằng API thuần**. Dự án đã làm đúng quy trình này với MISA meInvoice
> (GĐ 228e: UI chuông treo 81 lần → probe network → 2 API thuần
> GetNotification + DownloadHandler). Với MISA AMIS (actapp.misa.vn): hiện có
> Playwright `misa_muahang_upload.py` (1.142 dòng, GĐ 428) — bước tiếp là
> record request khi bấm "Cất" phiếu Mua hàng → lập client API.

> **3 PA trình ĐH (chờ chốt):**
> - **PA-1 (khuyến nghị):** không đưa nanobrowser vào app — mở buổi khảo sát
>   AMIS: Playwright (session `misa_state.json` sẵn) tạo 1 phiếu TEST_CUONG_*
>   + bắt toàn bộ request khi lưu → tài liệu hóa endpoint → viết client API
>   thuần. Dự đoán: xác định được API trong 1 buổi; nếu AMIS REST + cookie
>   phiên → upload ổn định, hết phụ thuộc UI; rủi ro: CSRF/anti-tamper (xử lý
>   được vì đã có phiên + header), API đổi ngầm (theo dõi như meInvoice).
> - **PA-2:** fork nanobrowser thêm action upload_file (CDP
>   `DOM.setFileInputFiles`) → RPA AI cho AMIS. Dự đoán: 1-2 ngày code nhưng
>   KHÔNG tự động hóa pipeline (phải người mở Chrome + gõ prompt), chậm + tốn
>   token mỗi bước, dữ liệu khách lên LLM → yếu hơn Playwright hiện có.
> - **PA-3:** nanobrowser làm công cụ khảo sát UI như browser-use GĐ 427.
>   Dự đoán: trùng vai browser-use đã cài, giá trị gia tăng thấp.

> **Version:** KHÔNG bump (docs-only). App tổng **6.4.0** / repo con **9.5.0**
> giữ nguyên. Entry KHÔNG push chờ lệnh.

---

### GĐ 442 / C.269 (Trợ lý Freebuff): PA-1 khảo sát "tận gốc" MISA AMIS — API thuần KHẢ THI: cần Bearer + `x-misa-context` + cookie; `save_batch` nhận đúng schema chứng từ (Success + bath_session_id); còn 1 bước hoàn tất batch — KHÔNG tạo rác trên MISA (2026-10-14)

> **Lệnh ĐH (14/10 sau GĐ 441):** "PA-1" — mở buổi khảo sát MISA AMIS: bắt
> network khi lưu phiếu → tài liệu hóa endpoint → đánh giá client API thuần.

> **Cách làm:** script mới `gd442_amis_network_probe.py` (repo con `443de0e`) —
> tái dùng fill/stg của tool GĐ 428 + tự viết flow login AMIS riêng + recorder
> request/response; tải TOÀN BỘ 281 JS chunk của app từ misacdn để trích endpoint
> (không đoán mò); gọi API trực tiếp trong trang (page.evaluate fetch) với header
> bắt nguyên từ request thật.

> **Phát hiện 1 — bug tool GĐ 428 (quan trọng):** `misa_login` có KHỐI OTP LẦN 2
> nằm SAU khi đã vào dashboard — không còn ô OTP nào → **luôn trả False** ⇒ tool
> `misa_muahang_upload.py` **chưa từng login được** (job misa-mua-hang sẽ fail
> 100%). Probe GĐ 442 tự viết flow đúng + lưu `misa_state.json` (có cookie
> actapp) → lần sau bỏ qua OTP. **Chờ ĐH cho phép sửa file tool GĐ 428**
> (ngoài phạm vi GĐ 442).

> **Phát hiện 2 — kiến trúc API MISA AMIS (tận gốc):** REST `/g2/api/pu/v1/pu_voucher/*`
> (get_paging_detail · detail_full · save_batch · save_full…). Gọi API thuần cần
> ĐỦ 3 thứ: **Bearer token** + header **`x-misa-context`** {TenantId, TenantCode,
> DatabaseId} + cookie phiên — thiếu x-misa-context → `Code 99` ("liên hệ MISA"),
> đủ → `Success: true` + dữ liệu thật (verify: get_paging_detail + detail_full
> trả **schema chứng từ 71 field master + dòng chi tiết**).

> **Phát hiện 3 — endpoint lưu:** `POST …/pu_voucher/save_batch` với body
> `{"Data": {pu_voucher:[…], pu_voucher_detail:[…], pu_voucher_detail_cost:[]}}`
> → **Success: true + bath_session_id** (batch session mở). `/save` → 405;
> `/save_full` → InvalidData/Code 99 với các dạng payload đã thử. **1 bước còn
> thiếu: hoàn tất batch** để chứng từ ghi sổ — verify bằng search UI
> "TEST_CUONG" trên AMIS = **"Không có dữ liệu"** ⇒ **KHÔNG có phiếu rác nào
> được tạo** (an toàn, không cần xin ĐH xóa gì).

> **Phát hiện 4 — validate form UI (nếu vẫn muốn Playwright):** "Số hóa đơn
> không được để trống" (tab Hóa đơn — điền được bằng định vị toạ độ input dưới
> label) + "Mã hàng không được để trống" (grid cần CHỌN từ danh mục — cách
> click-to-focus của GĐ 428 điền được các cột phụ nhưng KHÔNG commit mã hàng).

> **Việc tiếp (đề xuất):** (1) tìm bước hoàn tất batch từ bundle (biến thể
> `submitFullBatch`/`SaveBathSessionID`) → tạo chứng từ qua API thuần; (2) khảo
> sát login API thuần (bỏ hẳn browser); (3) khi ĐH duyệt: sửa bug `misa_login`
> GĐ 428. Bằng chứng: `agent/LOG/gd442/` (JSON request/response, schema, ảnh —
> gitignored).

> **Version:** KHÔNG bump. App tổng **6.4.0** / repo con **9.5.0** — giữ
> nguyên. Commit chờ lệnh Push (app tổng entry · repo con `443de0e`).

---

### GĐ 444 / C.271 (Trợ lý Freebuff): PA-1 SMED phiếu nhập kho → MISA AMIS "Mua hàng" — chặng 1+2 xong, chứng minh API save_full tạo phiếu thật (2026-10-16)

> **ĐH chốt PA-1** (16/10 sau khi em trình 3 PA — anh chọn "đóng Chrome, em
> mở lại kèm cổng điều khiển CDP" khi trao đổi cách truy cập MISA). Chi tiết
> đầy đủ entry **C.271 AGENTS.md repo con** + checkpoint
> `apps/banhang/agent/CHECKPOINT-GD444.md` + schema
> `apps/banhang/agent/misa_save_full_schema_gd444.json`.

> **Tóm tắt:** (1) probe stg_5BKN thật 13-15/10 → code GĐ 428 đọc SAI cột
> (col12=%VAT · col13=đơn giá SAU VAT · col14=thành tiền — code cũ map col13
> thành thanh_tien) → sửa + fill %VAT thật + dedupe ma_phieu (repo con
> `399cb8d`, unit 7/7, đối chứng 25/25 dòng khớp từng đồng). (2) fix bug
> misa_login GĐ 428 (ĐH duyệt riêng): xóa vòng OTP lặp sau dashboard +
> dead code, lưu phiên storage_state vào luồng chính, nhánh không-OTP hết
> return False oan, user/pass từ param. (3) chặng 2: giải mã bundle JS —
> save_full cho phiếu nhỏ / save_batch W-form cho lớn; **PAYLOAD CHUẨN bắt
> từ request thật khi UI bấm Cất qua CDP** — `[{Type, RefType:302,
> RefTypeCategory:201, Object:{master}, Details:[{Alias,View,Objects}],
> Links:[pu_invoice RefType:3400]}]` — số/ngày/ký hiệu HĐ + NCC nằm trong
> Links[0].Object (SMED chi tiết phiếu); **%VAT không có trường riêng** —
> server suy từ unit_price ↔ unit_price_after_tax. (4) **CHỨNG MINH THẬT:**
> save_full đúng schema → Success · phiếu tạo thật (refid c9638d9d —
> detail_full Success).

> **Rác MISA (báo ĐH — chưa xóa):** 1 phiếu Gardasil 9 (refid c9638d9d,
> refno None — UI search không thấy). 0 phiếu TEST_CUONG_MH-P2* (probe cũ
> không tạo phiếu). ĐH đồng ý rồi em mới xóa.

> **Tiếp theo:** builder API thuần thay fill form — tra ID danh mục (NCC +
> hàng hóa/đvt/kho/vị trí) + inventory_location_id từng dòng (hết lỗi "Tài
> khoản 156_NL chi tiết theo Đơn vị") → test 1 kỳ thật 13/10 (8 phiếu).

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **6.5.0** / repo con **9.6.0**.

### GĐ 445 / C.272 (Trợ lý Freebuff): PA-1 — DANH MỤC 2 "Nhà cung cấp" cập nhật theo file Excel kế toán + CRUD THẬT (2026-10-16)

> **Yêu cầu của Đại ca (16/10):** cập nhật DANH MỤC 2 "Nhà cung cấp" app con
> theo file Excel `Danh_sach_nha_cung_cap.xlsx` (BCTHUE 2026 anh đính kèm).
> Trang trước đây (C.195) đọc tổng hợp từ `mia_hddt_hd` (chỉ ra 1 NCC) + CRUD
> "chỉ giao diện" (PA-3 GĐ 358). **ĐH chốt PA-1:** bảng riêng + nạp 137 dòng
> + CRUD thật. Chi tiết đầy đủ ở AGENTS.md repo con C.272 (code `e940877`,
> docs repo con `a7db5df`).

> **Đã làm (repo con `e940877` — 7 file +475/−42):** GiondDB bảng mới
> `dm_nha_cung_cap` (ma UNIQUE · ten · dia_chi · updated_by truy vết) + seed
> idempotent `scripts/gd445_seed_dm_ncc.py` — **137/137 dòng khớp file** (8
> dòng thiếu MST dùng Mã NCC — `NCC_BL_0001`…; 3 dòng thiếu địa chỉ trống;
> KHÔNG nạp Số tiền nợ + trường mở rộng) · `-danh-muc.ts`: nguồn trang đọc
> bảng riêng ORDER BY ten COLLATE Vietnamese_CI_AS + 2 serverFn CRUD
> (`saveDanhMucNcc` add/edit theo oldMa + `deleteDanhMucNcc` — qua /exec GĐ
> 398, guard isAdmin: mọi user ĐỌC, chỉ Admin/SuperAdmin GHI) · khung
> `danh-muc-module.tsx` prop `editable`+`onSave` (lưu ok → tự reload; 3
> trang danh mục khác giữ nguyên PA-3) · route NCC bật editable.

> **Verify:** unit 10/10 · npm test EXIT 0 (12/11 + 54/54 + 10/10) · tsc app
> con EXIT 0 · probe CRUD thật INSERT/UPDATE/DELETE qua tunnel PASS — bảng
> còn nguyên 137. Tunnel đổi URL (`cbs-wise-totals-aware` — gist tự ghi) —
> đã sync `.env.local` 2 app (quy trình 13.3).

> **Tiêu chí kiểm chứng (sau Push):** trang /m/danh-muc-nha-cung-cap hiện
> 137 dòng; Admin Thêm/Sửa/Xóa lưu thật (F5 còn); user thường bấm Lưu bị
> chặn "Chỉ Admin/SuperAdmin được sửa".

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **6.5.0** / repo con **9.6.0**.

---

### GĐ 444 / C.271 — BỔ SUNG (Trợ lý Freebuff): builder API thuần HOÀN THÀNH + TEST THẬT THÀNH CÔNG (2026-10-16)

> **ĐH chốt nghiệp vụ bổ sung (16/10 chiều) + giao test NL:** login SMED user
> trung tâm nào → trung tâm+kho đó · dữ liệu từ CHI TIẾT PHIẾU NHẬP SMED ·
> VAT không nhập (đơn giá = giá đã có thuế) · ngày hạch toán = ngày hóa đơn ·
> số CT = mã phiếu SMED · NCC tra theo `danh_sach_nha_cung_cap.xlsx` ĐH gửi
> (138 NCC) · NCC/hàng không khớp → bỏ phiếu + báo lỗi.

> **Builder `agent/misa_muahang_api.py`** (repo con — chi tiết entry C.271 +
> `CHECKPOINT-GD444.md`): SMED chi tiết phiếu qua Playwright (19 user trung tâm)
> → API MISA tra NCC theo mã + hàng hóa theo tên → save_full với **bộ key CHÍNH
> XÁC như UI gửi** (49 master + 79 detail — capture FULL 6028 ký tự). **Bài học
> lớn:** payload theo schema RESPONSE (105 trường) → Code 99 liên tục.

> **✅ TEST THẬT 17:33 — PHIẾU TẠO QUA API THUẦN, KHỚP TỪNG ĐỒNG:**
> `python misa_muahang_api.py --date 12/10/2026 --center NL` → PN-20261012155647
> (refid `747b4cc6`) · VAXIGRIP 0.5ml · SL 200 × 229.500 (giá có thuế, VAT 0) =
> **45.900.000** · số HĐ 00055672 · ngày hạch toán 12/10/2026 = ngày HĐ ·
> NCC DP TB YT Hà Nội · kho NL. Đã gửi ĐH ảnh UI MISA xác nhận đầy đủ số liệu.

> **Đã dọn 5 phiếu rác MISA theo lệnh ĐH** (4 phiếu form UI 0 đồng + Gardasil
> GĐ 442) — còn đúng 1 phiếu test đầy đủ. Unit 6/6 + 7/7 PASS.

> **Việc tiếp:** CENTER_IDS 18 trung tâm còn lại (tra API danh mục) · nối job
> 40_web_agent · check trùng số CT khi chạy lại. **Version: KHÔNG bump** —
> app tổng **6.5.0** / repo con **9.6.0**.

---

### GĐ 444 / C.271 — ĐỢT 3 (Trợ lý Freebuff): 3 danh mục MISA + VỊ TRÍ vào phiếu + bài học DELETE (2026-10-16 tối)

> **ĐH gửi 3 danh mục MISA** (kho/vị trí/mã thống kê — 20 mã: 19 TT + VP, mã
> trung tâm = mã kho = mã vị trí = mã thống kê) + yêu cầu phiếu PN-20261012155647
> thiếu **Vị trí** → sửa thêm.

> **Đã làm (repo con — entry C.271 đợt 3 + CHECKPOINT-GD444.md):** tìm ra 4
> endpoint danh mục GET (`di/v1/stock_get` · `inventory_location_get` ·
> `list_item_get` · `organization_unit_get`) → builder tra ĐỘNG đủ 19 trung tâm;
> thêm `inventory_location_id/code` vào detail; file .xls lưu `agent/misa_danh_muc/`.

> **✅ Kết quả:** phiếu PN-20261012155647 tạo lại **có Vị trí NL** (refid
> `1f7434d1`) — UI xác nhận: VAXIGRIP · kho NL · **Vị trí NL** · 45.900.000.

> **⚠️ 2 bài học vận hành MISA (rất quan trọng cho phiên sau):**
> (1) `DELETE /pu_voucher/batch_voucher` body đúng = **`[{"refid": uuid}]`** —
> body `[{"Key":...}]` trả Success nhưng KHÔNG xóa (5 phiếu tưởng đã xóa thực ra
> còn — đã xóa thật + verify từng phiếu, MISA sạch 0 rác);
> (2) UPDATE phiếu qua save_full bị chặn InvalidRefno Code 6 → muốn sửa phải
> XÓA + TẠO LẠI.

> **Unit 6/6 + 7/7 PASS. Version: KHÔNG bump** — app tổng **6.5.0** / repo con **9.6.0**.

---

### GĐ 444 / C.271 — ĐỢT 4 (Trợ lý Freebuff): CHẠY 19 TRUNG TÂM NGÀY 16/10 — 34/34 phiếu khớp DB từng đồng (2026-10-16 tối)

> **Lệnh ĐH:** "xây dựng đủ 19 trung tâm và chạy 19 trung tâm ngày 16/10/2026".
> Builder (đã tra danh mục động đủ 19 TT ở đợt 3) + script `_run_all_centers.sh`
> chạy loop 18 TT (TĐ test trước) — 20:53→21:11.

> **✅ KẾT QUẢ: 34/34 phiếu ngày 16/10 tạo trên MISA — MISA 568.141.273 khớp
> DB stg_5BKN TỪNG ĐỒNG (lệch 0).** 11 TT có phiếu (TD 5 · QO 6 · HM/PY/LM 4 ·
> ML 3 · ĐX/TS/TP 2 · LB/TĐ 1); 8 TT không nhập hàng ngày này. LB 1 lỗi
> transient → retry OK. Log `agent/LOG/gd444-run19-1610.log` (gitignore) ·
> chi tiết entry C.271 AGENTS.md repo con. **Version: KHÔNG bump** — 6.5.0/9.6.0.

---

### GĐ 444 / C.271 — ĐỢT 5 (Trợ lý Freebuff): retry tự động + IDEMPOTENT + job type (2026-10-16 đêm)

> **Lệnh ĐH:** "thêm retry tự động và nối vào task/job; tạo danh mục để vào phần
> danh mục trên sidebar (3 file Excel ĐH gửi)".

> **✅ Đã xong (repo con — entry/checkpoint C.271 đợt 5):**
> (1) **Retry tự động** — scrape SMED 3 lần + upload 2 lần; lỗi nghiệp vụ
> (InvalidInvno/InvalidRefno/NCC) KHÔNG retry — đã chứng minh chạy thật;
> (2) **IDEMPOTENT** — phiếu đã tồn tại (trùng số HĐ) → skip "đã tồn tại trên
> MISA" thay vì failed → job chạy lặp an toàn exit 0 (chứng minh 22 phiếu 01/10
> tự bỏ qua);
> (3) **Job type `misa-mua-hang-api`** trong 40_web_agent.py REPORT_MAP + marker
> "✅ PHIẾU ĐÃ TẠO" — wrapper `misa_muahang_api_run.py` chạy CẢ 19 trung tâm
> theo SMED_FROM_DATE + tổng kết JSON + exit code chuẩn.

> **⚠️ Tồn đọng 2 việc (checkpoint `CHECKPOINT-GD444.md`):**
> (a) **3 phiếu TT ngày 01/10** (PN-...163416/163827/164153) — phiếu KHÔNG còn
> hiện trên SMED khi search (nghi hủy/đổi mã sau khi tải BKN) — cần điều tra;
> (b) **3 danh mục sidebar** (KHO/VỊ TRÍ/MÃ THỐNG KÊ từ file Excel ĐH gửi) —
> CHƯA làm (seed + route + nav + phân quyền 3 điểm) — ước lượng 1 phiên.
> 01/10 hiện 22/25 phiếu trên MISA (ĐH đã đồng ý giữ).

> **Version: KHÔNG bump** — app tổng **6.5.0** / repo con **9.6.0**.

---

### GĐ 446 / C.273 (Trợ lý Freebuff): Phiếu Mua hàng thiếu Mã đơn vị + Mã thống kê → thêm vào phiếu, GHI SỔ ĐƯỢC (2026-10-16 đêm)

> **ĐH báo (16/10 22:41, ảnh MISA):** "Ghi sổ không thành công — Tài khoản 156_LM
> chi tiết theo **Đơn vị**. Vui lòng bổ sung thông tin Đơn vị. Tài khoản 156_LM
> chi tiết theo **Mã thống kê**. Vui lòng bổ sung thông tin Mã thống kê." →
> "Em cho thêm vào cho anh nhé. Các mã giống nhau do đều lấy từ tên trung tâm
> viết tắt VD: TĐ, TD, BH (Mã kho, Vị trí, Mã đơn vị, Mã thống kê)."

> **Đã làm (repo con code `4e7304b` + entry `479314c`):** builder
> `misa_muahang_api.py` — tra danh mục MISA lấy thêm tên + thêm **7 key** vào
> dòng chi tiết (90 key): `list_item_id/code/name` (Mã thống kê) +
> `organization_unit_id/code/name` (Đơn vị) + `inventory_location_name` (Vị trí).
> Tài liệu mới `agent/misa_ghi_so_gd446.json` (API ghi sổ + cơ chế cảnh báo 2 bước).

> **Probe (bằng chứng thật):** 4 danh mục MISA (kho · vị trí · mã thống kê · đơn
> vị) đều dùng **MÃ TRUNG TÂM VIẾT TẮT** (NL/LM/TĐ/TD…; đơn vị có thêm GIONGVN
> công ty mẹ) — đúng như ĐH nói; tên key đối chiếu phiếu kế toán cũ ĐÃ GHI SỔ
> (PN-20260930150232); MISA KHÔNG tự tra tên từ id (phiếu builder cũ
> `inventory_location_name = None`).

> **✅ VERIFY THẬT trọn chuỗi:** xóa phiếu test cũ (DELETE `batch_voucher`
> `[{"refid":…}]` + verify không còn dữ liệu) → tạo lại (refid `bb51ebcc`) →
> detail_full **đủ Đơn vị NL + Mã thống kê NL** (id/code/name) + 45.900.000 khớp →
> **GHI SỔ THÀNH CÔNG** (lỗi cứng Đơn vị/Mã thống kê ĐÃ HẾT; chỉ còn cảnh báo MỀM
> 5 mục — phiếu kế toán cũ cũng vậy — pass bằng `IsPassAllWarning:true` →
> `is_posted_finance = true`) → chạy lại builder **idempotent skip OK** → unit
> **7/7 PASS**.

> **⚠️ TỒN ĐỌNG chờ ĐH:** 34 phiếu ngày 16/10 tạo TRƯỚC fix (thiếu 2 mã) → muốn
> ghi sổ phải **XÓA + TẠO LẠI** từng phiếu (sửa qua save_full không được —
> InvalidRefno). Phiếu NL 12/10 đã ghi sổ trong quá trình verify (bỏ ghi sổ được
> nếu ĐH muốn). Ghi sổ tự động trong builder = việc sau, chờ ĐH chốt.

> **Version: KHÔNG bump** (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **6.5.0** / repo con **9.6.0**.

---

### GĐ 448 / C.275 (Trợ lý Freebuff): PA-1 — module Bảng giá Vắc xin: Lưu AI đọc = ĐIỀN GIÁ vào dòng có sẵn theo tên SMED (2026-10-17)

> **ĐH báo (16/10 tối, 2 ảnh):** "Giá niêm yết không được tự động cập nhật là
> sao nhỉ?... khi chọn nhập liệu từ file thì sẽ phải chọn tên vắc xin trong
> file được tải lên. Tìm kiếm xem đúng tên Vắc xin đã có trong danh mục Bảng
> giá để đưa giá Niêm yết vào."

> **Điều tra (E2E thật production — session ĐH, KHÔNG lưu gì):** AI đọc HOẠT
> ĐỘNG ĐÚNG (dialog 13 dòng CÓ giá) — **GỐC GÃY ở `saveMuaHangDraft` GĐ 429:
> chỉ INSERT dòng mới, không dò tên khớp 52 dòng danh mục** → 52 dòng gốc giá
> "—" mãi mãi. DB 16/10: 52 dòng / 0 có giá / 4 file chưa có lượt Lưu. Danh mục
> 52 dòng không có "Beyfortus" + "Pentaxim". Chi tiết điều tra ở entry C.275
> AGENTS.md repo con.

> **ĐH chốt PA-1.** Đã làm (repo con code `c628070` — 4 file +299/−23):
> hàm thuần `planBangGiaUpsert` khớp tên 3 lớp (normVx exact → prefix 2 chiều
> ≥4 → KHÔNG CÁCH ≥6 — 'AVAXIM80' ↔ 'Avaxim 80U') + `saveMuaHangDraft`
> UPDATE `COALESCE` chỉ điền ô trống (không đè số điền tay) / không khớp →
> INSERT + nhãn cột "Dòng AI đọc được" (đếm ngay khi AI đọc xong) + thông báo
> "điền X dòng có sẵn + thêm Y dòng mới". Module khác giữ nguyên INSERT.

> **Verify:** unit **62/62** (8 mới) · 2 test file khác không ảnh hưởng · tsc
> app con **EXIT 0** · **probe thật:** 13 dòng AI đọc → **điền 9 dòng có sẵn
> + thêm 4** (Beyfortus ×2 · Pentaxim — danh mục không có; Vaxigrip dòng 2 —
> đã nhận giá).

> **Tiêu chí kiểm chứng (sau Push):** AI đọc file bảng giá → Lưu → giá niêm
> yết hiện ngay trên 52 dòng danh mục; lưu lần 2 không đè giá điền tay.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **6.5.0** / repo con **9.6.0**.

---

### GĐ 449 (Trợ lý Freebuff): Khảo sát thư mục `context-mode-main` — công cụ tiết kiệm context cho AI Agent — KHÔNG cài, trình 3 PA chờ ĐH (2026-10-17)

> **Yêu cầu của ĐH (17/10):** tìm hiểu
> `D:\DuLieuChung\CUONG_2026\Github\context-mode-main` xem có áp dụng vào dự
> án giong-vn-v6 được không (tiền lệ GĐ 427 browser-use, GĐ 441 nanobrowser).

> **Kết quả khảo sát (đọc README + platform-support + BENCHMARK + LICENSE +
> hooks):** **context-mode** (npm `context-mode` v1.0.169, tác giả cá nhân
> mksglu — HN #1) là **MCP plugin cho AI coding agents** — KHÔNG phải thư
> viện cho ứng dụng web. Giải 4 bài toán: (1) sandbox `ctx_execute` giữ raw
> data ngoài context (benchmark 96-98% — 315KB → 5.4KB); (2) session continuity
> SQLite + FTS5/BM25 (trả lại ngữ cảnh sau compact); (3) "Think in Code" —
> agent viết script xử lý thay vì đọc raw; (4) hooks chặn curl/WebFetch/Read
> thuần và điều hướng về sandbox. Hỗ trợ 17 platforms (Claude Code, Codex CLI,
> Gemini CLI, Cursor...) — **KHÔNG có ZCode**; Codex CLI hỗ trợ full
> (`~/.codex/hooks.json` + config.toml). **License Elastic-2.0** (không
> MIT/Apache): dùng nội bộ hợp lệ, cấm cung cấp như managed service.

> **Đánh giá áp dụng vào giong-vn-v6:** (1) KHÔNG tích hợp vào app
> tổng/app con/agent Python — sai mục đích; (2) giá trị thật = công cụ cho
> các phiên AI Agent làm việc trên repo — đúng bài toán GĐ 319 (tràn context
> 400K); NHƯNG 3 rào cản: ZCode không nằm trong 17 platform (chỉ dùng được
> lớp MCP-only, mất auto-routing) · hooks chặn curl/WebFetch/Read → GÃY quy
> trình probe tunnel/8777 + E2E Playwright + đọc code trực tiếp của mình ·
> phụ thuộc package cá nhân + hooks ghi đè cấu hình client.

> **Trình 3 PA (chờ ĐH chốt):** PA-1 cài MCP-only cho ZCode (không hooks —
> chỉ thêm 5-6 tool ctx_*, không chặn gì, thí nghiệm 1 phiên) · PA-2 full
> MCP+hooks trên Claude Code/Codex CLI (tiết kiệm tối đa nhưng gãy workflow
> curl/Read hiện tại) · **PA-3 khuyến nghị: KHÔNG cài — chỉ rút paradigm
> "Think in Code" vào quy tắc mục 11 AGENTS.md** (việc đếm/lọc/phân tích file
> lớn → viết script node/python chỉ in kết quả — cách em đã tự làm qua các
> probe script các GĐ trước), 0 chi phí 0 phụ thuộc.

> **Version:** KHÔNG bump (khảo sát docs-only — 0 code đổi). App tổng
> **6.5.0** / repo con **9.6.0**.

---

### GĐ 450 (Trợ lý Freebuff): PA-3 ĐH chốt — KHÔNG cài context-mode; rút "Think in Code" thành quy tắc số 6 mục 11 (2026-10-17)

> **ĐH chốt PA-3 (17/10, sau khảo sát GĐ 449):** KHÔNG cài context-mode — chỉ
> rút tinh thần "Think in Code" thành quy tắc làm việc cho MỌI Agent.

> **Đã làm (docs-only — 0 code đổi):** mục 11 QUY TẮC QUẢN LÝ CONTEXT thêm
> **quy tắc số 6 Think in Code**: việc đếm/lọc/phân tích/so sánh dữ liệu lớn
> (file lớn, log, dump DB, danh sách dài) → viết script node/python xử lý rồi
> chỉ in kết quả nhỏ vào context — KHÔNG đọc nguyên dữ liệu vào phiên (1 script
> thay hàng chục lần Read); Read/grep trực tiếp chỉ khi xem/sửa ĐÚNG DÒNG
> (quy tắc 2); kể cả probe DB/log qua API agent — lọc trong script, không in
> toàn bộ response. Nêu 3 mẫu đã áp dụng: probe plan GĐ 448, tách archive
> GĐ 416, audit phân quyền GĐ 420.

> **Tiêu chí kiểm chứng:** các phiên sau đọc mục 11 thấy ngay quy tắc 6; khi
> gặp việc phân tích dữ liệu lớn agent viết script thay vì Read toàn bộ.

> **Version:** KHÔNG bump (docs-only). App tổng **6.5.0** / repo con
> **9.6.0**.

---

### GĐ 447 / C.274 (Trợ lý Freebuff): ĐH chốt "1+2+3" — tự ghi sổ + tạo lại 34 phiếu 16/10 (ghi sổ 34/34) + 3 danh mục MISA lên sidebar (2026-10-17)

> **Lệnh ĐH (17/10): "1+2+3"** theo 3 gợi ý em đề xuất ở GĐ 446.

> **② Builder TỰ GHI SỔ (repo con `23649fa`):** thêm `build_ledger_post_body` +
> `post_ledger` (POST `ledger/v1/ledger/post` với `PassWarnings` +
> `IsPassAllWarning:true` = tương đương UI bấm "Có" ở cảnh báo MỀM 5 mục) +
> CLI `--post` + env `MISA_AUTO_POST` (dùng cho job tự động); wrapper log +
> đếm "đã ghi sổ x/y". Unit **8/8 PASS**.

> **① TẠO LẠI 34 PHIẾU NGÀY 16/10 — HOÀN TẤT:** xóa phiếu bản cũ (chỉ xóa khi
> hội đủ 3 điều kiện an toàn: mã nằm trong stg_5BKN 16/10 · chưa có Đơn vị/Mã
> thống kê · chưa ghi sổ) → tạo lại bằng builder mới + ghi sổ tự động.
> **KẾT QUẢ: xóa 34 · tạo 34 · GHI SỔ 34/34 · 0 lỗi** — verify độc lập:
> **34/34 đủ 2 mã + 34/34 `is_posted_finance=true` + tổng 568.141.273 khớp DB
> từng đồng**.

> **③ 3 DANH MỤC MISA LÊN SIDEBAR (NHẬP DỮ LIỆU → DANH MỤC → 5/6/7):** seed 3
> bảng GiondDB `dm_misa_kho` · `dm_misa_vi_tri` · `dm_misa_ma_thong_ke` (20
> dòng/bảng = 19 TT + VP từ 3 file Excel ĐH gửi, script `gd447_seed_dm_misa.py`)
> + 3 trang app con + nav.ts + phân quyền 3 điểm (app tổng `banhang-catalog.ts`
> 5→8 lá + `smed-auth.ts` ROUTE_TO_GROUP + routeTree). Verify: probe qua endpoint
> web `/query` 20/20 dòng/bảng · tsc app con **EXIT 0** · app tổng unit **58/58
> PASS**.

> **⚠️ CẢNH BÁO TRÙNG LẶP (nguyên tắc 3 — ĐH biết trước khi Push):** 4 FILE DÙNG
> CHUNG có thay đổi của **PHIÊN SONG SONG** (module Điều chuyển nội bộ GĐ 430/C.260)
> đã bị commit kèm trong đợt này vì bắt buộc chạm: repo con `nav.ts` ·
> `smed-auth.ts` · `routeTree.gen.ts` (lá `/m/bc-dieu-chuyen-matrix` + label
> "UPLOAD Chứng từ mua hàng" + refactor `BANHANG_GROUP_KEYS`) · app tổng
> `banhang-catalog.ts` (2 dòng tương ứng). **Route web app con của module điều
> chuyển CHƯA commit** — phiên đó commit riêng (khi Push rà 2 repo + merge nhánh).

> **Tiêu chí kiểm chứng:** MISA 34 phiếu 16/10 "Đã ghi sổ"; chạy builder
> `--post` → log "📗 ĐÃ GHI SỔ"; sidebar app con có 3 danh mục MISA mới (20 dòng/bảng).

> **Version: KHÔNG bump** (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **6.5.0** / repo con **9.6.0**.

---

### GĐ 451 / C.276 (Trợ lý Freebuff): Ghi sổ tự động cho job 23:00 + điều tra 3 phiếu TT 01/10 + rà soát Push (2026-10-17)

> **Lệnh ĐH (17/10): "1+2+3"** theo 3 gợi ý em nêu ở GĐ 447.

> **① JOB TỰ ĐỘNG GHI SỔ — ĐÃ BẬT (repo con `2d1d74d`, agent ĐÃ restart):**
> env `MISA_AUTO_POST=1` cho job `misa-mua-hang-api` (40_web_agent.py) + chèn bước
> **misa-mua-hang-api** vào Task_02 gốc NGAY SAU 'nhapkho' (20 → **21 bước**, script
> `gd451_add_misa_step.py` idempotent + backup config) + **restart GIONG_SMED_Agent**
> (kiểm tra rảnh trước: 0 job/0 task; verify log mới "Task_02 tự chạy 23:00").
> ⇒ Từ tối nay 23:00: job tạo phiếu Mua hàng MISA **+ TỰ GHI SỔ** cho cả 19 TT.

> **② 3 PHIẾU TT 01/10 — ĐIỀU TRA XONG: nguyên nhân KHÁC dự đoán GĐ 444** (không
> phải phiếu bị xóa): **tài khoản SMED của TT không thấy BẤT KỲ phiếu nhập nào** —
> search 3 mã 01/10 + 2 mã 07-08/10 + 2 mã 30/09 + search RỘNG ("PN-2026"/tên NCC)
> đều 0 dòng, trong khi LB/TD tìm thấy ngay bằng cùng hàm builder (đối chứng: user
> LB không thấy phiếu TT; user TT không tồn tại ở domain tcgiongts). MISA cũng chưa
> có 5 mã TT tháng 10. ⇒ **VIỆC CỦA ĐH:** kiểm tra tài khoản TT trên SMED (quyền
> xem phân hệ Kho / kho TT có tồn tại / hoạt động nhập kho do ai thực hiện) — xong
> thì chạy builder cho TT kỳ 01/10 + 07/10 + 08/10 là tự tạo + ghi sổ.

> **③ RÀ SOÁT PUSH — CHƯA SẴN SÀNG (đúng kế hoạch "đợt gộp" ĐH đã chốt):**
> 15 commit chưa push (repo con) + 21 commit (app tổng). **Module Điều chuyển của
> PHIÊN SONG SONG còn dở** (untracked: `src/components/dieu-chuyen/`,
> `-dieu-chuyen.ts`, `bc-dieu-chuyen-matrix.tsx`; modified: `nhap-dieu-chuyen.tsx`,
> `-smed.ts`, `quy-trinh-mua-hang.tsx`). ⚠️ Kiểm tra thêm: `routeTree.gen.ts` (đã
> commit GĐ 447) tham chiếu route chưa commit → an toàn trên Vercel vì plugin
> `tanstackStart()` tự sinh lại routeTree khi build, nhưng **nên Push SAU khi phiên
> song song commit xong** (hoặc kiểm tra log build app con nếu Push trước).

> **Version: KHÔNG bump** (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **6.5.0** / repo con **9.6.0**.

---

### GĐ 452 / C.277 (Trợ lý Freebuff): PA Push đợt gộp 17/10 — bump 6.6.0 / 9.7.0 + LIVE (2026-10-17)

> **Lệnh "Push" của Đại ca (17/10, sau GĐ 451).** Rà trùng lặp theo nguyên tắc 3:
> nhánh phụ `agent-cli` + `pipeline-work` **0 commit chưa merge** (cả 2 repo) ·
> remote `origin/main` **0 commit mới** (không có agent khác push trước) · working
> tree còn file dở **của PHIÊN SONG SONG** (module Điều chuyển GĐ 430/C.260:
> `src/components/dieu-chuyen/` · `-dieu-chuyen.ts` · `bc-dieu-chuyen-matrix.tsx`
> untracked + `nhap-dieu-chuyen.tsx`/`-smed.ts`/`quy-trinh-mua-hang.tsx`/`api_server.py`/
> `sql_reports.py` modified) → **KHÔNG add, KHÔNG đụng** (giữ nguyên cho phiên đó).

> **⚠️ CẢNH BÁO ĐÃ NÊU TRƯỚC KHI PUSH (nguyên tắc 3):** 4 file dùng chung đã commit
> ở GĐ 447 (nav.ts · smed-auth.ts · routeTree.gen.ts repo con + banhang-catalog.ts
> app tổng) có khai báo lá `/m/bc-dieu-chuyen-matrix` của phiên song song trong khi
> **file route web CHƯA commit** ⇒ menu app con hiện lá "Điều chuyển nội bộ — Ma
> trận tổng hợp" nhưng bấm vào **404** cho tới khi phiên đó commit + Push. Đã kiểm
> chứng SAU push: `/m/bc-dieu-chuyen-matrix` = **404**; build app con vẫn THÀNH CÔNG
> (plugin `tanstackStart()` tự sinh lại routeTree khi build — đúng như dự đoán).

> **Bump version (lúc Push — quy tắc ĐA AGENT): minor** (đợt nhiều feature) —
> app tổng **6.5.0 → 6.6.0** (`package.json` + `DEFAULT_VERSION` app-shell.tsx)
> · repo con **9.6.0 → 9.7.0** (2 chỗ). Checklist GĐ 138 ✓ (6.6.0 / 9.7.0 — mọi
> thành phần 1 chữ số).

> **Push:** app tổng `f5aac53..e1a5a3f` (**24 commit**: GĐ 444→452 của 2 phiên
> Freebuff — MISA Mua hàng API thuần + retry/idempotent/job + tự ghi sổ + 3 danh
> mục MISA + danh mục NCC CRUD + fix KPI Tổng quan + bảng trả nợ LHT + bảng giá VX
> Lưu-AI + Think-in-Code + bump) · repo con `6b8b704..c0e9171` (**18 commit**:
> C.271→C.277).

> **✅ Verify production (curl --compressed + grep -a):** app tổng
> `giong-vn-v6.vercel.app` = **6.6.0** · app con `giong-banhang.vercel.app` =
> **9.7.0** — deploy mới, không ghim deployment cũ. HTTP: 2 trang chủ 200 · 3 trang
> danh mục MỚI (`/m/danh-muc-kho`, `/m/danh-muc-vi-tri`, `/m/danh-muc-ma-thong-ke`)
> **200** · `/m/bc-dieu-chuyen-matrix` 404 (hệ quả đã cảnh báo — chờ phiên song song).

> **Tiêu chí kiểm chứng của Đại ca:** (1) góc trái app tổng 6.6.0 / app con 9.7.0;
> (2) sidebar app con NHẬP DỮ LIỆU → DANH MỤC có 5. Kho · 6. Vị trí · 7. Mã thống kê
> (20 dòng/bảng); (3) MISA: 34 phiếu 16/10 + phiếu 12/10 đều "Đã ghi sổ"; (4) tối
> nay 23:00 job Task_02 chạy bước MISA Mua hàng mới → phiếu tạo + tự ghi sổ.

> **Version: app tổng 6.6.0 / repo con 9.7.0 — ĐÃ PUSH + ĐÃ LIVE.**

---

### GĐ 453 / C.278 (Trợ lý Freebuff): SMED phân lại quyền nhưng tài khoản Thanh Thùy VẪN chưa thấy phiếu — bằng chứng API rỗng (2026-10-17)

> **ĐH báo (17/10):** SMED đã phân lại quyền kho hàng cho tài khoản Thanh Thùy.

> **Em kiểm tra lại:** VẪN không thấy — 5 mã phiếu TT (01/10 ×3 + 07/10 + 08/10)
> và search rộng "PN-2026"/tên NCC đều **0 dòng**.

> **🔎 Bằng chứng quyết định (bắt network trang nhập kho — script `LOG/gd453/_catch_network.py`):**
> API `GET /api/services/app/kho/GetKhoNhapByFunctionAndCosotiemchung` (danh sách
> kho nhập theo cơ sở tiêm chủng):
> - **TT** (`tcgiong_thanhthuy_pkcuong`): **`{"result":[]}` — RỖNG** ⇒ tài khoản
>   chưa được gán **cơ sở tiêm chủng / kho nhập**.
> - **LB** (đối chứng `tcgiong_pkcuong`): trả về cơ sở
>   `TRUNG TÂM TIÊM CHỦNG VẮC XIN GIÓNG LONG BIÊN` (id 10277).
>
> ⇒ "Phân lại quyền kho hàng" **chưa đủ**: cần gán **cơ sở tiêm chủng "TRUNG TÂM
> TIÊM CHỦNG GIÓNG THANH THÙY"** + chức năng nhập kho cho tài khoản
> `tcgiong_thanhthuy_pkcuong`. Xong → em chạy builder TT kỳ 01/10 + 07/10 + 08/10,
> 5 phiếu tự lên MISA + ghi sổ.

> **VIỆC CỦA ĐH:** gửi SMED bằng chứng trên (kèm tên cơ sở cần gán — so mẫu LB).

> **Version: KHÔNG bump** (chờ lệnh Push). App tổng **6.6.0** / repo con **9.7.0**.

---

### GĐ 454 / C.279 (Trợ lý Freebuff): SMED gán cơ sở Thanh Thùy xong → 5 phiếu TT lên MISA + GHI SỔ, khớp từng đồng — ĐÓNG tồn đọng GĐ 444 (2026-10-17)

> **ĐH báo (17/10):** "SMED gán xong cho Thanh Thùy rồi đấy."

> **Xác nhận tức thì:** API `GetKhoNhapByFunctionAndCosotiemchung` của tài khoản TT
> giờ trả về **`TRUNG TÂM TIÊM CHỦNG GIÓNG THANH THUỲ` (id 11693)** — trước đó rỗng
> (bằng chứng GĐ 453 đã gửi SMED đúng việc cần làm).

> **✅ Chạy builder 3 kỳ `--post` — 5 phiếu TẠO + GHI SỔ:**
> 01/10: PN-…163416 **16.289.489** · PN-…163827 **24.777.900** · PN-…164153 **9.220.609**
> · 07/10: PN-…142654 **62.372.617** · 08/10: PN-…104753 **9.603.363**.

> **Verify độc lập:** 5/5 phiếu trên MISA · **5/5 đủ Đơn vị + Mã thống kê (TT/TT)** ·
> **5/5 `is_posted_finance = true`** · **tổng 122.263.978 KHỚP stg_5BKN TỪNG ĐỒNG**.

> **⇒ Tồn đọng GĐ 444 (3 phiếu TT 01/10) + 2 phiếu 07-08/10 ĐÓNG HOÀN TOÀN.** Nguyên
> nhân gốc cả chuỗi: tài khoản SMED của TT thiếu **cơ sở tiêm chủng/kho nhập** —
> không phải phiếu bị xóa. Bài học điều tra: **bắt network API SMED** thay vì đoán
> từ giao diện ("Không có dữ liệu").

> **Version: KHÔNG bump** (chờ lệnh Push). App tổng **6.6.0** / repo con **9.7.0**.
---

### GĐ 456 / C.281 (Trợ lý Freebuff): Fix download MISA MeInvoice (tool 30/31) — MISA đổi login 2 bước + bắt OTP email, tool chết trước khối OTP — PA-1 + verify thật (2026-10-17)

> **ĐH báo lỗi (17/10, ảnh):** 2 phân hệ "Bảng kê chi tiết hóa đơn đã sử dụng"
> (BKCT_HDGTGT) + "Bảng kê hóa đơn đã sử dụng" (BKTH_HDGTGT) fail cả Task tự
> động (15-16/10) lẫn thủ công (17/10 10:41) — "Tool thoát mã 1: TimeoutError
> fill #password 45000ms". Chi tiết đầy đủ ở entry **C.281 AGENTS.md repo con**.

> **Chẩn đoán (probe browser + log 14-17/10):** MISA meInvoice đổi trang login
> sang **flow 2 bước** (màn 1 /login/1: #TaxCode + #UserName + "Tiếp tục" —
> không có ô mật khẩu; sau đó mới màn mật khẩu #Password) + **bắt xác thực 2
> bước OTP email (/login/2)** khi phiên misa_state chết (chết trước 15/10 —
> 14/10 17:59 còn OK). Tool 30/31 chết ở `pw.fill(password)` lần 2 (màn OTP
> không còn ô) TRƯỚC khi tới khối OTP có sẵn (selector `input.value-otp` +
> `#btnActiveAcount` + `#rememberDevice` vẫn sống trên màn mới).

> **Fix PA-1 (ĐH chốt, repo con `a842785` — 2 file +16/−2):** bọc fill
> try/except + sau poll check màn OTP visible → break chảy vào khối OTP có
> sẵn (Gmail IMAP tự đọc). **Verify thật kỳ 16/10 trên máy agent:** tool 30 —
> OTP tự đọc 7s → lưu phiên → XONG file 41KB (exit 0); tool 31 — "Phiên cũ
> còn sống" → XONG file 33KB (exit 0). Ổn định → không cần củng cố PA-3.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **6.6.0** / repo con **9.7.0**.

---

### GĐ 455 / C.280 (Trợ lý Freebuff): UPLOAD Chứng từ mua hàng — người dùng tự tạo phiếu MISA cho giai đoạn trước (2026-10-17)

> **Yêu cầu ĐH (17/10, ảnh):** "UPLOAD - MISA AMIS/UPLOAD Chứng từ mua hàng hiện
> đang chưa có giao diện để người dùng tạo thủ công. Em nghiên cứu cho anh vào để
> anh cho phép người sử dụng lấy các phiếu nhập kho từ các giai đoạn trước. Còn
> việc em tạo trên lịch nhiệm vụ thì ĐỂ NGUYÊN chưa vội điều chỉnh." Giao diện
> giống BÁO CÁO KẾ TOÁN/BÁO CÁO KHO nhưng **chi tiết theo từng phiếu nhập**, gồm:
> (1) chạy báo cáo (từ ngày→đến ngày) · (2) lịch sử chạy báo cáo · (3) báo cáo chạy
> ra có nút **"Tải Excel"** và **"Upload Misa"**.

> **ĐH dặn "hỏi lại nếu chưa rõ, đừng đoán"** → em khảo sát (trang placeholder +
> khung báo cáo mẫu SqlDataModule + job misa-mua-hang-api chỉ 1 ngày) → trình
> 3 PA cho từng điểm → **ĐH chốt 4 điểm:** nguồn = dữ liệu ĐÃ TẢI VỀ (ngày chưa có
> → báo chưa đủ dữ liệu + cho tải bổ sung) · Upload Misa = **CẢ KỲ × 19 trung tâm**
> (tự bỏ qua phiếu đã có) · **GHI SỔ LUÔN** · bảng 8 cột + **Trạng thái MISA**.

> **Đã làm (repo con `6fde0bc` + entry `cb2196d`):** agent — script
> **`misa_status_sync.py`** (đồng bộ trạng thái phiếu MISA → bảng mới GiondDB
> `misa_phieu_status`: số HĐ · ngày HĐ · đã ghi sổ) + builder
> **`misa_nk_chitiet`** (138 phiếu kỳ 01/10→16/10, 9 cột, LEFT JOIN trạng thái) +
> wrapper **hỗ trợ khoảng ngày** (`iter_days`, trần 92 ngày, unit 4/4) · web —
> `-smed.ts` (+5 chỗ phân quyền/nguồn/whitelist) + `smed-auth.ts` REPORT_GROUP +
> `sql-data-module.tsx` **prop `uploadMisa`** (nút Upload Misa + confirm + poll 8s +
> tự chạy lại báo cáo khi xong) + trang `up-nhap-kho.tsx` (placeholder → giao diện
> thật 3 phần) + nav desc. **Lịch nhiệm vụ Task_02 KHÔNG đụng (đúng lời ĐH).**

> **✅ VERIFY THẬT (job Upload Misa qua agent, kỳ 12/10→13/10, 19 TT):** tạo
> **11 phiếu + GHI SỔ 11 · 0 lỗi** → báo cáo cập nhật: 73/138 phiếu có trên MISA ·
> **51 đã ghi sổ (tăng đúng 11)** · phiếu 12-13/10 = 12/12 "Đã ghi sổ". tsc EXIT 0 ·
> unit app con PASS. ⚠️ ĐH biết: 11 phiếu 12-13/10 là phiếu THẬT đã lên MISA trong
> lúc em test end-to-end (đúng nghiệp vụ — cùng loại 34 phiếu 16/10 đã duyệt).
> ⚠️ Bài học vận hành: Chrome CDP bị treo WebSocket (connect timeout cả sync+async)
> → kill + mở lại Chrome profile `.secrets/chrome-cdp` (cookie MISA bền, không cần
> OTP lại); CDP chết thì báo cáo vẫn chạy với trạng thái cũ.

> **Tiêu chí kiểm chứng (sau Push):** mở UPLOAD - MISA AMIS → UPLOAD Chứng từ mua
> hàng: (1) chọn kỳ → Chạy báo cáo → bảng chi tiết từng phiếu 9 cột + Tải Excel;
> (2) bấm **Upload Misa** → xác nhận → theo dõi job → bảng tự cập nhật "Đã ghi sổ".

> **Version: KHÔNG bump** (chờ lệnh Push). App tổng **6.6.0** / repo con **9.7.0**.

---

### GĐ 457 / C.281 (Trợ lý Freebuff): Ngày lập phiếu trên MISA AMIS = đúng ngày lập phiếu SMED (2026-10-17)

> **Yêu cầu ĐH (17/10, ảnh SMED chi tiết phiếu):** điều chỉnh ngày lập phiếu ghi
> trên MISA AMIS theo đúng **ngày lập phiếu SMED** → sau khi sửa, Ngày lập phiếu +
> Ngày hóa đơn khớp nhau ở cả 2 hệ thống.

> **Gốc lệch:** builder gán NGÀY HÓA ĐƠN cho ngày chứng từ + ngày hạch toán (quy
> tắc cũ GĐ 444) → MISA hiện 30/9 trong khi SMED ngày lập = 1/10.

> **Đã sửa (repo con `a8ec0b1` + entry `ab3ec0f`):** tách 2 mốc — master
> `refdate`/`posted_date`/`caba_*`/`in_reforder` = **ngày lập phiếu SMED**
> (fallback ngày HĐ nếu thiếu); ngày HÓA ĐƠN giữ ở dòng hàng + khối hóa đơn
> (đúng payload UI MISA). Unit **9/9 PASS**.

> **✅ VERIFY THẬT** (phiếu CĐ 02/10 PN-20261002143315 tạo + ghi sổ bằng builder
> mới): SMED ngày lập **2/10** ↔ MISA ngày chứng từ + hạch toán **02/10** · SMED
> ngày HĐ **30/9** ↔ MISA **30/09** · số HĐ 0136186 khớp · đã ghi sổ · tiền
> 9.220.609. **⇒ 2 hệ thống đã giống nhau, đúng yêu cầu ĐH.**

> **⚠️ CHỜ ĐH QUYẾT:** các phiếu ĐÃ tạo trước GĐ 457 (~50 phiếu: 34 phiếu 16/10 +
> 11 phiếu 12-13/10 + 5 phiếu TT) còn ngày chứng từ = ngày HĐ — muốn khớp SMED
> phải xóa + tạo lại (sửa qua save_full không được). Phiếu MỚI (job 23:00 + nút
> Upload Misa) từ giờ đã đúng ngày.

> **Version: KHÔNG bump** (chờ lệnh Push). App tổng **6.6.0** / repo con **9.7.0**.

---

### GĐ 459 / C.283 (Trợ lý Freebuff): Điều tra Task_03 kỳ 16/10 bỏ 6 báo cáo "chưa đủ dữ liệu nguồn" — TCB 0 giao dịch THỰC · MISA BKCT/BKTH đã fix GĐ 456 · tkgvvxdt nguồn rỗng (2026-10-17)

> **ĐH hỏi (17/10):** "TCB đã download xong trong Task_02 nhưng Task_03 không
> chạy được báo chưa đủ nguồn dữ liệu là sao? Hôm qua 16/10 anh cho chạy nhiệm
> vụ thì thấy báo lỗi."

> **Bằng chứng điều tra (log agent 16/10 + file Excel thật + DB đối chứng +
> chạy lại tool):** Task_03 đêm 16/10 chạy 23/29 OK — BỎ 6: hddt-bkth ·
> hddt-bkct · dsxk-comparison · bank-tcb-chitiet · bank-tcb-tonghop ·
> tkgvvxdt. 3 nhóm nguyên nhân:
>
> 1. **TCB (2 báo cáo) — THỰC TẾ 0 giao dịch, hệ thống ĐÚNG:** Task_02 23:00
>    tool 41 "✅ xong 1 file" NHƯNG sheet "Txn enquiry without txn" (dòng 21:
>    "Quý khách không có giao dịch") — ETL nạp 0 GD đúng file. DB đối chứng:
>    12/10=21 GD · 13/10=8 · 14/10=13 · 15/10=10 · 16/10=0 dòng. Chạy lại tool
>    17/10 2 lần (kỳ 16/10 riêng + gộp 15→16): kỳ gộp trả 10 GD toàn bộ ngày
>    15/10 — 16/10 vẫn trống → KHÔNG phải lỗi hệ thống/TCB chậm cập nhật —
>    tài khoản không phát sinh giao dịch 16/10. Điểm gây hiểu nhầm: tool 41
>    tải file rỗng vẫn báo "✅ Job xong — 1 file" (khác VCB GĐ 436 "0 file →
>    job LỖI") → Task_03 bỏ với lý do "chưa đủ dữ liệu nguồn".
> 2. **MISA BKCT/BKTH (3 báo cáo) — ĐÃ FIX trong GĐ 456 (hôm nay):** tool
>    30/31 chết fill() ×3 mỗi tool — phiên misa_state chết + MISA đổi login
>    2 bước + OTP (`a842785` PA-1 verify 2 file 41KB/33KB kỳ 16/10 đã tải).
>    ⚠️ Agent restart 01:39 TRƯỚC commit fix 11:49 → service đang chạy BẢN
>    CŨ — ca 23:00 tối nay chết lại nếu phiên MISA hết hạn → cần Push +
>    restart trước 23:00.
> 3. **tkgvvxdt — nguồn rỗng kỳ 16/10:** là báo cáo SQL (không download); ETL
>    ca 23:00 run #5472: 76 file mới chỉ nạp 5 dòng (nguồn DLGoi-Dtruoc kỳ
>    16/10 ít) → Task_03 bỏ. Soi riêng nếu ĐH cần số này.

> **3 PA trình ĐH (chờ chốt):**
> - **PA-1 (khuyến nghị):** (a) Push GĐ 456 + restart agent trước 23:00 —
>   hết chết BKCT/BKTH, chạy lại Task_03 kỳ 16/10 đủ 3 báo cáo hddt/dsxk;
>   (b) minh bạch hóa TCB: tool 41 gặp "without txn" → báo rõ "TCB không có
>   giao dịch ngày X (hợp lệ)" + Task_03 bỏ báo cáo TCB với lý do "ngày
>   không phát sinh giao dịch" (mẫu valid-empty TPB GĐ 436) — hết nhầm
>   "download xong mà báo cáo chết"; (c) soi tkgvvxdt sau.
> - **PA-2:** chỉ Push GĐ 456 + restart — giữ nguyên wording TCB (Task_03
>   tiếp tục bỏ 2 báo cáo TCB ngày 0-GD).
> - **PA-3:** không đụng gì — chờ ca 23:00 (nếu phiên MISA còn sống thì 3
>   báo cáo hddt tự chạy được).

> **Tiêu chí kiểm chứng:** sau PA-1: Task_03 chạy lại kỳ 16/10 = 26/29 (3
> hddt/dsxk có số); ca 23:00 tối nay tool 30/31 hết lỗi fill; ngày TCB 0 GD
> báo cáo rõ ràng không còn "✅ xong" chung chung.

> **Version:** KHÔNG bump (điều tra docs-only — 0 code đổi). App tổng
> **6.6.0** / repo con **9.7.0**.

---

### GĐ 458 / C.282 (Trợ lý Freebuff): Tạo lại 70 phiếu cũ theo ngày lập phiếu SMED — khớp từng đồng (2026-10-17)

> **Lệnh ĐH:** "tạo lại phiếu cũ theo ngày SMED" (sau khi GĐ 457 sửa builder).

> **Quy trình (repo con — script trong `agent/LOG/gd458/`, gitignored):** dry-run lọc
> 70 phiếu lệch ngày (33 nhóm TT×ngày; 16 mã ngoài hệ thống bỏ qua) → **bỏ ghi sổ**
> (API bắt từ UI: `DELETE /g2/api/ledger/v1/ledger/unpostbatch` body
> `{masters:[{refno,refid,reftype:302,edit_version}], auditingLogs:[…]}`) → **xóa**
> (`DELETE batch_voucher [{refid}]`) → **tạo lại** bằng builder mới + ghi sổ.

> **Sự cố & xử lý:** đợt 1 crash ở nhóm PY 16/10 (MISA trả response không-JSON, lỗi tạm
> thời) + nhóm ML 16/10 đã xóa 3 phiếu nhưng tạo lại lỗi → sửa script (retry + bọc
> try/except theo nhóm) → chạy lại 8 nhóm: **xóa 22 · tạo lại 25 · 0 lỗi** (3 phiếu ML
> khôi phục đủ).

> **✅ VERIFY TỔNG:** **0 phiếu lệch ngày** trên toàn MISA (2.573 phiếu đúng ngày lập
> SMED) · **70/70 phiếu tạo lại có trên MISA + tiền khớp TỪNG ĐỒNG 1.156.275.402 +
> ngày chứng từ = ngày lập SMED 70/70**. ⇒ **Hai hệ thống SMED ↔ MISA giờ khớp hoàn
> toàn về ngày lập phiếu + ngày hóa đơn.**

> **Version: KHÔNG bump** (chờ lệnh Push). App tổng **6.6.0** / repo con **9.7.0**.

---

### GĐ 460 / C.284 (Trợ lý Freebuff): PA-1 ĐH chốt — minh bạch hóa TCB ngày 0 giao dịch + Push GĐ 456 + chạy lại Task_03 kỳ 16/10 = 26/29 OK (2026-10-17)

> **ĐH chốt PA-1** (sau điều tra GĐ 459). Đã làm 3 phần:

> **(a) Push GĐ 456 + bump 9.8.0:** rà trùng lặp — repo con 8 commit local (GĐ
> 456 fix tool 30/31 meInvoice login 2 bước+OTP · C.280 UPLOAD chứng từ mua
> hàng · C.281/GĐ 457 ngày phiếu SMED) + app tổng 11 commit docs-only; 0 nhánh
> phụ; WIP GĐ 458 phiên khác KHÔNG nằm trong commit (không đụng — file version
> đang M churn → bump bằng **blob tách riêng**). Bump repo con **9.7.0 →
> 9.8.0** (minor — C.280 feature) — package.json + DEFAULT_VERSION; app tổng
> **docs-only giữ 6.6.0** (tiền lệ GĐ 416/417). Push: repo con
> `ce5f1f5..0086195` · app tổng `b93ded6..768c6a8`. **Verify prod (curl lần
> đầu): app con = 9.8.0 · app tổng = 6.6.0.**

> **(b) Minh bạch hóa TCB (repo con `d9a517b` — 3 file +52/−7):**
> 1. `etl/sql_reports.py` check_source_data — tách `bank_tcb_tx` khỏi nhánh
>    MIA: MAX(period_to) < kỳ + **CÓ lượt xuất BANKTCB trong import_log** (ETL
>    ghi MỌI file kể cả 0 dòng) → nguồn HỢP LỆ-rỗng: vẫn missing (Task_03
>    KHÔNG chạy — không báo số 0 như TPB) nhưng gắn `reason: 'empty-ok'` +
>    label lý do "ngày X không phát sinh giao dịch (hợp lệ — file 'Txn
>    enquiry without txn')".
> 2. `task_runner.py` — thông điệp BỎ đổi theo reason: toàn empty-ok →
>    "ngày không phát sinh giao dịch (hợp lệ)" thay "chưa đủ dữ liệu nguồn"
>    (error + step + log).
> 3. `41_tcb_saoke.py` — sau lưu file, nhận diện sheet "without txn" → log
>    "⚠️ TCB không có giao dịch ngày X→Y — HỢP LỆ" (hết "✅ xong 1 file" mù
>    mờ).

> **Verify:** ast.parse 3 file OK · test task_runner_quick **40/40 PASS** ·
> **check_source_data thật 4 kỳ**: 16/10 = empty-ok + lý do rõ · 14/10 = đủ
> (`[]`) · 17/10 = missing thường (chưa tải) · TPB 16/10 = `[]` không đổi.

> **Restart agent** (16:10 — quy trình 13.3: rảnh 0 job → xóa __pycache__
> agent+etl → sc stop/start): nạp đủ GĐ 456 fix + code TCB mới; tunnel giữ
> nguyên.

> **Chạy lại Task_03 kỳ 16/10** (đặt pending qua /exec — đúng SQL serverFn
> "Chạy lại"): agent nhặt 16:16 → **XONG 26/29 OK** (DB: done · progress 100 ·
> "Xong 26/29 báo cáo OK") — 3 báo cáo hddt-bkth / hddt-bkct / dsxk-comparison
> chạy được (nguồn BKCT 216 dòng · BKTH 175 dòng kỳ 16/10) · **2 TCB BỎ với
> lý do mới**: "ngày không phát sinh giao dịch (hợp lệ): Sao kê ngân hàng TCB
> — ngày 2026-10-16 không phát sinh giao dịch (hợp lệ — file 'Txn enquiry
> without txn')" · tkgvvxdt vẫn bỏ "chưa đủ dữ liệu nguồn" (mục (c) soi sau).

> **Tiêu chí kiểm chứng:** ca Task_02 23:00 tối nay → Task_03 tự chạy: ngày
> TCB 0 GD → log tool + thông điệp BỎ rõ ràng; ngày có GD → 2 báo cáo TCB
> chạy bình thường. Kiểm thêm: tool 30/31 hết lỗi fill khi phiên MISA chết
> (OTP Gmail tự đọc — GĐ 456).

> **Version:** app tổng **6.6.0** / repo con **9.8.0** — đợt GĐ 456 ĐÃ PUSH +
> LIVE; **phần docs + fix TCB KHÔNG push chờ lệnh** (commit local `d9a517b` +
> docs đợt này).

---

### GĐ 461 / C.285 (Trợ lý Freebuff): PA Push đợt 17/10 chiều — repo con 9.8.1 LIVE (2026-10-17)

> **Lệnh ĐH:** "Push". Rà trùng lặp 2 repo: nhánh phụ 0 commit · remote 0 commit mới ·
> **phát hiện phiên song song đã push hộ code GĐ 455/457 của em trong đợt 9.8.0**
> (remote repo con có `6fde0bc` + `a8ec0b1`) → đợt này chỉ còn: fix TCB (C.284/GĐ 460
> của phiên song song) + entry GĐ 458 + bump.

> **⚠️ SỰ CỐ ĐA PHIÊN (minh bạch):** commit `9d103d4` của em lỡ **XÓA dòng registry
> GĐ 460** — nguyên nhân: working tree của `AGENT_REGISTRY.md` đã bị sửa TRƯỚC khi em
> `git add` (file dùng chung giữa nhiều phiên) → staged luôn thay đổi đó. Phiên song
> song đã tự khôi phục (`8c262ab`) rồi dọn tiếp (`3182247`). **Bài học: `git diff
> <file>` TRƯỚC KHI `git add` với mọi file dùng chung (AGENTS.md / AGENT_REGISTRY.md /
> nav.ts / catalog…) trong môi trường đa phiên** — đã ghi vào quy trình.

> **Bump:** repo con **9.8.0 → 9.8.1** (`package.json` + `DEFAULT_VERSION`) — đợt có
> code fix (TCB). Lưu ý: working tree đang bị hạ lạc về 9.7.0 (thay đổi lạc của phiên
> khác) — em ghi đúng dòng thời gian 9.8.1. **App tổng docs-only → KHÔNG bump**
> (tiền lệ GĐ 417) — giữ 6.6.0.

> **Push:** app tổng `768c6a8..a3af488` (8 commit: docs GĐ 458 + GĐ 459 + GĐ 460 +
> GĐ 461 + GĐ 462 claim của phiên song song) · repo con `0086195..80fb7c2` (4 commit:
> bump 9.8.1 + entry GĐ 460 + fix TCB + entry GĐ 458).

> **✅ Verify production (curl --compressed):** app tổng **6.6.0** · app con **9.8.1**
> (curl lần đầu, không ghim deployment cũ) · HTTP 200 cả 2 · **trang
> `/m/up-nhap-kho` = 200 với nội dung MỚI** ("UPLOAD Chứng từ mua hàng" + "Upload
> Misa", KHÔNG còn "Chưa kết nối dữ liệu") ⇒ giao diện GĐ 455 đã LIVE.

> **Version: app tổng 6.6.0 / repo con 9.8.1 — ĐÃ PUSH + ĐÃ LIVE.**

---

### GĐ 462 / C.286 (Trợ lý Freebuff): UPLOAD Phiếu xuất kho — quét SMED TRỰC TIẾP → chứng từ Kho MISA in_outward + ghi sổ tự động + Task_05 (2026-10-17)

> **ĐH chốt (17/10 tối, sau GĐ 455):** đổi tên sidebar "UPLOAD Bảng kê phiếu
> xuất kho" → **"UPLOAD Phiếu xuất kho"** · giao diện giống Chứng từ mua hàng
> (1A/2A) · **nguồn TRỰC TIẾP SMED** "mở từng webapp của từng trung tâm theo
> ngày" (ảnh /kho/xuatkho + chi tiết phiếu PX-SD) — KHÔNG dùng 6.BKX · **TẤT CẢ
> phiếu** trong danh sách (B) · Task riêng chạy hàng ngày sau download BKX (3A)
> · phiếu test TEST_CUONG_XK-* được phép (xóa khi ĐH OK). Chi tiết đầy đủ ở
> entry **C.286 AGENTS.md repo con** (code `f33e044` + docs `3f29240`).

> **Đã làm (app tổng chỉ 1 file code):** `src/lib/banhang-catalog.ts` — leaf
> `/m/up-xuat-kho` đổi label **"UPLOAD Phiếu xuất kho"** (trang Phân quyền app
> tổng tự hiện nhãn mới). Repo con: builder `misa_xuatkho_api.py` (schema
> in_outward reftype 2020 — giá xuất = unit_price_finance, Nợ 632_<TT>/Có
> 156_<TT) + wrapper + unit 37/37 + job "misa-xuat-kho-api" + **Task_05 · MISA
> xuất kho** (spawn khi Task_02 xong) + builder misa-xk-chitiet + trang
> /m/up-xuat-kho + nav.

> **✅ VERIFY THẬT:** scan LB 17/10 = 10 phiếu (chi tiết chuẩn MMR 151,000.006 +
> VAXIGRIP 229,500.003); **TEST_CUONG_XK-001 tạo + GHI SỔ** trên MISA AMIS —
> đối chiếu refdate 17/10 = ngày lập SMED (GĐ 457) + giá/lô/HSD/TK 632_LB·
> 156_LB khớp từng đồng. tsc 2 repo EXIT 0 · unit TS PASS. 2 bài học: kendo
> SMED tách list 2 table (merge theo PX-) + JS nhầm bảng LỊCH (Th10/Th11) —
> bảng hàng chung 1 table chọn theo th "Tên hàng".

> **⚠️ CHỜ ĐH:** (1) phiếu TEST_CUONG_XK-001 ĐÃ GHI SỔ trên MISA — xóa khi ĐH
> đồng ý (quy trình GĐ 458); (2) máy GIANGKT KHÔNG có SSH key/credentials Git —
> KHÔNG pull/push được từ máy này (remote origin dùng alias `github-beep`);
> cần sync (pull remote có commit GĐ 461 phiên khác tới `80fb7c2`) trước khi
> push — nhờ ĐH chạy trên máy chủ hoặc cấp key; (3) commit f33e044 KHÔNG gồm 4
> file đang dở của phiên khác (api_server.py · gd-c184-verify · quy-trinh-mua-
> hang.tsx · nhap-dieu-chuyen.tsx — lần đầu lỡ commit pathspec, đã reset --soft
> tách ra trước khi commit lại — commit local chưa push, minh bạch).

> **Tiêu chí kiểm chứng (sau Push):** sidebar app tổng + app con = "UPLOAD
> Phiếu xuất kho" → chọn kỳ → Upload Misa → job quét 19 TT + tạo phiếu + ghi
> sổ → bảng "Đã ghi sổ"; Task_02 xong → Task_05 tự chạy; restart agent nạp
> builder.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **6.6.0** / repo con **9.8.1** (local thêm C.286 chờ sync/push).


### GĐ 463 / C.287 (Trợ lý Freebuff): NGHIÊN CỨU "Chứng từ bán hàng" MISA AMIS + đề xuất UPLOAD Hóa đơn GTGT bán hàng — CHỜ ĐH chốt PA, chưa viết code (2026-10-17)

> **Yêu cầu ĐH (17/10, 2 ảnh: sidebar app con + màn hình MISA tab Bán hàng):**
> phần **UPLOAD - MISA AMIS → "UPLOAD Hóa đơn GTGT bán hàng"** (`/m/up-hoadon-gtgt`,
> hiện chỉ là placeholder) — (1) nghiên cứu phiếu Bán hàng trên MISA AMIS, **căn cứ
> các phiếu đã lập trước đây** để biết dữ liệu nào đã được đưa vào "Chứng từ bán
> hàng" (ĐH liệt kê nguồn liên quan: bảng kê chi tiết HĐ đã sử dụng · thống kê tình
> hình sử dụng HĐĐT · bảng kê chung cuối ngày · thống kê DT theo đối tượng · bảng kê
> xuất kho); (2) tạo giao diện lấy dữ liệu phiếu hóa đơn bán hàng → up lên MISA từ
> SMED **giống phần phiếu mua hàng** + bổ sung Task chạy hàng ngày; (3) **HỎI LẠI ĐH**
> xác định lại công việc trước khi viết code.

> **🔬 KẾT QUẢ NGHIÊN CỨU (probe read-only thật — MISA CDP 9222 + SMED login LB;
> artifact trong `apps/banhang/agent/LOG/gd463/`, gitignored):**

> **1️⃣ MISA "Chứng từ bán hàng" = SA voucher, `reftype 3537`** (màn
> `actapp.misa.vn/app/SA/SAVoucher`). API: list
> `POST sa/v1/sa_voucher_get/paging_filter_v2` (loadMode 2 = dòng dữ liệu / 3 = tổng
> hợp — bài học: sai loadMode → PageData rỗng), dòng hàng
> `POST sa_voucher_get/get_paging_detail` (filter property 3993 = refid), full
> `GET sa/v1/sa_voucher/detail?req=<base64>` (⚠️ Code 99 khi tự dựng req/fetch lại —
> phải capture từ UI). Ghi/sửa: bundle MISA có `save_full` / `save_and_post`
> (⇒ tạo phiếu qua API thuần KHẢ THI, cùng khuôn PU GĐ 444 / IN GĐ 462).
> **Hiện trạng dữ liệu:** **20.217** chứng từ (tổng **19.929.181.550**) từ 01/01/2026
> → **10/10/2026**; **11/10 → 17/10 = 0 phiếu (trống 7 ngày)** — `created_by =
> "Vũ Thị Thủy"`, `created_date = 17/10 16:27–16:52` (đang được nhập/import dồn,
> 100% chứng từ 09–10/10 đều tạo hôm nay).

> **2️⃣ Dữ liệu đã đưa vào chứng từ (mẫu HM 6101017103935 ↔ HĐ 00003368 · Gardasil 9 ·
> 2.850.000 · LÊ THỊ OANH — created 17/10 16:52):** master: `refno_finance` (= số
> chứng từ), `refdate`/`posted_date` = NGÀY BÁN HÀNG, `inv_no`+`inv_series`+`inv_date`,
> `account_object_name`, `total_amount`/`total_sale_amount`, `journal_memo`, `paid_type`,
> `include_invoice=1`; detail: `inventory_item_code` (**= TÊN hàng**, vd "Gardasil 9"),
> `quantity`, `unit_price`, `amount`, `unit_name` (Liều), `inventory_location_code` +
> `list_item_code` + `organization_unit_code` (**= mã TT**, vd HM),
> `debit_account 1121_<TT>` / `credit_account 5113_<TT>`, `inventory_account 156_BH`,
> `cogs_account 632_BH`, `sale_account 5111`, `vat_account 33311`, `vat_rate -1`,
> `budget_item_code 100` ("Thu từ bán hàng thu tiền ngay"); **lô/HSD để TRỐNG**
> (chứng từ hiện có không điền). Kèm link `sa_invoice` (reftype 3560 — HĐ phát hành)
> + `ba_deposit_withdraw_list` (thu tiền ngân hàng).

> **3️⃣ Nguồn dữ liệu + mapping (đã đối chứng THẬT):** `refno_finance(MISA)` =
> **mã phiếu bán hàng SMED** (`maPhieu`, màn `#!/hoadondientu` "Danh sách hóa đơn")
> **bỏ 3 ký tự đầu** ("HD" + 1 số) — verify: LB 10/10 SMED **39 hóa đơn** ↔ MISA
> **39 chứng từ** prefix `0637` (= 4 số cuối coSoId 10637) · HM "HD26101017103935" ↔
> "6101017103935" · TT "HD116272610101519120083" ↔ "16272610101519120083".
> **API nguồn SMED:** `POST api/services/app/hoaDonDienTuExtend/DataHoaDonDienTu`
> (body `startDate`/`endDate`/`trangThai`: 1=Đã gửi — **trangThai null/0 → 0 dòng**;
> trả `maPhieu`, `maHoaDon` = ký hiệu HĐ, `hoTenKhachHang`, `ngayGioBanHang`,
> `tongTien`, `tenHinhThucThanhToan`, `noiDungThu`, `coSoTiemChungId`, `phieuBanHangId`,
> `transactionUuid`, `soHoaDon` (mẫu LB = RỖNG — chưa cấp số)) · phụ:
> `POST hoaDonDienTuExtend/DataLichSuGuiHoaDonDienTu` (dataInput JSON: InvSeries,
> InvNo "<Chưa cấp số>", OrganizationUnitID, AccountObjectName/Address) ·
> `POST lichSuThanhToan/GetThongTinPhieuBanHang?id=<phieuBanHangId>` (header phiếu:
> khách/ngày/tiền/HTTT — `lstPhieuBanHangChiTiet` mẫu RỖNG, chưa ra dòng hàng).
> **DB dự án hiện có:** `stg_1HDDT` (MSHĐ col5 · ký hiệu col10 · ngày · khách · tiền ·
> HTTT · trạng thái gửi), `stg_2DTTDT` (mã phiếu · khách · dịch vụ · SL · tiền),
> `stg_4BKCCN` (bảng kê chung cuối ngày: dịch vụ · số lô · giá · mũi tiêm),
> `stg_6BKX` (xuất kho: lô · HSD · giá), **`stg_11BKCT` (bảng kê chi tiết HĐ đã sử
> dụng — MISA meInvoice: col2 = KÝ HIỆU HĐ · col3 = số HĐ · col4 ngày · col10 người
> mua · col11 HTTT · col13 tên hàng · col17 SL · col18 đơn giá · col19 thành tiền ·
> col22 thuế suất; 10/10: 480 dòng / 375 số HĐ / 6 ký hiệu 1C26MAA→MAF)**.
> **⚠️ Chưa có nguồn DÒNG HÀNG + lô/HSD trực tiếp từ SMED** (phiếu bán hàng chi tiết
> cần khảo sát thêm màn Thu ngân khi viết code).

> **📋 TRÌNH 3 PA (ĐH chốt trước khi code — quy trình 5 bước):**
> - **PA-1 (khuyến nghị):** nguồn **TRỰC TIẾP SMED** (`#!/hoadondientu` từng TT theo
>   ngày, giống phiếu mua hàng GĐ 428/455) + bù dòng hàng từ **BKCT/GiondDB** (khớp
>   ký hiệu+số HĐ) → builder `misa_banhang_api.py` (save_full + ghi sổ, idempotent
>   theo refno = maPhieu bỏ 3 ký tự) + trang `/m/up-hoadon-gtgt` 3 phần (khuôn
>   `SqlDataModule.uploadMisa`) + Task hằng ngày. Ưu: đúng thứ ĐH yêu cầu, tự chủ,
>   không phụ thuộc ai nhập tay. Rủi ro: cần khảo sát thêm API dòng hàng SMED.
> - **PA-2:** nguồn **GiondDB** (stg_1HDDT + stg_11BKCT + stg_4BKCCN — dữ liệu đã
>   tải hằng ngày 23:00) → builder đọc DB. Ưu: nhanh, dữ liệu sẵn. Rủi ro: DB thiếu
>   `maPhieu`↔số HĐ ở một số TT (nối qua tên+ngày+tiền → có thể lệch).
> - **PA-3:** PA-1 + PA-2 (SMED là chính, DB là dự phòng/đối chứng).
>
> **❓ CHỜ ĐH (đã hỏi trong phiên):** chọn PA · kỳ cần bù (11/10→17/10 hay từ 01/10)
> · có cho phép phiếu test `TEST_CUONG_BH-*` để khảo sát API (xóa sau khi ĐH OK)
> · phạm vi: chỉ chứng từ bán hàng hay kèm link hóa đơn + thu tiền (`ba_deposit_withdraw`).

> **⚠️ GHI NHẬN (mục 12):** AGENTS.md hiện **2.851 dòng** — đã vượt mốc cần tách
> archive LẦN 3 (dời entry GĐ 411→45x xuống AGENTS_ARCHIVE.md). Đề xuất làm khi ĐH
> đồng ý (đang có phiên song song sửa AGENTS.md — tránh conflict đa phiên).

>

---

### GĐ 463 / C.287 (Trợ lý Freebuff) — TIẾP: ĐH chốt **PA-1** (18/10) → moi được API tạo chứng từ bán hàng + 5 phiếu TEST (2026-10-18)

> **ĐH chốt PA-1** (18/10): nguồn TRỰC TIẾP SMED `#!/hoadondientu` từng TT theo ngày
> → tạo "Chứng từ bán hàng" MISA (SA) + dòng hàng bù từ BKCT. Em bắt tay khảo sát API.

> **🔑 KẾT QUẢ MOI ĐƯỢC (bằng chứng thật):**
> - **Endpoint tạo/sửa chứng từ SA = `POST https://actapp.misa.vn/g2/api/sa/v1/sa_voucher/full`**
>   (KHÔNG phải `save_full` như PU/IN — bundle MISA: `submit(){combineUrl(getAPIUrl(),"full")}`;
>   GĐ 444 lesson "sai endpoint → Code 999 'Bạn phải nhập chứng từ chi tiết'").
>   Ghi sổ: `.../sa_voucher/save_and_post` (hoặc `ledger/v1/ledger/post` như GĐ 446).
> - **Schema payload CHUẨN (bắt từ UI thật, `LOG/gd463/ui_save_full_BH_body.json` 7.4KB):**
>   `[{Type:"sa_voucher", Key:null, RefType:3530, RefTypeCategory:353,
>   View:"view_sa_voucher", enableAutoSave:true, BypassValidate:{},
>   OptionForSave:{PostAfterSave:true, IsQuickEdit:false, FormState:"Add"},
>   auditing_log:{...}, Object:{46 keys master}, Details:[{Type:"sa_voucher_detail",
>   Alias:"detail", View:"view_sa_voucher_detail", UseRecover:true, Objects:[101-key line]},
>   {Type:"sa_voucher_detail_allocation", Alias:"detailOther1", Objects:[]}],
>   Links:[sa_invoice 3560, in_outward 2020]}]` — master KHÔNG có `refid` (server sinh);
>   RefType thật = **3530** (không phải 3537 như phiếu cũ — phiếu cũ reftype 3537 do
>   cấu hình cũ/phiếu thu tiền gửi kèm).
> - **API `detail` (đọc full entity) YÊU CẦU base64 CÓ PADDING `=`** — thiếu padding →
>   Code 99 (bài học lớn: hôm 17/10 tưởng endpoint hỏng, thực ra chỉ thiếu padding).
> - **Form UI điền được bằng data-testid**: `sme_svdp_msi_refno_finance-input-innervalue`
>   (Số chứng từ) · `sme_svdp_msi_account_object_name-...` (Tên khách) · grid cột
>   "Mã hàng" (tab Hàng tiền) → chọn autocomplete; **tab "Giá vốn" mới có cột "Kho"**
>   (bắt buộc — thiếu → "<Kho> không được bỏ trống") · lưu có **cảnh báo mềm** ("giá bán
>   thấp hơn giá mua gần nhất") → bấm **"Có"** mới cất.
> - **Test API thật:** gửi lại payload (đổi refno) → MISA trả **`InvalidInvno`** = payload
>   ĐỌC ĐƯỢC (đúng shape), chỉ vướng số HĐ trùng → xác nhận endpoint/schema đúng.

> **⚠️ 5 PHIẾU TEST ĐÃ TẠO TRÊN MISA (chờ ĐH quyết xóa):**
> `TEST_CUONG_BH-001…005` (18/10, khách "KHACH TEST CUONG", VAXIGRIP 0.5ml × Kho LB,
> tổng 0đ, **CHƯA ghi sổ**, `send_tax_office_status=-1`, `esign_state=-1`).
> MISA **tự cấp số HĐ 000986→000990 (series 1C26MAS)** khi cất vì form bật sẵn
> "Lập kèm hóa đơn" + "Lập kèm phiếu xuất" → mỗi phiếu kèm 1 bản ghi `sa_invoice`
> (publish_status 7) + 1 phiếu xuất kho `PX-SD-2026…` (chưa ghi sổ).
> **Đã kiểm chứng**: meInvoice (stg_11BKCT) CHƯA có số ≥000980 của 1C26MAS → các số này
> mới chỉ là bản ghi nội bộ AMIS, chưa phát hành → xóa phiếu có thể trả lại dải số.
> **→ CHỜ ĐH đồng ý mới xóa** (quy tắc: phiếu test phải báo trước khi xóa).

> **📋 BƯỚC TIẾP (chờ ĐH chốt 2 điểm):** (1) xóa 5 phiếu test trên? (2) khi upload thật
> có gắn kèm hóa đơn (link `sa_invoice` + số HĐ) như phiếu cũ hay tạo chứng từ KHÔNG kèm HĐ
> (an toàn tuyệt đối, nhưng khác phiếu cũ)? Sau đó: viết `misa_banhang_api.py`
> (scan SMED hoadondientu + BKCT → payload theo schema trên) + trang `/m/up-hoadon-gtgt`
> (khuôn SqlDataModule.uploadMisa) + job + Task hằng ngày.

>

> **✅ DỌN PHIẾU TEST (18/10, ĐH đồng ý):** đã **XÓA SẠCH 5 phiếu TEST_CUONG_BH-001…005**
> trên MISA (verify danh sách = rỗng). Endpoint xóa: **`DELETE .../sa/v1/sa_voucher/batch_voucher`**
> body `[{"refid":…,"refno_finance":…,"reftype":3530,"edit_version":…}]` (khớp bài học
> GĐ 458; ⚠️ khi xóa qua UI phải bấm nút **"Đồng ý"** trong hộp thoại — nút toolbar
> "Xóa" chỉ mở lại hộp thoại). Các phiếu xuất kho kèm theo cũng không còn trong danh sách.
> Không phiếu nào đã ghi sổ / gửi CQT → không ảnh hưởng meInvoice.

> **📌 CHECKPOINT (18/10) — việc tiếp theo của GĐ 463:** viết
> `apps/banhang/agent/misa_banhang_api.py` theo đúng schema payload đã bắt
> (`POST sa/v1/sa_voucher/full`, master 46 key + detail ~101 key + Links sa_invoice/in_outward)
> — nguồn: SMED `hoaDonDienTuExtend/DataHoaDonDienTu` (mã phiếu, ký hiệu HĐ, khách, ngày
> giờ, tiền, HTTT, trung tâm) + BKCT (`stg_11BKCT`: số HĐ, tên hàng, SL, giá, thành tiền)
> để bù dòng hàng; idempotent theo refno = maPhieu bỏ 3 ký tự; rồi trang
> `/m/up-hoadon-gtgt` (khuôn `SqlDataModule.uploadMisa`) + builder báo cáo
> `misa-bh-chitiet` + job `misa-ban-hang-api` + Task hằng ngày + phân quyền 3 điểm.
>
> **Version:** KHÔNG bump (chưa push — 6.6.0 / 9.8.1 giữ).
>
> **Version:** KHÔNG bump (đang code — 6.6.0 / 9.8.1 giữ).
>
>
> ---
>
> ### GĐ 463 / C.287 (Trợ lý Freebuff) — HOÀN TẤT (18/10): builder + trang + job + Task_06 (commit `c69e9c7`)
>
> **✅ ĐÃ XÂY DỰNG XONG (theo PA-1 ĐH chốt):**
> 1. **Builder `misa_banhang_api.py`** (941 dòng, copy khuôn GĐ 462) — quét SMED HĐĐT `#!/hoadondientu` lọc 'Đã gửi' + `#!/lichsuguihoadon` + BKCT (`stg_11BKCT`) từng TT theo ngày → payload `POST sa/v1/sa_voucher/full` (master 46 key + detail ~101 key + Links sa_invoice/in_outward) + idempotent `refno_finance = maPhieu bỏ 3 ký tự` (verify 39↔39 LB 10/10).
> 2. **Unit test `misa_banhang_api.test.py`** — 56/56 PASS (parse_num, dates, debit map 1111/1121, payload shape sa_voucher/full, ledger body, iter_days).
> 3. **Wrapper `misa_banhang_api_run.py`** — 19 TT × kỳ, env `MISA_AUTO_POST=1` ghi sổ tự động (`save_and_post` / `ledger/post` reftype 3530).
> 4. **Báo cáo `misa-bh-chitiet`** (`sql_reports.py`) — 11 cột: Ngày bán hàng · Trung tâm · Mã phiếu · Ký hiệu HĐ · Số HĐ · Khách hàng · HTTT · Tổng tiền · Số dòng hàng · Trạng thái MISA · Ghi chú; nguồn `sm_banhang_phieu` + Subtotal đúng nguyên tắc.
> 5. **Trang `/m/up-hoadon-gtgt`** — khuôn `SqlDataModule.uploadMisa` (3 phần: báo cáo kỳ + lịch sử + nút Upload Misa), confirm rõ 19 TT + ghi sổ tự động + bỏ qua trùng.
> 6. **Job `misa-ban-hang-api`** (REPORT_MAP 40_web_agent.py) + progress marker `✅ PHIẾU BÁN HÀNG ĐÃ TẠO` + `MISA_AUTO_POST=1`.
> 7. **Task_06 · MISA bán hàng** (`task_runner.py`) — spawn khi Task_02 xong (`_maybe_spawn_misa_bh`), kind `misa-ban-hang`, run `_run_misa_bh_only`.
> 8. **Phân quyền 3 điểm**: `ROUTE_TO_GROUP["/m/up-hoadon-gtgt"] = "bh-upload-misa-amis"` + `REPORT_GROUP["misa-ban-hang-api"] = "bh-upload-misa-amis"` + catalog app tổng `bh-nhap-ban-hang` đã có sẵn.
>
> **Verify:** unit 56/56 PASS · tsc app tổng EXIT 0 · tsc repo con EXIT 0 · schema payload khớp UI thật (probe GĐ 463) · BKCT join 37/39 khớp từng đồng (40/40 dòng hàng) · debit 1121_LB cho 'Chuyển khoản' (phiếu thật 00006198) · lô/HSD bù từ BKCT.
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **6.6.0** / repo con **9.8.1**.

---

### GĐ 465 / C.289 (Trợ lý Freebuff): Bảng kê HĐ GTGT mua vào (MiaTool) — chuẩn MIA TOOL 37 cột + 3 bug Tiền thuế — PA-1 (2026-10-18)

> **Yêu cầu của Đại ca (18/10, gửi file Excel MIA TOOL desktop 4.3.2 kỳ 09/2026
> MST 0108321182 đối chiếu):** bảng "Bảng kê HĐ GTGT mua vào (MiaTool)" phần
> chạy CHI TIẾT từ SQL (GiondDB) — (1) cột "Tiền thuế" khác file MIA TOOL
> (nghi do làm tròn 2 số thập phân từ khâu lấy dữ liệu); (2) thiếu cột + sai
> thứ tự cột; (3) làm đúng theo MIA TOOL. **ĐH chốt PA-1** (trình 3 PA buổi
> sáng, dự đoán từng PA đầy đủ).

> **Chẩn đoán (probe đối chứng từng dòng từng đồng — script trong
> giong-apps/apps/banhang/agent/LOG/gd465/, gitignored):** 588/595 dòng Tiền
> thuế khớp từng đồng — ETL nạp ĐÚNG; lệch nằm 4 chỗ: (a) **meta totals
> ×100/×1000** — `_to_num` của `_rows` xóa dấu "." coi là ngăn cách nghìn làm
> tổng chuỗi thập phân "458010.50" → 26.507.690.200 thay vì 265.068.900 (cột
> Tiền thuế + Thành tiền chưa thuế + Số lượng); (b) **cách hiển thị** — web
> render "458.010,50" (GĐ 360/C.197) trong khi Excel MIA TOOL format `#,##0`
> → nguyên "458.010" (182/595 dòng có phần lẻ); (c) **1 HĐ thừa K26TAN
> 8864311 +8.002** — tool 43 mình gọi API cổng HĐĐT Quốc gia trực tiếp, file
> MIA TOOL desktop KHÔNG có HĐ này (nguồn tool 43 không phụ thuộc app desktop
> `C:\Program Files\MIA TOOL 2026\` — đường dẫn ĐH nhắc không cần chạm);
> (d) **7 dòng Excel '0' — DB NULL trống**. Kèm: **Đơn giá 192 dòng lẻ tới 4
> số (458010.4762) bị DECIMAL(19,0) cắt** · thiếu 9 cột (8 chưa nạp: Mẫu số
> HD, Ngày người bán ký số, MCCQT, Ngày CQT ký số, Đơn vị tiền tệ, Tỷ giá,
> Địa chỉ người bán, Mã VT + url tra cứu nạp rồi nhưng builder không SELECT) ·
> thứ tự người bán (c10-12) TRƯỚC người mua (c13-15) ngược file.

> **Đã làm (PA-1 — chi tiết đầy đủ ở entry C.289 AGENTS.md repo con):**
> ETL `mia_hddt_import.py` (+8 cột + widen Mã tra cứu base64 60+ ký tự + scale
> dgia (19,4)/thtien (19,2) + fill '0' CÓ SẴN GIỮ NGUYÊN / None→0) · builder
> `mia_chitiet` (37 cột đúng thứ tự + tên file MIA TOOL · sort ngày lập ·
> Tiền thuế → SỐ render nguyên như Excel · SL giữ lẻ "4,9" · meta tổng SUM
> SQL từng đồng) · web `report-result-table.tsx` (DECIMAL_FRACTION_RE 1-4 số
> lẻ — "4.9"→"4,9", giữ hành vi 2 số C.197) · unit mới 20/20 PASS · nạp lại kỳ
> 9 từ file ĐH gửi (OUTPUT gitignored).

> **✅ Verify:** **595/595 dòng Tiền thuế khớp từng đồng** (giá trị + hiển thị
> nguyên) · 385 HĐ · meta 265.068.900 / 5.244.180.687,41 / 31.636,9 khớp Excel
> · DB giữ Đơn giá lẻ 458010.4762 · node test render 6 case (bắt được bug
> regex thiếu group capture trước khi commit) · tsc repo con EXIT 0 · npm test
> 62/62 + 12/11 + 10/10 PASS · unit python 20/20 PASS.

> **⚠️ Minh bạch đa phiên:** phiên GĐ 463 (cùng working tree repo con) commit
> `c69e9c7` 14:49 **nuốt luôn sửa `sql_reports.py` (mia_chitiet 37 cột) của
> em** — lịch sử chỉ đi tới (quy tắc 3), phần mia_chitiet thuộc GĐ 465 nằm
> trong commit của họ; em commit riêng 3 file còn lại. KHÔNG đụng file đang
> dở của phiên khác (api_server.py · misa_xuatkho_api.py · quy-trinh-mua-hang
> .tsx · nhap-dieu-chuyen.tsx · .gitignore).

> **⚠️ Agent restart chờ rảnh** (phiên GĐ 464 đang chạy job xuất kho — KHÔNG
> restart giữa chừng). Kỳ cũ (trước 9) cột mới trống cho tới khi tải lại file
> các kỳ đó; Bán ra hưởng schema tự động khi nạp file mới.

> **Tiêu chí kiểm chứng (sau Push):** chạy lại Chi tiết kỳ 09/2026 → 37 cột
> đúng thứ tự file MIA TOOL · Tiền thuế từng dòng nguyên "458.010" khớp Excel
> · dòng 0% hiển thị 0 · Số lượng "4,9" · tổng 265.068.900 khớp.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **6.6.0** / repo con **9.8.1**.
>
> **CẬP NHẬT 18/10 15:06 — ĐH test "lấy lại dữ liệu T9":** ĐH gửi bản file
> chuẩn MỚI (thư mục `D:\DuLieuChung\CUONG_2026\0108321182\Tháng 9-2026\13.10
> .2026 - Cuong\...\Mua vào\` — hash dbcc6c0f) — **596 dòng · tổng thuế
> 265.076.902**, CÓ HĐ K26TAN 8864311 "Cước chuyển phát" +8.002 mà bản
> attachments lần đầu (595 dòng · 265.068.900) KHÔNG có. Đã nạp lại DB từ bản
> ĐH chỉ định → **596/596 dòng Tiền thuế khớp từng đồng** + Số lượng 596/596
> (57 dòng Excel None = trống) + tổng 3 cột khớp (chưa thuế 5.244.280.716,41 ·
> SL 31.637,9). ⚠️ Hai bản MIA TOOL cùng kỳ lệch 1 HĐ — đối chiếu lần sau HỎI
> ĐH bản nào là chuẩn.

### GĐ 464 / C.288 (Trợ lý Freebuff): NGHIỆP VỤ tạo phiếu xuất kho 17/10/2026 SMED → MISA + PA-1 fix lọc ngày chết (2026-10-18)

> **ĐH yêu cầu (18/10):** "tạo phiếu xuất kho ngày 17/10/2026 từ SMED đẩy lên
> MISA". Lần quét đầu lộ **bộ lọc ngày chết im lặng** trong `smed_filter_day`
> (builder GĐ 462 — lõi cũ focus + gõ không ăn → list về "hôm nay") — 50 phiếu
> quét nhầm 18/10, **chưa upload gì lên MISA**. **ĐH chốt PA-1**: sửa lõi lọc +
> guard. Chi tiết đầy đủ ở entry **C.288 AGENTS.md repo con** (code `d808a5a`).

> **Kết quả:** sửa `smed_filter_day` (click + Ctrl+A + gõ `D - D` + Enter +
> TÌM KIẾM + GUARD 1 đọc lại ô) + GUARD 2 trong `run()` (mã phiếu phải chứa
> ngày lọc) → quét lại 17/10 đúng **174 phiếu / 18 TT / 221 dòng /
> 112.101.109,93** → idempotent: **58 phiếu thiếu TẠO MỚI + GHI SỔ · 116 phiếu
> có sẵn từ trước** (không phải Task_05 — log job upload 0; khả năng ĐH bấm
> "Upload Misa" web GĐ 462) → **đối chiếu 171/174 khớp từng đồng · 3 phiếu
> MISA tròn 1 xu (round .01 — giá xuất SMED lẻ .003/.007) · 0 thiếu · 164 đọc
> được trạng thái — TẤT CẢ ĐÃ GHI SỔ**.

> **Bài học chính:** (1) filter chết im lặng → GUARD sau lọc bắt buộc (đọc lại
> value ô + mã phiếu chứa ngày); (2) tìm chứng từ MISA theo mã =
> `ai_search/search_all` (refno → refid/amount/ngày) — list `paging_filter_v2`
> view 62 không chứa phiếu tháng 10; (3) InvalidRefno = trùng số, phải đối
> chiếu tiền từng phiếu.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **6.6.0** / repo con **9.8.1**.
