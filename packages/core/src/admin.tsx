import { Route, RouteDataFunc, Router, Routes } from '@solidjs/router';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { Component, JSX, mergeProps, Show } from 'solid-js';
import { AuthContextProvider, AuthProvider } from './auth';
import { Dashboard } from './dashboard';
import { DataProvider, DataProviderProvider } from './data-provider';
import { DefaultI18nProvider, I18nContextProvider, I18nProvider } from './i18n';
import { ResourcesProvider } from './resource';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

export const CoreAdmin = (props: CoreAdminProps) => {
	const dataProvider = () => props.dataProvider;
	const mergedProps = mergeProps({ i18nProvider: DefaultI18nProvider }, props);

	const checkAuth: RouteDataFunc<unknown, unknown> = ({ params, location, navigate, data }) => {
		if (props.authProvider == null) {
			return;
		}

		return props.authProvider.checkAuth({}).catch((error) => {
			navigate('/login', { replace: true });
		});
	};
	
	return (
		<QueryClientProvider client={queryClient}>
			<AuthContextProvider authProvider={props.authProvider}>
				<DataProviderProvider dataProvider={dataProvider()}>
					<I18nContextProvider i18nProvider={mergedProps.i18nProvider}>
						<ResourcesProvider>
							<Router>
								<Routes>
									<Route path="/" component={props.layout} data={checkAuth}>
										<Dashboard component={props.dashboard} />
										{props.children}
									</Route>
									<Show when={props.authProvider != null}>
										<Route path="/login" component={props.login} />
									</Show>
								</Routes>
							</Router>
						</ResourcesProvider>
					</I18nContextProvider>
				</DataProviderProvider>
			</AuthContextProvider>
		</QueryClientProvider>
	);
};

export interface CoreAdminProps {
	authProvider?: AuthProvider;
	children: JSX.Element;
	dashboard?: Component;
	dataProvider: DataProvider;
	i18nProvider?: I18nProvider;
	layout?: Component;
	login?: Component;
}