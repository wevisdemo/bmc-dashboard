<script lang="ts">
	import { ArrowUpRight } from 'carbon-icons-svelte';
	import type { Article } from '$lib/sheets/article';

	let { article }: { article: Omit<Article, 'section'> } = $props();
</script>

<a
	href={article.link}
	class="flex flex-col gap-3 rounded-xl border-2 border-neutral-200 bg-neutral-100 p-3 hover:border-neutral-300 md:gap-4 md:p-4"
>
	<img src={article.image} alt="" class="h-48 w-full object-cover" />

	<h3 class="wv-h9 wv-kondolar flex-1 font-bold text-neutral-900">
		{article.title}
	</h3>

	<div class="h-px bg-neutral-300"></div>

	<div class="flex items-center justify-between text-neutral-600">
		<span class="wv-b6">{article.distributors.join(' | ')}</span>
		<ArrowUpRight />
	</div>
</a>
