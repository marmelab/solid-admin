import { useNavigate, NavigateOptions } from '@solidjs/router';
import { DataRecord } from './record';
import { useResource } from './resource';

export const useRedirect = (): Redirect => {
	const navigate = useNavigate();
	const resource = useResource();

	return (to, { record }, options) => {
		if (to === false) {
			return;
		}
		switch (to) {
			case 'list':
				return navigate(`/${resource}`, options);
			case 'create':
				return navigate(`/${resource}/create`, options);
			case 'edit':
				return navigate(`/${resource}/${record?.id}`, options);
			case 'show':
				return navigate(`/${resource}/${record?.id}/show`, options);
			default:
				return navigate(to, options);
		}
	};
};

export type RedirectTo = 'list' | 'create' | 'edit' | 'show' | string | false;
export type RedirectParams = { record?: DataRecord; resource?: string };

export type Redirect = (to: RedirectTo, params: RedirectParams, options?: Partial<NavigateOptions>) => void;
