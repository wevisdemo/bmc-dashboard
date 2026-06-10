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
		id?: string;
		class?: string;
	}

	let {
		districts,
		topicGroups,
		selectedDistrict = $bindable(''),
		selectedSecondaryTopics = $bindable([]),
		ondistrictchange,
		ontopicschange,
		id,
		class: className = ''
	}: Props = $props();

	let allSecondaries = $derived(topicGroups.flatMap((g) => g.secondaries));
</script>

<div {id} class="flex flex-col gap-2 px-4 md:gap-3 lg:px-0 {className}">
	<div>
		<h4 class="wv-b5 mt-4 font-bold md:m-0">สำรวจตามพื้นที่</h4>
		<p class="wv-b6 text-neutral-500">ระบุจากชื่อเขตหรือสถานที่ในชื่อรายการ</p>
	</div>

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
			class="text-blue-600 not-disabled:underline not-disabled:hover:text-blue-400 disabled:cursor-not-allowed disabled:text-neutral-400"
			disabled={selectedSecondaryTopics.length === allSecondaries.length}
			onclick={() => {
				selectedSecondaryTopics = [...allSecondaries];
				ontopicschange?.();
			}}>เลือกทั้งหมด</button
		>
		<button
			class="text-blue-600 not-disabled:underline not-disabled:hover:text-blue-400 disabled:cursor-not-allowed disabled:text-neutral-400"
			disabled={selectedSecondaryTopics.length === 0}
			onclick={() => {
				selectedSecondaryTopics = [];
				ontopicschange?.();
			}}>ล้างทั้งหมด</button
		>
	</div>

	<div class="wv-b6 -mx-2 flex flex-col gap-1.5 overflow-y-auto px-2 pb-6">
		{#each topicGroups as { main, secondaries } (main)}
			{@const mainChecked =
				secondaries.length > 0 && secondaries.every((s) => selectedSecondaryTopics.includes(s))}
			{@const mainIndeterminate =
				secondaries.some((s) => selectedSecondaryTopics.includes(s)) &&
				!secondaries.every((s) => selectedSecondaryTopics.includes(s))}
			<div class="relative flex flex-col gap-2">
				<div class="sticky top-0 p-1" style="background-color: {topicColorMap.get(main)};">
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
			</div>
		{/each}
	</div>
</div>
