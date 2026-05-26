<script lang="ts">
	import { BillStatus } from '$lib/sheets/bill';

	interface Props {
		status: BillStatus;
		reason?: string;
		class?: string;
	}

	let { status, reason, class: className }: Props = $props();

	const statusConfig = {
		[BillStatus.ENACTED]: {
			background: '#92a843',
			foreground: '#5c623d',
			label: 'ผ่านแล้ว'
		},
		[BillStatus.IN_PROGRESS]: {
			background: '#FAE160',
			foreground: '#C9A903',
			label: 'กำลังดำเนินงาน'
		},
		[BillStatus.REJECTED]: {
			background: '#ffdada',
			foreground: '#981313',
			label: 'ถูกปัดตก'
		},
		[BillStatus.IN_QUEUE]: {
			background: '#f5f5f5',
			foreground: '#828282',
			label: 'รอเข้าสภา'
		}
	};

	let config = $derived(statusConfig[status]);
</script>

<span
	class="wv-b6 flex flex-col items-start gap-1 rounded border-2 px-3 py-1.5 md:flex-row md:gap-2 {className}"
	style="background-color: {config.background}; border-color: {config.foreground}"
>
	<div class="flex flex-row items-center gap-1">
		<span class="size-2 rounded-full" style="background-color: {config.foreground}"></span>
		<span class={reason ? 'font-bold' : ''}>{config.label}</span>
	</div>
	{#if reason}
		<span class="flex-1">{reason}</span>
	{/if}
</span>
