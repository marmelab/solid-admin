import { AutoCompleteInput, Create, ReferenceInput, SimpleForm, TextInput } from '../../admin';

export const CommentCreate = () => {
	return (
		<div class="flex flex-col p-4 gap-4">
			<h1>Comment Create</h1>
			<Create resource="comments">
				<SimpleForm>
					<TextInput source="body" />
					<ReferenceInput reference="posts" source="post_id">
						<AutoCompleteInput source="post_id" optionText="title" />
					</ReferenceInput>
				</SimpleForm>
			</Create>
		</div>
	);
};
