<script lang="ts">
	import { flip } from 'svelte/animate';
	import type { Event } from '../../routes/+page.server';

	interface Props {
		events: Event[];
		topicGroups: { main: string; secondaries: string[] }[];
		selectedSecondaryTopics: string[];
	}

	let { events, topicGroups, selectedSecondaryTopics = $bindable() }: Props = $props();

	const secondaryToMainTopic = $derived(
		new Map(topicGroups.flatMap((g) => g.secondaries.map((s) => [s, g.main])))
	);

	const allSecondaryTopics = $derived(topicGroups.flatMap((g) => g.secondaries));

	let topicCounts = $derived(
		Object.entries(
			events
				.flatMap((e) => e.topics)
				.reduce(
					(acc, t) => {
						const main = secondaryToMainTopic.get(t);
						if (main) acc[main] = (acc[main] ?? 0) + 1;
						return acc;
					},
					{} as Record<string, number>
				)
		).map(([topic, count]) => ({ topic, count }))
	);

	let maxTopicCount = $derived(Math.max(...topicCounts.map((t) => t.count)));
</script>

<div class="mb-6 flex flex-col gap-1">
	{#each topicCounts.toSorted((a, b) => b.count - a.count) as { topic, count } (topic)}
		{@const isActive = selectedSecondaryTopics.some(
			(sec) => secondaryToMainTopic.get(sec) === topic
		)}
		<button
			animate:flip={{ duration: 300 }}
			class="flex flex-col gap-1 rounded-sm transition-colors border p-2 hover:bg-gray-100 {isActive
				? 'border-gray-300'
				: 'border-transparent'}"
			onclick={() => {
				if (isActive && selectedSecondaryTopics.length !== allSecondaryTopics.length) {
					selectedSecondaryTopics = allSecondaryTopics;
				} else {
					const group = topicGroups.find((g) => g.main === topic);
					if (group) selectedSecondaryTopics = group.secondaries;
				}
			}}
		>
			<div class="flex flex-row justify-between text-sm font-bold">
				<span>{topic}</span>
				<span class="tabular-nums">{count}</span>
			</div>
			<div class="h-2 w-full rounded-xs border border-gray-300 bg-gray-200">
				<div
					class="h-full rounded-xs bg-gray-500 transition-[width] duration-300"
					style="width:{(count / maxTopicCount) * 100}%"
				></div>
			</div>
		</button>
	{/each}
</div>
