import { Column, Object as Obj, asOneOf, asString, type StaticDecode } from 'sheethuahua';
import { EventGroup } from '$lib/constants';
import { sheets } from './spreadsheet';

const missingEventSchema = Obj({
	output: Column('output_original', asString()),
	group: Column('disclaim_at', asOneOf(Object.values(EventGroup)).optional()),
	remark: Column('disclaim_text', asString().optional())
});

export const missingEvents = [
	...(await sheets.get('disclaim_text', missingEventSchema))
		.filter(
			(event): event is { output: string; group: EventGroup; remark: string } =>
				!!event.group && !!event.remark
		)
		.reduce(
			(acc, event) => acc.set(`${event.output}::${event.group}`, event),
			new Map<string, { output: string; group: EventGroup; remark: string }>()
		)
		.values()
];
