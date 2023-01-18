import { createMemo } from 'solid-js';
import { AppTitleValue } from '../app-title';
import { DataRecord, useRecord } from '../record';
import { useResource, useResourceDefinition } from '../resource';

export const EditTitle = (props: { record?: DataRecord; resource?: string }) => {
	const record = useRecord(props);
	const resource = useResource(props);
	const resourceDefinition = useResourceDefinition(props);

	const title = createMemo(() =>
		resourceDefinition?.recordRepresentation ? (
			resourceDefinition.recordRepresentation(record())
		) : (
			<>
				{resource} #{record()?.id}
			</>
		),
	);

	return <AppTitle>{title()}</AppTitle>;
};
