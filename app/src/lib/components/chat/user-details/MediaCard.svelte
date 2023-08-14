<script lang="ts">
	import ArrowRight from '@/assets/icons/ArrowRight.svelte';

	import media2 from '@/assets/imgs/media/media-2.jpg';
	import media3 from '@/assets/imgs/media/media-3.jpg';
	import media4 from '@/assets/imgs/media/media-4.jpg';
	import media5 from '@/assets/imgs/media/media-5.jpg';
</script>

<div
	class="w-full lg:w-80 bg-zinc-850 rounded-2xl p-4 gap-4 flex flex-col justify-between items-start"
>
	<div class="flex justify-start items-center mb-2 w-full">
		<h2 class="text-lg font-medium tracking-[-0.02em]">Media, links, and docs</h2>
		<div
			class="flex justify-start items-center ml-auto text-zinc-500 cursor-pointer hover:text-green-500 transition-all duration-200 ease-in-out"
		>
			<span>163</span>
			<span>
				<ArrowRight />
			</span>
		</div>
	</div>
	<div class="flex justify-start items-center gap-2">
		<img
			src={media2}
			alt="sad"
			class="w-16 h-16 rounded-2xl border-2 border-zinc-900 hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer"
		/>
		<img
			src={media3}
			alt="sad"
			class="w-16 h-16 rounded-2xl border-2 border-zinc-900 hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer"
		/>
		<img
			src={media4}
			alt="sad"
			class="w-16 h-16 rounded-2xl border-2 border-zinc-900 hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer"
		/>
		<img
			src={media5}
			alt="sad"
			class="w-16 h-16 rounded-2xl border-2 border-zinc-900 hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer"
		/>
	</div>
</div>
