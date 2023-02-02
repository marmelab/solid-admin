import { createContext, useContext } from 'solid-js';

export type ListContextValue = {
	data: () => any[];
	total: () => number;
	isLoading: () => boolean;
	// eslint-disable-next-line no-unused-vars
	setPage: (page: number) => void;
	// eslint-disable-next-line no-unused-vars
	setFilter: (filter: any) => void;
	// eslint-disable-next-line no-unused-vars
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
