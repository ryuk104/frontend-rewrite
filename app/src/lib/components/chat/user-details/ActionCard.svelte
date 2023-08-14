<script lang="ts">
	import Block from '@/assets/icons/block.svelte';
	import Delete from '@/assets/icons/delete.svelte';
	import ThumbsDown from '@/assets/icons/thumb-down.svelte';

	export let userName: string;
</script>

<div class="w-full lg:w-80 bg-zinc-850 rounded-2xl p-2 flex flex-col justify-between items-start">
	<button
		class="flex justify-start items-center w-full gap-4 p-4 py-3 text-red-800 hover:bg-red-900 hover:bg-opacity-10 rounded-2xl"
	>
		<span> <Block /> </span>
		<span class="text-red-900">Block {userName}</span>
	</button>
	<button
		class="flex justify-start items-center w-full gap-4 p-4 py-3 text-red-800 hover:bg-red-900 hover:bg-opacity-10 rounded-2xl"
	>
		<span> <ThumbsDown /> </span>
		<span class="text-red-900">Report {userName}</span>
	</button>
	<button
		class="flex justify-start items-center w-full gap-4 p-4 py-3 text-red-800 hover:bg-red-900 hover:bg-opacity-10 rounded-2xl"
	>
		<span> <Delete /> </span>
		<span class="text-red-900">Clear All Chat</span>
	</button>
</div>
