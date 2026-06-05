<script lang="ts">
	import { Tabs } from 'bits-ui';
	import { EventGroup } from '$lib/constants';
	import TabContent from './tab-content.svelte';
	import type { Event } from '../../routes/+page.server';

	interface Props {
		events: Event[];
		tab: string;
		page: number;
		ontabchange?: () => void;
	}

	let { events, tab = $bindable(), page = $bindable(), ontabchange }: Props = $props();

	let container = $state<HTMLDivElement>();

	let eventsByGroup = $derived(Object.groupBy(events, (e) => e.group));

	const tabs = Object.values(EventGroup);
</script>

<div id="list" class="-mx-3 bg-neutral-300 md:m-0" bind:this={container}>
	<Tabs.Root bind:value={tab} onValueChange={ontabchange}>
		<Tabs.List
			class="sticky top-0 z-10 flex flex-row gap-2 overflow-x-auto border-b-12 border-neutral-300 bg-white px-3 pt-2 md:border-b-24 md:p-0"
		>
			{#each tabs as value (value)}
				<Tabs.Trigger
					{value}
					class="flex flex-row items-center gap-1 rounded-t-lg bg-neutral-100 p-3 data-[state=active]:bg-neutral-300"
				>
					<h4 class="wv-h9 font-bold whitespace-nowrap">{value}</h4>
					<span>[{eventsByGroup[value]?.length ?? 0}]</span>
				</Tabs.Trigger>
			{/each}
		</Tabs.List>

		<TabContent
			value={EventGroup.Subject}
			events={eventsByGroup[EventGroup.Subject] ?? []}
			{page}
			{container}
		>
			<li>
				ส.ก. จะตั้งกระทู้ถาม เมื่อต้องการติดตามความคืบหน้าจากฝ่ายบริหาร
				ส่วนมากกระทู้จะเป็นเรื่องของเขตใดเขตหนึ่ง
			</li>
			<li>
				พรรคที่ ส.ก. สังกัด อ้างอิงตาม
				<strong>พรรค ณ วันที่ลงสมัครรับเลือกตั้งปี 2565</strong>
			</li>
		</TabContent>
		<TabContent
			value={EventGroup.Motion}
			events={eventsByGroup[EventGroup.Motion] ?? []}
			{page}
			{container}
		>
			<li>
				ส.ก. จะตั้งญัตติ เมื่อต้องการเสนอประเด็นหนึ่ง ๆ เข้าสู่สภา
				หรือข้อตั้งคณะกรรมการวิสามัญมาศึกษาในประเด็นหนึ่ง ๆ
				โดยทั่วไปญัตติจะเป็นเรื่องที่ครอบคลุมทั้ง กทม.
			</li>
			<li>
				พรรคที่ ส.ก. สังกัด อ้างอิงตาม
				<strong>พรรค ณ วันที่ลงสมัครรับเลือกตั้งปี 2565</strong>
			</li>
		</TabContent>
		<TabContent
			value={EventGroup.CommitteeStudy}
			events={eventsByGroup[EventGroup.CommitteeStudy] ?? []}
			{page}
			{container}
		>
			<li>
				ส.ก. จะนั่งในคณะกรรมการสามัญและวิสามัญ เพื่อศึกษาในประเด็นหนึ่ง ๆ อย่างละเอียด
				และให้ข้อสังเกตหรือข้อเสนอแนะแก่ฝ่ายบริหารเพื่อไปดำเนินการต่อ
			</li>
		</TabContent>
		<TabContent
			value={EventGroup.Bill}
			events={eventsByGroup[EventGroup.Bill] ?? []}
			{page}
			{container}
		>
			<li>
				ส.ก. สามารถเสนอร่างข้อบัญญัติ (กฎหมายที่บังคับใช้เฉพาะใน กทม.) ได้เช่นเดียวกับฝ่ายบริหาร
				ร่างข้อบัญญัติจะเสนอโดย ส.ก. หนึ่งคนหรือมากกว่าก็ได้
			</li>
			<li>
				พรรคที่ ส.ก. สังกัด อ้างอิงตาม
				<strong>พรรค ณ วันที่ลงสมัครรับเลือกตั้งปี 2565</strong>
			</li>
		</TabContent>
		<TabContent
			value={EventGroup.Budget}
			events={eventsByGroup[EventGroup.Budget] ?? []}
			{page}
			{container}
		>
			<li>
				ส.ก. จะนั่งในคณะกรรมการวิสามัญพิจารณาร่างข้อบัญญัติงบประมาณ เพื่อพิจารณาปรับ-ลด งบฯ
				ที่จัดสรรไปในแต่ละสำนักของ กทม.
			</li>
		</TabContent>
	</Tabs.Root>
</div>
