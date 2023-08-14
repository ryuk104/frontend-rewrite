<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { expoInOut } from 'svelte/easing';

	import ChatHeader from '@components/chat-section/ChatHeader.svelte';
	import ChatInput from '@components/chat-section/ChatInput.svelte';
	import ChatPanel from '@components/chat-section/ChatPanel.svelte';

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
	class="h-full grow flex justify-start items-start"
	in:fly={{ duration: 1000, easing: expoInOut, x: 150 }}
>
	<div class="h-full w-full flex flex-col justify-start items-start">
		<ChatHeader
			avatar={selectedUser.avatar}
			name={selectedUser.name}
			activityState={selectedUser.activityState}
		/>
		<ChatPanel
			avatar={selectedUser.avatar}
			name={selectedUser.name}
			chatData={selectedUser.chatHistory}
		/>
		<ChatInput />
	</div>
</div>
