import { JSX, Show } from 'solid-js';
import { Field, FieldProps, FieldValues } from '@modular-forms/solid';
import { useForm, Translate } from '@solid-admin/core';
import { TextField } from '@kobalte/core';

export const DateInput = (
	props: {
		label?: string;
		source: string;
		inputProps?: JSX.InputHTMLAttributes<HTMLInputElement>;
	} & Partial<FieldProps<FieldValues, string>>,
) => {
	const form = useForm();

	return (
		<Field of={form} name={props.source} {...props}>
			{(field) => (
				<TextField.Root id={props.source} class="form-control w-full max-w-xs">
					<TextField.Label class="label">
						<span class="label-text">{props.label ?? props.source}</span>
					</TextField.Label>
					<TextField.Input
						{...field.props}
						type="date"
						placeholder="Type here"
						class="input input-bordered w-full max-w-xs"
						// @ts-ignore
						value={getStringFromDate(field.value) || ''}
						{...props.inputProps}
					/>
					<Show when={!!field.error}>
						<TextField.ErrorMessage class="label">
							<span class="label-text text-error">
								<Translate message={field.error} />
							</span>
						</TextField.ErrorMessage>
					</Show>
				</TextField.Root>
			)}
		</Field>
	);
};
/**
 * Convert Date object to String
 *
 * @param {Date} value value to convert
 * @returns {String} A standardized date (yyyy-MM-dd), to be passed to an <input type="date" />
 */
const convertDateToString = (value: Date) => {
	if (!(value instanceof Date) || isNaN(value.getDate())) return '';
	const pad = '00';
	const yyyy = value.getFullYear().toString();
	const MM = (value.getMonth() + 1).toString();
	const dd = value.getDate().toString();
	return `${yyyy}-${(pad + MM).slice(-2)}-${(pad + dd).slice(-2)}`;
};

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const getStringFromDate = (value: string | Date) => {
	// null, undefined and empty string values should not go through dateFormatter
	// otherwise, it returns undefined and will make the input an uncontrolled one.
	if (value == null || value === '') {
		return '';
	}

	if (value instanceof Date) {
		return convertDateToString(value);
	}

	// valid dates should not be converted
	if (dateRegex.test(value)) {
		return value;
	}

	return convertDateToString(new Date(value));
};
