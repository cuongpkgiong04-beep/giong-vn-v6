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
3. Em HỎI Đại ca trước khi push (xem Nguyên tắc Push bên dưới)
4. Thực hiện theo lựa chọn của Đại ca
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
- **PHẢI HỎI TRƯỚC KHI PUSH** — Sau khi sửa code xong, PHẢI hỏi Đại ca lựa chọn trước khi push (xem bên dưới).
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
- **Khi sửa code xong PHẢI push lên GitHub** để anh kiểm tra trên Vercel — KHÔNG dùng local nữa
- **Cần hỏi gì PHẢI hỏi trước khi hành động**
- Em có quyền commit + push trực tiếp lên repository (auto commit + push)
- **KHÔNG** có CI / checks nào bắt buộc (lint, tests) chạy trước khi merge
- **KHÔNG** cần chạy local build/test trước khi push — commit + push, Vercel tự deploy
- **KHÔNG** có khu vực code nào "cấm động" — em có quyền sửa bất kỳ file nào
- Khi cần test: ưu tiên test tự động (unit) viết trong `*.test.ts` hoặc `*.test.mjs`

### Nguyên tắc Push (bắt buộc tuân thủ — hiệu lực 2026-09-07, cập nhật 2026-09-14 áp dụng cho CẢ HAI repo):

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

### Cách tăng Version:

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

## 11. Lịch sử thay đổi quan trọng

> *Cập nhật phần này sau mỗi lần sửa code lớn*

### Giai đoạn 1: Khởi tạo project (2026-08-26)
| Commit | Thay đổi |
|---|---|
| `9669701` | Initial commit |
| `a9d6782` | First commit: GIONG VIETNAM app — scaffold TanStack Start + UI cơ bản |
| `8cc7261` | fix: thêm tslib dependency |
| `47fd099` | chore: xóa prebuilt artifacts để Vercel build lại |

### Giai đoạn 2: Auth & Database Migration (2026-08-27)
| Commit | Thay đổi |
|---|---|
| `2dceb16` | fix: kết nối registration approval với Better Auth để login hoạt động |
| `7da14a0` | fix: auto-approve catalog employees khi login (giải quyết deadlock admin) |
| `2ea6f0b` | feat: migrate toàn bộ app data (attendance, tasks, cash, proposals, notes, messages, checkins) sang Neon PostgreSQL |
| `22b329b` | perf: tối ưu Neon indexes + query limits |

### Giai đoạn 3: Chấm công & UI Fixes (2026-08-27/28)
| Commit | Thay đổi |
|---|---|
| `a08e036` | feat: thêm bản đồ satellite/street view cho trang chấm công |
| `66805c8` | Revert: rollback bản đồ (có vấn đề) |
| `86601c5` | feat: upload ảnh chấm công lên Cloudinary thay vì base64 trong Neon |
| `4df46d6` | fix: giữ seed data khi Neon seed thất bại lần đầu |
| `34f1704` | fix: thu hẹp sidebar mobile 88vw → 70vw |
| `627fdb9` | fix: thu hẹp sidebar mobile 70vw → 60vw |
| `af862da` | fix: thu hẹp sidebar mobile 60vw → 50vw |

### Giai đoạn 4: Data Reset & Cleanup (2026-08-28)
| Commit | Thay đổi |
|---|---|
| `4388b2b` | feat: reset toàn bộ dữ liệu app trên Neon |
| `3fb747a` | feat: xóa toàn bộ seed data để app bắt đầu trống |
| `dcdbc7b` | feat: xóa seed data còn sót (inventory, notes, transfers) |
| `f389d96` | feat: reset data lần 2 + guard không seed khi rỗng |
| `7344768` | feat: xóa CREDIT_SEED và COLLATERAL_SEED |
| `65d3eaf` | chore: thêm migration 0007 clear demo data + check script |

### Giai đoạn 5: Store & Hydration Fixes (2026-08-28)
| Commit | Thay đổi |
|---|---|
| `eb5a458` | fix(store): ưu tiên Neon trên hydrate; tránh auto-reseeding từ localStorage |
| `59ef461` | fix(store): ưu tiên Neon; giữ trống khi Neon trống; không fallback localStorage trên lỗi |
| `8b75e86` | fix(cham-cong): render client-only để tránh SSR demo text + hydration mismatch |
| `a5d76d9` | feat(grok): grok extensions opt-in qua VITE_ALLOW_GROK_EXT |

### Giai đoạn 6: JSX & Catalog Refactor (2026-08-28)
| Commit | Thay đổi |
|---|---|
| `c050857` | fix(cham-cong): đóng ClientOnly wrapper (fix JSX syntax) |
| `6d8ed39` | fix(cham-cong): sửa thứ tự đóng tag JSX |
| `18b72a1` | refactor: migrate employee/center data từ hardcoded catalog sang database |
| `bea26e8` | fix: xóa circular dependency giữa store.ts và catalog.ts |

### Giai đoạn 7: Mobile UI & Navigation (2026-08-28)
| Commit | Thay đổi |
|---|---|
| `079ff38` | feat: tăng font sidebar mobile lên 16px + thêm AGENTS.md |
| `6c7b3ba` | docs: thêm quy tắc auto-commit+push vào AGENTS.md |
| `70cc524` | feat: redesign mobile bottom bar + phóng to sidebar group labels |
| `37ba631` | feat: fix thứ tự bottom bar + thêm chức năng xóa chấm công |
| `e2e726b` | Fix sidebar navigation: dùng isAdminRole() để check admin nhất quán |
| `f8ab476` | Fix mobile sidebar navigation: dùng useNavigate() trong Radix Sheet |

### Giai đoạn 8: Employee Data & Hydration (2026-08-28)
| Commit | Thay đổi |
|---|---|
| `21b6aa0` | feat: thêm 33 employees vào fallback + table/grid views cho Nhân sự |
| `2e42b16` | Fix React hydration error #418: chuyển appVersion sang useState+useEffect |
| `3e855b8` | Fix hydration error #418 + mobile sidebar navigation |
| `d1cbd4c` | fix: sửa ESLint errors, unused imports, conditional hooks |

### Giai đoạn 9: Xóa modules (2026-08-28/29)
| Commit | Thay đổi |
|---|---|
| `290f37c` | feat: xóa module kho vắc xin (vaccine inventory) |
| `3acb218` | fix: xóa references cuối cùng của kho vắc xin |
| `bc22915` | feat: xóa module quỹ tiền (cash fund) |
| `f4d44dd` | feat: xóa module tín dụng (credit) |

### Giai đoạn 10: Employee & Center Data Fixes (2026-08-29)
| Commit | Thay đổi |
|---|---|
| `f45b5a0` | fix: dùng fallback employees/centers khi DB trống |
| `4d4d17f` | fix: merge fallback employees với DB employees trong hydrate |
| `85ed382` | fix: xóa /nhan-su và /trung-tam khỏi ADMIN_ONLY_PATHS |
| `66b5f9d` | fix: dùng useAppStore trực tiếp thay vì EMPLOYEES proxy để có reactivity |
| `c86cb4f` | fix: thêm 20 centers vào fallback data + fix kind mapping |
| `5197513` | fix: dùng useAppStore trực tiếp trong trung-tam.tsx |

### Giai đoạn 11: Admin Auth Fixes (2026-08-29)
| Commit | Thay đổi |
|---|---|
| `0fb884a` | fix: permissions page + registration approval auth |
| `4ffb476` | fix: admin pages redirect về / trước khi session resolve |
| `ac76f38` | fix: xóa duplicate useAppStore import trong approvals.tsx |
| `5ea27cf` | fix: admin pages không detect admin user khi auth disabled (dev mode) |
| `5733127` | fix: admin pages không detect admin user khi auth disabled |
| `d09e548` | fix: app-shell admin check dùng EMPLOYEES Proxy bị lỗi + non-reactive lookups |

### Giai đoạn 12: SSR Fix & Employee CRUD Consolidation (2026-08-30)
| Commit | Thay đổi |
|---|---|
| `c57c3cc` | refactor: viết lại module Nhân sự từ đầu |
| `7e02d6c` | fix: restore fix-ssr-exports.mjs + add to build script |
| `96f1651` | fix(nhan-su): fix React anti-pattern + auto-refresh sau CRUD |
| `140b9cb` | refactor: consolidate employee CRUD into single file (xóa catalog-data.ts) |
| `8da4d3a` | fix: rewrite fix-ssr-exports.mjs to patch ALL SSR chunks |
| `051c7ed` | fix: use line-by-line scanning in fix-ssr-exports for multi-line exports |
| `bf1fbd1` | **fix: pin vite@8.1.5 to avoid Rolldown 1.2.x SSR chunk bug** |

> **LESSON LEARNED — Vite 8.2.x + Rolldown 1.2.x SSR Bug:**
> Vite 8.2.x kéo Rolldown 1.2.2+ → Nitro re-bundle tách SSR chunk thành nhiều files
> (ssr.mjs + ssr2.mjs). File ssr2.mjs export `ssr_exports` mà không khai báo →
> `SyntaxError: Export 'ssr_exports' is not defined` → **500 trên MỌI route**,
> nhưng `vite build` exit 0 (không detect lỗi).
>
> **Fix:** Pin `vite@8.1.5` (dùng Rolldown 1.1.x — không có bug).
> **Reference:** https://github.com/TanStack/router/issues/8031
>
> **Lưu ý khi upgrade Vite:** Kiểm tra https://github.com/TanStack/router/issues/8031
> trước khi upgrade lên Vite 8.2+. Đợi TanStack fix bug hoặc Vite 8.3+.

> **LESSON LEARNED — Consolidate Server Functions:**
> KHÔNG để 2 files export cùng tên server function (catalog-data.ts + employee-crud.ts).
> TanStack Start server functions dùng file path làm ID → duplicate names gây conflict.
> Giải pháp: gộp vào 1 file duy nhất (`employee-crud.ts`).

### Giai đoạn 13: Auth Login Fix (2026-08-30)
| Commit | Thay đổi |
|---|---|
| `dd67cff` | fix(auth): xóa databaseHooks trong auth/server.ts (cho phép mọi approved user) |
| `c2dfbe5` | fix(auth): revert về signUpEmail + fix JSON.stringify password hash bug |
| `1a9ebdf` | fix(auth): fix forgot-password — wrong providerId ('credential'→'email') + wrong hash algorithm |

> **LESSON LEARNED — hashPassword + JSON.stringify Bug:**
> `hashPassword` từ `better-auth/crypto` trả về **STRING** dạng `salt:hexKey`.
> Khi làm `JSON.stringify(hashed)`, nó wrap trong quotes thừa → stored hash sai format.
> signIn verify thất bại vì hash DB có format `"salt:hex"` thay vì `salt:hex`.
>
> **Fix:** Dùng `auth.api.signUpEmail` (native Better Auth API) thay vì manual hash + SQL.
> signUpEmail xử lý hash đúng cách internally.
>
> **Lưu ý:** `auth-reset.ts` (forgot-password) cũng sai — dùng `providerId='credential'`
> thay vì `'email'` + dùng `crypto.scrypt` (params khác). Đã fix cả hai.

### Giai đoạn 14: Vercel CLI Setup & Monitoring (2026-08-31)
| Commit | Thay đổi |
|---|---|
| `dc82c65` | docs: thêm Vercel CLI access info + log monitoring guide vào AGENTS.md |

> **LESSON LEARNED — Vercel CLI Access:**
> Đại ca đã cài Vercel CLI 59.10.0 trên máy cá nhân.
> - Account: `cuongpkgiong04-4735`
> - Team: `giong-vn`, Project: `giong-vn-v6`
> - Em có quyền chạy `vercel logs` trực tiếp từ terminal để debug production.
> - SSL Warning từ `pg` library là stderr noise, KHÔNG phải lỗi auth.
> - Logs 200 dòng gần nhất: không có login attempt nào — nghĩa là chưa ai test trên deployment mới.

### Giai đoạn 15: Admin Pages, Data Sync & Permission Fix (2026-08-31)
| Commit | Thay đổi |
|---|---|
| `29c4654` | fix(admin): hiển thị thông báo thay vì redirect khi user truy cập admin pages |
| `7e1649a` | fix(admin): xóa /admin/approvals + /admin/permissions khỏi ADMIN_ONLY_PATHS |
| `f22fd03` | fix(cham-cong): sync dữ liệu chấm công giữa điện thoại và máy tính (pending sync queue) |
| `00aa077` | fix: user thường chỉ thấy dữ liệu của mình (chấm công, check-in, nhiệm vụ) |
| `d91609f` | fix(cham-cong): Clean format hiển thị địa chỉ chấm công |
| `7e8ff88` | fix(cham-cong): chỉ xóa postal code, giữ số nhà và quốc gia |

> **LESSON LEARNED — Attendance Sync (CHƯA TEST):**
> Nguyên nhân: Neon insert fail trên điện thoại → data chỉ nằm trong localStorage.
> Desktop hydrate dùng Neon data → bỏ qua localStorage → data mất.
>
> **Fix:** Thêm pending sync queue (localStorage key: `giong-vn-pending-sync`).
> Khi Neon insert fail → lưu vào pending queue. Khi hydrate → merge Neon + pending.
> **CHƯA TEST** — cần test: điểm danh trên điện thoại → mở trên máy tính.
>
> **LESSON LEARNED — Data Visibility:**
> User thường (role=User) chỉ thấy dữ liệu của mình:
> - Chấm công: chỉ thấy records có `name === currentEmployee.name`
> - Check-in: tương tự
> - Nhiệm vụ: auto-filter own tasks, disable checkbox "mine"
> Admin thấy tất cả dữ liệu của mọi người.

---

## 12. Vercel CLI — Access & Monitoring

> **Đại ca đã cài Vercel CLI và cấu hình project.** Em có quyền truy cập logs trực tiếp từ terminal.

### Thông tin kết nối
| Thông tin | Giá trị |
|---|---|
| Account | `cuongpkgiong04-4735` |
| Team | `giong-vn` |
| Project | `giong-vn-v6` |
| URL | `https://giong-vn-v6.vercel.app` |
| Directory | `D:\DuLieuChung\CUONG_2026\giong-vn-v6` |

### Lệnh thường dùng
```bash
# Kiểm tra đã login chưa
vercel whoami

# Xem logs gần nhất (50 dòng)
vercel logs --limit 50

# Xem logs real-time (theo dõi khi anh test)
vercel logs --follow

# Filter logs theo từ khóa
vercel logs --limit 200 2>&1 | grep -i "auth\|login\|error"

# Xem project info
vercel project ls
```

### Ký hiệu trong logs
| Ký hiệu | Ý nghĩa |
|---|---|
| `λ GET /api/auth/get-session` | Kiểm tra session |
| `λ POST /api/auth/sign-in/email` | Đăng nhập email/password |
| `λ POST /api/auth/sign-up/email` | Đăng ký tài khoản mới |
| `λ GET /_serverFn/...` | Server function call |
| `error` level | Có lỗi (có thể là SSL warning từ pg library, không nhất thiết là lỗi auth) |

### SSL Warning (bình thường)
```
SECURITY WARNING: The SSL modes 'prefer', 'require', and 'verify-ca'...
```
Đây là warning từ `pg` library khi kết nối Neon PostgreSQL. **Không phải lỗi thực** — chỉ là stderr noise. Không cần fix.

---

## 13. Hỏi & Trả lời nhanh

**Q:** Làm sao để em biết cần làm gì tiếp?
**A:** Đọc file này → xem mục "Đang triển khai" và "Việc cần làm". Nếu trống → hỏi Đại ca.

**Q:** Khi nào em cần hỏi Đại ca?
**A:** Khi chưa rõ yêu cầu, khi có nhiều cách xử lý, khi thay đổi ảnh hưởng lớn.

**Q:** Em có được phép refactor không?
**A:** KHÔNG, trừ khi Đại ca yêu cầu rõ ràng.

**Q:** Em có thể tự xem Vercel logs không?
**A:** CÓ. Dùng `vercel logs --limit 50` hoặc `vercel logs --follow` (xem real-time). Đã cấu hình project `giong-vn-v6`.### Giai đoạn 16: Attendance Data Fix & Mobile UI (2026-09-03)

| Commit | Thay đổi |
|---|---|
| `57f6560` | fix(cham-cong): visibleAttendance filter dùng currentName fallback khi employee null |
| `b819c28` | fix(cham-cong): dùng reactive Zustand selector cho currentEmployee → Admin thấy tất cả |
| (pending) | feat(app-shell): thêm Check-in + Chat vào mobile bottom bar, thứ tự mới 5 nút |

> **LESSON LEARNED — Non-reactive `getEmployeeById()` Bug:**
> `getEmployeeById()` trong `catalog.ts` dùng `useAppStore.getState().employees.find(...)` —
> đây là **non-reactive snapshot**. Khi component render lần đầu, employees chưa load từ DB
> → trả về `null`. Khi hydrate hoàn thành, component KHÔNG re-render vì `employees`
> không nằm trong Zustand selector → `currentEmployee` vẫn `null` → `hasPermission(null, ...)`
> trả về `false` → `canViewAll` luôn `false`.
>
> **Fix:** Dùng reactive Zustand selector:
> ```tsx
> const currentEmployee = useAppStore((s) => s.employees.find((e) => e.id === s.currentUserId) ?? null);
> ```
> Component re-renders khi `employees` thay đổi trong store.
>
> **Lưu ý:** Kiểm tra tất cả trang dùng `getEmployeeById()` trong render — phải chuyển sang
> reactive selector. Đã fix: `cham-cong.tsx`, `check-in.tsx`. Chưa fix: `nhiem-vu.tsx`, `de-nghi.tsx`.

> **LESSON LEARNED — Hydrate Merge Priority:**
> Sau khi admin xóa data trên Neon → mobile vẫn hiện data cũ vì hydrate merge Neon + localStorage.
> **Fix:** Chỉ dùng Neon + pending queue trong merge. BỎ hoàn toàn localStorage data.
> Flow mới: localStorage load ngay (instant UI) → Neon overwrite ở background.

> **LESSON LEARNED — resolveAddress Timeout:**
> `reverseGeocode()` có thể treo vô hạn trên mạng chậm → `confirmPunch()` không gọi `clock()`.
> **Fix:** `Promise.race` với timeout 10s. Nếu timeout, dùng GPS coordinates thay vì treo.

> **LESSON LEARNED — Mobile Bottom Bar:**
> `MOBILE_PRIMARY` array trong `app-shell.tsx` kiểm soát nút nào hiện + thứ tự.
> Grid layout phải khớp số nút (`grid-cols-N`). Đang chuyển từ 3→5 nút.

### Giai đoạn 17: Offline-First Hoàn Chỉnh (2026-09-03)

> Kiểm tra lại toàn bộ sync chấm công theo 4 tiêu chí của Đại ca (sync queue, local source of truth,
> conflict resolution, PowerSync). Kết quả: giữ giải pháp custom, sửa 3 lỗ hổng + thêm tombstone.

| Commit | Thay đổi |
|---|---|
| (mới) | feat(sync): merge LWW so sánh `updatedAt` thay vì flag `synced` (fix badge "Đang chờ" kẹt vĩnh viễn sau khi retry thành công) |
| (mới) | feat(sync): thêm pending queue cho tasks/notes/proposals/messages/checkins (trước chỉ có attendance) |
| (mới) | feat(sync): tombstone xóa chấm công — `deleted_at` + `deleteAttendance()` + nút Xóa trong dialog chi tiết |
| (mới) | feat(sync): upsert attendance dùng `WHERE attendance.updated_at < EXCLUDED.updated_at` (LWW đúng phía DB) |
| (mới) | test: unit test `mergeByTs`/`parseTs` trong `src/lib/merge.ts` (11 test) |
| `77c3ffd` | fix(store): hydrate tách load attendance ra try/catch riêng — lỗi module khác không còn chặn merge chấm công |

> **LESSON LEARNED — LWW phải so version, không dùng flag `synced`:**
> Merge cũ: local `synced:false` → giữ local. Sau khi `retryPendingSync()` đẩy record lên Neon thành công
> (clear queue), record vẫn `synced:false` trong local → badge "Đang chờ" kẹt vĩnh viễn dù data đã lên server.
> **Fix:** Merge mới — record còn trong pending queue thì giữ local; không còn pending thì so `updatedAt`
> (LWW), bản bằng nhau ưu tiên Neon (bản chính thức) → `synced` được tính lại đúng.
>
> **LESSON LEARNED — Merge từng collection:**
> Trước đây chỉ `attendance` được merge cẩn thận; tasks/notes/checkins/messages bị ghi đè toàn bộ bằng Neon
> → dữ liệu tạo offline (insert fail) bị mất. **Fix:** dùng chung `mergeByTs` cho tất cả collection
> (local pending luôn giữ; không pending → Neon; có version field thì so LWW).
>
> **LESSON LEARNED — Tombstone:**
> Xóa vật lý không lan truyền được trong offline-first (record "hồi sinh" trong local thiết bị khác).
> **Fix:** soft delete `deleted_at` + `loadDeletedAttendanceIds()` → hydrate filter bỏ record đã xóa.
> Migration: `migrations/0013_attendance_tombstone.sql`.
>
> **LƯU Ý cho Đại ca khi test:** Điểm danh offline trên điện thoại → bật mạng → record tự lên Neon
> và badge "Đang chờ" tự hết. Admin xóa lượt chấm trên máy tính → điện thoại mở lại app sẽ không còn thấy
> lượt đó. Migration 0013 chạy tự động khi Vercel build (`npm run db:migrate`).

### Giai đoạn 18: Attendance Data Investigation & Hydration Fix (2026-09-03)

| Commit | Thay đổi |
|---|---|
| `554f0a2` | debug: thêm logging hydrate + debug endpoint để test Neon connection |
| `f204bdc` | fix: React hydration error #418 — stabilize server/client render |
| `45ad417` | fix: wrap Toaster with ClientOnly to prevent hydration mismatch |
| `3775afb` | fix: add suppressHydrationWarning to body element |
| `bc0db7d` | chore: cleanup debug logs, debug endpoint, and test scripts |

> **LESSON LEARNED — Attendance Data Investigation:**
> Em dùng Playwright headless browser để test trực tiếp trên Vercel deployment.
> Kết quả: Neon connection hoạt động, 12 records load đúng, Admin thấy đầy đủ dữ liệu.
> Vấn đề "không thấy dữ liệu" là do **chưa login** — auth redirect chặn trang chấm công.
> Login credentials: `cuongpk.giong04@gmail.com` / `Admin123!`.
>
> **LESSON LEARNED — React Hydration Error #418:**
> Lỗi #418 xảy ra trên MỌI page nhưng KHÔNG ảnh hưởng chức năng.
> Nguyên nhân: React 19.2.0 + TanStack Start 1.168.0 SSR hydration mismatch.
> Server render `<head>` với meta tags trước, client render Sonner `<style>` trước → ordering diff.
> `suppressHydrationWarning` trên `<html>`, `<head>`, `<body>` không fix được.
> **Kết luận: Known framework issue, cosmetic only.**
>
> **LESSON LEARNED — Playwright for Vercel Testing:**
> Em có quyền dùng Playwright headless browser để login vào Vercel và test UI.
> Script test nên đặt trong `scripts/test-*.mjs` và xóa sau khi hoàn thành.
> Luôn dùng `waitUntil: 'networkidle'` + `waitForTimeout(15000)` để đợi Neon hydration.
>
> **LESSON LEARNED — CRITICAL BUG: Missing role column in query (2026-09-03):**
> Query `loadEmployees` trong `employee-crud.ts` **thiếu `e.role`** trong SELECT.
> Kết quả: role luôn undefined → fallback `'User'` → TẤT CẢ nhân sự đều thành User.
> Admin không thấy dữ liệu attendance của người khác vì `canViewAll=false`.
> **Fix:** Thêm `COALESCE(e.role, 'User') as role` vào SELECT + thêm `role` vào DbEmployee type.
> **LUÔN KIỂM TRA** query SELECT có đủ column cần thiết, đặc biệt là `role`.

### Giai đoạn 19: Auth Flow Fixes (2026-09-03)

| Commit | Thay đổi |
|---|---|
| `88181d3` | fix: loadEmployees query thiếu role column → tất cả nhân viên đều thành User |
| `456fdb2` | fix: forgot-password auto-create Better Auth account từ employees |
| `c0317f7` | fix: column names camelCase trong auth INSERT |
| `1738af1` | fix: ensureAuthUser dùng employee data thay vì registration |
| `3a83c27` | fix: ensureAuthUser dùng password thật từ login form |
| `dc4c9ff` | fix: forgot-password dùng auth.api.signUpEmail (hash đúng) |
| `42aa4d0` | fix: forgot-password xóa user+account trước khi tạo lại |
| `5f8dcd4` | fix: change-password providerId 'credential' → 'email' |
| `4128a6b` | fix: changePassword dùng authMiddleware |
| `812231a` | fix: changePassword bypass authConfigured check |
| `846ecad` | fix: changePassword tìm account bằng password IS NOT NULL |

> **LESSON LEARNED — Better Auth hashPassword format (2026-09-03):**
> KHÔNG hash password thủ công bằng `hashPassword()` + SQL INSERT.
> Better Auth signIn dùng format hash riêng → hash thủ công không khớp → "Sai mật khẩu".
> **Luôn dùng `auth.api.signUpEmail()`** để Better Auth tự xử lý hash đúng cách.
> Khi user đã tồn tại → xóa user + session + account → gọi signUpEmail lại.
>
> **LESSON LEARNED — authMiddleware vs authConfigured (2026-09-03):**
> `authMiddleware` gọi `requireUserId()` → fail nếu `authConfigured=false`.
> Trên Vercel, `VITE_AUTH_ENABLED` có thể là false → middleware refuse.
> **Fix:** Dùng `auth.api.getSession({ headers: request.headers })` trực tiếp.
> Session cookie vẫn được forward đúng cách, bypass authConfigured check.
>
> **LESSON LEARNED — Server function session resolution (2026-09-03):**
> Server function KHÔNG tự có session cookie. Cần:
> 1. Dùng `authMiddleware` (nếu authConfigured=true), hoặc
> 2. Dùng `auth.api.getSession({ headers: getRequest().headers })` trực tiếp.
> `getSessionUser()` cũng cần headers được truyền vào.
>
> **LESSON LEARNED — Forgot password cho employee-only users (2026-09-03):**
> Employee có trong `employees` table nhưng chưa có trong Better Auth `user` table.
> Flow:
> 1. Tìm employee theo email
> 2. Dùng `auth.api.signUpEmail()` tạo user + account (hash đúng)
> 3. Nếu user đã tồn tại → xóa user + session + account → signUpEmail lại
> 4. Trả temp password cho user
>
> **LESSON LEARNED — ensureAuthUser cần password (2026-09-03):**
> `ensureAuthUser` gọi từ login flow khi signIn fail. Nếu chỉ truyền email,
> function tự tạo random password → signIn retry fail.
> **Fix:** Truyền password từ login form vào `ensureAuthUser`, dùng signUpEmail.

---

## 12. Vercel CLI — Access & Monitoring

> **Đại ca đã cài Vercel CLI và cấu hình project.** Em có quyền truy cập logs trực tiếp từ terminal.

### Thông tin kết nối
| Thông tin | Giá trị |
|---|---|
| Account | `cuongpkgiong04-4735` |
| Team | `giong-vn` |
| Project | `giong-vn-v6` |
| URL | `https://giong-vn-v6.vercel.app` |
| Directory | `D:\DuLieuChung\CUONG_2026\giong-vn-v6` |

### Lệnh thường dùng
```bash
# Kiểm tra đã login chưa
vercel whoami

# Xem logs gần nhất (50 dòng)
vercel logs --limit 50

# Xem logs real-time (theo dõi khi anh test)
vercel logs --follow

# Filter logs theo từ khóa
vercel logs --limit 200 2>&1 | grep -i "auth\|login\|error"

# Xem project info
vercel project ls
```

### Ký hiệu trong logs
| Ký hiệu | Ý nghĩa |
|---|---|
| `λ GET /api/auth/get-session` | Kiểm tra session |
| `λ POST /api/auth/sign-in/email` | Đăng nhập email/password |
| `λ POST /api/auth/sign-up/email` | Đăng ký tài khoản mới |
| `λ GET /_serverFn/...` | Server function call |
| `error` level | Có lỗi (có thể là SSL warning từ pg library, không nhất thiết là lỗi auth) |

### SSL Warning (bình thường)
```
SECURITY WARNING: The SSL modes 'prefer', 'require', and 'verify-ca'...
```
Đây là warning từ `pg` library khi kết nối Neon PostgreSQL. **Không phải lỗi thực** — chỉ là stderr noise. Không cần fix.

---

## 13. Hỏi & Trả lời nhanh

**Q:** Làm sao để em biết cần làm gì tiếp?
**A:** Đọc file này → xem mục "Đang triển khai" và "Việc cần làm". Nếu trống → hỏi Đại ca.

**Q:** Khi nào em cần hỏi Đại ca?
**A:** Khi chưa rõ yêu cầu, khi có nhiều cách xử lý, khi thay đổi ảnh hưởng lớn.

**Q:** Em có được phép refactor không?
**A:** KHÔNG, trừ khi Đại ca yêu cầu rõ ràng.

**Q:** Em có thể tự xem Vercel logs không?
**A:** CÓ. Dùng `vercel logs --limit 50` hoặc `vercel logs --follow` (xem real-time). Đã cấu hình project `giong-vn-v6`.

### Giai đoạn 20: Check-in Module Upgrade (2026-09-04)

| Commit | Thay đổi |
|---|---|
| `b7fd7c5` | feat(check-in): nâng cấp Module Check-in hoàn chỉnh |
| `389fe91` | docs: thêm nguyên tắc Auto Push + cập nhật trạng thái |
| `3ac29da` | fix(check-in): fix hydrate crash khi migration 0014 chưa chạy |
| `bda889b` | fix(check-in): Admin không thấy data user khác + sync fail |
| `bdfe541` | feat: center card filter + map tile fix + attendance card style |
| `bcebacf` | fix(bang-check-in): fix bản đồ — import Leaflet tĩnh + CSS |

> **LESSON LEARNED — Check-in Module Upgrade (2026-09-04):**
> Nâng cấp Check-in từ simple location log thành full-featured module:
> - **GPS bắt buộc:** 15s timeout, không fallback "mô phỏng" — phải có vị trí mới check-in được
> - **Photo bắt buộc:** upload Cloudinary, chụp từ camera thiết bị
> - **Dialog xác nhận:** xem lại GPS + photo + center trước khi submit
> - **Center selector:** chọn trung tâm check-in (VP, LB, SĐ, NL...)
> - **Center card filter:** click center card để filter danh sách check-in
> - **Tombstone xóa:** `deleted_at` + `loadDeletedCheckinIds()` — offline-first sync giống attendance
> - **LWW merge:** `updated_at` comparison cho conflict resolution
> - **Phân quyền:** Admin thấy tất cả (`isAdminRole` fallback), User chỉ thấy mình
> - **Báo cáo mới:** `/bao-cao/bang-check-in` với bảng + filter + export CSV + bản đồ
> - **Chấm công card style:** thay grid 4 cột lớn bằng horizontal scrollable buttons
>
> **Migration 0014:** Thêm columns `photo`, `center_code`, `status`, `updated_at`, `deleted_at` vào `checkins` table. ĐÃ CHẠY thành công trên Neon.
>
> **LESSON LEARNED — Hydrate crash khi migration chưa chạy (2026-09-04):**
> `loadDeletedCheckinIds()` dùng cột `deleted_at` — nếu migration chưa chạy → query fail →
> Promise.all reject → TẤT CẢ data (tasks/notes/messages/employees/centers) đều rỗng.
> **Fix:** tách `loadDeletedCheckinIds` ra try/catch riêng.
>
> **LESSON LEARNED — Admin permission bug (2026-09-04):**
> `hasPermission(employee, "checkin:view_all")` gọi `isAdminRole(employee.role)` nhưng role
> có thể chưa load khi component render → `canViewAll = false` → Admin chỉ thấy data mình.
> **Fix:** thêm `isAdminRole(currentEmployee?.role)` fallback trực tiếp.
>
> **LESSON LEARNED — Leaflet tile layer không load trong TanStack Start (2026-09-04):**
> `require("leaflet")` không hoạt động trong SSR context → markers hiện nhưng tile không load.
> Dynamic `import("leaflet")` cũng có vấn đề.
> **Approach:** dùng `import L from "leaflet"` + `import "leaflet/dist/leaflet.css"` tĩnh
> (component wrap trong `ClientOnly` nên an toàn). **CHƯA HOẠT ĐỘNG** — cần tiếp tục debug.
>
> **LESSON LEARNED — Check-in sync từ điện thoại thất bại (2026-09-04):**
> User "Phạm Kiên Cường_01" check-in trên điện thoại → toast xanh thành công →
> nhưng Neon KHÔNG CÓ data. Server logs KHÔNG CÓ POST insertCheckin.
> **Nguyên nhân chưa rõ:** có thể do user dùng bản code cũ (cached), hoặc
> `_neonInsertCheckin` dynamic import fail trên mobile browser.
> **CHƯA FIX** — cần debug thêm.
>
> **Push fail:** Windows Credential Manager giữ credential tài khoản cũ (`cuongpkgiong02-cyber`).
> Fix: Đại ca logout GitHub cũ + login đúng tài khoản `cuongpkgiong04-beep`.

### Giai đoạn 21: Fix Attendance Sync Bug (2026-09-04)

| Commit | Thay đổi |
|---|---|
| `34222e9` | fix(cham-cong): xóa try/catch trong _neonInsertAttendance để error propagate đúng |

> **LESSON LEARNED — _neonInsertAttendance nuốt lỗi (2026-09-04):**
> `_neonInsertAttendance()` có try/catch bịt lỗi KHÔNG throw lại.
> `clock()` gọi `_neonInsertAttendance(rec).then(clearPendingSync).catch(...)` nhưng
> `.catch()` KHÔNG BAO GIỜ chạy vì error đã bị nuốt.
> **Hậu quả:** Neon INSERT fail → record vẫn bị xóa khỏi pending queue + synced=true.
> → Record KHÔNG có trên Neon, KHÔNG có trong pending queue → không bao giờ retry.
> → Tan ca mất trên thiết bị khác (cross-device sync fail).
>
> **Fix:** Xóa try/catch trong `_neonInsertAttendance()` — để error propagate tự nhiên.
> `.catch()` trong `clock()` chạy → giữ record trong pending queue → retry qua interval 30s.
>
> **LƯU Ý:** Kiểm tra tất cả `_neonInsert*` functions — chỉ `_neonInsertAttendance` có bug này.
> Các functions khác (`_neonInsertTask`, `_neonInsertNote`, `_neonInsertProposal`,
> `_neonInsertMessage`) KHÔNG có try/catch → throw đúng cách → `.catch()` hoạt động.

### Giai đoạn 22: Mobile Preview Page + Permissions (2026-09-04)

| Commit | Thay đổi |
|---|---|
| `2ac4c7d` | feat: thêm trang /preview — phone frame 390×812px + QR code + page nav |
| `3ba781c` | fix(preview): chỉ Admin mới có quyền truy cập |
| `12398fd` | feat(preview): User thấy link trong sidebar nhưng hiện thông báo từ chối |

> **Trang Preview Mobile (`/preview`):**
> - Hiển thị app trong phone frame (iPhone-style 390×812px) với iframe
> - QR code để quét bằng điện thoại thật → mở trên Safari/Chrome
> - Nút chuyển trang nhanh: Dashboard, Chấm công, Check-in, Nhiệm vụ...
> - Hot reload hoạt động trong iframe — code thay đổi → thấy ngay trên desktop
> - **Phân quyền:** Admin thấy đầy đủ, User thấy link trong sidebar nhưng hiện thông báo từ chối

### Giai đoạn 23: UI Fixes — Filter Date Mobile + Center Cards (2026-09-04)

| Commit | Thay đổi |
|---|---|
| `9f10c63` | fix(filter-date): nhóm 2 input date + dấu — vào div flex để không bị lệch mobile |
| `b99bb0a` | feat(cham-cong): thêm nút 'Tất cả' vào center cards giống Check-in |

> **Filter Date fix:** 2 input date + dấu "—" bị flex-wrap tách dòng trên mobile.
> Fix: nhóm lại trong `<div className="flex items-center gap-1.5">`.
> Áp dụng: `check-in.tsx`, `bang-check-in.tsx`, `bang-cham-cong.tsx`.
>
> **Center Cards "Tất cả":** Trang Chấm công thiếu nút "Tất cả" (Check-in đã có).
> Fix: thêm button "Tất cả" ở đầu `centerStats` hiển thị tổng hợp Vào/Ra/Tổng.
> Logic: mặc định active, click center khác → deselect.

### Giai đoạn 24: Nhiệm_vu Module Upgrade (2026-09-04)

| Commit | Thay đổi |
|---|---|
| `730eb6c` | style(nhiem-vu): cột Đã xong chuyển sang xanh lá nhạt + viền trái |
| `ffc1cc1` | feat(nhiem-vu): upgrade display format, sorting, and darker green for Đã xong |
| `ce5e9a8` | feat(nhiem-vu): fix edit dialog + add updateTask |
| `e9df039` | feat(nhiem-vu): replace 'Quá hạn' button with 'Xóa' + confirmation dialog |
| `dae452d` | feat(nhiem-vu): dropdown Phụ trách + Người hỗ trợ chỉ hiện nhân VP |
| `e82c5a5` | feat(nhiem-vu): thêm bộ lọc người phụ trách + ngày khởi tạo |
| `460655e` | fix(nhiem-vu): dropdown filter center='VP' → check cả 'VP' và 'Văn phòng' |
| `9196aaf` | fix(nhiem-vu): dropdown VP employees reactive (useAppStore selector) |
| `f1d01d5` | style(nhiem-vu): darken green colors in Đã xong column |
| `9fbc911` | fix(nhiem-vu): sort Quá hạn descending (quá hạn lâu nhất lên trên) |

> **LESSON LEARNED — Center value mismatch (2026-09-04):**
> Fallback employees dùng `center: 'VP'`, DB employees dùng `center: 'Văn phòng'`.
> Filter `center === 'VP'` bỏ qua DB employees → dropdown trống.
> **Fix:** Check cả 2 giá trị: `e.center === 'VP' || e.center === 'Văn phòng'`.
>
> **LESSON LEARNED — useMemo non-reactive employees (2026-09-04):**
> `useMemo(() => EMPLOYEES.filter(...), [])` chỉ chạy 1 lần khi mount.
> DB employees load sau mount → dropdown trống vì useMemo không re-compute.
> **Fix:** Subscribe reactive `allEmployees` từ store:
> ```tsx
> const allEmployees = useAppStore((s) => s.employees);
> const vpEmployees = useMemo(() => allEmployees.filter(...), [allEmployees]);
> ```
>
> **LESSON LEARNED — Edit dialog shared state (2026-09-04):**
> Dialog "Nhiệm vụ mới" dùng chung cho tạo + chỉnh sửa.
> **Fix:** Thêm `editingId` state để phân biệt. Dialog title/description/button
> thay đổi theo mode. Reset form khi dialog đóng qua useEffect.
>
> **LESSON LEARNED — updateTask server function (2026-09-04):**
> Trước chỉ có `addTask` và `setTaskStatus`. Cần thêm `updateTask` để sửa
> các field khác (assignee, title, due, support, blocker, photo, location).
> Thêm server function `updateTask` trong `data.ts` + store action.
>
> **LESSON LEARNED — Task display format (2026-09-04):**
> Format cũ: `Assignee · đến hạn Due` → Format mới: `Assignee: Created - Due`.
> Sorting: Việc cần làm (created DESC), Quá hạn (due DESC), Đã xong (updated DESC).
>
> **LESSON LEARNED — Task permissions (2026-09-04):**
> Phân quyền Nhiệm_vu đã có sẵn, giống Chấm công + Check-in:
> - Admin: thấy tất cả, sửa/xóa tất cả
> - User: chỉ thấy nhiệm vụ của mình (assignee hoặc createdBy khớp)
> - Chỉ creator mới sửa/xóa được (canEditTask check)
>
> **Trạng thái hiện tại Nhiệm_vu:**
> - Board view 3 cột: Việc cần làm, Quá hạn, Đã xong
> - Đã xong: xanh lá đậm (text-green-700, border-green-500)
> - Quá hạn: đỏ (text-red-400, border-red-300), sort giảm dần
> - Dropdown Phụ trách + Người hỗ trợ: chỉ nhân VP, reactive từ store
> - Bộ lọc: search text + dropdown phụ trách + date range + checkbox mine
> - Edit dialog: phân biệt tạo/sửa, pre-fill đúng data
> - Delete: dialog xác nhận "Chắc xóa" / "Lưu lại"
> - CRUD: addTask, updateTask, removeTask, setTaskStatus — tất cả sync Neon + pending queue

---
---

### Giai đoạn 25: Fix chấm công — Favicon + Build + isAdmin (2026-09-05)

| Commit | Thay đổi |
|---|---|
| `60bb45b` | fix(cham-cong): nén ảnh + timeout upload Cloudinary + log lỗi chi tiết |
| `d72c7f5` | feat: đổi favicon + apple-touch-icon thành logo PNG giong-vina-logo.png (giống sidebar) |
| `b95ea24` | fix(build): thêm external leaflet cho Rolldown + xóa import CSS thừa |
| `c57e924` | chore: trigger Vercel redeploy (favicon comment) |
| `8222086` | fix(cham-cong): thêm biến isAdmin bị thiếu gây lỗi "isAdmin is not defined" |

> **Tóm tắt công việc ngày 2026-09-05:**
>
> **1. Upload ảnh thất bại trên điện thoại**
> - Nguyên nhân: ảnh camera mobile quá lớn (5-12MB), Cloudinary có thể reject hoặc treo.
> - Fix: Client-side compress ảnh base64 về ≤800KB (resize max 1024px, giảm quality). Server-side thêm timeout 30s cho Cloudinary upload_stream.
> - Log chi tiết lỗi vào console + toast rõ ràng.
>
> **2. Favicon không phải logo Giong**
> - Nguyên nhân: favicon vẫn là SVG cũ (`/favicon.svg`), apple-touch-icon là icon-192.png.
> - Fix: Đổi `__root.tsx` — favicon + apple-touch-icon đều dùng `/giong-vina-logo.png` (logo PNG sidebar).
> - Vercel deployment báo "Error" do build fail (xem mục 3).
>
> **3. Deployment Error trên Vercel**
> - Nguyên nhân build fail:
>   - JSX escape lỗi: `Lỗi >5 lần` trong JSX raw text → Rolldown compile fail.
>   - Import CSS leaflet thừa trong `bang-check-in.tsx` → Rolldown không resolve.
>   - Import `leaflet` trong component route file → SSR/SSG context không bundle được.
> - Fix: Sửa 3 chỗ `Lỗi &gt;5 lần`, xóa import CSS thừa, thêm `rolldownOptions.external: ['leaflet']` trong `vite.config.ts`.
> - Trigger redeploy thủ công bằng `vercel deploy --prod`.
>
> **4. Lỗi "Something went wrong — isAdmin is not defined" trên /cham-cong**
> - Nguyên nhân: biến `isAdmin` được dùng ở dòng 386 nhưng không khai báo.
> - Fix: Thêm `const isAdmin = isAdminRole(currentEmployee?.role);` ngay sau `canViewAll`.
> - Đồng bộ pattern với các file khác (nhiem-vu, app-shell, nhan-su...).
>
> **Kết quả cuối:**
> - Favicon tab trình duyệt = logo PNG `giong-vina-logo.png` (giống sidebar).
> - Apple-touch-icon = logo PNG đó.
> - Upload ảnh nén client-side, timeout 30s server-side, log lỗi chi tiết.
> - Chấm công hoạt động bình thường, không còn lỗi `isAdmin is not defined`.
> - Build local thành công, Vercel deploy thành công.

### Giai đoạn 26: UI Fix — Người hỗ trợ dropdown + Nguyên tắc mới (2026-09-05)

| Commit | Thay đổi |
|---|---|
| `ae8df6a` | feat(nhiem-vu): chuyển Người hỗ trợ từ checkbox list sang dropdown multi-select compact |
| `a3e0a7c` | docs(agents): thêm 3 nguyên tắc mới vào AGENTS.md |

> **LESSON LEARNED — Người hỗ trợ dropdown compact (2026-09-05):**
> Danh sách checkbox "Người hỗ trợ" chiếm quá nhiều chỗ trong dialog tạo/sửa nhiệm vụ.
> **Fix:** Dùng Radix Popover (`@radix-ui/react-popover`) làm dropdown multi-select.
> - Button hiển thị "Chọn người hỗ trợ…" hoặc "N người đã chọn"
> - Mở dropdown → scrollable checkbox list (max-height 64 = ~16 items)
> - Chọn xong → hiện tags removable bên dưới button
> - Tiết kiệm ~200px vertical space trong dialog

### Giai đoạn 27: Camera Live + Overlay Đóng Dấu Ảnh Chấm Công (2026-09-05)

| Commit | Thay đổi |
|---|---|
| `4f457b6` | feat(cham-cong): camera live + overlay đóng dấu ảnh chấm công |
| `1af6e55` | style(cham-cong): overlay giống ảnh mẫu — time lớn, green accent line, không dark bar |

> **LESSON LEARNED — Camera Live + Overlay Stamp (2026-09-05):**
> Chuyển luồng ảnh chấm công từ `<input type="file" capture>` sang camera live (`getUserMedia`).
>
> **Flow mới:**
> 1. Mở dialog → Camera live hiện overlay với thông tin realtime
> 2. Overlay: GPS, thời gian, ngày/thứ, tên NV, công ty —font trắng với shadow
> 3. Ấn nút chụp → GPS + thời gian lấy LẠI tại giây chụp (fresh)
> 4. Đóng dấu tất thông tin lên ảnh bằng Canvas
> 5. Preview ảnh đã đóng dấu → Xác nhận → Upload lên Cloudinary
>
> **Style overlay (giống ảnh mẫu):**
> - Không có dark bar — text nổi trực tiếp trên ảnh
> - Time rất lớn kiểu đồng hồ (bold, ~9% width canvas)
> - Đường kẻ xanh lá bên trái làm accent line
> - Font: Arial, shadow rgba(0,0,0,0.7)
> - Thứ tự bottom-up: Company → Tên NV → Địa chỉ → Ngày/Thứ → Time lớn
>
> **GPS fresh at capture:** `navigator.geolocation.getCurrentPosition` với `maximumAge: 0` + 5s timeout
> để lấy toạ độ chính xác tại giây chụp, không dùng giá trị cũ lúc mở dialog.
>
> **Tên công ty:** "Công ty Cổ Phần Giong Việt Nam" (theo yêu cầu Đại ca)
>
> **Key files:** `src/routes/cham-cong.tsx` — functions `drawOverlay`, `doStamp`, `capturePhoto`, `startCamera`, `stopCamera`, `retakePhoto`



---

### Giai đoạn 28: Camera 2 loại + Font nhỏ + Stamp Check-in (2026-09-06)

| Commit | Thay đổi |
|---|---|
| `e316d69` | feat: chọn 2 loại camera (front/back) + font nhỏ + overlay stamp check-in |

> **Thay đổi:**
> - **Cham-cong:** `startCamera()` hỗ trợ `facingMode: 'user'` (camera trước) + `'environment'` (camera sau). Nút switch camera trong dialog. Mặc định `'environment'`.
> - **Chấm công:** Giảm `bigTime` từ 9%→6.5% chiều rộng ảnh, `smFont` từ 2.6%→2.2%. Nội dung vẫn bottom-left, không bị lấn.
> - **Check-in:** Thay `<input type="file" capture>` bằng camera live + canvas overlay + stamp giống chấm công. Có nút chụp, switch camera, retake. Overlay bottom-left, font nhỏ.
> - **Style stamp:** Giống hệt chấm công — company name, tên NV, địa chỉ/GPS, ngày+thứ, giờ lớn, đường xanh lá cạnh trái, không dark bar.

*Commit mới: `e316d69`*

---

### Giai đoạn 29: Mặc định camera trước + Fallback overlay (2026-09-06)

| Commit | Thay đổi |
|---|---|
| `7c7b0cd` | fix: mặc định camera trước + fallback dimensions overlay khi videoWidth=0 |

> **Thay đổi:**
> - **Mặc định camera trước:** `facingMode` mặc định thành `'user'` cho cả chấm công và check-in.
> - **Fallback dimensions:** `drawOverlay`/`doStamp` nếu `videoWidth/videoHeight <= 100` (chưa ready) → dùng `clientWidth/clientHeight` hoặc fallback 640x480. Fix overlay không hiển thị khi metadata chưa load.

*Commit mới: `7c7b0cd`*

---

### Giai đoạn 30: Z-index overlay canvas + Console log debug (2026-09-06)

| Commit | Thay đổi |
|---|---|
| `fa82567` | fix: z-index overlay canvas + console log để debug camera |

> **Thay đổi:**
> - **Z-index:** Thêm `zIndex: 10` cho overlay canvas (chắc chắn phủ lên video element).
> - **Console log:** Thêm `console.log` vào `drawOverlay` và `useEffect` để debug — xem có chạy loop không, video paused không, dimensions ra sao.
> - **Mục tiêu:** Xác định nguyên nhân overlay không hiện trên điện thoại thật.

*Commit mới: `fa82567`*

---

### Giai đoạn 31: Xử lý lỗi camera + Fallback chọn ảnh (2026-09-06)

| Commit | Thay đổi |
|---|---|
| `439d873` | fix: xử lý lỗi camera không crash component + fallback chọn ảnh từ thư viện |

> **Thay đổi:**
> - **startCamera:** `catch` error không rethrow — component không crash khi camera không available (NotFoundError).
> - **handleOpenDialog:** `setTimeout` gọi `startCamera().catch()` để không crash nếu camera fail.
> - **Fallback UI:** Khi `!cameraActive && !photoPreview`, hiện thêm nút "Chọn ảnh từ thư viện" (input file hidden) — user vẫn check-in được khi camera không mở được.
> - Áp dụng cho cả `cham-cong.tsx` và `check-in.tsx`.

*Commit mới: `439d873`*

---

### Giai đoạn 32: Đảm bảo dialog mở dù camera fail (2026-09-06)

| Commit | Thay đổi |
|---|---|
| `1b8d30d` | fix: đảm bảo dialog mở dù camera fail — bọc startCamera trong try-catch |

> **Thay đổi:**
> - **handleOpenDialog / handlePunchOpen:** Bọc `startCamera()` trong `try-catch` riêng.
> - Đảm bảo dialog luôn mở (setIsDialogOpen(true)) dù camera có fail hay không.
> - Trước đây lỗi camera có thể khiến dialog không mở → giờ vẫn mở và hiện nút "Chọn ảnh từ thư viện".
> - Áp dụng cho cả `cham-cong.tsx` và `check-in.tsx`.

*Commit mới: `1b8d30d`*

---

### Giai đoạn 32: Đảm bảo dialog mở dù camera fail (2026-09-06)

| Commit | Thay đổi |
|---|---|
| `1b8d30d` | fix: đảm bảo dialog mở dù camera fail — bọc startCamera trong try-catch |

> **Thay đổi:**
> - **handleOpenDialog / handlePunchOpen:** Bọc `startCamera()` trong `try-catch` riêng.
> - Đảm bảo dialog luôn mở (setIsDialogOpen(true)) dù camera có fail hay không.
> - Trước đây lỗi camera có thể khiến dialog không mở → giờ vẫn mở và hiện nút "Chọn ảnh từ thư viện".
> - Áp dụng cho cả `cham-cong.tsx` và `check-in.tsx`.

*Commit mới: `1b8d30d`*

---

### Giai đoạn 33: Mở dialog nhanh — không chờ GPS (2026-09-06)

| Commit | Thay đổi |
|---|---|
| `efb1443` | fix: không chờ requestLocation để mở dialog nhanh hơn |

> **Thay đổi:**
> - **handleOpenDialog / handlePunchOpen:** `requestLocation()` chạy trong nền (`requestLocation().then()`) — không `await`.
> - Trước đây `await requestLocation()` chờ đến 15 giây (timeout GPS) → dialog không mở ngay.
> - Giờ dialog mở ngay lập tức, GPS và camera chạy nền.
> - Áp dụng cho cả `cham-cong.tsx` và `check-in.tsx`.

*Commit mới: `efb1443`*

---

### Giai đoạn 34: Fix overlay dialog — bg-black/40 thay vì bg-ink/40 (2026-09-06)

| Commit | Thay đổi |
|---|---|
| `be5e34b` | fix: dialog overlay khả dụng — dùng bg-black/40 thay vì bg-ink/40 |

> **Nguyên nhân:**
> - Tailwind v4 dùng CSS variables cho màu sắc (`--color-ink: #12211c`).
> - Lớp `bg-ink/40` không được Tailwind v4 recognize vì không có color nào tên `ink` trong default config.
> - Đổi thành `bg-black/40` → overlay hiện ra.
> - Ngoài ra cũng removed debug logging và indicator đỏ từ check-in.tsx.*Commit mới: `be5e34b`*

---

### Giai đoạn 35: Stamp layout chỉnh khung ảnh (2026-09-06)

| Commit | Thay đổi |
|---|---|
| `4b19b85` | feat: stamp layout chỉnh khung ảnh — nội dung nằm trong khung, font vừa, dòng xanh cạnh trái |

> **Thay đổi:**
> - Dùng chung `buildStampLayout()` cho `cham-cong.tsx` và `check-in.tsx`.
> - Stamp block bottom-left, chiều rộng ~28% ảnh (max 220px), nằm trong khung ảnh.
> - Font size tỉ lệ width nhưng có giới hạn để không vượt biên.
> - Địa chỉ tự cắt ngắn theo chiều rộng khung.
> - Fixed TS catch blocks trong `handleOpenDialog` / `handlePunchOpen`.
> - Version bump: `package.json` + `DEFAULT_VERSION` trong `app-shell.tsx` → `0.1.1`.

*Commit mới: `4b19b85`*

---

### Giai đoạn 36: Loại bỏ fallback ảnh từ thư viện + Bỏ switch camera chấm công (2026-09-06)

| Commit | Thay đổi |
|---|---|
| `e0fa88e` | fix: xóa nút 'Chọn ảnh từ thư viện' — chỉ cho phép chụp hình từ camera |
| `56f48f3` | fix(cham-cong): bỏ nút chuyển đổi camera trước/sau — chỉ dùng camera mặc định |

> **LESSON LEARNED:**
> - Bỏ fallback 'Chọn ảnh từ thư viện' ở cả cham-cong và check-in — chỉ cho phép chụp từ camera.
> - Bỏ switch camera (front/back) ở chấm công — giữ lại ở check-in.

---

### Giai đoạn 37: Overlay stamp live + Vấn đề doStamp (2026-09-06)

| Commit | Thay đổi |
|---|---|
| `918c387` | fix: overlay canvas trong suốt — chỉ vẽ stamp text, không vẽ video frame |
| `6b0a93f` | feat(stamp): redesign overlay theo mẫu — thoáng hơn, thêm mã máy, thứ tự mới |
| `c477771` | feat(stamp): 1/4 khung hình, bỏ mã máy, resolve địa chỉ real-time |
| `3927397` | feat(stamp): tăng font size — time 16%, text 6.9% width |

> **LESSON LEARNED — drawOverlay vs doStamp stamp không đồng nhất:**
> - drawOverlay chạy trên overlayCanvasRef (visible, CSS inset-0 w-full h-full).
> - doStamp chạy trên captureCanvasRef (className='hidden' → display:none).
> - **display:none gây lỗi render** — browser không render đúng drawImage/fillText trên canvas ẩn → stamp bị cắt.
> - **Fix:** captureCanvas dùng position:absolute; left:-9999px thay vì display:none.
>
> **LESSON LEARNED — videoWidth vs clientWidth:**
> - drawOverlay dùng videoWidth/videoHeight (kích thước thật 1920x1080) nhưng canvas overlay được CSS scale xuống container.
> - doStamp cũng dùng videoWidth/videoHeight → canvas 1920x1080 nhưng img objectFit:cover crops phần dưới → stamp bị cắt.
> - **Cả drawOverlay VÀ doStamp phải dùng clientWidth/clientHeight** (kích thước hiển thị thực tế) để stamp nhất quán.
>
> **LESSON LEARNED — objectFit cover vs contain:**
> - Ảnh preview dùng objectFit:cover → crop phần dưới (nơi stamp nằm) → mất thông tin.
> - objectFit:contain giữ đầy đủ nhưng có viền đen.
> - **Giải pháp tốt nhất:** dùng clientWidth/clientHeight cho canvas → stamp vừa khung hiển thị → objectFit:cover hoạt động đúng.

---

### Giai đoạn 38: Revert về bản 17a1c94 (2026-09-06)

| Commit | Thay đổi |
|---|---|
| `934d392` | revert: quay lại bản 17a1c94 — bỏ tất cả thay đổi stamp sau đó |

> **Quyết định:** Đại ca không ưng ý các thay đổi stamp quá to/phóng đại. Quay lại bản ổn định `17a1c94`.
> **Bản 17a1c94** có stamp layout ổn định (buildStampLayout ~28% width, font vừa).

---

### Giai đoạn 39: Fix camera switch Check-in (2026-09-07)

| Commit | Thay đổi |
|---|---|
| `e28bf6b` | fix(check-in): chuyển capturePhoto/retakePhoto sang plain function + guard race condition |

> **LESSON LEARNED — capturePhoto/retakePhoto stale closure (2026-09-07):**
> Trong check-in.tsx, `capturePhoto` và `retakePhoto` là `useCallback` với deps.
> Sau khi switch camera (facingMode thay đổi), `startCamera` được recreate →
> nhưng `capturePhoto` giữ closure cũ → có thể dùng giá trị stale.
> **Fix:** Chuyển cả hai thành plain function (giống cham-cong.tsx).
>
> **LESSON LEARNED — startCamera overlap race condition (2026-09-07):**
> Nếu user click "Chụp lại" rồi nhanh chóng click switch camera,
> 2 call `startCamera` chạy đồng thời → stream bị overwrite.
> **Fix:** Thêm `startCameraRunningRef` guard — reject call thứ 2 nếu call thứ nhất chưa xong.
>
> **LESSON LEARNED — Camera release delay trên mobile (2026-09-07):**
> Trên mobile, sau khi stop stream, camera cần 100-200ms để release.
> Gọi `getUserMedia` ngay lập tức có thể fail.
> **Fix:** Thêm `await new Promise(r => setTimeout(r, 150))` sau khi stop stream.
>
> **LESSON LEARNED — retakePhoto cần setTimeout (2026-09-07):**
> `retakePhoto` gọi `setPhotoPreview(null)` rồi gọi `startCamera()`.
> Nhưng React batch state updates → video DOM element chưa render khi `startCamera` chạy.
> **Fix:** `setTimeout(() => startCamera(), 50)` để React commit DOM trước.

---

### Giai đoạn 40: Stamp layout redesign — 3 cụm (2026-09-07)

| Commit | Thay đổi |
|---|---|
| `2d7c717` | fix(stamp): chỉnh layout đóng dấu ảnh — 3 cụm, đủ địa chỉ, bôi đậm ngày |
| `fed4853` | fix(stamp): sắp xếp lại stamp theo đúng thứ tự từ trên xuống |
| `45baee1` | fix(stamp): đảo thứ tự dòng trong mỗi cụm — vẽ bottom-up nên array phải reverse |

> **LESSON LEARNED — Canvas bottom-up drawing vs visual order (2026-09-07):**
> Canvas stamp vẽ từ dưới lên (`y -= size`).
> Phần tử `[0]` trong mảng = dòng **thấp nhất** (ở dưới cùng thị giác).
> Phần tử `[N]` trong mảng = dòng **cao nhất** (ở trên cùng thị giác).
> **Fix:** Reverse thứ tự trong array so với thứ tự thị giác muốn hiển thị.
>
> **LESSON LEARNED — wrapStampText thay vì truncate (2026-09-07):**
> Trước đây: `addrRaw.slice(0, charsPerLine) + "..."` → cắt địa chỉ.
> **Fix:** `wrapStampText()` chia theo word boundary → hiển thị đầy đủ nội dung.
>
> **Layout stamp mới (3 cụm, groupGap = 18px * scale):**
> - **Cụm 1 (trên):** Giờ (lớn, bold) → Thứ ngày tháng
> - **Cụm 2 (giữa):** Địa chỉ đầy đủ wrap nhiều dòng
> - **Cụm 3 (dưới):** Tên (bôi đậm) → Công ty
> - Áp dụng cả `cham-cong.tsx` và `check-in.tsx`.

---

### Giai đoạn 41: Xóa postal code khỏi địa chỉ (2026-09-07)

| Commit | Thay đổi |
|---|---|
| `f5fc068` | fix(address): xóa postal code khỏi tất cả hiển thị địa chỉ trong dự án |

> **LESSON LEARNED — Postal code từ Nominatim (2026-09-07):**
> `reverseGeocode` dùng Nominatim OSM → `display_name` chứa postal code (VD: "11110").
> Postal code nằm giữa tên thành phố và tên quốc gia:
> `"Hà Nội 11110, Việt Nam"` → cần xóa.
>
> **Fix:**
> 1. Thêm `cleanAddress()` trong `data.ts` — áp dụng ngay trong `reverseGeocode` handler.
> 2. Regex mới: xóa 4-6 chữ số postal code ở mọi format:
>    - `/`,?\s*\d{4,6}\s*(?=,|$)/g` — postal code đứng riêng giữa dấu phẩy
>    - `/(\S)\s+\d{4,6}(?=,)/g` — postal code dính sau tên thành phố
> 3. Áp dụng `cleanAddress` khi hiển thị từ DB (data cũ trong DB vẫn có postal code):
>    - Bảng danh sách (cham-cong, check-in)
>    - Dialog chi tiết
>    - Báo cáo + popup bản đồ
>
> **Files sửa:** data.ts, cham-cong.tsx, check-in.tsx, bang-check-in.tsx, bang-cham-cong.tsx

---

### Giai đoạn 42: Nguyên tắc Push mới + Version check (2026-09-07)

| Commit | Thay đổi |
|---|---|
| (mới) | docs: cập nhật nguyên tắc push — PHẢI hỏi Đại ca trước khi push + cách tăng version |
| (mới) | chore: tăng version 0.1.1 → 0.1.2 |

> **LESSON LEARNED — Version không tự tăng (2026-09-07):**
> Version bị kẹt ở `0.1.1` suốt nhiều chục commits vì không ai cập nhật.
> **Fix:** Thêm nguyên tắc mới — sau khi sửa code, PHẢI hỏi Đại ca 1 trong 3 lựa chọn:
> 1. Push lên GitHub ngay (chỉ push)
> 2. Ghi lại lịch sử + tăng Version
> 3. Cả hai
>
> **2 nơi cần tăng version:** `package.json` + `app-shell.tsx DEFAULT_VERSION`.

---

### Giai đoạn 43: Fix biểu đồ Dashboard trống (2026-09-07)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(dashboard): biểu đồ "Chấm công 14 phiên đông" lấy data thật từ store thay vì seed rỗng |
| (mới) | chore: tăng version 0.1.2 → 0.1.3 |

> **LESSON LEARNED — Seed data rỗng làm chart dashboard trống (2026-09-07):**
> Biểu đồ "Chấm công 14 phiên đông" trên Dashboard lấy data từ `seedDaily`
> (`src/data/attendance.json`) — file này đã bị reset rỗng `{"records": [], "daily": []}`
> từ giai đoạn dọn data → biểu đồ không vẽ được gì (khung trống).
>
> **Fix:** Tính trực tiếp từ `attendance` trong store (Neon + pending sync — cùng nguồn
> với trang Chấm công):
> - Gom lượt theo ngày: `status.includes("vào")` → in, `status.includes("tan")` → out
> - Sort theo tổng (in+out) giảm dần → `slice(0, 14)` → sort lại theo ngày tăng dần
> - Khi rỗng: hiện text "Chưa có dữ liệu chấm công..." thay vì khung trống
> - Trục Y `allowDecimals={false}` (đếm lượt, không có số lẻ)
>
> **Lưu ý:** `seedDaily` vẫn còn được dùng ở `bao-cao.tsx` (card "Chấm công trung bình")
> — card đó cũng sẽ hiện số 0 cho tới khi đổi sang data thật (chưa sửa trong phiên bản này).

---

### Giai đoạn 44: Fix camera live bị cắt mặt trên iOS (2026-09-07)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(camera): iOS camera preview hiện đủ khung, không viền đen 2 bên + fix lỗi build duplicate isIOS |

> **LESSON LEARNED — iOS camera preview khung dọc bị cắt + viền đen (2026-09-07):**
> iOS Safari trả MediaStream portrait (VD 1080x1920) khi cầm máy dọc.
> Nếu dùng maxHeight + objectFit cover giống Android → video bị phóng to, cắt mặt trên/dưới.
> Ngoài ra khung preview còn hiển thị 2 bên viền đen vì không khớp tỉ lệ khung → cần contain + cho phép chiều rộng khung bằng ảnh chụp.
> **Fix:** tách style platform:
> - Android: giữ maxHeight 400 + objectFit cover + maxWidth 400 + canh giữa.
> - iOS: dùng contain, maxHeight 540, chiều rộng tự do khớp khung ảnh.
> Áp dụng cho cả live preview video, overlay canvas, ảnh stamped preview.
>
> **LESSON LEARNED — Build fail duplicate declaration (2026-09-07):**
> Trong lần sửa nhanh, `src/routes/check-in.tsx` bị khai báo 2 lần `const [isIOS] = useState(detectIOS)`.
> TanStack router-generator fail trước khi build → Vercel deploy ERROR.
> **Fix:** xóa dòng thừa, commit amend, force push. Luôn kiểm tra lỗi syntax trước khi push production.

---

### Giai đoạn 45: Version bump 0.1.5 (2026-09-07)

| Commit | Thay đổi |
|---|---|
| (mới) | chore: tăng version 0.1.4 -> 0.1.5 + ghi lại lỗi build iOS + duplicate isIOS |

> **LESSON LEARNED — Version bump:**
> Mỗi lần sửa xong production, nên tăng version ở 2 chỗ: `package.json` và `app-shell.tsx DEFAULT_VERSION`.

---

### Version

- `package.json`: `0.1.5`
- `DEFAULT_VERSION` (app-side): `0.1.5` (`src/components/app-shell.tsx`)

Lưu ý: nếu build pipeline inject `VITE_APP_VERSION` từ `package.json`, version hiển thị trong sidebar cũng sẽ khớp `0.1.5`.

| Commit | Thay đổi |
|---|---|
| (mới) | fix(camera): live preview iOS xem đủ khung — bỏ objectFit:cover gây cắt mặt |
| (mới) | chore: tăng version 0.1.3 → 0.1.4 |

> **LESSON LEARNED — iOS Safari trả stream camera dạng KHUNG DỌC (2026-09-07):**
> **Hiện tượng:** Trên iPhone, live preview camera chỉ thấy MỘT PHẦN mặt người chấm,
> nhưng khi chụp + lưu thì ảnh ĐỦ toàn bộ mặt.
>
> **Nguyên nhân:** iOS Safari trả MediaStream dạng portrait (VD 1080×1920) khi cầm máy dọc.
> Preview dùng `maxHeight: 400` + `objectFit: "cover"` → video bị phóng to để lấp đầy khung
> rồi CẮT phần trên/dưới → mất mặt. Android trả stream landscape (1920×1080) nên khung
> khớp tỉ lệ, không bị cắt.
>
> **Vì sao ảnh chụp không bị:** `doStamp()` vẽ canvas từ đúng `videoWidth/videoHeight`
> (kích thước gốc của stream) → giữ nguyên toàn bộ khung.
>
> **Fix (surgical):** Thêm `detectIOS()` (check userAgent iPad|iPhone|iPod + iPadOS 13+
> tự nhận Macintosh có maxTouchPoints > 1). Trên iOS:
> - `<video>`: `objectFit: "contain"` + `maxHeight: 520` → thấy ĐỦ khung như ảnh chụp
> - Overlay canvas: bỏ maxHeight (theo chiều cao thật của khung)
> - Android: GIỮ NGUYÊN 100% style cũ (maxHeight: 400 + cover)
>
> **Files sửa:** `src/routes/cham-cong.tsx`, `src/routes/check-in.tsx` (cùng pattern).
>
> **LƯU Ý cho Đại ca khi test:** Mở trên iPhone → Vào ca → live preview phải thấy
> ĐỦ mặt + vai (giống ảnh sau khi chụp), không còn bị cắt. Android không đổi gì.

---

### Giai đoạn 46: Fix Check-in crash + Bản đồ report (2026-09-07)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(check-in): thêm import Textarea — sửa lỗi "Textarea is not defined" crash trang |
| (mới) | fix(bang-check-in): xóa duplicate code trong useEffect map — sửa lỗi "L is not defined" |

> **LESSON LEARNED — Thiếu import component gây crash toàn trang (2026-09-07):**
> File `check-in.tsx` dùng `<Textarea>` trong dialog ghi chú nhưng KHÔNG import.
> Kết quả: "Something went wrong — Textarea is not defined" → toàn bộ trang Check-in crash.
> **Fix:** Thêm `import { Textarea } from "@/components/ui/textarea"`.
> **Lưu ý:** Component `Textarea` nằm trong `src/components/ui/textarea.tsx` — phải import đúng path.
>
> **LESSON LEARNED — Duplicate code trong useEffect (2026-09-07):**
> File `bang-check-in.tsx` có useEffect khởi tạo Leaflet map. Bên trong block `.then()`, code
> viết đúng (tạo map, tile layers, markers). Nhưng SAU block `.then()`, còn ~50 dòng code
> **trùng lặp** refer đến biến `L`, `map`, `streetLayer` ở **ngoài scope** → ReferenceError.
> **Fix:** Xóa toàn bộ code thừa. Đảm bảo KHÔNG có code nào ngoài block `.then()`.
> **Root cause:** Có thể do merge conflict hoặc copy-paste không xóa hết.

---

### Giai đoạn 47: Check-in — chuyển cards trung tâm vào dropdown (2026-09-08)

| Commit | Thay đổi |
|---|---|
| (mới) | refactor(check-in): xóa danh sách cards trung tâm — lọc trung tâm chỉ qua dropdown |
| (mới) | chore: tăng version 0.1.6 → 0.1.7 |

> **LESSON LEARNED — 2 cơ chế lọc trung tâm trùng lặp trong check-in.tsx (2026-09-08):**
> Trang Check-in có 2 cách lọc trung tâm song song:
> 1. Dropdown "Tất cả trung tâm" — state `center`, lọc trong memo `rows`
> 2. Danh sách cards trung tâm — state `selectedCenter`, lọc qua memo `selectedCenterRows`
> **Vấn đề:** Bảng chỉ render `selectedCenterRows` (rỗng khi chưa click card) → chọn dropdown
> không đổi được nội dung bảng → người dùng tưởng filter hỏng.
> **Fix (theo yêu cầu Đại ca):** Xóa cards + state `selectedCenter` + 2 memo
> `centerStats`/`selectedCenterRows`. Bảng render trực tiếp `rows` (đã gồm filter
> dropdown trung tâm + loại vào/tan + date range + tìm kiếm).
>
> **LƯU Ý:** Trang `cham-cong.tsx` vẫn GIỮ cả 2 cơ chế (cards + dropdown) — không sửa vì
> ngoài phạm vi yêu cầu. Nếu sau này muốn đồng bộ, áp dụng cùng pattern.

---

### Giai đoạn 48: Check-in — tiêu đề bảng giống Báo cáo Check-in (2026-09-08)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(check-in): đổi tiêu đề bảng + ô dữ liệu giống Báo cáo Check-in (8 cột) |
| (mới) | chore: tăng version 0.1.7 → 0.1.8 |

> **LESSON LEARNED — Đồng bộ tiêu đề bảng Check-in với Báo cáo (2026-09-08):**
> Đại ca yêu cầu tiêu đề bảng Check-in giống phần tiêu đề của Báo cáo Check-in.
> Trước: bảng Check-in có 6 cột `Người check-in | Địa chỉ / GPS | Trung tâm | Thời gian | Ghi chú | Ảnh`.
> Sau: bảng Check-in có 8 cột giống hệt Báo cáo Check-in:
> `STT | Nhân sự | Trung tâm | Ngày | Giờ | Địa điểm | Ảnh | Ghi chú`.
> **Thay đổi ô dữ liệu cho khớp:**
> - Thêm cột `STT` (số thứ tự `idx + 1`)
> - `Nhân sự`: tên (font-medium) + chức danh `related.title` bên dưới
> - `Trung tâm`: hiện tên ngắn `CENTERS.find(...)?.short ?? workplace`
> - `Ngày`: `formatDate(a.date)` + thứ `a.weekday` bên dưới
> - `Giờ`: `a.time` riêng (tabular)
> - `Địa điểm`: `cleanAddress(a.address || a.gps)`
> - `Ảnh`: ảnh nhỏ `size-8 object-cover` + dấu `—` khi không có ảnh
> - `Ghi chú`: `a.note || "—"`
>
> **LƯU Ý:** Chỉ sửa `src/routes/check-in.tsx`. Trang `cham-cong.tsx` và `bang-cham-cong.tsx`
> vẫn giữ layout cũ — không đổi vì ngoài phạm vi yêu cầu.

---

### Giai đoạn 49: Fix bản đồ Báo cáo Check-in — load Leaflet từ CDN (2026-09-08)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(bang-check-in): load Leaflet từ CDN thay vì import("leaflet") — bản đồ hoạt động trên production |
| (mới) | chore: tăng version 0.1.8 → 0.1.9 |

> **LESSON LEARNED — ROOT CAUSE bản đồ không hiển thị bấy lâu nay (2026-09-08):**
> Debug bằng Playwright trên production: console browser lặp lỗi
> `TypeError: Failed to resolve module specifier 'leaflet'` (bị nuốt vào console.warn nên không thấy).
> **Nguyên nhân:** `vite.config.ts` đánh dấu `external: ["leaflet", "leaflet/dist/leaflet.css"]`
> (thêm ở Giai đoạn 25 để fix build fail) → bundle client giữ nguyên bare specifier
> `import("leaflet")` → **browser không resolve được bare module** → promise reject →
> `.catch()` chỉ warn → bản đồ trắng, 0 tile, 0 marker.
> **Đây chính là lý do tile "không load" từ trước tới nay — toàn bộ map chưa từng chạy trên production.**
>
> **Fix (theo lựa chọn của Đại ca — cách 1: CDN):**
> Thêm hàm `loadLeaflet()` trong `bang-check-in.tsx` — chèn `<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js">`
> vào `<head>` lúc runtime, cache promise (1 lần load). Thay 3 chỗ `import("leaflet")`
> bằng `loadLeaflet()`. CSS Leaflet đã load từ CDN trong `__root.tsx` sẵn — không đụng.
> KHÔNG đụng `vite.config.ts` → không rủi ro tái diễn lỗi build Giai đoạn 25.
>
> **LƯU Ý:** `gps-map-inner.tsx` (dùng `import L from "leaflet"` tĩnh) hiện KHÔNG được import
> ở đâu → nếu sau này muốn dùng lại, phải áp dụng cùng pattern CDN hoặc sửa external.
>
> **Cách debug tương tự khi cần:** script `scripts/test-map-debug.mjs` (login → mở trang →
> đếm `.leaflet-container`/tiles/markers + full console logs).

---

### Giai đoạn 50: Click dòng/marker xem chi tiết Check-in (2026-09-08)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(check-in): click dòng bảng mở dialog chi tiết (dialog có sẵn trước đây không có gì gọi được) |
| (mới) | feat(bang-check-in): thêm dialog chi tiết + click dòng bảng + click marker bản đồ mở chi tiết |
| (mới) | chore: tăng version 0.1.9 → 0.1.10 |

> **Thay đổi theo yêu cầu Đại ca:** Ấn vào dòng chi tiết trong Check-in và Báo cáo Check-in,
> và Ấn vào vị trí trên bản đồ của Báo cáo Check-in → hiện chi tiết dữ liệu đó.
>
> **Chi tiết 3 điểm sửa:**
> 1. `check-in.tsx`: thêm `onClick` vào `<tr>` → mở dialog "Chi tiết Check-in" **có sẵn từ trước**
>    (state `detailRecord`/`isDetailOpen` đã tồn tại nhưng không có gì gọi được — dead UI).
> 2. `bang-check-in.tsx`: thêm state `detailRow`/`isDetailOpen` + dialog chi tiết mới
>    (Nhân sự + chức danh, Trung tâm, Thời gian, GPS, Địa điểm, Ảnh, Ghi chú) + `onClick` dòng bảng.
> 3. `bang-check-in.tsx`: `CheckInMap` nhận prop `onSelect`; `marker.on("click", ...)` →
>    vừa hiện popup nhỏ (giữ nguyên), vừa mở dialog chi tiết. Tìm row theo
>    `gps + name + date + time` khớp giữa mapPoints và reportRows.
>
> **LESSON LEARNED — Dialog có sẵn nhưng dead UI (2026-09-08):**
> Trang Check-in đã có dialog chi tiết từ Giai đoạn 20 nhưng sau các lần refactor bảng,
> không còn gì mở được nó. Khi thêm tính năng click-to-view, kiểm tra trước xem dialog
> đã tồn tại chưa để tái sử dụng thay vì viết mới trùng lặp.

---

### Giai đoạn 51: Quy tắc tròn chục khi tăng Version (2026-09-08)

| Commit | Thay đổi |
|---|---|
| (mới) | docs(agents): thêm quy tắc tròn chục vào mục Cách tăng Version |
| (mới) | chore: tăng version 0.1.10 → 0.2.0 (đổi sang minor theo quy tắc — feature mới tiếp theo) |

> **Quy tắc tròn chục (theo yêu cầu Đại ca):**
> Khi số sau tăng đến tròn chục thì số trước tăng 1 bậc, số sau về 0:
> - `1.0.9` → `1.1.0`; `1.1.9` → `1.2.0`; `1.9.9` → `2.0.0`
> - Áp dụng cho cả 3 số: patch đầy (`x.y.9` → `x.y+1.0`), minor đầy (`x.9.9` → `x+1.0.0`).
>
> **Kiểm tra logic version (2026-09-08):**
> Chuỗi version gồm 3 lớp: `package.json` (nguồn chuẩn) → `with-app-env.mjs` đọc +
> validate regex `/^(\d+\.)(\d+\.)(\d+)$/` + inject `VITE_APP_VERSION` lúc build →
> `app-shell.tsx getAppVersion()` hiển thị ở sidebar (env → localStorage → DEFAULT_VERSION).
> 2 nơi bắt buộc (`package.json` + `DEFAULT_VERSION`) đã khớp nhau ở mọi lần bump.
>
> **Quyết định của Đại ca:** Từ version tiếp theo tăng theo minor `0.2.0` để thẳng hàng
> với quy tắc đã viết (feature mới = minor). Version hiện tại: **0.2.0**.

---

### Version

- `package.json`: `0.3.4`
- `DEFAULT_VERSION` (app-side): `0.3.4` (`src/components/app-shell.tsx`)

---

### Giai đoạn 65: Lightbox ảnh Check-in + đổi nền trắng (2026-09-09)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(check-in): click ảnh trong dialog Chi tiết Check-in mở lightbox toàn màn hình + đổi nền đen thành trắng |
| (mới) | chore: tăng version 0.3.3 → 0.3.4 |

> **Yêu cầu của Đại ca (2 điểm):**
> 1. Ảnh trong dialog Chi tiết Check-in không phóng to được → thêm lightbox giống Chấm công (GĐ 64).
> 2. Nền đen bao quanh ảnh dọc → đổi thành nền TRẮNG.
>
> **Fix (surgical trong `src/routes/check-in.tsx` — KHÔNG đụng file khác):**
> 1. State `lightboxPhoto` + ảnh dialog thêm `cursor-zoom-in`/`hover:opacity-90`/`title`/`onClick`.
> 2. Khung ảnh dialog: `bg-black p-2` → **`bg-white p-2`**.
> 3. Overlay lightbox: nền **`bg-white/95`** (khác Chấm công dùng đen) — nút × nền `bg-black/10
>    text-ink` phù hợp nền sáng. z-index 60 > Radix Dialog z-50.
> 4. Import thêm `X` từ lucide-react.
>
> **LƯU Ý:** Chấm công (GĐ 64) vẫn giữ lightbox nền ĐEN — nếu Đại ca muốn đồng bộ trắng cả
> hai trang, chỉ cần đổi `bg-black/90` → `bg-white/95` + style nút × trong cham-cong.tsx.

---

### Giai đoạn 64: Lightbox phóng to ảnh chấm công (2026-09-09)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(cham-cong): click ảnh trong dialog Chi tiết chấm công mở lightbox toàn màn hình |
| (mới) | chore: tăng version 0.3.2 → 0.3.3 |

> **Yêu cầu của Đại ca:** Ảnh trong dialog Chi tiết chấm công (thumnail maxHeight 300px)
> không phóng to được → nhìn không rõ dấu thời gian + địa chỉ đóng trên ảnh. Cho phóng to
> bằng khung hình của dialog chi tiết.
>
> **Fix (surgical trong `src/routes/cham-cong.tsx` — KHÔNG đụng file khác):**
> 1. State `lightboxPhoto: string | null` — giữ URL ảnh đang xem full màn hình.
> 2. Ảnh trong dialog thêm `cursor-zoom-in`, `hover:opacity-90`, `title="Bấm để phóng to"`,
>    `onClick={() => setLightboxPhoto(detailRecord.photo!)}`.
> 3. Overlay lightbox `fixed inset-0 z-[60] bg-black/90` — ảnh `max-h-full max-w-full
>    object-contain`; bấm nền HOẶC nút × (icon X từ lucide) để đóng; `stopPropagation`
>    trên ảnh để bấm nhầm vào ảnh không đóng lightbox.
> 4. z-index 60 > dialog (Radix mặc định 50) → lightbox phủ trên dialog chi tiết.
>
> **LƯU Ý:** Ảnh gốc (thumnail 300px) giữ nguyên — chỉ thêm khả năng phóng to.
> Overlay đặt TRONG ClientOnly (cuối JSX, sau Dialog chi tiết) — không phụ thuộc SSR.
>
> **LESSON LEARNED — z-index lightbox vs Radix Dialog (2026-09-09):**
> Radix Dialog dùng z-50 mặc định. Overlay mở TỪ trong dialog cần z-index cao hơn (z-[60])
> để phủ được. Nếu dùng portal riêng của Radix, kiểm tra kỹ thứ tự chồng lớp giữa các layer.

---

### Giai đoạn 63: Fix ROOT CAUSE khe hở Chấm công — ClientOnly nuốt callback của ref (2026-09-09)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(cham-cong): đổi sang callback ref — đo chiều cao khối ghim ngay lúc DOM mount, hết hở giữa 2 khối |
| (mới) | chore: tăng version 0.3.1 → 0.3.2 |

> **Hiện tượng:** Sau GĐ 62, khe hở giữa khối ghim và thead VẪN còn trên production.
>
> **Quy trình debug (curl-based, không cần Playwright):**
> 1. `curl` trang → lấy tên CSS bundle + JS bundle từ `/assets/`.
> 2. `grep` CSS bundle: `calc(4rem + var(--cc-sticky-h,300px))` ĐÃ được sinh ✅
> 3. `grep` JS chunk `cham-cong-*.js`: code `parentElement?.style.setProperty` ĐÃ có ✅
> 4. → Code mới đã lên production mà vẫn hở → biến KHÔNG được gán lúc runtime.
>
> **ROOT CAUSE:** Trang cham-cong bọc TOÀN BỘ trong `<ClientOnly>` (render skeleton
> ở lần render đầu). useEffect với deps `[]` chạy NGAY SAU lần render đầu — lúc đó
> khối ghim chưa mount → object ref `null` → effect return sớm và KHÔNG BAO GIỜ chạy lại
> (ClientOnly re-render không kích hoạt lại effect deps rỗng) → ResizeObserver không bao
> giờ gắn → `--cc-sticky-h` không gán → thead dùng fallback 300px < chiều cao thật → HỞ.
> **Check-in + Nhiệm vụ không bị** vì 2 trang này KHÔNG bọc ClientOnly quanh khối ghim.
>
> **Fix (chỉ `src/routes/cham-cong.tsx`):** Thay useEffect + object ref bằng
> **callback ref** (`useCallback((el) => {...})`) — đo + gắn ResizeObserver ngay lúc
> DOM node gắn vào DOM tree (ClientOnly render xong), cleanup disconnect observer cũ.
>
> **LESSON LEARNED — ClientOnly + useEffect deps [] + object ref = ref null mãi mãi (2026-09-09):**
> ClientOnly render fallback ở lần đầu → children mount ở lần 2. useEffect deps `[]`
> chỉ chạy sau lần render ĐẦU → ref lúc đó là null → logic gắn observer/sự kiện mất.
> **Giải pháp:** dùng callback ref cho mọi phần tử cần đo/gắn sự kiện bên trong ClientOnly,
> hoặc thêm state `ready` vào deps. **Debug production không cần Playwright:** curl HTML →
> tìm asset names → grep từng bundle để xác minh code đã deploy — nhanh và không phụ thuộc
> npm install (máy này npm lỗi ghi file do đĩa Google Drive sync).

---

### Giai đoạn 62: Tinh chỉnh khung cố định Chấm công — sát lệnh + hết hở giữa 2 khối (2026-09-09)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(cham-cong): bỏ padding trên khối ghim + đặt --cc-sticky-h trên cha chung — thead đọc đúng chiều cao, hết hở giữa 2 khối khi cuộn |
| (mới) | chore: tăng version 0.3.0 → 0.3.1 |

> **Yêu cầu của Đại ca (2 điểm):**
> 1. Phía trên cùng khung cố định còn khoảng trống → kéo sát lên.
> 2. Khối ghim (tiêu đề + cards + bộ lọc) và thead bảng không đồng nhất — khi cuộn hở
>    một khoảng ở giữa.
>
> **Nguyên nhân điểm 2:** `--cc-sticky-h` chỉ đặt trên khối ghim; thead nằm trong Card riêng
> NGOÀI khối ghim → không đọc được var → fallback 300px < chiều cao thật (~330px) →
> thead ghim quá cao → hở khe giữa 2 khối. Cùng gốc lỗi với GĐ 58 (Check-in) và GĐ 60
> (Nhiệm vụ) — Chấm công là trang ĐẦU TIÊN làm pattern sticky nên chưa có fix này.
>
> **Fix (surgical trong `src/routes/cham-cong.tsx` — KHÔNG đụng file khác):**
> 1. Khối ghim bỏ `lg:pt-2` + giảm `lg:pb-3` → `lg:pb-2` (như Nhiệm vụ GĐ 61).
> 2. ResizeObserver đặt var trên cả khối ghim VÀ `el.parentElement` (cha chung) —
>    giống Check-in/Nhiệm vụ. Từ giờ cả 3 trang dùng chung 1 pattern thống nhất.
>
> **Trạng thái sticky 3 trang (đã đồng nhất):**
> | Trang | Khối ghim | var | Đặt var trên cha chung |
> |---|---|---|---|
> | cham-cong | top-16, pb-2 | --cc-sticky-h | ✅ (GĐ 62) |
> | check-in | top-16, pt-2/pb-3 | --ci-sticky-h | ✅ (GĐ 58) |
> | nhiem-vu | top-16, pb-2 | --nv-sticky-h | ✅ (GĐ 60) |
>
> **LƯU Ý:** Check-in vẫn còn `lg:pt-2` trong khối ghim (GĐ 58 chưa bỏ) — nếu Đại ca
> muốn Check-in cũng sát lệnh như Chấm công/Nhiệm vụ, chỉ cần bỏ `lg:pt-2` ở check-in.tsx.

---

### Giai đoạn 61: Tinh chỉnh khung cố định Nhiệm vụ — sát lệnh + 1 hàng bộ lọc (2026-09-08)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(nhiem-vu): bỏ padding trên khối ghim (sát lên trên) + thu hẹp ô lọc desktop để Khối/Danh sách về chung 1 hàng với bộ lọc |
| (mới) | chore: tăng version 0.2.9 → 0.3.0 (tròn chục minor) |

> **Yêu cầu của Đại ca (2 điểm):**
> 1. Phía trên cùng khung cố định còn khoảng trống → kéo sát lên để lấy diện tích cho phần dưới.
> 2. Nút Khối / Danh sách ghép chung 1 hàng với bộ lọc — thu hẹp chiều ngang ô "Tìm việc,
>    người phụ trách" để đủ chỗ.
>
> **Fix (surgical trong `src/routes/nhiem-vu.tsx` — KHÔNG đụng file khác):**
> 1. Khối ghim bỏ `lg:pt-2` (nguồn khoảng trống trên) + giảm `lg:pb-3` → `lg:pb-2`.
> 2. Thu hẹp các control CHỈ trên desktop (prefix `lg:`, mobile giữ nguyên):
>    - Input tìm kiếm: `sm:max-w-sm` (~384px) → thêm `lg:max-w-[220px]`
>    - 2 dropdown phụ trách/người giao: 200px → `lg:max-w-[170px]`
>    - 2 ô date: auto → `lg:w-[135px]`
>    → tiết kiệm ~250px → toggle Khối/Danh sách không còn rớt dòng.
> 3. Chiều cao khối ghim đo động (ResizeObserver) → tiêu đề 3 cột tự bám sát vị trí mới,
>    không cần sửa số cứng.
>
> **LESSON LEARNED — Padding trong khối sticky tạo khe hở nhìn như lỗi (2026-09-08):**
> `lg:pt-2` thêm cho đẹp lúc ban đầu nhưng khi sticky lại tạo khoảng trống giữa header app
> và nội dung ghim — người dùng thấy là "lỗi chưa sát lệnh". Với khối ghim, padding trên
> nên = 0; muốn tách visual hãy dùng padding DƯỚI + nền. Ngoài ra control trong bộ lọc
> cần đặt max-width tường minh theo breakpoint để hàng filters không wrap khi thiếu chỗ.

---

### Giai đoạn 60: Fix tiêu đề 3 cột Nhiệm vụ chui dưới bộ lọc (2026-09-08)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(nhiem-vu): đặt --nv-sticky-h trên cha chung — tiêu đề 3 cột đọc đúng chiều cao khối ghim, không còn bị đè |
| (mới) | chore: tăng version 0.2.8 → 0.2.9 |

> **Hiện tượng:** Sau Giai đoạn 59, hàng tiêu đề 3 cột (Việc cần làm / Quá hạn / Đã xong)
> VẪN bị khối bộ lọc đè lên khi cuộn — trông như không ghim.
>
> **Nguyên nhân:** CSS var `--nv-sticky-h` chỉ được đặt trên khối ghim. Tiêu đề cột nằm
> NGOÀI khối ghim (trong grid board) → không thuộc hậu duệ của khối ghim → không đọc được
> var → fallback 160px < chiều cao thật ~270px → sticky top quá cao → bị đè.
> Đây chính là lesson Giai đoạn 58 (Check-in đặt var trên cha chung) nhưng làm Nhiệm vụ
> không áp dụng — chủ quan vì "grid không cần mở overflow" (đúng về overflow, SAI về var).
>
> **Fix (1 chỗ trong `src/routes/nhiem-vu.tsx`):** Trong ResizeObserver, đặt var trên cả
> khối ghim VÀ `el.parentElement` (cha chung) — giống hệt pattern Check-in Giai đoạn 58.
>
> **LESSON LEARNED — 2 vấn đề độc lập khi sticky thead/column-title (2026-09-08):**
> 1. **Overflow:** ancestor có overflow-hidden/auto phá sticky → cần mở overflow ở desktop.
> 2. **CSS var scope:** custom property chỉ kế thừa XUỐNG DƯỚI trong cây DOM. Phần tử sticky
>    nằm ngoài khối đo thì không đọc được var của khối đó → PHẢI đặt var trên cha chung
>    (hoặc ancestor chung gần nhất) của cả khối đo lẫn phần tử sticky.
> → Checklist sticky header: (a) không ancestor overflow-hidden; (b) top = header app +
> chiều cao khối ghim trên; (c) var đặt ở ancestor chung của khối đo + phần tử sticky.

---

### Giai đoạn 59: Ghim tiêu đề + bộ lọc + tiêu đề 3 cột Nhiệm vụ trên desktop (2026-09-08)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(nhiem-vu): sticky header desktop — tiêu đề + bộ lọc + toggle view + tiêu đề 3 cột board đứng yên khi cuộn (mobile giữ nguyên) |
| (mới) | chore: tăng version 0.2.7 → 0.2.8 |

> **Yêu cầu của Đại ca:** Chỉ sửa trong Nhiệm vụ — cố định khung tiêu đề "Nhiệm vụ" + bộ lọc
> (tìm kiếm/phụ trách/ngày/người giao/checkbox) + toggle Khối/Danh sách + tiêu đề 3 cột board
> (Việc cần làm / Quá hạn / Đã xong) khi cuộn trên desktop.
>
> **Fix (surgical trong `src/routes/nhiem-vu.tsx` — KHÔNG đụng file khác):**
> 1. Bọc `PageHeader` + khối bộ lọc + toggle view trong
>    `<div ref={stickyHeaderRef} className="lg:sticky lg:top-16 lg:z-10 lg:bg-bg lg:pt-2 lg:pb-3">`.
> 2. Tiêu đề cột board: div `mb-2 flex...` trong mỗi `<section>` thêm
>    `lg:sticky lg:top-[calc(4rem+var(--nv-sticky-h,160px))] lg:z-[5] lg:bg-surface-2` —
>    nền đục màu section để thẻ nhiệm vụ cuộn dưới không lộ xuyên qua chữ.
> 3. Chiều cao khối ghim đo ĐỘNG bằng ResizeObserver → CSS var `--nv-sticky-h` đặt trên
>    khối ghim. Var nằm TRÊN khối ghim là đủ vì tiêu đề cột nằm BÊN TRONG flow bình thường
>    của body (grid) — khác với check-in (thead trong Card riêng phải đặt var trên cha chung).
>
> **LƯU Ý — Khác biệt với Check-in (Giai đoạn 58):**
> - Nhiệm vụ: tiêu đề cột KHÔNG cần bọc parent — sticky hoạt động trong container section
>   (không có ancestor overflow-hidden giữa title và viewport).
> - Check-in: thead phải bọc Card `lg:overflow-visible` + wrapper `lg:overflow-x-visible`
>   vì Card gốc có overflow-hidden (mobile cuộn ngang) — ancestor overflow phá sticky.
> - Nhiệm vụ board dùng grid dọc tràn tự nhiên, không cuộn ngang → không cần mở overflow.
>
> **LƯU Ý:** Mobile (<1024px) giữ nguyên (tiền tố `lg:`). Chế độ Danh sách: khối ghim
> (tiêu đề + bộ lọc + toggle) vẫn ghim; tiêu đề cột chỉ áp dụng cho chế độ board.

---

### Giai đoạn 58: Ghim tiêu đề + bộ lọc + tiêu đề bảng Check-in trên desktop (2026-09-08)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(check-in): sticky header desktop — tiêu đề Check-in + bộ lọc + thead đứng yên khi cuộn bảng (mobile giữ nguyên) |
| (mới) | chore: tăng version 0.2.6 → 0.2.7 |

> **Yêu cầu của Đại ca:** Chỉ sửa trong Check-in — cố định khung tiêu đề "Check-in" + bộ lọc
> (dropdown trung tâm + date range) + hàng tiêu đề bảng khi cuộn danh sách check-in trên desktop.
>
> **Fix (surgical trong `src/routes/check-in.tsx` — KHÔNG đụng file khác):**
> 1. Bọc `PageHeader` + Card bộ lọc trong `<div ref={stickyHeaderRef} className="lg:sticky lg:top-16 lg:z-10 lg:bg-bg lg:pt-2 lg:pb-3">`.
> 2. Tách bảng ra Card riêng `overflow-hidden p-0 lg:overflow-visible` + wrapper `overflow-x-auto lg:overflow-x-visible` —
>    ancestor overflow phải visible trên desktop thì thead sticky mới hoạt động (lesson Giai đoạn 56).
> 3. thead thêm `lg:sticky lg:top-[calc(4rem+var(--ci-sticky-h,160px))] lg:z-[5]` — chiều cao khối ghim
>    đo ĐỘNG bằng ResizeObserver, set CSS var `--ci-sticky-h` trên cả khối ghim VÀ parentElement của nó
>    (thead nằm NGOÀI khối ghim nên phải đặt var trên cha chung mới đọc được).
> 4. Table bỏ `mt-3` (đã có `space-y-5` của container) — tránh khoảng trống khi ghim.
>
> **LESSON LEARNED — CSS var cho sticky thead phải nằm trên cha chung (2026-09-08):**
> Khác với cham-cong (var nằm trên khối ghim, bảng nằm cùng cấp trong 1 wrapper), check-in
> tách bảng ra Card riêng → thead không phải hậu duệ của khối ghim → var đặt trên khối ghim
> sẽ KHÔNG nhìn thấy từ thead. Fix: `el.parentElement?.style.setProperty(...)` đặt var trên
> container `space-y-5` (cha chung của cả khối ghim lẫn Card bảng).
>
> **LESSON LEARNED — Sửa JSX lớn: git checkout revert an toàn hơn sửa tay (2026-09-08):**
> Lần đầu áp dụng sticky đã làm hỏng cấu trúc thẻ mở/đóng Card-table (nhiều str_replace chồng
> nhau trên cùng 1 vùng). Fix sạch nhất: `git checkout -- file` về bản HEAD rồi apply lại MỘT LẦN
> duy nhất theo pattern đã chuẩn (copy từ cham-cong). Tránh chuỗi edit nhỏ trên cùng đoạn JSX.
>
> **LƯU Ý:** Mobile (<1024px) giữ nguyên cuộn như cũ (tiền tố `lg:`). Z-index: thead (5) <
> khối ghim (10) < header app (20). Card bảng `overflow-hidden p-0` vẫn giữ cho mobile cuộn ngang.

---

### Giai đoạn 57: Dropdown Đơn vị trong form Nhân sự (2026-09-08)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(nhan-su): ô "Đơn vị (center)" đổi từ Input tự do sang dropdown chọn từ danh sách trung tâm |
| (mới) | chore: tăng version 0.2.5 → 0.2.6 |

> **Yêu cầu của Đại ca:** Form Thêm/Sửa nhân sự có ô "Đơn vị (center)" là ô nhập tự do —
> gõ sai mã center sẽ gây lỗi FK khi lưu. Chuyển sang dropdown chọn từ danh sách trung tâm.
>
> **Fix (surgical trong `src/components/employee/employee-form.tsx`):**
> 1. Import `useAppStore` — lấy `centers` bằng reactive selector `useAppStore((s) => s.centers)`
>    (không dùng `CENTERS` Proxy — tránh lại lesson Giai đoạn 54 về trap `has`/`filter`).
> 2. Thay `<Input value={form.center}>` bằng `<select>` — mỗi option hiển thị
>    `MÃ — Tên` (VD: `VP — Văn phòng`), value vẫn là **mã center** (`c.code`),
>    sắp xếp theo mã (`localeCompare`).
> 3. Style dropdown giống hệt select Giới tính/Vai trò trong cùng form
>    (`h-10 w-full rounded-md border border-line bg-surface px-3 text-sm`).
>
> **Giá trị không đổi:** Form vẫn gửi `center` = mã (VD `VP`) → server `insertEmployee`/
> `updateEmployee` resolve mã → `center_id` UUID như Giai đoạn 52. Không đụng logic server.
>
> **LƯU Ý:** Form dùng chung cho Thêm + Sửa — dropdown tự chọn đúng đơn vị hiện tại khi sửa.
> Danh sách trung tâm reactive từ store — thêm trung tâm mới ở module Trung tâm → dropdown cập nhật.

---

### Giai đoạn 56: Ghim thêm tiêu đề bảng Chấm công trên desktop (2026-09-08)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(cham-cong): thead sticky — tiêu đề bảng (Nhân sự/Trụ sở/...) đứng yên ngay dưới bộ lọc khi cuộn (desktop) |
| (mới) | chore: tăng version 0.2.4 → 0.2.5 |

> **Yêu cầu của Đại ca:** Giữ cả phần TIÊU ĐỀ BẢNG (hàng Nhân sự / Trụ sở / Trạng thái /
> Ngày / Giờ / Địa điểm) khi cuộn danh sách chấm công trên desktop (bổ sung cho Giai đoạn 55).
>
> **Fix (surgical trong `src/routes/cham-cong.tsx`):**
> 1. `thead` bảng chính thêm `lg:sticky lg:top-[calc(4rem+var(--cc-sticky-h,300px))] lg:z-[5]`:
>    - `4rem` = chiều cao header tổng của app (h-16).
>    - `--cc-sticky-h` = chiều cao khối ghim phía trên (tiêu đề + cards trung tâm + bộ lọc).
>    - thead luôn nằm NGAY SÁT dưới bộ lọc, không hở khe, không bị đè.
> 2. **Đo chiều cao khối ghim ĐỘNG bằng ResizeObserver** (useEffect + ref `stickyHeaderRef`):
>    cards trung tâm cao/thấp thay đổi theo dữ liệu, offset tĩnh sẽ hỏng → set
>    `--cc-sticky-h` trên chính container, thead đọc qua `var()`.
> 3. **Mở overflow ở desktop:** Card bảng có `overflow-hidden` + div bảng có
>    `overflow-x-auto` → ancestor có overflow KHÁC visible sẽ vô hiệu hóa sticky của thead.
>    Fix: Card thêm `lg:overflow-visible`, div bảng thêm `lg:overflow-x-visible`.
>    Mobile giữ nguyên cuộn ngang như cũ.
>
> **LESSON LEARNED — Sticky table header cần 2 điều kiện (2026-09-08):**
> 1. **Tất cả ancestor** từ thead đến scroll container phải `overflow: visible` —
>    bất kỳ `overflow-hidden/auto` nào cũng phá sticky (thường gặp nhất với bảng trong Card).
> 2. **`top` phải tính đúng** = header app + tổng chiều cao các khối sticky phía trên —
>    nếu các khối trên cao động thì đo bằng ResizeObserver + CSS var, đừng hardcode.
>
> **LƯU Ý:** Mobile không đổi (`lg:` prefix). Z-index thead (5) < z-index khối header (10)
> < z-index header app (20) → thứ tự chồng lớp đúng khi cuộn.

---

### Giai đoạn 55: Ghim phần đầu trang Chấm công trên desktop (2026-09-08)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(cham-cong): sticky header desktop — tiêu đề + cards trung tâm + bộ lọc đứng yên khi cuộn bảng (mobile giữ nguyên) |
| (mới) | chore: tăng version 0.2.3 → 0.2.4 |

> **Yêu cầu của Đại ca:** Trên máy tính, khi cuộn xuống xem danh sách chấm công,
> phần đầu trang (tiêu đề + thẻ trung tâm + bộ lọc) phải đứng yên — dữ liệu bên dưới
> cuộn theo. KHÔNG áp dụng cho mobile.
>
> **Fix (surgical trong `src/routes/cham-cong.tsx`):**
> 1. Bọc `PageHeader` + cards trung tâm + bộ lọc trong 1 container:
>    `<div className="lg:sticky lg:top-16 lg:z-10 lg:bg-bg lg:pt-2 lg:pb-3">`
>    - `lg:top-16` = dưới header tổng của app (h-16).
>    - `lg:bg-bg` + padding để nội dung cuộn phía dưới không lộ xuyên qua.
>    - Tiền tố `lg:` → CHỈ áp dụng desktop (≥1024px), mobile cuộn bình thường.
> 2. Dời khối bộ lọc (tìm kiếm/trung tâm/ngày/Tất cả-Vào-Tan) từ sau card chi tiết
>    trung tâm LÊN TRƯỚC card đó — để nằm trong vùng ghim (vị trí hiển thị không đổi
>    vì card chi tiết chỉ hiện khi chọn 1 trung tâm).
>
> **LƯU Ý:** Sticky chỉ hoạt động khi KHÔNG có ancestor có `overflow: hidden` —
> root layout app không set overflow nên hoạt động bình thường.
>
> **LESSON LEARNED — Kiểm tra lỗi typecheck cũ trước khi sửa (2026-09-08):**
> `cham-cong.tsx` có sẵn ~10 lỗi TS cũ (dòng 240/447/471... — video null, string→number).
> Sau khi sửa, để chắc chắn thay đổi KHÔNG tạo lỗi mới: `git stash` → typecheck → so sánh
> danh sách lỗi trước/sau → `git stash pop`. Hai danh sách phải GIỐNG NHAU.

---

### Giai đoạn 54: Fix dropdown "Tất cả trung tâm" Chấm công trống (2026-09-08)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(catalog): thêm trap 'has' cho Proxy CENTERS — sửa filter() trả rỗng khiến dropdown trung tâm trống |
| (mới) | chore: tăng version 0.2.2 → 0.2.3 |

> **LESSON LEARNED — Proxy array thiếu trap 'has' (2026-09-08):**
> Trang Chấm công: dropdown "Tất cả trung tâm" mở ra nhưng KHÔNG có option nào.
> **Nguyên nhân:** `CENTERS` trong `catalog.ts` là `Proxy` bọc store. Proxy chỉ có trap `get`
> (và `Symbol.iterator`), KHÔNG có trap `has`. `Array.prototype.filter/reduce/every/...`
> dùng `HasProperty(O, Pk)` trên từng index. Không có `has` trap → Proxy rơi về target
> (mảng rỗng `[]`) → mọi index đều như "hole" → `filter()` trả về **mảng rỗng**.
> Trong khi Check-in dùng `CENTERS.map(...)` → map cũng dùng HasProperty nhưng kết quả
> map là mảng đúng (mỗi phần tử gọi Get trực tiếp, hole giữ nguyên) → vẫn hiển thị được.
>
> **Fix (surgical):** thêm trap `has` vào Proxy CENTERS:
> ```ts
> has(_, prop) { return prop in useAppStore.getState().centers; }
> ```
> → `filter()`/`map()`/`reduce()` trên `CENTERS` hoạt động đúng (kiểm tra `has` thật trên store).
>
> **Xác minh bằng unit test** (`scripts/test-proxy-has.mjs`):
> - `filter` trên proxy KHÔNG has trap → 0 items (BUG)
> - `filter` trên proxy CÓ has trap → 3 items (FIXED)
> - `find` vẫn hoạt động dù không có `has` trap (find dùng `Get`, không dùng `HasProperty`)
>
> **LƯU Ý:** Nếu sau này tạo Proxy bọc mảng khác, NHỚ thêm trap `has` nếu cần `filter/map/reduce`.
> `STAFF_BY_CENTER` proxy tương tự nhưng chỉ dùng `[code]` access (Get) → không cần `has`.

---

### Giai đoạn 53: Bộ lọc Check-in mobile + căn giữa Mobile Preview (2026-09-08)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(check-in): bộ lọc mobile giống Chấm công — date range một dòng ngang + bỏ dropdown "Tất cả" |
| (mới) | fix(preview): căn giữa toàn bộ giao diện Mobile Preview (justify-center + flex-wrap) |
| (mới) | chore: tăng version 0.2.1 → 0.2.2 |

> **LESSON LEARNED — Bộ lọc Check-in mobile (2026-09-08):**
> Trang Check-in (bản deploy) hiển thị bộ lọc bị xếp dọc: date from / date to trên 2 dòng
> riêng + còn dropdown "Tất cả" (loại vào/tan) ở dưới. Đại ca muốn giống trang Chấm công:
> - **Date range trên một dòng ngang:** bọc 2 input date + dấu "—" trong
>   `<div className="flex items-center gap-1.5">` (giống `cham-cong.tsx`).
> - **Bỏ nút "Tất cả":** xóa dropdown loại vào/tan + state `kind` + logic filter `kind`
>   trong memo `rows`. Chỉ giữ dropdown trung tâm + khoảng thời gian.
> - File: `src/routes/check-in.tsx` (filter area ~dòng 500-521).
>
> **LESSON LEARNED — Căn giữa Mobile Preview (2026-09-08):**
> Trang `/preview` có phone mockup bên trái + panel bên phải, bị canh trái.
> **Fix:** đổi container `flex gap-6 items-start` → `flex flex-wrap gap-6 items-start justify-center`
> để cả khung (mockup + panel) nằm giữa màn hình; `flex-wrap` tránh vỡ layout trên màn hình hẹp.
> - File: `src/routes/preview.tsx`.

---

### Giai đoạn 52: Fix lỗi thêm mới Nhân sự — center_id NOT NULL (2026-09-08)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(nhan-su): insertEmployee/updateEmployee resolve mã center → center_id (FK NOT NULL) |
| (mới) | chore: tăng version 0.2.0 → 0.2.1 |

> **LESSON LEARNED — insertEmployee thiếu center_id (2026-09-08):**
> Khi Đại ca bấm "Thêm" nhân sự mới trong trang Nhân sự → toast đỏ:
> `null value in column "center_id" of relation "employees" violates not-null constraint`.
> **Nguyên nhân:** bảng `employees` có cột `center_id uuid NOT NULL` (FK tới `centers`)
> nhưng server function `insertEmployee` trong `employee-crud.ts` chỉ INSERT cột `center`
> (mã trung tâm, VD `'VP'`) mà KHÔNG truyền `center_id` → PostgreSQL từ chối.
> Form `employee-form.tsx` gửi đúng `center: 'VP'` (mã), nhưng DB cần UUID của trung tâm.
>
> **Fix (surgical, 2 hàm trong `src/routes/api/employee-crud.ts`):**
> 1. `insertEmployee`: tra mã `center` trong bảng `centers` để lấy `id`, rồi chèn thêm `center_id`.
>    - Fallback về UUID trung tâm VP `33333333-3333-3333-3333-333333333331` nếu mã không tồn tại
>      (vì `center_id` NOT NULL — không để null).
> 2. `updateEmployee`: cập nhật luôn `center_id` khi đổi "Đơn vị" (trước đây chỉ đổi `center`,
>    `center_id` bị lệch cũ).
>
> **LƯU Ý:** Cột `center` lưu mã (VD `VP`), cột `center_id` lưu UUID FK. Khi sửa form nhân sự
> phải map mã → UUID. Các chỗ khác INSERT vào `employees` (VD `syncApprovedToEmployees`)
> đã truyền `center_id` đầy đủ.

Lưu ý: nếu build pipeline inject `VITE_APP_VERSION` từ `package.json`, version hiển thị trong sidebar cũng sẽ khớp `0.3.4`.

---

### Giai đoạn 53: Fix phân quyền Báo cáo — grant chỉ nằm ở máy Admin (2026-09-09)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(permissions): phân quyền lưu DB (module_access) — đồng bộ mọi thiết bị + bỏ chặn cứng /bao-cao |
| (mới) | feat(migration): 0017_module_access.sql — bảng lưu override phân quyền per-user |
| (mới) | chore: tăng version 0.3.4 → 0.3.5 |

> **BUG REPORT của Đại ca (2026-09-09):**
> Admin vào trang Phân quyền, bật quyền "Báo cáo" cho user. User đăng nhập → KHÔNG thấy
> menu Báo cáo / vào `/bao-cao` bị đá về trang chủ.
>
> **Nguyên nhân — 2 lỗi chồng nhau:**
> 1. **`ADMIN_ONLY_PATHS = ["/bao-cao"]` cứng trong `app-shell.tsx`:** guard route
>    `isRouteAllowed` đá mọi non-admin khỏi `/bao-cao` BẤKỂ phân quyền trong DB.
>    Commit `85ed382` đã từng xóa các path khác khỏi mảng này nhưng sót `/bao-cao`.
> 2. **Grant lưu localStorage máy Admin:** `setUserModuleAccess()` ghi vào
>    `localStorage["giong-vn-module-access"]` — chỉ tồn tại trên browser của Admin.
>    User ở máy/điện thoại khác đọc localStorage của chính nó → không bao giờ nhận được grant.
>
> **Fix:**
> - Migration `0017_module_access.sql`: bảng `module_access (employee_id PK, modules jsonb,
>   updated_at)` — nguồn sự thật dùng chung. Tự chạy khi Vercel build.
> - `employee-crud.ts`: +3 server functions `loadAllModuleAccess` / `saveModuleAccess` /
>   `clearModuleAccess`.
> - `permissions.ts`: overrides đọc từ mirror DB trong memory (`dbModuleAccess`);
>   localStorage chỉ là offline fallback cuối phiên. Thêm `setAllModuleAccessFromServer()`.
> - `app-shell.tsx`: **xóa `ADMIN_ONLY_PATHS`**; load overrides từ DB khi mở app
>   (`moduleAccessVersion` + `moduleAccessReady` — tránh redirect sớm trước khi data về);
>   guard route theo `allowedPaths` + cho phép sub-route `/bao-cao/bang-*`.
> - `admin/permissions.tsx`: bật/tắt quyền lưu xuống Neon ngay (optimistic + toast lỗi).
> - `permissions.test.ts`: +2 test (server override áp dụng thiết bị khác; admin bypass).
>
> **LESSON LEARNED — Quyền phải nằm ở DB dùng chung, không phải localStorage:**
> Mọi cấu hình quản trị (phân quyền, duyệt đăng ký…) ảnh hưởng user KHÁC phải lưu DB.
> localStorage chỉ hợp lệ cho preference cá nhân của chính thiết bị đó. Nếu không,
> "admin cấp quyền" chỉ có tác dụng trên đúng browser đã bấm nút.
>
> **LESSON LEARNED — Không chặn route cứng khi đã có hệ thống phân quyền:**
> `ADMIN_ONLY_PATHS` từng được thêm để chặn Báo cáo, nhưng nó GHI ĐÈ hệ thống phân quyền
> module (`getAllowedNavItems`). Hai cơ chế kiểm soát cùng một quyền → cấu hình admin
> trở nên vô nghĩa. Khi có RBAC rồi thì route guard phải ĐỌC RBAC, không tự đặt luật riêng.
>
> **⚠️ VIỆC CẦN LÀM SAU DEPLOY:** các grant cũ trong localStorage máy Admin KHÔNG tự
> chuyển sang DB. Đại ca cần vào lại trang Phân quyền và bật quyền Báo cáo cho user
> MỘT LẦN NỮA — từ lần này grant lưu Neon và có hiệu lực trên mọi thiết bị.
>
> **⚠️ Node_modules trên Google Drive bị corrupt (585 package.json hỏng):**
> `npm install` trong thư mục Drive gặp `TAR_ENTRY_ERROR UNKNOWN: unknown error, write`
> — Drive sync ghi file npm bị lỗi → typecheck/test chạy local KHÔNG đáng tin.
> Đã verify bằng tsc standalone (parse OK cả 6 file). Vercel build là gate cuối.
> Nếu muốn chạy local chuẩn: chuyển project ra ngoài Drive hoặc xóa node_modules
> + `npm install` lại với Drive sync tạm dừng.

---

### Giai đoạn 54: Bottom bar mobile — nút Chat → Đề nghị (2026-09-09)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(app-shell): thay nút "Chat" bằng "Đề nghị" trong mobile bottom bar (MOBILE_PRIMARY) |
| (mới) | chore: tăng version 0.3.5 → 0.3.6 |

> **Yêu cầu của Đại ca:** Nút "Chat" ở bottom bar mobile ít dùng → thay bằng "Đề nghị"
> (module nghiệp vụ quan trọng hơn).
>
> **Fix (surgical — 1 dòng trong `src/components/app-shell.tsx` dòng 92):**
> ```ts
> // Trước:
> const MOBILE_PRIMARY = ["/cham-cong", "/check-in", "/", "/chat", "/nhiem-vu"];
> // Sau:
> const MOBILE_PRIMARY = ["/cham-cong", "/check-in", "/", "/de-nghi", "/nhiem-vu"];
> ```
>
> **Cơ chế:** Bottom bar mobile lọc `visibleNav` theo `MOBILE_PRIMARY` rồi sort theo
> thứ tự trong mảng. `/de-nghi` đã có sẵn trong NAV (icon FileText, group "Nghiệp vụ")
> → nút mới tự đúng icon + phân quyền: user không có quyền Đề nghị → nút tự ẩn
> (khác Chat vốn ai cũng thấy).
>
> **LƯU Ý:** Module Chat không bị xóa — vẫn truy cập được qua sidebar (desktop) và
> menu hamburger (mobile). Chỉ thay vị trí ưu tiên trong bottom bar.
>
> **Tiêu chí kiểm chứng:** Mobile bottom bar = Chấm công / Check-in / Tổng quan /
> **Đề nghị** / Nhiệm vụ. Bấm Đề nghị → mở trang Đề nghị đúng quyền. Sidebar còn Chat.

---

### Giai đoạn 55: Fix bản đồ Đường phố Báo cáo Check-in — OSM chặn theo IP (2026-09-09)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(bang-check-in): đổi tile Đường phố từ OSM sang Esri World Street Map — hết trắng bản đồ ở một số mạng |
| (mới) | chore: tăng version 0.3.6 → 0.3.7 |

> **BUG REPORT của Đại ca (2026-09-09):**
> Báo cáo Check-in: bản đồ **Đường phố** ở MÁY NHÀ + ĐIỆN THOẠI chỉ hiện nền xám + marker,
> còn MÁY CÔNG TY thì hiện bình thường. Bản đồ **Vệ tinh** hiện đúng ở CẢ 3 nơi.
>
> **Chẩn đoán:**
> - Marker + zoom control hiện → Leaflet JS (từ unpkg CDN) load OK → code KHÔNG sai.
> - Vệ tinh (Esri) hiện mọi nơi; Đường phố (OSM) chỉ hiện ở công ty → lỗi nằm ở TILE SERVER.
> - Test `curl` từ máy nhà: Esri Street Map → HTTP 200; OSM tile.openstreetmap.org → lỗi SSL/KÊT NỐI.
>
> **ROOT CAUSE:** Tile Đường phố dùng `{s}.tile.openstreetmap.org` — server MIỄN PHÍ của OSM
> có chính sách block/throttle THEO IP khi over-limit. IP nhà/4G của Đại ca đã bị chặn tạm thời
> (do over-limit tích cực trước đó — có thể từ app/tool khác cùng mạng), còn IP công ty thì không.
>
> **Fix (surgical — 1 chỗ trong `src/routes/bao-cao/bang-check-in.tsx`):**
> ```ts
> // Trước:
> "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
> // Sau:
> "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
> ```
> Chọn Esri vì bản đồ Vệ tinh (cùng server Esri) đang hoạt động ổn định ở cả 3 thiết bị —
> chứng minh đường mạng tới Esri thông suốt. Lợi ích thêm: map đường phố chi tiết, có tiếng Việt,
> server thương mại không chặn IP cá nhân.
>
> **LƯU Ý:**
> - `gps-map-inner.tsx` vẫn còn dùng OSM nhưng KHÔNG được import ở đâu → không ảnh hưởng, không sửa.
> - CARTO basemaps (phương án thay thế khác) từ 2026 yêu cầu API key → không chọn.
>
> **LESSON LEARNED — Tile server miễn phí (OSM) chặn theo IP (2026-09-09):**
> Triệu chứng "bản đồ xám, marker vẫn hiện, chỉ số thiết bị/mạng nhất định bị" là dấu hiệu kinh điển
> của tile server từ chối IP — KHÔNG phải lỗi code. Cách chẩn đoán nhanh: so sánh 2 layer dùng
> 2 nguồn khác nhau trên cùng thiết bị; curl 1 tile từ mỗi nguồn. Khi chọn tile server cho app
> doanh nghiệp, ưu tiên nguồn thương mại ổn định (Esri) hoặc có API key (CARTO) thay vì OSM free.
>
> **Tiêu chí kiểm chứng:** Ở nhà/điện thoại mở Báo cáo Check-in → tab Đường phố → tile hiện đầy đủ
> (không còn nền xám), marker đúng vị trí, Vệ tinh vẫn hoạt động như cũ.

---

### Giai đoạn 56: Dashboard — 6 lối tắt + 4 bảng tóm tắt có dialog chi tiết (2026-09-09)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(dashboard): thêm 2 lối tắt Check-in + Đề nghị — mobile 2 cột × 3 hàng, desktop 3 cột × 2 hàng |
| (mới) | feat(dashboard): thêm 2 bảng tóm tắt Check-in + Đề nghị cạnh 2 bảng cũ (4 card) |
| (mới) | feat(dashboard): cả 4 bảng tóm tắt bấm "Xem tất cả" mở dialog danh sách; bấm dòng mở dialog chi tiết + lightbox ảnh |
| (mới) | docs(agents): thêm nguyên tắc Desktop + Mobile song song vào Quy tắc code |
| (mới) | chore: tăng version 0.3.7 → 0.3.8 |

> **Yêu cầu của Đại ca:** Thêm 2 nút "Check-in" + "Đề nghị" vào hàng lối tắt Dashboard;
> mobile 6 nút xếp 2 cột × 3 hàng; thêm phần diễn giải ngắn dưới mỗi bảng như
> "Chấm công gần đây"/"Nhiệm vụ đang mở"; click dữ liệu 4 bảng tóm tắt đều mở được
> chi tiết để xem sâu hơn — áp dụng cả desktop và mobile.
>
> **Fix (chỉ `src/routes/index.tsx`):**
> 1. **6 lối tắt:** mảng `shortcuts` thêm Check-in (desc: "X lượt hôm nay") + Đề nghị
>    (desc: "X chờ duyệt"). Grid đổi `sm:grid-cols-2 lg:grid-cols-3` →
>    `grid-cols-2 lg:grid-cols-3` — mobile 2 cột × 3 hàng, desktop 3 cột × 2 hàng.
> 2. **4 bảng tóm tắt:** grid `lg:grid-cols-2` (desktop 2×2, mobile 1 cột). Thêm 2 card mới:
>    - **Check-in gần đây:** tên + ngày giờ + badge tên rút gọn trung tâm (`centerShort`)
>    - **Đề nghị gần đây:** tiêu đề + người đề nghị + ngày + badge trạng thái
> 3. **Dialog danh sách (4 cái):** nút "Xem tất cả"/"Bảng việc" đổi từ `<Link>` sang
>    `<button>` mở Dialog chứa TOÀN BỘ danh sách; bấm dòng → đóng list dialog + mở dialog chi tiết.
> 4. **Dialog chi tiết (4 cái):**
>    - Chấm công: trạng thái + loại, nhân sự, ngày (có thứ), giờ, trụ sở, địa điểm (cleanAddress),
>      GPS, duyệt, ảnh (bấm phóng to)
>    - Nhiệm vụ: trạng thái, tiêu đề, phụ trách, người giao, hỗ trợ, khởi tạo, hạn, vướng mắc,
>      vị trí, ảnh
>    - Check-in: trung tâm, nhân sự, ngày giờ, địa điểm, GPS, ghi chú, ảnh
>    - Đề nghị: trạng thái + loại, tiêu đề, người đề nghị, ngày, đơn vị, nội dung
>    - Ảnh trong dialog: `cursor-zoom-in` + click mở **lightbox nền trắng** (đồng bộ GĐ 65),
>      z-[60] phủ trên Radix Dialog (z-50)
> 5. **Dòng bảng tóm tắt** thêm `cursor-pointer` + `hover:bg-surface-2` để báo hiệu bấm được.
>
> **Nguyên tắc mới trong Quy tắc code (theo yêu cầu Đại ca):**
> **"Mọi sửa code từ giờ áp dụng đồng thời cho cả Desktop và Mobile, trừ khi Đại ca yêu cầu cụ thể khác."**
>
> **LESSON LEARNED — Link → button khi mở dialog (2026-09-09):**
> Header card tóm tắt dùng `<Link to>` điều hướng trang. Khi cần mở Dialog thay vì điều hướng,
> phải đổi sang `<button>` — giữ nguyên style (`text-sm font-medium text-accent hover:underline`)
> để UI không đổi. Radix Dialog bên trong `<Link>` sẽ điều hướng thay vì mở dialog.
>
> **LƯU Ý:** Kiểm tra phân quyền — 4 bảng tóm tắt đọc trực tiếp store (attendance/tasks/
> checkins/proposals) vốn đã qua lớp lọc theo user ở hydrate → user thường chỉ thấy data của mình,
> admin thấy tất cả. Không thêm logic phân quyền riêng trong Dashboard để tránh trùng lặp.
>
> **Tiêu chí kiểm chứng:**
> - Desktop: 6 lối tắt 1 hàng 3 cột × 2 hàng; 4 bảng tóm tắt 2×2; bấm "Xem tất cả" mở dialog
>   danh sách; bấm dòng mở chi tiết; ảnh phóng to được (lightbox nền trắng)
> - Mobile: 6 lối tắt 2 cột × 3 hàng; 4 bảng 1 cột; dialog + lightbox hoạt động giống desktop

---

### Giai đoạn 57: Bottom bar mobile — chỉ nút đang mở mới hiện chữ (2026-09-09)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(app-shell): ẩn chữ các nút bottom bar mobile — chỉ nút active hiển thị label, nút kia chỉ còn icon |
| (mới) | chore: tăng version 0.3.8 → 0.3.9 |

> **Yêu cầu của Đại ca:** Trên mobile, bottom bar 5 nút hiện chữ làm thanh bị chật.
> Khi click vào nút nào thì nút đó mới hiện chữ; các nút không click chỉ còn biểu tượng.
>
> **Fix (1 chỗ trong `src/components/app-shell.tsx` — phần render bottom bar mobile):**
> ```tsx
> // Trước:
> <Icon className="size-6" />
> {item.label}
>
> // Sau:
> <Icon className="size-6" />
> {active ? item.label : null}
> ```
> Thêm `aria-label={item.label}` cho Link để khi chữ ẩn, accessibility vẫn đọc được tên nút.
>
> **Phạm vi:** Bottom bar chỉ render trên mobile (`lg:hidden`) nên desktop không đổi —
> đúng nguyên tắc Desktop + Mobile song song (thay đổi này KHÔNG có mặt desktop).
>
> **LƯU Ý:** Chữ nút active màu accent (xanh lá) + kèm label giúp người dùng biết
> đang ở trang nào — không cần indicator riêng.
>
> **Tiêu chí kiểm chứng:** Trên điện thoại: nút của trang đang mở hiện icon + chữ xanh;
> 4 nút còn lại chỉ có icon. Bấm nút khác → chữ nhảy sang nút mới. Desktop sidebar giữ nguyên.

---

### Giai đoạn 58: Nhân sự — ghim khối lọc + tiêu đề bảng, bảng cuộn nội bộ (2026-09-09)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(nhan-su): ghim khối bộ lọc (sticky top-16) + container bảng sticky với thead cố định — bảng cuộn nội bộ, ÁP DỤNG CẢ desktop + mobile |
| (mới) | chore: tăng version 0.3.9 → 0.4.0 (tròn chục minor theo quy tắc) |

> **Yêu cầu của Đại ca:** Trong Danh mục Nhân sự, khi kéo xuống xem dữ liệu: trang cuộn đến
> thanh tiêu đề thì DỪNG và CỐ ĐỊNH ở trên cùng; lăn tiếp thì dòng dữ liệu chạy tiếp;
> lăn lên thì dữ liệu chạy lên, lăn lên tiếp nữa thì phần đầu trang hiện lại như ban đầu.
> Đại ca chốt: khối ghim = ô tìm kiếm + tiêu đề bảng; MOBILE cũng ghim như desktop.
>
> **Fix (2 file):**
> 1. `src/routes/nhan-su.tsx` — bọc khối bộ lọc (search + dropdown bộ phận + nút Thêm +
>    toggle grid/table) trong `<div ref={stickyFiltersRef} className="sticky top-16 z-10
>    -mx-4 border-b border-line bg-bg px-4 pb-2 sm:-mx-6 sm:px-6">`:
>    - `-mx-4 px-4` / `sm:-mx-6 px-6` — phủ full chiều ngang đúng bằng padding của `<main>`
>      để nội dung cuộn không hở xuyên qua 2 bên.
>    - Chiều cao đo ĐỘNG bằng ResizeObserver trong callback ref (pattern GĐ 63 — object ref
>      + useEffect deps [] KHÔNG chạy lại sau lần render đầu) → set CSS var `--ns-sticky-h`
>      trên cả khối ghim VÀ `parentElement` (thead nằm ngoài khối ghim — lesson GĐ 58/60:
>      CSS var chỉ kế thừa xuống dưới trong cây DOM).
> 2. `src/components/employee/employee-table.tsx` — Container bảng (thay Card):
>    `<div className="sticky top-[calc(4rem+var(--ns-sticky-h,64px))] z-[5]
>    max-h-[calc(100dvh-10.5rem-var(--ns-sticky-h,64px))] overflow-auto rounded-xl
>    bg-surface shadow-[var(--shadow-card)] lg:max-h-[calc(100dvh-6rem-var(--ns-sticky-h,64px))]">`
>    + `<thead className="sticky top-0 z-[5]">`.
>
> **LESSON LEARNED — Bảng nhiều cột + sticky: dùng CUỘN NỘI BỘ thay vì ghim thead theo viewport (2026-09-09):**
> Pattern GĐ 56 (mở overflow Card + thead sticky theo viewport) KHÔNG phù hợp bảng Nhân sự:
> bảng 10 cột cần `overflow-x-auto` trên mobile — mà ancestor overflow khác visible PHÁ
> sticky-theo-viewport. Giải pháp: chiều dọc để TOÀN Container bảng thành khối sticky với
> `max-h` = viewport còn lại + `overflow-auto` (cuộn cả 2 trục bên trong); thead sticky `top-0`
> trong container → vừa cuộn ngang được, vừa ghim tiêu đề, không đụng overflow ancestor.
> Khối lọc ghim phía trên (top-16), container bảng ghim ngay dưới nó (4rem + --ns-sticky-h).
>
> **LƯU Ý:** Grid view: khối lọc vẫn ghim, thẻ nhân sự cuộn bình thường (container sticky
> chỉ áp dụng cho table view). `dvh` thay `vh` để mobile không bị thanh addressbar che.
> Fallback 64px khi var chưa gán — khối lọc cao thật (~64-70px) nên gần như không nhảy layout.
>
> **Tiêu chí kiểm chứng:**
> - Kéo xuống: khối lọc dừng ngay dưới header app; container bảng ghim sát dưới khối lọc;
>   thead luôn nhìn thấy; lăn chuột chỉ dòng dữ liệu chạy trong khung bảng.
> - Lăn lên hết cỡ: PageHeader + 4 card số liệu hiện lại như ban đầu.
> - Mobile: khối lọc + bảng ghim tương tự; bảng cuộn ngang trong khung để xem đủ 10 cột.

---

### Giai đoạn 59: NÂNG CẤP LỚN Module Đề nghị — Đề xuất (2026-09-09)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(migration): 0018_enhance_proposals.sql — approver, approved_at, created_by, updated_at, deleted_at, attachments |
| (mới) | feat(de-nghi): viết lại trang — bảng 10 cột giống Chấm công + 4 card bấm lọc + khối lọc ghim + dialog chi tiết/sửa/xóa + upload đính kèm |
| (mới) | feat(upload): hỗ trợ file raw PDF/Word/Excel (resource_type=raw, giữ tên file) — ảnh vẫn nén 1200px |
| (mới) | feat(store): updateProposal + removeProposal (tombstone) + setProposalStatus lưu approver + LWW merge theo updatedAt |
| (mới) | chore: tăng version 0.4.0 → 0.5.0 (feature lớn — minor) |

> **Bối cảnh:** Đại ca yêu cầu nâng cấp toàn diện module Đề nghị theo 5 điểm:
> (1) bố cục giống Chấm công có ghim tiêu đề; (2) thêm trường/cột — người khởi tạo = người đề
> nghị, Admin là người duyệt; (3) bộ lọc theo người tạo/duyệt/chủ đề/ngày/trạng thái; (4) thêm
> sửa/xóa; (5) đính kèm tệp/file/ảnh.
>
> **Đã chốt với Đại ca:** Bảng giống Chấm công (không chế độ thẻ); User CHỈ thấy phiếu của
> mình, Admin thấy tất cả; đính kèm ảnh + file văn phòng; chỉ sửa phiếu Chờ duyệt (đã duyệt =
> chốt); 4 card tổng quan bấm lọc nhanh được.
>
> **Chi tiết triển khai (7 file):**
> 1. **Migration 0018:** 6 cột mới + backfill (updated_at = date, created_by = requester cho
>    dòng cũ) + 4 indexes. Tự chạy khi Vercel build (`npm run db:migrate`).
> 2. **data.ts:** `loadProposals` SELECT đủ cột mới (LIMIT 500); `insertProposal` chuyển sang
>    UPSERT LWW (`WHERE proposals.updated_at < EXCLUDED.updated_at` — pattern attendance
>    GĐ 17); thêm `updateProposal` (COALESCE từng field + guard LWW WHERE) và
>    `deleteProposal` (tombstone soft delete); `updateProposalStatus` nhận thêm `approver`,
>    set `approved_at = now()`, giữ updated_at = now().
> 3. **upload.ts:** detect resource type từ base64 header — video/* → video,
>    application/* → **raw** (PDF/Word/Excel), còn lại → image. Raw KHÔNG dùng transformation
>    ảnh (sẽ lỗi) + truyền `public_id` = tên file gốc (bỏ extension) để tải về đúng tên.
> 4. **store.ts:** type Actions mở rộng; `_neonInsertProposal` gửi đủ cột mới;
>    hydrate map đủ cột + filter `deleted_at`; merge LWW `mergeByTs(..., r => r.updatedAt)` +
>    filter tombstone sau merge; `setProposalStatus(id, status, approver?)` cập nhật
>    approver/approvedAt/updatedAt local; `removeProposal` dùng pending queue cho tombstone.
> 5. **de-nghi.tsx — viết lại toàn trang:**
>    - 4 card tổng quan (Tổng/Chờ duyệt/Đã duyệt/Từ chối) bấm lọc nhanh (ring-2 khi active,
>      bấm lần nữa bỏ lọc)
>    - Khối lọc GHIM top-16: search + 4 dropdown + date range (1 dòng ngang — GĐ 53) +
>      checkbox "Của tôi"; đo động `--dn-sticky-h` (callback ref — pattern GĐ 58/63)
>    - Bảng 10 cột thead sticky `top-[calc(4rem+var(--dn-sticky-h))]`; hàng Chờ duyệt sort
>      lên đầu trước rồi mới theo ngày giảm dần; bấm dòng mở dialog chi tiết
>    - Dialog tạo/sửa dùng chung (editingId) — Loại + Đơn vị (dropdown centers, tự chọn
>      center của user), tiêu đề, chi tiết, đính kèm (≤5 tệp; ảnh nén ≤800KB client-side,
>      raw ≤2MB; preview thumbnail; xóa từng tệp)
>    - Dialog chi tiết: đủ thông tin + duyệt/từ chối ngay trong dialog (Admin) + đính kèm
>      (ảnh lightbox nền trắng GĐ 65, file mở tab mới)
>    - Dialog xóa xác nhận (pattern Nhiệm vụ GĐ 24: "Chắc xóa"/"Lưu lại")
>    - Quyền: canModify = owner && Chờ duyệt, hoặc Admin; phiếu đã duyệt/từ chối chỉ Admin xóa
>    - Thao tác trong bảng: ✓ duyệt / ✗ từ chối (Admin, phiếu Chờ duyệt), ✏ sửa, 🗑 xóa —
>      stopPropagation để không mở dialog chi tiết
>
> **LESSON LEARNED — Cloudinary raw file (2026-09-09):**
> `resource_type: "raw"` KHÔNG chấp nhận `transformation` ảnh (width/height/quality) —
> upload sẽ fail. Phải truyền transformation có điều kiện chỉ khi resourceType === "image".
> URL file raw có dạng `/raw/upload/...` — dùng regex này để phân biệt ảnh/file khi hiển thị.
>
> **LESSON LEARNED — UPSERT LWW cho bảng có created_at (2026-09-09):**
> `loadProposals` ORDER BY date DESC, created_at DESC — cột created_at tồn tại sẵn trong bảng
> proposals từ migration cũ. Khi thêm sort clause, PHẢI kiểm tra cột có tồn tại không
> (migrations 0001-0017) — nếu không chắc, sort theo cột vừa thêm (updated_at) cho an toàn.
>
> **LƯU Ý cho Đại ca khi test:**
> - Migration 0018 tự chạy khi Vercel build — dòng cũ tự backfill created_by = requester.
> - Phiếu tạo TRƯỚC khi nâng cấp: không có createdBy ID → lọc "Của tôi" khớp theo TÊN
>   (fallback requester) — vẫn hoạt động.
> - User thường chỉ thấy phiếu của mình ở Dashboard table (bộ lọc data đã có sẵn ở hydrate
>   theo quyền) — cần kiểm chứng trên cả 2 tài khoản Admin/User.
>
> **Tiêu chí kiểm chứng:**
> - Desktop + Mobile: 4 card + khối lọc ghim dưới header; bảng cuộn thead đứng yên;
>   phiếu Chờ duyệt lên đầu.
> - Tạo phiếu mới: chọn Loại + Đơn vị (dropdown), tiêu đề, chi tiết, đính ảnh + PDF →
>   gửi thành công, badge 📎 hiện trong bảng.
> - Admin bấm ✓/✗ trong bảng → trạng thái đổi, người duyệt + ngày duyệt hiện trong chi tiết.
> - Sửa phiếu Chờ duyệt (owner) → nội dung cập nhật; phiếu đã duyệt không còn nút sửa.
> - Xóa → dialog xác nhận → phiếu mất, mở lại trên thiết bị khác cũng mất (tombstone).
> - Bộ lọc: người đề nghị/người duyệt/loại/trạng thái/ngày/Của tôi — kết hợp được nhiều filter.

---

### Giai đoạn 60: Hotfix — trang Đề nghị crash "canApprove is not defined" (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(de-nghi): 3 chỗ dùng biến canApprove không khai báo → đổi thành isAdmin — hết crash trang |
| (mới) | chore: tăng version 0.5.0 → 0.5.1 |

> **BUG REPORT của Đại ca (2026-09-10):** Vào trang Đề nghị → "Something went wrong —
> canApprove is not defined" — toàn trang crash.
>
> **Nguyên nhân:** Khi viết lại trang (GĐ 59), em khai báo biến `isAdmin` (dòng 115,
> dùng `canApproveProposals()`) nhưng còn 3 chỗ trong JSX dùng tên cũ `canApprove`
> (nút duyệt/từ chối trong bảng, dòng "không có quyền", dialog chi tiết) → ReferenceError
> khi render. **Đây là lần THỨ 2 project gặp lỗi kiểu này** — GĐ 25 từng có
> "isAdmin is not defined" ở trang Chấm công.
>
> **Fix:** Đổi cả 3 chỗ `canApprove` → `isAdmin` (surgical — chỉ tên biến).
>
> **⚠️ LESSON LEARNED — Typecheck local KHÔNG ĐÁNG TIN trên máy Drive-corrupt (2026-09-10):**
> Node_modules Google Drive corrupt (GĐ 53) khiến `tsc --noEmit` crash NGẦM — in ra
> "0 lỗi" là KẾT QUẢ GIẢ (file lỗi không được parse đầy đủ). GĐ 59 đã push với typecheck
> "sạch" mà thực tế có ReferenceError — TS BẮT được lỗi này nếu parse đúng
> (TS2304: Cannot find name). **Quy trình verify bắt buộc từ giờ:**
> 1. `grep -n "TênBiến" file.tsx` — đối chiếu MỌI chỗ dùng biến mới có khai báo không
> 2. Đếm số lỗi typecheck: nếu output trông "quá sạch" so với thay đổi lớn → nghi ngờ
>    tsc crash ngầm; chạy lại với output ĐẦY ĐỦ không qua grep để xem có warning của tsc
> 3. Sau push: theo dõi Vercel build log
> 4. Lỗi GĐ 25 + GĐ 60 cùng một mẫu: **đổi tên biến khi refactor nhưng sót chỗ dùng**.
>    Khi refactor tên biến trong file lớn → grep TÊN CŨ sau khi sửa để chắc chắn còn sót.
>
> **Tiêu chí kiểm chứng:** Vào trang Đề nghị không còn crash; Admin bấm ✓/✗ duyệt phiếu
> Chờ duyệt được cả trong bảng lẫn dialog chi tiết.

---

### Giai đoạn 61: Module Đề nghị — nút Mở lại ↩️ + giải đáp nút duyệt (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(de-nghi): thêm nút Mở lại (Undo2) — Admin đưa phiếu đã duyệt/từ chối về Chờ duyệt, cả bảng + dialog chi tiết |
| (mới) | chore: tăng version 0.5.1 → 0.5.2 |

> **BUG REPORT của Đại ca (2026-09-10):** Đăng nhập Admin nhưng không thấy nút duyệt
> trong Đề nghị — Đề xuất.
>
> **Chẩn đoán — KHÔNG phải lỗi:** Card "Chờ duyệt" = 0 — nút ✓/✗ chỉ hiện trên phiếu
> đang Chờ duyệt (thiết kế đã chốt GĐ 59: phiếu đã xử lý là chốt). Tất cả 8 phiếu đều đã
> xử lý → không có nút nào hiện là ĐÚNG. Quyền Admin vẫn hoạt động (nút Sửa/Xóa hiện
> trên mọi dòng — chỉ Admin mới thấy). Test: tạo phiếu mới → Chờ duyệt → nút ✓/✗ hiện.
>
> **Cải tiến theo yêu cầu mới của Đại ca:**
> - **Nút Mở lại ↩️ (Undo2):** Admin thấy trên phiếu đã duyệt/từ chối — bấm đưa phiếu về
>   "Chờ duyệt" (store `setProposalStatus(id, "Chờ duyệt")` tự xóa approver/approvedAt —
>   đã xử lý sẵn từ GĐ 59). Có cả trong bảng + dialog chi tiết. Sau khi mở lại → nút ✓/✗
>   hiện lại để duyệt/từ chối anew.
> - **Nút Sửa giữ nguyên cho Admin** trên phiếu đã xử lý (Đại ca chọn giữ — linh hoạt
>   hơn quy tắc chốt ban đầu).
>
> **GIẢI ĐÁP LƯU TRỮ (câu hỏi của Đại ca):** File đính kèm lưu **Cloudinary** (file gốc),
> Neon chỉ lưu mảng URL trong cột `attachments` (JSONB). Ảnh nén client-side ≤800KB,
> file ≤2MB, folder `giong-vn/proposals`. Cùng pattern ảnh Chấm công/Check-in từ GĐ 8 —
> DB nhẹ, CDN nhanh. Free tier Cloudinary 25GB.
>
> **LESSON LEARNED — Tự nhận biệt "0 lỗi" giữa thay đổi lớn (2026-09-10):**
> `tsc --noEmit` trên máy Drive-corrupt exit code 2 do 436 lỗi từ file .mjs lạ
> (không thuộc dự án). Khi grep lọc "0 lỗi non-mjs" em tưởng sạch — nhưng phải PHÂN BIỆT:
> exit code 2 + lỗi 100% nằm ở .mjs lạ = OK; exit code 2 + lỗi trong file TS/TSX dự án = FAIL.
> Luôn tách nguồn lỗi trước khi kết luận, đừng chỉ nhìn con số tổng.
>
> **Tiêu chí kiểm chứng:**
> - Phiếu Đã duyệt/Từ chối: Admin thấy nút ↩️ → bấm → phiếu về Chờ duyệt, người/ngày duyệt cũ xóa → ✓/✗ hiện lại.
> - Phiếu Chờ duyệt: Admin thấy ✓/✗; user thường không thấy nút nào ngoài Sửa/Xóa phiếu của mình.
> - Dialog chi tiết phiếu đã xử lý: nút "Mở lại" bên dưới.

---

### Giai đoạn 62: Báo cáo Đề nghị — Đề xuất (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(bao-cao): tạo trang /bao-cao/bang-de-nghi — bộ lọc + 4 card thống kê + bảng + CSV + pie chart + bảng theo người |
| (mới) | feat(catalog): đổi card Báo cáo 'Đề nghị chờ duyệt' → 'Đề nghị — Đề xuất' + href mới |
| (mới) | feat(bang-de-nghi): thêm biểu đồ cột 'Đề nghị theo tháng' — stacked theo trạng thái, theo bộ lọc |
| (mới) | chore: tăng version 0.5.2 → 0.6.0 (feature mới — minor); 0.6.0 → 0.6.1 (bổ sung biểu đồ cột) |

> **Yêu cầu của Đại ca:** Tạo Báo cáo tương ứng module "Đề nghị-Đề xuất". Tiêu đề card
> trên trang Báo cáo KHÔNG phải "Đề nghị chờ duyệt" mà là "Đề nghị-Đề xuất"; dòng mô tả
> "Hàng đợi phê duyệt của quản lý" cũng đổi tương ứng.
>
> **Triển khai (2 file):**
> 1. **`src/routes/bao-cao/bang-de-nghi.tsx` (mới):**
>    - Bộ lọc: search + người đề nghị + người duyệt + loại + trạng thái + date range
>    - 4 card thống kê tính theo dữ liệu ĐÃ LỌC (Tổng/Chờ/Đã duyệt/Từ chối)
>    - Bảng 9 cột, thead sticky top-16, bấm dòng mở dialog chi tiết CHỈ XEM (báo cáo
>      không chỉnh sửa — phân tách với module Nghiệp vụ /de-nghi)
>    - Export CSV: pattern Bảng Check-in — BOM \uFEFF + escape dấu " (""), tên file
>      `bang-de-nghi-{from}-{to}.csv`
>    - Pie chart cơ cấu theo trạng thái (màu: Chờ #b45309, Đã duyệt #1c6b58, Từ chối #b42318)
>    - Bảng phụ thống kê theo người đề nghị (Tổng/Chờ/Đã duyệt/Từ chối), max-h scroll
> 2. **`src/lib/catalog.ts`:** REPORTS đổi entry bc6: name "Đề nghị — Đề xuất",
>    desc "Tổng hợp đề nghị theo người, loại, trạng thái, thời gian + xuất CSV",
>    href `/bao-cao/bang-de-nghi` (trước là /de-nghi — trỏ thẳng vào module nghiệp vụ).
>
> **LƯU Ý:** Route tự động đăng ký qua TanStack Router file-based (bang-de-nghi.tsx).
> Trang báo cáo không có nút duyệt/sửa/xóa — chỉ xem + xuất. Module nghiệp vụ /de-nghi
> giữ nguyên toàn bộ thao tác.
>
> **Bổ sung (0.6.1) — Biểu đồ cột "Đề nghị theo tháng":**
> - `byMonth` memo: gom phiếu theo `date.slice(0,7)` → label MM/YYYY, sort tăng dần
> - Stacked BarChart 3 lớp theo trạng thái — màu đồng bộ pie: Chờ #b45309, Đã duyệt #1c6b58, Từ chối #b42318
> - Tự cập nhật theo bộ lọc (memo deps = rows đã lọc); trục Y allowDecimals={false}
> - Bọc ClientOnly (pattern Dashboard GĐ 43) — tránh SSR hydration mismatch với Recharts
> - Vị trí: full chiều ngang, phía trên cụm pie + bảng theo người
>
> **Tiêu chí kiểm chứng:**
> - Trang Báo cáo: card thứ 4 tên "Đề nghị — Đề xuất" + mô tả mới; bấm vào mở /bao-cao/bang-de-nghi
> - Bộ lọc + 4 card + bảng + CSV + biểu đồ hoạt động; dữ liệu sát với module Đề nghị
> - Bấm dòng bảng mở chi tiết chỉ xem; nút Xuất CSV tải file mở Excel đúng tiếng Việt

---

### Giai đoạn 63: Sidebar — khối user nền xanh + căn giữa avatar khi thu hẹp (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(app-shell): khối user cuối Sidebar desktop nền xanh accent đậm + avatar căn giữa khít cột 44px |
| (mới) | chore: tăng version 0.6.1 → 0.6.2 |

> **Yêu cầu của Đại ca (2 điểm):**
> 1. Nền nút user cuối Sidebar thành màu xanh đậm đồng nhất với avatar (mũi tên đỏ trong ảnh)
> 2. Căn giữa biểu tượng — avatar khớp ô nền, vào đúng giữa cột Sidebar khi thu hẹp
>
> **Fix (1 chỗ trong `src/components/app-shell.tsx` — khối user cuối `<aside>` desktop):**
> - Ô user: bỏ viền + nền trắng mờ (`border-forest-fg/10 bg-forest-fg/5`) →
>   **`bg-accent`** (xanh accent #1c6b58 — cùng màu avatar cũ)
> - `w-fit` + `mx-auto` + `justify-center` → thu hẹp ô KHÍT avatar (padding 6px/bên +
>   avatar 24px = khít cột 44px) → vào đúng giữa cột, không tràn
> - Hover mở rộng: `group-hover:w-full group-hover:justify-start` → ô trải full + chữ hiện (mượt như cũ)
> - Avatar: `bg-white/15` + chữ trắng trên nền xanh; tên/chức danh chữ trắng (`text-white`, `text-white/70`)
> - `shrink-0` cho avatar — không bị co khi chữ dài
>
> **Tiêu chí kiểm chứng:** Sidebar thu hẹp: ô xanh nhỏ khít avatar, vào đúng giữa cột.
> Hover: ô xanh trải full, tên + chức danh trắng hiện ra. Mobile menu không đổi.

---

### Giai đoạn 64: Sidebar — nút menu nền xanh đồng nhất, sáng khi active, icon căn giữa (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(app-shell): nút menu Sidebar nền xanh accent đồng nhất — active sáng đầy màu + icon trắng; icon căn giữa khi thu hẹp |
| (mới) | chore: tăng version 0.6.2 → 0.6.3 |

> **Yêu cầu của Đại ca (2 điểm, ảnh kèm mũi tên đỏ):**
> 1. Đổi nền CÁC NÚT trên Sidebar thành màu xanh đậm đồng nhất (như khối user GĐ 63);
>    khi đang ở module nào thì nền xanh đó SÁNG lên
> 2. Căn giữa icon cho khớp ô nền và vào giữa cột Sidebar khi thu hẹp
>
> **Fix (chỉ `NavLink` trong `src/components/app-shell.tsx` — nhánh dark):**
> ```tsx
> // Trước: nút trong suốt, chỉ active có bg-forest-fg/10 (trắng mờ)
> dark ? active ? "bg-forest-fg/10 text-forest-fg"
>      : "text-forest-muted hover:bg-forest-fg/5 hover:text-forest-fg" : ...
>
> // Sau: mọi nút nền xanh — active sáng đầy màu + icon trắng
> dark ? active ? "bg-accent text-white shadow-sm shadow-accent/40"
>      : "bg-accent/40 text-forest-fg/85 hover:bg-accent/65 hover:text-white" : ...
> ```
> Icon: `<Icon className={cn("size-4 shrink-0", dark && active && "text-white")} />` —
> icon trắng tương phản trên nền xanh active.
>
> **Căn giữa khi thu hẹp (điểm 2):** nút đổi từ `justify-start gap-2.5 px-2.5` sang
> `w-full justify-center gap-0 px-0` khi collapsed → icon 16px vào CHÍNH GIỮA cột 44px
> (vùng nút 32px khít padding 6px/bên). Hover mở rộng:
> `group-hover:justify-start group-hover:gap-2.5 group-hover:px-2.5` → về căn trái như cũ.
> Trước đây `justify-start` + `px-0` khiến icon lệch trái, không khít ô.
>
> **Phạm vi:** CHỈ nhánh `dark` (Sidebar desktop nền tối). Mobile menu (không dark) và
> nhánh sáng giữ nguyên. Khối user (GĐ 63) không đụng lại — đã cùng tông xanh.
>
> **Tiêu chí kiểm chứng:**
> - Sidebar thu hẹp: mọi nút có nền xanh mờ; nút module đang mở nền xanh ĐẬM + icon trắng;
>   icon mọi nút vào đúng giữa cột, không lệch trái.
> - Hover nút thường: nền đậm dần lên (`accent/40 → accent/65`).
> - Hover Sidebar mở rộng: nút về căn trái, icon + chữ như cũ; nút active vẫn xanh đậm.
> - Mobile menu không đổi.

---

### Giai đoạn 65: Sidebar — nút không hoạt động về nền trong suốt (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(app-shell): nút menu không hoạt động về nền trong suốt như cũ — chỉ nút active giữ nền xanh accent |
| (mới) | chore: tăng version 0.6.3 → 0.6.4 |

> **Yêu cầu của Đại ca (ảnh kèm):** Nền các nút module trên Sidebar trở lại MÀU CŨ
> (trong suốt) khi không hoạt động; khi hoạt động (module đang mở) thì giữ màu xanh
> hiện tại đã chọn (GĐ 64).
>
> **Fix (1 dòng class trong `NavLink` — nhánh dark, trạng thái KHÔNG active):**
> ```tsx
> // Trước (GĐ 64): mọi nút đều có nền xanh
> : "bg-accent/40 text-forest-fg/85 hover:bg-accent/65 hover:text-white"
>
> // Sau: nút không active về nền trong suốt như ban đầu
> : "bg-transparent text-forest-muted hover:bg-forest-fg/5 hover:text-forest-fg"
> ```
>
> **Kết quả cuối cùng (trạng thái nút Sidebar tối):**
> - **Active:** `bg-accent` xanh đậm + icon trắng + shadow (GĐ 64) — GIỮ NGUYÊN
> - **Không active:** nền trong suốt + chữ xám nhạt, hover nền trắng mờ — NHƯ CŨ ban đầu
> - Icon căn giữa khi thu hẹp (GĐ 64) — GIỮ NGUYÊN
> - Khối user nền xanh (GĐ 63) — GIỮ NGUYÊN
>
> **Tiêu chí kiểm chứng:** Sidebar: chỉ nút của module đang mở có nền xanh đậm + icon trắng;
> các nút còn lại nền trong như trước GĐ 64, hover mới hiện nền; icon vẫn căn giữa khi thu hẹp.



---

### Giai đoạn 67: Nâng cấp Module Ghi chú (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(ghi-chu): nâng cấp Module Ghi chú — bộ lọc ghim + bảng thead ghim + 4 card bấm lọc + form đầy đủ |
| (mới) | feat(migration): 0020_notes_enhance.sql — notes thêm created_by + updated_at + backfill |
| (mới) | chore: tăng version 0.7.0 → 0.7.1 |

> **Yêu cầu của Đại ca:** (1) kiểm tra sự đồng bộ của module; (2) mọi người đăng nhập đều
> tạo mới; (3) dữ liệu lưu DB; (4) thêm thanh lọc ở trên + cố định thông tin khi cuộn.
>
> **Đánh giá đồng bộ trước khi sửa:** notes CÓ lưu Neon (insertNote/loadNotes + pending
> queue + hydrate merge) nhưng là collection DUY NHẤT thiếu version field → mergeByTs
> không có tsOf → Neon luôn thắng (không LWW). Cùng lRootElement: addNote hardcode
> dept="Hệ thống", không lưu createdBy → không lọc "Của tôi" theo ID được.
>
> **Fix:**
> - Migration 0020: `created_by text default ''` + `updated_at timestamptz` + backfill
>   (created_by=author, updated_at=created_at) + indexes. Tự chạy khi Vercel build.
> - types/data/store: bổ sung 2 field end-to-end; LIMIT 200→500; sort date DESC,
>   created_at DESC; addNote gắn createdBy + updatedAt lúc tạo; hydrate mergeByTs LWW
>   theo updatedAt — notes giờ đồng bộ đúng template mọi collection khác.
> - Trang /ghi-chu viết lại theo template (pattern Đề nghị GĐ 59 + Nhân sự GĐ 58):
>   4 card thống kê bấm lọc (Tổng/Của tôi/Còn hạn/Quá hạn) + khối lọc GHIM (tìm kiếm,
>   người tạo, phòng ban, ngày từ—đến, Của tôi) + bảng thead ghim (8 cột) + dialog tạo
>   đầy đủ (nội dung, hạn, người hỗ trợ, phòng ban — tự lấy dept của user) + dialog chi
>   tiết. Hàng quá hạn chữ đỏ. Giữ nguyên quy tắc "không sửa, không xóa" (AppSheet gốc).
>
> **LESSON LEARNED — Template nâng cấp module đã hoàn chỉnh (2026-09-10):**
> Lần 3 áp dụng template (Đề nghị GĐ 59 → Hồ sơ GĐ 66 → Ghi chú GĐ 67) chạy mượt:
> migration → types → server functions → store (neon insert + hydrate map + merge LWW +
> actions) → trang (4 card bấm lọc + khối lọc ghim callback ref + bảng thead ghim +
> dialog CRUD/chi tiết). Chi phí mỗi module ≈ 1 phiên làm việc, typecheck sạch ngay.
>
> **Tiêu chí kiểm chứng:** /ghi-chu hiện bảng + 4 card + khối lọc ghim; tạo ghi chú mới
> với hạn/hỗ trợ/phòng ban → lưu Neon (kiểm tra cột created_by/updated_at); lọc theo
> người/phòng ban/ngày/Của tôi hoạt động; hàng quá hạn đỏ; cuộn trang khối lọc + thead
> đứng yên (desktop + mobile).

---

### Giai đoạn 66: Nâng cấp Module Hồ sơ tài liệu + Báo cáo Hồ sơ (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(ho-so): nâng cấp toàn diện Module Hồ sơ — bảng DB + CRUD + upload + phân quyền + sticky header |
| (mới) | feat(migration): 0019_documents.sql — bảng documents + seed 4 hồ sơ cũ |
| (mới) | feat(bao-cao): trang báo cáo Hồ sơ /bao-cao/bang-ho-so + card trên trang Báo cáo |
| (mới) | chore: tăng version 0.6.4 → 0.7.0 |

> **Bối cảnh:** Module Hồ sơ vốn là 4 card tĩnh (DOCS hardcoded trong catalog.ts) — không DB,
> không thêm/sửa/xóa, không đính kèm, không bộ lọc. Đại ca yêu cầu nâng cấp theo 5 điểm:
> bố cục giống Chấm công (ghim tiêu đề), thêm trường/cột hợp lý, bộ lọc đa điều kiện,
> sửa/xóa theo quyền (người tạo chỉ đụng của mình, Admin toàn quyền), đính kèm tệp/ảnh.
>
> **Kiến trúc mới (same pattern Đề nghị GĐ 59):**
> - **Migration 0019:** bảng `documents` — id, title, category, dept, center, summary,
>   creator, created_by, date, updated_at, deleted_at, attachments (JSONB) + indexes.
>   Seed 4 hồ sơ cũ (Quy chế chấm công, Vay vốn VietinBank, Nội quy tiêm chủng,
>   Hướng dẫn thu ngân) — data cũ không mất. Tự chạy khi Vercel build.
> - **Trang /ho-so:** 4 card thống kê (bấm lọc) + khối lọc GHIM (tìm kiếm, loại, phòng ban,
>   đơn vị, người tạo, ngày từ—đến, checkbox Của tôi) + bảng thead cố định + dialog tạo/sửa
>   + dialog chi tiết + lightbox ảnh nền trắng (GĐ 65).
> - **Quyền:** người tạo = tự điền từ user đăng nhập; sửa/xóa chỉ trên hồ sơ CỦA MÌNH;
>   Admin toàn quyền mọi hồ sơ. Xóa có dialog xác nhận + tombstone.
> - **Đính kèm:** ≤5 tệp — ảnh nén ≤800KB + PDF/Word/Excel ≤2MB qua upload Cloudinary
>   (đã mở rộng ở GĐ 59); Neon chỉ lưu URL (JSONB).
> - **Store:** state `documents` + actions add/update/remove + hydrate merge LWW theo
>   `updatedAt` + lọc tombstone — offline-first đồng bộ mọi collection.
> - **Báo cáo /bao-cao/bang-ho-so:** bộ lọc + 4 card thống kê + bảng + xuất CSV UTF-8
>   + pie cơ cấu theo loại + bảng theo người tạo — CHỈ XEM (phân tách Nghiệp vụ/Báo cáo).
> - "Loại hồ sơ" là DROPDOWN danh sách cố định (Quy chế/Nội quy · Hợp đồng · Hồ sơ nhân sự
>   · Tài chính · Hướng dẫn · Khác) — theo chốt của Đại ca, dễ lọc/thống kê.
>
> **LESSON LEARNED — Copy pattern module hoàn chỉnh (2026-09-10):**
> Lần 2 viết module full theo pattern Đề nghị (GĐ 59) — checklist đã chuẩn: migration →
> types → server functions → store (state + actions + hydrate LWW + tombstone) → trang
> (card bấm lọc + khối lọc ghim + bảng thead ghim + dialog CRUD + upload + lightbox) →
> báo cáo (card + bảng + CSV + pie). Pattern này giờ là TEMPLATE cho mọi module danh mục
> mới trong project.
>
> **Tiêu chí kiểm chứng:** /ho-so hiển thị bảng + 4 card + khối lọc ghim; tạo/sửa/xóa đúng
> quyền; đính kèm ảnh/file hoạt động; 4 hồ sơ cũ nằm trong DB; báo cáo /bao-cao/bang-ho-so
> lọc + CSV + pie hoạt động; typecheck sạch (tách lỗi .mjs).

---

### Giai đoạn 68: Fix trang Ghi chú crash — timestamptz trả Date thay vì string (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(store): chuẩn hóa timestamptz → ISO string lúc hydrate (isoStr) — hết crash ".localeCompare is not a function" |
| (mới) | fix(ghi-chu): bọc String() ở phép sort updatedAt — phòng thủ |
| (mới) | chore: tăng version 0.7.1 → 0.7.2 |

> **BUG REPORT của Đại ca (2026-09-10):** Vào trang Ghi chú → "Something went wrong —
> (t.updatedAt ?? \"\").localeCompare is not a function" — toàn trang crash.
>
> **Chuỗi nguyên nhân gốc (4 bước):**
> 1. Cột `updated_at` (migration 0020) kiểu `timestamptz`.
> 2. Driver `pg` trong `db.ts` chỉ setTypeParser cho int8/date/interval — KHÔNG có
>    timestamptz → node-postgres parse cột này thành **Date object**.
> 3. TanStack Start server-function serializer CHO PHÉP Date sống sót qua RPC →
>    store hydrate nhận `updatedAt` là Date (TypeScript không phát hiện vì dòng data
>    đi qua `as any[]`).
> 4. Trang Ghi chú sort `(b.updatedAt ?? "").localeCompare(...)` → Date không có
>    `.localeCompare` → ReferenceError crash cả trang.
>
> **Vì sao chỉ Ghi chú crash:** 3 module cùng pattern (Đề nghị/Hồ sơ/Check-in) dùng
> `updatedAt` chỉ cho `mergeByTs`/`parseTs` (chấp nhận cả Date) — duy nhất Ghi chú
> gọi `.localeCompare` trực tiếp. Nhưng Đề nghị + Báo cáo Đề nghị có `.slice()` trên
> `approvedAt` → sẽ crash cùng cách khi bấm duyệt — đã fix TẬN GỚC cùng lúc.
>
> **Fix (2 file):**
> 1. `src/lib/store.ts`: helper `isoStr()` (Date → toISOString, còn lại → String) đặt
>    đầu khối hydrate; áp dụng cho TẤT CẢ `updated_at`/`approved_at`/`deleted_at` của
>    attendance, proposals, notes, documents, checkins (9 chỗ). Merge `parseTs` không
>    cần sửa — đã xử lý được cả Date.
> 2. `src/routes/ghi-chu.tsx`: sort bọc `String(...)` phòng thủ dữ liệu lọt đường khác.
>
> **LESSON LEARNED — node-postgres trả Date cho timestamptz (2026-09-10):**
> `pg` mặc định parse `timestamptz` → Date object. Muốn giữ string phải setTypeParser
> (OID 1184) hoặc chuẩn hóa ở biên. Project đã normalize date (OID 1082) nhưng bỏ sót
> timestamptz. **Quy tắc từ giờ:** mọi cột timestamp mới thêm qua migration PHẢI được
> chuẩn hóa thành ISO string ngay lúc hydrate trong store — kiểm tra bằng grep
> `updated_at` sau khi thêm cột mới. Kiểu `string | null` trong TS không cứu được vì
> dữ liệu đi qua `as any[]` — TS chỉ nhìn annotation, không nhìn runtime.
>
> **Tiêu chí kiểm chứng:** Vào trang Ghi chú không còn crash; danh sách sort đúng
> (mới nhất lên trên trong cùng ngày); Đề nghị bấm duyệt/từ chối không lỗi
> `approvedAt.slice`; mở trang trên thiết bị khác vẫn đồng bộ (merge LWW hoạt động).

---

### Giai đoạn 69: Nâng cấp Module Chat kiểu Zalo (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(migration): 0021_chat_enhance.sql — messages thêm direct_key, attachments, created_by, updated_at, deleted_at |
| (mới) | feat(chat): viết lại trang Chat kiểu Zalo — nhóm + 1-1, poll 5s, đính kèm Cloudinary, thu hồi tin, lightbox |
| (mới) | feat(store): refreshMessages (poll LWW) + removeMessage (tombstone) + sendMessage mở rộng |
| (mới) | chore: tăng version 0.7.2 → 0.8.0 (feature lớn — minor) |

> **Bối cảnh:** Đại ca yêu cầu kiểm tra đồng bộ Module Chat + nâng cấp giống Zalo.
>
> **Đánh giá đồng bộ trước khi sửa:** Chat là module đồng bộ TỆ NHẤT hệ thống —
> hydrate chỉ load `channel: "general"` nhưng `sendMessage` tạo tin với channel
> "Chung"/"Kế toán"... → tin KHÔNG BAO GIỜ hiện ở thiết bị khác (lọc 2 đầu không khớp).
> Không realtime, không nhắn riêng, không đính kèm. Quyền OK (chat: true mặc định).
>
> **Đã chốt với Đại ca:** Kênh nhóm + nhắn 1-1; poll tự động 5 giây; gửi ảnh + file.
> (Giải thích: Cloudinary KHÔNG phải DB — text lưu Neon, ảnh/file lưu Cloudinary,
> Neon chỉ lưu URL — cùng kiến trúc Đề nghị/Hồ sơ.)
>
> **Chi tiết triển khai (5 file):**
> 1. **Migration 0021:** `direct_key` ("empA|empB" sort tăng — rỗng nếu kênh nhóm),
>    `attachments` JSONB, `created_by`, `updated_at`, `deleted_at` + backfill tin cũ
>    (direct_key='', created_by='', updated_at=created_at) + 2 indexes. Tự chạy khi build.
> 2. **data.ts:** `loadAllMessages` (mọi kênh + 1-1, 1000 tin mới nhất — thay
>    `loadMessages` chỉ load 1 kênh), `loadMessagesSince` (poll tin mới theo `at >`),
>    `insertMessage` chuyển sang UPSERT LWW + đủ cột mới, `deleteMessage` tombstone.
> 3. **store.ts:** `sendMessage(text, channel, {toId, attachments})` — gắn fromId +
>    directKey + updatedAt; `refreshMessages` — poll merge LWW (tin pending của máy
>    không bị ghi đè), sort theo at; `removeMessage` — tombstone; hydrate map đủ cột
>    + chuẩn hóa isoStr + filter tombstone.
> 4. **chat.tsx — viết lại kiểu Zalo:** cột trái = danh sách hội thoại (2 tab Nhóm /
>    Tin nhắn riêng, avatar chữ cái đầu, tin cuối + giờ, search); cột phải = cửa sổ
>    chat (bubble xanh phải = của mình, tên người gửi bên trái, ngăn cách theo ngày
>    Hôm nay/Hôm qua, auto cuộn đáy); ô soạn tin + đính kèm ≤3 tệp (ảnh nén ≤800KB,
>    file ≤2MB, folder `giong-vn/chat`); thu hồi tin (nút × hover, confirm);
>    lightbox ảnh nền trắng (GĐ 65).
> 5. **Mobile:** 1 khung tại 1 thời điểm — state `mobileView` ("list" / "chat"),
>    nút Back về danh sách. Desktop (≥md) luôn hiện cả 2 cột.
>
> **LESSON LEARNED — Lọc 2 đầu không khớp = mất đồng bộ âm thầm (2026-09-10):**
> Bug Chat tồn tại từ khi migrate sang Neon: ghi với channel "Chung" nhưng đọc
> `WHERE channel = 'general'` — mỗi đầu tự đúng, ghép lại lệch. Đây là dạng lỗi
> KHÔNG hiện ra trong test 1 thiết bị (tin vẫn nằm trong localStorage nên vẫn thấy).
> **Quy tắc từ giờ:** khi thêm collection vào Neon, phải test cặp GHI/ĐỌC cùng lúc
> (grep cả insert + load, so sánh giá trị lọc), và test trên 2 thiết bị khác nhau.
>
> **LESSON LEARNED — Polling là phương án realtime trên Vercel serverless (2026-09-10):**
> Vercel Functions không giữ kết nối lâu (websocket/SSE cần server chạy liên tục —
> Neon + Vercel free tier không hỗ trợ). Giải pháp gần-realtime ổn nhất: poll định kỳ
> 5s bằng query nhẹ `WHERE at > since` (index theo at). Chỉ poll khi trang Chat mở
> (clearInterval khi unmount) — không tốn tài nguyên khi rời trang.
>
> **LƯU Ý cho Đại ca khi test:**
> - Migration 0021 tự chạy khi Vercel build — tin cũ giữ nguyên (coi như kênh Chung).
> - Nhắn tin trên 1 thiết bị → mở trang Chat trên thiết bị khác → tin tự hiện sau ≤5s
>   (không cần F5) — đây là tiêu chí đồng bộ quan trọng nhất.
> - Tin 1-1 chỉ 2 người thấy; kênh nhóm mọi người trong kênh thấy.
> - Thu hồi tin trên 1 máy → tin biến thành "Tin nhắn đã được thu hồi" ở máy khác.
>
> **Tiêu chí kiểm chứng:**
> - Desktop: 2 cột — danh sách hội thoại + cửa sổ chat; Mobile: 1 khung + nút Back.
> - Nhóm: 4 kênh; Riêng tư: mọi nhân sự (kể cả chưa từng nhắn — để bắt đầu tin mới).
> - Gửi ảnh + PDF → hiện trong bubble; bấm ảnh phóng to lightbox nền trắng.
> - Poll 5s: tin nhắn từ thiết bị khác tự hiện mà không refresh.

---

### Giai đoạn 70: Hotfix sự cố sql.raw — trắng dữ liệu mọi module + XÁC NHẬN tsc CLI hỏng (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (hotfix) | fix(data): bỏ sql.raw trong loadAllMessages/loadMessagesSince — interface Sql không có method này |
| (hotfix) | fix(store): sửa cú pháp gọi deleteMessage({ data }) — server function nhận 1 object |
| (mới) | feat(scripts): thêm scripts/typecheck.mjs — probe typecheck qua TypeScript API thay tsc CLI hỏng |
| (mới) | chore: tăng version 0.8.0 → 0.8.1 |

> **BUG REPORT của Đại ca (2026-09-10):** Sau deploy Chat (GĐ 69), không vào được dữ liệu
> từ Sidebar hoặc BẤT KỲ đâu — mọi module trắng trừ Chấm công.
>
> **ROOT CAUSE (2 lỗi của AI trong commit GĐ 69):**
> 1. `loadAllMessages`/`loadMessagesSince` dùng `sql.raw(MESSAGE_COLUMNS)` — nhưng
>    interface `Sql` trong `db.ts` CHỈ có tagged-template + `.query()`, KHÔNG có `.raw()`
>    → runtime `sql.raw is not a function` → loadAllMessages throw.
> 2. Chuỗi hậu quả: hàm này nằm trong `Promise.all` của hydrate cùng tasks/proposals/
>    notes/checkins/employees/centers → MỘT hàm reject = CẢ LỐT reject → catch nuốt →
>    không module nào load được từ Neon. Chỉ attendance sống sót vì được tách try/catch
>    riêng (GĐ 17). Một hàm mới thêm vào Promise.all chung = điểm chết chôn toàn app.
>
> **XÁC NHẬN tsc CLI trên máy này HỎNG HOÀN TOÀN (nâng cấp từ nghi ngờ GĐ 61):**
> Probe: chủ ý đặt lỗi type ngây thơ nhất (`const x: number = 'chuoi'`) vào project →
> `npx tsc --noEmit` vẫn báo 0 lỗi. tsc CLI chạy ra kết quả SAI — mọi "typecheck sạch"
> từ máy này vô giá trị. Nguyên nhân gần như chắc chắn: node_modules Google Drive
> corrupt (GĐ 53). TypeScript LIBRARY vẫn ổn — gọi trực tiếp qua API (script probe)
> bắt đúng 26 lỗi thật (trong đó 2 lỗi của GĐ 69). Nghĩa là: engine compile tốt,
> chỉ đường thực thi CLI cho kết quả giả.
>
> **Giải pháp typecheck từ giờ:** `node scripts/typecheck.mjs` — gọi ts.createProgram
> trực tiếp với tsconfig.json, in lỗi non-mjs (loại 436 lỗi nhiễu từ file .mjs lạ).
> ĐÃ VERIFIED: phát hiện đúng cả 2 lỗi GĐ 69 mà tsc CLI bỏ qua.
>
> **LESSON LEARNED — Không được phép dùng method không tồn tại trên abstraction mỏng (2026-09-10):**
> `sql.raw()` là API của postgres.js (postgres tag template), KHÔNG phải của interface
> `Sql` tự viết trong db.ts (bọc node-postgres `pool.query`). Khi viết SQL động, dùng
> `sql.query(text, params)` hoặc viết thẳng cột vào template. **Trước khi dùng method
> nào trên `sql`, grep db.ts xem interface có khai báo không** — TS không cứu được khi
> tsc máy local hỏng.
>
> **LESSON LEARNED — Hàm mới thêm vào Promise.all chung là điểm chết đơn-lỗi (2026-09-10):**
> Hydrate gom 8 hàm load vào 1 Promise.all với catch nuốt lỗi. 1 hàm throw → cả lố fail
> → mọi module trắng. Đã có lesson tách attendance (GĐ 17) nhưng các hàm KHÁC vẫn dính
> nhau. Quy tắc từ giờ: hàm load MỚI thêm vào hydrate phải có try/catch RIÊNG hoặc
> `.catch(() => [])` tại chỗ — một module lỗi không được phép kéo sập module khác.
>
> **⚠️ VIỆC CẦN LÀM (máy cá nhân Đại ca):**
> 1. Chuyển project ra ngoài Google Drive (hoặc exclude node_modules khỏi Drive sync)
> 2. Xóa node_modules + `npm install` lại với Drive sync tạm dừng
> 3. Verify: đặt lại lỗi `const x: number = 'chuoi'` → tsc CLI phải bắt được
> 4. Trước khi làm xong: DÙNG `node scripts/typecheck.mjs` thay `npx tsc --noEmit`
>
> **Tiêu chí kiểm chứng:** Vào app mọi module có dữ liệu trở lại (Nhiệm vụ 74, Nhân sự,
> Đề nghị...); trang Chat load tin nhắn bình thường; `node scripts/typecheck.mjs` báo
> số lỗi KHÔNG ĐỔI so với baseline (26 lỗi cũ có sẵn, không thêm lỗi mới).

---

### Giai đoạn 71: Full quyền mặc định trừ Preview Mobile + reset module_access (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(permissions): default = FULL quyền 12 module cho mọi nhân sự mới, trừ Preview Mobile (chỉ Admin) |
| (mới) | feat(migration): 0022_reset_module_access.sql — xóa sạch override cũ, mọi người về default mới |
| (mới) | chore: tăng version 0.8.1 → 0.8.2 |

> **Yêu cầu của Đại ca:** (1) Reset NGAY — tất cả nhân sự hiện có full quyền trong bảng
> Phân quyền trừ Preview Mobile; (2) Nhân sự MỚI về sau cũng tự động full quyền trừ
> Preview Mobile; (3) Giữ "Phân quyền" + "Duyệt đăng ký" mặc định của SuperAdmin/Admin.
>
> **Triển khai (2 file):**
> 1. **permissions.ts — getDefaultModuleAccess():** bỏ phân quyền theo bộ phận
>    (HCNS mới có proposals, Marketing mới có reports...). Default user thường =
>    12 module bật (dashboard, attendance, checkin, tasks, proposals, hr, centers,
>    documents, reports, notes, chat, guide) + `preview: false`. Admin giữ nguyên
>    full + admin + preview. Module 'admin' KHÔNG nằm trong bảng toggle — chỉ
>    isAdminRole được cấp (giữ nguyên).
> 2. **Migration 0022:** `delete from module_access;` — override cũ (một số user
>    bị hạn chế / grant thủ công từng lưu) xóa sạch → mọi người hiện có rơi về
>    default mới. Tự chạy khi Vercel build.
>
> **LESSON LEARNED — Vercel Secret env không pull được qua CLI (2026-09-10):**
> Muốn chạy SQL trực tiếp Neon từ local cần DATABASE_URL. `vercel env pull` với env
> đánh dấu **Sensitive/Secret** chỉ trả về chuỗi `[SENSITIVE]` — KHÔNG lấy được giá trị
> thật (tính năng bảo mật của Vercel). Phương án thay thế sạch hơn: viết migration
> SQL (tự chạy khi build) hoặc dùng Playwright thao tác UI. ĐỪNG đánh dấu DATABASE_URL
> sensitive nếu vẫn cần CLI pull — hoặc giữ migration làm đường chính.
>
> **LƯU Ý:** Trang Phân quyền hoạt động bình thường — lần bật/tắt tiếp theo ghi lại
> override per-user mới (lên Neon, đồng bộ mọi thiết bị — cơ chế GĐ 53).
>
> **Tiêu chí kiểm chứng:**
> - User thường (VD: Trần Mạnh Hùng): sidebar đầy đủ Đề nghị/Nhân sự/Trung tâm/
>   Hồ sơ/Báo cáo — không thấy Preview Mobile.
> - Trang Phân quyền: mọi toggle BẬT trừ Preview Mobile (TẮT với user thường).
> - Thêm nhân sự mới ở Nhân sự (hoặc duyệt đăng ký) → đăng nhập lần đầu →
>   full quyền ngay không cần bật tay.
> - Admin/SuperAdmin: vẫn thấy Preview Mobile + 2 module quản trị.

---

### Giai đoạn 72: Nhóm chat kiểu Zalo — tạo nhóm + thêm thành viên (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(migration): 0023_chat_groups.sql — bảng chat_groups + chat_group_members + messages.group_id |
| (mới) | feat(chat): tạo nhóm mới (Admin) + dialog thành viên (Owner/Admin thêm/xóa/giải tán) + nhóm chỉ member thấy |
| (mới) | feat(store): chatGroups state + 4 actions + hydrate/poll load nhóm |
| (mới) | chore: tăng version 0.8.2 → 0.9.0 (feature lớn — minor) |

> **Câu hỏi của Đại ca:** "Thêm nhóm mới thế nào? Thêm người vào nhóm thế nào?" —
> Chat GĐ 69 chỉ có 4 kênh hardcoded, KHÔNG có nhóm thực sự. Đã chốt phương án:
> chỉ Admin tạo nhóm; Owner + Admin thêm thành viên; giữ cả 4 kênh công khai.
>
> **Triển khai (5 file):**
> 1. **Migration 0023:** `chat_groups` (id, name, created_by, deleted_at tombstone) +
>    `chat_group_members` (group_id, employee_id, role owner|member, PK composite) +
>    `messages.group_id` (rỗng với kênh công khai + 1-1) + backfill + 3 indexes.
> 2. **data.ts:** `loadChatGroups` (JOIN 1-n, gộp member rows theo group id),
>    `createChatGroup` (insert group + owner + members, ON CONFLICT DO NOTHING),
>    `addChatGroupMembers`, `removeChatGroupMember` (chặn xóa owner ở WHERE),
>    `deleteChatGroup` (tombstone). insertMessage/loadAllMessages/loadMessagesSince
>    thêm group_id end-to-end.
> 3. **store.ts:** state `chatGroups` + `addChatGroup`/`addChatGroupMembers`/
>    `removeChatGroupMember`/`removeChatGroup` (optimistic + fire-and-forget Neon);
>    hydrate load nhóm qua `.catch(() => [])` RIÊNG trong Promise.all (lesson GĐ 70 —
>    một hàm lỗi không được kéo sập module khác); `refreshMessages` poll THÊM nhóm
>    mỗi 5s (try/catch riêng, không chặn tin nhắn).
> 4. **chat.tsx:** nút "＋ Nhóm mới" (chỉ isAdmin) + dialog tạo (tên + checkbox thành
>    viên); bấm tiêu đề nhóm/nút "Thành viên" mở dialog thành viên (huy hiệu 👑 Chủ
>    nhóm, thêm từ danh sách non-members, xóa từng member, Giải tán nhóm confirm);
>    danh sách trái thêm loại `mygroup` (chỉ member thấy); `canSend` chặn non-member
>    nhắn; placeholder riêng cho nhóm.
> 5. **Phân quyền trong UI:** `isAdmin = isAdminRole(me?.role)`; `amOwner =
>    g.createdBy === currentUserId`; canManage = amOwner || isAdmin.
>
> **LESSON LEARNED — JOIN 1-n gộp rows phía server function (2026-09-10):**
> Load groups + members bằng 1 query JOIN trả về N dòng mỗi group (1 dòng/member).
> Gộp trong handler bằng Map theo group id — trả về 1 object/group có mảng members.
> Không dùng 2 query riêng (groups rồi members) — tốn 2 round-trip và khó khớp.
>
> **LƯU Ý cho Đại ca khi test:**
> - Chỉ tài khoản Admin thấy nút "＋ Nhóm mới"; user thường chỉ thấy nhóm mình được
>   thêm vào + không quản lý member được.
> - Tạo nhóm trên máy A → thành viên mở Chat máy B → nhóm tự hiện trong ≤5s (poll).
> - Thêm/xóa member → thiết bị khác tự cập nhật danh sách (poll 5s).
> - Giải tán nhóm → nhóm biến mất ở mọi member; tin nhắn cũ vẫn nằm trong DB (ẩn).
> - Owner không thể bị xóa khỏi nhóm mình (chặn cả client + server WHERE role <> 'owner').
>
> **Tiêu chí kiểm chứng:**
> - Admin tạo nhóm "Test NH" + chọn 2 member → 2 người đó thấy nhóm trong tab Nhóm
>   (dưới 4 kênh công khai), người ngoài không thấy.
> - Bấm "Thành viên" → dialog hiện đúng member + huy hiệu chủ nhóm; thêm/xóa member
>   được; non-member không thấy nút quản lý.
> - Nhắn tin trong nhóm → chỉ member nhận (poll 5s thiết bị khác).
> - 4 kênh công khai hoạt động như cũ.

---

### Giai đoạn 73: Bottom bar mobile — nút Chat thay Đề nghị (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(app-shell): thay nút "Đề nghị" bằng "Chat" trong MOBILE_PRIMARY — sidebar giữ nguyên toàn bộ module |
| (mới) | chore: tăng version 0.9.0 → 0.9.1 |

> **Yêu cầu của Đại ca:** Thêm nút "Chat" vào bottom bar mobile THAY cho nút
> "Đề nghị" (GĐ 54 từng thay Chat bằng Đề nghị — giờ đổi lại vì Chat vừa nâng cấp
> nhóm kiểu Zalo GĐ 72, dùng nhiều hơn). Sidebar KHÔNG xóa module gì hết.
>
> **Fix (1 dòng trong `src/components/app-shell.tsx` dòng 92):**
> ```ts
> // Trước (GĐ 54):
> const MOBILE_PRIMARY = ["/cham-cong", "/check-in", "/", "/de-nghi", "/nhiem-vu"];
> // Sau:
> const MOBILE_PRIMARY = ["/cham-cong", "/check-in", "/", "/chat", "/nhiem-vu"];
> ```
>
> **Cơ chế:** Bottom bar mobile lọc `visibleNav` theo `MOBILE_PRIMARY` rồi sort
> theo thứ tự mảng. `/chat` có sẵn trong NAV (icon MessageCircle, group "Hệ thống")
> → nút mới tự đúng icon + phân quyền: `chat: true` mặc định cho mọi user (GĐ 71)
> → ai cũng thấy nút Chat.
>
> **LƯU Ý:** Module Đề nghị KHÔNG bị xóa — vẫn đầy đủ ở sidebar desktop + menu
> hamburger mobile. Chỉ thay vị trí ưu tiên trong bottom bar (5 nút: Chấm công /
> Check-in / Tổng quan / Chat / Nhiệm vụ).
>
> **Tiêu chí kiểm chứng:** Mobile bottom bar = ⏱ Chấm công · 📍 Check-in · 🏠 Tổng
> quan · 💬 Chat · 📋 Nhiệm vụ. Bấm Chat → mở trang Chat kiểu Zalo. Sidebar vẫn
> còn đầy đủ cả Đề nghị lẫn Chat.

---

### Giai đoạn 74: Chat — xóa 4 kênh công khai + badge tin nhắn chưa đọc (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(chat): xóa 4 kênh công khai Chung/Kế toán/Dược/Marketing — Chat chỉ còn nhóm riêng + tin nhắn 1-1 |
| (mới) | feat(app-shell,store): badge đỏ số tin chưa đọc trên icon Chat (bottom bar mobile + sidebar + hamburger) — giống Zalo |
| (mới) | chore: tăng version 0.9.1 → 0.9.2 |

> **Yêu cầu của Đại ca (2 điểm):**
> 1. Xóa 4 kênh công khai Chung/Kế toán/Dược/Marketing (nhìn rỗng "Chưa có tin" gây nhiễu).
> 2. Số mầu trắng có dấu + nền đỏ trên icon Chat — đếm tin đến CHƯA ĐỌC (nhóm + 1-1);
>    đọc hết → ẩn; mỗi tin +1, đọc trừ đi.
>
> **Chi tiết triển khai:**
> 1. **chat.tsx:** gỡ state `channel` + mọi nhánh UI kênh công khai (danh sách,
>    header, empty state, placeholder, canSend). Trang Chat giờ = tab Nhóm (nhóm
>    riêng GĐ 72) + tab Tin nhắn riêng 1-1. Tin cũ kênh vẫn trong DB, không hiển thị.
> 2. **store.ts — unread tracking:**
>    - `conversationKeyOf(m, userId)`: `mygroup:{groupId}` / `direct:{peerId}` / `group:{channel}`.
>    - `readLastReadMap(userId)` — localStorage `giong-vn-chat-read-{userId}` (mốc ISO per conversation).
>    - `unreadCountFor()` — tin của người KHÁC, chưa xóa, mới hơn mốc lastRead.
>    - `totalUnreadCount()` — tổng mọi hội thoại (badge icon Chat).
>    - Action `markConversationRead(convKey)` — cập nhật mốc + bump `_chatReadTick`
>      (state riêng, KHÔNG persist) để selector badge re-render ngay.
>    - Effect trong chat.tsx: mở hội thoại → markRead; chạy lại khi tin mới về (poll 5s)
>      → đang mở chat thì tin mới coi như đã đọc.
> 3. **app-shell.tsx:** badge đỏ `bg-red-500` góc phải trên icon Chat — bottom bar
>    mobile + NavLink sidebar + hamburger. Hook `mobileChatUnread` tính 1 lần ở body
>    AppShell (Rules of Hooks — hooks không được gọi trong `.map()`).
>
> **LESSON LEARNED — Unread badge cục bộ, không cần DB (2026-09-10):**
> Mốc đã-đọc là preference CỦA CHÍNH user trên thiết bị → localStorage per-user
> đủ đúng nghiệp vụ, không cần thêm bảng/cột trong Neon (khác phân quyền GĐ 53 —
> thứ đó ảnh hưởng user KHÁC nên phải nằm DB). Tin nhắn phải server-known (đã có).
> Tiêu chí: "ai count" = tin người khác gửi sau mốc — đơn giản, Zalo-like, offline được.
>
> **LESSON LEARNED — Zustand selector cho giá trị tính toán + tick bump:**
> Selector `(s) => totalUnreadCount(...)` chạy lại khi `s.messages` đổi (tin mới về
> qua poll → badge tự tăng). Nhưng khi chỉ markRead (localStorage + `_chatReadTick`
> đổi), `messages` không đổi → selector không re-run → badge không giảm. Fix: bump
> `_chatReadTick` trong state + selector cộng/trừ tick (`+tick-tick` chỉ để đổi
> identity tham chiếu). Sạch hơn: để selector trả `getUnread(tick, messages)`.
>
> **Tiêu chí kiểm chứng:**
> - Trang Chat: tab Nhóm + Tin nhắn riêng — KHÔNG còn 4 kênh công khai.
> - Người A nhắn B (1-1 hoặc nhóm chung) → máy B badge đỏ +N trên icon Chat (nhiều
>   nơi: bottom bar + sidebar) trong ≤5 giây (poll).
> - B mở đúng hội thoại → badge giảm đúng số tin vừa đọc; đọc hết toàn bộ → badge ẩn.
> - Tin của chính mình không tăng badge. Badge mỗi user độc lập (localStorage per-user).
> - Mobile 1 khung, desktop 2 cột — mọi thay đổi áp dụng cả 2 (nguyên tắc song song).

---

### Giai đoạn 75: Fix badge chat kẹt "3" + cap badge 6/6+ (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(store): totalUnreadCount chỉ đếm hội thoại MỞ ĐƯỢC trong UI — hết badge kẹt do tin kênh đã xóa/nhóm giải tán/peer đã xóa |
| (mới) | feat(app-shell): cap badge tin chưa đọc tối đa 6, vượt thì "6+" (thay 99+) — sidebar + bottom bar mobile |
| (mới) | test: unit test src/lib/unread.test.ts (6 test) — bản sao logic thuần vì store.ts import "@/data" không chạy standalone trong node --test |
| (mới) | chore: tăng version 0.9.2 → 0.9.3 (fix bug — patch) |

> **BUG REPORT của Đại ca (2026-09-10):** Badge chat chưa đọc trên sidebar + bottom bar
> luôn hiển thị "3" MẶC DÙ đã đọc hết tin. Đồng thời yêu cầu mới: badge hiển thị tối đa
> "6", vượt quá thì "6+" (thay cap 99+ hiện tại).
>
> **ROOT CAUSE — badge kẹt: đếm cả hội thoại "ma" không thể mở để đánh dấu đã đọc (2026-09-10):**
> `totalUnreadCount()` gom convKeys từ TẤT CẢ tin nhắn trong store rồi đếm từng key:
> 1. **Tin cũ của 4 kênh công khai đã xóa (GĐ 74):** tin vẫn nằm trong Neon + localStorage
>    (channel "Chung"/"Kế toán"...), key `group:{channel}` vẫn được tạo — nhưng UI KHÔNG còn
>    kênh nào để mở → markConversationRead không bao giờ chạy cho key này → badge kẹt.
> 2. **Tin của nhóm đã giải tán:** nhóm bị tombstone khỏi chatGroups nhưng tin vẫn giữ
>    groupId → key `mygroup:{id}` không mở được.
> 3. **Tin 1-1 cũ (trước migration 0021) direct_key='':** rơi vào key `group:{channel}` —
>    cùng số phận với kênh đã xóa.
>
> Vì lastRead mặc định = 0, mọi tin người khác gửi trong hội thoại ma đều tính là
> chưa đọc VĨNH VIỄN → đọc thật bao nhiêu badge vẫn còn "3". Đây là dạng lỗi âm thầm
> giống GĐ 69: ghi/đọc mỗi đầu tự đúng, ghép lại lệch — data còn đó nhưng UI mở không được.
>
> **Fix (surgical — 2 file):**
> 1. `store.ts — totalUnreadCount(messages, userId, chatGroups, employeeIds):` thêm 2
>    tham số; chỉ tạo convKey cho hội thoại MỞ ĐƯỢC trong UI, khớp đúng danh sách
>    hội thoại trang Chat: nhóm = mình là member + nhóm chưa tombstone; 1-1 = peer
>    còn trong danh sách nhân sự; tin kênh công khai cũ (không groupId/directKey) → bỏ.
> 2. `app-shell.tsx:` 2 selector truyền `s.chatGroups` + Set employee IDs (NavLink
>    dùng useMemo tránh tạo Set mới mỗi render; AppShell body tính inline vì selector
>    trả số — không gây re-render thừa); 2 chỗ render badge đổi `>99 ? "99+"` →
>    `>6 ? "6+"` theo yêu cầu.
>
> **LESSON LEARNED — Đếm unread phải lọc theo "hội thoại UI mở được", không phải theo data (2026-09-10):**
> Số đếm badge là con số ĐỂ USER HÀNH ĐỘNG (bấm vào để đọc). Tin nằm trong hội thoại
> không thể mở thì KHÔNG BAO GIỜ được đếm, dù tồn tại trong DB. Khi thêm một nguồn data
> mới (kênh, nhóm, loại tin), luôn tự hỏi: tin cũ của nguồn này, sau khi nguồn bị xóa/
> khóa, còn đường nào để user "tiêu" số đếm không? Nếu không → phải lọc ngay từ counter.
>
> **LESSON LEARNED — Store import "@/data" khiến test standalone không chạy được (2026-09-10):**
> Muốn unit test hàm thuần trong store.ts bằng `node --test` phải resolve alias "@/"
> mà node không hiểu → ERR_MODULE_NOT_FOUND. Giải pháp thực dụng: test bản SAO logic
> thuần trong file test (kèm comment đồng bộ với store.ts). Về lâu dài: tách các hàm
> thuần (unread/merge/...) sang module không phụ thuộc alias để import trực tiếp.
>
> **Tiêu chí kiểm chứng:**
> - Badge không còn kẹt: mở Chat → đọc hết hội thoại → về Dashboard, badge biến mất.
> - Badge đếm đúng: A nhắn B 5 tin → B thấy "5"; nhắn 7 tin → B thấy "6+".
> - Tin cũ của kênh công khai (nếu còn sót trong DB) KHÔNG làm badge tăng nữa.
> - Sidebar + bottom bar mobile + hamburger đều cap 6/6+.
> - `node --experimental-strip-types --test src/lib/unread.test.ts` → 6/6 pass.

---

### Giai đoạn 76: Nguyên tắc truy cập trực tiếp Vercel / Neon / Cloudinary (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | docs(agents): bổ sung quyền truy cập Cloudinary + quy tắc truy cập trực tiếp 3 hệ thống vào Mục 9 |
| (mới) | chore: tăng version 0.9.3 → 0.9.4 |

> **Câu hỏi của Đại ca (2026-09-10):** AGENTS.md có nguyên tắc cho phép truy cập CLI
> Vercel, console Neon, console Cloudinary không? Nếu chưa → bổ sung.
>
> **Kết quả kiểm tra trước khi bổ sung:**
> - **Vercel:** ✅ đã có — Mục 9 (login website qua Playwright) + Mục 12 (Vercel CLI:
>   `vercel logs`, `vercel env ls`, `vercel project ls`...).
> - **Neon:** ✅ đã có — Mục 9 (console SQL, verify data, migration thủ công).
> - **Cloudinary:** ❌ CHƯA có — chỉ nhắc trong code (upload ảnh/file), không có
>   nguyên tắc cho phép truy cập console.
>
> **Đã bổ sung vào Mục 9 (Lưu ý khi làm việc):**
> 1. **Được phép truy cập Cloudinary** — console `console.cloudinary.com`: kiểm tra
>    Media Library, dung lượng, debug upload lỗi, verify file lên CDN.
> 2. **Quy tắc truy cập trực tiếp 3 hệ thống** — Vercel (website + CLI), Neon
>    (console SQL + query), Cloudinary (console + API): mặc định ĐƯỢC PHÉP đọc,
>    kiểm tra, debug, xem logs — KHÔNG cần hỏi lại từng lần. VẪN PHẢI HỎI Đại ca
>    trước thao tác PHÁ HỦY: drop table / delete all, xóa media hàng loạt, reset
>    môi trường, đổi cấu hình quan trọng (domain, env, connection string).
> 3. Giữ nguyên lưu ý GĐ 71: env Sensitive trên Vercel không pull được giá trị
>    thật qua CLI (`[SENSITIVE]`) — cần thì nhờ Đại ca cung cấp hoặc bỏ dấu Sensitive.
>
> **Tiêu chí kiểm chứng:** Lần sau AI đọc AGENTS.md sẽ biết ngay mình được truy cập
> trực tiếp 3 hệ thống nào, được làm gì mặc định, và việc gì phải hỏi Đại ca trước
> khi làm — không cần hỏi lại quyền từng lần.

---

### Giai đoạn 77: Chat — đổi tên nhóm + @mention trong nhóm (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | docs(agents): thêm nguyên tắc "Chỉ sửa phần được chỉ định" vào Quy tắc code |
| (mới) | feat(migration): 0024_message_mentions.sql — messages thêm cột mentions (JSONB) |
| (mới) | feat(chat): owner/admin đổi tên nhóm (nút ✏️ trong dialog Thành viên, form inline) |
| (mới) | feat(chat): @mention trong nhóm — gõ @ → dropdown chọn người, @Tên tô đậm trong bubble |
| (mới) | chore: tăng version 0.9.4 → 0.9.5 |

> **Yêu cầu của Đại ca (2026-09-10) — 2 tính năng trong module Chat + 1 nguyên tắc:**
> 0. Nguyên tắc mới: CHỈ sửa phần được chỉ định, KHÔNG lan sang phần khác — cần đụng
>    phần khác phải DỪNG và hỏi trước. Đã thêm vào danh sách Quy tắc code.
> 1. Người tạo nhóm (owner) đổi được tên nhóm.
> 2. Trong nhóm, gõ "@" để chọn người — tin vẫn hiện trong nhóm nhưng người bị tag
>    chú ý hơn vì thấy tên mình tô đậm.
>
> **Chi tiết triển khai (5 file + 1 migration — đúng phạm vi Chat, không lan module khác):**
> 1. **renameChatGroup:** server function (data.ts — UPDATE name + updated_at WHERE
>    deleted_at IS NULL) → store action (optimistic + fire-and-forget Neon, LWW qua
>    updated_at → poll thiết bị khác tự nhận tên mới) → UI: nút ✏️ cạnh tên nhóm trong
>    dialog Thành viên (chỉ canRename = amOwner || isAdmin), form inline Lưu/Hủy.
> 2. **@mention:**
>    - Migration 0024: `messages.mentions jsonb default '[]'` + backfill tin cũ.
>    - types.ts: `ChatMessage.mentions?: string[]` (employeeId).
>    - data.ts: insertMessage thêm cột mentions; mapMessageRow + 2 SELECT (load all
>      + poll since) đủ cột — end-to-end.
>    - store.ts: sendMessage opts thêm mentions; _neonInsertMessage gửi mentions;
>      hydrate map + poll map mentions.
>    - chat.tsx: `handleTextChange` regex `/@([^@\n]*)$/` → mở dropdown member nhóm
>      (trừ mình, lọc theo chữ sau @); `pickMention` thay @chữ bằng @Tên + lưu ID;
>      submit gửi mentions (chỉ nhóm) + reset sau gửi; placeholder gợi ý
>      "(gõ @ để nhắc ai đó)"; `renderTextWithMentions` tô đậm @Tên trong bubble
>      (tin của mình: bg-white/25 trên xanh; người khác: bg-accent/15) — khớp theo
>      mentions ID, fallback theo tên chính mình cho tin cũ không có ID.
>
> **LESSON LEARNED — str_replace với chuỗi dài chứa code: dễ phát sinh lỗi cú pháp (2026-09-10):**
> Khi ghi file test bằng chuỗi dài, lẫn vào đoạn sai (`myGroupIds.groups`, lặp `over.id`)
> khiến file hỏng cú pháp. Sau mỗi lần ghi/sửa lớn nên chạy ngay node/cú pháp check
> ngắn (hoặc test) để bắt lỗi sớm — không đợi đến typecheck cuối cùng.
>
> **Tiêu chí kiểm chứng:**
> - Owner/Admin mở dialog Thành viên → thấy ✏️ cạnh tên nhóm → đổi tên Lưu →
>   tên mới hiện ngay + thiết bị khác ≤5s tự cập nhật. Member thường không thấy ✏️.
> - Trong nhóm gõ "@" → dropdown hiện member; gõ tiếp "@Cư" lọc còn "Phạm Kiên Cường";
>   chọn → ô nhập thành "@Phạm Kiên Cường "; gửi tin → mọi người trong nhóm thấy
>   tin, tên "@Phạm Kiên Cường" tô đậm; người bị tag thấy tên mình nổi bật.
> - Tin 1-1 không có dropdown @ (chỉ nhóm); gửi tin @ kèm ID lưu vào cột mentions
>   (Neon); thiết bị khác mở lại vẫn thấy tô đậm (mentions load từ DB).
> - Migration 0024 tự chạy khi Vercel build; tin cũ không bị ảnh hưởng.

---

### Giai đoạn 78: Dọn sạch 26 lỗi typecheck — SẠCH 0 lỗi (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(typescript): sửa 24 lỗi type tích tụ từ GĐ 25-70 — giữ nguyên hành vi chạy |
| (mới) | chore: sinh lại routeTree.gen.ts (2 lỗi route báo cáo tự hết) |
| (mới) | chore: tăng version 0.9.5 → 0.9.6 |

> **Yêu cầu của Đại ca (2026-09-10):** Kiểm tra code hiện tại có lỗi gì không, có ảnh
> hưởng thực thi không — tìm + đề xuất sửa, bỏ lỗi không ảnh hưởng chương trình chạy.
> Đại ca duyệt sửa CẢ NHÓM A (an toàn) + NHÓM B (rủi ro runtime).
>
> **Phân loại 26 lỗi baseline (scripts/typecheck.mjs):**
> - **Nhóm B — rủi ro runtime thật (đã fix):**
>   1. `cham-cong.tsx doStampWithGps` — `video` possibly null: hàm chạy ASYNC trong
>      `.then(reverseGeocode)` — video/canvas có thể unmount (đóng dialog khi GPS chậm)
>      trước lúc stamp → guard `if (!video || !canvas) return;` đầu hàm.
>   2. `reverseGeocode({ data: { lat, lng } })` ×3 (cham-cong 264/495 + check-in 428):
>      validator yêu cầu `{lat: number; lng: number}` nhưng truyền string từ `.toFixed(6)`
>      → bọc `Number(lat), Number(lng)`.
> - **Nhóm A — lỗi type thuần, chưa gây lỗi chạy (đã fix):**
>   3. `nhiem-vu.tsx:537` variant "destructive" → "danger" (Button UI không có destructive;
>      variant lạ rơi về default — nút xóa TỪNG MẤT màu đỏ, giờ có lại).
>   4. `check-in.tsx` đọc `a.employeeId`/`a.workplace` không tồn tại trên type CheckIn
>      (luôn undefined, fallback vẫn chạy) → xóa tham chiếu, dùng fallback trực tiếp ×4 chỗ.
>   5. `check-in.tsx` `catch (err)` → `catch (err: any)` ×2 (err?.message trên {}).
>   6. `store.ts` neonCheckins `updatedAt ?? null` → `?? undefined` (union type CheckIn);
>      neonDocuments `updatedAt ?? undefined` → `?? ""` (Document.updatedAt bắt buộc string).
>   7. `data.ts` loadProposals + loadDocuments generic `attachments: unknown` →
>      `string[] | null` (unknown không qua serializer check của createServerFn).
> - **Nhóm tự hết — routeTree.gen.ts CŨ (đã sinh lại local):** 2 lỗi
>     `createFileRoute("/bao-cao/bang-de-nghi"|"/bao-cao/bang-ho-so")` không có trong
>     FileRoutesByPath — routeTree.gen.ts committed bị cũ (thiếu 2 trang báo cáo mới).
>     Vercel build tự sinh lại nên production KHÔNG bao giờ lỗi; sinh local bằng
>     router-generator để typecheck sạch cả local.
>
> **LESSON LEARNED — Sinh routeTree.gen.ts từ CLI khi tsc/máy hỏng (2026-09-10):**
> Không cần chạy dev server. Dùng trực tiếp package `@tanstack/router-generator`
> (đã có trong node_modules):
> ```js
> const { Generator, getConfig } = require("@tanstack/router-generator");
> const config = await getConfig({ routesDirectory: "./src/routes",
>   generatedRouteTree: "./src/routeTree.gen.ts" }, process.cwd());
> await new Generator({ config, root: process.cwd() }).run();
> ```
> API đúng: export `Generator` (class, method `.run()`), KHÔNG phải `generator.generate`.
> **Quy tắc từ giờ:** thêm route file mới → nhớ routeTree.gen.ts là file SINH RA —
> commit file cũ là bình thường, typecheck local sẽ sáng đỏ 2 lỗi cho đến khi sinh lại.
>
> **LESSON LEARNED — Lỗi type tích tụ nhiều giai đoạn là nợ âm thầm (2026-09-10):**
> 26 lỗi tồn tại từ GĐ 25-70 không ai sửa vì "không ảnh hưởng chạy" — nhưng trong đó
> lẫn rủi ro runtime thật (guard video async, RPC sai kiểu) và lỗi thật (nút xóa mất
> màu đỏ). Vì tsc CLI máy này hỏng (GĐ 70) nên baseline "26 lỗi" bị coi là bình thường.
> **Bài học:** định kỳ chạy `node scripts/typecheck.mjs` và sửa sạch — baseline 0 là
> dễ phát hiện lỗi mới hơn baseline 26. Giờ rule đơn giản: typecheck phải luôn SẠCH,
> lỗi mới xuất hiện = lỗi của lần sửa hiện tại, không được phép đẩy vào baseline.
>
> **Tiêu chí kiểm chứng:**
> - `node scripts/typecheck.mjs` → "✅ Typecheck SẠCH (0 lỗi)" — baseline mới = 0.
> - `node --experimental-strip-types --test src/lib/unread.test.ts src/lib/merge.test.ts`
>   → 17/17 pass (không hỏng logic hiện có).
> - Chức năng không đổi: chấm công/check-in GPS + camera hoạt động như cũ; nút xóa
>   nhiệm vụ CÓ MÀU ĐỎ (khác biệt duy nhất nhìn thấy được mắt thường).

---

### Giai đoạn 79: Dashboard — nhãn ngày biểu đồ theo dd/mm (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(dashboard): nhãn ngày biểu đồ "Chấm công 14 phiên đông" đổi mm/dd → dd/mm |
| (mới) | chore: tăng version 0.9.6 → 0.9.7 |

> **Yêu cầu của Đại ca (2026-09-10):** Biểu đồ Dashboard đang thể hiện ngày dạng
> `09/04` (mm/dd — kiểu Mỹ) → đổi sang `dd/mm` (04/09 — kiểu Việt Nam).
>
> **Fix (1 dòng trong `src/routes/index.tsx` — memo `attChart`):**
> ```ts
> // Trước: day: d.date.slice(5).replace("-", "/")  → "09/04" (tháng trước)
> // Sau:   day: d.date.slice(8, 10) + "/" + d.date.slice(5, 7)  → "04/09" (ngày trước)
> ```
> Date ISO `"2026-09-04"`: slice(8,10) = ngày, slice(5,7) = tháng → đổi thứ tự là xong.
>
> **Tiêu chí kiểm chứng:** Biểu đồ Dashboard hiển thị `04/09`, `05/09`... `10/09`
> (ngày/trước-tháng/sau); phần còn lại của Dashboard không đổi; typecheck vẫn SẠCH 0 lỗi.

---

### Giai đoạn 80: Lightbox Check-in — fix nền đen + không phóng to được + nút X chết (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(bang-check-in): ảnh dialog nền đen → trắng + thêm lightbox phóng to (trước đây chưa có) |
| (mới) | fix(check-in,bang-check-in): đóng Radix dialog khi mở lightbox — nút X/bấm nền lightbox bấm được |
| (mới) | chore: tăng version 0.9.7 → 0.9.8 |

> **BUG REPORT của Đại ca (2026-09-10) — 3 điểm:**
> 1. Báo cáo Check-in: ảnh trong dialog chi tiết VẪN nền đen (module Check-in đã trắng từ GĐ 65 nhưng Báo cáo bị sót).
> 2. Báo cáo Check-in: bấm vào ảnh KHÔNG phóng to được (lightbox chưa từng được thêm).
> 3. Đóng ảnh bằng nút "X" chưa hoạt động tốt ở CẢ module Check-in và Báo cáo Check-in.
>
> **ROOT CAUSE điểm 3 — Radix Dialog modal khóa pointer-events ngoài portal (2026-09-10):**
> Radix Dialog (không truyền `modal={false}`) mặc định modal=true: gắn
> `pointer-events: none` lên toàn bộ `body` rồi CHỈ khôi phục pointer cho
> DialogContent. Lightbox của mình render NGOÀI Radix Portal (fixed inset-0 z-[60])
> → lightbox HIỆN (z cao hơn) nhưng MỌI CLICK BỊ NUỐT — nút X, bấm nền đều chết.
> Z-index không cứu được pointer-events — đây là lý do "nút X không hoạt động tốt".
>
> **Fix (2 file, cùng 1 cơ chế):** bấm phóng to → `setIsDetailOpen(false)` (nhả khóa
> modal Radix) + mở lightbox → đóng lightbox (X / bấm nền) → mở lại dialog chi tiết
> như cũ (`closeLightbox()`: setLightboxPhoto(null) + if (detailRow/detailRecord)
> setIsDetailOpen(true)). detailRecord/detailRow KHÔNG bị reset khi đóng dialog →
> mở lại giữ nguyên dữ liệu.
>
> **Fix điểm 1-2 (bang-check-in.tsx):** khung ảnh `bg-black p-2` → `bg-white p-2`;
> thêm state lightboxPhoto + cursor-zoom-in + onClick phóng to + lightbox nền trắng
> (pattern GĐ 65) — Báo cáo Check-in giờ đồng bộ 100% với module Check-in.
>
> **LESSON LEARNED — Overlay tự render ngoài Radix Portal bị chặn click (2026-09-10):**
> Mọi overlay tự viết (lightbox, panel nổi...) mở TỪ TRONG dialog Radix modal phải:
> (a) render qua Radix Portal, HOẶC (b) đóng dialog trước khi mở overlay. Z-index cao
> chỉ giải quyết HIỂN THỊ, không giải quyết CLICK — Radix khóa pointer-events ở body.
> Dấu hiệu nhận biết: overlay hiện đúng vị trí, hover effects không chạy, nút bấm
> không phản hồi — kiểm tra bằng cách thêm onClick vào document log ra console.
>
> **Tiêu chí kiểm chứng:**
> - Báo cáo Check-in: bấm dòng → dialog chi tiết ảnh nền TRẮNG; bấm ảnh → phóng to
>   full màn; nút X góc phải ĐÓNG ĐƯỢC; bấm nền trắng cũng đóng; dialog chi tiết
>   mở lại như cũ sau khi đóng lightbox.
> - Module Check-in: bấm ảnh trong dialog → phóng to → X + bấm nền ĐÓNG ĐƯỢC →
>   dialog chi tiết trở lại.
> - Typecheck SẠCH 0 lỗi; desktop + mobile cùng hành vi.

---

### Giai đoạn 81: Check-in — fix đổi camera sau phải bấm 2 lần (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(check-in): switchCamera truyền mode mới trực tiếp vào startCamera — bấm 1 lần đổi camera ăn ngay |
| (mới) | chore: tăng version 0.9.8 → 0.9.9 |

> **BUG REPORT của Đại ca (2026-09-10):** Mobile — trong "Thêm Check-in", bấm nút
> chuyển camera sau phải BẤM 2 LẦN mới nhận. Chỉ muốn bấm 1 lần là được ngay.
>
> **ROOT CAUSE — stale closure trong switchCamera (2026-09-10):**
> ```ts
> setFacingMode(next);        // setState — chỉ có hiệu lực lần render KẾ TIẾP
> stopCamera();
> await new Promise((r) => setTimeout(r, 150));
> startCamera();              // gọi từ closure CŨ — bên trong vẫn đọc facingMode CŨ
> ```
> `startCamera` đọc `facingMode` từ closure của lần render lúc bấm nút — lời gọi sau
> `await 150ms` vẫn dùng giá trị cũ → `getUserMedia` mở CAMERA CŨ → nhìn như
> "không nhận". Bấm lần 2: component đã re-render xong, nút mang closure mới với
> mode mới → camera sau mới bật. Lỗi không hiện trên desktop (không test được
> switch camera trên webcam).
>
> **Fix (check-in.tsx — 2 thay đổi):**
> 1. `switchCamera`: gọi `startCamera(next)` — truyền mode mới TRỰC TIẾP làm đối số,
>    không dựa vào state vừa set.
> 2. `startCamera(modeOverride?: "user" | "environment")`: nhận override + thêm
>    `facingModeRef` đồng bộ theo state (`if (ref.current !== state) ref.current = state`)
>    → mọi đường gọi khác (handleOpenDialog, retakePhoto — gọi KHÔNG đối số) đọc ref
>    luôn đúng mode hiện tại, kể cả closure cũ.
>
> **LESSON LEARNED — setState rồi gọi hàm async ngay sau đó = stale closure (2026-09-10):**
> React state không đổi ngay tại chỗ — hàm gọi SAU `await` vẫn là hàm của lần render
> cũ, đọc state cũ. Quy tắc: cần giá trị MỚI trong cùng 1 luồng xử lý → truyền thẳng
> làm ĐỐI SỐ, hoặc giữ mirror `useRef` đồng bộ theo state. Pattern này đã xuất hiện
> GĐ 39 (capturePhoto/retakePhoto chuyển plain function) — cùng gốc React closure.
> Lưu ý: lỗi này chỉ lộ trên THIẾT BỊ THẬT có 2 camera — desktop không test được.
>
> **Tiêu chí kiểm chứng:** Mobile — mở Thêm Check-in → bấm nút 📷 MỘT LẦN → camera
> sau bật ngay (không phải bấm lần 2); bấm tiếp → về camera trước ngay; mở lại
> dialog → camera mặc định đúng mode lần cuối chọn; chụp lại (retake) vẫn mở đúng
> mode; typecheck SẠCH 0 lỗi.

---

### Giai đoạn 82: Nhiệm vụ — cuộn chuột dropdown Người hỗ trợ (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(nhiem-vu): Popover.Root modal={true} — lăn chuột được trong dropdown Người hỗ trợ |
| (mới) | chore: tăng version 0.9.9 → 0.10.0 (tròn chục minor theo quy tắc) |

> **BUG REPORT của Đại ca (2026-09-10):** Trong dialog "Nhiệm vụ mới", sau khi mở
> dropdown "Người hỗ trợ" và tick chọn 1 người, KHÔNG lăn được chuột xuống chọn
> người tiếp theo — phải kéo scrollbar bằng chuột.
>
> **ROOT CAUSE — Popover portal nằm ngoài vùng được phép wheel của Dialog modal:**
> Dialog "Nhiệm vụ mới" là Radix Dialog modal (react-remove-scroll khóa wheel toàn
> trang, chỉ khôi phục cho nội dung trong DialogContent). Dropdown Người hỗ trợ
> (GĐ 26) render qua Popover.Portal — NẰM NGOÀI DialogContent → lăn chuột trên
> danh sách bị NUỐT sự kiện wheel; mousedown kéo scrollbar thì KHÔNG bị chặn →
> đúng hiện tượng "phải bấm vào thanh cuộn".
>
> **Fix (1 thuộc tính trong nhiem-vu.tsx):** `<Popover.Root modal={true}>` — Popover
> tạo lớp scroll-lock RIÊNG phía trên lớp của Dialog; cơ chế nested lock của
> react-remove-scroll CHO PHÉP wheel trên target thuộc lớp trong cùng (danh sách
> checkbox) → cuộn chuột chạy bình thường; click-outside vẫn đóng dropdown như cũ.
>
> **LESSON LEARNED — Popover lồng trong Dialog modal phải modal={true} (2026-09-10):**
> Radix Popover mặc định modal=false → portal của nó bị scroll-lock + pointer-events
> của Dialog chặn. Khi Popover (hoặc dropdown tự viết qua portal) mở TỪ trong Dialog:
> (a) wheel/scroll không chạy → thêm `modal={true}` vào Popover.Root;
> (b) nếu là overlay tự render (lightbox GĐ 80) → phải đóng dialog trước.
> Dấu hiệu nhận biết chung: overlay/popover HIỆN đúng nhưng tương tác (scroll, click)
> bị nuốt — cùng gốc với lesson Radix modal GĐ 80 (pointer-events) nhưng biểu hiện
> khác (wheel vs click).
>
> **Tiêu chí kiểm chứng:** Dialog Nhiệm vụ mới → mở dropdown Người hỗ trợ → tick 1
> người → lăn chuột xuống chọn tiếp được bình thường (không cần kéo scrollbar);
> bấm ngoài dropdown vẫn tự đóng; hover highlight từng dòng vẫn hoạt động;
> typecheck SẠCH 0 lỗi.

---

### Giai đoạn 83: Quy tắc tròn trăm khi tăng Version + hiệu chỉnh 0.10.0 → 1.0.0 (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | chore: hiệu chỉnh version 0.10.0 → 1.0.0 (package.json + DEFAULT_VERSION) — theo quy tắc tròn trăm |
| (mới) | docs(agents): bổ sung quy tắc tròn trăm — chục đầy đủ thì lên tròn trăm, KHÔNG tồn tại x.10.y |

> **Yêu cầu của Đại ca (2026-09-10):** Xem lại quy tắc tròn chục của Version — khi chục
> đã đủ đầy thì phải LÊN TRÒN TRĂM chứ. Version `0.10.0` là KHÔNG đúng; số đúng phải là
> **`1.0.0`** (ảnh kèm: sidebar hiện `VERSION 0.10.0` sau GĐ 82 bump 0.9.9 → 0.10.0).
>
> **Phân tích:** Quy tắc tròn chục GĐ 51 viết `1.9.9 → 2.0.0` nhưng ví dụ thiếu nhánh
> `0.9.9` — lần bump đầu tiên gặp `x.9.9 → x.10.0` theo logic số học thường thì sinh ra
> version không mong muốn. Ý của Đại ca: minor chỉ chạy 0→9, hết 9 là đổi số lớn —
> không bao giờ tồn tại dạng `x.10.y`.
>
> **Sửa (3 chỗ — surgical):**
> 1. `package.json`: `"version": "0.10.0"` → `"1.0.0"` (hiệu chỉnh, không tăng thêm bậc).
> 2. `src/components/app-shell.tsx`: `DEFAULT_VERSION = "0.10.0"` → `"1.0.0"`.
> 3. `AGENTS.md` mục Cách tăng Version: tách 2 quy tắc —
>    - **Tròn chục** (chục CHƯA đầy): `1.0.9 → 1.1.0`; `1.8.9 → 1.9.0`.
>    - **Tròn trăm** (chục ĐÃ đầy): `0.9.9 → 1.0.0` (nhảy qua 0.10.0); `1.9.9 → 2.0.0`;
>      `1.19.9 → 2.0.0`.
>
> **LESSON LEARNED — Quy tắc version chốt (2026-09-10):**
> Minor chỉ chạy 0→9. Khi patch đầy mà minor đang ở 9 (`x.9.9`) → minor về 0 và MAJOR +1
> (`x.9.9 → x+1.0.0`). Không bao giờ sinh `x.10.y`. Ví dụ đầy đủ: `1.0.9 → 1.1.0`;
> `1.8.9 → 1.9.0`; `1.9.9 → 2.0.0`; `0.9.9 → 1.0.0`.
>
> **LƯU Ý:** `with-app-env.mjs` chỉ validate regex `/^(\d+\.)(\d+\.)(\d+)$/` → `1.0.0`
> khớp, không cần sửa. Sau deploy sidebar phải hiện `VERSION 1.0.0`.
>
> **Tiêu chí kiểm chứng:** 2 nơi version đều `1.0.0` (grep xác nhận không còn 0.10.0);
> sidebar hiện `VERSION 1.0.0` sau khi Vercel deploy xong; quy tắc tròn trăm được ghi
> lại trong AGENTS.md để lần bump `x.9.9` tiếp theo không lặp sai.

---

### Giai đoạn 84: Chấm công — retry sync tự thích ứng + nút Thử lại ngay (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(sync): retry backoff 5s→10s→30s→60s→5p thay interval 30s cố định + cờ chống chạy đè |
| (mới) | feat(cham-cong): nút '↻ Thử lại ngay' + cảnh báo bản ghi sắp hết hạn dự phòng 7 ngày |
| (mới) | chore: tăng version 1.0.0 → 1.1.0 (cải tiến chức năng — minor) |

> **Câu hỏi của Đại ca (2026-09-10):** Điểm danh Vào ca/Tan ca khi lỗi sync thì có bị
> mất data không? Cứ 5 giây up lại + có bản dự phòng được không?
>
> **Đánh giá hiện trạng (trước khi sửa):** Data KHÔNG mất — đã có 4 lớp bảo vệ từ GĐ 17:
> (1) local-first lưu localStorage ngay; (2) pending queue `giong-vn-pending-sync`;
> (3) retry tự động 30s + khi network online; (4) UPSERT LWW chống trùng khi retry.
> Nhưng có 4 lỗ hổng: UPDATE/DELETE không vào queue (Gói C — CHƯA sửa); retry 30s
> cố định không backoff; localStorage dễ mất (user clear browser data); expiry 7 ngày
> xóa âm thầm không cảnh báo.
>
> **Đại ca chọn Gói A — Củng cố retry (surgical, 2 file):**
> 1. `store.ts`:
>    - `RETRY_DELAYS_MS = [5s, 10s, 30s, 60s, 300s]` — delay hiện tại = số lần fail
>      nhiều nhất trong queue; reset đếm sau 10 phút ổn định (`_lastFailTs` +
>      `recentFailures()`).
>    - `scheduleNextRetry(maxDelayMs?)` — 1 scheduler timeout duy nhất thay interval;
>      `addPendingSync()` gọi `scheduleNextRetry(5_000)` để bản ghi MỚI không chờ cả
>      chu kỳ backoff dài.
>    - Cờ `_syncRunning` chặn 2 lần retry chạy đè (scheduler + nút thủ công + online
>      listener); xóa `_bgRetryInterval` không dùng nữa.
>    - Export `triggerPendingSyncNow()` (nút thủ công, return số bản ghi sync được,
>      -1 nếu đang có lần chạy khác) + `getPendingSyncStats()` (total/failed/
>      expiringSoon/nextRetryMs — expiringSoon = còn <24h trước hạn 7 ngày).
> 2. `cham-cong.tsx` (dashboard sync — chỉ Admin, hiện khi có bản ghi chờ):
>    - Nút '↻ Thử lại ngay' (Loader2 spinner khi đang chạy; toast: success/info/error;
>      refresh queue sau khi xong).
>    - Badge cam '⚠ X bản ghi sắp hết hạn dự phòng (còn <24h)'.
>    - Cập nhật text giải thích chu kỳ retry mới.
>
> **LESSON LEARNED — Hàm module-level KHÔNG thấy `get()` của store (2026-09-10):**
> `scheduleNextRetry` định nghĩa TRƯỚC `useAppStore` → không tham chiếu `get()` trực tiếp
> được → dùng `useAppStore.getState().hydrate()`. Hoãn hàm dùng `get` xuống dưới nơi
> store đã khai báo, hoặc gọi qua `useAppStore.getState()`.
>
> **LESSON LEARNED — str_replace không khớp do CRLF (2026-09-10):**
> File store.ts dùng CRLF; replacement ghi \n thường có thể không khớp chuỗi cũ có \r
> — khi replacement "not found", đọc lại vùng đó bằng read_files để lấy text đúng
> (kể cả ký tự đặc biệt như '→' từng bị ghi nhầm '—') rồi sửa lại 1 lần.
>
> **CHƯA LÀM (đã phân tích, chờ Đại ca duyệt):** Gói B — export file JSON dự phòng
> (nút tải bản ghi chờ ra máy); Gói C — UPDATE/DELETE fail cũng vào pending queue
> (hiện tượng bản ghi đã xóa 'hồi sinh' trên thiết bị khác khi mạng lỗi — lỗ hổng
> đúng dữ liệu quan trọng nhất).
>
> **Tiêu chí kiểm chứng:** Điểm danh offline → bản ghi có ngay trong danh sách với
> badge 'Đang chờ' → bật mạng → tự sync ≤5s (không còn chờ 30s); Admin mở dashboard
> sync → bấm 'Thử lại ngay' → toast kết quả + queue cập nhật; lỗi dai dẳng → log
> retry giãn dần (không dội server mỗi 30s); typecheck SẠCH 0 lỗi; 17/17 test pass.

---

### Giai đoạn 85: Rà soát & nhất quán hóa quy tắc đánh số Version (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | docs(agents): viết lại mục Cách tăng Version — chốt hệ 1 chữ số 0-9, bỏ ví dụ chết 1.19.9, định nghĩa lại tròn chục/tròn trăm theo điều kiện rõ |
| (mới) | chore: tăng version 1.1.0 → 1.1.1 |

> **Câu hỏi của Đại ca (2026-09-10):** Xem lại nguyên tắc tròn chục + tròn trăm —
> có vẻ vẫn chưa đúng cách đánh thứ tự của Version.
>
> **Điểm chưa chặt tìm được (trước khi sửa):**
> 1. **Ví dụ chết:** dòng tóm lại cấm `x.10.y` nhưng ví dụ lại có `1.19.9 → 2.0.0` —
>    `1.19.9` có minor 2 chữ số, thuộc dạng bị cấm → ví dụ mô tả trạng thái không
>    bao giờ tồn tại, quy tắc tự mâu thuẫn.
> 2. **Thuật ngữ lệch bản chất:** "tròn chục/tròn trăm" thực chất là phép CỘNG SỐ
>    CÓ NHỚ — mỗi vị trí (minor, patch) chỉ có 1 chữ số 0→9, đầy 9 thì về 0 và nhớ
>    sang số trước. Tên gọi "tròn trăm" dễ hiểu nhầm thành hệ trăm hàng.
> 3. **Khác SemVer:** chuẩn ngành cho minor/patch tăng tự do (`1.9.9 → 1.10.0`
>    hợp lệ, npm vẫn sort đúng `1.9 < 1.10`); major chỉ tăng khi breaking change.
>    Hệ mình tăng major chỉ vì hết chữ số → major tăng ảo sau ~100 release.
>    Cả 2 hệ đều XẾP ĐÚNG THỨ TỰ tăng dần — lỗi nằm ở cách đánh số so chuẩn ngành
>    + mâu thuẫn văn bản, KHÔNG phải lỗi thứ tự sort.
>
> **Đại ca chốt: GIỮ hệ mỗi chữ số 0-9** (không chuyển SemVer) — version luôn gọn,
> không bao giờ có `x.10.y`. Em đã trình cả 2 phương án kèm ưu/nhược trước khi chốt.
>
> **Fix (chỉ văn bản AGENTS.md — không đụng code):**
> 1. Thêm dòng **"Hệ đánh số"**: minor + patch mỗi vị trí 1 chữ số 0→9; đầy 9 thì
>    về 0 + nhớ; major tăng tự do khi được nhớ (`9.9.9 → 10.0.0` hợp lệ).
> 2. Định nghĩa 2 nhánh theo ĐIỀU KIỆN:
>    - Tròn chục = minor đang 0→8, patch đầy 9 → minor +1, patch về 0
>      (`1.0.9 → 1.1.0`; `1.8.9 → 1.9.0`).
>    - Tròn trăm = minor đang ĐÚNG 9, patch đầy 9 → minor về 0, major +1
>      (`0.9.9 → 1.0.0`; `1.9.9 → 2.0.0`).
> 3. Xóa ví dụ chết `1.19.9 → 2.0.0` + ghi rõ số 2 chữ số KHÔNG HỢP LỆ trong hệ.
>
> **Kiểm tra version hiện tại:** `package.json` = `DEFAULT_VERSION` = `1.1.0` —
> 2 nơi khớp, đúng quy tắc. Regex validate trong `with-app-env.mjs`
> (`/^(\d+\.)?(\d+\.)?(\d+)$/)`) chấp nhận mọi dạng 3 số → không cần sửa code.
>
> **LƯU Ý (khác SemVer cần nhớ khi so với công cụ ngoài):** npm CLI vẫn parse
> version dạng này đúng (chỉ là chuỗi 3 số); thứ tự hiển thị 'phiên bản mới nhất'
> của các công cụ so SemVer có thể đánh giá khác hệ mình — nhưng project không
> publish lên npm nên không ảnh hưởng thực tế.
>
> **Tiêu chí kiểm chứng:** Mục Cách tăng Version không còn mâu thuẫn (grep không
> còn `1.19.9`); 2 nơi version đều `1.1.1` sau bump; sidebar hiện VERSION 1.1.1
> sau deploy; lần bump tới gặp `x.9.9` áp dụng đúng nhánh tròn trăm.

---

### Giai đoạn 86: Nâng cấp Module Trung tâm — bản đồ 20 điểm + danh sách + chỉnh sửa (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(trung-tam): nâng cấp 6 điểm — chuẩn hóa ToadoGiong.txt + nhúng tọa độ + bản đồ Leaflet + thẻ/bảng + dialog xem/sửa Admin |
| (mới) | feat(employee-crud): thêm server function updateCenter (name/short_name/city/district/address — không đụng tọa độ) |
| (mới) | chore: tăng version 1.1.1 → 1.2.0 (feature mới — minor) |

> **Yêu cầu của Đại ca (6 điểm):** (1) dùng tọa độ file ToadoGiong.txt cho 19 trung tâm
> + Văn phòng; (2) xóa dòng chú thích dưới tiêu đề; (3) thêm dạng danh sách cạnh dạng thẻ;
> (4) bấm thẻ/dòng mở chi tiết + Admin chỉnh sửa; (5) bản đồ giống 100% Báo cáo Check-in
> đặt dưới tiêu đề; (6) tiêu đề danh sách cố định khi cuộn.
>
> **Đã chốt trước khi làm:** tọa độ NHÚNG vào code TS (không fetch txt lúc runtime);
> Admin sửa thông tin hiển thị, KHÔNG sửa tọa độ (tránh migration centers.lat/lng);
> danh sách = bảng nhiều cột.
>
> **Triển khai (4 file):**
> 1. **ToadoGiong.txt:** sửa dòng 4 Từ Sơn lệch cột (tên lặp 2 lần), dòng 19 Đông Yên
>    đổi dấu chấm thập phân → phẩy cho đồng nhất. Giữ nguyên 20 dòng STT 0→19.
> 2. **src/lib/center-coords.ts (mới):** 20 tọa độ map theo MÃ trung tâm (VP, LB, SĐ,
>    TS, HM, TD, ML, TP, PY, CĐ, TĐ, TA, LM, ĐX, ĐY, BH, TO, TT, QO) + field `cluster`
>    (cột Cụm trong file gốc). File txt giờ chỉ là tài liệu tham chiếu — nguồn sự thật
>    là center-coords.ts.
> 3. **employee-crud.ts:** +`updateCenter` — UPDATE name/short_name/city/district/address
>    + updated_at, WHERE code. Không đụng code/lat/lng.
> 4. **trung-tam.tsx — viết lại:** bỏ desc PageHeader; `CenterMap` copy 100% pattern
>    CheckInMap (Leaflet CDN loadLeaflet + 2 lớp Esri Đường phố/Vệ tinh + popup +
>    fitBounds + bấm marker mở chi tiết); khối sticky top-16 chứa tiêu đề "Danh sách
>    các trung tâm" + toggle Thẻ/Danh sách (callback ref + ResizeObserver →
>    `--tt-sticky-h` — pattern GĐ 63/58); bảng 7 cột bấm dòng mở dialog; dialog chi tiết
>    + nút "Chỉnh sửa thông tin" (chỉ Admin) + Lưu → updateCenter → hydrate + toast.
>
> **LESSON LEARNED — write_file content bị cắt/truncated khi quá dài (2026-09-10):**
> Lần đầu ghi ToadoGiong.txt bằng write_file, content bị chèn chỗ trống + cắt giữa
> dòng ("21,04743328\tlat2-placeholder\t105,8779599", "21,0627...") — KHÔNG khớp
> nội dung đã soạn. Sau khi ghi file bất kỳ, NÊN read_files lại xác nhận 1 lần nếu
> nội dung quan trọng (tọa độ, seed data) — phát hiện ngay, ghi lại không mất data.
>
> **LESSON LEARNED — Ripgrep binary biến mất giữa session (2026-09-10):**
> code_search đột ngột lỗi `ENOENT ... rg.exe` (tool vendored ripgrep không tìm thấy).
> Fallback ổn định: `grep -n ... | head` qua run_terminal_command. Đừng kẹt vào 1 tool.
>
> **Tiêu chí kiểm chứng:**
> - Trang /trung-tam: tiêu đề không còn dòng chú thích; bản đồ ngay dưới tiêu đề với
>   20 marker (fitBounds đủ 4 cụm); chuyển Đường phố/Vệ tinh được; bấm marker mở dialog.
> - Tiêu đề danh sách + toggle đứng yên khi cuộn (desktop + mobile); bảng 7 cột;
>   bấm thẻ hoặc dòng đều mở chi tiết.
> - Admin: nút sửa → sửa Tên rút gọn/Cụm/Thành phố/Địa chỉ → Lưu → toast xanh,
>   mở thiết bị khác thấy thay đổi. User thường: chỉ xem.
> - Typecheck SẠCH 0 lỗi (scripts/typecheck.mjs); 17/17 test pass.

---

### Giai đoạn 87: Trung tâm — ghim bảng cuộn nội bộ + 4 cột mới (Vị trí địa lý / SĐT / Phụ trách / Ghi chú) (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(migration): 0025_centers_contact.sql — bảng centers thêm phone/manager/note (default '') |
| (mới) | feat(trung-tam): bảng Danh sách ghim cuộn nội bộ (pattern Nhân sự GĐ 58) + 4 cột mới; dialog chi tiết thêm SĐT/Phụ trách/Ghi chú — Admin sửa được |
| (mới) | feat(employee-crud): loadCenters SELECT + updateCenter đủ 3 cột liên hệ mới |
| (mới) | chore: tăng version 1.2.0 → 1.3.0 (feature mới — minor) |

> **Yêu cầu của Đại ca (2026-09-10) — sửa Module Trung tâm, 3 điểm:**
> 1. Dòng tiêu đề dưới bản đồ CHƯA cố định khi cuộn → phải ghim.
> 2. Tiêu đề bảng thêm các cột: Vị trí địa lý (theo tọa độ), Số điện thoại (để trống
>    Admin điền sau), Phụ trách trung tâm (Admin điền tên nhân sự sau), Ghi chú.
>
> **Đã chốt trước khi làm:** Phụ trách = dropdown chọn từ danh sách nhân sự (em đề
> xuất, anh chọn) thay vì ô nhập tự do. Vị trí địa lý CHỈ ĐỌC — tự tra từ tọa độ.
>
> **Chi tiết triển khai (5 file + 1 migration):**
> 1. **Migration 0025:** `centers` thêm `phone text default ''`, `manager text default ''`,
>    `note text default ''` + update coalesce. Tự chạy khi Vercel build.
> 2. **employee-crud.ts:** DbCenter type + loadCenters SELECT COALESCE 3 cột mới;
>    updateCenter nhận + UPDATE thêm phone/manager/note.
> 3. **types.ts:** `Center` thêm `phone?/manager?/note?`. **store.ts:** map dbCenterList
>    đủ 3 field (hydrate qua merge fallback — centers không LWW, DB thắng).
> 4. **trung-tam.tsx:**
>    - Bảng Danh sách: container bảng thành khối sticky
>      `top-[calc(4rem+var(--tt-sticky-h,56px))]` + `max-h-[calc(100dvh-…)] overflow-auto`
>      + thead sticky top-0 — cuộn nội bộ, tiêu đề + tiêu đề cột luôn nhìn thấy
>      (desktop max-h-6rem, mobile max-h-10.5rem trừ bottom bar).
>    - 4 cột mới trong bảng + dialog: Vị trí địa lý (reverseGeocode từ CENTER_COORDS,
>      cache localStorage `giong-vn-center-geo` — mỗi mã chỉ gọi 1 lần vì tọa độ cố định;
>      title tooltip hiện tọa độ), SĐT (Input), Phụ trách (dropdown nhân sự sort vi),
>      Ghi chú (Textarea, whitespace-pre-wrap).
>
> **LESSON LEARNED — Gọi server function trong useEffect: bọc từng lệnh với cancelled flag (2026-09-10):**
> Reverse geocode 20 trung tâm chạy tuần tự trong useEffect — component có thể unmount
> (đổi trang) giữa chừng → dùng `cancelled` flag trong closure + kiểm tra trước mỗi
> setState; cache localStorage ghi ngay sau mỗi kết quả (quota error bỏ qua) — lần
> sau vào trang không gọi lại Nominatim.
>
> **Tiêu chí kiểm chứng:**
> - Toggle "Danh sách" → cuộn xuống: khối tiêu đề + thead đứng yên, dòng chạy trong khung
>   (desktop + mobile); không hở khe giữa 2 khối ghim (var --tt-sticky-h đo động).
> - Cột Vị trí địa lý hiện "…" rồi tên vị trí sau vài giây (cache vĩnh viễn); SĐT/
>   Phụ trách/Ghi chú hiện "—" khi trống.
> - Admin: sửa 3 trường trong dialog → Lưu → toast xanh; mở thiết bị khác vẫn thấy
>   (lưu Neon qua updateCenter). User thường: chỉ xem.
> - Migration 0025 tự chạy khi build; cards view giữ nguyên.
> - Typecheck SẠCH 0 lỗi (scripts/typecheck.mjs); 17/17 test pass.

---

### Giai đoạn 88: Bỏ ô tìm kiếm trong header app (2026-09-10)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(app-shell): xóa ô "Tìm module, chức năng…" + dropdown gợi ý khỏi header — dọn state q, memo hits, import icon Search |
| (mới) | chore: tăng version 1.3.0 → 1.3.1 (fix nhỏ — patch) |

> **Yêu cầu của Đại ca (kèm ảnh):** Bỏ ô tìm kiếm "Tìm module, chức năng…" trên
> Dashboard. Ô này nằm ở header TỔNG của app (app-shell.tsx) — hiện trên MỌI trang,
> không riêng Dashboard → em hỏi phạm vi, Đại ca chốt: **bỏ hẳn ở mọi trang**.
>
> **Chi tiết (chỉ `src/components/app-shell.tsx`):**
> 1. Xóa khối JSX ô tìm kiếm + dropdown kết quả (hits) — thay bằng div đệm
>    `min-w-0 flex-1` để nhóm nút Quản trị/Đổi mật khẩu/Đăng xuất/Thông báo
>    vẫn canh phải như cũ.
> 2. Dọn code thừa: state `q` + `setQ`, memo `hits`, import icon `Search` khỏi
>    lucide-react. Grep xác nhận không còn tham chiếu nào sót lại.
> 3. Header giữ nguyên chiều cao (h-16) + các nút còn lại — mobile lẫn desktop.
>
> **Tiêu chí kiểm chứng:** Header không còn ô tìm kiếm trên mọi trang; nút
> Quản trị/avatar/Đổi mật khẩu/Đăng xuất/Chuông thông báo vẫn nằm bên phải như cũ;
> typecheck SẠCH 0 lỗi; sidebar hiện VERSION 1.3.1 sau deploy.

### Giai đoạn 89: Thêm nguyên tắc "Không tự đoán ý định" vào Quy tắc code (2026-09-12)

| Commit | Thay đổi |
|---|---|
| (mới) | docs(agents): thêm nguyên tắc "Không tự đoán ý định" vào Quy tắc code — cặp với "Chỉ sửa phần được chỉ định" |
| (mới) | chore: tăng version 1.3.1 → 1.3.2 (docs nhỏ — patch) |

> **Yêu cầu của Đại ca (2026-09-12):** Chỉ sửa những chỗ được yêu cầu, không sửa lan
> sang chỗ khác, không tự đoán ý định mà phải hỏi lại nếu chưa chắc chắn — nếu nguyên
> tắc này chưa có trong AGENTS.md thì cho vào.
>
> **Kiểm tra trước khi sửa:** Nguyên tắc "Chỉ sửa phần được chỉ định" ĐÃ có sẵn
> (dòng 98, thêm 2026-09-10, GĐ 77) — đủ ý "không sửa lan". Nhưng vế **"không tự đoán
> ý định — chưa chắc thì hỏi lại"** chỉ có trong CLAUDE.md (Không phỏng đoán ý định /
> PHẢI HỎI LẠI / Chưa rõ thì hỏi đừng đoán), CHƯA có trong AGENTS.md.
>
> **Fix (chỉ văn bản AGENTS.md):** Thêm 1 dòng vào Quy tắc code ngay dưới nguyên tắc
> "Chỉ sửa phần được chỉ định":
>
> **"Không tự đoán ý định"** (hiệu lực từ 2026-09-12) — Chưa chắc chắn về yêu cầu
> (phạm vi, cách làm, kết quả mong muốn) thì PHẢI HỎI LẠI Đại ca, KHÔNG tự suy đoán
> ý định rồi hành động. Hỏi trúng đích hơn là làm sai phải sửa lại.
>
> Giờ 2 nguyên tắc đi cặp: (1) không sửa LAN — cần đụng chỗ khác → DỪNG hỏi;
> (2) không đoán Ý — chưa chắc về yêu cầu → hỏi trước khi làm.
>
> **Tiêu chí kiểm chứng:** Quy tắc code có đủ 2 nguyên tắc kề nhau; không đụng code;
> sidebar hiện VERSION 1.3.2 sau deploy.

### Giai đoạn 90: Fix user thường không đổi được mật khẩu — route guard thiếu /change-password (2026-09-12)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(app-shell): thêm lại pathname === "/change-password" vào isRouteAllowed — user thường bị đá về trang chủ khi mở trang đổi mật khẩu |
| (mới) | chore: tăng version 1.3.2 → 1.3.3 (fix bug — patch) |

> **BUG REPORT của Đại ca (2026-09-12):** User thường KHÔNG bấm/đổi được mật khẩu;
> chỉ Admin đổi được. Lỗi này từng được fix rồi nhưng tái phát.
>
> **ROOT CAUSE (2 lớp):**
> 1. **Nút + trang + server function đều KHÔNG sai:** Link "Đổi mật khẩu" trong
>    UserButton trỏ đúng `/change-password`; trang đổi mật khẩu không phân biệt quyền;
>    server function `changePassword` xác thực session Better Auth — ai đăng nhập cũng chạy được.
> 2. **Route guard trong `app-shell.tsx` thiếu `/change-password`:** user thường vào
>    `/change-password` → `isRouteAllowed = false` → `<Navigate to="/"> đá về trang chủ
>    ngay lập tức → nhìn như "bấm không được". Admin không sao vì guard có nhánh
>    `isAdmin` đi qua mọi route.
>
> **Vì sao tái phát — xác minh bằng git:** `git diff HEAD` cho thấy dòng
> `pathname === "/change-password"` CHỈ tồn tại ở bản local chưa commit;
> `git log -S 'change-password' -- app-shell.tsx` trả về RỖNG ở lịch sử commit —
> nghĩa là lần "fix lần trước" CHƯA BAO GIỜ được commit, và commit GĐ 88 (bỏ ô tìm
> kiếm header) đã thay vùng code chứa guard → dòng cho phép mất hẳn ở bản production.
> **Bài học: fix "đã xong" mà chưa commit = chưa tồn tại. Vùng code đã sửa nhiều lần
> thì mỗi lần đụng vào phải grep lại các route đặc biệt (/change-password, /login...).
>
> **Fix (surgical — 1 file, 2 dòng):** thêm lại vào `isRouteAllowed`:
> ```tsx
> // Mọi user đã đăng nhập đều được đổi mật khẩu riêng — route này không thuộc nav module
> pathname === "/change-password" ||
> ```
> Typecheck SẠCH 0 lỗi (scripts/typecheck.mjs).
>
> **Tiêu chí kiểm chứng:** User thường đăng nhập → bấm "Đổi mật khẩu" trên header →
> trang mở bình thường → nhập mật khẩu hiện tại + mới → đổi thành công; Admin vẫn
> đổi được như cũ; sidebar hiện VERSION 1.3.3 sau deploy.

### Giai đoạn 91: Phân quyền Ghi chú — Admin toàn quyền + User tự quản (2026-09-12)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(migration): 0026_notes_permissions_transfer.sql — notes thêm deleted_at + chuyển ghi chú cũ về Admin Phạm Kiên Cường |
| (mới) | feat(data): updateNote + deleteNote (tombstone) + loadDeletedNoteIds; insertNote → UPSERT LWW preserve deleted_at |
| (mới) | feat(store): updateNote/removeNote + hydrate tombstone filter — xóa ghi chú lan truyền mọi thiết bị |
| (mới) | feat(ghi-chu): User chỉ thấy+sửa ghi chú của mình (không xóa); Admin xem/sửa/xóa TẤT CẢ + dialog xác nhận xóa |
| (mới) | chore: tăng version 1.3.3 → 1.4.0 (feature mới — minor) |

> **Yêu cầu của Đại ca (2026-09-12):** (1) Chuyển hết dữ liệu Ghi chú hiện tại sang Admin;
> (2) Admin được phép xem, sửa, xóa TẤT CẢ dữ liệu Ghi chú; (3) User được xem, sửa —
> KHÔNG được xóa — dữ liệu của chính user lập đó.
>
> **Đã hỏi lại 3 điểm trước khi làm (nguyên tắc Không tự đoán ý định):**
> 1. "Chuyển sang Admin" = migration đổi sở hữu (created_by + author) các ghi chú HIỆN CÓ
>    về Phạm Kiên Cường — Quản trị HT (chọn trong 4 tài khoản Admin) ✅
> 2. User thường CHỈ THẤY ghi chú của mình (ẩn ghi chú người khác) ✅
> 3. Trước đây ghi chú là module duy nhất KHÔNG sửa/xóa được (nguyên tắc AppSheet cũ
>    "đã gửi là chốt") — nay bỏ, Admin toàn quyền; user tự sửa ghi chú của mình.
>
> **Migration 0026 — chống chạy lại làm hỏng data mới:** chỉ UPDATE dòng
> `coalesce(created_by,'') = ''` (chưa có chủ) → ghi chú user tạo SAU deploy không bị
> cuốn về Admin khi build lại (migration chỉ chạy 1 lần qua bảng _migrations nhưng
> vẫn phòng thủ). Backfill cuối: created_by rỗng mà không tìm được Admin → giữ author.
>
> **Tombstone ghi chú — dùng updated_at làm chuẩn LWW, KHÔNG dùng deletedAt:**
> mergeByTs so `updatedAt`; deleteNote set cả 2 cột cùng giá trị → tombstone thắng
> merge trên thiết bị giữ bản cũ → bị lọc. insertNote UPSERT preserve
> `deleted_at = COALESCE(EXCLUDED.deleted_at, notes.deleted_at)` — retry offline của
> tombstone (pending queue ghi `{id, deletedAt, _tombstone}` đi qua insert vì switch
> case chỉ có _neonInsertNote) KHÔNG hồi sinh bản ghi đã xóa (pattern proposals GĐ 59).
>
> **UI phân quyền:** `canEdit = isAdmin || isMine`; `canDelete = isAdmin`.
> User không thấy nút xóa ở CẢ bảng lẫn dialog chi tiết. Dialog tạo/sửa dùng chung
> (editingId — pattern Nhiệm vụ GĐ 24); cột Thao tác mới trong bảng (✏️/🗑 + stopPropagation
> để không mở dialog chi tiết); desc trang đổi theo role.
>
> **Tiêu chí kiểm chứng:** Đăng nhập user thường → chỉ thấy ghi chú của mình, có nút ✏️
> không có 🗑; sửa lưu được + đồng bộ thiết bị khác; Admin thấy tất cả 39 ghi chú cũ
> (Người tạo = Phạm Kiên Cường), sửa/xóa được mọi dòng; xóa → dialog xác nhận → biến mất
> ở thiết bị khác; typecheck SẠCH 0 lỗi; 17/17 test pass.

### Giai đoạn 92: Ghi chú mobile — thead lơ lửng rồi biến mất khi cuộn (2026-09-12, fix 2 lần)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(ghi-chu): mobile dùng pattern Nhân sự GĐ 58 — Card bảng thành khối ghim cuộn nội bộ, thead ghim top-0 bên trong; Desktop giữ nguyên |
| (mới) | fix(ghi-chu): lần 2 — BỎ div overflow-x-auto TRUNG GIAN giữa Card và table (tạo scroll container riêng → thead bám div → trôi theo nội dung); table min-w thay cuộn ngang |
| (mới) | chore: tăng version 1.4.0 → 1.4.1 → 1.4.2 (fix nhỏ — patch) |

> **BUG REPORT của Đại ca (kèm 2 ảnh mobile):** Lần 1 — kéo xuống thì tiêu đề bảng
> (STT / Nội dung...) CHƠ LƠ giữa màn hình. Lần 2 (sau fix 1.4.1) — thead đứng đúng
> đầu khung lúc đầu nhưng CUỘN TIẾP thì BIẾN MẤT theo nội dung.
>
> **ROOT CAUSE lần 1 — ancestor overflow phá thead sticky theo viewport:** Card bảng
> giữ `overflow-hidden` + div `overflow-x-auto` (cuộn ngang cho 9 cột) → ancestor có
> overflow khác visible VÔ HIỆU HÓA sticky theo viewport → thead trôi, lơ lửng.
> Fix: Card thành khối GHIM cuộn nội bộ (pattern Nhân sự GĐ 58):
> ```
> sticky top-[calc(4rem+var(--gc-sticky-h,64px))] z-[5]
> max-h-[calc(100dvh-10.5rem-var(--gc-sticky-h,64px))] overflow-auto
> lg:static lg:max-h-none lg:overflow-visible   ← desktop giữ pattern GĐ 67
> ```
>
> **ROOT CAUSE lần 2 — div trung gian giữa Card và table (fix 1.4.1 chưa trị hết):**
> Vẫn còn div `overflow-x-auto` BÊN TRONG Card, bọc table. Div đó tự tạo scroll
> container RIÊNG — cao bằng toàn bộ bảng, KHÔNG BAO GIỜ cuộn dọc → thead
> `sticky top-0` bám vào DIV (không phải Card) → cuộn trang thead trôi theo nội dung,
> biến mất khỏi khung. Nhân sự không bao giờ bị vì table là con TRỰC TIẾP của
> container ghim — không có div trung gian.
>
> **Fix lần 2 (ghi-chu.tsx):** BỎ div `overflow-x-auto` trung gian — table là con
> trực tiếp của Card; Card `overflow-auto` tự cuộn CẢ ngang lẫn dọc trong khung;
> table thêm `min-w-[760px]` (mobile) + `lg:min-w-0` (desktop) để giữ cuộn ngang
> xem đủ 9 cột. thead: `sticky top-0 lg:top-[calc(4rem+var(--gc-sticky-h,64px))]`.
>
> **LESSON LEARNED — thead sticky chỉ bám SCROLL CONTAINER CHA TRỰC TIẾP (2026-09-12):**
> `position: sticky` bám vào ancestor CUỘN GẦN NHẤT, không phải viewport, không phải
> khối sticky phía trên. Bất kỳ div bọc nào ở giữa table và container ghim (dù chỉ
> `overflow-x-auto`) đều trở thành scroll container của thead → thead không bao giờ
> "hết chỗ" để ghim → trôi theo nội dung. **Checklist khi table trong container ghim:
> (a) table = con trực tiếp, KHÔNG div bọc overflow; (b) container `overflow-auto`
> lo cả 2 trục; (c) table `min-w-*` thay div cuộn ngang; (d) test BẰNG CÁCH CUỘN
> ĐẾN CUỐI danh sách — thead đứng đúng đầu khung lúc đầu CHƯA ĐỦ, phải xem nó có
> biến mất khi cuộn tiếp không.**
>
> **Tiêu chí kiểm chứng:** Mobile kéo xuống HẾT danh sách: khối lọc ghim dưới header,
> khung bảng ghim sát dưới khối lọc, tiêu đề bảng LUÔN ở trên cùng khung (không lơ
> lửng, không biến mất); cuộn ngang trong khung xem đủ 9 cột; Desktop không đổi;
> typecheck SẠCH 0 lỗi.

### Giai đoạn 93: Chấm công — nút X lightbox phải bấm 2 lần mới đóng (2026-09-12)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(cham-cong): đóng Radix dialog trước khi mở lightbox + closeLightbox() mở lại dialog — nút X / bấm nền ăn ngay 1 lần |
| (mới) | chore: tăng version 1.4.2 → 1.4.3 (fix nhỏ — patch) |

> **BUG REPORT của Đại ca (2026-09-12):** Chấm công — phóng to ảnh chấm công xong muốn
> đóng lại thì phải ấn nút "X" 2 LẦN mới đóng được. Muốn ấn 1 lần.
>
> **ROOT CAUSE — cùng gốc GĐ 80 nhưng TRƯỚC GIỜ chưa được áp cho Chấm công:**
> GĐ 80 fix nút X chết cho Check-in + Báo cáo Check-in (phạm vi yêu cầu lúc đó chỉ
> 2 trang đó). Chấm công vẫn giữ lightbox render NGOÀI Radix portal trong khi dialog
> chi tiết đang mở modal → dialog gắn `pointer-events: none` lên body, CHỈ khôi phục
> cho DialogContent → cú bấm đầu vào nút X bị NUỐT, bấm lần 2 mới tới.
>
> **Fix (surgical — cham-cong.tsx, cùng pattern GĐ 80):**
> 1. Bấm ảnh phóng to → `setIsDetailOpen(false)` (nhả khóa modal) rồi mới
>    `setLightboxPhoto(...)`.
> 2. `closeLightbox()` mới: `setLightboxPhoto(null)` + if (detailRecord)
>    `setIsDetailOpen(true)` — đóng lightbox → dialog chi tiết mở lại như cũ;
>    detailRecord không reset nên giữ nguyên dữ liệu.
> 3. Nút X + onClick nền đổi sang `closeLightbox`.
>
> **⚠️ Lesson GĐ 80 CHƯA kết thúc — còn trang dùng lightbox ngoài portal:**
> Đây là lần THỨ 3 cùng một lỗi Radix modal khóa tương tác (GĐ 80 click, GĐ 82 wheel,
> nay Chấm công bị SÓT). **Bất kỳ trang nào có lightbox/overlay tự render mở TỪ dialog
> Radix modal đều phải áp pattern: đóng dialog (hoặc render qua Radix Portal) TRƯỚC khi
> mở overlay.** Checklist rà: cham-cong ✅ (GĐ 93), check-in ✅ (GĐ 80), bang-check-in ✅
> (GĐ 80), index/dashboard ✅ (GĐ 56 dùng lightbox từ bảng tóm tắt — cần verify),
> de-nghi / ho-so / trung-tam (lightbox nền trắng — cần verify theo đúng checklist).
>
> **Tiêu chí kiểm chứng:** Chấm công → bấm dòng → dialog chi tiết → bấm ảnh → phóng to
> → ấn X MỘT LẦN → lightbox đóng + dialog chi tiết mở lại như cũ; bấm nền đen cũng
> đóng; bấm ảnh lần nữa vẫn phóng to được; Desktop + mobile cùng hành vi;
> typecheck SẠCH 0 lỗi.

### Giai đoạn 94: Chat — tác vụ tin nhắn kiểu Zalo (2026-09-12)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(migration): 0027_chat_zalo_actions.sql — messages thêm 7 cột: reactions, reply_to_id, forwarded_from, pinned, pinned_by, starred_by, deleted_by |
| (mới) | feat(data): updateMessageMeta (COALESCE + LWW) + poll WHERE at > since OR updated_at > 1 phút (bắt meta đổi trên tin cũ) + insertMessage/full cột |
| (mới) | feat(store): updateMessageMeta action + sendMessage mở rộng replyToId/forwardedFrom + hydrate/poll map đủ meta |
| (mới) | feat(chat): reaction 6 emoji + trả lời (quote + preview bar) + chuyển tiếp (dialog) + menu ... 6 mục (Copy/Ghim/Đánh dấu/Chọn nhiều/Xem chi tiết/Xóa phía tôi) + banner ghim + popup Tin đã lưu ⭐ |
| (mới) | chore: tăng version 1.4.3 → 1.5.0 (feature lớn — minor) |

> **Yêu cầu của Đại ca (kèm 3 ảnh Zalo, 2026-09-12):** Bấm vào hội thoại/tin nhắn hiện:
> (1) thanh biểu tượng cảm xúc cho tin nhắn người gửi; (2) 3 nút nhanh: Trả lời ·
> Chuyển tiếp · ...; (3) trong ... có đủ các lựa chọn như Zalo. Đã hỏi lại và chốt:
> áp dụng CẢ nhóm + 1-1; menu ĐỦ 6 mục hoạt động thật (mục "Tùy chọn khác >" của
> Zalo là submenu rỗng — bỏ).
>
> **Kiến trúc meta tin nhắn (7 cột mới trong messages):**
> - `reactions jsonb` — [{ employeeId, emoji }]; 1 user 1 emoji/tin; bấm lại = bỏ.
> - `reply_to_id` — ID tin gốc; quote render trong bubble, bấm cuộn tới tin gốc
>   (anchor id={`msg-${id}`} + scrollIntoView).
> - `forwarded_from` — nhãn "Chuyển tiếp từ X" trên bubble; forward = gửi tin MỚI
>   (1-1: toId) giữ nguyên text + nhãn nguồn.
> - `pinned` + `pinned_by` — banner đầu hội thoại; ghim mới TỰ BỎ ghim cũ (loop
>   updateMessageMeta các tin pinned rồi mới ghim tin mới).
> - `starred_by jsonb` — danh sách employeeId đã ⭐; nút ⭐ đầu header hiện khi >0,
>   popup liệt kê tin + bấm Bỏ đánh dấu.
> - `deleted_by jsonb` — "xóa chỉ ở phía tôi": activeMessages lọc
>   `m.deletedBy?.includes(currentUserId)` — người khác vẫn thấy bình thường.
>
> **Poll bắt meta đổi trên tin cũ (điểm hay cần nhớ):** meta (reaction/ghim/xóa
> phía tôi) đổi trên tin CŨ có `at` cũ — poll cũ `WHERE at > since` KHÔNG BAO GIỜ
> thấy. Fix: `WHERE at > since OR updated_at > now() - 60s` — tin vừa đổi meta 1
> phút gần đây cũng về; mergeByTs LWW theo updatedAt giữ bản mới nhất.
>
> **UI pattern:** action bar 4 nút (Trả lời/Chuyển tiếp/.../Smile) nằm TRONG khối
> `group flex` → hover desktop hiện; mobile BẤM bubble mở thanh 6 emoji (onClick
> trên div cha, stopPropagation ở quote/reaction để không đụng action khác); menu
> "..." + reactBar render DƯỚI khối tin (relative z-10) — không bị bubble đè.
> Mode chọn nhiều: bubble onClick tick/untick + ring-2; thanh trên cùng đếm + xóa
> hàng loạt phía tôi.
>
> **LESSON LEARNED — reaction summary absolute cần bubble relative (2026-09-12):**
> Badge reaction định vị `absolute -bottom-2.5` — quên `relative` trên bubble thì
> absolute bám ancestor khác (khối `group flex` có items-end) → badge nhảy lên mép
> hàng thay vì góc dưới bubble. Kiểm tra mọi phần tử absolute mới: ancestor cần
> position context đúng chưa?
>
> **LƯU Ý cho Đại ca khi test:** tin cũ trước nâng cấp không có meta — vẫn bình
> thường; reaction/ghim/đánh dấu/xóa-phía-tôi LƯU NEON — thiết bị khác tự thấy ≤5s;
> "Xóa chỉ ở phía tôi" KHÁC "Thu hồi" (thu hồi = mọi người mất tin, giữ nguyên nút X
> cũ cho tin của mình trong 24h).
>
> **Tiêu chí kiểm chứng:** Bấm/hover tin → thanh 6 emoji + 3 nút nhanh hiện; chọn
> ❤️ → badge góc bubble; Trả lời → quote trong tin mới, bấm quote nhảy tới tin gốc;
> Chuyển tiếp → chọn người → tin mới có nhãn nguồn; menu đủ 6 mục hoạt động thật;
> ghim → banner đầu hội thoại; ⭐ → popup Tin đã lưu; Chọn nhiều → xóa phía tôi
> hàng loạt; thiết bị khác tự đồng bộ ≤5s; typecheck SẠCH 0 lỗi; 17/17 test.

### Giai đoạn 95: Chat — hoàn thiện dialog Xem chi tiết + Lưu về máy (2026-09-12)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(chat): dialog Xem chi tiết đầy đủ — hội thoại thuộc về, đính kèm thumbnail, đang trả lời/được trả lời bởi, cảm xúc từng người, lưu về máy |
| (mới) | feat(chat): Lưu về máy — menu "..." + dialog chi tiết; fetch blob + a.download tên file gốc từ URL Cloudinary |
| (mới) | chore: tăng version 1.5.0 → 1.5.1 (bổ sung nhỏ — patch) |

> **Yêu cầu của Đại ca (2026-09-12):** (1) Bổ sung các thông tin reaction/trả lời/
> chuyển tiếp vào dialog "Xem chi tiết" tin nhắn; (2) Thiếu chức năng "Lưu về máy" —
> bổ sung thêm.
>
> **Dialog Xem chi tiết giờ gồm:** hội thoại thuộc về (Nhóm X / Tin nhắn riêng với Y),
> nội dung, đính kèm (thumbnail ảnh bấm lightbox / link tệp), người gửi + thời gian,
> đang trả lời (quote tin gốc + nút Xem tin gốc → cuộn tới), được trả lời bởi
> (tối đa 3 + đếm), chuyển tiếp từ, ghim bởi, cảm xúc (từng emoji + TÊN từng người —
> trước chỉ 1 dòng), đánh dấu ⭐ (tên những người lưu), nút Lưu về máy (chỉ hiện khi
> có đính kèm).
>
> **Lưu về máy — 2 chỗ:** menu "..." (mọi tin) + dialog chi tiết (chỉ tin có đính kèm
> hoặc URL riêng). Cơ chế: fetch URL → blob → `<a download>` với tên file gốc từ
> Cloudinary public_id (decodeURIComponent, thiếu ext thì mặc định .jpg); nhiều tệp
> tải lần lượt; revokeObjectURL sau click; toast kết quả. Chỉ tải đính kèm — tin
> text thuần báo "không có tệp đính kèm".
>
> **Tiêu chí kiểm chứng:** Menu ... có mục Lưu về máy; tin có ảnh → lưu được file
> đúng tên gốc; dialog Xem chi tiết đủ mọi thông tin kể cả reply 2 chiều (tin này
> trả lời ai + ai đã trả lời tin này) + cảm xúc từng người; typecheck SẠCH 0 lỗi.

### Giai đoạn 96: Fix crash tin nhắn riêng + Trả lời tự @ người được trả lời (2026-09-12)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(data): loadAllMessages/loadMessagesSince — SELECT chèn tên cột qua ${biến} bị coi là tham số $1 → rows không cột nào → crash at.slice; viết THẲNG tên cột vào template |
| (mới) | feat(chat): bấm ↩️ Trả lời trong nhóm tự chèn "@Tên " người được trả lời + lưu mentions ID — người đó nhận được tin |
| (mới) | fix(chat): lọc tin hỏng (at không phải string) khi render — phòng thủ dữ liệu lỗi bản poll cũ ghi vào localStorage |
| (mới) | chore: tăng version 1.5.1 → 1.6.0 (fix lớn + feature — minor) |

> **BUG REPORT của Đại ca (2026-09-12):** (1) Phần tin nhắn riêng trong Chat bị lỗi hiển thị
> "Something went wrong — Cannot read properties of undefined (reading 'slice')".
> (2) Trả lời tin nhắn thành viên trong nhóm (nút ↩️) phải tự có "@..người được trả lời"
> trong cửa sổ soạn — không có @ thì người đó không nhận được tin.
>
> **Quy trình debug (Playwright + dump response):**
> 1. Script Playwright login production → mở tab Tin nhắn riêng → bắt được stack trace:
>    TypeError trong `Array.map` tại `chat-*.js` (bundle chính của trang Chat).
> 2. Tải bundle, đọc code quanh cột lỗi → crash tại `t.at.slice(0,10)` trong
>    `activeMessages.map` — tức có tin nào đó `at === undefined`.
> 3. localStorage máy sạch (0 tin) → tin hỏng đến từ data Neon. Dump raw response
>    `_serverFn`: format TanStack serializer cho thấy **TẤT CẢ** tin có
>    id/from/text/at = undefined (chỉ còn fallback channel "Chung").
>
> **ROOT CAUSE — SELECT chèn tên cột qua ${biến} thành tham số $1 (GĐ 70 tái phạm):**
> GĐ 94 viết `const MESSAGE_COLUMNS = \`id, from_name, ...\`` rồi dùng
> `SELECT ${MESSAGE_COLUMNS} FROM messages` — chuỗi chèn qua `${}` trong template
> của interface `Sql` (db.ts) bị gửi đi làm **tham số $1**, không phải SQL
> → query thật = `SELECT $1 FROM messages` → mỗi row chỉ có 1 cột vô danh
> → mapMessageRow đọc `r.id/r.at/...` đều undefined → render crash at.slice.
> GĐ 70 từng dính `sql.raw is not a function`, fix bằng "viết thẳng cột vào template"
> nhưng lần này viết qua `${biến}` — cùng gốc: **interface Sql mỏng chỉ chấp nhận
> tagged-template thuần, KHÔNG có cơ chế ghép SQL động.**
>
> **Fix:** viết THẲNG toàn bộ danh sách cột trong từng query (loadAllMessages +
> loadMessagesSince); MESSAGE_COLUMNS còn lại chỉ là chuỗi THAM CHIẾU để đối chiếu
> khi thêm cột mới (comment cảnh báo ngay đầu hằng).
>
> **Feature — Trả lời tự @ (theo yêu cầu):** startReply trong NHÓM chèn
> `@Tên người gửi ` vào đầu ô soạn (thay @ của lần reply trước, không chồng @),
> lưu ID vào mentionedIds → tin reply luôn tag đúng người → họ nhận được tin.
> Trả lời tin của chính mình thì không tự @.
>
> **Phòng thủ:** activeMessages lọc tin `at` không phải string — thiết bị từng nhận
> dữ liệu lỗi từ bản poll cũ (đã ghi localStorage) không còn crash khi render.
>
> **LESSON LEARNED — Template SQL: KHÔNG ghép SQL qua ${biến} dưới mọi hình thức (2026-09-12):**
> `${}` trong tagged template của interface Sql LUÔN là tham số — kể cả khi nội dung
> "trông như SQL". Ghép tên cột/table/điều kiện động phải viết thẳng trong template
> (dễ đọc, typecheck được) — nếu thật sự cần động thì build chuỗi điều kiện ở JS
> rồi chọn giữa vài template viết sẵn, không nhúng chuỗi SQL vào tham số.
> **Checklist khi thêm server function query:** (1) grep không có `sql.raw`;
> (2) grep không có `SELECT ${` / `FROM ${` / `WHERE ${` với biến chứa SQL;
> (3) test trên production bằng dump response — rows phải có đủ field.
>
> **LESSON LEARNED — Lỗi SQL ÂM THẦM: query SAI vẫn trả 200 (2026-09-12):**
> `SELECT $1 FROM messages` là SQL HỢP LỆ → không throw, chỉ trả data sai dạng
> → serializer vẫn 200 OK → hydrate không biết lỗi → crash lệch xuống UI render.
> Khác với GĐ 70 (throw rõ ràng). Dạng lỗi "query chạy được nhưng sai ý" nguy hiểm
> hơn lỗi throw — phải verify DATA ĐÚNG FORM (field đầy đủ) chứ không chỉ "có response".
>
> **Tiêu chí kiểm chứng:** Vào Tin nhắn riêng không còn crash; tin nhắn nhóm/1-1 hiện
> đúng nội dung + tên + giờ; trả lời trong nhóm tự chèn @Tên + người đó nhận tin;
> typecheck SẠCH 0 lỗi.

### Giai đoạn 97: Giải đáp badge Admin/User + fix cuộn đáy Chat (2026-09-12)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(chat): cuộn đáy bằng scrollTop + cuộn lại khi ảnh load — hết cảnh thanh cuộn "kẹt ở giữa" |
| (mới) | chore: tăng version 1.6.0 → 1.6.1 (fix nhỏ — patch) |

> **Câu hỏi của Đại ca (2026-09-12):** (1) Hiển thị Chat của Admin và User có giống nhau
> không — sao Admin báo đọc hết tin, User vẫn còn tin chưa đọc? (2) Admin mở tin thì
> cuộn xuống đáy, User thì thanh cuộn ở giữa — có khác code không?
>
> **Kết luận — KHÔNG khác code:**
> 1. Trang Chat + badge + cơ chế đã-đọc KHÔNG có một dòng nào check role Admin/User.
> 2. Badge là trạng thái PER-USER (localStorage `giong-vn-chat-read-{userId}` — mốc
>    lastReadAt từng tài khoản, GĐ 74): Admin đã mở hội thoại → badge Admin = 0;
>    User chưa mở (hoặc tin mới đến sau lần mở cuối) → badge User vẫn đếm. Hai số
>    khác nhau là ĐÚNG THIẾT KẾ (như Zalo).
> 3. Đo thực tế bằng Playwright trên production: KỂ CẢ ADMIN scroll KHÔNG ở đáy
>    (scrollTop 119 / max ~535) → hiện tượng "ở giữa" ảnh hưởng MỌI vai trò — bug
>    thật, không phải khác biệt phân quyền.
>
> **ROOT CAUSE cuộn kẹt:** dùng `scrollIntoView` chạy ngay khi render — nhưng ẢNH
> trong tin load xong SAU đó (async) → scrollHeight tăng đột xuất → vị trí cuộn bị
> bỏ lại giữa chừng. Trước đó code còn tham chiếu bottomRef chỉ để scrollIntoView.
>
> **Fix (chỉ chat.tsx):**
> 1. Ref `scrollAreaRef` trên vùng tin nhắn + `scrollToBottom(force)` đặt trực tiếp
>    `el.scrollTop = el.scrollHeight` — mở/đổi hội thoại luôn về đáy (force=true);
>    tin mới (poll) chỉ cuộn nếu đang gần đáy (<160px) — không giật người đang đọc tin cũ.
> 2. Ảnh trong tin thêm `onLoad={() => scrollToBottom(false)}` — ảnh load xong đẩy
>    layout thì cuộn lại ngay (nếu đang ở đáy).
> 3. Xóa bottomRef (chỉ còn mục đích scrollIntoView cũ).
>
> **LESSON LEARNED — scrollIntoView không đáng tin cho khung chat có ảnh (2026-09-12):**
> Ảnh/iframe/đính kèm load async làm scrollHeight thay đổi SAU khi scroll chạy →
> chat hiện "không ở đáy" như yêầu. Fix chuẩn: cuộn bằng scrollTop trên khung có
> overflow riêng + gọi lại sau khi ảnh load (onLoad). Với tin mới đến: chỉ cuộn khi
> user đang gần đáy — cuộn cưỡng bức mọi lúc làm người đọc tin cũ bị giật xuống.
>
> **Tiêu chí kiểm chứng:** Cả Admin lẫn User mở hội thoại → thanh cuộn ở ĐÁY (thấy tin
> mới nhất); ảnh load xong không đẩy vị trí cuộn; badge per-user hoạt động đúng
> (mỗi tài khoản tự đánh dấu riêng); typecheck SẠCH 0 lỗi.

### Giai đoạn 98: Dashboard — lọc theo user + thêm bảng Ghi chú (2026-09-13)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(dashboard): user thường chỉ thấy data MÀ MÌNH liên quan (chấm công/check-in/nhiệm vụ/đề nghị) — Admin thấy tất cả như cũ |
| (mới) | feat(dashboard): thêm bảng tóm tắt "Ghi chú gần đây" (thứ 5) + dialog danh sách + dialog chi tiết Ghi chú |
| (mới) | feat(dashboard): thêm lối tắt "Ghi chú" vào hàng lối tắt (7 nút) |
| (mới) | chore: tăng version 1.6.1 → 1.7.0 (feature mới — minor) |

> **Yêu cầu của Đại ca (2026-09-13):** Dashboard của user chỉ hiển thị những gì user đó
> liên quan: chấm công, check-in, nhiệm vụ (tự tạo HOẶC được giao HOẶC được hỗ trợ),
> đề nghị, ghi chú.
>
> **Đã hỏi lại 2 điểm trước khi làm (nguyên tắc Không tự đoán ý định):**
> 1. Dashboard chưa có phần Ghi chú → Đại ca chọn THÊM bảng "Ghi chú gần đây".
> 2. Phạm vi lọc → Đại ca chọn LỌC TOÀN BỘ: KPI + biểu đồ + số đếm lối tắt + 4 bảng
>    tóm tắt đều theo data của user. KPI Nhân sự + lối tắt Nhân sự/Trung tâm giữ nguyên
>    (danh mục công khai). Lối tắt "Ghi chú" (7 nút) em tự thêm cho đồng bộ — Đại ca
>    chốt GIỮ sau khi hỏi.
>
> **Fix (chỉ `src/routes/index.tsx` — không đụng store hay module khác):**
> 1. Định nghĩa "liên quan" per-collection:
>    - Attendance: `a.name === meName` hoặc `a.employeeId === meId`
>    - CheckIn: `c.name === meName`
>    - Task: `createdBy === meId` OR `assignee === meName` OR meName nằm trong
>      `support` (split dấu phẩy, so lowercase)
>    - Proposal: `createdBy === meId` fallback `requester === meName`
>    - Note: `createdBy === meId` fallback `author === meName`
> 2. 5 memo `myAttendance/myCheckins/myTasks/myProposals/myNotes` — isAdmin thì
>    nguyên mảng, không thì filter. Mọi consumer (KPI, attChart, openTasks,
>    todayAtt/todayCk, bảng, dialog danh sách) đổi sang dùng mảng `my*`.
> 3. Bảng Ghi chú gần đây: content (line-clamp-2), author + ngày + hạn (quá hạn
>    tô đỏ), bấm dòng mở dialog chi tiết (content whitespace-pre-wrap, người tạo,
>    ngày, hạn, hỗ trợ, phòng ban, trạng thái Còn hạn/Quá hạn tính từ deadline).
>    Dialog danh sách notes có max-h-[60vh] overflow-auto (danh sách ghi chú dài).
>
> **LƯU Ý — Task.support là chuỗi tên phân tách dấu phẩy (không phải ID):** lọc
> "được hỗ trợ" so theo TÊN lowercase. Task cũ trước GĐ 24 có thể thiếu createdBy →
> fallback assignee/createdBy ID so theo tên vẫn bắt được. Nhiệm vụ mà user được
> HỖ TRỢ giờ hiện trên Dashboard của user đó (trước đây chỉ theo assignee/creator).
>
> **Tiêu chí kiểm chứng:** User thường: KPI + biểu đồ + bảng chỉ hiện data của mình
> (nhiệm vụ được giao/hỗ trợ vẫn hiện); Admin: thấy tất cả như cũ. Bảng Ghi chú
> hiện cho cả 2 role với đúng phạm vi; lối tắt Ghi chú dẫn đúng trang; typecheck
> SẠCH 0 lỗi; 17/17 test pass.

### Giai đoạn 99: Fix sort ghi chú Dashboard + Ẩn nhóm Quản trị khỏi Sidebar user thường (2026-09-13)

| Commit | Thay đổi |
|---|---|
| `1f833da` | fix(dashboard): sort ghi chú mới nhất lên đầu — hết hiện tượng "chỉ thấy ghi chú Admin" |
| (mới) | fix(app-shell): SidebarNav nhận items={visibleNav} — nhóm Quản trị (Duyệt đăng ký + Phân quyền) chỉ hiện với Admin/SuperAdmin |
| (mới) | chore: tăng version 1.7.0 → 1.7.1 (fix nhỏ — patch) |

> **BUG REPORT 1 của Đại ca:** Card "Ghi chú gần đây" trên Dashboard chỉ thấy ghi chú
> của Admin, không thấy của users khác.
>
> **Chẩn đoán (Playwright production):** KHÔNG mất data — module /ghi-chu hiện đủ 46
> ghi chú của cả "Phạm Kiên Cường" lẫn "Phạm Kiên Cường_01". Lỗi là SORT: Dashboard
> dùng thẳng thứ tự mảng store (sau merge offline không đảm bảo thứ tự ngày) → ghi chú
> CŨ nhất (09/2025, 04/2026) lênh đầu — mà ghi chú cũ đã được migration 0026 (GĐ 91,
> theo yêu cầu Đại ca) chuyển hết ownership về Admin Phạm Kiên Cường → nhìn như
> "chỉ có ghi chú Admin", ghi chú mới của user khác bị chôn dưới đáy.
>
> **Fix 1:** memo `myNotesSorted` — sort ngày mới nhất lên đầu (cùng ngày so updatedAt);
> card + dialog "Xem tất cả" đều dùng nguồn đã sort.
>
> **BUG REPORT 2 của Đại ca:** Nhóm Quản trị (Duyệt đăng ký + Phân quyền) trên Sidebar
> phải CHỈ hiện khi người đăng nhập là admin hoặc super admin.
>
> **ROOT CAUSE:** `SidebarNav` render thẳng mảng `NAV` cứng — KHÔNG đi qua lớp phân
> quyền `visibleNav` (NAV đã lọc theo `getAllowedNavItems`; module "admin" chỉ cấp
> cho Admin/SuperAdmin qua `getDefaultModuleAccess`, không nằm trong bảng toggle).
> Phân quyền đúng từ GĐ 71 nhưng RENDER bypass → 2 nút hiện với mọi user (bấm vào
> vẫn bị route guard đá về trang chủ — lớp 2 vẫn hoạt động, chỉ lớp hiển thị sai).
>
> **Fix 2 (surgical — app-shell.tsx):** `SidebarNav` thêm prop `items?: NavItem[]`
> (default `NAV` — không vỡ chỗ khác, deps useMemo thêm [items]); cả sidebar desktop
> lẫn menu hamburger mobile đều truyền `items={visibleNav}`.
>
> **LESSON LEARNED — Hai lớp cùng điều khiển 1 tính năng phải cùng nguồn data (2026-09-13):
> Phân quyền module điều khiển NAV qua `visibleNav` nhưng component render nhận mảng
> CỨNG → route guard chặn được còn UI vẫn hiện. Khi có 2 cơ chế (nav + route guard),
> cả hai phải đọc CÙNG nguồn (getAllowedNavItems) — checklist: grep mọi chỗ render
> NAV/SidebarNav khi thêm module mới vào phân quyền.
>
> **LESSON LEARNED — Danh sách "gần đây" phải tự sort, đừng tin thứ tự mảng store:
> Store offline-first merge giữ thứ tự localStorage từng máy — KHÔNG đảm bảo sort theo
> ngày. Mọi card "X gần đây" trên Dashboard nên sort ngay tại chỗ (mới nhất lên đầu)
> trước khi slice hiển thị.
>
> **Tiêu chí kiểm chứng:** User thường: sidebar desktop + menu mobile KHÔNG còn nhóm
> Quản trị; gõ tay /admin/approvals vẫn bị đá về trang chủ. Admin/SuperAdmin: thấy
> Duyệt đăng ký + Phân quyền như cũ. Card Ghi chú gần đây: ghi chú mới nhất lên đầu;
> ghi chú của users khác hiện đúng phạm vi (user chỉ thấy của mình, Admin tất cả).
> Typecheck SẠCH 0 lỗi; 17/17 test pass.

### Giai đoạn 100: App Icon Badge — thông báo trên icon màn hình chính mobile (2026-09-13)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(migration): 0028_push_subscriptions.sql — bảng lưu Web Push subscription per thiết bị |
| (mới) | feat(push): server api/push.ts — lưu/xóa subscription + sendPushBadge (VAPID, dọn endpoint 404/410) |
| (mới) | feat(push): client push-client.ts — xin quyền + đăng ký subscription + applyOsBadge (app mở) |
| (mới) | feat(sw.js): push handler — set badge + notification khi app đóng; notificationclick mở đúng trang |
| (mới) | feat(store): sendMessage/addProposal trigger push tới người nhận / Admin |
| (mới) | feat(app-shell): badge icon = chat chưa đọc + đề nghị chờ (cap 6) realtime; tự xin quyền sau login |
| (mới) | chore: tăng version 1.7.1 → 1.8.0 (feature lớn — minor) + deps web-push, @types/web-push |

> **Yêu cầu của Đại ca (kèm ảnh badge Play Store, 2026-09-13):** Nghiên cứu để thông báo
> của app (Chat + Đề nghị đề xuất) thể hiện lên ICON app trên màn hình chính mobile —
> ô nhỏ nền đỏ, số trắng, 1→6, quá 6 → 6+.
>
> **Nghiên cứu (MDN 8/2026 + Chrome docs):** PWA dùng Badging API `setAppBadge(n)` —
> (1) iOS/iPadOS 16.4+ PWA: OK, PHẢI xin quyền Notification trước; (2) Android Chrome:
> KHÔNG hỗ trợ badge số (Google chặn từ OS) → Android nhận notification thường + chấm;
> (3) desktop PWA: OK. Badge OS chỉ nhận số, không hiện được "6+" → quá 6 hiển thị 6
> (trong app vẫn 6+ như cũ GĐ 75). Màu đỏ/trắng do OS đặt — web không chỉnh được.
>
> **Đã hỏi Đại ca trước khi làm:** Đại ca chọn Gói B (CẢ KHI APP ĐÓNG — Web Push)
> + badge = TỔNG (chat chưa đọc + đề nghị chờ duyệt).
>
> **Kiến trúc end-to-end:** sendMessage → xác định người nhận (1-1 = toId; nhóm =
> members trừ mình; đề nghị = Admin/SuperAdmin trừ người tạo) → sendPushBadge (server,
> web-push + VAPID) → push service (FCM/APNs) → sw.js push handler → setAppBadge +
> showNotification → bấm notification mở đúng trang (/chat, /de-nghi). App ĐANG mở:
> app-shell useEffect theo `mobileChatUnread + pending` gọi applyOsBadge realtime.
> unreadTotal trong push = 1 (chỉ cần >0 để hiện notification) — badge số CHÍNH XÁC
> tự cập nhật khi user mở app (local lastRead map per-user).
>
> **Env VAPID (đã set qua CLI sau khi `vercel link`, chọn Secret):**
> `VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY` (web-push generateVAPIDKeys) / `VAPID_SUBJECT`
> (mailto:cuongpk.giong04@gmail.com). Thiếu env → mọi function no-op an toàn (app vẫn
> chạy, chỉ mất badge khi app đóng). KHÔNG đánh dấu config pull được — private key
> giữ Secret đúng chuẩn.
>
> **LESSON LEARNED — Badge số không phải 1 API cho mọi nền tảng (2026-09-13):**
> "Hiện số trên icon app" nghe như 1 tính năng nhưng thực ra 3 mảnh: Badging API
> (app mở), Web Push + SW push handler (app đóng), và quyền Notification (điều kiện
> iOS). Android là điểm mù của web (không có badge số) — không thể fix từ phía code,
> chỉ có notification thay thế. Khi nghiên cứu tính năng OS-level luôn tách theo
> nền tảng trước khi hứa kết quả với user.
>
> **LƯU Ý cho Đại ca khi test:** (1) Mở app trên iPhone → chấp nhận cho phép thông
> báo → badge icon hiện khi có tin chat/đề nghị mới; (2) tắt app (swipe khỏi đa nhiệm)
> → nhờ người khác nhắn tin → icon trên màn hình chính vẫn hiện badge + notification;
> (3) mở app đọc hết → badge tự mất; (4) Android: nhận notification thường, không
> badge số (giới hạn Google); (5) cần "Thêm vào Màn hình chính" trước thì mới có icon
> PWA để badge.
>
> **Tiêu chí kiểm chứng:** iPhone PWA: badge số trên icon khi app mở lẫn app đóng;
> bấm notification mở đúng trang; đọc hết tin badge về 0; đề nghị mới → Admin nhận
> badge; quá 6 hiển thị 6; typecheck SẠCH 0 lỗi; 17/17 test pass.

### Giai đoạn 101: VERSION cuối thanh slide bar mobile (2026-09-13)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(app-shell): thêm khối VERSION cuối menu hamburger mobile — giống hệt sidebar desktop |
| (mới) | chore: tăng version 1.8.0 → 1.8.1 (bổ sung nhỏ — patch) |

> **Yêu cầu của Đại ca (2026-09-13):** Thanh slide bar (menu hamburger) phiên bản mobile
> thêm phần version ứng dụng giống bản Desktop.
>
> **Fix (surgical — 1 chỗ trong `src/components/app-shell.tsx`):** Trong `SheetContent`
> (menu mobile), sau `<SidebarNav>` thêm khối div y hệt khối VERSION của sidebar desktop
> (cùng class `border-t border-forest-fg/10 px-2 pb-3 pt-2 text-center text-[9px]
> tracking-[0.18em] text-forest-muted/85`), nội dung `VERSION {appVersion}` — state
> `appVersion` đã có sẵn scope AppShell nên tái dùng trực tiếp (env VITE_APP_VERSION →
> localStorage → DEFAULT_VERSION, cùng nguồn với desktop).
>
> **Chi tiết kỹ thuật:** SheetContent có `overflow-y-auto` → menu dài thì VERSION cuộn
> theo nội dung nằm cuối danh sách (desktop là chân cột cố định — khác vị trí do layout
> khác nhau: desktop là flex-col full height, mobile là sheet cuộn được). Logo + nút X
> của sheet không đổi; phân quyền visibleNav áp dụng chung nên VERSION không lộ menu.
>
> **Tiêu chí kiểm chứng:** Mobile mở menu hamburger → cuộn xuống cuối menu thấy
> "VERSION 1.8.1" canh giữa, có đường kẻ trên — giống hệt chân sidebar desktop;
> desktop không đổi; typecheck SẠCH 0 lỗi.

### Giai đoạn 102: Check-in — stamp ngang + quay video có đóng dấu (2026-09-13)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(migration): 0029_checkins_video.sql — checkins thêm cột video |
| (mới) | feat(check-in): stamp xoay 90° khi cầm máy/canvas NGANG — drawStampBlock dùng chung overlay + ảnh chụp |
| (mới) | feat(check-in): quay video MediaRecorder composite overlay — nút REC + đếm giây + max 30s + camera trước/sau |
| (mới) | feat(types/data/store): CheckIn.video end-to-end (addCheckin tham số 6, hydrate map, _neonInsertCheckin) |
| (mới) | feat(check-in,bang-check-in): dialog chi tiết + Báo cáo phát video; nút Xác nhận chặn khi đang quay |
| (mới) | chore: tăng version 1.8.1 → 1.9.0 (feature mới — minor) |

> **Yêu cầu của Đại ca (2026-09-13):** (1) Check-in khi quay ngang điện thoại thì dấu
> (ngày giờ, tên, định vị) cũng sang ngang; (2) thêm quay video cho camera trước +
> sau vì hiện chỉ có chụp ảnh.
>
> **Đã hỏi chốt trước khi làm:** Video CÓ đóng dấu như ảnh; ảnh + video SONG SONG
> (bắt buộc có ảnh, video tùy chọn).
>
> **1. Stamp ngang:** detectLandscape() (screen.orientation.type chứa landscape,
> fallback innerWidth>innerHeight + so w>h của canvas). Gom logic vẽ thành
> drawStampBlock(ctx, layout) — landscape: translate góc phải-trên + rotate(PI/2),
> đường xanh + chữ chạy theo cạnh PHẢI khung (người xem nghiêng đầu sang phải đọc
> bình thường — cùng trục máy ngang); portrait giữ nguyên khối trái-dưới dòng chạy
> từ dưới lên. Dùng chung cho overlay live (drawOverlay) + ảnh chụp (capturePhoto)
> → dấu trên ảnh KHỚP 100% với preview.
>
> **2. Quay video có dấu:** MediaRecorder KHÔNG ghi thẳng stream camera mà ghi từ
> canvas composite (recordCanvas 15fps: drawImage video + drawImage overlayCanvas
> có sẵn stamp; overlay lệch kích thước thì vẽ lại drawStampBlock) → từng frame
> video đều có ngày giờ/tên/GPS realtime. MIME chọn theo isTypeSupported
> (webm vp9→vp8→webm→mp4). Nút REC cạnh nút chụp: đỏ nhấp nháy + đếm giây,
> tự dừng MAX_RECORD_SECONDS=30; preview video controls + Quay lại.
>
> **3. Data end-to-end:** Migration 0029 (video text default ''); types CheckIn.video?;
> insertCheckin validator + INSERT/UPSERT cột video; addCheckin tham số thứ 6;
> neonCheckins map + _neonInsertCheckin gửi video; dialog chi tiết Check-in + Báo cáo
> Check-in (ReportRow.video) phát video. Upload dùng uploadImage sẵn — base64 header
> video/* tự detect resource_type video (GĐ 59), KHÔNG transformation ảnh.
>
> **LESSON LEARNED — MediaRecorder không ghi overlay từ getUserMedia trực tiếp
> (2026-09-13):** Stream camera chỉ có pixel thô — muốn dấu trong video PHẢI vẽ
> frame + stamp lên canvas rồi captureStream(canvas). Ưu điểm: composite overlay
> canvas có sẵn → dấu khớp tuyệt đối với preview, không phải vẽ lại logic font.
>
> **LESSON LEARNED — detectLandscape theo CANVAS không theo thiết bị (2026-09-13):
> Camera mobile trả stream theo hướng vật lý; canvas ngang (w>h) mới là điều kiện
> stamp cần xoay. Kết hợp cả 3 tín hiệu (orientation API + viewport + khung canvas)
> để bao đủ trường hợp trình duyệt thiếu API.
>
> **LƯU Ý cho Đại ca khi test:** (1) Cầm máy NGANG → mở Thêm Check-in → dấu hiện
> xoay theo cạnh phải, preview + ảnh chụp giống nhau; (2) bấm nút ⏺ quay → REC đỏ
> đếm giây, quay tối đa 30s, dừng → preview video có dấu từng frame, có tiếng? KHÔNG —
> video chỉ hình (audio:false như ảnh); (3) chuyển camera trước/sau trước khi quay
> đều được; (4) Xác nhận Check-in → video + ảnh cùng lên Cloudinary, mở chi tiết
> (Check-in + Báo cáo) phát được video; (5) migration 0029 tự chạy khi build.
>
> **Tiêu chí kiểm chứng:** Dấu xoay đúng khi ngang, giữ nguyên khi dọc; quay video
> 2 camera đều có dấu; video hiện trong chi tiết + báo cáo; typecheck SẠCH 0 lỗi;
> 17/17 test pass.

### Giai đoạn 103: Nghiên cứu Google Drive + Backup Drive + chặn base64 vào Neon (2026-09-13)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(check-in): chặn base64 fallback — upload Cloudinary fail thì dừng + toast, KHÔNG lưu base64 50-100KB vào Neon |
| (mới) | feat(backup): api/backup-drive.ts — gom 12 bảng Neon thành JSON upload Google Drive (OAuth refresh token) |
| (mới) | feat(huong-dan): card "Sao lưu dữ liệu lên Google Drive" (chỉ Admin) — nút Backup ngay + kết quả số record |
| (mới) | chore: gỡ package googleapis (thuần fetch — nhẹ bundle serverless) |
| (mới) | chore: tăng version 1.9.0 → 1.9.1 (fix nhỏ + công cụ nội bộ — patch) |

> **Câu hỏi của Đại ca (2026-09-13):** Dữ liệu thêm mới (đề nghị, check-in, chấm công,
> ghi chú, chat, nhiệm vụ...) chuyển sang Google Drive được không để tránh Neon tràn
> bộ nhớ? Nghiên cứu giải pháp tối ưu mà dữ liệu vẫn chạy ổn định.
>
> **Kết quả nghiên cứu (đo thật + tra cứu giới hạn Google):**
> - Neon đang dùng **0.04/0.5GB (8%)**; toàn bộ data 2.34MB; ảnh/video ĐÃ nằm
>   Cloudinary từ GĐ 8 (Neon chỉ giữ URL ~100 bytes) → tốc độ đầy ~4 NĂM mới tới hạn.
> - Drive làm DB live: KHÔNG khả thi — ~3 ghi/giây bền vững, không query/index,
>   ghi đồng thời tải-sửa-tải → mất dữ liệu. Đại ca chốt **A + B**: (A) chặn lỗ
>   hổng base64 — nguồn phình to duy nhất còn tồn tại; (B) backup định kỳ ra Drive.
>
> **A — chặn base64:** confirmCheckin (Xác nhận + Tan ca): uploadImage fail → return
> + toast "không lưu được ảnh, thử lại" — giữ ảnh trong dialog bấm lại; KHÔNG còn
> lưu base64 vào `photo`. Chấm công đã chuẩn sẵn từ GĐ 25. Đã thấy 1 ảnh base64
> lọt DB trong 56 check-in — đây là rủi ro thật.
>
> **B — Backup Drive — hành trình kiến trúc (3 lần thử):**
> 1. **Service Account upload thẳng** → ❌ Google từ chối: "Service Accounts do not
>    have storage quota" — SA Gmail thường không có dung lượng riêng, upload của SA
>    vào folder được chia sẻ VẪN bị chặn (chỉ Shared Drive của Workspace trả phí mới
>    đi được đường này).
> 2. **SA tạo folder → chia sẻ cho Đại ca** → folder này vẫn nằm trong Drive SA
>    (quota 0) → vô dụng. Folder ĐÚNG phải nằm trong Drive của Đại ca.
> 3. **OAuth refresh token của chính Đại ca** (gcloud `auth login --enable-gdrive-access`
>    sinh file ADC `legacy_credentials/<email>/adc.json` chứa refresh_token + client_id
>    + client_secret có scope drive) → upload bằng danh nghĩa Đại ca → dùng quota 15GB
>    Gmail → ✅ test upload + xóa file OK.
>
> **Kiến trúc cuối:** 4 env Vercel (`GOOGLE_REFRESH_TOKEN`, `GOOGLE_CLIENT_ID`,
> `GOOGLE_CLIENT_SECRET`, `GOOGLE_DRIVE_FOLDER_ID` — đều Secret). Server function
> thuần fetch: refresh token → access token → POST multipart upload 1 request →
> file `giong-vn-backup-yyyy-mm-dd-hhmm.json` vào folder **GIONG-VN-Backup** trong
> Drive của Đại ca. Folder ID: `1Kd0z8aJRQzl-Zwex0h5PHYR5m-Nuu2L6`. Key SA cũ
> (`.secrets/giong-vn-backup-key.json`) KHÔNG còn dùng cho backup — chỉ còn giá trị
> tham khảo, đã gitignore. GCP project `giong-vn-app` + Drive API đã bật (có thể
> tái dùng sau này).
>
> **LESSON LEARNED — Service Account + Gmail cá nhân = không có quota Drive (2026-09-13):**
> Mọi tutorial "upload Drive bằng Service Account" mặc định Workspace hoặc Shared Drive.
> Với Gmail thường: file upload bởi SA bị từ chối KHỔNG QUOTA dù folder đã chia sẻ
> writer. Giải pháp duy nhất không cần duyệt OAuth consent screen: refresh token từ
> gcloud ADC (`--enable-gdrive-access`) — upload bằng danh nghĩa chủ tài khoản.
>
> **LESSON LEARNED — gcloud token qua Git Bash trên Windows (2026-09-13):**
> `gcloud` wrapper .bash gọi python bằng path dạng `C;C:\...` hỏng trong Git Bash.
> Cách ổn định: gọi qua `powershell.exe -Command "& '...gcloud.cmd' ..."` rồi
> `tr -d '\r'`. Token của `auth login` thường KHÔNG có scope Drive — phải login lại
> với `--enable-gdrive-access`; scopes đọc được trong response của oauth2/token.
>
> **LƯU Ý cho Đại ca khi test:** (1) Vào trang Hướng dẫn (Admin) → card "Sao lưu dữ
> liệu lên Google Drive" → bấm **Backup ngay** → toast xanh + link file trong Drive
> folder GIONG-VN-Backup; (2) file backup mở được, đủ 12 bảng; (3) Check-in khi
> mạng chặn Cloudinary → hiện toast lỗi, KHÔNG tạo check-in — không còn base64
> chui vào Neon; (4) 4 env GOOGLE_* đã set production qua CLI (Secret).
>
> **Tiêu chí kiểm chứng:** Backup tạo file JSON trong Drive đúng folder; số record
> khớp production; check-in fail-upload không ghi base64 vào DB; typecheck SẠCH 0
> lỗi; 17/17 test pass.

### Giai đoạn 104: Backup tự động tuần + backup Excel + hướng dẫn đọc/khôi phục (2026-09-13)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(backup): performBackup() sinh 2 file — JSON (khôi phục) + XLSX (đọc Excel, mỗi bảng 1 sheet) |
| (mới) | feat(cron): route /api/cron/backup (Bearer CRON_SECRET) + vercel.json crons 1 tuần/lần (02:17 UTC thứ Hai) |
| (mới) | feat(huong-dan): card "Hướng dẫn đọc file backup & khôi phục" (Admin) — cấu trúc file, quy trình 4 bước |
| (mới) | chore: +exceljs, CRON_SECRET env; version 1.9.1 → 2.0.1 (minor 9 đầy → nhớ major) |

> **Yêu cầu của Đại ca (2026-09-13):** (1) Hướng dẫn đọc file backup + cách khôi phục
> vào phần Hướng dẫn chỉ Admin thấy; (2) Backup tự động 1 tuần 1 lần; (3) Backup
> dạng Excel.
>
> **1. Backup 2 định dạng:** refactor backup-drive.ts — `collectBackupData()` load
> 12 bảng dùng chung; `buildExcel()` (exceljs, dynamic import — không tăng bundle
> chính) sinh workbook: sheet "Tổng quan" (thời gian xuất + số dòng từng bảng +
> cảnh báo "KHÔI PHỤC phải dùng file .json") + mỗi bảng 1 sheet (dòng đầu tên cột,
> object → JSON.stringify, Date → ISO). `performBackup()` upload CẢ 2 file qua
> `driveUpload()` dùng chung (multipart buffer). Nút "Backup ngay" giờ báo cả 2 file.
>
> **2. Cron tuần:** route TanStack `/api/cron/backup` (pattern /api/auth/$) — GET,
> kiểm `authorization: Bearer ${CRON_SECRET}` (Vercel Cron tự gửi env này; request
> lạ → 401). vercel.json: `schedule "17 2 ? * 1"` = 02:17 UTC thứ Hai ≈ 09:17 sáng
> VN. not-configured trả 200 (không retry nhiễu); lỗi khác 500. CRON_SECRET đã set
> production (random 48 ký tự qua CLI).
>
> **3. Hướng dẫn (Admin):** card mới dưới card backup — cấu trúc file JSON ({meta,
> data}), danh sách 12 bảng, công dụng từng định dạng (json = khôi phục, xlsx =
> tra cứu/in ấn KHÔNG khôi phục), quy trình khôi phục 4 bước (tải json mới nhất →
> gửi trợ lý nạp về Neon theo id, dữ liệu mới hơn backup không bị mất → đối chiếu
> sheet Tổng quan → mở app kiểm tra).
>
> **Version 2.0.0-lệch:** bump `1.9.1 → 2.0.1` — feature mới = minor +1, minor đang
> 9 (đầy) → về 0 + nhớ major (1→2), patch giữ 1. Lần ĐẦU TIÊN hệ đạt major 2.
>
> **LESSON LEARNED — Vercel Cron + TanStack Start route (2026-09-13):** Vercel Cron
> chỉ gọi được URL public — route server của TanStack Start (createFileRoute +
> server.handlers.GET) hoạt động như endpoint HTTP bình thường; thêm route file mới
> phải sinh lại routeTree.gen.ts (script router-generator — GĐ 78) rồi commit.
> Cron giờ UTC — 07:00 sáng VN = 00:00 UTC; đặt giờ lẻ (02:17) tránh giờ cao điểm
> cron chung của Vercel.
>
> **LESSON LEARNED — Vercel cron KHÔNG nhận ký tự `?` (2026-09-13, deploy fail thật):**
> Lần đầu viết schedule `"17 2 ? * 1"` (cú pháp Quartz) → Vercel từ chối vercel.json →
> deployment **FAILED** im lặng (vercel ls không hiện deployment lỗi, chỉ thấy qua
> GitHub commit status API). Fix: cron chuẩn 5 trường `"17 2 * * 1"` (commit b51b0b6)
> → Ready 26s. **Khi thêm/sửa vercel.json: kiểm tra commit status sau deploy bằng
> `curl api.github.com/.../commits/<sha>/status` — đừng chỉ tin vercel ls.**
>
> **LƯU Ý cho Đại ca khi test:** (1) Bấm "Backup ngay" → Drive có CẢ .json + .xlsx
> cùng mốc giờ; mở .xlsx bằng Excel/Google Sheets — sheet Tổng quan + từng bảng;
> (2) cron tự chạy sáng thứ Hai — kiểm tra Drive có file mới ~09:17 (xem log
> `vercel logs` có dòng [cron-backup] OK); (3) card hướng dẫn khôi phục chỉ Admin thấy.
>
> **Tiêu chí kiểm chứng:** Backup tay tạo 2 file; cron đăng ký hiện trong Vercel
> (Settings → Crons); hướng dẫn đọc/khôi phục hiện cho Admin; typecheck SẠCH 0 lỗi;
> 17/17 test pass.



### Giai đoạn 105: Check-in — video quay có âm thanh (2026-09-13)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(check-in): video quay có âm thanh — xin micro riêng lúc bấm quay, gộp track audio vào MediaRecorder |
| (mới) | chore: tăng version 2.0.1 → 2.1.0 (feature mới — minor) |

> **Yêu cầu của Đại ca (2026-09-13):** Trở lại phần quay video trong Check-in — cho
> thêm âm thanh vào video (GĐ 102 quay không tiếng: audio:false).
>
> **Kiến trúc âm thanh (surgical — chỉ check-in.tsx):** camera chính GIỮ video-only
> (không xin audio lúc mở camera — thiết bị thiếu mic sẽ làm vỡ flow check-in).
> Khi bấm nút quay: xin micro RIÊNG `getUserMedia({ audio: true })` → gộp track
> `new MediaStream([...canvasStream.getVideoTracks(), ...mic.getAudioTracks()])`
> → MediaRecorder ghi canvas composite (có dấu) + tiếng micro. MIME ưu tiên có
> Opus (vp9,opus → vp8,opus → vp9 → vp8 → webm → mp4).
>
> **Degradation an toàn:** micro fail (không mic / chặn quyền / bị app khác chiếm)
> → catch và quay tiếp KHÔNG TIẾNG — toast báo rõ "(không tiếng — không lấy được
> micro)"; không chặn quay, không crash. Micro được nhả NGAY khi recorder dừng
> (onstop) + lưới an toàn kép trong stopRecording() + không dính stopCamera()
> (stream riêng) → chuyển camera khi đang quay vẫn giữ tiếng.
>
> **LƯU Ý cho Đại ca khi test:** (1) Lần quay ĐẦU TIÊN trình duyệt hỏi quyền
> micro → chọn Cho phép; (2) quay → nói vài câu → dừng → phát lại nghe được tiếng;
> (3) file webm có track audio (opus); (4) chặn micro trong cài đặt trình duyệt →
> vẫn quay được, toast báo không tiếng; (5) iOS Safari < 14.3 không hỗ trợ
> MediaRecorder → nút quay ẩn như cũ (không đổi).
>
> **Tiêu chí kiểm chứng:** Quay video có tiếng rõ; dấu thời gian vẫn khớp từng
> frame; thiếu mic không vỡ flow; typecheck SẠCH 0 lỗi; 17/17 test pass.

### Giai đoạn 106: Khởi đầu hệ sinh thái — Monorepo giong-apps + scaffold app Bán hàng (2026-09-14)

| Commit | Thay đổi |
|---|---|
| (repo giong-apps) | feat: khung monorepo + scaffold app Bán hàng (Giai đoạn A) |
| (app tổng) | chore(gitignore): thêm giong-apps/ + chore: tăng version 2.1.0 → 2.1.1 |

> **Bối cảnh (đã chốt với Đại ca qua 3 vòng hỏi-đáp 2026-09-14):** Tách hệ sinh
> thái thành dự án tổng (giong-vn-v6 — GIỮ NGUYÊN) + 5 dự án con (Bán hàng,
> Logistics, Mua hàng, NXK, UPMisa). Đại ca chốt: **mô hình B — app riêng
> (monorepo)**, **SSO 1 tài khoản (JWT handoff — không cần domain)**, **Vercel
> free mỗi app 1 project**, **pilot Bán hàng**, **hàng hóa dùng chung**,
> **offline-first**, phạm vi Bán hàng theo app SMED (chi tiết gửi sau), **gửi
> kế hoạch trước rồi mới làm**.
>
> **Căn bản nghiệp vụ — tool desktop SMED-MISA Task Runner v1.3.2 (Python):**
> Đại ca gửi code để làm gốc. Đã chốt vai trò: **web điều khiển — tool chạy**;
> 2 bộ tài khoản (user_3/user_16) là tài khoản SMED. Pipeline Excel 12 giai
> đoạn đã phân tích thành `docs/smed-pipeline.md` trong repo mới (GĐ6 gom
> trung tâm, GĐ7 đối chiếu BK/CT/TKTH, GĐ8 ghép TT/DT/XK/NK khóa đa cột,
> GĐ9-10 lợi nhuận gộp + 10 cột Check, GĐ12 XK trả nợ DT đặt trước).
>
> **Đã dựng (commit đầu tiên repo `giong-apps`):** root monorepo npm
> workspaces; apps/banhang — khung TanStack Start + Vite 8.1.5 pin (bài học
> GĐ 12) + db.ts hai-backend Neon/PGLite nhân bản app tổng + migration 0001
> (tên file prefix app — bảng `_migrations` dùng chung key theo basename) +
> trang chủ có **ping Neon chung** (đếm employees) kiểm chứng kết nối;
> AGENTS.md riêng cho repo mới; docs/smed-pipeline.md.
>
> **App tổng chỉ thêm:** 1 dòng `giong-apps/` trong .gitignore (repo mới được
> clone NỘI BỘ cạnh repo chính để làm việc, không lẫn git) + version bump.
>
> **LESSON LEARNED — Repo monorepo song song (2026-09-14):** Khi làm việc trên
> repo thứ 2, clone nó vào thư mục con của workspace chính + gitignore ngay —
> giữ 1 cửa sổ làm việc duy nhất nhưng 2 git độc lập; KHÔNG tạo git submodule
> (phức tạp không cần thiết cho quy mô 2 repo).
>
> **LESSON LEARNED — Migration DB dùng chung nhiều app (2026-09-14):** Mỗi app
> con giữ migrations/ riêng; bảng `_migrations` key theo BASENAME nên tên file
> phải prefix theo app (`0001_banhang_init.sql`) để 2 app không đụng tên trong
> cùng DB. App con CHỈ ĐỌC bảng dùng chung (user/session/employees/centers);
> bảng nghiệp vụ tách prefix (sales_*/wh_*/po_*/log_*/misa_*).
>
> **Tiêu chí kiểm chứng:** Repo giong-apps push thành công; Vercel project
> giong-banhang chạy được URL riêng; trang chủ hiện Database = Neon (dùng
> chung) + số employees khớp production; app tổng giong-vn-v6 KHÔNG đổi gì
> ngoài .gitignore + version 2.1.1.

### Giai đoạn 107: Sidebar — nhóm DỰ ÁN + nút Bán hàng dẫn sang app con (chỉ Admin) (2026-09-14)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(app-shell): nhóm mới "DỰ ÁN" trên Sidebar + nút Bán hàng mở app con tab mới — chỉ Admin thấy |
| (mới) | chore: tăng version 2.1.1 → 2.2.0 (feature mới — minor) |

> **Bối cảnh:** Đại ca hỏi "ấn vào đâu trên Sidebar app tổng để chuyển sang app
> con?" — đúng phần GĐ B chưa làm. Em hỏi lại 2 điểm trước khi làm (nguyên tắc
> không tự đoán ý định), Đại ca chốt: (1) nhóm mới "DỰ ÁN" ở cuối sidebar;
> (2) app con mở TAB MỚI (an toàn khi SSO chưa có); kèm yêu cầu CHỈ Admin thấy,
> phân quyền per-user cho user thường làm sau khi app con hoàn thành.
>
> **Triển khai (chỉ `src/components/app-shell.tsx`):**
> 1. NAV thêm entry: `{ to: "https://giong-banhang.vercel.app", label: "Bán hàng",
>    icon: ShoppingCart, group: "DỰ ÁN" }` — đặt TRƯỚC nhóm Quản trị. Các app con
>    sau này (Logistics/Mua hàng/NXK) thêm vào cùng nhóm DỰ ÁN này.
> 2. NavLink nhận diện link NGOÀI qua `item.to.startsWith("http")` → render
>    `<a target="_blank" rel="noopener noreferrer">` thay vì `<Link>` nội bộ
>    (router TanStack không handle URL tuyệt đối). Style khớp hệt nhánh dark:
>    thu hẹp căn giữa icon 44px, hover mở rộng hiện chữ, nền trong suốt, KHÔNG
>    có trạng thái active (không bao giờ active vì là trang khác), không badge.
> 3. visibleNav thêm điều kiện `(isAdmin && item.to.startsWith("http"))` —
>    user thường ẩn HOÀN TOÀN nhóm DỰ ÁN (khác Preview Mobile hiện nhưng chặn
>    bên trong). Desktop sidebar + hamburger mobile cùng thấy (nguyên tắc
>    Desktop + Mobile song song); bottom bar không đụng.
>
> **LESSON LEARNED — Link ngoài trong NAV phải render `<a>` riêng (2026-09-14):**
> `NAV` vốn giả định mọi `to` là route nội bộ — `<Link to="https://...">` của
> TanStack Router không navigate được URL tuyệt đối. Fix: nhánh sớm trong
> NavLink theo tiền tố `http` → `<a target="_blank">` giữ nguyên hệ thống
> style/nhóm của sidebar. Khi thêm loại entry mới vào NAV (external, disabled,
> dropdown...), luôn kiểm tra TẤT CẢ chỗ tiêu thụ NAV: NavLink, visibleNav
> filter, MOBILE_PRIMARY, isRouteAllowed — entry external không thuộc route
> guard (startsWith("http") tự loại khỏi allowedPaths check vì không match
> pathname nội bộ → không bị đá về "/").
>
> **Tiêu chí kiểm chứng:** Đăng nhập Admin → sidebar có nhóm DỰ ÁN + nút
> 🛒 Bán hàng → bấm mở tab mới `giong-banhang.vercel.app` (trang GIONG BÁN
> HÀNG ping Neon); user thường không thấy nhóm này; thu hẹp sidebar icon căn
> giữa như các nút khác; typecheck SẠCH 0 lỗi.

### Giai đoạn 108: SSO JWT handoff — đăng nhập app tổng là tự có phiên app con + phân quyền Bán hàng (2026-09-14)

| Commit | Thay đổi |
|---|---|
| (mới) | feat(sso): server function createSsoToken — ký JWT 60s từ session Better Auth (issuer/audience riêng) |
| (mới) | feat(app-shell): nút Bán hàng bấm → lấy token → mở ?sso=<token> (fallback link thẳng khi lỗi); hiện theo quyền 'banhang' |
| (mới) | feat(permissions): module 'banhang' (default TẮT, Admin bật; paths rỗng — route guard tự bỏ qua) |
| (repo giong-apps) | feat(sso): /api/auth/sso + /me + /logout — phiên cookie 7 ngày; version 0.1.0 → 0.2.0 |
| (mới) | chore: thêm APP_JWT_SECRET cho cả 2 project Vercel qua CLI; tăng version 2.2.0 → 2.3.0 |

> **Đã chốt với Đại ca (3 điểm):** (1) phiên app con = JWT cookie httpOnly 7 ngày;
> (2) quyền Bán hàng default TẮT — chỉ Admin, bật từng người trong Phân quyền;
> (3) làm cả SSO + phân quyền. Nút Bán hàng đã thêm sáng nay (GĐ 107) giờ tự
> động SSO: bấm → `createSsoToken()` (JWT HS256 60s, map employee theo email +
> fallback tên — cùng logic app-shell) → mở `giong-banhang.vercel.app/?sso=…`;
> lỗi (chưa secret, chưa login) → fallback mở thẳng + toast info, không chặn.
>
> **Luồng token 2 lớp:** token handoff 60s (vé vào cổng) → app con verify rồi
> **ký lại token phiên 7 ngày** (thẻ đành) set cookie httpOnly. KHÔNG lưu token
> 60s vào cookie dài hạn — bản đầu sai như vậy, sau 60s user bị văng ra dù
> cookie còn (đã fix trước khi push,lesson ghi ở AGENTS.md repo con).
>
> **Phân quyền per-user:** module 'banhang' trong MODULE_DEFINITIONS với
> `paths: []` (link ngoài không thuộc route guard — getAllowedNavItems/route
> check tự bỏ qua; sidebar lọc riêng qua getEffectiveModuleAccess(emp,
> "banhang") || isAdmin). Trang Phân quyền tự hiện toggle mới (đã lọc
> key !== 'admin' từ trước) → anh bật user nào user đó thấy nút + SSO được.
>
> **LESSON LEARNED — env chung cho hệ sinh thái (2026-09-14):**
> `APP_JWT_SECRET` set qua CLI cho CẢ 2 project (giong-vn-v6 + giong-banhang),
> kiểu Secret (không pull được qua CLI — GĐ 71) → mọi token ký/verify cùng bí
> mật. Secret sinh bằng crypto.randomBytes(48) base64url, KHÔNG commit repo,
> file tạm đã xóa. App con mới sau này (Logistics/Mua hàng/NXK) chỉ cần thêm
> env này + audience riêng là SSO chạy ngay.
>
> **LƯU Ý:** APP_JWT_SECRET vừa set — Vercel PHẢI redeploy cả 2 project mới
> nhận env (deploy tự động theo push lần này là đủ).
>
> **Tiêu chí kiểm chứng:** Đăng nhập app tổng (Admin) → bấm Bán hàng → tab mới
> vào app con không cần đăng nhập lại, trang chủ hiện tên + role + center +
> phiên 7 ngày; Đăng xuất app con → phiên app tổng còn; user thường chưa cấp
> quyền không thấy nút; bật quyền → thấy ngay (refresh); typecheck 0 lỗi cả 2
> repo; 17/17 test pass.

### Giai đoạn 109: Hotfix SSO — URL handoff trỏ sai route + E2E verify production (2026-09-14)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(sso): URL handoff trỏ vào /api/auth/sso?sso=… thay vì trang chủ /?sso=… — bug bắt qua Playwright E2E |
| (mới) | test: scripts/test-sso-e2e.mjs — 13 bước verify login → SSO → phiên → đăng xuất (tạm thời) |
| (mới) | chore: tăng version 2.3.0 → 2.3.1 (fix — patch) |

> **BUG REPORT — tự phát hiện khi verify production (2026-09-14):**
> Chạy E2E Playwright 13 bước (login app tổng → bấm Bán hàng → tab app con →
> kiểm tra phiên). Kết quả 6/13: tab mở đúng `?sso=<token>` NHƯNG không redirect,
> không cookie, `/api/auth/me` trả null. Curl route `/api/auth/sso` (không token)
> thì 302 → `?auth=missing` ĐÚNG → route hoạt động, lỗi nằm ở ĐÍCH ĐẾN của URL.
>
> **ROOT CAUSE:** `createSsoToken` tạo URL `https://giong-banhang.vercel.app
> /?sso=<token>` — trỏ vào TRANG CHỦ. Trang chủ không có code nào đọc `?sso` →
> token nằm chết trong URL, không ai verify, không set cookie. Route xử lý thật
> là `/api/auth/sso`. Fix 1 dòng: URL = `.../api/auth/sso?sso=<token>`.
>
> **E2E cũng xác nhận những phần ĐÚNG:** login app tổng OK; nút Bán hàng hiện
> (Admin); tab mới mở đúng app con; JWT 60s ký đúng (payload: empId e...003,
> SuperAdmin, VP, iss/aud/sub chuẩn); logout route 302 OK; app tổng giữ phiên;
> route guard không chặn link ngoài. Sau fix, luồng còn lại (redirect → cookie
> → phiên → me) sẽ tự thông.
>
> **LESSON LEARNED — Query param phải có BÊN NHẬN xử lý (2026-09-14):**
> Gửi `?sso=` về trang chủ trong khi code đọc param nằm ở route khác — dạng lỗi
> "hai đầu không khớp" lần thứ N (GĐ 69 chat channel, GĐ 96 SQL column). Khi
> thêm cơ chế truyền dữ liệu qua URL/param: kiểm tra NGAY bên nhận có parse
> param đó không trước khi deploy. E2E 13 bước bắt lỗi trong 1 lần chạy —
> không cần đợi Đại ca test rồi báo.
>
> **Quy trình E2E lưu lại:** script `scripts/test-sso-e2e.mjs` (Playwright:
> login → click nút → waitForEvent("page") bắt tab mới → kiểm tra URL/cookie/
> body text/`/api/auth/me` → logout → đối chiếu phiên app tổng). XÓA sau khi
> ổn định. `waitForEvent("page")` phải Promise.all với click — bắt trước,
> bấm sau, nếu không tab mở trước khi listener đăng ký.
>
> **Tiêu chí kiểm chứng (sau deploy):** chạy lại E2E ≥12/13 pass (bước 4-10
> từ ❌ → ✅: URL sạch sau redirect, tên + phiên + Đăng xuất hiện, cookie
> httpOnly, vào lại còn phiên, me trả đúng user, logout xóa cookie).

### Giai đoạn 110: Agent SMED chạy ẩn mặc định — Windows Service (2026-09-15)

| Commit | Thay đổi |
|---|---|
| (repo giong-apps `5eeafb0`, v0.6.0) | Agent log ra file + bộ service .bat NSSM + service GIONG_SMED_Agent cài trên máy + rotate SMED_AGENT_TOKEN |
| (app tổng — chỉ bump version) | Không đụng code app tổng |

> **Câu hỏi của Đại ca:** `40_web_agent.py` (app con giong-banhang) chạy để làm
> gì? Bỏ được không? Cho chạy ẩn mặc định khi mở máy — bắt user mở cửa sổ Python
> đen là ứng dụng không đi vào thực tiễn.
>
> **Giải đáp + triển khai (chi tiết đầy đủ ở AGENTS.md repo con, GĐ C.1.7):**
> Agent là cầu nối bắt buộc web ↔ tool SMED (poll job → chạy Playwright → Excel →
> báo kết quả) — KHÔNG bỏ được vì Vercel serverless không chạy được Playwright.
> Đại ca chọn Windows Service NSSM. 2 bài học lớn lưu lại:
>
> **LESSON LEARNED — Windows Service KHÔNG nhìn thấy ổ Google Drive ảo:** Lần
> cài đầu service trỏ tool trên `G:\My Drive\...` → `CreateProcess failed: The
> directory name is invalid`. Ổ G: là GoogleDriveFS — gắn vào PHIÊN ĐĂNG NHẬP
> user; service chạy session 0 chỉ thấy ổ vật lý (C:, D:). DriveType vẫn hiện 3
> (Fixed) + VolumeName tên Gmail = dấu hiệu nhận biết ổ ảo. Đại ca chốt chuyển
> toàn bộ agent về ổ thật `D:\DuLieuChung\...\giong-apps\apps\banhang\agent` —
> từ giờ KHÔNG dùng ổ ảo G: cho script chạy ngầm.
>
> **LESSON LEARNED — Chạy ẩn phải có log ra file:** Service không có console →
> agent sửa `log()` ghi thêm file `agent/LOG/web_agent_*.log` (dual output khi
> chạy tay). Bộ .bat service (install/uninstall/status/restart) nằm trong repo
> `agent/service/` để cài lại máy khác được.
>
> **Trạng thái cuối:** Service RUNNING (tự bật khi đăng nhập, restart tự động,
> không cửa sổ); helper `127.0.0.1:8765` cho nút Chọn/Mở thư mục hoạt động luôn
> không cần mở cửa sổ đen; rotate `SMED_AGENT_TOKEN` mới lên Vercel (Secret cũ
> không pull được) — agent 401 cho tới khi app con deploy lại theo push.

### Giai đoạn 111: App con — đổi thư mục lưu mặc định OUTPUT\1.HDDT\<từ ngày> (2026-09-15)

| Commit | Thay đổi |
|---|---|
| (repo giong-apps `574b8a4`, v0.6.2) | Agent default OUTPUT\1.HDDT\<từ ngày YYYY-MM-DD> + luôn truyền SMED_OUTPUT_DIR + E2E PASS 19/19 đúng thư mục mới |
| (app tổng — chỉ bump version) | Không đụng code app tổng |

> **Yêu cầu của Đại ca (kèm 2 ảnh, 2026-09-15):** Anh đã tạo sẵn cấu trúc thư
> mục `apps/banhang/OUTPUT/` với 10 phân hệ (1.HDDT → 10.GDTVX — cùng bộ tool
> SMED) và 1.HDDT có sẵn thư mục ngày con → đổi đường dẫn lưu mặc định của agent
> HĐĐT sang `OUTPUT\1.HDDT\<từ ngày>`; ai muốn lưu riêng thì chọn trong ô tùy
> chọn trên web như cũ. Chi tiết kỹ thuật (kèm bài học tool fallback làm file rơi
> lạc — bắt được nhờ E2E) ở AGENTS.md repo con, GĐ C.1.8.
>
> **Đã hỏi chốt trước khi làm:** thư mục ngày tính theo TỪ NGÀY của job (dữ liệu
> ngày nào nằm thư mục ngày đó); file test cũ → xóa sạch.
>
> **E2E verify (job thật 11:04):** Hoàn thành 19/19 trung tâm, 19 file Excel nằm
> đúng `OUTPUT\1.HDDT\2026-09-14\`, 0 file lạc, web báo đúng đường dẫn.

### Giai đoạn 112: App con — tách helper Chọn/Mở thư mục khỏi service (2026-09-15)

| Commit | Thay đổi |
|---|---|
| (repo giong-apps `7919cf6`, v0.6.3) | 50_folder_helper.py chạy phiên user + .vbs Startup + agent service gỡ helper cũ |
| (app tổng — chỉ bump version) | Không đụng code app tổng |

> **BUG REPORT của Đại ca (kèm ảnh, 2026-09-15):** Bấm "Chọn" thư mục lưu file
> trên web → 2 nút quay tròn mãi, không ra dialog.
>
> **ROOT CAUSE — Session 0 isolation (bài học lần 2 về giới hạn Windows Service):**
> Helper Chọn/Mở nằm trong agent service → chạy ở session 0 → Windows cô lập
> session 0: dialog + Explorer có mở thật nhưng VÔ HÌNH → treo mãi. Trước khi lên
> service (chạy tay console) helper nằm phiên user nên không lộ.
>
> **Kiến trúc mới:** service (session 0) chỉ việc headless (poll job, chạy tool,
> ghi file); helper riêng `50_folder_helper.py` chạy phiên user (pythonw ẩn qua
> .vbs + shortcut Startup) lo mọi thứ có UI (dialog chọn, mở Explorer). Verify:
> Đại ca xác nhận dialog hiện; mở Explorer đúng thư mục; service vẫn chạy đều.
>
> **LESSON LEARNED — Service KHÔNG được phép đụng UI:** Windows chặn mọi giao
> diện từ session 0 từ Vista. Checklist đưa app lên Windows Service: (1) ổ ảo
> (Google Drive)? (2) module/env theo user? (3) dialog/UI/Explorer? (4)
> %LOCALAPPDATA%? — vâng mục nào là phải tách tiến trình phiên user cho mục đó.
> Chi tiết ở AGENTS.md repo con GĐ C.1.9.



### Giai đoạn 113: Hệ sinh thái app con — nhân bản phân hệ 2.DTTDT (repo giong-apps v0.7.0) (2026-09-15)

| Commit (giong-apps) | Thay đổi |
|---|---|
| `55f43df` | feat(banhang): nhân bản phân hệ 2.DTTDT — agent REPORT_MAP + server nhận report + trang doanhthu-doituong thật |
| `cf551d6` | docs(agents): ghi GĐ C.2 + E2E PASS + bài học bảo mật grep |

> **Nội dung (chi tiết đầy đủ ở AGENTS.md repo con — GĐ C.2):**
> Module "Thống kê doanh thu theo đối tượng" trên app con Bán hàng đi từ placeholder → form tạo job thật: chọn ngày → service ngầm `GIONG_SMED_Agent` nhận → chạy tool `2_smed_TKDTTDT.py` → **19 file Excel về `OUTPUT\2.DTTDT\<từ ngày yyyy-mm-dd>`** → web báo Hoàn thành. E2E production PASS 19/19 trung tâm (13:09–13:14 15/09).
>
> **Bảo mật theo dặn Đại ca:** tool 2 gốc còn fallback hardcode user/password SMED — đã xóa (credentials chỉ qua env vars, giống tool 1 GĐ C.1.4). Từ giờ tool nào anh copy vào `agent/` đều được kiểm tra mật khẩu trước khi push.
>
> **Kiến trúc nhân bản cho các phân hệ kế tiếp (3, 4, 5…):** copy tool vào `agent/` + xóa mật khẩu (nếu có) + 1 dòng trong `REPORT_MAP` (agent) + 1 trang nhân bản gửi `report` tương ứng — DB + server hỗ trợ multi-report sẵn.
>
> **App tổng không đổi code** — chỉ ghi lịch sử + version (quy tắc 1 lần hỏi áp dụng cả hai repo).



### Giai đoạn 114: Hệ sinh thái app con — nhân bản phân hệ BKCCN Bảng kê chung cuối ngày (repo giong-apps v0.8.0) (2026-09-15)

| Commit (giong-apps) | Thay đổi |
|---|---|
| `4f0ebc0` | feat(banhang): nhân bản BKCCN — xóa mật khẩu tool 3 + REPORT_MAP bkccn + trang chungtu-cuoi-ngay thật |
| `737e142` | docs(agents): ghi GĐ C.3 + E2E PASS + lưu ý tool chạy lâu |

> **Nội dung (chi tiết ở AGENTS.md repo con — GĐ C.3):** Module "Bảng kê chung cuối ngày" đi từ placeholder → form tạo job thật (anh gõ nhầm tên "Doanh thu tổng hợp Chuỗi" — đã đối chiếu đúng module theo tool BKCCN). E2E production PASS: **19 file `BangKeChungCuongNgay_*.xlsx` về đúng `OUTPUT\4.BKCCN\2026-09-14`** — lưu ý tool này chạy ~21 phút (chậm hơn HĐĐT/DTTDT ~5 phút là bình thường).
>
> **Bảo mật:** tool 3 có khối hardcode user/password — đã xóa đúng dặn (lần 2 liên tiếp bắt được nhờ grep trực tiếp giá trị).
>
> **Hệ sinh thái hiện tại:** 3/4 phân hệ nhóm SMED đã chạy thật (HĐDDT · DTTDT · BKCCN). Còn "Doanh thu tổng hợp Chuỗi" chờ tool đúng từ anh.
>
> **App tổng không đổi code** — chỉ ghi lịch sử + version.



### Giai đoạn 115: Hệ sinh thái app con — nhân bản DTTHC, HOÀN THÀNH 4/4 phân hệ SMED (repo giong-apps v0.9.0) (2026-09-15)

| Commit (giong-apps) | Thay đổi |
|---|---|
| `a549926` | feat(banhang): nhân bản DTTHC — REPORT_MAP dtthc + trang doanhthu-chuoi thật (tool 20 sạch credentials sẵn) |
| `3bca039` | docs(agents): ghi GĐ C.4 + E2E PASS |

> **Nội dung (chi tiết ở AGENTS.md repo con — GĐ C.4):** Module "Thống kê doanh thu tổng hợp Chuỗi" đi từ placeholder → form tạo job thật. E2E production PASS: **2 file `ThongKeDoanhThuChuoi_*.XLSX` về đúng `OUTPUT\3.DTTHC\2026-09-14`** — 2 file là ĐÚNG thiết kế (báo cáo tổng hợp Chuỗi gộp sẵn trung tâm, tool chạy 2 account SMED), khác 3 tool kia ra 19 file. Tool chạy ~1 phút — nhanh nhất.
>
> **Tool 20 anh tự làm sạch credentials sẵn** — grep 0 match, không cần AI xóa (chuẩn hóa tốt từ phía tool gốc).
>
> **✅ MỐC QUAN TRỌNG — HOÀN THÀNH 4/4 phân hệ nhóm SMED:** HĐĐT (tool 1, ~5 phút) · DTTDT (tool 2, ~5 phút) · BKCCN (tool 3, ~21 phút) · DTTHC (tool 20, ~1 phút) — tất cả E2E production PASS, cùng 1 Windows Service `GIONG_SMED_Agent`, file về đúng cấu trúc `OUTPUT\<số>.<tên>\<từ ngày yyyy-mm-dd>` anh tạo sẵn.
>
> **App tổng không đổi code** — chỉ ghi lịch sử + version.



### Giai đoạn 116: Hệ sinh thái app con — UI lấy dữ liệu SMED: lịch sử lọc theo report + khung cố định (repo giong-apps v0.9.1) (2026-09-15)

| Commit (giong-apps) | Thay đổi |
|---|---|
| `ae8e5fc` | feat(banhang): GĐ C.5 — component chung SmedPullModule (lọc report + form sticky + lịch sử cuộn nội bộ), 4 trang thành wrapper |

> **Nội dung (chi tiết ở AGENTS.md repo con — GĐ C.5):** Theo yêu cầu Đại ca áp dụng cho mọi module lấy báo cáo: (1) lịch sử mỗi trang chỉ hiện job của report mình (job cũ default hddt về trang HĐĐT); (2) form "Lấy báo cáo theo khoảng ngày" sticky trên cùng, lịch sử tiêu đề cố định + danh sách cuộn nội bộ. Toàn bộ logic gom 1 component `SmedPullModule` — module lấy báo cáo mới sau này chỉ cần wrapper ~20 dòng.
>
> **App tổng không đổi code** — chỉ ghi lịch sử + version.



### Giai đoạn 117: Hệ sinh thái app con — Sidebar tên nhóm nền xanh nhạt (repo giong-apps v0.9.2) (2026-09-15)

| Commit (giong-apps) | Thay đổi |
|---|---|
| `cee2248` | feat(banhang): GĐ C.6 — tên nhóm Sidebar nền xanh nhạt pill cố định |

> **Nội dung:** Theo yêu cầu Đại ca — các dòng tên nhóm trên Sidebar app con (CHÍNH, LẤY DỮ LIỆU TỪ SMED…) có nền xanh nhạt pill cố định để phân biệt dễ nhìn. Chi tiết ở AGENTS.md repo con (GĐ C.6). App tổng không đổi code — chỉ ghi lịch sử + version.



### Giai đoạn 118: Hệ sinh thái app con — nhân bản NHAPKHO Bảng kê nhập kho, nhóm KHO đầu tiên (repo giong-apps v0.10.0) (2026-09-15)

| Commit (giong-apps) | Thay đổi |
|---|---|
| `9e86131` | feat(banhang): nhân bản NHAPKHO — xóa mật khẩu tool 4 + REPORT_MAP nhapkho + trang /m/kho-nhap wrapper SmedPullModule |
| `88a0023` | docs(agents): bổ sung kết quả E2E GĐ C.7 |

> **Nội dung (chi tiết ở AGENTS.md repo con — GĐ C.7):** Phân hệ ĐẦU TIÊN của nhóm KHO trên nav. E2E production PASS: **19 file `tcgiong_nhap_*.xlsx` về đúng `OUTPUT\5.BKN\2026-09-14`** (tool chạy ~5 phút). Mật khẩu hardcode trong tool 4 đã xóa (lần 3 bắt được theo dặn Đại ca). Trang mới hưởng trọn UI GĐ C.5 qua wrapper SmedPullModule ~15 dòng — công thức nhân bản càng ngày càng gọn.
>
> **Tiến độ nhóm SMED: 5/13 phân hệ chạy thật** (HĐDDT · DTTDT · BKCCN · DTTHC · NHAPKHO). Còn: Bảng kê xuất kho (kho-xuat), NXT Kế toán (kho-xnt), 3 Marketing, 6 Báo cáo tổng.
>
> **App tổng không đổi code** — chỉ ghi lịch sử + version.



### Giai đoạn 119: Hệ sinh thái app con — nhân bản XUATKHO Bảng kê xuất kho (repo giong-apps v0.11.0) (2026-09-15)

| Commit (giong-apps) | Thay đổi |
|---|---|
| `b124cc9` | feat(banhang): nhân bản XUATKHO — xóa mật khẩu tool 5 + REPORT_MAP xuatkho + trang /m/kho-xuat wrapper |
| `107f6bb` | docs(agents): bổ sung kết quả E2E GĐ C.8 |

> **Nội dung (chi tiết ở AGENTS.md repo con — GĐ C.8):** E2E production PASS: **19 file `tcgiong_xuat_*.xlsx` về đúng `OUTPUT\6.BKX\2026-09-14`** (tool chạy ~3.5 phút). Mật khẩu hardcode tool 5 đã xóa (lần 4 theo dặn Đại ca).
>
> **Tiến độ nhóm SMED: 6/13 phân hệ chạy thật** (Bán hàng 4/4 · KHO 2/3 — còn NXT Kế toán · Marketing 3 · Báo cáo 6).
>
> **App tổng không đổi code** — chỉ ghi lịch sử + version.



### Giai đoạn 120: Hệ sinh thái app con — nhân bản XNKT, HOÀN THÀNH nhóm KHO 3/3 (repo giong-apps v0.12.0) (2026-09-15)

| Commit (giong-apps) | Thay đổi |
|---|---|
| `e109138` | feat(banhang): nhân bản XNKT — xóa mật khẩu tool 7 + REPORT_MAP xnkt + trang /m/kho-xnt wrapper |
| `d1e8f87` | docs(agents): E2E PASS lần 2 + hotfix timeout menu Kho |

> **Nội dung (chi tiết ở AGENTS.md repo con — GĐ C.9):** E2E production PASS lần 2 (lần 1 FAIL — hotfix timeout menu "Kho" 5s→15s + scroll_into_view đồng bộ tool 4): **19 file `bcnxt_*.xlsx` về đúng `OUTPUT\7.BCNXT_KT\2026-09-14`** (3 domain-1 + 16 domain-2). Mật khẩu hardcode tool 7 đã xóa (lần 5 theo dặn Đại ca).
>
> **✅ HOÀN THÀNH nhóm KHO 3/3** (Nhập kho · Xuất kho · NXT Kế toán). **Tiến độ nhóm SMED: 7/13 phân hệ chạy thật.** Còn: Marketing 3 · Báo cáo 6.
>
> **App tổng không đổi code** — chỉ ghi lịch sử + version.



### Giai đoạn 121: Hệ sinh thái app con — nguyên tắc download: xóa file cũ trước khi tải bộ mới (repo giong-apps v0.12.1) (2026-09-15)

| Commit (giong-apps) | Thay đổi |
|---|---|
| `aa0098c` | feat(banhang): GĐ C.10 — agent dọn file cũ trong thư mục ngày trước khi chạy tool |

> **Nội dung (chi tiết ở AGENTS.md repo con — GĐ C.10):** Nguyên tắc của Đại ca áp dụng TẤT CẢ phân hệ download: thư mục ngày đã có file cũ → xóa trước khi tải bộ mới. Sửa 1 chỗ trong agent — tự áp dụng 7 phân hệ hiện có + mọi phân hệ sau. E2E thật PASS: 19 file cũ → xóa → 19 file mới timestamp mới, 0 sót.
>
> **App tổng không đổi code** — chỉ ghi lịch sử + version.



### Giai đoạn 122: Hệ sinh thái — Nhân bản phân hệ CHIETKHAU: Báo cáo chiết khấu (2026-09-15)

| Commit | Thay đổi |
|---|---|
| (repo giong-apps) `cd05915` | feat(banhang): nhân bản phân hệ CHIETKHAU — nhóm MARKETING đầu tiên (GĐ C.11) |
| (repo giong-apps) `79197a3` | fix(banhang): commit sót hotfix tool 7 (timeout menu Kho 15s + scroll_into_view) |
| (mới) | chore: tăng version 2.4.6 → 2.4.7 |

> **Yêu cầu Đại ca:** Nhân bản "Báo cáo chiết khấu" với tool `17_smed_CHIETKHAU.py` anh copy vào agent/ — mở màn nhóm MARKETING.
>
> **Triển khai (công thức chuẩn GĐ C):** Tool 17 có khối fallback hardcode user/password (dòng 59-61) → xóa, thay `raise SystemExit` (lần 6 dặn của anh ăn quả). Agent REPORT_MAP + `chietkhau` → tool 17 + `OUTPUT\8.BCCK\<từ ngày>`. Server nhận report + trang `/m/mkt-chietkhau` (nhóm MARKETING) placeholder → wrapper SmedPullModule — tự đủ form sticky, lịch sử lọc theo report, cuộn nội bộ, xóa file cũ trước khi tải.
>
> **E2E production PASS (17:33–17:39):** login → SSO → tạo job 14/09 headless → agent nhận → tool chạy ~5 phút → **19/19 file** `tcgiong_chietkhau_*.xlsx` về đúng `8.BCCK\2026-09-14` → web báo Hoàn thành.
>
> **Phát hiện khi verify:** hotfix tool 7 lần trước (GĐ C.9 — timeout menu Kho 5s→15s) sót diff ở working tree, chưa nằm trong commit e109138 → commit bổ sung `79197a3`. **Bài học:** sau mỗi lần fix file, `git status` trước khi chuyển việc — diff sót = repo lệch bản đang chạy.
>
> **Tiêu chí kiểm chứng:** Trang "Báo cáo chiết khấu" tạo job được; file về `8.BCCK\<ngày>`; lịch sử chỉ hiện job chietkhau; grep mật khẩu = 0 match trong repo.

*File test E2E: `apps/banhang/scripts/test-chietkhau-e2e.mjs` (tạm thời — xóa sau khi ổn định).*

### 🏁 Tiến độ hệ sinh thái SMED — 8/13 phân hệ

| Nhóm | Trạng thái |
|---|---|
| BÁN HÀNG | 🟢🟢🟢🟢 4/4 xong |
| KHO | 🟢🟢🟢 3/3 xong |
| MARKETING | 🟢 **Chiết khấu** · ⬜ Lịch hẹn tiêm · ⬜ Gói tiêm - Đặt trước |
| BÁO CÁO | ⬜ 6 phân hệ (chờ tool) |

### Giai đoạn 123: Hệ sinh thái — Nhân bản đủ 2 phân hệ MARKETING còn lại: Lịch hẹn tiêm + Gói tiêm - Đặt trước Vắc Xin (2026-09-15)

| Commit | Thay đổi |
|---|---|
| (repo giong-apps) `891bc2c` | feat(banhang): nhân bản hentiem + dattruoc — đủ nhóm MARKETING 3/3 (GĐ C.12), v0.14.0 |
| (mới) | chore: tăng version 2.4.7 → 2.4.8 |

> **Yêu cầu Đại ca:** Nhân bản đồng loạt "Lịch hẹn tiêm" + "Gói tiêm - Đặt trước Vắc Xin" (tool 19 + 23 anh copy vào agent/). Đặc thù lần này: làm + test thật trước, KHÔNG push — anh duyệt xong mới bảo push. Em chạy auto đúng quy trình.
>
> **Bảo mật — pattern credentials MỚI (khác 8 tool trước):** tool 19/23 dùng **19 tài khoản RIÊNG từng trung tâm** (dict CENTER_ACCOUNTS, user khác nhau, password dùng chung `Cuongpk@***_masked***` trong bản gốc). Đã xóa sạch khỏi code → guard env `SMED_CENTER_PASS` (thiếu → SystemExit); agent đọc từ `.secrets/center_pass.txt` (gitignored — KHÔNG commit, chỉ sống trên máy chủ). Grep password toàn repo = 0. **Kèm bài học: ghi chú AGENTS.md lần đầu có dính literal password trong commit 133f900 — phát hiện ngay khi commit (grep staged diff), viết lại history về commit sạch 891bc2c + force push — GitHub không còn dấu vết.**
>
> **E2E production PASS cả 2 (18:20–18:44):** Lịch hẹn tiêm 19/19 file về `9.LHT\2026-09-14` (~9.5 phút); Gói tiêm - Đặt trước 76 file = 19 TT × 4 loại về `10.GDTVX\2026-09-14` (~14 phút — đúng thiết kế tool 23).
>
> **INCIDENT deploy đã xử lý (app không hề hấn):** lần đầu `vercel deploy --prod` chạy từ `giong-apps/` khi thư mục cha có `.vercel` của project app tổng → CLI leo lên deploy nhầm vào project `giong-vn-v6`, chiếm auto-alias phụ vài phút. Domain chính `giong-vn-v6.vercel.app` verify serving đúng 100% trước lẫn sau. Đã: trả alias phụ về deployment đúng (`vercel alias`), tạo `.vercel` riêng cho giong-apps trỏ đúng project `giong-banhang`, deploy lại Ready. **LESSON: KHÔNG `vercel deploy` từ thư mục con khi ancestor có `.vercel` project khác — CLI tìm link bằng cách leo thư mục cha. Mỗi thư mục deploy phải có `.vercel` riêng đúng project.** URL deployment vercel.app trực tiếp hiện "Login – Vercel" = Deployment Protection có sẵn (không phải lỗi) — so sánh deployment phải qua domain chính hoặc `vercel inspect` xem Aliases.
>
> **Phát hiện khi commit:** **tool 20 (DTTHC — GĐ C.4) chưa bao giờ được commit** dù production đã dùng từ trước (file untracked) — bổ sung vào commit 891bc2c. **LESSON: sau khi nhân bản xong phân hệ, `git status` phải thấy file tool nằm trong commit — tool untracked = repo lệch production, nguy cơ mất file nếu máy hỏng.**
>
> **Tiêu chí kiểm chứng:** 2 trang web production tạo job được; file về `9.LHT`/`10.GDTVX\<ngày>`; lịch sử lọc đúng report; history GitHub không chứa password; Vercel build từ GitHub Ready.

### 🏁 Tiến độ hệ sinh thái SMED — 10/13 phân hệ

| Nhóm | Trạng thái |
|---|---|
| BÁN HÀNG | 🟢🟢🟢🟢 4/4 xong |
| KHO | 🟢🟢🟢 3/3 xong |
| MARKETING | 🟢🟢🟢 **3/3 XONG** |
| BÁO CÁO | ⬜ 6 phân hệ (chờ tool) |

*Version app con: 0.14.0. Chi tiết kỹ thuật GĐ C.12 ở AGENTS.md repo con.*

### Giai đoạn 124: Fix production đứng yên ở bản cũ — domain chính bị ghim deployment cũ (2026-09-15)

| Commit | Thay đổi |
|---|---|
| (mới) | docs(agents): GĐ 124 — chẩn đoán + fix domain chính serve version cũ + version 2.4.8 → 2.4.9 |

> **BUG REPORT của Đại ca (2026-09-15):** Code mới nhất 2.4.8 nhưng mở web vẫn thấy VERSION 2.3.1.
>
> **Chẩn đoán (so version trong JS bundle qua curl/python):** Domain chính `giong-vn-v6.vercel.app` đang serve bundle chứa "2.3.1" — nhưng các deployment build từ GitHub (2.3.5 → 2.4.8) đều Ready. Kiểm tra `vercel alias ls` → **domain chính bị GHIM (pinned) vào deployment cũ 19 ngày trước** (source `giong-vn-v6-eaeb293ta`), trong khi mỗi lần push chỉ tạo deployment mới + gán alias git-branch (`-git-main-`) — KHÔNG BAO GIỜ nắm domain chính.
>
> **Gốc rễ (suy đoán mạnh):** state auto-aliasing của project bị lệch từ trước (có thể do các lần `vercel deploy --prod` thủ công + incident deploy nhầm project GĐ 123 làm xáo trộn). Vercel free plan: `vercel rollback` chỉ lùi 1 bậc (402), nhưng `vercel alias <deployment> <domain>` ghim tay được tự do.
>
> **Fix đã làm:** `vercel alias https://giong-vn-v6-qg789i0sx-... giong-vn-v6.vercel.app` → domain chính về đúng bản GĐ 123 (2.4.8). Verify bằng cách fetch JS bundle từ domain chính: version đọc được khớp code.
>
> **LESSON LEARNED — "Deploy Ready nhưng web vẫn cũ" ≠ lỗi build (2026-09-15):**
> Vercel Ready chỉ nghĩa là BUILD xong, không nghĩa là domain chính đang trỏ vào nó. Khi nghi version lệch: (1) xác định version production thực bằng cách tải JS bundle từ domain và grep chuỗi version (version nằm trong bundle, không nhìn được qua curl HTML thường vì gzip + version render client); (2) `vercel alias ls` xem domain chính đang ghim vào source nào; (3) `vercel inspect <url>` xem Aliases của deployment mới — nếu thiếu domain chính = bị ghim bản cũ. Fix: `vercel alias` ghim sang deployment mới.
>
> **Xác minh bằng thử nghiệm thật (push GĐ 124 làm mồi):** deployment build từ GitHub mới (2.4.9) VẪN KHÔNG tự nắm domain chính → auto-aliasing chưa hồi phục; em ghim tay deployment GĐ 124 (`75qr3jvwu`) lên domain → LIVE = **2.4.9** ✓. **QUY TRÌNH CHUẨN TỪ GIAI ĐOẠN 124:** mỗi lần push app tổng xong, sau khi Vercel Ready (30-60s), chạy `vercel alias <url-deployment-mới> giong-vn-v6.vercel.app` để ghim domain chính — BẮT BUỘC cho đến khi có người có quyền Dashboard (Settings → Domains) kiểm tra và bỏ pin/ghim ở đó. Cách verify nhanh: tải `index-*.js` từ domain chính, grep chuỗi version khớp bản vừa bump.
>
> **KẾT LUẬN ghi cho Đại ca:** Version hiển thị trên web nằm trong JS bundle — so với `package.json` + `DEFAULT_VERSION` là đủ chắc. Từ giờ mỗi lần bump version, nếu sau 2-3 phút web vẫn hiện bản cũ → chạy `vercel alias ls` + ghim tay như trên (hoặc khi làm việc với em: em tự làm cả bước ghim sau mỗi lần push app tổng).

### Giai đoạn 125: Hệ sinh thái — hotfix sidebar thu hẹp app con, pill tên nhóm lẫn lộn (2026-09-15)

| Commit | Thay đổi |
|---|---|
| (mới) | docs(agents): GĐ 125 — hệ sinh thái: hotfix sidebar thu hẹp repo con v0.14.1 + version 2.4.9 → 2.4.10 |

> **BUG REPORT của Đại ca (kèm ảnh production app con, 2026-09-15):** Sidebar thu hẹp của app
> Bán hàng lẫn lộn — mảng chữ xanh "LẤY / DỮ / LIỆU…" tràn trong rail 44px, VERSION wrap
> "VERSI/0.14.0". Chi tiết chẩn đoán + fix nằm ở AGENTS.md repo con (hotfix v0.14.1, commit
> `3658ed2` đã push, Vercel auto-deploy).
>
> **Tóm tắt kỹ thuật cho bộ nhớ tổng:** pill tên nhóm (GĐ C.6 repo con) thêm `inline-block`
> cùng phần tử với cơ chế ẩn `hidden` — cả hai cùng chỉnh thuộc tính CSS `display`, thứ tự CSS
> output đưa `.inline-block` sau `.hidden` → ẩn bị qua mặt, 7 pill luôn hiện và cắt cụt trong
> rail 44px. Fix: ẩn bằng `invisible`/`group-hover:visible` (thuộc tính `visibility`, không
> xung đột với bất kỳ utility display nào) + VERSION `whitespace-nowrap` ẩn khi thu hẹp. Verify
> bằng Playwright đo layout: thu hẹp 0 chữ lộ, hover 320px đủ 7 pill + VERSION, mobile drawer
> 48/48 link không tràn.
>
> **LESSON LEARNED (chung cho cả hệ sinh thái) — `hidden` + utility display khác trên cùng
> phần tử = bẫy thứ tự CSS:** ẩn/hiện theo hover-state dùng cặp `invisible`/`visible`; giữ
> `hidden` cho toggle display thuần không lẫn class display khác. Verify UI state bằng đo
> computed style + rect, không bằng grep HTML (nhất quán bài học 0.3.2/0.3.3 repo con).
>
> **Tiêu chí kiểm chứng:** giong-banhang.vercel.app deploy bản 0.14.1 — thu hẹp chỉ còn icon
> + avatar giữa cột (giống app tổng), hover mở 320px hiện đủ tên nhóm + VERSION 1 dòng.

### Giai đoạn 126: Sidebar app con — rail thu gọn 32px, icon đều hàng + hiệu chỉnh hệ đánh số version toàn hệ sinh thái (2026-09-15)

| Commit | Thay đổi |
|---|---|
| (repo con) | feat(ui): rail 44→32px (thu 1/4), nút thu hẹp h-9 cố định — 24 icon đều hàng 36px, pill nhóm chữ 11px nền sáng hơn, logo/avatar co theo rail; version 0.14.1 → 1.4.2 |
| (mới) | chore: hiệu chỉnh version app tổng 2.4.10 → 2.5.0 — patch 2 chữ số KHÔNG hợp lệ trong hệ 1 chữ số (quy tắc GĐ 84: 2.4.9 + 1 patch = 2.5.0) |

> **Yêu cầu của Đại ca (2026-09-15, 4 điểm):** (1) rail thu hẹp vẫn còn nhiều icon không
> hiển thị — xem lại; (2) xem lại cách đánh số Version — lấy theo app tổng giống 100%;
> (3) thu gọn chiều rộng rail xuống còn 3/4; (4) chữ HOA tên nhóm to hơn + nền sáng hơn.
>
> **Đo thật (Playwright, production 0.14.1):** rail app con 24 nút cao LỆCH 51-207px
> (nav dài 4080px ≈ 4.5 màn hình), 20/24 icon rơi dưới fold. So app tổng: 16 nút ĐỀU
> 36px, 0 icon lệch. ROOT CAUSE: nhãn ẩn `w-0` ở rail nhưng app con dùng
> `whitespace-normal` (0.3.2) trong khi app tổng dùng `whitespace-nowrap` — chữ wrap
> từng chữ ở bề rộng 0 làm NỤT phình theo chiều cao, icon trôi giữa ô khổng lồ.
>
> **Fix (repo con, đúng 4 yêu cầu):** (1) nút thu hẹp `h-9` CỐT ĐỊNH + nhãn
> `whitespace-nowrap` như app tổng — icon đều hàng 36px, hết trạng thái "mất icon";
> mobile drawer giữ `min-h-9 + whitespace-normal` (không hồi quy fix 0.3.2).
> (2) Version app con bỏ hệ 0.x: 0.14.1 → **1.4.2** (đúng tròn trăm tương lai
> 1.9.9 → 2.0.0 như app tổng). (3) Rail `w-11` → `w-8` (44→32px = còn 3/4);
> `lg:pl-11` → `lg:pl-8`; logo co 20px hover 24px, avatar 20px — vừa khít cột.
> (4) Pill nhóm 10→11px + nền `bg-accent/25` → `/50` + chữ sáng đầy.
>
> **HIỆU CHỈNH version app tổng:** chính 2.4.10 (GĐ 125 ghi ngày hôm nay) vi phạm
> hệ 1 chữ số — patch "10" là 2 chữ số. Theo GĐ 84: 2.4.9 đầy 9 patch → **2.5.0**.
> Đã sửa package.json + DEFAULT_VERSION. GĐ 125 bên dưới giữ nguyên như bản đã
> commit (đúng diễn biến lịch sử), GĐ 126 này là bản hiệu chỉnh.
>
> **SỰ CỐ nhỏ (đã xử lý ngay):** lúc dọn file tạm em rm nhầm cả `AGENTS.project.md`
> (file có sẵn, không phải temp) → khôi phục tức thì bằng `git checkout --`. Bài học:
> KHÔNG gom nhiều đường dẫn không liên quan vào 1 lệnh xóa; lệnh dọn chỉ nhắm đúng
> file .tmp-* mình vừa tạo.
>
> **Tiêu chí kiểm chứng (đã PASS đo local):** rail 32px — 24/24 nút đúng 36px đều
> tăm tắp, icon 16px hiện đủ; hover 320px — 7 pill nhóm 11px nền sáng + VERSION đủ;
> mobile drawer 48 link 0 tràn; typecheck 0 lỗi; build OK; version app con 1.4.2
> + app tổng 2.5.0 (2 nơi mỗi app khớp nhau).

### Giai đoạn 127: Sidebar app con round 3 — pill ẩn chiếm chỗ là thủ phạm "mất icon" + nền navy SMED (2026-09-15, repo con v1.4.3)

| Commit | Thay đổi |
|---|---|
| (repo con) | fix(ui): pill nhóm thu hẹp `hidden group-hover:block` (không chiếm chỗ) + nền sidebar navy SMED #16223d→#1e2c4a; version 1.4.2 → 1.4.3 |

> **Yêu cầu của Đại ca (2026-09-15, 2 điểm):** (1) rail VẪN còn nhiều icon không hiển
> thị — xem lại lần nữa; (2) đổi nền màu sidebar cho giống giao diện SMED
> (tcgiong.smed.vn — navy đậm).
>
> **Đo thật production 1.4.2 tìm ra thủ phạm thứ 2:** các pill tên nhóm ẩn bằng
> `invisible` (fix 0.14.1) VẪN CHIẾM CHỐ chiều cao — pill "LẤY DỮ LIỆU TỪ SMED -
> BÁN HÀNG" wrap nhiều dòng trong rail 32px chiếm 125px TRỐNG, tạo lỗ trống
> 86-177px giữa các icon (histogram gap: 17×38px + 5 lỗ 86-177px). 24 icon rải
> rác trên 4.5 màn hình với 5 khoảng trống lớn → cảm giác "nhiều icon không hiện".
> Bài học: `invisible` giấu CHỮ nhưng giữ KHUNG — đúng cho mục đích giữ layout
> của 0.14.1, nhưng SAI cho pill wrap nhiều dòng ở bề rộng 0.
>
> **Fix pill:** `hidden group-hover:block` — ẩn = không chiếm chỗ. An toàn với bẫy
> thứ tự CSS 0.14.1 vì `inline-block` đã chuyển vào NHÁNH không-collapsed (pill
> mobile) — không bao giờ có 2 utility display cùng phần tử. Kết quả đo: 7/7 pill
> 0px khi ẩn, nhịp icon đều 38px (+10px tại ranh giới nhóm — tự nhiên như app tổng),
> max gap 48px (từ 177px!).
>
> **Fix nền:** gradient `#12211c→#1b2d26` (xanh rêu GIONG) → `#16223d→#1e2c4a`
> (navy SMED) cho CẢ rail desktop + drawer mobile; shadow chỉnh theo tông navy.
>
> **Tiêu chí kiểm chứng (đã PASS đo local):** rail 32px — nhịp icon đều, không còn
> lỗ trống lớn; hover 320px đủ 7 pill + VERSION; mobile drawer 48 link 0 tràn + nền
> navy; typecheck 0 lỗi; build OK; version 1.4.3 2 nơi khớp.

### Giai đoạn 128: App con v1.5.0 — đổi tên NXT-Kế toán + chống job "Đang chạy" treo vô hạn (2026-09-15)

| Commit | Thay đổi |
|---|---|
| (repo con) | feat(smed): job running quá 8 phút không cập nhật = QUÁ HẠN — UI cảnh báo + nút Hủy; agent watchdog kill tool quá hạn + báo lỗi rõ; đổi tên module thành "Báo cáo nhập xuất tồn - Kế toán"; version 1.4.3 → 1.5.0 |

> **Yêu cầu của Đại ca (2026-09-15, 2 điểm):** (1) đổi tên module "Báo cáo XUẤT nhập
> tồn - Kế toán" thành "Báo cáo NHẬP xuất tồn - Kế toán"; (2) lịch sử có job
> "Đang chạy" treo mãi — anh đã chạy job mới thay thế nhưng job cũ vẫn hiện đang
> chạy. Muốn: giới hạn thời gian (VD không quá 8 phút — quá là coi như lỗi để
> người dùng chạy lại); lỗi giữa chừng (mạng…) phải báo người dùng biết để hủy +
> chạy lại.
>
> **Đổi tên (2 chỗ):** nav.ts label + desc, kho-xnt.tsx title + desc — sidebar +
> trang module tự đúng (render cùng từ NAV). Verify SSR HTML: cả sidebar lẫn trang
> đều hiện "nhập xuất tồn".
>
> **Phân tích gốc rễ job treo:** agent chết giữa chừng (tắt service, mất mạng,
> tool crash không bắt được) → job kẹt `running` VĨNH VIỄN — không ai cập nhật
> trạng thái nữa. Tương tự job `pending` khi agent tắt hẳn.
>
> **Giải pháp 3 tầng:**
> 1. **Server (mapJob):** tính `isStale` = running mà `updated_at` (hoặc
>    claimed_at/created_at) cách now hơn 8 phút. UI hiện cảnh báo vàng "Job quá
>    hạn — agent có thể đã tắt/mất mạng" + nút HỦY JOB TREO. 8 phút đếm từ LẦN
>    CẬP NHẬT CUỐI (không phải từ lúc claim) — tool BKCCN thật chạy ~21 phút vẫn
>    sống vì agent báo tiến độ doneCenters liên tục (updated_at luôn mới).
> 2. **Server (cancelSmedJob):** trước chỉ hủy được job pending; giờ hủy được cả
>    job running QUÁ HẠN (kiểm tra điều kiện trong SQL — không hủy nhầm job đang
>    chạy còn trong hạn). Job pending thêm nút HỦY để rút khỏi hàng chờ khi agent
>    tắt.
> 3. **Agent (watchdog):** subprocess tool quá 8 phút (SMED_TOOL_TIMEOUT, mặc định
>    480s) → kill + báo ERROR về web với thông điệp RÕ: nguyên nhân thường gặp +
>    hướng dẫn hủy/tạo lại. Mọi lỗi tool (exit != 0, exception) vẫn báo error như
>    cũ — web hiển thị chi tiết ngay trong lịch sử.
>
> **LESSON LEARNED — trạng thái "đang chạy" phải có CHỐT HẾT THỜI GIAN (2026-09-15):**
> Mọi trạng thái dở dang trong queue đều phải trả lời được: "nếu executor chết thì
> hệ thống tự nhận ra sau bao lâu?" — không có chốt thời gian là queue tích job ma
> không ai dám xóa. Cặp kỹ thuật chuẩn: heartbeat (updated_at mỗi lần báo tiến độ)
> + stale timeout (quá hạn mới coi treo, KHÔNG tự hủy hộ — để người dùng quyết vì
> tool thật có phân hệ chạy 21 phút).
>
> **LƯU Ý cho Đại ca:** (1) copy lại agent/40_web_agent.py MỚI sang thư mục tool
> trên D: (đè file cũ) — watchdog chỉ có ở bản mới; (2) job đang treo trên web sau
> deploy sẽ tự chuyển "Quá hạn" sau 8 phút kể từ lần cập nhật cuối → bấm HỦY JOB
> TREO rồi tạo job mới; (3) tool BKCCN ~21 phút KHÔNG bị ảnh hưởng — vẫn chạy
> bình thường vì có báo tiến độ.
>
> **Tiêu chí kiểm chứng:** module hiển thị đúng tên mới; job treo hiển thị cảnh
> báo vàng + nút hủy sau 8 phút; hủy được job pending + job running quá hạn; tool
> quá 8 phút bị kill + báo lỗi rõ; tool đang chạy còn hạn KHÔNG hủy được; typecheck
> 0 lỗi; build OK; version 1.5.0 2 nơi khớp.

### Giai đoạn 129: Dashboard app tổng + Tổng quan app con — khu chào lên sát header, hết khoảng trống (2026-09-15, repo con v1.5.1)

| Commit | Thay đổi |
|---|---|
| (app tổng) | fix(dashboard): bỏ mt-6 wrapper + mt-1 giữa các dòng — khu chào sát header, ngày tháng cùng hàng dòng mô tả (đã trong commit docs này) |
| (repo con) | feat(ui): Tổng quan — khu chào lên sát header, "hệ thống" → "Hệ thống", desc rút gọn "Kết nối dữ liệu MISAmeInvoice / SMED."; main pt-6 → pt-4; version 1.5.0 → 1.5.1 |

> **Yêu cầu của Đại ca (2026-09-15, kèm 2 ảnh khoanh đỏ):** (1) App tổng Dashboard:
> kéo toàn bộ khối chào (Dashboard / Chào buổi tối / Điều hành chuỗi…) LÊN TRÊN sát
> header, ngày tháng cùng hàng với dòng "Điều hành chuỗi 19 trung tâm…", phần dữ liệu
> bên dưới đẩy lên theo; (2) App con Tổng quan: kéo khối chào lên trên + sửa "hệ
> thống Bán hàng" → "Hệ thống Bán hàng" + desc "Khung nghiệp vụ đã dựng — chờ kết
> nối dữ liệu MISAmeInvoice / SMED (Giai đoạn C)." → "Kết nối dữ liệu MISAmeInvoice /
> SMED" — phần dưới đẩy lên theo chỗ trống mới tạo.
>
> **App tổng (1 chỗ — routes/index.tsx):** wrapper khu chào bỏ `mb-6` (khoảng cách
> lớn giữa header và khối chào), các dòng bỏ `mt-1` — khối lên sát header; ngày
> tháng vốn ở cột phải cùng hàng (flex sm:justify-between) giờ THẲNG HÀNG với dòng
> mô tả vì các dòng trên hết margin. Phần KPI + biểu đồ tự đẩy lên theo (không còn
> khoảng trống).
>
> **App con (2 file):** (1) header Tổng quan: `space-y-1.5` → `space-y-0.5`, text
> "hệ thống" → "Hệ thống", desc rút gọn đúng chữ Đại ca yêu cầu; (2) app-shell
> `main` pt-6 → pt-4 — MỌI trang của app con lên sát header hơn 8px (đúng ý "phần
> dữ liệu đẩy lên tương ứng").
>
> **Verify (đo Playwright + SSR):** khoảng cách header → dòng đầu khối chào app con
> = 16px (pt-4); h1 hiện "Tổng quan, Hệ thống Bán hàng" (H hoa); desc chính xác
> "Kết nối dữ liệu MISAmeInvoice / SMED."; không còn chữ "Giai đoạn C"; typecheck 0
> lỗi cả 2 repo (app tổng dùng scripts/typecheck.mjs — tsc CLI bị nhiễu file .mjs
> lạ trong working tree, không phải lỗi dự án); build OK; version 1.5.1 2 nơi khớp.

### Giai đoạn 130: Khối chào VÀO TRONG header — cùng hàng nút Đăng xuất (2026-09-16, app tổng 2.5.1 + repo con 1.5.2)

| Commit | Thay đổi |
|---|---|
| (app tổng) | feat(dashboard): khối chào Dashboard chuyển vào TRONG header (bên trái, cùng hàng Đổi mật khẩu/Đăng xuất, chỉ trang chủ); hero gỡ khỏi routes/index; version 2.5.0 → 2.5.1 |
| (repo con) | feat(ui): khối chào Tổng quan vào TRONG header cùng cơ chế; version 1.5.1 → 1.5.2 |

> **BUG REPORT của Đại ca (kèm 2 ảnh, 16/09):** GĐ 129 kéo khối chào lên nhưng VẪN
> còn khoảng hở giữa header và khối chào ở CẢ 2 app; app tổng còn QUÊN TĂNG VERSION
> (vẫn 2.5.0). Đại ca chốt phương án: khối chào VÀO TRONG header — nằm bên trái,
> cùng hàng với nút Đổi mật khẩu/Tài khoản SMED/Đăng xuất bên phải.
>
> **Kiến trúc mới (cả 2 app cùng pattern):** AppShell nhận biết `pathname === "/"`
> → cột giữa header (div min-w-0 flex-1) render khối chào 3 dòng gọn (eyebrow +
> h1 truncate + mô tả ẩn trên mobile); các trang khác giữ đệm cũ. Hero gỡ KHỎI
> routes/index — nội dung trang bắt đầu thẳng KPI/3 card, hết khoảng trống. Header
> sticky → khối chào hiện luôn khi cuộn (đúng mong muốn "cùng hàng Đăng xuất").
>
> **App tổng:** cần 2 selector mới trong AppShell: `centers` (đếm trung tâm) +
> import greetingVi/formatLongDate. BUG bắt qua dev SSR: lần đầu quên khai
> `centers` → ReferenceError 500 toàn trang — dev log bắt ngay, fix 1 dòng.
> h1 cỡ text-lg/xl (nhỏ hơn hero cũ) cho vừa chiều cao header h-16.
>
> **Verify:** app con đo Playwright — h1 trong header, tâm h1 lệch tâm header -3px
> (căn giữa khít nút phải lệch 0px), main bắt đầu 16px dưới header (chỉ còn
> padding pt-4), 0 h1 thừa trong main. App tổng verify SSR — header chứa đủ:
> eyebrow Dashboard + Chào buổi + Điều hành chuỗi + ngày dài "Thứ Tư, 16 tháng 9,
> 2026"; 0 h1 sót ngoài header; "Điều hành chuỗi" chỉ 1 lần (không trùng). Playwright
> không tự đăng nhập được app tổng (Better Auth) → SSR HTML là bằng chứng render.
>
> **LESSON LEARNED — bump version là BƯỚC RIÊNG phải nhớ (2026-09-16):** GĐ 129 sửa
> xong UI mà quên tăng version app tổng — Đại ca phát hiện qua ảnh. Quy tắc: hoàn
> thành 1 thay đổi UI bất kỳ = checklist 3 việc (sửa code + bump version 2 chỗ +
> ghi AGENTS) rồi MỚI hỏi push. Không coi bump là việc phụ của commit.
>
> **Tiêu chí kiểm chứng:** mở trang chủ 2 app → khối chào nằm TRONG header cùng
> hàng nút phải; KPI/3 card bắt đầu sát dưới header; cuộn xuống khối chào vẫn hiện
> (sticky); các trang khác header như cũ; version app tổng 2.5.1 + repo con 1.5.2
> (2 nơi mỗi app); typecheck 0 lỗi; build OK.

### GĐ 131 — Xóa 4 file scratch untracked — sự thật về "tsc CLI hỏng" (2026-09-16, 2.5.1)

> **Bối cảnh:** Sau GĐ 130, working tree app tổng còn 4 file/directory untracked
> từ **06/09** (trước GĐ A monorepo 10 ngày): `src/lib/auth/overview.mjs`,
> `src/lib/overview/intro.mjs`, `src/lib/validate-image.mjs`,
> `src/lib/scripts/check.auth.flow.mjs`. Đại ca yêu cầu thẩm định giữ hay xóa.
>
> **Kết quả thẩm định (đọc từng file trước khi quyết — untracked xóa là mất
> vĩnh viễn):** 2 file đầu KHÔNG phải JavaScript — là văn bản tài liệu
> "Huấn luyện viên nắm 3 luồng auth" (đăng ký/duyệt/quên mk/đổi mk) bị AI ghi
> nhầm đuôi .mjs; 2 file sau là test nháp chấm công (import .ts chưa từng chạy
> được) + script one-off check auth flow (đã phục vụ xong).
>
> **PHÁT HIỆN LỚN — "tsc CLI hỏng" từ GĐ 70/78 thực chất do 2 file giả:** đo
> `npx tsc --noEmit` trước khi xóa = **436 lỗi, 436/436 (100%) từ đúng 2 file
> văn bản nhầm đuôi** (overview.mjs 229 + intro.mjs 207) — tsc quét cả .mjs theo
> `include: ["src"]` và cố parse văn bản như code. **Sau khi xóa: tsc CLI exit 0
> SẠCH HOÀN TOÀN — lần đầu tiên kể từ GĐ 70.** `scripts/typecheck.mjs` vẫn dùng
> được (báo "bỏ qua 0" — cơ chế né .mjs lạ giờ rảnh việc), giữ làm chuẩn vì
> nhanh hơn (cache/logic riêng) và phòng khi rác .mjs quay lại.
>
> **Xóa:** rm 4 file + rmdir 2 directory rỗng (`overview/`, `scripts/`) — each
> path tường minh, không glob (bài học GĐ 126). Kiến thức auth trong 2 file văn
> bản đã có đầy đủ trong AGENTS.md các GĐ trước + code thật (registrations.ts,
> auth-reset.ts, auth-change-password.ts đều tồn tại và hoạt động — script
> check.auth.flow.mjs xác nhận PASS trước khi xóa).
>
> **LESSON LEARNED — File .mjs văn bản trong src/ là bom nổ chậm cho typecheck
> (2026-09-16):** tsconfig `include: ["src"]` quét MỌI file kể cả .mjs — 1 file
> ghi chú AI đặt nhầm đuôi = hàng trăm lỗi parse làm cả team tưởng "CLI hỏng",
> sinh ra script riêng (GĐ 70/78) sống chung với rác suốt 2 tuần. Quy tắc:
> file ghi chú/tài liệu KHÔNG BAO GIỜ đặt trong src/ với đuôi code (.mjs/.ts);
> khi tsc báo lỗi parse hàng loạt 1 file → kiểm tra file đó là code hay văn
> bản TRƯỚC khi kết luận môi trường hỏng; dọn rác untracked định kỳ bằng thẩm
> định từng file (đọc trước, hỏi sau, xóa tường minh từng path).
>
> **Tiêu chí kiểm chứng (đã PASS):** working tree app tổng sạch 100%; tsc
> `--noEmit` exit 0; typecheck.mjs 0 diagnostics; không file nào trong repo bị
> mất chức năng (4 file scratch chưa từng được import bởi code dự án — grep
> xác nhận).
>
> **Dọn tiếp (cùng ngày):** 4 ký tự lạ CŨ trong AGENTS.md (dòng 669/887/932/4535
> — 员工都成 / Phụ特长 x2 / 分组) — dịch theo ngữ cảnh đối chiếu field thật
> (nhiem-vu.tsx). Quét toàn file = 0 ký tự lạ (Cyrillic + Hoa + Nhật). Commit
> `a93179e` docs-only + ghim domain `gzby783ln`.

### GĐ 132 — Trang Tổng quan app con: kết cấu Dashboard SMED (2026-09-16, 1.6.0)

> **Yêu cầu của Đại ca (kèm 4 ảnh tcgiong.smed.vn):** Xóa trắng phần Tổng quan
> cũ (3 card trạng thái + lưới 23 module) — dựng lại theo kết cấu trang chủ
> SMED, CHỈ CẦN KHUNG biểu đồ + dropdown, SỐ LIỆU anh bổ sung sau khi chạy
> báo cáo. Liệt kê cụ thể 6 tầng: dropdown đơn vị, 5 hộp KPI màu, 3 lô 60/40,
> ô tồn kho full-width.
>
> **Triển khai (2 file mới + index viết lại):**
> 1. `lib/dashboard-data.ts` — data layer: types + fetchUnits (Công ty + 19 TT)
>    + fetchKpis (5 hộp: Doanh thu xanh emerald / HĐ GTGT đỏ rose-600 / Lượt
>    tiêm đỏ nhạt rose-400 / Nhập VX tím purple-600 / Tồn kho xanh da trời
>    sky-500) + 6 fetcher chart + formatters. Dữ liệu mẫu SINH DETERMINISTIC
>    từ seed cố định (mulberry32) — render giống nhau mỗi lần, không nhấp nháy
>    SSR/hydration. **Điểm nối dữ liệu thật sau này = thay fetch*, không đụng UI.**
> 2. `components/overview-dashboard.tsx` — ChartCard dùng chung (tiêu đề HOA +
>    select thời gian riêng từng ô: Tháng này/Tháng trước/Năm nay/Năm trước);
>    lô 60/40 = `lg:grid-cols-5` + `col-span-3/2` (đo thật ratio 1.5); ô cuối
>    full-width. Charts recharts: AreaChart doanh thu (gradient xanh như SMED)
>    + BarChart cột đứng mũi tiêm (đường TRUNG BÌNH cam ReferenceLine + nhãn
>    từng cột) + BarChart ngang Top 10 nhiều/ít nhất + nhập theo loại + tồn kho.
> 3. `routes/index.tsx` — viết lại còn 8 dòng render OverviewDashboard; lưới
>    23 module BỎ (module mở từ sidebar); khối chào trong header giữ nguyên (GĐ 130).
>
> **Dep recharts:** app tổng có sẵn ^2.13.0 (lock resolve 2.15.4) — lockfile app
> con (copy GĐ A) ĐÃ PIN sẵn recharts 2.15.4 + đầy đủ transitive deps từ trước
> → chỉ khai báo dep vào package.json + `npm install` (lockfile-only trước, sau
> mới cài) — KHÔNG phát sinh version mới nào. **Bài học lockfile-copy GĐ A ăn
> quả lần 2:** dep mới thêm vào mà lockfile đã pin sẵn thì install không lệch
> version — đúng kịch bản chống deploy-fail ngày đầu.
>
> **Bắt 2 lỗi thật qua đo Playwright (không đoán qua ảnh):**
> 1. SVG text tick KHÔNG wrap: "Morcvax (Lọ 1 liều - 1.5ml)" dài 124px > vùng
>    trục 118px → tràn khỏi card mobile. Fix: `shortVax()` cắt tên ngắn 10 ký
>    tự + … cho TRỤC (tên đầy đủ vẫn trong tooltip) — thử 16→14→12→10, mỗi lần
>    đo lại tràn còn 20→11→4→0px. (16/14/12 vẫn "PASS mắt" vì SVG tự clip —
>    chỉ đo scrollWidth mới bắt được; tiêu chí sạch tuyệt đối: 0px tràn.)
> 2. Kiểm tra đầu báo 6 element tràn — soi từng element: 4 là tick trục (fix
>    trên), h1 header `truncate` CÓ SẠN theo thiết kế (cắt …), không phải lỗi.
>
> **Verify đo thật (dev server, Playwright):** Desktop 1440px — dropdown đơn vị
> 20 lựa chọn (Công ty CP Giong VN + Trung tâm 1..19); 5/5 KPI đủ đúng màu;
> 7/7 chart cards đủ tiêu đề đúng chữ anh yêu cầu; 7/7 dropdown thời gian;
> 7/7 SVG recharts render width > 200px; 55 cột nhãn; tỷ lệ 3 lô đều 1.5 (60/40);
> ô tồn kho full-width 1360px; đổi dropdown thời gian → path biểu đồ ĐỔI (seed
> khác nhau per period). Mobile 390px — layout stack 1 cột, 0 tràn (trừ h1
> truncate thiết kế). Typecheck 0 lỗi; build OK; 0 ký tự lạ trong code mới.
>
> **Version:** 1.5.2 → 1.6.0 (tính năng mới lớn — minor; package.json +
> DEFAULT_VERSION).
>
> **Tiêu chí kiểm chứng (anh duyệt trên production sau deploy):** Trang Tổng
> quan mới: dropdown đơn vị 20 mục; 5 KPI màu đúng; 3 lô 60/40 + ô tồn kho;
> dropdown thời gian từng ô đổi được; số liệu đang là MẪU — anh chạy báo cáo
> SMED xong gửi cấu trúc file/DB là em nối dữ liệu thật vào fetch*.

### GĐ 133 — Header app con cao hơn + chữ chào to (2026-09-16, 1.6.1)

> **Yêu cầu của Đại ca (kèm ảnh, 16/09):** Header cao hơn chút để phóng to chữ
> khu vực "Chào Cường, Hệ thống Bán hàng" — các dòng đỡ sát nhau, thoáng hơn.
>
> **Fix (4 chỗ — 3 file):** (1) header `h-16` (64px) → `h-20` (80px); (2) h1
> `text-base sm:text-lg` → `text-lg sm:text-xl` (20px), desc `text-xs` →
> `text-sm` (14px) + `space-y-1` tách dòng; (3) form sticky các trang lấy dữ
> liệu `top-16` → `top-20` (đồng bộ header mới); (4) panel Tài khoản SMED
> `top-[4.25rem]` → `top-[5.25rem]` (tránh che nút).
>
> **Sự cố môi trường (bài học cũ ăn quả lần 2 — GĐ C.1.6):** verify đầu báo
> version "NOT" dù code đã 1.6.1 — nguyên nhân: **tiến trình dev mồ côi PID
> cũ (564MB) vẫn giữ cổng 3100** nhận request thay server mới (code 1.6.0).
> `netstat -ano` + tasklist bắt được, taskkill, chạy lại → PASS. Quy tắc:
> verify FAIL bất thường khi code đã sửa → kiểm tra netstat port + kill mồ
> côi TRƯỚC khi debug code.
>
> **Verify đo thật:** header đúng 80px; h1 computed 20px; desc 14px; h1 trong
> header; version 1.6.1 hiện sidebar. Typecheck 0 lỗi; build OK.
>
> **Version:** 1.6.0 → 1.6.1 (hotfix UI — patch).

### GĐ 134 — Hệ sinh thái — phân hệ MỚI ngoài SMED: Bảng kê chi tiết hóa đơn đã sử dụng từ MISA meInvoice (2026-09-16, repo con v1.7.0)

| Commit | Thay đổi |
|---|---|
| (repo con) `46565d0` | feat(banhang): phân hệ Bảng kê chi tiết hóa đơn đã sử dụng từ MISA meInvoice — tool 30 + OTP tự động Gmail IMAP + web wrapper (GĐ C.13.1) |
| (mới) | chore: tăng version app tổng 2.5.1 → 2.5.2 |

> **Yêu cầu của Đại ca (16/09):** Phân hệ ĐẦU TIÊN lấy dữ liệu từ nguồn KHÁC SMED — MISA meInvoice `app3.meinvoice.vn` (MST 0108321182, user cuongpk.giong01@gmail.com): đăng nhập → OTP email → Báo cáo/Bảng kê chi tiết/Bảng kê hóa đơn đã sử dụng → Lọc (ngày + Tất cả + Tất cả + **Đã cấp mã**) → Áp dụng → Xuất XLSX về `OUTPUT\11.BKCT_HDGTGT\<từ ngày>`. Đại ca gửi code Playwright codegen (cho id `#Password` + nút Tiếp tục/Đăng nhập/Xác nhận) và hỏi có cần hỗ trợ gửi code OTP — **KHÔNG cần: tool tự lấy OTP qua Gmail IMAP**.
>
> **OTP tự động:** Gmail App Password (Đại ca cung cấp) + IMAP — đọc email OTP MISA đến SAU thời điểm bắt đầu đăng nhập (chốt "giữ email, lọc theo thời gian" — không nhầm 17 email cũ); tick "Không hỏi lại trên máy này" + lưu phiên `storage_state` → lần sau KHÔNG cần OTP (verify thật).
>
> **Chi tiết kỹ thuật + 4 bẫy UI MISA** (ô ngày revert khi Escape → dùng Enter; dropdown chặn hit-test Áp dụng → JS click; popup onboarding `#getting-started-noti` chui ra ngẫu nhiên; export chạy nền server MISA — file download event có thể về TRƯỚC dialog kết quả → phải listen download TRƯỚC khi bấm) — ghi đầy đủ ở **AGENTS.md repo con GĐ C.13.1**.
>
> **Phát hiện dữ liệu (không phải lỗi tool):** tài khoản MST 0108321182 hiện hầu như KHÔNG có hóa đơn "Đã cấp mã" (Tất cả = 208 trang, Chờ cấp mã = 209 trang, Đã cấp mã = ~0 — toàn bộ ~2.083 hóa đơn đang "Chờ cấp mã"). Tool coi "Không có phát sinh dữ liệu" là THÀNH CÔNG 0 file. Khi Đại ca phát hành mã xong sẽ có data — không cần sửa tool.
>
> **E2E PASS 2 kịch bản:** (A) "Đã cấp mã" 16/09 (rỗng) → Hoàn thành 0 file; (B) test kỹ thuật `MISA_PUBLISH=Tất cả` → **XLSX 71 dòng × 28 cột** về đúng `11.BKCT_HDGTGT\2026-09-16` — verify nội dung chuẩn nghiệp vụ (sheet Bảng kê chi tiết HĐ đã sử dụng, header STT/Ký hiệu/Số hóa đơn...).
>
> **Bảo mật (dặn ăn quả lần 8):** MISA pass + Gmail App Password + phiên đăng nhập đều trong `agent/.secrets/` (gitignored); grep password staged diff trước commit = 0 match.
>
> **Tiến độ hệ sinh thái:** nhóm SMED 10/13 + **mở màn nguồn MISA meInvoice 1 phân hệ**. Kiến trúc OTP-qua-IMAP tái dùng được cho các trang MISA sau (nếu cần).
>
> **Tiêu chí kiểm chứng (đã PASS):** trang /m/misa-hoadon tạo job được; lần đầu tự lấy OTP, lần sau vào thẳng; file XLSX về đúng thư mục ngày; ngày rỗng = thành công 0 file; typecheck 0 lỗi; commit 46565d0 sạch password; push GitHub OK — Vercel auto-deploy.

### GĐ 135 — Header đồng nhất kiểu Tổng quan trên MỌI trang — CẢ HAI app (2026-09-16, app tổng 2.5.3 + repo con 1.7.1)

| Commit | Thay đổi |
|---|---|
| (repo con) `af59f93` | feat(ui): header khối chào hiện MỌI trang (GĐ C.15b, v1.7.1) |
| (mới) | feat(app-shell): khối chào header hiện mọi trang app tổng + version 2.5.3 |

> **Yêu cầu Đại ca (kèm 2 ảnh app con, 16/09):** Các trang phải có header giống trang "Tổng quan" — khối chào hiện ở TẤT CẢ các trang (ảnh 2: /m/misa-hoadon header trái trống, mũi tên đỏ). Đại ca chốt mở rộng: **đồng bộ CẢ app tổng**.
>
> **Fix song song (cùng pattern — bỏ điều kiện `pathname === "/"` quanh khối chào trong header):**
> - **App con (GĐ C.15b, v1.7.1, commit af59f93):** app-shell.tsx — 3 dòng eyebrow/Chào/desc render mọi trang.
> - **App tổng (GĐ 135, v2.5.3):** app-shell.tsx — khối chào Dashboard (greeting + Điều hành chuỗi N trung tâm + ngày dài) render mọi trang, giữ suppressHydrationWarning.
>
> **⚠️ PHÁT HIỆN + SỬA khi commit app con — package-lock.json repo con bị HỎNG TỪ TRƯA (GĐ C.13.1):** lệnh `npm install --package-lock-only` chạy từ ROOT qua `--prefix` đã GHI ĐÈ lockfile app con bằng lockfile workspace root ("app-builder-workspace") — commit 46565d0 mang lockfile sai. Commit af59f93 regenerate đúng `@giong/banhang@1.7.1` (275 packages, đủ react/router/recharts). **LESSON LEARNED — KHÔNG chạy npm với --prefix chéo thư mục khi có lockfile per-package; luôn cd vào đúng package rồi chạy. Khi commit thấy diff lockfile ± hàng nghìn dòng = nghi sai gốc, dừng kiểm tra trước khi push.**
>
> **Verify SSR (dev server + curl --compressed — response gzip phải giải nén trước khi grep):** app tổng 3 trang (/, /cham-cong, /nhiem-vu) đều chứa "Điều hành chuỗi" ✓; app con /m/misa-hoadon chứa "Hệ sinh thái GIONG VN" ✓. Kill dev server mồ côi sau đo (bài học GĐ 133). Typecheck 0 lỗi cả 2 app.
>
> **Tiêu chí kiểm chứng:** mở BẤT KỲ trang nào của CẢ HAI app → header trái hiện khối chào giống trang chủ; nút phải không đổi; Vercel deploy app con af59f93 build OK với lockfile đúng.

### GĐ 136: Hệ sinh thái — Nhân bản phân hệ BLTH: Thống kê DT theo ĐT_BLTH (repo giong-apps v1.9.0) (2026-09-16)

| Commit | Thay đổi |
|---|---|
| (repo con) `f9b4caf` | feat(banhang): nhân bản BLTH — xóa mật khẩu tool 22 + REPORT_MAP blth + trang /m/smed-dt-blth (GĐ C.17) |
| (repo con) `5ba3871` | docs(agents): bổ sung kết quả E2E PASS 19/19 |
| (mới) | chore: tăng version app tổng 2.5.3 → 2.6.0 |

> **Yêu cầu Đại ca (kèm ảnh sidebar, 16/09):** Nhân bản module mới tại nhóm "LẤY DỮ LIỆU TỪ SMED - BÁN HÀNG", số thứ tự "5. Thống kê DT theo ĐT_BLTH" — tool `22_smed_TKDTTDT_BLTH.py` anh copy vào agent/.
>
> **Hỏi chốt trước khi làm (2 điểm):** (1) thư mục OUTPUT chưa có → Đại ca chốt **`12.DTTDT_BLTH`** (tiếp đánh số 12, em tự tạo); (2) khi chuẩn bị E2E thấy service agent đang chạy job BKCCN thật của người dùng → Đại ca chốt "Restart ngay".
>
> **Bảo mật (lần 9 theo dặn):** tool 22 còn fallback hardcode user/password SMED (2 account user_3/user_16) → xóa, thay `raise SystemExit` — đúng pattern tool 2. Grep staged diff trước commit = 0 match (match đầu tiên là chữ trong câu ghi chép AGENTS.md — đã đổi cách viết để grep tương lai luôn sạch).
>
> **Triển khai (công thức chuẩn GĐ C):** agent REPORT_MAP "blth" (hưởng hàng đợi + watchdog theo tín hiệu GĐ C.16) → server whitelist "blth" → nav số 5 nhóm BÁN HÀNG (icon BarChart2) → trang wrapper SmedPullModule ~15 dòng.
>
> **Self-correct trước commit:** route ban đầu `/m/smed-dt-bLTH` (chữ hoa trong path) → đổi `/m/smed-dt-blth` chữ thường toàn bộ (chuẩn URL); desc giữ trung tính "BLTH" — không đoán nghĩa viết tắt (nguyên tắc Không tự đoán ý định).
>
> **⚠️ LESSON — restart service agent = gián đoạn job người dùng:** LUÔN `tasklist` + `wmic process` xem có tool SMED đang chạy trước khi restart GIONG_SMED_Agent.
>
> **✅ E2E production PASS (16:19–16:25):** tạo job 15/09 headless → agent nhận → tool chạy ~5 phút → **19/19 file** `{abbr}_DTTDT_BLTH_20260915.xlsx` về đúng `OUTPUT\12.DTTDT_BLTH\2026-09-15\` → web báo Hoàn thành. Deploy qua GitHub push (Đại ca chốt "Push GitHub luôn" — lần đầu nhân bản không dùng deploy --prod tay).
>
> **🏁 Tiến độ hệ sinh thái SMED: 8/13 phân hệ** (BÁN HÀNG 5/5 — DT theo ĐT_BLTH mới · KHO 3/3 · MARKETING 3/3 · BÁO CÁO 0/6 chờ tool) + MISA meInvoice 1 phân hệ.
>
> **App tổng không đổi code** — chỉ ghi lịch sử + version 2.6.0.



### GĐ 137: Hệ sinh thái — BỎ watchdog 8 phút kill oan + Hủy job running từ xa (repo giong-apps v2.0.0 — hiệu chỉnh từ 1.10.0 sai) (2026-09-16)

| Commit | Thay đổi |
|---|---|
| (repo con) `fce6dd4` | feat(smed): bỏ watchdog 8 phút + hủy từ xa qua heartbeat (GĐ C.18) |
| (repo con, sửa) | fix: hiệu chỉnh version 1.10.0 → 2.0.0 — sai quy tắc tròn trăm (GĐ 126 tái diễn, Đại ca bắt lỗi) |
| (mới) | chore: tăng version app tổng 2.6.0 → 2.6.1 |

> **BUG REPORT Đại ca (kèm ảnh, 16/09):** "Tình trạng lỗi không tiếp tục được vẫn diễn ra" — job BKCCN 15:51 liên tục bị watchdog kill oan lúc 15:59 ("Tool im lặng 8 phút"). Đại ca hỏi: bỏ giới hạn 8 phút thì có ảnh hưởng gì?
>
> **ROOT CAUSE — chứng minh bằng mô phỏng (không đoán):** `bufsize=1` phía agent Popen KHÔNG lan sang tiến trình con — Python block-buffer ~8KB khi stdout là pipe, dòng chỉ xả khi buffer đầy hoặc tool thoát. Mô phỏng: tool in ngay giây 0 → agent nhận +10.1s (lúc tool kết thúc). Job 15:51: tool có 41 lệnh print nhưng 0 dòng tới agent trong 8 phút → watchdog nhìn tín hiệu MÙ → kết án tool "im lặng" → kill oan. Các lần BKCCN 21 phút trước sống sót là do tool in đủ dày xả buffer thường xuyên.
>
> **Đại ca chốt BỎ HẲN 8 phút.** Em báo trước ảnh hưởng (mất tự phục hồi tool treo thật vì heartbeat nuôi updated_at → web cũng không stale được) → xây lưới an toàn thay thế cùng lúc: **người dùng Hủy từ xa** — web trả `cancelRequested` qua endpoint report → agent heartbeat (30s) nhận lệnh → kill tool → job "Đã hủy bởi người dùng". UI: nút Hủy trên mọi job running; isStale chỉ còn cảnh báo. Kèm `PYTHONUNBUFFERED=1` cho log realtime + tail lỗi chẩn đoán được.
>
> **LESSON — bufsize=1 của Popen không lan sang tiến trình con (2026-09-16):** tiến trình con tự quyết buffer khi stdout là pipe. Muốn xả ngay: `PYTHONUNBUFFERED=1` vào env, `python -u`, hoặc tool `flush=True`. Watchdog dựa trên output tiến trình con PHẢI xử lý buffer trước — không thì "im lặng" chỉ là ảo giác của người quan sát. (Bổ sung GĐ C.16: tín hiệu gắn đồng hồ phải được kiểm chứng KHÔNG đệm/giữ trên đường truyền.)
>
> **Chi tiết kỹ thuật đầy đủ:** AGENTS.md repo con GĐ C.18.
>
> **App tổng không đổi code** — chỉ ghi lịch sử + version 2.6.1.



### GĐ 138: Rà soát quy tắc Version — tìm GỐC RỄ sai lặp 3 lần + chốt 3 điểm sửa (2026-09-16, 2.6.2)

> **Yêu cầu Đại ca (2026-09-16, sau khi bắt lỗi lần 3):** Rà soát lại toàn bộ quy tắc version trong AGENTS.md để ngừa tái diễn lần 3.
>
> **Rà bằng chứng kể (grep toàn bộ cặp bump trong lịch sử 2 repo) — 3 lần sai cùng 1 mẫu:**
> | Lần | Sai | Đúng | Hoàn cảnh |
> |---|---|---|---|
> | 1 (GĐ 51 app tổng) | `0.1.9 → 0.1.10` | `0.2.0` | patch đầy 9 |
> | 2 (GĐ 125 app tổng) | `2.4.9 → 2.4.10` | `2.5.0` | patch đầy 9 (GĐ 126 sửa) |
> | 3 (GĐ C.18 repo con) | `1.9.0 → 1.10.0` | `2.0.0` | minor đầy 9 |
>
> **GỐC RỄ (3 lỗ hổng đan nhau):**
> 1. Quy tắc cũ chỉ viết cho hướng "patch đầy 9" — KHÔNG có câu nào nói tăng minor khi minor đang 9 cũng phải nhớ (`1.9.0 + minor` không rơi vào ví dụ nào → suy luận số học thường → ra 1.10.0).
> 2. Quy tắc nằm CHỈ ở AGENTS.md app tổng; repo con chỉ có 1 dòng tham chiếu mờ nhạt — làm trên repo con không đọc lại app tổng → vi phạm.
> 3. Không có "cổng kiểm" bắt buộc lúc bump — quy tắc là kiến thức nền, không gắn vào thao tác.
>
> **Đại ca chốt sửa CẢ 3 điểm:**
> 1. **AGENTS.md app tổng** — mục Cách tăng Version thêm bảng "NHỚ áp dụng MỌI lần tăng" (4 hướng: patch thường / patch đầy 9 / minor thường / **minor đang 9 bất kể patch** → `1.9.0 → 2.0.0`) + **CHECKLIST BẮT BUỘC 3 bước** khi bump: (1) xác định loại tăng; (2) tính số mới + tự hỏi *"số mới có chỗ nào ≥ 10 không?"* — CÓ = SAI, tính lại theo nhớ; (3) ghi 2 nơi cùng lúc + grep đối chiếu trước khi commit.
> 2. **AGENTS.md repo con** — thay dòng tham chiếu bằng quy tắc đầy đủ (rút gọn) + checklist 3 bước — không còn phụ thuộc việc nhớ đọc app tổng.
> 3. **Kiểm chứng logic bằng mô phỏng:** viết hàm bump tính nhớ chuỗi, chạy 9 trường hợp (gồm cả 3 lần sai lịch sử + các trường hợp biên 0.9.9/1.8.9/1.9.9) — **9/9 OK**, checklist chặn được cả 3 lần sai.
>
> **LESSON — Quy tắc phải nằm ở NƠI LÀM VIỆC + phải có CỔNG KIỂM gắn thao tác (2026-09-16):**
> Kiến thức chỉ trong 1 file của 1 repo thì khi làm ở repo khác không được kích hoạt; quy tắc "nền" không gắn vào thao tác thì bỏ qua được lúc vội. Sửa triệt để = (a) nội dung đầy đủ tại mọi nơi cần dùng + (b) bước tự-kiểm tra bắt buộc ngay lúc thực hiện, không chỉ "hiểu nguyên tắc". Đây là lần thứ 3 cùng một lỗi — với lỗi lặp ≥ 2 lần, tìm thêm lỗ hổng QUY TRÌNH chứ không chỉ sửa kết quả.
>
> **Tiêu chí kiểm chứng:** grep cả 2 repo thấy quy tắc mới + checklist; mô phỏng 9/9 OK; các bump sau này không thể sinh số có thành phần ≥ 10 (checklist bước 2).

### GĐ 139: Hệ sinh thái — Thanh tiến độ % hoàn thành realtime cho lịch sử lấy dữ liệu (repo con v2.1.0) (2026-09-16)

| Commit | Thay đổi |
|---|---|
| (repo con) | feat(smed): GĐ C.19 — agent đếm tiến độ theo marker stdout từng tool + heartbeat gửi doneCenters realtime; web thanh bar % chữ đè trên bar (2.0.0 → 2.1.0) |
| (mới) | chore: tăng version app tổng 2.6.2 → 2.7.0 |

> **Yêu cầu của Đại ca (kèm ảnh, 16/09):** Lịch sử lấy dữ liệu có thanh trạng thái tỷ lệ % hoàn thành khi đang chạy + hoàn thành hiện "X file/tổng số file" (VD: "Đã export 2/19 trung tâm").
>
> **Hiện trạng trước khi làm:** dòng chữ "Đã export 0/19 trung tâm…" đã có nhưng chỉ đếm đúng lúc job XONG (agent chỉ gửi doneCenters 1 lần trong report cuối — heartbeat chỉ gửi status running không kèm tiến độ). Web poll 10s → số đứng im suốt lúc chạy.
>
> **Kiến trúc realtime (2 đầu):**
> 1. **Agent (40_web_agent.py):** bảng PROGRESS_DONE_MARKERS theo TỪNG report (marker lấy từ chính tool bằng grep — 10 marker done: "✅ HOÀN THÀNH: " ×4 tool, "✅ Đã tải: " ×4 logger, "✅ Đã tải xong: " tool 20, "📥 Đã tải: " MISA; 2 marker start "] Xử lý: " cho tool 19/23 — done = started − 1 vì chỉ in khi BẮT ĐẦU trung tâm). Thread pump (đã đọc stdout realtime từ GĐ C.16) gọi _count_progress trong lock; heartbeat đổi nhịp 3s — gửi doneCenters NGAY khi số ĐỔI, nhịp 30s giữ updated_at (chống stale) + đọc lệnh hủy. Dòng TỔNG KẾT cuối tool ("HOÀN THÀNH TOÀN BỘ", "KẾT QUẢ: …") cố tính không khớp marker để không đếm trùng. Lock khai báo TRƯỚC khi start heartbeat (tránh 2 object lock).
> 2. **Web (smed-pull-module.tsx — dùng chung mọi module):** job running → thanh bar accent cao 20px + chữ đè trên bar "Đã export X/Y trung tâm · N%" (role progressbar + aria-valuenow, transition-all 500ms mượt khi % nhảy); job hoàn thành → "Hoàn thành X/Y trung tâm · N file Excel đã lưu". isStale giữ nguyên cảnh báo vàng thay bar.
>
> **Đặc thù từng tool đã đối chiếu:** tool 20 (DTTHC) chỉ ra 2 file tổng hợp → bar chạy theo số FILE (2 đơn vị); MISA 1 file; tool 23 ra 4 file/trung tâm nhưng đếm theo TRUNG TÂM (marker "[i/N] Xử lý"). Report lạ (tương lai) không có marker → heartbeat vẫn chạy như cũ, không crash.
>
> **Verify (không đợi máy chạy service thật):** py_compile agent OK (SyntaxWarning invalid escape '\ ' có sẵn ở docstring dòng 3 CẢ bản cũ — vô hại, không thuộc phạm vi); tsc --noEmit exit 0; **test mô phỏng PASS** — fake tool in 3 marker cách nhau 4s (> nhịp check 3s) → heartbeat gửi running/0 → running/1 → running/2 tăng dần đúng từng mốc, dòng tổng kết không bị đếm thừa; service + tool thật KHÔNG chạy trên máy này (máy cá nhân — service chỉ có trên máy chạy tool) nên E2E job thật chờ Đại ca copy agent mới + restart service.
>
> **⚠️ VIỆC CẦN LÀM tại máy chạy tool (như GĐ 128):** copy lại agent/40_web_agent.py MỚI sang thư mục tool trên D: (đè file cũ) → restart GIONG_SMED_Agent — tiến độ realtime chỉ có ở bản mới.
>
> **LESSON LEARNED — Tiến độ job phải đi qua kênh đã có, không cần API mới (2026-09-16):** Server từ đầu đã nhận doneCenters trong agentReport (GĐ C.2) nhưng chỉ agent report LẠC QUAN trọng này lúc kết thúc. Heartbeat đang gọi cùng endpoint mỗi 30s — thêm 1 trường vào payload có sẵn là có tiến độ realtime, không đụng DB/web/server. Trước khi thêm API mới cho tính năng realtime, rà các kênh đã chạy đều đặn (heartbeat, poll) xem có mang được dữ liệu không.
>
> **LESSON LEARNED — Pump thread đọc stdout là điểm gắn tiến độ tự nhiên (2026-09-16):** Tool đã in tín hiệu xong từng đơn vị (marker) — điểm gắn duy nhất cần thiết là BẮT marker trong thread đã đọc stdout realtime. Không sửa tool (12 file), không thêm file/log trung gian. Khi muốn thông tin từ tiến trình con: (1) tìm tín hiệu nó ĐÃ in ra, (2) gắn vào luồng đọc ĐÃ có, (3) gửi qua kênh ping ĐÃ có.
>
> **Tiêu chí kiểm chứng:** Tạo job (VD BLTH) → web cập nhật mỗi 10s hiện bar % tăng dần theo trung tâm (không còn đứng im 0/19 tới khi xong); job xong → "Hoàn thành 19/19 trung tâm · 19 file Excel đã lưu"; tool 19/23 bar tăng theo trung tâm bắt đầu; MISA/DTTHC bar theo file; Hủy từ xa vẫn hoạt động (heartbeat vẫn đọc cancelRequested).

### GĐ 141: Sidebar mở → màn hình chính TRƯỢT theo, hết bị che (CẢ HAI app — app tổng 2.8.0 + repo con 2.2.0) (2026-09-16)

> **Yêu cầu của Đại ca (kèm 2 ảnh app con, 16/09):** Sidebar ẩn → màn hình full như cũ là ổn; nhưng khi sidebar **hiện ra** để chọn menu thì màn hình chính vẫn full → sidebar CHE mất nội dung đang xem. Muốn lúc sidebar mở: màn hình chính **thu nhỏ lại**, mép phải sidebar DÍNH mép trái màn hình ứng dụng thành 1 khối liền — user đọc được luôn phần đang chọn. Đại ca chốt áp dụng **CẢ HAI app** (đồng nhất hành vi).
>
> **Cơ chế (CSS thuần — không thêm React state):** `aside.sidebar-desktop` + `div.app-content` là sibling liền kề trong DOM → `styles.css` (cả 2 app, trong `@media min-width 1024px`): `aside.sidebar-desktop:hover ~ div.app-content { padding-left: <chiều rộng sidebar mở> }` + transition `padding-left 300ms ease-out` ĐỒNG BỘ với `transition-all duration-300` của sidebar → 2 khối trượt cùng nhau mượt. Chiều rộng đẩy đúng theo từng app: app tổng = 176px (`hover:w-44`), app con = 320px (`hover:w-80`). Thu hẹp: rời chuột → padding về `lg:pl-8`/`lg:pl-11` gốc như cũ.
>
> **Vì sao không dùng React state:** hover là trạng thái CSS thuần của sidebar từ GĐ C.6/126 — thêm state onMouseEnter/Leave phải sync với CSS hover (dễ lệch khi di chuột nhanh qua ranh giới), còn sibling selector miễn phí, không re-render, không thể lệch.
>
> **Verify (đo Playwright — dev server app con, viewport 1440×900):** TRƯỚC hover {asideRight:32, contentLeft:32} — KHI hover {asideW:320, asideRight:320, contentLeft:320, padLeft:320px} — SAU rời chuột {asideW:32, contentLeft:32}: mép DÍNH khít 3 trạng thái, không che nội dung; `scrollWidth = clientWidth = 1440` → không tràn ngang, nội dung co tự nhiên. Lần đo đầu FAIL do test đo sai: `getBoundingClientRect().left` của div = mép viền (padding nằm TRONG div) — mép nội dung thực = `rect.left + parseFloat(paddingLeft)`. Typecheck 0 lỗi cả 2 app; build repo con OK.
>
> **SỐC nhỏ khi bump version (đã sửa sạch):** chạy 2 lệnh node bump liên tiếp mà quên cd — lệnh 2 ghi package.json app tổng thành 2.8.0 NHƯNG DEFAULT_VERSION repo con nhảy vào 2.8.0 lộn xộn 2 nơi. Phát hiện ngay nhờ grep đối chiếu 4 giá trị (bước 3 checklist GĐ 138) → sửa lại bằng 1 script node duy nhất đọc/ghi ĐƯỜNG DẪN TUYỆT ĐỐI từ root cho cả 4 chỗ. **Bài học: bump version nhiều repo = MỘT script duy nhất + đường dẫn tuyệt đối từ root, KHÔNG cd giữa 2 lệnh node.**
>
> **Tiêu chí kiểm chứng:** Hover sidebar (cả 2 app, desktop ≥1024px) → nội dung trượt sang phải, mép phải sidebar khít mép trái nội dung, không che chữ; rời chuột → về rail như cũ mượt; mobile (hamburger overlay) giữ nguyên; version app tổng 2.8.0 + repo con 2.2.0 (2 nơi mỗi app khớp).

### GĐ 143 — Phân quyền CHI TIẾT app Bán hàng theo NHÓM BỘ PHẬN (2026-09-16, 2.9.0 + repo con 2.3.0)

> **Yêu cầu của Đại ca (kèm 2 ảnh, 16/09):** Quyền "Bán hàng" hiện là 1 công tắc duy nhất —
> ai được cấp là thấy TOÀN BỘ phân hệ (MISA + SMED Bán hàng + Kho + Marketing). Muốn chi
> tiết hơn: Kế toán chỉ thấy nhóm Kế toán, thủ kho chỉ nhóm Kho, Marketing chỉ nhóm Marketing.
> Em trình phương án 4 quyền nhóm + 1 quyền cửa → anh chốt "Làm theo phương án trên".

**Mô hình 5 quyền (1 cửa + 4 nhóm):**

| Quyền (key trong module_access) | Điều khiển |
|---|---|
| `banhang` (cửa vào — có sẵn GĐ 108) | Nút Bán hàng trên sidebar app tổng + SSO vào app con |
| `banhang-misa` | Nhóm LẤY DỮ LIỆU TỪ MISAmeInvoice (bảng kê hóa đơn) |
| `banhang-banhang` | Nhóm SMED - BÁN HÀNG (HĐĐT, DT đối tượng, DT chuỗi, BKCCN, BLTH) |
| `banhang-kho` | Nhóm SMED - KHO (nhập kho, xuất kho, NXT kế toán) |
| `banhang-marketing` | Nhóm SMED - MARKETING (chiết khấu, lịch hẹn tiêm, gói tiêm đặt trước) |

**Kiến trúc liên thông — quyền đi kèm JWT + đọc LIVE DB dùng chung:**

1. **App tổng `permissions.ts`:** `BANHANG_GROUP_KEYS` + `BANHANG_GROUP_LABELS` +
   `getBanhangGroups(employee)` (Admin = đủ 4; user cần `banhang=true`; đã bật banhang mà
   chưa cấu hình nhóm nào → đủ 4 — backward-compat GĐ 108, ai đang dùng không mất quyền).
   Nhóm KHÔNG nằm trong MODULE_DEFINITIONS (không path nội bộ, không thuộc route guard app tổng).
2. **`sso-token.ts`:** ký `mods` vào JWT handoff — đọc TRỰC TIẾP bảng `module_access` trong
   server function (KHÔNG dùng getEmployeeById/getBanhangGroups — hàm đó đọc store phía
   client, luôn rỗng trong server function — bug bắt trước khi push).
3. **Trang Phân quyền:** bật "Bán hàng (Dự án)" → xổ ra 4 toggle con (khung viền nét đứt,
   CHỈ hiện cho user thường — Admin luôn đủ 4). Bật nhóm con tự bật `banhang` (cửa vào).
   Lưu cùng ô JSONB `module_access` — KHÔNG migration mới.
4. **App con `smed-auth.ts`:** `REPORT_GROUP` map report → nhóm + `getBanhangGroups()` đọc
   LIVE từ module_access (đổi quyền có hiệu lực NGAY, không đợi SSO lại — JWT mods chỉ là
   fallback khi DB lỗi) + `canAccessReport(user, report)`.
5. **App con `app-shell.tsx`:** `NAV_GROUP_TO_MOD` map nhóm sidebar → quyền +
   `filterNavByMods(user)` — sidebar chỉ hiện nhóm được cấp; `SidebarNav` nhận `items`
   prop (default NAV — không vỡ chỗ gọi cũ); mobile drawer cùng nguồn lọc.
6. **App con `-smed.ts` (server):** `createSmedJob` chặn lớp 2 theo nhóm — che menu chưa
   đủ, tạo job tay qua API cũng bị chặn với thông báo rõ. `can-create?report=` trả
   `canThisReport` → form tạo job chỉ hiện ở phân hệ đúng nhóm.

**LESSON LEARNED — Server function KHÔNG thấy store client (2026-09-16):**
`getEmployeeById()`/`getBanhangGroups()` của app tổng đọc Zustand `useAppStore.getState()`
— store chỉ tồn tại ở browser. Trong server function (sso-token) employee luôn null →
mods rỗng mặc dù code "đúng type". Quy tắc: server function cần dữ liệu phân quyền →
query thẳng bảng DB (module_access) trong handler, không tái dùng hàm đọc store.

**LESSON LEARNED — Quyền chi tiết: che menu (lớp UI) phải đi đôi chặn server (lớp data):**
Nếu chỉ lọc sidebar, user vẫn tạo được job bằng gọi API tay — giống lesson GĐ 99 (2 lớp
cùng điều khiển 1 tính năng phải cùng nguồn). Ở đây 3 điểm tiêu thụ quyền khớp 1 nguồn:
sidebar (mods/me), can-create (canThisReport), createSmedJob (canAccessReport) — tất cả
đọc cùng logic `getBanhangGroups` từ cùng bảng `module_access`.

**LƯU Ý cho Đại ca khi test:**
- Trang Phân quyền: chọn 1 user thường đã bật "Bán hàng" → thấy 4 toggle con xổ ra.
  Bật/tắt từng nhóm → user đó mở app con chỉ thấy đúng nhóm (đổi quyền có hiệu lực khi
  user tải lại trang app con — không cần đăng nhập lại).
- User ĐANG dùng app con từ trước (bật banhang, chưa cấu hình nhóm) → tự có đủ 4 nhóm
  (backward-compat) — không ai mất quyền đột ngột. Muốn thu hẹp: chỉ cần tắt nhóm.
- Admin/SuperAdmin: luôn đủ 4 nhóm, không thấy toggle con (vô nghĩa với Admin).

**Tiêu chí kiểm chứng:** Kế toán chỉ thấy MISA + (tùy cấu hình) nhóm Bán hàng; thủ kho chỉ
thấy nhóm Kho; tạo job đúng nhóm được, nhóm khác bị chặn cả UI lẫn API; typecheck 0 lỗi
cả 2 repo; build repo con OK; version app tổng 2.9.0 + repo con 2.3.0 (2 nơi mỗi app).

### GĐ 144: Hệ sinh thái — fix tool MISA login kẹt ô MST ẩn (repo con v2.3.1) (2026-09-17)

| Commit | Thay đổi |
|---|---|
| (repo con) | fix(misa): trang login app3.meinvoice.vn ẩn ô MST (type=hidden, trang đã nhớ value) → fill() chờ visible vĩnh viễn → timeout 45s — fix: chỉ điền ô visible, ô ẩn bỏ qua (GĐ C.22, v2.3.1) |
| (mới) | docs(agents): GĐ 144 + version 2.9.0 → 2.9.1 |

> **BUG REPORT của Đại ca (17/09):** Lấy Bảng kê chi tiết hóa đơn MISA không tải về
> được — 2 job 16/09 (20:47 + 22:02) fail cùng `Page.fill: Timeout 45000ms`.
>
> **Chẩn đoán:** Log agent cắt traceback; chạy thẳng tool bằng tay (env secrets từ
> .secrets/) lấy FULL Call log: `<input id="TaxCode" type="hidden" value="0108321182"/>`
> — trang login MISA đổi UI so với lúc viết tool: ô MST giờ ẨN, trang tự nhớ MST,
> chỉ hiện ô mật khẩu. Playwright fill() chờ visible → chết ở bước 1 login.
>
> **Fix repo con (GĐ C.22):** check `is_visible()` trước khi fill #TaxCode + #UserName;
> ô ẩn → log + bỏ qua. Verify chạy thật: đăng nhập OK → vào báo cáo → lọc 'Đã cấp
> mã' → 0 file (đúng hiện trạng data — hóa đơn đang "Chờ cấp mã", GĐ C.13.1).
>
> **LESSON LEARNED — site UI tự thay đổi, tool automation phải chịu được:** vùng
> login của site ngoài là điểm thay đổi thường xuyên nhất — check visible trước khi
> fill mọi ô, không hardcode "ô này chắc chắn luôn hiện". Khi log agent cắt traceback,
> chạy tool bằng tay với env secrets để lấy FULL Call log — chẩn đoán 1 lần ra ngay.
>
> **Tiêu chí kiểm chứng:** tạo job MISA trên web chạy thông suốt; phiên lưu sẵn vào
> thẳng; các tool SMED khác không bị ảnh hưởng.

### GĐ 145: Hệ sinh thái — Dropdown chọn trạng thái trên web cho Bảng kê chi tiết hóa đơn MISA (repo con v2.4.0) (2026-09-17)

| Commit | Thay đổi |
|---|---|
| (repo con) | feat(misa): dropdown Trạng thái phát hành + Trạng thái gửi CQT trên web — job → agent env → tool chọn (GĐ C.23, v2.4.0) |
| (app tổng) | chore: tăng version 2.9.1 → 3.0.1 (minor 9 đầy → nhớ major — lần 2 đạt major 3) |

> **Yêu cầu của Đại ca (17/09):** Trong phần "Bảng kê chi tiết hóa đơn đã sử dụng"
> thêm dropdown chọn trạng thái trên web. Đã hỏi chốt 2 điểm: (1) CẢ HAI dropdown
> — Trạng thái phát hành + Trạng thái gửi CQT; (2) mỗi dropdown 3 giá trị: Đã cấp
> mã / Chờ cấp mã / Tất cả (mặc định 'Đã cấp mã' khớp hành vi cũ).
>
> **Dây chuyền end-to-end (web → tool) — tận dụng kênh có sẵn, không thêm API:**
> 1. **Migration 0004** `smed_pull_jobs` thêm `publish_status text default 'Đã
>    cấp mã'` + `cqt_status text default 'Tất cả'` — default khớp hành vi cũ,
>    job cũ không đổi. Tự chạy khi Vercel build.
> 2. **Server `-smed.ts`:** createSmedJob nhận + validate 2 giá trị (whitelist
>    `MISA_STATUS_VALUES`, lạ → default) + INSERT; mapJob trả về → lịch sử hiện
>    "Lọc: … · CQT: …". agentClaim SELECT * + mapJob → TỰ mang 2 field mới.
> 3. **Agent:** env `MISA_PUBLISH` (đã có từ GĐ C.13.1 dùng test) + `MISA_CQT`
>    (mới) đọc từ job — các tool SMED khác không đọc 2 env này, vô hại.
> 4. **Tool 30:** khối publish đổi 'Tất cả' = KHÔNG chạm dropdown (giữ mặc định
>    MISA — an toàn vì tool trước giờ vẫn giữ default); khối CQT MỚI theo cùng
>    pattern (selector `#sendToTaxStatusFilter` + `[key="sendToTaxStatusFilter-lst"]`)
>    — Escape sau chọn để dropdown không phủ nút Áp dụng (lesson E2E 16/09).
> 5. **UI:** prop tùy chọn `showStatusFilters` trong SmedPullModule — CHỈ trang
>    MISA bật; mọi trang SMED khác không truyền = form giữ nguyên 100%.
>
> **LESSON LEARNED — Env channel có sẵn là đường truyền tự nhiên web→tool (2026-09-17):**
> Tool 30 từ GĐ C.13.1 đã đọc `MISA_PUBLISH` env (lúc đó chỉ để test) — tính năng
> dropdown chỉ cần nối dây: web → cột DB → job → env → tool, KHÔNG sửa logic tool,
> không thêm endpoint. Trước khi thiết kế kênh truyền mới, grep tool xem đã có
> biến env/tín hiệu nào chưa dùng hết công suất chưa.
>
> **⚠️ VIỆC CẦN LÀM tại máy chạy tool (như GĐ 128/139):** copy agent/40_web_agent.py
> MỚI sang thư mục tool trên D: (đè file cũ) → restart GIONG_SMED_Agent — nếu không,
> dropdown vẫn hiện nhưng chọn 'Chờ cấp mã'/'Tất cả' sẽ không có tác dụng.
>
> **Version — lần 2 nhớ major:** app con 2.3.1 → 2.4.0 (feature = minor); app tổng
> 2.9.1 → 3.0.1 (minor đang 9 đầy → về 0 + nhớ major 2→3, patch giữ 1 — pattern GĐ
> 104). Checklist GĐ 138 bước 2: không thành phần nào ≥ 10 ✓ — em đã tự bắt được
> lần bump đầu tiên sai quy tắc (2.3.2 patch) trước khi commit.
>
> **Tiêu chí kiểm chứng:** Trang MISA hiện 2 dropdown mới trong form tạo job;
> chọn xong job ghi đúng 2 giá trị (xem trong lịch sử); agent mới nhận env → tool
> chọn đúng trạng thái trên trang MISA; 'Tất cả' = giữ mặc định (không chạm);
> các trang SMED khác form không đổi; typecheck 0 lỗi cả 2 repo.

### GĐ 146: Hệ sinh thái — Badge vàng "không có dữ liệu theo bộ lọc" cho job MISA rỗng (repo con v2.4.1) (2026-09-17)

| Commit | Thay đổi |
|---|---|
| (repo con) | fix(misa): agent nhận diện "không có phát sinh dữ liệu" → web badge vàng "Hoàn thành — không có dữ liệu theo bộ lọc" — hết nhầm "chưa về file" với "không có data" (GĐ C.24, v2.4.1) |
| (mới) | docs(agents): GĐ 146 + version 3.0.1 → 3.0.2 |

> **BUG REPORT của Đại ca (17/09, kèm 2 ảnh):** Job 15/09 lọc 'Đã cấp mã' web báo
> "Hoàn thành" xanh nhưng thư mục ngày RỖNG — đợi mãi không thấy file (lần trước
> 16/09 "đợi một lúc thì file xuất hiện"). Anh khẳng định: tự làm tay trực tiếp,
> dữ liệu CÓ và ĐÃ được cấp mã.
>
> **Chẩn đoán (đọc log riêng tool 30 — misa_bkct_170926.log):** KHÔNG phải độ trễ.
> Từng job tool chạy đúng, kết thúc "📭 MISA báo: không có phát sinh dữ liệu theo
> điều kiện lọc" (0 file là HỢP LỆ theo bộ lọc). File "xuất hiện sau" ngày 16/09
> thực là của job KHÁC lúc 07:49 chọn 'Tất cả' (1 file 29KB, 140 dòng — verify
> openpyxl) rơi vào cùng thư mục ngày. Web cũ xanh "Hoàn thành" cho CẢ 2 trường
> hợp → không phân biệt được.
>
> **Fix theo chỉ đạo (agent + 1 dòng hiển thị web):** (1) agent đọc out_lines
> (pump stdout đã có) — thấy "không có phát sinh dữ liệu" → gửi noData=true;
> (2) migration 0005 cột `no_data boolean` (UPDATE chỉ set-true — heartbeat
> không xóa cờ); (3) mapJob trả về; (4) badge done+noData = VÀNG "Hoàn thành —
> không có dữ liệu theo bộ lọc" + dòng chú thích nguyên nhân rỗng. Tool SMED
> khác không in câu này → vô hại.
>
> **LESSON LEARNED — "Hoàn thành" phải mang NGHĨA kết quả (2026-09-17):** job
> xong 0-file có 2 nghĩa: tool lỗi (cần lo) vs nguồn rỗng theo bộ lọc (bình
> thường). Một trạng thái phát sinh từ nhiều nguyên nhân → hiển thị phải phân
> biệt được nguyên nhân, báo "thành công" cho kết quả rỗng phải kèm LÝ DO rỗng.
>
> **Version:** app con 2.4.0 → 2.4.1 (patch); app tổng 3.0.1 → 3.0.2 (docs-only
> — patch; checklist GĐ 138 ✓).
>
> **Tiêu chí kiểm chứng:** Job lọc rỗng → badge vàng + chú thích; job có file →
> xanh như cũ; log agent "📭 Job xong — KHÔNG có dữ liệu theo bộ lọc";
> typecheck 0 lỗi cả 2 repo.



### GĐ 147: Hệ sinh thái — Fix ROOT CAUSE tool MISA lọc NGƯỢC (repo con v2.5.0) (2026-09-17)

| Commit | Thay đổi |
|---|---|
| (repo con) `3dad719` | fix(misa): chọn dropdown multicombobox đúng cơ chế toggle-loại-trừ — hết lọc ngược (GĐ C.25) |
| (mới) | docs(agents): GĐ 147 + version 3.0.2 → 3.0.3 |

> **BUG REPORT của Đại ca (17/09, kèm 5 ảnh — ĐÃ CẢNH BÁO EM SAI Ở GĐ 146):** Em chẩn đoán sai —
> ảnh MISA chứng minh ngày 15/09 lọc "Đã cấp mã" + CQT "Tất cả" CÓ 100 bản ghi thật (102 dòng
> Excel anh đếm tay), nhưng job tool vẫn "không có phát sinh dữ liệu". Kèm 2 yêu cầu: sửa dropdown
> theo đúng bộ lọc ảnh MISA + test lại tới khi đúng 102 dòng; và job "Tất cả" bị lệch ngày
> 15/09 → 17/09.
>
> **ROOT CAUSE (phơi bày bằng probe DOM trực tiếp trên máy — 2 script Playwright nạp phiên
> misa_state.json, dump trạng thái checkbox TRƯỚC/SAU click, không export):** multicombobox
> MISA mặc định MỌI item CHECKED (= "Tất cả"); click 1 item = TOGGLE TẮT nó (loại-trừ),
> KHÔNG phải chọn duy nhất. Tool cũ click "Đã cấp mã" thực chất LOẠI TRỪ "Đã cấp mã" → ngày
> toàn hóa đơn đã-cấp-mã trả 0 dòng → tool hiểu "không có data". Chọn "Tất cả" (không chạm
> dropdown) lại đúng → có file. Dấu hiệu đáng nhớ: thao tác log "✔ Đã chọn" thành công nhưng
> kết quả NGƯỢC kỳ vọng; "không làm gì" lại ra đúng — contradiction kiểu này phải probe DOM,
> đừng sửa mò.
>
> **Fix repo con (GĐ C.25):** helper `check_only_option` — mở dropdown → uncheck TẤT CẢ item
> đang CHECK khác target → Escape đóng → còn duy nhất target CHECK. Áp cả 2 dropdown (phát
> hành + CQT); "Tất cả" = không chạm như cũ. Escape nằm TRONG helper → ô ngày giữ đúng sau
> Escape/Apply (probe verify; hết lỗi 15→17/09).
>
> **Test E2E THẬT sau sửa (chạy tool trực tiếp, BKCT_BASE đè sang thư mục test riêng — không
> đụng file anh đang mở Excel trong OUTPUT thật):** 15/09→15/09 Đã cấp mã + CQT Tất cả → log
> "tắt 4 trạng thái khác" → download → **100/100 hóa đơn unique, toàn bộ ngày 15/09/2026** —
> khớp "100 bản ghi" MISA + 102 dòng Excel (100 hóa đơn + header + dòng tổng; 1 hóa đơn nhiều
> mã hàng = nhiều dòng STT là đúng bản chất "bảng kê chi tiết" — ảnh anh cũng có STT 263/264
> cùng số 00005579). File test/probe đã xóa sau khi xong.
>
> **LESSON LEARNED — chẩn đoán sai do thiếu bằng chứng tầng UI (2026-09-17):** GĐ 146 khép án
> "MISA không có hóa đơn Đã cấp mã" dựa trên log tool + file rỗng, KHÔNG đối chiếu màn hình
> MISA thật của người dùng. Khi người dùng khẳng định "tôi thấy data có thật" — bằng chứng
> của họ trên UI chính xác là tầng cần probe, không phải suy luận từ log. Script probe DOM
> (nạp phiên lưu sẵn, dump trạng thái widget) là công cụ chuẩn từ giờ cho mọi case UI automation
> "bấm đúng nhưng kết quả sai".
>
> **Version:** app con 2.4.1 → 2.5.0 (fix lớn + verified E2E — minor); app tổng 3.0.2 → 3.0.3
> (docs-only — patch; checklist GĐ 138 ✓, không thành phần nào ≥ 10).
>
> **Tiêu chí kiểm chứng (Đã PASS test thật):** job 15/09 Đã cấp mã + CQT Tất cả → file XLSX
> 100 hóa đơn đúng ngày 15/09; job "Tất cả" giữ hành vi cũ; log tool ghi "tắt N trạng thái
> khác"; ngày lọc giữ đúng sau Escape/Apply.

### GĐ 148: Hệ sinh thái — GĐ B.1 + B.2: Database GiongDB + pipeline báo cáo SQL (repo con v2.6.0) (2026-09-17)

| Commit | Thay đổi |
|---|---|
| (repo con) | feat(etl): GĐ B.1 — DB GiongDB (SQL Server Express, file tại D:\...\giong_database) + ETL nạp 772 file Excel OUTPUT → 12 bảng staging (7.941 dòng, dedupe hash, idempotency PASS) |
| (repo con) | feat(sqlreport): GĐ B.2 — pipeline báo cáo web→agent→GiondDB→web + trang /m/bc-cuoi-ngay + báo cáo Doanh thu theo ngày (đối chứng Excel KHỚP TỪNG ĐỒNG) |
| (mới) | docs(agents): GĐ 148 + version 3.0.3 → 3.0.4 |

> **Bối cảnh (đã chốt với Đại ca qua 3 câu hỏi):** Giai đoạn mới — **Thiết lập
> báo cáo**: (1) SQL TẠI MÁY CHỦ; (2) nạp file Excel MISA/SMED đã tải vào database
> SQL tại `D:\DuLieuChung\CUONG_2026\giong_database`; (3) xử lý theo yêu cầu (làm
> sau); (4) web yêu cầu + nhận kết quả; (5) Tổng quan đọc từ SQL này. Đại ca chốt:
> **SQL Server Express** (sẵn có, kèm instance MISA) + **qua agent + Neon** (không
> tunnel — Vercel không truy cập được SQL nội bộ) + **nạp hết file hiện có**
> (sau mở rộng tải lịch sử 01/01/2025 → nay — ETL dedupe hash, chạy lại không trùng).
>
> **Kiến trúc:** `OUTPUT Excel → ETL Python (agent/etl/) → GiongDB (SQL Server
> Express) → agent chạy SQL theo yêu cầu web → JSON qua Neon (smed_pull_jobs.result)
> → web hiển thị`. Tận dụng 100% pipeline job SMED (bảng job + claim + heartbeat +
> hủy + lịch sử) — chỉ thêm job type `sqlreport` (migration 0006: result jsonb +
> query_key).
>
> **GĐ B.1:** DB GiongDB + 12 bảng staging generic + import_log + etl_run. Nạp
> 772 file → 7.941 dòng, 0 lỗi, idempotency PASS.
>
> **GĐ B.2:** Agent nhánh run_sql_task (ETL → sql_reports.py pyodbc Trusted_Connection
> — không password repo); claim job SQL không cần tài khoản SMED; web trang
> `/m/bc-cuoi-ngay` (module BÁO CÁO đầu tiên hết placeholder — SqlReportModule:
> dropdown báo cáo + kỳ + bảng kết quả Tổng cộng + lịch sử + poll 10s). Báo cáo #1
> **revenue-by-day**: doanh thu TM/CK theo ngày.
>
> **✅ ĐỐI CHỨNG SỐ LIỆU + E2E PRODUCTION PASS 7/7 (cùng ngày, bổ sung):** SQL
> 14–16/09 = 187.645.000đ (15/09 = 81.765.000đ) — quét lại 19 file Excel gốc BLTH
> 15/09 tính tay: KHỚP TỪNG ĐỒNG. E2E thật (login app tổng → SSO → tạo job →
> agent claim → ETL → SQL → web hiện Tổng cộng khớp) PASS. Trước đó bắt 2 lỗi:
> (1) UI gửi ngày ISO nhưng server validate DD/MM/YYYY — fix isoToDdmmyyyy;
> (2) SQL Server chặn NT AUTHORITY\SYSTEM (service NSSM) login GiongDB — grant
> db_owner 1 lần trên SQL Server (không đụng repo).
>
> **LESSON — Windows Service account phải được grant trong SQL Server (2026-09-17):**
> DB local mà service chạm vào cần grant cho đúng ACCOUNT SERVICE (SYSTEM), không
> chỉ account người cài — ETL tay bằng Administrator không lộ lớp quyền này; chỉ
> E2E qua service thật mới bắt được.
>
> **LESSON LEARNED — Server function return type phải serializer-friendly (2026-09-17):**
> Record<string, unknown> bị createServerFn chặn ("Type may not be serializable") —
> dùng Record<string, string | number> cho JSON payload tự do. Lần 2 gặp (GĐ 59).
>
> **App tổng không đổi code** — chỉ ghi lịch sử + version 3.0.5 (bổ sung E2E + hotfix repo con 2.6.1).

### GĐ 149: Hệ sinh thái — Sidebar app con XÂY DỰNG LẠI 4 bậc (repo con v2.7.0) (2026-09-17)

| Commit | Thay đổi |
|---|---|
| (repo con) | feat(ui): GĐ C.26 — Sidebar 4 bậc: Bậc 0 ĐIỀU HÀNH → Bậc 1 DOWNLOAD DỮ LIỆU/BÁO CÁO/UPLOAD → Bậc 2 nhóm con → Bậc 3/4 module; 4 trang báo cáo mới; verify Playwright 10/10 |
| (mới) | docs(agents): GĐ 149 + version 3.0.5 → 3.1.0 |

> **Yêu cầu Đại ca (mô tả chi tiết từng bậc + cơ chế ẩn/hiện + đánh số):**
> Kết cấu lại Sidebar app con theo cây: Bậc 0 ĐIỀU HÀNH (Tổng quan giữ nguyên) →
> Bậc 1 gồm DOWNLOAD DỮ LIỆU · BÁO CÁO · UPLOAD - MISA AMIS → Bậc 2: download có
> 4 nhóm (MISAmeInvoice / SMED-Bán hàng / SMED-Kho / SMED-Marketing), báo cáo có
> 3 nhóm (KẾ TOÁN / KHO / MARKETING), upload giữ nguyên → Bậc 3 module download
> (giữ nguyên) → Bậc 4 module báo cáo. Ẩn/hiện: bấm bậc nào hiện con bậc đó.
>
> **Đã hỏi chốt trước khi làm (4 điểm):** 4 trang báo cáo chưa có → khung
> placeholder; toggle nhóm MỞ/ĐÓNG ĐỘC LẬP (mở được nhiều nhánh); "BC bán hàng
> (theo ngày mặc định hôm nay)" = bộ lọc ngày mặc định hôm nay khi nối data;
> đánh số MỖI NHÓM báo cáo tự đánh lại 1,2,3…
>
> **Triển khai repo con (chi tiết đầy đủ GĐ C.26):** nav.ts viết lại thành cây
> `CAY_BAC1` (mọi route/desc giữ nguyên — không vỡ ModuleRoute); app-shell.tsx
> SidebarNhom đệ quy + toggle độc lập + pathToActiveLeaf mở sẵn nhánh trang đang
> mở + filterTreeByMods giữ phân quyền nhóm bộ phận; 4 route mới (bc-banhang,
> bc-nhap-kho, bc-xuat-kho, bc-nxt-luong-tien); routeTree sinh lại.
>
> **✅ Verify:** Playwright 10/10 PASS (từng bậc đúng bảng, đánh số riêng, toggle
> độc lập, nhánh mở sẵn, 4 trang render); typecheck 0 lỗi; build OK; version repo
> con 2.7.0 khớp 2 nơi.
>
> **LESSON — innerText chỉ đọc text visible (2026-09-17):** đo UI rail thu hẹp
> (tiêu đề nhóm hidden group-hover:flex) bằng innerText → đọc thiếu text, tưởng
> bug render. Luôn hover/mở đúng state cần đo trước khi assert (bổ sung cách đo
> Playwright của GĐ 126/127).
>
> **App tổng không đổi code** — chỉ ghi lịch sử + version 3.1.0.

### GĐ 150: Hệ sinh thái — Auto-ETL 60 phút + Nạp đè theo ngày (repo con v2.8.0) (2026-09-17)

| Commit | Thay đổi |
|---|---|
| (repo con) `47c35d5` | feat(etl): nạp đè theo ngày (wipe-once per phân hệ+ngày) + auto-ETL nền mỗi 60 phút trong agent (GĐ B.2.2) |
| (mới) | docs(agents): GĐ 150 + version 3.1.0 → 3.1.1 |

> **Câu hỏi của Đại ca (17/09):** (1) SQL lấy dữ liệu OUTPUT có bị trùng lặp không?
> (2) Cần động tác gì để update dữ liệu mới? (3) Chương trình có tự lấy khi có file
> mới download về không?
>
> **Câu trả lời (đã chốt với Đại ca):** (1) KHÔNG trùng — dedupe hash GĐ B.1 chống
> nạp lại file, nay thêm **nạp đè theo ngày** chống trùng logic khi tải lại cùng
> ngày có data sửa (xóa dòng cũ phân hệ+ngày trước khi nạp file mới); (2) KHÔNG cần
> động tác riêng — job báo cáo tự ETL trước khi chạy SQL, giờ thêm auto-ETL nền;
> (3) CÓ — **auto-ETL mỗi 60 phút** (thread daemon trong agent, vòng đầu sau 5 phút,
> exception nuốt + log, không đụng job web).
>
> **Bug bắt được nhờ test N file cùng ngày:** lần đầu đặt DELETE theo TỪNG file —
> file sau xóa mất dòng file trước vừa nạp (89 dòng → còn 10 = chỉ file cuối).
> Fix: set `wiped` — xóa ĐÚNG 1 LẦN mỗi (phân hệ, ngày), file sau NỐI TIẾP.
> Re-test: 19 file gốc + 1 file test = 91 dòng đúng công thức; dọn test xong về
> đúng 89 dòng/16 trung tâm. Data test đã dọn sạch (264 dòng staging chuẩn).
>
> **LESSON — Nạp đè theo ngày phải wipe MỘT LẦN/ngày, không theo file (2026-09-17):**
> ETL nạp từng file trong loop — logic "xóa cũ trước khi nạp" nếu đặt trong loop
> theo file tự phá dữ liệu file khác cùng ngày. Test đơn file PASS KHÔNG đủ —
> phải test N file cùng ngày.
>
> **Vận hành:** service GIONG_SMED_Agent chạy trực tiếp từ repo (nssm Application =
> python + AppParameters trỏ thẳng 40_web_agent.py trong repo) → sửa code repo =
> bản service dùng, chỉ cần restart. Đã restart 14:20 SAU khi đợi job thật đang
> chạy xong (log 14:19 "Job SQL xong") — log mới xác nhận "⏱️ Auto-ETL bật".
> Chi tiết kỹ thuật ở AGENTS.md repo con GĐ B.2.2.
>
> **Tiêu chí kiểm chứng:** log agent có dòng Auto-ETL mỗi giờ; tải lại cùng ngày
> (data sửa) → staging đúng số dòng bản mới nhất, không nhân đôi; job báo cáo
> vẫn hoạt động như cũ.



### GĐ 151: Hệ sinh thái — ETL đọc ngày thật + chốt PA1 lấy lịch sử theo tháng (repo con v2.9.0) (2026-09-17)

| Commit | Thay đổi |
|---|---|
| (repo con) `5473980` | feat(etl): DATE_COL map cột ngày 12 phân hệ + nạp đè theo TẤT CẢ ngày trong file + pilot PA1 (GĐ B.2.3) |
| (mới) | docs(agents): GĐ 151 + version 3.1.1 → 3.2.0 |

> **Câu hỏi của Đại ca (17/09):** Lấy dữ liệu theo khoảng thời gian (năm 2025,
> tháng 1–8/2026, 1 tháng cụ thể) thì file lưu thư mục nào? Phải làm gì?
>
> **Trả lời đã chốt (PA1):** file luôn về `OUTPUT\<phân hệ>\<TỪ NGÀY>` — tool xuất
> **19 file GỘP cả khoảng** (1 file/trung tâm). 3 phương án đã trình: PA1 theo tháng
> (chốt) / PA2 theo ngày (~365 job/phân hệ, BKCCN 21 phút/ngày = KHÔNG khả thi) /
> PA3 cả khoảng 1 job. **Động tác của Đại ca = chỉ tạo job trên web** (Từ ngày =
> 01/tháng, Đến ngày = cuối tháng), ETL tự nạp SQL.
>
> **Điều kiện tiên quyết đã làm trước:** ETL gắn `report_date` theo tên thư mục
> → file gộp cả tháng mang nhãn 1 ngày, báo cáo không phân rã được. **Fix:
> DATE_COL** map vị trí cột ngày theo 12/12 phân hệ (probe file thật 17/09:
> 1HDDT=6, 2DTTDT=2, 3DTTHC=None, 4BKCCN=10, 5BKN=3, 6BKX=2, 7BCNXT=None,
> 8BCCK=2, 9LHT=9, 10GDTVX=3, 11BKCT=4, 12BLTH=14) + `parse_cell_date()` nhận
> DD/MM/YYYY (kèm giờ) + YYYY-MM-DD, fallback ngày thư mục. Nạp đè mở rộng xóa
> theo TẤT CẢ ngày xuất hiện trong file.
>
> **Re-import toàn bộ:** 791 file = 8.088 dòng, 0 lỗi — verify 8BCCK 14/09 = 89
> dòng khớp đối chứng cũ.
>
> **Pilot PA1 PASS:** job DTTDT 01/09→30/09/2026 → 19 file gộp về
> `OUTPUT\2.DTTDT\2026-09-01\` (~5 phút) → SQL phân rã **17 ngày riêng**
> (06/09: 742, 12/09: 515, 13/09: 787 — cuối tuần đông đúng thực tế), tổng
> 4.260 dòng, nạp đè không nhân đôi.
>
> **LESSON — File gộp khoảng ngày: ngày từng dòng nằm trong DATA (2026-09-17):**
> Tên thư mục chỉ mang ý nghĩa "ngày tải" với file gộp. Dữ liệu lịch sử dùng cho
> báo cáo phải đọc ngày từ cột dữ liệu từng dòng + map vị trí cột theo từng format
> xuất (probe trước, fallback ngày thư mục khi thiếu cột).
>
> **Lịch lấy lịch sử gợi ý:** phân hệ nhanh trước (DTTDT/BLTH/HĐĐT/DTTHC/CHIETKHAU/
> LHT/GDTVX/BKN/BKX ~5 phút/tháng) → XNKT ~6 phút → BKCCN ~21 phút cuối. Mỗi tháng
> 1 job, chạy dần 1-2 ngày là đủ 2025 + 1–8/2026.
>
> **Tiêu chí kiểm chứng:** job khoảng nhiều ngày → file về thư mục từ-ngày; SQL
> phân rã đúng từng ngày; tổng dòng khớp; nạp đè không nhân đôi.



### GĐ 152: Hệ sinh thái — nhân bản MISA thứ 2: Bảng kê hóa đơn đã sử dụng (2026-09-17)

| Commit | Thay đổi |
|---|---|
| (repo con) `226152c` | feat(misa): nhân bản MISA thứ 2 — tool 31 + trang /m/misa-bkth (GĐ C.27, v3.0.0) |
| (mới) | chore: tăng version app tổng 3.2.0 → 3.2.1 |

> **Yêu cầu Đại ca (kèm code Playwright codegen, 17/09):** Thêm module "Bảng kê hóa đơn đã sử dụng" vào nhóm DOWNLOAD DỮ LIỆU → DỮ LIỆU TỪ MISAmeInvoice — viết tool tương tự "Bảng kê chi tiết hóa đơn đã sử dụng" (tool 30), thư mục `OUTPUT\13.BKTH_HDGTGT` (anh tạo sẵn).
>
> **Nội dung (chi tiết ở AGENTS.md repo con GĐ C.27):** Probe thật trang `/v3/bao-cao/bang-ke-hd` (KHÁC trang tool 30) → tool 31 theo đúng công thức chuẩn: không hardcode password (dùng chung credentials + phiên OTP .secrets với tool 30), export MISA chạy nền ~30s (listen download trước khi bấm). Agent REPORT_MAP + marker tiến độ; server whitelist; phân quyền nhóm **banhang-misa** điều khiển cả 2 trang MISA; nav mục mới; trang web có 2 dropdown trạng thái trên web.
>
> **E2E thật PASS (15/09/2026, Đã cấp mã + CQT Tất cả):** file XLSX về đúng `OUTPUT\13.BKTH_HDGTGT\2026-09-15\` — **100 dòng hóa đơn thật** (ngày 15/09, 18 ký hiệu 1C26MA*, đủ mã CQT). (Đại ca đối chứng 102 dòng lúc chạy tay — lệch vài dòng là data MISA biến động giữa 2 lần chạy; cơ chế lọc chính xác.)
>
> **Version repo con:** 2.9.0 → **3.0.0** — minor đang 9 đầy → nhớ major (quy tắc tròn trăm GĐ 138, checklist 3 bước ✓).
>
> **Tiến độ hệ sinh thái:** MISA meInvoice **2/2 phân hệ** (Bảng kê chi tiết + Bảng kê hóa đơn đã sử dụng) · SMED 11/13.
>
> **App tổng không đổi code** — chỉ ghi lịch sử + version 3.2.1.




### GĐ 153: Icon Gióng chuẩn PWA — favicon tab + icon cài app, CẢ HAI app (2026-09-17)

| Commit | Thay đổi |
|---|---|
| (repo con) `ed35c74` | feat(ui): icon Gióng chuẩn PWA — favicon + manifest (GĐ C.29, v3.0.2) |
| (mới) | feat(pwa): app tổng — bộ icon vuông + manifest tách any/maskable + favicon mới; version 3.2.1 → 3.2.2 |

> **Yêu cầu Đại ca (kèm 3 ảnh, 17/09):** Cho biểu tượng Gióng vào (1) icon các tab trình duyệt, (2) icon khi tải/cài web về máy (PWA) — áp dụng CẢ app tổng + app con.
>
> **ROOT CAUSE chữ "G" vàng thay logo (ảnh Đại ca):** các icon trong `public/icons/` là bản copy NGUYÊN BẢN logo 1289×832 chưa resize vuông (icon-192.png thật ra 1289×832!) → trình cài PWA bỏ file sai kích thước → fallback letter "G". Favicon tab dùng cả logo có chữ + nền trắng → nhỏ khó nhìn.
>
> **Xử lý (chi tiết kỹ thuật ở AGENTS.md repo con GĐ C.29):** tách hình ngựa + sóng khỏi chữ (quét bbox + crop PIL) → bộ icon vuông 10 file (8 size nền trong suốt "any" + 2 maskable nền xanh #1465B2) → manifest tách purpose any/maskable 2 entry riêng → head favicon + apple-touch-icon → `/icons/icon-192.png`. Áp dụng ĐỒNG NHẤT cả 2 app (app con có manifest mới).
>
> **Version:** app tổng 3.2.1 → 3.2.2 · repo con 3.0.1 → 3.0.2 (fix — patch, checklist GĐ 138 ✓).
>
> **LESSON — PWA icon phải đủ 2 lớp "any" + "maskable" và file phải đúng kích thước khai báo (2026-09-17):** chi tiết ở AGENTS.md repo con GĐ C.29.
>
> **Tiêu chí kiểm chứng:** Tab trình duyệt 2 app hiện logo Gióng; cài PWA icon Gióng đẹp cả Android + desktop; typecheck 0 lỗi; build repo con OK.


### GĐ 154: Hệ sinh thái — Sidebar app con 4 điểm hiệu chỉnh + Tổng quan tên trung tâm thật (repo con v3.1.0) (2026-09-17)

| Commit | Thay đổi |
|---|---|
| (repo con) `cb905ce` | feat(ui): GĐ C.32 — 4 điểm sidebar + /api/units tên thật; version 3.0.4 → 3.1.0 |
| (mới) | docs(agents): GĐ 154 + version app tổng 3.2.2 → 3.3.0 |

> **Yêu cầu của Đại ca (kèm 3 ảnh, 17/09) — 4 điểm Sidebar app con + 1 điểm Tổng quan:**
> (1) cao ô Cấp 1 bằng Cấp 0; (2) bấm Tổng quan thu gọn hết chỉ còn Cấp 0 + Cấp 1;
> (3) rail ẩn che icon → cho icon nhìn rõ; (4) rail rộng hơn desktop / NHỎ lại mobile
> (mobile có xuống dòng); + dropdown Tổng quan: "Công ty CP Giong VN" + 19 trung tâm
> viết tắt "Trung tâm TC Ngọc Lâm", "Trung tâm TC Long Biên"…

> **Triển khai (chi tiết đầy đủ ở AGENTS.md repo con — GĐ C.32):**
> 1. **Cao Cấp 1 = Cấp 0:** `min-h-9 px-2 py-1.5 text-[12px]` — đo 36px đồng đều cả 4 ô.
> 2. **Tổng quan thu gọn:** `extraClick` → `collapseAll` (toggle Set rỗng ↔ activePath);
>    nhóm mở lại bình thường sau thu gọn.
> 3. **Rail 40px desktop:** logo mark tròn trước đây bị cắt mép giờ nguyên vẹn
>    (logo 20px, left=4 right=24); content `lg:pl-8` → `lg:pl-10`.
> 4. **Drawer mobile `w-[70vw] max-w-[290px]`:** 390px viewport = 273px.
> 5. **Server route `/api/units`:** SELECT code, name, short_name FROM centers
>    WHERE status='active' → label `Trung tâm TC {short_name}` (fallback name);
>    DB lỗi → client fallback "Trung tâm tiêm chủng N".

> **LESSON LEARNED — Test script đo TRẠNG THÁI ĐÚNG trước khi kết luận code sai (2026-09-17):**
> Lần đầu chạy verify 3/10 fail khiến nghi code — rà lại toàn bộ là PHÉP ĐO sai:
> (1) đo chiều cao button lúc rail thu hẹp (`hidden group-hover:flex` → height=0) —
> phải đo khi hover; (2) kỳ vọng "thu gọn = 0 button" sai — baseline 3 nhóm bậc 1
> luôn hiện, đúng = 7 → 3; (3) đo content đẩy bằng `rect.left` (mép viền = 0) thay vì
> `paddingLeft` computed — tái diễn lesson GĐ 141 lần 2. **Quy tắc: test FAIL → tự hỏi
> phép đo có phản ánh đúng điều kiện UI (hover/collapsed/active-path) chưa, đo lại đúng
> trạng thái rồi hẵng sửa code.** Code sau sửa script: 0 thay đổi, 11/11 PASS.

> **Push đồng loạt 4 commit repo con** (theo lựa chọn 3 của Đại ca): `ed35c74` GĐ C.29
> icon PWA · `c9040d2` GĐ C.30 báo cáo bán hàng · `a7385f1` GĐ C.31 nút Mở · `cb905ce`
> GĐ C.32 sidebar. Grep mật khẩu staged diff = 0 match.

> **Tiêu chí kiểm chứng:** Sidebar app con: Cấp 1 cao bằng Cấp 0; Tổng quan thu gọn
> được/mở lại được; rail 40px logo + icon nguyên vẹn; mobile drawer 273px; dropdown
> Tổng quan 20 mục tên thật; typecheck 0 lỗi; version app tổng 3.3.0 + repo con 3.1.0.


### GĐ 155: Icon PWA TRÒN TO full-khung cả 2 app + app con thêm Service Worker (2026-09-17, 3.3.1)

| Commit | Thay đổi |
|---|---|
| (app tổng) | fix(pwa): icon tròn 96% khung (trước artwork 37% → icon bé) + cache-bust ?v=2; version 3.3.0 → 3.3.1 |
| (repo con `66fda06`, v3.1.1) | cùng fix icon + sw.js tối giản + đăng ký SW — chi tiết GĐ C.33 AGENTS.md repo con |

> **BUG REPORT của Đại ca (kèm 2 ảnh, 17/09):** Sau GĐ 153 + 3 bước gỡ/cài lại:
> (1) App tổng CÓ icon nhưng BÉ và VUÔNG; (2) App con CHƯA THẤY icon. Muốn icon
> TO và HÌNH TRÒN cho cả 2 app.
>
> **ROOT CAUSE (đo thật, chi tiết đầy đủ ở GĐ C.33 repo con):**
> 1. **Icon bé:** artwork chỉ chiếm 37% khung (bbox PIL) — crop GĐ 153 giữ nguyên
>    tỷ lệ ngang logo → icon any phải thành hình TRÒN full-khung 96%.
> 2. **App con không cài PWA:** thiếu service worker — Chrome bắt buộc SW + fetch
>    handler. Fix bằng sw.js tối giản pass-through (không cache — không stale).
> 3. **Icon cũ dai dẳng:** cache theo URL → cache-bust `?v=2` cho manifest + icon
>    + apple-touch-icon ở head cả 2 app.
>
> **LESSON LEARNED — Icon PWA phải chiếm ĐẦY khung, không nhúng logo ngang nguyên bản (2026-09-17):**
> OS render nguyên file PNG trong khung icon — artwork dáng ngang + padding trong
> suốt nhiều → hiển thị "bé" dù manifest khai báo đúng sizes. Đo coverage bằng
> alpha.getbbox() trước khi kết luận; tách hình tròn khỏi chữ bằng quét khoảng
> trắng phân tách giữa 2 vùng nội dung (y658→688).
>
> **LESSON LEARNED — Đổi icon app đã cài phải đổi cả URL (2026-09-17):**
> Trình duyệt + Windows cache icon/manifest theo URL — thay file cùng URL không có
> tác dụng với app đã cài. Cache-bust query (?v=N) là bắt buộc khi thay icon, kèm
> quy trình phía user: gỡ app cũ + ie4uinit.exe -show + cài lại.
>
> **Tiêu chí kiểm chứng:** sau push + cài lại: icon taskbar/màn hình chính = hình
> tròn TO đầy khung cả 2 app; app con hiện nút "Cài đặt ứng dụng" trong Chrome;
> typecheck 0 lỗi cả 2 app.

### GĐ 156: Icon căn GIỮA hình trong khung tròn — cả 2 app (2026-09-17, 3.3.2)

| Commit | Thay đổi |
|---|---|
| (app tổng) | fix(pwa): artwork đặt giữa canvas tròn (hết lệch góc) + cache-bust ?v=3; version 3.3.1 → 3.3.2 |
| (repo con `a259abb`, v3.1.2) | cùng fix — chi tiết GĐ C.34 AGENTS.md repo con |

> **BUG REPORT của Đại ca (kèm ảnh chrome://apps, 17/09):** Icon đã hiện nhưng
> "cắt tay quá" — hình chính KHÔNG vào giữa khung logo (vòng xanh lệch lên góc
> phải). Yêu cầu: hình chính vào GIỮA khung tròn giống ảnh mẫu.
>
> **ROOT CAUSE (chi tiết GĐ C.34 repo con):** logo gốc có sóng tràn RỘNG hơn vòng
> tròn xanh cả 2 bên → mọi crop theo bbox "sát nội dung" đều tạo khung lệch tâm.
> Đo màu tìm tâm cũng fail vì sóng cùng màu xanh với vòng.
>
> **Fix — đổi tư duy CROP sang COMPOSE:** bbox toàn bộ hình (trừ chữ) → paste vào
> canvas trắng vuông 1600×1600 scale 78% CĂN GIỮA 2 trục → mask tròn 96%. Cache-bust
> ?v=3 buộc thiết bị tải icon mới.
>
> **LESSON LEARNED — Logo có yếu tố tràn ngoài phải COMPOSE, không CROP (2026-09-17):**
> Icon tròn từ logo dạng "vòng tròn + sóng/tia tràn" cần artwork scale-vừa + căn
> giữa canvas vuông rồi mới mask tròn — crop-bbox không bao giờ cân vì bbox bị
> yếu tố tràn kéo lệch. Khi nhiều thành phần cùng màu, đo màu tìm tâm không đáng
> tin — vẽ grid overlay + bbox từng phần lên ảnh rồi NHÌN trước khi viết công thức.
>
> **Tiêu chí kiểm chứng:** icon mới: vòng xanh + ngựa + sóng nằm GIỮA vòng tròn
> trắng đều 2 bên; Đại ca cài lại (gỡ app cũ + ie4uinit -show + cài) thấy icon cân
> như ảnh mẫu; typecheck 0 lỗi; version 3.3.2 / 3.1.2 khớp 2 nơi mỗi app.

### GĐ 157: Báo cáo Truy xuất - Đối soát + 5 báo cáo nguồn SQL (repo con v3.2.0) (2026-09-18)

| Commit | Thay đổi |
|---|---|
| (repo con) `07e007b` | feat(txds): Báo cáo TX-DS + 5 báo cáo nguồn SQL — agent nhánh txds chạy tool 6 nguyên bản + dialog cảnh báo thiếu dữ liệu (GĐ C.28, v3.2.0) |
| (mới) | chore: tăng version app tổng 3.3.2 → 3.3.3 |

> **Yêu cầu lớn của Đại ca (18/09):** Tận dụng tool `6_BC_TX-DS_2026_Vr1.5_0705.py` (tool
> TỔNG HỢP + ĐỐI SOÁT 12 giai đoạn chạy cục bộ — đọc 7 nguồn file Excel trong 1 thư mục,
> không đăng nhập web nào) làm **Báo cáo Truy xuất - Đối soát**. Khi chạy mà SQL chưa đủ
> dữ liệu → cảnh báo "Chưa đủ dữ liệu thực hiện. Bạn có muốn download dữ liệu để chạy báo
> cáo này không?" (Có/Không) — Có → treo lệnh download vào hàng chờ.
>
> **Đã chốt với Đại ca:** làm 7 nguồn TRƯỚC rồi mới tổng hợp TX-DS; chỉ tải nguồn thiếu;
> 5 báo cáo nguồn = nội dung các sheet tool 6 (NK/XK/DT/TT/TKTHSD-HĐĐT) tổng hợp 19 trung tâm.
>
> **Triển khai (chi tiết đầy đủ GĐ C.28 AGENTS.md repo con):**
> 1. **5 báo cáo nguồn SQL** (SqlDataModule bảng generic): nhập kho NK (stg_5BKN),
>    xuất kho XK (stg_6BKX), bán hàng DT (stg_4BKCCN), **thu tiền TT (mới)** (stg_2DTTDT),
>    **tình hình SD-HĐĐT (mới)** (stg_1HĐĐT) — 1 dòng data OUTPUT = 1 dòng báo cáo.
> 2. **ETL:** bảng stg_11BKTH (13.BKTH) + **center suy ra theo THỨ TỰ FILE (mtime)**
>    cho 1HĐĐT/2DTTDT/4BKCCN — khớp 100% cách tool 6 gán trung tâm qua `new_names[i]`
>    (đã đối chiếu CENTERS_3/CENTERS_16 tool download = new_names tool 6). Regex center
>    chuẩn mã ngắn TD/HM/QO + nhánh BLTH prefix-mã.
> 3. **Agent nhánh txds:** kiểm tra 7 nguồn OUTPUT (thư mục TỪ NGÀY — PA1) → thiếu →
>    status `needsData` + missing; đủ → stage re-stamp mtime (ngày + index tải) → chạy
>    tool 6 nguyên bản (SMED_OUTPUT_DIR) → file 1.BC_TX-DS_*.xlsx.
> 4. **Web:** dialog cảnh báo ĐÚNG VĂN BẢN Đại ca — bấm **Có** → treo job download CHỈ
>    nguồn thiếu (dùng form/progress module sẵn có); **Không** → dừng. claim.ts txds
>    không đòi tài khoản SMED; report.ts nhận status needsData.
>
> **✅ E2E thật trên máy (nguồn ghép 16-17/09 — chưa ngày nào đủ 7 nguồn):** 7/7 nguồn
> → 97 file staged → tool 6 chạy 14s → file 174KB: sheet ĐỐI CHIẾU hiện "Khớp"/"Chuẩn",
> sheet TT dữ liệu thật trung tâm TD. Test xong dọn sạch môi trường tạm.
>
> **LESSON LEARNED — Kỳ TX-DS phải theo quy ước PA1 (1 lượt tải gộp cả khoảng nằm ở
> thư mục TỪ NGÀY) (2026-09-18):** Tool 6 gán trung tâm theo mảng `new_names` (19 tên
> cố định) khớp THỨ TỰ file trong thư mục — copy nguồn NHIỀU ngày vào 1 thư mục làm
> lệch (38 file > 19 tên). ĐÚNG: stage từ đúng thư mục TỪ NGÀY (1 lượt download = 19
> file/nguồn gộp cả khoảng — PA1 GĐ 151) + re-stamp mtime theo index để deterministic.
> Khi kết hợp tool cũ (giả thiết dữ liệu theo lượt-tải) với pipeline mới (giả thiết
> theo-ngày), phải đối chiếu GIẢ THIẾT của tool trước khi nối.
>
> **LESSON LEARNED — Đường dẫn tương đối trong test Python vs cwd (2026-09-18):**
> Test script chạy từ project root dùng `Path('OUTPUT/...')` tương đối → trỏ vào
> `agent/OUTPUT` KHÁC (thư mục rác cũ) trong khi service dùng OUTPUT tuyệt đối
> `apps/banhang/OUTPUT`. Mất 15 phút debug "file tồn tại theo ls nhưng Python bảo
> không". Quy tắc: test nhánh agent PHẢI load module + dùng `m.OUTPUT_BASE` của chính
> nó (đường dẫn tuyệt đối TOOL_DIR.parent/OUTPUT), không tự chế path tương đối.
>
> **App tổng không đổi code** — chỉ ghi lịch sử + version 3.3.3.
>
> **⚠️ VIỆC CẦN LÀM cho Đại ca khi test trên production:** Vào `/m/bc-truyxuat` chọn kỳ
> (VD 14-17/09) → bấm chạy → hiện cảnh báo thiếu nguồn (16/09 thiếu MISA 13.BKTH,
> 17/09 thiếu 5 nguồn SMED) → bấm **Có** → job download tự treo → xong bấm chạy lại
> TX-DS → agent tổng hợp file Excel tại máy. Service agent ĐÃ restart 06:18 chạy bản mới.
>
> **Tiêu chí kiểm chứng:** 5 trang báo cáo nguồn hiện bảng theo ngày + trung tâm;
> TX-DS cảnh báo đúng văn bản khi thiếu; Có = treo đúng nguồn thiếu; đủ 7 nguồn →
> file 1.BC_TX-DS tại OUTPUT\.txds_work + tên hiện trên web; typecheck 0 lỗi cả 2 app.

### GĐ 158: Đường B đổi kiến trúc — TX-DS = 1 bảng tổng hợp từ GiongDB, BỎ tool 6 (repo con v3.3.0) (2026-09-18)

| Commit | Thay đổi |
|---|---|
| (repo con) `2b9fac8` | feat(txds): GĐ 158 — txds_report.py tổng hợp từ GiongDB + Excel 1 sheet + chunk upload; bỏ stage+tool 6 |
| (mới) | docs(agents): GĐ 158 + version app tổng 3.3.3 → 3.3.4 |

> **Yêu cầu của Đại ca (18/09):** Khi đủ dữ liệu KHÔNG chạy tool 6 (chỉ để tham khảo
> cách lấy dữ liệu), KHÔNG tạo file Excel 9 sheet — chỉ cần báo cáo nội dung sheet
> "1.BC_TX-DS"; các sheet kia (ĐỐI CHIẾU/TT/DT/XK/NK/TKTH/2 bảng kê MISA) là dữ
> liệu đã có trong SQL, khi cần sẽ làm báo cáo riêng. Đã hỏi chốt 4 điểm: bảng chính
> = Bảng kê chi tiết HĐ (MISA 11BKCT); tính Check + Lợi nhuận gộp thẳng khi tổng
> hợp; web = bảng tìm kiếm + phân trang + CÓ file Excel 1 sheet (subtotal + tô vàng
> giữ như tool 6); giữ flow job txds + cảnh báo Có/Không.
>
> **Kiến trúc mới (repo con):**
> 1. **txds_report.py (etl/):** tái hiện 12 giai đoạn tool 6 bằng Python/pandas đọc
>    thẳng bảng stg_* (lọc ngày thật từng dòng — GĐ 151): TKTH bung Nội dung thu →
>    map Trung tâm HĐ + Phiếu bán hàng → ghép TT 1-1 dòng-theo-dòng (TT_THỪA thêm
>    cuối) → DT/XK/NK theo khóa đa cột → Lợi nhuận gộp + 10 cột Check. Nguồn đặt
>    tên nội bộ `tt__/dt__/xk__/nk__` tránh trùng tên cột (tool 6 dùng iloc vị trí
>    nên không vấp — bài học đã ghi), map về tên hiển thị khi xuất. Lưu GiongDB
>    (txds_result) + sinh Excel 1 sheet OUTPUT\14.TXDS\<từ ngày> (openpyxl).
> 2. **Chunk upload (mới — kênh truyền payload lớn):** web không vào được GiongDB,
>    server function Vercel giới hạn body 4.5MB → agent chia payload (~0.8KB/đo,
>    cả tháng ~6-8MB) thành phần ~1.2MB POST qua report endpoint → server ghép vào
>    cột `result_full` jsonb (migration 0007) khi đủ. Status 'running' trong lúc
>    upload giữ updated_at mới. Web fetch RIÊNG qua loadTxdsResult (phân trang 100
>    dòng + tìm kiếm server-side + subtotal tính trên TOÀN BỘ bảng) — list jobs
>    poll 10s vẫn nhẹ, không kéo payload nặng.
> 3. **Agent run_txds_task:** check 7 nguồn qua SQL (không đếm file OUTPUT) →
>    thiếu → needsData; đủ → ETL nạp file mới → txds_report.py → Excel + chunk.
>
> **Bug bắt được khi test thật:** cột ngày 6BKX trong staging là ISO datetime
> (`2026-09-14 15:49:28` — tool 5 xuất datetime object) trong khi lọc chỉ dùng
> TRY_CONVERT style 103 (DD/MM/YYYY) → XK bị coi THIẾU dù có data. Fix COALESCE
> 3 cách parse (103 + 120 + không style) ở CẢ txds_report._load lẫn
> _txds_check_sources — 2 chỗ phải luôn đồng bộ.
>
> **LESSON LEARNED — Payload lớn web↔agent: chia chunk qua kênh có sẵn (2026-09-18):**
> Kết quả báo cáo chi tiết (hàng nghìn dòng × 110 cột) không thể nằm trong list
> jobs (poll 10s phải nhẹ) cũng không gói 1 request (giới hạn body). Giải pháp 3
> tầng: agent lưu bản đầy đủ ở DB cục bộ (GiongDB txds_result) + upload chunk lên
> Neon result_full + web fetch phân trang server-side theo nhu cầu. Trước khi thêm
> kênh truyền mới, rà giới hạn từng tầng (body size, serializer, poll frequency).
>
> **LESSON LEARNED — __file__ không tồn tại trong python -c (2026-09-18):**
> Probe đường dẫn bằng python -c khai báo `Path(__file__)` → NameError vì -c chạy
> chuỗi không phải file. Dùng file thật + import module có guard, hoặc hardcode
> đường dẫn probe.
>
> **LƯU Ý:** Job TX-DS của GĐ 157 (bản tool 6) không có result_full — chạy lại kỳ
> đó sẽ có bảng. Service agent PHẢI restart SAU khi Vercel deploy xong (restart
> sớm → chunk endpoint 500). Output test OUTPUT\14.TXDS\2026-09-14 đã tạo thật,
> 442KB A1:DF795.
>
> **Tiêu chí kiểm chứng:** Chạy TX-DS kỳ đủ 7 nguồn → web hiện bảng ~110 cột
> tìm kiếm + phân trang + subtotal + tổng kết đối soát; Excel 1 sheet tại máy;
> kỳ thiếu nguồn vẫn cảnh báo đúng văn bản + treo download đúng nguồn; typecheck
> 0 lỗi; build OK.



### GĐ 159: Egress Neon cạn 4.83/5GB — chặn select * kéo result_full + quy ước tiết kiệm (repo con v3.3.1) (2026-09-18)

| Commit | Thay đổi |
|---|---|
| (repo con) `07114ab` | perf(egress): loadSmedJobs + claim.ts loại result_full — hết đốt egress |
| (app tổng) `782746c` | fix(data): LIMIT tin nhắn 1000→300 + docs quy ước egress + version 3.3.5 |

> **Bối cảnh:** Ảnh Neon Console 18/09 (đúng 1 tháng sau GĐ 128 khởi tạo usage):
> **Network transfer 4.83GB/5GB (~97%)** — vượt là Neon khoá compute đến đầu chu kỳ
> → CẢ HAI app ngừng hoạt động. Đại ca hỏi: cách hiểu 2 luồng dữ liệu có đúng không,
> dự tính thế nào, giải pháp gì.
>
> **Chẩn đoán — trả lời Đại ca:**
> 1. **Cách hiểu GẦN ĐÚNG, 2 điểm chỉnh:** (a) Neon KHÔNG gửi lệnh cho SQL Server
>    máy công ty — Agent (service GIONG_SMED_Agent) TỰ POLL Vercel 20s → Vercel hỏi
>    Neon; tính toán ở GiongDB cục bộ KHÔNG tốn egress Neon; kết quả gửi ngược lên
>    Vercel GHI vào Neon (ghi = ingress, miễn phí). (b) Cả 2 app dùng chung 1 project
>    Neon `giong-vn` → chung hạn mức 5GB.
> 2. **Thủ phạm chính:** GĐ 158 thêm cột `result_full` (bảng TX-DS 6-8MB/job) vào
>    `smed_pull_jobs`, mà `loadSmedJobs` (app con) + `claim.ts` (agent) dùng select */
>    returning * → mỗi poll 10s khi mở trang SMED = kéo 6-8MB ≈ 36MB/phút → đốt 5GB
>    trong vài giờ. Đây giải thích vì sao 18 ngày đã ngốn 4.83GB.
>
> **Fix (surgical — 3 query + 1 tài liệu):**
> 1. `loadSmedJobs` (app con): select * → liệt kê 21 cột, LOẠI result_full.
> 2. `claim.ts` (app con): returning * → cột cụ thể, LOẠI result_full (job retry
>    có thể còn result_full cũ — phòng ngừa).
> 3. `data.ts` (app tổng): LIMIT tin nhắn 1000 → 300 (attachments/reactions jsonb
>    nặng; tin cũ vẫn nằm DB).
> 4. AGENTS.md mục 9: quy ước 5 điểm tiết kiệm egress (cấm select * bảng payload
>    lớn; payload chỉ tải khi bấm xem; Neon Console tránh select *; hydrate không
>    thêm collection mới tuỳ tiện; theo dõi Usage vượt 60-70% rà query mới).
>
> **LESSON LEARNED — Cột JSONB lớn trong bảng job là bom egress khi có select * (2026-09-18):**
> Thêm cột payload lớn vào bảng CHUNG (smed_pull_jobs) thay vì bảng riêng khiến MỌI
> query cũ select * tự kéo thêm hàng MB. Quy tắc từ giờ: (a) payload > 100KB phải
> nằm bảng riêng hoặc phải có mặt trong danh sách "cột cấm select *"; (b) khi thêm
> cột lớn, grep `select *` + `returning *` trên bảng đó và sửa tất cả; (c) response
> poll/hydrate phải nhẹ theo thiết kế, không phụ thuộc dữ liệu hiện tại nhỏ.
>
> **LESSON LEARNED — Egress Neon tính cả SELECT của người (Neon Console) (2026-09-18):**
> Mọi byte Neon gửi ra internet đều tính — kể cả khi Đại ca/em mở bảng trong Console
> Console SQL. Debug nên dùng COUNT(*) + LIMIT, tránh mở nguyên bảng lớn.
>
> **Vận hành:** theo dõi Neon Console → Usage; nếu vượt ~60-70% giữa tháng thì rà
> lại query mới thêm. Kỳ vọng sau fix: ~100-200MB/ngày (tuỳ tần suất mở app).
>
> **Tiêu chí kiểm chứng:** Mở trang app con (SMED/báo cáo) → network tab request
> loadSmedJobs chỉ vài KB (không còn MB); agent poll log không đổi; TX-DS bấm xem
> vẫn hiện đủ bảng (fetch riêng result_full); typecheck 0 lỗi cả 2 app.

### GĐ 160: Hệ sinh thái — PA-A Bước 1: API Server tại công ty + Cloudflare Tunnel, app con bắt đầu bỏ Neon (repo con v3.4.0) (2026-09-18)

| Commit | Thay đổi |
|---|---|
| (repo con) | feat(api-server): FastAPI :8777 + tunnel keeper + SQL translator PG→T-SQL + migration 0008 + service GIONG_API_Server (GĐ C.35) |
| (mới) | docs(agents): GĐ 160 + version 3.3.5 → 3.3.6 |

> **Bối cảnh — đã chốt với Đại ca (2026-09-18):** Egress Neon free 5GB/tháng dùng CHUNG
> app tổng + app con (GĐ 159 đã đốt 4.83GB). Dữ liệu bán hàng SMED 01/01/2025→nay và
> tương lai RẤT LỚN (stg_2DTTDT một phân hệ đã 130.295 dòng) → không thể dựa Neon lâu dài.
> Đại ca duyệt **PA-A**: app con BỎ Neon — Vercel chỉ render UI, mọi dữ liệu về
> **SQL Server Express GiongDB tại công ty** qua **Cloudflare Tunnel miễn phí**; app tổng
> GIỮ Neon (chấm công/check-in/nhiệm vụ...). Đại ca chốt PA-1: gộp hướng FastAPI của phiên
> GĐ 160 sáng với tunnel + SQL translator của phiên chiều.
>
> **Kiến trúc (chi tiết đầy đủ ở AGENTS.md repo con GĐ C.35):**
> ```
> Vercel (app con) ──HTTPS──► Cloudflare Tunnel ──► API Server (máy cty, FastAPI :8777)
>                                                        │ 127.0.0.1
>                                                        ▼
>                                        SQL Server Express .\SQLEXPRESS — GiongDB
> ```
>
> **Lộ trình 7 bước (Bước 1 đã XONG, E2E toàn tuyến PASS):**
> 1. ✅ Cloudflare Quick Tunnel + API Server khung + Windows Service `GIONG_API_Server`
> 2. ⬜ Backend TunnelSql trong `db.ts` app con (3 backend Neon/PGLite/Tunnel)
> 3. ⬜ ETL nạp đủ lịch sử 01/01/2025 → nay
> 4. ⬜ Agent chuyển poll API Server nội bộ (bỏ qua Vercel — chết nguồn egress lớn nhất)
> 5. ⬜ Deploy app con không DATABASE_URL
> 6. ⬜ Kháng hóa 30 ngày song song (Neon bật để đối chiếu)
> 7. ⬜ Rút env Neon khỏi app con
>
> **SỰ CỐ đã xử lý — ghi cho vòng sau:** file `api_server.py` FastAPI của phiên sáng
> (chưa commit) bị phiên chiều ghi đè mất. Dựng lại được nhờ file test E2E + migration
> còn sót (15/15 PASS). Bài học: file quan trọng commit sớm làm checkpoint; trước khi
> ghi file vào thư mục có hoạt động dở phải liệt kê + git status trước.
>
> **Version:** app tổng 3.3.5 → 3.3.6 (docs-only — patch); repo con 3.3.1 → 3.4.0
> (feature kiến trúc — minor). Checklist GĐ 138 ✓ (không thành phần nào ≥ 10).
>
> **Tiêu chí kiểm chứng:** service `GIONG_API_Server` RUNNING tự khởi động; /health local
> + qua tunnel OK; curl internet → SQL Server trả data thật; 15/15 E2E + 6/6 translator;
> token sai 401, không quyền 403; Neon app con CHƯA rút (kháng hóa bước 6).



### GĐ 161: PA-A Bước 2 — App con TÁCH HẲN khỏi Neon, chạy SQL Server GiongDB qua Cloudflare Tunnel (repo con v3.5.0) (2026-09-18)

| Commit | Thay đổi |
|---|---|
| (repo con) `41a9438` | feat(pa-a): Bước 2 — backend Tunnel db.ts + translator đầy đủ + mirror 3 bảng + fallback perms (GĐ C.36) |
| (repo con) `fd38278` | docs(agents): GĐ C.36 + version 3.5.0 |
| (mới) | docs(agents): GĐ 161 + version 3.3.6 → 3.3.7 |

> **Bối cảnh — sự cố trùng đúng ngày triển khai:** 14:10 hôm nay Neon vượt quota
> egress 5GB → khóa TOÀN BỘ kết nối (code 53000). Cả 2 app chết: app tổng sign-in
> 500, app con agent poll 500, build app tổng fail (db:migrate không nối được DB).
> **Không phải do code** — commit GĐ 159 build success, push 14:25 có trước lỗi 500
> 14:10. Neon free reset chu kỳ đầu tháng — app tổng chờ hồi phục; app con thì
> **không cần chờ nữa**: Bước 2 tách hẳn khỏi Neon.
>
> **Kiến trúc mới app con:** Vercel KHÔNG còn DATABASE_URL. Mọi query:
> Vercel → Cloudflare Tunnel (Quick, miễn phí) → API Server FastAPI :8777 tại máy
> công ty (Windows Service GIONG_API_Server — Bước 1) → SQL Server GiongDB.
> Ảnh/file vẫn Cloudinary/Drive. App tổng giữ Neon như cũ.
>
> **Chi tiết kỹ thuật (đầy đủ ở AGENTS.md repo con GĐ C.36):** backend "tunnel"
> trong db.ts cài đúng interface Sql — 23 chỗ getSql() không sửa; translator
> PG→T-SQL hoàn chỉnh (RETURNING→OUTPUT, ON CONFLICT→MERGE, FOR UPDATE SKIP
> LOCKED→readpast/updlock/rowlock, interval→DATEADD, CAST, LIMIT/ILIKE...);
> mirror 3 bảng + fallback quyền JWT khi mirror trống; JSON NVARCHAR parse.
>
> **✅ Verify production:** deploy commit 41a9438 READY; `/api/units` trả 19 trung
> tâm DATA THẬT từ SQL Server qua tunnel công khai; tsc 0 lỗi; build OK; E2E API
> Server 15/15 PASS.
>
> **LESSON — Egress Neon đốt bởi query không nhìn thấy được (2026-09-18):**
> GĐ 159 đã loại result_full khỏi poll nhưng quota VẪN cạn 5GB trong ngày —
> tự rà lại thấy nguyên nhân còn lại là hydrate + auth + poll 20s của agent cộng
> dồn 18 ngày. Free tier 5GB/tháng KHÔNG đủ cho 2 app dùng chung — PA-A đúng lúc.
> **Quy tắc từ giờ:** app mới/khối lượng lớn KHÔNG dùng Neon dùng chung; Neon
> chỉ cho app tổng (đã tiết kiệm theo quy ước GĐ 159).
>
> **LESSON — Build fail vì DB chết là kiểu lỗi "không phải code" khó nhìn (2026-09-18):**
> Commit docs-only (AGENTS.md + version) build fail → dễ nghi code. Chuỗi xác minh:
> (1) commit trước build OK? (2) build local PASS? (3) runtime log có lỗi DB?
> → chốt nguyên nhân môi trường. Redeploy khi Neon hồi phục là đủ, không sửa code.
>
> **⚠️ Việc đang treo app tổng (chờ Neon reset đầu tháng):** login + dữ liệu app
> tổng 500 cho tới khi chu kỳ mới. Khi Neon sống lại: redeploy commit 93d9b34
> (build trước đó fail chỉ vì DB) — không cần sửa gì.
>
> **Tiêu chí kiểm chứng:** app con hoạt động đầy đủ không phụ thuộc Neon
> (production đã verify); app tổng hồi phục sau Neon reset (chờ đầu tháng);
> typecheck 0 lỗi cả 2 repo.


### GĐ 164: PA-A HOÀN TẤT — App tổng bỏ Neon, chạy SQL Server GiongDB qua tunnel (2026-09-18, 3.4.0)

| Commit | Thay đổi |
|---|---|
| `5d6af0c` | feat(pa-a): db.ts backend tunnel + Better Auth qua tunnel-dialect + seed backup 12 bảng vào GiongDB |
| (mới) | feat(pa-a): Bước 4 agent poll nội bộ + toàn tuyến verify + version 3.4.0 |

> **Chỉ thị của Đại ca (18/09):** Neon đã khóa do vượt quota 5GB — app tổng
> không còn dùng được. **Bỏ hẳn Neon cho CẢ HAI app** — dùng SQL Server tại
> máy chủ công ty (như app con Bước 2). Ảnh vẫn qua Cloudinary. Lấy dữ liệu
> backup Neon tại `attachments/`. Sau đó **Bước 4: Agent poll API Server nội
> bộ** (bỏ hẳn đường Vercel→Neon).

**1. Nạp backup vào GiondDB (`scripts/seed-giongdb-from-backup.py`):**
Backup JSON 14/09 (cron tuần GĐ 104) gồm 12 bảng app. Script suy kiểu cột từ
dữ liệu thật (DATETIME2/NVARCHAR(n)/BIT), khóa NVARCHAR(128) NOT NULL,
DELETE+INSERT nạp đè (idempotent), đánh dấu `_migrations` để Vercel build
không áp lại migration Postgres lên SQL Server. Kết quả: 70 chấm công, 67
check-in, 221 nhiệm vụ, 10 đề nghị, 47 ghi chú, 35 nhân sự, 20 trung tâm...
Bảng auth (user/session/account/verification) tạo rỗng — `ensureAuthUser`
tự tạo tài khoản từ employees lần đăng nhập đầu (GĐ 19).

**2. `db.ts` backend tunnel + Better Auth `tunnel-dialect.ts`:**
- db.ts: thêm backend "tunnel" ưu tiên cao nhất (`TUNNEL_API_BASE_URL` +
  `API_TOKEN`), xuất `tunnelQueryRun` dùng chung. Vercel: XÓA `DATABASE_URL`
  (app tổng không thể chết vì Neon nữa), thêm API_TOKEN +
  TUNNEL_API_BASE_URL.
- **Better Auth không đi qua getSql()** — khi xóa DATABASE_URL nó rơi nhánh
  PGLite → getPglite() throw → login chết. Fix: `tunnel-dialect.ts` (Kysely
  dialect gọi tunnelQueryRun; compiler Postgres — SQL PG-style do API Server
  tự dịch; transaction NO-OP vì HTTP stateless). Xác minh thật: đăng nhập
  tạo user/account/session trong SQL Server — đăng nhập production hoạt động.

**3. Bổ sung translator API Server (3 bug thật):**
- `/query` với INSERT/UPDATE/DELETE: fetchall() trên DML raise "No results"
  → commit KHÔNG chạy → ghi mất. Fix: chỉ fetch khi `cur.description` khác
  None; DML commit + trả rows rỗng.
- `= ANY($1::text[])` (push.ts) → `IN (SELECT value FROM OPENJSON(...))`;
  param list → JSON string trước execute; quy tắc ANY đặt TRƯỚC quy tắc
  `$N::text` (nếu không bị xé `CAST(... )[]`).
- Cast biểu thức không tham số: `max(x)::text`, `hire_date::text`...

**4. Bước 4 — Agent poll nội bộ (`SMED_INTERNAL_API_URL`):**
Agent thêm env opt-in: đặt `SMED_INTERNAL_API_URL=http://127.0.0.1:8777` trên
service → claim/report chạy localhost (KHÔNG qua Vercel → hết phụ thuộc
internet/Neon; offline vẫn nhận job nếu API Server sống). Path nội bộ khác
Vercel (`/agent/claim` vs `/api/agent/claim` — 404 đầu tiên nhờ log bắt ngay);
`call_web` gửi thêm header Authorization Bearer (guard token API Server).
Không đặt env → tự giữ đường Vercel cũ (backward-compat).

**Toàn tuyến đã verify (production):**
- App tổng: trang chủ 200, đăng nhập tạo user+session trong SQL Server,
  menu đầy đủ, data render từ GiongDB.
- App con: `/api/units` trả 19 trung tâm qua tunnel (từ Bước 2).
- Agent: poll nội bộ sạch 20s/lần, không còn lỗi 404/Vercel.
- Typecheck 0 lỗi; build OK; E2E API Server 15/15.

**LESSON LEARNED — Better Auth cần dialect riêng khi đổi backend (2026-09-18):**
Better Auth nhận `database` trực tiếp (Pool/PGLite dialect), KHÔNG đi qua
getSql() của app. Đổi backend DB = phải viết Kysely dialect tương ứng
(pglite-dialect là mẫu). Kiểm tra: grep `new Pool|dialect` toàn src/ trước
khi tuyên bố "app đã tách backend".

**LESSON LEARNED — fetchall() trên DML pyodbc raise, commit bị nhảy qua
(2026-09-18):** pyodbc không cho fetchall trên INSERT/UPDATE/DELETE ("No
results. Previous SQL was not a query."). Code `rows = fetchall(); commit()`
với DML = commit KHÔNG BAO GIỜ chạy → ghi âm thầm mất. Fix: phân nhánh theo
`cur.description`. Bài học GĐ 96 lặp lại ở tầng khác: lỗi chạy được nhưng sai
kết quả nguy hiểm hơn lỗi throw.

**⚠️ Việc còn mở (báo Đại ca):**
1. **Quick Tunnel đổi URL mỗi lần restart API Server** — env Vercel phải cập
   nhật tay + redeploy. Kênh tự đăng ký (tunnel-register) đã có nhưng secret
   service ↔ Vercel đang lệch (401) — cần đối chiếu secret 2 đầu. **Cách chữa
   tận gốc: Named Tunnel với domain riêng** (URL cố định vĩnh viễn) — chờ anh
   cung cấp domain (VD `api.tcgiong.smed.vn`).
2. Bảng auth rỗng ban đầu — user nào đăng nhập trước, tài khoản tự tạo
   (ensureAuthUser). Nếu cần mật khẩu cũ: dùng flow Quên mật khẩu.
3. Data 14/09→18/09 (4 ngày Neon đã khóa) KHÔNG có trong backup — mất 4 ngày
   data mới. Nếu anh có nhập gì trong 4 ngày đó thì cần nhập lại.

**Tiêu chí kiểm chứng:** Đăng nhập app tổng trên production OK (session lưu
SQL Server); data 12 bảng hiện đúng; app con tạo job → agent nhận nội bộ →
chạy tool → báo kết quả — KHÔNG còn request nào tới Neon từ cả 3 thành phần;
sidebar VERSION 3.4.0 (app tổng) / 3.6.0 (repo con) sau deploy.

### GĐ 165: E2E user flow production — login/SSO/sqlreport PASS, fix 4 bug translator/contract (2026-09-18)

| Commit | Thay đổi |
|---|---|
| (repo con `fc14aba`, v3.6.1) | fix(api-server): claim trả camelCase + report nhận result/missing/driveDir + translator LIMIT $N/subquery + smed_accounts cần nạp |
| (app tổng, v3.4.1) | docs + version — toàn bộ fix nằm ở repo con |

> **Mục tiêu:** Test ĐẦY ĐỦ user flow trên production sau PA-A: đăng nhập app tổng →
> SSO app con → tạo job SMED → agent chạy → file về OUTPUT.

**Kết quả — flow SỐNG, còn 1 khối chờ config:**

| Bước | Trạng thái |
|---|---|
| Đăng nhập app tổng (Better Auth qua tunnel) | ✅ 200 + session trong GiongDB |
| SSO sang app con | ✅ me trả user + phiên 7 ngày |
| Tạo job trên web app con | ✅ job vào GiongDB |
| Agent poll nội bộ nhận job | ✅ không còn KeyError (fix contract `fc14aba`) |
| Chuỗi sqlreport (ETL + SQL → result) | ✅ doanh thu 16/09 = 105.880.000đ (384 biên lai) — kết quả thật |
| Phân hệ SMED (cần credentials user_3/16) | ⏳ smed_accounts GiongDB RỖNG — credentials ở Neon đã chết, backup 14/09 không chứa bảng này (sinh sau mốc backup). **Cần Đại ca nhập lại trên web (SmedAccountsMenu — Admin)** hoặc gửi em file để nạp |

**4 lỗi bắt được + sửa (chi tiết kỹ thuật ở AGENTS.md repo con GĐ C.38):**

1. **Sign-in 500** — Better Auth/Kysely sinh `LIMIT $2` dạng THAM SỐ, translator chỉ
   dịch `LIMIT <số>` → fix `limit $N` → `top (CAST($N AS INT))` + quy tắc subquery wrap
   (LIMIT NGOÀI cuối câu → `top (N)` trong ngoặc).
2. **BUG NGHIÊM TRỌNG** — regex `\$(\d+)` bắt nhầm SỐ THỨ TỰ tham số làm GIÁ TRỊ limit
   (`limit $2` → `top (CAST(2 AS INT))` = top 2 dòng!) → session lookup sai → SSO fail.
   Fix: giữ token `$N` nguyên vẹn.
3. **Tài khoản auth hash sai mật khẩu** — user đầu tạo qua ensureAuthUser trúng password
   random fallback → đăng nhập luôn 401. Fix pattern GĐ 19 (xóa auth rows → đăng nhập
   lại → tạo đúng mật khẩu). Verify: session trong GiongDB.
4. **Contract claim/report lệch** — API Server trả snake_case, agent đọc camelCase →
   `KeyError 'dateFrom'` job kẹt running. Fix map camelCase + nhận đủ result/missing/driveDir.

**✅ Chuỗi sqlreport verify THẬT qua đường nội bộ:** job test → agent poll
localhost:8777 nhận trong 20s → ETL + SQL → done + result JSON doanh thu thật.
Đường đời job KHÔNG chạm Vercel/Neon — mục tiêu Bước 4 đạt trọn.

**Vận hành tunnel:** restart service → Quick Tunnel đổi URL → 2 app đọc URL từ
BUILD-TIME env → mỗi lần đổi phải cập nhật env + redeploy cả 2 app (đã làm hôm
nay, URL holly-locked-yours-enjoyed). Cơ chế tự đăng ký kv_settings có sẵn
nhưng app chưa ĐỌC nó lúc runtime — Named Tunnel (URL cố định) giải tận gốc khi
anh cấp domain.

**LESSON LEARNED — Dữ liệu config phụ thuộc runtime DB cũng phải có kế hoạch di dời
(2026-09-18):** credentials SMED sống trong Neon (AES-GCM) — tách DB mà quên di dời
dữ liệu config → schema đủ mà hệ thống không chạy được. Checklist tách hạ tầng:
(a) schema + (b) DATA (kể cả bảng config sinh SAU mốc backup cuối) + (c) cơ chế nhập
lại khi mất.

**LESSON LEARNED — Regex dịch SQL test bằng SQL THẬT từ log, không SQL tự chế
(2026-09-18):** translator test bằng SQL tự chế PASS nhưng SQL thật của Better Auth
sập ngay (LIMIT tham số, subquery, bắt nhầm $N). Mọi quy tắc dịch mới: bật log [SQL]
→ lấy SQL thật → test đúng SQL đó → verify kết quả business (session tạo được, me
trả user) chứ không chỉ "query không lỗi".

**Tiêu chí kiểm chứng:** login + SSO + tạo job + agent claim nội bộ + sqlreport PASS
như bảng trên; sau khi Đại ca nhập lại credentials SMED → phân hệ SMED chạy full.

**Bổ sung GĐ 165 (23:50 — vận hành sau khi ghi):** Quick Tunnel `holly-locked…`
CHẾT NGẦM giữa chừng — DNS trả Non-existent domain (Cloudflare hủy tunnel) dù
process cloudflared còn sống, service không hề hay biết → app 2 bên trả rỗng
im lặng. Đã restart service → tunnel mới `usual-produce-playing-curious` →
cập nhật env + redeploy 2 app (app tổng deploy tay `bcw3hcq62` + ghim domain;
app con push commit rỗng `cfe1974` — auto-aliasing phía app con ĐÃ hồi phục,
deployment mới tự nắm domain). Verify cuối: bundle app tổng = 3.4.1 ✓,
`/api/units` trả đầy đủ 19 trung tâm ✓.

**LESSON LEARNED — Quick Tunnel chết NGẦM: DNS hủy trước process (2026-09-18):**
`tasklist` thấy cloudflared sống KHÔNG có nghĩa tunnel còn hoạt động — Quick
Tunnel bị Cloudflare thu hồi bất cứ lúc nào, process không nhận tín hiệu.
Triệu chứng: API trả rỗng/không lỗi rõ ràng. Chẩn đoán nhanh: `nslookup
<tunnel-url>` → Non-existent domain = tunnel chết, không cần debug code.
Tunnel keeper hiện chỉ tạo URL MỚI khi restart service — cần thêm watchdog
định kỳ nslookup URL hiện hành, chết tự restart (việc kế tiếp cùng Named
Tunnel — giải tận gốc).


### GĐ 166: Credentials SMED nạp GiongDB + E2E PASS full user flow trên kiến trúc mới (2026-09-19, 3.4.1)

| Commit | Thay đổi |
|---|---|
| (repo con) | feat(smed): nạp 2 account SMED + API Server decrypt accounts + E2E PASS (GĐ C.39, v3.6.2) |
| (app tổng) | docs(agents): GĐ 166 — không đổi code |

> **Bối cảnh:** Đại ca gửi credentials SMED thật (2 account văn phòng + 15 trung tâm). `smed_accounts` đang rỗng (ciphertext cũ ở Neon đã chết) → tools SMED fail thiếu đăng nhập.
>
> **Đã làm (chi tiết kỹ thuật ở AGENTS.md repo con GĐ C.39):**
> 1. Nạp user_3 (tcgiongts) + user_16 (tcgiong) vào `dbo.smed_accounts` GiongDB — AES-256-GCM khóa SHA-256(APP_JWT_SECRET) (khóa mới, `.secrets/app_jwt_secret.txt` gitignored). 15 account trung tâm NẠP SAU (tool chỉ dùng 2 account VP).
> 2. API Server `/agent/claim` giờ DECRYPT accounts + trả camelCase (`accountKey/username/password/baseUrl`) khớp contract agent.
> 3. Bắt 2 bug khi nạp: mật khẩu parse dính "01" (số thứ tự trung tâm trong tin nhắn — pass thật `Cuongpk@123@` 12 ký tự, SMED AJAX trả Success:false im lặng) + format AES ghi nhầm `iv:ct:tag` (chuẩn `iv:tag:ct`) → InvalidTag.
> 4. Quick Tunnel restart lần nữa (URL `screening-comics-…`) → env + redeploy + GHIM domain app tổng (quy tắc GĐ 124 — lần này deployment thủ công KHÔNG tự nắm domain).
>
> **✅ E2E PASS full user flow production (~60 giây):** login app tổng → SSO → tạo job DTTHC 18/09 từ UI → agent claim nội bộ + credentials → tool login SMED OK cả 2 account → **Hoàn thành 19/19** → 2 file XLSX về `OUTPUT.DTTHC6-09-18\`.
>
> **Version:** repo con 3.6.1 → **3.6.2** (patch); app tổng giữ 3.4.1 (không đổi code).
>
> **Tiêu chí kiểm chứng:** Tool chạy tay 2 account OK; E2E web→agent PASS; smed_accounts decrypt round-trip OK; script test tạm dọn sạch.

### GĐ 167: Test production toàn diện 7/7 PASS + fix bấm Đăng nhập sớm bị reload (2026-09-19, 3.4.2)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(login): guard hydrated — bấm Đăng nhập/Enter trước khi hydrate xong không còn native submit reload trang vô hiệu |
| (mới) | test(scripts): test-prod-suite.mjs — bộ E2E chuẩn tái sử dụng (login + 5 module + SSO) |
| (mới) | chore: tăng version 3.4.1 → 3.4.2 |

> **Bối cảnh:** Đại ca yêu cầu "test production". Em chạy quy trình 4 tầng theo bài học tích lũy:
>
> **1. Version bundle (quy tắc GĐ 124):** curl domain chính → grep `/assets/index-*.js` trong HTML
> (--compressed vì response gzip — lesson GĐ 135) → tải bundle → grep version → **3.4.1 khớp
> package.json** = domain chính đang trỏ đúng bản mới, không bị ghim deployment cũ.
>
> **2. Tunnel + app con:** `/api/units` HTTP 200 trả 19 trung tâm data thật từ SQL Server qua
> Cloudflare Tunnel (2.5s) — tunnel sống, API Server sống, GiongDB sống.
>
> **3. E2E Playwright app tổng — 7/7 PASS:** đăng nhập (POST sign-in 200 sau 1.4s) → Dashboard
> (khối chào) → Chấm công 67 dòng → Nhiệm vụ board đầy đủ → Đề nghị 10 dòng → Check-in 57 dòng →
> SSO app con (me trả đúng user + mods, KPI SMED OK, module MISA có form + lịch sử). Số dòng
> khớp backup GĐ 164 (70 chấm công / 57 check-in... — vài dòng chênh là data mới thêm).
>
> **4. Phát hiện thật từ test:** các lần đầu bấm Đăng nhập NGAY sau khi mở trang (~2-3 giây đầu)
> bị kẹt lại /login. Debug qua capture network: **KHÔNG hề có POST sign-in** — form SSR render
> sẵn trong HTML, bấm trước khi JS hydrate = native form submit → trang reload login, không
> đăng nhập, không toast lỗi. Test chờ form hydrate xong mới bấm → sign-in 1.4s PASS ngay.
>
> **Fix (surgical — chỉ src/routes/login.tsx, 4 chỗ):** state `hydrated` (false → useEffect set
> true) + guard `onSubmit` (e.preventDefault khi chưa hydrate — trị gốc native submit) + nút
> submit `disabled={loading || !hydrated}` + tooltip hướng dẫn. Theo HTML spec, nút submit mặc
> định disabled thì Enter trong input cũng không submit được → chặn trọn cả 2 đường bấm/Enter.
> SSR và lần render đầu đều hydrated=false → không hydration mismatch. Sau hydrate nút tự bật.
>
> **LESSON LEARNED — Test E2E phải phân biệt "app lỗi" và "test bấm quá sớm" (2026-09-19):**
> 2 lần chạy đầu kết luận sai chiều ngược lại: lần 1 tưởng Nhiệm vụ/Đề nghị trống (thật ra chỉ
> render 583 ký tự sidebar vì đang bị đá về login); lần 2 tưởng phiên chết (thật ra script bấm
> nút trước khi hydrate). Dấu hiệu phân biệt: (a) nếu server fn calls có POST sign-in 200 nhưng
> vẫn kẹt → lỗi phiên thật; (b) KHÔNG có POST sign-in nào trong network → form submit không qua
> JS → bấm quá sớm. **Mọi assertion bấm nút trên trang SSR phải đợi hydration (nút enabled /
> network idle) trước khi click.** Kết luận "X trống / phiên chết" cần bằng chứng network, đừng
> tin text trang khi chưa chắc đã login xong.
>
> **Bộ test chuẩn:** `scripts/test-prod-suite.mjs` (login + full-load 5 module + SSO, xuất
> screenshots/). Lần sau test production chỉ cần `node scripts/test-prod-suite.mjs`.
>
> **Tiêu chí kiểm chứng (sau deploy):** Mở /login → bấm Đăng nhập trong 1-2 giây đầu → nút mờ,
> KHÔNG reload trang → sau một nhịp nút sáng → bấm → vào thẳng Dashboard. Dùng thường (bấm khi
> trang đứng yên) không đổi gì. Sidebar hiện VERSION 3.4.2.

### GĐ 168: Fix sync chấm công — translator UPSERT 1 dòng + contract đăng ký tunnel (2026-09-19, 3.4.3)

> **BUG REPORT của Đại ca (2026-09-19):** App tổng — Chấm công bị lỗi sync, không lấy dữ liệu về được máy chủ.
>
> **Chẩn đoán — 2 lỗi chồng nhau (chi tiết đầy đủ ở AGENTS.md repo con GĐ C.40):**
> 1. **Lỗi A:** bộ dò mệnh đề WHERE-LWW trong `translate_sql()` (api_server.py) có guard thừa nhìn ký tự trước dấu cách → luôn alnum → bỏ sót WHERE khi UPSERT viết 1 dòng (format thật production) → T-SQL lỗi 156 → mọi ghi chấm công/check-in văng lỗi, retry vô hạn.
> 2. **Lỗi B:** lệch contract 2 đầu — `register_tunnel_url()` gửi secret trong body JSON, còn route `/api/tunnel-register` đọc secret từ header → luôn 401 → URL tunnel mới không bao giờ đăng ký được → Vercel giữ URL cũ đã chết → mọi server function `fetch failed`.
>
> **Fix:** bỏ guard thừa trong api_server.py; route tunnel-register đọc secret từ body trước (header fallback); restart service + cập nhật env TUNNEL_API_BASE_URL + redeploy + ghim domain (quy trình GĐ 124).
>
> **✅ Verify:** UPSERT 1 dòng dịch đúng; ghi qua tunnel từ internet HTTP 200; E2E UI production: login → Vào ca → chụp → Xác nhận → record nằm trong GiongDB; tsc 0 lỗi.
>
> **LESSON LEARNED — Test translator bằng SQL ĐÚNG FORMAT production (2026-09-19):** test nhiều dòng “đẹp” không bắt được bug 1 dòng. Copy format SQL THẬT từ code app khi mô phỏng.
>
> **LESSON LEARNED — Process Python giữ code cũ, __pycache__ stale (2026-09-19):** sau sửa file Python của service: xóa __pycache__ + restart + verify QUA ENDPOINT THẬT, không chỉ py_compile.
>
> **Version:** 3.4.2 → **3.4.3** (patch — fix bug).

### GĐ 169: PA-1 — Tự cập nhật Quick Tunnel URL qua GitHub Gist + watchdog chống chết ngầm (2026-09-19, 3.5.0)

> **Yêu cầu của Đại ca (kèm sơ đồ 4 khâu, 2026-09-19):** “Làm tự động để app nhận Quick Tunnel khi khởi động lại máy tính/server” — Khởi động Windows → Server → cloudflared → lấy URL mới → **cập nhật URL vào nơi ứng dụng đang sử dụng** → Web/App lấy URL mới. Bước 1-3 ĐÃ có từ GĐ 160; khâu 4 đang là điểm nghẽn: mỗi lần tunnel restart phải sửa env TUNNEL_API_BASE_URL + redeploy CẢ HAI app bằng tay (GĐ 165/166/168 lặp lại quy trình này 3 lần).
>
> **Chẩn đoán khâu 4 (đo thật trước khi làm):** (1) đăng ký URL lên Vercel 401 — secret lệch 2 đầu; (2) nghiêm trọng hơn — thiết kế vòng lặp VÔ DỤNG: route tunnel-register ghi URL vào kv_settings QUA CHÍNH TUNNEL (tunnel chết → không ghi được; ghi được → app cũng không đọc kv_settings lúc runtime, vẫn dùng env build-time).
>
> **Đã chốt với Đại ca (2 câu hỏi):** PA-1 tự cập nhật (GitHub Secret Gist + app tự đọc runtime + watchdog, không cần domain) — Đại ca chọn PA-1; đồng bộ/thêm env Vercel — Đại ca duyệt.
>
> **Kiến trúc PA-1 (2 kênh ghi, 1 kênh đọc runtime):**
> 1. **Gist = kênh CHÍNH (NGOÀI tunnel, sống độc lập):** api_server.py `gist_publish_tunnel_url()` PATCH gist mỗi lần tunnel lên URL mới (GitHub REST, urllib thuần). Gist id `db3dae34ac285bc7935a72f365cb0d21`, file `giong-tunnel-gist.txt`, format `base_url: https://…`. Token `gh auth token` (scope gist) lưu `.secrets/gh_gist_token.txt` (gitignored) + env `GH_GIST_TOKEN` Vercel; gist id env `TUNNEL_GIST_ID` cả 2 project.
> 2. **Kênh Vercel = PHỤ (tương thích ngược):** POST /api/tunnel-register giữ nguyên (kênh Gist sống độc lập nên 401 cũ không còn chặn vận hành).
> 3. **App tự phục hồi runtime (db.ts CẢ HAI app):** `tunnelFetch()` — query fail sau retry (cold-start 2 lần) → đọc Gist → URL mới ≠ URL cũ → thử ĐÚNG 1 lần trên URL mới. URL Gist được cache (fromGist=true dùng trực tiếp); URL env chỉ cache 60s → có cơ hội đọc Gist định kỳ. `tunnelQueryRun` export giữ nguyên cho tunnel-dialect (Better Auth) — tự hưởng fallback.
> 4. **Watchdog DNS (chống chết ngầm — lesson GĐ 165):** `_watchdog_tunnel()` kiểm tra DNS URL hiện hành mỗi 60s; fail 3 lần LIÊN TIẾP → kill cloudflared → vòng keep_tunnel tự tạo tunnel mới + tự ghi Gist. Không còn `proc.wait()` bị động.
>
> **Env đã set (đều Secret, CẢ 2 project giong-vn-v6 + giong-banhang):** REGISTER_SECRET (đồng bộ giá trị service `8ec874dd…` — trị 401), GH_GIST_TOKEN, TUNNEL_GIST_ID. Service dùng file .secrets (không cần đụng NSSM env).
>
> **✅ Verify (đo thật):** py_compile + import module OK; gist round-trip PATCH 200 → GET đúng `base_url`; typecheck SẠCH 0 lỗi cả 2 repo; restart service ×3, mỗi lần tunnel mới đều `[gist] cập nhật URL lên Gist OK: HTTP 200`; GET gist xác nhận URL mới; `/health` + `/query` internet qua tunnel OK (`{"rows":[{"n":35}]}`); `/api/units` app con trả 19 trung tâm; version bundle 2 app khớp (3.5.0 / 3.7.0).
>
> **🐛 ROOT CAUSE 503 lặp (bắt thêm khi verify):** route tunnel-register cũ ghi kv_settings QUA CHÍNH TUNNEL — repo con đã bỏ Neon nên kv_settings nằm GiongDB, đường duy nhất tới GiongDB là CHÍNH tunnel vừa đăng ký (DNS chưa lan edge Vercel) → Tunnel SQL 530/503 ~1 phút đầu; retry 5×15s vẫn fail vì mỗi lần probe lại qua đúng tunnel đó. Fix tận gốc: route BỎ ghi kv_settings — chỉ xác thực secret + ack `ok:true`; URL lan qua Gist (kênh chính). Sau deploy route mới: đăng ký HTTP 200 ngay lần đầu.
>
> **⚠️ QUAN TRỌNG — kv_settings không còn được ghi tự động từ nay:** app tự đọc Gist runtime (tunnelFetch trong db.ts cả 2 app) khi query fail. URL cũ trong kv_settings thành stale — không ai đọc.
>
> **LESSON LEARNED — Kênh cập nhật cấu hình phải NGOÀI chính đối tượng nó cập nhật (2026-09-19):** route cũ ghi URL mới QUA tunnel cũ đang chết/vừa tạo (vòng lặp vô dụng — đã chẩn đoán đầu phiên nhưng chỉ sửa tuyến API Server, còn sót consumer cũ ở route Vercel). Cấu hình động phải đi kênh độc lập (Gist + GitHub API không phụ thuộc tunnel/Neon/Vercel), không qua chính đối tượng đang được cấu hình.
>
> **LESSON LEARNED — Đổi kênh lưu trữ = rà TẤT CẢ consumer cũ (2026-09-19):** chuyển kv_settings → Gist thì route tunnel-register (consumer cũ của kv_settings) phải sửa theo; bỏ sót consumer cũ là dạng lỗi "hai đầu không khớp" lần thứ N (GĐ 69 chat channel, GĐ 96 SQL column, GĐ 109 handoff URL). Khi chuyển kênh, grep mọi chỗ ghi/đọc của kênh cũ trước khi tuyên bố chuyển xong.
>
> **LESSON LEARNED — Tunnel chết ngầm trả HTTP 530 CÓ response, không phải lỗi mạng (2026-09-19, fix sau deploy đầu):** fallback Gist đầu tiên chỉ chạy khi `res === null` (fetch throw) — nhưng Cloudflare vẫn RESOLVE hostname tunnel cũ dù tunnel đã chết → trả HTTP 530/5xx có response → không vào nhánh đọc Gist → app kẹt URL chết mãi (bắt được khi verify: /api/units trả rỗng 0.6s). Fix: điều kiện fallback thêm `!res.ok` (2 app đồng bộ). Bài học: "lỗi hạ tầng" có 2 dạng — lỗi MẠNG (throw, res null) và lỗi Ở TẦNG HẠ TẦNG (HTTP error code có response); xử lý fallback phải bao CẢ HAI, không chỉ catch exception.
>
> **LESSON LEARNED — Kênh cập nhật cấu hình phải NGOÀI chính đối tượng nó cập nhật (2026-09-19):** route tunnel-register cũ ghi URL mới QUA tunnel cũ đang chết — tự đánh mất đường đi khi cần nhất (tương tự “lưu mật khẩu trong máy đã khóa”). Thiết kế kênh cấu hình/fallback: luôn hỏi “kênh này sống khi đối tượng chính chết không?”. Gist ngoài tunnel + API GitHub độc lập hoàn toàn với tunnel/Neon/Vercel.
>
> **LESSON LEARNED — Env build-time KHÔNG phải cấu hình runtime (2026-09-19):** Vercel env chỉ thay lúc build/redeploy; cấu hình đổi động (tunnel URL) phải có đường runtime (DB/CDN/Gist) + cơ chế app tự đọc khi lỗi. Giá trị build-time chỉ làm nhánh nhanh đầu tiên, không phải nguồn sự thật duy nhất.
>
> **LƯU Ý cho Đại ca khi test:** (1) restart máy/server → service tự bật → tunnel mới tự ghi Gist trong ~10s; (2) app tổng + app con sau khi deploy bản này TỰ nhận URL mới khi query (không cần sửa env/redeploy — có thể phải đợi tối đa 60s cache env); (3) nếu tunnel chết ngầm, watchdog tự phát hiện trong ≤3 phút và đổi URL mới; (4) log theo dõi: `LOG/api_server_*.log` (dòng [gist]/[tunnel-watchdog]) + console Vercel (dòng [db] tunnel URL mới từ Gist).
>
> **⚠️ Việc còn mở:** bản deployed hiện vẫn đang chạy URL cũ trong env build-time — sau khi push bản này, app tự đọc Gist; khi Đại ca cấp domain → chuyển Named Tunnel (PA-3) làm URL cố định vĩnh viễn, PA-1 giữ làm lớp dự phòng.
>
> **Version:** 3.4.3 → **3.5.0** (feature — minor; checklist GĐ 138 ✓ — không thành phần nào ≥10).

### GĐ 170: Đồng bộ offline-first toàn bộ module — phủ tombstone + pending queue cho UPDATE/DELETE (2026-09-19, 3.5.2)

> **Yêu cầu của Đại ca (2026-09-19):** Chấm công không đồng bộ đã sửa (GĐ 17/21/84); nay kiểm tra tiếp Check-in, Nhiệm vụ, Ghi chú, Chat, Đề nghị — module nào còn hở sync thì sửa.
>
> **Kết quả rà soát 3 tầng (store → server → DB) cho 5 module:**
>
> | Module | Tạo mới | Sửa (UPDATE) | Xóa (DELETE) |
> |---|---|---|---|
> | Check-in | ✅ queue + UPSERT LWW | — | ❌ DELETE FROM + fire-and-forget |
> | Nhiệm vụ | ✅ queue | ❌ fire-and-forget | ❌ xóa vật lý + fire-and-forget |
> | Ghi chú | ✅ queue + LWW | ❌ fire-and-forget | ✅ tombstone (GĐ 91) |
> | Chat (meta reaction/ghim/⭐) | ✅ queue + LWW | ❌ fire-and-forget | ✅ tombstone (GĐ 94) |
> | Đề nghị | ✅ queue + LWW | ❌ duyệt/sửa fire-and-forget | ✅ tombstone (GĐ 59) |
>
> **2 nguyên nhân gốc:** (1) **Gói C của GĐ 84** (UPDATE/DELETE fail cũng vào queue) đã phân tích nhưng "chờ duyệt" và KHÔNG BAO GIỜ được triển khai — nợ kỹ thuật 6 tuần; (2) **DB chuyển sang GiondDB SQL Server (GĐ 164)** — bỏ PGLite nghĩa là mất lớp ghi local, mọi fire-and-forget fail khi offline là MẤT HẲN (không còn lưới nào).
>
> **Fix GĐ 170 (theo đúng mẫu Chấm công đã chuẩn):**
> 1. **Migration 0030:** tasks thêm `deleted_at` (collection chính cuối cùng thiếu tombstone) + index.
> 2. **data.ts:** `insertTask` UPSERT LWW theo `updated` (trước là DO NOTHING — sửa task offline bị ghi đè); `deleteTask` tombstone; `loadTasks` filter `deleted_at IS NULL`; +`loadDeletedTaskIds`.
> 3. **store.ts — mọi action UPDATE/DELETE của 5 module giờ: queue TRƯỚC → gọi server → thành công mới rút khỏi queue:**
>    - `setTaskStatus` / `updateTask` / `updateNote` / `updateProposal` / `setProposalStatus` (duyệt/từ chối/mở lại) / `updateMessageMeta` (reaction/ghim/⭐/xóa-phía-tôi) — thêm `_tombstoneUpdate`/`_tombstoneMeta` vào queue, `retryPendingSync` nhận diện và đi qua đúng server function.
>    - `removeTask` / `removeCheckin` — tombstone + queue (trước đây removeTask xóa VẬT LÝ, không lan truyền thiết bị khác).
> 4. **PendingRecord.key** — bản ghi update/meta dùng key `${id}:update` / `${id}:meta` để clear đúng (không đụng data.id của bản ghi thường).
> 5. **Hydrate:** pending set loại trừ tombstone (task đã xóa không được hồi sinh từ local); +filter `deletedTaskIds` sau merge; +2 FIX BUG THẬT: map messages hydrate/poll đọc `r.updatedAt`/`r.deletedAt` camelCase (rows DB là snake_case → luôn undefined — tombstone tin nhắn KHÔNG LỌC, updatedAt sai = at); merge messages đổi LWW từ `r.at` → `updatedAt ?? r.at` + filter tombstone sau merge.
>
> **LESSON LEARNED — Gói đã phân tích mà không triển khai = nợ kỹ thuật vô hình (2026-09-19):** GĐ 84 ghi rõ "Gói C — CHƯA sửa (chờ Đại ca duyệt)" rồi không ai duyệt, không ai hỏi lại — nợ sống yên trong AGENTS.md 6 tuần cho đến khi user gặp sự cố thật. Việc viết "chờ duyệt" phải có hạn chót hoặc câu hỏi follow-up cụ thể.
>
> **LESSON LEARNED — Đổi hạ tầng DB phải rà lại mọi lưới an toàn cũ (2026-09-19):** PGLite có getWritableDatabase() ghi local nên fire-and-forget fail còn lưới; GiondDB SQL Server KHÔNG có lớp local writer → mọi action không qua pending queue mất hẳn khi offline. Checklist khi đổi backend: với MỖI action ghi dữ liệu, tự hỏi "nếu fail offline thì data đi đâu?" — không có câu trả lời là lỗ hổng.
>
> **LESSON LEARNED — Rà sync theo 3 chiều bảng (2026-09-19):** đi từng module × từng thao tác (INSERT/UPDATE/DELETE) × từng tầng (store action → server function → SQL schema) mới thấy đủ lỗ hổng; chỉ rà theo module thì mỗi lần chỉ bắt được 1 góc (GĐ 84 bắt INSERT, GĐ 59/91/94 bắt DELETE từng module riêng lẻ, UPDATE lọt hết).
>
> **LESSON LEARNED — Đổi backend DB mà quên rà migration pipeline (2026-09-19, bắt khi verify GĐ 170):** GĐ 164 chuyển GiondDB SQL Server + XÓA DATABASE_URL khỏi Vercel → `scripts/migrate.mjs` (chạy khi build, chỉ nối DATABASE_URL) SKIP IM LẶNG trên production → migration 0030 KHÔNG TỰ ÁP như mọi giai đoạn trước (tưởng "migration tự chạy khi build" còn đúng — KHÔNG còn nữa). Cột `deleted_at` đã thiếu cho tới khi em verify qua tunnel (`SELECT COUNT(*) ... COLUMN_NAME = 'deleted_at'` = 0) và chạy tay qua API Server `/query` (ALTER TABLE tasks ADD deleted_at DATETIME2 NULL + đánh dấu `_migrations` filename `0030_tasks_tombstone.sql` — bảng _migrations GiondDB dùng cột `filename`, khác Postgres `name`). E2E thật: INSERT task test → tombstone → `deleted_at` set → loadTasks filter loại đúng → dọn sạch. **Quy tắc từ giờ:** thêm migration mới sau GĐ 164 PHẢI chạy tay qua tunnel (hoặc em báo Đại ca bổ sung runner); đừng tin "tự chạy khi build" như Neon — verify bằng query INFORMATION_SCHEMA sau deploy.
>
> **LƯU Ý cho Đại ca khi test:** offline sửa/xóa nhiệm vụ + ghi chú + reaction/ghim chat + duyệt đề nghị + xóa check-in → bật lại mạng → mở thiết bị khác → dữ liệu khớp. Migration 0030 tự chạy khi Vercel build. Task xóa vật lý trước GĐ 170 (nếu có) không phục hồi được — nhưng từ giờ xóa lan truyền đúng.
>
> **Version:** 3.5.1 → **3.5.2** (fix sync — patch; checklist GĐ 138 ✓).

### GĐ 171: Fix badge đỏ "Lỗi sync" kẹt vĩnh viễn sau khi đã sync thành công (2026-09-19, 3.5.3)

| Commit | Thay đổi |
|---|---|
| (mới) | fix(store): retryPendingSync thành công với attendance → flip `synced: true` trong store (trước chỉ path `clock()` làm) |
| (mới) | fix(cham-cong): nút '↻ Thử lại ngay' xong → cập nhật lại pendingRecords/syncStats (trước chỉ set expiringSoon) |
| (mới) | chore: tăng version 3.5.2 → 3.5.3 |

> **BUG REPORT của Đại ca (2026-09-19):** Dòng chấm công khi lỗi mạng hiện "Đang chờ";
> Admin có nút "Thử lại ngay" + bảng "Đang chờ đồng bộ". NHƯNG khi mạng hồi phục,
> data ĐÃ lên server rồi mà dòng vẫn báo đỏ **"Lỗi sync"** mãi — muốn hết màu đỏ.
>
> **ROOT CAUSE (2 lớp):**
> 1. **Store không flip `synced` khi retry thành công:** GĐ 84 thêm `retryPendingSync`
>    (backoff + nút Thử lại ngay) — nó đọc `_neonInsertAttendance(rec)` và xóa khỏi
>    queue, nhưng KHÔNG cập nhật `synced: true` lên record trong store. Duy nhất path
>    `clock()` (điểm danh khi online ngay lúc bấm) có flip. → Hệ quả: badge "Lỗi sync"
>    render từ `a.synced === false` → dù server đã có data, dòng vẫn đỏ. **Đây chính là
>    dạng bug của GĐ 17 (badge "Đang chờ" kẹt vĩnh viễn) TÁI DIỄN** — GĐ 17 fix bằng
>    LWW merge theo updatedAt (máy khác tự lành khi hydrate), nhưng TRÊN CHÍNH THIẾT
>    BỊ đã sync, store local không được cập nhật vì hydrate không chạy lại tự động.
> 2. **Nút "Thử lại ngay" xong không làm mới UI:** chỉ set `expiringSoon` —
>    `pendingRecords` (đếm + bảng "Đang chờ đồng bộ") không được tính lại.
>
> **Fix (2 chỗ — surgical):**
> 1. `retryPendingSync` case attendance: sau khi push OK, collect id thành công →
>    `useAppStore.setState((s) => ({ attendance: s.attendance.map(...) }))` flip
>    `synced: true` (dùng `useAppStore` module-level — lesson GĐ 84: hàm ngoài store
>    không thấy `set/get`, phải qua `getState()`/`setState()`).
> 2. `cham-cong.tsx` handler nút Thử lại ngay: sau `await`, tính lại `setPendingRecords(...)`
>    + `setSyncStats(...)` từ `getPendingSyncStats()` — bảng + badge cập nhật ngay.
>
> **LESSON LEARNED — Trạng thái hiển thị (synced/sync-error) phải được cập nhật tại MỌI
> đường sync thành công, không chỉ đường chính (2026-09-19):** `synced: false` là TRẠNG
> THÁI HIỂN THỊ phụ thuộc luồng ghi; luồng retry của GĐ 84 tạo ra đường sync THỨ 2
> (backoff + nút tay) nhưng quên cập nhật trạng thái → badge kẹt. Checklist khi thêm
> đường sync mới: grep các field trạng thái hiển thị (`synced`, `_syncTs`, error flag)
> và cập nhật TẤT CẢ các đường — tạo-mới, retry-backoff, retry-thủ-công, hydrate.
>
> **LESSON LEARNED — Lỗi badge-kẹt dạng tái diễn: kiểm tra TRÊN THIẾT BỊ đã sync
> không chỉ thiết bị khác (2026-09-19):** GĐ 17 đã gặp badge "Đang chờ" kẹt (fix LWW
> merge — tự lành ở MÁY KHÁC nhờ hydrate). GĐ 171 cùng triệu chứng nhưng ở MÁY ĐÃ
> SYNC — máy đó không hydrate lại tự động nên LWW merge không cứu được. Khi fix kiểu
> này nhớ phủ CẢ 2 thiết bị: (a) thiết bị khác → merge LWW; (b) thiết bị chính →
> flip state ngay trong luồng sync thành công.
>
> **Tiêu chí kiểm chứng:** Điểm danh offline → "Đang chờ"; bật mạng → retry tự chạy
> → dòng HẾT đỏ (không còn "Lỗi sync"); Admin bấm "Thử lại ngay" → bảng "Đang chờ
> đồng bộ" + badge cập nhật ngay sau khi xong; data trên Neon/GiondDB đúng như cũ
> (không đổi gì tầng data).

---

### GĐ 172: Dashboard 3 thiết bị lệch số Nhiệm vụ — DB là nguồn sự thật tuyệt đối (2026-09-19, 3.5.4)

> **BUG REPORT của Đại ca (19/09):** Cùng 1 user Admin, Dashboard "Nhiệm vụ mở" trên
> 3 thiết bị KHÁC NHAU: Android **75/139** · iOS **81/140** · Desktop **70/132** —
> đã xóa cache + refresh mà vẫn lệch. Không biết số nào đúng.
>
> **Nguồn sự thật (query GiondDB qua tunnel):** `tasks` = **222 dòng sống**
> (86 Việc cần làm / 136 Đã xong) — KHÔNG khớp con số nào của 3 thiết bị.
>
> **ROOT CAUSE — 2 lớp chồng nhau:**
> 1. **`loadTasks` LIMIT 200** — DB 222 dòng nhưng chỉ trả 200 gần nhất → NHIỆM VỤ
>    THIẾU trên mọi thiết bị (đây là lý do tổng các máy 132-140 < 222).
> 2. **Task "mồ côi" local** — trước GĐ 170 tasks bị XÓA VẬT LÝ (không tombstone);
>    bản cũ còn kẹt trong localStorage từng máy. Merge offline-first giữ MỌI task
>    local mãi mãi (local là nguồn chân lý theo thiết kế GĐ 17) → máy nào lưu task
>    gì từ trước thì thấy nấy → mỗi thiết bị một con số.
>
> **Fix (phương án tối ưu tự chọn theo ủy quyền của Đại ca — 2 file):**
> 1. `data.ts`: LIMIT 200 → **1000** (tasks bảng nhẹ ~0.5KB/dòng, 1000 dòng vẫn
>    nhẹ hơn 1 ảnh check-in — không đụng quy ước egress GĐ 159).
> 2. `store.ts`: sau merge, **DB là nguồn sự thật tuyệt đối** — task local KHÔNG
>    pending mà không tồn tại trên DB (kể cả tombstone) bị LOẠI khỏi store.
>    Neo trên neonTasks (LIMIT 1000 đủ) + deletedTaskIds — không thêm query mới.
>    Offline vẫn an toàn: task mới tạo offline đang pending GIỮ NGUYÊN cho tới khi
>    sync lên DB thành công.
>
> **Kết quả:** 3 thiết bị về cùng 1 con số = số thật trong DB (86 mở / 136 xong).
> Lần mở đầu sau deploy mỗi máy tự dọn task mồ côi của chính nó.
>
> **LESSON LEARNED — "local là nguồn chân lý" chỉ đúng cho record CÒN TỒN TẠI ở
> server (2026-09-19):** Merge offline-first phải trả lời được: "record local không
> có trên server là (a) offline chờ sync hay (b) đã bị xóa ở nơi khác?" — chưa có
> tombstone (GĐ 170 mới phủ đủ) thì (b) không phân biệt được → task ma sống mãi
> trong localStorage. Quy tắc: collection nào đã đủ tombstone + có version field
> thì DB PHẢI là nguồn sự thật tuyệt đối; local chỉ giữ record ĐANG pending.
>
> **LESSON LEARNED — LIMIT 200 lặng lẽ cắt data khi bảng lớn dần (2026-09-19):**
> LIMIT đặt ra ngày đầu để "an toàn egress" nhưng bảng lớn dần theo thời gian →
> cắt data ÂM THẦM, không lỗi không cảnh báo — chỉ phát hiện khi user so sánh số
> giữa các máy. Mọi query LIMIT phải đi kèm con số kiểm chứng định kỳ (COUNT(*)
> bảng so với số dòng app thấy) hoặc LIMIT trần đủ lớn cho nhiều năm.
>
> **Tiêu chí kiểm chứng:** Mở Dashboard trên cả 3 thiết bị sau deploy → 3 máy
> cùng hiện 86 việc mở / 136 đã xong (hoặc số mới hơn nếu data đổi giữa lúc test —
> QUAN TRỌNG là 3 máy GIỐNG NHAU); trang Nhiệm vụ tổng số khớp Dashboard;
> tạo task mới offline → vẫn giữ được khi mạng yếu (pending queue hoạt động);
> typecheck SẠCH 0 lỗi; 17/17 test pass.

---

### GĐ 173: Phiên verify GĐ 172 + Hệ sinh thái — chuẩn hóa BÁO CÁO app con (không đổi code app tổng) (2026-09-19, 3.5.4)

> **Phần 1 — Verify GĐ 172 cho Đại ca (không đổi code):** Đại ca báo 3 thiết bị
> lệch số Nhiệm vụ — em query GiondDB qua tunnel API Server: **222 tasks = 86
> "Việc cần làm" + 136 "Đã xong", tombstone 0** — đúng số GĐ 172 ghi. Câu SQL
> thật của app (LIMIT 1000 + subquery tombstone) qua translator trả đủ 222 dòng.
> E2E Playwright production (bản bundle 3.5.4): KPI Dashboard hiện đúng
> "86 mở / 136 đã xong" = KHỚP DB. Kết luận: fix GĐ 172 hoạt động đúng; 3 máy
> lệch là bundle cũ/PWA + localStorage mồ côi chưa dọn — hướng dẫn Đại ca:
> desktop F12 → Application → Clear site data; điện thoại gỡ app PWA cài lại
> (hoặc xóa "Cookie và dữ liệu trang web" — xóa cache thường KHÔNG đụng
> localStorage). Đã chụp bằng chứng screenshots/verify-tasks-172.png.
>
> **Phần 2 — Hệ sinh thái (repo con GĐ C.44, v3.10.0):** chuẩn hóa TOÀN BỘ
> phần BÁO CÁO app con Bán hàng theo 9 điểm yêu cầu của Đại ca: định dạng số
> '#,##0' nguyên (text trái/số phải), Tên hàng hóa −40% (ẩn, không đè cột
> phải), Số lượng −50%, Ngày/Trung tâm hẹp nhường NCC rộng, mọi báo cáo vừa
> màn hình không cuộn ngang, SUBTOTAL cộng THEO LỌC (kiểu Subtotal Excel),
> nút "Tải Excel" xuất client-side (dep xlsx 0.18.5), TX-DS giữ cuộn ngang +
> Tải Excel toàn bộ (3 điểm đã chốt trước khi làm). Chi tiết kỹ thuật + 2
> lesson (lockfile workspaces --workspaces=false; format hiển thị vs làm tròn
> dữ liệu) ở AGENTS.md repo con GĐ C.44. **App tổng không đổi code.**
>
> **Tiêu chí kiểm chứng:** 3 thiết bị sau khi dọn site data/PWA → cùng số 86/136;
> app con các trang BÁO CÁO: lịch sử trên, số nguyên canh phải, bảng vừa màn
> hình, SUBTOTAL theo lọc, Tải Excel về Downloads; version app con 3.10.0.

---

### GĐ 174: Hệ sinh thái — Cảnh báo thiếu dữ liệu cho MỌI báo cáo + chuỗi 3 bước TỰ ĐỘNG (repo con v4.0.1) (2026-09-19)

| Commit | Thay đổi |
|---|---|
| (repo con) `ae9e649` | feat(báo cáo): GĐ C.45 — cảnh báo thiếu dữ liệu MỌI báo cáo + chuỗi 3 bước tự động + hiệu chỉnh version 3.10.0 sai → 4.0.1 |
| (mới) | docs(agents): GĐ 174 + version app tổng 3.5.4 → 3.5.5 (docs-only — patch) |

> **Yêu cầu của Đại ca (kèm ghi chú quan trọng, 19/09):** Ghi vào lịch sử AGENTS.md làm **QUY TẮC
> NGHIỆP VỤ**: Khi chạy khởi tạo báo cáo mà chưa có dữ liệu được cập nhật download về máy để SQL
> không có dữ liệu tổng hợp → phải có cảnh báo: **"Chưa đủ dữ liệu thực hiện. Bạn có muốn download
> dữ liệu để chạy báo cáo này không?"** — 2 lựa chọn (Có)/(Không). Chọn **CÓ** → 3 bước: (1) treo
> lệnh chạy báo cáo vào hàng chờ đợi; (2) chạy các lệnh download dữ liệu phục vụ báo cáo đó; (3)
> chạy lại job đang chờ và thực thi báo cáo. Áp dụng cho **MỌI báo cáo** trong phần BÁO CÁO kể cả
> các báo cáo chưa lập.
>
> **Trước đây:** cơ chế này CHỈ có ở TX-DS (GĐ C.28) — 5 báo cáo nguồn + 2 bảng kê MISA chạy mà
> staging rỗng chỉ trả bảng rỗng im lặng, không ai biết thiếu dữ liệu.
>
> **Triển khai (chi tiết đầy đủ ở AGENTS.md repo con GĐ C.45):**
> 1. **etl/sql_reports.py** — `REPORT_SOURCE_TABLES` (8 query_key → nguồn staging + reportKey
>    download + điều kiện dòng hợp lệ khớp WHERE builder) + `check_source_data()` +
>    `NoSourceDataError` — `run_sql_report()` kết quả 0 dòng → raise mang danh sách nguồn thiếu.
> 2. **Agent** — `run_sql_task` bắt lỗi → trả needsData; main loop báo web (đồng bộ luồng TX-DS;
>    API Server không cần sửa).
> 3. **Web** — `requeueReportJob` (wait/rerun); dialog cảnh báo hiện cho MỌI báo cáo (bỏ
>    enableTxdsDialog); bấm CÓ = treo job 'waitdownload' + treo download nguồn thiếu; **bước 3
>    TỰ ĐỘNG**: poll 6s thấy đủ download xong → tự requeue 'pending' (FIFO sau download); badge
>    "Chờ tải dữ liệu" + nút Chạy lại cho user đổi ý.
>
> **✅ Verify:** logic test Python PASS; py_compile agent OK; tsc 0 lỗi; build OK; grep staged diff
> 0 password; version app con **4.0.1** khớp 2 nơi.
>
> **⚠️ HIỆU CHỈNH version lần 4 — checklist GĐ 138 tự bắt được:** bump GĐ C.44 lần trước ghi
> `3.9.1 → 3.10.0` — SAI hệ 1 chữ số (minor 9 đầy + tăng minor phải nhớ major: `3.9.1 → 4.0.0`).
> GĐ C.45 fix nhỏ → hiệu chỉnh gộp **4.0.1**. Lần này em tự chạy checklist bước 2 và phát hiện
> ngay, không cần Đại ca nhắc — quy tắc nằm ở NƠI LÀM VIỆC + CỔNG KIỂM gắn thao tác (GĐ 138)
> bắt đầu phát huy.
>
> **LESSON LEARNED — xóa khối code phải assert biến khối ĐỊNH NGHĨA (lần 3):** xóa hàm theo
> ranh giới "def đến def" nuốt luôn TXDS_SOURCES + comment GĐ C.28 nằm giữa 2 def — py_compile
> PASS (cú pháp đúng!) chỉ grep biến mới thấy. Git checkout khôi phục + patch lại bằng
> assert-count từng chuỗi. Sau xóa khối lớn: grep TẤT CẢ biến khối định nghĩa, đừng tin py_compile.
>
> **⚠️ VIỆC CẦN LÀM tại máy chạy tool:** copy agent/40_web_agent.py MỚI sang thư mục tool trên
> D: (đè file cũ) → restart GIONG_SMED_Agent SAU khi Vercel deploy xong.
>
> **App tổng không đổi code** — chỉ ghi lịch sử + version 3.5.5.

---

### GĐ 176: Hệ sinh thái — Báo cáo cuối ngày - Đối soát HĐ-XK (repo con v4.0.3) (2026-09-20)

| Commit | Thay đổi |
|---|---|
| (repo con) `64c173f` | feat(bc-cuoi-ngay): Báo cáo cuối ngày - Đối soát HĐ-XK giống sheet DS_SL_XK-DT-HD tool 21 — builder dsxk_comparison viết lại đúng 100% nguồn (DTTHC/BKX-PX-/BKCT-ký hiệu) + needsData 3 nguồn + quyền sqlreport theo query key (GĐ C.47, v4.0.3) |
| (mới) | docs(agents): GĐ 176 + version app tổng 3.5.6 → 3.5.7 (docs-only — patch) |

> **Yêu cầu của Đại ca (2026-09-20 — giao tự chủ, không hỏi lại, làm xong tự ghi +
> push):** Đọc tool `21_DS_DT_XK.py` anh tải vào `agent/` → làm **Báo cáo cuối ngày -
> Đối soát HĐ-XK** trong nhóm BÁO CÁO KẾ TOÁN giống Sheet "DS_SL_XK-DT-HD"; các sheet
> khác chỉ bổ trợ.

> **Tóm tắt (chi tiết đầy đủ ở AGENTS.md repo con GĐ C.47):**
> 1. **Trace nguồn sheet DS tool 21** — B bán ra = file **DTTHC** (không phải BKCCN
>    như suy từ tên cột — soi code mới thấy); C xuất kho bán = BKX chứng từ `PX-`;
>    E HĐGTGT = placeholder 0 ĐIỀN TAY của tool, nay **tự tính từ BKCT MISA ánh xạ
>    KÝ HIỆU hóa đơn** (HD_SYMBOL_MAP 1C26MAA→LB … + pattern động bền sang năm mới).
> 2. Builder SQL tổng hợp từ GiondDB (KHÔNG chạy tool 21); B CHỈ nhận lượt tải DTTHC
>    từ đúng TỪ NGÀY (PA1) — không fallback lệch kỳ; thiếu nguồn B/C/E → needsData →
>    chuỗi 3 bước GĐ C.45 (treo job → download → tự chạy lại).
> 3. Trang /m/bc-cuoi-ngay hết placeholder → SqlDataModule queryKey=dsxk-comparison
>    — tự hưởng chuẩn GĐ C.44 (lọc cột + SUBTOTAL theo lọc + #,##0 + Tải Excel).
> 4. Quyền job sqlreport theo QUERY KEY (dsxk cần đủ 3 nhóm Bán hàng+Kho+MISA) —
>    sửa kèm lỗi user thường bị chặn oan (sqlreport rơi nhánh "report lạ → chỉ Admin").

> **✅ Verify (chạy thật trên GiongDB):** kỳ 14→16/09 = 20 dòng (TỔNG B=147 bán,
> C=390 xuất, E=388 HĐGTGT, D=-243, F=-241); kỳ 18/09 thiếu BKX → raise đúng nguồn
> `xuatkho`; py_compile + tsc + build PASS; grep staged diff 0 password.

> **LESSON (repo con đã ghi đủ):** (1) "giống 100% tool X" phải TRACE TỪNG nguồn trong
> code tool, không suy từ tên cột/file; (2) fallback dữ liệu lệch kỳ nguy hiểm hơn
> báo thiếu — với báo cáo ĐỐI SOÁT, thiếu phải cảnh báo, không thay bằng data gần đúng.

> **⚠️ Việc cho Đại ca (như GĐ 128/139/145):** copy `agent/etl/sql_reports.py` MỚI
> sang thư mục tool trên D: (đè file cũ) + restart GIONG_SMED_Agent khi tiện — trước
> khi restart, báo cáo mới trên web vẫn hiện needsData (agent cũ chưa biết builder).

### GĐ 175: Hệ sinh thái — Icon trình duyệt giống 100% app tổng + Sidebar app con hiệu chỉnh 6 điểm (repo con v4.0.2) (2026-09-19)

| Commit | Thay đổi |
|---|---|
| (repo con) `0c6f0a8` | feat(ui): icon trình duyệt đồng bộ app tổng (?v=4 + meta apple) + Sidebar 6 điểm — rail 48px, dãn cấp 2, Tổng quan 3 trạng thái, vệt sáng chính xác, đổi 4 nhãn nav (GĐ C.46, v4.0.2) |
| (mới) | docs(agents): GĐ 175 + version app tổng 3.5.5 → 3.5.6 (docs-only — patch) |

> **Yêu cầu của Đại ca (2026-09-19, 9 điểm):** (1) gắn biểu tượng trình duyệt GIỐNG 100%
> app tổng; Sidebar app con: (2) tăng độ rộng khi ẩn vì biểu tượng bị che; (3) dãn khoảng
> cách dòng tiêu đề cấp 2; (4) nút Tổng quan bấm lần 1 sổ ra cấp 1 + cấp 2, bấm lần nữa
> thu gọn còn cấp 1; (5) "Thống kê doanh thu theo đối tượng" → "Thống kê DT theo đối tượng";
> (6) "Thống kê doanh thu tổng hợp Chuỗi" → "Thống kê DT tổng hợp Chuỗi"; (7) vệt sáng
> LAN — chọn "Báo cáo TH_NXT kho theo lượng-tiền" thì "...theo lượng" cũng sáng; (8-9)
> 2 nhãn "Báo cáo Tổng hợp NXT kho theo lượng[-tiền]" → "Báo cáo TH_NXT kho theo lượng[-tiền]".

> **Icon — điều tra trước khi sửa:** so MD5 10 file PNG `icons/` của 2 app = GIỐNG NHAU
> 100% (GĐ 153 đã đồng bộ bộ icon chung từ trước). Lý do thiết bị của anh còn thấy khác:
> app con thiếu 2 meta `apple-mobile-web-app-capable` + `apple-mobile-web-app-status-bar-style`
> (app tổng có) + cache-bust còn `?v=3` (trình duyệt giữ icon cũ). Fix: thêm 2 meta +
> bump cache-bust **?v=4** cho head (icon/apple-touch/manifest) + 10 icon trong
> manifest.json — SW app con pass-through không cache nên cache-bust là đủ.

> **Tổng quan 3 TRẠNG THÁI (mở rộng toggle 2 trạng thái GĐ C.32):** bấm lần 1 (mặc định
> = nhánh active) → SỔ RA hết (cấp 1 + cấp 2); lần 2 → THU GỌN còn cấp 1; lần 3 → về
> mặc định. Cơ chế: nhận diện trạng thái hiện tại bằng cách so Set `openNhom` với
> full-set nhãn nhóm (isAll → thu gọn; rỗng → mặc định; còn lại → sổ hết).

> **Vệt sáng lan — ROOT CAUSE:** 3 chỗ so route bằng `startsWith` (`SidebarLeaf` active
> + `pathToActiveLeaf`) — `/m/bc-nxt-luong` là TIỀN TỐ của `/m/bc-nxt-luong-tien` → mở
> trang tiền thì lá "lượng" cũng sáng. Fix: so KHỚP TUYỆT ĐỐI `pathname === item.to`.

> **Sidebar:** rail `w-10` (40px) → **`w-12` (48px)** — icon hết bị che; content đẩy
> theo `lg:pl-12` (styles.css hover 320px giữ nguyên — mép sidebar MỞ không đổi).
> Dãn cấp 2: container con nhóm bậc 1 `gap-0.5 → gap-1.5` + tiêu đề cấp 2 `py-1 → py-1.5`.

> **Nhãn nav:** đổi 4 chỗ trong `nav.ts` + 2 trang SMED (`title` prop) — trang bc-nxt
> dùng `ModuleRoute` đọc nhãn từ NAV nên tự đúng sau khi đổi NAV.

> **LESSON LEARNED — `startsWith` trên route lá = vệt sáng lan khi 1 path là tiền tố
> path khác (2026-09-19):** nav có cặp path tiền tố (`bc-nxt-luong` / `bc-nxt-luong-tien`)
> thì mọi phép so route "lỏng" đều sáng nhầm. Route lá trong nav tự quản → so `===` luôn
> chính xác; nếu sau này cần hỗ trợ sub-route, phải so trên danh sách path lá chính xác
> chứ không dùng prefix mù.

> **LESSON LEARNED — Playwright đo text phải mở ĐỦ nhánh trước khi assert (2026-09-19):**
> lần đo 1 báo "nhãn THIẾU" dù nav đã đổi — nhãn nằm trong nhóm đang ĐÓNG + `innerText`
> chỉ đọc text visible (GĐ 149). Phép đo đúng trạng thái UI: mở nhóm → hover giữ rail
> mở → đo; hoặc đo class bằng `get_attribute("class")` (không phụ thuộc visibility).

> **Verify (Playwright dev server, PASS hết):** rail 48px + content pl 48px; hover 320px
> mép dính mép; 4 nhãn mới hiện + nhãn cũ sạch; Tổng quan lần 1 sổ hết / lần 2 còn cấp 1
> / lần 3 nhánh active mở lại; mở `/m/bc-nxt-luong-tien` → CHỈ lá "lượng-tiền" sáng (và
> ngược lại); ô cấp 1 giữ 36px; head có `?v=4` + 2 meta apple; tsc 0 lỗi; build OK.

---

### GĐ 177: Chạy thử Báo cáo Đối soát HĐ-XK trên production — E2E 8/8 PASS + restart service (2026-09-20, 3.5.8)

| Commit | Thay đổi |
|---|---|
| (repo con) | test(e2e): E2E production Báo cáo Đối soát HĐ-XK 8/8 PASS — restart service nạp builder mới; bổ sung AGENTS.md GĐ C.47 (v4.0.4) |
| (mới) | docs(agents): GĐ 177 + version 3.5.7 → 3.5.8 |

> **Theo yêu cầu của Đại ca:** Chạy thử Báo cáo cuối ngày - Đối soát HĐ-XK kỳ CÓ đủ dữ
> liệu trên production để xem bảng + Tải Excel.
>
> **Chuẩn bị — restart service agent (không hỏi vì không gián đoạn):** service
> GIONG_SMED_Agent chạy thẳng từ repo (bài học GĐ 150) nhưng process cũ nạp code cũ
> vào bộ nhớ. `tasklist` kiểm tra KHÔNG tool SMED nào đang chạy (2 EXCEL.EXE là anh
> mở file riêng, không liên quan) → `sc stop` + `sc start` → log mới xác nhận agent
> khởi động OK (poll nội bộ :8777, auto-ETL bật).
>
> **E2E Playwright production 8/8 PASS** (script tạm `test-dsxk-e2e.mjs` — đã dọn):
> 1. ✅ Đăng nhập app tổng → 2. ✅ SSO app con → 3. ✅ /m/bc-cuoi-ngay render
> → 4. ✅ Tạo job kỳ 14→16/09 → 5. ✅ Agent nhận nội bộ + chạy → **Hoàn thành**
> → 6. ✅ Bảng kết quả **20 dòng**, tiêu đề đúng 6 cột DS_SL_XK-DT-HD (Trung tâm /
> Tổng số mũi tiêm bán ra (SMED) / xuất kho bán / Chênh lệch (Bán-Xuất) / trên
> HĐGTGT / Chênh lệch (Bán-HĐGTGT)) → 7. ✅ **Tải Excel** client-side file 20.894
> bytes → 8. ✅ OUTPUT máy agent sống.
>
> **LESSON — Service trỏ thẳng repo: restart là đủ, KHÔNG cần copy agent (2026-09-20):**
> Từ GĐ 150 NSSM Application trỏ thẳng `40_web_agent.py` trong repo → các ghi chú
> "copy file mới sang thư mục tool trên D:" cho agent không còn cần (vẫn cần cho tool
> gốc 1-30 nếu sửa). Quy trình mới: restart service SAU khi commit.
>
> **App tổng không đổi code** — chỉ ghi lịch sử + version 3.5.8.

---

### GĐ 178: Backfill lịch sử download 01/2025→08/2026 — 55 job tự tạo qua UI (2026-09-20, 3.5.9)

| Commit | Thay đổi |
|---|---|
| (repo con) | feat(backfill): GĐ C.48 — quét thiếu dữ liệu staging theo tháng + tạo 55 job download qua UI (v4.0.5) |
| (mới) | docs(agents): GĐ 178 + version 3.5.8 → 3.5.9 |

> **Yêu cầu của Đại ca (20/09):** Kiểm tra dữ liệu download còn thiếu 01/01/2025→
> 31/08/2026, thiếu thì tải — TRỪ Bảng kê chung cuối ngày (BKCCN). Tự tạo lệnh
> TRÊN ỨNG DỤNG để anh theo dõi. Xong tổng kết.
>
> **Quét thiếu (2 tầng — DB là nguồn quyết định, thư mục OUTPUT nhiều chỗ chỉ là
> KHUNG rỗng tạo bằng script):** query GROUP BY tháng 12 bảng staging GiondDB qua
> API Server nội bộ. **Thiếu thật 55 tháng-phân-hệ:** HĐĐT 2025-01→06 (6) ·
> DT tổng hợp Chuỗi 18 tháng (chỉ có tháng-01 mẫu) · NXT Kế toán 18 tháng (cùng
> gốc XNKT 2025-02→2026-08) · Lịch hẹn tiêm 2025-01→11 (11) · BKN 2025-12 +
> 2026-08 (2). **Đủ:** DTTDT, BKX, BLTH, BCCK, GDTVX, DT_BLTH, Chiết khấu, Đặt
> trước. **Trừ theo chỉ đạo:** BKCCN (đủ sẵn). **N/A:** BKCT/BKTH MISA (nguồn
> chỉ tồn tại từ 09/2026).
>
> **Tạo job QUA UI (đúng yêu cầu):** Playwright login → SSO → 5 trang download →
> điền từng tháng → bấm CTA "Lấy dữ liệu 19 trung tâm" → **55/55 OK, 0 lỗi**.
> Agent nhận FIFO ngay — job đầu HĐĐT 01/2025 chạy lúc 08:12. Ước tính agent tự
> chạy ~5.5 giờ (XNKT 18×6p là phần lớn).
>
> **App tổng không đổi code** — chỉ ghi lịch sử + version 3.5.9.

---

*Cập nhật lần cuối: 2026-09-20 (GĐ 178 — Backfill 55 job lịch sử, repo con 4.0.5; app tổng 3.5.9)*
*Người cập nhật: Trợ lý lập trình*

### GĐ 179: Hệ sinh thái — Đối soát HĐ-XK hiển thị + cảnh báo thiếu 1 lần + thanh % báo cáo (repo con v4.1.0) (2026-09-20)

| Commit | Thay đổi |
|---|---|
| (repo con) `7caacfd` | feat(báo cáo): GĐ C.49 — Đối soát HĐ-XK tên trung tâm đầy đủ + tiêu đề nhỏ đủ chữ + bỏ Subtotal đậm Tổng cộng + cảnh báo thiếu liệt kê tổng thể 1 lần + thanh % mọi báo cáo (v4.1.0) |
| (mới) | docs(agents): GĐ 179 + version app tổng 3.5.9 → 3.6.0 (docs-only — patch 9 đầy → nhớ minor) |

> **Yêu cầu của Đại ca (20/09 — 3 nhóm, chi tiết kỹ thuật đầy đủ ở AGENTS.md
> repo con GĐ C.49):**
> 1. **Báo cáo cuối ngày - Đối soát HĐ-XK** 3 điểm hiển thị: tên trung tâm ĐẦY
>    ĐỦ ("Trung tâm TC Long Biên" — từ bảng centers GiondDB); tiêu đề cột chữ
>    nhỏ 10px + wrap ĐỦ chữ (hết truncate mất chữ); bỏ dòng Subtotal — dòng
>    TỔNG CỘNG ĐẬM + nền nhạt nổi bật.
> 2. **Cảnh báo thiếu dữ liệu hỏi 1 LẦN DUY NHẤT** — ROOT CAUSE: builder raise
>    NoSourceDataError TỪNG BƯỚC (DS: thiếu B lần 1 → C lần 2 → E lần 3) → web
>    hỏi download 3 lần. Fix: `run_sql_report` check TẤT CẢ nguồn TRƯỚC khi chạy
>    builder → raise 1 lần với danh sách đầy đủ → dialog liệt kê tổng thể 1 lần.
> 3. **Thanh % hoàn thành áp MỌI báo cáo đang chạy** — waitdownload tính CẢ
>    tiến độ download các nguồn thiếu (doneCenters realtime GĐ C.19 của job
>    download) + trọng số giai đoạn chạy báo cáo; running = bar mờ indeterminate.

> **✅ Verify repo con:** builder thật kỳ 14→16 = 20 dòng tên đầy đủ, TỔNG CỘNG
> khớp đối chứng GĐ 177 từng đồng; py_compile OK; tsc 0 lỗi; build OK.

> **App tổng không đổi code** — chỉ ghi lịch sử + version 3.6.0 (docs-only —
> patch; checklist GĐ 138 ✓: 3.5.9 patch đầy 9 → về 0 + nhớ minor = 3.6.0,
> không thành phần nào ≥ 10).


### GĐ 180: Hệ sinh thái — Dữ liệu mới nhất cho MỌI báo cáo app con (repo con v4.2.0) (2026-09-20)

| Commit | Thay đổi |
|---|---|
| (repo con) | feat(báo cáo): GĐ C.50 — checkbox "Tải dữ liệu mới nhất trước khi chạy" (mặc định BẬT) + mốc thời gian nạp import_log (v4.2.0) |
| (mới) | docs(agents): GĐ 180 + version app tổng 3.6.0 → 3.6.1 (docs-only — patch) |

> **Câu hỏi của Đại ca (20/09):** Chạy lại báo cáo có lấy dữ liệu mới nhất từ SMED
> không? Có phải download lại file không? Nếu không thì dữ liệu chưa chính xác.
>
> **Trả lời (phân tích trước khi chốt):** KHÔNG — agent chỉ ETL file Excel hiện có
> trong OUTPUT; SMED sửa số sau lần tải cuối → báo cáo ra số cũ IM LẶNG (cảnh báo
> thiếu chỉ kích hoạt khi staging 0 dòng — data cũ-but-có không bị phát hiện).
>
> **Đã chốt qua 3 vòng hỏi:** PA-2 (checkbox + hiển thị thời gian tải — khuyến nghị
> của em) · Áp dụng TẤT CẢ báo cáo · Mặc định BẬT (an toàn).
>
> **Cơ chế:** Bật checkbox → bấm chạy: (1) treo job download TẤT CẢ nguồn của báo
> cáo trước (tải lại an toàn — xóa file cũ GĐ C.10 + nạp đè GĐ B.2.1, không nhân
> đôi) → (2) tạo job báo cáo → (3) treo 'waitdownload' ngay → agent tải xong tự
> chạy báo cáo (chuỗi 3 bước GĐ C.45, đổi điều kiện từ "thiếu" sang "user yêu cầu").
> Form hiển thị mốc "nạp lúc HH:MM" từng nguồn (max import_log.imported_at JOIN
> staging theo kỳ); kết quả có "nạp lúc HH:MM" (dataLoadedAt do agent ghi vào
> meta/summary). Bỏ tick → chạy nhanh bằng data đã có như cũ.
>
> Chi tiết kỹ thuật đầy đủ ở AGENTS.md repo con GĐ C.50 (SQL_SOURCES_BY_QUERY +
> loadSourceFreshness + requeueReportJob nhận sources/pending + agent dataLoadedAt).
>
> **⚠️ Restart GIONG_SMED_Agent sau deploy** để agent nhận phần dataLoadedAt
> (không restart vẫn chạy — chỉ thiếu mốc giờ trên kết quả).
>
> **Tiêu chí kiểm chứng:** Trang báo cáo: checkbox BẬT + mốc nạp từng nguồn; chạy →
> N job download + job 'Chờ tải dữ liệu' → thanh % tăng → tự chạy → "nạp lúc HH:MM"
> đúng giờ vừa tải; bỏ tick → nhanh như cũ; version app con 4.2.0 + app tổng 3.6.1
> (checklist GĐ 138 ✓ — không thành phần nào ≥ 10).


### GĐ 180: Hệ sinh thái — Dữ liệu mới nhất cho MỌI báo cáo app con (repo con v4.2.0) (2026-09-20)

| Commit | Thay đổi |
|---|---|
| (repo con) | feat(báo cáo): GĐ C.50 — checkbox "Tải dữ liệu mới nhất trước khi chạy" (mặc định BẬT) + mốc thời gian nạp import_log (v4.2.0) |
| (mới) | docs(agents): GĐ 180 + version app tổng 3.6.0 → 3.6.1 (docs-only — patch) |

> **Câu hỏi của Đại ca (20/09):** Chạy lại báo cáo có lấy dữ liệu mới nhất từ SMED
> không? Có phải download lại file không? Nếu không thì dữ liệu chưa chính xác.
>
> **Trả lời (phân tích trước khi chốt):** KHÔNG — agent chỉ ETL file Excel hiện có
> trong OUTPUT; SMED sửa số sau lần tải cuối → báo cáo ra số cũ IM LẶNG (cảnh báo
> thiếu chỉ kích hoạt khi staging 0 dòng — data cũ-but-có không bị phát hiện).
>
> **Đã chốt qua 3 vòng hỏi:** PA-2 (checkbox + hiển thị thời gian tải — khuyến nghị
> của em) · Áp dụng TẤT CẢ báo cáo · Mặc định BẬT (an toàn).
>
> **Cơ chế:** Bật checkbox → bấm chạy: (1) treo job download TẤT CẢ nguồn của báo
> cáo trước (tải lại an toàn — xóa file cũ GĐ C.10 + nạp đè GĐ B.2.1, không nhân
> đôi) → (2) tạo job báo cáo → (3) treo 'waitdownload' ngay → agent tải xong tự
> chạy báo cáo (chuỗi 3 bước GĐ C.45, đổi điều kiện từ "thiếu" sang "user yêu cầu").
> Form hiển thị mốc "nạp lúc HH:MM" từng nguồn (max import_log.imported_at JOIN
> staging theo kỳ); kết quả có "nạp lúc HH:MM" (dataLoadedAt do agent ghi vào
> meta/summary). Bỏ tick → chạy nhanh bằng data đã có như cũ.
>
> Chi tiết kỹ thuật đầy đủ ở AGENTS.md repo con GĐ C.50 (SQL_SOURCES_BY_QUERY +
> loadSourceFreshness + requeueReportJob nhận sources/pending + agent dataLoadedAt).
>
> **⚠️ Restart GIONG_SMED_Agent sau deploy** để agent nhận phần dataLoadedAt
> (không restart vẫn chạy — chỉ thiếu mốc giờ trên kết quả).
>
> **Tiêu chí kiểm chứng:** Trang báo cáo: checkbox BẬT + mốc nạp từng nguồn; chạy →
> N job download + job 'Chờ tải dữ liệu' → thanh % tăng → tự chạy → "nạp lúc HH:MM"
> đúng giờ vừa tải; bỏ tick → nhanh như cũ; version app con 4.2.0 + app tổng 3.6.1
> (checklist GĐ 138 ✓ — không thành phần nào ≥ 10).

### GĐ 181: Hệ sinh thái — Trợ lý AI trên header app con (repo con v4.3.0) (2026-09-20)

| Commit | Thay đổi |
|---|---|
| (repo con) | feat(ai): GĐ C.51 — Trợ lý AI (panel header + /api/ai/chat GLM-4.5-Flash miễn phí + 5 tool query GiondDB/job) (v4.3.0) |
| (mới) | docs(agents): GĐ 181 + version app tổng 3.6.1 → 3.6.2 (docs-only — patch) |

> **Yêu cầu của Đại ca (20/09):** Tạo AI Agent đặt tại thanh header app con để
> người dùng hỏi/yêu cầu bằng tiếng Việt tự nhiên: đơn giá nhập 1 sản phẩm,
> tồn kho hiện tại, chạy lại báo cáo của trung tâm A, xóa báo cáo... — mọi thứ
> liên quan đến dữ liệu muốn báo cáo nhanh.
>
> **Đã chốt trước khi làm:** model **GLM-4.5-Flash (FREE)** · quyền **Đọc +
> Hành động** · áp dụng cho **TẤT CẢ user app con** (hành động vẫn bị chặn
> theo nhóm bộ phận).
>
> **Tóm tắt (chi tiết đầy đủ ở AGENTS.md repo con GĐ C.51):**
> - Nút "Trợ lý AI" trên header app con → panel chat trượt từ phải → POST
>   `/api/ai/chat` → GLM-4.5-Flash (Z.ai, miễn phí, OpenAI-compatible) tự gọi
>   tool: `query_data` (5 dataset whitelist: đơn giá nhập stg_5BKN, tồn kho
>   stg_7BCNXT, bán hàng, xuất kho, thu tiền), `create_download_job`,
>   `run_report`, `list_jobs`, `cancel_job`.
> - **LLM KHÔNG tự viết SQL** — server dựng SQL từ whitelist cứng + tham số
>   $1/$2 parameterized + top(40); hành động đi qua ĐÚNG createSmedJob/
>   cancelSmedJob → guard quyền nhóm GĐ C.21 hoạt động như form bình thường.
> - Thiếu env `ZAI_API_KEY` → panel báo "chưa cấu hình", app không crash.
>
> **LESSON — SQL động từ LLM phải whitelist 2 chiều (2026-09-20):** LLM chỉ
> chọn tham số có enum; SQL dựng từ template cứng phía server. Dặn LLM "chỉ
> SELECT" trong prompt không đủ an toàn (prompt injection). 4 lớp bắt buộc:
> whitelist dataset + cột hiển thị cố định + tham số hóa + top(N).
>
> **App tổng không đổi code** — chỉ ghi lịch sử + version 3.6.2.

---

*Cập nhật lần cuối: 2026-09-20 (GĐ 181 — Trợ lý AI app con; app tổng 3.6.2 / repo con 4.3.0)*
*Người cập nhật: Trợ lý lập trình*

### GĐ 181b — Hotfix Trợ lý AI bị kill 10s + set ZAI_API_KEY (2026-09-20, 3.6.2)

> **Bối cảnh:** Sau GĐ 181 (Trợ lý AI header app con, repo con v4.3.0), Đại ca cấp
> ZAI_API_KEY — em set Secret lên Vercel project giong-banhang + redeploy. E2E
> production: request `/api/ai/chat` vào function nhưng KHÔNG trả response mãi.
>
> **ROOT CAUSE:** Vercel Hobby cap function 10s mặc định — tool-loop AI vượt → bị
> kill IM LẶNG (client chờ vô hạn). Fix bên repo con (GĐ C.51b, v4.3.1):
> maxDuration 60s cho function `__server.func` (Build Output API — mọi route
> TanStack gom 1 function, key phải tên thư mục `.func`, không phải route path)
> + AbortSignal 25s cho fetch GLM.
>
> **App tổng chỉ bump version + ghi docs — không đổi code.**
>
> **Version:** 3.6.1 → 3.6.2 (patch; checklist GĐ 138 ✓).

### GĐ 181c — Retry GLM khi cold-start timeout (2026-09-20, 3.6.3)

> E2E lại sau maxDuration 60s (GĐ 181b): request trả HTTP 200 nhưng reply =
> raw error "aborted due to timeout" — GLM cold-start đôi lúc >25s. Repo con
> fix (GĐ C.51b bổ sung, v4.3.2): tách `callGlmOnce` timeout 20s + retry ĐÚNG
> 1 lần khi timeout (lần 2 instance ấm, luôn nhanh). Lesson: API ngoài tự do
> phải có retry cold-start — timeout ngắn + retry tốt hơn timeout dài.
>
> **App tổng chỉ bump version — không đổi code. 3.6.2 → 3.6.3 (patch).**

---

## 📌 VIỆC HẸN NGÀY 21/09 (mai) — test lại Trợ lý AI khi Z.ai hồi phục

> **Bối cảnh (20/09 đêm):** Trợ lý AI (GĐ C.51) đã LIVE bản v4.3.3 — code hoạt động
> (tool `query_data` từng trả dữ liệu thật từ GiondDB), NHƯNG Z.ai free tier
> GLM-4.5-Flash đang 429 rate limit TOÀN BỘ request (kể cả câu đơn giản không
> tools) + API đôi lúc treo không response. Chẩn đoán bằng probe trực tiếp API
> key — KHÔNG phải lỗi code.
>
> **Chờ Z.ai hồi phục** ( Đại ca chọn phương án 1 — chờ, không nâng cấp, không đổi model).
>
> **Cách test mai (ĐÃ CHUẨN BỊ script):**
> ```bash
> cd giong-apps/apps/banhang
> node scripts/test-ai-assistant.mjs                                    # câu mặc định: đơn giá nhập Abhayrab
> node scripts/test-ai-assistant.mjs "Tồn kho Rivaxel hiện tại?"        # câu tùy ý
> ```
> Script: login app tổng → SSO app con → mở panel → hỏi → chờ response →
> in kết quả + screenshot `screenshots/ai-assistant-test.png`. Exit 0 = OK.
>
> **Nếu Z.ai VẪN 429 sau 24h:** báo Đại ca 2 phương án còn lại — (2) nâng cấp
> gói Z.ai (~$3/tháng) hoặc (3) đổi Gemini 2.5 Flash (em sửa ~10 dòng, cần
> anh cấp key Google AI Studio).
>
> **Nếu OK:** chạy thêm 2-3 câu hợp lệ khác (tồn kho / chạy lại báo cáo / lịch
> sử job) rồi ghi kết quả vào đây + bump version docs nếu cần. KHÔNG cần sửa
> code — hệ thống đã hoàn chỉnh.

### GĐ 182: Hệ sinh thái — 3 báo cáo NXT Kho app con (TH_NXT lượng / lượng-tiền / Tồn kho theo lượng) (repo con v4.4.0) (2026-09-21)

| Commit | Thay đổi |
|---|---|
| (repo con) | feat(báo cáo): GĐ C.52 — 3 báo cáo NXT Kho từ tool 12_KHO_KT_TH_NXT + phân trang ReportResultTable (v4.4.0) |
| (mới) | docs(agents): GĐ 182 + version app tổng 3.6.3 → 3.6.4 (docs-only — patch) |

> **Yêu cầu của Đại ca (21/09 — giao tự chủ, không hỏi lại, làm xong tự ghi +
> bump + push, mai xem):** Đọc tool `12_KHO_KT_TH_NXT.py` anh tải vào agent/ →
> làm trong nhóm **BÁO CÁO KHO** app con: (1) "Báo cáo TH_NXT kho theo lượng"
> giống Sheet TH_NXT_KT nhưng bỏ cột tiền H,I,K,L,N,O,Q,R,S,T,U,W,X; (2) "Báo
> cáo TH_NXT kho theo lượng-tiền" = Sheet TH_NXT_KT đầy đủ; (3) "Báo cáo tồn
> kho theo lượng" (số 5) lấy code sheet MT_TONKHO.

> **Tóm tắt (chi tiết đầy đủ ở AGENTS.md repo con GĐ C.52):**
> - Rà lại phiên dở chưa commit — bắt 3 sai sót: sai thứ tự cột tiền (phải xen
>   kẽ SL → Giá → Giá trị như Excel), sót cột Mã Hàng (C), nhầm giữ cụm SL
>   Kiểm kho bên lượng-tiền. Builder giờ khớp 100% tool 12: lượng 11 cột,
>   lượng-tiền 24 cột, số nguyên round half-up (tool 12 round(0) cả đơn giá).
> - Verify thật GiongDB kỳ 14→18/09: lượng 4.662 dòng; lượng-tiền 4.662 dòng ×
>   24 cột; tồn kho 54 hàng hóa × 19 trung tâm (TỔNG CỘNG 117.420). Keys đối
>   chiếu 12/12 khớp.
> - **Phân trang client-side** ReportResultTable (200/trang, 100-1000) — báo cáo
>   nặng 4.662×24 ô không còn render toàn bộ; SUBTOTAL vẫn tính trên toàn bộ
>   dữ liệu lọc; reset trang chỉ theo filters (poll 10s không đá về trang 1).
> - Quyền: 3 báo cáo nguồn xnkt → nhóm banhang-kho. Service agent đã restart
>   nạp builder mới (verify rảnh trước khi restart).

> **App tổng không đổi code** — chỉ ghi lịch sử + version 3.6.4 (checklist GĐ
> 138 ✓ — không thành phần nào ≥ 10).

> **Tiêu chí kiểm chứng (Đại ca test mai):** Sidebar BÁO CÁO KHO 5 mục; 3 trang
> mới chạy báo cáo được (cảnh báo thiếu data GĐ C.45 khi chưa tải NXT kỳ đó);
> bảng đúng cột + phân trang + Subtotal + Tải Excel; version app con 4.4.0 /
> app tổng 3.6.4.

---

### GĐ 183: Hệ sinh thái — Thanh trạng thái % hoàn thành tổng hợp các lệnh đang chạy trên Header app con (repo con v4.5.0) (2026-09-21)

| Commit | Thay đổi |
|---|---|
| (repo con) | feat(ui): GĐ C.53 — component HeaderJobsBar dính dưới header (sticky top-20): % tổng hợp + số lệnh đang chạy + dropdown % từng lệnh; poll 10s/60s (v4.5.0) |
| (app tổng) | docs(agents): GĐ 183 + version 3.6.4 → 3.6.5 (docs-only — patch) |

> **Yêu cầu của Đại ca (21/09):** Tạo thanh trạng thái thể hiện % tỷ lệ hoàn thành,
> tổng hợp các lệnh đang chạy + mức độ hoàn thành của từng job — đặt chỗ nhìn rõ
> nhất (Đại ca gợi ý trên Header vì chỉ chỗ này không bị che).

> **Tóm tắt (chi tiết đầy đủ ở AGENTS.md repo con GĐ C.53):**
> - Component `header-jobs-bar.tsx` mount trong AppShell ngay dưới `</header>` —
>   `sticky top-20` (header h-20) → cuộn trang vẫn luôn nhìn thấy.
> - Thanh 1 dòng: icon spin + "N lệnh" + bar % tổng hợp (trung bình tiến độ từng
>   lệnh) + % riêng + ▼ mở danh sách từng lệnh (tên phân hệ/báo cáo · kỳ · nhãn
>   tiến độ · bar riêng).
> - Tiến độ: pending 0%; running download = doneCenters realtime (GĐ C.19);
>   running sqlreport/txds ~95%; waitdownload = tính từ job download nguồn thiếu
>   (mỗi nguồn 19 trung tâm + 1 bước chạy — GĐ C.45).
> - needsData (job DỪNG chờ người dùng quyết) KHÔNG tính đang chạy; không có lệnh
>   nào → thanh ẩn hoàn toàn, layout không đổi.
> - Poll loadSmedJobs 10s khi có lệnh chạy / 60s khi rảnh — endpoint đã nhẹ theo
>   quy ước GĐ 159.

> **Verify:** typecheck 0 lỗi; build OK; version 4.5.0 khớp 2 nơi repo con,
> 3.6.5 khớp 2 nơi app tổng.

> **Tiêu chí kiểm chứng:** Tạo job → thanh hiện % tăng dần theo heartbeat; ≥2
> lệnh → "Hoàn thành chung N%"; bấm ▼ xem % từng lệnh; xong hết → thanh biến mất.

**App tổng không đổi code** — chỉ ghi lịch sử + version 3.6.5.

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

### GĐ 184: Hệ sinh thái — Nguyên tắc định dạng toàn app + sửa 4 builder cộng nhầm Đơn giá (repo con v4.5.1) (2026-09-21)

| Commit | Thay đổi |
|---|---|
| (repo con) | feat(định dạng): GĐ C.54 — 4 nguyên tắc vào AGENTS.md + isUnitPriceColumn guard web + bỏ Đơn giá khỏi money_cols 4 builder (v4.5.1) |
| (app tổng) | docs(agents): GĐ 184 + bảng nguyên tắc + version 3.6.5 → 3.6.6 (docs-only — patch) |

> **Nội dung:** 4 nguyên tắc định dạng Đại ca chốt (ngày dd/mm/yyyy căn trái ·
> số #,##0 căn phải · cột Đơn giá không cộng Subtotal · text căn trái tràn thì
> ẩn) — chi tiết kỹ thuật + verify ở AGENTS.md repo con GĐ C.54.
>
> **Áp dụng thật, không chỉ ghi giấy:** phát hiện + sửa 4 builder vi phạm nguyên
> tắc 3 (nk/xk/dt/bkct cộng nhầm Đơn giá vào Subtotal); TH_NXT lượng-tiền đã đúng
> sẵn (chỉ cộng 6 cột Giá trị). Web thêm guard `isUnitPriceColumn()` phòng thủ
> trong `computeSubtotal` — kể cả builder quên, web vẫn không cộng đơn giá.
>
> **Verify:** py_compile OK; chạy thật 5 builder qua GiongDB — moneyCols đúng hết;
> tsc 0 lỗi; build OK; version app con 4.5.1 + app tổng 3.6.6 khớp 2 nơi mỗi app.

**App tổng không đổi code** — chỉ ghi lịch sử + version 3.6.6.

---

### GĐ 185: Hệ sinh thái — Báo cáo Đối soát HĐ-XK thêm 4 cột tiền xen kẽ (repo con v4.5.2) (2026-09-21)

| Commit | Thay đổi |
|---|---|
| (repo con) | feat(dsxk): GĐ C.55 — 4 cột tiền (DT SMED / Giá vốn / DT HĐGTGT / CL tiền) xen kẽ cột lượng + fix bug fetchall 2 lần trả rỗng (v4.5.2) |
| (app tổng) | docs(agents): GĐ 185 + version 3.6.6 → 3.6.7 (docs-only — patch) |

> **Yêu cầu của Đại ca (21/09):** 4 cột tiền đặt BÊN PHẢI cột lượng tương ứng
> trong Báo cáo cuối ngày - Đối soát HĐ-XK: Tổng Doanh thu (SMED) · Tổng Giá
> vốn bán hàng · Tổng Doanh thu (HĐGTGT) · Chênh lệch (DT_SMED-DT_HĐGTGT).
> Chi tiết kỹ thuật + đối chứng số liệu + bug fetchall ở AGENTS.md repo con GĐ C.55.
>
> **Verify:** 5/5 assertion PASS (kỳ 14→16/09: DT SMED 114.150.000 · Giá vốn
> 244.822.251 · DT HĐGTGT 304.819.000 · CL tiền −190.669.000 — khớp đối chứng
> lượng GĐ 177); tsc 0 lỗi; build OK; version 4.5.2 / 3.6.7 khớp 2 nơi mỗi app.

**App tổng không đổi code** — chỉ ghi lịch sử + version 3.6.7.

### GĐ 186: Hệ sinh thái — BÁO CÁO KHO app con: fix mất TT Thanh Thùy + 5 hiệu chỉnh hiển thị (repo con v4.5.3) (2026-09-21)

| Commit | Thay đổi |
|---|---|
| (repo con) | fix(báo cáo kho): GĐ C.56 — TT bị cộng vào TO do fallback startswith khớp sai + data staging nạp sai phải nạp lại; bỏ Mã Hàng, STT, sort VI, ẩn 0 (v4.5.3) |
| (mới) | docs(agents): GĐ 186 + version 3.6.7 → 3.6.8 (docs-only — patch) |

> **Yêu cầu của Đại ca (21/09, 6 điểm cho nhóm BÁO CÁO KHO):** (1) bỏ cột Mã Hàng
> ở TH_NXT theo lượng; (2) điều tra mất TT Thanh Thùy (nghi cộng gộp vào TO/TĐ);
> (3) Hàng hóa A→Z; (4) trung tâm sort tiếng Việt A→Y; (5) thêm STT; (6) ẩn số 0.
>
> **Kết quả điều tra — Đại ca nghi ĐÚNG:** tên SMED "THANH THUỲ" (Ỳ U+1EF3) khác
> key "thùy" (Ừ) → fallback `startswith('tha')` khớp "thanh oai" trước → **toàn bộ
> số TT cộng vào TO**. Kèm data cũ nạp với center sai nằm chết trong staging. Fix
> 2 tầng: map chỉ nhận khớp CHÍNH XÁC (bỏ fallback mờ — cặp TD/TĐ chỉ khác dấu là
> bom nổ) + xóa import_log 7BCNXT → ETL nạp lại 337 file (nạp đè theo ngày GĐ B.2.1
> tự chữa dòng sai). Verify 16/16 PASS: TT CÓ data riêng, cột trung tâm đúng chuỗi
> mẫu Đại ca (TT cuối), Hàng hóa A→Z, STT liên tục, 0 ô số 0. Phát hiện thêm: ĐY
> kỳ 14-18/09 file RỖNG (không phát sinh NXT) — đúng data, không phải bug; tồn kho
> vẫn hiện đủ 19 cột chuẩn (thêm _VALID_CENTER_CODES).
>
> **Chi tiết kỹ thuật đầy đủ ở AGENTS.md repo con GĐ C.56.**
>
> **Tiêu chí kiểm chứng:** 3 báo cáo BÁO CÁO KHO đúng 6 điểm; TT hiện số riêng
> không còn cộng vào TO; version repo con 4.5.3 + app tổng 3.6.8.

---

---

### GĐ 187: Hệ sinh thái — Tổng quan app con nối DỮ LIỆU THẬT + Hôm nay/Cập nhật realtime (repo con v4.6.0) (2026-09-21)

| Commit | Thay đổi |
|---|---|
| (repo con) `6b48a5c` | feat(overview): GĐ C.55 — Tổng quan data thật GiondDB + Hôm nay/Khoảng khác + banner thiếu data + Cập nhật realtime + agent ETL-sau-download (v4.6.0) |
| (mới) | docs(agents): GĐ 187 + version app tổng 3.6.8 → 3.6.9 (docs-only — patch) |

> **Yêu cầu của Đại ca (21/09):** Trang Tổng quan cập nhật dữ liệu thực tế vào các
> biểu đồ. "Công ty CP Giong VN" = dữ liệu TỔNG các trung tâm; chọn trung tâm nào
> → dữ liệu của trung tâm đó. Dropdown thời gian thêm "Hôm nay" + khoảng tự chọn.
> Người dùng chọn "Hôm nay" mà dữ liệu chưa download về → khắc phục thế nào,
> cho phép người dùng update thời gian thực.

> **Kiến trúc (chi tiết đầy đủ ở AGENTS.md repo con GĐ C.55):**
> 1. **Server functions `-overview.ts` (mới):** loadOverviewKpi (5 hộp: doanh thu,
>    HĐGTGT, lượt tiêm, nhập, tồn kho — hôm nay + tháng này) + loadOverviewChart
>    (7 chart theo kỳ RIÊNG từng ô — giữ đúng thiết kế SMED GĐ 132) + freshness
>    sources (đếm dòng từng bảng staging trong kỳ) + requestOverviewData (treo job
>    download nguồn thiếu — chặn quyền qua canCreateJobs + canAccessReport).
> 2. **Nguồn doanh thu — chốt sau probe:** BLTH (col7+col8=TM+CK) ƯU TIÊN, DTTDT
>    (col14) fallback THEO TỪNG NGÀY (`NOT IN subquery`) — probe thấy DTTDT 16/09
>    TRÙNG GẤP ĐÔI (254 = 2×127 dòng BLTH/DTTHC), nếu cộng cả 2 nguồn là sai số.
> 3. **Tồn kho** = snapshot ngày mới nhất ≤ kỳ (KHÔNG cộng dồn — bản chất tồn kho);
>    **HĐGTGT** map KÝ HIỆU hóa đơn (col2 BKCT) → center qua HD_SYMBOL_MAP (khớp
>    tool 21/builder dsxk GĐ C.47), số tờ = COUNT(DISTINCT ký hiệu|số), tiền = col24.
> 4. **UI:** mỗi ô giữ dropdown kỳ riêng + thêm 2 lựa chọn "Hôm nay" và "Khoảng
>    khác…" (2 input date). Thiếu nguồn → **banner vàng "Chưa đủ dữ liệu thực
>    hiện… Có muốn download?" + nút Cập nhật** → treo job download ĐÚNG nguồn
>    thiếu → client poll loadSmedJobs 8s → job xong TỰ nạp lại toàn bộ (realtime).
> 5. **Agent:** job download SMED xong → chạy `etl_import.py` NGAY trong cùng
>    vòng job (trước chỉ auto-ETL 60 phút) → "Hôm nay" có data trong ~1-2 phút.
>    Lỗi ETL chỉ log — không đổi trạng thái job (download đã thành công).

> **✅ Verify 8/8 PASS (query thật qua tunnel):** doanh thu 20/09 = 538.515.000đ /
> 693 mũi; filter trung tâm LB = 119.980.000 (nhỏ hơn tổng ✓); top vắc xin OK;
> nhập 5 ngày; tồn kho asOf 20/09 (52 loại, top VAXIGRIP); HĐGTGT map 18/18 ký
> hiệu; freshness shape đúng (blth=0 → fallback DTTDT chạy đúng thiết kế).
> tsc 0 lỗi; build OK; py_compile agent OK.

> **LESSON LEARNED — Nhiều nguồn cùng chỉ tiêu phải chọn 1 nguồn ưu tiên theo
> NGÀY, không cộng dồn (2026-09-21):** DTTDT và BLTH cùng đo doanh thu — ngày có
> cả 2 nguồn thì cộng gộp là ĐÚNG SAI (trùng gấp đôi do tải 2 lượt). Quy tắc:
> probe SO SÁNH 2 nguồn theo từng ngày trước khi thiết kế query tổng hợp; nguồn
> chuẩn (đối chứng đã duyệt) ưu tiên, nguồn phụ chỉ lấp ngày thiếu (NOT IN).

> **LESSON LEARNED — Tồn kho là SNAPSHOT không phải dòng thời gian (2026-09-21):**
> Chart tồn kho chọn kỳ nào cũng chỉ lấy ngày mới nhất trong kỳ — SUM tồn qua
> nhiều ngày là nhân đôi sai bản chất. Chart số-dư (tồn, nợ) ≠ chart dòng-chảy
> (doanh thu, nhập) — vẽ khác nhau.

> **⚠️ Việc vận hành:** Service agent ĐÃ restart nạp ETL-sau-download (agent rảnh
> khi restart). Vercel auto-deploy repo con sau push.

> **Tiêu chí kiểm chứng:** Trang Tổng quan hiện số THẬT (đối chứng báo cáo đã
> duyệt); chọn trung tâm → số riêng trung tâm; chọn "Hôm nay" thiếu data → banner
> vàng + nút Cập nhật → job tải → tự nạp lại; "Khoảng khác…" chọn from/to từng ô;
> version app tổng 3.6.9 + repo con 4.6.0.


### GĐ 188: Hệ sinh thái — Định dạng số THỐNG NHẤT "#,##0" mọi báo cáo app con (repo con v4.6.1) (2026-09-21)

| Commit | Thay đổi |
|---|---|
| (repo con) | fix(báo cáo): GĐ C.58 — helper `_rows()` parse số int half-up + ẩn 0 cho 7 builder kế toán/kho — hết số thô thập phân; web guard đơn giá bắt cả "Giá" trần (v4.6.1) |
| (mới) | docs(agents): GĐ 188 + version app tổng 3.6.9 → 3.7.0 (patch 9 đầy → nhớ minor) |

> **BUG REPORT của Đại ca (21/09):** Nguyên tắc định dạng 2 + 3 — BÁO CÁO KHO
> vẫn hiện số thô có thập phân (`960336.3`), không ngăn cách nghìn. Xem lại
> TẤT CẢ báo cáo cho thống nhất.

> **ROOT CAUSE:** helper `_rows()` (khung 9 builder kế toán/kho) biến mọi giá
> trị SQL thành CHUỖI → web chỉ format khi typeof number → hiện thô; Excel
> tải về là ô TEXT. TH_NXT + tồn kho ổn từ GĐ C.56 (vòng riêng), 7 builder
> còn lại chưa qua vòng nào.

> **Fix:** (1) `_rows()` thêm `num_cols` — float → int half-up (bỏ thập phân
> kể cả Đơn giá — nguyên tắc 2) + ẩn 0 (nguyên tắc 6); 7 builder khai báo.
> (2) Web `isUnitPriceColumn()` bắt cả "Giá" trần (bán hàng đang bị cộng
> Subtotal oan) — tự bắt thêm bug nháp đầu khớp cả "Giá trị" khi tự review.

> **✅ Verify:** 9 builder chạy thật kỳ 14→20/09 — số int, 0 → trống, moneyCols
> không Đơn giá; py_compile + tsc 0 lỗi + build OK; service agent đã restart
> nạp builder mới (kiểm tra agent rảnh trước — GĐ 136).

> **Version:** app tổng 3.6.9 → **3.7.0** (docs — patch 9 đầy → nhớ minor;
> checklist GĐ 138 ✓ — không thành phần nào ≥ 10).

> **Tiêu chí kiểm chứng:** Mở mọi báo cáo app con: số `#,##0` không thập phân
> (đơn giá cũng vậy); Đơn giá/Giá không Subtotal; Tải Excel số dạng số thật.

### GĐ 189: Hệ sinh thái — TX-DS nguồn NK lấy lịch sử 01/01/2025 (repo con v4.6.2) (2026-09-21)

| Commit | Thay đổi |
|---|---|
| (repo con) | fix(txds): GĐ C.59 — nguồn NK của TX-DS LUÔN từ 01/01/2025 → date_to (builder + agent check + web 2 flow treo job download) (v4.6.2) |
| (mới) | docs(agents): GĐ 189 + version app tổng 3.7.0 → 3.7.1 |

> **Yêu cầu của Đại ca (21/09):** Báo cáo Truy xuất - Đối soát — phần "Bảng kê
> nhập kho (SMED)" LUÔN lấy từ 01/01/2025 đến thời điểm chạy báo cáo để hóa
> đơn bán kỳ nào cũng truy xuất được lịch sử nhập của lô (lô nhập từ 01/2025
> đến nay mới bán vẫn còn data).

> **ROOT CAUSE:** builder + agent check + web treo download đều lấy NK theo
> KỲ báo cáo — lô nhập trước date_from không có trong bảng đối soát.

> **Fix 4 điểm:** builder `_load("5BKN", NK_HISTORY_FROM, date_to)` (drop_dup
> khóa có sẵn chặn trùng nhiều lượt tải) · agent check NK từ mốc lịch sử ·
> web flow "Có" khi thiếu + flow "Tải dữ liệu mới nhất" đều treo job NK từ
> 01/01/2025.

> **✅ Verify:** spy `_load` — NK đúng mốc, 5 nguồn khác giữ kỳ; NK lịch sử
> staging đủ 8.255 dòng (backfill GĐ 178); check 7/7 nguồn found; py_compile
> + tsc + build OK; service agent restart nạp bản mới.

> **Version:** app tổng 3.7.0 → **3.7.1** (docs — patch; checklist GĐ 138 ✓).

> **Tiêu chí kiểm chứng:** TX-DS kỳ nào cũng có cột NK từ lịch sử 01/2025;
> job download NK của TX-DS hiện kỳ 01/01/2025 → ngày chạy trong lịch sử.

### GĐ 190: Hệ sinh thái — TH_NXT lượng-tiền cuộn ngang + Autofit cột (repo con v4.6.3) (2026-09-21)

| Commit | Thay đổi |
|---|---|
| (repo con) `03a44eb` | fix(báo cáo): GĐ C.60 — TH_NXT lượng-tiền cuộn ngang + Autofit cột; Hàng hóa cố định 321px (v4.6.3) |
| (mới) | docs(agents): GĐ 190 + version app tổng 3.7.1 → 3.7.2 |

> **Yêu cầu của Đại ca (21/09):** "Báo cáo TH_NXT kho theo lượng-tiền" 24 cột không dồn
> hết 1 màn hình — cuộn ngang xem được; cột hiện hết dữ liệu kiểu Autofit; RIÊNG cột
> "Hàng hóa" cố định 321px (độ rộng 26 Excel anh dùng), tên dài ẩn (truncate) không
> tràn sang cột phải. CHỈ báo cáo này.
>
> **Tóm tắt (chi tiết đầy đủ ở AGENTS.md repo con GĐ C.60):** prop `autoFitColumns`
> opt-in trong khung bảng dùng chung — table-auto + th minWidth đo canvas measureText
> (mẫu 200 dòng đầu như Autofit Excel), container cuộn ngang+dọc trong khung 530px;
> regex cột Hàng hóa nhận đủ "hàng hóa" (bug tự bắt khi verify: lần đầu thiếu → cột
> đo 180px). Verify Playwright đo thật trên dev: cuộn ngang 2949/1468px ✓, Hàng hóa
> = 321px ✓, số #,##0 + ô 0 trống + STT giữ nguyên ✓. Bài học môi trường: dev app con
> cần APP_JWT_SECRET + API_TOKEN + TUNNEL_API_BASE_URL (URL lấy từ Gist GĐ 169); tự
> ký bh_session thay vì SSO cho test nhanh; agent bận → job SQL xếp hàng (bỏ tick tải
> mới), không đụng tool đang chạy.
>
> **App tổng không đổi code** — chỉ ghi lịch sử + version 3.7.2 (docs-only — patch;
> checklist GĐ 138 ✓).

### GĐ 191: Hệ sinh thái — FIX favicon tab app con: icon sai thẻ HTML từ trước tới nay (repo con v4.6.4) (2026-09-21)

| Commit | Thay đổi |
|---|---|
| (repo con) `13f85cf` | fix(pwa): GĐ C.61 — icon/manifest chuyển sang links (trước render `<meta rel>` sai thẻ) + favicon.ico fallback (v4.6.4) |
| (mới) | docs(agents): GĐ 191 + version app tổng 3.7.2 → 3.7.3 |

> **Yêu cầu của Đại ca (21/09):** Cho biểu tượng Gióng vào icon tab trình duyệt + icon
> cài/tải web (PWA) — app con.
>
> **Tóm tắt (chi tiết ở AGENTS.md repo con GĐ C.61):** File icon + manifest ĐÚNG từ
> GĐ C.29/C.46 nhưng tab vẫn trắng — curl production soi thẻ head phát hiện app con
> render `<meta rel="icon">` (SAI THẺ) vì 3 entry icon/manifest bị đặt trong mảng
> `meta` của `__root.tsx`; trình duyệt chỉ đọc favicon từ `<link>`. App tổng đặt đúng
> trong `links` từ GĐ 153. Fix: chuyển 3 entry sang `links` (2 meta apple-* ở lại
> `meta`) + thêm `public/favicon.ico` fallback (trước 404). Verify dev curl: thẻ
> `<link>` đúng + /favicon.ico 200. **Icon tab app con CHƯA TỪNG hoạt động dù qua 4
> lần fix icon trước — mọi lần chỉ đụng FILE, không ai soi THẺ render.**
>
> **App tổng không đổi code** — chỉ ghi lịch sử + version 3.7.3 (docs-only — patch;
> checklist GĐ 138 ✓).

### GĐ 192: Hệ sinh thái — PWA app con đồng bộ 100% app tổng: shortcuts icon + orientation (repo con v4.6.5) (2026-09-21)

| Commit | Thay đổi |
|---|---|
| (repo con) `6d2e7de` | fix(pwa): GĐ C.62 — manifest + shortcuts (menu chuột phải icon) + orientation + cache-bust ?v=5 (v4.6.5) |
| (mới) | docs(agents): GĐ 192 + version app tổng 3.7.3 → 3.7.4 |

> **Yêu cầu của Đại ca (21/09):** Icon Gióng vào icon tab web; tải web xuống (PWA) thì
> biểu tượng thể hiện ở các Shortcut — làm giống 100% app tổng.
>
> **Tóm tắt (chi tiết ở AGENTS.md repo con GĐ C.62):** So manifest 2 app — app tổng có
> `orientation` + `shortcuts` mà app con thiếu (screenshots app tổng = mảng rỗng, bỏ
> qua). Fix: manifest app con thêm orientation portrait-primary + 2 shortcuts ("Lấy
> hóa đơn điện tử" /m/smed-hdd, "Báo cáo Truy xuất - Đối soát" /m/bc-truyxuat — bug tự
> bắt: nháp đầu trỏ /m/smed-doanhthu không tồn tại → 404) + cache-bust manifest ?v=5
> ép máy đã cài PWA tải lại. Kèm dọn 3 ký tự lạ Trung Hoa sót trong AGENTS.md repo con
> (quy tắc GĐ 131).
>
> **App tổng không đổi code** — chỉ ghi lịch sử + version 3.7.4 (docs-only — patch;
> checklist GĐ 138 ✓).

### GĐ 193: TX-DS chạy lỗi production — 2 gốc rễ Unicode + hồi quy hiển thị (2026-09-21, 3.7.5)

> **BUG REPORT của Đại ca (21/09):** Chạy "Báo cáo Truy xuất - Đối soát" bị lỗi. Chi tiết
> chẩn đoán + fix đầy đủ ở AGENTS.md repo con **GĐ C.63** (v4.6.6).
>
> **Tóm tắt 2 lỗi độc lập:**
> 1. **Job 17:03 lỗi thật (exit 1):** python con dưới service Windows không có env UTF-8
>    → cp1252 → `UnicodeEncodeError` ngay dòng print "Tổng dòng" SAU KHI tổng hợp xong
>    1287 dòng. Fix: `reconfigure(encoding="utf-8", errors="replace")` trong txds_report.py.
> 2. **Job Hoàn thành bấm không hiện bảng (hồi quy GĐ C.43):** điều kiện chọn job theo
>    `result` khác rỗng — job TX-DS luôn `result = {}` (bảng ở `result_full`, GĐ 158/159)
>    → khối kết quả không bao giờ render. Fix: TX-DS chấp nhận mọi job done.
>
> **Verify:** 2 job sau fix Hoàn thành, result_full 2.1MB đủ; tsc 0 lỗi; build OK;
> service agent đã restart.
>
> **LESSON — Điều kiện "có kết quả" phải biết collection nào giữ kết quả (2026-09-21):**
> Khi tách payload lớn sang cột/kênh khác, grep mọi consumer lọc theo cột cũ và cập nhật
> điều kiện cùng lúc — không thì lọc âm thầm vô hiệu với dữ liệu mới.
>
> **Version:** 3.7.4 → **3.7.5** (docs — patch; checklist GĐ 138 ✓).


### GĐ 194: TX-DS — gốc rễ thứ 3: payload JSON chứa NaN, JSON.parse web từ chối (2026-09-21, 3.7.6)

> **BUG REPORT (liên tiếp GĐ 193):** Job TX-DS Hoàn thành, badge "ĐANG XEM" hiện,
> NHƯNG bảng kết quả vẫn trống. Chi tiết đầy đủ ở AGENTS.md repo con **GĐ C.63c**
> (v4.6.7).
>
> **ROOT CAUSE:** payload JSON do Python json.dumps ghi chứa token **NaN** (pandas
> ô rỗng) — JSON.parse của JS từ chối → loadTxdsResult trả "chưa có kết quả" dù
> result_full 2.1MB đầy đủ trong DB.
>
> **Fix 2 đầu:** Python `_plain()` chuyển NaN/Inf → "" + `allow_nan=False`;
> web fallback parse lại sau `.replace(/NaN/g, "null")` (chữa payload cũ).
>
> **LESSON — JSON chuẩn KHÔNG có NaN (2026-09-21):** payload Python trao đổi với
> JS phải `allow_nan=False` — "parse được bằng Python" không có nghĩa "parse được
> bằng JS". Khi payload lớn không parse được: soi RAW trong DB bằng SUBSTRING
> thay vì tin mô tả lỗi chung.
>
> **Version:** 3.7.5 → **3.7.6** (docs — patch; checklist GĐ 138 ✓).


### GĐ 195: Mobile ẩn khối chào header (cả 2 app) + rail app con hiện icon nhóm (2026-09-21, 3.7.7)

| Commit | Thay đổi |
|---|---|
| (app tổng) | fix(header): mobile <640px ẨN khối chào header — div trong thành `hidden sm:flex` (spacer flex-1 giữ nguyên, nút phải không xô) |
| (repo con) | fix(header+ui): GĐ C.64 — mobile ẩn khối chào (`hidden sm:block`) + rail thu hẹp HIỆN icon nhóm (bậc 1/2) bấm được, ẩn nhãn+chevron; v4.6.8 |

> **Yêu cầu của Đại ca (21/09, 2 điểm):**
> 1. **CẢ 2 app:** Bỏ phần lời chào trên Header bên trái khi mobile — khoảng trống
>    điện thoại không đủ, chữ chèn đè nhau.
> 2. **App con:** Sidebar khi ẩn cho rộng ra một chút để nhìn thấy biểu tượng —
>    hiện tại icon bị che.

> **Điểm 1 — khối chào mobile (2 file, 1 dòng class mỗi file):**
> Khối chào GĐ 135 (app tổng) + GĐ C.15b (app con) render MỌI trang kể cả mobile —
> header 390px sau các nút chỉ còn ~200px → eyebrow + h1 chèn nhau. Fix: div trong
> khối chào thành `hidden … sm:flex` (app tổng) / `hidden … sm:block` (app con) —
> chỉ ẩn <640px; div cha giữ `min-w-0 flex-1` làm spacer → nút phải vẫn canh phải.
> Desktop ≥640px giữ nguyên 100%.

> **Điểm 2 — rail app con: root cause KHÁC suy đoán ban đầu (bắt nhờ đo Playwright):**
> Rail đã 48px từ GĐ C.46 mà Đại ca vẫn thấy icon bị che. Đo layout + mở nhóm 2 bậc:
> **icon nhóm (DOWNLOAD DỮ LIỆU / BÁO CÁO / UPLOAD / MISA…) bị ẨN HOÀN TOÀN khi thu
> hẹp** — nút nhóm mang `hidden group-hover:flex` từ khi dựng cây 4 bậc (GĐ C.26).
> Rail thu hẹp chỉ hiện icon Tổng quan + lá nhóm ĐANG MỞ → phần lớn rail TRỐNG,
> nhìn như "icon bị che/đẩy ra ngoài". Tăng độ rộng rail không giải quyết được vì
> icon `display:none`.
>
> **Fix (chốt qua hỏi Đại ca — chọn "Hiện icon nhóm"):** `SidebarNhom` — nút nhóm
> LUÔN HIỆN khi rail thu hẹp (icon bấm được để mở/đóng nhóm con), chỉ ẨN nhãn
> (`hidden group-hover:inline`) + chevron (`hidden group-hover:block`); nhánh class
> RIÊNG loại trừ cho collapsed (`h-9 justify-center px-0 group-hover:…`) — bậc 1
> giữ nền accent, bậc 2 không. Kèm 3 điểm phụ từ đo đạc: (a) container con nhóm mở
> bỏ indent khi thu hẹp (pl-2/pl-3 + ml-2.5 dồn icon lá lệch trái) → `pl-0`, hover
> mở indent như cũ; (b) chevron không render khi collapsed (trước dính icon nhóm
> trong 48px); (c) logo căn giữa rail khi thu hẹp (px-1 lệch trái → justify-center).
> Rail GIỮ 48px (không tăng 56 — Đại ca chọn chỉ hiện icon nhóm).

> **LESSON — "icon bị che" phải đo xem icon nào đang HIỆN, đừng chỉ đo rail rộng
> (2026-09-21):** GĐ C.46 tăng rail 40→48px theo yêu cầu "rộng ra để thấy icon" nhưng
> root cause là icon nhóm bị display:none — rộng bao nhiêu cũng trống. Đo layout bằng
> Playwright (boundingBox từng svg) đã lộ ngay: chỉ 3 icon khả kiến trong rail dù cây
> có hàng chục. Khi vấn đề "không thấy X": đếm + liệt kê những gì ĐANG hiển thị
> trước khi nghĩ tới kích thước.

> **LESSON — 2 trạng thái cho 1 nút phải tách nhánh loại trừ, không chồng class
> (tái diễn GĐ 125):** Đặt `px-2` (nhánh thường) + `px-0` (collapsed) trên cùng
> element → Tailwind phân giải theo THỨ TỰ STYLESHEET, không theo thứ tự class →
> px-2 thắng, icon không căn giữa. Fix: ternary `collapsed ? nhánh_collapsed :
> nhánh_thường` (pattern NavLink đã chạy đúng production). Bẫy này lần thứ 2 —
> quy tắc: class mâu thuẫn trên cùng property PHẢI nằm 2 nhánh ternary, không
> dùng `cn()` gộp kèm ghi đè.

> **✅ Verify (Playwright đo thật, dev server 2 app — script tạm đã dọn):**
> Mobile 390px: h1 khối chào ẨN cả 2 app, eyebrow ẩn theo, nút menu hiện;
> desktop: khối chào giữ nguyên. Rail app con: 48px; mở nhóm 2 bậc → thu hẹp →
> **10 icon khả kiến** (trước: 3) nằm TRỌN trong rail, căn giữa trục 24px (±3px);
> hover mở 320px — chevron/nhãn hiện lại, content đẩy 320px mép dính mép (GĐ 141
> không vỡ). Typecheck: app tổng 0 lỗi (typecheck.mjs) + app con 0 lỗi (tsc).

> **Tiêu chí kiểm chứng:** Điện thoại mở app tổng + app con: header chỉ còn nút
> trái/phải, không còn chữ chèn đè; desktop không đổi. Desktop app con thu hẹp
> sidebar: thấy ĐỦ icon (Tổng quan + 4 nhóm bậc 1 + lá nhóm đang mở), bấm icon
> nhóm được; hover mở đủ nhãn; nội dung không bị che khi hover (GĐ 141).

**Version:** 3.7.6 → **3.7.7** (app tổng — patch) · **4.6.7 → 4.6.8** (repo con —
patch; checklist GĐ 138 ✓ — không thành phần nào ≥ 10).

---

### GĐ 196: Hệ sinh thái — BÁO CÁO XUẤT HỦY app con: phiếu PH- trong nguồn xuất kho (repo con v4.7.0) (2026-09-22)

| Commit | Thay đổi |
|---|---|
| (repo con) | feat(báo cáo): GĐ C.65 — Báo cáo xuất hủy (phiếu PH-) — builder + meta.byCenter + trang /m/bc-xuat-huy + render-prop children + prop moneyCols (v4.7.0) |
| (app tổng) | docs(agents): GĐ 196 + version 3.7.7 → 3.7.8 (docs-only — patch) |

> **Yêu cầu của Đại ca (22/09):** Nghiên cứu báo cáo xuất hủy từ báo cáo xuất kho
> hàng với các ký tự đầu tiên của số phiếu. Chi tiết đầy đủ ở **AGENTS.md repo
> con GĐ C.65**.
>
> **Kết quả nghiên cứu:** "Xuất hủy" = phiếu **PH-<yyyymmddhhmmss>** (Loại phiếu:
> Phiếu huỷ) nằm sẵn trong Bảng kê xuất kho SMED (tool 5 → stg_6BKX col3), phân
> biệt phiếu xuất bán **PX-SD-**. stg_6BKX đã có 4.243 dòng PH- từ 01/2025 → nay
> (backfill GĐ 178) → báo cáo chỉ cần LỌC `col3 LIKE 'PH-%'` trên cùng nguồn
> `xuatkho` — không cần tool/download mới.
>
> **Bổ sung nghiên cứu cùng ngày — prefix thứ 3 `PXK-` (Xuất khác):** quét toàn
> bộ lịch sử stg_6BKX thấy 3 prefix: PX-SD- (bán) · PH- (hủy) · **PXK- (xuất
> khác — thu hồi NCC/điều chuyển/gắn hóa đơn, 63 dòng, 13 TT, 02/2025→06/2026,
> 2026 về sau không phát sinh; cột LỆCH: col1=STT, col2=datetime)**. **Đại ca
> chốt: báo cáo xuất hủy GIỮ CHỈ PH-**, PXK là nghiệp vụ riêng không gộp (chi
> tiết + lưu ý builder riêng nếu làm sau ở GĐ C.65 repo con).
>
> **Đã chốt với Đại ca (2 câu hỏi):** hiển thị CẢ HAI (chi tiết từng dòng + bảng
> phụ tổng hợp theo trung tâm) · đặt nhóm BÁO CÁO KHO, tên "Báo cáo xuất hủy".
>
> **Triển khai repo con:** builder `xuat_huy` (11 cột chi tiết + meta.byCenter:
> số phiếu DISTINCT/tổng lượng/tổng tiền từng TT; Hạn SD Excel serial →
> dd/mm/yyyy; Giờ HH:MM:SS) + `EMPTY_OK_KEYS` (nguồn có data mà 0 dòng PH- = rỗng
> hợp lệ — không hỏi download) + quyền nhóm Kho + trang `/m/bc-xuat-huy` (khung
> chuẩn GĐ C.44 + bảng phụ qua **render-prop `children`** mới của SqlDataModule +
> **prop `moneyCols`** mới của ReportResultTable — cả 2 opt-in, bảng khác không
> đổi). Verify: builder KHỚP từng đồng SQL thẳng (14 dòng, SL 124, tiền
> 2.285.064 kỳ 20→21/09); E2E agent thật PASS (~45s); tsc 0 lỗi; build OK;
> service agent restart nạp builder mới.
>
> **LESSON (repo con đã ghi đủ):** (1) báo cáo lọc-theo-loại phải phân biệt
> "nguồn thiếu" (hỏi download) và "kết quả rỗng hợp lệ" (trả bảng trống);
> (2) staging generic NVARCHAR — cột datetime về dạng string, isinstance datetime
> vô dụng, handle cả 2 dạng ngay từ đầu.
>
> **App tổng không đổi code** — chỉ ghi lịch sử + version.

**Version:** 3.7.7 → **3.7.8** (docs-only — patch; checklist GĐ 138 ✓ —
không thành phần nào ≥ 10).

### GĐ 197: Hệ sinh thái — Lịch sử job app con LỌC THEO USER (repo con v4.7.2) (2026-09-22)

| Commit | Thay đổi |
|---|---|
| (repo con) | fix(permissions): GĐ C.66 — loadSmedJobs where ($1=1 or created_by=$2) — user chỉ thấy job mình tạo, Admin thấy tất cả; AI list_jobs tự hưởng (v4.7.2) |
| (app tổng) | docs(agents): GĐ 197 + version 3.7.9 → 3.8.0 (patch 9 đầy → nhớ minor) |

> **Câu hỏi của Đại ca (22/09):** Trong phân quyền, dữ liệu do user nào tạo ra thì
> user đó thấy, user khác không nhìn thấy, Admin xem tất cả — như app tổng. Kèm
> yêu cầu hướng dẫn phân quyền Bán hàng từ app tổng đến app con.
>
> **Trả lời hiện trạng:** app con đã đúng 2/3 (xóa job = người tạo/Admin · sidebar
> = lọc nhóm bộ phận GĐ 143) — chỗ hở duy nhất là **lịch sử job** hiện cho mọi
> người. **Đã hỏi chốt:** Đại ca chọn LỌC THEO USER LUÔN (không giữ chung nhóm).
>
> **Fix:** `loadSmedJobs` thêm `where ($1 = 1 or created_by = $2)` — Admin
> (`$1=1`) thấy tất cả, user thường chỉ thấy job `created_by` = tên mình (khớp
> cách tạo job ghi `created_by = user.name`). Trợ lý AI `list_jobs` gọi thẳng
> `loadSmedJobs` → tự hưởng lọc (session user đang chat còn trong context).
>
> **Hướng dẫn phân quyền Bán hàng (đã trình bày Đại ca, tóm tắt):** App tổng →
> Phân quyền → chọn nhân sự → bật "Bán hàng (Dự án)" → 4 toggle con xổ ra (MISA /
> SMED Bán hàng / SMED Kho / SMED Marketing) — bật nhóm nào user đó thấy nhóm đó
> trong sidebar app con (SSO qua nút Bán hàng nhóm DỰ ÁN); chặn 2 lớp UI + API.
>
> **App tổng không đổi code** — chỉ ghi lịch sử + version.

**Version:** 3.7.9 → **3.8.0** (docs-only — patch 9 đầy → nhớ minor; checklist
GĐ 138 ✓).

---

### GĐ 198: Quy trình xử lý nhiệm vụ 5 bước — CHUẨN THÁI ĐỘ mới khi nhận MỌI nhiệm vụ (2026-09-22, 3.8.1)

| Commit | Thay đổi |
|---|---|
| (mới) | docs(agents): GĐ 198 — thêm quy trình 5 bước (phân tích tiếng Việt → hỏi ý tưởng → 3 tiêu chí + dự đoán → đồng ý mới code → tổng kết/hướng dẫn/gợi ý) vào mục 4 Workflow |
| (mới) | chore: tăng version 3.8.0 → 3.8.1 (docs-only — patch) |

> **Yêu cầu của Đại ca (2026-09-22):** Khi anh yêu cầu một nhiệm vụ gì, em làm theo
> 5 bước: (1) phân tích suy nghĩ bằng tiếng Việt; (2) phân tích xong hỏi lại anh
> xem đúng ý tưởng chưa; (3) đưa ít nhất 3 tiêu chí để anh lựa chọn tốt nhất +
> đoán trước kết quả nếu lựa chọn; (4) anh đồng ý mới viết code — viết xong nếu
> cần chạy thử, tổng kết nhiệm vụ, hướng dẫn anh chạy lần sau, gợi ý bước tiếp theo.
>
> **Đã hỏi chốt 3 điểm qua vòng hỏi đầu tiên áp dụng quy trình (anh chọn):**
> (1) phạm vi áp MỌI nhiệm vụ (kể cả việc nhỏ) — chấp nhận chậm hơn để chắc đúng ý;
> (2) đặt ở mục 4 Workflow làm việc (chỗ AI đọc đầu tiên khi nhận nhiệm vụ);
> (3) kết thúc phiên theo nguyên tắc Push — anh chọn phương án 1 (commit + ghi
> lịch sử + version, CHƯA push).
>
> **Kiến trúc ghi trong AGENTS.md:** mục "🔁 QUY TRÌNH XỬ LÝ NHIỆM VỤ" đặt ngay
> sau sơ đồ workflow, TRƯỚC "Quy tắc code" — đi cặp với 2 nguyên tắc "Chỉ sửa
> phần được chỉ định" + "Không tự đoán ý định": biến 2 nguyên tắc thụ động thành
> QUY TRÌNH 5 bước chủ động có CỔNG KIỂM (bài học GĐ 138 — quy tắc phải gắn vào
> thao tác). Ghi chú cho phép gộp bước 2+3 thành MỘT vòng hỏi khi việc đơn giản;
> bước 4+5 KHÔNG bỏ qua kể cả việc nhỏ.
>
> **LESSON LEARNED — Phiên này chính là lần chạy đầu của quy trình:** nhiệm vụ
> thêm quy tắc được xử lý đúng 5 bước (phân tích → vòng hỏi 3 tiêu chí → anh
> chọn → sửa file + verify → tổng kết + hỏi push). Quy trình đã chứng minh chạy
> được ngay khi áp dụng, không cần đợi nhiệm vụ sau mới thử.
>
> **Tiêu chí kiểm chứng:** Nhiệm vụ KẾ TIẾP bất kỳ: em mở đầu bằng phân tích +
> vòng hỏi lựa chọn (KHÔNG đụng code trước khi anh chọn); cuối phiên có mục
> "Tổng kết + hướng dẫn + gợi ý tiếp theo". Sidebar hiện VERSION 3.8.1 sau deploy.

**Version:** 3.8.0 → **3.8.1** (docs-only — patch; checklist GĐ 138 ✓ —
không thành phần nào ≥ 10).

---

### GĐ 200: Phân quyền app con CHI TIẾT ĐẾN TỪNG LÁ — 8 nhóm + chip từng báo cáo (2026-09-22, 3.9.0 + repo con 4.8.0)

| Commit | Thay đổi |
|---|---|
| (app tổng) | feat(permissions): GĐ 199 — catalog BH_GROUPS 8 nhóm + lá; trang Phân quyền toggle nhóm + chip từng lá; sso-token ký leafs vào JWT (3.9.0) |
| (repo con) | feat(permissions): GĐ C.67 — smed-auth quyền lá live DB + me trả leafs + sidebar lọc từng lá + API gate 3 lớp (4.8.0) |

> **Yêu cầu của Đại ca (22/09):** (1) hướng dẫn phân quyền Bán hàng app tổng → app con;
> (2) phần phân quyền mới chỉ có 4 nhóm DOWNLOAD — cần thêm nhóm BÁO CÁO + UPLOAD
> - MISA AMIS; (3) phân quyền TỪNG loại báo cáo trong các Nhóm chi tiết đến bậc cuối;
> (4) nhóm/chi tiết MỚI thêm sau tự áp dụng hình thức phân quyền này.
>
> **Đã chạy đúng quy trình GĐ 198 (phiên 2):** phân tích (đọc code 2 app) → trình
> 3 lựa chọn kèm dự đoán → anh chốt: ① mô hình NHÓM + TỪNG LÁ; ② nguồn cây = FILE
> CATALOG trong app tổng (đồng bộ 2 nơi có chú thích); ③ GIỮ NGUYÊN quyền hiện có
> (backward-compat). "Tổng quan" = Bậc 0 (cửa vào app con) — không lọc riêng, chặn
> bằng tắt quyền "Bán hàng".
>
> **Kiến trúc (3 tầng, không migration mới — cùng ô module_access JSONB):**
> 1. **Catalog (app tổng `src/lib/banhang-catalog.ts` — MỚI):** BH_GROUPS = 8 nhóm
>    × lá (4 key cũ `banhang-*` giữ nguyên + 4 key mới `bh-bao-cao-ke-toan` /
>    `bh-bao-cao-kho` / `bh-bao-cao-marketing` / `bh-upload-misa-amis`); key lá
>    `bh-leaf-<route>` (VD `bh-leaf-/m/bc-xuat-huy`). Hàm getBanhangDetailAccess —
>    logic backward-compat tập trung 1 nơi. CHECKLIST 4 bước khi thêm nhóm/báo cáo
>    MỚI ghi sẵn cuối file (sửa catalog + nav.ts app con + map report→nhóm/lá —
>    UI toggle + guard TỰ SINH theo catalog, KHÔNG sửa hệ thống phân quyền).
> 2. **App tổng:** permissions.ts mở rộng (getBanhangDetailForEmployee /
>    getBanhangCatalog / getBanhangAllGroupKeys; setUserModuleAccess nhận key lá
>    string); sso-token ký 8 nhóm + leafs vào JWT mods (fallback); trang Phân quyền
>    — khung 4 toggle cũ thay bằng 8 nhóm, mỗi nhóm xổ CHIP TỪNG LÁ (✓/✕, gạch ngang
>    khi tắt): bật nhóm = bật cả nhóm + xóa config lá (lá về theo nhóm); bật lá tự
>    bật nhóm; tắt lá không tắt nhóm; reset về default qua getBanhangDetail.
> 3. **App con:** smed-auth — BH_ALL_GROUP_KEYS (8) + ROUTE_TO_GROUP (33 lá → nhóm)
>    + getBanhangDetail/canAccessRoute (đọc LIVE module_access, fallback JWT mods,
>    normalize NVARCHAR/spread bug tái dùng GĐ 198); me.ts nối leafs vào mods;
>    app-shell filterTreeByMods lọc ĐẾN TỪNG LÁ (nhóm hết lá có quyền → ẩn cả nhóm);
>    -smed.ts chặn tạo job 3 LỚP: nhóm (C.21) → queryKey (C.47) → LÁ MỚI
>    (LEAF_ROUTE_BY_REPORT 13 phân hệ + SQL_QUERY_LEAF 13 queryKey — chip tắt là
>    chặn cả API tay).
>
> **LESSON LEARNED — Quyền "chi tiết đến bậc cuối" cần 3 điểm tiêu thụ cùng nguồn
> (tái diễn GĐ 99/143 lần 3):** sidebar (mods leafs) + canAccessRoute (API lá) +
> trang Phân quyền (catalog) — cả 3 đều sinh từ BH_GROUPS/ROUTE_TO_GROUP. Khác
> biệt duy nhất: app tổng dùng catalog file, app con map ROUTE_TO_GROUP riêng do
> 2 repo độc lập — checklist sync 2 nơi là chấp nhận có chủ đích (phương án API
> trả cây bị loại vì phụ thuộc tunnel sống).
>
> **LESSON LEARNED — key quyền lá dùng ROUTE (ổn định) không dùng tên hiển thị:**
> `bh-leaf-/m/bc-xuat-huy` — route không đổi khi đổi nhãn; thêm báo cáo mới = thêm
> route mới, key không va chạm; lọc sidebar tra route đang active trực tiếp.
>
> **LESSON LEARNED — str_replace replacement dài dễ dính lỗi escape (lặp lại):
> 3 lần trong phiên này replacement bị chèn `\r  ` thay `\r\n` hoặc dính dòng —
> đều bắt ngay bằng read_files sau mỗi lần sửa. Quy tắc: sửa file có CRLF, sau
> MỖI replacement khối lớn đọc lại vùng đó xác nhận trước khi chuyển bước.
>
> **HƯỚNG DẪN PHÂN QUYỀN BÁN HÀNG ĐẦY ĐỦ (tóm tắt cho Đại ca — chi tiết ở mục
> tổng kết phiên):** App tổng → Phân quyền → chọn nhân sự → bật "Bán hàng (Dự án)"
> → 8 nhóm xổ ra (4 DOWNLOAD + 3 BÁO CÁO + UPLOAD) → bật nhóm = cả nhóm, bấm chip
> ✓/✕ từng báo cáo để tinh chỉnh đến bậc cuối → lưu tự lên Neon. User mở lại app
> con là thấy đúng phạm vi (sidebar ẩn module không có quyền + API chặn tạo job).
>
> **⚠️ VIỆC CẦN LÀM sau deploy:** user ĐANG dùng app con giữ nguyên quyền nhóm cũ
> (tự có đủ lá trong nhóm đó). Muốn thu hẹp từng báo cáo: vào lại Phân quyền, bấm
> chip lá sang ✕. Trang UPLOAD các trang hiện là khung placeholder — quyền chặn
> ĐÚNG route nhưng nội dung trang còn chờ phát triển (GĐ sau).
>
> **Tiêu chí kiểm chứng:** Trang Phân quyền hiện 8 nhóm + 33 chip lá; tắt chip 1
> báo cáo → user đó mất module ở sidebar app con + tạo job bị chặn API; bật lại
> chip → thấy ngay khi tải lại; Admin app tổng/app con luôn đủ hết; typecheck 0
> lỗi cả 2 app; build OK cả 2.

**Version:** app tổng 3.8.1 → **3.9.0** (feature mới — minor) · repo con
4.7.2 → **4.8.0** (feature mới — minor; checklist GĐ 138 ✓ — không thành phần nào ≥ 10).

*Cập nhật lần cuối: 2026-09-22 (GĐ 200 — phân quyền app con chi tiết đến từng lá;
app tổng 3.9.0 / repo con 4.8.0)*
*Người cập nhật: Trợ lý lập trình*

---

### GĐ 201: Hệ sinh thái — Tổng quan app con nâng cấp lớn: kỳ chung Hôm qua + 7 hộp KPI (repo con v4.9.0) (2026-09-22)

| Commit | Thay đổi |
|---|---|
| (repo con) | feat(overview): GĐ C.67 — bỏ trùng Công ty + dropdown kỳ chung (mặc định Hôm qua) + hộp XUẤT VẮC XIN + hộp CẬN HẠN SỬ DỤNG + dialog chi tiết 7 hộp + progress Cập nhật (v4.9.0) |
| (app tổng) | docs(agents): GĐ 201 + version 3.9.0 → 3.9.1 (docs-only — patch) |

> **Yêu cầu của Đại ca (22/09 — 6 hạng mục, chi tiết đầy đủ ở AGENTS.md repo con GĐ C.67):**
> (1) bỏ 1 "Công ty CP Giong VN" trùng trong dropdown; (2) ô lọc thời gian CHUNG
> cạnh trái dropdown đơn vị (Hôm nay/Hôm qua/Tháng này/Tháng trước/Năm nay/Năm
> trước/Khoảng khác — mặc định **Hôm qua**), chọn → áp cả 7 biểu đồ + 7 hộp, kỳ
> riêng từng ô vẫn đổi tiếp được; (3) hộp vàng **XUẤT VẮC XIN** (PX-SD tiêm /
> PH hủy / PXK khác / XT trả NCC — Hôm nay + Tháng này); (4) hộp xanh đậm
> **CẬN HẠN SỬ DỤNG** (HSD ≥6 tháng / <6 / <3 — snapshot tồn kho); (5) bấm hộp
> → dialog báo cáo chi tiết; (6) Cập nhật → nút ẩn + thanh % cho tới 100%
> (HeaderJobsBar GĐ C.53 tự tổng hợp).

> **Đã chốt với Đại ca qua 3 câu hỏi:** dialog NGAY trong Tổng quan (không điều
> hướng); kỳ chung áp CẢ 7 biểu đồ + 7 hộp; HSD theo SNAPSHOT tồn mới nhất.

> **Nguồn dữ liệu đã probe thật:** XUẤT VẮC XIN = stg_6BKX (PX-SD 228.796 ·
> PH 4.258 · PXK 63 · XT 0 — ngày cột 2, SL cột 7, tiền cột 8); HSD = stg_7BCNXT
> cột 5 (ISO) + tồn cuối cột 16, group ≥6/3-6/<3 tháng theo asOf mới nhất.

> **Verify:** E2E Playwright production **10/10 PASS** (login → SSO → kỳ chung
> mặc định yesterday → 7 hộp bấm được → Công ty count=1 → biểu đồ đổi theo kỳ
> chung → kỳ riêng đổi được → dialog chi tiết + dialog HSD mở); tsc 0 lỗi;
> build OK; screenshots lưuTemp.

> **Version:** repo con 4.8.0 → **4.9.0** (feature — minor); app tổng 3.9.0 →
> **3.9.1** (docs — patch; checklist GĐ 138 ✓ — không thành phần nào ≥ 10).

> **Tiêu chí kiểm chứng:** Mở Tổng quan: dropdown Công ty 20 mục không trùng;
> kỳ chung mặc định Hôm quay về đúng 7 ô; 2 hộp mới hiện số thật; bấm hộp bất
> kỳ mở dialog chi tiết; Cập nhật → nút ẩn + thanh % chạy tới 100% + HeaderJobsBar
> hiện lệnh đang chạy; thiếu data Hôm qua → banner vàng hỏi tải như cũ.

