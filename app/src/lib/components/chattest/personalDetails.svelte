<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import CurrentQuestion from '../stores/questionStore';
	import PersonalDetails from '../stores/personalDetailsStore';
	import CurrentUser from '../stores/userDataStore';
	import QuestionFormValidator from '../stores/questionFormValidator';
	import { form, field } from 'svelte-forms';
	import { required } from 'svelte-forms/validators';

	//Selected images to choose as profile picture
	const images = [
		'https://i.imgur.com/EIetITH.png',
		'https://i.imgur.com/pef2wZz.png',
		'https://i.imgur.com/Nl7rO5I.png',
		'https://i.imgur.com/EanBDqJ.png',
		'https://i.imgur.com/gbSLsvu.png',
		'https://i.imgur.com/qLSYQPn.png',
		'https://i.imgur.com/JR8SQu8.png',
		'https://i.imgur.com/0oZSBdS.png',
		'https://i.imgur.com/FsE9SdK.png',
		'https://i.imgur.com/X3fFcU7.png',
		'https://i.imgur.com/FHzntR4.png',
		'https://i.imgur.com/gb6a2Jn.png',
		'https://i.imgur.com/svtPg5E.png',
		'https://i.imgur.com/N5R78GL.png',
		'https://i.imgur.com/qsoAWbh.png',
		'https://i.imgur.com/yVNsQyB.jpg',
		'https://i.imgur.com/m6wkD7s.png',
		'https://i.imgur.com/mN4xWiw.png',
		'https://i.imgur.com/Y5OuGGL.png',
		'https://i.imgur.com/jCgREut.png'
	];

	let firstName = field('firstName', '', [required()], {
		validateOnChange: true
	});
	let lastName = field('lastName', '', [required()], {
		validateOnChange: true
	});
	let email = field('email', '', [required()], {
		validateOnChange: true
	});
	let country = field('country', '', [required()], {
		validateOnChange: true
	});
	let city = field('city', '', [required()], {
		validateOnChange: true
	});
	let about = field('about', '', [required()], {
		validateOnChange: true
	});
	let myForm = form(firstName, lastName, email, country, city, about);
	let photo;
	$: noError =
		$myForm.hasError('firstName.required') ||
		$myForm.hasError('lastName.required') ||
		$myForm.hasError('email.required') ||
		$myForm.hasError('country.required') ||
		$myForm.hasError('city.required') ||
		$myForm.hasError('about.required');

	onMount(() => {
		let userInfo = get(PersonalDetails);
		$firstName.value = userInfo.firstName;
		$lastName.value = userInfo.lastName;
		$email.value = userInfo.email;
		$country.value = userInfo.country;
		$city.value = userInfo.city;
		$about.value = userInfo.about;
		photo = userInfo.photo;
	});
	const saveInfo = () => {
		myForm.validate();
		PersonalDetails.set({
			firstName: $firstName.value,
			lastName: $lastName.value,
			email: $email.value,
			country: $country.value,
			city: $city.value,
			about: $about.value,
			photo: photo
		});
	};
	const next = () => {
		saveInfo();
		if (!noError) {
			$QuestionFormValidator.personalDetails = true; //At this point all questions for personalDetails have been answered
			CurrentQuestion.set('University Details');
		}
	};
</script>

<div class="w-full h-full">
	<div>
		<div class="mt-0">
			<div class="md:grid md:gap-6">
				<div class="md:col-span-1">
					<div class="px-4 sm:px-0">
						<h3 class="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
					</div>
				</div>
				<div class="mt-5 md:mt-0 md:col-span-2">
					<!-- svelte-ignore component-name-lowercase -->
					<form action="#" method="POST">
						<div class="shadow overflow-hidden sm:rounded-md">
							<div class="px-4 py-5 bg-white sm:p-6">
								<div class="grid grid-cols-6 gap-6">
									<div class="col-span-6 sm:col-span-3">
										<label for="first-name" class="block text-sm font-medium text-gray-700"
											>First name</label
										>
										<input
											bind:value={$firstName.value}
											type="text"
											name="first-name"
											id="first-name"
											autocomplete="given-name"
											class="mt-1 input-gold block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>
										{#if $myForm.hasError('firstName.required')}
											<div class="text-red-500 text-xs">Firstname is required</div>
										{/if}
									</div>

									<div class="col-span-6 sm:col-span-3">
										<label for="last-name" class="block text-sm font-medium text-gray-700"
											>Last name</label
										>
										<input
											bind:value={$lastName.value}
											type="text"
											name="last-name"
											id="last-name"
											autocomplete="family-name"
											class="mt-1 input-gold block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>{#if $myForm.hasError('lastName.required')}
											<div class="text-red-500 text-xs">Last name is required</div>
										{/if}
									</div>

									<div class="col-span-6 sm:col-span-4">
										<label for="email-address" class="block text-sm font-medium text-gray-700"
											>Email address</label
										>
										<input
											bind:value={$email.value}
											type="text"
											name="email-address"
											id="email-address"
											autocomplete="email"
											class="mt-1 input-gold block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>{#if $myForm.hasError('email.required')}
											<div class="text-red-500 text-xs">Email is required</div>
										{/if}
									</div>

									<div class="col-span-6 sm:col-span-3">
										<label for="country" class="block text-sm font-medium text-gray-700"
											>Country</label
										>
										<select
											bind:value={$country.value}
											id="country"
											name="country"
											autocomplete="country-name"
											class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none input-gold sm:text-sm"
										>
											<option>Trinidad and Tobago</option>
											<option>United States</option>
											<option>Canada</option>
											<option>Mexico</option>
										</select>{#if $myForm.hasError('country.required')}
											<div class="text-red-500 text-xs">Country is required</div>
										{/if}
									</div>

									<div class="col-span-6 sm:col-span-6 lg:col-span-2">
										<label for="city" class="block text-sm font-medium text-gray-700">City</label>
										<input
											bind:value={$city.value}
											type="text"
											name="city"
											id="city"
											autocomplete="address-level2"
											class="mt-1 input-gold block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
										/>{#if $myForm.hasError('city.required')}
											<div class="text-red-500 text-xs">City is required</div>
										{/if}
									</div>
								</div>
							</div>
							<div class="px-4 py-3 bg-gray-50 text-right sm:px-6" />
						</div>
					</form>
				</div>
			</div>
		</div>

		<div class="hidden sm:block" aria-hidden="true">
			<div class="py-5">
				<div class="border-t border-gray-200" />
			</div>
		</div>
		<div class="mt-10" />
		<div class="md:grid md:gap-6">
			<div class="md:col-span-1">
				<div class="px-4 sm:px-0">
					<h3 class="text-lg font-medium leading-6 text-gray-900">Profile</h3>
					<p class="mt-1 text-sm text-gray-600">
						This information will be displayed publicly so be careful what you share.
					</p>
				</div>
			</div>
			<div class="mt-5 md:mt-0 md:col-span-2">
				<!-- svelte-ignore component-name-lowercase -->
				<form action="#" method="POST">
					<div class="shadow sm:rounded-md sm:overflow-hidden">
						<div class="px-4 py-5 bg-white space-y-6 sm:p-6">
							<div>
								<label for="about" class="block text-sm font-medium text-gray-700"> About </label>
								<div class="mt-1">
									<textarea
										bind:value={$about.value}
										id="about"
										name="about"
										rows="3"
										class="shadow-sm input-gold mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
										placeholder="you@example.com"
									/>{#if $myForm.hasError('about.required')}
										<div class="text-red-500 text-xs">About is required</div>
									{/if}
								</div>
								<p class="mt-2 text-sm text-gray-500">Brief description for your profile.</p>
							</div>

							<div>
								<p class="block text-sm font-medium text-gray-700">Photo</p>
								<img class="w-24 h-24 rounded-full border-2" src={photo} alt="profile-img" />
								<div class="mt-1 flex flex-col items-center text-center">
									<ul class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 content-center gap-2">
										{#each images as image}
											<li>
												<input
													class="sr-only peer"
													type="radio"
													value={image}
													name="profile-pic"
													id={image}
													on:click={() => {
														photo = image;
														$CurrentUser.photo = image;
													}}
													checked={photo == image}
												/>

												<label
													class="h-24 w-24 rounded-full flex  bg-white border border-gray-300 cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-2 peer-checked:border-transparent"
													for={image}
													><img
														class="h-full w-full rounded-full"
														src={image}
														alt="profile-pic"
													/></label
												>
												<!-- <div class="absolute hidden w-5 h-5 peer-checked:block top-5 right-3">
													👍
												</div> -->
											</li>

											<!-- content here -->
										{/each}
									</ul>
								</div>
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
									disabled={noError}
									on:click|preventDefault={next}
									type="submit"
									class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>Next</button
								>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div class="hidden sm:block" aria-hidden="true">
		<div class="py-5">
			<div class="border-t border-gray-200" />
		</div>
	</div>
</div>

<style>
</style>
