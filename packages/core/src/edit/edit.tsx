import { JSX, Show, splitProps } from 'solid-js';
import { SaveContextProvider, SaveContextValue } from '../form/save-context';
import { DataRecord, RecordProvider } from '../record';
import { createEditController, CreateEditControllerOptions } from './create-edit-controller';
import { EditTitle } from './edit-title';

export const Edit = <
	TRecord extends DataRecord = DataRecord,
	TData extends Record<string, unknown> = Record<string, unknown>,
	TMeta = unknown,
	TError = unknown,
	TContext = unknown,
>(
	props: { children: JSX.Element; loading?: JSX.Element } & CreateEditControllerOptions<TRecord, TData, TMeta, TError, TContext>,
) => {
	const [localProps, controllerOptions] = splitProps(props, ['children']);
	const controllerProps = createEditController<TRecord, TData, TMeta, TError, TContext>(controllerOptions);
	const saveContext = new Proxy<SaveContextValue>({} as SaveContextValue, {
		get(target, props) {
			if (props === 'save') {
				return controllerProps.mutation.mutateAsync;
			}
			if (props === 'isLoading') {
				return controllerProps.mutation.isLoading;
			}
		},
	});

	return (
		<Show when={controllerProps.data} fallback={props.loading}>
			<RecordProvider record={controllerProps.data}>
				<SaveContextProvider value={saveContext}>
					<EditTitle />
					{localProps.children}
				</SaveContextProvider>
			</RecordProvider>
		</Show>
	);
};
