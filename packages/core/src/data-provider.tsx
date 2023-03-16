import { useCheckError } from './auth';
import { createContext, useContext } from 'solid-js';
import { DataRecord, Identifier } from './record';

export type DataProvider = {
	getList: (resource: string, params: any) => Promise<{ data: DataRecord[]; total: number }>;
	getOne: <TRecord extends DataRecord = DataRecord, TMeta = unknown>(
		resource: string,
		params: { id: Identifier },
		meta?: TMeta,
	) => Promise<{ data: TRecord }>;
	getMany: (resource: string, params: any) => Promise<{ data: DataRecord[] }>;
	getManyReference: (resource: string, params: any) => Promise<{ data: DataRecord[]; total: number }>;
	update: <
		TRecord extends DataRecord = DataRecord,
		TData extends Record<string, unknown> = DataRecord,
		TMeta = unknown,
	>(
		resource: string,
		params: { id: Identifier; data: TData },
		meta?: TMeta,
	) => Promise<{ data: TRecord }>;
	updateMany: (resource: string, params: any) => Promise<any>;
	delete: <TRecord extends DataRecord = DataRecord, TMeta = unknown>(
		resource: string,
		params: { id: Identifier },
		meta?: TMeta,
	) => Promise<{ data?: TRecord }>;
	deleteMany: (resource: string, params: any) => Promise<any>;
	create: <
		TRecord extends DataRecord = DataRecord,
		TData extends Record<string, unknown> = Record<string, unknown>,
		TMeta = unknown,
	>(
		resource: string,
		params: { data: TData },
		meta?: TMeta,
	) => Promise<{ data: TRecord }>;
};

export const DataProviderContext = createContext<DataProvider>();

export const DataProviderProvider = (props: any) => {
	const dataProvider = () => props.dataProvider;
	return <DataProviderContext.Provider value={dataProvider()}>{props.children}</DataProviderContext.Provider>;
};

export function useDataProvider() {
	const context = useContext(DataProviderContext);
	const checkAuth = useCheckError();

	if (context === undefined) {
		throw new Error('useDataProvider must be used within a DataProviderProvider');
	}

	const proxy = new Proxy(context, {
		get: (target, name) => {
			if (typeof name === 'symbol' || name === 'then') {
				return;
			}
			return (...args: any) => {
				const type = name.toString();

				// @ts-ignore
				if (typeof target[type] !== 'function') {
					throw new Error(`Unknown dataProvider function: ${type}`);
				}

				// @ts-ignore
				return target[type](...args).catch(error => {
					checkAuth(error);
				});
			};
		},	
	});

	return proxy;
}
