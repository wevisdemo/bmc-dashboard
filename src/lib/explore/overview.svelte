<script lang="ts">
	import { flip } from 'svelte/animate';

	interface TopicCount {
		topic: string;
		count: number;
	}

	interface Props {
		mainTopicCounts: TopicCount[];
		selectedDistrict: string;
	}

	let { mainTopicCounts, selectedDistrict }: Props = $props();

	let maxCount = $derived(Math.max(...mainTopicCounts.map((t) => t.count), 1));
</script>

<div class="wv-b6 flex flex-col gap-6 rounded-lg border border-gray-300 px-4 py-6 pt-3">
	<div class="flex flex-col gap-1">
		<h3 class="wv-b3 wv-kondolar font-bold">การกระจายตามประเด็น</h3>
		<p class="text-gray-500">*1 หัวข้อ เกี่ยวข้องได้มากกว่า 1 ประเด็น</p>
		<p class="font-bold">• {selectedDistrict}</p>
	</div>
	<div class="mx-3 flex flex-col gap-5">
		{#each mainTopicCounts.toSorted((a, b) => b.count - a.count) as item (item.topic)}
			<div animate:flip={{ duration: 300 }} class="flex flex-col gap-1">
				<div class="flex flex-row justify-between text-sm font-bold">
					<span>{item.topic}</span>
					<span class="tabular-nums">{item.count}</span>
				</div>
				<div class="h-2 w-full rounded-xs border border-gray-300 bg-gray-200">
					<div
						class="h-full rounded-xs bg-gray-500 transition-[width] duration-300"
						style="width:{(item.count / maxCount) * 100}%"
					></div>
				</div>
			</div>
		{/each}
	</div>
</div>
