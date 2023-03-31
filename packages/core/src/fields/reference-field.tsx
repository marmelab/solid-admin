import { Link } from '@solidjs/router';
import { CreateQueryResult } from '@tanstack/solid-query';
import get from 'lodash/get';
import { JSX, Show } from 'solid-js';
import { createGetManyAggregateQuery } from '../crud-hooks';
import { DataRecord, Identifier, RecordProvider, useRecord } from '../record';
import { ResourceProvider } from '../resource';

export const ReferenceField = (props: {
	children: JSX.Element;
	loading?: JSX.Element;
	source: string;
	reference: string;
	record?: DataRecord;
}) => {
	const record = useRecord(props);
	const referenceId = () => get(record, props.source) as Identifier;
	const query = createReferenceQuery(() => ({
		resource: props.reference,
		id: referenceId(),
	}));

	return (
		<Show when={query.data} fallback={props.loading}>
			<ResourceProvider resource={props.reference}>
				<RecordProvider record={query.data}>
					<Link href={`/${props.reference}/${query.data?.id}`}>{props.children}</Link>
				</RecordProvider>
			</ResourceProvider>
		</Show>
	);
};

type CreateReferenceQueryOptions = () => { resource: string; id: string | number };
const createReferenceQuery = (options: CreateReferenceQueryOptions) => {
	const resource = () => options().resource;
	const id = () => options().id;

	const query = createGetManyAggregateQuery(() => ({ resource: resource(), params: { ids: [id()] } }));

	const queryProxy = new Proxy<CreateQueryResult<any, unknown>>(query, {
		get: (target, prop) => {
			if (prop === 'data') {
				return query.data && query.data.length > 0 ? query.data[0] : null;
			}

			// @ts-ignore
			return query[prop];
		},
	});

	return queryProxy;
};
