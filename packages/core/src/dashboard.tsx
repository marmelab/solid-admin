import { Navigate, Route, RouteProps } from '@solidjs/router';
import { JSX, Match, mergeProps, Switch } from 'solid-js';
import { useResources } from './resource';

export const Dashboard = (props: Omit<RouteProps<'/'>, 'path'> & { empty?: JSX.Element }) => {
	const resources = useResources();
	const firstResource = () => (resources.length > 0 ? resources[0].name : undefined);
	const mergedProps = mergeProps({ empty: <div>TODO: solid-admin setup instructions</div> }, props);

	return (
		// Ignored as this is only because you can't have both the component and the element prop
		// However, accepting RouteProps will enforce this for users so we're fine
		// @ts-ignore
		<Route
			path="/"
			element={
				<Switch fallback={mergedProps.empty}>
					<Match when={mergedProps.element == null && firstResource() != null}>
						<Navigate href={firstResource() as string} />
					</Match>
					<Match when={mergedProps.element != null}>{mergedProps.element}</Match>
				</Switch>
			}
		/>
	);
};
