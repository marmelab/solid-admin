import { Form, useLogin, useTranslate } from '@solid-admin/core';
import { SubmitHandler, FieldValues } from '@modular-forms/solid';
import { TextInput } from '../inputs';

export const Login = () => {
	const translate = useTranslate();
	const loginMutation = useLogin();
	const handleSubmit: SubmitHandler<FieldValues> = (values) => {
		loginMutation.mutate(values);
	};

	return (
		<div class="flex flex-wrap w-full min-h-screen items-center justify-center gap-2 p-4">
			<div class="card min-w-[18rem] max-w-4xl bg-base-100 shadow-xl">
				<Form onSubmit={handleSubmit} class="card-body">
					<h2 class="card-title">{translate('ra.page.login', { _: 'Login' })}</h2>
					<TextInput source="username" inputProps={{ autocomplete: 'username' }} />
					<TextInput source="password" inputProps={{ type: 'password', autocomplete: 'current-password' }} />
					<div class="card-actions justify-end">
						<button type="submit" class="btn btn-primary">Login</button>
					</div>
				</Form>
			</div>
		</div>
	);
};
