<script lang="ts">
	import CheckIcon from 'phosphor-svelte/lib/CheckIcon';
	import MinusIcon from 'phosphor-svelte/lib/MinusIcon';
	import type { Snippet } from 'svelte';
	import { Checkbox, Label } from 'bits-ui';

	interface Props {
		name: string;
		checked?: boolean;
		indeterminate?: boolean;
		oncheckedchange?: (checked: boolean) => void;
		class?: string;
		children: Snippet;
	}

	let {
		name,
		checked = $bindable(false),
		indeterminate = $bindable(false),
		oncheckedchange,
		children,
		class: className = ''
	}: Props = $props();

	let inputId = $derived(`input-${name}`);
	let labelId = $derived(`${inputId}-label`);
</script>

<div class="flex items-center space-x-2 {className}">
	<Checkbox.Root
		id={inputId}
		aria-labelledby={labelId}
		class="flex size-4 overflow-hidden rounded-xs border border-black p-0"
		{name}
		{checked}
		{indeterminate}
		onCheckedChange={oncheckedchange}
	>
		{#snippet children({ checked: c, indeterminate: i })}
			<div
				class="text-background inline-flex h-full w-full items-center justify-center text-white {i ||
				c
					? 'bg-black'
					: ''}"
			>
				{#if i || c}
					{@const Icon = i ? MinusIcon : CheckIcon}
					<Icon class="size-3" weight="bold" />
				{/if}
			</div>
		{/snippet}
	</Checkbox.Root>
	<Label.Root id={labelId} for={inputId}>
		{@render children()}
	</Label.Root>
</div>
