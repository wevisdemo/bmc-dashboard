<script lang="ts">
	import { XCircleIcon } from 'phosphor-svelte';

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

{#snippet optionChip(label: string, className: string, onclick?: () => void)}
	<div class="flex flex-row gap-1 items-center rounded-full px-2 py-1 {className}">
		<span class="wv-b6 font-bold ml-1">{label}</span>
		<button class="hover:opacity-50" {onclick}>
			<XCircleIcon class="size-4" />
		</button>
	</div>
{/snippet}

<div class="flex flex-row flex-wrap gap-2 items-center">
	{#if isShowingDistrict}
		{@render optionChip(selectedDistrict, 'bg-neutral-100', () => setDistrict(defaultDistrict))}
	{/if}
	{#if isShowingTopics}
		{#each selectedSecondaryTopics as topic (topic)}
			{@render optionChip(topic, 'bg-neutral-200', () =>
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
