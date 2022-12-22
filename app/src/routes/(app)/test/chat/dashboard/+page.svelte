<!-- Renders the dashboard -->
<script>
	import DashboardSideBar from '$lib/components/chattest/dashboardSideBar.svelte';
	import CarouselGroupCard from '$lib/components/chattest/carouselGroupCard.svelte';
	import CurrentUser from '$lib/stores/chat/userDataStore';
	import { onMount } from 'svelte/internal';
	import { goto } from '$app/navigation';

	
</script>

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
