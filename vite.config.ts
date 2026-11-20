import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { microfrontends } from '@vercel/microfrontends/experimental/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		// SvelteKit 3 以降、svelte.config.js は廃止され、設定は sveltekit() に直接渡す
		sveltekit({
			preprocess: vitePreprocess(),
			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported or you settled on a specific environment, switch out the adapter.
			adapter: adapter()
		}),
		// Vercel Microfrontends: このアプリがデフォルト。/jubilee 以下は jubilee-web に送る(microfrontends.json)。
		// デフォルトアプリなので、SvelteKit 用の withMicrofrontends(子の appDir を変えるだけ)は要らない
		microfrontends()
	]
});
