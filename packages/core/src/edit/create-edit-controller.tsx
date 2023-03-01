import { useParams } from '@solidjs/router';
import { mergeProps } from 'solid-js';
import { createUpdateMutation, createGetOneQuery } from '../crud-hooks';
import { useNotify } from '../notifications';
import { useResource } from '../resource';
import { RedirectTo, useRedirect } from '../use-redirect';

export const createEditController = (options: { resource?: string; id?: string; redirect?: RedirectTo }) => {
	const resource = useResource(options);
	const params = useParams();
	const mergedOptions = mergeProps({ redirect: 'list' }, options);
	const redirect = useRedirect();
	const id = () => options.id ?? params.id;
	const query = createGetOneQuery(() => ({ resource, params: { id: id() } }), {
		get enabled() {
			return !!id();
		},
	});

	const notify = useNotify();
	const mutation = createUpdateMutation(
		() => ({
			resource,
			params: { id: id() },
		}),
		{
			onSuccess: () => {
				notify({
					message: 'sa.messages.updated',
					type: 'success',
					autoHideTimeout: 3000,
				});
				redirect(mergedOptions.redirect);
			},
			onError: (error: Error) => {
				notify({
					message: error.message,
					type: 'error',
				});
			},
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
