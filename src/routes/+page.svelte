<script lang="ts">
	import { AdditionalDistrictOption } from '$lib/constants.js';
	import DistrictOverview from '$lib/explore/district-overview.svelte';
	import FilterOptionsPanel from '$lib/explore/filter-options-panel.svelte';
	import TabList from '$lib/explore/tab-list.svelte';
	import TopicOverview from '$lib/explore/topic-overview.svelte';

	let { data } = $props();

	let selectedDistrict = $state(AdditionalDistrictOption.BangkokOverall);
	let selectedSecondaryTopics = $state.raw<string[]>(initTopics());

	let filteredEvents = $derived(
		data.events.filter(
			(event) =>
				event.district === selectedDistrict &&
				event.topics.some((t) => selectedSecondaryTopics.includes(t))
		)
	);

	function initTopics() {
		return data.topicGroups.flatMap((g) => g.secondaries);
	}
</script>

<div class="mx-auto flex max-w-6xl flex-row gap-4 p-4">
	<FilterOptionsPanel
		districts={data.districts}
		topicGroups={data.topicGroups}
		totalEvents={filteredEvents.length}
		bind:selectedDistrict
		bind:selectedSecondaryTopics
	/>
	<div class="flex flex-1 flex-col gap-3">
		<div class="grid grid-cols-2 rounded-lg border border-gray-300">
			<div class="flex flex-col gap-6 border-r border-gray-300 px-4 py-3">
				<h3 class="wv-b3 wv-kondolar font-bold">แบ่งตามเขต</h3>
				<DistrictOverview events={filteredEvents} bind:selectedDistrict />
			</div>
			<div class="wv-b6 flex flex-col gap-6 px-4 py-3">
				<div class="flex flex-col gap-1">
					<h3 class="wv-b3 wv-kondolar font-bold">การกระจายตามประเด็น</h3>
					<p class="text-gray-500">*1 หัวข้อ เกี่ยวข้องได้มากกว่า 1 ประเด็น</p>
					<p class="font-bold">• {selectedDistrict}</p>
				</div>
				<TopicOverview
					events={filteredEvents}
					topicGroups={data.topicGroups}
					bind:selectedSecondaryTopics
				/>
			</div>
		</div>
		<TabList
			events={filteredEvents}
			resetPageWatchList={[selectedDistrict, $state.snapshot(selectedSecondaryTopics)]}
		/>
	</div>
</div>
