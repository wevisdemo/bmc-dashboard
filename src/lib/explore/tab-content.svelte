<script lang="ts">
	import { InfoIcon } from 'phosphor-svelte';
	import type { Snippet } from 'svelte';
	import type { EventGroup } from '$lib/constants';
	import Pagination from '$lib/inputs/pagination.svelte';
	import { Tabs } from 'bits-ui';
	import type { Event } from '../../routes/+page.server';
	import EmptyListLabel from './empty-list-label.svelte';
	import EventCard from './event-card.svelte';

	const PER_PAGE = 10;

	interface Props {
		value: EventGroup;
		events: Event[];
		page: number;
		container?: HTMLDivElement;
		children: Snippet;
	}

	let { value, events, page = $bindable(), container, children }: Props = $props();

	let displayEvents = $derived(events.slice((page - 1) * PER_PAGE, page * PER_PAGE));
</script>

<Tabs.Content {value}>
	<div class="wv-b6 flex flex-row gap-1 px-3 md:px-5">
		<InfoIcon class="mt-0.5" />
		<div class="flex-1">
			<span class="font-bold">คำอธิบาย</span>
			<ul class="flex-1 list-disc">
				{@render children()}
			</ul>
		</div>
	</div>

	{#if displayEvents.length}
		<div class="flex flex-col gap-3 p-3 md:gap-4 md:px-6">
			{#each displayEvents as event (event.id)}
				<EventCard {...event} />
			{/each}
			<Pagination
				count={events.length}
				perPage={PER_PAGE}
				onpagechange={() =>
					setTimeout(() => container?.scrollIntoView({ behavior: 'smooth' }), 250)}
				bind:page
			/>
		</div>
	{:else}
		<EmptyListLabel class="px-5 py-24" />
	{/if}
</Tabs.Content>
