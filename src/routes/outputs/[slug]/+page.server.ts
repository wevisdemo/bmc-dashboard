import { error } from '@sveltejs/kit';
import { EventGroup } from '$lib/constants';
import type EventCard from '$lib/event/event-card.svelte';
import { outputs } from '$lib/output';
import { bills, type Bill } from '$lib/sheets/bill';
import { billCommittees, type BillCommittee } from '$lib/sheets/bill-committee';
import { committees, type Committee } from '$lib/sheets/committee';
import { generalCommittees, type GeneralCommittee } from '$lib/sheets/general-committee';
import { motions, type Motion } from '$lib/sheets/motion';
import { subjects, type Subject } from '$lib/sheets/subject';
import { topics } from '$lib/sheets/topic';
import type { ComponentProps } from 'svelte';

export type OutputEvent = ComponentProps<typeof EventCard> & {
	id: string;
};

type GroupedEvents = readonly (readonly [EventGroup, OutputEvent[]])[];

const groupOrder = [
	EventGroup.Subject,
	EventGroup.Motion,
	EventGroup.CommitteeStudy,
	EventGroup.Bill
];

export function entries() {
	return outputs.map(({ slug }) => ({ slug }));
}

export function load({ params }) {
	const entry = outputs.find((o) => o.slug === params.slug);
	if (!entry) error(404, `Output not found: ${params.slug}`);

	const events: OutputEvent[] = [];
	const allSecondaryTopics = new Set<string>();
	const allDistricts = new Set<string>();

	for (const id of entry.ids) {
		const prefix = id.split('_')[0];
		const raw = getTableFromPrefix(prefix)?.find((t) => t.id === id);
		if (!raw) {
			console.warn(`[outputs/${entry.slug}] event id "${id}" not found`);
			continue;
		}

		for (const t of raw.secondaryTopics) allSecondaryTopics.add(t);
		for (const d of raw.districts) allDistricts.add(d);

		const event = toEventCard(raw);
		events.push(event);
	}

	const groupedEvents: GroupedEvents = [
		...events.reduce(
			(acc, event) => acc.set(event.group, [...(acc.get(event.group) ?? []), event]),
			new Map<EventGroup, OutputEvent[]>()
		)
	]
		.map(([group, evts]) => [group, evts.toSorted((a, b) => a.id.localeCompare(b.id))] as const)
		.toSorted(([a], [b]) => groupOrder.indexOf(a) - groupOrder.indexOf(b));

	return {
		output: entry.output,
		topics: topics.filter((t) => allSecondaryTopics.has(t.secondary)),
		districts: [...allDistricts],
		groupedEvents
	};
}

function toEventCard(
	event: Subject | Motion | Committee | BillCommittee | GeneralCommittee | Bill
): OutputEvent {
	return {
		id: event.id,
		title: event.title,
		proposer: event.proposer,
		dateDisplay: event.dateDisplay,
		group: event.group,
		...('status' in event ? { status: event.status } : {}),
		...('reference' in event ? { reference: event.reference } : {})
	};
}

function getTableFromPrefix(prefix?: string) {
	switch (prefix) {
		case 'subject':
			return subjects;
		case 'motion':
			return motions;
		case 'bill':
			return bills;
		case 'billcom':
			return billCommittees;
		case 'gencom':
			return generalCommittees;
		case 'com':
			return committees;
		default:
			return undefined;
	}
}
