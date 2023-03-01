import get from 'lodash/get';
import { JSX, Show, splitProps } from 'solid-js';
import { DataRecord, useRecord } from '@solid-admin/core';
import { Icon } from 'solid-heroicons';
import { check, xMark } from 'solid-heroicons/solid';

export const BooleanField = (props: { source: string; record?: DataRecord } & JSX.HTMLAttributes<HTMLSpanElement>) => {
	const [localProps, restProps] = splitProps(props, ['source', 'record']);
	const record = useRecord(localProps);
	const value = () => get(record(), localProps.source);
	return (
		<Show when={value() == true} fallback={<Icon class="h-4 w-4 inline-block ml-2" path={xMark} />} {...restProps}>
			<Icon class="h-4 w-4 inline-block ml-2" path={check} />
		</Show>
	);
};
