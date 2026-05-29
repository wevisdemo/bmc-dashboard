import { asString, Column, createTransformer, Object as SchemaObject } from 'sheethuahua';
import { sheets } from './spreadsheet';

const asCurrency = createTransformer(
	(str) => parseFloat(str.replace(/,/g, '')),
	(num) => num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
);

const organizationBudgetSchema = SchemaObject({
	id: Column('id', asString()),
	organization: Column('org_name', asString()),
	draft: Column('budget_in_draft', asCurrency),
	bill: Column('budget_in_bill', asCurrency),
	changes: Column('changed_budget', asCurrency.optional(0))
});

export type Budget = {
	organization: string;
	draft: number;
	bill: number;
	changes: number;
};

export type BudgetGroup = {
	id: string;
	increase: Budget[];
	decrease: Budget[];
	unchanged: Budget[];
};

export const budgetGroupsById = new Map<string, BudgetGroup>(
	Object.entries(
		(await sheets.get('พิจารณางบ_รายสำนัก', organizationBudgetSchema)).reduce<
			Record<string, Omit<BudgetGroup, 'id'>>
		>((acc, { id, ...item }) => {
			if (!acc[id]) acc[id] = { increase: [], decrease: [], unchanged: [] };
			if (item.changes === 0) acc[id].unchanged.push(item);
			else if (item.changes > 0) acc[id].increase.push(item);
			else acc[id].decrease.push(item);
			return acc;
		}, {})
	).map(([id, budgets]) => [id, { id, ...budgets }])
);
