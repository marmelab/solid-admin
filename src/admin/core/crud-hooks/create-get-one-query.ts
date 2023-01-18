import { createQuery } from '@tanstack/solid-query';
import { useDataProvider } from '../data-provider';

type CreateGetOneQueryVariables = () => { resource: string; params: any };

export const createGetOneQuery = (variables: CreateGetOneQueryVariables, options?: any) => {
	const dataProvider = useDataProvider();
	const resource = () => variables().resource;
	const params = () => variables().params;

	const query = createQuery(
		() => [
			resource(),
			'getOne',
			params(),
		],
		({ queryKey }) => {
			return dataProvider.getOne(queryKey[0].toString(), queryKey[2]);
		},
		options,
	);

	return query;
};
