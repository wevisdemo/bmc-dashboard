<script lang="ts">
	import { BillStatus } from '$lib/sheets/bill';

	interface Props {
		status: BillStatus;
		reason?: string;
		expanded?: boolean;
		class?: string;
	}

	let { status, reason, expanded = false, class: className }: Props = $props();

	const statusConfig = {
		[BillStatus.ENACTED]: {
			text: 'white',
			background: '#92a843',
			foreground: '#5c623d',
			label: 'ผ่านแล้ว'
		},
		[BillStatus.IN_PROGRESS]: {
			text: 'black',
			background: '#FAE160',
			foreground: '#C9A903',
			label: 'กำลังดำเนินงาน'
		},
		[BillStatus.REJECTED]: {
			text: 'black',
			background: '#ffdada',
			foreground: '#981313',
			label: 'ถูกปัดตก'
		},
		[BillStatus.IN_QUEUE]: {
			text: 'black',
			background: '#f5f5f5',
			foreground: '#828282',
			label: 'รอเข้าสภา'
		}
	};

	let config = $derived(statusConfig[status]);
</script>

<span
	class="wv-b6 flex flex-col items-start gap-1 {expanded
		? 'w-full rounded border-2 px-3 py-1.5'
		: 'rounded-full px-2 py-1'} md:flex-row md:gap-2 {className}"
	style="color: {config.text}; background-color: {config.background}; border-color: {config.foreground}"
>
	<div class="flex flex-row items-center gap-1">
		<span class="size-2 rounded-full" style="background-color: {config.foreground}"></span>
		<span class={reason ? 'font-bold' : ''}>{config.label}</span>
	</div>
	{#if reason}
		<span class="flex-1">{reason}</span>
	{/if}
</span>
