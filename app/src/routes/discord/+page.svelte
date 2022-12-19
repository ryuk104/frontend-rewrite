<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import GuildsNav from '$lib/components/discord/guild_sidebar/GuildsNav.svelte';
import ContentBase from '$lib/components/discord/ContentBase.svelte';
</script>

<svelte:head>
	<title>Skelord</title>
</svelte:head>

<div class="app">
	<div class="bg"></div>
	<div class="layers layers-rel">
		<!-- each layers -->
		<div aria-hidden="false" class="layer baseLayer">
			<div class="container">
				<GuildsNav />
				<ContentBase />
			</div>
		</div> 
	</div>


</div>

<style>
	.app {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: var(--background-tertiary);
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
	}
	.bg {
		background-color: var(--background-tertiary);
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}

	.layers-rel {
		position: relative;
    	overflow: hidden;
	}

	.layers {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-box-flex: 1;
		-ms-flex: 1 1 auto;
		flex: 1 1 auto;
		overflow: hidden;
		min-width: 0;
		min-height: 0;
	}

	.layers > .layer {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
	}

	.layer {
		background-color: var(--background-primary);
	}

	.layer.baseLayer {
		background-color: transparent;
	}

	.container {
		position: relative;
		overflow: hidden;
		width: 100%;
		height: 100%;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}
	
</style>
