import { createContext, JSX, useContext } from 'solid-js';

export type DataRecord = { id: string | number };

export const RecordContext = createContext<DataRecord | (() => DataRecord) | null | undefined>();

export const RecordProvider = (props: {
	children: JSX.Element;
	record: DataRecord | (() => DataRecord) | null | undefined;
}) => {
	return <RecordContext.Provider value={props.record}>{props.children}</RecordContext.Provider>;
};

export const useRecord = (options: {
	record?: DataRecord | (() => DataRecord);
}): (() => DataRecord | undefined | null) => {
	if (options.record != null) {
		if (typeof options.record === 'function') {
			return options.record;
		}
		return () => options.record as DataRecord;
	}

	const record = useContext(RecordContext);
	return typeof record === 'function' ? record : () => record;
};
