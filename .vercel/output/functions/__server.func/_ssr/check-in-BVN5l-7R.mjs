import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { h as MapPin } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { L as getEmployeeById, P as findEmployeeByLooseText, n as useAppStore, u as formatDate, z as isAdminRole } from "./router-DS2KYuON.mjs";
import { t as Button } from "./button-Ca7WG74o.mjs";
import { t as Card } from "./card-D89Flo6c.mjs";
import { t as PageHeader } from "./page-header-D0Vc9J4l.mjs";
import { t as EmptyState } from "./empty-state-ZnJMkvrv.mjs";
import { t as Textarea } from "./textarea-BsfNlra4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/check-in-BVN5l-7R.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CheckInPage() {
	const checkins = useAppStore((s) => s.checkins);
	const currentUserId = useAppStore((s) => s.currentUserId);
	const addCheckin = useAppStore((s) => s.addCheckin);
	const currentEmployee = getEmployeeById(currentUserId) ?? null;
	const [note, setNote] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const visibleCheckins = (0, import_react.useMemo)(() => {
		return checkins.filter((entry) => {
			if (isAdminRole(currentEmployee?.role)) return true;
			if (!currentEmployee) return false;
			const matchingEmployee = findEmployeeByLooseText(entry.name) ?? null;
			return matchingEmployee?.id === currentEmployee.id || matchingEmployee?.center === currentEmployee.center || entry.name === currentEmployee.name || (entry.address ?? "").includes(currentEmployee.center);
		});
	}, [checkins, currentEmployee]);
	async function locate() {
		setBusy(true);
		let gps = "";
		let address = "";
		try {
			if (navigator.geolocation) {
				const pos = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 4e3 }));
				gps = `${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`;
				address = "Tọa độ thiết bị hiện tại";
			}
		} catch {
			gps = "21.047200, 105.878140";
			address = "Văn phòng Gióng — 8/61 Nguyễn Sơn, Bồ Đề (mô phỏng)";
		}
		const rec = addCheckin(gps, address, note.trim());
		setNote("");
		setBusy(false);
		toast.success(`Check-in ${rec.time}`, { description: rec.address || rec.gps });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Vận hành",
			title: "Check-in địa điểm",
			desc: "Ghi nhận vị trí khi đi công tác, giám sát điểm tiêm hoặc giao vắc xin liên trung tâm."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-5 max-w-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-ink",
						children: "Lượt check-in mới"
					}), currentEmployee ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-accent-soft px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent",
						children: [
							currentEmployee.name,
							" · ",
							currentEmployee.center
						]
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 mb-3 text-sm text-muted",
					children: "Trình duyệt sẽ hỏi quyền vị trí. Nếu từ chối, hệ thống ghi tọa độ văn phòng."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: note,
					onChange: (e) => setNote(e.target.value),
					placeholder: "Ghi chú (ví dụ: giám sát kho lạnh Sài Đồng)",
					className: "mb-3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: locate,
					disabled: busy,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}), busy ? "Đang lấy vị trí…" : "Check-in ngay"]
				})
			]
		}),
		visibleCheckins.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "Chưa có lượt check-in",
			desc: "Bấm Check-in ngay để ghi vị trí đầu tiên trong phiên này."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-2",
			children: visibleCheckins.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-ink",
							children: c.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								formatDate(c.date),
								" · ",
								c.time,
								" · ",
								c.weekday
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-ink",
							children: c.address || "—"
						}),
						c.gps ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-faint",
							children: c.gps
						}) : null,
						c.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: c.note
						}) : null
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 text-accent" })]
				})
			}) }, c.id))
		})
	] });
}
//#endregion
export { CheckInPage as component };
