# `<Create>`

The `<Create>` component is responsible for showing a form to create a record.

It leverages the dataProvider `create` method.

It's an headless components that provides its features through the `RecordContext` and `SaveContext` and leaves the UI responsibility to its children. One such child is the `<SimpleForm>`.

## Props

- `resource`: Optional. The name of the targeted resource. It will be inferred from the `ResourceContext`.
- `redirect`: Optional. Where to redirect to after a successful create. Can be `"list"`, `"edit"`, `"show"`, `false`, a custom path or a function accepting the record and returning a path.
- `meta`: Optional. Metadata to pass to the dataProvider methods.
- `mutationOptions`: Optional. Solid-Query options for the `create` request.

## Example

```jsx
import { Create, NumberInput, SimpleForm, TextInput, ToggleInput } from '@solid-admin/admin';

export const PostCreate = () => {
	return (
		<div class="flex flex-col p-4 gap-4">
			<Create>
				<SimpleForm>
					<TextInput source="title" />
					<TextInput source="teaser" />
					<TextInput source="body" />
					<NumberInput source="views" />
					<ToggleInput source="commentable" />
				</SimpleForm>
			</Create>
		</div>
	);
};
```