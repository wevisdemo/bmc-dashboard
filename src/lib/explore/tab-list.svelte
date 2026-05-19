<script lang="ts">
	import { EventGroup } from '$lib/constants';
	import Pagination from '$lib/inputs/pagination.svelte';
	import { Tabs } from 'bits-ui';
	import type { Event } from '../../routes/+page.server';
	import EmptyListLabel from './empty-list-label.svelte';
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
		eventsByGroup[tab as EventGroup]?.slice((page - 1) * PER_PAGE, page * PER_PAGE) ?? []
	);

	const tabs = Object.values(EventGroup);
</script>

<div class="pt-4" bind:this={container}>
	<Tabs.Root bind:value={tab} onValueChange={ontabchange}>
		<Tabs.List class="flex flex-row gap-2">
			{#each tabs as value (value)}
				<Tabs.Trigger
					{value}
					class="flex flex-row items-center gap-1 rounded-t-lg bg-neutral-100 p-3 data-[state=active]:bg-neutral-300"
				>
					<h4 class="wv-h9 font-bold">{value}</h4>
					<span>[{eventsByGroup[value]?.length ?? 0}]</span>
				</Tabs.Trigger>
			{/each}
		</Tabs.List>
		<TabContentDescription value={EventGroup.Subject}>
			<li>
				สก. จะตั้งกระทู้ถาม เมื่อต้องการ <strong>ผลักดัน</strong> หรือ
				<strong>ติดตามความคืบหน้า</strong>
				จากฝ่ายบริหาร เกี่ยวกับ<strong>ประเด็นของเขตใดเขตหนึ่ง</strong>
			</li>
			<li>
				พรรคที่ สก. สังกัด อ้างอิงตาม
				<strong>พรรค ณ วันที่ลงสมัครรับเลือกตั้งปี 2565</strong>
			</li>
		</TabContentDescription>
		<TabContentDescription value={EventGroup.Motion}>
			<li>
				สก. จะตั้งญัตติ เมื่อต้องการเสนอประเด็นหนึ่ง ๆ เข้าสู่สภา โดยทั่วไปญัตติจะเกี่ยวกับ<strong
					>ประเด็นที่ครอบคลุมทั้ง กทม.</strong
				>
			</li>
			<li>
				พรรคที่ สก. สังกัด อ้างอิงตาม
				<strong>พรรค ณ วันที่ลงสมัครรับเลือกตั้งปี 2565</strong>
			</li>
		</TabContentDescription>
		<TabContentDescription value={EventGroup.CommitteeStudy}>
			<li>
				คณะกรรมการสามัญและวิสามัญจะ<strong>เสนอแผนงานใหม่และตั้งทีมศึกษาข้อมูลอย่างละเอียด</strong
				>ก่อนส่งต่อให้ฝ่ายบริหารนำไปดำเนินการต่อ
			</li>
		</TabContentDescription>
		<TabContentDescription value={EventGroup.Bill}>
			<li>
				เปรียบเสมือน<strong>กฎหมาย</strong>ที่บังคับใช้ทั่วทั้ง กทม. ซึ่ง สก.
				สามารถเสนอร่างกฎหมายได้เช่นเดียวกับฝ่ายบริหาร
			</li>
			<li>
				พรรคที่ สก. สังกัด อ้างอิงตาม
				<strong>พรรค ณ วันที่ลงสมัครรับเลือกตั้งปี 2565</strong>
			</li>
		</TabContentDescription>
	</Tabs.Root>

	{#if displayEvents.length}
		<div class="flex flex-col gap-4 bg-neutral-300 px-6 py-3">
			{#each displayEvents as event (event.id)}
				<EventCard {...event} />
			{/each}
			<Pagination
				count={eventsByGroup[tab as EventGroup]?.length ?? 0}
				perPage={PER_PAGE}
				onpagechange={() =>
					setTimeout(() => container?.scrollIntoView({ behavior: 'smooth' }), 250)}
				bind:page
			/>
		</div>
	{:else}
		<EmptyListLabel class="bg-neutral-300 px-5 py-24" />
	{/if}
</div>
