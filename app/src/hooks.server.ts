import * as cookie from 'cookie';

/** @type {import('@sveltejs/kit').Handle} */
/*
export async function handle({ event, resolve }) {
	event.locals.user = await getUserInformation(event.cookies.get('sessionid'));
   
	const response = await resolve(event);
	response.headers.set('x-custom-header', 'potato');
   
	return response;
  }

export async function handle({ event, resolve }) {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	const jwt = cookies.jwt && Buffer.from(cookies.jwt, 'base64').toString('utf-8');
	event.locals.user = jwt ? JSON.parse(jwt) : null;
	return await resolve(event);
}

export function getSession({ locals }) {
	return {
		user: locals.user && {
			username: locals.user.username,
			email: locals.user.email,
			image: locals.user.image,
			bio: locals.user.bio
		}
	};
}
*/


/*
import { dev } from "$app/environment";

import type { Handle } from "@sveltejs/kit";

const headers = {
	"X-Frame-Options": "SAMEORIGIN",
	"Referrer-Policy": "no-referrer",
	"Permissions-Policy": `accelerometer=(), autoplay="*", camera=(), document-domain=(), encrypted-media=(), fullscreen=(), gyroscope=(), interest-cohort=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), sync-xhr=(), usb=(), xr-spatial-tracking=(), geolocation=()`,
	"X-Content-Type-Options": "nosniff",
	"Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
};



const checkUserAgent = (userAgent: string) =>
	/i(Phone|Pad|Pod)/i.test(userAgent) ? "iOS" : /Android/i.test(userAgent) ? "Android" : "Other";

export const handle: Handle = async ({ event, resolve }) => {
	const UA = event.request.headers.get("User-Agent");
	const agentType = checkUserAgent(UA);
	event.locals.iOS = agentType === "iOS";
	event.locals.Android = agentType === "Android";

	const response = await resolve(event);
	for (const key in headers) {
		response.headers.set(`${key}`, `${headers[key]}`);
	}
	return response;
};
*/

//#NODE process.on('SIGINT', function () { process.exit(); }); // Ctrl+C
//#NODE process.on('SIGTERM', function () { process.exit(); }); // docker stop