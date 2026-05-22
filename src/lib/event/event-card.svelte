<script lang="ts">
	import { ArrowUpRightIcon, UserIcon, UsersThreeIcon } from 'phosphor-svelte';
	import { EventGroup } from '$lib/constants';
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
		dateDisplay?: string;
		href?: string;
		status?: BillStatus;
		group?: EventGroup;
	}

	let { title, districts, topics, proposer, dateDisplay, href, status, group }: Props = $props();

	const isCommittee = $derived(group === EventGroup.CommitteeStudy);

	const baseClass =
		'wv-b6 relative flex flex-1 flex-col gap-3 rounded-lg border-2 border-neutral-200 bg-white p-3 md:gap-4 md:p-4';
	const hoverClass = $derived(href ? 'hover:border-neutral-400' : '');
</script>

{#snippet content()}
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

		{#if dateDisplay}
			<p class="wv-b6 text-neutral-500">
				{dateDisplay}
			</p>
		{/if}
	</div>

	{#if proposer}
		<div class="h-px bg-neutral-300"></div>

		<div class="flex flex-col">
			<h5 class="font-bold text-neutral-600">{isCommittee ? 'คณะกรรมการ' : 'ผู้เสนอ'}</h5>
			<div class="flex flex-row items-center gap-2 text-sm text-gray-600">
				{#if proposer.imageUrl}
					<img
						src={proposer.imageUrl}
						alt={proposer.name}
						class="size-8 rounded-full object-cover object-top"
					/>
				{:else}
					<div
						class="flex size-8 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100"
					>
						{#if isCommittee}
							<UsersThreeIcon class="size-5" />
						{:else}
							<UserIcon class="size-4" />
						{/if}
					</div>
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
					{#if proposer.district}
						<p>
							สก.เขต {proposer.district}
						</p>
					{/if}
				</div>
			</div>
		</div>
	{/if}

	{#if href}
		<ArrowUpRightIcon class="absolute right-4 bottom-4 size-4 self-end" />
	{/if}
{/snippet}

{#if href}
	<a {href} rel="external noopener noreferrer" class="{baseClass} {hoverClass}">
		{@render content()}
	</a>
{:else}
	<div class="{baseClass} {hoverClass}">
		{@render content()}
	</div>
{/if}
