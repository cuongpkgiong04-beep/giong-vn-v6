import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Button } from "./button-Ca7WG74o.mjs";
import { t as Input } from "./input-B4p5-Q-u.mjs";
import { t as Label } from "./label-BUq_BvRJ.mjs";
import { t as Card } from "./card-D89Flo6c.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D75-wYbG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forgot-password-CMMQaEr9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Server function for password reset using createServerFn
*/
/**
* Generate a random temporary password
*/
/**
* Hash password using scrypt (same as Better Auth)
*/
/**
* Send password reset - generates temporary password
*/
var sendPasswordReset = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("222c224a39e1886e9917b5cc1b07475326f45acc594b02846a472db067fb3f9b"));
function ForgotPassword() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [sent, setSent] = (0, import_react.useState)(false);
	const [tempPassword, setTempPassword] = (0, import_react.useState)("");
	async function handleSubmit(e) {
		e.preventDefault();
		if (!email.trim()) return;
		setLoading(true);
		try {
			const result = await sendPasswordReset({ data: { email: email.trim() } });
			setSent(true);
			setTempPassword(result.tempPassword);
			toast.success("Đã tạo mật khẩu mới thành công!");
		} catch (err) {
			toast.error(err?.message ?? "Không tìm thấy tài khoản với email này");
		} finally {
			setLoading(false);
		}
	}
	if (sent) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-[calc(100vh-6rem)] place-items-center px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 space-y-3 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.2em] text-accent",
							children: "GIONG VN"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-semibold text-ink",
							children: "Mật khẩu mới đã được tạo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Vui lòng sử dụng mật khẩu bên dưới để đăng nhập. Bạn nên đổi mật khẩu ngay sau khi đăng nhập."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "mb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Mật khẩu tạm thời:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-lg font-bold text-accent bg-accent-soft p-3 rounded-lg text-center select-all cursor-pointer",
								onClick: () => {
									navigator.clipboard.writeText(tempPassword);
									toast.success("Đã copy mật khẩu!");
								},
								children: tempPassword
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted text-center",
								children: "Nhấn vào mật khẩu để copy"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full",
							children: "Đăng nhập ngay"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-sm text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "text-accent hover:underline",
							children: "Quay lại trang đăng nhập"
						})
					})]
				})
			]
		})
	});
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
							children: "Quên mật khẩu"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Nhập email đã đăng ký để nhận mật khẩu mới. Mật khẩu tạm thời sẽ được hiển thị trên màn hình."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "email",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "email",
						type: "email",
						value: email,
						onChange: (e) => setEmail(e.target.value),
						placeholder: "email@congty.vn",
						className: "mt-1",
						required: true
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						disabled: loading,
						children: loading ? "Đang xử lý..." : "Gửi mật khẩu mới"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 text-center text-sm text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "text-accent hover:underline",
						children: "Quay lại trang đăng nhập"
					})
				})
			]
		})
	});
}
//#endregion
export { ForgotPassword as component };
