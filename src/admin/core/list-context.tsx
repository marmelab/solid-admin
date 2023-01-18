import { createContext, useContext } from 'solid-js';

export type ListContext = {
	data: () => any[];
	total: () => number;
	isLoading: () => boolean;
	setPage: (page: number) => void;
	setFilter: (filter: any) => void;
	pagination: () => { page: number; perPage: number };
	sort: () => { field: string; order: string };
	filter: () => any;
};

export const ListContext = createContext<ListContext>();

export const ListProvider = (props: any) => {
	return <ListContext.Provider value={props.list}>{props.children}</ListContext.Provider>;
};

export const useList = (options?: { list: ListContext }) => {
	if (options?.list) {
		return options.list;
	}

	const context = useContext(ListContext);
	return context;
};
