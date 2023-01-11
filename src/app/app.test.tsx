import { cleanup, render, screen } from '@solidjs/testing-library';
import { App } from './app';

describe('App', () => {
	afterEach(cleanup);
	test('should render', async () => {
		render(() => <App />);

		await screen.findByText('Solid Admin');
	});
});
