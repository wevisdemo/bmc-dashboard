<script lang="ts">
	import { CaretUp, CaretDown, DotMark } from 'carbon-icons-svelte';

	type BudgetVariant = 'increase' | 'decrease' | 'unchanged';

	let { variant, value }: { variant: BudgetVariant; value: number | string } = $props();

	const config = {
		increase: {
			bg: 'bg-green-100',
			text: 'text-green-700',
			Icon: CaretUp
		},
		decrease: {
			bg: 'bg-red-100',
			text: 'text-red-700',
			Icon: CaretDown
		},
		unchanged: {
			bg: 'bg-gray-100',
			text: 'text-gray-700',
			Icon: DotMark
		}
	} as const;

	const { bg, text, Icon } = $derived(config[variant]);
</script>

<span
	class="flex flex-row items-center gap-1 rounded-lg border border-neutral-200 px-2 py-0.5 font-bold {bg} {text}"
>
	<Icon size={variant === 'unchanged' ? 12 : 16} />
	<span class="-mb-0.5">{value}</span>
</span>
