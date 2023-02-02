import { List } from '@solid-admin/core';
import { DataGrid, TextField } from '@solid-admin/ui-daisy';
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
];

export const PostList = () => {
	return (
		<List>
			<DataGrid columns={PostColumns} />
		</List>
	);
};
