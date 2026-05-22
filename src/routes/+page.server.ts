import { AdditionalDistrictOption, EventGroup } from '$lib/constants';
import type EventCard from '$lib/event/event-card.svelte';
import districtsData from '$lib/explore/bangkok-districts.json';
import { outputs } from '$lib/output';
import { bills } from '$lib/sheets/bill';
import { billCommittees } from '$lib/sheets/bill-committee';
import { billProposers } from '$lib/sheets/bill-proposer';
import { committees } from '$lib/sheets/committee';
import { generalCommittees } from '$lib/sheets/general-committee';
import { members } from '$lib/sheets/member';
import memberImageMap from '$lib/sheets/member-images.json';
import { motions } from '$lib/sheets/motion';
import { subjects } from '$lib/sheets/subject';
import { topics, type Topic } from '$lib/sheets/topic';
import type { FeatureCollection } from 'geojson';
import type { ComponentProps } from 'svelte';

export type TopicGroup = {
	main: Topic['main'];
	secondaries: Topic['secondary'][];
};

export type Event = ComponentProps<typeof EventCard> & { id: string; group: EventGroup };

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
					imageUrl: memberImageMap[name as keyof typeof memberImageMap]
				}
			: undefined;
	}

	const events: Event[] = [
		...subjects.map((s) => ({
			id: s.id,
			title: s.title,
			districts: s.districts,
			topics: s.secondaryTopics,
			proposer: resolveProposer(s.proposer),
			date: s.year ? `ปีที่เสนอ พ.ศ. ${s.year}` : undefined,
			href: idToHref.get(s.id) ?? '#',
			group: EventGroup.Subject
		})),
		...motions.map((m) => ({
			id: m.id,
			title: m.title,
			districts: m.districts,
			topics: m.secondaryTopics,
			proposer: resolveProposer(m.proposer),
			date: m.year ? `ปีที่เสนอ พ.ศ. ${m.year}` : undefined,
			href: idToHref.get(m.id) ?? '#',
			group: EventGroup.Motion
		})),
		...committees.map((c) => ({
			id: c.id,
			title: c.committeeOutput,
			districts: c.districts,
			topics: c.secondaryTopics,
			proposer: { name: c.committee },
			date: `ปีที่ศึกษา พ.ศ. ${c.year}`,
			href: idToHref.get(c.id) ?? '#',
			group: EventGroup.CommitteeStudy
		})),
		...billCommittees.map((bc) => ({
			id: bc.id,
			title: bc.output,
			districts: bc.districts,
			topics: bc.secondaryTopics,
			proposer: { name: bc.committee },
			date: `ปีที่ศึกษา พ.ศ. ${bc.year}`,
			href: idToHref.get(bc.id) ?? '#',
			group: EventGroup.CommitteeStudy
		})),
		...generalCommittees.map((gc) => ({
			id: gc.id,
			title: gc.committeeOutput,
			districts: gc.districts,
			topics: gc.secondaryTopics,
			proposer: { name: gc.committee },
			date: `ปีที่ศึกษา พ.ศ. ${gc.year}`,
			href: idToHref.get(gc.id) ?? '#',
			group: EventGroup.CommitteeStudy
		})),
		...bills.map((b) => {
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
				href: idToHref.get(b.id) ?? '#',
				group: EventGroup.Bill,
				status: b.status
			};
		})
	];

	return { topicGroups, districts, events };
}
