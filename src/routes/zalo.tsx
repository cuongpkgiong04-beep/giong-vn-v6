import { createFileRoute } from "@tanstack/react-router";
import { MessagesSquare, Wand2, RefreshCw, MessageSquare, Download, Search, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  loadZaloGroups,
  updateZaloGroup,
  suggestLabel,
  analyzeGroupLabel,
  loadZaloMessages,
  loadZaloFiles,
} from "@/routes/api/zalo";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

// GĐ 630/C.394 + GĐ 632 (02/11/2026): module Zalo quản trị nhóm — 3 tabs:
//   1. Quản trị nhóm (toggle sync + nhãn + AI gợi ý/phân tích)
//   2. Tin nhắn (phân trang, tìm kiếm, xuất JSON)
//   3. File đính kèm (phân trang, xuất JSON, link)
// Dữ liệu: GiondDB zalo_groups/zalo_messages/zalo_files — agent zalo_sync.py crawl.
export const Route = createFileRoute("/zalo")({ component: ZaloPage });

function ZaloPage() {
  const qc = useQueryClient();
  const [tab, setTab] = useState("groups");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null); // zalo_group_id
  const [search, setSearch] = useState("");
  const [msgPage, setMsgPage] = useState(0);
  const [filePage, setFilePage] = useState(0);
  const PAGE_SIZE = 50;

  const { data: groups = [], isLoading: groupsLoading, refetch: refetchGroups } = useQuery({
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
      const g = groups.find((x) => x.zalo_group_id === vars.zalo_group_id);
      if (g) updateMut.mutate({ id: g.id, ai_suggested_label: res.suggested, purpose_label: res.suggested });
    },
  });

  const analyzeMut = useMutation({
    mutationFn: analyzeGroupLabel,
    onSuccess: (res, vars) => {
      const g = groups.find((x) => x.zalo_group_id === vars.zalo_group_id);
      if (g) updateMut.mutate({ id: g.id, ai_suggested_label: res.suggested, purpose_label: res.suggested });
    },
  });

  const { data: messages = [], isLoading: messagesLoading } = useQuery({
    queryKey: ["zalo-messages", selectedGroup, msgPage],
    queryFn: () => loadZaloMessages({ group_id: selectedGroup!, limit: PAGE_SIZE, offset: msgPage * PAGE_SIZE }),
    enabled: !!selectedGroup && tab === "messages",
  });

  const { data: files = [], isLoading: filesLoading } = useQuery({
    queryKey: ["zalo-files", selectedGroup, filePage],
    queryFn: () => loadZaloFiles({ group_id: selectedGroup!, limit: PAGE_SIZE, offset: filePage * PAGE_SIZE }),
    enabled: !!selectedGroup && tab === "files",
  });

  const openGroup = (zaloGroupId: string) => {
    setSelectedGroup(zaloGroupId);
    setMsgPage(0);
    setFilePage(0);
    setTab("messages");
  };

  const exportJson = (data: unknown, name: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const selGroupName = groups.find((g) => g.zalo_group_id === selectedGroup)?.zalo_name ?? "";

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="DỰ ÁN"
        title="Zalo"
        desc="Quản trị nhóm Zalo, đồng bộ tin nhắn vào DB. Agent zalo_sync.py crawl Zalo Web CDP trên máy chủ."
      />

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="groups">Quản trị nhóm</TabsTrigger>
          <TabsTrigger value="messages" disabled={!selectedGroup}>
            Tin nhắn{selGroupName ? ` · ${selGroupName.slice(0, 20)}` : ""}
          </TabsTrigger>
          <TabsTrigger value="files" disabled={!selectedGroup}>
            File đính kèm
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: QUẢN TRỊ NHÓM */}
        <TabsContent value="groups" className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">
                Danh sách nhóm <span className="text-sm font-normal text-muted">({groups.length} hội thoại)</span>
              </h3>
              <Button variant="outline" size="sm" onClick={() => refetchGroups()}>
                <RefreshCw className="size-4 mr-1" /> Làm mới
              </Button>
            </div>
            {groupsLoading ? (
              <p className="text-sm text-muted">Đang tải…</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-muted">
                    <tr>
                      <th className="py-2 pr-4">Tên nhóm</th>
                      <th className="py-2 pr-4">Cập nhật DB</th>
                      <th className="py-2 pr-4">Nhãn mục đích</th>
                      <th className="py-2 pr-4">Gợi ý AI (tên)</th>
                      <th className="py-2 pr-4">Phân tích AI (20 tin)</th>
                      <th className="py-2 pr-4">Last sync</th>
                      <th className="py-2 pr-4">Xem tin nhắn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups.map((g) => (
                      <tr key={g.id} className="border-t">
                        <td className="py-2 pr-4 max-w-[320px] truncate" title={g.zalo_name}>
                          {g.zalo_name}
                        </td>
                        <td className="py-2 pr-4">
                          <Switch
                            checked={g.is_sync_enabled}
                            onCheckedChange={(v) => updateMut.mutate({ id: g.id, is_sync_enabled: v })}
                          />
                        </td>
                        <td className="py-2 pr-4">
                          <Select value={g.purpose_label} onValueChange={(v) => updateMut.mutate({ id: g.id, purpose_label: v })}>
                            <SelectTrigger className="w-[170px]">
                              <SelectValue placeholder="Chọn nhãn" />
                            </SelectTrigger>
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
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => suggestMut.mutate({ zalo_group_id: g.zalo_group_id })}
                          >
                            <Wand2 className="size-4 mr-1" /> Gợi ý
                          </Button>
                          {g.ai_suggested_label && (
                            <span className="ml-2 text-xs text-muted">{g.ai_suggested_label}</span>
                          )}
                        </td>
                        <td className="py-2 pr-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => analyzeMut.mutate({ zalo_group_id: g.zalo_group_id })}
                          >
                            <Sparkles className="size-4 mr-1" /> Phân tích
                          </Button>
                        </td>
                        <td className="py-2 pr-4 text-xs text-muted">
                          {g.last_sync_at ? new Date(g.last_sync_at).toLocaleString("vi-VN") : "Chưa"}
                        </td>
                        <td className="py-2 pr-4">
                          <Button size="sm" variant="ghost" onClick={() => openGroup(g.zalo_group_id)}>
                            <MessageSquare className="size-4 mr-1" /> Mở
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {groups.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-6 text-center text-muted">
                          Chưa có nhóm nào — chạy agent zalo_sync.py groups trên máy chủ để crawl.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </TabsContent>

        {/* TAB 2: TIN NHẮN */}
        <TabsContent value="messages" className="space-y-4">
          <Card className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h3 className="font-semibold">Tin nhắn — {selGroupName}</h3>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Lọc nội dung…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-[220px]"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportJson(messages, `zalo-messages-${Date.now()}.json`)}
                >
                  <Download className="size-4 mr-1" /> Xuất JSON
                </Button>
              </div>
            </div>
            {messagesLoading ? (
              <p className="text-sm text-muted">Đang tải tin nhắn…</p>
            ) : (
              <div className="space-y-1">
                {messages
                  .filter((m) => !search || (m.text || "").toLowerCase().includes(search.toLowerCase()))
                  .map((m) => (
                    <div key={m.id} className="rounded-lg border border-line px-3 py-2">
                      <div className="flex items-center gap-2 text-xs text-muted">
                        <span className="font-medium text-ink">{m.sender_name || "(ẩn danh)"}</span>
                        <span>·</span>
                        <span>{new Date(m.at).toLocaleString("vi-VN")}</span>
                        {m.attachments?.length > 0 && (
                          <span className="text-accent">· {m.attachments.length} file</span>
                        )}
                      </div>
                      <p className="mt-1 whitespace-pre-wrap break-words text-sm">{m.text || "(không có nội dung)"}</p>
                    </div>
                  ))}
                {messages.filter((m) => !search || (m.text || "").toLowerCase().includes(search.toLowerCase())).length === 0 && (
                  <p className="py-6 text-center text-sm text-muted">
                    Không có tin nhắn — nhóm chưa bật sync hoặc agent chưa crawl tin.
                  </p>
                )}
              </div>
            )}
            {!messagesLoading && (
              <div className="mt-3 flex items-center justify-between">
                <Button variant="outline" size="sm" disabled={msgPage === 0} onClick={() => setMsgPage((p) => Math.max(0, p - 1))}>
                  Trước
                </Button>
                <span className="text-xs text-muted">Trang {msgPage + 1}</span>
                <Button variant="outline" size="sm" onClick={() => setMsgPage((p) => p + 1)}>
                  Sau
                </Button>
              </div>
            )}
          </Card>
        </TabsContent>

        {/* TAB 3: FILE ĐÍNH KÈM */}
        <TabsContent value="files" className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">File đính kèm — {selGroupName}</h3>
              <Button variant="outline" size="sm" onClick={() => exportJson(files, `zalo-files-${Date.now()}.json`)}>
                <Download className="size-4 mr-1" /> Xuất JSON
              </Button>
            </div>
            {filesLoading ? (
              <p className="text-sm text-muted">Đang tải file…</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-muted">
                    <tr>
                      <th className="py-2 pr-4">Thời gian</th>
                      <th className="py-2 pr-4">Tên file</th>
                      <th className="py-2 pr-4">Loại</th>
                      <th className="py-2 pr-4">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((f) => (
                      <tr key={f.id} className="border-t">
                        <td className="py-2 pr-4 text-xs text-muted">{new Date(f.created_at).toLocaleString("vi-VN")}</td>
                        <td className="py-2 pr-4 max-w-[400px] truncate" title={f.file_name}>
                          {f.file_name}
                        </td>
                        <td className="py-2 pr-4 text-xs text-muted">{f.file_type || "file"}</td>
                        <td className="py-2 pr-4">
                          {f.file_url ? (
                            <a href={f.file_url} target="_blank" rel="noopener noreferrer" className="text-accent underline text-sm">
                              Mở
                            </a>
                          ) : (
                            <span className="text-xs text-muted">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {files.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-muted">
                          Không có file đính kèm nào.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            {!filesLoading && (
              <div className="mt-3 flex items-center justify-between">
                <Button variant="outline" size="sm" disabled={filePage === 0} onClick={() => setFilePage((p) => Math.max(0, p - 1))}>
                  Trước
                </Button>
                <span className="text-xs text-muted">Trang {filePage + 1}</span>
                <Button variant="outline" size="sm" onClick={() => setFilePage((p) => p + 1)}>
                  Sau
                </Button>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
