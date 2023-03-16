import { createMutation, CreateMutationOptions } from '@tanstack/solid-query';
import { DataRecord } from '../record';
import { useDataProvider } from '../data-provider';

export const createCreateMutation = <
	TRecord extends DataRecord = DataRecord,
	TData extends Record<string, unknown> = Record<string, unknown>,
	TMeta = unknown,
	TError = unknown,
	TContext = unknown,
>(
	variables: () => { resource: string; meta?: TMeta },
	options?: Omit<CreateMutationOptions<{ data: TRecord }, TError, TData, TContext>, 'mutationFn'>,
) => {
	const dataProvider = useDataProvider();

	const mutation = createMutation<{ data: TRecord }, TError, TData, TContext>((values) => {
		const { resource, meta } = variables();
		return dataProvider.create<TRecord, TData, TMeta>(resource, { data: values }, meta);
	}, options);

	return mutation;
};
