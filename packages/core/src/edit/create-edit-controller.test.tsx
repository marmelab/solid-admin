import { cleanup, render, screen, waitFor } from '@solidjs/testing-library';
import { ResourceProvider } from '../resource';
import { DataProviderProvider } from '../data-provider';
import { CreateEditControllerOptions, createEditController } from './create-edit-controller';
import { NotificationsProvider } from '../notifications';
import { Router, useLocation } from '@solidjs/router';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';

describe('createEditController', () => {
	const Component = (props: CreateEditControllerOptions) => {
		const controller = createEditController(props);
		const route = useLocation();

		return (
			<>
				<div>{route.pathname}</div>
				<button onClick={() => controller.mutation.mutate({ value: 1 })}>Mutate</button>
			</>
		);
	};

	afterEach(cleanup);

	test('should infer resource from context', async () => {
		const dataProvider = {
			getOne: vi.fn().mockResolvedValue({ data: { id: 1 } }),
			update: vi.fn().mockResolvedValue({ data: { id: 1, updated: 1 } }),
		};
		render(() => (
			<QueryClientProvider client={new QueryClient()}>
				<Router>
					<NotificationsProvider>
						<DataProviderProvider dataProvider={dataProvider}>
							<ResourceProvider resource="posts">
								<Component id={1} />
							</ResourceProvider>
						</DataProviderProvider>
					</NotificationsProvider>
				</Router>
			</QueryClientProvider>
		));

		await waitFor(() => expect(dataProvider.getOne).toHaveBeenCalledWith('posts', { id: 1 }, undefined));
		screen.getByText('Mutate').click();
		await waitFor(() =>
			expect(dataProvider.update).toHaveBeenCalledWith('posts', { id: 1, data: { value: 1 } }, undefined),
		);
		await screen.findByText('/posts');
	});

	test('should allow to provide the resource', async () => {
		const dataProvider = {
			getOne: vi.fn().mockResolvedValue({ data: { id: 1 } }),
			update: vi.fn().mockResolvedValue({ data: { id: 1 } }),
		};
		render(() => (
			<QueryClientProvider client={new QueryClient()}>
				<Router>
					<NotificationsProvider>
						<DataProviderProvider dataProvider={dataProvider}>
							<ResourceProvider resource="posts">
								<Component resource="comments" id={1} />
							</ResourceProvider>
						</DataProviderProvider>
					</NotificationsProvider>
				</Router>
			</QueryClientProvider>
		));

		await waitFor(() => expect(dataProvider.getOne).toHaveBeenCalledWith('comments', { id: 1 }, undefined));

		screen.getByText('Mutate').click();
		await waitFor(() =>
			expect(dataProvider.update).toHaveBeenCalledWith('comments', { id: 1, data: { value: 1 } }, undefined),
		);
		await screen.findByText('/posts');
	});

	test('should pass meta all the way down to the dataProvider', async () => {
		const dataProvider = {
			getOne: vi.fn().mockResolvedValue({ data: { id: 1 } }),
			update: vi.fn().mockResolvedValue({ data: { id: 1 } }),
		};
		render(() => (
			<QueryClientProvider client={new QueryClient()}>
				<Router>
					<NotificationsProvider>
						<DataProviderProvider dataProvider={dataProvider}>
							<ResourceProvider resource="posts">
								<Component resource="comments" id={1} meta={{ custom: true }} />
							</ResourceProvider>
						</DataProviderProvider>
					</NotificationsProvider>
				</Router>
			</QueryClientProvider>
		));

		await waitFor(() => expect(dataProvider.getOne).toHaveBeenCalledWith('comments', { id: 1 }, { custom: true }));

		screen.getByText('Mutate').click();
		await waitFor(() =>
			expect(dataProvider.update).toHaveBeenCalledWith('comments', { id: 1, data: { value: 1 } }, { custom: true }),
		);
		await screen.findByText('/posts');
	});

	test('should redirect to the list view by default', async () => {
		const dataProvider = {
			getOne: vi.fn().mockResolvedValue({ data: { id: 1 } }),
			update: vi.fn().mockResolvedValue({ data: { id: 1 } }),
		};

		render(() => (
			<QueryClientProvider client={new QueryClient()}>
				<Router>
					<NotificationsProvider>
						<DataProviderProvider dataProvider={dataProvider}>
							<ResourceProvider resource="posts">
								<Component id={1} />
							</ResourceProvider>
						</DataProviderProvider>
					</NotificationsProvider>
				</Router>
			</QueryClientProvider>
		));

		await waitFor(() => expect(dataProvider.getOne).toHaveBeenCalledWith('posts', { id: 1 }, undefined));

		screen.getByText('Mutate').click();
		await screen.findByText('/posts');
	});

	test('should allow to override the default redirect', async () => {
		const dataProvider = {
			getOne: vi.fn().mockResolvedValue({ data: { id: 1 } }),
			update: vi.fn().mockResolvedValue({ data: { id: 1 } }),
		};

		render(() => (
			<QueryClientProvider client={new QueryClient()}>
				<Router>
					<NotificationsProvider>
						<DataProviderProvider dataProvider={dataProvider}>
							<ResourceProvider resource="posts">
								<Component id={1} redirect="show" />
							</ResourceProvider>
						</DataProviderProvider>
					</NotificationsProvider>
				</Router>
			</QueryClientProvider>
		));

		await waitFor(() => expect(dataProvider.getOne).toHaveBeenCalledWith('posts', { id: 1 }, undefined));

		screen.getByText('Mutate').click();
		await screen.findByText('/posts/1/show');
	});

	test('should allow to override the default onSuccess', async () => {
		const dataProvider = {
			getOne: vi.fn().mockResolvedValue({ data: { id: 1 } }),
			update: vi.fn().mockResolvedValue({ data: { id: 1 } }),
		};
		const onSuccess = vi.fn();
		render(() => (
			<QueryClientProvider client={new QueryClient()}>
				<Router>
					<NotificationsProvider>
						<DataProviderProvider dataProvider={dataProvider}>
							<ResourceProvider resource="posts">
								<Component id={1} mutationOptions={{ onSuccess }} />
							</ResourceProvider>
						</DataProviderProvider>
					</NotificationsProvider>
				</Router>
			</QueryClientProvider>
		));

		await waitFor(() => expect(dataProvider.getOne).toHaveBeenCalledWith('posts', { id: 1 }, undefined));

		screen.getByText('Mutate').click();
		await waitFor(() => expect(onSuccess).toHaveBeenCalledWith({ data: { id: 1 } }, { value: 1 }, undefined));
	});

	test('should allow to override the default onError', async () => {
		const dataProvider = {
			getOne: vi.fn().mockResolvedValue({ data: { id: 1 } }),
			update: vi.fn().mockRejectedValue({ message: 'Error' }),
		};
		const onError = vi.fn();
		render(() => (
			<QueryClientProvider client={new QueryClient()}>
				<Router>
					<NotificationsProvider>
						<DataProviderProvider dataProvider={dataProvider}>
							<ResourceProvider resource="posts">
								<Component id={1} mutationOptions={{ onError }} />
							</ResourceProvider>
						</DataProviderProvider>
					</NotificationsProvider>
				</Router>
			</QueryClientProvider>
		));

		await waitFor(() => expect(dataProvider.getOne).toHaveBeenCalledWith('posts', { id: 1 }, undefined));

		screen.getByText('Mutate').click();
		await waitFor(() => expect(onError).toHaveBeenCalledWith({ message: 'Error' }, { value: 1 }, undefined));
	});
});
