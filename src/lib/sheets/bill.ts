import {
	asArray,
	asDate,
	asOneOf,
	Column,
	Object as Obj,
	asString,
	type StaticDecode
} from 'sheethuahua';
import { sheets } from './spreadsheet';

export enum BillStatus {
	ENACTED = 'ENACTED',
	IN_PROGRESS = 'IN PROGRESS',
	REJECTED = 'REJECTED',
	IN_QUEUE = 'IN QUEUE'
}

const billSchema = Obj({
	id: Column('id', asString()),
	status: Column('Status', asOneOf(Object.values(BillStatus))),
	reason: Column('Reason', asString()),
	output: Column('Output', asString()),
	title: Column('Bill_Title', asString()),
	secondaryTopics: Column('Topic_Secondary', asArray(asString())),
	district: Column('District', asString()),
	proposedDate: Column('Proposed_Date', asDate()),
	enactedDate: Column('Enacted_Date', asDate().optional()),
	link: Column('Link', asString())
});

export type Bill = StaticDecode<typeof billSchema>;

export const bills = await sheets.get('ข้อบัญญัติ', billSchema);
