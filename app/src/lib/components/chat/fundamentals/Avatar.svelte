<script lang="ts">
	let klass: string | '' = '';
	export { klass as class };
	export let src: string;
	export let alt: string;
	export let size: '36' | '42' | '44' | '80' | '126' = '42';
</script>

<div class="bg-zinc-700 rounded-full " style="height: {size}px; width: {size}px;">
	<img {src} {alt} height={size} width={size} class="rounded-full {klass}" />
</div>
