import { useNavigate, useSearchParams } from '@solidjs/router';
import { createMutation } from '@tanstack/solid-query';
import { LoginResult } from './auth-provider-context';
import { useAuthProvider } from './use-auth-provider';

export const useLogin = <TParams = unknown>() => {
	const authProvider = useAuthProvider();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams<{ redirectTo: string }>();

	if (authProvider == undefined) {
		throw new Error('You can call useLogin if your Admin does not have an AuthProvider');
	}

	const mutation = createMutation<LoginResult, unknown, TParams>(
		async (params) => {
			const result = await authProvider.login(params);
			return result;
		},
		{
			onSuccess: (result) => {
				if (result && result.redirectTo && typeof result.redirectTo === 'string') {
					return navigate(result.redirectTo);
				}

				const redirectTo = searchParams.redirectTo;

				navigate(redirectTo ?? '/');
			},
		},
	);

	return mutation;
};
