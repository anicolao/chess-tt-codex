<script lang="ts">
	const principles = [
		'Opposite-side tabletop play',
		'Redux + event sourcing for game and UI state',
		'Zero-pixel Playwright screenshots',
		'GitHub Pages deploys with per-PR previews'
	];
</script>

<svelte:head>
	<title>Chess TT Codex</title>
	<meta
		name="description"
		content="Scaffold for a tabletop chess PWA with strict test and deployment policy."
	/>
</svelte:head>

<main>
	<section class="hero">
		<p class="eyebrow">Scaffold Only</p>
		<h1>Chess TT Codex</h1>
		<p class="lede">
			Local-first tabletop chess for a large shared touchscreen, with the engineering workflow
			locked in before gameplay code begins.
		</p>
	</section>

	<section class="panel">
		<h2>Repository Policy</h2>
		<ul>
			{#each principles as principle}
				<li>{principle}</li>
			{/each}
		</ul>
	</section>
</main>

<style>
	:global(body) {
		margin: 0;
		font-family:
			'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif;
		background:
			radial-gradient(circle at top, rgba(245, 198, 94, 0.22), transparent 32rem),
			linear-gradient(180deg, #10141a 0%, #18212b 100%);
		color: #f5f1e6;
	}

	main {
		min-height: 100vh;
		padding: 2rem 1.25rem 3rem;
		display: grid;
		gap: 1.25rem;
		align-content: start;
	}

	.hero,
	.panel {
		max-width: 42rem;
		margin: 0 auto;
		width: 100%;
		border: 1px solid rgba(245, 241, 230, 0.18);
		border-radius: 1.25rem;
		background: rgba(8, 12, 18, 0.72);
		backdrop-filter: blur(10px);
		box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.25);
	}

	.hero {
		padding: 1.5rem;
	}

	.panel {
		padding: 1.25rem 1.5rem;
	}

	.eyebrow {
		margin: 0 0 0.5rem;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		font-size: 0.76rem;
		color: #f5c65e;
	}

	h1,
	h2 {
		margin: 0;
		font-weight: 700;
	}

	h1 {
		font-size: clamp(2.3rem, 8vw, 4.5rem);
		line-height: 0.95;
	}

	h2 {
		font-size: 1.2rem;
		margin-bottom: 0.85rem;
	}

	.lede {
		margin: 1rem 0 0;
		font-size: 1.05rem;
		line-height: 1.55;
		max-width: 34rem;
		color: rgba(245, 241, 230, 0.88);
	}

	ul {
		margin: 0;
		padding-left: 1.1rem;
		display: grid;
		gap: 0.55rem;
	}

	li {
		line-height: 1.45;
		color: rgba(245, 241, 230, 0.9);
	}

	@media (min-width: 700px) {
		main {
			padding-top: 3rem;
		}

		.hero {
			padding: 2rem;
		}
	}
</style>
