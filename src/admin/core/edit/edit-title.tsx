import { createMemo } from 'solid-js';
import { AppTitle } from '../app-title';
import { DataRecord, useRecord } from '../record';
import { useResource, useResourceDefinition } from '../resource';

export const EditTitle = (props: { record?: DataRecord; resource?: string }) => {
	const record = useRecord(props);
	const resource = useResource(props);
	const resourceDefinition = useResourceDefinition(props);

	const title = createMemo(() => {
		const currentRecord = record();

		if (resourceDefinition) {
			const definition = resourceDefinition();
			if (definition?.recordRepresentation) {
				return definition.recordRepresentation(currentRecord);
			}
		}

		return `${resource} #${currentRecord?.id}`;
	});

	return <AppTitle>{title()}</AppTitle>;
};
