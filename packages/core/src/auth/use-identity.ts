import { createQuery } from '@tanstack/solid-query';
import { UserIdentity } from './auth-provider-context';
import { useAuthProvider } from './use-auth-provider';

export const useIdentity = () => {
	const authProvider = useAuthProvider();

	if (authProvider == undefined) {
		throw new Error('You can call useLogin if your Admin does not have an AuthProvider');
	}

	const query = createQuery<UserIdentity | undefined, unknown>(
		() => ['auth', 'identity'],
		async () => {
			return (
				authProvider.getIdentity?.() ?? {
                    id: '',
					fullName: '',
				}
			);
		},
	);

	return query;
};
