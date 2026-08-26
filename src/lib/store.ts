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

const KEY = "giong-vn-v5";

type PersistSlice = {
  tasks: Task[];
  attendance: Attendance[];
  notes: Note[];
  cash: CashVoucher[];
  proposals: Proposal[];
  messages: ChatMessage[];
  checkins: CheckIn[];
  currentUserId: string;
};

type Actions = {
  hydrate: () => void;
  persist: () => void;
  setCurrentUserId: (userId: string) => void;
  currentName: () => string;
  addTask: (t: Omit<Task, "id" | "created" | "updated">) => void;
  setTaskStatus: (id: string, status: string) => void;
  clock: (kind: "Điểm danh vào ca" | "Điểm danh tan ca", gps?: string, address?: string, photo?: string) => Attendance;
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
};

export const useAppStore = create<PersistSlice & Actions>((set, get) => ({
  ...initial,
  hydrate: () => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<PersistSlice>;
      set({
        tasks: parsed.tasks ?? initial.tasks,
        attendance: parsed.attendance ?? initial.attendance,
        notes: parsed.notes ?? initial.notes,
        cash: parsed.cash ?? initial.cash,
        proposals: parsed.proposals ?? initial.proposals,
        messages: parsed.messages ?? initial.messages,
        checkins: parsed.checkins ?? initial.checkins,
        currentUserId: parsed.currentUserId ?? initial.currentUserId,
      });
    } catch {
      /* keep seed */
    }
  },
  persist: () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(slice(get())));
    } catch {
      /* quota */
    }
  },
  setCurrentUserId: (userId) => {
    set({ currentUserId: userId });
    get().persist();
  },
  currentName: () => {
    const id = get().currentUserId;
    return EMPLOYEES.find((e) => e.id === id)?.name ?? "Phạm Kiên Cường";
  },
  addTask: (t) => {
    const now = `${todayIso()} ${nowTime().slice(0, 5)}`;
    set((s) => ({
      tasks: [{ ...t, id: uid("nv"), created: now, updated: now }, ...s.tasks],
    }));
    get().persist();
  },
  setTaskStatus: (id, status) => {
    const now = `${todayIso()} ${nowTime().slice(0, 5)}`;
    set((s) => ({
      tasks: s.tasks.map((x) => (x.id === id ? { ...x, status, updated: now } : x)),
    }));
    get().persist();
  },
  clock: (kind, gps = "", address = "", photo = "") => {
    const name = get().currentName();
    const currentEmployee = EMPLOYEES.find((e) => e.id === get().currentUserId) ?? EMPLOYEES[0];
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
    get().persist();
    return rec;
  },
  addNote: (n) => {
    set((s) => ({ notes: [{ ...n, id: uid("gc") }, ...s.notes] }));
    get().persist();
  },
  addCash: (c) => {
    set((s) => ({ cash: [{ ...c, id: uid("q") }, ...s.cash] }));
    get().persist();
  },
  setCashStatus: (id, status) => {
    set((s) => ({ cash: s.cash.map((x) => (x.id === id ? { ...x, status } : x)) }));
    get().persist();
  },
  addProposal: (p) => {
    set((s) => ({ proposals: [{ ...p, id: uid("dn") }, ...s.proposals] }));
    get().persist();
  },
  setProposalStatus: (id, status) => {
    set((s) => ({
      proposals: s.proposals.map((x) => (x.id === id ? { ...x, status } : x)),
    }));
    get().persist();
  },
  sendMessage: (text, channel) => {
    const msg: ChatMessage = {
      id: uid("m"),
      from: EMPLOYEES.find((e) => e.id === get().currentUserId)?.username ?? "CườngPK",
      text,
      at: `${todayIso()} ${nowTime().slice(0, 5)}`,
      channel,
    };
    set((s) => ({ messages: [...s.messages, msg] }));
    get().persist();
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
    get().persist();
    return rec;
  },
}));
