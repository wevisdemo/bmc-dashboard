<script lang="ts">
	import '@wevisdemo/ui/styles/footer.css';
	import '@wevisdemo/ui/styles/navbar.css';
	import WvFooter from '@wevisdemo/ui/svelte/footer.svelte';
	import WvNavbar from '@wevisdemo/ui/svelte/navbar.svelte';
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.png" />
	<title>BMC Dashboard</title>
</svelte:head>

<div class="flex h-full min-h-lvh flex-col">
	<WvNavbar title="BMC Dashboard" />
	<main class="wv-ibmplexlooped flex-1">
		{@render children()}
	</main>
	<WvFooter />
</div>
