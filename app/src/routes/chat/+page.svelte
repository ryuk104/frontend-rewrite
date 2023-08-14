<script lang="ts">
	import { activeChat, selectedUserDetails } from '@utils/store';
	import { aviableUsers } from '@data/selectedUser.mock';

	import ChatSection from '@components/ChatSection.svelte';
	import UserDetails from '@components/UserDetails.svelte';

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

	let selectedUser: User;
	$: selectedUser = aviableUsers.find((user) => user.id === $activeChat)!;
</script>

<div class="h-full w-full overflow-hidden flex justify-start items-start gap-2">
	{#if $activeChat > 0}
		<ChatSection {selectedUser} />

		{#if $selectedUserDetails}
			<UserDetails {selectedUser} />
		{/if}
	{:else}
		<div class="h-full w-full flex justify-center items-center">
			<p>No chat selected, please select on</p>
		</div>
	{/if}
</div>
