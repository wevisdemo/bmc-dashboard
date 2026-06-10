<script lang="ts">
	import { resolvePath } from '$lib/paths';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		className?: string;
	}

	let { children, className }: Props = $props();
</script>

<section
	class="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat"
	style:background-image="url({resolvePath('/images/hero-bg.webp')})"
>
	<div
		class="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-neutral-100 to-transparent md:h-96"
	></div>

	<div class="relative mx-auto max-w-3xl p-8 pb-0 md:pt-32">
		<div
			class="flex flex-col items-center gap-6 rounded-t-xl bg-white/90 p-8 shadow-2xl md:gap-10 md:px-16 md:pt-18 md:pb-12 {className}"
		>
			{@render children()}
		</div>
	</div>
</section>
