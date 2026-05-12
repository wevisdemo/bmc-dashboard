import { Column, Object, asString, type StaticDecode } from 'sheethuahua';
import { sheets } from './spreadsheet';

const matchedOutputSchema = Object({
	output: Column('output', asString()),
	committeeId1: Column('committee_id_1', asString().optional()),
	committeeId2: Column('committee_id_2', asString().optional()),
	billId: Column('bill_id', asString().optional()),
	motionId1: Column('motion_id_1', asString().optional()),
	motionId2: Column('motion_id_2', asString().optional())
});

export type MatchedOutput = StaticDecode<typeof matchedOutputSchema>;

export const matchedOutputs = await sheets.get('matched_output', matchedOutputSchema);
