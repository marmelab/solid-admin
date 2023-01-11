import { Admin, Resource, fakeRestDataProvider } from '../admin';
import { DataRecord } from '../admin/record';
import { CommentCreate } from './comments/comment-create';
import { CommentEdit } from './comments/comment-edit';
import { CommentList } from './comments/comment-list';
import { CommentShow } from './comments/comment-show';
import { data } from './data';
import { PostCreate } from './posts/post-create';
import { PostList } from './posts/post-list';

const dataProvider = fakeRestDataProvider(data, process.env.NODE_ENV !== 'test');

export const App = () => {
	return (
		<Admin dataProvider={dataProvider}>
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
