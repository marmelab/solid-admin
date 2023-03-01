import { For } from 'solid-js';
import { xCircle } from 'solid-heroicons/solid';
import { Icon } from 'solid-heroicons';
import clsx from 'clsx';
import { useNotifications, useTranslate } from '@solid-admin/core';

export const Notifications = () => {
	const { notifications, hideNotification } = useNotifications();
	const translate = useTranslate();

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
									<span>{translate(notification.message as string, notification.messageArgs)}</span>
								</div>
								<div class="flex-none">
									<button
										aria-label="Close"
										onClick={() => hideNotification(notification)}
										class="btn btn-sm btn-circle btn-ghost"
									>
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
