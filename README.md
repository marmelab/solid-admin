# solid-admin

A frontend Framework for building data-driven applications running in the browser on top of REST/GraphQL APIs, using ES6, [SolidJS](https://www.solidjs.com/) and [DaisyUI](https://daisyui.com/). Open sourced and maintained by [marmelab](https://marmelab.com/).

It's a port of [React-admin](https://marmelab.com/react-admin) for [SolidJS](https://www.solidjs.com/).

## Installation

Solid-admin is available from npm. You can install it (and its required dependencies) using:

```sh
npm install @solid-admin/admin
#or
yarn add @solid-admin/admin
```

## At a Glance

```jsx
// in app.js
import { render } from 'solid-js/web';
import { Admin, Resource } from '@solid-admin/admin';
import restProvider from '@solid-admin/data-fakerest';
import data from '.data.json';

import { PostList, PostEdit, PostCreate } from './posts';

render(
    <Admin dataProvider={restProvider(data)}>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} />
    </Admin>,
    document.getElementById('root'));
);
```

The `<Resource>` component is a configuration component that allows to define sub components for each of the admin view: `list`, `edit`, and `create`. These components use DaisyUI and custom components from solid-admin:

```jsx
// in posts.js
import { List, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, TextInput, useRecordContext } from '@solid-admin/admin';

export const PostList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="published_at" />
            <TextField source="average_note" />
            <TextField source="views" />
            <EditButton />
        </Datagrid>
    </List>
);

const PostTitle = () => {
    const record = useRecordContext();
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const PostEdit = () => (
    <Edit title={<PostTitle />}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiline: true }} />
            <TextInput multiline source="body" />
            <TextInput label="Publication date" source="published_at" />
            <TextInput source="average_note" />
            <TextInput disabled label="Nb views" source="views" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = () => (
    <Create title="Create a Post">
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiline: true }} />
            <TextInput multiline source="body" />
            <TextInput label="Publication date" source="published_at" />
            <TextInput source="average_note" />
        </SimpleForm>
    </Create>
);
```

## Does It Work With My API?

Yes.

Solid-admin uses an adapter approach, with a concept called *Data Providers*. Existing providers can be used as a blueprint to design your API, or you can write your own Data Provider to query an existing API. Writing a custom Data Provider is a matter of hours.

![Data provider architecture](https://marmelab.com/react-admin/img/data-provider.png)

See the react-admin [Data Providers documentation](https://marmelab.com/react-admin/DataProviders.html) for details.

## Batteries Included But Removable

Solid-admin is designed as a library of loosely coupled Solid components and hooks exposing reusable controller logic. It is very easy to replace any part of solid-admin with your own, e.g. to use a custom datagrid, GraphQL instead of REST, or Bootstrap instead of Material Design.