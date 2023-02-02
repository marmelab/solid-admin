import { Link, AnchorProps } from '@solidjs/router';
import { splitProps } from 'solid-js';
import { DataRecord, useRecord, useResource, useTranslate } from '@solid-admin/core';
import clsx from 'clsx';

export const EditButton = (
	props: {
		label?: string;
		record?: DataRecord;
		resource?: string;
	} & Omit<AnchorProps, 'href'>,
) => {
	const resource = useResource(props);
	const record = useRecord(props);
	const translate = useTranslate();
	const [local, rest] = splitProps(props, ['label', 'record', 'resource', 'class']);
	const label = () => translate(local.label ?? 'ra.action.edit', { _: 'Edit' });

	return (
		<Link class={clsx('btn btn-sm', local.class)} href={`/${resource}/${record()?.id}`} {...rest}>
			{label()}
		</Link>
	);
};
