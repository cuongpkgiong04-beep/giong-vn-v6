import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EMPLOYEES, normalizePersonKey } from "@/lib/catalog";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/chat")({ component: ChatPage });

const CHANNELS = ["Chung", "Kho", "Kế toán", "Dược", "Marketing"];

function ChatPage() {
  const messages = useAppStore((s) => s.messages);
  const sendMessage = useAppStore((s) => s.sendMessage);
  const me = useAppStore((s) => s.currentName());
  const currentUserId = useAppStore((s) => s.currentUserId);
  const currentUser = EMPLOYEES.find((e) => e.id === currentUserId) ?? EMPLOYEES[0];
  const [channel, setChannel] = useState("Chung");
  const [text, setText] = useState("");

  const rows = useMemo(() => messages.filter((m) => m.channel === channel), [messages, channel]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(text.trim(), channel);
    setText("");
  }

  return (
    <div>
      <PageHeader
        eyebrow="Hệ thống"
        title="Chat nội bộ"
        desc="Trao đổi theo kênh. Dữ liệu lưu trên thiết bị để Admin đối chứng khi cần."
      />

      <div className="mb-4 flex flex-wrap gap-1 rounded-md bg-surface p-1 shadow-[var(--shadow-card)] w-fit">
        {CHANNELS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setChannel(c)}
            className={`h-9 rounded-sm px-3 text-sm ${channel === c ? "bg-forest text-forest-fg" : "text-muted"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <Card className="flex min-h-[420px] flex-col p-0">
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {rows.length === 0 ? (
            <p className="py-12 text-center text-sm text-faint">Chưa có tin trong kênh này.</p>
          ) : (
            rows.map((m) => {
              const mine =
                normalizePersonKey(m.from) === normalizePersonKey(me) ||
                normalizePersonKey(m.from) === normalizePersonKey(currentUser.name) ||
                normalizePersonKey(m.from) === normalizePersonKey(currentUser.username);
              return (
                <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${mine ? "bg-accent text-accent-fg" : "bg-surface-2 text-ink"}`}
                  >
                    <p className={`text-[11px] font-medium ${mine ? "text-accent-fg/80" : "text-muted"}`}>{m.from}</p>
                    <p className="mt-0.5 whitespace-pre-wrap">{m.text}</p>
                    <p className={`mt-1 text-[10px] ${mine ? "text-accent-fg/70" : "text-faint"}`}>{m.at}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <form onSubmit={submit} className="flex gap-2 border-t border-line p-3">
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder={`Nhắn kênh ${channel}…`} />
          <Button type="submit" size="icon" aria-label="Gửi">
            <Send />
          </Button>
        </form>
      </Card>
    </div>
  );
}
