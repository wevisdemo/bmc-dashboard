<script lang="ts">
	import { Tabs } from 'bits-ui';
	import { Information } from 'carbon-icons-svelte';
	import type { EventGroup } from '$lib/constants';
	import Pagination from '$lib/inputs/pagination.svelte';
	import EventCard from '../event/event-card.svelte';
	import EmptyListLabel from './empty-list-label.svelte';
	import type { Event } from '../../routes/+page.server';
	import type { Snippet } from 'svelte';

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
	<div class="wv-b6 flex flex-row gap-1 px-5 md:px-6">
		<Information class="mt-0.5" />
		<div class="flex-1">
			<span class="font-bold">คำอธิบาย</span>
			<ul class="flex-1 list-disc">
				{@render children()}
			</ul>
		</div>
	</div>

	{#if displayEvents.length}
		<div class="flex flex-col gap-3 p-5 md:gap-4 md:p-6">
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
