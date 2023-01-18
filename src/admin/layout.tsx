import { Outlet } from '@solidjs/router';
import { createSignal } from 'solid-js';
import { AppBar } from './app-bar';
import { AppTitle, AppTitleContext } from './app-title';
import { Notifications, NotificationsProvider } from './notifications';

export const Layout = (props: any) => {
	const appTitleContext = createSignal<AppTitle>();
	return (
		<AppTitleContext.Provider value={appTitleContext}>
			<NotificationsProvider>
				{props.appBar ?? <AppBar />}
				<Outlet />
				<Notifications />
			</NotificationsProvider>
		</AppTitleContext.Provider>
	);
};
