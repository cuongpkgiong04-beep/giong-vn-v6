/**
 * Server function for password reset using createServerFn
 */

import { createServerFn } from "@tanstack/react-start";
import crypto from "crypto";
import { getSql } from "@/lib/db"
import { auth } from "@/lib/auth/server";

/**
 * Generate a random temporary password
 */
function generateTempPassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  const special = "!@#$%";
  let password = "";
  
  // Ensure at least one uppercase, one lowercase, one number, one special
  password += chars[Math.floor(Math.random() * 23)]; // uppercase
  password += chars[Math.floor(Math.random() * 23) + 23]; // lowercase
  password += chars[Math.floor(Math.random() * 10) + 46]; // number
  password += special[Math.floor(Math.random() * special.length)]; // special
  
  // Add more random characters
  for (let i = 0; i < 8; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
}



/**
 * Send password reset - generates temporary password
 */
export const sendPasswordReset = createServerFn({ method: "POST" })
  .validator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const { email } = data;
    
    // Find user by email in Better Auth user table
    let users = await sql<{ id: string; email: string; name: string }>`
      SELECT id, email, name FROM "user" WHERE LOWER(email) = LOWER(${email})
    `;
    
    // If not found in Better Auth, check employees table and auto-create auth account
    if (users.length === 0) {
      const emps = await sql<{ id: string; name: string; email: string }>`
        SELECT id, name, email FROM employees WHERE LOWER(email) = LOWER(${email}) AND status = 'active' LIMIT 1
      `;
      if (emps.length === 0) {
        throw new Error("Không tìm thấy tài khoản với email này");
      }
      // Auto-create Better Auth user from employee data
      const emp = emps[0];
      const tempPwd = generateTempPassword();
      const { hashPassword } = await import("better-auth/crypto");
      const hashedPwd = await hashPassword(tempPwd);
      // Create user
      const userId = crypto.randomUUID();
      await sql`
        INSERT INTO "user" ("id", "name", "email", "emailVerified", "createdAt", "updatedAt")
        VALUES (${userId}, ${emp.name}, ${emp.email}, true, NOW(), NOW())
        ON CONFLICT ("email") DO NOTHING
      `;
      // Create account
      await sql`
        INSERT INTO "account" ("id", "accountId", "providerId", "userId", "password", "createdAt", "updatedAt")
        VALUES (${crypto.randomUUID()}, ${emp.email}, 'email', ${userId}, ${hashedPwd}, NOW(), NOW())
        ON CONFLICT DO NOTHING
      `;
      // Re-query to get the user
      users = await sql<{ id: string; email: string; name: string }>`
        SELECT id, email, name FROM "user" WHERE LOWER(email) = LOWER(${email})
      `;
      if (users.length === 0) {
        throw new Error("Không thể tạo tài khoản auth");
      }
    }
    
    const user = users[0];
    
    // Generate temporary password
    const tempPassword = generateTempPassword();
    
    // Use Better Auth's native hashPassword (correct hash format)
    const { hashPassword } = await import("better-auth/crypto");
    const hashedPassword = await hashPassword(tempPassword);
    
    // Check if account exists (Better Auth uses providerId 'email' for email/password)
    const accounts = await sql<{ id: string }>`
      SELECT id FROM account WHERE "userId" = ${user.id} AND "providerId" = 'email'
    `;
    
    if (accounts.length > 0) {
      // Update existing account
      await sql`
        UPDATE account SET password = ${hashedPassword}, "updatedAt" = NOW() 
        WHERE "userId" = ${user.id} AND "providerId" = 'email'
      `;
    } else {
      // Create new account with providerId 'email'
      await sql`
        INSERT INTO account (id, "accountId", "providerId", "userId", password, "createdAt", "updatedAt")
        VALUES (${crypto.randomUUID()}, ${user.id}, 'email', ${user.id}, ${hashedPassword}, NOW(), NOW())
      `;
    }
    
    // In production, you would send an email here with the temp password
    // For now, return it directly (displayed on screen)
    console.log(`[Password Reset] User: ${user.email}, Temp Password: ${tempPassword}`);
    
    return {
      success: true,
      tempPassword,
      message: `Mật khẩu tạm thời đã được tạo cho ${user.name}`,
    };
  });
