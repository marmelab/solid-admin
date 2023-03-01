import { createMutation, CreateMutationOptions } from '@tanstack/solid-query';
import { DataRecord, Identifier } from '../record';
import { useDataProvider } from '../data-provider';

export const createUpdateMutation = <
	TRecord extends DataRecord = DataRecord,
	TData extends Record<string, unknown> = Record<string, unknown>,
	TMeta = unknown,
	TError = unknown,
	TContext = unknown,
>(
	variables: () => { resource: string; params: { id: Identifier }; meta?: TMeta },
	options?: Omit<CreateMutationOptions<{ data: TRecord }, TError, TData, TContext>, 'mutationFn'>,
) => {
	const dataProvider = useDataProvider();

	const mutation = createMutation<{ data: TRecord }, TError, TData, TContext>((values) => {
		const { resource, params, meta } = variables();
		return dataProvider.update<TRecord, TData, TMeta>(
			resource,
			{
				id: params.id,
				data: values,
			},
			meta,
		);
	}, options);

	return mutation;
};
