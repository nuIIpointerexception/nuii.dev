import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		lib: {
			entry: './src/lib/index.ts',
			name: '@nuii/ui',
			fileName: 'index'
		}
	}
});
