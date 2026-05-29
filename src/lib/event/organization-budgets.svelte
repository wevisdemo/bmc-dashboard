<script lang="ts">
	import { Accordion } from 'bits-ui';
	import { CaretDown, CaretUp, DotMark } from 'carbon-icons-svelte';
	import AccordionItem from '$lib/event/accordion-item.svelte';
	import type { Budget, BudgetGroup } from '$lib/sheets/organization-budget';
	import BudgetTag from '$lib/tags/budget-tag.svelte';

	let { budget }: { budget: BudgetGroup } = $props();

	let value = $state('');

	function close() {
		value = '';
	}

	function formatCurrency(num: number) {
		return num.toLocaleString('th-TH', { maximumFractionDigits: 0 });
	}
</script>

{#snippet budgetTable(budgets: Budget[], variant: 'increase' | 'decrease' | 'unchanged')}
	<ul class="wv-b6 flex w-full flex-col">
		<li
			class="grid grid-cols-3 gap-0.5 border-b border-neutral-300 p-2 text-neutral-600 md:grid-cols-5 md:px-3"
		>
			<span class="col-span-2 hidden pl-6 md:inline">หน่วยงาน</span>
			<span class="text-right">ร่างงบประมาณ</span>
			<span class="text-right">งบที่อนุมัติแล้ว</span>
			<span class="text-right">การเปลี่ยนแปลง</span>
		</li>
		{#each budgets as budget, i (budget.organization)}
			<li
				class="grid grid-cols-3 items-center gap-0.5 border-b border-neutral-200 p-2 md:grid-cols-5 md:px-3"
			>
				<div class="col-span-3 flex flex-row md:col-span-2">
					<span class="w-5 shrink-0 md:w-6">{i + 1}</span><span class="font-bold"
						>{budget.organization}</span
					>
				</div>
				<span class="text-right text-neutral-500">{formatCurrency(budget.draft)}</span>
				<span class="text-right">{formatCurrency(budget.bill)}</span>
				<div class="flex justify-end">
					<BudgetTag
						{variant}
						value="{((Math.abs(budget.changes) * 100) / budget.draft).toLocaleString('TH-th', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})}%"
					/>
				</div>
			</li>
		{/each}
	</ul>
{/snippet}

<div class="space-y-2 md:space-y-3">
	<p class="wv-b5 font-bold">ผลการพิจารณา</p>

	<Accordion.Root
		class="space-y-2 md:space-y-3"
		type="single"
		{value}
		onValueChange={(v) => (value = typeof v === 'string' ? v : '')}
	>
		{#if budget.increase.length > 0}
			<AccordionItem
				value="budget-increase"
				title="{budget.increase.length} หน่วยงานที่งบเพิ่มขึ้น"
				triggerClass="bg-green-200 text-green-700 hover:bg-green-300"
				onclose={close}
			>
				{#snippet icon()}
					<CaretUp />
				{/snippet}
				{@render budgetTable(budget.increase, 'increase')}
			</AccordionItem>
		{/if}
		{#if budget.decrease.length > 0}
			<AccordionItem
				value="budget-decrease"
				title="{budget.decrease.length} หน่วยงานที่งบลดลง"
				triggerClass="bg-red-100 text-red-700 hover:bg-red-200"
				onclose={close}
			>
				{#snippet icon()}
					<CaretDown />
				{/snippet}
				{@render budgetTable(budget.decrease, 'decrease')}
			</AccordionItem>
		{/if}
		{#if budget.unchanged.length > 0}
			<AccordionItem
				value="budget-unchanged"
				title="{budget.unchanged.length} หน่วยงานที่งบไม่เปลี่ยนแปลง"
				triggerClass="bg-gray-200 text-gray-800 hover:bg-gray-300"
				onclose={close}
			>
				{#snippet icon()}
					<DotMark size={12} />
				{/snippet}
				{@render budgetTable(budget.unchanged, 'unchanged')}
			</AccordionItem>
		{/if}
	</Accordion.Root>
</div>
