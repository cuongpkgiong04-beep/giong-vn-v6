import { createFileRoute } from "@tanstack/react-router";
import { MessagesSquare, Wand2, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { loadZaloGroups, updateZaloGroup, suggestLabel, ZaloGroup } from "@/routes/api/zalo";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const Route = createFileRoute("/zalo")({ component: ZaloPage });

function ZaloPage() {
  const qc = useQueryClient();
  const { data: groups = [], isLoading } = useQuery({
    queryKey: ["zalo-groups"],
    queryFn: () => loadZaloGroups(),
  });
  const updateMut = useMutation({
    mutationFn: updateZaloGroup,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["zalo-groups"] }),
  });
  const suggestMut = useMutation({
    mutationFn: suggestLabel,
    onSuccess: (res, vars) => {
      const g = groups.find(x => x.zalo_group_id === vars.zalo_group_id);
      if (g) updateMut.mutate({ id: g.id, ai_suggested_label: res.suggested, purpose_label: res.suggested });
    }
  });

  return (
    <div className="space-y-5">
      <PageHeader eyebrow="DỰ ÁN" title="Zalo" desc="Quản trị nhóm Zalo, đồng bộ tin nhắn vào DB. Crawl 5 phút/lần qua Zalo Web CDP." />
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Danh sách nhóm</h3>
          <Button variant="outline" size="sm"><RefreshCw className="size-4 mr-1" /> Làm mới</Button>
        </div>
        {isLoading ? <p>Đang tải...</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted">
                <tr>
                  <th className="py-2 pr-4">Tên nhóm</th>
                  <th className="py-2 pr-4">Thành viên</th>
                  <th className="py-2 pr-4">Cập nhật DB</th>
                  <th className="py-2 pr-4">Nhãn mục đích</th>
                  <th className="py-2 pr-4">Gợi ý AI</th>
                  <th className="py-2 pr-4">Last sync</th>
                </tr>
              </thead>
              <tbody>
                {groups.map(g => (
                  <tr key={g.id} className="border-t">
                    <td className="py-2 pr-4">{g.zalo_name}</td>
                    <td className="py-2 pr-4">{g.member_count}</td>
                    <td className="py-2 pr-4">
                      <Switch checked={g.is_sync_enabled} onCheckedChange={v => updateMut.mutate({ id: g.id, is_sync_enabled: v })} />
                    </td>
                    <td className="py-2 pr-4">
                      <Select value={g.purpose_label} onValueChange={v => updateMut.mutate({ id: g.id, purpose_label: v })}>
                        <SelectTrigger className="w-[180px]"><SelectValue placeholder="Chọn nhãn" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mua hàng">Mua hàng</SelectItem>
                          <SelectItem value="Bán hàng">Bán hàng</SelectItem>
                          <SelectItem value="Giá NCC">Giá NCC</SelectItem>
                          <SelectItem value="Tổng hợp">Tổng hợp</SelectItem>
                          <SelectItem value="">Không cập nhật</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-2 pr-4">
                      <Button size="sm" variant="outline" onClick={() => suggestMut.mutate({ zalo_group_id: g.zalo_group_id })}><Wand2 className="size-4 mr-1" /> Gợi ý</Button>
                      {g.ai_suggested_label && <span className="ml-2 text-xs text-muted">{g.ai_suggested_label}</span>}
                    </td>
                    <td className="py-2 pr-4 text-xs text-muted">{g.last_sync_at ? new Date(g.last_sync_at).toLocaleString('vi-VN') : 'Chưa'}</td>
                  </tr>
                ))}
                {groups.length === 0 && <tr><td colSpan={6} className="py-6 text-center text-muted">Chưa có nhóm nào được phát hiện.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
