import { create } from "zustand";
import { seedAttendance, seedNotes, seedTasks } from "@/data";
import {
  CASH_SEED,
  CHAT_SEED,
  CURRENT_USER_ID,
  EMPLOYEES,
  PROPOSAL_SEED,
} from "@/lib/catalog";
import type {
  Attendance,
  CashVoucher,
  ChatMessage,
  CheckIn,
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
  cash: CashVoucher[];
  proposals: Proposal[];
  messages: ChatMessage[];
  checkins: CheckIn[];
  currentUserId: string;
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
  addCash: (c: Omit<CashVoucher, "id">) => void;
  setCashStatus: (id: string, status: CashVoucher["status"]) => void;
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
    cash: s.cash,
    proposals: s.proposals,
    messages: s.messages,
    checkins: s.checkins,
    currentUserId: s.currentUserId,
    _neonReady: false,
  };
}

const initial: PersistSlice = {
  tasks: seedTasks,
  attendance: seedAttendance,
  notes: seedNotes,
  cash: CASH_SEED,
  proposals: PROPOSAL_SEED,
  messages: CHAT_SEED,
  checkins: [],
  currentUserId: CURRENT_USER_ID,
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

/** Load from localStorage. */
function loadLs(): Partial<PersistSlice> | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<PersistSlice>;
  } catch {
    return null;
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

async function _neonBulkCash(rows: CashVoucher[]) {
  const { bulkInsertCash } = await import("@/routes/api/data");
  await bulkInsertCash({
    data: {
      rows: rows.map((r) => ({
        id: r.id,
        type: r.type,
        date: r.date,
        amount: r.amount,
        content: r.content,
        center: r.center,
        person: r.person,
        method: r.method,
        status: r.status,
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

async function _neonInsertCash(r: CashVoucher) {
  const { insertCash } = await import("@/routes/api/data");
  await insertCash({
    data: {
      id: r.id,
      type: r.type,
      date: r.date,
      amount: r.amount,
      content: r.content,
      center: r.center,
      person: r.person,
      method: r.method,
      status: r.status,
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

async function _neonUpdateCashStatus(id: string, status: string) {
  const { updateCashStatus } = await import("@/routes/api/data");
  await updateCashStatus({ data: { id, status } });
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
        const { loadAttendance, loadTasks, loadCash, loadProposals, loadNotes, loadMessages, loadCheckins } = await import(
          "@/routes/api/data"
        );
        const [att, tsk, csh, prp, nts, msgs, cks] = await Promise.all([
          loadAttendance(),
          loadTasks(),
          loadCash(),
          loadProposals(),
          loadNotes(),
          loadMessages({ data: { channel: "general" } }),
          loadCheckins(),
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

        const neonCash: CashVoucher[] = (csh as any[]).map((r) => ({
          id: r.id,
          type: r.type as CashVoucher["type"],
          date: r.date,
          amount: Number(r.amount),
          content: r.content,
          center: r.center ?? "VP",
          person: r.person ?? "",
          method: (r.method ?? "Chuyển khoản") as CashVoucher["method"],
          status: (r.status ?? "Nháp") as CashVoucher["status"],
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

        // If Neon has data, use it as the source of truth. If Neon is empty
        // that is a valid state (no automatic seeding from localStorage).
        const hasNeonData =
          neonAttendance.length > 0 ||
          neonTasks.length > 0 ||
          neonCash.length > 0;
        if (hasNeonData) {
          set({
            attendance: neonAttendance,
            tasks: neonTasks,
            cash: neonCash,
            proposals: neonProposals,
            notes: neonNotes,
            messages: neonMessages,
            checkins: neonCheckins,
            _neonReady: true,
          });
        } else {
          // Neon empty — start with no data (empty lists). Do not use seed
          // files or localStorage to populate Neon automatically.
          console.log('[store] Neon empty — starting with empty state');
          set({
            tasks: [],
            attendance: [],
            notes: [],
            cash: [],
            proposals: [],
            messages: [],
            checkins: [],
            currentUserId: initial.currentUserId,
            _neonReady: true,
          });
        }
      } catch (err) {
        // Neon sync failed — report the error and do not load data from
        // localStorage or seed files. Application remains empty and signals
        // that Neon is not ready.
        console.error('[store] Neon sync failed — no data will be loaded:', err);
        set({
          tasks: [],
          attendance: [],
          notes: [],
          cash: [],
          proposals: [],
          messages: [],
          checkins: [],
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
    return EMPLOYEES.find((e) => e.id === id)?.name ?? "Phạm Kiên Cường";
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
    const currentEmployee =
      EMPLOYEES.find((e) => e.id === get().currentUserId) ?? EMPLOYEES[0];
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

  addCash: (c) => {
    const voucher: CashVoucher = { ...c, id: uid("q") };
    set((s) => ({ cash: [voucher, ...s.cash] }));
    saveLs(get());
    _neonInsertCash(voucher).catch(console.warn);
  },

  setCashStatus: (id, status) => {
    set((s) => ({
      cash: s.cash.map((x) => (x.id === id ? { ...x, status } : x)),
    }));
    saveLs(get());
    _neonUpdateCashStatus(id, status).catch(console.warn);
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
        EMPLOYEES.find((e) => e.id === get().currentUserId)?.username ??
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
