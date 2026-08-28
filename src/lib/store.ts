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
  { id: 'e0000000-0000-0000-0000-000000000004', name: 'Phạm Cường', username: 'Cuongpk.Giong02', gender: 'Nam', phone: '0904075757', email: 'cuongpk.giong02@gmail.com', dept: 'Hệ thống', role: 'Admin', title: 'Chuyên gia lập trình', center: 'VP', status: 'Đang làm việc' },
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
    // Sync from Neon first. Only fall back to localStorage if Neon sync fails.
    (async () => {
      try {
        const { loadAttendance, loadTasks, loadProposals, loadNotes, loadMessages, loadCheckins } = await import(
          "@/routes/api/data"
        );
        const { loadEmployees: loadEmps, loadCenters: loadCtrs } = await import(
          "@/routes/api/catalog-data"
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
          kind: 'Trung tâm' as 'Trung tâm' | 'Văn phòng',
        }));

        // If Neon has data, use it as the source of truth.
        const hasNeonData =
          neonAttendance.length > 0 ||
          neonTasks.length > 0;
        if (hasNeonData) {
          set({
            attendance: neonAttendance,
            tasks: neonTasks,
            proposals: neonProposals,
            notes: neonNotes,
            messages: neonMessages,
            checkins: neonCheckins,
            employees: dbEmployeeList,
            centers: dbCenterList,
            _neonReady: true,
          });
        } else {
          // Neon empty — start with no data but still load catalog from DB.
          console.log('[store] Neon empty — starting with empty state');
          set({
            tasks: [],
            attendance: [],
            notes: [],
            proposals: [],
            messages: [],
            checkins: [],
            employees: dbEmployeeList,
            centers: dbCenterList,
            currentUserId: initial.currentUserId,
            _neonReady: true,
          });
        }
      } catch (err) {
        console.error('[store] Neon sync failed — no data will be loaded:', err);
        set({
          tasks: [],
          attendance: [],
          notes: [],
          proposals: [],
          messages: [],
          checkins: [],
          employees: [],
          centers: [],
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
    _neonInsertAttendance(rec).catch(console.warn);
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
