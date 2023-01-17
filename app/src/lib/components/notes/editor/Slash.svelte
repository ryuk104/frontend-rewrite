<script>
	export let selectedIndex = 0;
	export let element;
	import {
		command_menu_visible,
		command_menu_items,
		command_menu_location,
		content_editor,
		content_range
	} from '$lib/stores';

	let height;

	let elements = [];
	$: {
		if (elements[0] != null) {
			elements[selectedIndex]?.scrollIntoView({
				block: 'nearest',
				behavior: 'smooth'
			});
		}
	}
</script>

<svelte:window bind:innerHeight={height} />

{#if $command_menu_visible}
	<div
		class="w-full fixed h-screen top-0 left-0 z-40"
		on:click={() => ($command_menu_visible = false)}
	/>
	<div
		class="absolute bg-white shadow-xl w-96 h-96 max-w-full rounded-lg overflow-scroll z-50"
		style="left: {$command_menu_location.x -
			element.getBoundingClientRect().left}px; top: {$command_menu_location.y +
			$command_menu_location.height +
			384 >
		height + window.scrollY
			? $command_menu_location.y - $command_menu_location.height - 384 - 50
			: $command_menu_location.y + $command_menu_location.height - 50}px;"
	>
		<div class="p-2 text-sm text-slate-500">BLOCKS</div>
		{#each $command_menu_items as { title, subtitle, command }, i}
			<div
				class="p-3 cursor-pointer {i == selectedIndex ? 'bg-slate-100' : 'bg-white'}"
				on:mouseenter={() => (selectedIndex = i)}
				on:click={() => {
					$command_menu_visible = false;
					command({ editor: $content_editor, range: $content_range });
				}}
				bind:this={elements[i]}
			>
				<div class="">{title}</div>
				<div class="text-sm text-slate-500">{subtitle ? subtitle : ''}</div>
			</div>
		{/each}
	</div>
{/if}
