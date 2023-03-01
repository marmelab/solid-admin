import { JSX, splitProps } from 'solid-js';
import { SaveContextProvider } from '../form/save-context';
import { DataRecord, RecordProvider } from '../record';
import { createCreateController } from './create-create-controller';

export const Create = (props: { children: JSX.Element; record?: DataRecord; resource?: string }) => {
	const [localProps, controllerOptions] = splitProps(props, ['children']);
	const controllerProps = createCreateController(controllerOptions);
	const saveContext = {
		save: controllerProps.mutation.mutateAsync,
		isLoading: controllerProps.mutation.isLoading,
	};

	return (
		<RecordProvider record={props.record}>
			<SaveContextProvider value={saveContext}>{localProps.children}</SaveContextProvider>
		</RecordProvider>
	);
};
