import { createQuery, defaultContext } from '@tanstack/solid-query';
import { useDataProvider } from '../data-provider';

export const createGetListQuery = (options: any) => {
	const dataProvider = useDataProvider();

	const query = createQuery(
		() => [options.resource, 'getList', typeof options.params === 'function' ? options.params() : options.params],
		({ queryKey }) => {
			return dataProvider.getList(queryKey[0], queryKey[2]);
		},
		{
			context: defaultContext,
		},
	);

	return query;
};
