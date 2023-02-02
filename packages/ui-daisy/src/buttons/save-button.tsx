import { JSX, splitProps } from 'solid-js';
import { useTranslate } from '@solid-admin/core';
import clsx from 'clsx';

export const SaveButton = (props: { label?: string } & JSX.HTMLAttributes<HTMLButtonElement>) => {
	const translate = useTranslate();
	const [local, rest] = splitProps(props, ['label', 'class']);
	const label = () => translate(local.label ?? 'ra.action.save', { _: 'Save' });

	return (
		<button class={clsx("btn btn-sm", local.class)} type="submit" {...rest}>
			{label()}
		</button>
	);
};
