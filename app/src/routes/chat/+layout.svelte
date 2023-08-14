<script lang="ts">
	import '../app.css';
	import Sidebar from '../components/Sidebar.svelte';
</script>

<div class="flex justify-start items-start h-screen p-2 gap-2">
	<Sidebar />

	<div class="grow h-full">
		<slot />
	</div>
</div>

<style lang="postcss">
	:global(html) {
		color: theme(colors.gray.100);
		font-size: theme(fontSize.base);
		font-weight: theme(fontWeight.medium);
		background-color: theme(colors.zinc.900);
	}

	:global(:root) {
		--scrollbarBG: transparent;
		--scrollbar: theme(colors.zinc.800);
	}

	:global(*) {
		scrollbar-width: thin;
		scrollbar-color: var(--scrollbarBG) var(--scrollbar);
	}

	:global(*::-webkit-scrollbar) {
		width: 8px;
	}

	:global(*::-webkit-scrollbar-track) {
		background: var(--scrollbarBG);
		margin-top: 0;
		margin-bottom: 0;
	}

	:global(*::-webkit-scrollbar-thumb) {
		background-color: var(--scrollbar);
		border-radius: 20px;
		border: 2px solid var(--scrollbarBG);
	}
</style>
