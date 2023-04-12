import { useParams } from '@solidjs/router';
import { DataRecord, Identifier } from '../record';
import { createGetOneQuery } from '../crud-hooks';
import { useResource } from '../resource';

export const createShowController = <
	TRecord extends DataRecord = DataRecord,
	TMeta = unknown,
	TError = unknown,
>(
	options: CreateShowControllerOptions<TRecord, TMeta, TError>,
) => {
	const resource = useResource(options);
	const params = useParams();
	const id = options.id ?? params.id;
	const query = createGetOneQuery<TRecord, TMeta, TError>(() => ({ resource, params: { id }, meta: options.meta }), {
		get enabled() {
			return !!id;
		},
		...options.queryOptions,
	});

	const contextValue = new Proxy<ShowControllerResult>({} as ShowControllerResult, {
		get(target, props) {
			if (props === 'id') {
				return id;
			}
			if (props === 'data') {
				return query.data?.data;
			}
			if (props === 'resource') {
				return resource;
			}
			if (props === 'query') {
				return query;
			}
		},
	});

	return contextValue;
};

export interface CreateShowControllerOptions<
	TRecord extends DataRecord = DataRecord,
	TMeta = unknown,
	TError = unknown,
> {
	id?: Identifier;
	resource?: string;
	meta?: TMeta;
	queryOptions?: Parameters<typeof createGetOneQuery<TRecord, TMeta, TError>>[1];
}

export type ShowControllerResult = {
	id: Identifier;
	data?: DataRecord;
	resource: string;
	query: ReturnType<typeof createGetOneQuery>;
	isLoading: boolean;
}