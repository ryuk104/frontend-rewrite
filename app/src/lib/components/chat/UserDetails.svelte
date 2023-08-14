<script lang="ts">
	import { fly } from 'svelte/transition';
	import { expoInOut } from 'svelte/easing';

	import { selectedUserDetails } from '@utils/store';

	import About from './user-details/About.svelte';
	import MediaCard from './user-details/MediaCard.svelte';
	import ActionCard from './user-details/ActionCard.svelte';
	import SummaryCard from './user-details/SummaryCard.svelte';

	import KeyboardBackspace from '@/assets/icons/Keyboard-backspace.svelte';

	interface User {
		id: number;
		name: string;
		avatar: string;
		avatarLg: string;
		phoneNumber: string;
		about: string;
		lastMessage: string;
		lastMessageTime: string;
		activityState: string;
		chatHistory: { sender: boolean; text: string; date: string }[];
	}

	export let selectedUser: User;

	function userView() {
		selectedUserDetails.set(false);
	}
</script>

<div
	class="fixed inset-0 p-2 w-full bg-zinc-900 lg:relative h-full lg:w-[20.75rem] lg:p-0 flex flex-col justify-start items-start gap-2 overflow-x-hidden overflow-y-auto"
	transition:fly={{ duration: 1000, easing: expoInOut, x: 150 }}
>
	<div class="w-full lg:w-80 bg-zinc-850 rounded-2xl flex flex-col justify-center items-center">
		<button
			class="w-full lg:w-80 bg-zinc-850 rounded-2xl p-4 gap-4 flex justify-start items-center hover:bg-red-900 hover:bg-opacity-20 hover:text-red-500 transition-all duration-200 ease-in-out "
			on:click={userView}
		>
			<span>
				<svelte:component this={KeyboardBackspace} />
			</span>
			Go back
		</button>
	</div>

	<SummaryCard {selectedUser} />
	<About selectedUserAbout={selectedUser.about} />
	<MediaCard />
	<ActionCard userName={selectedUser.name} />
</div>
