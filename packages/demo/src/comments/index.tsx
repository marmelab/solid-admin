import { CommentCreate } from './comment-create';
import { CommentEdit } from './comment-edit';
import { CommentList } from './comment-list';
import { CommentShow } from './comment-show';

export default {
	list: CommentList,
	create: CommentCreate,
	edit: CommentEdit,
	show: CommentShow,
	recordRepresentation: (record: any) => `Comment #${record?.id}`,
};
