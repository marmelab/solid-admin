import { Field } from '@modular-forms/solid';
import { useForm } from '@solid-admin/core';

export const TextInput = (props: {
	label?: string;
	source: string;
	multiline?: boolean;
	inputProps?: any;
}) => {
	const form = useForm();
	return (
		<Field of={form} name={props.source}>
			{(field) => (
				<div class="form-control w-full max-w-xs">
					<label class="label">
						<span class="label-text">{props.label ?? props.source}</span>
					</label>
					{props.multiline ? (
						<textarea
							{...field.props}
							placeholder="Type here"
							class="input input-bordered w-full max-w-xs"
							value={field.value?.toString() || ''}
							{...props.inputProps}
						/>
					) : (
						<input
							{...field.props}
							type="text"
							placeholder="Type here"
							class="input input-bordered w-full max-w-xs"
							value={field.value?.toString() || ''}
							{...props.inputProps}
						/>
					)}
				</div>
			)}
		</Field>
	);
};
