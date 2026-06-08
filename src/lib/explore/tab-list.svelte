<script lang="ts">
	import { EventGroup } from '$lib/constants';
	import TabView from '$lib/inputs/tab-view.svelte';
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

<div id="list" class="-mx-3 md:m-0" bind:this={container}>
	<TabView {tabs} bind:value={tab} onValueChange={ontabchange}>
		{#snippet trigger(value)}
			<h4 class="wv-h9 font-bold whitespace-nowrap">{value}</h4>
			<span>[{eventsByGroup[value as EventGroup]?.length ?? 0}]</span>
		{/snippet}

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
	</TabView>
</div>
