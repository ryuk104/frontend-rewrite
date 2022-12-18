<!-- This component renders the user's current chats to the left side bar -->
<script>
	import CurrentChat from '../stores/currentChatStore';
	import CurrentUser from '../stores/userDataStore';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { endpoints } from '$lib/endpoints';
	import ChatMessages from '../stores/chatMessages';
	import UnReadChatMessages from '../stores/unReadChatMessages';
	export let chat;
	let user = {};
	let allChatMessages = {};
	let lastMessage = { content: '', datetime: '' };
	let unReadChatMessages = {};

	//Get any unread messages
	UnReadChatMessages.subscribe((value) => {
		unReadChatMessages = value;
	});

	//Get updates chat messages used to get the last message which is render at the button of each chat list
	ChatMessages.subscribe((value) => {
		let messages = value[chat.conversation_name];
		lastMessage = messages[messages.length - 1];
		allChatMessages = value;
	});

	onMount(() => {
		lastMessage = { content: '', datetime: '' };
		user = get(CurrentUser);
		//Fetch user chat messages
		//Fetches all messages for the chat that is clicked
		(async () => {
			const rawResponse = await fetch(endpoints.database + chat.conversation_id + '/messages', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					Authorization: 'JWT ' + user.token,
					'Content-Type': 'application/json'
				}
			});
			let messages = await rawResponse.json();
			if (messages != []) {
				lastMessage = messages[messages.length - 1];
			}
			//Updates the all messages store
			allChatMessages = get(ChatMessages);
			allChatMessages[chat.conversation_name] = messages;
			ChatMessages.set(allChatMessages);
		})();
	});

	const showChat = () => {
		unReadChatMessages = get(UnReadChatMessages);
		//If the current chat had unread messages then remove them so it no longer displays the green icon with message count
		if (unReadChatMessages.hasOwnProperty(chat.conversation_name)) {
			delete unReadChatMessages[chat.conversation_name];
			UnReadChatMessages.set(unReadChatMessages);
		}
		//For private chat which is limited to 2 users
		//The conversation name would change to the other user's name
		if (chat.private) {
			CurrentChat.set({
				conversation_id: chat.conversation_id,
				conversation_name: chat.conversation_name,
				private: chat.private,
				receiver_id: chat.user_id,
				receiver_username: chat.username,
				bot: chat.bot,
				photo: chat.photo
			});
			//For group chat which can have more than 2 users
			//Conversation name would be the conversation name
		} else {
			CurrentChat.set({
				conversation_id: chat.conversation_id,
				conversation_name: chat.conversation_name,
				private: chat.private,
				receiver_id: '',
				receiver_username: '',
				bot: '',
				photo: chat.photo
			});
		}
	};
</script>

<li
	on:click={showChat}
	class="flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition nav-blue-bg"
>
	<div class="flex ml-2">
		<img src={chat.photo} class="rounded-full w-10 h-10" alt="profile-img" />
		<div class="flex flex-col ml-2">
			<!-- for private chat -->
			{#if chat.private}
				<span class="font-medium text-light-gold">{chat.username}</span>
				<!-- for group chat -->
			{:else}
				<span class="font-medium text-gold">{chat.conversation_name}</span>
			{/if}
			<span class="text-sm text-gray-300 truncate w-32">
				{#if lastMessage}
					{lastMessage['content']}
				{/if}
			</span>
		</div>
	</div>
	<div class="flex flex-col items-center">
		<span class="text-gray-300 text-xs">
			{#if lastMessage}
				{lastMessage['datetime']}
			{/if}
		</span>
		<!-- display unread messages -->
		{#if unReadChatMessages.hasOwnProperty(chat.conversation_name)}
			<div class="bg-green-400 w-5 h-5 rounded-full">
				<p class="text-center fa fa text-sm text-gray-200">
					{unReadChatMessages[chat.conversation_name]}
				</p>
			</div>
		{/if}
	</div>
</li>
