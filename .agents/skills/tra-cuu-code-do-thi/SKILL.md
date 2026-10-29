---
name: tra-cuu-code-do-thi
description: "Dùng khi cần tìm, hiểu hoặc đánh giá ảnh hưởng của code trong dự án GIONG (app tổng TanStack Start, app con banhang + agent Python, migrations SQL): tra ĐỒ THỊ CODE trước khi grep/Read từng file. Cũng dùng khi cần biết 'sửa file này thì phải chạy test nào', 'hàm này ai gọi', 'luồng X chạy qua những đâu'."
---

# Tra cứu code bằng đồ thị (thay vì grep + Read từng file)

Dự án này có **2 MCP server** đã cắm sẵn ở user-scope (`~/.zcode/cli/config.json`), index cục bộ, không gửi code đi đâu:

| Công cụ | Dùng khi | Gọi thế nào |
|---|---|---|
| **codegraph** | Hỏi 1 câu → trả **nguồn thật (kèm số dòng) + đường gọi + phạm vi ảnh hưởng**. Rẻ context (1 tool). | `codegraph_explore` (MCP) hoặc CLI `codegraph explore "<câu hỏi>"` |
| **codebase-memory** | Truy vấn sâu: ai gọi ai nhiều tầng · Cypher · git diff → symbol ảnh hưởng + test impact · kiến trúc · ADR | 17 tool MCP: `search_graph` · `trace_path` · `query_graph` · `detect_changes` · `get_architecture` · `manage_adr` … |

## Quy tắc thứ tự (quan trọng)
1. **Hỏi đồ thị TRƯỚC**, không grep mò. Ví dụ: `codegraph explore "job upload MISA bán hàng tạo phiếu từ dữ liệu nào"`.
2. Chỉ **Read đúng dòng** cần sửa sau khi đã biết chính xác file:dòng.
3. Trước khi commit: `codegraph affected <file-đã-sửa>` → chạy **đúng** test bị ảnh hưởng.
4. Đồ thị là **phân tích TĨNH** — không thay thế đối chứng bằng chứng (probe DB/file thật).

## Lệnh CLI hay dùng (khi không qua MCP)
```bash
CG="D:\DuLieuChung\CUONG_2026\Github\_tools-codegraph\node_modules\.bin\codegraph"
"$CG" explore "câu hỏi"            # tra 1 phát: nguồn + call path + blast radius
"$CG" affected src/lib/xyz.ts      # file nào/test nào bị ảnh hưởng
"$CG" impact <symbol>              # phạm vi ảnh hưởng khi sửa symbol

CB="D:\DuLieuChung\CUONG_2026\Github\_tools-cbm\cbm\codebase-memory-mcp.exe"
export CBM_CACHE_DIR='D:\CBMState\cache' CBM_RUNTIME_DIR='D:\CBMState\runtime'   # BẮT BUỘC
"$CB" cli detect_changes --project D-DuLieuChung-CUONG_2026-giong-vn-v6
"$CB" cli query_graph --project <tên> --query "MATCH (f:Function) WHERE NOT EXISTS { (f)<-[:CALLS]-() } RETURN f.name LIMIT 10"
```

## Bẫy đã gặp thật (GĐ 568 — đừng mất thời gian lại)
- **CBM cần 2 biến môi trường state**: `CBM_CACHE_DIR=D:\CBMState\cache`, `CBM_RUNTIME_DIR=D:\CBMState\runtime`. Để mặc định → chết vì kiểm tra DACL của công cụ (`could not load saved runtime settings` / `secure CLI coordination could not be created`). Hai thư mục này đã tạo sẵn với ACL chỉ-chủ-sở-hữu trên **Ổ D** — **đừng xoá** (mất là phải index lại từ đầu).
- **Quy tắc lưu trữ dữ liệu (mục 15 AGENTS.md — ĐH chốt 29/10):** dữ liệu dự án (index/cache/state/backup) **KHÔNG đặt trên ổ C**; ưu tiên trong thư mục gốc dự án. Riêng state CBM buộc phải ở `D:\CBMState` (ổ D, cạnh dự án) vì công cụ từ chối mọi đường dẫn có thư mục cha cấp quyền GHI cho "identity không tin cậy" (Everyone · Authenticated Users — kể cả kế thừa từ gốc ổ D; junction cũng bị chặn). Chi tiết + bằng chứng: entry GĐ 576.
- **File rác tên thiết bị Windows** (`nul`, `con`, `aux`, `prn`): có 1 file `nul` là CBM **hủy index ngay** (`aborted_previous_preserved`, chết trong ~4s). Đã xoá + thêm guard trong `.cbmignore`; nếu gặp lại → xoá bằng đường dẫn `\\?\D:\...\nul`.
- Index theo **từng working tree** (repo này có 3 worktree) — mỗi nơi một index riêng.
- `.cbmignore` (gốc repo) loại dữ liệu/runtime (OUTPUT, LOG, cache_, *.xlsx...) khỏi đồ thị — sửa file này thì index lại mới có hiệu lực.
- Sau khi pull/đổi nhiều file: `codegraph sync`; CBM gọi lại `cli index_repository --repo-path <thư mục>`.
