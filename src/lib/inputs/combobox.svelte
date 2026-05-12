<script lang="ts">
	import CaretDownIcon from 'phosphor-svelte/lib/CaretDownIcon';
	import CheckIcon from 'phosphor-svelte/lib/CheckIcon';
	import type { ComponentProps } from 'svelte';
	import { Combobox } from 'bits-ui';

	interface Props {
		name: string;
		label: string;
		items: Exclude<ComponentProps<typeof Combobox.Root>['items'], undefined>;
		value: string;
		emptyStateText?: string;
	}

	let { name, label, items, value = $bindable(), emptyStateText }: Props = $props();

	let searchValue = $state('');
	let open = $state(false);

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
	onOpenChangeComplete={(o) => {
		if (!o) searchValue = '';
	}}
>
	<div class="relative">
		<Combobox.Input
			oninput={(e) => (searchValue = e.currentTarget.value)}
			class="w-full rounded-xs border border-black p-2 placeholder:text-black wv-b6"
			aria-label={label}
			placeholder={value}
			onclick={() => (open = true)}
		/>
		<Combobox.Trigger class="absolute inset-e-1 top-1/2 size-6 -translate-y-1/2 touch-none">
			<CaretDownIcon class="size-5 transition-transform {open ? 'rotate-180' : ''}" />
		</Combobox.Trigger>
	</div>
	<Combobox.Portal>
		<Combobox.Content
			class="h-96 max-h-(--bits-combobox-content-available-height) w-(--bits-combobox-anchor-width) min-w-(--bits-combobox-anchor-width) border bg-white"
		>
			<Combobox.Viewport class="p-1">
				{#each filteredItems as { value, label } (value)}
					<Combobox.Item
						class="rounded-button flex w-full px-1 py-2 wv-ibmplexlooped wv-b6"
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
