<script lang='ts'>

	//import '../app.css';
	import { onMount } from 'svelte';
	//import { Spinner } from '$components/core';
	import ToastContainer from '$lib/components/chattest/core/Toast/ToastContainer.svelte';
	//import 'bootstrap-icons/font/bootstrap-icons.css';


	const darkModeToggle = () => {
		// On page load or when changing themes, best to add inline in `head` to avoid FOUC
		if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	};

	onMount(() => {
		darkModeToggle();
	});
</script>

<div class='wwrap dark:bg-dark-2 flex flex-col'>
	<div class='app-height app-wrapper-layout'>
			<slot />
	</div>
	<ToastContainer />
</div>


<style>
	.wwrap {
		margin: 0;
        padding: 0;
        display: flex;
        position: fixed;
        top:4%;
        left: 300px;
        height: 96%;
        width: 100%;    
	}
</style>


