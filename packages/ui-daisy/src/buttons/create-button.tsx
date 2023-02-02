import { splitProps } from 'solid-js';
import { Link, AnchorProps } from '@solidjs/router';
import { useResource, useTranslate } from '@solid-admin/core';
import clsx from 'clsx';

export const CreateButton = (props: { label?: string; resource?: string } & Omit<AnchorProps, 'href'>) => {
	const resource = useResource(props);
	const translate = useTranslate();
	const [local, rest] = splitProps(props, ['label', 'resource', 'class']);
	const label = () => translate(local.label ?? 'ra.action.create', { _: 'Create' });

	return (
		<Link class={clsx('btn btn-sm', local.class)} href={`/${resource}/create`} {...rest}>
			{label()}
		</Link>
	);
};
