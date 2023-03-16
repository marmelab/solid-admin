import { useContext } from "solid-js";
import { I18nContext } from "./i18n-context";

export const useTranslate = () => {
	const context = useContext(I18nContext);

	if (!context) {
		throw new Error('useTranslate must be used within a I18nContextProvider');
	}

	return context.translate;
};
