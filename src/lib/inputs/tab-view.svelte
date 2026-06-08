<script lang="ts">
	import { Tabs } from 'bits-ui';
	import type { Snippet } from 'svelte';

	interface Props {
		tabs: string[];
		value?: string;
		onValueChange?: () => void;
		listClass?: string;
		triggerClass?: string;
		trigger: Snippet<[string]>;
		children?: Snippet;
	}

	let {
		tabs,
		value = $bindable(''),
		onValueChange,
		listClass = '',
		triggerClass = '',
		trigger,
		children
	}: Props = $props();
</script>

<Tabs.Root bind:value {onValueChange}>
	<Tabs.List
		class="sticky top-0 z-10 flex flex-row gap-2 overflow-x-auto border-b-12 border-neutral-100 bg-white px-3 pt-2 md:border-b-24 md:p-0 {listClass}"
	>
		{#each tabs as tabValue (tabValue)}
			<Tabs.Trigger
				value={tabValue}
				class="flex flex-row items-center gap-1 rounded-t-lg bg-neutral-300 p-3 data-[state=active]:bg-neutral-100 md:px-4 {triggerClass}"
			>
				{@render trigger(tabValue)}
			</Tabs.Trigger>
		{/each}
	</Tabs.List>

	<div class="rounded-b-lg bg-neutral-100">{@render children?.()}</div>
</Tabs.Root>
