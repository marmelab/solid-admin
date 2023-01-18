import { createContext, createSignal, JSX, onMount, useContext } from 'solid-js';

export type AppTitleValue = JSX.Element;
// eslint-disable-next-line no-unused-vars
export type SetAppTitle = (title: AppTitleValue) => void;
export type AppTitleContextValue = [AppTitleValue, SetAppTitle];

export const AppTitleContext = createContext<AppTitleContextValue>();

export const AppTitleProvider = (props: { children: JSX.Element }) => {
	// eslint-disable-next-line solid/reactivity
	const appTitleContext = createSignal<AppTitleValue>();

	return (
		<AppTitleContext.Provider value={appTitleContext}>
			{props.children}
		</AppTitleContext.Provider>
	)
}

export const useAppTitle = () => {
	const context = useContext(AppTitleContext);

	if (!context) {
		throw new Error('useAppTitle must be used within AppTitleProvider');
	}

	return context[0];
};

export const useSetAppTitle = (title: AppTitleValue) => {
	const context = useContext(AppTitleContext);

	if (!context) {
		throw new Error('useAppTitle must be used within AppTitleProvider');
	}

	onMount(() => {
		context[1](title);
	});
};

export const AppTitle = (props: { children: JSX.Element }) => {
	const value = () => props.children;
	useSetAppTitle(value());
	return null;
};
