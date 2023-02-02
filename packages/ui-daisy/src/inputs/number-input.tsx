import { JSX } from 'solid-js';
import { Field } from '@modular-forms/solid';
import { useForm } from '@solid-admin/core';

export const NumberInput = (props: {
	label?: string;
	source: string;
	inputProps: JSX.InputHTMLAttributes<HTMLInputElement>;
}) => {
	const form = useForm();

	return (
		<Field of={form} name={props.source}>
			{(field) => (
				<div class="form-control w-full max-w-xs">
					<label class="label">
						<span class="label-text">{props.label ?? props.source}</span>
					</label>
					<input
						{...field.props}
						type="number"
						placeholder="Type here"
						class="input input-bordered w-full max-w-xs"
						value={field.value?.toString() || ''}
						{...props.inputProps}
					/>
				</div>
			)}
		</Field>
	);
};
