<script lang="ts">
	import { Tabs } from 'bits-ui';
	import PartyTag from '$lib/tags/party-tag.svelte';

	interface Member {
		name: string;
		role: string;
		district?: string;
		note?: string;
		party?: string;
	}

	interface MemberSet {
		set: number;
		period?: string;
		members: Member[];
	}

	let { memberSets }: { memberSets: MemberSet[] } = $props();
</script>

{#snippet MemberList(members: Member[])}
	<ul class="wv-b6 flex w-full flex-col">
		{#each members as member (member.name)}
			<li class="flex flex-col gap-0.5 border-b border-neutral-300 p-2 md:px-3">
				<span class="text-neutral-500">{member.role}</span>
				<div class="grid grid-cols-2 gap-0.5 md:grid-cols-4">
					<div class="col-span-2 font-bold">{member.name}</div>
					<div>
						{#if member.party}
							<PartyTag party={member.party} />
						{/if}
					</div>
					<div>
						{#if member.district}
							<span class="text-neutral-500">ส.ก. เขต</span> {member.district}
						{:else}
							<span class="text-neutral-500">ไม่ใช่ ส.ก.</span>
						{/if}
					</div>
				</div>
				{#if member.note}
					<div class="text-neutral-500">* {member.note}</div>
				{/if}
			</li>
		{/each}
	</ul>
{/snippet}

{#if memberSets.length === 1}
	{@render MemberList(memberSets[0].members)}
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
				{@render MemberList(members)}
			</Tabs.Content>
		{/each}
	</Tabs.Root>
{/if}
