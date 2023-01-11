import { Link } from '@solidjs/router';
import { mergeProps } from 'solid-js';
import { DataRecord, useRecord } from '../record';
import { useResource } from '../resource';

export const EditButton = (props: {
	label?: string;
	record?: DataRecord;
	resource?: string;
	size?: 'xs' | 'sm' | 'md' | 'lg';
}) => {
	const resource = useResource(props);
	const record = useRecord(props);
	const merged = mergeProps({ label: 'Edit', size: 'sm' }, props);

	return (
		<Link class="btn btn-sm" href={`/${resource}/${record()?.id}`}>
			{merged.label}
		</Link>
	);
};
