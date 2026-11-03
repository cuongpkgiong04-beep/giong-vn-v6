# Bằng chứng: MISA AMIS có/không template NHẬP KHẨU EXCEL cho chứng từ BÁN HÀNG

**Nguồn:** bundle JS công khai của MISA AMIS Kế toán (CDN `actappg2.misacdn.net`), phiên bản
`v=97.1.2.13`, tải ngày **03/11/2026** bằng `curl` — **chỉ ĐỌC file tĩnh, không đăng nhập,
không gọi API nghiệp vụ, không ghi gì lên MISA**.

- Shell: `https://actapp.misa.vn/app`
- `chunks/pjs.index-CjLeXIEHr15R2Dc7CQ_k.js` (3,5 MB — danh sách 2.450 chunk + route)
- `chunks/pjs.enumeration-*.js` (194 KB — ĐÃ LƯU: `pjs.enumeration.js`)
- `chunks/pjs.Import-BUHdIwfmwtPksbgHpTez.js` (74 KB — ĐÃ LƯU: wizard nhập khẩu)
- `chunks/pjs.ImportAPI-*.js` (4 KB — ĐÃ LƯU: lớp gọi API nhập khẩu)
- `cfg/config.js` (180 KB — cờ cấu hình `window.__env.*`)

## 1. Enum `RefTypeCategory` — mã loại chứng từ nhập khẩu (trích `pjs.enumeration.js`)

```
SAInvoice:300, PUOrder:301, PUVoucher:302, PUReturn:303, PUDiscount:304, PUService:305,
SAQuote:351, SAOrder:352, SAVoucher:353, SAReturn:354, SADiscount:355, SARevenueAllocation:361,
...
SUIncrement:450, SUTransfer:451, SUDecrement:452, SUAllocation:453, SUAdjustment:454, SUAudit:455,
InventoryItem:9010, AccountObjectCustomer:9020, AccountObjectVendor:9021, Employee:9022, ...
```

→ **`SAVoucher:353`** = "Chứng từ bán hàng hóa, dịch vụ" — tức MISA *có* định danh loại chứng từ
bán hàng trong không gian mã dùng cho nhập khẩu (302 = mua hàng đang dùng production khớp đúng enum này).

## 2. Wizard nhập khẩu CÓ nhánh riêng cho chứng từ bán hàng (trích `pjs.Import-BUHdIwfmwtPksbgHpTez.js`)

```js
case a.RefType.PUVoucherImport: return e.$t("I18NPurchase.PUImportTitleIE");
case a.RefType.PUService:       return e.$t("I18NPurchase.PUServiceTitleIE");
case a.RefType.SAVoucher:       return e.$t("i18nSA.SAVoucher.SAVoucherImportTitle");   // ← CÓ
case a.RefType.SAInvoice:       return e.$t("i18nSA.SAInvoice.SAInvoiceImportTitle");   // ← CÓ
case a.RefType.SAVoucherService:return e.$t("i18nSA.SAVoucher.SAServiceImportTitle");   // ← CÓ
...
t.refTypeImport == a.RefType.SAVoucher && !t.$ms.session.UseMeInvoice
    && await k.initCrossSell("import-receipt-cross-sell", "import-receipt");
// tuỳ chọn riêng của nhập khẩu bán hàng:
HasSalesByProductCombos && importType === ImportType.Ref
    && (refTypeImport == RefType.SAVoucher || refTypeImport == RefType.SAOrder)
// bảng dữ liệu sau khi nhập:
case RefType.SAInvoice: case RefType.SAVoucherService: case RefType.SAReturn: case RefType.SAVoucher:
    e.voucherTableName = a.VoucherListCode.SAVoucherList;
```

`ImportType` enum = `{Ref:0, Dictionary:1, Opening:2}` (chứng từ dùng `Ref:0` — đúng tham số
`importType=0` mà tool GIONG đang truyền).

## 3. Endpoint liệt kê loại nhập khẩu (trích `pjs.index-*.js`)

```js
import_item: new mt({ key:"import_item", apiURL: de.ImportAPI + "/import/types", expTime: 0 })
```

→ `GET https://actapp.misa.vn/g2/api/import/v1/import/types` trả về **danh sách loại chứng từ
nhập khẩu khả dụng của tenant** (server-driven). **Đây là phép thử rẻ nhất để chốt CÓ/KHÔNG.**

## 4. Route wizard: `/Ultilities/Import/:id?` (name `Import`), `ImportAPI` 6 bước

`getConfig(refType)` · `getSheets` · `step2(...importType, refType, tableName, voucherType,
isFullTemplate, customParam(base64), isAutoMergeColumnWithMISAAVA)` · `step3` · `worker/check_step3`
· `step4` · `worker/check_step4` — **giống hệt 6 bước tool GIONG đang dùng**
(`giong-apps/apps/banhang/agent/misa_http_api.py`).

Các route nhập khẩu có mặt trong `EnumIsVisibleFeature` (map tính năng): 301 PUOrder · 9040 PUContract ·
3040 PUDiscount · 3030 PUReturn · **3510 SAQuote · 3520 SAOrder · 9041 SAContract · 3540 SAReturn ·
3550 SADiscount** · 2040/2050/2051 lệnh SX · 250 TSCĐ.
⚠️ Map này **KHÔNG đầy đủ** (thiếu cả 302 mua hàng + 2014/2022/2030/2060 kho — những loại đang chạy
thật ở production) ⇒ **vắng mặt trong map KHÔNG phải bằng chứng vắng tính năng**.

## 5. Vì sao cần Bước 0 (kiểm chứng 1 lần, ~10 request, chỉ đọc)

GĐ 569 (29/10/2026) từng kết luận "BÁN HÀNG không có template (quét dải 300–360 = 0 cột)".
Bằng chứng bundle ở trên **mâu thuẫn** với kết luận đó ⇒ nghi vấn lớn nhất: đợt quét dùng tham số
khác với wizard thật (`tableName` đoán, `isFullTemplate`, `voucherType`) hoặc dải quét không trùm
`353/sa_voucher`. Phép thử chốt:

1. `GET /g2/api/import/v1/import/types` → xem danh sách loại (1 request).
2. `step2` với `(refType=353, tableName=sa_voucher)` + biến thể `isFullTemplate=true`,
   `voucherType=0/1` → đếm số cột trả về (mỗi biến thể 1 request; dừng trước `step3` ⇒ **không ghi gì**).

Điều kiện: cần **phiên MISA** (`.secrets/misa_http_session.json` đã hết hạn 31/10 22:33 —
phải đăng nhập lại, nên cần ĐH cho phép + chọn tài khoản không đá phiên đang chạy job).
