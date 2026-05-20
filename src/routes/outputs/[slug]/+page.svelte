<script lang="ts">
	import DistrictTag from '$lib/tags/district-tag.svelte';
	import TopicTag from '$lib/tags/topic-tag.svelte';

	let { data } = $props();
</script>

<div class="bg-sky-100 p-3 md:px-5 md:py-8">
	<div class="mx-auto flex w-full max-w-5xl flex-col gap-3 md:gap-4">
		<div class="flex flex-wrap items-center gap-2">
			{#each data.topics as topic (topic.secondary)}
				<TopicTag topic={topic.secondary} />
			{/each}
			{#each data.districts as district (district)}
				<DistrictTag {district} />
			{/each}
		</div>
		<h1 class="wv-h6 wv-kondolar font-bold">
			{data.output}
		</h1>
	</div>
</div>

<div class="mx-auto max-w-4xl p-3 md:px-5 md:py-8">
	<p class="whitespace-pre-wrap">{JSON.stringify(data.events, null, 2)}</p>
</div>
