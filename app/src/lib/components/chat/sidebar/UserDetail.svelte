<script lang="ts">
	import { browser } from '$app/environment';
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { expoInOut } from 'svelte/easing';

	import Avatar from '@components/fundamentals/Avatar.svelte';

	import Add from '@/assets/icons/Add.svelte';
	import Archive from '@/assets/icons/Archive.svelte';
	import Bookmark from '@/assets/icons/Bookmark.svelte';
	import Call from '@/assets/icons/Call.svelte';
	import Groups from '@/assets/icons/Groups.svelte';
	import KeyboardBackspace from '@/assets/icons/Keyboard-backspace.svelte';
	import Logout from '@/assets/icons/Logout.svelte';
	import Settings from '@/assets/icons/Settings.svelte';

	import currentUser from '@/assets/imgs/current-user-l.jpg';
	import cover from '@/assets/imgs/cover.jpg';
	import swapAccount from '@/assets/imgs/swap-account.jpg';

	const dispatch = createEventDispatcher();
	export let isActive: boolean = false;

	function handleBackground() {
		dispatch('close', {});
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isActive) {
			handleBackground();
		}
	}

	onMount(() => {
		document.addEventListener('keydown', handleKeydown);
	});
	onDestroy(() => {
		if (browser) {
			document.removeEventListener('keydown', handleKeydown);
		}
	});

	// MOCK DATA

	const user = {
		userName: 'Darrell Steward',
		avatar: currentUser,
		cover: cover,
		status: 'Deep focused 👩‍💻'
	};

	const links = [
		{ icon: Groups, label: 'New Group' },
		{ icon: Bookmark, label: 'Saved Messages' },
		{ icon: Archive, label: 'Archived Messages' },
		{ icon: Call, label: 'Voice  & Video Calls' },
		{ icon: Settings, label: 'Settings' }
	];

	const accountActions = [
		{ icon: Add, label: 'Add another account' },
		{ icon: Logout, label: 'Sign out' }
	];
</script>

{#if isActive}
	<div
		class="fixed inset-0 z-40 bg-zinc-900 bg-opacity-90 cursor-pointer backdrop-blur-[2px]"
		in:fade={{ duration: 500 }}
		out:fade={{ duration: 500, delay: 500 }}
		on:click={handleBackground}
		on:keydown={(event) => {
			if (event.key === 'Enter' && isActive) {
				handleBackground();
			}
		}}
	/>

	<div
		class="fixed w-full top-0 lg:w-81 lg:h-full flex flex-col justify-start items-start gap-2 z-50 lg:inset-y-0 left-0 p-2 lg:max-h-screen overflow-x-hidden overflow-y-auto"
		transition:fly={{ duration: 1000, easing: expoInOut, x: -150 }}
	>
		<div class="w-full lg:w-80 bg-zinc-850 rounded-2xl flex flex-col justify-center items-center">
			<button
				class="w-full lg:w-80 bg-zinc-850 rounded-2xl p-4 gap-4 flex justify-start items-center hover:bg-red-900 hover:bg-opacity-20 hover:text-red-500 transition-all duration-200 ease-in-out "
				on:click={handleBackground}
			>
				<span>
					<svelte:component this={KeyboardBackspace} />
				</span>
				Go back
			</button>
		</div>

		<div class="w-full lg:w-80 bg-zinc-850 rounded-2xl relative overflow-hidden">
			<div class="z-[1] w-full absolute top-0 left-0 h-20 overflow-hidden">
				<img class="w-full" src={user.cover} alt="cover" />
			</div>
			<div class="z-[2] relative flex flex-col justify-center items-center py-8">
				<Avatar src={user.avatar} alt="user's avatar" size="80" />
				<span class="text-lg mt-4">{user.userName}</span>
				<span class="text-sm text-zinc-500 mt-1">{user.status}</span>
			</div>
		</div>

		<div
			class="w-full lg:w-80 bg-zinc-850 rounded-2xl p-2 flex flex-col justify-between items-start"
		>
			{#each links as link}
				<span
					class="p-4 py-3 cursor-pointer w-full rounded-2xl hover:bg-green-900 hover:bg-opacity-20 hover:text-green-500 transition-all duration-200 ease-in-out flex justify-start items-center gap-4 group"
				>
					<span class="h-6 w-6 block">
						<svelte:component
							this={link.icon}
							class="text-zinc-500 group-hover:text-green-500 transition-all duration-200 ease-in-out"
						/>
					</span>
					<span>{link.label}</span>
				</span>
			{/each}
		</div>

		<div
			class="w-full lg:w-80 bg-zinc-850 rounded-2xl p-2 flex flex-col justify-between items-start"
		>
			<span
				class="p-4 py-3 cursor-pointer w-full rounded-2xl hover:bg-green-900 hover:bg-opacity-20 hover:text-green-500 transition-all duration-200 ease-in-out flex justify-start items-center gap-4"
			>
				<span class="h-6 w-6 block">
					<img src={swapAccount} alt="avatar of other account of the user" class="rounded-full" />
				</span>
				<span>B.simmons</span>
			</span>
			{#each accountActions as action}
				<span
					class="p-4 py-3 cursor-pointer w-full rounded-2xl hover:bg-green-900 hover:bg-opacity-20 hover:text-green-500 transition-all duration-200 ease-in-out flex justify-start items-center gap-4 group"
				>
					<span class="h-6 w-6 block">
						<svelte:component
							this={action.icon}
							class="text-zinc-500 group-hover:text-green-500 transition-all duration-200 ease-in-out"
						/>
					</span>
					<span>{action.label}</span>
				</span>
			{/each}
		</div>
	</div>
{/if}
