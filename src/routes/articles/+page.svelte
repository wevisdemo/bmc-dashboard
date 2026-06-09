<script lang="ts">
	import ArticleCard from '$lib/articles/article-card.svelte';
	import Hero from '$lib/sections/hero.svelte';
	import SeoHead from '$lib/seo-head.svelte';
	import { SectionLabel } from '$lib/sheets/article';

	let { data } = $props();
</script>

<SeoHead title="อ่านบทความเกี่ยวกับ ส.ก." />

<Hero>
	<div class="flex flex-col gap-2">
		<h1 class="wv-h4 wv-kondolar text-center font-bold">อ่านบทความเกี่ยวกับ ส.ก.</h1>
		<p class="wv-b3 text-center font-bold">และชิ้นงานอื่น ๆ ที่เกี่ยวข้อง</p>
	</div>
</Hero>

<div class="mx-auto flex max-w-5xl flex-col gap-10 px-3 py-8 md:gap-16 md:py-12">
	{#each data.sections as { section, articles }}
		<section>
			<h2 class="wv-h5 wv-kondolar mb-3 border-b border-neutral-300 font-bold md:mb-6">
				{SectionLabel[section]}
			</h2>
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
				{#each articles as article}
					<ArticleCard {article} />
				{/each}
			</div>
		</section>
	{/each}
</div>
