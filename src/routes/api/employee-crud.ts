/**
 * Server functions for Employee CRUD.
 * Clean rewrite — separated from catalog-data.ts for clarity.
 */
import { getSql } from "@/lib/db";
import { createServerFn } from "@tanstack/react-start";

type EmployeeInput = {
  name: string;
  username: string;
  gender: string;
  phone: string;
  email: string;
  department: string;
  role: string;
  title: string;
  center: string;
};

/** Insert a new employee. */
export const insertEmployee = createServerFn({ method: "POST" })
  .validator((data: EmployeeInput) => data)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const id = crypto.randomUUID();
    await sql`
      INSERT INTO employees (id, name, username, gender, phone, email, department, role, title, center, status, hire_date)
      VALUES (${id}, ${data.name}, ${data.username}, ${data.gender}, ${data.phone}, ${data.email}, ${data.department}, ${data.role}, ${data.title}, ${data.center}, 'active', CURRENT_DATE)
    `;
    return { id, ...data, status: "active" };
  });

/** Update an existing employee. */
export const updateEmployee = createServerFn({ method: "POST" })
  .validator((data: { id: string } & EmployeeInput) => data)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      UPDATE employees
      SET name = ${data.name}, username = ${data.username}, gender = ${data.gender},
          phone = ${data.phone}, email = ${data.email}, department = ${data.department},
          role = ${data.role}, title = ${data.title}, center = ${data.center}
      WHERE id = ${data.id}
    `;
    return { success: true };
  });

/** Soft-delete an employee. */
export const deleteEmployee = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`UPDATE employees SET status = 'inactive' WHERE id = ${data.id}`;
    return { success: true };
  });

/** Reset employee password via Better Auth. */
export const resetEmployeePassword = createServerFn({ method: "POST" })
  .validator((data: { email: string; newPassword: string }) => data)
  .handler(async ({ data }) => {
    const sql = await getSql();
    // Find user in Better Auth tables
    const users = await sql<{ id: string }>`
      SELECT id FROM "user" WHERE email = ${data.email} LIMIT 1
    `;
    if (users.length === 0) {
      return { success: false, error: "User not found in auth" };
    }
    const userId = users[0].id;
    // Hash new password
    const { hashPassword } = await import("better-auth/crypto");
    const hashed = await hashPassword(data.newPassword);
    // Update or insert account
    const accounts = await sql<{ id: string }>`
      SELECT id FROM "account" WHERE "userId" = ${userId} AND "providerId" = 'email' LIMIT 1
    `;
    if (accounts.length > 0) {
      await sql`
        UPDATE "account" SET password = ${JSON.stringify(hashed)}, "updatedAt" = NOW()
        WHERE id = ${accounts[0].id}
      `;
    } else {
      await sql`
        INSERT INTO "account" (id, "userId", "accountId", "providerId", password, "createdAt", "updatedAt")
        VALUES (${crypto.randomUUID()}, ${userId}, ${data.email}, 'email', ${JSON.stringify(hashed)}, NOW(), NOW())
      `;
    }
    return { success: true };
  });

/** Sync all approved registrations → employees table. */
export const syncApprovedToEmployees = createServerFn({ method: "POST" })
  .handler(async () => {
    const sql = await getSql();
    const approved = await sql<{ id: string; name: string; email: string }>`
      SELECT id, name, email FROM registration_requests WHERE status = 'approved'
    `;
    let created = 0;
    for (const reg of approved) {
      const existing = await sql<{ id: string }>`
        SELECT id FROM employees WHERE LOWER(email) = LOWER(${reg.email}) LIMIT 1
      `;
      if (existing.length === 0) {
        const empId = crypto.randomUUID();
        const username = reg.email.split("@")[0];
        await sql`
          INSERT INTO employees (id, name, username, gender, phone, email, department, role, title, center, status, hire_date)
          VALUES (${empId}, ${reg.name}, ${username}, 'Nam', '', ${reg.email}, 'Chưa phân bộ', 'User', 'Nhân viên', 'VP', 'active', CURRENT_DATE)
        `;
        created++;
      }
    }
    return { total: approved.length, created };
  });
