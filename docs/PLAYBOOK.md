# PLAYBOOK GIONG — TRA THEO TRIỂU CHỨNG

> **GĐ 702 (06/11/2026)** — lớp 3 của hệ thống tri thức: gặp triệu chứng → tra
> 1 cú thay vì đọc lại entry kể chuyện. Mỗi dòng = triệu chứng → chẩn đoán/fix
> chuẩn đã từng xong → số GĐ để tra chi tiết (AGENTS_ARCHIVE.md / AGENTS.md).
> Quy tắc duy trì: GĐ nào có bài học mới theo 1 triệu chứng đã có → sửa dòng đó;
> triệu chứng mới → thêm dòng. Xóa bài học phải có cờ `[shared-approved]`.

## A. Đăng nhập / Deploy / Production

| Triệu chứng | Chẩn đoán & fix chuẩn | GĐ |
|---|---|---|
| Sau push "sai mật khẩu/không đăng nhập được" | ENV Vercel thiếu/lệch — KHÔNG phải code. Verify `DATABASE_URL` + `APP_JWT_SECRET` (CẢ 2 app CÙNG giá trị) + tunnel; thiếu → DỪNG, sửa env → redeploy theo URL | 463 |
| SSO app con fail: 302 về login?next=… | Token 60s có thể hết hạn → ký TOKEN MỚI thử lại TRƯỚC; vẫn fail = APP_JWT_SECRET lệch giữa 2 app | 470 |
| Push xong production không đổi | Vercel build fail im lặng: thiếu file components/ui + gói ngoài lock (@tanstack/react-query) — local xanh ≠ Vercel xanh | 617 |
| Curl lần đầu không thấy version mới | Domain có thể ghim deployment cũ — verify 3 bước: vercel ls + hash chunk LIVE + grep chuỗi fix trong chunk | 306/402/665 |
| App tổng sống mà app con lỗi "Chưa đăng nhập" | Luồng SSO: ký JWT iss/aud đúng trong payload; test phải có iss=app tổng, aud=app con | 559 |
| Trang trắng app con (tsc/build vẫn xanh) | (1) Hàm component khai báo 2 lần lồng nhau — grep `function` trùng; (2) thiếu QueryClientProvider (__root app con) | 634 |
| Local chạy được, LAN không thấy fix | Bundle LAN lệch HEAD — F5/hard reload tab; builder agent chạy lại mỗi job = thấy ngay | — |

## B. Agent / Service / Máy LAN

| Triệu chứng | Chẩn đoán & fix chuẩn | GĐ |
|---|---|---|
| Chrome CDP `ECONNREFUSED` | Chrome không chạy → mở bằng scheduled task `GIONG_ChromeCDP`/`GIONG_ChromeMISA`, KHÔNG qua phiên SSH | 553 |
| CDP treo WS: `/json/version` 200 nhưng connect timeout 180s | `Get-Process chrome \| Stop-Process` TOÀN BỘ (kill theo cmdline chưa đủ) rồi mở lại task; `cdp_watchdog.py` tự làm 4.9s | 556 |
| Job treo % không nhảy (VD 66%) | % = % TẢI NGUỒN; nguồn lỗi không bao giờ done — `report_wake.py` đánh thức; nền đỏ 2h trên web | 556 |
| Restart service không đổi hành vi | api_server KHÔNG chết theo `sc stop` → taskkill python.exe; xóa `__pycache__` 3 thư mục (agent/api_server/etl) trước | 168/329 |
| Worker LAN không chạy / env rỗng | NSSM không đọc .env → dùng `cmd /c <máy>.env.bat`; AppDirectory dính `"` → log rỗng; watchdog = TimeTrigger 5' | 534/546 |
| Task không chạy lại / icon khay vô hình | `schtasks /end` trước `/run` (đang Running thì bỏ qua); thiếu `/it` → session 0 icon vô hình; `schtasks /end` không kill python con | 546/548 |
| MISA đá phiên nhau / job chờ OTP | 1 tài khoản = 1 phiên; keepalive 30' tự login lại; OTP qua Gmail App Password + IMAP (tiêu đề = mã, hạn 7'; kích hoạt lại → mã cũ vô hiệu); phiên MISA còn sống phải mở tab MỚI qua CDP kiểm | 553 |
| Job báo lỗi oan "invalid?" MISA | index tìm kiếm trễ → retry 5×12s; "đã có" phải kiểm is_posted_finance + ghi sổ bù | 661 |
| MISA báo InvalidInvno ×n | Tìm existing SA DÙNG filter sai property — ai_search + upsert giữ refid; xem phiếu đã ghi sổ chưa trước khi tạo | 638 |
| Deploy code ETL/agent lên máy LAN | PHẢI đủ 4 máy (.250/.14/.245/.11): scp -O + MD5 + py_compile; bash heredoc cắt file dài im lặng → `wc -l` kiểm; PowerShell qua SSH phải truyền stdin | — |
| Python trên máy chủ | Service NSSM trỏ cứng Python 3.10 — nâng cấp là rủi ro (Pillow phải 11.x trên 3.13) | — |

## C. Dữ liệu / ETL / GionDB

| Triệu chứng | Chẩn đoán & fix chuẩn | GĐ |
|---|---|---|
| Số báo cáo sai so với file gốc | Đối chứng TỪNG ĐỒNG với nguồn trước khi tin; ETL rebuild-ngày (folder có file mới → nạp lại TOÀN folder, bỏ hash-skip) | 277/403 |
| Job báo "done thiếu file" oan | api_server INSERT thiếu expected_files (DEFAULT 19); audit + tải bù bằng `scripts/gd554_audit_backfill.py` | 554/584 |
| SQL SELECT 500 im lặng | **CẤM DATETIMEOFFSET** qua tunnel pyodbc (ODBC -155) — dùng DATETIME2; ALTER phải drop index/default + commit từng lệnh + kiểm INFORMATION_SCHEMA | 635 |
| SQL lỗi "Database does not exist" | Typo **GiondDB → GiongDB** (mục 17); từng gây 85 báo cáo chặn ETL | 547 |
| `/exec` chạy xong không thấy kết quả | /exec không trả SELECT — dùng `sqlcmd -y 0` + SFTP đọc log | — |
| Tên file SMED mới không vào ETL | SMED đổi tên file (NXT 6 chữ số) → regex ETL center=None — nạp lại 3 ngày sau fix | 642 |
| Login SMED fail toàn hệ | SMED đổi UI locator ("Tên Đăng Nhập") → helper `smed_resilient_helpers.py`; username nạp sai trong DB (chép nhầm); tài khoản bị bắt đổi mật khẩu | 615/638/661 |
| Bccn số thay đổi khi chạy lại | Job = SNAPSHOT thời điểm tính; nguồn SMED đổi → số kỳ cũ đổi; lượt trả ≤ đến kỳ mới pop | 13.1 |
| Egress Neon đầy | KHÔNG `select *` bảng payload lớn (result_full 6-8MB/job) — liệt kê cột cụ thể; payload lớn chỉ tải khi bấm xem | 159 |
| Nhiều phiên MISA cùng lúc đá nhau | Máy nào giữ phiên gì xem memory "phien-misa-mot-tai-khoan-cuu-ho"; cứu hộ = máy chủ core chỉ cho job chờ >15' | 553 |

## D. Quy trình đa Agent / Git

| Triệu chứng | Chẩn đoán & fix chuẩn | GĐ |
|---|---|---|
| Trùng số GĐ | claim.py TRƯỚC khi làm (khóa .git chống race); trùng thì ai commit trước giữ số — entry cũ đánh ⛔ | 285/535 |
| Commit nuốt/xóa bài phiên khác | KHÔNG `git add .` — add tường minh; file dùng chung qua `shared-doc.py commit --entry`; hook pre-commit chặn xoá entry; dọn/tách archive → `[shared-approved]` | 495 |
| Commit vào file đang dở của phiên khác | `git diff HEAD` + lọc hunk; GHÉP BLOB lên HEAD (repo con `GIONG_SHARED_OK=1`); ghép entry mình lên bản HEAD qua cổng | 470/590 |
| SSH push "Permission denied (publickey)" ngập đầu | Thường nhất thời — thử lại trước khi sửa config; GIT_SSH_COMMAND path có khoảng trắng → gãy | 665 |
| Context tràn / phiên chết | Think in Code (script đếm/lọc, chỉ in kết quả nhỏ); AGENTS.md ≥2.000 dòng → tách archive; context ~70% → checkpoint + mở phiên mới | 319/450 |
| Version bump sai (x.10.y) | Checklist 3 bước: xác định loại → mỗi phần 1 chữ số (9→0 nhớ trái) → ghi 2 nơi + grep; sót số cũ trong package-lock = thư viện ngoài — giữ nguyên | 138/328 |

## E. UI / E2E

| Triệu chứng | Chẩn đoán & fix chuẩn | GĐ |
|---|---|---|
| So chuỗi E2E lệch | innerText chứa NBSP (U+00A0) — normalize trước khi so | 327 |
| Ô chọn ngày để gõ tay | **CẤM** — `input type="date"` bắt buộc (mục 18 AGENTS.md); validator nhận 2 format | 18 |
| Bảng mới lệch định dạng | 4 nguyên tắc mục 15.5 PROJECT_MAP; cột đơn giá không cộng subtotal (guard 2 lớp) | 21/09 |
| IAB/click locator timeout (mobile preview) | `cua.click` theo toạ độ; app con local = build + preview 8101 + tự ký JWT SSO | — |
