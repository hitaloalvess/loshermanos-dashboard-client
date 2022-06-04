import { AxiosError } from 'axios';
import router from 'next/router';
import { destroyCookie, setCookie } from 'nookies';
import { createContext, ReactNode, useState } from 'react';
import { toast } from 'react-toastify';

import { apiAuth } from '../services/apiClient';

type User = {
    username: string;
};

interface ISignInCredentials {
    username: string;
    password: string;
}

interface IAuthProviderProps {
    children: ReactNode;
}

interface IAuthContextData {
    signIn: (credentials: ISignInCredentials) => Promise<void>;
    signOut: () => void;
    isAuthenticated: boolean;
    user: User;
}

export const AuthContext = createContext({} as IAuthContextData);

export function signOut() {
    destroyCookie(undefined, '@LosHermanosDash.token');
    destroyCookie(undefined, '@LosHermanosDash.refreshToken');

    router.push('/');
}

export function AuthProvider({ children }: IAuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const isAuthenticated = !!user;

    async function signIn({ username, password }: ISignInCredentials) {
        try {
            const response = await apiAuth.post('/session', {
                username,
                password,
            });

            const { token, refreshToken } = response.data;

            setCookie(undefined, '@LosHermanosDash.token', token, {
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/',
            });

            setCookie(
                undefined,
                '@LosHermanosDash.refreshToken',
                refreshToken,
                {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: '/',
                },
            );

            setUser({ username });

            apiAuth.defaults.headers.common.Authorization = `Bearer ${token}`;

            router.push('/dashboard');
        } catch (error: any) {
            toast.error(error.response.data.message);
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
