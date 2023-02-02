import { useParams } from '@solidjs/router';
import { JSX } from 'solid-js';
import { createGetOneQuery } from '../crud-hooks';
import { RecordProvider } from '../record';
import { useResource } from '../resource';
import { ShowTitle } from './show-title';

export const Show = (props: { children: JSX.Element; resource?: string; id?: string }) => {
	const resource = useResource(props);
	const params = useParams();
	const id = () => props.id ?? params.id;
	const query = createGetOneQuery(() => ({ resource, params: { id: id() } }));

	const record = () => query.data?.data;

	return (
		<RecordProvider record={record}>
			<ShowTitle />
			{props.children}
		</RecordProvider>
	);
};
