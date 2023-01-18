import { Outlet } from '@solidjs/router';
import { AppBar } from './app-bar';
import { AppTitleProvider, NotificationsProvider } from '../../core';
import { Notifications } from './notifications';

export const Layout = (props: any) => {
	return (
		<AppTitleProvider>
			<NotificationsProvider>
				{props.appBar ?? <AppBar />}
				<div class="flex flex-col p-4 gap-4">
					<Outlet />
				</div>
				<Notifications />
			</NotificationsProvider>
		</AppTitleProvider>
	);
};
