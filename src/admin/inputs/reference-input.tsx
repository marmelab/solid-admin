import get from 'lodash/get';
import { createGetOneQuery } from '../crud-hooks';
import { createListController } from '../list';
import { ListContext } from '../list-context';
import { DataRecord, RecordProvider, useRecord } from '../record';

export const ReferenceInput = (props: {
	label?: string;
	source: string;
	record?: DataRecord;
	reference: string;
	children: any;
}) => {
	const record = useRecord(props);
	const value = () => {
		return get(record(), props.source);
	};

	const recordQuery = createGetOneQuery({
		resource: props.reference,
		params: () => ({ id: value() }),
		get enabled() {
			return !!value();
		},
	});

	const listQuery = createListController({
		resource: props.reference,
	});

	const referenceRecord = () => recordQuery.data?.data;

	return (
		<ListContext.Provider value={listQuery}>
			<RecordProvider record={referenceRecord}>{props.children}</RecordProvider>
		</ListContext.Provider>
	);
};
