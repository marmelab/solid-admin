import { createMutation, CreateMutationOptions } from '@tanstack/solid-query';
import { DataRecord, Identifier } from '../record';
import { useDataProvider } from '../data-provider';

export const createDeleteMutation = <
	TRecord extends DataRecord = DataRecord,
	TMeta = unknown,
	TError = unknown,
	TContext = unknown,
>(
	variables: () => { resource: string; params?: () => { id: Identifier } | undefined; meta?: TMeta },
	options?: Omit<
		CreateMutationOptions<{ data?: TRecord }, TError, { id: Identifier } | undefined, TContext>,
		'mutationFn'
	>,
) => {
	const dataProvider = useDataProvider();

	const mutation = createMutation<{ data?: TRecord }, TError, { id: Identifier } | undefined, TContext>((params) => {
		const { resource, meta } = variables();
		if (params == null) {
			throw new Error('The delete mutation parameters are missing');
		}
		return dataProvider.delete<TRecord, TMeta>(resource, params, meta);
	}, options);

	return {
		...mutation,
		mutate: (calltimePrams?: { id: Identifier }) => {
			const { params } = variables();
			const finalParams = params?.() ?? calltimePrams;

			return mutation.mutate(finalParams);
		},
	};
};
