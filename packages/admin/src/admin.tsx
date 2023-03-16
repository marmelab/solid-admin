import { mergeProps } from 'solid-js';
import { CoreAdmin, CoreAdminProps } from '@solid-admin/core';
import { Layout, Login } from '@solid-admin/ui-daisy';

export const Admin = (props: CoreAdminProps) => {
	const merged = mergeProps({ layout: Layout, login: Login }, props);
	return <CoreAdmin {...merged} />;
};
