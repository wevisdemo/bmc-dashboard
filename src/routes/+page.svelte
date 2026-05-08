<script lang="ts">
	import FilterOptionsPanel from '$lib/explore/filter-options-panel.svelte';

	let { data } = $props();

	let selectedDistrict = $state('ภาพรวมกรุงเทพมหานคร');
	let selectedSecondaryTopics = $state.raw<string[]>(initTopics());

	function initTopics() {
		return data.topicGroups.flatMap((g) => g.secondaries);
	}
</script>

<div class="flex flex-row p-4">
	<FilterOptionsPanel
		districts={data.districts}
		topicGroups={data.topicGroups}
		bind:selectedDistrict
		bind:selectedSecondaryTopics
	/>
	<div>
		<p class="whitespace-pre">
			{JSON.stringify({ selectedDistrict, selectedTopics: selectedSecondaryTopics }, undefined, 4)}
		</p>
	</div>
</div>
