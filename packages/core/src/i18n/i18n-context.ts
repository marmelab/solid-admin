import { createContext } from 'solid-js';

const defaulti18nContext = {
	translate: (x: string) => x,
	changeLocale: () => Promise.resolve(),
	getLocale: () => 'en',
};

export type I18nProvider = {
	translate: (key: string, options?: any) => string;
	changeLocale: (locale: string) => Promise<void>;
	getLocale: () => string;
	getLocales?: () => Locale[];
};

export const I18nContext = createContext<I18nProvider>(defaulti18nContext);

export type Locale = {
	locale: string;
	name: string;
};