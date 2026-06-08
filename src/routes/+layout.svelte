<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/stores';
	import WvFooter from '@wevisdemo/ui/svelte/footer.svelte';
	import WvNavbar from '@wevisdemo/ui/svelte/navbar.svelte';
	import './layout.css';

	let { children } = $props();

	const navLinks = [
		{ href: '/', label: 'สำรวจเรื่องที่ ส.ก. พูดคุย' },
		{ href: '/duties', label: 'ส.ก. ทำอะไรได้บ้าง' },
		{ href: '/about', label: 'เกี่ยวกับโครงการ' }
	] as const;

	let pathname = $derived($page.url.pathname);
</script>

<svelte:head>
	<link rel="icon" href="/favicon.png" />
	<title>BMC Dashboard</title>
</svelte:head>

<div class="flex h-full min-h-lvh flex-col">
	<WvNavbar homeHref="/" animated dark>
		<div class="flex flex-col items-center justify-center md:flex-row md:gap-5">
			{#each navLinks as { href, label } (href)}
				<a
					href={resolve(href)}
					class="wv-b7 p-3 md:p-0 {pathname === href ? 'underline' : 'hover:underline'}"
				>
					{label}
				</a>
			{/each}
		</div>
	</WvNavbar>
	<main class="wv-ibmplexlooped flex-1">
		{@render children()}
	</main>
	<WvFooter dark />
</div>
