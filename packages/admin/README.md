# @solid-admin/admin

A complete distribution of [solid-admin](https://github.com/marmelab/solid-admin) that leverage the following packages:

- [@solid-admin/core](https://www.npmjs.com/package/@solid-admin/core) for headless components and hooks.
- [@solid-admin/ui-daisy](https://www.npmjs.com/package/@solid-admin/ui-daisy) for UI components based on [DaisyUI](https://daisyui.com/) and [Kobalt](https://kobalte.dev/).

## Installation

Solid-admin is available from npm. You can install it (and its required dependencies) using:

```sh
npm install @solid-admin/admin
#or
yarn add @solid-admin/admin
```

You must configure your application to use tailwind with [DaisyUI](https://daisyui.com/) by adding a `tailwind.config.js` with the following content:

```js
/** @type {import('tailwindcss').Config} */
const path = require('path');

module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
        // This line ensures tailwind will inspect solid-admin components for classes and include them
        // in the generated CSS file.
		path.join(path.dirname(require.resolve(@solid-admin/ui-daisy)), '**/*.(js|jsx)'),
	],
	darkMode: 'class',
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
};
```

## Usage



## License

Solid-admin is licensed under the [MIT License](https://github.com/marmelab/solid-admin/blob/master/LICENSE.md), sponsored and supported by [marmelab](https://marmelab.com).

## Donate

This library is free to use, even for commercial purpose. If you want to give back, please talk about it, [help newcomers](https://stackoverflow.com/questions/tagged/solid-admin), or contribute code. But the best way to give back is to **donate to a charity**. We recommend [Doctors Without Borders](https://www.doctorswithoutborders.org/).
