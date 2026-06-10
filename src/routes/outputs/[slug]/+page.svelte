<script lang="ts">
	import { Accordion } from 'bits-ui';
	import { ChevronLeft, Events, Idea, Information } from 'carbon-icons-svelte';
	import { onMount } from 'svelte';
	import { EventGroup } from '$lib/constants';
	import AccordionItem from '$lib/event/accordion-item.svelte';
	import CommitteeMembers from '$lib/event/committee-members.svelte';
	import EmptyRemark from '$lib/event/empty-remark.svelte';
	import EventCard from '$lib/event/event-card.svelte';
	import MarkdownContent from '$lib/event/markdown-content.svelte';
	import OrganizationBudgets from '$lib/event/organization-budgets.svelte';
	import PeopleList from '$lib/event/people-list.svelte';
	import EventIcon from '$lib/icons/event-icon.svelte';
	import { resolvePath } from '$lib/paths';
	import RemarkMessage from '$lib/remark-message.svelte';
	import PageFooter from '$lib/sections/page-footer.svelte';
	import SeoHead from '$lib/seo-head.svelte';
	import DistrictTag from '$lib/tags/district-tag.svelte';
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

<SeoHead title={data.output} />

<div class="px-3 py-2 md:px-8 md:py-3">
	<a
		href={resolvePath('/')}
		class="wv-b6 flex flex-row items-center gap-2 hover:text-neutral-600 md:gap-4"
		><ChevronLeft /> สำรวจเรื่องที่ ส.ก. เสนอ</a
	>
</div>

<div class="bg-sky-100 px-5 py-16">
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

<div class="mx-auto flex max-w-4xl flex-col gap-6 px-5 pt-12 md:gap-8">
	<h2 class="wv-h9 wv-kondolar border-b border-neutral-400 pb-2 font-bold text-neutral-500">
		บทบาทในสภาของ ส.ก. ที่เกี่ยวข้องกับเรื่องนี้
	</h2>

	<div class="flex flex-col gap-12 md:gap-16">
		{#each groupOrder as group (group)}
			{#if eventsByGroup.has(group) || remarksByGroup.has(group)}
				<section class="flex flex-col gap-3 md:gap-4">
					<div class="flex items-center gap-3">
						<EventIcon {group} />
						<h3 class="wv-h6 wv-kondolar font-bold text-neutral-500">{EventGroupAction[group]}</h3>
					</div>
					{#if eventsByGroup.has(group)}
						<div class="flex flex-col gap-6 md:gap-8">
							{#each eventsByGroup.get(group) ?? [] as { id, committeeSuggestion, committeeMembers, coProposers, budget, ...event } (id)}
								<div class="relative">
									<div {id} class="absolute inset-0 -top-12 h-0 md:-top-14"></div>
									<div class={focusedEvent === id ? 'highlight-blink' : ''}>
										<EventCard {...event}>
											{#if coProposers?.length || committeeMembers?.length || group === EventGroup.CommitteeStudy}
												<Accordion.Root
													class="space-y-2 md:space-y-3"
													type="multiple"
													value={[
														...new Set([
															...(accordionValues[id] ?? []),
															...(!committeeSuggestion ? ['committeeSuggestion'] : [])
														])
													]}
													onValueChange={(v) => (accordionValues[id] = Array.isArray(v) ? v : [v])}
												>
													{#if coProposers?.length}
														<AccordionItem
															value="coProposers"
															title="ผู้ร่วมเสนอข้อบัญญัติ"
															onclose={() => closeAccordionItem(id, 'coProposers')}
														>
															{#snippet icon()}
																<Events />
															{/snippet}
															<RemarkMessage>
																{#snippet icon(props)}
																	<Information {...props} />
																{/snippet}
																พรรคที่ ส.ก. สังกัด อ้างอิงตาม พรรค ณ วันที่เริ่มดำรงตำแหน่ง ส.ก. ชุดที่
																13
															</RemarkMessage>
															<PeopleList members={coProposers} />
														</AccordionItem>
													{/if}
													{#if committeeMembers?.length}
														<AccordionItem
															value="committeeMembers"
															title="รายชื่อคณะกรรมการ{event.dateDisplay
																? ` ประจำปี พ.ศ. ${event.dateDisplay.value}`
																: ''}"
															onclose={() => closeAccordionItem(id, 'committeeMembers')}
														>
															{#snippet icon()}
																<Events />
															{/snippet}
															<RemarkMessage>
																{#snippet icon(props)}
																	<Information {...props} />
																{/snippet}
																<ul class="list-disc pl-4">
																	<li>
																		สมาชิกคณะกรรมการมาจากการแต่งตั้ง ส.ก. เข้าไปดำรงตำแหน่ง
																		โดยในบางโอกาส บุคคลภายนอก เช่น ผู้เชี่ยวชาญในประเด็นที่ศึกษา
																		ก็สามารถถูกเชิญมาดำรงตำแหน่งร่วมด้วย
																	</li>
																	<li>
																		ตำแหน่ง อ้างอิงตามตำแหน่งล่าสุดก่อนสิ้นสุดวาระหรือพ้นจากตำแหน่ง
																	</li>
																	<li>
																		พรรคที่ ส.ก. สังกัด อ้างอิงตาม <strong
																			>พรรค ณ วันที่เริ่มดำรงตำแหน่ง ส.ก. ชุดที่ 13</strong
																		>
																	</li>
																</ul>
															</RemarkMessage>
															<CommitteeMembers memberSets={committeeMembers} />
														</AccordionItem>
													{/if}
													{#if group === EventGroup.CommitteeStudy}
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
													{/if}
												</Accordion.Root>
											{/if}
											{#if budget}
												<OrganizationBudgets {budget} />
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

					<a
						class="wv-b6 self-end text-blue-600 hover:underline"
						href={resolvePath(`/?tab=${group}#list`)}
					>
						ดู{group}ทั้งหมดของ ส.ก. ชุดที่ 13</a
					>
				</section>
			{/if}
		{/each}
	</div>
</div>

<PageFooter
	pages={[
		{
			href: '/#explore',
			text: 'ยังมีอีกหลายเรื่องที่ ส.ก. พูดคุย เสนอ ศึกษา ผ่านกลไกสภา กทม. ตลอด 4 ปีที่ผ่านมา',
			buttonLabel: 'เลือกสำรวจรายการอื่น ๆ'
		},
		{
			href: '/duties',
			text: 'ส.ก. เป็นใคร ? ทำอะไรได้บ้าง ? มาแวะทำความเข้าใจงานต่าง ๆ ของ ส.ก. กันสักหน่อย',
			buttonLabel: 'ส.ก. ทำอะไรได้บ้าง'
		}
	]}
/>

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
