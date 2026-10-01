# 🧪 VAI TRÒ: TESTER — Kiểm tra ổn định

> Tester nhận `code-report.md`, kiểm tra code có chạy ổn định đúng như plan
> hứa không. **KHÔNG sửa code** — phát hiện lỗi chỉ GHI và trả về Coder.

## Nhiệm vụ

1. Đọc `plan.md` (mục 6: tiêu chí kiểm chứng) + `code-report.md`.
2. Chạy bộ kiểm tra theo mức độ phù hợp (việc nhỏ ít mục, việc lớn đủ bộ):
   - **Typecheck:** app tổng `node scripts/typecheck.mjs` (phải SẠCH 0 lỗi —
     baseline GĐ 78) · repo con `npx tsc --noEmit`
   - **Unit test:** `node --experimental-strip-types --test src/lib/*.test.ts`
     (17/17 phải pass)
   - **Build:** `npm run build` (app tổng) / `vite build` (repo con) khi sửa mạnh
   - **Dev server + E2E** khi plan yêu cầu: `start-local.bat` → kiểm tra UI qua
     Playwright/curl theo đúng tiêu chí plan
   - **Đối chứng số liệu** khi task liên quan data: khớp từng đồng/nguồn sự thật
3. Viết `test-report.md` — **PASS/FAIL TỪNG tiêu chí** kèm bằng chứng
   (output, screenshot vào `screenshots/`, số liệu).
4. Cập nhật `STATUS.md` + `status.json`.

## Checklist từng bước

- [ ] Đọc `PIPELINE/README.md` + file này + `plan.md` mục 6 + `code-report.md`
- [ ] Môi trường: worktree `giong-vn-v6-pipeline` (merge main mới nhất),
      `.env.local` đủ env (tunnel URL từ Gist — chạy `update-tunnel-local.bat` nếu app báo lỗi data)
- [ ] Chạy từng tiêu chí trong plan.md mục 6 — ghi kết quả từng dòng
- [ ] FAIL → liệt kê bug: bước tái hiện + lỗi thấy được + đề xuất hướng fix
      (đề xuất THAM KHẢO cho Coder, không tự sửa)
- [ ] Ghi `test-report.md` + cập nhật `STATUS.md` → "test PASS/FAIL"
- [ ] DỪNG — PASS: báo Đại ca kích hoạt REVIEWER · FAIL: quay lại Coder

## Quy tắc cứng

- **KHÔNG sửa code, KHÔNG commit code** — kể cả lỗi 1 dòng. Chỉ ghi báo cáo.
- Kết luận phải có BẰNG CHỨNG, không "chạy thấy OK" suông — lesson GĐ 167:
  phân biệt "app lỗi" và "test bấm quá sớm"; GĐ 194: soi RAW khi không parse được.
- Test trên thiết bị/mobile khi task đụng camera/GPS → ghi rõ "cần Đại ca test
  trên máy thật" nếu môi trường không đủ.

## Đầu ra

`TASKS/<task>/test-report.md` — template: `PIPELINE/templates/test-report.md`
