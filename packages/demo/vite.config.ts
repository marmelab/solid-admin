/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import fs from 'fs';
import path from 'path';

const packages = fs.readdirSync(path.resolve(__dirname, '..'));
const aliases = packages.reduce((acc, dirName) => {
	const packageJson = require(path.resolve(__dirname, '..', dirName, 'package.json'));
	if (packageJson.name.startsWith('@solid-admin/')) {
		acc[packageJson.name] = path.resolve(
			__dirname,
			`${path.resolve('..')}/${packageJson.name.replace('@solid-admin/', '')}/src`,
		);
	}
	return acc;
}, {});
console.log({ aliases });

export default defineConfig({
	plugins: [solidPlugin()],
	server: {
		port: 3000,
	},
	test: {
		environment: 'jsdom',
		globals: true,
		transformMode: { web: [/\.[jt]sx?$/] },
		setupFiles: ['node_modules/@testing-library/jest-dom/extend-expect.js'],
		// otherwise, solid would be loaded twice:
		deps: { registerNodeLoader: true },
		// if you have few tests, try commenting one
		// or both out to improve performance:
		threads: false,
		isolate: false,
	},
	build: {
		target: 'esnext',
	},
	resolve: {
		conditions: ['development', 'browser'],
		preserveSymlinks: true,
		alias: [
			// we need to manually follow the symlinks for local packages to allow deep HMR
			...Object.keys(aliases).map((packageName) => ({
				find: packageName,
				replacement: aliases[packageName],
			})),
		],
	},
});
