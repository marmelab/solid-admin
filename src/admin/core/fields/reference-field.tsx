import { Link } from '@solidjs/router';
import get from 'lodash/get';
import { JSX } from 'solid-js';
import { createGetManyAggregateQuery } from '../crud-hooks';
import { DataRecord, RecordProvider, useRecord } from '../record';
import { ResourceProvider } from '../resource';

export const ReferenceField = (props: {
	children: JSX.Element;
	source: string;
	reference: string;
	record?: DataRecord;
}) => {
	const record = useRecord(props);
	const referenceId = () => get(record(), props.source);
	const query = createReferenceQuery(() => ({
		resource: props.reference,
		id: referenceId(),
	}));

	const referenceRecord = () => {
		return query.data && query.data.length > 0 ? query.data[0] : null;
	}

	return (
		<ResourceProvider resource={props.reference}>
			<RecordProvider record={referenceRecord}>
				<Link href={`/${props.reference}/${referenceRecord()?.id}`}>{props.children}</Link>
			</RecordProvider>
		</ResourceProvider>
	);
};

type CreateReferenceQueryOptions = () => { resource: string; id: string | number };
const createReferenceQuery = (options: CreateReferenceQueryOptions) => {
	const resource = () => options().resource;
	const id = () => options().id;

	const query = createGetManyAggregateQuery(() => ({ resource: resource(), params: { ids: [id()] } }));

	return query;
};
