export const prerender = false;
import { redirect } from '@sveltejs/kit';
import { onMount } from "svelte";
import type { PageLoad } from './$types';
import { browser } from '$app/environment';

let axiosApi;
onMount(async () => {
  axiosApi = await import("$lib/utils/axiosApi");
});


export const load: PageLoad = async ({ parent }) => {
	const { user } = await parent();
	if (user) {
		throw redirect(302, '/photos');
	}

	if (browser) {
		const { data } = await axiosApi.userApi.getUserCount();

		return {
			isAdminUserExist: data.userCount != 0
		};
	}
};
