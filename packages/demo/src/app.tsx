import { Admin, AuthProvider, Resource, polyglotI18nProvider } from '@solid-admin/admin';
import { fakeRestDataProvider } from '@solid-admin/data-fakerest';
import { data } from './data';
import { Dashboard } from './dashboard';
import posts from './posts';
import comments from './comments';

const dataProvider = fakeRestDataProvider(data, process.env.NODE_ENV !== 'test');

const messages = {
	sa: {
		messages: {
			created: 'Element created',
			updated: 'Element updated',
		},
	},
	resources: {
		posts: {
			name: 'Blog Post |||| Blog Posts',
		},
	},
};

const i18nProvider = polyglotI18nProvider(() => messages);

const authProvider: AuthProvider = {
	login: (params: any) => {
		localStorage.setItem('username', params.username);
		return Promise.resolve();
	},
	logout: () => {
		localStorage.removeItem('username');
		return Promise.resolve();
	},
	checkAuth: () => {
		return localStorage.getItem('username') ? Promise.resolve() : Promise.reject();
	},
	checkError: () => Promise.reject(),
	getPermissions: () => Promise.resolve(),
	getIdentity: () => {
		return Promise.resolve({
			id: localStorage.getItem('username') as string,
			fullName: localStorage.getItem('username') as string,
		});
	},
};

export const App = () => {
	return (
		<div data-theme="corporate">
			<Admin authProvider={authProvider} dataProvider={dataProvider} i18nProvider={i18nProvider} dashboard={Dashboard}>
				<Resource name="posts" {...posts} />
				<Resource name="comments" {...comments} />
			</Admin>
		</div>
	);
};
