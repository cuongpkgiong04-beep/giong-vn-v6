import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as STAFF_BY_CENTER, C as CENTERS, F as getCenterByCode, f as formatNum, m as formatVndCompact, v as seedInventory } from "./router-DS2KYuON.mjs";
import { t as Card } from "./card-D89Flo6c.mjs";
import { t as PageHeader } from "./page-header-D0Vc9J4l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trung-tam-Dnd6Mgwx.js
var import_jsx_runtime = require_jsx_runtime();
function TrungTamPage() {
	const inv = Object.fromEntries(seedInventory.centers.map((c) => [c.code, c]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Danh mục",
		title: "Trung tâm tiêm chủng",
		desc: "Chuỗi Gióng phủ Hà Nội, Bắc Ninh và Vĩnh Phúc — kho lạnh và thu ngân tại từng điểm."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
		children: CENTERS.map((c) => {
			const i = inv[c.code];
			const centerMeta = getCenterByCode(c.code);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-[0.14em] text-accent uppercase",
								children: c.code
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 font-semibold text-ink",
								children: centerMeta?.short ?? c.short
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: centerMeta?.city ?? c.city
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-muted",
							children: c.kind
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-faint",
						children: c.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid grid-cols-3 gap-2 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md bg-surface-2/80 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-[10px] tracking-wide text-muted uppercase",
									children: "Tồn"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-sm font-semibold tabular",
									children: i ? formatVndCompact(i.value) : "—"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md bg-surface-2/80 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-[10px] tracking-wide text-muted uppercase",
									children: "Liều"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-sm font-semibold tabular",
									children: i ? formatNum(i.qty) : "—"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md bg-surface-2/80 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-[10px] tracking-wide text-muted uppercase",
									children: "NS"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-sm font-semibold tabular",
									children: STAFF_BY_CENTER[c.code] ?? 0
								})]
							})
						]
					})
				]
			}, c.code);
		})
	})] });
}
//#endregion
export { TrungTamPage as component };
