import { createMutation, defaultContext } from '@tanstack/solid-query';
import { useDataProvider } from '../data-provider';
import { useNotify } from '../notifications';

export const createUpdateMutation = (variables: () => { resource: string; params: any }, options?: any) => {
	const dataProvider = useDataProvider();

	const resource = () => variables().resource;
	const params = () => variables().params;
	const notify = useNotify();

	const mutation = createMutation(
		(values: any) => {
			return dataProvider.update(resource(), {
				...params(),
				data: values,
			});
		},
		{
			context: defaultContext,
			onSuccess: () => {
				notify({
					message: 'sa.messages.updated',
					type: 'success',
					autoHideTimeout: 3000,
				});
			},
		},
	);

	return mutation;
};
