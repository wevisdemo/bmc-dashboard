<script lang="ts">
	import Document from 'carbon-icons-svelte/lib/Document.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		children: Snippet;
	}

	let { href, children }: Props = $props();
</script>

<a
	{href}
	target="blank"
	class="flex flex-row items-center gap-1 rounded-lg bg-black p-2 font-bold text-white hover:bg-neutral-700 md:px-4 md:py-3"
	><Document />{@render children()}</a
>
