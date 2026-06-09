<script lang="ts">
	import { resolvePath } from '$lib/paths';

	const DEFAULT_DESCRIPTION =
		'รู้จัก ส.ก. และสำรวจเรื่องที่พวกเขาพูดคุย ศึกษา และเสนอในสภาระหว่างปี 2565-2569';
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
</svelte:head>
