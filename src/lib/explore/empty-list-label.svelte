<script lang="ts">
	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();
</script>

<div class="flex flex-col items-center justify-center gap-3 {className}">
	<span class="wv-h9 font-bold">ไม่พบรายการ</span>
	<span class="wv-b5 text-neutral-600">ลองเลือกตัวกรองใหม่</span>
</div>
