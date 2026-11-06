# BẢN ĐỒ DỰ ÁN GIONG VIETNAM (PROJECT MAP)

> **GĐ 702 (06/11/2026)** — lớp 2 "Bản đồ định vị" của hệ thống tri thức.
> Mục đích: trả lời nhanh "việc này thuộc tầng nào, đi đường nào, tra ở đâu"
> mà KHÔNG phải đọc 12.000 dòng AGENTS.md. Cập nhật khi kiến trúc đổi (bản đồ
> sai thì sửa ngay tại chỗ — không ghi rải trong entry).
> Quy tắc chữ: DB tên là **GiongDB** (không "GiondDB" — mục 17 AGENTS.md).

---

## 1. Kiến trúc 6 tầng

```
┌─────────────────────────────────────────────────────────────────────────┐
│ TẦNG 0 — NGUỒN DỮ LIỆU                                                  │
│  SMED (19 trung tâm) · MISA/meInvoice · Cổng HĐĐT QG (MIA)               │
│  Ngân hàng: VCB/TCB/TPB (VTB chưa có tool) · Zalo · Cloudinary           │
├─────────────────────────────────────────────────────────────────────────┤
│ TẦNG 1 — AGENT PYTHON (giong-apps/apps/banhang/agent/) — 4 máy          │
│  .14 PC-PKT-01 (cũ .27) nhóm smed: 13 phân hệ SMED (8 API PA-1 +        │
│      5 browser Playwright) — ETL chạy NGAY trên máy claim               │
│  .245 GIANGKT nhóm misa-muahang: Upload mua hàng + xuất kho             │
│  .11 TÂN THANH-PC (cũ .34) nhóm misa-banhang: Upload bán hàng           │
│  .250 MÁY CHỦ nhóm core: MIA · BANK (headful) · meInvoice (OTP Gmail)   │
│      · hddt-dauvao (HTTP thuần) · sqlreport · cứu hộ job chờ >15'       │
│  Service GIONG_SMED_Agent (máy chủ) + GIONG_SMED_Worker (3 máy LAN)     │
├─────────────────────────────────────────────────────────────────────────┤
│ TẦNG 2 — API SERVER :8777 + Cloudflare Tunnel                           │
│  api_server.py + cloudflared (CON của api_server — restart web_agent    │
│  giữ nguyên tunnel URL). Job vào smed_pull_jobs → worker claim ATOMIC   │
│  theo NHÓM (máy nào chạy phụ thuộc LOẠI JOB). Token: /db/query =        │
│  agent/.secrets/agent_token.txt · /query /exec = agent/api_server/      │
│  .secrets/api_token.txt (48 ký tự)                                      │
├─────────────────────────────────────────────────────────────────────────┤
│ TẦNG 3 — GiongDB (SQL Server Express, máy chủ) — NGUỒN DUY NHẤT         │
│  stg_* (dữ liệu tải về) · smed_pull_jobs (job) · price_list · th_gbkm_*  │
│  ⚠️ CẤM DATETIMEOFFSET (pyodbc tunnel không serialize — dùng DATETIME2)  │
│  Neon PostgreSQL = ảnh chụp cũ 16/09 — KHÔNG đồng bộ, chỉ là bảo hiểm   │
│  cấu hình chống rơi PGLite (đọc mục "Kiến trúc nguồn dữ liệu" AGENTS.md)│
├─────────────────────────────────────────────────────────────────────────┤
│ TẦNG 4 — WEB APP (Vercel auto-deploy từ GitHub)                         │
│  App tổng giong-vn-v6.vercel.app — TanStack Start, Better Auth, phân    │
│      quyền app tổng (catalog app tổng = banhang-catalog.ts)             │
│  App con giong-banhang.vercel.app — SSO JWT (APP_JWT_SECRET CẢ 2 app    │
│      PHẢI CÙNG giá trị), SqlDataModule, phân quyền 3 điểm (ROUTE_TO_GROUP│
│      · SQL_QUERY_LEAF · catalog app tổng)                               │
├─────────────────────────────────────────────────────────────────────────┤
│ TẦNG 5 — NGƯỜI DÙNG (Đại Ca kiểm tra trên production, không local)      │
└─────────────────────────────────────────────────────────────────────────┘
```

## 2. Luồng dữ liệu chuẩn: DOWNLOAD → ETL → BÁO CÁC (bắt buộc 3 bước)

| Bước | Việc | Nơi code |
|---|---|---|
| 1 DOWNLOAD | Tool tải file về `OUTPUT/<phân hệ>/<từ ngày>/` — đủ file theo `expected_files` (SMED = 19 file/19 TT) | `agent/<số>_smed_*.py`, `_pa1_fetch.py` |
| 2 ETL | `etl/<phân hệ>_import.py` nạp GiongDB — rebuild-ngày (folder có file mới → nạp lại TOÀN folder), hash dedupe, đối chứng tổng TỪNG ĐỒNG với file gốc | `agent/etl/*_import.py` |
| 3 BÁO CÁC | Builder + QUERY_KEYS + REPORT_SOURCE_TABLES + trang web + phân quyền 3 điểm | `agent/etl/sql_reports.py` + `src/routes/m/*` |

- Agent hook tự chạy ETL sau job; auto-ETL 60' dự phòng; nhường job đang chạy.
- File gộp kỳ (TCB/MIA nạp theo KỲ) vs file theo ngày (VCB/SMED nạp theo NGÀY).

## 3. Task tự động (vòng sleep 30s trong service máy chủ)

`Task_04 17:15` (9 phân hệ + 14 báo cáo) → `Task_02 23:00` (18/20 phân hệ; LOẠI
2 phân hệ meInvoice) → `Task_03` (29 báo cáo, spawn khi 02+04 xong) →
`Task_05 mua hàng → Task_06 bán hàng → Task_07 xuất kho` (upload + ghi sổ
`MISA_AUTO_POST=1`; thứ tự chốt LÚC SPAWN). Task_08 gửi Zalo khi đủ điều kiện.

## 4. Điểm tra cứu nhanh (lệnh chuẩn)

| Cần | Lệnh / nơi |
|---|---|
| Tra code nhanh | hook entire-graph tự chạy; sâu hơn: `bash scripts/tools/entire-graph/eg.sh query|impact|def` · MCP codegraph_explore · CBM trace_path/query_graph (mục 14/19 AGENTS.md) |
| Claim số GĐ | `python scripts/agents/claim.py claim|check|done` |
| Commit file dùng chung | `python scripts/agents/shared-doc.py check|list|commit` |
| Version production | `curl --compressed https://giong-vn-v6.vercel.app \| grep -a version` (app con: giong-banhang.vercel.app) |
| Đọc GionDB chỉ-đọc | HTTP `/db/query` + Bearer `agent/.secrets/agent_token.txt` (LAN bị middleware chặn /jobs — đọc DB trực tiếp) |
| Sửa GionDB | SQL Server sqlcmd trên máy chủ; ALTER phải commit TỪNG lệnh + kiểm INFORMATION_SCHEMA |
| Restart agent | check rảnh (log 30' 0 job) → xóa `__pycache__` 3 thư mục → `sc stop/start GIONG_SMED_Agent` → taskkill python.exe còn lại (api_server không chết theo sc stop) |
| Deploy code agent 4 máy | sửa agent/etl/* → deploy MỌI máy (.250 + .14/.245/.11): scp -O + MD5 + py_compile; worker LAN subprocess không cần restart |
| Verify sau push | curl version + login thật + SSO app con + /api/auth/me (mục "KIỂM TRA TRƯỚC & SAU MỌI LẦN PUSH" AGENTS.md) |
| Bài học theo triệu chứng | `docs/PLAYBOOK.md` |
| Lịch sử đầy đủ | AGENTS_ARCHIVE.md (tra theo số GĐ) · AGENT_REGISTRY.md (ai giữ việc gì) |

## 5. Quy tắc định dạng bảng (áp mọi bảng mới — 4 nguyên tắc)

Ngày dd/mm/yyyy căn trái · Số #,##0 căn phải tabular-nums · Cột "Đơn giá/Giá…"
(khác "Giá trị…") KHÔNG cộng subtotal · Text căn trái, tràn thì truncate + title.

## 6. Cấu trúc repo khi làm việc

```
giong-vn-v6/                 ← app tổng (React 19 · TanStack Start · Vite 8)
├─ src/routes/               ← trang app tổng (bao-cao, cham-cong, admin/...)
├─ src/lib/banhang-catalog.ts← BH_GROUPS phân quyền app tổng cho app con
├─ scripts/agents/           ← claim.py · shared-doc.py · install-hooks.py
├─ scripts/tools/entire-graph/ ← eg.sh + hook tự động
├─ docs/                     ← PROJECT_MAP.md (file này) · PLAYBOOK.md
├─ artifacts/                ← bằng chứng probe/làm việc theo GĐ
└─ giong-apps/apps/banhang/  ← repo con (app bán hàng + agent Python)
   ├─ agent/                 ← tool download/upload + task_runner + api_server
   ├─ agent/etl/             ← *_import.py + sql_reports.py (builder)
   ├─ src/routes/m/          ← trang app con (SqlDataModule)
   └─ OUTPUT/<phân hệ>/<ngày>/ ← file tải về (nguồn ETL)
```
