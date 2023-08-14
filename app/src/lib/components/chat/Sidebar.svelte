<script>
	import ChatsCard from './sidebar/ChatsCard.svelte';
	import UserCard from './sidebar/UserCard.svelte';

	import { activeChat } from '@utils/store';
</script>

<div
	class="fixed p-2 z-10 w-full bg-zinc-900 lg:relative lg:p-0 lg:w-80 h-full flex flex-col justify-start items-start gap-2
	{$activeChat > 0 ? 'max-lg:-left-full' : 'inset-0'}
	transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]
	"
>
	<UserCard />
	<ChatsCard />
</div>
