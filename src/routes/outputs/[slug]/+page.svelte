<script lang="ts">
	import { Accordion } from 'bits-ui';
	import { Events, Idea } from 'carbon-icons-svelte';
	import { onMount } from 'svelte';
	import { EventGroup } from '$lib/constants';
	import AccordionItem from '$lib/event/accordion-item.svelte';
	import CommitteeMembers from '$lib/event/committee-members.svelte';
	import EmptyRemark from '$lib/event/empty-remark.svelte';
	import EventCard from '$lib/event/event-card.svelte';
	import MarkdownContent from '$lib/event/markdown-content.svelte';
	import DistrictTag from '$lib/tags/district-tag.svelte';
	import StatusTag from '$lib/tags/status-tag.svelte';
	import TopicTag from '$lib/tags/topic-tag.svelte';

	let { data } = $props();

	let focusedEvent = $state('');
	let accordionValues = $state<Record<string, string[]>>({});

	const groupOrder = [
		EventGroup.Bill,
		EventGroup.Motion,
		EventGroup.CommitteeStudy,
		EventGroup.Subject,
		EventGroup.Budget
	];

	const EventGroupAction = {
		[EventGroup.Subject]: 'ตั้งกระทู้',
		[EventGroup.Motion]: 'เสนอญัตติ',
		[EventGroup.CommitteeStudy]: 'ศึกษาในคณะกรรมการ',
		[EventGroup.Bill]: 'เสนอข้อบัญญัติ',
		[EventGroup.Budget]: 'พิจารณางบประมาณ'
	};

	const eventsByGroup = $derived(
		data.events.reduce(
			(acc, event) => acc.set(event.group, [...(acc.get(event.group) ?? []), event]),
			new Map<EventGroup, typeof data.events>()
		)
	);

	const remarksByGroup = $derived(
		data.remarks.reduce((acc, r) => acc.set(r.group, r.remark), new Map<EventGroup, string>())
	);

	function closeAccordionItem(eventId: string, itemValue: string) {
		accordionValues[eventId] = (accordionValues[eventId] ?? []).filter((v) => v !== itemValue);
	}

	onMount(() => {
		focusedEvent = window.location.hash.slice(1);
	});
</script>

<div class="bg-sky-100 p-3 md:px-5 md:py-8">
	<div class="mx-auto flex w-full max-w-5xl flex-col gap-3 md:gap-4">
		<div class="flex flex-wrap items-center gap-2">
			{#each data.topics as topic (topic.secondary)}
				<TopicTag topic={topic.secondary} />
			{/each}
			{#each data.districts as district (district)}
				<DistrictTag {district} />
			{/each}
		</div>
		<h1 class="wv-h6 wv-kondolar font-bold">
			{data.output}
		</h1>
	</div>
</div>

<div class="mx-auto flex max-w-4xl flex-col gap-6 p-3 md:gap-8 md:px-5 md:py-8">
	<h2 class="wv-h9 wv-kondolar border-b border-neutral-400 pb-2 font-bold text-neutral-600">
		บทบาทในสภาของ ส.ก. ที่เกี่ยวข้องกับเรื่องนี้
	</h2>

	{#each groupOrder as group (group)}
		{#if eventsByGroup.has(group) || remarksByGroup.has(group)}
			<section class="flex flex-col gap-4">
				<h3 class="wv-h8 wv-kondolar font-bold text-neutral-600">{EventGroupAction[group]}</h3>
				{#if eventsByGroup.has(group)}
					<div class="flex flex-col gap-3">
						{#each eventsByGroup.get(group) ?? [] as { id, status, reason, committeeSuggestion, committeeMembers, ...event } (id)}
							<div class="relative">
								<div {id} class="absolute inset-0 -top-12 h-0 md:-top-14"></div>
								<div class={focusedEvent === id ? 'highlight-blink' : ''}>
									<EventCard {...event}>
										{#if status}
											<StatusTag {status} {reason} />
										{/if}
										{#if group === EventGroup.CommitteeStudy}
											<Accordion.Root
												class="space-y-2"
												type="multiple"
												value={[
													...new Set([
														...(accordionValues[id] ?? []),
														...(!committeeSuggestion ? ['committeeSuggestion'] : [])
													])
												]}
												onValueChange={(v) => (accordionValues[id] = Array.isArray(v) ? v : [v])}
											>
												{#if committeeMembers?.length}
													<AccordionItem
														value="committeeMembers"
														title="รายชื่อคณะกรรมการ"
														onclose={() => closeAccordionItem(id, 'committeeMembers')}
													>
														{#snippet icon()}
															<Events />
														{/snippet}
														<CommitteeMembers memberSets={committeeMembers} />
													</AccordionItem>
												{/if}
												<AccordionItem
													value="committeeSuggestion"
													title="ข้อเสนอแนะและข้อสังเกตจากคณะกรรมการ"
													onclose={() => closeAccordionItem(id, 'committeeSuggestion')}
													disabled={!committeeSuggestion}
												>
													{#snippet icon()}
														<Idea />
													{/snippet}
													{#if committeeSuggestion}
														<MarkdownContent source={committeeSuggestion} />
													{:else}
														<EmptyRemark
															text="คณะกรรมการนี้รายงานเพียงความเป็นมา ขอบเขต และผลการศึกษา ไม่มีข้อเสนอแนะหรือข้อสังเกตเพิ่มเติม"
														/>
													{/if}
												</AccordionItem>
											</Accordion.Root>
										{/if}
									</EventCard>
								</div>
							</div>
						{/each}
					</div>
				{/if}

				{#if remarksByGroup.has(group)}
					<div
						class="flex flex-col items-center gap-4 rounded-lg border border-dashed border-neutral-500 p-4 md:p-8"
					>
						<EmptyRemark text={remarksByGroup.get(group) ?? ''} />
					</div>
				{/if}

				<a class="wv-b6 self-end text-blue-600 hover:underline" href="/?tab={group}"
					>ดู{group}อื่นๆ ในปี 2565-2568</a
				>
			</section>
		{/if}
	{/each}
</div>

<style>
	@keyframes blink-shadow {
		0%,
		100% {
			box-shadow: 0 0 0 0 transparent;
		}
		25% {
			box-shadow: 0 0 12px 6px rgba(59, 130, 246, 0.5);
		}
		50% {
			box-shadow: 0 0 0 0 transparent;
		}
		75% {
			box-shadow: 0 0 12px 6px rgba(59, 130, 246, 0.5);
		}
	}

	.highlight-blink {
		animation: blink-shadow 1.5s ease-in-out;
		border-radius: 0.5rem;
	}
</style>
