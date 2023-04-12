import { JSX, Show as SolidShow, splitProps } from 'solid-js';
import { DataRecord, RecordProvider } from '../record';
import { ShowTitle } from './show-title';
import { createShowController } from './create-show-controller';

export const Show = <
	TRecord extends DataRecord = DataRecord,
	TMeta = unknown,
	TError = unknown,
>(props: { children: JSX.Element; loading?: JSX.Element; resource?: string; id?: string }) => {
	const [localProps, controllerOptions] = splitProps(props, ['children']);
	const controllerProps = createShowController<TRecord, TMeta, TError>(controllerOptions);

	return (
		<SolidShow when={controllerProps.data} fallback={props.loading}>
			<RecordProvider record={controllerProps.data}>
				<ShowTitle />
				{localProps.children}
			</RecordProvider>
		</SolidShow>
	);
};
