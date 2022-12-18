<script>
	import Nav from '../components/nav.svelte';
</script>

<div class="sticky top-0 z-40">
	<Nav />
</div>
<div class="cream-msg h-2" />
<div class="lg:h-20" />
<div class="relative nav-blue-bg overflow-hidden">
	<div class="mx-auto">
		<div
			class="relative z-10 pb-8 nav-blue-bg sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"
		>
			<svg
				class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-nav-blue translate-x-1/2"
				fill="currentColor"
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
				aria-hidden="true"
			>
				<polygon points="50,0 100,0 50,100 0,100" />
			</svg>

			<div>
				<div class="relative pt-6 px-4 sm:px-6 lg:px-8" />
			</div>

			<main
				class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"
			>
				<div class="text-center lg:text-left">
					<h1 class="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
						<span class="block xl:inline text-gray-200">For Students ...</span>
						<span class="block text-gold xl:inline">By Students</span>
					</h1>
					<p
						class="mt-3 text-base text-gray-200 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
					>
						MyElinking is an intuitive social media platform, created with the student in mind. Sign
						up or log into myElinking and dive into a network of your fellow students where you can
						mingle and share ideas and passions. Join groups based on your preferences and interact
						with students from all faculties.
					</p>
					<div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
						<div class="rounded-md shadow">
							<a
								href="/login"
								class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-100 cream-msg hover:bg-yellow-500 md:py-4 md:text-lg md:px-10"
							>
								Log in
							</a>
						</div>
						<div class="mt-3 sm:mt-0 sm:ml-3">
							<a
								href="/signup"
								class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-100 cream-msg hover:bg-yellow-500 md:py-4 md:text-lg md:px-10"
							>
								Sign Up
							</a>
						</div>
					</div>
				</div>
			</main>
		</div>
	</div>
	<div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
		<img
			class="h-56 p-3 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
			src="https://i.imgur.com/0CUwW1S.jpeg"
			alt=""
		/>
	</div>
</div>

<svelte:head>
	<title>Home</title>
	<link rel="icon" href="https://i.imgur.com/0CUwW1S.jpeg" />
	<style>
		body {
			background-color: #000033;
		}
	</style>
</svelte:head>
