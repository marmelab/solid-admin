import { useNavigate, NavigateOptions } from '@solidjs/router';
import { DataRecord } from './record';
import { useResource } from './resource';

export const useRedirect = (): Redirect => {
	const navigate = useNavigate();
	const resource = useResource();

	return (to, params = {}, options) => {
		if (to === false) {
			return;
		}
		const { record, resource: resourceFromParams } = params;
		
		switch (to) {
			case 'list':
				return navigate(`/${resourceFromParams ?? resource}`, options);
			case 'create':
				return navigate(`/${resourceFromParams ?? resource}/create`, options);
			case 'edit':
				return navigate(`/${resourceFromParams ?? resource}/${record?.id}`, options);
			case 'show':
				return navigate(`/${resourceFromParams ?? resource}/${record?.id}/show`, options);
			default:
				return navigate(to, options);
		}
	};
};

export type RedirectTo = 'list' | 'create' | 'edit' | 'show' | string | false;
export type RedirectParams = { record?: DataRecord; resource?: string };

export type Redirect = (to: RedirectTo, params?: RedirectParams, options?: Partial<NavigateOptions>) => void;
