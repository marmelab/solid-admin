import { As, DropdownMenu } from '@kobalte/core';
import { useLogout, useIdentity, useTranslate } from '@solid-admin/core';
import { Show } from 'solid-js';
import { Icon } from 'solid-heroicons';
import { chevronDown } from 'solid-heroicons/solid';

export const UserMenu = () => {
	const identity = useIdentity();
	const translate = useTranslate();
	const logoutMutation = useLogout();

	const handleLogout = () => {
		logoutMutation.mutate();
	};

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger class="btn">
				<Show when={identity?.data?.avatar}>
					<div class="w-24 rounded-full">
						<img src={identity?.data?.avatar} />
					</div>
				</Show>
				{identity?.data?.fullName || translate('ra.auth.user_menu', { _: 'Profile' })}
				<DropdownMenu.Icon class="dropdown-menu__trigger-icon">
					<Icon class="h-4 w-4 inline-block ml-2" path={chevronDown} />
				</DropdownMenu.Icon>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content asChild>
					<As component="ul" class="menu p-2 shadow bg-base-100 w-56">
						<DropdownMenu.Item asChild onSelect={handleLogout}>
							<As component="li">
								<span>{translate('ra.action.logout', { _: 'Logout' })}</span>
							</As>
						</DropdownMenu.Item>
					</As>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};
