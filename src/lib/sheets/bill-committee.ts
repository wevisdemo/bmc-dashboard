import { asArray, Column, Object, asNumber, asString, type StaticDecode } from 'sheethuahua';
import { EventGroup } from '$lib/constants';
import { sheets } from './spreadsheet';
import type { Proposer } from './proposer';

const billCommitteeSchema = Object({
	id: Column('id', asString()),
	year: Column('year', asNumber()),
	output: Column('Output', asString()),
	committee: Column('BillCommitee_Title', asString()),
	secondaryTopics: Column('Topic_Secondary', asArray(asString())),
	districts: Column('District', asArray(asString())),
	committeeSuggestion: Column('Commitee_Suggestion', asString().optional()),
	link: Column('pdf_link', asString())
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
