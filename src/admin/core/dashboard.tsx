import { Navigate, Route, RouteProps } from '@solidjs/router';
import { JSX, splitProps } from 'solid-js';
import { useResources } from './resource';

export const Dashboard = (props: Omit<RouteProps, 'path'> & { empty?: JSX.Element }) => {
	const resources = useResources();
	const firstResource = () => (resources.length > 0 ? resources[0].name : undefined);
	const [localProps, routeProps] = splitProps(props, ['empty']);

	return (
		// Ignored as this is only because you can't have both the component and the element prop
		// However, accepting RouteProps will enforce this for users so we're fine
		// @ts-ignore
		<Route
			path="/"
			{...routeProps}
			element={
				routeProps.component == null && routeProps.element == null ? (
					firstResource() != null ? (
						// @ts-ignore
						<Navigate href={firstResource()} />
					) : (
						localProps.empty ?? <div>TODO: solid-admin setup instructions</div>
					)
				) : (
					routeProps.element
				)
			}
		/>
	);
};
