
/*
import { onMount } from "svelte";

let API;
onMount(async () => {
  API = await import("$lib/utils/ApiAction");
});
import * as cookieParser from 'cookie';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request }) => {
	try {
		const cookies = cookieParser.parse(request.headers.get('cookie') || '');
		const accessToken = cookies['immich_access_token'];

		if (!accessToken) {
			return {
				user: undefined
			};
		}

		API.setAccessToken(accessToken);
		const { data: userInfo } = await API.userApi.getMyUserInfo();

		return {
			user: userInfo
		};
	} catch (e) {
		console.error('[ERROR] layout.server.ts [LayoutServerLoad]: ', e);
		return {
			user: undefined
		};
	}
};
*/