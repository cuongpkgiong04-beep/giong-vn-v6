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
