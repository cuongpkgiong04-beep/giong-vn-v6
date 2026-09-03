/**
 * Debug endpoint: check checkins table status in Neon.
 * DELETE this after debugging.
 */
import { getSql } from "@/lib/db";
import { createServerFn } from "@tanstack/react-start";

export const debugCheckins = createServerFn({ method: "GET" })
  // @ts-ignore debug only
  .handler(async ({ data }: any) => {
    const sql = await getSql();
    const result: Record<string, any> = {};

    // 1. Count all checkins
    try {
      const countResult = await sql`SELECT COUNT(*) as count FROM checkins`;
      result.totalCheckins = Number(countResult[0]?.count ?? 0);
    } catch (err: any) {
      result.countError = err.message;
    }

    // 2. Check table columns
    try {
      const columns = await sql`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'checkins'
        ORDER BY ordinal_position
      `;
      result.columns = columns.map((c: any) => `${c.column_name} (${c.data_type})`);
    } catch (err: any) {
      result.columnsError = err.message;
    }

    // 3. Check migration table
    try {
      const migrations = await sql`SELECT name FROM _migrations ORDER BY name`;
      result.appliedMigrations = migrations.map((m: any) => m.name);
    } catch (err: any) {
      result.migrationError = err.message;
    }

    // 4. Sample data (first 10)
    try {
      const rows = await sql`SELECT id, name, date, time, gps, center_code, photo FROM checkins ORDER BY date DESC, time DESC LIMIT 10`;
      result.sampleData = rows;
    } catch (err: any) {
      result.sampleError = err.message;
    }

    return result;
  });
