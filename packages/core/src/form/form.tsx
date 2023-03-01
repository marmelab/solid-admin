import { createForm, Form as SolidForm, reset } from '@modular-forms/solid';
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

	const form = createForm({
		initialValues: props.initialValues ?? record(),
	});

	createComputed(() => {
		const initialValues = props.initialValues != null ? props.initialValues() : record();
		if (initialValues != null) {
			reset(form, { initialValues });
		}
	});

	return (
		<FormContext.Provider value={form}>
			<SolidForm of={form} onSubmit={props.onSubmit ?? saveContext.save} class={props.class}>
				{props.children}
			</SolidForm>
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
