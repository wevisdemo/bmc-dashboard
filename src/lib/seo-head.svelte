<script lang="ts">
	import { resolvePath } from '$lib/paths';

	const DEFAULT_DESCRIPTION = 'สำรวจเรื่องที่ ส.ก. ชุดที่ 13 พูดคุย ศึกษา และเสนอในสภา กทม.';
	const baseUrl = (import.meta.env.PUBLIC_BASE_URL || 'https://bmc-dashboard.pages.dev').replace(
		/\/$/,
		''
	);
	const DEFAULT_OG_IMAGE = baseUrl + '/og.png';
	const DEFAULT_TITLE = 'BMC Dashboard: เลือกตั้ง กทม. ไม่ได้มีแค่ผู้ว่าฯ';
	const SUFFIX = ' - BMC Dashboard';

	let {
		title,
		description = DEFAULT_DESCRIPTION,
		ogImage = DEFAULT_OG_IMAGE
	}: { title?: string; description?: string; ogImage?: string } = $props();

	const fullTitle = $derived(title ? title + SUFFIX : DEFAULT_TITLE);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
	<link rel="icon" href={resolvePath('/favicon.png')} />

	{#if import.meta.env.MODE === 'production'}
		<script async src="https://analytics.punchup.world/js/pa-0Bkl4SGf1i6HFNmW9M1yV.js"></script>
		<script>
			((window.plausible =
				window.plausible ||
				function () {
					(plausible.q = plausible.q || []).push(arguments);
				}),
				(plausible.init =
					plausible.init ||
					function (i) {
						plausible.o = i || {};
					}));
			plausible.init();
		</script>
	{/if}
</svelte:head>
