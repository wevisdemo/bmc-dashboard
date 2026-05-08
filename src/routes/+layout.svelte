<script lang="ts">
	import WvNavbar from '@wevisdemo/ui/svelte/navbar.svelte';
	import WvFooter from '@wevisdemo/ui/svelte/footer.svelte';

	import './layout.css';
	import '@wevisdemo/ui/styles/navbar.css';
	import '@wevisdemo/ui/styles/footer.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.png" />
	<title>BMC Dashboard</title>
</svelte:head>

<div class="wv-ibmplex flex h-full min-h-lvh flex-col">
	<WvNavbar title="BMC Dashboard" />
	<main class="flex-1">
		{@render children()}
	</main>
	<WvFooter />
</div>
