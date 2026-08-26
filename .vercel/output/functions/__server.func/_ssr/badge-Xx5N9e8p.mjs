import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { S as cn } from "./router-DS2KYuON.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-Xx5N9e8p.js
var import_jsx_runtime = require_jsx_runtime();
var tones = {
	muted: "bg-surface-2 text-muted",
	accent: "bg-accent-soft text-accent",
	ok: "bg-ok-soft text-ok",
	warn: "bg-warn-soft text-warn",
	danger: "bg-danger-soft text-danger",
	forest: "bg-forest text-forest-fg"
};
function Badge({ className, tone = "muted", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", tones[tone], className),
		...props
	});
}
//#endregion
export { Badge as t };
