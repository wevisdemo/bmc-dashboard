import { asArray, asNumber, Column, Object, asString, type StaticDecode } from 'sheethuahua';
import { sheets } from './spreadsheet';

const subjectSchema = Object({
	id: Column('id', asString()),
	output: Column('Output', asString()),
	title: Column('Subject_Title', asString()),
	secondaryTopics: Column('Topic_Secondary', asArray(asString())),
	districts: Column('District', asArray(asString())),
	proposer: Column('Proposer', asString()),
	proposerDistrict: Column('Proposser_District', asString()),
	year: Column('year', asNumber().optional()),
	link: Column('Link_Doc', asString())
});

export type Subject = StaticDecode<typeof subjectSchema>;

export const subjects = await sheets.get('กระทู้ถาม', subjectSchema);
