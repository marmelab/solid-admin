import { JSX } from 'solid-js';
import { Field } from '@modular-forms/solid';
import { useForm } from '@solid-admin/core';

export const ToggleInput = (props: {
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
						type="checkbox"
						class="toggle"
						checked={!!field.value || false}
						{...props.inputProps}
					/>
				</div>
			)}
		</Field>
	);
};
