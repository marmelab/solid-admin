import get from 'lodash/get';
import { JSX, splitProps } from 'solid-js';
import { DataRecord, useRecord } from '@solid-admin/core';

export const TextField = (props: { source: string; record?: DataRecord } & JSX.HTMLAttributes<HTMLSpanElement>) => {
	const [localProps, restProps] = splitProps(props, ['source', 'record']);
	const record = useRecord(localProps);
	return (
		<span class="neutral-content" {...restProps}>
			{(get(record(), localProps.source) as any)?.toString() ?? ''}
		</span>
	);
};
