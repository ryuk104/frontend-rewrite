<script>
	import Editor from '$lib/components/notes/index.svelte';
	import content from './content.json';
	let title = 'Svelte Tiptap Notion Clone (Svnotion?)';
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content="Svelte Tiptap Notion Clone" />
	<meta
		property="og:site_name"
		content="Building a Notion editor clone with Svelte, Tiptap and Tailwind."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://svelte-tiptap.vercel.app/notionClone.jpg" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="max-w-3xl p-2 m-auto my-16">
	<h1
		contenteditable
		bind:textContent={title}
		class="focus:outline-none text-4xl font-semibold mb-4"
	/>
	<Editor {content} />
</div>

<style>
	h1:empty::before {
		content: 'Title';
		color: #adb5bd;
	}
</style>

<script>
	let mobile_menu = false;
</script>

<div class="isolate bg-white">
	<div
		class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
	>
		<svg
			class="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
			viewBox="0 0 1155 678"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
				fill-opacity=".3"
				d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
			/>
			<defs>
				<linearGradient
					id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
					x1="1155.49"
					x2="-78.208"
					y1=".177"
					y2="474.645"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#e0f2fe" />
					<stop offset="1" stop-color="#046ade" />
				</linearGradient>
			</defs>
		</svg>
	</div>
	<div class="px-6 pt-6 lg:px-8">
		<div>
			<nav class="flex h-9 items-center justify-between" aria-label="Global">
				<div class="flex lg:min-w-0 lg:flex-1" aria-label="Global">
					<a href="/" class="gradient font-bold">evidence</a>
				</div>
				<div class="flex lg:hidden">
					<button
						on:click={() => (mobile_menu = true)}
						type="button"
						class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700"
					>
						<span class="sr-only">Open main menu</span>
						<!-- Heroicon name: outline/bars-3 -->
						<svg
							class="h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
					</button>
				</div>
				<div class="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
					<a
						href="https://docs.evidence.dev/"
						class="font-semibold text-slate-900 hover:text-slate-900">Docs</a
					>

					<a
						href="https://github.com/evidence-dev/evidence"
						class="font-semibold text-slate-900 hover:text-slate-900">GitHub</a
					>

					<a
						href="https://evidence.dev/examples"
						class="font-semibold text-slate-900 hover:text-slate-900">Examples</a
					>

					<a
						href="https://evidence.dev/blog"
						class="font-semibold text-slate-900 hover:text-slate-900">Blog</a
					>
					<a
						href="https://evidence.dev/changelog"
						class="font-semibold text-slate-900 hover:text-slate-900">Changelog</a
					>
				</div>
				<div class="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
					<a
						href="/login"
						class="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-slate-900 shadow-sm ring-1 ring-slate-900/10 hover:ring-slate-900/20"
						>Log in</a
					>
				</div>
			</nav>
			<!-- Mobile menu, show/hide based on menu open state. -->
			<div role="dialog" aria-modal="true">
				<div
					focus="true"
					class="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden {mobile_menu
						? ''
						: 'hidden'}"
				>
					<div class="flex h-9 items-center justify-between">
						<div class="flex">
							<a href="/">
								<span class="gradient font-bold">evidence</span>
							</a>
						</div>
						<div class="flex">
							<button
								on:click={() => (mobile_menu = false)}
								type="button"
								class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700"
							>
								<span class="sr-only">Close menu</span>
								<!-- Heroicon name: outline/x-mark -->
								<svg
									class="h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					</div>
					<div class="mt-6 flow-root">
						<div class="-my-6 divide-y divide-slate-500/10">
							<div class="space-y-2 py-6">
								<a
									href="https://docs.evidence.dev/"
									class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-slate-900 hover:bg-slate-400/10"
									>Docs</a
								>

								<a
									href="https://github.com/evidence-dev/evidence"
									class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-slate-900 hover:bg-slate-400/10"
									>GitHub</a
								>

								<a
									href="https://evidence.dev/examples"
									class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-slate-900 hover:bg-slate-400/10"
									>Examples</a
								>

								<a
									href="https://evidence.dev/blog"
									class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-slate-900 hover:bg-slate-400/10"
									>Blog</a
								>
								<a
									href="https://evidence.dev/changelog"
									class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-slate-900 hover:bg-slate-400/10"
									>Changelog</a
								>
							</div>
							<div class="py-6">
								<a
									href="/login"
									class="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-slate-900 hover:bg-slate-400/10"
									>Log in</a
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<main>
		<div class="relative px-6 lg:px-8">
			<div class="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
				<div>
					<div class="hidden sm:mb-8 sm:flex sm:justify-center">
						<div
							class="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-slate-900/10 hover:ring-slate-900/20"
						>
							<span class="text-slate-600">
								See demo source code on <a
									href="https://github.com/andheller/evidence-demo"
									class="font-semibold text-blue-600"
									rel="noreferrer"
									target="_blank"
									><span class="absolute inset-0" aria-hidden="true" />GitHub
									<span aria-hidden="true">&rarr;</span></a
								>
							</span>
						</div>
					</div>
					<div>
						<h1 class="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
							Business Intelligence for <span class="gradient">Modern Data Teams</span>
						</h1>
						<p class="mt-6 text-lg leading-8 text-slate-600 sm:text-center">
							Beautiful reports synced to your data with just SQL and markdown
						</p>
						<div class="mt-8 flex gap-x-4 sm:justify-center">
							<a
								href="/demo"
								class="inline-block rounded-lg bg-blue-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-blue-600 hover:bg-blue-700 hover:ring-blue-700"
							>
								Try demo
								<span class="text-blue-200" aria-hidden="true">&rarr;</span>
							</a>
							<a
								href="https://stackblitz.com/fork/evidence?file=pages%2Findex.md"
								class="inline-block rounded-lg px-4 py-1.5 text-base ffont-semibold leading-7 text-slate-900 ring-1 ring-slate-900/10 hover:ring-slate-900/20"
							>
								Open Stackblitz
								<span class="text-slate-400" aria-hidden="true">&rarr;</span>
							</a>
						</div>
					</div>
					<div
						class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
					>
						<svg
							class="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
							viewBox="0 0 1155 678"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
								fill-opacity=".3"
								d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
							/>
							<defs>
								<linearGradient
									id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
									x1="1155.49"
									x2="-78.208"
									y1=".177"
									y2="474.645"
									gradientUnits="userSpaceOnUse"
								>
									<stop stop-color="#08a86d" />
									<stop offset="1" stop-color="#16a34a" />
								</linearGradient>
							</defs>
						</svg>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>

<style>
	.gradient {
		background: -webkit-linear-gradient(315deg, #046ade 0, #08a86d 75%);
		text-decoration: none;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
