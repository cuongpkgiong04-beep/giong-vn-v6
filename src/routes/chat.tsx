import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  CirclePlus,
  Crown,
  ImagePlus,
  LogOut,
  Paperclip,
  Search,
  Send,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDesc } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { EMPLOYEES, isAdminRole, normalizePersonKey } from "@/lib/catalog";
import { todayIso, weekdayVi } from "@/lib/format";
import { useAppStore, conversationKeyOf } from "@/lib/store";

export const Route = createFileRoute("/chat")({ component: ChatPage });

/* ───────────────────────── Helpers ───────────────────────── */

// GĐ 74: ĐÃ XÓA 4 kênh công khai Chung/Kế toán/Dược/Marketing theo yêu cầu Đại ca —
// Chat giờ chỉ còn NHÓM RIÊNG (GĐ 72) + TIN NHẮN RIÊNG 1-1.
// Tin cũ của kênh công khai vẫn nằm trong DB nhưng không còn UI hiển thị.

/** Khoảng cách với tin cuối — tin mới hơn 5 phút thì hiện khối thời gian */
const DAY_GAP_MS = 5 * 60 * 1000;

function fmtTime(at: string): string {
  // at = "YYYY-MM-DD HH:mm" (giờ địa phương lúc gửi)
  return at.slice(11, 16);
}

function dayLabel(dayKey: string): string {
  const today = todayIso();
  if (dayKey === today) return "Hôm nay";
  // Hôm qua
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (dayKey === yesterday) return "Hôm qua";
  return `${weekdayVi(dayKey)}, ${dayKey.split("-").reverse().join("/")}`;
}

/** URL có phải ảnh không (Cloudinary /image/upload/ hoặc đuôi ảnh) */
function isImageUrl(url: string): boolean {
  return /\/image\/upload\//.test(url) || /\.(png|jpe?g|gif|webp)(\?|$)/i.test(url);
}

function fileIconLabel(url: string): string {
  try {
    const name = decodeURIComponent(url.split("/").pop() ?? "file");
    const ext = name.includes(".") ? name.split(".").pop()!.toUpperCase() : "FILE";
    return ext.slice(0, 6);
  } catch {
    return "FILE";
}
}

async function compressImage(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  if (!file.type.startsWith("image/")) {
    if (file.size > 2 * 1024 * 1024) {
      throw new Error(`File "${file.name}" quá lớn (tối đa 2MB)`);
    }
    return dataUrl;
  }
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = dataUrl;
  });
  const canvas = document.createElement("canvas");
  const scale = Math.min(1, 1024 / Math.max(img.width, img.height));
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  let quality = 0.8;
  let out = canvas.toDataURL("image/jpeg", quality);
  while (out.length > 800 * 1024 * 1.37 && quality > 0.3) {
    quality -= 0.1;
    out = canvas.toDataURL("image/jpeg", quality);
  }
  return out;
}

/* ───────────────────────── Page ───────────────────────── */

function ChatPage() {
  const messages = useAppStore((s) => s.messages);
  const sendMessage = useAppStore((s) => s.sendMessage);
  const refreshMessages = useAppStore((s) => s.refreshMessages);
  const removeMessage = useAppStore((s) => s.removeMessage);
  const addChatGroup = useAppStore((s) => s.addChatGroup);
  const addGroupMembers = useAppStore((s) => s.addChatGroupMembers);
  const removeGroupMember = useAppStore((s) => s.removeChatGroupMember);
  const removeChatGroup = useAppStore((s) => s.removeChatGroup);
  const markConversationRead = useAppStore((s) => s.markConversationRead);
  const chatGroups = useAppStore((s) => s.chatGroups);
  const currentUserId = useAppStore((s) => s.currentUserId);
  const employees = useAppStore((s) => s.employees);
  const me = employees.find((e) => e.id === currentUserId) ?? null;
  const meName = me?.username ?? "";
  const isAdmin = isAdminRole(me?.role);

  const [tab, setTab] = useState<"group" | "direct">("group");
  const [peerId, setPeerId] = useState<string | null>(null);
  // Nhóm riêng đang mở (GĐ 72) — id trong chatGroups
  const [groupId, setGroupId] = useState<string | null>(null);
  // Mobile: 1 khung tại 1 thời điểm — "list" (danh sách) hoặc "chat" (cửa sổ). Desktop luôn hiện cả 2.
  const [text, setText] = useState("");
  const [q, setQ] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");
  const [lightbox, setLightbox] = useState<string | null>(null);
  // Dialog tạo nhóm mới + dialog thành viên nhóm
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newMemberIds, setNewMemberIds] = useState<string[]>([]);
  const [memberDialog, setMemberDialog] = useState<string | null>(null); // groupId đang xem
  const fileRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const directKey = peerId ? [currentUserId, peerId].sort().join("|") : "";
  const activeGroup = groupId ? chatGroups.find((g) => g.id === groupId) ?? null : null;

  /* Nhóm mà tôi là member — chỉ những nhóm này hiện trong danh sách */
  const myGroups = useMemo(
    () => chatGroups.filter((g) => !g.deletedAt && g.members.some((m) => m.employeeId === currentUserId)),
    [chatGroups, currentUserId],
  );

  /* GĐ 74: key hội thoại đang mở — khớp conversationKeyOf để markConversationRead */
  const activeConvKey =
    tab === "direct" && peerId
      ? `direct:${peerId}`
      : tab === "group" && groupId
        ? `mygroup:${groupId}`
        : "";

  /* Tin nhắn của hội thoại đang mở */
  const activeMessages = useMemo(() => {
    const list = messages.filter((m) => {
      if (tab === "direct") return m.directKey === directKey;
      if (groupId) return m.groupId === groupId;
      return false; // GĐ 74: không còn kênh công khai
    });
    return list.sort((a, b) => (a.at > b.at ? 1 : a.at < b.at ? -1 : 0));
  }, [messages, tab, directKey, groupId]);

  /* Danh sách hội thoại trái — nhóm riêng (GĐ 72) + 1-1. Kênh công khai đã xóa (GĐ 74). */
  const conversationList = useMemo(() => {
    if (tab === "group") {
      // Nhóm riêng — chỉ nhóm tôi là member
      return myGroups.map((g) => {
        const msgs = messages.filter((m) => m.groupId === g.id);
        const last = msgs[msgs.length - 1];
        return {
          key: `mygroup:${g.id}`,
          type: "mygroup" as const,
          id: g.id,
          name: g.name,
          last,
        };
      });
    }
    // Nhắn 1-1: mọi nhân sự khác (cả khi chưa có tin — để bắt đầu nhắn mới)
    return employees
      .filter((e) => e.id !== currentUserId)
      .map((e) => {
        const key = [currentUserId, e.id].sort().join("|");
        const msgs = messages.filter((m) => m.directKey === key);
        const last = msgs[msgs.length - 1];
        return {
          key: `direct:${e.id}`,
          type: "direct" as const,
          id: e.id,
          name: e.name,
          title: e.title,
          last,
        };
      })
      .sort((a, b) => {
        // Có tin gần nhất lên trước, rồi theo tên
        const ta = a.last?.at ?? "";
        const tb = b.last?.at ?? "";
        if (ta !== tb) return ta > tb ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
  }, [tab, messages, employees, currentUserId, myGroups]);

  const filteredConversations = useMemo(() => {
    if (!q.trim()) return conversationList;
    const needle = q.trim().toLowerCase();
    return conversationList.filter((c) =>
      c.name.toLowerCase().includes(needle),
    );
  }, [conversationList, q]);

  /* Poll tin mới mỗi 5s khi trang mở */
  useEffect(() => {
    refreshMessages();
    const timer = setInterval(() => refreshMessages(), 5000);
    return () => clearInterval(timer);
  }, [refreshMessages]);

  /* Cuộn xuống đáy khi tin thay đổi / đổi hội thoại */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages.length, groupId, peerId, tab]);

  /* GĐ 74: đang mở hội thoại → đánh dấu đã đọc (badge đỏ giảm đúng).
     Chạy lại khi có tin mới về (poll 5s) → đang mở chat thì tin mới coi như đã đọc. */
  useEffect(() => {
    if (activeConvKey) markConversationRead(activeConvKey);
  }, [activeConvKey, activeMessages.length, markConversationRead]);

  /* Nhắn với chính mình — chặn; nhóm phải là member mới được nhắn */
  const canSend =
    tab === "direct"
      ? Boolean(peerId && peerId !== currentUserId)
      : Boolean(
          groupId &&
            activeGroup?.members.some((m) => m.employeeId === currentUserId),
        );

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() && attachments.length === 0) return;
    if (!canSend) return;
    // Gửi 1 tin duy nhất — text + đính kèm cùng tin (cột attachments trong DB)
    sendMessage(text.trim(), "", {
      toId: tab === "direct" ? peerId! : undefined,
      groupId: tab === "group" && groupId ? groupId : undefined,
      attachments: attachments.length > 0 ? attachments : undefined,
    });
    setText("");
    setAttachments([]);
  }

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const list = Array.from(files).slice(0, 3);
    setUploading(true);
    try {
      const { uploadImage } = await import("@/routes/api/upload");
      const uploaded: string[] = [];
      for (const f of list) {
        const base64 = await compressImage(f);
        const res = await uploadImage({
          data: { base64, folder: "giong-vn/chat", fileName: f.name },
        });
        uploaded.push(res.url);
      }
      setAttachments((prev) => [...prev, ...uploaded].slice(0, 3));
    } catch (err: any) {
      console.error("Upload chat attachment failed:", err);
      alert(err?.message ?? "Lỗi upload tệp");
    } finally {
      setUploading(false);
    }
  }

  /* Nhãn người gửi: username nếu trùng tên */
  function senderLabel(m: (typeof activeMessages)[number]): string {
    const byId = m.fromId
      ? employees.find((e) => e.id === m.fromId)
      : undefined;
    if (byId) return byId.username || byId.name;
    return m.from;
  }

  return (
    <div>
      <PageHeader
        eyebrow="Hệ thống"
        title="Chat nội bộ"
        desc="Trao đổi trong nhóm riêng và tin nhắn 1-1 — tự động cập nhật, lưu Neon + Cloudinary."
      />

      <div className="flex h-[calc(100dvh-13rem)] min-h-[420px] gap-4 overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-card)]">
        {/* ── Cột trái: danh sách hội thoại ── */}
        <aside
          className={`flex w-full shrink-0 flex-col border-r border-line sm:w-64 md:w-72 ${
            mobileView === "chat" ? "hidden md:flex" : "flex"
          }`}
        >
          <div className="border-b border-line p-2.5">
            <div className="mb-2 flex gap-1 rounded-md bg-surface-2 p-1">
              <button
                type="button"
                onClick={() => {
                  setTab("group");
                  setPeerId(null);
                }}
                className={`flex h-8 flex-1 items-center justify-center gap-1.5 rounded-sm text-sm ${
                  tab === "group" ? "bg-surface font-medium text-ink shadow-sm" : "text-muted"
                }`}
              >
                <Users className="size-3.5" /> Nhóm
              </button>
              <button
                type="button"
                onClick={() => setTab("direct")}
                className={`flex h-8 flex-1 items-center justify-center gap-1.5 rounded-sm text-sm ${
                  tab === "direct" ? "bg-surface font-medium text-ink shadow-sm" : "text-muted"
                }`}
              >
                Tin nhắn riêng
              </button>
            </div>
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-faint" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Tìm hội thoại..."
                className="h-8 pl-8 text-sm"
              />
            </div>
            {/* Tạo nhóm mới — chỉ Admin (GĐ 72) */}
            {isAdmin && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 w-full"
                onClick={() => {
                  setNewGroupName("");
                  setNewMemberIds([]);
                  setIsCreateOpen(true);
                }}
              >
                <CirclePlus className="size-4" /> Nhóm mới
              </Button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-1.5">
            {filteredConversations.length === 0 ? (
              <p className="px-2 py-6 text-center text-xs text-faint">
                Không tìm thấy hội thoại.
              </p>
            ) : (
              filteredConversations.map((c) => {
                const active =
                  tab === "group" ? c.id === groupId : c.id === peerId;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => {
                      if (c.type === "mygroup") {
                        setTab("group");
                        setGroupId(c.id);
                        setPeerId(null);
                      } else {
                        setTab("direct");
                        setPeerId(c.id);
                        setGroupId(null);
                      }
                      setMobileView("chat");
                    }}
                    className={`mb-0.5 flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left ${
                      active ? "bg-accent/10" : "hover:bg-surface-2"
                    }`}
                  >
                    {c.type === "mygroup" ? (
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                        <Users className="size-4" />
                      </span>
                    ) : (
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-semibold text-accent">
                        {c.name
                          .split(" ")
                          .map((w) => w[0])
                          .filter(Boolean)
                          .slice(0, 2)
                          .join("")}
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-ink">
                        {c.name}
                      </span>
                      <span className="block truncate text-xs text-muted">
                        {c.last
                          ? c.last.attachments && c.last.attachments.length > 0
                            ? c.last.text
                              ? c.last.text
                              : "📎 Đính kèm"
                            : c.last.text.startsWith("http") && !c.last.text.includes(" ")
                              ? "📎 Đính kèm"
                              : c.last.text
                          : tab === "direct"
                            ? "Bắt đầu nhắn..."
                            : "Chưa có tin"}
                      </span>
                    </span>
                    {c.last && (
                      <span className="shrink-0 text-[10px] text-faint">
                        {fmtTime(c.last.at)}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </aside>

        {/* ── Cột phải: cửa sổ chat ── */}
        <section
          className={`flex min-w-0 flex-1 flex-col ${
            mobileView === "chat" ? "flex" : "hidden md:flex"
          }`}
        >
          {/* Header cửa sổ chat */}
          <div className="flex items-center gap-2.5 border-b border-line px-4 py-2.5">
            <button
              type="button"
              onClick={() => setMobileView("list")}
              className="mr-1 flex size-8 items-center justify-center rounded-md hover:bg-surface-2 md:hidden"
              aria-label="Quay lại"
            >
              <ArrowLeft className="size-4" />
            </button>
            {tab === "group" ? (
              groupId && activeGroup ? (
                <>
                  <span className="flex size-8 items-center justify-center rounded-full bg-accent text-white">
                    <Users className="size-4" />
                  </span>
                  <button
                    type="button"
                    className="min-w-0 flex-1 text-left"
                    onClick={() => setMemberDialog(groupId)}
                    title="Xem thành viên"
                  >
                    <p className="truncate text-sm font-semibold text-ink">{activeGroup.name}</p>
                    <p className="text-xs text-muted">
                      Nhóm riêng • {activeGroup.members.length} thành viên
                    </p>
                  </button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setMemberDialog(groupId)}
                  >
                    <UserPlus className="size-4" /> Thành viên
                  </Button>
                </>
              ) : (
                <p className="text-sm text-muted">Chọn một hội thoại để bắt đầu</p>
              )
            ) : peerId ? (
              (() => {
                const peer = employees.find((e) => e.id === peerId);
                return (
                  <>
                    <span className="flex size-8 items-center justify-center rounded-full bg-accent/20 text-xs font-semibold text-accent">
                      {(peer?.name ?? "?")
                        .split(" ")
                        .map((w) => w[0])
                        .filter(Boolean)
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">
                        {peer?.name ?? "Đang tải..."}
                      </p>
                      <p className="truncate text-xs text-muted">{peer?.title ?? ""}</p>
                    </div>
                  </>
                );
              })()
            ) : (
              <p className="text-sm text-muted">Chọn một hội thoại để bắt đầu</p>
            )}
          </div>

          {/* Vùng tin nhắn */}
          <div className="flex-1 space-y-1 overflow-y-auto px-4 py-3">
            {(tab === "direct" ? Boolean(peerId) : Boolean(groupId)) &&
              activeMessages.length === 0 && (
                <p className="py-12 text-center text-sm text-faint">
                  {tab === "direct"
                    ? "Chưa có tin nhắn — hãy bắt đầu trước."
                    : "Chưa có tin trong nhóm — hãy nhắn đầu tiên."}
                </p>
              )}
            {activeMessages.map((m, i) => {
              const mine =
                (m.fromId && m.fromId === currentUserId) ||
                normalizePersonKey(m.from) === normalizePersonKey(meName);
              const prev = activeMessages[i - 1];
              const newDay =
                !prev || prev.at.slice(0, 10) !== m.at.slice(0, 10);
              const showTime =
                newDay ||
                !prev ||
                new Date(m.at.replace(" ", "T")).getTime() -
                  new Date(prev.at.replace(" ", "T")).getTime() >
                  DAY_GAP_MS;
              return (
                <div key={m.id}>
                  {newDay && (
                    <div className="my-3 flex justify-center">
                      <span className="rounded-full bg-surface-2 px-3 py-1 text-[11px] text-muted">
                        {dayLabel(m.at.slice(0, 10))}
                      </span>
                    </div>
                  )}
                  {showTime && !newDay && (
                    <div className="my-2 flex justify-center">
                      <span className="text-[11px] text-faint">
                        {fmtTime(m.at)}
                      </span>
                    </div>
                  )}
                  <div
                    className={`group flex items-end gap-1.5 ${
                      mine ? "justify-end" : "justify-start"
                    }`}
                  >
                    {/* Nút thu hồi — tin của mình, trong 24h, chưa có đính kèm cũ */}
                    {mine && !m.deletedAt && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm("Thu hồi tin nhắn này?")) removeMessage(m.id);
                        }}
                        className="mb-1 hidden size-6 shrink-0 items-center justify-center rounded text-faint hover:bg-surface-2 hover:text-ink group-hover:flex"
                        title="Thu hồi"
                        aria-label="Thu hồi tin nhắn"
                      >
                        <X className="size-3.5" />
                      </button>
                    )}
                    {m.deletedAt ? (
                      <div className="max-w-[80%] rounded-lg bg-surface-2 px-3 py-2 text-sm italic text-faint">
                        Tin nhắn đã được thu hồi
                      </div>
                    ) : (
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                          mine
                            ? "bg-accent text-accent-fg"
                            : "bg-surface-2 text-ink"
                        }`}
                      >
                        {!mine && (
                          <p className="text-[11px] font-medium text-muted">
                            {senderLabel(m)}
                          </p>
                        )}
                        {m.attachments && m.attachments.length > 0 ? (
                          <div className="mt-0.5 space-y-1">
                            {m.attachments.map((url) =>
                              isImageUrl(url) ? (
                                <img
                                  key={url}
                                  src={url}
                                  alt="Đính kèm"
                                  className="max-h-52 cursor-zoom-in rounded-md object-cover"
                                  onClick={() => setLightbox(url)}
                                />
                              ) : (
                                <a
                                  key={url}
                                  href={url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className={`flex items-center gap-1.5 rounded border px-2 py-1.5 text-xs ${
                                    mine
                                      ? "border-accent-fg/30 text-accent-fg hover:bg-accent-fg/10"
                                      : "border-line text-ink hover:bg-surface"
                                  }`}
                                >
                                  <Paperclip className="size-3.5 shrink-0" />
                                  <span className="max-w-45 truncate underline">
                                    {fileIconLabel(url)}
                                  </span>
                                </a>
                              ),
                            )}
                          </div>
                        ) : m.text.startsWith("http") && !m.text.includes(" ") ? (
                          /* Tin riêng 1 URL — coi như đính kèm (tin cũ trước khi có cột attachments) */
                          isImageUrl(m.text) ? (
                            <img
                              src={m.text}
                              alt="Đính kèm"
                              className="mt-0.5 max-h-52 cursor-zoom-in rounded-md object-cover"
                              onClick={() => setLightbox(m.text)}
                            />
                          ) : (
                            <a
                              href={messageLinkHref(m.text)}
                              target="_blank"
                              rel="noreferrer"
                              className={`mt-0.5 flex items-center gap-1.5 rounded border px-2 py-1.5 text-xs ${
                                mine
                                  ? "border-accent-fg/30 text-accent-fg hover:bg-accent-fg/10"
                                  : "border-line text-ink hover:bg-surface"
                              }`}
                            >
                              <Paperclip className="size-3.5 shrink-0" />
                              <span className="max-w-45 truncate underline">
                                {fileIconLabel(m.text)}
                              </span>
                            </a>
                          )
                        ) : (
                          <p className="mt-0.5 whitespace-pre-wrap">{m.text}</p>
                        )}
                        <p
                          className={`mt-1 text-right text-[10px] ${
                            mine ? "text-accent-fg/70" : "text-faint"
                          }`}
                        >
                          {fmtTime(m.at)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Ô soạn tin */}
          <form onSubmit={submit} className="border-t border-line p-3">
            {attachments.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2">
                {attachments.map((url) => (
                  <span
                    key={url}
                    className="relative inline-flex items-center gap-1 rounded-md border border-line bg-surface-2 px-2 py-1 text-xs text-muted"
                  >
                    <Paperclip className="size-3" />
                    <span className="max-w-40 truncate">{fileIconLabel(url)}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setAttachments((prev) => prev.filter((u) => u !== url))
                      }
                      className="ml-0.5 text-faint hover:text-ink"
                      aria-label="Bỏ tệp"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2">
              <input
                ref={fileRef}
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                className="hidden"
                onChange={(e) => {
                  handleFiles(e.target.files);
                  e.target.value = "";
                }}
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                disabled={uploading || !canSend}
                onClick={() => fileRef.current?.click()}
                aria-label="Đính kèm tệp"
                title={uploading ? "Đang tải lên..." : "Đính kèm ảnh / tệp"}
              >
                <ImagePlus className="size-4" />
              </Button>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={
                  !canSend
                    ? "Chọn một hội thoại..."
                    : tab === "direct"
                      ? `Nhắn ${employees.find((e) => e.id === peerId)?.name ?? ""}...`
                      : `Nhắn nhóm ${activeGroup?.name ?? ""}...`
                }
                disabled={!canSend}
              />
              <Button
                type="submit"
                size="icon"
                disabled={uploading || !canSend}
                aria-label="Gửi"
              >
                <Send />
              </Button>
            </div>
          </form>
        </section>
      </div>

      {/* ── Dialog tạo nhóm mới (chỉ Admin — GĐ 72) ── */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-md">
          <DialogTitle>Tạo nhóm mới</DialogTitle>
          <DialogDesc>Nhập tên nhóm và chọn thành viên — chỉ thành viên mới thấy nhóm.</DialogDesc>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!newGroupName.trim()) {
                toast.error("Nhập tên nhóm");
                return;
              }
              addChatGroup(newGroupName.trim(), newMemberIds);
              toast.success(`Đã tạo nhóm "${newGroupName.trim()}"`);
              setIsCreateOpen(false);
            }}
            className="mt-3 space-y-3"
          >
            <Input
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Tên nhóm (VD: Nhóm Long Biên)"
              autoFocus
            />
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted">
                Thành viên ({newMemberIds.length} đã chọn)
              </p>
              <div className="max-h-56 space-y-0.5 overflow-y-auto rounded-md border border-line p-1.5">
                {employees
                  .filter((e) => e.id !== currentUserId)
                  .map((e) => (
                    <label
                      key={e.id}
                      className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-surface-2"
                    >
                      <input
                        type="checkbox"
                        checked={newMemberIds.includes(e.id)}
                        onChange={(ev) =>
                          setNewMemberIds((prev) =>
                            ev.target.checked
                              ? [...prev, e.id]
                              : prev.filter((id) => id !== e.id),
                          )
                        }
                        className="size-4 accent-[var(--color-accent)]"
                      />
                      <span className="min-w-0 flex-1 truncate text-sm text-ink">
                        {e.name}
                        <span className="ml-1.5 text-xs text-muted">{e.dept}</span>
                      </span>
                    </label>
                  ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                Hủy
              </Button>
              <Button type="submit">Tạo nhóm</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Dialog thành viên nhóm (GĐ 72) ── */}
      <Dialog
        open={Boolean(memberDialog)}
        onOpenChange={(open) => setMemberDialog(open ? memberDialog : null)}
      >
        <DialogContent className="max-w-md">
          {(() => {
            const g = chatGroups.find((x) => x.id === memberDialog);
            if (!g) return null;
            const amOwner = g.createdBy === currentUserId;
            // Owner + Admin được thêm/xóa member (chốt của Đại ca)
            const canManage = amOwner || isAdmin;
            const nonMembers = employees.filter(
              (e) => e.id !== currentUserId && !g.members.some((m) => m.employeeId === e.id),
            );
            return (
              <>
                <DialogTitle>{g.name}</DialogTitle>
                <DialogDesc>
                  Nhóm riêng • {g.members.length} thành viên
                  {amOwner ? " • Bạn là chủ nhóm" : ""}
                </DialogDesc>
                <div className="mt-3 space-y-0.5">
                  {g.members.map((m) => {
                    const emp = employees.find((e) => e.id === m.employeeId);
                    return (
                      <div
                        key={m.employeeId}
                        className="flex items-center gap-2 rounded px-2 py-1.5 hover:bg-surface-2"
                      >
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent/20 text-[10px] font-semibold text-accent">
                          {(emp?.name ?? "?")
                            .split(" ")
                            .map((w) => w[0])
                            .filter(Boolean)
                            .slice(0, 2)
                            .join("")}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-sm text-ink">
                          {emp?.name ?? m.employeeId}
                          <span className="ml-1.5 text-xs text-muted">{emp?.dept ?? ""}</span>
                        </span>
                        {m.role === "owner" && (
                          <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                            <Crown className="size-3" /> Chủ nhóm
                          </span>
                        )}
                        {canManage && m.role !== "owner" && (
                          <button
                            type="button"
                            onClick={() => {
                              removeGroupMember(g.id, m.employeeId);
                              toast.success(`Đã xóa ${emp?.name ?? "thành viên"} khỏi nhóm`);
                            }}
                            className="flex size-6 shrink-0 items-center justify-center rounded text-faint hover:bg-surface hover:text-ink"
                            title="Xóa khỏi nhóm"
                            aria-label="Xóa khỏi nhóm"
                          >
                            <X className="size-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
                {canManage && nonMembers.length > 0 && (
                  <div className="mt-3 border-t border-line pt-3">
                    <p className="mb-1.5 text-xs font-medium text-muted">Thêm thành viên</p>
                    <div className="max-h-40 space-y-0.5 overflow-y-auto">
                      {nonMembers.map((e) => (
                        <button
                          key={e.id}
                          type="button"
                          onClick={() => {
                            addGroupMembers(g.id, [e.id]);
                            toast.success(`Đã thêm ${e.name} vào nhóm`);
                          }}
                          className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left hover:bg-surface-2"
                        >
                          <UserPlus className="size-4 shrink-0 text-accent" />
                          <span className="min-w-0 flex-1 truncate text-sm text-ink">
                            {e.name}
                            <span className="ml-1.5 text-xs text-muted">{e.dept}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {(amOwner || isAdmin) && (
                  <div className="mt-3 flex justify-between border-t border-line pt-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-red-600"
                      onClick={() => {
                        if (confirm(`Giải tán nhóm "${g.name}"? Tin nhắn sẽ bị ẩn với mọi người.`)) {
                          removeChatGroup(g.id);
                          setMemberDialog(null);
                          if (groupId === g.id) {
                            setGroupId(null);
                          }
                          toast.success(`Đã giải tán nhóm "${g.name}"`);
                        }
                      }}
                    >
                      <LogOut className="size-4" /> Giải tán nhóm
                    </Button>
                  </div>
                )}
              </>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Lightbox ảnh nền trắng (pattern GĐ 65) */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-white/95"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Xem ảnh"
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-black/10 text-ink hover:bg-black/20"
            aria-label="Đóng"
          >
            <X className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}

/** URL đính kèm dạng text (tin cũ) → href an toàn */
function messageLinkHref(url: string): string {
  return url;
}
