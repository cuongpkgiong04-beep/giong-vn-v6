import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as EMPLOYEES, L as getEmployeeById, c as canEditTask, n as useAppStore, s as canCreateTaskForOthers, u as formatDate } from "./router-DS2KYuON.mjs";
import { t as Button } from "./button-Ca7WG74o.mjs";
import { t as Input } from "./input-B4p5-Q-u.mjs";
import { t as Label } from "./label-BUq_BvRJ.mjs";
import { t as Card } from "./card-D89Flo6c.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogDesc, t as Dialog } from "./dialog-B0OJARcv.mjs";
import { t as PageHeader } from "./page-header-D0Vc9J4l.mjs";
import { t as EmptyState } from "./empty-state-ZnJMkvrv.mjs";
import { t as StatusBadge } from "./status-badge-D5DlNLps.mjs";
import { t as Textarea } from "./textarea-BsfNlra4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/nhiem-vu-X3F1mryU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COLS = [
	"Việc cần làm",
	"Đang làm",
	"Đã xong"
];
function TasksPage() {
	const tasks = useAppStore((s) => s.tasks);
	const addTask = useAppStore((s) => s.addTask);
	const setTaskStatus = useAppStore((s) => s.setTaskStatus);
	const me = useAppStore((s) => s.currentName());
	const currentUserId = useAppStore((s) => s.currentUserId);
	const currentUser = getEmployeeById(currentUserId) ?? EMPLOYEES[0];
	const currentEmployee = getEmployeeById(currentUserId);
	const canCreateForOthers = canCreateTaskForOthers(currentEmployee);
	const [q, setQ] = (0, import_react.useState)("");
	const [mine, setMine] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)("");
	const [assignee, setAssignee] = (0, import_react.useState)(currentUser.username);
	const [due, setDue] = (0, import_react.useState)("");
	const [view, setView] = (0, import_react.useState)("board");
	const filtered = (0, import_react.useMemo)(() => {
		const currentUserName = currentUser.username.toLowerCase();
		return tasks.filter((t) => {
			if (mine) {
				const assigneeMatches = t.assignee.toLowerCase() === currentUserName;
				const createdByMatches = t.createdBy.toLowerCase() === me.toLowerCase();
				if (!assigneeMatches && !createdByMatches) return false;
			}
			if (q.trim()) {
				const s = q.toLowerCase();
				return t.title.toLowerCase().includes(s) || t.assignee.toLowerCase().includes(s);
			}
			return true;
		});
	}, [
		tasks,
		q,
		mine,
		currentUser.username,
		me
	]);
	function colOf(t) {
		if (t.status === "Đã xong") return "Đã xong";
		if (t.status === "Đang làm") return "Đang làm";
		return "Việc cần làm";
	}
	function submit(e) {
		e.preventDefault();
		if (!title.trim()) return;
		addTask({
			assignee,
			title: title.trim(),
			due: due ? `${due} 18:00` : "",
			status: "Việc cần làm",
			support: "",
			blocker: "",
			createdBy: me
		});
		setTitle("");
		setDue("");
		setOpen(false);
		toast.success("Đã tạo nhiệm vụ");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Vận hành",
			title: "Nhiệm vụ",
			desc: "Kế hoạch tuần — tháng. Nhân viên lập, quản lý theo dõi tiến độ.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Nhiệm vụ mới"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-2 sm:flex-row sm:items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Tìm việc, người phụ trách…",
					className: "sm:max-w-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex h-11 items-center gap-2 text-sm text-ink",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: mine,
						onChange: (e) => setMine(e.target.checked),
						className: "size-4 accent-accent"
					}), currentUser.name]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex rounded-md bg-surface p-1 shadow-[var(--shadow-card)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setView("board"),
						className: `h-9 rounded-sm px-3 text-sm ${view === "board" ? "bg-forest text-forest-fg" : "text-muted"}`,
						children: "Kanban"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setView("list"),
						className: `h-9 rounded-sm px-3 text-sm ${view === "list" ? "bg-forest text-forest-fg" : "text-muted"}`,
						children: "Danh sách"
					})]
				})
			]
		}),
		view === "board" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 lg:grid-cols-3",
			children: COLS.map((col) => {
				const items = filtered.filter((t) => colOf(t) === col);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl bg-surface-2/70 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between px-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold text-ink",
							children: col
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs tabular text-muted",
							children: items.length
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [items.slice(0, 24).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-lg bg-surface p-3 shadow-[var(--shadow-card)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-ink",
									children: t.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-xs text-muted",
									children: [
										t.assignee || "Chưa gán",
										" · hạn ",
										formatDate(t.due)
									]
								}),
								t.blocker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 line-clamp-2 text-xs text-warn",
									children: t.blocker
								}) : null,
								canEditTask(currentEmployee, t.createdBy) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 flex flex-wrap gap-1",
									children: COLS.filter((c) => c !== col).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setTaskStatus(t.id, c),
										className: "h-8 rounded-sm bg-surface-2 px-2 text-[11px] font-medium text-muted hover:text-ink",
										children: c
									}, c))
								}) : null
							]
						}, t.id)), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-1 py-6 text-center text-sm text-faint",
							children: "Trống"
						}) : null]
					})]
				}, col);
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "overflow-hidden p-0",
			children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "Không có nhiệm vụ" })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-line",
				children: filtered.slice(0, 60).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-ink",
							children: t.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								t.assignee,
								" · tạo ",
								formatDate(t.created),
								" · hạn ",
								formatDate(t.due)
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: t.status })]
				}, t.id))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Nhiệm vụ mới" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDesc, { children: "Ghi việc cần làm trong tuần hoặc tháng." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "mt-4 flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "t",
							children: "Nội dung"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "t",
							value: title,
							onChange: (e) => setTitle(e.target.value),
							className: "mt-1",
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "a",
							children: "Phụ trách"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "a",
							value: assignee,
							onChange: (e) => setAssignee(e.target.value),
							className: "mt-1 h-11 w-full rounded-md bg-surface px-3 text-sm shadow-[var(--shadow-card)]",
							disabled: !canCreateForOthers,
							children: canCreateForOthers ? EMPLOYEES.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: e.username,
								children: [
									e.name,
									" (",
									e.username,
									")"
								]
							}, e.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: currentUser.username,
								children: [currentUser.name, " (chỉ tạo cho bản thân)"]
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "d",
							children: "Hạn"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "d",
							type: "date",
							value: due,
							onChange: (e) => setDue(e.target.value),
							className: "mt-1"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: "Lưu nhiệm vụ"
						})
					]
				})
			] })
		})
	] });
}
//#endregion
export { TasksPage as component };
