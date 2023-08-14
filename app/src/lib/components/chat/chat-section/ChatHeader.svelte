<script lang="ts">
	import { activeChat, selectedUserDetails } from '@utils/store';

	import Avatar from '@components/fundamentals/Avatar.svelte';
	import Button from '@components/fundamentals/Button/Button.svelte';

	import Call from '@/assets/icons/Call.svelte';
	import MoreHoriz from '@/assets/icons/MoreHoriz.svelte';
	import Search from '@/assets/icons/Search.svelte';
	import Videocam from '@/assets/icons/Videocam.svelte';
	import KeyboardBackspace from '@/assets/icons/Keyboard-backspace.svelte';

	export let avatar: any;
	export let name: string;
	export let activityState: string;

	function userView() {
		$selectedUserDetails === true ? selectedUserDetails.set(false) : selectedUserDetails.set(true);
	}

	function closeChat() {
		activeChat.set(0);
	}
</script>

<div
	class="w-full flex justify-start items-center bg-zinc-850 rounded-2xl p-2 pl-2 lg:pl-3 drop-shadow-md"
>
	<div class="flex justify-start items-center">
		<Button
			variant="filled"
			color="plain"
			size="square"
			class="lg:hidden"
			icon={KeyboardBackspace}
			on:click={closeChat}
		/>
		<button
			class="rounded-full border-4 border-transparent hover:border-4 hover:border-zinc-600 transition-all duration-200 ease-in-out"
			on:click={userView}
		>
			<Avatar src={avatar} alt="Avatar of the {name}" />
		</button>
		<div class="flex flex-col justify-start items-start ml-4">
			<span>{name}</span>
			<span class="text-sm text-zinc-500">{activityState}</span>
		</div>
	</div>
	<div class="flex justify-start items-center ml-auto">
		<Button variant="filled" color="plain" size="square" class="max-lg:hidden" icon={Call} />
		<Button variant="filled" color="plain" size="square" class="max-lg:hidden" icon={Videocam} />
		<div class="bg-zinc-900 h-10 w-0.5 mx-2 max-lg:hidden" />
		<Button variant="filled" color="plain" size="square" class="max-lg:hidden" icon={Search} />
		<Button variant="filled" color="plain" size="square" icon={MoreHoriz} />
	</div>
</div>
