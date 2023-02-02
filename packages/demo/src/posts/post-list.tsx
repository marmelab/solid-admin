import { CreateButton, DataGrid, EditButton, List, TextField } from '@solid-admin/admin';
import { ColumnDef } from '@tanstack/solid-table';

const PostColumns: ColumnDef<any, any>[] = [
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
