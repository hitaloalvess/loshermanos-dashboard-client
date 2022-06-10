import decode from 'jwt-decode';
import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
} from 'next';
import { destroyCookie, parseCookies } from 'nookies';

import { Role } from '../@types';
import { AuthTokenError } from '../errors/AuthTokenError';

interface IWithSRRAuthOptions {
    role: string;
}

export const withSSRAuth = <P>(
    fn: GetServerSideProps<P>,
    options?: IWithSRRAuthOptions,
) => {
    return async (
        ctx: GetServerSidePropsContext,
    ): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);
        const token = cookies['@LosHermanosDash.token'];

        if (!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }

        if (options) {
            const {
                role: { name: userRole },
            } = decode(token) as any;

            const { role } = options;

            if (userRole !== role) {
                return {
                    redirect: {
                        destination: '/dashboard',
                        permanent: false,
                    },
                };
            }
        }

        try {
            return await fn(ctx);
        } catch (error) {
            if (error instanceof AuthTokenError) {
                destroyCookie(ctx, '@LosHermanosDash.token');
                destroyCookie(ctx, '@LosHermanosDash.refreshToken');
            }

            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }
    };
};
