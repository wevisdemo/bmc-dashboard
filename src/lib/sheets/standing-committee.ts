import { Column, Object, asArray, asNumber, asString, type StaticDecode } from 'sheethuahua';
import { EventGroup } from '$lib/constants';
import { sheets } from './spreadsheet';
import type { Proposer } from './proposer';

const standingCommitteeSchema = Object({
	id: Column('id', asString()),
	committee: Column('committee_title', asString()),
	year: Column('year', asNumber()),
	output: Column('output', asString()),
	committeeOutput: Column('output_full', asString()),
	secondaryTopics: Column('topics_secondary', asArray(asString()).optional([])),
	districts: Column('districts', asArray(asString())),
	committeeSuggestion: Column('committee_suggestion', asString().optional()),
	reference: Column('link', asString())
});

export type StandingCommittee = StaticDecode<typeof standingCommitteeSchema> & {
	proposer: Pick<Proposer, 'name'>;
	title: string;
	dateDisplay: string;
	group: EventGroup.CommitteeStudy;
};

export const standingCommittees: StandingCommittee[] = (
	await sheets.get('สามัญ', standingCommitteeSchema)
).map((c) => ({
	...c,
	proposer: { name: c.committee },
	title: c.committeeOutput,
	dateDisplay: `ปีที่ศึกษา พ.ศ. ${c.year}`,
	group: EventGroup.CommitteeStudy
}));
