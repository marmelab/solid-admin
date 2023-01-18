import { createContext, JSX, useContext } from 'solid-js';

const defaulti18nContext = {
	translate: (x: any) => x,
	changeLocale: () => Promise.resolve(),
	getLocale: () => 'en',
};

export type I18nProvider = {
	// eslint-disable-next-line no-unused-vars
	translate: (key: string, options?: any) => string;
	// eslint-disable-next-line no-unused-vars
	changeLocale: (locale: string) => Promise<void>;
	getLocale: () => string;
	getLocales?: () => Locale[];
};

export const I18nContext = createContext<I18nProvider>(defaulti18nContext);

export const I18nContextProvider = (props: { children: JSX.Element; i18nProvider: I18nProvider }) => {
	const i18nProvider = () => props.i18nProvider;

	return <I18nContext.Provider value={i18nProvider()}>{props.children}</I18nContext.Provider>;
};

export const useTranslate = () => {
    const context = useContext(I18nContext);

    if (!context) {
        throw new Error('useTranslate must be used within a I18nContextProvider');
    }

    return context.translate;
}

export type Locale = {
	locale: string;
	name: string;
};