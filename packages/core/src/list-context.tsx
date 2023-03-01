import { createContext, useContext } from 'solid-js';

export type ListContextValue = {
	data: () => any[] | undefined;
	total: () => number | undefined;
	isLoading: () => boolean;
	setPage: (page: number) => void;
	setFilter: (filter: any) => void;
	setSort: (params: { field: string; order: string }) => void;
	pagination: () => { page: number; perPage: number };
	sort: () => { field: string; order: string };
	filter: () => any;
};

export const ListContext = createContext<ListContextValue>();

export const ListProvider = (props: any) => {
	return <ListContext.Provider value={props.list}>{props.children}</ListContext.Provider>;
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
