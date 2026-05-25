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
			background: '#ebffee',
			foreground: '#5C623D',
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
			foreground: '#CCA79C',
			label: 'รอเข้าสภา'
		}
	};

	let config = $derived(statusConfig[status]);
</script>

<span
	class="wv-b6 flex items-center gap-1.5 rounded border-2 px-3 py-1 {className}"
	style="background-color: {config.background}; border-color: {config.foreground}"
>
	<span class="size-2 rounded-full" style="background-color: {config.foreground}"></span>
	<span class={reason ? 'font-bold' : ''}>{config.label}</span>
	{#if reason}
		<span>{reason}</span>
	{/if}
</span>
