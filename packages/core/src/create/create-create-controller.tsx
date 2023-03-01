import { mergeProps } from 'solid-js';
import { RedirectTo, useRedirect } from '../use-redirect';
import { createCreateMutation } from '../crud-hooks';
import { useNotify } from '../notifications';
import { DataRecord } from '../record';
import { useResource } from '../resource';

export const createCreateController = (options: { record?: DataRecord; resource?: string; redirect?: RedirectTo }) => {
	const resource = useResource(options);
	const notify = useNotify();
	const redirect = useRedirect();
	const mergedOptions = mergeProps({ redirect: 'list' }, options);

	const mutation = createCreateMutation(() => ({ resource }), {
		onSuccess: () => {
			notify({
				message: 'sa.messages.created',
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
	});
	const isMutating = () => mutation.isLoading;

	return {
		resource,
		mutation,
		isMutating,
	};
};
