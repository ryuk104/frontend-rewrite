<script>
	import { tick } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { click_outside } from '$lib/components/notes/utils';

	const dispatch = createEventDispatcher();

	export let pages;
	export let page_id;
	export let trash = false;
	let children_toggle = {};
	let menu_options = null;
	let trash_options = null;
	let renaming = null;
</script>

<ul>
	{#each pages as { title, id, children, deleted }}
		{@const children_length = children
			? children.reduce((count, obj) => (count + obj.deleted ? 0 : 1), 0)
			: 0}
		{#if !deleted}
			<li class="p-0 relative">
				<a
					href={`/${id}`}
					class="{page_id == id
						? 'bg-slate-200/80 text-slate-900'
						: 'text-slate-600'} hover:bg-slate-200/80 hover:text-slate-900 group flex items-center
    px-1 text-sm font-medium rounded-md my-1"
				>
					{#if children_length}
						<button
							class="hover:bg-slate-300 h-6 w-6 min-w-[24px] max-w-[24px] rounded-[5px] p-[2px]"
							on:click|preventDefault={() => {
								if (children_toggle[id]) {
									children_toggle[id] = false;
								} else {
									children_toggle[id] = true;
								}
							}}
						>
							<svg
								class="{children_toggle[id]
									? 'rotate-90'
									: ''} text-slate-400 mr-2 h-5 w-5 flex-shrink-0 transform transition-all duration-150 ease-in-out group-hover:text-slate-500"
								viewBox="0 0 20 20"
								aria-hidden="true"
							>
								<path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
							</svg>
						</button>
					{:else}
						<span class="w-6 min-w-[24px] max-w-[24px]" />
					{/if}

					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="{page_id == id
							? 'text-slate-500'
							: 'text-slate-400'} group-hover:text-slate-500 mr-2 flex-shrink-0 h-5 w-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
						/>
					</svg>
					<span class="grow truncate py-2">{title}</span>

					<button
						on:click|preventDefault|stopPropagation={() => {
							if (!trash) menu_options = id;
							if (trash) trash_options = id;
						}}
						class="hover:bg-slate-300 h-6 rounded-[5px] p-[2px]"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="hidden group-hover:block group-hover:text-slate-500 flex-shrink-0 h-5 w-5 hover-text-slate-700 text-center m-auto"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
							/>
						</svg>
					</button>
				</a>

				{#if menu_options === id}
					<div
						use:click_outside
						on:outclick={() => (menu_options = null)}
						on:click|preventDefault
						class="absolute w-28 right-2 top-2 bg-white p-1 rounded-md border border-slate-300 shadow z-40"
					>
						<button
							on:click={async () => {
								renaming = id;
								menu_options = null;
								await tick();
								let el = document.getElementById(id);
								el.focus();
							}}
							class="text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 group flex items-center w-full
    p-1 text-sm font-medium rounded-md relative mb-1 group"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="group-hover:text-slate-600 mx-1 h-4 w-4 text-slate-500"
							>
								<path
									d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z"
								/>
								<path
									d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z"
								/>
							</svg>

							Rename
						</button>
						<button
							on:click={() => dispatch('delete', { id })}
							class="text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 group flex items-center w-full
    p-1 text-sm font-medium rounded-md relative"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="group-hover:text-slate-600 mx-1 h-4 w-4 text-slate-500"
							>
								<path
									fill-rule="evenodd"
									d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
									clip-rule="evenodd"
								/>
							</svg>

							Delete
						</button>
					</div>
				{/if}
				{#if renaming === id}
					<input
						{id}
						type="text"
						class="absolute top-0 left-0 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
						bind:value={title}
						on:blur={() => {
							dispatch('rename', { id, title });
							renaming = null;
						}}
						on:keydown={(e) => {
							if (e.key == 'Enter') e.target.blur();
						}}
					/>
				{/if}

				{#if trash_options === id}
					<div
						use:click_outside
						on:outclick={() => (trash_options = null)}
						on:click|preventDefault
						class="absolute w-44 right-2 top-2 bg-white p-1 rounded-md border border-slate-300 shadow z-40"
					>
						<button
							on:click={() => {
								trash_options = null;
								dispatch('restore_page', { id });
							}}
							class="text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 group flex items-center w-full
    p-1 text-sm font-medium rounded-md relative mb-1 group"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="group-hover:text-slate-600 mx-1 h-4 w-4 text-slate-500"
							>
								<path
									fill-rule="evenodd"
									d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z"
									clip-rule="evenodd"
								/>
							</svg>

							<span class="self-end">Restore Page</span>
						</button>
						<button
							on:click={() => dispatch('delete_permanent', { id })}
							class="text-slate-600 hover:bg-red-200/80 hover:text-red-800 group flex items-center w-full
    p-1 text-sm font-medium rounded-md relative"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="group-hover:text-red-700 mx-1 h-4 w-4 text-slate-500"
							>
								<path
									fill-rule="evenodd"
									d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
									clip-rule="evenodd"
								/>
							</svg>
							<span class="self-end">Delete Permanently</span>
						</button>
					</div>
				{/if}
			</li>
		{/if}
		{#if children && children_toggle[id]}
			<div class="ml-[16px] pl-1 border-l border-slate-300">
				<svelte:self
					{trash}
					bind:pages={children}
					bind:page_id
					on:delete
					on:rename
					on:delete_permanent
					on:restore_page
				/>
			</div>
		{/if}
	{/each}
</ul>
