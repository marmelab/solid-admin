import { Link } from '@solidjs/router';
import { mergeProps } from 'solid-js';
import { DataRecord, useRecord, useResource } from '@solid-admin/core';

export const ShowButton = (props: {
	label?: string;
	record?: DataRecord;
	resource?: string;
	size?: 'xs' | 'sm' | 'md' | 'lg';
}) => {
	const resource = useResource(props);
	const record = useRecord(props);
	const merged = mergeProps({ label: 'Show', size: 'sm' }, props);

	return (
		<Link class="btn btn-sm" href={`/${resource}/${record()?.id}/show`}>
			{merged.label}
		</Link>
	);
};
