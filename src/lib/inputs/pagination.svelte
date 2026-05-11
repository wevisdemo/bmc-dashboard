<script lang="ts">
	import CaretLeftIcon from 'phosphor-svelte/lib/CaretLeftIcon';
	import CaretRightIcon from 'phosphor-svelte/lib/CaretRightIcon';
	import { Pagination } from 'bits-ui';

	interface Props {
		count: number;
		perPage: number;
		page: number;
	}

	let { count, perPage, page = $bindable(1) }: Props = $props();
</script>

<Pagination.Root {count} {perPage} bind:page class="py-4">
	{#snippet children({ pages, range })}
		<div class="flex items-center justify-center">
			<Pagination.PrevButton class="inline-flex size-10 items-center justify-center rounded">
				<CaretLeftIcon class="size-6" />
			</Pagination.PrevButton>
			<div class="flex items-center gap-2">
				{#each pages as page (page.key)}
					{#if page.type === 'ellipsis'}
						<div class="text-foreground-alt font-medium select-none">...</div>
					{:else}
						<Pagination.Page
							{page}
							class="size-10 items-center justify-center rounded  data-selected:bg-neutral-200"
						>
							{page.value}
						</Pagination.Page>
					{/if}
				{/each}
			</div>
			<Pagination.NextButton class="inline-flex size-10 items-center justify-center rounded">
				<CaretRightIcon class="size-6" />
			</Pagination.NextButton>
		</div>
		<p class="text-muted-foreground wv-b6 mt-2 text-center text-neutral-500">
			แสดง {range.start} - {range.end}
		</p>
	{/snippet}
</Pagination.Root>
