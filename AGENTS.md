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

*Cập nhật lần cuối: 2026-10-08 (GĐ 349 — cài skill Ponytail PA-1; app tổng 5.3.2 / repo con 8.2.2)*
*Người cập nhật: Trợ lý Freebuff*
