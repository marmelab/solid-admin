import { Field, FieldProps, FieldValues } from '@modular-forms/solid';
import { Show, mergeProps } from 'solid-js';
import { useList, useForm, Translate } from '@solid-admin/core';
import { As, Select } from '@kobalte/core';
import get from 'lodash/get';
import { check, chevronDown } from 'solid-heroicons/solid';
import { Icon } from 'solid-heroicons';

export const SelectInput = (
	props: {
		label?: string;
		source: string;
		choices?: any[];
		optionText?: string;
		optionValue?: string;
	} & Partial<FieldProps<FieldValues, string>>,
) => {
	const list = useList();
	const form = useForm();
	const mergedProps = mergeProps(
		{
			optionValue: 'id',
			optionText: 'name',
		},
		props,
	);

	return (
		<Field of={form} name={props.source} {...props}>
			{(field) => (
				<div class="form-control w-full max-w-xs">
					<Select.Root
						name={field.name}
						// FIXME: value and defaultValue only accept a string. However this prevent the Select component
						// to correctly detect the selected value
						// @ts-ignore
						defaultValue={field.value ? field.value : ''}
						options={props.choices ?? list?.data}
						optionValue={mergedProps.optionValue}
						optionTextValue={mergedProps.optionText}
						valueComponent={(valueProps) => {
							return (
								<span class="inline-block truncate overflow-hidden max-w-xs pr-12 mt-2">
									{valueProps.item ? get(valueProps.item.rawValue, mergedProps.optionText).toString() : ''}
								</span>
							);
						}}
						itemComponent={(itemProps) => (
							<Select.Item item={itemProps.item}>
								<Select.ItemIndicator asChild>
									<As component={Icon} class="h-4 w-4 inline-block ml-2" path={check} />
								</Select.ItemIndicator>
								<Select.ItemLabel>{get(itemProps.item.rawValue, mergedProps.optionText).toString()}</Select.ItemLabel>
							</Select.Item>
						)}
					>
						<Select.Label class="label">
							<span class="label-text">{props.label ?? props.source}</span>
						</Select.Label>
						<Select.HiddenSelect onChange={field.props.onChange} onInput={field.props.onInput} />
						<Select.Trigger class="input input-bordered w-full max-w-xs relative">
							<Select.Value />
							<Select.Icon asChild>
								<As
									component={Icon}
									class="absolute h-4 w-4 inline-block ml-2 right-4 top-1/2 -translate-y-1/2"
									path={chevronDown}
								/>
							</Select.Icon>
						</Select.Trigger>
						<Show when={!!field.error}>
							<Select.ErrorMessage class="label">
								<span class="label-text text-error">
									<Translate message={field.error} />
								</span>
							</Select.ErrorMessage>
						</Show>
						<Select.Portal>
							<Select.Content>
								<Select.Listbox class="menu bg-base-100" />
							</Select.Content>
						</Select.Portal>
					</Select.Root>
				</div>
			)}
		</Field>
	);
};
