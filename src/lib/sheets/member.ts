import { Column, Object, asString, type StaticDecode } from 'sheethuahua';
import { sheets } from './spreadsheet';

const memberSchema = Object({
	name: Column('name', asString()),
	position: Column('position', asString()),
	district: Column('district', asString()),
	membershipRemark: Column('membership', asString().optional()),
	party: Column('party', asString().optional()),
	imageUrl: Column('image_link', asString().optional())
});

export type Member = StaticDecode<typeof memberSchema>;

export const members = await sheets.get('bmc_members', memberSchema);
