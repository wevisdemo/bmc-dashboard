import { asNumber, Column, Object, asString, type StaticDecode } from 'sheethuahua';
import { sheets } from './spreadsheet';

const committeeMemberSchema = Object({
	committee: Column('committee_title', asString()),
	year: Column('year', asNumber()),
	set: Column('set', asNumber().optional()),
	name: Column('committee_member', asString()),
	role: Column('membership', asString()),
	district: Column('member_district', asString().optional()),
	note: Column('note', asString().optional())
});

export type CommitteeMember = StaticDecode<typeof committeeMemberSchema>;

export const committeeMembers: CommitteeMember[] = await sheets.get(
	'standing_committee_members',
	committeeMemberSchema
);
