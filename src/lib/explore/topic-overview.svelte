<script lang="ts">
	import { flip } from 'svelte/animate';
	import type { Event } from '../../routes/+page.server';

	interface Props {
		events: Event[];
		topicGroups: { main: string; secondaries: string[] }[];
		selectedSecondaryTopics: string[];
		ontopicschange?: () => void;
	}

	let {
		events,
		topicGroups,
		selectedSecondaryTopics = $bindable(),
		ontopicschange
	}: Props = $props();

	const allSecondaryTopics = $derived(topicGroups.flatMap((g) => g.secondaries));

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

<div>
	<div class="flex flex-row justify-between">
		<span>ประเด็นทั้งหมด</span>
		<span>{topicCounts.length}</span>
	</div>
	<div class="flex flex-col gap-1 max-h-96 overflow-y-scroll border-neutral-200 border-t py-2">
		{#each topicCounts.toSorted((a, b) => b.count - a.count) as { topic, count } (topic)}
			{@const isActive = selectedSecondaryTopics.includes(topic)}
			<button
				animate:flip={{ duration: 300 }}
				class="flex flex-col gap-1 rounded-sm transition-colors border p-2 hover:bg-neutral-100 {isActive
					? 'border-neutral-300'
					: 'border-transparent'}"
				onclick={() => onTopicClick(topic)}
			>
				<div class="flex flex-row justify-between text-sm font-bold">
					<span>{topic}</span>
					<span class="tabular-nums">{count}</span>
				</div>
				<div class="h-2 w-full rounded-xs border border-neutral-300 bg-neutral-200">
					<div
						class="h-full rounded-xs bg-neutral-500 transition-[width] duration-300"
						style="width:{(count / maxTopicCount) * 100}%"
					></div>
				</div>
			</button>
		{/each}
	</div>
</div>
