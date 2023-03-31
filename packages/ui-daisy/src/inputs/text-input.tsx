import { Field, FieldProps, FieldValues } from '@modular-forms/solid';
import { TextField } from '@kobalte/core';
import { useForm, Translate } from '@solid-admin/core';
import { Show } from 'solid-js';
import clsx from 'clsx';

export const TextInput = (
	props: {
		label?: string;
		source: string;
		multiline?: boolean;
		inputProps?: TextField.TextFieldInputProps;
		textareaProps?: TextField.TextFieldTextAreaOptions;
	} & Partial<FieldProps<FieldValues, string>>,
) => {
	const form = useForm();
	return (
		<Field of={form} name={props.source} {...props}>
			{(field) => (
				<TextField.Root
					id={props.source}
					class="form-control w-full max-w-xs"
					validationState={field.error ? 'invalid' : 'valid'}
				>
					<TextField.Label class="label">
						<span
							class={clsx('label-text', {
								'text-error': !!field.error,
							})}
						>
							{props.label ?? props.source}
						</span>
					</TextField.Label>
					<Show
						when={props.multiline}
						fallback={
							<TextField.Input
								{...field.props}
								type="text"
								placeholder="Type here"
								class={clsx('input input-bordered w-full max-w-xs', {
									'input-error': !!field.error,
								})}
								value={field.value?.toString() || ''}
								{...props.inputProps}
							/>
						}
					>
						<TextField.TextArea
							{...field.props}
							placeholder="Type here"
							class={clsx('input input-bordered w-full max-w-xs', {
								'input-error': !!field.error,
							})}
							value={field.value?.toString() || ''}
							{...props.textareaProps}
						/>
					</Show>
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
