import { useParams } from '@solidjs/router';
import { mergeProps } from 'solid-js';
import { DataRecord, Identifier } from '../record';
import { createUpdateMutation, createGetOneQuery } from '../crud-hooks';
import { useNotify } from '../notifications';
import { useResource } from '../resource';
import { RedirectTo, useRedirect } from '../use-redirect';

export const createEditController = <
	TRecord extends DataRecord = DataRecord,
	TData extends Record<string, unknown> = Record<string, unknown>,
	TMeta extends Record<string, unknown> | undefined = undefined,
	TError = unknown,
	TContext = unknown,
>(
	options: CreateEditControllerOptions<TRecord, TData, TMeta, TError, TContext>,
) => {
	const resource = useResource(options);
	const params = useParams();
	const mergedOptions = mergeProps({ redirect: 'list' }, options);
	const redirect = useRedirect();
	const id = () => options.id ?? params.id;
	const query = createGetOneQuery<TRecord, TMeta, TError>(() => ({ resource, params: { id: id() } }), {
		get enabled() {
			return !!id();
		},
		...mergedOptions.queryOptions,
	});

	const notify = useNotify();
	const mutation = createUpdateMutation<TRecord, TData, TMeta, TError, TContext>(
		() => ({
			resource,
			params: { id: id() },
		}),
		{
			onSuccess: (data: { data: DataRecord }) => {
				notify({
					message: 'sa.messages.updated',
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

	const data = () => query.data?.data;
	const isLoading = () => query.isLoading;
	const isMutating = () => mutation.isLoading;

	return {
		id,
		data,
		isLoading,
		isMutating,
		resource,
		query,
		mutation,
	};
};

export interface CreateEditControllerOptions<
	TRecord extends DataRecord = DataRecord,
	TData extends Record<string, unknown> = Record<string, unknown>,
	TMeta extends Record<string, unknown> | undefined = undefined,
	TError = unknown,
	TContext = unknown,
> {
	id?: Identifier;
	resource?: string;
	redirect?: RedirectTo;
	queryOptions?: Parameters<typeof createGetOneQuery<TRecord, TMeta, TError>>[1];
	mutationOptions?: Parameters<typeof createUpdateMutation<TRecord, TData, TMeta, TError, TContext>>[1];
}
