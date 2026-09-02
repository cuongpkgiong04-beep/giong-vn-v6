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
  clock: (
    kind: "Điểm danh vào ca" | "Điểm danh tan ca",
    gps?: string,
    address?: string,
    photo?: string,
  ) => Attendance;
  addNote: (n: Omit<Note, "id">) => void;
  addProposal: (p: Omit<Proposal, "id">) => void;
  setProposalStatus: (id: string, status: Proposal["status"]) => void;
  sendMessage: (text: string, channel: string) => void;
  addCheckin: (gps?: string, address?: string, note?: string) => CheckIn;
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

type PendingRecord = { collection: string; data: any };

function getPendingSync(): PendingRecord[] {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function addPendingSync(record: PendingRecord) {
  const pending = getPendingSync();
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
  for (const record of pending) {
    try {
      const { insertAttendance } = await import("@/routes/api/data");
      if (record.collection === "attendance") {
        await insertAttendance({ data: record.data });
        succeeded.push(record.data.id);
      }
    } catch {
      // Will retry on next hydrate
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
  try {
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
      },
    });
  } catch (err) {
    console.warn("[store] Neon insert attendance failed:", err);
    // Already added to pending queue by clock() — no need to add again
  }
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
    },
  });
}

async function _neonUpdateTaskStatus(id: string, status: string, updated: string) {
  const { updateTaskStatus } = await import("@/routes/api/data");
  await updateTaskStatus({ data: { id, status, updated } });
}

async function _neonUpdateProposalStatus(id: string, status: string) {
  const { updateProposalStatus } = await import("@/routes/api/data");
  await updateProposalStatus({ data: { id, status } });
}

export const useAppStore = create<PersistSlice & Actions>((set, get) => ({
  ...initial,

  hydrate: () => {
    // STEP 1: Load from localStorage immediately for instant UI (survives refresh)
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const ls = JSON.parse(raw) as PersistSlice;
        set({
          tasks: ls.tasks ?? [],
          attendance: ls.attendance ?? [],
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

    // STEP 2: Sync from Neon in background (merge with localStorage data)
    (async () => {
      try {
        // Retry any pending offline inserts from previous sessions
        await retryPendingSync();

        const { loadAttendance, loadTasks, loadProposals, loadNotes, loadMessages, loadCheckins } = await import(
          "@/routes/api/data"
        );
        const { loadEmployees: loadEmps, loadCenters: loadCtrs } = await import(
          "@/routes/api/employee-crud"
        );
        const [att, tsk, prp, nts, msgs, cks, dbEmps, dbCtrs] = await Promise.all([
          loadAttendance(),
          loadTasks(),
          loadProposals(),
          loadNotes(),
          loadMessages({ data: { channel: "general" } }),
          loadCheckins(),
          loadEmps(),
          loadCtrs(),
        ]);

        // Map Neon rows to app types
        const neonAttendance: Attendance[] = (att as any[]).map((r) => ({
          id: r.id,
          name: r.name,
          status: r.status,
          time: r.time,
          date: r.date,
          weekday: r.weekday,
          gps: r.gps ?? "",
          address: r.address ?? "",
          photo: r.photo ?? undefined,
          type: r.type ?? "Bình thường",
          approved: r.approved ?? "Chưa",
          workplace: r.workplace ?? "VP",
        }));

        const neonTasks: Task[] = (tsk as any[]).map((r) => ({
          id: r.id,
          assignee: r.assignee,
          title: r.title,
          created: r.created,
          due: r.due ?? "",
          status: r.status ?? "Việc cần làm",
          support: r.support ?? "",
          blocker: r.blocker ?? "",
          updated: r.updated,
          createdBy: r.created_by ?? "",
        }));

        const neonProposals: Proposal[] = (prp as any[]).map((r) => ({
          id: r.id,
          kind: r.kind as Proposal["kind"],
          title: r.title,
          requester: r.requester ?? "",
          date: r.date,
          detail: r.detail ?? "",
          status: (r.status ?? "Chờ duyệt") as Proposal["status"],
          dept: r.dept ?? "",
        }));

        const neonNotes: Note[] = (nts as any[]).map((r) => ({
          id: r.id,
          stt: r.stt ?? undefined,
          date: r.date,
          content: r.content,
          author: r.author ?? "",
          deploy: r.deploy ?? "",
          deadline: r.deadline ?? "",
          support: r.support ?? "",
          dept: r.dept ?? "",
          status: r.status ?? "",
        }));

        const neonMessages: ChatMessage[] = (msgs as any[]).map((r) => ({
          id: r.id,
          from: r.from_name,
          text: r.text,
          at: r.at,
          channel: r.channel,
        }));

        const neonCheckins: CheckIn[] = (cks as any[]).map((r) => ({
          id: r.id,
          name: r.name,
          time: r.time,
          date: r.date,
          weekday: r.weekday,
          gps: r.gps ?? "",
          address: r.address ?? "",
          note: r.note ?? "",
        }));

        // Map DB employees to app Employee type
        const dbEmployeeList: Employee[] = (dbEmps as any[]).map((r) => ({
          id: r.id,
          name: r.name,
          username: r.username,
          gender: r.gender ?? '',
          phone: r.phone ?? '',
          email: r.email ?? '',
          dept: r.department,
          role: r.role ?? 'User',
          title: r.title,
          center: r.center,
          status: r.status,
        }));

        // Map DB centers to app Center type
        const dbCenterList: Center[] = (dbCtrs as any[]).map((r) => ({
          code: r.code,
          name: r.name,
          short: r.short_name,
          city: r.city,
          kind: (r.code === 'VP' ? 'Văn phòng' : 'Trung tâm') as 'Trung tâm' | 'Văn phòng',
        }));

        // Merge: start with fallback, overlay DB employees on top.
        // This ensures fallback employees (with known emails) are always available
        // even if DB has different employees.
        const employeeMap = new Map<string, Employee>();
        for (const e of FALLBACK_EMPLOYEES) employeeMap.set(e.id, e);
        for (const e of dbEmployeeList) employeeMap.set(e.id, e);
        const finalEmployees = Array.from(employeeMap.values());

        const centerMap = new Map<string, import("@/lib/types").Center>();
        for (const c of FALLBACK_CENTERS) centerMap.set(c.code, c);
        for (const c of dbCenterList) centerMap.set(c.code, c);
        const finalCenters = Array.from(centerMap.values());

        // Get pending unsynced records from localStorage
        const pendingRecords = getPendingSync();
        const pendingAttendance: Attendance[] = pendingRecords
          .filter((r) => r.collection === "attendance")
          .map((r) => r.data as Attendance);

        // Merge: Neon (source of truth) + pending (failed inserts)
        // NOTE: Do NOT merge localStorage data here — Neon is source of truth.
        // localStorage was already loaded in step 1 for instant UI.
        // Pending records are kept because Neon insert hasn't succeeded yet.
        const attMap = new Map<string, Attendance>();
        for (const a of neonAttendance) attMap.set(a.id, a);
        for (const a of pendingAttendance) {
          if (!attMap.has(a.id)) attMap.set(a.id, a);
        }
        const mergedAttendance = Array.from(attMap.values())
          .sort((a, b) => (b.date > a.date ? 1 : b.date < a.date ? -1 : b.time > a.time ? 1 : -1));

        if (neonAttendance.length > 0 || pendingAttendance.length > 0 || neonTasks.length > 0) {
          set({
            attendance: mergedAttendance,
            tasks: neonTasks,
            proposals: neonProposals,
            notes: neonNotes,
            messages: neonMessages,
            checkins: neonCheckins,
            employees: finalEmployees,
            centers: finalCenters,
            _neonReady: true,
          });
        } else {
          // All sources empty — start with empty state
          console.log('[store] All sources empty — starting with empty state');
          set({
            tasks: [],
            attendance: [],
            notes: [],
            proposals: [],
            messages: [],
            checkins: [],
            employees: finalEmployees,
            centers: finalCenters,
            currentUserId: initial.currentUserId,
            _neonReady: true,
          });
        }
      } catch (err) {
        console.error('[store] Neon sync failed — loading fallback data:', err);
        set({
          tasks: [],
          attendance: [],
          notes: [],
          proposals: [],
          messages: [],
          checkins: [],
          employees: FALLBACK_EMPLOYEES,
          centers: FALLBACK_CENTERS,
          _neonReady: false,
        });
      }
    })();
  },

  persist: () => {
    // Always save to localStorage (fast, offline)
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
    _neonInsertTask(task).catch(console.warn);
  },

  setTaskStatus: (id, status) => {
    const now = `${todayIso()} ${nowTime().slice(0, 5)}`;
    set((s) => ({
      tasks: s.tasks.map((x) => (x.id === id ? { ...x, status, updated: now } : x)),
    }));
    saveLs(get());
    _neonUpdateTaskStatus(id, status, now).catch(console.warn);
  },

  clock: (kind, gps = "", address = "", photo = "") => {
    const name = get().currentName();
    const emps = get().employees;
    const currentEmployee =
      emps.find((e) => e.id === get().currentUserId) ?? emps[0] ?? { center: 'VP', title: 'Nhân viên' } as any;
    const date = todayIso();
    const workplace = currentEmployee.center ?? "VP";
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
    };
    set((s) => ({ attendance: [rec, ...s.attendance] }));
    saveLs(get());
    // Eagerly add to pending queue — ensures data survives page refresh
    addPendingSync({ collection: "attendance", data: rec });
    // Fire Neon insert — on success, clear from pending queue
    _neonInsertAttendance(rec).then(() => {
      clearPendingSync([rec.id]);
    }).catch(() => {
      // Already in pending queue from eager add, will retry on next hydrate
    });
    return rec;
  },

  addNote: (n) => {
    const note: Note = { ...n, id: uid("gc") };
    set((s) => ({ notes: [note, ...s.notes] }));
    saveLs(get());
    _neonInsertNote(note).catch(console.warn);
  },

  addProposal: (p) => {
    const proposal: Proposal = { ...p, id: uid("dn") };
    set((s) => ({ proposals: [proposal, ...s.proposals] }));
    saveLs(get());
    _neonInsertProposal(proposal).catch(console.warn);
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
    _neonInsertMessage(msg).catch(console.warn);
  },

  addCheckin: (gps = "", address = "", note = "") => {
    const date = todayIso();
    const rec: CheckIn = {
      id: uid("ck"),
      name: get().currentName(),
      time: nowTime(),
      date,
      weekday: weekdayVi(date),
      gps,
      address,
      note,
    };
    set((s) => ({ checkins: [rec, ...s.checkins] }));
    saveLs(get());
    _neonInsertCheckin(rec).catch(console.warn);
    return rec;
  },
}));
