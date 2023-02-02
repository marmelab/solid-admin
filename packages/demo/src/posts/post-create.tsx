import { Create, NumberInput, SimpleForm, TextInput } from '@solid-admin/admin';

export const PostCreate = () => {
	return (
		<div class="flex flex-col p-4 gap-4">
			<Create>
				<SimpleForm>
					<TextInput source="title" />
					<TextInput source="teaser" />
					<TextInput source="body" />
					<NumberInput source="views" />
				</SimpleForm>
			</Create>
		</div>
	);
};
