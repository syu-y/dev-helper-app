/// <reference types="vitest" />
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

/** @type {import('@sveltejs/kit').Config} */
const config: UserConfig = {
	plugins: [sveltekit()],
	test: {
		// testの対象ファイル
		include: ['test/**/*.{test,spec}.{js,ts}'],
		globals: true,
		// testの環境
		environment: 'jsdom'
	}
};

export default config;
