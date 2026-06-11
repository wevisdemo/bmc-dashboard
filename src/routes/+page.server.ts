import { AdditionalDistrictOption, EventGroup } from '$lib/constants';
import type EventCard from '$lib/event/event-card.svelte';
import { compareEventOrder } from '$lib/event/sort';
import districtsData from '$lib/explore/bangkok-districts.json';
import { outputs } from '$lib/output';
import { bills } from '$lib/sheets/bill';
import { billCommittees } from '$lib/sheets/bill-committee';
import { budgetCommittees } from '$lib/sheets/budget-committee';
import { generalCommittees } from '$lib/sheets/general-committee';
import { motions } from '$lib/sheets/motion';
import { budgetGroupsById, type BudgetGroup } from '$lib/sheets/organization-budget';
import { standingCommittees } from '$lib/sheets/standing-committee';
import { subjects } from '$lib/sheets/subject';
import { topics, sortSecondaryTopics, type Topic } from '$lib/sheets/topic';
import type { FeatureCollection } from 'geojson';
import type { ComponentProps } from 'svelte';

export type TopicGroup = {
	main: Topic['main'];
	secondaries: Topic['secondary'][];
};

export type Event = ComponentProps<typeof EventCard> & {
	id: string;
	budget?: BudgetGroup;
};

export function load() {
	const topicGroups: TopicGroup[] = [
		...topics.reduce(
			(m, { main, secondary }) => m.set(main, [...(m.get(main) ?? []), secondary]),
			new Map<string, string[]>()
		)
	].map(([main, secondaries]) => ({ main, secondaries }));

	const districts = [
		AdditionalDistrictOption.ALL,
		AdditionalDistrictOption.NotSpecified,
		...(districtsData as unknown as FeatureCollection).features
			.map((f) => f.properties as Record<string, string>)
			.map((props) => props.dname.replace('เขต', ''))
			.sort((a, b) => a.localeCompare(b, 'th'))
	];

	const idToHref = new Map(outputs.flatMap((o) => o.ids.map((id) => [id, `/outputs/${o.slug}`])));

	const events: Event[] = [
		...subjects,
		...motions,
		...[...standingCommittees, ...billCommittees, ...generalCommittees].sort(compareEventOrder),
		...bills,
		...budgetCommittees
	].map((e) => ({
		id: e.id,
		title: e.title,
		districts: [...e.districts].sort((a, b) => a.localeCompare(b, 'th')),
		topics: e.secondaryTopics ? sortSecondaryTopics(e.secondaryTopics) : [],
		proposer: e.proposer,
		dateDisplay: e.dateDisplay,
		href: idToHref.get(e.id),
		group: e.group,
		...('status' in e ? { status: e.status } : {}),
		...(e.group === EventGroup.Budget && budgetGroupsById.has(e.id)
			? { budget: budgetGroupsById.get(e.id) }
			: {})
	}));

	return { topicGroups, districts, events };
}
