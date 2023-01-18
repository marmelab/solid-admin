import { createMutation, defaultContext } from '@tanstack/solid-query';
import { useDataProvider } from '../data-provider';

export const createUpdateMutation = (variables: () => { resource: string; params: any }, options?: any) => {
	const dataProvider = useDataProvider();

	const resource = () => variables().resource;
	const params = () => variables().params;

	const mutation = createMutation(
		(values: any) => {
			return dataProvider.update(resource(), {
				...params(),
				data: values,
			});
		},
		{ context: defaultContext },
	);

	return mutation;
};
