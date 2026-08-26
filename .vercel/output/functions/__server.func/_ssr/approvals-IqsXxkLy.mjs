import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { I as getEmployeeByEmail, r as useCurrentUser, z as isAdminRole } from "./router-DS2KYuON.mjs";
import { t as Button } from "./button-Ca7WG74o.mjs";
import { t as Input } from "./input-B4p5-Q-u.mjs";
import { t as Label } from "./label-BUq_BvRJ.mjs";
import { i as CardTitle, n as CardDesc, r as CardHeader, t as Card } from "./card-D89Flo6c.mjs";
import { t as Badge } from "./badge-Xx5N9e8p.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogDesc, t as Dialog } from "./dialog-B0OJARcv.mjs";
import { o as rejectRegistration, r as getAllRegistrationRequests, t as approveRegistration } from "./registrations-CoVONXEp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/approvals-IqsXxkLy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Server functions for managing registration requests.
* Only admins can access these endpoints.
*/
/**
* Check if current user is admin
*/
function getCurrentAdmin() {
	return {
		email: "cuongpk.giong04@gmail.com",
		name: "Phạm Kiên Cường"
	};
}
/**
* Get all registration requests (admin only)
*/
async function getRegistrationRequests() {
	const admin = getCurrentAdmin();
	if (!admin) throw new Error("Unauthorized - Admin access required");
	const employee = getEmployeeByEmail(admin.email);
	if (!employee || !isAdminRole(employee.role)) throw new Error("Unauthorized - Admin access required");
	return getAllRegistrationRequests();
}
/**
* Approve a registration request (admin only)
*/
async function approveRegistrationRequest(data) {
	const admin = getCurrentAdmin();
	if (!admin) throw new Error("Unauthorized - Admin access required");
	const employee = getEmployeeByEmail(admin.email);
	if (!employee || !isAdminRole(employee.role)) throw new Error("Unauthorized - Admin access required");
	const request = approveRegistration(data.requestId, admin.name);
	if (!request) throw new Error("Registration request not found");
	return request;
}
/**
* Reject a registration request (admin only)
*/
async function rejectRegistrationRequest(data) {
	const admin = getCurrentAdmin();
	if (!admin) throw new Error("Unauthorized - Admin access required");
	const employee = getEmployeeByEmail(admin.email);
	if (!employee || !isAdminRole(employee.role)) throw new Error("Unauthorized - Admin access required");
	const request = rejectRegistration(data.requestId, admin.name, data.reason);
	if (!request) throw new Error("Registration request not found");
	return request;
}
function AdminApprovals() {
	const user = useCurrentUser();
	const [requests, setRequests] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selectedRequest, setSelectedRequest] = (0, import_react.useState)(null);
	const [rejectDialogOpen, setRejectDialogOpen] = (0, import_react.useState)(false);
	const [rejectReason, setRejectReason] = (0, import_react.useState)("");
	const [processing, setProcessing] = (0, import_react.useState)(false);
	const employee = user ? getEmployeeByEmail(user.primaryEmail ?? "") : null;
	const isAdmin = employee ? isAdminRole(employee.role) : false;
	if (!user || !isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	(0, import_react.useEffect)(() => {
		loadRequests();
	}, []);
	async function loadRequests() {
		try {
			setLoading(true);
			const data = await getRegistrationRequests();
			setRequests(data);
		} catch (error) {
			toast.error("Không thể tải danh sách đăng ký");
		} finally {
			setLoading(false);
		}
	}
	async function handleApprove(request) {
		try {
			setProcessing(true);
			await approveRegistrationRequest({ requestId: request.id });
			toast.success(`Đã duyệt đăng ký cho ${request.name}`);
			await loadRequests();
		} catch (error) {
			toast.error("Lỗi khi duyệt đăng ký");
		} finally {
			setProcessing(false);
		}
	}
	async function handleReject() {
		if (!selectedRequest) return;
		try {
			setProcessing(true);
			await rejectRegistrationRequest({
				requestId: selectedRequest.id,
				reason: rejectReason || void 0
			});
			toast.success(`Đã từ chối đăng ký của ${selectedRequest.name}`);
			setRejectDialogOpen(false);
			setSelectedRequest(null);
			setRejectReason("");
			await loadRequests();
		} catch (error) {
			toast.error("Lỗi khi từ chối đăng ký");
		} finally {
			setProcessing(false);
		}
	}
	function getStatusBadge(status) {
		switch (status) {
			case "pending": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				tone: "warn",
				children: "Chờ duyệt"
			});
			case "approved": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				tone: "ok",
				children: "Đã duyệt"
			});
			case "rejected": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				tone: "danger",
				children: "Từ chối"
			});
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: status });
		}
	}
	function formatDate(dateString) {
		return new Date(dateString).toLocaleDateString("vi-VN", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		});
	}
	const pendingCount = requests.filter((r) => r.status === "pending").length;
	const approvedCount = requests.filter((r) => r.status === "approved").length;
	const rejectedCount = requests.filter((r) => r.status === "rejected").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "container mx-auto py-6 px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-ink",
					children: "Quản lý đăng ký"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted",
					children: "Duyệt hoặc từ chối yêu cầu đăng ký tài khoản mới"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						className: "pb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-sm font-medium text-muted",
							children: "Chờ duyệt"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-2xl font-bold text-yellow-600",
						children: pendingCount
					}) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						className: "pb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-sm font-medium text-muted",
							children: "Đã duyệt"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-2xl font-bold text-green-600",
						children: approvedCount
					}) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
						className: "pb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-sm font-medium text-muted",
							children: "Từ chối"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-2xl font-bold text-red-600",
						children: rejectedCount
					}) })] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Danh sách yêu cầu" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: loading ? "Đang tải..." : `Tổng cộng ${requests.length} yêu cầu` })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center py-8 text-muted",
				children: "Đang tải dữ liệu..."
			}) : requests.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center py-8 text-muted",
				children: "Chưa có yêu cầu đăng ký nào"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left py-3 px-4 font-medium text-muted",
								children: "Họ tên"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left py-3 px-4 font-medium text-muted",
								children: "Email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left py-3 px-4 font-medium text-muted",
								children: "Phòng ban"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left py-3 px-4 font-medium text-muted",
								children: "Trung tâm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left py-3 px-4 font-medium text-muted",
								children: "Trạng thái"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left py-3 px-4 font-medium text-muted",
								children: "Ngày yêu cầu"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-right py-3 px-4 font-medium text-muted",
								children: "Thao tác"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: requests.map((request) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line hover:bg-surface-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 px-4 font-medium",
								children: request.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 px-4",
								children: request.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 px-4",
								children: request.department || "-"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 px-4",
								children: request.center || "-"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 px-4",
								children: getStatusBadge(request.status)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 px-4",
								children: formatDate(request.requestedAt)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-3 px-4 text-right",
								children: [
									request.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2 justify-end",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "outline",
											className: "text-green-600 hover:bg-green-50",
											onClick: () => handleApprove(request),
											disabled: processing,
											children: "Duyệt"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "outline",
											className: "text-red-600 hover:bg-red-50",
											onClick: () => {
												setSelectedRequest(request);
												setRejectDialogOpen(true);
											},
											disabled: processing,
											children: "Từ chối"
										})]
									}),
									request.status === "approved" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm text-muted",
										children: ["Duyệt bởi ", request.reviewedBy]
									}),
									request.status === "rejected" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm text-muted",
										children: [
											"Từ chối bởi ",
											request.reviewedBy,
											request.rejectionReason && `: ${request.rejectionReason}`
										]
									})
								]
							})
						]
					}, request.id)) })]
				})
			}) })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: rejectDialogOpen,
				onOpenChange: setRejectDialogOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Từ chối đăng ký" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDesc, { children: [
						"Bạn có chắc chắn muốn từ chối đăng ký của",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selectedRequest?.name }),
						"?"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4 mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "rejectReason",
							children: "Lý do từ chối (tùy chọn)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "rejectReason",
							value: rejectReason,
							onChange: (e) => setRejectReason(e.target.value),
							placeholder: "Nhập lý do từ chối...",
							className: "mt-1"
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3 justify-end mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => {
								setRejectDialogOpen(false);
								setSelectedRequest(null);
								setRejectReason("");
							},
							disabled: processing,
							children: "Hủy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "danger",
							onClick: handleReject,
							disabled: processing,
							children: processing ? "Đang xử lý..." : "Từ chối"
						})]
					})
				] })
			})
		]
	});
}
//#endregion
export { AdminApprovals as component };
