import { Label, TextField, Show, ReferenceField } from '@solid-admin/admin';

export const CommentShow = () => {
	return (
		<div class="flex flex-col p-4 gap-4">
			<Show>
				<Label source="body">
					<TextField source="body" />
				</Label>
				<Label source="post">
					<ReferenceField reference="posts" source="post_id">
						<TextField source="title" />
					</ReferenceField>
				</Label>
			</Show>
		</div>
	);
};
