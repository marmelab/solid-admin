import { DataRecord, Identifier, useRecord } from '../record';
import { createDeleteMutation } from '../crud-hooks';
import { useResource } from '../resource';
import { useNotify } from '../notifications';
import { RedirectTo, useRedirect } from '../use-redirect';
import { mergeProps } from 'solid-js';
import { useQueryClient } from '@tanstack/solid-query';

export const createDeleteController = <
	TRecord extends DataRecord = DataRecord,
	TMeta = unknown,
	TError = unknown,
	TContext = unknown,
>(
	options?: CreateDeleteControllerOptions<TRecord, TMeta, TError, TContext>,
) => {
	const record = useRecord<TRecord>(options);
	const resource = useResource(options);
	const queryClient = useQueryClient();

	const notify = useNotify();
	const redirect = useRedirect();
	const mergedOptions = mergeProps({ redirect: false as const }, options);
	const mutation = createDeleteMutation<TRecord, TMeta, TError, TContext>(
		() => ({
			resource,
			params: () => ({
				id: record()?.id as Identifier,
			}),
			meta: mergedOptions.meta,
		}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries([resource]);
				notify({
					message: 'ra.notification.deleted',
					type: 'info',
					messageArgs: { smart_count: 1, _: 'Item deleted' },
				});
				redirect(mergedOptions.redirect, { record: record(), resource });
			},
			onError: () => {
				notify({ message: 'ra.notification.http_error', type: 'warning' });
			},
			...mergedOptions.mutationOptions,
		},
	);
	const isMutating = () => mutation.isLoading;

	return {
		record,
		resource,
		mutation,
		isMutating,
	};
};

export interface CreateDeleteControllerOptions<
	TRecord extends DataRecord = DataRecord,
	TMeta = unknown,
	TError = unknown,
	TContext = unknown,
> {
	record?: TRecord | (() => TRecord | undefined);
	resource?: string;
	redirect?: RedirectTo;
	meta?: TMeta;
	mutationOptions?: Parameters<typeof createDeleteMutation<TRecord, TMeta, TError, TContext>>[1];
}
