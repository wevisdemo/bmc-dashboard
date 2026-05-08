import { Column, Object, asString, type StaticDecode } from 'sheethuahua';
import { sheets } from './spreadsheet';

const memberSchema = Object({
	name: Column('Name', asString()),
	position: Column('Position', asString()),
	district: Column('District', asString()),
	note: Column('Note', asString().optional()),
	party: Column('Party', asString().optional()),
	imageUrl: Column('image_link', asString().optional())
});

export type Member = StaticDecode<typeof memberSchema>;

export const members = await sheets.get('bmc_members', memberSchema);
