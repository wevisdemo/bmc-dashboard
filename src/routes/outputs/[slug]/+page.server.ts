import { error } from '@sveltejs/kit';
import { EventGroup } from '$lib/constants';
import type EventCard from '$lib/event/event-card.svelte';
import { outputs } from '$lib/output';
import { bills, type Bill } from '$lib/sheets/bill';
import { billCommittees, type BillCommittee } from '$lib/sheets/bill-committee';
import { billProposers } from '$lib/sheets/bill-proposer';
import { committees, type Committee } from '$lib/sheets/committee';
import { generalCommittees, type GeneralCommittee } from '$lib/sheets/general-committee';
import { members } from '$lib/sheets/member';
import memberImageMap from '$lib/sheets/member-images.json';
import { motions, type Motion } from '$lib/sheets/motion';
import { subjects, type Subject } from '$lib/sheets/subject';
import { topics } from '$lib/sheets/topic';
import type { ComponentProps } from 'svelte';

export type OutputEvent = Omit<ComponentProps<typeof EventCard>, 'group'> & {
	id: string;
	group: EventGroup;
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
	const memberByName = new Map(members.map((m) => [m.name, m]));

	function resolveProposer(name: string) {
		const member = memberByName.get(name);
		return member
			? {
					name: member.name,
					party: member.party,
					district: member.district,
					imageUrl: memberImageMap[name as keyof typeof memberImageMap]
				}
			: undefined;
	}

	for (const id of entry.ids) {
		const prefix = id.split('_')[0];
		const raw = getTableFromPrefix(prefix)?.find((t) => t.id === id);
		if (!raw) {
			console.warn(`[outputs/${entry.slug}] event id "${id}" not found`);
			continue;
		}

		for (const t of raw.secondaryTopics) allSecondaryTopics.add(t);
		for (const d of raw.districts) allDistricts.add(d);

		const event = toEventCard(raw, prefix, resolveProposer);

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
	raw: Subject | Motion | Committee | BillCommittee | GeneralCommittee | Bill,
	prefix: string,
	resolveProposer: (name: string) => OutputEvent['proposer']
): OutputEvent {
	if (prefix === 'subject') {
		const s = raw as Subject;
		return {
			id: s.id,
			title: s.title,
			districts: s.districts,
			topics: s.secondaryTopics,
			proposer: resolveProposer(s.proposer),
			date: s.year ? `ปีที่เสนอ พ.ศ. ${s.year}` : undefined,
			group: EventGroup.Subject
		};
	}

	if (prefix === 'motion') {
		const m = raw as Motion;
		return {
			id: m.id,
			title: m.title,
			districts: m.districts,
			topics: m.secondaryTopics,
			proposer: resolveProposer(m.proposer),
			date: m.year ? `ปีที่เสนอ พ.ศ. ${m.year}` : undefined,
			group: EventGroup.Motion
		};
	}

	if (prefix === 'com') {
		const c = raw as Committee;
		return {
			id: c.id,
			title: c.committeeOutput,
			districts: c.districts,
			topics: c.secondaryTopics,
			proposer: { name: c.committee },
			date: `ปีที่ศึกษา พ.ศ. ${c.year}`,
			group: EventGroup.CommitteeStudy
		};
	}

	if (prefix === 'billcom') {
		const bc = raw as BillCommittee;
		return {
			id: bc.id,
			title: bc.output,
			districts: bc.districts,
			topics: bc.secondaryTopics,
			proposer: { name: bc.committee },
			date: `ปีที่ศึกษา พ.ศ. ${bc.year}`,
			group: EventGroup.CommitteeStudy
		};
	}

	if (prefix === 'gencom') {
		const gc = raw as GeneralCommittee;
		return {
			id: gc.id,
			title: gc.committeeOutput,
			districts: gc.districts,
			topics: gc.secondaryTopics,
			proposer: { name: gc.committee },
			date: `ปีที่ศึกษา พ.ศ. ${gc.year}`,
			group: EventGroup.CommitteeStudy
		};
	}

	const b = raw as Bill;
	const proposerName = billProposers.find((bp) => bp.id === b.id)?.proposer;
	return {
		id: b.id,
		title: b.title,
		districts: b.districts,
		topics: b.secondaryTopics,
		proposer: proposerName ? resolveProposer(proposerName) : undefined,
		date:
			(b.enactedDate
				? `วันที่ประกาศใช้ ${b.enactedDate?.toLocaleDateString('th-TH', { dateStyle: 'long' })} | `
				: '') + `วันที่เสนอ ${b.proposedDate.toLocaleDateString('th-TH', { dateStyle: 'long' })}`,
		group: EventGroup.Bill,
		status: b.status
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
