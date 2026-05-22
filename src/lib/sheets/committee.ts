import { Column, Object, asArray, asNumber, asString, type StaticDecode } from 'sheethuahua';
import { EventGroup } from '$lib/constants';
import { sheets } from './spreadsheet';
import type { Proposer } from './proposer';

const committeeSchema = Object({
	id: Column('id', asString()),
	committee: Column('Commitee_Title', asString()),
	year: Column('year', asNumber()),
	output: Column('Output', asString()),
	committeeOutput: Column('Committee_output_title', asString()),
	secondaryTopics: Column('Topic_Secondary', asArray(asString()).optional([])),
	districts: Column('District', asArray(asString())),
	committeeSuggestion: Column('Commitee_Suggestion', asString().optional()),
	link: Column('url', asString()),
	mentionMotion: Column('mention_motion', asArray(asString()).optional([]))
});

export type Committee = StaticDecode<typeof committeeSchema> & {
	proposer: Pick<Proposer, 'name'>;
	title: string;
	dateDisplay: string;
	group: EventGroup.CommitteeStudy;
};

export const committees: Committee[] = (await sheets.get('สามัญ', committeeSchema)).map((c) => ({
	...c,
	proposer: { name: c.committee },
	title: c.committeeOutput,
	dateDisplay: `ปีที่ศึกษา พ.ศ. ${c.year}`,
	group: EventGroup.CommitteeStudy
}));
