import { splitProps } from 'solid-js';
import { useTranslate } from '@solid-admin/core';
import { Button } from '@kobalte/core';
import clsx from 'clsx';

export const SaveButton = (props: { label?: string } & Button.ButtonRootProps) => {
	const translate = useTranslate();
	const [local, rest] = splitProps(props, ['label', 'class']);
	const label = () => translate(local.label ?? 'ra.action.save', { _: 'Save' });

	return (
		<Button.Root class={clsx('btn btn-sm', local.class)} type="submit" {...rest}>
			{label()}
		</Button.Root>
	);
};
