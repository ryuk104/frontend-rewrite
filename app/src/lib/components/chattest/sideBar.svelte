<script>
	import { get } from 'svelte/store';

	import CurrentQuestion from '../stores/questionStore';
	import SideBarUser from './sideBarUser.svelte';
	let openSideBar = 'flex';
	let closeSideBar = 'none';
	let sideBarMove = 'translateX(-260px)';
	function sidebarHandler() {
		if (openSideBar == 'flex') {
			openSideBar = 'none';
			closeSideBar = 'flex';
			sideBarMove = 'translateX(0px)';
		} else {
			closeSideBar = 'none';
			openSideBar = 'flex';
			sideBarMove = 'translateX(-260px)';
		}
	}
	const questions = ['Personal Details', 'University Details', 'Interests', 'Socials'];

	const changeQuestions = (question) => {
		CurrentQuestion.set(question.question);
		// console.log(get(CurrentQuestion));
	};
</script>

<div
	style="min-height: 94vh"
	class="w-64 absolute sm:relative nav-blue-bg shadow md:h-full flex-col justify-between hidden sm:flex"
>
	<div class="px-8">
		<div class="mt-8 text-center">
			<SideBarUser />
		</div>
		<ul class="mt-12">
			{#each questions as question}
				<!-- content here -->

				<li
					class="flex w-full justify-between text-gold hover:text-yellow-400 cursor-pointer items-center mb-6"
				>
					<button
						on:click={() => changeQuestions({ question })}
						class="flex items-center focus:outline-none focus:ring-2 focus:ring-white"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="icon icon-tabler icon-tabler-puzzle"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" />
							<path
								d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1"
							/>
						</svg>
						<span class="text-sm ml-2">{question} </span>
					</button>
				</li>
			{/each}
		</ul>
	</div>
</div>
<div
	style="min-height:120vh;  transform: {sideBarMove};"
	class="w-64 z-40 absolute bg-gray-800 shadow md:h-full flex-col justify-between sm:hidden transition duration-150 ease-in-out"
	id="mobile-nav"
>
	<button
		style="display: {openSideBar};"
		aria-label="toggle sidebar"
		id="openSideBar"
		class="h-10 w-10 bg-gray-800 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 rounded focus:ring-gray-800"
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
		class="h-10 w-10 bg-gray-800 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer text-white"
		on:click={sidebarHandler}
	>
		<img
			src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg8.svg"
			alt="cross"
		/>
	</button>
	<div class="px-8">
		<div class="mt-8 text-center">
			<SideBarUser />
		</div>
		<ul class="mt-12">
			{#each questions as question}
				<!-- content here -->
				<li
					class="flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center mb-6"
				>
					<button
						on:click={() => changeQuestions({ question })}
						class="flex items-center focus:outline-none focus:ring-2 focus:ring-white"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="icon icon-tabler icon-tabler-puzzle"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" />
							<path
								d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1"
							/>
						</svg>
						<span class="text-sm ml-2">{question}</span>
					</button>
				</li>
			{/each}
		</ul>
	</div>
</div>
