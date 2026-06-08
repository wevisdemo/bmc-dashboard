import { asArray, asNumber, Column, Object, asString, type StaticDecode } from 'sheethuahua';
import { EventGroup } from '$lib/constants';
import type { DateDisplay } from '$lib/types';
import { sheets } from './spreadsheet';

const budgetCommitteeSchema = Object({
	id: Column('id', asString()),
	year: Column('year', asNumber()),
	output: Column('output', asString()),
	committee: Column('committee_title', asString()),
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
	dateDisplay: DateDisplay;
	group: EventGroup.Budget;
};

export const budgetCommittees: BudgetCommittee[] = (
	await sheets.get('พิจารณางบ', budgetCommitteeSchema)
).map((bc) => ({
	...bc,
	title: bc.output,
	proposer: { name: bc.committee },
	dateDisplay: { label: 'ปีที่พิจารณา', value: `${bc.year}` },
	group: EventGroup.Budget
}));
