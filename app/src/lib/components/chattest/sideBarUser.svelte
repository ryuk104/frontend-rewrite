<script>
	import { onMount } from 'svelte';

	import PersonalDetails from '$lib/stores/chat/personalDetailsStore';
	import CurrentUser from '$lib/stores/chat/userDataStore';
	let userInfo = {};
	let user;
	PersonalDetails.subscribe((value) => {
		userInfo = value;
	});
	CurrentUser.subscribe((value) => {
		user = value;
	});
	onMount(() => {
		// user = get(CurrentUser);
		// photo = user.photo;
		if (userInfo.firstName == '') {
			userInfo = { firstName: 'Enter', lastName: 'Name' };
		}
	});
</script>

<div class="mt-8 text-center">
	<img
		src={user.photo}
		alt=""
		class="border-4 border-yellow-500 w-24 h-24 m-auto rounded-full object-cover lg:w-28 lg:h-28"
	/>
	{#if userInfo}
		<h5 class="mt-4 text-xl font-semibold text-gold lg:block">
			{userInfo.firstName}
			&nbsp;
			{userInfo.lastName}
		</h5>
	{/if}
</div>
