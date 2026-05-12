<script lang="ts">
	import { useSearchParams } from 'runed/kit';
	import { untrack } from 'svelte';
	import { z } from 'zod';
	import { AdditionalDistrictOption, EntityTabGroup } from '$lib/constants.js';
	import DistrictOverview from '$lib/explore/district-overview.svelte';
	import FilterOptionsPanel from '$lib/explore/filter-options-panel.svelte';
	import TabList from '$lib/explore/tab-list.svelte';
	import TopicOverview from '$lib/explore/topic-overview.svelte';

	let { data } = $props();

	const allTopics = untrack(() => data.topicGroups.flatMap((g) => g.secondaries).sort());

	const schema = z.object({
		district: z.string().default(AdditionalDistrictOption.ALL),
		topics: z
			.array(z.string())
			.transform((arr) => arr.toSorted())
			.default(allTopics),
		tab: z.string().default(EntityTabGroup.Subject),
		page: z.number().int().positive().default(1)
	});

	const params = useSearchParams(schema, {
		showDefaults: false,
		pushHistory: false,
		noScroll: true
	});

	let filteredEvents = $derived(
		data.events.filter(
			(event) =>
				(params.district === AdditionalDistrictOption.ALL || event.district === params.district) &&
				event.topics.some((t) => params.topics.length === 0 || params.topics.includes(t))
		)
	);

	function resetPageNumber() {
		if (params.page !== 1) {
			params.page = 1;
		}
	}
</script>

<div class="mx-auto flex max-w-6xl flex-row gap-4 p-4">
	<FilterOptionsPanel
		districts={data.districts}
		topicGroups={data.topicGroups}
		totalEvents={filteredEvents.length}
		bind:selectedDistrict={params.district}
		bind:selectedSecondaryTopics={params.topics}
		ondistrictchange={resetPageNumber}
		ontopicschange={resetPageNumber}
	/>
	<div class="flex flex-1 flex-col gap-3">
		<div class="grid grid-cols-2 rounded-lg border border-gray-300">
			<div class="flex flex-col gap-6 border-r border-gray-300 px-4 py-3">
				<h3 class="wv-b3 wv-kondolar font-bold">แบ่งตามเขต</h3>
				<DistrictOverview
					events={filteredEvents}
					bind:selectedDistrict={params.district}
					ondistrictchange={resetPageNumber}
				/>
			</div>
			<div class="wv-b6 flex flex-col gap-6 px-4 py-3">
				<div class="flex flex-col gap-1">
					<h3 class="wv-b3 wv-kondolar font-bold">การกระจายตามประเด็น</h3>
					<p class="text-gray-500">*1 หัวข้อ เกี่ยวข้องได้มากกว่า 1 ประเด็น</p>
					<p class="font-bold">• {params.district}</p>
				</div>
				<TopicOverview
					events={filteredEvents}
					topicGroups={data.topicGroups}
					bind:selectedSecondaryTopics={params.topics}
					ontopicschange={resetPageNumber}
				/>
			</div>
		</div>
		<TabList
			events={filteredEvents}
			bind:tab={params.tab}
			bind:page={params.page}
			ontabchange={resetPageNumber}
		/>
	</div>
</div>
