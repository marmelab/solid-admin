# `<List>`

The `<List>` component is responsible for displaying a list of records.

It leverages the dataProvider `getList` method and supports filtering, sorting and paginating the data.

It's an headless components that provide its features through the `ListContext` and leave the UI responsibility to its children. One such children is the `<Datagrid>`.

## Props

- `resource`: Optional. The name of the targeted resource. It will be inferred from the `ResourceContext`.
- `perPage`: Optional. The number of records per page.
- `sort`: Optional. The field by which to sort the data initially.
- `order`: Optional. The order by which to sort the data initially.
- `filter`: Optional. The filter to always apply.

## Example

```jsx
import { CreateButton, DataGrid, EditButton, List, ShowButton, TextField } from '@solid-admin/admin';

const PostColumns = [
	{
		accessorKey: 'id',
		header: 'ID',
		cell: () => <TextField source="id" />,
	},
	{
		accessorKey: 'title',
		header: 'Title',
		cell: () => <TextField source="title" />,
	},
	{
		accessorKey: 'edit',
		header: '',
		cell: () => <EditButton />,
	},
	{
		accessorKey: 'show',
		header: '',
		cell: () => <ShowButton />,
	},
];

export const PostList = () => {
	return (
		<>
			<div class="flex flex-row justify-between">
				<CreateButton />
			</div>
			<List>
				<DataGrid columns={PostColumns} />
			</List>
		</>
	);
};
```