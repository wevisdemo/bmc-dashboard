import type { FeatureCollection } from 'geojson';
import type { ComponentProps } from 'svelte';
import { AdditionalDistrictOption, EntityTabGroup } from '$lib/constants';
import districtsData from '$lib/explore/bangkok-districts.json';
import type EventCard from '$lib/explore/event-card.svelte';
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
		AdditionalDistrictOption.BangkokOverall,
		...(districtsData as unknown as FeatureCollection).features
			.map((f) => f.properties as Record<string, string>)
			.map((props) => props.dname.replace('เขต', ''))
			.sort((a, b) => a.localeCompare(b, 'th'))
	];

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

	const subjectEvents: Event[] = subjects.map((subject) => ({
		id: subject.id,
		title: subject.title,
		district: subject.district,
		topics: subject.secondaryTopics,
		proposer: resolveProposer(subject.proposer),
		proposedDate: subject.proposedDate,
		href: '#',
		group: EntityTabGroup.Subject
	}));

	const motionEvents: Event[] = motions.map((motion) => ({
		id: motion.id,
		title: motion.title,
		district: motion.district,
		topics: motion.secondaryTopics,
		proposer: resolveProposer(motion.proposer),
		proposedDate: motion.proposedDate,
		href: '#',
		group: EntityTabGroup.Motion
	}));

	const committeeEvents: Event[] = committees.map((committee) => ({
		id: committee.id,
		title: committee.committeeOutput,
		district: committee.district,
		topics: committee.secondaryTopics,
		proposedDate: yearToDate(committee.year),
		href: '#',
		group: EntityTabGroup.CommitteeStudy
	}));

	const billCommitteeEvents: Event[] = billCommittees.map((bc) => ({
		id: bc.id,
		title: bc.title,
		district: bc.district,
		topics: bc.secondaryTopics,
		proposedDate: yearToDate(bc.year),
		href: '#',
		group: EntityTabGroup.CommitteeStudy
	}));

	const generalCommitteeEvents: Event[] = generalCommittees.map((gc) => ({
		id: gc.id,
		title: gc.title,
		district: gc.district,
		topics: gc.secondaryTopics,
		proposedDate: yearToDate(gc.year),
		href: '#',
		group: EntityTabGroup.CommitteeStudy
	}));

	const billEvents: Event[] = bills.map((bill) => ({
		id: bill.id,
		title: bill.title,
		district: bill.district,
		topics: bill.secondaryTopics,
		proposedDate: bill.proposedDate,
		href: '#',
		group: EntityTabGroup.Bill,
		status: bill.status
	}));

	const events: Event[] = [
		...subjectEvents,
		...motionEvents,
		...committeeEvents,
		...billCommitteeEvents,
		...generalCommitteeEvents,
		...billEvents
	];

	return { topicGroups, districts, events };
}
