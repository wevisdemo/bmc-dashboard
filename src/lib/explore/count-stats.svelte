<script lang="ts">
	import { AdditionalDistrictOption } from '$lib/constants';
	import type { Event } from '../../routes/+page.server';

	interface Props {
		events: Event[];
		class?: string;
	}

	let { events, class: className = '' }: Props = $props();

	let eventInDistrictCount = $derived(
		events.filter((e) => e.districts.some((d) => d !== AdditionalDistrictOption.NotSpecified))
			.length
	);
</script>

<p class="wv-b6 flex-1 {className}">
	รายการทั้งหมด <strong>{events.length}</strong> (ระบุเขตได้
	<strong>{eventInDistrictCount}</strong>,
	<span class="text-neutral-500"
		>ไม่ระบุเขต <strong>{events.length - eventInDistrictCount}</strong></span
	>)
</p>
