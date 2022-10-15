<script>
	import SettingMenu from './settingMenu.svelte';
	import SettingOptions from './SettingOptions.svelte';
	import { tick } from 'svelte'
	
	
	let showSettingMenu = false;
	
	async function onRightClick(e) {
		if (showSettingMenu) {
			showSettingMenu = false;
			await new Promise(res => setTimeout(res, 100));
		}
		
		pos = { x: e.clientX, y: e.clientY };
		showSettingMenu = true;
	}
	
	function closeMenu() {
		showSettingMenu = false;
	}
</script>

{#if showSettingMenu}
	<SettingMenu on:click={closeMenu} on:clickoutside={closeMenu}>
		<SettingOptions 
			on:click={console.log} 
			text="Copy" />
		<SettingOptions 
			on:click={console.log} 
			text="Paste" />
		<SettingOptions 
		on:click={console.log} 
		text="search on browser" />
		<SettingOptions />
		<SettingOptions 
			isDisabled={true} 
			on:click={console.log} 
			text="search on browser" />
	</SettingMenu>
{/if}

<svelte:body on:contextmenu|preventDefault={onRightClick} />