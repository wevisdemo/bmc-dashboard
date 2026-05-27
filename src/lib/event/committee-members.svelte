<script lang="ts">
	import { Information } from 'carbon-icons-svelte';
	import PartyTag from '$lib/tags/party-tag.svelte';

	interface Member {
		name: string;
		role: string;
		district?: string;
		note?: string;
		party?: string;
		set?: number;
	}

	let { members }: { members: Member[] } = $props();
</script>

<div class="flex flex-row gap-2 rounded-lg bg-neutral-200 p-2">
	<Information class="mt-0.5 size-4" />
	<p class="wv-b6 flex-1">
		ในบางตำแหน่ง ผู้ดำรงตำแหน่งอาจไม่ใช่ สก. แต่เป็นผู้เชี่ยวชาญที่เกี่ยวข้องกับประเด็นนั้น ๆ
		ที่ถูกเชิญมาร่วมในคณะกรรมการ
	</p>
</div>

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
