import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as CENTERS, N as centerName, f as formatNum, m as formatVndCompact, p as formatVnd, u as formatDate, v as seedInventory, y as seedTransfers } from "./router-DS2KYuON.mjs";
import { t as Input } from "./input-B4p5-Q-u.mjs";
import { i as CardTitle, r as CardHeader, t as Card } from "./card-D89Flo6c.mjs";
import { t as Badge } from "./badge-Xx5N9e8p.mjs";
import { t as PageHeader } from "./page-header-D0Vc9J4l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kho-XoMSJzSe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function KhoPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const [center, setCenter] = (0, import_react.useState)("all");
	const [tab, setTab] = (0, import_react.useState)("ton");
	const items = (0, import_react.useMemo)(() => {
		return seedInventory.items.filter((i) => {
			if (center !== "all" && i.center !== center) return false;
			if (q.trim()) {
				const s = q.toLowerCase();
				return i.name.toLowerCase().includes(s) || i.lot.toLowerCase().includes(s);
			}
			return true;
		});
	}, [q, center]);
	const totalVal = seedInventory.centers.reduce((s, c) => s + c.value, 0);
	const totalQty = seedInventory.centers.reduce((s, c) => s + c.qty, 0);
	const expiring = seedInventory.centers.reduce((s, c) => s + c.expiring, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Nghiệp vụ",
			title: "Kho vắc xin",
			desc: `Tồn kho chốt ${seedInventory.asOf.replace(/-/g, "/")} · ${formatNum(totalQty)} liều trên ${seedInventory.centers.length} điểm.`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-muted uppercase",
						children: "Giá trị tồn"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xl font-semibold tabular",
						children: formatVndCompact(totalVal)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-muted uppercase",
						children: "Số liều"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xl font-semibold tabular",
						children: formatNum(totalQty)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-muted uppercase",
						children: "Lô gần hạn"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xl font-semibold tabular text-warn",
						children: expiring
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-muted uppercase",
						children: "Mặt hàng (mẫu)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xl font-semibold tabular",
						children: seedInventory.vaccines.length
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex rounded-md bg-surface p-1 shadow-[var(--shadow-card)] w-fit",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setTab("ton"),
				className: `h-9 rounded-sm px-3 text-sm ${tab === "ton" ? "bg-forest text-forest-fg" : "text-muted"}`,
				children: "Tồn kho"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setTab("dc"),
				className: `h-9 rounded-sm px-3 text-sm ${tab === "dc" ? "bg-forest text-forest-fg" : "text-muted"}`,
				children: "Điều chuyển"
			})]
		}),
		tab === "ton" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Tìm vắc xin, số lô…",
					className: "sm:max-w-sm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: center,
					onChange: (e) => setCenter(e.target.value),
					className: "h-11 rounded-md bg-surface px-3 text-sm shadow-[var(--shadow-card)] sm:w-56",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "Mọi trung tâm"
					}), CENTERS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.code,
						children: c.short
					}, c.code))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
				children: seedInventory.centers.slice(0, 8).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setCenter(c.code),
					className: "rounded-xl bg-surface p-4 text-left shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-ink",
							children: centerName(c.code)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-lg font-semibold tabular",
							children: formatVndCompact(c.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								formatNum(c.qty),
								" liều · ",
								c.skus,
								" SKU",
								c.expiring ? ` · ${c.expiring} gần hạn` : ""
							]
						})
					]
				}, c.code))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "overflow-hidden p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[800px] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-surface-2 text-xs font-medium tracking-wide text-muted uppercase",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Vắc xin"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Lô"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Điểm"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "SL"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Hạn"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Giá trị"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-line",
							children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 font-medium text-ink",
									children: i.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 font-mono text-xs text-muted",
									children: i.lot
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: centerName(i.center)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 tabular",
									children: formatNum(i.qty)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular",
										children: formatDate(i.expiry)
									}), i.daysLeft != null && i.daysLeft < 90 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										tone: "warn",
										className: "ml-2",
										children: [i.daysLeft, " ngày"]
									}) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 tabular",
									children: formatVnd(i.value)
								})
							] }, `${i.center}-${i.name}-${i.lot}`))
						})]
					})
				})
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "overflow-hidden p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
				className: "px-4 pt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Phiếu điều chuyển gần đây" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[720px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-surface-2 text-xs font-medium text-muted uppercase",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Ngày"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Vắc xin"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Từ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Đến"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "SL"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3",
								children: "Người lập"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-line",
						children: seedTransfers.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 tabular text-muted",
								children: formatDate(t.date)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-3 font-medium",
								children: [t.vaccine, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 block font-mono text-xs text-faint",
									children: t.lot
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: centerName(t.fromCenter)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: centerName(t.toCenter)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 tabular",
								children: formatNum(t.qty)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-muted",
								children: t.author
							})
						] }, t.id))
					})]
				})
			})]
		})
	] });
}
//#endregion
export { KhoPage as component };
