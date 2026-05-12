<script lang="ts">
	import { InfoIcon } from 'phosphor-svelte';
	import type { Snippet } from 'svelte';
	import type { EntityTabGroup } from '$lib/constants';
	import { Tabs } from 'bits-ui';

	interface Props {
		value: EntityTabGroup;
		children: Snippet;
	}

	let { value, children }: Props = $props();
</script>

<Tabs.Content {value} class="bg-neutral-200 p-5 pb-0 wv-b6 flex flex-row gap-1">
	<InfoIcon class="mt-0.5" />
	<p class="flex-1"><strong>คำอธิบาย:</strong> {@render children()}</p>
</Tabs.Content>
