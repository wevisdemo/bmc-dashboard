<script lang="ts">
	import { Accordion, type WithoutChildrenOrChild } from 'bits-ui';
	import { ChevronDown } from 'carbon-icons-svelte';
	import { slide } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	type Props = WithoutChildrenOrChild<Accordion.ItemProps> & {
		icon: Snippet;
		title: string;
		children: Snippet;
		onclose?: () => void;
		disabled?: boolean;
		triggerClass?: string;
	};

	let {
		icon,
		title,
		children,
		onclose,
		disabled = false,
		triggerClass = 'bg-black text-white hover:bg-neutral-700',
		...restProps
	}: Props = $props();
</script>

<Accordion.Item {...restProps} {disabled}>
	<Accordion.Header>
		<Accordion.Trigger
			class="flex w-full flex-1 items-center gap-1 rounded-lg p-2 text-left transition-all select-none md:gap-2 md:px-4 md:py-3 [&[data-state=open]>svg:last-child]:rotate-180 {triggerClass}"
		>
			<span class="flex size-6 shrink-0 items-center justify-center">
				{@render icon()}
			</span>
			<span class="flex-1 font-bold">{title}</span>
			{#if !disabled}
				<ChevronDown class="size-4 shrink-0 transition-transform duration-200" />
			{/if}
		</Accordion.Trigger>
	</Accordion.Header>
	<Accordion.Content
		forceMount
		class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
	>
		{#snippet child({ props, open })}
			{#if open}
				<div
					{...props}
					class="flex flex-col items-center gap-2 rounded border border-dashed border-neutral-400 p-2 md:gap-4 md:p-4 {disabled
						? 'bg-transparent'
						: 'bg-white'}"
					transition:slide
				>
					{@render children()}
					{#if !disabled}
						<button
							onclick={() => onclose?.()}
							class="flex flex-row items-center gap-1 rounded-lg border p-2 hover:bg-neutral-300 md:px-4 md:py-2"
							>ย่อหน้าต่างนี้</button
						>
					{/if}
				</div>
			{/if}
		{/snippet}
	</Accordion.Content>
</Accordion.Item>
