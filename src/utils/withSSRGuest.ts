import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
} from 'next';
import { parseCookies } from 'nookies';

export const withSSRGuest = <P>(
    fn: GetServerSideProps<P>,
): GetServerSideProps => {
    return async (
        ctx: GetServerSidePropsContext,
    ): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);

        if (cookies['@LosHermanosDash.token']) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false,
                },
            };
        }

        return fn(ctx);
    };
};
