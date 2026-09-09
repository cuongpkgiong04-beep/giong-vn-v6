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

### Quy tắc code (tuân thủ CLAUDE.md):
- **KHÔNG** tự ý sáng tạo, refactor, thêm tính năng
- **CHỈ** làm đúng yêu cầu được giao
- **HỎI** trước khi hành động nếu chưa chắc
- **Surgical** — sửa đúng dòng cần sửa, không đụng dòng khác
- **Minimal Change Policy** — tối thiểu thay đổi cần thiết
- **PHẢI HỎI TRƯỚC KHI PUSH** — Sau khi sửa code xong, PHẢI hỏi Đại ca lựa chọn trước khi push (xem bên dưới).
- **Desktop + Mobile song song** (hiệu lực từ 2026-09-09) — Mọi sửa code từ giờ áp dụng đồng thời cho cả Desktop và Mobile, trừ khi Đại ca yêu cầu cụ thể khác.

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

### Nguyên tắc Push (bắt buộc tuân thủ — có hiệu lực từ 2026-09-07):

> **SAU KHI SỬA CODE XONG, EM PHẢI HỎI ĐẠI CA 1 TRONG 3 LỰA CHỌN TRƯỚC KHI PUSH:**
>
> 1️⃣ **Em sẽ Push lên GitHub bây giờ**
> → Chỉ commit + push, KHÔNG cập nhật AGENTS.md hay version.
>
> 2️⃣ **Em sẽ ghi lại lịch sử và tăng số Version lên**
> → Cập nhật AGENTS.md (giai đoạn mới, lesson learned) + tăng version ở `package.json` và `app-shell.tsx`.
>
> 3️⃣ **Anh muốn cả 2 điều trên**
> → Push lên GitHub + cập nhật AGENTS.md + tăng version.
>
> **Em KHÔNG tự ý push mà KHÔNG hỏi.**
> **Em KHÔNG tự ý tăng version mà KHÔNG được Đại ca đồng ý.**

- **GitHub repo:** `https://github.com/cuongpkgiong04-beep/giong-vn-v6`
- **Commit message** phải rõ ràng, mô tả chính xác thay đổi (feat/fix/refactor + mô tả).
- **Nếu push fail** (credential, network) → thông báo Đại ca ngay để xử lý.
- **Vercel auto-deploy** sau mỗi push — Đại ca chỉ cần kiểm tra trên URL.

### Cách tăng Version:

- **2 nơi cần sửa:**
  1. `package.json` → field `"version": "x.y.z"`
  2. `src/components/app-shell.tsx` → `const DEFAULT_VERSION = "x.y.z"`
- **Quy tắc tăng:** Patch (x.y.Z+1) cho fix nhỏ, Minor (x.Y.0+1) cho feature mới.
- **Quy tắc tròn chục:** Khi số sau tăng đến tròn chục thì số trước tăng 1 bậc, số sau về 0:
  - `1.0.9` → `1.1.0`; `1.1.9` → `1.2.0`; `1.9.9` → `2.0.0`
  - Áp dụng cho cả 3 số: patch đầy (x.y.9→x.y+1.0), minor đầy (x.9.9→x+1.0.0).

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
| `88181d3` | fix: loadEmployees query thiếu role column → tất cả员工都成User |
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
| `dae452d` | feat(nhiem-vu): dropdown Phụ特长 + Người hỗ trợ chỉ hiện nhân VP |
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
> - Dropdown Phụ特长 + Người hỗ trợ: chỉ nhân VP, reactive từ store
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

*Cập nhật lần cuối: 2026-09-09 (Giai đoạn 65 — Lightbox ảnh Check-in + đổi nền trắng)*
*Người cập nhật: Trợ lý lập trình*

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

*Cập nhật lần cuối: 2026-09-10 (Giai đoạn 72 — Nhóm chat kiểu Zalo: Admin tạo nhóm, mời/thêm thành viên)*
*Người cập nhật: Trợ lý lập trình*

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
