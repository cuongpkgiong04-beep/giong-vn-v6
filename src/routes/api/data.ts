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
    // Fallback nếu cột assigner chưa có (migration 0016 chưa chạy)
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
      assigner: string;
      photo: string | null;
      location: string;
    }>`SELECT *, created_by as "createdBy", COALESCE(assigner, created_by) as "assigner" FROM tasks ORDER BY created DESC LIMIT 200`
      .catch(() => sql<{
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
        assigner: string;
        photo: string | null;
        location: string;
      }>`SELECT *, created_by as "createdBy", '' as "assigner" FROM tasks ORDER BY created DESC LIMIT 200`);
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
      assigner?: string;
      photo?: string;
      location?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      INSERT INTO tasks (id, assignee, title, created, due, status, support, blocker, updated, created_by, assigner, photo, location)
      VALUES (${data.id}, ${data.assignee}, ${data.title}, ${data.created},
              ${data.due ?? ""}, ${data.status ?? "Việc cần làm"},
              ${data.support ?? ""}, ${data.blocker ?? ""}, ${data.updated},
              ${data.createdBy ?? ""}, ${data.assigner ?? data.createdBy ?? ""}, ${data.photo ?? null}, ${data.location ?? ""})
      ON CONFLICT (id) DO NOTHING
    `;
  });

export const updateTaskStatus = createServerFn({ method: "POST" })
  .validator((data: { id: string; status: string; updated: string }) => data)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`UPDATE tasks SET status = ${data.status}, updated = ${data.updated} WHERE id = ${data.id}`;
  });

export const updateTask = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id: string;
      assignee: string;
      title: string;
      due: string;
      support: string;
      blocker: string;
      photo?: string;
      location?: string;
      updated: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`UPDATE tasks SET
      assignee = ${data.assignee},
      title = ${data.title},
      due = ${data.due},
      support = ${data.support},
      blocker = ${data.blocker},
      photo = ${data.photo ?? null},
      location = ${data.location ?? null},
      updated = ${data.updated}
      WHERE id = ${data.id}`;
  });

export const deleteTask = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`DELETE FROM tasks WHERE id = ${data.id}`;
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
        assigner?: string;
        photo?: string;
        location?: string;
      }>;
    }) => data,
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    for (const r of data.rows) {
      await sql`
        INSERT INTO tasks (id, assignee, title, created, due, status, support, blocker, updated, created_by, assigner, photo, location)
        VALUES (${r.id}, ${r.assignee}, ${r.title}, ${r.created},
                ${r.due ?? ""}, ${r.status ?? "Việc cần làm"},
                ${r.support ?? ""}, ${r.blocker ?? ""}, ${r.updated},
                ${r.createdBy ?? ""}, ${r.assigner ?? r.createdBy ?? ""}, ${r.photo ?? null}, ${r.location ?? ""})
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
    }>`SELECT * FROM checkins ORDER BY date DESC, time DESC LIMIT 500`;
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
      photo?: string;
      centerCode?: string;
      status?: string;
      updatedAt?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    const ts = data.updatedAt ? new Date(data.updatedAt) : new Date();
    try {
      // Try with new columns (migration 0014)
      await sql`
        INSERT INTO checkins (id, name, time, date, weekday, gps, address, note, photo, center_code, status, updated_at)
        VALUES (${data.id}, ${data.name}, ${data.time}, ${data.date}, ${data.weekday},
                ${data.gps ?? ""}, ${data.address ?? ""}, ${data.note ?? ""},
                ${data.photo ?? ""}, ${data.centerCode ?? "VP"}, ${data.status ?? "checked_in"}, ${ts})
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name, time = EXCLUDED.time, date = EXCLUDED.date,
          weekday = EXCLUDED.weekday, gps = EXCLUDED.gps, address = EXCLUDED.address,
          note = EXCLUDED.note, photo = EXCLUDED.photo, center_code = EXCLUDED.center_code,
          status = EXCLUDED.status, updated_at = EXCLUDED.updated_at
        WHERE checkins.updated_at < EXCLUDED.updated_at
      `;
    } catch {
      // Fallback: old columns only (migration 0014 not yet applied)
      await sql`
        INSERT INTO checkins (id, name, time, date, weekday, gps, address, note)
        VALUES (${data.id}, ${data.name}, ${data.time}, ${data.date}, ${data.weekday},
                ${data.gps ?? ""}, ${data.address ?? ""}, ${data.note ?? ""})
        ON CONFLICT (id) DO NOTHING
      `;
    }
  });

export const deleteCheckin = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`UPDATE checkins SET deleted_at = now() WHERE id = ${data.id}`;
  });

export const loadDeletedCheckinIds = createServerFn({ method: "GET" })
  .handler(async () => {
    const sql = await getSql();
    return sql<{ id: string }>`SELECT id FROM checkins WHERE deleted_at IS NOT NULL`;
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

/* ─────────── TEMP: Fix admin roles in DB ─────────── */
export const fixAdminRoles = createServerFn({ method: "POST" })
  .handler(async () => {
    const sql = await getSql();
    const results: string[] = [];
    // Known admin emails from catalog
    const adminEmails = [
      'cuongpk.giong04@gmail.com',
      'cuongpk.giong02@gmail.com',
      'thuynvy218@gmail.com',
      'hoangminhchau2631960@gmail.com',
    ];
    for (const email of adminEmails) {
      const r = await sql<{ name: string }>`
        UPDATE employees SET role = 'Admin' WHERE LOWER(email) = LOWER(${email}) AND status = 'active' RETURNING name
      `;
      if (r.length > 0) results.push(`Set Admin: ${r[0].name}`);
      else results.push(`Not found: ${email}`);
    }
    const all = await sql<{ name: string; email: string; role: string }>`
      SELECT name, email, role FROM employees WHERE status = 'active' ORDER BY role DESC, name
    `;
    return { results, allEmployees: all };
  });