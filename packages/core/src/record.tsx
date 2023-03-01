import { createContext, JSX, useContext } from 'solid-js';

export type Identifier = string | number;
export type DataRecord = { id: Identifier } & Record<string, unknown>;

export const RecordContext = createContext<DataRecord | (() => DataRecord | undefined) | undefined>();

export const RecordProvider = (props: {
	children: JSX.Element;
	record: DataRecord | (() => DataRecord | undefined) | undefined;
}) => {
	return <RecordContext.Provider value={props.record}>{props.children}</RecordContext.Provider>;
};

export const useRecord = <TRecord extends DataRecord = DataRecord>(options?: {
	record?: TRecord | undefined | (() => TRecord | undefined);
}): (() => TRecord | undefined) => {
	if (options?.record != null) {
		if (typeof options.record === 'function') {
			return options.record;
		}
		return () => options.record as TRecord;
	}

	const record = useContext(RecordContext);
	return typeof record === 'function' ? (record as () => TRecord) : () => record as TRecord;
};
