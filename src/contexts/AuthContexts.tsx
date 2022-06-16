import { GetServerSidePropsContext, Redirect } from 'next';
import Router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { useEffect, createContext, ReactNode, useState } from 'react';
import { toast } from 'react-toastify';

import { User } from '../@types';
import { apiClient } from '../services/apiClient';
import { extractUserDataCookie } from '../utils/extractUserDataCookie';

interface ISignInCredentials {
    username: string;
    password: string;
}

interface IAuthProviderProps {
    children: ReactNode;
}

interface IResponseSignOut {
    redirect: {
        destination: string;
        permanent: boolean;
    };
}

interface IAuthContextData {
    signIn: (credentials: ISignInCredentials) => Promise<void>;
    signOut: (
        ctx?: GetServerSidePropsContext | undefined,
    ) => IResponseSignOut | null;
    isAuthenticated: boolean;
    user: User;
}

interface ISignOutProps {
    ctx?: GetServerSidePropsContext | undefined;
}

export const AuthContext = createContext({} as IAuthContextData);

export function signOut(
    ctx: GetServerSidePropsContext | undefined = undefined,
) {
    destroyCookie(undefined, '@LosHermanosDash.token');
    destroyCookie(undefined, '@LosHermanosDash.refreshToken');

    if (!ctx) {
        Router.push('/');
    } else {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return null;
}

export function AuthProvider({ children }: IAuthProviderProps) {
    const [user, setUser] = useState<User>(() => {
        const { user } = extractUserDataCookie('@LosHermanosDash.token');
        return user;
    });
    const isAuthenticated = !!user;

    async function signIn({ username, password }: ISignInCredentials) {
        try {
            const response = await apiClient.post('/session', {
                username,
                password,
            });

            const { token, refresh_token } = response.data;

            setCookie(undefined, '@LosHermanosDash.token', token, {
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/',
            });

            setCookie(
                undefined,
                '@LosHermanosDash.refreshToken',
                refresh_token,
                {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: '/',
                },
            );

            setUser({
                name: response.data.user.name,
                email: response.data.user.email,
                username: response.data.user.username,
                telefone: response.data.user.telefone,
                role: {
                    id: response.data.user.role.id,
                    name: response.data.user.role.name,
                    description: response.data.user.role.description,
                },
                id_account: response.data.user.id_account,
            });

            apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;

            Router.push('/dashboard');
        } catch (error: any) {
            toast.error(error.response.data?.message);
        }
    }

    return (
        <AuthContext.Provider
            value={{ signIn, signOut, isAuthenticated, user }}
        >
            {children}
        </AuthContext.Provider>
    );
}
