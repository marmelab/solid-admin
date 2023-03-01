import { Accessor, createContext, createSignal, JSX, useContext } from 'solid-js';

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
