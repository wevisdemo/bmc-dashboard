import {
	asArray,
	asDate,
	asOneOf,
	Column,
	Object as Obj,
	asString,
	type StaticDecode
} from 'sheethuahua';
import { EventGroup } from '$lib/constants';
import { billProposers } from './bill-proposer';
import { resolveProposer, type Proposer } from './proposer';
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
	reason: Column('Reason', asString().optional()),
	output: Column('Output', asString()),
	title: Column('Bill_Title', asString()),
	secondaryTopics: Column('Topic_Secondary', asArray(asString())),
	districts: Column('District', asArray(asString())),
	proposedDate: Column('Proposed_Date', asDate()),
	enactedDate: Column('Enacted_Date', asDate().optional()),
	reference: Column('Link', asString())
});

export type Bill = StaticDecode<typeof billSchema> & {
	proposer: Proposer | undefined;
	dateDisplay: string;
	group: EventGroup.Bill;
};

export const bills: Bill[] = (await sheets.get('ข้อบัญญัติ', billSchema)).map((b) => {
	const proposerName = billProposers.find((bp) => bp.id === b.id)?.proposer;
	return {
		...b,
		proposer: proposerName ? resolveProposer(proposerName) : undefined,
		dateDisplay:
			(b.enactedDate
				? `วันที่ประกาศใช้ ${b.enactedDate?.toLocaleDateString('th-TH', { dateStyle: 'long' })} | `
				: '') + `วันที่เสนอ ${b.proposedDate.toLocaleDateString('th-TH', { dateStyle: 'long' })}`,
		group: EventGroup.Bill
	};
});
