import { useSearchParams } from '@solidjs/router';
import { createEffect, createSignal, mergeProps } from 'solid-js';
import { ListContext } from '../list-context';
import { useResource } from '../resource';
import { createGetListQuery } from '../crud-hooks/create-get-list-query';

export const createListController = (options?: CreateListControllerOptions): ListContext => {
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

	const query = createGetListQuery({
		resource,
		params,
	});

	const data = () => query.data?.data;
	const total = () => query.data?.total;
	const isLoading = () => query.isLoading;

	const setPage = (page: number) => {
		setSearchParams({ page });
	};

	const setFilter = (filter: any) => {
		setSearchParams({ filter: JSON.stringify(filter) });
	};

	return {
		data,
		total,
		isLoading,
		setPage,
		setFilter,
		pagination: () => params().pagination,
		sort: () => params().sort,
		filter: () => params().filter,
	};
};

export interface CreateListControllerOptions {
	resource?: string;
	perPage?: number;
	sort?: string;
	order?: string;
	filter?: any;
}
