import { mergeProps } from 'solid-js';

export const SaveButton = (props: { label?: string; size?: 'xs' | 'sm' | 'md' | 'lg' }) => {
	const merged = mergeProps({ label: 'Save', size: 'sm' }, props);

	return (
		<button class="btn btn-sm" type="submit">
			{merged.label}
		</button>
	);
};
