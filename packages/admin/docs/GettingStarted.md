# Getting Started

Solid Admin is a port of [React Admin](https://marmelab.com/react-admin) and many concepts are the same:

- Declarative
- Resources oriented: declare resources and their views for CRUD
- Backend agnostic
- Customizable: provide your own components and leverage headless components or hooks

Besides, the different providers (dataProvider, authProvider and i18nProvider) share the same interface so you can use those made for react-admin in solid-admin. Be aware that many have a dependency on react-admin and that you might end up with react related dependencies in your project for now.

Just like react-admin, solid-admin tries to leverage the ecosystem best libraries, including [@tanstack/solid-query](https://tanstack.com/query/latest/docs/solid/overview), [Modular Forms](https://modularforms.dev/) and [Kobalte](https://kobalte.dev/).

## Installation

Create a Solid application:

```sh
npx degit solidjs/templates/ts-tailwindcss my-solid-project
cd my-solid-project
npm install
```

Add solid-admin:

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

## Building Your Admin

How that the project is ready, we can build the application:

```jsx
// In App.tsx
import { Admin, Resource } from '@solid-admin/admin';
import jsonServerProvider from '@solid-admin/data-json-server';
import users from './users';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com')

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="users" {...users} />
    </Admin>
)
export default App;
```

And build the first list view:

```jsx
// In users/UserList.tsx
import { Datagrid, TextField } from '@solid-admin/solid';

export const UserList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <TextField source="email" />
            <TextField source="address.street" />
            <TextField source="phone" />
            <TextField source="website" />
            <TextField source="company.name" />
        </Datagrid>
  </List>
);

// In users/index.tsx
import { UserList } from './UserList';

export default {
    list: UserList,
}
```
