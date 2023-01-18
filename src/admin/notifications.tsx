import clsx from 'clsx';
import { Accessor, createContext, createSignal, For, JSX, useContext } from 'solid-js';
import { xCircle } from 'solid-heroicons/solid';
import { Icon } from 'solid-heroicons';

type Notification = {
	type: string;
	message: string | JSX.Element;
	isCancellable?: boolean;
	autoHideTimeout?: number;
};

type NotificationsContextValue = {
	addNotification: (notification: Notification) => void;
	hideNotification: (notification: Notification) => void;
	notifications: Accessor<Notification[]>;
};

export const NotificationsContext = createContext<NotificationsContextValue>();

export const NotificationsProvider = (props: { children: JSX.Element }) => {
	const [notifications, setNotifications] = createSignal<Notification[]>([]);

	const addNotification = (notification: Notification) => {
		setNotifications((notifications) => [...notifications, notification]);

		if (notification.autoHideTimeout) {
			setTimeout(() => {
				setNotifications((notifications) => {
					const index = notifications.indexOf(notification);
					const newNotifications = notifications.slice(0, index).concat(notifications.slice(index + 1));

					return newNotifications;
				});
			}, notification.autoHideTimeout);
		}
	};

	const hideNotification = (notification: Notification) => {
		setNotifications((notifications) => {
			const index = notifications.indexOf(notification);
			const newNotifications = notifications.slice(0, index).concat(notifications.slice(index + 1));

			return newNotifications;
		});
	};

	return (
		<NotificationsContext.Provider value={{ addNotification, hideNotification, notifications }}>
			{props.children}
		</NotificationsContext.Provider>
	);
};

export const useNotifications = () => {
	const context = useContext(NotificationsContext);

	if (!context) {
		throw new Error('useNotifications must be used within a NotificationsProvider');
	}

	return context;
};

export const useNotify = () => {
	const context = useContext(NotificationsContext);

	if (!context) {
		throw new Error('useNotify must be used within a NotificationsProvider');
	}

	return context.addNotification;
};

export const Notifications = () => {
	const { notifications, hideNotification } = useNotifications();

	return (
		<div class="toast w-full max-w-xs">
			<For each={notifications()}>
				{(notification) => (
					<div
						class={clsx('alert shadow-lg w-full', {
							'alert-success': notification.type === 'success',
							'alert-error': notification.type === 'error',
							'alert-warning': notification.type === 'warning',
							'alert-info': notification.type === 'info',
						})}
					>
						{(notification.message as HTMLElement).tagName != null ? (
							notification.message
						) : (
							<>
								<div>
									<span>{notification.message}</span>
								</div>
								<div class="flex-none">
									<button aria-label="Close" onClick={() => hideNotification(notification)} class="btn btn-sm btn-circle btn-ghost">
										<Icon role="presentation" path={xCircle} class="w-6 h-6" />
									</button>
								</div>
							</>
						)}
					</div>
				)}
			</For>
		</div>
	);
};
