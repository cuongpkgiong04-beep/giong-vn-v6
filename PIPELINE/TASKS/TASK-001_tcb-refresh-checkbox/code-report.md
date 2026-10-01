# [CODE-REPORT] TASK-001

> **Người làm:** Coder (Trợ lý Freebuff) · **Ngày:** 02/10/2026
> **Số GĐ đã claim (registry):** GĐ 292 (claim `52c3392`) · **Commit chính:** repo con `pipeline-work` — xem mục 3
> **Worktree/nhánh:** giong-vn-v6-pipeline / pipeline-work (+ worktree repo con `giong-vn-v6-pipeline/giong-apps` nhánh `pipeline-work` từ `36ac3c4`)

---

## 1. Tóm tắt đã làm

Hiện thực đúng plan.md (d033ea9) 100%: thêm 2 entry `bank-tcb-chitiet` +
`bank-tcb-tonghop` vào map web-side `SQL_SOURCES_BY_QUERY` trong
`giong-apps/apps/banhang/src/routes/api/-smed.ts` — đặt NGAY SAU cặp VCB,
khớp tuyệt đối format VCB (C.111). Hết thiếu hộp checkbox "Tải dữ liệu mới
nhất trước khi chạy" trên cả 2 trang TCB (component dùng chung
`sql-data-module.tsx` gate `srcs.length > 0` giờ thấy nguồn). KHÔNG đụng
tầng agent (agent-side `sql_reports.py` đã có sẵn 2 key + builder
`bank_tcb_*` từ C.130).

## 2. Đối chiếu plan → đã hiện thực

| Điểm trong plan (mục) | Trạng thái | Ghi chú |
|---|---|---|
| Sửa CHỈ 1 file `-smed.ts` (mục 3) | ✅ | `git diff` = đúng 1 file, +6 dòng (2 entry + 4 dòng comment) |
| Thêm NGAY SAU dòng VCB (mục 3) | ✅ | Sau `bank-vcb-tonghop` (dòng 211), trước khối comment C.123 |
| 2 key: `bank-tcb-chitiet` + `bank-tcb-tonghop` (mục 3) | ✅ | CẢ HAI key đã thêm (lỗi tiềm ẩn #5) |
| reportKey `"bank-tcb"` — khớp TUYỆT ĐỐI agent (mục 4.1) | ✅ | Đã grep `sql_reports.py`: QUERY_KEYS dòng 49-50 + builder `bank_tcb_chitiet` đọc `dbo.bank_tcb_tx` (dòng 498-511) |
| label chứa `OUTPUT\16.BANK_TCB` (mục 4.2) | ✅ | `"Sao kê ngân hàng TCB (tool 41 — OUTPUT\\16.BANK_TCB)"` — khớp mẫu VCB |
| CẤM sửa tầng agent (mục 4.3) | ✅ | `sql_reports.py` không bị đụng (verify bằng git status) |
| Không thêm quyền (mục 4.4) | ✅ | Nhóm `banhang-bank` + whitelist `"bank-tcb"` có sẵn từ trước |
| KHÔNG sửa file khác | ✅ | `git diff main...pipeline-work` (repo con) chỉ -smed.ts |

## 3. File đã sửa/tạo (so với plan mục 3)

| File | +dòng / −dòng | Lý do lệch plan |
|---|---|---|
| `giong-apps/apps/banhang/src/routes/api/-smed.ts` | +6 / −0 | Không lệch — comment GĐ 292 4 dòng là phần giải thích chuẩn codebase (VCB có comment C.111 tương tự) |

*(Đối chiếu: `git -C giong-apps diff main...pipeline-work --stat` → 1 file, +6)*
**Commit repo con:** `eedc272` — `fix(smed): GĐ 292 / C.142 (Coder — Trợ lý Freebuff) — TASK-001: +2 key TCB vào SQL_SOURCES_BY_QUERY…` (staged sạch: đúng 1 file, +6).

## 4. Mục 4 plan — các lỗi tiềm ẩn đã xử lý thế nào?

| Rủi ro (plan mục 4) | Đã phòng bằng cách |
|---|---|
| 1. Chuỗi khớp TUYỆT ĐỐI agent-side | Grep `sql_reports.py` trước khi thêm: key (49-50), builder bank_tcb_chitiet (498), table bank_tcb_tx (511) — 3/3 khớp |
| 2. Label chứa `OUTPUT\16.BANK_TCB` | Copy nguyên format label VCB, chỉ đổi VCB→TCB + tool 40→41 + 15→16 |
| 3. CẤM sửa tầng agent | Chỉ sửa -smed.ts; sql_reports.py untouched (git status xác nhận) |
| 4. Không cần thêm quyền | Grep -smed.ts: whitelist "bank-tcb" (~701) + nhóm banhang-bank (~613) đã có |
| 5. CẢ HAI key phải thêm | 2 entry trong 1 replacement — verify bằng read_files sau sửa |

**Bonus phát hiện khi verify (không phải lỗi):** table `bank_tcb_tx` KHÔNG
bắt đầu `stg_10gdtvx_`/`mia_hddt` → freshness query đi nhánh `report_date`
giống VCB (dòng 277-278) — đúng thiết kế C.130 (ETL TCB ghi report_date =
kỳ from gộp). Checkbox + mốc "nạp lúc HH:MM" hành vi = VCB 100%.

## 5. Verify đã tự chạy

- [x] Typecheck repo con: `node ../../node_modules/typescript/bin/tsc --noEmit` tại `apps/banhang` → **EXIT=0, 0 lỗi**
- [ ] Unit test: không có test liên quan map tĩnh (Tester sẽ chạy UI dev server)
- [x] Khác: read_files lại vùng sửa sau str_replace (rule GĐ 285 — bắt lỗi ghi) → đúng 100%; `git status` repo con sạch (không file agent khác)

## 6. Việc còn dở / blocker (nếu có)

Không có. Coder xong sạch — chuyển sang Tester (checklist criteria 1-4
plan mục 6: UI dev server, so VCB, tick-chạy).

## 7. Lesson learned mới

Không có lesson mới — quy trình PIPELINE chạy đúng thiết kế lần đầu
(merge worktree → claim → fix → verify → report). Lưu ý vận hành nhỏ:
worktree repo con mới cần junction `node_modules` (app-level + root-level
monorepo — typescript hoisted ở root) trước khi typecheck.

---
*Coder KHÔNG push — chờ Tester → Reviewer → Đại ca nói "Push".*
