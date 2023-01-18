import { createComputed, createContext, createSignal, JSX, useContext } from 'solid-js';

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

export const useSetAppTitle = () => {
	const context = useContext(AppTitleContext);

	if (!context) {
		throw new Error('useAppTitle must be used within AppTitleProvider');
	}

	return context[1];
};

export const AppTitle = (props: { children: JSX.Element }) => {
	const value = () => props.children;
	const setAppTitle = useSetAppTitle();

	createComputed(() => {
		setAppTitle(value());
	});

	return null;
};
