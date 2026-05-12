import { asArray, Column, Object, asNumber, asString, type StaticDecode } from 'sheethuahua';
import { sheets } from './spreadsheet';

const generalCommitteeSchema = Object({
	id: Column('id', asString()),
	year: Column('year', asNumber()),
	output: Column('Output', asString()),
	title: Column('GenCommitee_Title', asString()),
	secondaryTopics: Column('Topic_Secondary', asArray(asString())),
	district: Column('District', asString()),
	committeeSuggestion: Column('Commitee_Suggestion', asString().optional()),
	link: Column('pdf_link', asString())
});

export type GeneralCommittee = StaticDecode<typeof generalCommitteeSchema>;

export const generalCommittees = await sheets.get('วิสามัญทั่วไป', generalCommitteeSchema);
