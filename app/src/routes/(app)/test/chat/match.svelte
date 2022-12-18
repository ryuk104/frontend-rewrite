<script>
	import currentUser from '../stores/userDataStore.js';
	import MatchProfile from '../components/matchProfile.svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { endpoints } from '$lib/endpoints.js';

	let profiles = [
		{
			first_name: 'No',
			last_name: 'Matches',
			username: 'Sorry',
			city: '',
			country: '',
			user_id: 'invalid',
			faculty: '',
			major: '',
			photo: '',
			univesity: '',
			staying_in: '',
			socials: {
				instagram: '',
				twitter: ''
			}
		}
	];
	let match = true;
	let numProfiles;

	onMount(async () => {
		const user = get(currentUser);
		if (!user.loggedIn) {
			goto('/login');
			return;
		}
		if (user.newUser) {
			goto('/questions');
			return;
		}
		//Get user matches
		try {
			const rawResponse = await fetch(endpoints.database + user.id + '/match', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					Authorization: 'JWT ' + user.token,
					'Content-Type': 'application/json'
				}
			});
			profiles = await rawResponse.json(); //get all matches
			numProfiles = profiles.length;
			if (profiles.hasOwnProperty('message') || numProfiles == 0) {
				match = false;
			} else {
				match = true;
				// console.log(profiles);
				// console.log(JSON.stringify(profiles[0].first_name));
				// console.log(JSON.stringify(numProfiles));
				let user_ids = [];
				for (let i = 0; i < numProfiles; i++) {
					user_ids[i] = { id: profiles[i].user_id };
				}
				//Create a chat with each match
				const response = await fetch(endpoints.database + '/conversation/create/matches', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						Authorization: 'JWT ' + user.token,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(user_ids)
				});
				let data = await response.json();
				// console.log(data);
			}
		} catch (error) {
			console.error(error);
		}
	});

	let currentProfile = 0;
	let disableLeftButton = 'none';
	let disableRightButton;

	//Navigates to the next matched profile
	const next = () => {
		if (currentProfile < numProfiles - 1) {
			currentProfile++;
			disableLeftButton = 'block';
		}
		if (currentProfile == numProfiles - 1) {
			disableRightButton = 'none';
			return;
		} else {
			disableRightButton = 'block';
			return;
		}
	};
	//Navigates to the previous matched profile
	const previous = () => {
		if (currentProfile > 0) {
			currentProfile--;
			disableRightButton = 'block';
		}
		if (currentProfile == 0) {
			disableLeftButton = 'none';
			return;
		} else {
			disableRightButton = 'block';
			return;
		}
	};
</script>

<svelte:head>
	<title>Match</title>
	<style>
		body {
			background-color: gray;
		}
	</style>
</svelte:head>

<div />
<div class="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
	<!--Main Col-->

	<svg
		on:click|preventDefault={next}
		class="fill-current text-gold absolute  h-20 right-0  hover:text-yellow-400 z-10 cursor-pointer"
		version="1.1"
		id="Layer_1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		x="0px"
		y="0px"
		viewBox="0 0 330 330"
		style="display:{disableRightButton}; enable-background:new 0 0 330 330;"
	>
		<path
			id="XMLID_222_"
			d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
		 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
		 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
		 C255,161.018,253.42,157.202,250.606,154.389z"
		/>
	</svg>
	<svg
		on:click|preventDefault={previous}
		class="fill-current text-gold rotate-180 absolute  h-20 left-0 hover:text-yellow-400 z-10 cursor-pointer"
		version="1.1"
		id="Layer_1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		x="0px"
		y="0px"
		viewBox="0 0 330 330"
		style="display:{disableLeftButton}; enable-background:new 0 0 330 330;"
		xml:space="preserve"
	>
		<path
			id="XMLID_222_"
			d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
			 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
			 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
			 C255,161.018,253.42,157.202,250.606,154.389z"
		/>
	</svg>
	<MatchProfile profile={profiles[currentProfile]} {match} />
</div>
