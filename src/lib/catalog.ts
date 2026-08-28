import type {
  Center,
  Employee,
  CashVoucher,
  Proposal,
  CreditFacility,
  Collateral,
  ChatMessage,
} from "./types";

export const APP_NAME = "GIONG VN";
export const APP_TAGLINE = "Hệ thống điều hành Gióng Việt Nam";
export const COMPANY = "Công ty Gióng Việt Nam";
export const SUPPORT_PHONE = "0904 07 57 57";
export const SUPPORT_ALT = "0948 80 96 96";

export const ORGANIZATION = {
  id: "11111111-1111-1111-1111-111111111111",
  name: APP_NAME,
  legalName: COMPANY,
  slug: "giong-vn",
  country: "VN",
  status: "active",
} as const;

export const ROLE_DEFINITIONS = [
  { key: "super_admin", label: "Super Admin", description: "Toàn quyền quản trị hệ thống" },
  { key: "admin", label: "Admin", description: "Quản trị cấp doanh nghiệp" },
  { key: "regional_manager", label: "Regional Manager", description: "Quản lý khu vực / đa trung tâm" },
  { key: "center_manager", label: "Center Manager", description: "Quản lý trung tâm" },
  { key: "hr", label: "HR", description: "Nhân sự" },
  { key: "accountant", label: "Accountant", description: "Kế toán" },
  { key: "warehouse", label: "Warehouse", description: "Kho / dược / nhập xuất" },
  { key: "staff", label: "Staff", description: "Nhân viên vận hành" },
] as const;

export const CENTERS: Center[] = [
  { code: "VP", name: "Văn phòng Công ty Gióng Việt Nam", short: "Văn phòng", city: "Long Biên, Hà Nội", kind: "Văn phòng" },
  { code: "LB", name: "Trung tâm tiêm chủng Gióng Long Biên", short: "Long Biên", city: "Long Biên, Hà Nội", kind: "Trung tâm" },
  { code: "SĐ", name: "Trung tâm tiêm chủng Gióng Sài Đồng", short: "Sài Đồng", city: "Long Biên, Hà Nội", kind: "Trung tâm" },
  { code: "NL", name: "Trung tâm tiêm chủng Gióng Ngọc Lâm", short: "Ngọc Lâm", city: "Long Biên, Hà Nội", kind: "Trung tâm" },
  { code: "TO", name: "Trung tâm tiêm chủng Gióng Thanh Oai", short: "Thanh Oai", city: "Thanh Oai, Hà Nội", kind: "Trung tâm" },
  { code: "QO", name: "Trung tâm tiêm chủng Gióng Quốc Oai", short: "Quốc Oai", city: "Quốc Oai, Hà Nội", kind: "Trung tâm" },
  { code: "BH", name: "Trung tâm tiêm chủng Gióng Bích Hòa", short: "Bích Hòa", city: "Thanh Oai, Hà Nội", kind: "Trung tâm" },
  { code: "ML", name: "Trung tâm tiêm chủng Gióng Mê Linh", short: "Mê Linh", city: "Mê Linh, Hà Nội", kind: "Trung tâm" },
  { code: "TP", name: "Trung tâm tiêm chủng Gióng Tiền Phong", short: "Tiền Phong", city: "Mê Linh, Hà Nội", kind: "Trung tâm" },
  { code: "CĐ", name: "Trung tâm tiêm chủng Gióng Chi Đông", short: "Chi Đông", city: "Mê Linh, Hà Nội", kind: "Trung tâm" },
  { code: "TĐ", name: "Trung tâm tiêm chủng Gióng Thạch Đà", short: "Thạch Đà", city: "Mê Linh, Hà Nội", kind: "Trung tâm" },
  { code: "LM", name: "Trung tâm tiêm chủng Gióng Liên Mạc", short: "Liên Mạc", city: "Bắc Từ Liêm, Hà Nội", kind: "Trung tâm" },
  { code: "TA", name: "Trung tâm tiêm chủng Gióng Tâm An", short: "Tâm An", city: "Hà Nội", kind: "Trung tâm" },
  { code: "PY", name: "Trung tâm tiêm chủng Gióng Phúc Yên", short: "Phúc Yên", city: "Phúc Yên, Vĩnh Phúc", kind: "Trung tâm" },
  { code: "ĐX", name: "Trung tâm tiêm chủng Gióng Đồng Xuân", short: "Đồng Xuân", city: "Vĩnh Phúc", kind: "Trung tâm" },
  { code: "TS", name: "Trung tâm tiêm chủng Gióng Từ Sơn", short: "Từ Sơn", city: "Từ Sơn, Bắc Ninh", kind: "Trung tâm" },
  { code: "HM", name: "Trung tâm tiêm chủng Gióng Hương Mạc", short: "Hương Mạc", city: "Từ Sơn, Bắc Ninh", kind: "Trung tâm" },
  { code: "TD", name: "Trung tâm tiêm chủng Gióng Tiên Du", short: "Tiên Du", city: "Tiên Du, Bắc Ninh", kind: "Trung tâm" },
  { code: "ĐY", name: "Trung tâm tiêm chủng Gióng Đông Yên", short: "Đông Yên", city: "Bắc Ninh", kind: "Trung tâm" },
  { code: "TT", name: "Trung tâm tiêm chủng Gióng Thanh Thùy", short: "Thanh Thùy", city: "Hà Nội", kind: "Trung tâm" },
];

export const CENTER_MAP = Object.fromEntries(CENTERS.map((c) => [c.code, c]));

export function centerName(code: string) {
  return CENTER_MAP[code]?.short ?? code;
}

export function getCenterByCode(code: string) {
  return CENTER_MAP[code] ?? null;
}

export const EMPLOYEES: Employee[] = [
  { id: "U007", name: "Nguyễn Thị Thúy", username: "GĐ Thúy", gender: "Nữ", phone: "0902267486", email: "thuynvy218@gmail.com", dept: "Ban giám đốc", role: "Admin", title: "Giám đốc", center: "VP", status: "Đang làm việc" },
  { id: "U009", name: "Hoàng Minh Châu", username: "PGĐ_Châu HM", gender: "Nam", phone: "", email: "hoangminhchau2631960@gmail.com", dept: "Ban giám đốc", role: "Admin", title: "Phó giám đốc", center: "VP", status: "Đang làm việc" },
  { id: "U002", name: "Phạm Kiên Cường", username: "CườngPK", gender: "Nam", phone: "0904075757", email: "cuongpk.giong04@gmail.com", dept: "Quản lý", role: "Admin", title: "Quản trị hệ thống", center: "VP", status: "Đang làm việc" },
  { id: "U031", name: "Phạm Cường", username: "Cuongpk.Giong02", gender: "Nam", phone: "0904075757", email: "cuongpk.giong02@gmail.com", dept: "Hệ thống", role: "Admin", title: "Chuyên gia lập trình", center: "VP", status: "Đang làm việc" },
  { id: "U003", name: "Trần Mạnh Hùng", username: "Hùng TM", gender: "Nam", phone: "0826861379", email: "ketoangiongvina@gmail.com", dept: "Kế toán", role: "User", title: "Kế toán trưởng", center: "VP", status: "Đang làm việc" },
  { id: "U005", name: "Nguyễn Thị Mỹ Hạnh", username: "Hạnh NTM", gender: "Nữ", phone: "0327451134", email: "nguyenmyhanh2912@gmail.com", dept: "Hành chính - Nhân sự", role: "User", title: "Trưởng phòng HCNS", center: "VP", status: "Đang làm việc" },
  { id: "U004", name: "Trần Thị Anh Thương", username: "Thương TTA", gender: "Nữ", phone: "", email: "thuonggvn@gmail.com", dept: "Marketing", role: "User", title: "Nhân viên Marketing", center: "VP", status: "Đang làm việc" },
  { id: "U010", name: "Nguyễn Thị Hương", username: "Hương NT", gender: "Nữ", phone: "", email: "nguyenhuong.ts2311@gmail.com", dept: "Marketing", role: "User", title: "Trưởng phòng Marketing", center: "VP", status: "Đang làm việc" },
  { id: "U006", name: "Nguyễn Thị Dịu", username: "Dịu NT", gender: "Nữ", phone: "0388573597", email: "nguyendiuu1912@gmail.com", dept: "Kế toán", role: "User", title: "Kế toán viên", center: "VP", status: "Đang làm việc" },
  { id: "U030", name: "Trần Thị Thanh Thủy", username: "Thủy TTT", gender: "Nữ", phone: "", email: "tranthuy19750307@gmail.com", dept: "Kho", role: "User", title: "Thủ kho", center: "VP", status: "Đang làm việc" },
  { id: "U032", name: "Đinh Thị Hương Trà", username: "DsTra", gender: "Nữ", phone: "0327045684", email: "dinhthihuongtra19062002@gmail.com", dept: "Dược", role: "User", title: "Quản lý dược", center: "VP", status: "Đang làm việc" },
  { id: "U033", name: "Nguyễn Thành Hiếu", username: "Hiếu NT", gender: "Nam", phone: "0336365636", email: "hieubin2106@gmail.com", dept: "Hành chính - Nhân sự", role: "User", title: "Nhân viên HCNS", center: "VP", status: "Đang làm việc" },
  { id: "U008", name: "Nguyễn Thành Hiếu", username: "Hiếu NT 2", gender: "Nam", phone: "", email: "thanhhieu21061993@gmail.com", dept: "Hành chính - Nhân sự", role: "User", title: "Nhân viên", center: "VP", status: "Đang làm việc" },
  { id: "S01", name: "Lê Thị Bích", username: "Bích LT", gender: "Nữ", phone: "", email: "", dept: "Tiêm chủng", role: "User", title: "Điều dưỡng", center: "LB", status: "Đang làm việc" },
  { id: "S02", name: "Nguyễn Thị Tuyết Lan", username: "Lan NTT", gender: "Nữ", phone: "", email: "", dept: "Tiêm chủng", role: "User", title: "Điều dưỡng", center: "SĐ", status: "Đang làm việc" },
  { id: "S03", name: "Vương Thị Minh", username: "Minh VT", gender: "Nữ", phone: "", email: "", dept: "Thu ngân", role: "User", title: "Thu ngân", center: "NL", status: "Đang làm việc" },
  { id: "S04", name: "KIỀU MAI ANH", username: "Anh KM", gender: "Nữ", phone: "", email: "", dept: "Tiêm chủng", role: "User", title: "Điều dưỡng", center: "TS", status: "Đang làm việc" },
  { id: "S05", name: "Nguyễn Quỳnh Vân", username: "Vân NQ", gender: "Nữ", phone: "", email: "", dept: "Tiêm chủng", role: "User", title: "Điều dưỡng", center: "TĐ", status: "Đang làm việc" },
  { id: "S06", name: "Lê Thị Hằng", username: "Hằng LT", gender: "Nữ", phone: "", email: "", dept: "Thu ngân", role: "User", title: "Thu ngân", center: "CĐ", status: "Đang làm việc" },
  { id: "S07", name: "ĐINH THỊ YẾN", username: "Yến ĐT", gender: "Nữ", phone: "", email: "", dept: "Tiêm chủng", role: "User", title: "Điều dưỡng", center: "PY", status: "Đang làm việc" },
  { id: "S08", name: "Trần Thị Yến", username: "Yến TT", gender: "Nữ", phone: "", email: "", dept: "Tiêm chủng", role: "User", title: "Điều dưỡng", center: "ĐX", status: "Đang làm việc" },
  { id: "S09", name: "Lê Thị Dung", username: "Dung LT", gender: "Nữ", phone: "", email: "", dept: "Thu ngân", role: "User", title: "Thu ngân", center: "LM", status: "Đang làm việc" },
  { id: "S10", name: "Vũ Thị Ánh Ngọc", username: "Ngọc VTA", gender: "Nữ", phone: "", email: "", dept: "Tiêm chủng", role: "User", title: "Điều dưỡng", center: "TO", status: "Đang làm việc" },
  { id: "S11", name: "Nguyễn Nhật Phương", username: "Phương NN", gender: "Nữ", phone: "", email: "", dept: "Tiêm chủng", role: "User", title: "Điều dưỡng", center: "QO", status: "Đang làm việc" },
  { id: "S12", name: "Nguyễn Đức Năng", username: "Năng NĐ", gender: "Nam", phone: "", email: "", dept: "Hành chính", role: "User", title: "Nhân viên", center: "BH", status: "Đang làm việc" },
  { id: "S13", name: "Phạm Hồng Phong", username: "Phong PH", gender: "Nam", phone: "", email: "", dept: "Hành chính", role: "User", title: "Nhân viên", center: "ML", status: "Đang làm việc" },
  { id: "S14", name: "Lỗ Thị Hà", username: "Hà LT", gender: "Nữ", phone: "", email: "", dept: "Thu ngân", role: "User", title: "Thu ngân", center: "TP", status: "Đang làm việc" },
  { id: "S15", name: "Đặng Thị Mỹ Linh", username: "Linh ĐTM", gender: "Nữ", phone: "", email: "", dept: "Tiêm chủng", role: "User", title: "Điều dưỡng", center: "HM", status: "Đang làm việc" },
  { id: "S16", name: "Nguyễn Phú Đông", username: "Đông NP", gender: "Nam", phone: "", email: "", dept: "Hành chính", role: "User", title: "Nhân viên", center: "TD", status: "Đang làm việc" },
  { id: "S17", name: "Vũ Thị Thanh Huyền", username: "Huyền VTT", gender: "Nữ", phone: "", email: "", dept: "Tiêm chủng", role: "User", title: "Điều dưỡng", center: "ĐY", status: "Đang làm việc" },
  { id: "S18", name: "Trần Ngọc Anh", username: "Anh TN", gender: "Nữ", phone: "", email: "", dept: "Tiêm chủng", role: "User", title: "Điều dưỡng", center: "TT", status: "Đang làm việc" },
  { id: "S19", name: "Lương Thị Hà Trang", username: "Trang LTH", gender: "Nữ", phone: "", email: "", dept: "Thu ngân", role: "User", title: "Thu ngân", center: "TA", status: "Đang làm việc" },
  { id: "S20", name: "Khuất Thị Dung", username: "Dung KT", gender: "Nữ", phone: "", email: "", dept: "Tiêm chủng", role: "User", title: "Điều dưỡng", center: "LB", status: "Đang làm việc" },
];

export const EMPLOYEE_MAP = Object.fromEntries(EMPLOYEES.map((e) => [e.id, e]));
export const STAFF_BY_CENTER = Object.fromEntries(
  CENTERS.map((c) => [c.code, EMPLOYEES.filter((e) => e.center === c.code).length]),
);

export function getEmployeeById(id: string) {
  return EMPLOYEE_MAP[id] ?? null;
}

export function getEmployeeByUsername(username: string) {
  const value = username.trim().toLowerCase();
  return EMPLOYEES.find((e) => e.username.toLowerCase() === value) ?? null;
}

export function getEmployeeByName(name: string) {
  const value = name.trim().toLowerCase();
  return EMPLOYEES.find((e) => e.name.toLowerCase() === value) ?? null;
}

export function getEmployeeByEmail(email: string) {
  const value = (email ?? "").trim().toLowerCase();
  if (!value) return null;
  return (
    EMPLOYEES.find((e) => (e.email ?? "").trim().toLowerCase() === value) ??
    EMPLOYEES.find((e) => (e.username ?? "").trim().toLowerCase() === value) ??
    null
  );
}

export function isApprovedEmployeeEmail(email: string | null | undefined) {
  const value = (email ?? "").trim().toLowerCase();
  if (!value) return false;
  return EMPLOYEES.some((employee) => (employee.email ?? "").trim().toLowerCase() === value);
}

export function normalizePersonKey(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function findEmployeeByLooseText(value: string) {
  const raw = value ?? "";
  const key = normalizePersonKey(raw);
  if (!key) return null;

  return (
    EMPLOYEES.find((e) => normalizePersonKey(e.name) === key) ??
    EMPLOYEES.find((e) => normalizePersonKey(e.username) === key) ??
    EMPLOYEES.find((e) => normalizePersonKey(e.email) === key) ??
    EMPLOYEES.find((e) => normalizePersonKey(e.name).includes(key) || key.includes(normalizePersonKey(e.name))) ??
    EMPLOYEES.find((e) => normalizePersonKey(e.username).includes(key) || key.includes(normalizePersonKey(e.username))) ??
    null
  );
}

export function isAdminRole(role?: string | null) {
  const normalized = (role ?? "").trim().toLowerCase();
  return [
    "superadmin",
    "super_admin",
    "admin",
    "regional_manager",
    "center_manager",
  ].includes(normalized);
}

export function canViewEmployeeRecords(actor: Employee | null, target: Employee | null) {
  if (!actor || !target) return false;
  if (isAdminRole(actor.role)) return true;
  if (actor.id === target.id) return true;
  return actor.center === target.center;
}

export function getVisibleCenterCodes(actor: Employee | null) {
  if (!actor) return [];
  if (isAdminRole(actor.role)) return CENTERS.map((center) => center.code);
  return [actor.center];
}

export const CURRENT_USER_ID = "U002";

export const CASH_SEED: CashVoucher[] = [];

export const PROPOSAL_SEED: Proposal[] = [];

export const CREDIT_SEED: CreditFacility[] = [
  { id: "TD1", bank: "VietinBank — CN Long Biên", type: "Vay vốn lưu động", limit: 8_000_000_000, outstanding: 5_250_000_000, due: "2026-12-15", status: "Đang giải ngân" },
  { id: "TD2", bank: "Vietcombank — CN Hà Nội", type: "Thấu chi tài khoản", limit: 2_000_000_000, outstanding: 420_000_000, due: "2026-09-30", status: "Hạn mức còn" },
  { id: "TD3", bank: "MB Bank", type: "L/C nhập khẩu vắc xin", limit: 3_500_000_000, outstanding: 1_180_000_000, due: "2026-10-20", status: "Đang mở L/C" },
];

export const COLLATERAL_SEED: Collateral[] = [
  { id: "TS1", name: "Nhà VP 8/61 Nguyễn Sơn, Bồ Đề", type: "Bất động sản", value: 12_500_000_000, location: "Long Biên, Hà Nội", status: "Thế chấp VietinBank" },
  { id: "TS2", name: "Hệ thống kho lạnh 19 trung tâm", type: "Máy móc thiết bị", value: 4_800_000_000, location: "Toàn hệ thống", status: "Thế chấp MB" },
  { id: "TS3", name: "Xe tải đông lạnh 2.5 tấn", type: "Phương tiện", value: 980_000_000, location: "Văn phòng", status: "Sở hữu" },
  { id: "TS4", name: "Phần mềm & dữ liệu vận hành", type: "Tài sản vô hình", value: 350_000_000, location: "Hệ thống", status: "Sở hữu" },
];

export const CHAT_SEED: ChatMessage[] = [];

export const GUIDES = [
  {
    id: "GT001",
    title: "Giới thiệu phần mềm",
    body: "GIONG VN là hệ thống điều hành chuỗi trung tâm tiêm chủng Gióng Việt Nam — dùng được trên máy tính, trình duyệt, iPhone và Android. Ứng dụng thay thế bộ AppSheet rời, gom chấm công, kho vắc xin, quỹ tiền, nhiệm vụ và đề nghị về một dashboard.",
  },
  {
    id: "GT003",
    title: "Đăng ký và phân quyền",
    body: "Nhân sự mới nhận link hoặc mã QR, chọn máy tính hoặc điện thoại rồi đăng ký. Nhân sự cũ dùng tài khoản đã cấp. SuperAdmin quản trị hệ thống, Admin là ban giám đốc, User là các phòng ban: kế toán, tài chính, kinh doanh, pháp chế, HCNS, marketing.",
  },
  {
    id: "GT004",
    title: "Chấm công hàng ngày",
    body: "Vào ca lúc bắt đầu làm việc, tan ca khi xong việc. Cần ảnh chân dung và định vị. Mỗi ngày chỉ hai lần: vào và ra. Nghỉ, đi muộn, về sớm, tăng ca ngày thường / cuối tuần / lễ phải được Admin duyệt qua đề nghị nhân sự mới tính lương.",
  },
  {
    id: "GT005",
    title: "Thông báo",
    body: "Admin lập thông báo triển khai công việc tới từng bộ phận. User chỉ đọc, không thêm-sửa-xóa.",
  },
  {
    id: "GT006",
    title: "Chat nội bộ",
    body: "Trao đổi cùng cấp, theo nhóm hoặc toàn hệ thống. Dữ liệu lưu lại để Admin đối chứng khi cần.",
  },
  {
    id: "GT007",
    title: "Hồ sơ — tài liệu",
    body: "Thêm và tra cứu hồ sơ công ty, phân theo đơn vị và bộ phận. Chỉ thêm mới và xem — không sửa, không xóa.",
  },
  {
    id: "GT008",
    title: "Thêm mới theo quyền",
    body: "Hệ thống lập kế hoạch tuần/tháng. Đề nghị nhân sự, thu chi, nhập xuất do nhân viên lập — quản lý phê duyệt, từ chối hoặc hủy. Ghi chú mở cho mọi người thêm, không sửa xóa.",
  },
  {
    id: "GT009",
    title: "Việc làm mỗi ngày",
    body: "1. Chấm công. 2. Kiểm tra kế hoạch cũ, lập kế hoạch mới. 3. Vào module nghiệp vụ theo chức danh. 4. Góp ý và ghi chú. Hỗ trợ Zalo/điện thoại 0948 80 96 96 hoặc 0904 07 57 57.",
  },
];

export const REPORTS = [
  { id: "bc1", name: "Bảng chấm công", desc: "Công vào/tan ca theo ngày, người, trung tâm", href: "/cham-cong" },
  { id: "bc2", name: "Báo cáo nhiệm vụ", desc: "Tiến độ kế hoạch theo người phụ trách", href: "/nhiem-vu" },
  { id: "bc3", name: "Tồn kho vắc xin", desc: "Số lượng, giá trị, hạn dùng theo trung tâm", href: "/kho" },
  { id: "bc4", name: "Điều chuyển kho", desc: "Phiếu điều chuyển liên trung tâm", href: "/kho" },
  { id: "bc5", name: "Quỹ tiền", desc: "Thu — chi — số dư theo ngày", href: "/quy" },
  { id: "bc6", name: "Đề nghị chờ duyệt", desc: "Hàng đợi phê duyệt của quản lý", href: "/de-nghi" },
];

export const DOCS = [
  { id: "hs1", name: "Quy chế chấm công & lương", dept: "HCNS", updated: "2026-07-12" },
  { id: "hs2", name: "Quy trình bảo quản vắc xin GSP", dept: "Dược", updated: "2026-06-03" },
  { id: "hs3", name: "Hồ sơ vay vốn VietinBank", dept: "Tài chính", updated: "2026-02-11" },
  { id: "hs4", name: "Danh mục nhà cung cấp vắc xin", dept: "Kho", updated: "2026-08-01" },
  { id: "hs5", name: "Nội quy trung tâm tiêm chủng", dept: "Ban giám đốc", updated: "2026-04-18" },
  { id: "hs6", name: "Hướng dẫn thu ngân tại điểm", dept: "Kế toán", updated: "2026-03-10" },
];
