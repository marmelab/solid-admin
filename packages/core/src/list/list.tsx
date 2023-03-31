import { humanize, pluralize } from 'inflection';
import { createMemo, JSX } from 'solid-js';
import { AppTitle } from '../app-title';
import { useTranslate } from '../i18n';
import { ListProvider } from '../list-context';
import { useResource } from '../resource';
import { createListController, CreateListControllerOptions } from './create-list-controller';

export const List = (props: CreateListControllerOptions & { children: JSX.Element }) => {
	const list = createListController();
	const resource = useResource();
	const translate = useTranslate();
	const title = createMemo(() =>
		translate(`resources.${resource}.name`, {
			_: humanize(pluralize(resource)),
			smart_count: 2,
		}),
	);

	return (
		<ListProvider value={list}>
			<AppTitle>{title()}</AppTitle>

			{props.children}
		</ListProvider>
	);
};
