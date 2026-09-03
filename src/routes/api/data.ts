/**
 * Server functions for all application data CRUD operations.
 * Replaces localStorage with Neon PostgreSQL.
 */
import { getSql } from "@/lib/db";
import { createServerFn } from "@tanstack/react-start";

/* ─────────────────── Attendance ─────────────────── */

export const loadAttendance = createServerFn({ method: "GET" })
  .handler(async () => {
    const sql = await getSql();
    return sql<{
      id: string;
      name: string;
      status: string;
      time: string;
      date: string;
      weekday: string;
      gps: string;
      address: string;
      photo: string | null;
      type: string;
      approved: string;
      workplace: string;
      updated_at: string | null;
      deleted_at: string | null;
    }>`SELECT * FROM attendance WHERE deleted_at IS NULL ORDER BY date DESC, time DESC LIMIT 1000`;
  });

export const insertAttendance = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id: string;
      name: string;
      status: string;
      time: string;
      date: string;
      weekday: string;
      gps?: string;
      address?: string;
      photo?: string;
      type?: string;
      approved?: string;
      workplace?: string;
      updatedAt?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    const ts = data.updatedAt ? new Date(data.updatedAt) : new Date();
    await sql`
      INSERT INTO attendance (id, name, status, time, date, weekday, gps, address, photo, type, approved, workplace, updated_at)
      VALUES (${data.id}, ${data.name}, ${data.status}, ${data.time}, ${data.date}, ${data.weekday},
              ${data.gps ?? ""}, ${data.address ?? ""}, ${data.photo ?? null},
              ${data.type ?? "Bình thường"}, ${data.approved ?? "Chưa"}, ${data.workplace ?? "VP"}, ${ts})
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name, status = EXCLUDED.status, time = EXCLUDED.time,
        date = EXCLUDED.date, weekday = EXCLUDED.weekday, gps = EXCLUDED.gps,
        address = EXCLUDED.address, photo = EXCLUDED.photo, workplace = EXCLUDED.workplace,
        updated_at = EXCLUDED.updated_at
      WHERE attendance.updated_at < EXCLUDED.updated_at
    `;
  });

export const bulkInsertAttendance = createServerFn({ method: "POST" })
  .validator(
    (data: {
      rows: Array<{
        id: string;
        name: string;
        status: string;
        time: string;
        date: string;
        weekday: string;
        gps?: string;
        address?: string;
        photo?: string;
        type?: string;
        approved?: string;
        workplace?: string;
        updatedAt?: string;
      }>;
    }) => data,
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    for (const r of data.rows) {
      const ts = r.updatedAt ? new Date(r.updatedAt) : new Date();
      await sql`
        INSERT INTO attendance (id, name, status, time, date, weekday, gps, address, photo, type, approved, workplace, updated_at)
        VALUES (${r.id}, ${r.name}, ${r.status}, ${r.time}, ${r.date}, ${r.weekday},
                ${r.gps ?? ""}, ${r.address ?? ""}, ${r.photo ?? null},
                ${r.type ?? "Bình thường"}, ${r.approved ?? "Chưa"}, ${r.workplace ?? "VP"}, ${ts})
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name, status = EXCLUDED.status, time = EXCLUDED.time,
          date = EXCLUDED.date, weekday = EXCLUDED.weekday, gps = EXCLUDED.gps,
          address = EXCLUDED.address, photo = EXCLUDED.photo, workplace = EXCLUDED.workplace,
          updated_at = EXCLUDED.updated_at
        WHERE attendance.updated_at < EXCLUDED.updated_at
      `;
    }
  });

export const deleteAttendance = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const sql = await getSql();
    // Tombstone — soft delete so other devices can sync the removal
    await sql`UPDATE attendance SET deleted_at = now() WHERE id = ${data.id}`;
  });

export const loadDeletedAttendanceIds = createServerFn({ method: "GET" })
  .handler(async () => {
    const sql = await getSql();
    return sql<{ id: string }>`SELECT id FROM attendance WHERE deleted_at IS NOT NULL`;
  });

/* ─────────────────── Tasks ─────────────────── */

export const loadTasks = createServerFn({ method: "GET" })
  .handler(async () => {
    const sql = await getSql();
    return sql<{
      id: string;
      assignee: string;
      title: string;
      created: string;
      due: string;
      status: string;
      support: string;
      blocker: string;
      updated: string;
      created_by: string;
    }>`SELECT *, created_by as "createdBy" FROM tasks ORDER BY created DESC LIMIT 200`;
  });

export const insertTask = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id: string;
      assignee: string;
      title: string;
      created: string;
      due?: string;
      status?: string;
      support?: string;
      blocker?: string;
      updated: string;
      createdBy?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      INSERT INTO tasks (id, assignee, title, created, due, status, support, blocker, updated, created_by)
      VALUES (${data.id}, ${data.assignee}, ${data.title}, ${data.created},
              ${data.due ?? ""}, ${data.status ?? "Việc cần làm"},
              ${data.support ?? ""}, ${data.blocker ?? ""}, ${data.updated},
              ${data.createdBy ?? ""})
      ON CONFLICT (id) DO NOTHING
    `;
  });

export const updateTaskStatus = createServerFn({ method: "POST" })
  .validator((data: { id: string; status: string; updated: string }) => data)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`UPDATE tasks SET status = ${data.status}, updated = ${data.updated} WHERE id = ${data.id}`;
  });

export const bulkInsertTasks = createServerFn({ method: "POST" })
  .validator(
    (data: {
      rows: Array<{
        id: string;
        assignee: string;
        title: string;
        created: string;
        due?: string;
        status?: string;
        support?: string;
        blocker?: string;
        updated: string;
        createdBy?: string;
      }>;
    }) => data,
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    for (const r of data.rows) {
      await sql`
        INSERT INTO tasks (id, assignee, title, created, due, status, support, blocker, updated, created_by)
        VALUES (${r.id}, ${r.assignee}, ${r.title}, ${r.created},
                ${r.due ?? ""}, ${r.status ?? "Việc cần làm"},
                ${r.support ?? ""}, ${r.blocker ?? ""}, ${r.updated},
                ${r.createdBy ?? ""})
        ON CONFLICT (id) DO NOTHING
      `;
    }
  });

/* ─────────────────── Proposals ─────────────────── */

export const loadProposals = createServerFn({ method: "GET" })
  .handler(async () => {
    const sql = await getSql();
    return sql<{
      id: string;
      kind: string;
      title: string;
      requester: string;
      date: string;
      detail: string;
      status: string;
      dept: string;
    }>`SELECT * FROM proposals ORDER BY date DESC LIMIT 200`;
  });

export const insertProposal = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id: string;
      kind: string;
      title: string;
      requester?: string;
      date: string;
      detail?: string;
      status?: string;
      dept?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      INSERT INTO proposals (id, kind, title, requester, date, detail, status, dept)
      VALUES (${data.id}, ${data.kind}, ${data.title}, ${data.requester ?? ""},
              ${data.date}, ${data.detail ?? ""}, ${data.status ?? "Chờ duyệt"},
              ${data.dept ?? ""})
      ON CONFLICT (id) DO NOTHING
    `;
  });

export const updateProposalStatus = createServerFn({ method: "POST" })
  .validator((data: { id: string; status: string }) => data)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`UPDATE proposals SET status = ${data.status} WHERE id = ${data.id}`;
  });

/* ─────────────────── Notes ─────────────────── */

export const loadNotes = createServerFn({ method: "GET" })
  .handler(async () => {
    const sql = await getSql();
    return sql<{
      id: string;
      stt: string | null;
      date: string;
      content: string;
      author: string;
      deploy: string;
      deadline: string;
      support: string;
      dept: string;
      status: string;
    }>`SELECT * FROM notes ORDER BY date DESC LIMIT 200`;
  });

export const insertNote = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id: string;
      stt?: string;
      date: string;
      content: string;
      author?: string;
      deploy?: string;
      deadline?: string;
      support?: string;
      dept?: string;
      status?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      INSERT INTO notes (id, stt, date, content, author, deploy, deadline, support, dept, status)
      VALUES (${data.id}, ${data.stt ?? null}, ${data.date}, ${data.content},
              ${data.author ?? ""}, ${data.deploy ?? ""}, ${data.deadline ?? ""},
              ${data.support ?? ""}, ${data.dept ?? ""}, ${data.status ?? ""})
      ON CONFLICT (id) DO NOTHING
    `;
  });

/* ─────────────────── Messages ─────────────────── */

export const loadMessages = createServerFn({ method: "GET" })
  .validator((data: { channel: string }) => data)
  .handler(async ({ data }) => {
    const sql = await getSql();
    return sql<{
      id: string;
      from_name: string;
      text: string;
      at: string;
      channel: string;
    }>`SELECT * FROM messages WHERE channel = ${data.channel} ORDER BY at ASC LIMIT 200`;
  });

export const insertMessage = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id: string;
      from: string;
      text: string;
      at: string;
      channel: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      INSERT INTO messages (id, from_name, text, at, channel)
      VALUES (${data.id}, ${data.from}, ${data.text}, ${data.at}, ${data.channel})
      ON CONFLICT (id) DO NOTHING
    `;
  });

export const bulkInsertMessages = createServerFn({ method: "POST" })
  .validator(
    (data: {
      rows: Array<{
        id: string;
        from: string;
        text: string;
        at: string;
        channel: string;
      }>;
    }) => data,
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    for (const r of data.rows) {
      await sql`
        INSERT INTO messages (id, from_name, text, at, channel)
        VALUES (${r.id}, ${r.from}, ${r.text}, ${r.at}, ${r.channel})
        ON CONFLICT (id) DO NOTHING
      `;
    }
  });

/* ─────────────────── Check-ins ─────────────────── */

export const loadCheckins = createServerFn({ method: "GET" })
  .handler(async () => {
    const sql = await getSql();
    return sql<{
      id: string;
      name: string;
      time: string;
      date: string;
      weekday: string;
      gps: string;
      address: string;
      note: string;
    }>`SELECT * FROM checkins ORDER BY date DESC, time DESC LIMIT 200`;
  });

export const insertCheckin = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id: string;
      name: string;
      time: string;
      date: string;
      weekday: string;
      gps?: string;
      address?: string;
      note?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      INSERT INTO checkins (id, name, time, date, weekday, gps, address, note)
      VALUES (${data.id}, ${data.name}, ${data.time}, ${data.date}, ${data.weekday},
              ${data.gps ?? ""}, ${data.address ?? ""}, ${data.note ?? ""})
      ON CONFLICT (id) DO NOTHING
    `;
  });

/* ─────────────────── Clear attendance ─────────────────── */

export const clearAttendance = createServerFn({ method: "POST" })
  .handler(async () => {
    const sql = await getSql();
    await sql`DELETE FROM attendance`;
  });

/* ─────────────────── Seed check ─────────────────── */

export const isTableEmpty = createServerFn({ method: "GET" })
  .validator((data: { table: string }) => data)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const allowed = [
      "attendance",
      "tasks",
      "proposals",
      "notes",
      "messages",
      "checkins",
    ];
    if (!allowed.includes(data.table)) return true;
    const rows = await sql.query<{ count: number }>(
      `SELECT COUNT(*) as count FROM "${data.table}"`,
    );
    return Number(rows[0]?.count ?? 0) === 0;
  });

/* ─────────── Reverse Geocoding (server-side) ─────────── */

export const reverseGeocode = createServerFn({ method: "GET" })
  .validator((d: { lat: number; lng: number }) => d)
  .handler(async ({ data }) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${data.lat}&lon=${data.lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            "Accept-Language": "vi",
            "User-Agent": "GIONG-VN/1.0 (cham-cong-app)",
          },
        },
      );
      const json = await res.json();
      return json.display_name || "";
    } catch {
      return "";
    }
  });

/* ─────────── TEMP: Fix duplicate employees ─────────── */
export const fixDuplicateEmployees = createServerFn({ method: "POST" })
  .handler(async () => {
    const sql = await getSql();
    const results: string[] = [];
    // Find emails with multiple employees
    const dupes = await sql<{ email: string; count: number }>`
      SELECT LOWER(email) as email, COUNT(*) as count FROM employees WHERE status = 'active' AND email IS NOT NULL AND email != '' GROUP BY LOWER(email) HAVING COUNT(*) > 1
    `;
    for (const d of dupes) {
      const employees = await sql<{ id: string; name: string; role: string }>`
        SELECT id, name, role FROM employees WHERE LOWER(email) = ${d.email} AND status = 'active' ORDER BY CASE WHEN role = 'Admin' THEN 0 ELSE 1 END
      `;
      if (employees.length > 1) {
        // Keep the Admin one, soft-delete the rest
        const keep = employees[0];
        for (let i = 1; i < employees.length; i++) {
          await sql`UPDATE employees SET status = 'inactive' WHERE id = ${employees[i].id}`;
          results.push(`Deleted: ${employees[i].name} (role=${employees[i].role}) — kept ${keep.name} (role=${keep.role})`);
        }
      }
    }
    if (results.length === 0) results.push('No duplicates found');
    const all = await sql<{ name: string; email: string; role: string }>`
      SELECT name, email, role FROM employees WHERE status = 'active' ORDER BY role, name
    `;
    return { results, allEmployees: all };
  });