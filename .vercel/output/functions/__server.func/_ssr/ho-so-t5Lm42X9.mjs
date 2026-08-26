import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { x as FileText } from "../_libs/lucide-react.mjs";
import { E as DOCS, u as formatDate } from "./router-DS2KYuON.mjs";
import { t as Card } from "./card-D89Flo6c.mjs";
import { t as PageHeader } from "./page-header-D0Vc9J4l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ho-so-t5Lm42X9.js
var import_jsx_runtime = require_jsx_runtime();
function HoSoPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Danh mục",
		title: "Hồ sơ tài liệu",
		desc: "Thêm mới và tra cứu. Không sửa, không xóa — đúng quy chế lưu trữ của công ty."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 sm:grid-cols-2",
		children: DOCS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "flex items-start gap-3 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-11 items-center justify-center rounded-md bg-accent-soft text-accent",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold text-ink",
				children: d.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					d.dept,
					" · cập nhật ",
					formatDate(d.updated)
				]
			})] })]
		}, d.id))
	})] });
}
//#endregion
export { HoSoPage as component };
