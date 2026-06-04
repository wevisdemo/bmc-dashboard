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
import type { Member } from '$lib/event/people-list.svelte';
import type { DateDisplay } from '$lib/types';
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
	status: Column('status', asOneOf(Object.values(BillStatus))),
	reason: Column('reason', asString().optional()),
	output: Column('output', asString()),
	title: Column('title', asString()),
	secondaryTopics: Column('topics_secondary', asArray(asString())),
	districts: Column('districts', asArray(asString())),
	proposedDate: Column('proposed_date', asDate()),
	reference: Column('link', asString())
});

export type Bill = StaticDecode<typeof billSchema> & {
	proposer: Proposer | undefined;
	coProposers: Member[];
	dateDisplay: DateDisplay;
	group: EventGroup.Bill;
};

export const bills: Bill[] = (await sheets.get('ข้อบัญญัติ', billSchema)).map((b) => {
	const [proposer, ...coProposers] = billProposers
		.filter((bp) => bp.id === b.id)
		.map((p) => resolveProposer(p.proposer))
		.filter((p): p is Proposer => p !== undefined);

	return {
		...b,
		proposer,
		coProposers,
		dateDisplay: {
			label: 'วันที่เสนอ',
			value: b.proposedDate.toLocaleDateString('th-TH', { dateStyle: 'long' })
		},
		group: EventGroup.Bill
	};
});
