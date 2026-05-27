import { Column, Object, asString, type StaticDecode } from 'sheethuahua';
import { sheets } from './spreadsheet';

const adhocCommitteeMemberSchema = Object({
	committee: Column('committee_title', asString()),
	name: Column('committee_member', asString()),
	role: Column('membership', asString()),
	district: Column('member_district', asString().optional()),
	note: Column('note', asString().optional())
});

export type AdhocCommitteeMember = StaticDecode<typeof adhocCommitteeMemberSchema>;

export const adhocCommitteeMembers: AdhocCommitteeMember[] = await sheets.get(
	'adhoc_committee_members',
	adhocCommitteeMemberSchema
);
