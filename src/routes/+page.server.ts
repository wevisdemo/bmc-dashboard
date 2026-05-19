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
import memberImageMap from '$lib/sheets/member-images.json';
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
			group: EntityTabGroup.Subject
		})),
		...motions.map((m) => ({
			id: m.id,
			title: m.title,
			districts: m.districts,
			topics: m.secondaryTopics,
			proposer: resolveProposer(m.proposer),
			date: m.year ? `ปีที่เสนอ พ.ศ. ${m.year}` : undefined,
			href: idToHref.get(m.id) ?? '#',
			group: EntityTabGroup.Motion
		})),
		...committees.map((c) => ({
			id: c.id,
			title: c.committeeOutput,
			districts: c.districts,
			topics: c.secondaryTopics,
			date: `ปีที่ศึกษา พ.ศ. ${c.year}`,
			href: idToHref.get(c.id) ?? '#',
			group: EntityTabGroup.CommitteeStudy
		})),
		...billCommittees.map((bc) => ({
			id: bc.id,
			title: bc.title,
			districts: bc.districts,
			topics: bc.secondaryTopics,
			date: `ปีที่ศึกษา พ.ศ. ${bc.year}`,
			href: idToHref.get(bc.id) ?? '#',
			group: EntityTabGroup.CommitteeStudy
		})),
		...generalCommittees.map((gc) => ({
			id: gc.id,
			title: gc.title,
			districts: gc.districts,
			topics: gc.secondaryTopics,
			date: `ปีที่ศึกษา พ.ศ. ${gc.year}`,
			href: idToHref.get(gc.id) ?? '#',
			group: EntityTabGroup.CommitteeStudy
		})),
		...bills.map((b) => ({
			id: b.id,
			title: b.title,
			districts: b.districts,
			topics: b.secondaryTopics,
			date:
				(b.enactedDate
					? `วันที่ประกาศใช้ ${b.enactedDate?.toLocaleDateString('th-TH', { dateStyle: 'long' })} | `
					: '') + `วันที่เสนอ ${b.proposedDate.toLocaleDateString('th-TH', { dateStyle: 'long' })}`,
			href: idToHref.get(b.id) ?? '#',
			group: EntityTabGroup.Bill,
			status: b.status
		}))
	];

	return { topicGroups, districts, events };
}
