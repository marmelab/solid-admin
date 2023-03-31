import { createContext } from 'solid-js';

export const DefaultI18nProvider = {
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

export const I18nContext = createContext<I18nProvider>(DefaultI18nProvider);

export type Locale = {
	locale: string;
	name: string;
};