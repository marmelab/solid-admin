import { Field } from '@modular-forms/solid';
import { useForm } from '../../core';

export const TextInput = (props: { label?: string; source: string }) => {
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
						type="text"
						placeholder="Type here"
						class="input input-bordered w-full max-w-xs"
						value={field.value || ''}
					/>
				</div>
			)}
		</Field>
	);
};
