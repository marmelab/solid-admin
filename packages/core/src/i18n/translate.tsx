import { useTranslate } from './use-translate';

export const Translate = (props: { message: string; options?: any }) => {
	const translate = useTranslate();
	const mergedOptions = () => ({ _: props.message, ...props.options });

	return <>{translate(props.message, mergedOptions)}</>;
};
