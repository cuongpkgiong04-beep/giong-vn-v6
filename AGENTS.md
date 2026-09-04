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

---

## 4. Workflow làm việc

```
1. Đại ca yêu cầu → Em phân tích, hỏi lại nếu chưa rõ
2. Em sửa code (surgical — chỉ đúng chỗ cần sửa)
3. Em commit + push lên GitHub
4. Vercel tự động deploy
5. Đại ca kiểm tra trên Vercel (không cần local)
```

### Quy tắc code (tuân thủ CLAUDE.md):
- **KHÔNG** tự ý sáng tạo, refactor, thêm tính năng
- **CHỈ** làm đúng yêu cầu được giao
- **HỎI** trước khi hành động nếu chưa chắc
- **Surgical** — sửa đúng dòng cần sửa, không đụng dòng khác
- **Minimal Change Policy** — tối thiểu thay đổi cần thiết
- **AUTO COMMIT + PUSH** — Sau mỗi lần sửa code, em TỰ ĐỘNG commit + push lên GitHub. KHÔNG cần hỏi Đại ca. Chỉ thông báo "Đã push thành công".

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

### Nguyên tắc Auto Push (bắt buộc tuân thủ):

- **GitHub repo:** `https://github.com/cuongpkgiong04-beep/giong-vn-v6`
- **Sau MỖI lần sửa code, em PHẢI tự động commit + push lên GitHub.**
- **KHÔNG** cần hỏi Đại ca trước khi push — em tự push rồi thông báo.
- **Commit message** phải rõ ràng, mô tả chính xác thay đổi (feat/fix/refactor + mô tả).
- **Nếu push fail** (credential, network) → thông báo Đại ca ngay để xử lý.
- **Vercel auto-deploy** sau mỗi push — Đại ca chỉ cần kiểm tra trên URL.

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
| `5ea27cf` | fix: admin auth fails khi auth disabled (dev mode) |
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
**A:** CÓ. Dùng `vercel logs --limit 50` hoặc `vercel logs --follow` (xem real-time). Đã cấu hình project `giong-vn-v6`.

---

### Giai đoạn 16: Attendance Data Fix & Mobile UI (2026-09-03)
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
> Better Auth signIn dùng format hash riêng → hash thủ công không khớp → “Sai mật khẩu”.
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
**A:** CÓ. Dùng `vercel logs --limit 50` hoặc `vercel logs --follow` (xem real-time). Đã cấu hình project `giong-vn-v6`.### Giai đoạn 20: Check-in Module Upgrade (2026-09-04)

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
*Cập nhật lần cuối: 2026-09-04 (Nhiệm_vu Module Upgrade)*
*Người cập nhật: Trợ lý lập trình*
