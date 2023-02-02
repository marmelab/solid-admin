import { JSX, mergeProps } from 'solid-js';
import { CoreAdmin } from '@solid-admin/core';
import { Layout } from './layout';

export const Admin = (props: { children: JSX.Element; layout: any } & any) => {
	const merged = mergeProps({ layout: Layout }, props);
	return <CoreAdmin {...merged} />;
};
