/**
 * Server functions for loading catalog data (employees, centers) from DB.
 * Replaces the hardcoded arrays in catalog.ts.
 */
import { getSql } from "@/lib/db";
import { createServerFn } from "@tanstack/react-start";

export type DbEmployee = {
  id: string;
  center_id: string;
  department: string;
  title: string;
  gender: string;
  phone: string;
  hire_date: string;
  status: string;
  catalog_id: string;
  name: string;
  email: string;
  username: string;
  center: string;
  auth_user_id: string | null;
};

export type DbCenter = {
  id: string;
  code: string;
  name: string;
  short_name: string;
  city: string;
  district: string;
  address: string;
  status: string;
};

/** Load all active employees with center info. */
export const loadEmployees = createServerFn({ method: "GET" }).handler(
  async () => {
    const sql = await getSql();
    return sql<DbEmployee>`
      SELECT
        e.id,
        e.center_id,
        e.department,
        e.title,
        e.gender,
        COALESCE(e.phone, '') as phone,
        COALESCE(e.hire_date::text, '') as hire_date,
        e.status,
        COALESCE(e.catalog_id, '') as catalog_id,
        COALESCE(e.name, '') as name,
        COALESCE(e.email, '') as email,
        COALESCE(e.username, '') as username,
        COALESCE(e.center, '') as center,
        e.auth_user_id
      FROM employees e
      WHERE e.status = 'active'
      ORDER BY e.department, e.name
    `;
  },
);

/** Load all active centers. */
export const loadCenters = createServerFn({ method: "GET" }).handler(
  async () => {
    const sql = await getSql();
    return sql<DbCenter>`
      SELECT
        id,
        code,
        name,
        short_name,
        city,
        COALESCE(district, '') as district,
        COALESCE(address, '') as address,
        status
      FROM centers
      WHERE status = 'active'
      ORDER BY code
    `;
  },
);
