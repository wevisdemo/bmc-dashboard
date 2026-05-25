import { Column, Object, Tuple, asString, type StaticDecode } from 'sheethuahua';
import { sheets } from './spreadsheet';

const matchedOutputSchema = Object({
	output: Column('output', asString()),
	ids: Tuple([
		// TODO: Not support budget committee yet
		// Column('budgetcom', asString().optional()),
		Column('committee_id_1', asString().optional()),
		Column('committee_id_2', asString().optional()),
		Column('committee_id_3', asString().optional()),
		Column('committee_id_4', asString().optional()),
		Column('committee_id_5', asString().optional()),
		Column('committee_id_6', asString().optional()),
		Column('committee_id_7', asString().optional()),
		Column('committee_id_8', asString().optional()),
		Column('committee_id_9', asString().optional()),
		Column('committee_id_10', asString().optional()),
		Column('committee_id_11', asString().optional()),
		Column('committee_id_12', asString().optional()),
		Column('committee_id_13', asString().optional()),
		Column('committee_id_14', asString().optional()),
		Column('bill_id', asString().optional()),
		Column('motion_id_1', asString().optional()),
		Column('motion_id_2', asString().optional()),
		Column('subject_id_1', asString().optional()),
		Column('subject_id_2', asString().optional())
	])
});

export type MatchedOutput = StaticDecode<typeof matchedOutputSchema>;

export const matchedOutputs = await sheets.get('matched_output', matchedOutputSchema);
