export type TaskStatus = "Việc cần làm" | "Đang làm" | "Đã xong";

export type Task = {
  id: string;
  assignee: string;
  title: string;
  created: string;
  due: string;
  status: TaskStatus | string;
  support: string; // comma-separated list of support names
  blocker: string;
  updated: string;
  createdBy: string;
  /** Người giao nhiệm vụ — mặc định trùng createdBy */
  assigner: string;
  photo?: string;
  location?: string;
};

export type Attendance = {
  id: string;
  employeeId?: string;
  name: string;
  status: string;
  time: string;
  date: string;
  weekday: string;
  gps: string;
  address: string;
  photo?: string;
  type: string;
  approved: string;
  workplace: string;
  /** ISO timestamp of last modification — used for LWW conflict resolution */
  updatedAt: string;
  /** Client-only: true if this record has been synced to Neon */
  synced?: boolean;
};

export type DailyAttendance = { date: string; in: number; out: number };

export type Note = {
  id: string;
  stt?: number | string;
  date: string;
  content: string;
  author: string;
  deploy: string;
  deadline: string;
  support: string;
  dept: string;
  status: string;
  createdBy?: string;
  updatedAt?: string;
};

export type Employee = {
  id: string;
  name: string;
  username: string;
  gender: string;
  phone: string;
  email: string;
  dept: string;
  role: "SuperAdmin" | "Admin" | "User" | string;
  title: string;
  center: string;
  status: string;
};

export type Center = {
  code: string;
  name: string;
  short: string;
  city: string;
  kind: "Trung tâm" | "Văn phòng";
};

export type Proposal = {
  id: string;
  kind: "Nhân sự" | "Thu chi" | "Nhập xuất" | "Góp ý";
  title: string;
  requester: string;
  date: string;
  detail: string;
  status: "Chờ duyệt" | "Đã duyệt" | "Từ chối";
  dept: string;
  /** Người duyệt (tên hiển thị) — trống nếu chưa duyệt */
  approver?: string;
  /** ISO timestamp lúc duyệt/từ chối */
  approvedAt?: string;
  /** ID employee khởi tạo — nguồn sự thật cho lọc "của tôi" */
  createdBy?: string;
  /** ISO timestamp lần sửa cuối — dùng cho LWW merge offline */
  updatedAt?: string;
  /** Tombstone — phiếu đã xóa (soft delete) */
  deletedAt?: string;
  /** Danh sách tệp đính kèm (URL Cloudinary) */
  attachments?: string[];
};

export type ChatMessage = {
  id: string;
  /** Tên hiển thị người gửi (username — VD "CườngPK") */
  from: string;
  text: string;
  /** Thời điểm gửi "YYYY-MM-DD HH:mm" — dùng cho sort + LWW merge */
  at: string;
  /** Kênh nhóm ("Chung", "Kế toán"...) — rỗng nếu tin 1-1 */
  channel: string;
  /** ID employee người gửi — chính xác hơn `from` (tên có thể trùng) */
  fromId?: string;
  /** Nhắn 1-1: "empA|empB" (2 ID sort tăng) — rỗng nếu kênh nhóm */
  directKey?: string;
  /** Danh sách tệp đính kèm (URL Cloudinary) */
  attachments?: string[];
  /** ISO timestamp — LWW merge offline */
  updatedAt?: string;
  /** Tombstone — tin đã thu hồi */
  deletedAt?: string;
};

/** Loại hồ sơ tài liệu — danh sách cố định để lọc/thống kê (GĐ 66) */
export const DOC_CATEGORIES = [
  "Quy chế/Nội quy",
  "Hợp đồng",
  "Hồ sơ nhân sự",
  "Tài chính",
  "Hướng dẫn",
  "Khác",
] as const;

export type DocCategory = (typeof DOC_CATEGORIES)[number];

export type Document = {
  id: string;
  title: string;
  category: string;
  dept: string;
  center: string;
  summary: string;
  /** Người tạo (tên hiển thị) */
  creator: string;
  /** ID employee người tạo — lọc "của tôi" chính xác */
  createdBy: string;
  /** Ngày hồ sơ (YYYY-MM-DD) */
  date: string;
  /** ISO timestamp lần sửa cuối — LWW merge offline */
  updatedAt: string;
  /** Tombstone — hồ sơ đã xóa */
  deletedAt?: string;
  /** Danh sách tệp đính kèm (URL Cloudinary) */
  attachments: string[];
};

export type CheckIn = {
  id: string;
  name: string;
  time: string;
  date: string;
  weekday: string;
  gps: string;
  address: string;
  note: string;
  photo?: string;
  centerCode?: string;
  status?: string;
  updatedAt?: string;
  deletedAt?: string;
};
