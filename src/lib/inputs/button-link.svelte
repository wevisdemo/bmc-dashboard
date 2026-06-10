<script lang="ts">
	import { resolvePath } from '$lib/paths';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributeAnchorTarget } from 'svelte/elements';

	interface Props {
		href: string;
		children: Snippet;
		target?: HTMLAttributeAnchorTarget;
		variant?: 'filled' | 'outlined';
		className?: string;
	}

	let { href: rawHref, children, target, variant = 'filled', className = '' }: Props = $props();

	const href = $derived(rawHref.startsWith('/') ? resolvePath(rawHref) : rawHref);
</script>

<a
	{href}
	{target}
	class="wv-b6 flex flex-row items-center justify-center gap-1 rounded-lg border border-black px-4 py-2 font-bold md:py-2.5 {variant ===
	'filled'
		? 'bg-black text-white hover:bg-neutral-700'
		: 'bg-transparent text-black hover:bg-neutral-100'} {className}">{@render children()}</a
>
