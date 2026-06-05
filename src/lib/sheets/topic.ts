import { Column, Object, asString, type StaticDecode } from 'sheethuahua';
import { sheets } from './spreadsheet';

const topicSchema = Object({
	main: Column('topic_main', asString()),
	secondary: Column('topic_secondary', asString()),
	color: Column('color', asString())
});

export type Topic = StaticDecode<typeof topicSchema>;

export const topics = await sheets.get('topic', topicSchema, { range: 'P:R' });

export const allSecondaryTopics = topics.map((t) => t.secondary);

export function sortSecondaryTopics(topics: string[]) {
	return topics.toSorted((a, z) => allSecondaryTopics.indexOf(a) - allSecondaryTopics.indexOf(z));
}

export const topicColorMap = new Map(
	topics.flatMap((t) => [
		[t.secondary, t.color],
		[t.main, t.color]
	])
);
