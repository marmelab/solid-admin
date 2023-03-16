import { JSX } from 'solid-js';
import { AuthProvider, AuthProviderContext } from './auth-provider-context';

export const AuthContextProvider = (props: { children: JSX.Element; authProvider?: AuthProvider }) => {
	const authProvider = () => props.authProvider ?? null;

	return <AuthProviderContext.Provider value={authProvider()}>{props.children}</AuthProviderContext.Provider>;
};
