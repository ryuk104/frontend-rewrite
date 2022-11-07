const base = 'http://localhost:4000/api';

async function send({ method, path, data, token }) {
	const opts = { method, headers: {} };

		
	

	try {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
		opts.headers['Authorization'] = `Bearer ${localStorage.token}`;
	} catch (error) {
		console.log(error);
	}

	return fetch(`${base}/${path}`, opts)
		.then((r) => r.text())
		.then((json) => {
			try {
				var resParsed = JSON.parse(json);

				if (resParsed?.status === 'error') {
					console.log(`API response error from ${base}/${path}: ${json}`);
				}

				return resParsed;
			} catch (err) {
				return json;
			}
		});
}



export function get(path, token) {
	return send({ method: 'GET', path, token });
}

export function del(path, token) {
	return send({ method: 'DELETE', path, token });
}

export function post(path, data, token) {
	return send({ method: 'POST', path, data, token });
}

export function put(path, data, token) {
	return send({ method: 'PUT', path, data, token });
}





























/*
import type { RequestParams } from "./types";
import { queryParams } from "./utils/utils";
type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;
type APIResponse = {
	body?: {
		[key: string]: string;
		value: string;
	};
	status: number;
	ok: boolean;
};

export async function api(fetch: Fetch, params?: RequestParams): Promise<APIResponse> {
	// Turn Object's Key-Value pairs into string
	const urlParams = queryParams(params);
	// Make fetch call
	const response = await fetch(`/api/v1/api.json`, {
		method: "POST",
		body: urlParams,

		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});
	const data = await response.json();
	// If request fails, return error.
	if (!response.ok) {
		return {
			body: response.statusText,
			status: response.status,
			ok: response.ok,
		};
	}

	// Return successful response.
	return {
		body: data,
		status: response.status,
		ok: response.ok,
	};
}
*/