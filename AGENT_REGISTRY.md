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
| GĐ 300 / C.151 (Trợ lý Freebuff) | Trợ lý Freebuff | Đối chứng 2 file manual Mua vào (Tổng quan + Chi tiết 01→30/09) Đại ca gửi vào attachments/ với data app: TQ khớp TỪNG ĐỒNG 100% (385 HĐ, 5 cột tiền, HD 227/2009); CT lệch 2 nhóm do NGUỒN API MIA (482 dòng không có tthue + 18 dòng CK mất dấu âm) — công thức tthue=thtien×tsuat khớp 99,3% manual; PA-1 được chốt | chỉ đọc: attachments/ + DB qua API :8777 + builder; ghi AGENTS.md (2 repo) + AGENT_REGISTRY.md + scripts/probe-mia-muavao-manual.py (dùng lại) | ✅ | 02/10 16:30 | repo con `f1f9744` · app tổng `401dca7` |
| GĐ 300 PA-1 / C.152 (Trợ lý Freebuff) | Trợ lý Freebuff | Triển khai PA-1: sửa ETL mia_hddt_import.py (fill tthue=round(thtien×tsuat) khi rỗng + _tsuat_norm; dòng CKTM ép âm) → xóa import_log mua vào → re-import 5 file 1401 dòng → verify per-đồng PASS (CT thtien 5.244.180.687 khớp manual; tthue 266.468.689 = manual+residual 1.399.789; TQ không đổi) → restart agent khi rảnh (chờ Task_02 BKCCN xong) | agent/etl/mia_hddt_import.py + AGENTS.md (2 repo) + registry | ✅ | 02/10 19:00 | repo con (commit phiên này) · app tổng (commit phiên này) |
| GĐ 301 / C.153 (Trợ lý Freebuff) | Trợ lý Freebuff | **PUSH app con** theo lệnh Đại ca (chỉ app con, app tổng không push): kiểm tra job rảnh (0 job running/pending/waitdownload; Task daily done 20:13) → restart GIONG_SMED_Agent (xóa __pycache__, PID mới, log 22:14 sạch, Task_02 catch-up tự spawn) → rà trùng lặp (agent-cli + pipeline-work 0 commit riêng) → bump 6.8.0→6.9.0 + push 20 commit C.141→C.152 (`96f6278..2c2f2ff`) → deployment ĐẦU bị Vercel CHẶN `● Error` 1s (Vulnerable TanStack Start @1.168.53 — CVE XSS, tính năng mới của Vercel; push GĐ 289 còn qua) → PA-1 Đại ca chốt: nâng @tanstack/react-start 1.168.60 (npm leo workspace root → lockfile ROOT cập nhật; lockfile con stale 5.9.4 không được dùng) → push lại `f7d9a3d` → **Ready 18s + bundle domain chính 6.9.0 LIVE** + /api/units data thật | apps/banhang/package.json + package-lock.json (root) + AGENTS.md (2 repo) + registry | ✅ | 02/10 22:50 | repo con `2c2f2ff` + `f7d9a3d` · app tổng (docs local — chưa push) |
| GĐ 303 / C.155 (Trợ lý Freebuff) | Trợ lý Freebuff | Triển khai PA-1 lượt 2 (đối chứng manual): sửa ETL mia_hddt_import.py theo logic MIA Tool gốc (decompile row_builder) — tthue rỗng: dòng CUỐI HĐ = tgtthue_HĐ (file TQ) − lũy kế; dòng giữa = thtien×tsuat (giữ C.152) → xóa import_log MIA → re-import → verify residual 1.399.789 → 0, 4 HĐ K26THB khớp manual từng đồng; thêm cột tthue DECIMAL(19,2) + chọn TQ kỳ rộng nhất → 0 HĐ lệch | giong-apps/apps/banhang/agent/etl/mia_hddt_import.py + scripts/probe-mia-muavao-manual.py (dùng lại) + AGENTS.md (2 repo) + AGENT_REGISTRY.md | ✅ | 02/10 23:50 | repo con `7bef561` · app tổng `0270d70` |
| GĐ 302 / C.154 (Trợ lý Freebuff) | Trợ lý Freebuff | NHIỆM VỤ app con — 5 yêu cầu Đại ca: (1) Task_02 chạy 3 lần/ngày 17:25/19:00/23:00; (2) bổ sung phân hệ download + báo cáo MỚI còn thiếu vào Task; (3) lần 3 chỉ vá file thiếu/lỗi; (4) download xong phải chạy báo cáo kèm; (5) báo cáo kết quả trên Task đã chạy | apps/banhang/agent/task_runner.py + agent/api_server (nếu cần) + trang /m/tasks + -tasks.ts | 🔒 | 02/10 23:30 | (làm phiên này) |
| GĐ 299 / C.150 (Trợ lý Freebuff) | Trợ lý Freebuff | Mua vào — "Tổng tiền chưa thuế" thiếu cho HĐ BÁN HÀNG (mẫu số 2, tgtcthue NULL/0): PA-3 Đại ca chốt — sửa ETL mia_hddt_import.py đọc bổ sung tổng từ chi tiết hàng hóa khi cột trống + re-import file mua vào + đối chứng HD C26MYY/227 = 1.126.000. Verify: builder thật 385 HĐ khớp manual từng đồng; service agent restart khi rảnh | giong-apps/apps/banhang/agent/etl/mia_hddt_import.py + OUTPUT file mẫu (nếu cần) + AGENTS.md (2 repo) + AGENT_REGISTRY.md | ✅ | 02/10 | repo con `b89a894` · app tổng (commit phiên này) |
| GĐ 298 / C.149 (Trợ lý Freebuff) | Trợ lý Freebuff | 2 báo cáo TCB + TPB "Tổng hợp theo ngày": thêm dòng Số dư đầu kỳ + cột Số dư (PA-2' — balance GD cuối ngày; anh chốt sau khi đối chứng TCB nợ số âm + TPB 10/09 dư thật 261tr không giải thích được bằng GD trong định mức) + dòng Số dư cuối kỳ; NOT EXISTS loại kỳ lồng TCB (29/09 hết nhân đôi); web subtotalExcludeCols Số dư/TK đối ứng | giong-apps/apps/banhang/agent/etl/sql_reports.py + src/routes/m/bc-bank-{tcb,tpb}{,-th}.tsx + AGENTS.md (2 repo) + AGENT_REGISTRY.md | ✅ | 02/10 | repo con `5a6e43b` · app tổng (commit phiên này) |
| GĐ 297 / C.148 (Trợ lý Freebuff) | Trợ lý Freebuff | Nghiệp vụ freshness PA-1 (Đại ca chốt 02/10): nguồn FILE GỘP KỲ (TCB/TPB/MIA/GDTVX) — kỳ chọn có dòng thật trong bảng (tx_date/ntao/ngay_dang_ky between) → xanh "nạp lúc [mốc lượt tải]"; không có → vàng "chưa có dữ liệu kỳ này". Sửa loadSourceFreshness + checkReportFreshness (-smed.ts). Verify: SQL 2 chiều + E2E UI 6/6 PASS + tsc 0 lỗi | giong-apps/apps/banhang/src/routes/api/-smed.ts + AGENTS.md (2 repo) + AGENT_REGISTRY.md | ✅ | 02/10 | repo con (commit phiên này) · app tổng (commit phiên này) |
| GĐ 296 / C.146 (Trợ lý Freebuff) | Trợ lý Freebuff | Triển khai "BC_Sao kê ngân hàng TPB" (PA-1 chốt 02/10: lấy mẫu bằng chạy lại tool 42 kỳ 08→12/09 — đối chứng C.138 khớp từng đồng; Tổng hợp THEO NGÀY như TCB; 2 lá menu như TCB): ETL bank_tpb_import.py → dbo.bank_tpb_tx + bank_tpb_balance (47 GD nạp); builder bank-tpb-chitiet/tonghop; 2 trang /m/bc-bank-tpb + /m/bc-bank-tpb-th; phân quyền 3 điểm + catalog app tổng; agent hook tự ETL. Lesson: file TPB dimension metadata sai → openpyxl read_only đọc thiếu — phải non-read_only | giong-apps/apps/banhang/agent/etl/bank_tpb_import.py (mới) + agent/etl/sql_reports.py + agent/40_web_agent.py + src/routes/m/bc-bank-tpb.tsx + src/routes/m/bc-bank-tpb-th.tsx (mới) + src/lib/nav.ts + src/lib/smed-auth.ts + src/routes/api/-smed.ts + src/routeTree.gen.ts + ../../../src/lib/banhang-catalog.ts (app tổng) + AGENTS.md (2 repo) + AGENT_REGISTRY.md | ✅ | 02/10 | repo con `0532af8` · app tổng (commit phiên này) |
| GĐ 295 / C.145 (Trợ lý Freebuff) | Trợ lý Freebuff | Khắc phục 3 vấn đề local (02/10): (1) báo cáo TCB "chưa có dữ liệu" oan — bank_tcb_tx thiếu trong code()/valid() 2 hàm freshness; (2) audit toàn bộ báo cáo cùng lỗi — tìm thêm 4 trang MIA oan (mã "MIAHDDT" không tồn tại → map reportKey→4 mã thật); (3) KPI Tổng quan trắng — ROOT CAUSE: comment SQL chứa token $N → translate_sql thay thành ? trong comment → ODBC "54 markers, 58 params"; fix strip comment trong translate_sql + bỏ $N khỏi comment -overview.ts + fix watchdog 5xx=chết (đã chứng minh: marvel 530 → tunnel mới anna). Verify: 7/7 KPI + 5/5 trang sạch banner + tsc 0 lỗi | giong-apps/apps/banhang/agent/api_server/api_server.py + src/routes/api/-overview.ts + src/routes/api/-smed.ts + src/components/sql-data-module.tsx + AGENTS.md (2 repo) + AGENT_REGISTRY.md | ✅ | 02/10 13:15 | repo con `792a547` · app tổng (docs) |
| GĐ 294 / C.144 (Coder — Trợ lý Freebuff) | Trợ lý Freebuff | TASK-001 PIPELINE: +2 key TCB vào SQL_SOURCES_BY_QUERY (hộp Tải dữ liệu mới nhất) — re-commit đúng số (eedc272 ghi nhầm 292/C.142 trùng số) | giong-apps/apps/banhang/src/routes/api/-smed.ts + AGENTS.md (2 repo) + PIPELINE/TASKS/TASK-001/** | ✅ | 02/10 | ba9b807 (repo con, nhánh pipeline-work) + 85b008c (PIPELINE docs) |
| GĐ 293 / C.143 (Trợ lý Freebuff) | Trợ lý Freebuff | Kiểm tra KPI XUẤT VẮC XIN = 0 (ảnh 02/10 07:43) + đối chứng TẤT CẢ 7 hộp KPI Tổng quan với data thật GiondDB | giong-apps/apps/banhang/src/routes/api/-overview.ts (nếu cần fix) + AGENTS.md (2 repo) | ✅ | 02/10 | C.143 ecd6f61 (repo con) + GĐ 293 (app tổng) |
| GĐ 290 (Trợ lý Freebuff) | Trợ lý Freebuff | Dựng `PIPELINE/` — hệ điều hành đội 4 Agent (Planner/Coder/Tester/Reviewer) + worktree `giong-vn-v6-pipeline` nhánh `pipeline-work` | PIPELINE/** + AGENT_REGISTRY.md + AGENTS.md — KHÔNG đụng code app | ✅ | 02/10 | b9108e8 (claim) + commit PIPELINE (phiên này) |
| GĐ 292 / C.142 (Trợ lý Freebuff) | Trợ lý Freebuff | Điều tra "7 hộp KPI Tổng quan biến mất" — kết luận KHÔNG phải bug C.141 (tunnel chết ngầm + cửa sổ fallback hở) + script chuẩn debug-overview-kpi.mjs | AGENTS.md (2 repo) + AGENT_REGISTRY.md + scripts/debug-overview-kpi.mjs — KHÔNG đụng code | ✅ | 02/10 | 3f42846 (app tổng) + 3c30c1f (repo con) |
| GĐ 291 / C.141 (Trợ lý Freebuff) | Trợ lý Freebuff | Fix KPI Xuất VX = 0 đầu tháng (WHERE BETWEEN monthStart AND pTo đảo ngược) + PA-C tăng tốc loadOverviewKpi ~5s → ~2s | giong-apps/apps/banhang/src/routes/api/-overview.ts + AGENTS.md (2 repo) | ✅ | 02/10 | 8b1d155 + 22e2857 (repo con) + GĐ 291 (app tổng) |
| GĐ 292 (Trợ lý Freebuff) | Trợ lý Freebuff | TASK-001 vai CODER — thêm hộp "Tải dữ liệu mới nhất trước khi chạy" cho 2 trang TCB (SQL_SOURCES_BY_QUERY thiếu 2 key TCB — kế hoạch Planner d033ea9) | giong-apps/apps/banhang/src/routes/api/-smed.ts + AGENT_REGISTRY.md + PIPELINE/** | ✅ | 02/10 | eedc272 (repo con C.142) + docs commit (phiên này) |
| C.138 (Trợ lý Freebuff) | Trợ lý Freebuff | PA-1 revert tool 42 TPB về luồng gốc "Xuất sao kê" + tải row ĐÚNG KỲ | giong-apps/apps/banhang/agent/42_tpb_saoke.py + AGENTS.md (2 repo) | ✅ | 01/10 16:50 | e003712 (repo con) + GĐ 286 (app tổng) |
| C.139 (Trợ lý Freebuff) | Trợ lý Freebuff | ~~Sidebar bậc 3 MIA~~ BỎ CLAIM — Agent khác dùng số này qua GĐ 287 (17:40) trước | — | ⛔ | 01/10 17:10 | 2d6e4c6 (của GĐ 287) |
| C.140 (Trợ lý Freebuff) | Trợ lý Freebuff | Sidebar bậc 3 MIA (MUA VÀO/BÁN RA) — chữ nhỏ hơn + lùi đầu dòng + nghiêng | giong-apps/apps/banhang/src/components/app-shell.tsx + AGENTS.md (2 repo) | ✅ | 01/10 17:55 | 4baf8bb (repo con) + GĐ 288 (app tổng) |
| GĐ 289 (Trợ lý Freebuff) | Trợ lý Freebuff | Push lần 3 — restart agent + bump 4.8.0/6.8.0 + push 2 repo + preflight PASS | AGENTS.md (docs) | ✅ | 01/10 | 2266ab9 (bump app tổng) · 96f6278 (bump repo con) |
| GĐ 285 | Trợ lý Freebuff | Ban hành quy trình Registry lock + 3 quy tắc commit cứng | AGENT_REGISTRY.md, AGENTS.md (2 repo docs) | ✅ | 01/10 | e97ef93 + 81219dc (app tổng) · 4c2a3c2 (repo con) |
| GĐ 287 (Trợ lý Freebuff) | Trợ lý Freebuff | 3 nguyên tắc dữ liệu: dedupe đa-lượt-tải ETL (NT1+2) + banner báo cáo cũ khi có data mới (NT3) | giong-apps/apps/banhang/agent/etl/etl_import.py + src/routes/api/-smed.ts + src/components/sql-data-module.tsx + AGENTS.md (2 repo) | ✅ | 01/10 17:40 | 2d6e4c6 (repo con) + 2a87fb4 (app tổng) |

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
   **⚠️ Bắt buộc thêm (bắt được ngay phiên đầu GĐ 285):** TRƯỚC MỌI `git commit`
   chạy `git diff --cached --stat` — staged phải ĐÚNG BẰNG danh sách file mình
   định commit. File của agent khác có thể nằm SẴN trong index từ phiên trước
   (`git add <file mình>` KHÔNG xóa phần staged cũ) — commit sẽ nuốt luôn.
2. **Commit message chuẩn:** `feat|fix|docs(<scope>): GĐ <số> (<tên Agent>) — mô tả`
   (repo con: `C.x (<tên Agent>)`). Truy vết được ai làm gì bằng `git log`.
   **⚠️ Kiểm tra staged bắt buộc trước commit:** `git diff --cached --stat` phải
   đúng bằng danh sách file mình định commit (file agent khác có thể nằm sẵn
   trong index từ phiên trước — Lesson phiên đầu GĐ 285).
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
| GĐ 285 (phiên đầu) | Commit repo con nuốt `42_tpb_saoke.py` của agent khác — file nằm SẴN trong index từ phiên trước | Chưa check `git diff --cached` trước commit | `git reset HEAD~1` → commit lại chỉ AGENTS.md (`4c2a3c2`) — file agent khác về nguyên trạng |

**Chốt của Đại ca (GĐ 285):** từ GĐ này mọi nhiệm vụ claim trước bằng registry —
hết trạng thái "phát hiện trùng rồi mới xử lý".
