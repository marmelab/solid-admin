import { useLocation, useNavigate } from '@solidjs/router';
import { useAuthProvider } from './use-auth-provider';

export const useCheckError = <TParams = unknown>() => {
	const authProvider = useAuthProvider();
	const navigate = useNavigate();
	const location = useLocation()

	return (error: unknown) => {
		if (authProvider == undefined) {
			/* do nothing */
			return;
		}

		authProvider.checkError(error).catch((error) => {
			if (error && typeof error.redirectTo === 'string') {
				navigate(error.redirectTo);
			}

			if (error == null || error.redirectTo !== false) {
				navigate('/login?redirectTo=' + encodeURIComponent(`${location.pathname}?${location.search}`));
			}
		});
	};
};
