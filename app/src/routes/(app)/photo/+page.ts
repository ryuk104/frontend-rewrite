/*

export const prerender = false;
import { redirect } from '@sveltejs/kit';
import { onMount } from "svelte";
import type { PageLoad } from './$types';
import { browser } from '$app/environment';

let Api;
onMount(async () => {
  Api = await import("$lib/utils/ApiAction");
});


export const load: PageLoad = async ({ parent }) => {
	const { user } = await parent();
	if (user) {
		throw redirect(302, '/photos');
	}

	if (browser) {
		const { data } = await Api.userApi.getUserCount();

		return {
			isAdminUserExist: data.userCount != 0
		};
	}
};
*/