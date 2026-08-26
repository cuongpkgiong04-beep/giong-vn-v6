import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as Send } from "../_libs/lucide-react.mjs";
import { B as normalizePersonKey, D as EMPLOYEES, n as useAppStore } from "./router-DS2KYuON.mjs";
import { t as Button } from "./button-Ca7WG74o.mjs";
import { t as Input } from "./input-B4p5-Q-u.mjs";
import { t as Card } from "./card-D89Flo6c.mjs";
import { t as PageHeader } from "./page-header-D0Vc9J4l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-D9u6rO8i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CHANNELS = [
	"Chung",
	"Kho",
	"Kế toán",
	"Dược",
	"Marketing"
];
function ChatPage() {
	const messages = useAppStore((s) => s.messages);
	const sendMessage = useAppStore((s) => s.sendMessage);
	const me = useAppStore((s) => s.currentName());
	const currentUserId = useAppStore((s) => s.currentUserId);
	const currentUser = EMPLOYEES.find((e) => e.id === currentUserId) ?? EMPLOYEES[0];
	const [channel, setChannel] = (0, import_react.useState)("Chung");
	const [text, setText] = (0, import_react.useState)("");
	const rows = (0, import_react.useMemo)(() => messages.filter((m) => m.channel === channel), [messages, channel]);
	function submit(e) {
		e.preventDefault();
		if (!text.trim()) return;
		sendMessage(text.trim(), channel);
		setText("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Hệ thống",
			title: "Chat nội bộ",
			desc: "Trao đổi theo kênh. Dữ liệu lưu trên thiết bị để Admin đối chứng khi cần."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-1 rounded-md bg-surface p-1 shadow-[var(--shadow-card)] w-fit",
			children: CHANNELS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setChannel(c),
				className: `h-9 rounded-sm px-3 text-sm ${channel === c ? "bg-forest text-forest-fg" : "text-muted"}`,
				children: c
			}, c))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "flex min-h-[420px] flex-col p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 space-y-3 overflow-y-auto p-4",
				children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-12 text-center text-sm text-faint",
					children: "Chưa có tin trong kênh này."
				}) : rows.map((m) => {
					const mine = normalizePersonKey(m.from) === normalizePersonKey(me) || normalizePersonKey(m.from) === normalizePersonKey(currentUser.name) || normalizePersonKey(m.from) === normalizePersonKey(currentUser.username);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `flex ${mine ? "justify-end" : "justify-start"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `max-w-[80%] rounded-lg px-3 py-2 text-sm ${mine ? "bg-accent text-accent-fg" : "bg-surface-2 text-ink"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `text-[11px] font-medium ${mine ? "text-accent-fg/80" : "text-muted"}`,
									children: m.from
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 whitespace-pre-wrap",
									children: m.text
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `mt-1 text-[10px] ${mine ? "text-accent-fg/70" : "text-faint"}`,
									children: m.at
								})
							]
						})
					}, m.id);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "flex gap-2 border-t border-line p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: text,
					onChange: (e) => setText(e.target.value),
					placeholder: `Nhắn kênh ${channel}…`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "icon",
					"aria-label": "Gửi",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {})
				})]
			})]
		})
	] });
}
//#endregion
export { ChatPage as component };
