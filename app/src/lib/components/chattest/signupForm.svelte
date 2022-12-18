<script>
	import { form, field } from 'svelte-forms';
	import { matchField, required } from 'svelte-forms/validators';
	import { goto } from '$app/navigation';
	import { endpoints } from '$lib/endpoints';

	const username = field('username', '', [required()], {
		validateOnChange: true
	});
	const password = field('password', '', [required()], {
		validateOnChange: true
	});
	const email = field('email', '', [required()], {
		validateOnChange: true
	});
	const passwordConfirmation = field('passwordConfirmation', '', [
		matchField(password),
		required()
	]);
	const myForm = form(username, email, password, passwordConfirmation);
	myForm.validate();
	$: error =
		$myForm.hasError('username.required') ||
		$myForm.hasError('password.required') ||
		$myForm.hasError('email.required') ||
		$myForm.hasError('passwordConfirmation.required') ||
		$myForm.hasError('passwordConfirmation.match_field');
	let signupResponse = '';
	const validate = () => {
		if (!error) {
			const user = {
				username: $username.value,
				password: $password.value,
				email: $email.value
			};
			(async () => {
				try {
					const rawResponse = await fetch(endpoints.database + '/signup', {
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(user)
					});
					const content = await rawResponse.json();
					// console.log(content);
					signupResponse = content;
					if (signupResponse == 'user created') {
						goto('/login');
					}
				} catch (error) {
					console.error(error);
				}
			})();
		}
	};
	$: name = $username.value == '' ? 'Sign Up' : 'Welcome ' + $username.value;
</script>

<div class="flex items-center min-h-screen">
	<div class="nav-blue-bg flex-1 h-full max-w-4xl mx-auto rounded-lg shadow-md shadow-gray-500">
		<div class="flex flex-col md:flex-row">
			<div style="" class="h-44 md:h-auto md:w-1/2">
				<img
					class="rounded-t-lg  object-cover w-full h-full shadow-2xl shadow-black md:shadow-none"
					src="https://i.ibb.co/XVSRvxK/bg.png"
					alt="img"
				/>
			</div>
			<div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
				<div class="w-full">
					<div class="flex justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-20 h-20 text-gold"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="M12 14l9-5-9-5-9 5 9 5z" />
							<path
								d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
							/>
						</svg>
					</div>
					<h1 class="mb-4 text-2xl font-bold text-center text-gray-300">{name}</h1>
					<div>
						<label for="username" class="block text-sm text-gray-100"> Username </label>
						<input
							bind:value={$username.value}
							type="text"
							class="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
							placeholder="Username"
						/>
						{#if $myForm.hasError('username.required')}
							<div class="text-red-500 text-xs">Username is required</div>
						{/if}
					</div>
					<div>
						<label for="password" class="block mt-4 text-sm text-gray-100"> Email </label>
						<input
							bind:value={$email.value}
							class="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
							placeholder="Password"
							type="email"
						/>

						{#if $myForm.hasError('email.required')}
							<div class="text-red-500 text-xs">Email is required</div>
						{/if}
					</div>
					<div>
						<label for="password" class="block mt-4 text-sm text-gray-100"> Password </label>
						<input
							bind:value={$password.value}
							class="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
							placeholder="Password"
							type="password"
						/>

						{#if $myForm.hasError('password.required')}
							<div class="text-red-500 text-xs">Password is required</div>
						{/if}
					</div>
					<div>
						<label for="password" class="block mt-4 text-sm text-gray-100"> Repeat Password </label>
						<input
							bind:value={$passwordConfirmation.value}
							class="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
							placeholder="Password"
							type="password"
						/>
						{#if $myForm.hasError('passwordConfirmation.required')}
							<div class="text-red-500 text-xs">Password repeat required</div>
						{/if}

						{#if $myForm.hasError('passwordConfirmation.match_field')}
							<div class="text-red-500 text-xs">Password does not match</div>
						{/if}
					</div>
					<button
						disabled={error}
						class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-gray-50 transition-colors duration-150 cream-msg border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
						on:click|preventDefault={validate}
					>
						Sign Up
					</button>
					{#if signupResponse === 'username or email already exists'}
						<p class="text-red-500 text-xs">{signupResponse}</p>
					{/if}

					<div class="mt-4 text-center">
						<p class="text-sm text-light-gold">
							Already have an account? <a href="/login" class="text-gold hover:underline">
								Log in.</a
							>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<svelte:head>
	<style>
	</style>
</svelte:head>
