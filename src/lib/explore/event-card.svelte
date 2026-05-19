<script lang="ts">
	import { ArrowUpRightIcon } from 'phosphor-svelte';
	import type { BillStatus } from '$lib/sheets/bill';
	import DistrictChip from '$lib/tags/district-tag.svelte';
	import StatusChip from '$lib/tags/status-tag.svelte';
	import TopicChip from '$lib/tags/topic-tag.svelte';

	interface Props {
		title: string;
		districts: string[];
		topics: string[];
		proposer?: {
			name: string;
			party?: string;
			district?: string;
			imageUrl?: string;
		};
		date?: string;
		href: string;
		status?: BillStatus;
	}

	let { title, districts, topics, proposer, date, href, status }: Props = $props();
</script>

<a
	{href}
	rel="external noopener noreferrer"
	class="wv-b6 relative flex flex-1 flex-col gap-4 rounded-lg border-2 border-neutral-200 bg-white p-4 hover:border-neutral-400"
>
	<div class="flex flex-row">
		<div class="flex flex-1 flex-wrap gap-2">
			{#each topics as topic (topic)}
				<TopicChip {topic} />
			{/each}
			{#each districts as district (district)}
				<DistrictChip {district} />
			{/each}
		</div>

		{#if status}
			<StatusChip {status} />
		{/if}
	</div>

	<div class="space-y-1">
		<h4 class="wv-h9 wv-kondolar font-bold">{title}</h4>

		{#if date}
			<p class="wv-b6 text-neutral-500">
				{date}
			</p>
		{/if}
	</div>

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
					<div class="flex flex-row items-center gap-2">
						<span class="wv-b5 font-bold">{proposer.name}</span>
						{#if proposer.party}
							<span class="rounded-lg border border-gray-300 bg-gray-100 px-2 py-0.5"
								>{proposer.party}</span
							>
						{/if}
					</div>
					<p>
						สก.เขต {proposer.district}
					</p>
				</div>
			</div>
		</div>
	{/if}
	<ArrowUpRightIcon class="absolute right-4 bottom-4 size-4 self-end" />
</a>
