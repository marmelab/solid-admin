import { Route, Router, Routes } from '@solidjs/router';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { Dashboard } from './dashboard';
import { DataProviderProvider } from './data-provider';
import { I18nContextProvider } from './i18n';
import { ResourcesProvider } from './resource';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

export const CoreAdmin = (props: any) => {
	const dataProvider = () => props.dataProvider;
	return (
		<QueryClientProvider client={queryClient}>
			<DataProviderProvider dataProvider={dataProvider()}>
				<I18nContextProvider i18nProvider={props.i18nProvider}>
					<ResourcesProvider>
						<Router>
							<Routes>
								<Route path="/" component={props.layout}>
									{/* TODO: pass dashboard component or element if provided through Admin props */}
									<Dashboard />
									{props.children}
								</Route>
							</Routes>
						</Router>
					</ResourcesProvider>
				</I18nContextProvider>
			</DataProviderProvider>
		</QueryClientProvider>
	);
};
