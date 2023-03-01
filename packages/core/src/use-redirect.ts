import { useNavigate, NavigateOptions } from '@solidjs/router';
import { useRecord } from './record';
import { useResource } from './resource';

export const useRedirect = (): Redirect => {
	const navigate = useNavigate();
	const resource = useResource();
	const record = useRecord({});

	return (to, options) => {
		switch (to) {
			case 'list':
				return navigate(`/${resource}`, options);
			case 'create':
				return navigate(`/${resource}/create`, options);
			case 'edit':
				return navigate(`/${resource}/${record()?.id}`, options);
			case 'show':
				return navigate(`/${resource}/${record()?.id}/show`, options);
			default:
				return navigate(to, options);
		}
	};
};

export type RedirectTo = 'list' | 'create' | 'edit' | 'show' | string;
export type Redirect = (to: RedirectTo, options?: Partial<NavigateOptions>) => void;
