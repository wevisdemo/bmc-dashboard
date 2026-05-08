<script lang="ts">
	import FilterOptionsPanel from '$lib/explore/filter-options-panel.svelte';
	import EventCard from '$lib/explore/event-card.svelte';

	let { data } = $props();

	let selectedDistrict = $state('ภาพรวมกรุงเทพมหานคร');
	let selectedSecondaryTopics = $state.raw<string[]>(initTopics());

	function initTopics() {
		return data.topicGroups.flatMap((g) => g.secondaries);
	}

	let filteredEvents = $derived(
		data.events.filter(
			(event) =>
				event.district === selectedDistrict &&
				event.topics.some((t) => selectedSecondaryTopics.includes(t))
		)
	);
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
		<h2 class="wv-h6 wv-kondolar font-bold">กระทู้</h2>
		{#each filteredEvents as event (event.id)}
			<EventCard {...event} />
		{/each}
	</div>
</div>
