import { asArray, asNumber, Column, Object, asString, type StaticDecode } from 'sheethuahua';
import { EventGroup } from '$lib/constants';
import { resolveProposer, type Proposer } from './proposer';
import { sheets } from './spreadsheet';

const motionSchema = Object({
	id: Column('id', asString()),
	output: Column('Output', asString()),
	title: Column('Motion_Title', asString()),
	secondaryTopics: Column('Topic_Secondary', asArray(asString())),
	districts: Column('District', asArray(asString())),
	proposerName: Column('Proposer', asString()),
	proposerDistrict: Column('Proposer_District', asString()),
	year: Column('year', asNumber().optional()),
	reference: Column('Link_Doc', asString().optional())
});

export type Motion = StaticDecode<typeof motionSchema> & {
	proposer: Proposer | undefined;
	dateDisplay: string | undefined;
	group: EventGroup.Motion;
};

export const motions: Motion[] = (await sheets.get('ญัตติ', motionSchema)).map((m) => ({
	...m,
	proposer: resolveProposer(m.proposerName),
	dateDisplay: m.year ? `ปีที่เสนอ พ.ศ. ${m.year}` : undefined,
	group: EventGroup.Motion
}));
