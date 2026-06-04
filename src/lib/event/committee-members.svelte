<script lang="ts">
	import { Tabs } from 'bits-ui';
	import PeopleList, { type Member } from './people-list.svelte';

	interface MemberSet {
		set: number;
		period?: string;
		members: Member[];
	}

	let { memberSets }: { memberSets: MemberSet[] } = $props();
</script>

{#if memberSets.length === 1}
	<PeopleList members={memberSets[0].members} />
{:else}
	<Tabs.Root value={String(memberSets[0].set)} class="w-full">
		<Tabs.List class="flex gap-1 border-b border-neutral-300">
			{#each memberSets as { set }}
				<Tabs.Trigger
					value={String(set)}
					class="wv-b5 border-b-2 border-transparent px-3 py-2 font-bold text-neutral-500 data-[state=active]:border-black data-[state=active]:text-black"
				>
					ชุดที่ {set}
				</Tabs.Trigger>
			{/each}
		</Tabs.List>
		{#each memberSets as { set, period, members }}
			<Tabs.Content value={String(set)} class="pt-4 md:space-y-2">
				<p class="wv-b5 px-2 font-bold text-neutral-500 md:px-3">{period}</p>
				<PeopleList {members} />
			</Tabs.Content>
		{/each}
	</Tabs.Root>
{/if}
