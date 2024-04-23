import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			'@': './src/*',
			'@routes': './src/routes/*',
			'@components': './src/components/*',
			'@lib': './src/lib/*',
			'@utils': './src/utils/*'
		}
	}
};

export default config;
