import decode from 'jwt-decode';
import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
} from 'next';
import { destroyCookie, parseCookies } from 'nookies';

import { AuthTokenError } from '../errors/AuthTokenError';

interface IWithSRRAuthOptions {
    admin: string;
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
            const { admin: adminToken } = decode(token) as any;

            const { admin: adminUser } = options;

            if (adminToken !== adminUser) {
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
