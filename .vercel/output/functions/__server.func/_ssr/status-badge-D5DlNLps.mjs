import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Badge } from "./badge-Xx5N9e8p.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-badge-D5DlNLps.js
var import_jsx_runtime = require_jsx_runtime();
function StatusBadge({ value }) {
	const v = value.toLowerCase();
	let tone = "muted";
	if (v.includes("từ chối") || v.includes("hủy")) tone = "danger";
	else if (v.includes("chờ") || v.includes("nháp") || v.includes("chưa") || v.includes("cần làm")) tone = "warn";
	else if (v.includes("đang làm") || v.includes("giải ngân") || v.includes("mở l/c") || v.includes("tan ca")) tone = "accent";
	else if (v.includes("xong") || v.includes("đã duyệt") || v.includes("làm việc") || v.includes("vào ca") || v.includes("hạn mức")) tone = "ok";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone,
		children: value.replace(/^⭕\s*/, "")
	});
}
//#endregion
export { StatusBadge as t };
