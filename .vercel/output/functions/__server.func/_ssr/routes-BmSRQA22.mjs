import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as ArrowUpRight, D as Building2, f as Package, n as Wallet, o as Timer, r as Users, w as ClipboardList } from "../_libs/lucide-react.mjs";
import { C as CENTERS, D as EMPLOYEES, N as centerName, P as findEmployeeByLooseText, _ as seedDaily, d as formatLongDate, f as formatNum, g as todayIso, h as greetingVi, m as formatVndCompact, n as useAppStore, u as formatDate, v as seedInventory } from "./router-DS2KYuON.mjs";
import { i as CardTitle, r as CardHeader, t as Card } from "./card-D89Flo6c.mjs";
import { t as ClientOnly } from "./client-only-BOolG_8s.mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, o as Area, r as BarChart, s as CartesianGrid, t as AreaChart, u as Cell } from "../_libs/recharts+[...].mjs";
import { t as StatusBadge } from "./status-badge-D5DlNLps.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BmSRQA22.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CHART = "#1c6b58";
var CHART_2 = "#8a9893";
function Kpi({ label, value, hint, to, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "group rounded-xl bg-surface p-4 shadow-[var(--shadow-card)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-card-hover)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-10 items-center justify-center rounded-md bg-accent-soft text-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 text-faint opacity-0 transition-opacity group-hover:opacity-100" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs font-medium tracking-wide text-muted uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-2xl font-semibold tracking-tight text-ink tabular",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-faint",
				children: hint
			}) : null
		]
	});
}
function Dashboard() {
	const tasks = useAppStore((s) => s.tasks);
	const attendance = useAppStore((s) => s.attendance);
	const cash = useAppStore((s) => s.cash);
	const proposals = useAppStore((s) => s.proposals);
	const userName = useAppStore((s) => s.currentName());
	const today = todayIso();
	const openTasks = tasks.filter((t) => t.status !== "Đã xong");
	const doneTasks = tasks.filter((t) => t.status === "Đã xong");
	const todayAtt = attendance.filter((a) => a.date === today);
	const todayIn = new Set(todayAtt.filter((a) => a.status.includes("vào")).map((a) => findEmployeeByLooseText(a.name)?.id ?? a.name.trim().toLowerCase())).size;
	const thu = cash.filter((c) => c.type === "Thu" && c.status === "Đã duyệt").reduce((s, c) => s + c.amount, 0);
	const chi = cash.filter((c) => c.type === "Chi" && c.status === "Đã duyệt").reduce((s, c) => s + c.amount, 0);
	const attChart = (0, import_react.useMemo)(() => {
		return seedDaily.filter((d) => d.in + d.out >= 8).slice(-14).map((d) => ({
			day: d.date.slice(5).replace("-", "/"),
			vào: d.in,
			ra: d.out
		}));
	}, []);
	const invChart = (0, import_react.useMemo)(() => seedInventory.centers.slice(0, 8).map((c) => ({
		name: centerName(c.code),
		value: Math.round(c.value / 1e6)
	})), []);
	const firstName = userName.split(" ").slice(-1)[0];
	const pending = proposals.filter((p) => p.status === "Chờ duyệt").length;
	const expiring = seedInventory.centers.reduce((s, c) => s + c.expiring, 0);
	const shortcuts = [
		{
			to: "/cham-cong",
			label: "Chấm công",
			desc: "Vào ca / tan ca",
			icon: Timer
		},
		{
			to: "/nhiem-vu",
			label: "Nhiệm vụ",
			desc: `${openTasks.length} việc mở`,
			icon: ClipboardList
		},
		{
			to: "/kho",
			label: "Kho vắc xin",
			desc: `${formatNum(seedInventory.items.length)} lô mẫu`,
			icon: Package
		},
		{
			to: "/quy",
			label: "Quỹ tiền",
			desc: "Thu chi nội bộ",
			icon: Wallet
		},
		{
			to: "/nhan-su",
			label: "Nhân sự",
			desc: `${EMPLOYEES.length} người`,
			icon: Users
		},
		{
			to: "/trung-tam",
			label: "Trung tâm",
			desc: `${CENTERS.filter((c) => c.kind === "Trung tâm").length} điểm tiêm`,
			icon: Building2
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.16em] text-accent uppercase",
					children: "Dashboard"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl",
					suppressHydrationWarning: true,
					children: [
						greetingVi(),
						", ",
						firstName
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						"Điều hành chuỗi ",
						CENTERS.filter((c) => c.kind === "Trung tâm").length,
						" trung tâm tiêm chủng Gióng Việt Nam."
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-faint tabular",
				suppressHydrationWarning: true,
				children: formatLongDate()
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Nhân sự",
					value: String(EMPLOYEES.length),
					hint: "Đang làm việc",
					to: "/nhan-su",
					icon: Users
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Chấm công hôm nay",
					value: String(todayIn),
					hint: todayAtt.length ? `${todayAtt.length} lượt ghi` : "Chưa có lượt nào — bấm vào ca",
					to: "/cham-cong",
					icon: Timer
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Nhiệm vụ mở",
					value: String(openTasks.length),
					hint: `${doneTasks.length} đã xong`,
					to: "/nhiem-vu",
					icon: ClipboardList
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Tồn kho",
					value: formatVndCompact(seedInventory.centers.reduce((s, c) => s + c.value, 0)),
					hint: `${expiring} lô gần hạn · ${pending} đề nghị chờ`,
					to: "/kho",
					icon: Package
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-4 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Chấm công 14 phiên đông" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-muted",
					children: "Lượt vào ca / tan ca trên toàn hệ thống"
				})] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-56",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
							data: attChart,
							margin: {
								top: 8,
								right: 8,
								left: -18,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "#d3ddd8",
									strokeDasharray: "3 3",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "day",
									tick: {
										fill: "#5a6b65",
										fontSize: 11
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									tick: {
										fill: "#5a6b65",
										fontSize: 11
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									contentStyle: {
										borderRadius: 12,
										border: "none",
										boxShadow: "var(--shadow-card)"
									},
									labelStyle: { color: "#12211c" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									dataKey: "vào",
									stroke: CHART,
									fill: CHART,
									fillOpacity: .18,
									strokeWidth: 2
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									dataKey: "ra",
									stroke: CHART_2,
									fill: CHART_2,
									fillOpacity: .12,
									strokeWidth: 2
								})
							]
						})
					})
				}) })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Giá trị tồn theo điểm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-sm text-muted",
					children: "Triệu đồng · 8 trung tâm lớn"
				})] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-56",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: invChart,
							layout: "vertical",
							margin: {
								top: 0,
								right: 8,
								left: 8,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "#d3ddd8",
									strokeDasharray: "3 3",
									horizontal: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									type: "number",
									hide: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									type: "category",
									dataKey: "name",
									width: 78,
									tick: {
										fill: "#5a6b65",
										fontSize: 11
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									formatter: (v) => [`${formatNum(v)} tr`, "Giá trị"],
									contentStyle: {
										borderRadius: 12,
										border: "none",
										boxShadow: "var(--shadow-card)"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "value",
									radius: [
										0,
										6,
										6,
										0
									],
									barSize: 12,
									children: invChart.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: i === 0 ? CHART : "#9aada5" }, i))
								})
							]
						})
					})
				}) })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: shortcuts.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: s.to,
				className: "flex items-center gap-3 rounded-xl bg-surface p-4 shadow-[var(--shadow-card)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-card-hover)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-11 items-center justify-center rounded-md bg-forest text-forest-fg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-medium text-ink",
						children: s.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm text-muted",
						children: s.desc
					})]
				})]
			}, s.to))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Chấm công gần đây" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/cham-cong",
				className: "text-sm font-medium text-accent hover:underline",
				children: "Xem tất cả"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-line",
				children: attendance.slice(0, 6).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-3 py-2.5 first:pt-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium text-ink",
							children: a.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-xs text-muted",
							children: [
								formatDate(a.date),
								" · ",
								a.time
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: a.status })]
				}, a.id))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Nhiệm vụ đang mở" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/nhiem-vu",
				className: "text-sm font-medium text-accent hover:underline",
				children: "Bảng việc"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-line",
				children: openTasks.slice(0, 6).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "py-2.5 first:pt-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "line-clamp-2 text-sm font-medium text-ink",
						children: t.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 flex flex-wrap items-center gap-2 text-xs text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.assignee || "Chưa gán" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· hạn ", formatDate(t.due)] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: t.status })
						]
					})]
				}, t.id))
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wide text-muted uppercase",
							children: "Quỹ đã duyệt"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-lg font-semibold tabular text-ok",
							children: ["+ ", formatVndCompact(thu)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Thu"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wide text-muted uppercase",
							children: "Quỹ đã duyệt"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-lg font-semibold tabular text-danger",
							children: ["− ", formatVndCompact(chi)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Chi"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wide text-muted uppercase",
							children: "Số dư thuần"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-lg font-semibold tabular text-ink",
							children: formatVndCompact(thu - chi)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Thu trừ chi (mẫu quỹ)"
						})
					]
				})
			]
		})
	] });
}
//#endregion
export { Dashboard as component };
