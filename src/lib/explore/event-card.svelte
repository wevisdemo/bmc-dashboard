<script lang="ts">
	import { ArrowUpRightIcon, MapPinIcon } from 'phosphor-svelte';
	import { BillStatus } from '$lib/sheets/bill';
	import { topicColorMap } from '$lib/sheets/topic';

	interface Props {
		title: string;
		district: string;
		topics: string[];
		proposer?: {
			name: string;
			party?: string;
			district?: string;
			imageUrl?: string;
		};
		proposedDate?: Date;
		href: string;
		status?: BillStatus;
	}

	let { title, district, topics, proposer, proposedDate, href }: Props = $props();
</script>

<a
	{href}
	rel="external noopener noreferrer"
	class="relative wv-b6 flex flex-1 flex-col gap-4 rounded-lg border-2 border-neutral-200 bg-white p-4 hover:border-neutral-400"
>
	<div class="flex flex-wrap gap-2">
		{#each topics as topic (topic)}
			<span
				class="rounded-full px-2 py-0.5 font-bold text-black"
				style="background-color: {topicColorMap.get(topic)}"
			>
				{topic}
			</span>
		{/each}
		<span
			class="rounded bg-gray-100 border-gray-300 border p-2 gap-1 py-0.5 flex flex-row items-center"
		>
			<MapPinIcon />
			{district}
		</span>
	</div>

	<h4 class="wv-h9 wv-kondolar font-bold">{title}</h4>

	{#if proposer}
		<div class="h-px bg-neutral-300"></div>

		<div class="flex flex-col">
			<h5 class="font-bold text-neutral-600">ผู้เสนอ</h5>
			<div class="flex flex-row items-center gap-2 text-sm text-gray-600">
				{#if proposer.imageUrl}
					<img
						src={proposer.imageUrl}
						alt={proposer.name}
						class="size-8 rounded-full object-cover object-top"
					/>
				{:else}
					<div class="size-8 rounded-full bg-neutral-300"></div>
				{/if}
				<div class="flex flex-col gap-0.5">
					<div class="flex flex-row gap-2">
						<span class="wv-b5 font-bold">{proposer.name}</span>
						{#if proposer.party}
							<span class="rounded border border-neutral-400 px-1 pt-0.5">{proposer.party}</span>
						{/if}
					</div>
					<p>
						สก.เขต {proposer.district}{#if proposedDate}
							| วันที่เสนอ {proposedDate.toLocaleDateString('th-TH', { dateStyle: 'long' })}
						{/if}
					</p>
				</div>
			</div>
		</div>
	{/if}
	<ArrowUpRightIcon class="size-4 self-end absolute bottom-4 right-4" />
</a>
