import { asArray, Column, Object, asNumber, asString, type StaticDecode } from 'sheethuahua';
import { sheets } from './spreadsheet';

const billCommitteeSchema = Object({
	id: Column('id', asString()),
	year: Column('year', asNumber()),
	output: Column('Output', asString()),
	title: Column('BillCommitee_Title', asString()),
	secondaryTopics: Column('Topic_Secondary', asArray(asString())),
	district: Column('District', asString()),
	committeeSuggestion: Column('Commitee_Suggestion', asString().optional()),
	pdfLink: Column('pdf_link', asString())
});

export type BillCommittee = StaticDecode<typeof billCommitteeSchema>;

export const billCommittees = await sheets.get('วิสามัญข้อบัญญัติ', billCommitteeSchema);
