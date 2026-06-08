<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributeAnchorTarget } from 'svelte/elements';

	interface Props {
		href: string;
		children: Snippet;
		target?: HTMLAttributeAnchorTarget;
		variant?: 'filled' | 'outlined';
		className?: string;
	}

	let { href, children, target, variant = 'filled', className = '' }: Props = $props();
</script>

<a
	{href}
	{target}
	class="flex flex-row items-center justify-center gap-1 rounded-lg border border-black p-2 font-bold md:px-4 md:py-3 {variant ===
	'filled'
		? 'bg-black text-white hover:bg-neutral-700'
		: 'bg-transparent text-black hover:bg-neutral-100'} {className}">{@render children()}</a
>
