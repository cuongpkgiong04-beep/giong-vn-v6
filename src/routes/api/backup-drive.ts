/**
 * Backup Google Drive (GĐ 103 — phòng tràn Neon / cứu hộ dữ liệu).
 *
 * Gom TOÀN BỘ bảng nghiệp vụ từ Neon thành 1 file JSON
 * `giong-vn-backup-yyyy-mm-dd-hhmm.json` rồi upload lên Google Drive
 * bằng OAuth refresh token của chủ tài khoản (quota 15GB của Đại ca —
 * Service Account Gmail thường KHÔNG có dung lượng riêng nên không dùng được).
 *
 * Env bắt buộc (set trên Vercel):
 *   GOOGLE_REFRESH_TOKEN — refresh token OAuth có scope drive (từ gcloud ADC)
 *   GOOGLE_CLIENT_ID     — client_id đi kèm refresh token
 *   GOOGLE_CLIENT_SECRET — client_secret đi kèm refresh token
 *   GOOGLE_DRIVE_FOLDER_ID — ID thư mục Drive "GIONG-VN-Backup"
 *
 * Thiếu env → trả { ok:false, reason:"not-configured" } — nút backup báo rõ,
 * app không bị ảnh hưởng. File JSON nhẹ (~2.4MB toàn hệ thống hiện tại) — upload
 * đơn giản 1 request multipart, KHÔNG dùng resumable. Không phụ thuộc package
 * googleapis — thuần fetch (nhẹ bundle serverless).
 */
import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";

function driveConfig() {
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN ?? "";
  const clientId = process.env.GOOGLE_CLIENT_ID ?? "";
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET ?? "";
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID ?? "";
  return { refreshToken, clientId, clientSecret, folderId, configured: Boolean(refreshToken && clientId && clientSecret && folderId) };
}

async function getAccessToken(cfg: ReturnType<typeof driveConfig>): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: cfg.clientId,
      client_secret: cfg.clientSecret,
      refresh_token: cfg.refreshToken,
      grant_type: "refresh_token",
    }),
  });
  const data = (await res.json()) as { access_token?: string; error_description?: string };
  if (!data.access_token) throw new Error(`Lấy access token thất bại: ${data.error_description ?? res.status}`);
  return data.access_token;
}

export const getBackupConfigStatus = createServerFn({ method: "GET" }).handler(async () => {
  return { configured: driveConfig().configured };
});

type TableSpec = { key: string; sql: string };

/** Danh sách bảng + cột cần backup — SELECT * để không sót cột mới tương lai. */
const TABLES: TableSpec[] = [
  { key: "attendance", sql: "SELECT * FROM attendance ORDER BY date DESC, time DESC LIMIT 50000" },
  { key: "checkins", sql: "SELECT * FROM checkins ORDER BY date DESC, time DESC LIMIT 50000" },
  { key: "tasks", sql: "SELECT * FROM tasks ORDER BY created DESC LIMIT 50000" },
  { key: "proposals", sql: "SELECT * FROM proposals ORDER BY date DESC LIMIT 50000" },
  { key: "notes", sql: "SELECT * FROM notes ORDER BY date DESC LIMIT 50000" },
  { key: "messages", sql: "SELECT * FROM messages ORDER BY at DESC LIMIT 50000" },
  { key: "chat_groups", sql: "SELECT * FROM chat_groups LIMIT 10000" },
  { key: "chat_group_members", sql: "SELECT * FROM chat_group_members LIMIT 50000" },
  { key: "documents", sql: "SELECT * FROM documents ORDER BY date DESC LIMIT 20000" },
  { key: "employees", sql: "SELECT * FROM employees LIMIT 10000" },
  { key: "centers", sql: "SELECT * FROM centers LIMIT 1000" },
  { key: "registration_requests", sql: "SELECT * FROM registration_requests LIMIT 10000" },
];

export const backupToDrive = createServerFn({ method: "POST" }).handler(async () => {
  const cfg = driveConfig();
  if (!cfg.configured) {
    return { ok: false as const, reason: "not-configured" as const };
  }

  const sql = await getSql();
  const data: Record<string, unknown[]> = {};
  const counts: Record<string, number> = {};
  for (const t of TABLES) {
    try {
      const rows = await sql.query(t.sql);
      data[t.key] = rows;
      counts[t.key] = rows.length;
    } catch (err) {
      // Bảng chưa có (migration cũ mới) — ghi rỗng, không chặn bảng khác
      console.warn(`[backup] Bảng ${t.key} load lỗi (bỏ qua):`, (err as Error).message);
      data[t.key] = [];
      counts[t.key] = 0;
    }
  }

  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const stamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
  const fileName = `giong-vn-backup-${stamp}.json`;
  const json = JSON.stringify({
    meta: { app: "GIONG VIETNAM", exportedAt: now.toISOString(), counts },
    data,
  });

  try {
    const accessToken = await getAccessToken(cfg);
    const boundary = "giong" + Date.now();
    const meta = { name: fileName, parents: [cfg.folderId], mimeType: "application/json" };
    const body =
      `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n` +
      JSON.stringify(meta) +
      `\r\n--${boundary}\r\nContent-Type: application/json\r\n\r\n` +
      json +
      `\r\n--${boundary}--`;

    const res = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,size,webViewLink", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body,
    });
    const up = (await res.json()) as { id?: string; name?: string; size?: string; webViewLink?: string; error?: { message: string } };
    if (!res.ok || !up.id) throw new Error(up.error?.message ?? `Upload HTTP ${res.status}`);

    return {
      ok: true as const,
      fileName,
      fileId: up.id ?? "",
      webViewLink: up.webViewLink ?? "",
      totalBytes: json.length,
      counts,
    };
  } catch (err) {
    console.error("[backup] Google Drive upload failed:", err);
    return { ok: false as const, reason: "drive-error" as const, message: (err as Error).message };
  }
});
