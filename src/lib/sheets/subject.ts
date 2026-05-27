import { asArray, asNumber, Column, Object, asString, type StaticDecode } from 'sheethuahua';
import { EventGroup } from '$lib/constants';
import type { DateDisplay } from '$lib/types';
import { resolveProposer, type Proposer } from './proposer';
import { sheets } from './spreadsheet';

const subjectSchema = Object({
	id: Column('id', asString()),
	output: Column('output', asString()),
	title: Column('title', asString()),
	secondaryTopics: Column('topics_secondary', asArray(asString())),
	districts: Column('districts', asArray(asString())),
	proposerName: Column('proposer', asString()),
	proposerDistrict: Column('proposer_district', asString()),
	year: Column('year', asNumber().optional()),
	reference: Column('link', asString())
});

export type Subject = StaticDecode<typeof subjectSchema> & {
	proposer: Proposer | undefined;
	dateDisplay: DateDisplay | undefined;
	group: EventGroup.Subject;
};

export const subjects: Subject[] = (await sheets.get('กระทู้ถาม', subjectSchema)).map((s) => ({
	...s,
	proposer: resolveProposer(s.proposerName),
	dateDisplay: s.year ? { label: 'ปีที่เสนอ', value: `${s.year}` } : undefined,
	group: EventGroup.Subject
}));
