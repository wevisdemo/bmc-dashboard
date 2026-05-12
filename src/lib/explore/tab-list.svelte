<script lang="ts">
	import { EntityTabGroup } from '$lib/constants';
	import Pagination from '$lib/inputs/pagination.svelte';
	import { Tabs } from 'bits-ui';
	import type { Event } from '../../routes/+page.server';
	import EventCard from './event-card.svelte';
	import TabContentDescription from './tab-content-description.svelte';

	const PER_PAGE = 10;

	interface Props {
		events: Event[];
		tab: string;
		page: number;
		ontabchange?: () => void;
	}

	let { events, tab = $bindable(), page = $bindable(), ontabchange }: Props = $props();

	let container = $state<HTMLDivElement>();

	let eventsByGroup = $derived(Object.groupBy(events, (e) => e.group));

	let displayEvents = $derived(
		eventsByGroup[tab as EntityTabGroup]?.slice((page - 1) * PER_PAGE, page * PER_PAGE) ?? []
	);

	const tabs = Object.values(EntityTabGroup);
</script>

<div class="pt-4" bind:this={container}>
	<Tabs.Root bind:value={tab} onValueChange={ontabchange}>
		<Tabs.List class="flex flex-row gap-2">
			{#each tabs as value (value)}
				<Tabs.Trigger
					{value}
					class="p-3 flex flex-row items-center gap-1 rounded-t-lg bg-neutral-100 data-[state=active]:bg-neutral-200"
				>
					<h4 class="wv-h9 font-bold">{value}</h4>
					<span>[{eventsByGroup[value]?.length ?? 0}]</span>
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

	{#if displayEvents.length}
		<div class="flex flex-col gap-3 bg-neutral-200 p-5">
			{#each displayEvents as event (event.id)}
				<EventCard {...event} />
			{/each}
			<Pagination
				count={eventsByGroup[tab as EntityTabGroup]?.length ?? 0}
				perPage={PER_PAGE}
				onpagechange={() =>
					setTimeout(() => container?.scrollIntoView({ behavior: 'smooth' }), 250)}
				bind:page
			/>
		</div>
	{:else}
		<div class="flex flex-col gap-3 bg-neutral-200 px-5 py-24 justify-center items-center">
			<span class="wv-h5 font-bold">ไม่พบสิ่งที่กำลังค้นหา</span>
			<span class="text-neutral-600">ลองค้นหาใหม่อีกครั้ง</span>
		</div>
	{/if}
</div>
