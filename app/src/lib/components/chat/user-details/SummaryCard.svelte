<script lang="ts">
	import Call from '@/assets/icons/Call.svelte';
	import Videocam from '@/assets/icons/Videocam.svelte';

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
</script>

<div
	class="w-full lg:w-80 bg-zinc-850 rounded-2xl p-4 gap-6 flex flex-col justify-center items-center"
>
	<img src={selectedUser.avatarLg} alt="ss" class="w-32 h-32 rounded-full" />
	<div class="flex flex-col justify-center items-center w-full gap-1">
		<h3 class="text-lg font-medium tracking-[-0.02em]">{selectedUser.name}</h3>
		<p class="text-sm text-gray-400">{selectedUser.phoneNumber}</p>
	</div>
	<div class="flex justify-center items-center gap-4">
		<button
			class="flex flex-col justify-center items-center text-green-700 hover:bg-green-900 hover:bg-opacity-10 rounded-2xl p-4 gap-3 transition-all duration-200 ease-in-out"
		>
			<Call />
			<span class="text-green-800">Audio Call</span>
		</button>
		<button
			class="flex flex-col justify-center items-center text-green-700 hover:bg-green-900 hover:bg-opacity-10 rounded-2xl p-4 gap-3 transition-all duration-200 ease-in-out"
		>
			<Videocam />
			<span class="text-green-800">Video Call</span>
		</button>
	</div>
</div>
