# [CODE-REPORT] TASK-001 — Coder hoàn thành

> **Vai:** Coder (Trợ lý Freebuff) · **Ngày:** 02/10/2026
> **Worktree:** `giong-vn-v6-pipeline` / nhánh `pipeline-work` · repo con cùng nhánh
> **Số đã claim:** GĐ 294 / C.144 (registry commit `3b12227`)

---

## Kết quả

| Mục | Giá trị |
|---|---|
| Commit code | **`ba9b807`** (repo con, nhánh pipeline-work) |
| File sửa | 1 file — `apps/banhang/src/routes/api/-smed.ts` (+6 dòng) |
| Nội dung | +2 entry `bank-tcb-chitiet` / `bank-tcb-tonghop` vào `SQL_SOURCES_BY_QUERY` |
| reportKey | `bank-tcb` (whitelist createSmedJob dòng 701 sẵn) |
| table | `bank_tcb_tx` (khớp REPORT_SOURCE_TABLES agent C.130) |
| label | `Sao kê ngân hàng TCB (tool 41 — OUTPUT\16.BANK_TCB)` — đúng pattern VCB |
| Typecheck | `npx tsc --noEmit` — **0 lỗi** |

## Đúng phạm vi plan mục 3

- ✅ CHỈ sửa 1 file `-smed.ts` (+6 dòng: 4 comment + 2 entry)
- ✅ KHÔNG đụng: trang TCB, SqlDataModule, tầng agent, phân quyền (đã sẵn sàng)
- ✅ Label chứa folder `OUTPUT\16.BANK_TCB` (plan mục 4-rủi ro 2)

## Sự cố đã xử lý trong phiên (ghi cho Tester/Reviewer tham khảo)

1. **Commit cũ `eedc272` ghi SAI số GĐ 292/C.142** (số đã dùng cho việc điều tra
   KPI khác) — phát hiện khi vào vai Coder. Xử lý đúng nguyên tắc KHÔNG viết
   lại lịch sử (GĐ 242): `git revert eedc272` (`23e4e03`) → commit lại đúng số
   GĐ 294/C.144 (`ba9b807`). Lịch sử chỉ đi tới.
2. **2 lần insert sai vị trí** do anchor match không chuẩn (dòng `tonghop` đứng
   SAU `chitiet` trong map + CRLF) — lần 1 dính liền dòng VCB, lần 2 mất dòng
   chitiet. Sửa sạch bằng `git checkout --` + chèn lại MỘT lần theo dòng
   (split CRLF → splice) — pattern "sửa JSX lớn 1 lần sạch" GĐ 58.
3. **Lesson ghi nhận:** khi chèn code vào file CRLF bằng script, phải tìm MỐC
   THEO DÒNG (split + findIndex) thay vì indexOf chuỗi — chuỗi anchor dễ trùng
   ở nhiều vị trí gây chèn sai chỗ.

## Phân tích so plan

- Plan mục 3 chỉ định chính xác vị trí (dòng 210-211 cạnh VCB) — đã chèn đúng.
- Plan mục 4-rủi ro 1: chuỗi `bank-tcb` / `bank_tcb_tx` khớp tuyệt đối tầng agent
  (grep QUERY_KEYS sql_reports.py — C.130) ✅
- Plan mục 4-rủi ro 4: reportKey `bank-tcb` có sẵn whitelist — KHÔNG thêm gì ✅

## Bàn giao Tester

- Chạy 6 tiêu chí plan.md mục 6 (hộp hiện + format giống VCB + chuỗi C.50 +
  hồi quy + typecheck + phạm vi diff).
- Lưu ý: tính năng checkbox cần dev server app con (start-local.bat, port 3100).
- Commit trên nhánh `pipeline-work` — chưa merge main, chưa push (đúng quy trình).
