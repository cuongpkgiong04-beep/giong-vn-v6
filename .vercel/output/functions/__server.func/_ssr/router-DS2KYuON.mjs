import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as __exportAll } from "./ssr.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { $t as createFetch, At as union, Bt as getAuthTables, C as decodeProtectedHeader, Ct as literal, Dt as optional, Et as object, Ft as ATTR_CONTEXT, Gt as getBetterAuthVersion, Ht as queueAfterTransactionHook, It as ATTR_HOOK_TYPE, J as encode, Jt as generateId, Kt as initGetModelName, Lt as ATTR_OPERATION_ID, Ot as record, Pt as withSpan, Rt as import_src, S as base64Url, St as email, T as jwtVerify, Tt as number, Ut as runWithAdapter, Vt as getCurrentAdapter, Wt as runWithTransaction, Xt as capitalizeFirstLetter, Yt as createRandomStringGenerator, Zt as toKebabCase, _ as toResponse, a as findInvalidTrustedProxies, an as BASE_ERROR_CODES, b as filterOutputFields, bt as array, c as createAuthEndpoint, cn as shouldPublishLog, d as defineRequestState, en as isSafeUrlScheme, f as hasRequestState, g as createRouter$1, h as runWithEndpointContext, hn as isTest, i as createRateLimitKey, in as kAPIErrorHeaderSymbol, kt as string, l as createAuthMiddleware, m as getCurrentAuthContext, mn as isProduction, n as socialProviders, nn as APIError, o as getIp, on as createLogger, ot as JWTExpired, p as runWithRequestState, pn as isDevelopment, qt as initGetFieldName, r as isLoopbackHost, rn as BetterAuthError, s as deprecate, sn as logger, t as SocialProviderListEnum, tn as normalizePathname, u as isAPIError, un as env, v as serializeCookie, w as importJWK, wt as looseObject, xt as boolean, y as serializeSignedCookie, yt as any, zt as safeJSONParse } from "../_libs/@better-auth/core+[...].mjs";
import { a as atom, i as onSet, n as STORE_UNMOUNT_DELAY, r as onMount, t as listenKeys } from "../_libs/nanostores.mjs";
import { n as defu, t as createDefu } from "../_libs/defu.mjs";
import { n as getPglite, t as ensureDbReady } from "./db-C3y0nZQW.mjs";
import { a as PostgresIntrospector, c as sql, i as PostgresAdapter, n as getKyselyDatabaseType, o as PostgresQueryCompiler, s as CompiledQuery, t as createKyselyAdapter } from "../_libs/@better-auth/kysely-adapter+[...].mjs";
import { D as Building2, O as BookOpen, T as ChartColumn, b as FolderOpen, c as ShieldCheck, f as Package, h as MapPin, i as TriangleAlert, k as Bell, m as Menu, n as Wallet, o as Timer, p as MessageSquare, r as Users, s as StickyNote, t as X, u as Search, v as LayoutDashboard, w as ClipboardList, x as FileText, y as Landmark } from "../_libs/lucide-react.mjs";
import { n as string$1, t as boolean$1 } from "../_libs/zod.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as hkdf, t as sha256 } from "../_libs/noble__hashes.mjs";
import { i as jwtDecrypt, n as EncryptJWT, r as SignJWT, t as calculateJwkThumbprint } from "../_libs/jose.mjs";
import { i as verifyPassword, n as binary, r as hashPassword, t as createHMAC } from "../_libs/better-auth__utils.mjs";
import { n as createHash, t as createTelemetry } from "../_libs/@better-auth/telemetry+[...].mjs";
import { a as utf8ToBytes, i as managedNonce, n as bytesToHex, r as hexToBytes, t as xchacha20poly1305 } from "../_libs/noble__ciphers.mjs";
import { t as Pool } from "../_libs/pg.mjs";
import { randomBytes } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-CwLOfGrp.js
var SUPPORT_PHONE = "0904 07 57 57";
var SUPPORT_ALT = "0948 80 96 96";
var CENTERS = [
	{
		code: "VP",
		name: "Văn phòng Công ty Gióng Việt Nam",
		short: "Văn phòng",
		city: "Long Biên, Hà Nội",
		kind: "Văn phòng"
	},
	{
		code: "LB",
		name: "Trung tâm tiêm chủng Gióng Long Biên",
		short: "Long Biên",
		city: "Long Biên, Hà Nội",
		kind: "Trung tâm"
	},
	{
		code: "SĐ",
		name: "Trung tâm tiêm chủng Gióng Sài Đồng",
		short: "Sài Đồng",
		city: "Long Biên, Hà Nội",
		kind: "Trung tâm"
	},
	{
		code: "NL",
		name: "Trung tâm tiêm chủng Gióng Ngọc Lâm",
		short: "Ngọc Lâm",
		city: "Long Biên, Hà Nội",
		kind: "Trung tâm"
	},
	{
		code: "TO",
		name: "Trung tâm tiêm chủng Gióng Thanh Oai",
		short: "Thanh Oai",
		city: "Thanh Oai, Hà Nội",
		kind: "Trung tâm"
	},
	{
		code: "QO",
		name: "Trung tâm tiêm chủng Gióng Quốc Oai",
		short: "Quốc Oai",
		city: "Quốc Oai, Hà Nội",
		kind: "Trung tâm"
	},
	{
		code: "BH",
		name: "Trung tâm tiêm chủng Gióng Bích Hòa",
		short: "Bích Hòa",
		city: "Thanh Oai, Hà Nội",
		kind: "Trung tâm"
	},
	{
		code: "ML",
		name: "Trung tâm tiêm chủng Gióng Mê Linh",
		short: "Mê Linh",
		city: "Mê Linh, Hà Nội",
		kind: "Trung tâm"
	},
	{
		code: "TP",
		name: "Trung tâm tiêm chủng Gióng Tiền Phong",
		short: "Tiền Phong",
		city: "Mê Linh, Hà Nội",
		kind: "Trung tâm"
	},
	{
		code: "CĐ",
		name: "Trung tâm tiêm chủng Gióng Chi Đông",
		short: "Chi Đông",
		city: "Mê Linh, Hà Nội",
		kind: "Trung tâm"
	},
	{
		code: "TĐ",
		name: "Trung tâm tiêm chủng Gióng Thạch Đà",
		short: "Thạch Đà",
		city: "Mê Linh, Hà Nội",
		kind: "Trung tâm"
	},
	{
		code: "LM",
		name: "Trung tâm tiêm chủng Gióng Liên Mạc",
		short: "Liên Mạc",
		city: "Bắc Từ Liêm, Hà Nội",
		kind: "Trung tâm"
	},
	{
		code: "TA",
		name: "Trung tâm tiêm chủng Gióng Tâm An",
		short: "Tâm An",
		city: "Hà Nội",
		kind: "Trung tâm"
	},
	{
		code: "PY",
		name: "Trung tâm tiêm chủng Gióng Phúc Yên",
		short: "Phúc Yên",
		city: "Phúc Yên, Vĩnh Phúc",
		kind: "Trung tâm"
	},
	{
		code: "ĐX",
		name: "Trung tâm tiêm chủng Gióng Đồng Xuân",
		short: "Đồng Xuân",
		city: "Vĩnh Phúc",
		kind: "Trung tâm"
	},
	{
		code: "TS",
		name: "Trung tâm tiêm chủng Gióng Từ Sơn",
		short: "Từ Sơn",
		city: "Từ Sơn, Bắc Ninh",
		kind: "Trung tâm"
	},
	{
		code: "HM",
		name: "Trung tâm tiêm chủng Gióng Hương Mạc",
		short: "Hương Mạc",
		city: "Từ Sơn, Bắc Ninh",
		kind: "Trung tâm"
	},
	{
		code: "TD",
		name: "Trung tâm tiêm chủng Gióng Tiên Du",
		short: "Tiên Du",
		city: "Tiên Du, Bắc Ninh",
		kind: "Trung tâm"
	},
	{
		code: "ĐY",
		name: "Trung tâm tiêm chủng Gióng Đông Yên",
		short: "Đông Yên",
		city: "Bắc Ninh",
		kind: "Trung tâm"
	},
	{
		code: "TT",
		name: "Trung tâm tiêm chủng Gióng Thanh Thùy",
		short: "Thanh Thùy",
		city: "Hà Nội",
		kind: "Trung tâm"
	}
];
var CENTER_MAP = Object.fromEntries(CENTERS.map((c) => [c.code, c]));
function centerName(code) {
	return CENTER_MAP[code]?.short ?? code;
}
function getCenterByCode(code) {
	return CENTER_MAP[code] ?? null;
}
var EMPLOYEES = [
	{
		id: "U007",
		name: "Nguyễn Thị Thúy",
		username: "GĐ Thúy",
		gender: "Nữ",
		phone: "0902267486",
		email: "thuynvy218@gmail.com",
		dept: "Ban giám đốc",
		role: "Admin",
		title: "Giám đốc",
		center: "VP",
		status: "Đang làm việc"
	},
	{
		id: "U009",
		name: "Hoàng Minh Châu",
		username: "PGĐ_Châu HM",
		gender: "Nam",
		phone: "",
		email: "hoangminhchau2631960@gmail.com",
		dept: "Ban giám đốc",
		role: "Admin",
		title: "Phó giám đốc",
		center: "VP",
		status: "Đang làm việc"
	},
	{
		id: "U002",
		name: "Phạm Kiên Cường",
		username: "CườngPK",
		gender: "Nam",
		phone: "0904075757",
		email: "cuongpk.giong04@gmail.com",
		dept: "Quản lý",
		role: "Admin",
		title: "Quản trị hệ thống",
		center: "VP",
		status: "Đang làm việc"
	},
	{
		id: "U031",
		name: "Phạm Cường",
		username: "Cuongpk.Giong02",
		gender: "Nam",
		phone: "0904075757",
		email: "cuongpk.giong02@gmail.com",
		dept: "Hệ thống",
		role: "Admin",
		title: "Chuyên gia lập trình",
		center: "VP",
		status: "Đang làm việc"
	},
	{
		id: "U003",
		name: "Trần Mạnh Hùng",
		username: "Hùng TM",
		gender: "Nam",
		phone: "0826861379",
		email: "ketoangiongvina@gmail.com",
		dept: "Kế toán",
		role: "User",
		title: "Kế toán trưởng",
		center: "VP",
		status: "Đang làm việc"
	},
	{
		id: "U005",
		name: "Nguyễn Thị Mỹ Hạnh",
		username: "Hạnh NTM",
		gender: "Nữ",
		phone: "0327451134",
		email: "nguyenmyhanh2912@gmail.com",
		dept: "Hành chính - Nhân sự",
		role: "User",
		title: "Trưởng phòng HCNS",
		center: "VP",
		status: "Đang làm việc"
	},
	{
		id: "U004",
		name: "Trần Thị Anh Thương",
		username: "Thương TTA",
		gender: "Nữ",
		phone: "",
		email: "thuonggvn@gmail.com",
		dept: "Marketing",
		role: "User",
		title: "Nhân viên Marketing",
		center: "VP",
		status: "Đang làm việc"
	},
	{
		id: "U010",
		name: "Nguyễn Thị Hương",
		username: "Hương NT",
		gender: "Nữ",
		phone: "",
		email: "nguyenhuong.ts2311@gmail.com",
		dept: "Marketing",
		role: "User",
		title: "Trưởng phòng Marketing",
		center: "VP",
		status: "Đang làm việc"
	},
	{
		id: "U006",
		name: "Nguyễn Thị Dịu",
		username: "Dịu NT",
		gender: "Nữ",
		phone: "0388573597",
		email: "nguyendiuu1912@gmail.com",
		dept: "Kế toán",
		role: "User",
		title: "Kế toán viên",
		center: "VP",
		status: "Đang làm việc"
	},
	{
		id: "U030",
		name: "Trần Thị Thanh Thủy",
		username: "Thủy TTT",
		gender: "Nữ",
		phone: "",
		email: "tranthuy19750307@gmail.com",
		dept: "Kho",
		role: "User",
		title: "Thủ kho",
		center: "VP",
		status: "Đang làm việc"
	},
	{
		id: "U032",
		name: "Đinh Thị Hương Trà",
		username: "DsTra",
		gender: "Nữ",
		phone: "0327045684",
		email: "dinhthihuongtra19062002@gmail.com",
		dept: "Dược",
		role: "User",
		title: "Quản lý dược",
		center: "VP",
		status: "Đang làm việc"
	},
	{
		id: "U033",
		name: "Nguyễn Thành Hiếu",
		username: "Hiếu NT",
		gender: "Nam",
		phone: "0336365636",
		email: "hieubin2106@gmail.com",
		dept: "Hành chính - Nhân sự",
		role: "User",
		title: "Nhân viên HCNS",
		center: "VP",
		status: "Đang làm việc"
	},
	{
		id: "U008",
		name: "Nguyễn Thành Hiếu",
		username: "Hiếu NT 2",
		gender: "Nam",
		phone: "",
		email: "thanhhieu21061993@gmail.com",
		dept: "Hành chính - Nhân sự",
		role: "User",
		title: "Nhân viên",
		center: "VP",
		status: "Đang làm việc"
	},
	{
		id: "S01",
		name: "Lê Thị Bích",
		username: "Bích LT",
		gender: "Nữ",
		phone: "",
		email: "",
		dept: "Tiêm chủng",
		role: "User",
		title: "Điều dưỡng",
		center: "LB",
		status: "Đang làm việc"
	},
	{
		id: "S02",
		name: "Nguyễn Thị Tuyết Lan",
		username: "Lan NTT",
		gender: "Nữ",
		phone: "",
		email: "",
		dept: "Tiêm chủng",
		role: "User",
		title: "Điều dưỡng",
		center: "SĐ",
		status: "Đang làm việc"
	},
	{
		id: "S03",
		name: "Vương Thị Minh",
		username: "Minh VT",
		gender: "Nữ",
		phone: "",
		email: "",
		dept: "Thu ngân",
		role: "User",
		title: "Thu ngân",
		center: "NL",
		status: "Đang làm việc"
	},
	{
		id: "S04",
		name: "KIỀU MAI ANH",
		username: "Anh KM",
		gender: "Nữ",
		phone: "",
		email: "",
		dept: "Tiêm chủng",
		role: "User",
		title: "Điều dưỡng",
		center: "TS",
		status: "Đang làm việc"
	},
	{
		id: "S05",
		name: "Nguyễn Quỳnh Vân",
		username: "Vân NQ",
		gender: "Nữ",
		phone: "",
		email: "",
		dept: "Tiêm chủng",
		role: "User",
		title: "Điều dưỡng",
		center: "TĐ",
		status: "Đang làm việc"
	},
	{
		id: "S06",
		name: "Lê Thị Hằng",
		username: "Hằng LT",
		gender: "Nữ",
		phone: "",
		email: "",
		dept: "Thu ngân",
		role: "User",
		title: "Thu ngân",
		center: "CĐ",
		status: "Đang làm việc"
	},
	{
		id: "S07",
		name: "ĐINH THỊ YẾN",
		username: "Yến ĐT",
		gender: "Nữ",
		phone: "",
		email: "",
		dept: "Tiêm chủng",
		role: "User",
		title: "Điều dưỡng",
		center: "PY",
		status: "Đang làm việc"
	},
	{
		id: "S08",
		name: "Trần Thị Yến",
		username: "Yến TT",
		gender: "Nữ",
		phone: "",
		email: "",
		dept: "Tiêm chủng",
		role: "User",
		title: "Điều dưỡng",
		center: "ĐX",
		status: "Đang làm việc"
	},
	{
		id: "S09",
		name: "Lê Thị Dung",
		username: "Dung LT",
		gender: "Nữ",
		phone: "",
		email: "",
		dept: "Thu ngân",
		role: "User",
		title: "Thu ngân",
		center: "LM",
		status: "Đang làm việc"
	},
	{
		id: "S10",
		name: "Vũ Thị Ánh Ngọc",
		username: "Ngọc VTA",
		gender: "Nữ",
		phone: "",
		email: "",
		dept: "Tiêm chủng",
		role: "User",
		title: "Điều dưỡng",
		center: "TO",
		status: "Đang làm việc"
	},
	{
		id: "S11",
		name: "Nguyễn Nhật Phương",
		username: "Phương NN",
		gender: "Nữ",
		phone: "",
		email: "",
		dept: "Tiêm chủng",
		role: "User",
		title: "Điều dưỡng",
		center: "QO",
		status: "Đang làm việc"
	},
	{
		id: "S12",
		name: "Nguyễn Đức Năng",
		username: "Năng NĐ",
		gender: "Nam",
		phone: "",
		email: "",
		dept: "Hành chính",
		role: "User",
		title: "Nhân viên",
		center: "BH",
		status: "Đang làm việc"
	},
	{
		id: "S13",
		name: "Phạm Hồng Phong",
		username: "Phong PH",
		gender: "Nam",
		phone: "",
		email: "",
		dept: "Hành chính",
		role: "User",
		title: "Nhân viên",
		center: "ML",
		status: "Đang làm việc"
	},
	{
		id: "S14",
		name: "Lỗ Thị Hà",
		username: "Hà LT",
		gender: "Nữ",
		phone: "",
		email: "",
		dept: "Thu ngân",
		role: "User",
		title: "Thu ngân",
		center: "TP",
		status: "Đang làm việc"
	},
	{
		id: "S15",
		name: "Đặng Thị Mỹ Linh",
		username: "Linh ĐTM",
		gender: "Nữ",
		phone: "",
		email: "",
		dept: "Tiêm chủng",
		role: "User",
		title: "Điều dưỡng",
		center: "HM",
		status: "Đang làm việc"
	},
	{
		id: "S16",
		name: "Nguyễn Phú Đông",
		username: "Đông NP",
		gender: "Nam",
		phone: "",
		email: "",
		dept: "Hành chính",
		role: "User",
		title: "Nhân viên",
		center: "TD",
		status: "Đang làm việc"
	},
	{
		id: "S17",
		name: "Vũ Thị Thanh Huyền",
		username: "Huyền VTT",
		gender: "Nữ",
		phone: "",
		email: "",
		dept: "Tiêm chủng",
		role: "User",
		title: "Điều dưỡng",
		center: "ĐY",
		status: "Đang làm việc"
	},
	{
		id: "S18",
		name: "Trần Ngọc Anh",
		username: "Anh TN",
		gender: "Nữ",
		phone: "",
		email: "",
		dept: "Tiêm chủng",
		role: "User",
		title: "Điều dưỡng",
		center: "TT",
		status: "Đang làm việc"
	},
	{
		id: "S19",
		name: "Lương Thị Hà Trang",
		username: "Trang LTH",
		gender: "Nữ",
		phone: "",
		email: "",
		dept: "Thu ngân",
		role: "User",
		title: "Thu ngân",
		center: "TA",
		status: "Đang làm việc"
	},
	{
		id: "S20",
		name: "Khuất Thị Dung",
		username: "Dung KT",
		gender: "Nữ",
		phone: "",
		email: "",
		dept: "Tiêm chủng",
		role: "User",
		title: "Điều dưỡng",
		center: "LB",
		status: "Đang làm việc"
	}
];
var EMPLOYEE_MAP = Object.fromEntries(EMPLOYEES.map((e) => [e.id, e]));
var STAFF_BY_CENTER = Object.fromEntries(CENTERS.map((c) => [c.code, EMPLOYEES.filter((e) => e.center === c.code).length]));
function getEmployeeById(id) {
	return EMPLOYEE_MAP[id] ?? null;
}
function getEmployeeByEmail(email) {
	const value = (email ?? "").trim().toLowerCase();
	if (!value) return null;
	return EMPLOYEES.find((e) => (e.email ?? "").trim().toLowerCase() === value) ?? EMPLOYEES.find((e) => (e.username ?? "").trim().toLowerCase() === value) ?? null;
}
function normalizePersonKey(value) {
	return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim().toLowerCase();
}
function findEmployeeByLooseText(value) {
	const key = normalizePersonKey(value ?? "");
	if (!key) return null;
	return EMPLOYEES.find((e) => normalizePersonKey(e.name) === key) ?? EMPLOYEES.find((e) => normalizePersonKey(e.username) === key) ?? EMPLOYEES.find((e) => normalizePersonKey(e.email) === key) ?? EMPLOYEES.find((e) => normalizePersonKey(e.name).includes(key) || key.includes(normalizePersonKey(e.name))) ?? EMPLOYEES.find((e) => normalizePersonKey(e.username).includes(key) || key.includes(normalizePersonKey(e.username))) ?? null;
}
function isAdminRole(role) {
	const normalized = (role ?? "").trim().toLowerCase();
	return [
		"superadmin",
		"super_admin",
		"admin",
		"regional_manager",
		"center_manager"
	].includes(normalized);
}
function getVisibleCenterCodes(actor) {
	if (!actor) return [];
	if (isAdminRole(actor.role)) return CENTERS.map((center) => center.code);
	return [actor.center];
}
var CURRENT_USER_ID = "U002";
var CASH_SEED = [
	{
		id: "Q001",
		type: "Thu",
		date: "2026-08-22",
		amount: 485e5,
		content: "Doanh thu tiêm chủng ngày 22/08 — Long Biên",
		center: "LB",
		person: "Vương Thị Minh",
		method: "Tiền mặt",
		status: "Đã duyệt"
	},
	{
		id: "Q002",
		type: "Thu",
		date: "2026-08-22",
		amount: 392e5,
		content: "Doanh thu tiêm chủng ngày 22/08 — Ngọc Lâm",
		center: "NL",
		person: "Lê Thị Dung",
		method: "Chuyển khoản",
		status: "Đã duyệt"
	},
	{
		id: "Q003",
		type: "Thu",
		date: "2026-08-23",
		amount: 518e5,
		content: "Doanh thu tiêm chủng ngày 23/08 — Từ Sơn",
		center: "TS",
		person: "KIỀU MAI ANH",
		method: "Tiền mặt",
		status: "Đã duyệt"
	},
	{
		id: "Q004",
		type: "Chi",
		date: "2026-08-23",
		amount: 126e6,
		content: "Thanh toán nhà cung cấp vắc xin Sanofi — đợt 8",
		center: "VP",
		person: "Trần Mạnh Hùng",
		method: "Chuyển khoản",
		status: "Đã duyệt"
	},
	{
		id: "Q005",
		type: "Chi",
		date: "2026-08-24",
		amount: 185e5,
		content: "Chi phí vận hành, điện lạnh kho vắc xin VP",
		center: "VP",
		person: "Trần Thị Thanh Thủy",
		method: "Chuyển khoản",
		status: "Đã duyệt"
	},
	{
		id: "Q006",
		type: "Thu",
		date: "2026-08-24",
		amount: 274e5,
		content: "Doanh thu tiêm chủng ngày 24/08 — Sài Đồng",
		center: "SĐ",
		person: "Nguyễn Thị Tuyết Lan",
		method: "Tiền mặt",
		status: "Đã duyệt"
	},
	{
		id: "Q007",
		type: "Chi",
		date: "2026-08-24",
		amount: 82e5,
		content: "Chi lương tăng ca tuần 34 — khối tiêm chủng",
		center: "VP",
		person: "Nguyễn Thị Mỹ Hạnh",
		method: "Chuyển khoản",
		status: "Chờ duyệt"
	},
	{
		id: "Q008",
		type: "Thu",
		date: "2026-08-25",
		amount: 331e5,
		content: "Doanh thu tiêm chủng sáng 25/08 — Long Biên",
		center: "LB",
		person: "Vương Thị Minh",
		method: "Tiền mặt",
		status: "Nháp"
	},
	{
		id: "Q009",
		type: "Chi",
		date: "2026-08-25",
		amount: 45e5,
		content: "Chi xăng xe điều chuyển vắc xin VP → Chi Đông",
		center: "VP",
		person: "Trần Thị Thanh Thủy",
		method: "Tiền mặt",
		status: "Đã duyệt"
	},
	{
		id: "Q010",
		type: "Chi",
		date: "2026-08-21",
		amount: 72e6,
		content: "Tạm ứng lương khối văn phòng tháng 8",
		center: "VP",
		person: "Trần Mạnh Hùng",
		method: "Chuyển khoản",
		status: "Đã duyệt"
	}
];
var PROPOSAL_SEED = [
	{
		id: "DN01",
		kind: "Nhân sự",
		title: "Xin nghỉ phép 26–27/08",
		requester: "Nguyễn Thị Dịu",
		date: "2026-08-24",
		detail: "Nghỉ phép năm, đã bàn giao sổ quỹ cho chị Hạnh.",
		dept: "Kế toán",
		status: "Chờ duyệt"
	},
	{
		id: "DN02",
		kind: "Nhập xuất",
		title: "Đề nghị nhập Hexaxim 200 liều",
		requester: "Trần Thị Thanh Thủy",
		date: "2026-08-23",
		detail: "Tồn kho Hexaxim tại NL, LB, TS đang thấp hơn định mức tuần.",
		dept: "Kho",
		status: "Chờ duyệt"
	},
	{
		id: "DN03",
		kind: "Thu chi",
		title: "Thanh toán GSK đợt 7 — Bexsero",
		requester: "Trần Mạnh Hùng",
		date: "2026-08-22",
		detail: "Hóa đơn 312 triệu, hạn thanh toán 28/08.",
		dept: "Kế toán",
		status: "Đã duyệt"
	},
	{
		id: "DN04",
		kind: "Nhân sự",
		title: "Đăng ký tăng ca Chủ nhật 30/08",
		requester: "Lê Thị Bích",
		date: "2026-08-24",
		detail: "Ca tiêm dịch vụ Hexaxim + Gardasil 9 tại Long Biên, 8 người.",
		dept: "Tiêm chủng",
		status: "Chờ duyệt"
	},
	{
		id: "DN05",
		kind: "Góp ý",
		title: "Bổ sung máy phát điện kho lạnh Sài Đồng",
		requester: "Nguyễn Thị Tuyết Lan",
		date: "2026-08-20",
		detail: "Cúp điện 2 lần tuần trước, nhiệt độ kho sát ngưỡng.",
		dept: "Tiêm chủng",
		status: "Đã duyệt"
	},
	{
		id: "DN06",
		kind: "Thu chi",
		title: "Chi phí sửa điều hòa kho VP",
		requester: "Trần Thị Thanh Thủy",
		date: "2026-08-19",
		detail: "Báo giá 6,8 triệu — cần duyệt trước thứ sáu.",
		dept: "Kho",
		status: "Từ chối"
	},
	{
		id: "DN07",
		kind: "Nhập xuất",
		title: "Điều chuyển MenQuadfi 40 liều VP → Phúc Yên",
		requester: "Đinh Thị Hương Trà",
		date: "2026-08-25",
		detail: "PY hết lô gần hạn, cần bù từ kho tổng.",
		dept: "Dược",
		status: "Chờ duyệt"
	},
	{
		id: "DN08",
		kind: "Nhân sự",
		title: "Tuyển 2 điều dưỡng cho Từ Sơn",
		requester: "Nguyễn Thị Mỹ Hạnh",
		date: "2026-08-18",
		detail: "Ca sáng thiếu người từ tháng 7, đề xuất hợp đồng thử việc 2 tháng.",
		dept: "Hành chính - Nhân sự",
		status: "Đã duyệt"
	}
];
var CREDIT_SEED = [
	{
		id: "TD1",
		bank: "VietinBank — CN Long Biên",
		type: "Vay vốn lưu động",
		limit: 8e9,
		outstanding: 525e7,
		due: "2026-12-15",
		status: "Đang giải ngân"
	},
	{
		id: "TD2",
		bank: "Vietcombank — CN Hà Nội",
		type: "Thấu chi tài khoản",
		limit: 2e9,
		outstanding: 42e7,
		due: "2026-09-30",
		status: "Hạn mức còn"
	},
	{
		id: "TD3",
		bank: "MB Bank",
		type: "L/C nhập khẩu vắc xin",
		limit: 35e8,
		outstanding: 118e7,
		due: "2026-10-20",
		status: "Đang mở L/C"
	}
];
var COLLATERAL_SEED = [
	{
		id: "TS1",
		name: "Nhà VP 8/61 Nguyễn Sơn, Bồ Đề",
		type: "Bất động sản",
		value: 125e8,
		location: "Long Biên, Hà Nội",
		status: "Thế chấp VietinBank"
	},
	{
		id: "TS2",
		name: "Hệ thống kho lạnh 19 trung tâm",
		type: "Máy móc thiết bị",
		value: 48e8,
		location: "Toàn hệ thống",
		status: "Thế chấp MB"
	},
	{
		id: "TS3",
		name: "Xe tải đông lạnh 2.5 tấn",
		type: "Phương tiện",
		value: 98e7,
		location: "Văn phòng",
		status: "Sở hữu"
	},
	{
		id: "TS4",
		name: "Phần mềm & dữ liệu vận hành",
		type: "Tài sản vô hình",
		value: 35e7,
		location: "Hệ thống",
		status: "Sở hữu"
	}
];
var CHAT_SEED = [
	{
		id: "m1",
		from: "Thủy TTT",
		text: "Sáng nay điều 40 liều MenQuadfi sang Phúc Yên, xe xuất lúc 7h15.",
		at: "2026-08-25 07:22",
		channel: "Kho"
	},
	{
		id: "m2",
		from: "Hạnh NTM",
		text: "Nhắc cả nhà chấm công vào ca trước 8h. Cuối tháng khóa công ngày 31.",
		at: "2026-08-25 07:41",
		channel: "Chung"
	},
	{
		id: "m3",
		from: "Hùng TM",
		text: "Hạn thanh toán GSK 28/08. Ai giữ hóa đơn gốc gửi về kế toán giúp.",
		at: "2026-08-25 09:05",
		channel: "Kế toán"
	},
	{
		id: "m4",
		from: "CườngPK",
		text: "Dashboard GIONG VN bản mới đã lên. Mọi người vào thử chấm công và lập nhiệm vụ trên đây.",
		at: "2026-08-25 10:18",
		channel: "Chung"
	},
	{
		id: "m5",
		from: "DsTra",
		text: "Hexaxim lô X3C222V tại Đông Yên còn 10, hạn 31/05 — ưu tiên dùng trước.",
		at: "2026-08-25 11:02",
		channel: "Dược"
	},
	{
		id: "m6",
		from: "Thương TTA",
		text: "Fanpage Long Biên cần 3 ảnh ca tiêm chiều nay cho bài Gardasil 9.",
		at: "2026-08-25 13:40",
		channel: "Marketing"
	}
];
var GUIDES = [
	{
		id: "GT001",
		title: "Giới thiệu phần mềm",
		body: "GIONG VN là hệ thống điều hành chuỗi trung tâm tiêm chủng Gióng Việt Nam — dùng được trên máy tính, trình duyệt, iPhone và Android. Ứng dụng thay thế bộ AppSheet rời, gom chấm công, kho vắc xin, quỹ tiền, nhiệm vụ và đề nghị về một dashboard."
	},
	{
		id: "GT003",
		title: "Đăng ký và phân quyền",
		body: "Nhân sự mới nhận link hoặc mã QR, chọn máy tính hoặc điện thoại rồi đăng ký. Nhân sự cũ dùng tài khoản đã cấp. SuperAdmin quản trị hệ thống, Admin là ban giám đốc, User là các phòng ban: kế toán, tài chính, kinh doanh, pháp chế, HCNS, marketing."
	},
	{
		id: "GT004",
		title: "Chấm công hàng ngày",
		body: "Vào ca lúc bắt đầu làm việc, tan ca khi xong việc. Cần ảnh chân dung và định vị. Mỗi ngày chỉ hai lần: vào và ra. Nghỉ, đi muộn, về sớm, tăng ca ngày thường / cuối tuần / lễ phải được Admin duyệt qua đề nghị nhân sự mới tính lương."
	},
	{
		id: "GT005",
		title: "Thông báo",
		body: "Admin lập thông báo triển khai công việc tới từng bộ phận. User chỉ đọc, không thêm-sửa-xóa."
	},
	{
		id: "GT006",
		title: "Chat nội bộ",
		body: "Trao đổi cùng cấp, theo nhóm hoặc toàn hệ thống. Dữ liệu lưu lại để Admin đối chứng khi cần."
	},
	{
		id: "GT007",
		title: "Hồ sơ — tài liệu",
		body: "Thêm và tra cứu hồ sơ công ty, phân theo đơn vị và bộ phận. Chỉ thêm mới và xem — không sửa, không xóa."
	},
	{
		id: "GT008",
		title: "Thêm mới theo quyền",
		body: "Hệ thống lập kế hoạch tuần/tháng. Đề nghị nhân sự, thu chi, nhập xuất do nhân viên lập — quản lý phê duyệt, từ chối hoặc hủy. Ghi chú mở cho mọi người thêm, không sửa xóa."
	},
	{
		id: "GT009",
		title: "Việc làm mỗi ngày",
		body: "1. Chấm công. 2. Kiểm tra kế hoạch cũ, lập kế hoạch mới. 3. Vào module nghiệp vụ theo chức danh. 4. Góp ý và ghi chú. Hỗ trợ Zalo/điện thoại 0948 80 96 96 hoặc 0904 07 57 57."
	}
];
var REPORTS = [
	{
		id: "bc1",
		name: "Bảng chấm công",
		desc: "Công vào/tan ca theo ngày, người, trung tâm",
		href: "/cham-cong"
	},
	{
		id: "bc2",
		name: "Báo cáo nhiệm vụ",
		desc: "Tiến độ kế hoạch theo người phụ trách",
		href: "/nhiem-vu"
	},
	{
		id: "bc3",
		name: "Tồn kho vắc xin",
		desc: "Số lượng, giá trị, hạn dùng theo trung tâm",
		href: "/kho"
	},
	{
		id: "bc4",
		name: "Điều chuyển kho",
		desc: "Phiếu điều chuyển liên trung tâm",
		href: "/kho"
	},
	{
		id: "bc5",
		name: "Quỹ tiền",
		desc: "Thu — chi — số dư theo ngày",
		href: "/quy"
	},
	{
		id: "bc6",
		name: "Đề nghị chờ duyệt",
		desc: "Hàng đợi phê duyệt của quản lý",
		href: "/de-nghi"
	}
];
var DOCS = [
	{
		id: "hs1",
		name: "Quy chế chấm công & lương",
		dept: "HCNS",
		updated: "2026-07-12"
	},
	{
		id: "hs2",
		name: "Quy trình bảo quản vắc xin GSP",
		dept: "Dược",
		updated: "2026-06-03"
	},
	{
		id: "hs3",
		name: "Hồ sơ vay vốn VietinBank",
		dept: "Tài chính",
		updated: "2026-02-11"
	},
	{
		id: "hs4",
		name: "Danh mục nhà cung cấp vắc xin",
		dept: "Kho",
		updated: "2026-08-01"
	},
	{
		id: "hs5",
		name: "Nội quy trung tâm tiêm chủng",
		dept: "Ban giám đốc",
		updated: "2026-04-18"
	},
	{
		id: "hs6",
		name: "Hướng dẫn thu ngân tại điểm",
		dept: "Kế toán",
		updated: "2026-03-10"
	}
];
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/utils-DkRSI2_g.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid(prefix = "id") {
	return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/client-C3Ieudg_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* Escapes a character if it has a special meaning in regular expressions
* and returns the character as is if it doesn't
*/
function escapeRegExpChar(char) {
	if (char === "-" || char === "^" || char === "$" || char === "+" || char === "." || char === "(" || char === ")" || char === "|" || char === "[" || char === "]" || char === "{" || char === "}" || char === "*" || char === "?" || char === "\\") return `\\${char}`;
	else return char;
}
/**
* Escapes all characters in a given string that have a special meaning in regular expressions
*/
function escapeRegExpString(str) {
	let result = "";
	for (let i = 0; i < str.length; i++) result += escapeRegExpChar(str[i]);
	return result;
}
/**
* Transforms one or more glob patterns into a RegExp pattern
*/
function transform(pattern, separator = true) {
	if (Array.isArray(pattern)) return `(?:${pattern.map((p) => `^${transform(p, separator)}$`).join("|")})`;
	let separatorSplitter = "";
	let separatorMatcher = "";
	let wildcard = ".";
	if (separator === true) {
		separatorSplitter = "/";
		separatorMatcher = "[/\\\\]";
		wildcard = "[^/\\\\]";
	} else if (separator) {
		separatorSplitter = separator;
		separatorMatcher = escapeRegExpString(separatorSplitter);
		if (separatorMatcher.length > 1) {
			separatorMatcher = `(?:${separatorMatcher})`;
			wildcard = `((?!${separatorMatcher}).)`;
		} else wildcard = `[^${separatorMatcher}]`;
	}
	const requiredSeparator = separator ? `${separatorMatcher}+?` : "";
	const optionalSeparator = separator ? `${separatorMatcher}*?` : "";
	const segments = separator ? pattern.split(separatorSplitter) : [pattern];
	let result = "";
	for (let s = 0; s < segments.length; s++) {
		const segment = segments[s];
		const nextSegment = segments[s + 1];
		let currentSeparator = "";
		if (!segment && s > 0) continue;
		if (separator) if (s === segments.length - 1) currentSeparator = optionalSeparator;
		else if (nextSegment !== "**") currentSeparator = requiredSeparator;
		else currentSeparator = "";
		if (separator && segment === "**") {
			if (currentSeparator) {
				result += s === 0 ? "" : currentSeparator;
				result += `(?:${wildcard}*?${currentSeparator})*?`;
			}
			continue;
		}
		for (let c = 0; c < segment.length; c++) {
			const char = segment[c];
			if (char === "\\") {
				if (c < segment.length - 1) {
					result += escapeRegExpChar(segment[c + 1]);
					c++;
				}
			} else if (char === "?") result += wildcard;
			else if (char === "*") result += `${wildcard}*?`;
			else result += escapeRegExpChar(char);
		}
		result += currentSeparator;
	}
	return result;
}
function isMatch(regexp, sample) {
	if (typeof sample !== "string") throw new TypeError(`Sample must be a string, but ${typeof sample} given`);
	return regexp.test(sample);
}
/**
* Compiles one or more glob patterns into a RegExp and returns an isMatch function.
* The isMatch function takes a sample string as its only argument and returns `true`
* if the string matches the pattern(s).
*
* ```js
* wildcardMatch('src/*.js')('src/index.js') //=> true
* ```
*
* ```js
* const isMatch = wildcardMatch('*.example.com', '.')
* isMatch('foo.example.com') //=> true
* isMatch('foo.bar.com') //=> false
* ```
*/
function wildcardMatch(pattern, options) {
	if (typeof pattern !== "string" && !Array.isArray(pattern)) throw new TypeError(`The first argument must be a single pattern string or an array of patterns, but ${typeof pattern} given`);
	if (typeof options === "string" || typeof options === "boolean") options = { separator: options };
	if (arguments.length === 2 && !(typeof options === "undefined" || typeof options === "object" && options !== null && !Array.isArray(options))) throw new TypeError(`The second argument must be an options object or a string/boolean separator, but ${typeof options} given`);
	options = options || {};
	if (options.separator === "\\") throw new Error("\\ is not a valid separator because it is used for escaping. Try setting the separator to `true` instead");
	const regexpPattern = transform(pattern, options.separator);
	const regexp = new RegExp(`^${regexpPattern}$`, options.flags);
	const fn = isMatch.bind(null, regexp);
	fn.options = options;
	fn.pattern = pattern;
	fn.regexp = regexp;
	return fn;
}
var SLASH_CHAR_CODE = "/".charCodeAt(0);
/**
* Minimal loopback check for dev scheme inference only. Reachable from
* `client/config.ts` via `getBaseURL`, so we MUST NOT import the full
* `@better-auth/core/utils/host` classifier here: its `utils/ip` dependency
* on zod would leak into the client bundle (see `e2e/smoke/test/vite.spec.ts`).
*
* Server-side SSRF/loopback checks (oauth redirect matching, trusted-origin
* resolution, electron fetch gate) continue to use the authoritative
* `isLoopbackHost` from `@better-auth/core/utils/host`. This helper's only
* job is picking `http` vs `https` for dev ergonomics.
*/
function isLoopbackForDevScheme(host) {
	const hostname = host.replace(/:\d+$/, "").replace(/^\[|\]$/g, "").toLowerCase();
	return hostname === "localhost" || hostname.endsWith(".localhost") || hostname === "::1" || hostname.startsWith("127.");
}
function trimTrailingSlashes(value) {
	let end = value.length;
	while (end > 0 && value.charCodeAt(end - 1) === SLASH_CHAR_CODE) end--;
	return end === value.length ? value : value.slice(0, end);
}
function checkHasPath(url) {
	try {
		return (trimTrailingSlashes(new URL(url).pathname) || "/") !== "/";
	} catch {
		throw new BetterAuthError(`Invalid base URL: ${url}. Please provide a valid base URL.`);
	}
}
function assertHasProtocol(url) {
	try {
		const parsedUrl = new URL(url);
		if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") throw new BetterAuthError(`Invalid base URL: ${url}. URL must include 'http://' or 'https://'`);
	} catch (error) {
		if (error instanceof BetterAuthError) throw error;
		throw new BetterAuthError(`Invalid base URL: ${url}. Please provide a valid base URL.`, { cause: error });
	}
}
function withPath(url, path = "/api/auth") {
	assertHasProtocol(url);
	if (checkHasPath(url)) return url;
	const trimmedUrl = trimTrailingSlashes(url);
	if (!path || path === "/") return trimmedUrl;
	path = path.startsWith("/") ? path : `/${path}`;
	return `${trimmedUrl}${path}`;
}
function validateProxyHeader(header, type) {
	if (!header || header.trim() === "") return false;
	if (type === "proto") return header === "http" || header === "https";
	if (type === "host") {
		if ([
			/\.\./,
			/\0/,
			/[\s]/,
			/^[.]/,
			/[<>'"]/,
			/javascript:/i,
			/file:/i,
			/data:/i
		].some((pattern) => pattern.test(header))) return false;
		return /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*(:[0-9]{1,5})?$/.test(header) || /^(\d{1,3}\.){3}\d{1,3}(:[0-9]{1,5})?$/.test(header) || /^\[[0-9a-fA-F:]+\](:[0-9]{1,5})?$/.test(header) || /^localhost(:[0-9]{1,5})?$/i.test(header);
	}
	return false;
}
function getBaseURL(url, path, request, loadEnv, trustedProxyHeaders) {
	if (url) return withPath(url, path);
	if (loadEnv !== false) {
		const fromEnv = env.BETTER_AUTH_URL || env.NEXT_PUBLIC_BETTER_AUTH_URL || env.PUBLIC_BETTER_AUTH_URL || env.NUXT_PUBLIC_BETTER_AUTH_URL || env.NUXT_PUBLIC_AUTH_URL || (env.BASE_URL !== "/" ? env.BASE_URL : void 0);
		if (fromEnv) return withPath(fromEnv, path);
	}
	const fromRequest = request?.headers.get("x-forwarded-host");
	const fromRequestProto = request?.headers.get("x-forwarded-proto");
	if (fromRequest && fromRequestProto && trustedProxyHeaders) {
		if (validateProxyHeader(fromRequestProto, "proto") && validateProxyHeader(fromRequest, "host")) try {
			return withPath(`${fromRequestProto}://${fromRequest}`, path);
		} catch (_error) {}
	}
	if (request) {
		const url = getOrigin(request.url);
		if (!url) throw new BetterAuthError("Could not get origin from request. Please provide a valid base URL.");
		return withPath(url, path);
	}
	if (typeof window !== "undefined" && window.location) return withPath(window.location.origin, path);
}
function getOrigin(url) {
	try {
		const parsedUrl = new URL(url);
		return parsedUrl.origin === "null" ? null : parsedUrl.origin;
	} catch {
		return null;
	}
}
function getProtocol(url) {
	try {
		return new URL(url).protocol;
	} catch {
		return null;
	}
}
function getHost(url) {
	try {
		return new URL(url).host;
	} catch {
		return null;
	}
}
/**
* Checks if the baseURL config is a dynamic config object
*/
function isDynamicBaseURLConfig(config) {
	return typeof config === "object" && config !== null && "allowedHosts" in config && Array.isArray(config.allowedHosts);
}
/**
* Check if a value is a `Request`
* - `instanceof`: works for native Request instances
* - `toString`: handles where instanceof check fails but the object is still a
*   valid Request (e.g. cross-realm, polyfills). Paired with a shape check so
*   an object that only spoofs `Symbol.toStringTag` without the real shape is
*   rejected before downstream code tries to read `.headers` / `.url`.
*
* @param value The value to check
* @returns `true` if the value is a Request instance
*/
function isRequestLike(value) {
	if (value instanceof Request) return true;
	if (typeof value !== "object" || value === null || Object.prototype.toString.call(value) !== "[object Request]") return false;
	const v = value;
	return typeof v.url === "string" && typeof v.headers === "object" && v.headers !== null && typeof v.headers.get === "function";
}
/**
* Extracts the host from a `Request` or `Headers`.
* Honors `x-forwarded-host` only when `trustedProxyHeaders` is enabled,
* then falls back to the `host` header and finally the request URL.
*/
function getHostFromSource(source, trustedProxyHeaders) {
	const headers = isRequestLike(source) ? source.headers : source;
	if (trustedProxyHeaders) {
		const forwardedHost = headers.get("x-forwarded-host");
		if (forwardedHost && validateProxyHeader(forwardedHost, "host")) return forwardedHost;
	}
	const host = headers.get("host");
	if (host && validateProxyHeader(host, "host")) return host;
	if (isRequestLike(source)) try {
		return new URL(source.url).host;
	} catch {
		return null;
	}
	return null;
}
/**
* Extracts the protocol from a `Request` or `Headers`.
* Honors `x-forwarded-proto` only when `trustedProxyHeaders` is enabled,
* then falls back to the request URL, then to "https".
*/
function getProtocolFromSource(source, configProtocol, trustedProxyHeaders) {
	if (configProtocol === "http" || configProtocol === "https") return configProtocol;
	const headers = isRequestLike(source) ? source.headers : source;
	if (trustedProxyHeaders) {
		const forwardedProto = headers.get("x-forwarded-proto");
		if (forwardedProto && validateProxyHeader(forwardedProto, "proto")) return forwardedProto;
	}
	if (isRequestLike(source)) try {
		const url = new URL(source.url);
		if (url.protocol === "http:" || url.protocol === "https:") return url.protocol.slice(0, -1);
	} catch {}
	const host = getHostFromSource(source, trustedProxyHeaders);
	if (host && isLoopbackForDevScheme(host)) return "http";
	return "https";
}
/**
* Matches a hostname against a host pattern.
* Supports wildcard patterns like `*.vercel.app` or `preview-*.myapp.com`.
*
* @param host The hostname to test (e.g., "myapp.com", "preview-123.vercel.app")
* @param pattern The host pattern (e.g., "myapp.com", "*.vercel.app")
* @returns {boolean} true if the host matches the pattern, false otherwise.
*
* @example
* ```ts
* matchesHostPattern("myapp.com", "myapp.com") // true
* matchesHostPattern("preview-123.vercel.app", "*.vercel.app") // true
* matchesHostPattern("preview-123.myapp.com", "preview-*.myapp.com") // true
* matchesHostPattern("evil.com", "myapp.com") // false
* ```
*/
var matchesHostPattern = (host, pattern) => {
	if (!host || !pattern) return false;
	const normalizedHost = host.replace(/^https?:\/\//, "").split("/")[0].toLowerCase();
	const normalizedPattern = pattern.replace(/^https?:\/\//, "").split("/")[0].toLowerCase();
	if (normalizedPattern.includes("*") || normalizedPattern.includes("?")) return wildcardMatch(normalizedPattern)(normalizedHost);
	return normalizedHost.toLowerCase() === normalizedPattern.toLowerCase();
};
/**
* Resolves the base URL from a dynamic config based on the incoming request.
* Validates the derived host against the allowedHosts allowlist.
*
* @param config The dynamic base URL config
* @param request The incoming request
* @param basePath The base path to append
* @returns The resolved base URL with path
* @throws BetterAuthError if host is not in allowedHosts and no fallback is set
*/
function resolveDynamicBaseURL(config, source, basePath, trustedProxyHeaders) {
	const host = getHostFromSource(source, trustedProxyHeaders);
	if (!host) {
		if (config.fallback) return withPath(config.fallback, basePath);
		throw new BetterAuthError("Could not determine host from request headers. Please provide a fallback URL in your baseURL config.");
	}
	if (config.allowedHosts.some((pattern) => matchesHostPattern(host, pattern))) return withPath(`${getProtocolFromSource(source, config.protocol, trustedProxyHeaders)}://${host}`, basePath);
	if (config.fallback) return withPath(config.fallback, basePath);
	throw new BetterAuthError(`Host "${host}" is not in the allowed hosts list. Allowed hosts: ${config.allowedHosts.join(", ")}. Add this host to your allowedHosts config or provide a fallback URL.`);
}
/**
* Resolves the base URL from any config type (static string or dynamic object).
* This is the main entry point for base URL resolution.
*
* @param config The base URL config (string or object)
* @param basePath The base path to append
* @param request Optional request for dynamic resolution
* @param loadEnv Whether to load from environment variables
* @param trustedProxyHeaders Whether to trust proxy headers (for legacy behavior)
* @returns The resolved base URL with path
*/
function resolveBaseURL(config, basePath, source, loadEnv, trustedProxyHeaders) {
	if (isDynamicBaseURLConfig(config)) {
		if (source) return resolveDynamicBaseURL(config, source, basePath, trustedProxyHeaders);
		if (config.fallback) return withPath(config.fallback, basePath);
		return getBaseURL(void 0, basePath, void 0, loadEnv, trustedProxyHeaders);
	}
	const request = isRequestLike(source) ? source : void 0;
	if (typeof config === "string") return getBaseURL(config, basePath, request, loadEnv, trustedProxyHeaders);
	return getBaseURL(void 0, basePath, request, loadEnv, trustedProxyHeaders);
}
var PROTO_POLLUTION_PATTERNS = {
	proto: /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
	constructor: /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
	protoShort: /"__proto__"\s*:/,
	constructorShort: /"constructor"\s*:/
};
var JSON_SIGNATURE = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
var SPECIAL_VALUES = {
	true: true,
	false: false,
	null: null,
	undefined: void 0,
	nan: NaN,
	infinity: Number.POSITIVE_INFINITY,
	"-infinity": Number.NEGATIVE_INFINITY
};
var ISO_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,7}))?(?:Z|([+-])(\d{2}):(\d{2}))$/;
function isValidDate(date) {
	return date instanceof Date && !isNaN(date.getTime());
}
function parseISODate(value) {
	const match = ISO_DATE_REGEX.exec(value);
	if (!match) return null;
	const [, year, month, day, hour, minute, second, ms, offsetSign, offsetHour, offsetMinute] = match;
	const date = new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), parseInt(hour, 10), parseInt(minute, 10), parseInt(second, 10), ms ? parseInt(ms.padEnd(3, "0"), 10) : 0));
	if (offsetSign) {
		const offset = (parseInt(offsetHour, 10) * 60 + parseInt(offsetMinute, 10)) * (offsetSign === "+" ? -1 : 1);
		date.setUTCMinutes(date.getUTCMinutes() + offset);
	}
	return isValidDate(date) ? date : null;
}
function betterJSONParse(value, options = {}) {
	const { strict = false, warnings = false, reviver, parseDates = true } = options;
	if (typeof value !== "string") return value;
	const trimmed = value.trim();
	const lowerValue = trimmed.toLowerCase();
	if (lowerValue.length <= 9 && lowerValue in SPECIAL_VALUES) return SPECIAL_VALUES[lowerValue];
	if (!JSON_SIGNATURE.test(trimmed)) {
		if (strict) throw new SyntaxError("[better-json] Invalid JSON");
		return value;
	}
	if (Object.entries(PROTO_POLLUTION_PATTERNS).some(([key, pattern]) => {
		const matches = pattern.test(trimmed);
		if (matches && warnings) console.warn(`[better-json] Detected potential prototype pollution attempt using ${key} pattern`);
		return matches;
	}) && strict) throw new Error("[better-json] Potential prototype pollution attempt detected");
	try {
		const secureReviver = (key, value) => {
			if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
				if (warnings) console.warn(`[better-json] Dropping "${key}" key to prevent prototype pollution`);
				return;
			}
			if (parseDates && typeof value === "string") {
				const date = parseISODate(value);
				if (date) return date;
			}
			return reviver ? reviver(key, value) : value;
		};
		return JSON.parse(trimmed, secureReviver);
	} catch (error) {
		if (strict) throw error;
		return value;
	}
}
function parseJSON(value, options = { strict: true }) {
	return betterJSONParse(value, options);
}
var redirectPlugin = {
	id: "redirect",
	name: "Redirect",
	hooks: { onSuccess(context) {
		if (context.data?.url && context.data?.redirect && isSafeUrlScheme(context.data.url)) {
			if (typeof window !== "undefined" && window.location) {
				if (window.location) try {
					window.location.href = context.data.url;
				} catch {}
			}
		}
	} }
};
function isPlainObject(value) {
	if (typeof value !== "object" || value === null) return false;
	const prototype = Object.getPrototypeOf(value);
	return prototype === Object.prototype || prototype === null;
}
/**
* Deep structural equality for JSON-serializable values.
* Handles: primitives, null, arrays, and plain objects.
* Short-circuits on referential equality at every recursion level.
*/
function isJsonEqual(a, b) {
	if (a === b) return true;
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return false;
		for (let i = 0; i < a.length; i++) if (!isJsonEqual(a[i], b[i])) return false;
		return true;
	}
	if (isPlainObject(a) && isPlainObject(b)) {
		const keysA = Object.keys(a);
		const keysB = Object.keys(b);
		if (keysA.length !== keysB.length) return false;
		for (const key of keysA) if (!(key in b) || !isJsonEqual(a[key], b[key])) return false;
		return true;
	}
	return false;
}
/**
* Attach an equality gate to a nanostores atom via `onSet`.
* When `isEqual(currentValue, newValue)` returns true, the `set()` call
* is aborted: no listeners fire, no framework re-renders occur.
*
* Returns the unsubscribe function from `onSet`.
*/
function withEquality(store, isEqual) {
	return onSet(store, ({ newValue, abort }) => {
		if (isEqual(store.value, newValue)) abort();
	});
}
var kBroadcastChannel = Symbol.for("better-auth:broadcast-channel");
var now$1 = () => Math.floor(Date.now() / 1e3);
var WindowBroadcastChannel = class {
	listeners = /* @__PURE__ */ new Set();
	name;
	constructor(name = "better-auth.message") {
		this.name = name;
	}
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	post(message) {
		if (typeof window === "undefined") return;
		try {
			localStorage.setItem(this.name, JSON.stringify({
				...message,
				timestamp: now$1()
			}));
		} catch {}
	}
	setup() {
		if (typeof window === "undefined" || typeof window.addEventListener === "undefined") return () => {};
		const handler = (event) => {
			if (event.key !== this.name) return;
			const message = JSON.parse(event.newValue ?? "{}");
			if (message?.event !== "session" || !message?.data) return;
			this.listeners.forEach((listener) => listener(message));
		};
		window.addEventListener("storage", handler);
		return () => {
			window.removeEventListener("storage", handler);
		};
	}
};
function getGlobalBroadcastChannel(name = "better-auth.message") {
	if (!globalThis[kBroadcastChannel]) globalThis[kBroadcastChannel] = new WindowBroadcastChannel(name);
	return globalThis[kBroadcastChannel];
}
var kFocusManager = Symbol.for("better-auth:focus-manager");
var WindowFocusManager = class {
	listeners = /* @__PURE__ */ new Set();
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	setFocused(focused) {
		this.listeners.forEach((listener) => listener(focused));
	}
	setup() {
		if (typeof window === "undefined" || typeof document === "undefined" || typeof window.addEventListener === "undefined") return () => {};
		const visibilityHandler = () => {
			if (document.visibilityState === "visible") this.setFocused(true);
		};
		document.addEventListener("visibilitychange", visibilityHandler, false);
		return () => {
			document.removeEventListener("visibilitychange", visibilityHandler, false);
		};
	}
};
function getGlobalFocusManager() {
	if (!globalThis[kFocusManager]) globalThis[kFocusManager] = new WindowFocusManager();
	return globalThis[kFocusManager];
}
var kOnlineManager = Symbol.for("better-auth:online-manager");
var WindowOnlineManager = class {
	listeners = /* @__PURE__ */ new Set();
	isOnline = typeof navigator !== "undefined" ? navigator.onLine : true;
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	setOnline(online) {
		this.isOnline = online;
		this.listeners.forEach((listener) => listener(online));
	}
	setup() {
		if (typeof window === "undefined" || typeof window.addEventListener === "undefined") return () => {};
		const onOnline = () => this.setOnline(true);
		const onOffline = () => this.setOnline(false);
		window.addEventListener("online", onOnline, false);
		window.addEventListener("offline", onOffline, false);
		return () => {
			window.removeEventListener("online", onOnline, false);
			window.removeEventListener("offline", onOffline, false);
		};
	}
};
function getGlobalOnlineManager() {
	if (!globalThis[kOnlineManager]) globalThis[kOnlineManager] = new WindowOnlineManager();
	return globalThis[kOnlineManager];
}
var now$2 = () => Math.floor(Date.now() / 1e3);
/**
* Rate limit: don't refetch on focus if a session request was made within this many seconds
*/
var FOCUS_REFETCH_RATE_LIMIT_SECONDS = 5;
function createSessionRefreshManager(opts) {
	const { fetchSession, shouldPollSession = () => true, sessionSignal, options = {} } = opts;
	const refetchInterval = options.sessionOptions?.refetchInterval ?? 0;
	const refetchOnWindowFocus = options.sessionOptions?.refetchOnWindowFocus ?? true;
	const refetchWhenOffline = options.sessionOptions?.refetchWhenOffline ?? false;
	const state = {
		isInitialized: false,
		lastSessionRequest: 0
	};
	const shouldRefetch = () => {
		return refetchWhenOffline || getGlobalOnlineManager().isOnline;
	};
	const triggerRefetch = (event) => {
		if (!shouldRefetch()) return;
		if (event?.event === "storage") {
			fetchSession();
			return;
		}
		if (event?.event === "poll") {
			state.lastSessionRequest = now$2();
			fetchSession();
			return;
		}
		if (event?.event === "visibilitychange") {
			if (now$2() - state.lastSessionRequest < FOCUS_REFETCH_RATE_LIMIT_SECONDS) return;
			state.lastSessionRequest = now$2();
			fetchSession();
			return;
		}
		fetchSession();
	};
	const broadcastSessionUpdate = (trigger) => {
		getGlobalBroadcastChannel().post({
			event: "session",
			data: { trigger },
			clientId: Math.random().toString(36).substring(7)
		});
	};
	const setupPolling = () => {
		if (refetchInterval && refetchInterval > 0) state.pollInterval = setInterval(() => {
			if (shouldPollSession()) triggerRefetch({ event: "poll" });
		}, refetchInterval * 1e3);
	};
	const setupBroadcast = () => {
		state.unsubscribeBroadcast = getGlobalBroadcastChannel().subscribe(() => {
			triggerRefetch({ event: "storage" });
		});
	};
	const setupFocusRefetch = () => {
		if (!refetchOnWindowFocus) return;
		state.unsubscribeFocus = getGlobalFocusManager().subscribe(() => {
			triggerRefetch({ event: "visibilitychange" });
		});
	};
	const setupOnlineRefetch = () => {
		state.unsubscribeOnline = getGlobalOnlineManager().subscribe((online) => {
			if (online) triggerRefetch({ event: "visibilitychange" });
		});
	};
	const setupSignalSubscription = () => {
		state.unsubscribeSignal = sessionSignal.listen(() => {
			fetchSession();
		});
	};
	const init = () => {
		if (state.isInitialized) return;
		state.isInitialized = true;
		setupPolling();
		setupBroadcast();
		setupFocusRefetch();
		setupOnlineRefetch();
		setupSignalSubscription();
		state.cleanupBroadcastSetup = getGlobalBroadcastChannel().setup();
		state.cleanupFocusSetup = getGlobalFocusManager().setup();
		state.cleanupOnlineSetup = getGlobalOnlineManager().setup();
	};
	const cleanup = () => {
		if (!state.isInitialized) return;
		if (state.pollInterval) {
			clearInterval(state.pollInterval);
			state.pollInterval = void 0;
		}
		if (state.unsubscribeBroadcast) {
			state.unsubscribeBroadcast();
			state.unsubscribeBroadcast = void 0;
		}
		if (state.unsubscribeFocus) {
			state.unsubscribeFocus();
			state.unsubscribeFocus = void 0;
		}
		if (state.unsubscribeOnline) {
			state.unsubscribeOnline();
			state.unsubscribeOnline = void 0;
		}
		if (state.unsubscribeSignal) {
			state.unsubscribeSignal();
			state.unsubscribeSignal = void 0;
		}
		if (state.cleanupBroadcastSetup) {
			state.cleanupBroadcastSetup();
			state.cleanupBroadcastSetup = void 0;
		}
		if (state.cleanupFocusSetup) {
			state.cleanupFocusSetup();
			state.cleanupFocusSetup = void 0;
		}
		if (state.cleanupOnlineSetup) {
			state.cleanupOnlineSetup();
			state.cleanupOnlineSetup = void 0;
		}
		state.isInitialized = false;
		state.lastSessionRequest = 0;
	};
	return {
		init,
		cleanup,
		triggerRefetch,
		broadcastSessionUpdate
	};
}
var isServer = () => typeof window === "undefined";
var SESSION_MOUNT_DEDUPE_INTERVAL = STORE_UNMOUNT_DELAY;
/**
* Normalize $fetch response: `throw: true` returns data directly,
* otherwise `{ data, error }`.
*/
function normalizeSessionResponse(res) {
	if (typeof res === "object" && res !== null && "data" in res && "error" in res) return res;
	return {
		data: res,
		error: null
	};
}
function normalizeSessionData(data) {
	if (!data) return null;
	if (data.session === null && data.user === null) return null;
	return data;
}
function isSessionAtomEqual(a, b) {
	return isJsonEqual(a.data, b.data) && a.error === b.error && a.isPending === b.isPending && a.isRefetching === b.isRefetching && a.refetch === b.refetch;
}
function getSessionAtom($fetch, options) {
	const $signal = /* @__PURE__ */ atom(false);
	let flight;
	let freshUntil = 0;
	let sessionRevision = 0;
	$signal.listen(() => {
		sessionRevision++;
		freshUntil = 0;
	});
	const refetch = (queryParams) => fetchSession(queryParams);
	const session = /* @__PURE__ */ atom({
		data: null,
		error: null,
		isPending: true,
		isRefetching: false,
		refetch
	});
	withEquality(session, isSessionAtomEqual);
	const executeSessionFetch = async (signal, queryParams) => {
		const current = session.value;
		session.set({
			...current,
			isPending: current.data === null,
			isRefetching: true,
			error: null,
			refetch
		});
		if (signal.aborted) return "aborted";
		try {
			const res = await $fetch("/get-session", {
				method: "GET",
				query: queryParams?.query,
				signal
			});
			if (signal.aborted) return "aborted";
			let { data, error } = normalizeSessionResponse(res);
			let outcome = "fresh";
			if (data?.needsRefresh) try {
				const refreshRes = await $fetch("/get-session", {
					method: "POST",
					signal
				});
				if (signal.aborted) return "aborted";
				({data, error} = normalizeSessionResponse(refreshRes));
			} catch {
				if (signal.aborted) return "aborted";
				outcome = "stale";
			}
			if (error) {
				const latest = session.value;
				const isUnauthorized = error?.status === 401;
				session.set({
					data: isUnauthorized ? null : latest.data,
					error,
					isPending: false,
					isRefetching: false,
					refetch
				});
				return "failed";
			}
			const sessionData = normalizeSessionData(data);
			const current = session.value;
			const stableData = current.data != null && sessionData != null && isJsonEqual(current.data, sessionData) ? current.data : sessionData;
			session.set({
				data: stableData,
				error: null,
				isPending: false,
				isRefetching: false,
				refetch
			});
			return outcome;
		} catch (fetchError) {
			if (signal.aborted) return "aborted";
			const latest = session.value;
			session.set({
				data: latest.data,
				error: fetchError,
				isPending: false,
				isRefetching: false,
				refetch
			});
			return "failed";
		}
	};
	const getFreshUntil = () => {
		const expiresAt = session.value.data?.session?.expiresAt;
		const sessionExpiresAt = expiresAt instanceof Date ? expiresAt.getTime() : Number.POSITIVE_INFINITY;
		return Math.min(Date.now() + SESSION_MOUNT_DEDUPE_INTERVAL, sessionExpiresAt);
	};
	const fetchSession = (queryParams) => {
		freshUntil = 0;
		flight?.cancel();
		const controller = new AbortController();
		const request = {
			cancel: () => controller.abort(),
			promise: Promise.resolve().then(() => {
				if (controller.signal.aborted) return "aborted";
				return executeSessionFetch(controller.signal, queryParams);
			}),
			revision: sessionRevision
		};
		flight = request;
		const settleFlight = (outcome) => {
			if (flight !== request) return;
			flight = void 0;
			if (outcome === "fresh" && request.revision === sessionRevision) freshUntil = getFreshUntil();
		};
		request.promise.then(settleFlight, () => settleFlight("failed"));
		return request.promise.then(() => void 0);
	};
	const fetchSessionOnMount = () => {
		if (flight?.revision === sessionRevision) return flight.promise.then(() => void 0);
		if (Date.now() < freshUntil) return Promise.resolve();
		return fetchSession();
	};
	let broadcastSessionUpdate = () => {};
	onMount(session, () => {
		let timeoutId;
		if (!isServer()) timeoutId = setTimeout(() => {
			fetchSessionOnMount();
		}, 0);
		const refreshManager = createSessionRefreshManager({
			fetchSession,
			shouldPollSession: () => session.value.data != null,
			sessionSignal: $signal,
			options
		});
		refreshManager.init();
		broadcastSessionUpdate = refreshManager.broadcastSessionUpdate;
		return () => {
			if (timeoutId) clearTimeout(timeoutId);
			refreshManager.cleanup();
		};
	});
	return {
		session,
		$sessionSignal: $signal,
		broadcastSessionUpdate: (trigger) => broadcastSessionUpdate(trigger)
	};
}
var resolvePublicAuthUrl = (basePath) => {
	if (typeof process === "undefined") return void 0;
	const path = basePath ?? "/api/auth";
	if (process.env.NEXT_PUBLIC_AUTH_URL) return process.env.NEXT_PUBLIC_AUTH_URL;
	if (typeof window === "undefined") {
		if (process.env.NEXTAUTH_URL) try {
			return process.env.NEXTAUTH_URL;
		} catch {}
		if (process.env.VERCEL_URL) try {
			const protocol = process.env.VERCEL_URL.startsWith("http") ? "" : "https://";
			return `${new URL(`${protocol}${process.env.VERCEL_URL}`).origin}${path}`;
		} catch {}
	}
};
var getClientConfig = (options, loadEnv) => {
	const isCredentialsSupported = "credentials" in Request.prototype;
	const baseURL = getBaseURL(options?.baseURL, options?.basePath, void 0, loadEnv) ?? resolvePublicAuthUrl(options?.basePath) ?? "/api/auth";
	const pluginsFetchPlugins = options?.plugins?.flatMap((plugin) => plugin.fetchPlugins).filter((pl) => pl !== void 0) || [];
	const lifeCyclePlugin = {
		id: "lifecycle-hooks",
		name: "lifecycle-hooks",
		hooks: {
			onSuccess: options?.fetchOptions?.onSuccess,
			onError: options?.fetchOptions?.onError,
			onRequest: options?.fetchOptions?.onRequest,
			onResponse: options?.fetchOptions?.onResponse
		}
	};
	const { onSuccess: _onSuccess, onError: _onError, onRequest: _onRequest, onResponse: _onResponse, ...restOfFetchOptions } = options?.fetchOptions || {};
	const $fetch = createFetch({
		baseURL,
		...isCredentialsSupported ? { credentials: "include" } : {},
		method: "GET",
		jsonParser(text) {
			if (!text) return null;
			return parseJSON(text, { strict: false });
		},
		customFetchImpl: fetch,
		...restOfFetchOptions,
		plugins: [
			lifeCyclePlugin,
			...restOfFetchOptions.plugins || [],
			...options?.disableDefaultFetchPlugins ? [] : [redirectPlugin],
			...pluginsFetchPlugins
		]
	});
	const { $sessionSignal, session, broadcastSessionUpdate } = getSessionAtom($fetch, options);
	const plugins = options?.plugins || [];
	let pluginsActions = {};
	const pluginsAtoms = {
		$sessionSignal,
		session
	};
	const pluginPathMethods = {
		"/sign-out": "POST",
		"/revoke-sessions": "POST",
		"/revoke-other-sessions": "POST",
		"/delete-user": "POST"
	};
	const atomListeners = [{
		signal: "$sessionSignal",
		matcher(path) {
			return path === "/sign-out" || path === "/update-user" || path === "/update-session" || path === "/sign-up/email" || path === "/sign-in/email" || path === "/delete-user" || path === "/verify-email" || path === "/revoke-sessions" || path === "/revoke-session" || path === "/revoke-other-sessions" || path === "/change-email" || path === "/change-password";
		},
		callback(path) {
			if (path === "/sign-out") broadcastSessionUpdate("signout");
			else if (path === "/update-user" || path === "/update-session") broadcastSessionUpdate("updateUser");
		}
	}];
	for (const plugin of plugins) {
		if (plugin.getAtoms) Object.assign(pluginsAtoms, plugin.getAtoms?.($fetch));
		if (plugin.pathMethods) Object.assign(pluginPathMethods, plugin.pathMethods);
		if (plugin.atomListeners) atomListeners.push(...plugin.atomListeners);
	}
	const $store = {
		notify: (signal) => {
			pluginsAtoms[signal].set(!pluginsAtoms[signal].get());
		},
		listen: (signal, listener) => {
			pluginsAtoms[signal].subscribe(listener);
		},
		atoms: pluginsAtoms
	};
	for (const plugin of plugins) if (plugin.getActions) pluginsActions = defu(plugin.getActions?.($fetch, $store, options) ?? {}, pluginsActions);
	return {
		get baseURL() {
			return baseURL;
		},
		pluginsActions,
		pluginsAtoms,
		pluginPathMethods,
		atomListeners,
		$fetch,
		$store
	};
};
function isAtom(value) {
	return typeof value === "object" && value !== null && "get" in value && typeof value.get === "function" && "lc" in value && typeof value.lc === "number";
}
function getMethod(path, knownPathMethods, args) {
	const method = knownPathMethods[path];
	const { fetchOptions, query: _query, ...body } = args || {};
	if (method) return method;
	if (fetchOptions?.method) return fetchOptions.method;
	if (body && Object.keys(body).length > 0) return "POST";
	return "GET";
}
function createDynamicPathProxy(routes, client, knownPathMethods, atoms, atomListeners) {
	function createProxy(path = []) {
		return new Proxy(function() {}, {
			get(_, prop) {
				if (typeof prop !== "string") return;
				if (prop === "then" || prop === "catch" || prop === "finally") return;
				const fullPath = [...path, prop];
				let current = routes;
				for (const segment of fullPath) if (current && typeof current === "object" && segment in current) current = current[segment];
				else {
					current = void 0;
					break;
				}
				if (typeof current === "function") return current;
				if (isAtom(current)) return current;
				return createProxy(fullPath);
			},
			apply: async (_, __, args) => {
				const routePath = "/" + path.map(toKebabCase).join("/");
				const arg = args[0] || {};
				const fetchOptions = args[1] || {};
				const { query, fetchOptions: argFetchOptions, ...body } = arg;
				const options = {
					...fetchOptions,
					...argFetchOptions
				};
				const method = getMethod(routePath, knownPathMethods, arg);
				return await client(routePath, {
					...options,
					body: method === "GET" ? void 0 : {
						...body,
						...options?.body || {}
					},
					query: query || options?.query,
					method,
					async onSuccess(context) {
						await options?.onSuccess?.(context);
						if (!atomListeners || options.disableSignal) return;
						/**
						* We trigger listeners
						*/
						const matches = atomListeners.filter((s) => s.matcher(routePath));
						if (!matches.length) return;
						const visited = /* @__PURE__ */ new Set();
						for (const match of matches) {
							const signal = atoms[match.signal];
							if (!signal) return;
							if (visited.has(match.signal)) continue;
							visited.add(match.signal);
							/**
							* To avoid race conditions we set the signal in a setTimeout
							*/
							const val = signal.get();
							setTimeout(() => {
								signal.set(!val);
							}, 10);
							match.callback?.(routePath);
						}
					}
				});
			}
		});
	}
	return createProxy();
}
/**
* Subscribe to store changes and get store's value.
*
* Can be used with store builder too.
*
* ```js
* import { useStore } from 'nanostores/react'
*
* import { router } from '../store/router'
*
* export const Layout = () => {
*   let page = useStore(router)
*   if (page.route === 'home') {
*     return <HomePage />
*   } else {
*     return <Error404 />
*   }
* }
* ```
*
* @param store Store instance.
* @returns Store value.
*/
function useStore(store, options = {}) {
	const snapshotRef = (0, import_react.useRef)(store.get());
	const { keys, deps = [store, keys] } = options;
	const subscribe = (0, import_react.useCallback)((onChange) => {
		const emitChange = (value) => {
			if (snapshotRef.current === value) return;
			snapshotRef.current = value;
			onChange();
		};
		emitChange(store.value);
		if (keys?.length) return listenKeys(store, keys, emitChange);
		return store.listen(emitChange);
	}, deps);
	const get = () => snapshotRef.current;
	return (0, import_react.useSyncExternalStore)(subscribe, get, get);
}
function getAtomKey(str) {
	return `use${capitalizeFirstLetter(str)}`;
}
function createAuthClient(options) {
	const { pluginPathMethods, pluginsActions, pluginsAtoms, $fetch, $store, atomListeners } = getClientConfig(options);
	const resolvedHooks = {};
	for (const [key, value] of Object.entries(pluginsAtoms)) resolvedHooks[getAtomKey(key)] = () => useStore(value);
	return createDynamicPathProxy({
		...pluginsActions,
		...resolvedHooks,
		$fetch,
		$store
	}, $fetch, pluginPathMethods, pluginsAtoms, atomListeners);
}
/**
* The sign-out sequence used by `src/lib/auth/client.ts`, kept here as a pure
* module so its effects can be unit-tested (`node --test` only covers
* `scripts/`), the same split `migration-plan.mjs` uses for the two appliers.
*
* The two environments authenticate differently, so they need different
* answers to "the server did not reply":
*
* - **Live preview** — a partitioned iframe with no readable session cookie;
*   the session rides the bearer token in `sessionStorage`. Dropping that token
*   IS being signed out, so the server call is best effort and a wedged request
*   must never strand the button. This is where the hang actually happens.
* - **Deployed** — the session rides an HttpOnly `__Host-` cookie that JS
*   cannot delete. ONLY a completed sign-out response clears it, and
*   `server.ts` enables `session.cookieCache` (maxAge 300), so `/get-session`
*   would keep answering from the cached cookie for minutes afterwards.
*   Redirecting on a timeout would show the visitor "signed out" while their
*   session is still live — so here we fail loudly instead of pretending.
*/
/**
* Live preview: aggressive, because the local clear is what signs the user out.
* The same-origin POST normally answers in tens of ms; lower would start
* abandoning slow-but-working sign-outs for no gain.
*/
var PREVIEW_SIGN_OUT_TIMEOUT_MS = 1500;
/**
* Deployed: generous, because only the server can end this session — but still
* bounded, so a wedged request reports failure the visitor can retry instead of
* spinning forever. A sign-out still unanswered at 10s is not going to land.
*/
var DEPLOYED_SIGN_OUT_TIMEOUT_MS = 1e4;
/**
* How long to wait for a sign-out in this environment. Every sign-out network
* call picks its bound here, so the preview/deployed split cannot drift apart
* between callers.
* @param {boolean} livePreview
* @returns {number}
*/
function signOutTimeoutMs(livePreview) {
	return livePreview ? PREVIEW_SIGN_OUT_TIMEOUT_MS : DEPLOYED_SIGN_OUT_TIMEOUT_MS;
}
/**
* Run `start()` but give up after `timeoutMs`, reporting which happened. Never
* rejects — callers decide what a failure means, and a `try/catch` around an
* `await` does nothing for a promise that never settles.
* @param {() => unknown} start
* @param {number} timeoutMs
* @returns {Promise<"ok" | "failed" | "timeout">}
*/
function settleWithin(start, timeoutMs) {
	return new Promise((resolve) => {
		const timer = setTimeout(() => resolve("timeout"), timeoutMs);
		/** @param {"ok" | "failed"} outcome */
		const done = (outcome) => {
			clearTimeout(timer);
			resolve(outcome);
		};
		try {
			Promise.resolve(start()).then(() => done("ok"), () => done("failed"));
		} catch {
			done("failed");
		}
	});
}
/**
* @typedef {object} SignOutSteps
* @property {boolean} livePreview Whether the app is the sandbox preview iframe.
* @property {boolean} hasBearer Whether a preview bearer token is stored.
* @property {() => unknown} requestSignOut Ask the server to end the session; must reject on a failed response.
* @property {() => void} clearToken Drop the stored bearer token.
* @property {() => void} redirect Leave the page.
* @property {number} [timeoutMs]
*/
/**
* End the session, then clear the local token and redirect.
*
* In the live preview those last two always run. When deployed they run only if
* the server confirmed, because nothing else can clear the cookie — a failed or
* timed-out sign-out throws rather than reporting a sign-out that did not
* happen.
* @param {SignOutSteps} steps
* @returns {Promise<void>}
*/
async function runSignOut({ livePreview, hasBearer, requestSignOut, clearToken, redirect, timeoutMs }) {
	if (livePreview) {
		if (hasBearer) await settleWithin(requestSignOut, timeoutMs ?? signOutTimeoutMs(livePreview));
		clearToken();
		redirect();
		return;
	}
	const outcome = await settleWithin(requestSignOut, timeoutMs ?? signOutTimeoutMs(livePreview));
	if (outcome !== "ok") throw new Error(outcome === "timeout" ? "Sign-out timed out — you are still signed in. Please try again." : "Sign-out failed — you are still signed in. Please try again.");
	clearToken();
	redirect();
}
/**
* @typedef {object} PreSignInSteps
* @property {boolean} livePreview Whether the app is the sandbox preview iframe.
* @property {boolean} hasBearer Whether a preview bearer token is stored.
* @property {() => unknown} requestSignOut Ask the server to end any prior session.
* @property {() => void} clearToken Drop the stored bearer token.
* @property {number} [timeoutMs]
*/
/**
* Drop any prior session before a new sign-in starts, so switching providers
* actually switches identity.
*
* Deliberately BEST EFFORT — unlike `runSignOut` this never throws. It also
* runs when there is no prior session at all, so treating a failure as fatal
* would block first-time sign-in on a transport hiccup, for a visitor with no
* session to protect. The subsequent OAuth flow issues a fresh session either
* way. Only the wait is bounded, and by the same per-environment rule as
* `runSignOut`: a deployed session dies server-side, so it gets the full
* window rather than the preview's aggressive one.
* @param {PreSignInSteps} steps
* @returns {Promise<void>}
*/
async function runPreSignInSignOut({ livePreview, hasBearer, requestSignOut, clearToken, timeoutMs }) {
	if (hasBearer || !livePreview) await settleWithin(requestSignOut, timeoutMs ?? signOutTimeoutMs(livePreview));
	clearToken();
}
/**
* Better Auth client for this React SPA (browser-side).
*
* Talks to this app's OWN Better Auth at same-origin `/api/auth/*`. In the live
* preview the app is an embedded iframe with PARTITIONED cookies, so after a
* popup sign-in it can't read the session cookie — it authenticates with a
* bearer token instead (captured from the popup, see `signIn`). The `onRequest`
* hook attaches that token when present; when deployed (cookie auth) no token
* is stored, so nothing changes.
*
* To sign out call `signOut()` below, NOT `authClient.signOut()`: the raw call
* leaves the bearer token in place, and `onRequest` keeps re-attaching it, so
* the visitor stays signed in.
*/
var authClient = createAuthClient({ fetchOptions: { onRequest(ctx) {
	const token = getBearerToken();
	if (token) ctx.headers.set("Authorization", `Bearer ${token}`);
	return ctx;
} } });
var BEARER_KEY = "grok-auth.bearer-token";
/** The stored preview bearer token, or null. */
function getBearerToken() {
	if (typeof window === "undefined") return null;
	try {
		return window.sessionStorage.getItem(BEARER_KEY);
	} catch {
		return null;
	}
}
function setBearerToken(token) {
	if (typeof window === "undefined") return;
	try {
		if (token) window.sessionStorage.setItem(BEARER_KEY, token);
		else window.sessionStorage.removeItem(BEARER_KEY);
	} catch {}
}
/**
* The sandbox live preview runs this app inside an iframe on a `*.grok-sandbox.com`
* host, where a full-page redirect to the broker can't work — so sign-in uses a
* popup there and a normal redirect everywhere else.
*/
function inLivePreview() {
	return typeof window !== "undefined" && window.location.hostname.endsWith(".grok-sandbox.com");
}
/**
* Start sign-in with one upstream provider (`providerId` from `GROK_PROVIDERS`),
* federating through the Grok auth broker.
*
* - **Live preview** (`*.grok-sandbox.com` iframe): opens a POPUP to
*   `/auth/popup`, served by the template Vite plugin (see `vite.config.ts` +
*   `popup.server.ts`) — 302s to the broker/upstream login (no app chrome) and,
*   on return, posts the session bearer token back. We store it and refresh the
*   session; no top-level navigation of the iframe to the broker.
* - **Deployed** (and local non-iframe): a normal full-page redirect into the broker.
*
* Either way it clears any existing local session FIRST so switching providers
* actually switches identity.
*/
async function signIn(providerId, opts = {}) {
	const callbackURL = opts.callbackURL ?? "/";
	const errorCallbackURL = opts.errorCallbackURL ?? "/";
	const popup = inLivePreview() ? openSignInPopup(providerId) : null;
	await runPreSignInSignOut({
		livePreview: inLivePreview(),
		hasBearer: Boolean(getBearerToken()),
		requestSignOut: () => authClient.signOut(),
		clearToken: () => setBearerToken(null)
	});
	if (inLivePreview()) {
		if (!popup) throw new Error("Pop-up blocked — allow pop-ups for sign-in");
		const token = await waitForPopupToken(popup);
		if (!token) throw new Error("Sign-in was cancelled or failed");
		setBearerToken(token);
		try {
			await authClient.getSession();
		} catch {}
		if (typeof window !== "undefined") {
			const dest = new URL(callbackURL, window.location.origin);
			const here = window.location;
			if (dest.origin !== here.origin || dest.pathname !== here.pathname || dest.search !== here.search) window.location.href = callbackURL;
		}
		return;
	}
	const { data, error } = await authClient.signIn.social({
		provider: providerId,
		callbackURL,
		errorCallbackURL
	});
	if (error) throw new Error(error.message ?? "Sign-in failed");
	if (data?.url) window.location.href = data.url;
}
/**
* Open `/auth/popup` in a new window. Must run synchronously inside the click
* handler (no await before this). The path is served by the template Vite
* plugin (`authPopupPlugin` in vite.config.ts) — NOT by a React route.
*
* Opens the real URL directly (not about:blank → assign). From a cross-origin
* iframe the about:blank dance often fails on the first click and the window
* ends up showing the app shell.
*/
function openSignInPopup(providerId) {
	const url = `${window.location.origin}/auth/popup?providerId=${encodeURIComponent(providerId)}`;
	const name = `grok-signin-${Date.now()}`;
	return window.open(url, name, "popup,width=500,height=650");
}
/**
* Wait for the popup's completion page to postMessage the session bearer (or
* for the user to dismiss the popup).
*/
function waitForPopupToken(popup) {
	return new Promise((resolve) => {
		const origin = window.location.origin;
		let settled = false;
		let closeTimer;
		const settle = (token) => {
			if (settled) return;
			settled = true;
			cleanup();
			resolve(token);
		};
		const onMessage = (event) => {
			if (event.origin !== origin) return;
			const data = event.data;
			if (!data || data.source !== "grok-auth-popup") return;
			settle(data.token ?? null);
		};
		const pollTimer = window.setInterval(() => {
			if (!popup.closed) return;
			window.clearInterval(pollTimer);
			closeTimer = window.setTimeout(() => settle(null), 400);
		}, 300);
		function cleanup() {
			window.clearInterval(pollTimer);
			if (closeTimer !== void 0) window.clearTimeout(closeTimer);
			window.removeEventListener("message", onMessage);
		}
		window.addEventListener("message", onMessage);
	});
}
/**
* Sign out of THIS app's local session, clear the preview token, then redirect.
*
* Use this, never `authClient.signOut()` — see the note on `authClient`.
* Sequencing lives in `scripts/sign-out-plan.mjs` so it can be unit-tested.
*
* **Rejects when deployed if the server never confirms.** There the session is
* an HttpOnly cookie only the server can clear, so redirecting anyway would
* report a sign-out that did not happen. `<UserButton />` handles that for you;
* a hand-rolled control must catch it and let the visitor retry. In the live
* preview the local clear is sufficient, so it always resolves.
*/
async function signOut$1(redirectTo = "/") {
	await runSignOut({
		livePreview: inLivePreview(),
		hasBearer: Boolean(getBearerToken()),
		requestSignOut: async () => {
			const { error } = await authClient.signOut();
			if (error) throw new Error(error.message ?? "Sign-out failed");
		},
		clearToken: () => setBearerToken(null),
		redirect: () => {
			window.location.href = redirectTo;
		}
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/data-TuX4ahbI.js
var attendance_default = {
	records: [
		{
			"id": "1c97ad76",
			"name": "Lê Thị Dung",
			"status": "Điểm danh vào ca",
			"time": "07:37:19",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "21.160203, 105.929044",
			"address": "21.160203, 105.929044",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "b93dd6de",
			"name": "Phạm Thị Hồng Dương",
			"status": "Điểm danh vào ca",
			"time": "07:39:48",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "21.062259, 105.896871",
			"address": "21.062259, 105.896871",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "c0e76069",
			"name": "Khuất Thị Dung",
			"status": "Điểm danh vào ca",
			"time": "07:50:28",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "21.111273, 105.789759",
			"address": "21.111273, 105.789759",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "7717c7c1",
			"name": "Hà Thị Đông Quế",
			"status": "Điểm danh vào ca",
			"time": "07:52:26",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "21.207688, 105.753185",
			"address": "21.207688, 105.753185",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "dd5ffd1d",
			"name": "Vũ Thị Ánh Ngọc",
			"status": "Điểm danh vào ca",
			"time": "07:28:29",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "21.062046, 105.896772",
			"address": "21.062046, 105.896772",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "6f1ce528",
			"name": "Trần Thị Liên Hoa",
			"status": "Điểm danh vào ca",
			"time": "07:57:02",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "3916bb2d",
			"name": "Trịnh thị đành",
			"status": "Điểm danh vào ca",
			"time": "08:02:00",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "21.202497, 105.702262",
			"address": "21.202497, 105.702262",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "4ea76321",
			"name": "Vương Thị Minh",
			"status": "Điểm danh tan ca",
			"time": "16:57:58",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "21.190908, 105.644689",
			"address": "21.190908, 105.644689",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "f1313c1a",
			"name": "Trần Thị Quỳnh Trang",
			"status": "Điểm danh tan ca",
			"time": "17:00:07",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "21.154286, 105.760922",
			"address": "21.154286, 105.760922",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "e14fcfa9",
			"name": "Nguyễn thị tố chinh",
			"status": "Điểm danh tan ca",
			"time": "17:00:24",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "21.154261, 105.760837",
			"address": "21.154261, 105.760837",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "38d607cd",
			"name": "Lê Thị Bích",
			"status": "Điểm danh tan ca",
			"time": "17:01:02",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "46a6dbd7",
			"name": "Lê Thị Dung",
			"status": "Điểm danh tan ca",
			"time": "17:00:49",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "21.160186, 105.928935",
			"address": "21.160186, 105.928935",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "940543bc",
			"name": "Nguyễn Đức Năng",
			"status": "Điểm danh tan ca",
			"time": "17:01:02",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "21.099189, 105.984203",
			"address": "21.099189, 105.984203",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "2b97b8b3",
			"name": "Nguyễn Nhật Phương",
			"status": "Điểm danh tan ca",
			"time": "17:01:51",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "21.230863, 105.693041",
			"address": "21.230863, 105.693041",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "20fbe76f",
			"name": "Nguyễn Thị Tuyết Lan",
			"status": "Điểm danh tan ca",
			"time": "17:02:14",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "21.207678, 105.753094",
			"address": "21.207678, 105.753094",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "9b80e645",
			"name": "Trần Ngọc Anh",
			"status": "Điểm danh tan ca",
			"time": "17:02:26",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "f801d92e",
			"name": "ĐINH THỊ YẾN",
			"status": "Điểm danh tan ca",
			"time": "17:03:26",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "f9c79bf1",
			"name": "Vũ Thị Ngọc",
			"status": "Điểm danh tan ca",
			"time": "17:03:48",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "20.864947, 105.760636",
			"address": "20.864947, 105.760636",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "81179d59",
			"name": "Trần Thị Yến",
			"status": "Điểm danh tan ca",
			"time": "17:03:29",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "51cf7549",
			"name": "Nguyễn Quỳnh Vân",
			"status": "Điểm danh tan ca",
			"time": "17:07:04",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "84c390b7",
			"name": "Vũ Thị Ánh Ngọc",
			"status": "Điểm danh tan ca",
			"time": "17:09:46",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "21.062046, 105.896772",
			"address": "21.062046, 105.896772",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "8353ba7b",
			"name": "Khuất Thị Dung",
			"status": "Điểm danh tan ca",
			"time": "17:10:14",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "21.111273, 105.789759",
			"address": "21.111273, 105.789759",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "c425ae36",
			"name": "Lương thị hà trang",
			"status": "Điểm danh tan ca",
			"time": "17:15:25",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "20.864919, 105.760565",
			"address": "20.864919, 105.760565",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "09d9259b",
			"name": "Nguyễn Phú Đông",
			"status": "Điểm danh vào ca",
			"time": "17:21:21",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "b8f8a324",
			"name": "Hà Thị Đông Quế",
			"status": "Điểm danh tan ca",
			"time": "17:25:00",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "884641af",
			"name": "LÊ THỊ PHƯƠNG THẢO",
			"status": "Điểm danh tan ca",
			"time": "17:32:23",
			"date": "2026-06-08",
			"weekday": "Thứ hai",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "518c75f4",
			"name": "Nguyễn Đức Năng",
			"status": "Điểm danh vào ca",
			"time": "07:19:55",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.099263, 105.984226",
			"address": "21.099263, 105.984226",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "327f6180",
			"name": "Vũ Thị Ngọc",
			"status": "Điểm danh vào ca",
			"time": "07:20:39",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "20.865005, 105.760648",
			"address": "20.865005, 105.760648",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "cece9242",
			"name": "Trần Ngọc Anh",
			"status": "Điểm danh vào ca",
			"time": "07:20:40",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "50a782e5",
			"name": "Trần Thị Yến",
			"status": "Điểm danh vào ca",
			"time": "07:19:28",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.207694, 105.753199",
			"address": "21.207694, 105.753199",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "94ec0ffa",
			"name": "Lương thị hà trang",
			"status": "Điểm danh vào ca",
			"time": "07:26:54",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "20.864937, 105.760647",
			"address": "20.864937, 105.760647",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "f76f2033",
			"name": "Vũ Thị Ánh Ngọc",
			"status": "Điểm danh vào ca",
			"time": "07:27:06",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.062060, 105.896785",
			"address": "21.062060, 105.896785",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "15e547fa",
			"name": "ĐINH THỊ YẾN",
			"status": "Điểm danh vào ca",
			"time": "07:27:35",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "fa3be608",
			"name": "Lê Thị Hằng",
			"status": "Điểm danh vào ca",
			"time": "07:27:54",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "bfe7f7d6",
			"name": "Nguyễn Thị Bích 1",
			"status": "Điểm danh vào ca",
			"time": "07:28:16",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "8e1d2ad9",
			"name": "Lê Thị Bích",
			"status": "Điểm danh vào ca",
			"time": "07:28:33",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "2f6cb989",
			"name": "Nguyễn thị tố chinh",
			"status": "Điểm danh vào ca",
			"time": "07:28:44",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.154221, 105.760905",
			"address": "21.154221, 105.760905",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "3985b587",
			"name": "Nguyễn Quỳnh Vân",
			"status": "Điểm danh vào ca",
			"time": "07:28:33",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "bfa9f694",
			"name": "Nguyễn Nhật Phương",
			"status": "Điểm danh vào ca",
			"time": "07:29:30",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.230882, 105.693029",
			"address": "21.230882, 105.693029",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "e30144d4",
			"name": "Nguyễn Thị Mỹ Hạnh",
			"status": "Điểm danh vào ca",
			"time": "07:36:16",
			"date": "2026-06-05",
			"weekday": "Thứ sáu",
			"gps": "21.047350, 105.877952",
			"address": "21.047350, 105.877952",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "69f518f5",
			"name": "Nguyễn Thị Mỹ Hạnh",
			"status": "Điểm danh vào ca",
			"time": "07:32:26",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "83437989.0",
			"name": "Lê Thị Dung",
			"status": "Điểm danh vào ca",
			"time": "07:33:14",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.160404, 105.928941",
			"address": "21.160404, 105.928941",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "71fd2b3c",
			"name": "Nguyễn Thị Tuyết Lan",
			"status": "Điểm danh vào ca",
			"time": "07:34:06",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.207718, 105.753180",
			"address": "21.207718, 105.753180",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "dbadf038",
			"name": "Lỗ Thị Hà",
			"status": "Điểm danh vào ca",
			"time": "07:34:29",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.231023, 105.693127",
			"address": "21.231023, 105.693127",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "97bf9263",
			"name": "Nguyễn Phú Đông",
			"status": "Điểm danh vào ca",
			"time": "07:34:55",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.277274, 105.729176",
			"address": "21.277274, 105.729176",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "3489f24b",
			"name": "LÊ THỊ PHƯƠNG THẢO",
			"status": "Điểm danh vào ca",
			"time": "07:36:00",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "65053f2d",
			"name": "Trần Thị Quỳnh Trang",
			"status": "Điểm danh vào ca",
			"time": "07:36:12",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.202919, 105.702469",
			"address": "21.202919, 105.702469",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "2edb4d8d",
			"name": "Đặng Thanh Nhàn",
			"status": "Điểm danh vào ca",
			"time": "07:38:29",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.202751, 105.702371",
			"address": "21.202751, 105.702371",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "ac65b6cd",
			"name": "Khuất Thị Dung",
			"status": "Điểm danh vào ca",
			"time": "07:41:20",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.111266, 105.789779",
			"address": "21.111266, 105.789779",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "e0b6560b",
			"name": "Hà Thị Đông Quế",
			"status": "Điểm danh vào ca",
			"time": "07:49:13",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.207750, 105.753111",
			"address": "21.207750, 105.753111",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "e0f7e8b1",
			"name": "Trần Thị Liên Hoa",
			"status": "Điểm danh vào ca",
			"time": "07:33:00",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.035765, 105.910137",
			"address": "21.035765, 105.910137",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "225342a5",
			"name": "Nguyễn thị tố chinh",
			"status": "Điểm danh tan ca",
			"time": "16:59:00",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.154260, 105.760837",
			"address": "21.154260, 105.760837",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "03eafea0",
			"name": "Nguyễn Đức Năng",
			"status": "Điểm danh tan ca",
			"time": "16:59:19",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.099124, 105.984188",
			"address": "21.099124, 105.984188",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "c56a6cfc",
			"name": "Đặng Thanh Nhàn",
			"status": "Điểm danh tan ca",
			"time": "17:00:15",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.202751, 105.702371",
			"address": "21.202751, 105.702371",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "58c347c1",
			"name": "Trần Thị Quỳnh Trang",
			"status": "Điểm danh tan ca",
			"time": "17:00:15",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.202689, 105.702171",
			"address": "21.202689, 105.702171",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "bec98bbf",
			"name": "KIỀU MAI ANH",
			"status": "Điểm danh vào ca",
			"time": "17:00:46",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "20.871128, 105.805429",
			"address": "20.871128, 105.805429",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "2381cea7",
			"name": "Nguyễn Nhật Phương",
			"status": "Điểm danh tan ca",
			"time": "17:01:25",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.230882, 105.693029",
			"address": "21.230882, 105.693029",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "69dafab7",
			"name": "Lê Thị Hằng",
			"status": "Điểm danh tan ca",
			"time": "17:01:48",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "9aac3cee",
			"name": "Nguyễn Thị Tuyết Lan",
			"status": "Điểm danh tan ca",
			"time": "17:01:11",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.207678, 105.753094",
			"address": "21.207678, 105.753094",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "dfed915f",
			"name": "Vương Thị Minh",
			"status": "Điểm danh vào ca",
			"time": "17:01:01",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.190952, 105.644735",
			"address": "21.190952, 105.644735",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "57105ea8",
			"name": "Vũ Thị Ánh Ngọc",
			"status": "Điểm danh tan ca",
			"time": "17:06:03",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.062047, 105.896773",
			"address": "21.062047, 105.896773",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "9167d584",
			"name": "ĐINH THỊ YẾN",
			"status": "Điểm danh tan ca",
			"time": "17:09:26",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "4d17457b",
			"name": "Nguyễn Thị Bích 1",
			"status": "Điểm danh tan ca",
			"time": "17:09:59",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "dfc2d7bd",
			"name": "Nguyễn Quỳnh Vân",
			"status": "Điểm danh tan ca",
			"time": "17:10:09",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "ce1850f4",
			"name": "Lê Thị Bích",
			"status": "Điểm danh tan ca",
			"time": "17:10:44",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "c910d748",
			"name": "Lê Thị Dung",
			"status": "Điểm danh tan ca",
			"time": "17:10:59",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "1e341f22",
			"name": "Vũ Thị Ngọc",
			"status": "Điểm danh tan ca",
			"time": "17:11:26",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "20.864964, 105.760689",
			"address": "20.864964, 105.760689",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "20b70e46",
			"name": "Lương thị hà trang",
			"status": "Điểm danh tan ca",
			"time": "17:17:35",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "20.864937, 105.760647",
			"address": "20.864937, 105.760647",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "7bbbe57b",
			"name": "Hà Thị Đông Quế",
			"status": "Điểm danh tan ca",
			"time": "17:22:48",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "72b54d34",
			"name": "Nguyễn Phú Đông",
			"status": "Điểm danh tan ca",
			"time": "17:22:35",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "a6d3083c",
			"name": "Khuất Thị Dung",
			"status": "Điểm danh tan ca",
			"time": "17:38:38",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.111272, 105.789767",
			"address": "21.111272, 105.789767",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "cc28d0cc",
			"name": "Lê Thị Hằng",
			"status": "Điểm danh vào ca",
			"time": "07:19:19",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "ddb6003e",
			"name": "Trần Thị Quỳnh Trang",
			"status": "Điểm danh vào ca",
			"time": "07:19:38",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "21.154287, 105.760927",
			"address": "21.154287, 105.760927",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "2d04ffac",
			"name": "Trần Thị Yến",
			"status": "Điểm danh tan ca",
			"time": "17:03:57",
			"date": "2026-06-09",
			"weekday": "Thứ ba",
			"gps": "21.207743, 105.753133",
			"address": "21.207743, 105.753133",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "275adf13",
			"name": "Trần Thị Yến",
			"status": "Điểm danh vào ca",
			"time": "07:20:31",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "21.207690, 105.753189",
			"address": "21.207690, 105.753189",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "f04b1a9a",
			"name": "ĐINH THỊ YẾN",
			"status": "Điểm danh vào ca",
			"time": "07:24:24",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "6ea82a8d",
			"name": "Nguyễn Đức Năng",
			"status": "Điểm danh vào ca",
			"time": "07:23:37",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "21.099296, 105.984232",
			"address": "21.099296, 105.984232",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "4013afa5",
			"name": "Nguyễn Thị Bích 1",
			"status": "Điểm danh vào ca",
			"time": "07:26:00",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "34c35756",
			"name": "Vương Thị Minh",
			"status": "Điểm danh vào ca",
			"time": "07:28:09",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "21.190897, 105.644692",
			"address": "21.190897, 105.644692",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "8231c4e6",
			"name": "Vũ Thị Ánh Ngọc",
			"status": "Điểm danh vào ca",
			"time": "07:28:14",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "21.062047, 105.896773",
			"address": "21.062047, 105.896773",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "96927dc7",
			"name": "Lỗ Thị Hà",
			"status": "Điểm danh vào ca",
			"time": "07:29:00",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "21.231020, 105.693131",
			"address": "21.231020, 105.693131",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "0fb9b93e",
			"name": "Lê Thị Dung",
			"status": "Điểm danh vào ca",
			"time": "07:28:31",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "21.160171, 105.928945",
			"address": "21.160171, 105.928945",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "472dc782",
			"name": "Nguyễn Quỳnh Vân",
			"status": "Điểm danh vào ca",
			"time": "07:29:57",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "bc825a3a",
			"name": "Trần Thị Liên Hoa",
			"status": "Điểm danh vào ca",
			"time": "07:30:26",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "8cc05b49",
			"name": "Lê Thị Bích",
			"status": "Điểm danh vào ca",
			"time": "07:30:56",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "62af382e",
			"name": "KIỀU MAI ANH",
			"status": "Điểm danh vào ca",
			"time": "07:32:18",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "20.871127, 105.805429",
			"address": "20.871127, 105.805429",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "f0b596c3",
			"name": "Nguyễn Phú Đông",
			"status": "Điểm danh vào ca",
			"time": "07:34:07",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "893e6a23",
			"name": "Nguyễn Thị Tuyết Lan",
			"status": "Điểm danh vào ca",
			"time": "07:37:02",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "21.207718, 105.753180",
			"address": "21.207718, 105.753180",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "17092ffc",
			"name": "Bùi Thị Hương Lan",
			"status": "Điểm danh vào ca",
			"time": "07:41:21",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "21.109667, 105.959398",
			"address": "21.109667, 105.959398",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "0c7685a9",
			"name": "Lương thị hà trang",
			"status": "Điểm danh vào ca",
			"time": "07:16:14",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "20.864944, 105.760643",
			"address": "20.864944, 105.760643",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "0a58c41d",
			"name": "Hà Thị Đông Quế",
			"status": "Điểm danh vào ca",
			"time": "07:44:21",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "21.207750, 105.753097",
			"address": "21.207750, 105.753097",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "6767b46a",
			"name": "Trần Thị Liên Hoa",
			"status": "Điểm danh tan ca",
			"time": "16:57:28",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "2d17952a",
			"name": "Vương Thị Minh",
			"status": "Điểm danh tan ca",
			"time": "16:59:41",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "21.190819, 105.644653",
			"address": "21.190819, 105.644653",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "e6e4bf1c",
			"name": "Bùi Thị Hương Lan",
			"status": "Điểm danh tan ca",
			"time": "16:59:49",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "21.109667, 105.959398",
			"address": "21.109667, 105.959398",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "98d53ca1",
			"name": "Nguyễn Thị Bích 1",
			"status": "Điểm danh tan ca",
			"time": "17:01:12",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "4c85726b",
			"name": "ĐINH THỊ YẾN",
			"status": "Điểm danh tan ca",
			"time": "17:02:03",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "86b14dbe",
			"name": "KIỀU MAI ANH",
			"status": "Điểm danh tan ca",
			"time": "17:03:23",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "20.871127, 105.805429",
			"address": "20.871127, 105.805429",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "98bf3996",
			"name": "Nguyễn Đức Năng",
			"status": "Điểm danh tan ca",
			"time": "17:05:28",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "21.099285, 105.984229",
			"address": "21.099285, 105.984229",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "49c38887",
			"name": "Trần Thị Yến",
			"status": "Điểm danh tan ca",
			"time": "17:06:39",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "21.207714, 105.753138",
			"address": "21.207714, 105.753138",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "580d381b",
			"name": "Lê Thị Hằng",
			"status": "Điểm danh tan ca",
			"time": "17:07:58",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "100d0bda",
			"name": "Nguyễn Phú Đông",
			"status": "Điểm danh tan ca",
			"time": "17:08:59",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "984c79c9",
			"name": "Nguyễn Quỳnh Vân",
			"status": "Điểm danh tan ca",
			"time": "17:15:14",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "60bcfe86",
			"name": "Hà Thị Đông Quế",
			"status": "Điểm danh tan ca",
			"time": "17:24:33",
			"date": "2026-06-10",
			"weekday": "Thứ tư",
			"gps": "21.207750, 105.753097",
			"address": "21.207750, 105.753097",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "3ec3817b",
			"name": "Lê Thị Hằng",
			"status": "Điểm danh vào ca",
			"time": "07:14:39",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "a9ab3449",
			"name": "Vương Thị Minh",
			"status": "Điểm danh vào ca",
			"time": "07:22:55",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "21.190928, 105.644717",
			"address": "21.190928, 105.644717",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "9244802c",
			"name": "ĐINH THỊ YẾN",
			"status": "Điểm danh vào ca",
			"time": "07:21:54",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "506886da",
			"name": "Nguyễn Thị Tuyết Lan",
			"status": "Điểm danh vào ca",
			"time": "07:23:52",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "21.207723, 105.753169",
			"address": "21.207723, 105.753169",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "54eef4d1",
			"name": "Nghiêm Thị Tám",
			"status": "Điểm danh vào ca",
			"time": "07:25:27",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "21.160304, 105.929002",
			"address": "21.160304, 105.929002",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "c9c98b0f",
			"name": "Trần Thị Yến",
			"status": "Điểm danh vào ca",
			"time": "07:22:37",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "21.207698, 105.753187",
			"address": "21.207698, 105.753187",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "f4e57f2f",
			"name": "Nguyễn Nhật Phương",
			"status": "Điểm danh vào ca",
			"time": "07:26:50",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "cf011003",
			"name": "Nguyễn Đức Năng",
			"status": "Điểm danh vào ca",
			"time": "07:27:41",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "21.099240, 105.984223",
			"address": "21.099240, 105.984223",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "b8ced4b9",
			"name": "Trần Thị Quỳnh Trang",
			"status": "Điểm danh vào ca",
			"time": "07:28:53",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "21.207716, 105.752981",
			"address": "21.207716, 105.752981",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "7b9b8131",
			"name": "Lê Thị Bích",
			"status": "Điểm danh vào ca",
			"time": "07:29:57",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "70991036.0",
			"name": "KIỀU MAI ANH",
			"status": "Điểm danh vào ca",
			"time": "07:31:13",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "20.871126, 105.805430",
			"address": "20.871126, 105.805430",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "d15084d4",
			"name": "Nguyễn Quỳnh Vân",
			"status": "Điểm danh vào ca",
			"time": "07:32:18",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "ada314a0",
			"name": "Lỗ Thị Hà",
			"status": "Điểm danh vào ca",
			"time": "07:33:12",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "21.231042, 105.693131",
			"address": "21.231042, 105.693131",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "2e11ebec",
			"name": "Lê Thị Dung",
			"status": "Điểm danh vào ca",
			"time": "07:33:05",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "21.160164, 105.928946",
			"address": "21.160164, 105.928946",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "ab2f0137",
			"name": "Khuất Thị Dung",
			"status": "Điểm danh vào ca",
			"time": "07:45:29",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "21.111323, 105.789945",
			"address": "21.111323, 105.789945",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "900c0e2e",
			"name": "Lê Thị Thanh",
			"status": "Điểm danh vào ca",
			"time": "07:58:39",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "45d1a846",
			"name": "Nguyễn Đức Năng",
			"status": "Điểm danh tan ca",
			"time": "16:53:08",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "21.099252, 105.984264",
			"address": "21.099252, 105.984264",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "7769307b",
			"name": "Nguyễn Nhật Phương",
			"status": "Điểm danh tan ca",
			"time": "17:00:28",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "21.230878, 105.693057",
			"address": "21.230878, 105.693057",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "5d08b1f1",
			"name": "KIỀU MAI ANH",
			"status": "Điểm danh tan ca",
			"time": "17:00:55",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "20.871126, 105.805430",
			"address": "20.871126, 105.805430",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "8d90f511",
			"name": "Nghiêm Thị Tám",
			"status": "Điểm danh tan ca",
			"time": "17:01:01",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "db2188d7",
			"name": "ĐINH THỊ YẾN",
			"status": "Điểm danh tan ca",
			"time": "17:01:58",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "28f022a2",
			"name": "Lê Thị Dung",
			"status": "Điểm danh tan ca",
			"time": "17:01:25",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "39e1f3d4",
			"name": "Lê Thị Bích",
			"status": "Điểm danh tan ca",
			"time": "17:02:17",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "d9e8ec49",
			"name": "Nguyễn Phú Đông",
			"status": "Điểm danh vào ca",
			"time": "17:03:09",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "af0e4fc4",
			"name": "Lê Thị Hằng",
			"status": "Điểm danh tan ca",
			"time": "17:04:29",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "ee7e2c3f",
			"name": "Nguyễn Thị Tuyết Lan",
			"status": "Điểm danh tan ca",
			"time": "17:05:04",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "21.207678, 105.753094",
			"address": "21.207678, 105.753094",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "32630272.0",
			"name": "Lỗ Thị Hà",
			"status": "Điểm danh tan ca",
			"time": "17:02:00",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "21.231022, 105.693112",
			"address": "21.231022, 105.693112",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "610536d6",
			"name": "Nguyễn Quỳnh Vân",
			"status": "Điểm danh tan ca",
			"time": "17:05:35",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "52eee810",
			"name": "Khuất Thị Dung",
			"status": "Điểm danh tan ca",
			"time": "17:06:42",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "21.111268, 105.789840",
			"address": "21.111268, 105.789840",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "7814c400",
			"name": "Trần Thị Yến",
			"status": "Điểm danh tan ca",
			"time": "17:08:26",
			"date": "2026-06-11",
			"weekday": "Thứ năm",
			"gps": "21.207718, 105.752481",
			"address": "21.207718, 105.752481",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "5779a730",
			"name": "Lê Thị Hằng",
			"status": "Điểm danh vào ca",
			"time": "07:17:25",
			"date": "2026-06-12",
			"weekday": "Thứ sáu",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "c7dcca8c",
			"name": "Trần Thị Yến",
			"status": "Điểm danh vào ca",
			"time": "07:16:49",
			"date": "2026-06-12",
			"weekday": "Thứ sáu",
			"gps": "21.207690, 105.753204",
			"address": "21.207690, 105.753204",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "c5f65db4",
			"name": "ĐINH THỊ YẾN",
			"status": "Điểm danh vào ca",
			"time": "07:25:00",
			"date": "2026-06-12",
			"weekday": "Thứ sáu",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "2476fb51",
			"name": "Nguyễn Nhật Phương",
			"status": "Điểm danh vào ca",
			"time": "07:26:42",
			"date": "2026-06-12",
			"weekday": "Thứ sáu",
			"gps": "21.230867, 105.693039",
			"address": "21.230867, 105.693039",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "f9f2dd0c",
			"name": "Vương Thị Minh",
			"status": "Điểm danh vào ca",
			"time": "07:28:28",
			"date": "2026-06-12",
			"weekday": "Thứ sáu",
			"gps": "21.190978, 105.644754",
			"address": "21.190978, 105.644754",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "9075f2e0",
			"name": "Nguyễn Thị Tuyết Lan",
			"status": "Điểm danh vào ca",
			"time": "07:29:37",
			"date": "2026-06-12",
			"weekday": "Thứ sáu",
			"gps": "21.202688, 105.702440",
			"address": "21.202688, 105.702440",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "fb3d2ec8",
			"name": "Nguyễn Thị Mỹ Hạnh",
			"status": "Điểm danh vào ca",
			"time": "07:29:40",
			"date": "2026-06-12",
			"weekday": "Thứ sáu",
			"gps": "21.047424, 105.877962",
			"address": "21.047424, 105.877962",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "59e89b58",
			"name": "Lê Thị Bích",
			"status": "Điểm danh vào ca",
			"time": "07:30:03",
			"date": "2026-06-12",
			"weekday": "Thứ sáu",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "4d40b170",
			"name": "Nghiêm Thị Tám",
			"status": "Điểm danh vào ca",
			"time": "07:30:19",
			"date": "2026-06-12",
			"weekday": "Thứ sáu",
			"gps": "21.160292, 105.928987",
			"address": "21.160292, 105.928987",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "67756cc4",
			"name": "Lê Thị Dung",
			"status": "Điểm danh vào ca",
			"time": "07:30:25",
			"date": "2026-06-12",
			"weekday": "Thứ sáu",
			"gps": "21.160188, 105.929015",
			"address": "21.160188, 105.929015",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "8202f2f7",
			"name": "Nguyễn Quỳnh Vân",
			"status": "Điểm danh vào ca",
			"time": "07:31:14",
			"date": "2026-06-12",
			"weekday": "Thứ sáu",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "c1d01030",
			"name": "Lỗ Thị Hà",
			"status": "Điểm danh vào ca",
			"time": "07:33:45",
			"date": "2026-06-12",
			"weekday": "Thứ sáu",
			"gps": "21.231028, 105.693117",
			"address": "21.231028, 105.693117",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "eb3fc604",
			"name": "Nguyễn Phú Đông",
			"status": "Điểm danh vào ca",
			"time": "07:38:39",
			"date": "2026-06-12",
			"weekday": "Thứ sáu",
			"gps": "21.277241, 105.729110",
			"address": "21.277241, 105.729110",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "195b3659",
			"name": "Khuất Thị Dung",
			"status": "Điểm danh vào ca",
			"time": "07:40:19",
			"date": "2026-06-12",
			"weekday": "Thứ sáu",
			"gps": "21.111268, 105.789840",
			"address": "21.111268, 105.789840",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "3d885eb6",
			"name": "Hà Thị Đông Quế",
			"status": "Điểm danh vào ca",
			"time": "07:50:22",
			"date": "2026-06-12",
			"weekday": "Thứ sáu",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "b2d14b44",
			"name": "Phạm Kiên Cường",
			"status": "Điểm danh vào ca",
			"time": "18:47:07",
			"date": "2026-06-24",
			"weekday": "Thứ tư",
			"gps": "21.024624, 105.843968",
			"address": "21.024624, 105.843968",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "9b68fd3e",
			"name": "Phạm Kiên Cường",
			"status": "Điểm danh vào ca",
			"time": "07:27:02",
			"date": "2026-06-25",
			"weekday": "Thứ năm",
			"gps": "21.047157, 105.878162",
			"address": "21.047157, 105.878162",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "cb0147f2",
			"name": "Phạm Kiên Cường",
			"status": "Điểm danh vào ca",
			"time": "07:02:10",
			"date": "2026-06-26",
			"weekday": "Thứ sáu",
			"gps": "0.000000, 0.000000",
			"address": "0.000000, 0.000000",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "d768c6d6",
			"name": "Phạm Kiên Cường",
			"status": "Điểm danh vào ca",
			"time": "07:24:44",
			"date": "2026-06-29",
			"weekday": "Thứ hai",
			"gps": "21.047423, 105.877993",
			"address": "21.047423, 105.877993",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "9c7886a0",
			"name": "Phạm Kiên Cường",
			"status": "Điểm danh vào ca",
			"time": "07:19:21",
			"date": "2026-06-30",
			"weekday": "Thứ ba",
			"gps": "21.047179, 105.878184",
			"address": "21.047179, 105.878184",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "8a50efd8",
			"name": "Phạm Kiên Cường",
			"status": "Điểm danh vào ca",
			"time": "07:19:54",
			"date": "2026-07-02",
			"weekday": "Thứ năm",
			"gps": "21.047408, 105.877978",
			"address": "21.047408, 105.877978",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "4127cd06",
			"name": "Phạm Kiên Cường",
			"status": "Điểm danh vào ca",
			"time": "07:10:19",
			"date": "2026-07-03",
			"weekday": "Thứ sáu",
			"gps": "21.047347, 105.877983",
			"address": "21.047347, 105.877983",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "481ce09d",
			"name": "Phạm Kiên Cường",
			"status": "Điểm danh vào ca",
			"time": "07:24:26",
			"date": "2026-07-06",
			"weekday": "Thứ hai",
			"gps": "21.047418, 105.877992",
			"address": "21.047418, 105.877992",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "3ba5578f",
			"name": "Phạm Kiên Cường",
			"status": "Điểm danh vào ca",
			"time": "07:22:30",
			"date": "2026-07-14",
			"weekday": "Thứ ba",
			"gps": "21.047238, 105.878139",
			"address": "21.047238, 105.878139",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "f8264bc7",
			"name": "Phạm Kiên Cường",
			"status": "Điểm danh vào ca",
			"time": "07:24:52",
			"date": "2026-07-30",
			"weekday": "Thứ năm",
			"gps": "21.047381, 105.877945",
			"address": "21.047381, 105.877945",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "28646106",
			"name": "Phạm Kiên Cường",
			"status": "Điểm danh vào ca",
			"time": "07:31:37",
			"date": "2026-08-03",
			"weekday": "Thứ hai",
			"gps": "21.047361, 105.877957",
			"address": "21.047361, 105.877957",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		},
		{
			"id": "d2275fb6",
			"name": "Phạm Kiên Cường",
			"status": "Điểm danh vào ca",
			"time": "07:33:15",
			"date": "2026-08-20",
			"weekday": "Thứ năm",
			"gps": "21.047428, 105.878010",
			"address": "21.047428, 105.878010",
			"type": "Bình thường",
			"approved": "Chưa",
			"workplace": ""
		}
	],
	daily: [
		{
			"date": "2026-03-30",
			"in": 5,
			"out": 2
		},
		{
			"date": "2026-03-31",
			"in": 3,
			"out": 2
		},
		{
			"date": "2026-04-01",
			"in": 9,
			"out": 7
		},
		{
			"date": "2026-04-02",
			"in": 8,
			"out": 7
		},
		{
			"date": "2026-04-03",
			"in": 7,
			"out": 7
		},
		{
			"date": "2026-04-04",
			"in": 4,
			"out": 4
		},
		{
			"date": "2026-04-06",
			"in": 5,
			"out": 4
		},
		{
			"date": "2026-04-07",
			"in": 8,
			"out": 5
		},
		{
			"date": "2026-04-08",
			"in": 7,
			"out": 7
		},
		{
			"date": "2026-04-09",
			"in": 7,
			"out": 6
		},
		{
			"date": "2026-04-10",
			"in": 7,
			"out": 6
		},
		{
			"date": "2026-04-11",
			"in": 7,
			"out": 6
		},
		{
			"date": "2026-04-13",
			"in": 6,
			"out": 5
		},
		{
			"date": "2026-04-14",
			"in": 6,
			"out": 2
		},
		{
			"date": "2026-04-15",
			"in": 6,
			"out": 5
		},
		{
			"date": "2026-04-16",
			"in": 7,
			"out": 6
		},
		{
			"date": "2026-04-17",
			"in": 5,
			"out": 4
		},
		{
			"date": "2026-04-18",
			"in": 6,
			"out": 3
		},
		{
			"date": "2026-04-20",
			"in": 4,
			"out": 3
		},
		{
			"date": "2026-04-21",
			"in": 5,
			"out": 3
		},
		{
			"date": "2026-04-22",
			"in": 7,
			"out": 7
		},
		{
			"date": "2026-04-23",
			"in": 6,
			"out": 5
		},
		{
			"date": "2026-04-24",
			"in": 6,
			"out": 3
		},
		{
			"date": "2026-04-25",
			"in": 5,
			"out": 3
		},
		{
			"date": "2026-04-28",
			"in": 6,
			"out": 6
		},
		{
			"date": "2026-04-29",
			"in": 6,
			"out": 4
		},
		{
			"date": "2026-05-02",
			"in": 1,
			"out": 0
		},
		{
			"date": "2026-05-04",
			"in": 4,
			"out": 3
		},
		{
			"date": "2026-05-05",
			"in": 6,
			"out": 5
		},
		{
			"date": "2026-05-06",
			"in": 7,
			"out": 7
		},
		{
			"date": "2026-05-07",
			"in": 7,
			"out": 6
		},
		{
			"date": "2026-05-08",
			"in": 6,
			"out": 6
		},
		{
			"date": "2026-05-09",
			"in": 5,
			"out": 3
		},
		{
			"date": "2026-05-11",
			"in": 4,
			"out": 4
		},
		{
			"date": "2026-05-12",
			"in": 3,
			"out": 3
		},
		{
			"date": "2026-05-13",
			"in": 2,
			"out": 2
		},
		{
			"date": "2026-05-14",
			"in": 31,
			"out": 12
		},
		{
			"date": "2026-05-15",
			"in": 44,
			"out": 39
		},
		{
			"date": "2026-05-16",
			"in": 45,
			"out": 36
		},
		{
			"date": "2026-05-17",
			"in": 46,
			"out": 40
		},
		{
			"date": "2026-05-18",
			"in": 51,
			"out": 47
		},
		{
			"date": "2026-05-19",
			"in": 49,
			"out": 44
		},
		{
			"date": "2026-05-20",
			"in": 45,
			"out": 38
		},
		{
			"date": "2026-05-21",
			"in": 45,
			"out": 33
		},
		{
			"date": "2026-05-22",
			"in": 41,
			"out": 34
		},
		{
			"date": "2026-05-23",
			"in": 37,
			"out": 28
		},
		{
			"date": "2026-05-24",
			"in": 36,
			"out": 26
		},
		{
			"date": "2026-05-25",
			"in": 39,
			"out": 36
		},
		{
			"date": "2026-05-26",
			"in": 41,
			"out": 32
		},
		{
			"date": "2026-05-27",
			"in": 43,
			"out": 30
		},
		{
			"date": "2026-05-28",
			"in": 40,
			"out": 28
		},
		{
			"date": "2026-05-29",
			"in": 36,
			"out": 25
		},
		{
			"date": "2026-05-30",
			"in": 35,
			"out": 28
		},
		{
			"date": "2026-05-31",
			"in": 22,
			"out": 17
		},
		{
			"date": "2026-06-01",
			"in": 38,
			"out": 32
		},
		{
			"date": "2026-06-02",
			"in": 36,
			"out": 30
		},
		{
			"date": "2026-06-03",
			"in": 36,
			"out": 28
		},
		{
			"date": "2026-06-04",
			"in": 30,
			"out": 23
		},
		{
			"date": "2026-06-05",
			"in": 27,
			"out": 20
		},
		{
			"date": "2026-06-06",
			"in": 25,
			"out": 20
		},
		{
			"date": "2026-06-07",
			"in": 27,
			"out": 18
		},
		{
			"date": "2026-06-08",
			"in": 25,
			"out": 18
		},
		{
			"date": "2026-06-09",
			"in": 26,
			"out": 19
		},
		{
			"date": "2026-06-10",
			"in": 19,
			"out": 12
		},
		{
			"date": "2026-06-11",
			"in": 17,
			"out": 13
		},
		{
			"date": "2026-06-12",
			"in": 15,
			"out": 0
		},
		{
			"date": "2026-06-24",
			"in": 1,
			"out": 0
		},
		{
			"date": "2026-06-25",
			"in": 1,
			"out": 0
		},
		{
			"date": "2026-06-26",
			"in": 1,
			"out": 0
		},
		{
			"date": "2026-06-29",
			"in": 1,
			"out": 0
		},
		{
			"date": "2026-06-30",
			"in": 1,
			"out": 0
		},
		{
			"date": "2026-07-02",
			"in": 1,
			"out": 0
		},
		{
			"date": "2026-07-03",
			"in": 1,
			"out": 0
		},
		{
			"date": "2026-07-06",
			"in": 1,
			"out": 0
		},
		{
			"date": "2026-07-14",
			"in": 1,
			"out": 0
		},
		{
			"date": "2026-07-30",
			"in": 1,
			"out": 0
		},
		{
			"date": "2026-08-03",
			"in": 1,
			"out": 0
		},
		{
			"date": "2026-08-20",
			"in": 1,
			"out": 0
		}
	]
};
var inventory_default = {
	asOf: "2026-03-27",
	centers: [
		{
			"code": "NL",
			"qty": 1867,
			"value": 1052942804,
			"skus": 68,
			"expiring": 4
		},
		{
			"code": "LB",
			"qty": 2496,
			"value": 934845982,
			"skus": 67,
			"expiring": 2
		},
		{
			"code": "TS",
			"qty": 2340,
			"value": 860612695,
			"skus": 75,
			"expiring": 4
		},
		{
			"code": "TĐ",
			"qty": 2177,
			"value": 849950521,
			"skus": 70,
			"expiring": 2
		},
		{
			"code": "SĐ",
			"qty": 2075,
			"value": 849125342,
			"skus": 69,
			"expiring": 3
		},
		{
			"code": "CĐ",
			"qty": 1691,
			"value": 776356476,
			"skus": 68,
			"expiring": 4
		},
		{
			"code": "ĐX",
			"qty": 1787,
			"value": 775315533,
			"skus": 70,
			"expiring": 3
		},
		{
			"code": "QO",
			"qty": 1939,
			"value": 774003951,
			"skus": 65,
			"expiring": 1
		},
		{
			"code": "BH",
			"qty": 2056,
			"value": 756969319,
			"skus": 73,
			"expiring": 3
		},
		{
			"code": "PY",
			"qty": 1694,
			"value": 734419729,
			"skus": 66,
			"expiring": 2
		},
		{
			"code": "TD",
			"qty": 1860,
			"value": 734007017,
			"skus": 72,
			"expiring": 3
		},
		{
			"code": "ML",
			"qty": 1861,
			"value": 732732301,
			"skus": 67,
			"expiring": 2
		},
		{
			"code": "LM",
			"qty": 1816,
			"value": 719789348,
			"skus": 67,
			"expiring": 2
		},
		{
			"code": "HM",
			"qty": 1819,
			"value": 709172308,
			"skus": 69,
			"expiring": 1
		},
		{
			"code": "TO",
			"qty": 2280,
			"value": 703211868,
			"skus": 72,
			"expiring": 1
		},
		{
			"code": "TP",
			"qty": 1810,
			"value": 689504381,
			"skus": 56,
			"expiring": 2
		},
		{
			"code": "TA",
			"qty": 1486,
			"value": 640039054,
			"skus": 67,
			"expiring": 2
		},
		{
			"code": "TT",
			"qty": 1241,
			"value": 445692185,
			"skus": 55,
			"expiring": 2
		},
		{
			"code": "ĐY",
			"qty": 980,
			"value": 289506673,
			"skus": 54,
			"expiring": 1
		}
	],
	vaccines: [
		{
			"name": "MenQuadfi",
			"qty": 1123,
			"value": 1693572300,
			"lots": 89,
			"minDays": 1,
			"mfr": ""
		},
		{
			"name": "Hexaxim",
			"qty": 1655,
			"value": 1318601812,
			"lots": 56,
			"minDays": 311,
			"mfr": ""
		},
		{
			"name": "Gardasil 9",
			"qty": 414,
			"value": 1128915900,
			"lots": 57,
			"minDays": 500,
			"mfr": ""
		},
		{
			"name": "Infanrix Hexa",
			"qty": 769,
			"value": 704350512,
			"lots": 39,
			"minDays": 359,
			"mfr": ""
		},
		{
			"name": "Prevenar 20",
			"qty": 511,
			"value": 698748187,
			"lots": 60,
			"minDays": 253,
			"mfr": ""
		},
		{
			"name": "Bexsero",
			"qty": 421,
			"value": 629671482,
			"lots": 49,
			"minDays": 325,
			"mfr": ""
		},
		{
			"name": "Prevenar 13",
			"qty": 591,
			"value": 599116366,
			"lots": 56,
			"minDays": 415,
			"mfr": ""
		},
		{
			"name": "GC FLU Quadrivalent pre-filled syringe inj",
			"qty": 2675,
			"value": 569790275,
			"lots": 96,
			"minDays": 77,
			"mfr": ""
		},
		{
			"name": "Varivax",
			"qty": 628,
			"value": 550836577,
			"lots": 48,
			"minDays": 230,
			"mfr": ""
		},
		{
			"name": "Rotarix 1.5ml",
			"qty": 706,
			"value": 515813888,
			"lots": 61,
			"minDays": 188,
			"mfr": ""
		},
		{
			"name": "Influvac Tetra",
			"qty": 2320,
			"value": 498396880,
			"lots": 48,
			"minDays": 66,
			"mfr": ""
		},
		{
			"name": "Synflorix",
			"qty": 712,
			"value": 434868232,
			"lots": 49,
			"minDays": 158,
			"mfr": ""
		},
		{
			"name": "Vaxneuvance",
			"qty": 302,
			"value": 393217650,
			"lots": 26,
			"minDays": 550,
			"mfr": ""
		},
		{
			"name": "VARILRIX",
			"qty": 478,
			"value": 392663912,
			"lots": 50,
			"minDays": 462,
			"mfr": ""
		},
		{
			"name": "Vaxigrip Tetra 0.5ml",
			"qty": 1719,
			"value": 389817900,
			"lots": 45,
			"minDays": 66,
			"mfr": ""
		},
		{
			"name": "Imojev",
			"qty": 510,
			"value": 353171929,
			"lots": 58,
			"minDays": 768,
			"mfr": ""
		},
		{
			"name": "MENACTRA",
			"qty": 318,
			"value": 319326540,
			"lots": 30,
			"minDays": 218,
			"mfr": ""
		},
		{
			"name": "VA - MENGOC - BC",
			"qty": 1590,
			"value": 282482479,
			"lots": 72,
			"minDays": 583,
			"mfr": ""
		},
		{
			"name": "Measles, Mumps and Rubella Vaccine Live, Attenuated (Freeze-Dried)",
			"qty": 1869,
			"value": 282219010,
			"lots": 38,
			"minDays": 492,
			"mfr": ""
		},
		{
			"name": "Qdenga",
			"qty": 257,
			"value": 230788988,
			"lots": 40,
			"minDays": 84,
			"mfr": ""
		},
		{
			"name": "Priorix",
			"qty": 825,
			"value": 222750125,
			"lots": 38,
			"minDays": 312,
			"mfr": ""
		},
		{
			"name": "Avaxim 80U",
			"qty": 471,
			"value": 215786011,
			"lots": 43,
			"minDays": 219,
			"mfr": ""
		},
		{
			"name": "Rota Teq",
			"qty": 385,
			"value": 199369980,
			"lots": 44,
			"minDays": 311,
			"mfr": ""
		},
		{
			"name": "Twinrix",
			"qty": 409,
			"value": 199083296,
			"lots": 75,
			"minDays": 158,
			"mfr": ""
		},
		{
			"name": "MMR-II",
			"qty": 467,
			"value": 162758040,
			"lots": 60,
			"minDays": 316,
			"mfr": ""
		},
		{
			"name": "Verorab 0.5ml",
			"qty": 554,
			"value": 155454488,
			"lots": 69,
			"minDays": 311,
			"mfr": ""
		},
		{
			"name": "Tetraxim",
			"qty": 305,
			"value": 128392083,
			"lots": 75,
			"minDays": 339,
			"mfr": ""
		},
		{
			"name": "Boostrix",
			"qty": 195,
			"value": 111826620,
			"lots": 42,
			"minDays": 367,
			"mfr": ""
		},
		{
			"name": "MVVAC",
			"qty": 3324,
			"value": 89384301,
			"lots": 67,
			"minDays": 147,
			"mfr": ""
		},
		{
			"name": "Barycela inj",
			"qty": 107,
			"value": 78751717,
			"lots": 32,
			"minDays": 432,
			"mfr": ""
		},
		{
			"name": "Typhim Vi (Lọ 1 liều/0.5 ml)",
			"qty": 451,
			"value": 75334934,
			"lots": 59,
			"minDays": 219,
			"mfr": ""
		},
		{
			"name": "Shingrix",
			"qty": 21,
			"value": 70895639,
			"lots": 23,
			"minDays": 145,
			"mfr": ""
		},
		{
			"name": "Morcvax (Lọ 1 liều - 1.5ml)",
			"qty": 878,
			"value": 55757656,
			"lots": 62,
			"minDays": 218,
			"mfr": ""
		},
		{
			"name": "Abhayrab 0.5ml",
			"qty": 350,
			"value": 51068861,
			"lots": 62,
			"minDays": 705,
			"mfr": ""
		},
		{
			"name": "Adacel",
			"qty": 96,
			"value": 50700624,
			"lots": 39,
			"minDays": 219,
			"mfr": ""
		},
		{
			"name": "Pneumovax 23",
			"qty": 37,
			"value": 28389065,
			"lots": 16,
			"minDays": 138,
			"mfr": ""
		},
		{
			"name": "HAVAX",
			"qty": 306,
			"value": 27136238,
			"lots": 57,
			"minDays": 339,
			"mfr": ""
		},
		{
			"name": "BCG-TCDV",
			"qty": 3599,
			"value": 25119135,
			"lots": 55,
			"minDays": 412,
			"mfr": ""
		},
		{
			"name": "Heberbiovac HB 20mcg/1ml",
			"qty": 525,
			"value": 20149884,
			"lots": 86,
			"minDays": 553,
			"mfr": ""
		},
		{
			"name": "ABRYSVO",
			"qty": 4,
			"value": 20056302,
			"lots": 2,
			"minDays": 613,
			"mfr": ""
		},
		{
			"name": "Rotavin",
			"qty": 101,
			"value": 14725004,
			"lots": 28,
			"minDays": 68,
			"mfr": ""
		},
		{
			"name": "Heberbiovac HB 10mcg/0,5ml",
			"qty": 332,
			"value": 8237170,
			"lots": 59,
			"minDays": 249,
			"mfr": ""
		},
		{
			"name": "JEEV 6mcg/0,5ml",
			"qty": 24,
			"value": 7969499,
			"lots": 10,
			"minDays": 553,
			"mfr": ""
		},
		{
			"name": "Gardasil",
			"qty": 5,
			"value": 7547999,
			"lots": 6,
			"minDays": 78,
			"mfr": ""
		},
		{
			"name": "Gene-HBvax (Lọ 1ml)",
			"qty": 289,
			"value": 4945702,
			"lots": 65,
			"minDays": 249,
			"mfr": ""
		},
		{
			"name": "Jevax (Lọ 1 liều 1ml)",
			"qty": 262,
			"value": 4544452,
			"lots": 51,
			"minDays": 218,
			"mfr": ""
		},
		{
			"name": "Quimi-Hib",
			"qty": 111,
			"value": 4421608,
			"lots": 50,
			"minDays": 249,
			"mfr": ""
		},
		{
			"name": "JEEV 3mcg/0,5ml",
			"qty": 49,
			"value": 1242150,
			"lots": 23,
			"minDays": 553,
			"mfr": ""
		},
		{
			"name": "SAT 1500IU",
			"qty": 444,
			"value": 11356,
			"lots": 58,
			"minDays": 77,
			"mfr": ""
		},
		{
			"name": "Gene-HBvax (Lọ 0.5ml)",
			"qty": 194,
			"value": 9133,
			"lots": 46,
			"minDays": 188,
			"mfr": ""
		},
		{
			"name": "VAT (ống 1 liều)",
			"qty": 587,
			"value": 7594,
			"lots": 66,
			"minDays": 363,
			"mfr": ""
		}
	],
	items: [
		{
			"center": "NL",
			"name": "Vaxneuvance",
			"lot": "Z006533",
			"price": 1381800,
			"expiry": "2027-09-27",
			"daysLeft": 550,
			"mfr": "MSD",
			"qty": 163,
			"value": 225233400
		},
		{
			"center": "NL",
			"name": "Bexsero",
			"lot": "ABXF05AC",
			"price": 1445780,
			"expiry": "2027-06-07",
			"daysLeft": 438,
			"mfr": "GSK",
			"qty": 76,
			"value": 109879257
		},
		{
			"center": "NL",
			"name": "MENACTRA",
			"lot": "U8598AC",
			"price": 969760,
			"expiry": "2026-10-30",
			"daysLeft": 218,
			"mfr": "Sanofi Pasteur S.A - Pháp",
			"qty": 109,
			"value": 105703840
		},
		{
			"center": "PY",
			"name": "MenQuadfi",
			"lot": "U8464AD",
			"price": 1455300,
			"expiry": "2028-06-27",
			"daysLeft": 824,
			"mfr": "Sanofi Pasteur Inc.-USA",
			"qty": 57,
			"value": 82952100
		},
		{
			"center": "PY",
			"name": "Gardasil 9",
			"lot": "Z006720",
			"price": 2726850,
			"expiry": "2027-10-05",
			"daysLeft": 558,
			"mfr": "Mỹ",
			"qty": 30,
			"value": 81805500
		},
		{
			"center": "TD",
			"name": "Hexaxim",
			"lot": "X3C222V",
			"price": 806652,
			"expiry": "2027-01-31",
			"daysLeft": 311,
			"mfr": "Sanofi Pasteur S.A - Pháp",
			"qty": 100,
			"value": 80665200
		},
		{
			"center": "TS",
			"name": "Hexaxim",
			"lot": "X3C222V",
			"price": 806652,
			"expiry": "2027-01-31",
			"daysLeft": 311,
			"mfr": "Sanofi Pasteur S.A - Pháp",
			"qty": 100,
			"value": 80665200
		},
		{
			"center": "SĐ",
			"name": "Hexaxim",
			"lot": "X3C222V",
			"price": 806652,
			"expiry": "2027-01-31",
			"daysLeft": 311,
			"mfr": "Sanofi Pasteur S.A - Pháp",
			"qty": 100,
			"value": 80665200
		},
		{
			"center": "TA",
			"name": "Hexaxim",
			"lot": "X3C222V",
			"price": 806652,
			"expiry": "2027-01-31",
			"daysLeft": 311,
			"mfr": "Sanofi Pasteur S.A - Pháp",
			"qty": 100,
			"value": 80665200
		},
		{
			"center": "LM",
			"name": "Hexaxim",
			"lot": "X3C222V",
			"price": 806652,
			"expiry": "2027-01-31",
			"daysLeft": 311,
			"mfr": "Sanofi Pasteur S.A - Pháp",
			"qty": 100,
			"value": 80665200
		},
		{
			"center": "NL",
			"name": "Hexaxim",
			"lot": "X3C222V",
			"price": 806652,
			"expiry": "2027-01-31",
			"daysLeft": 311,
			"mfr": "Sanofi Pasteur S.A - Pháp",
			"qty": 100,
			"value": 80665200
		},
		{
			"center": "TT",
			"name": "Hexaxim",
			"lot": "X3C222V",
			"price": 806652,
			"expiry": "2027-01-31",
			"daysLeft": 311,
			"mfr": "Sanofi Pasteur S.A - Pháp",
			"qty": 100,
			"value": 80665200
		},
		{
			"center": "LB",
			"name": "MENACTRA",
			"lot": "U8598AC",
			"price": 969760,
			"expiry": "2026-10-30",
			"daysLeft": 218,
			"mfr": "Sanofi Pasteur S.A - Pháp",
			"qty": 80,
			"value": 77580800
		},
		{
			"center": "ĐX",
			"name": "Hexaxim",
			"lot": "X3C222V",
			"price": 779152,
			"expiry": "2027-01-31",
			"daysLeft": 311,
			"mfr": "Sanofi Pasteur S.A - Pháp",
			"qty": 98,
			"value": 76356945
		},
		{
			"center": "LB",
			"name": "Hexaxim",
			"lot": "X3C222V",
			"price": 779152,
			"expiry": "2027-01-31",
			"daysLeft": 311,
			"mfr": "Sanofi Pasteur S.A - Pháp",
			"qty": 97,
			"value": 75577792
		},
		{
			"center": "TD",
			"name": "MenQuadfi",
			"lot": "U8725BE",
			"price": 1504912,
			"expiry": "2029-06-12",
			"daysLeft": 1,
			"mfr": "Sanofi Pasteur - Thái Lan",
			"qty": 50,
			"value": 75245625
		},
		{
			"center": "HM",
			"name": "MenQuadfi",
			"lot": "U8725BE",
			"price": 1504912,
			"expiry": "2027-06-12",
			"daysLeft": 443,
			"mfr": "Sanofi Pasteur - Thái Lan",
			"qty": 50,
			"value": 75245625
		},
		{
			"center": "QO",
			"name": "MenQuadfi",
			"lot": "U8725BE",
			"price": 1504912,
			"expiry": "2029-06-12",
			"daysLeft": 1,
			"mfr": "Sanofi Pasteur - Thái Lan",
			"qty": 50,
			"value": 75245625
		},
		{
			"center": "LB",
			"name": "MenQuadfi",
			"lot": "U8725BE",
			"price": 1504912,
			"expiry": "2029-06-12",
			"daysLeft": 1,
			"mfr": "Sanofi Pasteur Inc.-USA",
			"qty": 50,
			"value": 75245625
		},
		{
			"center": "TO",
			"name": "MenQuadfi",
			"lot": "U8725BE",
			"price": 1504912,
			"expiry": "2029-06-12",
			"daysLeft": 1,
			"mfr": "Sanofi Pasteur Inc.-USA",
			"qty": 50,
			"value": 75245625
		},
		{
			"center": "ML",
			"name": "MenQuadfi",
			"lot": "U8725BE",
			"price": 1504912,
			"expiry": "2029-06-12",
			"daysLeft": 1,
			"mfr": "Sanofi Pasteur Inc.-USA",
			"qty": 50,
			"value": 75245625
		},
		{
			"center": "TS",
			"name": "MenQuadfi",
			"lot": "U8725BE",
			"price": 1504912,
			"expiry": "2029-06-12",
			"daysLeft": 1,
			"mfr": "Sanofi Pasteur Inc.-USA",
			"qty": 50,
			"value": 75245625
		},
		{
			"center": "TP",
			"name": "MenQuadfi",
			"lot": "U8725BE",
			"price": 1504912,
			"expiry": "2029-06-12",
			"daysLeft": 1,
			"mfr": "Sanofi Pasteur Inc.-USA",
			"qty": 50,
			"value": 75245625
		},
		{
			"center": "CĐ",
			"name": "MenQuadfi",
			"lot": "U8725BE",
			"price": 1504912,
			"expiry": "2029-06-12",
			"daysLeft": 1,
			"mfr": "Sanofi Pasteur Inc.-USA",
			"qty": 50,
			"value": 75245625
		},
		{
			"center": "SĐ",
			"name": "MenQuadfi",
			"lot": "U8725BE",
			"price": 1504912,
			"expiry": "2029-06-12",
			"daysLeft": 1,
			"mfr": "Sanofi Pasteur Inc.-USA",
			"qty": 50,
			"value": 75245625
		},
		{
			"center": "BH",
			"name": "MenQuadfi",
			"lot": "U8725BE",
			"price": 1504912,
			"expiry": "2029-06-12",
			"daysLeft": 1,
			"mfr": "Sanofi Pasteur Inc.-USA",
			"qty": 50,
			"value": 75245625
		},
		{
			"center": "TĐ",
			"name": "MenQuadfi",
			"lot": "U8725BE",
			"price": 1504912,
			"expiry": "2029-06-12",
			"daysLeft": 1,
			"mfr": "Sanofi Pasteur Inc.-USA",
			"qty": 50,
			"value": 75245625
		},
		{
			"center": "TA",
			"name": "MenQuadfi",
			"lot": "U8725BE",
			"price": 1504912,
			"expiry": "2029-06-12",
			"daysLeft": 1,
			"mfr": "Sanofi Pasteur Inc.-USA",
			"qty": 50,
			"value": 75245625
		},
		{
			"center": "ĐX",
			"name": "MenQuadfi",
			"lot": "U8725BE",
			"price": 1504912,
			"expiry": "2029-06-12",
			"daysLeft": 1,
			"mfr": "Sanofi Pasteur Inc.-USA",
			"qty": 50,
			"value": 75245625
		},
		{
			"center": "LM",
			"name": "MenQuadfi",
			"lot": "U8725BE",
			"price": 1504912,
			"expiry": "2029-06-12",
			"daysLeft": 1,
			"mfr": "Sanofi Pasteur Inc.-USA",
			"qty": 50,
			"value": 75245625
		},
		{
			"center": "NL",
			"name": "MenQuadfi",
			"lot": "U8725BE",
			"price": 1504912,
			"expiry": "2029-06-12",
			"daysLeft": 1,
			"mfr": "Sanofi Pasteur Inc.-USA",
			"qty": 50,
			"value": 75245625
		},
		{
			"center": "TP",
			"name": "Hexaxim",
			"lot": "X3C222V",
			"price": 806652,
			"expiry": "2027-01-31",
			"daysLeft": 311,
			"mfr": "Sanofi Pasteur S.A - Pháp",
			"qty": 90,
			"value": 72598680
		},
		{
			"center": "CĐ",
			"name": "Hexaxim",
			"lot": "X3C222V",
			"price": 779152,
			"expiry": "2027-01-31",
			"daysLeft": 311,
			"mfr": "Sanofi Pasteur S.A - Pháp",
			"qty": 92,
			"value": 71682030
		},
		{
			"center": "ML",
			"name": "Hexaxim",
			"lot": "X3C222V",
			"price": 806652,
			"expiry": "2027-01-31",
			"daysLeft": 311,
			"mfr": "Sanofi Pasteur S.A - Pháp",
			"qty": 85,
			"value": 68565420
		},
		{
			"center": "HM",
			"name": "Hexaxim",
			"lot": "X3C222V",
			"price": 806652,
			"expiry": "2027-01-31",
			"daysLeft": 311,
			"mfr": "Sanofi Pasteur S.A - Pháp",
			"qty": 84,
			"value": 67758768
		},
		{
			"center": "SĐ",
			"name": "Bexsero",
			"lot": "ABXF67AA",
			"price": 1499327,
			"expiry": "2027-10-27",
			"daysLeft": 580,
			"mfr": "GSK",
			"qty": 45,
			"value": 67469719
		},
		{
			"center": "TĐ",
			"name": "Hexaxim",
			"lot": "X3C222V",
			"price": 779152,
			"expiry": "2027-01-31",
			"daysLeft": 311,
			"mfr": "Sanofi Pasteur S.A - Pháp",
			"qty": 82,
			"value": 63890505
		},
		{
			"center": "LB",
			"name": "Bexsero",
			"lot": "ABXF06AD",
			"price": 1499327,
			"expiry": "2027-06-13",
			"daysLeft": 444,
			"mfr": "GSK",
			"qty": 42,
			"value": 62971738
		},
		{
			"center": "TO",
			"name": "Synflorix",
			"lot": "ASPNB377AE",
			"price": 622425,
			"expiry": "2028-06-03",
			"daysLeft": 800,
			"mfr": "Glaxo SmithKline Biologicals S.A - Belgium",
			"qty": 100,
			"value": 62242504
		},
		{
			"center": "QO",
			"name": "Synflorix",
			"lot": "ASPNB377AE",
			"price": 622425,
			"expiry": "2028-06-03",
			"daysLeft": 800,
			"mfr": "Glaxo SmithKline Biologicals S.A - Belgium",
			"qty": 98,
			"value": 60997654
		},
		{
			"center": "TĐ",
			"name": "Bexsero",
			"lot": "ABXF06AD",
			"price": 1499327,
			"expiry": "2027-06-13",
			"daysLeft": 444,
			"mfr": "GSK",
			"qty": 39,
			"value": 58473756
		},
		{
			"center": "TĐ",
			"name": "Infanrix Hexa",
			"lot": "A21CE611B",
			"price": 917332,
			"expiry": "2027-06-06",
			"daysLeft": 437,
			"mfr": "GSK",
			"qty": 60,
			"value": 55039944
		},
		{
			"center": "NL",
			"name": "Infanrix Hexa",
			"lot": "A21CE611B",
			"price": 917332,
			"expiry": "2027-06-06",
			"daysLeft": 437,
			"mfr": "GSK",
			"qty": 60,
			"value": 55039944
		},
		{
			"center": "QO",
			"name": "Hexaxim",
			"lot": "X3C222V",
			"price": 779152,
			"expiry": "2027-01-31",
			"daysLeft": 311,
			"mfr": "Sanofi Pasteur S.A - Pháp",
			"qty": 70,
			"value": 54540675
		},
		{
			"center": "HM",
			"name": "Gardasil 9",
			"lot": "Z006720",
			"price": 2726850,
			"expiry": "2027-10-05",
			"daysLeft": 558,
			"mfr": "Mỹ",
			"qty": 20,
			"value": 54537e3
		},
		{
			"center": "LB",
			"name": "Gardasil 9",
			"lot": "Z006720",
			"price": 2726850,
			"expiry": "2027-10-05",
			"daysLeft": 558,
			"mfr": "Mỹ",
			"qty": 20,
			"value": 54537e3
		},
		{
			"center": "ML",
			"name": "Gardasil 9",
			"lot": "Z006720",
			"price": 2726850,
			"expiry": "2027-10-05",
			"daysLeft": 558,
			"mfr": "Mỹ",
			"qty": 20,
			"value": 54537e3
		},
		{
			"center": "TS",
			"name": "Gardasil 9",
			"lot": "Z006720",
			"price": 2726850,
			"expiry": "2027-10-05",
			"daysLeft": 558,
			"mfr": "Mỹ",
			"qty": 20,
			"value": 54537e3
		},
		{
			"center": "CĐ",
			"name": "Gardasil 9",
			"lot": "Z006720",
			"price": 2726850,
			"expiry": "2027-10-05",
			"daysLeft": 558,
			"mfr": "Mỹ",
			"qty": 20,
			"value": 54537e3
		},
		{
			"center": "SĐ",
			"name": "Gardasil 9",
			"lot": "Z006720",
			"price": 2726850,
			"expiry": "2027-10-05",
			"daysLeft": 558,
			"mfr": "Mỹ",
			"qty": 20,
			"value": 54537e3
		},
		{
			"center": "BH",
			"name": "Gardasil 9",
			"lot": "Z006720",
			"price": 2726850,
			"expiry": "2027-10-05",
			"daysLeft": 558,
			"mfr": "Mỹ",
			"qty": 20,
			"value": 54537e3
		},
		{
			"center": "ĐX",
			"name": "Gardasil 9",
			"lot": "Z006720",
			"price": 2726850,
			"expiry": "2027-10-05",
			"daysLeft": 558,
			"mfr": "Mỹ",
			"qty": 20,
			"value": 54537e3
		},
		{
			"center": "LM",
			"name": "Gardasil 9",
			"lot": "Z006720",
			"price": 2726850,
			"expiry": "2027-10-05",
			"daysLeft": 558,
			"mfr": "Mỹ",
			"qty": 20,
			"value": 54537e3
		},
		{
			"center": "TT",
			"name": "Infanrix Hexa",
			"lot": "A21CE611B",
			"price": 917332,
			"expiry": "2027-06-06",
			"daysLeft": 437,
			"mfr": "GSK",
			"qty": 59,
			"value": 54122611
		},
		{
			"center": "SĐ",
			"name": "Infanrix Hexa",
			"lot": "A21CE611A",
			"price": 917332,
			"expiry": "2027-06-06",
			"daysLeft": 437,
			"mfr": "GSK",
			"qty": 57,
			"value": 52287947
		},
		{
			"center": "TP",
			"name": "Gardasil 9",
			"lot": "Z006658",
			"price": 2726850,
			"expiry": "2027-10-03",
			"daysLeft": 556,
			"mfr": "Mỹ",
			"qty": 19,
			"value": 51810150
		},
		{
			"center": "BH",
			"name": "Hexaxim",
			"lot": "X3C222V",
			"price": 779152,
			"expiry": "2027-01-31",
			"daysLeft": 311,
			"mfr": "Sanofi Pasteur S.A - Pháp",
			"qty": 66,
			"value": 51424065
		},
		{
			"center": "TO",
			"name": "Prevenar 20",
			"lot": "MF8919",
			"price": 1371006,
			"expiry": "2027-01-21",
			"daysLeft": 301,
			"mfr": "Pfizer Manufacturing Belgium NV",
			"qty": 37,
			"value": 50727222
		},
		{
			"center": "HM",
			"name": "Infanrix Hexa",
			"lot": "A21CE611B",
			"price": 917332,
			"expiry": "2027-06-06",
			"daysLeft": 437,
			"mfr": "GSK",
			"qty": 55,
			"value": 50453282
		},
		{
			"center": "PY",
			"name": "Synflorix",
			"lot": "ASPNB377AE",
			"price": 622425,
			"expiry": "2028-06-03",
			"daysLeft": 800,
			"mfr": "Glaxo SmithKline Biologicals S.A - Belgium",
			"qty": 79,
			"value": 49171578
		},
		{
			"center": "TD",
			"name": "Gardasil 9",
			"lot": "Z006658",
			"price": 2726850,
			"expiry": "2027-10-03",
			"daysLeft": 556,
			"mfr": "Mỹ",
			"qty": 18,
			"value": 49083300
		},
		{
			"center": "ĐX",
			"name": "Bexsero",
			"lot": "ABXF05AC",
			"price": 1514626,
			"expiry": "2027-06-07",
			"daysLeft": 438,
			"mfr": "GSK",
			"qty": 31,
			"value": 46953417
		},
		{
			"center": "TS",
			"name": "Infanrix Hexa",
			"lot": "A21CE611A",
			"price": 917332,
			"expiry": "2027-06-06",
			"daysLeft": 437,
			"mfr": "GSK",
			"qty": 51,
			"value": 46783952
		},
		{
			"center": "TA",
			"name": "Infanrix Hexa",
			"lot": "A21CE611A",
			"price": 917332,
			"expiry": "2027-06-06",
			"daysLeft": 437,
			"mfr": "GSK",
			"qty": 51,
			"value": 46783952
		},
		{
			"center": "QO",
			"name": "Varivax",
			"lot": "Z002475",
			"price": 892910,
			"expiry": "2027-01-07",
			"daysLeft": 287,
			"mfr": "MSD",
			"qty": 50,
			"value": 44645482
		},
		{
			"center": "PY",
			"name": "Varivax",
			"lot": "Z002475",
			"price": 892910,
			"expiry": "2027-01-07",
			"daysLeft": 287,
			"mfr": "MSD",
			"qty": 50,
			"value": 44645482
		},
		{
			"center": "TS",
			"name": "Varivax",
			"lot": "Z002475",
			"price": 892910,
			"expiry": "2027-01-07",
			"daysLeft": 287,
			"mfr": "MSD",
			"qty": 50,
			"value": 44645482
		},
		{
			"center": "ĐX",
			"name": "Varivax",
			"lot": "Z002475",
			"price": 892910,
			"expiry": "2027-01-07",
			"daysLeft": 287,
			"mfr": "MSD",
			"qty": 50,
			"value": 44645482
		},
		{
			"center": "LM",
			"name": "Varivax",
			"lot": "Z002475",
			"price": 892910,
			"expiry": "2027-01-07",
			"daysLeft": 287,
			"mfr": "MSD",
			"qty": 50,
			"value": 44645482
		},
		{
			"center": "TT",
			"name": "Prevenar 13",
			"lot": "LP6973",
			"price": 1088640,
			"expiry": "2027-05-24",
			"daysLeft": 424,
			"mfr": "Pfizer Anh",
			"qty": 41,
			"value": 44634240
		},
		{
			"center": "TO",
			"name": "Gardasil 9",
			"lot": "Z006658",
			"price": 2726850,
			"expiry": "2027-10-03",
			"daysLeft": 556,
			"mfr": "Mỹ",
			"qty": 16,
			"value": 43629600
		},
		{
			"center": "TĐ",
			"name": "Gardasil 9",
			"lot": "Z006720",
			"price": 2726850,
			"expiry": "2027-10-05",
			"daysLeft": 558,
			"mfr": "Mỹ",
			"qty": 16,
			"value": 43629600
		},
		{
			"center": "PY",
			"name": "Influvac Tetra",
			"lot": "L54",
			"price": 214571,
			"expiry": "2026-11-30",
			"daysLeft": 249,
			"mfr": "Hà Lan",
			"qty": 200,
			"value": 42914262
		},
		{
			"center": "LB",
			"name": "Influvac Tetra",
			"lot": "L54",
			"price": 214571,
			"expiry": "2026-11-30",
			"daysLeft": 249,
			"mfr": "Hà Lan",
			"qty": 199,
			"value": 42699691
		},
		{
			"center": "ĐX",
			"name": "Influvac Tetra",
			"lot": "L54",
			"price": 214571,
			"expiry": "2026-11-30",
			"daysLeft": 249,
			"mfr": "Hà Lan",
			"qty": 199,
			"value": 42699691
		},
		{
			"center": "TĐ",
			"name": "Influvac Tetra",
			"lot": "L54",
			"price": 214571,
			"expiry": "2026-11-30",
			"daysLeft": 249,
			"mfr": "Hà Lan",
			"qty": 197,
			"value": 42270548
		},
		{
			"center": "CĐ",
			"name": "Infanrix Hexa",
			"lot": "A21CE611A",
			"price": 917332,
			"expiry": "2027-06-06",
			"daysLeft": 437,
			"mfr": "GSK",
			"qty": 46,
			"value": 42197290
		},
		{
			"center": "CĐ",
			"name": "Varivax",
			"lot": "Z002475",
			"price": 892910,
			"expiry": "2027-01-07",
			"daysLeft": 287,
			"mfr": "MSD",
			"qty": 47,
			"value": 41966753
		},
		{
			"center": "BH",
			"name": "Prevenar 13",
			"lot": "MA2521",
			"price": 1065960,
			"expiry": "2027-07-07",
			"daysLeft": 468,
			"mfr": "Pfizer Anh",
			"qty": 39,
			"value": 41572440
		},
		{
			"center": "QO",
			"name": "Gardasil 9",
			"lot": "Z006720",
			"price": 2726850,
			"expiry": "2027-10-05",
			"daysLeft": 558,
			"mfr": "Mỹ",
			"qty": 15,
			"value": 40902750
		},
		{
			"center": "TT",
			"name": "MenQuadfi",
			"lot": "U8725BE",
			"price": 1521450,
			"expiry": "2029-06-12",
			"daysLeft": 1,
			"mfr": "Sanofi Pasteur Inc.-USA",
			"qty": 10,
			"value": 15214500
		}
	]
};
var notes_default = /*#__PURE__*/ JSON.parse("[{\"id\":\"SVBUutqbvn4iM4KIVmRNQ6\",\"stt\":1.0,\"date\":\"2024-10-01\",\"content\":\"Quy trình xây dựng App\",\"author\":\"Mr Cường\",\"deploy\":\"Mr Cường\",\"deadline\":\"2024-10-16\",\"support\":\"Mr Cường\",\"dept\":\"Hệ thống\",\"status\":\"Đang làm\"},{\"id\":\"04wwBHobjm4SMUCYi7nnY3\",\"stt\":2.0,\"date\":\"2024-10-01\",\"content\":\"Sửa app ngày tạo cố định là today\",\"author\":\"Mr Cường\",\"deploy\":\"Mr Cường\",\"deadline\":\"2024-10-16\",\"support\":\"\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"Fdz-5kTKnU4hae0kAWU5S9\",\"stt\":3.0,\"date\":\"2024-10-01\",\"content\":\"Tạo app tổng cho Thái Sơn và Thăng Long\",\"author\":\"Mr Cường\",\"deploy\":\"Mr Cường\",\"deadline\":\"2024-10-16\",\"support\":\"Mr Cường\",\"dept\":\"Hệ thống\",\"status\":\"Xong\"},{\"id\":\"CfcCcxJRSl3SAyBO2t1aX8\",\"stt\":4.0,\"date\":\"2024-10-01\",\"content\":\"Hàm trừ ngày trong app\\nTRIM(\\nIF(ISBLANK([Ngày giờ tạo]),\\\"\\\",\\nIFS(TOTALHOURS([Cập nhật lần cuối]-[Ngày giờ tạo])>=24,\\nFLOOR(TOTALHOURS([Cập nhật lần cuối]-[Ngày giờ tạo])/24)&\\\" ngày \\\")\\n&\\nIFS(TOTALHOURS([Cập nhật lần cuối]-[Ngày giờ tạo])>=1,\\nFLOOR(mod(TOTALHOURS([Cập nhật lần cuối]-[Ngày giờ tạo]),24))&\\\" giờ \\\")\\n&\\nFLOOR(mod(MINUTE([Cập nhật lần cuối]-[Ngày giờ tạo]),1440))&\\\" phút \\\"\\n))\",\"author\":\"Mr Cường\",\"deploy\":\"Mr Cường\",\"deadline\":\"2024-10-16\",\"support\":\"Mr Cường\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"2lxPip09qFkL9EvBGyXOM2\",\"stt\":5.0,\"date\":\"2024-10-01\",\"content\":\"Phâ quyền https://gitiho.com/blog/cach-cai-dat-bao-mat-cho-ung-dung-trong-appsheet.html\",\"author\":\"Mr Cường\",\"deploy\":\"Mr Cường\",\"deadline\":\"2024-10-16\",\"support\":\"\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"8SRWxHkh5cs29xhFQqB567\",\"stt\":6.0,\"date\":\"2024-10-01\",\"content\":\"Phân quyền Home user: AND(ISNOTBLANK(USERSETTINGS(Tên đăng nhập)),\\nLOOKUP(USERSETTINGS(Tên đăng nhập),\\\"Table 2\\\",\\\"Họ tên\\\",\\\"Mật khẩu đăng ký\\\")=USERSETTINGS(Mật khẩu),\\n\\n\\n\\nLOOKUP(USERSETTINGS(Tên đăng nhập),\\\"Table 2\\\",\\\"Họ tên\\\",\\\"Phân quyền\\\")=\\\"User\\\"\\n\\n\\n)\",\"author\":\"Mr Cường\",\"deploy\":\"Mr Cường\",\"deadline\":\"2024-10-16\",\"support\":\"\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"kr1MrXnrQpsP90mYvTiwnQ\",\"stt\":7.0,\"date\":\"2024-10-02\",\"content\":\"Phân quyền sử dụng: \\nAND(ISNOTBLANK(USERSETTINGS(Tên đăng nhập)),\\n\\nLOOKUP(USERSETTINGS(Tên đăng nhập),\\\"Table 2\\\",\\\"Họ tên\\\",\\\"Mật khẩu đăng ký\\\")=USERSETTINGS(Mật khẩu),\\n\\nUSERSETTINGS(Tên đăng nhập)=[Họ tên người tạo]\\n)\\n\\n\\n\\n\\n\\n\\nAND(ISNOTBLANK(USERSETTINGS(Tên đăng nhập)),\\n\\nLOOKUP(USERSETTINGS(Tên đăng nhập),\\\"Table 2\\\",\\\"Họ tên\\\",\\\"Mật khẩu đăng ký\\\")=USERSETTINGS(Mật khẩu),\\n\\nLOOKUP(USERSETTINGS(Tên đăng nhập)\",\"author\":\"Mr Cường\",\"deploy\":\"\",\"deadline\":\"2024-10-09\",\"support\":\"Mr Cường\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"FiI6vS1Y1gtmaDiuSIicJV\",\"stt\":8.0,\"date\":\"2024-10-10\",\"content\":\"Triển khai sản phẩm mới vay vốn ngân hàng tín chấp\\nĐiều kiện khách hàng là doanh nghiệp tiếp cận dịch vụ\\n1. Có nhu cầu vay vốn tín chấp từ các tổ chức tín dụng chính thống (bank, quỹ được hoạt động hợp pháp tại VN)\\n2. Doanh nghiệp hoạt động được > 2 năm tuổi \\n3. Doanh thu năm gần nhất >10tỷ \\n4. CIC cam kết sạch (doanh nghiệp và các thành viên trong công tỷ)\\n5. Loại trừ các doanh nghiệp có ngành ng\",\"author\":\"Mr Cường\",\"deploy\":\"Toàn hệ thống\",\"deadline\":\"2024-10-17\",\"support\":\"Trung Dũng Chủ Tịch\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"1JGM3FiViZraK3qWZmX5uv\",\"stt\":9.0,\"date\":\"2024-10-10\",\"content\":\"Thưởng Kpi cho nhân viên đối với sản phẩm tài chính vay tín chấp\\n1. Thưởng 150.000/1 bộ hồ sơ đủ tiêu chuẩn vay vốn. (Thành công vậy được hay không vay được)\\n2. Thưởng theo sản phẩm thành công (+150k)\\n2.1. Giải ngân thành công dưới 2 tỷ\\nTừ 300 triệu đến 1,9 tỷ: thưởng 1 triệu\\nTừ 2tỷ phí 10%: thưởng: 2 triệu\\nTăng tỷ lệ phí 11%: 3triệu\\nTăng tỷ lệ phí 12%: 5triệu\\nTăng tỷ lệ phí 13% trở lên: 10triệu\\n2\",\"author\":\"Mr Cường\",\"deploy\":\"Toàn hệ thống\",\"deadline\":\"2024-10-17\",\"support\":\"Vũ Đình Văn\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"m6A7ccfOearpMgUcK5s2bY\",\"stt\":10.0,\"date\":\"2024-10-11\",\"content\":\"Quy trình xử lý hồ sơ vay vốn tín chấp \\n1. Tập hợp hồ sơ khách hàng \\n2. Tạo nhóm thẩm định hồ sơ\\n3. Đàm phán trực tiếp với khách hàng\\n4. Tạo nhóm thực hiện công việc giữa khách và bank\\n5. Nhận tín hiệu từ bank về thẩm định phê duyệt hồ sơ vay vốn\\n6. Khách thực hiện hồ sơ giải ngân\\n7. Khách mua bảo hiểm khoản vay (tùy từng bank, tổ chức tín dụng)\\n8. Bank giải ngân và khách trả tiền phí như thỏa thu\",\"author\":\"Mr Cường\",\"deploy\":\"Toàn hệ thống\",\"deadline\":\"2024-10-18\",\"support\":\"Vũ Đình Văn\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"7v7bGR4T9DlQJhB9ZR9q1E\",\"stt\":11.0,\"date\":\"2024-10-11\",\"content\":\"Tóm tắt nội dung làm việc với khách Thực Phẩm của Mr Koi\",\"author\":\"Mr Cường\",\"deploy\":\"Thái Sơn\",\"deadline\":\"2024-10-18\",\"support\":\"Trung Dũng Chủ Tịch , Vũ Tâm CEO , Vũ Đình Văn\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"5XdgAbmVwlaL5YNWeJFMUo\",\"stt\":12.0,\"date\":\"2024-10-13\",\"content\":\"Trạng thái của một công việc có thể được mô tả qua nhiều tiêu chí khác nhau. Dưới đây là các trạng thái chính mà một công việc có thể trải qua:\\n\\n1. **Chưa bắt đầu**: Có hồ sơ khách hàng nhưng chưa gửi. Công việc chưa được khởi động, có thể do chưa đủ nguồn lực hoặc thông tin.\\n\\n2. **Đang thực hiện**: Đã gửi hồ sơ. Công việc đã được khởi động và đang trong quá trình thực hiện.\\n\\n3. **Tạm dừng**: Công\",\"author\":\"Mr Cường\",\"deploy\":\"Thăng Long\",\"deadline\":\"2024-10-20\",\"support\":\"\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"9OWgyoJIz0LIvtoyciO6XC\",\"stt\":13.0,\"date\":\"2024-10-15\",\"content\":\"IFS(\\n  AND([Age] > 18, [Country] = \\\"Vietnam\\\"), \\\"Adult in Vietnam\\\",\\n  AND([Age] > 18, [Country] = \\\"USA\\\"), \\\"Adult in USA\\\",\\n  TRUE, \\\"Other\\\"\\n)\\n\\n\\n\\nIFS(\\n  AND(ISBLANK([Age]), ISBLANK([Country])), \\\"Missing Info\\\",\\n  AND([Age] > 18, [Country] = \\\"Vietnam\\\"), \\\"Adult in Vietnam\\\",\\n  TRUE, \\\"Other\\\"\\n)\\n\\n\\nIFS(\\nAND(ISNOTBLANK([Ngày bắt đầu gửi hồ sơ]),ISNOTBLANK([Ngày khách trả tiền phí])),\\\"Hoàn thành\\\",\\nAND(ISNOTBLAN\",\"author\":\"Mr Cường\",\"deploy\":\"Appsheet\",\"deadline\":\"2024-10-22\",\"support\":\"\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"GOK23P2Xo2lm13eXuYGQzD\",\"stt\":14.0,\"date\":\"2024-10-15\",\"content\":\"Xét duyệt BCTC \\nĐể ý các chỉ tiêu sử dụng vốn hiệu quả của doanh nghiệp\\nTổng tài sản > Tổng nguồn vốn\\nTổng tài sản = Tiền và các vật ngang tiền + các khoản phải thu + các khoản trả trước cho người bán + hàng tồn kho + tài sản khác \\nTổng nguồn vốn = Phải trả người bán + Người mua trả tiền trước + Phải trả khác + Vay và nợ thuê tài chính\",\"author\":\"Mr Cường\",\"deploy\":\"Thăng Long\",\"deadline\":\"2024-10-22\",\"support\":\"\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"1PmlwQT9rJ4fZHUVQ9GOUA\",\"stt\":15.0,\"date\":\"2024-10-19\",\"content\":\"Tóm tắt nội dung làm việc với Mr Vạn _ Duyên (đại diện cho 2 Cty Horison - Mình Đức) (Bên A)  với Thái Sơn (Bên B) ngày 17/10/2024\\nHợp tác kinh doanh trên cơ sở. Bên A có tài sản là BĐS đang cầm cố, hoặc chưa cầm cố tại Bank mong muốn dùng tài sản để kinh doanh hàng thực phẩm cùng Bên B. \\nPhương thức cụ thể: theo file đính kèm\",\"author\":\"Mr Cường\",\"deploy\":\"Thái Sơn\",\"deadline\":\"2024-10-26\",\"support\":\"Thu Trang , Flora- Thuỳ Trang , Vũ Đình Văn\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"FDFQM2hDL66s3pfUBvvecZ\",\"stt\":16.0,\"date\":\"2024-10-28\",\"content\":\"Vay vốn tín chấp từ quỹ tín dụng quốc tế tại Việt Nam\\nM : File nộp quỹ\\n1/ Điền mẫu đơn xin vay (2 bản)\\n2/ giấy phép kinh doanh (công chứng) \\n3/ Báo cáo tài chính 2 năm gần nhất ( bc t/ c không lỗ, cty hoạt động bt)\\n4/ cccd chủ doanh nghiệp [ photo 2 bản công chứng] có chữ ký \\n5/cccd kế toán trưởng [ photo 2 bản công chứng) có chữ ký \\n6/ hạn mức tín dụng doanh nghiệp còn hạn\\n7/ quyết định bổ nhiệm \",\"author\":\"Mr Cường\",\"deploy\":\"Từ T11-12/2024 Thăng Long\",\"deadline\":\"2024-11-04\",\"support\":\"Vũ Đình Văn\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"yVFW6Bqrb6buOZHwTGHs3N\",\"stt\":17.0,\"date\":\"2024-11-14\",\"content\":\"Hồ sơ khảo sát nhà máy Mr Hưng Công ty CP Thủy Sản Hồng Phúc Mỹ Tho Tiền Giang\\n1. Hồ sơ pháp lý\\n- Đăng ký kinh doanh từ lần đầu đến lần cuối (các thay đổi điều chỉnh)\\n- Danh sách cổ đông, người đại diện pháp luật, vốn góp\\n- Điều lệ công ty\\n- CCCD của các thành viên\\n- Cơ cấu tổ chức các bộ phận phòng ban, nhà máy chức năng nhiệm vụ\\n2. Hồ sơ tài chính\\n- Báo cáo tài chính 3 năm gần nhất (Báo cáo nộp \",\"author\":\"Mr Cường\",\"deploy\":\"\",\"deadline\":\"2024-11-21\",\"support\":\"\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"gIkktlJ82FPiicXG25QvFV\",\"stt\":18.0,\"date\":\"2024-11-25\",\"content\":\"Tỷ suất lợi nhuận gộp = (giá bán - giá mua)/giá bán\\nDoanh thu hoà vốn = chi phí cố định / tỷ suất lợi nhuận gộp\\nDoanh thu hoàn vốn = (chi phí đầu tư + chi phí cố định)/ tỷ suất lợi nhuận gộp\",\"author\":\"Mr Cường\",\"deploy\":\"Thái Sơn\",\"deadline\":\"2024-12-02\",\"support\":\"Trung Dũng Chủ Tịch , Vũ Tâm CEO\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"X8Jrng6NFmPwbJshAjUWE5\",\"stt\":19.0,\"date\":\"2024-11-29\",\"content\":\"Hồi quy tuyến tính là gì? Cách sử dụng \\nY là đầu ra hay doanh thu \\nY = alpha + beta x X + efsilon \\nX là ẩn cần tìm \\nEfsilon là Sai số\\nAlpha và beta là hệ số quan hệ giữa X và Y\",\"author\":\"Mr Cường\",\"deploy\":\"Tìm cách mua nhà máy\",\"deadline\":\"2024-12-06\",\"support\":\"\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"x27m8iStoH1tem441bve51\",\"stt\":20.0,\"date\":\"2024-12-14\",\"content\":\"Nội dung cuộc họp nhanh giữa Thái Sơn và Nafta\\nThành phần Thái Sơn: Mr Dũng, Mrs Tâm, Mr Tùng, Mr Minh, Mr Cường\\nThành phần Nafta: Mr Tùng (Mb), Mrs Đăng (PT KD), Mrs Trang (XNK), Mr Tấn (KTT), Mr Tú (Tài Chính)\\n1. Mua bán hàng thương mại (Nafta nhập khẩu) bán cho Thái Sơn (CIF). Thái Sơn bán cho khách. Phí dòng tiền ??? đến tuần sau thương lượng cụ thể không < 7% lãi vay bank\\n2. Cty Lộc An + Naft\",\"author\":\"Mr Cường\",\"deploy\":\"Hệ thống Thái Sơn\",\"deadline\":\"2024-12-21\",\"support\":\"Trung Dũng Chủ Tịch , Vũ Đình Tùng\",\"dept\":\"Hệ thống\",\"status\":\"Xong\"},{\"id\":\"yaN4Vj7nvwlBLay1fcNItX\",\"stt\":21.0,\"date\":\"2024-12-16\",\"content\":\"Code hàm tính ngày giờ\",\"author\":\"Mr Cường\",\"deploy\":\"App Sheet\",\"deadline\":\"2024-12-23\",\"support\":\"\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"YlyntpqeAccm46EvqNj5ds\",\"stt\":22.0,\"date\":\"2024-12-23\",\"content\":\"Cho thuê hoặc bán hạn mức LC giống Mr  Ngộ và Mrs Ánh Liên Việt \\n1. Bán hạn mức là bán công ty có hạn mức sẵn nhưng chưa có tài sản đảm bảo, chưa vay vốn hoặc vay đã trả hết\\n2. Cho thuê hạn mức giống váy ké tài sản nhưng khác ở chỗ gì nhỉ\\nCho khách dùng tài sản đảm bảo sáng tên cho CTY hoặc ủy quyền toàn bộ để cầm cố thế chấp bank\\nTỷ lệ Mr Ngộ CTY cho thuê hạn mức dùng tài sản của bên thuê làm tài\",\"author\":\"\",\"deploy\":\"\",\"deadline\":\"2024-12-30\",\"support\":\"\",\"dept\":\"\",\"status\":\"Mới\"},{\"id\":\"027fffd5\",\"stt\":23.0,\"date\":\"2025-09-04\",\"content\":\"Gia nhập đội tư vấn tài chính thẻ tín dụng Tâm làm đội trưởng\",\"author\":\"cuongpk.tl1@gmail.com\",\"deploy\":\"Tâm cùng cộng sự\",\"deadline\":\"2025-09-11\",\"support\":\"\",\"dept\":\"\",\"status\":\"Mới\"},{\"id\":\"53afda41\",\"stt\":24.0,\"date\":\"2025-09-14\",\"content\":\"Giới thiệu và Hướng dẫn sử dụng\\n1. Giới thiệu App\\n- Đây là Appsheet 1 sản phẩm của Google phát triển từ GoogleSheet tạo thành App sử dụng trên điện thoại, máy tính bảng và Windows.\\n- Người tạo ra App này là Mr Cường sau khi lướt Ticktock quá 180 phút và lấy ý tưởng số hoá doanh nghiệp\\n- App này được tổng hợp từ nhiều Appsheet khác nhau do chỉ sử dụng phiên bản miễn phí. Các Appsheet riêng lẻ được \",\"author\":\"Phạm Kiên Cường\",\"deploy\":\"\",\"deadline\":\"2025-09-21\",\"support\":\"A D M , CườngPK , NV_Kế toán , NV_Kinh doanh , Nguyễn Đức Gia Mạnh , Nguyễn Đức Minh , Cao Quốc Thắng , Thu Trang , ThanhNK , Trung Dũng Chủ Tịch , Nguyễn Loan\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"9943cd21\",\"stt\":25.0,\"date\":\"2025-09-14\",\"content\":\"- Các công việc mà tổng thể nhân sự phải thực hiện:\\n+ Chấm công quá Module: Timekeeping. Báo gồm khi chấm công vào ca lúc bắt đầu làm việc và chấm công tan ca lúc xong việc. Yêu cầu có chụp ảnh chân dung và đặt định vị cho điện thoại. Chấm công chỉ được dùng 2 lần trong ngày là lúc vào và lúc ra. Phần mềm sẽ tự động link đến bảng lương để trả lương cuối kỳ.\\nMột vài trường hợp đặc biệt như xin nghỉ\",\"author\":\"Phạm Kiên Cường\",\"deploy\":\"\",\"deadline\":\"2025-09-21\",\"support\":\"A D M , CườngPK , NV_Kế toán , NV_Kinh doanh , Nguyễn Đức Gia Mạnh , Nguyễn Đức Minh , Cao Quốc Thắng , Thu Trang , ThanhNK , Trung Dũng Chủ Tịch , Nguyễn Loan\",\"dept\":\"\",\"status\":\"Mới\"},{\"id\":\"ea6257d7\",\"stt\":26.0,\"date\":\"2025-09-14\",\"content\":\"Module: Notification là một dạng thông báo đến các bộ phận. Phần này dùng để cho quyền Admin lập thông báo đến các bộ phận để triển khai công việc. User chỉ có quyền đọc không có quyền xoá, sửa, thêm mới\",\"author\":\"Phạm Kiên Cường\",\"deploy\":\"Hệ thống\",\"deadline\":\"2025-09-21\",\"support\":\"A D M , CườngPK , NV_Kế toán , NV_Kinh doanh , Nguyễn Đức Gia Mạnh , Nguyễn Đức Minh , Cao Quốc Thắng , Thu Trang , ThanhNK , Trung Dũng Chủ Tịch , Nguyễn Loan\",\"dept\":\"\",\"status\":\"Mới\"},{\"id\":\"9c75c843\",\"stt\":27.0,\"date\":\"2025-09-14\",\"content\":\"Module Chat\\nCác thành viên có thể thông qua Module này để trao đổi thông tin trong hệ thống cùng cấp hoặc gửi cho nhóm, gửi tất cả như một phần mềm chat bình thường \\nDữ liệu được lưu lại để Admin kiểm soát và đối chứng khi cần thiết\",\"author\":\"Phạm Kiên Cường\",\"deploy\":\"Hệ thống\",\"deadline\":\"2025-09-21\",\"support\":\"A D M , CườngPK , NV_Kế toán , NV_Kinh doanh , Nguyễn Đức Gia Mạnh , Nguyễn Đức Minh , Cao Quốc Thắng , Thu Trang , ThanhNK , Trung Dũng Chủ Tịch , Nguyễn Loan\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"3458fe66\",\"stt\":28.0,\"date\":\"2025-09-14\",\"content\":\"Module File\\nCác nhân sự dùng phần này để thêm tài liệu hoặc trả cứu các tài liệu hồ sơ của công ty. \\nNó được phân loại theo các công ty và các bộ phận của từng công tỷ\\nChỉ có thể thêm mới và xem không có quyền sửa, xoá\",\"author\":\"Phạm Kiên Cường\",\"deploy\":\"Hệ thống\",\"deadline\":\"2025-09-21\",\"support\":\"A D M , CườngPK , NV_Kế toán , NV_Kinh doanh , Nguyễn Đức Gia Mạnh , Nguyễn Đức Minh , Cao Quốc Thắng , Thu Trang , ThanhNK , Trung Dũng Chủ Tịch , Nguyễn Loan\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"31ea7e21\",\"stt\":29.0,\"date\":\"2025-09-14\",\"content\":\"Module Add\\nPhần này được phân loạ theo quyền sử dụng là Hệ thống và các bộ phận như kế toán, kinh doanh, tài chính\\n1. Toàn thể nhân sự của Hệ thống lập kế hoạch, mục tiêu trong tuần, trong tháng vào mục thêm kế hoạch, mục tiêu\\n2. Phần đề xuất góp ý như: đề xuất nhân sự. Xin nghỉ, làm thêm giờ, tăng cả ngày lễ.... Nhân viên lập và quản lý duyệt \\n3. Phần đề xuất thu chi, nhập xuất bán hàng nhập hàng\",\"author\":\"Phạm Kiên Cường\",\"deploy\":\"Hệ thống\",\"deadline\":\"2025-09-21\",\"support\":\"A D M , CườngPK , NV_Kế toán , NV_Kinh doanh , Nguyễn Đức Gia Mạnh , Nguyễn Đức Minh , Cao Quốc Thắng , Thu Trang , ThanhNK , Trung Dũng Chủ Tịch , Nguyễn Loan\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"95436ecd\",\"stt\":30.0,\"date\":\"2025-09-14\",\"content\":\"Toàn bộ các Appsheet đều có phím điều hướng đến App tổng bằng bàn tay chỉ ngón trỏ. Khi ấn vào sẽ đưa về trang Add của Appsheet tổng\\nCác công việc hàng ngày\\n1. Chấm công\\n2. Check kế hoạch cũ và Lập kế hoạch mới\\n3. Tùy từng chức năng nhiệm vụ của từng nhân sự để vào Module nghiệp vụ làm việc \\n4. Góp ý và ghi chú vào Module riêng để thực hiện\\n5. Khó khăn trong quá trình sử dụng nhắn tin hoặc gọi số \",\"author\":\"Phạm Kiên Cường\",\"deploy\":\"Hệ thống\",\"deadline\":\"2025-09-21\",\"support\":\"A D M , CườngPK , NV_Kế toán , NV_Kinh doanh , Nguyễn Đức Gia Mạnh , Nguyễn Đức Minh , Cao Quốc Thắng , Thu Trang , ThanhNK , Trung Dũng Chủ Tịch , Nguyễn Loan\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"0e06bb5c\",\"stt\":31.0,\"date\":\"2025-09-14\",\"content\":\"Do App tổng được liên kết với các App độc lập nên ngôn ngữ bị bất đồng lúc vui tôi viết tiếng Anh. Lúc buồn tôi viết Tiếng Việt. Người sử dụng thông cảm nhé\",\"author\":\"Phạm Kiên Cường\",\"deploy\":\"Hệ thống\",\"deadline\":\"2025-09-21\",\"support\":\"A D M , CườngPK , NV_Kế toán , NV_Kinh doanh , Nguyễn Đức Gia Mạnh , Nguyễn Đức Minh , Cao Quốc Thắng , Thu Trang , ThanhNK , Trung Dũng Chủ Tịch , Nguyễn Loan\",\"dept\":\"Hệ thống\",\"status\":\"Mới\"},{\"id\":\"d8bd6ba8\",\"stt\":32.0,\"date\":\"2025-09-22\",\"content\":\"Xây dựng phân quyền viewer chỉ cho đối tượng được quyền xem, không xóa, không sửa, không thêm mới \\nSửa lại quyền admin cho Cường với quyền administrator sửa xóa….\",\"author\":\"Phạm Kiên Cường\",\"deploy\":\"\",\"deadline\":\"2025-09-29\",\"support\":\"\",\"dept\":\"\",\"status\":\"Mới\"},{\"id\":\"e8288fd3\",\"stt\":33.0,\"date\":\"2026-04-09\",\"content\":\"Nhắc nhở Team hoàn thành kế hoạch trong tuần vào T2 đầu tuần. Hoặc khi có phát sinh nhiệm vụ mới\",\"author\":\"Phạm Kiên Cường\",\"deploy\":\"\",\"deadline\":\"2026-04-16\",\"support\":\"\",\"dept\":\"\",\"status\":\"Mới\"}]");
var tasks_default = /*#__PURE__*/ JSON.parse("[{\"id\":\"36fa0422\",\"assignee\":\"CườngPK\",\"title\":\"Họp đề xuất giải pháp cho bộ phận thu ngân tại các điểm kinh doanh\",\"created\":\"2026-02-04 13:55\",\"due\":\"2026-02-11 13:55\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-04 14:17\",\"createdBy\":\"CườngPK\"},{\"id\":\"7642b4fb\",\"assignee\":\"CườngPK\",\"title\":\"Chuẩn bị hồ sơ vay vốn Vietinbank theo danh mục hồ sơ Toàn Vietinbank đã gửi email ketoangiongvina@gmail.com\",\"created\":\"2026-02-04 14:07\",\"due\":\"2026-02-11 14:07\",\"status\":\"Đã xong\",\"support\":\"Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-02-06 11:41\",\"createdBy\":\"CườngPK\"},{\"id\":\"69ce8d22\",\"assignee\":\"CườngPK\",\"title\":\"Hoàn thiện quy trình, quy chế cho thu ngân bán hàng tại các trung tâm tiêm chủng. Yêu cầu cuối: Thực hiện và kiểm tra hoàn thiện báo cáo bán hàng hàng ngày tại trung tâm. \\nĐã thưc hiện thử nghiệm tại GLB. Cho chạy thử trước tết nguyên đán. Ngày 23/02/2026. Thực hiện triển khai đồng bộ các trung tâm khác\",\"created\":\"2026-02-04 14:18\",\"due\":\"2026-03-10 15:18\",\"status\":\"Đã xong\",\"support\":\"Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-02-24 10:47\",\"createdBy\":\"CườngPK\"},{\"id\":\"c1b9f9ea\",\"assignee\":\"CườngPK\",\"title\":\"Làm việc với Mr Thắng Misa để triển khai mua phần mềm Misa AMIS, khảo sát phần mềm bán hàng SMED kết hợp API vào Misa AMIS để link dữ liệu. Mục đích kết quả đạt được. 1 lần nhập chứng từ gốc ra được các báo cáo phục vụ kế toán nội bộ và kế toán thuế.\",\"created\":\"2026-02-04 14:19\",\"due\":\"2026-02-11 14:19\",\"status\":\"Đã xong\",\"support\":\"Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-02-06 08:11\",\"createdBy\":\"CườngPK\"},{\"id\":\"1c9ae9db\",\"assignee\":\"CườngPK\",\"title\":\"Chiết xuất bảng kê, hóa đơn mua vào, bán ra T1/2026 tại trang web https://app3.meinvoice.vn/ và Tool MIA để làm báo cáo thuế GTGT T1/2026.\",\"created\":\"2026-02-04 14:22\",\"due\":\"2026-02-11 14:22\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"Do chưa nhận được bàn giao số liệu báo cáo thuế của kế toán thuế và chưa có phần mềm kế toán. Nên tạm thời chỉ lập bảng kê báo cáo thuế  T1/2026 gồm tờ khai GTGT, tờ khai TNCN\",\"updated\":\"2026-02-10 13:03\",\"createdBy\":\"CườngPK\"},{\"id\":\"db923309\",\"assignee\":\"CườngPK\",\"title\":\"Khảo sát nghiệp vụ tiêm hộ lập phương án xử lý báo cáo theo dõi trên phần mềm kế toán, phần mềm bán hàng\",\"created\":\"2026-02-04 15:24\",\"due\":\"2026-02-11 15:24\",\"status\":\"Đã xong\",\"support\":\"Thương TTA , Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-02-24 09:52\",\"createdBy\":\"CườngPK\"},{\"id\":\"140d74fe\",\"assignee\":\"CườngPK\",\"title\":\"Gặp gỡ chúc tết cán bộ thuế Công ty Giong VN. Cụm 11 Long Biên cùng Hùng kế toán trưởng. Mr Châu đưa 2 phong bì đi chúc tết.\",\"created\":\"2026-02-06 07:42\",\"due\":\"2026-02-06 09:30\",\"status\":\"Đã xong\",\"support\":\"Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-02-06 11:07\",\"createdBy\":\"CườngPK\"},{\"id\":\"4bb04ea1\",\"assignee\":\"CườngPK\",\"title\":\"Họp Online cùng Mr Thắng Misa để khảo sát phần mềm SMED kết hợp API vào MISA lấy dữ liệu đồng bộ tự động. Giải pháp đồng bộ cho DN GIONG VN\",\"created\":\"2026-02-06 07:43\",\"due\":\"2026-02-06 14:00\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Thương TTA\",\"blocker\":\"\",\"updated\":\"2026-02-06 15:39\",\"createdBy\":\"CườngPK\"},{\"id\":\"8cddd609\",\"assignee\":\"CườngPK\",\"title\":\"Học sản phẩm hàng hóa của Công ty Gióng VN theo Vacxin\",\"created\":\"2026-02-06 07:55\",\"due\":\"2026-03-13 07:55\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM , Thương TTA\",\"blocker\":\"\",\"updated\":\"2026-02-06 07:55\",\"createdBy\":\"CườngPK\"},{\"id\":\"88a64b61\",\"assignee\":\"CườngPK\",\"title\":\"Xây dựng quy chế tài chính nội bộ cho GIONG VN năm 2026. Toàn hệ thống\",\"created\":\"2026-02-06 08:01\",\"due\":\"2026-02-28 08:01\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM , Thương TTA , Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-02-06 08:01\",\"createdBy\":\"CườngPK\"},{\"id\":\"b65fce56\",\"assignee\":\"CườngPK\",\"title\":\"Kết hợp cùng Tổ chức hành chính nhân sự Ms Hạnh xây dựng quy chế lương, thưởng năm 2026\",\"created\":\"2026-02-06 08:08\",\"due\":\"2026-02-28 08:08\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-04-07 12:50\",\"createdBy\":\"CườngPK\"},{\"id\":\"0859f5fc\",\"assignee\":\"CườngPK\",\"title\":\"Theo dõi các nhà cung cấp, hãng bán hàng theo sản phẩm, chiết khấu, hoa hồng, chương trình áp dụng. Quy trình lên đơn đặt hàng\",\"created\":\"2026-02-06 08:11\",\"due\":\"2026-03-31 08:11\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-07-28 07:48\",\"createdBy\":\"CườngPK\"},{\"id\":\"0c6dbf4f\",\"assignee\":\"CườngPK\",\"title\":\"Kế toán quản trị. Lập kế hoạch tài chính năm 2026\\nĐiểm hòa vốn của từng trung tâm và điểm hòa vốn tổng thể của Công ty\",\"created\":\"2026-02-06 08:46\",\"due\":\"2026-03-03 08:46\",\"status\":\"Đã xong\",\"support\":\"Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-06-22 10:16\",\"createdBy\":\"CườngPK\"},{\"id\":\"6dd12ab9\",\"assignee\":\"CườngPK\",\"title\":\"Hoàn thiện quy trình xử lý hóa đơn bán hàng và hóa đơn GTGT lập báo cáo bán hàng (thí điểm tại Giong Long Biên)\",\"created\":\"2026-02-06 15:57\",\"due\":\"2026-02-10 08:00\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Thương TTA\",\"blocker\":\"Hùng nghỉ ngày 09/02/2026 nên chuyển sang ngày 10/02/2026\",\"updated\":\"2026-02-11 18:30\",\"createdBy\":\"CườngPK\"},{\"id\":\"f84a3306\",\"assignee\":\"CườngPK\",\"title\":\"Lập quy trình đóng gói chứng từ theo tháng. Trong phần Quy chế tài chính của doanh nghiệp\",\"created\":\"2026-02-06 17:13\",\"due\":\"2026-03-31 17:13\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-02-06 17:13\",\"createdBy\":\"CườngPK\"},{\"id\":\"cfb8f44d\",\"assignee\":\"CườngPK\",\"title\":\"Nội quy lao động, thang bảng lương, hồ sơ lao động. Bộ luật lao động 2019\",\"created\":\"2026-02-06 18:15\",\"due\":\"2026-02-13 18:15\",\"status\":\"Đã xong\",\"support\":\"Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-04-07 12:49\",\"createdBy\":\"CườngPK\"},{\"id\":\"bb56d2f6\",\"assignee\":\"CườngPK\",\"title\":\"Thử nghiệm GLB bán hàng thu tiền xuất hoá đơn GTGT trực tiếp. Ghi màn hình, lập quy trình triển khai các TT khác. Theo dõi báo cáo bán hàng cuối ngày\",\"created\":\"2026-02-09 07:12\",\"due\":\"2026-02-09 10:12\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-02-10 13:01\",\"createdBy\":\"CườngPK\"},{\"id\":\"ee1931f2\",\"assignee\":\"CườngPK\",\"title\":\"Gửi User Pass cho Misa phần mềm SMED để họ nghiên cứu đồng bộ API cho Misa Amis Online. Minh Đức nhận của Cường user pass 2 cái VP+GTD Tiên Du\",\"created\":\"2026-02-09 09:12\",\"due\":\"2026-02-09 08:12\",\"status\":\"Đã xong\",\"support\":\"Thương TTA\",\"blocker\":\"\",\"updated\":\"2026-02-09 09:14\",\"createdBy\":\"CườngPK\"},{\"id\":\"d907b8db\",\"assignee\":\"CườngPK\",\"title\":\"Họp VP công ty Tuần thứ 2 tháng 2 2026.\\n- Thanh toán tiền bảo dưỡng máy tính.\\n- Lập quy chế nội bộ. Trước tiên là phần mô tả công việc vị trí làm việc của nhân viên truong bộ phận Tài chính, kế toán, Hành chính, nhân sự\\n- Đã báo cáo việc thí điểm thu ngân trọn việc sử dụng các phần mềm hỗ trợ như SMED, Misa Invoice. Cho GLB thí điểm ngày 10/02/2026. Sếp đã duyệt\\n- Rút tiền mặt chi quà tết cho người già, ...\",\"created\":\"2026-02-09 09:14\",\"due\":\"2026-02-16 09:14\",\"status\":\"Đã xong\",\"support\":\"Thương TTA , Hùng TM , Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-02-12 15:56\",\"createdBy\":\"CườngPK\"},{\"id\":\"2c6c3055\",\"assignee\":\"CườngPK\",\"title\":\"Vietinbank Toàn hẹn qua tết âm lịch triển khai thẩm định tài sản, cho vay vốn doanh nghiêp.\",\"created\":\"2026-02-09 11:47\",\"due\":\"2026-02-24 11:47\",\"status\":\"Đã xong\",\"support\":\"Hùng TM\",\"blocker\":\"Tết nguyên đán nghỉ dài ngày\",\"updated\":\"2026-02-27 11:46\",\"createdBy\":\"CườngPK\"},{\"id\":\"12edfd70\",\"assignee\":\"CườngPK\",\"title\":\"Báo cáo thuế GTGT T1_2026.\",\"created\":\"2026-02-10 13:03\",\"due\":\"2026-02-12 10:03\",\"status\":\"Đã xong\",\"support\":\"Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-02-11 21:19\",\"createdBy\":\"CườngPK\"},{\"id\":\"d2e42025\",\"assignee\":\"CườngPK\",\"title\":\"Báo cáo thuế TNCN tờ khai T1/2026\",\"created\":\"2026-02-10 13:04\",\"due\":\"2026-02-12 13:04\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-02-11 21:19\",\"createdBy\":\"CườngPK\"},{\"id\":\"ea27654e\",\"assignee\":\"CườngPK\",\"title\":\"Nộp tiền thuế TNCN T1/2026 Hùng nộp\",\"created\":\"2026-02-11 18:29\",\"due\":\"2026-02-14 08:29\",\"status\":\"Đã xong\",\"support\":\"Hùng TM\",\"blocker\":\"Trang nộp thuế qua dichvucong không hiện số chứng từ phải nộp khi truy xuất. Số tiền thuế không đúng với tờ khai đã nộp, Thiếu phần thuế của Hà Nội. Đã liên hệ cán bộ thuế Mrs Tú thuế Long Biên để hỏi, CB Thuế trả lời để họ hỏi lại, nếu ngà\",\"updated\":\"2026-02-20 09:08\",\"createdBy\":\"CườngPK\"},{\"id\":\"6579f233\",\"assignee\":\"CườngPK\",\"title\":\"Viết báo cáo thu hoạch việc triển khai thu ngân theo cách mới tại gióng Long Biên và kế toán bán hàng tại văn phòng công ty. Cho thử nghiệm 2 tuần\",\"created\":\"2026-02-12 06:29\",\"due\":\"2026-02-23 06:29\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Thương TTA\",\"blocker\":\"\",\"updated\":\"2026-02-27 12:05\",\"createdBy\":\"CườngPK\"},{\"id\":\"2ea334e6\",\"assignee\":\"CườngPK\",\"title\":\"Đi chúc tết Cty kế toán dịch vụ Trường Thành. Hỏi về tờ khai đăng ký người phụ thuộc mới, hỏi về thời điểm nộp thuế TNCN của T11_12/25 nôp vào T1/2026 có bị phạt chậm nộp không? Ai chịu trách nhiệm nếu bị phạt. Có nộp danh sách người lao động mà DN nộp thay không?\",\"created\":\"2026-02-12 07:55\",\"due\":\"2026-02-12 09:55\",\"status\":\"Đã xong\",\"support\":\"Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-02-12 11:09\",\"createdBy\":\"CườngPK\"},{\"id\":\"62f792d8\",\"assignee\":\"CườngPK\",\"title\":\"Lập danh sách chi tiết số tiền nộp thuế TNCN tháng 01/2026. Công việc của Nhân sự, nhưng nhân sự mới chưa biết làm. Lấy MST của người lao động\",\"created\":\"2026-02-12 07:56\",\"due\":\"2026-02-12 17:56\",\"status\":\"Đã xong\",\"support\":\"Hạnh NTM , Hùng TM\",\"blocker\":\"Lấy MST của người lao động\",\"updated\":\"2026-02-12 15:56\",\"createdBy\":\"CườngPK\"},{\"id\":\"15492fda\",\"assignee\":\"CườngPK\",\"title\":\"Khảo sát bảng của Misa với Semd để chốt phương án sau cuộc họp chiều ngày 11/02/2026\",\"created\":\"2026-02-12 11:19\",\"due\":\"2026-02-12 17:19\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Thương TTA , DiuNT\",\"blocker\":\"\",\"updated\":\"2026-02-12 15:56\",\"createdBy\":\"CườngPK\"},{\"id\":\"9f6e7aad\",\"assignee\":\"CườngPK\",\"title\":\"Kế toán thuế Trường Thành cần các báo cáo tồn kho, công nợ phải thu, phải trả đến thời điểm 31/12/2025. Yêu cầu Gióng VN gửi sớm để họ chốt báo cáo tài chính. Nếu không họ không chịu trách nhiệm\",\"created\":\"2026-02-12 17:35\",\"due\":\"2026-02-13 17:35\",\"status\":\"Đã xong\",\"support\":\"Thương TTA , Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-03-18 14:58\",\"createdBy\":\"CườngPK\"},{\"id\":\"c5642b80\",\"assignee\":\"CườngPK\",\"title\":\"Misa AMis Chuyển bảng khảo sát sử dụng API để đồng bộ dữ liệu từ SMED sang PM kế toán Misa AMIS. Ngày 07 tết đi làm lại và đẩy dữ liệu sang bên bộ phận dự án\",\"created\":\"2026-02-13 16:47\",\"due\":\"2026-02-23 16:47\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-27 11:46\",\"createdBy\":\"CườngPK\"},{\"id\":\"88531f55\",\"assignee\":\"CườngPK\",\"title\":\"Kiểm tra việc đăng ký mst tncn của nhân viên bị khấu trừ thuế T1/2026\",\"created\":\"2026-02-17 14:10\",\"due\":\"2026-02-23 14:10\",\"status\":\"Đã xong\",\"support\":\"Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-02-23 12:57\",\"createdBy\":\"CườngPK\"},{\"id\":\"7b32b0d8\",\"assignee\":\"CườngPK\",\"title\":\"Báo cáo kế hoạch, phương thức xử lý trường hợp tiêm vượt rào và trường hợp thu ngân thu tiền của khách nhưng chưa nộp lại quỹ Công ty\",\"created\":\"2026-02-23 07:50\",\"due\":\"2026-03-02 07:50\",\"status\":\"Đã xong\",\"support\":\"Hạnh NTM , Hùng TM , Thương TTA\",\"blocker\":\"Người lao động làm lâu, là chỗ thân tình họ hàng của lãnh đạo. Đã đưa vấn đề này lên họp giao ban. Lãnh đạo đã thống nhất cách thức xử lý. Giao cho Hạnh Nhân sự làm việc tiếp\",\"updated\":\"2026-02-23 12:58\",\"createdBy\":\"CườngPK\"},{\"id\":\"70f62129\",\"assignee\":\"CườngPK\",\"title\":\"Làm việc lại với nhóm SMED về việc lấy data dữ liệu từ khi hoạt động, Phân tích việc tính giá vốn hàng bán để ra báo cáo lợi nhuận trên phần mềm\",\"created\":\"2026-02-23 07:54\",\"due\":\"2026-03-02 07:54\",\"status\":\"Đã xong\",\"support\":\"Thương TTA , Hùng TM\",\"blocker\":\"Nhân sự thoát hết trên nhóm chung Zalo do không làm việc nữa. Đã liên hệ với nhân viên SMED\",\"updated\":\"2026-03-03 15:07\",\"createdBy\":\"CườngPK\"},{\"id\":\"e84f42a0\",\"assignee\":\"Hùng TM\",\"title\":\"File N-X-T kho năm 2025 trên Smed gửi cho Trường Thành\",\"created\":\"2026-02-23 10:49\",\"due\":\"2026-02-27 10:49\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-03-05 17:34\",\"createdBy\":\"Hùng TM\"},{\"id\":\"e8705d42\",\"assignee\":\"Hùng TM\",\"title\":\"Quy trình xuất hóa đơn cho thu ngân các trung tâm (bắt đầu từ thu tiền khách hàng)\",\"created\":\"2026-02-23 10:51\",\"due\":\"2026-02-25 10:51\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-25 07:51\",\"createdBy\":\"Hùng TM\"},{\"id\":\"f6ea2136\",\"assignee\":\"Hùng TM\",\"title\":\"Báo cáo tháng 1.2026\",\"created\":\"2026-02-23 10:52\",\"due\":\"2026-02-25 10:52\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-23 10:52\",\"createdBy\":\"Hùng TM\"},{\"id\":\"30be9107\",\"assignee\":\"CườngPK\",\"title\":\"Lập user và pass gửi nhân sự thực hiện cách lập kế hoạch, hành động, mục tiêu trên AppSheet. Để báo cáo lãnh đạo và giám sát công việc\",\"created\":\"2026-02-23 11:22\",\"due\":\"2026-02-23 11:22\",\"status\":\"Đã xong\",\"support\":\"Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-02-23 12:48\",\"createdBy\":\"CườngPK\"},{\"id\":\"9902550a\",\"assignee\":\"CườngPK\",\"title\":\"Lập sơ đồ tổ chức bộ máy văn phòng từ hành chính nhân sự, kế toán... Mô tả công việc của từng nhân sự. Nộp báo cáo cho Giám đốc\",\"created\":\"2026-02-23 11:37\",\"due\":\"2026-03-02 11:37\",\"status\":\"Đã xong\",\"support\":\"Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-03-03 15:07\",\"createdBy\":\"CườngPK\"},{\"id\":\"4594a91f\",\"assignee\":\"CườngPK\",\"title\":\"Lập danh sách cá nhân chịu thuế TNCN Cty nộp thay tại Hà Nội Ghép vào bảng danh sách nộp tiền đã nộp trước tết âm lịch (Làm việc thay cho Nhân Sự HR). Làm xong báo lại Hạnh để Hạnh tiếp tục công việc cho Tháng 2\",\"created\":\"2026-02-23 13:51\",\"due\":\"2026-02-24 13:51\",\"status\":\"Đã xong\",\"support\":\"Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-02-23 14:13\",\"createdBy\":\"CườngPK\"},{\"id\":\"508dda28\",\"assignee\":\"Hạnh NTM\",\"title\":\"Kiểm tra việc thực hiện các nội dung trước và trong kỳ nghỉ Tết Nguyên đán\",\"created\":\"2026-02-23 14:06\",\"due\":\"2026-02-24 08:00\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-24 10:20\",\"createdBy\":\"\"},{\"id\":\"e10802fe\",\"assignee\":\"Hạnh NTM\",\"title\":\"Xây dựng bảng lương, quy chế lương\",\"created\":\"2026-02-23 14:13\",\"due\":\"2026-02-28 14:13\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-23 14:13\",\"createdBy\":\"Hạnh NTM\"},{\"id\":\"a82ae54c\",\"assignee\":\"Hạnh NTM\",\"title\":\"Xây dựng sơ đồ tổ chức và mô tả vị trí việc làm\",\"created\":\"2026-02-23 14:14\",\"due\":\"2026-02-28 14:14\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"ĐÃ thống nhất các phòng ban, đã xây dựng bản sơ bộ, đang hoàn thiện ghép thành quyết định ban hành\",\"updated\":\"2026-03-14 07:46\",\"createdBy\":\"Hạnh NTM\"},{\"id\":\"18c58635\",\"assignee\":\"Hạnh NTM\",\"title\":\"Triển khai thực hiện chấm công bằng phần mềm\",\"created\":\"2026-02-23 14:15\",\"due\":\"2026-02-28 14:15\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-25 15:12\",\"createdBy\":\"Hạnh NTM\"},{\"id\":\"68c722d4\",\"assignee\":\"Hiếu NT\",\"title\":\"Tổng hợp số lượng tồn vacxin ngắn hạn trên Smed của các Trung tâm\",\"created\":\"2026-02-23 14:12\",\"due\":\"2027-03-02 14:12\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-23 14:12\",\"createdBy\":\"\"},{\"id\":\"4b251b17\",\"assignee\":\"Hạnh NTM\",\"title\":\"Báo tăng BHXH Phạm Kiên Cường, Lê Thị Thanh từ tháng 2/2026\\nGiảm BHXH Nguyễn Thị Thu Hà, Nguyễn Thị Hạnh, Vương Thu Trang, Dương Hoài Nam, Lê Thị Thu Thủy từ tháng tháng 3/2026\",\"created\":\"2026-02-23 14:15\",\"due\":\"2026-02-25 14:15\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-25 15:18\",\"createdBy\":\"Hạnh NTM\"},{\"id\":\"6b40b960\",\"assignee\":\"Hiếu NT\",\"title\":\"Làm file tổng hợp tồn số lượng vắc xin tiêm hộ\",\"created\":\"2026-02-23 14:18\",\"due\":\"2027-02-02 14:18\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-23 14:18\",\"createdBy\":\"Hiếu NT\"},{\"id\":\"f95b7dde\",\"assignee\":\"Hiếu NT\",\"title\":\"Vận chuyển vắc xin tiêm hộ, các đơn Bio, Winbio,..... cho các TT\",\"created\":\"2026-02-23 14:20\",\"due\":\"2027-02-03 14:20\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-23 14:20\",\"createdBy\":\"Hiếu NT\"},{\"id\":\"54f2ae66\",\"assignee\":\"Hiếu NT\",\"title\":\"Phân các chứng từ còn tồn đọng của các Trung tâm bàn giao cho phòng kế toán\",\"created\":\"2026-02-23 14:21\",\"due\":\"2026-02-26 14:21\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-23 14:21\",\"createdBy\":\"Hiếu NT\"},{\"id\":\"5771593b\",\"assignee\":\"Hạnh NTM\",\"title\":\"Sắp xếp nhân sự (Nam nghỉ việc, Thanh đi làm lại sau thai sản, Thủy Bích Hòa, Trang Đông Yên nghỉ việc từ 1/3)\",\"created\":\"2026-02-23 14:20\",\"due\":\"2026-02-26 14:20\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-03-02 09:15\",\"createdBy\":\"Hạnh NTM\"},{\"id\":\"f3d9df30\",\"assignee\":\"Hiếu NT\",\"title\":\"Tổng hợp VTTH tháng 3 cấp cho các trung tâm\",\"created\":\"2026-02-23 14:22\",\"due\":\"2027-02-02 14:22\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-23 14:22\",\"createdBy\":\"Hiếu NT\"},{\"id\":\"dbf75e70\",\"assignee\":\"Hiếu NT\",\"title\":\"Tổng hợp các đề xuất CCDC, vật tự các Trung tâm đề xuất hàng ngày, hàng tuần\",\"created\":\"2026-02-23 14:24\",\"due\":\"2027-02-02 14:24\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-23 14:24\",\"createdBy\":\"Hiếu NT\"},{\"id\":\"a3ee3872\",\"assignee\":\"Hiếu NT\",\"title\":\"Thực hiện kế hoạch kiểm soát nhiễm khuẩn các trung tâm hàng tuần\",\"created\":\"2026-02-23 14:25\",\"due\":\"2027-02-02 14:25\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-23 14:25\",\"createdBy\":\"Hiếu NT\"},{\"id\":\"9f35db91\",\"assignee\":\"Hiếu NT\",\"title\":\"Theo dõi biểu đồ Logtag, chứng từ thu gom chất thải, các chứng từ liên quan đến việc bảo quản quản thuốc,.......... của các trung tâm\",\"created\":\"2026-02-23 14:27\",\"due\":\"2027-02-02 14:27\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-23 14:27\",\"createdBy\":\"Hiếu NT\"},{\"id\":\"51e5cf1c\",\"assignee\":\"Hùng TM\",\"title\":\"Hùng cho triển khai thêm 5 Trung tâm tự xuất hóa đơn GTGT khi thu tiền của khách gồm: Phúc Yên, Thạch Đà, Liên Mạc, Quốc Oai, Thanh Oai.\",\"created\":\"2026-02-23 14:56\",\"due\":\"2026-02-24 14:56\",\"status\":\"Đã xong\",\"support\":\"Dịu NT\",\"blocker\":\"\",\"updated\":\"2026-02-24 18:45\",\"createdBy\":\"CườngPK\"},{\"id\":\"ffa930df\",\"assignee\":\"Hạnh NTM\",\"title\":\"Hạnh xem lại báo cáo cuộc họp hôm nay. Chỉnh sửa và bổ sung những điểm còn thiếu hoặc sai sót.\",\"created\":\"2026-02-23 15:42\",\"due\":\"2026-02-24 15:42\",\"status\":\"Đã xong\",\"support\":\"CườngPK\",\"blocker\":\"\",\"updated\":\"2026-02-24 11:03\",\"createdBy\":\"CườngPK\"},{\"id\":\"ddb1258d\",\"assignee\":\"Hùng TM\",\"title\":\"Tập hợp số lượng mua hàng của hãng xem hoàn thành chương trình hãng theo tháng, Quý\",\"created\":\"2026-02-23 14:34\",\"due\":\"2026-02-25 14:34\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-25 16:48\",\"createdBy\":\"Hùng TM\"},{\"id\":\"24f838e2\",\"assignee\":\"Hương NT\",\"title\":\"Lên kế hoạch liên kết smed với kênh Zalo OA để nhắn tin nhắc lịch và CSKH\",\"created\":\"2026-02-24 10:55\",\"due\":\"2026-03-20 10:55\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-24 10:57\",\"createdBy\":\"Hương NT\"},{\"id\":\"763dccde\",\"assignee\":\"CườngPK\",\"title\":\"Lập bảng nhật ký điều chuyển Vacxin nội bộ, Hiếu, Thương quản lý và cập nhật trên Google Sheet\",\"created\":\"2026-02-24 15:54\",\"due\":\"2026-02-25 15:54\",\"status\":\"Đã xong\",\"support\":\"Thương TTA , Hiếu NT\",\"blocker\":\"Cập nhật từ các phiếu điều chuyển nội bộ bằng ảnh chụp sang  PDF khó lấy dữ liệu trên Excel\",\"updated\":\"2026-02-24 17:50\",\"createdBy\":\"CườngPK\"},{\"id\":\"e8f9c126\",\"assignee\":\"CườngPK\",\"title\":\"Nghiên cứu, trao đổi về báo cáo kiểm soát tiêm hộ. Đưa giải pháp tổng thể để kiểm tra đối chiếu giữa thu ngân và marketing (theo dõi khách hàng) kho hàng thực tế (Tiêm hộ)\",\"created\":\"2026-02-24 15:57\",\"due\":\"2026-03-03 15:57\",\"status\":\"Đã xong\",\"support\":\"Thương TTA , Hiếu NT\",\"blocker\":\"\",\"updated\":\"2026-03-06 07:44\",\"createdBy\":\"CườngPK\"},{\"id\":\"c030acb3\",\"assignee\":\"CườngPK\",\"title\":\"Tạo thông báo đặt tại quầy thu ngân cảnh báo với khách hàng về việc kiểm tra số tiền và mũi tiêm đã đặt:\\nKhách hàng lưu ý:\\nNhận biên lai thu tiền sau khi trả tiền, kiểm tra lại thật kỹ trước khi dời quầy. Mọi thắc mắc liên hệ ngay với thu ngân để xử lý.\\nCông ty và trung tâm không chịu trách nhiệm nếu quý khách để quá 3 ngày làm việc.\\nHà nội, ngày 22 tháng 02 năm 2026\",\"created\":\"2026-02-24 16:02\",\"due\":\"2026-02-25 16:02\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM , Thương TTA , Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-02-24 16:02\",\"createdBy\":\"CườngPK\"},{\"id\":\"1a8003df\",\"assignee\":\"Dịu NT\",\"title\":\"Hoàn thành nhập báo cáo bán hàng 20-24/2 phần quỹ\",\"created\":\"2026-02-25 07:47\",\"due\":\"2026-02-25 17:00\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-03-02 17:30\",\"createdBy\":\"\"},{\"id\":\"890fbae5\",\"assignee\":\"Hùng TM\",\"title\":\"Làm hồ sơ vay vốn ngân hàng VCB\",\"created\":\"2026-02-25 07:50\",\"due\":\"2026-02-25 07:50\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-25 16:48\",\"createdBy\":\"Hùng TM\"},{\"id\":\"53c95897\",\"assignee\":\"CườngPK\",\"title\":\"Khảo sát luồng làm việc, quy trình tạo đơn nhập hàng đến khi hàng thực tế nhập tại trung tâm tiêm chủng. Lập phương án xử lý các vấn đề tồn đọng, xây dựng AppSheet quy trình làm việc và đồng bộ lên Power BI\",\"created\":\"2026-02-25 07:58\",\"due\":\"2026-03-04 07:58\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , GĐ Thúy\",\"blocker\":\"\",\"updated\":\"2026-04-07 12:49\",\"createdBy\":\"CườngPK\"},{\"id\":\"9a682377\",\"assignee\":\"CườngPK\",\"title\":\"Lập giải pháp xử lý truy xuất dữ liệu từ báo cáo kho tiêm hộ, báo cáo bán hàng tiêm hộ trên AppSheet và đồng bộ vào Power Bi để tạo báo cáo trực quan.\",\"created\":\"2026-02-25 08:03\",\"due\":\"2026-04-30 08:03\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Thương TTA , Hiếu NT\",\"blocker\":\"Điều chuyển Vaxcin từ các TT khác nhau không kiểm soát được. VP Không  theo dõi được.\",\"updated\":\"2026-06-22 10:17\",\"createdBy\":\"CườngPK\"},{\"id\":\"8260fffc\",\"assignee\":\"CườngPK\",\"title\":\"Lập phương án kiểm kê tổng thể cho 19 trung tâm và VP \\nKho Vacxin\\nKho Vật tư tiêu hao\\nKho Văn phòng gồm: VPP, CCDC, TSCĐ\\nKế hoạch rà soát đối chiếu số liệu sau khi có biên bản kiểm kê với sổ sách kế toán Nội Bộ, Sổ sách kế toán Thuế\",\"created\":\"2026-02-25 08:47\",\"due\":\"2026-02-28 08:47\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Thương TTA , Hạnh NTM , Dịu NT , GĐ Thúy , Hiếu NT , PGĐ_Châu HM , Hương NT\",\"blocker\":\"\",\"updated\":\"2026-03-02 09:55\",\"createdBy\":\"CườngPK\"},{\"id\":\"f38c5e82\",\"assignee\":\"Hương NT\",\"title\":\"Lên nội dung cho các kênh Tiktok, website, Zalo OA\",\"created\":\"2026-02-25 16:30\",\"due\":\"2026-03-31 16:30\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-25 16:30\",\"createdBy\":\"Hương NT\"},{\"id\":\"0cd450a6\",\"assignee\":\"Hương NT\",\"title\":\"Đề xuất CTKM cho nhân viên và cho khách hàng tháng 3/2026\",\"created\":\"2026-02-25 16:31\",\"due\":\"2026-02-28 16:31\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-25 16:31\",\"createdBy\":\"Hương NT\"},{\"id\":\"d7a8c1ff\",\"assignee\":\"Hạnh NTM\",\"title\":\"Gia hạn HĐ Smed Thạch Đà, thu gom chất thải Đông Yên, Tiền Phong, Phúc Yên, Đồng Xuân\",\"created\":\"2026-02-26 10:13\",\"due\":\"2026-03-01 10:13\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"Đã hoàn thành Smed Thạch Đà\\nHĐ xử lý chất thải, chờ bên cung cấp gửi Hợp đồng\",\"updated\":\"2026-03-04 16:58\",\"createdBy\":\"Hạnh NTM\"},{\"id\":\"7ab4a68f\",\"assignee\":\"Hạnh NTM\",\"title\":\"Kiện toàn BCH Công đoàn\",\"created\":\"2026-02-26 10:14\",\"due\":\"2026-03-01 10:14\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-03-07 08:01\",\"createdBy\":\"Hạnh NTM\"},{\"id\":\"9908fa5c\",\"assignee\":\"Hạnh NTM\",\"title\":\"HDDTN Tâm An, Sài Đồng, Bích Hòa, Đồng Xuân, Phúc Yên, Tiên Du, Đông Yên\",\"created\":\"2026-02-27 08:46\",\"due\":\"2026-03-25 08:46\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-27 08:46\",\"createdBy\":\"Hạnh NTM\"},{\"id\":\"8e03f482\",\"assignee\":\"CườngPK\",\"title\":\"Tiếp Vietibank tại VP Công ty mục đích\\n1. Mở tài khoản tại 19 điểm giao dịch + 1 tài khoản Cty\\n2. Vay vốn dùng tài sản nhà để thế chấp\\n3. Hỏi thêm các chính sách ưu đãi của Vietinbank\",\"created\":\"2026-02-27 09:13\",\"due\":\"2026-02-27 09:13\",\"status\":\"Đã xong\",\"support\":\"PGĐ_Châu HM , Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-02-27 11:42\",\"createdBy\":\"CườngPK\"},{\"id\":\"01af6a6d\",\"assignee\":\"CườngPK\",\"title\":\"Chuyển tiếp hồ sơ cho Vietinbank còn thiếu gồm: Hồ sơ pháp lý liên quan đến y tế. Hồ sơ báo cáo tài chính nội bộ 2024, 2025 để làm phương án vay vốn\",\"created\":\"2026-02-27 12:05\",\"due\":\"2026-03-05 12:05\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Hạnh NTM\",\"blocker\":\"Đợi chờ báo cáo của Trường Thành để gửi cho Vietcombank và Vietinbank\",\"updated\":\"2026-03-22 15:18\",\"createdBy\":\"CườngPK\"},{\"id\":\"6ca73415\",\"assignee\":\"Thương TTA\",\"title\":\"Mở tài khoản giao dịch cho các thu ngân tại các Trung Tâm tiêm chủng Gióng\",\"created\":\"2026-02-27 13:38\",\"due\":\"2026-02-28 13:38\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-27 13:38\",\"createdBy\":\"CườngPK\"},{\"id\":\"d33e4cac\",\"assignee\":\"Hương NT\",\"title\":\"Tính thưởng tư vấn vắc xin tháng 2/2026\",\"created\":\"2026-02-28 09:24\",\"due\":\"2026-03-05 09:24\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-02-28 09:24\",\"createdBy\":\"Hương NT\"},{\"id\":\"b1083420\",\"assignee\":\"Thương TTA\",\"title\":\"Tạo Tk smed thu ngân tiêm hộ cho các TT\",\"created\":\"2026-02-28 15:46\",\"due\":\"2026-03-02 16:30\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-03-02 08:40\",\"createdBy\":\"Thương TTA\"},{\"id\":\"1a9308d6\",\"assignee\":\"Thương TTA\",\"title\":\"Thu ngân GTS ngày 01/03/2026\",\"created\":\"2026-02-28 15:56\",\"due\":\"2026-03-01 17:30\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-03-02 08:41\",\"createdBy\":\"Thương TTA\"},{\"id\":\"0aec89d7\",\"assignee\":\"CườngPK\",\"title\":\"Đào tạo kế toán bán hàng làm báo cáo hàng ngày.\\n1. Bảng kê thu tiền\\n2. Bảng kê doanh thu\\n3. Báo cáo lợi nhuận\\nLấy dữ liệu từ PMBH SMED để làm báo cáo\",\"created\":\"2026-03-02 09:49\",\"due\":\"2026-03-02 09:49\",\"status\":\"Đã xong\",\"support\":\"Dịu NT\",\"blocker\":\"Cần 1 tuần để xác nhận làm đúng mẫu và quy trình làm báo cáo\",\"updated\":\"2026-03-02 09:55\",\"createdBy\":\"CườngPK\"},{\"id\":\"87f591b3\",\"assignee\":\"CườngPK\",\"title\":\"Kiểm tra báo cáo kiểm kê hàng hóa của các Trung tâm ngày 28/02/2026.\\nĐối chiếu SMED và lập biên bản tổng kết để điều chỉnh số liệu lệch thừa thiếu, sai số lô, hạn sử dụng trên SMED\",\"created\":\"2026-03-02 10:01\",\"due\":\"2026-03-09 10:01\",\"status\":\"Đã xong\",\"support\":\"Thương TTA , Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-03-22 15:18\",\"createdBy\":\"CườngPK\"},{\"id\":\"fe679734\",\"assignee\":\"CườngPK\",\"title\":\"Kiểm tra và triển khai báo cáo thuế TNCN cho Giám đốc Thúy (thu nhập ở nhiều nơi cho thuê bằng 5tr/tháng có nhận tiền chuyển khoản) và PGĐ Châu thu nhập có chuyển khoản từ tiền cho thuê nhà\",\"created\":\"2026-03-02 10:03\",\"due\":\"2026-03-09 10:03\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-03-22 15:18\",\"createdBy\":\"CườngPK\"},{\"id\":\"d7aea3e5\",\"assignee\":\"Hùng TM\",\"title\":\"Báo cáo nhanh về tình hình sử dụng phần mềm phát hành hóa đơn điện tử của 6 Trung tâm trong tuần trước. Tỷ lệ làm sai, biện pháp khắc phục tức thời, biện pháp xử lý tận gốc vấn đề. Báo cáo nhanh về quy trình làm báo cáo ngày của Thu ngân\",\"created\":\"2026-03-02 10:05\",\"due\":\"2026-03-02 18:05\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-03-02 10:05\",\"createdBy\":\"CườngPK\"},{\"id\":\"85127851\",\"assignee\":\"Hùng TM\",\"title\":\"Triển khai toàn hệ thống việc phát hành hóa đơn giá trị gia tăng ngay khi phát sinh dịch vụ. (Thêm 13 Trung tâm)\",\"created\":\"2026-03-02 10:07\",\"due\":\"2026-03-09 10:07\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-03-05 17:34\",\"createdBy\":\"CườngPK\"},{\"id\":\"b5993e48\",\"assignee\":\"Thương TTA\",\"title\":\"Hoàn thiện đăng ký user pass cho thu ngân tại 19 trung tâm để bán hàng (tiêm hộ) vào hệ thống SMED\",\"created\":\"2026-03-02 10:09\",\"due\":\"2026-03-09 10:09\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-03-02 10:09\",\"createdBy\":\"CườngPK\"},{\"id\":\"97a1c2d6\",\"assignee\":\"Hạnh NTM\",\"title\":\"Triển khai hệ thống chấm công điện tử trên toàn Công ty. Check khuôn mặt và vị trí, thời gian vào ca và hết ca làm việc. Cuối tháng gửi bảng chấm công cho phòng TCHC\",\"created\":\"2026-03-02 10:10\",\"due\":\"2026-03-09 10:10\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-03-02 10:10\",\"createdBy\":\"CườngPK\"},{\"id\":\"0e9a7729\",\"assignee\":\"Thương TTA\",\"title\":\"Hướng dẫn đào tạo nhập liệu phần mềm AppSheet quản lý tiêm hộ. Lập báo cáo cuối ngày, cuối tháng\",\"created\":\"2026-03-02 10:12\",\"due\":\"2026-03-09 10:12\",\"status\":\"Việc cần làm\",\"support\":\"CườngPK\",\"blocker\":\"\",\"updated\":\"2026-03-02 10:12\",\"createdBy\":\"CườngPK\"},{\"id\":\"65d620b7\",\"assignee\":\"Hiếu NT\",\"title\":\"Hướng dẫn nhập liệu AppSheet phần hành luân chuyển kho Vacxin nội bộ từ Trung tâm này sang Trung tâm khác đào tạo làm báo cáo và kiểm tra số liệu đối chiếu giữa các Trung tâm với nhau\",\"created\":\"2026-03-02 10:14\",\"due\":\"2026-03-09 10:14\",\"status\":\"Việc cần làm\",\"support\":\"CườngPK\",\"blocker\":\"\",\"updated\":\"2026-03-02 10:14\",\"createdBy\":\"CườngPK\"},{\"id\":\"65c5fdc8\",\"assignee\":\"Hùng TM\",\"title\":\"Nhập liệu đơn đặt hàng lên AppSheet, Quản lý đơn hàng đã đặt từ khi đặt hàng đến khi hàng về đến kho của Trung tâm.\",\"created\":\"2026-03-02 10:16\",\"due\":\"2026-03-09 10:16\",\"status\":\"Việc cần làm\",\"support\":\"CườngPK\",\"blocker\":\"\",\"updated\":\"2026-03-02 10:16\",\"createdBy\":\"CườngPK\"},{\"id\":\"3237f4ca\",\"assignee\":\"Hùng TM\",\"title\":\"Làm báo cáo (Yêu cầu Kế toán dịch vụ Trường Thành) gửi báo cáo năm 2025 để chuyển cho Vietcombank và Vietinbank. Báo cáo nhanh năm 2026\",\"created\":\"2026-03-02 10:18\",\"due\":\"2026-03-03 10:18\",\"status\":\"Việc cần làm\",\"support\":\"CườngPK\",\"blocker\":\"\",\"updated\":\"2026-03-02 10:18\",\"createdBy\":\"CườngPK\"},{\"id\":\"ed7992b5\",\"assignee\":\"CườngPK\",\"title\":\"Mở tài khoản AppSheet cho thu ngân 19 trung tâm\",\"created\":\"2026-03-02 10:19\",\"due\":\"2026-03-09 10:19\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-03-02 11:47\",\"createdBy\":\"CườngPK\"},{\"id\":\"4c53b16d\",\"assignee\":\"CườngPK\",\"title\":\"Khảo sát thực trạng công việc phòng kế toán Công ty Giong Việt Nam. Lập giải pháp khắc phục việc tồn đọng, xây dựng quy trình làm việc. Tư vấn lãnh đạo biện pháp khắc phục\",\"created\":\"2026-03-02 10:32\",\"due\":\"2026-04-14 10:32\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM , Dịu NT\",\"blocker\":\"Phát sinh việc được cấp phần mềm Quy trình miễn phí từ Misa. Nên xây dựng quy trình để thực hiện trên phần mềm này\",\"updated\":\"2026-08-17 09:19\",\"createdBy\":\"CườngPK\"},{\"id\":\"1b7bf3cb\",\"assignee\":\"CườngPK\",\"title\":\"Triển khai quy trình quy chế , luồng công việc của các bộ phận liên quan đến kế toán thông kê dữ liệu. Từ thu ngân (quản lý tiền), thủ kho (Điều dưỡng) quản lý hàng đến kế toán bán hàng, Thủ kho trung tâm,\",\"created\":\"2026-03-02 10:34\",\"due\":\"2026-07-31 10:34\",\"status\":\"Việc cần làm\",\"support\":\"Thương TTA , Hùng TM , Hạnh NTM , Dịu NT , GĐ Thúy , Hiếu NT , PGĐ_Châu HM\",\"blocker\":\"\",\"updated\":\"2026-03-02 10:34\",\"createdBy\":\"CườngPK\"},{\"id\":\"ab121a5b\",\"assignee\":\"CườngPK\",\"title\":\"Kiểm tra lại quy trình làm việc đã triển khai trong 5 tháng từ T3 đến T7. Điều chỉnh những phần hạn chế.\",\"created\":\"2026-03-02 10:40\",\"due\":\"2026-10-31 10:40\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM , Thương TTA , Hạnh NTM , GĐ Thúy , PGĐ_Châu HM , Hiếu NT , Dịu NT\",\"blocker\":\"\",\"updated\":\"2026-03-02 10:40\",\"createdBy\":\"CườngPK\"},{\"id\":\"69df1a0b\",\"assignee\":\"CườngPK\",\"title\":\"Tổng hợp quy trình, quy chế. Báo cáo kết quả và giao lại cho kế toán trưởng theo dõi và điều hành\",\"created\":\"2026-03-02 10:41\",\"due\":\"2026-12-31 10:41\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM , GĐ Thúy , PGĐ_Châu HM\",\"blocker\":\"\",\"updated\":\"2026-03-02 10:41\",\"createdBy\":\"CườngPK\"},{\"id\":\"0c979761\",\"assignee\":\"CườngPK\",\"title\":\"Lập báo nộp cơ quan thuế cáo tài chính năm 2026.\\n1. Báo cáo tài chính\\n2. Quyết toán thuế TNDN\\n3. Quyết toán thuế TNCN (Nhân sự thực hiện, kế toán kiểm tra)\\nLập báo cáo nộp cơ quan thống kê (Nhân sự thực hiện, kế toán kiểm tra)\",\"created\":\"2026-03-02 10:45\",\"due\":\"2027-02-27 10:45\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM , Dịu NT\",\"blocker\":\"\",\"updated\":\"2026-03-02 10:45\",\"createdBy\":\"CườngPK\"},{\"id\":\"867de0c7\",\"assignee\":\"CườngPK\",\"title\":\"Phòng Kế toán nhận thêm việc từ phòng Nhân Sự gồm:\\n1. Bảng lương chuẩn để nộp phòng kế toán dùng báo cáo cơ quan thuế\\n2. Tờ khai thuế TNCN tháng 2,3,4,5\\nChuyển lại toàn bộ cho Phòng nhân sự làm từ T6/2026. Phòng nhân sự quyết toán thuế TNCN cho người lao động\",\"created\":\"2026-03-02 10:47\",\"due\":\"2026-05-31 10:47\",\"status\":\"Việc cần làm\",\"support\":\"Hạnh NTM , Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-03-02 10:47\",\"createdBy\":\"CườngPK\"},{\"id\":\"f153cd89\",\"assignee\":\"CườngPK\",\"title\":\"Chuẩn hóa chất liệu từ khâu nhập hàng ở nhà cung cấp tại phần mềm bán hàng SMED điểm báo cáo tài chính \\nBao gồm mã hàng hóa mã dịch vụ mã nhà cung cấp mã khách hàng\",\"created\":\"2026-03-02 12:21\",\"due\":\"2026-03-09 12:21\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Thương TTA , Dịu NT , GIONG_LB , GIONG_SĐ , GIONG_TO , GIONG_QO , GIONG_BH , GIONG_ML , GIONG_TP , GIONG_CĐ , GIONG_TĐ , GIONG_LM , GIONG_TA , GIONG_PY , GIONG_ĐX , GIONG_TS , GIONG_HM , GIONG_TD , GIONG_ĐY , GIONG_NL , GIONG_TT\",\"blocker\":\"\",\"updated\":\"2026-04-07 12:49\",\"createdBy\":\"CườngPK\"},{\"id\":\"a83d7bf2\",\"assignee\":\"Dịu NT\",\"title\":\"Viết báo cáo thu hoạch về việc được đào tạo, hướng dẫn lập báo cáo doanh số ngày \\n1. Doanh thu \\n2. Thu tiền\\n3. Lợi nhuận\\nLập quy trình làm việc để tạo được các báo cáo trên\",\"created\":\"2026-03-02 12:41\",\"due\":\"2026-03-09 12:41\",\"status\":\"Đã xong\",\"support\":\"CườngPK , Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-04-09 14:09\",\"createdBy\":\"CườngPK\"},{\"id\":\"44eaa321\",\"assignee\":\"Hạnh NTM\",\"title\":\"Đăng ký mã số thuế của chủ tài sản là PGĐ Châu về việc cho thuê nhà ở (cho khách khác thuê) và phương tiện (ô tô cho công ty Giong thuê) .\",\"created\":\"2026-03-02 15:51\",\"due\":\"2026-03-09 15:51\",\"status\":\"Đã xong\",\"support\":\"CườngPK , Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-03-24 17:05\",\"createdBy\":\"CườngPK\"},{\"id\":\"c7852cd9\",\"assignee\":\"CườngPK\",\"title\":\"Xem lại quy trình thu mua vật tư, CCDC, tổng hợp, điều chỉnh, áp dụng vào thực tế. Thay đổi cho phù hợp với luật quản lý của Nhà nước\",\"created\":\"2026-03-02 16:08\",\"due\":\"2026-03-13 16:08\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-03-22 15:18\",\"createdBy\":\"CườngPK\"},{\"id\":\"7671c105\",\"assignee\":\"CườngPK\",\"title\":\"Họp Online nhân sự thu ngân và điều dưỡng 19 trung tâm tiêm chủng để hướng dẫn quy trình nghiệp vụ:\\n1. Quy trình nghiệp vụ thu ngân - tiêm hộ\\n2. Quy trình nghiệp vụ kho - quản lý số lượng vacxin gữi hộ để tiêm hộ và vacxin gửi đi nhờ tiêm hộ\\n3. Vận dụng AppSheet vào triển khai hệ thống giao nhận nội bộ (Nhận Vacxin để tiêm hộ và gửi Vacxin nhờ tiêm hộ)\",\"created\":\"2026-03-02 16:47\",\"due\":\"2026-03-04 14:00\",\"status\":\"Đã xong\",\"support\":\"Thương TTA , Hiếu NT\",\"blocker\":\"\",\"updated\":\"2026-03-06 07:41\",\"createdBy\":\"CườngPK\"},{\"id\":\"2afc56c9\",\"assignee\":\"CườngPK\",\"title\":\"Họp Online với Misa về quá trình đồng bộ dữ liệu từ SMED vào MISA AMIS\",\"created\":\"2026-03-02 17:10\",\"due\":\"2026-03-03 08:00\",\"status\":\"Đã xong\",\"support\":\"Thương TTA , Hùng TM , Dịu NT\",\"blocker\":\"\",\"updated\":\"2026-03-03 11:38\",\"createdBy\":\"CườngPK\"},{\"id\":\"1a215ae3\",\"assignee\":\"CườngPK\",\"title\":\"Hoàn thiện quy trình và cách thức truy xuất dữ liệu từ SMED + Google Drive    (nhập xuất nội bộ) dùng Python lấy định kỳ lúc 19h lấy báo cáo từ Google Drive [Smed (4) bảng kê gửi lên từ thu ngân (2), Điều dưỡng (2)] + Bảng kê nhật ký luân chuyển hàng nội bộ từ Google Drive. \\nĐặt công thức tự động để Python làm sạch dữ liệu của 19 trung tâm + Công thức tính giá vốn, lợi nhuận, báo cáo nhập xuất tồn. Gộp lại thành 1 file báo cáo dạng EXCEL (01 để lưu) 01 tự động upload lên SQL Server thành báo cáo theo tháng hoặc theo năm\\nDùng Power BI lấy báo cáo từ SQL Server để tổng hợp phân tích và làm báo cáo trực quan bằng hình ảnh.\\nCác báo cáo cần có trên Power BI gồm:\\n1. Báo cáo doanh thu (dữ liệu theo ngày, tháng, quý, năm) \\n2. Báo cáo thu tiền \\n3. Báo cáo nhập xuất tồn kho (Nhập từ NCC, Nhập ĐC, Xuất bán, Xuất ĐC)\\n4. Báo cáo hàng cận hạn sử dụng\\n5. Báo cáo lợi nhuận + tỷ suất lợi nhuận gộp\\n6. Báo cáo thực hiện công việc hàng ngày theo \\n7. Báo cáo nhân sự...\",\"created\":\"2026-03-03 11:55\",\"due\":\"2026-06-30 11:55\",\"status\":\"Đã xong\",\"support\":\"Thương TTA , Hạnh NTM , Dịu NT , Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-03-04 08:20\",\"createdBy\":\"CườngPK\"},{\"id\":\"b99ca11e\",\"assignee\":\"CườngPK\",\"title\":\"Lập phiếu nhập kho đồng loạt trên Misa Offline để nhâp phiếu hóa đơn bán hàng lấy dữ liệu đối chiếu với SMED\",\"created\":\"2026-03-03 15:09\",\"due\":\"2026-03-04 15:09\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-03-17 07:15\",\"createdBy\":\"CườngPK\"},{\"id\":\"2140fc7a\",\"assignee\":\"CườngPK\",\"title\":\"Vấn đề Trung tâm A tiêm trả nợ khách đặt trước hoặc mua gói trước của TT khác chưa được giải quyết. \\nPhần Mềm Smed không đồng bộ 19 trung tâm với nhau nên:\\n- Trả nợ mũi tiêm của khách trung tâm nào thì chỉ trung tâm đó mới cập nhật trên SMED để bù trừ công nợ ---> phát hành hóa đơn GTGT\\n- Nếu TT tiêm trả nợ thay không ghi số tiền vào phiếu thì sẽ không in được hóa đơn GTGT (Bắt buộc phải ghi vào phần thu bằng tiền mặt) thì mới tạo phiếu và xuất Vacxin ra để tiêm, điều dưỡng hoàn thành mũi tiêm, lưu vào SMED và hệ thống tiêm chủng quốc gia.\\n- Có trường hợp khách đặt trước tiền của TT (A) đến TT (B) để tiêm, còn Vacxin lại lấy của TT (C)\\n-\",\"created\":\"2026-03-05 14:26\",\"due\":\"2026-03-12 14:26\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-03-22 15:18\",\"createdBy\":\"CườngPK\"},{\"id\":\"bef1aa8a\",\"assignee\":\"CườngPK\",\"title\":\"Chuyển bảng lương T12/2025 theo phần quyết toán thuế TNCN T1/2026 chi trả cho Hùng để gửi kế toán dịch vụ Trường Thành\",\"created\":\"2026-03-06 07:42\",\"due\":\"2026-03-13 07:42\",\"status\":\"Đã xong\",\"support\":\"Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-03-06 07:55\",\"createdBy\":\"CườngPK\"},{\"id\":\"40f185ed\",\"assignee\":\"CườngPK\",\"title\":\"Làm việc cùng Mrs Hạnh Nhân sự - Lập quy chế, thang bảng lương, hợp đồng lao động - Thu nhập cá nhân\",\"created\":\"2026-03-09 07:40\",\"due\":\"2026-03-14 07:40\",\"status\":\"Đã xong\",\"support\":\"Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-03-17 07:15\",\"createdBy\":\"CườngPK\"},{\"id\":\"f5ca53d5\",\"assignee\":\"Hùng TM\",\"title\":\"Ktra CTKM Quý 1 các hãng lên kế hoạch đơn hàng\",\"created\":\"2026-03-09 07:42\",\"due\":\"2026-03-10 07:42\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-03-10 17:58\",\"createdBy\":\"Hùng TM\"},{\"id\":\"6a793919\",\"assignee\":\"CườngPK\",\"title\":\"Hướng dẫn nhập liệu điều chuyển Vắc xin nội bộ cho bộ phận kho hàng\",\"created\":\"2026-03-09 07:54\",\"due\":\"2026-03-10 07:54\",\"status\":\"Đã xong\",\"support\":\"Hiếu NT , Thủy TTT\",\"blocker\":\"\",\"updated\":\"2026-03-11 14:40\",\"createdBy\":\"CườngPK\"},{\"id\":\"f1aa039a\",\"assignee\":\"CườngPK\",\"title\":\"Nghiên cứu cách nhập hàng loạt chứng từ chuyển khoản ngân hàng techcombank để lập giao dịch chuyển tiền cho nhà cung cấp theo các đơn hàng.\",\"created\":\"2026-03-09 08:07\",\"due\":\"2026-03-14 08:07\",\"status\":\"Đã xong\",\"support\":\"Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-03-17 07:15\",\"createdBy\":\"CườngPK\"},{\"id\":\"b97b20ca\",\"assignee\":\"CườngPK\",\"title\":\"Thời gian lập báo cáo tồn kho hàng tháng\\n- Báo cáo tồn kho thực tế kiểm kê cuối tháng (Bộ phận kho). ngày 01-02 đầu tháng sau.\\n- Báo cáo tồn kho của kế toán: \\n+ Tên_Lô_Số lượng_Giá_Tiền\\n+ Báo cáo Xuất nhập tồn: Số lượng và Tiền \\n+ Biên bản kiêm kê Vắc xin cho các Trung tâm phục vụ đoàn kiểm tra\",\"created\":\"2026-03-11 14:41\",\"due\":\"2026-03-18 14:41\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-06-22 10:16\",\"createdBy\":\"CườngPK\"},{\"id\":\"10ce2ac6\",\"assignee\":\"Hùng TM\",\"title\":\"Kiểm tra doanh thu cuối T3.2026 trên phần mềm hóa đơn Misa và với Smed và hướng xử lý chênh lệch, sai sót.\",\"created\":\"2026-03-12 10:03\",\"due\":\"2026-04-01 10:03\",\"status\":\"Việc cần làm\",\"support\":\"CườngPK\",\"blocker\":\"\",\"updated\":\"2026-03-12 10:03\",\"createdBy\":\"Hùng TM\"},{\"id\":\"2aa8d063\",\"assignee\":\"CườngPK\",\"title\":\"Kiểm tra lại báo cáo tồn khổ T2/2026. Sếp báo lệch khó thực tế. Công thêm số lượng hàng đặt nhưng hàng chưa về kho\",\"created\":\"2026-03-15 09:20\",\"due\":\"2026-03-16 09:20\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Dịu NT , Hiếu NT\",\"blocker\":\"\",\"updated\":\"2026-03-17 07:15\",\"createdBy\":\"CườngPK\"},{\"id\":\"25558d66\",\"assignee\":\"CườngPK\",\"title\":\"Báo cáo kết quả kinh doanh T1&2 Hùng thực hiện\",\"created\":\"2026-03-15 09:22\",\"due\":\"2026-03-26 09:22\",\"status\":\"Đã xong\",\"support\":\"Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-06-22 10:16\",\"createdBy\":\"CườngPK\"},{\"id\":\"c2edd30d\",\"assignee\":\"CườngPK\",\"title\":\"Xem lại kết cấu bảng lương mới báo lại số thay đổi cho Sếp\",\"created\":\"2026-03-15 09:23\",\"due\":\"2026-03-16 09:23\",\"status\":\"Đã xong\",\"support\":\"Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-03-18 14:58\",\"createdBy\":\"CườngPK\"},{\"id\":\"1fd1fa4c\",\"assignee\":\"CườngPK\",\"title\":\"Lập tờ khai thuế TNCN theo lương Tháng 1. Chi trả tháng 2, báo cáo ngày 20 tháng kế tiếp tháng chị trả thu nhập.\",\"created\":\"2026-03-17 07:15\",\"due\":\"2026-03-18 07:15\",\"status\":\"Đã xong\",\"support\":\"Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-03-18 08:50\",\"createdBy\":\"CườngPK\"},{\"id\":\"889c1a7d\",\"assignee\":\"CườngPK\",\"title\":\"Lập tờ khai thuế GTGT Tháng 2/2026\",\"created\":\"2026-03-17 07:17\",\"due\":\"2026-03-18 07:17\",\"status\":\"Đã xong\",\"support\":\"Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-03-18 08:50\",\"createdBy\":\"CườngPK\"},{\"id\":\"35827074\",\"assignee\":\"CườngPK\",\"title\":\"Tổng hợp lô hạn Vacxin sai giữa phần mềm SMED với thực tế khi kiểm kê. Làm việc cụ thể và đưa ra quy trình xử lý. Thống nhất báo lãnh đạo cho chủ trương và biện pháp khắc phục cho các lần sau.\",\"created\":\"2026-03-23 10:26\",\"due\":\"2026-03-24 10:26\",\"status\":\"Đã xong\",\"support\":\"Thương TTA , Thủy TTT\",\"blocker\":\"\",\"updated\":\"2026-03-25 15:22\",\"createdBy\":\"CườngPK\"},{\"id\":\"67fd5d30\",\"assignee\":\"CườngPK\",\"title\":\"Hoàn thiện file nhật ký điều chuyển Vacxin nội bộ\",\"created\":\"2026-03-24 07:09\",\"due\":\"2026-03-31 07:09\",\"status\":\"Đã xong\",\"support\":\"Hiếu NT , Thủy TTT\",\"blocker\":\"Đối chiếu với bảng chuyển nội bộ các trung tâm\",\"updated\":\"2026-03-25 15:22\",\"createdBy\":\"CườngPK\"},{\"id\":\"8a339090\",\"assignee\":\"Hạnh NTM\",\"title\":\"Làm thủ tục chuyển đổi mua bán cổ phần công ty Từ Mr Chinh sang Mrs Dung.\",\"created\":\"2026-03-24 07:49\",\"due\":\"2026-03-26 07:49\",\"status\":\"Đã xong\",\"support\":\"CườngPK , GĐ Thúy\",\"blocker\":\"\",\"updated\":\"2026-03-24 14:25\",\"createdBy\":\"CườngPK\"},{\"id\":\"89b91e1c\",\"assignee\":\"CườngPK\",\"title\":\"Hoàn thiện báo cáo kết quả SXKD T1+T2 -2026\",\"created\":\"2026-03-24 11:19\",\"due\":\"2026-03-31 11:19\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Hiếu NT , Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-06-22 10:16\",\"createdBy\":\"CườngPK\"},{\"id\":\"ec6c4773\",\"assignee\":\"CườngPK\",\"title\":\"Kiểm tra lại cách thực hiện điều chỉnh lại PNK sau khi đã bỏ tick lưu tiêm của TT Quốc Oai T2/2026\",\"created\":\"2026-03-25 15:23\",\"due\":\"2026-04-03 15:23\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-06-22 10:16\",\"createdBy\":\"CườngPK\"},{\"id\":\"72ca2149\",\"assignee\":\"CườngPK\",\"title\":\"Check sơ bộ báo cáo tài chính năm 2025 của Trường Thành. Để đẩy dữ liệu vào phần mềm kế toán Misa AMIS\",\"created\":\"2026-03-31 09:29\",\"due\":\"2026-04-07 09:29\",\"status\":\"Đã xong\",\"support\":\"Dịu NT , Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-04-07 12:48\",\"createdBy\":\"Cuongpk.Giong02\"},{\"id\":\"c4a87cb6\",\"assignee\":\"CườngPK\",\"title\":\"Lập quy trình điều chỉnh hàng hóa  Vắc xin khi phát hiện sai lệch trong quá trình kiểm kê. Lệch lô sản xuất, hạn sử dụng. Thừa, thiếu...\",\"created\":\"2026-03-31 11:47\",\"due\":\"2026-04-14 11:47\",\"status\":\"Đã xong\",\"support\":\"Thương TTA , GĐ Thúy\",\"blocker\":\"Đã báo cáo Giám đốc và xin ý kiến chủ trương xử lý vấn đề lệch lô hạn\\nNguyên nhân:\\n1. Nhân viên nhập liệu gõ sai lô hạn khi nhập kho\\n2. Điều chuyển nội bộ, tiêm hộ, lấy dữ liệu khi nhập bị sai sót giữa các trung tâm\\n3. Trung tâm lấy Vắc xin\",\"updated\":\"2026-06-22 10:16\",\"createdBy\":\"CườngPK\"},{\"id\":\"893aa8fb\",\"assignee\":\"CườngPK\",\"title\":\"Cập nhật phần mềm kế toán Misa AMIS. Tạo danh mục và upload dữ liệu từ ngày 01/04/2026\",\"created\":\"2026-04-01 08:38\",\"due\":\"2026-04-06 08:38\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Dịu NT\",\"blocker\":\"\",\"updated\":\"2026-04-07 12:49\",\"createdBy\":\"CườngPK\"},{\"id\":\"2e7efd87\",\"assignee\":\"CườngPK\",\"title\":\"Hoàn thiện biện pháp thu tiền đặt trước mũi tiêm và đặt gói dịch vụ. Phát hành hoá đơn GTGT. Đáp ứng ND 132/NĐCP về quy định phát hành hoá đơn sai thời điểm. SMES triển khai\",\"created\":\"2026-04-07 21:39\",\"due\":\"2026-04-14 21:39\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-04-09 07:50\",\"createdBy\":\"CườngPK\"},{\"id\":\"9317ca2d\",\"assignee\":\"CườngPK\",\"title\":\"Xây dựng quy trình theo phần mềm Quy trình của Misa cung cấp cho toàn bộ hệ thống các trung tâm và Văn phòng.\\nYêu cầu các nhân sự là:\\n1. Ký hợp đồng lao động dài hạn\\n2. Phụ trách các trung tâm\\n3. Thu ngân, Marketing các trung tâm\\n4. Bộ phận kho hàng\",\"created\":\"2026-04-09 07:56\",\"due\":\"2026-04-16 07:56\",\"status\":\"Đã xong\",\"support\":\"Hạnh NTM , GĐ Thúy , PGĐ_Châu HM\",\"blocker\":\"\",\"updated\":\"2026-06-22 10:16\",\"createdBy\":\"CườngPK\"},{\"id\":\"1bf8e755\",\"assignee\":\"CườngPK\",\"title\":\"Lập báo cáo truy xuất nguồn gốc các chứng từ liên quan từ khâu bán ra trên phần mềm MeInvoice đến Misa Amis đến SMED (Phát hành hóa đơn ---> Xuất kho ---> Nhập kho) Lưu trữ cùng báo cáo bán hàng + File excel để đối chiếu kiểm tra\",\"created\":\"2026-04-09 07:57\",\"due\":\"2026-04-10 07:57\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Dịu NT\",\"blocker\":\"\",\"updated\":\"2026-06-22 10:16\",\"createdBy\":\"CườngPK\"},{\"id\":\"0c98096a\",\"assignee\":\"CườngPK\",\"title\":\"Báo cáo thuế tháng 3 gồm:\\n1. Tờ khai thuế GTGT tháng 3\\n2. Tờ khai thuế TNCN + tiền thuế phải nộp\\n3. Nộp thuế và đính kèm danh sách người lao động phải nộp lên giấy nộp tiền thuế\",\"created\":\"2026-04-09 08:01\",\"due\":\"2026-04-16 08:01\",\"status\":\"Đã xong\",\"support\":\"Hạnh NTM , Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-06-22 10:15\",\"createdBy\":\"CườngPK\"},{\"id\":\"76fe43a4\",\"assignee\":\"CườngPK\",\"title\":\"Nhận bàn giao sổ sách, dữ liệu từ kế toán dịch vụ Trường Thành. Sau khi đã chỉnh sửa báo cáo đã nộp theo số thực tế của đơn vị hoặc Cty Gióng chấp nhận những việc chưa làm được của Trường Thành để xử lý sau.\",\"created\":\"2026-04-09 08:02\",\"due\":\"2026-04-16 08:02\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-06-22 10:15\",\"createdBy\":\"CườngPK\"},{\"id\":\"f868bdc3\",\"assignee\":\"CườngPK\",\"title\":\"Thiết lập lại hệ thống kế toán để cập nhật trên phần mềm kế toán Misa Amis. Phục vụ việc đào tạo nhập liệu cơ bản của đơn vị Misa\",\"created\":\"2026-04-09 08:04\",\"due\":\"2026-04-13 08:04\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Dịu NT\",\"blocker\":\"\",\"updated\":\"2026-06-22 10:15\",\"createdBy\":\"CườngPK\"},{\"id\":\"d6fc6d03\",\"assignee\":\"Dịu NT\",\"title\":\"Check báo cáo bán hàng PDF - SMED từ ngày 1/4 đến 8/4\",\"created\":\"2026-04-09 14:06\",\"due\":\"2026-04-11 14:06\",\"status\":\"Việc cần làm\",\"support\":\"CườngPK\",\"blocker\":\"\",\"updated\":\"2026-04-09 14:06\",\"createdBy\":\"Dịu NT\"},{\"id\":\"e0152be2\",\"assignee\":\"Dịu NT\",\"title\":\"Đối chiếu lại công nợ khách hàng đặt trước + gói trên Misa SME với file danh sách các chi nhánh gửi\",\"created\":\"2026-04-09 14:09\",\"due\":\"2026-04-30 14:09\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"Số lượng khách gói còn công nợ nhiều, xử lý vào thời gian trống (nếu có)\",\"updated\":\"2026-04-09 14:09\",\"createdBy\":\"Dịu NT\"},{\"id\":\"31f84f0c\",\"assignee\":\"Dịu NT\",\"title\":\"Hoàn thành xử lý thuế TNCN của sếp với CQT LB\",\"created\":\"2026-04-09 14:12\",\"due\":\"2026-04-19 14:12\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM , CườngPK\",\"blocker\":\"Chưa hiểu rõ quy trình và kinh nghiệm thực tiễn\",\"updated\":\"2026-04-09 14:12\",\"createdBy\":\"Dịu NT\"},{\"id\":\"e8e10f44\",\"assignee\":\"CườngPK\",\"title\":\"Lập file đối soát giữa hoá đơn misa và hoá đơn Smed và phiếu xuất kho Smed và phiếu nhập kho Smed. Mục đích truy xuất dữ liệu từ khi nhập đến khi bán của từng vắc xin và truy xuất ngược lại\",\"created\":\"2026-04-10 07:11\",\"due\":\"2026-04-11 07:11\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Dịu NT\",\"blocker\":\"\",\"updated\":\"2026-06-22 10:15\",\"createdBy\":\"CườngPK\"},{\"id\":\"7b0ca515\",\"assignee\":\"CườngPK\",\"title\":\"Thúc giục bộ phận kho hàng lên danh sách hàng lệch lô hạn để trình Sếp phương án điều chỉnh do lệch lô theo đúng thực tế\",\"created\":\"2026-04-10 13:47\",\"due\":\"2026-04-14 13:47\",\"status\":\"Đã xong\",\"support\":\"Hiếu NT , Thủy TTT , DsTra\",\"blocker\":\"\",\"updated\":\"2026-06-22 10:15\",\"createdBy\":\"CườngPK\"},{\"id\":\"6eab941c\",\"assignee\":\"DsTra\",\"title\":\"Lập báo cáo kiểm kê kho của từng trung tâm phục vụ thanh tra kiểm tra từ T12/25 đến T3/26\",\"created\":\"2026-04-10 13:49\",\"due\":\"2026-04-14 13:49\",\"status\":\"Việc cần làm\",\"support\":\"CườngPK , Hiếu NT , Thủy TTT\",\"blocker\":\"\",\"updated\":\"2026-04-10 13:49\",\"createdBy\":\"CườngPK\"},{\"id\":\"c4919209\",\"assignee\":\"CườngPK\",\"title\":\"Thúc giục Kế toán dịch vụ Trường Thành xử lý báo cáo và chuyển bàn giao sổ sách cập nhật số dư đầu kỳ 2026\",\"created\":\"2026-04-11 08:22\",\"due\":\"2026-04-18 08:22\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , GĐ Thúy\",\"blocker\":\"Trường Thành ko cung cấp sổ quỹ, ccdc, tscđ... Ko sửa khó hàng, lãi vay\",\"updated\":\"2026-06-22 10:15\",\"createdBy\":\"CườngPK\"},{\"id\":\"1741cec0\",\"assignee\":\"CườngPK\",\"title\":\"Nhận đào tạo từ Misa AMIS 2 ngày 13 và 14 /04/2026\",\"created\":\"2026-04-13 13:31\",\"due\":\"2026-04-14 13:31\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-04-14 17:59\",\"createdBy\":\"CườngPK\"},{\"id\":\"947e90f1\",\"assignee\":\"CườngPK\",\"title\":\"Nhận bàn giao hồ sơ của Công ty Trường thành Báo cáo tài chính 2025\",\"created\":\"2026-04-14 08:02\",\"due\":\"2026-06-30 08:02\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM , Dịu NT\",\"blocker\":\"Chưa nhận được\",\"updated\":\"2026-04-14 08:02\",\"createdBy\":\"CườngPK\"},{\"id\":\"b1c4d54c\",\"assignee\":\"CườngPK\",\"title\":\"Ghi nhớ các cuộc họp lần sau\\n1. Nội dung cuộc họp  - Chuẩn bị trước tinh thần các câu hỏi liên quan có thể các trung tâm sẽ đặt ra để chất vấn\\n2. Người điều hành cuộc họp phải bám sát nội dung chủ đạo của cuộc họp để điều tiết cho hợp lý\\nVí dụ: Ngày 15/04/2026 họp có phần quy chế và cách tính lương Kpi để nâng cao năng suất công việc và tăng thu nhập cho người lao động. Giảm các chi phí lương khi trung tâm không đạt chỉ tiêu (Tránh lãng phí cho chủ doanh nghiệp). Cần người điều tiết lấy ý kiến đầu tiên của các trung tâm có doanh số cao, mũi tiêm nhiều, luôn luôn đạt hoặc vượt chỉ tiêu. Đây là nhân tố ảnh hưởng lớn đến quá trình đạt được mục đích của cuộc họp. Các trung tâm sau cũng rè chừng khi phản bác kế hoạch. Bộ phận phòng ban giúp việc cho giám đốc cũng không bị cuốn theo những ý kiến trái chiều mà chỉ tập trung vào mục đích của kế hoạch đặt ra.\",\"created\":\"2026-04-16 07:50\",\"due\":\"2026-04-23 07:50\",\"status\":\"Đã xong\",\"support\":\"Hạnh NTM , GĐ Thúy , PGĐ_Châu HM\",\"blocker\":\"\",\"updated\":\"2026-05-01 09:54\",\"createdBy\":\"CườngPK\"},{\"id\":\"c98f14f0\",\"assignee\":\"CườngPK\",\"title\":\"Chỉnh sửa lại code của báo cáo truy xuất ngược từ HĐ GTGT đến PNK. \\nSMED không làm được do phần mềm đã đóng gói. Nếu cần họ có thể làm nhưng mất phí\",\"created\":\"2026-04-16 08:23\",\"due\":\"2026-04-18 08:23\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-05-01 09:54\",\"createdBy\":\"CườngPK\"},{\"id\":\"4e1d670f\",\"assignee\":\"Thương TTA\",\"title\":\"Đôn đốc, rà soát, theo dõi việc hẹn khách, gọi điện nhắc lịch mời tiêm của các TT Gióng\",\"created\":\"2026-04-16 09:27\",\"due\":\"2026-04-29 11:30\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-05-06 10:33\",\"createdBy\":\"\"},{\"id\":\"dc39912d\",\"assignee\":\"Thương TTA\",\"title\":\"Phối hợp Phòng Kế Toán, Kho để điều chỉnh lô hạn bị sai lệch (tồn đọng) cho các TT (GĐY, GNL, GBH) ...\",\"created\":\"2026-04-16 09:32\",\"due\":\"2026-04-29 11:30\",\"status\":\"Đã xong\",\"support\":\"CườngPK , Hiếu NT , DsTra , Thủy TTT\",\"blocker\":\"\",\"updated\":\"2026-05-06 10:33\",\"createdBy\":\"Thương TTA\"},{\"id\":\"d0574d5a\",\"assignee\":\"Thương TTA\",\"title\":\"Gia hạn hoặc xin cấp lại định danh GIONGVINA\",\"created\":\"2026-04-16 09:36\",\"due\":\"2026-05-31 09:36\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-04-16 09:36\",\"createdBy\":\"Thương TTA\"},{\"id\":\"2c626751\",\"assignee\":\"CườngPK\",\"title\":\"Hoàn thiện báo cáo thuế GTGT tháng 3/2026, Thuế TNCN tháng 2/2026\",\"created\":\"2026-04-17 08:15\",\"due\":\"2026-04-18 08:15\",\"status\":\"Đã xong\",\"support\":\"Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-04-21 07:48\",\"createdBy\":\"CườngPK\"},{\"id\":\"d82c02de\",\"assignee\":\"CườngPK\",\"title\":\"Xây dựng quy chế trả lương thưởng theo phương pháp mới tính lương KPI theo tiến độ quý 2, 3,4 để báo cáo thuế và kiểm soát chi phí nội bộ. Giúp tư vấn về tổng chi phí biến đổi + chi phí cố định. Tính điểm hòa vốn\",\"created\":\"2026-04-17 09:18\",\"due\":\"2026-04-24 09:18\",\"status\":\"Đã xong\",\"support\":\"Hạnh NTM , GĐ Thúy , Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-04-29 11:01\",\"createdBy\":\"CườngPK\"},{\"id\":\"92ac56ea\",\"assignee\":\"CườngPK\",\"title\":\"Hướng dẫn Mrs Hạnh kê khai thuế TNCN. Áp dụng quy trình và hướng dẫn thực hiện.\",\"created\":\"2026-04-17 14:55\",\"due\":\"2026-04-17 14:55\",\"status\":\"Đã xong\",\"support\":\"Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-04-17 15:55\",\"createdBy\":\"CườngPK\"},{\"id\":\"a2256af2\",\"assignee\":\"CườngPK\",\"title\":\"Làm việc cùng PGD Về việc thuê nhà Tâm An\",\"created\":\"2026-04-21 07:34\",\"due\":\"2026-04-21 10:34\",\"status\":\"Đã xong\",\"support\":\"PGĐ_Châu HM\",\"blocker\":\"\",\"updated\":\"2026-04-22 07:41\",\"createdBy\":\"CườngPK\"},{\"id\":\"ea5dde21\",\"assignee\":\"CườngPK\",\"title\":\"Tạo file code Python bảng tổng hợp nhập kho, xuất kho, tồn kho trong ngày. \\nNghiên cứu đưa vào code nhập kho có đơn hàng đã trả tiền NCC nhưng hàng chưa về kho (có hóa đơn hoặc chưa có hóa đơn)\",\"created\":\"2026-04-21 07:50\",\"due\":\"2026-04-28 07:50\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , DsTra , Thủy TTT\",\"blocker\":\"\",\"updated\":\"2026-05-20 09:02\",\"createdBy\":\"CườngPK\"},{\"id\":\"738d5c8f\",\"assignee\":\"CườngPK\",\"title\":\"Thêm phần hành biên bản họp trong AppSheet để lưu trữ các biên bản cuộc họp\",\"created\":\"2026-04-21 07:54\",\"due\":\"2026-05-30 07:54\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-04-21 07:54\",\"createdBy\":\"CườngPK\"},{\"id\":\"ea7f6747\",\"assignee\":\"Hạnh NTM\",\"title\":\"Tập hợp chi phí cố định, chi phí biến đổi các trung tâm trong 3 tháng gần nhất để tính toán đưa ra phương pháp khoán chỉ tiêu cho các trung tâm. Áp dụng mức lương KPI. T3 tuần sau ngày 28.04.2026. Họp thống nhất\",\"created\":\"2026-04-22 07:44\",\"due\":\"2026-04-28 07:44\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , CườngPK\",\"blocker\":\"\",\"updated\":\"2026-05-20 07:37\",\"createdBy\":\"CườngPK\"},{\"id\":\"16fcf625\",\"assignee\":\"Hiếu NT\",\"title\":\"Kiểm kê tài sản cố định, CCDC của các trung tâm gửi PKT đối chiếu số liệu sổ sách báo cáo (Trường Thành) thuế và thực tế.\",\"created\":\"2026-04-22 07:45\",\"due\":\"2026-04-29 07:45\",\"status\":\"Việc cần làm\",\"support\":\"CườngPK , Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-04-22 07:45\",\"createdBy\":\"CườngPK\"},{\"id\":\"a0177c31\",\"assignee\":\"DsTra\",\"title\":\"Thống kê kiểm hàng Vắc Xin lệch lô hạn của các trung tâm. Xử lý từng hàng hóa cùng PKT và Mrs Thương Marketing\",\"created\":\"2026-04-22 07:47\",\"due\":\"2026-04-29 07:47\",\"status\":\"Việc cần làm\",\"support\":\"CườngPK , Thương TTA , Hùng TM , Thủy TTT\",\"blocker\":\"\",\"updated\":\"2026-04-22 07:47\",\"createdBy\":\"CườngPK\"},{\"id\":\"5395a4a4\",\"assignee\":\"CườngPK\",\"title\":\"Họp giao ban tuần thứ 5 tháng 4 năm 2026.\\nHoàn thiện cách trả lương Kpi điểm hòa vốn làm Slide trình chiếu cho cuộc họp ngày 29/04/2026\",\"created\":\"2026-04-28 10:19\",\"due\":\"2026-05-05 10:19\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-05-01 09:55\",\"createdBy\":\"CườngPK\"},{\"id\":\"9ae36ea7\",\"assignee\":\"CườngPK\",\"title\":\"Triển khai phần mềm chấm công điện tử trên AppSheet cho các nhân sự tại các trung tâm tiêm chủng\",\"created\":\"2026-05-04 09:32\",\"due\":\"2026-05-18 09:32\",\"status\":\"Đã xong\",\"support\":\"Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-05-20 09:02\",\"createdBy\":\"CườngPK\"},{\"id\":\"dc73cc17\",\"assignee\":\"CườngPK\",\"title\":\"Báo cáo kiểm kê tồn kho Vắc Xin T4/2026\",\"created\":\"2026-05-04 09:39\",\"due\":\"2026-05-05 09:39\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , DsTra\",\"blocker\":\"\",\"updated\":\"2026-06-22 10:15\",\"createdBy\":\"CườngPK\"},{\"id\":\"4aed860f\",\"assignee\":\"CườngPK\",\"title\":\"Báo cáo kiểm kê TSCĐ, CCDC các trung tâm tiêm chủng. Hiếu đã gửi bản Scan\",\"created\":\"2026-05-04 09:42\",\"due\":\"2026-05-30 09:42\",\"status\":\"Việc cần làm\",\"support\":\"Hiếu NT\",\"blocker\":\"\",\"updated\":\"2026-05-04 09:42\",\"createdBy\":\"CườngPK\"},{\"id\":\"ce62caed\",\"assignee\":\"CườngPK\",\"title\":\"Quyết định giao khoán sản lượng mũi tiêm cho các trung tâm tiêm chủng từ T5/2026 dựa trên Điểm hòa vốn và chỉ tiêu được thông qua tại cuộc họp lương Kpi + Sản lượng thực tế các TTTC đã đạt trong các tháng gần nhất và cùng kỳ năm trước\",\"created\":\"2026-05-04 09:43\",\"due\":\"2026-05-04 16:43\",\"status\":\"Đã xong\",\"support\":\"Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-05-05 07:47\",\"createdBy\":\"CườngPK\"},{\"id\":\"41695c49\",\"assignee\":\"Hùng TM\",\"title\":\"Check lại công nợ vay vốn T5/2026 của VCBank\",\"created\":\"2026-05-04 09:45\",\"due\":\"2026-05-06 09:45\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-05-04 09:45\",\"createdBy\":\"CườngPK\"},{\"id\":\"57570978.0\",\"assignee\":\"Hùng TM\",\"title\":\"Lập biên bản đối chiếu công nợ cuối tháng với các nhà cung cấp Vắc Xin\",\"created\":\"2026-05-04 09:46\",\"due\":\"2026-05-05 09:46\",\"status\":\"Việc cần làm\",\"support\":\"DsTra\",\"blocker\":\"\",\"updated\":\"2026-05-04 09:46\",\"createdBy\":\"CườngPK\"},{\"id\":\"3b3d7e8f\",\"assignee\":\"Hùng TM\",\"title\":\"Nghiên cứu đơn đặt hàng trên Misa Amis để lập và theo dõi công nợ NCC kết hợp đối soát với bộ phận kho hàng\",\"created\":\"2026-05-04 09:47\",\"due\":\"2026-05-06 09:47\",\"status\":\"Việc cần làm\",\"support\":\"CườngPK\",\"blocker\":\"\",\"updated\":\"2026-05-04 09:47\",\"createdBy\":\"CườngPK\"},{\"id\":\"ad98f19e\",\"assignee\":\"Thương TTA\",\"title\":\"Xử lý trường hợp lưu tiêm không thành công khi sai mã tiêm chủng. Rà soát lại các trường hợp tương tự. Phối hợp Ms Dịu kiểm tra lại các trường hợp có thể xảy ra. Kết hợp Ms Trà đối chiếu kiểm soát lưu tiêm cuối ngày\",\"created\":\"2026-05-04 09:48\",\"due\":\"2026-05-06 09:48\",\"status\":\"Việc cần làm\",\"support\":\"Dịu NT , DsTra\",\"blocker\":\"\",\"updated\":\"2026-05-04 09:48\",\"createdBy\":\"CườngPK\"},{\"id\":\"92b0125c\",\"assignee\":\"CườngPK\",\"title\":\"Xử lý văn bản và hỗ trợ quyết toán Thuế TNCN năm 2025 các trường hợp ngoại lệ. Mai Anh (Bích Hòa) ---> (Thanh Thùy), Ngọc (LB), Hiền (SĐ), Thảo ...\",\"created\":\"2026-05-04 09:51\",\"due\":\"2026-05-06 09:51\",\"status\":\"Đã xong\",\"support\":\"Hạnh NTM , Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-05-20 09:02\",\"createdBy\":\"CườngPK\"},{\"id\":\"41c1fa52\",\"assignee\":\"CườngPK\",\"title\":\"Kiểm tra lại quy trình xử lý lệch lô hạn sử dụng của các Vắc Xin tại các TTTC trong tuần trước. Hướng xử lý và hoàn thiện trong tuần 1 tháng 5. Các sự cố có thể xảy ra, Hoàn thiện quy trình trên.\",\"created\":\"2026-05-04 09:55\",\"due\":\"2026-05-07 09:55\",\"status\":\"Đã xong\",\"support\":\"Thương TTA , DsTra\",\"blocker\":\"\",\"updated\":\"2026-05-20 09:01\",\"createdBy\":\"CườngPK\"},{\"id\":\"2279498f\",\"assignee\":\"CườngPK\",\"title\":\"Vẽ Sơ đồ các phòng ban trong hệ thống Công ty CP Giong Việt Nam\",\"created\":\"2026-05-04 09:57\",\"due\":\"2026-05-11 09:57\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-08-21 10:18\",\"createdBy\":\"CườngPK\"},{\"id\":\"1c518e1f\",\"assignee\":\"CườngPK\",\"title\":\"Cập nhật dữ liệu vào Misa Amis\\n1. Hùng: Bảng kê mua vào - Nhập Kho hàng (Hùng từ T1 đến T4/2026)\\n2. Hùng: Bảng kê xuất kho (Hùng T1 đến T4/2026)\\n3. Cường: Bảng kê bán ra HĐ Điện tử (Misa MInvoice) (Cường T1 đến T4/2026)\\n4. Dịu: Hóa đơn bán hàng điện tử cập nhật từ (Misa MInvoice) vào Misa Amis (T5/2026 trở đi Dịu thực hiện)\\n5. Dịu: Sao kê bank: VCB \\n6. Dịu: Sao kê bank: TPB \\n7. Hùng: Sao kê bank: TCB\",\"created\":\"2026-05-04 10:01\",\"due\":\"2026-05-31 10:01\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Dịu NT\",\"blocker\":\"\",\"updated\":\"2026-06-22 10:14\",\"createdBy\":\"CườngPK\"},{\"id\":\"f9ee5509\",\"assignee\":\"CườngPK\",\"title\":\"Hướng dẫn hạch toán chứng từ bán hàng vào phần mềm Misa Amis. Bắt đầu từ 01/05/2026\",\"created\":\"2026-05-05 07:41\",\"due\":\"2026-05-07 10:41\",\"status\":\"Đã xong\",\"support\":\"Dịu NT\",\"blocker\":\"Phần mềm Misa Amis không cho phép tách các trung tâm để hạch toán riêng biệt\",\"updated\":\"2026-06-22 10:14\",\"createdBy\":\"CườngPK\"},{\"id\":\"3ae3e9b7\",\"assignee\":\"Dịu NT\",\"title\":\"Hạch toán kế toán vào Misa Amis phần bán hàng. Từ 01/05/2026\",\"created\":\"2026-05-05 07:42\",\"due\":\"2026-05-12 07:42\",\"status\":\"Việc cần làm\",\"support\":\"CườngPK , Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-05-05 07:42\",\"createdBy\":\"CườngPK\"},{\"id\":\"9f035775\",\"assignee\":\"CườngPK\",\"title\":\"Soạn thảo công văn thông báo về việc trấn chỉnh lại quy trình phát hành hóa đơn GTGT đầu ra cho các trung tâm\",\"created\":\"2026-05-05 07:47\",\"due\":\"2026-05-06 07:47\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-05-06 07:34\",\"createdBy\":\"CườngPK\"},{\"id\":\"2812142a\",\"assignee\":\"Dịu NT\",\"title\":\"Báo cáo về việc hợp đồng gói dịch vụ đã bán trước ngày 8/4/26 (Thời điểm bán gói dịch vụ, đặt trước vắc xin nhưng chưa phát hành hóa đơn GTGT). Đến hiện tại khách đến sử dụng một phần hoặc hoàn thành gói dịch vụ. Đồng Xuân ngày 6/5/2026. Phương pháp và cách thức xử lý.\\nLập đề nghị xử lý chung cho những trường hợp tương tự của các trung tâm\",\"created\":\"2026-05-07 08:07\",\"due\":\"2026-05-07 08:07\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM , Thương TTA , CườngPK\",\"blocker\":\"\",\"updated\":\"2026-05-07 08:07\",\"createdBy\":\"CườngPK\"},{\"id\":\"f2751d2c\",\"assignee\":\"CườngPK\",\"title\":\"Phân công lại công việc Phòng kế toán và Bộ phận kho hàng Mr Hiếu QL từ giai đoạn đặt hàng đến khi hàng về kho. Tách riêng bộ phận kế toán thanh toán chi thực hiện trả tiền và theo dõi công nợ.\",\"created\":\"2026-05-11 09:57\",\"due\":\"2026-05-18 09:57\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Hiếu NT\",\"blocker\":\"\",\"updated\":\"2026-06-22 10:14\",\"createdBy\":\"CườngPK\"},{\"id\":\"e736a652\",\"assignee\":\"CườngPK\",\"title\":\"Chốt số liệu báo cáo tài chính năm 2025 của Trường Thành để họ nộp lại BCTC và nhận số dư cuối năm thực hiện cập nhật số sách số dư đầu năm 2026. Số lượng (Sai SMED) và giá trị (đúng SMED)\",\"created\":\"2026-05-11 09:59\",\"due\":\"2026-06-30 09:59\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM\",\"blocker\":\"Không chốt được số liệu do Trường Thành đã sửa báo cáo không lưu bản backup\",\"updated\":\"2026-05-11 09:59\",\"createdBy\":\"CườngPK\"},{\"id\":\"d3264a85\",\"assignee\":\"CườngPK\",\"title\":\"Cập nhật dữ liệu báo cáo bán hàng vào phần mềm Misa Amis T1-T3\",\"created\":\"2026-05-11 10:01\",\"due\":\"2026-06-30 10:01\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM , Dịu NT\",\"blocker\":\"\",\"updated\":\"2026-05-11 10:01\",\"createdBy\":\"CườngPK\"},{\"id\":\"6184c643\",\"assignee\":\"CườngPK\",\"title\":\"Phương án xử lý hàng lệch lô hạn đã bán hết trong giai đoạn từ 2025 và đầu năm 2026 đến hiện tại\",\"created\":\"2026-05-11 10:02\",\"due\":\"2026-05-23 10:02\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM , Thương TTA , Dịu NT\",\"blocker\":\"\",\"updated\":\"2026-05-11 10:02\",\"createdBy\":\"CườngPK\"},{\"id\":\"ae3e3279\",\"assignee\":\"CườngPK\",\"title\":\"Thống kê đơn hàng đặt trước, Vắc xin đặt trước từ năm 2025. Lập phương án xử lý tổng thể. Trình giám đốc duyệt để duyệt chủ trương cho lần xử lý dữ liệu trong tương lai\",\"created\":\"2026-05-11 10:02\",\"due\":\"2026-05-18 10:02\",\"status\":\"Đã xong\",\"support\":\"Dịu NT , Hùng TM , Thương TTA\",\"blocker\":\"\",\"updated\":\"2026-07-22 07:57\",\"createdBy\":\"CườngPK\"},{\"id\":\"7e609c93\",\"assignee\":\"CườngPK\",\"title\":\"Lập báo cáo, bảng kê thuế GTGT và thuế TNCN (kiểm tra Hạnh) T4/2026\",\"created\":\"2026-05-11 10:07\",\"due\":\"2026-05-18 10:07\",\"status\":\"Đã xong\",\"support\":\"Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-05-19 10:10\",\"createdBy\":\"CườngPK\"},{\"id\":\"9fbef5b9\",\"assignee\":\"CườngPK\",\"title\":\"Soạn thảo và trình thông báo tình hình thực hiện việc chấn chỉnh phát hành hóa đơn GTGT\",\"created\":\"2026-05-11 10:09\",\"due\":\"2026-05-11 03:09\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-05-11 11:50\",\"createdBy\":\"CườngPK\"},{\"id\":\"46aa536a\",\"assignee\":\"Thanh\",\"title\":\"Lấy đồ ở GLm\",\"created\":\"2026-05-15 07:58\",\"due\":\"2026-05-22 07:58\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-05-15 07:58\",\"createdBy\":\"Thanh\"},{\"id\":\"b5aa676e\",\"assignee\":\"CườngPK\",\"title\":\"Chuyển tiền cho giám đốc để nộp thuế TNCN và phạt nộp từ năm 2021 đến 2025\",\"created\":\"2026-05-18 07:59\",\"due\":\"2026-05-25 07:59\",\"status\":\"Đã xong\",\"support\":\"Dịu NT , Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-06-19 13:19\",\"createdBy\":\"CườngPK\"},{\"id\":\"185a7531\",\"assignee\":\"CườngPK\",\"title\":\"Kiểm tra hợp đồng mua bán thiết bị điện tử. Điều hòa, tivi, tủ lạnh của Mr Thắng cho chuyển tiền thanh toán.\",\"created\":\"2026-05-18 08:01\",\"due\":\"2026-05-21 08:01\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Hiếu NT\",\"blocker\":\"Mrs Thủy ghi sai giá trị hợp đồng và giá trị thanh toán\",\"updated\":\"2026-06-22 10:13\",\"createdBy\":\"CườngPK\"},{\"id\":\"5feb9c4a\",\"assignee\":\"Hạnh NTM\",\"title\":\"Hạnh xem lại hợp đồng cho thuê nhà 273 của Giám đốc để tính chi phí thuê nhà và kê khai thuế TNCN cho Mr Hoàng Minh Châu\",\"created\":\"2026-05-18 08:02\",\"due\":\"2026-05-25 08:02\",\"status\":\"Việc cần làm\",\"support\":\"CườngPK\",\"blocker\":\"\",\"updated\":\"2026-05-18 08:02\",\"createdBy\":\"CườngPK\"},{\"id\":\"7d34cb0c\",\"assignee\":\"Hạnh NTM\",\"title\":\"Xem lại trường hợp quyết toán thuế TNCN của Mr Cường ??? bác sĩ ... Tâm An\",\"created\":\"2026-05-18 08:03\",\"due\":\"2026-05-25 08:03\",\"status\":\"Việc cần làm\",\"support\":\"CườngPK , Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-05-18 08:03\",\"createdBy\":\"CườngPK\"},{\"id\":\"34be6853\",\"assignee\":\"CườngPK\",\"title\":\"Hẹn lịch làm việc với kế toán dịch vụ Trường Thành để chốt dữ liệu báo cáo thuế 2025 lấy số dư đầu kỳ 2026\",\"created\":\"2026-05-18 10:14\",\"due\":\"2026-05-18 10:14\",\"status\":\"Đã xong\",\"support\":\"Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-05-18 10:15\",\"createdBy\":\"CườngPK\"},{\"id\":\"1b69966d\",\"assignee\":\"CườngPK\",\"title\":\"Kiểm tra hợp đồng thuê tài sản của Mrs Nhung, và Mr Châu để thuê làm văn phòng làm việc cho công ty Gióng Việt Nam. tăng tiền thuê nhà nhưng dưới mức nộp thuế hộ kinh doanh cho thuê tài sản 1 tỷ/năm\",\"created\":\"2026-05-19 10:09\",\"due\":\"2026-05-20 10:09\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-05-21 07:34\",\"createdBy\":\"CườngPK\"},{\"id\":\"eebab767\",\"assignee\":\"CườngPK\",\"title\":\"Nhận bàn giao số liệu sổ sách của Cty Trường Thành (Dịch vụ kế toán thuế)\",\"created\":\"2026-05-21 07:34\",\"due\":\"2026-06-30 07:34\",\"status\":\"Đã xong\",\"support\":\"Hùng TM\",\"blocker\":\"Số liệu không đúng phần kho hàng giữa Phần mềm bán hàng tiêm chủng SMED và kho hàng trên báo cáo thuế đã nộp của Trường Thành (Không điều chỉnh được). Nhắn nhiều lần không lên kế hoạch bàn giao\",\"updated\":\"2026-07-22 07:57\",\"createdBy\":\"CườngPK\"},{\"id\":\"ca48a623\",\"assignee\":\"CườngPK\",\"title\":\"Đối chiếu số liệu chênh lệch thuế phải nộp, đã nộp với cơ quan thuế\",\"created\":\"2026-05-21 07:35\",\"due\":\"2026-06-30 07:35\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-05-21 07:35\",\"createdBy\":\"CườngPK\"},{\"id\":\"33b435d0\",\"assignee\":\"CườngPK\",\"title\":\"Mô tả công việc chi tiết của Mr Hiếu và Ms Dịu cho lãnh đạo\",\"created\":\"2026-05-21 07:36\",\"due\":\"2026-07-30 07:36\",\"status\":\"Đã xong\",\"support\":\"Dịu NT , Hiếu NT\",\"blocker\":\"\",\"updated\":\"2026-08-21 10:15\",\"createdBy\":\"CườngPK\"},{\"id\":\"a946e4ac\",\"assignee\":\"CườngPK\",\"title\":\"Báo cáo hàng khuyến mãi, chương trình khuyến mại của NCC, Hãng hàng tháng, hàng quý. Mr Hùng thực hiện\",\"created\":\"2026-05-21 07:37\",\"due\":\"2026-05-28 07:37\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-08-21 10:15\",\"createdBy\":\"CườngPK\"},{\"id\":\"5c22a4e6\",\"assignee\":\"CườngPK\",\"title\":\"Hạnh: Hợp đồng thuê khoán nhân công, hợp đồng vụ việc đối với người lao động làm việc theo vụ việc tại trung tâm tiêm chủng\\n1. Luật điều chỉnh hành vi vụ việc này\\n- \\n2. Nội quy, quy chế của CTY về thể loại hợp đồng thuê mướn lao động bên ngoài\\n- Khi không thu đủ nhân sự ký hợp đồng lao động toàn thời gian. Mới nghĩ đến thuê mướn bên ngoài. Ưu tiên sử dụng lao động ký hợp đồng dài hạn với CTY \\n- Không thuê mướn theo thời gian mà theo vụ việc cụ thể. Ví dụ 20.000₫/1ca tiêm chủng.\\n- Khoán theo chỉ tiêu của từng trung tâm. Ví dụ: TT Ngọc Lâm 300 mũi/tháng ~ 10 mũi/ngày. Nếu thuê  mướn lao động ngoài theo vụ việc thì đủ 10 mũi nhận 200.000k. Nếu trong ngày doanh số 5 mũi thì nhận 100.000k\\n3. Mức thù lao trả cho loại hình hợp đồng thuê ngoài \\n- Tùy thuộc vào chỉ tiêu kế hoạch của từng trung tâm mà chỉ trả\\n- Tùy thuộc điều kiện, hoàn cảnh lúc giao việc mà quyết định \\n- Không có đơn giá cụ thể cho loại hình thuê mướn này.\\n4. Phương thức nghiệm thu công việc thuê ngoài\\n5. Hình thức trả tiền cho lao động thuê mướn và khấu trừ thuế TNCN tại nguồn 10%\",\"created\":\"2026-05-21 19:06\",\"due\":\"2026-06-30 19:06\",\"status\":\"Việc cần làm\",\"support\":\"Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-05-21 19:06\",\"createdBy\":\"CườngPK\"},{\"id\":\"e26ac5b7\",\"assignee\":\"CườngPK\",\"title\":\"Lập bảng kê khai thuế GTGT tháng 5/2026\",\"created\":\"2026-06-19 12:58\",\"due\":\"2026-06-20 12:58\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-06-22 10:09\",\"createdBy\":\"CườngPK\"},{\"id\":\"c54a1e21\",\"assignee\":\"CườngPK\",\"title\":\"Rà soát báo cáo quyết toán thuế TNCN Trường Thành và Thực tế chi trả 2025\",\"created\":\"2026-06-19 12:59\",\"due\":\"2026-06-19 12:59\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-06-19 12:59\",\"createdBy\":\"CườngPK\"},{\"id\":\"37ecae4c\",\"assignee\":\"CườngPK\",\"title\":\"Lập hồ sơ quyết toán thuế TNCN năm 2025 theo phương án 3. Chỉ điều chỉnh 05 +04 = 09 +3 = 12 nhân sự liên quan\",\"created\":\"2026-06-22 10:56\",\"due\":\"2026-06-24 10:56\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"Giám đốc và nhân sự đã gọi điện trực tiếp đến người lao động để đàm phán. Cần thêm thời gian để chốt tổng thể và tìm các nhân sự có tổng tiền thu nhập chịu thuế thấp cộng thêm thu nhập từ 09 nhân sự trên. Tổng thu nhập trên là 622 triệu\",\"updated\":\"2026-07-03 17:44\",\"createdBy\":\"CườngPK\"},{\"id\":\"f4622df4\",\"assignee\":\"CườngPK\",\"title\":\"Đóng tài khoản tại Vietinbank do đã sử dụng tại Vietcombak\",\"created\":\"2026-06-22 11:10\",\"due\":\"2026-06-25 11:10\",\"status\":\"Đã xong\",\"support\":\"Dịu NT , Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-06-25 17:16\",\"createdBy\":\"CườngPK\"},{\"id\":\"097cd7e5\",\"assignee\":\"CườngPK\",\"title\":\"Báo cáo kết quả hoạt động kinh doanh nội bộ T3,4,5\",\"created\":\"2026-06-22 11:12\",\"due\":\"2026-06-24 11:12\",\"status\":\"Đã xong\",\"support\":\"Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-06-26 10:39\",\"createdBy\":\"CườngPK\"},{\"id\":\"7b915bbd\",\"assignee\":\"CườngPK\",\"title\":\"Yêu cầu được nhận bàn giao hồ sơ số liệu Trường Thành\",\"created\":\"2026-06-22 11:13\",\"due\":\"2026-07-11 11:13\",\"status\":\"Đã xong\",\"support\":\"Hùng TM\",\"blocker\":\"Đã giao hàng nhưng chưa có biên bản xác nhận số liệu và hồ sơ\",\"updated\":\"2026-08-21 10:15\",\"createdBy\":\"CườngPK\"},{\"id\":\"62e1ecf2\",\"assignee\":\"CườngPK\",\"title\":\"Tổng hợp đóng gói quy trình thu ngân tại các trung tâm Giong. Dịu làm Slide tổng kết\",\"created\":\"2026-06-22 11:15\",\"due\":\"2026-06-25 11:15\",\"status\":\"Đã xong\",\"support\":\"Dịu NT\",\"blocker\":\"\",\"updated\":\"2026-06-25 13:47\",\"createdBy\":\"CườngPK\"},{\"id\":\"d16e0f81\",\"assignee\":\"CườngPK\",\"title\":\"Tổng kết chương trình khuyến mãi cho khách hàng (giá 0 đồng) Căn cứ pháp luật liên quan để giải trình với cơ quan thuế.\\nHỏi lại cơ quan thuế về việc này. \\nGiá trị khuyến mãi < 100tr có cần công văn trình báo với sở ban ngành gì không?\",\"created\":\"2026-06-22 11:26\",\"due\":\"2026-06-29 11:26\",\"status\":\"Việc cần làm\",\"support\":\"Hương NT\",\"blocker\":\"\",\"updated\":\"2026-06-22 11:26\",\"createdBy\":\"CườngPK\"},{\"id\":\"d820eed4\",\"assignee\":\"CườngPK\",\"title\":\"Lập báo cáo hàng tồn kho thực tế (SMED + GOOGLE SHEET)\\nhàng nhập xuất tồn kho giữa phần mềm và điều chuyển nội bộ + bán hàng nội bộ\",\"created\":\"2026-06-22 11:27\",\"due\":\"2026-06-30 11:27\",\"status\":\"Việc cần làm\",\"support\":\"Hiếu NT\",\"blocker\":\"\",\"updated\":\"2026-06-22 11:27\",\"createdBy\":\"CườngPK\"},{\"id\":\"60b4eded\",\"assignee\":\"CườngPK\",\"title\":\"Khảo sát và lập phương thức lấy số liệu phần mềm Smed từ 19 trung tâm về báo cáo thống kê tình hình khách hàng đặt trước Vắc xin, mua gói dịch vụ và sử dụng các dịch vụ. Công nợ khách hàng, tình trạng hoàn dịch vụ. \\nChuyển kế toán và Marketing đối chiếu\\nKế toán: Hạch toán: Nợ 112, Có 3387 / Nợ 3387, Có 511\\nMarketing: Theo dõi chi tiết đối tượng khách hàng trả trước\",\"created\":\"2026-06-26 10:39\",\"due\":\"2026-07-03 10:39\",\"status\":\"Đã xong\",\"support\":\"Thương TTA , Hùng TM , Dịu NT , Hương NT\",\"blocker\":\"\",\"updated\":\"2026-07-02 08:35\",\"createdBy\":\"CườngPK\"},{\"id\":\"03b1638a\",\"assignee\":\"CườngPK\",\"title\":\"Làm việc với MKT Thương về việc công nợ gói dịch vụ và đặt trước Vắc Xin\",\"created\":\"2026-06-30 10:56\",\"due\":\"2026-07-01 08:00\",\"status\":\"Đã xong\",\"support\":\"Dịu NT , Thương TTA\",\"blocker\":\"\",\"updated\":\"2026-07-02 08:35\",\"createdBy\":\"CườngPK\"},{\"id\":\"92ca79d4\",\"assignee\":\"CườngPK\",\"title\":\"Kiểm tra và lập dự tính thuế thu nhập doanh nghiệp trong quý, năm 2026 để nộp 80% giá trị trước 25/07/2026\",\"created\":\"2026-06-30 10:57\",\"due\":\"2026-07-25 10:57\",\"status\":\"Đã xong\",\"support\":\"Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-08-21 10:15\",\"createdBy\":\"CườngPK\"},{\"id\":\"30472c0a\",\"assignee\":\"CườngPK\",\"title\":\"Nghiên cứu và triển khai đánh số chứng từ trên Misa Amis theo tháng\",\"created\":\"2026-06-30 11:22\",\"due\":\"2026-07-07 11:22\",\"status\":\"Đã xong\",\"support\":\"Dịu NT\",\"blocker\":\"\",\"updated\":\"2026-07-22 07:56\",\"createdBy\":\"CườngPK\"},{\"id\":\"91245a82\",\"assignee\":\"CườngPK\",\"title\":\"Quy trình luân chuyển hồ sơ chứng từ đề xuất ký duyệt qua các bộ phận trong công ty GIONG\\nPhân loại các hồ sơ thuộc phòng ban quản lý\\nPhân loại đề xuất, đề nghị, \\nThẩm quyền duyệt của các bộ phận chức năng\\nTrách nhiệm kiểm tra tính hợp lý, hợp lệ, hợp pháp của hồ sơ\",\"created\":\"2026-06-30 11:28\",\"due\":\"2026-07-31 11:28\",\"status\":\"Việc cần làm\",\"support\":\"Hạnh NTM , Thương TTA , Hùng TM , Dịu NT , GĐ Thúy , Hiếu NT , PGĐ_Châu HM , Thủy TTT , DsTra , Nguyễn Thành Hiếu\",\"blocker\":\"\",\"updated\":\"2026-06-30 11:28\",\"createdBy\":\"CườngPK\"},{\"id\":\"8018a378\",\"assignee\":\"CườngPK\",\"title\":\"Nghiên cứu luật thuế mới áp dụng từ ngày 01/07/2026 và các văn bản dưới luật. Tạo thành Tóm tắt và áp dụng cho Công ty CP GIONG, bộ phận thu ngân, kế toán, nhân sự, Marketing...\",\"created\":\"2026-07-06 08:03\",\"due\":\"2026-07-16 08:03\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Hạnh NTM , Dịu NT , Hương NT\",\"blocker\":\"\",\"updated\":\"2026-07-22 07:56\",\"createdBy\":\"CườngPK\"},{\"id\":\"403649a8\",\"assignee\":\"CườngPK\",\"title\":\"Chuyển kho hàng hóa trên phần mềm bán hàng SMED và phần mềm kế toán Misa từ kho ĐÔNG YÊN  sang kho QUỐC OAI\",\"created\":\"2026-07-06 08:15\",\"due\":\"2026-07-13 08:15\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Hiếu NT , DsTra\",\"blocker\":\"\",\"updated\":\"2026-07-13 08:37\",\"createdBy\":\"CườngPK\"},{\"id\":\"ead66493\",\"assignee\":\"CườngPK\",\"title\":\"Thiết lập lại quy trình đặt hàng và theo dõi Loity. Chuyển giao công việc từ Mr Hùng sang Mr Hiếu. Quyền hạn, nhiệm vụ và trách nhiệm. \\nKiểm tra, kiểm soát trước khi lập lệnh chuyển tiền tra cho NCC\",\"created\":\"2026-07-06 09:46\",\"due\":\"2026-07-13 09:46\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM , Hiếu NT\",\"blocker\":\"\",\"updated\":\"2026-07-06 09:46\",\"createdBy\":\"CườngPK\"},{\"id\":\"fc635d06\",\"assignee\":\"CườngPK\",\"title\":\"Thông báo thay thế các căn cứ pháp luật điều chỉnh việc phát hành hóa đơn GTGT áp dụng từ ngày 01/01/2026.\",\"created\":\"2026-07-09 16:52\",\"due\":\"2026-07-16 16:52\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-07-22 07:56\",\"createdBy\":\"CườngPK\"},{\"id\":\"d18e513a\",\"assignee\":\"CườngPK\",\"title\":\"Xuất kho hàng tồn đến 23/06/206 của Đông Yên\",\"created\":\"2026-07-10 11:26\",\"due\":\"2026-07-17 11:26\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-07-13 08:07\",\"createdBy\":\"CườngPK\"},{\"id\":\"c05f2295\",\"assignee\":\"CườngPK\",\"title\":\"Ý kiến với lãnh đạo về việc ủy quyền cho Phụ trách trung tâm ký bản nhận dịch vụ đặt trước của khách hàng liên quan đến Vắc Xin đặt trước. Giúp Marketing hoàn thành dịch vụ hồ sơ pháp lý  với khách hàng đặt trước Vắc Xin\",\"created\":\"2026-07-13 08:23\",\"due\":\"2026-07-15 08:23\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-07-22 07:56\",\"createdBy\":\"CườngPK\"},{\"id\":\"9153add4\",\"assignee\":\"CườngPK\",\"title\":\"Lập bảng Word các nội dung bổ sung, thay thế, điều chỉnh Luật, NĐ, TT liên quan đến hoạt động SX, KD, Thu nhập cá nhân gửi Giám đốc tập hợp tuyên truyền đến toàn bộ người lao động T4 ngày 15/04/2026\",\"created\":\"2026-07-13 08:25\",\"due\":\"2026-07-20 08:25\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-07-22 07:55\",\"createdBy\":\"CườngPK\"},{\"id\":\"ac58b069\",\"assignee\":\"CườngPK\",\"title\":\"Hoàn thành kê khai thuế GTGT T6/2026\",\"created\":\"2026-07-13 08:35\",\"due\":\"2026-07-20 08:35\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Dịu NT\",\"blocker\":\"\",\"updated\":\"2026-07-17 11:27\",\"createdBy\":\"CườngPK\"},{\"id\":\"b22ee76a\",\"assignee\":\"CườngPK\",\"title\":\"Hoàn thành kê khai và nộp thuế TNCN Quý 2/2026. Nhân Sự thực hiện Kế toán kiểm tra kiểm soát\",\"created\":\"2026-07-13 08:35\",\"due\":\"2026-07-25 08:35\",\"status\":\"Đã xong\",\"support\":\"Hạnh NTM , Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-08-17 09:22\",\"createdBy\":\"CườngPK\"},{\"id\":\"d665c9d6\",\"assignee\":\"CườngPK\",\"title\":\"Kê khai thuế TNDN quý 2/2026. Lập tờ khai xin gia hạn nộp thuế TNDN nếu có.\",\"created\":\"2026-07-13 08:36\",\"due\":\"2026-07-25 08:36\",\"status\":\"Đã xong\",\"support\":\"Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-08-17 09:22\",\"createdBy\":\"CườngPK\"},{\"id\":\"3adba10a\",\"assignee\":\"CườngPK\",\"title\":\"Nghiên cứu đưa giải pháp tính lương, thu nhập cho bộ phận văn phòng để kết hợp cùng lương, thu nhập của bộ phận trực tiếp. Đề xuất phản ánh trên Quy chế tiền lương, năm 2026\",\"created\":\"2026-07-13 08:37\",\"due\":\"2026-07-20 08:37\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM , Hạnh NTM\",\"blocker\":\"\",\"updated\":\"2026-07-13 08:37\",\"createdBy\":\"CườngPK\"},{\"id\":\"4dc5dfb3\",\"assignee\":\"CườngPK\",\"title\":\"Hạnh bổ sung hợp đồng vụ việc, hợp đồng khoán việc... Thể hiện khoản chi trả cho cá nhân thuộc diện khấu trừ thuế TNCN toàn phần\",\"created\":\"2026-07-13 08:43\",\"due\":\"2026-07-31 08:43\",\"status\":\"Việc cần làm\",\"support\":\"Hạnh NTM , Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-07-13 08:43\",\"createdBy\":\"CườngPK\"},{\"id\":\"77b810ce\",\"assignee\":\"CườngPK\",\"title\":\"Hùng. Chốt công nợ nhà cung cấp theo tháng.\",\"created\":\"2026-07-13 08:50\",\"due\":\"2026-07-31 08:50\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM\",\"blocker\":\"Khó khi nhà cung cấp được tương tác là các nhân viên và đội ngũ bán hàng. Không phải là kế toán, Mô hình hoạt động của các NCC khác nhau. \\nPhần công nợ của Misa Amis chưa cập nhật đầy đủ. Giong chưa đưa ra bảng công nợ riêng nên việc đối ch\",\"updated\":\"2026-07-13 08:50\",\"createdBy\":\"CườngPK\"},{\"id\":\"4d749ece\",\"assignee\":\"CườngPK\",\"title\":\"Dịu: Ban hành quy trình thu ngân - phát hành hóa đơn - check cuối ngày.\",\"created\":\"2026-07-13 08:50\",\"due\":\"2026-07-25 08:50\",\"status\":\"Đã xong\",\"support\":\"Dịu NT\",\"blocker\":\"\",\"updated\":\"2026-08-17 09:22\",\"createdBy\":\"CườngPK\"},{\"id\":\"d54357b4\",\"assignee\":\"CườngPK\",\"title\":\"Dịu: Ban hành Quy trình kế toán bán hàng nhập dữ liệu vào phần mềm Misa Amis\",\"created\":\"2026-07-13 08:51\",\"due\":\"2026-07-25 08:51\",\"status\":\"Việc cần làm\",\"support\":\"Dịu NT\",\"blocker\":\"\",\"updated\":\"2026-07-13 08:51\",\"createdBy\":\"CườngPK\"},{\"id\":\"72eedba5\",\"assignee\":\"CườngPK\",\"title\":\"Dịu: Tổng hợp báo giá bán hàng còn hiệu lực vào Google Drive\",\"created\":\"2026-07-13 08:52\",\"due\":\"2026-07-25 08:52\",\"status\":\"Đã xong\",\"support\":\"Dịu NT\",\"blocker\":\"\",\"updated\":\"2026-08-03 10:19\",\"createdBy\":\"CườngPK\"},{\"id\":\"eae7a626\",\"assignee\":\"CườngPK\",\"title\":\"Xây dựng quy trình, quy định phương pháp tính chi phí vận chuyển nội bộ hàng hóa, vật tư tiêu hao, VPP hồ sơ Công ty GIONG Vina.\",\"created\":\"2026-07-22 07:41\",\"due\":\"2026-08-22 07:41\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM , Hiếu NT , Hạnh NTM\",\"blocker\":\"Tìm kiếm giá vận chuyển, quãng đường dự tính đến các cụm. Xác định khoản chi này là hỗ trợ vận chuyển của công ty. Không phải là dịch vụ như các công ty trên thị trường chào giá.\",\"updated\":\"2026-07-22 07:41\",\"createdBy\":\"CườngPK\"},{\"id\":\"e37532ab\",\"assignee\":\"CườngPK\",\"title\":\"Xây dựng quy trình luân chuyển hồ sơ trình ký ban giám đốc.\\nThẩm quyền ký các hồ sơ về: Hành chính - Nhân Sự, Kế toán Tài Chính, Kho hàng... \\nTrách nhiệm của từng bộ phận đối với hồ sơ từ khi khởi tạo đến khi hoàn thành\",\"created\":\"2026-07-22 07:42\",\"due\":\"2026-07-29 07:42\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM , Hạnh NTM , Hiếu NT , PGĐ_Châu HM\",\"blocker\":\"\",\"updated\":\"2026-07-22 07:42\",\"createdBy\":\"CườngPK\"},{\"id\":\"13a9da60\",\"assignee\":\"CườngPK\",\"title\":\"Hành Chính + Nhân Sự: Rà soát lại hồ sơ \\nHành Chính: \\n1. Hợp đồng thuê nhà, chủ tài sản đã đăng ký mã số thuế cho thuê tài sản chưa?\\n2. Hợp đồng dịch vụ: Điện, nước, Internet...\\n3. Hợp đồng vận chuyển chất thải y tế, \\n4. Các chi phí khác liên quan đến hoạt động kinh doanh của các trung tâm\\nNhân Sự:\\n1. Hợp đồng và hồ sơ nhân sự của các hợp đồng lao động ký trên 3 tháng, đóng bảo hiểm hoặc hưu trí...\\n2. Hợp đồng và các hồ sơ liên quan đến thời vụ, khoán việc. \\n3. Quy chế lương và phương pháp tính lương được thể hiện trên thỏa ước lao động tập thể..\\nLập phương án cụ thể:\\n- Thời gian hoàn thành khảo sát tổng thể\\n- Tiên lượng thời gian hoàn thành\\n- Báo cáo thực hiện tiến độ công việc\",\"created\":\"2026-07-22 14:55\",\"due\":\"2026-07-29 14:55\",\"status\":\"Việc cần làm\",\"support\":\"Hạnh NTM , PGĐ_Châu HM\",\"blocker\":\"\",\"updated\":\"2026-07-22 14:55\",\"createdBy\":\"CườngPK\"},{\"id\":\"af2d78b9\",\"assignee\":\"CườngPK\",\"title\":\"Hạnh: Tìm hiểu báo giá cài hệ điều hành và phần mềm công cụ văn phòng cho các trung tâm và VP. Lưu ý việc kiểm tra của công an Phường cho trung tâm Sài Đồng. Báo cáo lãnh đạo để xin ý kiến chỉ đạo\",\"created\":\"2026-07-23 09:14\",\"due\":\"2026-08-15 09:14\",\"status\":\"Việc cần làm\",\"support\":\"Hạnh NTM , PGĐ_Châu HM\",\"blocker\":\"Khó kết nối phần hệ điều hành Ubuntu với các thiết bị ngoại vi. Phần mềm không tương thích đại trà. Cần có hệ điều hành windows để làm việc\\nGiải pháp: Dùng windows chưa kích hoạt và Office Online để sử dụng làm việc kết nối với máy in... Ch\",\"updated\":\"2026-07-23 09:14\",\"createdBy\":\"CườngPK\"},{\"id\":\"43f9f3c1\",\"assignee\":\"CườngPK\",\"title\":\"Cường: Tạo USB để cài đặt phần mềm hệ điều hành Ubuntu cho các trung tâm. Khởi tạo cho TT Sài Đồng\",\"created\":\"2026-07-23 16:30\",\"due\":\"2026-07-23 16:30\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-07-23 16:31\",\"createdBy\":\"CườngPK\"},{\"id\":\"f1f712af\",\"assignee\":\"CườngPK\",\"title\":\"Xác nhận công việc bàn giao kế toán bán hàng. Mrs Thủy nhận bàn giao và Ms Dịu bàn giao\",\"created\":\"2026-07-27 16:07\",\"due\":\"2026-07-30 16:07\",\"status\":\"Đã xong\",\"support\":\"Dịu NT , Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-07-31 15:48\",\"createdBy\":\"CườngPK\"},{\"id\":\"8e71cdca\",\"assignee\":\"CườngPK\",\"title\":\"Nộp hồ sơ kê khai thuế TNDN quý 2/2026 + tiền thuế dự tính 60 triệu\",\"created\":\"2026-07-27 16:10\",\"due\":\"2026-07-30 16:10\",\"status\":\"Đã xong\",\"support\":\"Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-07-31 15:48\",\"createdBy\":\"CườngPK\"},{\"id\":\"5f48e70e\",\"assignee\":\"CườngPK\",\"title\":\"Rà soát báo cáo tài chính bản mềm của Trường Thành so sánh với BCTC đã nộp cho cơ quan thuế\",\"created\":\"2026-07-27 16:11\",\"due\":\"2026-08-25 16:11\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM\",\"blocker\":\"Yêu cầu đã gửi biên bản bàn giao số liệu nhưng Hà và Huệ từ chối không hợp tác và đã rời nhóm chat Zalo\",\"updated\":\"2026-07-27 16:11\",\"createdBy\":\"CườngPK\"},{\"id\":\"a327f494\",\"assignee\":\"CườngPK\",\"title\":\"Báo cáo tài chính T6/2026 làm hồ sơ tái cấp hạn mức vay vốn tại VCB\",\"created\":\"2026-07-27 16:12\",\"due\":\"2026-08-22 16:12\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM , Hạnh NTM\",\"blocker\":\"Ban giám đốc đề xuất không vay vốn nữa vì thủ tục nhiều hồ sơ cần ký giữa cổ đông và công ty. \\nTính khả thi của việc sử dụng đòn bẩy tài chính:\\nVay vốn VCBank: 4 tháng 2,5 tháng mới được trả nợ gốc. Lãi suất 9%/năm\\nVay vốn cá nhân: có thể t\",\"updated\":\"2026-07-27 16:12\",\"createdBy\":\"CườngPK\"},{\"id\":\"22a7ecf0\",\"assignee\":\"CườngPK\",\"title\":\"Cường: Upload dữ liệu vào phần mềm Misa Amis để làm báo cáo nhanh gửi VCB xây dựng hợp đồng gia hạn tín dụng năm 2026\",\"created\":\"2026-08-03 10:20\",\"due\":\"2026-08-22 10:20\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-08-03 10:20\",\"createdBy\":\"CườngPK\"},{\"id\":\"5dda848a\",\"assignee\":\"CườngPK\",\"title\":\"Hiếu: Cập nhật luân chuyển kho hàng Vắc Xin nội bộ giữa các trung tâm để tính hàng tồn kho cho đúng thực tế. Realtime\",\"created\":\"2026-08-03 10:24\",\"due\":\"2026-08-31 10:24\",\"status\":\"Việc cần làm\",\"support\":\"Hiếu NT\",\"blocker\":\"\",\"updated\":\"2026-08-03 10:24\",\"createdBy\":\"CườngPK\"},{\"id\":\"90c231fe\",\"assignee\":\"CườngPK\",\"title\":\"Lập ban kiểm soát nội bộ do Mr Châu PGĐ làm trưởng ban. \\nMục đích tra soát, kiểm soát các trung tâm trên các lĩnh vực:\\n1. Kế toán thu ngân, \\n2. Hành Chính - Nhân Sự\\n3. Hồ sơ pháp lý.\\n4. Vận hành \\n5. Marketing\\nCác trưởng bộ phận tham gia trong ban kiểm soát \\nNhiệm vụ đầu tiên: Kiểm tra cụm Mê Linh - Phú Thọ\",\"created\":\"2026-08-12 08:06\",\"due\":\"2026-08-12 08:06\",\"status\":\"Đã xong\",\"support\":\"PGĐ_Châu HM , Hiếu NT , Hạnh NTM , Thương TTA , Hùng TM , Hương NT , Thủy TTT\",\"blocker\":\"\",\"updated\":\"2026-08-12 08:11\",\"createdBy\":\"CườngPK\"},{\"id\":\"d45795df\",\"assignee\":\"CườngPK\",\"title\":\"Lên kế hoạch đi khảo sát kiểm tra cụm Mê Linh Phú Thọ và lập báo cáo chi tiết\",\"created\":\"2026-08-12 08:12\",\"due\":\"2026-08-19 08:12\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-08-13 01:53\",\"createdBy\":\"CườngPK\"},{\"id\":\"dc766acf\",\"assignee\":\"CườngPK\",\"title\":\"Liên hệ Mr Tuấn Bích Hòa cung cấp dịch vụ máy tính\",\"created\":\"2026-08-12 08:24\",\"due\":\"2026-08-19 08:24\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-08-13 01:53\",\"createdBy\":\"CườngPK\"},{\"id\":\"ff4f024b\",\"assignee\":\"CườngPK\",\"title\":\"Tiếp tục kiểm tra nội bộ \\nĐội 1: Tiền Phong, Đồng Xuân\\nĐội 2: Phúc Yên, Tâm An,  Mê Linh\",\"created\":\"2026-08-13 01:53\",\"due\":\"2026-08-14 08:00\",\"status\":\"Đã xong\",\"support\":\"Hùng TM , Hạnh NTM , Hiếu NT\",\"blocker\":\"\",\"updated\":\"2026-08-17 09:15\",\"createdBy\":\"CườngPK\"},{\"id\":\"b8a6d536\",\"assignee\":\"CườngPK\",\"title\":\"Gặp gỡ trao đổi với Thuế Long Biên 2/9/2026. Trao đổi đối chiếu số liệu nộp thuế và nợ thuế\",\"created\":\"2026-08-13 02:07\",\"due\":\"2026-08-20 02:07\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM\",\"blocker\":\"\",\"updated\":\"2026-08-13 02:07\",\"createdBy\":\"CườngPK\"},{\"id\":\"013613c2\",\"assignee\":\"CườngPK\",\"title\":\"Lập báo cáo thuế GTGT tháng 7 năm 2026\",\"created\":\"2026-08-17 09:15\",\"due\":\"2026-08-20 09:15\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-08-20 07:50\",\"createdBy\":\"CườngPK\"},{\"id\":\"75cd7900\",\"assignee\":\"CườngPK\",\"title\":\"Hùng: Kiểm tra báo cáo thuế QT TNDN 2025 xem tiền nộp thuế TNDN là bao nhiêu để nộp tránh bị phạt nộp chậm\",\"created\":\"2026-08-17 09:17\",\"due\":\"2026-08-24 09:17\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-08-17 09:17\",\"createdBy\":\"CườngPK\"},{\"id\":\"41f2e888\",\"assignee\":\"CườngPK\",\"title\":\"Hùng: Liên hệ bằng điện thoại với nhân viên Trường Thành về việc bàn giao số liệu báo cáo quyết toán năm 2025.\",\"created\":\"2026-08-17 15:53\",\"due\":\"2026-08-31 15:53\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-08-17 15:53\",\"createdBy\":\"CườngPK\"},{\"id\":\"7ebecd12\",\"assignee\":\"CườngPK\",\"title\":\"HC-HS: Xây dựng định mức tiêu hao vật tư mới cho giai đoạn năm 2026. Sau khi kiểm kê trong quá trình kiểm soát nội bộ\",\"created\":\"2026-08-21 08:21\",\"due\":\"2026-08-31 08:21\",\"status\":\"Việc cần làm\",\"support\":\"Hùng TM , Hạnh NTM , Hiếu NT , DsTra\",\"blocker\":\"\",\"updated\":\"2026-08-21 08:21\",\"createdBy\":\"CườngPK\"},{\"id\":\"e27a0c7e\",\"assignee\":\"CườngPK\",\"title\":\"Cường: Xây dựng Công đoàn cơ sở Giong Việt Nam\\n1. Quy chế tổ chức hoạt động\\n2. Quy chế thu chi quản lý tài chính\\n3. File Excel quản lý tài chính\\n4. Biên bản bầu chủ tịch công đoàn\",\"created\":\"2026-08-21 10:13\",\"due\":\"2026-08-24 10:13\",\"status\":\"Đã xong\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-08-21 10:14\",\"createdBy\":\"CườngPK\"},{\"id\":\"a252f5a5\",\"assignee\":\"CườngPK\",\"title\":\"Cường tạo AI Zalo Inbox để làm việc\",\"created\":\"2026-08-21 10:40\",\"due\":\"2026-08-28 10:40\",\"status\":\"Việc cần làm\",\"support\":\"\",\"blocker\":\"\",\"updated\":\"2026-08-21 10:40\",\"createdBy\":\"CườngPK\"}]");
var transfers_default = /*#__PURE__*/ JSON.parse("[{\"id\":\"03c58935\",\"date\":\"2026-03-09 11:32\",\"author\":\"Thủy TTT\",\"toCenter\":\"VP\",\"vaccine\":\"Sat 1500Iu\",\"lot\":\"544-00-24\",\"expiry\":\"2026-06-11\",\"qty\":5.0,\"fromCenter\":\"CĐ\"},{\"id\":\"d03c6de8\",\"date\":\"2026-03-09 11:38\",\"author\":\"Thủy TTT\",\"toCenter\":\"VP\",\"vaccine\":\"Sat 1500Iu\",\"lot\":\"545-00-25\",\"expiry\":\"2026-06-24\",\"qty\":7.0,\"fromCenter\":\"ĐX\"},{\"id\":\"f6215264\",\"date\":\"2026-03-09 11:41\",\"author\":\"Thủy TTT\",\"toCenter\":\"VP\",\"vaccine\":\"Rotavin\",\"lot\":\"R-1724\",\"expiry\":\"2026-06-02\",\"qty\":10.0,\"fromCenter\":\"SĐ\"},{\"id\":\"8a4af004\",\"date\":\"2026-03-09 11:45\",\"author\":\"Thủy TTT\",\"toCenter\":\"VP\",\"vaccine\":\"Rotavin\",\"lot\":\"R-8024\",\"expiry\":\"2026-12-03\",\"qty\":10.0,\"fromCenter\":\"CĐ\"},{\"id\":\"7b82db50\",\"date\":\"2026-03-09 16:48\",\"author\":\"Thủy TTT\",\"toCenter\":\"NL\",\"vaccine\":\"Typhim Vi 0.5ml\",\"lot\":\"X2A561V\",\"expiry\":\"2026-03-11\",\"qty\":4.0,\"fromCenter\":\"NL\"},{\"id\":\"b890582e\",\"date\":\"2026-03-09 17:02\",\"author\":\"Thủy TTT\",\"toCenter\":\"BH\",\"vaccine\":\"Influvac Tetra\",\"lot\":\"L25\",\"expiry\":\"2026-05-31\",\"qty\":30.0,\"fromCenter\":\"BH\"},{\"id\":\"60de38f0\",\"date\":\"2026-03-12 07:56\",\"author\":\"Thủy TTT\",\"toCenter\":\"HM\",\"vaccine\":\"Influvac Tetra\",\"lot\":\"L25\",\"expiry\":\"2026-05-31\",\"qty\":20.0,\"fromCenter\":\"HM\"},{\"id\":\"310b6989\",\"date\":\"2026-03-12 08:07\",\"author\":\"Thủy TTT\",\"toCenter\":\"TO\",\"vaccine\":\"Varilrix\",\"lot\":\"A70CD979A\",\"expiry\":\"2027-07-01\",\"qty\":10.0,\"fromCenter\":\"TO\"},{\"id\":\"1e21470f\",\"date\":\"2026-03-12 08:32\",\"author\":\"Thủy TTT\",\"toCenter\":\"LB\",\"vaccine\":\"Jeev 3Mcg/0.5Ml\",\"lot\":\"300300824A\",\"expiry\":\"2027-09-30\",\"qty\":5.0,\"fromCenter\":\"LB\"},{\"id\":\"9fddb707\",\"date\":\"2026-03-12 08:49\",\"author\":\"Thủy TTT\",\"toCenter\":\"TS\",\"vaccine\":\"Qdenga\",\"lot\":\"567071\",\"expiry\":\"2026-07-27\",\"qty\":3.0,\"fromCenter\":\"TS\"},{\"id\":\"679399c1\",\"date\":\"2026-03-12 08:56\",\"author\":\"Thủy TTT\",\"toCenter\":\"BH\",\"vaccine\":\"Influvac Tetra\",\"lot\":\"L25\",\"expiry\":\"2026-05-31\",\"qty\":20.0,\"fromCenter\":\"BH\"},{\"id\":\"864868bb\",\"date\":\"2026-03-12 09:01\",\"author\":\"Thủy TTT\",\"toCenter\":\"TS\",\"vaccine\":\"Pneumovax 23\",\"lot\":\"Y017285\",\"expiry\":\"2026-08-12\",\"qty\":4.0,\"fromCenter\":\"TS\"},{\"id\":\"f078b01b\",\"date\":\"2026-03-12 09:11\",\"author\":\"Thủy TTT\",\"toCenter\":\"QO\",\"vaccine\":\"Hexaxim 0.5Ml\",\"lot\":\"X3C222V\",\"expiry\":\"2027-01-31\",\"qty\":10.0,\"fromCenter\":\"QO\"},{\"id\":\"0593bd2f\",\"date\":\"2026-03-26 08:45\",\"author\":\"Thủy TTT\",\"toCenter\":\"LB\",\"vaccine\":\"Vaxneuvance\",\"lot\":\"Z006533\",\"expiry\":\"2027-09-27\",\"qty\":20.0,\"fromCenter\":\"LB\"},{\"id\":\"600ea19c\",\"date\":\"2026-03-12 09:57\",\"author\":\"Thủy TTT\",\"toCenter\":\"LM\",\"vaccine\":\"Synflorix 0.5ml\",\"lot\":\"ASPNB377AE\",\"expiry\":\"2026-06-03\",\"qty\":10.0,\"fromCenter\":\"LM\"},{\"id\":\"2d5fb2d0\",\"date\":\"2026-03-12 10:06\",\"author\":\"Thủy TTT\",\"toCenter\":\"SĐ\",\"vaccine\":\"Synflorix 0.5ml\",\"lot\":\"ASPNB377AE\",\"expiry\":\"2026-08-31\",\"qty\":10.0,\"fromCenter\":\"SĐ\"},{\"id\":\"b625416c\",\"date\":\"2026-03-12 10:11\",\"author\":\"Thủy TTT\",\"toCenter\":\"BH\",\"vaccine\":\"Jevax 1Ml\",\"lot\":\"JM-011124\",\"expiry\":\"2026-10-31\",\"qty\":10.0,\"fromCenter\":\"BH\"},{\"id\":\"9b7872a6\",\"date\":\"2026-03-12 15:07\",\"author\":\"Thủy TTT\",\"toCenter\":\"ML\",\"vaccine\":\"Menactra 0.5ml\",\"lot\":\"U8598AC\",\"expiry\":\"2026-10-30\",\"qty\":10.0,\"fromCenter\":\"ML\"},{\"id\":\"d84109b4\",\"date\":\"2026-03-12 15:24\",\"author\":\"Thủy TTT\",\"toCenter\":\"NL\",\"vaccine\":\"Menactra 0.5ml\",\"lot\":\"U8598AC\",\"expiry\":\"2026-10-30\",\"qty\":10.0,\"fromCenter\":\"NL\"},{\"id\":\"95d2bd68\",\"date\":\"2026-03-12 15:30\",\"author\":\"Thủy TTT\",\"toCenter\":\"TA\",\"vaccine\":\"Influvac Tetra\",\"lot\":\"L25\",\"expiry\":\"2026-05-31\",\"qty\":10.0,\"fromCenter\":\"TA\"},{\"id\":\"eca9f2c0\",\"date\":\"2026-03-12 15:56\",\"author\":\"Thủy TTT\",\"toCenter\":\"SĐ\",\"vaccine\":\"Barycela Inj\",\"lot\":\"Z50125021\",\"expiry\":\"2026-03-12\",\"qty\":5.0,\"fromCenter\":\"SĐ\"},{\"id\":\"a6fe574e\",\"date\":\"2026-03-13 07:42\",\"author\":\"Thủy TTT\",\"toCenter\":\"ML\",\"vaccine\":\"Jeev 3Mcg/0.5Ml\",\"lot\":\"300300824A\",\"expiry\":\"2027-09-30\",\"qty\":1.0,\"fromCenter\":\"ML\"},{\"id\":\"e8e09a8b\",\"date\":\"2026-03-13 14:03\",\"author\":\"Thủy TTT\",\"toCenter\":\"TA\",\"vaccine\":\"Influvac Tetra\",\"lot\":\"L25\",\"expiry\":\"2026-05-31\",\"qty\":10.0,\"fromCenter\":\"TA\"},{\"id\":\"2b551062\",\"date\":\"2026-03-13 14:15\",\"author\":\"Thủy TTT\",\"toCenter\":\"NL\",\"vaccine\":\"Twinrix 1Ml\",\"lot\":\"AHABB476AF\",\"expiry\":\"2026-11-30\",\"qty\":2.0,\"fromCenter\":\"NL\"},{\"id\":\"21f5f6c4\",\"date\":\"2026-03-13 14:28\",\"author\":\"Thủy TTT\",\"toCenter\":\"NL\",\"vaccine\":\"Twinrix 1Ml\",\"lot\":\"AHABB481CD\",\"expiry\":\"2027-04-03\",\"qty\":10.0,\"fromCenter\":\"NL\"},{\"id\":\"26859b35\",\"date\":\"2026-03-13 14:32\",\"author\":\"Thủy TTT\",\"toCenter\":\"NL\",\"vaccine\":\"Prevenar 13\",\"lot\":\"LP6973\",\"expiry\":\"2027-05-24\",\"qty\":10.0,\"fromCenter\":\"NL\"},{\"id\":\"7f493c39\",\"date\":\"2026-03-13 14:35\",\"author\":\"Thủy TTT\",\"toCenter\":\"VP\",\"vaccine\":\"Varivax 0.5Ml\",\"lot\":\"Y019151\",\"expiry\":\"2026-11-19\",\"qty\":20.0,\"fromCenter\":\"LB\"},{\"id\":\"5b941473\",\"date\":\"2026-03-14 08:08\",\"author\":\"Thủy TTT\",\"toCenter\":\"NL\",\"vaccine\":\"Shingrix\",\"lot\":\"F7745\",\"expiry\":\"2026-08-18\",\"qty\":1.0,\"fromCenter\":\"NL\"},{\"id\":\"7e6df23d\",\"date\":\"2026-03-14 08:22\",\"author\":\"Thủy TTT\",\"toCenter\":\"TD\",\"vaccine\":\"Shingrix\",\"lot\":\"F7745\",\"expiry\":\"2026-03-13\",\"qty\":2.0,\"fromCenter\":\"TD\"},{\"id\":\"b969ec13\",\"date\":\"2026-03-14 08:29\",\"author\":\"Thủy TTT\",\"toCenter\":\"TS\",\"vaccine\":\"Infanrix Hexa 0.5Ml\",\"lot\":\"A21CE611B\",\"expiry\":\"2027-06-06\",\"qty\":14.0,\"fromCenter\":\"TS\"},{\"id\":\"56517970\",\"date\":\"2026-03-14 10:59\",\"author\":\"Thủy TTT\",\"toCenter\":\"TO\",\"vaccine\":\"Infanrix Hexa 0.5Ml\",\"lot\":\"A21CE611A\",\"expiry\":\"2027-06-06\",\"qty\":5.0,\"fromCenter\":\"TO\"},{\"id\":\"175de5b3\",\"date\":\"2026-03-14 15:28\",\"author\":\"Thủy TTT\",\"toCenter\":\"TS\",\"vaccine\":\"Shingrix\",\"lot\":\"F7745\",\"expiry\":\"2026-08-18\",\"qty\":2.0,\"fromCenter\":\"TS\"},{\"id\":\"0009f805\",\"date\":\"2026-03-14 15:31\",\"author\":\"Thủy TTT\",\"toCenter\":\"LB\",\"vaccine\":\"Typhim Vi 0.5ml\",\"lot\":\"Y2A37D1\",\"expiry\":\"2027-10-31\",\"qty\":7.0,\"fromCenter\":\"LB\"},{\"id\":\"83d247bd\",\"date\":\"2026-03-14 15:39\",\"author\":\"Thủy TTT\",\"toCenter\":\"TS\",\"vaccine\":\"Prevenar 13\",\"lot\":\"LP6973\",\"expiry\":\"2027-05-24\",\"qty\":10.0,\"fromCenter\":\"TS\"},{\"id\":\"9db6f537\",\"date\":\"2026-03-14 16:12\",\"author\":\"Thủy TTT\",\"toCenter\":\"NL\",\"vaccine\":\"Prevenar 13\",\"lot\":\"LP6973\",\"expiry\":\"2027-05-24\",\"qty\":10.0,\"fromCenter\":\"NL\"},{\"id\":\"dc248e78\",\"date\":\"2026-03-16 07:54\",\"author\":\"Thủy TTT\",\"toCenter\":\"ML\",\"vaccine\":\"GARDASIL 9 0,5ML(USA)\",\"lot\":\"Z005173\",\"expiry\":\"2027-09-29\",\"qty\":5.0,\"fromCenter\":\"ML\"},{\"id\":\"f3ac25a0\",\"date\":\"2026-03-16 08:05\",\"author\":\"Thủy TTT\",\"toCenter\":\"TO\",\"vaccine\":\"Qdenga\",\"lot\":\"567071\",\"expiry\":\"2026-07-27\",\"qty\":2.0,\"fromCenter\":\"TO\"},{\"id\":\"c1291dab\",\"date\":\"2026-03-16 09:49\",\"author\":\"Thủy TTT\",\"toCenter\":\"ĐY\",\"vaccine\":\"Rota Teq 2Ml\",\"lot\":\"Z009995\",\"expiry\":\"2027-02-28\",\"qty\":2.0,\"fromCenter\":\"ĐY\"},{\"id\":\"1494d7d7\",\"date\":\"2026-03-16 10:03\",\"author\":\"Thủy TTT\",\"toCenter\":\"SĐ\",\"vaccine\":\"Rota Teq 2Ml\",\"lot\":\"Z009995\",\"expiry\":\"2027-02-28\",\"qty\":2.0,\"fromCenter\":\"SĐ\"},{\"id\":\"b3da70d7\",\"date\":\"2026-03-16 10:06\",\"author\":\"Thủy TTT\",\"toCenter\":\"NL\",\"vaccine\":\"Rota Teq 2Ml\",\"lot\":\"Z009995\",\"expiry\":\"2027-02-28\",\"qty\":2.0,\"fromCenter\":\"NL\"},{\"id\":\"42eb334c\",\"date\":\"2026-03-16 10:09\",\"author\":\"Thủy TTT\",\"toCenter\":\"ĐX\",\"vaccine\":\"GARDASIL 9 0,5ML(USA)\",\"lot\":\"Z006658\",\"expiry\":\"2027-10-03\",\"qty\":10.0,\"fromCenter\":\"ĐX\"},{\"id\":\"12f84b54\",\"date\":\"2026-03-16 10:12\",\"author\":\"Thủy TTT\",\"toCenter\":\"TT\",\"vaccine\":\"Vat 0.5Ml\",\"lot\":\"222_01_25\",\"expiry\":\"2028-03-24\",\"qty\":3.0,\"fromCenter\":\"TT\"},{\"id\":\"318d41ca\",\"date\":\"2026-03-16 10:16\",\"author\":\"Thủy TTT\",\"toCenter\":\"TA\",\"vaccine\":\"Rotavin\",\"lot\":\"R-8024\",\"expiry\":\"2026-12-03\",\"qty\":7.0,\"fromCenter\":\"TA\"},{\"id\":\"7216855d\",\"date\":\"2026-03-16 11:16\",\"author\":\"Thủy TTT\",\"toCenter\":\"CĐ\",\"vaccine\":\"BCG 1ml\",\"lot\":\"0645-10-25\",\"expiry\":\"2027-09-04\",\"qty\":3.0,\"fromCenter\":\"CĐ\"},{\"id\":\"4deb0523\",\"date\":\"2026-03-17 07:50\",\"author\":\"Thủy TTT\",\"toCenter\":\"TP\",\"vaccine\":\"Rotavin\",\"lot\":\"R-8024\",\"expiry\":\"2026-12-03\",\"qty\":1.0,\"fromCenter\":\"TP\"},{\"id\":\"c0d134bf\",\"date\":\"2026-03-17 07:52\",\"author\":\"Thủy TTT\",\"toCenter\":\"TP\",\"vaccine\":\"Qdenga\",\"lot\":\"567071\",\"expiry\":\"2026-07-27\",\"qty\":5.0,\"fromCenter\":\"TP\"},{\"id\":\"2f2580b8\",\"date\":\"2026-03-17 07:54\",\"author\":\"Thủy TTT\",\"toCenter\":\"TP\",\"vaccine\":\"Rotavin\",\"lot\":\"R-8024\",\"expiry\":\"2026-12-03\",\"qty\":10.0,\"fromCenter\":\"TP\"},{\"id\":\"683b1478\",\"date\":\"2026-03-17 16:52\",\"author\":\"Thủy TTT\",\"toCenter\":\"TA\",\"vaccine\":\"Synflorix 0.5ml\",\"lot\":\"ASPNB 367BC\",\"expiry\":\"2026-08-31\",\"qty\":19.0,\"fromCenter\":\"TA\"},{\"id\":\"70e246d8\",\"date\":\"2026-03-17 16:54\",\"author\":\"Thủy TTT\",\"toCenter\":\"NL\",\"vaccine\":\"Synflorix 0.5ml\",\"lot\":\"ASPNB 367BC\",\"expiry\":\"2026-08-31\",\"qty\":19.0,\"fromCenter\":\"NL\"},{\"id\":\"8c9a5a99\",\"date\":\"2026-03-18 07:45\",\"author\":\"Thủy TTT\",\"toCenter\":\"ĐY\",\"vaccine\":\"Influvac Tetra\",\"lot\":\"L25\",\"expiry\":\"2026-05-31\",\"qty\":25.0,\"fromCenter\":\"ĐY\"},{\"id\":\"23c96fbe\",\"date\":\"2026-03-18 07:47\",\"author\":\"Thủy TTT\",\"toCenter\":\"ĐY\",\"vaccine\":\"MVVAC\",\"lot\":\"M-0924\",\"expiry\":\"2026-08-20\",\"qty\":2.0,\"fromCenter\":\"ĐY\"},{\"id\":\"e195b776\",\"date\":\"2026-03-18 08:31\",\"author\":\"Thủy TTT\",\"toCenter\":\"TA\",\"vaccine\":\"Synflorix 0.5ml\",\"lot\":\"ASPNB 367BC\",\"expiry\":\"2026-08-31\",\"qty\":10.0,\"fromCenter\":\"TA\"},{\"id\":\"1c10a2a4\",\"date\":\"2026-03-18 08:35\",\"author\":\"Thủy TTT\",\"toCenter\":\"TA\",\"vaccine\":\"Pneumovax 23\",\"lot\":\"Y017285\",\"expiry\":\"2026-08-12\",\"qty\":7.0,\"fromCenter\":\"TA\"},{\"id\":\"8e1708ac\",\"date\":\"2026-03-18 15:53\",\"author\":\"Thủy TTT\",\"toCenter\":\"SĐ\",\"vaccine\":\"Synflorix 0.5ml\",\"lot\":\"ASPNB377AE\",\"expiry\":\"2026-06-03\",\"qty\":20.0,\"fromCenter\":\"SĐ\"},{\"id\":\"c2548c46\",\"date\":\"2026-03-18 16:24\",\"author\":\"Thủy TTT\",\"toCenter\":\"PY\",\"vaccine\":\"ABRYSVO\",\"lot\":\"MP7387\",\"expiry\":\"2027-11-29\",\"qty\":2.0,\"fromCenter\":\"PY\"},{\"id\":\"02c9043b\",\"date\":\"2026-03-18 16:27\",\"author\":\"Thủy TTT\",\"toCenter\":\"ML\",\"vaccine\":\"MMR\",\"lot\":\"0135N017B\",\"expiry\":\"2027-07-31\",\"qty\":50.0,\"fromCenter\":\"ML\"},{\"id\":\"3eb21b97\",\"date\":\"2026-03-18 16:30\",\"author\":\"Thủy TTT\",\"toCenter\":\"ML\",\"vaccine\":\"Priorix\",\"lot\":\"A69CF918C\",\"expiry\":\"2027-05-01\",\"qty\":30.0,\"fromCenter\":\"ML\"},{\"id\":\"beb6b110\",\"date\":\"2026-03-19 10:30\",\"author\":\"Thủy TTT\",\"toCenter\":\"LB\",\"vaccine\":\"Pneumovax 23\",\"lot\":\"Y017285\",\"expiry\":\"2026-08-12\",\"qty\":3.0,\"fromCenter\":\"LB\"},{\"id\":\"335bb99f\",\"date\":\"2026-03-19 14:35\",\"author\":\"Thủy TTT\",\"toCenter\":\"NL\",\"vaccine\":\"Influvac Tetra\",\"lot\":\"L25\",\"expiry\":\"2026-05-31\",\"qty\":10.0,\"fromCenter\":\"NL\"},{\"id\":\"fd5932b2\",\"date\":\"2026-03-19 14:38\",\"author\":\"Thủy TTT\",\"toCenter\":\"NL\",\"vaccine\":\"Vaxigrip Tetra 0.5Ml\",\"lot\":\"5DE87D2\",\"expiry\":\"2026-05-31\",\"qty\":20.0,\"fromCenter\":\"NL\"},{\"id\":\"096842fb\",\"date\":\"2026-03-19 14:41\",\"author\":\"Thủy TTT\",\"toCenter\":\"NL\",\"vaccine\":\"Influvac Tetra\",\"lot\":\"L25\",\"expiry\":\"2026-05-31\",\"qty\":7.0,\"fromCenter\":\"NL\"},{\"id\":\"ef7d5bf1\",\"date\":\"2026-03-19 14:44\",\"author\":\"Thủy TTT\",\"toCenter\":\"NL\",\"vaccine\":\"Influvac Tetra\",\"lot\":\"L25\",\"expiry\":\"2026-05-31\",\"qty\":10.0,\"fromCenter\":\"NL\"},{\"id\":\"2484ad2b\",\"date\":\"2026-03-19 14:45\",\"author\":\"Thủy TTT\",\"toCenter\":\"NL\",\"vaccine\":\"Influvac Tetra\",\"lot\":\"L25\",\"expiry\":\"2026-05-31\",\"qty\":10.0,\"fromCenter\":\"NL\"},{\"id\":\"4d81289f\",\"date\":\"2026-03-19 14:47\",\"author\":\"Thủy TTT\",\"toCenter\":\"BH\",\"vaccine\":\"Gene-Hbvax (Lọ 0.5Ml)\",\"lot\":\"GB-041023\",\"expiry\":\"2026-09-30\",\"qty\":2.0,\"fromCenter\":\"BH\"},{\"id\":\"7cb4c1da\",\"date\":\"2026-03-19 14:58\",\"author\":\"Thủy TTT\",\"toCenter\":\"PY\",\"vaccine\":\"Typhim Vi 0.5ml\",\"lot\":\"Y2A37D1\",\"expiry\":\"2027-10-31\",\"qty\":2.0,\"fromCenter\":\"PY\"},{\"id\":\"9acbbbf0\",\"date\":\"2026-03-19 15:03\",\"author\":\"Thủy TTT\",\"toCenter\":\"ĐX\",\"vaccine\":\"Prevenar 13\",\"lot\":\"MA2482\",\"expiry\":\"2027-05-24\",\"qty\":5.0,\"fromCenter\":\"ĐX\"},{\"id\":\"f82d617f\",\"date\":\"2026-03-19 16:54\",\"author\":\"Thủy TTT\",\"toCenter\":\"TO\",\"vaccine\":\"Shingrix\",\"lot\":\"F7745\",\"expiry\":\"2026-08-18\",\"qty\":3.0,\"fromCenter\":\"TO\"},{\"id\":\"c4aab957\",\"date\":\"2026-03-20 11:31\",\"author\":\"Thủy TTT\",\"toCenter\":\"CĐ\",\"vaccine\":\"Typhim Vi 0.5ml\",\"lot\":\"Y2A37D1\",\"expiry\":\"2027-10-31\",\"qty\":2.0,\"fromCenter\":\"CĐ\"},{\"id\":\"97078718\",\"date\":\"2026-03-20 11:34\",\"author\":\"Thủy TTT\",\"toCenter\":\"TĐ\",\"vaccine\":\"Priorix\",\"lot\":\"A69CF918C\",\"expiry\":\"2027-05-01\",\"qty\":30.0,\"fromCenter\":\"TĐ\"},{\"id\":\"cf83c443\",\"date\":\"2026-03-20 15:32\",\"author\":\"Thủy TTT\",\"toCenter\":\"ĐX\",\"vaccine\":\"Menactra 0.5ml\",\"lot\":\"U8598AC\",\"expiry\":\"2026-10-31\",\"qty\":20.0,\"fromCenter\":\"ĐX\"},{\"id\":\"418edd50\",\"date\":\"2026-03-20 15:35\",\"author\":\"Thủy TTT\",\"toCenter\":\"NL\",\"vaccine\":\"Menactra 0.5ml\",\"lot\":\"U8598AC\",\"expiry\":\"2026-10-31\",\"qty\":20.0,\"fromCenter\":\"NL\"},{\"id\":\"46a745d7\",\"date\":\"2026-03-20 15:39\",\"author\":\"Thủy TTT\",\"toCenter\":\"ML\",\"vaccine\":\"Qdenga\",\"lot\":\"567071\",\"expiry\":\"2026-07-27\",\"qty\":5.0,\"fromCenter\":\"ML\"},{\"id\":\"e893b9b6\",\"date\":\"2026-03-20 15:45\",\"author\":\"Thủy TTT\",\"toCenter\":\"ML\",\"vaccine\":\"Synflorix 0.5ml\",\"lot\":\"ASPNB 367BC\",\"expiry\":\"2026-08-31\",\"qty\":5.0,\"fromCenter\":\"ML\"},{\"id\":\"5b5625d3\",\"date\":\"2026-03-20 15:52\",\"author\":\"Thủy TTT\",\"toCenter\":\"TA\",\"vaccine\":\"Synflorix 0.5ml\",\"lot\":\"ASPNB 367BC\",\"expiry\":\"2026-08-31\",\"qty\":5.0,\"fromCenter\":\"TA\"},{\"id\":\"834ade77\",\"date\":\"2026-03-20 16:03\",\"author\":\"Thủy TTT\",\"toCenter\":\"TA\",\"vaccine\":\"Typhim Vi 0.5ml\",\"lot\":\"X2A561V\",\"expiry\":\"2026-10-31\",\"qty\":2.0,\"fromCenter\":\"TA\"},{\"id\":\"e84ebea5\",\"date\":\"2026-03-20 16:10\",\"author\":\"Thủy TTT\",\"toCenter\":\"HM\",\"vaccine\":\"Shingrix\",\"lot\":\"F7745\",\"expiry\":\"2026-08-18\",\"qty\":1.0,\"fromCenter\":\"HM\"},{\"id\":\"16d5ef9e\",\"date\":\"2026-03-20 16:24\",\"author\":\"Thủy TTT\",\"toCenter\":\"HM\",\"vaccine\":\"Prevenar 20\",\"lot\":\"MF8920\",\"expiry\":\"2026-12-04\",\"qty\":2.0,\"fromCenter\":\"HM\"},{\"id\":\"0968f097\",\"date\":\"2026-03-24 11:29\",\"author\":\"Thủy TTT\",\"toCenter\":\"NL\",\"vaccine\":\"Bexsero 0.5ml\",\"lot\":\"ABXF04AA\",\"expiry\":\"2027-06-06\",\"qty\":10.0,\"fromCenter\":\"NL\"},{\"id\":\"1466f409\",\"date\":\"2026-03-24 11:37\",\"author\":\"Thủy TTT\",\"toCenter\":\"NL\",\"vaccine\":\"Bexsero 0.5ml\",\"lot\":\"ABXF05AC\",\"expiry\":\"2026-06-07\",\"qty\":10.0,\"fromCenter\":\"NL\"},{\"id\":\"cd005814\",\"date\":\"2026-03-24 14:18\",\"author\":\"Thủy TTT\",\"toCenter\":\"TO\",\"vaccine\":\"Qdenga\",\"lot\":\"568146\",\"expiry\":\"2026-08-10\",\"qty\":2.0,\"fromCenter\":\"TO\"}]");
var seedTasks = tasks_default;
var seedNotes = notes_default;
var seedTransfers = transfers_default;
var att = attendance_default;
var seedAttendance = att.records;
var seedDaily = att.daily;
var seedInventory = inventory_default;
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/format-DZT1C2_O.js
var TZ = "Asia/Ho_Chi_Minh";
var vnd = new Intl.NumberFormat("vi-VN", {
	style: "currency",
	currency: "VND",
	maximumFractionDigits: 0
});
new Intl.NumberFormat("vi-VN", {
	notation: "compact",
	compactDisplay: "short",
	maximumFractionDigits: 1
});
var num = new Intl.NumberFormat("vi-VN");
function formatVnd(n) {
	return vnd.format(Math.round(n));
}
function formatVndCompact(n) {
	if (Math.abs(n) >= 1e9) return `${(n / 1e9).toFixed(1).replace(".", ",")} tỷ`;
	if (Math.abs(n) >= 1e6) return `${(n / 1e6).toFixed(1).replace(".", ",")} tr`;
	return formatVnd(n);
}
function formatNum(n) {
	return num.format(n);
}
function formatDate(iso) {
	if (!iso) return "—";
	const d = new Date(iso.replace(" ", "T"));
	if (Number.isNaN(d.getTime())) return iso.slice(0, 10);
	return d.toLocaleDateString("vi-VN", {
		timeZone: TZ,
		day: "2-digit",
		month: "2-digit",
		year: "numeric"
	});
}
function weekdayVi(iso) {
	const d = new Date(iso.replace(" ", "T"));
	if (Number.isNaN(d.getTime())) return "";
	return d.toLocaleDateString("vi-VN", {
		timeZone: TZ,
		weekday: "long"
	});
}
function todayIso() {
	return new Intl.DateTimeFormat("en-CA", {
		timeZone: TZ,
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).format(/* @__PURE__ */ new Date());
}
function nowTime() {
	return new Intl.DateTimeFormat("vi-VN", {
		timeZone: TZ,
		hour12: false,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	}).format(/* @__PURE__ */ new Date());
}
function greetingVi(date = /* @__PURE__ */ new Date()) {
	const hourStr = new Intl.DateTimeFormat("en-GB", {
		timeZone: TZ,
		hour: "numeric",
		hour12: false
	}).format(date);
	const h = Number(hourStr);
	if (h < 12) return "Chào buổi sáng";
	if (h < 18) return "Chào buổi chiều";
	return "Chào buổi tối";
}
function formatLongDate(date = /* @__PURE__ */ new Date()) {
	return date.toLocaleDateString("vi-VN", {
		timeZone: TZ,
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DS2KYuON.js
var import_jsx_runtime = require_jsx_runtime();
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function Logo({ className, markClassName, compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-2.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/giong-vina-logo.png",
			alt: "Giong Vina",
			className: cn("size-8 shrink-0 rounded-full object-cover ring-1 ring-white/10", markClassName)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: cn("leading-tight transition-all duration-200", compact ? "w-0 overflow-hidden opacity-0 group-hover:w-auto group-hover:opacity-100" : "opacity-100"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-[13px] font-semibold tracking-[0.14em] uppercase",
				children: "Giong"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-[11px] font-medium tracking-[0.18em] uppercase opacity-70",
				children: "Việt Nam"
			})]
		})]
	});
}
var Sheet = Dialog;
function SheetContent({ className, children, side = "right", ...props }) {
	const pos = side === "left" ? "inset-y-0 left-0 h-full w-[min(20rem,88vw)]" : side === "bottom" ? "inset-x-0 bottom-0 max-h-[85vh] rounded-t-xl" : "inset-y-0 right-0 h-full w-[min(20rem,88vw)]";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 overflow-y-auto bg-surface p-4 shadow-[var(--shadow-card-hover)]", pos, className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-3 right-3 flex size-9 items-center justify-center rounded-sm text-muted hover:bg-surface-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Đóng"
			})]
		})]
	})] });
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("pr-8 text-base font-semibold text-ink", className),
		...props
	});
}
var ADMIN_PERMISSIONS = [
	"dashboard:view",
	"attendance:view_own",
	"attendance:view_all",
	"attendance:view_center",
	"attendance:clock_in",
	"attendance:clock_out",
	"attendance:approve",
	"tasks:view_own",
	"tasks:view_all",
	"tasks:create_own",
	"tasks:create_any",
	"tasks:edit_own",
	"tasks:edit_any",
	"tasks:delete",
	"tasks:change_status",
	"inventory:view",
	"inventory:edit",
	"inventory:transfer",
	"cash:view",
	"cash:create",
	"cash:approve",
	"cash:reject",
	"proposals:view_own",
	"proposals:view_all",
	"proposals:create",
	"proposals:approve",
	"proposals:reject",
	"credit:view",
	"hr:view",
	"hr:edit",
	"centers:view",
	"centers:edit",
	"docs:view",
	"reports:view",
	"notes:view",
	"notes:create",
	"chat:view",
	"chat:send",
	"checkin:view_own",
	"checkin:view_all",
	"checkin:create"
];
var USER_PERMISSIONS = [
	"dashboard:view",
	"attendance:view_own",
	"attendance:view_center",
	"attendance:clock_in",
	"attendance:clock_out",
	"tasks:view_own",
	"tasks:create_own",
	"tasks:edit_own",
	"tasks:change_status",
	"inventory:view",
	"cash:view",
	"cash:create",
	"proposals:view_own",
	"proposals:create",
	"docs:view",
	"notes:view",
	"notes:create",
	"chat:view",
	"chat:send",
	"checkin:view_own",
	"checkin:create"
];
var DEPT_PERMISSIONS = {
	"Kế toán": [
		"cash:view",
		"cash:create",
		"cash:approve",
		"credit:view"
	],
	"Hành chính - Nhân sự": [
		"hr:view",
		"proposals:view_all",
		"proposals:approve"
	],
	"HCNS": [
		"hr:view",
		"proposals:view_all",
		"proposals:approve"
	],
	"Kho": [
		"inventory:view",
		"inventory:edit",
		"inventory:transfer"
	],
	"Dược": [
		"inventory:view",
		"inventory:edit",
		"inventory:transfer"
	],
	"Marketing": ["reports:view"],
	"Ban giám đốc": [
		"hr:view",
		"hr:edit",
		"cash:approve",
		"cash:reject",
		"proposals:approve",
		"proposals:reject",
		"reports:view",
		"credit:view",
		"centers:edit"
	],
	"Quản lý": [
		"hr:view",
		"hr:edit",
		"cash:approve",
		"cash:reject",
		"proposals:approve",
		"proposals:reject",
		"reports:view",
		"credit:view",
		"centers:edit",
		"inventory:edit",
		"inventory:transfer"
	],
	"Hệ thống": [
		"hr:view",
		"hr:edit",
		"cash:approve",
		"cash:reject",
		"proposals:approve",
		"proposals:reject",
		"reports:view",
		"credit:view",
		"centers:edit",
		"inventory:edit",
		"inventory:transfer"
	],
	"Tiêm chủng": ["tasks:view_all"]
};
/**
* Get all effective permissions for an employee.
*/
function getPermissions(employee) {
	if (!employee) return [];
	const base = isAdminRole(employee.role) ? ADMIN_PERMISSIONS : USER_PERMISSIONS;
	const deptPerms = DEPT_PERMISSIONS[employee.dept] ?? [];
	return [.../* @__PURE__ */ new Set([...base, ...deptPerms])];
}
/**
* Check if an employee has a specific permission.
*/
function hasPermission(employee, permission) {
	if (!employee) return false;
	return getPermissions(employee).includes(permission);
}
/**
* Check if an employee can approve cash vouchers.
*/
function canApproveCash(employee) {
	return hasPermission(employee, "cash:approve");
}
/**
* Check if an employee can approve proposals.
*/
function canApproveProposals(employee) {
	return hasPermission(employee, "proposals:approve");
}
/**
* Check if an employee can create tasks for others.
*/
function canCreateTaskForOthers(employee) {
	return hasPermission(employee, "tasks:create_any");
}
/**
* Check if an employee can edit another employee's task.
*/
function canEditTask(employee, taskCreatedBy) {
	if (!employee) return false;
	if (isAdminRole(employee.role)) return true;
	if (employee.name === taskCreatedBy) return true;
	return false;
}
/**
* Get allowed navigation items based on employee role and department.
*/
function getAllowedNavItems(employee) {
	if (!employee) return [];
	const isAdmin = isAdminRole(employee.role);
	const allPaths = [
		"/",
		"/cham-cong",
		"/check-in",
		"/nhiem-vu",
		"/kho",
		"/quy",
		"/de-nghi",
		"/tin-dung",
		"/nhan-su",
		"/trung-tam",
		"/ho-so",
		"/bao-cao",
		"/ghi-chu",
		"/chat",
		"/huong-dan"
	];
	if (isAdmin) return allPaths;
	const allowed = [
		"/",
		"/cham-cong",
		"/check-in",
		"/nhiem-vu",
		"/ghi-chu",
		"/chat",
		"/huong-dan"
	];
	const dept = employee.dept;
	if (dept === "Kế toán" || dept === "Ban giám đốc" || dept === "Quản lý" || dept === "Hệ thống") allowed.push("/quy", "/tin-dung");
	if ([
		"Kho",
		"Dược",
		"Ban giám đốc",
		"Quản lý",
		"Hệ thống"
	].includes(dept)) allowed.push("/kho");
	if ([
		"Hành chính - Nhân sự",
		"HCNS",
		"Ban giám đốc",
		"Quản lý",
		"Hệ thống"
	].includes(dept)) allowed.push("/nhan-su", "/de-nghi");
	if ([
		"Ban giám đốc",
		"Quản lý",
		"Hệ thống",
		"Marketing"
	].includes(dept)) allowed.push("/bao-cao");
	if ([
		"Ban giám đốc",
		"Quản lý",
		"Hệ thống"
	].includes(dept)) allowed.push("/trung-tam");
	allowed.push("/ho-so", "/de-nghi");
	return [...new Set(allowed)];
}
var GROK_PROVIDERS = [{
	providerId: "google",
	label: "Google"
}];
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? (() => {
			const employee = getEmployeeByEmail(user.email ?? "");
			return {
				id: user.id,
				displayName: employee?.name ?? user.name ?? null,
				primaryEmail: user.email ?? null,
				profileImageUrl: user.image ?? null,
				isDevFallback: false
			};
		})() : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of).
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	if (!user) return null;
	const label = getEmployeeByEmail(user.primaryEmail ?? "")?.name ?? user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/change-password",
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline",
				children: "Đổi mật khẩu"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut$1().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Đăng xuất"
			})] })
		]
	});
}
var KEY = "giong-vn-v5";
function slice(s) {
	return {
		tasks: s.tasks,
		attendance: s.attendance,
		notes: s.notes,
		cash: s.cash,
		proposals: s.proposals,
		messages: s.messages,
		checkins: s.checkins,
		currentUserId: s.currentUserId
	};
}
var initial = {
	tasks: seedTasks,
	attendance: seedAttendance,
	notes: seedNotes,
	cash: CASH_SEED,
	proposals: PROPOSAL_SEED,
	messages: CHAT_SEED,
	checkins: [],
	currentUserId: CURRENT_USER_ID
};
var useAppStore = create((set, get) => ({
	...initial,
	hydrate: () => {
		try {
			const raw = localStorage.getItem(KEY);
			if (!raw) return;
			const parsed = JSON.parse(raw);
			set({
				tasks: parsed.tasks ?? initial.tasks,
				attendance: parsed.attendance ?? initial.attendance,
				notes: parsed.notes ?? initial.notes,
				cash: parsed.cash ?? initial.cash,
				proposals: parsed.proposals ?? initial.proposals,
				messages: parsed.messages ?? initial.messages,
				checkins: parsed.checkins ?? initial.checkins,
				currentUserId: parsed.currentUserId ?? initial.currentUserId
			});
		} catch {}
	},
	persist: () => {
		try {
			localStorage.setItem(KEY, JSON.stringify(slice(get())));
		} catch {}
	},
	setCurrentUserId: (userId) => {
		set({ currentUserId: userId });
		get().persist();
	},
	currentName: () => {
		const id = get().currentUserId;
		return EMPLOYEES.find((e) => e.id === id)?.name ?? "Phạm Kiên Cường";
	},
	addTask: (t) => {
		const now = `${todayIso()} ${nowTime().slice(0, 5)}`;
		set((s) => ({ tasks: [{
			...t,
			id: uid("nv"),
			created: now,
			updated: now
		}, ...s.tasks] }));
		get().persist();
	},
	setTaskStatus: (id, status) => {
		const now = `${todayIso()} ${nowTime().slice(0, 5)}`;
		set((s) => ({ tasks: s.tasks.map((x) => x.id === id ? {
			...x,
			status,
			updated: now
		} : x) }));
		get().persist();
	},
	clock: (kind, gps = "", address = "", photo = "") => {
		const name = get().currentName();
		const currentEmployee = EMPLOYEES.find((e) => e.id === get().currentUserId) ?? EMPLOYEES[0];
		const date = todayIso();
		const workplace = currentEmployee.center ?? "VP";
		const rec = {
			id: uid("cc"),
			name,
			status: kind,
			time: nowTime(),
			date,
			weekday: weekdayVi(date),
			gps,
			address: address || `${currentEmployee.title} — ${currentEmployee.center}`,
			photo: photo || void 0,
			type: "Bình thường",
			approved: "Chưa",
			workplace
		};
		set((s) => ({ attendance: [rec, ...s.attendance] }));
		get().persist();
		return rec;
	},
	addNote: (n) => {
		set((s) => ({ notes: [{
			...n,
			id: uid("gc")
		}, ...s.notes] }));
		get().persist();
	},
	addCash: (c) => {
		set((s) => ({ cash: [{
			...c,
			id: uid("q")
		}, ...s.cash] }));
		get().persist();
	},
	setCashStatus: (id, status) => {
		set((s) => ({ cash: s.cash.map((x) => x.id === id ? {
			...x,
			status
		} : x) }));
		get().persist();
	},
	addProposal: (p) => {
		set((s) => ({ proposals: [{
			...p,
			id: uid("dn")
		}, ...s.proposals] }));
		get().persist();
	},
	setProposalStatus: (id, status) => {
		set((s) => ({ proposals: s.proposals.map((x) => x.id === id ? {
			...x,
			status
		} : x) }));
		get().persist();
	},
	sendMessage: (text, channel) => {
		const msg = {
			id: uid("m"),
			from: EMPLOYEES.find((e) => e.id === get().currentUserId)?.username ?? "CườngPK",
			text,
			at: `${todayIso()} ${nowTime().slice(0, 5)}`,
			channel
		};
		set((s) => ({ messages: [...s.messages, msg] }));
		get().persist();
	},
	addCheckin: (gps = "", address = "", note = "") => {
		const date = todayIso();
		const rec = {
			id: uid("ck"),
			name: get().currentName(),
			time: nowTime(),
			date,
			weekday: weekdayVi(date),
			gps,
			address,
			note
		};
		set((s) => ({ checkins: [rec, ...s.checkins] }));
		get().persist();
		return rec;
	}
}));
var VERSION_STORAGE_KEY = "giong-vina-version";
var DEFAULT_VERSION = "1.0.0";
function getVersionValue() {
	if (typeof window === "undefined") return DEFAULT_VERSION;
	const saved = window.localStorage.getItem(VERSION_STORAGE_KEY);
	if (!saved) {
		window.localStorage.setItem(VERSION_STORAGE_KEY, DEFAULT_VERSION);
		return DEFAULT_VERSION;
	}
	const parts = saved.split(".").map(Number);
	if (parts.length !== 3 || parts.some(Number.isNaN)) {
		window.localStorage.setItem(VERSION_STORAGE_KEY, DEFAULT_VERSION);
		return DEFAULT_VERSION;
	}
	let [major, minor, patch] = parts;
	if (patch < 9) patch += 1;
	else if (minor < 9) {
		minor += 1;
		patch = 0;
	} else {
		major += 1;
		minor = 0;
		patch = 0;
	}
	const nextVersion = `${major}.${minor}.${patch}`;
	window.localStorage.setItem(VERSION_STORAGE_KEY, nextVersion);
	return nextVersion;
}
var NAV = [
	{
		to: "/",
		label: "Tổng quan",
		icon: LayoutDashboard,
		group: "Điều hành"
	},
	{
		to: "/cham-cong",
		label: "Chấm công",
		icon: Timer,
		group: "Vận hành"
	},
	{
		to: "/check-in",
		label: "Check-in",
		icon: MapPin,
		group: "Vận hành"
	},
	{
		to: "/nhiem-vu",
		label: "Nhiệm vụ",
		icon: ClipboardList,
		group: "Vận hành"
	},
	{
		to: "/kho",
		label: "Kho vắc xin",
		icon: Package,
		group: "Nghiệp vụ"
	},
	{
		to: "/quy",
		label: "Quỹ tiền",
		icon: Wallet,
		group: "Nghiệp vụ"
	},
	{
		to: "/de-nghi",
		label: "Đề nghị",
		icon: FileText,
		group: "Nghiệp vụ"
	},
	{
		to: "/tin-dung",
		label: "Tín dụng",
		icon: Landmark,
		group: "Nghiệp vụ"
	},
	{
		to: "/nhan-su",
		label: "Nhân sự",
		icon: Users,
		group: "Danh mục"
	},
	{
		to: "/trung-tam",
		label: "Trung tâm",
		icon: Building2,
		group: "Danh mục"
	},
	{
		to: "/ho-so",
		label: "Hồ sơ",
		icon: FolderOpen,
		group: "Danh mục"
	},
	{
		to: "/admin/approvals",
		label: "Duyệt đăng ký",
		icon: ShieldCheck,
		group: "Quản trị"
	},
	{
		to: "/bao-cao",
		label: "Báo cáo",
		icon: ChartColumn,
		group: "Hệ thống"
	},
	{
		to: "/ghi-chu",
		label: "Ghi chú",
		icon: StickyNote,
		group: "Hệ thống"
	},
	{
		to: "/chat",
		label: "Chat",
		icon: MessageSquare,
		group: "Hệ thống"
	},
	{
		to: "/huong-dan",
		label: "Hướng dẫn",
		icon: BookOpen,
		group: "Hệ thống"
	}
];
var MOBILE_PRIMARY = [
	"/",
	"/cham-cong",
	"/nhiem-vu",
	"/kho"
];
var ADMIN_ONLY_PATHS = [
	"/nhan-su",
	"/trung-tam",
	"/quy",
	"/tin-dung",
	"/bao-cao"
];
function NavLink({ item, active, onClick, dark, collapsed = false }) {
	const Icon = item.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: item.to,
		onClick,
		className: cn("flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-[13px] font-medium transition-all duration-200 justify-start", collapsed ? "px-0" : "", dark ? active ? "bg-forest-fg/10 text-forest-fg" : "text-forest-muted hover:bg-forest-fg/5 hover:text-forest-fg" : active ? "bg-accent-soft text-accent" : "text-muted hover:bg-surface-2 hover:text-ink"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("whitespace-nowrap transition-all duration-200", collapsed ? "w-0 overflow-hidden opacity-0 group-hover:w-auto group-hover:opacity-100" : "w-auto opacity-100"),
			children: item.label
		})]
	});
}
function SidebarNav({ pathname, onNavigate, dark, collapsed = false }) {
	const groups = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const item of NAV) {
			const g = item.group ?? "";
			if (!map.has(g)) map.set(g, []);
			map.get(g).push(item);
		}
		return [...map.entries()];
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col gap-3 px-1.5 pb-6",
		children: groups.map(([group, items]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [group ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("mb-1 px-2 text-[8px] font-semibold tracking-[0.16em] uppercase text-left transition-all duration-200", dark ? "text-forest-muted/80" : "text-faint", collapsed ? "hidden" : "block"),
			children: group
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-0.5",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
				item,
				active: item.to === "/" ? pathname === "/" : pathname.startsWith(item.to),
				onClick: onNavigate,
				dark,
				collapsed
			}, item.to))
		})] }, group))
	});
}
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const hydrate = useAppStore((s) => s.hydrate);
	const setCurrentUserId = useAppStore((s) => s.setCurrentUserId);
	const userId = useAppStore((s) => s.currentUserId);
	const pending = useAppStore((s) => s.proposals.filter((p) => p.status === "Chờ duyệt").length);
	const { user: authUser, isPending } = useCurrentUserState();
	const appVersion = (0, import_react.useMemo)(() => getVersionValue(), []);
	const employee = getEmployeeById(userId) ?? EMPLOYEES[0];
	const currentUserEmployee = authUser ? getEmployeeByEmail(authUser.primaryEmail ?? "") ?? getEmployeeByEmail(authUser.displayName ?? "") ?? employee : employee;
	const isAdmin = currentUserEmployee?.role === "Admin" || currentUserEmployee?.role === "SuperAdmin";
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		if (!authUser) return;
		const mapped = getEmployeeByEmail(authUser.primaryEmail ?? "") ?? getEmployeeByEmail(authUser.displayName ?? "");
		if (mapped) setCurrentUserId(mapped.id);
	}, [authUser, setCurrentUserId]);
	const allowedPaths = (0, import_react.useMemo)(() => getAllowedNavItems(currentUserEmployee), [currentUserEmployee]);
	const visibleNav = (0, import_react.useMemo)(() => NAV.filter((item) => allowedPaths.includes(item.to)), [allowedPaths]);
	const hits = (0, import_react.useMemo)(() => {
		const s = q.trim().toLowerCase();
		if (s.length < 2) return [];
		return visibleNav.filter((n) => n.label.toLowerCase().includes(s)).slice(0, 6);
	}, [visibleNav, q]);
	const PUBLIC_ROUTES = ["/login", "/forgot-password"];
	const isRouteAllowed = PUBLIC_ROUTES.includes(pathname) || pathname === "/api/auth/$" || !authUser || isAdmin || !ADMIN_ONLY_PATHS.includes(pathname);
	if (!isPending && !authUser && !PUBLIC_ROUTES.includes(pathname)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/login",
		replace: true
	});
	if (!isPending && authUser && !isRouteAllowed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/",
		replace: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-[radial-gradient(circle_at_top,_rgba(28,107,88,0.08),_transparent_35%),var(--color-bg)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "group fixed inset-y-0 left-0 z-30 hidden w-11 flex-col overflow-hidden bg-[linear-gradient(180deg,#12211c_0%,#1b2d26_100%)] text-forest-fg shadow-[12px_0_30px_-18px_rgba(18,33,28,0.9)] transition-all duration-300 ease-out hover:w-44 lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-14 items-center border-b border-forest-fg/10 px-2 transition-all duration-300 group-hover:px-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "text-forest-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
								compact: true,
								className: "group-hover:[&>span:last-child]:opacity-100"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 overflow-y-auto overflow-x-hidden pt-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarNav, {
							pathname,
							dark: true,
							collapsed: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-forest-fg/10 p-2 transition-all duration-300 group-hover:p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 rounded-xl border border-forest-fg/10 bg-forest-fg/5 p-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-6 items-center justify-center rounded-full bg-accent text-[9px] font-semibold text-accent-fg shadow-sm shadow-accent/30",
								children: currentUserEmployee?.name.split(" ").slice(-2).map((p) => p[0]).join("")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 w-0 overflow-hidden transition-all duration-200 group-hover:w-auto group-hover:overflow-visible",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs font-medium text-forest-fg",
									children: currentUserEmployee?.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[10px] text-forest-muted",
									children: currentUserEmployee?.title
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-forest-fg/10 px-2 pb-3 pt-2 text-center text-[9px] tracking-[0.18em] text-forest-muted/85",
						children: ["VERSION ", appVersion]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:pl-44",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line/80 bg-bg/80 px-4 backdrop-blur-xl sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex size-11 items-center justify-center rounded-xl text-ink transition-colors hover:bg-surface-2 lg:hidden",
							onClick: () => setOpen(true),
							"aria-label": "Mở menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-faint" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: q,
									onChange: (e) => setQ(e.target.value),
									placeholder: "Tìm module, chức năng…",
									className: "h-11 w-full rounded-xl border border-line bg-surface/90 pr-3 pl-10 text-sm text-ink shadow-[var(--shadow-card)] placeholder:text-faint transition focus:border-accent/30 focus:ring-2 focus:ring-accent/20 focus:outline-none"
								}),
								hits.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-12 right-0 left-0 z-30 overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-card-hover)]",
									children: hits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: h.to,
										onClick: () => setQ(""),
										className: "flex h-11 items-center gap-2 px-3 text-sm text-ink transition hover:bg-surface-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(h.icon, { className: "size-4 text-muted" }), h.label]
									}, h.to))
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden items-center gap-2 rounded-xl border border-line bg-surface-2 px-2.5 py-1.5 text-xs font-medium text-muted sm:flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }), isAdmin ? "Quản trị" : "Nhân sự"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/de-nghi",
							className: "relative flex size-11 items-center justify-center rounded-xl text-ink transition-colors hover:bg-surface-2",
							"aria-label": "Thông báo",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-5" }), pending > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute top-2 right-2 flex size-4 items-center justify-center rounded-full bg-danger text-[10px] font-semibold text-danger-fg tabular",
								children: pending
							}) : null]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "px-4 pt-6 pb-24 sm:px-6 lg:pb-10",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden",
				children: [visibleNav.filter((n) => MOBILE_PRIMARY.includes(n.to)).map((item) => {
					const Icon = item.icon;
					const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium", active ? "text-accent" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), item.label]
					}, item.to);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setOpen(true),
					className: "flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" }), "Thêm"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "left",
					className: "bg-forest p-0 text-forest-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-16 items-center justify-between px-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
								className: "sr-only",
								children: "Menu"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "text-forest-fg" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "flex size-11 items-center justify-center rounded-md text-forest-fg",
								onClick: () => setOpen(false),
								"aria-label": "Đóng",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarNav, {
						pathname,
						onNavigate: () => setOpen(false),
						dark: true
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				richColors: true,
				closeButton: true
			})
		]
	});
}
/**
* Service Worker registration with automatic update detection.
* Import this in __root.tsx to enable PWA offline support.
*/
function registerServiceWorker() {
	if (typeof window === "undefined") return;
	if (!("serviceWorker" in navigator)) return;
	window.addEventListener("load", async () => {
		try {
			const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
			console.log("[PWA] Service Worker registered:", registration.scope);
			setInterval(() => {
				registration.update();
			}, 36e5);
			registration.addEventListener("updatefound", () => {
				const newWorker = registration.installing;
				if (!newWorker) return;
				console.log("[PWA] New Service Worker installing...");
				newWorker.addEventListener("statechange", () => {
					if (newWorker.state === "installed") {
						if (navigator.serviceWorker.controller) {
							console.log("[PWA] New content available! Refresh to update.");
							showUpdateNotification();
						} else console.log("[PWA] Content cached for offline use.");
					}
				});
			});
		} catch (error) {
			console.error("[PWA] Registration failed:", error);
		}
	});
	navigator.serviceWorker.addEventListener("controllerchange", () => {
		console.log("[PWA] New Service Worker activated. Refreshing...");
		window.location.reload();
	});
}
function showUpdateNotification() {
	const toast = document.createElement("div");
	toast.id = "pwa-update-toast";
	toast.style.cssText = `
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: #1b2d26;
    color: #e8f5e9;
    padding: 12px 20px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 12px;
    border: 1px solid rgba(255,255,255,0.1);
  `;
	toast.innerHTML = `
    <span>Có nội dung mới!</span>
    <button onclick="window.location.reload()" style="
      background: #2e7d32;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
    ">Cập nhật</button>
  `;
	document.body.appendChild(toast);
	setTimeout(() => {
		toast.remove();
	}, 1e4);
}
var styles_default = "/assets/styles-B81V3U37.css";
if (typeof window !== "undefined") registerServiceWorker();
var APP_NAME = "GIONG VN";
var Route$20 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#12211c"
			},
			{
				name: "description",
				content: "Hệ thống điều hành chuỗi trung tâm tiêm chủng Gióng Việt Nam"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/manifest.json"
			},
			{
				rel: "apple-touch-icon",
				href: "/icons/icon-192.png"
			},
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/icons/icon-192.png"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
			}
		]
	}),
	component: Root
});
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "vi",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$18 = () => import("./routes-BmSRQA22.mjs");
var Route$19 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./bao-cao-B1iRp3dF.mjs");
var Route$18 = createFileRoute("/bao-cao")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./cham-cong-Cay-0Hgk.mjs");
var Route$17 = createFileRoute("/cham-cong")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./change-password-wvbwnjbO.mjs");
var Route$16 = createFileRoute("/change-password")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./chat-D9u6rO8i.mjs");
var Route$15 = createFileRoute("/chat")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./check-in-BVN5l-7R.mjs");
var Route$14 = createFileRoute("/check-in")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./de-nghi-C4Gs5xCl.mjs");
var Route$13 = createFileRoute("/de-nghi")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./forgot-password-CMMQaEr9.mjs");
var Route$12 = createFileRoute("/forgot-password")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./ghi-chu-Ba65rYfQ.mjs");
var Route$11 = createFileRoute("/ghi-chu")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./ho-so-t5Lm42X9.mjs");
var Route$10 = createFileRoute("/ho-so")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./huong-dan-BLiWMVxX.mjs");
var Route$9 = createFileRoute("/huong-dan")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./kho-XoMSJzSe.mjs");
var Route$8 = createFileRoute("/kho")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./login-BJTEnwo4.mjs");
var Route$7 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./nhan-su-Cj9oS2t0.mjs");
var Route$6 = createFileRoute("/nhan-su")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./nhiem-vu-X3F1mryU.mjs");
var Route$5 = createFileRoute("/nhiem-vu")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./quy-BK5w5nNp.mjs");
var Route$4 = createFileRoute("/quy")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./tin-dung-Cs_xO4sr.mjs");
var Route$3 = createFileRoute("/tin-dung")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./trung-tam-Dnd6Mgwx.mjs");
var Route$2 = createFileRoute("/trung-tam")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./approvals-IqsXxkLy.mjs");
var Route$1 = createFileRoute("/admin/approvals")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var generateRandomString = createRandomStringGenerator("a-z", "0-9", "A-Z", "-_");
async function signJWT(payload, secret, expiresIn = 3600) {
	return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(Math.floor(Date.now() / 1e3) + expiresIn).sign(new TextEncoder().encode(secret));
}
async function verifyJWT(token, secret) {
	try {
		return (await jwtVerify(token, new TextEncoder().encode(secret))).payload;
	} catch {
		return null;
	}
}
var info = new Uint8Array([
	66,
	101,
	116,
	116,
	101,
	114,
	65,
	117,
	116,
	104,
	46,
	106,
	115,
	32,
	71,
	101,
	110,
	101,
	114,
	97,
	116,
	101,
	100,
	32,
	69,
	110,
	99,
	114,
	121,
	112,
	116,
	105,
	111,
	110,
	32,
	75,
	101,
	121
]);
var now = () => Date.now() / 1e3 | 0;
var alg = "dir";
var enc = "A256CBC-HS512";
function deriveEncryptionSecret(secret, salt) {
	return hkdf(sha256, new TextEncoder().encode(secret), new TextEncoder().encode(salt), info, 64);
}
function getCurrentSecret(secret) {
	if (typeof secret === "string") return secret;
	const value = secret.keys.get(secret.currentVersion);
	if (!value) throw new Error(`Secret version ${secret.currentVersion} not found in keys`);
	return value;
}
function getAllSecrets(secret) {
	if (typeof secret === "string") return [{
		version: 0,
		value: secret
	}];
	const result = [];
	for (const [version, value] of secret.keys) result.push({
		version,
		value
	});
	if (secret.legacySecret && !result.some((s) => s.value === secret.legacySecret)) result.push({
		version: -1,
		value: secret.legacySecret
	});
	return result;
}
async function symmetricEncodeJWT(payload, secret, salt, expiresIn = 3600) {
	const encryptionSecret = deriveEncryptionSecret(getCurrentSecret(secret), salt);
	const thumbprint = await calculateJwkThumbprint({
		kty: "oct",
		k: encode(encryptionSecret)
	}, "sha256");
	return await new EncryptJWT(payload).setProtectedHeader({
		alg,
		enc,
		kid: thumbprint
	}).setIssuedAt().setExpirationTime(now() + expiresIn).setJti(crypto.randomUUID()).encrypt(encryptionSecret);
}
var jwtDecryptOpts = {
	clockTolerance: 15,
	keyManagementAlgorithms: [alg],
	contentEncryptionAlgorithms: [enc, "A256GCM"]
};
async function symmetricDecodeJWT(token, secret, salt) {
	if (!token) return null;
	let hasKid = false;
	try {
		hasKid = decodeProtectedHeader(token).kid !== void 0;
	} catch {
		return null;
	}
	try {
		const secrets = getAllSecrets(secret);
		const { payload } = await jwtDecrypt(token, async (protectedHeader) => {
			const kid = protectedHeader.kid;
			if (kid !== void 0) {
				for (const s of secrets) {
					const encryptionSecret = deriveEncryptionSecret(s.value, salt);
					if (kid === await calculateJwkThumbprint({
						kty: "oct",
						k: encode(encryptionSecret)
					}, "sha256")) return encryptionSecret;
				}
				throw new Error("no matching decryption secret");
			}
			if (secrets.length === 1) return deriveEncryptionSecret(secrets[0].value, salt);
			return deriveEncryptionSecret(secrets[0].value, salt);
		}, jwtDecryptOpts);
		return payload;
	} catch {
		if (hasKid) return null;
		const secrets = getAllSecrets(secret);
		if (secrets.length <= 1) return null;
		for (let i = 1; i < secrets.length; i++) try {
			const s = secrets[i];
			const { payload } = await jwtDecrypt(token, deriveEncryptionSecret(s.value, salt), jwtDecryptOpts);
			return payload;
		} catch {
			continue;
		}
		return null;
	}
}
/**
* `@better-auth/utils/password` uses the "node" export condition in package.json
* to automatically pick the right implementation:
*   - Node.js / Bun / Deno → `node:crypto scrypt` (libuv thread pool, non-blocking)
*   - Unsupported runtimes → `@noble/hashes scrypt` (pure JS fallback)
*/
var hashPassword$1 = hashPassword;
var verifyPassword$1$1 = async ({ hash, password }) => {
	return verifyPassword(hash, password);
};
var ENVELOPE_PREFIX = "$ba$";
function parseEnvelope(data) {
	if (!data.startsWith(ENVELOPE_PREFIX)) return null;
	const firstSep = 4;
	const secondSep = data.indexOf("$", firstSep);
	if (secondSep === -1) return null;
	const version = parseInt(data.slice(firstSep, secondSep), 10);
	if (!Number.isInteger(version) || version < 0) return null;
	return {
		version,
		ciphertext: data.slice(secondSep + 1)
	};
}
function formatEnvelope(version, ciphertext) {
	return `${ENVELOPE_PREFIX}${version}$${ciphertext}`;
}
async function rawEncrypt(secret, data) {
	const keyAsBytes = await createHash("SHA-256").digest(secret);
	const dataAsBytes = utf8ToBytes(data);
	return bytesToHex(managedNonce(xchacha20poly1305)(new Uint8Array(keyAsBytes)).encrypt(dataAsBytes));
}
async function rawDecrypt(secret, hex) {
	const keyAsBytes = await createHash("SHA-256").digest(secret);
	const dataAsBytes = hexToBytes(hex);
	const chacha = managedNonce(xchacha20poly1305)(new Uint8Array(keyAsBytes));
	return new TextDecoder().decode(chacha.decrypt(dataAsBytes));
}
var symmetricEncrypt = async ({ key, data }) => {
	if (typeof key === "string") return rawEncrypt(key, data);
	const secret = key.keys.get(key.currentVersion);
	if (!secret) throw new Error(`Secret version ${key.currentVersion} not found in keys`);
	const ciphertext = await rawEncrypt(secret, data);
	return formatEnvelope(key.currentVersion, ciphertext);
};
var symmetricDecrypt = async ({ key, data }) => {
	if (typeof key === "string") return rawDecrypt(key, data);
	const envelope = parseEnvelope(data);
	if (envelope) {
		const secret = key.keys.get(envelope.version);
		if (!secret) throw new Error(`Secret version ${envelope.version} not found in keys (key may have been retired)`);
		return rawDecrypt(secret, envelope.ciphertext);
	}
	if (key.legacySecret) return rawDecrypt(key.legacySecret, data);
	throw new Error("Cannot decrypt legacy bare-hex payload: no legacy secret available. Set BETTER_AUTH_SECRET for backwards compatibility.");
};
function hasServerSessionStore(options) {
	return !!options.database || !!options.secondaryStorage;
}
function hasServerAccountStore(options) {
	return !!options.database;
}
function shouldBindAccountCookieToSessionUser(options) {
	return hasServerAccountStore(options);
}
var cache = /* @__PURE__ */ new WeakMap();
function getFields(options, modelName, mode) {
	const cacheKey = `${modelName}:${mode}`;
	if (!cache.has(options)) cache.set(options, /* @__PURE__ */ new Map());
	const tableCache = cache.get(options);
	if (tableCache.has(cacheKey)) return tableCache.get(cacheKey);
	const coreSchema = mode === "output" ? getAuthTables(options)[modelName]?.fields ?? {} : {};
	const additionalFields = modelName === "user" || modelName === "session" || modelName === "account" ? options[modelName]?.additionalFields : void 0;
	let schema = {
		...coreSchema,
		...additionalFields ?? {}
	};
	for (const plugin of options.plugins || []) if (plugin.schema && plugin.schema[modelName]) schema = {
		...schema,
		...plugin.schema[modelName].fields
	};
	tableCache.set(cacheKey, schema);
	return schema;
}
function parseUserOutput(options, user) {
	return filterOutputFields(user, getFields(options, "user", "output"));
}
/**
* Builds a synthetic user object that matches the shape of a real user
* returned from the database. This ensures enumeration protection works
* correctly by making synthetic and real user responses indistinguishable.
*
* The function iterates over the user output schema and:
* - Includes all fields that should be returned (returned !== false)
* - Uses provided values when available
* - Sets optional fields to null when no value is provided
* - Applies default values where defined
* - Always includes the 'id' field (not part of schema but always present)
*/
function buildSyntheticUserOutput(options, data) {
	const schema = getFields(options, "user", "output");
	const result = {};
	for (const key in schema) {
		const fieldAttr = schema[key];
		if (fieldAttr.returned === false) continue;
		if (key in data && data[key] !== void 0) result[key] = data[key];
		else if (fieldAttr.defaultValue !== void 0) result[key] = typeof fieldAttr.defaultValue === "function" ? fieldAttr.defaultValue() : fieldAttr.defaultValue;
		else if (!fieldAttr.required) result[key] = null;
	}
	if ("id" in data) result.id = data.id;
	return result;
}
function parseSessionOutput(options, session) {
	return filterOutputFields(session, getFields(options, "session", "output"));
}
function parseAccountOutput(options, account) {
	const { accessToken: _accessToken, refreshToken: _refreshToken, idToken: _idToken, accessTokenExpiresAt: _accessTokenExpiresAt, refreshTokenExpiresAt: _refreshTokenExpiresAt, password: _password, ...rest } = filterOutputFields(account, getFields(options, "account", "output"));
	return rest;
}
function parseInputData(data, schema) {
	const action = schema.action || "create";
	const fields = schema.fields;
	const parsedData = Object.create(null);
	for (const key in fields) {
		if (key in data) {
			if (fields[key].input === false) {
				if (fields[key].defaultValue !== void 0) {
					if (action !== "update") {
						parsedData[key] = fields[key].defaultValue;
						continue;
					}
				}
				if (data[key]) throw APIError.from("BAD_REQUEST", {
					...BASE_ERROR_CODES.FIELD_NOT_ALLOWED,
					message: `${key} is not allowed to be set`
				});
				continue;
			}
			if (fields[key].validator?.input && data[key] !== void 0) {
				const result = fields[key].validator.input["~standard"].validate(data[key]);
				if (result instanceof Promise) throw APIError.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.ASYNC_VALIDATION_NOT_SUPPORTED);
				if ("issues" in result && result.issues) throw APIError.from("BAD_REQUEST", {
					...BASE_ERROR_CODES.VALIDATION_ERROR,
					message: result.issues[0]?.message || "Validation Error"
				});
				parsedData[key] = result.value;
				continue;
			}
			if (fields[key].transform?.input && data[key] !== void 0) {
				parsedData[key] = fields[key].transform?.input(data[key]);
				continue;
			}
			parsedData[key] = data[key];
			continue;
		}
		if (fields[key].defaultValue !== void 0 && action === "create") {
			if (typeof fields[key].defaultValue === "function") {
				parsedData[key] = fields[key].defaultValue();
				continue;
			}
			parsedData[key] = fields[key].defaultValue;
			continue;
		}
		if (fields[key].required && action === "create") throw APIError.from("BAD_REQUEST", {
			...BASE_ERROR_CODES.MISSING_FIELD,
			message: `${key} is required`
		});
	}
	return parsedData;
}
function parseUserInput(options, user = {}, action) {
	return parseInputData(user, {
		fields: getFields(options, "user", "input"),
		action
	});
}
function parseAdditionalUserInputFromProviderProfile(options, profile = {}, action) {
	const schema = getFields(options, "user", "input");
	const allowedProfileFields = Object.create(null);
	for (const key of Object.keys(profile)) {
		if (schema[key]?.input === false) continue;
		allowedProfileFields[key] = profile[key];
	}
	return parseInputData(allowedProfileFields, {
		fields: schema,
		action
	});
}
function parseSessionInput(options, session, action) {
	return parseInputData(session, {
		fields: getFields(options, "session", "input"),
		action
	});
}
function getSessionDefaultFields(options) {
	const fields = getFields(options, "session", "input");
	const defaults = {};
	for (const key in fields) if (fields[key].defaultValue !== void 0) defaults[key] = typeof fields[key].defaultValue === "function" ? fields[key].defaultValue() : fields[key].defaultValue;
	return defaults;
}
var getDate = (span, unit = "ms") => {
	return new Date(Date.now() + (unit === "sec" ? span * 1e3 : span));
};
function isPromise(obj) {
	return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}
var SEC = 1e3;
var MIN = SEC * 60;
var HOUR = MIN * 60;
var DAY = HOUR * 24;
var WEEK = DAY * 7;
var MONTH = DAY * 30;
var YEAR = DAY * 365.25;
var REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|months?|mo|years?|yrs?|y)(?: (ago|from now))?$/i;
function parse(value) {
	const match = REGEX.exec(value);
	if (!match || match[4] && match[1]) throw new TypeError(`Invalid time string format: "${value}". Use formats like "7d", "30m", "1 hour", etc.`);
	const n = parseFloat(match[2]);
	const unit = match[3].toLowerCase();
	let result;
	switch (unit) {
		case "years":
		case "year":
		case "yrs":
		case "yr":
		case "y":
			result = n * YEAR;
			break;
		case "months":
		case "month":
		case "mo":
			result = n * MONTH;
			break;
		case "weeks":
		case "week":
		case "w":
			result = n * WEEK;
			break;
		case "days":
		case "day":
		case "d":
			result = n * DAY;
			break;
		case "hours":
		case "hour":
		case "hrs":
		case "hr":
		case "h":
			result = n * HOUR;
			break;
		case "minutes":
		case "minute":
		case "mins":
		case "min":
		case "m":
			result = n * MIN;
			break;
		case "seconds":
		case "second":
		case "secs":
		case "sec":
		case "s":
			result = n * SEC;
			break;
		default: throw new TypeError(`Unknown time unit: "${unit}"`);
	}
	if (match[1] === "-" || match[4] === "ago") return -result;
	return result;
}
/**
* Parse a time string and return the value in seconds.
*
* @param value - A time string like "7d", "30m", "1 hour", "2 hours ago"
* @returns The parsed value in seconds (rounded)
* @throws TypeError if the string format is invalid
*
* @example
* sec("1d")          // 86400
* sec("2 hours")     // 7200
* sec("-30s")        // -30
* sec("2 hours ago") // -7200
*/
function sec(value) {
	return Math.round(parse(value) / 1e3);
}
function tryDecode$1(str) {
	if (str.indexOf("%") === -1) return str;
	try {
		return decodeURIComponent(str);
	} catch {
		return str;
	}
}
var SECURE_COOKIE_PREFIX = "__Secure-";
/**
* Split a comma-joined `Set-Cookie` header string into individual cookies.
*/
function splitSetCookieHeader(setCookie) {
	if (!setCookie) return [];
	const result = [];
	let start = 0;
	let i = 0;
	while (i < setCookie.length) {
		if (setCookie[i] === ",") {
			let j = i + 1;
			while (j < setCookie.length && setCookie[j] === " ") j++;
			while (j < setCookie.length && setCookie[j] !== "=" && setCookie[j] !== ";" && setCookie[j] !== ",") j++;
			if (j < setCookie.length && setCookie[j] === "=") {
				const part = setCookie.slice(start, i).trim();
				if (part) result.push(part);
				start = i + 1;
				while (start < setCookie.length && setCookie[start] === " ") start++;
				i = start;
				continue;
			}
		}
		i++;
	}
	const last = setCookie.slice(start).trim();
	if (last) result.push(last);
	return result;
}
function parseSetCookieHeader(setCookie) {
	const cookies = /* @__PURE__ */ new Map();
	splitSetCookieHeader(setCookie).forEach((cookieString) => {
		const [nameValue, ...attributes] = cookieString.split(";").map((part) => part.trim());
		const [name, ...valueParts] = (nameValue || "").split("=");
		const value = unquoteCookieValue(valueParts.join("="));
		if (!name) return;
		const attrObj = { value: tryDecode$1(value) };
		attributes.forEach((attribute) => {
			const [attrName, ...attrValueParts] = attribute.split("=");
			const attrValue = attrValueParts.join("=");
			const normalizedAttrName = attrName.trim().toLowerCase();
			switch (normalizedAttrName) {
				case "max-age":
					attrObj["max-age"] = attrValue ? parseInt(attrValue.trim(), 10) : void 0;
					break;
				case "expires":
					attrObj.expires = attrValue ? new Date(attrValue.trim()) : void 0;
					break;
				case "domain":
					attrObj.domain = attrValue ? attrValue.trim() : void 0;
					break;
				case "path":
					attrObj.path = attrValue ? attrValue.trim() : void 0;
					break;
				case "secure":
					attrObj.secure = true;
					break;
				case "httponly":
					attrObj.httponly = true;
					break;
				case "samesite":
					attrObj.samesite = attrValue ? attrValue.trim().toLowerCase() : void 0;
					break;
				case "partitioned":
					attrObj.partitioned = true;
					break;
				default: attrObj[normalizedAttrName] = attrValue ? attrValue.trim() : true;
			}
		});
		cookies.set(name, attrObj);
	});
	return cookies;
}
function toCookieOptions(attributes) {
	return {
		maxAge: attributes["max-age"],
		expires: attributes.expires,
		domain: attributes.domain,
		path: attributes.path,
		secure: attributes.secure,
		httpOnly: attributes.httponly,
		sameSite: attributes.samesite,
		partitioned: attributes.partitioned
	};
}
/**
* Cookie-name token char set per RFC 7230 §3.2.6.
*
* @see https://datatracker.ietf.org/doc/html/rfc7230#section-3.2.6
*/
var cookieNameRegex = /^[\x21\x23-\x27\x2A\x2B\x2D\x2E\x30-\x39\x41-\x5A\x5E\x5F\x60\x61-\x7A\x7C\x7E]+$/;
/**
* Cookie-value char set per RFC 6265 §4.1.1, plus space and comma.
*
* @see https://datatracker.ietf.org/doc/html/rfc6265#section-4.1.1
* @see https://github.com/golang/go/issues/7243
*/
var cookieValueRegex = /^[\x20\x21\x23-\x3A\x3C-\x5B\x5D-\x7E]*$/;
/**
* Strip surrounding double-quotes per RFC 6265 §4.1.1 quoted-string form.
*
* @see https://datatracker.ietf.org/doc/html/rfc6265#section-4.1.1
*/
function unquoteCookieValue(value) {
	if (value.length < 2 || !value.startsWith("\"") || !value.endsWith("\"")) return value;
	return value.slice(1, -1);
}
/**
* Trim leading/trailing OWS (space / horizontal tab) per RFC 7230 §3.2.3.
* Narrower than `String.prototype.trim()`, which strips CR/LF and other
* whitespace and would let CTLs escape `cookieValueRegex`.
*
* @see https://datatracker.ietf.org/doc/html/rfc7230#section-3.2.3
*/
function trimOWS(s) {
	let start = 0;
	let end = s.length;
	while (start < end) {
		const c = s.charCodeAt(start);
		if (c !== 32 && c !== 9) break;
		start++;
	}
	while (end > start) {
		const c = s.charCodeAt(end - 1);
		if (c !== 32 && c !== 9) break;
		end--;
	}
	return start === 0 && end === s.length ? s : s.slice(start, end);
}
/**
* Tolerates `;` separators without the SP that RFC 6265 §4.2.1 mandates,
* since proxies and runtimes commonly strip it. Silently drops entries
* whose name violates RFC 7230 token or whose value violates RFC 6265
* cookie-octet (plus space and comma). Strips optional surrounding
* double-quotes per RFC 6265 §4.1.1.
*/
function parseCookies(cookie) {
	const cookieMap = /* @__PURE__ */ new Map();
	if (cookie.length < 2) return cookieMap;
	for (const chunk of cookie.split(";")) {
		const eq = chunk.indexOf("=");
		if (eq === -1) continue;
		const key = trimOWS(chunk.slice(0, eq));
		const val = unquoteCookieValue(trimOWS(chunk.slice(eq + 1)));
		if (cookieNameRegex.test(key) && cookieValueRegex.test(val)) cookieMap.set(key, tryDecode$1(val));
	}
	return cookieMap;
}
/**
* Add or replace a cookie in the request `Cookie` header.
*
* Cookie pairs are joined with `; `, but `headers.append("cookie", ...)`
* joins with `, ` in some runtimes (e.g. Deno, Cloudflare Workers) and
* breaks downstream cookie parsing. This builds the header value via
* parse-mutate-serialize.
*/
function setRequestCookie(headers, name, value) {
	const cookieMap = parseCookies(headers.get("cookie") || "");
	if (cookieNameRegex.test(name)) cookieMap.set(name, value);
	headers.set("cookie", Array.from(cookieMap, ([k, v]) => `${k}=${encodeURIComponent(v)}`).join("; "));
}
/**
* Per-cookie byte ceiling.
* Safari's ~4093 floor is the lowest among browsers.
* Kept a little under it for attributes added after sizing.
*
* @see https://datatracker.ietf.org/doc/html/rfc6265#section-6.1
* @see https://github.com/dotnet/aspnetcore/blob/aa5493528640932601bb82ef3295e4d8ca7e11c5/src/Shared/ChunkingCookieManager/ChunkingCookieManager.cs#L40
*/
var MAX_COOKIE_SIZE = 4050;
/**
* Max chunks per cookie.
* A larger value does not belong in a cookie.
*/
var MAX_COOKIE_CHUNKS = 100;
/**
* Largest value that keeps the serialized cookie within {@link MAX_COOKIE_SIZE},
* measured with the real `serializeCookie` writer so it stays in sync with the
* wire. Non-positive when the name and attributes alone overflow.
*/
function getMaxCookieValueSize(name, options) {
	return MAX_COOKIE_SIZE - serializeCookie(name, "", { ...options }).length;
}
/**
* Read all existing chunks from cookies
*/
function readExistingChunks(cookieName, ctx) {
	const chunks = {};
	const cookies = parseCookies(ctx.headers?.get("cookie") || "");
	for (const [name, value] of cookies) if (name.startsWith(cookieName)) chunks[name] = value;
	return chunks;
}
/**
* Split a cookie value into chunks if needed
*/
function chunkCookie(storeName, cookie, chunks, logger) {
	const chunkSize = getMaxCookieValueSize(`${cookie.name}.99`, cookie.attributes);
	const chunkCount = chunkSize > 0 ? Math.ceil(cookie.value.length / chunkSize) : Infinity;
	if (chunkCount <= 1) {
		chunks[cookie.name] = cookie.value;
		return [cookie];
	}
	if (chunkCount > MAX_COOKIE_CHUNKS) {
		logger.warn(`${storeName} cookie is too large to store even after chunking, so the cache was skipped. Reduce the cached data or use a database session.`);
		return [];
	}
	const cookies = [];
	for (let i = 0; i < chunkCount; i++) {
		const name = `${cookie.name}.${i}`;
		const start = i * chunkSize;
		const value = cookie.value.substring(start, start + chunkSize);
		cookies.push({
			...cookie,
			name,
			value
		});
		chunks[name] = value;
	}
	logger.debug(`CHUNKING_${storeName.toUpperCase()}_COOKIE`, {
		message: `${storeName} cookie exceeds the ${MAX_COOKIE_SIZE} byte limit and was split into ${chunkCount} chunks.`,
		valueSize: cookie.value.length,
		chunkCount,
		chunkSizes: cookies.map((c) => c.value.length)
	});
	return cookies;
}
/**
* Get all cookies that should be cleaned (removed)
*/
function getCleanCookies(chunks, cookieOptions) {
	const cleanedChunks = {};
	for (const name in chunks) cleanedChunks[name] = {
		name,
		value: "",
		attributes: {
			...cookieOptions,
			maxAge: 0
		}
	};
	return cleanedChunks;
}
/**
* Store that splits a cookie into numbered chunks when its serialized form
* would exceed the per-cookie byte limit, expiring stale chunks as needed.
*
* @see https://github.com/nextauthjs/next-auth/blob/27b2519b84b8eb9cf053775dea29d577d2aa0098/packages/next-auth/src/core/lib/cookie.ts
*/
var storeFactory = (storeName) => (cookieName, cookieOptions, ctx) => {
	const chunks = readExistingChunks(cookieName, ctx);
	const logger = ctx.context.logger;
	const expireExistingChunks = () => {
		const expired = getCleanCookies(chunks, cookieOptions);
		for (const name in chunks) delete chunks[name];
		return expired;
	};
	return {
		chunk(value, options) {
			const cookies = expireExistingChunks();
			const chunked = chunkCookie(storeName, {
				name: cookieName,
				value,
				attributes: {
					...cookieOptions,
					...options
				}
			}, chunks, logger);
			for (const chunk of chunked) cookies[chunk.name] = chunk;
			return Object.values(cookies);
		},
		clean() {
			return Object.values(expireExistingChunks());
		},
		setCookies(cookies) {
			for (const cookie of cookies) ctx.setCookie(cookie.name, cookie.value, cookie.attributes);
		}
	};
};
var createSessionStore = storeFactory("Session");
var createAccountStore = storeFactory("Account");
function getChunkedCookie(ctx, cookieName) {
	const value = ctx.getCookie(cookieName);
	if (value) return value;
	const chunks = [];
	const cookieHeader = ctx.headers?.get("cookie");
	if (!cookieHeader) return null;
	for (const [name, val] of parseCookies(cookieHeader)) if (name.startsWith(cookieName + ".")) {
		const indexStr = name.split(".").at(-1);
		const index = parseInt(indexStr || "0", 10);
		if (!isNaN(index)) chunks.push({
			index,
			value: val
		});
	}
	if (chunks.length > 0) {
		chunks.sort((a, b) => a.index - b.index);
		return chunks.map((c) => c.value).join("");
	}
	return null;
}
async function setAccountCookie(c, accountData) {
	const accountDataCookie = c.context.authCookies.accountData;
	const options = {
		maxAge: 300,
		...accountDataCookie.attributes
	};
	const data = await symmetricEncodeJWT(accountData, c.context.secretConfig, "better-auth-account", options.maxAge);
	const accountStore = createAccountStore(accountDataCookie.name, options, c);
	accountStore.setCookies(accountStore.chunk(data, options));
}
async function getAccountCookie(c) {
	const accountCookie = getChunkedCookie(c, c.context.authCookies.accountData.name);
	if (accountCookie) {
		const accountData = safeJSONParse(await symmetricDecodeJWT(accountCookie, c.context.secretConfig, "better-auth-account"));
		if (accountData) return accountData;
	}
	return null;
}
var getSessionQuerySchema = optional(object({
	/**
	* If cookie cache is enabled, it will disable the cache
	* and fetch the session from the database
	*/
	disableCookieCache: boolean$1().meta({ description: "Disable cookie cache and fetch session from database" }).optional(),
	disableRefresh: boolean$1().meta({ description: "Disable session refresh. Useful for checking session status, without updating the session" }).optional()
}));
function createCookieGetter(options) {
	const baseURLString = typeof options.baseURL === "string" ? options.baseURL : void 0;
	const dynamicProtocol = typeof options.baseURL === "object" && options.baseURL !== null ? options.baseURL.protocol : void 0;
	const secureCookiePrefix = (options.advanced?.useSecureCookies !== void 0 ? options.advanced?.useSecureCookies : dynamicProtocol === "https" ? true : dynamicProtocol === "http" ? false : baseURLString ? baseURLString.startsWith("https://") : isProduction) ? SECURE_COOKIE_PREFIX : "";
	const crossSubdomainEnabled = !!options.advanced?.crossSubDomainCookies?.enabled;
	const domain = crossSubdomainEnabled ? options.advanced?.crossSubDomainCookies?.domain || (baseURLString ? new URL(baseURLString).hostname : void 0) : void 0;
	if (crossSubdomainEnabled && !domain && !isDynamicBaseURLConfig(options.baseURL)) throw new BetterAuthError("baseURL is required when crossSubdomainCookies are enabled.");
	function createCookie(cookieName, overrideAttributes = {}) {
		const prefix = options.advanced?.cookiePrefix || "better-auth";
		const name = options.advanced?.cookies?.[cookieName]?.name || `${prefix}.${cookieName}`;
		const attributes = options.advanced?.cookies?.[cookieName]?.attributes ?? {};
		return {
			name: `${secureCookiePrefix}${name}`,
			attributes: {
				secure: !!secureCookiePrefix,
				sameSite: "lax",
				path: "/",
				httpOnly: true,
				...crossSubdomainEnabled ? { domain } : {},
				...options.advanced?.defaultCookieAttributes,
				...overrideAttributes,
				...attributes
			}
		};
	}
	return createCookie;
}
function getCookies(options) {
	const createCookie = createCookieGetter(options);
	const sessionToken = createCookie("session_token", { maxAge: options.session?.expiresIn || sec("7d") });
	const sessionData = createCookie("session_data", { maxAge: options.session?.cookieCache?.maxAge || 300 });
	const accountData = createCookie("account_data", { maxAge: options.session?.cookieCache?.maxAge || 300 });
	const dontRememberToken = createCookie("dont_remember");
	return {
		sessionToken: {
			name: sessionToken.name,
			attributes: sessionToken.attributes
		},
		/**
		* This cookie is used to store the session data in the cookie
		* This is useful for when you want to cache the session in the cookie
		*/
		sessionData: {
			name: sessionData.name,
			attributes: sessionData.attributes
		},
		dontRememberToken: {
			name: dontRememberToken.name,
			attributes: dontRememberToken.attributes
		},
		accountData: {
			name: accountData.name,
			attributes: accountData.attributes
		}
	};
}
async function setCookieCache(ctx, session, dontRememberMe) {
	if (!ctx.context.options.session?.cookieCache?.enabled) return;
	const filteredSession = filterOutputFields(session.session, ctx.context.options.session?.additionalFields);
	const filteredUser = parseUserOutput(ctx.context.options, session.user);
	const versionConfig = ctx.context.options.session?.cookieCache?.version;
	let version = "1";
	if (versionConfig) {
		if (typeof versionConfig === "string") version = versionConfig;
		else if (typeof versionConfig === "function") {
			const result = versionConfig(session.session, session.user);
			version = isPromise(result) ? await result : result;
		}
	}
	const sessionData = {
		session: filteredSession,
		user: filteredUser,
		updatedAt: Date.now(),
		version
	};
	const options = {
		...ctx.context.authCookies.sessionData.attributes,
		maxAge: dontRememberMe ? void 0 : ctx.context.authCookies.sessionData.attributes.maxAge
	};
	const expiresAtDate = getDate(options.maxAge || 60, "sec").getTime();
	const strategy = ctx.context.options.session?.cookieCache?.strategy || "compact";
	let data;
	if (strategy === "jwe") data = await symmetricEncodeJWT(sessionData, ctx.context.secretConfig, "better-auth-session", options.maxAge || 300);
	else if (strategy === "jwt") data = await signJWT(sessionData, ctx.context.secret, options.maxAge || 300);
	else data = base64Url.encode(JSON.stringify({
		session: sessionData,
		expiresAt: expiresAtDate,
		signature: await createHMAC("SHA-256", "base64urlnopad").sign(ctx.context.secret, JSON.stringify({
			...sessionData,
			expiresAt: expiresAtDate
		}))
	}), { padding: false });
	const sessionStore = createSessionStore(ctx.context.authCookies.sessionData.name, options, ctx);
	sessionStore.setCookies(sessionStore.chunk(data, options));
	if (ctx.context.options.account?.storeAccountCookie && !hasPendingSetCookie(ctx, ctx.context.authCookies.accountData.name)) {
		const accountData = await getAccountCookie(ctx);
		if (accountData) if (!shouldBindAccountCookieToSessionUser(ctx.context.options) || accountData.userId === session.user.id) await setAccountCookie(ctx, accountData);
		else {
			expireCookie(ctx, ctx.context.authCookies.accountData);
			const accountStore = createAccountStore(ctx.context.authCookies.accountData.name, ctx.context.authCookies.accountData.attributes, ctx);
			accountStore.setCookies(accountStore.clean());
		}
	}
}
async function setSessionCookie(ctx, session, dontRememberMe, overrides) {
	const dontRememberMeCookie = await ctx.getSignedCookie(ctx.context.authCookies.dontRememberToken.name, ctx.context.secret);
	dontRememberMe = dontRememberMe !== void 0 ? dontRememberMe : !!dontRememberMeCookie;
	const options = ctx.context.authCookies.sessionToken.attributes;
	const maxAge = dontRememberMe ? void 0 : ctx.context.sessionConfig.expiresIn;
	await ctx.setSignedCookie(ctx.context.authCookies.sessionToken.name, session.session.token, ctx.context.secret, {
		...options,
		maxAge,
		...overrides
	});
	if (dontRememberMe) await ctx.setSignedCookie(ctx.context.authCookies.dontRememberToken.name, "true", ctx.context.secret, ctx.context.authCookies.dontRememberToken.attributes);
	await setCookieCache(ctx, session, dontRememberMe);
	ctx.context.setNewSession(session);
}
/**
* Remove any prior `Set-Cookie` entries on the current response whose cookie
* name matches `cookieName` or any chunked variant (`${cookieName}.0`, etc.).
*
* Prevents a valid cookie value from leaking on the wire when the same cookie
* is set and then expired within a single request (e.g. `/sign-in/email`
* writes credential session cookies and the 2FA after-hook expires them).
* Browsers honor the expiring entry, but anything reading the raw response
* headers — proxy/LB logs, server-side SDK consumers, observability tools —
* sees the earlier valid value and could replay it (bypassing the 2FA gate
* when the cookie cache is enabled).
*
* Scrubs both the local middleware scope's `responseHeaders` and the outer
* endpoint scope's `ctx.context.responseHeaders`, because plugin after-hooks
* run in a fresh local scope while accumulated response headers live on the
* outer one. `scoped.context` is required by {@link GenericEndpointContext}
* but unit-test mocks pass a minimal object via `as any`, so we use optional
* chaining defensively. The `Set` collapses the case where both scopes
* reference the same `Headers`.
*/
function removeSetCookieEntries(ctx, cookieName) {
	const scoped = ctx;
	const targets = /* @__PURE__ */ new Set();
	if (scoped.responseHeaders) targets.add(scoped.responseHeaders);
	if (scoped.context?.responseHeaders) targets.add(scoped.context.responseHeaders);
	const exact = `${cookieName}=`;
	const chunk = `${cookieName}.`;
	for (const headers of targets) {
		const existing = typeof headers.getSetCookie === "function" ? headers.getSetCookie() : splitSetCookieHeader(headers.get("set-cookie") || "");
		if (!existing.length) continue;
		const survivors = existing.filter((entry) => !entry.startsWith(exact) && !entry.startsWith(chunk));
		if (survivors.length === existing.length) continue;
		headers.delete("set-cookie");
		for (const entry of survivors) headers.append("set-cookie", entry);
	}
}
/**
* Whether the response already has a pending `Set-Cookie` for `cookieName`
* or a chunked variant.
*/
function hasPendingSetCookie(ctx, cookieName) {
	const scoped = ctx;
	const targets = /* @__PURE__ */ new Set();
	if (scoped.responseHeaders) targets.add(scoped.responseHeaders);
	if (scoped.context?.responseHeaders) targets.add(scoped.context.responseHeaders);
	const exact = `${cookieName}=`;
	const chunk = `${cookieName}.`;
	for (const headers of targets) if ((typeof headers.getSetCookie === "function" ? headers.getSetCookie() : splitSetCookieHeader(headers.get("set-cookie") || "")).some((entry) => entry.startsWith(exact) || entry.startsWith(chunk))) return true;
	return false;
}
/**
* Expires a cookie by setting `maxAge: 0` while preserving its attributes
*/
function expireCookie(ctx, cookie) {
	removeSetCookieEntries(ctx, cookie.name);
	ctx.setCookie(cookie.name, "", {
		...cookie.attributes,
		maxAge: 0
	});
}
function deleteSessionCookie(ctx, skipDontRememberMe) {
	expireCookie(ctx, ctx.context.authCookies.sessionToken);
	expireCookie(ctx, ctx.context.authCookies.sessionData);
	if (ctx.context.options.account?.storeAccountCookie) {
		expireCookie(ctx, ctx.context.authCookies.accountData);
		const accountStore = createAccountStore(ctx.context.authCookies.accountData.name, ctx.context.authCookies.accountData.attributes, ctx);
		const cleanCookies = accountStore.clean();
		accountStore.setCookies(cleanCookies);
	}
	if (ctx.context.oauthConfig.storeStateStrategy === "cookie") expireCookie(ctx, ctx.context.createAuthCookie("oauth_state"));
	const sessionStore = createSessionStore(ctx.context.authCookies.sessionData.name, ctx.context.authCookies.sessionData.attributes, ctx);
	const cleanCookies = sessionStore.clean();
	sessionStore.setCookies(cleanCookies);
	if (!skipDontRememberMe) expireCookie(ctx, ctx.context.authCookies.dontRememberToken);
}
var stateDataSchema = looseObject({
	callbackURL: string(),
	codeVerifier: string(),
	errorURL: string().optional(),
	newUserURL: string().optional(),
	expiresAt: number(),
	/**
	* CSRF nonce returned to the OAuth provider. When using cookie state storage,
	* this must match the callback `state` query parameter.
	*/
	oauthState: string().optional(),
	link: object({
		email: string(),
		userId: string$1()
	}).optional(),
	requestSignUp: boolean().optional()
});
new Set(Object.keys(stateDataSchema.shape));
var StateError = class extends BetterAuthError {
	code;
	details;
	/**
	* The per-flow `errorCallbackURL` recovered from the parsed state, when the
	* failure happened after the state was successfully parsed (for example a
	* nonce or state-cookie mismatch). It was origin-validated at sign-in, so
	* the callback can safely redirect there instead of the default error page.
	* Absent when the state could not be parsed at all.
	*/
	errorURL;
	constructor(message, options) {
		super(message, options);
		this.code = options.code;
		this.details = options.details;
		this.errorURL = options.errorURL;
	}
};
async function generateGenericState(c, stateData, settings) {
	const state = generateRandomString(32);
	if (c.context.oauthConfig.storeStateStrategy === "cookie") {
		const payload = {
			...stateData,
			oauthState: state
		};
		const encryptedData = await symmetricEncrypt({
			key: c.context.secretConfig,
			data: JSON.stringify(payload)
		});
		const stateCookie = c.context.createAuthCookie(settings?.cookieName ?? "oauth_state", { maxAge: 600 });
		c.setCookie(stateCookie.name, encryptedData, stateCookie.attributes);
		return {
			state,
			codeVerifier: stateData.codeVerifier
		};
	}
	const stateCookie = c.context.createAuthCookie(settings?.cookieName ?? "state", { maxAge: 300 });
	await c.setSignedCookie(stateCookie.name, state, c.context.secret, stateCookie.attributes);
	const expiresAt = /* @__PURE__ */ new Date();
	expiresAt.setMinutes(expiresAt.getMinutes() + 10);
	if (!await c.context.internalAdapter.createVerificationValue({
		value: JSON.stringify({
			...stateData,
			oauthState: state
		}),
		identifier: state,
		expiresAt
	})) throw new StateError("Unable to create verification. Make sure the database adapter is properly working and there is a verification table in the database", { code: "state_generation_error" });
	return {
		state,
		codeVerifier: stateData.codeVerifier
	};
}
async function parseGenericState(c, state, settings) {
	if (!state) throw new StateError("State not found in OAuth callback", { code: "state_not_found" });
	const storeStateStrategy = c.context.oauthConfig.storeStateStrategy;
	let parsedData;
	if (storeStateStrategy === "cookie") {
		const stateCookie = c.context.createAuthCookie(settings?.cookieName ?? "oauth_state");
		const encryptedData = c.getCookie(stateCookie.name);
		if (!encryptedData) throw new StateError("State mismatch: auth state cookie not found", {
			code: "state_mismatch",
			details: { state }
		});
		try {
			const decryptedData = await symmetricDecrypt({
				key: c.context.secretConfig,
				data: encryptedData
			});
			parsedData = stateDataSchema.parse(JSON.parse(decryptedData));
		} catch (error) {
			throw new StateError("State invalid: Failed to decrypt or parse auth state", {
				code: "state_invalid",
				details: { state },
				cause: error
			});
		}
		if (!parsedData.oauthState || parsedData.oauthState !== state) throw new StateError("State mismatch: OAuth state parameter does not match stored state", {
			code: "state_security_mismatch",
			details: { state },
			errorURL: parsedData.errorURL
		});
		expireCookie(c, stateCookie);
	} else {
		const data = await c.context.internalAdapter.findVerificationValue(state);
		if (!data) throw new StateError("State mismatch: verification not found", {
			code: "state_mismatch",
			details: { state }
		});
		parsedData = stateDataSchema.parse(JSON.parse(data.value));
		if (parsedData.oauthState !== void 0 && parsedData.oauthState !== state) throw new StateError("State mismatch: OAuth state parameter does not match stored state", {
			code: "state_security_mismatch",
			details: { state },
			errorURL: parsedData.errorURL
		});
		const stateCookie = c.context.createAuthCookie(settings?.cookieName ?? "state");
		const stateCookieValue = await c.getSignedCookie(stateCookie.name, c.context.secret);
		if (!(settings?.skipStateCookieCheck ?? c.context.oauthConfig.skipStateCookieCheck) && (!stateCookieValue || stateCookieValue !== state)) throw new StateError("State mismatch: State not persisted correctly", {
			code: "state_security_mismatch",
			details: { state },
			errorURL: parsedData.errorURL
		});
		expireCookie(c, stateCookie);
		await c.context.internalAdapter.deleteVerificationByIdentifier(state);
	}
	if (parsedData.expiresAt < Date.now()) throw new StateError("Invalid state: request expired", {
		code: "state_mismatch",
		details: { expiresAt: parsedData.expiresAt },
		errorURL: parsedData.errorURL
	});
	return parsedData;
}
var HANDLING_DOCS_URL = "https://www.better-auth.com/docs/concepts/oauth#handling-providers-without-email";
/**
* Redirect the user to the OAuth error page with a machine-readable `error`
* code (and optional `error_description`).
*
* Every OAuth callback path routes its failures through this helper so the
* query parameter name, the `?`/`&` separator, and URL encoding are decided in
* one place. The error page reads the `error` query parameter, so callers must
* never hand-build the redirect with a different parameter name.
*/
function redirectOnError(ctx, errorURL, error, description) {
	const params = new URLSearchParams({ error });
	if (description) params.set("error_description", description);
	const sep = errorURL.includes("?") ? "&" : "?";
	throw ctx.redirect(`${errorURL}${sep}${params.toString()}`);
}
/**
* Build the logger message shown when an OAuth provider does not return an
* email address. Kept in one place so every rejection site points users at
* the same workaround docs.
*/
function missingEmailLogMessage(providerId, options) {
	return `${options?.source === "generic" ? `Generic OAuth provider "${providerId}"` : `Provider "${providerId}"`} did not return an email${options?.source === "id_token" ? " in the id token" : ""}. Either request the provider's email scope, or synthesize one via \`mapProfileToUser\`. See ${HANDLING_DOCS_URL}`;
}
var { get: getOAuthState, set: setOAuthState } = defineRequestState(() => null);
async function generateState(c, link, additionalData) {
	const callbackURL = c.body?.callbackURL || c.context.options.baseURL;
	if (!callbackURL) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.CALLBACK_URL_REQUIRED);
	const codeVerifier = generateRandomString(128);
	const stateData = {
		...additionalData ? additionalData : {},
		callbackURL,
		codeVerifier,
		errorURL: c.body?.errorCallbackURL,
		newUserURL: c.body?.newUserCallbackURL,
		link,
		expiresAt: Date.now() + 6e5,
		requestSignUp: c.body?.requestSignUp
	};
	await setOAuthState(stateData);
	try {
		return generateGenericState(c, stateData);
	} catch (error) {
		c.context.logger.error("Failed to create verification", error);
		throw new APIError("INTERNAL_SERVER_ERROR", {
			message: "Unable to create verification",
			cause: error
		});
	}
}
async function parseState(c) {
	const state = c.query.state || c.body?.state;
	const errorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
	let parsedData;
	try {
		parsedData = await parseGenericState(c, state);
	} catch (error) {
		c.context.logger.error("Failed to parse state", error);
		let code = "internal_server_error";
		let redirectErrorURL = errorURL;
		if (error instanceof StateError) {
			code = error.code === "state_security_mismatch" ? "state_mismatch" : error.code;
			redirectErrorURL = error.errorURL ?? errorURL;
		}
		redirectOnError(c, redirectErrorURL, code);
	}
	if (!parsedData.errorURL) parsedData.errorURL = errorURL;
	if (parsedData) await setOAuthState(parsedData);
	return parsedData;
}
var HIDE_METADATA = { scope: "server" };
/**
* Matches the given url against an origin or origin pattern
* See "options.trustedOrigins" for details of supported patterns
*
* @param url The url to test
* @param pattern The origin pattern
* @param [settings] Specify supported pattern matching settings
* @returns {boolean} true if the URL matches the origin pattern, false otherwise.
*/
var matchesOriginPattern = (url, pattern, settings) => {
	if (url.startsWith("/")) {
		if (settings?.allowRelativePaths) return url.startsWith("/") && /^\/(?!\/|\\|%2f|%5c)[\w\-.\+/@]*(?:\?[\w\-.\+/=&%@]*)?$/.test(url);
		return false;
	}
	if (pattern.includes("*") || pattern.includes("?")) {
		if (pattern.includes("://")) return wildcardMatch(pattern)(getOrigin(url) || url);
		const host = getHost(url);
		if (!host) return false;
		return wildcardMatch(pattern)(host);
	}
	const protocol = getProtocol(url);
	return protocol === "http:" || protocol === "https:" || !protocol ? pattern === getOrigin(url) : url.startsWith(pattern);
};
/**
* Checks if CSRF should be skipped for backward compatibility.
* Previously, disableOriginCheck also disabled CSRF checks.
* This maintains that behavior when disableCSRFCheck isn't explicitly set.
* Only triggers for skipOriginCheck === true, not for path arrays.
*/
function shouldSkipCSRFForBackwardCompat(ctx) {
	return ctx.context.skipOriginCheck === true && ctx.context.options.advanced?.disableCSRFCheck === void 0;
}
/**
* Checks if the origin check should be skipped for the current request.
* Handles both boolean (skip all) and array (skip specific paths) configurations.
*/
function shouldSkipOriginCheck(ctx) {
	const skipOriginCheck = ctx.context.skipOriginCheck;
	if (skipOriginCheck === true) return true;
	if (Array.isArray(skipOriginCheck) && ctx.request) try {
		const basePath = new URL(ctx.context.baseURL).pathname;
		const currentPath = normalizePathname(ctx.request.url, basePath);
		return skipOriginCheck.some((skipPath) => {
			const normalizedSkipPath = skipPath.replace(/\/+$/, "");
			return currentPath === normalizedSkipPath || currentPath.startsWith(`${normalizedSkipPath}/`);
		});
	} catch {}
	return false;
}
/**
* Logs deprecation warning for users relying on coupled behavior.
* Only logs if user explicitly set disableOriginCheck (not test environment default).
*/
var logBackwardCompatWarning = deprecate(function logBackwardCompatWarning() {}, "disableOriginCheck: true currently also disables CSRF checks. In a future version, disableOriginCheck will ONLY disable URL validation. To keep CSRF disabled, add disableCSRFCheck: true to your config.");
/**
* A middleware to validate callbackURL and origin against trustedOrigins.
* Also handles CSRF protection using Fetch Metadata for first-login scenarios.
*/
var originCheckMiddleware = createAuthMiddleware(async (ctx) => {
	if (ctx.request?.method === "GET" || ctx.request?.method === "OPTIONS" || ctx.request?.method === "HEAD" || !ctx.request) return;
	await validateOrigin(ctx);
	if (shouldSkipOriginCheck(ctx)) return;
	const { body, query } = ctx;
	const callbackURL = body?.callbackURL || query?.callbackURL;
	const redirectURL = body?.redirectTo;
	const errorCallbackURL = body?.errorCallbackURL;
	const newUserCallbackURL = body?.newUserCallbackURL;
	const validateURL = (url, label) => {
		if (!url) return;
		if (typeof url !== "string") throw APIError.fromStatus("BAD_REQUEST", { message: `Invalid ${label}: expected a string` });
		if (!ctx.context.isTrustedOrigin(url, { allowRelativePaths: label !== "origin" })) {
			ctx.context.logger.error(`Invalid ${label}: ${url}`);
			ctx.context.logger.info(`If it's a valid URL, please add ${url} to trustedOrigins in your auth config\n`, `Current list of trustedOrigins: ${ctx.context.trustedOrigins}`);
			if (label === "origin") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ORIGIN);
			if (label === "callbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_CALLBACK_URL);
			if (label === "redirectURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_REDIRECT_URL);
			if (label === "errorCallbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ERROR_CALLBACK_URL);
			if (label === "newUserCallbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_NEW_USER_CALLBACK_URL);
			throw APIError.fromStatus("FORBIDDEN", { message: `Invalid ${label}` });
		}
	};
	callbackURL && validateURL(callbackURL, "callbackURL");
	redirectURL && validateURL(redirectURL, "redirectURL");
	errorCallbackURL && validateURL(errorCallbackURL, "errorCallbackURL");
	newUserCallbackURL && validateURL(newUserCallbackURL, "newUserCallbackURL");
});
var originCheck = (getValue) => createAuthMiddleware(async (ctx) => {
	if (!ctx.request) return;
	if (shouldSkipOriginCheck(ctx)) return;
	const callbackURL = getValue(ctx);
	const validateURL = (url, label) => {
		if (!url) return;
		if (!ctx.context.isTrustedOrigin(url, { allowRelativePaths: label !== "origin" })) {
			ctx.context.logger.error(`Invalid ${label}: ${url}`);
			ctx.context.logger.info(`If it's a valid URL, please add ${url} to trustedOrigins in your auth config\n`, `Current list of trustedOrigins: ${ctx.context.trustedOrigins}`);
			if (label === "origin") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ORIGIN);
			if (label === "callbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_CALLBACK_URL);
			if (label === "redirectURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_REDIRECT_URL);
			if (label === "errorCallbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ERROR_CALLBACK_URL);
			if (label === "newUserCallbackURL") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_NEW_USER_CALLBACK_URL);
			throw APIError.fromStatus("FORBIDDEN", { message: `Invalid ${label}` });
		}
	};
	const callbacks = Array.isArray(callbackURL) ? callbackURL : [callbackURL];
	for (const url of callbacks) validateURL(url, "callbackURL");
});
/**
* Validates origin header against trusted origins.
* @param ctx - The endpoint context
* @param forceValidate - If true, always validate origin regardless of cookies/skip flags
*/
async function validateOrigin(ctx, forceValidate = false) {
	const headers = ctx.request?.headers;
	if (!headers || !ctx.request) return;
	const originHeader = headers.get("origin") || headers.get("referer") || "";
	const useCookies = headers.has("cookie");
	if (ctx.context.skipCSRFCheck) return;
	if (shouldSkipCSRFForBackwardCompat(ctx)) {
		ctx.context.options.advanced?.disableOriginCheck === true && logBackwardCompatWarning();
		return;
	}
	if (shouldSkipOriginCheck(ctx)) return;
	if (!(forceValidate || useCookies)) return;
	if (!originHeader || originHeader === "null") throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.MISSING_OR_NULL_ORIGIN);
	const trustedOrigins = Array.isArray(ctx.context.options.trustedOrigins) ? ctx.context.trustedOrigins : [...ctx.context.trustedOrigins, ...(await ctx.context.options.trustedOrigins?.(ctx.request))?.filter((v) => Boolean(v)) || []];
	if (!trustedOrigins.some((origin) => matchesOriginPattern(originHeader, origin))) {
		ctx.context.logger.error(`Invalid origin: ${originHeader}`);
		ctx.context.logger.info(`If it's a valid URL, please add ${originHeader} to trustedOrigins in your auth config\n`, `Current list of trustedOrigins: ${trustedOrigins}`);
		throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.INVALID_ORIGIN);
	}
}
/**
* Middleware for CSRF protection using Fetch Metadata headers.
* This prevents cross-site navigation login attacks while supporting progressive enhancement.
*/
var formCsrfMiddleware = createAuthMiddleware(async (ctx) => {
	if (!ctx.request) return;
	await validateFormCsrf(ctx);
});
/**
* Validates CSRF protection for first-login scenarios using Fetch Metadata headers.
* This prevents cross-site form submission attacks while supporting progressive enhancement.
*/
async function validateFormCsrf(ctx) {
	const req = ctx.request;
	if (!req) return;
	if (ctx.context.skipCSRFCheck) return;
	if (shouldSkipCSRFForBackwardCompat(ctx)) return;
	const headers = req.headers;
	if (headers.has("cookie")) return await validateOrigin(ctx);
	const site = headers.get("Sec-Fetch-Site");
	const mode = headers.get("Sec-Fetch-Mode");
	const dest = headers.get("Sec-Fetch-Dest");
	if (Boolean(site && site.trim() || mode && mode.trim() || dest && dest.trim())) {
		if (site === "cross-site" && mode === "navigate") {
			ctx.context.logger.error("Blocked cross-site navigation login attempt (CSRF protection)", {
				secFetchSite: site,
				secFetchMode: mode,
				secFetchDest: dest
			});
			throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.CROSS_SITE_NAVIGATION_LOGIN_BLOCKED);
		}
		return await validateOrigin(ctx, true);
	}
	if (headers.get("origin") || headers.get("referer")) return await validateOrigin(ctx, true);
}
var memory = /* @__PURE__ */ new Map();
var MEMORY_STORE_MAX_ENTRIES = 1e5;
function pruneMemoryStore() {
	const now = Date.now();
	for (const [key, entry] of memory) if (now >= entry.expiresAt) memory.delete(key);
	if (memory.size <= MEMORY_STORE_MAX_ENTRIES) return;
	const overflow = memory.size - MEMORY_STORE_MAX_ENTRIES;
	let removed = 0;
	for (const key of memory.keys()) {
		memory.delete(key);
		if (++removed >= overflow) break;
	}
}
/**
* Decide an atomic rate-limit step against an in-memory `RateLimit` snapshot
* for the rolling `window` (seconds) and `max`. Shared by the memory backend
* (read-decide-write is atomic under single-threaded JS) and as the fallback
* for storages lacking an atomic primitive.
*/
function decideConsume(data, rule, now) {
	const windowInMs = rule.window * 1e3;
	if (!data) return {
		next: {
			key: "",
			count: 1,
			lastRequest: now
		},
		update: false,
		allowed: true,
		retryAfter: null
	};
	if (now - data.lastRequest > windowInMs) return {
		next: {
			...data,
			count: 1,
			lastRequest: now
		},
		update: true,
		allowed: true,
		retryAfter: null
	};
	if (data.count >= rule.max) return {
		next: data,
		update: true,
		allowed: false,
		retryAfter: getRetryAfter(data.lastRequest, rule.window)
	};
	return {
		next: {
			...data,
			count: data.count + 1,
			lastRequest: now
		},
		update: true,
		allowed: true,
		retryAfter: null
	};
}
function rateLimitResponse(retryAfter) {
	return new Response(JSON.stringify({ message: "Too many requests. Please try again later." }), {
		status: 429,
		statusText: "Too Many Requests",
		headers: { "X-Retry-After": retryAfter.toString() }
	});
}
function getRetryAfter(lastRequest, window) {
	const now = Date.now();
	const windowInMs = window * 1e3;
	return Math.ceil((lastRequest + windowInMs - now) / 1e3);
}
function createDatabaseStorageWrapper(ctx) {
	const model = "rateLimit";
	const db = ctx.adapter;
	const readRow = async (key) => {
		const data = (await db.findMany({
			model,
			where: [{
				field: "key",
				value: key
			}]
		}))[0];
		if (typeof data?.lastRequest === "bigint") data.lastRequest = Number(data.lastRequest);
		return data;
	};
	const consume = async (key, rule) => {
		const windowInMs = rule.window * 1e3;
		const data = await readRow(key);
		const now = Date.now();
		if (!data) try {
			await db.create({
				model,
				data: {
					key,
					count: 1,
					lastRequest: now
				}
			});
			return {
				allowed: true,
				retryAfter: null
			};
		} catch (error) {
			if (!await readRow(key)) throw error;
			return consume(key, rule);
		}
		if (now - data.lastRequest > windowInMs) {
			if (await db.incrementOne({
				model,
				where: [{
					field: "key",
					value: key
				}, {
					field: "lastRequest",
					operator: "lte",
					value: data.lastRequest
				}],
				increment: {},
				set: {
					count: 1,
					lastRequest: now
				}
			})) {
				await deleteExpiredRows(now);
				return {
					allowed: true,
					retryAfter: null
				};
			}
			return consume(key, rule);
		}
		const windowStart = now - windowInMs;
		if (await db.incrementOne({
			model,
			where: [
				{
					field: "key",
					value: key
				},
				{
					field: "lastRequest",
					operator: "gt",
					value: windowStart
				},
				{
					field: "count",
					operator: "lt",
					value: rule.max
				}
			],
			increment: { count: 1 },
			set: { lastRequest: now }
		})) return {
			allowed: true,
			retryAfter: null
		};
		const fresh = await readRow(key);
		if (!fresh) return consume(key, rule);
		if (now - fresh.lastRequest > windowInMs) return consume(key, rule);
		return {
			allowed: false,
			retryAfter: getRetryAfter(fresh.lastRequest, rule.window)
		};
	};
	const deleteExpiredRows = async (now) => {
		const cutoff = now - Math.max(ctx.rateLimit.window, ...getDefaultSpecialRules().map((r) => r.window)) * 1e3;
		await ctx.runInBackgroundOrAwait(db.deleteMany({
			model,
			where: [{
				field: "lastRequest",
				operator: "lt",
				value: cutoff
			}]
		}).then(() => void 0).catch((e) => ctx.logger.error("Error pruning rate limit rows", e)));
	};
	return {
		get: readRow,
		set: async (key, value, _update) => {
			try {
				if (_update) await db.updateMany({
					model,
					where: [{
						field: "key",
						value: key
					}],
					update: {
						count: value.count,
						lastRequest: value.lastRequest
					}
				});
				else await db.create({
					model,
					data: {
						key,
						count: value.count,
						lastRequest: value.lastRequest
					}
				});
			} catch (e) {
				ctx.logger.error("Error setting rate limit", e);
			}
		},
		consume
	};
}
function getRateLimitStorage(ctx, rateLimitSettings) {
	if (ctx.options.rateLimit?.customStorage) return ctx.options.rateLimit.customStorage;
	const storage = ctx.rateLimit.storage;
	if (storage === "secondary-storage") {
		const ttlFor = (window) => window ?? ctx.options.rateLimit?.window ?? 10;
		return {
			get: async (key) => {
				const data = await ctx.options.secondaryStorage?.get(key);
				return data ? safeJSONParse(data) : null;
			},
			set: async (key, value, _update) => {
				await ctx.options.secondaryStorage?.set?.(key, JSON.stringify(value), ttlFor(rateLimitSettings.window));
			},
			consume: ctx.options.secondaryStorage?.increment ? async (key, rule) => {
				if (await ctx.options.secondaryStorage.increment(key, ttlFor(rule.window)) <= rule.max) return {
					allowed: true,
					retryAfter: null
				};
				return {
					allowed: false,
					retryAfter: rule.window
				};
			} : void 0
		};
	} else if (storage === "memory") {
		const ttlFor = (window) => window ?? ctx.options.rateLimit?.window ?? 10;
		return {
			async get(key) {
				const entry = memory.get(key);
				if (!entry) return null;
				if (Date.now() >= entry.expiresAt) {
					memory.delete(key);
					return null;
				}
				return entry.data;
			},
			async set(key, value, _update) {
				const expiresAt = Date.now() + ttlFor(rateLimitSettings.window) * 1e3;
				memory.set(key, {
					data: value,
					expiresAt
				});
			},
			async consume(key, rule) {
				pruneMemoryStore();
				const now = Date.now();
				const entry = memory.get(key);
				const decision = decideConsume(entry && now < entry.expiresAt ? entry.data : void 0, rule, now);
				if (decision.allowed) memory.set(key, {
					data: {
						...decision.next,
						key
					},
					expiresAt: now + ttlFor(rule.window) * 1e3
				});
				return {
					allowed: decision.allowed,
					retryAfter: decision.retryAfter
				};
			}
		};
	}
	return createDatabaseStorageWrapper(ctx);
}
var ipWarningLogged = false;
var NO_TRUSTED_IP_KEY = "no-trusted-ip";
async function resolveRateLimitConfig(req, ctx) {
	const basePath = new URL(ctx.baseURL).pathname;
	const path = normalizePathname(req.url, basePath);
	let currentWindow = ctx.rateLimit.window;
	let currentMax = ctx.rateLimit.max;
	const ip = getIp(req, ctx.options);
	if (!ip && ctx.options.advanced?.ipAddress?.disableIpTracking) return null;
	if (!ip && !ipWarningLogged) {
		ctx.logger.warn("Rate limiting could not determine a client IP and is falling back to a single shared per-path bucket. Ensure your runtime forwards a trusted client IP header, then set `advanced.ipAddress.ipAddressHeaders` or `advanced.ipAddress.trustedProxies` so the address can be resolved.");
		ipWarningLogged = true;
	}
	const key = createRateLimitKey(ip ?? NO_TRUSTED_IP_KEY, path);
	const specialRule = getDefaultSpecialRules().find((rule) => rule.pathMatcher(path));
	if (specialRule) {
		currentWindow = specialRule.window;
		currentMax = specialRule.max;
	}
	for (const plugin of ctx.options.plugins || []) if (plugin.rateLimit) {
		const matchedRule = plugin.rateLimit.find((rule) => rule.pathMatcher(path));
		if (matchedRule) {
			currentWindow = matchedRule.window;
			currentMax = matchedRule.max;
			break;
		}
	}
	if (ctx.rateLimit.customRules) {
		const _path = Object.keys(ctx.rateLimit.customRules).find((p) => {
			if (p.includes("*")) return wildcardMatch(p)(path);
			return p === path;
		});
		if (_path) {
			const customRule = ctx.rateLimit.customRules[_path];
			const resolved = typeof customRule === "function" ? await customRule(req, {
				window: currentWindow,
				max: currentMax
			}) : customRule;
			if (resolved) {
				currentWindow = resolved.window;
				currentMax = resolved.max;
			}
			if (resolved === false) return null;
		}
	}
	return {
		key,
		currentWindow,
		currentMax
	};
}
var legacyFallbackWarningLogged = false;
/**
* Decides the rate limit for the request in a single atomic step. The whole
* check-and-increment happens here in the request phase; there is no separate
* response-phase write-back, so concurrent requests cannot all pass a stale
* read before any increment lands.
*/
async function onRequestRateLimit(req, ctx) {
	if (!ctx.rateLimit.enabled) return;
	const config = await resolveRateLimitConfig(req, ctx);
	if (!config) return;
	const { key, currentWindow, currentMax } = config;
	const storage = getRateLimitStorage(ctx, { window: currentWindow });
	const rule = {
		window: currentWindow,
		max: currentMax
	};
	if (storage.consume) {
		const { allowed, retryAfter } = await storage.consume(key, rule);
		if (!allowed) return rateLimitResponse(retryAfter ?? currentWindow);
		return;
	}
	return legacyConsume(ctx, storage, key, rule);
}
/**
* Non-atomic check-then-increment for storages that do not implement `consume`
* (custom storages, or secondary storages without `increment`). Under
* concurrency this is best-effort: simultaneous requests can each pass the
* check before either write lands.
*
* FIXME(rate-limit-consume-required): remove on `next` once `consume` is the
* sole required member of the storage contract.
*/
async function legacyConsume(ctx, storage, key, rule) {
	if (!legacyFallbackWarningLogged) {
		ctx.logger.warn("Rate limiting is best-effort: the configured storage has no atomic `consume`, so concurrent requests may bypass the limit. Provide a storage that implements `consume` for strict enforcement.");
		legacyFallbackWarningLogged = true;
	}
	const decision = decideConsume(await storage.get(key), rule, Date.now());
	if (!decision.allowed) return rateLimitResponse(decision.retryAfter ?? rule.window);
	await storage.set(key, {
		...decision.next,
		key
	}, decision.update);
}
function getDefaultSpecialRules() {
	return [{
		pathMatcher(path) {
			return path.startsWith("/sign-in") || path.startsWith("/sign-up") || path.startsWith("/change-password") || path.startsWith("/change-email");
		},
		window: 10,
		max: 3
	}, {
		pathMatcher(path) {
			return path === "/request-password-reset" || path === "/send-verification-email" || path.startsWith("/forget-password") || path === "/email-otp/send-verification-otp" || path === "/email-otp/request-password-reset";
		},
		window: 60,
		max: 3
	}];
}
/**
* State for skipping session refresh
*
* In some cases, such as when using server-side rendering (SSR) or when dealing with
* certain types of requests, it may be necessary to skip session refresh to prevent
* potential inconsistencies between the session data in the database and the session
* data stored in cookies.
*/
var { get: getShouldSkipSessionRefresh, set: setShouldSkipSessionRefresh } = defineRequestState(() => false);
var getSession = () => createAuthEndpoint("/get-session", {
	method: ["GET", "POST"],
	operationId: "getSession",
	query: getSessionQuerySchema,
	requireHeaders: true,
	metadata: { openapi: {
		operationId: "getSession",
		description: "Get the current session",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: ["object", "null"],
				properties: {
					session: { $ref: "#/components/schemas/Session" },
					user: { $ref: "#/components/schemas/User" }
				},
				required: ["session", "user"]
			} } }
		} }
	} }
}, async (ctx) => {
	ctx.setHeader("cache-control", "no-store");
	ctx.setHeader("pragma", "no-cache");
	const deferSessionRefresh = ctx.context.options.session?.deferSessionRefresh;
	const isPostRequest = ctx.method === "POST";
	if (isPostRequest && !deferSessionRefresh) throw APIError.from("METHOD_NOT_ALLOWED", BASE_ERROR_CODES.METHOD_NOT_ALLOWED_DEFER_SESSION_REQUIRED);
	try {
		const sessionCookieToken = await ctx.getSignedCookie(ctx.context.authCookies.sessionToken.name, ctx.context.secret);
		if (!sessionCookieToken) return null;
		const sessionDataCookie = getChunkedCookie(ctx, ctx.context.authCookies.sessionData.name);
		let sessionDataPayload = null;
		if (sessionDataCookie) {
			const strategy = ctx.context.options.session?.cookieCache?.strategy || "compact";
			if (strategy === "jwe") {
				const payload = await symmetricDecodeJWT(sessionDataCookie, ctx.context.secretConfig, "better-auth-session");
				if (payload && payload.session && payload.user) sessionDataPayload = {
					session: {
						session: payload.session,
						user: payload.user,
						updatedAt: payload.updatedAt,
						version: payload.version
					},
					expiresAt: payload.exp ? payload.exp * 1e3 : Date.now()
				};
				else expireCookie(ctx, ctx.context.authCookies.sessionData);
			} else if (strategy === "jwt") {
				const payload = await verifyJWT(sessionDataCookie, ctx.context.secret);
				if (payload && payload.session && payload.user) sessionDataPayload = {
					session: {
						session: payload.session,
						user: payload.user,
						updatedAt: payload.updatedAt,
						version: payload.version
					},
					expiresAt: payload.exp ? payload.exp * 1e3 : Date.now()
				};
				else expireCookie(ctx, ctx.context.authCookies.sessionData);
			} else {
				const parsed = safeJSONParse(binary.decode(base64Url.decode(sessionDataCookie)));
				if (parsed) if (await createHMAC("SHA-256", "base64urlnopad").verify(ctx.context.secret, JSON.stringify({
					...parsed.session,
					expiresAt: parsed.expiresAt
				}), parsed.signature)) sessionDataPayload = parsed;
				else expireCookie(ctx, ctx.context.authCookies.sessionData);
			}
		}
		const dontRememberMe = await ctx.getSignedCookie(ctx.context.authCookies.dontRememberToken.name, ctx.context.secret);
		/**
		* If session data is present in the cookie, check if it should be used or refreshed
		*/
		if (sessionDataPayload?.session && ctx.context.options.session?.cookieCache?.enabled && !ctx.query?.disableCookieCache) {
			const session = sessionDataPayload.session;
			const versionConfig = ctx.context.options.session?.cookieCache?.version;
			let expectedVersion = "1";
			if (versionConfig) {
				if (typeof versionConfig === "string") expectedVersion = versionConfig;
				else if (typeof versionConfig === "function") {
					const result = versionConfig(session.session, session.user);
					expectedVersion = result instanceof Promise ? await result : result;
				}
			}
			if ((session.version || "1") !== expectedVersion) expireCookie(ctx, ctx.context.authCookies.sessionData);
			else {
				const cachedSessionExpiresAt = new Date(session.session.expiresAt);
				if (sessionDataPayload.expiresAt < Date.now() || cachedSessionExpiresAt < /* @__PURE__ */ new Date()) expireCookie(ctx, ctx.context.authCookies.sessionData);
				else {
					const cookieRefreshCache = ctx.context.sessionConfig.cookieRefreshCache;
					if (cookieRefreshCache === false) {
						ctx.context.session = session;
						const parsedSession = parseSessionOutput(ctx.context.options, {
							...session.session,
							expiresAt: new Date(session.session.expiresAt),
							createdAt: new Date(session.session.createdAt),
							updatedAt: new Date(session.session.updatedAt)
						});
						const parsedUser = parseUserOutput(ctx.context.options, {
							...session.user,
							createdAt: new Date(session.user.createdAt),
							updatedAt: new Date(session.user.updatedAt)
						});
						return ctx.json({
							session: parsedSession,
							user: parsedUser
						});
					}
					const timeUntilExpiry = sessionDataPayload.expiresAt - Date.now();
					const updateAge = cookieRefreshCache.updateAge * 1e3;
					const shouldSkipSessionRefresh = await getShouldSkipSessionRefresh();
					if (timeUntilExpiry < updateAge && !shouldSkipSessionRefresh) {
						const refreshedSession = {
							session: { ...session.session },
							user: session.user,
							updatedAt: Date.now()
						};
						await setCookieCache(ctx, refreshedSession, false);
						const sessionTokenOptions = ctx.context.authCookies.sessionToken.attributes;
						const sessionTokenMaxAge = dontRememberMe ? void 0 : ctx.context.sessionConfig.expiresIn;
						await ctx.setSignedCookie(ctx.context.authCookies.sessionToken.name, session.session.token, ctx.context.secret, {
							...sessionTokenOptions,
							maxAge: sessionTokenMaxAge
						});
						const parsedRefreshedSession = parseSessionOutput(ctx.context.options, {
							...refreshedSession.session,
							expiresAt: new Date(refreshedSession.session.expiresAt),
							createdAt: new Date(refreshedSession.session.createdAt),
							updatedAt: new Date(refreshedSession.session.updatedAt)
						});
						const parsedRefreshedUser = parseUserOutput(ctx.context.options, {
							...refreshedSession.user,
							createdAt: new Date(refreshedSession.user.createdAt),
							updatedAt: new Date(refreshedSession.user.updatedAt)
						});
						ctx.context.session = {
							session: parsedRefreshedSession,
							user: parsedRefreshedUser
						};
						return ctx.json({
							session: parsedRefreshedSession,
							user: parsedRefreshedUser
						});
					}
					const parsedSession = parseSessionOutput(ctx.context.options, {
						...session.session,
						expiresAt: new Date(session.session.expiresAt),
						createdAt: new Date(session.session.createdAt),
						updatedAt: new Date(session.session.updatedAt)
					});
					const parsedUser = parseUserOutput(ctx.context.options, {
						...session.user,
						createdAt: new Date(session.user.createdAt),
						updatedAt: new Date(session.user.updatedAt)
					});
					ctx.context.session = {
						session: parsedSession,
						user: parsedUser
					};
					return ctx.json({
						session: parsedSession,
						user: parsedUser
					});
				}
			}
		}
		const session = await ctx.context.internalAdapter.findSession(sessionCookieToken);
		ctx.context.session = session;
		if (!session || session.session.expiresAt < /* @__PURE__ */ new Date()) {
			deleteSessionCookie(ctx);
			if (session) {
				/**
				* if session expired clean up the session
				* Only delete on POST when deferSessionRefresh is enabled
				*/
				if (!deferSessionRefresh || isPostRequest) await ctx.context.internalAdapter.deleteSession(session.session.token);
			}
			return ctx.json(null);
		}
		/**
		* We don't need to update the session if the user doesn't want to be remembered
		* or if the session refresh is disabled
		*/
		if (dontRememberMe || ctx.query?.disableRefresh) {
			const parsedSession = parseSessionOutput(ctx.context.options, session.session);
			const parsedUser = parseUserOutput(ctx.context.options, session.user);
			return ctx.json({
				session: parsedSession,
				user: parsedUser
			});
		}
		const expiresIn = ctx.context.sessionConfig.expiresIn;
		const updateAge = ctx.context.sessionConfig.updateAge;
		const shouldBeUpdated = session.session.expiresAt.valueOf() - expiresIn * 1e3 + updateAge * 1e3 <= Date.now();
		const disableRefresh = ctx.query?.disableRefresh || ctx.context.options.session?.disableSessionRefresh;
		const shouldSkipSessionRefresh = await getShouldSkipSessionRefresh();
		const needsRefresh = shouldBeUpdated && !disableRefresh && !shouldSkipSessionRefresh;
		/**
		* When deferSessionRefresh is enabled and this is a GET request,
		* return the session without performing writes, but include needsRefresh flag
		*/
		if (deferSessionRefresh && !isPostRequest) {
			await setCookieCache(ctx, session, !!dontRememberMe);
			const parsedSession = parseSessionOutput(ctx.context.options, session.session);
			const parsedUser = parseUserOutput(ctx.context.options, session.user);
			return ctx.json({
				session: parsedSession,
				user: parsedUser,
				needsRefresh
			});
		}
		if (needsRefresh) {
			const updatedSession = await ctx.context.internalAdapter.updateSession(session.session.token, {
				expiresAt: getDate(ctx.context.sessionConfig.expiresIn, "sec"),
				updatedAt: /* @__PURE__ */ new Date()
			});
			if (!updatedSession) {
				/**
				* Handle case where session update fails (e.g., concurrent deletion)
				*/
				deleteSessionCookie(ctx);
				throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.FAILED_TO_GET_SESSION);
			}
			const maxAge = ctx.context.sessionConfig.expiresIn;
			await setSessionCookie(ctx, {
				session: updatedSession,
				user: session.user
			}, false, { maxAge });
			const parsedUpdatedSession = parseSessionOutput(ctx.context.options, updatedSession);
			const parsedUser = parseUserOutput(ctx.context.options, session.user);
			return ctx.json({
				session: parsedUpdatedSession,
				user: parsedUser
			});
		}
		await setCookieCache(ctx, session, !!dontRememberMe);
		const parsedSession = parseSessionOutput(ctx.context.options, session.session);
		const parsedUser = parseUserOutput(ctx.context.options, session.user);
		return ctx.json({
			session: parsedSession,
			user: parsedUser
		});
	} catch (error) {
		if (isAPIError(error)) throw error;
		ctx.context.logger.error("INTERNAL_SERVER_ERROR", error);
		throw APIError.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.FAILED_TO_GET_SESSION);
	}
});
/**
* Whether the deployment keeps sessions in a durable server-side store
* (a database or secondary storage) rather than only in the signed cookie.
*
* Sensitive operations use this to decide whether the cookie cache is merely an
* optimization that must be bypassed for an authoritative read (`true`), or the
* only place the session lives and therefore the authority itself (`false`, for
* stateless / DB-less deployments). Pass the result as `disableCookieCache` so a
* revoked-but-cached session cannot authorize a sensitive action.
*/
var isStateful = (ctx) => hasServerSessionStore(ctx.context.options);
var getSessionFromCtx = async (ctx, config) => {
	if (ctx.context.session) return ctx.context.session;
	const session = await getSession()({
		...ctx,
		method: "GET",
		asResponse: false,
		headers: ctx.headers,
		returnHeaders: true,
		returnStatus: false,
		query: {
			...config,
			...ctx.query,
			disableCookieCache: config?.disableCookieCache || ctx.query?.disableCookieCache,
			disableRefresh: config?.disableRefresh || ctx.query?.disableRefresh
		}
	}).catch(() => {
		return null;
	});
	if (!session) {
		ctx.context.session = null;
		return null;
	}
	if (session.headers) session.headers.forEach((value, key) => {
		const lowerKey = key.toLowerCase();
		if (lowerKey === "cache-control" || lowerKey === "pragma") return;
		if (lowerKey === "set-cookie") ctx.responseHeaders.append(key, value);
		else ctx.responseHeaders.set(key, value);
	});
	ctx.context.session = session.response;
	return session.response;
};
/**
* Reads the session from the source that can authorize sensitive work.
*
* Stateful deployments must re-read the server-side session store because an
* earlier hook may have populated `ctx.context.session` from cookie cache.
* Stateless deployments keep the signed cookie as the session record.
*/
var getAuthoritativeSessionFromCtx = async (ctx) => {
	if (!isStateful(ctx)) return getSessionFromCtx(ctx);
	ctx.context.session = null;
	return getSessionFromCtx(ctx, { disableCookieCache: true });
};
/**
* The middleware forces the endpoint to require a valid session.
*/
var sessionMiddleware = createAuthMiddleware(async (ctx) => {
	const session = await getSessionFromCtx(ctx);
	if (!session?.session) throw APIError.from("UNAUTHORIZED", {
		message: "Unauthorized",
		code: "UNAUTHORIZED"
	});
	return { session };
});
/**
* This middleware forces the endpoint to require a valid authoritative session.
* This should be used for sensitive operations like password changes, account deletion, etc.
*/
var sensitiveSessionMiddleware = createAuthMiddleware(async (ctx) => {
	const session = await getAuthoritativeSessionFromCtx(ctx);
	if (!session?.session) throw APIError.from("UNAUTHORIZED", {
		message: "Unauthorized",
		code: "UNAUTHORIZED"
	});
	return { session };
});
createAuthMiddleware(async (ctx) => {
	const session = await getSessionFromCtx(ctx);
	if (!session?.session && (ctx.request || ctx.headers)) throw APIError.from("UNAUTHORIZED", {
		message: "Unauthorized",
		code: "UNAUTHORIZED"
	});
	return { session };
});
/**
* This middleware forces the endpoint to require a valid session,
* as well as making sure the session is fresh before proceeding.
*
* Session freshness check will be skipped if the session config's freshAge
* is set to 0
*/
var freshSessionMiddleware = createAuthMiddleware(async (ctx) => {
	const session = await getSessionFromCtx(ctx);
	if (!session?.session) throw APIError.from("UNAUTHORIZED", {
		message: "Unauthorized",
		code: "UNAUTHORIZED"
	});
	if (ctx.context.sessionConfig.freshAge !== 0) {
		const createdAt = new Date(session.session.createdAt).getTime();
		const freshAge = ctx.context.sessionConfig.freshAge * 1e3;
		if (Date.now() - createdAt >= freshAge) throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.SESSION_NOT_FRESH);
	}
	return { session };
});
/**
* user active sessions list
*/
var listSessions = () => createAuthEndpoint("/list-sessions", {
	method: "GET",
	operationId: "listUserSessions",
	use: [freshSessionMiddleware],
	requireHeaders: true,
	metadata: { openapi: {
		operationId: "listUserSessions",
		description: "List all active sessions for the user",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "array",
				items: { $ref: "#/components/schemas/Session" }
			} } }
		} }
	} }
}, async (ctx) => {
	try {
		const activeSessions = (await ctx.context.internalAdapter.listSessions(ctx.context.session.user.id, { onlyActiveSessions: true })).filter((session) => {
			return session.expiresAt > /* @__PURE__ */ new Date();
		});
		return ctx.json(activeSessions.map((session) => parseSessionOutput(ctx.context.options, session)));
	} catch (e) {
		ctx.context.logger.error(e);
		throw ctx.error("INTERNAL_SERVER_ERROR");
	}
});
/**
* revoke a single session
*/
var revokeSession = createAuthEndpoint("/revoke-session", {
	method: "POST",
	body: object({ token: string().meta({ description: "The token to revoke" }) }),
	use: [sensitiveSessionMiddleware],
	requireHeaders: true,
	metadata: { openapi: {
		description: "Revoke a single session",
		requestBody: { content: { "application/json": { schema: {
			type: "object",
			properties: { token: {
				type: "string",
				description: "The token to revoke"
			} },
			required: ["token"]
		} } } },
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { status: {
					type: "boolean",
					description: "Indicates if the session was revoked successfully"
				} },
				required: ["status"]
			} } }
		} }
	} }
}, async (ctx) => {
	const token = ctx.body.token;
	if ((await ctx.context.internalAdapter.findSession(token))?.session.userId === ctx.context.session.user.id) try {
		await ctx.context.internalAdapter.deleteSession(token);
	} catch (error) {
		ctx.context.logger.error(error && typeof error === "object" && "name" in error ? error.name : "", error);
		throw APIError.from("INTERNAL_SERVER_ERROR", {
			message: "Internal Server Error",
			code: "INTERNAL_SERVER_ERROR"
		});
	}
	return ctx.json({ status: true });
});
/**
* revoke all user sessions
*/
var revokeSessions = createAuthEndpoint("/revoke-sessions", {
	method: "POST",
	use: [sensitiveSessionMiddleware],
	requireHeaders: true,
	metadata: { openapi: {
		description: "Revoke all sessions for the user",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { status: {
					type: "boolean",
					description: "Indicates if all sessions were revoked successfully"
				} },
				required: ["status"]
			} } }
		} }
	} }
}, async (ctx) => {
	try {
		await ctx.context.internalAdapter.deleteUserSessions(ctx.context.session.user.id);
	} catch (error) {
		ctx.context.logger.error(error && typeof error === "object" && "name" in error ? error.name : "", error);
		throw APIError.from("INTERNAL_SERVER_ERROR", {
			message: "Internal Server Error",
			code: "INTERNAL_SERVER_ERROR"
		});
	}
	return ctx.json({ status: true });
});
var revokeOtherSessions = createAuthEndpoint("/revoke-other-sessions", {
	method: "POST",
	requireHeaders: true,
	use: [sensitiveSessionMiddleware],
	metadata: { openapi: {
		description: "Revoke all other sessions for the user except the current one",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { status: {
					type: "boolean",
					description: "Indicates if all other sessions were revoked successfully"
				} },
				required: ["status"]
			} } }
		} }
	} }
}, async (ctx) => {
	const session = ctx.context.session;
	if (!session.user) throw APIError.from("UNAUTHORIZED", {
		message: "Unauthorized",
		code: "UNAUTHORIZED"
	});
	const otherSessions = (await ctx.context.internalAdapter.listSessions(session.user.id)).filter((session) => {
		return session.expiresAt > /* @__PURE__ */ new Date();
	}).filter((session) => session.token !== ctx.context.session.session.token);
	await Promise.all(otherSessions.map((session) => ctx.context.internalAdapter.deleteSession(session.token)));
	return ctx.json({ status: true });
});
var defaultKeyHasher = async (identifier) => {
	const hash = await createHash("SHA-256").digest(new TextEncoder().encode(identifier));
	return base64Url.encode(new Uint8Array(hash), { padding: false });
};
async function processIdentifier(identifier, option) {
	if (!option || option === "plain") return identifier;
	if (option === "hashed") return defaultKeyHasher(identifier);
	if (typeof option === "object" && "hash" in option) return option.hash(identifier);
	return identifier;
}
function getStorageOption(identifier, config) {
	if (!config) return;
	if (typeof config === "object" && "default" in config) {
		if (config.overrides) {
			for (const [prefix, option] of Object.entries(config.overrides)) if (identifier.startsWith(prefix)) return option;
		}
		return config.default;
	}
	return config;
}
function getWithHooks(adapter, ctx) {
	const hooksEntries = ctx.hooks;
	async function createWithHooks(data, model, customCreateFn) {
		const context = await getCurrentAuthContext().catch(() => null);
		let actualData = data;
		for (const { source, hooks } of hooksEntries) {
			const toRun = hooks[model]?.create?.before;
			if (toRun) {
				const result = await withSpan(`db create.before ${model}`, {
					[ATTR_HOOK_TYPE]: "create.before",
					[import_src.ATTR_DB_COLLECTION_NAME]: model,
					[ATTR_CONTEXT]: source
				}, () => toRun(actualData, context));
				if (result === false) return null;
				if (typeof result === "object" && "data" in result) actualData = {
					...actualData,
					...result.data
				};
			}
		}
		let created = null;
		if (!customCreateFn || customCreateFn.executeMainFn) created = await (await getCurrentAdapter(adapter)).create({
			model,
			data: actualData,
			forceAllowId: true
		});
		if (customCreateFn?.fn) created = await customCreateFn.fn(created ?? actualData);
		for (const { source, hooks } of hooksEntries) {
			const toRun = hooks[model]?.create?.after;
			if (toRun) await queueAfterTransactionHook(async () => {
				await withSpan(`db create.after ${model}`, {
					[ATTR_HOOK_TYPE]: "create.after",
					[import_src.ATTR_DB_COLLECTION_NAME]: model,
					[ATTR_CONTEXT]: source
				}, () => toRun(created, context));
			});
		}
		return created;
	}
	async function updateWithHooks(data, where, model, customUpdateFn) {
		const context = await getCurrentAuthContext().catch(() => null);
		let actualData = data;
		for (const { source, hooks } of hooksEntries) {
			const toRun = hooks[model]?.update?.before;
			if (toRun) {
				const result = await withSpan(`db update.before ${model}`, {
					[ATTR_HOOK_TYPE]: "update.before",
					[import_src.ATTR_DB_COLLECTION_NAME]: model,
					[ATTR_CONTEXT]: source
				}, () => toRun(data, context));
				if (result === false) return null;
				if (typeof result === "object" && "data" in result) actualData = {
					...actualData,
					...result.data
				};
			}
		}
		const customUpdated = customUpdateFn ? await customUpdateFn.fn(actualData) : null;
		const updated = !customUpdateFn || customUpdateFn.executeMainFn ? await (await getCurrentAdapter(adapter)).update({
			model,
			update: actualData,
			where
		}) : customUpdated;
		for (const { source, hooks } of hooksEntries) {
			const toRun = hooks[model]?.update?.after;
			if (toRun) await queueAfterTransactionHook(async () => {
				await withSpan(`db update.after ${model}`, {
					[ATTR_HOOK_TYPE]: "update.after",
					[import_src.ATTR_DB_COLLECTION_NAME]: model,
					[ATTR_CONTEXT]: source
				}, () => toRun(updated, context));
			});
		}
		return updated;
	}
	async function updateManyWithHooks(data, where, model, customUpdateFn) {
		const context = await getCurrentAuthContext().catch(() => null);
		let actualData = data;
		for (const { source, hooks } of hooksEntries) {
			const toRun = hooks[model]?.update?.before;
			if (toRun) {
				const result = await withSpan(`db updateMany.before ${model}`, {
					[ATTR_HOOK_TYPE]: "updateMany.before",
					[import_src.ATTR_DB_COLLECTION_NAME]: model,
					[ATTR_CONTEXT]: source
				}, () => toRun(data, context));
				if (result === false) return null;
				if (typeof result === "object" && "data" in result) actualData = {
					...actualData,
					...result.data
				};
			}
		}
		const customUpdated = customUpdateFn ? await customUpdateFn.fn(actualData) : null;
		const updated = !customUpdateFn || customUpdateFn.executeMainFn ? await (await getCurrentAdapter(adapter)).updateMany({
			model,
			update: actualData,
			where
		}) : customUpdated;
		for (const { source, hooks } of hooksEntries) {
			const toRun = hooks[model]?.update?.after;
			if (toRun) await queueAfterTransactionHook(async () => {
				await withSpan(`db updateMany.after ${model}`, {
					[ATTR_HOOK_TYPE]: "updateMany.after",
					[import_src.ATTR_DB_COLLECTION_NAME]: model,
					[ATTR_CONTEXT]: source
				}, () => toRun(updated, context));
			});
		}
		return updated;
	}
	async function deleteWithHooks(where, model, customDeleteFn) {
		const context = await getCurrentAuthContext().catch(() => null);
		let entityToDelete = null;
		try {
			entityToDelete = (await (await getCurrentAdapter(adapter)).findMany({
				model,
				where,
				limit: 1
			}))[0] || null;
		} catch {}
		if (entityToDelete) for (const { source, hooks } of hooksEntries) {
			const toRun = hooks[model]?.delete?.before;
			if (toRun) {
				if (await withSpan(`db delete.before ${model}`, {
					["better_auth.hook.type"]: "delete.before",
					[import_src.ATTR_DB_COLLECTION_NAME]: model,
					["better_auth.context"]: source
				}, () => toRun(entityToDelete, context)) === false) return null;
			}
		}
		const customDeleted = customDeleteFn ? await customDeleteFn.fn(where) : null;
		const deleted = (!customDeleteFn || customDeleteFn.executeMainFn) && entityToDelete ? await (await getCurrentAdapter(adapter)).delete({
			model,
			where
		}) : customDeleted;
		if (entityToDelete) for (const { source, hooks } of hooksEntries) {
			const toRun = hooks[model]?.delete?.after;
			if (toRun) await queueAfterTransactionHook(async () => {
				await withSpan(`db delete.after ${model}`, {
					[ATTR_HOOK_TYPE]: "delete.after",
					[import_src.ATTR_DB_COLLECTION_NAME]: model,
					[ATTR_CONTEXT]: source
				}, () => toRun(entityToDelete, context));
			});
		}
		return deleted;
	}
	async function deleteManyWithHooks(where, model, customDeleteFn) {
		const context = await getCurrentAuthContext().catch(() => null);
		let entitiesToDelete = [];
		try {
			entitiesToDelete = await (await getCurrentAdapter(adapter)).findMany({
				model,
				where
			});
		} catch {}
		for (const entity of entitiesToDelete) for (const { source, hooks } of hooksEntries) {
			const toRun = hooks[model]?.delete?.before;
			if (toRun) {
				if (await withSpan(`db delete.before ${model}`, {
					["better_auth.hook.type"]: "delete.before",
					[import_src.ATTR_DB_COLLECTION_NAME]: model,
					["better_auth.context"]: source
				}, () => toRun(entity, context)) === false) return null;
			}
		}
		const customDeleted = customDeleteFn ? await customDeleteFn.fn(where) : null;
		const deleted = !customDeleteFn || customDeleteFn.executeMainFn ? await (await getCurrentAdapter(adapter)).deleteMany({
			model,
			where
		}) : customDeleted;
		for (const entity of entitiesToDelete) for (const { source, hooks } of hooksEntries) {
			const toRun = hooks[model]?.delete?.after;
			if (toRun) await queueAfterTransactionHook(async () => {
				await withSpan(`db delete.after ${model}`, {
					[ATTR_HOOK_TYPE]: "delete.after",
					[import_src.ATTR_DB_COLLECTION_NAME]: model,
					[ATTR_CONTEXT]: source
				}, () => toRun(entity, context));
			});
		}
		return deleted;
	}
	/**
	* Wraps an atomic consume operation in the plugin `delete.before` and
	* `delete.after` hook lifecycle. The caller supplies a `consumeFn` that
	* performs the actual single-row delete-and-return (typically the
	* adapter's `consumeOne`). The first concurrent caller wins, subsequent
	* racers resolve to `null` without firing `delete.after` hooks.
	*
	* `preSnapshot` lets the caller hand in a row it already fetched so
	* `delete.before` hooks don't trigger a second read. Without it, the
	* helper falls back to a best-effort `findMany` against `hookWhere`.
	* The snapshot only feeds `delete.before`; the `consumeFn` return value
	* is the race gate.
	*
	* Returning `false` from a `delete.before` hook aborts the consume and
	* the helper resolves to `null` (no `consumeFn` call, no after hooks).
	*/
	async function consumeOneWithHooks(model, hookWhere, consumeFn, preSnapshot) {
		const context = await getCurrentAuthContext().catch(() => null);
		const beforeHooks = hooksEntries.flatMap(({ source, hooks }) => {
			const fn = hooks[model]?.delete?.before;
			return fn ? [{
				source,
				fn
			}] : [];
		});
		let snapshot = preSnapshot ?? null;
		if (beforeHooks.length) {
			if (!snapshot) try {
				snapshot = (await (await getCurrentAdapter(adapter)).findMany({
					model,
					where: hookWhere,
					limit: 1
				}))[0] || null;
			} catch {}
			if (snapshot) {
				for (const { source, fn } of beforeHooks) if (await withSpan(`db delete.before ${model}`, {
					["better_auth.hook.type"]: "delete.before",
					[import_src.ATTR_DB_COLLECTION_NAME]: model,
					["better_auth.context"]: source
				}, () => fn(snapshot, context)) === false) return null;
			}
		}
		const consumed = await consumeFn();
		if (!consumed) return null;
		for (const { source, hooks } of hooksEntries) {
			const toRun = hooks[model]?.delete?.after;
			if (toRun) await queueAfterTransactionHook(async () => {
				await withSpan(`db delete.after ${model}`, {
					[ATTR_HOOK_TYPE]: "delete.after",
					[import_src.ATTR_DB_COLLECTION_NAME]: model,
					[ATTR_CONTEXT]: source
				}, () => toRun(consumed, context));
			});
		}
		return consumed;
	}
	return {
		createWithHooks,
		updateWithHooks,
		updateManyWithHooks,
		deleteWithHooks,
		deleteManyWithHooks,
		consumeOneWithHooks
	};
}
function getTTLSeconds(expiresAt, now = Date.now()) {
	const expiresMs = typeof expiresAt === "number" ? expiresAt : expiresAt.getTime();
	return Math.max(Math.floor((expiresMs - now) / 1e3), 0);
}
var createInternalAdapter = (adapter, ctx) => {
	const logger = ctx.logger;
	const options = ctx.options;
	const secondaryStorage = options.secondaryStorage;
	const databaseStoresSessions = !secondaryStorage || options.session?.storeSessionInDatabase === true;
	const preservesDatabaseSessions = secondaryStorage !== void 0 && options.session?.preserveSessionInDatabase === true;
	const verificationConsumeLocks = /* @__PURE__ */ new Map();
	let warnedNonAtomicConsume = false;
	const sessionExpiration = options.session?.expiresIn || 604800;
	const { createWithHooks, updateWithHooks, updateManyWithHooks, deleteWithHooks, deleteManyWithHooks, consumeOneWithHooks } = getWithHooks(adapter, ctx);
	async function refreshUserSessions(user) {
		if (!secondaryStorage) return;
		const listRaw = await secondaryStorage.get(`active-sessions-${user.id}`);
		if (!listRaw) return;
		const now = Date.now();
		const validSessions = (safeJSONParse(listRaw) || []).filter((s) => s.expiresAt > now);
		await Promise.all(validSessions.map(async ({ token }) => {
			const cached = await secondaryStorage.get(token);
			if (!cached) return;
			const parsed = safeJSONParse(cached);
			if (!parsed) return;
			const sessionTTL = getTTLSeconds(parsed.session.expiresAt, now);
			await secondaryStorage.set(token, JSON.stringify({
				session: parsed.session,
				user
			}), Math.floor(sessionTTL));
		}));
	}
	async function withVerificationConsumeLock(key, fn) {
		const previous = verificationConsumeLocks.get(key) ?? Promise.resolve();
		let release;
		const current = new Promise((resolve) => {
			release = resolve;
		});
		const next = previous.catch(() => {}).then(() => current);
		verificationConsumeLocks.set(key, next);
		await previous.catch(() => {});
		try {
			return await fn();
		} finally {
			release();
			if (verificationConsumeLocks.get(key) === next) verificationConsumeLocks.delete(key);
		}
	}
	const deleteSecondaryStorageSessions = async (userId) => {
		if (!secondaryStorage) return;
		const activeSession = await secondaryStorage.get(`active-sessions-${userId}`);
		const sessions = activeSession ? safeJSONParse(activeSession) : [];
		if (!sessions) return;
		for (const session of sessions) await secondaryStorage.delete(session.token);
		await secondaryStorage.delete(`active-sessions-${userId}`);
	};
	const deleteDatabaseSessions = async (userId) => {
		await deleteManyWithHooks([{
			field: "userId",
			value: userId
		}], "session", void 0);
	};
	return {
		createOAuthUser: async (user, account) => {
			return runWithTransaction(adapter, async () => {
				const createdUser = await createWithHooks({
					createdAt: /* @__PURE__ */ new Date(),
					updatedAt: /* @__PURE__ */ new Date(),
					...user,
					email: user.email?.toLowerCase()
				}, "user", void 0);
				return {
					user: createdUser,
					account: await createWithHooks({
						...account,
						userId: createdUser.id,
						createdAt: /* @__PURE__ */ new Date(),
						updatedAt: /* @__PURE__ */ new Date()
					}, "account", void 0)
				};
			});
		},
		createUser: async (user) => {
			return await createWithHooks({
				createdAt: /* @__PURE__ */ new Date(),
				updatedAt: /* @__PURE__ */ new Date(),
				...user,
				email: user.email?.toLowerCase()
			}, "user", void 0);
		},
		createAccount: async (account) => {
			return await createWithHooks({
				createdAt: /* @__PURE__ */ new Date(),
				updatedAt: /* @__PURE__ */ new Date(),
				...account
			}, "account", void 0);
		},
		listSessions: async (userId, options) => {
			if (secondaryStorage) {
				const currentList = await secondaryStorage.get(`active-sessions-${userId}`);
				if (!currentList) return [];
				const list = safeJSONParse(currentList) || [];
				const now = Date.now();
				const seenTokens = /* @__PURE__ */ new Set();
				const sessions = [];
				for (const { token, expiresAt } of list) {
					if (expiresAt <= now || seenTokens.has(token)) continue;
					seenTokens.add(token);
					const data = await secondaryStorage.get(token);
					if (!data) continue;
					try {
						const parsed = typeof data === "string" ? JSON.parse(data) : data;
						if (!parsed?.session) continue;
						sessions.push(parseSessionOutput(ctx.options, {
							...parsed.session,
							expiresAt: new Date(parsed.session.expiresAt)
						}));
					} catch {
						continue;
					}
				}
				return sessions;
			}
			return await (await getCurrentAdapter(adapter)).findMany({
				model: "session",
				where: [{
					field: "userId",
					value: userId
				}, ...options?.onlyActiveSessions ? [{
					field: "expiresAt",
					value: /* @__PURE__ */ new Date(),
					operator: "gt"
				}] : []]
			});
		},
		listUsers: async (limit, offset, sortBy, where) => {
			return await (await getCurrentAdapter(adapter)).findMany({
				model: "user",
				limit,
				offset,
				sortBy,
				where
			});
		},
		countTotalUsers: async (where) => {
			const total = await (await getCurrentAdapter(adapter)).count({
				model: "user",
				where
			});
			if (typeof total === "string") return parseInt(total);
			return total;
		},
		deleteUser: async (userId) => {
			await deleteSecondaryStorageSessions(userId);
			if (databaseStoresSessions) await deleteDatabaseSessions(userId);
			await deleteManyWithHooks([{
				field: "userId",
				value: userId
			}], "account", void 0);
			await deleteWithHooks([{
				field: "id",
				value: userId
			}], "user", void 0);
		},
		createSession: async (userId, dontRememberMe, override, overrideAll) => {
			const headers = await (async () => {
				const ctx = await getCurrentAuthContext().catch(() => null);
				return ctx?.headers || ctx?.request?.headers;
			})();
			const storeInDb = options.session?.storeSessionInDatabase;
			const { id: _, ...rest } = override || {};
			let sessionId;
			if (secondaryStorage && !storeInDb) {
				const generatedId = ctx.generateId({ model: "session" });
				sessionId = generatedId !== false ? generatedId : generateId();
			}
			const defaultAdditionalFields = getSessionDefaultFields(options);
			const data = {
				...sessionId ? { id: sessionId } : {},
				ipAddress: headers ? getIp(headers, options) || "" : "",
				userAgent: headers?.get("user-agent") || "",
				...rest,
				/**
				* If the user doesn't want to be remembered
				* set the session to expire in 1 day.
				* The cookie will be set to expire at the end of the session
				*/
				expiresAt: dontRememberMe ? getDate(86400, "sec") : getDate(sessionExpiration, "sec"),
				userId,
				token: generateId(32),
				createdAt: /* @__PURE__ */ new Date(),
				updatedAt: /* @__PURE__ */ new Date(),
				...defaultAdditionalFields,
				...overrideAll ? rest : {}
			};
			return await createWithHooks(data, "session", secondaryStorage ? {
				fn: async (sessionData) => {
					/**
					* store the session token for the user
					* so we can retrieve it later for listing sessions
					*/
					const currentList = await secondaryStorage.get(`active-sessions-${userId}`);
					let list = [];
					const now = Date.now();
					if (currentList) {
						list = safeJSONParse(currentList) || [];
						list = list.filter((session) => session.expiresAt > now && session.token !== data.token);
					}
					const sorted = [...list, {
						token: data.token,
						expiresAt: data.expiresAt.getTime()
					}].sort((a, b) => a.expiresAt - b.expiresAt);
					const furthestSessionTTL = getTTLSeconds(sorted.at(-1)?.expiresAt ?? data.expiresAt.getTime(), now);
					if (furthestSessionTTL > 0) await secondaryStorage.set(`active-sessions-${userId}`, JSON.stringify(sorted), furthestSessionTTL);
					const user = await (await getCurrentAdapter(adapter)).findOne({
						model: "user",
						where: [{
							field: "id",
							value: userId
						}]
					});
					const sessionTTL = getTTLSeconds(data.expiresAt, now);
					if (sessionTTL > 0) await secondaryStorage.set(data.token, JSON.stringify({
						session: sessionData,
						user
					}), sessionTTL);
					return sessionData;
				},
				executeMainFn: storeInDb
			} : void 0);
		},
		findSession: async (token) => {
			if (secondaryStorage) {
				const sessionStringified = await secondaryStorage.get(token);
				if (!sessionStringified && (!options.session?.storeSessionInDatabase || ctx.options.session?.preserveSessionInDatabase)) return null;
				if (sessionStringified) {
					const s = safeJSONParse(sessionStringified);
					if (!s) return null;
					return {
						session: parseSessionOutput(ctx.options, {
							...s.session,
							expiresAt: new Date(s.session.expiresAt),
							createdAt: new Date(s.session.createdAt),
							updatedAt: new Date(s.session.updatedAt)
						}),
						user: parseUserOutput(ctx.options, {
							...s.user,
							createdAt: new Date(s.user.createdAt),
							updatedAt: new Date(s.user.updatedAt)
						})
					};
				}
			}
			const result = await (await getCurrentAdapter(adapter)).findOne({
				model: "session",
				where: [{
					value: token,
					field: "token"
				}],
				join: { user: true }
			});
			if (!result) return null;
			const { user, ...session } = result;
			if (!user) return null;
			return {
				session: parseSessionOutput(ctx.options, session),
				user: parseUserOutput(ctx.options, user)
			};
		},
		findSessions: async (sessionTokens, options) => {
			if (secondaryStorage) {
				const sessions = [];
				for (const sessionToken of sessionTokens) {
					const sessionStringified = await secondaryStorage.get(sessionToken);
					if (sessionStringified) try {
						const s = typeof sessionStringified === "string" ? JSON.parse(sessionStringified) : sessionStringified;
						if (!s) continue;
						const expiresAt = new Date(s.session.expiresAt);
						if (options?.onlyActiveSessions && expiresAt <= /* @__PURE__ */ new Date()) continue;
						const session = {
							session: {
								...s.session,
								expiresAt: new Date(s.session.expiresAt)
							},
							user: {
								...s.user,
								createdAt: new Date(s.user.createdAt),
								updatedAt: new Date(s.user.updatedAt)
							}
						};
						sessions.push(session);
					} catch {
						continue;
					}
				}
				return sessions;
			}
			const sessions = await (await getCurrentAdapter(adapter)).findMany({
				model: "session",
				where: [{
					field: "token",
					value: sessionTokens,
					operator: "in"
				}, ...options?.onlyActiveSessions ? [{
					field: "expiresAt",
					value: /* @__PURE__ */ new Date(),
					operator: "gt"
				}] : []],
				join: { user: true }
			});
			if (!sessions.length) return [];
			if (sessions.some((session) => !session.user)) return [];
			return sessions.map((_session) => {
				const { user, ...session } = _session;
				return {
					session,
					user
				};
			});
		},
		updateSession: async (sessionToken, session) => {
			return await updateWithHooks(session, [{
				field: "token",
				value: sessionToken
			}], "session", secondaryStorage ? {
				async fn(data) {
					const currentSession = await secondaryStorage.get(sessionToken);
					if (!currentSession) return null;
					const parsedSession = safeJSONParse(currentSession);
					if (!parsedSession) return null;
					const mergedSession = {
						...parsedSession.session,
						...data,
						expiresAt: new Date(data.expiresAt ?? parsedSession.session.expiresAt),
						createdAt: new Date(parsedSession.session.createdAt),
						updatedAt: new Date(data.updatedAt ?? parsedSession.session.updatedAt)
					};
					const updatedSession = parseSessionOutput(ctx.options, mergedSession);
					const now = Date.now();
					const expiresMs = new Date(updatedSession.expiresAt).getTime();
					const sessionTTL = getTTLSeconds(expiresMs, now);
					if (sessionTTL > 0) {
						await secondaryStorage.set(sessionToken, JSON.stringify({
							session: updatedSession,
							user: parsedSession.user
						}), sessionTTL);
						const listKey = `active-sessions-${updatedSession.userId}`;
						const listRaw = await secondaryStorage.get(listKey);
						const sorted = (listRaw ? safeJSONParse(listRaw) || [] : []).filter((s) => s.token !== sessionToken && s.expiresAt > now).concat([{
							token: sessionToken,
							expiresAt: expiresMs
						}]).sort((a, b) => a.expiresAt - b.expiresAt);
						const furthestSessionExp = sorted.at(-1)?.expiresAt;
						if (furthestSessionExp && furthestSessionExp > now) await secondaryStorage.set(listKey, JSON.stringify(sorted), getTTLSeconds(furthestSessionExp, now));
						else await secondaryStorage.delete(listKey);
					}
					return updatedSession;
				},
				executeMainFn: options.session?.storeSessionInDatabase
			} : void 0);
		},
		deleteSession: async (token) => {
			if (secondaryStorage) {
				const data = await secondaryStorage.get(token);
				if (data) {
					const { session } = safeJSONParse(data) ?? {};
					if (!session) {
						logger.error("Session not found in secondary storage");
						return;
					}
					const userId = session.userId;
					const currentList = await secondaryStorage.get(`active-sessions-${userId}`);
					if (currentList) {
						const list = safeJSONParse(currentList) || [];
						const now = Date.now();
						const filtered = list.filter((session) => session.expiresAt > now && session.token !== token);
						const furthestSessionExp = filtered.sort((a, b) => a.expiresAt - b.expiresAt).at(-1)?.expiresAt;
						if (filtered.length > 0 && furthestSessionExp && furthestSessionExp > Date.now()) await secondaryStorage.set(`active-sessions-${userId}`, JSON.stringify(filtered), getTTLSeconds(furthestSessionExp, now));
						else await secondaryStorage.delete(`active-sessions-${userId}`);
					} else logger.error("Active sessions list not found in secondary storage");
				}
				await secondaryStorage.delete(token);
			}
			if (databaseStoresSessions && !preservesDatabaseSessions) await deleteWithHooks([{
				field: "token",
				value: token
			}], "session", void 0);
		},
		deleteAccounts: async (userId) => {
			await deleteManyWithHooks([{
				field: "userId",
				value: userId
			}], "account", void 0);
		},
		/**
		* Delete an account by its primary key.
		*
		* @param id - The account row's primary key (the `id` column, not the `accountId` column).
		*/
		deleteAccount: async (id) => {
			await deleteWithHooks([{
				field: "id",
				value: id
			}], "account", void 0);
		},
		deleteUserSessions: async (userId) => {
			await deleteSecondaryStorageSessions(userId);
			if (databaseStoresSessions && !preservesDatabaseSessions) await deleteDatabaseSessions(userId);
		},
		deleteSessions: async (sessionTokens) => {
			if (secondaryStorage) await Promise.all(sessionTokens.map((token) => secondaryStorage.delete(token)));
			if (databaseStoresSessions && !preservesDatabaseSessions) await deleteManyWithHooks([{
				field: "token",
				value: sessionTokens,
				operator: "in"
			}], "session", void 0);
		},
		findOAuthUser: async (email, accountId, providerId) => {
			const account = await (await getCurrentAdapter(adapter)).findOne({
				model: "account",
				where: [{
					value: accountId,
					field: "accountId"
				}, {
					value: providerId,
					field: "providerId"
				}],
				join: { user: true }
			});
			if (account) if (account.user) return {
				user: account.user,
				linkedAccount: account,
				accounts: [account]
			};
			else {
				const user = await (await getCurrentAdapter(adapter)).findOne({
					model: "user",
					where: [{
						value: email.toLowerCase(),
						field: "email"
					}]
				});
				if (user) return {
					user,
					linkedAccount: account,
					accounts: [account]
				};
				return null;
			}
			else {
				const user = await (await getCurrentAdapter(adapter)).findOne({
					model: "user",
					where: [{
						value: email.toLowerCase(),
						field: "email"
					}]
				});
				if (user) return {
					user,
					linkedAccount: null,
					accounts: await (await getCurrentAdapter(adapter)).findMany({
						model: "account",
						where: [{
							value: user.id,
							field: "userId"
						}]
					}) || []
				};
				else return null;
			}
		},
		findUserByEmail: async (email, options) => {
			const result = await (await getCurrentAdapter(adapter)).findOne({
				model: "user",
				where: [{
					value: email.toLowerCase(),
					field: "email"
				}],
				join: { ...options?.includeAccounts ? { account: true } : {} }
			});
			if (!result) return null;
			const { account: accounts, ...user } = result;
			return {
				user,
				accounts: accounts ?? []
			};
		},
		findUserById: async (userId) => {
			if (!userId) return null;
			return await (await getCurrentAdapter(adapter)).findOne({
				model: "user",
				where: [{
					field: "id",
					value: userId
				}]
			});
		},
		linkAccount: async (account) => {
			return await createWithHooks({
				createdAt: /* @__PURE__ */ new Date(),
				updatedAt: /* @__PURE__ */ new Date(),
				...account
			}, "account", void 0);
		},
		updateUser: async (userId, data) => {
			const user = await updateWithHooks({
				...data,
				...data.email ? { email: data.email.toLowerCase() } : {}
			}, [{
				field: "id",
				value: userId
			}], "user", void 0);
			await refreshUserSessions(user);
			return user;
		},
		updateUserByEmail: async (email, data) => {
			const user = await updateWithHooks({
				...data,
				...data.email ? { email: data.email.toLowerCase() } : {}
			}, [{
				field: "email",
				value: email.toLowerCase()
			}], "user", void 0);
			await refreshUserSessions(user);
			return user;
		},
		updatePassword: async (userId, password) => {
			await updateManyWithHooks({ password }, [{
				field: "userId",
				value: userId
			}, {
				field: "providerId",
				value: "credential"
			}], "account", void 0);
		},
		findAccounts: async (userId) => {
			return await (await getCurrentAdapter(adapter)).findMany({
				model: "account",
				where: [{
					field: "userId",
					value: userId
				}]
			});
		},
		findAccountByProviderId: async (accountId, providerId) => {
			return await (await getCurrentAdapter(adapter)).findOne({
				model: "account",
				where: [{
					field: "accountId",
					value: accountId
				}, {
					field: "providerId",
					value: providerId
				}]
			});
		},
		findAccountByUserId: async (userId) => {
			return await (await getCurrentAdapter(adapter)).findMany({
				model: "account",
				where: [{
					field: "userId",
					value: userId
				}]
			});
		},
		updateAccount: async (id, data) => {
			return await updateWithHooks(data, [{
				field: "id",
				value: id
			}], "account", void 0);
		},
		createVerificationValue: async (data) => {
			const storageOption = getStorageOption(data.identifier, options.verification?.storeIdentifier);
			const storedIdentifier = await processIdentifier(data.identifier, storageOption);
			return await createWithHooks({
				createdAt: /* @__PURE__ */ new Date(),
				updatedAt: /* @__PURE__ */ new Date(),
				...data,
				identifier: storedIdentifier
			}, "verification", secondaryStorage ? {
				async fn(verificationData) {
					const ttl = getTTLSeconds(verificationData.expiresAt);
					if (ttl > 0) await secondaryStorage.set(`verification:${storedIdentifier}`, JSON.stringify(verificationData), ttl);
					return verificationData;
				},
				executeMainFn: options.verification?.storeInDatabase
			} : void 0);
		},
		findVerificationValue: async (identifier) => {
			const storageOption = getStorageOption(identifier, options.verification?.storeIdentifier);
			const storedIdentifier = await processIdentifier(identifier, storageOption);
			if (secondaryStorage) {
				const cached = await secondaryStorage.get(`verification:${storedIdentifier}`);
				if (cached) {
					const parsed = safeJSONParse(cached);
					if (parsed) return parsed;
				}
				if (storageOption && storageOption !== "plain") {
					const plainCached = await secondaryStorage.get(`verification:${identifier}`);
					if (plainCached) {
						const parsed = safeJSONParse(plainCached);
						if (parsed) return parsed;
					}
				}
				if (!options.verification?.storeInDatabase) return null;
			}
			const currentAdapter = await getCurrentAdapter(adapter);
			async function findByIdentifier(id) {
				return currentAdapter.findMany({
					model: "verification",
					where: [{
						field: "identifier",
						value: id
					}],
					sortBy: {
						field: "createdAt",
						direction: "desc"
					},
					limit: 1
				});
			}
			let verification = await findByIdentifier(storedIdentifier);
			if (!verification.length && storageOption && storageOption !== "plain") verification = await findByIdentifier(identifier);
			if (!options.verification?.disableCleanup) await deleteManyWithHooks([{
				field: "expiresAt",
				value: /* @__PURE__ */ new Date(),
				operator: "lt"
			}], "verification", void 0);
			return verification[0] || null;
		},
		deleteVerificationByIdentifier: async (identifier) => {
			const storedIdentifier = await processIdentifier(identifier, getStorageOption(identifier, options.verification?.storeIdentifier));
			if (secondaryStorage) await secondaryStorage.delete(`verification:${storedIdentifier}`);
			if (!secondaryStorage || options.verification?.storeInDatabase) await deleteWithHooks([{
				field: "identifier",
				value: storedIdentifier
			}], "verification", void 0);
		},
		/**
		* Atomically consume a single-use verification row by `identifier` and
		* return it. The first concurrent caller receives the latest row for the
		* identifier; every other caller racing against it receives `null`.
		*
		* Race-safe replacement for the `findVerificationValue` then
		* `deleteVerificationByIdentifier` pair. Callers MUST gate any state
		* change (issue session, mint token, change password) on a non-null
		* return value, because consuming one row invalidates the whole
		* identifier and stale rows cannot be replayed.
		*
		* Rows past their `expiresAt` are treated as already invalid: the row
		* is still deleted (so it cannot be replayed later) but `null` is
		* returned. Callers do not need their own `expiresAt` gate.
		*
		* The secondary-storage-only path (`storeInDatabase: false`) is atomic
		* only when the configured storage implements `getAndDelete`; otherwise
		* it falls back to an in-process lock around `get` then `delete` and
		* warns once, since that fallback cannot coordinate across processes.
		*
		* FIXME(consume-atomic): make `SecondaryStorage.getAndDelete` required
		* in the next breaking release, or require database-backed verification
		* storage for security-sensitive consume paths, so the non-atomic
		* fallback can be removed entirely.
		*/
		consumeVerificationValue: async (identifier) => {
			const storageOption = getStorageOption(identifier, options.verification?.storeIdentifier);
			const storedIdentifier = await processIdentifier(identifier, storageOption);
			const identifiersToTry = storageOption && storageOption !== "plain" ? [storedIdentifier, identifier] : [storedIdentifier];
			const hydrateCachedVerification = (raw) => {
				if (!raw) return null;
				const candidate = typeof raw === "string" ? safeJSONParse(raw) : typeof raw === "object" ? raw : null;
				if (!candidate) return null;
				const expiresAt = new Date(candidate.expiresAt);
				if (!Number.isFinite(expiresAt.getTime())) return null;
				return {
					...candidate,
					expiresAt
				};
			};
			let consumed = null;
			if (secondaryStorage && !options.verification?.storeInDatabase) {
				const consumeCacheKey = async (key) => {
					if (secondaryStorage.getAndDelete) return hydrateCachedVerification(await secondaryStorage.getAndDelete(key));
					if (!warnedNonAtomicConsume) {
						warnedNonAtomicConsume = true;
						logger.warn("Secondary storage does not implement `getAndDelete`, so single-use verification values cannot be consumed atomically across processes. Implement `getAndDelete` or use database-backed verification storage to guarantee single use.");
					}
					return withVerificationConsumeLock(key, async () => {
						const parsed = hydrateCachedVerification(await secondaryStorage.get(key));
						if (!parsed) return null;
						await secondaryStorage.delete(key);
						return parsed;
					});
				};
				for (const stored of identifiersToTry) {
					const cached = await consumeCacheKey(`verification:${stored}`);
					if (!cached) continue;
					await Promise.all(identifiersToTry.filter((candidate) => candidate !== stored).map((candidate) => secondaryStorage.delete(`verification:${candidate}`)));
					consumed = cached;
					break;
				}
			} else {
				const consumeByIdentifier = async (id) => withVerificationConsumeLock(`verification:${id}`, () => runWithTransaction(adapter, async () => {
					const txAdapter = await getCurrentAdapter(adapter);
					const where = [{
						field: "identifier",
						value: id
					}];
					const latest = (await txAdapter.findMany({
						model: "verification",
						where,
						sortBy: {
							field: "createdAt",
							direction: "desc"
						},
						limit: 1
					}))[0] ?? null;
					if (!latest) return null;
					return consumeOneWithHooks("verification", [{
						field: "id",
						value: latest.id
					}], async () => {
						const row = await txAdapter.consumeOne({
							model: "verification",
							where: [{
								field: "id",
								value: latest.id
							}]
						});
						if (!row) return null;
						await txAdapter.deleteMany({
							model: "verification",
							where
						});
						return row;
					}, latest);
				}));
				for (const stored of identifiersToTry) {
					consumed = await consumeByIdentifier(stored);
					if (consumed) break;
				}
				if (consumed && secondaryStorage) await Promise.all(identifiersToTry.map((stored) => secondaryStorage.delete(`verification:${stored}`)));
			}
			if (!consumed || consumed.expiresAt < /* @__PURE__ */ new Date()) return null;
			return consumed;
		},
		/**
		* First-writer-wins create keyed by a deterministic primary key derived
		* from `identifier`. Returns `true` when this caller created the row and
		* `false` when a row for the same identifier already existed.
		*
		* The dual of `consumeVerificationValue`: where consume races to delete a
		* marker exactly once, reserve races to create a marker exactly once. Use
		* it for replay tombstones (a SAML assertion id, a JWT `jti`) where the
		* first caller wins and every later caller must observe that the marker is
		* already taken.
		*
		* The `verification.identifier` column is non-unique, so uniqueness comes
		* from a deterministic primary key (`SHA-256` of `reserve:<identifier>`).
		* The database path is atomic: the primary key turns the INSERT into the
		* first-writer-wins gate, and a duplicate is detected portably by
		* re-reading the row rather than matching adapter-specific errors. The
		* secondary-storage-only path has no primary key to enforce uniqueness, so
		* it is best-effort under concurrency.
		*
		* The atomic guarantee requires the configured adapter to reject a
		* duplicate primary key on insert, which every real database enforces. The
		* in-memory adapter does not enforce primary-key uniqueness, so reservation
		* is best-effort there (it is intended for development and tests).
		*/
		reserveVerificationValue: async (data) => {
			const reservationId = base64Url.encode(new Uint8Array(await createHash("SHA-256").digest(new TextEncoder().encode("reserve:" + data.identifier))), { padding: false });
			const storageOption = getStorageOption(data.identifier, options.verification?.storeIdentifier);
			const storedIdentifier = await processIdentifier(data.identifier, storageOption);
			if (secondaryStorage && !options.verification?.storeInDatabase) {
				const cacheKey = `verification:${storedIdentifier}`;
				if (await secondaryStorage.get(cacheKey)) return false;
				await secondaryStorage.set(cacheKey, JSON.stringify({
					id: reservationId,
					identifier: storedIdentifier,
					value: data.value,
					expiresAt: data.expiresAt
				}), getTTLSeconds(data.expiresAt));
				return true;
			}
			try {
				await adapter.create({
					model: "verification",
					data: {
						id: reservationId,
						identifier: storedIdentifier,
						value: data.value,
						expiresAt: data.expiresAt,
						createdAt: /* @__PURE__ */ new Date(),
						updatedAt: /* @__PURE__ */ new Date()
					},
					forceAllowId: true
				});
			} catch (error) {
				if (await adapter.findOne({
					model: "verification",
					where: [{
						field: "id",
						value: reservationId
					}]
				})) return false;
				throw error;
			}
			if (secondaryStorage) {
				const ttl = getTTLSeconds(data.expiresAt);
				if (ttl > 0) await secondaryStorage.set(`verification:${storedIdentifier}`, JSON.stringify({
					id: reservationId,
					identifier: storedIdentifier,
					value: data.value,
					expiresAt: data.expiresAt
				}), ttl);
			}
			return true;
		},
		updateVerificationByIdentifier: async (identifier, data) => {
			const storedIdentifier = await processIdentifier(identifier, getStorageOption(identifier, options.verification?.storeIdentifier));
			if (secondaryStorage) {
				const cached = await secondaryStorage.get(`verification:${storedIdentifier}`);
				if (cached) {
					const parsed = safeJSONParse(cached);
					if (parsed) {
						const updated = {
							...parsed,
							...data
						};
						const expiresAt = updated.expiresAt ?? parsed.expiresAt;
						const ttl = getTTLSeconds(expiresAt instanceof Date ? expiresAt : new Date(expiresAt));
						if (ttl > 0) await secondaryStorage.set(`verification:${storedIdentifier}`, JSON.stringify(updated), ttl);
						if (!options.verification?.storeInDatabase) return updated;
					}
				}
			}
			if (!secondaryStorage || options.verification?.storeInDatabase) return await updateWithHooks(data, [{
				field: "identifier",
				value: storedIdentifier
			}], "verification", void 0);
			return data;
		},
		refreshUserSessions
	};
};
async function runPluginInit(context) {
	let options = context.options;
	const plugins = options.plugins || [];
	const pluginTrustedOrigins = [];
	const dbHooks = [];
	for (const plugin of plugins) if (plugin.init) {
		const initPromise = plugin.init(context);
		let result;
		if (isPromise(initPromise)) result = await initPromise;
		else result = initPromise;
		if (typeof result === "object") {
			if (result.options) {
				const { databaseHooks, trustedOrigins, ...restOpts } = result.options;
				if (databaseHooks) dbHooks.push({
					source: `plugin:${plugin.id}`,
					hooks: databaseHooks
				});
				if (trustedOrigins) pluginTrustedOrigins.push(trustedOrigins);
				options = defu(options, restOpts);
			}
			if (result.context) Object.assign(context, result.context);
		}
	}
	if (pluginTrustedOrigins.length > 0) {
		const allSources = [...options.trustedOrigins ? [options.trustedOrigins] : [], ...pluginTrustedOrigins];
		const staticOrigins = allSources.filter(Array.isArray).flat();
		const dynamicOrigins = allSources.filter((s) => typeof s === "function");
		if (dynamicOrigins.length > 0) options.trustedOrigins = async (request) => {
			const resolved = await Promise.all(dynamicOrigins.map((fn) => fn(request)));
			return [...staticOrigins, ...resolved.flat()].filter((v) => typeof v === "string" && v !== "");
		};
		else options.trustedOrigins = staticOrigins;
	}
	if (options.databaseHooks) dbHooks.push({
		source: "user",
		hooks: options.databaseHooks
	});
	context.internalAdapter = createInternalAdapter(context.adapter, {
		options,
		logger: context.logger,
		hooks: dbHooks,
		generateId: context.generateId
	});
	context.options = options;
}
function getInternalPlugins(options) {
	const plugins = [];
	if (options.advanced?.crossSubDomainCookies?.enabled) {}
	return plugins;
}
async function getTrustedOrigins(options, request) {
	const trustedOrigins = [];
	if (isDynamicBaseURLConfig(options.baseURL)) {
		const allowedHosts = options.baseURL.allowedHosts;
		const proto = options.baseURL.protocol;
		for (const host of allowedHosts) if (!host.includes("://")) {
			if (!proto || proto === "https" || proto === "auto") trustedOrigins.push(`https://${host}`);
			if (proto === "http" || proto === "auto" || isLoopbackHost(host)) trustedOrigins.push(`http://${host}`);
		} else trustedOrigins.push(host);
		if (options.baseURL.fallback) try {
			trustedOrigins.push(new URL(options.baseURL.fallback).origin);
		} catch {}
	} else {
		const baseURL = getBaseURL(typeof options.baseURL === "string" ? options.baseURL : void 0, options.basePath, request);
		if (baseURL) trustedOrigins.push(new URL(baseURL).origin);
	}
	if (options.trustedOrigins) {
		if (Array.isArray(options.trustedOrigins)) trustedOrigins.push(...options.trustedOrigins);
		if (typeof options.trustedOrigins === "function") {
			const validOrigins = await options.trustedOrigins(request);
			trustedOrigins.push(...validOrigins);
		}
	}
	const envTrustedOrigins = env.BETTER_AUTH_TRUSTED_ORIGINS;
	if (envTrustedOrigins) trustedOrigins.push(...envTrustedOrigins.split(","));
	return trustedOrigins.filter((v) => Boolean(v));
}
/**
* Picks a `Request`-like or `Headers` value from a direct `auth.api` call.
* Headers are only accepted when they carry a host: without one, host
* resolution would fall back to `null` and the caller should use `fallback`
* or pass a `Request` instead.
*/
function pickSource(input) {
	if (isRequestLike(input?.request)) return input.request;
	if (!input?.headers) return void 0;
	const headers = input.headers instanceof Headers ? input.headers : new Headers(input.headers);
	if (!headers.has("host") && !headers.has("x-forwarded-host")) return;
	return headers;
}
/**
* Returns the effective `trustedProxyHeaders` value for dynamic `baseURL`
* resolution. When the user hasn't set `advanced.trustedProxyHeaders`,
* proxy headers (`x-forwarded-host` / `x-forwarded-proto`) are trusted by
* default so deployments behind a reverse proxy work without extra config.
*/
function resolveDynamicTrustedProxyHeaders(options) {
	return options.advanced?.trustedProxyHeaders ?? true;
}
/**
* Per-request clone with `baseURL`, `trustedOrigins`, `trustedProviders`
* and cookies rehydrated for the resolved host. Throws `BetterAuthError`
* when the URL cannot be resolved; callers on the direct-API path convert
* this to `APIError`.
*/
async function resolveRequestContext(ctx, source, trustedProxyHeaders) {
	const dynamicBaseURLConfig = ctx.options.baseURL;
	const baseURL = resolveBaseURL(dynamicBaseURLConfig, ctx.options.basePath || "/api/auth", source, void 0, trustedProxyHeaders);
	if (!baseURL) throw new BetterAuthError("Could not resolve base URL from request. Check your allowedHosts config.");
	const resolved = Object.create(Object.getPrototypeOf(ctx), Object.getOwnPropertyDescriptors(ctx));
	resolved.baseURL = baseURL;
	resolved.options = {
		...ctx.options,
		baseURL: getOrigin(baseURL) || void 0
	};
	const trustedOriginOptions = {
		...resolved.options,
		baseURL: dynamicBaseURLConfig
	};
	const needsRequest = typeof ctx.options.trustedOrigins === "function" || typeof ctx.options.account?.accountLinking?.trustedProviders === "function";
	let callbackRequest;
	if (needsRequest) if (isRequestLike(source)) callbackRequest = source;
	else if (source) callbackRequest = new Request(baseURL, { headers: source });
	else callbackRequest = void 0;
	else callbackRequest = void 0;
	resolved.trustedOrigins = await getTrustedOrigins(trustedOriginOptions, callbackRequest);
	resolved.trustedProviders = await getTrustedProviders(resolved.options, callbackRequest);
	if (ctx.options.advanced?.crossSubDomainCookies?.enabled) {
		resolved.authCookies = getCookies(resolved.options);
		resolved.createAuthCookie = createCookieGetter(resolved.options);
	}
	return resolved;
}
async function getAwaitableValue(arr, item) {
	if (!arr) return void 0;
	for (const val of arr) {
		const value = typeof val === "function" ? await val() : val;
		if (value[item.field ?? "id"] === item.value) return value;
	}
}
async function getTrustedProviders(options, request) {
	const trustedProviders = options.account?.accountLinking?.trustedProviders;
	if (!trustedProviders) return [];
	if (Array.isArray(trustedProviders)) return trustedProviders.filter((v) => Boolean(v));
	return (await trustedProviders(request) ?? []).filter((v) => Boolean(v));
}
/**
* Check if a string looks like encrypted data
*/
function isLikelyEncrypted(token) {
	if (token.startsWith("$ba$")) return true;
	return token.length % 2 === 0 && /^[0-9a-f]+$/i.test(token);
}
function decryptOAuthToken(token, ctx) {
	if (!token) return token;
	if (ctx.options.account?.encryptOAuthTokens) {
		if (!isLikelyEncrypted(token)) return token;
		return symmetricDecrypt({
			key: ctx.secretConfig,
			data: token
		});
	}
	return token;
}
function setTokenUtil(token, ctx) {
	if (ctx.options.account?.encryptOAuthTokens && token) return symmetricEncrypt({
		key: ctx.secretConfig,
		data: token
	});
	return token;
}
function safeCloneRequest(request) {
	if (!request) return;
	try {
		return request.clone();
	} catch {
		return new Request(request.url, {
			cache: request.cache,
			credentials: request.credentials,
			headers: request.headers,
			integrity: request.integrity,
			keepalive: request.keepalive,
			method: request.method,
			mode: request.mode,
			redirect: request.redirect,
			referrer: request.referrer,
			referrerPolicy: request.referrerPolicy,
			signal: request.signal
		});
	}
}
async function createEmailVerificationToken(secret, email, updateTo, expiresIn = 3600, extraPayload) {
	return await signJWT({
		email: email.toLowerCase(),
		updateTo: updateTo?.toLowerCase(),
		...extraPayload
	}, secret, expiresIn);
}
/**
* A function to send a verification email to the user
*/
async function sendVerificationEmailFn(ctx, user) {
	if (!ctx.context.options.emailVerification?.sendVerificationEmail) {
		ctx.context.logger.error("Verification email isn't enabled.");
		throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.VERIFICATION_EMAIL_NOT_ENABLED);
	}
	const token = await createEmailVerificationToken(ctx.context.secret, user.email, void 0, ctx.context.options.emailVerification?.expiresIn);
	const callbackURL = ctx.body.callbackURL ? encodeURIComponent(ctx.body.callbackURL) : encodeURIComponent("/");
	const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
	await ctx.context.options.emailVerification.sendVerificationEmail({
		user,
		url,
		token
	}, ctx.request);
}
var sendVerificationEmail = createAuthEndpoint("/send-verification-email", {
	method: "POST",
	operationId: "sendVerificationEmail",
	cloneRequest: true,
	body: object({
		email: email().meta({ description: "The email to send the verification email to" }),
		callbackURL: string().meta({ description: "The URL to use for email verification callback" }).optional()
	}),
	metadata: { openapi: {
		operationId: "sendVerificationEmail",
		description: "Send a verification email to the user",
		requestBody: { content: { "application/json": { schema: {
			type: "object",
			properties: {
				email: {
					type: "string",
					description: "The email to send the verification email to",
					example: "user@example.com"
				},
				callbackURL: {
					type: "string",
					description: "The URL to use for email verification callback",
					example: "https://example.com/callback",
					nullable: true
				}
			},
			required: ["email"]
		} } } },
		responses: {
			"200": {
				description: "Success",
				content: { "application/json": { schema: {
					type: "object",
					properties: { status: {
						type: "boolean",
						description: "Indicates if the email was sent successfully",
						example: true
					} }
				} } }
			},
			"400": {
				description: "Bad Request",
				content: { "application/json": { schema: {
					type: "object",
					properties: { message: {
						type: "string",
						description: "Error message",
						example: "Verification email isn't enabled"
					} }
				} } }
			}
		}
	} }
}, async (ctx) => {
	if (!ctx.context.options.emailVerification?.sendVerificationEmail) {
		ctx.context.logger.error("Verification email isn't enabled.");
		throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.VERIFICATION_EMAIL_NOT_ENABLED);
	}
	const { email } = ctx.body;
	const session = await getSessionFromCtx(ctx);
	if (!session) {
		/**
		* Enforce a constant-time floor so an attacker cannot distinguish
		* "email not found / already verified" (fast local JWT sign) from
		* "email found and unverified" (slow external email-send) by
		* comparing response times.
		*/
		const MINIMUM_MS = 500;
		const start = Date.now();
		const user = await ctx.context.internalAdapter.findUserByEmail(email);
		let error;
		if (!user || user.user.emailVerified) await createEmailVerificationToken(ctx.context.secret, email, void 0, ctx.context.options.emailVerification?.expiresIn);
		else try {
			await sendVerificationEmailFn(ctx, user.user);
		} catch (e) {
			error = e;
		}
		const remaining = MINIMUM_MS - (Date.now() - start);
		if (remaining > 0) await new Promise((resolve) => setTimeout(resolve, remaining));
		if (error) throw error;
		return ctx.json({ status: true });
	}
	if (session?.user.email.toLowerCase() !== email.toLowerCase()) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.EMAIL_MISMATCH);
	if (session?.user.emailVerified) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.EMAIL_ALREADY_VERIFIED);
	await sendVerificationEmailFn(ctx, session.user);
	return ctx.json({ status: true });
});
var verifyEmail = createAuthEndpoint("/verify-email", {
	method: "GET",
	operationId: "verifyEmail",
	query: object({
		token: string().meta({ description: "The token to verify the email" }),
		callbackURL: string().meta({ description: "The URL to redirect to after email verification" }).optional()
	}),
	use: [originCheck((ctx) => ctx.query.callbackURL)],
	metadata: { openapi: {
		description: "Verify the email of the user",
		parameters: [{
			name: "token",
			in: "query",
			description: "The token to verify the email",
			required: true,
			schema: { type: "string" }
		}, {
			name: "callbackURL",
			in: "query",
			description: "The URL to redirect to after email verification",
			required: false,
			schema: { type: "string" }
		}],
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					user: {
						type: "object",
						$ref: "#/components/schemas/User"
					},
					status: {
						type: "boolean",
						description: "Indicates if the email was verified successfully"
					}
				},
				required: ["user", "status"]
			} } }
		} }
	} }
}, async (ctx) => {
	function redirectOnError(error) {
		if (ctx.query.callbackURL) {
			if (ctx.query.callbackURL.includes("?")) throw ctx.redirect(`${ctx.query.callbackURL}&error=${error.code}`);
			throw ctx.redirect(`${ctx.query.callbackURL}?error=${error.code}`);
		}
		throw APIError.from("UNAUTHORIZED", error);
	}
	const { token } = ctx.query;
	let jwt;
	try {
		jwt = await jwtVerify(token, new TextEncoder().encode(ctx.context.secret), { algorithms: ["HS256"] });
	} catch (e) {
		if (e instanceof JWTExpired) return redirectOnError(BASE_ERROR_CODES.TOKEN_EXPIRED);
		return redirectOnError(BASE_ERROR_CODES.INVALID_TOKEN);
	}
	const parsed = object({
		email: email(),
		updateTo: string().optional(),
		requestType: string().optional()
	}).parse(jwt.payload);
	const user = await ctx.context.internalAdapter.findUserByEmail(parsed.email);
	if (!user) return redirectOnError(BASE_ERROR_CODES.USER_NOT_FOUND);
	if (parsed.updateTo) {
		const session = await getSessionFromCtx(ctx);
		if (session && session.user.email !== parsed.email) return redirectOnError(BASE_ERROR_CODES.INVALID_USER);
		switch (parsed.requestType) {
			/**
			* User clicks confirmation -> sends verification to new email
			*/
			case "change-email-confirmation": {
				const newToken = await createEmailVerificationToken(ctx.context.secret, parsed.email, parsed.updateTo, ctx.context.options.emailVerification?.expiresIn, { requestType: "change-email-verification" });
				const updateCallbackURL = ctx.query.callbackURL ? encodeURIComponent(ctx.query.callbackURL) : encodeURIComponent("/");
				const url = `${ctx.context.baseURL}/verify-email?token=${newToken}&callbackURL=${updateCallbackURL}`;
				if (ctx.context.options.emailVerification?.sendVerificationEmail) await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
					user: {
						...user.user,
						email: parsed.updateTo
					},
					url,
					token: newToken
				}, safeCloneRequest(ctx.request)));
				if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
				return ctx.json({ status: true });
			}
			/**
			* User clicks verification -> updates email
			*/
			case "change-email-verification": {
				let activeSession = session;
				if (!activeSession) {
					const newSession = await ctx.context.internalAdapter.createSession(user.user.id);
					if (!newSession) throw APIError.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
					activeSession = {
						session: newSession,
						user: user.user
					};
				}
				const updatedUser = await ctx.context.internalAdapter.updateUserByEmail(parsed.email, {
					email: parsed.updateTo,
					emailVerified: true
				});
				if (ctx.context.options.emailVerification?.afterEmailVerification) await ctx.context.options.emailVerification.afterEmailVerification(updatedUser, ctx.request);
				await setSessionCookie(ctx, {
					session: activeSession.session,
					user: {
						...activeSession.user,
						email: parsed.updateTo,
						emailVerified: true
					}
				});
				if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
				return ctx.json({
					status: true,
					user: parseUserOutput(ctx.context.options, updatedUser)
				});
			}
			/**
			* Legacy flow
			*
			* - skips two-step verification
			* - updates email immediately
			*/
			default: {
				let activeSession = session;
				if (!activeSession) {
					const newSession = await ctx.context.internalAdapter.createSession(user.user.id);
					if (!newSession) throw APIError.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
					activeSession = {
						session: newSession,
						user: user.user
					};
				}
				const updatedUser = await ctx.context.internalAdapter.updateUserByEmail(parsed.email, {
					email: parsed.updateTo,
					emailVerified: false
				});
				const newToken = await createEmailVerificationToken(ctx.context.secret, parsed.updateTo);
				const updateCallbackURL = ctx.query.callbackURL ? encodeURIComponent(ctx.query.callbackURL) : encodeURIComponent("/");
				if (ctx.context.options.emailVerification?.sendVerificationEmail) await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
					user: updatedUser,
					url: `${ctx.context.baseURL}/verify-email?token=${newToken}&callbackURL=${updateCallbackURL}`,
					token: newToken
				}, safeCloneRequest(ctx.request)));
				await setSessionCookie(ctx, {
					session: activeSession.session,
					user: {
						...activeSession.user,
						email: parsed.updateTo,
						emailVerified: false
					}
				});
				if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
				return ctx.json({
					status: true,
					user: parseUserOutput(ctx.context.options, updatedUser)
				});
			}
		}
	}
	if (user.user.emailVerified) {
		if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
		return ctx.json({
			status: true,
			user: null
		});
	}
	if (ctx.context.options.emailVerification?.beforeEmailVerification) await ctx.context.options.emailVerification.beforeEmailVerification(user.user, ctx.request);
	const updatedUser = await ctx.context.internalAdapter.updateUserByEmail(parsed.email, { emailVerified: true });
	if (ctx.context.options.emailVerification?.afterEmailVerification) await ctx.context.options.emailVerification.afterEmailVerification(updatedUser, ctx.request);
	if (ctx.context.options.emailVerification?.autoSignInAfterVerification) {
		const currentSession = await getSessionFromCtx(ctx);
		if (!currentSession || currentSession.user.email !== parsed.email) {
			const session = await ctx.context.internalAdapter.createSession(user.user.id);
			if (!session) throw APIError.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
			await setSessionCookie(ctx, {
				session,
				user: {
					...user.user,
					emailVerified: true
				}
			});
		} else await setSessionCookie(ctx, {
			session: currentSession.session,
			user: {
				...currentSession.user,
				emailVerified: true
			}
		});
	}
	if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL);
	return ctx.json({
		status: true,
		user: null
	});
});
async function handleOAuthUserInfo(c, opts) {
	const { userInfo, account, callbackURL, disableSignUp, overrideUserInfo } = opts;
	const dbUser = await c.context.internalAdapter.findOAuthUser(userInfo.email.toLowerCase(), account.accountId, account.providerId).catch((e) => {
		c.context.logger.error("Better auth was unable to query your database.\nError: ", e);
		redirectOnError(c, c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`, "internal_server_error");
	});
	let user = dbUser?.user;
	const isRegister = !user;
	if (dbUser) {
		const linkedAccount = dbUser.linkedAccount ?? dbUser.accounts.find((acc) => acc.providerId === account.providerId && acc.accountId === account.accountId);
		if (!linkedAccount) {
			const accountLinking = c.context.options.account?.accountLinking;
			const isTrustedProvider = opts.isTrustedProvider || opts.trustProviderByName !== false && c.context.trustedProviders.includes(account.providerId);
			const requireLocalEmailVerified = accountLinking?.requireLocalEmailVerified ?? true;
			if (!isTrustedProvider && !userInfo.emailVerified || requireLocalEmailVerified && !dbUser.user.emailVerified || accountLinking?.enabled === false || accountLinking?.disableImplicitLinking === true) {
				if (isDevelopment()) c.context.logger.warn(`User already exist but account isn't linked to ${account.providerId}. To read more about how account linking works in Better Auth see https://www.better-auth.com/docs/concepts/users-accounts#account-linking.`);
				return {
					error: "account not linked",
					data: null
				};
			}
			try {
				await c.context.internalAdapter.linkAccount({
					providerId: account.providerId,
					accountId: userInfo.id.toString(),
					userId: dbUser.user.id,
					accessToken: await setTokenUtil(account.accessToken, c.context),
					refreshToken: await setTokenUtil(account.refreshToken, c.context),
					idToken: account.idToken,
					accessTokenExpiresAt: account.accessTokenExpiresAt,
					refreshTokenExpiresAt: account.refreshTokenExpiresAt,
					scope: account.scope
				});
			} catch (e) {
				c.context.logger.error("Unable to link account", e);
				return {
					error: "unable to link account",
					data: null
				};
			}
			if (userInfo.emailVerified && !dbUser.user.emailVerified && userInfo.email.toLowerCase() === dbUser.user.email) await c.context.internalAdapter.updateUser(dbUser.user.id, { emailVerified: true });
			user = await applyUpdateUserInfoOnLink(c, dbUser.user.id, userInfo) ?? user;
		} else {
			const freshTokens = c.context.options.account?.updateAccountOnSignIn !== false ? Object.fromEntries(Object.entries({
				idToken: account.idToken,
				accessToken: await setTokenUtil(account.accessToken, c.context),
				refreshToken: await setTokenUtil(account.refreshToken, c.context),
				accessTokenExpiresAt: account.accessTokenExpiresAt,
				refreshTokenExpiresAt: account.refreshTokenExpiresAt,
				scope: account.scope
			}).filter(([_, value]) => value !== void 0)) : {};
			if (c.context.options.account?.storeAccountCookie) await setAccountCookie(c, {
				...linkedAccount,
				...freshTokens
			});
			if (Object.keys(freshTokens).length > 0) await c.context.internalAdapter.updateAccount(linkedAccount.id, freshTokens);
			if (userInfo.emailVerified && !dbUser.user.emailVerified && userInfo.email.toLowerCase() === dbUser.user.email) await c.context.internalAdapter.updateUser(dbUser.user.id, { emailVerified: true });
		}
		if (overrideUserInfo) {
			const { id: _id, email: _email, emailVerified: _emailVerified, name, image, ...providerProfile } = userInfo;
			const additionalUserFields = parseAdditionalUserInputFromProviderProfile(c.context.options, providerProfile, "update");
			user = await c.context.internalAdapter.updateUser(dbUser.user.id, {
				name,
				image,
				...additionalUserFields,
				email: userInfo.email.toLowerCase(),
				emailVerified: userInfo.email.toLowerCase() === dbUser.user.email ? dbUser.user.emailVerified || userInfo.emailVerified : userInfo.emailVerified
			});
		}
	} else {
		if (disableSignUp) return {
			error: "signup disabled",
			data: null,
			isRegister: false
		};
		try {
			const { id: _id, email: _email, emailVerified: _emailVerified, name, image, ...providerProfile } = userInfo;
			const additionalUserFields = parseAdditionalUserInputFromProviderProfile(c.context.options, providerProfile, "create");
			const accountData = {
				accessToken: await setTokenUtil(account.accessToken, c.context),
				refreshToken: await setTokenUtil(account.refreshToken, c.context),
				idToken: account.idToken,
				accessTokenExpiresAt: account.accessTokenExpiresAt,
				refreshTokenExpiresAt: account.refreshTokenExpiresAt,
				scope: account.scope,
				providerId: account.providerId,
				accountId: userInfo.id.toString()
			};
			const { user: createdUser, account: createdAccount } = await c.context.internalAdapter.createOAuthUser({
				name,
				image,
				...additionalUserFields,
				email: userInfo.email.toLowerCase(),
				emailVerified: userInfo.emailVerified
			}, accountData);
			user = createdUser;
			if (c.context.options.account?.storeAccountCookie) await setAccountCookie(c, createdAccount);
			if (!userInfo.emailVerified && user && c.context.options.emailVerification?.sendOnSignUp && c.context.options.emailVerification?.sendVerificationEmail) {
				const token = await createEmailVerificationToken(c.context.secret, user.email, void 0, c.context.options.emailVerification?.expiresIn);
				const url = `${c.context.baseURL}/verify-email?token=${token}&callbackURL=${encodeURIComponent(callbackURL || "/")}`;
				await c.context.runInBackgroundOrAwait(c.context.options.emailVerification.sendVerificationEmail({
					user,
					url,
					token
				}, c.request));
			}
		} catch (e) {
			c.context.logger.error(e);
			if (isAPIError(e)) return {
				error: e.message,
				data: null,
				isRegister: false
			};
			return {
				error: "unable to create user",
				data: null,
				isRegister: false
			};
		}
	}
	if (!user) return {
		error: "unable to create user",
		data: null,
		isRegister: false
	};
	const session = await c.context.internalAdapter.createSession(user.id);
	if (!session) return {
		error: "unable to create session",
		data: null,
		isRegister: false
	};
	return {
		data: {
			session,
			user
		},
		error: null,
		isRegister
	};
}
/**
* Apply the `account.accountLinking.updateUserInfoOnLink` policy: when enabled,
* copy the freshly linked provider's profile onto the local user, matching the
* field set persisted on sign-up. The local `email` and `emailVerified` are
* never changed, so a link can't rebind the account's identity, and
* `updateUser` drops `undefined` fields, so a provider that omits one leaves
* the existing column intact.
*
* Returns the updated user so a caller that issues a session can seed the
* cookie cache with the fresh row. Returns `undefined` when the policy is
* disabled or the update fails: a failed profile sync must not abort the link.
*/
async function applyUpdateUserInfoOnLink(c, userId, userInfo) {
	if (c.context.options.account?.accountLinking?.updateUserInfoOnLink !== true) return;
	try {
		const { id: _id, email: _email, emailVerified: _emailVerified, name, image, ...providerProfile } = userInfo;
		const additionalUserFields = parseAdditionalUserInputFromProviderProfile(c.context.options, providerProfile, "update");
		return await c.context.internalAdapter.updateUser(userId, {
			name,
			image,
			...additionalUserFields
		});
	} catch (e) {
		c.context.logger.warn("Could not update user info on account link", e);
		return;
	}
}
var listUserAccounts = createAuthEndpoint("/list-accounts", {
	method: "GET",
	use: [sessionMiddleware],
	metadata: { openapi: {
		operationId: "listUserAccounts",
		description: "List all accounts linked to the user",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "array",
				items: {
					type: "object",
					properties: {
						id: { type: "string" },
						providerId: { type: "string" },
						createdAt: {
							type: "string",
							format: "date-time"
						},
						updatedAt: {
							type: "string",
							format: "date-time"
						},
						accountId: { type: "string" },
						userId: { type: "string" },
						scopes: {
							type: "array",
							items: { type: "string" }
						}
					},
					required: [
						"id",
						"providerId",
						"createdAt",
						"updatedAt",
						"accountId",
						"userId",
						"scopes"
					]
				}
			} } }
		} }
	} }
}, async (c) => {
	const session = c.context.session;
	const accounts = await c.context.internalAdapter.findAccounts(session.user.id);
	return c.json(accounts.map((a) => {
		const { scope, ...parsed } = parseAccountOutput(c.context.options, a);
		return {
			...parsed,
			scopes: scope?.split(",") || []
		};
	}));
});
var linkSocialAccount = createAuthEndpoint("/link-social", {
	method: "POST",
	requireHeaders: true,
	body: object({
		/**
		* Callback URL to redirect to after the user has signed in.
		*/
		callbackURL: string().meta({ description: "The URL to redirect to after the user has signed in" }).optional(),
		/**
		* OAuth2 provider to use
		*/
		provider: SocialProviderListEnum,
		/**
		* ID Token for direct authentication without redirect
		*/
		idToken: object({
			token: string(),
			nonce: string().optional(),
			accessToken: string().optional(),
			refreshToken: string().optional(),
			scopes: array(string()).optional()
		}).optional(),
		/**
		* Whether to allow sign up for new users
		*/
		requestSignUp: boolean().optional(),
		/**
		* Additional scopes to request when linking the account.
		* This is useful for requesting additional permissions when
		* linking a social account compared to the initial authentication.
		*/
		scopes: array(string()).meta({ description: "Additional scopes to request from the provider" }).optional(),
		/**
		* The URL to redirect to if there is an error during the link process.
		*/
		errorCallbackURL: string().meta({ description: "The URL to redirect to if there is an error during the link process" }).optional(),
		/**
		* Disable automatic redirection to the provider
		*
		* This is useful if you want to handle the redirection
		* yourself like in a popup or a different tab.
		*/
		disableRedirect: boolean().meta({ description: "Disable automatic redirection to the provider. Useful for handling the redirection yourself" }).optional(),
		/**
		* Any additional data to pass through the oauth flow.
		*/
		additionalData: record(string(), any()).optional()
	}),
	use: [sessionMiddleware],
	metadata: { openapi: {
		description: "Link a social account to the user",
		operationId: "linkSocialAccount",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					url: {
						type: "string",
						description: "The authorization URL to redirect the user to"
					},
					redirect: {
						type: "boolean",
						description: "Indicates if the user should be redirected to the authorization URL"
					},
					status: { type: "boolean" }
				},
				required: ["redirect"]
			} } }
		} }
	} }
}, async (c) => {
	const session = c.context.session;
	const provider = await getAwaitableValue(c.context.socialProviders, { value: c.body.provider });
	if (!provider) {
		c.context.logger.error("Provider not found. Make sure to add the provider in your auth config", { provider: c.body.provider });
		throw APIError.from("NOT_FOUND", BASE_ERROR_CODES.PROVIDER_NOT_FOUND);
	}
	if (c.body.idToken) {
		if (!provider.verifyIdToken) {
			c.context.logger.error("Provider does not support id token verification", { provider: c.body.provider });
			throw APIError.from("NOT_FOUND", BASE_ERROR_CODES.ID_TOKEN_NOT_SUPPORTED);
		}
		const { token, nonce } = c.body.idToken;
		if (!await provider.verifyIdToken(token, nonce, c)) {
			c.context.logger.warn("Invalid id token", { provider: c.body.provider });
			throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.INVALID_TOKEN);
		}
		const linkingUserInfo = await provider.getUserInfo({
			idToken: token,
			accessToken: c.body.idToken.accessToken,
			refreshToken: c.body.idToken.refreshToken
		});
		if (!linkingUserInfo || !linkingUserInfo?.user) {
			c.context.logger.error("Failed to get user info", { provider: c.body.provider });
			throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO);
		}
		const linkingUserId = String(linkingUserInfo.user.id);
		if (!linkingUserInfo.user.email) {
			c.context.logger.error(missingEmailLogMessage(c.body.provider, { source: "id_token" }), { provider: c.body.provider });
			throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.USER_EMAIL_NOT_FOUND);
		}
		if ((await c.context.internalAdapter.findAccounts(session.user.id)).find((a) => a.providerId === provider.id && a.accountId === linkingUserId)) return c.json({
			url: "",
			status: true,
			redirect: false
		});
		if (!c.context.trustedProviders.includes(provider.id) && !linkingUserInfo.user.emailVerified || c.context.options.account?.accountLinking?.enabled === false) throw APIError.from("UNAUTHORIZED", {
			message: "Account not linked - linking not allowed",
			code: "LINKING_NOT_ALLOWED"
		});
		if (linkingUserInfo.user.email?.toLowerCase() !== session.user.email.toLowerCase() && c.context.options.account?.accountLinking?.allowDifferentEmails !== true) throw APIError.from("UNAUTHORIZED", {
			message: "Account not linked - different emails not allowed",
			code: "LINKING_DIFFERENT_EMAILS_NOT_ALLOWED"
		});
		try {
			await c.context.internalAdapter.createAccount({
				userId: session.user.id,
				providerId: provider.id,
				accountId: linkingUserId,
				accessToken: c.body.idToken.accessToken,
				idToken: token,
				refreshToken: c.body.idToken.refreshToken,
				scope: c.body.idToken.scopes?.join(",")
			});
		} catch (_e) {
			throw APIError.from("EXPECTATION_FAILED", {
				message: "Account not linked - unable to create account",
				code: "LINKING_FAILED"
			});
		}
		await applyUpdateUserInfoOnLink(c, session.user.id, linkingUserInfo.user);
		return c.json({
			url: "",
			status: true,
			redirect: false
		});
	}
	const state = await generateState(c, {
		userId: session.user.id,
		email: session.user.email
	}, c.body.additionalData);
	const url = await provider.createAuthorizationURL({
		state: state.state,
		codeVerifier: state.codeVerifier,
		redirectURI: `${c.context.baseURL}/callback/${provider.id}`,
		scopes: c.body.scopes
	});
	if (!c.body.disableRedirect) c.setHeader("Location", url.toString());
	return c.json({
		url: url.toString(),
		redirect: !c.body.disableRedirect
	});
});
var unlinkAccount = createAuthEndpoint("/unlink-account", {
	method: "POST",
	body: object({
		providerId: string(),
		accountId: string().optional()
	}),
	use: [freshSessionMiddleware],
	metadata: { openapi: {
		description: "Unlink an account",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { status: { type: "boolean" } }
			} } }
		} }
	} }
}, async (ctx) => {
	const { providerId, accountId } = ctx.body;
	const accounts = await ctx.context.internalAdapter.findAccounts(ctx.context.session.user.id);
	if (accounts.length === 1 && !ctx.context.options.account?.accountLinking?.allowUnlinkingAll) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.FAILED_TO_UNLINK_LAST_ACCOUNT);
	const accountExist = accounts.find((account) => accountId ? account.accountId === accountId && account.providerId === providerId : account.providerId === providerId);
	if (!accountExist) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.ACCOUNT_NOT_FOUND);
	await ctx.context.internalAdapter.deleteAccount(accountExist.id);
	return ctx.json({ status: true });
});
/**
* Resolves the user id an account-token operation should act on.
*
* A caller reaching the server over HTTP (a request or session headers are
* present) must have a valid session, and that session's user always wins.
* A trusted server-side `auth.api` caller with no session may instead name a
* `userId` directly. Throws `UNAUTHORIZED` when an HTTP caller is
* unauthenticated, and `USER_ID_OR_SESSION_REQUIRED` when neither a session
* nor a `userId` is available.
*
* When a durable store is authoritative, bypasses the cookie cache: these
* routes mint or refresh provider access tokens, so a server-side session
* revocation must take effect immediately rather than waiting for the cached
* cookie to expire. DB-less deployments keep the session in the cookie itself,
* so the cache is left in place for them.
*/
async function resolveUserId(ctx, userId) {
	const session = await getSessionFromCtx(ctx, { disableCookieCache: isStateful(ctx) });
	if (!session && (ctx.request || ctx.headers)) throw ctx.error("UNAUTHORIZED");
	const resolvedUserId = session?.user?.id || userId;
	if (!resolvedUserId) throw APIError.from("BAD_REQUEST", {
		message: "Either userId or session is required",
		code: "USER_ID_OR_SESSION_REQUIRED"
	});
	return resolvedUserId;
}
function matchesAccountSelection(ctx, account, { resolvedUserId, providerId, accountId }) {
	return (!shouldBindAccountCookieToSessionUser(ctx.context.options) || account.userId === resolvedUserId) && (!providerId || providerId === account.providerId) && (!accountId || account.accountId === accountId);
}
/**
* Fetches a currently-valid access token for a user's provider account,
* refreshing and persisting it when it is within five seconds of expiry.
* Shared by the `/get-access-token` endpoint and `/account-info` so both
* resolve and refresh tokens through one path.
*/
async function getValidAccessToken(ctx, { resolvedUserId, providerId, accountId, account: resolvedAccount }) {
	const provider = await getAwaitableValue(ctx.context.socialProviders, { value: providerId });
	if (!provider) throw APIError.from("BAD_REQUEST", {
		message: `Provider ${providerId} is not supported.`,
		code: "PROVIDER_NOT_SUPPORTED"
	});
	let account = resolvedAccount;
	if (!account) {
		const accountData = await getAccountCookie(ctx);
		if (accountData && matchesAccountSelection(ctx, accountData, {
			resolvedUserId,
			providerId,
			accountId
		})) account = accountData;
		else account = (await ctx.context.internalAdapter.findAccounts(resolvedUserId)).find((acc) => accountId ? acc.accountId === accountId && acc.providerId === providerId : acc.providerId === providerId);
	}
	if (!account) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.ACCOUNT_NOT_FOUND);
	try {
		let newTokens = null;
		const accessTokenExpired = account.accessTokenExpiresAt && new Date(account.accessTokenExpiresAt).getTime() - Date.now() < 5e3;
		if (account.refreshToken && accessTokenExpired && provider.refreshAccessToken) {
			const refreshToken = await decryptOAuthToken(account.refreshToken, ctx.context);
			newTokens = await provider.refreshAccessToken(refreshToken);
			const updatedData = {
				accessToken: await setTokenUtil(newTokens?.accessToken, ctx.context),
				accessTokenExpiresAt: newTokens?.accessTokenExpiresAt,
				refreshToken: newTokens?.refreshToken ? await setTokenUtil(newTokens.refreshToken, ctx.context) : account.refreshToken,
				refreshTokenExpiresAt: newTokens?.refreshTokenExpiresAt ?? account.refreshTokenExpiresAt,
				idToken: newTokens?.idToken || account.idToken
			};
			let updatedAccount = null;
			if (account.id) updatedAccount = await ctx.context.internalAdapter.updateAccount(account.id, updatedData);
			if (ctx.context.options.account?.storeAccountCookie) await setAccountCookie(ctx, {
				...account,
				...updatedAccount ?? updatedData
			});
		}
		const accessTokenExpiresAt = (() => {
			if (newTokens?.accessTokenExpiresAt) {
				if (typeof newTokens.accessTokenExpiresAt === "string") return new Date(newTokens.accessTokenExpiresAt);
				return newTokens.accessTokenExpiresAt;
			}
			if (account.accessTokenExpiresAt) {
				if (typeof account.accessTokenExpiresAt === "string") return new Date(account.accessTokenExpiresAt);
				return account.accessTokenExpiresAt;
			}
		})();
		return {
			accessToken: newTokens?.accessToken ?? await decryptOAuthToken(account.accessToken ?? "", ctx.context),
			accessTokenExpiresAt,
			scopes: account.scope?.split(",") ?? [],
			idToken: newTokens?.idToken ?? account.idToken ?? void 0
		};
	} catch (_error) {
		throw APIError.from("BAD_REQUEST", {
			message: "Failed to get a valid access token",
			code: "FAILED_TO_GET_ACCESS_TOKEN"
		});
	}
}
var getAccessToken = createAuthEndpoint("/get-access-token", {
	method: "POST",
	body: object({
		providerId: string().meta({ description: "The provider ID for the OAuth provider" }),
		accountId: string().meta({ description: "The account ID associated with the refresh token" }).optional(),
		userId: string().meta({ description: "The user ID associated with the account" }).optional()
	}),
	metadata: { openapi: {
		description: "Get a valid access token, doing a refresh if needed",
		responses: {
			200: {
				description: "A Valid access token",
				content: { "application/json": { schema: {
					type: "object",
					properties: {
						tokenType: { type: "string" },
						idToken: { type: "string" },
						accessToken: { type: "string" },
						accessTokenExpiresAt: {
							type: "string",
							format: "date-time"
						}
					}
				} } }
			},
			400: { description: "Invalid refresh token or provider configuration" }
		}
	} }
}, async (ctx) => {
	const { providerId, accountId, userId } = ctx.body || {};
	const tokens = await getValidAccessToken(ctx, {
		resolvedUserId: await resolveUserId(ctx, userId),
		providerId,
		accountId
	});
	return ctx.json(tokens);
});
var refreshToken = createAuthEndpoint("/refresh-token", {
	method: "POST",
	body: object({
		providerId: string().meta({ description: "The provider ID for the OAuth provider" }),
		accountId: string().meta({ description: "The account ID associated with the refresh token" }).optional(),
		userId: string().meta({ description: "The user ID associated with the account" }).optional()
	}),
	metadata: { openapi: {
		description: "Refresh the access token using a refresh token",
		responses: {
			200: {
				description: "Access token refreshed successfully",
				content: { "application/json": { schema: {
					type: "object",
					properties: {
						tokenType: { type: "string" },
						idToken: { type: "string" },
						accessToken: { type: "string" },
						refreshToken: { type: "string" },
						accessTokenExpiresAt: {
							type: "string",
							format: "date-time"
						},
						refreshTokenExpiresAt: {
							type: "string",
							format: "date-time"
						}
					}
				} } }
			},
			400: { description: "Invalid refresh token or provider configuration" }
		}
	} }
}, async (ctx) => {
	const { providerId, accountId, userId } = ctx.body;
	const resolvedUserId = await resolveUserId(ctx, userId);
	const provider = await getAwaitableValue(ctx.context.socialProviders, { value: providerId });
	if (!provider) throw APIError.from("BAD_REQUEST", {
		message: `Provider ${providerId} is not supported.`,
		code: "PROVIDER_NOT_SUPPORTED"
	});
	if (!provider.refreshAccessToken) throw APIError.from("BAD_REQUEST", {
		message: `Provider ${providerId} does not support token refreshing.`,
		code: "TOKEN_REFRESH_NOT_SUPPORTED"
	});
	let account = void 0;
	const accountData = await getAccountCookie(ctx);
	const usedAccountCookie = !!accountData && matchesAccountSelection(ctx, accountData, {
		resolvedUserId,
		providerId,
		accountId
	});
	if (usedAccountCookie) account = accountData;
	else account = (await ctx.context.internalAdapter.findAccounts(resolvedUserId)).find((acc) => accountId ? acc.accountId === accountId && acc.providerId === providerId : acc.providerId === providerId);
	if (!account) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.ACCOUNT_NOT_FOUND);
	const refreshToken = account.refreshToken ?? void 0;
	if (!refreshToken) throw APIError.from("BAD_REQUEST", {
		message: "Refresh token not found",
		code: "REFRESH_TOKEN_NOT_FOUND"
	});
	try {
		const decryptedRefreshToken = await decryptOAuthToken(refreshToken, ctx.context);
		const tokens = await provider.refreshAccessToken(decryptedRefreshToken);
		const resolvedRefreshToken = tokens.refreshToken ? await setTokenUtil(tokens.refreshToken, ctx.context) : refreshToken;
		const resolvedRefreshTokenExpiresAt = tokens.refreshTokenExpiresAt ?? account.refreshTokenExpiresAt;
		if (account.id) {
			const updateData = {
				...account || {},
				accessToken: await setTokenUtil(tokens.accessToken, ctx.context),
				refreshToken: resolvedRefreshToken,
				accessTokenExpiresAt: tokens.accessTokenExpiresAt,
				refreshTokenExpiresAt: resolvedRefreshTokenExpiresAt,
				scope: tokens.scopes?.join(",") || account.scope,
				idToken: tokens.idToken || account.idToken
			};
			await ctx.context.internalAdapter.updateAccount(account.id, updateData);
		}
		if (usedAccountCookie && ctx.context.options.account?.storeAccountCookie) await setAccountCookie(ctx, {
			...accountData,
			accessToken: await setTokenUtil(tokens.accessToken, ctx.context),
			refreshToken: resolvedRefreshToken,
			accessTokenExpiresAt: tokens.accessTokenExpiresAt,
			refreshTokenExpiresAt: resolvedRefreshTokenExpiresAt,
			scope: tokens.scopes?.join(",") || accountData.scope,
			idToken: tokens.idToken || accountData.idToken
		});
		return ctx.json({
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken ?? decryptedRefreshToken,
			accessTokenExpiresAt: tokens.accessTokenExpiresAt,
			refreshTokenExpiresAt: resolvedRefreshTokenExpiresAt,
			scope: tokens.scopes?.join(",") || account.scope,
			idToken: tokens.idToken || account.idToken,
			providerId: account.providerId,
			accountId: account.accountId
		});
	} catch (_error) {
		throw APIError.from("BAD_REQUEST", {
			message: "Failed to refresh access token",
			code: "FAILED_TO_REFRESH_ACCESS_TOKEN"
		});
	}
});
var accountInfo = createAuthEndpoint("/account-info", {
	method: "GET",
	metadata: { openapi: {
		description: "Get the account info provided by the provider",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					user: {
						type: "object",
						properties: {
							id: { type: "string" },
							name: { type: "string" },
							email: { type: "string" },
							image: { type: "string" },
							emailVerified: { type: "boolean" }
						},
						required: ["id", "emailVerified"]
					},
					data: {
						type: "object",
						properties: {},
						additionalProperties: true
					}
				},
				required: ["user", "data"],
				additionalProperties: false
			} } }
		} }
	} },
	query: optional(object({
		accountId: string().meta({ description: "The provider given account id for which to get the account info" }).optional(),
		providerId: string().meta({ description: "The provider ID to disambiguate provider-issued account IDs" }).optional(),
		userId: string().meta({ description: "The user ID associated with the account" }).optional()
	}))
}, async (ctx) => {
	const { accountId: providedAccountId, providerId: providedProviderId, userId } = ctx.query || {};
	const resolvedUserId = await resolveUserId(ctx, userId);
	let account = void 0;
	if (!providedAccountId) {
		if (ctx.context.options.account?.storeAccountCookie) {
			const accountData = await getAccountCookie(ctx);
			if (accountData && matchesAccountSelection(ctx, accountData, {
				resolvedUserId,
				providerId: providedProviderId
			})) account = accountData;
		}
	} else {
		const matchingAccounts = (await ctx.context.internalAdapter.findAccounts(resolvedUserId)).filter((acc) => acc.accountId === providedAccountId && (!providedProviderId || acc.providerId === providedProviderId));
		if (matchingAccounts.length > 1) throw APIError.from("BAD_REQUEST", {
			message: "Multiple accounts share this account ID. Pass a providerId to disambiguate.",
			code: "AMBIGUOUS_ACCOUNT"
		});
		account = matchingAccounts[0];
	}
	if (!account || !matchesAccountSelection(ctx, account, { resolvedUserId })) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.ACCOUNT_NOT_FOUND);
	const provider = await getAwaitableValue(ctx.context.socialProviders, { value: account.providerId });
	if (!provider) throw APIError.from("BAD_REQUEST", {
		message: "Account is not associated with a configured social provider.",
		code: "PROVIDER_NOT_CONFIGURED"
	});
	const tokens = await getValidAccessToken(ctx, {
		resolvedUserId,
		providerId: account.providerId,
		accountId: account.accountId,
		account
	});
	if (!tokens.accessToken) throw APIError.from("BAD_REQUEST", {
		message: "Access token not found",
		code: "ACCESS_TOKEN_NOT_FOUND"
	});
	const info = await provider.getUserInfo({
		...tokens,
		accessToken: tokens.accessToken
	});
	return ctx.json(info);
});
var schema = object({
	code: string().optional(),
	error: string().optional(),
	device_id: string().optional(),
	error_description: string().optional(),
	state: string().optional(),
	user: string().optional()
});
var callbackOAuth = createAuthEndpoint("/callback/:id", {
	method: ["GET", "POST"],
	operationId: "handleOAuthCallback",
	body: schema.optional(),
	query: schema.optional(),
	metadata: {
		...HIDE_METADATA,
		allowedMediaTypes: ["application/x-www-form-urlencoded", "application/json"]
	}
}, async (c) => {
	let queryOrBody;
	const defaultErrorURL = c.context.options.onAPIError?.errorURL || `${c.context.baseURL}/error`;
	if (c.method === "POST") {
		const postData = c.body ? schema.parse(c.body) : {};
		const queryData = c.query ? schema.parse(c.query) : {};
		const mergedData = schema.parse({
			...postData,
			...queryData
		});
		const params = new URLSearchParams();
		for (const [key, value] of Object.entries(mergedData)) if (value !== void 0 && value !== null) params.set(key, String(value));
		const redirectURL = `${c.context.baseURL}/callback/${c.params.id}?${params.toString()}`;
		throw c.redirect(redirectURL);
	}
	try {
		if (c.method === "GET") queryOrBody = schema.parse(c.query);
		else if (c.method === "POST") queryOrBody = schema.parse(c.body);
		else throw new Error("Unsupported method");
	} catch (e) {
		c.context.logger.error("INVALID_CALLBACK_REQUEST", e);
		redirectOnError(c, defaultErrorURL, "invalid_callback_request");
	}
	const { code, error, error_description, device_id, user: userData } = queryOrBody;
	const { codeVerifier, callbackURL, link, errorURL, newUserURL, requestSignUp } = await parseState(c);
	const resolvedErrorURL = errorURL ?? defaultErrorURL;
	if (error) redirectOnError(c, resolvedErrorURL, error, error_description);
	if (!code) {
		c.context.logger.warn("Code not found");
		redirectOnError(c, resolvedErrorURL, "no_code");
	}
	const provider = await getAwaitableValue(c.context.socialProviders, { value: c.params.id });
	if (!provider) {
		c.context.logger.warn("OAuth provider not found", { providerId: c.params.id });
		redirectOnError(c, resolvedErrorURL, "oauth_provider_not_found");
	}
	let tokens;
	try {
		tokens = await provider.validateAuthorizationCode({
			code,
			codeVerifier,
			deviceId: device_id,
			redirectURI: `${c.context.baseURL}/callback/${provider.id}`
		});
	} catch (e) {
		c.context.logger.error("", e);
		redirectOnError(c, resolvedErrorURL, "invalid_code");
	}
	if (!tokens) redirectOnError(c, resolvedErrorURL, "invalid_code");
	const parsedUserData = userData ? safeJSONParse(userData) : null;
	const userInfo = await provider.getUserInfo({
		...tokens,
		/**
		* The user object from the provider
		* This is only available for some providers like Apple
		*/
		user: parsedUserData ?? void 0
	}).then((res) => res?.user);
	if (!userInfo || userInfo.id === void 0 || userInfo.id === null || userInfo.id === "") {
		c.context.logger.error("Unable to get user info");
		redirectOnError(c, resolvedErrorURL, "unable_to_get_user_info");
	}
	const providerAccountId = String(userInfo.id);
	if (!callbackURL) {
		c.context.logger.error("No callback URL found");
		redirectOnError(c, resolvedErrorURL, "no_callback_url");
	}
	if (link) {
		if (!c.context.trustedProviders.includes(provider.id) && !userInfo.emailVerified || c.context.options.account?.accountLinking?.enabled === false) {
			c.context.logger.error("Unable to link account - untrusted provider");
			redirectOnError(c, resolvedErrorURL, "unable_to_link_account");
		}
		if (userInfo.email?.toLowerCase() !== link.email.toLowerCase() && c.context.options.account?.accountLinking?.allowDifferentEmails !== true) redirectOnError(c, resolvedErrorURL, "email_doesn't_match");
		const existingAccount = await c.context.internalAdapter.findAccountByProviderId(providerAccountId, provider.id);
		if (existingAccount) {
			if (existingAccount.userId.toString() !== link.userId.toString()) redirectOnError(c, resolvedErrorURL, "account_already_linked_to_different_user");
			const updateData = Object.fromEntries(Object.entries({
				accessToken: await setTokenUtil(tokens.accessToken, c.context),
				refreshToken: await setTokenUtil(tokens.refreshToken, c.context),
				idToken: tokens.idToken,
				accessTokenExpiresAt: tokens.accessTokenExpiresAt,
				refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
				scope: tokens.scopes?.join(",")
			}).filter(([_, value]) => value !== void 0));
			await c.context.internalAdapter.updateAccount(existingAccount.id, updateData);
		} else if (!await c.context.internalAdapter.createAccount({
			userId: link.userId,
			providerId: provider.id,
			accountId: providerAccountId,
			...tokens,
			accessToken: await setTokenUtil(tokens.accessToken, c.context),
			refreshToken: await setTokenUtil(tokens.refreshToken, c.context),
			scope: tokens.scopes?.join(",")
		})) redirectOnError(c, resolvedErrorURL, "unable_to_link_account");
		await applyUpdateUserInfoOnLink(c, link.userId, userInfo);
		let toRedirectTo;
		try {
			toRedirectTo = callbackURL.toString();
		} catch {
			toRedirectTo = callbackURL;
		}
		throw c.redirect(toRedirectTo);
	}
	if (!userInfo.email) {
		c.context.logger.error(missingEmailLogMessage(provider.id));
		redirectOnError(c, resolvedErrorURL, "email_not_found");
	}
	const accountData = {
		providerId: provider.id,
		accountId: providerAccountId,
		...tokens,
		scope: tokens.scopes?.join(",")
	};
	let result;
	try {
		result = await handleOAuthUserInfo(c, {
			userInfo: {
				...userInfo,
				id: providerAccountId,
				email: userInfo.email,
				name: userInfo.name || ""
			},
			account: accountData,
			callbackURL,
			disableSignUp: provider.disableImplicitSignUp && !requestSignUp || provider.options?.disableSignUp,
			overrideUserInfo: provider.options?.overrideUserInfoOnSignIn
		});
	} catch (e) {
		if (isAPIError(e) && e.body?.code) redirectOnError(c, resolvedErrorURL, e.body.code, e.body.message);
		throw e;
	}
	if (result.error) {
		c.context.logger.error(result.error.split(" ").join("_"));
		redirectOnError(c, resolvedErrorURL, result.error.split(" ").join("_"));
	}
	const { session, user } = result.data;
	await setSessionCookie(c, {
		session,
		user
	});
	let toRedirectTo;
	try {
		toRedirectTo = (result.isRegister ? newUserURL || callbackURL : callbackURL).toString();
	} catch {
		toRedirectTo = result.isRegister ? newUserURL || callbackURL : callbackURL;
	}
	throw c.redirect(toRedirectTo);
});
function sanitize(input) {
	return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/&(?!amp;|lt;|gt;|quot;|#39;|#x[0-9a-fA-F]+;|#[0-9]+;)/g, "&amp;");
}
var html = (options, code = "Unknown", description = null) => {
	const custom = options.onAPIError?.customizeDefaultErrorPage;
	return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Error</title>
    <style>
      * {
        box-sizing: border-box;
      }
      body {
        font-family: ${custom?.font?.defaultFamily || "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"};
        background: ${custom?.colors?.background || "var(--background)"};
        color: var(--foreground);
        margin: 0;
      }
      :root,
      :host {
        --spacing: 0.25rem;
        --container-md: 28rem;
        --text-sm: ${custom?.size?.textSm || "0.875rem"};
        --text-sm--line-height: calc(1.25 / 0.875);
        --text-2xl: ${custom?.size?.text2xl || "1.5rem"};
        --text-2xl--line-height: calc(2 / 1.5);
        --text-4xl: ${custom?.size?.text4xl || "2.25rem"};
        --text-4xl--line-height: calc(2.5 / 2.25);
        --text-6xl: ${custom?.size?.text6xl || "3rem"};
        --text-6xl--line-height: 1;
        --font-weight-medium: 500;
        --font-weight-semibold: 600;
        --font-weight-bold: 700;
        --default-transition-duration: 150ms;
        --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        --radius: ${custom?.size?.radiusSm || "0.625rem"};
        --default-mono-font-family: ${custom?.font?.monoFamily || "var(--font-geist-mono)"};
        --primary: ${custom?.colors?.primary || "black"};
        --primary-foreground: ${custom?.colors?.primaryForeground || "white"};
        --background: ${custom?.colors?.background || "white"};
        --foreground: ${custom?.colors?.foreground || "oklch(0.271 0 0)"};
        --border: ${custom?.colors?.border || "oklch(0.89 0 0)"};
        --destructive: ${custom?.colors?.destructive || "oklch(0.55 0.15 25.723)"};
        --muted-foreground: ${custom?.colors?.mutedForeground || "oklch(0.545 0 0)"};
        --corner-border: ${custom?.colors?.cornerBorder || "#404040"};
      }

      button, .btn {
        cursor: pointer;
        background: none;
        border: none;
        color: inherit;
        font: inherit;
        transition: all var(--default-transition-duration)
          var(--default-transition-timing-function);
      }
      button:hover, .btn:hover {
        opacity: 0.8;
      }

      @media (prefers-color-scheme: dark) {
        :root,
        :host {
          --primary: ${custom?.colors?.primary || "white"};
          --primary-foreground: ${custom?.colors?.primaryForeground || "black"};
          --background: ${custom?.colors?.background || "oklch(0.15 0 0)"};
          --foreground: ${custom?.colors?.foreground || "oklch(0.98 0 0)"};
          --border: ${custom?.colors?.border || "oklch(0.27 0 0)"};
          --destructive: ${custom?.colors?.destructive || "oklch(0.65 0.15 25.723)"};
          --muted-foreground: ${custom?.colors?.mutedForeground || "oklch(0.65 0 0)"};
          --corner-border: ${custom?.colors?.cornerBorder || "#a0a0a0"};
        }
      }
      @media (max-width: 640px) {
        :root, :host {
          --text-6xl: 2.5rem;
          --text-2xl: 1.25rem;
          --text-sm: 0.8125rem;
        }
      }
      @media (max-width: 480px) {
        :root, :host {
          --text-6xl: 2rem;
          --text-2xl: 1.125rem;
        }
      }
    </style>
  </head>
  <body style="width: 100vw; min-height: 100vh; overflow-x: hidden; overflow-y: auto;">
    <div
        style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            position: relative;
            width: 100%;
            min-height: 100vh;
            padding: 1rem;
        "
        >
${custom?.disableBackgroundGrid ? "" : `
      <div
        style="
          position: absolute;
          inset: 0;
          background-image: linear-gradient(to right, ${custom?.colors?.gridColor || "var(--border)"} 1px, transparent 1px),
            linear-gradient(to bottom, ${custom?.colors?.gridColor || "var(--border)"} 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.6;
          pointer-events: none;
          width: 100vw;
          height: 100vh;
        "
      ></div>
      <div
        style="
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${custom?.colors?.background || "var(--background)"};
          mask-image: radial-gradient(ellipse at center, transparent 20%, black);
          -webkit-mask-image: radial-gradient(ellipse at center, transparent 20%, black);
          pointer-events: none;
        "
      ></div>
`}

<div
  style="
    position: relative;
    z-index: 10;
    border: 2px solid var(--border);
    background: ${custom?.colors?.cardBackground || "var(--background)"};
    padding: 1.5rem;
    max-width: 42rem;
    width: 100%;
  "
>
    ${custom?.disableCornerDecorations ? "" : `
        <!-- Corner decorations -->
        <div
          style="
            position: absolute;
            top: -2px;
            left: -2px;
            width: 2rem;
            height: 2rem;
            border-top: 4px solid var(--corner-border);
            border-left: 4px solid var(--corner-border);
          "
        ></div>
        <div
          style="
            position: absolute;
            top: -2px;
            right: -2px;
            width: 2rem;
            height: 2rem;
            border-top: 4px solid var(--corner-border);
            border-right: 4px solid var(--corner-border);
          "
        ></div>
  
        <div
          style="
            position: absolute;
            bottom: -2px;
            left: -2px;
            width: 2rem;
            height: 2rem;
            border-bottom: 4px solid var(--corner-border);
            border-left: 4px solid var(--corner-border);
          "
        ></div>
        <div
          style="
            position: absolute;
            bottom: -2px;
            right: -2px;
            width: 2rem;
            height: 2rem;
            border-bottom: 4px solid var(--corner-border);
            border-right: 4px solid var(--corner-border);
          "
        ></div>`}

        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="margin-bottom: 1.5rem;">
            <div
              style="
                display: inline-block;
                border: 2px solid ${custom?.disableTitleBorder ? "transparent" : custom?.colors?.titleBorder || "var(--destructive)"};
                padding: 0.375rem 1rem;
              "
            >
              <h1
                style="
                  font-size: var(--text-6xl);
                  font-weight: var(--font-weight-semibold);
                  color: ${custom?.colors?.titleColor || "var(--foreground)"};
                  letter-spacing: -0.02em;
                  margin: 0;
                "
              >
                ERROR
              </h1>
            </div>
            <div
              style="
                height: 2px;
                background-color: var(--border);
                width: calc(100% + 3rem);
                margin-left: -1.5rem;
                margin-top: 1.5rem;
              "
            ></div>
          </div>

          <h2
            style="
              font-size: var(--text-2xl);
              font-weight: var(--font-weight-semibold);
              color: var(--foreground);
              margin: 0 0 1rem;
            "
          >
            Something went wrong
          </h2>

          <div
            style="
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                border: 2px solid var(--border);
                background-color: var(--muted);
                padding: 0.375rem 0.75rem;
                margin: 0 0 1rem;
                flex-wrap: wrap;
                justify-content: center;
            "
            >
            <span
                style="
                font-size: 0.75rem;
                color: var(--muted-foreground);
                font-weight: var(--font-weight-semibold);
                "
            >
                CODE:
            </span>
            <span
                style="
                font-size: var(--text-sm);
                font-family: var(--default-mono-font-family, monospace);
                color: var(--foreground);
                word-break: break-all;
                "
            >
                ${sanitize(code)}
            </span>
            </div>

          <p
            style="
              color: var(--muted-foreground);
              max-width: 28rem;
              margin: 0 auto;
              font-size: var(--text-sm);
              line-height: 1.5;
              text-wrap: pretty;
            "
          >
            ${!description ? `We encountered an unexpected error. Please try again or return to the home page. If you're a developer, you can find <a href='https://better-auth.com/docs/reference/errors/${encodeURIComponent(code)}' target='_blank' rel="noopener noreferrer" style='color: var(--foreground); text-decoration: underline;'>more information about the error</a>.` : description}
          </p>
        </div>

        <div
          style="
            display: flex;
            gap: 0.75rem;
            margin-top: 1.5rem;
            justify-content: center;
            flex-wrap: wrap;
          "
        >
          <a
            href="/"
            style="
              text-decoration: none;
            "
          >
            <div
              style="
                border: 2px solid var(--border);
                background: var(--primary);
                color: var(--primary-foreground);
                padding: 0.5rem 1rem;
                border-radius: 0;
                white-space: nowrap;
              "
              class="btn"
            >
              Go Home
            </div>
          </a>
          <a
            href="https://better-auth.com/docs/reference/errors/${encodeURIComponent(code)}?askai=${encodeURIComponent(`What does the error code ${code} mean?`)}"
            target="_blank"
            rel="noopener noreferrer"
            style="
              text-decoration: none;
            "
          >
            <div
              style="
                border: 2px solid var(--border);
                background: transparent;
                color: var(--foreground);
                padding: 0.5rem 1rem;
                border-radius: 0;
                white-space: nowrap;
              "
              class="btn"
            >
              Ask AI
            </div>
          </a>
        </div>
      </div>
    </div>
  </body>
</html>`;
};
var error = createAuthEndpoint("/error", {
	method: "GET",
	metadata: {
		...HIDE_METADATA,
		openapi: {
			description: "Displays an error page",
			responses: { "200": {
				description: "Success",
				content: { "text/html": { schema: {
					type: "string",
					description: "The HTML content of the error page"
				} } }
			} }
		}
	}
}, async (c) => {
	const url = new URL(c.request?.url || "");
	const unsanitizedCode = url.searchParams.get("error") || "UNKNOWN";
	const unsanitizedDescription = url.searchParams.get("error_description") || null;
	const safeCode = /^[\'A-Za-z0-9_-]+$/.test(unsanitizedCode || "") ? unsanitizedCode : "UNKNOWN";
	const safeDescription = unsanitizedDescription ? sanitize(unsanitizedDescription) : null;
	const queryParams = new URLSearchParams();
	queryParams.set("error", safeCode);
	if (unsanitizedDescription) queryParams.set("error_description", unsanitizedDescription);
	const options = c.context.options;
	const errorURL = options.onAPIError?.errorURL;
	if (errorURL) return new Response(null, {
		status: 302,
		headers: { Location: `${errorURL}${errorURL.includes("?") ? "&" : "?"}${queryParams.toString()}` }
	});
	if (isProduction && !options.onAPIError?.customizeDefaultErrorPage) return new Response(null, {
		status: 302,
		headers: { Location: `/?${queryParams.toString()}` }
	});
	return new Response(html(c.context.options, safeCode, safeDescription), { headers: { "Content-Type": "text/html" } });
});
var ok = createAuthEndpoint("/ok", {
	method: "GET",
	metadata: {
		...HIDE_METADATA,
		openapi: {
			description: "Check if the API is working",
			responses: { "200": {
				description: "API is working",
				content: { "application/json": { schema: {
					type: "object",
					properties: { ok: {
						type: "boolean",
						description: "Indicates if the API is working"
					} },
					required: ["ok"]
				} } }
			} }
		}
	}
}, async (ctx) => {
	return ctx.json({ ok: true });
});
async function validatePassword(ctx, data) {
	const credentialAccount = (await ctx.context.internalAdapter.findAccounts(data.userId))?.find((account) => account.providerId === "credential");
	const currentPassword = credentialAccount?.password;
	if (!credentialAccount || !currentPassword) return false;
	return await ctx.context.password.verify({
		hash: currentPassword,
		password: data.password
	});
}
async function checkPassword(userId, c) {
	const credentialAccount = (await c.context.internalAdapter.findAccounts(userId))?.find((account) => account.providerId === "credential");
	const currentPassword = credentialAccount?.password;
	const password = c.body.password;
	if (!credentialAccount || !currentPassword || !password) {
		if (password) await c.context.password.hash(password);
		throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
	}
	if (!await c.context.password.verify({
		hash: currentPassword,
		password
	})) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
	return true;
}
function redirectError(ctx, callbackURL, query) {
	const url = callbackURL ? new URL(callbackURL, ctx.baseURL) : new URL(`${ctx.baseURL}/error`);
	if (query) Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, v));
	return url.href;
}
function redirectCallback(ctx, callbackURL, query) {
	const url = new URL(callbackURL, ctx.baseURL);
	if (query) Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, v));
	return url.href;
}
var requestPasswordReset = createAuthEndpoint("/request-password-reset", {
	method: "POST",
	body: object({
		/**
		* The email address of the user to send a password reset email to.
		*/
		email: email().meta({ description: "The email address of the user to send a password reset email to" }),
		/**
		* The URL to redirect the user to reset their password.
		* If the token isn't valid or expired, it'll be redirected with a query parameter `?
		* error=INVALID_TOKEN`. If the token is valid, it'll be redirected with a query parameter `?
		* token=VALID_TOKEN
		*/
		redirectTo: string().meta({ description: "The URL to redirect the user to reset their password. If the token isn't valid or expired, it'll be redirected with a query parameter `?error=INVALID_TOKEN`. If the token is valid, it'll be redirected with a query parameter `?token=VALID_TOKEN" }).optional()
	}),
	metadata: { openapi: {
		operationId: "requestPasswordReset",
		description: "Send a password reset email to the user",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					status: { type: "boolean" },
					message: { type: "string" }
				}
			} } }
		} }
	} },
	use: [originCheck((ctx) => ctx.body.redirectTo)]
}, async (ctx) => {
	if (!ctx.context.options.emailAndPassword?.sendResetPassword) {
		ctx.context.logger.error("Reset password isn't enabled.Please pass an emailAndPassword.sendResetPassword function in your auth config!");
		throw APIError.from("BAD_REQUEST", {
			message: "Reset password isn't enabled",
			code: "RESET_PASSWORD_DISABLED"
		});
	}
	const { email, redirectTo } = ctx.body;
	const user = await ctx.context.internalAdapter.findUserByEmail(email, { includeAccounts: true });
	if (!user) {
		/**
		* We simulate the verification token generation and the database lookup
		* to mitigate timing attacks.
		*/
		generateId(24);
		await ctx.context.internalAdapter.findVerificationValue("dummy-verification-token");
		ctx.context.logger.warn("Reset Password: User not found");
		return ctx.json({
			status: true,
			message: "If this email exists in our system, check your email for the reset link"
		});
	}
	const expiresAt = getDate(ctx.context.options.emailAndPassword.resetPasswordTokenExpiresIn || 3600, "sec");
	const verificationToken = generateId(24);
	await ctx.context.internalAdapter.createVerificationValue({
		value: user.user.id,
		identifier: `reset-password:${verificationToken}`,
		expiresAt
	});
	const callbackURL = redirectTo ? encodeURIComponent(redirectTo) : "";
	const url = `${ctx.context.baseURL}/reset-password/${verificationToken}?callbackURL=${callbackURL}`;
	await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailAndPassword.sendResetPassword({
		user: user.user,
		url,
		token: verificationToken
	}, ctx.request));
	return ctx.json({
		status: true,
		message: "If this email exists in our system, check your email for the reset link"
	});
});
var requestPasswordResetCallback = createAuthEndpoint("/reset-password/:token", {
	method: "GET",
	operationId: "resetPasswordCallback",
	query: object({ callbackURL: string().meta({ description: "The URL to redirect the user to reset their password" }) }),
	use: [originCheck((ctx) => ctx.query.callbackURL)],
	metadata: { openapi: {
		operationId: "resetPasswordCallback",
		description: "Redirects the user to the callback URL with the token",
		parameters: [{
			name: "token",
			in: "path",
			required: true,
			description: "The token to reset the password",
			schema: { type: "string" }
		}, {
			name: "callbackURL",
			in: "query",
			required: true,
			description: "The URL to redirect the user to reset their password",
			schema: { type: "string" }
		}],
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { token: { type: "string" } }
			} } }
		} }
	} }
}, async (ctx) => {
	const { token } = ctx.params;
	const { callbackURL } = ctx.query;
	if (!token || !callbackURL) throw ctx.redirect(redirectError(ctx.context, callbackURL, { error: "INVALID_TOKEN" }));
	const verification = await ctx.context.internalAdapter.findVerificationValue(`reset-password:${token}`);
	if (!verification || verification.expiresAt < /* @__PURE__ */ new Date()) throw ctx.redirect(redirectError(ctx.context, callbackURL, { error: "INVALID_TOKEN" }));
	throw ctx.redirect(redirectCallback(ctx.context, callbackURL, { token }));
});
var resetPassword = createAuthEndpoint("/reset-password", {
	method: "POST",
	operationId: "resetPassword",
	query: object({ token: string().optional() }).optional(),
	body: object({
		newPassword: string().meta({ description: "The new password to set" }),
		token: string().meta({ description: "The token to reset the password" }).optional()
	}),
	metadata: { openapi: {
		operationId: "resetPassword",
		description: "Reset the password for a user",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { status: { type: "boolean" } }
			} } }
		} }
	} }
}, async (ctx) => {
	const token = ctx.body.token || ctx.query?.token;
	if (!token) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_TOKEN);
	const { newPassword } = ctx.body;
	const minLength = ctx.context.password?.config.minPasswordLength;
	const maxLength = ctx.context.password?.config.maxPasswordLength;
	if (newPassword.length < minLength) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_SHORT);
	if (newPassword.length > maxLength) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_LONG);
	const id = `reset-password:${token}`;
	const verification = await ctx.context.internalAdapter.consumeVerificationValue(id);
	if (!verification) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_TOKEN);
	const userId = verification.value;
	const hashedPassword = await ctx.context.password.hash(newPassword);
	if (!(await ctx.context.internalAdapter.findAccounts(userId)).find((ac) => ac.providerId === "credential")) await ctx.context.internalAdapter.createAccount({
		userId,
		providerId: "credential",
		password: hashedPassword,
		accountId: userId
	});
	else await ctx.context.internalAdapter.updatePassword(userId, hashedPassword);
	if (ctx.context.options.emailAndPassword?.onPasswordReset) {
		const user = await ctx.context.internalAdapter.findUserById(userId);
		if (user) await ctx.context.options.emailAndPassword.onPasswordReset({ user }, ctx.request);
	}
	if (ctx.context.options.emailAndPassword?.revokeSessionsOnPasswordReset) await ctx.context.internalAdapter.deleteUserSessions(userId);
	return ctx.json({ status: true });
});
var verifyPassword$1 = createAuthEndpoint("/verify-password", {
	method: "POST",
	body: object({ 
	/**
	* The password to verify
	*/
password: string().meta({ description: "The password to verify" }) }),
	metadata: {
		scope: "server",
		openapi: {
			operationId: "verifyPassword",
			description: "Verify the current user's password",
			responses: { "200": {
				description: "Success",
				content: { "application/json": { schema: {
					type: "object",
					properties: { status: { type: "boolean" } }
				} } }
			} }
		}
	},
	use: [sensitiveSessionMiddleware]
}, async (ctx) => {
	const { password } = ctx.body;
	const session = ctx.context.session;
	if (!await validatePassword(ctx, {
		password,
		userId: session.user.id
	})) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
	return ctx.json({ status: true });
});
var socialSignInBodySchema = object({
	/**
	* Callback URL to redirect to after the user
	* has signed in.
	*/
	callbackURL: string().meta({ description: "Callback URL to redirect to after the user has signed in" }).optional(),
	/**
	* callback url to redirect if the user is newly registered.
	*
	* useful if you have different routes for existing users and new users
	*/
	newUserCallbackURL: string().optional(),
	/**
	* Callback url to redirect to if an error happens
	*
	* If it's initiated from the client sdk this defaults to
	* the current url.
	*/
	errorCallbackURL: string().meta({ description: "Callback URL to redirect to if an error happens" }).optional(),
	/**
	* OAuth2 provider to use`
	*/
	provider: SocialProviderListEnum,
	/**
	* Disable automatic redirection to the provider
	*
	* This is useful if you want to handle the redirection
	* yourself like in a popup or a different tab.
	*/
	disableRedirect: boolean().meta({ description: "Disable automatic redirection to the provider. Useful for handling the redirection yourself" }).optional(),
	/**
	* ID token from the provider
	*
	* This is used to sign in the user
	* if the user is already signed in with the
	* provider in the frontend.
	*
	* Only applicable if the provider supports
	* it. Currently only `apple` and `google` is
	* supported out of the box.
	*/
	idToken: optional(object({
		/**
		* ID token from the provider
		*/
		token: string().meta({ description: "ID token from the provider" }),
		/**
		* The nonce used to generate the token
		*/
		nonce: string().meta({ description: "Nonce used to generate the token" }).optional(),
		/**
		* Access token from the provider
		*/
		accessToken: string().meta({ description: "Access token from the provider" }).optional(),
		/**
		* Refresh token from the provider
		*/
		refreshToken: string().meta({ description: "Refresh token from the provider" }).optional(),
		/**
		* Expiry date of the token
		*/
		expiresAt: number().meta({ description: "Expiry date of the token" }).optional(),
		/**
		* The user object from the provider.
		* This is only available for some providers like Apple.
		*/
		user: object({
			name: object({
				firstName: string().optional(),
				lastName: string().optional()
			}).optional(),
			email: string().optional()
		}).meta({ description: "The user object from the provider. Only available for some providers like Apple." }).optional()
	})),
	scopes: array(string()).meta({ description: "Array of scopes to request from the provider. This will override the default scopes passed." }).optional(),
	/**
	* Explicitly request sign-up
	*
	* Should be used to allow sign up when
	* disableImplicitSignUp for this provider is
	* true
	*/
	requestSignUp: boolean().meta({ description: "Explicitly request sign-up. Useful when disableImplicitSignUp is true for this provider" }).optional(),
	/**
	* The login hint to use for the authorization code request
	*/
	loginHint: string().meta({ description: "The login hint to use for the authorization code request" }).optional(),
	/**
	* Additional data to be passed through the OAuth flow
	*/
	additionalData: record(string(), any()).optional().meta({ description: "Additional data to be passed through the OAuth flow" })
});
var signInSocial = () => createAuthEndpoint("/sign-in/social", {
	method: "POST",
	operationId: "socialSignIn",
	body: socialSignInBodySchema,
	metadata: {
		$Infer: {
			body: {},
			returned: {}
		},
		openapi: {
			description: "Sign in with a social provider",
			operationId: "socialSignIn",
			responses: { "200": {
				description: "Success - Returns session details (idToken branch) or an authorize URL (redirect branch)",
				content: { "application/json": { schema: {
					type: "object",
					description: "Returns session details when idToken is provided, or an authorize URL otherwise",
					properties: {
						token: { type: "string" },
						user: {
							type: "object",
							$ref: "#/components/schemas/User"
						},
						url: { type: "string" },
						redirect: { type: "boolean" }
					},
					required: ["redirect"]
				} } }
			} }
		}
	}
}, async (c) => {
	const provider = await getAwaitableValue(c.context.socialProviders, { value: c.body.provider });
	if (!provider) {
		c.context.logger.error("Provider not found. Make sure to add the provider in your auth config", { provider: c.body.provider });
		throw APIError.from("NOT_FOUND", BASE_ERROR_CODES.PROVIDER_NOT_FOUND);
	}
	if (c.body.idToken) {
		if (!provider.verifyIdToken) {
			c.context.logger.error("Provider does not support id token verification", { provider: c.body.provider });
			throw APIError.from("NOT_FOUND", BASE_ERROR_CODES.ID_TOKEN_NOT_SUPPORTED);
		}
		const { token, nonce } = c.body.idToken;
		if (!await provider.verifyIdToken(token, nonce, c)) {
			c.context.logger.warn("Invalid id token", { provider: c.body.provider });
			throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.INVALID_TOKEN);
		}
		const userInfo = await provider.getUserInfo({
			idToken: token,
			accessToken: c.body.idToken.accessToken,
			refreshToken: c.body.idToken.refreshToken,
			user: c.body.idToken.user
		});
		if (!userInfo || !userInfo?.user) {
			c.context.logger.error("Failed to get user info", { provider: c.body.provider });
			throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO);
		}
		if (!userInfo.user.email) {
			c.context.logger.error(missingEmailLogMessage(c.body.provider, { source: "id_token" }), { provider: c.body.provider });
			throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.USER_EMAIL_NOT_FOUND);
		}
		const data = await handleOAuthUserInfo(c, {
			userInfo: {
				...userInfo.user,
				email: userInfo.user.email,
				id: String(userInfo.user.id),
				name: userInfo.user.name || "",
				image: userInfo.user.image,
				emailVerified: userInfo.user.emailVerified || false
			},
			account: {
				providerId: provider.id,
				accountId: String(userInfo.user.id),
				accessToken: c.body.idToken.accessToken
			},
			callbackURL: c.body.callbackURL,
			disableSignUp: provider.disableImplicitSignUp && !c.body.requestSignUp || provider.disableSignUp
		});
		if (data.error) throw APIError.from("UNAUTHORIZED", {
			message: data.error,
			code: "OAUTH_LINK_ERROR"
		});
		await setSessionCookie(c, data.data);
		return c.json({
			redirect: false,
			token: data.data.session.token,
			url: void 0,
			user: parseUserOutput(c.context.options, data.data.user)
		});
	}
	const { codeVerifier, state } = await generateState(c, void 0, c.body.additionalData);
	const url = await provider.createAuthorizationURL({
		state,
		codeVerifier,
		redirectURI: `${c.context.baseURL}/callback/${provider.id}`,
		scopes: c.body.scopes,
		loginHint: c.body.loginHint
	});
	if (!c.body.disableRedirect) c.setHeader("Location", url.toString());
	return c.json({
		url: url.toString(),
		redirect: !c.body.disableRedirect
	});
});
var signInEmail = () => createAuthEndpoint("/sign-in/email", {
	method: "POST",
	operationId: "signInEmail",
	use: [formCsrfMiddleware],
	cloneRequest: true,
	body: object({
		/**
		* Email of the user
		*/
		email: string().meta({ description: "Email of the user" }),
		/**
		* Password of the user
		*/
		password: string().meta({ description: "Password of the user" }),
		/**
		* Callback URL to use as a redirect for email
		* verification and for possible redirects
		*/
		callbackURL: string().meta({ description: "Callback URL to use as a redirect for email verification" }).optional(),
		/**
		* If this is false, the session will not be remembered
		* @default true
		*/
		rememberMe: boolean().meta({ description: "If this is false, the session will not be remembered. Default is `true`." }).default(true).optional()
	}),
	metadata: {
		allowedMediaTypes: ["application/x-www-form-urlencoded", "application/json"],
		$Infer: {
			body: {},
			returned: {}
		},
		openapi: {
			operationId: "signInEmail",
			description: "Sign in with email and password",
			responses: { "200": {
				description: "Success - Returns either session details or redirect URL",
				content: { "application/json": { schema: {
					type: "object",
					description: "Session response when idToken is provided",
					properties: {
						redirect: {
							type: "boolean",
							enum: [false]
						},
						token: {
							type: "string",
							description: "Session token"
						},
						url: {
							type: "string",
							nullable: true
						},
						user: {
							type: "object",
							$ref: "#/components/schemas/User"
						}
					},
					required: [
						"redirect",
						"token",
						"user"
					]
				} } }
			} }
		}
	}
}, async (ctx) => {
	if (!ctx.context.options?.emailAndPassword?.enabled) {
		ctx.context.logger.error("Email and password is not enabled. Make sure to enable it in the options on you `auth.ts` file. Check `https://better-auth.com/docs/authentication/email-password` for more!");
		throw APIError.from("BAD_REQUEST", {
			code: "EMAIL_PASSWORD_DISABLED",
			message: "Email and password is not enabled"
		});
	}
	const { email: email$1, password } = ctx.body;
	if (!email().safeParse(email$1).success) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_EMAIL);
	const user = await ctx.context.internalAdapter.findUserByEmail(email$1, { includeAccounts: true });
	if (!user) {
		await ctx.context.password.hash(password);
		ctx.context.logger.warn("User not found");
		throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD);
	}
	const credentialAccount = user.accounts.find((a) => a.providerId === "credential");
	if (!credentialAccount) {
		await ctx.context.password.hash(password);
		ctx.context.logger.warn("Credential account not found");
		throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD);
	}
	const currentPassword = credentialAccount?.password;
	if (!currentPassword) {
		await ctx.context.password.hash(password);
		ctx.context.logger.warn("Password not found");
		throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD);
	}
	if (!await ctx.context.password.verify({
		hash: currentPassword,
		password
	})) {
		ctx.context.logger.warn("Invalid password");
		throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.INVALID_EMAIL_OR_PASSWORD);
	}
	if (ctx.context.options?.emailAndPassword?.requireEmailVerification && !user.user.emailVerified) {
		if (!ctx.context.options?.emailVerification?.sendVerificationEmail) throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.EMAIL_NOT_VERIFIED);
		if (ctx.context.options?.emailVerification?.sendOnSignIn) {
			const token = await createEmailVerificationToken(ctx.context.secret, user.user.email, void 0, ctx.context.options.emailVerification?.expiresIn);
			const callbackURL = ctx.body.callbackURL ? encodeURIComponent(ctx.body.callbackURL) : encodeURIComponent("/");
			const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
			await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
				user: user.user,
				url,
				token
			}, safeCloneRequest(ctx.request)));
		}
		throw APIError.from("FORBIDDEN", BASE_ERROR_CODES.EMAIL_NOT_VERIFIED);
	}
	const session = await ctx.context.internalAdapter.createSession(user.user.id, ctx.body.rememberMe === false);
	if (!session) {
		ctx.context.logger.error("Failed to create session");
		throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
	}
	await setSessionCookie(ctx, {
		session,
		user: user.user
	}, ctx.body.rememberMe === false);
	if (ctx.body.callbackURL) ctx.setHeader("Location", ctx.body.callbackURL);
	return ctx.json({
		redirect: !!ctx.body.callbackURL,
		token: session.token,
		url: ctx.body.callbackURL,
		user: parseUserOutput(ctx.context.options, user.user)
	});
});
var signOut = createAuthEndpoint("/sign-out", {
	method: "POST",
	operationId: "signOut",
	requireHeaders: true,
	metadata: { openapi: {
		operationId: "signOut",
		description: "Sign out the current user",
		responses: { "200": {
			description: "Success",
			content: { "application/json": { schema: {
				type: "object",
				properties: { success: { type: "boolean" } }
			} } }
		} }
	} }
}, async (ctx) => {
	const sessionCookieToken = await ctx.getSignedCookie(ctx.context.authCookies.sessionToken.name, ctx.context.secret);
	if (sessionCookieToken) try {
		await ctx.context.internalAdapter.deleteSession(sessionCookieToken);
	} catch (e) {
		ctx.context.logger.error("Failed to delete session from database", e);
	}
	deleteSessionCookie(ctx);
	return ctx.json({ success: true });
});
var signUpEmailBodySchema = object({
	name: string(),
	email: email(),
	password: string().nonempty(),
	image: string().optional(),
	callbackURL: string().optional(),
	rememberMe: boolean().optional()
}).and(record(string(), any()));
var signUpEmail = () => createAuthEndpoint("/sign-up/email", {
	method: "POST",
	operationId: "signUpWithEmailAndPassword",
	use: [formCsrfMiddleware],
	body: signUpEmailBodySchema,
	cloneRequest: true,
	metadata: {
		allowedMediaTypes: ["application/x-www-form-urlencoded", "application/json"],
		$Infer: {
			body: {},
			returned: {}
		},
		openapi: {
			operationId: "signUpWithEmailAndPassword",
			description: "Sign up a user using email and password",
			requestBody: { content: { "application/json": { schema: {
				type: "object",
				properties: {
					name: {
						type: "string",
						description: "The name of the user"
					},
					email: {
						type: "string",
						description: "The email of the user"
					},
					password: {
						type: "string",
						description: "The password of the user"
					},
					image: {
						type: "string",
						description: "The profile image URL of the user"
					},
					callbackURL: {
						type: "string",
						description: "The URL to use for email verification callback"
					},
					rememberMe: {
						type: "boolean",
						description: "If this is false, the session will not be remembered. Default is `true`."
					}
				},
				required: [
					"name",
					"email",
					"password"
				]
			} } } },
			responses: {
				"200": {
					description: "Successfully created user",
					content: { "application/json": { schema: {
						type: "object",
						properties: {
							token: {
								type: "string",
								nullable: true,
								description: "Authentication token for the session"
							},
							user: {
								type: "object",
								properties: {
									id: {
										type: "string",
										description: "The unique identifier of the user"
									},
									email: {
										type: "string",
										format: "email",
										description: "The email address of the user"
									},
									name: {
										type: "string",
										description: "The name of the user"
									},
									image: {
										type: "string",
										format: "uri",
										nullable: true,
										description: "The profile image URL of the user"
									},
									emailVerified: {
										type: "boolean",
										description: "Whether the email has been verified"
									},
									createdAt: {
										type: "string",
										format: "date-time",
										description: "When the user was created"
									},
									updatedAt: {
										type: "string",
										format: "date-time",
										description: "When the user was last updated"
									}
								},
								required: [
									"id",
									"email",
									"name",
									"emailVerified",
									"createdAt",
									"updatedAt"
								]
							}
						},
						required: ["user"]
					} } }
				},
				"422": {
					description: "Unprocessable Entity. User already exists or failed to create user.",
					content: { "application/json": { schema: {
						type: "object",
						properties: { message: { type: "string" } }
					} } }
				}
			}
		}
	}
}, async (ctx) => {
	return runWithTransaction(ctx.context.adapter, async () => {
		if (!ctx.context.options.emailAndPassword?.enabled || ctx.context.options.emailAndPassword?.disableSignUp) throw APIError.from("BAD_REQUEST", {
			message: "Email and password sign up is not enabled",
			code: "EMAIL_PASSWORD_SIGN_UP_DISABLED"
		});
		const body = ctx.body;
		const { name, email: email$2, password, image, callbackURL: _callbackURL, rememberMe, ...rest } = body;
		if (!email().safeParse(email$2).success) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_EMAIL);
		if (!password || typeof password !== "string") throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
		const minPasswordLength = ctx.context.password.config.minPasswordLength;
		if (password.length < minPasswordLength) {
			ctx.context.logger.warn("Password is too short");
			throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_SHORT);
		}
		const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
		if (password.length > maxPasswordLength) {
			ctx.context.logger.warn("Password is too long");
			throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_LONG);
		}
		const shouldReturnGenericDuplicateResponse = ctx.context.options.emailAndPassword.requireEmailVerification || ctx.context.options.emailAndPassword.autoSignIn === false;
		const shouldSkipAutoSignIn = ctx.context.options.emailAndPassword.autoSignIn === false || shouldReturnGenericDuplicateResponse;
		const additionalUserFields = parseUserInput(ctx.context.options, rest, "create");
		const normalizedEmail = email$2.toLowerCase();
		const dbUser = await ctx.context.internalAdapter.findUserByEmail(normalizedEmail);
		if (dbUser?.user) {
			ctx.context.logger.info(`Sign-up attempt for existing email: ${email$2}`);
			if (shouldReturnGenericDuplicateResponse) {
				/**
				* Hash the password to reduce timing differences
				* between existing and non-existing emails.
				*/
				await ctx.context.password.hash(password);
				if (ctx.context.options.emailAndPassword?.onExistingUserSignUp) await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailAndPassword.onExistingUserSignUp({ user: dbUser.user }, safeCloneRequest(ctx.request)));
				const now = /* @__PURE__ */ new Date();
				const generatedId = ctx.context.generateId({ model: "user" }) || generateId();
				const coreFields = {
					name,
					email: normalizedEmail,
					emailVerified: false,
					image: image ?? null,
					createdAt: now,
					updatedAt: now
				};
				const customSyntheticUser = ctx.context.options.emailAndPassword?.customSyntheticUser;
				let syntheticUser;
				if (customSyntheticUser) {
					const additionalFieldKeys = Object.keys(ctx.context.options.user?.additionalFields ?? {});
					const additionalFields = {};
					for (const key of additionalFieldKeys) if (key in additionalUserFields) additionalFields[key] = additionalUserFields[key];
					const customResult = customSyntheticUser({
						coreFields,
						additionalFields,
						id: generatedId
					});
					syntheticUser = buildSyntheticUserOutput(ctx.context.options, customResult);
				} else syntheticUser = buildSyntheticUserOutput(ctx.context.options, {
					...coreFields,
					...additionalUserFields,
					id: generatedId
				});
				return ctx.json({
					token: null,
					user: parseUserOutput(ctx.context.options, syntheticUser)
				});
			}
			throw APIError.from("UNPROCESSABLE_ENTITY", BASE_ERROR_CODES.USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL);
		}
		/**
		* Hash the password
		*
		* This is done prior to creating the user
		* to ensure that any plugin that
		* may break the hashing should break
		* before the user is created.
		*/
		const hash = await ctx.context.password.hash(password);
		let createdUser;
		try {
			createdUser = await ctx.context.internalAdapter.createUser({
				email: normalizedEmail,
				name,
				image,
				...additionalUserFields,
				emailVerified: false
			});
			if (!createdUser) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.FAILED_TO_CREATE_USER);
		} catch (e) {
			if (isDevelopment()) ctx.context.logger.error("Failed to create user", e);
			if (isAPIError(e)) throw e;
			ctx.context.logger?.error("Failed to create user", e);
			throw APIError.from("UNPROCESSABLE_ENTITY", BASE_ERROR_CODES.FAILED_TO_CREATE_USER);
		}
		if (!createdUser) throw APIError.from("UNPROCESSABLE_ENTITY", BASE_ERROR_CODES.FAILED_TO_CREATE_USER);
		await ctx.context.internalAdapter.linkAccount({
			userId: createdUser.id,
			providerId: "credential",
			accountId: createdUser.id,
			password: hash
		});
		if (ctx.context.options.emailVerification?.sendOnSignUp ?? ctx.context.options.emailAndPassword.requireEmailVerification) {
			const token = await createEmailVerificationToken(ctx.context.secret, createdUser.email, void 0, ctx.context.options.emailVerification?.expiresIn);
			const callbackURL = body.callbackURL ? encodeURIComponent(body.callbackURL) : encodeURIComponent("/");
			const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${callbackURL}`;
			if (ctx.context.options.emailVerification?.sendVerificationEmail) await ctx.context.runInBackgroundOrAwait(ctx.context.options.emailVerification.sendVerificationEmail({
				user: createdUser,
				url,
				token
			}, safeCloneRequest(ctx.request)));
		}
		if (shouldSkipAutoSignIn) return ctx.json({
			token: null,
			user: parseUserOutput(ctx.context.options, createdUser)
		});
		const session = await ctx.context.internalAdapter.createSession(createdUser.id, rememberMe === false);
		if (!session) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION);
		await setSessionCookie(ctx, {
			session,
			user: createdUser
		}, rememberMe === false);
		return ctx.json({
			token: session.token,
			user: parseUserOutput(ctx.context.options, createdUser)
		});
	});
});
var updateSessionBodySchema = record(string().meta({ description: "Field name must be a string" }), any());
var updateSession = () => createAuthEndpoint("/update-session", {
	method: "POST",
	operationId: "updateSession",
	body: updateSessionBodySchema,
	use: [sessionMiddleware],
	metadata: {
		$Infer: { body: {} },
		openapi: {
			operationId: "updateSession",
			description: "Update the current session",
			responses: { "200": {
				description: "Success",
				content: { "application/json": { schema: {
					type: "object",
					properties: { session: {
						type: "object",
						$ref: "#/components/schemas/Session"
					} }
				} } }
			} }
		}
	}
}, async (ctx) => {
	const body = ctx.body;
	if (typeof body !== "object" || Array.isArray(body)) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.BODY_MUST_BE_AN_OBJECT);
	const session = ctx.context.session;
	const additionalFields = parseSessionInput(ctx.context.options, body, "update");
	if (Object.keys(additionalFields).length === 0) throw APIError.fromStatus("BAD_REQUEST", { message: "No fields to update" });
	const updatedSession = await ctx.context.internalAdapter.updateSession(session.session.token, {
		...additionalFields,
		updatedAt: /* @__PURE__ */ new Date()
	});
	if (!updatedSession && isStateful(ctx)) {
		deleteSessionCookie(ctx);
		throw APIError.from("UNAUTHORIZED", BASE_ERROR_CODES.FAILED_TO_GET_SESSION);
	}
	const newSession = updatedSession ?? {
		...session.session,
		...additionalFields,
		updatedAt: /* @__PURE__ */ new Date()
	};
	await setSessionCookie(ctx, {
		session: newSession,
		user: session.user
	});
	return ctx.json({ session: parseSessionOutput(ctx.context.options, newSession) });
});
var updateUserBodySchema = record(string().meta({ description: "Field name must be a string" }), any());
var updateUser = () => createAuthEndpoint("/update-user", {
	method: "POST",
	operationId: "updateUser",
	body: updateUserBodySchema,
	use: [sessionMiddleware],
	metadata: {
		$Infer: { body: {} },
		openapi: {
			operationId: "updateUser",
			description: "Update the current user",
			requestBody: { content: { "application/json": { schema: {
				type: "object",
				properties: {
					name: {
						type: "string",
						description: "The name of the user"
					},
					image: {
						type: "string",
						description: "The image of the user",
						nullable: true
					}
				}
			} } } },
			responses: { "200": {
				description: "Success",
				content: { "application/json": { schema: {
					type: "object",
					properties: { user: {
						type: "object",
						$ref: "#/components/schemas/User"
					} }
				} } }
			} }
		}
	}
}, async (ctx) => {
	const body = ctx.body;
	if (typeof body !== "object" || Array.isArray(body)) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.BODY_MUST_BE_AN_OBJECT);
	if (body.email) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.EMAIL_CAN_NOT_BE_UPDATED);
	const { name, image, ...rest } = body;
	const session = ctx.context.session;
	const additionalFields = parseUserInput(ctx.context.options, rest, "update");
	if (image === void 0 && name === void 0 && Object.keys(additionalFields).length === 0) throw APIError.fromStatus("BAD_REQUEST", { message: "No fields to update" });
	const updatedUser = await ctx.context.internalAdapter.updateUser(session.user.id, {
		name,
		image,
		...additionalFields
	}) ?? {
		...session.user,
		...name !== void 0 && { name },
		...image !== void 0 && { image },
		...additionalFields
	};
	/**
	* Update the session cookie with the new user data
	*/
	await setSessionCookie(ctx, {
		session: session.session,
		user: updatedUser
	});
	return ctx.json({ status: true });
});
var changePassword = createAuthEndpoint("/change-password", {
	method: "POST",
	operationId: "changePassword",
	body: object({
		/**
		* The new password to set
		*/
		newPassword: string().meta({ description: "The new password to set" }),
		/**
		* The current password of the user
		*/
		currentPassword: string().meta({ description: "The current password is required" }),
		/**
		* revoke all sessions that are not the
		* current one logged in by the user
		*/
		revokeOtherSessions: boolean().meta({ description: "Must be a boolean value" }).optional()
	}),
	use: [sensitiveSessionMiddleware],
	metadata: { openapi: {
		operationId: "changePassword",
		description: "Change the password of the user",
		responses: { "200": {
			description: "Password successfully changed",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					token: {
						type: "string",
						nullable: true,
						description: "New session token if other sessions were revoked"
					},
					user: {
						type: "object",
						properties: {
							id: {
								type: "string",
								description: "The unique identifier of the user"
							},
							email: {
								type: "string",
								format: "email",
								description: "The email address of the user"
							},
							name: {
								type: "string",
								description: "The name of the user"
							},
							image: {
								type: "string",
								format: "uri",
								nullable: true,
								description: "The profile image URL of the user"
							},
							emailVerified: {
								type: "boolean",
								description: "Whether the email has been verified"
							},
							createdAt: {
								type: "string",
								format: "date-time",
								description: "When the user was created"
							},
							updatedAt: {
								type: "string",
								format: "date-time",
								description: "When the user was last updated"
							}
						},
						required: [
							"id",
							"email",
							"name",
							"emailVerified",
							"createdAt",
							"updatedAt"
						]
					}
				},
				required: ["user"]
			} } }
		} }
	} }
}, async (ctx) => {
	const { newPassword, currentPassword, revokeOtherSessions } = ctx.body;
	const session = ctx.context.session;
	const minPasswordLength = ctx.context.password.config.minPasswordLength;
	if (newPassword.length < minPasswordLength) {
		ctx.context.logger.warn("Password is too short");
		throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_SHORT);
	}
	const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
	if (newPassword.length > maxPasswordLength) {
		ctx.context.logger.warn("Password is too long");
		throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_LONG);
	}
	const account = (await ctx.context.internalAdapter.findAccounts(session.user.id)).find((account) => account.providerId === "credential" && account.password);
	if (!account || !account.password) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.CREDENTIAL_ACCOUNT_NOT_FOUND);
	const passwordHash = await ctx.context.password.hash(newPassword);
	if (!await ctx.context.password.verify({
		hash: account.password,
		password: currentPassword
	})) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
	await ctx.context.internalAdapter.updateAccount(account.id, { password: passwordHash });
	let token = null;
	if (revokeOtherSessions) {
		await ctx.context.internalAdapter.deleteUserSessions(session.user.id);
		const newSession = await ctx.context.internalAdapter.createSession(session.user.id);
		if (!newSession) throw APIError.from("INTERNAL_SERVER_ERROR", BASE_ERROR_CODES.FAILED_TO_GET_SESSION);
		await setSessionCookie(ctx, {
			session: newSession,
			user: session.user
		});
		token = newSession.token;
	}
	return ctx.json({
		token,
		user: parseUserOutput(ctx.context.options, session.user)
	});
});
var setPassword = createAuthEndpoint.serverOnly({
	method: "POST",
	body: object({ 
	/**
	* The new password to set
	*/
newPassword: string().meta({ description: "The new password to set is required" }) }),
	use: [sensitiveSessionMiddleware]
}, async (ctx) => {
	const { newPassword } = ctx.body;
	const session = ctx.context.session;
	const minPasswordLength = ctx.context.password.config.minPasswordLength;
	if (newPassword.length < minPasswordLength) {
		ctx.context.logger.warn("Password is too short");
		throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_SHORT);
	}
	const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
	if (newPassword.length > maxPasswordLength) {
		ctx.context.logger.warn("Password is too long");
		throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_TOO_LONG);
	}
	const account = (await ctx.context.internalAdapter.findAccounts(session.user.id)).find((account) => account.providerId === "credential" && account.password);
	const passwordHash = await ctx.context.password.hash(newPassword);
	if (!account) {
		await ctx.context.internalAdapter.linkAccount({
			userId: session.user.id,
			providerId: "credential",
			accountId: session.user.id,
			password: passwordHash
		});
		return ctx.json({ status: true });
	}
	throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.PASSWORD_ALREADY_SET);
});
var deleteUser = createAuthEndpoint("/delete-user", {
	method: "POST",
	use: [sensitiveSessionMiddleware],
	body: object({
		/**
		* The callback URL to redirect to after the user is deleted
		* this is only used on delete user callback
		*/
		callbackURL: string().meta({ description: "The callback URL to redirect to after the user is deleted" }).optional(),
		/**
		* The password of the user. If the password isn't provided, session freshness
		* will be checked.
		*/
		password: string().meta({ description: "The password of the user is required to delete the user" }).optional(),
		/**
		* The token to delete the user. If the token is provided, the user will be deleted
		*/
		token: string().meta({ description: "The token to delete the user is required" }).optional()
	}),
	metadata: { openapi: {
		operationId: "deleteUser",
		description: "Delete the user",
		requestBody: { content: { "application/json": { schema: {
			type: "object",
			properties: {
				callbackURL: {
					type: "string",
					description: "The callback URL to redirect to after the user is deleted"
				},
				password: {
					type: "string",
					description: "The user's password. Required if session is not fresh"
				},
				token: {
					type: "string",
					description: "The deletion verification token"
				}
			}
		} } } },
		responses: { "200": {
			description: "User deletion processed successfully",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					success: {
						type: "boolean",
						description: "Indicates if the operation was successful"
					},
					message: {
						type: "string",
						enum: ["User deleted", "Verification email sent"],
						description: "Status message of the deletion process"
					}
				},
				required: ["success", "message"]
			} } }
		} }
	} }
}, async (ctx) => {
	if (!ctx.context.options.user?.deleteUser?.enabled) {
		ctx.context.logger.error("Delete user is disabled. Enable it in the options");
		throw APIError.fromStatus("NOT_FOUND");
	}
	const session = ctx.context.session;
	if (ctx.body.password) {
		const account = (await ctx.context.internalAdapter.findAccounts(session.user.id)).find((account) => account.providerId === "credential" && account.password);
		if (!account || !account.password) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.CREDENTIAL_ACCOUNT_NOT_FOUND);
		if (!await ctx.context.password.verify({
			hash: account.password,
			password: ctx.body.password
		})) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.INVALID_PASSWORD);
	}
	if (ctx.body.token) {
		await deleteUserCallback({
			...ctx,
			query: { token: ctx.body.token }
		});
		return ctx.json({
			success: true,
			message: "User deleted"
		});
	}
	if (ctx.context.options.user.deleteUser?.sendDeleteAccountVerification) {
		const token = generateRandomString(32, "0-9", "a-z");
		await ctx.context.internalAdapter.createVerificationValue({
			value: session.user.id,
			identifier: `delete-account-${token}`,
			expiresAt: new Date(Date.now() + (ctx.context.options.user.deleteUser?.deleteTokenExpiresIn || 86400) * 1e3)
		});
		const url = `${ctx.context.baseURL}/delete-user/callback?token=${token}&callbackURL=${encodeURIComponent(ctx.body.callbackURL || "/")}`;
		await ctx.context.runInBackgroundOrAwait(ctx.context.options.user.deleteUser.sendDeleteAccountVerification({
			user: session.user,
			url,
			token
		}, ctx.request));
		return ctx.json({
			success: true,
			message: "Verification email sent"
		});
	}
	if (!ctx.body.password && ctx.context.sessionConfig.freshAge !== 0) {
		const createdAt = new Date(session.session.createdAt).getTime();
		const freshAge = ctx.context.sessionConfig.freshAge * 1e3;
		if (Date.now() - createdAt >= freshAge) throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.SESSION_EXPIRED);
	}
	const beforeDelete = ctx.context.options.user.deleteUser?.beforeDelete;
	if (beforeDelete) await beforeDelete(session.user, ctx.request);
	await ctx.context.internalAdapter.deleteUser(session.user.id);
	await ctx.context.internalAdapter.deleteUserSessions(session.user.id);
	deleteSessionCookie(ctx);
	const afterDelete = ctx.context.options.user.deleteUser?.afterDelete;
	if (afterDelete) await afterDelete(session.user, ctx.request);
	return ctx.json({
		success: true,
		message: "User deleted"
	});
});
var deleteUserCallback = createAuthEndpoint("/delete-user/callback", {
	method: "GET",
	query: object({
		token: string().meta({ description: "The token to verify the deletion request" }),
		callbackURL: string().meta({ description: "The URL to redirect to after deletion" }).optional()
	}),
	use: [originCheck((ctx) => ctx.query.callbackURL)],
	metadata: { openapi: {
		description: "Callback to complete user deletion with verification token",
		responses: { "200": {
			description: "User successfully deleted",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					success: {
						type: "boolean",
						description: "Indicates if the deletion was successful"
					},
					message: {
						type: "string",
						enum: ["User deleted"],
						description: "Confirmation message"
					}
				},
				required: ["success", "message"]
			} } }
		} }
	} }
}, async (ctx) => {
	if (!ctx.context.options.user?.deleteUser?.enabled) {
		ctx.context.logger.error("Delete user is disabled. Enable it in the options");
		throw APIError.from("NOT_FOUND", {
			message: "Not found",
			code: "NOT_FOUND"
		});
	}
	const session = await getSessionFromCtx(ctx, { disableCookieCache: isStateful(ctx) });
	if (!session) throw APIError.from("NOT_FOUND", BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO);
	const token = await ctx.context.internalAdapter.consumeVerificationValue(`delete-account-${ctx.query.token}`);
	if (!token || token.value !== session.user.id) throw APIError.from("NOT_FOUND", BASE_ERROR_CODES.INVALID_TOKEN);
	const beforeDelete = ctx.context.options.user.deleteUser?.beforeDelete;
	if (beforeDelete) await beforeDelete(session.user, ctx.request);
	await ctx.context.internalAdapter.deleteUser(session.user.id);
	await ctx.context.internalAdapter.deleteUserSessions(session.user.id);
	await ctx.context.internalAdapter.deleteAccounts(session.user.id);
	deleteSessionCookie(ctx);
	const afterDelete = ctx.context.options.user.deleteUser?.afterDelete;
	if (afterDelete) await afterDelete(session.user, ctx.request);
	if (ctx.query.callbackURL) throw ctx.redirect(ctx.query.callbackURL || "/");
	return ctx.json({
		success: true,
		message: "User deleted"
	});
});
var changeEmail = createAuthEndpoint("/change-email", {
	method: "POST",
	body: object({
		newEmail: email().meta({ description: "The new email address to set must be a valid email address" }),
		callbackURL: string().meta({ description: "The URL to redirect to after email verification" }).optional()
	}),
	use: [sensitiveSessionMiddleware],
	metadata: { openapi: {
		operationId: "changeEmail",
		responses: { "200": {
			description: "Email change request processed successfully",
			content: { "application/json": { schema: {
				type: "object",
				properties: {
					user: {
						type: "object",
						$ref: "#/components/schemas/User"
					},
					status: {
						type: "boolean",
						description: "Indicates if the request was successful"
					},
					message: {
						type: "string",
						enum: ["Email updated", "Verification email sent"],
						description: "Status message of the email change process",
						nullable: true
					}
				},
				required: ["status"]
			} } }
		} }
	} }
}, async (ctx) => {
	if (!ctx.context.options.user?.changeEmail?.enabled) {
		ctx.context.logger.error("Change email is disabled.");
		throw APIError.from("BAD_REQUEST", BASE_ERROR_CODES.CHANGE_EMAIL_DISABLED);
	}
	const newEmail = ctx.body.newEmail.toLowerCase();
	if (newEmail === ctx.context.session.user.email) {
		ctx.context.logger.warn("Email is the same");
		throw APIError.fromStatus("BAD_REQUEST", { message: "Email is the same" });
	}
	/**
	* Early config check: ensure at least one email-change flow is
	* available for the current session state. Without this, an
	* existing-email lookup would return 200 while a non-existing
	* email would later throw 400, leaking email existence.
	*/
	const canUpdateWithoutVerification = ctx.context.session.user.emailVerified !== true && ctx.context.options.user.changeEmail.updateEmailWithoutVerification;
	const canSendVerification = ctx.context.options.emailVerification?.sendVerificationEmail;
	const canSendConfirmation = canSendVerification && ctx.context.session.user.emailVerified && ctx.context.options.user.changeEmail.sendChangeEmailConfirmation;
	if (!canUpdateWithoutVerification && !canSendConfirmation && !canSendVerification) {
		ctx.context.logger.error("Verification email isn't enabled.");
		throw APIError.fromStatus("BAD_REQUEST", { message: "Verification email isn't enabled" });
	}
	if (await ctx.context.internalAdapter.findUserByEmail(newEmail)) {
		await createEmailVerificationToken(ctx.context.secret, ctx.context.session.user.email, newEmail, ctx.context.options.emailVerification?.expiresIn);
		ctx.context.logger.info("Change email attempt for existing email");
		return ctx.json({ status: true });
	}
	/**
	* If the email is not verified, we can update the email if the option is enabled
	*/
	if (canUpdateWithoutVerification) {
		await ctx.context.internalAdapter.updateUserByEmail(ctx.context.session.user.email, { email: newEmail });
		await setSessionCookie(ctx, {
			session: ctx.context.session.session,
			user: {
				...ctx.context.session.user,
				email: newEmail
			}
		});
		if (canSendVerification) {
			const token = await createEmailVerificationToken(ctx.context.secret, newEmail, void 0, ctx.context.options.emailVerification?.expiresIn);
			const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${encodeURIComponent(ctx.body.callbackURL || "/")}`;
			await ctx.context.runInBackgroundOrAwait(canSendVerification({
				user: {
					...ctx.context.session.user,
					email: newEmail
				},
				url,
				token
			}, ctx.request));
		}
		return ctx.json({ status: true });
	}
	/**
	* If the email is verified, we need to send a verification email
	*/
	if (canSendConfirmation) {
		const token = await createEmailVerificationToken(ctx.context.secret, ctx.context.session.user.email, newEmail, ctx.context.options.emailVerification?.expiresIn, { requestType: "change-email-confirmation" });
		const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${encodeURIComponent(ctx.body.callbackURL || "/")}`;
		await ctx.context.runInBackgroundOrAwait(canSendConfirmation({
			user: ctx.context.session.user,
			newEmail,
			url,
			token
		}, ctx.request));
		return ctx.json({ status: true });
	}
	if (!canSendVerification) {
		ctx.context.logger.error("Verification email isn't enabled.");
		throw APIError.fromStatus("BAD_REQUEST", { message: "Verification email isn't enabled" });
	}
	const token = await createEmailVerificationToken(ctx.context.secret, ctx.context.session.user.email, newEmail, ctx.context.options.emailVerification?.expiresIn, { requestType: "change-email-verification" });
	const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${encodeURIComponent(ctx.body.callbackURL || "/")}`;
	await ctx.context.runInBackgroundOrAwait(canSendVerification({
		user: {
			...ctx.context.session.user,
			email: newEmail
		},
		url,
		token
	}, ctx.request));
	return ctx.json({ status: true });
});
var defuReplaceArrays = createDefu((obj, key, value) => {
	if (Array.isArray(obj[key]) && Array.isArray(value)) {
		obj[key] = value;
		return true;
	}
});
var hooksSourceWeakMap = /* @__PURE__ */ new WeakMap();
/**
* Resolves the operation id used for spans, preferring an explicit
* `operationId`, then the OpenAPI one, then the caller's `fallback` (the
* `auth.api.*` map key), and finally the route path.
*/
function getOperationId(endpoint, fallback) {
	const opts = endpoint.options;
	return opts?.operationId ?? opts?.metadata?.openapi?.operationId ?? fallback ?? endpoint.path ?? "/:virtual";
}
/**
* Merge a set of response headers onto the dispatch's accumulator, appending
* `set-cookie` (multiple cookies are legal) and replacing everything else.
*/
function mergeResponseHeaders(context, headers) {
	if (!headers) return;
	headers.forEach((value, key) => {
		if (!context.responseHeaders) context.responseHeaders = new Headers({ [key]: value });
		else if (key.toLowerCase() === "set-cookie") context.responseHeaders.append(key, value);
		else context.responseHeaders.set(key, value);
	});
}
/**
* Combine the two header sources an `APIError` can carry into one set:
* - `kAPIErrorHeaderSymbol`: `ctx.responseHeaders` accumulated via
*   `c.setCookie` / `c.setHeader` before the throw.
* - `e.headers`: explicit headers on the error (e.g. `location` from
*   `c.redirect`).
*
* `c.redirect()` reuses `ctx.responseHeaders` as `e.headers`, so when both
* point at the same object iterating each would duplicate every `set-cookie`;
* the identity check skips that copy. Explicit error headers override
* accumulated ones, while cookies from both accumulate.
*/
function mergeAPIErrorHeaders(error) {
	const ctxHeaders = error[kAPIErrorHeaderSymbol];
	const errHeaders = error.headers && error.headers !== ctxHeaders ? new Headers(error.headers) : null;
	if (!ctxHeaders && !errHeaders) return null;
	const headers = new Headers();
	ctxHeaders?.forEach((value, key) => {
		headers.append(key, value);
	});
	errHeaders?.forEach((value, key) => {
		if (key.toLowerCase() === "set-cookie") headers.append(key, value);
		else headers.set(key, value);
	});
	return headers;
}
async function runBeforeHooks(context, hooks, endpoint, operationId) {
	let modifiedContext = {};
	for (const hook of hooks) {
		let matched = false;
		try {
			matched = hook.matcher(context);
		} catch (error) {
			const hookSource = hooksSourceWeakMap.get(hook.handler) ?? "unknown";
			context.context.logger.error(`An error occurred during ${hookSource} hook matcher execution:`, error);
			throw new APIError("INTERNAL_SERVER_ERROR", { message: "An error occurred during hook matcher execution. Check the logs for more details." });
		}
		if (!matched) continue;
		const hookSource = hooksSourceWeakMap.get(hook.handler) ?? "unknown";
		const route = endpoint.path ?? "/:virtual";
		const result = await withSpan(`hook before ${route} ${hookSource}`, {
			[ATTR_HOOK_TYPE]: "before",
			[import_src.ATTR_HTTP_ROUTE]: route,
			[ATTR_CONTEXT]: hookSource,
			[ATTR_OPERATION_ID]: operationId
		}, () => hook.handler({
			...context,
			returnHeaders: true
		})).catch((e) => {
			if (isAPIError(e) && shouldPublishLog(context.context.logger.level, "debug")) e.stack = e.errorStack;
			throw e;
		});
		mergeResponseHeaders(context.context, result?.headers);
		const hookReturn = result?.response;
		if (hookReturn && typeof hookReturn === "object") {
			if ("context" in hookReturn && typeof hookReturn.context === "object") {
				const { headers, ...rest } = hookReturn.context;
				if (headers instanceof Headers) if (modifiedContext.headers) headers.forEach((value, key) => {
					modifiedContext.headers?.set(key, value);
				});
				else modifiedContext.headers = headers;
				modifiedContext = defuReplaceArrays(rest, modifiedContext);
				continue;
			}
			return hookReturn;
		}
	}
	return { context: modifiedContext };
}
async function runAfterHooks(context, hooks, endpoint, operationId) {
	for (const hook of hooks) {
		if (!hook.matcher(context)) continue;
		const hookSource = hooksSourceWeakMap.get(hook.handler) ?? "unknown";
		const route = endpoint.path ?? "/:virtual";
		const result = await withSpan(`hook after ${route} ${hookSource}`, {
			[ATTR_HOOK_TYPE]: "after",
			[import_src.ATTR_HTTP_ROUTE]: route,
			[ATTR_CONTEXT]: hookSource,
			[ATTR_OPERATION_ID]: operationId
		}, () => hook.handler(context)).catch((e) => {
			if (isAPIError(e)) {
				if (shouldPublishLog(context.context.logger.level, "debug")) e.stack = e.errorStack;
				return {
					response: e,
					headers: mergeAPIErrorHeaders(e)
				};
			}
			throw e;
		});
		mergeResponseHeaders(context.context, result.headers);
		if (result.response !== void 0) context.context.returned = result.response;
	}
	return {
		response: context.context.returned,
		headers: context.context.responseHeaders
	};
}
function getHooks(authContext) {
	const plugins = authContext.options.plugins || [];
	const beforeHooks = [];
	const afterHooks = [];
	const beforeHookHandler = authContext.options.hooks?.before;
	if (beforeHookHandler) {
		hooksSourceWeakMap.set(beforeHookHandler, "user");
		beforeHooks.push({
			matcher: () => true,
			handler: beforeHookHandler
		});
	}
	const afterHookHandler = authContext.options.hooks?.after;
	if (afterHookHandler) {
		hooksSourceWeakMap.set(afterHookHandler, "user");
		afterHooks.push({
			matcher: () => true,
			handler: afterHookHandler
		});
	}
	const pluginBeforeHooks = plugins.flatMap((plugin) => (plugin.hooks?.before ?? []).map((h) => {
		hooksSourceWeakMap.set(h.handler, `plugin:${plugin.id}`);
		return h;
	}));
	const pluginAfterHooks = plugins.flatMap((plugin) => (plugin.hooks?.after ?? []).map((h) => {
		hooksSourceWeakMap.set(h.handler, `plugin:${plugin.id}`);
		return h;
	}));
	if (pluginBeforeHooks.length) beforeHooks.push(...pluginBeforeHooks);
	if (pluginAfterHooks.length) afterHooks.push(...pluginAfterHooks);
	return {
		beforeHooks,
		afterHooks
	};
}
/**
* Run a single endpoint through the configured `hooks.before` / `hooks.after`
* pipeline, normalizing the response, headers, and `APIError`s the same way a
* router or `auth.api.*` dispatch does.
*
* This is the canonical hook runner. The HTTP router and `auth.api.*` reach it
* through {@link toAuthEndpoints}. Plugins call it directly when they need to
* re-enter the pipeline on purpose, such as resuming `/oauth2/authorize` after
* a fresh sign-in. Calling an endpoint as a plain function deliberately skips
* hooks; `dispatchAuthEndpoint` is the supported way to opt back in.
*
* @param endpoint The endpoint to dispatch.
* @param input Input context whose `context` is an already-resolved `AuthContext`.
*/
async function dispatchAuthEndpoint(endpoint, input) {
	const operationId = input.operationId ?? getOperationId(endpoint);
	const route = endpoint.path ?? "/:virtual";
	const endpointMethod = endpoint.options?.method;
	const defaultMethod = Array.isArray(endpointMethod) ? endpointMethod[0] : endpointMethod;
	const methodName = input.method ?? input.request?.method ?? defaultMethod ?? "?";
	const shouldReturnResponse = input.asResponse ?? isRequestLike(input.request);
	let internalContext = {
		...input,
		context: {
			...input.context,
			returned: void 0,
			responseHeaders: void 0,
			session: input.context.session ?? null
		},
		path: endpoint.path,
		headers: input.headers ? new Headers(input.headers) : void 0
	};
	return withSpan(`${methodName} ${route}`, {
		[import_src.ATTR_HTTP_ROUTE]: route,
		[ATTR_OPERATION_ID]: operationId
	}, async () => runWithEndpointContext(internalContext, async () => {
		const { beforeHooks, afterHooks } = getHooks(internalContext.context);
		const before = await runBeforeHooks(internalContext, beforeHooks, endpoint, operationId);
		if ("context" in before && before.context && typeof before.context === "object") {
			const { headers, ...rest } = before.context;
			if (headers) {
				if (!internalContext.headers) internalContext.headers = new Headers();
				const requestHeaders = internalContext.headers;
				headers.forEach((value, key) => {
					requestHeaders.set(key, value);
				});
			}
			internalContext = defuReplaceArrays(rest, internalContext);
		} else if (before) {
			const responseHeaders = internalContext.context.responseHeaders;
			return shouldReturnResponse ? toResponse(before, { headers: responseHeaders }) : input.returnHeaders ? {
				headers: responseHeaders,
				response: before
			} : before;
		}
		internalContext.asResponse = false;
		internalContext.returnHeaders = true;
		internalContext.returnStatus = true;
		const result = await runWithEndpointContext(internalContext, () => withSpan(`handler ${route}`, {
			[import_src.ATTR_HTTP_ROUTE]: route,
			[ATTR_OPERATION_ID]: operationId
		}, () => endpoint(internalContext))).catch((e) => {
			if (isAPIError(e)) return {
				response: e,
				status: e.statusCode,
				headers: mergeAPIErrorHeaders(e)
			};
			throw e;
		});
		if (result instanceof Response) return result;
		internalContext.context.returned = result.response;
		internalContext.context.responseHeaders = result.headers ?? void 0;
		const after = await runAfterHooks(internalContext, afterHooks, endpoint, operationId);
		if (after.response !== void 0) result.response = after.response;
		result.headers = after.headers ?? result.headers;
		if (isAPIError(result.response) && shouldPublishLog(internalContext.context.logger.level, "debug")) result.response.stack = result.response.errorStack;
		if (isAPIError(result.response) && !shouldReturnResponse) {
			if (result.headers) Object.defineProperty(result.response, kAPIErrorHeaderSymbol, {
				enumerable: false,
				configurable: true,
				writable: false,
				value: result.headers
			});
			throw result.response;
		}
		return shouldReturnResponse ? toResponse(result.response, {
			headers: result.headers ?? void 0,
			status: result.status
		}) : input.returnHeaders ? input.returnStatus ? {
			headers: result.headers,
			response: result.response,
			status: result.status
		} : {
			headers: result.headers,
			response: result.response
		} : input.returnStatus ? {
			response: result.response,
			status: result.status
		} : result.response;
	}));
}
/**
* Resolves the per-call `AuthContext` for endpoints with a dynamic `baseURL`.
*
* - `rawCtx.baseURL` already set: HTTP handler rehydrated upstream; return as-is.
* - Direct `auth.api` call with a source or a configured `fallback`: resolve here.
* - Neither: throw `APIError` with a helpful message. Leaving `baseURL = ""`
*   would let plugins build `new URL("")` and crash cryptically downstream.
*/
async function resolveDynamicContext(rawCtx, input) {
	if (rawCtx.baseURL) return rawCtx;
	const source = pickSource(input);
	const config = rawCtx.options.baseURL;
	const hasFallback = isDynamicBaseURLConfig(config) && Boolean(config.fallback);
	if (source === void 0 && !hasFallback) throw new APIError("INTERNAL_SERVER_ERROR", { message: "Dynamic baseURL could not be resolved for this direct auth.api call. Pass `headers: request.headers` (or `request`) to the call, or add `fallback` to your baseURL config." });
	try {
		return await resolveRequestContext(rawCtx, source, resolveDynamicTrustedProxyHeaders(rawCtx.options));
	} catch (err) {
		if (err instanceof BetterAuthError) throw new APIError("INTERNAL_SERVER_ERROR", { message: err.message });
		throw err;
	}
}
/**
* Wraps each raw endpoint so a router or `auth.api.*` call runs it through the
* configured hook pipeline. Per-call work that is specific to this entry point
* (dynamic `baseURL` resolution, request-state initialization) happens here;
* the hook pipeline itself lives in {@link dispatchAuthEndpoint}.
*/
function toAuthEndpoints(endpoints, ctx) {
	const api = {};
	for (const [key, endpoint] of Object.entries(endpoints)) {
		api[key] = async (context) => {
			const operationId = getOperationId(endpoint, key);
			const run = async () => {
				const rawContext = await ctx;
				const authContext = isDynamicBaseURLConfig(rawContext.options.baseURL) ? await resolveDynamicContext(rawContext, context) : rawContext;
				return dispatchAuthEndpoint(endpoint, {
					...context,
					context: authContext,
					operationId,
					asResponse: context?.asResponse ?? isRequestLike(context?.request)
				});
			};
			if (await hasRequestState()) return run();
			return runWithRequestState(/* @__PURE__ */ new WeakMap(), run);
		};
		api[key].path = endpoint.path;
		api[key].options = endpoint.options;
	}
	return api;
}
function checkEndpointConflicts(options, logger) {
	const endpointRegistry = /* @__PURE__ */ new Map();
	options.plugins?.forEach((plugin) => {
		if (plugin.endpoints) {
			for (const [key, endpoint] of Object.entries(plugin.endpoints)) if (endpoint && "path" in endpoint && typeof endpoint.path === "string") {
				const path = endpoint.path;
				let methods = [];
				if (endpoint.options && "method" in endpoint.options) {
					if (Array.isArray(endpoint.options.method)) methods = endpoint.options.method;
					else if (typeof endpoint.options.method === "string") methods = [endpoint.options.method];
				}
				if (methods.length === 0) methods = ["*"];
				if (!endpointRegistry.has(path)) endpointRegistry.set(path, []);
				endpointRegistry.get(path).push({
					pluginId: plugin.id,
					endpointKey: key,
					methods
				});
			}
		}
	});
	const conflicts = [];
	for (const [path, entries] of endpointRegistry.entries()) if (entries.length > 1) {
		const methodMap = /* @__PURE__ */ new Map();
		let hasConflict = false;
		for (const entry of entries) for (const method of entry.methods) {
			if (!methodMap.has(method)) methodMap.set(method, []);
			methodMap.get(method).push(entry.pluginId);
			if (methodMap.get(method).length > 1) hasConflict = true;
			if (method === "*" && entries.length > 1) hasConflict = true;
			else if (method !== "*" && methodMap.has("*")) hasConflict = true;
		}
		if (hasConflict) {
			const uniquePlugins = [...new Set(entries.map((e) => e.pluginId))];
			const conflictingMethods = [];
			for (const [method, plugins] of methodMap.entries()) if (plugins.length > 1 || method === "*" && entries.length > 1 || method !== "*" && methodMap.has("*")) conflictingMethods.push(method);
			conflicts.push({
				path,
				plugins: uniquePlugins,
				conflictingMethods
			});
		}
	}
	if (conflicts.length > 0) {
		const conflictMessages = conflicts.map((conflict) => `  - "${conflict.path}" [${conflict.conflictingMethods.join(", ")}] used by plugins: ${conflict.plugins.join(", ")}`).join("\n");
		logger.error(`Endpoint path conflicts detected! Multiple plugins are trying to use the same endpoint paths with conflicting HTTP methods:
${conflictMessages}

To resolve this, you can:
	1. Use only one of the conflicting plugins
	2. Configure the plugins to use different paths (if supported)
	3. Ensure plugins use different HTTP methods for the same path
`);
	}
}
function getEndpoints(ctx, options) {
	const pluginEndpoints = options.plugins?.reduce((acc, plugin) => {
		return {
			...acc,
			...plugin.endpoints
		};
	}, {}) ?? {};
	const middlewares = options.plugins?.map((plugin) => plugin.middlewares?.map((m) => {
		const middleware = (async (context) => {
			const authContext = await ctx;
			return withSpan(`middleware ${m.path} ${plugin.id}`, {
				["better_auth.hook.type"]: "middleware",
				[import_src.ATTR_HTTP_ROUTE]: m.path,
				["better_auth.context"]: `plugin:${plugin.id}`
			}, () => m.middleware({
				...context,
				context: {
					...authContext,
					...context.context
				}
			}));
		});
		middleware.options = m.middleware.options;
		return {
			path: m.path,
			middleware
		};
	})).filter((plugin) => plugin !== void 0).flat() || [];
	return {
		api: toAuthEndpoints({
			signInSocial: signInSocial(),
			callbackOAuth,
			getSession: getSession(),
			signOut,
			signUpEmail: signUpEmail(),
			signInEmail: signInEmail(),
			resetPassword,
			verifyPassword: verifyPassword$1,
			verifyEmail,
			sendVerificationEmail,
			changeEmail,
			changePassword,
			setPassword,
			updateSession: updateSession(),
			updateUser: updateUser(),
			deleteUser,
			requestPasswordReset,
			requestPasswordResetCallback,
			listSessions: listSessions(),
			revokeSession,
			revokeSessions,
			revokeOtherSessions,
			linkSocialAccount,
			listUserAccounts,
			deleteUserCallback,
			unlinkAccount,
			refreshToken,
			getAccessToken,
			accountInfo,
			...pluginEndpoints,
			ok,
			error
		}, ctx),
		middlewares
	};
}
var router = (ctx, options) => {
	const { api, middlewares } = getEndpoints(ctx, options);
	const basePath = new URL(ctx.baseURL).pathname;
	return createRouter$1(api, {
		routerContext: ctx,
		openapi: { disabled: true },
		basePath,
		routerMiddleware: [{
			path: "/**",
			middleware: originCheckMiddleware
		}, ...middlewares],
		allowedMediaTypes: ["application/json"],
		skipTrailingSlashes: options.advanced?.skipTrailingSlashes ?? false,
		async onRequest(req) {
			const disabledPaths = ctx.options.disabledPaths || [];
			const normalizedPath = normalizePathname(req.url, basePath);
			if (disabledPaths.includes(normalizedPath)) return new Response("Not Found", { status: 404 });
			let currentRequest = req;
			const rateLimitResponse = await onRequestRateLimit(currentRequest, ctx);
			if (rateLimitResponse) return rateLimitResponse;
			for (const plugin of ctx.options.plugins || []) if (plugin.onRequest) {
				const response = await withSpan(`onRequest ${plugin.id}`, {
					[ATTR_HOOK_TYPE]: "onRequest",
					[ATTR_CONTEXT]: `plugin:${plugin.id}`
				}, () => plugin.onRequest(currentRequest, ctx));
				if (response && "response" in response) return response.response;
				if (response && "request" in response) currentRequest = response.request;
			}
			return currentRequest;
		},
		async onResponse(res, req) {
			for (const plugin of ctx.options.plugins || []) if (plugin.onResponse) {
				const response = await withSpan(`onResponse ${plugin.id}`, {
					[ATTR_HOOK_TYPE]: "onResponse",
					[ATTR_CONTEXT]: `plugin:${plugin.id}`,
					[import_src.ATTR_HTTP_RESPONSE_STATUS_CODE]: res.status
				}, () => plugin.onResponse(res, ctx));
				if (response) return response.response;
			}
			return res;
		},
		onError(e) {
			if (isAPIError(e) && e.status === "FOUND") return;
			if (options.onAPIError?.throw) throw e;
			if (options.onAPIError?.onError) {
				options.onAPIError.onError(e, ctx);
				return;
			}
			const optLogLevel = options.logger?.level;
			const log = optLogLevel === "error" || optLogLevel === "warn" || optLogLevel === "debug" ? logger : void 0;
			if (options.logger?.disabled !== true) {
				if (e && typeof e === "object" && "message" in e && typeof e.message === "string") {
					if (e.message.includes("no column") || e.message.includes("column") || e.message.includes("relation") || e.message.includes("table") || e.message.includes("does not exist")) {
						ctx.logger?.error(e.message);
						return;
					}
				}
				if (isAPIError(e)) {
					if (e.status === "INTERNAL_SERVER_ERROR") ctx.logger.error(e.status, e);
					log?.error(e.message);
				} else ctx.logger?.error(e && typeof e === "object" && "name" in e ? e.name : "", e);
			}
		}
	});
};
async function getBaseAdapter(options, handleDirectDatabase) {
	let adapter;
	if (!options.database) {
		const tables = getAuthTables(options);
		const memoryDB = Object.keys(tables).reduce((acc, key) => {
			acc[key] = [];
			return acc;
		}, {});
		const { memoryAdapter } = await import("../_libs/better-auth__memory-adapter.mjs").then((n) => n.t);
		adapter = memoryAdapter(memoryDB)(options);
	} else if (typeof options.database === "function") adapter = options.database(options);
	else adapter = await handleDirectDatabase(options);
	if (!adapter.transaction) {
		logger.warn("Adapter does not correctly implement transaction function, patching it automatically. Please update your adapter implementation.");
		adapter.transaction = async (cb) => {
			return cb(adapter);
		};
	}
	return adapter;
}
async function getAdapter(options) {
	return getBaseAdapter(options, async (opts) => {
		const { createKyselyAdapter } = await import("./kysely-adapter-Cj_QZw5p.mjs");
		const { kysely, databaseType, transaction } = await createKyselyAdapter(opts);
		if (!kysely) throw new BetterAuthError("Failed to initialize database adapter");
		const { kyselyAdapter } = await import("./kysely-adapter-Cj_QZw5p.mjs");
		return kyselyAdapter(kysely, {
			type: databaseType || "sqlite",
			debugLogs: opts.database && "debugLogs" in opts.database ? opts.database.debugLogs : false,
			transaction
		})(opts);
	});
}
function getSchema(config) {
	const tables = getAuthTables(config);
	const schema = {};
	for (const key in tables) {
		const table = tables[key];
		const fields = table.fields;
		const actualFields = {};
		Object.entries(fields).forEach(([key, field]) => {
			actualFields[field.fieldName || key] = field;
			if (field.references) {
				const refTable = tables[field.references.model];
				if (refTable) actualFields[field.fieldName || key].references = {
					...field.references,
					model: refTable.modelName,
					field: field.references.field
				};
			}
		});
		if (schema[table.modelName]) {
			schema[table.modelName].fields = {
				...schema[table.modelName].fields,
				...actualFields
			};
			if (table.disableMigrations) schema[table.modelName].disableMigrations = true;
			continue;
		}
		schema[table.modelName] = {
			fields: actualFields,
			order: table.order || Infinity,
			disableMigrations: table.disableMigrations
		};
	}
	return schema;
}
var map = {
	postgres: {
		string: [
			"character varying",
			"varchar",
			"text",
			"uuid"
		],
		number: [
			"int4",
			"integer",
			"bigint",
			"smallint",
			"numeric",
			"real",
			"double precision"
		],
		boolean: ["bool", "boolean"],
		date: [
			"timestamptz",
			"timestamp",
			"date"
		],
		json: ["json", "jsonb"]
	},
	mysql: {
		string: [
			"varchar",
			"text",
			"uuid"
		],
		number: [
			"integer",
			"int",
			"bigint",
			"smallint",
			"decimal",
			"float",
			"double"
		],
		boolean: ["boolean", "tinyint"],
		date: [
			"timestamp",
			"datetime",
			"date"
		],
		json: ["json"]
	},
	sqlite: {
		string: ["TEXT"],
		number: [
			"INTEGER",
			"REAL",
			"BIGINT"
		],
		boolean: ["INTEGER", "BOOLEAN"],
		date: ["DATE", "INTEGER"],
		json: ["TEXT"]
	},
	mssql: {
		string: [
			"varchar",
			"nvarchar",
			"uniqueidentifier"
		],
		number: [
			"int",
			"bigint",
			"smallint",
			"decimal",
			"float",
			"double"
		],
		boolean: ["bit", "smallint"],
		date: [
			"datetime2",
			"date",
			"datetime"
		],
		json: ["varchar", "nvarchar"]
	}
};
function matchType(columnDataType, fieldType, dbType) {
	function normalize(type) {
		return type.toLowerCase().split("(")[0].trim();
	}
	if (fieldType === "string[]" || fieldType === "number[]") return columnDataType.toLowerCase().includes("json");
	const types = map[dbType];
	return (Array.isArray(fieldType) ? types["string"].map((t) => t.toLowerCase()) : types[fieldType].map((t) => t.toLowerCase())).includes(normalize(columnDataType));
}
/**
* Get the current PostgreSQL schema (search_path) for the database connection
* Returns the first schema in the search_path, defaulting to 'public' if not found
*/
async function getPostgresSchema(db) {
	try {
		const result = await sql`SHOW search_path`.execute(db);
		const searchPath = result.rows[0]?.search_path ?? result.rows[0]?.searchPath;
		if (searchPath) return searchPath.split(",").map((s) => s.trim()).map((s) => s.replace(/^["']|["']$/g, "")).filter((s) => !s.startsWith("$") && !s.startsWith("\\$"))[0] || "public";
	} catch {}
	return "public";
}
async function getMigrations(config) {
	const betterAuthSchema = getSchema(config);
	const logger = createLogger(config.logger);
	let { kysely: db, databaseType: dbType } = await createKyselyAdapter(config);
	if (!dbType) {
		logger.warn("Could not determine database type, defaulting to sqlite. Please provide a type in the database options to avoid this.");
		dbType = "sqlite";
	}
	if (!db) {
		logger.error("Only kysely adapter is supported for migrations. You can use `generate` command to generate the schema, if you're using a different adapter.");
		process.exit(1);
	}
	let currentSchema = "public";
	if (dbType === "postgres") {
		currentSchema = await getPostgresSchema(db);
		logger.debug(`PostgreSQL migration: Using schema '${currentSchema}' (from search_path)`);
		try {
			const schemaCheck = await sql`
				SELECT schema_name
				FROM information_schema.schemata
				WHERE schema_name = ${currentSchema}
			`.execute(db);
			if (!(schemaCheck.rows[0]?.schema_name ?? schemaCheck.rows[0]?.schemaName)) logger.warn(`Schema '${currentSchema}' does not exist. Tables will be inspected from available schemas. Consider creating the schema first or checking your database configuration.`);
		} catch (error) {
			logger.debug(`Could not verify schema existence: ${error instanceof Error ? error.message : String(error)}`);
		}
	}
	const allTableMetadata = await db.introspection.getTables();
	let tableMetadata = allTableMetadata;
	if (dbType === "postgres") try {
		const tablesInSchema = await sql`
				SELECT table_name
				FROM information_schema.tables
				WHERE table_schema = ${currentSchema}
				AND table_type = 'BASE TABLE'
			`.execute(db);
		const tableNamesInSchema = new Set(tablesInSchema.rows.map((row) => row.table_name ?? row.tableName));
		tableMetadata = allTableMetadata.filter((table) => table.schema === currentSchema && tableNamesInSchema.has(table.name));
		logger.debug(`Found ${tableMetadata.length} table(s) in schema '${currentSchema}': ${tableMetadata.map((t) => t.name).join(", ") || "(none)"}`);
	} catch (error) {
		logger.warn(`Could not filter tables by schema. Using all discovered tables. Error: ${error instanceof Error ? error.message : String(error)}`);
	}
	const toBeCreated = [];
	const toBeAdded = [];
	for (const [key, value] of Object.entries(betterAuthSchema)) {
		if (value.disableMigrations) continue;
		const table = tableMetadata.find((t) => t.name === key);
		if (!table) {
			const tIndex = toBeCreated.findIndex((t) => t.table === key);
			const tableData = {
				table: key,
				fields: value.fields,
				order: value.order || Infinity
			};
			const insertIndex = toBeCreated.findIndex((t) => (t.order || Infinity) > tableData.order);
			if (insertIndex === -1) if (tIndex === -1) toBeCreated.push(tableData);
			else toBeCreated[tIndex].fields = {
				...toBeCreated[tIndex].fields,
				...value.fields
			};
			else toBeCreated.splice(insertIndex, 0, tableData);
			continue;
		}
		const toBeAddedFields = {};
		for (const [fieldName, field] of Object.entries(value.fields)) {
			const column = table.columns.find((c) => c.name === fieldName);
			if (!column) {
				toBeAddedFields[fieldName] = field;
				continue;
			}
			if (matchType(column.dataType, field.type, dbType)) continue;
			else logger.warn(`Field ${fieldName} in table ${key} has a different type in the database. Expected ${field.type} but got ${column.dataType}.`);
		}
		if (Object.keys(toBeAddedFields).length > 0) toBeAdded.push({
			table: key,
			fields: toBeAddedFields,
			order: value.order || Infinity
		});
	}
	const migrations = [];
	const useUUIDs = config.advanced?.database?.generateId === "uuid";
	const useNumberId = config.advanced?.database?.generateId === "serial";
	function getType(field, fieldName) {
		const type = field.type;
		const provider = dbType || "sqlite";
		const typeMap = {
			string: {
				sqlite: "text",
				postgres: "text",
				mysql: field.unique ? "varchar(255)" : field.references ? "varchar(36)" : field.sortable ? "varchar(255)" : field.index ? "varchar(255)" : "text",
				mssql: field.unique || field.sortable ? "varchar(255)" : field.references ? "varchar(36)" : "varchar(8000)"
			},
			boolean: {
				sqlite: "integer",
				postgres: "boolean",
				mysql: "boolean",
				mssql: "smallint"
			},
			number: {
				sqlite: field.bigint ? "bigint" : "integer",
				postgres: field.bigint ? "bigint" : "integer",
				mysql: field.bigint ? "bigint" : "integer",
				mssql: field.bigint ? "bigint" : "integer"
			},
			date: {
				sqlite: "date",
				postgres: "timestamptz",
				mysql: "timestamp(3)",
				mssql: sql`datetime2(3)`
			},
			json: {
				sqlite: "text",
				postgres: "jsonb",
				mysql: "json",
				mssql: "varchar(8000)"
			},
			id: {
				postgres: useNumberId ? sql`integer GENERATED BY DEFAULT AS IDENTITY` : useUUIDs ? "uuid" : "text",
				mysql: useNumberId ? "integer" : useUUIDs ? "varchar(36)" : "varchar(36)",
				mssql: useNumberId ? "integer" : useUUIDs ? "varchar(36)" : "varchar(36)",
				sqlite: useNumberId ? "integer" : "text"
			},
			foreignKeyId: {
				postgres: useNumberId ? "integer" : useUUIDs ? "uuid" : "text",
				mysql: useNumberId ? "integer" : useUUIDs ? "varchar(36)" : "varchar(36)",
				mssql: useNumberId ? "integer" : useUUIDs ? "varchar(36)" : "varchar(36)",
				sqlite: useNumberId ? "integer" : "text"
			},
			"string[]": {
				sqlite: "text",
				postgres: "jsonb",
				mysql: "json",
				mssql: "varchar(8000)"
			},
			"number[]": {
				sqlite: "text",
				postgres: "jsonb",
				mysql: "json",
				mssql: "varchar(8000)"
			}
		};
		if (fieldName === "id" || field.references?.field === "id") {
			if (fieldName === "id") return typeMap.id[provider];
			return typeMap.foreignKeyId[provider];
		}
		if (Array.isArray(type)) return "text";
		if (!(type in typeMap)) throw new Error(`Unsupported field type '${String(type)}' for field '${fieldName}'. Allowed types are: string, number, boolean, date, string[], number[]. If you need to store structured data, store it as a JSON string (type: "string") or split it into primitive fields. See https://better-auth.com/docs/advanced/schema#additional-fields`);
		return typeMap[type][provider];
	}
	const getModelName = initGetModelName({
		schema: getAuthTables(config),
		usePlural: false
	});
	const getFieldName = initGetFieldName({
		schema: getAuthTables(config),
		usePlural: false
	});
	function getReferencePath(model, field) {
		try {
			return `${getModelName(model)}.${getFieldName({
				model,
				field
			})}`;
		} catch {
			return `${model}.${field}`;
		}
	}
	const deferredIndexes = [];
	if (toBeAdded.length) for (const table of toBeAdded) for (const [fieldName, field] of Object.entries(table.fields)) {
		const type = getType(field, fieldName);
		const builder = db.schema.alterTable(table.table);
		if (field.index) {
			const indexName = `${table.table}_${fieldName}_${field.unique ? "uidx" : "idx"}`;
			const indexBuilder = db.schema.createIndex(indexName).on(table.table).columns([fieldName]);
			deferredIndexes.push(field.unique ? indexBuilder.unique() : indexBuilder);
		}
		const built = builder.addColumn(fieldName, type, (col) => {
			col = field.required !== false ? col.notNull() : col;
			if (field.references) col = col.references(getReferencePath(field.references.model, field.references.field)).onDelete(field.references.onDelete || "cascade");
			if (field.unique) col = col.unique();
			if (field.type === "date" && typeof field.defaultValue === "function" && (dbType === "postgres" || dbType === "mysql" || dbType === "mssql")) if (dbType === "mysql") col = col.defaultTo(sql`CURRENT_TIMESTAMP(3)`);
			else col = col.defaultTo(sql`CURRENT_TIMESTAMP`);
			return col;
		});
		migrations.push(built);
	}
	if (toBeCreated.length) for (const table of toBeCreated) {
		const idType = getType({ type: useNumberId ? "number" : "string" }, "id");
		let dbT = db.schema.createTable(table.table).addColumn("id", idType, (col) => {
			if (useNumberId) {
				if (dbType === "postgres") return col.primaryKey().notNull();
				else if (dbType === "sqlite") return col.primaryKey().notNull();
				else if (dbType === "mssql") return col.identity().primaryKey().notNull();
				return col.autoIncrement().primaryKey().notNull();
			}
			if (useUUIDs) {
				if (dbType === "postgres") return col.primaryKey().defaultTo(sql`pg_catalog.gen_random_uuid()`).notNull();
				return col.primaryKey().notNull();
			}
			return col.primaryKey().notNull();
		});
		for (const [fieldName, field] of Object.entries(table.fields)) {
			const type = getType(field, fieldName);
			dbT = dbT.addColumn(fieldName, type, (col) => {
				col = field.required !== false ? col.notNull() : col;
				if (field.references) col = col.references(getReferencePath(field.references.model, field.references.field)).onDelete(field.references.onDelete || "cascade");
				if (field.unique) col = col.unique();
				if (field.type === "date" && typeof field.defaultValue === "function" && (dbType === "postgres" || dbType === "mysql" || dbType === "mssql")) if (dbType === "mysql") col = col.defaultTo(sql`CURRENT_TIMESTAMP(3)`);
				else col = col.defaultTo(sql`CURRENT_TIMESTAMP`);
				return col;
			});
			if (field.index && !field.unique) {
				const builder = db.schema.createIndex(`${table.table}_${fieldName}_idx`).on(table.table).columns([fieldName]);
				deferredIndexes.push(builder);
			}
		}
		migrations.push(dbT);
	}
	for (const index of deferredIndexes) migrations.push(index);
	async function runMigrations() {
		for (const migration of migrations) await migration.execute();
	}
	async function compileMigrations() {
		return migrations.map((m) => m.compile().sql).join(";\n\n") + ";";
	}
	return {
		toBeCreated,
		toBeAdded,
		runMigrations,
		compileMigrations
	};
}
var DEFAULT_SECRET = "better-auth-secret-12345678901234567890";
/**
* Estimates the entropy of a string in bits.
* This is a simple approximation that helps detect low-entropy secrets.
*/
function estimateEntropy$1(str) {
	const unique = new Set(str).size;
	if (unique === 0) return 0;
	return Math.log2(Math.pow(unique, str.length));
}
function parseSecretsEnv(envValue) {
	if (!envValue) return null;
	return envValue.split(",").map((entry) => {
		entry = entry.trim();
		const colonIdx = entry.indexOf(":");
		if (colonIdx === -1) throw new BetterAuthError(`Invalid BETTER_AUTH_SECRETS entry: "${entry}". Expected format: "<version>:<secret>"`);
		const version = parseInt(entry.slice(0, colonIdx), 10);
		if (!Number.isInteger(version) || version < 0) throw new BetterAuthError(`Invalid version in BETTER_AUTH_SECRETS: "${entry.slice(0, colonIdx)}". Version must be a non-negative integer.`);
		const value = entry.slice(colonIdx + 1).trim();
		if (!value) throw new BetterAuthError(`Empty secret value for version ${version} in BETTER_AUTH_SECRETS.`);
		return {
			version,
			value
		};
	});
}
function validateSecretsArray(secrets, logger) {
	if (secrets.length === 0) throw new BetterAuthError("`secrets` array must contain at least one entry.");
	const seen = /* @__PURE__ */ new Set();
	for (const s of secrets) {
		const version = parseInt(String(s.version), 10);
		if (!Number.isInteger(version) || version < 0 || String(version) !== String(s.version).trim()) throw new BetterAuthError(`Invalid version ${s.version} in \`secrets\`. Version must be a non-negative integer.`);
		if (!s.value) throw new BetterAuthError(`Empty secret value for version ${version} in \`secrets\`.`);
		if (seen.has(version)) throw new BetterAuthError(`Duplicate version ${version} in \`secrets\`. Each version must be unique.`);
		seen.add(version);
	}
	const current = secrets[0];
	if (current.value.length < 32) logger.warn(`[better-auth] Warning: the current secret (version ${current.version}) should be at least 32 characters long for adequate security.`);
	if (estimateEntropy$1(current.value) < 120) logger.warn("[better-auth] Warning: the current secret appears low-entropy. Use a randomly generated secret for production.");
}
function buildSecretConfig(secrets, legacySecret) {
	const keys = /* @__PURE__ */ new Map();
	for (const s of secrets) keys.set(parseInt(String(s.version), 10), s.value);
	return {
		keys,
		currentVersion: parseInt(String(secrets[0].version), 10),
		legacySecret: legacySecret && legacySecret !== "better-auth-secret-12345678901234567890" ? legacySecret : void 0
	};
}
/**
* Estimates the entropy of a string in bits.
* This is a simple approximation that helps detect low-entropy secrets.
*/
function estimateEntropy(str) {
	const unique = new Set(str).size;
	if (unique === 0) return 0;
	return Math.log2(Math.pow(unique, str.length));
}
/**
* Validates that the secret meets minimum security requirements.
* Throws BetterAuthError if the secret is invalid.
* Skips validation for DEFAULT_SECRET in test environments only.
* Only throws for DEFAULT_SECRET in production environment.
*/
function validateSecret(secret, logger) {
	const isDefaultSecret = secret === DEFAULT_SECRET;
	if (isTest()) return;
	if (isDefaultSecret && isProduction) throw new BetterAuthError("You are using the default secret. Please set `BETTER_AUTH_SECRET` in your environment variables or pass `secret` in your auth config.");
	if (!secret) throw new BetterAuthError("BETTER_AUTH_SECRET is missing. Set it in your environment or pass `secret` to betterAuth({ secret }).");
	if (secret.length < 32) logger.warn(`[better-auth] Warning: your BETTER_AUTH_SECRET should be at least 32 characters long for adequate security. Generate one with \`npx auth secret\` or \`openssl rand -base64 32\`.`);
	if (estimateEntropy(secret) < 120) logger.warn("[better-auth] Warning: your BETTER_AUTH_SECRET appears low-entropy. Use a randomly generated secret for production.");
}
async function createAuthContext(adapter, options, getDatabaseType) {
	const isStateful = hasServerSessionStore(options);
	if (!isStateful) options = defu(options, { session: { cookieCache: {
		enabled: true,
		strategy: "jwe",
		refreshCache: true,
		maxAge: options.session?.expiresIn || 604800
	} } });
	if (!options.database) options = defu(options, { account: { storeAccountCookie: true } });
	const plugins = options.plugins || [];
	const internalPlugins = getInternalPlugins(options);
	const logger = createLogger(options.logger);
	const isDynamicConfig = isDynamicBaseURLConfig(options.baseURL);
	if (isDynamicBaseURLConfig(options.baseURL)) {
		const { allowedHosts } = options.baseURL;
		if (!allowedHosts || allowedHosts.length === 0) throw new BetterAuthError("baseURL.allowedHosts cannot be empty. Provide at least one allowed host pattern (e.g., [\"myapp.com\", \"*.vercel.app\"]).");
	}
	const baseURL = isDynamicConfig ? void 0 : getBaseURL(typeof options.baseURL === "string" ? options.baseURL : void 0, options.basePath);
	if (!baseURL && !isDynamicConfig) logger.warn(`[better-auth] Base URL is not set. Set the baseURL option or BETTER_AUTH_URL env, or use a dynamic baseURL with allowedHosts for multi-host setups. Without it the origin is derived from the incoming request, and callbacks and redirects may not work correctly.`);
	if (adapter.id === "memory" && options.advanced?.database?.generateId === false) logger.error(`[better-auth] Misconfiguration detected.
You are using the memory DB with generateId: false.
This will cause no id to be generated for any model.
Most of the features of Better Auth will not work correctly.`);
	const secretsArray = options.secrets ?? parseSecretsEnv(env.BETTER_AUTH_SECRETS);
	const legacySecret = options.secret || env.BETTER_AUTH_SECRET || env.AUTH_SECRET || "";
	let secret;
	let secretConfig;
	if (secretsArray) {
		validateSecretsArray(secretsArray, logger);
		secret = secretsArray[0].value;
		secretConfig = buildSecretConfig(secretsArray, legacySecret);
	} else {
		secret = legacySecret || "better-auth-secret-12345678901234567890";
		validateSecret(secret, logger);
		secretConfig = secret;
	}
	options = {
		...options,
		secret,
		baseURL: isDynamicConfig ? options.baseURL : baseURL ? new URL(baseURL).origin : "",
		basePath: options.basePath || "/api/auth",
		plugins: plugins.concat(internalPlugins)
	};
	checkEndpointConflicts(options, logger);
	const trustedProxies = options.advanced?.ipAddress?.trustedProxies;
	if (trustedProxies && trustedProxies.length > 0) {
		const invalid = findInvalidTrustedProxies(trustedProxies);
		if (invalid.length > 0) logger.warn(`Ignoring invalid \`advanced.ipAddress.trustedProxies\` entries: ${invalid.join(", ")}. Each entry must be an IP address or CIDR range.`);
	}
	const cookies = getCookies(options);
	const tables = getAuthTables(options);
	const providers = (await Promise.all(Object.entries(options.socialProviders || {}).map(async ([key, originalConfig]) => {
		const config = typeof originalConfig === "function" ? await originalConfig() : originalConfig;
		if (config == null) return null;
		if (config.enabled === false) return null;
		if (!config.clientId) logger.warn(`Social provider ${key} is missing clientId or clientSecret`);
		const provider = socialProviders[key](config);
		provider.disableImplicitSignUp = config.disableImplicitSignUp;
		return provider;
	}))).filter((x) => x !== null);
	const generateIdFunc = ({ model, size }) => {
		if (typeof options.advanced?.generateId === "function") return options.advanced.generateId({
			model,
			size
		});
		const dbGenerateId = options?.advanced?.database?.generateId;
		if (typeof dbGenerateId === "function") return dbGenerateId({
			model,
			size
		});
		if (dbGenerateId === "uuid") return crypto.randomUUID();
		if (dbGenerateId === "serial" || dbGenerateId === false) return false;
		return generateId(size);
	};
	const { publish } = await createTelemetry(options, {
		adapter: adapter.id,
		database: typeof options.database === "function" ? "adapter" : getDatabaseType(options.database)
	});
	const pluginIds = new Set(options.plugins.map((p) => p.id));
	const getPluginFn = (id) => options.plugins.find((p) => p.id === id) ?? null;
	const hasPluginFn = (id) => pluginIds.has(id);
	const trustedOrigins = await getTrustedOrigins(options);
	const trustedProviders = await getTrustedProviders(options);
	const ctx = {
		appName: options.appName || "Better Auth",
		baseURL: baseURL || "",
		version: getBetterAuthVersion(),
		socialProviders: providers,
		options,
		oauthConfig: {
			storeStateStrategy: options.account?.storeStateStrategy || (isStateful ? "database" : "cookie"),
			skipStateCookieCheck: !!options.account?.skipStateCookieCheck
		},
		tables,
		trustedOrigins,
		trustedProviders,
		isTrustedOrigin(url, settings) {
			return this.trustedOrigins.some((origin) => matchesOriginPattern(url, origin, settings));
		},
		sessionConfig: {
			updateAge: options.session?.updateAge !== void 0 ? options.session.updateAge : 86400,
			expiresIn: options.session?.expiresIn || 604800,
			freshAge: options.session?.freshAge === void 0 ? 86400 : options.session.freshAge,
			cookieRefreshCache: (() => {
				const refreshCache = options.session?.cookieCache?.refreshCache;
				const maxAge = options.session?.cookieCache?.maxAge || 300;
				if (isStateful && refreshCache) {
					logger.warn("[better-auth] `session.cookieCache.refreshCache` is enabled while `database` or `secondaryStorage` is configured. `refreshCache` is meant for stateless (DB-less) setups. Disabling `refreshCache` — remove it from your config to silence this warning.");
					return false;
				}
				if (refreshCache === false || refreshCache === void 0) return false;
				if (refreshCache === true) return {
					enabled: true,
					updateAge: Math.floor(maxAge * .2)
				};
				return {
					enabled: true,
					updateAge: refreshCache.updateAge !== void 0 ? refreshCache.updateAge : Math.floor(maxAge * .2)
				};
			})()
		},
		secret,
		secretConfig,
		rateLimit: {
			...options.rateLimit,
			enabled: options.rateLimit?.enabled ?? isProduction,
			window: options.rateLimit?.window || 10,
			max: options.rateLimit?.max || 100,
			storage: options.rateLimit?.storage || (options.secondaryStorage ? "secondary-storage" : "memory")
		},
		authCookies: cookies,
		logger,
		generateId: generateIdFunc,
		session: null,
		secondaryStorage: options.secondaryStorage,
		password: {
			hash: options.emailAndPassword?.password?.hash || hashPassword$1,
			verify: options.emailAndPassword?.password?.verify || verifyPassword$1$1,
			config: {
				minPasswordLength: options.emailAndPassword?.minPasswordLength || 8,
				maxPasswordLength: options.emailAndPassword?.maxPasswordLength || 128
			},
			checkPassword
		},
		setNewSession(session) {
			this.newSession = session;
		},
		newSession: null,
		adapter,
		internalAdapter: createInternalAdapter(adapter, {
			options,
			logger,
			hooks: options.databaseHooks ? [{
				source: "user",
				hooks: options.databaseHooks
			}] : [],
			generateId: generateIdFunc
		}),
		createAuthCookie: createCookieGetter(options),
		async runMigrations() {
			throw new BetterAuthError("runMigrations will be set by the specific init implementation");
		},
		publishTelemetry: publish,
		skipCSRFCheck: !!options.advanced?.disableCSRFCheck,
		skipOriginCheck: options.advanced?.disableOriginCheck !== void 0 ? options.advanced.disableOriginCheck : isTest() ? true : false,
		runInBackground: options.advanced?.backgroundTasks?.handler ?? ((p) => {
			p.catch(() => {});
		}),
		async runInBackgroundOrAwait(promise) {
			try {
				if (options.advanced?.backgroundTasks?.handler) {
					if (promise instanceof Promise) options.advanced.backgroundTasks.handler(promise.catch((e) => {
						logger.error("Failed to run background task:", e);
					}));
				} else await promise;
			} catch (e) {
				logger.error("Failed to run background task:", e);
			}
		},
		getPlugin: getPluginFn,
		hasPlugin: hasPluginFn
	};
	const initOrPromise = runPluginInit(ctx);
	if (isPromise(initOrPromise)) await initOrPromise;
	return ctx;
}
var init = async (options) => {
	const adapter = await getAdapter(options);
	const getDatabaseType = (database) => getKyselyDatabaseType(database) || "unknown";
	const ctx = await createAuthContext(adapter, options, getDatabaseType);
	ctx.runMigrations = async function() {
		if (!options.database || "updateMany" in options.database) throw new BetterAuthError("Database is not provided or it's an adapter. Migrations are only supported with a database instance.");
		const { runMigrations } = await getMigrations(options);
		await runMigrations();
	};
	return ctx;
};
var createBetterAuth = (options, initFn) => {
	const authContext = initFn(options);
	const { api } = getEndpoints(authContext, options);
	return {
		handler: async (request) => {
			const ctx = await authContext;
			const basePath = ctx.options.basePath || "/api/auth";
			let handlerCtx;
			if (isDynamicBaseURLConfig(options.baseURL)) handlerCtx = await resolveRequestContext(ctx, request, resolveDynamicTrustedProxyHeaders(ctx.options));
			else {
				handlerCtx = Object.create(Object.getPrototypeOf(ctx), Object.getOwnPropertyDescriptors(ctx));
				let trustOptions = ctx.options;
				if (!ctx.options.baseURL) {
					const baseURL = getBaseURL(void 0, basePath, request, void 0, ctx.options.advanced?.trustedProxyHeaders);
					if (!baseURL) throw new BetterAuthError("Could not get base URL from request. Please provide a valid base URL.");
					handlerCtx.baseURL = baseURL;
					handlerCtx.options = {
						...ctx.options,
						baseURL: getOrigin(baseURL) || void 0
					};
					trustOptions = handlerCtx.options;
				}
				handlerCtx.trustedOrigins = await getTrustedOrigins(trustOptions, request);
				handlerCtx.trustedProviders = await getTrustedProviders(trustOptions, request);
			}
			const { handler } = router(handlerCtx, options);
			return runWithAdapter(handlerCtx.adapter, () => handler(request));
		},
		api,
		options,
		$context: authContext,
		$ERROR_CODES: {
			...options.plugins?.reduce((acc, plugin) => {
				if (plugin.$ERROR_CODES) return {
					...acc,
					...plugin.$ERROR_CODES
				};
				return acc;
			}, {}),
			...BASE_ERROR_CODES
		}
	};
};
/**
* Better Auth initializer for full mode (with Kysely)
*
* @example
* ```ts
* import { betterAuth } from "better-auth";
*
* const auth = betterAuth({
* 	database: new PostgresDialect({ connection: process.env.DATABASE_URL }),
* });
* ```
*
* For minimal mode (without Kysely), import from `better-auth/minimal` instead
* @example
* ```ts
* import { betterAuth } from "better-auth/minimal";
*
* const auth = betterAuth({
*	  database: drizzleAdapter(db, { provider: "pg" }),
* });
*/
var betterAuth = (options) => {
	return createBetterAuth(options, init);
};
var PACKAGE_VERSION = "1.6.30";
var BEARER_SCHEME = "bearer ";
function tryDecode(str) {
	try {
		return decodeURIComponent(str);
	} catch {
		return str;
	}
}
/**
* Converts bearer token to session cookie
*/
var bearer = (options) => {
	return {
		id: "bearer",
		version: PACKAGE_VERSION,
		hooks: {
			before: [{
				matcher(context) {
					return Boolean(context.request?.headers.get("authorization") || context.headers?.get("authorization"));
				},
				handler: createAuthMiddleware(async (c) => {
					const authHeader = c.request?.headers.get("authorization") || c.headers?.get("Authorization");
					if (!authHeader) return;
					if (authHeader.slice(0, 7).toLowerCase() !== BEARER_SCHEME) return;
					const token = authHeader.slice(7).trim();
					if (!token) return;
					let decodedToken;
					if (token.includes(".")) decodedToken = token.includes("%") ? tryDecode(token) : token;
					else {
						if (options?.requireSignature) return;
						decodedToken = tryDecode((await serializeSignedCookie("", token, c.context.secret)).replace("=", ""));
					}
					try {
						if (!await createHMAC("SHA-256", "base64urlnopad").verify(c.context.secret, decodedToken.split(".")[0], decodedToken.split(".")[1])) return;
					} catch {
						return;
					}
					const existingHeaders = c.request?.headers || c.headers;
					const headers = new Headers({ ...Object.fromEntries(existingHeaders?.entries()) });
					setRequestCookie(headers, c.context.authCookies.sessionToken.name, decodedToken);
					return { context: { headers } };
				})
			}],
			after: [{
				matcher(context) {
					return true;
				},
				handler: createAuthMiddleware(async (ctx) => {
					const setCookie = ctx.context.responseHeaders?.get("set-cookie");
					if (!setCookie) return;
					const parsedCookies = parseSetCookieHeader(setCookie);
					const cookieName = ctx.context.authCookies.sessionToken.name;
					const sessionCookie = parsedCookies.get(cookieName);
					if (!sessionCookie || !sessionCookie.value || sessionCookie["max-age"] === 0) return;
					const token = sessionCookie.value;
					const exposedHeaders = ctx.context.responseHeaders?.get("access-control-expose-headers") || "";
					const headersSet = new Set(exposedHeaders.split(",").map((header) => header.trim()).filter(Boolean));
					headersSet.add("set-auth-token");
					ctx.setHeader("set-auth-token", token);
					ctx.setHeader("Access-Control-Expose-Headers", Array.from(headersSet).join(", "));
				})
			}]
		},
		options
	};
};
/**
* Warns when a cookie integration plugin is not effectively last.
*
* A plugin is considered misordered when there is at least one other plugin
* after it in the `plugins` array that declares `hooks.after`, since those
* hooks can set cookies that this integration will not see.
*/
function warnIfCookiePluginNotLast(ctx, pluginId) {
	const plugins = ctx.options.plugins || [];
	if (plugins.length === 0) return;
	const index = plugins.findIndex((p) => p.id === pluginId);
	if (index === -1) return;
	if (!plugins.slice(index + 1).some((p) => p.hooks && Array.isArray(p.hooks.after) && p.hooks.after.length > 0)) return;
	ctx.logger.warn(`[better-auth] Cookie integration plugin "${pluginId}" should be placed last in the plugins array. Plugins with \`hooks.after\` running after it may set cookies that are not forwarded to the framework cookie store. Move your cookie integration plugin to the end of the \`plugins\` array to avoid missing \`Set-Cookie\` headers.`);
}
/**
* TanStack Start cookie plugin for React.
*
* This plugin automatically handles cookie setting for TanStack Start with React.
* It uses `@tanstack/react-start-server` to set cookies.
*
* For Solid.js, use `better-auth/tanstack-start/solid` instead.
*
* @example
* ```ts
* import { tanstackStartCookies } from "better-auth/tanstack-start";
*
* const auth = betterAuth({
*   plugins: [tanstackStartCookies()],
* });
* ```
*/
var tanstackStartCookies = () => {
	let hasWarned = false;
	return {
		id: "tanstack-start-cookies",
		version: PACKAGE_VERSION,
		hooks: { after: [{
			matcher(ctx) {
				return true;
			},
			handler: createAuthMiddleware(async (ctx) => {
				if (!hasWarned) {
					warnIfCookiePluginNotLast(ctx.context, "tanstack-start-cookies");
					hasWarned = true;
				}
				const returned = ctx.context.responseHeaders;
				if ("_flag" in ctx && ctx._flag === "router") return;
				if (returned instanceof Headers) {
					const setCookies = returned?.get("set-cookie");
					if (!setCookies) return;
					const parsed = parseSetCookieHeader(setCookies);
					const { setCookie } = await import("./ssr.mjs").then((n) => n.a).then((n) => n.t);
					parsed.forEach((value, key) => {
						if (!key) return;
						try {
							setCookie(key, value.value, toCookieOptions(value));
						} catch {}
					});
					return;
				}
			})
		}] }
	};
};
var GATE_IDENTITY_HEADER = "x-grok-identity";
var GATE_JWKS_PATH = "/__gate/identity-key";
var JWKS_CACHE_TTL_MS = 3e5;
function env$2(key) {
	return process.env[key]?.trim() || void 0;
}
function gateIdentityEnabled() {
	return env$2("VITE_AUTH_ENABLED") !== "false" && Boolean(env$2("GROK_PROJECT_ID"));
}
async function defaultJwksFetch(url) {
	try {
		const res = await fetch(url, {
			headers: { accept: "application/json" },
			redirect: "manual"
		});
		if (!res.ok) return null;
		const body = await res.json();
		return Array.isArray(body?.keys) ? body : null;
	} catch {
		return null;
	}
}
var jwksCache = /* @__PURE__ */ new Map();
function gateKeyResolver(url, jwksFetch = defaultJwksFetch) {
	return async (protectedHeader) => {
		const kid = typeof protectedHeader.kid === "string" ? protectedHeader.kid : void 0;
		const findKey = (jwks) => jwks.keys.find((k) => k.kty === "OKP" && k.crv === "Ed25519" && (!kid || k.kid === kid));
		let entry = jwksCache.get(url);
		if (!entry || Date.now() - entry.fetchedAt > JWKS_CACHE_TTL_MS) {
			const jwks = await jwksFetch(url);
			if (jwks) {
				entry = {
					jwks,
					fetchedAt: Date.now()
				};
				jwksCache.set(url, entry);
			}
		}
		let key = entry ? findKey(entry.jwks) : void 0;
		if (!key) {
			const jwks = await jwksFetch(url);
			if (jwks) {
				entry = {
					jwks,
					fetchedAt: Date.now()
				};
				jwksCache.set(url, entry);
				key = findKey(jwks);
			}
		}
		if (!key) throw new Error("no gate identity key matches the token kid");
		return importJWK(key, "EdDSA");
	};
}
async function verifyGateIdentityToken(token, options) {
	try {
		const { payload } = await jwtVerify(token, options.getKey, {
			algorithms: ["EdDSA"],
			issuer: options.issuer,
			audience: options.audience,
			requiredClaims: [
				"sub",
				"iat",
				"exp"
			],
			maxTokenAge: "10 minutes"
		});
		const sub = typeof payload.sub === "string" ? payload.sub.trim() : "";
		if (!sub) return null;
		return {
			sub,
			email: typeof payload.email === "string" ? payload.email : null,
			name: typeof payload.name === "string" ? payload.name : null,
			teamId: typeof payload.team_id === "string" ? payload.team_id : null
		};
	} catch {
		return null;
	}
}
function resolveGateEndpoints(headers) {
	const explicit = env$2("GROK_GATE_ORIGIN");
	if (explicit) {
		const origin = explicit.replace(/\/+$/, "");
		return {
			issuer: origin,
			jwksUrl: `${origin}${GATE_JWKS_PATH}`
		};
	}
	const host = (headers.get("x-forwarded-host")?.split(",")[0]?.trim() || headers.get("host") || "").split(":")[0]?.trim().toLowerCase();
	if (!host) return null;
	let issuer = null;
	if (host === "app-builder-testing.com" || host.endsWith(".app-builder-testing.com")) issuer = "https://gate.app-builder-testing.com";
	else if (host === "grok.me" || host.endsWith(".grok.me")) issuer = "https://gate.grok.me";
	if (!issuer) return null;
	return {
		issuer,
		jwksUrl: `${issuer}${GATE_JWKS_PATH}`
	};
}
function sessionBoundToGateIdentity(accounts, identitySub, gateProviderId) {
	return accounts.some((account) => account.providerId === gateProviderId && account.accountId === identitySub);
}
async function gateIdentityFromHeaders(headers, jwksFetch) {
	if (!gateIdentityEnabled()) return null;
	const token = headers.get(GATE_IDENTITY_HEADER)?.trim();
	if (!token) return null;
	const projectId = env$2("GROK_PROJECT_ID");
	if (!projectId) return null;
	const endpoints = resolveGateEndpoints(headers);
	if (!endpoints) return null;
	return verifyGateIdentityToken(token, {
		issuer: endpoints.issuer,
		audience: `app:${projectId}`,
		getKey: gateKeyResolver(endpoints.jwksUrl, jwksFetch)
	});
}
var GATE_PROVIDER_ID = "grok-gate";
var GATE_ACCOUNT_ISSUER = "https://grok.com";
var LOG = "[gate-identity]";
/**
* Emit the signed session cookie so the browser actually receives it.
*
* `setSessionCookie` writes into the Better Auth middleware header bag, but on
* TanStack Start that bag is not always copied onto the final HTTP response
* (the response can end up with no `Set-Cookie`). Sign the token ourselves and
* push it through TanStack's `setCookie` + `responseHeaders` so both the
* framework cookie store and any after-hooks see it.
*/
async function emitSessionCookie(ctx, sessionTokenName, sessionToken) {
	const attributes = ctx.context.authCookies.sessionToken.attributes;
	const maxAge = ctx.context.sessionConfig.expiresIn;
	const cookieOptions = {
		...attributes,
		maxAge
	};
	let signedCookie;
	try {
		signedCookie = await ctx.setSignedCookie(sessionTokenName, sessionToken, ctx.context.secret, cookieOptions);
	} catch (err) {
		console.error(`${LOG} setSignedCookie failed`, err);
		return null;
	}
	const sessionValue = parseSetCookieHeader(signedCookie).get(sessionTokenName)?.value;
	if (!sessionValue) {
		console.error(`${LOG} signed Set-Cookie missing session token value`, { cookiePreview: signedCookie.slice(0, 120) });
		return null;
	}
	try {
		const { setCookie } = await import("./ssr.mjs").then((n) => n.a).then((n) => n.t);
		setCookie(sessionTokenName, sessionValue, {
			path: cookieOptions.path ?? "/",
			httpOnly: cookieOptions.httpOnly ?? true,
			secure: cookieOptions.secure ?? true,
			sameSite: cookieOptions.sameSite ?? "lax",
			maxAge: typeof maxAge === "number" ? maxAge : void 0,
			domain: cookieOptions.domain
		});
	} catch (err) {
		console.error(`${LOG} TanStack setCookie failed`, err);
	}
	try {
		const responseHeaders = ctx.context.responseHeaders;
		if (responseHeaders) responseHeaders.append("set-cookie", signedCookie);
		else console.error(`${LOG} ctx.context.responseHeaders is missing`);
	} catch (err) {
		console.error(`${LOG} responseHeaders.append(set-cookie) failed`, err);
	}
	return sessionValue;
}
/**
* Expire the previous user's `session_data` cookie cache after an identity
* swap. The cache is signed against the old session and outlives it (5-min
* TTL), so without this `/get-session` keeps serving the replaced user.
* Mirrors `emitSessionCookie`'s dual-path delivery: TanStack's response
* cookie store plus Better Auth's `responseHeaders` bag.
*/
async function expireSessionDataCookie(ctx, cookie) {
	const path = cookie.attributes.path ?? "/";
	const secure = cookie.attributes.secure ?? true;
	try {
		const { setCookie } = await import("./ssr.mjs").then((n) => n.a).then((n) => n.t);
		setCookie(cookie.name, "", {
			path,
			httpOnly: true,
			secure,
			sameSite: "lax",
			maxAge: 0
		});
	} catch (err) {
		console.error(`${LOG} TanStack setCookie (expire session_data) failed`, err);
	}
	try {
		ctx.context.responseHeaders?.append("set-cookie", `${cookie.name}=; Path=${path}; HttpOnly; ${secure ? "Secure; " : ""}SameSite=Lax; Max-Age=0`);
	} catch (err) {
		console.error(`${LOG} responseHeaders.append (expire session_data) failed`, err);
	}
}
/** Drop a cookie from the request `Cookie` header (inverse of `setRequestCookie`). */
function removeRequestCookie(headers, name) {
	const cookieHeader = headers.get("cookie");
	if (!cookieHeader) return;
	const kept = cookieHeader.split(";").map((pair) => pair.trim()).filter((pair) => pair && !pair.startsWith(`${name}=`));
	if (kept.length > 0) headers.set("cookie", kept.join("; "));
	else headers.delete("cookie");
}
function gateIdentitySessions() {
	return {
		id: "grok-gate-identity",
		hooks: { before: [{
			matcher: (ctx) => ctx.path === "/get-session",
			handler: createAuthMiddleware(async (ctx) => {
				if (!gateIdentityEnabled()) return;
				const inbound = ctx.request?.headers ?? ctx.headers;
				if (!inbound) {
					console.error(`${LOG} no request headers on /get-session`);
					return;
				}
				if (inbound.get("authorization")) return;
				if (!inbound.get("x-grok-identity")) return;
				const identity = await gateIdentityFromHeaders(inbound);
				if (!identity) {
					console.error(`${LOG} ${GATE_IDENTITY_HEADER} present but verification failed`);
					return;
				}
				const sessionCookieName = ctx.context.authCookies.sessionToken.name;
				if ((inbound.get("cookie") ?? "").includes(`${sessionCookieName}=`)) {
					const existing = await getSessionFromCtx(ctx).catch((err) => {
						console.error(`${LOG} getSessionFromCtx failed`, err);
						return null;
					});
					if (existing?.session && existing.user) {
						const accounts = await ctx.context.internalAdapter.findAccounts(existing.user.id).catch((err) => {
							console.error(`${LOG} findAccounts failed`, err);
							return null;
						});
						if (!accounts) {
							console.error(`${LOG} could not load accounts for existing session user`, { userId: existing.user.id });
							return;
						}
						if (sessionBoundToGateIdentity(accounts, identity.sub, "grok-gate")) return;
						await ctx.context.internalAdapter.deleteSession(existing.session.token).catch((err) => {
							console.error(`${LOG} deleteSession (stale non-gate session) failed`, err);
							return null;
						});
					}
				}
				try {
					const result = await handleOAuthUserInfo(ctx, {
						userInfo: {
							id: identity.sub,
							email: (identity.email ?? `${identity.sub}@viewer.grok.invalid`).toLowerCase(),
							emailVerified: Boolean(identity.email),
							name: identity.name ?? "Grok user"
						},
						account: {
							providerId: GATE_PROVIDER_ID,
							issuer: GATE_ACCOUNT_ISSUER,
							accountId: identity.sub
						}
					});
					if (result.error || !result.data) {
						console.error(`${LOG} handleOAuthUserInfo failed`, {
							error: result.error,
							hasData: Boolean(result.data),
							sub: identity.sub
						});
						return;
					}
					await setSessionCookie(ctx, result.data);
					const sessionValue = await emitSessionCookie(ctx, sessionCookieName, result.data.session.token);
					if (!sessionValue) {
						console.error(`${LOG} session created in DB but cookie was not emitted`, { userId: result.data.user.id });
						return;
					}
					const sessionDataCookie = ctx.context.authCookies.sessionData;
					await expireSessionDataCookie(ctx, sessionDataCookie);
					const headers = new Headers(Object.fromEntries(inbound.entries()));
					setRequestCookie(headers, sessionCookieName, sessionValue);
					removeRequestCookie(headers, sessionDataCookie.name);
					return { context: { headers } };
				} catch (err) {
					console.error(`${LOG} gate identity session hook threw`, err);
					return;
				}
			})
		}] }
	};
}
/** Factory used by `auth/server.ts`: `pgliteDialect(() => getPglite())`. */
function pgliteDialect(getClient) {
	return {
		createAdapter: () => new PostgresAdapter(),
		createDriver: () => new LazyPGliteDriver(getClient),
		createQueryCompiler: () => new PostgresQueryCompiler(),
		createIntrospector: (db) => new PostgresIntrospector(db)
	};
}
var LazyPGliteDriver = class {
	getClient;
	client;
	connection;
	queue = [];
	constructor(getClient) {
		this.getClient = getClient;
	}
	async init() {
		this.client = await this.getClient();
	}
	async acquireConnection() {
		if (this.client === void 0) this.client = await this.getClient();
		if (this.connection !== void 0) return new Promise((resolve) => {
			this.queue.push(resolve);
		});
		this.connection = new PGliteConnection(this.client);
		return this.connection;
	}
	async releaseConnection(connection) {
		if (connection !== this.connection) throw new Error("Invalid connection");
		const next = this.queue.shift();
		if (next === void 0) {
			this.connection = void 0;
			return;
		}
		next(this.connection);
	}
	async beginTransaction(conn, settings) {
		const c = conn;
		if (settings.isolationLevel) await c.executeQuery(CompiledQuery.raw(`start transaction isolation level ${settings.isolationLevel}`));
		else await c.executeQuery(CompiledQuery.raw("begin"));
	}
	async commitTransaction(conn) {
		await conn.executeQuery(CompiledQuery.raw("commit"));
	}
	async rollbackTransaction(conn) {
		await conn.executeQuery(CompiledQuery.raw("rollback"));
	}
	async destroy() {
		this.client = void 0;
		this.connection = void 0;
		this.queue = [];
	}
};
var PGliteConnection = class {
	client;
	constructor(client) {
		this.client = client;
	}
	async executeQuery(compiledQuery) {
		const result = await this.client.query(compiledQuery.sql, [...compiledQuery.parameters]);
		if (result.affectedRows) return {
			numAffectedRows: BigInt(result.affectedRows),
			rows: result.rows
		};
		return { rows: result.rows };
	}
	async *streamQuery(compiledQuery, chunkSize) {
		if (!Number.isInteger(chunkSize) || chunkSize <= 0) throw new Error("chunkSize must be a positive integer");
		const result = await this.client.query(compiledQuery.sql, [...compiledQuery.parameters]);
		for (let i = 0; i < result.rows.length; i += chunkSize) yield { rows: result.rows.slice(i, i + chunkSize) };
	}
};
/**
* Host patterns whose callbacks the preview client accepts. Better Auth derives
* the live preview's real origin from the request host and validates it against
* this list (wildcard-matched), so the OAuth `redirect_uri` becomes the concrete
* `https://<preview-host>/api/auth/oauth2/callback/...` the broker allows.
*/
var PREVIEW_ALLOWED_HOSTS = ["*.grok-sandbox.com"];
/**
* Self-hosted Better Auth for THIS app (server-only).
*
* Pre-wired for live preview + deploy — do not rewrite this file. To enable
* local email/password, flip the flag in `./email-password` only (see auth skill).
*
* The app runs its own Better Auth at `/api/auth/*`, so the session cookie stays
* on this app's own origin. Sign-in federates to the shared **Grok auth broker**
* (`GROK_AUTH_ISSUER`) via the `genericOAuth` plugin — the broker brokers the
* upstream sign-in methods (Google, X, …) and holds their shared secrets; this
* app only holds its own client id/secret and names the upstream it wants via
* each provider's `idp` hint.
*
* Tri-mode:
*   - Deployed: the deployer injects a per-app `GROK_AUTH_*` + `BETTER_AUTH_URL`
*     + `DATABASE_URL`, so real federated auth is persisted in Postgres.
*   - Sandbox live preview: no injection -> falls back to the shared **preview
*     client** (`./preview`) and derives the preview's `https://*.grok-sandbox.com`
*     origin from the request, so real sign-in works (no demo users). Sessions
*     and identities persist in the embedded PGLite DB (same DB as app data);
*     the process restart wipes both. Live-preview iframe clients use a bearer
*     token (partitioned cookies) — see `client.ts`.
*   - Off (`VITE_AUTH_ENABLED=false`, the shipped default): no providers;
*     `requireUserId` resolves a dev user with no database configured, and
*     throws fail-closed once `DATABASE_URL` is set (see `verify.server.ts`).
*
* NEVER import this from client code — it pulls in `pg` + the preview secret +
* server-only Better Auth internals. The client uses `@/lib/auth/client`;
* components read the user via `@/lib/auth/use-current-user`; server functions get
* a verified id via `@/lib/auth/middleware`.
*/
ensureDbReady();
/**
* Preview secret must outlive module reloads: PGLite (and its session rows) is
* stored on `globalThis`, so an HMR re-eval of this file must NOT mint a new
* signing secret or every existing session becomes invalid mid-dev. Process
* restart clears both the secret and PGLite together.
*/
var globalAuthRef = globalThis;
function previewAuthSecret() {
	globalAuthRef.__grokAuthPreviewSecret__ ??= randomBytes(32).toString("hex");
	return globalAuthRef.__grokAuthPreviewSecret__;
}
/** Read an env var, treating empty/whitespace as unset. */
var env$1 = (key) => {
	const value = process.env[key]?.trim();
	return value ? value : void 0;
};
var authDisabled = env$1("VITE_AUTH_ENABLED") === "false";
var googleClientId = env$1("GOOGLE_CLIENT_ID") ?? env$1("GROK_AUTH_CLIENT_ID");
var googleClientSecret = env$1("GOOGLE_CLIENT_SECRET") ?? env$1("GROK_AUTH_CLIENT_SECRET");
/** True when direct Google sign-in is active (real auth is enforced). */
var authConfigured = !authDisabled && Boolean(googleClientId && googleClientSecret);
var explicitBaseURL = env$1("BETTER_AUTH_URL");
var previewAllowedHosts = [...PREVIEW_ALLOWED_HOSTS];
var LOCAL_DEV_ORIGINS = [
	"http://127.0.0.1:8080",
	"http://localhost:8080",
	"http://[::1]:8080",
	"http://127.0.0.1:3000",
	"http://localhost:3000",
	"http://[::1]:3000"
];
var baseURL = explicitBaseURL ?? {
	allowedHosts: [
		...previewAllowedHosts,
		"127.0.0.1",
		"localhost",
		"[::1]"
	],
	protocol: "auto",
	fallback: "http://127.0.0.1:8080"
};
var trustedOrigins = explicitBaseURL ? [explicitBaseURL, ...LOCAL_DEV_ORIGINS] : [
	...previewAllowedHosts,
	...previewAllowedHosts.flatMap((host) => [`https://${host}`, `http://${host}`]),
	...LOCAL_DEV_ORIGINS
];
var databaseUrl = env$1("DATABASE_URL");
function isApprovedEmployeeEmail(email) {
	const normalized = (email ?? "").trim().toLowerCase();
	if (!normalized) return false;
	return EMPLOYEES.some((employee) => (employee.email ?? "").trim().toLowerCase() === normalized);
}
var database = databaseUrl ? new Pool({ connectionString: databaseUrl }) : {
	dialect: pgliteDialect(() => getPglite()),
	type: "postgres"
};
/** Session token cookie name — also read by the live-preview popup completion page. */
var SESSION_TOKEN_COOKIE = "__Host-grok-auth.session_token";
var directGoogleProviderOptions = authConfigured ? {
	clientId: googleClientId,
	clientSecret: googleClientSecret,
	prompt: "select_account",
	scope: [
		"openid",
		"profile",
		"email"
	]
} : null;
var auth = betterAuth({
	baseURL,
	secret: env$1("BETTER_AUTH_SECRET") ?? previewAuthSecret(),
	database,
	trustedOrigins,
	account: {
		encryptOAuthTokens: true,
		accountLinking: {
			enabled: true,
			trustedProviders: [...GROK_PROVIDERS.map((p) => p.providerId), GATE_PROVIDER_ID],
			requireLocalEmailVerified: false
		}
	},
	databaseHooks: { user: { create: { before: async (user) => {
		if (!isApprovedEmployeeEmail(user.email)) return false;
	} } } },
	session: { cookieCache: {
		enabled: true,
		maxAge: 300
	} },
	emailAndPassword: { enabled: true },
	advanced: {
		useSecureCookies: false,
		defaultCookieAttributes: {
			secure: true,
			sameSite: "lax",
			path: "/"
		},
		cookies: {
			session_token: { name: SESSION_TOKEN_COOKIE },
			session_data: { name: "__Host-grok-auth.session_data" },
			account_data: { name: "__Host-grok-auth.account_data" },
			dont_remember: { name: "__Host-grok-auth.dont_remember" }
		}
	},
	socialProviders: directGoogleProviderOptions ? { google: directGoogleProviderOptions } : void 0,
	plugins: [
		gateIdentitySessions(),
		bearer(),
		tanstackStartCookies()
	]
});
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var rootRouteChildren = {
	IndexRoute: Route$19.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$20
	}),
	BaoCaoRoute: Route$18.update({
		id: "/bao-cao",
		path: "/bao-cao",
		getParentRoute: () => Route$20
	}),
	ChamCongRoute: Route$17.update({
		id: "/cham-cong",
		path: "/cham-cong",
		getParentRoute: () => Route$20
	}),
	ChangePasswordRoute: Route$16.update({
		id: "/change-password",
		path: "/change-password",
		getParentRoute: () => Route$20
	}),
	ChatRoute: Route$15.update({
		id: "/chat",
		path: "/chat",
		getParentRoute: () => Route$20
	}),
	CheckInRoute: Route$14.update({
		id: "/check-in",
		path: "/check-in",
		getParentRoute: () => Route$20
	}),
	DeNghiRoute: Route$13.update({
		id: "/de-nghi",
		path: "/de-nghi",
		getParentRoute: () => Route$20
	}),
	ForgotPasswordRoute: Route$12.update({
		id: "/forgot-password",
		path: "/forgot-password",
		getParentRoute: () => Route$20
	}),
	GhiChuRoute: Route$11.update({
		id: "/ghi-chu",
		path: "/ghi-chu",
		getParentRoute: () => Route$20
	}),
	HoSoRoute: Route$10.update({
		id: "/ho-so",
		path: "/ho-so",
		getParentRoute: () => Route$20
	}),
	HuongDanRoute: Route$9.update({
		id: "/huong-dan",
		path: "/huong-dan",
		getParentRoute: () => Route$20
	}),
	KhoRoute: Route$8.update({
		id: "/kho",
		path: "/kho",
		getParentRoute: () => Route$20
	}),
	LoginRoute: Route$7.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$20
	}),
	NhanSuRoute: Route$6.update({
		id: "/nhan-su",
		path: "/nhan-su",
		getParentRoute: () => Route$20
	}),
	NhiemVuRoute: Route$5.update({
		id: "/nhiem-vu",
		path: "/nhiem-vu",
		getParentRoute: () => Route$20
	}),
	QuyRoute: Route$4.update({
		id: "/quy",
		path: "/quy",
		getParentRoute: () => Route$20
	}),
	TinDungRoute: Route$3.update({
		id: "/tin-dung",
		path: "/tin-dung",
		getParentRoute: () => Route$20
	}),
	TrungTamRoute: Route$2.update({
		id: "/trung-tam",
		path: "/trung-tam",
		getParentRoute: () => Route$20
	}),
	AdminApprovalsRoute: Route$1.update({
		id: "/admin/approvals",
		path: "/admin/approvals",
		getParentRoute: () => Route$20
	}),
	ApiAuthSplatRoute: Route.update({
		id: "/api/auth/$",
		path: "/api/auth/$",
		getParentRoute: () => Route$20
	})
};
var routeTree = Route$20._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { STAFF_BY_CENTER as A, normalizePersonKey as B, CENTERS as C, EMPLOYEES as D, DOCS as E, getCenterByCode as F, getEmployeeByEmail as I, getEmployeeById as L, SUPPORT_PHONE as M, centerName as N, GUIDES as O, findEmployeeByLooseText as P, getVisibleCenterCodes as R, cn as S, CREDIT_SEED as T, seedDaily as _, canApproveCash as a, authClient as b, canEditTask as c, formatLongDate as d, formatNum as f, todayIso as g, greetingVi as h, GROK_PROVIDERS as i, SUPPORT_ALT as j, REPORTS as k, hasPermission as l, formatVndCompact as m, useAppStore as n, canApproveProposals as o, formatVnd as p, useCurrentUser as r, canCreateTaskForOthers as s, router_exports as t, formatDate as u, seedInventory as v, COLLATERAL_SEED as w, signIn as x, seedTransfers as y, isAdminRole as z };
