<script lang="ts">
	import Checkbox from '$lib/inputs/checkbox.svelte';
	import Combobox from '$lib/inputs/combobox.svelte';
	import { topicColorMap } from '$lib/sheets/topic';

	type TopicGroup = { main: string; secondaries: string[] };

	interface Props {
		districts: string[];
		topicGroups: TopicGroup[];
		selectedDistrict: string;
		selectedSecondaryTopics: string[];
		ondistrictchange?: () => void;
		ontopicschange?: () => void;
	}

	let {
		districts,
		topicGroups,
		selectedDistrict = $bindable(''),
		selectedSecondaryTopics = $bindable([]),
		ondistrictchange,
		ontopicschange
	}: Props = $props();

	let allSecondaries = $derived(topicGroups.flatMap((g) => g.secondaries));
</script>

<div class="flex w-72 flex-col gap-2">
	<h4 class="wv-b5 font-bold">สำรวจตามเขตพื้นที่</h4>
	<Combobox
		name="district"
		label="ค้นหาเขตพื้นที่"
		items={districts.map((value) => ({ value, label: value }))}
		bind:value={selectedDistrict}
		onvaluechange={ondistrictchange}
	/>

	<div class="my-1 h-0 border-t border-neutral-300"></div>

	<h4 class="wv-b5 font-bold">สำรวจตามประเด็น</h4>
	<div class="flex gap-3 text-sm">
		<button
			class="text-blue-600 underline not-disabled:hover:text-blue-400 disabled:cursor-not-allowed disabled:text-neutral-400"
			disabled={selectedSecondaryTopics.length === allSecondaries.length}
			onclick={() => {
				selectedSecondaryTopics = [...allSecondaries];
				ontopicschange?.();
			}}>เลือกทั้งหมด</button
		>
		<button
			class="text-blue-600 underline not-disabled:hover:text-blue-400 disabled:cursor-not-allowed disabled:text-neutral-400"
			disabled={selectedSecondaryTopics.length === 0}
			onclick={() => {
				selectedSecondaryTopics = [];
				ontopicschange?.();
			}}>ไม่เลือกอะไรเลย</button
		>
	</div>
	<div class="wv-b6 flex flex-col gap-1.5">
		{#each topicGroups as { main, secondaries } (main)}
			{@const mainChecked =
				secondaries.length > 0 && secondaries.every((s) => selectedSecondaryTopics.includes(s))}
			{@const mainIndeterminate =
				secondaries.some((s) => selectedSecondaryTopics.includes(s)) &&
				!secondaries.every((s) => selectedSecondaryTopics.includes(s))}
			<div class="p-1" style="background-color: {topicColorMap.get(main)};">
				<Checkbox
					name={main}
					checked={mainChecked}
					indeterminate={mainIndeterminate}
					oncheckedchange={(checked) => {
						selectedSecondaryTopics = checked
							? [...new Set([...selectedSecondaryTopics, ...secondaries])]
							: selectedSecondaryTopics.filter((t) => !secondaries.includes(t));
						ontopicschange?.();
					}}
				>
					<span class="font-bold">{main}</span>
				</Checkbox>
			</div>

			{#each secondaries as secondary (secondary)}
				<Checkbox
					name={secondary}
					class="ml-4"
					checked={selectedSecondaryTopics.includes(secondary)}
					oncheckedchange={(checked) => {
						selectedSecondaryTopics = checked
							? [...selectedSecondaryTopics, secondary]
							: selectedSecondaryTopics.filter((t) => t !== secondary);
						ontopicschange?.();
					}}
				>
					{secondary}
				</Checkbox>
			{/each}
		{/each}
	</div>
</div>
