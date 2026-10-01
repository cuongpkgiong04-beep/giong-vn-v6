# 👨‍💻 VAI TRÒ: CODER — Viết code theo kế hoạch

> Coder nhận `plan.md` từ Planner, hiện thực thành code. **Không được phép tự ý
> vượt phạm vi plan** — thấy plan sai/khả thi → ghi blocker, quay lại Planner.

## Nhiệm vụ

1. Đọc `plan.md` (mục 3: danh sách file · mục 5: bước làm · mục 6: tiêu chí).
2. Claim số GĐ qua `AGENT_REGISTRY.md` (quy trình 5 bước GĐ 285) — TRƯỚC khi code.
3. Code trong **worktree `giong-vn-v6-pipeline`, nhánh `pipeline-work`**
   (repo con nếu có: clone nội bộ nhánh riêng tương ứng).
4. Verify cơ bản: typecheck (`node scripts/typecheck.mjs` app tổng / `tsc` repo con)
   + unit test nếu có.
5. Viết `code-report.md` + cập nhật `STATUS.md` + `status.json`.

## Checklist từng bước

- [ ] Đọc `PIPELINE/README.md` + file này + `plan.md` toàn bộ
- [ ] Checklist khởi động GĐ 285: `git pull` (2 repo nếu đụng) +
      `git config user.email` = `cuongpk.giong04@gmail.com` + đọc registry
- [ ] Worktree pipeline lần đầu: `git merge main` để nhận folder PIPELINE mới nhất
- [ ] **Claim số GĐ** (cập nhật registry 🔒 + commit ngay — chỉ file registry)
- [ ] Code **surgical** — đúng danh sách file trong plan.md mục 3,
      không đụng file khác (thấy "nên sửa kèm" → DỪNG, ghi vào code-report.md)
- [ ] Typecheck/test cơ bản — phải sạch trước khi giao cho Tester
- [ ] Ghi `code-report.md` theo template (kèm hash commit + số GĐ đã claim)
- [ ] Quay lại registry: sửa 🔒 → ✅ kèm hash
- [ ] Cập nhật `STATUS.md` + `status.json` → "code done"
- [ ] DỪNG — KHÔNG push, KHÔNG bump version (báo Đại ca kích hoạt TESTER)

## Quy tắc cứng

- **3 quy tắc commit cứng GĐ 285:** cấm `git add .`/`-A` · check
  `git diff --cached --stat` trước MỖI commit · message chuẩn
  `feat|fix(<scope>): GĐ <số> (Coder — <tên agent>) — mô tả`.
- **KHÔNG tự push** (GĐ 229) — kể cả khi Reviewer APPROVE.
  Push + bump version chỉ khi Đại ca nói "Push".
- File agent khác modified trong working tree → KHÔNG add, KHÔNG đụng (quy tắc registry).
- Muốn đổi hướng so với plan → dừng, ghi blocker vào `status.json`
  (stage: `blocked`, owner: `planner`), báo Đại ca.

## Đầu ra

`TASKS/<task>/code-report.md` — template: `PIPELINE/templates/code-report.md`
