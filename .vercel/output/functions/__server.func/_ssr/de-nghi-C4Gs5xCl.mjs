import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { L as getEmployeeById, g as todayIso, n as useAppStore, o as canApproveProposals, u as formatDate } from "./router-DS2KYuON.mjs";
import { t as Button } from "./button-Ca7WG74o.mjs";
import { t as Input } from "./input-B4p5-Q-u.mjs";
import { t as Label } from "./label-BUq_BvRJ.mjs";
import { t as Card } from "./card-D89Flo6c.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogDesc, t as Dialog } from "./dialog-B0OJARcv.mjs";
import { t as PageHeader } from "./page-header-D0Vc9J4l.mjs";
import { t as StatusBadge } from "./status-badge-D5DlNLps.mjs";
import { t as Textarea } from "./textarea-BsfNlra4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/de-nghi-C4Gs5xCl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KINDS = [
	"Nhân sự",
	"Thu chi",
	"Nhập xuất",
	"Góp ý"
];
function DeNghiPage() {
	const proposals = useAppStore((s) => s.proposals);
	const addProposal = useAppStore((s) => s.addProposal);
	const setProposalStatus = useAppStore((s) => s.setProposalStatus);
	const me = useAppStore((s) => s.currentName());
	const currentUserId = useAppStore((s) => s.currentUserId);
	const currentEmployee = getEmployeeById(currentUserId);
	const canApprove = canApproveProposals(currentEmployee);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [kind, setKind] = (0, import_react.useState)("Nhân sự");
	const [title, setTitle] = (0, import_react.useState)("");
	const [detail, setDetail] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const rows = filter === "all" ? proposals : proposals.filter((p) => p.kind === filter);
	function submit(e) {
		e.preventDefault();
		if (!title.trim()) return;
		addProposal({
			kind,
			title: title.trim(),
			requester: me,
			date: todayIso(),
			detail: detail.trim(),
			status: "Chờ duyệt",
			dept: "Hệ thống"
		});
		setTitle("");
		setDetail("");
		setOpen(false);
		toast.success("Đã gửi đề nghị");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Nghiệp vụ",
			title: "Đề nghị — Đề xuất",
			desc: "Nhân sự, thu chi, nhập xuất, góp ý. Quản lý phê duyệt, từ chối hoặc hủy.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Tạo đề nghị"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-1 rounded-md bg-surface p-1 shadow-[var(--shadow-card)] w-fit",
			children: ["all", ...KINDS].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setFilter(k),
				className: `h-9 rounded-sm px-3 text-sm ${filter === k ? "bg-forest text-forest-fg" : "text-muted"}`,
				children: k === "all" ? "Tất cả" : k
			}, k))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: rows.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1 flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: p.kind }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: p.status })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold text-ink",
								children: p.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: p.detail
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-faint",
								children: [
									p.requester,
									" · ",
									p.dept,
									" · ",
									formatDate(p.date)
								]
							})
						]
					}), p.status === "Chờ duyệt" && canApprove ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => {
								setProposalStatus(p.id, "Từ chối");
								toast.message("Đã từ chối");
							},
							children: "Từ chối"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => {
								setProposalStatus(p.id, "Đã duyệt");
								toast.success("Đã phê duyệt");
							},
							children: "Phê duyệt"
						})]
					}) : p.status === "Chờ duyệt" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-faint",
						children: "Chờ quản lý duyệt"
					}) : null]
				})
			}, p.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Đề nghị mới" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDesc, { children: "Gửi tới quản lý để phê duyệt." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "mt-4 flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Loại" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: kind,
							onChange: (e) => setKind(e.target.value),
							className: "mt-1 h-11 w-full rounded-md bg-surface px-3 text-sm shadow-[var(--shadow-card)]",
							children: KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: k }, k))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "tt",
							children: "Tiêu đề"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "tt",
							value: title,
							onChange: (e) => setTitle(e.target.value),
							className: "mt-1",
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "dd",
							children: "Chi tiết"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "dd",
							value: detail,
							onChange: (e) => setDetail(e.target.value),
							className: "mt-1"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: "Gửi"
						})
					]
				})
			] })
		})
	] });
}
//#endregion
export { DeNghiPage as component };
