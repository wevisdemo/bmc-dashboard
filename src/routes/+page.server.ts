import { AdditionalDistrictOption } from '$lib/constants';
import type EventCard from '$lib/event/event-card.svelte';
import districtsData from '$lib/explore/bangkok-districts.json';
import { outputs } from '$lib/output';
import { bills } from '$lib/sheets/bill';
import { billCommittees } from '$lib/sheets/bill-committee';
import { generalCommittees } from '$lib/sheets/general-committee';
import { motions } from '$lib/sheets/motion';
import { standingCommittees } from '$lib/sheets/standing-committee';
import { subjects } from '$lib/sheets/subject';
import { topics, type Topic } from '$lib/sheets/topic';
import type { FeatureCollection } from 'geojson';
import type { ComponentProps } from 'svelte';

export type TopicGroup = {
	main: Topic['main'];
	secondaries: Topic['secondary'][];
};

export type Event = ComponentProps<typeof EventCard> & { id: string };

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
		...standingCommittees,
		...billCommittees,
		...generalCommittees,
		...bills
	].map((e) => ({
		id: e.id,
		title: e.title,
		districts: e.districts,
		topics: e.secondaryTopics,
		proposer: e.proposer,
		dateDisplay: e.dateDisplay,
		href: `${idToHref.get(e.id)}#${e.id}`,
		group: e.group,
		...('status' in e ? { status: e.status } : {})
	}));

	return { topicGroups, districts, events };
}
