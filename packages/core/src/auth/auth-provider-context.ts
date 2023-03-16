import { createContext } from 'solid-js';
import { Identifier } from '../record';

export interface UserIdentity {
	id: Identifier;
	fullName?: string;
	avatar?: string;
	[key: string]: any;
}

export interface AuthProvider {
	login: (params: any) => Promise<LoginResult>;
	logout: (params?: any) => Promise<LogoutResult>;
	checkAuth: (params?: any) => Promise<void>;
	checkError: (error: any) => Promise<CheckErrorResult>;
	getIdentity?: () => Promise<UserIdentity>;
	getPermissions: (params: any) => Promise<any>;
	handleCallback?: () => Promise<AuthRedirectResult | void | any>;
	[key: string]: any;
}

export type LoginResult = {
	redirectTo?: string | boolean;
} | void;

export type LogoutResult = void | false | string;

export type CheckErrorResult = {
	redirectTo?: string | false;
	logoutUser?: boolean;
	message?: string | false;
};

export type AuthRedirectResult = {
	redirectTo?: string | false;
	logoutOnFailure?: boolean;
};

export const AuthProviderContext = createContext<AuthProvider | null>(null);