<script>
	import Menu from './Menu.svelte';
	import MenuOption from './MenuOption.svelte';
	import MenuDivider from './MenuDivider.svelte';
	import { tick } from 'svelte'
	
	
	let pos = { x: 0, y: 0 };
	let showMenu = false;
	
	async function onRightClick(e) {
		if (showMenu) {
			showMenu = false;
			await new Promise(res => setTimeout(res, 100));
		}
		
		pos = { x: e.clientX, y: e.clientY };
		showMenu = true;
	}
	
	function closeMenu() {
		showMenu = false;
	}
</script>

{#if showMenu}
	<Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
		<MenuOption 
			on:click={console.log} 
			text="Copy" />
		<MenuOption 
			on:click={console.log} 
			text="Paste" />
		<MenuOption 
		on:click={console.log} 
		text="search on browser" />
		<MenuDivider />
		<MenuOption 
			isDisabled={true} 
			on:click={console.log} 
			text="search on browser" />
	</Menu>
{/if}

<svelte:body on:contextmenu|preventDefault={onRightClick} />