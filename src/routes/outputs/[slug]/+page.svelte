<script lang="ts">
	import EventCard from '$lib/event/event-card.svelte';
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

<div class="mx-auto flex max-w-4xl flex-col gap-6 p-3 md:gap-8 md:px-5 md:py-8">
	<h2 class="wv-h9 wv-kondolar border-b border-neutral-400 pb-2 font-bold text-neutral-700">
		บทบาทในสภาของ สก. ที่เกี่ยวข้องกับเรื่องนี้
	</h2>

	{#each data.groupedEvents as [group, events] (group)}
		<section class="flex flex-col gap-3">
			<h3 class="wv-h8 wv-kondolar font-bold text-neutral-700">{group}</h3>
			<div class="flex flex-col gap-3">
				{#each events as event (event.id)}
					<EventCard
						title={event.title}
						districts={event.districts}
						topics={event.topics}
						proposer={event.proposer}
						dateDisplay={event.dateDisplay}
						status={event.status}
						group={event.group}
					/>
				{/each}
			</div>
		</section>
	{/each}
</div>
