import { topics, type Topic } from '$lib/sheets/topic';
import districtsData from '$lib/explore/bangkok-districts.json';
import type { FeatureCollection } from 'geojson';

export type TopicGroup = {
	main: Topic['main'];
	secondaries: Topic['secondary'][];
};

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

	return { topicGroups, districts };
}
