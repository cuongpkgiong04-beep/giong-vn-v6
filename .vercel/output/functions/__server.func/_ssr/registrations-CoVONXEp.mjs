import { r as getSql } from "./db-C3y0nZQW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/registrations-CoVONXEp.js
/**
* Registration requests store - manages pending user approvals using PostgreSQL.
*
* When a new user registers, their request is saved to the database with status "pending".
* Admin can then approve or reject the request.
* Only approved users can login to the system.
*/
/**
* Create a new registration request
*/
async function createRegistrationRequest(data) {
	const sql = await getSql();
	const id = `REG-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
	const requestedAt = (/* @__PURE__ */ new Date()).toISOString();
	await sql`
    INSERT INTO registration_requests (id, name, email, password, department, center, status, requested_at)
    VALUES (${id}, ${data.name}, ${data.email}, ${data.password}, ${data.department || null}, ${data.center || null}, 'pending', ${requestedAt})
  `;
	return {
		id,
		name: data.name,
		email: data.email,
		password: data.password,
		department: data.department,
		center: data.center,
		status: "pending",
		requestedAt
	};
}
/**
* Get all registration requests (admin only)
*/
async function getAllRegistrationRequests() {
	return (await (await getSql())`
    SELECT * FROM registration_requests ORDER BY requested_at DESC
  `).map((row) => ({
		id: row.id,
		name: row.name,
		email: row.email,
		password: row.password,
		department: row.department || void 0,
		center: row.center || void 0,
		status: row.status,
		requestedAt: row.requested_at,
		reviewedAt: row.reviewed_at || void 0,
		reviewedBy: row.reviewed_by || void 0,
		rejectionReason: row.rejection_reason || void 0
	}));
}
/**
* Get registration request by ID
*/
async function getRegistrationRequestById(id) {
	const rows = await (await getSql())`
    SELECT * FROM registration_requests WHERE id = ${id}
  `;
	if (rows.length === 0) return null;
	const row = rows[0];
	return {
		id: row.id,
		name: row.name,
		email: row.email,
		password: row.password,
		department: row.department || void 0,
		center: row.center || void 0,
		status: row.status,
		requestedAt: row.requested_at,
		reviewedAt: row.reviewed_at || void 0,
		reviewedBy: row.reviewed_by || void 0,
		rejectionReason: row.rejection_reason || void 0
	};
}
/**
* Approve a registration request
*/
async function approveRegistration(id, reviewedBy) {
	await (await getSql())`
    UPDATE registration_requests 
    SET status = 'approved', reviewed_at = ${(/* @__PURE__ */ new Date()).toISOString()}, reviewed_by = ${reviewedBy}
    WHERE id = ${id}
  `;
	return getRegistrationRequestById(id);
}
/**
* Reject a registration request
*/
async function rejectRegistration(id, reviewedBy, reason) {
	await (await getSql())`
    UPDATE registration_requests 
    SET status = 'rejected', reviewed_at = ${(/* @__PURE__ */ new Date()).toISOString()}, reviewed_by = ${reviewedBy}, rejection_reason = ${reason || null}
    WHERE id = ${id}
  `;
	return getRegistrationRequestById(id);
}
/**
* Check if an email has a pending registration
*/
async function isEmailPending(email) {
	return (await (await getSql())`
    SELECT COUNT(*) as count FROM registration_requests 
    WHERE LOWER(email) = LOWER(${email}) AND status = 'pending'
  `)[0].count > 0;
}
/**
* Check if an email was rejected
*/
async function isEmailRejected(email) {
	return (await (await getSql())`
    SELECT COUNT(*) as count FROM registration_requests 
    WHERE LOWER(email) = LOWER(${email}) AND status = 'rejected'
  `)[0].count > 0;
}
//#endregion
export { isEmailRejected as a, isEmailPending as i, createRegistrationRequest as n, rejectRegistration as o, getAllRegistrationRequests as r, approveRegistration as t };
