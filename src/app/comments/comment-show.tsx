import { Show, TextField, ReferenceField } from '../../admin';

export const CommentShow = () => {
	return (
		<div class="flex flex-col p-4 gap-4">
			<h1>Comment Show</h1>
			<Show resource="comments">
				<TextField source="body" />
				<ReferenceField reference="posts" source="post_id">
					<TextField source="title" />
				</ReferenceField>
			</Show>
		</div>
	);
};
