import { createContext, JSX, onMount, useContext } from 'solid-js';

export type AppTitle = JSX.Element;
export type SetAppTitle = (title: AppTitle) => void;
export type AppTitleContext = [AppTitle, SetAppTitle];

export const AppTitleContext = createContext<AppTitleContext>();

export const useAppTitle = () => {
	const context = useContext(AppTitleContext);

	if (!context) {
		throw new Error('useAppTitle must be used within AppTitleProvider');
	}

	return context[0];
};

export const useSetAppTitle = (title: AppTitle) => {
	const context = useContext(AppTitleContext);

	if (!context) {
		throw new Error('useAppTitle must be used within AppTitleProvider');
	}

	onMount(() => {
		context[1](title);
	});
};

export const AppTitle = (props: { children: JSX.Element }) => {
	useSetAppTitle(props.children);
	return null;
};
