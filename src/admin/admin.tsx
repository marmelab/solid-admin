import { Route, Router, Routes } from '@solidjs/router';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { Dashboard } from './dashboard';
import { DataProvider } from './data-provider';
import { I18nContextProvider } from './i18n';
import { Layout } from './layout';
import { ResourcesProvider } from './resource';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

export const Admin = (props: any) => {
	return (
		<QueryClientProvider client={queryClient}>
			<DataProvider dataProvider={props.dataProvider}>
				<I18nContextProvider i18nProvider={props.i18nProvider}>
					<ResourcesProvider>
						<Router>
							<Routes>
								<Route path="/" component={props.layout ?? Layout}>
									{/* TODO: pass dashboard component or element if provided through Admin props */}
									<Dashboard />
									{props.children}
								</Route>
							</Routes>
						</Router>
					</ResourcesProvider>
				</I18nContextProvider>
			</DataProvider>
		</QueryClientProvider>
	);
};
