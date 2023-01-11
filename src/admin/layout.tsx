import { Outlet } from '@solidjs/router';
import { createSignal } from 'solid-js';
import { AppBar } from './app-bar';
import { AppTitle, AppTitleContext } from './app-title';

export const Layout = (props: any) => {
	const appTitleContext = createSignal<AppTitle>();
	return (
		<AppTitleContext.Provider value={appTitleContext}>
			{props.appBar ?? <AppBar />}
			<Outlet />
		</AppTitleContext.Provider>
	);
};
