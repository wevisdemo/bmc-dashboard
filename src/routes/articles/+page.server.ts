import { articles, type Article } from '$lib/sheets/article';

export function load() {
	const grouped = Object.groupBy(articles, (a) => a.section) as Record<
		Article['section'],
		Article[]
	>;

	return {
		sections: Object.entries(grouped).map(([section, items]) => ({
			section: section as Article['section'],
			articles: items
		}))
	};
}
