import { createContext, useContext } from 'solid-js';

export type DataProvider = {
	getList: (resource: string, params: any) => Promise<any>;
	getOne: (resource: string, params: any) => Promise<any>;
	getMany: (resource: string, params: any) => Promise<any>;
	getManyReference: (resource: string, params: any) => Promise<any>;
	update: (resource: string, params: any) => Promise<any>;
	updateMany: (resource: string, params: any) => Promise<any>;
	delete: (resource: string, params: any) => Promise<any>;
	deleteMany: (resource: string, params: any) => Promise<any>;
	create: (resource: string, params: any) => Promise<any>;
};

export const DataProviderContext = createContext<DataProvider>();

export const DataProviderProvider = (props: any) => {
	const dataProvider = () => props.dataProvider;
	return <DataProviderContext.Provider value={dataProvider()}>{props.children}</DataProviderContext.Provider>;
};

export function useDataProvider() {
	const context = useContext(DataProviderContext);

	if (context === undefined) {
		throw new Error('useDataProvider must be used within a DataProviderProvider');
	}

	return context;
}
