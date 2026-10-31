# entire-graph — đồ thị code BỔ SUNG (GĐ 602 · PA-2 ĐH chốt 31/10/2026)

Đồ thị code cục bộ (tree-sitter, 100% local — `doctor` xác nhận `no_egress=true`,
không network/API key/telemetry). Là **nguồn tra cứu BỔ SUNG** cho codegraph +
codebase-memory (mục 14 AGENTS.md), KHÔNG thay thế.

## Dùng cho 3 việc (đúng phạm vi, tránh trùng công cụ)

1. **Tra code REPO CON `giong-apps`** — codegraph chưa index repo này (204 file
   Python nghiệp vụ: agent + ETL + builder); CBM chỉ có `apps/banhang`.
2. **Co-change** — trước khi sửa hàm/interface hay đổi: xem file nào HAY ĐỔI CÙNG
   theo lịch sử git (thứ codegraph/CBM không có).
3. **Semantic diff trước Push** — `diff --base main --head <nhánh>`: symbol
   added/removed/signature-changed kèm số dependents (rà trùng lặp đa agent).

## TỰ ĐỘNG (GĐ 606 — Đại Ca yêu cầu 31/10: "không phải gõ lệnh thủ công")

Hook ZCode tự chạy — **không ai phải gõ lệnh**:

| Event | Việc tự động | Throttle |
|---|---|---|
| `UserPromptSubmit` | Tra code liên quan cho câu Đại Ca vừa giao → **chèn thẳng vào hội thoại** (agent thấy ngay, không tốn lượt gọi) | 1 lần/4 phút/phiên · budget 9s · ≤1.800 ký tự |
| `PreToolUse` (Edit/Write) | File sắp sửa → báo **file HAY ĐỔI CÙNG** (co-change, git history) để cập nhật kèm | 1 lần/file/phiên · budget 6s |
| `SessionStart` | Prewarm cache chạy **nền** (mở phiên là cache ấm, không chặn) | — |

Cài ở **2 tầng**: user config `~/.zcode/cli/config.json` (chạy ngay, ZCode không hỏi)
+ workspace `.zcode/config.json` trong repo (chuẩn, share qua git; ZCode có thể hiện
banner "workspace hooks" — bấm Cho phép 1 lần, **không bắt buộc** vì tầng user đã chạy).

- Cài lại cho máy mới: `python scripts/tools/entire-graph/install-zcode-hook.py`
- **Kiểm chứng hook chạy**: xem `<git-common-dir>/giong-tools/entire-graph/cache/hooks.log`
  (mỗi lần chạy ghi 1 dòng: mode · kết quả · độ dài chèn).
- An toàn: hook LUÔN exit 0 + fail-open; repo không có đồ thị → in `{}` (không chèn gì,
  không bao giờ chặn phiên).

## Cách gọi (luôn dùng wrapper `eg.sh`)

```bash
bash scripts/tools/entire-graph/eg.sh query --head --format agent --max-context-bytes 4096 --query "<mô tả việc>"
bash scripts/tools/entire-graph/eg.sh impact --head --symbol bccn_dattruoc
bash scripts/tools/entire-graph/eg.sh def --head cleanAddress
bash scripts/tools/entire-graph/eg.sh diff --base main --head agent-cli -- src/
```

Wrapper tự tìm binary + tự cố định `--repo` và `--cache-dir`. **KHÔNG gọi binary
trực tiếp mà thiếu `--cache-dir`** — cache sẽ rơi vào ổ C (vi phạm mục 15 AGENTS.md).

## Vị trí cài (không commit vào git)

| Thành phần | Đường dẫn |
|---|---|
| binary (87 MB) + cache | `<git-common-dir>/giong-tools/entire-graph/` — **dùng chung mọi worktree** của repo, nằm TRONG dự án |
| hook prewarm | `<git-common-dir>/hooks/post-commit` (chạy nền sau mỗi commit, throttle 10 phút) |
| log prewarm | `<git-common-dir>/giong-tools/entire-graph/cache/prewarm.log` |

**Máy / worktree / clone mới:** chạy 1 lần cho MỖI repo:

```bash
bash scripts/tools/entire-graph/install.sh              # app tổng (cài luôn hook)
bash scripts/tools/entire-graph/install.sh --repo giong-apps   # repo con (hook riêng)
```

## Vận hành & bẫy đã gặp thật (GĐ 601/602)

- **Cache**: chỉ hit khi lặp lại ĐÚNG bộ flag + profile + cùng cây commit. Đổi flag
  (VD `--max-context-bytes`) hoặc commit mới ⇒ dựng lại. Hook prewarm giữ cache ấm
  sau mỗi commit ⇒ query thường ~9s (thay vì 16–28s cold).
- **`diff`/`commit`/`checkpoint`/`verify` KHÔNG nhận `--cache-dir`** (v0.6.0) — `eg.sh`
  đã tự xử lý.
- **`--profile full` cho query + index**: `index` mặc định `full`, `query` mặc định
  `fast` — lệch profile là cache-miss (wrapper/AGENTS.md dùng `full` cho cả hai).
- **Markdown nhiễu**: app tổng có 303 file `.md` = 65% symbol ⇒ đã loại trong
  `.graphignore` (mỗi repo) cùng ảnh/attachments. Vì vậy mỗi query in 1 dòng
  `warning W_REPO_IGNORED_SOURCE … N files excluded by .graphignore` — **bình thường,
  không phải lỗi**, đó là báo cáo số file bị loại có chủ đích (app tổng: 359 file).
- **Hạn chế**: SQL Server T-SQL (`migrations/*.sql`) parse lỗi một phần; 1 file TSX
  (`src/routes/huong-dan.tsx`) có `&` chưa escape trong JSX → parser báo E_PARSE_ERROR.
- **Nâng version công cụ**: sửa `VER` trong `install.sh`, xoá
  `giong-tools/entire-graph/bin/entire-graph.exe`, chạy lại `install.sh` (cache tự dựng lại).
