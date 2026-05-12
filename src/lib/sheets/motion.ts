import { asArray, Column, Object, asDate, asString, type StaticDecode } from 'sheethuahua';
import { sheets } from './spreadsheet';

const motionSchema = Object({
	id: Column('id', asString()),
	output: Column('Output', asString()),
	title: Column('Motion_Title', asString()),
	secondaryTopics: Column('Topic_Secondary', asArray(asString())),
	district: Column('District', asString()),
	proposer: Column('Proposer', asString()),
	proposerDistrict: Column('Proposer_District', asString()),
	proposedDate: Column('Proposed_Date', asDate().optional()),
	link: Column('Link_Doc', asString().optional())
});

export type Motion = StaticDecode<typeof motionSchema>;

export const motions = await sheets.get('ญัตติ', motionSchema);
