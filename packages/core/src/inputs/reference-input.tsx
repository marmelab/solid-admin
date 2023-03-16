import { getValue } from '@modular-forms/solid';
import { createGetOneQuery } from '../crud-hooks';
import { useForm } from '../form';
import { createListController } from '../list';
import { ListContext } from '../list-context';
import { DataRecord, Identifier, RecordProvider } from '../record';

export const ReferenceInput = (props: {
	label?: string;
	source: string;
	record?: DataRecord;
	reference: string;
	children: any;
}) => {
	const form = useForm();
	const referenceId = () => {
		return getValue(form, props.source) as Identifier;
	};

	const recordQuery = createGetOneQuery(
		() => ({
			resource: props.reference,
			params: { id: referenceId() },
		}),
		{
			get enabled() {
				return !!referenceId();
			},
		},
	);

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
