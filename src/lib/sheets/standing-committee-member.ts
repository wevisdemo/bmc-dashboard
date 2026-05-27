import { asNumber, Column, Object, asString, type StaticDecode } from 'sheethuahua';
import { sheets } from './spreadsheet';

const standingCommitteeMemberSchema = Object({
	committee: Column('committee_title', asString()),
	year: Column('year', asNumber()),
	set: Column('set', asNumber().optional()),
	period: Column('committee_date', asString().optional()),
	name: Column('committee_member', asString()),
	role: Column('membership', asString()),
	district: Column('member_district', asString().optional()),
	note: Column('note', asString().optional())
});

export type StandingCommitteeMember = StaticDecode<typeof standingCommitteeMemberSchema>;

export const standingCommitteeMembers: StandingCommitteeMember[] = await sheets.get(
	'standing_committee_members',
	standingCommitteeMemberSchema
);
