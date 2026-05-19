<script lang="ts">
	import { InfoIcon } from 'phosphor-svelte';
	import type { Snippet } from 'svelte';
	import type { EventGroup } from '$lib/constants';
	import { Tabs } from 'bits-ui';

	interface Props {
		value: EventGroup;
		children: Snippet;
	}

	let { value, children }: Props = $props();
</script>

<Tabs.Content {value} class="wv-b6 flex flex-row gap-1 bg-neutral-300 p-5 pb-0">
	<InfoIcon class="mt-0.5" />
	<div class="flex-1">
		<span class="font-bold">คำอธิบาย</span>
		<ul class="flex-1 list-disc">
			{@render children()}
		</ul>
	</div>
</Tabs.Content>
