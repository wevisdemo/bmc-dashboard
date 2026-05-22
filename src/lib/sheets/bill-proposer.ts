import { Column, Object, asString, type StaticDecode } from 'sheethuahua';
import { sheets } from './spreadsheet';

const billProposerSchema = Object({
	id: Column('id', asString()),
	proposer: Column('Proposer', asString())
});

export type BillProposer = StaticDecode<typeof billProposerSchema>;

export const billProposers = await sheets.get('bill_proposer', billProposerSchema);
