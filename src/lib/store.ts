import { create } from "zustand";
import { seedAttendance, seedNotes, seedTasks } from "@/data";

import type {
  Attendance,
  Center,
  ChatMessage,
  CheckIn,
  Employee,
  Note,
  Proposal,
  Task,
} from "@/lib/types";
import { nowTime, todayIso, weekdayVi } from "@/lib/format";
import { uid } from "@/lib/utils";
import { mergeByTs, parseTs } from "./merge";

const LS_KEY = "giong-vn-v5";

type PersistSlice = {
  tasks: Task[];
  attendance: Attendance[];
  notes: Note[];
  proposals: Proposal[];
  messages: ChatMessage[];
  checkins: CheckIn[];
  currentUserId: string;
  employees: Employee[];
  centers: Center[];
  _neonReady: boolean;
};

type Actions = {
  hydrate: () => void;
  persist: () => void;
  setCurrentUserId: (userId: string) => void;
  currentName: () => string;
  addTask: (t: Omit<Task, "id" | "created" | "updated">) => void;
  setTaskStatus: (id: string, status: string) => void;
  updateTask: (id: string, data: { assignee: string; title: string; due: string; support: string; blocker: string; photo?: string; location?: string }) => void;
  clock: (
    kind: "Điểm danh vào ca" | "Điểm danh tan ca",
    gps?: string,
    address?: string,
    photo?: string,
  ) => Attendance;
  removeAttendance: (id: string) => void;
  addNote: (n: Omit<Note, "id">) => void;
  addProposal: (p: Omit<Proposal, "id">) => void;
  setProposalStatus: (id: string, status: Proposal["status"]) => void;
  sendMessage: (text: string, channel: string) => void;
  addCheckin: (gps?: string, address?: string, note?: string, photo?: string, centerCode?: string) => CheckIn;
  removeCheckin: (id: string) => void;
};

function slice(s: PersistSlice): PersistSlice {
  return {
    tasks: s.tasks,
    attendance: s.attendance,
    notes: s.notes,
    proposals: s.proposals,
    messages: s.messages,
    checkins: s.checkins,
    currentUserId: s.currentUserId,
    employees: s.employees,
    centers: s.centers,
    _neonReady: false,
  };
}

// Fallback employees/centers for initial render before DB loads.
// These match the seed data in migration 0008.
const FALLBACK_EMPLOYEES: Employee[] = [
  { id: 'e0000000-0000-0000-0000-000000000001', name: 'Nguyễn Thị Thúy', username: 'GĐ Thúy', gender: 'Nữ', phone: '0902267486', email: 'thuynvy218@gmail.com', dept: 'Ban giám đốc', role: 'Admin', title: 'Giám đốc', center: 'VP', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000002', name: 'Hoàng Minh Châu', username: 'PGĐ_Châu HM', gender: 'Nam', phone: '', email: 'hoangminhchau2631960@gmail.com', dept: 'Ban giám đốc', role: 'Admin', title: 'Phó giám đốc', center: 'VP', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000003', name: 'Phạm Kiên Cường', username: 'CườngPK', gender: 'Nam', phone: '0904075757', email: 'cuongpk.giong04@gmail.com', dept: 'Quản lý', role: 'Admin', title: 'Quản trị hệ thống', center: 'VP', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000005', name: 'Trần Mạnh Hùng', username: 'Hùng TM', gender: 'Nam', phone: '0826861379', email: 'ketoangiongvina@gmail.com', dept: 'Kế toán', role: 'User', title: 'Kế toán trưởng', center: 'VP', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000006', name: 'Nguyễn Thị Mỹ Hạnh', username: 'Hạnh NTM', gender: 'Nữ', phone: '0327451134', email: 'nguyenmyhanh2912@gmail.com', dept: 'Hành chính - Nhân sự', role: 'User', title: 'Trưởng phòng HCNS', center: 'VP', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000007', name: 'Trần Thị Anh Thương', username: 'Thương TTA', gender: 'Nữ', phone: '', email: 'thuonggvn@gmail.com', dept: 'Marketing', role: 'User', title: 'Nhân viên Marketing', center: 'VP', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000008', name: 'Nguyễn Thị Hương', username: 'Hương NT', gender: 'Nữ', phone: '', email: 'nguyenhuong.ts2311@gmail.com', dept: 'Marketing', role: 'User', title: 'Trưởng phòng Marketing', center: 'VP', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000009', name: 'Nguyễn Thị Dịu', username: 'Dịu NT', gender: 'Nữ', phone: '0388573597', email: 'nguyendiuu1912@gmail.com', dept: 'Kế toán', role: 'User', title: 'Kế toán viên', center: 'VP', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000010', name: 'Trần Thị Thanh Thủy', username: 'Thủy TTT', gender: 'Nữ', phone: '', email: '', dept: 'Kho', role: 'User', title: 'Thủ kho', center: 'VP', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000011', name: 'Đinh Thị Hương Trà', username: 'DsTra', gender: 'Nữ', phone: '0327045684', email: 'dinhthihuongtra19062002@gmail.com', dept: 'Dược', role: 'User', title: 'Quản lý dược', center: 'VP', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000012', name: 'Nguyễn Thành Hiếu', username: 'Hiếu NT', gender: 'Nữ', phone: '0336365636', email: 'hieubin2106@gmail.com', dept: 'Hành chính - Nhân sự', role: 'User', title: 'Nhân viên HCNS', center: 'VP', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000013', name: 'Nguyễn Thành Hiếu', username: 'Hiếu NT 2', gender: 'Nam', phone: '', email: 'thanhhieu21061993@gmail.com', dept: 'Hành chính - Nhân sự', role: 'User', title: 'Nhân viên', center: 'VP', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000014', name: 'Lê Thị Bích', username: 'Bích LT', gender: 'Nữ', phone: '', email: '', dept: 'Tiêm chủng', role: 'User', title: 'Điều dưỡng', center: 'LB', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000015', name: 'Nguyễn Thị Tuyết Lan', username: 'Lan NTT', gender: 'Nữ', phone: '', email: '', dept: 'Tiêm chủng', role: 'User', title: 'Điều dưỡng', center: 'SĐ', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000016', name: 'Vương Thị Minh', username: 'Minh VT', gender: 'Nữ', phone: '', email: '', dept: 'Thu ngân', role: 'User', title: 'Thu ngân', center: 'NL', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000017', name: 'Kiều Mai Anh', username: 'Anh KM', gender: 'Nữ', phone: '', email: '', dept: 'Tiêm chủng', role: 'User', title: 'Điều dưỡng', center: 'TS', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000018', name: 'Nguyễn Quỳnh Vân', username: 'Vân NQ', gender: 'Nữ', phone: '', email: '', dept: 'Tiêm chủng', role: 'User', title: 'Điều dưỡng', center: 'TĐ', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000019', name: 'Lê Thị Hằng', username: 'Hằng LT', gender: 'Nữ', phone: '', email: '', dept: 'Thu ngân', role: 'User', title: 'Thu ngân', center: 'CĐ', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000020', name: 'Đinh Thị Yến', username: 'Yến ĐT', gender: 'Nữ', phone: '', email: '', dept: 'Tiêm chủng', role: 'User', title: 'Điều dưỡng', center: 'PY', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000021', name: 'Trần Thị Yến', username: 'Yến TT', gender: 'Nữ', phone: '', email: '', dept: 'Tiêm chủng', role: 'User', title: 'Điều dưỡng', center: 'ĐX', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000022', name: 'Lê Thị Dung', username: 'Dung LT', gender: 'Nữ', phone: '', email: '', dept: 'Tiêm chủng', role: 'User', title: 'Điều dưỡng', center: 'LM', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000023', name: 'Vũ Thị Ánh Ngọc', username: 'Ngọc VTA', gender: 'Nữ', phone: '', email: '', dept: 'Tiêm chủng', role: 'User', title: 'Điều dưỡng', center: 'TO', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000024', name: 'Nguyễn Nhật Phương', username: 'Phương NN', gender: 'Nữ', phone: '', email: '', dept: 'Tiêm chủng', role: 'User', title: 'Điều dưỡng', center: 'QO', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000025', name: 'Nguyễn Đức Năng', username: 'Năng NĐ', gender: 'Nam', phone: '', email: '', dept: 'Hành chính', role: 'User', title: 'Nhân viên', center: 'BH', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000026', name: 'Phạm Hồng Phong', username: 'Phong PH', gender: 'Nam', phone: '', email: '', dept: 'Hành chính', role: 'User', title: 'Nhân viên', center: 'ML', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000027', name: 'Lỗ Thị Hà', username: 'Hà LT', gender: 'Nữ', phone: '', email: '', dept: 'Thu ngân', role: 'User', title: 'Thu ngân', center: 'TP', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000028', name: 'Đặng Thị Mỹ Linh', username: 'Linh ĐTM', gender: 'Nữ', phone: '', email: '', dept: 'Tiêm chủng', role: 'User', title: 'Điều dưỡng', center: 'HM', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000029', name: 'Nguyễn Phú Đông', username: 'Đông NP', gender: 'Nam', phone: '', email: '', dept: 'Hành chính', role: 'User', title: 'Nhân viên', center: 'TD', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000030', name: 'Vũ Thị Thanh Huyền', username: 'Huyền VTT', gender: 'Nữ', phone: '', email: '', dept: 'Tiêm chủng', role: 'User', title: 'Điều dưỡng', center: 'ĐY', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000031', name: 'Trần Ngọc Anh', username: 'Anh TN', gender: 'Nữ', phone: '', email: '', dept: 'Tiêm chủng', role: 'User', title: 'Điều dưỡng', center: 'TT', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000032', name: 'Lương Thị Hà Trang', username: 'Trang LTH', gender: 'Nữ', phone: '', email: '', dept: 'Thu ngân', role: 'User', title: 'Thu ngân', center: 'TA', status: 'Đang làm việc' },
  { id: 'e0000000-0000-0000-0000-000000000033', name: 'Khuất Thị Dung', username: 'Dung KT', gender: 'Nữ', phone: '', email: '', dept: 'Tiêm chủng', role: 'User', title: 'Điều dưỡng', center: 'LB', status: 'Đang làm việc' },
];

const FALLBACK_CENTERS: Center[] = [
  { code: 'VP', name: 'Văn phòng Công ty Gióng Việt Nam', short: 'Văn phòng', city: 'Long Biên, Hà Nội', kind: 'Văn phòng' },
  { code: 'LB', name: 'Trung tâm tiêm chủng Gióng Long Biên', short: 'Long Biên', city: 'Long Biên, Hà Nội', kind: 'Trung tâm' },
  { code: 'SĐ', name: 'Trung tâm tiêm chủng Gióng Sài Đồng', short: 'Sài Đồng', city: 'Long Biên, Hà Nội', kind: 'Trung tâm' },
  { code: 'NL', name: 'Trung tâm tiêm chủng Gióng Ngọc Lâm', short: 'Ngọc Lâm', city: 'Long Biên, Hà Nội', kind: 'Trung tâm' },
  { code: 'TO', name: 'Trung tâm tiêm chủng Gióng Thanh Oai', short: 'Thanh Oai', city: 'Thanh Oai, Hà Nội', kind: 'Trung tâm' },
  { code: 'QO', name: 'Trung tâm tiêm chủng Gióng Quốc Oai', short: 'Quốc Oai', city: 'Quốc Oai, Hà Nội', kind: 'Trung tâm' },
  { code: 'BH', name: 'Trung tâm tiêm chủng Gióng Bích Hòa', short: 'Bích Hòa', city: 'Thanh Oai, Hà Nội', kind: 'Trung tâm' },
  { code: 'ML', name: 'Trung tâm tiêm chủng Gióng Mê Linh', short: 'Mê Linh', city: 'Mê Linh, Hà Nội', kind: 'Trung tâm' },
  { code: 'TP', name: 'Trung tâm tiêm chủng Gióng Tiền Phong', short: 'Tiền Phong', city: 'Mê Linh, Hà Nội', kind: 'Trung tâm' },
  { code: 'CĐ', name: 'Trung tâm tiêm chủng Gióng Chi Đông', short: 'Chi Đông', city: 'Mê Linh, Hà Nội', kind: 'Trung tâm' },
  { code: 'TĐ', name: 'Trung tâm tiêm chủng Gióng Thạch Đà', short: 'Thạch Đà', city: 'Mê Linh, Hà Nội', kind: 'Trung tâm' },
  { code: 'LM', name: 'Trung tâm tiêm chủng Gióng Liên Mạc', short: 'Liên Mạc', city: 'Bắc Từ Liêm, Hà Nội', kind: 'Trung tâm' },
  { code: 'TA', name: 'Trung tâm tiêm chủng Gióng Tâm An', short: 'Tâm An', city: 'Hà Nội', kind: 'Trung tâm' },
  { code: 'PY', name: 'Trung tâm tiêm chủng Gióng Phúc Yên', short: 'Phúc Yên', city: 'Phúc Yên, Vĩnh Phúc', kind: 'Trung tâm' },
  { code: 'ĐX', name: 'Trung tâm tiêm chủng Gióng Đồng Xuân', short: 'Đồng Xuân', city: 'Vĩnh Phúc', kind: 'Trung tâm' },
  { code: 'TS', name: 'Trung tâm tiêm chủng Gióng Từ Sơn', short: 'Từ Sơn', city: 'Từ Sơn, Bắc Ninh', kind: 'Trung tâm' },
  { code: 'HM', name: 'Trung tâm tiêm chủng Gióng Hương Mạc', short: 'Hương Mạc', city: 'Từ Sơn, Bắc Ninh', kind: 'Trung tâm' },
  { code: 'TD', name: 'Trung tâm tiêm chủng Gióng Tiên Du', short: 'Tiên Du', city: 'Tiên Du, Bắc Ninh', kind: 'Trung tâm' },
  { code: 'ĐY', name: 'Trung tâm tiêm chủng Gióng Đông Yên', short: 'Đông Yên', city: 'Bắc Ninh', kind: 'Trung tâm' },
  { code: 'TT', name: 'Trung tâm tiêm chủng Gióng Thanh Thùy', short: 'Thanh Thùy', city: 'Hà Nội', kind: 'Trung tâm' },
];

const initial: PersistSlice = {
  tasks: seedTasks,
  attendance: seedAttendance,
  notes: seedNotes,
  proposals: [],
  messages: [],
  checkins: [],
  currentUserId: 'e0000000-0000-0000-0000-000000000003', // Phạm Kiên Cường UUID
  employees: FALLBACK_EMPLOYEES,
  centers: FALLBACK_CENTERS,
  _neonReady: false,
};

/** Save to localStorage as offline fallback. */
function saveLs(s: PersistSlice) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(slice(s)));
  } catch {
    /* quota */
  }
}

// ── Pending sync queue (localStorage) ────────────────────────────────────────
const PENDING_KEY = "giong-vn-pending-sync";

// Background retry state (module-level, singleton)
let _bgRetryStarted = false;
let _bgRetryInterval: ReturnType<typeof setInterval> | null = null;

type PendingRecord = { collection: string; data: any };

const PENDING_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getPendingSync(): PendingRecord[] {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    if (!raw) return [];
    const all = JSON.parse(raw) as PendingRecord[];
    // Expire records older than 7 days
    const now = Date.now();
    const fresh = all.filter((r) => {
      const ts = r.data?._syncTs ?? 0;
      return ts === 0 || (now - ts) < PENDING_EXPIRY_MS;
    });
    if (fresh.length < all.length) {
      localStorage.setItem(PENDING_KEY, JSON.stringify(fresh));
    }
    return fresh;
  } catch {
    return [];
  }
}

function addPendingSync(record: PendingRecord) {
  const pending = getPendingSync();
  // Add timestamp for expiry tracking
  record.data._syncTs = Date.now();
  pending.push(record);
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(pending));
  } catch {
    /* quota */
  }
}

function clearPendingSync(ids: string[]) {
  if (ids.length === 0) return;
  const pending = getPendingSync().filter((r) => !ids.includes(r.data.id));
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(pending));
  } catch {
    /* quota */
  }
}

/** Retry pending Neon inserts from previous offline sessions. */
async function retryPendingSync() {
  const pending = getPendingSync();
  if (pending.length === 0) return;
  const succeeded: string[] = [];
  const api = await import("@/routes/api/data");
  for (const record of pending) {
    try {
      switch (record.collection) {
        case "attendance":
          await api.insertAttendance({ data: record.data });
          break;
        case "tasks":
          await _neonInsertTask(record.data as Task);
          break;
        case "notes":
          await _neonInsertNote(record.data as Note);
          break;
        case "proposals":
          await _neonInsertProposal(record.data as Proposal);
          break;
        case "messages":
          await _neonInsertMessage(record.data as ChatMessage);
          break;
        case "checkins":
          await _neonInsertCheckin(record.data as CheckIn);
          break;
        default:
          continue; // unknown collection — leave in queue
      }
      succeeded.push(record.data.id);
    } catch {
      // Will retry on next sync cycle
    }
  }
  if (succeeded.length > 0) {
    clearPendingSync(succeeded);
    console.log(`[store] Retry sync: ${succeeded.length}/${pending.length} records synced`);
  }
}

/** Fire-and-forget Neon sync helpers (imported lazily to avoid SSR issues). */
async function _neonBulkAttendance(rows: Attendance[]) {
  const { bulkInsertAttendance } = await import(
    "@/routes/api/data"
  );
  await bulkInsertAttendance({
    data: {
      rows: rows.map((r) => ({
        id: r.id,
        name: r.name,
        status: r.status,
        time: r.time,
        date: r.date,
        weekday: r.weekday,
        gps: r.gps,
        address: r.address,
        photo: r.photo,
        type: r.type,
        approved: r.approved,
        workplace: r.workplace,
        updatedAt: (r as any).updatedAt,
      })),
    },
  });
}

async function _neonBulkTasks(rows: Task[]) {
  const { bulkInsertTasks } = await import("@/routes/api/data");
  await bulkInsertTasks({
    data: {
      rows: rows.map((r) => ({
        id: r.id,
        assignee: r.assignee,
        title: r.title,
        created: r.created,
        due: r.due,
        status: r.status,
        support: r.support,
        blocker: r.blocker,
        updated: r.updated,
        createdBy: r.createdBy,
        photo: r.photo,
        location: r.location,
      })),
    },
  });
}

async function _neonBulkMessages(rows: ChatMessage[]) {
  const { bulkInsertMessages } = await import("@/routes/api/data");
  await bulkInsertMessages({
    data: {
      rows: rows.map((r) => ({
        id: r.id,
        from: r.from,
        text: r.text,
        at: r.at,
        channel: r.channel,
      })),
    },
  });
}

async function _neonInsertAttendance(r: Attendance) {
  const { insertAttendance } = await import("@/routes/api/data");
  await insertAttendance({
    data: {
      id: r.id,
      name: r.name,
      status: r.status,
      time: r.time,
      date: r.date,
      weekday: r.weekday,
      gps: r.gps,
      address: r.address,
      photo: r.photo,
      type: r.type,
      approved: r.approved,
      workplace: r.workplace,
      updatedAt: r.updatedAt,
    },
  });
}

async function _neonInsertTask(r: Task) {
  const { insertTask } = await import("@/routes/api/data");
  await insertTask({
    data: {
      id: r.id,
      assignee: r.assignee,
      title: r.title,
      created: r.created,
      due: r.due,
      status: r.status,
      support: r.support,
      blocker: r.blocker,
      updated: r.updated,
      createdBy: r.createdBy,
      photo: r.photo,
      location: r.location,
    },
  });
}

async function _neonInsertNote(r: Note) {
  const { insertNote } = await import("@/routes/api/data");
  await insertNote({
    data: {
      id: r.id,
      stt: String(r.stt ?? ""),
      date: r.date,
      content: r.content,
      author: r.author,
      deploy: r.deploy,
      deadline: r.deadline,
      support: r.support,
      dept: r.dept,
      status: r.status,
    },
  });
}

async function _neonInsertProposal(r: Proposal) {
  const { insertProposal } = await import("@/routes/api/data");
  await insertProposal({
    data: {
      id: r.id,
      kind: r.kind,
      title: r.title,
      requester: r.requester,
      date: r.date,
      detail: r.detail,
      status: r.status,
      dept: r.dept,
    },
  });
}

async function _neonInsertMessage(r: ChatMessage) {
  const { insertMessage } = await import("@/routes/api/data");
  await insertMessage({
    data: {
      id: r.id,
      from: r.from,
      text: r.text,
      at: r.at,
      channel: r.channel,
    },
  });
}

async function _neonInsertCheckin(r: CheckIn) {
  const { insertCheckin } = await import("@/routes/api/data");
  await insertCheckin({
    data: {
      id: r.id,
      name: r.name,
      time: r.time,
      date: r.date,
      weekday: r.weekday,
      gps: r.gps,
      address: r.address,
      note: r.note,
      photo: r.photo ?? "",
      centerCode: r.centerCode ?? "VP",
      status: r.status ?? "checked_in",
      updatedAt: r.updatedAt,
    },
  });
}

async function _neonDeleteCheckin(id: string) {
  const { deleteCheckin } = await import("@/routes/api/data");
  await deleteCheckin({ data: { id } });
}

async function _neonUpdateTaskStatus(id: string, status: string, updated: string) {
  const { updateTaskStatus } = await import("@/routes/api/data");
  await updateTaskStatus({ data: { id, status, updated } });
}

async function _neonUpdateTask(id: string, data: { assignee: string; title: string; due: string; support: string; blocker: string; photo?: string; location?: string; updated: string }) {
  const { updateTask } = await import("@/routes/api/data");
  await updateTask({ data: { id, ...data } });
}

async function _neonUpdateProposalStatus(id: string, status: string) {
  const { updateProposalStatus } = await import("@/routes/api/data");
  await updateProposalStatus({ data: { id, status } });
}

export const useAppStore = create<PersistSlice & Actions>((set, get) => ({
  ...initial,

  /* ── OFFLINE-FIRST HYDRATE ──────────────────────────────────────────────────
   * Strategy: localStorage is Source of Truth for display.
   * Neon data is MERGED INTO local — never overwrites.
   */
  hydrate: () => {
    // STEP 1: Load from localStorage IMMEDIATELY — this is the source of truth
    let localAtt: Attendance[] = [];
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const ls = JSON.parse(raw) as PersistSlice;
        localAtt = (ls.attendance ?? []).map((a) => ({
          ...a,
          synced: a.synced ?? true, // older records without field = synced
          updatedAt: (a as any).updatedAt ?? `${a.date}T${a.time}`,
        }));
        set({
          tasks: ls.tasks ?? [],
          attendance: localAtt,
          notes: ls.notes ?? [],
          proposals: ls.proposals ?? [],
          messages: ls.messages ?? [],
          checkins: ls.checkins ?? [],
          currentUserId: ls.currentUserId ?? initial.currentUserId,
          employees: ls.employees?.length ? ls.employees : FALLBACK_EMPLOYEES,
          centers: ls.centers?.length ? ls.centers : FALLBACK_CENTERS,
        });
      }
    } catch { /* ignore parse errors */ }

    // STEP 2: Background — retry pending + fetch Neon + merge INTO local
    (async () => {
      try {
        // 2a: Push unsynced records to Neon
        await retryPendingSync();

        const {
          loadAttendance,
          loadTasks,
          loadProposals,
          loadNotes,
          loadMessages,
          loadCheckins,
          loadDeletedAttendanceIds,
          loadDeletedCheckinIds,
        } = await import(
          "@/routes/api/data"
        );
        const { loadEmployees: loadEmps, loadCenters: loadCtrs } = await import(
          "@/routes/api/employee-crud"
        );
        // Fetch Neon data. Attendance loads in its OWN try/catch so an error
        // in any other module (tasks/messages/checkins/employees/centers...)
        // never hides attendance from admins — it still merges.
        let att: any[] = [];
        let delAtt: any[] = [];
        try {
          [att, delAtt] = await Promise.all([loadAttendance(), loadDeletedAttendanceIds()]);
        } catch (err) {
          console.error("[store] Neon attendance load failed — keeping local attendance:", err);
        }

        let tsk: any[] = [], prp: any[] = [], nts: any[] = [], msgs: any[] = [], cks: any[] = [], dbEmps: any[] = [], dbCtrs: any[] = [];
        try {
          [tsk, prp, nts, msgs, cks, dbEmps, dbCtrs] = await Promise.all([
            loadTasks(),
            loadProposals(),
            loadNotes(),
            loadMessages({ data: { channel: "general" } }),
            loadCheckins(),
            loadEmps(),
            loadCtrs(),
          ]);
        } catch (err) {
          console.error("[store] Neon other-module load failed — attendance still merged:", err);
        }
        // Load deleted checkin IDs separately — this may fail if migration 0014 hasn't run yet
        let delCks: any[] = [];
        try {
          delCks = await loadDeletedCheckinIds();
        } catch {
          // Migration 0014 not applied yet — ignore, no tombstone filtering needed
        }

        // Map Neon rows → app types (all synced since they came from DB)
        const neonAttendance: Attendance[] = (att as any[]).map((r) => ({
          id: r.id, name: r.name, status: r.status, time: r.time,
          date: r.date, weekday: r.weekday, gps: r.gps ?? "",
          address: r.address ?? "", photo: r.photo ?? undefined,
          type: r.type ?? "Bình thường", approved: r.approved ?? "Chưa",
          workplace: r.workplace ?? "VP",
          updatedAt: r.updated_at ?? `${r.date}T${r.time}`,
          synced: true,
        }));

        const neonTasks: Task[] = (tsk as any[]).map((r) => ({
          id: r.id, assignee: r.assignee, title: r.title, created: r.created,
          due: r.due ?? "", status: r.status ?? "Việc cần làm",
          support: r.support ?? "", blocker: r.blocker ?? "",
          updated: r.updated, createdBy: r.created_by ?? "",
          photo: r.photo ?? undefined, location: r.location ?? "",
        }));
        const neonProposals: Proposal[] = (prp as any[]).map((r) => ({
          id: r.id, kind: r.kind as Proposal["kind"], title: r.title,
          requester: r.requester ?? "", date: r.date, detail: r.detail ?? "",
          status: (r.status ?? "Chờ duyệt") as Proposal["status"], dept: r.dept ?? "",
        }));
        const neonNotes: Note[] = (nts as any[]).map((r) => ({
          id: r.id, stt: r.stt ?? undefined, date: r.date, content: r.content,
          author: r.author ?? "", deploy: r.deploy ?? "", deadline: r.deadline ?? "",
          support: r.support ?? "", dept: r.dept ?? "", status: r.status ?? "",
        }));
        const neonMessages: ChatMessage[] = (msgs as any[]).map((r) => ({
          id: r.id, from: r.from_name, text: r.text, at: r.at, channel: r.channel,
        }));
        const neonCheckins: CheckIn[] = (cks as any[]).map((r) => ({
          id: r.id, name: r.name, time: r.time, date: r.date, weekday: r.weekday,
          gps: r.gps ?? "", address: r.address ?? "", note: r.note ?? "",
          photo: r.photo ?? "", centerCode: r.center_code ?? "VP",
          status: r.status ?? "checked_in", updatedAt: r.updated_at ?? null,
        }));

        const dbEmployeeList: Employee[] = (dbEmps as any[]).map((r) => ({
          id: r.id, name: r.name, username: r.username,
          gender: r.gender ?? '', phone: r.phone ?? '', email: r.email ?? '',
          dept: r.department, role: r.role ?? 'User', title: r.title,
          center: r.center, status: r.status,
        }));
        const dbCenterList: Center[] = (dbCtrs as any[]).map((r) => ({
          code: r.code, name: r.name, short: r.short_name, city: r.city,
          kind: (r.code === 'VP' ? 'Văn phòng' : 'Trung tâm') as 'Trung tâm' | 'Văn phòng',
        }));

        const employeeMap = new Map<string, Employee>();
        for (const e of FALLBACK_EMPLOYEES) employeeMap.set(e.id, e);
        for (const e of dbEmployeeList) employeeMap.set(e.id, e);
        const finalEmployees = Array.from(employeeMap.values());
        const centerMap = new Map<string, import("@/lib/types").Center>();
        for (const c of FALLBACK_CENTERS) centerMap.set(c.code, c);
        for (const c of dbCenterList) centerMap.set(c.code, c);
        const finalCenters = Array.from(centerMap.values());

        /* ── OFFLINE-FIRST MERGE: local is source of truth ────────────────────
         * 1. Records still in the pending queue (offline-created) are KEPT from local.
         * 2. Non-pending records use Neon; when a version timestamp exists the
         *    NEWER one wins (LWW by updatedAt).
         * 3. Records tombstoned on Neon (deleted_at) are removed from local.
         */
        const attPendingIds = new Set(
          getPendingSync().filter((r) => r.collection === 'attendance').map((r) => r.data.id),
        );
        const taskPendingIds = new Set(
          getPendingSync().filter((r) => r.collection === 'tasks').map((r) => r.data.id),
        );
        const notePendingIds = new Set(
          getPendingSync().filter((r) => r.collection === 'notes').map((r) => r.data.id),
        );
        const proposalPendingIds = new Set(
          getPendingSync().filter((r) => r.collection === 'proposals').map((r) => r.data.id),
        );
        const messagePendingIds = new Set(
          getPendingSync().filter((r) => r.collection === 'messages').map((r) => r.data.id),
        );
        const checkinPendingIds = new Set(
          getPendingSync().filter((r) => r.collection === 'checkins').map((r) => r.data.id),
        );
        const deletedAttendanceIds = new Set((delAtt as any[]).map((r) => r.id));

        const mergedAttendance = mergeByTs(
          get().attendance,
          neonAttendance,
          attPendingIds,
          (r) => r.updatedAt ?? `${r.date}T${r.time}`,
        )
          .filter((a) => !deletedAttendanceIds.has(a.id))
          .map((a) => ({ ...a, synced: attPendingIds.has(a.id) ? false : true }))
          .sort((a, b) => (b.date > a.date ? 1 : b.date < a.date ? -1 : b.time > a.time ? 1 : -1));

        set({
          attendance: mergedAttendance,
          tasks: mergeByTs(get().tasks, neonTasks, taskPendingIds, (r) => r.updated),
          proposals: mergeByTs(get().proposals, neonProposals, proposalPendingIds),
          notes: mergeByTs(get().notes, neonNotes, notePendingIds),
          messages: mergeByTs(get().messages, neonMessages, messagePendingIds, (r) => r.at),
          checkins: (() => {
            const deletedCheckinIds = new Set((delCks as any[]).map((r) => r.id));
            return mergeByTs(
              get().checkins, neonCheckins, checkinPendingIds,
              (r) => r.updatedAt ?? `${r.date}T${r.time}`,
            )
              .filter((c) => !deletedCheckinIds.has(c.id))
              .sort((a, b) => (b.date > a.date ? 1 : b.date < a.date ? -1 : b.time > a.time ? 1 : -1));
          })(),
          employees: finalEmployees,
          centers: finalCenters,
          _neonReady: true,
        });
        saveLs(get()); // persist merged result
      } catch (err) {
        console.error('[store] Neon sync failed — keeping local data:', err);
        // DO NOT clear local data — just mark sync as incomplete
        set({ _neonReady: false });
      }

      // Background retry interval (once only)
      if (!_bgRetryStarted) {
        _bgRetryStarted = true;
        // Online listener — sync immediately when network returns
        if (typeof window !== 'undefined') {
          window.addEventListener('online', () => {
            console.log('[store] Network online — triggering sync');
            retryPendingSync().then(() => get().hydrate()).catch(() => {});
          });
        }
        _bgRetryInterval = setInterval(() => {
          if (getPendingSync().length > 0) {
            retryPendingSync().then(() => get().hydrate()).catch(() => {});
          }
        }, 30_000);
      }
    })();
  },

  persist: () => {
    saveLs(get());
  },

  setCurrentUserId: (userId) => {
    set({ currentUserId: userId });
    saveLs(get());
  },

  currentName: () => {
    const id = get().currentUserId;
    return get().employees.find((e) => e.id === id)?.name ?? "Phạm Kiên Cường";
  },

  addTask: (t) => {
    const now = `${todayIso()} ${nowTime().slice(0, 5)}`;
    const task: Task = { ...t, id: uid("nv"), created: now, updated: now };
    set((s) => ({ tasks: [task, ...s.tasks] }));
    saveLs(get());
    addPendingSync({ collection: "tasks", data: task });
    _neonInsertTask(task)
      .then(() => clearPendingSync([task.id]))
      .catch(console.warn);
  },

  setTaskStatus: (id, status) => {
    const now = `${todayIso()} ${nowTime().slice(0, 5)}`;
    set((s) => ({
      tasks: s.tasks.map((x) => (x.id === id ? { ...x, status, updated: now } : x)),
    }));
    saveLs(get());
    _neonUpdateTaskStatus(id, status, now).catch(console.warn);
  },

  updateTask: (id, data) => {
    const now = `${todayIso()} ${nowTime().slice(0, 5)}`;
    set((s) => ({
      tasks: s.tasks.map((x) =>
        x.id === id ? { ...x, ...data, updated: now } : x,
      ),
    }));
    saveLs(get());
    _neonUpdateTask(id, { ...data, updated: now }).catch(console.warn);
  },

  clock: (kind, gps = "", address = "", photo = "") => {
    const name = get().currentName();
    const emps = get().employees;
    const currentEmployee =
      emps.find((e) => e.id === get().currentUserId) ?? emps[0] ?? { center: 'VP', title: 'Nhân viên' } as any;
    const date = todayIso();
    // Guard chống trùng lặp: cùng người, cùng ngày, cùng loại trong 5 giây gần nhất
    // → trả về bản ghi đã tạo, KHÔNG tạo thêm (bảo vệ bản chất dữ liệu khi bấm nhiều lần)
    const recent = get().attendance.find(
      (a) =>
        a.name === name &&
        a.date === date &&
        a.status === kind &&
        Date.now() - parseTs(a.updatedAt ?? `${a.date}T${a.time}`) < 5000,
    );
    if (recent) return recent;
    const workplace = currentEmployee.center ?? "VP";
    const nowTs = new Date().toISOString();
    const rec: Attendance = {
      id: uid("cc"),
      name,
      status: kind,
      time: nowTime(),
      date,
      weekday: weekdayVi(date),
      gps,
      address: address || `${currentEmployee.title} — ${currentEmployee.center}`,
      photo: photo || undefined,
      type: "Bình thường",
      approved: "Chưa",
      workplace,
      updatedAt: nowTs,
      synced: false, // starts unsynced — will be marked true after Neon insert
    };
    // 1. Save to state + localStorage immediately (local is source of truth)
    set((s) => ({ attendance: [rec, ...s.attendance] }));
    saveLs(get());
    // 2. Add to pending queue for retry
    addPendingSync({ collection: "attendance", data: rec });
    // 3. Fire-and-forget Neon insert
    _neonInsertAttendance(rec).then(() => {
      // Success: mark as synced, remove from pending queue, save
      clearPendingSync([rec.id]);
      const current = get().attendance.map((a) =>
        a.id === rec.id ? { ...a, synced: true } : a
      );
      set({ attendance: current });
      saveLs(get());
    }).catch(() => {
      // Failed: stays in pending queue, will retry on next sync cycle
    });
    return rec;
  },

  removeAttendance: (id) => {
    // Local first (source of truth): remove immediately
    set((s) => ({ attendance: s.attendance.filter((a) => a.id !== id) }));
    saveLs(get());
    clearPendingSync([id]);
    // Tombstone on Neon so other devices remove it too
    import("@/routes/api/data")
      .then(({ deleteAttendance }) => deleteAttendance({ data: { id } }))
      .catch(console.warn);
  },

  addNote: (n) => {
    const note: Note = { ...n, id: uid("gc") };
    set((s) => ({ notes: [note, ...s.notes] }));
    saveLs(get());
    addPendingSync({ collection: "notes", data: note });
    _neonInsertNote(note)
      .then(() => clearPendingSync([note.id]))
      .catch(console.warn);
  },

  addProposal: (p) => {
    const proposal: Proposal = { ...p, id: uid("dn") };
    set((s) => ({ proposals: [proposal, ...s.proposals] }));
    saveLs(get());
    addPendingSync({ collection: "proposals", data: proposal });
    _neonInsertProposal(proposal)
      .then(() => clearPendingSync([proposal.id]))
      .catch(console.warn);
  },

  setProposalStatus: (id, status) => {
    set((s) => ({
      proposals: s.proposals.map((x) =>
        x.id === id ? { ...x, status } : x,
      ),
    }));
    saveLs(get());
    _neonUpdateProposalStatus(id, status).catch(console.warn);
  },

  sendMessage: (text, channel) => {
    const msg: ChatMessage = {
      id: uid("m"),
      from:
        get().employees.find((e) => e.id === get().currentUserId)?.username ??
        "CườngPK",
      text,
      at: `${todayIso()} ${nowTime().slice(0, 5)}`,
      channel,
    };
    set((s) => ({ messages: [...s.messages, msg] }));
    saveLs(get());
    addPendingSync({ collection: "messages", data: msg });
    _neonInsertMessage(msg)
      .then(() => clearPendingSync([msg.id]))
      .catch(console.warn);
  },

  addCheckin: (gps = "", address = "", note = "", photo = "", centerCode = "VP") => {
    const date = todayIso();
    const ts = new Date().toISOString();
    const rec: CheckIn = {
      id: uid("ck"),
      name: get().currentName(),
      time: nowTime(),
      date,
      weekday: weekdayVi(date),
      gps,
      address,
      note,
      photo,
      centerCode,
      status: "checked_in",
      updatedAt: ts,
    };
    set((s) => ({ checkins: [rec, ...s.checkins] }));
    saveLs(get());
    addPendingSync({ collection: "checkins", data: rec });
    _neonInsertCheckin(rec)
      .then(() => clearPendingSync([rec.id]))
      .catch(console.warn);
    return rec;
  },

  removeCheckin: (id: string) => {
    set((s) => ({ checkins: s.checkins.filter((c) => c.id !== id) }));
    saveLs(get());
    _neonDeleteCheckin(id).catch(console.warn);
  },
}));
