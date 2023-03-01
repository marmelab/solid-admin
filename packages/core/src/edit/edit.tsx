import { JSX, splitProps } from 'solid-js';
import { SaveContextProvider } from '../form/save-context';
import { RecordProvider } from '../record';
import { createEditController } from './create-edit-controller';
import { EditTitle } from './edit-title';

export const Edit = (props: { children: JSX.Element; resource?: string; id?: string; redirect?: any }) => {
	const [localProps, controllerOptions] = splitProps(props, ['children']);
	const controllerProps = createEditController(controllerOptions);
	const saveContext = {
		save: controllerProps.mutation.mutateAsync,
		isLoading: controllerProps.mutation.isLoading,
	};

	return (
		<RecordProvider record={controllerProps.data}>
			<SaveContextProvider value={saveContext}>
				<EditTitle />
				{localProps.children}
			</SaveContextProvider>
		</RecordProvider>
	);
};
