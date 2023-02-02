import { Admin, Resource, polyglotI18nProvider } from '@solid-admin/admin';
import { fakeRestDataProvider } from '@solid-admin/data-fakerest';
import { Dashboard } from './dashboard';
import { CommentCreate } from './comments/comment-create';
import { CommentEdit } from './comments/comment-edit';
import { CommentList } from './comments/comment-list';
import { CommentShow } from './comments/comment-show';
import { data } from './data';
import { PostList } from './posts/post-list';

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

export const App = () => {
	return (
		<div data-theme="corporate">
			<Admin dataProvider={dataProvider} i18nProvider={i18nProvider} dashboard={<Dashboard />}>
				<Resource name="posts" list={PostList} />
				<Resource
					name="comments"
					list={CommentList}
					create={CommentCreate}
					edit={CommentEdit}
					show={CommentShow}
					recordRepresentation={(record) => `Comment #${record?.id}`}
				/>
			</Admin>
		</div>
	);
};