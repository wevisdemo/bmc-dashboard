import { asArray, Column, Object, asNumber, asString, type StaticDecode } from 'sheethuahua';
import { EventGroup } from '$lib/constants';
import type { DateDisplay } from '$lib/types';
import { sheets } from './spreadsheet';
import type { Proposer } from './proposer';

const generalCommitteeSchema = Object({
	id: Column('id', asString()),
	year: Column('year', asNumber()),
	output: Column('output', asString()),
	committee: Column('committee_title', asString()),
	committeeOutput: Column('output_full', asString()),
	secondaryTopics: Column('topics_secondary', asArray(asString())),
	districts: Column('districts', asArray(asString())),
	committeeSuggestion: Column('committee_suggestion', asString().optional()),
	reference: Column('link', asString())
});

export type GeneralCommittee = StaticDecode<typeof generalCommitteeSchema> & {
	proposer: Pick<Proposer, 'name'>;
	title: string;
	dateDisplay: DateDisplay;
	group: EventGroup.CommitteeStudy;
};

export const generalCommittees: GeneralCommittee[] = (
	await sheets.get('วิสามัญทั่วไป', generalCommitteeSchema)
).map((gc) => ({
	...gc,
	proposer: { name: gc.committee },
	title: gc.committeeOutput,
	dateDisplay: { label: 'ปีที่ศึกษา', value: `${gc.year}` },
	group: EventGroup.CommitteeStudy
}));
