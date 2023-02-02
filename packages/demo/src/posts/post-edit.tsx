import { Edit, NumberInput, SimpleForm, TextInput } from '@solid-admin/admin';

export const PostEdit = () => {
	return (
		<div class="flex flex-col p-4 gap-4">
			<Edit>
				<SimpleForm>
					<TextInput source="title" />
					<TextInput source="teaser" />
					<TextInput source="body" />
					<NumberInput source="views" />
				</SimpleForm>
			</Edit>
		</div>
	);
};
