<script lang="ts">
	import { page } from '$app/state';
	import WvSharer from '@wevisdemo/ui/svelte/sharer.svelte';
	import { ArrowUpRight } from 'carbon-icons-svelte';
	import ButtonLink from '$lib/inputs/button-link.svelte';
	import { resolvePath } from '$lib/paths';

	let shareUrl = $derived(`${page.url.origin}${page.url.pathname}`);

	interface PageLink {
		path: string;
		text: string;
		buttonLabel: string;
	}

	interface Props {
		pages: PageLink[];
	}

	let { pages }: Props = $props();
</script>

<div class="flex flex-col items-center gap-10 px-3 py-10 md:gap-16 md:px-4 md:py-16">
	<div class="flex flex-col items-center gap-2">
		<span class="wv-b5 font-bold">แชร์หน้านี้</span>
		<WvSharer url={shareUrl} hideLabel outline />
	</div>

	<div class="h-px w-full bg-neutral-300"></div>

	<div class="flex w-full max-w-4xl flex-col justify-between md:flex-row">
		{#each pages as { path, text, buttonLabel } (path)}
			<div class="flex flex-1 flex-col items-center justify-between gap-2 p-4 md:gap-4">
				<p class="wv-b5 max-w-sm text-center">{text}</p>
				<ButtonLink variant="outlined" href={resolvePath(path)}
					>{buttonLabel} <ArrowUpRight class="ml-1" /></ButtonLink
				>
			</div>
		{/each}
	</div>
</div>
