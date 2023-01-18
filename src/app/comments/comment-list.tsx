import { ColumnDef } from '@tanstack/solid-table';
import {
	CreateButton,
	DataGrid,
	EditButton,
	List,
	ReferenceField,
	TextField,
	ShowButton,
} from '../../admin';

const CommentColumns: ColumnDef<any, any>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
		cell: () => <TextField source="id" />,
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
];

export const CommentList = () => {
	return (
		<div class="flex flex-col p-4 gap-4">
			<div class="flex flex-row justify-between">
				<CreateButton />
			</div>
			<List>
				<DataGrid columns={CommentColumns} />
			</List>
		</div>
	);
};
