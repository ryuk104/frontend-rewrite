<script lang="ts">
	import { chats } from '@data/chatPreviews.mock';
	import { activeChat } from '@utils/store';

	function handleChatSelect() {
		$activeChat === 2 ? activeChat.set(1) : activeChat.set(2);
	}
</script>

<div
	class="w-full lg:w-80 grow bg-zinc-850 rounded-2xl p-1 flex flex-col justify-start items-start overflow-x-hidden overflow-y-auto"
>
	{#each chats as chat, index}
		<button
			class="w-full flex justify-start items-center gap-3 p-2 hover:bg-zinc-800 rounded-2xl transition-all duration-200 ease-in-out
			{index === $activeChat && $activeChat !== 0 ? 'bg-green-900 bg-opacity-10' : ''}
			"
			on:click={handleChatSelect}
		>
			<img src={chat.avatar} alt="avatar of {chat.name}" class="w-10 h-10 rounded-full" />
			<div class="grow flex flex-col justify-start items-start overflow-hidden">
				<span class="flex justify-start items-centerm w-full">
					<p class="{chat.id === $activeChat ? 'text-green-600' : 'text-zinc-100'} font-bold">
						{chat.name}
					</p>
					<p class="{chat.id === $activeChat ? 'text-green-600' : 'text-zinc-400'} ml-auto text-xs">
						{chat.lastMessageTime}
					</p>
				</span>
				<p
					class="{chat.id === $activeChat
						? 'text-green-600'
						: 'text-zinc-400'} text-sm truncate w-full text-start"
				>
					{chat.lastMessage}
				</p>
			</div>
		</button>
	{/each}
</div>

<style lang="postcss">
	*::-webkit-scrollbar-track {
		margin-top: 1rem;
		margin-bottom: 1rem;
	}
</style>
