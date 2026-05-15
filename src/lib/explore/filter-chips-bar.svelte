<script lang="ts">
	import { XCircleIcon } from 'phosphor-svelte';
	import { topicColorMap } from '$lib/sheets/topic';

	interface Props {
		selectedDistrict: string;
		selectedSecondaryTopics: string[];
		defaultDistrict: string;
		allSecondaryTopics: string[];
		ondistrictchange?: (district: string) => void;
		ontopicschange?: (topics: string[]) => void;
	}

	let {
		selectedDistrict = $bindable(''),
		selectedSecondaryTopics = $bindable([]),
		defaultDistrict,
		allSecondaryTopics,
		ondistrictchange,
		ontopicschange
	}: Props = $props();

	let isShowingDistrict = $derived(selectedDistrict !== defaultDistrict);
	let isShowingTopics = $derived(selectedSecondaryTopics.length !== allSecondaryTopics.length);

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
		class="flex flex-row gap-1 items-center rounded-full px-2 py-0.5 border-2 border-transparent hover:border-black"
		style="background-color: {bgColor}"
		{onclick}
	>
		<span class="wv-b6 font-bold ml-1">{label}</span>
		<XCircleIcon class="size-4" />
	</button>
{/snippet}

<div class="flex flex-row flex-wrap gap-2 items-center">
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
			class="px-2 py-1 wv-b6 text-blue-700 hover:text-blue-400"
			onclick={() => {
				setDistrict(defaultDistrict);
				setTopics([...allSecondaryTopics]);
			}}>ล้างทั้งหมด</button
		>
	{/if}
</div>
