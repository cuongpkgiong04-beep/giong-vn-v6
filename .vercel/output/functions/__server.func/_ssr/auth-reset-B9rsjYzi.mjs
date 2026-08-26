import { r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-C3y0nZQW.mjs";
import { t as createServerRpc } from "./createServerRpc-CN-evIEF.mjs";
import crypto from "crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-reset-B9rsjYzi.js
/**
* Server function for password reset using createServerFn
*/
/**
* Generate a random temporary password
*/
function generateTempPassword() {
	const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
	const special = "!@#$%";
	let password = "";
	password += chars[Math.floor(Math.random() * 23)];
	password += chars[Math.floor(Math.random() * 23) + 23];
	password += chars[Math.floor(Math.random() * 10) + 46];
	password += special[Math.floor(Math.random() * 5)];
	for (let i = 0; i < 8; i++) password += chars[Math.floor(Math.random() * 56)];
	return password.split("").sort(() => Math.random() - .5).join("");
}
/**
* Hash password using scrypt (same as Better Auth)
*/
function hashPassword(password) {
	return new Promise((resolve, reject) => {
		const salt = crypto.randomBytes(16).toString("hex");
		crypto.scrypt(password, salt, 64, (err, hash) => {
			if (err) reject(err);
			resolve(salt + ":" + hash.toString("hex"));
		});
	});
}
/**
* Send password reset - generates temporary password
*/
var sendPasswordReset_createServerFn_handler = createServerRpc({
	id: "222c224a39e1886e9917b5cc1b07475326f45acc594b02846a472db067fb3f9b",
	name: "sendPasswordReset",
	filename: "src/routes/api/auth-reset.ts"
}, (opts) => sendPasswordReset.__executeServer(opts));
var sendPasswordReset = createServerFn({ method: "POST" }).validator((data) => data).handler(sendPasswordReset_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const { email } = data;
	const users = await sql`
      SELECT id, email, name FROM "user" WHERE LOWER(email) = LOWER(${email})
    `;
	if (users.length === 0) throw new Error("Không tìm thấy tài khoản với email này");
	const user = users[0];
	const tempPassword = generateTempPassword();
	const hashedPassword = await hashPassword(tempPassword);
	if ((await sql`
      SELECT id FROM account WHERE "userId" = ${user.id} AND "providerId" = 'credential'
    `).length > 0) await sql`
        UPDATE account SET password = ${hashedPassword}, "updatedAt" = NOW() 
        WHERE "userId" = ${user.id} AND "providerId" = 'credential'
      `;
	else await sql`
        INSERT INTO account (id, "accountId", "providerId", "userId", password, "createdAt", "updatedAt")
        VALUES (${crypto.randomUUID()}, ${user.id}, 'credential', ${user.id}, ${hashedPassword}, NOW(), NOW())
      `;
	console.log(`[Password Reset] User: ${user.email}, Temp Password: ${tempPassword}`);
	return {
		success: true,
		tempPassword,
		message: `Mật khẩu tạm thời đã được tạo cho ${user.name}`
	};
});
//#endregion
export { sendPasswordReset_createServerFn_handler };
