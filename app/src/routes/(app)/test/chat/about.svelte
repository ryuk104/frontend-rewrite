<script>
	import Nav from '../components/nav.svelte';
</script>

<div class="sticky top-0 w-full z-40">
	<Nav />
</div>
<div class="h-2 cream-msg" />
<div>
	<h1 class="text-gold text-center text-4xl m-8">About Us</h1>
	<div class=" sm:px-32 lg:mx-32 xl:mx-72">
		<div
			class="leading-relaxed flex justify-center items-center text-center flex-col text-gray-300"
		>
			<p class="text-3xl p-2">The Team</p>
			<div class="text-xl text-gold cursor-pointer p-2">
				<p class="hover:text-yellow-400">-Daniel Yatali</p>
				<p class="hover:text-yellow-400">-Saeed Badree</p>
				<p class="hover:text-yellow-400">-Jarod Esareesingh</p>
				<p class="hover:text-yellow-400">-Aadarsh Pooran</p>
			</div>

			<div class="p-6">
				<p>
					<span class="text-gold text-lg"> myelinking </span>
					was founded in <span class="text-gold text-lg">April 2022</span>, by four individuals
					seeking to create a platform to overcome the communication boundaries for
					<span class="text-gold text-lg">online university students</span>.
				</p>
				<p>
					The platform allows students to openly communicate with each other based on <span
						class="text-gold text-lg"
					>
						similar interests and hobbies
					</span>
					. Additionally, students are automatically placed within a faculty chat, to get acclimated
					with the other students of their own faculty.
				</p>

				<p>
					The myelinking platform was designed with the intention of being
					<span class="text-gold text-lg">sleek, modern, innovative and user-friendly. </span>
				</p>

				<div class="text-lg p-6">
					<p>What are you waiting for?!</p>
					<p>
						<a href="/signup" class="text-gold underline-offset-3 underline">Sign up</a> today to start
						chatting with your peers.
					</p>
					<p class="text-xl text-gold p-2">Your new friends are just a click away!</p>
				</div>
			</div>
		</div>
	</div>
</div>

<svelte:head>
	<title>about</title>
	<style>
		body {
			background-color: #000033;
		}
	</style>
</svelte:head>
