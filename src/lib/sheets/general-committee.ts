import { asArray, Column, Object, asNumber, asString, type StaticDecode } from 'sheethuahua';
import { EventGroup } from '$lib/constants';
import { sheets } from './spreadsheet';
import type { Proposer } from './proposer';

const generalCommitteeSchema = Object({
	id: Column('id', asString()),
	year: Column('year', asNumber()),
	output: Column('Output', asString()),
	committee: Column('GenCommitee_Title', asString()),
	committeeOutput: Column('GenCommitee_output_title', asString()),
	secondaryTopics: Column('Topic_Secondary', asArray(asString())),
	districts: Column('District', asArray(asString())),
	committeeSuggestion: Column('Commitee_Suggestion', asString().optional()),
	link: Column('pdf_link', asString())
});

export type GeneralCommittee = StaticDecode<typeof generalCommitteeSchema> & {
	proposer: Pick<Proposer, 'name'>;
	title: string;
	dateDisplay: string;
	group: EventGroup.CommitteeStudy;
};

export const generalCommittees: GeneralCommittee[] = (
	await sheets.get('วิสามัญทั่วไป', generalCommitteeSchema)
).map((gc) => ({
	...gc,
	proposer: { name: gc.committee },
	title: gc.committeeOutput,
	dateDisplay: `ปีที่ศึกษา พ.ศ. ${gc.year}`,
	group: EventGroup.CommitteeStudy
}));
