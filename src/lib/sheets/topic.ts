import { Column, Object, asString, type StaticDecode } from 'sheethuahua';
import { sheets } from './spreadsheet';

const topicSchema = Object({
	main: Column('Topic_Main', asString()),
	secondary: Column('Topic_Secondary', asString()),
	color: Column('Color', asString())
});

export type Topic = StaticDecode<typeof topicSchema>;

export const topics = await sheets.get('topic', topicSchema, { range: 'P:R' });

export const topicColorMap = new Map(
	topics.flatMap((t) => [
		[t.secondary, t.color],
		[t.main, t.color]
	])
);

console.log(topicColorMap);
