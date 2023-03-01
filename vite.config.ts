import solidPlugin from 'vite-plugin-solid';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [solidPlugin()],

	test: {
		environment: 'jsdom',
		globals: true,
		transformMode: { web: [/\.[jt]sx?$/] },
		setupFiles: ['node_modules/@testing-library/jest-dom/extend-expect.js', './setupVitest.js'],
		// otherwise, solid would be loaded twice:
		deps: { registerNodeLoader: true },
		// if you have few tests, try commenting one
		// or both out to improve performance:
		threads: false,
		isolate: true,
	},
});
