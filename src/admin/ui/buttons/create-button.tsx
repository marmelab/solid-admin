import { Link } from '@solidjs/router';
import { mergeProps } from 'solid-js';
import { useResource } from '../../core';

export const CreateButton = (props: { label?: string; resource?: string; size?: 'xs' | 'sm' | 'md' | 'lg' }) => {
	const resource = useResource(props);
	const merged = mergeProps({ label: 'Create', size: 'sm' }, props);

	return (
		<Link class="btn btn-sm" href={`/${resource}/create`}>
			{merged.label}
		</Link>
	);
};
