# @solid-admin/data-fakerest

An DataProvider for [solid-admin](https://github.com/marmelab/solid-admin) using [FakeRest](https://github.com/marmelab/fakerest).

## Installation

Solid-admin is available from npm. You can install it (and its required dependencies) using:

```sh
npm install @solid-admin/data-fakerest
#or
yarn add @solid-admin/data-fakerest
```

## Usage

Pass a JSON object to the provider constructor:

```jsx
// in src/App.js
import { Admin, Resource } from '@solid-admin/admin';
import fakeDataProvider from '@solid-admin/data-fakerest';

const dataProvider = fakeDataProvider({
    posts: [
        { id: 0, title: 'Hello, world!' },
        { id: 1, title: 'FooBar' },
    ],
    comments: [
        { id: 0, post_id: 0, author: 'John Doe', body: 'Sensational!' },
        { id: 1, post_id: 0, author: 'Jane Doe', body: 'I agree' },
    ],
})

import { PostList } from './posts';

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="posts" list={PostList} />
    </Admin>
);

export default App;
```

Additionally, you can turn on console logging of fake requests by passing `true` as second parameter of the constructor.

## Input Format

The main parameter must be an object literal with one key for each resource type. Values are arrays of resources. Resources must be object literals with at least an `id` key.

Foreign keys are also supported: just name the field `{related_resource_name}_id` and give an existing value.

Here is an example input:

```json
{
    "posts": [
        { "id": 0, "title": "Hello, world!" },
        { "id": 1, "title": "FooBar" }
    ],
    "comments": [
        { "id": 0, "post_id": 0, "author": "John Doe", "body": "Sensational!" },
        { "id": 1, "post_id": 0, "author": "Jane Doe", "body": "I agree" }
    ]
}
```

You can find a more sophisticated example in [the Posters Galore demo](https://raw.githubusercontent.com/marmelab/ng-admin-demo/master/js/data.js). 

## Logging

Pass `true` as second argument to log the requests made to the provider in the console. This is very helpful to debug the requests made by an app using this data provider.

```jsx
// in src/App.js
import { Admin, Resource } from '@solid-admin/admin';
import fakeDataProvider from '@solid-admin/data-fakerest';

const dataProvider = fakeDataProvider({ /* data here */ }, true);

const App = () => (
    <Admin dataProvider={dataProvider}>
        // ...
    </Admin>
);
```

## Features

This data provider uses [FakeRest](https://github.com/marmelab/FakeRest) under the hood. That means that it offers the same features:

- pagination
- sorting
- filtering by column
- filtering by the `q` full-text search
- filtering numbers and dates greater or less than a value
- embedding related resources

## License

Solid-admin is licensed under the [MIT License](https://github.com/marmelab/solid-admin/blob/master/LICENSE.md), sponsored and supported by [marmelab](https://marmelab.com).

## Donate

This library is free to use, even for commercial purpose. If you want to give back, please talk about it, [help newcomers](https://stackoverflow.com/questions/tagged/solid-admin), or contribute code. But the best way to give back is to **donate to a charity**. We recommend [Doctors Without Borders](https://www.doctorswithoutborders.org/).