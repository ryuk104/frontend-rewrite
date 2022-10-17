
  import { onMount } from "svelte";

let axiosApi;
onMount(async () => {
  axiosApi = await import("$lib/utils/axiosApi");
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

		axiosApi.setAccessToken(accessToken);
		const { data: userInfo } = await axiosApi.userApi.getMyUserInfo();

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
