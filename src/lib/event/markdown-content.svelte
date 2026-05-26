<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';

	let { source }: { source: string } = $props();
</script>

<div class="flex flex-col gap-2 md:gap-3">
	<SvelteMarkdown {source}>
		{#snippet list({ ordered, children })}
			<svelte:element
				this={ordered ? 'ol' : 'ul'}
				class="ml-6 {ordered ? 'list-decimal' : 'list-disc'}">{@render children?.()}</svelte:element
			>
		{/snippet}
	</SvelteMarkdown>
</div>
