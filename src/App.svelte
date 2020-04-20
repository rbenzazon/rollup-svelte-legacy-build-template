<script>
	export let name;
	let loaded = false;
	let component;
	async function onButtonClick(e){

		console.log("onButtonClick");
		const pkg = await import('./Component.svelte');
		component = pkg.default;
		loaded = true;
	}
</script>

<main>
	<h1>Hello {name}!</h1>
	<button on:click={onButtonClick}>load component</button>
	{#if loaded}
		<svelte:component
			this={component}
		/>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>