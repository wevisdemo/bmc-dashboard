<script lang="ts">
	import { Document, Information } from 'carbon-icons-svelte';
	import ArrowUpRight from 'carbon-icons-svelte/lib/ArrowUpRight.svelte';
	import Events from 'carbon-icons-svelte/lib/Events.svelte';
	import User from 'carbon-icons-svelte/lib/User.svelte';
	import { EventGroup } from '$lib/constants';
	import type { BillStatus } from '$lib/sheets/bill';
	import DistrictTag from '$lib/tags/district-tag.svelte';
	import StatusTag from '$lib/tags/status-tag.svelte';
	import TopicTag from '$lib/tags/topic-tag.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		districts?: string[];
		topics?: string[];
		proposer?: {
			name: string;
			party?: string;
			district?: string;
			imageUrl?: string;
		};
		dateDisplay?: string;
		href?: string;
		status?: BillStatus;
		group: EventGroup;
		reference?: string;
		children?: Snippet;
	}

	let {
		title,
		districts = [],
		topics = [],
		proposer,
		dateDisplay,
		href,
		status,
		group,
		reference,
		children
	}: Props = $props();

	const isCommittee = $derived(group === EventGroup.CommitteeStudy);

	const referenceText = $derived.by(() => {
		switch (group) {
			case EventGroup.Subject:
				return 'สก. เสนอกระทู้ถามนี้เพราะอะไร? อ่านเหตุผลประกอบการยื่นกระทู้ถามที่เอกสารต้นฉบับ';
			case EventGroup.Motion:
				return 'สก. เสนอญัตตินี้เพราะอะไร? อ่านเหตุผลที่เอกสารต้นฉบับ';
			case EventGroup.CommitteeStudy:
				return 'คณะกรรมการนี้ศึกษาอะไร? อ่านรายงานผลการศึกษาเต็ม ๆ ที่เอกสารต้นฉบับ';
			case EventGroup.Bill:
				return 'ร่างข้อบัญญัตินี้มีรายละเอียดยังไง? และสก. เสนอร่างนี้เพราะอะไร? อ่านหลักการและเหตุผล\n				และเนื้อหาร่างข้อบัญญัติที่เอกสารต้นฉบับ';
		}
	});

	const baseClass = 'wv-b6 relative flex flex-1 flex-col rounded-lg overflow-hidden';
</script>

{#snippet content()}
	<div class="flex flex-col gap-3 p-3 md:gap-4 md:p-4 md:px-8">
		{#if (topics?.length ?? 0) + (districts?.length ?? 0) > 0 || status}
			<div class="flex flex-row flex-wrap items-start gap-2">
				<div class="flex flex-1 flex-wrap gap-2">
					{#each topics as topic (topic)}
						<TopicTag {topic} />
					{/each}
					{#each districts as district (district)}
						<DistrictTag {district} />
					{/each}
				</div>

				{#if status}
					<StatusTag {status} />
				{/if}
			</div>
		{/if}

		<div class="space-y-1">
			<h4 class="wv-h9 wv-kondolar font-bold">{title}</h4>

			{#if dateDisplay}
				<p class="text-neutral-500">
					{dateDisplay}
				</p>
			{/if}
		</div>

		{#if proposer}
			<div class="h-px bg-neutral-300"></div>

			<div class="flex flex-col">
				<h5 class="font-bold text-neutral-600">{isCommittee ? 'คณะกรรมการ' : 'ผู้เสนอ'}</h5>
				<div class="flex flex-row items-center gap-2 text-sm">
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
								<Events class="size-4" />
							{:else}
								<User class="size-4" />
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
							<p class="text-neutral-500">
								ส.ก. เขต{proposer.district}
							</p>
						{/if}
					</div>
				</div>
			</div>
		{/if}

		{@render children?.()}
	</div>

	{#if reference}
		<div class="flex flex-row items-start gap-2 bg-neutral-300 p-3 md:px-8 md:py-4">
			<Information class="mt-0.5" />
			<p class="flex-1">{referenceText}</p>
			<a
				href={reference}
				target="blank"
				class="flex flex-row items-center gap-1 rounded-lg bg-black p-2 font-bold text-white hover:bg-neutral-700 md:px-4 md:py-3"
				><Document />ดูเอกสารต้นฉบับ</a
			>
		</div>
	{/if}
{/snippet}

{#if href}
	<a
		{href}
		rel="external noopener noreferrer"
		class="border-2 border-neutral-200 bg-white hover:border-neutral-400 {baseClass}"
	>
		{@render content()}
		{#if href}
			<ArrowUpRight class="absolute right-4 bottom-4 size-4 self-end" />
		{/if}
	</a>
{:else}
	<div class="bg-neutral-100 {baseClass}">
		{@render content()}
	</div>
{/if}
