import { asArray, asNumber, Column, Object, asString, type StaticDecode } from 'sheethuahua';
import { EventGroup } from '$lib/constants';
import { sheets } from './spreadsheet';

const budgetCommitteeSchema = Object({
	id: Column('id', asString()),
	year: Column('year', asNumber()),
	output: Column('output', asString()),
	committee: Column('committee_title', asString()),
	mainTopics: Column('topics_main', asString()),
	secondaryTopics: Column('topics_secondary', asArray(asString())),
	districts: Column('districts', asArray(asString())),
	reference: Object({
		draft: Column('link_draft', asString()),
		committee: Column('link_committee', asString()),
		budgetBill: Column('link_budgetbill', asString())
	})
});

export type BudgetCommittee = StaticDecode<typeof budgetCommitteeSchema> & {
	proposer: { name: string };
	title: string;
	dateDisplay: string;
	group: EventGroup.Budget;
};

export const budgetCommittees: BudgetCommittee[] = (
	await sheets.get('พิจารณางบ', budgetCommitteeSchema)
).map((bc) => ({
	...bc,
	title: bc.output,
	proposer: { name: bc.committee },
	dateDisplay: `ปีที่พิจารณา พ.ศ. ${bc.year}`,
	group: EventGroup.Budget
}));
