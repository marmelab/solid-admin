# `<Edit>`

The `<Edit>` component is responsible for showing a form to edit a record.

It leverages the dataProvider `getOne` and `update` methods.

It's an headless components that provides its features through the `RecordContext` and `SaveContext` and leaves the UI responsibility to its children. One such child is the `<SimpleForm>`.

## Props

- `resource`: Optional. The name of the targeted resource. It will be inferred from the `ResourceContext`.
- `id`: Optional. The identifier of the record to edit. Defaults to the one provided in the route parameters.
- `redirect`: Optional. Where to redirect to after a successful update. Can be `"list"`, `"show"`, `false`, a custom path or a function accepting the record and returning a path.
- `meta`: Optional. Metadata to pass to the dataProvider methods.
- `queryOptions`: Optional. Solid-Query options for the `getOne` request.
- `mutationOptions`: Optional. Solid-Query options for the `update` request.

## Example

```jsx
import { Edit, NumberInput, SimpleForm, TextInput, ToggleInput } from '@solid-admin/admin';

export const PostEdit = () => {
	return (
		<div class="flex flex-col p-4 gap-4">
			<Edit>
				<SimpleForm>
					<TextInput source="title" />
					<TextInput source="teaser" />
					<TextInput source="body" />
					<NumberInput source="views" />
					<ToggleInput source="commentable" />
				</SimpleForm>
			</Edit>
		</div>
	);
};
```