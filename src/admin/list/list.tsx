import { JSX, Show } from 'solid-js';
import { ListProvider } from '../list-context';
import { createListController, CreateListControllerOptions } from './create-list-controller';

export const List = (props: CreateListControllerOptions & { children: JSX.Element }) => {
	const list = createListController();

	return (
		<ListProvider list={list}>
			<Show when={!list.isLoading()}>{props.children}</Show>
		</ListProvider>
	);
};
