<script lang="ts">
	import { topicColorMap } from '$lib/sheets/topic';

	interface Props {
		topic: string;
	}

	let { topic }: Props = $props();
</script>

<span
	class="wv-b6 flex items-center rounded-full px-2 py-0.5 font-bold text-black"
	style="background-color: {topicColorMap.get(topic)}"
>
	{topic}
</span>
