import { createForm, FieldValues, Form as SolidForm, FormProps as SolidFormProps, reset } from '@modular-forms/solid';
import { createComputed, createContext, createEffect, useContext } from 'solid-js';
import { DataRecord, useRecord } from '../record';
import { useSaveContext } from './save-context';

export const Form = (props: FormProps) => {
	const record = useRecord(props);
	const saveContext = useSaveContext();

	const form = createForm({
		// @ts-ignore
		initialValues: props.initialValues ? props.initialValues() : record(),
	});

	createComputed(() => {
		const initialValues = props.initialValues != null ? props.initialValues() : record();
		if (initialValues != null) {
			// @ts-ignore
			reset(form, { initialValues });
		}
	});

	createEffect(() => {
		if (!props.onSubmit && !saveContext?.save) {
			throw new Error('Form must have an onSubmit prop or be used inside a SaveContext');
		}
	});

	return (
		<FormContext.Provider value={form}>
			{/* @ts-ignore  Safe ignore as we throw above */}
			<SolidForm id={props.id} of={form} onSubmit={props.onSubmit ?? saveContext?.save} class={props.class}>
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

export type FormProps = SolidFormProps<FieldValues> &
	Parameters<typeof createForm<FieldValues>> & {
		initialValues?: () => FieldValues;
		record?: DataRecord;
	};
