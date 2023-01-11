import { createQuery, defaultContext } from '@tanstack/solid-query';
import { createComputed, splitProps } from 'solid-js';
import { useDataProvider } from '../data-provider';

export const createGetOneQuery = (options: any) => {
	const dataProvider = useDataProvider();
	const [variables, queryOptions] = splitProps(options, ['resource', 'params']);

	const query = createQuery(
		() => [
			variables.resource,
			'getOne',
			typeof variables.params === 'function' ? variables.params() : variables.params,
		],
		({ queryKey }) => {
			return dataProvider.getOne(queryKey[0].toString(), queryKey[2]);
		},
		queryOptions,
	);

	return query;
};
