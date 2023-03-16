import { JSX } from 'solid-js';
import { I18nContext, I18nProvider } from './i18n-context';

export const I18nContextProvider = (props: { children: JSX.Element; i18nProvider: I18nProvider }) => {
	const i18nProvider = () => props.i18nProvider;

	return <I18nContext.Provider value={i18nProvider()}>{props.children}</I18nContext.Provider>;
};
