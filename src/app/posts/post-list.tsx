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

export const PostList = () => {
	return (
		<List>
			<DataGrid columns={PostColumns} />
		</List>
	);
};
