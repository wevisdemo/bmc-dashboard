<script lang="ts">
	import { geoMercator, geoPath } from 'd3-geo';
	import { scaleLinear } from 'd3-scale';
	import { interpolateYlGn } from 'd3-scale-chromatic';
	import type { FeatureCollection, Feature } from 'geojson';
	import type { Event } from '../../routes/+page.server';
	import bangkokData from './bangkok-districts.json';

	const CANVAS_WIDTH = 280;
	const CANVAS_HEIGHT = 220;

	interface Props {
		events: Event[];
	}

	let { events }: Props = $props();

	let hoveredDistrict = $state<string | null>(null);

	let districtCountMap = $derived(
		new Map(
			Object.entries(
				events.reduce(
					(acc, e) => {
						acc[e.district] = (acc[e.district] ?? 0) + 1;
						return acc;
					},
					{} as Record<string, number>
				)
			)
		)
	);

	let minDistrictCount = $derived(Math.min(...districtCountMap.values()));
	let maxDistrictCount = $derived(Math.max(...districtCountMap.values()));

	let colorDomain = $derived(
		scaleLinear(
			[minDistrictCount, maxDistrictCount],
			[0, minDistrictCount === maxDistrictCount ? 0 : 1]
		)
	);

	const districts = (bangkokData as unknown as FeatureCollection).features;
	const projection = geoMercator().fitSize(
		[CANVAS_WIDTH, CANVAS_HEIGHT],
		bangkokData as unknown as FeatureCollection
	);
	const pathGen = geoPath(projection);

	const districtCentroidMap = new Map(
		districts.map((f) => [getDistrictName(f), pathGen.centroid(f)] as const)
	);

	function getDistrictName(feature: Feature) {
		return feature.properties?.dname?.replace('เขต', '');
	}
</script>

<div class="flex flex-col">
	<svg viewBox="0 0 {CANVAS_WIDTH} {CANVAS_HEIGHT}" class="w-full">
		{#each districts as feature (feature.properties?.dname)}
			{@const districtName = getDistrictName(feature)}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<path
				d={pathGen(feature) ?? ''}
				class="cursor-pointer stroke-gray-400 stroke-[0.5]"
				fill={interpolateYlGn(colorDomain(districtCountMap.get(districtName) ?? minDistrictCount))}
				onmouseenter={() => (hoveredDistrict = districtName)}
				onmouseleave={() => (hoveredDistrict = null)}
			/>
		{/each}
		{#if hoveredDistrict}
			{@const [x, y] = districtCentroidMap.get(hoveredDistrict)!}
			<text
				{x}
				{y}
				text-anchor="middle"
				dominant-baseline="central"
				class="pointer-events-none fill-white text-[8px] font-bold"
				paint-order="stroke"
				stroke="#374151"
				stroke-width="2">{hoveredDistrict}</text
			>
		{/if}
	</svg>

	<div class="wv-b6 self-end">
		<span class="font-bold">จำนวนการเสนอประเด็น</span>
		<div class="mt-1 flex flex-row items-center gap-2">
			<span>น้อย</span>
			<div
				class="h-6 w-24"
				style="background:linear-gradient(to right, {interpolateYlGn(0)}, {interpolateYlGn(1)})"
			></div>
			<span>มาก</span>
		</div>
	</div>
</div>
