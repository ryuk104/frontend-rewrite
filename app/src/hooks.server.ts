import * as cookie from 'cookie';
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	//event.locals.userid = cookies.userid || uuid();

	const response = await resolve(event);

	if (!cookies.userid) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers.set(
			'set-cookie',
			cookie.serialize('userid', event.locals.userid, {
				path: '/',
				httpOnly: true
			})
		);
	}

	return response;
};

/*
export const handle: Handle = async ({ event, resolve }) => {
	// get cookies from browser
	const session = event.cookies.get('session')

	if (!session) {
		// if there is no session load page as normal
		return await resolve(event)
	}

	// find the user based on the session
	const user = await db.user.findUnique({
		where: { userAuthToken: session },
		select: { username: true, role: true },
	})

	// if `user` exists set `events.local`
	if (user) {
		event.locals.user = {
			name: user.username,
			role: user.role.name,
		}
	}

	// load page as normal
	return await resolve(event)
}
*/
/*
	You can use a custom redirect if you want...
	function redirect(location: string) {
		return new Response(undefined, {
			status: 303,
			headers: { location },
		})
	}
	...and redirect pages inside hooks.server.ts
	if (!session) {
		if (event.url.pathname === '/admin') {
			return redirect('/')
		}
		return await resolve(event)
	}
	...but doing it inside `load` for the protected
	routes you can invalidate the data on the page
*/

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