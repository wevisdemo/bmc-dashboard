<script lang="ts">
	import { BillStatus } from '$lib/sheets/bill';

	interface Props {
		status: BillStatus;
		class?: string;
	}

	let { status, class: className }: Props = $props();

	const statusConfig = {
		[BillStatus.ENACTED]: {
			classes: 'bg-[#92A843] text-white',
			dot: 'bg-[#5C623D]',
			label: 'ผ่านแล้ว'
		},
		[BillStatus.IN_PROGRESS]: {
			classes: 'bg-[#FAE160]',
			dot: 'bg-[#C9A903]',
			label: 'กำลังดำเนินงาน'
		},
		[BillStatus.REJECTED]: {
			classes: 'bg-[#FF4040] text-white',
			dot: 'bg-[#981313]',
			label: 'ถูกปัดตก'
		},
		[BillStatus.IN_QUEUE]: {
			classes: 'bg-[#CDC3CE]',
			dot: 'bg-[#CCA79C]',
			label: 'กำลังพิจารณา'
		}
	};

	let config = $derived(statusConfig[status]);
</script>

{#if config}
	<span class="wv-b6 flex items-center gap-1.5 rounded px-3 py-1 {config.classes} {className}">
		<span class="size-2 rounded-full {config.dot}"></span>
		{config.label}
	</span>
{/if}
