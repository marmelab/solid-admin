import { useParams } from '@solidjs/router';
import { JSX } from 'solid-js';
import { createUpdateMutation, createGetOneQuery } from '../crud-hooks';
import { SaveContextProvider } from '../form/save-context';
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
	const mutation = createUpdateMutation(() => ({
		resource,
		params: { id: id() },
	}));

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
