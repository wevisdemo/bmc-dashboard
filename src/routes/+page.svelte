<script lang="ts">
	import { watch } from 'runed';
	import FilterOptionsPanel from '$lib/explore/filter-options-panel.svelte';
	import Overview from '$lib/explore/overview.svelte';
	import EventCard from '$lib/explore/event-card.svelte';
	import Pagination from '$lib/inputs/pagination.svelte';

	const PER_PAGE = 10;

	let { data } = $props();

	let selectedDistrict = $state('ภาพรวมกรุงเทพมหานคร');
	let selectedSecondaryTopics = $state.raw<string[]>(initTopics());
	let currentPage = $state(1);

	let filteredEvents = $derived(
		data.events.filter(
			(event) =>
				event.district === selectedDistrict &&
				event.topics.some((t) => selectedSecondaryTopics.includes(t))
		)
	);

	let paginatedEvents = $derived(
		filteredEvents.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)
	);

	let mainTopicCounts = $derived(
		Object.entries(
			filteredEvents
				.flatMap((e) => e.topics)
				.reduce(
					(acc, t) => {
						const main = data.secondaryToMain.get(t);
						if (main) acc[main] = (acc[main] ?? 0) + 1;
						return acc;
					},
					{} as Record<string, number>
				)
		).map(([topic, count]) => ({ topic, count }))
	);

	watch.pre(
		[() => selectedDistrict, () => $state.snapshot(selectedSecondaryTopics)],
		() => {
			currentPage = 1;
		},
		{ lazy: true }
	);

	function initTopics() {
		return data.topicGroups.flatMap((g) => g.secondaries);
	}
</script>

<div class="mx-auto flex max-w-5xl flex-row gap-4 p-4">
	<FilterOptionsPanel
		districts={data.districts}
		topicGroups={data.topicGroups}
		totalEvents={filteredEvents.length}
		bind:selectedDistrict
		bind:selectedSecondaryTopics
	/>
	<div class="flex flex-1 flex-col gap-3">
		<Overview {mainTopicCounts} {selectedDistrict} />
		<h2 class="wv-h6 wv-kondolar font-bold">กระทู้</h2>
		{#each paginatedEvents as event (event.id)}
			<EventCard {...event} />
		{/each}
		<Pagination count={filteredEvents.length} perPage={PER_PAGE} bind:page={currentPage} />
	</div>
</div>
