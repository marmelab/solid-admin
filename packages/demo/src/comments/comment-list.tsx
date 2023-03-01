import {
	List,
	ReferenceField,
	CreateButton,
	DataGrid,
	EditButton,
	TextField,
	ShowButton,
	DeleteButton,
} from '@solid-admin/admin';
import { ColumnDef } from '@tanstack/solid-table';

const CommentColumns: ColumnDef<any, any>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
		cell: () => <TextField source="id" />,
	},
	{
		accessorKey: 'body',
		header: 'body',
		cell: () => <TextField source="body" class="neutral-content inline-block truncate max-w-sm" />,
	},
	{
		accessorKey: 'post_id',
		header: 'Post',
		cell: () => (
			<ReferenceField source="post_id" reference="posts">
				<TextField source="title" />
			</ReferenceField>
		),
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
	{
		accessorKey: 'delete',
		header: '',
		cell: () => <DeleteButton />,
	},
];

export const CommentList = () => {
	return (
		<>
			<div class="flex flex-row justify-between">
				<CreateButton />
			</div>
			<List>
				<DataGrid columns={CommentColumns} />
			</List>
		</>
	);
};
