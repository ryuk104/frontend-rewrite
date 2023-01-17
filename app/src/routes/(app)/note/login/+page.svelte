<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let googleButton;
	let loaded = false;
	let sending = false;
	let magic_link_text = false;

	onMount(async () => {
		initializeGoogle();
	});

	function initializeGoogle() {
		if (loaded) return;
		google.accounts.id.initialize({
			client_id: '922708270302-oqbnhn6n88ut8cb6npiinkm1ghj0clfa.apps.googleusercontent.com',
			callback: async (res, error) => {
				let auth = await fetch('/auth/google_sign_in', {
					method: 'POST',
					mode: 'cors',
					body: JSON.stringify(res)
				});

				const json = await auth.json();
				if (json.error) {
					console.error(json.error);
					return;
				}
				if (json.newUser == true) goto('/new-workspace');

				let active_page;
				let cookie = document.cookie.match(/active_page=([^;]+)/);
				if (cookie == null) {
				} else {
					active_page = cookie[1];
				}

				goto(active_page);
			}
		});
		google.accounts.id.prompt();
		google.accounts.id.renderButton(googleButton, {
			size: 'large',
			type: 'standard',
			shape: 'pill',
			width: '220'
		});
		loaded = true;
	}
	async function handleSubmit() {}
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async defer on:load={initializeGoogle}>
	</script>
	<title>Sign in to Evidence</title>
</svelte:head>
<div class="sm:bg-slate-100 min-h-screen flex items-center sm:px-2">
	<div class="m-auto w-full max-w-lg">
		<div class="bg-white sm:rounded-2xl p-6 sm:p-12">
			<h1 class="text-3xl font-bold tracking-tight text-center">Sign in to Evidence</h1>

			<div class="h-16 p-4">
				<div on:load={initializeGoogle} bind:this={googleButton} class="max-w-[220px] m-auto">
					<div
						class="max-w-[220px] border rounded-full py-2 m-auto block text-center cursor-not-allowed"
					>
						Sign in with Google
					</div>
				</div>
			</div>

			<div class="flex w-full items-center py-8">
				<div class="h-px bg-slate-300 flex-1 rounded-full" />
				<div class="w-12 text-center text-slate-600 font-medium">OR</div>
				<div class="h-px bg-slate-300 flex-1 rounded-full" />
			</div>

			<form
				class="flex flex-col justify-center w-full space-y-4"
				on:submit|preventDefault={handleSubmit}
			>
				<input
					type="email"
					name="email"
					class="w-full rounded-lg border-slate-500 py-3 focus:outline-none focus:border-blue-700 focus:ring-blue-700 placeholder-slate-600"
					placeholder="name@work-email.com"
					required=""
				/><!----><button
					type="submmit"
					class="w-full rounded-lg bg-blue-700 text-white py-3 font-medium flex justify-center"
					name="button"
				>
					<svg
						class="animate-spin -ml-1 mr-3 h-5 w-5 text-white {sending ? '' : 'hidden'}"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
						/>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
						<span class="sr-only">Loading...</span>
					</svg>
					{sending ? 'Sending Magic Link' : 'Sign In with Email'}</button
				>
			</form>
			<div
				class="w-full flex items-center space-x-1 text-center justify-center text-sm font-medium text-slate-800 py-4"
			>
				<svg
					class="w-5 h-5 text-slate-700 hidden sm:block"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
					/></svg
				>
				<div class="">
					New to Evidence? <a class="underline text-blue-700 whitespace-nowrap" href="/sign-up"
						>Create an account</a
					>
				</div>
			</div>
		</div>
		<div class="text-center text-lg py-4 {magic_link_text ? '' : 'hidden'}">
			<p>Check your email!</p>
			<p>We just sent you a link to magic link to sign in!</p>
		</div>
	</div>
</div>
