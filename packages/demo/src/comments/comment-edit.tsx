import { Edit, ReferenceInput } from '@solid-admin/core';
import { DateInput, SelectInput, SimpleForm, TextInput } from '@solid-admin/ui-daisy';

export const CommentEdit = () => {
	return (
		<div class="flex flex-col p-4 gap-4">
			<Edit resource="comments">
				<SimpleForm>
					<TextInput source="body" />
					<ReferenceInput reference="posts" source="post_id">
						<SelectInput source="post_id" optionText="title" />
					</ReferenceInput>
					<DateInput source="created_at" />
				</SimpleForm>
			</Edit>
		</div>
	);
};
