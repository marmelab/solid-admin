import { Link } from '@solidjs/router';
import { humanize, pluralize } from 'inflection';
import { For } from 'solid-js';
import { useTranslate } from '../../core';
import { useAppTitle } from '../../core/app-title';
import { ResourceDefinition, useResources } from '../../core/resource';

export const AppBar = () => {
	const resources = useResources();
	const title = useAppTitle();

	return (
		<header class="bg-neutral text-neutral-content">
			<nav class="navbar">
				<div class="flex-1">
					<Link href="/" class="btn btn-ghost normal-case text-xl">
						Solid Admin
					</Link>
					<span class="font-semibold no-underline text-xl">{title}</span>
				</div>
				<div class="flex-none">
					<ul class="menu menu-horizontal px-1">
						<For each={resources}>
							{(resource) => (
								<AppBarResourceItem resource={resource} />
							)}
						</For>
					</ul>
				</div>
			</nav>
		</header>
	);
};

const AppBarResourceItem = (props: { resource: ResourceDefinition }) => {
	const translate = useTranslate();
	const title = () =>
		translate(`resources.${props.resource.name}.name`, {
			_: humanize(pluralize(props.resource.name)),
			smart_count: 2,
		});
	return (
		<li>
			<Link href={`/${props.resource.name}`}>{title}</Link>
		</li>
	);
}