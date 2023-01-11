import { createMutation, defaultContext } from '@tanstack/solid-query';
import { useDataProvider } from '../data-provider';

export const createCreateMutation = (options: { resource: string }) => {
	const dataProvider = useDataProvider();

	const mutation = createMutation(
		(values: any) => {
			return dataProvider.create(options.resource, { data: values });
		},
		{ context: defaultContext },
	);

	return mutation;
};
