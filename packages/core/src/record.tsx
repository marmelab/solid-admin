import { createContext, JSX, useContext } from 'solid-js';

export type Identifier = string | number;
export type DataRecord = { id: Identifier } & Record<string, unknown>;

export const RecordContext = createContext<DataRecord | (() => DataRecord | undefined) | undefined>();

export const RecordProvider = (props: {
	children: JSX.Element;
	record: DataRecord | undefined;
}) => {
	return <RecordContext.Provider value={props.record}>{props.children}</RecordContext.Provider>;
};

export const useRecord = <TRecord extends DataRecord = DataRecord>(options?: {
	record?: TRecord | undefined;
}): TRecord | undefined => {
	if (options?.record != null) {
		return options.record as TRecord;
	}

	const record = useContext(RecordContext);
	return record as TRecord;
};
