import { QueryClient, useQueryClient, createQuery } from '@tanstack/solid-query';
import union from 'lodash/union';
import { DataProvider, useDataProvider } from '../data-provider';

/**
 * Call the dataProvider.getMany() method and return the resolved result
 * as well as the loading state.
 *
 * The return value updates according to the request state:
 *
 * - start: { isLoading: true, isFetching: true, refetch }
 * - success: { data: [data from response], isLoading: false, isFetching: false, refetch }
 * - error: { error: [error from response], isLoading: false, isFetching: false, refetch }
 *
 * This hook will return the cached result when called a second time
 * with the same parameters, until the response arrives.
 *
 * This hook aggregates and deduplicates calls to the same resource, so for instance, if an app calls:
 *
 * useGetManyAggregate('tags', [1, 2, 3]);
 * useGetManyAggregate('tags', [3, 4]);
 *
 * during the same tick, the hook will only call the dataProvider once with the following parameters:
 *
 * dataProvider.getMany('tags', [1, 2, 3, 4])
 *
 * @param resource The resource name, e.g. 'posts'
 * @param {Params} params The getMany parameters { ids, meta }
 * @param {Object} options Options object to pass to the dataProvider.
 * @param {boolean} options.enabled Flag to conditionally run the query. If it's false, the query will not run
 * @param {Function} options.onSuccess Side effect function to be executed upon success, e.g. { onSuccess: { refresh: true } }
 * @param {Function} options.onError Side effect function to be executed upon failure, e.g. { onError: error => notify(error.message) }
 *
 * @typedef Params
 * @prop params.ids The ids to get, e.g. [123, 456, 789]
 * @prop params.meta Optional meta parameters

 * @returns The current request state. Destructure as { data, error, isLoading, isFetching, refetch }.
 *
 * @example
 *
 * import { useGetManyAggregate, useRecordContext } from 'react-admin';
 *
 * const PostTags = () => {
 *     const record = useRecordContext();
 *     const { data, isLoading, error } = useGetManyAggregate('tags', { ids: record.tagIds });
 *     if (isLoading) { return <Loading />; }
 *     if (error) { return <p>ERROR</p>; }
 *     return (
 *          <ul>
 *              {data.map(tag => (
 *                  <li key={tag.id}>{tag.name}</li>
 *              ))}
 *          </ul>
 *      );
 * };
 */
export const createGetManyAggregateQuery = (variables: () => { resource: string; params: any }, options?: any) => {
	const dataProvider = useDataProvider();
	const queryClient = useQueryClient();
	// const queryCache = queryClient.getQueryCache();
	const resource = () => variables().resource;
	const params = () => variables().params;

	return createQuery<any[]>(
		() => [resource(), 'getMany', params()],
		({ queryKey }) => {
			const resource = queryKey[0] as string;
			const params = queryKey[2] as any;
			return new Promise((resolve, reject) => {
				if (!params.ids || params.ids.length === 0) {
					// no need to call the dataProvider
					return resolve([]);
				}
				// debounced / batched fetch
				return callGetManyQueries({
					resource,
					ids: params.ids,
					meta: params.meta,
					resolve,
					reject,
					dataProvider,
					queryClient,
				});
			});
		},
		{
			retry: false,
			...options,
		},
	);
};

/**
 * Batch all calls to a function into one single call with the arguments of all the calls.
 *
 * @example
 * let sum = 0;
 * const add = (args) => { sum = args.reduce((arg, total) => total + arg, 0); };
 * const addBatched = batch(add);
 * addBatched(2);
 * addBatched(8);
 * // add will be called once with arguments [2, 8]
 * // and sum will be equal to 10
 */
const batch = (fn: Function) => {
	let capturedArgs: any[] = [];
	let timeout: ReturnType<typeof setTimeout> | null = null;
	return (arg: any) => {
		capturedArgs.push(arg);
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			timeout = null;
			fn([...capturedArgs]);
			capturedArgs = [];
		}, 0);
	};
};

interface GetManyCallArgs {
	resource: string;
	ids: any[];
	meta?: any;
	// eslint-disable-next-line no-unused-vars
	resolve: (data: any[]) => void;
	// eslint-disable-next-line no-unused-vars
	reject: (error?: any) => void;
	dataProvider: DataProvider;
	queryClient: QueryClient;
}

/**
 * Group and execute all calls to the dataProvider.getMany() method for the current tick
 *
 * Thanks to batch(), this function executes at most once per tick,
 * whatever the number of calls to useGetManyAggregate().
 */
const callGetManyQueries = batch((calls: GetManyCallArgs[]) => {
	const dataProvider = calls[0].dataProvider;
	const queryClient = calls[0].queryClient;

	/**
	 * Aggregate calls by resource
	 *
	 * callsByResource will look like:
	 * {
	 *     posts: [{ resource, ids, resolve, reject, dataProvider, queryClient }, ...],
	 *     tags: [{ resource, ids, resolve, reject, dataProvider, queryClient }, ...],
	 * }
	 */
	const callsByResource = calls.reduce((acc, callArgs) => {
		if (!acc[callArgs.resource]) {
			acc[callArgs.resource] = [];
		}
		acc[callArgs.resource].push(callArgs);
		return acc;
	}, {} as { [resource: string]: GetManyCallArgs[] });

	/**
	 * For each resource, aggregate ids and call dataProvider.getMany() once
	 */
	Object.keys(callsByResource).forEach((resource) => {
		const callsForResource = callsByResource[resource];

		/**
		 * Extract ids from queries, aggregate and deduplicate them
		 *
		 * @example from [[1, 2], [2, null, 3], [4, null]] to [1, 2, 3, 4]
		 */
		const aggregatedIds = callsForResource
			.reduce((acc, { ids }) => union(acc, ids), [] as any[]) // concat + unique
			.filter((v) => v != null && v !== ''); // remove null values

		const uniqueMeta = callsForResource.reduce((acc, { meta }) => meta || acc, undefined);

		if (aggregatedIds.length === 0) {
			// no need to call the data provider if all the ids are null
			callsForResource.forEach(({ resolve }) => {
				resolve([]);
			});
			return;
		}

		const callThatHasAllAggregatedIds = callsForResource.find(
			({ ids }) => JSON.stringify(ids) === JSON.stringify(aggregatedIds),
		);
		if (callThatHasAllAggregatedIds) {
			// There is only one call (no aggregation), or one of the calls has the same ids as the sum of all calls.
			// Either way, we can't trigger a new fetchQuery with the same signature, as it's already pending.
			// Therefore, we reply with the dataProvider
			const { dataProvider, resource, ids, meta } = callThatHasAllAggregatedIds;

			dataProvider
				.getMany(resource, { ids, meta })
				.then(({ data }) => data)
				.then(
					(data) => {
						// We must then resolve all the pending calls with the data they requested
						callsForResource.forEach(({ ids, resolve }) => {
							resolve(data.filter((record: any) => ids.map((id) => String(id)).includes(String(record.id))));
						});
					},
					(error) => {
						// All pending calls must also receive the error
						callsForResource.forEach(({ reject }) => {
							reject(error);
						});
					},
				);
			return;
		}

		/**
		 * Call dataProvider.getMany() with the aggregatedIds,
		 * and resolve each of the promises using the results
		 */
		queryClient
			.fetchQuery<any[], Error, any[]>(
				[
					resource,
					'getMany',
					{
						ids: aggregatedIds.map((id: any) => String(id)),
						meta: uniqueMeta,
					},
				],
				() =>
					dataProvider
						.getMany(resource, {
							ids: aggregatedIds,
							meta: uniqueMeta,
						})
						.then(({ data }) => data),
			)
			.then((data) => {
				callsForResource.forEach(({ ids, resolve }) => {
					resolve(data.filter((record) => ids.map((id) => String(id)).includes(String(record.id))));
				});
			})
			.catch((error) => callsForResource.forEach(({ reject }) => reject(error)));
	});
});
