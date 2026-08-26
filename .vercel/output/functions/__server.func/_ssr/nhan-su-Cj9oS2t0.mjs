import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as EMPLOYEES, N as centerName } from "./router-DS2KYuON.mjs";
import { t as Input } from "./input-B4p5-Q-u.mjs";
import { t as Card } from "./card-D89Flo6c.mjs";
import { t as PageHeader } from "./page-header-D0Vc9J4l.mjs";
import { t as StatusBadge } from "./status-badge-D5DlNLps.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/nhan-su-Cj9oS2t0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function initials(name) {
	return name.split(" ").filter(Boolean).slice(-2).map((p) => p[0]).join("").toUpperCase();
}
function NhanSuPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const [dept, setDept] = (0, import_react.useState)("all");
	const depts = (0, import_react.useMemo)(() => [...new Set(EMPLOYEES.map((e) => e.dept))], []);
	const rows = EMPLOYEES.filter((e) => {
		if (dept !== "all" && e.dept !== dept) return false;
		if (q.trim()) {
			const s = q.toLowerCase();
			return e.name.toLowerCase().includes(s) || e.username.toLowerCase().includes(s) || e.email.toLowerCase().includes(s);
		}
		return true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Danh mục",
			title: "Nhân sự",
			desc: `${EMPLOYEES.length} người đang làm việc tại văn phòng và các trung tâm tiêm chủng.`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-2 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Tìm tên, tài khoản, email…",
				className: "sm:max-w-sm"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: dept,
				onChange: (e) => setDept(e.target.value),
				className: "h-11 rounded-md bg-surface px-3 text-sm shadow-[var(--shadow-card)] sm:w-56",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "all",
					children: "Mọi bộ phận"
				}), depts.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: d }, d))]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
			children: rows.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex gap-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent",
					children: initials(e.name)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-ink",
							children: e.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								e.title,
								" · ",
								e.dept
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-faint",
							children: [
								e.username,
								" · ",
								centerName(e.center)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: e.role }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: e.status })]
						})
					]
				})]
			}, e.id))
		})
	] });
}
//#endregion
export { NhanSuPage as component };
