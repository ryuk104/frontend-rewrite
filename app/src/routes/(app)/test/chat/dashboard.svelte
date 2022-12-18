<!-- Renders the dashboard -->
<script>
	import Nav from '../components/nav.svelte';
	import DashboardSideBar from '../components/dashboardSideBar.svelte';
	import CarouselGroupCard from '../components/carouselGroupCard.svelte';
	import CurrentUser from '../stores/userDataStore';
	import { onMount } from 'svelte/internal';
	import { goto } from '$app/navigation';

	//Checks if newuser of logged in
	//If new user then send the user to fill out the question
	//if login and not a new user then they can access the dashboard
	onMount(() => {
		if (!$CurrentUser.loggedIn) {
			goto('/login');
		}
		if ($CurrentUser.newUser) {
			goto('/questions');
		}
	});
</script>

<div class="sticky top-0 w-full z-40">
	<Nav />
</div>
<div class="flex flex-no-wrap">
	<div class="fixed z-30">
		<DashboardSideBar />
	</div>
	<div
		style="min-height: 93vh;"
		class="md:ml-64 xl:ml-80 container mx-auto py-2 sm:py-10 md:w-4/5 w-11/12 px-6 overflow--y-scroll "
	>
		<p class="w-full text-center">Unimplemented Feature</p>
		<div class="">
			<div class="sm:px-6 2xl:container">
				<div class="grid gap-6 xl:grid-cols-3">
					<div>
						<CarouselGroupCard name={'Popular Groups'} />
					</div>
					<div>
						<CarouselGroupCard name={'Suggested Groups'} />
					</div>
					<div>
						<CarouselGroupCard name={'Some other listing'} />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>
