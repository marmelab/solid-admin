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
	const query = createReferenceQuery({
		resource: props.reference,
		id: get(record(), props.source),
	});

	const referenceRecord = () => query.data?.data;

	return (
		<ResourceProvider resource={props.reference}>
			<RecordProvider record={referenceRecord}>
				<Link href={`/${props.reference}/${referenceRecord()?.id}`}>{props.children}</Link>
			</RecordProvider>
		</ResourceProvider>
	);
};

const createReferenceQuery = (options: { resource: string; id: string | number }) => {
	const dataProvider = useDataProvider();
	const query = createQuery(
		() => [options.resource, 'getOne', options.id],
		({ queryKey }) => dataProvider.getOne(options.resource, { id: options.id }),
		{
			context: defaultContext,
			get enabled() {
				return options.id != null;
			},
		},
	);

	return query;
};
