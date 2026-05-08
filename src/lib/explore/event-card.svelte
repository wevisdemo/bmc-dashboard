<script lang="ts">
	import { ArrowUpRightIcon } from 'phosphor-svelte';

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
	}

	let { title, district, topics, proposer, proposedDate, href }: Props = $props();
</script>

<a
	{href}
	target="_blank"
	rel="external noopener noreferrer"
	class="flex flex-row rounded border border-gray-300 bg-white p-4 transition-shadow hover:shadow-md"
>
	<div class="wv-b6 flex flex-1 flex-col gap-3">
		<div class="flex flex-wrap gap-1">
			<span class="inline-block rounded-full bg-gray-200 px-2 py-0.5">
				เขต{district}
			</span>
			{#each topics as topic (topic)}
				<span class="rounded bg-blue-100 px-1.5 py-0.5 text-blue-800">
					{topic}
				</span>
			{/each}
		</div>

		<h4 class="wv-h9 wv-kondolar font-bold">{title}</h4>

		{#if proposer}
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
	</div>
	<ArrowUpRightIcon class="size-4 self-end" />
</a>
