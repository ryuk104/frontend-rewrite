<script>
	import Nav from '../components/nav.svelte';
	import SideBar from '../components/sideBar.svelte';
	import PersonalDetails from '../components/personalDetails.svelte';
	import UniversityDetails from '../components/universityDetails.svelte';
	import Interests from '../components/interests.svelte';
	import Socials from '../components/socials.svelte';
	import CurrentQuestion from '../stores/questionStore';
	import CurrentUser from '../stores/userDataStore';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	let currentQuestions;

	CurrentQuestion.subscribe((value) => {
		currentQuestions = value;
	});
	onMount(() => {
		if (!$CurrentUser.loggedIn) {
			goto('/login');
		}
	});
</script>

<div class="sticky top-0 w-full z-40">
	<Nav />
</div>

<div class="flex flex-no-wrap">
	<div class="fixed">
		<SideBar />
	</div>
	<div
		style="min-height: 93vh;"
		class="sm:ml-64 container mx-auto py-10 md:w-4/5 w-11/12 px-6 overflow--y-scroll "
	>
		{#if currentQuestions == 'Socials'}
			<Socials />
		{:else if currentQuestions == 'University Details'}
			<UniversityDetails />
		{:else if currentQuestions == 'Interests'}
			<Interests />
		{:else}
			<PersonalDetails />
		{/if}
	</div>
</div>
<svelte:head>
	<title>Questions</title>
</svelte:head>
