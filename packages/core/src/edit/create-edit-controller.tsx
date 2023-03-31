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
	TMeta = unknown,
	TError = unknown,
	TContext = unknown,
>(
	options: CreateEditControllerOptions<TRecord, TData, TMeta, TError, TContext>,
) => {
	const resource = useResource(options);
	const params = useParams();
	const mergedOptions = mergeProps({ redirect: 'list' }, options);
	const redirect = useRedirect();
	const id = options.id ?? params.id;
	const query = createGetOneQuery<TRecord, TMeta, TError>(
		() => ({ resource, params: { id }, meta: mergedOptions.meta }),
		{
			get enabled() {
				return !!id;
			},
			...mergedOptions.queryOptions,
		},
	);

	const notify = useNotify();
	const mutation = createUpdateMutation<TRecord, TData, TMeta, TError, TContext>(
		() => ({
			resource,
			params: { id },
			meta: mergedOptions.meta,
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

	const contextValue = new Proxy<EditControllerResult>({} as EditControllerResult, {
		get(target, props) {
			if (props === 'id') {
				return id;
			}
			if (props === 'data') {
				return query.data?.data;
			}
			if (props === 'resource') {
				return resource;
			}
			if (props === 'query') {
				return query;
			}
			if (props === 'mutation') {
				return mutation;
			}
			if (props === 'isMutating') {
				return mutation.isLoading;
			}
		},
	});

	return contextValue;
};

export interface CreateEditControllerOptions<
	TRecord extends DataRecord = DataRecord,
	TData extends Record<string, unknown> = Record<string, unknown>,
	TMeta = unknown,
	TError = unknown,
	TContext = unknown,
> {
	id?: Identifier;
	resource?: string;
	redirect?: RedirectTo;
	meta?: TMeta;
	queryOptions?: Parameters<typeof createGetOneQuery<TRecord, TMeta, TError>>[1];
	mutationOptions?: Parameters<typeof createUpdateMutation<TRecord, TData, TMeta, TError, TContext>>[1];
}

export type EditControllerResult = {
	id: Identifier;
	data?: DataRecord;
	resource: string;
	query: ReturnType<typeof createGetOneQuery>;
	mutation: ReturnType<typeof createUpdateMutation>;
	isLoading: boolean;
	isMutating: boolean;
}