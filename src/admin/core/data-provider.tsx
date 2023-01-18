import { createContext, useContext } from 'solid-js';

export type DataProvider = {
	// eslint-disable-next-line no-unused-vars
	getList: (resource: string, params: any) => Promise<any>;
	// eslint-disable-next-line no-unused-vars
	getOne: (resource: string, params: any) => Promise<any>;
	// eslint-disable-next-line no-unused-vars
	getMany: (resource: string, params: any) => Promise<any>;
	// eslint-disable-next-line no-unused-vars
	getManyReference: (resource: string, params: any) => Promise<any>;
	// eslint-disable-next-line no-unused-vars
	update: (resource: string, params: any) => Promise<any>;
	// eslint-disable-next-line no-unused-vars
	updateMany: (resource: string, params: any) => Promise<any>;
	// eslint-disable-next-line no-unused-vars
	delete: (resource: string, params: any) => Promise<any>;
	// eslint-disable-next-line no-unused-vars
	deleteMany: (resource: string, params: any) => Promise<any>;
	// eslint-disable-next-line no-unused-vars
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
