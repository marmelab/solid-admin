# Getting Started

Solid Admin is a port of [React Admin](https://marmelab.com/react-admin) and many concepts are the same:

- Declarative
- Resources oriented: declare resources and their views for CRUD
- Backend agnostic
- Customizable: provide your own components and leverage headless components or hooks

Besides, the different providers (dataProvider, authProvider and i18nProvider) share the same interface so you can use those made for react-admin in solid-admin. Be aware that many have a dependency on react-admin and that you might end up with react related dependencies in your project for now.

Just like react-admin, solid-admin tries to leverage the ecosystem's best libraries, including [@tanstack/solid-query](https://tanstack.com/query/latest/docs/solid/overview), [Modular Forms](https://modularforms.dev/) and [Kobalte](https://kobalte.dev/).

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
		path.join(path.dirname(require.resolve('@solid-admin/ui-daisy')), '**/*.(js|jsx)'),
	],
	darkMode: 'class',
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
};
```

## Building Your Admin

Now that the project is ready, we can start coding:

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

And add the first list view:

```jsx
// In users/UserList.tsx
import { List, Datagrid, TextField } from '@solid-admin/solid';

const UserColumns = [
	{
		accessorKey: 'id',
		header: 'ID',
		cell: () => <TextField source="id" />,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: () => <TextField source="name" />,
	},
	{
		accessorKey: 'username',
		header: 'Username',
		cell: () => <TextField source="username" />,
	},
	{
		accessorKey: 'email',
		header: 'Email',
		cell: () => <TextField source="email" />,
	},
	{
		accessorKey: 'address.street',
		header: 'Address',
		cell: () => <TextField source="address.street" />,
	},
	{
		accessorKey: 'phone',
		header: 'Phone',
		cell: () => <TextField source="phone" />,
	},
	{
		accessorKey: 'website',
		header: 'Website',
		cell: () => <TextField source="website" />,
	},
	{
		accessorKey: 'website',
		header: 'Company',
		cell: () => <TextField source="website" />,
	},
];

export const UserList = () => (
    <List>
        <DataGrid columns={UserColumns} />
    </List>
);

// In users/index.tsx
import { UserList } from './UserList';

export default {
    list: UserList,
}
```
