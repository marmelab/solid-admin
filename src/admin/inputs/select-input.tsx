import { For } from 'solid-js';
import get from 'lodash/get';
import { useForm } from '../form';
import { useList } from '../list-context';

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
		<div class="form-control w-full max-w-xs">
			<label class="label">
				<span class="label-text">{props.label ?? props.source}</span>
			</label>
			<select name={props.source} class="select select-bordered w-full max-w-xs">
				<option disabled selected>
					Pick one
				</option>
				<For each={props.choices ?? list?.data()}>
					{(choice) => (
						<option
							value={choice[props.optionValue ?? 'id']}
							selected={form.data(props.source) == choice[props.optionValue ?? 'id']}
						>
							{choice[props.optionText ?? 'name']}
						</option>
					)}
				</For>
			</select>
		</div>
	);
};
