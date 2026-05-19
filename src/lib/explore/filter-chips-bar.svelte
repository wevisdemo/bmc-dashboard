<script lang="ts">
	import { XCircleIcon } from 'phosphor-svelte';
	import { AdditionalDistrictOption } from '$lib/constants';
	import { topicColorMap } from '$lib/sheets/topic';
	import type { Event } from '../../routes/+page.server';

	interface Props {
		selectedDistrict: string;
		selectedSecondaryTopics: string[];
		defaultDistrict: string;
		allSecondaryTopics: string[];
		events: Event[];
		ondistrictchange?: (district: string) => void;
		ontopicschange?: (topics: string[]) => void;
	}

	let {
		selectedDistrict = $bindable(''),
		selectedSecondaryTopics = $bindable([]),
		defaultDistrict,
		allSecondaryTopics,
		events,
		ondistrictchange,
		ontopicschange
	}: Props = $props();

	let isShowingDistrict = $derived(selectedDistrict !== defaultDistrict);
	let isShowingTopics = $derived(selectedSecondaryTopics.length !== allSecondaryTopics.length);

	let eventInDistrictCount = $derived(
		events.filter((e) => e.districts.some((d) => d !== AdditionalDistrictOption.NotSpecified))
			.length
	);

	function setDistrict(district: string) {
		selectedDistrict = district;
		ondistrictchange?.(district);
	}

	function setTopics(topics: string[]) {
		selectedSecondaryTopics = topics;
		ontopicschange?.(topics);
	}
</script>

{#snippet optionChip(label: string, bgColor?: string, onclick?: () => void)}
	<button
		class="flex flex-row items-center gap-1 rounded-full border-2 border-transparent px-2 py-0.5 hover:border-black"
		style="background-color: {bgColor}"
		{onclick}
	>
		<span class="wv-b6 ml-1 font-bold">{label}</span>
		<XCircleIcon class="size-4" />
	</button>
{/snippet}

<div class="flex flex-col gap-2">
	<p class="wv-b6 flex-1">
		รายการทั้งหมด <strong>{events.length}</strong> (ระบุเขตได้
		<strong>{eventInDistrictCount}</strong>,
		<span class="text-neutral-500"
			>ไม่ระบุเขต <strong>{events.length - eventInDistrictCount}</strong></span
		>)
	</p>
	<div class="flex flex-row flex-wrap items-center gap-2">
		{#if isShowingDistrict}
			{@render optionChip(selectedDistrict, '#f5f5f5', () => setDistrict(defaultDistrict))}
		{/if}
		{#if isShowingTopics}
			{#each selectedSecondaryTopics as topic (topic)}
				{@render optionChip(topic, topicColorMap.get(topic), () =>
					setTopics(selectedSecondaryTopics.filter((st) => st !== topic))
				)}
			{/each}
		{/if}
		{#if isShowingDistrict || isShowingTopics}
			<button
				class="wv-b6 px-2 py-1 text-blue-700 hover:text-blue-400"
				onclick={() => {
					setDistrict(defaultDistrict);
					setTopics([...allSecondaryTopics]);
				}}>ล้างทั้งหมด</button
			>
		{/if}
	</div>
</div>
