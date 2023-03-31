import { CreateQueryResult } from '@tanstack/solid-query';
import { GetListResult } from './data-provider';
import { createContext, useContext } from 'solid-js';

export type ListContextValue = Omit<CreateQueryResult<GetListResult>, 'data'> &
	GetListResult & {
		setPage: (page: number) => void;
		setFilter: (filter: any) => void;
		setSort: (params: { field: string; order: string }) => void;
		pagination: { page: number; perPage: number };
		sort: { field: string; order: string };
		filter: any;
	};

export const ListContext = createContext<ListContextValue>();

export const ListProvider = (props: any) => {
	return <ListContext.Provider value={props.value}>{props.children}</ListContext.Provider>;
};

export const useList = (options?: { list: ListContextValue }) => {
	if (options?.list != null) {
		return options.list;
	}

	const context = useContext(ListContext);
	if (!context) {
		throw new Error('useList must be used within a ListProvider');
	}
	return context;
};
