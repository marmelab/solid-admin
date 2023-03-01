import { cleanup, render, screen, waitFor } from '@solidjs/testing-library';
import { ResourceProvider } from '../resource';
import { DataProviderProvider } from '../data-provider';
import { CreateCreateControllerOptions, createCreateController } from './create-create-controller';
import { NotificationsProvider } from '../notifications';
import { Router, useLocation } from '@solidjs/router';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';

describe('createCreateController', () => {
	const Component = (props: CreateCreateControllerOptions) => {
		const controller = createCreateController(props);

		return <button onClick={() => controller.mutation.mutate({ value: 1 })}>Mutate</button>;
	};

	const CurrentRoute = () => {
		const route = useLocation();
		return <div>{route.pathname}</div>;
	};

	afterEach(cleanup);

	test('should infer resource from context', async () => {
		const dataProvider = {
			create: vi.fn().mockResolvedValue({ data: { id: 1 } }),
		};
		render(() => (
			<QueryClientProvider client={new QueryClient()}>
				<Router>
					<NotificationsProvider>
						<DataProviderProvider dataProvider={dataProvider}>
							<ResourceProvider resource="posts">
								<Component />
							</ResourceProvider>
						</DataProviderProvider>
					</NotificationsProvider>
				</Router>
			</QueryClientProvider>
		));

		screen.getByText('Mutate').click();

		await waitFor(() => expect(dataProvider.create).toHaveBeenCalledWith('posts', { data: { value: 1 } }, undefined));
	});

	test('should allow to provide the resource', async () => {
		const dataProvider = {
			create: vi.fn().mockResolvedValue({ data: { id: 1 } }),
		};
		render(() => (
			<QueryClientProvider client={new QueryClient()}>
				<Router>
					<NotificationsProvider>
						<DataProviderProvider dataProvider={dataProvider}>
							<ResourceProvider resource="posts">
								<Component resource="comments" />
							</ResourceProvider>
						</DataProviderProvider>
					</NotificationsProvider>
				</Router>
			</QueryClientProvider>
		));

		screen.getByText('Mutate').click();

		await waitFor(() =>
			expect(dataProvider.create).toHaveBeenCalledWith('comments', { data: { value: 1 } }, undefined),
		);
	});

	test('should redirect to the list view by default', async () => {
		const dataProvider = {
			create: vi.fn().mockResolvedValue({ data: { id: 1 } }),
		};

		render(() => (
			<QueryClientProvider client={new QueryClient()}>
				<Router>
					<NotificationsProvider>
						<DataProviderProvider dataProvider={dataProvider}>
							<ResourceProvider resource="posts">
								<Component />
								<CurrentRoute />
							</ResourceProvider>
						</DataProviderProvider>
					</NotificationsProvider>
				</Router>
			</QueryClientProvider>
		));

		screen.getByText('Mutate').click();

		await screen.findByText('/posts');
	});

	test('should allow to override the default redirect', async () => {
		const dataProvider = {
			create: vi.fn().mockResolvedValue({ data: { id: 1 } }),
		};

		render(() => (
			<QueryClientProvider client={new QueryClient()}>
				<Router>
					<NotificationsProvider>
						<DataProviderProvider dataProvider={dataProvider}>
							<ResourceProvider resource="posts">
								<Component redirect="edit" />
								<CurrentRoute />
							</ResourceProvider>
						</DataProviderProvider>
					</NotificationsProvider>
				</Router>
			</QueryClientProvider>
		));

		screen.getByText('Mutate').click();

		await screen.findByText('/posts/1');
	});

	test('should allow to override the default onSuccess', async () => {
		const dataProvider = {
			create: vi.fn().mockResolvedValue({ data: { id: 1 } }),
		};
		const onSuccess = vi.fn();
		render(() => (
			<QueryClientProvider client={new QueryClient()}>
				<Router>
					<NotificationsProvider>
						<DataProviderProvider dataProvider={dataProvider}>
							<ResourceProvider resource="posts">
								<Component mutationOptions={{ onSuccess }} />
							</ResourceProvider>
						</DataProviderProvider>
					</NotificationsProvider>
				</Router>
			</QueryClientProvider>
		));

		screen.getByText('Mutate').click();
		await waitFor(() => expect(onSuccess).toHaveBeenCalledWith({ data: { id: 1 } }, { value: 1 }, undefined));
	});

	test('should allow to override the default onError', async () => {
		const dataProvider = {
			create: vi.fn().mockRejectedValue({ message: 'Error' }),
		};
		const onError = vi.fn();
		render(() => (
			<QueryClientProvider client={new QueryClient()}>
				<Router>
					<NotificationsProvider>
						<DataProviderProvider dataProvider={dataProvider}>
							<ResourceProvider resource="posts">
								<Component mutationOptions={{ onError }} />
							</ResourceProvider>
						</DataProviderProvider>
					</NotificationsProvider>
				</Router>
			</QueryClientProvider>
		));

		screen.getByText('Mutate').click();
		await waitFor(() =>
			expect(onError).toHaveBeenCalledWith(
				{ message: 'Error' },
				{ value: 1 },
				undefined,
			)
		);
	});
});
