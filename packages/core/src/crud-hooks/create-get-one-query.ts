import { createQuery, CreateQueryOptions } from '@tanstack/solid-query';
import { DataRecord, Identifier } from '../record';
import { useDataProvider } from '../data-provider';

export const createGetOneQuery = <
	TRecord extends DataRecord = DataRecord,
	TMeta extends Record<string, unknown> | undefined = undefined,
	TError = unknown,
>(
	variables: () => { resource: string; params: { id: Identifier }; meta?: TMeta },
	options?: Omit<
		CreateQueryOptions<{ data: TRecord }, TError, { data: TRecord }>,
		'queryKey' | 'queryFn' | 'initialData'
	>,
) => {
	const dataProvider = useDataProvider();
	const resource = () => variables().resource;
	const params = () => variables().params;
	const meta = () => variables().meta;

	const query = createQuery<{ data: TRecord }, TError, { data: TRecord }>(
		() => [resource(), 'getOne', params(), meta()],
		() => {
			return dataProvider.getOne<TRecord, TMeta>(resource(), params(), meta());
		},
		options,
	);

	return query;
};
