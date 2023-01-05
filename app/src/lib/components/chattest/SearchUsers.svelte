<script>
	import { fly } from 'svelte/transition';
	import { getAllDocs } from '$lib/functions/firebase/getDocs';
	let searchTerm = '';
	let active = false;
	let users = null;
	let loading = false;
	const cancelInactive = () => {
		if (searchTerm) {
			active = true;
		} else {
			active = false;
		}
	};
	const handleSearch = async () => {
		const { docs } = await getAllDocs('whatzapp_users', ['name', '==', searchTerm]);
		console.log('all user', docs);
		loading = true;
		users = docs;
		loading = false;
	};
</script>

<div>
	<form class="search" on:submit|preventDefault={handleSearch}>
		{#if !active}
			<label
				in:fly={{ y: -10, duration: 500 }}
				out:fly={{ y: -10, duration: 500 }}
				for="search_movie">Search User</label
			>
		{/if}

		<input
			type="text"
			name="search_movie"
			bind:value={searchTerm}
			on:focus={() => (active = true)}
			on:blur={cancelInactive}
		/>

		{#if searchTerm}
			<button out:fly={{ x: 0, duration: 500 }} in:fly={{ x: 20, duration: 500 }} type="submit"
				>Search</button
			>
		{/if}
	</form>
</div>