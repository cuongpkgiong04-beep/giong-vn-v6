import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { T as CREDIT_SEED, m as formatVndCompact, p as formatVnd, u as formatDate, w as COLLATERAL_SEED } from "./router-DS2KYuON.mjs";
import { t as Card } from "./card-D89Flo6c.mjs";
import { t as PageHeader } from "./page-header-D0Vc9J4l.mjs";
import { t as StatusBadge } from "./status-badge-D5DlNLps.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tin-dung-Cs_xO4sr.js
var import_jsx_runtime = require_jsx_runtime();
function TinDungPage() {
	const limit = CREDIT_SEED.reduce((s, c) => s + c.limit, 0);
	const out = CREDIT_SEED.reduce((s, c) => s + c.outstanding, 0);
	const col = COLLATERAL_SEED.reduce((s, c) => s + c.value, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Nghiệp vụ",
			title: "Tín dụng — Tài chính",
			desc: "Hạn mức ngân hàng, dư nợ và tài sản đảm bảo của Gióng Việt Nam."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-muted uppercase",
						children: "Tổng hạn mức"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xl font-semibold tabular",
						children: formatVndCompact(limit)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-muted uppercase",
							children: "Dư nợ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xl font-semibold tabular",
							children: formatVndCompact(out)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [Math.round(out / limit * 100), "% hạn mức"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-muted uppercase",
						children: "Tài sản đảm bảo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xl font-semibold tabular",
						children: formatVndCompact(col)
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 text-base font-semibold",
			children: "Tổ chức tín dụng"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-8 grid gap-3",
			children: CREDIT_SEED.map((c) => {
				const pct = Math.round(c.outstanding / c.limit * 100);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-ink",
								children: c.bank
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: c.type
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: c.status })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-2 overflow-hidden rounded-full bg-surface-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-accent",
								style: { width: `${pct}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Hạn mức ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "tabular",
									children: formatVnd(c.limit)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Dư nợ ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "tabular",
									children: formatVnd(c.outstanding)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: ["Đáo hạn ", formatDate(c.due)]
								})
							]
						})
					]
				}, c.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 text-base font-semibold",
			children: "Tài sản đảm bảo"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: COLLATERAL_SEED.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold text-ink",
						children: c.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							c.type,
							" · ",
							c.location
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-lg font-semibold tabular",
						children: formatVndCompact(c.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-faint",
						children: c.status
					})
				]
			}, c.id))
		})
	] });
}
//#endregion
export { TinDungPage as component };
