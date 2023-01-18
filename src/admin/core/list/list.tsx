import { JSX } from 'solid-js';
import { AppTitle } from '../app-title';
import { ListProvider } from '../list-context';
import { useResource } from '../resource';
import { createListController, CreateListControllerOptions } from './create-list-controller';

export const List = (props: CreateListControllerOptions & { children: JSX.Element }) => {
	const list = createListController();
	const resource = useResource();

	return (
		<ListProvider list={list}>
			<AppTitle>{resource}</AppTitle>

			{props.children}
		</ListProvider>
	);
};
