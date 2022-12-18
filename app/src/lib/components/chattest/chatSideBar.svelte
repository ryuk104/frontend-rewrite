<!-- This component is used to render frame of the side bar with chats -->
<script>
	import ChatList from './chatList.svelte';
	export let chats = [];
	let openSideBar = 'flex';
	let closeSideBar = 'none';
	let sideBarMove = 'translateX(-288px)';
	function sidebarHandler() {
		if (openSideBar == 'flex') {
			openSideBar = 'none';
			closeSideBar = 'flex';
			sideBarMove = 'translateX(0px)';
		} else {
			closeSideBar = 'none';
			openSideBar = 'flex';
			sideBarMove = 'translateX(-288px)';
		}
	}
</script>

<!-- Desktop view -->
<div
	style="height: 94vh"
	class="w-72 md:w-80 absolute sm:relative cream-msg shadow md:h-full flex-col justify-between hidden sm:flex"
>
	<div style="height: 92vh" class=" cream-msg p-2">
		<div
			class="h-full max-w-md mx-auto nav-blue-bg shadow-lg rounded-lg overflow-y-scroll md:max-w-lg"
		>
			<div class="md:flex">
				<div class="w-full p-4">
					<div class="relative">
						<input
							type="text"
							class=" w-full h-12 rounded-lg focus:outline-none px-3 focus:shadow-md text-gray-100"
							placeholder="Search..."
						/> <i class="fa fa-search absolute right-3 top-4 text-gray-300" />
					</div>
					<ul>
						{#each chats as chat}
							<ChatList {chat} />
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- mobile view -->
<div
	style="min-height:120vh;  transform: {sideBarMove};"
	class="w-72 z-40 absolute bg-gray-300 shadow md:h-full flex-col justify-between sm:hidden transition duration-150 ease-in-out"
	id="mobile-nav"
>
	<button
		style="display: {openSideBar};"
		aria-label="toggle sidebar"
		id="openSideBar"
		class="h-10 w-10 bg-gray-400 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 rounded focus:ring-gray-800"
		on:click={sidebarHandler}
	>
		<img
			src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg7.svg"
			alt="toggler"
		/>
	</button>
	<button
		style="display: {closeSideBar};"
		aria-label="Close sidebar"
		id="closeSideBar"
		class="h-10 w-10 bg-gray-400 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer text-white"
		on:click={sidebarHandler}
	>
		<img
			src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg8.svg"
			alt="cross"
		/>
	</button>
	<div style="height: 92vh" class="nav-blue-bg p-2">
		<div
			class="h-full max-w-md mx-auto nav-blue-bg shadow-lg rounded-lg overflow-y-scroll md:max-w-lg"
		>
			<div class="md:flex">
				<div class="w-full p-4">
					<div class="relative">
						<input
							type="text"
							class="w-full h-12 rounded focus:outline-none px-3 focus:shadow-md border-none"
							placeholder="Search..."
						/> <i class="fa fa-search absolute right-3 top-4 text-gray-300" />
					</div>
					<ul>
						{#each chats as chat}
							<ChatList {chat} />
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
