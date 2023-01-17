<script>
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Spectral&display=swap"
		rel="stylesheet"
	/>

	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<title>Evidence Demo</title>
</svelte:head>


<div id="cover" style="height:0">&nbsp;</div>
<main>
	<slot />
</main>

<footer>
	<p>
		visit <a target="blank" href="https://github.com/nvlgzr/notion2svelte"
			><em>notion2svelte</em> on GitHub</a
		>
	</p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
		width: calc(min(90vw, 42rem));
		font: 1.25rem/1.5rem 'Helvetica Neue', Helvetica, Arial, sans-serif;
		line-height: 1.35;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>


