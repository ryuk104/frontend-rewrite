<!-- This component is used to render chat messages for a specfic chat, all messages appear in this component -->
<script>
	import { onMount } from 'svelte/internal';
	import { socket } from '$lib/socket';
	import CurrentChat from '../stores/currentChatStore';
	import { get } from 'svelte/store';
	import ChatMessages from '../stores/chatMessages';
	import UnReadChatMessages from '../stores/unReadChatMessages';
	import CurrentUser from '../stores/userDataStore';
	export let chats = [];
	let currentChat = {},
		sender = {},
		receiver = '';
	let message;
	let allChatMessages = {};

	//get current user
	CurrentUser.subscribe((value) => {
		sender = value;
	});
	//get the current chat if it changes
	CurrentChat.subscribe((value) => {
		currentChat = value;
		receiver = currentChat.conversation_name;
	});
	//get current chat messages if it changes
	ChatMessages.subscribe((value) => {
		allChatMessages = value;
	});

	//get intial data from stores
	onMount(() => {
		allChatMessages = get(ChatMessages);
		sender = get(CurrentUser);
		currentChat = get(CurrentChat);
		receiver = currentChat.conversation_name;
	});
	//Intial socket connect
	socket.on('connection', () => {
		// console.log('Inital id' + socket.id);
	});
	//On reconnect join all rooms
	socket.on('connect', () => {
		// console.log('Connect Id' + socket.id);
		// console.log(receiver);
		socket.emit('join-room', chats);
	});

	//Receive message from server
	socket.on('receive-message', (msg) => {
		// console.log('this' + msg);
		if (receiver != msg.conversation_name) {
			let unReadMessages = get(UnReadChatMessages);
			//id message received is for another chat append that message to that chats message list
			if (unReadMessages.hasOwnProperty(msg.conversation_name)) {
				unReadMessages[msg.conversation_name]++;
			} else {
				unReadMessages[msg.conversation_name] = 1;
			}
			// console.log(unReadMessages);
			UnReadChatMessages.set(unReadMessages);
		}
		allChatMessages[msg.conversation_name] = [...allChatMessages[msg.conversation_name], msg];
		ChatMessages.set(allChatMessages);
	});

	//Send message
	const handleSubmit = () => {
		let today = new Date();
		let time = today.getHours() + ':' + today.getMinutes();
		// console.log(receiver);
		//Emit send message to server if the message has content
		if (message != '')
			socket.emit('send-message', {
				conversation_name: receiver,
				conversation_id: currentChat.conversation_id,
				sender_name: sender.username,
				content: message,
				datetime: time,
				token: sender.token,
				photo: sender.photo
			});
		message = '';
	};
</script>

<!-- If no chat is selected display choose your chat in the chat area -->
{#if currentChat.conversation_id == -1}
	<div style="height: 90vh;" class="flex sm:p-2 h-full items-center text-center">
		<h1>Choose your Chat</h1>
	</div>
{:else}
	<!-- display chat box and current messages -->
	<div
		style="height: 90vh;"
		class="flex-1 flex flex-col w-screen sm:w-full h-full bg-gray-200 mt-2.5 rounded-lg"
	>
		<div
			class="rounded-t-lg flex px-6 sm:items-center justify-between py-3 border-b-2 border-gray-200 nav-blue-bg"
		>
			<div class="relative flex items-center space-x-4">
				<div class="relative">
					<img src={currentChat.photo} alt="" class="w-10 sm:w-16 h-10 sm:h-16 rounded-full" />
				</div>
				<div class="flex flex-col leading-tight">
					<div class="sm:text-xl md:2xl: mt-1 flex items-center">
						{#if currentChat.private}
							<span class="text-gray-300 mr-3">{currentChat.receiver_username}</span>
						{:else}
							<span class="text-gray-300 mr-3">{receiver}</span>
						{/if}
					</div>
				</div>
			</div>
			<div class="md:flex items-center space-x-2 hidden">
				<!-- search button -->
				<button
					type="button"
					class="cream-msg inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
				<!-- heart -->
				<button
					type="button"
					class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none cream-msg"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill=""
						viewBox="0 0 24 24"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
				</button>
				<!-- bell -->
				<button
					type="button"
					class="cream-msg inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
						/>
					</svg>
				</button>
			</div>
		</div>
		<!-- chat box -->
		<div
			id="messages"
			class="h-screen flex flex-col space-y-4 p-4 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
		>
			{#if allChatMessages[receiver]}
				<div class="chat-message">
					<!-- Loops through array of messages for current chat and displays them -->
					{#each allChatMessages[receiver] as message}
						<!-- User message -->
						{#if message.sender_name == sender.username}
							<div class="flex items-end justify-end">
								<div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
									<div class="px-4 py-2 rounded-full flex rounded-br-none cream-msg text-white">
										<pre class="pt-1 mr-3 max-w-xs">{message.content}</pre>
										<span class="time pb-2">{message.datetime}</span>
									</div>
								</div>
								<img src={sender.photo} alt="My profile" class="w-10 h-10 rounded-full order-2" />
							</div>
						{:else}
							<!-- not a the user message -->
							<div class="flex items-end">
								<div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
									<div>
										<div
											class="px-4 py-2 rounded-full flex rounded-bl-none nav-blue-bg text-gray-100"
										>
											<div class="flex flex-col">
												<span class="mr-3 text-gold">{message.sender_name}</span>
												<pre class="pt-1 mr-3 max-w-xs">{message.content}</pre>
											</div>
											<span class=" time pb-2">{message.datetime}</span>
										</div>
									</div>
								</div>
								<img src={message.photo} alt="My profile" class="w-10 h-10 rounded-full order-1" />
							</div>
						{/if}
						<br class="line-break" />
					{/each}
				</div>
			{/if}
		</div>
		<div class="sticky bottom-0 border-gray-200 p-2 mb-0">
			<div class="relative flex">
				<span class="absolute inset-y-0 flex items-center">
					<button
						type="button"
						class="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							class="h-6 w-6 text-gray-600"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
							/>
						</svg>
					</button>
				</span>
				<!-- bind entered text to variable message -->
				<input
					bind:value={message}
					type="text"
					placeholder="Write your message!"
					class="border-none w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-300 rounded-l-full py-3"
				/>
				<div class="relative right-0 items-center inset-y-0 sm:flex bg-gray-300 rounded-r-full">
					<button
						type="button"
						class="hidden sm:inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							class="h-6 w-6 text-gray-600"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
					</button>
					<button
						type="button"
						class="hidden sm:inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							class="h-6 w-6 text-gray-600"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</button>
					<button
						on:click={handleSubmit}
						type="button"
						class="inline-flex items-center justify-center rounded-full px-3 py-3 transition duration-500 ease-in-out text-white bg-blue-600 hover:bg-blue-400 focus:outline-none"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 17"
							fill="currentColor"
							class="h-6 w-6 ml-2 transform rotate-90"
						>
							<path
								d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<svelte:head>
	<style>
		body {
			--tw-bg-opacity: 1;
			background-color: rgb(209 213 219 / var(--tw-bg-opacity));
		}
	</style>
</svelte:head>

<style>
	.scrollbar-w-2::-webkit-scrollbar {
		width: 0.25rem;
		height: 0.25rem;
	}

	.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
		--bg-opacity: 1;
		background-color: #f7fafc;
		background-color: rgba(247, 250, 252, var(--bg-opacity));
	}

	.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
		--bg-opacity: 1;
		background-color: #edf2f7;
		background-color: rgba(237, 242, 247, var(--bg-opacity));
	}

	.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
		border-radius: 0.25rem;
	}
	.line-break {
		display: block;
		content: '';
		margin-top: 0.7rem;
	}

	.time {
		font-size: 0.6rem;
	}

	pre {
		word-wrap: break-word; /* IE 5.5-7 */
		white-space: -moz-pre-wrap; /* Firefox 1.0-2.0 */
		white-space: pre-wrap; /* current browsers */
		max-width: 14rem;
	}
</style>
