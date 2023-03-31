import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput, required } from '@solid-admin/admin';

export const CommentCreate = () => {
	return (
		<div class="flex flex-col p-4 gap-4">
			<Create>
				<SimpleForm>
					{/* @ts-ignore */}
					<TextInput source="body" validate={[required('Required')]} />
					<ReferenceInput reference="posts" source="post_id">
						{/* @ts-ignore */}
						<SelectInput source="post_id" optionText="title" validate={[required('Required')]} />
					</ReferenceInput>
				</SimpleForm>
			</Create>
		</div>
	);
};
