import { splitProps } from 'solid-js';
import { Link, AnchorProps } from '@solidjs/router';
import { useResource, useTranslate } from '@solid-admin/core';
import { As, Button } from '@kobalte/core';
import clsx from 'clsx';

export const CreateButton = (
	props: { label?: string; resource?: string } & Button.ButtonRootProps & Omit<AnchorProps, 'href'>,
) => {
	const resource = useResource(props);
	const translate = useTranslate();
	const [local, rest] = splitProps(props, ['label', 'resource', 'class']);
	const label = () => translate(local.label ?? 'ra.action.create', { _: 'Create' });

	return (
		<Button.Root asChild>
			<As component={Link} href={`/${resource}/create`} class={clsx('btn btn-sm', local.class)} {...rest}>
				{label()}
			</As>
		</Button.Root>
	);
};
