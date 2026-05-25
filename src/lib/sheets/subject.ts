import { asArray, asNumber, Column, Object, asString, type StaticDecode } from 'sheethuahua';
import { EventGroup } from '$lib/constants';
import { resolveProposer, type Proposer } from './proposer';
import { sheets } from './spreadsheet';

const subjectSchema = Object({
	id: Column('id', asString()),
	output: Column('Output', asString()),
	title: Column('Subject_Title', asString()),
	secondaryTopics: Column('Topic_Secondary', asArray(asString())),
	districts: Column('District', asArray(asString())),
	proposerName: Column('Proposer', asString()),
	proposerDistrict: Column('Proposser_District', asString()),
	year: Column('year', asNumber().optional()),
	reference: Column('Link_Doc', asString())
});

export type Subject = StaticDecode<typeof subjectSchema> & {
	proposer: Proposer | undefined;
	dateDisplay: string | undefined;
	group: EventGroup.Subject;
};

export const subjects: Subject[] = (await sheets.get('กระทู้ถาม', subjectSchema)).map((s) => ({
	...s,
	proposer: resolveProposer(s.proposerName),
	dateDisplay: s.year ? `ปีที่เสนอ พ.ศ. ${s.year}` : undefined,
	group: EventGroup.Subject
}));
