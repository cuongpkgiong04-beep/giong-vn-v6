import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { g as todayIso, n as useAppStore, u as formatDate } from "./router-DS2KYuON.mjs";
import { t as Button } from "./button-Ca7WG74o.mjs";
import { t as Label } from "./label-BUq_BvRJ.mjs";
import { t as Card } from "./card-D89Flo6c.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogDesc, t as Dialog } from "./dialog-B0OJARcv.mjs";
import { t as PageHeader } from "./page-header-D0Vc9J4l.mjs";
import { t as StatusBadge } from "./status-badge-D5DlNLps.mjs";
import { t as Textarea } from "./textarea-BsfNlra4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ghi-chu-Ba65rYfQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GhiChuPage() {
	const notes = useAppStore((s) => s.notes);
	const addNote = useAppStore((s) => s.addNote);
	const me = useAppStore((s) => s.currentName());
	const [open, setOpen] = (0, import_react.useState)(false);
	const [content, setContent] = (0, import_react.useState)("");
	function submit(e) {
		e.preventDefault();
		if (!content.trim()) return;
		addNote({
			date: todayIso(),
			content: content.trim(),
			author: me,
			deploy: me,
			deadline: "",
			support: "",
			dept: "Hệ thống",
			status: "Mới"
		});
		setContent("");
		setOpen(false);
		toast.success("Đã thêm ghi chú");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Hệ thống",
			title: "Ghi chú",
			desc: "Mọi nhân sự được thêm mới. Không sửa, không xóa — đúng quy chế AppSheet gốc.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Thêm ghi chú"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: n.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-faint",
							children: n.dept
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whitespace-pre-wrap text-sm text-ink",
						children: n.content
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-muted",
						children: [
							n.author,
							" · ",
							formatDate(n.date),
							n.deadline ? ` · hạn ${formatDate(n.deadline)}` : "",
							n.support ? ` · hỗ trợ ${n.support}` : ""
						]
					})
				]
			}, n.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Ghi chú mới" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDesc, { children: "Nội dung sẽ được lưu, không chỉnh sửa sau khi gửi." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "mt-4 flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "gc",
						children: "Nội dung"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "gc",
						value: content,
						onChange: (e) => setContent(e.target.value),
						className: "mt-1 min-h-32",
						required: true
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: "Lưu"
					})]
				})
			] })
		})
	] });
}
//#endregion
export { GhiChuPage as component };
