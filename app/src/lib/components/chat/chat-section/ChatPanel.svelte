<script lang="ts">
	import Avatar from '@components/fundamentals/Avatar.svelte';
	import { onMount } from 'svelte';

	export let avatar: any;
	export let name: string;
	export let chatData: { sender: boolean; text: string; date: string }[];
	let chatContainer: HTMLElement;

	const scrollToBottom = async (node: HTMLElement) => {
		node.scroll({ top: node.scrollHeight });
	};

	onMount(() => scrollToBottom(chatContainer));
</script>

<div bind:this={chatContainer} class="w-full grow overflow-y-auto text-zinc-800">
	<div class="flex flex-col justify-start items-start gap-2 py-4">
		{#each chatData as chatItem}
			<div class="flex justify-start items-end w-full gap-2 lg:px-4">
				{#if chatItem.sender}
					<Avatar src={avatar} alt="Avatar of the {name}" />
				{/if}
				<div
					class="rounded-2xl p-4 text-white max-w-[calc(100%_-_48px_-_2px)] lg:max-w-lg relative pb-6
				{chatItem.sender ? 'bg-green-900' : 'bg-zinc-850 ml-auto'}"
				>
					<p class="leading-normal">{chatItem.text}</p>
					<p
						class="text-xs opacity-50 absolute bottom-1 right-4 {chatItem.sender
							? 'text-green-200'
							: 'text-zinc-200'}"
					>
						{chatItem.date}
					</p>
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	*::-webkit-scrollbar-track {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}
</style>
