<script>
	import { onMount, tick } from 'svelte';
	import { doNothingAction } from './actions';

	// const { onDragStart } = getContext("TIPTAP_NODE_VIEW");

	export let action = doNothingAction;
	export let as = 'div';
	let element;

	onMount(async () => {
		await tick();
		element.style.whiteSpace = 'normal';
	});
</script>

<svelte:element this={as} bind:this={element} data-node-view-wrapper="" use:action {...$$restProps}>
	<slot />
</svelte:element>
