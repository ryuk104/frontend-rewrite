<script>
	import { getContext } from 'svelte';
	import { TABS } from './tabs.svelte';

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	registerTab(tab);
</script>

<style>
	button {
		background: rgba(0,0,0,.4);;
		border: none;
		border-bottom: 2px solid white;
		border-radius: 0;
		margin: 0;
		color: #ccc;
		display: flex;
    	align-items: center;
    	padding-left: 5px;
    	padding-right: 5px;
    	height: 30px;
    	background: rgba(0,0,0,.4);
    	border-radius: 4px;
    	flex-shrink: 0;
    	align-self: center;
    	cursor: pointer;
    	max-width: 200px;
    	text-decoration: none;
    	color: #fff;
		
	}
	
	.selected {
		border-bottom: 2px solid teal;
		color: #333;
	}
</style>

<button class:selected="{$selectedTab === tab}" on:click="{() => selectTab(tab)}">
	<slot></slot>
</button>