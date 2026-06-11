import type EventCard from '$lib/event/event-card.svelte';
import type { ComponentProps } from 'svelte';

type SortableEvent = Pick<ComponentProps<typeof EventCard>, 'dateDisplay' | 'proposer'>;

export function compareEventOrder(a: SortableEvent, z: SortableEvent): number {
	const dateCmp = normalizedDate(z.dateDisplay?.value).localeCompare(
		normalizedDate(a.dateDisplay?.value),
		'th'
	);
	if (dateCmp !== 0) return dateCmp;
	return (z.proposer?.name ?? '').localeCompare(a.proposer?.name ?? '', 'th');
}

function normalizedDate(date?: string) {
	return date ? date.split(' ').reverse().join(' ') : '';
}
