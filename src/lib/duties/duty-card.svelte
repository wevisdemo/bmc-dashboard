<script lang="ts">
	import { resolvePath } from '$lib/paths';
	import type { Snippet } from 'svelte';

	let {
		imageUrl,
		title,
		children,
		links = []
	}: {
		imageUrl: string;
		title: string;
		children: Snippet;
		links?: { path: string; label: string }[];
	} = $props();
</script>

<div
	class="flex flex-1 flex-col items-center gap-6 rounded-xl bg-white p-4 pt-6 md:flex-row md:gap-8 md:p-8"
>
	<img
		src={resolvePath(imageUrl)}
		alt=""
		class="size-32 shrink-0 rounded-full bg-neutral-100 object-cover md:size-48"
	/>
	<div class="flex flex-1 flex-col gap-2 md:gap-3">
		<h3 class="wv-h9 font-bold text-neutral-900">{title}</h3>
		<div class="wv-b5">
			{@render children()}
		</div>
		{#if links.length > 0}
			<ul class="flex flex-col gap-1">
				{#each links as { path, label } (path)}
					<li>
						<a href={resolvePath(path)} class="wv-b6 text-blue-600 underline hover:text-blue-800">
							{label}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
