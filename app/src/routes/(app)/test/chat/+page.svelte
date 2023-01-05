
<script lang='ts'>
	
	//import Chat from '../components/app/Chat/index.svelte';
	

	import currentUser from '$lib/stores/chat/userDataStore.js';
	import ChatBox from '$lib/components/chattest/chatbox.svelte';
	import Sidepanel from '$lib/components/chattest/Sidepanel.svelte'
	//import Chat from '$lib/components/chattest/Chat.svelte'

	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import { endpoints } from '$lib/endpoints.js';
	import ChatMessages from '$lib/stores/chat/chatMessages';
	import { socket } from '$lib/socket';
	//import { auth, user } from '$lib/stores/chat/auth.js'
	import { room } from '$lib/stores/chat/activeRoom.js'
	import { onDestroy, onMount } from 'svelte'
	import { setContext } from 'svelte'

	/*
	let host = dev_server.host ? dev_server.host : window.location.hostname
	let port = dev_server.port ? dev_server.port : window.location.port

	let unsubscribe
	if ($auth) client.state.update({ token: $auth })
	if ($user) client.state.update({ userID: $user })
*/

/*
	onMount(() => {
		unsubscribe = client.state.subscribe((state) => {
			if (state.token && typeof state.token === 'string') auth.set(state.token)
			else {
				auth.set('')
				room.set(null)
			}
			if (state.userID && typeof state.userID === 'string') user.set(state.userID)
			else user.set('')
		})

		
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
	})

	onDestroy(() => {
		unsubscribe()
	})
*/
	let sender = {};
	let chatConversationNames = [];
	let chats = [];
	


</script>



<svelte:head>
	<title>Chat</title>
</svelte:head>

<div class="cream-msg h-screen w-screen">
	<div class="flex flex-no-wrap">
		<div class="content">
			<Sidepanel {chats}/>

			<main>
				<!--<Chat />-->
			</main>
		

		
		
		<div class="mt-0 sm:mt-0 sm:ml-72 md:ml-80 sm:pr-3  lg:pl-0 container md:w-4/5 w-11/12">
			<ChatBox chats={chatConversationNames} />
		</div>
	
		</div>
	</div>
</div>



<style>
	.content {
		display: flex;
		height: calc(100vh - 6rem);
		width: 100%;
		justify-items: stretch;
	}

	main {
		height: 100%;
		width: 100%
	}
</style>





