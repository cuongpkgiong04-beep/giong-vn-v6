import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useCurrentUser } from "./router-DS2KYuON.mjs";
import { t as Button } from "./button-Ca7WG74o.mjs";
import { t as Input } from "./input-B4p5-Q-u.mjs";
import { t as Label } from "./label-BUq_BvRJ.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D75-wYbG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/change-password-wvbwnjbO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Server function for changing password
*/
/**
* Change password - requires current password verification
*/
var changePassword = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("662fec499574d55d1b8072d3d530e0434af959dddb0a36e24b5a767e08b24cb1"));
function ChangePassword() {
	const user = useCurrentUser();
	const [currentPassword, setCurrentPassword] = (0, import_react.useState)("");
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-[calc(100vh-6rem)] place-items-center px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "Vui lòng đăng nhập để đổi mật khẩu"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					children: "Đăng nhập"
				})
			})]
		})
	});
	async function handleSubmit(e) {
		e.preventDefault();
		if (newPassword !== confirmPassword) {
			toast.error("Mật khẩu mới không khớp");
			return;
		}
		if (newPassword.length < 8) {
			toast.error("Mật khẩu mới phải có ít nhất 8 ký tự");
			return;
		}
		setLoading(true);
		try {
			await changePassword({ data: {
				currentPassword,
				newPassword
			} });
			toast.success("Đổi mật khẩu thành công!");
			setCurrentPassword("");
			setNewPassword("");
			setConfirmPassword("");
		} catch (err) {
			toast.error(err?.message ?? "Đổi mật khẩu thất bại");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-[calc(100vh-6rem)] place-items-center px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.2em] text-accent",
							children: "GIONG VN"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-semibold text-ink",
							children: "Đổi mật khẩu"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Nhập mật khẩu hiện tại và mật khẩu mới để thay đổi."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "currentPassword",
							children: "Mật khẩu hiện tại"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "currentPassword",
							type: "password",
							value: currentPassword,
							onChange: (e) => setCurrentPassword(e.target.value),
							placeholder: "Nhập mật khẩu hiện tại",
							className: "mt-1",
							required: true,
							minLength: 8
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "newPassword",
							children: "Mật khẩu mới"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "newPassword",
							type: "password",
							value: newPassword,
							onChange: (e) => setNewPassword(e.target.value),
							placeholder: "Ít nhất 8 ký tự",
							className: "mt-1",
							required: true,
							minLength: 8
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "confirmPassword",
							children: "Xác nhận mật khẩu mới"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "confirmPassword",
							type: "password",
							value: confirmPassword,
							onChange: (e) => setConfirmPassword(e.target.value),
							placeholder: "Nhập lại mật khẩu mới",
							className: "mt-1",
							required: true,
							minLength: 8
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full",
							disabled: loading,
							children: loading ? "Đang xử lý..." : "Đổi mật khẩu"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 text-center text-sm text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-accent hover:underline",
						children: "Quay lại trang chủ"
					})
				})
			]
		})
	});
}
//#endregion
export { ChangePassword as component };
