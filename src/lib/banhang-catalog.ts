/**
 * GĐ 199 (2026-09-22) — CATALOG PHÂN QUYỀN CHI TIẾT app con Bán hàng
 * ====================================================================
 * Nguồn sự thật duy nhất cho trang Phân quyền app tổng khi cấu hình quyền
 * CHI TIẾT app con: 8 NHÓM (bậc 2) + TỪNG LÁ (bậc 3/4 — báo cáo/phân hệ).
 *
 * ⚠️ ĐỒNG BỘ 2 NƠI (bắt buộc khi thêm nhóm/báo cáo MỚI — xem CHECKLIST cuối file):
 *   - App tổng:  src/lib/banhang-catalog.ts (file này)
 *   - App con:   giong-apps/apps/banhang/src/lib/nav.ts (cây sidebar) + smed-auth.ts (REPORT_GROUP + route→nhóm)
 *
 * Mô hình (chốt Đại ca 22/09): NHÓM + TỪNG LÁ — mỗi nhóm 1 toggle tóm tắt
 * (bật = bật cả nhóm), xổ ra toggle từng lá. Quyền lưu trong cùng ô
 * module_access JSONB hiện có (không migration mới):
 *   - Nhóm: 4 key cũ "banhang-*" GIỮ NGUYÊN (không vỡ quyền đang chạy) +
 *     4 key mới "bh-bao-cao-ke-toan" / "bh-bao-cao-kho" / "bh-bao-cao-marketing" /
 *     "bh-upload-misa-amis"
 *   - Lá: "bh-leaf-<routeLá>" (VD "bh-leaf-/m/misa-hoadon") — key = route lá, ổn định
 *
 * BACKWARD-COMPAT (chốt Đại ca — phương án 3):
 *   User ĐANG có quyền nhóm nào (config trước 22/09) → tự có đủ TẤT CẢ lá nhóm đó;
 *   đã bật "banhang" mà chưa config nhóm nào → đủ mọi nhóm + lá (giữ hành vi
 *   GĐ 108/143). Admin/SuperAdmin luôn đủ hết, không cần cấu hình.
 */

export type BhLeaf = {
  /** Route lá trong app con — đồng thời làm key quyền "bh-leaf-<to>" */
  to: string;
  /** Tên hiển thị trên trang Phân quyền (khớp nhãn nav.ts app con) */
  label: string;
};

export type BhGroup = {
  /** Key quyền lưu trong module_access */
  key: string;
  /** Nhãn hiển thị (khớp nhãn nhóm nav.ts app con) */
  label: string;
  leaves: BhLeaf[];
};

/** 8 nhóm bậc 2 của app con — 4 nhóm DOWNLOAD giữ key cũ + 4 nhóm mới. */
export const BH_GROUPS: BhGroup[] = [
  {
    key: "banhang-misa",
    label: "DỮ LIỆU TỪ MISAmeInvoice",
    leaves: [
      { to: "/m/misa-hoadon", label: "Bảng kê chi tiết hóa đơn đã sử dụng" },
      { to: "/m/misa-bkth", label: "Bảng kê hóa đơn đã sử dụng" },
    ],
  },
  {
    key: "banhang-banhang",
    label: "DỮ LIỆU TỪ SMED - BÁN HÀNG",
    leaves: [
      { to: "/m/smed-hdd", label: "Thống kê tình hình sử dụng HĐĐT" },
      { to: "/m/smed-doanhthu-doituong", label: "Thống kê DT theo đối tượng" },
      { to: "/m/smed-doanhthu-chuoi", label: "Thống kê DT tổng hợp Chuỗi" },
      { to: "/m/smed-chungtu-cuoi-ngay", label: "Bảng kê chung cuối ngày" },
      { to: "/m/smed-dt-blth", label: "Thống kê DT theo ĐT_BLTH" },
    ],
  },
  {
    key: "banhang-kho",
    label: "DỮ LIỆU TỪ SMED - KHO",
    leaves: [
      { to: "/m/kho-nhap", label: "Bảng kê nhập kho" },
      { to: "/m/kho-xuat", label: "Bảng kê xuất kho" },
      { to: "/m/kho-xnt", label: "Báo cáo nhập xuất tồn - Kế toán" },
    ],
  },
  {
    key: "banhang-marketing",
    label: "DỮ LIỆU TỪ SMED - MARKETING",
    leaves: [
      { to: "/m/mkt-chietkhau", label: "Báo cáo chiết khấu" },
      { to: "/m/mkt-hentiem", label: "Lịch hẹn tiêm" },
      { to: "/m/mkt-dattruoc", label: "Gói tiêm - Đặt trước Vắc Xin" },
    ],
  },
  {
    key: "bh-bao-cao-ke-toan",
    label: "BÁO CÁO KẾ TOÁN",
    leaves: [
      { to: "/m/bc-cuoi-ngay", label: "Báo cáo cuối ngày - Đối soát HĐ-XK" },
      { to: "/m/bc-truyxuat", label: "Báo cáo Truy xuất - Đối soát" },
      { to: "/m/bc-banhang", label: "Báo cáo bán hàng" },
      { to: "/m/bc-thu-tien", label: "Báo cáo thu tiền" },
      { to: "/m/bc-sd-hddt", label: "Báo cáo tình hình SD-HĐĐT" },
    ],
  },
  {
    key: "bh-bao-cao-kho",
    label: "BÁO CÁO KHO",
    leaves: [
      // GĐ C.68 (23/09/2026 — yêu cầu Đại ca): thứ tự 1→7 mới + 3 module mới
      // (ma trận nhập/xuất + kiểm kê cuối tháng) — ĐỒNG BỘ nav.ts repo con.
      { to: "/m/bc-nhap-kho", label: "Báo cáo nhập kho" },
      { to: "/m/bc-xuat-kho", label: "Báo cáo xuất kho" },
      { to: "/m/bc-xuat-huy", label: "Báo cáo xuất hủy" },
      { to: "/m/bc-tonkho-luong", label: "Báo cáo tồn kho theo lượng" },
      { to: "/m/bc-nxt-luong", label: "Báo cáo TH_NXT kho theo lượng" },
      { to: "/m/bc-nxt-luong-tien", label: "Báo cáo TH_NXT kho theo lượng-tiền" },
      { to: "/m/bc-kiem-ke", label: "Báo cáo kiểm kê cuối tháng" },
      { to: "/m/bc-matrix-nhap", label: "Báo cáo nhập kho — ma trận theo trung tâm" },
      { to: "/m/bc-matrix-xuat", label: "Báo cáo xuất kho — ma trận theo trung tâm" },
    ],
  },
  {
    key: "bh-bao-cao-marketing",
    label: "BÁO CÁO MARKETING",
    leaves: [
      { to: "/m/bc-tiem-ho", label: "Báo cáo tiêm hộ" },
      { to: "/m/bc-chietkhau-th", label: "Báo cáo tổng hợp chiết khấu" },
      { to: "/m/bc-congno-dattruoc", label: "Báo cáo công nợ đặt trước" },
      { to: "/m/bc-lich-hen", label: "Danh sách lịch hẹn tiêm" },
    ],
  },
  {
    key: "bh-upload-misa-amis",
    label: "UPLOAD - MISA AMIS",
    leaves: [
      { to: "/m/up-hoadon-gtgt", label: "UPLOAD Hóa đơn GTGT bán hàng" },
      { to: "/m/up-nhap-kho", label: "UPLOAD Bảng kê phiếu nhập kho" },
      { to: "/m/up-xuat-kho", label: "UPLOAD Bảng kê phiếu xuất kho" },
      { to: "/m/up-tecombank", label: "UPLOAD Ngân hàng TECOMBANK" },
      { to: "/m/up-tpbank", label: "UPLOAD Ngân hàng TPBANK" },
      { to: "/m/up-hoadon-dauvao", label: "UPLOAD Hóa đơn đầu vào" },
    ],
  },
];

/** Mọi key nhóm (8) — dùng vòng for, tránh suy diễn từ mảng literal. */
export const BH_GROUP_KEYS: string[] = BH_GROUPS.map((g) => g.key);

/** Mọi key lá (bh-leaf-*) — phẳng từ BH_GROUPS. */
export const BH_LEAF_KEYS: string[] = BH_GROUPS.flatMap((g) => g.leaves.map((l) => `bh-leaf-${l.to}`));

/**
 * Quyền hiệu lực của employee đối với app con (NHÓM + LÁ) — dùng ở app tổng
 * (trang Phân quyền + sso-token khi ký JWT). Logic backward-compat:
 *   Admin/SuperAdmin → đủ hết.
 *   Chưa bật "banhang" → không nhóm/lá nào (trừ Admin).
 *   Bật "banhang", chưa config nhóm nào → đủ hết (GĐ 108/143 compat).
 *   Bật "banhang", có config nhóm → nhóm nào true = đủ nhóm đó + TẤT CẢ lá của
 *   nhóm đó (quyền lá chỉ dùng để THU HẸP trong nhóm được bật).
 */
export function getBanhangDetailAccess(
  role: string | undefined,
  modules: Record<string, unknown>,
): { groups: Record<string, boolean>; leaves: Record<string, boolean> } {
  const isAdmin = role === "SuperAdmin" || role === "Admin";
  const groups: Record<string, boolean> = {};
  const leaves: Record<string, boolean> = {};

  if (isAdmin) {
    for (const g of BH_GROUPS) {
      groups[g.key] = true;
      for (const l of g.leaves) leaves[`bh-leaf-${l.to}`] = true;
    }
    return { groups, leaves };
  }

  if (modules.banhang !== true) return { groups, leaves };

  const anyConfigured = BH_GROUP_KEYS.some((k) => k in modules);
  if (!anyConfigured) {
    // Chưa cấu hình nhóm nào → đủ hết (backward-compat GĐ 108/143)
    for (const g of BH_GROUPS) {
      groups[g.key] = true;
      for (const l of g.leaves) leaves[`bh-leaf-${l.to}`] = true;
    }
    return { groups, leaves };
  }

  // Có config: nhóm nào bật → lá của nhóm đó bật SẴN; quyền lá "bh-leaf-*"
  // false ghi đè để thu hẹp trong nhóm (chỉ khi đã từng config lá).
  const anyLeafConfigured = BH_LEAF_KEYS.some((k) => k in modules);
  for (const g of BH_GROUPS) {
    const groupOn = modules[g.key] === true;
    groups[g.key] = groupOn;
    for (const l of g.leaves) {
      const leafKey = `bh-leaf-${l.to}`;
      if (!groupOn) {
        leaves[leafKey] = false;
      } else if (anyLeafConfigured && leafKey in modules) {
        leaves[leafKey] = modules[leafKey] === true;
      } else {
        leaves[leafKey] = true; // nhóm bật, lá chưa từng config → theo nhóm
      }
    }
  }
  return { groups, leaves };
}

/**
 * CHECKLIST KHI THÊM NHÓM/BÁO CÁO MỚI (GĐ 199 — bắt buộc):
 * 1. Thêm lá vào BH_GROUPS (file này) — key lá = "bh-leaf-<route>"
 * 2. Thêm lá cùng nhãn vào nav.ts app con (cây sidebar)
 * 3. Map route → nhóm trong smed-auth.ts app con (REPORT_GROUP / SQL_QUERY_GROUP)
 * 4. Route mới thuộc nhóm quyền nào thì page guard + API guard tự ăn theo —
 *    KHÔNG cần sửa hệ thống phân quyền (UI toggle sinh từ BH_GROUPS).
 */
