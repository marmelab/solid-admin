import { createMutation } from '@tanstack/solid-query';
import { useDataProvider } from '../data-provider';

export const createCreateMutation = (variables: () => { resource: string; params?: any }, options?: any) => {
	const dataProvider = useDataProvider();
	const resource = () => variables().resource;
	const params = () => variables().params;

	const mutation = createMutation((values: any) => {
		return dataProvider.create(resource(), { ...params(), data: values });
	}, options);

	return mutation;
};
