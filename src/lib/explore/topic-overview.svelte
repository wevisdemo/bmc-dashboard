<script lang="ts">
	import { flip } from 'svelte/animate';
	import { topicColorMap } from '$lib/sheets/topic';
	import type { Event } from '../../routes/+page.server';

	interface Props {
		events: Event[];
		allSecondaryTopics: string[];
		selectedSecondaryTopics: string[];
		ontopicschange?: () => void;
	}

	let {
		events,
		allSecondaryTopics,
		selectedSecondaryTopics = $bindable(),
		ontopicschange
	}: Props = $props();

	let topicCounts = $derived(
		Object.entries(
			events
				.flatMap((e) => e.topics)
				.reduce(
					(acc, t) => {
						acc[t] = (acc[t] ?? 0) + 1;
						return acc;
					},
					{} as Record<string, number>
				)
		)
			.filter(([topic]) => allSecondaryTopics.includes(topic))
			.map(([topic, count]) => ({ topic, count }))
	);

	let maxTopicCount = $derived(
		topicCounts.length > 0 ? Math.max(...topicCounts.map((t) => t.count)) : 0
	);

	function onTopicClick(topic: string) {
		if (selectedSecondaryTopics.length === 1 && selectedSecondaryTopics[0] === topic) {
			selectedSecondaryTopics = [...allSecondaryTopics];
		} else {
			selectedSecondaryTopics = [topic];
		}
		ontopicschange?.();
	}
</script>

<div class="flex flex-col gap-1 max-h-96 overflow-y-scroll">
	{#each topicCounts.toSorted((a, b) => b.count - a.count) as { topic, count } (topic)}
		{@const isActive = selectedSecondaryTopics.includes(topic)}
		<button
			animate:flip={{ duration: 300 }}
			class="flex flex-col gap-1 rounded-sm transition-colors border p-2 hover:bg-neutral-100 {isActive
				? 'border-neutral-400'
				: 'border-transparent'}"
			onclick={() => onTopicClick(topic)}
		>
			<div class="flex flex-row justify-between text-sm font-bold">
				<span>{topic}</span>
				<span class="tabular-nums">{count}</span>
			</div>
			<div class="h-2 w-full rounded-xs border border-neutral-200 bg-neutral-100">
				<div
					class="h-full rounded-xs transition-[width] duration-300"
					style="width:{(count / maxTopicCount) * 100}%; background-color: {topicColorMap.get(
						topic
					)};"
				></div>
			</div>
		</button>
	{/each}
</div>
