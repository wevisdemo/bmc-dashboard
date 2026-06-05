<script lang="ts">
	import LocationFilled from 'carbon-icons-svelte/lib/LocationFilled.svelte';

	interface Props {
		district: string;
	}

	let { district }: Props = $props();
</script>

<span
	class="wv-b6 flex flex-row items-center gap-1 rounded-full border border-gray-300 bg-gray-100 px-2 py-1"
>
	<LocationFilled />
	{district}
</span>
