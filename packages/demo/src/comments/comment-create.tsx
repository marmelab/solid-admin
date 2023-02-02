import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput } from '@solid-admin/admin';

export const CommentCreate = () => {
	return (
		<div class="flex flex-col p-4 gap-4">
			<Create>
				<SimpleForm>
					<TextInput source="body" />
					<ReferenceInput reference="posts" source="post_id">
						<SelectInput source="post_id" optionText="title" />
					</ReferenceInput>
				</SimpleForm>
			</Create>
		</div>
	);
};
