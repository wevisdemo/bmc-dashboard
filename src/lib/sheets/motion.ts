import { asArray, asNumber, Column, Object, asString, type StaticDecode } from 'sheethuahua';
import { EventGroup } from '$lib/constants';
import { resolveProposer, type Proposer } from './proposer';
import { sheets } from './spreadsheet';

const motionSchema = Object({
	id: Column('id', asString()),
	output: Column('output', asString()),
	title: Column('title', asString()),
	secondaryTopics: Column('topics_secondary', asArray(asString())),
	districts: Column('districts', asArray(asString())),
	proposerName: Column('proposer', asString()),
	proposerDistrict: Column('proposer_district', asString()),
	year: Column('year', asNumber().optional()),
	reference: Column('link', asString().optional())
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
