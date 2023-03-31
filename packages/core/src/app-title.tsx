import { createComputed, createContext, createSignal, JSX, Signal, useContext } from 'solid-js';

export type AppTitleValue = JSX.Element;
export type SetAppTitle = (title: AppTitleValue) => void;
export type AppTitleContextValue = Signal<AppTitleValue>;

export const AppTitleContext = createContext<AppTitleContextValue>();

export const AppTitleProvider = (props: { children: JSX.Element }) => {
	const [appTitle, setAppTitle] = createSignal<AppTitleValue>();

	return <AppTitleContext.Provider value={[appTitle, setAppTitle]}>{props.children}</AppTitleContext.Provider>;
};

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
