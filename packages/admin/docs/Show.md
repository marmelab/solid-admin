# `<Show>`

The `<Show>` component is responsible for displaying a record.

It leverages the dataProvider `getOne` method.

It's an headless components that provide its features through the `RecordContext` and leave the UI responsibility to its children.

## Props

- `resource`: Optional. The name of the targeted resource. It will be inferred from the `ResourceContext`.
- `id`: Optional. The identifier of the record to edit. Defaults to the one provided in the route parameters.
- `meta`: Optional. Metadata to pass to the dataProvider methods.
- `queryOptions`: Optional. Solid-Query options for the `getOne` request.

## Example

```jsx
import { Show, NumberField, SimpleForm, TextField, BooleanField } from '@solid-admin/admin';

export const PostShow = () => {
	return (
		<div class="flex flex-col p-4 gap-4">
			<Show>
				<SimpleForm>
					<TextField source="title" />
					<TextField source="teaser" />
					<TextField source="body" />
					<NumberField source="views" />
					<BooleanField source="commentable" />
				</SimpleForm>
			</Show>
		</div>
	);
};
```