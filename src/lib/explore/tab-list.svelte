<script lang="ts">
	import { watch } from 'runed';
	import { EntityTabGroup } from '$lib/constants';
	import Pagination from '$lib/inputs/pagination.svelte';
	import { Tabs } from 'bits-ui';
	import type { Event } from '../../routes/+page.server';
	import EventCard from './event-card.svelte';
	import TabContentDescription from './tab-content-description.svelte';

	const PER_PAGE = 10;

	interface Props {
		events: Event[];
		resetPageWatchList: unknown;
	}

	let { events, resetPageWatchList }: Props = $props();

	let selectedGroup = $state(EntityTabGroup.Subject);
	let currentPage = $state(1);
	let container = $state<HTMLDivElement>();

	let eventsByGroup = $derived(Object.groupBy(events, (e) => e.group));

	let displayEvents = $derived(
		eventsByGroup[selectedGroup]!.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)
	);

	watch.pre(
		[() => resetPageWatchList, () => selectedGroup],
		() => {
			currentPage = 1;
		},
		{ lazy: true }
	);

	watch.pre(
		() => currentPage,
		() => {
			container?.scrollIntoView({ behavior: 'smooth' });
		},
		{ lazy: true }
	);

	const tabs = Object.values(EntityTabGroup);
</script>

<div class="pt-4" bind:this={container}>
	<Tabs.Root bind:value={selectedGroup}>
		<Tabs.List class="flex flex-row gap-2">
			{#each tabs as value (value)}
				<Tabs.Trigger
					{value}
					class="p-3 flex flex-row items-center gap-1 rounded-t-lg bg-neutral-100 data-[state=active]:bg-neutral-300"
				>
					<h4 class="wv-h9 font-bold">{value}</h4>
					<span class="">[{eventsByGroup[value]!.length}]</span>
				</Tabs.Trigger>
			{/each}
		</Tabs.List>
		<TabContentDescription value={EntityTabGroup.Subject}>
			สก. จะตั้งกระทู้ถาม เมื่อต้องการ <strong>ผลักดัน</strong> หรือ
			<strong>ติดตามความคืบหน้า</strong>
			จากฝ่ายบริหาร เกี่ยวกับ<strong>ประเด็นของเขตใดเขตหนึ่ง</strong>
		</TabContentDescription>
		<TabContentDescription value={EntityTabGroup.Motion}>
			สก. จะตั้งญัตติ เมื่อต้องการเสนอประเด็นหนึ่ง ๆ เข้าสู่สภา โดยทั่วไปญัตติจะเกี่ยวกับ<strong
				>ประเด็นที่ครอบคลุมทั้ง กทม.</strong
			>
		</TabContentDescription>
		<TabContentDescription value={EntityTabGroup.CommitteeStudy}>
			คณะกรรมการสามัญและวิสามัญจะ<strong>เสนอแผนงานใหม่และตั้งทีมศึกษาข้อมูลอย่างละเอียด</strong
			>ก่อนส่งต่อให้ฝ่ายบริหารนำไปดำเนินการต่อ
		</TabContentDescription>
		<TabContentDescription value={EntityTabGroup.Bill}>
			เปรียบเสมือน<strong>กฎหมาย</strong>ที่บังคับใช้ทั่วทั้ง กทม. ซึ่ง สก.
			สามารถเสนอร่างกฎหมายได้เช่นเดียวกับฝ่ายบริหาร
		</TabContentDescription>
	</Tabs.Root>

	<div class="flex flex-col gap-3 bg-neutral-300 p-5">
		{#each displayEvents as event (event.id)}
			<EventCard {...event} />
		{/each}
		<Pagination
			count={eventsByGroup[selectedGroup]!.length}
			perPage={PER_PAGE}
			bind:page={currentPage}
		/>
	</div>
</div>
