<!-- chat route -->
<script>
	import currentUser from '../stores/userDataStore.js';
	import ChatSideBar from '../components/chatSideBar.svelte';
	import ChatBox from '../components/chatbox.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Nav from '../components/nav.svelte';
	import { get } from 'svelte/store';
	import { endpoints } from '$lib/endpoints.js';
	import ChatMessages from '../stores/chatMessages';
	import { socket } from '$lib/socket';

	let sender = {};
	let chatConversationNames = [];
	let chats = [];
	onMount(() => {
		if (!$currentUser.loggedIn) {
			goto('/login');
		}
		if ($currentUser.newUser) {
			goto('/questions');
			return;
		}
		sender = get(currentUser);
		//Fetches all user conversations
		(async () => {
			try {
				const rawResponse = await fetch(endpoints.database + 'user/conversations/user_info', {
					method: 'GET',
					headers: {
						Accept: 'application/json',
						Authorization: 'JWT ' + sender.token,
						'Content-Type': 'application/json'
					}
				});
				let reponse = await rawResponse.json();
				chats = reponse;
				let currentChatMessages = {};
				if (chats != []) {
					chats.forEach((chat) => {
						currentChatMessages[chat.conversation_name] = [];
						chatConversationNames = [...chatConversationNames, chat.conversation_name];
					});
					ChatMessages.set(currentChatMessages);
				}
				socket.emit('join-room', chatConversationNames);
				// console.log(chatConversationNames);
			} catch (error) {
				console.error(error);
			}
		})();
	});
</script>

<div class="cream-msg h-screen w-screen">
	<div class="sticky top-0 w-full z-40">
		<Nav />
	</div>

	<div class="flex flex-no-wrap">
		<div class="fixed z-10 pt-2 sm:p-0.5 rounded-lg">
			<ChatSideBar {chats} />
		</div>
		<div class="mt-0 sm:mt-0 sm:ml-72 md:ml-80 sm:pr-3  lg:pl-0 container md:w-4/5 w-11/12">
			<ChatBox chats={chatConversationNames} />
		</div>
	</div>
</div>

<svelte:head>
	<title>Chat</title>
</svelte:head>
