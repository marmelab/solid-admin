# @solid-admin/data-json-server

JSON Server Data Provider for [solid-admin](https://github.com/marmelab/solid-admin), the frontend framework for building admin applications on top of REST/GraphQL services.

## Installation

```sh
npm install --save @solid-admin/data-json-server
```

## REST Dialect

This Data Provider fits REST APIs powered by [JSON Server](https://github.com/typicode/json-server), such as [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

| Method             | API calls                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------- |
| `getList`          | `GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24&title=bar`                         |
| `getOne`           | `GET http://my.api.url/posts/123`                                                                       |
| `getMany`          | `GET http://my.api.url/posts?id=123&id=456&id=789`     |
| `getManyReference` | `GET http://my.api.url/posts?author_id=345`                                                             |
| `create`           | `POST http://my.api.url/posts`                                                                      |
| `update`           | `PUT http://my.api.url/posts/123`                                                                       |
| `updateMany`       | `PUT http://my.api.url/posts/123`, `PUT http://my.api.url/posts/456`, `PUT http://my.api.url/posts/789` |
| `delete`           | `DELETE http://my.api.url/posts/123`                                                                    |

**Note**: The JSON Server REST Data Provider expects the API to include a `X-Total-Count` header in the response to `getList` and `getManyReference` calls. The value must be the total number of resources in the collection. This allows solid-admin to know how many pages of resources there are in total, and build the pagination controls.

```
X-Total-Count: 319
```

If your API is on another domain as the JS code, you'll need to whitelist this header with an `Access-Control-Expose-Headers` [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) header.

```
Access-Control-Expose-Headers: X-Total-Count
```

## Usage

```jsx
// in src/App.js
import { Admin, Resource } from '@solid-admin/admin';
import jsonServerProvider from '@solid-admin/data-json-server';

import { PostList } from './posts';

export const App = () => (
    <Admin dataProvider={jsonServerProvider('https://jsonplaceholder.typicode.com')}>
        <Resource name="posts" list={PostList} />
    </Admin>
);
```

## License

This data provider is licensed under the MIT License, and sponsored by [marmelab](https://marmelab.com).