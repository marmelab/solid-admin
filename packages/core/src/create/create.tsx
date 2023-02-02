import { JSX } from 'solid-js';
import { createCreateMutation } from '../crud-hooks';
import { SaveContextProvider } from '../form/save-context';
import { useNotify } from '../notifications';
import { DataRecord, RecordProvider } from '../record';
import { useResource } from '../resource';

export const Create = (props: { children: JSX.Element; record?: DataRecord; resource?: string }) => {
	const resource = useResource(props);
	const notify = useNotify();
	const mutation = createCreateMutation(() => ({ resource }), {
		onSuccess: () => {
			notify({
				message: 'sa.messages.created',
				type: 'success',
				autoHideTimeout: 3000,
			});
		},
		onError: (error: Error) => {
			notify({
				message: error.message,
				type: 'error',
			});
		},
	});

	return (
		<RecordProvider record={props.record}>
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
