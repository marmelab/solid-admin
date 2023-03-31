import { JSX, Show } from 'solid-js';
import { Field, FieldProps, FieldValues } from '@modular-forms/solid';
import { useForm, Translate } from '@solid-admin/core';
import { TextField } from '@kobalte/core';

export const NumberInput = (
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
						type="text"
						placeholder="Type here"
						class="input input-bordered w-full max-w-xs"
						value={field.value?.toString() || ''}
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
