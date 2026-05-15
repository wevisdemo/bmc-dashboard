import { error } from '@sveltejs/kit';
import { outputs } from '$lib/output';
import { bills, type Bill } from '$lib/sheets/bill';
import { billCommittees, type BillCommittee } from '$lib/sheets/bill-committee';
import { committees, type Committee } from '$lib/sheets/committee';
import { generalCommittees, type GeneralCommittee } from '$lib/sheets/general-committee';
import { motions, type Motion } from '$lib/sheets/motion';
import { subjects, type Subject } from '$lib/sheets/subject';
import { topics } from '$lib/sheets/topic';

export type OutputEvent = Omit<
	Subject | Motion | Bill | Committee | BillCommittee | GeneralCommittee,
	'output' | 'secondaryTopics' | 'districts'
>;

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
		const raw = getTableFromPrefix(id.split('_')[0])?.find((t) => t.id === id);
		if (raw) {
			for (const t of raw.secondaryTopics) allSecondaryTopics.add(t);
			for (const d of raw.districts) allDistricts.add(d);
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { secondaryTopics, districts, output, ...event } = raw;
			events.push(event as OutputEvent);
		} else {
			console.warn(`[outputs/${entry.slug}] event id "${id}" not found`);
		}
	}

	return {
		output: entry.output,
		topics: topics.filter((t) => allSecondaryTopics.has(t.secondary)),
		districts: [...allDistricts],
		events
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
