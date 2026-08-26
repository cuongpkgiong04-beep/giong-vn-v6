import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as Building2, E as Camera, _ as LogIn, a as TimerReset, g as LogOut, h as MapPin } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as CENTERS, L as getEmployeeById, P as findEmployeeByLooseText, R as getVisibleCenterCodes, l as hasPermission, n as useAppStore, u as formatDate, z as isAdminRole } from "./router-DS2KYuON.mjs";
import { t as Button } from "./button-Ca7WG74o.mjs";
import { t as Input } from "./input-B4p5-Q-u.mjs";
import { t as Card } from "./card-D89Flo6c.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogDesc, t as Dialog } from "./dialog-B0OJARcv.mjs";
import { t as PageHeader } from "./page-header-D0Vc9J4l.mjs";
import { t as EmptyState } from "./empty-state-ZnJMkvrv.mjs";
import { t as StatusBadge } from "./status-badge-D5DlNLps.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cham-cong-Cay-0Hgk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChamCongPage() {
	const attendance = useAppStore((s) => s.attendance);
	const currentUserId = useAppStore((s) => s.currentUserId);
	const clock = useAppStore((s) => s.clock);
	const currentEmployee = getEmployeeById(currentUserId) ?? null;
	const currentName = useAppStore((s) => s.currentName());
	const [q, setQ] = (0, import_react.useState)("");
	const [kind, setKind] = (0, import_react.useState)("all");
	const [center, setCenter] = (0, import_react.useState)("all");
	const [selectedCenter, setSelectedCenter] = (0, import_react.useState)(null);
	const [isDialogOpen, setIsDialogOpen] = (0, import_react.useState)(false);
	const [punchType, setPunchType] = (0, import_react.useState)("Điểm danh vào ca");
	const [gps, setGps] = (0, import_react.useState)("Đang lấy vị trí...");
	const [address, setAddress] = (0, import_react.useState)("Đang xác định vị trí...");
	const [photoPreview, setPhotoPreview] = (0, import_react.useState)(null);
	const [locationStatus, setLocationStatus] = (0, import_react.useState)("Đang xác định vị trí...");
	const allowedCenters = (0, import_react.useMemo)(() => currentEmployee ? getVisibleCenterCodes(currentEmployee) : ["VP"], [currentEmployee]);
	(0, import_react.useEffect)(() => {
		if (!currentEmployee) return;
		if (isAdminRole(currentEmployee.role)) {
			setCenter((prev) => allowedCenters.includes(prev) ? prev : "all");
			return;
		}
		setCenter(currentEmployee.center);
	}, [currentEmployee, allowedCenters]);
	const canViewAll = hasPermission(currentEmployee, "attendance:view_all");
	const canViewCenter = hasPermission(currentEmployee, "attendance:view_center");
	const visibleAttendance = (0, import_react.useMemo)(() => {
		return attendance.filter((record) => {
			const related = findEmployeeByLooseText(record.name);
			const workplace = related?.center ?? record.workplace ?? currentEmployee?.center ?? "VP";
			if (!currentEmployee) return false;
			if (canViewAll) return true;
			if (record.name === currentEmployee.name || related?.id === currentEmployee.id) return true;
			if (canViewCenter && workplace === currentEmployee.center) return true;
			return false;
		});
	}, [
		attendance,
		currentEmployee,
		canViewAll,
		canViewCenter
	]);
	const centerStats = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const c of CENTERS) if (!currentEmployee || isAdminRole(currentEmployee.role) || c.code === currentEmployee.center) map.set(c.code, {
			in: 0,
			out: 0,
			total: 0
		});
		for (const record of visibleAttendance) {
			const place = findEmployeeByLooseText(record.name)?.center ?? record.workplace ?? currentEmployee?.center ?? "VP";
			const bucket = map.get(place) ?? {
				in: 0,
				out: 0,
				total: 0
			};
			bucket.total += 1;
			if (record.status.includes("vào")) bucket.in += 1;
			if (record.status.includes("tan")) bucket.out += 1;
			map.set(place, bucket);
		}
		return [...map.entries()].map(([code, data]) => ({
			code,
			...data
		}));
	}, [currentEmployee, visibleAttendance]);
	const rows = (0, import_react.useMemo)(() => {
		return visibleAttendance.filter((a) => {
			const related = findEmployeeByLooseText(a.name);
			const workplace = related?.center ?? a.workplace ?? currentEmployee?.center ?? "VP";
			if (center !== "all" && workplace !== center) return false;
			if (kind === "in" && !a.status.includes("vào")) return false;
			if (kind === "out" && !a.status.includes("tan")) return false;
			if (q.trim()) {
				const s = q.toLowerCase();
				return [
					a.name,
					a.address,
					a.workplace,
					related?.username ?? "",
					related?.dept ?? "",
					related?.center ?? ""
				].join(" ").toLowerCase().includes(s);
			}
			return true;
		});
	}, [
		center,
		currentEmployee,
		kind,
		q,
		visibleAttendance
	]);
	const selectedCenterRows = (0, import_react.useMemo)(() => {
		if (!selectedCenter) return [];
		return rows.filter((a) => {
			return (findEmployeeByLooseText(a.name)?.center ?? a.workplace ?? currentEmployee?.center ?? "VP") === selectedCenter;
		});
	}, [
		currentEmployee,
		rows,
		selectedCenter
	]);
	function formatPunchTime(date = /* @__PURE__ */ new Date()) {
		return date.toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: true
		});
	}
	function formatPunchDate(date = /* @__PURE__ */ new Date()) {
		return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
	}
	function formatPunchWeekday(date = /* @__PURE__ */ new Date()) {
		return date.toLocaleDateString("vi-VN", { weekday: "long" });
	}
	function requestLocation() {
		if (!navigator.geolocation) {
			setGps("GPS không hỗ trợ trên thiết bị này");
			setAddress("Không thể xác định địa điểm tự động trên thiết bị hiện tại.");
			setLocationStatus("GPS không hỗ trợ");
			return;
		}
		setLocationStatus("Đang xác định vị trí...");
		navigator.geolocation.getCurrentPosition((position) => {
			const coordinateText = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
			setGps(coordinateText);
			setAddress(`Vị trí chấm công hiện tại: ${coordinateText}. Tọa độ được ghi nhận từ thiết bị di động.`);
			setLocationStatus("Vị trí đã xác định");
		}, () => {
			setGps("0.000000, 0.000000");
			setAddress("Không thể xác định vị trí chính xác. Hệ thống đã ghi nhận tọa độ mặc định.");
			setLocationStatus("Không lấy được vị trí chính xác");
		}, {
			enableHighAccuracy: true,
			timeout: 15e3,
			maximumAge: 3e4
		});
	}
	function handlePunchOpen(type) {
		setPunchType(type);
		setIsDialogOpen(true);
		setGps("Đang lấy vị trí...");
		setAddress("Đang xác định vị trí...");
		setLocationStatus("Đang xác định vị trí...");
		setPhotoPreview(null);
		requestLocation();
	}
	function handlePhotoUpload(event) {
		const file = event.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			setPhotoPreview(typeof reader.result === "string" ? reader.result : null);
		};
		reader.readAsDataURL(file);
	}
	function confirmPunch() {
		const rec = clock(punchType, gps === "Đang lấy vị trí..." ? "" : gps, address === "Đang xác định vị trí..." ? "" : address, photoPreview ?? void 0);
		toast.success(`${punchType} lúc ${rec.time}`, { description: rec.name });
		setIsDialogOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Vận hành",
			title: "Chấm công toàn hệ thống",
			desc: "Điểm danh vào ca và tan ca ở văn phòng và toàn bộ các trung tâm tiêm chủng.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => handlePunchOpen("Điểm danh vào ca"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, {}), "Vào ca"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				onClick: () => handlePunchOpen("Điểm danh tan ca"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {}), "Tan ca"]
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4",
			children: centerStats.map((item) => {
				const isActive = selectedCenter === item.code;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: `cursor-pointer p-3 transition ${isActive ? "border border-accent/60 bg-accent-soft/60 shadow-[var(--shadow-card-hover)]" : "hover:bg-surface-2"}`,
					onClick: () => setSelectedCenter(isActive ? null : item.code),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] font-semibold tracking-[0.14em] text-muted uppercase",
								children: item.code
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm font-semibold text-ink",
								children: CENTERS.find((c) => c.code === item.code)?.short ?? item.code
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-8 items-center justify-center rounded-md bg-accent-soft text-accent",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center justify-between text-xs text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Vào: ", item.in] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Ra: ", item.out] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-faint",
							children: [
								"Tổng ",
								item.total,
								" lượt"
							]
						})
					]
				}, item.code);
			})
		}),
		selectedCenter ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-4 overflow-hidden p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-line px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-semibold tracking-[0.14em] text-muted uppercase",
					children: "Trung tâm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-base font-semibold text-ink",
					children: CENTERS.find((c) => c.code === selectedCenter)?.short ?? selectedCenter
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setSelectedCenter(null),
					className: "text-sm text-muted hover:text-ink",
					children: "Ẩn danh sách"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[760px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-surface-2 text-xs font-medium tracking-wide text-muted uppercase",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Nhân sự"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Trụ sở"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Trạng thái"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Ngày"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Giờ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Địa điểm"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-line",
						children: selectedCenterRows.length ? selectedCenterRows.map((a) => {
							const related = findEmployeeByLooseText(a.name);
							const workplace = related?.center ?? a.workplace ?? "VP";
							const short = CENTERS.find((c) => c.code === workplace)?.short ?? workplace;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-surface-2/50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-medium text-ink",
											children: a.name
										}), related ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-faint",
											children: related.title
										}) : null]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-muted",
										children: short
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: a.status })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3 text-muted tabular",
										children: [formatDate(a.date), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-0.5 block text-xs text-faint",
											children: a.weekday
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 tabular text-ink",
										children: a.time
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "max-w-xs truncate px-4 py-3 text-muted",
										children: a.address || a.gps || "—"
									})
								]
							}, a.id);
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 6,
							className: "px-4 py-8 text-center text-sm text-muted",
							children: "Chưa có lượt chấm công cho trung tâm này."
						}) })
					})]
				})
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-2 sm:flex-row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Tìm tên nhân sự, địa chỉ, trụ sở…",
					className: "sm:max-w-sm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: center,
					onChange: (e) => setCenter(e.target.value),
					disabled: !isAdminRole(currentEmployee?.role),
					className: "h-11 rounded-md bg-surface px-3 text-sm shadow-[var(--shadow-card)] sm:w-56 disabled:cursor-not-allowed disabled:opacity-60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "Tất cả trung tâm"
					}), CENTERS.filter((c) => allowedCenters.includes(c.code)).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: c.code,
						children: [
							c.short,
							" (",
							c.code,
							")"
						]
					}, c.code))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex rounded-md bg-surface p-1 shadow-[var(--shadow-card)]",
					children: [
						["all", "Tất cả"],
						["in", "Vào ca"],
						["out", "Tan ca"]
					].map(([k, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setKind(k),
						className: `h-9 rounded-sm px-3 text-sm font-medium ${kind === k ? "bg-forest text-forest-fg" : "text-muted"}`,
						children: label
					}, k))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "overflow-hidden p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[760px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-surface-2 text-xs font-medium tracking-wide text-muted uppercase",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Nhân sự"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Trụ sở"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Trạng thái"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Ngày"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Giờ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Địa điểm"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-line",
						children: rows.slice(0, 80).map((a) => {
							const related = findEmployeeByLooseText(a.name);
							const workplace = related?.center ?? a.workplace ?? "VP";
							const short = CENTERS.find((c) => c.code === workplace)?.short ?? workplace;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-surface-2/50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-medium text-ink",
											children: a.name
										}), related ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-faint",
											children: related.title
										}) : null]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-muted",
										children: short
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: a.status })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3 text-muted tabular",
										children: [formatDate(a.date), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-0.5 block text-xs text-faint",
											children: a.weekday
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 tabular text-ink",
										children: a.time
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "max-w-xs truncate px-4 py-3 text-muted",
										children: a.address || a.gps || "—"
									})
								]
							}, a.id);
						})
					})]
				})
			}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "Không có lượt chấm",
					desc: "Thử đổi bộ lọc hoặc điểm danh vào ca."
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "px-4 py-3 text-xs text-faint",
				children: [
					"Hiển thị ",
					Math.min(80, rows.length),
					" / ",
					rows.length,
					" lượt"
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: isDialogOpen,
			onOpenChange: setIsDialogOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: punchType }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDesc, { children: "Ghi nhận chấm công với hình ảnh, thời gian và định vị hiện tại." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 space-y-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 md:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-medium tracking-[0.12em] text-muted uppercase",
									children: "Ảnh chụp"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-surface-2 p-4 text-center text-sm text-muted transition hover:border-accent/50 hover:bg-accent-soft",
									children: [photoPreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: photoPreview,
										alt: "Ảnh chấm công",
										className: "h-full max-h-52 w-full rounded-xl object-cover"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "mb-3 size-8 text-accent" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Chụp ảnh từ điện thoại" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 text-xs text-faint",
											children: "Hệ thống sẽ lưu ảnh cùng vị trí"
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "file",
										accept: "image/*",
										capture: "environment",
										onChange: handlePhotoUpload,
										className: "hidden"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-line bg-surface-2 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] font-semibold tracking-[0.12em] text-muted uppercase",
											children: "Tên nhân sự"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-lg font-semibold text-ink",
											children: currentName
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-line bg-surface-2 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] font-semibold tracking-[0.12em] text-muted uppercase",
											children: "Thời gian"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-lg font-semibold text-ink",
											children: formatPunchTime()
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-line bg-surface-2 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] font-semibold tracking-[0.12em] text-muted uppercase",
											children: "Thứ trong tuần"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-base font-medium text-ink",
											children: formatPunchWeekday()
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-line bg-surface-2 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] font-semibold tracking-[0.12em] text-muted uppercase",
											children: "Ngày điểm danh"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-base font-medium text-ink",
											children: formatPunchDate()
										})]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 md:grid-cols-[1.2fr_0.8fr]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-line bg-surface-2 p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-2 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] font-semibold tracking-[0.12em] text-muted uppercase",
											children: "Định vị GPS"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1 text-xs text-muted",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }), locationStatus]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative h-36 overflow-hidden rounded-xl border border-line bg-[radial-gradient(circle_at_30%_30%,rgba(38,99,87,0.32),transparent_22%),linear-gradient(135deg,#dfe9e3,#c2d6cf)]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute inset-0 opacity-60",
											style: {
												backgroundImage: "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
												backgroundSize: "24px 24px"
											}
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute left-[60%] top-[45%] flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-forest text-[10px] font-bold text-forest-fg ring-4 ring-white/70",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm font-medium text-ink",
										children: gps
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-line bg-surface-2 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-semibold tracking-[0.12em] text-muted uppercase",
										children: "Địa chỉ"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerReset, { className: "size-4 text-muted" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm leading-6 text-ink",
									children: address
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex justify-end gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setIsDialogOpen(false),
							children: "Hủy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: confirmPunch,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-4" }),
								"Xác nhận ",
								punchType === "Điểm danh vào ca" ? "vào ca" : "tan ca"
							]
						})]
					})
				]
			})
		})
	] });
}
//#endregion
export { ChamCongPage as component };
