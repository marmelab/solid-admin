import { Edit, ReferenceInput, DateInput, SelectInput, SimpleForm, TextInput } from '@solid-admin/admin';

export const CommentEdit = () => {
	return (
		<div class="flex flex-col p-4 gap-4">
			<Edit>
				<SimpleForm>
					<TextInput source="body" multiline />
					<ReferenceInput reference="posts" source="post_id">
						<SelectInput source="post_id" optionText="title" />
					</ReferenceInput>
					<DateInput source="created_at" />
				</SimpleForm>
			</Edit>
		</div>
	);
};
