import type { Attendance, DailyAttendance, InventoryCenter, InventoryItem, Note, Task, Transfer, VaccineStat } from "@/lib/types";
import attendanceJson from "./attendance.json";
import inventoryJson from "./inventory.json";
import notesJson from "./notes.json";
import tasksJson from "./tasks.json";
import transfersJson from "./transfers.json";

export const seedTasks = tasksJson as Task[];
export const seedNotes = notesJson as Note[];
export const seedTransfers = transfersJson as Transfer[];

const att = attendanceJson as { records: Attendance[]; daily: DailyAttendance[] };
export const seedAttendance = att.records;
export const seedDaily = att.daily;

const inv = inventoryJson as {
  asOf: string;
  centers: InventoryCenter[];
  vaccines: VaccineStat[];
  items: InventoryItem[];
};
export const seedInventory = inv;
