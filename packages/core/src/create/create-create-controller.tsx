import { mergeProps } from 'solid-js';
import { RedirectTo, useRedirect } from '../use-redirect';
import { createCreateMutation } from '../crud-hooks';
import { useNotify } from '../notifications';
import { DataRecord } from '../record';
import { useResource } from '../resource';

export const createCreateController = <
	TRecord extends DataRecord = DataRecord,
	TData extends Record<string, unknown> = Record<string, unknown>,
	TMeta = unknown,
	TError = unknown,
	TContext = unknown,
>(
	options?: CreateCreateControllerOptions<TRecord, TData, TMeta, TError, TContext>,
) => {
	const resource = useResource(options);
	const notify = useNotify();
	const redirect = useRedirect();
	const mergedOptions = mergeProps({ redirect: 'list' }, options);

	const mutation = createCreateMutation<TRecord, TData, TMeta, TError, TContext>(
		() => ({ resource, meta: mergedOptions.meta }),
		{
			onSuccess: (data: { data: DataRecord }) => {
				notify({
					message: 'sa.messages.created',
					type: 'success',
					autoHideTimeout: 3000,
				});
				redirect(mergedOptions.redirect, { record: data.data });
			},
			onError: (error) => {
				notify({
					message: (error as Error).message,
					type: 'error',
				});
			},
			...mergedOptions.mutationOptions,
		},
	);
	const isMutating = () => mutation.isLoading;

	return {
		resource,
		mutation,
		isMutating,
	};
};

export interface CreateCreateControllerOptions<
	TRecord extends DataRecord = DataRecord,
	TData extends Record<string, unknown> = Record<string, unknown>,
	TMeta = unknown,
	TError = unknown,
	TContext = unknown,
> {
	record?: DataRecord;
	resource?: string;
	redirect?: RedirectTo;
	meta?: TMeta;
	mutationOptions?: Parameters<typeof createCreateMutation<TRecord, TData, TMeta, TError, TContext>>[1];
}
