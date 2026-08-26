import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as CENTERS, L as getEmployeeById, N as centerName, a as canApproveCash, g as todayIso, m as formatVndCompact, n as useAppStore, p as formatVnd, u as formatDate } from "./router-DS2KYuON.mjs";
import { t as Button } from "./button-Ca7WG74o.mjs";
import { t as Input } from "./input-B4p5-Q-u.mjs";
import { t as Label } from "./label-BUq_BvRJ.mjs";
import { t as Card } from "./card-D89Flo6c.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogDesc, t as Dialog } from "./dialog-B0OJARcv.mjs";
import { t as PageHeader } from "./page-header-D0Vc9J4l.mjs";
import { t as StatusBadge } from "./status-badge-D5DlNLps.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quy-BK5w5nNp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QuyPage() {
	const cash = useAppStore((s) => s.cash);
	const addCash = useAppStore((s) => s.addCash);
	const setCashStatus = useAppStore((s) => s.setCashStatus);
	const me = useAppStore((s) => s.currentName());
	const currentUserId = useAppStore((s) => s.currentUserId);
	const currentEmployee = getEmployeeById(currentUserId);
	const canApprove = canApproveCash(currentEmployee);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [type, setType] = (0, import_react.useState)("Thu");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [content, setContent] = (0, import_react.useState)("");
	const [center, setCenter] = (0, import_react.useState)("VP");
	const thu = cash.filter((c) => c.type === "Thu" && c.status === "Đã duyệt").reduce((s, c) => s + c.amount, 0);
	const chi = cash.filter((c) => c.type === "Chi" && c.status === "Đã duyệt").reduce((s, c) => s + c.amount, 0);
	const rows = (0, import_react.useMemo)(() => cash, [cash]);
	function submit(e) {
		e.preventDefault();
		const n = Number(amount.replace(/\D/g, ""));
		if (!n || !content.trim()) return;
		addCash({
			type,
			date: todayIso(),
			amount: n,
			content: content.trim(),
			center,
			person: me,
			method: "Chuyển khoản",
			status: "Nháp"
		});
		setAmount("");
		setContent("");
		setOpen(false);
		toast.success("Đã lập phiếu");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Nghiệp vụ",
			title: "Quỹ tiền",
			desc: "Phiếu thu — phiếu chi. Quản lý duyệt mới vào số dư.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Lập phiếu"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-muted uppercase",
						children: "Thu đã duyệt"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xl font-semibold tabular text-ok",
						children: formatVndCompact(thu)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-muted uppercase",
						children: "Chi đã duyệt"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xl font-semibold tabular text-danger",
						children: formatVndCompact(chi)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-muted uppercase",
						children: "Số dư thuần"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xl font-semibold tabular",
						children: formatVndCompact(thu - chi)
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "overflow-hidden p-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[760px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-surface-2 text-xs font-medium text-muted uppercase",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Ngày"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Loại"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Nội dung"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Điểm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Số tiền"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "TT"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3" })
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-line",
						children: rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 tabular text-muted",
								children: formatDate(c.date)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: c.type })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-ink",
									children: c.content
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-faint",
									children: [
										c.person,
										" · ",
										c.method
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: centerName(c.center)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: `px-4 py-3 font-medium tabular ${c.type === "Thu" ? "text-ok" : "text-danger"}`,
								children: [
									c.type === "Thu" ? "+" : "−",
									" ",
									formatVnd(c.amount)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: c.status })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: c.status !== "Đã duyệt" && canApprove ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "text-xs font-medium text-danger hover:underline",
										onClick: () => {
											setCashStatus(c.id, "Từ chối");
											toast.message("Đã từ chối phiếu");
										},
										children: "Từ chối"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "text-xs font-medium text-accent hover:underline",
										onClick: () => {
											setCashStatus(c.id, "Đã duyệt");
											toast.success("Đã duyệt phiếu");
										},
										children: "Duyệt"
									})]
								}) : c.status !== "Đã duyệt" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-faint",
									children: "Chờ duyệt"
								}) : null
							})
						] }, c.id))
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Lập phiếu quỹ" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDesc, { children: "Phiếu ở trạng thái nháp cho đến khi quản lý duyệt." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "mt-4 flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-2",
							children: ["Thu", "Chi"].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setType(t),
								className: `h-11 flex-1 rounded-md text-sm font-medium ${type === t ? "bg-forest text-forest-fg" : "bg-surface-2 text-muted"}`,
								children: t
							}, t))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "amt",
							children: "Số tiền (VND)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "amt",
							inputMode: "numeric",
							value: amount,
							onChange: (e) => setAmount(e.target.value),
							className: "mt-1",
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "ct",
							children: "Nội dung"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "ct",
							value: content,
							onChange: (e) => setContent(e.target.value),
							className: "mt-1",
							required: true
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "c",
							children: "Trung tâm"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "c",
							value: center,
							onChange: (e) => setCenter(e.target.value),
							className: "mt-1 h-11 w-full rounded-md bg-surface px-3 text-sm shadow-[var(--shadow-card)]",
							children: CENTERS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.code,
								children: c.short
							}, c.code))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: "Lưu phiếu"
						})
					]
				})
			] })
		})
	] });
}
//#endregion
export { QuyPage as component };
