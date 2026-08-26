import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-only-BOolG_8s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClientOnly({ children, fallback }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	if (!ready) return fallback ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-56 animate-pulse rounded-lg bg-surface-2",
		"aria-hidden": true
	});
	return children;
}
//#endregion
export { ClientOnly as t };
