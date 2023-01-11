import { createForm } from '@felte/solid';
import { createComputed, createContext, useContext } from 'solid-js';
import { DataRecord, useRecord } from '../record';
import { useSaveContext } from './save-context';

export const Form = (props: {
	children: any;
	class?: string;
	initialValues?: any;
	record?: DataRecord;
	onSubmit?: (values: any) => void;
}) => {
	const record = useRecord(props);
	const saveContext = useSaveContext();

	const formContext = createForm({
		initialValues: props.initialValues ?? record,
		onSubmit: props.onSubmit ?? saveContext,
	});

	createComputed(() => {
		const initialValues = props.initialValues != null ? props.initialValues() : record();
		if (initialValues != null) {
			formContext.setInitialValues(initialValues);
			formContext.reset();
		}
	});

	const { form } = formContext;

	return (
		<FormContext.Provider value={formContext}>
			<form use:form class={props.class}>
				{props.children}
			</form>
		</FormContext.Provider>
	);
};

const FormContext = createContext<ReturnType<typeof createForm>>();

export const useForm = () => {
	const context = useContext(FormContext);

	if (!context) {
		throw new Error('useForm must be used within a Form');
	}

	return context;
};
