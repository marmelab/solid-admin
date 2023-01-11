import { createMutation, defaultContext } from '@tanstack/solid-query';
import { useDataProvider } from '../data-provider';

export const createUpdateMutation = (options: { resource: string; params: any }) => {
	const dataProvider = useDataProvider();

	const mutation = createMutation(
		(values: any) => {
			return dataProvider.update(options.resource, {
				...options.params,
				data: values,
			});
		},
		{ context: defaultContext },
	);

	return mutation;
};
