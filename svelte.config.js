import adapter from '@sveltejs/adapter-static';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const basePath = (() => {
	try {
		const url = new URL(process.env.PUBLIC_BASE_URL);
		return url.pathname === '/' ? '' : url.pathname.replace(/\/$/, '');
	} catch {
		return '';
	}
})();

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: adapter(),
		paths: {
			base: basePath
		}
	}
};

export default config;
