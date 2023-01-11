import { Select } from '@thisbeyond/solid-select';
import get from 'lodash/get';
import { createComputed, createSignal } from 'solid-js';
import { useForm } from '../form';
import { useList } from '../list-context';

export const AutoCompleteInput = (props: {
	label?: string;
	source: string;
	choices?: any[];
	optionText?: string;
	optionValue?: string;
}) => {
	const list = useList();
	const form = useForm();
	const [inputValue, setInputValue] = createSignal('');

	const choices = () => {
		return props.choices ?? list?.data() ?? [];
	};

	createComputed(() => {
		if (list != null) {
			list.setFilter({ q: inputValue() });
		}
	});

	const selectProps = {
		get options() {
			const options = choices().map((choice) => ({
				value: get(choice, props.optionValue ?? 'id'),
				label: get(choice, props.optionText ?? 'name'),
			}));
			return options;
		},
		get loading() {
			return list?.isLoading() ?? false;
		},
		get initialValue() {
			const value = form.data(props.source);
			return value;
		},
		optionToValue: (option: any) => {
			const value = option.value;
			return value;
		},
		format: (item: any, type: 'option' | 'value') => {
			if (type === 'option') {
				return item.label;
			}

			const selectedItem = choices().find((choice) => get(choice, props.optionValue ?? 'id') == item);

			return get(selectedItem, props.optionText ?? 'name');
		},
		onInput: throttle(setInputValue, 250),
		readonly: false,
		name: props.source,
		onChange: (value: any) => {
			form.setData(props.source, value);
		},
	};

	return (
		<div class="form-control w-full max-w-xs">
			<label class="label">
				<span class="label-text">{props.label ?? props.source}</span>
			</label>
			<Select {...selectProps} />
		</div>
	);
};

/**
 * applies only the last call to lambda that occured within a interval of time [threshhold] in ms, or the first one if no one occured before, default threshold is 250ms, yields a function.
 */
function throttle(fn: variableArgumentLambda, threshhold: number = 250): variableArgumentLambda {
	let last: any, deferTimer: any;
	return function (this: any) {
		const now = +new Date(),
			args = arguments as unknown as any[],
			ctx = this;
		if (last && now < last + threshhold) {
			// hold on to it
			clearTimeout(deferTimer);
			deferTimer = setTimeout(() => {
				last = now;
				fn.apply(ctx, args);
			}, threshhold);
		} else {
			last = now;
			fn.apply(ctx, args);
		}
	};
}

type variableArgumentLambda = (...args: any[]) => any;
