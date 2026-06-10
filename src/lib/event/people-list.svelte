<script lang="ts">
	import PartyTag from '$lib/tags/party-tag.svelte';

	export interface Member {
		name: string;
		role?: string;
		district?: string;
		note?: string;
		party?: string;
	}

	let { members }: { members: Member[] } = $props();
</script>

<ul class="wv-b6 flex w-full flex-col">
	{#each members as member, i (i)}
		<li class="flex flex-col gap-0.5 border-b border-neutral-300 p-2 md:px-3">
			{#if member.role}
				<span class="text-neutral-600">{member.role}</span>
			{/if}
			<div class="grid gap-0.5 md:grid-cols-4">
				<div class="col-span-2 font-bold">{member.name}</div>
				<div>
					{#if member.district}
						<span class="text-neutral-600">ส.ก. เขต</span> {member.district}
					{:else}
						<span class="text-neutral-600">ไม่ใช่ ส.ก.</span>
					{/if}
				</div>
				<div class="flex items-end justify-end md:justify-start">
					{#if member.party}
						<PartyTag party={member.party} />
					{/if}
				</div>
			</div>
			{#if member.note}
				<div class="text-neutral-400">* {member.note}</div>
			{/if}
		</li>
	{/each}
</ul>
