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
		class?: string;
	}

	let {
		selectedDistrict = $bindable(''),
		selectedSecondaryTopics = $bindable([]),
		defaultDistrict,
		allSecondaryTopics,
		ondistrictchange,
		ontopicschange,
		class: className = ''
	}: Props = $props();

	let isShowingDistrict = $derived(selectedDistrict !== defaultDistrict);
	let isShowingTopics = $derived(
		selectedSecondaryTopics.length && selectedSecondaryTopics.length !== allSecondaryTopics.length
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

{#if isShowingDistrict || isShowingTopics}
	<div class="flex flex-row flex-wrap items-center gap-2 {className}">
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
		<button
			class="wv-b6 px-2 py-1 text-blue-700 hover:text-blue-400"
			onclick={() => {
				setDistrict(defaultDistrict);
				setTopics([...allSecondaryTopics]);
			}}>ล้างทั้งหมด</button
		>
	</div>
{/if}
