import { Label, TextField, Show, BooleanField } from '@solid-admin/admin';

export const PostShow = () => {
	return (
		<div class="flex flex-col p-4 gap-4">
			<Show>
				<Label source="title">
					<TextField source="title" />
				</Label>
				<Label source="teaser">
					<TextField source="teaser" />
				</Label>
				<Label source="commentable">
					<BooleanField source="commentable" />
				</Label>
			</Show>
		</div>
	);
};
