import { asArray, Column, Object, asNumber, asString, type StaticDecode } from 'sheethuahua';
import { EventGroup } from '$lib/constants';
import { sheets } from './spreadsheet';
import type { Proposer } from './proposer';

const billCommitteeSchema = Object({
	id: Column('id', asString()),
	year: Column('year', asNumber()),
	output: Column('output', asString()),
	committee: Column('committee_title', asString()),
	secondaryTopics: Column('topics_secondary', asArray(asString())),
	districts: Column('districts', asArray(asString())),
	committeeSuggestion: Column('committee_suggestion', asString().optional()),
	reference: Column('link', asString())
});

export type BillCommittee = StaticDecode<typeof billCommitteeSchema> & {
	proposer: Pick<Proposer, 'name'>;
	title: string;
	dateDisplay: string;
	group: EventGroup.CommitteeStudy;
};

export const billCommittees: BillCommittee[] = (
	await sheets.get('วิสามัญข้อบัญญัติ', billCommitteeSchema)
).map((bc) => ({
	...bc,
	proposer: { name: bc.committee },
	title: bc.output,
	dateDisplay: `ปีที่ศึกษา พ.ศ. ${bc.year}`,
	group: EventGroup.CommitteeStudy
}));
