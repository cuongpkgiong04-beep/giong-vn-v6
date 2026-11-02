import { getSql } from "@/lib/db";
import { createServerFn } from "@tanstack/react-start";

// GĐ 630/C.394 + GĐ 632 (02/11/2026): API module Zalo — đọc GiondDB qua tunnel
// (getSql → TUNNEL_API_BASE_URL → API Server → SQL Server GiondDB).
// Bảng: zalo_groups / zalo_messages / zalo_files / zalo_price_signals (migration 0031).

export type ZaloGroup = {
  id: string;
  zalo_group_id: string;
  zalo_name: string;
  member_count: number;
  is_sync_enabled: boolean;
  purpose_label: string;
  ai_suggested_label: string;
  last_sync_at: string | null;
  updated_at: string;
};

export type ZaloMessage = {
  id: string;
  zalo_group_id: string;
  zalo_message_id: string;
  sender_name: string;
  sender_zalo_id: string;
  text: string;
  at: string;
  attachments: unknown[];
  updated_at: string;
};

export type ZaloFile = {
  id: string;
  zalo_message_id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  created_at: string;
};

export const loadZaloGroups = createServerFn({ method: "GET" })
  .handler(async (): Promise<ZaloGroup[]> => {
    const sql = await getSql();
    return sql<ZaloGroup>`
      SELECT id, zalo_group_id, zalo_name, member_count, is_sync_enabled,
             purpose_label, ai_suggested_label, last_sync_at, updated_at
      FROM zalo_groups
      ORDER BY zalo_name ASC
    `;
  });

export const updateZaloGroup = createServerFn({ method: "POST" })
  .validator((data: { id: string; is_sync_enabled?: boolean; purpose_label?: string; ai_suggested_label?: string }) => data)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      UPDATE zalo_groups SET
        is_sync_enabled = COALESCE(${data.is_sync_enabled ?? null}, is_sync_enabled),
        purpose_label = COALESCE(${data.purpose_label ?? null}, purpose_label),
        ai_suggested_label = COALESCE(${data.ai_suggested_label ?? null}, ai_suggested_label),
        updated_at = now()
      WHERE id = ${data.id}
    `;
  });

/** Gợi ý nhãn THEO TÊN NHÓM (nhanh, không cần tin nhắn). */
export const suggestLabel = createServerFn({ method: "POST" })
  .validator((data: { zalo_group_id: string }) => data)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const row = await sql<{ zalo_name: string }>`
      SELECT zalo_name FROM zalo_groups WHERE zalo_group_id = ${data.zalo_group_id} LIMIT 1
    `;
    if (!row || row.length === 0) return { suggested: "" };
    const name = (row[0].zalo_name || "").toLowerCase();
    let suggested = "Tổng hợp";
    if (name.includes("mua") || name.includes("đơn hàng") || name.includes("ncc") || name.includes("nhà cung")) {
      suggested = "Mua hàng";
    } else if (name.includes("công nợ") || name.includes("thu ngân") || name.includes("thanh toán")) {
      suggested = "Bán hàng";
    } else if (name.includes("kho") || name.includes("bán hàng") || name.includes("marketing")) {
      suggested = "Bán hàng";
    } else if (name.includes("giá") || name.includes("báo giá")) {
      suggested = "Giá NCC";
    }
    return { suggested };
  });

/** Phân tích nhãn theo TÊN NHÓM + 20 TIN MẪU (điểm từ khóa, trả kèm độ tin cậy). */
export const analyzeGroupLabel = createServerFn({ method: "POST" })
  .validator((data: { zalo_group_id: string }) => data)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const groupRow = await sql<{ zalo_name: string }>`
      SELECT zalo_name FROM zalo_groups WHERE zalo_group_id = ${data.zalo_group_id} LIMIT 1
    `;
    if (!groupRow || groupRow.length === 0) {
      return { suggested: "Tổng hợp", confidence: 0, reasons: [] as string[] };
    }
    const groupName = (groupRow[0].zalo_name || "").toLowerCase();
    const msgs = await sql<{ text: string }>`
      SELECT text FROM zalo_messages
      WHERE zalo_group_id = ${data.zalo_group_id}
      ORDER BY at DESC
      LIMIT 20
    `;
    const sample = msgs.map((m) => (m.text || "").toLowerCase()).join(" ");
    const allText = `${groupName} ${sample}`;

    const GROUPS: Record<string, string[]> = {
      "Mua hàng": ["mua", "đơn hàng", "ncc", "nhà cung", "đặt hàng", "báo giá", "giá nhập", "chốt đơn"],
      "Bán hàng": ["bán", "khách", "công nợ", "thu ngân", "xuất kho", "hóa đơn", "doanh thu", "thanh toán"],
      "Giá NCC": ["giá", "niêm yết", "chiết khấu", "vnđ", "đồng/liều", "price"],
      "Tổng hợp": ["thông báo", "tổng hợp", "họp", "nội bộ", "lịch", "nhắc"],
    };

    const scores: Record<string, number> = {};
    const reasons: string[] = [];
    for (const [label, kws] of Object.entries(GROUPS)) {
      scores[label] = 0;
      for (const kw of kws) {
        const count = allText.split(kw).length - 1;
        if (count > 0) {
          scores[label] += count;
          reasons.push(`${kw}×${count} → ${label}`);
        }
      }
    }
    let best = "Tổng hợp";
    let max = 0;
    let total = 0;
    for (const [label, sc] of Object.entries(scores)) {
      total += sc;
      if (sc > max) {
        max = sc;
        best = label;
      }
    }
    const confidence = total > 0 ? Math.min(100, Math.round((max / total) * 100)) : 0;
    return { suggested: best, confidence, reasons: reasons.slice(0, 10) };
  });

/** Tin nhắn của 1 nhóm — phân trang (LIMIT/OFFSET), mới nhất trước. */
export const loadZaloMessages = createServerFn({ method: "GET" })
  .validator((data: { group_id: string; limit?: number; offset?: number }) => data)
  .handler(async ({ data }): Promise<ZaloMessage[]> => {
    const sql = await getSql();
    const limit = Math.min(Math.max(data.limit ?? 50, 1), 200);
    const offset = Math.max(data.offset ?? 0, 0);
    return sql<ZaloMessage>`
      SELECT id, zalo_group_id, zalo_message_id, sender_name, sender_zalo_id,
             text, at, attachments, updated_at
      FROM zalo_messages
      WHERE zalo_group_id = ${data.group_id}
      ORDER BY at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
  });

/** File đính kèm của 1 nhóm — join zalo_messages để lọc theo nhóm. */
export const loadZaloFiles = createServerFn({ method: "GET" })
  .validator((data: { group_id: string; limit?: number; offset?: number }) => data)
  .handler(async ({ data }): Promise<ZaloFile[]> => {
    const sql = await getSql();
    const limit = Math.min(Math.max(data.limit ?? 50, 1), 200);
    const offset = Math.max(data.offset ?? 0, 0);
    return sql<ZaloFile>`
      SELECT f.id, f.zalo_message_id, f.file_name, f.file_url, f.file_type, f.file_size, f.created_at
      FROM zalo_files f
      JOIN zalo_messages m ON f.zalo_message_id = m.id
      WHERE m.zalo_group_id = ${data.group_id}
      ORDER BY f.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
  });
