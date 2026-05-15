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
		totalEvents: number;
		ondistrictchange?: () => void;
		ontopicschange?: () => void;
	}

	let {
		districts,
		topicGroups,
		selectedDistrict = $bindable(''),
		selectedSecondaryTopics = $bindable([]),
		totalEvents,
		ondistrictchange,
		ontopicschange
	}: Props = $props();
</script>

<div class="flex w-72 flex-col gap-4">
	<p class="wv-b6">รายการทั้งหมด <span class="font-bold">{totalEvents}</span></p>

	<h4 class="wv-b5 font-bold">สำรวจตามเขตพื้นที่</h4>
	<Combobox
		name="district"
		label="ค้นหาเขตพื้นที่"
		items={districts.map((value) => ({ value, label: value }))}
		bind:value={selectedDistrict}
		onvaluechange={ondistrictchange}
	/>

	<h4 class="wv-b5 font-bold">สำรวจตามประเด็น</h4>
	<div class="wv-b6 flex flex-col gap-2">
		{#each topicGroups as { main, secondaries } (main)}
			{@const mainChecked =
				secondaries.length > 0 && secondaries.every((s) => selectedSecondaryTopics.includes(s))}
			{@const mainIndeterminate =
				secondaries.some((s) => selectedSecondaryTopics.includes(s)) &&
				!secondaries.every((s) => selectedSecondaryTopics.includes(s))}
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

			{#each secondaries as secondary (secondary)}
				<Checkbox
					name={secondary}
					class="ml-3"
					checked={selectedSecondaryTopics.includes(secondary)}
					oncheckedchange={(checked) => {
						selectedSecondaryTopics = checked
							? [...selectedSecondaryTopics, secondary]
							: selectedSecondaryTopics.filter((t) => t !== secondary);
						ontopicschange?.();
					}}
				>
					<div class="flex flex-row gap-1 items-center">
						<div class="w-0.5 h-5" style="background-color: {topicColorMap.get(secondary)};"></div>
						{secondary}
					</div>
				</Checkbox>
			{/each}
		{/each}
	</div>
</div>
