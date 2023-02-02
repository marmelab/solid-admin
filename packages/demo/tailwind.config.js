/** @type {import('tailwindcss').Config} */
const path = require('path');

module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		path.join(path.dirname(require.resolve('@solid-admin/ui-daisy')), '**/*.(js|jsx)'),
	],
	darkMode: 'class',
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
};
