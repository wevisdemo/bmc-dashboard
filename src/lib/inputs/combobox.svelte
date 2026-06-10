<script lang="ts">
	import { CaretDown, Checkmark } from 'carbon-icons-svelte';

	interface Item {
		value: string;
		label: string;
	}

	interface Props {
		name: string;
		label: string;
		items: Item[];
		value: string;
		emptyStateText?: string;
		onvaluechange?: () => void;
	}

	let { name, label, items, value = $bindable(), emptyStateText, onvaluechange }: Props = $props();

	let searchValue = $state('');
	let open = $state(false);
	let inputElement = $state<HTMLInputElement>();
	let dropdownElement = $state<HTMLDivElement>();

	const filteredItems = $derived(
		searchValue
			? items.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase()))
			: items
	);

	const selectedItem = $derived(items.find((item) => item.value === value));
	const listboxId = $derived(`${name}-listbox`);

	function selectItem(item: Item) {
		value = item.value;
		open = false;
		searchValue = '';
		inputElement?.blur();
		onvaluechange?.();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			open = false;
			searchValue = '';
			inputElement?.blur();
		}
	}

	function handleClickOutside(e: MouseEvent) {
		if (
			dropdownElement &&
			!dropdownElement.contains(e.target as Node) &&
			inputElement &&
			!inputElement.contains(e.target as Node)
		) {
			open = false;
			searchValue = '';
		}
	}

	$effect(() => {
		if (open) {
			document.addEventListener('mousedown', handleClickOutside);
			return () => document.removeEventListener('mousedown', handleClickOutside);
		}
	});
</script>

<div class="relative flex flex-col">
	<input
		bind:this={inputElement}
		bind:value={searchValue}
		placeholder={selectedItem?.label ?? value}
		type="text"
		class="wv-b6 w-full rounded-xs border border-black p-2 placeholder:text-black"
		role="combobox"
		aria-label={label}
		aria-expanded={open}
		aria-controls={listboxId}
		aria-autocomplete="list"
		oninput={() => (open = true)}
		onfocus={() => (open = true)}
		onkeydown={handleKeydown}
	/>
	<div class="pointer-events-none absolute inset-e-1 top-1/2 size-6 -translate-y-1/2">
		<CaretDown class="size-5 transition-transform {open ? 'rotate-180' : ''}" />
	</div>
	{#if open}
		<div
			bind:this={dropdownElement}
			id={listboxId}
			class="absolute top-full z-50 h-96 max-h-60 w-full overflow-y-auto border bg-white"
			role="listbox"
			aria-label={label}
		>
			<div class="p-1">
				{#each filteredItems as item (item.value)}
					<button
						type="button"
						class="rounded-button wv-ibmplexlooped wv-b6 flex w-full px-1 py-2 text-left"
						role="option"
						aria-selected={item.value === value}
						onclick={() => selectItem(item)}
					>
						{item.label}
						{#if item.value === value}
							<div class="ml-auto">
								<Checkmark />
							</div>
						{/if}
					</button>
				{:else}
					<span class="block px-5 py-2 text-sm">
						{emptyStateText}
					</span>
				{/each}
			</div>
		</div>
	{/if}
	<input type="hidden" {name} {value} />
</div>
