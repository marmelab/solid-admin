import { JSX } from 'solid-js';
import { Field } from '@modular-forms/solid';
import { useForm } from '@solid-admin/core';
import { TextField } from '@kobalte/core';

export const NumberInput = (props: {
	label?: string;
	source: string;
	inputProps?: JSX.InputHTMLAttributes<HTMLInputElement>;
}) => {
	const form = useForm();

	return (
		<Field of={form} name={props.source}>
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
				</TextField.Root>
			)}
		</Field>
	);
};
