import { CreateQueryOptions, createQuery } from '@tanstack/solid-query';
import { useDataProvider } from '../data-provider';
import { DataRecord } from '../record';

export const createGetListQuery = <TRecord extends DataRecord = DataRecord, TMeta = unknown, TError = unknown>(
	variables: () => { resource: string; params: any; meta?: TMeta },
	options?: Omit<
		CreateQueryOptions<{ data: TRecord[]; total: number }, TError, { data: TRecord[]; total: number }>,
		'queryKey' | 'queryFn' | 'initialData'
	>,
) => {
	const dataProvider = useDataProvider();

	const resource = () => variables().resource;
	const params = () => variables().params;
	const meta = () => variables().meta;

	const query = createQuery<{ data: TRecord[]; total: number }, TError, { data: TRecord[]; total: number }>(
		() => [resource(), 'getList', params(), meta()],
		() => {
			return dataProvider.getList<TRecord, TMeta>(resource(), params(), meta());
		},
		options,
	);

	return query;
};
