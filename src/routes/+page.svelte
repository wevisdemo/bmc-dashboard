<script lang="ts">
	import { CaretUpIcon, SlidersIcon, WarningIcon } from 'phosphor-svelte';
	import { useSearchParams } from 'runed/kit';
	import { untrack } from 'svelte';
	import { slide } from 'svelte/transition';
	import { z } from 'zod';
	import { AdditionalDistrictOption, EventGroup } from '$lib/constants.js';
	import CountStats from '$lib/explore/count-stats.svelte';
	import DistrictOverview from '$lib/explore/district-overview.svelte';
	import FilterChipsBar from '$lib/explore/filter-chips-bar.svelte';
	import FilterOptions from '$lib/explore/filter-options.svelte';
	import TabList from '$lib/explore/tab-list.svelte';
	import TopicOverview from '$lib/explore/topic-overview.svelte';

	const DEFAULT_DISTRICT = AdditionalDistrictOption.ALL;

	let { data } = $props();

	const allSecondaryTopics = untrack(() => data.topicGroups.flatMap((g) => g.secondaries));

	const schema = z.object({
		district: z.string().default(DEFAULT_DISTRICT),
		topics: z
			.array(z.string())
			.transform((arr) =>
				arr.toSorted((a, z) => allSecondaryTopics.indexOf(a) - allSecondaryTopics.indexOf(z))
			)
			.default(allSecondaryTopics),
		tab: z.string().default(EventGroup.Subject),
		page: z.number().int().positive().default(1)
	});

	const params = useSearchParams(schema, {
		showDefaults: false,
		pushHistory: false,
		noScroll: true,
		debounce: 100
	});

	let isMobileFilterExpanded = $state(false);

	let filteredEvents = $derived(
		data.events.filter(
			(event) =>
				(params.district === AdditionalDistrictOption.ALL ||
					event.districts.some((d) => d === params.district)) &&
				event.topics.some((t) => params.topics.length === 0 || params.topics.includes(t))
		)
	);

	function resetPageNumber() {
		if (params.page !== 1) {
			params.page = 1;
		}
	}
</script>

<div class="mx-auto flex max-w-7xl flex-col gap-4 p-3 pb-0 md:gap-6 md:px-4 md:py-12">
	<h1 class="wv-h4 wv-kondolar my-4 text-center font-bold md:my-8">รู้ไหม สก. ทำอะไรได้บ้าง ?</h1>
	<p class="wv-h6 wv-kondolar text-center font-bold">
		สก. พูดคุย ศึกษา และเสนอเรื่องอะไรบ้างในปี 2565-2568
	</p>
	<div class="flex flex-row gap-2 rounded-lg bg-neutral-200 p-2">
		<WarningIcon class="mt-0.5 size-4" />
		<p class="wv-b6 flex-1">
			1 รายการ สามารถเกี่ยวข้องได้ <strong>มากกว่า 1 ประเด็น</strong> และ
			<strong>มากกว่า 1 เขตพื้นที่</strong>
			หากประเด็นหรือเขตพื้นที่ที่คุณเลือกมีรายการที่เกี่ยวข้องกับประเด็นหรือเขตพื้นที่อื่น ๆ ด้วย
			<strong>ตัวกรองของประเด็นหรือเขตพื้นที่อื่น ๆ นั้นจะถูกแสดงโดยอัตโนมัติ</strong>
		</p>
	</div>
	<div class="flex flex-col md:gap-4 lg:flex-row-reverse">
		<div class="flex min-w-0 flex-col gap-3">
			<div class="hidden flex-col gap-2 lg:flex">
				<CountStats events={filteredEvents} />
				<FilterChipsBar
					defaultDistrict={DEFAULT_DISTRICT}
					{allSecondaryTopics}
					bind:selectedDistrict={params.district}
					bind:selectedSecondaryTopics={params.topics}
					ondistrictchange={resetPageNumber}
					ontopicschange={resetPageNumber}
				/>
			</div>
			<div class="grid grid-cols-1 rounded-lg border border-gray-300 sm:grid-cols-2">
				<div
					class="flex flex-col gap-3 border-b border-gray-300 p-3 md:gap-6 md:border-r md:border-b-0 md:px-4"
				>
					<h3 class="wv-b3 wv-kondolar font-bold">แบ่งตามเขต</h3>
					<DistrictOverview
						events={filteredEvents}
						bind:selectedDistrict={params.district}
						ondistrictchange={resetPageNumber}
					/>
				</div>
				<div class="wv-b6 flex flex-col gap-3 p-3 md:px-4">
					<div class="flex flex-col gap-2">
						<h3 class="wv-b3 wv-kondolar font-bold">การกระจายตามประเด็น</h3>
						<p class="font-bold">• {params.district}</p>
					</div>
					<TopicOverview
						events={filteredEvents}
						{allSecondaryTopics}
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

		<div
			class="sticky inset-x-0 bottom-0 z-20 -mx-3 flex max-h-dvh shrink-0 flex-col border-t border-neutral-400 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.07)] lg:relative lg:m-0 lg:max-h-none lg:w-72 lg:border-none lg:p-0 lg:shadow-none"
		>
			<div class="flex flex-col lg:hidden">
				<button
					class="flex flex-row items-center gap-2 p-2"
					onclick={() => (isMobileFilterExpanded = !isMobileFilterExpanded)}
				>
					<SlidersIcon />
					<span class="wv-b6 flex-1 text-left">คัดกรองเขตพื้นที่และประเด็น</span>
					<CaretUpIcon
						class="transition-transform duration-200 {isMobileFilterExpanded
							? 'rotate-180'
							: 'rotate-0'}"
					/>
				</button>
				<div class="mx-2 h-0 border-t border-neutral-300"></div>
				{#if !isMobileFilterExpanded}
					<div
						transition:slide={{ axis: 'y', delay: 50, duration: 100 }}
						class="flex flex-1 flex-col gap-2 overflow-hidden p-2"
					>
						<CountStats events={filteredEvents} />
						<FilterChipsBar
							class="border-t border-neutral-300 pt-2"
							defaultDistrict={DEFAULT_DISTRICT}
							{allSecondaryTopics}
							bind:selectedDistrict={params.district}
							bind:selectedSecondaryTopics={params.topics}
							ondistrictchange={resetPageNumber}
							ontopicschange={resetPageNumber}
						/>
					</div>
				{/if}
			</div>

			<FilterOptions
				class="px-2 transition-[max-height] duration-250 ease-in-out lg:flex lg:max-h-none lg:p-0 {isMobileFilterExpanded
					? 'max-h-lvh overflow-y-auto py-2'
					: 'max-h-0 overflow-y-hidden'}"
				districts={data.districts}
				topicGroups={data.topicGroups}
				bind:selectedDistrict={params.district}
				bind:selectedSecondaryTopics={params.topics}
				ondistrictchange={resetPageNumber}
				ontopicschange={resetPageNumber}
			/>
		</div>
	</div>
</div>
