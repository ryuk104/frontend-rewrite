<script lang="ts">
	import Button from '@components/fundamentals/Button/Button.svelte';

	import AttachFile from '@/assets/icons/AttachFile.svelte';
	import Emoji from '@/assets/icons/EmojiEmotions.svelte';
	import MicNone from '@/assets/icons/MicNone.svelte';
	import Send from '@/assets/icons/Send.svelte';
</script>

<div class="w-full flex justify-start items-center gap-2">
	<div class="w-full flex justify-start items-center bg-zinc-850 rounded-2xl p-2">
		<div class="flex justify-start items-center w-full">
			<Button variant="filled" color="plain" size="square" icon={AttachFile} />
			<input
				type="text"
				placeholder="Message"
				class="bg-transparent w-full h-12 px-4 rounded-2xl placeholder:text-zinc-500 hover:bg-green-500 hover:bg-opacity-5 focus:outline-none focus:ring-2 focus:ring-green-900 transition-colors duration-200 ease-in-out"
			/>
		</div>
		<div class="flex justify-start items-center ml-auto">
			<Button variant="filled" color="plain" size="square" icon={Emoji} />
			<Button variant="filled" color="plain" size="square" icon={MicNone} />
		</div>
	</div>
	<div class="flex justify-start items-center bg-zinc-850 rounded-2xl p-2 max-lg:hidden">
		<Button variant="filled" color="plain" size="square" icon={Send} />
	</div>
</div>
