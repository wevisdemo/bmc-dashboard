<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		icon,
		children,
		class: className = ''
	}: {
		icon: Snippet<[Record<string, string>]>;
		children: Snippet;
		class?: string;
	} = $props();
</script>

<div class="flex w-full flex-row gap-2 rounded-lg bg-neutral-200 p-2 {className}">
	{@render icon({ class: 'mt-0.5 size-4' })}
	<div class="wv-b6 flex-1">
		{@render children()}
	</div>
</div>
