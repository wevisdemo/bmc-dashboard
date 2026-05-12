import type { FeatureCollection } from 'geojson';
import type { ComponentProps } from 'svelte';
import { AdditionalDistrictOption, EntityTabGroup } from '$lib/constants';
import districtsData from '$lib/explore/bangkok-districts.json';
import type EventCard from '$lib/explore/event-card.svelte';
import { outputs } from '$lib/output';
import { bills } from '$lib/sheets/bill';
import { billCommittees } from '$lib/sheets/bill-committee';
import { committees } from '$lib/sheets/committee';
import { generalCommittees } from '$lib/sheets/general-committee';
import { members } from '$lib/sheets/member';
import { motions } from '$lib/sheets/motion';
import { subjects } from '$lib/sheets/subject';
import { topics, type Topic } from '$lib/sheets/topic';

export type TopicGroup = {
	main: Topic['main'];
	secondaries: Topic['secondary'][];
};

export type Event = ComponentProps<typeof EventCard> & { id: string; group: EntityTabGroup };

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
	const memberByName = new Map(members.map((m) => [m.name, m]));

	function resolveProposer(name: string) {
		const member = memberByName.get(name);
		return member
			? {
					name: member.name,
					party: member.party,
					district: member.district,
					imageUrl: member.imageUrl || undefined
				}
			: undefined;
	}

	function yearToDate(year: number) {
		return new Date(year, 0, 1);
	}

	const events: Event[] = [
		...subjects.map((s) => ({
			id: s.id,
			title: s.title,
			district: s.district,
			topics: s.secondaryTopics,
			proposer: resolveProposer(s.proposer),
			proposedDate: s.proposedDate,
			href: idToHref.get(s.id) ?? '#',
			group: EntityTabGroup.Subject
		})),
		...motions.map((m) => ({
			id: m.id,
			title: m.title,
			district: m.district,
			topics: m.secondaryTopics,
			proposer: resolveProposer(m.proposer),
			proposedDate: m.proposedDate,
			href: idToHref.get(m.id) ?? '#',
			group: EntityTabGroup.Motion
		})),
		...committees.map((c) => ({
			id: c.id,
			title: c.committeeOutput,
			district: c.district,
			topics: c.secondaryTopics,
			proposedDate: yearToDate(c.year),
			href: idToHref.get(c.id) ?? '#',
			group: EntityTabGroup.CommitteeStudy
		})),
		...billCommittees.map((bc) => ({
			id: bc.id,
			title: bc.title,
			district: bc.district,
			topics: bc.secondaryTopics,
			proposedDate: yearToDate(bc.year),
			href: idToHref.get(bc.id) ?? '#',
			group: EntityTabGroup.CommitteeStudy
		})),
		...generalCommittees.map((gc) => ({
			id: gc.id,
			title: gc.title,
			district: gc.district,
			topics: gc.secondaryTopics,
			proposedDate: yearToDate(gc.year),
			href: idToHref.get(gc.id) ?? '#',
			group: EntityTabGroup.CommitteeStudy
		})),
		...bills.map((b) => ({
			id: b.id,
			title: b.title,
			district: b.district,
			topics: b.secondaryTopics,
			proposedDate: b.proposedDate,
			href: idToHref.get(b.id) ?? '#',
			group: EntityTabGroup.Bill,
			status: b.status
		}))
	];

	return { topicGroups, districts, events };
}
