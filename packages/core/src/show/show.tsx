import { useParams } from '@solidjs/router';
import { JSX, Show as SolidShow } from 'solid-js';
import { createGetOneQuery } from '../crud-hooks';
import { RecordProvider } from '../record';
import { useResource } from '../resource';
import { ShowTitle } from './show-title';

export const Show = (props: { children: JSX.Element; loading?: JSX.Element; resource?: string; id?: string }) => {
	const resource = useResource(props);
	const params = useParams();
	const id = props.id ?? params.id;
	const query = createGetOneQuery(() => ({ resource, params: { id } }));

	return (
		<SolidShow when={query.data} fallback={props.loading}>
			<RecordProvider record={query.data?.data}>
				<ShowTitle />
				{props.children}
			</RecordProvider>
		</SolidShow>
	);
};
