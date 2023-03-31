import { useNavigate } from '@solidjs/router';
import { createMutation } from '@tanstack/solid-query';
import { LogoutResult } from './auth-provider-context';
import { useAuthProvider } from './use-auth-provider';

export const useLogout = () => {
	const authProvider = useAuthProvider();
	const navigate = useNavigate();

	if (authProvider == undefined) {
		throw new Error('You can call useLogin if your Admin does not have an AuthProvider');
	}

	const mutation = createMutation<LogoutResult, unknown, void>(
		async () => {
			return authProvider.logout();
		},
		{
			onSuccess: (result) => {
				if (result && typeof result === 'string') {
					return navigate(result);
				}

				navigate('/login');
			},
		},
	);

	return mutation;
};
