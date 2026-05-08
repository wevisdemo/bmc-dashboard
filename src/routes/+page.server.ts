import { topics, type Topic } from '$lib/sheets/topic';
import districtsData from '$lib/explore/bangkok-districts.json';
import type { FeatureCollection } from 'geojson';
import { motions } from '$lib/sheets/motion';
import { members } from '$lib/sheets/member';
import type { ComponentProps } from 'svelte';
import type EventCard from '$lib/explore/event-card.svelte';

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
		'ภาพรวมกรุงเทพมหานคร',
		...(districtsData as unknown as FeatureCollection).features
			.map((f) => f.properties as Record<string, string>)
			.map((props) => props.dname.replace('เขต', ''))
			.sort((a, b) => a.localeCompare(b, 'th'))
	];

	const memberByName = new Map(members.map((m) => [m.name, m]));

	const events: Event[] = motions.map((motion) => {
		const member = memberByName.get(motion.proposer);
		return {
			id: motion.id,
			title: motion.title,
			district: motion.district,
			topics: motion.secondaryTopics,
			proposer: member
				? {
						name: member.name,
						party: member.party,
						district: member.district,
						imageUrl: member.imageUrl || undefined
					}
				: undefined,
			proposedDate: motion.proposedDate,
			// WIP: replace with slug when ready
			href: '#'
		};
	});

	return { topicGroups, districts, events };
}
