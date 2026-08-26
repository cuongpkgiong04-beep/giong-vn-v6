import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as EyeOff, S as Eye } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { b as authClient, i as GROK_PROVIDERS, x as signIn } from "./router-DS2KYuON.mjs";
import { t as Button } from "./button-Ca7WG74o.mjs";
import { t as Input } from "./input-B4p5-Q-u.mjs";
import { t as Label } from "./label-BUq_BvRJ.mjs";
import { a as isEmailRejected, i as isEmailPending, n as createRegistrationRequest } from "./registrations-CoVONXEp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BJTEnwo4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var REMEMBER_KEY = "giong-vn-login-remember";
function Login() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [rememberMe, setRememberMe] = (0, import_react.useState)(false);
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [isSignUp, setIsSignUp] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const saved = window.localStorage.getItem(REMEMBER_KEY);
		if (!saved) return;
		try {
			const parsed = JSON.parse(saved);
			if (parsed.email) setEmail(parsed.email);
			if (parsed.password) {
				setPassword(parsed.password);
				setRememberMe(true);
			}
		} catch {
			window.localStorage.removeItem(REMEMBER_KEY);
		}
	}, []);
	function saveRememberedCredentials(nextRemember) {
		if (!nextRemember) {
			window.localStorage.removeItem(REMEMBER_KEY);
			return;
		}
		window.localStorage.setItem(REMEMBER_KEY, JSON.stringify({
			email: email.trim(),
			password
		}));
	}
	async function handleEmailAuth(e) {
		e.preventDefault();
		if (!email.trim() || !password.trim()) return;
		setLoading(true);
		try {
			if (isSignUp) {
				if (await isEmailPending(email.trim())) {
					toast.error("Email này đã có yêu cầu đăng ký đang chờ duyệt");
					return;
				}
				if (await isEmailRejected(email.trim())) {
					toast.error("Email này đã bị từ chối đăng ký");
					return;
				}
				await createRegistrationRequest({
					name: name.trim() || email.trim().split("@")[0],
					email: email.trim(),
					password
				});
				toast.success("Đăng ký thành công! Yêu cầu của bạn đang chờ quản trị viên duyệt.");
				setIsSignUp(false);
				setEmail("");
				setPassword("");
				setName("");
				return;
			} else {
				const { error } = await authClient.signIn.email({
					email: email.trim(),
					password
				});
				if (error) {
					toast.error(error.message ?? "Sai email hoặc mật khẩu");
					return;
				}
				saveRememberedCredentials(rememberMe);
				window.location.href = "/";
			}
		} catch (err) {
			toast.error(err?.message ?? "Lỗi không xác định");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-[calc(100vh-6rem)] place-items-center px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-[0.2em] text-accent",
						children: "GIONG VN"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-semibold text-ink",
						children: isSignUp ? "Tạo tài khoản" : "Đăng nhập hệ thống"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: isSignUp ? "Đăng ký tài khoản mới để truy cập hệ thống." : "Sử dụng email và mật khẩu để truy cập chấm công, nhân sự, kho, quỹ và các module vận hành."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleEmailAuth,
					className: "space-y-4",
					children: [
						isSignUp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "name",
							children: "Họ và tên"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "name",
							type: "text",
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "Nguyễn Văn A",
							className: "mt-1"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
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
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "password",
							children: "Mật khẩu"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "password",
								type: showPassword ? "text" : "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: "Ít nhất 8 ký tự",
								className: "pr-11",
								required: true,
								minLength: 8
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu",
								onClick: () => setShowPassword((prev) => !prev),
								className: "absolute top-1/2 right-3 flex -translate-y-1/2 items-center justify-center text-muted transition hover:text-ink",
								children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
							})]
						})] }),
						!isSignUp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex cursor-pointer items-center gap-2 text-sm text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: rememberMe,
									onChange: (e) => {
										const nextValue = e.target.checked;
										setRememberMe(nextValue);
										if (!nextValue) window.localStorage.removeItem(REMEMBER_KEY);
										else saveRememberedCredentials(true);
									},
									className: "h-4 w-4 rounded border-line text-accent focus:ring-accent"
								}), "Ghi nhớ mật khẩu"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/forgot-password",
								className: "text-sm text-accent hover:underline",
								children: "Quên mật khẩu?"
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full",
							disabled: loading,
							children: loading ? "Đang xử lý..." : isSignUp ? "Đăng ký" : "Đăng nhập"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "my-4 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-line" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-faint",
							children: "hoặc"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-line" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: GROK_PROVIDERS.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => signIn(provider.providerId, { callbackURL: "/" }),
						className: "flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border border-line bg-surface-2 px-4 py-3 text-sm font-medium text-ink transition hover:border-accent/40 hover:bg-accent-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-8 items-center justify-center rounded-full bg-forest-fg/10 text-xs font-bold text-accent",
								children: provider.label.slice(0, 1).toUpperCase()
							}),
							"Tiếp tục với ",
							provider.label
						]
					}, provider.providerId))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-5 text-center text-sm text-muted",
					children: [
						isSignUp ? "Đã có tài khoản?" : "Chưa có tài khoản?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setIsSignUp(!isSignUp);
								setEmail("");
								setPassword("");
								setName("");
								if (!isSignUp) {
									setRememberMe(false);
									window.localStorage.removeItem(REMEMBER_KEY);
								}
							},
							className: "font-medium text-accent hover:underline",
							children: isSignUp ? "Đăng nhập" : "Đăng ký ngay"
						})
					]
				})
			] })]
		})
	});
}
//#endregion
export { Login as component };
