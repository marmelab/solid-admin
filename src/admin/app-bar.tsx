import { Link } from '@solidjs/router';
import { For } from 'solid-js';
import { useAppTitle } from './app-title';
import { useResources } from './resource';

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
								<li>
									<Link href={`/${resource.name}`}>{resource.name}</Link>
								</li>
							)}
						</For>
					</ul>
				</div>
			</nav>
		</header>
	);
};
