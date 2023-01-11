import { Edit, EditTitle, SimpleForm, ReferenceInput, TextInput, AutoCompleteInput } from '../../admin';

export const CommentEdit = () => {
	return (
		<div class="flex flex-col p-4 gap-4">
			<Edit resource="comments">
				<EditTitle />
				<SimpleForm>
					<TextInput source="body" />
					<ReferenceInput reference="posts" source="post_id">
						<AutoCompleteInput source="post_id" optionText="title" />
					</ReferenceInput>
				</SimpleForm>
			</Edit>
		</div>
	);
};
