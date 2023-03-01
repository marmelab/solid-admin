import { createMutation, CreateMutationOptions } from '@tanstack/solid-query';
import { DataRecord, Identifier } from '../record';
import { useDataProvider } from '../data-provider';

export const createDeleteMutation = <
	TRecord extends DataRecord = DataRecord,
	TMeta extends Record<string, unknown> | undefined = undefined,
	TError = unknown,
	TContext = unknown,
>(
	variables: () => { resource: string; params?: () => { id: Identifier | undefined }; meta?: TMeta },
	options?: Omit<CreateMutationOptions<{ data?: TRecord }, TError, Identifier | void, TContext>, 'mutationFn'>,
) => {
	const dataProvider = useDataProvider();

	const mutation = createMutation<{ data?: TRecord }, TError, Identifier | void, TContext>((calltimeId) => {
		const { params, resource, meta } = variables();
		const id = params?.().id ?? (calltimeId as Identifier);
		console.log(params?.());

		return dataProvider.delete<TRecord, TMeta>(resource, { id }, meta);
	}, options);

	return mutation;
};
