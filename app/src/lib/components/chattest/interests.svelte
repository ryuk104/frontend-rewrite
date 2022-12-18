<!-- This component renders the interst form on the question page -->
<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import CurrentQuestion from '../stores/questionStore';
	import InterestDetails from '../stores/interestStore';
	import QuestionFormValidator from '../stores/questionFormValidator';
	import { form, field } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';
	let stayingIn = field('stayingIn', '', [required()], {
		validateOnChange: true
	});
	let choosenSport = field('choosenSport', '', [required()], {
		validateOnChange: true
	});
	let choosenMusic = field('choosenMusic', '', [required()], {
		validateOnChange: true
	});
	let choosenMovie = field('choosenMovie', '', [required()], {
		validateOnChange: true
	});
	let myForm = form(stayingIn, choosenSport, choosenMovie, choosenMusic);
	$: noError =
		$myForm.hasError('choosenSport.required') ||
		$myForm.hasError('stayingIn.required') ||
		$myForm.hasError('choosenMovie.required') ||
		$myForm.hasError('choosenMusic.required');

	const sports = ['Football', 'Cricket', 'Basketball', 'Tennis', 'I do not like sports'];
	const movies = ['Horror', 'Action', 'Romance', 'Comedy', 'Animation'];
	const musics = ['DanceHall', 'Soca', 'Pop', 'Classical', 'I hate music'];
	onMount(() => {
		let interestDetails = get(InterestDetails);
		$stayingIn.value = interestDetails.stayingIn;
		$choosenSport.value = interestDetails.sport;
		$choosenMovie.value = interestDetails.movie;
		$choosenMusic.value = interestDetails.music;
	});

	const saveInfo = () => {
		InterestDetails.set({
			stayingIn: $stayingIn.value,
			sport: $choosenSport.value,
			movie: $choosenMovie.value,
			music: $choosenMusic.value
		});
	};
	const next = () => {
		saveInfo();
		if (!noError) {
			$QuestionFormValidator.interests = true;
			CurrentQuestion.set('Socials');
		}
	};
</script>

<div class="sm:mt-0">
	<div class="md:grid md:gap-6">
		<div class="md:col-span-1">
			<div class="px-4 sm:px-0">
				<h3 class="text-lg font-medium leading-6 text-gray-900">Interests Details</h3>
				<p class="mt-1 text-sm text-gray-600">This information will be visible to all users</p>
			</div>
		</div>
		<div class="mt-5 md:mt-0 md:col-span-2">
			<!-- svelte-ignore component-name-lowercase -->
			<form action="#" method="POST">
				<div class="shadow overflow-hidden sm:rounded-md">
					<div class="px-4 py-5 bg-white space-y-6 sm:p-6">
						<fieldset>
							<div>
								<legend class="text-base font-medium text-gray-900"
									>Do you prefer going out or staying in?</legend
								>
							</div>
							<div class="mt-4 space-y-4">
								<div class="flex items-center">
									<input
										on:click={() => ($stayingIn.value = 'going out')}
										checked={$stayingIn.value == 'going out'}
										value="go out"
										id="staying-in"
										name="staying-in"
										type="radio"
										class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label for="staying-in" class="ml-3 block text-sm font-medium text-gray-700"
										>Go out
									</label>
								</div>

								<div class="flex items-center">
									<input
										on:click={() => ($stayingIn.value = 'stay in')}
										checked={$stayingIn.value == 'stay in'}
										value="stay home"
										id="staying-in"
										name="staying-in"
										type="radio"
										class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
									/>
									<label for="staying-in" class="ml-3 block text-sm font-medium text-gray-700"
										>Stay in
									</label>
								</div>
							</div>
						</fieldset>
						{#if $myForm.hasError('stayingIn.required')}
							<div class="text-red-500 text-xs">Staying in is required</div>
						{/if}
					</div>
					<div class="px-4 py-3 bg-gray-50 text-right sm:px-6" />
				</div>
				<div class="hidden sm:block" aria-hidden="true">
					<div class="py-5">
						<div class="border-t border-gray-200" />
					</div>
				</div>

				<div class="shadow overflow-hidden sm:rounded-md">
					<div class="px-4 py-5 bg-white space-y-6 sm:p-6">
						<fieldset>
							<div>
								<legend class="text-base font-medium text-gray-900"
									>Does any sport interest you?</legend
								>
							</div>
							<div class="mt-4 space-y-4">
								{#each sports as sport}
									<div class="flex items-center">
										<input
											on:click={() => ($choosenSport.value = sport)}
											checked={$choosenSport.value == sport}
											value={sport}
											id="sport"
											name="sport"
											type="radio"
											class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
										/>
										<label for="sport" class="ml-3 block text-sm font-medium text-gray-700">
											{sport}
										</label>
									</div>
								{/each}
							</div>
						</fieldset>
						{#if $myForm.hasError('choosenSport.required')}
							<div class="text-red-500 text-xs">Sport is required</div>
						{/if}
					</div>
					<div class="px-4 py-3 bg-gray-50 text-right sm:px-6" />
				</div>
				<div class="hidden sm:block" aria-hidden="true">
					<div class="py-5">
						<div class="border-t border-gray-200" />
					</div>
				</div>

				<div class="shadow overflow-hidden sm:rounded-md">
					<div class="px-4 py-5 bg-white space-y-6 sm:p-6">
						<fieldset>
							<div>
								<legend class="text-base font-medium text-gray-900"
									>What type of movies/Tv shows do you like to watch?</legend
								>
							</div>
							<div class="mt-4 space-y-4">
								{#each movies as movie}
									<div class="flex items-center">
										<input
											on:click={() => ($choosenMovie.value = movie)}
											checked={$choosenMovie.value == movie}
											value={movie}
											id="movie"
											name="movie"
											type="radio"
											class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
										/>
										<label for="movie" class="ml-3 block text-sm font-medium text-gray-700">
											{movie}
										</label>
									</div>
								{/each}
							</div>
						</fieldset>
						{#if $myForm.hasError('choosenMovie.required')}
							<div class="text-red-500 text-xs">Movie is required</div>
						{/if}
					</div>
					<div class="px-4 py-3 bg-gray-50 text-right sm:px-6" />
				</div>
				<div class="hidden sm:block" aria-hidden="true">
					<div class="py-5">
						<div class="border-t border-gray-200" />
					</div>
				</div>

				<div class="shadow overflow-hidden sm:rounded-md">
					<div class="px-4 py-5 bg-white space-y-6 sm:p-6">
						<fieldset>
							<div>
								<legend class="text-base font-medium text-gray-900"
									>What type of music do you listen to?</legend
								>
							</div>
							<div class="mt-4 space-y-4">
								{#each musics as music}
									<div class="flex items-center">
										<input
											on:click={() => ($choosenMusic.value = music)}
											value={music}
											checked={$choosenMusic.value == music}
											id="music"
											name="music"
											type="radio"
											class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
										/>
										<label for="music" class="ml-3 block text-sm font-medium text-gray-700">
											{music}
										</label>
									</div>
								{/each}
							</div>
						</fieldset>
						{#if $myForm.hasError('choosenMusic.required')}
							<div class="text-red-500 text-xs">Music is required</div>
						{/if}
					</div>
					{#if noError}
						<p class="text-red-500">Please fill out all required fields</p>
					{/if}
					<div class="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-end gap-6">
						<button
							on:click|preventDefault={saveInfo}
							type="submit"
							class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>Save</button
						><button
							on:click|preventDefault={next}
							disabled={noError}
							type="submit"
							class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>Next</button
						>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
