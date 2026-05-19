import { asArray, asNumber, Column, Object, asString, type StaticDecode } from 'sheethuahua';
import { sheets } from './spreadsheet';

const motionSchema = Object({
	id: Column('id', asString()),
	output: Column('Output', asString()),
	title: Column('Motion_Title', asString()),
	secondaryTopics: Column('Topic_Secondary', asArray(asString())),
	districts: Column('District', asArray(asString())),
	proposer: Column('Proposer', asString()),
	proposerDistrict: Column('Proposer_District', asString()),
	year: Column('year', asNumber().optional()),
	link: Column('Link_Doc', asString().optional())
});

export type Motion = StaticDecode<typeof motionSchema>;

export const motions = await sheets.get('ญัตติ', motionSchema);
