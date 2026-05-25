<script lang="ts">
	import { onMount } from 'svelte';
	import { EventGroup } from '$lib/constants';
	import EventCard from '$lib/event/event-card.svelte';
	import DistrictTag from '$lib/tags/district-tag.svelte';
	import TopicTag from '$lib/tags/topic-tag.svelte';

	let { data } = $props();

	let focusedEvent = $state('');

	const EventGroupAction = {
		[EventGroup.Subject]: 'ตั้งกระทู้',
		[EventGroup.Motion]: 'เสนอญัตติ',
		[EventGroup.CommitteeStudy]: 'ศึกษาในคณะกรรมการ',
		[EventGroup.Bill]: 'เสนอข้อบัญญัติ'
	};

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

	{#each data.groupedEvents as [group, events] (group)}
		<section class="flex flex-col gap-4">
			<h3 class="wv-h8 wv-kondolar font-bold text-neutral-600">{EventGroupAction[group]}</h3>
			<div class="flex flex-col gap-3">
				{#each events as { id, ...event } (id)}
					<div class="relative">
						<div {id} class="absolute inset-0 -top-12 h-0 md:-top-14"></div>
						<div class={focusedEvent === id ? 'highlight-blink' : ''}>
							<EventCard {...event} />
						</div>
					</div>
				{/each}
			</div>
			<a class="wv-b6 self-end text-blue-600 hover:underline" href="/?tab={group}"
				>ดู{group}อื่นๆ ในปี 2565-2568</a
			>
		</section>
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
