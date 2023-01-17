<script>
	import { browser } from '$app/environment';
	import { click_outside } from '$lib/components/notes/utils';
	import { onMount } from 'svelte';
	import Pages from '$lib/components/notes/Pages.svelte';

	let mobileMenu = false;
	let workspace_menu = false;
	let settings_menu = false;
	let trash_open = false;
	let sidebar_open = true;
	let loaded = false;
	export let workspace = {
		meta: {
			title: 'Evidence Demo',
			color1: '#046ade',
			color2: '#0f8da0',
			color3: '#08a86d'
		},
		pages: [
			{
				title: 'Customer',
				id: 'customer',
				children: [{ title: 'NPS Survey', id: 'customer/NPS_survey' }]
			},
			{
				title: 'Marketing',
				id: 'marketing',
				children: [{ title: 'Attribution Model', id: 'marketing/attribution_model' }]
			},
			{
				title: 'Operations',
				id: 'operations',
				children: [
					{ title: 'Pick Lists', id: 'operations/pick_lists' },
					{ title: 'Unsatisfied Customers', id: 'operations/unsatisfied_customers' }
				]
			},
			{ title: 'Business Performance', id: 'business_performance' },
			{ title: 'Retail', id: 'retail' }
		]
	};

	$: set_sidebar_local(sidebar_open);

	onMount(async () => {
		if (!browser) return;

		if (localStorage.sidebar_open === 'false') {
			sidebar_open = false;
		} else sidebar_open = true;

		loaded = true;
	});

	function set_sidebar_local() {
		if (!loaded) return;
		localStorage.setItem('sidebar_open', sidebar_open);
	}

	function handleKeydown(e) {
		if (e.key == '\\' && e.ctrlKey) return (sidebar_open = !sidebar_open);
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="z-10 md:hidden flex">
	<button
		on:click={() => (mobileMenu = true)}
		type="button"
		class="p-4 grow -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-left rounded-md text-slate-500 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
	>
		<span class="sr-only">Open sidebar</span>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 12 12"
			stroke-width="1.5"
			stroke="currentColor"
			class="test"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
			/>
		</svg>


	</button>
</div>

<div class="main">
	<div>
		<div
			class="relative z-40 md:hidden transition-opacity ease-linear duration-300 {mobileMenu
				? 'opacity-100'
				: 'hidden opacity-0'}"
			role="dialog"
			aria-modal="true"
		>
			<div class="fixed inset-0 bg-slate-600 bg-opacity-75 backdrop-blur-sm" />

			<div
				class="fixed inset-0 flex z-40 transition ease-in-out duration-300 transform {mobileMenu
					? 'slate-x-0'
					: '-slate-x-full'}"
			>
				<div
					class="relative flex-1 flex flex-col max-w-sm w-full bg-slate-50 transition-all ease-in-out duration-300 {mobileMenu
						? 'opacity-100'
						: 'opacity-0'}"
				>
					<div class="button">
						<button
							on:click={() => (mobileMenu = false)}
							type="button"
							class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
						>
							<span class="sr-only">Close sidebar</span>
							<svg
								class="h-[28px] w-[28px] text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					<div class="flex-1 h-0 py-4 overflow-y-auto">
						<div class="flex-shrink-0 flex items-center px-1">
							<div class="flex items-center w-full rounded-lg">
								<button
									on:click={() => {}}
									type="button"
									class="inset-y-0 right-0 flex items-center rounded-md focus:outline-none py-2 hover:bg-slate-200/80 w-full"
								>
									<div
										class="w-6 h-6 rounded-full ml-2"
										style="background:blue; background-image:linear-gradient(to right, {workspace.meta
											? workspace.meta.color1
											: '#000'}, {workspace.meta ? workspace.meta.color2 : '#000'}, {workspace.meta
											? workspace.meta.color3
											: '#000'})"
									/>
									<span class="px-2 font-bold gradient">evidence</span>
								</button>
							</div>
						</div>
						<nav class="px-2 overflow-scroll h-full">
							<button
								on:click={() => {}}
								type="button"
								class="my-2 p-2 inset-y-0 right-0 flex items-center rounded-md focus:outline-none py-2 hover:bg-slate-200/80 w-full text-sm group"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									class="w-4 h-4 text-slate-400 group-hover:text-slate-500 ml-1"
								>
									<path
										fill-rule="evenodd"
										d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z"
										clip-rule="evenodd"
									/>
								</svg>

								<span class="px-2 text-left ml-2 text-slate-700">Settings</span>
							</button>

							<hr />
							{#if workspace.pages}
								<Pages bind:pages={workspace.pages} />
							{/if}
						</nav>
					</div>
					<div class="flex-shrink-0 flex border-t border-slate-200 p-4">
						<button
							on:click={() => {}}
							class="text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 group flex items-center px-2 py-2 text-sm font-medium rounded-lg w-full"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="text-slate-400 group-hover:text-slate-500 mr-3 flex-shrink-0 h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="1.5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
								/>
							</svg>

							New Page
						</button>
					</div>
				</div>

				<div class="flex-shrink-0 w-14" on:click={() => (mobileMenu = false)} />
			</div>
		</div>
		{#if !sidebar_open}
			<button
				on:click={() => (sidebar_open = true)}
				type="button"
				class="fixed z-50 left-2 p-2 top-3 text-slate-500 hidden md:block border border-transparent hover:border-slate-200 hover:shadow rounded-md hover:bg-slate-100"
			>
				<span class="sr-only">Open sidebar</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
				</svg>
			</button>
		{/if}
		<div
			id="sidebar-desktop"
			class="hidden md:flex {sidebar_open
				? 'md:w-64'
				: 'md:w-0'} transition md:flex-col md:fixed md:inset-y-0"
		>
			<button
				id="close-sidebar"
				on:click={() => (sidebar_open = false)}
				type="button"
				class="absolute right-2 p-2 top-3 text-slate-500 hover:text-slate-600 hover:bg-slate-200 rounded-lg hidden"
			>
				<span class="sr-only">Close sidebar</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 "
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
				</svg>
			</button>
			<div class="flex-1 flex flex-col min-h-0 border-r border-slate-200 bg-slate-50">
				<div class="flex-1 flex flex-col pt-3 overflow-y-auto overflow-x-hidden">
					<div class="px-1">
						<div class="flex items-center w-full rounded-lg">
							<button
								on:click={() => {}}
								type="button"
								class="inset-y-0 right-0 flex items-center rounded-md focus:outline-none py-2 hover:bg-slate-200/80 w-full"
							>
								{#if workspace.meta}
									<div
										class="w-6 h-6 rounded-full ml-2"
										style="background:blue; background-image:linear-gradient(to right, {workspace
											.meta.color1},{workspace.meta.color2},{workspace.meta.color3}"
									/>
									<span class="px-2 text-left ml-2 truncate max-w-[140px] text-slate-700"
										>{workspace.meta.title}</span
									>
								{:else}
									<div class="w-6 h-6 rounded-full ml-2 animate-pulse bg-slate-400" />
									<span
										class="px-2 text-left ml-2 truncate w-[140px] h-6 bg-slate-400 animate-pulse"
									/>
								{/if}

								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									class="w-5 h-5 text-slate-500"
								>
									<path
										fill-rule="evenodd"
										d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
						</div>

						<button
							on:click={() => {}}
							type="button"
							class="my-2 p-2 inset-y-0 right-0 flex items-center rounded-md focus:outline-none py-2 hover:bg-slate-200/80 w-full text-sm group"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="w-4 h-4 text-slate-400 group-hover:text-slate-500 ml-1"
							>
								<path
									fill-rule="evenodd"
									d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z"
									clip-rule="evenodd"
								/>
							</svg>

							<span class="px-2 text-left ml-2 text-slate-700">Settings</span>
						</button>
					</div>
					<hr />
					<nav class="flex-1 px-1 bg-slate-50 overflow-y-scroll overflow-x-hidden">
						{#if workspace.pages}
							<Pages bind:pages={workspace.pages} />
						{/if}
					</nav>
				</div>
				<div class="flex-shrink-0 border-t border-slate-200 p-2 {sidebar_open ? '' : 'hidden'}">
					<button
						on:click={() => {}}
						class="text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 group flex items-center px-2 py-2 text-sm font-medium rounded-lg w-full"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="text-slate-400 group-hover:text-slate-500 mr-3 flex-shrink-0 h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1.5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
							/>
						</svg>

						New Page
					</button>
				</div>
			</div>
		</div>
		<div class="{sidebar_open ? 'md:pl-64' : 'md:pl-0'} transition-all w-full">
			<main class="py-4 sm:py-16">
				<slot />
			</main>
		</div>
	</div>
</div>

<style>

	.main {
		background-color: red;
		margin: 0;
        padding: 0;
        display: flex;
        position: fixed;
        top:5%;
        left: 300px;
        height: 96%;
        width: 10%;
		scroll-behavior: smooth;
		overflow-x: scroll;
	}

	.button {
		position: absolute;
		top: 0;
		right: 0;
		padding-top: 2px;
		margin-right: 12px;

	}


	.test {
		width: 10px;
	}


	#sidebar-desktop:hover #close-sidebar {
		display: block;
	}

	.gradient {
		background: -webkit-linear-gradient(315deg, #046ade 0, #08a86d 75%);
		text-decoration: none;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
