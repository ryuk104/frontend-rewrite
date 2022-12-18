<script>
	import { goto } from '$app/navigation';

	import { get } from 'svelte/store';

	import currentUser from '../stores/userDataStore.js';
	import PersonalDetails from '../stores/personalDetailsStore';
	import UniversityDetails from '../stores/universityDetailsStore';
	import InterestDetails from '../stores/interestStore';

	import SocialDetails from '../stores/socialStore';
	import { endpoints } from '$lib/endpoints.js';
	import QuestionFormValidator from '../stores/questionFormValidator.js';
	const socials = ['Instagram', 'TikTok', 'GitHub', 'Twitter', 'Steam', 'Discord', 'Whatsapp'];
	$: noError =
		$QuestionFormValidator.interests &&
		$QuestionFormValidator.personalDetails &&
		$QuestionFormValidator.universityDetails;

	const saveInfo = () => {
		SocialDetails.set({
			Instagram: $SocialDetails.Instagram,
			TikTok: $SocialDetails.TikTok,
			GitHub: $SocialDetails.GitHub,
			Twitter: $SocialDetails.Twitter,
			Steam: $SocialDetails.Steam,
			Discord: $SocialDetails.Discord,
			Whatsapp: $SocialDetails.Whatsapp
		});
	};

	const saveAllInfo = (route) => {
		let personalDetails = get(PersonalDetails);
		let universityDetails = get(UniversityDetails);
		let interestDetails = get(InterestDetails);
		let socialDetails = get(SocialDetails);

		let userDetails = {
			user_id: $currentUser.id,
			first_name: personalDetails.firstName,
			last_name: personalDetails.lastName,
			email: personalDetails.email,
			country: personalDetails.country,
			city: personalDetails.city,
			about: personalDetails.about,
			university: universityDetails.universityName,
			faculty: universityDetails.faculty,
			major: universityDetails.major,
			photo: $currentUser.photo,
			movie: interestDetails.movie,
			music: interestDetails.music,
			staying_in: interestDetails.stayingIn,
			sport: interestDetails.sport,
			bot: 'human',
			other_info: {
				socials: {
					instagram: socialDetails.Instagram,
					twitter: socialDetails.Twitter,
					discord: socialDetails.Discord,
					github: socialDetails.GitHub,
					whatsapp: socialDetails.Whatsapp,
					steam: socialDetails.Steam,
					tiktok: socialDetails.TikTok
				}
			}
		};
		// console.log(JSON.stringify(userDetails));
		(async () => {
			try {
				const rawResponse = await fetch(endpoints.database + '/user/create/update_info', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						Authorization: 'JWT ' + $currentUser.token,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(userDetails)
				});
				let response = await rawResponse.json();
				// console.log(response);
				$currentUser.newUser = false;
				goto(`/${route}`);
			} catch (error) {
				console.error(error);
			}
		})();
	};
</script>

<div class="w-full h-full">
	<div class="mt-0">
		<div class="md:grid md:gap-6">
			<div class="md:col-span-1">
				<div class="px-4 sm:px-0">
					<h3 class="text-lg font-medium leading-6 text-gray-900">Social Details (Optional)</h3>
					<p class="mt-1 text-sm text-gray-600">This information is visible to all users.</p>
				</div>
			</div>
			<div class="mt-5 md:mt-0 md:col-span-2">
				<form action="#" method="POST">
					<div class="shadow overflow-hidden sm:rounded-md">
						<div class="px-4 py-5 bg-white sm:p-6">
							{#each socials as social}
								<!-- content here -->
								<div class="grid grid-cols-3 gap-6">
									<div class="col-span-3 sm:col-span-2">
										<label for="company-website" class="block text-sm font-medium text-gray-700">
											{social}
										</label>
										<div class="mt-1 flex rounded-md shadow-sm">
											{#if social == 'Whatsapp'}
												<span
													class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
												>
													#
												</span>
											{:else}
												<span
													class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
												>
													http://
												</span>
											{/if}
											<input
												bind:value={$SocialDetails[social]}
												type="text"
												name={social}
												id={social}
												class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
												placeholder={social == 'Whatsapp' ? 'phone-number' : 'www.example.com'}
											/>
										</div>
									</div>
								</div>
								<br />
							{/each}
						</div>
						{#if !noError}
							<p class="text-red-500">Please review required questions some have been left blank</p>
						{/if}
						<div class="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-end gap-6">
							<button
								on:click|preventDefault={saveInfo}
								type="submit"
								class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>Save</button
							>
							{#if !$currentUser.newUser}
								<button
									on:click|preventDefault={() => saveAllInfo('dashboard')}
									type="submit"
									class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>Update</button
								>
							{/if}
							<button
								disabled={!noError}
								on:click|preventDefault={() => saveAllInfo('match')}
								type="submit"
								class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>Get Matches</button
							>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
