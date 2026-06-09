<script lang="ts">
	import { ArrowDown } from 'carbon-icons-svelte';
	import CaretUp from 'carbon-icons-svelte/lib/CaretUp.svelte';
	import SettingsAdjust from 'carbon-icons-svelte/lib/SettingsAdjust.svelte';
	import WarningAlt from 'carbon-icons-svelte/lib/WarningAlt.svelte';
	import { useSearchParams } from 'runed/kit';
	import { slide } from 'svelte/transition';
	import { z } from 'zod';
	import { AdditionalDistrictOption, EventGroup } from '$lib/constants.js';
	import DistrictOverview from '$lib/explore/district-overview.svelte';
	import FilterChipsBar from '$lib/explore/filter-chips-bar.svelte';
	import FilterOptions from '$lib/explore/filter-options.svelte';
	import TabList from '$lib/explore/tab-list.svelte';
	import TopicOverview from '$lib/explore/topic-overview.svelte';
	import ButtonLink from '$lib/inputs/button-link.svelte';
	import RemarkMessage from '$lib/remark-message.svelte';
	import Hero from '$lib/sections/hero.svelte';
	import PageFooter from '$lib/sections/page-footer.svelte';
	import SeoHead from '$lib/seo-head.svelte';
	import { allSecondaryTopics, sortSecondaryTopics } from '$lib/sheets/topic.js';

	const DEFAULT_DISTRICT = AdditionalDistrictOption.ALL;

	let { data } = $props();

	const schema = z.object({
		district: z.string().default(DEFAULT_DISTRICT),
		topics: z
			.array(z.string())
			.transform((arr) => sortSecondaryTopics(arr))
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
					event.districts?.some((d) => d === params.district)) &&
				event.topics?.some((t) => params.topics.length === 0 || params.topics.includes(t))
		)
	);

	let eventInDistrictCount = $derived(
		filteredEvents.filter((e) =>
			e.districts?.some((d) => d !== AdditionalDistrictOption.NotSpecified)
		).length
	);

	function resetPageNumber() {
		if (params.page !== 1) {
			params.page = 1;
		}
	}
</script>

<SeoHead />

<Hero>
	<img class="max-w-40 md:max-w-64" src="/images/logo.webp" alt="WeVis Election" />
	<div class="flex flex-col items-center gap-1">
		<h1 class="wv-h4 wv-kondolar text-center font-bold">เลือกตั้ง กทม. ไม่ได้มีแค่ผู้ว่าฯ</h1>
		<p class="wv-b3 wv-kondolar font-bold">ส.ก. เสนออะไรในสภา ให้ข้อมูลช่วยเล่า</p>
		<p class="wv-b6 mt-2 text-center text-neutral-500">
			*ข้อมูลของ ส.ก. ชุดที่ 13 (6 มิ.ย. 65 - 21 พ.ค. 69) ข้อมูล ณ วันที่ 22 พ.ค. 69
		</p>
	</div>
	<div class="grid w-full max-w-96 grid-cols-1 gap-1 md:grid-cols-2 md:gap-3">
		<ButtonLink href="#explore" className="md:col-span-2"
			>สำรวจเรื่องที่ ส.ก. เสนอในสภา <ArrowDown class="ml-2" /></ButtonLink
		>
		<ButtonLink href="/duties" variant="outlined">ส.ก. ทำอะไรได้บ้าง</ButtonLink>
		<ButtonLink href="/articles" variant="outlined">อ่านบทความ</ButtonLink>
	</div>
</Hero>

<div
	id="explore"
	class="mx-auto flex max-w-7xl flex-col gap-4 p-3 pt-8 pb-0 md:gap-6 md:px-4 md:pt-18"
>
	<div class="flex max-w-3xl flex-col items-center gap-3 self-center md:gap-4">
		<p class="wv-h6 wv-kondolar text-center font-bold">
			ส.ก. ชุดที่ 13 พูดคุย เสนอ และศึกษาอะไรในสภา กทม.
		</p>
		<RemarkMessage>
			{#snippet icon(props)}
				<WarningAlt {...props} />
			{/snippet}
			1 รายการ สามารถเกี่ยวข้องได้ <strong>มากกว่า 1 ประเด็น</strong> และ
			<strong>มากกว่า 1 พื้นที่</strong>
			หากประเด็นหรือพื้นที่ที่คุณเลือกมีรายการที่เกี่ยวข้องกับประเด็นหรือพื้นที่อื่น ๆ ด้วย
			<strong>ตัวกรองของประเด็นหรือพื้นที่อื่น ๆ นั้นจะถูกแสดงโดยอัตโนมัติ</strong>
		</RemarkMessage>
		<a href="/about" class="wv-b6 text-blue-600 underline hover:text-blue-800">
			อ่านที่มาและข้อจำกัดข้อมูล
		</a>
	</div>

	<div class="flex flex-col md:gap-4 lg:flex-row-reverse">
		<div class="flex min-w-0 flex-1 flex-col gap-3">
			<div class="hidden flex-col gap-2 lg:flex">
				<p class="wv-b6">รายการทั้งหมด <strong>{filteredEvents.length}</strong></p>
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
					<div>
						<h3 class="wv-b3 wv-kondolar font-bold">แบ่งตามพื้นที่</h3>
						<p class="wv-b6">
							<span class="text-lime-700">(ระบุเขตได้ <strong>{eventInDistrictCount}</strong></span
							>,
							<span class="text-neutral-500"
								>ไม่ระบุเขต <strong>{filteredEvents.length - eventInDistrictCount}</strong>)</span
							>
						</p>
					</div>
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
			class="sticky inset-x-0 bottom-0 z-20 -mx-3 flex max-h-dvh shrink-0 flex-col border-y border-neutral-400 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.07)] lg:relative lg:m-0 lg:max-h-none lg:w-72 lg:border-none lg:p-0 lg:shadow-none"
		>
			<div class="flex flex-col lg:hidden">
				<button
					class="flex flex-row items-center gap-2 p-2"
					onclick={() => (isMobileFilterExpanded = !isMobileFilterExpanded)}
				>
					<SettingsAdjust />
					<span class="wv-b6 flex-1 text-left">คัดกรองเขตพื้นที่และประเด็น</span>
					<CaretUp
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
						<p class="wv-b6">รายการทั้งหมด <strong>{filteredEvents.length}</strong></p>
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
				class="sticky top-4 flex transition-[max-height] duration-250 ease-in-out md:overflow-y-visible lg:h-[calc(100dvh-1rem)] lg:max-h-none {isMobileFilterExpanded
					? 'max-h-lvh overflow-y-auto'
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

<PageFooter
	pages={[
		{
			path: '/duties',
			text: 'ส.ก. เป็นใคร ? ทำอะไรได้บ้าง ? มาแวะทำความเข้าใจงานต่าง ๆ ของ ส.ก. กันสักหน่อย',
			buttonLabel: 'ส.ก. ทำอะไรได้บ้าง'
		},
		{
			path: '/articles',
			text: 'อ่านบทความเกี่ยวกับ ส.ก. และเนื้อหาอื่น ๆ ที่เกี่ยวข้อง',
			buttonLabel: 'อ่านบทความ'
		}
	]}
/>
