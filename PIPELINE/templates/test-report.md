# [TEST-REPORT] [TASK-XXX]

> **Người test:** Tester (tên agent) · **Ngày:** …/…/2026
> **Môi trường:** worktree pipeline (merge main lúc …h…m) · local dev / production?
> **Kết luận chung:** 🟢 PASS / 🔴 FAIL / 🟡 PASS CÓ ĐIỀU KIỆN

---

## 1. Kết quả từng tiêu chí (plan.md mục 6)

| # | Tiêu chí | Cách đã test | Kết quả | Bằng chứng |
|---|---|---|---|---|
| 1 | | | ✅/❌ | *(output/ảnh/đường dẫn screenshot)* |
| 2 | | | ✅/❌ | |

## 2. Bộ kiểm tra nền (kỹ thuật)

| Kiểm tra | Lệnh | Kết quả |
|---|---|---|
| Typecheck app tổng | `node scripts/typecheck.mjs` | |
| Typecheck repo con | `npx tsc --noEmit` (nếu đụng) | |
| Unit test | `node --experimental-strip-types --test src/lib/*.test.ts` | N/N |
| Build | `npm run build` / `vite build` | |
| Dev server | `start-local.bat` → HTTP 200 2 port | |

## 3. Bug phát hiện (nếu FAIL)

> FAIL = điền bảng này + cập nhật status.json stage = `code_fix` + trả Coder.

| # | Bug | Bước tái hiện | Lỗi thấy được | Đề xuất hướng fix (cho Coder) |
|---|---|---|---|---|
| 1 | | | | |

## 4. Cần Đại ca test trên thiết bị thật (nếu có)

*(Camera/GPS/notification — môi trường agent không đủ. Nêu chính xác bước test.)*

## 5. Đối chứng số liệu (nếu task liên quan data)

| Nguồn so sánh | Số liệu | Khớp từng đồng? |
|---|---|---|
| | | |

---
*Tester KHÔNG sửa code — bug ghi ở mục 3, quyền sửa thuộc Coder.*
