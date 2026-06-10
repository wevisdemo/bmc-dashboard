import { error } from '@sveltejs/kit';
import { EventGroup } from '$lib/constants';
import type CommitteeMembers from '$lib/event/committee-members.svelte';
import type EventCard from '$lib/event/event-card.svelte';
import type { Member } from '$lib/event/people-list.svelte';
import { outputs } from '$lib/output';
import { adhocCommitteeMembers } from '$lib/sheets/adhoc-committee-member';
import { bills } from '$lib/sheets/bill';
import { billCommittees } from '$lib/sheets/bill-committee';
import { bmcMembers } from '$lib/sheets/bmc-member';
import { budgetCommittees } from '$lib/sheets/budget-committee';
import { generalCommittees } from '$lib/sheets/general-committee';
import { missingEvents } from '$lib/sheets/missing-event';
import { motions } from '$lib/sheets/motion';
import { budgetGroupsById, type BudgetGroup } from '$lib/sheets/organization-budget';
import { standingCommittees } from '$lib/sheets/standing-committee';
import { standingCommitteeMembers } from '$lib/sheets/standing-committee-member';
import { subjects } from '$lib/sheets/subject';
import { topics } from '$lib/sheets/topic';
import type { ComponentProps } from 'svelte';

type CommitteeMemberSet = ComponentProps<typeof CommitteeMembers>['memberSets'][number];

export type OutputEvent = ComponentProps<typeof EventCard> & {
	id: string;
	reason?: string;
	committeeSuggestion?: string;
	committeeMembers?: CommitteeMemberSet[];
	coProposers?: Member[];
	budget?: BudgetGroup;
};

export function entries() {
	return outputs.map(({ slug }) => ({ slug }));
}

export function load({ params }) {
	const entry = outputs.find((o) => o.slug === params.slug);
	if (!entry) error(404, `Output not found: ${params.slug}`);

	const events: OutputEvent[] = [];
	const outputTopics = new Set<string>();
	const allDistricts = new Set<string>();

	for (const id of entry.ids) {
		const prefix = id.split('_')[0];
		const event = tableIndexByPrefix.get(prefix)?.get(id);
		if (!event) {
			console.warn(`[outputs/${entry.slug}] event id "${id}" not found`);
			continue;
		}

		for (const t of event.secondaryTopics) outputTopics.add(t);
		for (const d of event.districts) allDistricts.add(d);

		events.push({
			id: event.id,
			title: event.title,
			proposer: event.proposer,
			dateDisplay: event.dateDisplay,
			group: event.group,
			...('status' in event ? { status: event.status } : {}),
			...('reason' in event ? { reason: event.reason } : {}),
			...('reference' in event ? { reference: event.reference } : {}),
			...('committeeSuggestion' in event ? { committeeSuggestion: event.committeeSuggestion } : {}),
			...('committee' in event
				? { committeeMembers: getCommitteeMembers(event.committee, event.dateDisplay.value) }
				: {}),
			...('coProposers' in event ? { coProposers: event.coProposers } : {}),
			...(event.group === EventGroup.Budget && budgetGroupsById.has(event.id)
				? { budget: budgetGroupsById.get(event.id) }
				: {})
		});
	}

	const remarks = missingEvents
		.filter((e) => e.output === entry.output)
		.map(({ group, remark }) => ({ group, remark }));

	return {
		output: entry.output,
		topics: topics.filter((t) => outputTopics.has(t.secondary)),
		districts: [...allDistricts].sort((a, b) => a.localeCompare(b, 'th')),
		events,
		remarks
	};
}

function getCommitteeMembers(committee: string, dateValue: string): CommitteeMemberSet[] {
	const standingSets = Object.values(
		standingCommitteeMembers
			.filter((m) => m.committee === committee && dateValue.includes(`${m.year}`))
			.map(({ committee: _, ...rest }) => ({
				...rest,
				party: bmcMembers.find((b) => b.name === rest.name)?.party
			}))
			.reduce(
				(acc, m) => {
					const set = m.set ?? 1;
					if (!acc[set]) acc[set] = { set, period: m.period, members: [] };
					acc[set].members.push(m);
					return acc;
				},
				{} as Record<number, CommitteeMemberSet>
			)
	);

	const adhocMembers = adhocCommitteeMembers
		.filter((m) => m.committee === committee)
		.map(({ committee: _c, ...rest }) => ({
			...rest,
			party: bmcMembers.find((b) => b.name === rest.name)?.party
		}));

	return [
		...standingSets,
		...(adhocMembers.length > 0 ? [{ set: 1, members: adhocMembers }] : [])
	].sort((a, z) => a.set - z.set);
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
			return standingCommittees;
		case 'budgetcom':
			return budgetCommittees;
		default:
			return undefined;
	}
}

const tableIndexByPrefix = new Map(
	['subject', 'motion', 'bill', 'billcom', 'gencom', 'com', 'budgetcom'].map((prefix) => [
		prefix,
		new Map(getTableFromPrefix(prefix)?.map((e) => [e.id, e]) ?? [])
	])
);
