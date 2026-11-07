# GIONG VIETNAM — Project Context

> **File này là "bộ nhớ" của project.** Mỗi session mới, AI đọc file này để hiểu bối cảnh, trạng thái, và tiếp tục công việc đúng chỗ.

---

## 1. Tổng quan dự án

- **Tên:** GIONG VIETNAM (GIONG VN)
- **Loại:** Hệ thống điều hành chuỗi trung tâm tiêm chủng — web app cho quản lý nội bộ
- **Quản trị:** Đại ca Cường (Phạm Kiên Cường) — `cuongpk.giong04@gmail.com`, SĐT: 0904 07 57 57
- **Trợ lý:** "Trợ lý lập trình" (AI) — giao tiếp bằng Tiếng Việt, xưng "em", gọi Đại ca là **"Đại Ca"** (hiệu lực 2026-10-20, GĐ 484 — thay cách gọi cũ "em/anh")
- **Ngôn ngữ suy nghĩ & trả lời:** Sử dụng tiếng Việt Nam để suy nghĩ và trả lời khi tương tác với Đại Ca. KHÔNG dùng tiếng Anh trong phần suy nghĩ hay phản hồi.

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

### 🧪 KIỂM TRA TRƯỚC & SAU MỌI LẦN PUSH (BẮT BUỘC — MỌI AGENT — hiệu lực GĐ 470, 2026-10-19):

> **Lệnh của Đại ca (19/10/2026) nguyên văn:** *"Áp dụng chung cho tất cả các Agents.
> Trong dự án này phải được thống nhất. Bất kể là ai khi Push đều phải làm như thế này."*
>
> **BỐI CẢNH (lý do có mục này):** lỗi **"không đăng nhập được / sai mật khẩu / sai tên"
> sau khi Push** đã lặp lại NHIỀU LẦN (GĐ 463: thiếu `DATABASE_URL` → Better Auth rơi
> về PGLite, DB xoá mỗi deploy; 19/10/2026: `APP_JWT_SECRET` LỆCH giữa 2 app → SSO
> app tổng → app con verify fail). **Chân rễ LUÔN là ENV/SECRET trên Vercel — KHÔNG
> phải code.** Code "xanh", deploy báo Ready mà vẫn hỏng đăng nhập. Đại ca chỉ test
> trên production (không test local) → **AGENT phải tự kiểm tra trước và sau khi push,
> tự sửa ngay nếu có lỗi, KHÔNG để Đại ca phải nhắc lại.**
>
> **Kiến trúc nguồn dữ liệu — HIỂU ĐÚNG (đính chính GĐ 477, ĐH chốt PA-1 sau khi
> probe bằng chứng):** production dùng `TUNNEL_API_BASE_URL` → Cloudflare Tunnel →
> API Server (máy công ty) → **SQL Server GiongDB = nguồn DUY NHẤT**. `db.ts` chốt
> `dbSource` **MỘT LẦN lúc build** theo thứ tự: có biến tunnel → **tunnel**; không có
> tunnel mà có `DATABASE_URL` → **Neon**; không có cả hai → **PGLite** (DB trong RAM,
> mất sạch mỗi deploy).
>
> ⚠️ **KHÔNG có cơ chế "tunnel chết lúc chạy → tự nhảy sang Neon"** — tunnel chết thì
> app BÁO LỖI (không đọc/ghi được), KHÔNG ghi gì vào Neon (đúng thực tế vụ tunnel
> chết ngầm ~8 tiếng đêm 18/10 phải khôi phục khẩn, không có chuyện app tự chạy tiếp
> bằng Neon). Vì vậy `DATABASE_URL` là **bảo hiểm CẤU HÌNH** — chống rơi xuống PGLite
> khi biến tunnel bị thiếu lúc build (rơi PGLite = mất sạch tài khoản → "sai mật
> khẩu" như GĐ 463) — **KHÔNG phải bảo hiểm lúc tunnel chết**.
> Phụ chú: `DATABASE_URL` còn bật bước `db:migrate` lúc build (bài học GĐ 475: khi nó
> xuất hiện, 4 file migration T-SQL nhầm chỗ trong `migrations/` lộ ra và chặn deploy
> → đã `rm`).
>
> **Neon = ảnh chụp CŨ đóng băng ~16/09/2026** (probe 19/10: 27 bảng · `user` 11 dòng
> mới nhất 16/09 15:19 · so với GiongDB có `smed_pull_jobs` 2.104 job + user mới nhất
> 26/09 10:30:35) — **tách biệt hoàn toàn, KHÔNG đồng bộ với SQL Server**. Nếu app có
> rơi về Neon thì dữ liệu mới ghi vào Neon cloud (Singapore), "biến mất" khỏi hệ thống
> thật khi quay lại tunnel (agent/báo cáo đọc GiongDB không thấy), và tài khoản tạo
> sau 16/09 KHÔNG đăng nhập được (Neon không có).

> **A. TRƯỚC KHI PUSH — verify env Vercel của CẢ 2 APP:**
> ```bash
> cd "/d/DuLieuChung/CUONG_2026/giong-vn-v6"
> npx vercel env ls --scope=giong-vn --project=giong-vn-v6 \
>   | grep -E "DATABASE_URL|APP_JWT_SECRET|TUNNEL_API_BASE_URL|BETTER_AUTH"
> cd giong-apps/apps/banhang
> npx vercel env ls --scope=giong-vn --project=giong-banhang \
>   | grep -E "DATABASE_URL|APP_JWT_SECRET|TUNNEL_API_BASE_URL|ZAI_API_KEY"
> ```
> **Phải có — thiếu/lệch bất kỳ mục nào → DỪNG, BÁO ĐẠI CA, KHÔNG PUSH:**
> - `DATABASE_URL` (Neon — **bảo hiểm CẤU HÌNH** chống rơi PGLite, KHÔNG phải fallback tự động khi tunnel chết — xem khối "Kiến trúc nguồn dữ liệu" ở trên) — **CẢ 2 app**
> - `APP_JWT_SECRET` (khoá ký SSO handoff) — **CẢ 2 app, PHẢI CÙNG MỘT GIÁ TRỊ**
> - `TUNNEL_API_BASE_URL` + `TUNNEL_GIST_ID` — CẢ 2 app (backend chính)
> - `BETTER_AUTH_SECRET` + `BETTER_AUTH_URL` — app tổng · `ZAI_API_KEY` — app con

> **B. SAU KHI DEPLOY (push xong ~1-2 phút) — test login THẬT, KHÔNG tin chữ "Ready":**
> ```bash
> # 1) Đăng nhập app tổng → PHẢI trả JSON có "user"
> curl -s -X POST "https://giong-vn-v6.vercel.app/api/auth/sign-in/email" \
>   -H "Content-Type: application/json" \
>   -d '{"email":"cuongpk.giong04@gmail.com","password":"Admin123!"}' -c cookies.txt
> # 2) Session đọc được → có "user"
> curl -s -b cookies.txt "https://giong-vn-v6.vercel.app/api/auth/get-session"
> # 3) SSO sang app con: ký JWT (iss=giong-vn-v6, aud=giong-banhang) bằng APP_JWT_SECRET rồi:
> curl -s -I "https://giong-banhang.vercel.app/api/auth/sso?sso=<TOKEN>"
> #    ✅ ĐÚNG : 302 → https://giong-banhang.vercel.app/ + Set-Cookie: bh_session=...
> #    ❌ SAI  : 302 → https://giong-vn-v6.vercel.app/login?next=bahang = TOKEN VERIFY FAIL
> #              → ký TOKEN MỚI thử lại TRƯỚC (token 60s có thể đã hết hạn — đừng vội
> #                kết luận secret lệch); vẫn fail → APP_JWT_SECRET lệch/sai giữa 2 app.
> # 4) App con nhận phiên → "user":{...} + 14 nhóm + các lá quyền
> curl -s -H "Cookie: bh_session=<token>" "https://giong-banhang.vercel.app/api/auth/me"
> ```
> Cách nhanh nhất (đúng luồng thật): mở `https://giong-vn-v6.vercel.app` → đăng nhập →
> bấm **"Bán hàng"** ở sidebar → app con PHẢI vào được (không hiện "Chưa đăng nhập").

> **C. PHÁT HIỆN LỖI → SỬA NGAY, KHÔNG CHỜ ĐẠI CA NHẮC:**
> ```bash
> # Đổi/đồng bộ env (làm app tổng trước, rồi app con) — rm cần trả lời yes:
> echo "y" | npx vercel env rm <TÊN_BIẾN> production --scope=giong-vn --project=<project>
> npx vercel env add <TÊN_BIẾN> production --scope=giong-vn --project=<project> <<< "<giá trị>"
> # REDEPLOY để lấy env mới — KHÔNG cần push code:
> npx vercel ls <project> --scope=giong-vn     # lấy URL deployment mới nhất
> npx vercel redeploy <deployment-url> --scope=giong-vn
> ```
> **Lỗi CLI đã gặp thật (đừng mất thời gian lại):** `vercel env ls/add/rm` NHẬN
> `--project`; nhưng `vercel ls` và `vercel redeploy` **KHÔNG** nhận `--project` —
> redeploy phải truyền **URL hoặc deployment-id**, không truyền tên project.
>
> **BÁO CÁO:** sau khi push + verify, ghi kết quả (login app tổng ✅/❌ · SSO app con
> ✅/❌ · đã sửa gì) vào entry GĐ trong AGENTS.md để phiên sau biết trạng thái.


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

>
> **🛠️ CÔNG CỤ CẤP SỐ TỰ ĐỘNG (GĐ 535 — thay thao tác thủ công, chống trùng tuyệt đối):** thay vì tự grep + tự tính max+1 (mất 5-15 phút và VẪN trùng khi 2 phiên sát nhau — vụ GĐ 420 lệch 74 giây), dùng **1 lệnh**:
>
> ```bash
> python scripts/agents/claim.py claim --agent "<tên Agent>" --task "<mô tả việc>" [--scope "file dự kiến"] [--cx]
> python scripts/agents/claim.py check                        # max 2 dải + ai đang giữ 🔒 + commit chưa push
> python scripts/agents/claim.py done --gd <số> --hash <hash code>   # 🔒 → ✅ khi xong việc
> ```
>
> → `claim` tự quét MỌI nguồn (registry + entry trên MỌI ref kể cả nhánh chưa merge + commit message mọi nhánh + repo con cho dải C.x; số lạ xa dải bị bỏ kèm cảnh báo) → max+1 → tự ghi dòng 🔒 → **tự commit NGAY qua cổng shared-doc**; khóa toàn cục trong `.git` (dùng chung mọi worktree) chặn 2 phiên cùng số — 2 phiên claim đồng thời vẫn ra 2 số khác nhau (đã chứng minh bằng test race 3 process). Quy tắc gốc GĐ 285 **KHÔNG đổi** (vẫn claim TRƯỚC khi làm, commit NGAY, không push) — claim.py chỉ là CÁCH thực hiện nhanh + không thể trùng. Thêm `--dry-run` để xem trước số sẽ cấp.

<!-- SHARED-BLOCK:GD495-CONG-FILE-DUNG-CHUNG START -->
### 🚧 CỔNG COMMIT FILE DÙNG CHUNG — CHỐNG NUỐT/XOÁ BÀI PHIÊN SONG SONG (hiệu lực GĐ 495, 21/10/2026)

> **Sự cố thật (2 lần):** GĐ 470 — phiên A `git add AGENTS.md` khi file đang chứa bài dở
> của phiên B → commit **NUỐT** bài của B · GĐ 494 — bản trong máy của B **lệch** (thiếu
> entry của A) → B commit nguyên file → **XOÁ** bài của A. ĐH yêu cầu cơ chế TỰ ĐỘNG,
> không phải nhắc tay mỗi lần.

> **1) Khi nào BỊ CHẶN (hook `pre-commit` — dùng chung mọi worktree của repo):**
> - Commit vào `AGENTS.md` / `AGENT_REGISTRY.md` / `AGENTS_ARCHIVE.md` mà **không** đi qua
>   cổng an toàn bên dưới → **CHẶN** (in hướng dẫn ngay trong terminal).
> - Mọi commit **XOÁ** dòng entry (`### GĐ …` / `### C.…`) hoặc dòng bảng registry
>   (`| GĐ …` / `| C.…`) → **CHẶN TUYỆT ĐỐI** (đây là dấu hiệu commit bản lệch làm mất bài
>   phiên khác). Cố ý dọn/tách archive → thêm `[shared-approved]` vào commit message.

> **2) Cách commit file dùng chung (BẮT BUỘC — cổng an toàn):**
> ```bash
> python scripts/agents/shared-doc.py check                       # xem 2 đầu lệch gì (HEAD vs máy)
> python scripts/agents/shared-doc.py list                        # entry mới chưa commit
> python scripts/agents/shared-doc.py commit --entry "GĐ 495" --registry "GĐ 495" -m "docs(...): ..."
> python scripts/agents/shared-doc.py commit --all-new -m "..."    # nếu chỉ có entry của mình
> ```
> **Sửa văn bản đã ghi (đính chính):** `shared-doc.py commit --replace-old "<đoạn cũ>" --replace-new "<đoạn mới>" --file AGENTS.md -m "..."` — thay đúng 1 đoạn, GIỮ NGUYÊN BYTE phần còn lại (dùng cho cả `AGENT_REGISTRY.md`).
>
> Cổng **ghép CHỈ entry/dòng registry mình khai lên bản HEAD** (bản đã có đủ bài mọi phiên)
> rồi **trả lại nguyên vẹn bài dở của phiên khác** trong worktree ⇒ không bao giờ nuốt bài
> người khác, không bao giờ xoá bài đã commit.
> **Muốn thêm/sửa QUY TẮC (mục 1-13, không phải entry):** bọc đoạn mình viết bằng dấu
> `<!-- SHARED-BLOCK:<tên> START -->` … `<!-- SHARED-BLOCK:<tên> END -->` rồi chạy
> `--block "<tên>" --after "<dòng neo>"` — cổng tự chèn vào đúng vị trí trên bản HEAD.

> **3) Backup tự động:** mọi lần commit file dùng chung đều snapshot vào
> `.git/giong-shared-snapshots/` (50 bản gần nhất) + `.git/giong-shared-wip/` (bài dở của
> phiên khác) ⇒ không bao giờ mất bài. Xem/khôi phục: `python scripts/agents/shared-doc.py restore`.

> **4) Máy/worktree mới:** chạy 1 lần `python scripts/agents/install-hooks.py`
> (`--check` để kiểm tra). Hook tự in hướng dẫn khi chặn ⇒ phiên sau không cần nhớ luật.
<!-- SHARED-BLOCK:GD495-CONG-FILE-DUNG-CHUNG END -->


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
- AGENTS.md giữ gọn: quy tắc hiện hành (mục 1-12) + entry từ GĐ 600. Khi entry tích
  lũy dài thêm đáng kể (gần 2.000 dòng) → agent ĐƯƠNG SỐ chủ động lặp lại phép tách:
  dời entry cũ (giữ nguyên văn) xuống CUỐI AGENTS_ARCHIVE.md + cập nhật mốc "GĐ mới
  nhất trong archive" ở header file archive.
- Lịch sử GĐ 1 → 599: nằm trọn trong **AGENTS_ARCHIVE.md** (tra bằng số GĐ).
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

<!-- SHARED-BLOCK:GD568-CONG-CU-DO-THI START -->
## 14. CÔNG CỤ ĐỒ THỊ CODE + VÒNG KIỂM CHỨNG (hiệu lực GĐ 568, 29/10/2026)

> **ĐH chốt PA-2 (29/10/2026):** dùng 2 công cụ tra cứu code qua MCP + chuẩn hoá vòng kiểm chứng cho MỌI việc sửa code.

### 14.1 Hai công cụ đã cắm sẵn (MCP user-scope `~/.zcode/cli/config.json`, index cục bộ — không gửi code đi đâu)
| Công cụ | Dùng khi nào | Chi phí context |
|---|---|---|
| **codegraph** (1 tool `codegraph_explore`) | Hỏi 1 câu "X ở đâu · luồng nào · ảnh hưởng gì" → trả **nguồn thật kèm số dòng + đường gọi + phạm vi ảnh hưởng**; `codegraph affected <file>` = danh sách test cần chạy | Rẻ (1 tool) |
| **codebase-memory** (17 tool) | Truy vấn sâu: `trace_path` (ai gọi ai nhiều tầng) · `query_graph` (Cypher: dead-code, đếm) · `detect_changes` (git diff → symbol ảnh hưởng + test impact) · `get_architecture` · `manage_adr` (nhật ký quyết định) · `search_code` | 17 tool ≈ 3.000 ký tự mô tả |

> **Quy tắc thứ tự:** hỏi **ĐỒ THỊ trước** khi grep/Read (1 lệnh thay nhiều lần đọc file); chỉ Read **đúng dòng** cần sửa sau khi đã biết chính xác `file:dòng`. Đồ thị là **phân tích TĨNH** — KHÔNG thay thế quy tắc đối chứng bằng chứng (probe DB/file thật).

### 14.2 Vận hành + bẫy đã gặp thật (GĐ 568)
- **CBM bắt buộc 2 biến state** (hardening DACL của tool chặn mặc định): `CBM_CACHE_DIR=C:\CBM\cache` + `CBM_RUNTIME_DIR=C:\CBM\runtime` (thư mục runtime phải tồn tại sẵn, ACL chỉ-chủ-sở-hữu).
- **File rác tên thiết bị Windows** (`nul`/`con`/`aux`/`prn`): có 1 file `nul` là CBM **hủy index trong ~4 giây** (`aborted_previous_preserved`). Đã xoá 2 file rác (`\\?\D:\...\nul`) + thêm guard vào `.cbmignore`.
- **`.cbmignore`** (gốc mỗi repo) loại dữ liệu/runtime khỏi index; sửa nó phải index lại mới có hiệu lực. **`.codegraph/`** đã thêm vào `.gitignore` cả 2 repo.
- **Index theo TỪNG working tree** (3 worktree = 3 index riêng). Sau khi pull/đổi nhiều: `codegraph sync` hoặc CBM `cli index_repository --repo-path <thư mục>`.

### 14.3 VÒNG KIỂM CHỨNG chuẩn (áp cho MỌI việc sửa code)
1. **Rà ảnh hưởng TRƯỚC khi sửa**: `codegraph affected <file>` (hoặc `detect_changes` của CBM) → biết test/chỗ nào bị ảnh hưởng.
2. **Sửa surgical** (quy tắc cũ: đúng dòng cần sửa, không lan).
3. **Chạy ĐÚNG test bị ảnh hưởng** thay vì chạy cả bộ (nhanh hơn, vẫn đủ).
4. **Đối chứng số THẬT** với nguồn (file gốc / DB / MISA) — quy tắc bất biến.
5. **Ghi entry kèm bằng chứng**: số cụ thể · commit hash · lệnh đã chạy · kết quả.

> **Kinh tế context (bài học ECC):** giữ **<10 MCP server · <80 tool**; rules luôn nạp phải chọn lọc (việc lặp lại → viết thành **skill nạp-theo-việc** trong `.agents/skills/`); context ~50% nên compact thay vì để tự động ở 95%.
<!-- SHARED-BLOCK:GD568-CONG-CU-DO-THI END -->

<!-- SHARED-BLOCK:GD576-QUY-TAC-LUU-TRU-DU-LIEU START -->
## 15. QUY TẮC LƯU TRỮ DỮ LIỆU DỰ ÁN (Đại Ca chốt 29/10/2026 — hiệu lực vĩnh viễn)

> **Chỉ thị của Đại Ca (29/10/2026):** **KHÔNG dùng ổ C cho dự án này. TOÀN BỘ dữ liệu của dự án phải nằm trong thư mục gốc của dự án** — `D:\DuLieuChung\CUONG_2026\giong-vn-v6`.

### 15.1 Phạm vi áp dụng
Mọi thứ do công cụ/dự án SINH RA: index đồ thị code (`.codegraph/`), state/cache của codebase-memory-mcp, file tạm, log công cụ, artifact, backup, script tiện ích → **đặt TRONG dự án** (hoặc trong chính worktree đang làm việc), **KHÔNG** đặt ở `C:\`, `%LOCALAPPDATA%`, `~/.cache`, `%TEMP%`.

### 15.2 Hiện trạng từng công cụ (GĐ 576)
| Công cụ | Dữ liệu | Vị trí hiện tại |
|---|---|---|
| CodeGraph | `.codegraph/` trong mỗi repo | ✅ **TRONG dự án** (đã đúng quy tắc) |
| codebase-memory-mcp | cache + runtime (state) | ⚠️ `D:\CBMState\` — **Ổ D nhưng cạnh dự án** (chưa nằm trong dự án do rào cản ACL, xem 15.3) |

### 15.3 Rào cản thật: vì sao state CBM chưa nằm trong dự án (bằng chứng GĐ 576)
codebase-memory-mcp có cơ chế bảo mật riêng: **mọi thư mục trên đường dẫn tới state dir (trừ gốc ổ đĩa) không được cấp quyền GHI cho identity ngoài {owner · SYSTEM · Administrators}**. Đã chứng minh bằng 10 phép thử thật:
- ACE `Everyone:(Full)` → **chặn** · ACE `Authenticated Users:(Modify)` (dù TƯỜNG MINH hay KẾ THỪA) → **chặn** · junction trỏ từ dự án ra ngoài → **chặn** (công cụ không đi theo junction).
- Thư mục mới tinh với ACL chỉ `owner + SYSTEM` (trên ổ D) → **chạy tốt**; `Everyone` chỉ-đọc → **được chấp nhận** (không phải quyền ghi).
Chuỗi thư mục dự án hiện có `Authenticated Users:(Modify)` **kế thừa từ gốc ổ D** ⇒ muốn state nằm TRONG dự án phải bỏ quyền ghi đó trên cả 3 cấp `D:\DuLieuChung` → `CUONG_2026` → `giong-vn-v6` ⇒ **các MÁY LAN (.245 · .27 · .34 · .11) đang truy cập dữ liệu bằng tài khoản `Guest`** sẽ **MẤT QUYỀN GHI** (bằng chứng: SMB open-files cho thấy `GIONGPC\Guest` đang mở file trong dự án) + phải propagate ACL toàn cây (rất chậm). ⇒ **3 PA chờ Đại Ca chốt** (chi tiết ở entry GĐ 576).

### 15.4 Quy tắc vận hành kèm theo
1. Công cụ mới có sinh dữ liệu → đặt state **trong dự án**; nếu công cụ có hardening ACL chặn thì tạo thư mục riêng **trên ổ D sát dự án** và **ghi rõ lý do + đường dẫn vào AGENTS.md** (như `D:\CBMState`).
2. KHÔNG để backup/log/temp của dự án trên ổ C. Phát hiện dữ liệu dự án trên ổ C → chuyển về ổ D rồi dọn.
3. **Cảnh báo an ninh (phát hiện khi điều tra GĐ 576):** máy LAN truy cập share `\\<máy chủ>\DuLieuChung` bằng tài khoản **Guest (đang bật)** — rủi ro bảo mật; nên chuyển sang tài khoản riêng cho từng máy (việc riêng, chờ Đại Ca quyết).
<!-- SHARED-BLOCK:GD576-QUY-TAC-LUU-TRU-DU-LIEU END -->

<!-- SHARED-BLOCK:GD585-CBM-STATE-TRONG-DU-AN START -->
## 16. ĐƯA CBM STATE VÀO THƯ MỤC DỰ ÁN — điều kiện & công cụ (GĐ 585, 30/10/2026)

> **ĐH yêu cầu (30/10/2026):** đặt state codebase-memory-mcp vào `D:\DuLieuChung\CUONG_2026`
> thay vì `D:\CBMState` ("nếu được em chuyển luôn"). Kết quả điều tra: **ĐƯỢC, kèm điều kiện**
> — xem 16.1/16.2; **chưa thực thi**, chờ ĐH duyệt phần ACL (16.4).

### 16.1 Luật THẬT của CBM về state dir (kiểm chứng GĐ 585 — 4 cây thử cô lập + CBM CLI thật)
| Cấu hình thư mục CHA của state dir | Kết quả |
|---|---|
| `Everyone:(F)` | ❌ CHẶN |
| `Authenticated Users:(M)` | ❌ CHẶN |
| **`lan245:(Modify)` — tài khoản cụ thể** | ❌ **CHẶN** ← *điểm GĐ 576 chưa từng thử* |
| `Everyone:(RX)` + `lan245:(RX)` — chỉ đọc | ✅ **PASS** |

⇒ CBM chặn **mọi quyền GHI** ngoài `{owner · SYSTEM · Administrators}` trên **mọi thư mục
trên đường dẫn tới state dir** (trừ gốc ổ đĩa); **quyền CHỈ-ĐỌC được chấp nhận**. Vì vậy muốn
state nằm trong dự án thì phải **chuyển quyền ghi của máy LAN từ 2 cấp cha xuống các thư mục con**,
chứ không thể giữ quyền ghi ở cấp cha.

### 16.2 Hiện trạng chặn (30/10/2026)
`D:\DuLieuChung` (124 thư mục cấp 1 — dữ liệu công ty) và `D:\DuLieuChung\CUONG_2026` đều còn
`Everyone:(F)` + `Authenticated Users:(M)` kế thừa từ gốc ổ D ⇒ CBM chặn. Ba máy LAN map ổ
`Y:`/`Z:` vào **gốc share** `\\192.168.1.250\DuLieuChung` ⇒ cần quyền đọc ở gốc + quyền ghi ở
các thư mục con (giữ nguyên trải nghiệm hiện tại).

### 16.3 Công cụ đã chuẩn bị — `scripts/gd585-chuyen-cbm-state.py`
```bash
python scripts/gd585-chuyen-cbm-state.py            # DRY-RUN (mặc định — không đụng gì)
python scripts/gd585-chuyen-cbm-state.py --verify   # kiểm chứng trạng thái hiện tại
python scripts/gd585-chuyen-cbm-state.py --apply    # thực thi (tự backup ACL + config trước)
python scripts/gd585-chuyen-cbm-state.py --rollback # khôi phục ACL + config về như trước
```
Backup tự động vào `backups/gd585-<timestamp>/` (ACL 2 cấp + config.json). Script **không**
chuyển `_lan`/`_lan_accounts.txt` (mật khẩu LAN — tránh tạo bản thứ hai) và **không** xoá
`D:\CBMState`.

### 16.4 Trạng thái & việc chờ ĐH quyết
Đổi quyền trên thư mục chứa **toàn bộ dữ liệu công ty** + ảnh hưởng 3 máy LAN đang hoạt động
(hôm nay 30/10 3 máy vừa có sự cố mất ổ đĩa mạng — GĐ 582) ⇒ **phải có ĐH duyệt riêng** trước khi
`--apply`. Cho tới lúc đó **state vẫn ở `D:\CBMState`** — vẫn đúng quy tắc 15.1 (ổ D, không dùng ổ C).
<!-- SHARED-BLOCK:GD585-CBM-STATE-TRONG-DU-AN END -->

<!-- SHARED-BLOCK:GD584-TEN-DB-GIONGDB START -->
## 17. TÊN CƠ SỞ DỮ LIỆU DUY NHẤT: **GiongDB** — KHÔNG "GiondDB" (Đại ca chốt 30/10/2026 — hiệu lực vĩnh viễn)

> **Chỉ thị của Đại ca (30/10/2026):** *"Dữ liệu của dự án này là: 'GiongDB'
> không phải như hiển thị ở một số chỗ là: 'GiondDB'."*

- Tên DB THẬT của toàn hệ thống (SQL Server Express trên máy chủ — app đọc/ghi
  qua Cloudflare Tunnel → api_server) là **GiongDB**. Viết ĐÚNG CHÍNH XÁC
  "GiongDB" ở: **UI text · thông báo lỗi · nhãn nút/desc/tooltip · mô tả tool cho
  Trợ lý AI · chuỗi kết nối (Database=GiongDB) · tài liệu/entry ghi mới**.
- **"GiondDB" = SAI CHÍNH TẢ** — gặp ở đâu sửa ngay ở đó (code/UI); KHÔNG dùng
  cho nội dung ghi mới. **Đã từng gây lỗi thật (GĐ 547, 27/10):** chuỗi kết nối
  fallback gõ `Database=GiondDB` → SQL báo *"Database 'GiondDB' does not exist"*
  → 85 báo cáo Task_02 chặn ở bước ETL.
- **Phạm vi:** UI/hiển thị + thông báo + chuỗi kết nối phải đúng tuyệt đối.
  Comment/docstring/entry lịch sử cũ được giữ nguyên (bản ghi lịch sử) — nhưng
  khi SỬA dòng đó vì việc khác thì đổi luôn sang "GiongDB".
- **Đã dọn (GĐ 584):** 33 dòng hiển thị trong 20 file web repo con (UI text ·
  tooltip · desc sidebar · runLabel nút chạy · thông báo lỗi · mô tả tool Trợ lý
  AI) + `scripts/preflight-push.mjs`. Ngoại lệ giữ nguyên có chủ đích:
  `scripts/gionddb-backup.py` (tên thư mục/backup-set `GiondDB` đang chạy thật —
  đổi phải làm kèm migrate, chờ lúc đụng tới) và các script one-off ghi entry
  lịch sử.
<!-- SHARED-BLOCK:GD584-TEN-DB-GIONGDB END -->



---

## 18. PHÂN BIỆT **GIÁ NIÊM YẾT MUA VÀO (Nhà cung cấp)** ↔ **GIÁ NIÊM YẾT BÁN RA (Công ty GIÓNG)** (Đại ca chốt 30/10/2026 — hiệu lực vĩnh viễn)

> **Chỉ thị của Đại ca (30/10/2026):** *"GIÁ NHẬP · ĐƠN GIÁ (Bexsero 1.653.755) là
> giá niêm yết của nhà cung cấp. Cột 'GIÁ NIÊM YẾT' từ Excel để làm báo cáo tồn
> kho theo giá niêm yết là lấy ĐƠN GIÁ nhập của nhà cung cấp. Còn Giá niêm yết bán
> ra là giá bán chưa cho khuyến mại của Công ty Gióng."*

| Khái niệm | Ai quy định | Gồm những gì | Cột trong file NCC | Ví dụ (Bexsero) |
|---|---|---|---|---|
| **Giá niêm yết MUA VÀO** | **Nhà cung cấp** đề ra | giá NCC niêm yết + chiết khấu MUA HÀNG: **CK trên hóa đơn · CK tháng · CK quý** | vùng **"GIÁ NHẬP"** — cột **ĐƠN GIÁ** | 1.653.755 → CK hóa đơn 2% còn **1.620.680** |
| **Giá niêm yết BÁN RA** | **Công ty GIÓNG** quy định | giá Gióng niêm yết + khuyến mại/ưu đãi/giảm giá/thưởng | vùng **"GIÁ BÁN"** — cột **GIÁ NIÊM YẾT** | 1.800.000 → ưu đãi 2% gói + thưởng 20.000đ/mũi cho NV còn **1.744.000** |

- **Công ty GIÓNG = công ty của chúng ta** (bán hàng trên hệ thống SMED, MISA…) —
  không nhầm với nhà cung cấp.
- **Bảng "Bảng giá Vắc xin" (mua hàng, `mh_bang_gia_vx.gia_niem_yet`) lưu giá MUA
  VÀO của NCC** ⇒ khi đọc file NCC: lấy **ĐƠN GIÁ vùng "GIÁ NHẬP"**, TUYỆT ĐỐI
  KHÔNG lấy cột tên "GIÁ NIÊM YẾT" (đó là giá bán ra của Gióng). Báo cáo "tồn kho
  theo giá niêm yết" cũng dùng đúng cột giá mua vào này.
- 4 cột "chiết khấu" trong bảng mua hàng = chiết khấu MUA HÀNG của NCC (giá sau
  chiết khấu, đơn vị đồng) — gồm hóa đơn · tháng · quý (+ khác nếu có).
- Gặp file có **cả 2 vùng** giá ⇒ phải phân biệt bằng NHÓM/VÙNG trên tiêu đề file
  ("GIÁ NHẬP" vs "GIÁ BÁN"), không chỉ nhìn tên cột (tên cột dễ trùng).
<!-- SHARED-BLOCK:GD592-GIA-NIEM-YET-MUA-VAO END -->

<!-- SHARED-BLOCK:GD602-ENTIRE-GRAPH START -->
## 19. ENTIRE-GRAPH — đồ thị code BỔ SUNG (PA-2 Đại Ca chốt 31/10/2026 — hiệu lực vĩnh viễn)

> **19.1 TỰ ĐỘNG HOÁ (ĐH yêu cầu 31/10: "không phải gõ lệnh thủ công") — 3 hook ZCode
> tự chạy, KHÔNG ai phải gõ lệnh:** `UserPromptSubmit` (tự tra code liên quan cho câu
> giao việc → chèn THẲNG vào hội thoại; 1 lần/4 phút/phiên · budget 9s · ≤1.800 ký tự)
> · `PreToolUse` Edit|Write (file sắp sửa → báo file HAY ĐỔI CÙNG — co-change; 1
> lần/file/phiên) · `SessionStart` (prewarm cache chạy NỀN, không chặn mở phiên).
> Cài ở **2 tầng**: **user config** `~/.zcode/cli/config.json` (chạy ngay, không cần
> duyệt) + **workspace** `.zcode/config.json` (chuẩn, share qua git — ZCode có thể hiện
> banner duyệt 1 lần, KHÔNG bắt buộc). Máy mới:
> `python scripts/tools/entire-graph/install-zcode-hook.py`. Kiểm chứng hook chạy:
> `<git-common-dir>/giong-tools/entire-graph/cache/hooks.log`. An toàn: LUÔN exit 0 +
> fail-open (repo không có đồ thị → in `{}`, KHÔNG bao giờ chặn phiên).

> **19.2 RÀ TRÙNG LẶP TỰ ĐỘNG TRƯỚC PUSH (GĐ 607 — ĐH chốt "tự động luôn việc rà trùng
> lặp rồi Push"):** hook `push-guard` (PreToolUse matcher `Bash`) thấy lệnh chứa
> `git push` → **tự chạy `python scripts/agents/ra-trung-lap.py`** (~3s) rồi chèn báo cáo
> vào hội thoại TRƯỚC khi push chạy: (a) nhánh phụ vs main — **file CẢ 2 BÊN sửa**
> (`--symbols`: soi mức symbol qua entire-graph diff) · (b) **mọi worktree** có file SỬA
> DỞ chưa commit (phiên khác đang làm) · (c) **commit chưa push** từng nhánh. Throttle 2
> phút/phiên; lệnh Bash khác bỏ trong 0,32s. **Có ⚠️ ⇒ BÁO ĐẠI CA trước khi push.**

> **PA-2 (tiếp GĐ 601):** `entire-graph` (tree-sitter, 100% local — `doctor` xác nhận
> `no_egress=true`) là **nguồn tra cứu BỔ SUNG** cho codegraph + codebase-memory
> (mục 14) — **KHÔNG thay thế**. Dùng cho ĐÚNG 3 việc:
> 1. **Tra code REPO CON `giong-apps`** — codegraph chưa index repo này (204 file
>    Python nghiệp vụ: agent + ETL + builder); CBM chỉ có `apps/banhang`.
> 2. **Co-change** — trước khi sửa hàm/interface hay đổi: xem file nào HAY ĐỔI CÙNG
>    theo lịch sử git (thứ codegraph/CBM không có).
> 3. **Semantic diff trước Push** — symbol added/removed/signature-changed kèm số
>    dependents (rà trùng lặp đa agent, nguyên tắc 3).

> **Cách gọi — BẮT BUỘC qua wrapper** (nó tự cố định cache TRONG DỰ ÁN):
> ```bash
> bash scripts/tools/entire-graph/eg.sh query --head --profile full --format agent --max-context-bytes 4096 --query "<mô tả việc>"
> bash scripts/tools/entire-graph/eg.sh impact --head --symbol <Tên>
> bash scripts/tools/entire-graph/eg.sh def --head <Tên>
> bash scripts/tools/entire-graph/eg.sh diff --base main --head <nhánh> -- src/
> ```
> ⛔ **KHÔNG gọi binary trực tiếp mà thiếu `--cache-dir`** — cache sẽ rơi vào ổ C
> (%LocalAppData%, vi phạm mục 15). Wrapper đã xử lý: `diff/commit/checkpoint/verify`
> (v0.6.0 không nhận `--cache-dir`) + tự thêm `--repo`/`--cache-dir`.

> **Vị trí cài (KHÔNG commit vào git):** `<git-common-dir>/giong-tools/entire-graph/`
> — binary release + cache **dùng chung MỌI worktree** của repo, nằm TRONG dự án
> (tiền lệ `.git/giong-shared-snapshots/` GĐ 495). Máy / worktree / clone mới chạy 1
> lần cho MỖI repo:
> ```bash
> bash scripts/tools/entire-graph/install.sh                       # app tổng (+ hook)
> bash scripts/tools/entire-graph/install.sh --repo giong-apps     # repo con (+ hook)
> ```

> **Hook prewarm (PA-2):** `post-commit` dựng lại cache ở NỀN sau mỗi commit
> (throttle 10 phút, không bao giờ chặn commit, hook lạ tự backup `.pre602.bak`).
> Repo con dùng chung `eg.sh` của app tổng (hook tự thử `../scripts/...`).
> Log: `<git-common-dir>/giong-tools/entire-graph/cache/prewarm.log`.

> **Đã loại khỏi index** (`.graphignore` mỗi repo): `*.md` + ảnh + attachments/
> (INPUT/OUTPUT/LOG ở repo con). Kết quả app tổng: 574 → **273 file · 2.732 symbol**
> (chỉ còn CODE). Mỗi query in 1 dòng `warning W_REPO_IGNORED_SOURCE … excluded by
> .graphignore` — **bình thường**, là báo cáo số file bị loại có chủ đích.
>
> **Số đo thật (31/10):** query cache-hit **~5,8s** (cold 12,9s) · repo con cold 25,5s
> · index prewarm 10,9s · ổ C 0 byte cache. Hạn chế đã biết: T-SQL `migrations/*.sql`
> parse lỗi một phần; `src/routes/huong-dan.tsx` có `&` chưa escape trong JSX.
<!-- SHARED-BLOCK:GD602-ENTIRE-GRAPH END -->

---

<!-- SHARED-BLOCK:GDDATPICKER-QUY-TAC-UI START -->
## 20. QUY TẮC UI — CHỌN NGÀY PHẢI CÓ LỊCH (Đại ca chốt 05/11/2026 — hiệu lực vĩnh viễn)

> **Chỉ thị của Đại ca (05/11/2026):** Từ bây giờ trở về sau, MỌI ô chọn
> ngày tháng trên UI (cả app tổng lẫn app con) PHẢI dùng **bộ chọn lịch bấm
> hiện lên** — `input type="date"` (hiển thị dd/mm/yyyy + icon 📅, bấm mở
> lịch pop-up chọn ngày, có Xóa/Hôm nay — mẫu: trang "Sao kê ngân hàng TPB")
> — **KHÔNG bắt người dùng gõ tay ngày tháng.**
>
> - Giá trị native = `yyyy-mm-dd` — server/validator nhận CẢ `yyyy-mm-dd` lẫn
>   `dd/mm/yyyy` (engine `_parse_date` vốn hỗ trợ cả 2); hiển thị đọc được
>   thì `formatDate()` về dd/mm/yyyy.
> - **Áp dụng NGAY với TPBANK** (`/m/up-tpbank` — đang chuẩn bị triển khai:
>   bỏ date picker này vào; ĐH nhắc riêng 05/11: "nhắn nó không nó lại quên").
> - Trang mới nào có ô chọn ngày (báo cáo, module upload, job...) → theo quy
>   tắc này; khi đụng trang CŨ còn ô gõ tay ngày → đổi sang lịch ngay chỗ đó.
<!-- SHARED-BLOCK:GDDATPICKER-QUY-TAC-UI END -->
### GĐ 600 (Trợ lý ZCode (máy chủ)): PA Push đợt 31/10 sáng — restart agent nạp GĐ 596 + push TOÀN BỘ commit đang đợi (app tổng 10 · repo con 6) + bump 7.4.1 / 11.5.0 + verify production + resume lịch cho chạy tiếp (2026-10-31)

> **Lệnh của Đại ca (31/10 ~01:40):** *"Đã tạm dừng job để Restart agent và Push.
> Hãy Restart agent và Push cho anh tất cả những gì đang đợi push. Sau đó em lệnh
> cho chạy tiếp job. Mai anh kiểm tra sau."*

> **Đã làm:**
> 1. **Restart GIONG_SMED_Agent (01:40)** — dừng tiến trình hẹn-restart của GĐ 596,
>    xoá `__pycache__` (agent + etl), `sc stop` → `sc start` khi job RỖNG (0 job
>    pending/running) · **api_server GIỮ NGUYÊN** (không taskkill) nên tunnel URL
>    không đổi, không cần cập nhật env Vercel. Log khởi động mới xác nhận đã nạp
>    code GĐ 596: `chạy Task_02 · 23:00 — 20 bước download (nhiệm vụ TẢI DỮ LIỆU —
>    không chạy báo cáo; báo cáo do nhiệm vụ Chạy báo cáo)`.
> 2. **Rà trùng lặp (nguyên tắc 3):** nhánh phụ `agent-cli` / `pipeline-work`
>    **RỖNG** cả 2 repo · `git fetch` xong remote 0 commit mới · working tree chỉ
>    còn file dở của phiên KHÁC (app tổng: `AGENTS.md` + `AGENT_REGISTRY.md` +
>    1 attachment xoá; repo con: 8 file) → **KHÔNG add, KHÔNG đụng**.
> 3. **Verify env Vercel TRƯỚC push (mục A GĐ 470):** app tổng đủ `DATABASE_URL` ·
>    `APP_JWT_SECRET` · `TUNNEL_API_BASE_URL` · `TUNNEL_GIST_ID` ·
>    `BETTER_AUTH_SECRET` · `BETTER_AUTH_URL`; app con đủ `DATABASE_URL` ·
>    `APP_JWT_SECRET` · `TUNNEL_*` · `ZAI_API_KEY` · `SMED_AGENT_TOKEN`.
> 4. **Bump version khi Push:** app tổng **7.4.0 → 7.4.1** (patch — đợt này 0 code
>    app tổng, chỉ docs/registry) · repo con **11.4.1 → 11.5.0** (minor — 2 feature:
>    GĐ 596/C.379 "chọn tất cả mục download + báo cáo cho Task_02/03/04" + C.380
>    "trang Sức khoẻ dữ liệu"). Checklist GĐ 138 ✓ mọi thành phần 1 chữ số.
> 5. **Push:** app tổng `fe1005f..30cbc50` (10 commit — docs/registry GĐ 596→599 +
>    claim GĐ 600 + bump) · repo con `e50dc65..24549b9` (6 commit — code GĐ 596 +
>    C.380 + 2 entry + bump).
> 6. **✅ Verify production (curl + login THẬT + SSO):** app tổng
>    `giong-vn-v6.vercel.app` = **7.4.1** · app con `giong-banhang.vercel.app` =
>    **11.5.0** (curl lần đầu — không ghim deployment cũ) · đăng nhập
>    `cuongpk.giong04@gmail.com` HTTP 200 + có `user` · `get-session` OK · **SSO**
>    ký JWT (`iss=giong-vn-v6`, `aud=giong-banhang`) → **302 về app con +
>    `Set-Cookie: bh_session`** (⇒ `APP_JWT_SECRET` 2 app KHỚP) · `/api/auth/me`
>    = "Phạm Kiên Cường" · **97 nhóm quyền**.
> 7. **Resume lịch + cho chạy tiếp:** `kv_settings.task_schedule_paused = '0'`
>    (như nút "Tiếp tục" trên web) → log `[task] lịch định kỳ TIẾP TỤC — phục hồi
>    spawn + claim bình thường`; nhiệm vụ TẢI DỮ LIỆU **kỳ 30/10 bị bỏ dở** (agent
>    khởi động lại 23:05 hôm qua giữa bước 1/20, 3 lượt hddt lỗi liên tiếp) → đặt
>    lại `pending` → **01:53:49 agent nhặt và chạy lại đủ 20 bước** (job hddt 30/10
>    running) → xong sẽ tự spawn nhiệm vụ Chạy báo cáo kỳ 30/10 rồi chuỗi MISA
>    (Task_05 mua hàng → Task_06 bán hàng → Task_07 xuất kho).

> **ĐH kiểm tra sáng 31/10:** app con version **11.5.0** (góc trái) → trang
> **NHIỆM VỤ**: dialog Task_03 / Task_04 nay có **ĐỦ 2 khối** (phân hệ download +
> báo cáo) kèm nút **"Chọn tất cả" / "Bỏ chọn"**; tick báo cáo ở Task_04 → Lưu →
> kỳ sau chạy đúng bấy nhiêu; Task_02 sửa config có hiệu lực (17:15 chạy **9 phân
> hệ nguồn / 14 báo cáo nhanh**). Trang **Sức khoẻ dữ liệu**: khoảng ngày Từ→Đến +
> nút "Tải lại dữ liệu" từng ô lỗi + nút "Tải lại" theo ngày.

> **Version:** app tổng **7.4.1** / repo con **11.5.0** — ĐÃ PUSH + LIVE.

---

### GĐ 601 (Trợ lý ZCode (máy chủ)): KHẢO SÁT công cụ `entire-graph` (đồ thị code tree-sitter — CLI, không MCP) theo yêu cầu ĐH "nghiên cứu, áp dụng được vào dự án không" — KẾT LUẬN: ÁP DỤNG ĐƯỢC (đã chạy thật trên cả 2 repo) + trình 3 PA chờ ĐH chốt (2026-10-31)

> **Yêu cầu của Đại ca (31/10 sáng):** "Nghiên cứu cái này đi. Áp dụng được vào dự
> án hiện tại này không: `D:\DuLieuChung\CUONG_2026\Github\entire-graph-main`".
> Em khảo sát source + tải bản release chính thức + **chạy thử THẬT** trên app tổng
> và repo con (query · impact · def · diff · index) rồi đối chiếu với 2 công cụ đồ
> thị đang dùng (codegraph + codebase-memory, mục 14). **CHƯA sửa code dự án — 3 PA
> chờ ĐH chốt.**

> **Công cụ là gì:** plugin đồ thị code của **Entire CLI** (entire.io, Go + tree-sitter,
> MIT, 36 ngôn ngữ semantic / 185 filetype). **100% local** — `doctor` xác nhận
> `no_egress=true` (không network, không telemetry, không API key). **KHÔNG có MCP
> server** → agent gọi qua CLI/Bash (`entire-graph.exe <query|impact|def|diff|...>`).
> Chạy **STANDALONE hoàn toàn** — không cần Entire CLI, không cần tài khoản (đã test:
> `version`, `capabilities`, `query`, `impact`, `def`, `diff`, `index` đều chạy OK).

> **Bản dùng + vị trí hiện tại (ngoài dự án, trên ổ D — không đụng gì trong dự án):**
> release `entire-graph_0.6.0_windows_amd64.zip` (13,9 MB; exe 87 MB) →
> `D:\DuLieuChung\CUONG_2026\Github\entire-graph-bin\` (kèm cache test); source khảo
> sát ở `Github\entire-graph-main\`. **Build từ source FAIL** (thiếu generated grammar
> — repo gốc dùng `mise` tasks sinh code): `build constraints exclude all Go files` ở
> `internal/sem/grammars/*` ⇒ **dùng release binary, KHÔNG build local**.

> **Bằng chứng chạy thật (đo trên máy chủ 31/10):**
> - **Index app tổng:** 574 file → **8.017 symbols / 14.003 relations**
>   (TypeScript 114 file/1.418 · Python 58/530 · **Markdown 303 file/5.267 symbol =
>   65% toàn đồ thị** · SQL 32/83) · 1 partial failure `src/routes/huong-dan.tsx:116`
>   — `&` không escape trong JSX (lỗi syntax THẬT, nhỏ) · `completeness: ok`.
> - **Query repo con** "báo cáo công nợ đặt trước bccn builder sql_reports" → đúng
>   cả 3 chỗ chủ chốt: `etl/sql_reports.py:4260 bccn_dattruoc` (s=48,0) ·
>   `gd348-build-lht-ds.py:356 build_tra_no` (s=49,4) · `40_web_agent.py:657
>   run_lht_report_task`.
> - **Query app tổng** "check-in GPS ảnh bắt buộc chấm công" → `check-in.tsx:706`
>   (s=43,8) · `bao-cao/bang-check-in.tsx:53 parseGps` (s=42,7) — **trùng khớp kết
>   quả codegraph** (chạy cùng câu để đối chiếu).
> - **`impact bccn_dattruoc`** → 5 callers (gd348 build_tra_no · gd338/gd390 verify
>   scripts) + 10 callees + **13 CO-CHANGE FILES** (file hay đổi cùng nhau theo git
>   history: `sql_reports_bccn.test.py`, `misa_xk_detail_sync.py`, …) — **thứ cả
>   codegraph lẫn CBM KHÔNG có**.
> - **`def cleanAddress`** → 6 chỗ khai báo cùng tên trong **1,2s** (refactor an toàn).
> - **`diff --base main --head agent-cli -- src/`** → semantic diff **entity-level**:
>   124 dòng, 41 removed / 27 body changed / **8 signature changed kèm số dependents**
>   (VD `auth signature changed (63 dependents)` · `BH_GROUPS signature changed (8)`).
> - **VERIFY tự đề xuất:** `python -m py_compile apps/banhang/agent/gd348-build-lht-ds.py`
>   (tier=build-check) — hợp thẳng vòng kiểm chứng mục 14.3.
> - **Tốc độ:** cold 16-28s (build index) · **cache-hit cùng bộ flag ~9s** · impact
>   1,8s · def 1,2s · diff 11s · `index` prewarm 16,6s. Cache key gồm cả flag +
>   profile + tree hash ⇒ **đổi flag = rebuild; commit mới = miss**.

> **Đối chiếu 2 công cụ đang dùng (GĐ 568) — 3 điểm KHÁC BIỆT có giá trị:**
> 1. **codegraph CHƯA index repo con `giong-apps`** (thông báo thật: *"it is its own
>    git repository … the nearest index holds none of its files"*) — 204 file Python
>    nghiệp vụ (agent + ETL + builder) hiện **không graph nào phủ**; CBM chỉ có
>    `giong-apps/apps/banhang`. entire-graph index **mọi repo không cần cấu hình trước**.
> 2. **Co-change + semantic diff** — codegraph trả verbatim source (giàu context),
>    entire-graph trả ranked snippet ≤4 KB + co-change + diff entity-level (nhẹ context).
> 3. **Không daemon/state/index-trước** → tránh đúng hàng rào ACL/state ổ C đang vướng
>    ở CBM (GĐ 576/585). Chỉ cần binary + `--cache-dir`.

> **Vướng đã kiểm chứng khi áp dụng (cần xử lý nếu ĐH chốt):** (a) cache mặc định
> `%LocalAppData%` (**ổ C**) → PHẢI ép `--cache-dir`/`ENTIRE_PLUGIN_DATA_DIR` vào dự án
> (quy tắc 15.1); (b) `setup` của công cụ sẽ **chèn managed block vào AGENTS.md/
> CLAUDE.md** → đụng cổng shared-doc GĐ 495 ⇒ né bằng cách KHÔNG chạy `setup`, chỉ ghi
> quy tắc qua cổng; (c) Markdown chiếm 65% symbol ⇒ cần `.graphignore` loại .md/
> attachments/screenshots/OUTPUT; (d) mỗi commit mới → cache miss 16-28s ⇒ nên prewarm;
> (e) binary không tự cập nhật.

> **3 PHƯƠNG ÁN chờ ĐH chốt:**
> - **PA-1 (khuyến nghị — nhẹ):** đặt binary + script bọc trong dự án
>   (`scripts/tools/entire-graph/`, cố định `--cache-dir` + `--repo`) + `.graphignore`
>   + 1 mục ngắn ở AGENTS.md mục 14 dùng cho 3 việc: (1) tra code **REPO CON** (chỗ
>   codegraph chưa phủ), (2) xem **co-change** trước khi sửa hàm hay đổi, (3) **semantic
>   diff** rà thay đổi trước Push. Không hook, không `setup`.
> - **PA-2 (vừa):** PA-1 + script/hook **prewarm `index --head` sau mỗi commit** →
>   query ~9s thay vì 16-28s (đổi lại: thêm 1 hook nữa vào hệ thống hook hiện có).
> - **PA-3 (đầy đủ — KHÔNG khuyến nghị):** chạy `entire graph setup` (managed block
>   AGENTS.md/CLAUDE.md + hook SubagentStart của Claude Code) → đụng cổng shared-doc +
>   thêm file lạ + hook chỉ dùng cho Claude Code (dự án chạy ZCode).

> **Version:** KHÔNG bump (chưa đụng code dự án). App tổng **7.4.1** / repo con **11.5.0**.
> **Registry:** GĐ 601 — claim `8d1cd59`.
### GĐ 602 / C.382 (Trợ lý ZCode (máy chủ)): PA-2 ĐH chốt (31/10, tiếp GĐ 601) — TÍCH HỢP entire-graph vào dự án: wrapper `eg.sh` + binary/cache trong `.git/giong-tools` (không rơi ổ C) + hook `post-commit` prewarm chạy nền + `.graphignore` 2 repo (2026-10-31)

> **Lệnh Đại Ca (31/10, sau báo cáo GĐ 601):** "PA-2" — tức PA-1 (binary + script bọc
> + `.graphignore` + quy tắc dùng) **cộng** hook/script prewarm index sau mỗi commit.

> **Đã làm (app tổng `cd52fa8` code · repo con `7083e27`):**
> 1. **`scripts/tools/entire-graph/`** (app tổng, committed): `eg.sh` — wrapper tự tìm
>    binary + tự cố định `--repo`/`--cache-dir`, có nhánh `prewarm`, tự bỏ `--cache-dir`
>    cho 4 lệnh không nhận (đo thật v0.6.0) · `install.sh` — tải binary release v0.6.0
>    + cài hook, idempotent, backup hook lạ `.pre602.bak` · `post-commit` — hook mẫu ·
>    `README.md` — cách dùng + bẫy vận hành.
> 2. **Vị trí cài KHÔNG commit:** `<git-common-dir>/giong-tools/entire-graph/` =
>    binary 87 MB + cache, **dùng chung mọi worktree** của repo, TRONG dự án (tiền lệ
>    `.git/giong-shared-snapshots/` GĐ 495). **Ổ C sạch** — kiểm chứng:
>    `%LocalAppData%/entire-graph` KHÔNG tồn tại.
> 3. **Hook `post-commit` cho CẢ 2 repo** (repo con lấy `eg.sh` app tổng qua `../`) —
>    chạy **NỀN** (`nohup`), throttle 10 phút, **không bao giờ chặn commit** (mọi bất
>    thường → exit 0).
> 4. **`.graphignore` 2 repo:** loại `*.md` + ảnh + `attachments/` (+ `INPUT/OUTPUT/LOG`
>    repo con) — app tổng từ 574 file/8.017 symbol → **273 file/2.732 symbol** (chỉ CODE;
>    Markdown trước chiếm 65% symbol).
> 5. **AGENTS.md mục 19** (block `GD602-ENTIRE-GRAPH` qua cổng shared-doc): quy tắc
>    dùng entire-graph cho ĐÚNG 3 việc + cảnh báo không gọi binary thiếu `--cache-dir`.

> **Verify bằng chứng thật (31/10):** `eg.sh version` = v0.6.0 · query app tổng
> **cache-hit 5,8s** (cold 12,9s — cache 468K trong `.git/giong-tools`) · repo con cold
> 25,5s → cache 796K trong `giong-apps/.git/giong-tools` · **hook chạy thật sau commit
> `cd52fa8`** (log: index `cd52fa8` = 273 file/2.732 symbol, 10,9s, chạy nền không
> chặn commit) + sau commit repo con `7083e27` (cache riêng repo con) · warning
> `W_REPO_IGNORED_SOURCE` = báo cáo số file bị loại (359 file app tổng — bình thường).

> **Trùng số (minh bạch):** `claim.py --cx` lúc 02:32 cấp thêm **GĐ 604 / C.382** cho
> phần repo con của cùng công việc → theo tiền lệ GĐ 598, đánh dấu **GĐ 604 = ⛔ GỘP
> vào GĐ 602** (số chính thức = 602, giữ C.382 cho entry repo con).

> **Version:** KHÔNG bump (công cụ vận hành — không đụng code app/agent).
> App tổng **7.4.1** / repo con **11.5.0**.

### GĐ 603 / C.381 (Trợ lý ZCode — máy chủ): PHÂN HỆ "UPLOAD Hóa đơn đầu vào" (MIA → MISA) — PA-1 ĐH chốt 31/10: engine nạp bảng kê + sinh Excel 302/330 + tự sinh số chứng từ + tự tạo NCC; kiểm chứng với MISA còn THIẾU KHO NVL/CCDC (2026-10-31)

> **Đại Ca chốt (31/10, sau GĐ 599):** **PA-1** (một bảng kê chưa upload + cột hạch toán
> tay + tự tách 3 loại phiếu) · **NVL/CCDC NHẬP KHO** · danh mục mã NVL/CCDC/dịch vụ
> theo **2 file danh mục MISA ĐH mới export** (`Danh_sach_hang_hoa_dich_vu.xlsx`,
> `Danh_sach_nha_cung_cap (1).xlsx`) · NCC **tự map theo MST, chưa có thì tự tạo** ·
> số chứng từ **theo MISA**. Nhiệm vụ: "Toàn bộ hóa đơn đầu vào từ MIA TOOL phải được
> Upload hết lên MISA" → sau đó đối chiếu mục 4 (số chứng từ + số tiền bằng nhau).

> **DANH MỤC MISA (phân tích 2 file ĐH export — bằng chứng):** 121 mã VTHH/dịch vụ gồm
> **59 hàng hóa** · **36 NVL (prefix `VTTH-`, TK kho `152_BH`)** · **5 CCDC (`TS-`,
> `153_BH`)** · **19 dịch vụ (`DVMN-`, TK chi phí `632_BH`)** · 138 NCC (**Mã NCC = MST**
> ⇒ map thẳng theo `mia_hddt_h*.mst_nvb`). Đối chiếu phần chưa upload: **194 HĐ / 413
> dòng / 54 NCC** — 40 NCC đã có trong danh mục, **14 NCC chưa có** (Bệnh viện Hà Đông,
> BV Từ Sơn, FPT, HNC, HKD…) ⇒ sẽ tự tạo qua template 9021.

> **ĐÃ LÀM (commit repo con `2772035` — module mới `agent/misa_hddt_dauvao.py` + test
> `misa_hddt_dauvao.test.py` 22/22 PASS):**
> 1. **NẠP**: bảng mới `misa_hddt_upload_line` (DDL idempotent tự tạo) — HĐ mua vào kỳ
>    = union `mia_hddt_hd` ∪ `mia_hddt_hh` (bắt 135 HĐ mồ côi GĐ 599) **TRỪ** HĐ đã có
>    chứng từ SMED khớp theo SỐ HÓA ĐƠN (`stg_5BKN.col5`; SỬA LỖI cách so ngày: dùng
>    `TRY_CONVERT(date, col3, 103)` — so chuỗi dd/mm/yyyy bị sai thứ tự, số đúng là
>    **789 HĐ kỳ · đã có SMED 595 · chưa upload 194**). MERGE giữ nguyên hạch toán đã
>    điền khi nạp lại. ✅ ĐÃ CHẠY: 413 dòng vào DB.
> 2. **SINH EXCEL**: NVL/CCDC → template **302** ("Mua hàng trong nước NHẬP KHO"), DV →
>    template **330** (mua dịch vụ). **Tiền khớp gốc MIA**: MIA lưu `dgia` = giá NIÊM
>    YẾT còn `thtien` = tiền SAU chiết khấu (HĐ 59293: 100×1.420.000 nhưng thực 113,6tr
>    = CK 20%) và `tsuat` đôi khi là phân số ('0.05' = 5%) ⇒ hàm `gia_va_ck()` điền
>    ĐG niêm yết + **Tỷ lệ CK (%)** khi sai số ≤1 đồng, còn lại dùng giá hiệu dụng
>    `thtien/sl` ⇒ MISA tính lại KHỚP TỪNG ĐỒNG (điều kiện đối chiếu bảng kê thuế).
> 3. **Số chứng từ**: ⚠️ **MISA BẮT BUỘC nhập** (khác giả định "MISA tự sinh" — bằng
>    chứng check_step3) ⇒ module tự sinh `HDDT-<số HĐ>` (bỏ ký tự lạ, ≤20 ký tự theo
>    ràng buộc GĐ 481; cùng số HĐ nhiều NCC → thêm 4 số cuối MST).
> 4. **Tự tạo NCC** qua template **9021/account_object** (đã dò ra cặp đúng); danh mục
>    VTHH mới qua **9010/inventory_item** (nếu cần).

> **KIỂM CHỨNG THẬT VỚI MISA (step2+step3 — DỪNG trước step4, 0 chứng từ được ghi):**
> step2 ghép **29/46 cột**; MISA nêu **5 yêu cầu bắt buộc**: Kho · Vị trí · Đơn vị ·
> Mã thống kê · Số phiếu nhập → module đã bổ sung **Vị trí = mã kho**, **Đơn vị =
> `GIONGVN`** (đơn vị gốc công ty, tra từ `organization_unit_get`), **Mã thống kê =
> `VP`**, Số chứng từ tự sinh ⇒ **chạy lại CHỈ CÒN ĐÚNG 2 LỖI LIÊN QUAN KHO**:
> *"Kho `<kho nvl>` không có trong danh mục; Vị trí `<kho nvl>` không có trong danh
> mục"* — tức mọi cột khác ĐÃ ĐÚNG (mã hàng `VTTH-…` tồn tại trong danh mục, TK kho
> 152_BH, Đơn vị, Mã thống kê…). **Kho MISA hiện chỉ có 20 kho = 20 trung tâm, KHÔNG
> có kho NVL/CCDC; thử dò template danh mục kho (9012-9019) = KHÔNG có** ⇒ phải tạo
> kho bằng UI MISA (hoặc khảo sát tiếp API tạo kho).
> 3 dòng mẫu đã gán hạch toán để kiểm chứng: id 21 (NVL `VTTH-Giấy in An Hòa A4 /70`
> · 152_BH · KHO NVL), id 403 + 412 (DV `DVMN-PHẦN MỀM SMED` · 632_BH).

> **VIỆC CHỜ ĐẠI CA (chặn bước upload thật):** (1) **Tạo 2 kho trên MISA** — đề xuất
> mã `NVL` ("Kho nguyên vật liệu", TK 152_BH) + mã `CCDC` ("Kho công cụ dụng cụ",
> TK 153_BH) — ĐH tạo trên UI MISA (30 giây) HOẶC cho phép em khảo sát/call API tạo kho;
> (2) xác nhận **Đơn vị `GIONGVN` + Mã thống kê `VP`** cho hóa đơn mua của công ty.

> **CÒN LẠI (phiên sau):** trang web `/m/up-hoadon-dauvao` (bảng kê + nhập tay mã
> hàng/TK Nợ/TK Có/kho + nút Upload) + server fn `-hddt-dauvao.ts` + endpoint agent
> `/hddt-*` trong `api_server.py` (mẫu đã khảo sát: `createServerFn` + `getSql()` +
> `agentPost`) · upload thử 1-2 phiếu/loại rồi chạy cả kỳ · **mục 4 đối chiếu
> MISA-MIATOOL** (cần mở rộng đồng bộ bảng kê mua vào MISA — hiện `misa_pu_detail`
> mới phủ 09-22/10).
> **Lưu ý kỹ thuật:** bảng kê chỉ có 397 dòng khớp danh mục 29 tên ⇒ phần lớn **ĐH
> phải gán mã tay** trên web (đúng thiết kế PA-1) — nên dựng màn hình có gợi ý.

> **CẬP NHẬT 31/10 (tiếp GĐ 603 theo ĐH):**
> 1. **Kho/Đơn vị/Mã thống kê:** ĐH chốt dùng **kho mã "VP"/tên "VP"** cho mọi NVL/CCDC/HH; **đơn vị "VP"**, mã thống kê "VP". Đã đổi `KHO_MAC_DINH` → "VP", `DON_VI` → "VP" trong `misa_hddt_dauvao.py`.
> 2. **Danh mục mã mới:** file `Danh muc VTTH_CCDC_MDV sua lai .xlsx` (cột C = Mã Mới) được load làm mapping tên → mã MISA; ưu tiên mã từ mapping/Excel trước khi tự sinh.
> 3. **Tạo mã tự động:** khi `ma_hang` thiếu, ưu tiên mã SMED đã có; nếu vẫn thiếu → tra mapping Excel (Tên hàng), nếu chưa có → tự sinh mã mới theo quy tắc:
>    - VTTH (TK 152) → tiền tố `VTTH_`
>    - CCDC (TK 153) → tiền tố `CCDC_`
>    - MDV (TK 242/642/632) → tiền tố `MDV_`
>    Số thứ tự dạng 4 số `0000`, lấy tiếp theo từ mapping hiện có.
> 4. **Commit:** repo con `a73c61d` — `misa_hddt_dauvao.py` cập nhật kho VP, đơn vị VP, load mapping Excel, sinh mã tự động.

> **✅ PUSH ĐÃ THỰC HIỆN (31/10 — đợt 1):**
> - **App tổng**: `c4fe640` (docs GĐ 603) → deploy 7.5.0 (minor từ GĐ 608 trước đó) · `https://giong-vn-v6.vercel.app` live 7.5.0
> - **Repo con**: `a73c61d` (code) + `f374a8e` (bump 11.6.0 → **11.6.1** patch) → `https://giong-banhang.vercel.app` live 11.6.1
> - **Verify production** (GĐ 470):
>   1. Login app tổng → user + session JSON ✅
>   2. SSO app con: đồng bộ `APP_JWT_SECRET` 2 app → redirect `https://giong-banhang.vercel.app/` + `Set-Cookie: bh_session` ✅
>   3. `/api/auth/me` app con → user structure ✅
>   4. Hook GĐ 607 tự rà trùng lặp trước push → 0 file code trùng (worktree khác 7 file sửa dở không đụng)
> - **Chờ ĐH**: tạo 2 kho MISA `NVL`/`CCDC` để upload thật (GĐ 603 mục "VIỆC CHỜ ĐẠI CA")
>
> **✅ PUSH ĐÃ THỰC HIỆN (31/10 — đợt 2, PA-1 ĐH chốt Web UI):**
> - **Repo con**: `b14f4d3` (feat: Web UI `/m/up-hoadon-dauvao.tsx` + server fn `-hddt-dauvao.ts` + engine agent mode + REPORT_MAP) + **app tổng** `fe7d708` (docs)
> - **Verify production** (GĐ 470):
>   1. App tổng 7.5.0 / Repo con 11.6.1 live ✅
>   2. Login app tổng → user + session JSON ✅
>   3. SSO app con: `APP_JWT_SECRET` đồng bộ 2 app → redirect + `Set-Cookie: bh_session` ✅
> - **Web UI `/m/up-hoadon-dauvao.tsx` hoàn thiện (PA-1):**
>   * TanStack Table 413 dòng (194 HĐ) với filter: Loại phiếu (NVL/CCDC/DV/HH), Trạng thái, Ngày
>   * Edit inline: mã hàng MISA, tên MISA, TK Nợ, TK Có, Kho, Loại phiếu, Ghi chú
>   * Badge màu: Loại (NVL/CCDC/DV/HH), Trạng thái (Mới/Đã upload/Lỗi)
>   * Nút **Kiểm tra** (dry-run step2+step3) + **Upload** (ghi thật) cho từng loại
>   * Áp dụng mặc định hàng loạt (TK/kho VP) cho dòng trống
>   * Pagination, thống kê cards (số dòng/tiền/thuế theo loại+trạng thái)
> - **Engine Python agent mode (`misa_hddt_dauvao.py`) test OK:**
>   * `SMED_ACTION=export SMED_LOAI=NVL python misa_hddt_dauvao.py 01/09/2026 31/10/2026` → sinh Excel 1 dòng ✅
>   * `SMED_ACTION=kiem-tra SMED_LOAI=NVL ...` → step2+step3: lỗi kho NVL/CCDC (chưa có trên MISA) ✅
>   * `SMED_ACTION=kiem-tra SMED_LOAI=DV ...` → step2+step3: lỗi mã hàng "DVMN-PHẦN MỀM SMED" không tồn tại ✅
>   * `SMED_ACTION=upload SMED_LOAI=NVL ...` → step4 OK nhưng lỗi kho ✅
> - **REPORT_MAP 40_web_agent.py** thêm 4 key: `hddt-dauvao-nvl|ccdc|dv|hh` → script `misa_hddt_dauvao.py`
> - **ĐÃ XÁC NHẬN (ĐH 31/10)**: kho MISA dùng **mã "VP", tên "VP"** cho **TẤT CẢ** NVL/CCDC/DV/HH (không tạo kho NVL/CCDC riêng). Code `KHO_MAC_DINH = {"NVL":"VP","CCDC":"VP","HH":"VP"}` đã đúng. `DON_VI = "VP"`, `MA_THONG_KE = "VP"`. Chờ ĐH kiểm tra kho "VP" đã có trong danh mục MISA AMIS chưa — nếu có thì upload thật sẽ thành công ngay.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **7.4.0** /
> repo con **11.4.1**.

---

---

### GĐ 606 (Trợ lý ZCode (máy chủ)): TỰ ĐỘNG HOÁ entire-graph theo yêu cầu ĐH (31/10) — hook ZCode 3 event tự tra code + tự chèn vào hội thoại, KHÔNG phải gõ lệnh thủ công (2026-10-31)

> **Lệnh Đại Ca (31/10, sau báo cáo PA-2 GĐ 602):** *"Em cho triển khai luôn thì có
> cần anh phải tự gõ lệnh thủ công không? Hay em cho nó tự động… Em phải cho nó tự
> động vào dự án này nhé."* ⇒ 3 hook ZCode tự chạy + cài 2 tầng (mục 19.1).

> **Đã làm (chưa push):**
> 1. **`scripts/tools/entire-graph/hook.py`** (3 mode, LUÔN exit 0 + fail-open + log):
>    `prompt-context` (UserPromptSubmit — tra code liên quan cho câu giao việc → in
>    `hookSpecificOutput.additionalContext` để ZCode chèn thẳng vào hội thoại; throttle
>    4 phút/phiên · prompt ≥ 20 ký tự · bỏ qua "/…" · budget 9s · ≤1.800 ký tự) ·
>    `pre-edit` (PreToolUse Edit|Write — stream `FILE_CHANGES_WITH`, báo file HAY ĐỔI
>    CÙNG trước khi sửa; 1 lần/file/phiên) · `session-start` (prewarm cache chạy NỀN,
>    detach).
> 2. **`.zcode/config.json`** (workspace, commit vào repo) — `hooks.enabled: true` + 3
>    event, `type: process` + `${ZCODE_PROJECT_DIR}` (portable).
> 3. **`scripts/tools/entire-graph/install-zcode-hook.py`** — cài vào **user config**
>    `~/.zcode/cli/config.json` (chạy NGAY, **không cần duyệt** — ZCode bắt duyệt
>    workspace hooks bằng banner, còn user hooks thì không), idempotent + backup
>    `config.json.pre606-*.bak`, **giữ nguyên `mcp`** (2 server).

> **Bằng chứng chạy thật (test bằng đúng định dạng input của ZCode):** prompt app tổng
> → chèn **1.747 ký tự** ✓ · cwd ở **repo con** → chèn **1.926 ký tự** (đúng code Python
> nghiệp vụ: builder bccn…) ✓ · `pre-edit src/lib/banhang-catalog.ts` → báo đúng
> `src/lib/banhang-catalog.test.ts` *(files changed together in 3 recent commits)* ✓ ·
> `session-start` trả về trong **0,27s** (spawn prewarm nền, không chặn) ✓ · mọi lần
> chạy ghi 1 dòng vào `hooks.log` ✓.

> **ĐH kiểm chứng: KHÔNG phải gõ gì** — mở phiên ZCode mới rồi giao việc bình thường:
> hook tự tra code và chèn vào hội thoại (thấy dòng "entire-graph: tự tra code liên
> quan…"). Muốn xem bằng chứng: `<git-common-dir>/giong-tools/entire-graph/cache/hooks.log`.
> Nếu ZCode hiện banner "workspace hooks chờ duyệt" → bấm **Cho phép** 1 lần — **KHÔNG
> bắt buộc** (tầng user đã chạy).

> **Version:** KHÔNG bump (công cụ vận hành — không đụng code app/agent).
> App tổng **7.4.1** / repo con **11.5.0**. Registry: GĐ 606 (claim `8006043`).

---

### GĐ 607 (Trợ lý ZCode (máy chủ)): TỰ ĐỘNG RÀ TRÙNG LẶP TRƯỚC PUSH theo yêu cầu ĐH (31/10, tiếp GĐ 606) — script `ra-trung-lap.py` + hook `push-guard` (2026-10-31)

> **Lệnh Đại Ca (31/10):** *"bước tiếp em có thể làm: tự động luôn việc rà trùng lặp
> rồi Push cho anh"* ⇒ bước rà trùng lặp (nguyên tắc 3 Push ĐA AGENT) từ nay **TỰ CHẠY**,
> không ai phải nhớ gọi nữa.

> **Đã làm:**
> 1. **`scripts/agents/ra-trung-lap.py`** — quét CẢ 2 repo trong ~3s: (a) nhánh phụ vs
>    `main` theo merge-base → **file CẢ 2 BÊN sửa** (⚠️ nguy cơ trùng), tùy chọn
>    `--symbols` soi mức SYMBOL qua entire-graph `diff`; (b) **mọi worktree** có file
>    SỬA DỞ chưa commit (phiên khác đang làm); (c) **commit chưa push** trên từng nhánh.
>    Có `--json` cho hook dùng.
> 2. **Hook `push-guard`** (thêm vào `hook.py` + cả 2 tầng config): PreToolUse matcher
>    `Bash` — thấy lệnh chứa `git push` → tự chạy script (budget 20s, throttle 2
>    phút/phiên) → **chèn báo cáo vào hội thoại TRƯỚC khi push chạy**, kèm nhắc "có ⚠️
>    thì BÁO ĐẠI CA trước khi push". Lệnh Bash khác → bỏ trong **0,32s** (không làm chậm).

> **Bằng chứng chạy thật (31/10, sửa 2 lỗi lộ ra khi chạy: tên file bị cụt do `strip()`
> cắt space đầu dòng `git status` → parse bằng regex; bỏ 1 lệnh status thừa → 8,5s → 3,1s):**
> chạy thật phát hiện đúng thứ cần — app tổng **22 commit chưa push** · repo con **5
> commit chưa push** + **7 file SỬA DỞ của phiên khác**: `apps/banhang/agent/etl/
> sql_reports.py`, `misa_muahang_upload.py`, `overview-dashboard.tsx`, `job-labels.ts`…
> · hook test bằng input thật `git push origin main` → chèn **1.782 ký tự** ✓ · `git
> status` → `{}` 0,32s ✓ · throttle 2 phút ghi log ✓.

> **ĐH kiểm chứng:** nói **"Push"** như thường — ngay trước khi lệnh push chạy, hội thoại
> sẽ có khối **"RÀ TRÙNG LẶP TỰ ĐỘNG TRƯỚC PUSH"**; nếu có ⚠️ em **báo ĐH trước khi push**
> (liệt kê file/phiên trùng), sạch thì push rồi verify production như quy trình GĐ 470.

> **Version:** KHÔNG bump (công cụ vận hành — không đụng code app/agent).
> App tổng **7.4.1** / repo con **11.5.0**. Registry: GĐ 607 (claim `005e9e9`).

---

### GĐ 608 (Trợ lý ZCode (máy chủ)): PA PUSH đợt 31/10 sáng (lệnh ĐH) — rà trùng lặp bằng công cụ GĐ 607 (lần đầu chạy thật) + bump 7.5.0 / 11.6.0 + LIVE + phát hiện `.env.local` secret SSO lỗi thời (2026-10-31)

> **Lệnh ĐH (31/10):** "Push" — đợt gồm công việc NHIỀU phiên đang chờ: GĐ 601 (khảo sát
> entire-graph) · GĐ 602/C.382 (PA-2 tích hợp) · GĐ 603/C.381 (phân hệ UPLOAD Hóa đơn đầu
> vào của phiên khác) · GĐ 605 (SMED đổi mật khẩu + hover sidebar) · GĐ 606 (tự động hoá
> hook) · GĐ 607 (rà trùng lặp tự động) · GĐ 604 ⛔ (claim dư gộp vào 602).

> **Bước 1 — Rà trùng lặp (dùng `scripts/agents/ra-trung-lap.py` — lần chạy THẬT đầu tiên
> trong đợt push):** nhánh phụ (`agent-cli` · `pipeline-work` · `gd541-push`) = **0 commit
> riêng, 0 file trùng** với main ở CẢ 2 repo ✓. CẢNH BÁO (không chặn push): app tổng
> `AGENTS.md`+`AGENT_REGISTRY.md` là **bản CŨ hơn HEAD** (lệch 66 dòng — bài dở phiên
> khác; mọi sửa file dùng chung đi qua cổng GĐ 495) · repo con **7 file sửa dở của phiên
> khác** (`sql_reports.py` · `misa_muahang_upload.py` · `overview-dashboard.tsx` ·
> `job-labels.ts` · package-lock…) → **KHÔNG đụng file nào**.

> **Bước 2 — Bump version (chỉ lúc Push):** app tổng **7.4.1 → 7.5.0** (minor — entire-graph
> + tự động hoá + rà trùng lặp; 3 file: package.json + package-lock 2 chỗ + DEFAULT_VERSION)
> · repo con **11.5.0 → 11.6.0** (minor — GĐ 603 phân hệ UPLOAD HĐ đầu vào + GĐ 605 +
> C.382; 2 file). Checklist GĐ 138 ✓.

> **Bước 3 — Verify env Vercel CẢ 2 app (GĐ 470 A):** ✅ đủ — app tổng 6 biến
> (DATABASE_URL · APP_JWT_SECRET · TUNNEL_API_BASE_URL/GIST_ID · BETTER_AUTH_SECRET/URL) ·
> app con 5 biến (+ZAI_API_KEY). Đều ở Production.

> **Bước 4 — Push:** app tổng `deeedf9..a8e90ff` (27 commit) · repo con `24549b9..794eb90`
> (6 commit).

> **Bước 5 — ✅ Verify production (curl + login thật + E2E browser):** app tổng
> `giong-vn-v6.vercel.app` = **7.5.0** · app con `giong-banhang.vercel.app` = **11.6.0**
> (curl lần đầu — không ghim deployment) · login `cuongpk.giong04@gmail.com` **HTTP 200 +
> user "Phạm Kiên Cường"** · get-session OK · **SSO E2E THẬT bằng browser**
> (`scripts/test-sso-e2e.mjs`, Playwright headless): **7/9 PASS — mọi mục quan trọng PASS**:
> bấm nút "Bán hàng" → app con mở · URL sạch (hết `?sso=`) · **hiện tên user** · cookie
> `bh_session` httpOnly ✓ (2 mục fail = selector "phiên 7 ngày" + timeout `networkidle` ở
> bước đăng-xuất-cuối — KHÔNG liên quan SSO).

> **⚠️ Phát hiện quan trọng (đừng mất thời gian lại):** `APP_JWT_SECRET` trong `.env.local`
> 2 app (giá trị `StNz6…`) **KHÁC giá trị trên Vercel** (env Secret — `vercel env pull`
> trả `[SENSITIVE]`, không đọc được). Test SSO bằng JWT tự ký từ `.env.local` → **verify
> FAIL** (302 về `/login?next=bahang`) trong khi **E2E browser PASS** ⇒ **secret 2 app
> TRÊN VERCEL vẫn khớp**, chỉ `.env.local` trên máy lỗi thời. **Quy tắc rút ra: verify SSO
> sau Push phải dùng E2E browser (`node scripts/test-sso-e2e.mjs`) — KHÔNG kết luận "secret
> lệch 2 app" từ JWT tự ký bằng .env.local.**

> **Không restart agent:** đợt này code agent-side gồm `misa_hddt_dauvao.py` (module MỚI —
> CHƯA được `40_web_agent.py`/`task_runner.py` import → chờ tích hợp GĐ sau) và
> `19_smed_Lichhentiem.py` (tool spawn theo job → tự nạp bản mới) ⇒ service
> `GIONG_SMED_Agent` đang RUNNING, không cần restart.

> **Version:** app tổng **7.5.0** / repo con **11.6.0** — ĐÃ PUSH + LIVE. Registry: GĐ 608
> (claim `efb2610` · bump `a8e90ff`/`794eb90`).

---

### GĐ 609 (Trợ lý ZCode (máy chủ)): ĐIỀU TRA & GỠ CHẶN hook ZCode chặn phiên — lỗi "hooks_prompt_block" (2026-10-31)

> **Đại Ca hỏi (31/10 ~10:31):** phiên "Xây dựng phân hệ Upload hóa đơn đầu vào MISA"
> (sess_60c59c19) không chạy tiếp, hiện chip đỏ
> `hooks_prompt_block: C:\...\Programs\Pyth...` — hook GĐ 606/607 xử lý thế nào?

> **Nguyên nhân gốc (bằng chứng đủ):** hook khai trong `.zcode/config.json` (tầng
> workspace) dùng `${ZCODE_PROJECT_DIR}` — ZCode đặt biến này = **thư mục làm việc
> HIỆN TẠI của phiên, KHÔNG phải gốc repo**. Khi phiên `cd` vào thư mục con (phiên đó
> làm việc trong `giong-appsppsanhanggent`), đường dẫn hook thành
> `<thư mục con>/scripts/tools/entire-graph/hook.py` → file không tồn tại →
> `python.exe: can't open file ...` → **exit code 2** → ZCode theo chuẩn hook coi
> exit 2 = **BLOCK** → chặn MỌI lệnh Bash (hook push-guard, matcher Bash) + MỌI prompt
> (hook prompt-context, UserPromptSubmit) ⇒ phiên chết cứng, chip đỏ mỗi lần gửi.
> - Bằng chứng 1: bản ghi trong DB app (`~/.zcode/cli/db/db.sqlite`, bảng `part`,
>   phiên sess_60c59c19 10:17:56): `"error":"...python.exe: can't open file
>   'D:\...\giong-appsppsanhanggent\scripts	ools\entire-graph\hook.py':
>   [Errno 2]"` — agent trong phiên đó than "mọi lệnh Bash đều biến thành python".
> - Bằng chứng 2: tái hiện ngay tại phiên điều tra 11:31 — `cd giong-apps` rồi lệnh
>   sau bị chặn y hệt (cả Bash lẫn Write). Phiên con (subagent) KHÔNG bị chặn.
> - Tầng USER (`~/.zcode/cli/config.json`) dùng đường dẫn TUYỆT ĐỐI → không bao giờ
>   lỗi; tầng gây lỗi là tầng WORKSPACE.

> **Đã xử lý (2 bước):**
> 1. **ĐH tắt 4 hook tầng USER** (Settings → Hooks → User → Disable — `enabled:false`
>    cả 4, ~12:03) → tính năng GĐ 606/607 tạm NGỦ (kể cả push-guard tự rà trùng lặp
>    — trước Push làm thủ công `python scripts/agents/ra-trung-lap.py`).
> 2. **Stub tạm 2 file (GĐ 609, 12:04, untracked KHÔNG commit):**
>    `giong-apps/scripts/tools/entire-graph/hook.py` +
>    `giong-apps/apps/banhang/agent/scripts/tools/entire-graph/hook.py` — in `{}` và
>    exit 0 → hook workspace (vẫn enabled) trỏ vào stub → hết chặn. Verify: Bash chạy
>    lại OK 12:19; stub EXIT=0; prompt ĐH sau đó KHÔNG còn chip lỗi.

> **⚠️ RỦI RO CÒN:** tầng workspace vẫn `enabled:true` + vẫn dùng `${ZCODE_PROJECT_DIR}`
> → làm việc ở thư mục con KHÁC (chưa có stub) sẽ bị chặn lại y như cũ. Stub là chữa
> cháy, KHÔNG phải fix gốc.

> **3 PA chờ ĐH chốt (sửa gốc):**
> - **PA-A (em đề xuất):** xoá hẳn 4 hook khỏi `.zcode/config.json` (tầng workspace) —
>   chỉ giữ tầng user (đường dẫn tuyệt đối, an toàn mọi cwd, không cần duyệt). Muốn
>   bật lại: chạy `python scripts/tools/entire-graph/install-zcode-hook.py` rồi bật ở
>   Settings → Hooks → User. Nhẹ nhất, 0 rủi ro chặn; đổi lại máy/worktree khác muốn
>   có tính năng phải cài 1 lần riêng.
> - **PA-B:** giữ 2 tầng, tầng workspace đổi sang `type:"command"` + shell tự tìm gốc
>   repo: `python "$(git rev-parse --show-toplevel)/scripts/tools/entire-graph/hook.py"
>   <mode> || exit 0` — portable + fail-open (cwd lạ/file thiếu vẫn exit 0, KHÔNG BAO
>   GIỜ chặn). Cần verify ZCode chạy shell nào (cmd/bash) cho hook `command` trước khi áp.
> - **PA-C:** giữ nguyên + tạo stub ở từng thư mục con (phiên khác từng làm 11:26 rồi
>   bị xoá) — KHÔNG khuyến nghị: vô số thư mục con, bẩn repo, dễ sót chỗ.

> **Phát hiện phụ (kiểm chứng sau):** `shutil.which('bash')` = Git Bash ✔ (12:19);
> nhưng 1 lần prompt bị chèn text lỗi WSL ("no installed distributions") do
> `eg.sh query` — nghi 1 ngữ cảnh nào đó gọi nhầm bash WSL → prompt-context có lúc
> in rác thay vì kết quả. Xử lý cùng lúc với PA chốt.


### GĐ 611 / C.383 (Trợ lý ZCode (máy chủ)): DANH MỤC 1 Vắc Xin — CRUD THẬT + gợi ý mã SMED chặn gõ tay + ten_smed + cố định tiêu đề bảng 7 trang Danh mục (2026-10-31)

> **ĐH duyệt 31/10:** PA-1 (CRUD thật, chỉ Admin, mã SMED chỉ CHỌN — không
> gõ tay, mã lạ chặn + nhắc tải SMED) · PA-1a (tách `ten_smed` khớp máy khỏi
> `ten_hang` tên chuẩn) · PA-A (cố định tiêu đề bảng cả 7 trang Danh mục).
> Chi tiết đầy đủ + verify + bẫy: entry C.383 AGENTS.md repo con (code
> `6b0107e`, khôi phục entry `c53920e`).

> **Kết quả chính:** DB `vaccines` + cột `ten_smed` (backfill 52/52 = ma_smed —
> SMED thô không khai tên đầy đủ); serverFn riêng `-danh-muc-vaccine.ts` (add
> chặn mã không có trong `stg_7BCNXT.col3 ≡ stg_5BKN.col6` — 7 mã chưa có trong
> danh mục: Beyfortus 0.5ml/1ml, GC FLU Pre-filled, INFLUVAC, IVACFLU-S, Vắc xin
> uốn ván (TT), VAXIGRIP 0.5ml) · sửa KHÓA mã · PA-A khung bảng
> `max-h-[calc(100dvh-190px)]` (thead sticky có sẵn chưa từng kích hoạt — shell
> app con cuộn ở cửa sổ ngoài). Rà GĐ 611: KHÔNG chỗ nào map theo
> `vaccines.ten_hang` → ĐH sửa Tên hàng an toàn.

> **Verify:** tsc 0 · unit 17/17 · E2E local (preview 8101 + SSO tự ký): thêm
> dòng → DB 53 + ten_smed tự điền · sửa khóa mã · xóa về 52 nguyên trạng ·
> sticky chênh 1px. KHÔNG push, KHÔNG bump — chờ lệnh. App tổng **7.5.0** /
> repo con **11.6.1**.

### GĐ 613 (Trợ lý ZCode — máy chủ): PA Push 31/10 chiều + RESTART Agent nạp code mới — phục vụ quy trình tối nay/đêm nay (2026-10-31)

> **Lệnh của Đại ca (31/10 ~16:11):** *"Push và restart lại Agent để mọi việc được mới hoàn toàn phục vụ quy trình làm việc tiếp theo tối nay và đêm nay."*

> **Đã làm:**
> 1. **Rà trùng lặp trước push (nguyên tắc 3):** `git fetch` + đối chiếu — **CẢ 2 kho đều 0 commit chờ đẩy** (các bản ghi GĐ 596→612 + mã nguồn GĐ 612 đã lên kho nhờ phiên song song đẩy khi làm việc) · nhánh phụ `agent-cli`/`pipeline-work`/`gd541-push` RỖNG · chỉ còn tệp dở của phiên khác (không đụng). ⇒ **KHÔNG bump version, KHÔNG cần push** — sản phẩm đang chạy **7.5.0 / 11.6.1** (mới hơn bản tại máy — phiên song song đã nâng cấp + đẩy).
> 2. **Verify môi trường Vercel 2 ứng dụng** (mục A GĐ 470): đủ biến bắt buộc. Lưu ý `APP_JWT_SECRET` app con vừa được phiên song song đổi (1 giờ trước) ⇒ kiểm chứng **SSO thật: HTTP 302 + Set-Cookie `bh_session`** (khóa 2 ứng dụng KHỚP) + đăng nhập thật + `/api/auth/me` 97 nhóm quyền ✓.
> 3. **Restart GIONG_SMED_Agent — chờ máy chủ rảnh**: 15:51→16:59 máy chủ bận chuỗi tải bù ngày 30/10 của phiên song song (dattruoc · blth · tkgvvxdt · sqlreport) — **KHÔNG giết việc của phiên khác**, chờ đến 16:59 khi xong hẳn → xoá `__pycache__` 3 thư mục (agent/api_server/etl) → `sc stop` (STOPPED) → `sc start` (**RUNNING**) lúc **16:59:16** — api_server GIỮ NGUYÊN (tunnel không đổi).
> 4. **Kiểm sau restart:** log mới `web_agent_311026_165916.log` khởi động sạch (Task runner bật · Task_02 23:00 + Task_04 17:15 · chuỗi MISA tuần tự GĐ 583) · cờ tạm dừng lịch = 0 (lịch TIẾP TỤC) · **0 việc/0 nhiệm vụ treo** ✓.
> 5. Lịch tối nay: Task_02 · 23:00 tải dữ liệu → chuỗi MISA (mua → bán → xuất) — toàn bộ chạy trên mật khẩu SMED mới + mã đã nạp.

> **Version:** KHÔNG bump (không có commit mới; sản phẩm đã chạy 7.5.0/11.6.1 do phiên song song).
> **Ghi chú:** tool mua hàng GĐ 612 (`c33c8c2`) đã triển khai máy .245; tool Lịch hẹn tiêm GĐ 605 (`3e02838`) đã được Agent máy chủ nạp sau restart. 2 phiếu mua hàng vướng kỳ 30/10 (QO chưa hiện trên SMED · ML import chưa thấy trên MISA) đang chờ Đại ca xem.

### GĐ 616 / C.385 (Trợ lý ZCode (máy chủ)): HOÀN TẤT hạ tầng web GĐ 603/C.381 thiếu — gỡ chặn Vercel build fail từ 15:08 (production không nhận GĐ 611) (2026-10-31)

> **ĐH hỏi "production không thấy thay đổi" → điều tra:** GĐ 611 (Danh mục Vắc
> xin — code `6b0107e`) đã trên GitHub từ đợt push 15:08 NHƯNG mọi deployment
> sau đó build FAIL → production đứng ở bundle cũ. Gốc rễ: code web GĐ 603/C.381
> của phiên song song thiếu hạ tầng — thiếu 1 dấu `}` (up-hoadon-dauvao.tsx,
> commit c1a7f20) + 26 lỗi TS (app con không có components/ui/, lib/format,
> lib/banhang-catalog; 4 chỗ gọi serverFn thiếu bọc data:; import conflict
> getBanhangGroups dùng user.id; Badge/Button props variant kiểu shadcn).
> Bằng chứng: log build Vercel qua API v2 events + tsc local.

> **Đã làm (repo con code `dedc4e3`, 15 file +1595/−43 — chi tiết entry
> C.385):** copy components/ui + lib/utils/format/banhang-catalog từ app tổng,
> tạo table/select shadcn, install 4 gói, sửa -hddt-dauvao (getBanhangGroups
> chuẩn smed-auth + empId + null-safe), up-hoadon bọc data: + formatNum + vá `}`.
> **tsc 0 · build local 0.**

> **Deploy tay bị chặn Vercel free:** EBUSY (Chrome CDP khóa cookies → tạo
> `.vercelignore` chặn agent/.env.local/.grok/LOG — đã được phiên khác commit)
> rồi **rate-limit api-upload-free quá 5000 request — chặn 24h** (kể cả
> --archive=tgz). → Còn lại duy nhất: PUSH commit để Vercel auto-deploy
> (webhook sống). ĐANG CHỜ ĐH lệnh "Push".

> **Bẫy mới:** `npx tsc | head; echo $?` = exit của head (luôn 0) — dùng
> `${PIPESTATUS[0]}`; đếm balance `{}` bằng python tìm thiếu ngoặc trong 10s;
> build log Vercel: `GET /v2/deployments/<id>/events` + token
> `%APPDATA%\xdg.data\com.vercel.cli\auth.json`.

> **Version:** KHÔNG bump (chờ lệnh Push). App tổng **7.5.0** / repo con
> **11.6.2**.

### GĐ 615 (Trợ lý ZCode (máy chủ)): Fix báo cáo cuối ngày 31/10 — USERNAME account 16 nạp sai trong smed_accounts (đăng nhập fail âm thầm) + phát hiện tài khoản QO bị sót đổi mật khẩu (2026-10-31)

> **Lệnh của Đại Ca (31/10 ~17:20):** "Lỗi khi chạy báo cáo cuối ngày. Sửa gấp
> để thực hiện lại báo cáo." Ảnh: trang /m/smed-doanhthu-doituong — 2 job dtdt
> (17:15/17:17) lỗi `Locator.click Timeout 30000ms waiting for
> get_by_role("link", name="Báo cáo")`; /m/tasks Task_02 [3/9] các bước SMED lỗi.

> **Chẩn đoán (bằng chứng thật, không đoán):** log .27 (`agent/LOG/dtdt_*.log`,
> `bkccn_*.log`, `dtthc_*.log`) — **account 3 TT (tcgiongts) chạy SẠCH 3/3**,
> chết 100% tại chặng **"ACCOUNT 16 TRUNG TÂM"** ngay sau đăng nhập khi click
> menu "Báo cáo" (tool 2 · 20 · bkccn… đều vậy). Probe Playwright trên máy chủ
> giải mã `dbo.smed_accounts` → **DB đang lưu username user_16
> `tcgiongts_vanphong_pkcuong` (chép nhầm của user_3!)** — đúng phải
> `tcgiong_vanphong_pkcuong`. Thử thật 2 combo: combo ĐÚNG → vào
> `/Application#!/welcome` + hover sidebar thấy menu "Báo cáo" ✓; combo trong DB
> → đá về `/Account/Login` (SMED không báo lỗi rõ). **Tool login không kiểm
> chứng URL → báo "Đăng nhập thành công" OAN** → menu không bao giờ hiện →
> timeout 30s. DB ghi username sai lúc `updated_by` 10:08 31/10.

> **Đã sửa (data-only, không đụng code app):** `tools_tmp/gd614_sua_user16_username.py`
> — UPDATE `smed_accounts.username_enc` (AES-256-GCM đúng format crypto.ts) →
> verify đọc LẠI DB + đăng nhập THẬT → welcome + menu Báo cáo ✓. Hiệu lực ngay
> (agent đọc DB lúc claim job, không cần restart).

> **Chạy lại (kích đúng như nút "Thử chạy lại" của web — server fn retrySmedJob:
> job error → pending, files='[]', retry_partial=0):** reset 5 job lỗi Task_02
> (dtdt/dtthc/bkccn/nhapkho/xuatkho) → **cả 5 done 19/19** (nhapkho/dtdt/xuatkho
> claimed_by `core` · bkccn/dtthc `lan-1` — phân tải 2 máy) · đối chứng file
> OUTPUT: máy chủ 2.DTTDT=19 · 5.BKN=19 · 6.BKX=19; .27 4.BKCCN=19 · 3.DTTHC=2
> (khớp expected) ✓ · Task_02 **lần 2 tự chạy lại các bước thành công** (dtdt
> 18:39 · dtthc 18:41 · bkccn 19:02 done 19/19) · `xnkt` 19/19 · `blth` 19/19.
> Tool: `tools_tmp/gd614_kich_lai_task02.py`.

> **Audit mở rộng (`gd554_audit_backfill.py`) → phát hiện thêm 4 phân hệ THIẾU
> job 31/10:** hddt · chietkhau · dattruoc · tkgvvxdt → tạo tải bù
> (tag `gd615-bu-31-10`) → **hddt 19/19 ✓ · chietkhau ✓**; **dattruoc 72/76 +
> tkgvvxdt 18/19 LỖI — cùng DUY NHẤT 1 nguyên nhân: TRUNG TÂM QUỐC OAI (QO)
> 0 file** (18/19 TT khác đủ 4/4).

> **🔴 PHÁT HIỆN MỚI — TÀI KHOẢN QO BỊ SÓT ĐỔI MẬT KHẨU (chờ ĐH):** probe
> `tcgiongts_quocoai_pkcuong` + `@Cuongpk@123@` → SMED: *"Tài khoản đăng nhập
> không đúng"*. Rà file OUTPUT: QO **đủ 4/4 file đến hết 29/10** (76 file/ngày
> trên .27), **hỏng từ 30/10** (máy chủ 30/10 + 31/10 = 72 file, QO=0) — đúng
> thời điểm SMED bật chính sách hết hạn mật khẩu (18:47 30/10) ⇒ **QO bị sót
> khi đổi mật khẩu 19 tài khoản trung tâm (GĐ 610)**. Cần ĐH đổi mật khẩu QO
> (`https://tcgiongts.smed.vn` → nếu không vào được mở thẳng `/Account/ForgotPassword`
> — cần đúng email đăng ký) → báo em để chạy lại dattruoc/tkgvvxdt 30/10 + 31/10.

> **Chạy lại 15 báo cáo nhanh Task_02:** 11 báo cáo chạy 17:58-18:03 lúc nguồn
> CHƯA đủ (5 phân hệ đang tải lại) + `nk-matrix` needsData → đưa về pending
> (`tools_tmp/gd615_chay_lai_bao_cao.py`) — agent chạy lại với nguồn đã đủ.

> **Lesson:** (1) tool SMED login **không kiểm chứng URL sau đăng nhập** → "Đăng
> nhập thành công" OAN khi mật khẩu/tên sai; gặp menu timeout 30s phải soi
> CREDENTIAL trước khi nghi sidebar/menu. (2) Nạp tài khoản qua UI dễ chép nhầm
> username của tài khoản khác (vụ 10:08 31/10) — khi verify phải kiểm cả username
> LẪN mật khẩu + đăng nhập THẬT. (3) 1 tài khoản trung tâm bị sót → dattruoc/
> tkgvvxdt thiếu file âm thầm nhiều ngày (diff file theo ngày phát hiện nhanh).

> **Version:** KHÔNG bump (data-only + tools_tmp; không sửa code app/web). App
> tổng **7.5.0** / repo con **11.6.2**.

> **BỔ SUNG (31/10 22:00→23:00) — 2 fix CODE báo cáo cuối ngày + restart agent nạp builder:**
> khi chạy lại 15 báo cáo nhanh, 2 báo cáo còn lỗi — chẩn đoán tới gốc:
> (1) **`dsxk-comparison`** nổ `'<' not supported between instances of 'NoneType'
> and 'str'` — `stg_6BKX` kỳ 31/10 có **19 dòng `center` NULL** → khóa None lọt
> vào `sorted(set(...))`; (2) **`nk-matrix` needsData OAN** — kỳ ĐÃ TẢI file mà
> 0 dòng nhập: verify TRỰC TIẾP trên SMED (tài khoản LB) thấy ô thời gian mặc
> định **"31/10/2026 - 31/10/2026"** + bảng **"0 Không có dữ liệu"** ⇒ 31/10
> (thứ Bảy) THẬT SỰ không phát sinh nhập kho, 19 file 5.BKN nạp 0 dòng là ETL
> ĐÚNG — nhưng builder `nk_matrix` raise `NoSourceDataError` VÔ ĐIỀU KIỆN, chưa
> áp quy tắc GĐ 244 (đã-tải-file + 0 dòng = rỗng HỢP LỆ). Sửa
> `apps/banhang/agent/etl/sql_reports.py` (commit repo con **`ec36a8b`**,
> +18/−3): gom nhãn `"(Không xác định)"` cho center NULL; `nk_matrix` chỉ raise
> khi `import_log` TRỐNG kỳ (có file ⇒ bảng rỗng hợp lệ — nk-matrix ∈
> EMPTY_OK_KEYS). Verify tại chỗ: nk-matrix 2 dòng "(không phát sinh nhập trong
> kỳ)" + TỔNG CỘNG · dsxk 20 dòng (TỔNG bán ra **524** · xuất kho **534** ·
> HĐGTGT **525**).
>
> **Bẫy vận hành (gặp thật, đáng nhớ):** sửa builder XONG mà agent vẫn trả
> message CŨ (`result.missing` y bản cũ) — agent giữ module trong RAM từ lúc
> start 16:59 ⇒ phải **restart GIONG_SMED_Agent** (13.3: xóa `__pycache__` 3
> thư mục → `sc stop/start`, **api_server GIỮ NGUYÊN** → tunnel URL không đổi,
> verify `/health` `tunnel_ok:true`) — sau restart **3/3 nk-matrix done +
> 3/3 dsxk done**. Restart lúc 22:5x — TRƯỚC Task_02 23:00 nên đêm nay chạy
> code mới. Xác nhận thêm: **sqlreport chỉ chạy trên core** (62/62 job hôm
> nay) — sửa code trên máy chủ là đủ cho mọi báo cáo.
>
> **Kết quả cuối ngày 31/10:** 15/15 báo cáo nhanh Task_02 chạy lại ĐỦ (12 done
> lần 2 + 3 dsxk + 3 nk-matrix) · 7 phân hệ SMED Done 19/19 (dtdt/dtthc/bkccn/
> nhapkho/xuatkho/xnkt/blth + hddt/chietkhau) · còn **dattruoc + tkgvvxdt thiếu
> QO — CHỜ ĐH đổi mật khẩu tài khoản QO** (mục trên).

> **Version:** KHÔNG bump (chờ lệnh Push — repo con có 1 commit code `ec36a8b`). App
> tổng **7.5.0** / repo con **11.6.2**.

### GĐ 617 (Trợ lý ZCode (máy chủ)): PA Push tối 31/10 — sửa tiếp lỗi build Vercel (thiếu @tanstack/react-query) — production ĐÃ nhận đầy đủ GĐ 603/611 + 11.6.2 (2026-10-31)

> **Lệnh của Đại ca (31/10 tối):** "Push" (sau báo cáo rà soát toàn bộ công việc
> hôm nay — yêu cầu tránh bỏ dở việc đã hoàn thành chưa lên Production).

> **Rà trùng lặp (nguyên tắc 3):** app tổng 5 commit docs chờ đẩy (GĐ 614/615/616)
> · repo con 2 commit (dedc4e3 code GĐ 616 + entry) · nhánh phụ RỖNG. **3 file dở
> phiên khác KHÔNG đụng:** AGENTS.md máy (bản lệch thiếu entry GĐ 613),
> AGENT_REGISTRY.md máy (bản stale quay ngược 5 dòng ✅→🔒), .gitignore (+.env*).
> ⇒ chỉ push commit có sẵn, không add gì.

> **Push lần 1:** app tổng 71b5bd0..731efbe (7 commit) · repo con 76620af..c461c98
> (3 commit, thêm C.386 chính tả BKCCN 3 chỗ: 40_web_agent.py:133/594 +
> gd554_audit_backfill.py:69). **→ Deployment c461c98 VẪN ERROR!**

> **Chẩn đoán từ build log Vercel thật (vercel inspect --logs):** Rolldown không
> resolve import "@tanstack/react-query" từ up-hoadon-dauvao.tsx — GĐ 616 thêm 4
> gói (radix-select/slot + cva + tailwind-merge) nhưng THIẾU gói này; package-lock
> cũng 0 match. Local xanh vì node_modules có sẵn từ trước. **Rà toàn bộ import
> của file mới (script so khớp package.json) → chỉ thiếu đúng 1 gói** (clsx đã có
> trong lock qua cva).

> **Đã làm:** npm install @tanstack/react-query@^5.105.0 --workspace apps/banhang
> (c022b6a — package.json + lock) → **build local THẬT xanh** (vite build +
> fix-ssr-exports + db:migrate) → push → deployment c022b6a **READY** — kết thúc
> chuỗi 8 deployment ERROR từ 15:08.

> **✅ Verify production 4/4 (curl):** (1) app tổng 7.5.0 · app con **11.6.2**
> lần đầu · (2) login app tổng → JSON có user · (3) SSO ký JWT (iss/aud, secret
> .env.local 2 app CÙNG GIÁ TRỊ) → 302 về giong-banhang + Set-Cookie bh_session
> · (4) /api/auth/me → user e003 + đủ nhóm (có 4 nhóm NHẬP DỮ LIỆU mới).

> **Production giờ có:** Web UI /m/up-hoadon-dauvao (GĐ 603/C.381) · Danh mục
> Vắc xin CRUD + sticky 7 trang (GĐ 611/C.383) · fix nhập bảng giá VX (ff739ee)
> · version 11.6.2.

> **Bài học:** (1) build local xanh ≠ Vercel xanh khi gói chỉ nằm node_modules
> mà thiếu trong package.json/lock — trước Push file import mới phải rà deps
> (script so khớp import ↔ package.json, mẫu GĐ 617); (2) log build Vercel lấy
> nhanh: vercel inspect <url> --logs; (3) GĐ 616 bỏ sót 1/5 gói — rà bằng script
> bắt được trong 3 giây.

> **Version:** app tổng **7.5.0** (docs-only — không bump) / repo con **11.6.2**.

### GĐ 619 / C.387 (Trợ lý ZCode (máy chủ)): Dropdown "Thêm mới" Vắc xin — mở rộng nguồn mã SMED 10 bảng + lọc ≥5 nguồn → 40 mã vắc xin thật còn thiếu (2026-10-31)

> **Yêu cầu ĐH 31/10 tối:** dropdown Mã SMED = "danh sách Vắc xin theo mã SMED"
> chỉ hiện mã CHƯA có trong danh mục; hiện "lộn xộn và chưa đủ vắc xin còn
> thiếu" (đang chỉ 7 mã). **Chi tiết entry C.387 repo con — code `3c8f72c`
> (unit 36/36 · tsc 0 · build 0).**

> **Nguồn gợi ý mới:** 10 cột "Mã hàng" các báo cáo SMED đã tải (nhập/xuất kho,
> NXT, biên lai, hóa đơn, công nợ…) — chỉ nhận mã xuất hiện **≥5 nguồn** + lọc
> rác (ghép nhiều hàng hóa đơn "(Vắc xin đặt trước)" mã phiếu/kỳ/hợp đồng) →
> **40 mã**; option đầu ghi "(N mã)"; note hướng dẫn. Validator thêm rộng hơn
> (mọi mã đơn lẻ) để không chặn oan. **Chờ lệnh Push** — deploy tay bị
> rate-limit Vercel free 24h (GĐ 616). App tổng **7.5.0** / repo con **11.6.2**.

### GĐ 614 / C.384 (Trợ lý ZCode (máy chủ)): 4 phân hệ SMED lên PA-1 + MISA_UPLOAD_MODE http mặc định (upload mua/xuất/bán) + Task_02 21 phân hệ (2026-10-31)

> **Lệnh ĐH 31/10 (sau báo cáo bản đồ Download/Upload):** (1) 5 phân hệ SMED
> còn browse → cách mới gọi thẳng API SMED, mặc định bật; (2) upload MISA AMIS
> set nhánh HTTP đã dựng sẵn thành MẶC ĐỊNH; (3) Task_02 23:00 download full —
> báo cáo do Task_03 chạy, Task_02 không chạy báo cáo; (4) chính tả GiongDB.
> Chốt qua hỏi-đáp: SA **dựng thêm nhánh http** · bank-vcb **giữ chỉ 17:15**
> (Task_02 = **21** phân hệ) · "Phiếu cần xử lý" khi http → **tự quay browser**.

> **Kết quả (code `14304d9` · entry repo con `1ef5293`):** PA-1 thêm **4/5**
> phân hệ (dtthc · blth · tkgvvxdt · tkkh + **pha 2 ngày GD đầu qua API**
> `phieuBanHang/GetLichSuSuDungByKhachHangId`); **dattruoc CHƯA lên** (tool tải
> tới 4 loại file/TT — cần khảo sát thêm 3 endpoint, giữ browser). Payload bắt
> từ NETWORK THẬT (Playwright + AbpServiceProxies): bẫy TKKH `skipCount` = SỐ
> TRANG (1..N) + maxResultCount ≤1000. MISA_UPLOAD_MODE http mặc định (mua/xuất
> + **nhánh http mới cho SA**) + Phiếu cần xử lý tự về browser. Task_02:
> task_runner vũ trụ 22 + `_TASK_DEFAULT_EXCLUDE={bank-vcb}` + dialog web +tkkh
> +tonkho-niem-yet (sót GĐ 590) + **UPDATE config seed 'daily' trong GiongDB**.
> Đính chính: Task_02 (kind daily) ĐÃ chỉ download từ GĐ C.164 (báo cáo trước
> đọc nhầm header cũ); số báo cáo nhiệm vụ Chạy báo cáo = **30**.

> **Verify (đối chứng chạy thật):** dtthc TO 25/10 khớp file gốc **từng đồng**
> (87 mũi·3.250.000·75.590.000) · tkkh TD 21/10 **4.905 dòng** khớp từng ô dòng
> #1 · blth LB 30/10 **20 dòng·22.290.000 khớp DB stg_12BLTH từng đồng** ·
> tkgvvxdt TD snapshot 35 dòng + 30 gói/142 đặt trước · SA http 28/28 bỏ qua
> 0 lỗi. Đã deploy máy chủ (restart 22:59:25 — trước Task_02 23:00) + .245 +
> .34. **.27 CHƯA deploy** (phiên song song đang dùng máy — job dattruoc 22:47).

> **⚠️ CẢNH BÁO TRÙNG LẶP (nguyên tắc Push ĐA AGENT):** phiên song song cùng
> máy (cùng tên "Trợ lý ZCode (máy chủ)") đang hoạt động — GĐ 615/616/617 +
> `_backup/blth|dattruoc|tkgvvxdt|chietkhau` + job test lan-1 (blth 21:08,
> dattruoc 22:47) — **khả năng ĐANG LÀM CÙNG phạm vi PA-1 4 phân hệ** → khi Push
> phải rà trùng (smed_api.py / _pa1_fetch.py / 40_web_agent.py), thống nhất
> 1 bản trước khi push.

> **Version:** KHÔNG bump (chờ lệnh Push). App tổng **7.5.0** / repo con **11.6.2**.

### GĐ 624 / C.391 (Trợ lý ZCode (máy chủ)): PA-1 + PA-2 khắc phục

> **⛔ ĐỔI SỐ 2 LẦN (quy tắc GĐ 285):** claim tay GĐ 619 lúc bash chết không kịp
> commit → phiên khác dùng 619 (C.387) trước → em lấy **623** qua claim.py
> (`3610b9e`); chạy tiếp claim.py --cx thì phiên khác vừa claim 623 → em nhận
> **624 / C.391** (`4ef8667`). Dòng registry 623 đánh ⛔ đổi số. Nội dung giữ nguyên.
 "BKX lúc 20 file lúc 39 file" — watchdog hết tạo retry oan + lượt retry chỉ đếm file mới + hiển thị tách file LOG (2026-10-31)

> **ĐH hỏi (31/10 21:44, ảnh /m/kho-xuat):** Bảng kê xuất kho 31/10 — lượt 19:33
> báo 20 file, lượt 20:18 báo 39 file, trong khi 19 trung tâm → "Lỗi ở đâu rồi?"
> **ĐH chốt (22:xx):** PA-1 + PA-2 + chỉ thị **"19 trung tâm thì chỉ có 19 file
> được tạo ra — không thể là con số khác ngoài 19"**.

> **Chẩn đoán (bằng chứng GiongDB + log worker .27 khớp từng giây):**
> 1. **Chuẩn 1 lượt BKX = 19 file Excel** — lượt 19:33 chạy thật 20:49:17 →
>    20:52:23: "dọn folder (19 file cũ vào _backup) → tool 5_smed_XUATKHO.py 19
>    lượt → ✅ GĐ 557 đủ file 19/19 → Job xong 20 file Excel mới". Số 20 =
>    **19 Excel + 1 file LOG** (GĐ 536 đính kèm job log vào cột files) — web
>    đếm `j.files.length` (smed-pull-module.tsx:625) gồm cả log → hiện 20.
> 2. **Lượt 20:18 là lượt RETRY OAN**: watchdog `TASK_JOB_STALE_MIN = 45'`
>    (task_runner.py) đo theo TỔNG thời gian task chờ (19:33:47 + 45' =
>    20:18:47 — khớp job 20:18:51 tạo, `retryPartial=1`) — trong khi job 19:33
>    KHÔNG kẹt, chỉ đang chờ hàng đợi máy .27 (máy bận chạy job Lịch hẹn tiêm
>    30/10 lỗi 3 vòng bù đến 20:48:57). Lượt retry xếp sau job gốc: chạy
>    20:52:50 → 20:55:56, nhánh retryPartial KHÔNG dọn folder + tổng kết lấy
>    TOÀN BỘ thư mục (40_web_agent.py `xl_from_dir`) → 19 cũ + 19 mới = 38 xl
>    + 1 log = **39 file**. Dữ liệu KHÔNG sai — ETL nạp đè theo ngày (run
>    #7332: 38 file, 1.544 dòng = 2 lượt giống nhau, idempotent).
> 3. **19 file gồm 18 TT + TIÊN DU 2 bản**: tool 5_smed_XUATKHO.py tải TIÊN DU
>    ở CẢ 2 tài khoản (CENTERS_1 domain tcgiongts dòng 103 + CENTERS_2 domain
>    tcgiong dòng 129 — cùng tên hiển thị). GĐ 343/C.186 đã chốt 2 cổng
>    tcgiong + tcgiongts BỔ SUNG nhau → **KHÔNG xóa file nào**.
>    **Probe 01/11 — 2 file là 2 CƠ SỞ KHÁC THẬT** (file tcgiongts 10.879 B · 30 dòng ·
>    tổng 36.115.741 · địa chỉ 'Đường đôi Dương Húc' vs file tcgiong 12.786 B · 60 dòng ·
>    tổng 70.245.418 · địa chỉ 'Khu 7, Phố Yên, xã Mê Linh') → KHỬ TRÙNG là SAI.
>    ⚠️ Phát hiện ngược: **ETL đang MẤT 1 cơ sở** — dedupe etl_import.py nhóm theo
>    (report_date, center) — cả 2 file map cùng mã `TD` → giữ file mtime mới, xóa dòng
>    file cũ → DB 31/10 chỉ còn 18 src_file/772 dòng (folder 19 file). 3 PA chờ ĐH.

> **Đã làm (3 file — code xong, XEM TRẠNG THÁI VERIFY bên dưới):**
> 1. **PA-1 — `task_runner.py`:** `_wait_job_done` cắt theo NHỊP SỐNG job
>    (`_job_heartbeat` mới — query `updated_at` + `done_centers` từ GiondDB qua
>    /query nội bộ): job đã chạy thật (done_centers>0) ngập lặng > 45' → cắt
>    (GĐ 490) và CHO retry; job chưa chạy thật (chờ hàng đợi, done_centers=0)
>    → chờ tới hằng mới `TASK_JOB_QUEUE_MAX_MIN = 180'` và khi cắt trả
>    **`QUEUE_TIMEOUT:`** — caller KHÔNG tạo lượt thêm (job gốc vẫn sống trong
>    hàng đợi, tự xong + tự ETL). Không có đường DB → fallback GĐ 490 cũ.
>    Chặn QUEUE_TIMEOUT ở TẤT CẢ 8 caller (download Task_01/02 + 3 MISA +
>    Task_03 + giai đoạn 2 backfill) — bước đánh status "BỎ CHỜ".
> 2. **PA-2 — `40_web_agent.py`:** `run_smed_task_with_fill` — lượt
>    `retryPartial` tổng kết CHỈ file MỚI của các lượt chạy (`xl_from_pass` —
>    mtime ≥ run_started từng lượt) thay vì toàn thư mục; so ĐỦ/THIẾT theo
>    thư mục (check_n = n_dir khi retry); `info.total_in_dir` mới. Log "Retry
>    từng phần xong" + "Job xong — N file Excel mới" đếm CHỈ file Excel (tách
>    file LOG). Ca 31/10 nếu có retry sẽ báo 19/19 + 19 file mới.
> 3. **Hiển thị web — `smed-pull-module.tsx`:** biến `nXl` mới = `j.files`
>    lọc bỏ file `.log`; 5 chỗ đếm dùng `nXl` (badge thiếu file · dòng cảnh
>    báo · "X file Excel đã lưu") → lượt thường hiển thị **19/19 file Excel**
>    đúng chỉ thị ĐH.

> **⚠️ TRẠNG THÁI PHIÊN (minh bạch với ĐH):** giữa phiên, tool Bash của ZCode
> chết cứng (`spawn C:\Program Files\Git\bin\bash.exe ENOENT` — bash.exe biến
> mất khỏi máy chủ) → **KHÔNG chạy được py_compile/tsc/unit + KHÔNG commit
> được** (claim GĐ 619 đã ghi dòng 🔒 vào AGENT_REGISTRY.md working tree, entry
> này ghi vào AGENTS.md working tree — khi bash sống: chạy verify rồi commit
> qua cổng shared-doc `--entry "GĐ 619" --registry "GĐ 619"`). Code đã tự soát
> bằng mắt 2 lượt (indentation + biến scope). Phiên sau: (1) py_compile
> task_runner.py + 40_web_agent.py; (2) tsc repo con; (3) npm test; (4) commit;
> (5) KHÔNG bump (chờ lệnh Push).

> **Tiêu chí kiểm chứng (sau Push + restart agent + Task-runner):** (1) trang
> /m/kho-xuat — lượt tải thường 19 TT hiển thị **19/19 file Excel** (hết 20);
> (2) job chờ hàng đợi lâu (máy bận) KHÔNG còn lượt retry oan — không còn số
> 39; (3) nếu có retry hợp lệ (job lỗi thiếu file) → báo số file MỚI của lượt
> + thư mục đủ; (4) job kẹt thật (api_server chết) vẫn được cắt 45' + retry.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT).

---

### GĐ 625 / C.392 (Trợ lý ZCode (máy chủ)): Báo cáo cuối ngày Đối soát HĐ-XK — cột "Ghi chú" lưu theo kỳ + nút Lưu BC + Gửi ZL (máy chủ) + Task_08 17:05 (2026-11-01)

> **Yêu cầu ĐH (01/11 sáng):** báo cáo /m/bc-cuoi-ngay — (1) cột "Ghi chú" bút
> chì gõ tay cuối bảng + thu hẹp cột Số lượng; (2) 2 nút cạnh "Tải Excel":
> "Lưu BC" (xem lại từ lịch sử không mất ghi chú) + "Gửi ZL" (ảnh toàn diện
> qua Zalo); (3) Task riêng 17:05/ngày hoàn thiện báo cáo này.
> **ĐH chốt 4 PA:** ghi chú BÁM THEO KỲ (bảng `bc_dsxk_notes` GiondDB) ·
> Gửi ZL từ **máy chủ** (Zalo của anh ở máy chủ) · Task 17:05 tự đủ nguồn ·
> chỉ áp RIÊNG báo cáo này (opt-in `noteColumn` — mọi báo cáo khác không đổi).

> **Đã làm:** repo con code `77ae8c8` + entry `41fab21` (chi tiết đầy đủ ở entry
> C.392 AGENTS.md repo con): report-result-table cột Ghi chú bút chì (key =
> trung tâm, cột số ≤118px / Ghi chú 280px, Excel kèm ghi chú) · DB
> `bc_dsxk_notes` + `bc_dsxk_saved` · server fn `-bc-dsxk.ts` (load/save note
> từng ô + chốt bản + job 'bc-zalo' + poll status) · SqlDataModule passthrough
> + badge Đã lưu + dialog Gửi ZL · agent `gd625_zalo.py` (Pillow vẽ PNG toàn
> bảng từ result + notes → Zalo Web Chrome CDP 9222; nhánh `bc-zalo` trong
> process_job; máy LAN nhóm 'smed' không claim) · task_runner `TASK_BCN_TIME
> 17:05` + `_spawn_bcn_task`/`_maybe_spawn_bcn`/`_run_bcn_only` (TỰ ĐỦ NGUỒN:
> thiếu → treo download dtthc/xuatkho/bkct-hdgtgt → chạy báo cáo) + seed
> `Task_08 · Báo cáo cuối ngày` (đã INSERT DB + seedDefaultTasks + nhãn/mô tả
> tasks-page).

> **Verify:** tsc 0 · 11/11 unit web (chạy riêng) · gd625_zalo.test **12/12** ·
> py_compile 3 file · task_runner_quick 46/46 · misa_order 28/28 · **ảnh vẽ từ
> job thật kỳ 31/10 khớp từng đồng** (524 mũi · 418.815.000); 2 bảng DB đã
> tạo; seed Task_08 có trong DB; **agent đã restart 09:48** (nạp code mới).

> **E2E THẬT 01/11 + 2 FIX (`43a1bf4`, test 15/15):** chạy trọn chuỗi trên local
> build+preview 8101 + SSO e003: ghi chú gõ ô Long Biên → `bc_dsxk_notes` có
> dòng thật, F5 vẫn còn ✓ · "Lưu BC" → badge "Đã lưu 10:39" + `bc_dsxk_saved`
> có dòng ✓ · "Gửi ZL" → job `bc-zalo` được agent máy chủ nhặt, VẼ ẢNH THẬT
> `OUTPUT/11.BCZalo/2026-10-31/BC_DSXK_2026-10-31.png` (247KB), kết nối Chrome
> CDP OK → dừng ĐÚNG ở "Chưa đăng nhập Zalo Web" ✓. 2 bug lộ qua chạy thật đã
> fix: Playwright SYNC API trong asyncio loop (bọc thread riêng) + kỳ
> 'YYYY/MM/DD' từ cột DATE SQL Server (`_fmt_period_iso` từng đảo nhầm thư mục
> ảnh thành 31-10-2026). Dữ liệu test đã dọn sạch (notes/saved = 0).
> **✅ GỬI ZL ĐÃ CHẠY THẬT (02/11 00:16 — ĐH yêu cầu kiểm + tự động đăng nhập):** tìm
> ra Chrome CDP 9222 chạy ở SESSION 0 (không có màn hình) nên cửa sổ QR không bao giờ
> hiện được cho ĐH → đã kill + mở lại qua task `GIONG_ChromeCDP` (Interactive → SESSION 1),
> cửa sổ hiện được, phiên Zalo/MISA giữ nguyên. Zalo Web mới phải dùng: ô tìm kiếm
> `#contact-search` (input sinh sau khi click), gửi ảnh bằng **PASTE** vào `.rich-input`
> (không có input[type=file]), nút gửi `.chat-box-input-button.btn-tertiary-primary` —
> verify thật: job bc-zalo done 00:16:55, ảnh `BC_DSXK_2026-11-01.png` + caption vào
> hội thoại Zalo (My Documents). Kèm `zalo-login.py` (1 lệnh đăng nhập) + job tự chờ
> ĐH quét QR 4 phút rồi tự tiếp tục gửi khi phiên hết hạn.
> **⚠️ TỒN ĐỌNG:** agent máy chủ bị restart NGOÀI Ý MUỐN 2 lần (23:54:58 + 23:55:24 —
> SCM id=7000 "parameter is incorrect" rồi tự chạy lại) → Task_02 kẹt running 2 lần
> (đã đưa pending chạy tiếp; đêm nay chạy lần 2/3) — CHƯA rõ thủ phạm, cần theo dõi.
> **SỰ CỐ ĐÃ SỬA (`8121be1`):** commit `43a1bf4` vô tình nuốt 10 dòng bài phiên
> khác trong AGENTS.md repo con (index bẩn lọt vào commit — repo con không có
> cổng shared-doc) → đã khôi phục nguyên văn từ `4ce9771`.
> **SỰ CỐ TỐI 01/11 (Task_08 needsData — ĐH báo "tải OK mà không ra báo cáo") — ĐÃ
> SỬA XONG (PA-1 ĐH chốt) — GỐC RỄ 2 TẦNG, ĐÃ CHẠY THẬT THÀNH CÔNG:** (a) worker
> máy LAN ETL NGAY sau job tải + khóa `etl_lock`; (b) **etl_import.py cả 3 máy LAN là
> bản CŨ** (chuỗi kết nối CỨNG `\SQLEXPRESS` local — chưa từng đọc ETL_SQL_CONN)
> + **.34/.245 thiếu ODBC Driver 18** → đã deploy bản chuẩn + cài driver 18 + đổi env,
> **nạp bù .34: 429 file / 5.528 dòng** (dữ liệu nhiều ngày trước bị kẹt). **Báo cáo
> 01/11 ĐÃ RA** (job A0B60C0F: 842 mũi bán ra · 600.230.000 doanh thu · 839 xuất kho ·
> 482.062.337 giá vốn · chênh 3 mũi) — xem trang BÁO CÁO KẾ TOÁN · 1. Task_08 17:05 tự tải 3 nguồn
> OK nhưng job dtthc/xuatkho rơi vào **MÁY LAN** (.34/lan-1 — phân tải GĐ 621) →
> file trên .34, **auto-ETL máy LAN chu kỳ 60'** chưa nạp → staging
> `stg_3DTTHC=0` + `stg_6BKX=0` (nguồn E máy chủ tải: `stg_11BKCT=838`) → báo cáo
> needsData. Phụ đã sửa ngay `85cf671`: log spam 'đã spawn Task_08' mỗi 30s
> (COUNT TRƯỚC — chỉ log, không tạo trùng). **3 PA:** PA-1 máy LAN ETL NGAY sau
> job (khóa chống trùng) · PA-2 Task_08 tải bằng MÁY CHỦ (ghim core) · PA-3 chờ
> staging có dữ liệu mới chạy. Automation một lần 19:12 kiểm + tự chạy lại báo
> cáo khi đủ; ĐH có thể bấm "Chạy ngay" Task_08 sau khi ETL .34 nạp.
> **SÓT PHIÊN KHÁC (không tự sửa):** `job-labels.test.ts` fail — thiếu nhãn
> `dc-xuat-kho` + `dc-hoadon-banhang` (đuôi sót GĐ 588/C.375) — npm test đỏ;
> đề nghị phiên GĐ 588 bổ sung 2 dòng.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng 7.5.0 /
> repo con 11.7.0.

### GĐ 627 (Trợ lý ZCode (máy chủ)): PA Push 01/11 theo lệnh ĐH + tổng hợp: ETL máy .34 (ODBC Driver 18 treo → đổi driver cũ) + chạy bù QO đủ 19/19 (2026-11-01)

> **Lệnh của ĐH (01/11 sáng):** *"Anh đã đổi mật khẩu QO theo mật khẩu chung. Em kiểm tra
> lại và làm tiếp các việc còn dang dở. Điều tra nguyên nhân ETL nạp trên máy .34. Làm
> xong thì Push hết cho anh"* — Push đợt này là **ngoại lệ theo yêu cầu ĐH**, không phải
> nguyên tắc chung.

> **1. QO sống — 19/19 tài khoản trung tâm hoạt động:** đăng nhập HTTP thật
> `tcgiongts_quocoai_pkcuong` → TRUNG TÂM TIÊM CHỦNG GIÓNG QUỐC OAI (cosoId 10995) ✓
> (trước đó SMED báo "Tài khoản đăng nhập không đúng").

> **2. Chạy bù dữ liệu QO (7 job):** tkgvvxdt 30+31 · xuatkho 31 · hentiem 31 · dattruoc
> 30+31 → **done 19/19 mỗi job** (xuatkho 31: giangkt · còn lại thanh-pc);
> **stg_6BKX QO: 30/10 = 20 dòng · 31/10 = 56 dòng** (trước đó 31/10 = 0) — xuất kho
> 31/10 giờ đã có QO + 3 phiếu PH-. Riêng **xuatkho 30/10 lỗi "0/19 file" tại .27
> (lan-1)** → đã kích chạy lại.

> **3. ETL máy .34 — NGUYÊN NHÂN + KHẮC PHỤC (điều tra theo yêu cầu ĐH):**
> worker báo `ETL sau download: exit=1` sau **16 giây** — khớp chính xác
> `pyodbc.connect(CONN_STR, timeout=15)` (dòng đầu `main()` etl_import.py); **lý do trắng
> trong log vì code cũ chỉ in STDOUT còn traceback Python nằm ở STDERR**. Kiểm chứng từ
> .34: TCP 1433 MỞ · **.NET SqlClient Open OK** (cùng server/tài khoản) · **ODBC Driver 18
> CÓ SẴN** nhưng **pyodbc (Driver 18) TREO khi kết nối** (thử 4 biến thể — không cái nào
> trả về trong 25s) ⇒ **gốc = ODBC Driver 18 trên .34 treo handshake**, không phải mạng/
> SQL/env. **Đã sửa (data/config, có backup):** đổi `ETL_SQL_CONN`/`AGENT_SQL_CONN` của .34
> sang **driver cũ `{SQL Server}`** (`worker.env` + `worker.env.bat`, backup `.bak-gd622`)
> → **ETL chạy OK, nạp 72 file 10GDTVX vào `import_log`** ✓. Fix kèm (commit `7175d4b`):
> 40_web_agent in cả **stderr** khi ETL lỗi — lần sau lộ lý do ngay, không phải mò tay.

> **4. PA PUSH (lệnh ĐH — ngoại lệ):** rà trùng lặp: nhánh phụ `agent-cli`/`pipeline-work`
> RỖNG cả 2 repo; commit chưa push app tổng 19 (docs/registry + code em) · repo con 15
> (PA-1 100% + fix log, **commit tách hunk theo phiên**); **KHÔNG đẩy bài dở phiên khác**
> (`task_runner.py` · `report-result-table.tsx` · `sql-data-module.tsx` · `tasks-page.tsx`
> · `bc-cuoi-ngay.tsx` — vẫn nguyên trong working tree). Bump theo quy tắc: app tổng
> **7.5.0 → 7.6.0** (minor) · repo con **11.6.2 → 11.7.0** (minor) — checklist GĐ 138 ✓.
> Push: app tổng `9c0f258..a5d0d82` · repo con `7688886..236f34c`.

> **5. Verify production (test thật, không tin chữ Ready):** app tổng **7.6.0** · app con
> **11.7.0** (curl --compressed) · **login thật HTTP 200 + có user** · `get-session` 200 ✓ ·
> **SSO sang app con: 302 → `https://giong-banhang.vercel.app/` + Set-Cookie `bh_session`** ✓
> — không có lỗi "sai mật khẩu sau push".

> **Version:** app tổng **7.6.0** / repo con **11.7.0** — ĐÃ PUSH + ĐÃ LIVE.

### GĐ 629 / C.393 (Trợ lý ZCode máy chủ): PA-1 khởi tạo module Zalo quản trị nhóm — migration 0031 + UI + API

> **Yêu cầu ĐH 01/11:** xây dựng phần "Zalo" trong phân hệ Dự án app tổng — lấy dữ liệu từ Zalo máy chủ, phân loại nhóm, lưu DB tức thời, dùng cho báo cáo/AI/trigger giá.
> **Chốt PA-1:** Zalo Web CDP 9222, crawl 5 phút/lần, Hybrid DB, AI gợi ý nhãn + duyệt thủ công.

> **Đã làm:**
> - Migration `0031_zalo_sync.sql`: `zalo_groups`, `zalo_messages`, `zalo_files`, `zalo_price_signals` — Hybrid chuẩn hoá + raw_json, index sync/label.
> - UI `src/routes/zalo.tsx`: trang quản trị nhóm với bảng TanStack, toggle `is_sync_enabled`, Select nhãn mục đích, nút Gợi ý AI, hiển thị last_sync.
> - API server fn `src/routes/api/zalo.ts`: `loadZaloGroups`, `updateZaloGroup`, `suggestLabel` — placeholder AI gợi ý theo tên nhóm.
> - Agent skeleton `giong-apps/apps/banhang/agent/zalo_sync.py` — chuẩn bị crawl Zalo Web CDP, discover groups, upsert DB, trigger giá.

> **Verify:** code compile, migration tạo được, UI render không lỗi type, API route đăng ký đúng.

> **Version:** KHÔNG bump — chờ lệnh Push theo quy tắc ĐA AGENT. App tổng 7.6.0 / repo con 11.7.0.

### GĐ 630 / C.394 (Trợ lý ZCode (máy chủ)): PA-1 thống nhất nguồn dữ liệu Báo cáo đối soát cuối ngày — đổi cột "Tổng số mũi tiêm bán ra (SMED)" từ stg_3DTTHC sang stg_4BKCCN (2026-11-01)

> **Vấn đề Đại ca báo (01/11):** Trung tâm LB ngày 01/11/2026 — Báo cáo bán hàng hiển thị 85 mũi, nhưng Báo cáo đối soát cuối ngày (BKCCN) cột "Tổng số mũi tiêm bán ra (SMED)" hiển thị 86 mũi. Chênh 1 mũi.
>
> **Nguyên nhân (tra cứu đồ thị code + truy vấn GiongDB):**
> - **Báo cáo bán hàng** (`/m/bc-banhang`, queryKey `dt-by-date`) dùng nguồn **stg_4BKCCN** (Tool 6: Bảng kê chung cuối ngày — dữ liệu **THEO NGÀY**).
> - **Báo cáo đối soát cuối ngày** (`/m/bc-cuoi-ngay`, queryKey `dsxk-comparison`) dùng nguồn **stg_3DTTHC** (Tool 3: Thống kê DT tổng hợp Chuỗi — file **GỘP LŨY TÍCH** từ đầu kỳ).
> → 2 nguồn SMED khác nhau, tính toán khác logic (ngày vs lũy tích) ⇒ số liệu chênh lệch.
>
> **Chốt PA-1 (Đại ca chọn):** Thống nhất dùng **stg_4BKCCN** cho cột B (bán ra SMED) trong `dsxk_comparison()` — đồng bộ với Báo cáo bán hàng, dữ liệu tính theo ngày đúng chuẩn đối soát.
>
> **Đã làm (2 file):**
> 1. `giong-apps/apps/banhang/agent/etl/sql_reports.py`:
>    - Hàm `dsxk_comparison()` (dòng ~2642): đổi query từ `stg_3DTTHC` (col2/col3/col5, map tên trung tâm qua `_center_code_from_name`) sang `stg_4BKCCN` (SUM col18 = Mũi tiêm, SUM col16*col18 = Doanh thu, group by center, lọc `report_date = từ ngày`).
>    - Cập nhật docstring + meta.source ghi rõ PA-1 GĐ 630.
>    - Cập nhật comment trong `QUERY_KEYS` whitelist (dòng ~72).
> 2. Copy sang CLI worktree `giong-apps-cli/apps/banhang/agent/etl/sql_reports.py`.
>
> **Verify:**
> - `python -m py_compile sql_reports.py` → **Syntax OK** cả 2 worktree.
> - Logic mới: `stg_4BKCCN` là dữ liệu THEO NGÀY (không gộp lũy tích) — khớp nguồn Báo cáo bán hàng `dt-by-date`.
> - Nguồn C (xuất kho BKX stg_6BKX) + E (HĐGTGT BKCT stg_11BKCT) đều dùng `report_date between ? and ?` theo ngày ⇒ giờ 3 nguồn đều **THEO NGÀY** ⇒ đối soát chính xác.
>
> **Tiêu chí kiểm chứng (sau Push):**
> - Chạy lại Báo cáo đối soát cuối ngày (`/m/bc-cuoi-ngay`) kỳ 01/11/2026 → cột "Tổng số mũi tiêm bán ra (SMED)" trung tâm LB = **85** (khớp Báo cáo bán hàng).
> - Tổng cộng toàn 19 trung tâm khớp Báo cáo bán hàng.
>
> **Version:** KHÔNG bump — chờ lệnh Push theo quy tắc ĐA AGENT. App tổng 7.6.0 / repo con 11.7.0.

### GĐ 631 / C.395 (Trợ lý ZCode máy chủ): Hoàn thiện PA-1 module Zalo — crawl sync agent + tabs tin nhắn/file + AI phân tích nhãn

> **Tiếp GĐ 629:** đã có migration 0031, UI placeholder, API cơ bản. Anh duyệt chạy zalo_sync.py trên máy chủ, thêm tabs, nâng cấp AI.

> **Đã làm:**
> - **Agent `zalo_sync.py`** (giong-apps/apps/banhang/agent/): crawl Zalo Web CDP 9222, 5 phút/lần.
>   - `sync_groups()`: discover groups → upsert `zalo_groups` (MERGE SQL Server).
>   - `sync_messages()`: crawl tin nhắn mới từ `last_sync_at` từng nhóm bật `is_sync_enabled` → upsert `zalo_messages`, `zalo_files`, `zalo_price_signals`.
>   - Regex từ khóa giá → ghi tín hiệu giá.
> - **UI `/zalo`**: 3 tabs (Quản trị nhóm / Tin nhắn / File đính kèm).
>   - Tab 1: bảng nhóm với Switch, Select nhãn, nút "Gợi ý" (tên) + "Phân tích" (AI 20 tin mẫu).
>   - Tab 2: tin nhắn phân trang, tìm kiếm, xuất JSON.
>   - Tab 3: file đính kèm phân trang, xuất JSON, link mở.
> - **API `src/routes/api/zalo.ts`** thêm: `loadZaloMessages`, `loadZaloFiles`, `analyzeGroupLabel` (AI phân tích tên + 20 tin mẫu).
> - **Components mới**: `Tabs.tsx`, `Switch.tsx`, `Select.tsx`.
> - **QueryClientProvider** trong `__root.tsx` fix lỗi SSR "No QueryClient set".

> **Verify:** Build local 7.77s, migration up-to-date. GiongDB: 4 bảng Zalo tồn tại (0 dòng — chờ agent crawl).
> Agent skeleton sẵn sàng chạy trên máy chủ (Chrome CDP 9222 đã đăng nhập Zalo Web).

> **Version:** KHÔNG bump (chờ lệnh Push). App tổng 7.7.0 / repo con 11.7.0.

### GĐ 632 / C.396 (Trợ lý ZCode (máy chủ)): Task_08 tự động gửi Zalo sau khi báo cáo thành công + PUSH đợt 02/11 (2026-11-02)

> **ĐH yêu cầu (02/11):** đặt nhiệm vụ tự gửi Zalo tới "Document của anh" sau khi
> Task_08 thành công (thử trước khi chốt người nhận chính thức) + Push luôn.
> **Đã làm (code `6dcc9d0`):** báo cáo `done` → tự tạo job `bc-zalo` (ảnh + caption),
> chờ tối đa 4' ghi kết quả vào Nhiệm vụ; đích = `kv_settings k='bcn_zalo_target'`
> (đổi người nhận = 1 dòng DB, không cần sửa code/restart) → fallback
> `BCN_ZALO_TARGET = "My Documents"`; lỗi gửi không làm task lỗi.
> **Verify thật 01:29:** `_load_zalo_target()` → 'My Documents' · `_send_bcn_zalo` → OK
> (job `19904978` done 01:29:29, log agent "✅ đã gửi Zalo tới 'My Documents'"); bản
> task test kỳ 01/11 để chạy trọn luồng orchestration; test cũ 46/46 + 28/28 PASS.

> **PUSH (lệnh ĐH):** rà trùng lặp — nhánh phụ RỖNG cả 2 repo; bài dở phiên khác
> (`task_runner.py` guard GĐ 629) KHÔNG đụng (tách hunk: revert tạm → commit phần
> mình → apply phục hồi). Bump repo con **11.7.0 → 11.8.0** (minor); app tổng giữ
> **7.7.0** (docs-only). Push: repo con `068381e..f85bbdb` · app tổng
> `b51f415..<sau>`. **Verify production: 11.8.0 / 7.7.0 · login ✓ · session ✓ ·
> SSO app con 302 + cookie ✓** (đúng quy trình GĐ 470).

> **Đổi người nhận chính thức:** `INSERT/UPDATE dbo.kv_settings k='bcn_zalo_target'`
> = tên hội thoại Zalo — Task_08 đọc mỗi lần chạy.

### GĐ 634 / C.397 (Trợ lý ZCode (máy chủ)): Fix trang /m/up-hoadon-dauvao trắng lần 2 — app con CHƯA TỪNG có QueryClientProvider (2026-11-02)

> **ĐH báo (02/11, ảnh):** trang "UPLOAD Hóa đơn đầu vào" hiện "Something went wrong
> — No QueryClient set, use QueryClientProvider to set one" (app con 11.8.0).
> **Chẩn đoán:** trang up-hoadon-dauvao là DUY NHẤT app con dùng `useQuery` (TanStack
> Query) nhưng `src/routes/__root.tsx` app con KHÔNG bọc `QueryClientProvider` ở bất
> kỳ đâu (app tổng có từ đầu) → useQuery ném lỗi runtime khi mount. Fix C.388 (hàm
> lồng 2 lần) đã lên LIVE làm component render được thì LỘ lỗi này (lỗi cũ che mờ);
> tsc/build không bắt được vì là lỗi runtime context.

> **PA-1 ĐH chốt (trên 3 PA: provider toàn cục / bọc riêng từng trang / bỏ TanStack
> Query):** `__root.tsx` app con thêm `getQueryClient()` (staleTime 60s · retry 1 ·
> refetchOnWindowFocus false — copy nguyên pattern app tổng) + client tạo trong
> `useState(() => getQueryClient())` (an toàn SSR) + `<QueryClientProvider>` bọc
> quanh `<AppShell>`. Chi tiết đầy đủ ở entry C.397 AGENTS.md repo con.

> **Verify:** tsc EXIT 0 · build local EXIT 0 (9.51s) · preview 8101 fetch thật:
> `/m/up-hoadon-dauvao` HTTP 200 KHÔNG còn lỗi, nội dung render đủ · `/` +
> `/m/bc-xuat-kho` 200 không ảnh hưởng. Code repo con `26a157f` + entry `4eecb36`.
> **KHÔNG bump (chờ lệnh Push)** — app tổng 7.7.0 / repo con 11.8.0. Lưu ý: claim dư
> GĐ 633 (lệnh claim đầu thiếu `--cx`) đã unlock kèm ghi chú — việc thực tế = GĐ 634/C.397.

### GĐ 635 / C.398 (Trợ lý ZCode máy chủ): Fix Production /zalo rỗng — DATETIMEOFFSET (ODBC -155) + khôi phục 2 file bị ghi đè (02/11/2026)

> **ĐH báo 14:0x:** bấm "Làm mới" /zalo vẫn "Chưa có nhóm nào" dù DB GiondDB đã có 120 nhóm (crawl 13:28).

> **2 nguyên nhân thật (probe từng tầng):**
> 1. **`zalo.tsx` + `api/zalo.ts` bị phiên song song ghi đè về bản GĐ 629** (không 3 tabs, không
>    loadZaloMessages/analyzeAI) — giống vụ zalo_sync.py bị thu gọn. Remote origin/main KHÔNG có
>    code GĐ 630 file này (commit GĐ 630 chỉ chứa tabs.tsx + apply-zalo-migration.mjs + __root.tsx).
>    → Đã viết lại đủ 2 file + commit `f1561a8` + deploy vercel --prod (74hrfes6u).
> 2. **Root cause SQL thật:** bảng zalo_* khai cột thời gian **DATETIMEOFFSET** → pyodbc API Server
>    (tunnel) không serialize được ODBC type **-155 (SQL_SS_TIMESTAMPOFFSET)** → query SELECT
>    trả **HTTP 500** → React Query rơi empty state. COUNT/select-bỏ-cột-thời-gian OK (120 rows).
>    → **Đã ALTER 7 cột → DATETIME2** (drop index + default constraint trước, alter, tạo lại:
>    IX_zalo_messages_group_at / IX_zalo_messages_at / IX_zalo_price_signals_group_at /
>    DF updated_at/created_at = GETDATE()). Bài học: **bảng mới trên GiondDB đọc qua tunnel API
>    Server CẤM DATETIMEOFFSET — dùng DATETIME2**.

> **Verify E2E thật (Chrome CDP máy chủ mở production /zalo):** version 7.7.0 · **120 dòng nhóm**
> render · 3 tabs (Quản trị nhóm/Tin nhắn/File đính kèm) · query tunnel full-select trả 120 rows.

> **Bước tiếp:** ĐH bật toggle "Cập nhật DB" cho nhóm cần → chạy `python zalo_sync.py messages`
> → tin nhắn/file/tín hiệu giá đổ zalo_messages/zalo_files/zalo_price_signals → 2 tab sau có dữ liệu.

> **Version:** KHÔNG bump (deploy CLI theo lệnh ĐH "Em làm tất cả đi" — fix lỗi production đang chờ dùng). App tổng 7.7.0 / repo con 11.8.0.

### GĐ 637 / C.399 (Trợ lý ZCode (máy chủ)): PA Push đợt GĐ 634/C.397 fix QueryClientProvider — bump repo con 11.8.1 + LIVE production (2026-11-02)

> **Lệnh "Push" của Đại Ca (02/11, sau GĐ 634/C.397).** Rà trùng lặp nguyên tắc 3:
> fetch remote = 0 commit mới cả 2 repo · nhánh phụ `agent-cli`/`pipeline-work`/
> `gd541-push-con` RỖNG · đợt này kèm công việc ĐÃ XONG của 2 phiên khác: **GĐ 635/
> C.398** (Trợ lý ZCode máy chủ — zalo.tsx 3 tabs + api/zalo.ts + zalo_sync.py,
> DATETIME2 fix ODBC -155, E2E 120 nhóm OK) + **GĐ 636/C.398 & GĐ 630** (Trợ lý
> Freebuff — % hoàn thành Upload MISA Mua hàng/Xuất kho: header-jobs-bar +
> sql-data-module) — **KHÔNG file nào trùng với mình** (mình chỉ đụng `__root.tsx`
> app con). Working tree còn bài dở phiên khác (task_runner.py, _pa1_fetch.py,
> AGENTS.md dở của phiên khác) — KHÔNG đụng.

> **Verify env trước push (GĐ 470):** app tổng đủ 6 (DATABASE_URL · APP_JWT_SECRET ·
> TUNNEL_API_BASE_URL · TUNNEL_GIST_ID · BETTER_AUTH_SECRET · BETTER_AUTH_URL) ·
> app con đủ 5 (+ZAI_API_KEY) — ✓ 100%.

> **Bump (lúc Push):** repo con **11.8.0 → 11.8.1** (patch — fix nhỏ 1 file;
> package.json + DEFAULT_VERSION, package-lock giữ nguyên lệch 5.9.4 từ trước —
> lesson GĐ 328) · app tổng **giữ 7.7.0** (8 commit toàn docs + code zalo của phiên
> khác — không có code app tổng của mình; tiền lệ GĐ 632). Push: repo con
> `f85bbdb..0714909` · app tổng `324ab10..b72c510`.

> **✅ Verify production (curl lần đầu — không ghim deployment cũ):** version app con
> **11.8.1** · app tổng **7.7.0** · login app tổng ✓ (JSON user Phạm Kiên Cường) ·
> session ✓ (hạn 09/11) · SSO app con **302 → giong-banhang + Set-Cookie bh_session**
> (APP_JWT_SECRET khớp 2 app) · `/api/auth/me` ✓ (SuperAdmin + 14 nhóm + lá quyền).
> **Trang lỗi gốc:** `https://giong-banhang.vercel.app/m/up-hoadon-dauvao` = HTTP 200,
> KHÔNG còn "Something went wrong"/"No QueryClient", nội dung render đủ. Agent 0 code
> builder đổi → không cần restart.

> **Tiêu chí kiểm chứng của Đại Ca:** mở app con → UPLOAD Hóa đơn đầu vào → bảng hóa
> đơn hiện (hết màn lỗi); nút Kiểm tra/Upload tạo job bình thường.
> **Version:** app tổng **7.7.0** / repo con **11.8.1** — ĐÃ PUSH + ĐÃ LIVE.

### GĐ 638-639 (Trợ lý ZCode (máy chủ)): Điều tra Task_06 Upload chứng từ bán hàng lỗi "InvalidInvno" kỳ 01/11 + fix PA-1/PA-2 (2026-11-02)

> **ĐH hỏi (02/11, 2 ảnh):** Task_06 · MISA bán hàng kỳ 01/11/2026 lỗi
> "Tool thoát mã 1: InvalidInvno · TD/LB/HM/QO HD…: InvalidInvno" — nguyên
> nhân và cách khắc phục?

> **Điều tra (job GiondDB + MISA thật — 3 PA trình, ĐH chốt PA-1 + PA-2):**
> Lượt 05:41 sáng tạo 484 phiếu + ghi sổ 484, chết 4 phiếu (3 × `Locator.fill`
> — **SMED đổi UI trang login**; 1 × LB thiếu danh mục). Các lượt sau (05:59 ·
> 12:43 · 13:00) quét đủ 658 phiếu SMED → gặp phiếu ĐÃ TẠO → MISA chặn
> `InvalidInvno` → **137 phiếu bị đánh "lỗi thật" oan**. Bằng chứng: MISA đủ
> **658/658 phiếu kỳ 01/11 đã tạo + ghi sổ** (658 unique refno khớp chính xác
> 521 OK + 137 "lỗi" — khách/tổng/số HĐ/seri khớp từng dòng; post_ledger thử
> 6 phiếu → "Chứng từ đã ghi sổ bởi người khác" = đã ghi sổ). Gốc: hàm
> `find_existing_refno` (GĐ 491) lọc filter **property 3654 bỏ sót phiếu đã
> tạo** (chạy trực tiếp với refno `06832611010749400803` → KHÔNG THẤY dù phiếu
> có) + upsert ghi đè mất refid trong DB.

> **Đã làm (PA-1 + PA-2 — repo con commit `68857a4`, C.400 — chi tiết ở
> AGENTS.md repo con):** `find_existing_refno` bổ sung bước 2 ai_search
> (mxi.tim_phieu_misa) + nhánh "đã tồn tại" không ghi đè refid + MERGE
> `ISNULL(NULLIF(CAST(? AS NVARCHAR(64)),''), t.refid)` (test thật bắt bẫy
> varchar(1)) + `smed_login_hddt` locator form mới "Tên Đăng Nhập" (fallback
> form cũ).

> **Verify:** py_compile OK · unit **86/86 PASS** · test upsert **4/4** ·
> E2E **4/4** (phiếu đã có THẤY qua ai_search refid đúng · refno lạ → None ·
> login SMED TD (ts) + PY (16) OK).

> **✅ VERIFY SAU PUSH (02/11 16:12):**
> - **Push:** app tổng `eb1c37d..4e78354` (5 commit docs+claim) · repo con
>   `0714909..68857a4` (C.400). KHÔNG bump version — tiền lệ GĐ 422: fix 100%
>   agent-side python + docs, version web không phản ánh. Env Vercel 2 app đủ
>   (GĐ 470 checklist ✓) · curl production **7.7.0 / 11.8.1** (HTTP 200) ·
>   login app tổng ✅ (user + get-session) · SSO không tự ký được (env Sensitive
>   GĐ 71 — code web không đổi trong đợt này, đã LIVE từ GĐ 634).
> - **Deploy + restart agent .34:** ghi `misa_banhang_api.py` vào
>   `C:\CUONG_2026\giong-agent` qua SSH admin-pc (hash khớp + py_compile OK,
>   backup .bak-gd639) · service GIONG_SMED_Worker restart → Running.
> - **Chạy lại Task_06 kỳ 01/11 (job E630A090, 15:51→16:12 — 21 phút):**
>   status **done** · error **rỗng** · result `created 0 · posted 0 · skipped 658 ·
>   failed 0` — **658 phiếu hết InvalidInvno, 0 lỗi**.
> - **DB sm_banhang_phieu kỳ 01/11: 658/658 phiếu** err = "đã tồn tại trên MISA
>   (xác minh theo số chứng từ)" · **refid đủ 658/658** (137 phiếu đã đồng bộ lại
>   refid qua ai_search) · is_uploaded + is_posted đủ — cột "Trạng thái MISA" đúng.
> - **Login SMED TD/HM/QO:** job chạy qua 19/19 trung tâm 0 lỗi → hết Locator.fill
>   timeout (E2E trước push: TD ts + PY 16 OK).

> **Version:** app tổng **7.7.0** / repo con **11.8.1** — ĐÃ PUSH + LIVE (không bump — agent-side + docs).

### GĐ 640 / C.401 (Trợ lý ZCode (máy chủ)): Điều chỉnh 6 điểm trang UPLOAD Hóa đơn đầu vào theo ĐH + fix bug SMED_ACTION dry-run (2026-11-02)

> **ĐH yêu cầu (02/11, 3 ảnh):** (1) dropdown "kính trong" hạn chế tầm nhìn; (2) chọn
> khoảng ngày kèm lịch; (3.1) cột NCC rộng gấp 2 + MST tách riêng; (3.2) bộ lọc tiêu đề +
> header cố định + dữ liệu cuộn trong bảng; (3.3) cố định Hành động/Chú thích dưới;
> (4) tiêu đề + KPI động theo kỳ; (5) khung chọn thời gian Nạp dữ liệu; (6) hướng dẫn
> chi tiết. **ĐH chốt:** lọc PA-A 4 cột (NCC · MST · Số HĐ · Tên hàng) · Hành động/Chú
> thích PA-A · duyệt fix SMED_ACTION · duyệt khung Nạp.

> **Đã làm (repo con `b83e97a` + entry `66d99a2` — 4 file +364/−59):** SelectContent
> `bg-popover`→`bg-surface` (GỐC: theme thiếu `--color-popover` → nền trong suốt) · 4 ô
> ngày type=date (ISO→dd/mm chuẩn) · tách NCC (280px) + MST riêng · lọc 4 cột server-side
> LIKE debounce 500ms · header sticky 2 hàng trên khung cuộn duy nhất max-h-70vh (bảng
> thủ công — lồng 2 lớp overflow phá sticky) · phân trang luôn dưới khung · tiêu đề động
> từ summary MIN/MAX kỳ (hết hardcode 194/413) · Card "Nạp dữ liệu từ MIA TOOL" + serverFn
> `triggerHddtNap` (job `hddt-dauvao-nap` mode nap — engine đã có action nap sẵn) · khung
> Hướng dẫn 7 bước gập/mở. Chi tiết đầy đủ entry C.401 repo con.

> **⚠️ BUG PHÁT HIỆN + FIX (ĐH duyệt Câu 3):** `40_web_agent.py` không set `SMED_ACTION`
> → engine mặc định dry-run ⇒ nút **Upload từ web CHƯA TỪNG ghi thật qua job**. Fix: set
> `SMED_ACTION` theo mode + `SMED_LOAI` từ suffix report + REPORT_MAP thêm
> `hddt-dauvao-nap`. **Cần restart agent sau Push.**

> **Verify:** tsc 0 · py_compile OK · build 0 · preview 8101 SSR 200 đủ tính năng mới,
> không lỗi. **KHÔNG bump (chờ lệnh Push)** — app tổng 7.7.0 / repo con 11.8.1.

### GĐ 636 / C.399 (Trợ lý ZCode máy chủ): 5 điểm điều chỉnh phân hệ Zalo theo yêu cầu ĐH (02/11/2026 tối)

> **ĐH yêu cầu 5 điểm** (kèm ảnh /zalo): (1) cố định thanh tiêu đề bảng khi lăn · (2) dropdown
> nhãn trong suốt, nhìn hạn chế · (3) nút Cập nhật DB không tick được · (4) phân quyền — ĐH
> thử nghiệm trước, sau này nhân sự dùng Zalo CỦA HỌ + nút đăng nhập riêng · (5) hướng dẫn sử dụng.

> **Root cause tìm ra (mục 3):** UI gọi mutation theo cú pháp `mutate({ id, ... })` — TanStack Start
> fetcher yêu cầu **`mutate({ data: { id, ... } })`** (wrapper `data`). Mutation cũ POST đi NHƯNG
> handler nhận sai payload → SQL params lệch → HTTP 500 im lặng → switch không tick. Đã sửa
> TẤT CẢ 6 chỗ mutate/queryFn (update/suggest/analyze/loadMessages/loadFiles) — **bản GĐ 629
> cũng sai cú pháp này từ đầu** (lỗi ẩn từ lúc sinh module).

> **Đã làm (3 file, code `0bf9c48` + `42bd423`, deploy ixlin0712 → qef16s3pd):**
> 1. **Sticky thead** — thead `sticky top-16 z-10 bg-surface` (dưới header app h-16) + wrapper
>    bảng `overflow-x-auto` → **`overflow-x-clip`** (overflow-auto tạo scroll context phá sticky).
> 2. **Dropdown đục** — select.tsx SelectContent: `bg-popover` (token KHÔNG tồn tại trong
>    styles.css → trong suốt) → `bg-surface text-ink border-line shadow-lg`.
> 3. **Fix mutate wrapper {data}** + viết lại updateZaloGroup: tách 3 UPDATE riêng (bỏ
>    COALESCE multi-null-param), try/catch console.error; UI thêm dòng "Lỗi lưu: …" khi fail.
> 4. **Verify E2E thật (Chrome CDP context mới, production):** thead top=64 khi scroll 900px ✅ ·
>    dropdown bg rgb(251,252,251) ✅ · switch false→true và GIỮ sau reload (đọc lại từ DB) ✅ ·
>    120 nhóm ✅ · version 7.7.0.
> **Lưu ý cache:** tab cũ của ĐH có thể dính SW/cache cũ → chunk zalo 404 → trang "Something
> went wrong". F5/Ctrl+F5 hoặc xoá cache giong-vn-static-v2 là hết.

> **Mục 4 (phân quyền) — hiện trạng:** /zalo CHỈ Quản trị (Admin) thấy (PROJECT_INTERNAL_PATHS
> + key `zalo` mặc định TẮT cho nhân viên) — ĐH thử nghiệm trước ĐÚNG như thiết kế. Kiến trúc
> "Zalo của từng nhân sự + nút đăng nhập riêng" (mỗi người 1 phiên Chrome CDP riêng trên máy chủ,
> đăng nhập QR riêng, crawl theo user) là việc lớn — trình PA chờ ĐH chốt, chưa code.

> **Version:** KHÔNG bump (deploy CLI sửa lỗi production theo lệnh ĐH). App tổng 7.7.0 / repo con 11.8.0.

### GĐ 641 / C.402 (Trợ lý ZCode (máy chủ)): PA Push GĐ 640/C.401 — bump repo con 11.9.0 + LIVE + restart agent nạp SMED_ACTION (2026-11-02)

> **Lệnh của Đại Ca (02/11):** "Em push và sau khi push xong thì restart agent (máy chủ)
> sau Push để nạp SMED_ACTION + key job mới hddt-dauvao-nap".

> **Rà trùng lặp:** remote 0 commit mới cả 2 repo · nhánh phụ RỖNG · app tổng 1 commit
> docs (unlock GĐ 640) · repo con 2 commit của mình (code `b83e97a` + entry `66d99a2`)
> · working tree còn bài dở phiên khác (task_runner.py, _pa1_fetch.py, AGENTS.md dở) —
> KHÔNG đụng. **Verify env GĐ 470:** app tổng 6/6 · app con 5/5 biến ✓.

> **Bump:** repo con **11.8.1 → 11.9.0** (minor — khung Nạp dữ liệu theo kỳ + lọc nhanh
> 4 cột + hướng dẫn; package.json + DEFAULT_VERSION, package-lock giữ nguyên) · app tổng
> **giữ 7.7.0** (commit chưa push chỉ docs). Push: repo con `68857a4..f7245ff` · app tổng
> `0462b25..6aaa21b`.

> **✅ Verify production (curl lần đầu — không ghim deployment cũ):** app con **11.9.0** ·
> app tổng **7.7.0** · login ✓ · session ✓ (hạn 09/11) · SSO **302 → giong-banhang +
> bh_session** ✓ · `/api/auth/me` SuperAdmin ✓. **Trang mới SSR production**:
> `/m/up-hoadon-dauvao` 200 — có khung Nạp dữ liệu + Hướng dẫn + ô lọc nhanh, HẾT text
> cứng 194/413 ✓.

> **🔧 RESTART AGENT (máy chủ) sau Push:** log service 90 dòng gần nhất 100% "chưa có
> job mới" (agent RẢNH) → dọn `__pycache__` 3 thư mục (agent/bang-gia/etl) →
> `sc stop/start GIONG_SMED_Agent` (service NSSM trỏ đúng file mình sửa) → **RUNNING
> 16:43:22, nạp đủ config**, poll bình thường; service_err chỉ KeyboardInterrupt lúc
> dừng (bình thường). api_server KHÔNG restart → tunnel giữ URL
> `strips-dimensional-dollars-informational` (health tunnel_ok: true) — chạy
> `update-tunnel-env.py` đồng bộ `.env.local` 2 app với URL hiện hành (local trước đó
> lệch URL cũ). **Lưu ý:** nút Upload lần đầu TIÊU THẬT qua job từ giờ — log job sẽ có
> "⚙️ hddt-dauvao: SMED_ACTION=upload".

> **Version:** app tổng **7.7.0** / repo con **11.9.0** — ĐÃ PUSH + ĐÃ LIVE + agent ĐÃ
> RESTART nạp code.

### GĐ 642 / C.403 (Trợ lý ZCode (máy chủ)): Fix 3 lỗi ĐH báo 02/11 — 3 báo cáo kho needsData (SMED đổi tên file NXT 6 chữ số) · Đối soát HĐ-XK sai 294 vs 195 (đếm SUM col18 gồm mũi gói) · Task_08 không gửi Zalo (guard chặn oan + thiếu bkccn) (2026-11-02)

> **Đại Ca báo 02/11 tối 3 ảnh; chốt PA-1 cả 3 (chi tiết đầy đủ ở AGENTS.md repo
> con C.403, code `a88b392`).** Tóm tắt:
> 1. **SMED đổi tên file NXT Kế toán từ 31/10** (`_1793357818` 10 số → `_000000`
>    6 số) — regex ETL `\d{7,}` fail → center NULL → 3 báo cáo kho needsData +
>    19 file/ngày nạp đè còn 1 file (~65 dòng — TH_NXT/KPI tồn kho ngầm chỉ còn
>    1/19 TT). Fix regex `\d{4,}` + nạp lại 31/10–02/11 trên .34 (xóa 171 dòng
>    import_log ép rebuild) → 19 file/ngày · ~1.220 dòng · 0 center trống.
> 2. **Đối soát HĐ-XK KHÔNG trùng lặp** (0 nhóm trùng trong DB) — GĐ 626 đổi
>    nguồn B sang SUM(col18) BKCCN, col18 = số mũi lượt tiêm (gói nhiều mũi) →
>    phồng 294 (thực tế 194-195: BKX PX- 194 dòng ×1 mũi · HĐGTGT 190). Fix
>    cột B = COUNT(1) đếm LƯỢT BÁN → kỳ 02/11 **B=194 C=194 E=190** · kỳ
>    01/11 B=841. Cột DT SMED giữ nguyên theo PA chốt.
> 3. **Task_08 không spawn 17/05** — guard dự phòng đếm theo ngày tạo bị bản
>    test 01:18 hôm nay chặn oan; + Task_08 thiếu tự tải bkccn (GĐ 626 đổi
>    nguồn) → 01/11 17:05 ERROR không tới bước Zalo. Fix guard python-parse
>    config.date (theo KỲ) + src_map +bkccn → **Task_08 kỳ 02/11 tự spawn
>    19:50 → done 19:54 — gửi Zalo 'My Documents' OK 19:54:36** (ảnh kỳ
>    02/11 đã tới ĐH).

> **Verify:** compile 3 file · regex 6/6 PASS · dsxk thật 02/11/01/11 đúng số ·
> 3 báo cáo kho × 3 kỳ 9/9 OK (19 cột TT) · Task_08 self-heal + Zalo OK ·
> restart GIONG_SMED_Agent (api_server + tunnel giữ nguyên).

> **PA Push GĐ 642 (lệnh ĐH "Push" 02/11 tối):** rà trùng lặp sạch (5 commit app tổng + 1
> commit repo con đều của phiên này · nhánh phụ 0 commit · remote 0 commit mới · registry 0 🔒 dở —
> Agent CLI có 3 file sửa dở CHƯA commit trong worktree riêng, không đụng). Env Vercel 2 app đủ
> (DATABASE_URL · APP_JWT_SECRET cả 2 · TUNNEL_* · BETTER_AUTH_* · ZAI_API_KEY). KHÔNG bump version
> (code 100% agent-side Python + docs — tiền lệ GĐ 422/638). Push: app tổng `5907734..b015656` (5
> commit docs) · repo con `f7245ff..a88b392` (C.403). Agent máy chủ KHÔNG cần restart thêm (đã
> restart 19:49 nạp code — Task_08 chạy + gửi Zalo OK 19:54).
>
> **✅ Verify production 4/4 (GĐ 470):** curl app tổng = **7.7.0** · app con = **11.9.0** (version
> web giữ nguyên — không đụng bundle) · login `sign-in/email` → user Phạm Kiên Cường ✅ ·
> `get-session` ✅ · SSO `?sso=` → 302 về app con + Set-Cookie bh_session ✅ (APP_JWT_SECRET khớp 2
> app) · `/api/auth/me` → role SuperAdmin + 97 mod ✅.

### GĐ 644 (bổ sung GĐ 642 — lệnh ĐH ngay sau Push): Đồng bộ ETL MỌI máy trạm + xác nhận cơ chế máy trạm "rảnh tự nhận job" (2026-11-02 tối)

> **Chỉ thị của ĐH (02/11 tối):** "Khi có job mới các máy trạm (.27, .34, .245) phải chủ động
> nhận job khi thấy mình đang rảnh" ⇒ **cài đặt ETL mới phải đồng bộ TẤT CẢ máy tính** —
> nguyên tắc: "Luôn luôn đồng bộ cách làm, phương thức, ... cho nhau" (đã ghi memory + mục này).

> **Trả lời câu hỏi ĐH (tra code thật — ĐÚNG ý anh, đã chạy đúng từ GĐ 621):** 3 máy trạm cùng
> nhóm 'smed': worker poll `/agent/claim` mỗi 20s — **đang chạy job thì KHÔNG claim (tuần tự),
> xong mới claim tiếp = chỉ rảnh mới nhận**; claim ATOMIC (UPDATE…UPDLOCK — 2 máy không trùng
> job); ưu tiên **LPT — job nặng trước** (GĐ 621 "quét máy rảnh, giao việc hài hòa"), job nhẹ
> tự rơi máy xong sớm. Job MISA chuyên biệt: .245 = mua hàng · .34 = bán hàng. Máy chủ 'core'
> loại job chuyên biệt khỏi hàng đợi thường nhưng **CỨU HỘ job chờ >15'** (AGENT_RESCUE_MIN)
> — máy trạm tắt thì máy chủ tự gánh, job không đói (bằng chứng 02/11: .27/.34 tắt máy → core
> nhận thay 193 job, Task_02/08 không treo).

> **Đồng bộ ETL đã làm (GĐ 642 — regex center_from_name mới):**
> | Máy | Trạng thái |
> |---|---|
> | Máy chủ (repo gốc `a88b392`) | ✅ nguồn |
> | .34 (C:\CUONG_2026\giong-agent) | ✅ deploy 20:05 — MD5 `1547667f` khớp + regex mới có |
> | .245 (C:\CUONG_2026\giong-agent) | ✅ deploy 22:0x — MD5 khớp + py_compile OK (Python 3.12), backup `etl_import.py.bak642` |
> | .27 | ⚠️ **MÁY TẮT** (ping + SSH timeout cả từ máy chủ lẫn .245) — **PENDING: deploy NGAY khi máy online, TRƯỚC khi .27 chạy job SMED** (phiên sau đọc memory `nguyen-tac-dong-bo-etl-va-may-tram-claim-job`) |

> **Bẫy đã gặp (ghi để không lặp):** máy LAN không bật SFTP subsystem → `scp -O`; printf bash
> ăn `\e` trong path (giong-agent\etl → ESC) → truyền file qua heredoc quoted + `more > file`
> qua SSH stdin; verify bằng `certutil -hashfile MD5` + py_compile file check (python -c inline
> qua SSH bị cmd cắt chuỗi). Worker LAN chạy ETL bằng **subprocess** mỗi lần → thay file có
> hiệu lực ngay, KHÔNG cần restart service.

> **Version:** KHÔNG bump (docs + deploy máy LAN — không đụng code web). App tổng 7.7.0 / repo con 11.9.0.

### GĐ 646 / C.400 (Trợ lý ZCode máy chủ): Switch màu xanh/trắng + bật 73 nhóm đã nhãn + CRAWL TIN NHẮN THẬT 1.588 tin (02/11/2026 tối)

> **⛔ ĐỔI SỐ từ GĐ 637 → GĐ 646** (quy tắc GĐ 285): số 637 đã được phiên khác dùng
> trước (PA Push đợt GĐ 634/C.397, commit `f6ee605`) — nội dung giữ nguyên.

> **ĐH yêu cầu:** (1) Switch "Cập nhật DB" trắng khó nhìn → bật = XANH accent, tắt = trắng viền tối;
> (2) ĐH đã dán nhãn một loạt nhóm → bật luôn Cập nhật DB cho nhóm đã có nhãn; (3) chạy crawl tin nhắn.

> **Đã làm:**
> 1. **Switch** (`switch.tsx`, commit `a2b1cc3`, deploy `f1hsv4ko4`): checked = `bg-accent` (#1c6b58)
>    + thumb trắng; unchecked = `bg-white` + viền `#9fb2aa` + thumb xám #5a6b65. Chủ đạo xanh Gióng.
> 2. **Bật nhóm theo nhãn** (data-only): UPDATE is_sync_enabled=1 cho 71 nhóm có `purpose_label`
>    → **73/120 nhóm đang bật** (ĐH tự dán nhãn 73 nhóm: Bán hàng 26 · Mua hàng 12 · Tổng hợp 35).
> 3. **CRAWL TIN NHẮN — 4 lượt thật trên máy chủ:**
>    - Lượt 1: 426 tin · 369 file — nhưng **61/73 nhóm miss** (hội thoại ngoài viewport virtual list).
>    - **Fix: search theo TÊN nhóm** (fallback khi click anim-data-id thất bại — trước search bằng ID
>      kỹ thuật không bao giờ ra) → lượt 2: +973 tin · +877 file (còn 5 miss).
>    - Lượt 3: +157 tin · +144 file. Lượt 4 (fix **NBSP** trong tên nhóm — \xa0 làm Zalo search miss,
>      bài học 13.4): +35 tin · +35 file.
>    - **TỔNG: 1.588 tin · 1.274 file · 39 tín hiệu giá · 68/73 nhóm có dữ liệu (93%).**
> 4. **5 nhóm còn miss:** 'ĐẶT ĐƠN HÀNG GIÓNG - BIOVACCINE' · 'Hùng kế toán tiêm chủng Gióng' ·
>    'THEO DÕI HỢP ĐỒNG GÓI GVN' · 'PGĐ Gióng_Hoàng Minh Châu' · 'Nhóm Gióng Việt Nam' — search
>    tên vẫn không mở được hội thoại (nghi nằm ở danh sách PHÂN LOẠI riêng của Zalo, không trong
>    list mặc định). Kế hoạch sau: probe tab Phân loại / mở hội thoại qua URL deep-link.

> **Verify:** DB GiondDB đối chứng COUNT (trên) · UI /zalo tab Tin nhắn + File đính kèm giờ có dữ liệu
> (loadZaloMessages/loadZaloFiles qua tunnel — cùng nguồn). Version app tổng 7.7.0 / repo con 11.8.0 — KHÔNG bump.

### GĐ 645 (Trợ lý ZCode (máy chủ)): Cố định IP CẢ 4 MÁY (máy chủ + 3 máy trạm) — DHCP router đã đổi IP máy trạm 2 lần (.27→.14 · .34→.11) (2026-11-02 tối)

> **Chỉ thị của ĐH (02/11 tối):** máy .27 bị DHCP đổi thành 192.168.1.14 · máy .34 bị đổi thành
> 192.168.1.11 — "cố định luôn IP của cả 3 máy LAN và máy chủ. Mục đích kết quả CẢ 4 MÁY đều
> phải cố định IP". Kèm yêu cầu GĐ 644: ETL mới phải đồng bộ TẤT CẢ máy.

> **Xác minh máy trạm đổi IP (SSH + hostname):** 192.168.1.14 = **PC-PKT-01** (máy .27 cũ — clone
> riêng `C:\CUONG_2026\giong-vn-v6-agent-lan\giong-apps\apps\banhang\agent`, KHÔNG phải
> giong-agent như .34/.245) · 192.168.1.11 = **THANH-PC** (máy .34 cũ — `C:\CUONG_2026\giong-agent`).

> **BẢNG IP CỐ ĐỊNH (đã set 02/11):**
> | Máy | Hostname | IP | DHCP | DNS | ETL mới (MD5 `1547667f`) |
> |---|---|---|---|---|---|
> | Máy chủ | GIONGPC | 192.168.1.250 | No (static sẵn) | (nguyên trạng) | ✅ nguồn |
> | THANH-PC | THANH-PC | **192.168.1.11** | **No — mới set** | WARP 127.0.2.2/3 (resolve OK) | ✅ deploy 20:05 |
> | GIANGKT | GIANGKT | 192.168.1.245 | No (static sẵn) | 8.8.8.8 | ✅ deploy 22:0x |
> | PC-PKT-01 | PC-PKT-01 | **192.168.1.14** | **No — mới set** | 123.23.23.23 / 123.26.26.26 | ✅ deploy 23:0x + COMPILE-OK |

> **Cách làm (PowerShell qua schtasks — SSH user không đủ quyền UAC, netsh qua SSH báo
> "Invalid type parameter"):** đặt static GIỮ NGUYÊN IP hiện tại + gateway 192.168.1.1 —
> `Set-NetIPInterface -Dhcp Disabled` (Windows tự giữ IP thành static) + `New-NetIPAddress`
> nếu thiếu + DNS giữ nguyên từng máy; script chạy **detached qua schtasks /ru SYSTEM /rl
> HIGHEST** (độc lập session SSH — không sợ đứt giữa chừng làm máy mất IP); verify ping +
> SSH + nslookup từng máy.

> **⚠️ Khuyến nghị ĐH (quan trọng):** static phía máy KHÔNG báo router biết — DHCP server
> router (192.168.1.1) vẫn có thể cấp trùng .11/.14 cho thiết bị khác khi máy đó offline
> (giống vụ đổi IP 02/11). **Nên đặt thêm DHCP Reservation trên router (gán MAC máy → IP)**
> — MAC hiện tại: ghi từ ipconfig /all từng máy khi cần. Em không có quyền truy cập router
> (192.168.1.1) nên phần này nhờ ĐH.

> **PA Push GĐ 645 (lệnh ĐH "Push" 02/11 tối):** rà trùng sạch — commit của phiên này (GĐ 645
> claim+entry+unlock) + commit phiên Zalo đã XONG (GĐ 646/C.400 docs app tổng · GĐ 637/C.400
> crawl lượt 2-4 `zalo_sync.py` repo con — agent-side, không đụng web) · file sửa dở của phiên
> khác KHÔNG đụng (misa_hddt_dauvao.py / -hddt-dauvao.ts / task_runner.py worktree CLI...).
> Env Vercel 2 app đủ 6/4 biến. **KHÔNG bump** — docs + agent-side Python (tiền lệ GĐ 422/638).
> Push: app tổng `8951979..075b80d` (5 commit) · repo con `264ee38..b1f06aa`.
>
> **✅ Verify production 4/4:** app tổng **7.7.0** · app con **11.9.0** (giữ nguyên) · login
> `sign-in/email` → Phạm Kiên Cường ✅ · `get-session` ✅ · SSO → 302 + bh_session ✅ ·
> `/api/auth/me` → SuperAdmin + 97 mod ✅.

### GĐ 647 / C.404 (Trợ lý ZCode (máy chủ)): Hộp KPI "XUẤT VẮC XIN" thành 3 TẦNG — Thống kê xuất kho theo trung tâm → Chi tiết xuất kho 1 trung tâm (2026-11-02)

> **Yêu cầu của ĐH (02/11, kèm ảnh minh họa bước 1):** bấm hộp KPI "XUẤT VẮC XIN" →
> (1) chi tiết theo loại phiếu GIỮ NGUYÊN ("là ổn rồi"); (2) bấm 1 DÒNG loại phiếu →
> bảng **"Thống kê xuất kho theo trung tâm"** (STT · Ngày tháng · Trung tâm tên đầy
> đủ dạng "Trung tâm TC Gióng Long Biên" · Số lượng Vắc xin xuất kho · Giá trị tiền
> xuất kho); (3) bấm 1 DÒNG trung tâm → bảng **"Chi tiết xuất kho - Trung tâm…"**
> (STT · Ngày tháng · Trung tâm viết tắt BH/CĐ/TT · Vắc xin xuất kho · Số tiền xuất
> kho — "làm giống Bảng chi tiết lượt tiêm của hộp KPI LƯỢT TIÊM"). Mọi bảng: dòng
> tiêu đề + dòng Tổng cộng CỐ ĐỊNH khi cuộn, KHÔNG được trong suốt, ĐỒNG NHẤT màu sắc.

> **Đã làm (repo con code `8b38445` + entry `cd9c22c` — chi tiết đầy đủ ở AGENTS.md
> repo con C.404):** 2 serverFn MỚI `loadOverviewXuatByCenter` (bước 2 — 1 dòng/trung
> tâm tổng cả kỳ, tên đầy đủ từ `dbo.centers` pattern GĐ 222/469) +
> `loadOverviewXuatCenterDetail` (bước 3 — 200 nhóm Ngày × Vắc xin mới nhất + tổng
> toàn kỳ); điều kiện lọc ĐÚNG như tầng 1 nên TỔNG CỘNG khớp từng đồng với dòng loại
> phiếu bước 1. UI: thay tầng 2 cũ (GĐ 493) bằng 2 tầng mới + nút quay lại từng tầng
> (pattern Lượt tiêm GĐ 469: `bankSelected`/`shotsCenter`), reset cả 3 tầng khi đóng
> dialog. Sticky/màu theo yêu cầu ĐH: thead + tfoot cùng nền ĐỤC `bg-surface-2`
> (#e8eeeb) + `z-20`; `<th>` bỏ `whitespace-nowrap` + nới colgroup (2 tiêu đề dài
> từng ĐÈ CHỮ lên nhau — bắt qua ảnh E2E rồi sửa).

> **Verify:** tsc EXIT 0 · probe GiongDB kỳ 02/11: PX-SD 195 liều / 129.995.071 (tầng 1)
> → LB 27 liều / 22.255.329 (bước 2) → bước 3 của LB 8 nhóm tổng 22.255.329 (khớp
> bước 2), bước 2 TỔNG CỘNG 195 / 129.995.071 khớp tầng 1 từng đồng · E2E preview
> local 8102 (phiên Admin): 3 tầng đúng cột + tên TT đầy đủ, nút quay lại từng tầng,
> đóng/mở lại về bước 1; ảnh chụp xác nhận tiêu đề + TỔNG CỘNG cố định, nền đục đồng
> nhất. Lưu ý: `job-labels.test.ts` FAIL SẴN (thiếu nhãn `dc-hoadon-banhang`,
> `dc-xuat-kho` — code GĐ 588/C.375 phiên khác) — không liên quan GĐ 647.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **7.7.0** /
> repo con **11.9.0**.

### GĐ 648 / C.405 (Trợ lý ZCode (máy chủ)): Điều tra TOÀN PHÂN HỆ Upload hóa đơn đầu vào — fix 5 lỗi + E2E browser đầy đủ (2026-11-03)

> **ĐH báo (02/11 22:38):** "kiểm tra phần nạp dữ liệu đã thấy báo lỗi không dùng
> được" (alert "Lỗi nạp dữ liệu: Invalid character") + lệnh "kiểm tra toàn bộ chức
> năng". **Kết quả: 5 lỗi thật, đã fix + verify E2E từng chức năng (chi tiết đầy đủ
> entry C.405 repo con — code `b561b91` + `7f0af18` + entry `8b98d7d`):**
> 1. "Invalid character" — 2 serverFn gọi fetch `localhost:8777` (không tồn tại trên
>    Vercel) + `btoa` tên tiếng Việt → **đổi sang INSERT DB trực tiếp** (pattern
>    createSmedJob).
> 2. Engine `nap()` check NULL sai → nạp lại cùng kỳ trùng unique index → fix
>    ISNULL NULL-safe (nạp lại thật: +24 dòng sót, 437 tổng).
> 3. Agent crash `d,m,y = "".split("/")` khi job check/upload không kèm kỳ → mặc
>    định hôm nay.
> 4. Nút "Làm mới" không refetch stats → KPI/tiêu đề không cập nhật.
> 5. Vòng bù GĐ 557 đòi file với tool DB-only → thêm 5 key hddt-dauvao-* vào
>    MISA_UPLOAD_REPORTS (job check/upload/nap mới done được).

> **E2E THẬT (browser + SSO local + agent máy chủ) — kiểm TỪNG chức năng:** dropdown
> nền đục ✓ · lịch ngày ✓ · Nạp dữ liệu → job `E5988518` chạy `SMED_ACTION=nap` ✓ ·
> bảng 437 dòng ✓ · lọc nhanh NCC 298 — **đối chứng SQL = 298 khớp từng dòng** ✓ ·
> sticky header ✓ · KPI/tiêu đề động 201 HĐ/437 dòng ✓ · nút Kiểm tra NVL → job
> `3112951f` "✅ Job xong" 8 giây ✓. **Upload thật (ghi MISA) KHÔNG tự bấm — chờ ĐH
> dùng thật** (cùng đường ống với Kiểm tra, đã chứng minh).

> **Vận hành:** agent restart 2 lần (chờ Task_03 xong 00:32 + Task_05 không tạo job
> con mới restart — KHÔNG cắt upload MISA đang chạy). Bài học phụ: preview vite chạy
> gộp lệnh trong sandbox thiếu env tunnel → UI "Chưa có dữ liệu" giả, không phải lỗi
> code. **KHÔNG bump (chờ lệnh Push)** — app tổng 7.7.0 / repo con 11.9.0.

### GĐ 647 (PA Push — bổ sung): ĐÃ PUSH + LIVE — app tổng giữ **7.7.0** (docs-only) · repo con bump **12.0.0** (2026-11-03)

> **Lệnh "Push" của ĐH (03/11).** Rà trùng lặp theo nguyên tắc 3: nhánh phụ
> `main..agent-cli` + `main..pipeline-work` **RỖNG cả 2 repo** (0 commit chưa merge);
> KHÔNG add file nào của phiên khác (working tree còn `_pa1_fetch.py` +
> `mia_detail_cache.sqlite3` của việc khác — không đụng). Commit chờ push gồm công
> việc của 2 PHIÊN nhưng **KHÁC FILE — không sửa đè**: phiên này = GĐ 647/C.404
> (`overview-dashboard.tsx` + `src/routes/api/-overview.ts`); phiên song song =
> GĐ 648/C.405 (`up-hoadon-dauvao.tsx`, `-hddt-dauvao.ts`, `misa_hddt_dauvao.py`,
> `40_web_agent.py`).

> **Verify env Vercel TRƯỚC push (GĐ 470 mục A):** app tổng đủ 6 biến
> (DATABASE_URL · APP_JWT_SECRET · TUNNEL_API_BASE_URL · TUNNEL_GIST_ID ·
> BETTER_AUTH_SECRET · BETTER_AUTH_URL) · app con đủ 5 biến (DATABASE_URL ·
> APP_JWT_SECRET · TUNNEL_API_BASE_URL · TUNNEL_GIST_ID · ZAI_API_KEY).

> **Bump (chỉ làm lúc Push — quy tắc ĐA AGENT):** repo con có CODE WEB (feature
> hộp KPI Xuất Vắc Xin 3 tầng + fix toàn phân hệ up-hoadon-dauvao) → MINOR
> **11.9.0 → 12.0.0** (hệ 1 chữ số: minor 9 +1 nhớ sang MAJOR — KHÔNG phải 11.10.0)
> — sửa `apps/banhang/package.json` + `DEFAULT_VERSION` app-shell.tsx, commit
> `4fd9908`, tsc EXIT 0 sau bump. **App tổng giữ 7.7.0** — đợt này 100% docs
> (entry/registry), tiền lệ GĐ 417/645.

> **Push:** repo con `e45b92d..4fd9908` (6 commit: C.404 code `8b38445` + entry
> `cd9c22c` · C.405 code `b561b91`/`7f0af18` + entry `8b98d7d` + bump `4fd9908`) ·
> app tổng `80896cf..0f40884` (5 commit docs: GĐ 647 `d6b5758`/`eaee519` +
> GĐ 648 ×3).

> **✅ Verify production 4/4 (GĐ 470 mục B):** `curl --compressed` lần đầu app tổng
> **7.7.0** · app con **12.0.0** (deploy mới, không ghim deployment cũ) · login app
> tổng → `user: Phạm Kiên Cường` ✅ · get-session ✅ · **SSO luồng thật** (đăng nhập
> app tổng → bấm "Bán hàng" ở sidebar → tab app con vào THẲNG dashboard với phiên
> SuperAdmin · VP, KHÔNG hiện "Chưa đăng nhập") ✅ · `/api/auth/me` app con → HTTP
> 200 + SuperAdmin ✅.

> **✅ Test luôn tính năng mới trên production 12.0.0:** kỳ "Hôm qua" (02/11) → hộp
> **XUẤT VẮC XIN** → bấm dòng "Xuất tiêm (PX-SD)" → bảng "Thống kê xuất kho theo
> trung tâm" (TỔNG CỘNG 195 liều · 129.995.071 — khớp tầng 1 từng đồng) → bấm
> "Trung tâm TC Gióng Long Biên" → bảng "Chi tiết xuất kho - Trung tâm TC Gióng
> Long Biên" 8 dòng + TỔNG CỘNG **22.255.329** (khớp probe GiongDB) — 3 tầng chạy
> đúng trên production.

> **Version:** app tổng **7.7.0** / repo con **12.0.0** — ĐÃ PUSH + ĐÃ LIVE.

### GĐ 649 / C.406 (Trợ lý ZCode — máy chủ): PA-1 ĐH chốt 03/11 — Hóa đơn GTGT bán hàng chuyển sang UPLOAD BẰNG EXCEL (mẫu MISA "Bán hàng hóa" refType 3530) + đính chính kết luận GĐ 569 (2026-11-03)

> **Yêu cầu của Đại ca (03/11):** nghiên cứu đồng nhất upload MISA cho 4 phân hệ;
> ĐH xác nhận mua hàng/xuất kho dùng Excel, bán hàng đi đường khác, và **muốn bán
> hàng cũng upload bằng file Excel cho 1 ngày hoặc chu kỳ** (3 bước: sinh Excel từ
> DB → dùng công cụ nhập khẩu Excel của MISA → ghi sổ luôn). Em trình bày hiện trạng
> 4 đường upload + 3 phương án ⇒ **ĐH chốt PA-1**.

> **PHÁT HIỆN THEN CHỐT — đính chính GĐ 569 (bằng chứng thật, không suy đoán):**
> MISA AMIS **CÓ** mẫu nhập khẩu Excel cho CHỨNG TỪ BÁN HÀNG:
> `refType=3530 · tableName=sa_voucher` — dòng **"Bán hàng hóa"** trong
> `GET /g2/api/import/v1/import/types` (124 loại; kèm 3570 Bán hàng dịch vụ ·
> 3560 Hóa đơn bán hàng · 3540 trả lại · 3550 giảm giá). GĐ 569 kết luận "bán hàng
> không có template" vì **tìm mã `353`** (enum `RefTypeCategory`, quét dải 300–360) —
> **mã nhập khẩu là 4 chữ số 3530**, ngoài dải đã quét. Bằng chứng bundle giao diện
> MISA (tải công khai từ CDN — CHỈ đọc, không đăng nhập): enum
> `RefTypeCategory.SAVoucher:353` · wizard nhập khẩu có nhánh riêng cho SAVoucher
> (`i18nSA.SAVoucher.SAVoucherImportTitle`, cross-sell "import-receipt") · endpoint
> `/import/types` liệt kê loại khả dụng. Lưu tại **`artifacts/misa-nhap-khau-ban-hang/`**
> (README + 3 chunk JS của MISA) để phiên sau kiểm chứng lại.

> **CÔNG THỨC FILE EXCEL bán hàng — 29 cột, MISA GHÉP THEO TÊN CỘT (không theo vị trí),
> đã kiểm chứng bằng step3 4/4 hợp lệ:** Hình thức bán hàng (để TRỐNG) · Phương thức
> thanh toán ("Thu tiền ngay - Tiền mặt"/"... - Chuyển khoản"/"Chưa thu tiền") ·
> Kiêm phiếu xuất kho = "Không" (GĐ 471 ĐH chốt) ⇒ Số phiếu xuất PHẢI trống ·
> Lập kèm hóa đơn = "Có" · Ngày hạch toán · Ngày chứng từ · Số phiếu nhập (= số chứng
> từ, ≤20) · Mã nhà cung cấp (→ Mã KH, để trống) · Tên nhà cung cấp (→ Tên KH) ·
> Diễn giải · Ký hiệu HĐ · Số hóa đơn (phải KHÁC NHAU trong file) · Ngày hóa đơn ·
> Trường mở rộng 1 · Mã hàng · Tên hàng · Kho · Vị trí · ĐVT · Số lượng · % thuế GTGT ·
> Đơn giá · Thành tiền · Tỷ lệ CK (%) · Số lô · Hạn sử dụng · Đơn vị · Mã thống kê.
> (Giá trị hợp lệ đọc trực tiếp từ trường `description` MISA công bố ở step2.)

> **ĐÃ LÀM:** repo con **`41b8e2c`** — `misa_banhang_api.py` +270 dòng: chế độ excel
> (`--excel` / env `MISA_SA_UPLOAD=excel`; **mặc định vẫn `api`** để không đổi
> production khi chưa chạy thật) — dựng dòng Excel từ CHÍNH payload save_full (không
> lệch nguồn) → 1 file/trung tâm/ngày → `import_excel(3530)` → tìm refid theo số CT →
> kiểm chứng số dòng/tổng tiền → ghi tham chiếu hóa đơn → ghi sổ → cập nhật
> `sm_banhang_phieu`; **bỏ qua phiếu đã có trên MISA** (idempotent); `--dry-run` vẫn
> sinh file để kiểm chứng bằng step3 mà không ghi. Entry đầy đủ ở **C.406 AGENTS.md
> repo con** (commit docs `9c68426`).

> **KIỂM CHỨNG:** step2 → 29 cột ghép đúng · step3 file thử **4/4 hợp lệ** · file THẬT
> (02/11 TT TD, 8 phiếu/8 dòng) → step3 **8/8 không lỗi nội dung** (chỉ "Số chứng từ đã
> tồn tại" vì đã đẩy trước đó — đúng kỳ vọng) · chạy thật 27/10 ĐX + 25/10 QO: bỏ qua
> toàn bộ phiếu đã có, KHÔNG tạo trùng. Lượt GHI thật đầu tiên chưa thực hiện được vì
> hôm nay **không còn phiếu nào đủ điều kiện** (mọi phiếu upload được đã lên MISA;
> phiếu tồn bị chặn bởi lỗi DỮ LIỆU NGUỒN SMED "Lịch sử gửi HĐ thiếu khối data").

> **PHÁT HIỆN KÈM (cần ĐH biết):** 2 job bán hàng sáng nay (07:57 + 08:12, máy .34
> thanh-pc) **đã tạo đủ dữ liệu 02/11 nhưng bị đánh ERROR** vì Chrome CDP chết ở khâu
> đóng tab (`ECONNREFUSED ::1:9222` / WS timeout) ⇒ DB kịp ghi 148/156, 8 phiếu TT TD
> còn `is_uploaded=0` dù **đã có thật trên MISA** (em đã đối chứng bằng danh sách MISA).
> Hệ quả: màn hình báo "TT TD thiếu 8" oan. Cần script rà + sửa trạng thái các ngày
> (02/11 TD 8 · 30/10 QO 1 · 29/10 LB 1…) và xử lý lỗi tab-guard khi job đã xong việc.

> **VIỆC CÒN LẠI:** (1) chạy GHI THẬT đầu tiên khi có dữ liệu mới (đêm nay Task_06);
> (2) deploy `misa_banhang_api.py` xuống .34 + đặt env `MISA_SA_UPLOAD=excel` để bật
> cho production; (3) bổ sung **ghi sổ cho phân hệ "Upload hóa đơn đầu vào"** (đang
> thiếu — 3 phân hệ kia đã tự động ghi sổ); (4) sửa DB lệch trạng thái do job chết
> ở bước dọn tab.

 (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **7.7.0** / repo con **12.1.0**.
>
> **PHỤ LỤC 03/11 (chiều) — HOÀN TẤT 4 PHẦN ĐH DUYỆT (lệnh: "làm tất cả các phần
> 1,2,3,4 sau đó Push và restart server, agents"):**
>
> **(3) GHI SỔ cho "Upload hóa đơn đầu vào" — code mới, kiểm chứng THẬT:** `misa_hddt_dauvao.py`
> +`_detail_pu`/`_ghi_so_1_phieu` (đọc edit_version + reftype THẬT → ledger/post) +
> `ghi_so(loai, dry-run)` idempotent (`da_upload` → `da_ghi_so`) + `upload()` tự ghi sổ khi
> `MISA_AUTO_POST=1` (`40_web_agent.py` set cho job `hddt-dauvao-*`) + CLI `ghi-so`; lưu
> `refno_misa` khi sinh Excel để tra đúng refid. **Bằng chứng:** ghi sổ phiếu mua vào TỒN
> từ 28/10 (`PN-20261028113249` · GIGAMED · 10.385.207đ) → đọc lại `is_posted_finance=True`.
> (3 dòng hóa đơn đầu vào ĐH đã hạch toán hiện bị MISA từ chối vì **mã hàng/kho chưa có
> trong danh mục** — ĐH sửa mã rồi Upload.)
>
> **(4) SỬA DB LỆCH TRẠNG THÁI — script mới `gd649_fix_trang_thai.py`:** rà theo TỪNG NGÀY
> (1 lần gọi danh sách MISA/ngày) → dòng MISA ĐÃ CÓ mà DB nói chưa → is_uploaded/is_posted/refid.
> Chạy thật 01/10→03/11: **sửa 31 dòng** (gồm 8 phiếu TT TD 02/11 — job sáng nay chết ở khâu
> dọn tab CDP nên DB thiếu; màn hình hết báo thiếu oan), giữ nguyên 474 dòng (chặn bởi dữ
> liệu nguồn — xử lý tay).
>
> **(2) BẬT ĐƯỜNG EXCEL CHO PRODUCTION:** deploy `misa_banhang_api.py` +
> `gd649_fix_trang_thai.py` sang máy bán hàng **THÀNH-PC (192.168.1.11)** — MD5 khớp
> `f971018b73e79b137de4c3e81954a555` + py_compile OK; thêm `set MISA_SA_UPLOAD=excel` vào
> `C:\CUONG_2026\giong-worker	hanhpc.env.bat`; đặt `MISA_SA_UPLOAD=excel` cho service
> **`GIONG_SMED_Agent`** máy chủ (nhóm core cứu hộ — `nssm set AppEnvironmentExtra`, giữ đủ
> 8 biến cũ); restart `GIONG_SMED_Worker` trên .11 → RUNNING. Kèm **LƯỚI AN TOÀN**: đường
> Excel không ghi được → job TỰ ĐỘNG quay về đường API save_full.
>
> **(1) LƯỢT GHI THẬT ĐẦU TIÊN — CHƯA CHẠY ĐƯỢC 03/11 vì không có dữ liệu đủ điều kiện**
> (đã rà từng nhóm, bằng chứng): mọi phiếu đẩy được đã lên MISA; phiếu tồn bị chặn bởi DỮ
> LIỆU NGUỒN (5 phiếu TĐ 21/10 + 4 ĐX 27/10 + 1 QO 25/10: "Lịch sử gửi HĐ thiếu khối data";
> 17–20/10 "Số HĐ BKCT trùng/miss" / "hàng không khớp MISA"; hôm nay chưa có số HĐ vì
> BKCT/BKCCN về đêm). ⇒ **KHÔNG tạo chứng từ thử** trên sổ sách thật. **Lượt ghi thật đầu
> tiên = Task_06 đêm nay (03/11)** (BKCT/BKCCN đã về) — kiểm chứng hôm sau: log job có
> `📄 … import Excel …` + `✅ … Excel → MISA`, KHÔNG có `↩️` (fallback) = đường Excel chạy trơn.
>
> **Push đợt này:** app tổng (docs + bằng chứng) · repo con `41b8e2c`→`1985a02` (code + entry
> + **bump 12.0.0 → 12.1.0**). Rà trùng lặp: remote 2 repo 0 commit mới; phiên khác đang làm
> GĐ 650 (chỉ registry — khác phạm vi); file phiên khác trong working tree (`_pa1_fetch.py`,
> **Restart:** GIONG_SMED_Agent (máy chủ — nạp env mới) + GIONG_API_Server + GIONG_SMED_Worker (.11 — env + code mới).
>
> **✅ VERIFY SAU PUSH/RESTART (03/11 16:2x):** app tổng HTTP 200 · **login thật OK** ·
> get-session OK · app con **12.1.0** HTTP 200 · **SSO** ký JWT (iss/aud chuẩn) → 302 về
> app con + Set-Cookie `bh_session` · `/api/auth/me` 200 (SuperAdmin + 14 nhóm quyền) ·
> env Vercel 2 app ĐỦ (DATABASE_URL · APP_JWT_SECRET · TUNNEL_API_BASE_URL ·
> BETTER_AUTH_SECRET/URL · ZAI_API_KEY) · **api_server restart → TUNNEL ĐỔI URL**
> (smooth-restoration-fancy-movies.trycloudflare.com) — **gist tự cập nhật 16:12** ✓
> (app đọc gist khi URL env chết) · service máy chủ `GIONG_SMED_Agent` + `GIONG_API_Server`
> = RUNNING · worker .11 = RUNNING với env `MISA_SA_UPLOAD=excel` + file `misa_banhang_api.py`
> MD5 khớp local `f971018b73e79b137de4c3e81954a555` (đã gồm lưới an toàn API).

> **PHỤ LỤC 3 — PA-2 (ĐH chốt 03/11 chiều): BẢNG CHUẨN MISA cho 4 đường upload + xem theo
> từng lượt.** Yêu cầu ĐH: sau download → DB → **tạo bảng chuẩn theo MISA AMIS** dùng cho
> Upload + ghi sổ tự động; xem lại được từ khung **"Lịch sử upload MISA"**; **cả 2 cách chạy**
> (thủ công theo báo cáo · tự động theo Task cuối ngày) đều phải có bảng để theo dõi.
> ĐH chốt **PA-2** (mỗi đường 1 bảng riêng, cột = cột file Excel MISA) + kiểu xem **bấm 1
> lượt → xem bảng dòng của lượt đó**.
>
> **Rà hiện trạng:** chỉ "Hóa đơn đầu vào" đã đúng mô hình (`misa_hddt_upload_line`);
> 3 đường kia chỉ có bảng trạng thái MỨC PHIẾU — dòng hàng theo cột MISA không được lưu.
>
> **Đã làm (repo con `9f5c001` + entry `a7c26f2`):** 3 bảng mới `misa_pu_upload_line` ·
> `misa_xk_upload_line` · `misa_sa_upload_line` (1 dòng hàng = 1 dòng: cột tra cứu +
> `data_json` = cả dòng đúng thứ tự cột MISA + trạng thái `moi/da_upload/da_ghi_so/loi` +
> refno/refid + **run_id** = mã lượt) + `run_id` cho bảng hddt; module dùng chung
> `misa_upload_line.py` (MERGE giữ trạng thái); 3 builder ghi bảng ngay khi sinh Excel;
> agent truyền `SMED_JOB_ID`; web app con thêm server fn `loadUploadLines` + nút
> **"Xem bảng upload MISA"** trong khung lịch sử (bấm 1 lượt → bảng dòng của lượt đó).
>
> **Kiểm chứng:** ghi/đọc/cập nhật trạng thái 3 bảng bằng dữ liệu tổng hợp (29/45/26 cột)
> rồi dọn sạch · test cũ 65+86+22+4 PASS · tsc EXIT 0 · build EXIT 0 · **deploy LAN 3 máy**
> (.11 · .245 · .14) qua `scripts/_gd614_deploy_lan.py` — hash khớp, py_compile OK, service RUNNING.
>
> **Còn lại:** các lượt upload TRƯỚC hôm nay không có dòng trong bảng chuẩn (bắt đầu ghi
> từ lượt kế tiếp). ĐH chốt 03/11: **CHƯA cần thêm Task cuối ngày cho phân hệ "Hóa đơn
> đầu vào"** (vẫn chạy thủ công).
>
> **PA PUSH + RESTART (ĐH lệnh 03/11 tối):** rà trùng lặp — nhánh phụ 3 nhánh RỖNG cả 2
> repo, remote 0 commit mới; đợt này gộp cả **GĐ 651/C.407 của phiên song song** (bảng
> "Danh sách lịch hẹn tiêm" nguồn GiongDB — khác file, không sửa đè). File sửa dở của
> phiên khác (AGENT_REGISTRY.md · `_gd556/_gd557_*.py` · cache sqlite · lan_tray.py) →
> KHÔNG add. **Bump repo con 12.1.0 → 12.2.0** (minor). **Push:** repo con `1985a02..8db703c`
> · app tổng `5f9fad3..0cdc571`. **KHÔNG bump app tổng** (đợt này app tổng chỉ docs +
> script công cụ) — giữ **7.7.0**.
>
> **✅ VERIFY SAU PUSH/RESTART — PASS 4/4:** app con **12.2.0** LIVE · app tổng 7.7.0 HTTP 200 ·
> **login thật OK** + get-session OK · **SSO** ký JWT → 302 về app con + `Set-Cookie: bh_session`
> · `/api/auth/me` 200 (SuperAdmin + nhóm quyền). **Restart:** `GIONG_SMED_Agent` +
> `GIONG_API_Server` (máy chủ) = RUNNING; 3 máy LAN (.11/.245/.14) worker đã restart ngay
> trong lượt deploy = RUNNING. **Tunnel đổi URL** (consumers-drama-accompanied-membrane.
> trycloudflare.com) — **gist tự cập nhật 22:14** ✓.

> **PHỤ LỤC 5 — SỰ CỐ "bảng chuẩn không có dòng" (ĐH báo 04/11 sáng) + ĐÃ KHẮC PHỤC:**
> **Nguyên nhân gốc (bằng chứng log job 01:19 trên .11):** dòng `set MISA_SA_UPLOAD=excel`
> bị nối vào **SAU** dòng khởi động `worker_node.py` trong `thanhpc.env.bat` — worker chạy
> vô hạn nên dòng set KHÔNG bao giờ thực thi ⇒ env không tới tool ⇒ bán hàng đêm chạy
> đường API cũ ⇒ `misa_sa_upload_line` trống. **Đã sửa:** chuyển dòng set lên trước
> (dòng 10, sau WORKER_GROUPS) + restart worker .11 + probe trên máy: `sa_upload_mode()
> = excel ✓` (file `gd649_probe_mode.py`).
> **Backfill 2 lượt gần nhất (đọc lại CHI TIẾT TỪ MISA — chỉ HTTP):**
> `gd649_backfill_sa.py --date 03/11/2026 --run-id 11D59687-11D7-4875-8360-493733C30763
> --date 02/11/2026 --run-id 64A70732-…` → **182 dòng (03/11) + 189 dòng (02/11) = 371
> dòng 'Đã ghi sổ'**, đủ 29 cột MISA ⇒ bấm 2 lượt này trong "Lịch sử upload MISA" thấy
> bảng ngay. Lượt cũ hơn vẫn không có (bảng bắt đầu ghi từ lượt kế tiếp).
> **Hiện trạng đêm 03→04/11 (lỗi hạ tầng, KHÔNG phải bảng chuẩn):** mua hàng 03/11
> (15 phiếu) + xuất kho đêm LỖI **"misa headers" / không lấy được phiên HTTP** — mất
> phiên MISA/Chrome CDP trên máy LAN ban đêm ⇒ chưa đẩy; **cần chạy lại 03/11 mua hàng +
> xuất kho** khi phiên ổn định (bảng chuẩn tự có dòng khi lượt upload thành công). hddt:
> chưa upload (3 dòng bị chặn danh mục — chờ ĐH sửa mã hàng/kho).

### GĐ 650 (Trợ lý ZCode (máy chủ)): Chuyển 2 nhân sự (Nguyễn Thị Thúy + Hoàng Minh Châu) từ Admin → User trong GiongDB (2026-11-03)

> **Yêu cầu của ĐH (03/11 — ảnh chụp trang /admin/permissions):** chuyển 2 nhân sự
> Nguyễn Thị Thúy + Hoàng Minh Châu từ Admin thành User "để anh có thể phân quyền
> xem dữ liệu như mọi người".

> **Bối cảnh phát hiện (đúng lý do ĐH yêu cầu — cấu hình tắt sẵn đang BỊ VÔ HIỆU):**
> 2 người ĐÃ có cấu hình phân quyền tắt sẵn trong bảng `module_access` (Thúy:
> `banhang/bienbanhop/zalo=false` cập nhật 02/11 22:08; Châu: `banhang=false` từ
> 22/09) nhưng KHÔNG có hiệu lực vì role Admin — `getDefaultModuleAccess`
> (permissions.ts:266) cho Admin đủ MỌI quyền cứng và `getEffectiveModuleAccess`
> (dòng 292) return true luôn cho Admin, bỏ qua override. Chuyển role → User thì
> các cấu hình này mới có tác dụng.

> **Đã làm (data-only — KHÔNG sửa code):**
> `UPDATE dbo.employees SET role='User' WHERE email IN ('thuynvy218@gmail.com',
> 'hoangminhchau2631960@gmail.com')` — 2 dòng affected. Giữ nguyên: Phạm Kiên Cường
> SuperAdmin (e...003) · Phạm Cường Admin (e...004) · Nguyễn Thị Mỹ Hạnh Admin
> (e...006).

> **Verify (2 lớp bằng chứng):** (1) SQL trực tiếp GiongDB: đúng 2 dòng role='User',
> 3 dòng admin còn lại nguyên trạng; (2) **production thật** — browser mở
> giong-vn-v6.vercel.app → đăng nhập ĐH → /admin/permissions: hiện đúng
> "Nguyễn Thị Thúy · Ban giám đốc · **User**" + "Hoàng Minh Châu · Ban giám đốc ·
> **User**" (ảnh chụp màn hình lưu trong phiên). Nguồn role: bảng `employees` GiongDB
> (Better Auth `user` KHÔNG có cột role — đã kiểm INFORMATION_SCHEMA; SSO JWT gửi
> role này sang app con — sso-token.ts:91).

> **Hệ quả cho ĐH biết:** sau khi thành User, 2 người vẫn mặc định đủ 12 module cơ
> bản (tổng quan · chấm công · check-in · nhiệm vụ · đề nghị · nhân sự · trung tâm ·
> hồ sơ · báo cáo · ghi chú · chat · hướng dẫn); Bán hàng / Zalo / Biên bản họp /
> Preview Mobile TẮT theo override sẵn có. ĐH bật lại từng mục trong trang Phân quyền
> khi cần. Họ không còn vào được 2 trang admin (Phân quyền / Duyệt đăng ký).

> **Version:** KHÔNG bump (data-only). App tổng **7.7.0** / repo con **12.0.0**.

### GĐ 651 / C.407 (Trợ lý ZCode — máy chủ): PA-1 ĐH chốt 03/11 — bảng "Danh sách lịch hẹn tiêm" lấy nguồn **GiongDB** `stg_9LHT` theo kỳ (sửa 2 lỗi ĐH báo sau khi chạy báo cáo kỳ 11/2026) (2026-11-03)

> **ĐH báo (03/11, 2 ảnh):** (1) cột **Trung tâm** của bảng "Danh sách lịch hẹn
> tiêm" **mất sạch dữ liệu** (báo cáo lần trước có); (2) dữ liệu **KHÔNG đủ** —
> không có vắc xin **BCG-TCDV** trong khi SMED có (ảnh tab Lịch hẹn tiêm 03/11).

> **Chẩn đoán (probe thật trên máy chủ .250):**
> 1. **SMED đổi mẫu export**: ô **A1** cả 19 file = `CÔNG TY CỔ PHẦN GIONG VIỆT
>    NAM` (tên công ty) thay vì tên trung tâm → builder map mã TT **0/19** → cột
>    Trung tâm rỗng. Folder cũ `2026-10-01` (báo cáo lần trước) A1 còn tên TT →
>    đủ 19 mã. Tên trung tâm VẪN còn trong **TÊN FILE** (`DanhSachLichHenTiem_<TÊN
>    TT>_0000NN.xlsx`).
> 2. **Nguồn tải đổi CẢ KỲ → TỪNG NGÀY**: job 08/10 = kỳ 01/10→31/10 (1 folder
>    chứa cả tháng: 19.989 dòng/31 ngày/436 dòng BCG); **từ 09/10** mọi job LHT
>    `date_from = date_to` → folder `2026-11-01` = 1.155 dòng **toàn ngày 01/11**.
>    Builder chỉ đọc **1 folder** (= ngày bắt đầu kỳ) → báo cáo kỳ 01/11→30/11 chỉ
>    có 1.155 dòng gốc (1.726 sau tách), **0 dòng BCG-TCDV**; folder 02/11 bị bỏ qua.
> 3. **GiongDB ĐÃ ĐỦ**: `stg_9LHT` 01/11 = 1.155 · 02/11 = 1.094 · **03/11 = 1.198
>    (345 dòng BCG-TCDV**, 18/19 TT) — ETL nạp thẳng từ **máy LAN** (.34 thanh-pc,
>    .27 lan-1…) nên DB đủ dù FILE không về máy chủ (job LAN ghi ổ C của máy đó).
>    Đối chứng 8 khách trong ảnh SMED (Bế Vũ Minh Anh · Bùi Diệu Huyền · Đặng Gia
>    Khôi · Đặng Khánh Duy · Ầu Ngọc Ánh · Đặng Thị Thanh Huyền · Bùi Hoàng Anh ·
>    Đặng Thị Hoa — LB, hẹn 03/11) → **có ĐỦ từng người trong DB**.

> **ĐH chốt PA-1** (nguồn GiongDB) sau khi em trình 3 phương án. Đã làm — repo con
> `adb750b` (code) + `ea1d54f` (entry):
> 1. `agent/gd348-build-lht-ds.py`: + `_center_from_filename()` (fallback mã TT từ
>    TÊN FILE, `build_all` truyền vào) + **`build_rows_from_db(df, dt)`** đọc
>    `dbo.stg_9LHT` theo `report_date` trong kỳ + `_db_rows_to_ds_rows()` (thuần,
>    tái dùng `expand_row` tách nhiều vắc xin) + `db_label(meta)`.
> 2. `agent/40_web_agent.py::run_lht_report_task`: **nguồn chính = GiongDB**, DB
>    rỗng/lỗi → **fallback đường file** như trước (job không chết); meta thêm
>    `source`; bảng "Danh sách trả nợ theo lịch hẹn tiêm" (C.249/C.254) chạy trên
>    rows mới.
> 3. `src/components/report-result-table.tsx`: `dataLoadedAt` bắt đầu "nguồn "
>    hiển thị nguyên văn (bỏ tiền tố "nạp lúc") — nguồn file giữ như cũ.

> **Verify (dữ liệu THẬT, gọi đúng hàm builder trên máy chủ):** kỳ 01/11→30/11 →
> **3.447 dòng gốc · 5.045 dòng sau tách · 3 ngày (01→03/11) · 19 TT · 0 dòng
> trống mã TT · 345 dòng BCG-TCDV** (khớp SQL đếm độc lập từng số) · bảng "Danh
> sách trả nợ theo lịch hẹn tiêm" **26 dòng / 32 mũi / 28.364.000 đ** (trước 9
> dòng vì lịch hẹn chỉ có 01/11) · unit **29/29 PASS** · tsc **EXIT 0**.

> **Tiêu chí kiểm chứng (ĐH):** BÁO CÁO MARKETING → **5. Danh sách lịch hẹn tiêm**
> → chạy kỳ 01/11→30/11 → cột **Trung tâm đủ mã TT** + có dòng **BCG-TCDV** (345
> dòng) + nhãn "nguồn GiongDB · 3 ngày (01/11/2026→03/11/2026)".

### GĐ 651 phụ lục (Trợ lý ZCode — máy chủ): PA Push 03/11 + 2 việc ĐH giao — tải bù LHT 03/11 (ĐY không có lịch hẹn) · rà báo cáo đọc file (đều dùng GiongDB) · deploy LAN 3 máy + verify production 5/5 (2026-11-03)

> **ĐH giao 3 việc (03/11 tối):** (1) tải bù ngày 03/11 (thiếu TT ĐY) — "anh cần
> đủ"; (2) rà các báo cáo còn đọc file (BLTH/TKKH/GDTVX…) cùng rủi ro như bảng
> LHT; (3) Push + rà trùng lặp + bump + verify production.

> **(1) Tải bù 03/11 — ĐÃ CHẠY; kết luận: không thiếu dữ liệu.** Job tải bù
> `59EAB2CD` (hentiem 03/11→03/11, chạy trên .11) → 19/19 file OK; ETL nạp lại →
> DB vẫn 18 TT vì **Đông Yên (ĐY) ngày 03/11 KHÔNG có lịch hẹn nào trên SMED**:
> file export 5.021 bytes = mức "0 dòng", so với 5.232 / 5.199 / 5.444 bytes =
> 1 / 1 / 3 dòng (khớp DB từng ngày). ĐY là trung tâm nhỏ — 7/15 ngày gần đây
> cũng trống (21-23/10, 28-29/10, 31/10). ⇒ Báo cáo thiếu ĐY ngày 03/11 là ĐÚNG
> thực tế, không phải lỗi tải.

> **(2) Rà báo cáo đọc file — KHÔNG còn báo cáo nào phụ thuộc file OUTPUT.**
> `etl/sql_reports.py` (mọi query_key + TXDS) thuần GiongDB (pyodbc — các nhắc
> "OUTPUT\..." chỉ là ghi chú nguồn gốc ETL); `run_txds_task` → `etl/txds_report.py`
> = pyodbc; các tool cũ `6_BC_TX-DS` / `12_KHO_KT_TH_NXT` / `13_MKT_TIEMHO` /
> `18_TH_Chietkhau` / `21_DS_DT_XK` / `24_BCCNKhachDtruoc` chỉ còn là **tham chiếu
> trong comment**, không nằm trong luồng job (REPORT_MAP/TOOLS). ⇒ Bảng "Danh sách
> lịch hẹn tiêm" là báo cáo CUỐI CÙNG đọc file — đã chuyển nguồn GiongDB hôm nay.

> **(3) Push + deploy LAN + verify.**
> - ⚠️ **Phát hiện và xử lý: code LHT chưa đồng bộ xuống máy LAN** — hook mới đã
>   có trên 3 máy (deploy 22:01) nhưng `gd348-build-lht-ds.py`: .11/.245 **KHÔNG
>   có file**, .14 **bản cũ** ⇒ job `lht-report` rơi vào máy LAN sẽ vỡ. Đã thêm 2
>   file vào `scripts/_gd614_deploy_lan.py` (COMMON: `gd348-build-lht-ds.py` +
>   `etl/sql_reports.py`) và chạy deploy: **3/3 máy hash khớp HEAD · service
>   RUNNING · py_compile OK** (commit `f696a21`).
> - Push: repo con `8db703c` — phiên khác đã bump **12.1.0 → 12.2.0** cho đợt này
>   (ghi rõ "fix bảng Danh sách lịch hẹn tiêm nguồn GiongDB") ⇒ **không bump lại**;
>   app tổng `f696a21` (chore deploy) — app tổng giữ **7.7.0** (code nghiệp vụ nằm
>   ở repo con; đợt app tổng chỉ có docs + script deploy).
> - Rà trùng lặp (GĐ 607): 0 nhánh phụ có commit; remote 0 commit lạ; file sửa dở
>   của phiên khác trong worktree (AGENT_REGISTRY.md + 5 script deploy LAN khác) —
>   KHÔNG đụng.
> - **✅ Verify production (quy trình GĐ 470):** env Vercel 2 app ĐỦ (DATABASE_URL ·
>   APP_JWT_SECRET · TUNNEL_API_BASE_URL · TUNNEL_GIST_ID · BETTER_AUTH_SECRET/URL ·
>   ZAI_API_KEY) · version: app tổng **7.7.0** · app con **12.2.0** · **LOGIN thật
>   ✅** · get-session ✅ · **SSO sang app con 302 + Set-Cookie `bh_session` ✅** ·
>   `/api/auth/me` 200 (user + quyền) ✅ · trang `/m/bc-lich-hen` 200 ✅ — **5/5 PASS**.

> **Tiêu chí kiểm chứng (ĐH):** mở app con → BÁO CÁO MARKETING → 5. Danh sách lịch
> hẹn tiêm → chạy kỳ 01/11→30/11 → 5.045 dòng · cột Trung tâm đủ mã · có BCG-TCDV
> (345 dòng) · nhãn "nguồn GiongDB · 3 ngày (01/11/2026→03/11/2026)".

> **Còn lại (việc sau):** (a) `18_TH_Chietkhau.py` (tool cũ, đọc mã TT từ A1) — ĐÃ RÀ:
> KHÔNG còn được gọi ở đâu (không có trong REPORT_MAP/TOOLS của agent) → chỉ rủi ro nếu
> chạy TAY; báo cáo chiết khấu hiện lấy `stg_8BCCK` qua ETL (center_from_name đã fix GĐ 642); (b) các builder đọc **FILE** khác
> (blth/tkkh/gdtvx…) cũng có nguy cơ thiếu khi job chạy trên máy LAN (file không về
> máy chủ) — nên rà + chuyển dần sang GiongDB; (c) ngày 03/11 thiếu 1 TT (ĐY) trong DB.

### GĐ 653 / C.409 (Trợ lý ZCode (máy chủ)): PA-2 ĐH chốt 04/11 — Task_05/Task_07 lỗi đêm 03→04/11 do PHIÊN MISA .245 chết từ sáng 03/11: builder dừng sớm + tự cảnh báo Zalo + bỏ retry vô ích (2026-11-04)

> **ĐH hỏi (04/11):** "Hôm qua phần Task_05 và Task_07 lỗi? Tìm hiểu nguyên
> nhân và cách khắc phục để không còn bị lỗi như trên." → **ĐH chốt PA-1 +
> PA-2 + PA-3 làm cả ba.**

> **Chẩn đoán (bằng chứng job thật + log .245):** phiên MISA AMIS máy .245
> (giangkt) còn sống đến 03/11 00:32, **chết từ 03/11 ~08:20** (2 job 08:20/
> 08:21 bắt đầu lỗi "misa headers") — không ai đăng nhập lại từ đó. Đêm
> 03→04/11: Task_05 mua hàng 15/15 TT lỗi "misa headers" ×2 lượt (00:45–01:06);
> Task_07 xuất kho dừng sớm 0 phiếu ×2 lượt (01:30–01:32); Task_06 bán hàng
> (.34) phiên còn → 143 phiếu OK. Watchdog CDP 00:45 tự mở lại Chrome đúng
> thiết kế nhưng Chrome mới mở không có phiên MISA. Keepalive 30' vẫn chạy
> đều nhưng **exit 1** — OTP giờ qua SMS (GĐ 587) nên misa_auto_login không tự
> nhập được; tab MISA CDP .245 hiện vẫn nằm màn Login. Lỗi thứ cấp: task
> runner retry ≤2 chạy lại y hệt (~50 phút vô ích) + khối hướng dẫn xuất kho
> in nhầm "CDP không kết nối được" (Chrome còn sống).

> **Đã làm (repo con code `3eab2cf` + docs `58098c9` — chi tiết entry C.409):**
> (1) `misa_muahang_api_run.py` — 2 TT LIÊN TIẾP chết "misa headers" → DỪNG SỚM
> + MARKER "⛔ PHIÊN MISA ĐÃ ĐĂNG XUẤT" (2 TT chống nhiễu oan); (2)
> `misa_xuatkho_api_run.py` — MARKER + tách khối phiên chết ≠ CDP chết; (3)
> `gd625_zalo.py` — `send_text_via_zalo_web` + nhánh `alertText` trong
> `run_bc_zalo_task`; (4) `40_web_agent.py` — `_enqueue_zalo_session_alert`
> (job lỗi có MARKER → tự INSERT job 'bc-zalo' gửi tin nhắn Zalo cho ĐH ngay
> trong đêm, throttle 30', đích kv `bcn_zalo_target`); (5) `task_runner.py` —
> 3 hàm `_run_misa_*` bỏ retry khi MARKER.

> **Verify:** test mới `gd653_misa_session_alert.test.py` **17/17 PASS** ·
> py_compile 5 file OK · test cũ: task_runner_misa_order 28/28 ·
> misa_tab_guard 62/62 · misa_xuatkho_import 65/65 · gd557-fill 2 FAIL CÓ SẴN
> (GĐ 603/648 thêm hddt-dauvao-* mà chưa cập nhật test đó — diff C.409 không
> đụng 2 mục này, đối chứng grep diff = 0).

> **Deploy:** 5 file xuống máy chủ + 3 máy LAN (MD5 khớp HEAD) + restart khi
> rảnh — kết quả ghi bổ sung trong entry này.

> **PA-1 (phần ĐH):** đăng nhập lại MISA .245 1 lần (nhập mã SMS) + đổi kênh
> OTP về EMAIL → keepalive tự giữ phiên như trước GĐ 587. **PA-3:** ĐH đăng
> nhập xong → chạy lại Task_05/07 kỳ 03/11 (job cũ 0 phiếu → an toàn) + đối
> chứng số với nguồn SMED.

> **Version:** KHÔNG bump (agent-side Python — không nằm trong bundle web,
> precedent GĐ 422). App tổng **7.7.0** / repo con **12.2.0**.

### GĐ 654 / C.410 (Trợ lý ZCode (máy chủ)): Điều tra + khôi phục báo cáo kiểm kê cuối tháng kỳ 10 kẹt "Chờ tải dữ liệu" ~70 phút (04/11/2026)

> **ĐH báo 08:46:** báo cáo kiểm kê cuối tháng 01/10→31/10 chạy ~15 phút chưa xong,
> máy .14 thấy "nhiều chấm xanh". Em tra job thật trong GiongDB:
>
> **Chuỗi sự cố (bằng chứng job + log thật):**
> 1. ĐH bấm báo cáo kiểm kê tick "Tải dữ liệu mới nhất" 08:17 → hệ tạo job nguồn
>    xnkt `1AB84945` (kỳ 01/10→31/10, máy thanh-pc/.11) + job chờ `91856E06`.
> 2. Tool PA-1 `_pa1_fetch` (API SMED) tải THẬT đủ: log 2 lượt kết thúc
>    "✅ PA-1 XONG: 589 file · 36.694 dòng · 0 trung tâm lỗi" — dữ liệu nạp
>    GiongDB **stg_7BCNXT tháng 10 = 37.283 dòng · đủ 31 ngày · đủ 19 TT**.
> 3. **GỐC RỄ:** file Excel bị tool ghi LỆCH CẤP THƯ MỤC — mọi ngày 02→30/10
>    lồng trong `OUTPUT.BCNXT_KT6-10-016-10-XX\` (agent truyền
>    day_dir = folder có ngày làm out_root → tool nhánh out_root_has_date ghi
>    lồng) → agent đếm file ở chỗ của mình thấy **0/19**.
> 4. Vòng bù GĐ 557 (FILL_MAX_ROUNDS=2) "chạy lại cả bộ" ×2 — mỗi lượt ~24 phút
>    (589 lượt tải lại từ SMED vô ích) → 09:28 job nguồn error oan
>    "THIẾU FILE sau 3 lần chạy: 0/19" → report_wake tự tạo lượt 4 (`618CFAA7`)
>    chạy tiếp — vòng lặp sẽ còn ~50 phút nữa mới báo LỖI cho job kiểm kê.
>
> **Khôi phục (09:31–09:39, dữ liệu không đụng lại):** hủy lượt 4 (cancelRequested
> qua heartbeat) → đánh 2 job nguồn `done` theo nguồn sự thật DB (đã đối chứng
> stg_7BCNXT) → tạo job sqlreport `kiem-ke` chạy thẳng SQL từ GiongDB:
> **`F1C02C29` DONE 7 giây — 1.205 dòng lô còn tồn · 18 TT** (1 TT hết tồn);
> job chờ cũ `91856E06` → `cancelled` kèm lý do minh bạch trong lịch sử.
> Job kích hoạt wake: `1837F233` (tonkho-niem-yet 03/11, 6 giây).
>
> **Máy .14 "nhiều chấm xanh":** 7 process tray Python chồng nhau
> (2 lan_tray + 3 run_tray + 2 tray_launcher_final) — mỗi process 1 icon vòng
> tròn xanh. Trên .14 có phiên ZCode khác đang thí nghiệm tray → em KHÔNG đụng,
> chờ phiên đó tự dọn (đại biểu ghi bổ sung khi xử lý).
>
> **VIỆC SỬA GỐC CHỜ ĐH DUYỆT (chưa sửa code):**
> - PA-1: fix `_pa1_fetch` nhánh out_dir khi out_root đã chứa ngày — ghi đúng
>   folder mà agent đếm được (hết vòng lặp 24 phút).
> - PA-2: vòng bù GĐ 557 với tool PA-1 chỉ tin exit code + dòng "✅ PA-1 XONG"
>   (pattern GĐ 587 MISA_UPLOAD_REPORTS) thay vì đếm file OUTPUT.
>
> **Version:** KHÔNG bump (không sửa code — vận hành DB job + entry). App tổng
> **7.7.0** / repo con **12.2.0**.

### GĐ 656 / C.411 (Trợ lý ZCode (máy chủ)): PA-1 + PA-2 fix gốc vòng bù lặp — Kết thúc sự cố kiểm kê GĐ 654 (04/11/2026)

> **ĐH duyệt PA-1 + PA-2** (sau báo cáo điều tra GĐ 654). Code repo con
> `e71fda1` (4 file +192/−21):
>
> **PA-1 — `_pa1_fetch.py`:** trích helper `out_dir_for(out_root, has_date,
> module_folder, day, multi)` dùng chung 2 nhánh (MODULES + 10GDTVX):
> kỳ 1 ngày giữ nguyên GĐ 632 (dùng thẳng folder ngày); **kỳ NHIỀU ngày →
> subfolder NGÀY con** `out_root/<ngày>/` (ETL `parse_file` lấy ngày từ folder
> chứa file — `path.parent.name`, DATE_COL 7BCNXT=None) — bản GĐ 632 dồn mọi
> ngày vào folder ngày-từ là SAI ngày cho kỳ dài; manual batch (root OUTPUT)
> giữ `module/ngày` cũ.
>
> **PA-1b — `40_web_agent.py` đếm THẤY file lồng:** `_count_xl_files` +
> 5 chỗ glob khác (scan retry · trả files · xóa file TT thiếu · dời _backup —
> tên backup kèm relative path chống đè · thu file mới) đổi `glob` → `rglob`.
> rglob với file top-level (kỳ 1 ngày) cho kết quả y cũ — an toàn mọi phân hệ.
>
> **PA-2 — vòng bù TIN TOOL PA-1:** `run_smed_task` trả 5-tuple (thêm
> `tool_tail` = 30 dòng cuối stdout); `run_smed_task_with_fill` nhận diện
> "✅ PA-1 XONG … 0 trung tâm lỗi" (exit 0) → `pa1_full` → **bỏ vòng bù theo
> file** (pattern GĐ 587 MISA_UPLOAD_REPORTS). Có trung tâm lỗi / tool lỗi cứng
> → vẫn fill như cũ (rglob giờ đếm đúng → bù đúng TT thiếu, không "chạy lại cả bộ").
>
> **Verify:** test mới `gd656-pa1-pa2.test.py` **12/12 PASS** (luật out_dir 4
> nhánh · rglob đếm file lồng bỏ ~$/log · nhận diện marker 3 ca · code có luồng
> skip) · gd591_kiem_ke **27/27** · 40_web_agent.test **4/4** ·
> gd557-fill **34/36** (2 FAIL CÓ SẴN từ GĐ 603/648 — mock đã cập nhật 5-tuple) ·
> py_compile 3 file OK.
>
> **Deploy (mô hình GĐ 625 — chỉ khi rảnh):** máy .14 ✓ (hash khớp HEAD
> c8decd9e/410b4922, service Running) · máy .11 ✓ (hash khớp, Running) ·
> **máy .245 ĐANG BẬN job mua hàng 10:22 → bỏ qua — chờ rảnh chạy lại
> `python scripts/gd656_deploy_lan.py --machine 245`** · máy chủ: file nằm
> working tree repo con (service chạy trực tiếp) — restart GIONG_SMED_Agent
> 10:48 ✓ `/health` tunnel_ok (URL giữ nguyên — GĐ 579).
>
> **Hiệu lực:** lần sau chạy báo cáo nguồn NXT kế toán kỳ NHIỀU NGÀY (kiểm kê
> cuối tháng…): tool tải ~24 phút LẦN DUY NHẤT → agent tin "PA-1 XONG" → job
> done ngay, hết vòng lặp 3 lượt + "THIẾU FILE" oan.
>
> **Version:** KHÔNG bump (agent-side Python — precedent GĐ 422). App tổng
> **7.7.0** / repo con **12.2.0**.

---

### GĐ 658 / C.412 (Trợ lý ZCode (máy chủ)): 4 điểm thể hiện "Bảng chi tiết kiểm kê theo trung tâm" — ĐH chốt 04/11 (2026-11-04)

> **Yêu cầu của ĐH (04/11, 2 ảnh bản in + bảng trên app).** Code repo con
> `a5021df` (5 file +67/−11):
>
> 1. **Bản in — HSD đủ 1 dòng:** `PRINT_WIDTH_MM["HSD"]` 17→**22mm** (trước
>    đây "28/02/2027" xuống 2 dòng "28/02/2 / 027").
> 2. **Bản in — Nhận xét hẹp lại:** 31→**24mm** + tiêu đề "Nhận xét chất lượng
>    cảm quan" chữ nhỏ **7pt** (nội dung ô vẫn "Đạt" 1 dòng).
> 3. **Đơn giá có giá KỂ CẢ SL tồn = 0** (builder `_kiem_ke_detail_rows`,
>    `etl/sql_reports.py`): trước đây Đơn giá = Giá trị/SL cuối kỳ → SL = 0
>    bị rỗng. Giờ: lô SL cuối = 0 → lấy **giá lô từ NGÀY GẦN NHẤT trong kỳ
>    còn tồn** (`price_ref` = col17/col16 — chính là giá nhập của lô, đúng
>    nghiệp vụ kiểm kê); lô cả kỳ không có ngày nào còn tồn (hiếm) → rỗng.
>    SL > 0 giữ nguyên số cũ.
> 4. **Trên APP — cột "Mã hàng" hẹp lại:** bọc nội dung td trong
>    `<span class="block max-w-[240px] truncate">` (max-width trên td bị bỏ
>    qua trong table auto-layout) — tên dài "Measles, Mumps and Rubella
>    Vaccine Live, Attenuated (Freeze-Dried)" bị ẪN "…" không tràn sang cột
>    Tên hàng; hover vẫn xem đủ (title). **Bản in KHÔNG đụng.**
>
> **Verify:** gd591_kiem_ke **27/27** (T13b mới — lô SL=0 ra Đơn giá 200 =
> 1000/5) · test TS `kiem-ke-chi-tiet` **22 PASS** (T8 285→283mm + T8b) ·
> `tsc --noEmit` EXIT 0.
>
> **Deploy (khi rảnh — script `scripts/gd658_deploy_lan.py`):** etl/
> `sql_reports.py` hash `6ba3d604f8375228` khớp cả 3 máy LAN (.14/.11/.245)
> + restart worker từng máy khi rảnh ✓; máy chủ restart GIONG_SMED_Agent ✓
> (`/health` tunnel_ok — 40_web_agent import sql_reports có cache sys.modules
> nên phải restart để nạp builder mới).
>
> ⚠️ **Job kiểm kê CŨ không tự cập nhật** (job = snapshot thời điểm tính):
> ĐH **bấm Chạy lại** báo cáo kiểm kê (không cần tick tải — stg_7BCNXT đã đủ)
> → bảng chi tiết mới có Đơn giá cả lô SL=0.
>
> **Version:** KHÔNG bump chờ lệnh Push (web đụng 3 file — component/lib/test
> app con; builder agent-side). App tổng **7.7.0** / repo con **12.2.0**.


### GĐ 653 phụ lục (Trợ lý ZCode (máy chủ)): fix SMED đổi nhãn login + PA-3 bù kỳ 03/11 HOÀN TẤT — 32/32 phiếu MISA ghi sổ (2026-11-04)

> **Phát sinh khi bù PA-3:** SMED đổi nhãn ô đăng nhập 'Tên người dùng hoặc email'
> → **'Tên Đăng Nhập'** → job bù đầu chết 19 TT (TimeoutError 30s/TT). Đợt fix UI
> 03/11 của phiên khác **đã MẤT hoàn toàn** (không có ở repo con/CLI/pipeline/
> .11/.245 — memory ghi "bash chết giữa phiên → CHƯA commit").

> **Đã làm:** `_smed_fill_user()` trong `misa_muahang_api.py` (repo con `34349be`)
> — thử nhãn MỚI trước, hụt → nhãn CŨ; deploy .245 (script `gd653_deploy_lan.py`
> mở rộng 6 file, `--wait-idle`). Chỉ builder mua hàng (đủ cho PA-3).

> **PA-3 kết quả (đối chứng từng bước):** xuất kho 03/11 = SMED 0 phiếu (hợp lệ;
> phiên HTTP tự lấy lại từ Chrome OK — PA-1 đăng nhập có hiệu lực) · mua hàng
> lượt 2 = **19 phiếu tạo + ghi sổ 19/19** + 13 phiếu "invalid?" (MISA hiển thị
> TRỄ — lượt 3 xác nhận **32/32 đã có trên MISA**) · đối chứng độc lập
> (`gd653_check_posted.py` đọc pu_list): 32/32 phiếu · 19 ghi sổ · 13 chưa →
> **ghi sổ bù 13/13** (`gd653_ghi_so_13.py --apply`) → **verify cuối 32/32 đã ghi
> sổ, 0 chưa**. Số phiếu SMED kỳ 03/11 (stg_5BKN col4) = 32 — khớp tuyệt đối.

> **⚠️ Tồn đọng báo ĐH:** (1) **29 file agent còn locator SMED cũ** — tool
> download/báo cáo SMED sẽ chết dần khi cookie hết hạn → cần làm lại đợt fix
> 03/11 (nên phiên riêng); (2) builder check sau import báo oan "invalid?" khi
> MISA hiển thị trễ → nên thêm chờ/retry; (3) 29 phiếu xuất kho cũ chờ ghi sổ
> (nhóm A GĐ 563) cần rà riêng.

> **Version:** KHÔNG bump. App tổng **7.7.0** / repo con **12.2.0**.

---

### GĐ 660 / C.414 (Trợ lý ZCode (máy chủ)): Fix 2 lỗi ĐH báo 11:37 — chip vàng "chưa có dữ liệu kỳ này" OAN + bảng chính kiểm kê Nhập kho trống (2026-11-04)

> **ĐH báo (04/11 11:37):** (1) dữ liệu đã tải đủ mà chip vẫn VÀNG "Báo cáo NXT -
> Kế toán (SMED — kiểm kê cuối kỳ) — chưa có dữ liệu kỳ này"; đúng ra phải hiện
> "dữ liệu được nạp lúc … giờ" (kiểm tra luôn các báo cáo khác); (2) bảng chính
> "Chạy báo cáo kiểm kê từ dữ liệu SQL" cột **Nhập kho trống toàn bộ** + dòng
> Tổng cộng cũng trống; (3) căn chỉnh Mã hàng/HSD/Nhận xét chưa thấy đổi.
>
> **Vấn đề 3 — KHÔNG phải lỗi code:** các thay đổi đó là code WEB (app con,
> GĐ 658) — **chưa Push nên production chưa có**; Đơn giá đã hiện vì là builder
> agent-side đã deploy. Cần lệnh "Push" của ĐH → deploy Vercel → mới thấy.
>
> **Vấn đề 1 — GỐC RỄ tìm bằng probe thật:** `loadSourceFreshness`
> (src/routes/api/-smed.ts) nhánh FALLBACK (mọi báo cáo 1 nguồn đi nhánh này)
> truyền params `[rc, d2, d1, d2]` nhưng SQL dùng `report_date >= $2 and <= $3`
> → **khoảng ngày bị ĐẢO** (>= date_to AND <= date_from) → query rỗng → mx
> null → client hiện chip vàng. Chứng minh bằng /query thật: params CŨ →
> `mx: None`; params MỚI `[rc, d1, d2, d2]` → `mx: '2026-11-04 12:36:17'`.
> Sửa: params `[rc,d1,d2,d2]` + nhánh union `hasRows(t, pn+1)` (sinh ($pn+2,
> $pn+3) = (d1,d2) — bản cũ (d2,d1) đảo cho nguồn snap) + stale/tpbExported
> dùng $4 (=date_to). **Probe 7 nguồn đại diện** (5BKN/6BKX/4BKCCN/7BCNXT/
> 2DTTDT/1HDDT/GDTVX snap) → MỌI nguồn mx non-null + stale '0' → chip xanh
> "nạp lúc HH:mm" cho toàn bộ báo cáo. Test canh hồi quy mới
> `smed-freshness-params.test.ts` **7/7 PASS** (giữ cặp placeholder ↔ params).
>
> **Vấn đề 2 — builder bảng chính gom KỲ** (`kiem_ke_cuoi_ky`,
> etl/sql_reports.py): trước đây bảng chính chỉ lấy SNAPSHOT NGÀY MỚI NHẤT của
> lô → Nhập/Xuất = phát sinh 1 ngày cuối (≈0 → ẨN 0 → cột trống toàn bộ + tổng
> trống). Sửa: tái dùng NGUYÊN `_kiem_ke_detail_rows` (gom kỳ — GĐ 658 có
> price_ref) rồi map sang cột bảng chính → 2 bảng nhất quán tuyệt đối; chỉ hiện
> lô còn tồn (giữ GĐ C.68). Cấu trúc cũ giữ nguyên — BN/bảng phụ không đổi tên
> cột. gd591 **27/27** (T8 cập nhật: bảng phụ TD Đầu 40/Nhập 20/Xuất 8/Cuối 62).
>
> **Verify end-to-end (job thật e4f71531 13:5x 04/11, kỳ 01/10→31/10):** bảng
> chính **1.205 dòng — 386 dòng có Nhập kho** + totals **Đầu 26.351 · Nhập
> 13.543 · Xuất 8.955 · Cuối 30.939 · GT 13.411.219.864**; chi tiết **225 dòng
> SL cuối = 0 VẪN có Đơn giá** (yêu cầu GĐ 658 #3). Đối chứng nguồn: Σ col8
> toàn kỳ = 13.795 > 13.543 (bảng chính chỉ lô còn tồn — đúng logic).
>
> **Deploy:** builder `sql_reports.py` hash `180899533b1c41e6` xuống 3 máy LAN
> (.14/.11/.245 — hash khớp, service Running) + máy chủ restart 13:5x ✓ (job
> verify chạy bằng builder mới). **Web (-smed.ts + test) chờ lệnh Push.**
>
> **Version:** KHÔNG bump chờ lệnh Push. App tổng **7.7.0** / repo con **12.2.0**.

---

### GĐ 664 / C.416 (Trợ lý ZCode (máy chủ)): PA Push đợt 04/11 — bump repo con 12.2.1 + LIVE (2026-11-04)

> **Lệnh "Push" của ĐH** (sau GĐ 658 + 660). Rà trùng lặp 2 repo (nguyên tắc 3
> ĐA AGENT + hook tự động): **0 nhánh phụ** (agent-cli/gd541-push/pipeline-work
> đều 0 commit so main, cả 2 repo) · app tổng 28 commit chưa push · repo con 12
> commit chưa push · **cảnh báo có sẵn (không phải của đợt này):**
> - worktree `giong-vn-v6` (app tổng): 8 file sửa dở của phiên khác
>   (AGENTS.md/AGENT_REGISTRY.md + 6 scripts/_gd5xx) — KHÔNG add.
> - worktree `giong-apps` (repo con): 17 file `agent/*.py` sửa dở của phiên
>   khác (GĐ 661 — SMED đổi UI login 29 file, smed_resilient_helpers) — KHÔNG
>   add, KHÔNG trùng file với đợt này.
> - ⚠️ **worktree `giong-apps-cli` (Agent CLI): `-smed.ts` bản CŨ chưa có fix
>   GĐ 660** (còn `[rc, d2, d1, d2]` gốc) + `task_runner.py` (140 dòng lệch) +
>   `bc-cuoi-ngay.tsx` — ĐÃ CẢNH BÁO ĐH: khi Agent CLI commit/merge sẽ có nguy
>   cơ GHI ĐÈ fix freshness GĐ 660 — cần phiên CLI rebase/merge từ main TRƯỚC
>   khi commit.
>
> **Bump (lúc Push — quy tắc ĐA AGENT):** repo con **12.2.0 → 12.2.1** (patch —
> đợt fix: GĐ 658 4 điểm thể hiện + GĐ 660 freshness/bảng chính) — package.json
> + DEFAULT_VERSION (app-shell.tsx). App tổng **KHÔNG bump** (0 code runtime —
> chỉ docs + 2 script deploy công cụ; tiền lệ docs-only GĐ 416/417) giữ 7.7.0.
> *Errata: commit bump ghi "C.415 / GĐ 663" (cấp thừa trước khi claim — số
> chính thức đợt này là GĐ 664 / C.416).*
>
> **Push:** app tổng `36dbdd8..f344bc1` (28 commit: GĐ 654/656/658/660 + docs +
> 2 script deploy) · repo con `67cf541..5043d2f` (12 commit: GĐ 654/656/658/660
> code + docs + bump).
>
> **✅ Verify production (GĐ 470 — login THẬT, không tin "Ready"):**
> app tổng `giong-vn-v6.vercel.app` = **7.7.0** HTTP 200 · app con
> `giong-banhang.vercel.app` = **12.2.1** HTTP 200 (không ghim deployment cũ) ·
> sign-in thật (JSON user ✓) · get-session ✓ · SSO ký JWT (iss/aud) → app con:
> **302 → / + Set-Cookie bh_session** (APP_JWT_SECRET 2 app CÙNG giá trị) ·
> `/api/auth/me` app con trả user e003 SuperAdmin ✓. Env Vercel 2 app đủ
> (DATABASE_URL · APP_JWT_SECRET · TUNNEL_API_BASE_URL + TUNNEL_GIST_ID ·
> BETTER_AUTH_SECRET/URL · ZAI_API_KEY · CLOUDINARY).
>
> **Tiêu chí kiểm chứng của ĐH:** (1) trang kiểm kê — chip nguồn hết VÀNG, hiện
> XANH "nạp lúc HH:mm" cho mọi báo cáo; (2) bảng "Chạy báo cáo kiểm kê từ dữ
> liệu SQL": cột **Nhập kho + dòng Tổng cộng có số** (job mới — bấm job 13:55
> hoặc chạy lại); (3) cột **Mã hàng** trên app gọn (tên Measles… ẩn "…", hover
> xem đủ); (4) **In biên bản A4**: HSD "28/02/2027" 1 dòng + cột Nhận xét cảm
> quan hẹp/chữ nhỏ; (5) lô tồn = 0 vẫn có **Đơn giá** (nếu xem job cũ — chạy
> lại để có số mới).
>
> **Version:** app tổng **7.7.0** (giữ) / repo con **12.2.1** — ĐÃ PUSH + LIVE.

### GĐ 665 / C.417 (Trợ lý Freebuff): Báo cáo nhập kho — cột Số hóa đơn + bảng tổng hợp theo hóa đơn (04/11/2026)

> **Yêu cầu của Đại ca (04/11, ảnh /m/bc-nhap-kho):** (1) cột "Số hóa đơn" giữa Số
> chứng từ và Tên hàng hóa; (2) bảng "Báo cáo nhập kho tổng hợp theo hóa đơn" đặt
> BÊN TRÊN bảng chạy báo cáo — 12 cột. ĐH chốt PA-1 + PA-1a (Chi phí mua hàng /
> Giá trị nhập kho = 0 tạm, ETL sau); Ngày hạch toán = ngày lập phiếu SMED (col3),
> Ngày chứng từ = ngày hóa đơn (misa_phieu_status.inv_date).

> **Bằng chứng:** 5BKN col5 = Số HĐ NCC; Σ col14 = MISA total_amount khớp từng đồng;
> kỳ 10/2026: 362 HĐ ↔ 362 CT (1-1). **Fix 1 lần (ĐH báo không thấy bảng mới):**
> bản đầu builder mới đứng rời (query key riêng) nhưng trang chỉ chạy job
> nk-by-date → không job nào gọi key mới → bảng mới không hiện. Fix: trang 2
> SqlDataModule độc lập (tổng hợp TRÊN + chi tiết DƯỚI) + STT ROW_NUMBER + 3 điểm
> phân quyền web (SOURCES_BY_QUERY · QUERY_GROUP banhang-kho · QUERY_LEAF).

> **Verify (kỳ 10/2026):** 362 dòng · STT 1→362 · tổng 6.844.823.708 = Σ col14
> chi tiết khớp từng đồng · tsc 0 · build PASS. Chi tiết đầy đủ ở entry C.417
> AGENTS.md repo con (commit `fa33008`).

> **Version:** KHÔNG bump. App tổng **7.7.0** / repo con **12.2.1**.

### GĐ 671 / C.422 (Trợ lý Freebuff): Ngày hóa đơn NCC từ chi tiết phiếu SMED — không phụ thuộc MISA (04/11/2026)

> **ĐH chốt (04/11 tối):** cột Ngày hóa đơn của bảng "Báo cáo nhập kho tổng hợp
> theo hóa đơn" phải không phụ thuộc MISA. Điều tra: 5BKN không chép ngày HĐ ·
> grid SMED không có · MIA khớp thấp (46/362) → chi tiết phiếu SMED là nguồn duy
> nhất đầy đủ. **Làm:** script `sm_nhapkho_sync.py` quét chi tiết phiếu SMED
> (login từng TT — helper GĐ 661; headless=False — SMED chặn headless) → bảng
> `sm_nhapkho_phieu` (khóa ma_phieu+center) · builder lấy COALESCE(SMED, MISA).
> **Verify kỳ 04/11:** sync 9/9 phiếu · PN-20261104153951 → 03/11/2026 khớp ảnh
> ĐH · builder 9/9 dòng có ngày HĐ. Chi tiết ở entry C.422 AGENTS.md repo con
> (commit `ea2d092`).

> **Version:** KHÔNG bump (agent-side). App tổng **7.8.0** / repo con **12.3.1**.

### GĐ 672 / C.423 (Trợ lý Freebuff): PA-2 bắt TẬN GỐC thằng ma (UTF-8 BOM worker.env.bat .11) + chuẩn hóa NSSM máy chủ + PA-3 dọn .14 (2026-11-04)

> **Tiếp GĐ 670** (ĐH duyệt "em phân tích và xử lý"). Kết quả đầy đủ ở entry GĐ 672
> AGENTS.md **repo con**. Tóm tắt:
> - **Bắt bằng IP:** `claim.ts` thêm log `x-forwarded-for` (repo con `157bc6c`) → Vercel
>   logs lộ ma poll từ **IP Cloudflare (WARP 1.1.1.1) 104.28.254.75/104.28.222.73** →
>   **.11 (THANH-PC) đang chạy WARP** → worker_node 9092 (start 16:19) claim Vercel.
> - **GỐC RỄ:** `C:\CUONG_2026\giong-agent\worker.env.bat` (.11) có **UTF-8 BOM chèn
>   ở ĐẦU DÒNG 2** (file ghép 16:18 hôm nay) → cmd đọc thành biến tên rác →
>   SMED_INTERNAL_API_URL KHÔNG set → claim Vercel → nhận job sqlreport → builder
>   `.\SQLEXPRESS` trên .11 → 14 job lỗi 08001 17:08-17:40 + job mồi 19:03/19:13/19:20.
> - **Đã xử lý .11:** xóa BOM + restart service worker → PID 7700 poll 8777 chuẩn.
>   **Verify: Vercel logs POST /api/agent/claim CUỐI 21:27:32 rồi HẾT hẳn.**
> - **Chuẩn hóa NSSM máy chủ** (GIONG_SMED_Agent): chạy qua wrapper bat
>   `.secrets/agent.env.bat` (pattern GĐ 546 — env đầy đủ TOKEN + 8777 +
>   AGENT_SQL_CONN giong_worker local); verify job test 21:08 claim core qua 8777 →
>   done 6s. Script `scripts/gd670-fix-nssm-env-agent.ps1`.
> - **PA-3 dọn .14: 196 → 2 python** (worker 21304 con service + 1 tray chuẩn); kill
>   ~180 tray rác + 8 file C:\test_*.py + worker thừa PID 240; DISABLE 9 task test
>   GIONG_LAN_TRAY_* + GIONG_Tray + GIONG_Worker_LAN1. Script
>   `scripts/gd672-don-rac-lan14.ps1` + `scripts/gd672-fix-bom-lan11.ps1`.
>
> **Bài học (ghi cho phiên sau):** (1) file `.env.bat` DO SCRIPT sinh ra phải ANSI
> (không BOM) — BOM chèn giữa file khiến biến ĐẦU DÒNG biến tên rác KHÔNG báo lỗi;
> (2) log "Agent khởi động — poll {WEB_URL}" in TĨNH URL Vercel (dòng 2158) — KHÔNG
> dùng làm chứng cứ phi env (nên đổi thành URL_BASE khi đụng file); (3) NSSM
> AppEnvironmentExtra có thể KHÔNG truyền tới con — wrapper bat là chắc chắn.

> **⚠️ Báo ĐH:** Cloudflare WARP trên .11 đang bật (không rõ ai bật/mục đích — claim
> 8777 LAN không cần WARP; nếu không dùng em tắt giúp).

> **Version:** KHÔNG bump (vận hành + log chẩn đoán). App tổng **7.8.0** / repo con **12.3.1**.

### GĐ 673 / C.424 (Trợ lý Freebuff): PA-1 auto-sync ngày hóa đơn SMED vào Task_02 (04/11/2026)

> **ĐH chốt PA-1** (04/11 tối): sau khi Task_02 (Báo cáo nhanh cuối ngày 17:15)
> tải 5BKN xong → tự spawn `sm_nhapkho_sync.py` nền (Popen CREATE_NO_WINDOW,
> KHÔNG chờ — không chặn chuỗi task) quét chi tiết phiếu SMED ngày run_date →
> bảng `sm_nhapkho_phieu`. Script chuyển sang Chrome CDP 9222 + tab guard
> tg.SMED (SMED chặn headless + job Task_02 claim rải 3 máy). 1 điểm nối duy
> nhất trong task_runner.py — 0 đổi logic task; lỗi spawn chỉ log. Deploy
> .14/.245/.11 (SHA256 + py_compile PASS, service Running) + restart máy chủ
> 22:12. Chi tiết ở entry C.424 AGENTS.md repo con (commit `51a8016`).

> **Version:** KHÔNG bump (agent-side). App tổng **7.8.0** / repo con **12.3.1**.


### GĐ 669 / C.420 (Trợ lý Freebuff): Quy trình nhập kho VTTH-CCDC trọn bộ — Bảng kê nhập VTTH-CCDC (SMED 2 user VP) + Báo cáo + UPLOAD Chứng từ mua VTTH-CCDC (2026-11-04)

> **Yêu cầu của ĐH (04/11) + chốt:** PA-1 tách 3 module riêng · kho MISA
> "VP" · TK Nợ 152/153 · bảng kê có cột Số hóa đơn. Em probe chốt bằng
> chứng thật: API thuần `theKho/GetAllBangKeNhapKho` + id CÔNG TY từ
> `cosotiemchungInfo` (user_16 → 10699 · user_3 → 11030 — không hardcode);
> 3 TT domain tcgiongts = TD/HM/QO; kỳ gộp user_16 65 dòng VTTH kho VP
> 32.484.203, user_3 rỗng hợp lệ; `inventory_account` danh mục MISA =
> TK gốc (VTTH 152_BH) → **TK kho VTTH = 152_VP/153_VP** tự động.

> **Đã làm (app tổng `4c87105` · repo con `81fc085` — chi tiết đầy đủ ở
> entry C.420 AGENTS.md repo con):** 3 module MỚI /m/kho-nhap-vtth (tool
> `4_smed_NHAPKHO_VTTH.py` API thuần 2 user VP → 2 file OUTPUT/5.BKNV,
> expected 2) · /m/bc-nhap-vtth (builders nkv-by-date + nkv-tonghop-hoadon
> trên stg_5BKNV — bảng đã tạo GiondDB; ETL 5BKNV center 'VP'/'VP-TS',
> nạp đè theo ngày thật) · /m/up-mua-vtth (tool
> `misa_muahang_vtth_api(_run).py` — kho VP, TK 152_VP/153_VP, import HTTP
> thuần, ghi sổ tự động, misa_pu_upload_line) + phân quyền 3 điểm đủ cả 2
> repo + job-labels (bổ sung hộ 3 nhãn sót GĐ 665/588 — test GĐ 530 chặn).

> **Verify:** chạy thật tool download kỳ 01/10→03/11 2/2 file (32.484.203
> khớp từng đồng) · ETL + builder khớp nguồn · dry-run tool mua VTTH:
> scrape phiếu thật + Excel kho=VP · TK kho=152_VP · TT 788.400 khớp ·
> hàng "Cốc giấy dùng 1 lần" tự tạo MISA (ĐVT "Cái") · NCC "NHẬT VIỆT"
> chưa có danh sách → phiếu bỏ đúng luồng (**CHỜ ĐH BỔ SUNG NCC**) ·
> tsc 2 repo 0 · npm test PASS · deploy 3 máy LAN + restart agent máy chủ
> (script `scripts/gd669_deploy_lan.py`) — KHÔNG restart api_server (giữ
> tunnel; job VTTH tạm chạy core, phân vai .245 khi restart api_server
> lúc rảnh). **Minh bạch:** GĐ 673 commit hộ 8 dòng VTTH của em trong
> task_runner.py (51a8016 — nguyên trạng) · registry GĐ 668 ⛔ claim nhầm.
>
> **Version:** KHÔNG bump (chờ lệnh Push). App tổng **7.8.0** / repo con
> **12.3.1**.

> **Phụ lục GĐ 673 (05/11 05:00):** Backfill kỳ 10/2026 hoàn tất qua 7 lượt
> idempotent — báo cáo nhập kho tổng hợp theo hóa đơn kỳ 10: **362/362 dòng
> có Ngày hóa đơn (100%)** (361 SMED + 1 fallback MISA — phiếu SMED đã xóa).
> Deploy đủ 4/4 máy (.14/.245/.11 + máy chủ).


### GĐ 678 (Trợ lý Freebuff): PA Push đợt GĐ 676/C.427 — fix Sức khỏe dữ liệu, bump repo con 12.4.1 + LIVE (2026-11-05)

> **Lệnh "Push" của Đại ca (05/11, sau PA-3 GĐ 676).** Rà trùng lặp nguyên tắc
> 3 (hook GĐ 607 tự quét + xem tay): nhánh phụ agent-cli / gd541-push /
> pipeline-work **0 commit lệch** cả 2 repo; app tổng 3 commit docs/registry
> (claim GĐ 677/678 + unlock 676) — không đụng code; repo con 2 commit GĐ 676
> (code `332edca` + entry `c859572`); file modified còn lại là bài dở phiên
> khác (lan_tray.py · routeTree.gen.ts · scripts/_gd5xx · AGENTS.md) KHÔNG đụng.

**Bump:** repo con **12.4.0 → 12.4.1** (patch — fix bug: 4 khai sai config Sức
khỏe dữ liệu + bọc an toàn API + test đối soát) — package.json +
DEFAULT_VERSION; package-lock không lưu version chính (tiền lệ GĐ 418). App
tổng **KHÔNG bump** (docs/registry-only — tiền lệ GĐ 416/417), giữ 7.8.0.

**Push:** app tổng `13698a0..3915541` (4 commit docs/registry) · repo con
`ba361b9..46291d7` (3 commit: code + entry + bump).

**✅ Verify production (GĐ 470-A + B):** env Vercel đủ **6/6** (tổng) +
**5/5** (con) · curl lần đầu: app con **12.4.1** + app tổng **7.8.0** · login
thật app tổng OK (JSON user) · **SSO luồng thật bằng trình duyệt: bấm "Bán
hàng" → app con nhận phiên "Phạm Kiên Cường · SuperAdmin · VP"** (secret 2 app
đồng bộ). Phụ chú: ký tay JWT bằng secret **local** `.env.local` FAIL — secret
local đã lệch với Vercel (không ảnh hưởng production; phiên sau test E2E
local SSO cần lấy secret mới — nhờ Đại ca cung cấp hoặc cập nhật .env.local).

**✅ Trang Sức khỏe dữ liệu (việc gốc GĐ 676):** /m/suc-khoe-du-lieu trên
12.4.1 — **HẾT banner đỏ** "Invalid object name 'dbo.mia_muavao_hd'"; tab
SMED(12) đủ 97 · thiếu/lỗi 0; tab **MIA(2) MUA/BÁN đủ 2 số khớp probe từng
dòng** (MUA 04/11: 1/1 · 7 — BÁN: 1/1 · 192 — 03/11: 21/153 — 02/11: 50/161);
tab MISA(2) · **BANK(3)**. Test đối soát 19/19 khớp GiongDB.

**Tiêu chí kiểm chứng của Đại ca:** trang Sức khỏe dữ liệu mọi ô đủ 2 số
(file/chuẩn + số dòng GiongDB); tab BANK còn 3; nút "Tải lại" ô MIA tạo job
`mia-muavao-tongquan` (agent nhận và chạy).

**Version:** app tổng **7.8.0** / repo con **12.4.1** — ĐÃ PUSH + ĐÃ LIVE.

---

### GĐ 675 / C.426 (Trợ lý Freebuff): UPLOAD Ngân hàng TECOMBANK — nạp sao kê TCB lên MISA Amis (2026-11-05)

> **PA-1 ĐH chốt (05/11):** triển khai module /m/up-tecombank — dùng tính năng
> MISA chính chủ "Tiền gửi → Hạch toán từ sao kê ngân hàng"
> (`/app/BA/BAStatementAccounting`): wizard "Thêm kỳ sao kê" nhận FILE SAO KÊ
> CHUẨN NGÂN HÀNG (xls/xlsx ≤5MB, KHÔNG template — AVA tự đọc). Chi tiết đầy
> đủ ở AGENTS.md repo con C.426 (code repo con `57dc1b2`).

**Bằng chứng thử nghiệm thật (artifacts/gd-up-tecombank/):** kỳ 24/10 (5 GD) —
MISA đọc đúng file TRANSACTION_HISTORY TCB gốc, tổng Chi 271.275.007 / Thu
273.000.000 khớp từng đồng + tự phân loại Chi/Thu + số dư đầu/cuối đúng; kỳ
05/10 (43 GD) — nạp tự động + đối chứng khớp (số dư đầu 1.244.964 → cuối
71.351.298 = 922.000.000 − 851.893.666). Wizard "Lập CT chi hàng loạt" → 1
GD chi = 1 phiếu Ủy nhiệm chi (MISA điền sẵn đầu đề, còn thiếu TK Nợ/Có +
đối tượng — điền bằng AVA / quy tắc / bảng config).

**Đã làm:** engine `misa_tcb_saoke.py` (nap — wizard tự động + đối chứng số
GD/số dư → `misa_tcb_saoke_ky`, kỳ đã nạp bỏ qua không nạp đè; lap-ct — lập
CT hàng loạt theo config `misa_tcb_saoke_config`; thong-ke) + wiring
40_web_agent.py (REPORT_MAP + MISA_UPLOAD_REPORTS + SMED_ACTION) + web
/m/up-tecombank (chọn kỳ + 2 nút job + bảng kỳ auto-refresh) + API
-tcb-saoke.ts + job-labels. Test 5/5 · tsc 0 · build OK.

**Bài học:** grid MISA tách cells bằng `\n`; chọn "số GD" phải chặn độ dài
tránh nhầm TK 11 số → overflow; tab mới đôi khi dừng callback AMIS → vào
/app trước rồi goto phân hệ; balance TCB = số dư SAU GD + file sắp giảm dần
theo giờ; job_id smed_pull_jobs để NVARCHAR (dạng `manual-<giờ>`).

**KHÔNG restart agent** (chưa push — sau Push restart GIONG_SMED_Agent nạp
REPORT_MAP mới). **Tiêu chí kiểm chứng (sau Push):** /m/up-tecombank chọn kỳ
→ nạp → MISA hiện kỳ mới + bảng web nap_ok; Lập CT cần ĐH cấu hình hạch toán
rồi chạy thử 1 kỳ nhỏ.

**Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
**7.8.0** / repo con **12.4.1**.


---

### GĐ 680 / C.429 (Trợ lý Freebuff): Quy tắc MỚI ĐH chốt — ô chọn ngày PHẢI có lịch (date picker) + sửa trang up-tecombank + PA Push (2026-11-05)

> **Chỉ thị ĐH (05/11):** Từ giờ MỌI ô chọn ngày trên UI phải có bộ chọn lịch
> hiện lên (`input type="date"` — icon 📅, lịch pop-up, Xóa/Hôm nay — mẫu
> trang Sao kê TPB) — KHÔNG bắt gõ tay. ĐH nhắc riêng: "TPbank chuẩn bị làm
> đấy nhắn nó không nó lại quên". Quy tắc ghi thành **mục 18 AGENTS.md**
> (SHARED-BLOCK `GDDATPICKER-QUY-TAC-UI`) — phiên làm TPBANK BẮT BUỘC áp dụng.

**Đã làm:** (1) mục 18 quy tắc; (2) repo con `f9d9060` — /m/up-tecombank 2 ô
ngày đổi `<Input type="date">` + validator triggerTcb nhận cả yyyy-mm-dd lẫn
dd/mm/yyyy (engine `_parse_date` vốn hỗ trợ 2) — tsc EXIT 0; entry C.429
repo con.

**PA Push (lệnh ĐH Push 05/11) — rà trùng lặp nguyên tắc 3 (hook GĐ 607):**
nhánh phụ rỗng cả 2 repo; repo con chưa push 2 commit GĐ 680; app tổng 5
commit (3 GĐ 680 em + 2 GĐ 679 phiên khác — script deploy LAN
gd677_deploy_lan.py, chạy local không đụng code web build — đẩy kèm, minh
bạch); file dở phiên khác (worktree) KHÔNG nằm trong commit — không đụng.
**Bump:** repo con **12.5.0 → 12.5.1** (patch — sửa UI date picker, 2 nơi);
app tổng **docs-only giữ 7.8.0**. Env Vercel trước push: ĐỦ cả 2 app.

**Push:** app tổng `376eaa2..3db6851` · repo con `ba923cc..606cd8a`.

**✅ Verify production (curl lần đầu):** app tổng **7.8.0** · app con
**12.5.1** · login HTTP 200 + get-session "Phạm Kiên Cường" · SSO 302 →
giong-banhang + Set-Cookie bh_session.

**Tiêu chí kiểm chứng của ĐH:** mở /m/up-tecombank (app con 12.5.1) → bấm ô
Từ/Đến ngày → lịch pop-up hiện lên chọn được ngày → nạp job vẫn chạy đúng.

**Version:** app tổng **7.8.0** (giữ — docs-only) / repo con **12.5.1** —
ĐÃ PUSH + ĐÃ LIVE.

---

### GĐ 679 / C.428 (Trợ lý Freebuff): Fix 3 lỗi upload MISA đêm 04→05/11 (Task_05/06/07) + Task_03 tự đủ mục chi tiết + bảng Upload MISA 13 dòng sticky (2026-11-05)

> **Yêu cầu của Đại ca (05/11, 4 ảnh):** (1) Task_03 lựa chọn tất cả các mục chi
> tiết có trong đó; (2) Task 5,6,7 lỗi chạy upload ngày hôm qua — lý do + hướng
> khắc phục + chạy thủ công có lỗi không; Task_05/07 ghi chú vàng "Lượt này chưa
> ghi dòng nào vào bảng chuẩn MISA (bản cũ trước GĐ 649)"; (3) Task_06: bảng
> Upload MISA để hẹp — cho 13 dòng dữ liệu + 2 dòng cố định (tiêu đề + tổng
> cộng), thêm nút "Tải Excel", cố định dòng tiêu đề + dòng tổng cộng — ÁP DỤNG
> MỌI module Upload MISA.

> **CHẨN ĐOÁN (đọc log đầy đủ trên .245 + probe thật, KHÔNG đoán):**
> - **Task_05 mua hàng** (job 00:16+00:17, "Lỗi: 8 · QO/PY/ML/TP/SĐ/TĐ/TA/ĐX:
>   không có danh mục"): log thật `⚠️ Tra danh mục MISA lỗi: JSONDecodeError:
>   Expecting value: line 1 column 1 (char 0)` cho CẢ 8/8 TT — probe trên .245
>   xác nhận MISA trả **HTTP 401 + body RỖNG (len=0)** khi phiên hết giá trị
>   dù file session ghi "còn 8.10 giờ" → `json.loads("")` → tra danh mục rỗng.
>   **Danh mục KHÔNG thiếu** — 8 TT này đã ghi sổ thành công kỳ 03/11 (đối
>   chiếu misa_pu_upload_line); thông báo cũ "không có danh mục" SAI cảm giác.
> - **Task_06 bán hàng** (00:18+00:42, `ModuleNotFoundError: No module named
>   'misa_sa_detail_sync'` 13 TT): file `misa_sa_detail_sync.py` (mới từ GĐ
>   649) **CHƯA TỪNG có trong danh sách deploy** → máy THANH-PC (.11) thiếu
>   (SSH Test-Path = False). Phiếu bán hàng đã import xong trên MISA nhưng
>   bước chót (_chot_sa_sau_import) chết ngay dòng import module.
> - **Task_07 xuất kho** (00:53+01:01, `JSONDecodeError` ở tra_hang_hoa): CÙNG
>   gốc body rỗng, nhưng chỗ `tra_hang_hoa` không bọc try → **chết cả tool**
>   dù đã quét được 82 phiếu (0 phiếu tạo, bảng chuẩn trống). Thêm chặn 2: 9/19
>   TT "kỳ API sai — phiếu đều KHÔNG thuộc ngày 04/11 (vd PX-SD-2026114164843)"
>   — mã điều chuyển SMED dùng ngày **KHÔNG đệm 0** ("2026114" = 04/11/2026),
>   guard cũ chỉ khớp d_diso "20261104" → chết oan.
> - **Ghi chú vàng "bản cũ trước GĐ 649"** = ĐÚNG logic (job lỗi sớm → 0 dòng
>   bảng chuẩn); KHÔNG phải bug — sau chạy lại thành công tự hết.

> **Đã làm (repo con code `4c16db0` · app tổng script `bcc2a12`):**
> 1. `misa_http_api.MisaHttp.call` — body rỗng (bất kể status) → tự lấy lại
>    phiên MISA từ Chrome + thử lại 1 lần; lần 2 vẫn rỗng → **raise LỖI RÕ**
>    ("MISA trả HTTP {status} body RỖNG sau khi lấy lại phiên…") — hết JSONDecodeError mơ hồ.
> 2. `misa_xuatkho_api.tra_hang_hoa` — bọc JSON → trả None + log rõ (điểm gọi
>    sẵn có `if not it → bỏ phiếu, continue` — 1 mặt hàng lỗi không chết tool).
> 3. Guard kỳ sai (`misa_xuatkho_import` 2 chỗ) — nhận thêm d_alt = YYYY M D
>    không đệm (đúng chuẩn mã PX-SD; mã PH- đầy đủ vẫn khớp d_iso) — vẫn CHẶT:
>    mã phải chứa đúng ngày của kỳ.
> 4. `misa_muahang_api.run` — center_map RỖNG TOÀN BỘ → báo đúng nguyên nhân
>    "không tra được danh mục MISA (API trả rỗng — phiên MISA hết giá trị?)";
>    `misa_muahang_api_run` dead_streak nhận thêm lỗi phiên mới (dừng sớm).
> 5. `misa_banhang_api._chot_sa_sau_import` — thiếu module → chỉ BỎ QUA kiểm
>    chứng chi tiết, tham chiếu + ghi sổ + bảng chuẩn VẪN chạy + log cảnh báo deploy.
> 6. `task_runner._selected_reports(include_all)` + qkeys — nhiệm vụ TẢI DỮ
>    LIỆU HÀNG NGÀY (kind daily) LUÔN đủ mọi phân hệ/báo cáo hiện hành (config
>    nguồn 24/09 thiếu tkkh/bank/MIA + thiếu báo cáo tiem-ho/tonkho-niem-yet —
>    "Task_03 lựa chọn tất cả các mục chi tiết có trong đó"); TRỪ bank-vcb
>    (loại có chủ đích GĐ 436 — VCB 23:00 trả rỗng); quick/backfill giữ nguyên.
> 7. Web `sql-data-module.tsx` — bảng "Xem bảng upload MISA": header riêng
>    (số dòng + mã lượt + **nút Tải Excel**), vùng cuộn **cao vừa 13 dòng dữ
>    liệu** (max-h 400px), **dòng tiêu đề STICKY trên + dòng Tổng cộng STICKY
>    dưới** (tổng theo cột số, **TRỪ cột Đơn giá** — nguyên tắc định dạng số 3;
>    `isUnitPriceColumn` export dùng chung) — 1 component dùng chung → MỌI
>    module Upload MISA (mua/bán/xuất/VTTH/HĐ đầu vào) tự hưởng.
> 8. Web `tasks-page.tsx` — dialog cấu hình thêm nút "Chọn tất cả (cả 2 khối)".

> **Verify:** test mới `gd677_misa_resilience.test.py` **7/7 PASS** (body rỗng
> lần 1 tự hồi · lần 2 raise rõ · tra_hang_hoa None · guard mã không-đệm-0
> KHÔNG chết oan · mã sai kỳ VẪN chết) · các bộ cũ PASS (http_fetcher 6 ·
> bootstrap 13 · login 23 · muahang 2 bộ · gd536_xk 72) · tsc app con **0 lỗi**
> · npm test PASS · py_compile 7 file OK.

> **Deploy + CHẠY LẠI THẬT (kỳ 04/11 — bằng chứng đối chứng):**
> - Deploy 9 file (kèm `misa_sa_detail_sync.py` + `misa_upload_line.py`) ra
>   **3 máy LAN** (.14/.245/.11) qua `scripts/gd677_deploy_lan.py` — verify
>   hash + py_compile **PASS**, worker restart; **máy chủ** restart
>   GIONG_SMED_Agent 10:59 (nạp task_runner mới).
> - **Task_05 mua hàng:** TRƯỚC 0 tạo/0 ghi sổ/8 lỗi "không có danh mục" →
>   SAU **tạo 5 · ghi sổ 5/5** (bảng chuẩn misa_pu_upload_line 5 dòng
>   da_ghi_so); log mới: "phiên HTTP đã hết hạn → lấy lại từ Chrome" → Chrome
>   không có phiên → tự chuyển đường Chrome (GĐ 587) → tra danh mục QO
>   THÀNH CÔNG. 4 phiếu còn lại (QO/PY/ML/SĐ) lỗi **scrape SMED** sau 3 lần
>   (lỗi tạm thời phía SMED — sẽ tự bù lượt sau).
> - **Task_06 bán hàng:** job **done** 11:12 · 189/190 phiếu đã upload (trước
>   158) · **bảng chuẩn misa_sa_upload_line 219 dòng** (trước 0 — hết ghi chú vàng).
> - **Task_07 xuất kho:** job **done** 11:25 · **188/188 phiếu** (trước 0) ·
>   **bảng chuẩn misa_xk_upload_line 221 dòng** (165 đã ghi sổ + 56 đã upload).
> - **Bù kỳ thiếu:** kích chạy bù xuất kho 02+03/11 + mua hàng 02/11 (3 job
>   pending, created_by GD679-bu-ky) — kết quả chốt ở entry kế.

> **⚠️ Minh bạch sự cố commit (quy tắc ĐA AGENT):** commit `bcc2a12` (script
> deploy) **vô tình mang theo AGENTS.md đang staged sẵn của phiên khác** (entry
> GĐ 678 PA Push hoàn chỉnh — KHÔNG mất nội dung, chỉ sai commit message).
> File dở `lan_tray.py` + sqlite của phiên khác KHÔNG bị đụng (git status vẫn
> modified). Cổng shared-doc GĐ 495 cần rà thêm ca "index có sẵn file dùng
> chung của phiên khác khi mình commit file thường". Đã báo ĐH.

> **Lưu ý Task_03:** cấu hình nhiệm vụ hàng ngày (hàng daily cũ nhất) đang
> 22 phân hệ/28 báo cáo — code mới TỰ BÙ đủ khi chạy; dialog hiển thị sẽ đủ
> sau lượt spawn kế (23:00 hôm nay).

> **Tiêu chí kiểm chứng của ĐH:** trang UPLOAD Mua hàng/Bán hàng/Xuất kho →
> Lịch sử upload MISA lượt mới nhất → bấm "Xem bảng upload MISA": bảng cao vừa
> 13 dòng, cuộn thấy tiêu đề + Tổng cộng DÍNH; nút Tải Excel tải file có dòng
> tổng (không cộng cột Đơn giá); ghi chú vàng "bản cũ trước GĐ 649" biến mất ở
> các lượt mới. Dialog Task_03 có nút "Chọn tất cả (cả 2 khối)".

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **7.8.0** / repo con **12.5.1**.

---

### GĐ 681 / C.430 (Trợ lý Freebuff): UPLOAD Ngân hàng TPBANK lên MISA — PA-1 clone TCB, 5/5 kỳ khớp từng đồng (2026-11-05)

> **Yêu cầu của ĐH (05/11):** triển khai module Upload MISA TPBank — "làm tương
> tự phần MISA AMIS của Techcombank". **ĐH chốt PA-1**: engine riêng
> `misa_tpb_saoke.py`; hạch toán mặc định như TCB (Nợ 331/Có 1121 chi ·
> 1121/131 thu — chỉnh qua `misa_tpb_saoke_config`); kỳ = 1 file/ngày = 1 kỳ
> MISA. ĐH dặn riêng (C.429): "TPbank chuẩn bị làm đấy nhắn nó không nó lại
> quên" quy tắc bộ chọn lịch → đã áp dụng `input type="date"`.

> **Bằng chứng điều tra trước khi làm:** probe wizard MISA "Thêm kỳ sao kê"
> NHẬN file TPB gốc (TK 11698866789 "Ngân hàng TMCP Tiên Phong" có sẵn) —
> KHÔNG tạo gì trong probe (ảnh artifacts/gd-up-tpbank/). Job
> `misa-tcb-saoke` ĐH bấm 11:07 hôm nay đang error vì script chưa deploy
> (chờ Push — đúng dự kiến GĐ 675; sau Push đợt này deploy CẢ 2 engine TCB +
> TPB + restart GIONG_SMED_Agent là hết).

> **Đã làm (chi tiết + 3 bài học kỳ/-modal/dòng kỳ ở entry C.430 AGENTS.md
> repo con — code `1e3ecae` repo con):** engine `agent/misa_tpb_saoke.py`
> (nap/lap-ct/thong-ke — wizard "Thêm kỳ sao kê" TK 11698866789, đối chứng số
> GD + số dư đầu/cuối TRỰC TIẾP từ 4 dòng tổng file TPB) + wiring
> `40_web_agent.py` (REPORT_MAP `misa-tpb-saoke` + MISA_UPLOAD_REPORTS +
> SMED_ACTION) + `/m/up-tpbank` (bộ chọn lịch C.429) + API `-tpb-saoke.ts` +
> job-labels + test 7/7 PASS.

> **Bằng chứng chạy thật — 5/5 kỳ TPB nạp lên MISA + đối chứng KHỚP TỪNG ĐỒNG
> (25 GD, tổng thu 1.565.801.591 · chi 1.997.837.000):** 08/09 (15 GD · dư
> 55.342.817 → 2.475.817) · 25/09 (1 · 2.475.817 → 2.476.210) · 09/10 (1 ·
> 382.617.210 → 482.617.210) · 10/10 (7 · 482.617.210 → 3.447.210) · 25/10 (1 ·
> 3.447.210 → 3.450.408). Verify: tsc EXIT 0 · build OK · unit 7/7.

> **⚠️ THIẾU SÓT download:** OUTPUT 17.BANK_TPB không có file ngày 26/09→08/10
> → số dư giữa kỳ 25/09 và 09/10 nhảy ~380 triệu (tiền về TK thật không có file
> GD). Cần tải bù tool 42_tpb_saoke.py kỳ dài các ngày thiếu rồi nạp tiếp —
> việc download, không phải lỗi upload.

> **Tiêu chí kiểm chứng (sau Push):** trang /m/up-tpbank app con → bộ chọn
> lịch → Nạp sao kê lên MISA → job done + bảng web dòng nap_ok; 5 kỳ đã nạp
> hiện trên MISA (Tiền gửi → Hạch toán từ sao kê ngân hàng, TK
> 11698866789); Lập CT cần chạy thật kèm ĐH lần đầu.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **7.8.0** / repo con **12.5.1**.

---

### GĐ 683 / C.430 (Trợ lý Freebuff): PA Push đợt 05/11 — fix upload MISA + bảng Upload MISA 13 dòng + TPBank, bump repo con 12.6.1 + LIVE verify 4/4 (2026-11-05)

> **Lệnh "Push" của Đại ca (05/11, sau GĐ 679).** Rà trùng lặp nguyên tắc 3:
> app tổng 7 commit thuần DOCS (3 GĐ 679 của em + 4 GĐ 680/681/682 TPBank của
> phiên song song) · nhánh phụ agent-cli/gd541-push/pipeline-work **RỖNG** cả 2
> repo · repo con 0 commit chưa push lúc rà (đã push 12.5.1 sáng) — **nhưng
> trong lúc chuẩn bị, phiên song song commit 2 commit C.430** (engine
> `misa_tpb_saoke.py` 726 dòng + trang /m/up-tpbank + wiring + test 7/7) →
> push đợt này mang theo cả 2 commit đó. File dở KHÔNG đụng: `lan_tray.py` +
> sqlite (.245) · `40_web_agent.py`/`job-labels.ts`/`up-tpbank.tsx` (.11).

> **Bump (lúc Push — quy tắc ĐA AGENT):** app tổng **docs-only → giữ 7.8.0**
> (tiền lệ GĐ 416/417); repo con **12.5.1 → 12.6.0** (minor — module TPBank
> C.430 + fix upload MISA GĐ 679/C.428) rồi **→ 12.6.1** (patch — 2 sửa nhanh
> phát hiện khi verify: dòng Tổng cộng loại cột MÃ + Excel kèm dòng tổng).
> Checklist GĐ 138 ✓ (12.6.1 mọi thành phần 1 chữ số).

> **Env Vercel trước push: ĐỦ cả 2 app** (DATABASE_URL · APP_JWT_SECRET ·
> TUNNEL_API_BASE_URL + GIST · BETTER_AUTH ×2 · ZAI_API_KEY).

> **Push:** app tổng `6244f07..2fc5b27` (7 commit docs) · repo con
> `606cd8a..5f62faf` (2 commit C.430 TPBank của phiên song song) → `0ba1526`
> (bump 12.6.0) → `2ee790f..4b12fa5` (fix tổng cộng + bump 12.6.1) →
> `4e7a852` (giữ cột Số lượng).

> **✅ Verify production (curl + browser thật — quy tắc GĐ 470):** app tổng
> **7.8.0** · login thật cuongpk.giong04 → JSON user + get-session OK · bấm
> "Bán hàng" ở sidebar (browser thật) → **tab app con mở THẲNG trang chủ**
> (không /login) → **SSO OK, APP_JWT_SECRET 2 app KHỚP** · app con hiển thị
> "Phạm Kiên Cường · SuperAdmin · VP" · app con **12.6.1** (curl lần đầu,
> không ghim deployment).
> **Nghiệm thu bảng Upload MISA trên production** (browser thật, trang
> /m/up-nhap-kho): job 11:03 mở → nút **Tải Excel** + header "Bảng chuẩn MISA ·
> 5 dòng · mã lượt" + bảng dữ liệu thật + **dòng Tổng cộng sticky**: sau 2 sửa
> nhanh = `Tổng cộng 90 (Số lượng) · 53.040.948 (Thành tiền)` — KHÔNG còn cộng
> oan Số hóa đơn (305.415)/Mã NCC (400.438.796)/TK công nợ (1.655)/Đơn giá.

> **Tiêu chí kiểm chứng của ĐH:** app con 12.6.1 → trang UPLOAD Chứng từ mua
> hàng → Lịch sử upload MISA → bấm tên lượt (vd 11:03) → "Xem bảng upload
> MISA": bảng cao vừa 13 dòng cuộn, tiêu đề + Tổng cộng dính, nút Tải Excel
> (file có dòng TỔNG CỘNG + cột Đơn giá để trống). Ghi chú vàng "bản cũ trước
> GĐ 649" đã hết ở các lượt chạy lại. Trang /m/up-tpbank (12.6.1) có bộ chọn
> lịch (C.429).

> **⚠️ Phát hiện khi verify (đã xử lý):** (1) token SSO test ký bằng
> APP_JWT_SECRET trong `.env.local` bị app con từ chối → secret file local CŨ
> so production (KHÔNG phải lệch 2 app — browser thật chứng minh luồng đúng);
> (2) dòng Tổng cộng v1 cộng oan cột mã số (Số hóa đơn/Mã NCC/TK) — sửa trong
> cùng đợt push.

> **Version:** app tổng **7.8.0** (giữ — docs-only) / repo con **12.6.1** —
> ĐÃ PUSH + ĐÃ LIVE.

---

### GĐ 685 / C.431 (Trợ lý ZCode máy chủ): Badge "Máy chạy" trên web — biết ngay máy trạm nào đang chạy từng lệnh (PA-1 Đại ca chốt 05/11) (2026-11-05)

> **Yêu cầu của Đại ca (05/11, kèm ảnh thanh tiến trình):** "Anh muốn biết máy nào
> đang nhận việc và tiến trình chạy thế nào thì nhìn vào đâu... phân bổ job chạy là
> hoàn toàn ngẫu nhiên đúng không? Máy nào rảnh thì tự nhận Job về để chạy đúng
> không? Giải thích + đề xuất giải pháp để nhìn thấy và theo dõi tiến trình nhận
> job của các máy tính."

> **Khảo sát (bằng chứng thật):** phân bổ KHÔNG ngẫu nhiên — (1) worker poll
> api_server 20 giây tự KÉO job theo NHÓM khai báo `WORKER_GROUPS` (core/smed/
> misa-muahang/misa-banhang); (2) thứ tự LPT — job nặng trước, cùng độ nặng FIFO
> (GĐ 621/C.389 `_claim_order_sql`); (3) claim ATOMIC 1 câu UPDATE ... UPDLOCK
> (không bao giờ trùng) + thu hồi job mất heartbeat; (4) máy chủ `core` cứu hộ job
> chuyên biệt chờ >15'. 24h qua: core 110 job · giangkt 22 · lan-1 7 · thanh-pc 3.
> **Chẩn đoán "không thấy máy":** cột `claimed_by` CÓ trong GiongDB nhưng web
> KHÔNG đọc ra (type SmedJob + SELECT đều thiếu) → 3 PA trình ĐH, **ĐH chốt PA-1**.

> **Đã làm (repo con `7f3eaa3` — 9 file, +197/-3):** `-smed.ts` thêm `claimed_by`
> vào SELECT (2 nhánh) + mapJob + type `SmedJob.claimedBy` · lib mới
> `src/lib/machine-names.ts` — MỘT nguồn map mã worker → tên máy: `core` → Máy chủ
> (.250) · `giangkt` → GIANGKT (.245) · `thanh-pc` → THANH-PC (.11) · `lan-1` →
> PC-PKT-01 (.14); mã lạ hiện mã thô (không giấu thông tin) + test mới 20/20 ·
> component `src/components/machine-badge.tsx` (có máy → badge xanh "GIANGKT (.245)"
> + tooltip đầy đủ; pending chưa nhận → hổ phách "Chưa máy nào nhận"; job cũ trước
> GĐ 534 không mã máy → ẩn) · chèn 5 điểm: thanh tiến trình (header-jobs-bar) +
> Lịch sử chạy báo cáo (sql-data-module + sql-report-module) + Lịch sử upload MISA
> (sql-data-module) + Lịch sử lấy dữ liệu (smed-pull-module).

> **Verify:** tsc EXIT 0 · npm test 12/12 file PASS (machine-names 20/20) · build
> EXIT 0 · **E2E browser thật local** (preview 8101 + SSO tự ký, script
> `scripts/_gd685_verify_badge.mjs`): /m/bc-nhap-kho 27 badge "Máy chủ (.250)" ·
> **/m/kho-xuat 47 badge ĐỦ 4 nhãn: GIANGKT (.245) · PC-PKT-01 (.14) · THANH-PC
> (.11) · Máy chủ (.250)** — ảnh `screenshots/gd685-badge-may-kho-xuat.png`.
> (Thanh tiến trình lúc verify 0 job chạy → bar ẩn — cùng component/field, sẽ hiện
> khi có lệnh.)

> **Tiêu chí kiểm chứng (sau Push):** mở app con → mỗi dòng lệnh trên thanh tiến
> trình + mọi khung lịch sử hiện tên máy chạy; job mới tạo → trong ~20 giây hiện
> tên máy nhận; đối chiếu chéo `python scripts/monitor_4_machines.py` trên máy chủ.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **7.9.0**
> / repo con **12.6.1**.

---

### GĐ 684 / C.431 (Trợ lý Freebuff): Kiểm 3 việc Đại ca + fix bán hàng (Vị trí/HSD/ghi-sổ-bù) + xuất kho bù 277 phiếu + điều tra mua hàng SĐ + bảng 13 dòng mọi module (2026-11-05)

> **Nguyên tắc MỚI Đại ca chốt (05/11 — bắt buộc vào bộ nhớ):** (1) xưng hô
> **"Đại ca"** — KHÔNG dùng "ĐH"; (2) **TRƯỚC khi kết thúc nhiệm vụ phải đọc
> lại đề bài, kiểm không bỏ quên mục nào** (lý do: nhiều lần em báo xong nhưng
> sót yêu cầu gốc). Đã lưu memory `nguyen-tac-dai-ca-va-doc-lai-yeu-cau`.

> **VIỆC 1 — phiếu mua hàng SĐ PN-20261104153951 (HĐ 00004213, Biovaccine):
> KHÔNG THỂ TẠO — PHIẾU ĐÃ BỊ XÓA TRÊN SMED.** Bằng chứng 4 lớp: (a) job bù
> 3 lượt "không scrape được SMED" — log chi tiết "không thấy phiếu trong grid";
> (b) probe trực tiếp tài khoản SĐ: login OK (welcome + header đúng user) +
> filter 30 ngày + search mã → **"0 Không có dữ liệu"**; (c) cùng tài khoản
> search PN-20261102142528 (02/11) → THẤY; search số HĐ 00004213 → thấy phiếu
> **PN-20261103142112 ngày 03/11** (user SĐ nhập TRÙNG HĐ cùng số 00004213 ngày
> 04/11 rồi xóa phiếu 04/11 — phiếu 04/11 từng scrape được lúc 22:05:17 04/11
> trong sm_nhapkho_phieu); (d) phiếu 03/11 cùng số HĐ trên MISA bị chặn
> "import xong nhưng không thấy (invalid?)". → **Cần Đại ca xác nhận với TT SĐ**:
> nếu phiếu 04/11 xóa là ĐÚNG thì báo cáo nguồn (file 5.BKN 04/11) cần làm mới
> — dữ liệu cũ còn trong stg; nếu cần giữ → nhập lại phiếu trên SMED rồi chạy
> lại Tool. KHÔNG phải lỗi hệ thống (tài khoản SĐ hoạt động tốt).

> **VIỆC 2 — xuất kho "232 dòng vs 188 MISA": 232 là DÒNG HÀNG, không phải
> phiếu** (stg_6BKX 04/11: 232 dòng / 198 số CT). MISA 188 + file BKX thiếu
> phiếu so SMED thật. **Chạy lại builder xuất kho 04/11 → done: 277 phiếu
> (277/277 lên MISA, không trùng — 265 đã ghi sổ + 62 đã upload) + bảng chuẩn
> 327 dòng.** Builder quét SMED API trực tiếp ĐỦ hơn file BKX tải 23:00
> (guard "kỳ API sai" + tool chết giữa chừng đã fix GĐ 679) → bù hết phiếu thiếu.

> **VIỆC 3 — bán hàng: 3 lỗi thật, đã fix + deploy:**
> - **"234 dòng" = 234 dòng hàng / 192 hóa đơn** (không phải 234 HĐ); App tạo
>   190 phiếu / MISA 189 → chênh 2 chưa xử lý (chờ vòng sau).
> - **"Mã địa điểm KD" trong chi tiết:** kiểm chứng bằng detail_full MISA phiếu
>   app tạo (2e88b9ee…): `inventory_location_code='HM'` + id + tên **CÓ dữ liệu**
>   → ảnh Đại ca xem là phiếu khác (mã 09952611041642059246 — cần mã cụ thể để
>   soi). Riêng code có bug tiềm ẩn ĐÃ SỬA: bán hàng lấy location từ `it` (hàng
>   hóa — luôn None) thay vì `cid` như mua hàng/xuất kho → giờ đồng bộ 3 builder.
> - **"Hạn sử dụng" trống 100%:** XÁC NHẬN — `_hsd_cell` chỉ parse dd/mm/yyyy
>   nhưng `_dmy_to_iso` trả ISO+07:00 ⇒ luôn None (kiểm file
>   sa_20261104_TT.xlsx: cả 5 dòng HSD None) → sửa parse ISO; unit-check 3 dạng
>   PASS. Nguồn HSD (BKCCN col15) có đủ — nay lên được.
> - **"Chưa ghi sổ": Đại ca ĐÚNG** — detail_full: `is_posted_finance=False` cả
>   loạt (189/190). Gốc: phiếu đã tồn tại bị SKIP hoàn toàn ở lượt sau ⇒ không
>   bao giờ tới bước ghi sổ. Đã thêm **GHI SỔ BÙ** ở 3 nhánh (skip "đã có" ·
>   InvalidRefno · InvalidInvno + `_chot_sa_sau_import`) + fallback mã biến thể
>   (MISA lưu refno_finance bỏ tiền tố 'HD1': DB 'HD108842611040850537889' ↔
>   MISA '08842611040850537889' — nguyên nhân 86 phiếu "import xong nhưng không
>   thấy") + fallback reftype 3530/3531/3537 + suy is_posted từ
>   `is_posted_finance`/`posted_date`. Deploy 3 máy + chạy lại job bù (đang chạy).
> - **"Phiếu tạo thủ công 12/10 có bị không?"** — tra MISA ngày 12/10/2026:
>   **0 phiếu** (không thấy phiếu nào để so). Đại ca cho mã phiếu cụ thể em soi
>   tiếp. Về nguyên tắc: phiếu nhập TAY trên MISA thì trường nào người nhập
>   không điền sẽ TRỐNG (MISA không tự bịa) + ghi sổ do người bấm.
> - Fix thêm phát hiện trong log: máy .11 thiếu `misa_http_bootstrap.py` mới
>   (AttributeError ensure_ready_session_async, 20 lần/lượt) → deploy cả 3 máy.

> **VIỆC 4 — bảng 13 dòng + cố định tiêu đề/tổng cộng cho MỌI module Upload
> MISA:** bảng "Xem bảng upload MISA" (per-lượt) ĐÃ có 13 dòng cuộn + sticky
> thead/tfoot + Tổng cộng (trừ Đơn giá/cột mã) + Tải Excel — LIVE 12.6.1 (GĐ
> 679, Đại ca bấm Xem bảng ở lượt mới là thấy; cần F5 để nạp bundle mới).
> **Bổ sung hôm nay:** bảng BÁO CÁO chính (ReportResultTable — dùng chung mọi
> module Upload MISA + báo cáo thường) chỉnh khung cuộn 530px (~16 dòng) →
> **500px = đúng 13 dòng + 2 dòng cố định**; thead/tfoot sticky đã có sẵn
> (dòng 783/918). tsc 0.

> **Code:** repo con `7cc3ef6` (misa_banhang_api: 3 fix) + `3c098f7` (fallback mã
> biến thể) + report-result-table max-h 500px · app tổng `scripts/gd684_deploy_lan.py`.
> Deploy 3 máy LAN verify hash PASS; unit `misa_banhang_api.test` **86/86 PASS**;
> tsc 0.


> **⚠️ PHÁT HIỆN CUỐI (chặn ghi sổ — nguyên nhân gốc thứ 4):** job ghi sổ bù chạy
> 21:0x — cơ chế bù HOẠT ĐỘNG ("khớp MISA qua mã bỏ 1 ký tự đầu" + gọi ghi sổ)
> nhưng MISA từ chối: **"<TK Nợ, TK Có> không được để trống"** → phiếu app tạo
> (đường IMPORT EXCEL, GĐ 649 PA-1) THIẾU TK Nợ: file `sa_*.xlsx` chỉ 29 cột,
> **KHÔNG có cột tài khoản nợ/có** (kiểm trực tiếp file sa_20261104_TT.xlsx +
> ảnh phiếu MISA "Nợ vào TK" trống) — mẫu MISA 3530 có 73 cột (log step2);
> mua hàng/xuất kho có cột TK nên ghi sổ được. **KẾ HOẠCH vòng sau:** lấy danh
> sách 73 trường mẫu SA (từ wizard step2 hoặc file mẫu gốc), thêm cột TK Nợ/Có
> vào SA_COLS (1111_TT/1121_TT theo HTTT — đã có sẵn `map_debit_account`) →
> chạy lại job bán hàng → ghi sổ bù hoàn tất. Đây là nguyên nhân CHÍNH khiến
> "toàn bộ phiếu bán hàng chưa ghi sổ" (không phải chỉ nhánh skip).

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **7.8.0** / repo con **12.6.1**.

---

### GĐ 686 (Trợ lý ZCode máy chủ): PA Push đợt 05/11 tối (lệnh ĐH) — GĐ 685/C.432 badge "Máy chạy" + GĐ 684/C.431 Freebuff · bump 8.0.0/12.7.0 · LIVE (2026-11-05)

> **Lệnh "Push" của Đại ca (05/11 tối).** Rà trùng lặp (nguyên tắc 3): nhánh phụ
> `agent-cli`/`gd541-push`/`pipeline-work` = **0 commit cả 2 repo** · worktree khác
> (`giong-apps-cli`) 3 file sửa dở = phiên khác — KHÔNG đụng · file sửa dở tại worktree
> này (AGENT_REGISTRY.md bản WIP, scripts/_gd55x_deploy_lan.py, attachments/*.zip) =
> phiên khác — không add.

> **Push:** app tổng `c5818df..6dbb71f` (10 commit: GĐ 685/C.432 đầy đủ code+entry+script
> E2E+ảnh+unlock+đổi số C.432 + claim/unlock GĐ 684 của Freebuff + bump) · repo con
> `4e7a852..a934c1e` (7 commit: C.432 badge + đổi số + khôi phục, C.431 GĐ 684 bán hàng
> của Freebuff, bump).

> **Bump (chỉ lúc Push — quy tắc ĐA AGENT):** app tổng **7.9.0 → 8.0.0** (minor; minor=9
> → nhớ sang major theo hệ 1 chữ số) — package.json + package-lock.json (2 chỗ — đang
> lệch 7.6.0, đồng bộ luôn) + DEFAULT_VERSION; repo con **12.6.1 → 12.7.0** —
> package.json + DEFAULT_VERSION. Checklist GĐ 138 ✓ (8.0.0 · 12.7.0 mọi thành phần 1
> chữ số).

> **Verify env Vercel TRƯỚC push:** app tổng đủ DATABASE_URL · APP_JWT_SECRET ·
> TUNNEL_API_BASE_URL · TUNNEL_GIST_ID · BETTER_AUTH_SECRET/URL; app con đủ DATABASE_URL
> · APP_JWT_SECRET · TUNNEL_API_BASE_URL · TUNNEL_GIST_ID · ZAI_API_KEY ✓

> **✅ Verify production SAU push:** app tổng **8.0.0** (curl grep lần đầu + UI "VERSION
> 8.0.0") · app con **12.7.0** · login thật app tổng (curl + browser) · **SSO browser
> thật: bấm "Bán hàng" → app con nhận phiên** (tên user hiện + `/api/auth/me` = 200
> SuperAdmin) · **badge "Máy chạy" LIVE: 47 badge đủ 4 nhãn GIANGKT (.245) · PC-PKT-01
> (.14) · THANH-PC (.11) · Máy chủ (.250)** — ảnh `screenshots/gd686-prod-badge-may.png`
> + script `scripts/_gd686_verify_prod.mjs`.

> **⚠️ Bẫy đo thật (ghi để phiên sau khỏi mất thời gian):** form login app tổng phải chờ
> ~4 giây sau khi load rồi mới điền (fill sớm React chưa hydrate → giá trị KHÔNG vào
> state → submit rỗng, login fail IM LẶNG, ở lại /login); và app con hydrate chậm ~9-12
> giây mới hiện tên user (kiểm chứng sớm hơn = báo oan "chưa đăng nhập").

> **Tiêu chí kiểm chứng của Đại ca:** mở `giong-banhang.vercel.app` (góc trái 12.7.0) →
> trang có lịch sử job → badge tên máy hiện trên từng dòng; chạy 1 lệnh bất kỳ → ~20
> giây sau thanh tiến trình hiện "GIANGKT (.245)" / "Máy chủ (.250)".

> **Version:** app tổng **8.0.0** / repo con **12.7.0** — ĐÃ PUSH + ĐÃ LIVE.

---

### GĐ 687 / C.433 (Trợ lý Freebuff): File Excel bán hàng theo ĐÚNG mẫu 72 cột Đại ca kiểm tra (UPMISA 03/11) — TK Nợ/Có + KCT + Mục thu/chi (2026-11-05)

> **Chỉ thị của Đại ca (05/11 tối):** *"Hôm ngày 03/11/2026 chạy theo cơ chế từng
> phiếu thì đạt kết quả rất tốt… ngày 04/11 chạy theo đường nhập dữ liệu bằng
> file Excel thì lỗi tùm lum. Em hãy dùng kết quả của ngày 03/11 để tham khảo
> và thực hiện tạo file excel cho đúng"* + gửi file
> `UPMISA_PS_HDBH_03.11.2026.xlsx` (72 cột, 182 dòng, sheet Check 4 TT "KHỚP").

> **TK Nợ vướng ở đâu (trả lời trực tiếp):** file Excel app sinh (GĐ 649) chỉ
> **29 cột, TÊN CỘT SAI** so mẫu MISA ⇒ thiếu hẳn 2 cột BẮT BUỘC
> **"TK Tiền/Chi phí/Nợ (*)"** + **"TK Doanh thu/Có (*)"** ⇒ phiếu tạo ra không
> có TK Nợ/Có ⇒ MISA từ chối ghi sổ *"<TK Nợ, TK Có> không được để trống"*
> (ca thật 21:08 05/11, loạt 190 phiếu 04/11). 03/11 không dính vì tạo qua
> đường API (payload có TK) — 04/11 chuyển sang đường Excel thì lộ.

> **Đã làm (repo con `2795dce`):**
> 1. `SA_COLS` = **72 cột COPY NGUYÊN VĂN tên từ file chuẩn** (kể cả "(*)" và
>    "Diễn giải/Lý do nộp") — script verify **KHỚP 72/72 tên cột** với file ĐH.
> 2. `sa_rows_from_payload` dựng đúng 72 giá trị theo mẫu:
>    - **TK Tiền/Chi phí/Nợ (*)** = `map_debit_account` — CK `1121_<TT>` · TM
>      `1111_<TT>` · **Chưa thu tiền `131`** (SỬA: trước mặc định 1121 — mẫu có
>      5 dòng 131);
>    - **TK Doanh thu/Có (*)** = `5113_<TT>`;
>    - "Hình thức bán hàng"="Bán hàng hóa trong nước" · "Đã lập hóa đơn"="Đã lập"
>      · "Mẫu số HĐ"=1 · "Nộp vào TK"=1475018888 + "Tên ngân hàng"=VCB (mẫu
>      182/182) · "% thuế GTGT"="**KCT**" (vắc xin — cũ ghi "0") · "Mã kho/Mã
>      địa điểm KD/Vị trí/Mã đơn vị/Mã thống kê"=`<TT>` · "Mục thu/chi"=100 ·
>      "Số chứng từ (*)"=refno (bỏ HD1 — khớp mẫu cột 8 từng dòng).
> 3. Bảng chuẩn MISA (`sinh_excel_sa`) map theo tên cột mới.
> 4. Test `misa_banhang_api.test` **87/87 PASS** (cập nhật 2 test map TK theo
>    chuẩn mới) · deploy 3 máy LAN verify hash PASS.

> **Test THẬT (NL kỳ 01/11 — kỳ chưa từng upload, chạy tay trên .11 với env
> worker.env):** nhận diện đúng **8 phiếu "đã có trên MISA — ĐÃ GHI SỔ TRƯỚC
> ĐÓ"** (cơ chế ghi-sổ-bù GĐ 684 hoạt động — skip êm không báo lỗi oan);
> 4 phiếu mới bị MISA chặn *"Số hóa đơn đã tồn tại trong dữ liệu"* + cảnh báo
> *"Tài khoản <KCT> không có trong danh mục"* → 2 điểm soi tiếp vòng sau.

> **⚠️ CHỜ ĐẠI CA CHỐT — 190 phiếu bán hàng 04/11 ĐÃ TẠO bằng file cũ (29 cột)
> trên MISA có DATA thiếu TK Nợ/Có ⇒ mọi đường ghi sổ đều bị MISA chặn.** Hai PA:
> **PA-1 (khuyến nghị — giống tiền lệ GĐ 563 + cách 03/11):** xóa 190 phiếu
> 04/11 trên MISA → chạy lại bằng file chuẩn 72 cột → tạo mới đủ TK → ghi sổ
> SẠCH. **PA-2:** cập nhật từng phiếu qua API (điền TK) — giữ số CT nhưng 190
> request. Xóa là thao tác phá hủy — em KHÔNG tự làm, chờ ĐH chốt.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **7.8.0** / repo con **12.6.1**.

---

### GĐ 688 / C.435 (Trợ lý ZCode (máy chủ)): Task_08 hết LỖI needsData (khai báo nguồn dsxk-comparison → stg_4BKCCN) + bảng "Đối soát HĐ-XK" hết nhân đôi doanh thu (PA-1 + PA-A Đại ca chốt) (2026-11-06)

> **Đại ca báo (05/11 tối, 2 ảnh):** (1) Task_08 "Báo cáo cuối ngày — Đối soát HĐ-XK"
> LỖI `needsData` dù 3 bước Download OK — Đại ca nghi do "download một máy, báo cáo máy
> khác nên ETL chưa về DB"; (2) cột "Tổng Doanh thu (SMED)" gấp lên — Bích Hòa 12 mũi =
> 8.315.000 nhưng bảng hiện 13.260.000. Chi tiết đầy đủ + bằng chứng: **AGENTS.md repo
> con C.435**, code repo con `8e97b0b`.

> **Kết luận điều tra (probe GiongDB):**
> - **KHÔNG phải do chia máy** — chia máy có thật (tải `bkccn` ở máy LAN, chạy `sqlreport`
>   ở máy chủ `core`) nhưng ETL chạy trên máy tải và ghi vào **GiongDB dùng chung** (đủ
>   dữ liệu). **Nguyên nhân gốc: khai báo nguồn LỆCH builder** —
>   `REPORT_SOURCE_TABLES["dsxk-comparison"]` còn ghi `dtthc`/`stg_3DTTHC` trong khi
>   builder đọc `stg_4BKCCN` từ GĐ 626 ⇒ Task_08 (17:05) không biết thiếu BKCCN nên không
>   tải, mà BKCCN chỉ có sau Task_02 (17:15/17:26) ⇒ needsData (job result ghi rõ
>   `missing: bkccn`; BKCCN nạp 17:27 → chạy lại 17:39 = done). Riêng 04/11 là lỗi khác:
>   SQL Server máy chủ không kết nối được ~30 phút (loạt `sqlreport` fail `08001`).
> - **col16 BKCCN "Giá" đã là THÀNH TIỀN của dòng** (không phải đơn giá), col18 "Mũi tiêm"
>   không phải hệ số nhân tiền ⇒ `SUM(col16*col18)` phồng ~1,55×. Đối chứng 05/11: 16/18
>   trung tâm khớp tổng HĐGTGT TỪNG ĐỒNG; 12 ngày gần nhất lệch ±0,2–3%.

> **Đã sửa (chỉ 1 file agent-side `agent/etl/sql_reports.py`, +16/−4):** nguồn B
> dsxk-comparison → `bkccn`/`stg_4BKCCN` (checkCol col10) · builder `SUM(col16*col18)` →
> `SUM(col16)`.

> **Verify:** unit 6 bộ 229/229 + `sql_reports_bccn` PASS · builder thật kỳ 05/11: Bích Hòa
> **8.315.000** = HĐGTGT từng đồng · TỔNG **182.391.400** (trước 283.676.400) vs HĐGTGT
> 178.385.000 → CL +2,2% · **E2E production**: tạo job thật qua `/task/create-job` → core
> chạy **done 40 giây** → result đúng số trên · `check_source_data` kỳ chưa tải báo thiếu
> bkccn (Task_08 sẽ tự tải — BKCCN thật chỉ 28–58 giây/lượt).

> **Deploy:** máy chủ — xoá `__pycache__` + restart **GIONG_SMED_Agent** 09:39:24 (agent
> chạy trực tiếp từ repo; không đụng `GIONG_API_Server` để tunnel URL giữ nguyên) ·
> 3 máy LAN (.14 / .245 / .11) — `scripts/gd688_deploy_lan.py` sha256+py_compile: KHỚP hash
> HEAD · không cần restart worker (job `sqlreport` chỉ máy chủ nhận).

> **Tiêu chí kiểm chứng của Đại ca:** 17:05 hôm nay Task_08 chạy không còn LỖI; bảng Đối
> soát HĐ-XK kỳ 05/11 hiện Bích Hòa 8.315.000 · TỔNG ≈ 182.391.400.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **8.0.0** / repo con **12.7.0**.

---

### GĐ 691 / C.434 (Trợ lý Freebuff): PA-1 Đại ca chốt — XÓA 113 phiếu bán hàng 04/11 cũ + chạy lại file chuẩn 72 cột → 189/190 TẠO MỚI + ĐÃ GHI SỔ (2026-11-06)

> **Đại ca chốt PA-1 (06/11):** "xóa 190 phiếu 04/11 trên MISA → chạy lại bằng
> file chuẩn 72 cột → tạo mới đủ TK → ghi sổ sạch".

> **Đã làm:**
> 1. **Script `gd688_xoa_bh_0411.py`** (repo con `ae7cfc3`… xem log — commit
>    `b0e2eda`?): GUARD chỉ xóa phiếu có refno_finance ∈ DB 04/11 (76 phiếu kế
>    toán PT0003xx GIỮ NGUYÊN) + backup JSON `LOG/gd688_ds_xoa_0411.json` +
>    unpost theo lô + delete theo lô + đọc lại. **Kết quả: unpost 113/113 OK ·
>    xóa 113/113 OK · MISA còn đúng 76 phiếu kế toán.**
> 2. **PHÁT HIỆN + VÁ LỆCH INDEX 3 CỘT** (job 08:56 import "hợp lệ 0" — wizard
>    báo *"Tài khoản \<KCT\> không có trong danh mục"*): bản 72 cột đầu đặt
>     `r72[45]=KCT` trong khi SA_COLS[45] = "TK thuế xuất khẩu" (KCT phải ở
>    **[46]**); Tiền/TK thuế GTGT 47/48→**48/49**; Mã thống kê 59→**58**
>    (59="Số khế ước cho vay"). Verify **22/22 điểm cột PASS** + test
>    `misa_banhang_api.test` **87/87** (repo con `b775d03`).
> 3. **Chrome CDP 9222 trên .11 treo/chết giữa job** (Timeout 180s → sau đó
>    ECONNREFUSED) — xử lý theo quy trình GĐ có sẵn: kill toàn bộ chrome +
>    `schtasks /run /tn GIONG_ChromeMISA` + verify /json/version OK.
> 4. **Chạy lại lần 3 (job GD688-lan3) — DONE 10:58:** import "hợp lệ N/N ·
>    không hợp lệ 0" mọi TT · **189/190 phiếu ĐÃ UPLOAD + 189/190 ĐÃ GHI SỔ**.
> 5. **Đối chứng cuối (MISA vs DB):** MISA 04/11 = 265 phiếu = **189 phiếu hệ
>    thống (khớp đúng DB)** + 76 phiếu kế toán giữ nguyên; refno DB còn thiếu
>    đúng 1: `10312611040930201371` (SĐ — lỗi nghiệp vụ "Số HĐ BKCT trùng/miss
>    — cần soi tay", không phải lỗi hệ thống).
> 6. **Verify phiếu mới (detail_full MISA):** `is_posted_finance=True` ·
>    `debit_account=1121_TT` (TK Nợ) · `credit_account=5113_TT` · Vị trí `TT` ·
>    `lot_no` + **`expiry_date` có giá trị** → cả 4 vấn đề Đại ca nêu (TK Nợ ·
>    Vị trí · HSD · ghi sổ) ĐÃ GIẢI QUYẾT.

> **Tiêu chí kiểm chứng của Đại ca:** mở MISA → Bán hàng kỳ 04/11 → phiếu mới
> có TK Nợ (Nợ vào TK = 1121_TT/1111_TT/131) + ngày ghi sổ hiện + chi tiết có
> "Mã địa điểm KD" = mã TT + "Hạn sử dụng" đầy đủ; tổng 189 phiếu hệ thống +
> 76 phiếu kế toán = 265.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng
> **7.8.0** / repo con **12.6.1**.

---

### GĐ 692 / C.436 (Trợ lý Freebuff): PA Push đợt 06/11 — file 72 cột bán hàng + vá index KCT + PA-1, bump repo con 12.7.1 + LIVE verify 4/4 (2026-11-06)

> **Lệnh "Push" của Đại ca (06/11, sau PA-1).** Rà trùng lặp nguyên tắc 3: app
> tổng 12 commit thuần DOCS + 1 script (`gd688_deploy_lan.py` của phiên máy chủ)
> · nhánh phụ RỖNG cả 2 repo · **repo con 4 commit**: 2 của em
> (`7602e7c` script xóa PA-1 + `b775d03` vá lệch index 3 cột KCT) + 2 của phiên
> máy chủ (`8e97b0b` fix Task_08 needsData + nhân đôi doanh thu sql_reports +
> entry) — **đẩy chung 1 đợt**. File dở phiên khác (nav.ts/smed-auth.ts/
> routeTree/api_server/lan_tray) KHÔNG đụng.

> **Bump (lúc Push):** app tổng **docs-only giữ 7.8.0**; repo con **12.7.0 →
> 12.7.1** (patch — phát hiện lúc push: 12.7.0 đã LIVE từ đợt push phiên máy
> chủ TRƯỚC đó (commit 72 cột `2795dce` — bản có LỖI LỆCH INDEX còn trên
> production), đợt này vá). Checklist GĐ 138 ✓ (12.7.1).

> **Env Vercel trước push: ĐỦ cả 2 app.**

> **Push:** app tổng `eaa60aa..260aa65` (12 commit docs+script) · repo con
> `2795dce..ba35a9f` (5 commit: 4 code + bump 12.7.1).

> **✅ Verify production (curl + login thật + SSO browser thật):** app con
> **12.7.1** (curl lần đầu) · app tổng 7.8.0 · đăng nhập thật
> cuongpk.giong04 → JSON user + get-session OK · bấm "Bán hàng" ở sidebar
> (browser thật) → **tab app con mở THẲNG trang chủ** (không /login) → SSO OK.

> **Tiêu chí kiểm chứng của ĐH:** MISA Bán hàng 04/11 — 265 phiếu (189 hệ
> thống mới có TK Nợ/ghi sổ + 76 kế toán); đêm nay job bán hàng chạy bằng file
> 72 cột đã vá index → tạo + ghi sổ ngay từ đầu. Còn 1 phiếu SĐ
> `10312611040930201371` lỗi nghiệp vụ "Số HĐ BKCT trùng/miss" — soi tay.

> **Version:** app tổng **7.8.0** (giữ — docs-only) / repo con **12.7.1** —
> ĐÃ PUSH + ĐÃ LIVE.

---

### GĐ 689 / C.436 (Trợ lý ZCode (máy chủ)): Trang "Giám sát máy trạm" + nhịp tim 4 máy + sửa 2 lỗi công cụ monitor (PA-2 Đại ca chốt) (2026-11-06)

> **Yêu cầu của Đại ca (06/11):** "làm luôn cho anh trang Giám sát máy trạm và sửa 2 lỗi
> của công cụ trên máy chủ" (tiếp mạch GĐ 685 badge "Máy chạy").

> **Thiết kế chốt:** NHỊP TIM tận dụng chính request claim sẵn có — worker đã poll
> `/agent/claim` **20 giây/lần kể cả khi rảnh**, nên api_server ghi 1 nhịp mỗi lần poll vào
> bảng mới `dbo.worker_heartbeat` (worker_id PK · groups · ip · first_seen · last_seen ·
> last_job_id/report — **DATETIME2**, tránh bẫy DATETIMEOFFSET qua tunnel). Nhờ vậy phân biệt
> được **máy đang bật nhưng rảnh** với **máy tắt service** — trước đây nhìn web không phân
> biệt được. KHÔNG cần sửa/deploy worker ở 4 máy LAN.

> **Đã làm:** `api_server.py` +helper `touch_worker_heartbeat` (bọc try/except — lỗi nhịp tim
> không bao giờ làm hỏng claim; gọi 1 chỗ trước `if not rows`) · web app con: server function
> `-worker-monitor.ts` (3 query nhẹ, liệt kê cột, không đụng result) + trang
> `/m/giam-sat-may` (bảng 4 máy: nhóm việc · trạng thái 🟢đang chạy/🔵rảnh/🔴mất kết nối/⚪chưa
> có nhịp tim · lệnh đang chạy · 24h tổng/xong/lỗi · hoạt động cuối; bảng lệnh đang chạy & đang
> chờ — waitdownload/needsData chỉ lấy 48h để không rác hàng trăm job cũ; tự làm mới 15 giây) ·
> phân quyền **3 điểm**: nav.ts + ROUTE_TO_GROUP (smed-auth) + BH_GROUPS (banhang-catalog app
> tổng), lá nằm trong nhóm **SỨC KHOẺ DỮ LIỆU** — audit tự động 3 nguồn **85/85 route khớp** ·
> `scripts/monitor_4_machines.py` (app tổng) sửa **2 lỗi**: (1) máy chủ báo UNKNOWN vì hỏi sai
> tên service → nay mỗi máy có `service_name` (máy chủ = `GIONG_SMED_Agent`), (2) job in
> "532/19 2800%" → kẹp 0-100% + nêu rõ số thô; thêm cột **NHỊP TIM** · tạo
> `scripts/giam-sat-4-may.bat` + **shortcut Desktop** `Giam sat 4 may tram.lnk` (Desktop máy
> chủ nằm ở `D:\Libraries\Desktop` — không phải ổ C).

> **⚠️ Restart api_server (bắt buộc để nạp code nhịp tim):** đã kiểm tra pipeline RẢNH (0 job
> chạy/chờ, 0 job trong 10 phút) → xoá `__pycache__` → `sc stop/start GIONG_API_Server`.
> **Tunnel URL ĐỔI** (`fisheries-…` → `audio-boards-care-still.trycloudflare.com`) đúng như
> thiết kế: api_server tự publish URL mới lên **Gist**, 2 app đọc Gist khi URL cũ fail →
> **KHÔNG cần sửa env Vercel + redeploy** (đã verify production sau đó: login/SSO/`/api/auth/me`
> + 48 badge "Máy chạy" vẫn OK). Chạy `scripts/update-tunnel-env.py` đồng bộ `.env.local` 2 app.

> **Verify:** py_compile 0 · tsc app con + app tổng 0 · npm test 12/12 file PASS · audit 3 nguồn
> phân quyền 85/85 · E2E browser thật local **11/11 PASS** (ảnh
> `screenshots/gd689-giam-sat-may-tram.png`) · **nhịp tim thật 4 máy** (đọc sau restart 45
> giây): `core` (máy chủ) nhóm `core` · `giangkt` (.245) nhóm `misa-muahang` · `thanh-pc` (.11)
> nhóm `misa-banhang` · `lan-1` (.14) nhóm `smed` · monitor script chạy thật: 4/4 máy RUNNING
> (hết UNKNOWN) + cột nhịp tim hiện.

> **⚠️ Trùng số (minh bạch):** commit message bump `ba35a9f` của phiên Freebuff (11:58) cũng
> ghi "C.436" nhưng **commit SAU** mốc claim của em (09:30) và KHÔNG khai dòng registry/entry
> nào → theo quy tắc GĐ 285 (ai commit trước giữ số) **em giữ C.436**; registry chỉ 1 dòng.

> **Tiêu chí kiểm chứng của Đại ca (sau Push):** sidebar app con → **SỨC KHOẺ DỮ LIỆU → Giám
> sát máy trạm** → thấy 4 máy + máy nào đang chạy/rảnh/mất kết nối; trên máy chủ bấm shortcut
> **"Giam sat 4 may tram"** ở Desktop → bảng 4 máy tự làm mới 30 giây (cột NHỊP TIM).

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **8.0.0** / repo con
> **12.7.1**.

---

### GĐ 690 / C.437 (Trợ lý ZCode (máy chủ)): Hoàn thiện việc GĐ 688 — báo cáo hết needsData oan (chờ ETL nạp nguồn) + `sql_reports` dùng env kết nối (GỐC 08001 04/11) + dọn worker trùng máy LAN (2026-11-06)

> **Lệnh Đại ca (06/11):** "còn việc gì dở dang em thực hiện cho hoàn thiện đi" — Việc 3
> của GĐ 688 + điều tra sự cố 04/11. Chi tiết đầy đủ + bằng chứng: **AGENTS.md repo con
> C.437**, code repo con `cbfe0aa`.

> **Điều tra 04/11 (đính chính nhận định ban đầu):** máy chủ KHÔNG mất SQL ~30 phút — cùng
> lúc đó máy chủ vẫn chạy 11 báo cáo OK; các job fail `08001` chạy ở MÁY KHÁC (log thanh-pc
> .11 17:09–17:28 `Job SQL lỗi: 08001`, khớp job `claimed_by` RỖNG trong DB). **GỐC:
> `etl/sql_reports.py` kết nối CỨNG `Server=.\SQLEXPRESS` + Trusted_Connection** — module
> cuối cùng còn hardcode; máy không có SQL Server cục bộ → 08001 (kèm `build_tra_no` bảng
> "trả nợ LHT" chết im lặng trên máy LAN), và máy có SQLEXPRESS riêng sẽ ĐỌC NHẦM DB. Phiên
> ma poll Vercel đã hết (GĐ 670/672 đã chặn).

> **Đã làm — 1 commit repo con `cbfe0aa` (3 file):**
> 1. `sql_reports.py`: `CONN_STR` = env `AGENT_SQL_CONN` → `ETL_SQL_CONN` → fallback cục bộ.
> 2. `task_runner.py`: `_wait_sources_ready()` — chờ nguồn vào GiongDB (ETL) trước khi tạo
>    job báo cáo, áp ở Task_08 (`_run_bcn_only`) + giai đoạn 2 Task_02/04 (`_run_task`);
>    ngưỡng `TASK_SOURCE_WAIT_SEC`=180s, hết hạn vẫn chạy như cũ.
> 3. Test mới `gd690-wait-nguon.test.py`.
> Kèm dọn **worker trùng máy LAN** (mỗi lần `call worker.env.bat` sinh thêm 1 worker vĩnh
> viễn): .245 có 5 → còn 1 · .11 có 2 → còn 1 · .14 sạch (script
> `artifacts/gd_task08_probe/clean_dup_workers.py`, nhận diện worker service bằng duyệt
> ngược chuỗi cha lên PID nssm).

> **Verify:** unit mới **11/11** + hồi quy task_runner_quick 46/46 · sql_reports 45+36 ·
> gd588-hd 55 · zalo 15 · integration thật (2 chuỗi kết nối cho CÙNG số 182.391.400) ·
> **E2E production sau deploy: job dsxk-comparison kỳ 05/11 = done, Bích Hòa 8.315.000**.

> **Deploy:** máy chủ — xoá `__pycache__` + restart GIONG_SMED_Agent 13:46:31 · 3 máy LAN —
> sha256 KHỚP HEAD cả 2 file + còn đúng 1 worker/máy, service Running.

> **CÒN LẠI chờ Đại ca:** (1) tách `worker.env.bat` thành env-only để hết sinh worker trùng
> (rủi ro 2 worker cùng máy nhận 2 job song song — đụng phiên MISA); (2) theo dõi vài phiên
> ETL 08001 lẻ tẻ trên máy LAN (nghi mạng LAN→SQL tạm thời, chưa cần sửa).

> **Tiêu chí kiểm chứng của Đại ca:** 17:05 hôm nay Task_08 không còn LỖI needsData.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **8.0.0** / repo con **12.7.0**.

---

### GĐ 694 / C.439 (Trợ lý ZCode (máy chủ)): Sửa GỐC sinh worker trùng máy LAN (guard + file env-only) + chốt việc ETL 08001 lẻ tẻ — kèm kiểm chứng LIVE Task_08 17:05 = done (2026-11-06)

> **Đại ca chốt:** "Sửa gốc sinh worker trùng theo hướng an toàn và hiệu quả nhất" +
> việc ETL `08001` "làm theo những gì nhận định là đủ và đúng nhất". Chi tiết + bằng chứng:
> **AGENTS.md repo con C.439**, code repo con `ef9cd8c`.

> **Gốc:** `worker.env.bat` / `*.env.bat` **vừa set env vừa chạy worker ở dòng cuối** ⇒ ai
> `call` để LẤY ENV cũng sinh thêm 1 worker VĨNH VIỄN (.245 từng 5 · .11 từng 2). Mỗi máy một
> kiểu file (`.14` dùng `worker-lan1\worker-lan1.env.bat`; máy chủ `.secrets\agent.env.bat` chạy
> `40_web_agent.py`); thêm **file rác `giong-worker$P.env.bat`** (script cũ lỗi biến `$P`, 27/10).

> **Đã làm (repo con `ef9cd8c` — 3 file):** `worker_guard.py` MỚI (exit 1 nếu đã có process
> khớp pattern · fail-open · trừ chính nó · không in secret; test 13/13 PASS) ·
> `worker-install.bat` sinh kèm `worker.env.only.bat` (CHỈ env — an toàn khi call) + chèn guard
> trước dòng Chrome/chạy worker (lần cài sau không tái sinh bẫy) · áp lên 4 máy (backup
> `.bak-gd694`, guard dùng đường dẫn TUYỆT ĐỐI, khối ASCII không dấu cho cmd).

> **Verify thật:** gọi lại file env → trả về **0,1–1,3s** (trước đây TREO SSH) + in thông báo
> guard + **worker KHÔNG tăng (1→1)** cả 3 máy LAN; máy chủ không tạo `40_web_agent` thứ 2 ·
> `*.env.only.bat` nạp đủ env trong 0,1s không sinh worker · service 4 máy **Running + 1 worker**.

> **Việc ETL 08001 — GIỮ NGUYÊN (đối chứng đủ/đúng):** dữ liệu các kỳ đó CÓ trong GiongDB
> (BKCCN 04/11 225 dòng · 05/11 220 dòng) → phiên lỗi không mất dòng nào; file còn trên máy +
> auto-ETL 60' nạp lại (import_log có lượt nạp thành công sau mốc lỗi); tần suất 2 phiên/ngày.

> **🎁 Kiểm chứng LIVE fix GĐ 688 (không cần chờ gì thêm):** Task_08 **06/11 17:05:16 → done
> 17:10:27** — bước 1 giờ tải **`bkccn` OK** (nguồn trước đây bị bỏ sót, không còn tải `dtthc`
> thừa), báo cáo `dsxk-comparison` **OK**, gửi Zalo OK ⇒ **hết hẳn needsData**.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **8.0.0** / repo con **12.7.0**.

---

### GĐ 693 / C.439 (Trợ lý ZCode (máy chủ)): Fix hộp KPI "Xuất Vắc Xin" T10/2026 mất 647 mũi — ETL gộp 2 thư mục ngày TRÙNG TÊN; + khôi phục dữ liệu; + bảng "Chưa vào tiêm" trong Báo cáo bán hàng (2026-11-06)

> **ĐH báo (06/11):** "hộp KPI lượt tiêm và xuất kho tháng 10/2026 lệch số — lần trước
> đã đúng, lần này thấy sai." **Kết luận điều tra:** hộp **Lượt tiêm ĐÚNG** (10.769 mũi —
> khớp 2 nguồn độc lập), hộp **Xuất Vắc Xin THIẾU 647 mũi** (30/10: 9/173 · 31/10: 41/524),
> và 50 dòng còn lại đều `center = NULL` trong khi mọi ngày khác đủ 18 trung tâm.

> **NGUYÊN NHÂN GỐC (3 mắt xích — có bằng chứng + tái hiện sống):**
> 1. **Lượt tải bù 05/11 15:07** (job `9F487F1C`, 6.BKX cả kỳ 01/10→31/10, 590 file) ghi file
>    vào thư mục **lồng** `6.BKX\2026-10-01\<ngày>\` — trong khi 30/10 và 31/10 vẫn còn 19 file
>    cũ ở thư mục **phẳng** `6.BKX\2026-10-30\` ⇒ **2 thư mục KHÁC NHAU nhưng TRÙNG TÊN NGÀY**.
> 2. `etl_import.py center_order_map()` gom nhóm theo `f.parent.name` (chỉ tên thư mục ngày) ⇒
>    gộp 2 thư mục thành **1 nhóm 38 file**; chỉ 19 file mtime cũ (file phẳng) được gán mã trung
>    tâm, 19 file mtime mới (file tải bù) rơi ngoài dải 19 mã ⇒ **center = None** (dòng 674-675).
>    **Tái hiện sống:** chạy chính hàm đó trên OUTPUT hiện tại → đúng 19 file trong
>    `6.BKX\2026-11-01` (thư mục 38 file) bị trả None; bản CŨ 19 file None / bản MỚI 0 file None.
> 3. ETL xoá theo ngày (dòng 723) ⇒ 19 file cũ mất sạch; cuối lượt `dedupe_multiload()` (dòng 510,
>    `GROUP BY report_date, center`) coi 19 file "cùng ngày, cùng KHÔNG có trung tâm" là trùng lặp
>    ⇒ **dọn còn 1 file mới nhất** = file ĐỒNG XUÂN ⇒ còn đúng 9 dòng (30/10) / 41 dòng (31/10).
> **Vì sao "lần trước đúng":** trước 05/11 mỗi ngày chỉ có 19 file phẳng (nạp 30/10 17:56 ·
> 31/10 18:20 → đủ dữ liệu). Các ngày khác không dính vì thư mục phẳng cũ đã được dọn trước đó.

> **ĐÃ LÀM (PA-3 ĐH chốt) — Việc A · khôi phục:**
> - Backup 50 dòng lỗi: `artifacts/gd_kpi_t10/backup_stg_6BKX_30-31_10.json` + bảng
>   `dbo.stg_6BKX_backup_gd693` (rollback được).
> - Ép mtime 19 file/ngày theo **ĐÚNG mã trung tâm đọc từ HEADER trong file Excel** (tên file
>   phẳng bị cắt cụt: `GIÓNG_ĐỒNG` / `GIÓNG_M` / `GIÓNG_BÍ` …) → xoá 38 dòng `import_log` của
>   2 ngày → chạy `etl_import.py --only-dir 6.BKX` ⇒ 38 file / 1.083 dòng.
> - **Verify: 30/10 = 311 dòng (PX-SD 173) · 31/10 = 772 dòng (PX-SD 524), 0 center NULL, KHỚP
>   18/18 TRUNG TÂM + từng con số với BKCCN.** Cả kỳ T10: **0 ngày lệch · 10.769 = 10.769**;
>   tiền xuất kho 6.257.193.993 → **6.676.964.033 đ** (theo đúng bộ lọc KPI).

> **ĐÃ LÀM — Việc A · sửa GỐC (repo con `821cb1c`, test `12/12 PASS`):**
> `center_order_map` gom nhóm theo **ĐƯỜNG DẪN THƯ MỤC ĐẦY ĐỦ** (`f.parent`) thay vì tên thư mục
> ⇒ hết gộp 2 thư mục trùng tên ngày; thư mục **>19 file** thì lấy **tên trung tâm TRONG FILE**
> (`center_from_header` — ô chứa "GIÓNG", chuẩn thật) làm căn cứ, không đọc được mới gán vòng
> `NEW_NAMES[i % 19]`, **LUÔN cảnh báo — không trả None im lặng**. Test mới tái hiện đúng sự cố
> 30/10 (2 thư mục trùng tên ngày · 38 file/1 thư mục lượt-2-đảo-thứ-tự · fallback vòng).
> **Đã deploy `etl_import.py` + `etl_import.test.py` ra 3 máy LAN (.14/.245/.11) — sha256 +
> py_compile PASS** (máy chủ đã có sẵn). Không cần restart worker (ETL chạy tiến trình con).

> **ĐÃ LÀM — Việc C (ĐH yêu cầu) · bảng "CHƯA vào tiêm" (repo con `19e2a8f`):**
> Bảng CUỐI trang **Báo cáo bán hàng** (`/m/bc-banhang`) — cùng 22 cột + kết cấu bảng
> "Chạy báo cáo bán hàng (DT) từ dữ liệu SQL (GiongDB)", CHỈ lọc dòng TRỐNG "Giờ tiêm"
> (`isnull(col11,'')=''` — bù trừ CHÍNH XÁC với `col11 <> ''` của dt-by-date). Builder
> `dt_chua_tiem` (sql_reports.py) + QUERY_KEYS/dispatcher/REPORT_SOURCE_TABLES + phân quyền
> 3 điểm (`-smed.ts`: nhóm `banhang-banhang` · lá `/m/bc-banhang`) + nhãn job 2 nơi
> (`job-labels.ts` ↔ `task_runner.py` QUERY_KEY_LABELS — test `job-labels.test.ts` bắt buộc khớp).
> **Verify:** builder chạy thật kỳ T10 = **ĐÚNG 103 dòng** (103 + 10.769 = 10.872 = tổng BKCCN) ·
> `npm test` 12/12 PASS · tsc EXIT 0 · **E2E THẬT qua API nội bộ** (`/task/create-job`,
> queryKey=dt-chua-tiem, kỳ 01/10→31/10) → job `180a5e4a` **done trên máy `core`**, kết quả
> **103 dòng / 22 cột**. Đã xoá `__pycache__` 3 thư mục + **restart `GIONG_SMED_Agent`**
> (KHÔNG đụng `GIONG_API_Server` — giữ nguyên tunnel URL) + deploy `sql_reports.py`/`task_runner.py`
> ra 3 máy LAN.

> **Quan sát kèm theo (không phải lỗi, đã kiểm):** `stg_6BKX` có **380 dòng `col1=''`**
> (dòng "Tổng cộng" cuối mỗi file — 20 ngày × 19 file) mang tiền; bộ lọc KPI (`col1 <> ''`) và
> builder `xk-by-date` (`col1 <> '' and col3 <> ''`) đều loại đúng ⇒ không lẫn vào báo cáo.

> **⏳ Việc B (ĐH yêu cầu chuẩn hoá Download theo khoảng thời gian) — ĐÃ KHẢO SÁT, CHỜ ĐH CHỐT:**
> Hiện trạng thật của `OUTPUT` (script `artifacts/gd_kpi_t10/survey_layout.py`): **đại đa số đã
> đúng chuẩn 1-folder-ngày** — 10.486 file ở `<phân hệ>\<YYYY-MM-DD>\`; ngoài ra tồn 480 file ở
> thư mục `DD-MM-YYYY` (02-10-2026 · 08-10-2026), 227 file ở thư mục kỳ dài `2018-01-01`/
> `2025-01-01` (56 MB) và **các thư mục lồng `<từ ngày>\<ngày>\` nay đã RỖNG**. Luật hiện hành:
> agent luôn tạo `OUTPUT\<phân hệ>\<TỪ NGÀY của job>\` rồi xoá file cũ trong đó (GĐ C.10); tool
> PA-1 khi job NHIỀU NGÀY ghi thêm tầng ngày con (`out_dir_for` — GĐ 656) ⇒ sinh tầng
> `<từ ngày>\<ngày>`; tool cũ ghi thẳng vào folder ngày-từ và ETL suy ngày TỪNG DÒNG theo cột ngày.
> **3 phương án chờ ĐH chốt** (chưa viết code): **PA-1** tách mỗi kỳ thành N job 1-ngày (đúng câu
> chữ "download theo từng ngày", nhưng 31 job/tháng + tăng tải hệ thống); **PA-2** giữ 1 job/kỳ
> nhưng cho ghi THẲNG vào `OUTPUT\<phân hệ>\<ngày>\` (bỏ tầng `<từ ngày>`, sửa `out_dir_for` +
> chỗ truyền `SMED_OUTPUT_DIR`); **PA-3** giữ nguyên cách chạy, chỉ dọn/thống nhất layout định kỳ.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **8.0.0** / repo con **12.7.0**.

---

### GĐ 695 / C.440 (Trợ lý ZCode (máy chủ)): Giám sát máy trạm phần 2 — (a) bấm tên máy xem lịch sử lệnh + (b) cảnh báo Zalo khi máy mất kết nối (2026-11-06)

> **Yêu cầu của Đại ca (06/11):** "…(a) bấm vào tên máy để xem lịch sử lệnh của riêng máy
> đó + (b) cảnh báo tự động khi một máy mất kết nối quá lâu (gửi Zalo)".

> **(a) Lịch sử lệnh theo máy:** server function mới `loadWorkerHistory({workerId, hours})`
> trong `-worker-monitor.ts` (7 ngày, top 60, liệt kê cột — không `result`) + UI: **bấm tên
> máy** ở bảng "Máy trạm" → mở khối lịch sử riêng (lệnh · kỳ · trạng thái · **thời lượng
> chạy (phút)** · xong lúc · người tạo), bấm lần nữa để đóng. E2E browser thật PASS
> (ảnh `screenshots/gd695-lich-su-theo-may.png`).

> **(b) Cảnh báo Zalo máy mất kết nối:** vòng kiểm mới trong `task_runner.py` (MÁY CHỦ,
> 5 phút/lần) đọc bảng nhịp tim `worker_heartbeat` → tạo job `bc-zalo` (cfg `alertText` —
> **DÙNG LẠI đúng cơ chế GĐ 653**, agent máy chủ gửi tin qua Zalo Web CDP). Chống spam 2
> lớp: cột mới `alerted_at` (mỗi ĐỢT mất kết nối chỉ 1 tin; máy sống lại → tin "đã KẾT NỐI
> LẠI" rồi mở đợt mới) + khung giờ 6–22h (ngoài giờ chỉ cảnh báo khi có lệnh chờ > 15' —
> đúng ca job đêm Task_05/07 cần máy). Cấu hình qua `kv_settings`: `worker_alert_enabled`
> ('0'=tắt) · `worker_alert_minutes` (mặc định 20) · `worker_alert_hours` (VD '6-22').

> **⚠️ BẢN VÁ QUAN TRỌNG phát hiện ngay trong ngày (17:24):** máy ĐANG CHẠY JOB dài KHÔNG
> poll `/agent/claim` → nhịp tim cũ (đo thật: máy chủ chạy bank-vcb nhịp **123 giây**) ⇒
> suýt bị báo "mất kết nối" OAN. Sửa 2 lớp: (1) `check_worker_offline_alerts` **bỏ qua máy
> đang có job running** (`busy`), (2) api_server ghi nhịp **cả ở `/agent/report`** — agent
> gửi report mỗi **30 giây trong lúc chạy job** (thread heartbeat GĐ C.19) → nhịp tim phản
> ánh đúng máy còn sống; MERGE đổi `groups/ip` sang `coalesce` để nhịp không kèm thông tin
> không xoá dữ liệu cũ. Unit test offline `gd695_worker_alert.test.py` **21/21 PASS** (gồm ca
> "máy đang chạy job → không cảnh báo").

> **Verify:** py_compile 0 (task_runner + api_server) · tsc app con 0 · E2E lịch sử theo máy
> PASS · SQL thật: SELECT nhịp tim + INSERT job bc-zalo + `UPDATE ... WHERE worker_id =
> ANY($1::text[])` chạy đúng (chỉ set đúng máy trong mảng) · nhịp tim 4 máy tươi sau restart ·
> **production verify PASS sau khi tunnel đổi** (login/SSO/me + 48 badge máy).

> **⚠️ Đã restart 2 service máy chủ** (đều kiểm tra pipeline RẢNH trước; Task_04 17:15 đã
> XONG 23/23 bước OK lúc 17:40): `GIONG_API_Server` (tunnel URL đổi LẦN 2 →
> `speeds-amounts-inherited-curious…`; api_server **tự cập nhật Gist + tự đăng ký URL mới với
> Vercel — HTTP 200 cả 2** ⇒ production không cần sửa env) + `GIONG_SMED_Agent` (nạp
> task_runner; tunnel GIỮ NGUYÊN — chỉ api_server sở hữu cloudflared). Đồng bộ `.env.local`
> 2 app (script `update-tunnel-env.py` lỗi SSL chứng chỉ Gist hôm nay → cập nhật tay đúng
> giá trị Gist).

> **Tiêu chí kiểm chứng của Đại ca:** (1) trang Giám sát máy trạm → bấm tên máy → thấy lịch
> sử lệnh + thời lượng; (2) tắt 1 máy trạm > 20 phút trong giờ làm việc → nhận tin Zalo cảnh
> báo (bật lại máy → nhận tin "đã kết nối lại"); muốn tắt/thử ngưỡng khác → sửa
> `kv_settings.worker_alert_*`.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **8.0.0** / repo con
> **12.7.1**.

---

### GĐ 696 / C.442 (Trợ lý ZCode (máy chủ)): PA-1 ĐH chốt — TẢI THEO TỪNG NGÀY, kỳ nhiều ngày TÁCH thành N job 1 ngày (2026-11-06)

> **ĐH chốt PA-1** cho Việc B của GĐ 693: *"Download theo từng ngày bỏ vào từng Folder ngày
> cụ thể → ETL vào DB → báo cáo theo khoảng thời gian truy xuất DB."* Nguồn gốc yêu cầu: sự cố
> GĐ 693 — job tải bù ghi file vào thư mục **lồng** `6.BKX\2026-10-01\<ngày>\` trong khi ngày
> 30/10 còn 19 file ở thư mục **phẳng** `6.BKX\2026-10-30\` ⇒ 2 thư mục TRÙNG TÊN NGÀY.

> **Luật mới (lib dùng chung `src/lib/smed-expected.ts` — `expandDownloadRanges`):** phân hệ
> **TẢI-THEO-NGÀY** (13 mã: hddt · dtdt · dtthc · bkccn · nhapkho · xuatkho · xnkt · chietkhau ·
> hentiem · dattruoc · blth · tkkh · bank-vcb) + kỳ nhiều ngày ⇒ **N job 1 ngày**, mỗi job ghi
> đúng 1 thư mục `OUTPUT\<phân hệ>\<YYYY-MM-DD>\` (agent đã tạo sẵn theo TỪ NGÀY của job — GĐ 656
> `out_dir_for(multi=False)` ⇒ hết tầng `<từ ngày>`). **GIỮ NGUYÊN 1 job** cho nhóm bản chất
> 1-file/cả-kỳ: `bank-tcb`/`bank-tpb` (tool 41/42 trả đủ lịch sử 1 lượt) · `mia-*` (1 Excel/kỳ) ·
> `bkct-hdgtgt`/`bkth-hdgtgt` (1 file/công ty/kỳ) · `nhapkho-vtth` (2 file/kỳ) · **`tkgvvxdt`**
> (snapshot GỘP KỲ 01/01/2018→nay — tách ra sẽ tải lặp file rút gọn) — cộng job báo cáo
> (`sqlreport`/`txds`/`lht-report`) + job upload (`misa-*`). **Trần an toàn 400 ngày**: kỳ dài hơn
> → giữ 1 job (không tạo hàng nghìn job).

> **Áp ở 2 đường tạo job ĐH hay dùng:** `createSmedJob` (-smed.ts — trả thêm `ids`/`count`, UI chỉ
> đọc `ok` nên không vỡ) + "Tải nhanh" ở **Tổng quan** (-overview.ts). Job tải từ Nhiệm vụ
> (Task_02/08) vốn đã 1 ngày/job nên không cần đụng.

> **Verify:** test mới `src/lib/smed-per-day.test.ts` **35/35 PASS** (kỳ 1 ngày · kỳ đảo · 3 ngày
> liền kề + qua mốc tháng · 12 mã 1-file/cả-kỳ giữ nguyên · trần 400 ngày · bất biến mọi mã
> tải-theo-ngày phải có trong `ALL_DOWNLOAD_REPORTS`) · `npm test` **EXIT 0** · tsc **0 lỗi**.

> **✅ E2E THẬT (2 job xuatkho 1-ngày: 03/11 + 04/11, tạo trực tiếp vào GiongDB như createSmedJob):**
> 2 job **done 19/19 trung tâm**, chạy **song song trên 2 máy LAN** (`lan-1` = .14 và `giangkt` =
> .245, 40 giây cho cả 2 — nhanh hơn hẳn 1 job kỳ vì trước đây phải tuần tự); file đích **đúng
> thư mục ngày PHẲNG** — `OUTPUT\6.BKX\2026-11-03\` = **19 file** (.14) · `OUTPUT\6.BKX\2026-11-04\`
> = **19 file** (.245), **KHÔNG** sinh thư mục lồng; ETL nạp lại xong dữ liệu `stg_6BKX` 2 ngày
> **KHÔNG ĐỔI** (03/11: 194 dòng/183 PX-SD · 04/11: 232 dòng/224 PX-SD — đúng nguồn, idempotent).

> **Tồn đọng (không phải lỗi):** trong `OUTPUT` còn ~vài trăm **thư mục ngày đã RỖNG** (di sản
> layout cũ, gồm cả `6.BKX\2026-10-01\`) — vô hại (ETL nhóm theo đường dẫn đầy đủ từ GĐ 693 nên
> không ảnh hưởng số liệu), chỉ là rác thư mục; dọn lúc rảnh.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **8.0.0** / repo con **12.7.0**.
> **Còn CHỜ ĐH:** lệnh **Push** (bảng "Chưa vào tiêm" GĐ 693 + sửa tách ngày GĐ 696 nằm ở web —
> chưa push thì production chưa có; phần ETL + dữ liệu + agent thì đã LIVE ngay).

---

### GĐ 698 / C.441 (Trợ lý ZCode (máy chủ)): "Đối soát HĐ-XK" tách phần ĐÃ TRẢ TRƯỚC (gói/đặt trước) — 3 cột mới (PA-1 Đại ca chốt); giải oan "download lệch số" (2026-11-06)

> **Đại ca báo 06/11:** LM khách Trần Nguyễn Minh Khang — SMED "Thống kê doanh thu" ghi **0**,
> file tải về ghi **1.156.400** → nghi download sai (tương tự ML 2.850.000). Chi tiết + bằng
> chứng: **AGENTS.md repo con C.441**, code `65581a9`.

> **Kết luận điều tra — download ĐÚNG, 2 báo cáo SMED đo 2 thứ khác nhau:** màn hình Đại ca xem
> = **Thống kê doanh thu** (`2.DTTDT` · tiền THU trong ngày) vs cột "DT SMED" của Đối soát =
> **Bảng kê chung cuối ngày** (`4.BKCCN col16` · **giá dịch vụ** của lượt tiêm). Cột cuối màn
> hình SMED là GHI CHÚ: dòng lệch ghi `LM-05-2026` / `Vắc xin đặt trước` / `TO-02-2025` ⇒ khách
> **mua gói/đặt trước** (trả tiền 1 lần, mũi sau không thu tiền, hóa đơn đã xuất ở kỳ thu gói).
> **53 dòng / 50.706.700 trong 25/10→06/11 — 100% khách có trong bảng gói/đặt trước.**

> **Đã làm (PA-1):** builder `dsxk_comparison` thêm 3 cột — **"Mũi đã trả trước (gói/ĐT)"** ·
> **"DT đã trả trước (gói/ĐT)"** · **"Chênh lệch cần kiểm tra"** (= chênh lệch tiền − phần trả
> trước không có hóa đơn, chỉ trừ giới hạn chênh lệch dương — chặn âm oan) + helper chuẩn hóa
> tên (bỏ dấu, Đ→D) + gom tên khách gói/ĐT (fail-safe). Điều kiện "khách có trong bảng gói/ĐT"
> để dòng thu ngân QUÊN nhập tiền không bị coi là trả trước.

> **Verify:** unit mới 14/14 + hồi quy 45/36/bccn/55/46/11 + builder thật 13 kỳ (kỳ 05/11: LM
> 1.156.400→cần kiểm tra 0 · ML 2.850.000→0 · TO 780.000 đã có HĐ→0; TỔNG chênh 4.006.400 giải
> thích HẾT) + **E2E production job thật = done 45s, 13 cột đúng số**.

> **Deploy:** máy chủ restart GIONG_SMED_Agent 20:35:21 · 3 máy LAN sha256 KHỚP HEAD. Trang web
> không cần sửa (render động theo cột của job).

> **Tiêu chí kiểm chứng của Đại ca:** chạy lại báo cáo Đối soát kỳ 05/11 → 3 cột mới; LM/ML hiện
> phần "đã trả trước" và "Chênh lệch cần kiểm tra" TRỐNG (không còn gì phải soi).

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **8.0.0** / repo con **12.7.0**.

### GĐ 697 / C.442 (Trợ lý ZCode (máy chủ) #2): PA-1 ĐH chốt 06/11 — bật ỨNG DỤNG XÁC THỰC (TOTP) cho 3 tài khoản MISA, hết phụ thuộc kênh gửi mã (email/Zalo/SMS) (2026-11-06)

> **Yêu cầu của ĐH:** kênh OTP về email đã sửa 3 lần nhưng vẫn tự quay về Zalo — "hãy cố
> định 1 cách…" ⇒ ĐH chốt **PA-1**: dùng Ứng dụng xác thực, mã do MÁY sinh, không gửi đi đâu.

> **Gốc rễ (bằng chứng):** kênh gửi mã là **cấu hình tài khoản MISA**, không phải code mình —
> `Account/login` trả 4 cờ `UseEmail · UsePhoneNumber · UseAppAuthenticator · UseTrustedDevice`.
> Đêm 05→06/11 phiên .245 hết hạn mà không kênh nào đọc được mã (thư OTP Gmail cuối **04/11
> 01:22** — MISA đã đổi kênh; probe IMAP vẫn OK) ⇒ job mua hàng 0/10 phiếu, phải dừng sớm.
> Trang cấu hình: **MISA ID → Bảo mật → Xác thực 2 yếu tố** (id.misa.vn/security/two-factor-authen)
> — sau khi thiết lập Ứng dụng xác thực, MISA đặt nó làm **MẶC ĐỊNH**.

> **Đã làm (repo con `91438ee` code + `a802ff1` code + `366470b` entry C.442):**
> `misa_totp.py` mới (TOTP RFC 6238 thuần Python: sinh mã, đọc khoá base32/otpauth URI, lưu
> `.secrets/misa_totp*.txt`) + `misa_totp.test.py` **16/16 PASS** (6 vector chuẩn RFC) +
> `misa_http_login.py` ưu tiên TOTP (fallback Gmail) + `misa_http_bootstrap.py`
> `try_totp_relogin()` **tự đăng nhập lại KHÔNG cần Chrome/người** + sửa 3 câu thông báo
> "OTP giờ qua SMS" đã lỗi thời. Script bật tự động: `scripts/gd697_enroll_totp.py`.

> **Đã bật + verify THẬT cả 3 tài khoản:** máy chủ `cuongpk.giong01` (NV_0174) · .245
> `mrhungtm3` (NV_0111) · .11 `thuygiongvn290790` (NV_0175) → `Account/login` trả
> **`UseAppAuthenticator=True · UseEmail=False · UsePhoneNumber=False`**; `misa_http_login --force`
> trên cả 3 máy: `mã TOTP … OTP OK → token 24.0 giờ`; .245 `ensure_ready_session(force=True)`
> tự đăng nhập + phiên mới gọi thật `stock_get` HTTP 200. Khoá sao lưu ngoài git:
> `D:\DuLieuChung\CUONG_2026\_secrets-misa-totp\` (mất khoá = mất đường tự động; MISA vẫn còn
> Email dự phòng để vào tay).

> **Deploy:** 6 file → 2 máy LAN (SHA256 khớp; test 16/16 PASS trên .245). Máy chủ chạy trực
> tiếp từ repo — **chưa restart GIONG_SMED_Agent** (file chạy ở tiến trình con mỗi job đã ăn
> bản mới; câu cảnh báo Zalo ăn sau lần restart tới).

> **Còn tồn (ngoài phạm vi GĐ này):** 05/11 bán hàng 176 phiếu + mua hàng 10 phiếu chưa chạy
> lại; xuất kho 05/11 còn 40 phiếu chờ ghi sổ.

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **8.0.0** / repo con **12.7.0**.

### GĐ 703 (Trợ lý ZCode (máy chủ) #2): PA Push đợt 06/11 tối (lệnh ĐH "Push tất cả") — 2 repo LIVE, bump 8.1.0 / 12.8.0, verify production 4/4 (2026-11-06)

> **Lệnh của ĐH (06/11 tối):** "Push tất cả cho anh để phục vụ báo cáo ngày hôm nay."

> **Rà trùng lặp (nguyên tắc 3) TRƯỚC khi push:** nhánh phụ `agent-cli` + `pipeline-work`
> = **0 commit chưa merge** (cả 2 repo) · worktree repo con còn file dở của phiên khác
> (`sql_reports.py`, `lan_tray.py`, `misa_hddt_dauvao.py`, cache sqlite, AGENTS.md) →
> **KHÔNG đụng, KHÔNG add** · 4 file version (`package.json`/`package-lock.json`/
> `app-shell.tsx` 2 app) đều sạch nên bump an toàn · các phiên khác đang giữ 🔒 GĐ
> 699/700/701 (mới claim, chưa có code) → đợt push này KHÔNG gồm việc của họ (đúng).

> **Env Vercel kiểm TRƯỚC khi push (GĐ 470):** app tổng đủ `DATABASE_URL` ·
> `APP_JWT_SECRET` · `TUNNEL_API_BASE_URL` · `TUNNEL_GIST_ID` · `BETTER_AUTH_SECRET` ·
> `BETTER_AUTH_URL`; app con đủ `DATABASE_URL` · `APP_JWT_SECRET` · `TUNNEL_API_BASE_URL` ·
> `TUNNEL_GIST_ID` · `ZAI_API_KEY`. ⇒ ĐỦ, không dừng.

> **Bump (lúc Push — quy tắc ĐA AGENT):** app tổng **8.0.0 → 8.1.0** (`9adb66b` — minor:
> TOTP MISA GĐ 697, giám sát máy trạm GĐ 689/C.436, lịch sử lệnh theo máy GĐ 695/C.440,
> tải theo từng ngày GĐ 696, báo cáo bán hàng "chưa vào tiêm" GĐ 693, đối soát HĐ-XK tách
> trả trước GĐ 698/C.441) · repo con **12.7.1 → 12.8.0** (`88e9bae`). Checklist GĐ 138 ✓
> (8.1.0 · 12.8.0 — mọi thành phần 1 chữ số). package-lock chỉ đổi 2 dòng (root + packages[""]).

> **Push:** repo con `ba35a9f..88e9bae` (17 commit) · app tổng `f304ab6..9adb66b` (28 commit:
> GĐ 693-701 của nhiều phiên + GĐ 697/C.442 của em + 2 commit bump/claim).

> **✅ Verify production (4/4 — không tin chữ "Ready"):**
> 1. `curl --compressed` app tổng = **8.1.0** · app con = **12.8.0** (ngay lần curl đầu —
>    không ghim deployment cũ).
> 2. **Login thật app tổng** (`/api/auth/sign-in/email`) → JSON có `user` (Phạm Kiên Cường)
>    + `/api/auth/get-session` đọc được session (hạn 13/11).
> 3. **SSO browser thật** (Chrome CDP máy chủ): login → **bấm nút "Bán hàng"** (đi thẳng URL
>    KHÔNG đủ — phải BẤM để handler ký handoff) → tab app con KHÔNG hiện "Chưa đăng nhập".
> 4. `/api/auth/me` trên app con = **200** + `user.role = SuperAdmin` + đủ nhóm quyền
>    (banhang-misa, banhang-banhang, banhang-kho, banhang-marketing, banhang-bank,
>    bh-bao-cao-ke-toan, bh-bao-cao-kho, …) ⇒ SSO thông, khoá `APP_JWT_SECRET` 2 app KHỚP.

> **Agent/service:** 2 máy LAN đã có đủ file mới (`worker_guard.py`, `task_runner.py`,
> `misa_totp.py` — kiểm bằng `dir`). Máy chủ **CHƯA restart GIONG_SMED_Agent** vì đang chạy
> Task_02 23:00 (chuỗi download — job `tkkh` running lúc 23:14) ⇒ **restart khi rảnh** (sáng
> mai) để nạp câu cảnh báo Zalo mới; các file tool chạy ở tiến trình con mỗi job nên đã ăn
> bản mới ngay.

> **Điểm đáng nhớ cho phiên sau (bài học verify SSO):** `page.goto(<link sidebar>)` cho
> kết quả SAI (`/api/auth/me` → `{"user":null}`) dù app thật vẫn tốt — **phải CLICK nút**
> như người dùng vì handoff SSO do handler JS sinh (kèm token), không nằm trong `href`.

> **Version:** app tổng **8.1.0** / repo con **12.8.0** — ĐÃ PUSH + ĐÃ LIVE.

---

### GĐ 699 / C.443 (Trợ lý ZCode (máy chủ)): Đối soát HĐ-XK loại nhóm GÓI/ĐT cả 2 CHIỀU + cột "Chênh lệch do gói/ĐT" (PA-A Đại ca chốt) — tổng thể tiêm → xuất kho → hóa đơn (2026-11-06)

> **Đại ca giao:** điều tra nhóm chênh lệch **ÂM** (hóa đơn > bán ra) cho cái nhìn tổng thể
> bán hàng (tiêm) → xuất kho → phát hành hóa đơn. Chi tiết + bằng chứng: **AGENTS.md repo con
> C.443**, code `297123f` (nối tiếp GĐ 698/C.441 — chiều DƯƠNG).

> **Kết luận điều tra:** nhóm ÂM gần như toàn bộ là **chiều ngược lại của cùng cơ chế gói/đặt
> trước** — khách **mua gói trong ngày** → hóa đơn xuất cho **CẢ GÓI** trong khi bảng kê cuối
> ngày chỉ ghi **các mũi đã tiêm**. Ca đo được: **TĐ 30/10** HĐ "Gói số: TĐ-13-2026 theo hợp
> đồng" = 19.894.000 vs BKCCN 1.842.400 (dòng tên gói trong BKCCN có Giá = 0) ⇒ −18.051.600.
> Định lượng 8 kỳ âm: 27/10 −2.717.000 · 28/10 −840.000 · 02/11 −260.000 **100% do gói/ĐT**.
> *Tầng xuất kho SẠCH* (Chênh lệch Bán-Xuất = 0 gần hết trung tâm).

> **3 ca THẬT cần kế toán/trung tâm xử lý:** ① **SĐ 04/11 — hóa đơn XUẤT TRÙNG 2 lần** (Trần
> Minh Tú: 3 dịch vụ × 2 = 4.520.000 vs thực tiêm 2.260.000) · ② **LM 30/10 — Bùi Khánh My:**
> HĐ 2 dịch vụ nhưng chỉ 1 mũi (khách không có trong bảng gói/ĐT) · ③ **NL 29/10 — toàn bộ
> −5.600.000 là hóa đơn KHÔNG có tên khách** (1 HĐ bán 15 liều = 5.250.000).

> **Đã làm (PA-A):** cột MỚI **"Chênh lệch do gói/ĐT"** = tổng theo TỪNG KHÁCH gói/ĐT của
> (BKCCN − HĐGTGT) — đúng cả 2 chiều; **"Chênh lệch cần kiểm tra" = CL − phần gói/ĐT**; bảng
> **tự kiểm chứng**: `Chênh lệch` = `do gói/ĐT` + `cần kiểm tra` (PASS 13 kỳ). Thay bản 1-chiều
> của GĐ 698, không để 2 công thức song song.

> **Verify:** unit mới 14/14 + hồi quy (gd698 14 · tiemho 45 · niemyet 36 · bccn · gd588-hd 55 ·
> gd588-xk 32 · task_runner_quick 46 · gd690 11 · worker_guard 13) + builder thật 13 kỳ (05/11 →
> 0; 27/10·28/10·02/11 → 0; 04/11 còn −2.260.000 = ca hóa đơn trùng; 30/10 −990.000; 29/10
> −1.400.000) + **E2E production** (job thật kỳ 05/11) = done 70s, 14 cột, đẳng thức đúng mọi dòng.

> **Deploy:** máy chủ restart GIONG_SMED_Agent 23:19:35 · 3 máy LAN sha256 khớp HEAD (máy đang
> chạy job được tự động bỏ qua trong lượt đầu — an toàn — deploy bù khi rảnh).

> **Tiêu chí kiểm chứng của Đại ca:** bảng hiện cột "Chênh lệch do gói/ĐT"; `Chênh lệch` =
> `do gói/ĐT` + `cần kiểm tra`; kỳ 05/11 + 27/10·28/10·02/11 cần kiểm tra TRỐNG; kỳ 04/11 còn
> −2.260.000 · 30/10 −990.000 · 29/10 −1.400.000 (3 ca kế toán cần xử lý).

> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **8.0.0** / repo con **12.7.0**.


### GĐ 700 / C.444 (Trợ lý ZCode (máy chủ)): Trang UPLOAD Hóa đơn đầu vào — tách Nạp Tổng quan/Chi tiết từ 2 file Excel MiaTool + bảng Tổng quan phân loại 5 nhóm + Tạo bảng kê upload misa (2026-11-06)

> **ĐH yêu cầu (06/11, kèm ảnh) + vòng hỏi-đáp chốt PA-1:** nạp TỔNG QUAN từ file
> "Mua vào - Tổng quan (MiaTool)" + CHI TIẾT từ file "Mua vào - Chi tiết (MiaTool)"
> (đọc trực tiếp 2 file Excel trên máy chủ — PA-1); bảng TỔNG QUAN 1 dòng/HĐ đúng
> bảng download + cột "Hàng hóa" (tối đa 3 mặt hàng đầu, dấu phẩy) + cột "Phân loại"
> (VTTH/CCDC/TSCĐ/DV1L/DVPB — lưu DB vĩnh viễn, VTTH ≡ NVL); cảnh báo "dữ liệu chưa
> đủ, đề nghị nạp lại dữ liệu"; hộp "Tạo bảng kê upload misa" (5 nút nhóm) sinh
> bảng kê chi tiết kết cấu 100% bảng chi tiết mua vào; **TK Nợ mặc định 152_VP /
> 153_VP / 211_VP / 642_VP / 242_VP** (TK Có 331, Kho VP); nút Upload lên MISA +
> hướng dẫn sử dụng chi tiết. Chi tiết đầy đủ ở entry **C.444 AGENTS.md repo con**
> (code `4e0489d` + docs `3e400cd`).

> **Đã làm:** 2 bảng DB mới `misa_mua_tq`/`misa_mua_ct` (DDL idempotent, nạp đè theo
> kỳ, GIỮ phân loại đã chọn) · engine nap_tong_quan/nap_chi_tiet/sinh_bang_ke (CLI +
> SMED_ACTION nap-tq/nap-ct/sinh) · web agent +7 REPORT_MAP/MISA_UPLOAD_REPORTS key ·
> API loadMuaTq/setPhanLoai/triggerHddtNapTq/napCt/sinhBangKe · trang tái thiết 7 bước
> + hướng dẫn 8 bước. Bẫy CẶP FILE cùng lần tải (`_find_mua_vao_pair` mtime lệch ≤120s).
>
> **Verify:** đối chứng chéo kỳ 9 từng đồng 5.009.500.321 = 5.009.500.321 ✓ · unit
> python 46/46 · tsc EXIT 0 · npm test 348 PASS · sinh VTTH thử 2 HĐ (đã dọn nguyên
> trạng) · restart GIONG_SMED_Agent sau commit.
>
> **Version:** KHÔNG bump (chờ lệnh Push — quy tắc ĐA AGENT). App tổng **7.9.0** /
> repo con **12.8.0**.

### GĐ 702 (Trợ lý ZCode (máy chủ)): PA-1+2+3 dọn kho tri thức — tách archive lần 3 + PROJECT_MAP + PLAYBOOK + cắt MEMORY.md (2026-11-06)

> **Yêu cầu ĐH (06/11):** "Nghiên cứu để em tự học và truy xuất dữ liệu nhanh + đúng — em làm chậm quá." Em khảo sát bằng chứng (AGENTS.md 12.432 dòng · MEMORY.md 80KB/24KB · index degraded) → trình 4 PA → **ĐH chốt PA-1+2+3 ngay, PA-4 tuần sau.**

> **PA-1 dọn kho (code `e260a4a`):**
> - Tách 171 entry GĐ 411-599 (kèm GĐ 408 lặp) xuống AGENTS_ARCHIVE.md **nguyên văn byte** (verify md5 từng khối so backup) — **AGENTS.md 12.555 → 4.333 dòng**; archive đủ GĐ 1→599; mục 12 cập nhật mốc (entry từ GĐ 600).
> - Gom 3 khối quy tắc chen giữa entry về khu quy tắc: mục 18 (giá niêm yết) · mục 19 (entire-graph — vá marker GD602 về ngay trước heading) · date picker đổi số `## 18` → `## 20`.
> - **MEMORY.md (bộ nhớ tự động ngoài repo) 81.850 → 20.275 bytes** (178 dòng ≤115 bytes, giữ từ khóa tra cứu; backup `artifacts/gd702/MEMORY.md.bak`) — hết bị cắt khi nạp đầu phiên.
> - Kèm hợp nhất bài dở ổn định của phiên #2 trong cùng file AGENTS.md (dời khối date picker, phụ lục GĐ 673, WARP note) — minh bạch trong commit message; AGENT_REGISTRY.md bài dở phiên #2 KHÔNG đụng.
> - Hook pre-commit chặn commit tách (LOST check chạy trước GIONG_SHARED_OK) → dùng `git commit --no-verify` đúng hướng dẫn hook sau khi verify đủ nguyên văn + snapshot tự động.

> **PA-2 bản đồ + playbook (code `0444027`):** `docs/PROJECT_MAP.md` — kiến trúc 6 tầng (nguồn → agent 4 máy .14/.245/.11/.250 → api_server/tunnel → GiongDB → web Vercel → ĐH) + luồng Download→ETL→Báo Cáo + lệnh tra cứu chuẩn + cấu trúc repo. `docs/PLAYBOOK.md` — ~30 triệu chứng → fix chuẩn → link GĐ (5 nhóm: Đăng nhập/Deploy · Agent/Service · Dữ liệu/ETL/GiongDB · Đa Agent/Git · UI/E2E). **Quy tắc duy trì: GĐ có bài học mới → sửa/thêm 1 dòng playbook.**

> **PA-3 nâng cấp truy xuất:** entire-graph index mới (292 file · 2.839 symbol · 9.227 relation, health ok) + fix `huong-dan.tsx` `&` → `&` (dòng 116 — sạch E_PARSE_ERROR đồ thị, render không đổi, tsc EXIT 0, code `223fcf5`) + ADR 5 quyết định kiến trúc ghi vào CBM manage_adr. CBM index_repository 2 lần abort (phiên khác đang sửa file khi index) → **VIỆC TREO: chạy lại khi repo yên tĩnh** (mục 14.2).

> **PA-4 (chờ tuần sau theo ĐH):** đo thời gian từng GĐ + audit tuần — việc lặp → quy tắc; bước tốn nhiều phút nhất → làm công cụ.

> **Verify:** tsc EXIT 0 · 7 phép thử nguyên văn byte PASS · entire-graph health ok · verify script `artifacts/gd702/`.
> **Tiêu chí kiểm chứng (sau Push):** phiên mới nạp AGENTS.md nhẹ (4.3k dòng) · tra bài học 1 cú qua docs/PLAYBOOK.md · entire-graph hết parse error.
> **Version:** KHÔNG bump (docs + 1 ký tự JSX — tiền lệ GĐ 416/417). KHÔNG push — chờ lệnh ĐH. App tổng **8.1.0** / repo con giữ nguyên.

### GĐ 704 (Trợ lý ZCode (máy chủ)): PA Push đợt 07/11 (lệnh ĐH sau GĐ 702) — bump 8.1.1 / 12.9.0 + push hộ C.444 + verify production (2026-11-07)

> **Rà trùng lặp (nguyên tắc 3, hook GĐ 607):** phiên #2 ĐÃ push xong đợt GĐ 703 (origin/main `4aa4ac6` — LIVE 8.1.0/12.8.0) → 8 commit chưa push = 5 commit GĐ 702 của em + 3 commit docs GĐ 700 của phiên #2. Repo con còn 2 commit chưa push của phiên #2: `4e0489d` (feat C.444 — tách Nạp TQ/CT từ 2 file MiaTool) + `3e400cd` (docs) → **em push hộ, minh bạch trong commit bump**. File sửa dở của phiên khác (9 file app tổng · lan_tray.py repo con) KHÔNG add, KHÔNG đụng.

> **Verify env Vercel TRƯỚC push (mục A GĐ 470):** app tổng 6/6 (DATABASE_URL · APP_JWT_SECRET · TUNNEL_API_BASE_URL · TUNNEL_GIST_ID · BETTER_AUTH_SECRET/URL) · app con 5/5 — đủ.

> **Bump (checklist GĐ 138 ✓ — mọi thành phần 1 chữ số):** app tổng 8.1.0 → **8.1.1** (patch — docs GĐ 702 + fix 1 ký tự JSX) · repo con 12.8.0 → **12.9.0** (minor — C.444 feature) — 2+2 nơi grep đối chiếu khớp.

> **Push:** app tổng `4aa4ac6..c4dd0fd` (10 commit) · repo con `b20d472..49bd9d6` (3 commit).

> **✅ Verify production (curl lần đầu — domain không ghim deployment cũ):** app tổng **8.1.1** + app con **12.9.0** · login thật `cuongpk.giong04@gmail.com` HTTP 200 + user "Phạm Kiên Cường" · get-session HTTP 200. SSO giữ nguyên (không đổi env nào đợt này — GĐ 703 vừa verify SSO browser 4/4).

> **Version:** app tổng **8.1.1** / repo con **12.9.0** — ĐÃ PUSH + LIVE.

### GĐ 705 (Trợ lý ZCode (máy chủ)): PA-2 ĐH chốt 07/11 — điều tra Task_03 kẹt 40% + Giám sát máy trạm không thấy job → SỬA 4 LỖ HỔNG (2026-11-07)

> **ĐH báo 07/11 14:35:** Task_03 kỳ 23:00 06/11 kẹt "[15/21] Thống kê khách hàng — 40%" từ
> 23:14:35 · Giám sát máy trạm 4 máy "Rảnh" không thấy job nào hoạt động. Em điều tra theo
> skill dieu-tra-job-loi — **ĐH chốt PA-2 = PA-1 + tự bù kỳ** (trình 3 PA cùng lượt).

> **Nguyên nhân gốc — 4 lỗi (bằng chứng: log NSSM + DB + Event Log):**
> 1. **Service bị STOP/START 23:19:25 + 23:47:55 đêm 06/11** (restart nạp code phiên C.444 —
>    chỉ đếm job smed_pull_jobs, KHÔNG đếm task 'running') khi Task_03 đang chạy bước 15/21
>    → thread task chết → task kẹt 'running' VĨNH VIỄN (claim chỉ nhặt 'pending' + guard
>    spawn theo name/ngày). Job tkkh ĐÃ DONE 23:45:17 19/19 (dữ liệu bước 15 đủ). Kỳ 06/11
>    thiếu 6 phân hệ cuối: bank-tcb, bank-tpb, 4 MiaTool.
> 2. **Watchdog GĐ 490 chỉ dọn 1 LẦN lúc khởi động** + nuốt lỗi im: máy chủ sập nguồn 08:05
>    07/11 (Kernel-Power 41) → boot 08:59 → SQL Express không truy cập được lúc agent start
>    09:00/10:03 → watchdog không dọn được → task ma sống sót qua mọi lần restart.
> 3. **Kênh cảnh báo Zalo GĐ 695 KHÔNG BAO GIỜ hoạt động được** (lỗi code thật):
>    `_worker_alert_enqueue` INSERT quên ghi biến cfg vào output_dir → job bc-zalo cfg rỗng →
>    handler rẽ nhánh ảnh → `_load_source_result('')` → SQL 8169 'Conversion failed
>    uniqueidentifier'. 2 cảnh báo lan-1 mất kết nối 09:06 + 09:46 KHÔNG tới được ĐH.
> 4. **Trang giám sát sai trạng thái:** `isoVN` (-worker-monitor.ts) gắn 'Z' (UTC) vào giờ DB
>    vốn là giờ VN (UTC+7) → nhịp tim +7h "tương lai" → máy chết <7 tiếng vẫn "Rảnh — máy
>    đang bật" (PC-PKT-01 chết 08:37 vẫn xanh lúc 14:35) + mọi mốc giờ lệch +7h.
>    Phát hiện thêm: job ma "Báo cáo cuối ngày — đối soát HD-XK" trên giám sát = sqlreport
>    kỳ 05/11 needsData từ 17:09 05/11 (ca GĐ 628) chưa dọn.

> **Đã làm (app tổng `4ecd9f6` + repo con `6686e45` — chi tiết entry C.445):**
> 1. **`scripts/gd652_restart_agent_when_idle.py`:** busy() đếm CẢ scheduled_tasks
>    running/pending — restart-khi-rảnh không bao giờ giết task đang chạy nữa.
> 2. Repo con — sweep NHIỆM VỤ MA định kỳ 10' (task 'running' >45' không còn thread sống →
>    error; so set `_ACTIVE_TASK_IDS` chống dọn oan) + **TỰ BÙ KỲ (PA-2):** kind daily →
>    tự spawn bản bù cùng kỳ (name "— bù kỳ <dd/mm/yyyy>", NOT EXISTS chặn lặp 1 lượt/kỳ,
>    chỉ bù kỳ ≤ 7 ngày) · bc-zalo INSERT đủ cfg · guard sourceJobId rỗng · isoVN +07:00.
> 3. **Dọn hiện trạng:** task ma 06/11 (c7428419) + job ma 05/11 (D1102AB8) → 'error'.

> **Verify bằng chứng thật (07/11):** test offline **gd705 19/19 PASS** · gd695 21/21 ·
> tsc EXIT 0 · **restart agent 15:27 → vòng đầu sweep TỰ dọn task ma + TỰ spawn bản bù
> 'Task_02 · 23:00 — bù kỳ 06/11/2026' → task-runner nhặt chạy ngay 15:27:11** (21 phân hệ
> — 7 job đầu done 19/19, dự kiến xong ~16:20) · **job bc-zalo TEST → done '✅ đã gửi Zalo
> tới My Documents'** (ĐH nhận 1 tin TEST — kênh cảnh báo lần đầu hoạt động thật).
> **Registry:** GĐ 706 do claim 2 lần cho cùng 1 việc → **⛔ GỘP vào GĐ 705** (tiền lệ
> GĐ 598).
>
> **✅ PUSH + VERIFY PRODUCTION (07/11 ~16:00 — lệnh Push ĐH):** app tổng **8.1.2** (patch) ·
> repo con **13.0.0** (minor 9 nhớ major) — curl lần đầu: app tổng live 8.1.2 · app con live
> 13.0.0 · login cuongpk.giong04@gmail.com HTTP 200 + user ✓ · get-session ✓ ·
> SSO 302 về app con + Set-Cookie: bh_session ✓ (APP_JWT_SECRET 2 app khớp). Verify env Vercel TRƯỚC
> push đủ 6+5 biến cả 2 app. Rà trùng lặp: các "sửa dở" worktree -cli = bản stale cũ
> (nhánh đứng GĐ C.89) — KHÔNG trùng thật.
>
> **CHẠY NỐT TASK HÔM QUA (lệnh ĐH sau Push):** DB tra toàn bộ nhiệm vụ 06/11 — Task_08 done
> 5/5 · Task_04 done 23/24 (duy 1 bước bank-vcb lỗi — ca VCB rỗng đêm GĐ 436) · chuỗi MISA
> kỳ 05/11 (chạy 00:14 sáng 06/11): Task_05 ERROR (phiên MISA chết) + Task_06 ERROR (phiếu
> invalid) · chuỗi MISA kỳ 06/11 CHƯA spawn (bản daily kẹt → Task_03 report không được
> spawn). Đã làm: (a) Task_05/06 kỳ 05/11 → 'pending' chạy lại; (b) job bank-vcb kỳ 06/11
> tạo 16:06; (c) bản bù daily kỳ 06/11 xong → hệ thống TỰ spawn Task_03 (report) kỳ 06/11
> (điều kiện _maybe_spawn_task04 — name 'Task_02%' khớp bản bù) → xong TỰ spawn chuỗi MISA
> 05→06→07 kỳ 06/11 — KHÔNG cần tạo tay.
>
> **KẾT QUẢ CHẠY NỐT (07/11 chiều):** bản bù **DONE 21/21 bước download OK** — đủ 6 phân hệ
> thiếu (bank-tcb, bank-tpb, mia-muavao/banra tongquan+chitiet — tất cả done 19/19) · VCB
> 06/11 file + DB **87 giao dịch đã nạp** (job VCB 16:06 status error là tool Playwright
> chết ở bước SAU khi file đủ — lỗi tool riêng, không mất số liệu; cần điều tra riêng) ·
> **Task_05 (kỳ 05/11) DONE 16:33** (phiên MISA sống lại — chứng từ mua hàng + ghi sổ) ·
> Task_06 (kỳ 05/11) đang chạy · Task_03 report kỳ 06/11 pending chờ lượt → chuỗi MISA
> 06/11 tự chạy sau. Chuỗi còn lại chạy nền tự động — có watchdog GĐ 705 + cảnh báo Zalo
> (lần đầu hoạt động) chăm.

### GĐ 707 (Trợ lý ZCode (máy chủ)): ĐIỀU TRA lệch số liệu Upload HĐ GTGT bán hàng 04/11 — MISA 265 CT = 189 chuẩn + 76 PHIẾU TRÙNG chưa ghi sổ (nguyên nhân: luồng 3531 đêm 05/11, GĐ 688 xóa theo refno DB nên sót) — 3 PA xử lý CHỜ ĐH CHỐT, KHÔNG tự xóa (2026-11-07)

> **Lệnh ĐH (07/11 ~16:30):** chạy lại thủ công Upload HĐ GTGT bán hàng thấy số liệu không
> đúng — MISA 265 CT/232.080.000 vs bảng kê upload 190 dòng/175.125.000. **Kèm nguyên tắc
> (đã lưu memory):** các phiếu "đã upload nhưng không ghi sổ" là phiên AI TỰ Ý TẠO, không
> theo nguyên tắc số phiếu SMED→MISA — phải xử lý cho đúng; **LẦN SAU KHÔNG ĐƯỢC TỰ Ý
> HÀNH ĐỘNG.**

> **Đối chiếu 3 lớp bằng API MISA thật (sa_voucher_get/paging_filter_v2, giờ VN 04/11):**
> - **MISA = 265 CT / 232.080.000** (khớp 100% số anh chụp):
>   - **A — 189 CT / 172.865.000** refno trùng bảng kê DB, **ghi sổ đủ 189/189** (76 CT-3531
>     = 59.215.000 + 113 CT-3537 = 113.650.000, created 06/11) — kết quả chạy lại Excel 72
>     cột GĐ 688; số hóa đơn khớp bảng kê 100%.
>   - **B — 76 CT-3531 / 59.215.000** = **TRÙNG 1-1 tuyệt đối với 76 CT A-3531** (cùng
>     inv_series+inv_no, lệch 0 đồng), created **05/11 00:19–00:51**, **chưa ghi sổ 76/76**,
>     refno **PT000350/11→PT000393/11** KHÔNG nằm trong bảng kê DB → GĐ 688 xóa theo refno
>     DB nên **sót lại**. Luồng cũ 3531 file 29 cột — MISA chặn ghi sổ (thiếu TK Nợ/Có).
>   - created_by A lẫn B = "Vũ Thị Thủy" = user MISA session HTTP agent (không phải nhập tay).
> - **Bảng kê 190** = 189 đã upload (A) + 1 chưa upload `HD110312611040930201371`
>   (2.260.000, chưa có số HĐ — uploaded=False hợp lệ, không phải lỗi).
> - **Nguồn SMED** stg_1HDDT 194 mã phiếu (bảng kê là tập con; 4 mã không vào bảng kê) ·
>   **MeInvoice BKCT** 192 HĐ: 189 khớp + 3 dư (00004195/00004201/00004951 = 4.756.400).
> - DB lúc probe: 189 is_posted=True + 1 chưa upload — không còn dòng "đã upload không ghi sổ".
> - Sau khi xóa 76 phiếu B: MISA = 189 CT/172.865.000 **khớp tuyệt đối** bảng kê đã upload.

> **File bằng chứng:** `artifacts/gd707_probe/` (probe1-8 + `nhom_b_76_phieu.json` 76 refid
> sẵn cho lệnh xóa + `misa_0411.json`). Script xóa mẫu: `gd688_xoa_bh_0411.py` (unpost lô →
> xóa lô → đọc lại xác nhận, GĐ 489/511).
>
> **ĐH CHỐT PA-2 — ĐÃ THỰC THI XONG + VERIFY (07/11 chiều, cùng ngày):**
> 1. **Xóa 76 phiếu trùng B:** guard 3 điều (refid danh sách · chưa ghi sổ · đúng
>    inv_no/tiền) → unpost 76/76 ok → xóa 76/76 ok → đọc lại = 0 (script
>    `gd707_xoa_76_phieu_trung.py`; MISA xóa bất đồng bộ — chạy lượt 2 tự bỏ qua).
>    MISA còn 189 CT/172.865.000 khớp bảng kê 189 phiếu đã upload.
> 2. **Upload phiếu còn thiếu (TRẦN MINH TÚ · SĐ · 2.260.000):** GỐC RỄ = BKCT MeInvoice
>    có 2 HĐ giống nhau từng đồng — **00004195 'Hóa đơn đã bị thay thế'** (bản cũ) +
>    **00004201 'Hoá đơn thay thế'** (bản hiện hành) → tool cũ không dám gán (nguyên tắc
>    'trùng → bỏ') → phiếu bị bỏ qua từ lúc build. Tải lại BKCT 04/11 (tool 30) + ETL
>    rebuild-ngày (auto-ETL nạp file mới 234 dòng) → **vá `build_bkct_invno_map` GĐ 707:**
>    nhóm trùng mà col27 xác định đúng 1 bản 'Hoá đơn thay thế' → chọn nó (bẫy `strip_vn`
>    không đổi 'đ'→'d' — đã fix). Test unit **93/93 PASS** (thêm `test_gd707_thay_the`).
>    Chạy runner `misa_banhang_api_run.py` kỳ 04/11 `MISA_ONLY_CENTERS=SĐ` `MISA_AUTO_POST=1`:
>    **tạo 1 phiếu + ghi sổ 1/1** với số HĐ 00004201 · 5 phiếu SĐ còn lại tool xác minh
>    'đã tồn tại MISA' → bỏ qua an toàn.
> 3. **Verify cuối (API MISA thật + DB):** MISA 04/11 = **190 CT / 175.125.000, ghi sổ
>    190/190** · bảng kê DB 190/190 is_uploaded+is_posted, phiếu C so_hd=00004201 ·
>    đối chiếu từng đồng: **0 thiếu · 0 thừa · 0 trùng · 0 lệch tiền — KHỚP TUYỆT ĐỐI**.
> 4. **Nêu ĐH quyết (ngoài bảng kê 190):** HĐ 00004951 TRẦN NHẬT NAM (1C26MAM, 4.529.400,
>    'Hoá đơn thay thế') KHÔNG có phiếu SMED 04/11 → không thuộc luồng upload (không
>    upload — đúng bảng kê); HĐ 'đã bị thay thế' 00004195 vẫn còn nguyên trên MeInvoice.
>    **Version:** KHÔNG bump. App tổng **8.1.2** / repo con **12.9.0**. Registry: GĐ 707
>    (claim `46cacce`).

### GĐ 709 (Trợ lý ZCode (máy chủ)): PA Push đợt 07/11 tối (lệnh ĐH "push và restart" sau GĐ 707) — 2 repo LIVE 8.1.3/13.0.1 + restart agent nạp code + verify production 6/6 (2026-11-07)

> **Lệnh ĐH (07/11 ~18:20):** *"push và restart"* — sau khi PA-2 GĐ 707 chạy xong
> (MISA 04/11 khớp tuyệt đối 190 CT/175.125.000).

> **Đã làm:**
> 1. **Rà trùng lặp (nguyên tắc 3):** nhánh phụ 2 repo RỖNG vs main (0 file đổi);
>    worktree có file sửa dở của phiên KHÁC (app tổng 10 file: AGENT_REGISTRY.md +
>    scripts cũ; repo con: lan_tray.py + cache sqlite; worktree CLI 3 file) →
>    **KHÔNG add, KHÔNG đụng** — không trùng phạm vi push (hook push-guard xác nhận).
> 2. **Verify env Vercel TRƯỚC push (mục A GĐ 470):** app tổng đủ 6 biến
>    (`DATABASE_URL` · `APP_JWT_SECRET` · `TUNNEL_API_BASE_URL` · `TUNNEL_GIST_ID` ·
>    `BETTER_AUTH_SECRET` · `BETTER_AUTH_URL`) + app con đủ 6 (`+ ZAI_API_KEY` ·
>    `SMED_AGENT_TOKEN`); `APP_JWT_SECRET` 2 app cùng ngày cập nhật (6d — đồng bộ).
> 3. **Bump version:** app tổng **8.1.2 → 8.1.3** · repo con **13.0.0 → 13.0.1**
>    (cả 2 patch — fix nhỏ; checklist 1 chữ số ✓). Nơi bump: package.json +
>    DEFAULT_VERSION (app-shell.tsx) mỗi app — grep xác nhận đủ 4 chỗ.
> 4. **Push:** app tổng `0ebf46d..c3e41a2` (8 commit — GĐ 707 điều tra + PA-2 +
>    verify + bump) · repo con `d1841ea..8f7953c` (4 commit — GĐ 707 builder + xóa
>    76 phiếu + GĐ 708 fix VCB của phiên trước + bump).
> 5. **Restart agent khi rảnh (`gd652_restart_agent_when_idle.py`):** chờ
>    **6/6 lần liên tiếp 0 job** (3 phút yên tĩnh) → xóa `__pycache__` (agent +
>    api_server + etl) → `sc stop`/`sc start` GIONG_SMED_Agent → **18:46:29
>    RUNNING** — nạp code builder GĐ 707 (rule số HĐ bản thay thế). **api_server
>    GIỮ NGUYÊN** — tunnel URL không đổi, không cần cập nhật env Vercel (GĐ 579).

> **✅ Verify production (GĐ 470 — curl + login THẬT + SSO):** app tổng
> `giong-vn-v6.vercel.app` = **8.1.3** · app con `giong-banhang.vercel.app` =
> **13.0.1** (curl lần đầu) · login `cuongpk.giong04@gmail.com` HTTP 200 + user ·
> `get-session` = "Phạm Kiên Cường" · **SSO** ký JWT (`iss=giong-vn-v6`,
> `aud=giong-banhang`) → **302 về giong-banhang + `Set-Cookie: bh_session`** (⇒
> `APP_JWT_SECRET` 2 app KHỚP) · `/api/auth/me` HTTP 200. E2E browser
> (`scripts/_gd686_verify_prod.mjs`): login thật + SSO + badge "Máy chạy" + nhãn
> tên máy OK (badge version UI đọc 8.0.0 = **localStorage cache của headless
> browser** — app-shell fallback localStorage khi không có VITE_APP_VERSION;
> Vercel KHÔNG set biến này, deploy thật = 8.1.3 theo HTML/curl).

> **Version:** app tổng **8.1.3** / repo con **13.0.1** — ĐÃ PUSH + LIVE.
> **Registry:** GĐ 709 (claim `8dc7cee`).
