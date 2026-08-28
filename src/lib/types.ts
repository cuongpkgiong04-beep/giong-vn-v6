export type TaskStatus = "Việc cần làm" | "Đang làm" | "Đã xong";

export type Task = {
  id: string;
  assignee: string;
  title: string;
  created: string;
  due: string;
  status: TaskStatus | string;
  support: string;
  blocker: string;
  updated: string;
  createdBy: string;
};

export type Attendance = {
  id: string;
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
};

export type ChatMessage = {
  id: string;
  from: string;
  text: string;
  at: string;
  channel: string;
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
};
