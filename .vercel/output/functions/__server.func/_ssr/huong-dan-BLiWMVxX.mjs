import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { M as SUPPORT_PHONE, O as GUIDES, j as SUPPORT_ALT } from "./router-DS2KYuON.mjs";
import { t as Card } from "./card-D89Flo6c.mjs";
import { t as PageHeader } from "./page-header-D0Vc9J4l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/huong-dan-BLiWMVxX.js
var import_jsx_runtime = require_jsx_runtime();
function HuongDanPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Hệ thống",
			title: "Giới thiệu & hướng dẫn",
			desc: "GIONG VN thay bộ AppSheet rời bằng một ứng dụng dùng được trên máy tính, web, iOS và Android."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-5 p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-ink",
				children: "Khi vào ứng dụng, dashboard cho biết nhân sự, chấm công, nhiệm vụ mở và giá trị tồn kho. Việc hàng ngày: chấm công, kiểm tra kế hoạch, vào module nghiệp vụ, ghi chú và góp ý."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted",
				children: [
					"Hỗ trợ: ",
					SUPPORT_PHONE,
					" hoặc ",
					SUPPORT_ALT,
					" (Zalo / điện thoại)."
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "grid gap-3",
			children: GUIDES.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-[0.14em] text-accent uppercase",
						children: String(i + 1).padStart(2, "0")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-semibold text-ink",
						children: g.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: g.body
					})
				]
			}) }, g.id))
		})
	] });
}
//#endregion
export { HuongDanPage as component };
