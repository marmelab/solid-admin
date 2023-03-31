import { splitProps } from 'solid-js';
import { Link, AnchorProps } from '@solidjs/router';
import { DataRecord, useRecord, useResource, useTranslate } from '@solid-admin/core';
import { As, Button } from '@kobalte/core';
import clsx from 'clsx';

export const ShowButton = (
	props: {
		label?: string;
		record?: DataRecord;
		resource?: string;
	} & Button.ButtonRootProps &
		Omit<AnchorProps, 'href'>,
) => {
	const resource = useResource(props);
	const record = useRecord(props);
	const translate = useTranslate();
	const [local, rest] = splitProps(props, ['label', 'record', 'resource', 'class']);
	const label = () => translate(local.label ?? 'ra.action.show', { _: 'Show' });

	return (
		<Button.Root asChild>
			<As component={Link} class={clsx('btn btn-sm', local.class)} href={`/${resource}/${record?.id}/show`} {...rest}>
				{label()}
			</As>
		</Button.Root>
	);
};
