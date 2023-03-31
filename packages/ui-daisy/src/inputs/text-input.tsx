import { Field } from '@modular-forms/solid';
import { TextField } from '@kobalte/core';
import { useForm } from '@solid-admin/core';
import { Show } from 'solid-js';

export const TextInput = (props: {
	label?: string;
	source: string;
	multiline?: boolean;
	inputProps?: TextField.TextFieldInputProps;
	textareaProps?: TextField.TextFieldTextAreaOptions;
}) => {
	const form = useForm();
	return (
		<Field of={form} name={props.source}>
			{(field) => (
				<TextField.Root id={props.source} class="form-control w-full max-w-xs">
					<TextField.Label class="label">
						<span class="label-text">{props.label ?? props.source}</span>
					</TextField.Label>
					<Show
						when={props.multiline}
						fallback={
							<TextField.Input
								{...field.props}
								type="text"
								placeholder="Type here"
								class="input input-bordered w-full max-w-xs"
								value={field.value?.toString() || ''}
								{...props.inputProps}
							/>
						}
					>
						<TextField.TextArea
							{...field.props}
							placeholder="Type here"
							class="input input-bordered w-full max-w-xs"
							value={field.value?.toString() || ''}
							{...props.textareaProps}
						/>
					</Show>
				</TextField.Root>
			)}
		</Field>
	);
};
