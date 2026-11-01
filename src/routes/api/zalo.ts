import { getSql } from "@/lib/db";
import { createServerFn } from "@tanstack/react-start";

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

export const loadZaloGroups = createServerFn({ method: "GET" })
  .handler(async (): Promise<ZaloGroup[]> => {
    const sql = await getSql();
    return sql<ZaloGroup>`SELECT id, zalo_group_id, zalo_name, member_count, is_sync_enabled, purpose_label, ai_suggested_label, last_sync_at, updated_at FROM zalo_groups ORDER BY zalo_name ASC`;
  });

export const updateZaloGroup = createServerFn({ method: "POST" })
  .validator((data: { id: string; is_sync_enabled?: boolean; purpose_label?: string; ai_suggested_label?: string }) => data)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      UPDATE zalo_groups SET
        is_sync_enabled = COALESCE(${data.is_sync_enabled}, is_sync_enabled),
        purpose_label = COALESCE(${data.purpose_label}, purpose_label),
        ai_suggested_label = COALESCE(${data.ai_suggested_label}, ai_suggested_label),
        updated_at = now()
      WHERE id = ${data.id}
    `;
  });

export const suggestLabel = createServerFn({ method: "POST" })
  .validator((data: { zalo_group_id: string }) => data)
  .handler(async ({ data }) => {
    // Placeholder AI gợi ý nhãn. Thực tế sẽ phân tích tên nhóm + 20 tin mẫu.
    // Tạm trả nhãn mặc định dựa trên tên.
    const sql = await getSql();
    const row = await sql<{ zalo_name: string }>`SELECT zalo_name FROM zalo_groups WHERE zalo_group_id = ${data.zalo_group_id} LIMIT 1`;
    if (!row || row.length === 0) return { suggested: "" };
    const name = row[0].zalo_name.toLowerCase();
    let suggested = "Tổng hợp";
    if (name.includes("mua") || name.includes("nhà cung")) suggested = "Mua hàng";
    else if (name.includes("bán") || name.includes("khách")) suggested = "Bán hàng";
    else if (name.includes("giá")) suggested = "Giá NCC";
    return { suggested };
  });
