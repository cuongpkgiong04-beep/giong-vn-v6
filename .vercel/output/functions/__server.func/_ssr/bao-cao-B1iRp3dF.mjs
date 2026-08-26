import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { N as centerName, _ as seedDaily, f as formatNum, k as REPORTS, n as useAppStore, v as seedInventory } from "./router-DS2KYuON.mjs";
import { i as CardTitle, r as CardHeader, t as Card } from "./card-D89Flo6c.mjs";
import { t as ClientOnly } from "./client-only-BOolG_8s.mjs";
import { t as PageHeader } from "./page-header-D0Vc9J4l.mjs";
import { d as ResponsiveContainer, f as Tooltip, l as Pie, n as PieChart, u as Cell } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bao-cao-B1iRp3dF.js
var import_jsx_runtime = require_jsx_runtime();
function BaoCaoPage() {
	const tasks = useAppStore((s) => s.tasks);
	const pie = [{
		name: "Đã xong",
		value: tasks.filter((t) => t.status === "Đã xong").length,
		color: "#1c6b58"
	}, {
		name: "Cần làm",
		value: tasks.filter((t) => t.status !== "Đã xong").length,
		color: "#b45309"
	}];
	const busy = seedDaily.filter((d) => d.in + d.out >= 8);
	const avgIn = Math.round(busy.reduce((s, d) => s + d.in, 0) / Math.max(busy.length, 1));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Hệ thống",
			title: "Báo cáo & biểu đồ",
			desc: "Các view báo cáo từ AppSheet gốc, gom về một chỗ trên dashboard."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: REPORTS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: r.href,
				className: "group rounded-xl bg-surface p-4 shadow-[var(--shadow-card)] transition-[box-shadow] hover:shadow-[var(--shadow-card-hover)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold text-ink",
						children: r.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 text-faint group-hover:text-accent" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: r.desc
				})]
			}, r.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Cơ cấu nhiệm vụ" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-56 items-center gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "50%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
						data: pie,
						dataKey: "value",
						innerRadius: 48,
						outerRadius: 72,
						paddingAngle: 3,
						children: pie.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: p.color }, p.name))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "text-sm",
					children: pie.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "mb-2 flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-2.5 rounded-full",
								style: { background: p.color }
							}),
							p.name,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "tabular",
								children: p.value
							})
						]
					}, p.name))
				})]
			}) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Chấm công trung bình" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-3xl font-semibold tabular",
					children: avgIn
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Lượt vào ca / ngày làm việc đông (mẫu 2026)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-2 text-sm",
					children: seedInventory.centers.slice(0, 5).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: centerName(c.code)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular font-medium",
							children: [formatNum(c.skus), " SKU"]
						})]
					}, c.code))
				})
			] })]
		})
	] });
}
//#endregion
export { BaoCaoPage as component };
