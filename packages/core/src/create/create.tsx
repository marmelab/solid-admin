import { JSX, splitProps } from 'solid-js';
import { SaveContextProvider } from '../form/save-context';
import { DataRecord, RecordProvider } from '../record';
import { createCreateController } from './create-create-controller';

export const Create = <
	TRecord extends DataRecord = DataRecord,
	TData extends Record<string, unknown> = Record<string, unknown>,
	TMeta extends Record<string, unknown> | undefined = undefined,
	TError = unknown,
	TContext = unknown,
>(props: { children: JSX.Element; record?: DataRecord; resource?: string }) => {
	const [localProps, controllerOptions] = splitProps(props, ['children']);
	const controllerProps = createCreateController<TRecord, TData, TMeta, TError, TContext>(controllerOptions);
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
