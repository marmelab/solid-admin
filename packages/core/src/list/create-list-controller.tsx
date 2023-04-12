import { useSearchParams } from '@solidjs/router';
import { createEffect, createSignal, mergeProps } from 'solid-js';
import { ListContextValue } from '../list-context';
import { useResource } from '../resource';
import { DataRecord } from '../record';
import { createGetListQuery } from '../crud-hooks/create-get-list-query';

export const createListController = <TRecord extends DataRecord = DataRecord, TMeta = unknown, TError = unknown>(
	options?: CreateListControllerOptions<TRecord, TMeta, TError>
): ListContextValue => {
	const resource = useResource(options);
	const [searchParams, setSearchParams] = useSearchParams();

	const merged = mergeProps({ page: 1, perPage: 10, sort: 'id', order: 'ASC', filter: {} }, options, {
		page: searchParams.page ? parseInt(searchParams.page) : undefined,
		perPage: searchParams.perPage ? parseInt(searchParams.perPage) : undefined,
		sort: searchParams.sort,
		order: searchParams.order,
		filter: searchParams.filter ? JSON.parse(searchParams.filter) : {},
	});

	const [params, setParams] = createSignal({
		pagination: {
			page: merged.page,
			perPage: merged.perPage,
		},
		sort: {
			field: merged.sort,
			order: merged.order,
		},
		filter: merged.filter,
	});

	createEffect(() => {
		setParams({
			pagination: {
				page: searchParams.page ? parseInt(searchParams.page) : merged.page,
				perPage: searchParams.perPage ? parseInt(searchParams.perPage) : merged.perPage,
			},
			sort: {
				field: searchParams.sort ? searchParams.sort : merged.sort,
				order: searchParams.order ? searchParams.order : merged.order,
			},
			filter: searchParams.filter ? JSON.parse(searchParams.filter) : merged.filter,
		});
	});

	const query = createGetListQuery<TRecord, TMeta, TError>(
		() => ({ resource, params, meta: options?.meta }),
		options?.queryOptions,
	);

	const setPage = (page: number) => {
		setSearchParams({ page });
	};

	const setSort = (params: { field: string; order: string }) => {
		setSearchParams({ sort: params.field, order: params.order });
	};

	const setFilter = (filter: any) => {
		setSearchParams({ filter: JSON.stringify({ ...merged.filter, filter }) });
	};

	const listContextValue = new Proxy<ListContextValue>({} as ListContextValue, {
		get(target, props) {
			if (props === 'setPage') {
				return setPage;
			}
			if (props === 'setSort') {
				return setSort;
			}
			if (props === 'setFilter') {
				return setFilter;
			}
			if (props === 'pagination') {
				return params().pagination;
			}
			if (props === 'sort') {
				return params().sort;
			}
			if (props === 'filter') {
				return params().filter;
			}
			if (props === 'data') {
				return query.data?.data;
			}
			if (props === 'total') {
				return query.data?.total;
			}

			// @ts-ignore
			return query[props];
		},
	});

	return listContextValue;
};

export interface CreateListControllerOptions<TRecord extends DataRecord = DataRecord, TMeta = unknown, TError = unknown> {
	resource?: string;
	perPage?: number;
	sort?: string;
	order?: string;
	filter?: any;
	meta?: TMeta;
	queryOptions?: Parameters<typeof createGetListQuery<TRecord, TMeta, TError>>[1];
}
