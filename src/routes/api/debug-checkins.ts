import { getSql } from "@/lib/db";
import { createServerFn } from "@tanstack/react-start";

export const debugCheckins = createServerFn({ method: "GET" })
  // @ts-ignore debug only
  .handler(async ({ data }: any) => {
    const sql = await getSql();
    const r: Record<string, any> = {};
    try { r.count = (await sql`SELECT COUNT(*) as c FROM checkins`)[0]?.c; } catch(e: any) { r.countErr = e.message; }
    try { r.allNames = await sql`SELECT DISTINCT name FROM checkins`; } catch(e: any) { r.nameErr = e.message; }
    try { r.recent = await sql`SELECT id, name, date, time, gps, center_code FROM checkins ORDER BY date DESC, time DESC LIMIT 10`; } catch(e: any) { r.recentErr = e.message; }
    try { r.emp01 = await sql`SELECT id, name, email, center, role FROM employees WHERE name ILIKE '%Cường_01%' OR email = 'cuongpk.giong01@gmail.com'`; } catch(e: any) { r.empErr = e.message; }
    return r;
  });
