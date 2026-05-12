import { outputs } from '$lib/output';

export function entries() {
	return outputs.map(({ slug }) => ({ slug }));
}

export function load({ params }) {
	return outputs.find((o) => o.slug === params.slug);
}
