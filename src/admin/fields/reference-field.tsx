import { Link } from '@solidjs/router';
import { createQuery, defaultContext } from '@tanstack/solid-query';
import get from 'lodash/get';
import { JSX } from 'solid-js';
import { useDataProvider } from '../data-provider';
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

	const referenceRecord = () => query.data?.data;

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
	const dataProvider = useDataProvider();
	const resource = () => options().resource;
	const id = () => options().id;

	const query = createQuery(
		() => [resource(), 'getOne', id()],
		({ queryKey }) => dataProvider.getOne(queryKey[0].toString(), { id: queryKey[2] }),
		{
			context: defaultContext,
			get enabled() {
				return id() != null;
			},
		},
	);

	return query;
};
