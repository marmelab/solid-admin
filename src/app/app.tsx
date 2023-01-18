import { Admin, Resource, fakeRestDataProvider } from '../admin';
import { DataRecord } from '../admin/record';
import { CommentCreate } from './comments/comment-create';
import { CommentEdit } from './comments/comment-edit';
import { CommentList } from './comments/comment-list';
import { CommentShow } from './comments/comment-show';
import { data } from './data';
import { PostCreate } from './posts/post-create';
import { PostList } from './posts/post-list';
import get from 'lodash/get';

const dataProvider = fakeRestDataProvider(data, process.env.NODE_ENV !== 'test');

const messages = {
	sa: {
		messages: {
			created: 'Element created',
			updated: 'Element updated',
		},
	},
};

const i18nProvider = {
	translate: (key: string, options: any) => {
		return get(messages, key) || key;
	},
	changeLocale: (locale: string) => Promise.resolve(),
	getLocale: () => 'en',
}

export const App = () => {
	return (
		<Admin dataProvider={dataProvider} i18nProvider={i18nProvider}>
			<Resource name="posts" list={PostList} create={PostCreate} />
			<Resource
				name="comments"
				list={CommentList}
				create={CommentCreate}
				edit={CommentEdit}
				show={CommentShow}
				recordRepresentation={(record: DataRecord) => `Comment #${record?.id}`}
			/>
		</Admin>
	);
};
