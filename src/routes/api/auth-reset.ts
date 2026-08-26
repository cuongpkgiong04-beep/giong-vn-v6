/**
 * Server function for password reset using createServerFn
 */

import { createServerFn } from "@tanstack/react-start";
import crypto from "crypto";
import { getSql } from "@/lib/db";

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
 * Hash password using scrypt (same as Better Auth)
 */
function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex');
    crypto.scrypt(password, salt, 64, (err, hash) => {
      if (err) reject(err);
      resolve(salt + ':' + hash.toString('hex'));
    });
  });
}

/**
 * Send password reset - generates temporary password
 */
export const sendPasswordReset = createServerFn({ method: "POST" })
  .validator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const { email } = data;
    
    // Find user by email
    const users = await sql<{ id: string; email: string; name: string }>`
      SELECT id, email, name FROM "user" WHERE LOWER(email) = LOWER(${email})
    `;
    
    if (users.length === 0) {
      throw new Error("Không tìm thấy tài khoản với email này");
    }
    
    const user = users[0];
    
    // Generate temporary password
    const tempPassword = generateTempPassword();
    const hashedPassword = await hashPassword(tempPassword);
    
    // Check if account exists (Better Auth uses providerId 'credential' for email/password)
    const accounts = await sql<{ id: string }>`
      SELECT id FROM account WHERE "userId" = ${user.id} AND "providerId" = 'credential'
    `;
    
    if (accounts.length > 0) {
      // Update existing account
      await sql`
        UPDATE account SET password = ${hashedPassword}, "updatedAt" = NOW() 
        WHERE "userId" = ${user.id} AND "providerId" = 'credential'
      `;
    } else {
      // Create new account with providerId 'credential'
      await sql`
        INSERT INTO account (id, "accountId", "providerId", "userId", password, "createdAt", "updatedAt")
        VALUES (${crypto.randomUUID()}, ${user.id}, 'credential', ${user.id}, ${hashedPassword}, NOW(), NOW())
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
