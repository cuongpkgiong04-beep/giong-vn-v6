import { r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-C3y0nZQW.mjs";
import { t as createServerRpc } from "./createServerRpc-CN-evIEF.mjs";
import { randomBytes, scrypt } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-change-password-Df8ckcpi.js
/**
* Server function for changing password
*/
var config = {
	N: 16384,
	r: 16,
	p: 1,
	dkLen: 64
};
function generateKey(password, salt) {
	return new Promise((resolve, reject) => {
		scrypt(password.normalize("NFKC"), salt, config.dkLen, {
			N: config.N,
			r: config.r,
			p: config.p,
			maxmem: 128 * config.N * config.r * 2
		}, (err, key) => {
			if (err) reject(err);
			else resolve(key);
		});
	});
}
async function hashPassword(password) {
	const salt = randomBytes(16).toString("hex");
	return `${salt}:${(await generateKey(password, salt)).toString("hex")}`;
}
async function verifyPassword(hash, password) {
	const [salt, key] = hash.split(":");
	if (!salt || !key) return false;
	return (await generateKey(password, salt)).toString("hex") === key;
}
/**
* Change password - requires current password verification
*/
var changePassword_createServerFn_handler = createServerRpc({
	id: "662fec499574d55d1b8072d3d530e0434af959dddb0a36e24b5a767e08b24cb1",
	name: "changePassword",
	filename: "src/routes/api/auth-change-password.ts"
}, (opts) => changePassword.__executeServer(opts));
var changePassword = createServerFn({ method: "POST" }).validator((data) => data).handler(changePassword_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const { currentPassword, newPassword } = data;
	const accounts = await sql`
      SELECT id, password FROM account WHERE "userId" = ${"p2zXUDUwQf5fr3SaigL0YIpXp79HutVu"} AND "providerId" = 'credential'
    `;
	if (accounts.length === 0) throw new Error("Không tìm thấy tài khoản");
	const account = accounts[0];
	if (!await verifyPassword(account.password, currentPassword)) throw new Error("Mật khẩu hiện tại không đúng");
	await sql`
      UPDATE account SET password = ${await hashPassword(newPassword)}, "updatedAt" = NOW() 
      WHERE id = ${account.id}
    `;
	return {
		success: true,
		message: "Đổi mật khẩu thành công"
	};
});
//#endregion
export { changePassword_createServerFn_handler };
