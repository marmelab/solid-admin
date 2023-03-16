import { cleanup, render, screen, waitFor } from '@solidjs/testing-library';
import { Router, useLocation } from '@solidjs/router';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';

import { ResourceProvider } from '../resource';
import { DataProviderProvider } from '../data-provider';
import { CreateDeleteControllerOptions, createDeleteController } from './create-delete-controller';
import { NotificationsProvider } from '../notifications';
import { RecordProvider } from '../record';

describe('createDeleteController', () => {
	const Component = (props: CreateDeleteControllerOptions) => {
		const controller = createDeleteController(props);

		return <button onClick={() => controller.mutation.mutate()}>Mutate</button>;
	};

	const CurrentRoute = () => {
		const route = useLocation();
		return <div>{route.pathname}</div>;
	};

	afterEach(cleanup);

	test('should infer resource from context', async () => {
		const dataProvider = {
			delete: vi.fn().mockResolvedValue({ data: { id: 1 } }),
		};
		render(() => (
			<QueryClientProvider client={new QueryClient()}>
				<Router>
					<NotificationsProvider>
						<DataProviderProvider dataProvider={dataProvider}>
							<ResourceProvider resource="posts">
								<RecordProvider record={{ id: 1 }}>
									<Component />
								</RecordProvider>
							</ResourceProvider>
						</DataProviderProvider>
					</NotificationsProvider>
				</Router>
			</QueryClientProvider>
		));

		screen.getByText('Mutate').click();

		await waitFor(() => expect(dataProvider.delete).toHaveBeenCalledWith('posts', { id: 1 }, undefined));
	});

	test('should allow to provide the resource', async () => {
		const dataProvider = {
			delete: vi.fn().mockResolvedValue({ data: { id: 1 } }),
		};
		render(() => (
			<QueryClientProvider client={new QueryClient()}>
				<Router>
					<NotificationsProvider>
						<DataProviderProvider dataProvider={dataProvider}>
							<ResourceProvider resource="posts">
								<RecordProvider record={{ id: 1 }}>
									<Component resource="comments" />
								</RecordProvider>
							</ResourceProvider>
						</DataProviderProvider>
					</NotificationsProvider>
				</Router>
			</QueryClientProvider>
		));

		screen.getByText('Mutate').click();

		await waitFor(() => expect(dataProvider.delete).toHaveBeenCalledWith('comments', { id: 1 }, undefined));
	});

	test('should pass meta all the way down to the dataProvider', async () => {
		const dataProvider = {
			delete: vi.fn().mockResolvedValue({ data: { id: 1 } }),
		};
		render(() => (
			<QueryClientProvider client={new QueryClient()}>
				<Router>
					<NotificationsProvider>
						<DataProviderProvider dataProvider={dataProvider}>
							<ResourceProvider resource="posts">
								<RecordProvider record={{ id: 1 }}>
									<Component resource="comments" meta={{ custom: true }} />
								</RecordProvider>
							</ResourceProvider>
						</DataProviderProvider>
					</NotificationsProvider>
				</Router>
			</QueryClientProvider>
		));

		screen.getByText('Mutate').click();

		await waitFor(() => expect(dataProvider.delete).toHaveBeenCalledWith('comments', { id: 1 }, { custom: true }));
	});

	test('should not redirect by default', async () => {
		const dataProvider = {
			delete: vi.fn().mockResolvedValue({ data: { id: 1 } }),
		};

		render(() => (
			<QueryClientProvider client={new QueryClient()}>
				<Router>
					<NotificationsProvider>
						<DataProviderProvider dataProvider={dataProvider}>
							<ResourceProvider resource="posts">
								<RecordProvider record={{ id: 1 }}>
									<Component />
								</RecordProvider>
								<CurrentRoute />
							</ResourceProvider>
						</DataProviderProvider>
					</NotificationsProvider>
				</Router>
			</QueryClientProvider>
		));

		screen.getByText('Mutate').click();

		await waitFor(() => expect(screen.queryByText('/posts')).toBeNull());
	});

	test('should allow to override the default redirect', async () => {
		const dataProvider = {
			delete: vi.fn().mockResolvedValue({ data: { id: 1 } }),
		};

		render(() => (
			<QueryClientProvider client={new QueryClient()}>
				<Router>
					<NotificationsProvider>
						<DataProviderProvider dataProvider={dataProvider}>
							<ResourceProvider resource="posts">
								<RecordProvider record={{ id: 1 }}>
									<Component redirect="list" />
								</RecordProvider>
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

	test('should allow to override the default onSuccess', async () => {
		const dataProvider = {
			delete: vi.fn().mockResolvedValue({ data: { id: 1 } }),
		};
		const onSuccess = vi.fn();
		render(() => (
			<QueryClientProvider client={new QueryClient()}>
				<Router>
					<NotificationsProvider>
						<DataProviderProvider dataProvider={dataProvider}>
							<ResourceProvider resource="posts">
								<RecordProvider record={{ id: 1 }}>
									<Component mutationOptions={{ onSuccess }} />
								</RecordProvider>
							</ResourceProvider>
						</DataProviderProvider>
					</NotificationsProvider>
				</Router>
			</QueryClientProvider>
		));

		screen.getByText('Mutate').click();
		await waitFor(() => expect(onSuccess).toHaveBeenCalledWith({ data: { id: 1 } }, { id: 1 }, undefined));
	});

	test('should allow to override the default onError', async () => {
		const dataProvider = {
			delete: vi.fn().mockRejectedValue({ message: 'Error' }),
		};
		const onError = vi.fn();
		render(() => (
			<QueryClientProvider client={new QueryClient()}>
				<Router>
					<NotificationsProvider>
						<DataProviderProvider dataProvider={dataProvider}>
							<ResourceProvider resource="posts">
								<RecordProvider record={{ id: 1 }}>
									<Component mutationOptions={{ onError }} />
								</RecordProvider>
							</ResourceProvider>
						</DataProviderProvider>
					</NotificationsProvider>
				</Router>
			</QueryClientProvider>
		));

		screen.getByText('Mutate').click();
		await waitFor(() => expect(onError).toHaveBeenCalledWith({ message: 'Error' }, { id: 1 }, undefined));
	});
});
