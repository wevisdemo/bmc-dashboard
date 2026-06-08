import { Column, Object, asString } from 'sheethuahua';
import { sheets } from './spreadsheet';

const billProposerSchema = Object({
	id: Column('id', asString()),
	proposer: Column('proposer', asString())
});

export const billProposers = await sheets.get('bill_proposers', billProposerSchema);
