import { useContext } from 'solid-js';
import { AuthProviderContext } from './auth-provider-context';

export const useAuthProvider = () => {
	const authProvider = useContext(AuthProviderContext);
	return authProvider;
};
