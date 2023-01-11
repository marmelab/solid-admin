import { JSX } from 'solid-js';
import { createCreateMutation } from '../crud-hooks';
import { SaveContextProvider } from '../form/save-context';
import { DataRecord, RecordProvider } from '../record';
import { useResource } from '../resource';

export const Create = (props: { children: JSX.Element; record?: DataRecord; resource: string }) => {
	const resource = useResource(props);
	const mutation = createCreateMutation({ resource });

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
