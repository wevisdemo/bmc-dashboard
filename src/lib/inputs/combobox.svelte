<script lang="ts">
	import { Combobox } from 'bits-ui';
	import CaretDownIcon from 'phosphor-svelte/lib/CaretDownIcon';
	import CheckIcon from 'phosphor-svelte/lib/CheckIcon';
	import type { ComponentProps } from 'svelte';

	interface Props {
		name: string;
		label: string;
		items: Exclude<ComponentProps<typeof Combobox.Root>['items'], undefined>;
		value: string;
		emptyStateText?: string;
		onvaluechange?: () => void;
	}

	let { name, label, items, value = $bindable(), emptyStateText, onvaluechange }: Props = $props();

	let searchValue = $state('');
	let open = $state(false);
	let inputElement = $state<HTMLInputElement>();

	const filteredItems = $derived(
		searchValue
			? items.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase()))
			: items
	);
</script>

<Combobox.Root
	{name}
	type="single"
	allowDeselect={false}
	bind:value
	bind:open
	onValueChange={onvaluechange}
	onOpenChangeComplete={() => {
		searchValue = '';
		inputElement?.blur();
	}}
>
	<div class="relative flex flex-col">
		<input
			bind:this={inputElement}
			bind:value={searchValue}
			placeholder={value}
			type="text"
			class="wv-b6 w-full rounded-xs border border-black p-2 placeholder:text-black"
			aria-label={label}
			onclick={() => (open = true)}
		/>
		<div class="pointer-events-none absolute inset-e-1 top-1/2 size-6 -translate-y-1/2">
			<CaretDownIcon class="size-5 transition-transform {open ? 'rotate-180' : ''}" />
		</div>
		<!-- Can't clear Bits Combobox.Input when select. Keep for dropdown rendering reference -->
		<Combobox.Input class="h-0 w-full" />
	</div>
	<Combobox.Portal>
		<Combobox.Content
			class="h-96 max-h-(--bits-combobox-content-available-height) w-(--bits-combobox-anchor-width) min-w-(--bits-combobox-anchor-width) border bg-white"
		>
			<Combobox.Viewport class="p-1">
				{#each filteredItems as { value, label } (value)}
					<Combobox.Item
						class="rounded-button wv-ibmplexlooped wv-b6 flex w-full px-1 py-2"
						{value}
						{label}
					>
						{#snippet children({ selected })}
							{label}
							{#if selected}
								<div class="ml-auto">
									<CheckIcon />
								</div>
							{/if}
						{/snippet}
					</Combobox.Item>
				{:else}
					<span class="block px-5 py-2 text-sm">
						{emptyStateText}
					</span>
				{/each}
			</Combobox.Viewport>
		</Combobox.Content>
	</Combobox.Portal>
</Combobox.Root>
