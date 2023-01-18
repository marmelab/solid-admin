import { Field } from '@modular-forms/solid';
import { For } from 'solid-js';
import { useList, useForm } from '../../core';

export const SelectInput = (props: {
	label?: string;
	source: string;
	choices?: any[];
	optionText?: string;
	optionValue?: string;
}) => {
	const list = useList();
	const form = useForm();

	return (
		<Field of={form} name={props.source}>
			{(field) => (
				<div class="form-control w-full max-w-xs">
					<label class="label">
						<span class="label-text">{props.label ?? props.source}</span>
					</label>
					{/* @ts-ignore */}
					<select {...field.props} value={field.value || ''} class="select select-bordered w-full max-w-xs">
						<option disabled selected>
							Pick one
						</option>
						<For each={props.choices ?? list?.data()}>
							{(choice) => (
								<option
									value={choice[props.optionValue ?? 'id']}
									selected={field.value == choice[props.optionValue ?? 'id']}
								>
									{choice[props.optionText ?? 'name']}
								</option>
							)}
						</For>
					</select>
				</div>
			)}
		</Field>
	);
};
