<script lang="ts">
	export let selectedUserAbout: string;
</script>

<div
	class="w-full lg:w-80 bg-zinc-850 rounded-2xl p-4 gap-4 flex flex-col justify-between items-start"
>
	<h2 class="text-lg font-medium tracking-[-0.02em] mb-2">About</h2>
	<p>
		{selectedUserAbout}
	</p>
</div>
