import { ColumnDef } from '@tanstack/solid-table';
import { List, DataGrid, TextField } from '../../admin';

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

export const PostList = (props: any) => {
	return (
		<div class="flex flex-col p-4 gap-4">
			<h1>Post List</h1>
			<List>
				<DataGrid columns={PostColumns} />
			</List>
		</div>
	);
};
