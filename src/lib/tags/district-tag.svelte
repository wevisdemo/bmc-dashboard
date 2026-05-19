<script lang="ts">
	import { MapPinIcon } from 'phosphor-svelte';

	interface Props {
		district: string;
	}

	let { district }: Props = $props();
</script>

<span
	class="flex flex-row items-center gap-1 rounded border border-gray-300 bg-gray-100 px-2 py-0.5"
>
	<MapPinIcon />
	{district}
</span>
