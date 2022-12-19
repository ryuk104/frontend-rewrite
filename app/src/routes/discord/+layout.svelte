<script lang="ts">
	import SvgMasks from '$lib/components/discord/common/SVGMasks.svelte';
	//import '../app.css';
</script>

<div class="app">
	<SvgMasks />
	<!--
	<div style="position: absolute; width: 100%; height: 100%; background-color: transparent;"></div>
	-->

	<slot />
</div>

<style>
	.app {
		position: relative;
		-webkit-box-flex: 1;
		-ms-flex: 1 1 auto;
		flex: 1 1 auto;
		z-index: auto;
	}
</style>
