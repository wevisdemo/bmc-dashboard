import { Column, Object, asString, type StaticDecode } from 'sheethuahua';
import { sheets } from './spreadsheet';

const bmcMemberSchema = Object({
	name: Column('name', asString()),
	district: Column('district', asString()),
	party: Column('party', asString().optional()),
	imageUrl: Column('image_link', asString().optional())
});

export type BmcMember = StaticDecode<typeof bmcMemberSchema>;

export const bmcMembers = await sheets.get('bmc_members', bmcMemberSchema);
