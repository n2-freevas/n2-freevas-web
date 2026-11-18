import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { markdown } from './vite-plugins/markdown';

export default defineConfig({
	plugins: [
		// .md をビルド時に HTML へ変換する(サイト共通。vite-plugins/markdown.ts)
		markdown(),
		// SvelteKit 3 以降、svelte.config.js は廃止され、設定は sveltekit() に直接渡す
		sveltekit({
			preprocess: vitePreprocess(),
			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported or you settled on a specific environment, switch out the adapter.
			adapter: adapter()
		})
	]
});
