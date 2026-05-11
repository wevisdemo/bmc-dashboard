<script lang="ts">
	import { geoMercator, geoPath } from 'd3-geo';
	import { scaleLinear } from 'd3-scale';
	import { interpolateYlGn } from 'd3-scale-chromatic';
	import type { FeatureCollection, Feature } from 'geojson';
	import { fade } from 'svelte/transition';
	import type { Event } from '../../routes/+page.server';
	import bangkokData from './bangkok-districts.json';

	const CANVAS_WIDTH = 280;
	const CANVAS_HEIGHT = 220;

	interface Props {
		events: Event[];
		selectedDistrict: string;
	}

	let { events, selectedDistrict = $bindable() }: Props = $props();

	let hoveredDistrict = $state<Omit<(typeof districts)[number], 'feature'> | null>(null);

	let districtCountMap = $derived(
		new Map(
			Object.entries(
				events
					.filter((e) => e.district !== 'ภาพรวมกรุงเทพมหานคร')
					.reduce(
						(acc, e) => {
							acc[e.district] = (acc[e.district] ?? 0) + 1;
							return acc;
						},
						{} as Record<string, number>
					)
			)
		)
	);

	let minDistrictCount = $derived(Math.min(...districtCountMap.values(), 0));
	let maxDistrictCount = $derived(Math.max(...districtCountMap.values(), 1));

	let colorDomain = $derived(scaleLinear([minDistrictCount, maxDistrictCount], [0, 1]));

	const projection = geoMercator().fitSize(
		[CANVAS_WIDTH, CANVAS_HEIGHT],
		bangkokData as unknown as FeatureCollection
	);
	const pathGen = geoPath(projection);

	const districts = (bangkokData as unknown as FeatureCollection).features.map((feature) => ({
		feature,
		name: getDistrictName(feature),
		centroid: pathGen.centroid(feature)
	}));

	let layeredDistricts = $derived(
		districts.toSorted((a, z) =>
			`${a.name === selectedDistrict}`.localeCompare(`${z.name === selectedDistrict}`)
		)
	);

	function getDistrictName(feature: Feature): string {
		return feature.properties?.dname.replace('เขต', '');
	}
</script>

<div class="flex flex-col">
	<svg viewBox="0 0 {CANVAS_WIDTH} {CANVAS_HEIGHT}" class="w-full">
		{#each layeredDistricts as { feature, name, centroid } (name)}
			<!-- svelte-ignore a11y_no_static_element_interactions, a11y_click_events_have_key_events -->
			<path
				d={pathGen(feature) ?? ''}
				class="cursor-pointer transition-colors {selectedDistrict === name
					? 'stroke-black stroke-1'
					: 'stroke-gray-400 stroke-[0.5]'}"
				fill={interpolateYlGn(colorDomain(districtCountMap.get(name) ?? minDistrictCount))}
				onmouseenter={() => (hoveredDistrict = { name, centroid })}
				onmouseleave={() => (hoveredDistrict = null)}
				onclick={() => (selectedDistrict = name)}
			/>
		{/each}
		{#if hoveredDistrict}
			{@const [x, y] = hoveredDistrict.centroid}
			<text
				transition:fade={{ duration: 200 }}
				{x}
				{y}
				text-anchor="middle"
				dominant-baseline="central"
				class="pointer-events-none fill-white text-[8px] font-bold"
				paint-order="stroke"
				stroke="#374151"
				stroke-width="2">{hoveredDistrict.name}</text
			>
		{/if}
	</svg>

	<div class="wv-b6 self-end">
		<span class="font-bold">จำนวนการเสนอประเด็น</span>
		<div class="mt-1 flex flex-row items-center gap-2">
			<span>น้อย</span>
			<div
				class="h-4 w-24"
				style="background:linear-gradient(to right, {interpolateYlGn(0)}, {interpolateYlGn(1)})"
			></div>
			<span>มาก</span>
		</div>
	</div>
</div>
