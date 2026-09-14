/**
 * GĐ B hệ sinh thái (2026-09-14) — SSO JWT handoff sang app con
 *
 * App tổng ký JWT 60 giây chứa thông tin employee, app con verify bằng
 * APP_JWT_SECRET chung (set trên cả 2 project Vercel) rồi tự tạo phiên riêng.
 * 2 app KHÔNG chia sẻ cookie/domain — chỉ chia sẻ bí mật ký token.
 */

import { createServerFn } from "@tanstack/react-start";
import { SignJWT } from "jose";
import { getSql } from "@/lib/db";

export type SsoPayload = {
  /** employee id (bảng employees của app tổng) */
  empId: string;
  /** tên hiển thị */
  name: string;
  /** email Better Auth */
  email: string;
  /** vai trò (role) của employee */
  role: string;
  /** mã trung tâm */
  center: string;
};

export const createSsoToken = createServerFn({ method: "GET" })
  .handler(async (): Promise<{ ok: boolean; token?: string; url?: string; error?: string }> => {
    try {
      // Session Better Auth — pattern GĐ 19 (bypass authConfigured)
      const { getRequest } = await import("@tanstack/react-start/server");
      const { auth } = await import("@/lib/auth/server");
      const request = getRequest();
      if (!request) return { ok: false, error: "Không tìm thấy request" };
      const session = await auth.api.getSession({ headers: request.headers });
      if (!session?.user) return { ok: false, error: "Vui lòng đăng nhập" };

      // Map auth user → employee (cùng logic app-shell.tsx: email trước, tên sau)
      const sql = await getSql();
      const email = session.user.email ?? "";
      const userName = session.user.name ?? "";
      const rows = await sql<{ id: string; name: string; role: string; center: string }>`
        SELECT id, name, COALESCE(role, 'User') as role, COALESCE(center, '') as center
        FROM employees
        WHERE lower(email) = lower(${email})
           OR (email = '' AND name = ${userName})
        ORDER BY CASE WHEN lower(email) = lower(${email}) THEN 0 ELSE 1 END, id
        LIMIT 1
      `;
      const emp = rows[0];
      if (!emp) return { ok: false, error: "Không tìm thấy nhân sự ứng với tài khoản" };

      const secret = process.env.APP_JWT_SECRET;
      if (!secret) {
        // Chưa set secret → báo lỗi rõ (nút sidebar sẽ fallback mở link thẳng)
        return { ok: false, error: "APP_JWT_SECRET chưa cấu hình" };
      }

      const key = new TextEncoder().encode(secret);
      const token = await new SignJWT({
        empId: emp.id,
        name: emp.name,
        email,
        role: emp.role,
        center: emp.center,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("60s") // handoff 60s — dư thời gian mở app con
        .setIssuer("giong-vn-v6")
        .setAudience("giong-banhang")
        .setSubject(emp.id)
        .sign(key);

      const url = `https://giong-banhang.vercel.app/?sso=${encodeURIComponent(token)}`;
      return { ok: true, token, url };
    } catch (err) {
      console.error("[createSsoToken]", err);
      return { ok: false, error: err instanceof Error ? err.message : "Lỗi không xác định" };
    }
  });
