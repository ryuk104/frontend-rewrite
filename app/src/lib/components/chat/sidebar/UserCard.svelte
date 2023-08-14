<script lang="ts">
	import Button from '@components/fundamentals/Button/Button.svelte';
	import Avatar from '@components/fundamentals/Avatar.svelte';
	import UserDetail from '@components/sidebar/UserDetail.svelte';

	import ChatCircle from '@/assets/icons/ChatCircleDuotone.svelte';
	import currentUser from '@/assets/imgs/current-user.jpg';

	let isActive: boolean = false;
	function viewUserDetail() {
		isActive = !isActive;
	}
</script>

<div
	class="w-full lg:w-80 bg-zinc-850 rounded-2xl p-4 gap-4 flex flex-col justify-between items-start"
>
	<div class="flex justify-between items-center w-full">
		<h2 class="text-lg font-medium tracking-[-0.02em] mb-2">Messages</h2>
		<button
			class="rounded-full border-4 border-transparent hover:border-4 hover:border-zinc-600 transition-all duration-200 ease-in-out"
			on:click={viewUserDetail}
		>
			<Avatar src={currentUser} alt="user's avatar" />
		</button>
	</div>
	<Button label="Start new chat" icon={ChatCircle} class="" />
</div>

<UserDetail {isActive} on:close={viewUserDetail} />
