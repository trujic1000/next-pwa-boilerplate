import fetch from "isomorphic-unfetch";
const https = require("https");

async function request({ url, method, body }) {
	const res = await fetch(url, {
		method,
		headers: {
			Authorization: "Bearer " + localStorage.getItem("token") || undefined,
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: body ? JSON.stringify(body) : undefined,
		agent: new https.Agent({
			rejectUnauthorized: false
		})
	});

	if (res.ok) return res.json();

	const err = new Error(res.statusText);
	err.response = res;
	throw err;
}

export default request;
