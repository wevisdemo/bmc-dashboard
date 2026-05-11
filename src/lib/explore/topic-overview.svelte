<script lang="ts">
	import { flip } from 'svelte/animate';
	import type { Event } from '../../routes/+page.server';

	interface Props {
		events: Event[];
		secondaryToMainTopic: Map<string, string>;
	}

	let { events, secondaryToMainTopic }: Props = $props();

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

<div class="mx-3 mb-6 flex flex-col gap-5">
	{#each topicCounts.toSorted((a, b) => b.count - a.count) as item (item.topic)}
		<div animate:flip={{ duration: 300 }} class="flex flex-col gap-1">
			<div class="flex flex-row justify-between text-sm font-bold">
				<span>{item.topic}</span>
				<span class="tabular-nums">{item.count}</span>
			</div>
			<div class="h-2 w-full rounded-xs border border-gray-300 bg-gray-200">
				<div
					class="h-full rounded-xs bg-gray-500 transition-[width] duration-300"
					style="width:{(item.count / maxTopicCount) * 100}%"
				></div>
			</div>
		</div>
	{/each}
</div>
