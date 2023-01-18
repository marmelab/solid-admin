import { useParams } from '@solidjs/router';
import { JSX } from 'solid-js';
import { createUpdateMutation, createGetOneQuery } from '../crud-hooks';
import { SaveContextProvider } from '../form/save-context';
import { useNotify } from '../notifications';
import { RecordProvider } from '../record';
import { useResource } from '../resource';

export const Edit = (props: { children: JSX.Element; resource: string; id?: string }) => {
	const resource = useResource(props);
	const params = useParams();
	const id = () => props.id ?? params.id;
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
			},
			onError: (error: Error) => {
				notify({
					message: error.message,
					type: 'error',
				});
			}
		},
	);

	const record = () => query.data?.data;

	return (
		<RecordProvider record={record}>
			<SaveContextProvider
				value={(values) => {
					return mutation.mutateAsync(values);
				}}
			>
				{props.children}
			</SaveContextProvider>
		</RecordProvider>
	);
};
